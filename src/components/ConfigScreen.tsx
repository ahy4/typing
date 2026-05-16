import type { Difficulty, GameConfig } from "../lib/types";

interface Props {
	config: GameConfig;
	onChange: (config: GameConfig) => void;
	onBack: () => void;
}

const DIFF_LABELS: Record<Difficulty, string> = {
	easy: "かんたん",
	normal: "ふつう",
	hard: "むずかしい",
};

const DIFFICULTIES: Difficulty[] = ["easy", "normal", "hard"];

const btnBase: React.CSSProperties = {
	padding: "10px 24px",
	fontFamily: "'Press Start 2P', monospace",
	fontSize: "10px",
	cursor: "pointer",
	letterSpacing: "1px",
	transition: "all 0.15s",
	border: "1px solid #7a30c0",
	background: "none",
	color: "#bbb",
};

const btnActive: React.CSSProperties = {
	...btnBase,
	border: "1px solid #00ffff",
	color: "#00ffff",
	boxShadow: "0 0 10px #00ffff44",
};

export function ConfigScreen({ config, onChange, onBack }: Props) {
	const volumePct = Math.round(config.volume * 100);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				background: "var(--bg)",
				gap: "48px",
				userSelect: "none",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Title */}
			<div
				style={{
					fontFamily: "'Press Start 2P', monospace",
					fontSize: "20px",
					color: "#c084fc",
					letterSpacing: "6px",
					textShadow: "0 0 16px #c084fc88",
				}}
			>
				⚙ コンフィグ
			</div>

			{/* Settings panel */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "40px",
					width: "480px",
					padding: "40px 48px",
					border: "1px solid #6a20a0",
					background: "var(--panel)",
					boxShadow: "0 0 30px #6a20a022",
				}}
			>
				{/* Volume */}
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							color: "#aaa",
							letterSpacing: "3px",
						}}
					>
						音量
					</div>
					<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
						<input
							type="range"
							min={0}
							max={100}
							value={volumePct}
							onChange={(e) =>
								onChange({
									...config,
									volume: Number(e.target.value) / 100,
								})
							}
							style={{
								flex: 1,
								accentColor: "#00ffff",
								cursor: "pointer",
								height: "4px",
							}}
						/>
						<span
							style={{
								fontFamily: "'Press Start 2P', monospace",
								fontSize: "11px",
								color: "#00ffff",
								minWidth: "40px",
								textAlign: "right",
							}}
						>
							{volumePct}%
						</span>
					</div>
				</div>

				{/* Difficulty */}
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							color: "#aaa",
							letterSpacing: "3px",
						}}
					>
						難易度
					</div>
					<div style={{ display: "flex", gap: "8px" }}>
						{DIFFICULTIES.map((d) => (
							<button
								key={d}
								type="button"
								onClick={() => onChange({ ...config, difficulty: d })}
								style={config.difficulty === d ? btnActive : btnBase}
								onMouseEnter={(e) => {
									if (config.difficulty !== d) {
										e.currentTarget.style.color = "#c084fc";
										e.currentTarget.style.borderColor = "#c084fc";
									}
								}}
								onMouseLeave={(e) => {
									if (config.difficulty !== d) {
										e.currentTarget.style.color = "#bbb";
										e.currentTarget.style.borderColor = "#7a30c0";
									}
								}}
							>
								{DIFF_LABELS[d]}
							</button>
						))}
					</div>
				</div>

				{/* Ghost */}
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					<div
						style={{
							fontFamily: "'Press Start 2P', monospace",
							fontSize: "10px",
							color: "#aaa",
							letterSpacing: "3px",
						}}
					>
						ゴースト対戦
					</div>
					<div style={{ display: "flex", gap: "8px" }}>
						{([true, false] as const).map((val) => (
							<button
								key={String(val)}
								type="button"
								onClick={() => onChange({ ...config, showGhost: val })}
								style={config.showGhost === val ? btnActive : btnBase}
								onMouseEnter={(e) => {
									if (config.showGhost !== val) {
										e.currentTarget.style.color = "#c084fc";
										e.currentTarget.style.borderColor = "#c084fc";
									}
								}}
								onMouseLeave={(e) => {
									if (config.showGhost !== val) {
										e.currentTarget.style.color = "#bbb";
										e.currentTarget.style.borderColor = "#7a30c0";
									}
								}}
							>
								{val ? "ON" : "OFF"}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Back */}
			<button
				type="button"
				onClick={onBack}
				style={{
					padding: "12px 40px",
					fontFamily: "'Press Start 2P', monospace",
					fontSize: "11px",
					color: "#bbb",
					background: "none",
					border: "1px solid #7a30c0",
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
					e.currentTarget.style.color = "#bbb";
					e.currentTarget.style.borderColor = "#7a30c0";
					e.currentTarget.style.boxShadow = "none";
				}}
			>
				← もどる
			</button>
		</div>
	);
}
