import { useEffect, useRef, useState } from "react";
import type { GameState } from "../hooks/useGameEngine";
import { CentralGauge } from "./CentralGauge";
import { KeyboardDisplay } from "./KeyboardDisplay";
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

function healStreakColor(streak: number): string {
	if (streak >= 5) return "#ff44ff";
	if (streak >= 4) return "#ff8800";
	if (streak >= 3) return "#ffdd00";
	if (streak >= 2) return "#00ff88";
	if (streak >= 1) return "#00ffff";
	return "#333344";
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

export function GameScreen({ state, showKeyboard, onToggleKeyboard }: Props) {
	const { player, ghost } = state;
	const sentence = player.sentences[player.sentenceIdx];
	const lifePct = Math.max(0, Math.min(100, player.life));
	const lc = lifeColor(lifePct);
	const cc = comboColor(player.combo);

	const prevHealAt = player.nextHealAt - player.nextHealInterval;
	const progressToHeal =
		player.nextHealInterval > 0
			? Math.min(
					1,
					Math.max(0, (player.combo - prevHealAt) / player.nextHealInterval),
				)
			: 0;
	const sc = healStreakColor(state.healStreak);

	const prevHealId = useRef(state.lastHealId);
	const [healAnim, setHealAnim] = useState<{
		id: number;
		amount: number;
	} | null>(null);
	useEffect(() => {
		if (state.lastHealId !== prevHealId.current && state.lastHealAmount > 0) {
			prevHealId.current = state.lastHealId;
			setHealAnim({ id: state.lastHealId, amount: state.lastHealAmount });
		}
	}, [state.lastHealId, state.lastHealAmount]);

	const ghostLifePct = ghost ? Math.max(0, Math.min(100, ghost.life)) : 0;
	const acc =
		state.totalCorrect + state.totalErrors > 0
			? Math.round(
					(state.totalCorrect / (state.totalCorrect + state.totalErrors)) * 100,
				)
			: 100;

	const nextKeys: string[] = (() => {
		const ts = player.typingState;
		const pos = ts.typed.length;
		const fromCurrent = ts.validOptions
			.map((o) => o[pos])
			.filter((c): c is string => !!c);
		if (ts.pendingComplete) {
			const fromNext =
				ts.segments[ts.segIdx + 1]?.options
					.map((o) => o[0])
					.filter((c): c is string => !!c) ?? [];
			return [...new Set([...fromCurrent, ...fromNext])];
		}
		return [...new Set(fromCurrent)];
	})();

	const myProgress = player.sentenceIdx;
	const ghostProgress = ghost ? ghost.sentenceIdx : 0;

	const PX_PER_CLEAR = 6;

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
					{healAnim && (
						<>
							<div
								key={`flash-${healAnim.id}`}
								className="absolute inset-0 pointer-events-none"
								style={{
									background: sc,
									animation: "healFlash 0.4s ease-out forwards",
								}}
							/>
							<span
								key={healAnim.id}
								className="absolute font-mono font-bold pointer-events-none select-none"
								style={{
									bottom: `${lifePct}%`,
									left: "50%",
									fontSize: "13px",
									color: sc,
									textShadow: `0 0 10px ${sc}, 0 0 20px ${sc}`,
									animation: "healFloat 1s ease-out forwards",
								}}
								onAnimationEnd={() => setHealAnim(null)}
							>
								+{Math.round(healAnim.amount)}
							</span>
						</>
					)}
				</div>

				{/* ── Main content ── */}
				<div className="flex-1 flex flex-col min-w-0">
					{/* Progress comparison */}
					<div className="pt-4 pb-3 flex justify-center">
						<div className="w-full max-w-xl px-4 flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<span className="text-[11px] font-mono text-cyan-400 w-14 text-right uppercase tracking-wider shrink-0">
									自分
								</span>
								<span className="text-[11px] font-mono text-cyan-400 w-16 shrink-0">
									{myProgress} クリア
								</span>
								<div
									className="flex-1 h-4 rounded overflow-hidden"
									style={{ background: "#111" }}
								>
									<div
										className="h-full rounded transition-all duration-300"
										style={{
											width: `${myProgress * PX_PER_CLEAR}px`,
											background: "linear-gradient(90deg, #00ffff, #0088ff)",
											boxShadow: "0 0 8px #00ffff44",
										}}
									/>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<span
									className="text-[11px] font-mono w-14 text-right uppercase tracking-wider shrink-0"
									style={{ color: ghost ? "#cc44ff" : "#333" }}
								>
									ゴースト
								</span>
								<span
									className="text-[11px] font-mono w-16 shrink-0"
									style={{ color: ghost ? "#cc44ff" : "#333" }}
								>
									{ghost ? `${ghostProgress} クリア` : "— なし"}
								</span>
								<div
									className="flex-1 h-4 rounded overflow-hidden"
									style={{ background: "#111" }}
								>
									{ghost && (
										<div
											className="h-full rounded transition-all duration-100"
											style={{
												width: `${ghostProgress * PX_PER_CLEAR}px`,
												background: "linear-gradient(90deg, #cc44ff, #8800ff)",
												boxShadow: "0 0 8px #cc44ff44",
											}}
										/>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="h-px" style={{ background: "#111" }} />

					{/* Typing area */}
					<div className="flex-1 flex flex-col items-center justify-center gap-6">
						{sentence ? (
							<TypingDisplay
								sentence={sentence}
								typingState={player.typingState}
								lastWrong={state.lastWrong}
							/>
						) : (
							<div className="text-gray-500 font-mono">読み込み中...</div>
						)}

						<CentralGauge
							progressToHeal={progressToHeal}
							healStreak={state.healStreak}
							streakColor={sc}
							speed={player.speed}
							combo={player.combo}
							comboColor={cc}
							{...(ghost ? { ghostSpeed: ghost.speed } : {})}
						/>

						<div className="flex gap-6 text-xs text-gray-600 font-mono">
							<span>
								正解{" "}
								<span className="text-green-400">{state.totalCorrect}</span>
							</span>
							<span>
								ミス <span className="text-red-400">{state.totalErrors}</span>
							</span>
							<span>
								精度 <span className="text-yellow-400">{acc}%</span>
							</span>
							<span className="text-gray-700">
								{Math.round(state.elapsed / 1000)}s
							</span>
						</div>
					</div>

					{showKeyboard && (
						<div className="border-t border-gray-900 pb-1 flex justify-center">
							<KeyboardDisplay keyStats={[]} highlight={nextKeys} />
						</div>
					)}

					<div
						className="flex items-center justify-between px-4 py-1.5 text-[10px] text-gray-700 font-mono"
						style={{ borderTop: "1px solid #111" }}
					>
						<span className="flex items-center gap-1.5">
							<kbd
								className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold"
								style={{
									background: "#222",
									border: "1px solid #444",
									color: "#aaa",
									boxShadow: "0 1px 0 #555",
								}}
							>
								ESC
							</kbd>
							<span>ゲーム終了</span>
						</span>
						<button
							type="button"
							onClick={onToggleKeyboard}
							className="hover:text-gray-400 transition-colors"
						>
							KB: {showKeyboard ? "表示" : "非表示"}
						</button>
						<span style={{ color: lc }}>HP {Math.round(lifePct)}%</span>
					</div>
				</div>

				{/* ── GHOST HP bar — right ── */}
				<div
					className="w-16 shrink-0 relative"
					style={{ background: "#080808" }}
				>
					<div className="absolute inset-0 flex flex-col justify-end">
						{ghost && (
							<div
								className="w-full transition-all duration-100"
								style={{
									height: `${ghostLifePct}%`,
									background: "#cc44ff",
									opacity: 0.45,
									boxShadow: "0 0 18px #cc44ff88",
								}}
							/>
						)}
					</div>
					<div className="absolute inset-0 flex items-center justify-center">
						<span
							className="text-[9px] font-mono uppercase tracking-widest select-none"
							style={{
								writingMode: "vertical-rl",
								color: "#cc44ff",
								opacity: ghost ? 0.75 : 0.2,
							}}
						>
							{ghost ? `ゴースト ${Math.round(ghostLifePct)}%` : "ゴーストなし"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
