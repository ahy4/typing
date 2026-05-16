---
name: sentence-pipeline
description: お題生成の完全パイプライン。generate-sentences を7段階の文字数範囲で G1〜G3 並列実行 → G4 順次追記 → validate-sentences（V2/V4 並列） → 深刻なkana誤読のみ fix-sentences、の順で自動実行する。
---

# お題生成パイプラインスキル

generate（7段階） → validate → fix の一連フローを1つのスキルとして実行する。

**他のスキルは呼ばない。** すべてのロジックをこのファイルに直接記述してある。

## 実行環境の前提

**このスキルは parent agent（最上位エージェント）からのみ動作する。** subagent から呼ばれた場合は処理を中断し「このスキルは parent agent から呼んでください」と報告して終了する。

必要なツール: `Read` / `Write` / `Bash` / `Agent`

cwd は **リポジトリルート**（`package.json` がある階層）で実行する。

### 禁止事項

**アドホックなスクリプト・一時ファイルの作成は絶対に禁止。**

- `.py` / `.sh` / `.mjs` / `.ts` 等のスクリプトファイルをその場で作成して実行してはいけない
- リポジトリルートや任意のディレクトリに一時的な作業ファイルを生成してはいけない
- すべての処理は `scripts/` 配下の既存スクリプトと `Read` / `Write` / `Bash` / `Agent` ツールのみで完結させること
- 必要なスクリプトが存在しない場合は **処理を止めてユーザーに報告する**（回避策を自作しない）

### CLAUDE.md との衝突回避

ファイル確認は **必ず `Read` ツールを使う**（Bash 経由の `grep` / `cat` は使わない）。

### Write ツールの制約

**既存ファイルへの `Write` 前には必ず `Read` が必要**。`gomi/` の各ファイルを `Write` する前に `Read` を試みること。ファイルが存在しない場合は `Read` がエラーになるがそのまま `Write` できる。

---

## Phase 1: Generate（G1〜G3 を全ラウンド並列、G4 を順次）

以下の 7 ラウンドを対象とする。

| ラウンド | jp_length の目安 | 生成件数 | N（バッチサイズ） |
|---|---|---|---|
| 1 | 1〜3 | 500 | 30 |
| 2 | 3〜6 | 500 | 30 |
| 3 | 5〜9 | 500 | 30 |
| 4 | 8〜12 | 300 | 30 |
| 5 | 11〜18 | 300 | 30 |
| 6 | 16〜21 | 300 | 30 |
| 7 | 20〜27 | 300 | 30 |

**実行順序:**

1. **G1〜G3 を全 7 ラウンド同時実行**（1つのメッセージで全ラウンドを並列起動）
2. 全ラウンドの G1〜G3 が完了したら、**G4 を R=1〜7 の順に逐次実行**

G4 が順次なのは `append-sentences.mjs` による sentences.toml への書き込みを直列化するため。G1〜G3 はラウンド間で完全に独立しているため並列実行できる。

### ステップ G1〜G3（全ラウンド並列）

`gomi/` が存在しない場合は先に `mkdir -p gomi` を実行してから並列起動する。

**全 7 ラウンドについて、以下の G1〜G3 を 1 つのメッセージで同時に開始する。**
各ラウンドの G1〜G3 が完了したら、その有効文リストとラウンド番号をメモリ上に保持しておく（G4 の順次実行で使う）。

#### ステップ G1: 生成サブエージェントを並列起動

`K = ceil(生成件数 / N)` 個のサブエージェントを **1つのメッセージで同時起動**する。

専用エージェント `sentence-generator`（`.claude/agents/sentence-generator.md`）を使う。

```
Agent(
  description: "Generate typing sentences (round <R>, batch <i>/<K>)",
  subagent_type: "sentence-generator",
  prompt: "count=<COUNT>\njp_length=<JP_LENGTH_INSTRUCTION>"
)
```

- `<COUNT>` → そのサブエージェントが担当する件数（`min(N, 残り件数)`）
- `<JP_LENGTH_INSTRUCTION>` → 以下のいずれか:
  - 1〜3: `jp.length の目安は 1〜3 です（犬、猫、風、紐など小学6年生までの常用漢字）`
  - 3〜6: `jp.length の目安は 3〜6 です`
  - 5〜9: `jp.length の目安は 5〜9 です`
  - 8〜12: `jp.length の目安は 8〜12 です`
  - 11〜18: `jp.length の目安は 11〜18 です`
  - 16〜21: `jp.length の目安は 16〜21 です`
  - 20〜27: `jp.length の目安は 20〜27 です`

出力にコードフェンスや説明文が混入したら、**最初の `[[sentences]]` から末尾までを切り出す**。

#### 失敗検出とリトライ

出力に `[[sentences]]` が1つも含まれていない場合、そのバッチは失敗。1つ以上あれば成功。

**リトライ手順（2段階）:**
1. **そのラウンドの**全バッチ受け取り後、失敗バッチをまとめて 1 メッセージで一括再実行（他のラウンドの完了を待たない）
2. 再実行後もまだ失敗しているバッチはスキップ（計2回失敗でスキップ確定）

#### ステップ G2: JP-kana 対応検証（各バッチに 3 つの検証サブエージェントを並列起動）

有効バッチ（スキップされなかったバッチ）の数を M とする。

まず各バッチの入力ファイルを書き出す:
- バッチ i の生成出力（TOML テキスト）を `Write` で `gomi/gen_batches/raw_<R>_<i>.toml` に保存する
- `Bash` で以下を実行して JSON バッチファイルに変換する:
  ```bash
  node scripts/parse-batch.mjs gomi/gen_batches/raw_<R>_<i>.toml gomi/gen_batches/batch_<R>_<i>.json
  ```
  exit code 1 の場合はそのバッチをスキップ扱いにする
- バリデータ j（1〜3）の出力先は `gomi/gen_results/batch_<R>_<i>_v<j>.json` とする

有効バッチ M が 0 件の場合はこのステップをスキップする。M > 0 なら **3M 個のサブエージェントを 1 つのメッセージで同時起動**:

```
Agent(
  description: "Validate jp-kana (round <R>, batch <i>, validator <j>)",
  subagent_type: "sentence-gen-kana-validator",
  prompt: "input_file=gomi/gen_batches/batch_<R>_<i>.json\noutput_file=gomi/gen_results/batch_<R>_<i>_v<j>.json"
)
```

全エージェント完了後、各 `gomi/gen_results/batch_<R>_<i>_v<j>.json` を `Read` して JSON.parse する。

haiku モデルはコードフェンスを付けることがある。JSON.parse 前に:
1. 先頭の ` ```json ` / ` ``` ` / 末尾の ` ``` ` を除去
2. 残った文字列を JSON.parse する

**結果の統合ルール:**
- 出力に含まれていない文 → 問題なしとして有効扱い
- 出力に含まれている文（出力に存在する＝問題あり）→ index と jp を突合して除外対象を特定:
  1. `sentences[result.index].jp === result.jp` が成立する → その文を除外（LLM-reject として記録）
  2. index と jp が食い違う → バッチ内で `result.jp` に完全一致する文を探す。見つかればその文を除外
  3. どちらでも特定できない → その invalid 判定をスキップ（除外しない）
- **いずれかの validator でも除外判定が確定した文は除外する**（OR ロジック）
- **同じ validator が同一 index を複数回出力した場合** → **最初の判定を採用**

#### ステップ G3: フォーマット・エンジン検証

ステップ G2 を通過した文をまとめてエンジン検証の入力ファイル `gomi/sentences_to_validate_<R>.json` に `Write` で書き出す（ラウンド番号 R をファイル名に含める。この時点ではエンジン-reject はまだ除外されていない）:

```json
[{"jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]
```

有効文が 0 件の場合はこのラウンドを終了し「有効文 0 件」と記録してラウンドを完了する。

```bash
node --experimental-strip-types scripts/validate-sentences.ts --json gomi/sentences_to_validate_<R>.json
```

終了コードに応じた処理：
- `0` → 全文有効
- `1` → stdout を JSON.parse し、`errors` 配列の各 `jp` を有効文リストから除外する

有効文リスト（エンジン-reject 除外済み）をメモリ上に保持してラウンドを完了する。

### ステップ G4（全ラウンドの G1〜G3 完了後、R=1〜7 の順に逐次実行）

全 7 ラウンドの G1〜G3 がすべて完了してから、R=1〜7 の順に以下を実行する:

1. G3 で exit 1 だった場合のみ: errors を除いた有効文リストを `Write` で `gomi/sentences_to_validate_<R>.json` に上書き保存する（exit 0 の場合は G3 で書き出したファイルをそのまま使う）
2. `Bash` で以下を実行:
   ```bash
   node scripts/append-sentences.mjs gomi/sentences_to_validate_<R>.json
   ```
   実行結果に `Appended N sentences (旧件数 → 新件数)` が表示される。この N をこのラウンドの追記件数として記録する。
3. `Bash` で `npm run gen` を実行して `src/lib/generated/sentences.json` を再生成する

7 ラウンド分の追記件数を合算し **合計追記件数 T** とする。

---

## Phase 2: Validate（1回）

Phase 1 完了後、合計追記件数 T 件を対象に検証を実行する。

### ステップ V0: コミット（Phase 1 の生成分）

```bash
git add src/lib/sentences.toml src/lib/generated/sentences.json
git commit -m "feat(sentences): add <T> generated sentences"
```

### ステップ V1: チャンク分割

```bash
node scripts/chunk-sentences.mjs --count <T> --output gomi/recent_chunks.json
```

`Read` で `gomi/recent_chunks.json` を読み込んで JSON.parse し、チャンクリストを取得する。チャンク数 `C = チャンクリスト.length`。

チャンク数が 0 の場合は Phase 2 をスキップして Phase 3 へ。

### V2〜V4 の並列実行

V1 完了後、以下の 2 系統を **1 つのメッセージで同時に開始**する:

- **並列A**: V2（kana 検証）→ 完了後すぐ V3（エンジン検証）
- **並列B**: V4（類似重複検出）

両系統が完了したら V5 に進む。

> V3 は V2 の LLM-reject 結果が必要なため V2 の完了を待つ。V4 は V2/V3 と無関係なので並列実行できる。

### ステップ V2: お題内容の検証（全チャンク並列）

`gomi/` 内の以下のサブディレクトリを必要に応じて `mkdir -p` で作成する: `validate_chunks/` / `validate_results/`

各チャンクの入力ファイルを書き出す:
- チャンク i のデータを `Write` で `gomi/validate_chunks/chunk_<i>.json` に書き出す（`[{"index": N, "jp": "...", "kana": "..."}, ...]` 形式）
- 出力先は `gomi/validate_results/chunk_<i>.json`

全 C チャンクのサブエージェントを **1 つのメッセージで同時起動**:

```
Agent(
  description: "Validate sentences (chunk <i>/<C>)",
  subagent_type: "sentence-kana-validator",
  prompt: "input_file=gomi/validate_chunks/chunk_<i>.json\noutput_file=gomi/validate_results/chunk_<i>.json"
)
```

全エージェント完了後、各 `gomi/validate_results/chunk_<i>.json` を `Read` して JSON.parse する（haiku のコードフェンスを除去してから parse）。

各チャンクの結果から `valid: false` の index をすべて収集し、**LLM-reject index セット**とする。

### ステップ V3: エンジン検証（直近 T 件のみ）

LLM-reject を除いた検証対象文を `Write` ツールで `gomi/sentences_to_validate.json` に書き出す:

```json
[{"jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]
```

```bash
node --experimental-strip-types scripts/validate-sentences.ts --json gomi/sentences_to_validate.json
```

- exit `0` → エンジン-reject = 空
- exit `1` → stdout を JSON.parse し `errors` 配列の各 `jp` をエンジン-reject として記録

エンジン-reject は jp 文字列で記録されているため、チャンクリストから jp が一致する index を逆引きして **エンジン-reject index セット**とする。

### ステップ V4: 類似重複の検出（全件対象）

```bash
node scripts/find-similar-sentences.mjs \
  --filter-chunks gomi/recent_chunks.json \
  --output gomi/similar_islands.json \
  --max-island-entries 50 \
  --max-islands 60
```

- `--max-island-entries 50`: エントリ数が 50 件を超える島はスキップ（広域・浅い類似であり LLM レビューに適さない）
- `--max-islands 60`: 類似度スコア上位 60 島のみ処理（スコアは島内エッジの平均 Levenshtein 距離、小さいほど類似度高）
- 出力は類似度降順（スコア昇順）に並んでいる

`Read` で `gomi/similar_islands.json` を読み込んで JSON.parse し、対象島リストを取得する。対象島数 `I`。

対象島が 0 件ならこのステップをスキップして重複-reject = 空とする。

I > 0 の場合、各島の入力ファイルを書き出す（`gomi/similar_islands/` / `gomi/similar_results/` を必要に応じて作成）:
- ステップ V1 で取得した直近 T 件の index セット（`recentIndices`）を使い、各エントリに `"recent": true/false` を付与する
- 島 i のデータを `Write` で `gomi/similar_islands/island_<i>.json` に書き出す（`[{"index": N, "jp": "...", "kana": "...", "recent": true}, ...]` 形式）
- 出力先は `gomi/similar_results/island_<i>.json`

全 I 対象島のサブエージェントを **1 つのメッセージで同時起動**:

```
Agent(
  description: "Review similar-sentence island <i>/<I>",
  subagent_type: "sentence-similar-reviewer",
  prompt: "input_file=gomi/similar_islands/island_<i>.json\noutput_file=gomi/similar_results/island_<i>.json"
)
```

全エージェント完了後、各 `gomi/similar_results/island_<i>.json` を `Read` して JSON.parse する。各島の結果から `delete` 配列の index をすべて収集し、**重複-reject index セット**とする。

### ステップ V5: 除外文を sentences.toml から削除する

LLM-reject・エンジン-reject・重複-reject を合算した**最終的な除外 index セット**を確定する。

除外セットが 0 件の場合はこのステップをスキップしてステップ V6 へ。

除外する jp 文字列の配列を `Write` ツールで `gomi/sentences_to_remove.json` に書き出す:

```json
["jp文字列1", "jp文字列2", ...]
```

```bash
node scripts/remove-sentences.mjs gomi/sentences_to_remove.json
```

削除後、`Bash` で `npm run gen` を実行して `src/lib/generated/sentences.json` を再生成する。

### ステップ V6: コミット

除外文が 1 件以上あった場合:

```bash
git add src/lib/sentences.toml src/lib/generated/sentences.json
git commit -m "fix(sentences): remove <N> invalid/duplicate entries"
```

コミットメッセージの body に除外した jp のリストと理由（LLM-reject / エンジン-reject / 重複-reject の区別付き）を箇条書きで含める。

---

## Phase 3: Fix Sentences（判断 → 必要な分だけ実行）

### 3-1. 対象の絞り込み（LLM-reject のみ）

Phase 2 の「LLM検証で除外した文」リストのみを対象とする。重複・エンジン除外は正常な動作なので修正不要。

### 3-2. 親AIによる深刻度フィルタ

LLM-reject の各NG例を確認し、**生成エージェントが本当にひどいミスをしているもの**のみに絞り込む。

絞り込む基準（対象にする）：
- 明らかな読み誤り（複合語を構成漢字の個別読みで繋げる例: 「海辺」→「かいへん」）
- 送り仮名の脱落・混入
- 異なる読みを持つ漢字の誤選択（多読みで明らかに違う読みを選んでいる）

絞り込まない（対象外にする）：
- 許容範囲の揺れ・境界ケース
- 重複や長さの問題がたまたま kana にも影響したもの
- 1件だけの偶発的なミスで、プロンプト修正不要と判断できるもの
- **validate 側の誤判定が疑われるもの**（jp から自然に読める正しい kana を validate が間違えて除外した可能性があるもの）

### 3-3. 絞り込み後のNG例への対応

絞り込んだ NG 例が **0 件の場合は何もせず完了報告へ進む**。

1 件以上ある場合、各NG例に対して以下を実行する（複数ある場合は1件ずつ処理する）:

#### a. sentences.toml からの削除

`src/lib/sentences.toml` を `Read` ツールで読み込み、対象エントリを特定する。

`Edit` ツールで該当の `[[sentences]]` ブロック（空行 + `[[sentences]]` + `jp = ...` + `kana = ...` の4行）をまるごと削除する。

変更後、`Bash` で `npm run gen` を実行して再生成する。

#### b. generate-sentences スキルのプロンプト更新

生成プロンプトと検証プロンプトの両方にNGパターンを追記する。

- **生成プロンプト**: `.claude/agents/sentence-generator.md` を `Read` で読み込み、`## チェックリスト` セクションを更新する
- **検証プロンプト**: `.claude/agents/sentence-gen-kana-validator.md` を `Read` で読み込み、`## NG の例` テーブルを更新する

**Read 後、追記する前に既存内容との重複を確認する。**
- 同一の例が既に記載されている → スキップ（追記しない）
- 類似のルールはあるが例が不足している → 既存項目に例を追加する形で `Edit` する
- 全く新しい観点 → 末尾または最も近い項目の直下に追記する

追記の方針:
- **汎化する**: 特定の単語だけでなく「同種のミスのパターン」として書く
- **簡潔に**: 既存のルールと重複しない範囲で最小限の追記にとどめる
- **具体例を添える**: ルールの説明には `例: X → Y（× Z）` 形式で添える

#### c. コミット

```bash
git add src/lib/sentences.toml src/lib/generated/sentences.json .claude/agents/sentence-generator.md .claude/agents/sentence-gen-kana-validator.md
git commit -m "fix: <変更内容を端的に表すメッセージ>"
```

---

## 完了報告

- **Phase 1**: 各ラウンドの追記件数と合計 T
- **Phase 2**: validate 除外件数の内訳（LLM / エンジン / 重複）
- **Phase 3**: 絞り込み前の LLM-reject 件数 → 絞り込み後の件数 → 対応したNG例のリスト
