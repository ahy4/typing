import { useEffect, useRef, useState } from "react";

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 90;
const INNER_R = 72;
const OUTER_STROKE = 10;
const INNER_TRACK_STROKE = 14;
const GHOST_INNER_STROKE = 11;
const PLAYER_INNER_STROKE = 5;
const MAX_KPS = 12;

interface Props {
	progressToHeal: number;
	healStreak: number;
	streakColor: string;
	speed: number;
	combo: number;
	comboColor: string;
	ghostSpeed?: number;
	hitCount: number;
	lastWrong: boolean;
}

export function CentralGauge({
	progressToHeal,
	healStreak,
	streakColor,
	speed,
	combo,
	comboColor,
	ghostSpeed,
	hitCount,
	lastWrong,
}: Props) {
	const outerCirc = 2 * Math.PI * OUTER_R;
	const outerOffset = outerCirc * (1 - progressToHeal);

	const speedPct = Math.min(1, speed / MAX_KPS);
	const innerCirc = 2 * Math.PI * INNER_R;
	const innerOffset = innerCirc * (1 - speedPct);

	const ghostInnerOffset =
		ghostSpeed !== undefined
			? innerCirc * (1 - Math.min(1, ghostSpeed / MAX_KPS))
			: null;

	const prevHitCount = useRef(hitCount);
	const prevLastWrong = useRef(lastWrong);
	const [gaugeAnim, setGaugeAnim] = useState<"pulse" | "shake" | null>(null);
	const [comboAnim, setComboAnim] = useState(false);
	const [ringFlash, setRingFlash] = useState(false);

	useEffect(() => {
		if (hitCount !== prevHitCount.current) {
			prevHitCount.current = hitCount;
			setGaugeAnim("pulse");
			setComboAnim(true);
			setRingFlash(true);
		}
	}, [hitCount]);

	useEffect(() => {
		if (lastWrong && lastWrong !== prevLastWrong.current) {
			setGaugeAnim("shake");
			setRingFlash(false);
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
				aria-label={`コンボ ${combo}、速度 ${speed.toFixed(1)} 打/秒`}
				onAnimationEnd={() => setGaugeAnim(null)}
			>
				<defs>
					<filter id="heal-glow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="4" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter id="speed-glow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter
						id="ring-flash-glow"
						x="-60%"
						y="-60%"
						width="220%"
						height="220%"
					>
						<feGaussianBlur stdDeviation="7" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
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

				{/* BG circle */}
				<circle
					cx={CX}
					cy={CY}
					r={OUTER_R}
					fill="none"
					stroke="#1a0030"
					strokeWidth={2}
				/>

				{/* Background tracks */}
				<circle
					cx={CX}
					cy={CY}
					r={OUTER_R}
					fill="none"
					stroke="#150025"
					strokeWidth={OUTER_STROKE}
				/>
				<circle
					cx={CX}
					cy={CY}
					r={INNER_R}
					fill="none"
					stroke="#150025"
					strokeWidth={INNER_TRACK_STROKE}
				/>

				{/* Ghost speed arc — lower layer, thicker, pink */}
				{ghostInnerOffset !== null && (
					<circle
						cx={CX}
						cy={CY}
						r={INNER_R}
						fill="none"
						stroke="#cc00cc"
						strokeWidth={GHOST_INNER_STROKE}
						strokeDasharray={innerCirc}
						strokeDashoffset={ghostInnerOffset}
						strokeLinecap="round"
						transform={`rotate(-90 ${CX} ${CY})`}
						opacity={0.5}
						filter="url(#glow-pink)"
						style={{ transition: "stroke-dashoffset 0.15s" }}
					/>
				)}

				{/* Outer ring: heal progress */}
				<circle
					cx={CX}
					cy={CY}
					r={OUTER_R}
					fill="none"
					stroke={streakColor}
					strokeWidth={OUTER_STROKE}
					strokeDasharray={outerCirc}
					strokeDashoffset={outerOffset}
					strokeLinecap="round"
					transform={`rotate(-90 ${CX} ${CY})`}
					filter={ringFlash ? "url(#ring-flash-glow)" : "url(#heal-glow)"}
					style={{
						transition: "stroke-dashoffset 0.08s, stroke 0.3s",
						animation: ringFlash
							? "ringFlash 0.25s ease-out forwards"
							: undefined,
					}}
					onAnimationEnd={() => setRingFlash(false)}
				/>

				{/* Inner ring: player speed — upper layer, thinner */}
				<circle
					cx={CX}
					cy={CY}
					r={INNER_R}
					fill="none"
					stroke="#00ffff"
					strokeWidth={PLAYER_INNER_STROKE}
					strokeDasharray={innerCirc}
					strokeDashoffset={innerOffset}
					strokeLinecap="round"
					transform={`rotate(-90 ${CX} ${CY})`}
					filter="url(#speed-glow)"
					style={{ transition: "stroke-dashoffset 0.15s" }}
				/>

				{/* Tick marks */}
				<line x1={CX} y1="10" x2={CX} y2="22" stroke="#333" strokeWidth="1" />
				<line x1="190" y1={CY} x2="178" y2={CY} stroke="#333" strokeWidth="1" />
				<line x1="10" y1={CY} x2="22" y2={CY} stroke="#333" strokeWidth="1" />
				<line x1={CX} y1="190" x2={CX} y2="178" stroke="#333" strokeWidth="1" />

				{/* Streak label */}
				{healStreak > 0 && (
					<text
						x={CX}
						y={CY - 34}
						textAnchor="middle"
						fill={streakColor}
						fontSize={8}
						fontFamily="'Press Start 2P', monospace"
						opacity={0.9}
					>
						×{healStreak} STREAK
					</text>
				)}

				{/* Combo number */}
				<text
					x={CX}
					y={CY - 10}
					textAnchor="middle"
					dominantBaseline="central"
					fill={comboColor}
					fontSize={32}
					fontFamily="'Press Start 2P', monospace"
					style={{
						userSelect: "none",
						transformBox: "fill-box",
						transformOrigin: "center",
						textShadow: `0 0 16px ${comboColor}, 0 0 32px ${comboColor}50`,
						animation: comboAnim
							? "comboPop 0.2s ease-out forwards"
							: undefined,
					}}
					onAnimationEnd={() => setComboAnim(false)}
				>
					{combo}
				</text>

				{/* COMBO label */}
				<text
					x={CX}
					y={CY + 10}
					textAnchor="middle"
					fill="#555"
					fontSize={8}
					fontFamily="'Press Start 2P', monospace"
					letterSpacing="0.2em"
				>
					COMBO
				</text>

				{/* Speed value */}
				<text
					x={CX}
					y={CY + 30}
					textAnchor="middle"
					fill="#00ffff"
					fontFamily="'Press Start 2P', monospace"
					opacity={0.9}
				>
					<tspan fontSize={16}>{speed.toFixed(1)}</tspan>
					<tspan
						fontSize={9}
						dy="2"
						fill="#666"
						fontFamily="'Share Tech Mono', monospace"
					>
						{" "}
						打/秒
					</tspan>
				</text>
			</svg>
		</div>
	);
}
