/**
 * Validates a sentences JSON file for use in the typing game.
 *
 * Usage:
 *   node --experimental-strip-types scripts/validate-sentences.ts <path-to-json>
 *
 * Exit codes:
 *   0 — all sentences valid
 *   1 — errors found (bad generation output, sentences discarded)
 */

import { readFileSync } from "node:fs";

interface RawSentence {
	jp: string;
	kana: string;
}

const KANJI_RE = /[一-鿿㐀-䶿\u{20000}-\u{2A6DF}]/u;
const HIRAGANA_OR_PROLONGED_RE = /[぀-ゟー]/;
// Exclude ー (U+30FC) and ・ (U+30FB) — used in hiragana text despite being in the katakana block.
const KATAKANA_RE = /[゠-ヺヽ-ヿ]/;
const UPPERCASE_RE = /[A-Z]/;
const KAGIKAKKO_RE = /[「」『』]/;

interface ValidationError {
	sentence: RawSentence;
	reason: string;
}

export function validateSentence(s: RawSentence): ValidationError | null {
	if (!s.jp || !s.kana) {
		return { sentence: s, reason: "jp or kana is empty" };
	}
	if (KANJI_RE.test(s.kana)) {
		return { sentence: s, reason: `kana contains kanji: "${s.kana}"` };
	}
	if (KATAKANA_RE.test(s.kana)) {
		return { sentence: s, reason: `kana contains katakana: "${s.kana}"` };
	}
	if (UPPERCASE_RE.test(s.kana)) {
		return {
			sentence: s,
			reason: `kana contains uppercase ASCII: "${s.kana}"`,
		};
	}
	if (KAGIKAKKO_RE.test(s.kana) || KAGIKAKKO_RE.test(s.jp)) {
		return {
			sentence: s,
			reason: `sentence contains 鍵カッコ: "${s.jp}"`,
		};
	}
	if (s.kana.length > 29) {
		return {
			sentence: s,
			reason: `kana too long (${s.kana.length} > 29): "${s.kana}"`,
		};
	}
	if (/^[a-z0-9\s.,!?:;'"-]+$/i.test(s.jp)) {
		return {
			sentence: s,
			reason: `jp is all-ASCII (no Japanese): "${s.jp}"`,
		};
	}

	// jp の非漢字部分（ひらがな・長音符・英数字）が kana に順番通り含まれているかチェック。
	// これにより「kana が jp の途中で切れている」誤りを検出する。
	{
		const kanaLower = s.kana.toLowerCase();
		const nonKanjiChars = [...s.jp].filter(
			(c) => HIRAGANA_OR_PROLONGED_RE.test(c) || /[a-zA-Z0-9]/.test(c),
		);
		let idx = 0;
		for (const c of nonKanjiChars) {
			const search = /[a-zA-Z]/.test(c) ? c.toLowerCase() : c;
			const found = kanaLower.indexOf(search, idx);
			if (found === -1) {
				return {
					sentence: s,
					reason: `kana が jp の完全な読みになっていない (jp の "${c}" が kana に見つからない): jp="${s.jp}", kana="${s.kana}"`,
				};
			}
			idx = found + 1;
		}
	}

	return null;
}

// --- CLI entrypoint ---
const args = process.argv.slice(2);
if (args.length === 0) {
	console.error(
		"Usage: node --experimental-strip-types scripts/validate-sentences.ts <path>",
	);
	process.exit(1);
}

const raw = JSON.parse(readFileSync(args[0], "utf-8")) as RawSentence[];
const errors: ValidationError[] = [];
const valid: RawSentence[] = [];

for (const s of raw) {
	const err = validateSentence(s);
	if (!err) {
		valid.push(s);
	} else {
		errors.push(err);
	}
}

console.log(`\nValidation results: ${raw.length} sentences checked`);
console.log(`  ✓ valid:   ${valid.length}`);
console.log(
	`  ✗ errors:  ${errors.length}  (bad generation output — discard)\n`,
);

if (errors.length > 0) {
	console.log("=== Errors (discard) ===");
	for (const e of errors) {
		console.log(`  [${e.sentence.jp}] ${e.reason}`);
	}
	console.log();
}

process.exit(errors.length > 0 ? 1 : 0);
