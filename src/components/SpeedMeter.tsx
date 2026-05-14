import { useEffect, useRef, useState } from "react";

// Underdamped spring for position/rotation
function useSpring(target: number, k: number, c: number) {
	const [val, setVal] = useState(target);
	const s = useRef({ x: target, v: 0 });
	const raf = useRef(0);
	const t0 = useRef(0);

	useEffect(() => {
		cancelAnimationFrame(raf.current);
		t0.current = 0;
		const tick = (now: number) => {
			if (!t0.current) t0.current = now;
			const dt = Math.min((now - t0.current) / 1000, 0.05);
			t0.current = now;
			const a = k * (target - s.current.x) - c * s.current.v;
			const v2 = s.current.v + a * dt;
			const x2 = s.current.x + v2 * dt;
			s.current = { x: x2, v: v2 };
			setVal(x2);
			if (Math.abs(x2 - target) > 0.003 || Math.abs(v2) > 0.003) {
				raf.current = requestAnimationFrame(tick);
			} else {
				s.current = { x: target, v: 0 };
				setVal(target);
			}
		};
		raf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf.current);
	}, [target, k, c]);

	return val;
}

// Continuous time-based animations bundled into one rAF loop
interface Ambience {
	shakeX: number; // SVG container: X translation
	shakeY: number; // SVG container: Y translation
	hubScale: number; // Hub circle: breathes in/out (scale)
	arcWidth: number; // Arc stroke: pulses thick/thin (width)
}

function useAmbience(): Ambience {
	const [a, setA] = useState<Ambience>({
		shakeX: 0,
		shakeY: 0,
		hubScale: 1,
		arcWidth: 6,
	});
	useEffect(() => {
		let raf: number;
		const tick = (now: number) => {
			setA({
				shakeX: (Math.random() - 0.5) * 1.8,
				shakeY: (Math.random() - 0.5) * 1.2,
				hubScale: 1 + 0.18 * Math.sin(now / 270),
				arcWidth: 4.5 + 3.5 * Math.abs(Math.sin(now / 210)),
			});
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);
	return a;
}

// Number scale pop triggered on every wpm change
function useNumPop(wpm: number) {
	const [scale, setScale] = useState(1);
	const raf = useRef(0);
	const t0 = useRef(0);
	const prev = useRef(wpm);

	useEffect(() => {
		if (prev.current === wpm) return;
		prev.current = wpm;
		cancelAnimationFrame(raf.current);
		t0.current = 0;
		const tick = (now: number) => {
			if (!t0.current) t0.current = now;
			const p = Math.min(1, (now - t0.current) / 170);
			setScale(1 + 0.6 * Math.sin(Math.PI * p));
			if (p < 1) {
				raf.current = requestAnimationFrame(tick);
			} else {
				setScale(1);
			}
		};
		raf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf.current);
	}, [wpm]);

	return scale;
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
	// [Rotation] Needle: hyper-fast spring, ζ≈0.11, big overshoot
	const needleVal = useSpring(wpm, 400, 7);
	// [Rotation] Arc fill: slow spring, ζ≈0.65, lags far behind needle
	const arcVal = useSpring(wpm, 42, 8);
	// [Translation] SVG shake + [Scale] hub breathe + [Width] arc pulse
	const amb = useAmbience();
	// [Scale] Number pops on every keystroke
	const numScale = useNumPop(wpm);

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
	const needlePct = Math.min(1.12, Math.max(0, needleVal / maxWpm));
	const arcPct = Math.min(1.0, Math.max(0, arcVal / maxWpm));

	const trackPath = describeArc(ARC_START, ARC_START + ARC_RANGE, r);
	const valuePath = describeArc(ARC_START, ARC_START + arcPct * ARC_RANGE, r);

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
			{/* [Translation] whole SVG shakes on X/Y axes independently */}
			<svg
				width="88"
				height="88"
				className="overflow-visible"
				role="img"
				aria-label={`Speed meter: ${wpm.toFixed(1)}`}
				style={{
					transform: `translate(${amb.shakeX}px, ${amb.shakeY}px)`,
				}}
			>
				{/* track */}
				<path
					d={trackPath}
					fill="none"
					stroke="#1a1a1a"
					strokeWidth="6"
					strokeLinecap="round"
				/>
				{/* [Rotation + Width] Arc: lags behind needle, stroke width pulses */}
				<path
					d={valuePath}
					fill="none"
					stroke={color}
					strokeWidth={amb.arcWidth}
					strokeLinecap="round"
					style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
				/>
				{/* [Rotation] Needle: fast, overshoots aggressively */}
				<polygon
					points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
					fill={color}
					opacity={0.8}
					style={{ filter: `drop-shadow(0 0 5px ${color})` }}
				/>
				{/* [Scale] Hub: breathes with sin wave */}
				<circle
					cx={cx}
					cy={cy}
					r={4}
					fill="#333"
					stroke={color}
					strokeWidth="1"
					transform={`translate(${cx} ${cy}) scale(${amb.hubScale}) translate(${-cx} ${-cy})`}
				/>
				{/* [Scale] Number: pops on every keystroke */}
				<g transform={`translate(${cx} ${cy - 6})`}>
					<text
						x={0}
						y={0}
						textAnchor="middle"
						dominantBaseline="middle"
						fill={color}
						fontSize="14"
						fontFamily="monospace"
						fontWeight="bold"
						transform={`scale(${numScale})`}
					>
						{wpm.toFixed(1)}
					</text>
				</g>
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
