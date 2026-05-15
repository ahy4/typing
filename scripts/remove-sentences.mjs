import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const jsonPath = process.argv[2];
if (!jsonPath) {
	console.error(
		"Usage: node scripts/remove-sentences.mjs <path-to-json-with-jp-strings>",
	);
	process.exit(1);
}

const toRemove = new Set(
	JSON.parse(readFileSync(resolve(root, jsonPath), "utf-8")),
);

const tomlPath = resolve(root, "src/lib/sentences.toml");
const { sentences } = parse(readFileSync(tomlPath, "utf-8"));

const before = sentences.length;
const kept = sentences.filter((s) => !toRemove.has(s.jp));
const removed = before - kept.length;

if (removed === 0) {
	console.log("No sentences matched — nothing removed.");
	process.exit(0);
}

const newContent = `${kept
	.map(
		(s, i) =>
			`${i === 0 ? "" : "\n"}[[sentences]]\njp = ${JSON.stringify(s.jp)}\nkana = ${JSON.stringify(s.kana)}`,
	)
	.join("\n")}\n`;

writeFileSync(tomlPath, newContent, "utf-8");

const { sentences: after } = parse(readFileSync(tomlPath, "utf-8"));
console.log(
	`Removed ${removed} sentences (${before} → ${after.length}) → src/lib/sentences.toml`,
);
