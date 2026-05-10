// Small compound kana → l/x prefix alternatives (for decomposed input e.g. ki+lyo for きょ)
const SMALL_COMPOUND_ALTS: Record<string, string[]> = {
	ゃ: ["lya", "xya"],
	ゅ: ["lyu", "xyu"],
	ょ: ["lyo", "xyo"],
};

// Single-kana options used to build decomposed compound alternatives
const SINGLE_KANA_OPTIONS: Record<string, string[]> = {
	き: ["ki"],
	し: ["shi", "si"],
	ち: ["chi", "ti"],
	に: ["ni"],
	ひ: ["hi"],
	み: ["mi"],
	り: ["ri"],
	ぎ: ["gi"],
	じ: ["ji", "zi"],
	び: ["bi"],
	ぴ: ["pi"],
	で: ["de"],
	て: ["te"],
};

// Kana → romaji mappings (compound first)
const KANA_MAP_RAW: Record<string, string[]> = {
	きゃ: ["kya"],
	きゅ: ["kyu"],
	きょ: ["kyo"],
	しゃ: ["sha", "sya"],
	しゅ: ["shu", "syu"],
	しょ: ["sho", "syo"],
	ちゃ: ["cha", "tya", "cya"],
	ちゅ: ["chu", "tyu", "cyu"],
	ちょ: ["cho", "tyo", "cyo"],
	にゃ: ["nya"],
	にゅ: ["nyu"],
	にょ: ["nyo"],
	ひゃ: ["hya"],
	ひゅ: ["hyu"],
	ひょ: ["hyo"],
	みゃ: ["mya"],
	みゅ: ["myu"],
	みょ: ["myo"],
	りゃ: ["rya"],
	りゅ: ["ryu"],
	りょ: ["ryo"],
	ぎゃ: ["gya"],
	ぎゅ: ["gyu"],
	ぎょ: ["gyo"],
	じゃ: ["ja", "zya", "jya"],
	じゅ: ["ju", "zyu", "jyu"],
	じょ: ["jo", "zyo", "jyo"],
	びゃ: ["bya"],
	びゅ: ["byu"],
	びょ: ["byo"],
	ぴゃ: ["pya"],
	ぴゅ: ["pyu"],
	ぴょ: ["pyo"],
	でゃ: ["dha"],
	でゅ: ["dhu"],
	でょ: ["dho"],
	てゃ: ["tha"],
	てゅ: ["thu"],
	てょ: ["tho"],
	ふぁ: ["fa"],
	ふぃ: ["fi"],
	ふぇ: ["fe"],
	ふぉ: ["fo"],
	うぁ: ["wha"],
	うぃ: ["wi"],
	うぇ: ["we"],
	うぉ: ["wo"],
	あ: ["a"],
	い: ["i"],
	う: ["u"],
	え: ["e"],
	お: ["o"],
	か: ["ka"],
	き: ["ki"],
	く: ["ku"],
	け: ["ke"],
	こ: ["ko"],
	さ: ["sa"],
	し: ["si", "shi"],
	す: ["su"],
	せ: ["se"],
	そ: ["so"],
	た: ["ta"],
	ち: ["ti", "chi"],
	つ: ["tu", "tsu"],
	て: ["te"],
	と: ["to"],
	な: ["na"],
	に: ["ni"],
	ぬ: ["nu"],
	ね: ["ne"],
	の: ["no"],
	は: ["ha"],
	ひ: ["hi"],
	ふ: ["fu", "hu"],
	へ: ["he"],
	ほ: ["ho"],
	ま: ["ma"],
	み: ["mi"],
	む: ["mu"],
	め: ["me"],
	も: ["mo"],
	や: ["ya"],
	ゆ: ["yu"],
	よ: ["yo"],
	ら: ["ra"],
	り: ["ri"],
	る: ["ru"],
	れ: ["re"],
	ろ: ["ro"],
	わ: ["wa"],
	ゐ: ["i"],
	ゑ: ["e"],
	を: ["wo"],
	ん: ["nn", "n"],
	が: ["ga"],
	ぎ: ["gi"],
	ぐ: ["gu"],
	げ: ["ge"],
	ご: ["go"],
	ざ: ["za"],
	じ: ["zi", "ji"],
	ず: ["zu"],
	ぜ: ["ze"],
	ぞ: ["zo"],
	だ: ["da"],
	ぢ: ["di"],
	づ: ["du", "dzu"],
	で: ["de"],
	ど: ["do"],
	ば: ["ba"],
	び: ["bi"],
	ぶ: ["bu"],
	べ: ["be"],
	ぼ: ["bo"],
	ぱ: ["pa"],
	ぴ: ["pi"],
	ぷ: ["pu"],
	ぺ: ["pe"],
	ぽ: ["po"],
	ぁ: ["xa", "la"],
	ぃ: ["xi", "li"],
	ぅ: ["xu", "lu"],
	ぇ: ["xe", "le"],
	ぉ: ["xo", "lo"],
	// small compound vowels reachable by l/x prefix alone
	ゃ: ["lya", "xya"],
	ゅ: ["lyu", "xyu"],
	ょ: ["lyo", "xyo"],
	っ: ["xtu", "xtsu", "ltu"],
	ー: ["-"],
	" ": [" "],
};

// Build KANA_MAP by expanding compound kana with l/x decomposed alternatives
const KANA_MAP: Record<string, string[]> = {};
for (const [kana, opts] of Object.entries(KANA_MAP_RAW)) {
	const small = kana.length === 2 ? kana[1] : undefined;
	const smallAlts = small ? SMALL_COMPOUND_ALTS[small] : undefined;
	if (smallAlts) {
		const largeOpts = SINGLE_KANA_OPTIONS[kana[0] ?? ""] ?? [];
		const decomposed: string[] = [];
		for (const l of largeOpts) {
			for (const s of smallAlts) {
				decomposed.push(l + s);
			}
		}
		KANA_MAP[kana] = [...opts, ...decomposed];
	} else {
		KANA_MAP[kana] = opts;
	}
}

const SMALL_KANA = new Set("ぁぃぅぇぉっゃゅょ");

export interface KanaSegment {
	kana: string;
	options: string[];
}

// っ: add only the FIRST consonant of the next segment as an option.
// Typing that single consonant completes っ, then the next segment requires its full romaji.
// e.g. っけ → っ options: ["k","xtu","xtsu","ltu"] + け options: ["ke"] → total "kke" ✓
// The doubled-consonant path is listed first so it shows as the canonical (recommended) display.
function expandXtu(nextOptions: string[]): string[] {
	const consonants: string[] = [];
	for (const opt of nextOptions) {
		const c = opt[0];
		if (c !== undefined && /[bcdfghjklmnpqrstvwxyz]/.test(c)) {
			consonants.push(c);
		}
	}
	const unique = [...new Set(consonants)];
	// Prefer doubled consonant (e.g. "k" for っけ → "kke") over xtu/xtsu/ltu
	return unique.length > 0
		? [...unique, "xtu", "xtsu", "ltu"]
		: ["xtu", "xtsu", "ltu"];
}

export function parseKana(text: string): KanaSegment[] {
	const segments: KanaSegment[] = [];
	let i = 0;
	while (i < text.length) {
		const c = text[i] ?? "";
		if (i + 1 < text.length) {
			const next = text[i + 1] ?? "";
			const compound = c + next;
			if (SMALL_KANA.has(next) && KANA_MAP[compound]) {
				segments.push({
					kana: compound,
					options: KANA_MAP[compound] as string[],
				});
				i += 2;
				continue;
			}
		}
		if (c === "っ") {
			const rest = text.slice(i + 1);
			const tempSegs = parseKana(rest);
			const nextOpts = tempSegs[0]?.options ?? [];
			segments.push({ kana: "っ", options: expandXtu(nextOpts) });
			i++;
			continue;
		}
		if (c === "ん") {
			// bare "n" is valid only before a consonant (not vowel/n/y/end)
			const nextKana = text[i + 1] ?? "";
			const nextRomajiStart = parseKana(nextKana)[0]?.options[0]?.[0] ?? "";
			const nextIsAmbiguous = !nextKana || /^[aiueoyn]/.test(nextRomajiStart);
			const opts: string[] = nextIsAmbiguous ? ["nn"] : ["nn", "n"];
			segments.push({ kana: "ん", options: opts });
			i++;
			continue;
		}
		const options = KANA_MAP[c];
		if (options !== undefined) {
			segments.push({ kana: c, options: options as string[] });
		} else if (c.trim() !== "") {
			segments.push({ kana: c, options: [c] });
		}
		i++;
	}
	return segments;
}

export interface TypingState {
	segments: KanaSegment[];
	segIdx: number;
	typed: string;
	validOptions: string[];
	completed: boolean;
	// true when typed is an exact match but a longer option also exists (e.g. "n" for ん with ["nn","n"])
	pendingComplete: boolean;
}

export function createTypingState(kana: string): TypingState {
	const segments = parseKana(kana);
	const first = segments[0];
	return {
		segments,
		segIdx: 0,
		typed: "",
		validOptions: first ? [...first.options] : [],
		completed: segments.length === 0,
		pendingComplete: false,
	};
}

export type InputResult =
	| "correct"
	| "wrong"
	| "segment_complete"
	| "all_complete";

export interface FeedKeyResult {
	next: TypingState;
	result: InputResult;
	// true when a pending segment was implicitly completed before this key was processed
	segmentCompleted: boolean;
}

function completeSegment(state: TypingState): FeedKeyResult {
	const nextSegIdx = state.segIdx + 1;
	if (nextSegIdx >= state.segments.length) {
		return {
			next: {
				...state,
				segIdx: nextSegIdx,
				typed: "",
				validOptions: [],
				completed: true,
				pendingComplete: false,
			},
			result: "all_complete",
			segmentCompleted: false,
		};
	}
	const nextSeg = state.segments[nextSegIdx];
	if (!nextSeg) throw new Error("segment index out of bounds");
	return {
		next: {
			...state,
			segIdx: nextSegIdx,
			typed: "",
			validOptions: [...nextSeg.options],
			completed: false,
			pendingComplete: false,
		},
		result: "segment_complete",
		segmentCompleted: false,
	};
}

export function feedKey(state: TypingState, key: string): FeedKeyResult {
	// If pending (e.g. typed "n" for ん with ["nn","n"]): try to extend.
	// If can't extend, implicitly complete current segment then feed key into next.
	if (state.pendingComplete) {
		const extended = state.typed + key;
		const stillValid = state.validOptions.filter((o) => o.startsWith(extended));
		if (stillValid.length > 0) {
			const exact = stillValid.find((o) => o === extended);
			const hasLonger = stillValid.some((o) => o.length > extended.length);
			if (exact !== undefined && !hasLonger) {
				return completeSegment({ ...state, typed: extended });
			}
			return {
				next: {
					...state,
					typed: extended,
					validOptions: stillValid,
					pendingComplete: !!(exact && hasLonger),
				},
				result: "correct",
				segmentCompleted: false,
			};
		}

		// Can't extend: implicitly complete current segment, then feed key into next segment
		const nextSegIdx = state.segIdx + 1;
		if (nextSegIdx >= state.segments.length) {
			// Was last segment — it's now complete, key is extra (treat as completing all)
			return {
				next: {
					...state,
					segIdx: nextSegIdx,
					typed: "",
					validOptions: [],
					completed: true,
					pendingComplete: false,
				},
				result: "all_complete",
				segmentCompleted: false,
			};
		}
		const nextSeg = state.segments[nextSegIdx];
		if (!nextSeg) throw new Error("segment index out of bounds");
		const afterComplete: TypingState = {
			...state,
			segIdx: nextSegIdx,
			typed: "",
			validOptions: [...nextSeg.options],
			completed: false,
			pendingComplete: false,
		};
		const nested = feedKey(afterComplete, key);
		return { next: nested.next, result: nested.result, segmentCompleted: true };
	}

	// Normal processing
	const newTyped = state.typed + key;
	const stillValid = state.validOptions.filter((o) => o.startsWith(newTyped));

	if (stillValid.length === 0) {
		return { next: state, result: "wrong", segmentCompleted: false };
	}

	const exact = stillValid.find((o) => o === newTyped);
	const hasLonger = stillValid.some((o) => o.length > newTyped.length);

	if (exact !== undefined && !hasLonger) {
		return completeSegment({ ...state, typed: newTyped });
	}

	return {
		next: {
			...state,
			typed: newTyped,
			validOptions: stillValid,
			pendingComplete: !!(exact && hasLonger),
		},
		result: "correct",
		segmentCompleted: false,
	};
}

export function getDisplayRomaji(state: TypingState): {
	done: string;
	current: string;
	pending: string;
} {
	const seg = state.segments[state.segIdx];
	// Use the first still-valid option as the canonical display
	const canonical = state.validOptions[0] ?? seg?.options[0] ?? "";
	const done = state.segments
		.slice(0, state.segIdx)
		.map((s) => s.options[0] ?? "")
		.join("");
	const pendingSegs = state.segments
		.slice(state.segIdx + 1)
		.map((s) => s.options[0] ?? "")
		.join("");
	return { done, current: canonical, pending: pendingSegs };
}
