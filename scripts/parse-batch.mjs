/**
 * Converts a single generator TOML batch output to a JSON batch file.
 *
 * Usage:
 *   node scripts/parse-batch.mjs <input.toml> <output.json>
 *
 * Input: TOML text containing [[sentences]] blocks (jp + kana fields).
 * Output: JSON array [{"index": 0, "jp": "...", "kana": "..."}, ...]
 *         index is 0-based within the batch.
 * Exit codes: 0 — success, 1 — error
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "smol-toml";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
	console.error("Usage: node scripts/parse-batch.mjs <input.toml> <output.json>");
	process.exit(1);
}

const tomlText = readFileSync(resolve(inputPath), "utf-8");

let sentences;
try {
	({ sentences } = parse(tomlText));
} catch {
	// Tolerate output that has preamble text before the first [[sentences]]
	const start = tomlText.indexOf("[[sentences]]");
	if (start === -1) {
		console.error("No [[sentences]] blocks found in input");
		process.exit(1);
	}
	({ sentences } = parse(tomlText.slice(start)));
}

if (!Array.isArray(sentences) || sentences.length === 0) {
	console.error("No sentences parsed from input");
	process.exit(1);
}

const output = sentences.map((s, i) => ({ index: i, jp: s.jp, kana: s.kana }));
writeFileSync(resolve(outputPath), JSON.stringify(output, null, 2));
console.log(`Parsed ${output.length} sentences → ${outputPath}`);
