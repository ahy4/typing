import { useState } from "react";
import { GameOverScreen } from "./components/GameOverScreen";
import { GameScreen } from "./components/GameScreen";
import { IdleScreen } from "./components/IdleScreen";
import { StatsScreen } from "./components/StatsScreen";
import { useGameEngine } from "./hooks/useGameEngine";

export default function App() {
  const { state, startGame, setPhase, clearData } = useGameEngine();
  const [showKeyboard, setShowKeyboard] = useState(true);

  const bestWpm = state.sessions.length > 0 ? Math.max(...state.sessions.map((s) => s.wpm)) : 0;

  if (state.phase === "idle") {
    return (
      <IdleScreen
        onStart={startGame}
        onStats={() => setPhase("stats")}
        bestWpm={bestWpm}
        sessionCount={state.sessions.length}
      />
    );
  }

  if (state.phase === "playing") {
    return (
      <GameScreen
        state={state}
        showKeyboard={showKeyboard}
        onToggleKeyboard={() => setShowKeyboard((v) => !v)}
      />
    );
  }

  if (state.phase === "gameover" && state.lastSession) {
    return (
      <GameOverScreen
        session={state.lastSession}
        onRestart={startGame}
        onStats={() => setPhase("stats")}
      />
    );
  }

  if (state.phase === "stats") {
    return (
      <StatsScreen
        sessions={state.sessions}
        onBack={() => setPhase("idle")}
        onClear={clearData}
      />
    );
  }

  return null;
}
