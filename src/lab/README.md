# src/lab

Development-only pages: animation viewer and the scenario runner used by the capture harness. Never shipped in production bundles.

## Using the lab

- Run `npm run dev` and open `/lab/` for the list of scenes, or `/lab/?scene=<name>` to loop one. Add `&t=1.25` to freeze at a time and `&seed=3` to change the seed.
- A scene implements `LabScene` from `scene.ts`: a `duration` and a `renderAt(t)` that draws the scene exactly as it is at time `t`. Register it in `scenes/index.ts`.
- Scenes must be deterministic: the same seed and time always give the same pixels. No wall clock, no `Math.random`.
- The capture harness (`tools/capture`) calls `renderAt` for evenly spaced times and builds a contact sheet and a clip: `npm run capture -- --scenario <name>`.
