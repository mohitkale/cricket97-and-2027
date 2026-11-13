# 0001: Ball physics without a general physics engine

- Status: **accepted** by the owner on 2026-11-13 (issue #9)
- Date: 2026-11-13

## Question

The prototype loads the Rapier rigid-body engine to simulate one ball on flat ground. Should the rebuild keep it, or use a small purpose-built ball integrator inside `src/sim`?

## Recommendation

Use the purpose-built integrator (`src/sim/ball/ball.ts`) and do not import Rapier anywhere under `src/`.

## Evidence

All numbers were measured on this repository; the scripts are in `tools/spikes/`.

| Measure | Prototype (Rapier) | Integrator |
| --- | --- | --- |
| JavaScript shipped | 4,337 kB, 1,645 kB gzipped | about 2 kB source, under 1 kB gzipped |
| Cost of one 120 Hz ball step in Node | 25 µs | 0.3 to 0.5 µs |
| Same bits in Node, Chromium, Firefox and WebKit | not tested | yes, identical fingerprint in all four |
| Works inside `src/sim` purity rules (no packages, no async start-up) | no: WebAssembly, asynchronous initialisation | yes |

**Agreement with the prototype** (`node tools/spikes/physics-compare.mjs`). Twenty deliveries (five lengths, four paces) were launched with the prototype's own launch solver and run through both systems, with the integrator set to the prototype's coefficients. Worst differences when the ball reaches the batting crease: line 0.4 cm, speed 1.1 %, arrival time one step (8 ms), height 11 cm. The height difference is largest for bouncers and comes from Rapier's different treatment of spin during the bounce and its extra linear damping, neither of which the prototype had tuned on purpose. First-bounce positions agree to within the distance the ball travels in one step.

**Cross-engine determinism** (`npm run determinism`). Twenty deliveries of two seconds each, with spin and bounces, gave the same SHA-256 of the raw float bits in Node 24, Chromium 158, Firefox 159 and WebKit 27. This holds because the integrator uses only `+ - * /` and `Math.sqrt`, which IEEE 754 defines exactly. It was tested on one Mac; other CPU architectures were not tested, though the same guarantee applies.

**Visual check.** The `ball-flight` lab scene draws five deliveries from the integrator in side view; see the capture on the pull request.

## What the integrator does

- Gravity, quadratic drag, and a Magnus term proportional to spin × velocity.
- Bounce as a rigid-sphere impulse with Coulomb friction, coupling linear and angular velocity. Side spin therefore turns the ball off the pitch, and a skidding ball picks up top spin, with no special cases.
- Each step is split at the moment of impact, so the result does not depend on where step boundaries fall.
- Surfaces are data (height, restitution, friction) looked up by position, ready for pitch and outfield profiles.

## Consequences

- The sim must not use `Math.sin`, `Math.cos`, `Math.pow`, `Math.exp`, `Math.hypot` or similar in anything that affects match state; engines may round them differently. Where trigonometry is needed, the sim will carry its own deterministic implementations. Presentation code is unaffected.
- Collisions with bat, stumps, hands and bodies are written as analytic swept tests in the sim (issues #14 and #16) instead of engine colliders.
- Stump and bail scatter is a presentation effect driven by the sim's wicket-break event; if a few small rigid bodies are wanted for it, that choice is made in the presentation layer and does not affect match state.
- Coefficients in the spike are placeholders. Issue #13 tunes them against reference deliveries and adds swing, seam movement and outfield roll.

## Not covered by this spike

Swing, seam deviation, rolling resistance, and collisions with anything except the ground. Performance in browsers was not measured, only in Node.
