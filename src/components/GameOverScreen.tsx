import { useNavigate } from "react-router-dom";
import { encodeReplay } from "../lib/shareReplay";
import type { SessionRecord } from "../lib/types";

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
	const navigate = useNavigate();

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
				gap: "44px",
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
					fontSize: "32px",
					color: "#00ffcc",
					textShadow: "0 0 20px #00ffcc, 0 0 40px #00ffcc88",
					letterSpacing: "6px",
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
					gap: "32px 64px",
					textAlign: "center",
					position: "relative",
					zIndex: 1,
				}}
			>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "48px",
							color: "#00ffff",
							textShadow: "0 0 20px #00ffff88",
						}}
					>
						{session.wpm.toFixed(1)}
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "#999",
							textTransform: "uppercase",
							letterSpacing: "3px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "10px",
						}}
					>
						打/秒
					</div>
				</div>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "48px",
							color: "#00ff66",
							textShadow: "0 0 20px #00ff6688",
						}}
					>
						{acc}%
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "#999",
							textTransform: "uppercase",
							letterSpacing: "3px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "10px",
						}}
					>
						正確率
					</div>
				</div>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "36px",
							color: "#ccc",
						}}
					>
						{session.sentences}
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "#999",
							textTransform: "uppercase",
							letterSpacing: "3px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "10px",
						}}
					>
						文章数
					</div>
				</div>
				<div>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "36px",
							color: "#ccc",
						}}
					>
						{mins}:{secs.toString().padStart(2, "0")}
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "#999",
							textTransform: "uppercase",
							letterSpacing: "3px",
							fontFamily: "'Press Start 2P', monospace",
							marginTop: "10px",
						}}
					>
						タイム
					</div>
				</div>
			</div>

			{/* Separator */}
			<div
				style={{
					width: "400px",
					height: "1px",
					background:
						"linear-gradient(90deg, transparent, #6611cc, #00ffff88, #6611cc, transparent)",
					position: "relative",
					zIndex: 1,
				}}
			/>

			{/* Actions */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "16px",
					alignItems: "center",
					position: "relative",
					zIndex: 1,
				}}
			>
				<div
					style={{
						padding: "20px 56px",
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "16px",
						border: "2px solid #00ffff",
						color: "#00ffff",
						boxShadow: "0 0 16px #00ffff44",
						letterSpacing: "3px",
					}}
				>
					もう一度
				</div>
				<div
					style={{
						fontFamily: "'Share Tech Mono', monospace",
						fontSize: "16px",
						color: "#aaa",
						letterSpacing: "4px",
					}}
				>
					[ SPACE ] でもう一度
				</div>
				<div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
					<button
						type="button"
						onClick={async () => {
							const encoded = await encodeReplay(session.replay);
							navigate(`/replay?r=${encoded}`, {
								state: { from: "gameover" },
							});
						}}
						style={{
							padding: "14px 32px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "13px",
							color: "#aaa",
							background: "none",
							border: "1px solid #6611cc",
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
						リプレイ
					</button>
					<button
						type="button"
						onClick={onStats}
						style={{
							padding: "14px 32px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "13px",
							color: "#aaa",
							background: "none",
							border: "1px solid #6611cc",
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
						統計
					</button>
				</div>
			</div>
		</div>
	);
}
