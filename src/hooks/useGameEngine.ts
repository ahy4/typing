import { useCallback, useEffect, useRef, useState } from "react";
import { KPS_WINDOW_SECONDS, SlidingWindowKPS } from "../lib/ema";
import { feedKey } from "../lib/romaji";
import type { RunnerState } from "../lib/runnerState";
import { applyDrain, applyInput, createRunnerState } from "../lib/runnerState";
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

export { LIFE_DRAIN_MISS } from "../lib/runnerState";

const REFILL_AT = 3; // add more sentences when this many remain

// Ghost timeline entry: RunnerState snapshot at a point in time.
// Built offline from replay events; looked up by binary search during play.
interface GhostTimelineEntry extends RunnerState {
	time: number;
}

function precomputeGhostTimeline(replay: ReplayData): GhostTimelineEntry[] {
	const kps = new SlidingWindowKPS(KPS_WINDOW_SECONDS * 1000);
	let runner = createRunnerState(replay.sentences);
	const timeline: GhostTimelineEntry[] = [{ ...runner, time: 0 }];
	let lastEventTime = 0;
	let lastWasWrong = false;

	for (const ev of replay.events) {
		const dt = ev.time - lastEventTime;
		runner = applyDrain(runner, dt);
		lastEventTime = ev.time;

		const { state } = applyInput(runner, ev, kps, lastWasWrong);
		runner = state;
		lastWasWrong = !ev.correct;
		timeline.push({ ...runner, time: ev.time });
	}
	return timeline;
}

function getGhostAt(
	timeline: GhostTimelineEntry[],
	elapsed: number,
): GhostTimelineEntry | null {
	if (timeline.length === 0) return null;
	let lo = 0;
	let hi = timeline.length - 1;
	while (lo < hi) {
		const mid = (lo + hi + 1) >> 1;
		if ((timeline[mid]?.time ?? 0) <= elapsed) lo = mid;
		else hi = mid - 1;
	}
	return timeline[lo] ?? null;
}

export interface GameState {
	phase: GamePhase;
	// Player's running state — same shape as ghost so components render uniformly
	player: RunnerState;
	// Ghost's running state; null when no ghost is active
	ghost: RunnerState | null;
	// Player-only fields (not part of RunnerState because ghost doesn't need them)
	sentences: Sentence[]; // convenience alias for player.sentences
	sentenceIdx: number; // convenience alias for player.sentenceIdx
	events: InputEvent[];
	startTime: number;
	elapsed: number;
	totalCorrect: number;
	totalErrors: number;
	sessions: SessionRecord[];
	lastSession: SessionRecord | null;
	lastHealAmount: number;
	lastHealId: number;
	lastWrong: boolean;
	healStreak: number;
}

export function useGameEngine() {
	const kpsWindowRef = useRef(new SlidingWindowKPS(KPS_WINDOW_SECONDS * 1000));
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
	const tickRef = useRef<(now: number) => void>(() => {});

	const initialPlayer = createRunnerState([]);
	const [state, setState] = useState<GameState>(() => ({
		phase: "idle",
		player: initialPlayer,
		ghost: null,
		sentences: [],
		sentenceIdx: 0,
		events: [],
		startTime: 0,
		elapsed: 0,
		totalCorrect: 0,
		totalErrors: 0,
		sessions: loadSessions(),
		lastSession: null,
		lastHealAmount: 0,
		lastHealId: 0,
		lastWrong: false,
		healStreak: 0,
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

				const newPlayer = applyDrain(prev.player, dt);
				const elapsed = Date.now() - prev.startTime;
				const ghost = getGhostAt(ghostTimelineRef.current, elapsed);

				const speed = kpsWindowRef.current.get(elapsed);

				if (newPlayer.life <= 0) {
					setTimeout(endGame, 0);
					return {
						...prev,
						player: { ...newPlayer, speed },
						ghost,
						elapsed,
					};
				}

				return {
					...prev,
					player: { ...newPlayer, speed },
					ghost,
					elapsed,
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

		ghostTimelineRef.current = ghostReplay
			? precomputeGhostTimeline(ghostReplay)
			: [];
		preparedHasGhostRef.current = ghostReplay !== null;

		// 履歴から対戦（ghostReplayId 指定）の場合はゴーストと同じお題で勝負
		const sentences =
			ghostReplayId && ghostReplay
				? [...ghostReplay.sentences]
				: getSentenceQueue(10);
		preparedSentencesRef.current = sentences;

		// Pre-initialize player so the GameScreen behind the countdown overlay
		// shows the correct sentence and full HP (not the previous game's state).
		const player = createRunnerState(sentences);
		const initialGhost = preparedHasGhostRef.current
			? (ghostTimelineRef.current[0] ?? null)
			: null;

		setState((prev) => ({
			...prev,
			phase: "ready",
			player,
			ghost: initialGhost,
			sentences,
			sentenceIdx: 0,
			totalCorrect: 0,
			totalErrors: 0,
			elapsed: 0,
			lastWrong: false,
			lastHealAmount: 0,
			lastHealId: 0,
			healStreak: 0,
			sessions: loadSessions(),
		}));
	}, []);

	const beginPlaying = useCallback(() => {
		const sentences = preparedSentencesRef.current;
		const player = createRunnerState(sentences);
		const startTime = Date.now();
		lastFrameTimeRef.current = performance.now();

		setState({
			phase: "playing",
			player,
			ghost: preparedHasGhostRef.current
				? (ghostTimelineRef.current[0] ?? null)
				: null,
			sentences,
			sentenceIdx: 0,
			events: [],
			startTime,
			elapsed: 0,
			totalCorrect: 0,
			totalErrors: 0,
			sessions: loadSessions(),
			lastSession: null,
			lastHealAmount: 0,
			lastHealId: 0,
			lastWrong: false,
			healStreak: 0,
		});

		rafRef.current = requestAnimationFrame(tick);
	}, [tick]);

	const handleKey = useCallback((key: string) => {
		if (stateRef.current.phase !== "playing") return;

		const now = Date.now();
		const s = stateRef.current;
		const elapsed = now - s.startTime;

		// Per-key analytics (player-specific; not part of RunnerState)
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

		// Validate via feedKey first to get segmentCompleted for sounds,
		// then delegate full state transition to applyInput.
		const { result } = feedKey(s.player.typingState, key);

		if (result === "wrong") {
			eventsRef.current.push({
				time: elapsed,
				key,
				correct: false,
				segmentIdx: s.player.typingState.segIdx,
			});
			keyStatsRef.current.set(key, {
				...keyData,
				count: keyData.count + 1,
				errors: keyData.errors + 1,
			});
			prevKeyRef.current = key;
			lastKeyTimeRef.current = now;
			const wasWrong = lastWasWrongRef.current;
			lastWasWrongRef.current = true;
			streakRef.current = 0;
			playMiss();

			const inputEvent: InputEvent = {
				time: elapsed,
				key,
				correct: false,
				segmentIdx: s.player.typingState.segIdx,
			};
			const { state: newPlayer } = applyInput(
				s.player,
				inputEvent,
				null,
				wasWrong,
			);
			setState((prev) => ({
				...prev,
				player: newPlayer,
				totalErrors: prev.totalErrors + 1,
				lastWrong: true,
				healStreak: 0,
			}));
			return;
		}

		// Correct key
		keyStatsRef.current.set(key, {
			...keyData,
			count: keyData.count + 1,
			totalMs: keyData.totalMs + interval,
		});
		const inputEvent: InputEvent = {
			time: elapsed,
			key,
			correct: true,
			segmentIdx: s.player.typingState.segIdx,
		};
		eventsRef.current.push(inputEvent);
		prevKeyRef.current = key;
		lastKeyTimeRef.current = now;
		lastWasWrongRef.current = false;

		const {
			state: newPlayer,
			healAmount,
			sentenceAdvanced,
			segmentCompleted,
		} = applyInput(s.player, inputEvent, kpsWindowRef.current, false);

		streakRef.current = newPlayer.combo;

		if (newPlayer.combo % 50 === 0) playComboMilestone(newPlayer.combo);
		if (segmentCompleted) {
			playSegmentComplete(newPlayer.combo);
		} else {
			playKeyTap(newPlayer.combo);
		}

		// Sentence refill: player-specific concern (ghost uses fixed replay sentences)
		let finalPlayer = newPlayer;
		if (sentenceAdvanced) {
			const needRefill =
				s.sentences.length - newPlayer.sentenceIdx <= REFILL_AT;
			if (needRefill) {
				const extra = getSentenceQueue(10);
				finalPlayer = {
					...newPlayer,
					sentences: [...s.sentences, ...extra],
				};
			}
		}

		setState((prev) => ({
			...prev,
			player: finalPlayer,
			sentences: finalPlayer.sentences,
			sentenceIdx: finalPlayer.sentenceIdx,
			totalCorrect: prev.totalCorrect + 1,
			lastHealAmount: healAmount,
			lastHealId: healAmount > 0 ? prev.lastHealId + 1 : prev.lastHealId,
			lastWrong: false,
			healStreak: healAmount > 0 ? prev.healStreak + 1 : prev.healStreak,
		}));
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
