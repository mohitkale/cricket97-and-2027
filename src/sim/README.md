# src/sim

The cricket simulation. Pure TypeScript: no three.js, no DOM, no timers, no `Date.now()`, no `Math.random()`. Imports nothing outside this folder. Deterministic for a given seed and input log. Enforced by `src/architecture.test.ts`.

Modules planned: clock, prng, ball, contact, agents, fielding, running, rules, ai, match, events.

Relative imports inside `sim` end in `.ts` so the same files run under plain Node (`node file.ts`) for headless matches and tools.

Floating point: use only `+ - * /` and `Math.sqrt` in code that affects match state. `Math.sin`, `Math.pow`, `Math.hypot` and similar are not guaranteed to give the same bits in every browser; see `docs/decisions/0001-physics.md`.
