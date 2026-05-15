---
name: validate-sentences
description: src/lib/sentences.tomlの既存お題を全件検証し、不適なものを削除する。類似重複の検出→JP-kana対応のLLM検証→エンジン検証の順で処理し、無効・重複文を削除してコミットする。
---

# お題一括検証スキル

`src/lib/sentences.toml` に登録済みのお題を全件検証し、不適なものと似すぎているものを削除する。

## 実行環境の前提

**このスキルは parent agent（最上位エージェント）からのみ動作する。** subagent から呼ばれた場合は処理を中断し、ユーザーに「このスキルは parent agent から呼んでください」と報告して終了する。

必要なツール:

- `Read` — ファイル読み込み
- `Write` — 一時ファイル書き出し
- `Edit` — sentences.toml からの削除
- `Bash` — スクリプト実行・`npm run gen`
- **`Agent`** — LLM 検証サブエージェントの dispatch

cwd は **リポジトリルート**（`package.json` がある階層）で実行する。

### CLAUDE.md との衝突回避

ファイル内容の確認は **必ず `Read` ツールを使う**（Bash 経由の `grep` / `cat` は使わない）。

## ステップ 1: sentences.toml の読み込みとパース

`Read` ツールで `src/lib/sentences.toml` を読み込み、全 `[[sentences]]` エントリを抽出する。

各エントリは以下の形式:

```toml
[[sentences]]
jp = "..."
kana = "..."
```

抽出した `{jp, kana}` ペアのリストを作成し、**0 始まりの連番 index** を振る。

エントリ数が 0 件の場合はここで終了し「sentences.toml にエントリがありません」と報告する。

## ステップ 2: 類似重複の検出

**目的**: 内容・表現が酷似していてタイピングゲームとして冗長なお題を特定する。

### フェーズ構成

類似検出は **2 フェーズ**で行う：

- **フェーズ A（広め検出）**: haiku × 3 並列。3 つのうち **1 つでも** `discard` に指摘した文を「削除候補」とする
- **フェーズ B（吟味）**: 削除候補を haiku × 2 並列で再審査。**両方が削除すべき**と判定した文のみ最終的に除外する

### フェーズ A: 広め検出（3 並列）

- 1 バッチあたり最大 **50 文**（件数が 50 以下なら 1 バッチ）
- バッチ数 `B = ceil(全文数 / 50)`
- **バッチをまたぐペアは検出されない**（バッチ内の比較のみ）。件数が 50 以下なら 1 バッチに全件入るので問題ない

全バッチ × 3 個（計 `3B` 個）のサブエージェントを **1 つのメッセージで同時起動**する。

**起動前に `Read` で `.claude/skills/validate-sentences/similar-detect-prompt.md` を読み込み**、その内容をプロンプト本文として使う（`<SENTENCES_JSON>` を置き換えてから渡す）。

```
Agent(
  description: "Detect similar sentences (batch <i>/<B>, detector <1|2|3>)",
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "<similar-detect-prompt.md の内容（<SENTENCES_JSON> 置換済み）>"
)
```

### similar-detect-prompt.md のプレースホルダー

- `<SENTENCES_JSON>` → バッチ i の文を JSON 配列で渡す（`[{"index": 0, "jp": "...", "kana": "..."}, ...]`）
  - **index はファイル全体での通し番号**（バッチをまたいで一意）

### 応答前処理

haiku モデルはコードフェンスを付けることがある。JSON.parse 前に:
1. 先頭の ` ```json ` / ` ``` ` / 末尾の ` ``` ` を除去
2. 残った文字列を JSON.parse する

### フェーズ A の結果統合 → 削除候補の確定

各バッチ i の 3 つの結果を**次の順に**照合する：

1. **候補の洗い出し**: detector 1・2・3 のうち **1 つでも** ある index を `discard` に指定していれば「削除候補」に追加する
2. **衝突の除外（keep 優先）**: 同じ index が **いずれかの detector の `keep`** と **いずれかの detector の `discard`** の両方に現れた場合（detector 間で意見が分かれた場合）は `keep` を優先し、候補から取り除く
3. **ショートカット**: 削除候補が 0 件なら フェーズ B をスキップして類似重複除外セット = 空とする

### フェーズ B: 吟味（削除候補を 2 並列で再審査）

削除候補リストを 1 つのプロンプトにまとめ、**2 つのサブエージェントを同時起動**する。

**起動前に `Read` で `.claude/skills/validate-sentences/similar-review-prompt.md` を読み込み**、その内容をプロンプト本文として使う（`<CANDIDATES_JSON>` を置き換えてから渡す）。

```
Agent(
  description: "Review similar-sentence candidates (reviewer <1|2>)",
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "<similar-review-prompt.md の内容（<CANDIDATES_JSON> 置換済み）>"
)
```

#### similar-review-prompt.md のプレースホルダー

- `<CANDIDATES_JSON>` → 削除候補を以下の形式で渡す（detector の応答は `{keep: K, discard: D, reason}` ペアの配列で返るので、この K・D をそのまま keep/discard index として使う。同一 D に対して異なる detector が異なる K を返した場合は最初に見つかった K を採用する。`reasons` は discard を指摘した detector の理由をすべて収集した配列）:
  `[{"keep": {"index": K, "jp": "...", "kana": "..."}, "discard": {"index": D, "jp": "...", "kana": "..."}, "reasons": ["detector 1 の理由", "detector 2 の理由", ...]}, ...]`
  - reasons 配列には `discard` を指定した detector の理由のみ含める（`keep` 側や「類似なし」と判定した detector の理由は含めない）

#### フェーズ B の統合ルール

- **reviewer 1・2 の両方が `delete: true`** → 最終的に削除対象とする
- どちらか 1 つでも `delete: false` → 削除しない（残す）

全バッチのフェーズ B 結果を統合し、類似重複として除外する index セットを確定する。

## ステップ 3: JP-kana 対応検証

**目的**: jp の途中で kana が切れていないか、誤読・促音便ミス・複合語の読み誤りがないかを LLM で確認する。

ステップ 2 で除外された文はスキップし、残りの文のみを対象にする。

類似検出と同じ **2 フェーズ構成**で行う：

- **フェーズ A（広め検出）**: haiku × 3 並列。3 つのうち **1 つでも** `valid: false` を返した文を「削除候補」とする
- **フェーズ B（吟味）**: 削除候補を haiku × 2 並列で再審査。**両方が削除すべき**と判定した文のみ最終的に LLM-reject とする

### フェーズ A: 広め検出（3 並列）

- 1 バッチあたり最大 **15 文**
- バッチ数 `M = ceil(検証対象文数 / 15)`

全バッチ × 3 個（計 `3M` 個）のサブエージェントを **1 つのメッセージで同時起動**する。

**起動前に `Read` で `.claude/skills/validate-sentences/validate-prompt.md` を読み込み**、その内容をプロンプト本文として使う（`<SENTENCES_JSON>` を置き換えてから渡す）。

```
Agent(
  description: "Validate jp-kana (batch <i>/<M>, validator <1|2|3>)",
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "<validate-prompt.md の内容（<SENTENCES_JSON> 置換済み）>"
)
```

### validate-prompt.md のプレースホルダー

- `<SENTENCES_JSON>` → バッチ i の文を JSON 配列で渡す（例: `[{"index": 0, "jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]`）
  - **index はファイル全体での通し番号**（バッチをまたいで一意）

### 検証 subagent の応答前処理

haiku モデルはコードフェンスを付けることがある。JSON.parse 前に必ず以下の前処理を行う:

1. 先頭の ` ```json ` / ` ``` ` / 末尾の ` ``` ` を剥ぐ（正規表現で `^\s*```(?:json)?\s*` と `\s*```\s*$` を除去）
2. 残った文字列を JSON.parse する

### フェーズ A の結果統合 → 削除候補の確定

各バッチ i の 3 つの結果を**次の順に**照合する（kana 検証は各文の単独判定なので、類似検出のような keep/discard 衝突ルールはない）：

1. **候補の洗い出し**: validator 1・2・3 のうち **1 つでも** ある index を `valid: false` としていれば「削除候補」に追加する。**同一 validator が同一 index を複数回出力した場合は最初の判定を採用する**
2. **ショートカット**: 削除候補が 0 件なら フェーズ B をスキップし LLM-reject = 空とする

### フェーズ B: 吟味（削除候補を 2 並列で再審査）

削除候補リストをまとめ、**2 つのサブエージェントを同時起動**する。

**起動前に `Read` で `.claude/skills/validate-sentences/validate-review-prompt.md` を読み込み**、その内容をプロンプト本文として使う（`<CANDIDATES_JSON>` を置き換えてから渡す）。

```
Agent(
  description: "Review jp-kana candidates (reviewer <1|2>)",
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "<validate-review-prompt.md の内容（<CANDIDATES_JSON> 置換済み）>"
)
```

#### validate-review-prompt.md のプレースホルダー

- `<CANDIDATES_JSON>` → 削除候補を以下の形式で渡す:
  `[{"index": N, "jp": "...", "kana": "...", "reasons": ["validator 1 の理由", "validator 2 の理由", ...]}, ...]`
  - `reasons` 配列には `valid: false` を返した validator の理由のみ含める（`valid: true` の validator の理由は含めない）

#### フェーズ B の統合ルール

- **reviewer 1・2 の両方が `delete: true`** → LLM-reject として記録
- どちらか 1 つでも `delete: false` → 残す

全バッチのフェーズ B 結果を統合し、LLM-reject の index セットを確定する。

## ステップ 4: フォーマット・エンジン検証（validate-sentences.ts）

ステップ 2（類似重複）とステップ 3（LLM-reject）で除外されなかった**有効**な文をエンジンでも検証する。

### 4-a. JSON ファイルを保存

有効文リストを `JSON.stringify(sentences)` で文字列化し、**`Write` ツールで** `gomi/sentences_to_validate.json` に書き出す。

- `gomi/` が存在しない場合は `Bash` で `mkdir -p <repo-root>/gomi` を実行して作成する
- Bash 経由の `node -e` は使わない（必ず `Write` ツール）

形式例:
```json
[{"jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]
```

### 4-b. 検証スクリプトを実行

```bash
node --experimental-strip-types scripts/validate-sentences.ts gomi/sentences_to_validate.json
```

終了コードに応じた処理：
- `0` → 全文有効（エンジン-reject = 空とする）
- `1` → stdout に出力される `=== Errors (discard) ===` セクションから NG 文の `jp` を抽出し、エンジン-reject として記録する\
  行フォーマット: `  [jp文字列] 理由テキスト`（`[` と `]` の間が jp、`]` の後にスペース + 理由テキストが続く）\
  抽出正規表現: `/^\s+\[(.+?)\]/` の第1キャプチャグループが jp。複数行ある場合は全行に適用する

エンジン-reject は jp 文字列で記録されているため、ステップ 1 で作成したエントリリストから jp が一致する index を逆引きし、ステップ 2 の類似重複除外 index セットとステップ 3 の LLM-reject index セットと合算して、**最終的な除外 index セット**を確定する。

## ステップ 5: 除外文を sentences.toml から削除する

除外文セットが 0 件の場合はこのステップをスキップしてステップ 6 へ（完了報告に「除外すべき文はありませんでした」を含める）。

`Read` ツールで `src/lib/sentences.toml` を再読み込みし、除外文セットに含まれる各エントリを削除する。

### 削除の手順（1 エントリずつ `Edit` で処理する）

各削除対象エントリについて：

```
old_string = "\n[[sentences]]\njp = \"<jp>\"\nkana = \"<kana>\""
new_string = ""
```

ただし、ファイル先頭のエントリ（先頭の改行がない場合）は:

```
old_string = "[[sentences]]\njp = \"<jp>\"\nkana = \"<kana>\"\n"
new_string = ""
```

**ユニーク性確保**: jp または kana が重複しているエントリが存在し Edit がエラーを返した場合は、前後の空行も含めた文字列で再試行する。

削除後、`Bash` で `npm run gen` を実行して `src/lib/generated/sentences.json` を再生成する。

## ステップ 6: コミットと完了報告

除外文が 1 件以上あった場合はコミットする:

```bash
git add src/lib/sentences.toml src/lib/generated/sentences.json
git commit -m "fix(sentences): remove <N> invalid/duplicate entries"
```

コミットメッセージの body に除外した jp のリストと理由（類似重複 / LLM-reject / エンジン-reject の区別付き）を箇条書きで含める。

除外文が 0 件の場合はコミットしない。

### 完了報告

- 検証した総件数
- 類似重複として除外した件数（どのペアを残したか・消したかの概要）
- LLM 検証で除外した件数（理由の内訳サマリー）
- エンジン検証で除外した件数
- 合計除外件数 / 残存件数
- 除外した jp のリスト（各理由付き）
