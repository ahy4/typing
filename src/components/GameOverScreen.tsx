import { useState } from "react";
import type { SessionRecord } from "../lib/types";
import { ReplayPlayer } from "./ReplayPlayer";

interface Props {
	session: SessionRecord;
	onRestart: () => void;
	onStats: () => void;
}

const PARTICLES = [
	{ left: "10%", color: "#00ffff", duration: "8s", delay: "0s" },
	{ left: "30%", color: "#ff00aa", duration: "11s", delay: "1.5s" },
	{ left: "55%", color: "#ffee00", duration: "9s", delay: "0.5s" },
	{ left: "75%", color: "#00ff66", duration: "13s", delay: "3s" },
	{ left: "90%", color: "#ff00aa", duration: "7s", delay: "2s" },
];

export function GameOverScreen({ session, onStats }: Props) {
	const [showReplay, setShowReplay] = useState(false);

	if (showReplay) {
		return (
			<ReplayPlayer
				replay={session.replay}
				onClose={() => setShowReplay(false)}
			/>
		);
	}

	const acc = Math.round(session.accuracy * 100);
	const mins = Math.floor(session.duration / 60000);
	const secs = Math.floor((session.duration % 60000) / 1000);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				background: "var(--bg)",
				gap: "36px",
				userSelect: "none",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Particles */}
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

			{/* Title */}
			<div
				style={{
					fontFamily: "'Press Start 2P', monospace",
					fontSize: "22px",
					color: "#00ffcc",
					textShadow: "0 0 20px #00ffcc, 0 0 40px #00ffcc88",
					letterSpacing: "4px",
					position: "relative",
					zIndex: 1,
				}}
			>
				RESULT
			</div>

			{/* Results grid */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "24px 48px",
					textAlign: "center",
					position: "relative",
					zIndex: 1,
				}}
			>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "36px",
							color: "#00ffff",
							textShadow: "0 0 20px #00ffff88",
						}}
					>
						{session.wpm.toFixed(1)}
					</div>
					<div
						style={{
							fontSize: "8px",
							color: "#444",
							textTransform: "uppercase",
							letterSpacing: "2px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "8px",
						}}
					>
						打/秒
					</div>
				</div>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "36px",
							color: "#00ff66",
							textShadow: "0 0 20px #00ff6688",
						}}
					>
						{acc}%
					</div>
					<div
						style={{
							fontSize: "8px",
							color: "#444",
							textTransform: "uppercase",
							letterSpacing: "2px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "8px",
						}}
					>
						正確率
					</div>
				</div>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "26px",
							color: "#888",
						}}
					>
						{session.sentences}
					</div>
					<div
						style={{
							fontSize: "8px",
							color: "#444",
							textTransform: "uppercase",
							letterSpacing: "2px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "8px",
						}}
					>
						文章数
					</div>
				</div>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "26px",
							color: "#888",
						}}
					>
						{mins}:{secs.toString().padStart(2, "0")}
					</div>
					<div
						style={{
							fontSize: "8px",
							color: "#444",
							textTransform: "uppercase",
							letterSpacing: "2px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "8px",
						}}
					>
						タイム
					</div>
				</div>
			</div>

			{/* Separator */}
			<div
				style={{
					width: "300px",
					height: "1px",
					background:
						"linear-gradient(90deg, transparent, #2a0050, #00ffff44, #2a0050, transparent)",
					position: "relative",
					zIndex: 1,
				}}
			/>

			{/* Actions */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "12px",
					alignItems: "center",
					position: "relative",
					zIndex: 1,
				}}
			>
				<div
					style={{
						padding: "14px 40px",
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "12px",
						border: "2px solid #00ffff",
						color: "#00ffff",
						boxShadow: "0 0 16px #00ffff44",
						letterSpacing: "2px",
					}}
				>
					もう一度
				</div>
				<div
					style={{
						fontFamily: "'Share Tech Mono', monospace",
						fontSize: "11px",
						color: "#444",
						letterSpacing: "3px",
					}}
				>
					[ SPACE ] でもう一度
				</div>
				<div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
					<button
						type="button"
						onClick={() => setShowReplay(true)}
						style={{
							padding: "8px 20px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "8px",
							color: "#555",
							background: "none",
							border: "1px solid #2a0050",
							cursor: "pointer",
							letterSpacing: "1px",
							transition: "all 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = "#00ffff";
							e.currentTarget.style.borderColor = "#00ffff";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "#555";
							e.currentTarget.style.borderColor = "#2a0050";
						}}
					>
						リプレイ
					</button>
					<button
						type="button"
						onClick={onStats}
						style={{
							padding: "8px 20px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "8px",
							color: "#555",
							background: "none",
							border: "1px solid #2a0050",
							cursor: "pointer",
							letterSpacing: "1px",
							transition: "all 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = "#00ffff";
							e.currentTarget.style.borderColor = "#00ffff";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "#555";
							e.currentTarget.style.borderColor = "#2a0050";
						}}
					>
						統計
					</button>
				</div>
			</div>
		</div>
	);
}
