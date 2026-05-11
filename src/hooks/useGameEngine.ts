import { useCallback, useEffect, useRef, useState } from "react";
import { SlidingWindowKPS } from "../lib/ema";
import { createTypingState, feedKey } from "../lib/romaji";
import { getSentenceQueue } from "../lib/sentences";
import {
	playComboMilestone,
	playKeyTap,
	playMiss,
	playSegmentComplete,
} from "../lib/sound";
import {
	clearAll,
	loadReplays,
	loadSessions,
	saveReplay,
	saveSessions,
} from "../lib/storage";
import type {
	BigramStats,
	GamePhase,
	InputEvent,
	KeyStats,
	ReplayData,
	Sentence,
	SessionRecord,
} from "../lib/types";

const LIFE_MAX = 100;
const LIFE_DRAIN_BASE = 0.04;
const LIFE_DRAIN_COMBO_FACTOR = 0.6;
const LIFE_RECOVER_CORRECT = 0.03;
export const LIFE_DRAIN_MISS = 5;
// combo increments by 1 on each correct key; HP heals at growing intervals
const KEYS_PER_COMBO = 10;
const REFILL_AT = 3; // add more sentences when this many remain

// --- Shared HP logic (used by both live player and ghost precompute) ---

interface KeyHP {
	lifeDelta: number;
	newCombo: number;
	newNextHealAt: number;
	newNextHealInterval: number;
	healAmount: number;
}

function drainDelta(combo: number, dt: number): number {
	const comboFactor = combo > 0 ? LIFE_DRAIN_COMBO_FACTOR : 1;
	return -(LIFE_DRAIN_BASE * comboFactor * dt) / (1000 / 60);
}

function correctKeyHP(
	combo: number,
	nextHealAt: number,
	nextHealInterval: number,
): KeyHP {
	const newCombo = combo + 1;
	const healTick =
		newCombo === nextHealAt ? nextHealInterval / KEYS_PER_COMBO : 0;
	return {
		lifeDelta: LIFE_RECOVER_CORRECT + healTick,
		newCombo,
		newNextHealAt:
			healTick > 0
				? nextHealAt + nextHealInterval + KEYS_PER_COMBO
				: nextHealAt,
		newNextHealInterval:
			healTick > 0 ? nextHealInterval + KEYS_PER_COMBO : nextHealInterval,
		healAmount: healTick,
	};
}

function wrongKeyHP(isConsecutiveMiss: boolean): KeyHP {
	return {
		lifeDelta: isConsecutiveMiss ? 0 : -LIFE_DRAIN_MISS,
		newCombo: 0,
		newNextHealAt: KEYS_PER_COMBO,
		newNextHealInterval: KEYS_PER_COMBO,
		healAmount: 0,
	};
}

// ----------------------------------------------------------------------

interface GhostTimelineEntry {
	time: number;
	sentenceIdx: number;
	segIdx: number;
	speed: number;
	life: number;
}

function precomputeGhostTimeline(replay: ReplayData): GhostTimelineEntry[] {
	const timeline: GhostTimelineEntry[] = [
		{ time: 0, sentenceIdx: 0, segIdx: 0, speed: 0, life: LIFE_MAX },
	];
	let sentenceIdx = 0;
	let typingState = createTypingState(replay.sentences[0]?.kana ?? "");
	const kps = new SlidingWindowKPS(2000);
	let lastEventTime = 0;
	let life = LIFE_MAX;
	let combo = 0;
	let nextHealAt = KEYS_PER_COMBO;
	let nextHealInterval = KEYS_PER_COMBO;
	let lastWasWrong = false;

	for (const ev of replay.events) {
		const dt = ev.time - lastEventTime;
		life = Math.max(0, life + drainDelta(combo, dt));
		lastEventTime = ev.time;

		if (!ev.correct) {
			const upd = wrongKeyHP(lastWasWrong);
			life = Math.max(0, life + upd.lifeDelta);
			combo = upd.newCombo;
			nextHealAt = upd.newNextHealAt;
			nextHealInterval = upd.newNextHealInterval;
			lastWasWrong = true;
			timeline.push({
				time: ev.time,
				sentenceIdx,
				segIdx: typingState.segIdx,
				speed: kps.get(ev.time),
				life,
			});
			continue;
		}

		lastWasWrong = false;
		kps.update(ev.time);
		const upd = correctKeyHP(combo, nextHealAt, nextHealInterval);
		life = Math.min(LIFE_MAX, life + upd.lifeDelta);
		combo = upd.newCombo;
		nextHealAt = upd.newNextHealAt;
		nextHealInterval = upd.newNextHealInterval;

		const { next, result } = feedKey(typingState, ev.key);
		if (result === "all_complete") {
			sentenceIdx++;
			const nextSentence = replay.sentences[sentenceIdx];
			typingState = createTypingState(nextSentence?.kana ?? "");
		} else {
			typingState = next;
		}
		timeline.push({
			time: ev.time,
			sentenceIdx,
			segIdx: typingState.segIdx,
			speed: kps.get(ev.time),
			life,
		});
	}
	return timeline;
}

function getGhostAt(
	timeline: GhostTimelineEntry[],
	elapsed: number,
): GhostTimelineEntry {
	if (timeline.length === 0)
		return { time: 0, sentenceIdx: 0, segIdx: 0, speed: 0, life: LIFE_MAX };
	let lo = 0;
	let hi = timeline.length - 1;
	while (lo < hi) {
		const mid = (lo + hi + 1) >> 1;
		if ((timeline[mid]?.time ?? 0) <= elapsed) lo = mid;
		else hi = mid - 1;
	}
	return (
		timeline[lo] ?? {
			time: 0,
			sentenceIdx: 0,
			segIdx: 0,
			speed: 0,
			life: LIFE_MAX,
		}
	);
}

export interface GameState {
	phase: GamePhase;
	sentences: Sentence[];
	sentenceIdx: number;
	typingState: ReturnType<typeof createTypingState>;
	life: number;
	combo: number;
	speed: number;
	events: InputEvent[];
	startTime: number;
	elapsed: number;
	totalCorrect: number;
	totalErrors: number;
	sessions: SessionRecord[];
	lastSession: SessionRecord | null;
	ghostSentenceIdx: number;
	ghostSpeed: number;
	ghostLife: number;
	hasGhost: boolean;
	lastHealAmount: number;
	lastHealId: number;
	lastWrong: boolean;
	nextHealAt: number;
	nextHealInterval: number;
}

export function useGameEngine() {
	const kpsWindowRef = useRef(new SlidingWindowKPS(2000));
	const streakRef = useRef(0);
	const lastKeyTimeRef = useRef<number>(0);
	const lastWasWrongRef = useRef<boolean>(false);
	const rafRef = useRef<number>(0);
	const lastFrameTimeRef = useRef<number>(0);
	const eventsRef = useRef<InputEvent[]>([]);
	const keyStatsRef = useRef<Map<string, KeyStats>>(new Map());
	const bigramRef = useRef<Map<string, BigramStats>>(new Map());
	const prevKeyRef = useRef<string>("");
	const ghostTimelineRef = useRef<GhostTimelineEntry[]>([]);
	const totalSentencesRef = useRef<number>(0);
	const tickRef = useRef<(now: number) => void>(() => {});

	const [state, setState] = useState<GameState>(() => ({
		phase: "idle",
		sentences: [],
		sentenceIdx: 0,
		typingState: createTypingState(""),
		life: LIFE_MAX,
		combo: 0,
		speed: 0,
		events: [],
		startTime: 0,
		elapsed: 0,
		totalCorrect: 0,
		totalErrors: 0,
		sessions: loadSessions(),
		lastSession: null,
		ghostSentenceIdx: 0,
		ghostSpeed: 0,
		ghostLife: LIFE_MAX,
		hasGhost: false,
		lastHealAmount: 0,
		lastHealId: 0,
		lastWrong: false,
		nextHealAt: KEYS_PER_COMBO,
		nextHealInterval: KEYS_PER_COMBO,
	}));

	const stateRef = useRef(state);
	useEffect(() => {
		stateRef.current = state;
	});

	const endGame = useCallback((saveResult = true) => {
		cancelAnimationFrame(rafRef.current);
		if (!saveResult) {
			setState((prev) => ({ ...prev, phase: "idle" }));
			return;
		}
		const s = stateRef.current;
		const duration = Date.now() - s.startTime;
		const totalKeys = s.totalCorrect + s.totalErrors;
		const accuracy = totalKeys > 0 ? s.totalCorrect / totalKeys : 0;
		// Average KPS over whole session
		const wpm = duration > 0 ? s.totalCorrect / (duration / 1000) : 0;
		const keyStats = Array.from(keyStatsRef.current.values());
		const bigramStats = Array.from(bigramRef.current.values());

		const replay: ReplayData = {
			id: crypto.randomUUID(),
			timestamp: Date.now(),
			sentences: s.sentences,
			events: eventsRef.current,
			totalTime: duration,
			wpm,
			accuracy,
		};

		const session: SessionRecord = {
			id: crypto.randomUUID(),
			timestamp: Date.now(),
			wpm,
			accuracy,
			duration,
			sentences: s.sentenceIdx,
			keyStats,
			bigramStats,
			replay,
		};

		saveReplay(replay);
		const existing = loadSessions();
		existing.push(session);
		saveSessions(existing.slice(-100));

		setState((prev) => ({
			...prev,
			phase: "gameover",
			sessions: existing.slice(-100),
			lastSession: session,
		}));
	}, []);

	const tick = useCallback(
		(now: number) => {
			const dt = now - lastFrameTimeRef.current;
			lastFrameTimeRef.current = now;

			setState((prev) => {
				if (prev.phase !== "playing") return prev;

				const newLife = Math.max(0, prev.life + drainDelta(prev.combo, dt));
				const elapsed = Date.now() - prev.startTime;

				// Ghost position
				const ghost = getGhostAt(ghostTimelineRef.current, elapsed);

				const speed = kpsWindowRef.current.get(elapsed);

				if (newLife <= 0) {
					setTimeout(endGame, 0);
					return {
						...prev,
						life: 0,
						elapsed,
						speed,
						ghostSentenceIdx: ghost.sentenceIdx,
						ghostSpeed: ghost.speed,
						ghostLife: ghost.life,
					};
				}

				return {
					...prev,
					life: newLife,
					elapsed,
					speed,
					ghostSentenceIdx: ghost.sentenceIdx,
					ghostSpeed: ghost.speed,
					ghostLife: ghost.life,
				};
			});

			rafRef.current = requestAnimationFrame(tickRef.current);
		},
		[endGame],
	);

	useEffect(() => {
		tickRef.current = tick;
	}, [tick]);

	const preparedSentencesRef = useRef<ReturnType<typeof getSentenceQueue>>([]);
	const preparedHasGhostRef = useRef(false);

	const startGame = useCallback((ghostReplayId?: string) => {
		cancelAnimationFrame(rafRef.current);
		kpsWindowRef.current.reset();
		streakRef.current = 0;
		lastKeyTimeRef.current = 0;
		lastWasWrongRef.current = false;
		eventsRef.current = [];
		keyStatsRef.current = new Map();
		bigramRef.current = new Map();
		prevKeyRef.current = "";

		const replays = loadReplays();
		let ghostReplay: ReplayData | null = null;
		if (ghostReplayId) {
			ghostReplay = replays.find((r) => r.id === ghostReplayId) ?? null;
		}
		if (!ghostReplay) {
			ghostReplay =
				replays.length > 0
					? replays.reduce((best, r) => (r.wpm > best.wpm ? r : best))
					: null;
		}

		if (ghostReplay) {
			ghostTimelineRef.current = precomputeGhostTimeline(ghostReplay);
		} else {
			ghostTimelineRef.current = [];
		}

		const sentences = getSentenceQueue(10);
		totalSentencesRef.current = sentences.length;
		preparedSentencesRef.current = sentences;
		preparedHasGhostRef.current = ghostReplay !== null;

		setState((prev) => ({
			...prev,
			phase: "ready",
			sessions: loadSessions(),
		}));
	}, []);

	const beginPlaying = useCallback(() => {
		const sentences = preparedSentencesRef.current;
		const first = sentences[0];
		const typingState = createTypingState(first?.kana ?? "");
		const startTime = Date.now();
		lastFrameTimeRef.current = performance.now();

		setState({
			phase: "playing",
			sentences,
			sentenceIdx: 0,
			typingState,
			life: LIFE_MAX,
			combo: 0,
			speed: 0,
			events: [],
			startTime,
			elapsed: 0,
			totalCorrect: 0,
			totalErrors: 0,
			sessions: loadSessions(),
			lastSession: null,
			ghostSentenceIdx: 0,
			ghostSpeed: 0,
			ghostLife: LIFE_MAX,
			hasGhost: preparedHasGhostRef.current,
			lastHealAmount: 0,
			lastHealId: 0,
			lastWrong: false,
			nextHealAt: KEYS_PER_COMBO,
			nextHealInterval: KEYS_PER_COMBO,
		});

		rafRef.current = requestAnimationFrame(tick);
	}, [tick]);

	const handleKey = useCallback((key: string) => {
		if (stateRef.current.phase !== "playing") return;

		const now = Date.now();
		const elapsed = now - stateRef.current.startTime;
		const s = stateRef.current;

		const keyData = keyStatsRef.current.get(key) ?? {
			key,
			count: 0,
			errors: 0,
			totalMs: 0,
		};
		const interval =
			lastKeyTimeRef.current > 0 ? now - lastKeyTimeRef.current : 0;

		if (prevKeyRef.current !== "") {
			const bg = prevKeyRef.current + key;
			const bgData = bigramRef.current.get(bg) ?? {
				bigram: bg,
				count: 0,
				totalMs: 0,
			};
			bigramRef.current.set(bg, {
				...bgData,
				count: bgData.count + 1,
				totalMs: bgData.totalMs + interval,
			});
		}

		const { next, result, segmentCompleted } = feedKey(s.typingState, key);

		if (result === "wrong") {
			const consecutiveMiss = lastWasWrongRef.current;
			eventsRef.current.push({
				time: elapsed,
				key,
				correct: false,
				segmentIdx: s.typingState.segIdx,
			});
			keyStatsRef.current.set(key, {
				...keyData,
				count: keyData.count + 1,
				errors: keyData.errors + 1,
			});
			prevKeyRef.current = key;
			lastKeyTimeRef.current = now;
			lastWasWrongRef.current = true;
			streakRef.current = 0;
			playMiss();
			const wUpd = wrongKeyHP(consecutiveMiss);
			setState((prev) => ({
				...prev,
				life: Math.max(0, prev.life + wUpd.lifeDelta),
				combo: wUpd.newCombo,
				totalErrors: prev.totalErrors + 1,
				lastWrong: true,
				nextHealAt: wUpd.newNextHealAt,
				nextHealInterval: wUpd.newNextHealInterval,
			}));
			return;
		}

		// Correct key
		kpsWindowRef.current.update(elapsed);
		keyStatsRef.current.set(key, {
			...keyData,
			count: keyData.count + 1,
			totalMs: keyData.totalMs + interval,
		});
		eventsRef.current.push({
			time: elapsed,
			key,
			correct: true,
			segmentIdx: s.typingState.segIdx,
		});
		prevKeyRef.current = key;
		lastKeyTimeRef.current = now;
		lastWasWrongRef.current = false;

		const hpUpd = correctKeyHP(s.combo, s.nextHealAt, s.nextHealInterval);
		streakRef.current = hpUpd.newCombo;
		const newCombo = hpUpd.newCombo;
		const healTick = hpUpd.healAmount;

		// Play milestone sound every 50 combos
		if (newCombo % 50 === 0) playComboMilestone(newCombo);

		const isSegmentEnd =
			segmentCompleted ||
			result === "segment_complete" ||
			result === "all_complete";
		if (isSegmentEnd) {
			playSegmentComplete(newCombo);
		} else {
			playKeyTap(newCombo);
		}

		if (result === "all_complete") {
			const nextSentenceIdx = s.sentenceIdx + 1;
			const needRefill = s.sentences.length - nextSentenceIdx <= REFILL_AT;
			const extraSentences = needRefill ? getSentenceQueue(10) : [];
			const newSentences = needRefill
				? [...s.sentences, ...extraSentences]
				: s.sentences;
			const nextSentence = newSentences[nextSentenceIdx];
			const nextTypingState = createTypingState(nextSentence?.kana ?? "");
			setState((prev) => ({
				...prev,
				sentenceIdx: nextSentenceIdx,
				sentences: newSentences,
				typingState: nextTypingState,
				life: Math.min(LIFE_MAX, prev.life + hpUpd.lifeDelta),
				combo: newCombo,
				totalCorrect: prev.totalCorrect + 1,
				lastHealAmount: healTick,
				lastHealId: healTick > 0 ? prev.lastHealId + 1 : prev.lastHealId,
				lastWrong: false,
				nextHealAt: hpUpd.newNextHealAt,
				nextHealInterval: hpUpd.newNextHealInterval,
			}));
		} else {
			setState((prev) => ({
				...prev,
				typingState: next,
				life: Math.min(LIFE_MAX, prev.life + hpUpd.lifeDelta),
				combo: newCombo,
				totalCorrect: prev.totalCorrect + 1,
				lastHealAmount: healTick,
				lastHealId: healTick > 0 ? prev.lastHealId + 1 : prev.lastHealId,
				lastWrong: false,
				nextHealAt: hpUpd.newNextHealAt,
				nextHealInterval: hpUpd.newNextHealInterval,
			}));
		}
	}, []);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey || e.altKey || e.metaKey) return;
			if (e.key.length !== 1) {
				if (e.key === "Escape") {
					if (stateRef.current.phase === "playing") endGame(false);
					else setState((p) => ({ ...p, phase: "idle" }));
				}
				return;
			}
			if (
				stateRef.current.phase === "idle" ||
				stateRef.current.phase === "gameover"
			) {
				if (e.key === "Enter" || e.key === " ") startGame();
				return;
			}
			handleKey(e.key.toLowerCase());
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [handleKey, startGame, endGame]);

	useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

	const setPhase = useCallback((phase: GamePhase) => {
		setState((p) => ({ ...p, phase }));
	}, []);

	const clearData = useCallback(() => {
		clearAll();
		setState((p) => ({ ...p, sessions: [], lastSession: null }));
	}, []);

	return { state, startGame, beginPlaying, setPhase, clearData };
}
