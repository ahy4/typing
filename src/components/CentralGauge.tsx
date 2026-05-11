import { useEffect, useRef, useState } from "react";

const SIZE = 260;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 108;
const INNER_R = 80;
const OUTER_STROKE = 12;
const INNER_STROKE = 9;
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

	// Animation state
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
			</defs>

			{/* Background tracks */}
			<circle
				cx={CX}
				cy={CY}
				r={OUTER_R}
				fill="none"
				stroke="#151518"
				strokeWidth={OUTER_STROKE}
			/>
			<circle
				cx={CX}
				cy={CY}
				r={INNER_R}
				fill="none"
				stroke="#151518"
				strokeWidth={INNER_STROKE}
			/>

			{/* Ghost speed arc */}
			{ghostInnerOffset !== null && (
				<circle
					cx={CX}
					cy={CY}
					r={INNER_R}
					fill="none"
					stroke="#cc44ff"
					strokeWidth={INNER_STROKE}
					strokeDasharray={innerCirc}
					strokeDashoffset={ghostInnerOffset}
					strokeLinecap="round"
					transform={`rotate(-90 ${CX} ${CY})`}
					opacity={0.3}
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

			{/* Inner ring: speed */}
			<circle
				cx={CX}
				cy={CY}
				r={INNER_R}
				fill="none"
				stroke="#00ffff"
				strokeWidth={INNER_STROKE}
				strokeDasharray={innerCirc}
				strokeDashoffset={innerOffset}
				strokeLinecap="round"
				transform={`rotate(-90 ${CX} ${CY})`}
				filter="url(#speed-glow)"
				style={{ transition: "stroke-dashoffset 0.15s" }}
			/>

			{/* Streak label */}
			{healStreak > 0 && (
				<text
					x={CX}
					y={CY - 38}
					textAnchor="middle"
					fill={streakColor}
					fontSize={10}
					fontFamily="monospace"
					opacity={0.9}
				>
					×{healStreak} STREAK
				</text>
			)}

			{/* Combo number */}
			<text
				x={CX}
				y={CY - 14}
				textAnchor="middle"
				dominantBaseline="central"
				fill={comboColor}
				fontSize={26}
				fontFamily="monospace"
				fontWeight="bold"
				style={{
					userSelect: "none",
					transformBox: "fill-box",
					transformOrigin: "center",
					animation: comboAnim ? "comboPop 0.2s ease-out forwards" : undefined,
				}}
				onAnimationEnd={() => setComboAnim(false)}
			>
				{combo}
			</text>

			{/* COMBO label */}
			<text
				x={CX}
				y={CY + 6}
				textAnchor="middle"
				fill="#333"
				fontSize={9}
				fontFamily="monospace"
				letterSpacing="0.2em"
			>
				COMBO
			</text>

			{/* Speed value */}
			<text
				x={CX}
				y={CY + 26}
				textAnchor="middle"
				fill="#00ffff"
				fontSize={22}
				fontFamily="monospace"
				opacity={0.85}
			>
				{speed.toFixed(1)} 打/秒
			</text>
		</svg>
	);
}
