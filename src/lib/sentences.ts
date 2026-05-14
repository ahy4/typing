import RAW from "./generated/sentences.json";
import type { Sentence } from "./types";

export const SENTENCES: Sentence[] = RAW.map((r, i) => ({
	id: String(i),
	japanese: r.jp,
	kana: r.kana,
}));

// Speed → kana-length mapping.
// Each bucket: kps < maxKps → pick sentences with minKana ≤ kana.length ≤ maxKana.
// Tune these numbers to change difficulty ramp-up.
//
// kps rough feel:
//   < 0.5: 1文字ずつキーを目で探す（りんご・ごはんレベルが適切）
//   0.5–1: 人差し指2本でゆっくり（おじいちゃん・初めての小学生）
//   1–2  : ゆっくりだが両手は使える
//   2–3  : 初心者の普通ペース
//   3–4.5: 中級者
//   4.5–6: 慣れてきたタイピスト
//   6+   : 上級者
const SPEED_BUCKETS: { maxKps: number; minKana: number; maxKana: number }[] = [
	{ maxKps: 0.5, minKana: 0, maxKana: 6 }, // 単語レベル（りんご=3・ごはん=4）
	{ maxKps: 1, minKana: 7, maxKana: 21 }, //  9文 — 短い文
	{ maxKps: 2, minKana: 22, maxKana: 30 }, // 13文 — 短文
	{ maxKps: 3, minKana: 31, maxKana: 36 }, // 16文 — やや短
	{ maxKps: 4.5, minKana: 37, maxKana: 48 }, // 62文 — 中程度
	{ maxKps: 6, minKana: 49, maxKana: 57 }, // 75文 — やや長
	{ maxKps: Infinity, minKana: 58, maxKana: Infinity }, // 76文 — 長文
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
