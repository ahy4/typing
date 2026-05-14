import { useEffect, useRef, useState } from "react";

const SIZE = 260;
const CX = SIZE / 2;
const CY = SIZE / 2;
const SPEED_R = 94;
const TRACK_STROKE = 24;
const PLAYER_STROKE = 18;
const GHOST_STROKE = 5;
const MAX_KPS = 12;

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
	const speedPct = Math.min(1, speed / MAX_KPS);
	const speedCirc = 2 * Math.PI * SPEED_R;
	const playerOffset = speedCirc * (1 - speedPct);

	const ghostOffset =
		ghostSpeed !== undefined
			? speedCirc * (1 - Math.min(1, ghostSpeed / MAX_KPS))
			: null;

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

	return (
		<div
			style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}
		>
			<svg
				width={SIZE}
				height={SIZE}
				style={gaugeStyle}
				role="img"
				aria-label={`速度 ${speed.toFixed(1)} 打/秒`}
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

				{/* BG outer circle */}
				<circle
					cx={CX}
					cy={CY}
					r={SPEED_R}
					fill="none"
					stroke="#1a0030"
					strokeWidth={2}
				/>

				{/* Speed track */}
				<circle
					cx={CX}
					cy={CY}
					r={SPEED_R}
					fill="none"
					stroke="#150025"
					strokeWidth={TRACK_STROKE}
				/>

				{/* White halo behind player arc */}
				<circle
					cx={CX}
					cy={CY}
					r={SPEED_R}
					fill="none"
					stroke="white"
					strokeWidth={PLAYER_STROKE + 8}
					strokeDasharray={speedCirc}
					strokeDashoffset={playerOffset}
					strokeLinecap="round"
					transform={`rotate(-90 ${CX} ${CY})`}
					opacity={0.06}
					style={{ transition: "stroke-dashoffset 0.15s" }}
				/>
				{/* Player speed arc — rendered first (below), thicker */}
				<circle
					cx={CX}
					cy={CY}
					r={SPEED_R}
					fill="none"
					stroke="#00ffff"
					strokeWidth={PLAYER_STROKE}
					strokeDasharray={speedCirc}
					strokeDashoffset={playerOffset}
					strokeLinecap="round"
					transform={`rotate(-90 ${CX} ${CY})`}
					filter="url(#speed-glow)"
					style={{ transition: "stroke-dashoffset 0.15s" }}
				/>

				{/* Ghost speed arc — rendered second (above), thinner */}
				{ghostOffset !== null && (
					<circle
						cx={CX}
						cy={CY}
						r={SPEED_R}
						fill="none"
						stroke="#cc00cc"
						strokeWidth={GHOST_STROKE}
						strokeDasharray={speedCirc}
						strokeDashoffset={ghostOffset}
						strokeLinecap="round"
						transform={`rotate(-90 ${CX} ${CY})`}
						opacity={0.75}
						filter="url(#glow-pink)"
						style={{ transition: "stroke-dashoffset 0.15s" }}
					/>
				)}

				{/* Tick marks */}
				<line x1={CX} y1="12" x2={CX} y2="26" stroke="#333" strokeWidth="1" />
				<line
					x1={SIZE - 12}
					y1={CY}
					x2={SIZE - 26}
					y2={CY}
					stroke="#333"
					strokeWidth="1"
				/>
				<line x1="12" y1={CY} x2="26" y2={CY} stroke="#333" strokeWidth="1" />
				<line
					x1={CX}
					y1={SIZE - 12}
					x2={CX}
					y2={SIZE - 26}
					stroke="#333"
					strokeWidth="1"
				/>

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
						{speed.toFixed(1)}
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
						GHO {ghostSpeed.toFixed(1)}
					</text>
				)}
			</svg>
		</div>
	);
}
