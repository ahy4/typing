import { describe, expect, it } from "vitest";
import { createTypingState, feedKey, parseKana } from "./romaji.ts";

// Helper that returns the full FeedKeyResult (not just the string outcome)
function typeDetailed(kana: string, input: string) {
	let state = createTypingState(kana);
	const results: Array<{
		key: string;
		result: string;
		segmentCompleted: boolean;
	}> = [];
	for (const ch of input) {
		const r = feedKey(state, ch);
		results.push({
			key: ch,
			result: r.result,
			segmentCompleted: r.segmentCompleted,
		});
		if (r.result === "wrong") break;
		state = r.next;
	}
	return results;
}

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

	it("きぃ → kixi (decomposed ki+xi)", () => {
		expect(type("きぃ", "kixi")).toBe("all_complete");
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

// ── っ edge cases ─────────────────────────────────────────────────────────────

describe("っ – before vowel kana", () => {
	it("っあ: no doubled consonant, only xtu/xtsu/ltu/ltsu", () => {
		const opts = parseKana("っあ")[0]?.options ?? [];
		expect(opts).toContain("xtu");
		expect(opts).toContain("xtsu");
		expect(opts).toContain("ltu");
		expect(opts).toContain("ltsu");
		// 'a' is a vowel, so no single-char doubled consonant
		expect(opts.filter((o) => o.length === 1)).toHaveLength(0);
	});

	it("っあ: only xtu/ltsu paths accepted", () => {
		expect(type("っあ", "xtu" + "a")).toBe("all_complete");
		expect(type("っあ", "ltsu" + "a")).toBe("all_complete");
		expect(type("っあ", "ltu" + "a")).toBe("all_complete");
		expect(type("っあ", "xtsu" + "a")).toBe("all_complete");
	});
});

describe("っ – doubled consonant variants", () => {
	it("っか: kka and cca", () => {
		expect(type("っか", "kka")).toBe("all_complete");
		expect(type("っか", "cca")).toBe("all_complete");
	});

	it("っし: sshi / ssi / cci all work", () => {
		expect(type("っし", "sshi")).toBe("all_complete");
		expect(type("っし", "ssi")).toBe("all_complete");
		// 'c' is a valid first consonant of し (ci)
		expect(type("っし", "cci")).toBe("all_complete");
	});

	it("っち: tchi / tti / cchi all work", () => {
		expect(type("っち", "tchi")).toBe("all_complete");
		expect(type("っち", "tti")).toBe("all_complete");
		expect(type("っち", "cchi")).toBe("all_complete");
	});

	it("っつ: ttsu and ttu work", () => {
		expect(type("っつ", "ttsu")).toBe("all_complete");
		expect(type("っつ", "ttu")).toBe("all_complete");
	});

	it("っふ: ffu (doubled f) and hhu (doubled h)", () => {
		expect(type("っふ", "ffu")).toBe("all_complete");
		expect(type("っふ", "hhu")).toBe("all_complete");
	});
});

describe("っ – at end of string (no following kana)", () => {
	it("standalone っ: only xtu/xtsu/ltu/ltsu accepted", () => {
		const opts = parseKana("っ")[0]?.options ?? [];
		expect(opts).toContain("xtu");
		expect(opts).toContain("xtsu");
		expect(opts).toContain("ltu");
		expect(opts).toContain("ltsu");
		// No consonant-only options when nothing follows
		expect(opts.filter((o) => o.length === 1)).toHaveLength(0);
	});

	it("standalone っ types with xtu", () => {
		expect(type("っ", "xtu")).toBe("all_complete");
		expect(type("っ", "ltsu")).toBe("all_complete");
	});
});

describe("っっ – consecutive small tsu (BUG DETECTION)", () => {
	it("っっか: doubled-consonant 'k' path (kkka) works", () => {
		expect(type("っっか", "kkka")).toBe("all_complete");
	});

	it("っっか: explicit xtu for each っ works", () => {
		expect(type("っっか", "xtu" + "xtu" + "ka")).toBe("all_complete");
		expect(type("っっか", "ltsu" + "ltsu" + "ka")).toBe("all_complete");
		expect(type("っっか", "xtu" + "kka")).toBe("all_complete");
		expect(type("っっか", "ltsu" + "kka")).toBe("all_complete");
	});

	it("っっか: spurious 'x'/'l' should NOT complete first っ as a doubled consonant", () => {
		// expandXtu sees xtu/xtsu/ltu/ltsu and extracts 'x','l' as "consonants" – this is a bug.
		// Typing 'x' alone (not a valid doubled consonant) should be wrong here.
		expect(type("っっか", "xkka")).not.toBe("all_complete");
		expect(type("っっか", "lkka")).not.toBe("all_complete");
	});

	it("first っ options should NOT contain 'x' or 'l' as single-char consonants", () => {
		const firstOpts = parseKana("っっか")[0]?.options ?? [];
		const singleCharOpts = firstOpts.filter((o) => o.length === 1);
		// Only real doubled consonants (k, c) should appear as single chars
		expect(singleCharOpts).not.toContain("x");
		expect(singleCharOpts).not.toContain("l");
	});
});

// ── ん edge cases ─────────────────────────────────────────────────────────────

describe("ん – at end of word", () => {
	it("bare n is NOT enough at end of word", () => {
		expect(type("ほん", "hon")).toBe("incomplete");
	});

	it("nn / n' / xn complete ん at end of word", () => {
		expect(type("ほん", "honn")).toBe("all_complete");
		expect(type("ほん", "hon'")).toBe("all_complete");
		// xn: type 'x' first then 'n' (not 'n' then 'x')
		expect(type("ほん", "hoxn")).toBe("all_complete");
	});
});

describe("ん – before ambiguous contexts", () => {
	it("bare n NOT allowed before な (starts with n)", () => {
		const opts = parseKana("んな")[0]?.options ?? [];
		expect(opts).not.toContain("n");
	});

	it("bare n NOT allowed before ん itself", () => {
		const opts = parseKana("んん")[0]?.options ?? [];
		expect(opts).not.toContain("n");
	});

	it("bare n NOT allowed before や行", () => {
		const opts = parseKana("んや")[0]?.options ?? [];
		expect(opts).not.toContain("n");
	});

	it("んな: needs nnna (nn for ん, na for な)", () => {
		expect(type("んな", "nna")).toBe("wrong@a"); // nn completes ん, then 'a' fails な
		expect(type("んな", "nnna")).toBe("all_complete");
	});

	it("んん: needs nnnn", () => {
		expect(type("んん", "nnnn")).toBe("all_complete");
		expect(type("んん", "n'nn")).toBe("all_complete");
	});
});

describe("ん – pendingComplete + segmentCompleted flag", () => {
	it("'n' before consonant sets pendingComplete, implicit-complete fires on consonant", () => {
		const results = typeDetailed("んか", "nka");
		// 'n': pendingComplete – correct
		expect(results[0]).toMatchObject({ key: "n", result: "correct" });
		// 'k': implicit ん complete fires, then 'k' starts か – segmentCompleted=true
		expect(results[1]).toMatchObject({
			key: "k",
			result: "correct",
			segmentCompleted: true,
		});
		// 'a': finishes か
		expect(results[2]).toMatchObject({ key: "a", result: "all_complete" });
	});

	it("'n' before consonant: two-n path also works (nn + ka)", () => {
		expect(type("んか", "nnka")).toBe("all_complete");
	});
});

// ── compound decomposition edge cases ────────────────────────────────────────

describe("compound kana – decomposed typing", () => {
	it("きょ: kyo (direct) and kilyo (decomposed)", () => {
		expect(type("きょ", "kyo")).toBe("all_complete");
		expect(type("きょ", "kilyo")).toBe("all_complete");
		expect(type("きょ", "kixyo")).toBe("all_complete");
	});

	it("しゃ: sha (direct) and shilya (decomposed)", () => {
		expect(type("しゃ", "sha")).toBe("all_complete");
		expect(type("しゃ", "shilya")).toBe("all_complete");
		expect(type("しゃ", "silya")).toBe("all_complete");
	});

	it("じぇ: je (direct) and jixe (decomposed)", () => {
		expect(type("じぇ", "je")).toBe("all_complete");
		expect(type("じぇ", "jixe")).toBe("all_complete");
		expect(type("じぇ", "zixe")).toBe("all_complete");
	});

	it("きぃ: kyi (direct) and kixi / kili (decomposed)", () => {
		expect(type("きぃ", "kyi")).toBe("all_complete");
		expect(type("きぃ", "kixi")).toBe("all_complete");
		expect(type("きぃ", "kili")).toBe("all_complete");
	});

	it("decomposed path: wrong small kana is rejected", () => {
		// きょ typed as "kiyo" should fail (yo ≠ lyo/xyo)
		expect(type("きょ", "kiyo")).toBe("wrong@y");
	});
});

// ── special and archaic kana ──────────────────────────────────────────────────

describe("special kana", () => {
	it("ー (long vowel): typed as '-'", () => {
		expect(type("ー", "-")).toBe("all_complete");
	});

	it("space: typed as ' '", () => {
		expect(type(" ", " ")).toBe("all_complete");
	});

	it("ゐ (wi) and ゑ (we): typed as 'i' and 'e'", () => {
		expect(type("ゐ", "i")).toBe("all_complete");
		expect(type("ゑ", "e")).toBe("all_complete");
	});

	it("づ: du and dzu both accepted", () => {
		expect(type("づ", "du")).toBe("all_complete");
		expect(type("づ", "dzu")).toBe("all_complete");
	});

	it("ぢ: only di accepted (not ji or chi)", () => {
		expect(accepts("ぢ", "di")).toBe(true);
		expect(accepts("ぢ", "ji")).toBe(false);
		expect(accepts("ぢ", "chi")).toBe(false);
	});

	it("ゔ: vu accepted", () => {
		expect(type("ゔ", "vu")).toBe("all_complete");
	});
});

// ── feedKey state machine edge cases ─────────────────────────────────────────

describe("feedKey – state machine edge cases", () => {
	it("typing into already-completed state returns wrong", () => {
		const state = createTypingState("あ");
		const r1 = feedKey(state, "a");
		expect(r1.result).toBe("all_complete");
		// feed more keys after completion
		const r2 = feedKey(r1.next, "a");
		expect(r2.result).toBe("wrong");
	});

	it("empty kana string starts as completed", () => {
		const state = createTypingState("");
		expect(state.completed).toBe(true);
	});

	it("wrong key leaves state unchanged", () => {
		const state = createTypingState("か");
		const r = feedKey(state, "z");
		expect(r.result).toBe("wrong");
		expect(r.next).toBe(state); // same reference
	});

	it("uppercase key is rejected (no option matches)", () => {
		expect(type("か", "Ka")).toBe("wrong@K");
		expect(type("あ", "A")).toBe("wrong@A");
	});

	it("partial xtu path: 'x' then wrong key is wrong (not silent complete)", () => {
		// For a standalone っか, 'x' starts the xtu path (pendingComplete),
		// then a key that can't extend it AND can't start the next segment is wrong.
		// っか next segment is か(["ka","ca"]). After implicit complete of っ, 'z' fails か.
		expect(type("っか", "xz")).toBe("wrong@z");
	});
});

// ── multi-segment integration tests ──────────────────────────────────────────

describe("feedKey – multi-segment integration", () => {
	it("とうきょう → toukyou", () => {
		expect(type("とうきょう", "toukyou")).toBe("all_complete");
	});

	it("にほんご → nihongo", () => {
		expect(type("にほんご", "nihongo")).toBe("all_complete");
	});

	it("にほんご: bare n auto-completes before g", () => {
		expect(type("にほんご", "nihongo")).toBe("all_complete");
	});

	it("さんぽ → sanpo (n before p)", () => {
		expect(type("さんぽ", "sanpo")).toBe("all_complete");
	});

	it("まっちゃ → maccha / matcha / mattya", () => {
		expect(type("まっちゃ", "maccha")).toBe("all_complete");
		expect(type("まっちゃ", "matcha")).toBe("all_complete");
		expect(type("まっちゃ", "mattya")).toBe("all_complete");
	});

	it("ほっかいどう → hokkaidou", () => {
		expect(type("ほっかいどう", "hokkaidou")).toBe("all_complete");
	});

	it("んん at end of word: requires 4 n's", () => {
		expect(type("んん", "nnnn")).toBe("all_complete");
		expect(type("んん", "nn" + "n'")).toBe("all_complete");
	});

	it("っ before づ: doubled d", () => {
		expect(type("っづ", "ddzu")).toBe("all_complete");
		expect(type("っづ", "ddu")).toBe("all_complete");
	});

	it("っ before compound kana: っきゃ → kkya / kkilya", () => {
		expect(type("っきゃ", "kkya")).toBe("all_complete");
		// ゃ decomposes as lya (not lyo which is for ょ)
		expect(type("っきゃ", "kkilya")).toBe("all_complete");
	});

	it("っ before じゃ: jja / zzya", () => {
		expect(type("っじゃ", "jja")).toBe("all_complete");
		expect(type("っじゃ", "zzya")).toBe("all_complete");
	});

	it("っ before しゃ: ssha / ssya", () => {
		expect(type("っしゃ", "ssha")).toBe("all_complete");
		expect(type("っしゃ", "ssya")).toBe("all_complete");
	});

	it("にほんご: n' and xn paths for ん", () => {
		expect(type("にほんご", "niho" + "n'" + "go")).toBe("all_complete");
		expect(type("にほんご", "nihoxngo")).toBe("all_complete");
	});

	it("にほんのき: ん before の (starts with n) requires nn", () => {
		// の starts with 'n' → ambiguous → bare n not allowed
		const opts = parseKana("んの")[0]?.options ?? [];
		expect(opts).not.toContain("n");
		expect(opts).toContain("nn");
	});

	it("ん before は行: bare n is OK", () => {
		expect(type("んは", "nha")).toBe("all_complete");
		expect(type("んほ", "nho")).toBe("all_complete");
	});

	it("ん before ら行: bare n is OK", () => {
		expect(type("んら", "nra")).toBe("all_complete");
	});

	it("ん before わ: bare n is OK", () => {
		expect(type("んわ", "nwa")).toBe("all_complete");
	});

	it("ん before ゐ (maps to 'i'): bare n is NOT OK (ambiguous)", () => {
		const opts = parseKana("んゐ")[0]?.options ?? [];
		expect(opts).not.toContain("n");
	});

	it("ん before ゑ (maps to 'e'): bare n is NOT OK (ambiguous)", () => {
		const opts = parseKana("んゑ")[0]?.options ?? [];
		expect(opts).not.toContain("n");
	});
});

// ── pendingComplete wrong path (BUG DETECTION) ───────────────────────────────

describe("pendingComplete – wrong key state consistency", () => {
	// When ん has pendingComplete=true (bare n, before consonant) and the user
	// types a wrong key that can't extend the pending option AND can't start the
	// next segment, feedKey returns result="wrong" but next=<afterComplete state>.
	// In the normal wrong path, next===currentState (no advancement).
	// The inconsistency means ん can be silently "completed" on a wrong keystroke.

	it("'n' + wrong key on んか: result is wrong", () => {
		const state0 = createTypingState("んか");
		const r1 = feedKey(state0, "n"); // pendingComplete
		expect(r1.result).toBe("correct");
		const r2 = feedKey(r1.next, "z"); // wrong key: can't extend, can't start か
		expect(r2.result).toBe("wrong");
	});

	it("'n' + wrong key on んか: next state should still be on ん (BUG: is on か)", () => {
		const state0 = createTypingState("んか");
		const r1 = feedKey(state0, "n");
		const r2 = feedKey(r1.next, "z");
		// BUG: r2.next is afterComplete (segIdx=1, on か) instead of staying on ん
		// Expected: segIdx=0 (still on ん), but actual: segIdx=1 (advanced to か)
		expect(r2.next.segIdx).toBe(0); // currently fails → bug confirmed
	});

	it("normal wrong path does NOT advance state", () => {
		// Sanity check: a plain wrong key keeps segIdx unchanged
		const state0 = createTypingState("かき");
		const r = feedKey(state0, "z");
		expect(r.result).toBe("wrong");
		expect(r.next.segIdx).toBe(0); // stays on か
	});
});

// ── typedSegments accuracy ────────────────────────────────────────────────────

describe("typedSegments tracking", () => {
	it("records each completed segment's typed string", () => {
		const state0 = createTypingState("かき");
		const r1 = feedKey(state0, "k");
		const r2 = feedKey(r1.next, "a"); // か complete
		expect(r2.result).toBe("segment_complete");
		expect(r2.next.typedSegments).toEqual(["ka"]);

		const r3 = feedKey(r2.next, "k");
		const r4 = feedKey(r3.next, "i"); // き complete
		expect(r4.result).toBe("all_complete");
		expect(r4.next.typedSegments).toEqual(["ka", "ki"]);
	});

	it("records the exact option used (not canonical)", () => {
		// Type か using the 'ca' alias
		const state0 = createTypingState("か");
		const r1 = feedKey(state0, "c");
		const r2 = feedKey(r1.next, "a");
		expect(r2.result).toBe("all_complete");
		expect(r2.next.typedSegments).toEqual(["ca"]);
	});

	it("records pending-complete segment with its implicit typed string", () => {
		// Type んか with bare n for ん (pendingComplete path)
		const state0 = createTypingState("んか");
		const r1 = feedKey(state0, "n"); // pendingComplete
		const r2 = feedKey(r1.next, "k"); // implicit complete ん, then 'k' starts か
		expect(r2.segmentCompleted).toBe(true);
		// ん should be recorded as "n" in typedSegments
		expect(r2.next.typedSegments).toEqual(["n"]);
	});
});
