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
	if (life > 60) return "#00ffff";
	if (life > 30) return "#ffaa00";
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

function comboColor(combo: number): string {
	const colors = [
		"#00ffff",
		"#00ff66",
		"#ffaa00",
		"#ff6600",
		"#ff3366",
		"#cc00ff",
	];
	return colors[Math.floor(combo / 30) % colors.length] ?? "#00ffff";
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

	const elapsedSec = Math.round(state.elapsed / 1000);
	const mins = Math.floor(elapsedSec / 60);
	const secs = elapsedSec % 60;
	const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

	// Combo gauge fill pct (cycles per 100 combo)
	const comboMilestone = 100;
	const comboPct =
		player.combo === 0
			? 0
			: ((player.combo % comboMilestone) / comboMilestone) * 100 || 100;
	const comboLevel = Math.floor(player.combo / comboMilestone);
	const comboLevelColors = [
		"#00ffff",
		"#00ff66",
		"#ffaa00",
		"#ff6600",
		"#ff3366",
		"#cc00ff",
	];
	const comboBgColor =
		comboLevelColors[comboLevel % comboLevelColors.length] ?? "#00ffff";

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

			{/* HEADER */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "8px 16px",
					borderBottom: "2px solid #ff00aa",
					boxShadow: "0 0 20px #ff00aa, 0 0 40px rgba(255,0,170,0.3)",
					background: "rgba(13,0,26,0.9)",
					position: "relative",
					zIndex: 1,
					flexShrink: 0,
				}}
			>
				{/* Logo */}
				<div
					style={{
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "13px",
						color: "#00ffff",
						textShadow:
							"0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff",
						letterSpacing: "3px",
					}}
				>
					TYPE//DARK
				</div>

				{/* Progress battle */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						fontSize: "10px",
					}}
				>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "9px",
							color: "#00ffff",
							textShadow: "0 0 6px #00ffff",
						}}
					>
						自分 {myProgress}
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
						<div
							style={{
								width: "120px",
								height: "7px",
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
						<div
							style={{
								width: "120px",
								height: "7px",
								background: "#1a0030",
								border: "1px solid #440088",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									height: "100%",
									width: ghost ? `${Math.min(100, ghostProgress * 5)}%` : "0%",
									background: "#ff00aa",
									boxShadow: "0 0 8px #ff00aa",
									transition: "width 0.3s",
									opacity: ghost ? 1 : 0.3,
								}}
							/>
						</div>
					</div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "9px",
							color: "#ff00aa",
							textShadow: "0 0 6px #ff00aa",
							opacity: ghost ? 1 : 0.35,
						}}
					>
						GHO {ghostProgress}
					</div>
				</div>

				{/* Header stats */}
				<div
					style={{
						display: "flex",
						gap: "18px",
						fontSize: "10px",
						color: "#666",
					}}
				>
					<span>
						正解{" "}
						<span
							style={{ color: "#ffee00", textShadow: "0 0 8px #ffee00" }}
						>
							{state.totalCorrect}
						</span>
					</span>
					<span>
						ミス{" "}
						<span style={{ color: "#ff2244", textShadow: "0 0 8px #ff2244" }}>
							{state.totalErrors}
						</span>
					</span>
					<span>
						精度{" "}
						<span
							style={{ color: "#ffee00", textShadow: "0 0 8px #ffee00" }}
						>
							{acc}%
						</span>
					</span>
					<span>
						TIME{" "}
						<span
							style={{ color: "#ffee00", textShadow: "0 0 8px #ffee00" }}
						>
							{timeStr}
						</span>
					</span>
				</div>
			</div>

			{/* MAIN AREA */}
			<div
				className="flex flex-1 min-h-0"
				style={{ position: "relative", zIndex: 1 }}
			>
				{/* LEFT HP BAR — PLAYER */}
				<div
					style={{
						width: "64px",
						flexShrink: 0,
						background: "var(--panel)",
						borderRight: "1px solid var(--border)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "16px 8px",
						gap: "8px",
						position: "relative",
					}}
				>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "7px",
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
							width: "20px",
							background: "#1a0030",
							border: `1px solid ${lc}`,
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
								boxShadow: `0 0 12px ${lc}, inset 0 0 12px ${lc}33`,
								transition: "height 0.1s",
							}}
						/>
						{/* Tick marks */}
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
									background: "rgba(255,255,255,0.08)",
								}}
							/>
						))}
					</div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "8px",
							color: lc,
						}}
					>
						{Math.round(lifePct)}%
					</div>

					{/* Heal animation */}
					{healAnim && (
						<>
							<div
								key={`flash-${healAnim.id}`}
								style={{
									position: "absolute",
									inset: 0,
									background: sc,
									animation: "healFlash 0.4s ease-out forwards",
									pointerEvents: "none",
								}}
							/>
							<span
								key={healAnim.id}
								style={{
									position: "absolute",
									bottom: `${lifePct}%`,
									left: "50%",
									fontSize: "12px",
									fontFamily: "'Press Start 2P', monospace",
									color: sc,
									textShadow: `0 0 10px ${sc}, 0 0 20px ${sc}`,
									animation: "healFloat 1s ease-out forwards",
									pointerEvents: "none",
								}}
								onAnimationEnd={() => setHealAnim(null)}
							>
								+{Math.round(healAnim.amount)}
							</span>
						</>
					)}
				</div>

				{/* CENTER */}
				<div
					className="flex-1 flex flex-col min-w-0"
					style={{ overflow: "hidden" }}
				>
					{/* Typing area */}
					<div
						className="flex-1 flex flex-col items-center justify-center"
						style={{ padding: "16px 24px", gap: "16px" }}
					>
						{sentence ? (
							<TypingDisplay
								sentence={sentence}
								typingState={player.typingState}
								lastWrong={state.lastWrong}
							/>
						) : (
							<div
								style={{
									color: "#666",
									fontFamily: "'Share Tech Mono', monospace",
								}}
							>
								読み込み中...
							</div>
						)}
					</div>

					{/* Combo gauge — thin shimmer bar */}
					<div
						style={{
							height: "3px",
							background: "#1a0030",
							position: "relative",
							overflow: "hidden",
						}}
					>
						<div
							style={{
								height: "100%",
								width: `${comboPct}%`,
								background: `linear-gradient(90deg, ${comboBgColor}, #00ff66, #ffee00, ${comboBgColor})`,
								backgroundSize: "200% 100%",
								boxShadow: `0 0 8px ${comboBgColor}`,
								animation: player.combo > 0 ? "comboShimmer 2s linear infinite" : "none",
								transition: "width 0.1s",
							}}
						/>
					</div>

					{/* Central gauge + side stats */}
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: "8px 16px",
							gap: "24px",
						}}
					>
						{/* Left side stats */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "14px",
								minWidth: "100px",
							}}
						>
							<div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "8px",
										color: "#444",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "3px",
									}}
								>
									CORRECT
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "16px",
										color: "#00ff66",
										textShadow: "0 0 8px #00ff66",
									}}
								>
									{state.totalCorrect}
								</div>
							</div>
							<div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "8px",
										color: "#444",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "3px",
									}}
								>
									MISS
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "16px",
										color: "#ff2244",
										textShadow: "0 0 8px #ff2244",
									}}
								>
									{state.totalErrors}
								</div>
							</div>
						</div>

						{/* Central gauge */}
						<CentralGauge
							progressToHeal={progressToHeal}
							healStreak={state.healStreak}
							streakColor={sc}
							speed={player.speed}
							combo={player.combo}
							comboColor={cc}
							hitCount={state.totalCorrect}
							lastWrong={state.lastWrong}
							{...(ghost ? { ghostSpeed: ghost.speed } : {})}
						/>

						{/* Right side stats */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "14px",
								minWidth: "100px",
								alignItems: "flex-end",
							}}
						>
							<div style={{ alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "8px",
										color: "#444",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "3px",
									}}
								>
									ACCURACY
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "16px",
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
										fontSize: "8px",
										color: "#444",
										textTransform: "uppercase",
										letterSpacing: "2px",
										marginBottom: "3px",
									}}
								>
									TIME
								</div>
								<div
									style={{
										fontFamily: "'Press Start 2P', monospace",
										fontSize: "16px",
										color: "#888",
									}}
								>
									{timeStr}
								</div>
							</div>
						</div>
					</div>

					{/* Keyboard */}
					{showKeyboard && (
						<div
							style={{
								borderTop: "1px solid var(--border)",
								background: "rgba(0,0,0,0.5)",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<KeyboardDisplay keyStats={[]} highlight={nextKeys} />
						</div>
					)}
				</div>

				{/* RIGHT HP BAR — GHOST */}
				<div
					style={{
						width: "64px",
						flexShrink: 0,
						background: "var(--panel)",
						borderLeft: "1px solid var(--border)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "16px 8px",
						gap: "8px",
					}}
				>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "7px",
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
							width: "20px",
							background: "#1a0030",
							border: `1px solid ${ghost ? "#ff00aa" : "#2a0050"}`,
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
									background:
										"linear-gradient(to top, #660044, #ff00aa)",
									boxShadow:
										"0 0 12px #ff00aa, inset 0 0 12px rgba(255,0,170,0.3)",
									transition: "height 0.1s",
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
									background: "rgba(255,255,255,0.08)",
								}}
							/>
						))}
					</div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "8px",
							color: "#ff00aa",
							opacity: ghost ? 1 : 0.3,
						}}
					>
						{ghost ? `${Math.round(ghostLifePct)}%` : "--"}
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "5px 16px",
					borderTop: "1px solid var(--border)",
					background: "rgba(13,0,26,0.9)",
					fontFamily: "'Press Start 2P', monospace",
					fontSize: "9px",
					color: "#333",
					flexShrink: 0,
					position: "relative",
					zIndex: 1,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<span
						style={{
							padding: "2px 6px",
							border: "1px solid #333",
							color: "#555",
						}}
					>
						ESC
					</span>
					<span>QUIT</span>
				</div>
				<button
					type="button"
					onClick={onToggleKeyboard}
					style={{
						background: "none",
						border: "1px solid #333",
						color: "#555",
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "9px",
						padding: "2px 8px",
						cursor: "pointer",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.borderColor = "#666";
						e.currentTarget.style.color = "#aaa";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.borderColor = "#333";
						e.currentTarget.style.color = "#555";
					}}
				>
					KB: {showKeyboard ? "ON" : "OFF"}
				</button>
				<div style={{ color: lc, textShadow: `0 0 6px ${lc}` }}>
					HP: {Math.round(lifePct)}%
				</div>
			</div>
		</div>
	);
}
