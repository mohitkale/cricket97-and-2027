# src/sim

The cricket simulation. Pure TypeScript: no three.js, no DOM, no timers, no `Date.now()`, no `Math.random()`. Imports nothing outside this folder. Deterministic for a given seed and input log. Enforced by `src/architecture.test.ts`.

Modules planned: clock, prng, ball, contact, agents, fielding, running, rules, ai, match, events.
