/**
 * Removes exact duplicate sentences from sentences.toml.
 * Keeps the first occurrence of each jp string and removes all subsequent duplicates.
 *
 * Usage:
 *   node scripts/dedup-sentences.mjs
 *
 * Output: "Removed N exact duplicates (before → after) → src/lib/sentences.toml"
 *         or "No exact duplicates found." if none.
 * Exit codes: 0 — always
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const tomlPath = resolve(root, "src/lib/sentences.toml");

const { sentences } = parse(readFileSync(tomlPath, "utf-8"));

const seen = new Set();
const kept = [];
for (const s of sentences) {
	if (seen.has(s.jp)) continue;
	seen.add(s.jp);
	kept.push(s);
}

const removed = sentences.length - kept.length;

if (removed === 0) {
	console.log("No exact duplicates found.");
	process.exit(0);
}

const newContent = `${kept
	.map(
		(s, i) =>
			`${i === 0 ? "" : "\n"}[[sentences]]\njp = ${JSON.stringify(s.jp)}\nkana = ${JSON.stringify(s.kana)}`,
	)
	.join("\n")}\n`;

writeFileSync(tomlPath, newContent, "utf-8");

console.log(
	`Removed ${removed} exact duplicates (${sentences.length} → ${kept.length}) → src/lib/sentences.toml`,
);
