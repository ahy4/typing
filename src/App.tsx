import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { GameOverScreen } from "./components/GameOverScreen";
import { GameScreen } from "./components/GameScreen";
import { HelpScreen } from "./components/HelpScreen";
import { IdleScreen } from "./components/IdleScreen";
import { ReadyScreen } from "./components/ReadyScreen";
import { StatsScreen } from "./components/StatsScreen";
import { useGameEngine } from "./hooks/useGameEngine";
import { deleteReplay } from "./lib/storage";
import type { GamePhase } from "./lib/types";

const PHASE_TO_PATH: Record<GamePhase, string> = {
	idle: "/",
	help: "/help",
	ready: "/ready",
	playing: "/play",
	gameover: "/gameover",
	stats: "/stats",
	replay: "/replay",
};

export default function App() {
	const { state, startGame, beginPlaying, setPhase, clearData } =
		useGameEngine();
	const [showKeyboard, setShowKeyboard] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		navigate(PHASE_TO_PATH[state.phase]);
	}, [state.phase, navigate]);

	const bestWpm =
		state.sessions.length > 0
			? Math.max(...state.sessions.map((s) => s.wpm))
			: 0;

	return (
		<Routes>
			<Route
				path="/"
				element={
					<IdleScreen
						onStart={startGame}
						onStats={() => setPhase("stats")}
						onHelp={() => setPhase("help")}
						bestWpm={bestWpm}
						sessionCount={state.sessions.length}
					/>
				}
			/>
			<Route
				path="/help"
				element={<HelpScreen onBack={() => setPhase("idle")} />}
			/>
			<Route
				path="/stats"
				element={
					<StatsScreen
						sessions={state.sessions}
						onBack={() => setPhase("idle")}
						onClear={clearData}
						onStartWithGhost={(replayId) => {
							startGame(replayId);
						}}
						onDeleteReplay={deleteReplay}
					/>
				}
			/>
			<Route
				path="/ready"
				element={
					state.phase === "ready" ? (
						<ReadyScreen onReady={beginPlaying} />
					) : (
						<Navigate to="/" replace />
					)
				}
			/>
			<Route
				path="/play"
				element={
					state.phase === "playing" ? (
						<GameScreen
							state={state}
							showKeyboard={showKeyboard}
							onToggleKeyboard={() => setShowKeyboard((v) => !v)}
						/>
					) : (
						<Navigate to="/" replace />
					)
				}
			/>
			<Route
				path="/gameover"
				element={
					state.phase === "gameover" && state.lastSession ? (
						<GameOverScreen
							session={state.lastSession}
							onRestart={startGame}
							onStats={() => setPhase("stats")}
						/>
					) : (
						<Navigate to="/" replace />
					)
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
