import type { ReplayData, SessionRecord } from "./types";

const SESSIONS_KEY = "typing_sessions_v1";
const REPLAYS_KEY = "typing_replays_v1";

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
