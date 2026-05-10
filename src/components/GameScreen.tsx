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
  const comboPct = state.combo > 0 ? ((state.combo % 10) / 10) * 100 || 100 : 0;
  const lc = lifeColor(lifePct);
  const cc = comboColor(state.combo);
  const acc =
    state.totalCorrect + state.totalErrors > 0
      ? Math.round((state.totalCorrect / (state.totalCorrect + state.totalErrors)) * 100)
      : 100;

  // Ghost: sentenceIdx as fraction of total ever completed sentences (use 20 as scale reference)
  const ghostPct = state.hasGhost
    ? Math.min(100, (state.ghostSentenceIdx / Math.max(state.sentenceIdx + 1, 1)) * state.sentenceIdx * 5)
    : 0;

  return (
    <div className="relative h-screen overflow-hidden" style={{ background: "#050508" }}>
      {/* ── Vertical background bars ── */}

      {/* Life bar — left edge, fills from bottom */}
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-end" style={{ background: "#080808" }}>
        <div
          className="w-full transition-all duration-100"
          style={{
            height: `${lifePct}%`,
            background: lc,
            opacity: 0.35,
            boxShadow: `0 0 12px ${lc}`,
          }}
        />
        {/* label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[9px] font-mono uppercase tracking-widest select-none"
            style={{ writingMode: "vertical-rl", color: lc, opacity: 0.5 }}
          >
            LIFE {Math.round(lifePct)}%
          </span>
        </div>
      </div>

      {/* Combo bar — second from left */}
      <div className="absolute left-10 top-0 bottom-0 w-4 flex flex-col justify-end" style={{ background: "#060606" }}>
        <div
          className="w-full transition-all duration-75"
          style={{
            height: `${comboPct}%`,
            background: cc,
            opacity: 0.25,
          }}
        />
      </div>

      {/* Sentence progress — second from right */}
      <div className="absolute right-10 top-0 bottom-0 w-4 flex flex-col justify-end" style={{ background: "#060606" }}>
        <div
          className="w-full transition-all duration-300"
          style={{
            height: `${(state.sentenceIdx / Math.max(state.sentences.length, 1)) * 100}%`,
            background: "#0088ff",
            opacity: 0.25,
          }}
        />
      </div>

      {/* Ghost bar — right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-end" style={{ background: "#080808" }}>
        {state.hasGhost && (
          <div
            className="w-full transition-all duration-100"
            style={{
              height: `${Math.min(100, (state.ghostSentenceIdx / Math.max(state.sentenceIdx + 1, 20)) * 100)}%`,
              background: "#cc44ff",
              opacity: 0.35,
              boxShadow: "0 0 12px #cc44ff88",
            }}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[9px] font-mono uppercase tracking-widest select-none"
            style={{ writingMode: "vertical-rl", color: "#cc44ff", opacity: state.hasGhost ? 0.5 : 0.15 }}
          >
            {state.hasGhost ? `GHOST` : "NO GHOST"}
          </span>
        </div>
      </div>

      {/* ── Thin top bar: sentence count ── */}
      <div className="absolute top-0 left-14 right-14 h-0.5" style={{ background: "#111" }}>
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${(state.sentenceIdx / Math.max(state.sentences.length, 1)) * 100}%`,
            background: "linear-gradient(90deg, #0066ff, #00ffff)",
            boxShadow: "0 0 6px #00ffff44",
          }}
        />
      </div>

      {/* ── Main content area ── */}
      <div className="absolute inset-0 left-14 right-14 flex flex-col">
        {/* Typing area — centered */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {sentence ? (
            <TypingDisplay sentence={sentence} typingState={state.typingState} lastWrong={false} />
          ) : (
            <div className="text-gray-500 font-mono">Loading...</div>
          )}

          {/* Speed meters row */}
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
            <span>COMBO <span style={{ color: cc }}>{state.combo}x</span></span>
            <span>SENT <span className="text-blue-400">{state.sentenceIdx}</span></span>
            <span>OK <span className="text-green-400">{state.totalCorrect}</span></span>
            <span>ERR <span className="text-red-400">{state.totalErrors}</span></span>
            <span>ACC <span className="text-yellow-400">{acc}%</span></span>
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
          <span>ESC — end</span>
          <button onClick={onToggleKeyboard} className="hover:text-gray-400 transition-colors">
            KB: {showKeyboard ? "ON" : "OFF"}
          </button>
          <span>LIFE {Math.round(lifePct)}%</span>
        </div>
      </div>
    </div>
  );
}
