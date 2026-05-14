import type { SessionRecord } from "../lib/types";

interface Props {
	sessions: SessionRecord[];
}

const VW = 900;
const LINE_VH = 130;
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

function LineChart({
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
	const plotW = VW - PAD_L - PAD_R;
	const plotH = LINE_VH - PAD_T - PAD_B;
	const xAxisH = showXAxis ? 28 : 0;
	const totalH = LINE_VH + xAxisH;

	function xPos(i: number) {
		return n <= 1 ? PAD_L + plotW / 2 : PAD_L + (i / (n - 1)) * plotW;
	}
	function yPos(v: number) {
		return PAD_T + plotH * (1 - v / maxVal);
	}

	const pts = values
		.map((v, i) => {
			const s = sessions[i];
			if (!s) return null;
			return { x: xPos(i), y: yPos(v), v, s };
		})
		.filter((p): p is NonNullable<typeof p> => p !== null);

	const linePath = pts
		.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
		.join(" ");
	const first = pts[0];
	const last = pts[pts.length - 1];
	const areaPath =
		first && last
			? `${linePath} L${last.x},${PAD_T + plotH} L${first.x},${PAD_T + plotH} Z`
			: "";

	const xLabels: { i: number; text: string }[] = [];
	if (showXAxis && n > 0) {
		const step = Math.max(1, Math.floor(n / 7));
		for (let i = 0; i < n; i += step) {
			const d = new Date(sessions[i]?.timestamp ?? 0);
			xLabels.push({ i, text: `${d.getMonth() + 1}/${d.getDate()}` });
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

	const gradId = `grad-${label}`;

	return (
		<div style={{ marginBottom: showXAxis ? "0" : "4px" }}>
			<svg
				viewBox={`0 0 ${VW} ${totalH}`}
				style={{ width: "100%", display: "block" }}
				aria-label={`${label} line chart`}
			>
				<defs>
					<linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={color} stopOpacity="0.22" />
						<stop offset="100%" stopColor={color} stopOpacity="0.02" />
					</linearGradient>
				</defs>

				{/* grid lines */}
				{[0.25, 0.5, 0.75, 1.0].map((t) => {
					const y = PAD_T + plotH * (1 - t);
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
					y2={PAD_T + plotH}
					stroke="#444"
					strokeWidth="1"
				/>

				{/* baseline */}
				<line
					x1={PAD_L}
					y1={PAD_T + plotH}
					x2={VW - PAD_R}
					y2={PAD_T + plotH}
					stroke="#444"
					strokeWidth="1"
				/>

				{/* max label */}
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
					y={PAD_T + plotH}
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
					y={PAD_T + plotH / 2}
					fill={color}
					fontSize="10"
					fontFamily="monospace"
					textAnchor="middle"
					dominantBaseline="middle"
					transform={`rotate(-90, 12, ${PAD_T + plotH / 2})`}
				>
					{label}
				</text>

				{/* fill area */}
				{areaPath && <path d={areaPath} fill={`url(#${gradId})`} />}

				{/* line */}
				{linePath && (
					<path
						d={linePath}
						fill="none"
						stroke={color}
						strokeWidth="1.5"
						strokeLinejoin="round"
						strokeLinecap="round"
						opacity="0.9"
					/>
				)}

				{/* dots */}
				{pts.map(({ x, y, v, s }, i) => (
					<g key={s.id ?? i}>
						<circle cx={x} cy={y} r="3" fill={color} opacity="0.9" />
						<title>
							{new Date(s.timestamp).toLocaleString()}
							{"\n"}
							{fmt(v)} {unit}
						</title>
					</g>
				))}

				{/* x-axis date labels */}
				{showXAxis &&
					xLabels.map(({ i, text }) => (
						<text
							key={i}
							x={xPos(i)}
							y={LINE_VH + 16}
							fill="#666"
							fontSize="10"
							fontFamily="monospace"
							textAnchor="middle"
						>
							{text}
						</text>
					))}
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
				<LineChart
					key={metric.label}
					sessions={recent}
					metric={metric}
					showXAxis={idx === METRICS.length - 1}
				/>
			))}
		</div>
	);
}
