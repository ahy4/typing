export interface Sentence {
	id: string;
	japanese: string;
	romaji: string; // display romaji
	kana: string; // hiragana source
}

export interface InputEvent {
	time: number; // ms from game start
	key: string;
	correct: boolean;
	segmentIdx: number;
}

export interface ReplayData {
	id: string;
	timestamp: number;
	sentences: Sentence[];
	events: InputEvent[];
	totalTime: number;
	wpm: number;
	accuracy: number;
}

export interface KeyStats {
	key: string;
	count: number;
	errors: number;
	totalMs: number; // cumulative time between this key presses
}

export interface BigramStats {
	bigram: string;
	count: number;
	totalMs: number;
}

export interface SessionRecord {
	id: string;
	timestamp: number;
	wpm: number;
	accuracy: number;
	duration: number;
	sentences: number;
	keyStats: KeyStats[];
	bigramStats: BigramStats[];
	replay: ReplayData;
}

export type GamePhase =
	| "idle"
	| "ready"
	| "playing"
	| "gameover"
	| "replay"
	| "stats"
	| "help";

export interface GhostState {
	segmentIdx: number;
	charIdx: number;
	speed: number; // ema wpm
	life: number;
	combo: number;
}
