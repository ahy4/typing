import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const jsonPath = process.argv[2];
if (!jsonPath) {
	console.error("Usage: node scripts/append-sentences.mjs <path-to-json>");
	process.exit(1);
}

const sentences = JSON.parse(readFileSync(resolve(root, jsonPath), "utf-8"));
if (!Array.isArray(sentences) || sentences.length === 0) {
	console.error("No sentences to append.");
	process.exit(1);
}

const tomlPath = resolve(root, "src/lib/sentences.toml");
let existing = "";
try {
	existing = readFileSync(tomlPath, "utf-8");
} catch {
	// file doesn't exist yet
}

const { sentences: before = [] } = existing ? parse(existing) : {};

const toAppend = sentences
	.map(
		(s) =>
			`\n[[sentences]]\njp = ${JSON.stringify(s.jp)}\nkana = ${JSON.stringify(s.kana)}`,
	)
	.join("\n");

const newContent = existing
	? `${existing.trimEnd()}\n${toAppend}\n`
	: `${toAppend.trimStart()}\n`;

writeFileSync(tomlPath, newContent, "utf-8");

// verify the written file parses correctly
const { sentences: after } = parse(readFileSync(tomlPath, "utf-8"));
const added = after.length - before.length;
console.log(
	`Appended ${added} sentences (${before.length} → ${after.length}) → src/lib/sentences.toml`,
);
