import type { ReplayData, SessionRecord } from "../lib/types";

interface Props {
	sessions?: SessionRecord[];
	replay?: ReplayData;
}

const ROWS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
];

interface KeyData {
	count: number;
	errors: number;
	totalMs: number;
}

function aggregateFromSessions(
	sessions: SessionRecord[],
): Map<string, KeyData> {
	const combined = new Map<string, KeyData>();
	for (const s of sessions) {
		for (const ks of s.keyStats) {
			const existing = combined.get(ks.key) ?? {
				count: 0,
				errors: 0,
				totalMs: 0,
			};
			combined.set(ks.key, {
				count: existing.count + ks.count,
				errors: existing.errors + ks.errors,
				totalMs: existing.totalMs + ks.totalMs,
			});
		}
	}
	return combined;
}

function aggregateFromReplay(replay: ReplayData): Map<string, KeyData> {
	const combined = new Map<string, KeyData>();
	let lastCorrectTime = 0;
	let lastKeyTime = 0;

	for (const ev of replay.events) {
		const interval = lastKeyTime > 0 ? ev.time - lastKeyTime : 0;
		lastKeyTime = ev.time;

		const existing = combined.get(ev.key) ?? {
			count: 0,
			errors: 0,
			totalMs: 0,
		};
		if (!ev.correct) {
			combined.set(ev.key, {
				...existing,
				count: existing.count + 1,
				errors: existing.errors + 1,
			});
		} else {
			const correctInterval =
				lastCorrectTime > 0 ? ev.time - lastCorrectTime : interval;
			lastCorrectTime = ev.time;
			combined.set(ev.key, {
				count: existing.count + 1,
				errors: existing.errors,
				totalMs: existing.totalMs + correctInterval,
			});
		}
	}
	return combined;
}

function getColor(
	key: string,
	combined: Map<string, KeyData>,
	maxCount: number,
) {
	const d = combined.get(key);
	if (!d || d.count === 0)
		return { bg: "#151515", text: "#2a2a2a", border: "#1e1e1e" };

	const errRate = d.errors / d.count;
	const avgMs =
		d.count - d.errors > 0 ? d.totalMs / Math.max(d.count - d.errors, 1) : 500;
	// usage intensity 0..1
	const intensity = Math.min(1, d.count / Math.max(maxCount * 0.3, 1));

	if (errRate > 0.3) {
		const alpha = 0.5 + errRate * 0.5;
		return {
			bg: `rgba(220,40,40,${alpha.toFixed(2)})`,
			text: "#ffaaaa",
			border: `rgba(255,80,80,${(alpha * 0.8).toFixed(2)})`,
		};
	}
	if (errRate > 0.15) {
		return {
			bg: `rgba(200,120,20,${(0.3 + errRate * 0.8).toFixed(2)})`,
			text: "#ffdd88",
			border: "rgba(255,160,30,0.5)",
		};
	}

	// speed-based: fast = bright cyan/green, slow = dim blue
	const speedScore = Math.max(0, Math.min(1, 1 - avgMs / 600));
	const g = Math.round(180 + speedScore * 75);
	const b = Math.round(200 + speedScore * 55);
	const bgAlpha = 0.15 + intensity * 0.55 + speedScore * 0.25;
	const textAlpha = 0.5 + speedScore * 0.5;
	return {
		bg: `rgba(0,${g},${b},${bgAlpha.toFixed(2)})`,
		text: `rgba(80,${g + 30},255,${textAlpha.toFixed(2)})`,
		border: `rgba(0,${g},${b},${(bgAlpha * 0.7 + 0.1).toFixed(2)})`,
	};
}

function tooltip(key: string, combined: Map<string, KeyData>) {
	const d = combined.get(key);
	if (!d || d.count === 0) return key;
	const correctCount = d.count - d.errors;
	const avg = correctCount > 0 ? Math.round(d.totalMs / correctCount) : 0;
	const errPct = Math.round((d.errors / d.count) * 100);
	return `${key}: ${d.count}回, エラー率${errPct}%, 平均${avg}ms`;
}

export function HeatmapView({ sessions, replay }: Props) {
	const combined = replay
		? aggregateFromReplay(replay)
		: aggregateFromSessions(sessions ?? []);

	const maxCount = Math.max(
		1,
		...Array.from(combined.values()).map((d) => d.count),
	);

	const isEmpty = replay
		? replay.events.length === 0
		: (sessions ?? []).length === 0;

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-sm uppercase tracking-widest text-gray-500">
				{replay ? "キーヒートマップ — このリプレイ" : "キーヒートマップ — 全セッション"}
			</h3>

			<div className="flex flex-col items-center gap-1.5">
				{ROWS.map((row, ri) => (
					<div key={row[0] ?? ri} className="flex gap-1.5">
						{ri === 1 && <div style={{ width: "22px" }} />}
						{ri === 2 && <div style={{ width: "44px" }} />}
						{row.map((key) => {
							const { bg, text, border } = getColor(key, combined, maxCount);
							const d = combined.get(key);
							const correctCount = d ? d.count - d.errors : 0;
							const errPct =
								d && d.count > 0
									? Math.round((d.errors / d.count) * 100)
									: null;
							const avgMs =
								d && correctCount > 0
									? Math.round(d.totalMs / correctCount)
									: null;
							return (
								<div
									key={key}
									title={tooltip(key, combined)}
									className="w-12 h-12 flex flex-col items-center justify-center rounded text-sm font-mono font-bold cursor-default gap-0"
									style={{
										background: bg,
										color: text,
										border: `1px solid ${border}`,
									}}
								>
									<span className="text-base leading-none">{key}</span>
									{errPct !== null && errPct > 0 && (
										<span
											className="text-[8px] leading-tight mt-0.5"
											style={{
												color:
													errPct > 30
														? "#ffaaaa"
														: errPct > 15
															? "#ffdd88"
															: "#aaa",
												opacity: 0.85,
											}}
										>
											{errPct}%
										</span>
									)}
									{avgMs !== null && (errPct === null || errPct <= 15) && (
										<span className="text-[8px] leading-tight mt-0.5 text-gray-400 opacity-70">
											{avgMs}ms
										</span>
									)}
								</div>
							);
						})}
					</div>
				))}
			</div>

			{/* Legend */}
			<div
				className="mt-2 p-3 rounded border border-gray-800 flex flex-wrap gap-4 text-xs font-mono"
				style={{ background: "#0a0a0a" }}
			>
				<div className="flex items-center gap-2">
					<div
						className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
						style={{
							background: "rgba(220,40,40,0.85)",
							color: "#ffaaaa",
							border: "1px solid rgba(255,80,80,0.6)",
						}}
					>
						a
					</div>
					<span style={{ color: "#ff8888" }}>エラー多 (30%+)</span>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
						style={{
							background: "rgba(200,120,20,0.6)",
							color: "#ffdd88",
							border: "1px solid rgba(255,160,30,0.5)",
						}}
					>
						a
					</div>
					<span style={{ color: "#ffdd88" }}>エラーやや多 (15-30%)</span>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
						style={{
							background: "rgba(0,240,255,0.65)",
							color: "rgba(80,255,255,0.95)",
							border: "1px solid rgba(0,240,255,0.5)",
						}}
					>
						a
					</div>
					<span style={{ color: "#00ffee" }}>速い (&lt;150ms)</span>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
						style={{
							background: "rgba(0,140,170,0.25)",
							color: "rgba(80,200,255,0.55)",
							border: "1px solid rgba(0,140,170,0.3)",
						}}
					>
						a
					</div>
					<span style={{ color: "#6699bb" }}>遅い (&gt;400ms)</span>
				</div>
			</div>

			{isEmpty && (
				<p className="text-gray-600 text-sm text-center">
					まだデータがありません。ゲームをプレイしてください。
				</p>
			)}
		</div>
	);
}
