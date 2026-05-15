---
name: generate-sentences
description: タイピングゲーム用のお題（Sentence[]）を生成し、検証してsrc/lib/sentences.tomlに追記する。件数・1バッチあたりの上限N・JPの長さをユーザーにヒアリングし、生成サブエージェント→JP-kana対応の検証サブエージェント（各バッチ3並列）→エンジン検証の順で処理する。
---

# お題生成スキル

タイピングゲーム用のお題（`Sentence[]`）を並列生成・多段検証し、`src/lib/sentences.toml` に追記する。

## 実行環境の前提

**このスキルは parent agent（最上位エージェント）からのみ動作する。** subagent（Task / Agent 経由で起動された子エージェント）から呼ばれた場合、更に subagent を nest 起動できない環境がほとんどなので、**最初に必ず処理を中断し、ユーザーに「このスキルは parent agent から呼んでください」と報告して終了する**。

必要なツール:

- `Read` — ファイル読み込み（既存 TOML 件数カウント等）
- `Write` — 新規ファイル作成（`gomi/sentences_to_validate.json` 等）
- `Edit` — 既存ファイルへの追記（末尾エントリを置換する形）
- `Bash` — `npm run gen` 等の実行
- **`Agent`（Claude Code の Task ツールに相当）** — `description` / `subagent_type` / `model` / `prompt` の 4 引数を取り、子エージェントを dispatch する。利用可能なツール一覧で見つからない場合は ToolSearch で `select:Agent` または `select:Task` を試し、それでも無ければ「Agent dispatch ツールが必要です」と報告して中断

cwd は **リポジトリルート**（`package.json` がある階層）で実行する。`scripts/validate-sentences.ts` は相対パスで参照される。

### CLAUDE.md との衝突回避

このリポジトリの CLAUDE.md は `ls` / `grep` / `find` 等の Bash コマンドを禁止している場合がある。本スキルでファイル内容を確認するときは **必ず `Read` ツールを使う**（`Bash` 経由の `grep` / `cat` は使わない）。既存 TOML の `[[sentences]]` 件数カウントも Read で全文取得して数える。

## ステップ 1: ユーザーへのヒアリング

以下を確認する（まとめて一度に聞く）。**ユーザーが依頼メッセージですでに3項目すべてを提示している場合はヒアリングをスキップしてよい。1〜2項目のみ提示されている場合は、未提示の項目のみまとめて聞く。**

1. **生成数**: 合計何文生成するか（例: 10、20、50）
2. **N**: 1サブエージェントあたりの最大生成数（例: 10）。サブエージェント数は `K = ceil(生成数 / N)` になる
3. **JP の長さ**: 短め（jp 10文字以内）/ 普通（jp 11〜18文字）/ 長め（jp 19〜25文字）
   - `jp.length`（UTF-16 code unit）で計測。kana の長さは聞かない

出力先は常に `src/lib/sentences.toml` を使用する（聞かない）。

## ステップ 2: お題生成（claude-haiku サブエージェントを並列起動）

`K = ceil(生成数 / N)` 個のサブエージェントを **1つのメッセージで同時起動**する（並列実行）。

- エージェント i（1始まり）が担当する件数: `min(N, 残り件数)`

**起動前に `Read` で `.claude/skills/generate-sentences/gen-prompt.md` を読み込み**、その内容をプロンプト本文として使う（プレースホルダーを置き換えてから渡す）。

```
Agent(
  description: "Generate typing sentences (batch <i>/<K>)",
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "<gen-prompt.md の内容（プレースホルダー置換済み）>"
)
```

出力にコードフェンスや説明文が混入したら、**最初の `[[sentences]]` から末尾までを切り出す**（それ以外は捨てる）。

### 失敗検出とリトライ

エージェントの出力に `[[sentences]]` が1つも含まれていない場合、そのバッチは失敗とみなす。`[[sentences]]` が1つ以上あれば（要求数より少なくても）成功とみなし、得られた文をそのまま使う。

**リトライ手順（2段階）:**

1. **全バッチを受け取った後**、失敗バッチをまとめて 1 メッセージで一括再実行する（同じプロンプトで再実行する。並列実行を維持するため、バッチごとに個別再実行はしない）
2. 再実行後もまだ失敗しているバッチはスキップし、残りのバッチで得られた文のみで続行する（初回＋再実行の計2回失敗でスキップ確定）

### gen-prompt.md のプレースホルダー

- `<COUNT>` → そのサブエージェントが担当する件数（`min(N, 残り件数)`）
- `<JP_LENGTH_INSTRUCTION>` → 以下のいずれか（`jp.length` の目安、厳守不要）:
  - 短め: `jp.length の目安は 10 以内です`
  - 普通: `jp.length の目安は 11〜18 です`
  - 長め: `jp.length の目安は 19〜25 です`

全 K 個の生成サブエージェントの結果を受け取ったら（失敗バッチは再実行後）、ステップ 3 へ。

## ステップ 3: JP-kana 対応検証（各バッチに 3 つの検証サブエージェントを並列起動）

**目的**: 生成モデルが jp の途中で kana を切っていないか、誤読していないかを LLM で意味的に確認する。

文が得られた各バッチ i について 3 つの検証サブエージェントを起動する。ステップ 2 のリトライで 2 回連続失敗してスキップしたバッチは除外する。有効バッチ数を M とすると **3M 個のサブエージェントを 1 つのメッセージで同時起動**する。**M=0（全バッチがスキップ）の場合はサブエージェントの起動をスキップし、そのまま末尾の「有効文 0 件」分岐へ進む。**

**起動前に `Read` で `.claude/skills/generate-sentences/validate-prompt.md` を読み込み**、その内容をプロンプト本文として使う（`<SENTENCES_JSON>` を置き換えてから渡す）。

```
Agent(
  description: "Validate jp-kana (batch <i>, validator <1, 2, or 3>)",
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "<validate-prompt.md の内容（<SENTENCES_JSON> 置換済み）>"
)
```

### validate-prompt.md のプレースホルダー

- `<SENTENCES_JSON>` → バッチ i の文を JSON 配列で渡す（例: `[{"index": 0, "jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]`）

### 検証 subagent の応答前処理

haiku モデルは指示に反してコードフェンスを付けることがある。応答文字列を JSON.parse する前に必ず以下の前処理を行う:

1. 先頭の ` ```json ` / ` ``` ` / 末尾の ` ``` ` を剥ぐ（正規表現で `^\s*```(?:json)?\s*` と `\s*```\s*$` を除去）
2. 残った文字列を JSON.parse する

### 結果の統合ルール

バッチ i の文 j について:
- **出力に含まれていない文** → 問題なしとみなしてステップ 4 へ進む
- **出力に含まれている文**（出力に存在する＝問題あり）→ `index` と `jp` を突合して除外対象を特定する:
  1. `sentences[result.index].jp === result.jp` が成立する → その文を除外（LLM-reject として記録）
  2. index と jp が食い違う → バッチ内で `result.jp` に完全一致する文を探す。見つかればその文を除外
  3. どちらでも特定できない → その invalid 判定をスキップ（その文は除外しない。ステップ 4 の有効文リストに含める）
- **どちらか一方の validator でも除外判定が確定した文は除外する**（OR ロジック。両方の validator に言及されていない文のみ有効扱い）
- **同じ validator が同一 index を複数回出力した場合**（haiku の混乱で起こる）→ **最初の判定を採用**（後の出力は無視）

全バッチの有効文リストを累積したらステップ 4 へ。**有効文が 0 件の場合はここでステップ 4・5 をスキップし、ステップ 5 の「有効文 0 件」報告フォーマットで終了する。**

## ステップ 4: フォーマット・エンジン検証（validate-sentences.ts）

ステップ 3 を通過した文をまとめて一時ファイルに保存し、エンジン検証を実行する。

### 4-a. JSON ファイルを保存

ステップ 3 を通過した有効文リストを `JSON.stringify(sentences)` で文字列化し、**`Write` ツールで** リポジトリ内の `gomi/sentences_to_validate.json`（絶対パス: `<repo-root>/gomi/sentences_to_validate.json`）に書き出す。

**重要 - 保存先について**:
- `/tmp` は CLAUDE.md ルールで使用禁止の場合がある。必ずリポジトリ内 `gomi/` に置く
- `gomi/` が存在しない場合は `Bash` で `mkdir -p <repo-root>/gomi` を実行して作成する
- `Bash` 経由の `node -e` は日本語クォート/バックスラッシュのエスケープでコケるため使わない（必ず `Write` ツール）

例:

```
Write(file_path: "/abs/path/to/repo/gomi/sentences_to_validate.json",
      content: '[{"jp":"今日はいい天気だ","kana":"きょうはいいてんきだ"}, ...]')
```

### 4-b. 検証スクリプトを実行

```bash
node --experimental-strip-types scripts/validate-sentences.ts gomi/sentences_to_validate.json
```

Bash ツールは exit code ≠ 0 のときエラーとして表示される（`Error: ... (exit code N)` の形）。エラー表示が無ければ `0`、有る場合は表示された数値を見る。**exit 1 でも stdout は出力される**ので、エラー時も stdout を読むこと。

終了コードに応じた処理：
- `0` → 全文有効
- `1` → stdout に出力される `=== Errors (discard) ===` セクションから NG 文の `jp` を抽出し、有効文リストから除外する。残った文を採用する（再実行は不要）\
  行フォーマット: `  [jp文字列] 理由テキスト`（`[` と `]` の間が jp、`]` の後にスペース + 理由テキストが続く）\
  抽出正規表現: `/^\s+\[(.+?)\]/` の第1キャプチャグループが jp。複数行ある場合は全行に適用する

## ステップ 5: 有効な文を sentences.toml に追記し、JSON を再生成する

**有効文が 0 件の場合はここで終了する**: 追記と `npm run gen` の実行をスキップし、「生成数 <合計取得数> 文 / LLM除外 <LLM除外数> 文 / フォーマット除外 <フォーマット除外数> 文 / 有効文 0 件」をユーザーに報告する。

手順：
1. ステップ 4 で保存済みの `gomi/sentences_to_validate.json` には validate 通過後の有効文が入っている。**ステップ 4-b で除外された NG 文**（`=== Errors (discard) ===` セクションに現れた jp）をメモリ上で除いた有効文リストを、改めて `Write` ツールで `gomi/sentences_to_validate.json` に上書き保存する（無効文を含まない最終リストにする）
2. `Bash` で以下のスクリプトを実行し、TOML に追記する:
   ```bash
   node scripts/append-sentences.mjs gomi/sentences_to_validate.json
   ```
   - スクリプトは `gomi/sentences_to_validate.json` を読み込み、`src/lib/sentences.toml` に TOML 形式で追記する
   - 実行結果に `Appended N sentences (旧件数 → 新件数)` が表示される。この数値を報告に使う
   - exit code ≠ 0 の場合はエラーメッセージを確認して原因を報告する
3. 追記後、`Bash` で `npm run gen` を実行（cwd はリポジトリルート前提）して `src/lib/generated/sentences.json` を再生成する

ファイルに書き出し後、結果をユーザーに報告する：
- 生成バッチ数（スキップしたバッチがあれば「5バッチ中4バッチ有効」のように明記）/ 合計生成数（スキップバッチを除いて実際に取得できた文数）/ LLM検証除外数 / フォーマット検証除外数 / 合計有効数
- 追記前の既存件数 / 追記後の合計件数
- 出力先パス（TOML）および再生成された JSON パス
