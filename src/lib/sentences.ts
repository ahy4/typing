import RAW from "./generated/sentences.json";
import type { Sentence } from "./types";

export const SENTENCES: Sentence[] = RAW.map((r, i) => ({
	id: String(i),
	japanese: r.jp,
	kana: r.kana,
}));

// Speed → kana-length mapping (kana.length = JS string length, not bytes).
// Each bucket: kps < maxKps → pick sentences with minKana ≤ kana.length ≤ maxKana.
// Current data range: 6–29 chars. Tune to taste.
//
// kps rough feel:
//   < 0.5: 1文字ずつキーを目で探す（りんご・ごはんレベルが適切）
//   0.5–1: 人差し指2本でゆっくり（おじいちゃん・初めての小学生）
//   1–2  : ゆっくりだが両手は使える
//   2–3.5: 初心者〜中級者手前
//   3.5–5: 中級者
//   5+   : 上級者
const SPEED_BUCKETS: { maxKps: number; minKana: number; maxKana: number }[] = [
	{ maxKps: 0.5, minKana: 0, maxKana: 4 }, //  0文（未追加）— 単語1語（りんご/ごはん）
	{ maxKps: 1, minKana: 5, maxKana: 8 }, //  12文 — 短い語句
	{ maxKps: 2, minKana: 9, maxKana: 13 }, //  37文 — 短文
	{ maxKps: 3.5, minKana: 14, maxKana: 18 }, //  96文 — 中程度
	{ maxKps: 5, minKana: 19, maxKana: 22 }, //  79文 — やや長
	{ maxKps: Infinity, minKana: 23, maxKana: Infinity }, //  27文 — 長文
];

function sentencePool(kps?: number): Sentence[] {
	if (kps === undefined) return SENTENCES;
	const bucket = SPEED_BUCKETS.find((b) => kps < b.maxKps);
	if (!bucket) return SENTENCES;
	return SENTENCES.filter(
		(s) => s.kana.length >= bucket.minKana && s.kana.length <= bucket.maxKana,
	);
}

// kps: current typing speed; omit (or pass undefined) to draw from all lengths.
// Falls back to the full pool when the speed-filtered pool is too small.
export function getSentenceQueue(count = 10, kps?: number): Sentence[] {
	const pool = sentencePool(kps);
	const source = pool.length >= count ? pool : SENTENCES;
	const shuffled = [...source].sort(() => Math.random() - 0.5);
	const result: Sentence[] = [];
	while (result.length < count) {
		for (const s of shuffled) {
			if (result.length >= count) break;
			result.push(s);
		}
	}
	return result;
}
