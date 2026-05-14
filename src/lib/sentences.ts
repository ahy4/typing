import RAW from "./generated/sentences.json";
import type { Sentence } from "./types";

export const SENTENCES: Sentence[] = RAW.map((r, i) => ({
	id: String(i),
	japanese: r.jp,
	kana: r.kana,
}));

// Thresholds tuned to kana-length distribution in sentences.toml
const SHORT_MAX = 36; // kana ≤ 36
const LONG_MIN = 58; // kana ≥ 58

function sentencePool(kps?: number): Sentence[] {
	if (kps === undefined) return SENTENCES;
	if (kps < 3) return SENTENCES.filter((s) => s.kana.length <= SHORT_MAX);
	if (kps < 5.5)
		return SENTENCES.filter(
			(s) => s.kana.length > SHORT_MAX && s.kana.length < LONG_MIN,
		);
	return SENTENCES.filter((s) => s.kana.length >= LONG_MIN);
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
