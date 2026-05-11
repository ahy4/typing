import type { SlidingWindowKPS } from "./ema";
import { createTypingState, feedKey } from "./romaji";
import type { InputEvent, Sentence } from "./types";

export const LIFE_MAX = 100;
export const LIFE_DRAIN_BASE = 0.04;
export const LIFE_DRAIN_COMBO_FACTOR = 0.6;
export const LIFE_RECOVER_CORRECT = 0.03;
export const LIFE_DRAIN_MISS = 5;
export const KEYS_PER_COMBO = 10;

// Unified state for any typing runner (player, ghost, replay).
// Components render from this; they never care about the source.
export interface RunnerState {
	sentences: Sentence[];
	sentenceIdx: number;
	typingState: ReturnType<typeof createTypingState>;
	life: number;
	combo: number;
	speed: number;
	nextHealAt: number;
	nextHealInterval: number;
}

export function createRunnerState(sentences: Sentence[]): RunnerState {
	return {
		sentences,
		sentenceIdx: 0,
		typingState: createTypingState(sentences[0]?.kana ?? ""),
		life: LIFE_MAX,
		combo: 0,
		speed: 0,
		nextHealAt: KEYS_PER_COMBO,
		nextHealInterval: KEYS_PER_COMBO,
	};
}

export function drainDelta(combo: number, dt: number): number {
	const comboFactor = combo > 0 ? LIFE_DRAIN_COMBO_FACTOR : 1;
	return -(LIFE_DRAIN_BASE * comboFactor * dt) / (1000 / 60);
}

export function applyDrain(state: RunnerState, dt: number): RunnerState {
	return {
		...state,
		life: Math.max(0, state.life + drainDelta(state.combo, dt)),
	};
}

export interface ApplyInputResult {
	state: RunnerState;
	healAmount: number;
	sentenceAdvanced: boolean;
	segmentCompleted: boolean;
}

// Pure state reducer for a single key event.
// lastWasWrong is passed explicitly so callers (player hook) can track it
// via a ref rather than reading from potentially-stale React state.
// kps is updated in-place; pass null when running offline (ghost/replay).
export function applyInput(
	state: RunnerState,
	event: InputEvent,
	kps: SlidingWindowKPS | null,
	lastWasWrong: boolean,
): ApplyInputResult {
	if (!event.correct) {
		return {
			state: {
				...state,
				life: Math.max(0, state.life + (lastWasWrong ? 0 : -LIFE_DRAIN_MISS)),
				combo: 0,
				nextHealAt: KEYS_PER_COMBO,
				nextHealInterval: KEYS_PER_COMBO,
			},
			healAmount: 0,
			sentenceAdvanced: false,
			segmentCompleted: false,
		};
	}

	kps?.update(event.time);
	const newCombo = state.combo + 1;
	const healTick =
		newCombo === state.nextHealAt ? state.nextHealInterval / KEYS_PER_COMBO : 0;
	const newNextHealAt =
		healTick > 0
			? state.nextHealAt + state.nextHealInterval + KEYS_PER_COMBO
			: state.nextHealAt;
	const newNextHealInterval =
		healTick > 0
			? state.nextHealInterval + KEYS_PER_COMBO
			: state.nextHealInterval;

	const { next, result, segmentCompleted } = feedKey(
		state.typingState,
		event.key,
	);
	const sentenceAdvanced = result === "all_complete";
	const newSentenceIdx = sentenceAdvanced
		? state.sentenceIdx + 1
		: state.sentenceIdx;
	const newTypingState = sentenceAdvanced
		? createTypingState(state.sentences[newSentenceIdx]?.kana ?? "")
		: next;

	return {
		state: {
			...state,
			sentenceIdx: newSentenceIdx,
			typingState: newTypingState,
			life: Math.min(LIFE_MAX, state.life + LIFE_RECOVER_CORRECT + healTick),
			combo: newCombo,
			speed: kps?.get(event.time) ?? state.speed,
			nextHealAt: newNextHealAt,
			nextHealInterval: newNextHealInterval,
		},
		healAmount: healTick,
		sentenceAdvanced,
		segmentCompleted:
			segmentCompleted || result === "segment_complete" || sentenceAdvanced,
	};
}
