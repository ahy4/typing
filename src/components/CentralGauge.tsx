import { useEffect, useRef, useState } from "react";

const SIZE = 260;
const CX = SIZE / 2;
const CY = SIZE / 2;
const SPEED_R = 94;
const TRACK_STROKE = 24;
const PLAYER_STROKE = 18;
const GHOST_STROKE = 5;
const MAX_KPS = 12;

const START_DEG = 225;
const TOTAL_DEG = 270;
const ARC_LENGTH = (SPEED_R * (TOTAL_DEG * Math.PI)) / 180;

function polarToXY(cx: number, cy: number, r: number, deg: number) {
	const rad = ((deg - 90) * Math.PI) / 180;
	return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(startDeg: number, sweepDeg: number, r: number) {
	const endDeg = startDeg + sweepDeg;
	const start = polarToXY(CX, CY, r, startDeg);
	const end = polarToXY(CX, CY, r, endDeg);
	const largeArc = sweepDeg > 180 ? 1 : 0;
	return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

// Underdamped spring for position values
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

interface Props {
	speed: number;
	ghostSpeed?: number;
	hitCount: number;
	lastWrong: boolean;
}

const FLASH_DIRS = [-60, -30, 0, 30, 60]; // degrees relative to radial outward

export function CentralGauge({
	speed,
	ghostSpeed,
	hitCount,
	lastWrong,
}: Props) {
	// [1] Arc: moderate spring (ζ≈0.58), slight overshoot, lags behind needle
	const arcSpeed = useSpring(speed, 90, 11);
	// [2] Needle: aggressive spring (ζ≈0.10), big overshoot → "flies ahead"
	const needleSpeed = useSpring(speed, 420, 8);
	const ghostSpeedAnim = useSpring(ghostSpeed ?? 0, 90, 11);

	const arcPct = Math.min(1, Math.max(0, arcSpeed / MAX_KPS));
	const needlePct = Math.min(1.08, Math.max(0, needleSpeed / MAX_KPS));
	const ghostPct =
		ghostSpeed !== undefined
			? Math.min(1, Math.max(0, ghostSpeedAnim / MAX_KPS))
			: null;

	const track = arcPath(START_DEG, TOTAL_DEG, SPEED_R);
	const playerOffset = ARC_LENGTH * (1 - arcPct);
	const ghostOffset = ghostPct !== null ? ARC_LENGTH * (1 - ghostPct) : null;

	// Needle geometry: triangle pointer at arc tip
	const needleDeg = START_DEG + needlePct * TOTAL_DEG;
	const needleRad = ((needleDeg - 90) * Math.PI) / 180;
	const needleTipPt = polarToXY(
		CX,
		CY,
		SPEED_R + TRACK_STROKE / 2 + 14,
		needleDeg,
	);
	const baseCenter = {
		x: CX + (SPEED_R - TRACK_STROKE / 2 - 2) * Math.cos(needleRad),
		y: CY + (SPEED_R - TRACK_STROKE / 2 - 2) * Math.sin(needleRad),
	};
	const perpRad = needleRad + Math.PI / 2;
	const needleBase1 = {
		x: baseCenter.x + 7 * Math.cos(perpRad),
		y: baseCenter.y + 7 * Math.sin(perpRad),
	};
	const needleBase2 = {
		x: baseCenter.x - 7 * Math.cos(perpRad),
		y: baseCenter.y - 7 * Math.sin(perpRad),
	};

	// [3] EKG: stroke width pulses on every hit
	const [arcStroke, setArcStroke] = useState(PLAYER_STROKE);
	const strokeRaf = useRef(0);
	const strokeT0 = useRef(0);
	const prevHit = useRef(hitCount);
	useEffect(() => {
		if (hitCount === prevHit.current) return;
		prevHit.current = hitCount;
		cancelAnimationFrame(strokeRaf.current);
		strokeT0.current = 0;
		const tick = (now: number) => {
			if (!strokeT0.current) strokeT0.current = now;
			const p = Math.min(1, (now - strokeT0.current) / 150);
			setArcStroke(PLAYER_STROKE + PLAYER_STROKE * 0.9 * Math.sin(Math.PI * p));
			if (p < 1) strokeRaf.current = requestAnimationFrame(tick);
			else setArcStroke(PLAYER_STROKE);
		};
		strokeRaf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(strokeRaf.current);
	}, [hitCount]);

	// [4] Arc-tip flash when speed increases
	const [flashProgress, setFlashProgress] = useState(-1);
	const [flashPos, setFlashPos] = useState({ x: 0, y: 0, deg: 0 });
	const flashRaf = useRef(0);
	const flashT0 = useRef(0);
	const prevSpeed = useRef(speed);
	useEffect(() => {
		const increased = speed > prevSpeed.current;
		prevSpeed.current = speed;
		if (!increased) return;

		const pct = Math.min(1, speed / MAX_KPS);
		const tipDeg = START_DEG + pct * TOTAL_DEG;
		const tip = polarToXY(CX, CY, SPEED_R + TRACK_STROKE / 2 + 6, tipDeg);
		setFlashPos({ x: tip.x, y: tip.y, deg: tipDeg });

		cancelAnimationFrame(flashRaf.current);
		flashT0.current = 0;
		const tick = (now: number) => {
			if (!flashT0.current) flashT0.current = now;
			const p = Math.min(1, (now - flashT0.current) / 260);
			setFlashProgress(p);
			if (p < 1) flashRaf.current = requestAnimationFrame(tick);
			else setFlashProgress(-1);
		};
		flashRaf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(flashRaf.current);
	}, [speed]);

	// Existing hit/miss CSS animations
	const prevHitCount = useRef(hitCount);
	const prevLastWrong = useRef(lastWrong);
	const [gaugeAnim, setGaugeAnim] = useState<"pulse" | "shake" | null>(null);
	useEffect(() => {
		if (hitCount !== prevHitCount.current) {
			prevHitCount.current = hitCount;
			setGaugeAnim("pulse");
		}
	}, [hitCount]);
	useEffect(() => {
		if (lastWrong && lastWrong !== prevLastWrong.current) {
			setGaugeAnim("shake");
		}
		prevLastWrong.current = lastWrong;
	}, [lastWrong]);

	const gaugeStyle: React.CSSProperties =
		gaugeAnim === "pulse"
			? {
					animation: "gaugePulse 0.18s ease-out forwards",
					transformOrigin: "center",
					overflow: "visible",
				}
			: gaugeAnim === "shake"
				? {
						animation: "gaugeShake 0.3s ease-out forwards",
						transformOrigin: "center",
						overflow: "visible",
					}
				: { overflow: "visible" };

	const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => {
		const deg = START_DEG + t * TOTAL_DEG;
		const inner = polarToXY(CX, CY, SPEED_R - TRACK_STROKE / 2 - 4, deg);
		const outer = polarToXY(CX, CY, SPEED_R + TRACK_STROKE / 2 + 3, deg);
		const labelPt = polarToXY(CX, CY, SPEED_R + TRACK_STROKE / 2 + 14, deg);
		return { inner, outer, labelPt, value: Math.round(t * MAX_KPS) };
	});

	return (
		<div
			style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}
		>
			<svg
				width={SIZE}
				height={SIZE}
				style={gaugeStyle}
				role="img"
				aria-label={`速度 ${arcSpeed.toFixed(1)} 打/秒`}
				onAnimationEnd={() => setGaugeAnim(null)}
			>
				<defs>
					<filter id="speed-glow" x="-60%" y="-60%" width="220%" height="220%">
						<feGaussianBlur stdDeviation="2" result="blur1" />
						<feGaussianBlur stdDeviation="7" result="blur2" />
						<feMerge>
							<feMergeNode in="blur2" />
							<feMergeNode in="blur1" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter
						id="flash-glow"
						x="-100%"
						y="-100%"
						width="300%"
						height="300%"
					>
						<feGaussianBlur stdDeviation="5" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Track */}
				<path
					d={track}
					fill="none"
					stroke="#150025"
					strokeWidth={TRACK_STROKE}
					strokeLinecap="round"
				/>

				{/* White halo — also pulses width with EKG */}
				<path
					d={track}
					fill="none"
					stroke="white"
					strokeWidth={arcStroke + 8}
					strokeLinecap="round"
					strokeDasharray={ARC_LENGTH}
					strokeDashoffset={playerOffset}
					opacity={0.06}
				/>

				{/* Player arc — spring position + EKG width pulse */}
				<path
					d={track}
					fill="none"
					stroke="#00ffff"
					strokeWidth={arcStroke}
					strokeLinecap="round"
					strokeDasharray={ARC_LENGTH}
					strokeDashoffset={playerOffset}
					filter="url(#speed-glow)"
				/>

				{/* Ghost arc */}
				{ghostOffset !== null && (
					<path
						d={track}
						fill="none"
						stroke="#cc00cc"
						strokeWidth={GHOST_STROKE}
						strokeLinecap="round"
						strokeDasharray={ARC_LENGTH}
						strokeDashoffset={ghostOffset}
						opacity={0.75}
						filter="url(#glow-pink)"
					/>
				)}

				{/* Needle: independent spring, flies ahead of arc on acceleration */}
				<polygon
					points={`${needleTipPt.x},${needleTipPt.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
					fill="#00ffff"
					opacity={0.85}
					filter="url(#speed-glow)"
				/>

				{/* Arc-tip flash: 5 radial lines shoot out when speed increases */}
				{flashProgress >= 0 &&
					flashProgress < 1 &&
					FLASH_DIRS.map((offsetDeg) => {
						const outwardRad = ((flashPos.deg - 90) * Math.PI) / 180;
						const rad = outwardRad + (offsetDeg * Math.PI) / 180;
						const len = 24 * (1 - flashProgress);
						return (
							<line
								key={offsetDeg}
								x1={flashPos.x}
								y1={flashPos.y}
								x2={flashPos.x + Math.cos(rad) * len}
								y2={flashPos.y + Math.sin(rad) * len}
								stroke="#00ffff"
								strokeWidth={3 - flashProgress * 2}
								strokeLinecap="round"
								opacity={1 - flashProgress}
								filter="url(#flash-glow)"
							/>
						);
					})}

				{/* Tick marks */}
				{ticks.map((tick) => (
					<g key={tick.value}>
						<line
							x1={tick.inner.x}
							y1={tick.inner.y}
							x2={tick.outer.x}
							y2={tick.outer.y}
							stroke="#444"
							strokeWidth="1.5"
						/>
						<text
							x={tick.labelPt.x}
							y={tick.labelPt.y}
							textAnchor="middle"
							dominantBaseline="middle"
							fill="#444"
							fontSize="8"
							fontFamily="monospace"
						>
							{tick.value}
						</text>
					</g>
				))}

				{/* Speed value */}
				<text
					x={CX}
					y={CY + 14}
					textAnchor="middle"
					fill="#00ffff"
					fontFamily="'Press Start 2P', monospace"
					opacity={0.9}
				>
					<tspan fontSize={28} dominantBaseline="central">
						{arcSpeed.toFixed(1)}
					</tspan>
				</text>
				<text
					x={CX}
					y={CY + 40}
					textAnchor="middle"
					fill="#555"
					fontSize={10}
					fontFamily="'Share Tech Mono', monospace"
					letterSpacing="0.1em"
				>
					打/秒
				</text>

				{/* Ghost speed label */}
				{ghostOffset !== null && ghostSpeed !== undefined && (
					<text
						x={CX}
						y={CY - 26}
						textAnchor="middle"
						fill="#cc00cc"
						fontSize={9}
						fontFamily="'Share Tech Mono', monospace"
						opacity={0.8}
					>
						GHO {ghostSpeedAnim.toFixed(1)}
					</text>
				)}
			</svg>
		</div>
	);
}
