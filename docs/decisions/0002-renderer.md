# 0002: Renderer, quality tiers and device detection

- Status: **accepted for the browser release** (issue #10). The owner waived physical phone benchmarking for this decision.
- Date: 2026-11-17. Accepted 2026-11-26.

## Decision

- **2027 Edition: `WebGPURenderer` (`three/webgpu`)**, with its WebGL2 fallback. On the integrated-GPU laptop at 1080p, WebGPU sustained 60 fps at the 15-character match load. Median work was 6.9 ms, compared with 34.2 ms on plain WebGL2.
- **1997 Edition: `WebGLRenderer` (`three`)**. The simpler scene can use the smaller renderer. Both editions use the same simulation.
- Keep the 350 kB gzipped JavaScript budget as the target and measure the tree-shaken playable entry when it exists. The benchmark imports the whole renderer and lives at a separate URL. If the playable entry exceeds its budget, bring the measured size and options to issue #58 before changing the budget.

The WebGPU renderer's WebGL2 path was slower than plain WebGL2 on the measured laptop. Keep the automatic quality step-down for that path. The browser release still needs responsive layout and compatibility checks. Physical phone throughput, battery and thermal performance are deferred.

## Evidence

### Download size (measured, `npm run build`)

| Renderer | three.js JavaScript, gzipped | Left of the 350 kB per-edition budget |
| --- | --- | --- |
| WebGL2 (`three`) | 197 kB | 153 kB |
| WebGPU with WebGL2 fallback (`three/webgpu`) | 314 kB | 36 kB |

These are whole-library figures, because the benchmark imports everything; the game will import by name and tree-shaking will lower both. The WebGPU build carries the node material system and both back ends. The playable entry's actual tree-shaken size is still unmeasured.

### Frame cost in desktop Chromium

The benchmark is at `/bench/` in every build, so it can be opened on a phone from a preview link. It draws 15, 30, 60 and 120 skinned load dummies (12,000 triangles, 52 bones, four bone influences per vertex, one 1024 px texture each) under one sun with a 2048 px shadow map, at the device's pixel ratio capped at 2, on three back ends in turn:

- `webgl2`: `WebGLRenderer`.
- `webgpu`: `WebGPURenderer` on WebGPU. Skipped where the browser has none.
- `webgpu-renderer-on-webgl2`: `WebGPURenderer` forced onto WebGL2, which is what devices without WebGPU would get if WebGPU were chosen.

It reports two things per step. **Work** is the time for `render()` plus waiting for the GPU to finish the frame, so it shows headroom below the display's refresh interval. **Frame** is the gap between displayed frames. The dummies are a stand-in for load, not characters.

Fifteen characters is the match load (11 fielders, 2 batters, 2 umpires). The budget is 16.7 ms per frame for 60 fps and 33.3 ms for the 30 fps phone floor.

| Device | webgl2, 15 chars | webgpu, 15 chars | webgpu-renderer-on-webgl2, 15 chars |
| --- | --- | --- | --- |
| Integrated-GPU laptop (Intel UHD 630), 1080p, work median | 34.2 ms | 6.9 ms | 42.2 ms |

**Measured 2026-11-21** on the development laptop: Intel Core i7-9750H, Intel UHD Graphics 630 (the integrated GPU; Chromium chose it over the discrete GPU), Chromium 156 through ANGLE on Metal, mains power, the benchmark window in front, deployed build of this pull request. Median **work** (render plus GPU finish) and median **frame** gap in ms; 16.7 ms is 60 fps, 33.3 ms is 30 fps.

1920 x 1080 canvas, pixel ratio 1 (the desktop budget point):

| Characters | webgl2 work / frame | webgpu work / frame | webgpu-renderer-on-webgl2 work / frame |
| --- | --- | --- | --- |
| 15 | 34.2 / 33.4 | 6.9 / 16.7 | 42.2 / 49.8 |
| 30 | 45.0 / 49.9 | 7.7 / 16.7 | 48.6 / 50.1 |
| 60 | 43.0 / 49.9 | 9.9 / 16.7 | 50.1 / 50.1 |
| 120 | 61.9 / 66.5 | 16.3 / 33.3 | 62.0 / 66.5 |

1280 x 800 canvas, pixel ratio 1:

| Characters | webgl2 work / frame | webgpu work / frame | webgpu-renderer-on-webgl2 work / frame |
| --- | --- | --- | --- |
| 15 | 22.1 / 17.3 | 5.1 / 16.7 | 28.7 / 32.8 |
| 30 | 27.9 / 33.1 | 5.9 / 16.7 | 27.9 / 33.1 |
| 60 | 30.3 / 33.3 | 7.8 / 16.7 | 32.7 / 33.3 |
| 120 | 33.1 / 33.5 | 13.0 / 16.9 | 40.9 / 49.7 |

Both back ends draw the same scene with the same settings (4x antialiasing, one 2048 px shadow map). The frame gaps, which do not depend on how work is timed, agree with the work figures: WebGPU holds 60 fps up to 60 characters at 1080p, WebGL2 does not hold it for 15. Each step's first frames include shader compilation, which shows as a single worst frame of over a second; the medians are not affected.

The earlier figures in this file, from a background pane, are withdrawn: the throttling hid the difference.

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

The laptop run does not call for new thresholds: at 1080p on WebGL2 it misses the desktop floor on most frames, so the step-down rule would move it to `phone` (30 fps floor), which it holds at 1280 x 800. Thresholds stay provisional until the browser compatibility and budget checks in M8. What each tier turns on or off is defined by the visual tasks that follow (issues #50 to #52, #58).

## Implementation

- 2027 uses three.js node materials (TSL) where custom shaders are needed across both back ends. 1997 uses `WebGLRenderer` and GLSL where needed. Shared rendering and animation code must work with both renderers.
- Keep `/bench/` as a standalone browser diagnostic. The production game entry does not import it.

## Not verified

Physical phone performance, Safari and Firefox laptop throughput, the laptop's discrete GPU, battery and thermal behaviour, and performance with final character assets. The benchmark stands in for the planned triangle and bone counts with one material and no gameplay clips.
