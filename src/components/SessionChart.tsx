import type { SessionRecord } from "../lib/types";

interface Props {
	sessions: SessionRecord[];
}

export function SessionChart({ sessions }: Props) {
	if (sessions.length < 2) {
		return (
			<p className="text-gray-600 text-sm text-center">
				2回以上プレイするとトレンドが表示されます。
			</p>
		);
	}

	const recent = sessions.slice(-30);
	const maxWpm = Math.max(...recent.map((s) => s.wpm), 1);
	const w = 400;
	const h = 100;
	const pad = 10;

	const points = recent.map((s, i) => {
		const x = pad + (i / (recent.length - 1)) * (w - pad * 2);
		const y = h - pad - (s.wpm / maxWpm) * (h - pad * 2);
		return { x, y, wpm: s.wpm, id: s.id };
	});

	const pathD = points
		.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
		.join(" ");
	const areaD = `${pathD} L ${points[points.length - 1]?.x ?? w} ${h - pad} L ${points[0]?.x ?? 0} ${h - pad} Z`;

	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-sm uppercase tracking-widest text-gray-500">
				速度推移（直近30回）
			</h3>
			<svg
				width={w}
				height={h}
				className="w-full"
				viewBox={`0 0 ${w} ${h}`}
				role="img"
				aria-label="Speed trend chart"
			>
				<defs>
					<linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
						<stop offset="100%" stopColor="#00ffff" stopOpacity="0.02" />
					</linearGradient>
				</defs>
				{/* grid lines */}
				{[0.25, 0.5, 0.75, 1].map((t) => (
					<line
						key={t}
						x1={pad}
						x2={w - pad}
						y1={h - pad - t * (h - pad * 2)}
						y2={h - pad - t * (h - pad * 2)}
						stroke="#1a1a1a"
						strokeWidth="1"
					/>
				))}
				{/* area */}
				<path d={areaD} fill="url(#chartGrad)" />
				{/* line */}
				<path
					d={pathD}
					fill="none"
					stroke="#00ffff"
					strokeWidth="2"
					style={{ filter: "drop-shadow(0 0 4px #00ffff88)" }}
				/>
				{/* dots */}
				{points.map((p) => (
					<circle
						key={p.id}
						cx={p.x}
						cy={p.y}
						r="2.5"
						fill="#00ffff"
						opacity="0.8"
					/>
				))}
				{/* labels */}
				<text x={pad} y={h - 1} fill="#444" fontSize="8" fontFamily="monospace">
					0
				</text>
				<text
					x={w - pad - 16}
					y={pad + 8}
					fill="#444"
					fontSize="8"
					fontFamily="monospace"
				>
					{Math.round(maxWpm)}
				</text>
			</svg>
		</div>
	);
}
