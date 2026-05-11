// Web Audio API synthesized sounds
let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
	if (!ctx) ctx = new AudioContext();
	return ctx;
}

function playTone(
	freq: number,
	duration: number,
	gain: number,
	type: OscillatorType = "square",
): void {
	try {
		const ac = getCtx();
		const osc = ac.createOscillator();
		const g = ac.createGain();
		osc.connect(g);
		g.connect(ac.destination);
		osc.type = type;
		osc.frequency.setValueAtTime(freq, ac.currentTime);
		g.gain.setValueAtTime(gain, ac.currentTime);
		g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
		osc.start(ac.currentTime);
		osc.stop(ac.currentTime + duration);
	} catch {
		// audio not available
	}
}

// Call once on a user-gesture to unlock AudioContext before the game starts
export function unlockAudio(): void {
	try {
		const ac = getCtx();
		if (ac.state === "suspended") ac.resume();
		// Play a zero-gain buffer so the context is truly unlocked
		const buf = ac.createBuffer(1, 1, 22050);
		const src = ac.createBufferSource();
		src.buffer = buf;
		src.connect(ac.destination);
		src.start(0);
	} catch {
		// audio not available
	}
}

export function playKeyTap(combo: number): void {
	const base = 800 + Math.min(combo, 20) * 10;
	playTone(base, 0.04, 0.08, "square");
}

export function playMiss(): void {
	playTone(150, 0.12, 0.15, "sawtooth");
}

export function playSegmentComplete(combo: number): void {
	const freq = 1000 + combo * 20;
	playTone(freq, 0.08, 0.12, "sine");
	setTimeout(() => playTone(freq * 1.25, 0.06, 0.08, "sine"), 60);
}

export function playGameOver(): void {
	playTone(300, 0.1, 0.15, "sawtooth");
	setTimeout(() => playTone(200, 0.15, 0.12, "sawtooth"), 120);
	setTimeout(() => playTone(150, 0.25, 0.1, "sawtooth"), 260);
}

export function playComboMilestone(combo: number): void {
	const freq = 500 + combo * 5;
	playTone(freq, 0.05, 0.1, "sine");
	setTimeout(() => playTone(freq * 1.5, 0.05, 0.08, "sine"), 50);
	setTimeout(() => playTone(freq * 2, 0.08, 0.06, "sine"), 100);
}

// step: 0="3", 1="2", 2="1", 3="GO!"
export function playCountdownStep(step: number): void {
	if (step < 3) {
		// 3, 2, 1: short tick, pitch rises with each step
		const freq = 440 + step * 110;
		playTone(freq, 0.08, 0.12, "sine");
	} else {
		// GO!: bright two-tone fanfare
		playTone(880, 0.15, 0.14, "sine");
		setTimeout(() => playTone(1100, 0.12, 0.1, "sine"), 40);
	}
}
