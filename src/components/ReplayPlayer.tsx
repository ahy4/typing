import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	type GhostTimelineEntry,
	getGhostAt,
	precomputeGhostTimeline,
} from "../hooks/useGameEngine";
import { SlidingWindowKPS } from "../lib/ema";
import {
	applyDrain,
	applyInput,
	createRunnerState,
	type RunnerState,
} from "../lib/runnerState";
import { encodeReplay } from "../lib/shareReplay";
import {
	playHeal,
	playKeyTap,
	playMiss,
	playSegmentComplete,
} from "../lib/sound";
import { loadReplays } from "../lib/storage";
import type { ReplayData } from "../lib/types";
import { GameScreen } from "./GameScreen";

interface Props {
	replay: ReplayData;
	onClose: () => void;
	onStartWithGhost?: () => void;
}

interface DisplayState extends RunnerState {
	totalCorrect: number;
	totalErrors: number;
	healStreak: number;
	lastHealId: number;
	lastHealAmount: number;
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
	let lastWasWrong = false;
	let healStreak = 0;
	let lastHealId = 0;
	let lastHealAmount = 0;

	for (let i = 0; i < idx && i < replay.events.length; i++) {
		const ev = replay.events[i];
		if (!ev) continue;

		const dt = ev.time - lastEventTime;
		runner = applyDrain(runner, dt);
		lastEventTime = ev.time;

		const { state, healAmount } = applyInput(runner, ev, kps, lastWasWrong);
		runner = state;
		lastWasWrong = !ev.correct;

		if (ev.correct) {
			totalCorrect++;
			if (healAmount > 0) {
				healStreak++;
				lastHealId++;
				lastHealAmount = healAmount;
			}
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
		healStreak,
		lastHealId,
		lastHealAmount,
	};
}

export function ReplayPlayer({ replay, onClose, onStartWithGhost }: Props) {
	const ghostTimeline = useMemo(() => {
		if (!replay.ghostReplayId) return [];
		const ghostReplay = loadReplays().find(
			(r) => r.id === replay.ghostReplayId,
		);
		return ghostReplay ? precomputeGhostTimeline(ghostReplay) : [];
	}, [replay.ghostReplayId]);

	const [seekPct, setSeekPct] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [copied, setCopied] = useState(false);
	const rafRef = useRef<number>(0);
	const startWallRef = useRef(0);
	const startGameRef = useRef(0);
	const lastSoundIdxRef = useRef(0);
	const tickRef = useRef<() => void>(() => {});

	const [displayState, setDisplayState] = useState<DisplayState>(() =>
		reconstructAt(replay, 0),
	);
	const [ghostState, setGhostState] = useState<GhostTimelineEntry | null>(() =>
		getGhostAt(ghostTimeline, 0),
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
			let soundRunner: RunnerState = stateAtFrom;
			let soundLastWasWrong =
				fromIdx > 0 ? !(replay.events[fromIdx - 1]?.correct ?? true) : false;
			let soundHealStreak = stateAtFrom.healStreak;
			let prevSegIdx = replay.events[fromIdx - 1]?.segmentIdx ?? -1;
			for (let i = fromIdx; i < newIdx; i++) {
				const ev = replay.events[i];
				if (!ev) continue;
				const { state: nextRunner, healAmount } = applyInput(
					soundRunner,
					ev,
					null,
					soundLastWasWrong,
				);
				soundLastWasWrong = !ev.correct;
				if (!ev.correct) {
					playMiss();
					soundHealStreak = 0;
				} else if (prevSegIdx !== -1 && ev.segmentIdx !== prevSegIdx) {
					playSegmentComplete(soundRunner.combo);
					prevSegIdx = ev.segmentIdx;
					if (healAmount > 0) {
						playHeal(soundHealStreak);
						soundHealStreak++;
					}
				} else {
					playKeyTap(soundRunner.combo);
					prevSegIdx = ev.segmentIdx;
					if (healAmount > 0) {
						playHeal(soundHealStreak);
						soundHealStreak++;
					}
				}
				soundRunner = nextRunner;
			}
		}
		lastSoundIdxRef.current = newIdx;

		setDisplayState(reconstructAt(replay, newIdx, elapsed));
		setGhostState(getGhostAt(ghostTimeline, elapsed));

		if (elapsed >= replay.totalTime) {
			stop();
			return;
		}
		rafRef.current = requestAnimationFrame(tickRef.current);
	}, [replay, stop, ghostTimeline]);

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
		setGhostState(getGhostAt(ghostTimeline, gameTime));
	}

	async function handleShare() {
		const encoded = await encodeReplay(replay);
		const url = `${window.location.origin}${window.location.pathname}#/replay?r=${encoded}`;
		const res = await fetch(
			`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`,
		);
		if (!res.ok) throw new Error("is.gd failed");
		const shortUrl = await res.text();
		await navigator.clipboard.writeText(shortUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

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

	return (
		<GameScreen
			player={displayState}
			ghost={ghostState}
			healStreak={displayState.healStreak}
			lastHealId={displayState.lastHealId}
			lastHealAmount={displayState.lastHealAmount}
			totalCorrect={displayState.totalCorrect}
			totalErrors={displayState.totalErrors}
			elapsed={(seekPct / 100) * replay.totalTime}
			lastWrong={false}
			showKeyboard={true}
			onToggleKeyboard={() => {}}
			header={
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
							<span style={{ color: "#00ff66" }}>
								{displayState.totalCorrect}
							</span>
						</span>
						<span>
							ミス{" "}
							<span style={{ color: "#ff2244" }}>
								{displayState.totalErrors}
							</span>
						</span>
						<span>
							精度 <span style={{ color: "#ffee00" }}>{acc}%</span>
						</span>
					</div>
				</div>
			}
			footer={
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
						style={{
							width: "100%",
							accentColor: "#cc44ff",
							marginBottom: "8px",
						}}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "16px",
							flexWrap: "wrap",
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
						<button
							type="button"
							onClick={handleShare}
							style={{
								padding: "6px 18px",
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "11px",
								border: `1px solid ${copied ? "#00ff66" : "#446688"}`,
								color: copied ? "#00ff66" : "#88aacc",
								background: "none",
								cursor: "pointer",
								letterSpacing: "1px",
								transition: "all 0.15s",
							}}
						>
							{copied ? "コピーした!" : "URLをコピー"}
						</button>
						{onStartWithGhost && (
							<button
								type="button"
								onClick={onStartWithGhost}
								style={{
									padding: "6px 18px",
									fontFamily: "'Press Start 2P', monospace",
									fontSize: "11px",
									border: "1px solid #ff6600",
									color: "#ff6600",
									background: "none",
									cursor: "pointer",
									letterSpacing: "1px",
									boxShadow: "0 0 6px #ff660044",
									transition: "all 0.15s",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.color = "#ffaa44";
									e.currentTarget.style.borderColor = "#ffaa44";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.color = "#ff6600";
									e.currentTarget.style.borderColor = "#ff6600";
								}}
							>
								このゴーストと対戦
							</button>
						)}
					</div>
				</div>
			}
		/>
	);
}
