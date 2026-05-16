export interface Sentence {
	id: string;
	japanese: string;
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
	ghostReplayId?: string;
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
	| "help"
	| "config";

export type Difficulty = "easy" | "normal" | "hard";

export interface GameConfig {
	volume: number; // 0.0 – 1.0
	difficulty: Difficulty;
	showGhost: boolean;
}

export interface GhostState {
	segmentIdx: number;
	charIdx: number;
	speed: number; // ema wpm
	life: number;
	combo: number;
}
