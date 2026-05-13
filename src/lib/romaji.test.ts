import { describe, expect, it } from "vitest";
import { createTypingState, feedKey, parseKana } from "./romaji.ts";

// ── helpers ──────────────────────────────────────────────────────────────────

function opts(kana: string): string[] {
	return parseKana(kana).flatMap((s) => s.options);
}

function accepts(kana: string, romaji: string): boolean {
	return opts(kana).includes(romaji);
}

function type(kana: string, input: string): string {
	let state = createTypingState(kana);
	for (const ch of input) {
		const r = feedKey(state, ch);
		if (r.result === "wrong") return `wrong@${ch}`;
		state = r.next;
	}
	return state.completed ? "all_complete" : "incomplete";
}

// ── parseKana ────────────────────────────────────────────────────────────────

describe("parseKana – basic kana", () => {
	it("single vowels", () => {
		expect(accepts("あ", "a")).toBe(true);
		expect(accepts("い", "i")).toBe(true);
		expect(accepts("い", "yi")).toBe(true);
		expect(accepts("う", "u")).toBe(true);
		expect(accepts("う", "wu")).toBe(true);
		expect(accepts("う", "whu")).toBe(true);
	});

	it("small vowels la/xa aliases", () => {
		expect(accepts("ぁ", "la")).toBe(true);
		expect(accepts("ぁ", "xa")).toBe(true);
		expect(accepts("ぃ", "li")).toBe(true);
		expect(accepts("ぃ", "lyi")).toBe(true);
		expect(accepts("ぃ", "xyi")).toBe(true);
		expect(accepts("ぇ", "le")).toBe(true);
		expect(accepts("ぇ", "lye")).toBe(true);
		expect(accepts("ぇ", "xye")).toBe(true);
	});
});

describe("parseKana – compound kana", () => {
	it("じぇ: je / zye / jye", () => {
		expect(accepts("じぇ", "je")).toBe(true);
		expect(accepts("じぇ", "zye")).toBe(true);
		expect(accepts("じぇ", "jye")).toBe(true);
	});

	it("いぇ: ye", () => {
		expect(accepts("いぇ", "ye")).toBe(true);
	});

	it("-i/-e compound forms", () => {
		expect(accepts("きぃ", "kyi")).toBe(true);
		expect(accepts("きぇ", "kye")).toBe(true);
		expect(accepts("ぎぃ", "gyi")).toBe(true);
		expect(accepts("ぎぇ", "gye")).toBe(true);
		expect(accepts("しぃ", "syi")).toBe(true);
		expect(accepts("しぇ", "she")).toBe(true);
		expect(accepts("しぇ", "sye")).toBe(true);
		expect(accepts("ちぃ", "tyi")).toBe(true);
		expect(accepts("ちぃ", "cyi")).toBe(true);
		expect(accepts("ちぇ", "che")).toBe(true);
		expect(accepts("ちぇ", "tye")).toBe(true);
		expect(accepts("ちぇ", "cye")).toBe(true);
		expect(accepts("にぃ", "nyi")).toBe(true);
		expect(accepts("にぇ", "nye")).toBe(true);
		expect(accepts("ひぃ", "hyi")).toBe(true);
		expect(accepts("ひぇ", "hye")).toBe(true);
		expect(accepts("みぃ", "myi")).toBe(true);
		expect(accepts("みぇ", "mye")).toBe(true);
		expect(accepts("りぃ", "ryi")).toBe(true);
		expect(accepts("りぇ", "rye")).toBe(true);
		expect(accepts("びぃ", "byi")).toBe(true);
		expect(accepts("びぇ", "bye")).toBe(true);
		expect(accepts("ぴぃ", "pyi")).toBe(true);
		expect(accepts("ぴぇ", "pye")).toBe(true);
	});

	it("ぢ compounds: dya/dyi/dyu/dye/dyo", () => {
		expect(accepts("ぢゃ", "dya")).toBe(true);
		expect(accepts("ぢぃ", "dyi")).toBe(true);
		expect(accepts("ぢゅ", "dyu")).toBe(true);
		expect(accepts("ぢぇ", "dye")).toBe(true);
		expect(accepts("ぢょ", "dyo")).toBe(true);
	});

	it("ゔ (hiragana vu): va/vi/vyi/vu/ve/vye/vo and v-y compounds", () => {
		expect(accepts("ゔ", "vu")).toBe(true);
		expect(accepts("ゔぁ", "va")).toBe(true);
		expect(accepts("ゔぃ", "vi")).toBe(true);
		expect(accepts("ゔぃ", "vyi")).toBe(true);
		expect(accepts("ゔぇ", "ve")).toBe(true);
		expect(accepts("ゔぇ", "vye")).toBe(true);
		expect(accepts("ゔぉ", "vo")).toBe(true);
		expect(accepts("ゔゃ", "vya")).toBe(true);
		expect(accepts("ゔゅ", "vyu")).toBe(true);
		expect(accepts("ゔょ", "vyo")).toBe(true);
	});

	it("ふ fw/fy variants", () => {
		expect(accepts("ふぁ", "fwa")).toBe(true);
		expect(accepts("ふぃ", "fwi")).toBe(true);
		expect(accepts("ふぃ", "fyi")).toBe(true);
		expect(accepts("ふぅ", "fwu")).toBe(true);
		expect(accepts("ふぇ", "fwe")).toBe(true);
		expect(accepts("ふぇ", "fye")).toBe(true);
		expect(accepts("ふぉ", "fwo")).toBe(true);
		expect(accepts("ふゃ", "fya")).toBe(true);
		expect(accepts("ふゅ", "fyu")).toBe(true);
		expect(accepts("ふょ", "fyo")).toBe(true);
	});

	it("ts-row: tsa/tsi/tse/tso", () => {
		expect(accepts("つぁ", "tsa")).toBe(true);
		expect(accepts("つぃ", "tsi")).toBe(true);
		expect(accepts("つぇ", "tse")).toBe(true);
		expect(accepts("つぉ", "tso")).toBe(true);
	});

	it("て-i/e variants: thi/the", () => {
		expect(accepts("てぃ", "thi")).toBe(true);
		expect(accepts("てぇ", "the")).toBe(true);
	});

	it("tw-row: twa/twi/twu/twe/two", () => {
		for (const [kana, ro] of [
			["とぁ", "twa"],
			["とぃ", "twi"],
			["とぅ", "twu"],
			["とぇ", "twe"],
			["とぉ", "two"],
		] as const) {
			expect(accepts(kana, ro)).toBe(true);
		}
	});

	it("dh-row and dw-row", () => {
		expect(accepts("でぃ", "dhi")).toBe(true);
		expect(accepts("でぇ", "dhe")).toBe(true);
		expect(accepts("どぁ", "dwa")).toBe(true);
		expect(accepts("どぉ", "dwo")).toBe(true);
	});

	it("gw-row and sw-row", () => {
		expect(accepts("ぐぁ", "gwa")).toBe(true);
		expect(accepts("ぐぉ", "gwo")).toBe(true);
		expect(accepts("すぁ", "swa")).toBe(true);
		expect(accepts("すぉ", "swo")).toBe(true);
	});

	it("q-row (く compounds): qwa/qa/qyi/qya etc.", () => {
		expect(accepts("くぁ", "qwa")).toBe(true);
		expect(accepts("くぁ", "qa")).toBe(true);
		expect(accepts("くぃ", "qwi")).toBe(true);
		expect(accepts("くぃ", "qi")).toBe(true);
		expect(accepts("くぃ", "qyi")).toBe(true);
		expect(accepts("くぇ", "qye")).toBe(true);
		expect(accepts("くゃ", "qya")).toBe(true);
		expect(accepts("くゅ", "qyu")).toBe(true);
		expect(accepts("くょ", "qyo")).toBe(true);
	});

	it("うぁ~うぉ: wha/whi/whe/who", () => {
		expect(accepts("うぁ", "wha")).toBe(true);
		expect(accepts("うぃ", "whi")).toBe(true);
		expect(accepts("うぇ", "whe")).toBe(true);
		expect(accepts("うぉ", "who")).toBe(true);
	});

	it("wo is を only (not うぉ)", () => {
		expect(accepts("を", "wo")).toBe(true);
		expect(accepts("うぉ", "wo")).toBe(false);
	});
});

describe("parseKana – single kana aliases", () => {
	it("ca=か, cu=く, qu=く, co=こ", () => {
		expect(accepts("か", "ca")).toBe(true);
		expect(accepts("く", "cu")).toBe(true);
		expect(accepts("く", "qu")).toBe(true);
		expect(accepts("こ", "co")).toBe(true);
	});

	it("ci=し, ce=せ", () => {
		expect(accepts("し", "ci")).toBe(true);
		expect(accepts("せ", "ce")).toBe(true);
	});

	it("small kana: lwa/xwa=ゎ, lka/xka=ヵ, lke/xke=ヶ", () => {
		expect(accepts("ゎ", "lwa")).toBe(true);
		expect(accepts("ゎ", "xwa")).toBe(true);
		expect(accepts("ヵ", "lka")).toBe(true);
		expect(accepts("ヵ", "xka")).toBe(true);
		expect(accepts("ヶ", "lke")).toBe(true);
		expect(accepts("ヶ", "xke")).toBe(true);
	});
});

describe("parseKana – っ (xtu family)", () => {
	it("accepts xtu/xtsu/ltu/ltsu", () => {
		// っ before a vowel-starting kana falls back to xtu family only
		const segs = parseKana("っあ");
		const xtuOpts = segs[0]?.options ?? [];
		expect(xtuOpts).toContain("xtu");
		expect(xtuOpts).toContain("xtsu");
		expect(xtuOpts).toContain("ltu");
		expect(xtuOpts).toContain("ltsu");
	});

	it("doubled-consonant path before consonant kana", () => {
		const segs = parseKana("っけ");
		expect(segs[0]?.options[0]).toBe("k"); // doubled consonant listed first
		expect(segs[0]?.options).toContain("ltsu");
	});
});

describe("parseKana – ん", () => {
	it("nn/n'/xn always available", () => {
		const segsAmbig = parseKana("んあ")[0]?.options ?? [];
		expect(segsAmbig).toContain("nn");
		expect(segsAmbig).toContain("n'");
		expect(segsAmbig).toContain("xn");
		// bare "n" must NOT appear before a vowel
		expect(segsAmbig).not.toContain("n");
	});

	it("bare n available before consonant", () => {
		const segsConsonant = parseKana("んか")[0]?.options ?? [];
		expect(segsConsonant).toContain("n");
		expect(segsConsonant).toContain("nn");
		expect(segsConsonant).toContain("n'");
		expect(segsConsonant).toContain("xn");
	});
});

// ── feedKey integration ───────────────────────────────────────────────────────

describe("feedKey – full word typing", () => {
	it("ぷろじぇくと → purojekuto", () => {
		expect(type("ぷろじぇくと", "purojekuto")).toBe("all_complete");
	});

	it("ぷろじぇくと → purojixekuto (decomposed ji+xe)", () => {
		expect(type("ぷろじぇくと", "purojixekuto")).toBe("all_complete");
	});

	it("ん: xn completes before vowel", () => {
		expect(type("んあ", "xna")).toBe("all_complete");
	});

	it("ん: n' completes before vowel", () => {
		expect(type("んあ", "n'a")).toBe("all_complete");
	});

	it("ん: nn completes before vowel", () => {
		expect(type("んあ", "nna")).toBe("all_complete");
	});

	it("ん: bare n auto-completes before consonant", () => {
		expect(type("んか", "nka")).toBe("all_complete");
	});

	it("っ: ltsu path", () => {
		expect(type("っか", "ltsu" + "ka")).toBe("all_complete");
	});

	it("ゔぁ: va", () => {
		expect(type("ゔぁ", "va")).toBe("all_complete");
	});

	it("wo → を, not うぉ", () => {
		expect(type("を", "wo")).toBe("all_complete");
		// うぉ requires who
		expect(type("うぉ", "who")).toBe("all_complete");
		expect(type("うぉ", "wo")).toBe("wrong@o"); // "who" starts with "w" so w passes, but wo is not a prefix of who
	});
});
