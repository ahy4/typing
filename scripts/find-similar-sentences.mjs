/**
 * Detects similar sentence pairs in sentences.toml using kana Levenshtein distance.
 *
 * Usage:
 *   node scripts/find-similar-sentences.mjs [--threshold N]
 *
 * Output (stdout): JSON array of candidate pairs in similar-review-prompt format.
 * Exit codes: 0 — always (no candidates is an empty array [])
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const args = process.argv.slice(2);
const thresholdArg = args.indexOf("--threshold");
const THRESHOLD =
	thresholdArg !== -1 ? parseInt(args[thresholdArg + 1], 10) : 3;

const { sentences } = parse(
	readFileSync(resolve(root, "src/lib/sentences.toml"), "utf-8"),
);

// Optimized 1D Levenshtein. Returns early if min possible distance exceeds threshold.
function levenshtein(a, b, maxDist) {
	if (Math.abs(a.length - b.length) > maxDist) return maxDist + 1;
	const n = b.length;
	const row = Array.from({ length: n + 1 }, (_, j) => j);
	for (let i = 1; i <= a.length; i++) {
		let prev = row[0];
		row[0] = i;
		let rowMin = i;
		for (let j = 1; j <= n; j++) {
			const temp = row[j];
			row[j] =
				a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, row[j], row[j - 1]);
			prev = temp;
			if (row[j] < rowMin) rowMin = row[j];
		}
		if (rowMin > maxDist) return maxDist + 1;
	}
	return row[n];
}

const candidates = [];

for (let i = 0; i < sentences.length; i++) {
	for (let j = i + 1; j < sentences.length; j++) {
		const dist = levenshtein(sentences[i].kana, sentences[j].kana, THRESHOLD);
		if (dist <= THRESHOLD) {
			// Keep the shorter kana (less typing value) as discard candidate;
			// if equal length, keep the earlier index.
			const keepIdx =
				sentences[i].kana.length >= sentences[j].kana.length ? i : j;
			const discardIdx = keepIdx === i ? j : i;
			candidates.push({
				distance: dist,
				keep: {
					index: keepIdx,
					jp: sentences[keepIdx].jp,
					kana: sentences[keepIdx].kana,
				},
				discard: {
					index: discardIdx,
					jp: sentences[discardIdx].jp,
					kana: sentences[discardIdx].kana,
				},
				reasons: [`kana編集距離: ${dist}`],
			});
		}
	}
}

console.log(JSON.stringify(candidates));
