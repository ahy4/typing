import type { SessionRecord } from "../lib/types";

interface Props {
	sessions: SessionRecord[];
}

const VW = 900;
const BAR_VH = 130;
const PAD_L = 60;
const PAD_R = 8;
const PAD_T = 10;
const PAD_B = 8;
const MAX_SESSIONS = 30;

interface MetricDef {
	getValue: (s: SessionRecord) => number;
	label: string;
	unit: string;
	color: string;
	fmt: (v: number) => string;
}

const METRICS: MetricDef[] = [
	{
		getValue: (s) => s.wpm,
		label: "打/秒",
		unit: "打/秒",
		color: "#00ffff",
		fmt: (v) => v.toFixed(1),
	},
	{
		getValue: (s) => s.duration,
		label: "継続時間",
		unit: "秒",
		color: "#00ff66",
		fmt: (v) => String(Math.round(v)),
	},
	{
		getValue: (s) => s.accuracy * 100,
		label: "精度",
		unit: "%",
		color: "#ffee00",
		fmt: (v) => `${Math.round(v)}`,
	},
];

function BarChart({
	sessions,
	metric,
	showXAxis,
}: {
	sessions: SessionRecord[];
	metric: MetricDef;
	showXAxis: boolean;
}) {
	const { getValue, label, unit, color, fmt } = metric;
	const values = sessions.map(getValue);
	const rawMax = Math.max(...values, 0.001);
	const maxVal = rawMax * 1.05;
	const n = sessions.length;
	const barAreaW = VW - PAD_L - PAD_R;
	const barAreaH = BAR_VH - PAD_T - PAD_B;
	const slotW = barAreaW / n;
	const barW = Math.max(2, slotW - 3);
	const xAxisH = showXAxis ? 28 : 0;
	const totalH = BAR_VH + xAxisH;

	const xLabels: { i: number; text: string }[] = [];
	if (showXAxis && n > 0) {
		const step = Math.max(1, Math.floor(n / 7));
		for (let i = 0; i < n; i += step) {
			const d = new Date(sessions[i]?.timestamp ?? 0);
			xLabels.push({
				i,
				text: `${d.getMonth() + 1}/${d.getDate()}`,
			});
		}
		const last = sessions[n - 1];
		if (
			last &&
			(xLabels.length === 0 || xLabels[xLabels.length - 1]?.i !== n - 1)
		) {
			const d = new Date(last.timestamp);
			xLabels.push({ i: n - 1, text: `${d.getMonth() + 1}/${d.getDate()}` });
		}
	}

	return (
		<div style={{ marginBottom: showXAxis ? "0" : "4px" }}>
			<svg
				viewBox={`0 0 ${VW} ${totalH}`}
				style={{ width: "100%", display: "block" }}
				aria-label={`${label} bar chart`}
			>
				{/* grid lines */}
				{[0.25, 0.5, 0.75, 1.0].map((t) => {
					const y = PAD_T + barAreaH * (1 - t);
					return (
						<line
							key={t}
							x1={PAD_L}
							x2={VW - PAD_R}
							y1={y}
							y2={y}
							stroke="#1a1a2e"
							strokeWidth="1"
						/>
					);
				})}

				{/* y-axis */}
				<line
					x1={PAD_L}
					y1={PAD_T}
					x2={PAD_L}
					y2={PAD_T + barAreaH}
					stroke="#444"
					strokeWidth="1"
				/>

				{/* baseline */}
				<line
					x1={PAD_L}
					y1={PAD_T + barAreaH}
					x2={VW - PAD_R}
					y2={PAD_T + barAreaH}
					stroke="#444"
					strokeWidth="1"
				/>

				{/* max value label */}
				<text
					x={PAD_L - 6}
					y={PAD_T + 4}
					fill="#666"
					fontSize="11"
					fontFamily="monospace"
					textAnchor="end"
				>
					{fmt(rawMax)}
				</text>

				{/* 0 label */}
				<text
					x={PAD_L - 6}
					y={PAD_T + barAreaH}
					fill="#555"
					fontSize="11"
					fontFamily="monospace"
					textAnchor="end"
					dominantBaseline="auto"
				>
					0
				</text>

				{/* y-axis label (rotated) */}
				<text
					x={12}
					y={PAD_T + barAreaH / 2}
					fill={color}
					fontSize="10"
					fontFamily="monospace"
					textAnchor="middle"
					dominantBaseline="middle"
					transform={`rotate(-90, 12, ${PAD_T + barAreaH / 2})`}
				>
					{label}
				</text>

				{/* bars */}
				{values.map((v, i) => {
					const x = PAD_L + i * slotW + (slotW - barW) / 2;
					const barH = Math.max(1, (v / maxVal) * barAreaH);
					const y = PAD_T + barAreaH - barH;
					const session = sessions[i];
					return (
						<g key={session?.id ?? i}>
							<rect
								x={x}
								y={y}
								width={barW}
								height={barH}
								fill={color}
								opacity="0.82"
							/>
							{session && (
								<title>
									{new Date(session.timestamp).toLocaleString()}
									{"\n"}
									{fmt(v)} {unit}
								</title>
							)}
						</g>
					);
				})}

				{/* x-axis date labels */}
				{showXAxis &&
					xLabels.map(({ i, text }) => {
						const x = PAD_L + (i + 0.5) * slotW;
						return (
							<text
								key={i}
								x={x}
								y={BAR_VH + 16}
								fill="#666"
								fontSize="10"
								fontFamily="monospace"
								textAnchor="middle"
							>
								{text}
							</text>
						);
					})}
			</svg>
		</div>
	);
}

export function OverviewChart({ sessions }: Props) {
	if (sessions.length === 0) {
		return (
			<p
				style={{
					fontFamily: "'Share Tech Mono', monospace",
					fontSize: "14px",
					color: "#888",
					padding: "24px 0",
				}}
			>
				データがありません。プレイするとグラフが表示されます。
			</p>
		);
	}

	const recent = sessions.slice(-MAX_SESSIONS);

	return (
		<div>
			<div
				style={{
					fontFamily: "'Press Start 2P', monospace",
					fontSize: "10px",
					color: "#999",
					letterSpacing: "3px",
					textTransform: "uppercase",
					marginBottom: "24px",
				}}
			>
				直近{recent.length}回 — プレイ記録
			</div>

			{METRICS.map((metric, idx) => (
				<BarChart
					key={metric.label}
					sessions={recent}
					metric={metric}
					showXAxis={idx === METRICS.length - 1}
				/>
			))}
		</div>
	);
}
