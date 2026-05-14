import RAW from "./generated/sentences.json";
import type { Sentence } from "./types";

export const SENTENCES: Sentence[] = RAW.map((r, i) => ({
	id: String(i),
	japanese: r.jp,
	kana: r.kana,
}));

// Speed → kana-length mapping (kana.length = JS string length, not bytes).
// Each bucket: kps < maxKps → pick sentences with minKana ≤ kana.length ≤ maxKana.
// 0.5 KPS 刻み・上限 9 KPS。隣接バケツは意図的にオーバーラップさせている。
// 現データ範囲: 6–29 字。KPS < 0.5 のバケツは短文追加後に機能する。
const SPEED_BUCKETS: { maxKps: number; minKana: number; maxKana: number }[] = [
	{ maxKps: 0.5, minKana: 0, maxKana: 4 }, //   0文（未追加）— 単語1語
	{ maxKps: 1, minKana: 3, maxKana: 10 }, //  22文
	{ maxKps: 1.5, minKana: 5, maxKana: 12 }, //  38文
	{ maxKps: 2, minKana: 7, maxKana: 14 }, //  61文
	{ maxKps: 2.5, minKana: 9, maxKana: 16 }, //  88文
	{ maxKps: 3, minKana: 11, maxKana: 17 }, //  97文
	{ maxKps: 3.5, minKana: 12, maxKana: 18 }, // 118文
	{ maxKps: 4, minKana: 13, maxKana: 19 }, // 134文
	{ maxKps: 4.5, minKana: 14, maxKana: 20 }, // 147文
	{ maxKps: 5, minKana: 15, maxKana: 21 }, // 149文
	{ maxKps: 5.5, minKana: 16, maxKana: 22 }, // 142文
	{ maxKps: 6, minKana: 17, maxKana: 23 }, // 131文
	{ maxKps: 6.5, minKana: 18, maxKana: 24 }, // 123文
	{ maxKps: 7, minKana: 19, maxKana: 25 }, // 100文
	{ maxKps: 7.5, minKana: 20, maxKana: 26 }, //  77文
	{ maxKps: 8, minKana: 21, maxKana: 27 }, //  54文
	{ maxKps: 8.5, minKana: 22, maxKana: 28 }, //  38文
	{ maxKps: 9, minKana: 23, maxKana: 29 }, //  27文
	{ maxKps: Infinity, minKana: 24, maxKana: Infinity }, //  20文
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
