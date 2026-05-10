import { useCallback, useEffect, useRef, useState } from "react";
import { EMA, intervalToWpm } from "../lib/ema";
import { createTypingState, feedKey } from "../lib/romaji";
import { getSentenceQueue } from "../lib/sentences";
import { playComboMilestone, playGameOver, playKeyTap, playMiss, playSegmentComplete } from "../lib/sound";
import { clearAll, loadSessions, saveSessions, saveReplay } from "../lib/storage";
import type { BigramStats, GamePhase, InputEvent, KeyStats, Sentence, SessionRecord } from "../lib/types";

const LIFE_MAX = 100;
const LIFE_DRAIN_BASE = 0.04; // per frame at 60fps
const LIFE_DRAIN_COMBO_FACTOR = 0.6; // drain multiplier when combo > 0
const LIFE_RECOVER_CORRECT = 0.4;
const LIFE_DRAIN_MISS = 0.15;
const COMBO_MILESTONE = 10;

export interface GameState {
  phase: GamePhase;
  sentences: Sentence[];
  sentenceIdx: number;
  typingState: ReturnType<typeof createTypingState>;
  life: number;
  combo: number;
  speed: number; // ema wpm
  events: InputEvent[];
  startTime: number;
  elapsed: number;
  totalCorrect: number;
  totalErrors: number;
  sessions: SessionRecord[];
  lastSession: SessionRecord | null;
}

export function useGameEngine() {
  const emaRef = useRef(new EMA(0.25, 0));
  const lastKeyTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const eventsRef = useRef<InputEvent[]>([]);
  const keyStatsRef = useRef<Map<string, KeyStats>>(new Map());
  const bigramRef = useRef<Map<string, BigramStats>>(new Map());
  const prevKeyRef = useRef<string>("");

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
  }));

  const stateRef = useRef(state);
  stateRef.current = state;

  const endGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const s = stateRef.current;
    const duration = Date.now() - s.startTime;
    const totalKeys = s.totalCorrect + s.totalErrors;
    const accuracy = totalKeys > 0 ? s.totalCorrect / totalKeys : 0;
    const wpm = emaRef.current.get();

    const keyStats = Array.from(keyStatsRef.current.values());
    const bigramStats = Array.from(bigramRef.current.values());

    const replay = {
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

    playGameOver();
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

        if (newLife <= 0) {
          // schedule endGame outside state update
          setTimeout(endGame, 0);
          return { ...prev, life: 0, elapsed, phase: "playing" };
        }

        return { ...prev, life: newLife, elapsed };
      });

      rafRef.current = requestAnimationFrame(tick);
    },
    [endGame]
  );

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    emaRef.current.reset(0);
    lastKeyTimeRef.current = 0;
    eventsRef.current = [];
    keyStatsRef.current = new Map();
    bigramRef.current = new Map();
    prevKeyRef.current = "";

    const sentences = getSentenceQueue(10);
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
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const handleKey = useCallback(
    (key: string) => {
      if (stateRef.current.phase !== "playing") return;

      const now = Date.now();
      const elapsed = now - stateRef.current.startTime;
      const s = stateRef.current;

      // Update key stats
      const keyData = keyStatsRef.current.get(key) ?? { key, count: 0, errors: 0, totalMs: 0 };
      const interval = lastKeyTimeRef.current > 0 ? now - lastKeyTimeRef.current : 0;

      // Update bigram
      if (prevKeyRef.current !== "") {
        const bg = prevKeyRef.current + key;
        const bgData = bigramRef.current.get(bg) ?? { bigram: bg, count: 0, totalMs: 0 };
        bigramRef.current.set(bg, {
          ...bgData,
          count: bgData.count + 1,
          totalMs: bgData.totalMs + interval,
        });
      }

      const { next, result } = feedKey(s.typingState, key);

      if (result === "wrong") {
        eventsRef.current.push({ time: elapsed, key, correct: false, segmentIdx: s.typingState.segIdx });
        keyStatsRef.current.set(key, { ...keyData, count: keyData.count + 1, errors: keyData.errors + 1 });
        prevKeyRef.current = key;
        lastKeyTimeRef.current = now;
        playMiss();
        setState((prev) => ({
          ...prev,
          life: Math.max(0, prev.life - LIFE_DRAIN_MISS),
          combo: 0,
          totalErrors: prev.totalErrors + 1,
        }));
        return;
      }

      // correct input
      const wpm = interval > 0 ? emaRef.current.update(intervalToWpm(interval)) : emaRef.current.get();
      keyStatsRef.current.set(key, { ...keyData, count: keyData.count + 1, totalMs: keyData.totalMs + interval });
      eventsRef.current.push({ time: elapsed, key, correct: true, segmentIdx: s.typingState.segIdx });
      prevKeyRef.current = key;
      lastKeyTimeRef.current = now;

      if (result === "segment_complete" || result === "all_complete") {
        playSegmentComplete(s.combo);
      } else {
        playKeyTap(s.combo);
      }

      if (result === "all_complete") {
        const nextSentenceIdx = s.sentenceIdx + 1;
        if (nextSentenceIdx >= s.sentences.length) {
          // all done
          setTimeout(endGame, 100);
          setState((prev) => ({
            ...prev,
            typingState: next,
            speed: wpm,
            totalCorrect: prev.totalCorrect + 1,
            combo: prev.combo + 1,
          }));
          return;
        }
        const nextSentence = s.sentences[nextSentenceIdx];
        const nextTypingState = createTypingState(nextSentence?.kana ?? "");
        const newCombo = s.combo + 1;
        if (newCombo % COMBO_MILESTONE === 0) playComboMilestone(newCombo);
        setState((prev) => ({
          ...prev,
          sentenceIdx: nextSentenceIdx,
          typingState: nextTypingState,
          speed: wpm,
          life: Math.min(LIFE_MAX, prev.life + LIFE_RECOVER_CORRECT * 5),
          combo: newCombo,
          totalCorrect: prev.totalCorrect + 1,
        }));
      } else {
        const newCombo = s.combo + 1;
        if (newCombo % COMBO_MILESTONE === 0) playComboMilestone(newCombo);
        setState((prev) => ({
          ...prev,
          typingState: next,
          speed: wpm,
          life: Math.min(LIFE_MAX, prev.life + LIFE_RECOVER_CORRECT),
          combo: newCombo,
          totalCorrect: prev.totalCorrect + 1,
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
