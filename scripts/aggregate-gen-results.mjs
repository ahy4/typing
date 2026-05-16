/**
 * Aggregates kana validator results for all G2 batches.
 *
 * Usage:
 *   node scripts/aggregate-gen-results.mjs <batches-dir> <results-dir>
 *
 * For each batch_<R>_<i>.json in batches-dir, reads _v1/_v2/_v3 result files
 * from results-dir and applies OR logic: a sentence excluded by any validator
 * is excluded. Writes per-batch exclude lists back to results-dir as
 * aggregated_<R>_<i>.json and prints a summary.
 *
 * Output files: [{"index": N, "jp": "..."}, ...]
 * Exit codes: 0 — success, 1 — error
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const [batchesDir, resultsDir] = process.argv.slice(2);

if (!batchesDir || !resultsDir) {
	console.error(
		"Usage: node scripts/aggregate-gen-results.mjs <batches-dir> <results-dir>",
	);
	process.exit(1);
}

function stripFences(text) {
	return text
		.replace(/^```(?:json)?\n?/, "")
		.replace(/\n?```$/, "")
		.trim();
}

function readJson(path) {
	if (!existsSync(path)) return null;
	try {
		return JSON.parse(stripFences(readFileSync(path, "utf-8")));
	} catch {
		return null;
	}
}

// Find all batch files: batch_<R>_<i>.json
const batchFiles = readdirSync(resolve(batchesDir))
	.filter((f) => /^batch_\d+_\d+\.json$/.test(f))
	.sort();

let totalBatches = 0;
let totalExcluded = 0;

for (const batchFile of batchFiles) {
	const match = batchFile.match(/^batch_(\d+)_(\d+)\.json$/);
	if (!match) continue;
	const [, R, i] = match;

	const batchPath = resolve(batchesDir, batchFile);
	const batch = readJson(batchPath);
	if (!Array.isArray(batch)) continue;

	const excludedIndices = new Set();

	for (const v of [1, 2, 3]) {
		const resultPath = resolve(resultsDir, `batch_${R}_${i}_v${v}.json`);
		const results = readJson(resultPath);
		if (!Array.isArray(results)) continue;

		const seenIndices = new Set();
		for (const r of results) {
			// Skip duplicate index entries from the same validator
			if (seenIndices.has(r.index)) continue;
			seenIndices.add(r.index);

			if (batch[r.index] !== undefined && batch[r.index].jp === r.jp) {
				excludedIndices.add(r.index);
			} else {
				// Fallback: match by jp string
				const found = batch.find((entry) => entry.jp === r.jp);
				if (found !== undefined) {
					excludedIndices.add(found.index);
				}
			}
		}
	}

	const excludes = [...excludedIndices]
		.sort((a, b) => a - b)
		.map((idx) => ({
			index: idx,
			jp: batch[idx].jp,
		}));

	const outPath = resolve(resultsDir, `aggregated_${R}_${i}.json`);
	writeFileSync(outPath, JSON.stringify(excludes));

	totalBatches++;
	totalExcluded += excludes.length;
}

console.log(
	`Aggregated ${totalBatches} batches — ${totalExcluded} total excluded entries`,
);
