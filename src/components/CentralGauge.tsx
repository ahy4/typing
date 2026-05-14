import { useEffect, useRef, useState } from "react";

const SIZE = 260;
const CX = SIZE / 2;
const CY = SIZE / 2;
const SPEED_R = 94;
const TRACK_STROKE = 24;
const PLAYER_STROKE = 18;
const GHOST_STROKE = 5;
const MAX_KPS = 12;

// Car-style speedometer: bottom-left (225°) → clockwise → bottom-right (135°), 270° sweep
const START_DEG = 225;
const TOTAL_DEG = 270;
const ARC_LENGTH = SPEED_R * (TOTAL_DEG * Math.PI) / 180;

function polarToXY(cx: number, cy: number, r: number, deg: number) {
	const rad = ((deg - 90) * Math.PI) / 180;
	return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Arc path from startDeg, sweeping sweepDeg degrees clockwise at radius r
function arcPath(startDeg: number, sweepDeg: number, r: number) {
	const endDeg = startDeg + sweepDeg;
	const start = polarToXY(CX, CY, r, startDeg);
	const end = polarToXY(CX, CY, r, endDeg);
	const largeArc = sweepDeg > 180 ? 1 : 0;
	return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

// Smoothly lerps toward target on each animation frame
function useAnimatedValue(target: number) {
	const displayRef = useRef(target);
	const [display, setDisplay] = useState(target);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

		function animate() {
			const diff = target - displayRef.current;
			if (Math.abs(diff) < 0.005) {
				displayRef.current = target;
				setDisplay(target);
				rafRef.current = null;
				return;
			}
			displayRef.current += diff * 0.15;
			setDisplay(displayRef.current);
			rafRef.current = requestAnimationFrame(animate);
		}

		rafRef.current = requestAnimationFrame(animate);
		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
		};
	}, [target]);

	return display;
}

interface Props {
	speed: number;
	ghostSpeed?: number;
	hitCount: number;
	lastWrong: boolean;
}

export function CentralGauge({
	speed,
	ghostSpeed,
	hitCount,
	lastWrong,
}: Props) {
	const displaySpeed = useAnimatedValue(speed);
	const displayGhostSpeed = useAnimatedValue(ghostSpeed ?? 0);

	const speedPct = Math.min(1, Math.max(0, displaySpeed / MAX_KPS));
	const ghostPct =
		ghostSpeed !== undefined
			? Math.min(1, Math.max(0, displayGhostSpeed / MAX_KPS))
			: null;

	const track = arcPath(START_DEG, TOTAL_DEG, SPEED_R);
	const playerOffset = ARC_LENGTH * (1 - speedPct);
	const ghostOffset = ghostPct !== null ? ARC_LENGTH * (1 - ghostPct) : null;

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

	// Tick marks at 0%, 25%, 50%, 75%, 100%
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
				aria-label={`速度 ${displaySpeed.toFixed(1)} 打/秒`}
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
				</defs>

				{/* Track */}
				<path
					d={track}
					fill="none"
					stroke="#150025"
					strokeWidth={TRACK_STROKE}
					strokeLinecap="round"
				/>

				{/* White halo */}
				<path
					d={track}
					fill="none"
					stroke="white"
					strokeWidth={PLAYER_STROKE + 8}
					strokeLinecap="round"
					strokeDasharray={ARC_LENGTH}
					strokeDashoffset={playerOffset}
					opacity={0.06}
					style={{ transition: "stroke-dashoffset 0.15s" }}
				/>

				{/* Player speed arc */}
				<path
					d={track}
					fill="none"
					stroke="#00ffff"
					strokeWidth={PLAYER_STROKE}
					strokeLinecap="round"
					strokeDasharray={ARC_LENGTH}
					strokeDashoffset={playerOffset}
					filter="url(#speed-glow)"
					style={{ transition: "stroke-dashoffset 0.15s" }}
				/>

				{/* Ghost speed arc */}
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
						style={{ transition: "stroke-dashoffset 0.15s" }}
					/>
				)}

				{/* Tick marks */}
				{ticks.map((tick, i) => (
					<g key={i}>
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
						{displaySpeed.toFixed(1)}
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
						GHO {displayGhostSpeed.toFixed(1)}
					</text>
				)}
			</svg>
		</div>
	);
}
