import type { GameState } from "../hooks/useGameEngine";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { SpeedMeter } from "./SpeedMeter";
import { TypingDisplay } from "./TypingDisplay";

interface Props {
  state: GameState;
  showKeyboard: boolean;
  onToggleKeyboard: () => void;
}

function lifeColor(life: number): string {
  if (life > 60) return "#00ff88";
  if (life > 30) return "#ffaa00";
  return "#ff3333";
}

function comboColor(combo: number): string {
  const colors = ["#00ffff", "#00ff88", "#ffaa00", "#ff6600", "#ff3366", "#cc00ff"];
  return colors[Math.floor(combo / 10) % colors.length] ?? "#00ffff";
}

export function GameScreen({ state, showKeyboard, onToggleKeyboard }: Props) {
  const sentence = state.sentences[state.sentenceIdx];
  const lifePct = Math.max(0, Math.min(100, state.life));
  const lc = lifeColor(lifePct);
  const cc = comboColor(state.combo);
  const acc =
    state.totalCorrect + state.totalErrors > 0
      ? Math.round((state.totalCorrect / (state.totalCorrect + state.totalErrors)) * 100)
      : 100;

  const myProgress = state.sentenceIdx;
  const ghostProgress = state.hasGhost ? state.ghostSentenceIdx : 0;
  // Scale so that both bars are visible and meaningful
  const progressMax = Math.max(myProgress, ghostProgress, 10);

  return (
    <div className="relative h-screen overflow-hidden" style={{ background: "#050508" }}>

      {/* ── LIFE bar — left side, wide ── */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-end" style={{ background: "#080808" }}>
        <div
          className="w-full transition-all duration-100"
          style={{
            height: `${lifePct}%`,
            background: lc,
            opacity: 0.45,
            boxShadow: `0 0 18px ${lc}`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[9px] font-mono uppercase tracking-widest select-none"
            style={{ writingMode: "vertical-rl", color: lc, opacity: 0.75 }}
          >
            LIFE {Math.round(lifePct)}%
          </span>
        </div>
      </div>

      {/* ── GHOST progress bar — right side, wide ── */}
      <div className="absolute right-0 top-0 bottom-0 w-16 flex flex-col justify-end" style={{ background: "#080808" }}>
        {state.hasGhost && (
          <div
            className="w-full transition-all duration-100"
            style={{
              height: `${(ghostProgress / progressMax) * 100}%`,
              background: "#cc44ff",
              opacity: 0.45,
              boxShadow: "0 0 18px #cc44ff88",
            }}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[9px] font-mono uppercase tracking-widest select-none"
            style={{ writingMode: "vertical-rl", color: "#cc44ff", opacity: state.hasGhost ? 0.75 : 0.2 }}
          >
            {state.hasGhost ? `GHOST ${ghostProgress}文` : "NO GHOST"}
          </span>
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="absolute inset-0 left-16 right-16 flex flex-col">

        {/* Progress comparison — central, prominent */}
        <div className="px-6 pt-4 pb-3 flex flex-col gap-2">
          {/* YOU */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-cyan-400 w-14 text-right uppercase tracking-wider shrink-0">
              YOU
            </span>
            <div className="flex-1 h-4 rounded overflow-hidden" style={{ background: "#111" }}>
              <div
                className="h-full rounded transition-all duration-300"
                style={{
                  width: `${(myProgress / progressMax) * 100}%`,
                  background: "linear-gradient(90deg, #00ffff, #0088ff)",
                  boxShadow: "0 0 8px #00ffff44",
                }}
              />
            </div>
            <span className="text-[11px] font-mono text-cyan-400 w-16 shrink-0">
              {myProgress} 文
            </span>
          </div>

          {/* GHOST */}
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] font-mono w-14 text-right uppercase tracking-wider shrink-0"
              style={{ color: state.hasGhost ? "#cc44ff" : "#333" }}
            >
              GHOST
            </span>
            <div className="flex-1 h-4 rounded overflow-hidden" style={{ background: "#111" }}>
              {state.hasGhost && (
                <div
                  className="h-full rounded transition-all duration-100"
                  style={{
                    width: `${(ghostProgress / progressMax) * 100}%`,
                    background: "linear-gradient(90deg, #cc44ff, #8800ff)",
                    boxShadow: "0 0 8px #cc44ff44",
                  }}
                />
              )}
            </div>
            <span
              className="text-[11px] font-mono w-16 shrink-0"
              style={{ color: state.hasGhost ? "#cc44ff" : "#333" }}
            >
              {state.hasGhost ? `${ghostProgress} 文` : "— なし"}
            </span>
          </div>
        </div>

        <div className="mx-6 h-px" style={{ background: "#111" }} />

        {/* Typing area — centered */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {sentence ? (
            <TypingDisplay sentence={sentence} typingState={state.typingState} lastWrong={false} />
          ) : (
            <div className="text-gray-500 font-mono">Loading...</div>
          )}

          {/* Speed meters */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <SpeedMeter wpm={state.speed} label="YOU" color="#00ffff" />
            </div>
            {state.hasGhost && (
              <div className="flex flex-col items-center">
                <SpeedMeter wpm={state.ghostSpeed} label="GHOST" color="#cc44ff" />
              </div>
            )}
          </div>

          {/* Stats strip */}
          <div className="flex gap-6 text-xs text-gray-600 font-mono">
            <span>
              COMBO <span style={{ color: cc }}>{state.combo}x</span>
            </span>
            <span>
              OK <span className="text-green-400">{state.totalCorrect}</span>
            </span>
            <span>
              ERR <span className="text-red-400">{state.totalErrors}</span>
            </span>
            <span>
              ACC <span className="text-yellow-400">{acc}%</span>
            </span>
            <span className="text-gray-700">{Math.round(state.elapsed / 1000)}s</span>
          </div>
        </div>

        {/* Keyboard */}
        {showKeyboard && (
          <div className="border-t border-gray-900 pb-3">
            <KeyboardDisplay keyStats={[]} highlight={state.typingState.typed.slice(-1)} />
          </div>
        )}

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-4 py-1.5 text-[10px] text-gray-700 font-mono"
          style={{ borderTop: "1px solid #111" }}
        >
          <span>ESC — 終了</span>
          <button onClick={onToggleKeyboard} className="hover:text-gray-400 transition-colors">
            KB: {showKeyboard ? "ON" : "OFF"}
          </button>
          <span style={{ color: lc }}>LIFE {Math.round(lifePct)}%</span>
        </div>
      </div>
    </div>
  );
}
