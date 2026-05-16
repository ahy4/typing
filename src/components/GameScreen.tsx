import { type ReactNode, useEffect, useRef, useState } from "react";
import { LIFE_MAX, type RunnerState } from "../lib/runnerState";
import { CentralGauge } from "./CentralGauge";
import { KeyboardDisplay } from "./KeyboardDisplay";
import { TypingDisplay } from "./TypingDisplay";

interface Props {
	player: RunnerState;
	ghost: RunnerState | null;
	healStreak: number;
	lastHealId: number;
	lastHealAmount: number;
	totalCorrect: number;
	totalErrors: number;
	elapsed: number;
	lastWrong: boolean;
	showKeyboard: boolean;
	onToggleKeyboard: () => void;
	/** Optional header above the main area (e.g. replay banner). */
	header?: ReactNode;
	/** Replaces the right ghost HP bar (e.g. replay time bar). */
	rightPanel?: ReactNode;
	/** Replaces the default ESC/KB-toggle footer (e.g. replay seek controls). */
	footer?: ReactNode;
}

function lifeColor(pct: number): string {
	if (pct > 60) return "#00ffff";
	if (pct > 30) return "#ffaa00";
	return "#ff2244";
}

function healStreakColor(streak: number): string {
	if (streak >= 5) return "#ff44ff";
	if (streak >= 4) return "#ff8800";
	if (streak >= 3) return "#ffdd00";
	if (streak >= 2) return "#00ff66";
	if (streak >= 1) return "#00ffff";
	return "#333344";
}

const PARTICLES = [
	{ left: "8%", color: "#00ffff", duration: "8s", delay: "0s" },
	{ left: "22%", color: "#ff00aa", duration: "12s", delay: "2s" },
	{ left: "38%", color: "#ffee00", duration: "7s", delay: "1s" },
	{ left: "55%", color: "#00ffff", duration: "10s", delay: "3s" },
	{ left: "70%", color: "#ff00aa", duration: "9s", delay: "0.5s" },
	{ left: "85%", color: "#00ff66", duration: "11s", delay: "4s" },
	{ left: "15%", color: "#ff8800", duration: "13s", delay: "1.5s" },
	{ left: "50%", color: "#00ffff", duration: "6s", delay: "5s" },
];

export function GameScreen({
	player,
	ghost,
	healStreak,
	lastHealId,
	lastHealAmount,
	totalCorrect,
	totalErrors,
	elapsed,
	lastWrong,
	showKeyboard,
	onToggleKeyboard,
	header,
	rightPanel,
	footer,
}: Props) {
	const sentence = player.sentences[player.sentenceIdx];

	const lifePct = Math.max(0, Math.min(100, (player.life / LIFE_MAX) * 100));
	const lc = lifeColor(lifePct);
	const sc = healStreakColor(healStreak);

	const prevHealAt = player.nextHealAt - player.nextHealInterval;
	const progressToHeal =
		player.nextHealInterval > 0
			? Math.min(
					1,
					Math.max(0, (player.combo - prevHealAt) / player.nextHealInterval),
				)
			: 0;

	const prevHealIdRef = useRef(lastHealId);
	const [healAnim, setHealAnim] = useState<{
		id: number;
		amount: number;
	} | null>(null);
	useEffect(() => {
		if (lastHealId !== prevHealIdRef.current && lastHealAmount > 0) {
			prevHealIdRef.current = lastHealId;
			setHealAnim({ id: lastHealId, amount: lastHealAmount });
		}
	}, [lastHealId, lastHealAmount]);

	const ghostLifePct = ghost
		? Math.max(0, Math.min(100, (ghost.life / LIFE_MAX) * 100))
		: 0;
	const acc =
		totalCorrect + totalErrors > 0
			? Math.round((totalCorrect / (totalCorrect + totalErrors)) * 100)
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

	const elapsedSec = Math.round(elapsed / 1000);
	const mins = Math.floor(elapsedSec / 60);
	const secs = elapsedSec % 60;
	const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

	// Multi-lap combo bars: track heals completed in the current unbroken combo run
	const MAX_COMBO_BARS = 16;
	const [barBaseHealId, setBarBaseHealId] = useState(0);
	const prevComboForBarsRef = useRef(player.combo);
	useEffect(() => {
		if (player.combo === 0 && prevComboForBarsRef.current > 0) {
			setBarBaseHealId(lastHealId);
		}
		prevComboForBarsRef.current = player.combo;
	}, [player.combo, lastHealId]);
	const currentRunLaps = lastHealId - barBaseHealId;
	const comboPct = progressToHeal * 100;

	return (
		<div
			className="h-screen overflow-hidden flex flex-col"
			style={{ background: "var(--bg)", position: "relative" }}
		>
			{/* Floating particles */}
			<div
				style={{
					position: "fixed",
					inset: 0,
					overflow: "hidden",
					pointerEvents: "none",
					zIndex: 0,
				}}
			>
				{PARTICLES.map((p, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static list
						key={i}
						style={{
							position: "absolute",
							width: "2px",
							height: "2px",
							borderRadius: "50%",
							background: p.color,
							left: p.left,
							animation: `float ${p.duration} linear infinite`,
							animationDelay: p.delay,
						}}
					/>
				))}
			</div>

			{/* Optional header slot (e.g. replay banner) */}
			{header}

			{/* MAIN AREA */}
			<div
				className="flex flex-1 min-h-0"
				style={{ position: "relative", zIndex: 1 }}
			>
				{/* LEFT HP BAR — PLAYER */}
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
				<div
					className="flex-1 flex flex-col min-w-0"
					style={{ overflow: "hidden" }}
				>
					{/* Middle group: typing + shimmer + gauge — vertically centered together */}
					<div
						className="flex-1 flex flex-col items-center justify-center min-h-0"
						style={{ gap: "0px" }}
					>
						{/* Typing area */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								padding: "16px 32px",
								gap: "12px",
								width: "100%",
							}}
						>
							{sentence ? (
								<TypingDisplay
									sentence={sentence}
									typingState={player.typingState}
									lastWrong={lastWrong}
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

						{/* Multi-lap combo bars — MAX_COMBO_BARS slots pre-allocated to avoid layout shift */}
						<div
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "column",
								gap: "2px",
								padding: "0",
							}}
						>
							{Array.from({ length: MAX_COMBO_BARS }, (_, i) => {
								const isCompleted = i < currentRunLaps;
								const isCurrent = i === currentRunLaps;
								return (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: fixed-size decorative list
										key={i}
										style={{
											height: "4px",
											background:
												isCompleted || isCurrent ? "#1a0030" : "transparent",
											position: "relative",
											overflow: "hidden",
										}}
									>
										{isCompleted && (
											<div
												style={{
													height: "100%",
													width: "100%",
													background: `linear-gradient(90deg, ${sc}88, #00ff6688, #ffee0088, ${sc}88)`,
													backgroundSize: "200% 100%",
													animation: "comboShimmer 3s linear infinite",
												}}
											/>
										)}
										{isCurrent && (
											<div
												style={{
													height: "100%",
													width: `${comboPct}%`,
													background: `linear-gradient(90deg, ${sc}, #00ff66, #ffee00, ${sc})`,
													backgroundSize: "200% 100%",
													boxShadow: `0 0 8px ${sc}`,
													animation:
														player.combo > 0
															? "comboShimmer 2s linear infinite"
															: "none",
													transition: "width 0.08s",
												}}
											/>
										)}
									</div>
								);
							})}
						</div>

						{/* Central gauge + side stats */}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								padding: "12px 20px",
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
										{totalCorrect}
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
										{totalErrors}
									</div>
								</div>
							</div>

							{/* Central gauge with heal float overlay */}
							<div style={{ position: "relative" }}>
								<CentralGauge
									speed={player.speed}
									hitCount={totalCorrect}
									lastWrong={lastWrong}
									{...(ghost ? { ghostSpeed: ghost.speed } : {})}
								/>
								{healAnim && (
									<span
										key={healAnim.id}
										style={{
											position: "absolute",
											top: "4px",
											left: "50%",
											fontFamily: "'Press Start 2P', monospace",
											fontSize: "15px",
											color: sc,
											textShadow: `0 0 10px ${sc}, 0 0 20px ${sc}`,
											animation: "healFloat 1s ease-out forwards",
											pointerEvents: "none",
											whiteSpace: "nowrap",
										}}
										onAnimationEnd={() => setHealAnim(null)}
									>
										+{Math.round(healAnim.amount)} 回復
									</span>
								)}
							</div>

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
								<div
									style={{
										alignItems: "flex-end",
										display: "flex",
										flexDirection: "column",
									}}
								>
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
								<div
									style={{
										alignItems: "flex-end",
										display: "flex",
										flexDirection: "column",
									}}
								>
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
										{timeStr}
									</div>
								</div>
							</div>
						</div>

						{/* Sentence progress meter */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "5px",
								padding: "4px 32px 8px",
								width: "100%",
							}}
						>
							{/* Player progress */}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px",
									width: "100%",
									maxWidth: "320px",
								}}
							>
								<span
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "9px",
										color: "#00ffff",
										textShadow: "0 0 6px #00ffff",
										minWidth: "56px",
									}}
								>
									自分 {myProgress}
								</span>
								<div
									style={{
										flex: 1,
										height: "8px",
										background: "#1a0030",
										border: "1px solid #440088",
										overflow: "hidden",
									}}
								>
									<div
										style={{
											height: "100%",
											width: `${Math.min(100, myProgress * 5)}%`,
											background: "#00ffff",
											boxShadow: "0 0 8px #00ffff",
											transition: "width 0.3s",
										}}
									/>
								</div>
							</div>
							{/* Ghost progress */}
							{ghost && (
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
										width: "100%",
										maxWidth: "320px",
									}}
								>
									<span
										style={{
											fontFamily: "'Press Start 2P', monospace",
											fontSize: "9px",
											color: "#ff00aa",
											textShadow: "0 0 6px #ff00aa",
											minWidth: "56px",
										}}
									>
										GHO {ghostProgress}
									</span>
									<div
										style={{
											flex: 1,
											height: "8px",
											background: "#1a0030",
											border: "1px solid #440088",
											overflow: "hidden",
										}}
									>
										<div
											style={{
												height: "100%",
												width: `${Math.min(100, ghostProgress * 5)}%`,
												background: "#ff00aa",
												boxShadow: "0 0 8px #ff00aa",
												transition: "width 0.3s",
											}}
										/>
									</div>
								</div>
							)}
						</div>

						{/* Keyboard — inline below sentence meter */}
						{showKeyboard && (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									paddingBottom: "8px",
								}}
							>
								<KeyboardDisplay keyStats={[]} highlight={nextKeys} />
							</div>
						)}
					</div>
				</div>

				{/* RIGHT PANEL — ghost HP bar (default) or custom slot */}
				{rightPanel !== undefined ? (
					rightPanel
				) : (
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
								color: "#ff00aa",
								textShadow: "0 0 8px #ff00aa",
								opacity: ghost ? 1 : 0.3,
							}}
						>
							GHOST
						</div>
						<div
							style={{
								flex: 1,
								width: "52px",
								background: "#1a0030",
								border: `2px solid ${ghost ? "#ff00aa" : "#2a0050"}`,
								position: "relative",
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-end",
								overflow: "hidden",
							}}
						>
							{ghost && (
								<div
									style={{
										width: "100%",
										height: `${ghostLifePct}%`,
										background: "linear-gradient(to top, #660044, #ff00aa)",
										boxShadow:
											"0 0 16px #ff00aa, inset 0 0 16px rgba(255,0,170,0.3)",
										transition: "height 0.05s",
									}}
								/>
							)}
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
								color: "#ff00aa",
								textShadow: ghost ? "0 0 6px #ff00aa" : "none",
								opacity: ghost ? 1 : 0.3,
							}}
						>
							{ghost ? `${Math.round(ghostLifePct)}%` : "--"}
						</div>
					</div>
				)}
			</div>

			{/* FOOTER — default ESC/KB-toggle controls or custom slot */}
			{footer !== undefined ? (
				footer
			) : (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "32px",
						padding: "8px 20px",
						borderTop: "1px solid var(--border)",
						background: "rgba(13,0,26,0.9)",
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "11px",
						color: "#555",
						flexShrink: 0,
						position: "relative",
						zIndex: 1,
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<span
							style={{
								padding: "3px 8px",
								border: "1px solid #444",
								color: "#777",
							}}
						>
							ESC
						</span>
						<span style={{ color: "#777" }}>QUIT</span>
					</div>
					<button
						type="button"
						onClick={onToggleKeyboard}
						style={{
							background: "none",
							border: "1px solid #444",
							color: "#777",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "11px",
							padding: "3px 10px",
							cursor: "pointer",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = "#888";
							e.currentTarget.style.color = "#bbb";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = "#444";
							e.currentTarget.style.color = "#777";
						}}
					>
						KB: {showKeyboard ? "ON" : "OFF"}
					</button>
					<div style={{ color: lc, textShadow: `0 0 6px ${lc}` }}>
						HP: {Math.round(lifePct)}%
					</div>
				</div>
			)}
		</div>
	);
}
