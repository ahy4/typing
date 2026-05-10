// Sliding window KPS: counts keystrokes within the last windowMs milliseconds
export class SlidingWindowKPS {
	private readonly windowMs: number;
	private timestamps: number[] = [];

	constructor(windowMs = 2000) {
		this.windowMs = windowMs;
	}

	update(timestamp: number): void {
		this.timestamps.push(timestamp);
		const cutoff = timestamp - this.windowMs;
		let i = 0;
		while (
			i < this.timestamps.length &&
			(this.timestamps[i] ?? Infinity) < cutoff
		)
			i++;
		if (i > 0) this.timestamps.splice(0, i);
	}

	get(now: number): number {
		const cutoff = now - this.windowMs;
		let count = 0;
		for (const ts of this.timestamps) {
			if (ts >= cutoff) count++;
		}
		return count / (this.windowMs / 1000);
	}

	reset(): void {
		this.timestamps = [];
	}
}
