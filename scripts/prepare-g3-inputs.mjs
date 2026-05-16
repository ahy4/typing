/**
 * Prepares G3 input files for each round from G2 batch and aggregation results.
 *
 * For each round R, reads all batch_<R>_<i>.json files and the corresponding
 * aggregated_<R>_<i>.json exclusion lists, then writes sentences_to_validate_<R>.json
 * containing only LLM-approved sentences.
 *
 * Usage:
 *   node scripts/prepare-g3-inputs.mjs <batches-dir> <results-dir> <output-dir>
 *
 * Exit codes: 0 — success, 1 — error
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const [batchesDir, resultsDir, outputDir] = process.argv.slice(2);

if (!batchesDir || !resultsDir || !outputDir) {
	console.error(
		"Usage: node scripts/prepare-g3-inputs.mjs <batches-dir> <results-dir> <output-dir>",
	);
	process.exit(1);
}

function readJson(path) {
	if (!existsSync(path)) return null;
	try {
		const text = readFileSync(path, "utf-8")
			.replace(/^```(?:json)?\n?/, "")
			.replace(/\n?```$/, "")
			.trim();
		return JSON.parse(text);
	} catch {
		return null;
	}
}

const batchFiles = readdirSync(resolve(batchesDir)).filter((f) =>
	/^batch_\d+_\d+\.json$/.test(f),
);

const rounds = [
	...new Set(batchFiles.map((f) => parseInt(f.match(/^batch_(\d+)_/)[1]))),
].sort((a, b) => a - b);

for (const R of rounds) {
	const roundBatches = batchFiles
		.filter((f) => f.startsWith(`batch_${R}_`))
		.sort();

	const valid = [];

	for (const batchFile of roundBatches) {
		const match = batchFile.match(/^batch_(\d+)_(\d+)\.json$/);
		if (!match) continue;
		const [, , i] = match;

		const batch = readJson(resolve(batchesDir, batchFile));
		if (!Array.isArray(batch)) continue;

		const aggPath = resolve(resultsDir, `aggregated_${R}_${i}.json`);
		const excluded = readJson(aggPath);
		const excludedIndices = new Set(
			Array.isArray(excluded) ? excluded.map((e) => e.index) : [],
		);

		for (let idx = 0; idx < batch.length; idx++) {
			if (!excludedIndices.has(idx)) {
				valid.push({ jp: batch[idx].jp, kana: batch[idx].kana });
			}
		}
	}

	const outPath = resolve(outputDir, `sentences_to_validate_${R}.json`);
	writeFileSync(outPath, JSON.stringify(valid));
	console.log(`Round ${R}: ${valid.length} valid sentences → ${outPath}`);
}
