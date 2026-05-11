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
}

export function CentralGauge({
	progressToHeal,
	healStreak,
	streakColor,
	speed,
	combo,
	comboColor,
	ghostSpeed,
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

	return (
		<svg
			width={SIZE}
			height={SIZE}
			style={{ overflow: "visible" }}
			role="img"
			aria-label={`コンボ ${combo}、速度 ${speed.toFixed(1)} 打/秒`}
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
				filter="url(#heal-glow)"
				style={{ transition: "stroke-dashoffset 0.08s, stroke 0.3s" }}
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
				y={CY}
				textAnchor="middle"
				dominantBaseline="central"
				fill={comboColor}
				fontSize={52}
				fontFamily="monospace"
				fontWeight="bold"
				style={{ userSelect: "none" }}
			>
				{combo}
			</text>

			{/* COMBO label */}
			<text
				x={CX}
				y={CY + 30}
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
				y={CY + 46}
				textAnchor="middle"
				fill="#00ffff"
				fontSize={11}
				fontFamily="monospace"
				opacity={0.6}
			>
				{speed.toFixed(1)} 打/秒
			</text>
		</svg>
	);
}
