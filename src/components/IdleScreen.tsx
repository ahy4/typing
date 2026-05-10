interface Props {
  onStart: () => void;
  onStats: () => void;
  bestWpm: number;
  sessionCount: number;
}

export function IdleScreen({ onStart, onStats, bestWpm, sessionCount }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] gap-8 select-none">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-5xl font-black tracking-[0.3em] font-mono"
          style={{ color: "#00ffff", textShadow: "0 0 30px #00ffff88, 0 0 60px #00ffff44" }}>
          TYPE//DARK
        </div>
        <div className="text-gray-600 text-sm tracking-widest uppercase font-mono">
          Romaji Typing · Analytics · Ghost
        </div>
      </div>

      {/* Stats preview */}
      {sessionCount > 0 && (
        <div className="flex gap-8 text-center">
          <div>
            <div className="text-3xl font-mono font-bold text-cyan-400">{Math.round(bestWpm)}</div>
            <div className="text-xs text-gray-600 uppercase tracking-widest">Best KPM</div>
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-gray-300">{sessionCount}</div>
            <div className="text-xs text-gray-600 uppercase tracking-widest">Sessions</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={onStart}
          className="px-12 py-4 font-mono text-xl font-bold rounded border-2 transition-all duration-200 uppercase tracking-widest"
          style={{
            borderColor: "#00ffff",
            color: "#00ffff",
            background: "transparent",
            boxShadow: "0 0 20px #00ffff44",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#00ffff18";
            e.currentTarget.style.boxShadow = "0 0 30px #00ffff88";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.boxShadow = "0 0 20px #00ffff44";
          }}
        >
          START GAME
        </button>
        <button
          onClick={onStats}
          className="px-8 py-2 font-mono text-sm text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-600 rounded transition-all"
        >
          STATISTICS
        </button>
      </div>

      <div className="text-gray-700 text-xs font-mono">ENTER or SPACE to start</div>
    </div>
  );
}
