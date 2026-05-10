import { useCallback, useEffect, useRef, useState } from "react";
import { EMA, intervalToWpm } from "../lib/ema";
import { createTypingState, feedKey } from "../lib/romaji";
import { getSentenceQueue } from "../lib/sentences";
import { playComboMilestone, playKeyTap, playMiss, playSegmentComplete } from "../lib/sound";
import { clearAll, loadReplays, loadSessions, saveReplay, saveSessions } from "../lib/storage";
import type { BigramStats, GamePhase, InputEvent, KeyStats, ReplayData, Sentence, SessionRecord } from "../lib/types";

const LIFE_MAX = 100;
const LIFE_DRAIN_BASE = 0.04;
const LIFE_DRAIN_COMBO_FACTOR = 0.6;
const LIFE_RECOVER_CORRECT = 0.03; // per correct key — reduced
export const LIFE_DRAIN_MISS = 5;
const COMBO_MILESTONE = 10;

function comboHealAmount(combo: number): number {
  return Math.max(2, Math.min(20, Math.floor(combo / 5) + 2));
}
const REFILL_AT = 3; // add more sentences when this many remain

interface GhostTimelineEntry {
  time: number;
  sentenceIdx: number;
  segIdx: number;
  speed: number;
  life: number;
}

function precomputeGhostTimeline(replay: ReplayData): GhostTimelineEntry[] {
  const timeline: GhostTimelineEntry[] = [{ time: 0, sentenceIdx: 0, segIdx: 0, speed: 0, life: LIFE_MAX }];
  let sentenceIdx = 0;
  let typingState = createTypingState(replay.sentences[0]?.kana ?? "");
  const ema = new EMA(0.25, 0);
  let lastCorrectTime = 0;
  let lastEventTime = 0;
  let life = LIFE_MAX;
  let combo = 0;

  for (const ev of replay.events) {
    const dt = ev.time - lastEventTime;
    const comboFactor = combo > 0 ? LIFE_DRAIN_COMBO_FACTOR : 1;
    const drain = (LIFE_DRAIN_BASE * comboFactor * dt) / (1000 / 60);
    life = Math.max(0, life - drain);
    lastEventTime = ev.time;

    if (!ev.correct) {
      life = Math.max(0, life - LIFE_DRAIN_MISS);
      combo = 0;
      timeline.push({ time: ev.time, sentenceIdx, segIdx: typingState.segIdx, speed: ema.get(), life });
      continue;
    }

    const interval = lastCorrectTime > 0 ? ev.time - lastCorrectTime : 0;
    const speed = interval > 0 ? ema.update(intervalToWpm(interval)) : ema.get();
    lastCorrectTime = ev.time;
    life = Math.min(LIFE_MAX, life + LIFE_RECOVER_CORRECT);

    const { next, result } = feedKey(typingState, ev.key);
    if (result === "segment_complete" || result === "all_complete") combo++;
    if (result === "all_complete") {
      sentenceIdx++;
      const nextSentence = replay.sentences[sentenceIdx];
      typingState = createTypingState(nextSentence?.kana ?? "");
    } else {
      typingState = next;
    }
    timeline.push({ time: ev.time, sentenceIdx, segIdx: typingState.segIdx, speed, life });
  }
  return timeline;
}

function getGhostAt(timeline: GhostTimelineEntry[], elapsed: number): GhostTimelineEntry {
  if (timeline.length === 0) return { time: 0, sentenceIdx: 0, segIdx: 0, speed: 0, life: LIFE_MAX };
  let lo = 0;
  let hi = timeline.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if ((timeline[mid]?.time ?? 0) <= elapsed) lo = mid;
    else hi = mid - 1;
  }
  return timeline[lo] ?? { time: 0, sentenceIdx: 0, segIdx: 0, speed: 0, life: LIFE_MAX };
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
}

export function useGameEngine() {
  const emaRef = useRef(new EMA(0.25, 0));
  const lastKeyTimeRef = useRef<number>(0);
  const lastCorrectKeyTimeRef = useRef<number>(0);
  const lastWasWrongRef = useRef<boolean>(false);
  const rafRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const eventsRef = useRef<InputEvent[]>([]);
  const keyStatsRef = useRef<Map<string, KeyStats>>(new Map());
  const bigramRef = useRef<Map<string, BigramStats>>(new Map());
  const prevKeyRef = useRef<string>("");
  const ghostTimelineRef = useRef<GhostTimelineEntry[]>([]);
  const totalSentencesRef = useRef<number>(0);

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
  }));

  const stateRef = useRef(state);
  stateRef.current = state;

  const endGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
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

    setState((prev) => ({ ...prev, phase: "gameover", sessions: existing.slice(-100), lastSession: session }));
  }, []);

  const tick = useCallback(
    (now: number) => {
      const dt = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      setState((prev) => {
        if (prev.phase !== "playing") return prev;

        const comboFactor = prev.combo > 0 ? LIFE_DRAIN_COMBO_FACTOR : 1;
        const drain = (LIFE_DRAIN_BASE * comboFactor * dt) / (1000 / 60);
        const newLife = Math.max(0, prev.life - drain);
        const elapsed = Date.now() - prev.startTime;

        // Ghost position
        const ghost = getGhostAt(ghostTimelineRef.current, elapsed);

        if (newLife <= 0) {
          setTimeout(endGame, 0);
          return { ...prev, life: 0, elapsed, ghostSentenceIdx: ghost.sentenceIdx, ghostSpeed: ghost.speed, ghostLife: ghost.life };
        }

        return { ...prev, life: newLife, elapsed, ghostSentenceIdx: ghost.sentenceIdx, ghostSpeed: ghost.speed, ghostLife: ghost.life };
      });

      rafRef.current = requestAnimationFrame(tick);
    },
    [endGame]
  );

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    emaRef.current.reset(0);
    lastKeyTimeRef.current = 0;
    lastCorrectKeyTimeRef.current = 0;
    lastWasWrongRef.current = false;
    eventsRef.current = [];
    keyStatsRef.current = new Map();
    bigramRef.current = new Map();
    prevKeyRef.current = "";

    // Load ghost from best replay
    const replays = loadReplays();
    const bestReplay = replays.length > 0
      ? replays.reduce((best, r) => r.wpm > best.wpm ? r : best)
      : null;

    if (bestReplay) {
      ghostTimelineRef.current = precomputeGhostTimeline(bestReplay);
    } else {
      ghostTimelineRef.current = [];
    }

    const sentences = getSentenceQueue(10);
    totalSentencesRef.current = sentences.length;
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
      hasGhost: bestReplay !== null,
      lastHealAmount: 0,
      lastHealId: 0,
      lastWrong: false,
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const handleKey = useCallback(
    (key: string) => {
      if (stateRef.current.phase !== "playing") return;

      const now = Date.now();
      const elapsed = now - stateRef.current.startTime;
      const s = stateRef.current;

      const keyData = keyStatsRef.current.get(key) ?? { key, count: 0, errors: 0, totalMs: 0 };
      const interval = lastKeyTimeRef.current > 0 ? now - lastKeyTimeRef.current : 0;
      const correctInterval = lastCorrectKeyTimeRef.current > 0 ? now - lastCorrectKeyTimeRef.current : 0;

      if (prevKeyRef.current !== "") {
        const bg = prevKeyRef.current + key;
        const bgData = bigramRef.current.get(bg) ?? { bigram: bg, count: 0, totalMs: 0 };
        bigramRef.current.set(bg, { ...bgData, count: bgData.count + 1, totalMs: bgData.totalMs + interval });
      }

      const { next, result, segmentCompleted } = feedKey(s.typingState, key);

      if (result === "wrong") {
        const consecutiveMiss = lastWasWrongRef.current;
        eventsRef.current.push({ time: elapsed, key, correct: false, segmentIdx: s.typingState.segIdx });
        keyStatsRef.current.set(key, { ...keyData, count: keyData.count + 1, errors: keyData.errors + 1 });
        prevKeyRef.current = key;
        lastKeyTimeRef.current = now;
        lastWasWrongRef.current = true;
        playMiss();
        if (!consecutiveMiss) {
          setState((prev) => ({
            ...prev,
            life: Math.max(0, prev.life - LIFE_DRAIN_MISS),
            combo: 0,
            totalErrors: prev.totalErrors + 1,
            lastWrong: true,
          }));
        } else {
          // consecutive miss: only count the error, no life penalty
          setState((prev) => ({ ...prev, totalErrors: prev.totalErrors + 1, lastWrong: true }));
        }
        return;
      }

      // Correct key
      const wpm = correctInterval > 0 ? emaRef.current.update(intervalToWpm(correctInterval)) : emaRef.current.get();
      keyStatsRef.current.set(key, { ...keyData, count: keyData.count + 1, totalMs: keyData.totalMs + interval });
      eventsRef.current.push({ time: elapsed, key, correct: true, segmentIdx: s.typingState.segIdx });
      prevKeyRef.current = key;
      lastKeyTimeRef.current = now;
      lastCorrectKeyTimeRef.current = now;
      lastWasWrongRef.current = false;

      const newCombo = s.combo + 1;
      if (newCombo % COMBO_MILESTONE === 0) playComboMilestone(newCombo);

      const isSegmentEnd = segmentCompleted || result === "segment_complete" || result === "all_complete";

      // Sound: segment complete if implicit or explicit completion happened
      if (isSegmentEnd) {
        playSegmentComplete(s.combo);
      } else {
        playKeyTap(s.combo);
      }

      const segHeal = isSegmentEnd ? comboHealAmount(newCombo) : 0;

      if (result === "all_complete") {
        const nextSentenceIdx = s.sentenceIdx + 1;
        // Refill sentence queue when running low — never end by sentence limit
        const needRefill = s.sentences.length - nextSentenceIdx <= REFILL_AT;
        const extraSentences = needRefill ? getSentenceQueue(10) : [];
        const newSentences = needRefill ? [...s.sentences, ...extraSentences] : s.sentences;
        const nextSentence = newSentences[nextSentenceIdx];
        const nextTypingState = createTypingState(nextSentence?.kana ?? "");
        setState((prev) => ({
          ...prev,
          sentenceIdx: nextSentenceIdx,
          sentences: newSentences,
          typingState: nextTypingState,
          speed: wpm,
          life: Math.min(LIFE_MAX, prev.life + LIFE_RECOVER_CORRECT + segHeal),
          combo: newCombo,
          totalCorrect: prev.totalCorrect + 1,
          lastHealAmount: segHeal,
          lastHealId: segHeal > 0 ? prev.lastHealId + 1 : prev.lastHealId,
          lastWrong: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          typingState: next,
          speed: wpm,
          life: Math.min(LIFE_MAX, prev.life + LIFE_RECOVER_CORRECT + segHeal),
          combo: newCombo,
          totalCorrect: prev.totalCorrect + 1,
          lastHealAmount: segHeal,
          lastHealId: segHeal > 0 ? prev.lastHealId + 1 : prev.lastHealId,
          lastWrong: false,
        }));
      }
    },
    [endGame]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key.length !== 1) {
        if (e.key === "Escape") {
          if (stateRef.current.phase === "playing") endGame();
          else setState((p) => ({ ...p, phase: "idle" }));
        }
        return;
      }
      if (stateRef.current.phase === "idle" || stateRef.current.phase === "gameover") {
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

  return { state, startGame, setPhase, clearData };
}
