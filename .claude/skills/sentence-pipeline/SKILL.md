---
name: sentence-pipeline
description: お題生成の完全パイプライン。generate-sentences を7段階の文字数範囲で逐次実行 → validate-sentences → 深刻なkana誤読のみ fix-sentences、の順で自動実行する。
---

# お題生成パイプラインスキル

generate-sentences → validate-sentences → fix-sentences の一連フローを標準パラメータで自動実行する。

## 実行環境の前提

**このスキルは parent agent（最上位エージェント）からのみ動作する。** subagent から呼ばれた場合は処理を中断し「このスキルは parent agent から呼んでください」と報告して終了する。

## Phase 1: Generate（7回逐次実行）

以下の順序で `generate-sentences` スキルを 7 回、**前の generate が完了してから次を開始する**（逐次実行）。

| 回 | jp_length の目安 | 生成件数 | N（バッチサイズ） |
|---|---|---|---|
| 1 | 1〜3 | 500 | 30 |
| 2 | 3〜6 | 500 | 30 |
| 3 | 5〜9 | 500 | 30 |
| 4 | 8〜12 | 300 | 30 |
| 5 | 11〜18 | 300 | 30 |
| 6 | 16〜21 | 300 | 30 |
| 7 | 20〜27 | 300 | 30 |

各回の `generate-sentences` 呼び出しでは、count・N・jp_length の 3 項目をすべて提示してヒアリングをスキップする。jp_length の渡し方:

```
jp.length の目安は <MIN>〜<MAX> です
```

例（1回目）: `jp.length の目安は 1〜3 です`

各 generate 完了後に報告された「追記件数」を記録する。7 回分の追記件数を合算し **合計追記件数 T** とする。

## Phase 2: Validate（1回）

T を件数として `validate-sentences` スキルを呼び出す（直近 T 件を検証対象）。

validate 完了後の報告には以下が含まれる（validate-sentences スキルの完了報告の文言をそのまま読む）：
- **「LLM検証で除外した文」** → これが Phase 3 の対象。理由欄に「kana の誤読」が含まれる
- **「重複検出で除外した文」** → Phase 3 では **無視する**
- **「エンジン検証で除外した文」** → Phase 3 では **無視する**

## Phase 3: Fix Sentences（判断 → 必要な分だけ実行）

### 3-1. 対象の絞り込み（LLM-reject のみ）

「LLM検証で除外した文」リストのみを対象とする。重複・エンジン除外は正常な動作なので fix-sentences は不要。

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
- **validate 側の誤判定が疑われるもの**（jp から自然に読める正しい kana を validate が間違えて除外した可能性があるもの）→ fix-sentences を当てると誤ったルールが生成プロンプトに混入するため除外する

### 3-3. fix-sentences の実行

絞り込んだ NG 例が **0 件の場合は fix-sentences を呼ばず、そのまま完了報告へ進む**。

1 件以上ある場合は、1 件ごとに `fix-sentences` スキルを 1 回呼び出す。

fix-sentences に渡す情報：
- NG な jp と kana のペア
- NG の理由（簡潔に）
- 修正方針（通常は削除）

## 完了報告

- **Phase 1**: 各 generate の追記件数と合計 T
- **Phase 2**: validate 除外件数の内訳（LLM / エンジン / 重複）
- **Phase 3**: 絞り込み前の LLM-reject 件数 → 絞り込み後の件数 → fix-sentences を呼び出したNG例のリスト
