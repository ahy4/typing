import { useCallback, useEffect, useRef, useState } from "react";
import { createTypingState, feedKey } from "../lib/romaji";
import type { ReplayData } from "../lib/types";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { SpeedMeter } from "./SpeedMeter";
import { TypingDisplay } from "./TypingDisplay";

interface Props {
  replay: ReplayData;
  onClose: () => void;
}

interface DisplayState {
  sentenceIdx: number;
  typingState: ReturnType<typeof createTypingState>;
  life: number;
  combo: number;
  speed: number;
}

function reconstructAt(replay: ReplayData, idx: number): DisplayState {
  let sentenceIdx = 0;
  let typingState = createTypingState(replay.sentences[0]?.kana ?? "");
  let combo = 0;
  let errors = 0;
  let life = 100;

  for (let i = 0; i < idx && i < replay.events.length; i++) {
    const ev = replay.events[i];
    if (!ev) continue;
    if (!ev.correct) {
      combo = 0;
      errors++;
      life = Math.max(0, life - 0.15);
      continue;
    }
    const { next, result, segmentCompleted } = feedKey(typingState, ev.key);
    if (segmentCompleted || result === "segment_complete" || result === "all_complete") {
      combo++;
    }
    if (result === "all_complete") {
      sentenceIdx++;
      const nextSentence = replay.sentences[sentenceIdx];
      typingState = createTypingState(nextSentence?.kana ?? "");
    } else {
      typingState = next;
    }
    life = Math.min(100, life + 0.03 - 0.0006 * 60); // approx drain minus recovery
  }

  // Rough speed from replay wpm scaled by progress
  const speed = idx > 0 ? replay.wpm * Math.min(1, idx / Math.max(replay.events.length * 0.5, 1)) : 0;

  return { sentenceIdx, typingState, life: Math.max(0, life), combo, speed };
}

export function ReplayPlayer({ replay, onClose }: Props) {
  const [seekPct, setSeekPct] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [eventIdx, setEventIdx] = useState(0);
  const rafRef = useRef<number>(0);
  const startWallRef = useRef(0);
  const startGameRef = useRef(0);

  const [displayState, setDisplayState] = useState<DisplayState>(() => reconstructAt(replay, 0));

  const stop = useCallback(() => {
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startWallRef.current + startGameRef.current;
    const pct = Math.min(1, elapsed / replay.totalTime);
    setSeekPct(pct * 100);

    const events = replay.events;
    let newIdx = 0;
    while (newIdx < events.length && (events[newIdx]?.time ?? Infinity) <= elapsed) {
      newIdx++;
    }

    setEventIdx(newIdx);
    setDisplayState(reconstructAt(replay, newIdx));

    if (elapsed >= replay.totalTime) {
      stop();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
    // biome-ignore lint/correctness/useExhaustiveDependencies: tick deps managed manually
  }, [replay, stop]);

  const play = useCallback(() => {
    const gameTime = (seekPct / 100) * replay.totalTime;
    startWallRef.current = Date.now();
    startGameRef.current = gameTime;
    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [seekPct, replay.totalTime, tick]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    stop();
    const pct = Number(e.target.value);
    setSeekPct(pct);
    const gameTime = (pct / 100) * replay.totalTime;
    const events = replay.events;
    let idx = 0;
    while (idx < events.length && (events[idx]?.time ?? Infinity) <= gameTime) idx++;
    setEventIdx(idx);
    setDisplayState(reconstructAt(replay, idx));
  }

  const sentence = replay.sentences[displayState.sentenceIdx];
  const ev = replay.events[eventIdx - 1];
  const lifePct = Math.max(0, Math.min(100, displayState.life));
  const lc = lifePct > 60 ? "#00ff88" : lifePct > 30 ? "#ffaa00" : "#ff3333";
  const comboPct = displayState.combo > 0 ? ((displayState.combo % 10) / 10) * 100 || 100 : 0;
  const sentencePct = (displayState.sentenceIdx / Math.max(replay.sentences.length, 1)) * 100;

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: "#050508" }}>
      {/* Vertical bars (same as GameScreen) */}
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-end" style={{ background: "#080808" }}>
        <div className="w-full transition-all" style={{ height: `${lifePct}%`, background: lc, opacity: 0.35, boxShadow: `0 0 12px ${lc}` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-mono uppercase select-none" style={{ writingMode: "vertical-rl", color: lc, opacity: 0.5 }}>
            LIFE {Math.round(lifePct)}%
          </span>
        </div>
      </div>
      <div className="absolute left-10 top-0 bottom-0 w-4 flex flex-col justify-end" style={{ background: "#060606" }}>
        <div className="w-full transition-all" style={{ height: `${comboPct}%`, background: "#00ffff", opacity: 0.22 }} />
      </div>
      <div className="absolute right-10 top-0 bottom-0 w-4 flex flex-col justify-end" style={{ background: "#060606" }}>
        <div className="w-full transition-all" style={{ height: `${sentencePct}%`, background: "#0088ff", opacity: 0.22 }} />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-end" style={{ background: "#080808" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-mono uppercase select-none" style={{ writingMode: "vertical-rl", color: "#cc44ff", opacity: 0.4 }}>
            REPLAY
          </span>
        </div>
      </div>

      {/* Top progress bar */}
      <div className="absolute top-0 left-14 right-14 h-0.5" style={{ background: "#111" }}>
        <div className="h-full" style={{ width: `${seekPct}%`, background: "linear-gradient(90deg,#0066ff,#00ffff)", transition: "width 0.05s" }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 left-14 right-14 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-900">
          <div className="text-xs text-gray-600 flex gap-4 font-mono">
            <span>KPS <span className="text-cyan-400">{Math.round(replay.wpm)}</span></span>
            <span>ACC <span className="text-green-400">{Math.round(replay.accuracy * 100)}%</span></span>
            <span>COMBO <span className="text-cyan-300">{displayState.combo}x</span></span>
            <span>KEY <span className="text-yellow-400">{ev?.key ?? "·"}</span></span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-xs font-mono px-3 py-1 border border-gray-800 rounded hover:border-gray-500 transition-colors"
          >
            CLOSE
          </button>
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {sentence && (
            <TypingDisplay
              sentence={sentence}
              typingState={displayState.typingState}
              lastWrong={!(ev?.correct ?? true)}
            />
          )}
          <SpeedMeter wpm={displayState.speed} label="KPS" color="#00ffff" />
          <div className="text-xs text-gray-700 font-mono">
            {displayState.sentenceIdx + 1} / {replay.sentences.length} sentences
          </div>
          {/* Keyboard showing the last pressed key */}
          <KeyboardDisplay keyStats={[]} highlight={ev?.key ? [ev.key] : []} />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 px-8 pb-6">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={seekPct}
            onChange={handleSeek}
            className="w-full accent-cyan-400"
          />
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={playing ? stop : play}
              className="px-8 py-2 font-mono text-sm border rounded transition-all"
              style={{
                borderColor: playing ? "#ff3333" : "#00ffff",
                color: playing ? "#ff3333" : "#00ffff",
                boxShadow: playing ? "0 0 8px #ff333344" : "0 0 8px #00ffff44",
              }}
            >
              {playing ? "PAUSE" : "PLAY"}
            </button>
            <span className="text-xs text-gray-700 font-mono">
              {Math.round((seekPct / 100) * replay.totalTime / 1000)}s / {Math.round(replay.totalTime / 1000)}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
