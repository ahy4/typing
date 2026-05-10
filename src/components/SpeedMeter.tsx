interface Props {
	wpm: number;
	label?: string;
	color?: string;
	maxWpm?: number;
}

export function SpeedMeter({
	wpm,
	label = "打/秒",
	color = "#00ffff",
	maxWpm = 12,
}: Props) {
	const pct = Math.min(1, wpm / maxWpm);
	const r = 36;
	const cx = 44;
	const cy = 44;
	// arc path using SVG
	function describeArc(startDeg: number, endDeg: number, radius: number) {
		const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
		const x1 = cx + radius * Math.cos(toRad(startDeg));
		const y1 = cy + radius * Math.sin(toRad(startDeg));
		const x2 = cx + radius * Math.cos(toRad(endDeg));
		const y2 = cy + radius * Math.sin(toRad(endDeg));
		const large = endDeg - startDeg > 180 ? 1 : 0;
		return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
	}

	const trackPath = describeArc(-220 + 90, 40 + 90, r);
	const valuePath = describeArc(-220 + 90, -220 + 90 + pct * 260, r);

	return (
		<div className="flex flex-col items-center gap-0">
			<svg
				width="88"
				height="88"
				className="overflow-visible"
				role="img"
				aria-label={`Speed meter: ${wpm.toFixed(1)}`}
			>
				{/* track */}
				<path
					d={trackPath}
					fill="none"
					stroke="#1a1a1a"
					strokeWidth="6"
					strokeLinecap="round"
				/>
				{/* value */}
				<path
					d={valuePath}
					fill="none"
					stroke={color}
					strokeWidth="6"
					strokeLinecap="round"
					style={{
						filter: `drop-shadow(0 0 4px ${color}88)`,
						transition: "all 0.1s ease",
					}}
				/>
				{/* center text */}
				<text
					x={cx}
					y={cy - 6}
					textAnchor="middle"
					fill={color}
					fontSize="14"
					fontFamily="monospace"
					fontWeight="bold"
				>
					{wpm.toFixed(1)}
				</text>
				<text
					x={cx}
					y={cy + 7}
					textAnchor="middle"
					fill="#666"
					fontSize="8"
					fontFamily="monospace"
				>
					打/秒
				</text>
				<text
					x={cx}
					y={cy + 18}
					textAnchor="middle"
					fill="#444"
					fontSize="7"
					fontFamily="monospace"
				>
					{label}
				</text>
			</svg>
			{/* ticks */}
			<div className="flex gap-1 mt-[-8px]">
				{[0, 50, 100, 150, 200].map((v) => (
					<span key={v} className="text-[8px] text-gray-700">
						{v === 0 || v === 200 ? v : ""}
					</span>
				))}
			</div>
		</div>
	);
}
