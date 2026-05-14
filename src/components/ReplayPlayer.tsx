import { useCallback, useEffect, useRef, useState } from "react";
import { SlidingWindowKPS } from "../lib/ema";
import {
	LIFE_MAX,
	applyDrain,
	applyInput,
	createRunnerState,
	type RunnerState,
} from "../lib/runnerState";
import { playKeyTap, playMiss, playSegmentComplete } from "../lib/sound";
import type { ReplayData } from "../lib/types";
import { CentralGauge } from "./CentralGauge";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { TypingDisplay } from "./TypingDisplay";

interface Props {
	replay: ReplayData;
	onClose: () => void;
}

function lifeColor(pct: number): string {
	if (pct > 60) return "#00ffff";
	if (pct > 30) return "#ffaa00";
	return "#ff2244";
}

function comboColor(combo: number): string {
	const colors = [
		"#00ffff",
		"#00ff88",
		"#ffaa00",
		"#ff6600",
		"#ff3366",
		"#cc00ff",
	];
	return colors[Math.floor(combo / 30) % colors.length] ?? "#00ffff";
}

function healStreakColor(streak: number): string {
	if (streak >= 5) return "#ff44ff";
	if (streak >= 4) return "#ff8800";
	if (streak >= 3) return "#ffdd00";
	if (streak >= 2) return "#00ff66";
	if (streak >= 1) return "#00ffff";
	return "#333344";
}

interface DisplayState extends RunnerState {
	totalCorrect: number;
	totalErrors: number;
	lastKey: string;
	healStreak: number;
}

function reconstructAt(
	replay: ReplayData,
	idx: number,
	currentTime?: number,
): DisplayState {
	const kps = new SlidingWindowKPS(2000);
	let runner = createRunnerState(replay.sentences);
	let totalErrors = 0;
	let totalCorrect = 0;
	let lastEventTime = 0;
	let lastKey = "";
	let lastWasWrong = false;
	let healStreak = 0;

	for (let i = 0; i < idx && i < replay.events.length; i++) {
		const ev = replay.events[i];
		if (!ev) continue;

		const dt = ev.time - lastEventTime;
		runner = applyDrain(runner, dt);
		lastEventTime = ev.time;
		lastKey = ev.key;

		const { state, healAmount } = applyInput(runner, ev, kps, lastWasWrong);
		runner = state;
		lastWasWrong = !ev.correct;

		if (ev.correct) {
			totalCorrect++;
			if (healAmount > 0) healStreak++;
		} else {
			totalErrors++;
			healStreak = 0;
		}
	}

	const refTime = currentTime !== undefined ? currentTime : lastEventTime;
	return {
		...runner,
		speed: kps.get(refTime),
		life: Math.max(0, runner.life),
		totalCorrect,
		totalErrors,
		lastKey,
		healStreak,
	};
}

export function ReplayPlayer({ replay, onClose }: Props) {
	const [seekPct, setSeekPct] = useState(0);
	const [playing, setPlaying] = useState(false);
	const rafRef = useRef<number>(0);
	const startWallRef = useRef(0);
	const startGameRef = useRef(0);
	const lastSoundIdxRef = useRef(0);
	const tickRef = useRef<() => void>(() => {});

	const [displayState, setDisplayState] = useState<DisplayState>(() =>
		reconstructAt(replay, 0),
	);

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
		while (
			newIdx < events.length &&
			(events[newIdx]?.time ?? Infinity) <= elapsed
		) {
			newIdx++;
		}

		const fromIdx = lastSoundIdxRef.current;
		if (newIdx > fromIdx && newIdx - fromIdx < 20) {
			const stateAtFrom = reconstructAt(replay, fromIdx);
			let soundCombo = stateAtFrom.combo;
			let prevSegIdx = replay.events[fromIdx - 1]?.segmentIdx ?? -1;
			for (let i = fromIdx; i < newIdx; i++) {
				const ev = replay.events[i];
				if (!ev) continue;
				if (!ev.correct) {
					playMiss();
					soundCombo = 0;
				} else if (prevSegIdx !== -1 && ev.segmentIdx !== prevSegIdx) {
					playSegmentComplete(soundCombo);
					soundCombo++;
					prevSegIdx = ev.segmentIdx;
				} else {
					playKeyTap(soundCombo);
					soundCombo++;
					prevSegIdx = ev.segmentIdx;
				}
			}
		}
		lastSoundIdxRef.current = newIdx;

		setDisplayState(reconstructAt(replay, newIdx, elapsed));

		if (elapsed >= replay.totalTime) {
			stop();
			return;
		}
		rafRef.current = requestAnimationFrame(tickRef.current);
	}, [replay, stop]);

	useEffect(() => {
		tickRef.current = tick;
	}, [tick]);

	const play = useCallback(() => {
		const gameTime = (seekPct / 100) * replay.totalTime;
		startWallRef.current = Date.now();
		startGameRef.current = gameTime;
		setPlaying(true);
		rafRef.current = requestAnimationFrame(tick);
	}, [seekPct, replay.totalTime, tick]);

	useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === " ") {
				e.preventDefault();
				if (playing) {
					stop();
				} else {
					play();
				}
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onClose, playing, stop, play]);

	function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
		stop();
		const pct = Number(e.target.value);
		setSeekPct(pct);
		const gameTime = (pct / 100) * replay.totalTime;
		const events = replay.events;
		let idx = 0;
		while (idx < events.length && (events[idx]?.time ?? Infinity) <= gameTime)
			idx++;
		lastSoundIdxRef.current = idx;
		setDisplayState(reconstructAt(replay, idx, gameTime));
	}

	const sentence = replay.sentences[displayState.sentenceIdx];
	const lifePct = Math.max(0, Math.min(100, (displayState.life / LIFE_MAX) * 100));
	const lc = lifeColor(lifePct);
	const cc = comboColor(displayState.combo);
	const sc = healStreakColor(displayState.healStreak);
	const sentenceProgress = displayState.sentenceIdx;
	const acc =
		displayState.totalCorrect + displayState.totalErrors > 0
			? Math.round(
					(displayState.totalCorrect /
						(displayState.totalCorrect + displayState.totalErrors)) *
						100,
				)
			: 100;
	const currentTimeSec = Math.round(
		((seekPct / 100) * replay.totalTime) / 1000,
	);
	const totalTimeSec = Math.round(replay.totalTime / 1000);

	const prevHealAt = displayState.nextHealAt - displayState.nextHealInterval;
	const progressToHeal =
		displayState.nextHealInterval > 0
			? Math.min(
					1,
					Math.max(
						0,
						(displayState.combo - prevHealAt) / displayState.nextHealInterval,
					),
				)
			: 0;

	const nextKeys: string[] = (() => {
		const ts = displayState.typingState;
		const pos = ts.typed.length;
		const fromCurrent = ts.validOptions
			.map((o) => o[pos])
			.filter((c): c is string => !!c);
		return [...new Set(fromCurrent)];
	})();

	const comboPct = progressToHeal * 100;

	return (
		<div
			className="h-screen overflow-hidden flex flex-col"
			style={{ background: "var(--bg)", position: "relative" }}
		>
			{/* HEADER */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "10px 20px",
					borderBottom: "2px solid #cc44ff",
					boxShadow: "0 0 20px #cc44ff66, 0 0 40px rgba(204,68,255,0.2)",
					background: "rgba(13,0,26,0.9)",
					position: "relative",
					zIndex: 1,
					flexShrink: 0,
				}}
			>
				<div
					style={{
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "18px",
						color: "#cc44ff",
						textShadow: "0 0 10px #cc44ff, 0 0 20px #cc44ff",
						letterSpacing: "3px",
					}}
				>
					REPLAY
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "13px",
							color: "#cc44ff",
							textShadow: "0 0 6px #cc44ff",
						}}
					>
						{sentenceProgress} クリア
					</div>
					<div
						style={{
							width: "200px",
							height: "14px",
							background: "#1a0030",
							border: "1px solid #440066",
							overflow: "hidden",
						}}
					>
						<div
							style={{
								height: "100%",
								width: `${Math.min(100, sentenceProgress * 5)}%`,
								background: "#cc44ff",
								boxShadow: "0 0 8px #cc44ff",
								transition: "width 0.3s",
							}}
						/>
					</div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "13px",
							color: "#cc44ff",
							opacity: 0.6,
						}}
					>
						{currentTimeSec}s / {totalTimeSec}s
					</div>
				</div>

				<div
					style={{
						display: "flex",
						gap: "20px",
						fontSize: "14px",
						color: "#888",
						fontFamily: "'Share Tech Mono', monospace",
					}}
				>
					<span>
						正解{" "}
						<span style={{ color: "#00ff66" }}>{displayState.totalCorrect}</span>
					</span>
					<span>
						ミス{" "}
						<span style={{ color: "#ff2244" }}>{displayState.totalErrors}</span>
					</span>
					<span>
						精度 <span style={{ color: "#ffee00" }}>{acc}%</span>
					</span>
				</div>
			</div>

			{/* MAIN AREA */}
			<div className="flex flex-1 min-h-0" style={{ position: "relative", zIndex: 1 }}>
				{/* LEFT HP BAR */}
				<div
					style={{
						width: "120px",
						flexShrink: 0,
						background: "var(--panel)",
						borderRight: "1px solid var(--border)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px 16px",
						gap: "10px",
						position: "relative",
					}}
				>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							writingMode: "vertical-rl",
							textOrientation: "mixed",
							letterSpacing: "2px",
							color: lc,
							textShadow: `0 0 8px ${lc}`,
						}}
					>
						PLAYER
					</div>
					<div
						style={{
							flex: 1,
							width: "52px",
							background: "#1a0030",
							border: `2px solid ${lc}`,
							position: "relative",
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-end",
							overflow: "hidden",
						}}
					>
						<div
							style={{
								width: "100%",
								height: `${lifePct}%`,
								background: `linear-gradient(to top, ${lc}66, ${lc})`,
								boxShadow: `0 0 16px ${lc}, inset 0 0 16px ${lc}33`,
								transition: "height 0.05s",
							}}
						/>
						{[...Array(5)].map((_, i) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: decorative ticks
								key={i}
								style={{
									position: "absolute",
									top: `${(i + 1) * 20}%`,
									left: 0,
									right: 0,
									height: "1px",
									background: "rgba(255,255,255,0.1)",
								}}
							/>
						))}
					</div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "13px",
							color: lc,
							textShadow: `0 0 6px ${lc}`,
						}}
					>
						{Math.round(lifePct)}%
					</div>
				</div>

				{/* CENTER */}
				<div className="flex-1 flex flex-col min-w-0" style={{ overflow: "hidden" }}>
					{/* Typing area */}
					<div
						className="flex-1 flex flex-col items-center justify-center"
						style={{ padding: "16px 32px", gap: "12px" }}
					>
						{sentence ? (
							<TypingDisplay
								sentence={sentence}
								typingState={displayState.typingState}
								lastWrong={false}
							/>
						) : (
							<div
								style={{
									color: "#666",
									fontFamily: "'Share Tech Mono', monospace",
									fontSize: "16px",
								}}
							>
								読み込み中...
							</div>
						)}
					</div>

					{/* Combo shimmer bar — synced with progressToHeal */}
					<div
						style={{
							height: "4px",
							background: "#1a0030",
							position: "relative",
							overflow: "hidden",
						}}
					>
						<div
							style={{
								height: "100%",
								width: `${comboPct}%`,
								background: `linear-gradient(90deg, ${sc}, #00ff66, #ffee00, ${sc})`,
								backgroundSize: "200% 100%",
								boxShadow: `0 0 8px ${sc}`,
								animation:
									displayState.combo > 0 ? "comboShimmer 2s linear infinite" : "none",
								transition: "width 0.08s",
							}}
						/>
					</div>

					{/* Central gauge + side stats */}
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: "8px 20px",
							gap: "32px",
						}}
					>
						{/* Left side stats */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "18px",
								minWidth: "120px",
							}}
						>
							<div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "10px",
										color: "#666",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "5px",
									}}
								>
									CORRECT
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "24px",
										color: "#00ff66",
										textShadow: "0 0 8px #00ff66",
									}}
								>
									{displayState.totalCorrect}
								</div>
							</div>
							<div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "10px",
										color: "#666",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "5px",
									}}
								>
									MISS
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "24px",
										color: "#ff2244",
										textShadow: "0 0 8px #ff2244",
									}}
								>
									{displayState.totalErrors}
								</div>
							</div>
						</div>

						{/* Central gauge */}
						<CentralGauge
							progressToHeal={progressToHeal}
							healStreak={displayState.healStreak}
							streakColor={sc}
							speed={displayState.speed}
							combo={displayState.combo}
							comboColor={cc}
							hitCount={displayState.totalCorrect}
							lastWrong={false}
						/>

						{/* Right side stats */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "18px",
								minWidth: "120px",
								alignItems: "flex-end",
							}}
						>
							<div style={{ alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "10px",
										color: "#666",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "5px",
									}}
								>
									ACCURACY
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "24px",
										color: "#ffee00",
										textShadow: "0 0 8px #ffee00",
									}}
								>
									{acc}%
								</div>
							</div>
							<div style={{ alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "10px",
										color: "#666",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "5px",
									}}
								>
									TIME
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "24px",
										color: "#aaa",
									}}
								>
									{currentTimeSec}s
								</div>
							</div>
						</div>
					</div>

					{/* Keyboard */}
					<div
						style={{
							borderTop: "1px solid var(--border)",
							background: "rgba(0,0,0,0.5)",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<KeyboardDisplay
							keyStats={[]}
							highlight={
								nextKeys.length > 0
									? nextKeys
									: displayState.lastKey
										? [displayState.lastKey]
										: []
							}
						/>
					</div>
				</div>

				{/* RIGHT — replay time progress bar */}
				<div
					style={{
						width: "120px",
						flexShrink: 0,
						background: "var(--panel)",
						borderLeft: "1px solid var(--border)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px 16px",
						gap: "10px",
					}}
				>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							writingMode: "vertical-rl",
							textOrientation: "mixed",
							letterSpacing: "2px",
							color: "#cc44ff",
							textShadow: "0 0 8px #cc44ff",
						}}
					>
						TIME
					</div>
					<div
						style={{
							flex: 1,
							width: "52px",
							background: "#1a0030",
							border: "2px solid #cc44ff",
							position: "relative",
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-end",
							overflow: "hidden",
						}}
					>
						<div
							style={{
								width: "100%",
								height: `${seekPct}%`,
								background: "linear-gradient(to top, #6600aa, #cc44ff)",
								boxShadow: "0 0 16px #cc44ff, inset 0 0 16px rgba(204,68,255,0.3)",
								transition: "height 0.05s",
							}}
						/>
					</div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							color: "#cc44ff",
							textShadow: "0 0 6px #cc44ff",
							textAlign: "center",
						}}
					>
						{currentTimeSec}s
					</div>
				</div>
			</div>

			{/* FOOTER: seek + controls */}
			<div
				style={{
					padding: "8px 20px",
					borderTop: "1px solid var(--border)",
					background: "rgba(13,0,26,0.9)",
					flexShrink: 0,
					position: "relative",
					zIndex: 1,
				}}
			>
				<input
					type="range"
					min="0"
					max="100"
					step="0.1"
					value={seekPct}
					onChange={handleSeek}
					style={{ width: "100%", accentColor: "#cc44ff", marginBottom: "8px" }}
				/>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<button
						type="button"
						onClick={onClose}
						style={{
							padding: "6px 18px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "11px",
							border: "1px solid #6611cc",
							color: "#aaa",
							background: "none",
							cursor: "pointer",
							letterSpacing: "1px",
							transition: "all 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = "#00ffff";
							e.currentTarget.style.borderColor = "#00ffff";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "#aaa";
							e.currentTarget.style.borderColor = "#6611cc";
						}}
					>
						← 戻る
					</button>
					<button
						type="button"
						onClick={playing ? stop : play}
						style={{
							padding: "6px 18px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "11px",
							border: `1px solid ${playing ? "#ff3333" : "#cc44ff"}`,
							color: playing ? "#ff3333" : "#cc44ff",
							background: "none",
							cursor: "pointer",
							letterSpacing: "1px",
							boxShadow: playing ? "0 0 6px #ff333344" : "0 0 6px #cc44ff44",
							transition: "all 0.15s",
						}}
					>
						{playing ? "一時停止" : "再生"}
					</button>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							color: "#666",
						}}
					>
						{currentTimeSec}s / {totalTimeSec}s
					</div>
				</div>
			</div>
		</div>
	);
}
