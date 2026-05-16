/**
 * Detects similar sentence groups (islands) in sentences.toml using kana Levenshtein distance.
 * An island is a connected component: sentences A and C are in the same island if
 * A≈B and B≈C even if A and C are not directly similar.
 *
 * Usage:
 *   node scripts/find-similar-sentences.mjs [--threshold N]
 *
 * Output (stdout): JSON array of islands. Each island is an array of
 *   { index, jp, kana } objects. Only islands with 2+ members are output.
 * Exit codes: 0 — always (no similar pairs outputs [])
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const args = process.argv.slice(2);
const thresholdIdx = args.indexOf("--threshold");
const THRESHOLD =
	thresholdIdx !== -1 ? parseInt(args[thresholdIdx + 1], 10) : 3;

const { sentences } = parse(
	readFileSync(resolve(root, "src/lib/sentences.toml"), "utf-8"),
);

// Optimized 1D Levenshtein. Returns early if min possible distance exceeds maxDist.
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

// Union-Find for connected components
const parent = sentences.map((_, i) => i);
function find(x) {
	if (parent[x] !== x) parent[x] = find(parent[x]);
	return parent[x];
}
function union(x, y) {
	const rx = find(x);
	const ry = find(y);
	if (rx !== ry) parent[rx] = ry;
}

for (let i = 0; i < sentences.length; i++) {
	for (let j = i + 1; j < sentences.length; j++) {
		if (
			levenshtein(sentences[i].kana, sentences[j].kana, THRESHOLD) <= THRESHOLD
		) {
			union(i, j);
		}
	}
}

// Group sentences by their root → islands
const groups = new Map();
for (let i = 0; i < sentences.length; i++) {
	const root = find(i);
	if (!groups.has(root)) groups.set(root, []);
	groups
		.get(root)
		.push({ index: i, jp: sentences[i].jp, kana: sentences[i].kana });
}

const islands = [...groups.values()].filter((g) => g.length >= 2);
console.log(JSON.stringify(islands));
