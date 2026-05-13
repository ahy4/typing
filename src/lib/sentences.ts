import DATA from "./sentences.toml";
import type { Sentence } from "./types";

const RAW = DATA.sentences as Array<{
	jp: string;
	kana: string;
	romaji: string;
}>;

export const SENTENCES: Sentence[] = RAW.map((r, i) => ({
	id: String(i),
	japanese: r.jp,
	kana: r.kana,
	romaji: r.romaji,
}));

export function getSentenceQueue(count = 10): Sentence[] {
	const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
	const result: Sentence[] = [];
	while (result.length < count) {
		for (const s of shuffled) {
			if (result.length >= count) break;
			result.push(s);
		}
	}
	return result;
}
