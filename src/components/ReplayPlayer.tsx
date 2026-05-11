import { useCallback, useEffect, useRef, useState } from "react";
import { SlidingWindowKPS } from "../lib/ema";
import {
	applyDrain,
	applyInput,
	createRunnerState,
	type RunnerState,
} from "../lib/runnerState";
import { playKeyTap, playMiss, playSegmentComplete } from "../lib/sound";
import type { ReplayData } from "../lib/types";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { SpeedMeter } from "./SpeedMeter";
import { TypingDisplay } from "./TypingDisplay";

interface Props {
	replay: ReplayData;
	onClose: () => void;
}

function lifeColor(life: number): string {
	if (life > 60) return "#00ff88";
	if (life > 30) return "#ffaa00";
	return "#ff3333";
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

interface DisplayState extends RunnerState {
	totalCorrect: number;
	totalErrors: number;
	lastKey: string;
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

	for (let i = 0; i < idx && i < replay.events.length; i++) {
		const ev = replay.events[i];
		if (!ev) continue;

		const dt = ev.time - lastEventTime;
		runner = applyDrain(runner, dt);
		lastEventTime = ev.time;
		lastKey = ev.key;

		const { state } = applyInput(runner, ev, kps, lastWasWrong);
		runner = state;
		lastWasWrong = !ev.correct;

		if (ev.correct) totalCorrect++;
		else totalErrors++;
	}

	const refTime = currentTime !== undefined ? currentTime : lastEventTime;
	return {
		...runner,
		speed: kps.get(refTime),
		life: Math.max(0, runner.life),
		totalCorrect,
		totalErrors,
		lastKey,
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

		// Play sounds for newly processed events (skip if catching up too many)
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
	const lifePct = Math.max(0, Math.min(100, displayState.life));
	const lc = lifeColor(lifePct);
	const cc = comboColor(displayState.combo);
	const sentenceProgress = displayState.sentenceIdx;
	const progressMax = Math.max(sentenceProgress, 1);
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

	const nextKeys: string[] = (() => {
		const ts = displayState.typingState;
		const pos = ts.typed.length;
		const fromCurrent = ts.validOptions
			.map((o) => o[pos])
			.filter((c): c is string => !!c);
		return [...new Set(fromCurrent)];
	})();

	return (
		<div
			className="h-screen overflow-hidden flex justify-center"
			style={{ background: "#050508" }}
		>
			<div className="flex h-full w-full" style={{ maxWidth: "1100px" }}>
				{/* ── LIFE bar — left ── */}
				<div
					className="w-16 shrink-0 relative"
					style={{ background: "#080808" }}
				>
					<div className="absolute inset-0 flex flex-col justify-end">
						<div
							className="w-full transition-all duration-100"
							style={{
								height: `${lifePct}%`,
								background: lc,
								opacity: 0.45,
								boxShadow: `0 0 18px ${lc}`,
							}}
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-center">
						<span
							className="text-[9px] font-mono uppercase tracking-widest select-none"
							style={{ writingMode: "vertical-rl", color: lc, opacity: 0.75 }}
						>
							HP {Math.round(lifePct)}%
						</span>
					</div>
				</div>

				{/* ── Main content ── */}
				<div className="flex-1 flex flex-col min-w-0">
					{/* Progress bar */}
					<div className="pt-4 pb-3 flex justify-center">
						<div className="w-full max-w-xl px-4 flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<span
									className="text-[11px] font-mono w-14 text-right uppercase tracking-wider shrink-0"
									style={{ color: "#cc44ff" }}
								>
									リプレイ
								</span>
								<div
									className="flex-1 h-4 rounded overflow-hidden"
									style={{ background: "#111" }}
								>
									<div
										className="h-full rounded transition-all duration-300"
										style={{
											width: `${(sentenceProgress / progressMax) * 100}%`,
											background: "linear-gradient(90deg, #cc44ff, #8800ff)",
											boxShadow: "0 0 8px #cc44ff44",
										}}
									/>
								</div>
								<span
									className="text-[11px] font-mono w-16 shrink-0"
									style={{ color: "#cc44ff" }}
								>
									{sentenceProgress} クリア
								</span>
							</div>
						</div>
					</div>

					<div className="h-px" style={{ background: "#111" }} />

					{/* Typing area */}
					<div className="flex-1 flex flex-col items-center justify-center gap-8">
						{sentence ? (
							<TypingDisplay
								sentence={sentence}
								typingState={displayState.typingState}
								lastWrong={false}
							/>
						) : (
							<div className="text-gray-500 font-mono">読み込み中...</div>
						)}

						<div className="flex items-center gap-8">
							<SpeedMeter
								wpm={displayState.speed}
								label="リプレイ"
								color="#cc44ff"
							/>
						</div>

						<div className="flex gap-6 text-xs text-gray-600 font-mono">
							<span>
								コンボ <span style={{ color: cc }}>{displayState.combo}x</span>
							</span>
							<span>
								正解{" "}
								<span className="text-green-400">
									{displayState.totalCorrect}
								</span>
							</span>
							<span>
								ミス{" "}
								<span className="text-red-400">{displayState.totalErrors}</span>
							</span>
							<span>
								精度 <span className="text-yellow-400">{acc}%</span>
							</span>
							<span className="text-gray-700">{currentTimeSec}s</span>
						</div>
					</div>

					{/* Keyboard showing next expected keys */}
					<div className="border-t border-gray-900 pb-1 flex justify-center">
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

					{/* Seek + controls */}
					<div className="px-4 py-2" style={{ borderTop: "1px solid #111" }}>
						<input
							type="range"
							min="0"
							max="100"
							step="0.1"
							value={seekPct}
							onChange={handleSeek}
							className="w-full accent-purple-400 mb-2"
						/>
						<div className="flex items-center justify-between text-[10px] text-gray-700 font-mono">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-1 border rounded transition-all font-mono text-xs"
								style={{ borderColor: "#444", color: "#888" }}
							>
								← 戻る
							</button>
							<button
								type="button"
								onClick={playing ? stop : play}
								className="px-4 py-1 border rounded transition-all font-mono text-xs"
								style={{
									borderColor: playing ? "#ff3333" : "#cc44ff",
									color: playing ? "#ff3333" : "#cc44ff",
									boxShadow: playing
										? "0 0 6px #ff333344"
										: "0 0 6px #cc44ff44",
								}}
							>
								{playing ? "一時停止" : "再生"}
							</button>
							<span>
								{currentTimeSec}s / {totalTimeSec}s
							</span>
						</div>
					</div>
				</div>

				{/* ── Replay progress — right ── */}
				<div
					className="w-16 shrink-0 relative"
					style={{ background: "#080808" }}
				>
					<div className="absolute inset-0 flex flex-col justify-end">
						<div
							className="w-full transition-all duration-100"
							style={{
								height: `${seekPct}%`,
								background: "#cc44ff",
								opacity: 0.45,
								boxShadow: "0 0 18px #cc44ff88",
							}}
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-center">
						<span
							className="text-[9px] font-mono uppercase tracking-widest select-none"
							style={{
								writingMode: "vertical-rl",
								color: "#cc44ff",
								opacity: 0.75,
							}}
						>
							{currentTimeSec}s / {totalTimeSec}s
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
