import { useEffect, useState } from "react";
import { playCountdownStep, unlockAudio } from "../lib/sound";

interface Props {
	onReady: () => void;
}

const STEPS = ["3", "2", "1", "GO!"];
const STEP_DURATION = 400;

export function ReadyScreen({ onReady }: Props) {
	const [step, setStep] = useState(-1);

	useEffect(() => {
		let cancelled = false;
		unlockAudio().then(() => {
			if (!cancelled) setStep(0);
		});
		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (step < 0) return;
		playCountdownStep(step);
		if (step >= STEPS.length - 1) {
			const t = setTimeout(onReady, STEP_DURATION);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => setStep((s) => s + 1), STEP_DURATION);
		return () => clearTimeout(t);
	}, [step, onReady]);

	const label = STEPS[step] ?? "";
	const isGo = label === "GO!";

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 50,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(7, 0, 16, 0.82)",
				userSelect: "none",
			}}
		>
			<div
				key={step}
				style={{
					fontFamily: "'Press Start 2P', monospace",
					fontSize: isGo ? "80px" : "108px",
					color: isGo ? "#00ffff" : "#ffffff",
					textShadow: isGo
						? "0 0 40px #00ffff, 0 0 80px #00ffff, 0 0 120px #00ffff88"
						: "0 0 20px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.2)",
					animation: "readyPop 0.25s ease-out",
					lineHeight: 1,
					letterSpacing: isGo ? "8px" : "4px",
				}}
			>
				{label}
			</div>
		</div>
	);
}
