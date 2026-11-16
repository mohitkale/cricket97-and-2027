# 0002: Renderer, quality tiers and device detection

- Status: **proposed**. Waiting for measurements from real devices and the owner's approval (issue #10)
- Date: 2026-11-17

## Question

Should the game render with three.js's WebGL2 renderer only, or with its WebGPU renderer, which falls back to WebGL2 where WebGPU is missing? And which quality tiers does every later visual task target?

## Recommendation (draft, to be confirmed by the phone numbers)

Use the WebGL2 renderer (`WebGLRenderer`) only, for both editions, and revisit WebGPU after v1.0.

The reason that already holds without device numbers is download size. The reason that the device numbers must confirm or overturn is speed.

## Evidence

### Download size (measured, `npm run build`)

| Renderer | three.js JavaScript, gzipped | Left of the 350 kB per-edition budget |
| --- | --- | --- |
| WebGL2 (`three`) | 197 kB | 153 kB |
| WebGPU with WebGL2 fallback (`three/webgpu`) | 314 kB | 36 kB |

These are whole-library figures, because the benchmark imports everything; the game will import by name and tree-shaking will lower both. The WebGPU build stays much larger because it carries the node material system and both back ends. 36 kB would not hold the game, so choosing WebGPU means raising the JavaScript budget in `docs/PLAN.md` section 5.

### Frame cost (to be measured on real devices)

The benchmark is at `/bench/` in every build, so it can be opened on a phone from a preview link. It draws 15, 30, 60 and 120 skinned load dummies (12,000 triangles, 52 bones, four bone influences per vertex, one 1024 px texture each) under one sun with a 2048 px shadow map, at the device's pixel ratio capped at 2, on three back ends in turn:

- `webgl2`: `WebGLRenderer`.
- `webgpu`: `WebGPURenderer` on WebGPU. Skipped where the browser has none.
- `webgpu-renderer-on-webgl2`: `WebGPURenderer` forced onto WebGL2, which is what devices without WebGPU would get if WebGPU were chosen.

It reports two things per step. **Work** is the time for `render()` plus waiting for the GPU to finish the frame, so it shows headroom below the display's refresh interval. **Frame** is the gap between displayed frames. The dummies are a stand-in for load, not characters.

Fifteen characters is the match load (11 fielders, 2 batters, 2 umpires). The budget is 16.7 ms per frame for 60 fps and 33.3 ms for the 30 fps phone floor.

| Device | webgl2, 15 chars | webgpu, 15 chars | webgpu-renderer-on-webgl2, 15 chars |
| --- | --- | --- | --- |
| Mid-range Android phone | *owner to supply* | *owner to supply* | *owner to supply* |
| iPhone | *owner to supply* | *owner to supply* | *owner to supply* |
| Integrated-GPU laptop, browser tab in front | *owner to supply* | *owner to supply* | *owner to supply* |

**Indicative only, not a valid measurement:** one run on the development laptop (Intel UHD Graphics 630, 2048 x 1536 px canvas) inside a hidden browser pane that throttles frames. Work, median, in ms:

| Characters | webgl2 | webgpu | webgpu-renderer-on-webgl2 |
| --- | --- | --- | --- |
| 15 | 18.9 | 30.4 | 31.3 |
| 30 | 22.0 | 24.5 | 31.7 |
| 60 | 27.0 | 28.3 | 34.9 |
| 120 | 38.0 | 40.1 | 42.7 |

Read with care: the pane was in the background, runs varied by several milliseconds, and the WebGPU 15-character row is slower than its 30-character row, which is noise. What it suggests, and the real runs must check: WebGPU was not faster for this scene, the WebGPU renderer's WebGL2 fallback was the slowest path, and cost grew slowly with character count, so this integrated GPU is limited by pixels (resolution and shadows) more than by skinning.

## Quality tiers

Three tiers, matching the budget columns in `docs/PLAN.md` section 5.

| Tier | For | Budget column |
| --- | --- | --- |
| `phone-low` | Phones with 4 GB of memory or less, or 4 cores or fewer | 2027 phone tier, with the cheapest settings (no shadow map, lower resolution scale, LOD1 characters) |
| `phone` | Other phones | 2027 phone tier |
| `desktop` | Laptops, desktops and tablets | 2027 desktop tier |

The 1997 Edition has one budget and runs the same on every tier.

**Assignment** (`src/platform/tier.ts`, with tests):

1. Detect from signals available before rendering: a touch-first device with a short screen side under 600 CSS px is a phone; reported memory or core count splits `phone-low` from `phone`. A device that reports neither (all iPhones) starts as `phone`.
2. Step down from measurement: if more than a tenth of recent frames miss the tier's floor (30 fps on phones, 60 on desktop), drop one tier. This is what catches weak devices that detection cannot see.
3. The player's choice in settings overrides both and is remembered.

The thresholds are provisional and should be adjusted once the device table above is filled in. What each tier turns on or off is defined by the visual tasks that follow (issues #50 to #52, #58).

## Consequences if accepted

- `docs/PLAN.md` already says "WebGL2 baseline"; no change there.
- Materials and effects are written for `WebGLRenderer` (GLSL where custom shaders are needed), not the node material system.
- `/bench/` and `src/lab/bench/` are removed from the build once this decision is accepted.
- WebGPU is reconsidered after v1.0, when three.js's WebGPU build may be smaller and device coverage wider.

## Not covered

Real phone measurements (the purpose of the table above), battery and heat over a long session, and real character assets: the dummies have the planned triangle and bone counts but one material and no clips.
