# src/anim

Skeleton spec, clip loading, event markers, state machine, blending, time-warp to sim events, two-bone IK, look-at. Motion comes from clips; code here never invents a cricket action.

| File | What it does |
| --- | --- |
| `skeleton.ts` | The shared skeleton: bones, units, stature, LOD targets, sockets (see `docs/skeleton.md`) |
| `clips.ts` | `markClip()`: finds foot plants and the in-place ground speed in a clip; authored markers (`release`, `contact`, …) in `MARKERS` |
| `warp.ts` | `warpRate()` lands a marker on a predicted sim event; `blendGaits()` speed-matches locomotion clips. Pure |
| `ik.ts` | `solveTwoBone()` (bend, swing, then twist toward a pole) and `lookAt()`. No allocation per call |
| `animator.ts` | `Animator`: base layer (idle, speed-matched gaits, one-shot actions with time-warp), optional upper-body layer, foot locking, both hands on the bat handle, and head look-at. Readouts for foot drift and both grip errors |
| `retarget.ts` | Captured pose landmarks to joint rotations (decision 0003) |

See it at `/lab/?scene=anim`. Select the shared rig or a fitted character, the state and clip, and the batting hand in Batting. Use the transport to pause, scrub or slow down.

## Measured (`animator.test.ts`)

- Planted-foot drift with locking: under 2 cm at the walk's own speed, 0.8x and 1.25x.
- The in-place jog and sprint now use the root-motion travel from the corresponding CC0 Quaternius takes to detect plants. Both feet are marked at their authored speed, about 5.36 m/s for the jog and 8.25 m/s for the sprint. The test also checks a rig turned 90 degrees.
- The ready stance (#92) keeps both wrists within 1 cm of their grip references and both planted feet within 2 cm over the whole loop, in raw and runtime playback. Out-of-reach targets preserve the authored arm pose. Full strokes and deliveries are separate clips in #21.
- Both wrists reach a separately positioned bat within 1 cm in the test fixture. When the bottom wrist carries the bat, the runtime measures that grip and solves the free wrist. The limb solver reaches the same target within 2 mm on the mirrored rig.
- The runtime uses plant intervals from the active idle, gait or one-shot clip. Time-warp is measured from the start of each simulation step. When a reachable marker falls inside the step, the rest of the step plays at normal speed.
- IK reads the world matrices already set by the pose update and refreshes each limb after a correction. In a 600-frame walking probe with a look target and a bat, calls to `updateWorldMatrix` fell from 93,105 to 17,620.
- The runtime reuses the gait blend while ground speed holds steady and keeps the limb solver's intermediate scalars local. After 100,000 warm-up frames per case, Chromium's heap profiler sampled 4,000 frames per case at a 256-byte interval, including samples collected by GC. It attributed zero bytes to the project runtime and IK stacks during the stance, steady walking with foot correction and gaze, and a separately positioned bat. The mixer still allocated during track interpolation. The result covers warmed, fixed-speed cases and the sampled browser. Reproduce it with `node tools/capture/animation-allocations.ts`.
- Delegated review covered `anim-bat-male` and `anim-bat-female-left`. The Chromium check used the selectors and read the full stance on both fits. Worst foot drift was 0.02 cm and top wrist error was 0.02 cm, with the bottom wrist reading below 0.01 cm on both.
