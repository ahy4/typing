const PARTICLES = [
	{ left: "8%", color: "#00ffff", duration: "8s", delay: "0s" },
	{ left: "22%", color: "#ff00aa", duration: "12s", delay: "2s" },
	{ left: "38%", color: "#ffee00", duration: "7s", delay: "1s" },
	{ left: "55%", color: "#00ffff", duration: "10s", delay: "3s" },
	{ left: "70%", color: "#ff00aa", duration: "9s", delay: "0.5s" },
	{ left: "85%", color: "#00ff66", duration: "11s", delay: "4s" },
];

interface Props {
	onStart: () => void;
	onStats: () => void;
	onHelp: () => void;
	bestWpm: number;
	sessionCount: number;
}

export function IdleScreen({ onStats, onHelp, bestWpm, sessionCount }: Props) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				background: "var(--bg)",
				gap: "52px",
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

			{/* Logo */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "16px",
					position: "relative",
					zIndex: 1,
				}}
			>
				<div
					style={{
						fontFamily: "'Press Start 2P', monospace",
						fontSize: "42px",
						color: "#00ffff",
						textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff",
						letterSpacing: "6px",
						animation: "neonPulse 3s ease-in-out infinite",
					}}
				>
					{"TYPE//DARK"}
				</div>
				<div
					style={{
						color: "#444",
						fontSize: "13px",
						letterSpacing: "5px",
						textTransform: "uppercase",
						fontFamily: "'Share Tech Mono', monospace",
					}}
				>
					ローマ字タイピング · 統計 · ゴースト
				</div>
			</div>

			{/* Stats preview */}
			{sessionCount > 0 && (
				<div
					style={{
						display: "flex",
						gap: "56px",
						textAlign: "center",
						position: "relative",
						zIndex: 1,
					}}
				>
					<div>
						<div
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "40px",
								color: "#00ffff",
								textShadow: "0 0 16px #00ffff",
							}}
						>
							{bestWpm.toFixed(1)}
						</div>
						<div
							style={{
								fontSize: "10px",
								color: "#444",
								textTransform: "uppercase",
								letterSpacing: "3px",
								fontFamily: "'Press Start 2P', monospace",
								marginTop: "10px",
							}}
						>
							最高打/秒
						</div>
					</div>
					<div>
						<div
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "40px",
								color: "#888",
							}}
						>
							{sessionCount}
						</div>
						<div
							style={{
								fontSize: "10px",
								color: "#444",
								textTransform: "uppercase",
								letterSpacing: "3px",
								fontFamily: "'Press Start 2P', monospace",
								marginTop: "10px",
							}}
						>
							回数
						</div>
					</div>
				</div>
			)}

			{/* Actions */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
					alignItems: "center",
					position: "relative",
					zIndex: 1,
				}}
			>
				<div
					style={{
						padding: "28px 64px",
						fontFamily: "'Press Start 2P', monospace",
						border: "2px solid #00ffff",
						color: "#00ffff",
						background: "transparent",
						boxShadow:
							"0 0 20px #00ffff44, inset 0 0 20px rgba(0,255,255,0.05)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "14px",
					}}
				>
					<span style={{ fontSize: "18px", letterSpacing: "4px" }}>
						ゲームスタート
					</span>
					<span
						style={{
							fontSize: "10px",
							letterSpacing: "3px",
							opacity: 0.6,
							color: "#88ffff",
						}}
					>
						[ SPACE ] を押してスタート
					</span>
				</div>
				<div style={{ display: "flex", gap: "16px" }}>
					<button
						type="button"
						onClick={onStats}
						style={{
							padding: "12px 32px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "11px",
							color: "#555",
							background: "none",
							border: "1px solid #2a0050",
							cursor: "pointer",
							letterSpacing: "2px",
							transition: "all 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = "#00ffff";
							e.currentTarget.style.borderColor = "#00ffff";
							e.currentTarget.style.boxShadow = "0 0 8px #00ffff44";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "#555";
							e.currentTarget.style.borderColor = "#2a0050";
							e.currentTarget.style.boxShadow = "none";
						}}
					>
						統計
					</button>
					<button
						type="button"
						onClick={onHelp}
						style={{
							padding: "12px 32px",
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "11px",
							color: "#555",
							background: "none",
							border: "1px solid #2a0050",
							cursor: "pointer",
							letterSpacing: "2px",
							transition: "all 0.15s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = "#00ffff";
							e.currentTarget.style.borderColor = "#00ffff";
							e.currentTarget.style.boxShadow = "0 0 8px #00ffff44";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "#555";
							e.currentTarget.style.borderColor = "#2a0050";
							e.currentTarget.style.boxShadow = "none";
						}}
					>
						遊び方
					</button>
				</div>
			</div>

			<div
				style={{
					position: "absolute",
					bottom: "16px",
					fontFamily: "'Press Start 2P', monospace",
					fontSize: "8px",
					color: "#2a0050",
					zIndex: 1,
					letterSpacing: "2px",
				}}
			>
				NEON ARCADE
			</div>
		</div>
	);
}
