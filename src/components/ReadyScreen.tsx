import { useEffect, useState } from "react";
import { unlockAudio, playCountdownStep } from "../lib/sound";

interface Props {
	onReady: () => void;
}

const STEPS = ["3", "2", "1", "GO!"];
const STEP_DURATION = 400; // ms per step

export function ReadyScreen({ onReady }: Props) {
	const [step, setStep] = useState(0);

	// Unlock AudioContext on the first user-gesture (the click/keypress that triggered this screen)
	useEffect(() => {
		unlockAudio();
	}, []);

	useEffect(() => {
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
		<div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] select-none">
			<div
				key={step}
				className="font-mono font-black tabular-nums"
				style={{
					fontSize: isGo ? "10rem" : "12rem",
					color: isGo ? "#00ffff" : "#ffffff",
					textShadow: isGo
						? "0 0 60px #00ffff, 0 0 120px #00ffff88"
						: "0 0 40px #ffffff44",
					animation: "readyPop 0.25s ease-out",
					lineHeight: 1,
				}}
			>
				{label}
			</div>
			<style>{`
				@keyframes readyPop {
					from { transform: scale(1.5); opacity: 0; }
					to   { transform: scale(1);   opacity: 1; }
				}
			`}</style>
		</div>
	);
}
