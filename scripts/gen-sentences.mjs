import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const toml = readFileSync(resolve(root, "src/lib/sentences.toml"), "utf-8");
const { sentences } = parse(toml);

const outDir = resolve(root, "src/lib/generated");
mkdirSync(outDir, { recursive: true });

writeFileSync(
	resolve(outDir, "sentences.json"),
	JSON.stringify(sentences, null, "\t"),
	"utf-8",
);

console.log(
	`Generated ${sentences.length} sentences → src/lib/generated/sentences.json`,
);
