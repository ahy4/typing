import type { KeyStats } from "../lib/types";

interface Props {
	keyStats: KeyStats[];
	highlight?: string[];
}

const ROWS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
];

export function KeyboardDisplay({ keyStats, highlight = [] }: Props) {
	const statsMap = new Map(keyStats.map((k) => [k.key, k]));
	const highlightSet = new Set(highlight);

	function getKeyStyle(key: string): React.CSSProperties {
		const isHighlight = highlightSet.has(key);
		const s = statsMap.get(key);

		if (isHighlight) {
			return {
				background: "rgba(0,255,255,0.1)",
				borderColor: "#00ffff",
				color: "#00ffff",
				boxShadow: "0 0 12px #00ffff, inset 0 0 8px rgba(0,255,255,0.2)",
				animation: "keyBounce 0.15s ease-out",
			};
		}

		if (s && s.count > 0) {
			const errRate = s.errors / s.count;
			const avgMs = s.totalMs / s.count;
			if (errRate > 0.2) {
				return {
					background: "rgba(255,34,68,0.08)",
					borderColor: "#ff2244",
					color: "#ff2244",
					boxShadow: "0 0 6px #ff2244",
				};
			}
			const speed = Math.max(0, 1 - avgMs / 400);
			if (speed > 0.5) {
				return {
					background: "rgba(255,136,0,0.06)",
					borderColor: "#ff8800",
					color: "#ff8800",
				};
			}
		}

		return {
			background: "#0d001a",
			borderColor: "#2a0050",
			color: "#444",
		};
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "4px",
				padding: "10px 16px",
			}}
		>
			{ROWS.map((row, ri) => (
				<div
					key={row[0] ?? ri}
					style={{ display: "flex", gap: "4px" }}
				>
					{ri === 1 && <div style={{ width: "16px" }} />}
					{ri === 2 && <div style={{ width: "32px" }} />}
					{row.map((key) => {
						const keyStyle = getKeyStyle(key);
						return (
							<div
								key={key}
								style={{
									width: "32px",
									height: "30px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "10px",
									fontFamily: "'Press Start 2P', monospace",
									border: "1px solid",
									transition: "all 0.1s",
									...keyStyle,
								}}
							>
								{key.toUpperCase()}
							</div>
						);
					})}
				</div>
			))}
			{/* Space bar row */}
			<div style={{ display: "flex", gap: "4px", marginTop: "0" }}>
				<div
					style={{
						width: "160px",
						height: "30px",
						background: "#0d001a",
						border: "1px solid #2a0050",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "9px",
						fontFamily: "'Press Start 2P', monospace",
						color: "#222",
					}}
				>
					SPACE
				</div>
			</div>
		</div>
	);
}
