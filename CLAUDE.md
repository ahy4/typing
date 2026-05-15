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

7. **Replay renders via `GameScreen`, not a separate layout.**
   `ReplayPlayer` owns only replay-specific logic (seek state, RAF playback, sound,
   `reconstructAt`). All UI — HP bar, typing display, combo bars, gauge, keyboard — is
   provided by `GameScreen` through three slot props:
   - `header` — REPLAY banner + sentence progress + aggregate stats
   - `rightPanel` — vertical time-progress bar (replaces the ghost HP bar)
   - `footer` — seek slider + play/pause + back button
   Never reimplement the game layout inside `ReplayPlayer`. Any new element added to
   `GameScreen` is automatically available in replay for free.

## File Map

| File | Responsibility |
|---|---|
| `src/lib/runnerState.ts` | `RunnerState` type, `applyInput`, `applyDrain`, all HP/combo constants |
| `src/hooks/useGameEngine.ts` | React hook; player keyboard input, ghost precompute, game lifecycle |
| `src/components/GameScreen.tsx` | Game UI for both live play and replay; accepts `player: RunnerState` + slot props |
| `src/components/ReplayPlayer.tsx` | Replay logic only (`reconstructAt`, seek, sound); renders via `GameScreen` slots |
| `src/lib/romaji.ts` | Kana→romaji parsing and `feedKey` state machine |
| `src/lib/types.ts` | Shared types (`InputEvent`, `ReplayData`, `Sentence`, …) |
