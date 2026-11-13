# Capture harness

Turns a named scenario into `captures/<name>/sheet.png` (12 frames, deterministic on one machine) and `clip.webm`.

```sh
npx playwright-core install chromium-headless-shell   # once
npm run capture -- --list
npm run capture -- --scenario pitch-plan
```

Two kinds of scenario, both declared in `scenarios.ts`:

- **lab**: a scene from `src/lab/scenes`. The harness calls `renderAt(t)`; fast, and the kind all new work should use.
- **page**: any page, driven under a virtual clock (`virtual-time.ts` replaces time, animation frames, timers and `Math.random`). Used for the prototype under `/legacy/`. Slow, about three minutes each, because every virtual frame renders in software; run these locally, not in CI.

The browser renders with SwiftShader so that WebGL output does not vary from run to run. Sheets from different machines may differ by a few pixels; compare hashes only on the same machine.
