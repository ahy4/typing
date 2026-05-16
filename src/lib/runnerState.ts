import type { SlidingWindowKPS } from "./ema";
import { createTypingState, feedKey } from "./romaji";
import type { Difficulty, InputEvent, Sentence } from "./types";

export const LIFE_MAX = 400;
export const LIFE_DRAIN_BASE = 0.08;
export const LIFE_RECOVER_CORRECT = 0.12;
export const LIFE_DRAIN_MISS = 10;
export const KEYS_PER_COMBO = 9;
export const COMBO_HEAL_MULTIPLIER = 4;

export interface DifficultyParams {
	drainBase: number;
	recoverCorrect: number;
	drainMiss: number;
}

export const DIFFICULTY_PRESETS: Record<Difficulty, DifficultyParams> = {
	easy: { drainBase: 0.04, recoverCorrect: 0.18, drainMiss: 5 },
	normal: { drainBase: 0.08, recoverCorrect: 0.12, drainMiss: 10 },
	hard: { drainBase: 0.15, recoverCorrect: 0.08, drainMiss: 18 },
};

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

export function drainDelta(
	dt: number,
	params: DifficultyParams = DIFFICULTY_PRESETS.normal,
): number {
	return -(params.drainBase * dt) / (1000 / 60);
}

export function applyDrain(
	state: RunnerState,
	dt: number,
	params: DifficultyParams = DIFFICULTY_PRESETS.normal,
): RunnerState {
	return {
		...state,
		life: Math.max(0, state.life + drainDelta(dt, params)),
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
	params: DifficultyParams = DIFFICULTY_PRESETS.normal,
): ApplyInputResult {
	if (!event.correct) {
		return {
			state: {
				...state,
				life: Math.max(0, state.life + (lastWasWrong ? 0 : -params.drainMiss)),
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
		newCombo === state.nextHealAt
			? (state.nextHealInterval / KEYS_PER_COMBO) * COMBO_HEAL_MULTIPLIER
			: 0;
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
			life: Math.min(LIFE_MAX, state.life + params.recoverCorrect + healTick),
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
