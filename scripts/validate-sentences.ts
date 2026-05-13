/**
 * Validates a sentences JSON file against the typing engine's parseKana logic.
 *
 * Usage:
 *   node --experimental-strip-types scripts/validate-sentences.ts <path-to-json>
 *
 * Exit codes:
 *   0 — all sentences valid
 *   1 — type-A errors found (bad AI output, sentences discarded)
 *   2 — type-B errors found (engine bugs, should be filed as GitHub issues)
 *   3 — both type-A and type-B errors found
 */

import { readFileSync } from "node:fs";
import { parseKana } from "../src/lib/romaji.ts";

interface RawSentence {
	jp: string;
	kana: string;
	romaji: string;
}

// Characters that must never appear in the kana field (type-A error indicators)
const KANJI_RE = /[一-鿿㐀-䶿\u{20000}-\u{2A6DF}]/u;
// Exclude ー (U+30FC, prolonged sound mark) and ・ (U+30FB, middle dot) — both are
// technically in the katakana block but are legitimately used in hiragana text.
const KATAKANA_RE = /[゠-ヺヽ-ヿ]/;
const UPPERCASE_RE = /[A-Z]/;
const KAGIKAKKO_RE = /[「」『』]/;

type ErrorKind = "type-a" | "type-b";

interface ValidationError {
	kind: ErrorKind;
	sentence: RawSentence;
	reason: string;
}

export function validateSentence(s: RawSentence): ValidationError | null {
	// --- Type-A checks (bad generation output) ---
	if (!s.jp || !s.kana) {
		return { kind: "type-a", sentence: s, reason: "jp or kana is empty" };
	}
	if (KANJI_RE.test(s.kana)) {
		return {
			kind: "type-a",
			sentence: s,
			reason: `kana contains kanji: "${s.kana}"`,
		};
	}
	if (KATAKANA_RE.test(s.kana)) {
		return {
			kind: "type-a",
			sentence: s,
			reason: `kana contains katakana: "${s.kana}"`,
		};
	}
	if (UPPERCASE_RE.test(s.kana)) {
		return {
			kind: "type-a",
			sentence: s,
			reason: `kana contains uppercase ASCII: "${s.kana}"`,
		};
	}
	if (KAGIKAKKO_RE.test(s.kana) || KAGIKAKKO_RE.test(s.jp)) {
		return {
			kind: "type-a",
			sentence: s,
			reason: `sentence contains 鍵カッコ: "${s.jp}"`,
		};
	}
	if (s.kana.length > 29) {
		return {
			kind: "type-a",
			sentence: s,
			reason: `kana too long (${s.kana.length} > 29): "${s.kana}"`,
		};
	}
	if (/^[a-z0-9\s.,!?:;'"-]+$/i.test(s.jp)) {
		return {
			kind: "type-a",
			sentence: s,
			reason: `jp is all-ASCII (no Japanese): "${s.jp}"`,
		};
	}

	// --- Type-B checks (engine bugs) ---
	let segments: ReturnType<typeof parseKana>;
	try {
		segments = parseKana(s.kana);
	} catch (e) {
		return {
			kind: "type-b",
			sentence: s,
			reason: `parseKana threw: ${e instanceof Error ? e.message : String(e)}`,
		};
	}

	if (segments.length === 0) {
		return {
			kind: "type-b",
			sentence: s,
			reason: `parseKana returned 0 segments for kana: "${s.kana}"`,
		};
	}

	for (const seg of segments) {
		if (seg.options.length === 0) {
			return {
				kind: "type-b",
				sentence: s,
				reason: `segment "${seg.kana}" has no romaji options in kana: "${s.kana}"`,
			};
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
const typeAErrors: ValidationError[] = [];
const typeBErrors: ValidationError[] = [];
const valid: RawSentence[] = [];

for (const s of raw) {
	const err = validateSentence(s);
	if (!err) {
		valid.push(s);
	} else if (err.kind === "type-a") {
		typeAErrors.push(err);
	} else {
		typeBErrors.push(err);
	}
}

console.log(`\nValidation results: ${raw.length} sentences checked`);
console.log(`  ✓ valid:   ${valid.length}`);
console.log(
	`  ✗ type-A:  ${typeAErrors.length}  (bad generation output — discard)`,
);
console.log(
	`  ✗ type-B:  ${typeBErrors.length}  (engine bugs — file GitHub issues)\n`,
);

if (typeAErrors.length > 0) {
	console.log("=== Type-A errors (discard) ===");
	for (const e of typeAErrors) {
		console.log(`  [${e.sentence.jp}] ${e.reason}`);
	}
	console.log();
}

if (typeBErrors.length > 0) {
	console.log("=== Type-B errors (file as GitHub issues) ===");
	for (const e of typeBErrors) {
		console.log(`  [${e.sentence.jp}] ${e.reason}`);
		console.log(`  kana: ${e.sentence.kana}`);
	}
	console.log();
}

const exitCode =
	(typeAErrors.length > 0 ? 1 : 0) | (typeBErrors.length > 0 ? 2 : 0);
process.exit(exitCode);
