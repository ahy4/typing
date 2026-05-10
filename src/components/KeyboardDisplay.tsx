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

	function getKeyColor(key: string): string {
		const s = statsMap.get(key);
		if (!s || s.count === 0) return "#1a1a1a";
		const errRate = s.errors / s.count;
		const avgMs = s.totalMs / s.count;
		if (errRate > 0.2) return `rgba(255,50,50,${0.3 + errRate * 0.5})`;
		const speed = Math.max(0, 1 - avgMs / 400);
		return `rgba(0,${Math.round(150 + speed * 100)},${Math.round(200 + speed * 55)},${0.2 + speed * 0.5})`;
	}

	return (
		<div className="flex flex-col items-center gap-1.5 py-2">
			{ROWS.map((row, ri) => (
				<div key={ri} className="flex gap-1">
					{ri === 1 && <div style={{ width: "16px" }} />}
					{ri === 2 && <div style={{ width: "32px" }} />}
					{row.map((key) => {
						const isHighlight = highlightSet.has(key);
						return (
							<div
								key={key}
								className="w-8 h-8 flex items-center justify-center rounded text-xs font-mono font-bold border transition-all duration-150"
								style={{
									background: isHighlight ? "#00ffff33" : getKeyColor(key),
									borderColor: isHighlight ? "#00ffff" : "#2a2a2a",
									color: isHighlight ? "#00ffff" : "#888",
									boxShadow: isHighlight ? "0 0 8px #00ffff88" : "none",
									transform: isHighlight ? "scale(1.15)" : "scale(1)",
								}}
							>
								{key}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
