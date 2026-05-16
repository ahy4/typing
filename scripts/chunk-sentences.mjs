/**
 * Splits the last N sentences from sentences.toml into chunks for validation.
 *
 * Usage:
 *   node scripts/chunk-sentences.mjs --count N [--chunk-size M] [--output <path>]
 *
 * Output (stdout): JSON array of chunks. Each chunk is an array of
 *   { index, jp, kana } objects where index is the 0-based position in the full toml.
 * Exit codes: 0 — always
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const args = process.argv.slice(2);
const countIdx = args.indexOf("--count");
const chunkSizeIdx = args.indexOf("--chunk-size");

if (countIdx === -1) {
	console.error(
		"Usage: node scripts/chunk-sentences.mjs --count N [--chunk-size M]",
	);
	process.exit(1);
}

const COUNT = parseInt(args[countIdx + 1], 10);
const CHUNK_SIZE =
	chunkSizeIdx !== -1 ? parseInt(args[chunkSizeIdx + 1], 10) : 15;
const outputIdx = args.indexOf("--output");
const OUTPUT_PATH =
	outputIdx !== -1 ? resolve(root, args[outputIdx + 1]) : null;

const { sentences } = parse(
	readFileSync(resolve(root, "src/lib/sentences.toml"), "utf-8"),
);

const indexed = sentences.map((s, i) => ({ index: i, jp: s.jp, kana: s.kana }));
const target = indexed.slice(Math.max(0, indexed.length - COUNT));

const chunks = [];
for (let i = 0; i < target.length; i += CHUNK_SIZE) {
	chunks.push(target.slice(i, i + CHUNK_SIZE));
}

const result = JSON.stringify(chunks);
if (OUTPUT_PATH) {
	writeFileSync(OUTPUT_PATH, result);
} else {
	console.log(result);
}
