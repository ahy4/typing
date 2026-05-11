# typing — Codebase Rules

## Input Abstraction: RunnerState

All typing runners (player, ghost, replay) share the same `RunnerState` interface
(`src/lib/runnerState.ts`). Components render from this and never branch on the source.

### RunnerState

```ts
interface RunnerState {
  sentences: Sentence[];
  sentenceIdx: number;
  typingState: ReturnType<typeof createTypingState>;
  life: number;
  combo: number;
  speed: number;
  nextHealAt: number;
  nextHealInterval: number;
}
```

### Rules

1. **Game logic lives in `runnerState.ts` only.**
   `applyInput` and `applyDrain` are the single source of truth for HP, combo, and
   typing-state transitions. Never reimplement these calculations elsewhere.

2. **`applyInput` for every key event, everywhere.**
   - Live player: `handleKey` in `useGameEngine.ts` calls `applyInput`.
   - Ghost precompute: `precomputeGhostTimeline` calls `applyInput` in a loop.
   - Replay scrubbing: `reconstructAt` in `ReplayPlayer.tsx` calls `applyInput` in a loop.
   Adding a new runner type means looping `applyInput` over its events — nothing else.

3. **Ghost state is `RunnerState | null` in `GameState`.**
   Access ghost fields as `state.ghost?.life`, `state.ghost?.speed`, etc.
   Never add flat scalar aliases (`ghostLife`, `ghostSpeed`, …) to `GameState`.

4. **Components accept `RunnerState`, not raw scalars.**
   When a component needs to display runner data (HP, speed, progress), pass the whole
   `RunnerState` object. This keeps the rendering path identical for player and ghost.

5. **`lastWasWrong` stays a ref in the player hook.**
   React state can be stale between synchronous key events. The player's
   `lastWasWrongRef` tracks consecutive misses via a ref and is passed explicitly to
   `applyInput`. Ghost/replay loops track it as a local variable.

6. **Sentence refill is player-only.**
   Only `handleKey` may extend `player.sentences` at runtime. Ghost and replay runners
   use a fixed sentence list (from the recorded `ReplayData`).

## File Map

| File | Responsibility |
|---|---|
| `src/lib/runnerState.ts` | `RunnerState` type, `applyInput`, `applyDrain`, all HP/combo constants |
| `src/hooks/useGameEngine.ts` | React hook; player keyboard input, ghost precompute, game lifecycle |
| `src/components/GameScreen.tsx` | Live game UI; reads `state.player` and `state.ghost` |
| `src/components/ReplayPlayer.tsx` | Replay scrubbing UI; uses `reconstructAt` via `applyInput` |
| `src/lib/romaji.ts` | Kana→romaji parsing and `feedKey` state machine |
| `src/lib/types.ts` | Shared types (`InputEvent`, `ReplayData`, `Sentence`, …) |
