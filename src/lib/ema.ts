// Exponential Moving Average for speed computation
export class EMA {
  private value: number;
  private readonly alpha: number;

  constructor(alpha = 0.3, initial = 0) {
    this.alpha = alpha;
    this.value = initial;
  }

  update(sample: number): number {
    this.value = this.alpha * sample + (1 - this.alpha) * this.value;
    return this.value;
  }

  get(): number {
    return this.value;
  }

  reset(initial = 0): void {
    this.value = initial;
  }
}

// Compute instantaneous WPM from key interval (ms)
// 5 keystrokes = 1 word
export function intervalToWpm(ms: number): number {
  if (ms <= 0) return 0;
  return (1000 / ms) * 60 / 5;
}
