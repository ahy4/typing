/**
 * Detects similar sentence groups (islands) in sentences.toml using kana Levenshtein distance.
 * An island is a connected component: sentences A and C are in the same island if
 * A≈B and B≈C even if A and C are not directly similar.
 *
 * Usage:
 *   node scripts/find-similar-sentences.mjs [options]
 *
 * Options:
 *   --threshold N            Normalized Levenshtein threshold 0–1 (default: 0.3)
 *                            Two kana strings are similar if dist/max_len ≤ threshold.
 *   --output <path>          Output path (default: stdout)
 *   --filter-chunks <path>   Only include islands with ≥1 recent entry
 *   --max-island-entries N   Skip islands with more than N entries (default: 50)
 *   --max-islands N          Output at most top-N islands sorted by similarity (default: 60)
 *
 * Output: JSON array of islands sorted by similarity score ascending (most similar first).
 *   Score = mean normalized Levenshtein distance (dist / max_kana_len) across edges.
 *   Each island is an array of { index, jp, kana } objects. Only islands with 2+ members.
 *   Written to --output file if specified, otherwise to stdout.
 * Exit codes: 0 — always (no similar pairs outputs [])
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const args = process.argv.slice(2);

function getArg(flag, defaultVal) {
	const idx = args.indexOf(flag);
	return idx !== -1 ? args[idx + 1] : defaultVal;
}

const THRESHOLD = parseFloat(getArg("--threshold", "0.3"));
const OUTPUT_PATH = getArg("--output", null)
	? resolve(root, getArg("--output", null))
	: null;
const FILTER_CHUNKS_PATH = getArg("--filter-chunks", null)
	? resolve(root, getArg("--filter-chunks", null))
	: null;
const MAX_ISLAND_ENTRIES = parseInt(getArg("--max-island-entries", "50"), 10);
const MAX_ISLANDS = parseInt(getArg("--max-islands", "60"), 10);

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

// Collect edges and build islands simultaneously
const edgePairs = [];
for (let i = 0; i < sentences.length; i++) {
	for (let j = i + 1; j < sentences.length; j++) {
		const ai = sentences[i].kana;
		const bj = sentences[j].kana;
		const maxLen = Math.max(ai.length, bj.length);
		// Derive an absolute distance ceiling from the normalized threshold so the
		// early-return optimisation inside levenshtein() still fires.
		const absMax = Math.ceil(THRESHOLD * maxLen);
		const d = levenshtein(ai, bj, absMax);
		if (d > absMax) continue;
		const normDist = maxLen > 0 ? d / maxLen : 0;
		if (normDist <= THRESHOLD) {
			union(i, j);
			edgePairs.push({ i, j, normDist });
		}
	}
}

// Compute per-island similarity score (mean normalized edge distance; lower = more similar)
const islandScore = new Map(); // root -> { sum, count }
for (const { i, normDist } of edgePairs) {
	const r = find(i);
	if (!islandScore.has(r)) islandScore.set(r, { sum: 0, count: 0 });
	const s = islandScore.get(r);
	s.sum += normDist;
	s.count += 1;
}

// Group sentences by their root → islands
const groups = new Map();
for (let i = 0; i < sentences.length; i++) {
	const r = find(i);
	if (!groups.has(r)) groups.set(r, []);
	groups
		.get(r)
		.push({ index: i, jp: sentences[i].jp, kana: sentences[i].kana });
}

// Build island list with scores, filter small islands and oversized ones
let islands = [];
for (const [r, entries] of groups) {
	if (entries.length < 2) continue;
	if (entries.length > MAX_ISLAND_ENTRIES) continue;
	const sc = islandScore.get(r);
	const score = sc ? sc.sum / sc.count : 1.0;
	islands.push({ score, entries });
}

// Filter to only islands containing at least one recent entry
if (FILTER_CHUNKS_PATH) {
	const chunks = JSON.parse(readFileSync(FILTER_CHUNKS_PATH, "utf-8"));
	const recentIndices = new Set(chunks.flat().map((s) => s.index));
	islands = islands.filter((island) =>
		island.entries.some((s) => recentIndices.has(s.index)),
	);
}

// Sort by score ascending (most similar first), then limit
islands.sort((a, b) => a.score - b.score);
if (islands.length > MAX_ISLANDS) {
	islands = islands.slice(0, MAX_ISLANDS);
}

// Output: array of entry arrays (score is internal only)
const output = islands.map((island) => island.entries);

if (OUTPUT_PATH) {
	writeFileSync(OUTPUT_PATH, JSON.stringify(output));
} else {
	console.log(JSON.stringify(output));
}
