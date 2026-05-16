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

## Phase 1: Generate（ステップ単位の並列化、4フェーズ）

以下の 7 ラウンドを対象とする。

| ラウンド | jp_length の目安 | 生成件数 | N | バッチ数 K |
|---|---|---|---|---|
| 1 | 1〜3 | 500 | 30 | 17（最終バッチは20件） |
| 2 | 3〜6 | 500 | 30 | 17 |
| 3 | 5〜9 | 500 | 30 | 17 |
| 4 | 8〜12 | 300 | 30 | 10 |
| 5 | 11〜18 | 300 | 30 | 10 |
| 6 | 16〜21 | 300 | 30 | 10 |
| 7 | 20〜27 | 300 | 30 | 10 |

**実行時間を最短にするため、ラウンドをまたいでステップ単位で全バッチを一括処理する**（ラウンドごとに G1〜G3 を完結させる逐次ではない）。

```
G1フェーズ: 全7ラウンドの合計 91 バッチを 1 メッセージで一括起動
     ↓ 全完了後
リトライ: 失敗バッチ（全ラウンド合算）を 1 メッセージで一括再実行
     ↓ 全完了後
G2フェーズ: parse → 全有効バッチの validator（最大 273 個）を 1 メッセージで一括起動
     ↓ 全完了後
G3フェーズ: ラウンドごとに G2 結果を統合 → エンジン検証（Bash、順次）
     ↓ 全完了後
G4フェーズ: R=1〜7 の順に sentences.toml へ追記（Bash、逐次）
```

`gomi/` が存在しない場合は各フェーズ前に `mkdir -p gomi gomi/gen_batches gomi/gen_results` を実行する。

---

### G1フェーズ: 全7ラウンドの生成バッチを一括起動

全7ラウンドの **合計 91 バッチ**（R1〜R3 各17個 + R4〜R7 各10個）を **1 つのメッセージで同時起動**する。

専用エージェント `sentence-generator`（`.claude/agents/sentence-generator.md`）を使う。

```
Agent(
  description: "Generate typing sentences (round <R>, batch <i>/<K>)",
  subagent_type: "sentence-generator",
  prompt: "count=<COUNT>\njp_length=<JP_LENGTH_INSTRUCTION>\noutput_file=gomi/gen_batches/raw_<R>_<i>.toml"
)
```

- `<COUNT>` → そのバッチの担当件数（`min(N, 残り件数)`）
- `<JP_LENGTH_INSTRUCTION>` → ラウンド対応:
  - 1〜3: `jp.length の目安は 1〜3 です（犬、猫、風、紐など小学6年生までの常用漢字）`
  - 3〜6: `jp.length の目安は 3〜6 です`
  - 5〜9: `jp.length の目安は 5〜9 です`
  - 8〜12: `jp.length の目安は 8〜12 です`
  - 11〜18: `jp.length の目安は 11〜18 です`
  - 16〜21: `jp.length の目安は 16〜21 です`
  - 20〜27: `jp.length の目安は 20〜27 です`

エージェントはファイルに直接書き出して `OK` または `FAIL` のみ返す。

#### 失敗検出とリトライ

返答が `OK` でない場合（`FAIL` または予期しない出力）、そのバッチは失敗。

**全91バッチが完了したら**、失敗バッチ（ラウンド・バッチ番号を記録済み）を **1 メッセージで一括再実行**（全ラウンドまとめて）。再実行後も失敗したバッチはスキップ確定（計2回失敗でスキップ）。

---

### G2フェーズ: 全有効バッチの kana 検証を一括起動

**まず全7ラウンドの全有効バッチについて** TOML → JSON 変換を完了させてから、validator を一括起動する。

#### JSON 変換（全バッチ、順次）

各バッチ `(R, i)` について（生成エージェントが `raw_<R>_<i>.toml` に直接書き出し済み）:
- `Bash` で変換:
  ```bash
  node scripts/parse-batch.mjs gomi/gen_batches/raw_<R>_<i>.toml gomi/gen_batches/batch_<R>_<i>.json >/dev/null 2>&1
  ```
  exit code 1 の場合はそのバッチをスキップ扱いにする

#### validator を一括起動

全7ラウンドの全有効バッチの合計を M_total とし、**3×M_total 個のサブエージェントを 1 つのメッセージで同時起動**する（最大 273 個）。

```
Agent(
  description: "Validate jp-kana (round <R>, batch <i>, validator <j>)",
  subagent_type: "sentence-gen-kana-validator",
  prompt: "input_file=gomi/gen_batches/batch_<R>_<i>.json\noutput_file=gomi/gen_results/batch_<R>_<i>_v<j>.json"
)
```

バリデータ j は 1〜3。

#### 結果の統合（スクリプトで一括集計）

validator 全完了後、以下の **Bash 1 行**で全バッチの集計を行う:

```bash
node scripts/aggregate-gen-results.mjs gomi/gen_batches gomi/gen_results
```

このスクリプトは全バッチの `_v1/_v2/_v3` 結果ファイルを読み込み、OR ロジックで除外セットを確定し、各バッチの集計結果を `gomi/gen_results/aggregated_<R>_<i>.json`（`[{"index": N, "jp": "..."}, ...]` 形式）に書き出す。

スクリプト完了後、各バッチ `(R, i)` の除外リストを `Read` で `gomi/gen_results/aggregated_<R>_<i>.json` から読み込み、JSON.parse して LLM-reject として確定する。

---

### G3フェーズ: エンジン検証（ラウンドごと、順次）

R=1〜7 の順に以下を実行する（Bash 呼び出しのため並列化不要、各コマンドは高速）:

1. G2 通過文をエンジン検証の入力ファイル `gomi/sentences_to_validate_<R>.json` に `Write` で書き出す（この時点ではエンジン-reject はまだ除外されていない）:
   ```json
   [{"jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]
   ```
   有効文が 0 件の場合はこのラウンドをスキップして「有効文 0 件」と記録する。

2. ```bash
   node --experimental-strip-types scripts/validate-sentences.ts --json gomi/sentences_to_validate_<R>.json 2>/dev/null
   ```
   - exit `0` → 全文有効
   - exit `1` → stdout を JSON.parse し、`errors` 配列の各 `jp` を有効文リストから除外する

3. 有効文リスト（エンジン-reject 除外済み）をラウンド番号とともにメモリ上に保持する。

---

### G4フェーズ: sentences.toml に追記（R=1〜7 の順に逐次）

全7ラウンドの G3 がすべて完了してから、R=1〜7 の順に以下を実行する（`append-sentences.mjs` による toml への書き込みを直列化するため逐次）:

1. G3 で exit 1 だった場合のみ: errors を除いた有効文リストを `Write` で `gomi/sentences_to_validate_<R>.json` に上書き保存する（exit 0 の場合は G3 で書き出したファイルをそのまま使う）
2. `Bash` で以下を実行:
   ```bash
   node scripts/append-sentences.mjs gomi/sentences_to_validate_<R>.json
   ```
   実行結果に `Appended N sentences (旧件数 → 新件数)` が表示される。この N をこのラウンドの追記件数として記録する。
3. `Bash` で `npm run gen >/dev/null 2>&1` を実行して `src/lib/generated/sentences.json` を再生成する。

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
node scripts/chunk-sentences.mjs --count <T> --output gomi/recent_chunks.json >/dev/null 2>&1
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

全エージェント完了後、**`sentence-kana-result-aggregator`** を1つ起動して結果を集計する。

```
Agent(
  description: "Aggregate kana validation results",
  subagent_type: "sentence-kana-result-aggregator",
  prompt: "result_dir=gomi/validate_results\nchunk_count=<C>"
)
```

返答は `{"invalid_indices": [N, ...]}` 形式の JSON。JSON.parse して **LLM-reject index セット**とする。

### ステップ V3: エンジン検証（直近 T 件のみ）

LLM-reject を除いた検証対象文を `Write` ツールで `gomi/sentences_to_validate.json` に書き出す:

```json
[{"jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]
```

```bash
node --experimental-strip-types scripts/validate-sentences.ts --json gomi/sentences_to_validate.json 2>/dev/null
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
  --max-islands 60 2>/dev/null
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

全エージェント完了後、**`sentence-similar-result-aggregator`** を1つ起動して結果を集計する。

```
Agent(
  description: "Aggregate similar-sentence review results",
  subagent_type: "sentence-similar-result-aggregator",
  prompt: "result_dir=gomi/similar_results\nisland_count=<I>"
)
```

返答は `{"delete_indices": [N, ...]}` 形式の JSON。JSON.parse して **重複-reject index セット**とする。

### ステップ V5: 除外文を sentences.toml から削除する

LLM-reject・エンジン-reject・重複-reject を合算した**最終的な除外 index セット**を確定する。

除外セットが 0 件の場合はこのステップをスキップしてステップ V6 へ。

除外する jp 文字列の配列を `Write` ツールで `gomi/sentences_to_remove.json` に書き出す:

```json
["jp文字列1", "jp文字列2", ...]
```

```bash
node scripts/remove-sentences.mjs gomi/sentences_to_remove.json >/dev/null 2>&1
```

削除後、`Bash` で `npm run gen >/dev/null 2>&1` を実行して `src/lib/generated/sentences.json` を再生成する。

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

変更後、`Bash` で `npm run gen >/dev/null 2>&1` を実行して再生成する。

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
