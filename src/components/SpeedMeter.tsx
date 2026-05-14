import { useEffect, useRef, useState } from "react";

interface SpringOpts {
	k: number;
	c: number;
	jitterThreshold?: number;
	jitterAmp?: number;
	maxVal?: number;
}

function useSpring(target: number, opts: SpringOpts) {
	const { k, c, jitterThreshold = 0, jitterAmp = 0, maxVal = 1 } = opts;
	const [display, setDisplay] = useState(target);
	const spring = useRef({ x: target, v: 0 });
	const raf = useRef(0);
	const t0 = useRef(0);

	useEffect(() => {
		cancelAnimationFrame(raf.current);
		t0.current = 0;

		const tick = (now: number) => {
			if (!t0.current) t0.current = now;
			const dt = Math.min((now - t0.current) / 1000, 0.05);
			t0.current = now;

			const { x, v } = spring.current;
			const a = k * (target - x) - c * v;
			const v2 = v + a * dt;
			const x2 = x + v2 * dt;
			spring.current = { x: x2, v: v2 };

			const ratio = Math.max(0, x2 / maxVal);
			const jitter =
				ratio > jitterThreshold ? (Math.random() - 0.5) * jitterAmp * ratio : 0;
			setDisplay(x2 + jitter);

			if (Math.abs(x2 - target) > 0.004 || Math.abs(v2) > 0.004) {
				raf.current = requestAnimationFrame(tick);
			} else {
				spring.current = { x: target, v: 0 };
				setDisplay(target);
			}
		};

		raf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf.current);
	}, [target, k, c, jitterThreshold, jitterAmp, maxVal]);

	return display;
}

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
	// Needle: hyper-responsive, big overshoot (ζ ≈ 0.11) + jitter at high speed
	const needleVal = useSpring(wpm, {
		k: 380,
		c: 7,
		jitterThreshold: 0.45,
		jitterAmp: 0.45,
		maxVal: maxWpm,
	});
	// Arc: sluggish, over-damped — lags behind the needle
	const arcVal = useSpring(wpm, { k: 55, c: 9, maxVal: maxWpm });

	const needlePct = Math.min(1.12, Math.max(0, needleVal / maxWpm));
	const arcPct = Math.min(1.0, Math.max(0, arcVal / maxWpm));

	const r = 36;
	const cx = 44;
	const cy = 44;

	function describeArc(startDeg: number, endDeg: number, radius: number) {
		const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
		const x1 = cx + radius * Math.cos(toRad(startDeg));
		const y1 = cy + radius * Math.sin(toRad(startDeg));
		const x2 = cx + radius * Math.cos(toRad(endDeg));
		const y2 = cy + radius * Math.sin(toRad(endDeg));
		const large = endDeg - startDeg > 180 ? 1 : 0;
		return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
	}

	const ARC_START = -220 + 90;
	const ARC_RANGE = 260;
	const trackPath = describeArc(ARC_START, ARC_START + ARC_RANGE, r);
	const valuePath = describeArc(ARC_START, ARC_START + arcPct * ARC_RANGE, r);

	// Color and glow shift: cool→hot as speed climbs
	const ratio = Math.min(1, wpm / maxWpm);
	const glowSize = 4 + ratio * 10;
	const glowOpacity = Math.round((0.4 + ratio * 0.6) * 255)
		.toString(16)
		.padStart(2, "0");
	const arcColor = ratio > 0.75 ? "#ff6600" : ratio > 0.45 ? "#ffcc00" : color;

	// Needle angle for the pointer
	const needleAngle = ARC_START + needlePct * ARC_RANGE;
	const needleRad = ((needleAngle - 90) * Math.PI) / 180;
	const needleTip = {
		x: cx + (r - 4) * Math.cos(needleRad),
		y: cy + (r - 4) * Math.sin(needleRad),
	};
	const needleBase1 = {
		x: cx + 5 * Math.cos(needleRad + Math.PI / 2),
		y: cy + 5 * Math.sin(needleRad + Math.PI / 2),
	};
	const needleBase2 = {
		x: cx + 5 * Math.cos(needleRad - Math.PI / 2),
		y: cy + 5 * Math.sin(needleRad - Math.PI / 2),
	};

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
				{/* value arc */}
				<path
					d={valuePath}
					fill="none"
					stroke={arcColor}
					strokeWidth="6"
					strokeLinecap="round"
					style={{
						filter: `drop-shadow(0 0 ${glowSize}px ${arcColor}${glowOpacity})`,
					}}
				/>
				{/* needle pointer */}
				<polygon
					points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
					fill={arcColor}
					opacity={0.55}
					style={{ filter: `drop-shadow(0 0 3px ${arcColor})` }}
				/>
				{/* center hub */}
				<circle
					cx={cx}
					cy={cy}
					r={4}
					fill="#333"
					stroke={arcColor}
					strokeWidth="1"
				/>
				{/* center text */}
				<text
					x={cx}
					y={cy - 6}
					textAnchor="middle"
					fill={arcColor}
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
