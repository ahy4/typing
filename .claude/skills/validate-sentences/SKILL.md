---
name: validate-sentences
description: src/lib/sentences.tomlの直近追加分を検証し、全件を対象に重複チェックを行う。件数をユーザーにヒアリングし、検証→重複検出の順で処理して、無効・重複文を削除してコミットする。
---

# お題検証スキル

`src/lib/sentences.toml` の直近追加分のお題を検証し、その後全件を対象に重複チェックを行う。

## 実行環境の前提

**このスキルは parent agent（最上位エージェント）からのみ動作する。** subagent から呼ばれた場合は処理を中断し、ユーザーに「このスキルは parent agent から呼んでください」と報告して終了する。

必要なツール:

- `Read` — ファイル読み込み
- `Write` — 一時ファイル書き出し
- `Bash` — スクリプト実行
- **`Agent`** — 検証・審査サブエージェントの dispatch

cwd は **リポジトリルート**（`package.json` がある階層）で実行する。

### CLAUDE.md との衝突回避

ファイル内容の確認は **必ず `Read` ツールを使う**（Bash 経由の `grep` / `cat` は使わない）。

### Write ツールの制約

**既存ファイルへの `Write` 前には必ず `Read` が必要**（Claude Code のツール制約）。`gomi/` の各ファイルを `Write` する前に `Read` を試みること。ファイルが存在しない場合は `Read` がエラーになるがそのまま `Write` できる。ファイルが存在する場合は `Read` 後に `Write` する。

## ステップ 0: 件数の確認

スキル起動時に「直近 N 件を検証」という形で件数 N を受け取る。指定がなければユーザーに確認する。

## ステップ 1: チャンク分割

```bash
node scripts/chunk-sentences.mjs --count <N> --output gomi/recent_chunks.json
```

- `gomi/recent_chunks.json` に **配列の配列（チャンクの配列）** が書き出される。外側の配列の各要素が 1 チャンク、各チャンクは `[{index, jp, kana}, ...]` の形式
- index は sentences.toml 全体での 0 始まり通し番号
- exit code は常に 0

`Read` で `gomi/recent_chunks.json` を読み込んで JSON.parse し、チャンクリストを取得する。チャンク数 `C = チャンクリスト.length`。

チャンク数が 0（N=0 または toml が空）の場合はここで終了し「検証対象がありません」と報告する。

## ステップ 2: お題内容の検証（全チャンク並列）

まず各チャンクの入力ファイルを書き出す（`gomi/` が存在しない場合は先に `mkdir -p gomi` を実行）:

- チャンク i のデータを `Write` で `gomi/validate_chunks/chunk_<i>.json` に書き出す（`[{"index": N, "jp": "...", "kana": "..."}, ...]` 形式）
- 出力先は `gomi/validate_results/chunk_<i>.json` とする（エージェントが書き出す）

全 C チャンクのサブエージェントを **1 つのメッセージで同時起動**する:

```
Agent(
  description: "Validate sentences (chunk <i>/<C>)",
  subagent_type: "sentence-kana-validator",
  prompt: "input_file=gomi/validate_chunks/chunk_<i>.json\noutput_file=gomi/validate_results/chunk_<i>.json"
)
```

### 結果の読み込み

全エージェント完了後、各 `gomi/validate_results/chunk_<i>.json` を `Read` して JSON.parse する。

haiku モデルはコードフェンスを付けることがある。JSON.parse 前に:
1. 先頭の ` ```json ` / ` ``` ` / 末尾の ` ``` ` を除去
2. 残った文字列を JSON.parse する

### 結果統合 → LLM-reject セットの確定

各チャンクの結果から `valid: false` の index をすべて収集し、**LLM-reject index セット**とする。

## ステップ 3: エンジン検証（直近 N 件のみ）

LLM-reject を除いた検証対象文を `gomi/sentences_to_validate.json` に書き出す。

- `Write` ツールで書き出す（Bash 経由の `node -e` は使わない）

形式例:
```json
[{"jp": "今日はいい天気だ", "kana": "きょうはいいてんきだ"}, ...]
```

```bash
node --experimental-strip-types scripts/validate-sentences.ts --json gomi/sentences_to_validate.json
```

終了コードに応じた処理：
- `0` → エンジン-reject = 空
- `1` → stdout を JSON.parse し、`errors` 配列の各 `jp` をエンジン-reject として記録

エンジン-reject は jp 文字列で記録されているため、ステップ 1 のチャンクリストから jp が一致する index を逆引きして **エンジン-reject index セット**とする。

## ステップ 4: 類似重複の検出（全件対象）

ステップ 2・3 が完了したら（結果を待ってから）全件を対象に重複チェックを行う。

```bash
node scripts/find-similar-sentences.mjs --filter-chunks gomi/recent_chunks.json --output gomi/similar_islands.json
```

- `--filter-chunks` によりステップ 1 のチャンクファイルを読み込み、直近 N 件が含まれる島のみを絞り込んでから `gomi/similar_islands.json` に書き出す
- 各要素が 1 島（`[{index, jp, kana}, ...]` 形式）の配列
- exit code は常に 0

`Read` で `gomi/similar_islands.json` を読み込んで JSON.parse し、対象島リストを取得する。
対象島数 `I = 対象島リスト.length`。

対象島が 0 件ならこのステップをスキップして重複-reject = 空とする。

### 対象島ごとのレビュー（全対象島並列）

まず各島の入力ファイルを書き出す:

- 島 i のデータを `Write` で `gomi/similar_islands/island_<i>.json` に書き出す（`[{"index": N, "jp": "...", "kana": "..."}, ...]` 形式）
- 出力先は `gomi/similar_results/island_<i>.json` とする（エージェントが書き出す）

全 I 対象島のサブエージェントを **1 つのメッセージで同時起動**する:

```
Agent(
  description: "Review similar-sentence island <i>/<I>",
  subagent_type: "sentence-similar-reviewer",
  prompt: "input_file=gomi/similar_islands/island_<i>.json\noutput_file=gomi/similar_results/island_<i>.json"
)
```

#### 結果の読み込み

全エージェント完了後、各 `gomi/similar_results/island_<i>.json` を `Read` して JSON.parse する。

haiku モデルはコードフェンスを付けることがある。JSON.parse 前に:
1. 先頭の ` ```json ` / ` ``` ` / 末尾の ` ``` ` を除去
2. 残った文字列を JSON.parse する

#### 結果統合 → 重複-reject セットの確定

各島の結果から `delete` 配列の index をすべて収集し、**重複-reject index セット**とする。

## ステップ 5: 除外文を sentences.toml から削除する

LLM-reject・エンジン-reject・重複-reject を合算した**最終的な除外 index セット**を確定する。

除外セットが 0 件の場合はこのステップをスキップしてステップ 6 へ（「除外すべき文はありませんでした」を報告）。

除外する jp 文字列の配列を `Write` ツールで `gomi/sentences_to_remove.json` に書き出す:

```json
["jp文字列1", "jp文字列2", ...]
```

```bash
node scripts/remove-sentences.mjs gomi/sentences_to_remove.json
```

削除後、`Bash` で `npm run gen` を実行して `src/lib/generated/sentences.json` を再生成する。

## ステップ 6: コミットと完了報告

除外文が 1 件以上あった場合はコミットする:

```bash
git add src/lib/sentences.toml src/lib/generated/sentences.json
git commit -m "fix(sentences): remove <N> invalid/duplicate entries"
```

コミットメッセージの body に除外した jp のリストと理由（LLM-reject / エンジン-reject / 重複-reject の区別付き）を箇条書きで含める。

除外文が 0 件の場合はコミットしない。

### 完了報告

- 検証した件数（直近 N 件）
- LLM 検証で除外した件数（理由の内訳サマリー）
- エンジン検証で除外した件数
- 重複検出で除外した件数（どの島から何件削除したか）
- 合計除外件数 / 残存件数
- 除外した jp のリスト（各理由付き）
