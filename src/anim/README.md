# src/anim

Skeleton spec, clip loading, event markers, state machine, blending, time-warp to sim events, two-bone IK, look-at. Motion comes from clips; code here never invents a cricket action.

| File | What it does |
| --- | --- |
| `skeleton.ts` | The shared skeleton: bones, units, stature, LOD targets, sockets (see `docs/skeleton.md`) |
| `clips.ts` | `markClip()`: finds foot plants and the in-place ground speed in a clip; authored markers (`release`, `contact`, …) in `MARKERS` |
| `warp.ts` | `warpRate()` lands a marker on a predicted sim event; `blendGaits()` speed-matches locomotion clips. Pure |
| `ik.ts` | `solveTwoBone()` (bend, swing, then twist toward a pole) and `lookAt()`. No allocation per call |
| `animator.ts` | `Animator`: base layer (idle, speed-matched gaits, one-shot actions with time-warp), optional upper-body layer, then foot locking while planted, top hand on the bat handle, head look-at. Readouts for foot drift and hand error |
| `retarget.ts` | Captured pose landmarks to joint rotations (decision 0003) |

See it at `/lab/?scene=anim` (`&state=walk|idle|bat`, `&clip=<name>`); every lab scene has pause, scrub and slow motion.

## Measured (`animator.test.ts`)

- Planted-foot drift with locking: under 2 cm at the walk's own speed, 0.8x and 1.25x.
- Top hand on the bat handle: within 1 cm on every frame where the handle is within the arm's reach. If the handle is out of reach, the runtime preserves the authored arm pose and the lab reports the failed grip. A complete batting stance still waits for clip set A (issue #21).
- IK reads the world matrices already set by the pose update and refreshes each limb after a correction. In a 600-frame walking probe with a look target and a bat, calls to `updateWorldMatrix` fell from 93,105 to 17,620.
- Allocation per frame after warm-up: three.js's `AnimationMixer` itself allocates about 0.4 to 1.7 kB a frame on these clips; the runtime adds about 0.1 to 0.6 kB on top. The update loop reuses its working state and skips unreachable grip solves. The goal of zero is not met; the test guards the added part under 1 kB.
