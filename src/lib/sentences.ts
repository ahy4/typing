import RAW from "./generated/sentences.json";
import type { Difficulty, Sentence } from "./types";

export const SENTENCES: Sentence[] = RAW.map((r, i) => ({
	id: String(i),
	japanese: r.jp,
	kana: r.kana,
}));

// Speed → kana-length mapping (kana.length = JS string length, not bytes).
// Each bucket: kps < maxKps → pick sentences with minKana ≤ kana.length ≤ maxKana.
// 0.5 KPS 刻み・上限 7 KPS。隣接バケツは意図的にオーバーラップさせている。
// 現データ範囲: 6–29 字。KPS < 0.5 のバケツは短文追加後に機能する。
const SPEED_BUCKETS: { maxKps: number; minKana: number; maxKana: number }[] = [
	{ maxKps: 0.5, minKana: 0, maxKana: 4 }, // 単語1語（未追加）
	{ maxKps: 1, minKana: 3, maxKana: 10 },
	{ maxKps: 1.5, minKana: 5, maxKana: 12 },
	{ maxKps: 2, minKana: 7, maxKana: 14 },
	{ maxKps: 2.5, minKana: 9, maxKana: 16 },
	{ maxKps: 3, minKana: 11, maxKana: 18 },
	{ maxKps: 3.5, minKana: 13, maxKana: 19 },
	{ maxKps: 4, minKana: 15, maxKana: 21 },
	{ maxKps: 4.5, minKana: 17, maxKana: 22 },
	{ maxKps: 5, minKana: 18, maxKana: 23 },
	{ maxKps: 5.5, minKana: 19, maxKana: 24 },
	{ maxKps: 6, minKana: 20, maxKana: 25 },
	{ maxKps: 6.5, minKana: 21, maxKana: 27 },
	{ maxKps: 7, minKana: 22, maxKana: 28 },
	{ maxKps: Infinity, minKana: 23, maxKana: Infinity },
];

// Maximum kana length per difficulty.
// Easy/Normal use a fixed cap; Hard uses the speed-adaptive bucket with no cap.
const DIFFICULTY_MAX_KANA: Record<Difficulty, number> = {
	easy: 7,
	normal: 18,
	hard: Infinity,
};

function sentencePool(
	kps?: number,
	difficulty: Difficulty = "normal",
): Sentence[] {
	const maxKana = DIFFICULTY_MAX_KANA[difficulty];

	if (difficulty === "easy") {
		return SENTENCES.filter((s) => s.kana.length <= maxKana);
	}

	// Normal: speed-adaptive, but capped at maxKana.
	// Hard: speed-adaptive, no cap (current behavior).
	if (kps === undefined) {
		return SENTENCES.filter((s) => s.kana.length <= maxKana);
	}
	const bucket = SPEED_BUCKETS.find((b) => kps < b.maxKps);
	if (!bucket) return SENTENCES.filter((s) => s.kana.length <= maxKana);
	return SENTENCES.filter(
		(s) =>
			s.kana.length >= bucket.minKana &&
			s.kana.length <= Math.min(bucket.maxKana, maxKana),
	);
}

// kps: current typing speed; omit (or pass undefined) to draw from all lengths.
// Falls back to the full pool when the speed-filtered pool is too small.
// exclude: sentence IDs already seen this game; excluded unless the pool is exhausted.
export function getSentenceQueue(
	count = 10,
	kps?: number,
	difficulty: Difficulty = "normal",
	exclude: Set<string> = new Set(),
): Sentence[] {
	const pool = sentencePool(kps, difficulty);
	const fresh = pool.filter((s) => !exclude.has(s.id));
	const source =
		fresh.length >= count ? fresh : pool.length >= count ? pool : SENTENCES;
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
