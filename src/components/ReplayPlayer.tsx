import { useCallback, useEffect, useRef, useState } from "react";
import { createTypingState, feedKey } from "../lib/romaji";
import type { ReplayData } from "../lib/types";
import { TypingDisplay } from "./TypingDisplay";

interface Props {
  replay: ReplayData;
  onClose: () => void;
}

export function ReplayPlayer({ replay, onClose }: Props) {
  const [seekPct, setSeekPct] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [eventIdx, setEventIdx] = useState(0);
  const rafRef = useRef<number>(0);
  const startWallRef = useRef(0);
  const startGameRef = useRef(0);

  // Reconstruct state at a given event index
  function reconstructAt(idx: number) {
    let sentenceIdx = 0;
    let typingState = createTypingState(replay.sentences[0]?.kana ?? "");
    for (let i = 0; i < idx && i < replay.events.length; i++) {
      const ev = replay.events[i];
      if (!ev?.correct) continue;
      const { next, result } = feedKey(typingState, ev.key);
      if (result === "all_complete") {
        sentenceIdx++;
        const next2 = replay.sentences[sentenceIdx];
        typingState = createTypingState(next2?.kana ?? "");
      } else {
        typingState = next;
      }
    }
    return { sentenceIdx, typingState };
  }

  const [displayState, setDisplayState] = useState(() => reconstructAt(0));

  const stop = useCallback(() => {
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startWallRef.current + startGameRef.current;
    const pct = Math.min(1, elapsed / replay.totalTime);
    setSeekPct(pct * 100);

    // find current event
    const events = replay.events;
    let newIdx = 0;
    while (newIdx < events.length && (events[newIdx]?.time ?? Infinity) <= elapsed) {
      newIdx++;
    }

    setEventIdx(newIdx);
    setDisplayState(reconstructAt(newIdx));

    if (elapsed >= replay.totalTime) {
      stop();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setDisplayState(reconstructAt(idx));
  }

  const sentence = replay.sentences[displayState.sentenceIdx];
  const ev = replay.events[eventIdx - 1];
  const accuracy = replay.accuracy;

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-950 rounded-xl border border-gray-800 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-cyan-400 font-mono text-lg uppercase tracking-widest">Replay</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white text-sm font-mono px-3 py-1 border border-gray-700 rounded hover:border-gray-400 transition-colors"
        >
          CLOSE
        </button>
      </div>

      <div className="text-xs text-gray-600 flex gap-4">
        <span>WPM: <span className="text-cyan-400">{Math.round(replay.wpm)}</span></span>
        <span>ACC: <span className="text-green-400">{Math.round(accuracy * 100)}%</span></span>
        <span>Events: <span className="text-gray-400">{eventIdx}/{replay.events.length}</span></span>
        <span>Key: <span className="text-yellow-400">{ev?.key ?? "-"}</span></span>
      </div>

      {sentence && (
        <TypingDisplay
          sentence={sentence}
          typingState={displayState.typingState}
          lastWrong={!(ev?.correct ?? true)}
        />
      )}

      {/* Controls */}
      <div className="flex flex-col gap-3">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={seekPct}
          onChange={handleSeek}
          className="w-full accent-cyan-400"
        />
        <div className="flex gap-3 justify-center">
          <button
            onClick={playing ? stop : play}
            className="px-6 py-2 font-mono text-sm border rounded transition-all"
            style={{
              borderColor: playing ? "#ff3333" : "#00ffff",
              color: playing ? "#ff3333" : "#00ffff",
              boxShadow: playing ? "0 0 8px #ff333344" : "0 0 8px #00ffff44",
            }}
          >
            {playing ? "PAUSE" : "PLAY"}
          </button>
        </div>
      </div>
    </div>
  );
}
