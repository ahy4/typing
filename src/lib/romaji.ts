// Kana → romaji mappings (compound first)
const KANA_MAP: Record<string, string[]> = {
  // compound with small ya/yu/yo
  きゃ: ["kya"], きゅ: ["kyu"], きょ: ["kyo"],
  しゃ: ["sha", "sya"], しゅ: ["shu", "syu"], しょ: ["sho", "syo"],
  ちゃ: ["cha", "tya", "cya"], ちゅ: ["chu", "tyu", "cyu"], ちょ: ["cho", "tyo", "cyo"],
  にゃ: ["nya"], にゅ: ["nyu"], にょ: ["nyo"],
  ひゃ: ["hya"], ひゅ: ["hyu"], ひょ: ["hyo"],
  みゃ: ["mya"], みゅ: ["myu"], みょ: ["myo"],
  りゃ: ["rya"], りゅ: ["ryu"], りょ: ["ryo"],
  ぎゃ: ["gya"], ぎゅ: ["gyu"], ぎょ: ["gyo"],
  じゃ: ["ja", "zya", "jya"], じゅ: ["ju", "zyu", "jyu"], じょ: ["jo", "zyo", "jyo"],
  びゃ: ["bya"], びゅ: ["byu"], びょ: ["byo"],
  ぴゃ: ["pya"], ぴゅ: ["pyu"], ぴょ: ["pyo"],
  でゃ: ["dha"], でゅ: ["dhu"], でょ: ["dho"],
  てゃ: ["tha"], てゅ: ["thu"], てょ: ["tho"],
  ふぁ: ["fa"], ふぃ: ["fi"], ふぇ: ["fe"], ふぉ: ["fo"],
  うぁ: ["wha"], うぃ: ["wi"], うぇ: ["we"], うぉ: ["wo"],
  // single kana
  あ: ["a"], い: ["i"], う: ["u"], え: ["e"], お: ["o"],
  か: ["ka"], き: ["ki"], く: ["ku"], け: ["ke"], こ: ["ko"],
  さ: ["sa"], し: ["si", "shi"], す: ["su"], せ: ["se"], そ: ["so"],
  た: ["ta"], ち: ["ti", "chi"], つ: ["tu", "tsu"], て: ["te"], と: ["to"],
  な: ["na"], に: ["ni"], ぬ: ["nu"], ね: ["ne"], の: ["no"],
  は: ["ha"], ひ: ["hi"], ふ: ["fu", "hu"], へ: ["he"], ほ: ["ho"],
  ま: ["ma"], み: ["mi"], む: ["mu"], め: ["me"], も: ["mo"],
  や: ["ya"], ゆ: ["yu"], よ: ["yo"],
  ら: ["ra"], り: ["ri"], る: ["ru"], れ: ["re"], ろ: ["ro"],
  わ: ["wa"], ゐ: ["i"], ゑ: ["e"], を: ["wo"],
  ん: ["nn", "n"],
  が: ["ga"], ぎ: ["gi"], ぐ: ["gu"], げ: ["ge"], ご: ["go"],
  ざ: ["za"], じ: ["zi", "ji"], ず: ["zu"], ぜ: ["ze"], ぞ: ["zo"],
  だ: ["da"], ぢ: ["di"], づ: ["du", "dzu"], で: ["de"], ど: ["do"],
  ば: ["ba"], び: ["bi"], ぶ: ["bu"], べ: ["be"], ぼ: ["bo"],
  ぱ: ["pa"], ぴ: ["pi"], ぷ: ["pu"], ぺ: ["pe"], ぽ: ["po"],
  ぁ: ["xa", "la"], ぃ: ["xi", "li"], ぅ: ["xu", "lu"], ぇ: ["xe", "le"], ぉ: ["xo", "lo"],
  っ: ["xtu", "xtsu", "ltu"],
  ー: ["-"],
  " ": [" "],
};

const SMALL_KANA = new Set("ぁぃぅぇぉっゃゅょ");

export interface KanaSegment {
  kana: string;
  options: string[]; // romaji candidates
}

// っ needs special handling: double the first consonant of the next segment
function expandXtu(nextOptions: string[]): string[] {
  const results: string[] = ["xtu", "xtsu", "ltu"];
  for (const opt of nextOptions) {
    if (opt.length > 0 && opt[0] !== undefined) {
      const c = opt[0];
      if (c !== undefined && /[a-z]/.test(c) && c !== "a" && c !== "i" && c !== "u" && c !== "e" && c !== "o") {
        results.push(c + opt);
      }
    }
  }
  return [...new Set(results)];
}

export function parseKana(text: string): KanaSegment[] {
  const segments: KanaSegment[] = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i] ?? "";
    // Try compound (two chars)
    if (i + 1 < text.length) {
      const next = text[i + 1] ?? "";
      const compound = c + next;
      if (SMALL_KANA.has(next) && KANA_MAP[compound]) {
        segments.push({ kana: compound, options: KANA_MAP[compound] as string[] });
        i += 2;
        continue;
      }
    }
    if (c === "っ") {
      // Look ahead for next segment's options to build double-consonant forms
      const rest = text.slice(i + 1);
      const tempSegs = parseKana(rest);
      const nextOpts = tempSegs[0]?.options ?? [];
      const opts = expandXtu(nextOpts);
      segments.push({ kana: "っ", options: opts });
      i++;
      continue;
    }
    if (c === "ん") {
      // 'n' is only valid if next char is not a vowel or 'n' or 'y'
      const next = text[i + 1] ?? "";
      const nextIsVowelOrN = /^[aiueoyn]/.test(next) || next === "";
      const opts: string[] = nextIsVowelOrN ? ["nn"] : ["nn", "n"];
      segments.push({ kana: "ん", options: opts });
      i++;
      continue;
    }
    const options = KANA_MAP[c];
    if (options !== undefined) {
      segments.push({ kana: c, options: options as string[] });
    } else if (c.trim() === "" || /[　-〿＀-￯]/.test(c)) {
      // punctuation/space — skip or treat as literal
    } else {
      // Treat as literal (e.g. ASCII punctuation in sentences)
      segments.push({ kana: c, options: [c] });
    }
    i++;
  }
  return segments;
}

// State machine for validating romaji input against segments
export interface TypingState {
  segments: KanaSegment[];
  segIdx: number; // current segment index
  typed: string; // user has typed this for current segment
  validOptions: string[]; // still-valid options
  completed: boolean;
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
  };
}

export type InputResult = "correct" | "wrong" | "segment_complete" | "all_complete";

export function feedKey(state: TypingState, key: string): { next: TypingState; result: InputResult } {
  const newTyped = state.typed + key;
  const stillValid = state.validOptions.filter((o) => o.startsWith(newTyped));

  if (stillValid.length === 0) {
    return { next: state, result: "wrong" };
  }

  // Check if any option is exactly matched
  const exact = stillValid.find((o) => o === newTyped);
  if (exact !== undefined) {
    const nextSegIdx = state.segIdx + 1;
    if (nextSegIdx >= state.segments.length) {
      return {
        next: { ...state, segIdx: nextSegIdx, typed: "", validOptions: [], completed: true },
        result: "all_complete",
      };
    }
    const nextSeg = state.segments[nextSegIdx];
    const nextOptions = nextSeg ? [...nextSeg.options] : [];
    return {
      next: { ...state, segIdx: nextSegIdx, typed: "", validOptions: nextOptions, completed: false },
      result: "segment_complete",
    };
  }

  return {
    next: { ...state, typed: newTyped, validOptions: stillValid },
    result: "correct",
  };
}

export function getDisplayRomaji(state: TypingState): { done: string; current: string; pending: string } {
  const seg = state.segments[state.segIdx];
  const canonical = seg?.options[0] ?? "";
  const done = state.segments
    .slice(0, state.segIdx)
    .map((s) => s.options[0] ?? "")
    .join("");
  const pending = state.segments
    .slice(state.segIdx + 1)
    .map((s) => s.options[0] ?? "")
    .join("");
  return { done, current: canonical, pending };
}
