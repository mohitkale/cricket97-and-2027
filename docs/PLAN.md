# Master plan

This is the stable reference every task links to. The live task list is the GitHub issues, grouped by milestone. If an issue and this file disagree, the issue wins and this file gets fixed in the same PR.

## 1. What we are building

A free, open-source browser cricket game with two editions over one match engine:

- **1997 Edition** — an original retro game in the style of late-90s PC sports titles: low resolution, low-poly players, chunky HUD, sparse dry commentary, fast arcade matches. Nostalgia.
- **2027 Edition** — a modern broadcast-style presentation: believable athletes, a living stadium, TV cameras and graphics, layered crowd and two-voice commentary. The "wow".

Both run on laptop and phone browsers, with no install and no account.

**Originality rule.** This is an original game in a genre. Nothing is copied from any commercial cricket title: no names, logos, menus, fonts, art, music, commentary lines or recordings. Players and sponsors are fictional by default; rosters are user-editable data.

### Player promise (the test for every decision)

1. A first-time player faces their first ball within 15 seconds and two taps of opening the page.
2. They understand how to bat within 30 seconds, without reading anything longer than one line.
3. Every input produces a visible response within 50 ms, and the game always tells them why something happened (early, late, edged, perfect).
4. Bodies move like cricketers: feet do not slide, the bat meets the ball, the ball leaves the hand.
5. It runs at a steady frame rate on a mid-range phone.

## 2. Why the previous attempt felt cartoonish and robotic

Findings from reviewing the code on `main` at the time this plan was written (now referred to as *legacy*):

| Finding | Consequence |
| --- | --- |
| Players are boxes, capsules and a 656-vertex generated body, posed by code (IK and sine waves). There are no authored or captured animation clips. | Mannequin look, stiff motion. No amount of tuning fixes this; cricket technique has to come from animation data. |
| One 136 KB `src/main.js` owns scene, input, rules, audio, UI and replay. | Every change risks everything else; agents cannot hold it in context. |
| Tests assert numbers (limb lengths, bounce distances). Nothing checks what the screen looks like or how it feels to play. | 140 passing tests and a "complete" audit, for a game the owner does not want to publish. |
| Outcomes are decided by timers and probabilities, then animation is played next to them. | The swing does not cause the shot; the catch happens before the hand arrives. |
| A 4.3 MB physics engine (1.6 MB gzipped) simulates one ball and a flat plane. | Slow first load on phones for very little benefit. |
| The match view is a canvas inside a scrolling page with a score panel underneath. Many keys, many buttons. | Not a game screen; hard to learn. |
| Real player names, real sponsor logos, a football-crowd recording. | Legal risk for a public project. |

The old documents are kept in `docs/legacy/` for reference only. **Do not treat their "complete" statements as true.**

## 3. Principles

1. **The sim decides, the animation sells.** A headless, deterministic simulation is the only source of truth. It predicts events ahead of time (release, bounce, contact, catch, wicket break). Presentation picks clips and warps them in time and space so that hands, bats and feet arrive at those events.
2. **Vertical slice before breadth.** One perfect ball (run-up, release, bounce, stroke, contact) must pass the owner's feel gate before any work on full matches, stadiums or commentary.
3. **Motion comes from clips.** Skeletal animation authored or captured by people, on one shared skeleton. Code blends, warps and applies IK corrections; code never invents a cover drive.
4. **Looks are verified by looking.** Every PR that changes what the player sees attaches captures from the capture harness. Issues labelled `gate:owner-feel` close only when the owner has played the preview build.
5. **Two skins, one game.** Editions differ in data and presentation: rule set, tuning, renderer, assets, HUD, audio. They never fork the sim.
6. **Phone first.** Budgets below are for a mid-range phone. Desktop gets extra quality, not a different game.
7. **Small PRs.** One issue, one PR, under about 600 changed lines of code where possible (assets excluded).

## 4. Target architecture

```
src/
  sim/         Pure TypeScript. No three.js, no DOM, no Date.now(), no Math.random().
               clock, prng, ball, contact, agents, fielding, running, rules, ai, match, events
  game/        Orchestration: owns a sim instance, turns input into sim commands,
               exposes state + predicted events to presentation. Save/resume, replay log.
  anim/        Skeleton spec, clip loading, event markers, state machine, blending,
               time-warp to sim events, two-bone IK, look-at.
  render/      Shared three.js helpers: asset loading, quality tiers, capture hooks.
  editions/
    1997/      Retro renderer, models, HUD, audio set, rules + tuning data.
    2027/      Modern renderer, stadium, crowd, cameras, graphics, audio set, rules + tuning data.
  ui/          Menus, setup, tutorial, settings. DOM over a full-bleed canvas.
  audio/       Web Audio engine, commentary engine.
  platform/    Input (keyboard, touch, gamepad), storage, PWA, device tier detection.
  lab/         Dev-only pages: animation viewer, scenario runner used by the capture harness.
assets/src/    Source art (.blend, raw clips, audio masters) with licence records.
public/assets/ Built, compressed runtime assets. Generated; never hand-edited.
legacy/        The previous game, kept runnable for reference until the slice replaces it.
```

Import rule, enforced by lint: `sim` imports nothing outside `sim`. `game` imports `sim`. Everything else may import `game`, never the reverse.

### Simulation facts

- Fixed step 120 Hz, rendering interpolates. Seeded PRNG. Same seed and inputs give the same match, byte for byte, in Node and in every browser.
- SI units. Pitch 20.12 m between stumps, wicket 0.711 m high and 0.2286 m wide, ball radius 0.036 m and mass 0.156 kg.
- The ball uses a purpose-built integrator (drag, swing, Magnus, pitch and outfield response) with analytic swept collision against bat, stumps, hands and ground. See the physics decision issue; the default direction is to remove the general rigid-body engine.
- A full T20 match simulates headless in well under one second. That is what makes balance tests and AI tuning cheap.

### Animation facts

- One humanoid skeleton for every player, umpire and edition. Clips carry named event markers (`plant`, `release`, `contact`, `catch`, `throw`).
- Runtime: three.js `AnimationMixer`, a layered state machine, speed-matched locomotion blending, time-warping to predicted sim events, IK for foot planting and both hands on the bat.
- The 1997 Edition plays the same clips on a low-poly model, sampled at a low stepped frame rate. One animation library serves both editions.
- Measurable feel checks, run as tests against the lab scenes: planted foot drift under 2 cm, hand-to-ball distance at release under 3 cm, bat sweet spot to ball at contact under 5 cm.

### Stack

| Area | Choice |
| --- | --- |
| Language, build | TypeScript (strict), Vite |
| Rendering | three.js. WebGL2 baseline; WebGPU only if the renderer decision issue says so |
| Tests | Vitest for sim and logic; Playwright (Chromium only) for the capture harness, never in the required CI path |
| Lint, format | Biome |
| Assets | Blender run headless from scripts, glTF Transform (meshopt, KTX2), audio sprites |
| Hosting | GitHub Pages, with per-PR preview folders |

## 5. Budgets

| | 1997 Edition | 2027 Edition, phone tier | 2027 Edition, desktop tier |
| --- | --- | --- | --- |
| Frame rate | 60 fps | 30 fps floor, 60 target | 60 fps at 1080p on integrated graphics |
| Draw calls | 60 | 120 | 300 |
| Triangles on screen | 40 k | 250 k | 1 M |
| Download before first ball | 3 MB | 8 MB | 8 MB, more streamed |
| JavaScript per edition, gzipped | 350 kB | 350 kB | 350 kB |
| Input to visible response | 50 ms | 50 ms | 50 ms |

CI, required path: install, lint, typecheck, unit tests, build, size check. **Under 2 minutes, hard timeout 5.** Anything slower (captures, benchmarks) runs only on request.

## 6. Assets and licences

- Code: MIT. Assets: CC0 or CC BY 4.0 only, each with an entry in `ASSETS.md` (source, author, licence, changes). A test fails the build when a file under `assets/` or `public/assets/` has no entry.
- No real player names, faces or voices. No real sponsor or board logos. No audio or footage taken from broadcasts or other games.
- Voices: recorded by contributors, or generated offline with a model whose licence allows redistribution of output. Never an imitation of a real commentator.

## 7. Milestones

| # | Milestone | Outcome | Gate |
| --- | --- | --- | --- |
| M0 | Foundations and guardrails | Clean legal baseline, toolchain, layout, capture harness, asset pipeline, previews, key decisions made | Decisions recorded |
| M1 | Simulation core | Headless deterministic cricket: ball, contact, rules, movement, AI, balance tests | 200 seeded matches inside realistic ranges |
| M2 | One perfect ball | Real skeletal characters; a delivery and a stroke that look and feel right; first controls and camera | **Owner feel gate** |
| M3 | A full over | Bowling, fielding, keeping, running, umpires, ball-to-ball flow | **Owner feel gate** |
| M4 | Full match and onboarding | Menus, tutorial, setup, match flow, input layer, audio and commentary engines | First-timer test |
| M5 | 1997 Edition, v0.5 | Retro renderer, models, HUD, audio, rules. First public release | **Owner look gate** |
| M6 | 2027 Edition visuals | Hero characters, stadium, pitch, crowd, lighting | **Owner look gate** |
| M7 | 2027 broadcast and sound | Camera director, replays, graphics, ball tracking, crowd audio, commentary voices | Owner review |
| M8 | Mobile, performance, accessibility | Budgets enforced, PWA, real-device matrix | Budgets met on real phones |
| M9 | v1.0 | Cross-browser QA, docs, licence audit, launch | Launch checklist |

M8 tasks may start as soon as M2 closes. M5 and M6 can proceed in parallel once M4 closes.
