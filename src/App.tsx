import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ConfigScreen } from "./components/ConfigScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { GameScreen } from "./components/GameScreen";
import { HelpScreen } from "./components/HelpScreen";
import { IdleScreen } from "./components/IdleScreen";
import { ReadyScreen } from "./components/ReadyScreen";
import { StatsScreen } from "./components/StatsScreen";
import { useGameEngine } from "./hooks/useGameEngine";
import { setMasterVolume } from "./lib/sound";
import { deleteReplay, loadConfig, saveConfig } from "./lib/storage";
import type { GameConfig, GamePhase } from "./lib/types";

const PHASE_TO_PATH: Record<GamePhase, string> = {
	idle: "/",
	help: "/help",
	config: "/config",
	ready: "/play", // same URL as playing — no route change on countdown end
	playing: "/play",
	gameover: "/gameover",
	stats: "/stats",
	replay: "/replay",
};

// Only list phases that can be safely restored from URL alone
const PATH_TO_PHASE: Partial<Record<string, GamePhase>> = {
	"/": "idle",
	"/help": "help",
	"/config": "config",
	"/stats": "stats",
};

export default function App() {
	const [config, setConfig] = useState<GameConfig>(() => loadConfig());

	useEffect(() => {
		setMasterVolume(config.muted ? 0 : config.volume);
	}, [config.volume, config.muted]);

	const handleConfigChange = (next: GameConfig) => {
		setConfig(next);
		saveConfig(next);
	};

	const { state, startGame, beginPlaying, setPhase, clearData } =
		useGameEngine(config);
	const [showKeyboard, setShowKeyboard] = useState(true);
	const navigate = useNavigate();

	// phase → URL (app-driven transitions)
	useEffect(() => {
		const expectedPath = PHASE_TO_PATH[state.phase];
		const currentPath = window.location.hash.slice(1) || "/";
		if (currentPath !== expectedPath) {
			navigate(expectedPath);
		}
	}, [state.phase, navigate]);

	// URL → phase (browser back/forward)
	useEffect(() => {
		const handlePopState = () => {
			const hash = window.location.hash;
			const path = hash.startsWith("#") ? hash.slice(1) : "/";
			const phase = PATH_TO_PHASE[path] ?? "idle";
			setPhase(phase);
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [setPhase]);

	const recentSessions = state.sessions.slice(-5);
	const avgWpm =
		recentSessions.length > 0
			? recentSessions.reduce((sum, s) => sum + s.wpm, 0) /
				recentSessions.length
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
						onConfig={() => setPhase("config")}
						bestWpm={avgWpm}
						sessionCount={state.sessions.length}
					/>
				}
			/>
			<Route
				path="/help"
				element={<HelpScreen onBack={() => setPhase("idle")} />}
			/>
			<Route
				path="/config"
				element={
					<ConfigScreen
						config={config}
						onChange={handleConfigChange}
						onBack={() => setPhase("idle")}
					/>
				}
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
				path="/play"
				element={
					state.phase === "playing" || state.phase === "ready" ? (
						<div style={{ position: "relative", height: "100vh" }}>
							<GameScreen
								player={state.player}
								ghost={state.ghost}
								healStreak={state.healStreak}
								lastHealId={state.lastHealId}
								lastHealAmount={state.lastHealAmount}
								totalCorrect={state.totalCorrect}
								totalErrors={state.totalErrors}
								elapsed={state.elapsed}
								lastWrong={state.lastWrong}
								showKeyboard={showKeyboard}
								onToggleKeyboard={() => setShowKeyboard((v) => !v)}
							/>
							{state.phase === "ready" && (
								<ReadyScreen onReady={beginPlaying} />
							)}
						</div>
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
