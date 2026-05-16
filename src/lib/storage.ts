import type { GameConfig, ReplayData, SessionRecord } from "./types";

const SESSIONS_KEY = "typing_sessions_v1";
const REPLAYS_KEY = "typing_replays_v1";
const CONFIG_KEY = "typing_config_v1";

export const DEFAULT_CONFIG: GameConfig = {
	volume: 0.5,
	muted: false,
	difficulty: "normal",
	showGhost: true,
};

export function loadConfig(): GameConfig {
	try {
		const raw = localStorage.getItem(CONFIG_KEY);
		if (!raw) return { ...DEFAULT_CONFIG };
		return { ...DEFAULT_CONFIG, ...(JSON.parse(raw) as Partial<GameConfig>) };
	} catch {
		return { ...DEFAULT_CONFIG };
	}
}

export function saveConfig(config: GameConfig): void {
	try {
		localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
	} catch {
		// storage full
	}
}

export function saveSessions(sessions: SessionRecord[]): void {
	try {
		localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
	} catch {
		// storage full
	}
}

export function loadSessions(): SessionRecord[] {
	try {
		const raw = localStorage.getItem(SESSIONS_KEY);
		if (!raw) return [];
		return JSON.parse(raw) as SessionRecord[];
	} catch {
		return [];
	}
}

export function saveReplay(replay: ReplayData): void {
	try {
		const existing = loadReplays();
		existing.push(replay);
		// keep last 20
		const trimmed = existing.slice(-20);
		localStorage.setItem(REPLAYS_KEY, JSON.stringify(trimmed));
	} catch {
		// storage full
	}
}

export function loadReplays(): ReplayData[] {
	try {
		const raw = localStorage.getItem(REPLAYS_KEY);
		if (!raw) return [];
		return JSON.parse(raw) as ReplayData[];
	} catch {
		return [];
	}
}

export function deleteReplay(id: string): void {
	try {
		const existing = loadReplays();
		const filtered = existing.filter((r) => r.id !== id);
		localStorage.setItem(REPLAYS_KEY, JSON.stringify(filtered));
	} catch {
		// storage full
	}
}

export function clearAll(): void {
	localStorage.removeItem(SESSIONS_KEY);
	localStorage.removeItem(REPLAYS_KEY);
}
