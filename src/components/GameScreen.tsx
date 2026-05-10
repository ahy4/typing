import type { GameState } from "../hooks/useGameEngine";
import { ComboGauge } from "./ComboGauge";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { LifeBar } from "./LifeBar";
import { SentenceBar } from "./SentenceBar";
import { SpeedMeter } from "./SpeedMeter";
import { TypingDisplay } from "./TypingDisplay";

interface Props {
  state: GameState;
  showKeyboard: boolean;
  onToggleKeyboard: () => void;
}

export function GameScreen({ state, showKeyboard, onToggleKeyboard }: Props) {
  const sentence = state.sentences[state.sentenceIdx];
  const lastTyped = state.typingState.typed;

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Top HUD */}
      <div className="flex items-start gap-4 px-6 pt-4 pb-2 border-b border-gray-900">
        <div className="flex-1">
          <LifeBar life={state.life} />
        </div>
        <div className="flex-1">
          <ComboGauge combo={state.combo} />
        </div>
        <div className="flex-1">
          <SentenceBar current={state.sentenceIdx} total={state.sentences.length} />
        </div>
        <div className="flex-none">
          <SpeedMeter wpm={state.speed} />
        </div>
      </div>

      {/* Main typing area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
        {sentence ? (
          <TypingDisplay
            sentence={sentence}
            typingState={state.typingState}
            lastWrong={false}
          />
        ) : (
          <div className="text-gray-500 font-mono">Loading...</div>
        )}

        {/* Stats strip */}
        <div className="flex gap-8 text-xs text-gray-600 font-mono">
          <span>
            COMBO <span className="text-cyan-400">{state.combo}x</span>
          </span>
          <span>
            CORRECT <span className="text-green-400">{state.totalCorrect}</span>
          </span>
          <span>
            ERRORS <span className="text-red-400">{state.totalErrors}</span>
          </span>
          <span>
            ACC{" "}
            <span className="text-yellow-400">
              {state.totalCorrect + state.totalErrors > 0
                ? Math.round((state.totalCorrect / (state.totalCorrect + state.totalErrors)) * 100)
                : 100}
              %
            </span>
          </span>
        </div>
      </div>

      {/* Keyboard */}
      {showKeyboard && (
        <div className="border-t border-gray-900 pb-4">
          <KeyboardDisplay keyStats={[]} highlight={lastTyped.slice(-1)} />
        </div>
      )}

      {/* Bottom controls */}
      <div className="flex items-center justify-between px-6 py-2 border-t border-gray-900 text-xs text-gray-700 font-mono">
        <span>ESC — end game</span>
        <button
          onClick={onToggleKeyboard}
          className="hover:text-gray-400 transition-colors"
        >
          KEYBOARD: {showKeyboard ? "ON" : "OFF"}
        </button>
        <span>
          {Math.round(state.elapsed / 1000)}s
        </span>
      </div>
    </div>
  );
}
