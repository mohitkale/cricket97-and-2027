# Cricket gameplay: physics and human movement review

Reviewed: 1 November 2026. Scope: source review, a short local browser smoke test, existing tests, production build, public package metadata, and primary-source research. This is an implementation recommendation; gameplay and dependencies were not changed.

## Recommendation

Keep **`@dimforge/rapier3d-compat` 0.21.0** with Three.js 0.187.0. Both are already installed. Use Rapier for collision and rigid-body simulation, a game-specific character motor for player movement, and Three.js animation plus inverse kinematics (IK) for believable poses. Cricket forces, shot technique, fielding decisions, and dismissal rules remain application code.

The main limitation is the current integration: only the ball and one flat ground collider are in Rapier. Replacing the engine would leave the existing scripted human movement largely unchanged.

## What makes the current game feel robotic

References use the source line numbers at review time. The long lines in `main.js` contain several related operations.

| Priority | Evidence | Effect | Recommended change |
| --- | --- | --- | --- |
| High | `main.js:145` sets facing directly; `main.js:366` moves pursuing fielders at 7.5 or 6.5 units/s immediately. | Instant starts, stops, and turns; no sense of weight or momentum. | Store velocity, acceleration, braking, and angular velocity per player. Limit turn rate and reduce speed for sharp changes of direction. |
| High | `main.js:365` uses one `sin(now * .015)` stride for pursuing fielders; `main.js:252` uses one shared runner stride. | Synchronized feet, sliding, and gait unrelated to actual distance travelled. | Advance each player's gait phase from ground distance and stride length. Blend idle, jog, sprint, brake, and turn; keep planted feet stable. |
| High | `main.js:149` straightens elbows and scales reaching arms; `main.js:154` scales batting arms to the grip. | Arms change length instead of bending naturally. | Use a two-segment arm solver with elbow direction and joint limits. Keep segment lengths fixed. Adjust the torso or feet when the target is out of reach. |
| High | `main.js:370` triggers catches/pickups within 1.4 horizontal units and below 2.9 vertical units; `main.js:377` pulls a caught ball to the hand over 420 ms. | Possession can begin before the hand reaches the ball. | Detect the ball entering a reachable hand/glove volume during a valid animation window. Attach only on confirmed possession; support misses and bobbles. |
| High | `main.js:241`–`249` judges contact at a scheduled time and creates velocity from `shots.js:29`; no bat collider exists. | The visible bat swing does not determine actual impact. | Sweep the animated bat through each simulation step and calculate contact from relative ball/bat velocity, face direction, and impact offset. Keep difficulty assistance explicit. |
| Medium | `main.js:231` multiplies delivery travel time by 2.1; `main.js:351` directly sets the delivery position using `deliveryHeight()`. | Displayed pace is slowed and pitch bounce/swing are prescribed curves. | Give the released ball position, linear/angular velocity, and seam state. Simulate flight and pitch impact continuously. Apply any assisted time scaling consistently across the match clock. |
| Medium | `running.js:5` gives each run a constant 2.7-second duration; `main.js:252` linearly interpolates both batters and instantly reverses facing. | No launch, acceleration, braking, or physical turn at the crease. | Use the same movement motor as fielders, with crease approach, bat grounding, pivot, and push-off phases. |
| Medium | `main.js:380` creates an accuracy boolean with a 65% chance; `running.js:25` judges run-outs from progress; `main.js:387` checks after a 650 ms receive animation. | Throw accuracy does not change its visible path; run-out timing follows a timer. | Vary actual release direction and speed, simulate the return, and judge the threatened batter's grounded bat/foot when the wicket is broken. |
| Medium | `main.js:364` predicts a target to rank fielders, but `main.js:366` moves them toward the current ball position. | Chasers follow the ball rather than commit to a plausible intercept. | Predict time-to-intercept from the ball path and each fielder's acceleration/turning limits. Add a reaction delay and stable lead/backup assignments. |
| Medium | `main.js:96` animates stumps after a dismissal has already been decided. | Wicket motion does not follow the impact. | Add simple stump/bail colliders and impact-driven motion; retain cricket-specific wicket validity checks. |

The existing low-poly style can remain. Better timing, posture, foot contact, and weight transfer will improve it before higher-detail models are necessary.

## Simulation foundations to fix

1. **Use one simulation clock.** `main.js:342` clamps elapsed time to 0.05 seconds for ball/player motion, while delivery and animation phases use elapsed wall time. A slow frame can advance those systems by different amounts. `physics.js:27` takes substeps of at most 1/120 second, including a variable remainder; it is not a fixed-step accumulator. Start with a fixed 120 Hz simulation, interpolate rendering, and profile on mobile. Define a bounded catch-up policy and apply it to all match systems. This rate is a starting point, not a performance guarantee. [Rapier integration parameters](https://rapier.rs/docs/user_guides/javascript/integration_parameters/)

2. **Keep physics state authoritative while the ball is free.** `physics.js:23`–`24` writes position and velocity into the rigid body on every call. Transition ownership explicitly: attached to hand → released dynamic body → confirmed possession. Read the free ball's transform back into Three.js. A bat impact changes its velocity through an impulse rather than restarting its simulated path.

3. **Agree on scale.** The physics ball radius is 0.22 (`physics.js:13`), the rendered radius is 0.27 (`main.js:163`), and players are roughly 3.7 units tall. The pitch is approximately metre-scaled, so these are stylized proportions. Decide on a coherent metre-based physics world; visual readability can use a separate marker/trail. For reference, the ICC's published men's ball specification gives a circumference of 22.4–22.9 cm, equivalent to about a 0.036 m radius. The existing 0.16 kg mass is already plausible. Do not shrink only the ball: reach, bats, wickets, pitch geometry, cameras, and tolerances need coordinated calibration. [ICC ball specification](https://www.icc-cricket.com/news/mens-odi-match-clause-4-the-ball)

4. **Protect fast contact.** Enable ball CCD for interactions with moving bodies and test swept bat/ball collision at maximum pace, including rotating bats and thin edges. At 150 km/h the ball travels about 0.35 m in a 1/120-second step, much farther than a regulation ball's diameter. Small timesteps alone are insufficient. Rapier documents limitations even when two moving bodies have CCD, so validate these cases rather than assuming that one option solves every contact. [Rapier CCD](https://rapier.rs/docs/user_guides/javascript/rigid_body_ccd/)

5. **Separate pitch and outfield response.** The current single collider has one friction/restitution pair, plus a custom constant rolling deceleration (`physics.js:9` and `physics.js:38`). Add pitch/outfield surface profiles, spin-dependent impact, and tuned rolling resistance. Match collision surfaces to rendered ground heights.

6. **Preserve replays during the transition.** Current replays capture at most roughly 18 frames/s and select discrete frames (`main.js:264`, `268`). Interpolate recorded poses first. Later record simulation events, ball state, and animation phases. Seed gameplay randomness for reproducible tests. A fixed timestep by itself does not make unseeded gameplay reproducible or guarantee cross-platform determinism; Rapier provides different builds for different determinism requirements. [Official package build variants](https://www.npmjs.com/package/@dimforge/rapier3d-compat)

## Library comparison

Versions and publication dates below were read directly from the public npm registry on the review date. They are JavaScript package versions, which differ from the native engine's version numbers. These are integration assessments, not comparative performance benchmarks.

| Library | Maintenance evidence | Three.js fit and tradeoff | Decision |
| --- | --- | --- | --- |
| **Rapier** | `@dimforge/rapier3d-compat` **0.21.0**, published **25 September 2026**; Apache-2.0. Dimforge published a technical progress report on 25 October 2026. | Already integrated and bundled locally. Rigid bodies, joints, scene queries, CCD, and a general character controller cover the relevant foundation. Three.js documents an integration. | **Best fit for this repository. Keep it.** |
| **Jolt** | `jolt-physics` **1.1.1**, published **23 October 2026**; MIT. | Maintained WASM alternative with a Three.js integration. Its JS API closely follows C++ and requires deliberate native-object cleanup. Migration and re-tuning would be additional work. | Strong alternative if a prototype demonstrates a concrete advantage for a future requirement. |
| **cannon-es** | **0.20.0**, published **12 August 2022**; MIT. | Straightforward JavaScript engine, but its published release history is much less recent. This does not prove it is insecure or unusable. | Lower fit for the user's maintenance priority; no reason to replace working Rapier with it. |
| **Ammo.js / Bullet** | Official Emscripten port of Bullet; zlib license. | Capable engine; generated Bullet-style bindings and another integration/asset lifecycle to maintain. Release freshness was not established in this review. | No identified project requirement justifies migrating to it. |

Sources: [Rapier package](https://www.npmjs.com/package/@dimforge/rapier3d-compat), [Dimforge October report](https://dimforge.com/blog/2026/10/25/dimforge-Q3-technical-report/), [Jolt releases](https://github.com/jrouwe/JoltPhysics.js/releases), [Jolt cleanup example](https://github.com/jrouwe/JoltPhysics.js/blob/main/Examples/proper_cleanup.html), [cannon-es package history](https://www.npmjs.com/package/cannon-es?activeTab=versions), [Ammo repository](https://github.com/kripken/ammo.js), [Three.js physics integration guide](https://threejs.org/manual/pages/physics.html).

**Maintenance detail:** the old `dimforge/rapier.js` repository was archived on 12 July 2026 because the bindings moved into `dimforge/rapier/typescript`. The archive is not evidence that the current JavaScript package was abandoned. [Official migration notice](https://github.com/dimforge/rapier.js)

## Human movement architecture

Use an animation-led player with a kinematic capsule for locomotion and collision. Rapier's general character controller can resolve obstacles, but acceleration, anticipation, turning, foot placement, and sports decisions need a game-specific motor. Full-time ragdolls or anatomical muscle simulation would add substantial control and tuning complexity without directly solving the current movement problems. Reserve physical ragdolls for selected dives/falls later. [Rapier character controller](https://rapier.rs/docs/user_guides/javascript/character_controller/)

- **Movement:** individual acceleration/braking/turn limits; distance-driven strides; torso lean from acceleration; separate facing and travel directions; anticipation before movement.
- **Animation:** idle/ready, start, jog/sprint, brake, turn, low pickup, high catch, throw, bowl, bat, and recovery. Blend transitions and trigger ball release/acquisition from named animation events. Three.js `AnimationMixer` can animate the existing object hierarchy; rigged glTF models and licensed cricket-specific clips are a later art upgrade. [Three.js AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
- **IK:** fixed-length arms with elbow targets, hands following the bat/gloves, and feet planted on the ground. Start with a small two-bone solver for the existing grouped meshes. Three.js `CCDIKSolver` is intended for `SkinnedMesh`; it is not a drop-in solution for these procedural `Group` players. [Three.js CCDIKSolver](https://threejs.org/docs/pages/CCDIKSolver.html)
- **Fielding decisions:** stable intercept assignments, realistic reaction delays, reaching limits, and movement-dependent catch/throw quality. Variation should follow skill and context, with seeded randomness where appropriate.

Use direct Rapier integration for this vanilla JavaScript/Vite game. A React Three Fiber wrapper would require an unrelated framework migration. Keep the engine bundled locally: Three.js's convenience `RapierPhysics` addon automatically imports from a CDN, so adopting that helper unchanged would alter the game's offline loading behavior. [Three.js RapierPhysics](https://threejs.org/docs/pages/RapierPhysics.html)

## Cricket mechanics to add on top

- **Bowling:** continuous flight from the hand; gravity/drag; a calibrated seam/ball-condition swing force; spin-induced flight forces; seam and spin response on pitch impact; follow-through after release.
- **Batting:** footwork and weight transfer before contact; bat-face orientation and relative velocity at impact; sweet-spot/edge/toe differences; signed early/late timing affecting direction; incoming pace and spin affecting the outgoing ball.
- **Fielding:** physically reachable possession, preparation before throwing, actual release errors, direct hits, overthrows, and recoverable bobbles.
- **Running:** acceleration, braking, crease grounding, and believable changes of direction. Judge a run-out at the wicket-breaking event.

These are models to build and validate. The general engines compared here do not supply a ready-made cricket rules or biomechanics system. In particular, conventional/reverse swing requires a separate model of seam and surface-related aerodynamic forces; adding a generic Magnus force alone is insufficient. Start with a tunable approximation and validate it against reference deliveries. [Cambridge research on cricket-ball swing](https://www.repository.cam.ac.uk/items/08ac7dca-0898-4fd6-851b-43b7f632f658)

## Security and reliability assessment

- A live `npm audit --json --ignore-scripts` completed successfully with **zero known vulnerabilities** in the locked dependency tree. This is an advisory-database result, not a security certification or a source/binary audit.
- Rapier and Three.js are pinned exactly; lockfile entries include integrity hashes and public npm registry URLs. Keep reproducible installs and local runtime assets. Hashes verify locked bytes, not the trustworthiness of their author.
- Rapier's public GitHub security page showed no published advisories and no detected `SECURITY.md`. An absence of advisories does not establish the absence of vulnerabilities. [Rapier security page](https://github.com/dimforge/rapier/security)
- Prefer reviewed stable releases to canary builds, monitor upstream changes, and rerun audit/tests before upgrades. Bound simulation work and validate imported/replayed numeric state before passing it into physics.

## Recommended delivery order and acceptance criteria

1. **Movement foundation and one fielder prototype:** shared simulation clock, acceleration/braking/turning, per-player distance-based gait, fixed-length arms, and a low pickup with a clear possession event. Keep the current visual style. Accept when the player starts/stops smoothly, does not snap around or stretch, and gathers the ball only when the hand reaches it.
2. **Apply natural movement to the team:** blended locomotion and body posture, grounded feet, stable fielding assignments, bowling follow-through, and crease turns. Accept when players move independently and the same chase remains consistent at 30/60/120 render fps.
3. **Continuous cricket ball and contact:** agree on world scale, simulate release-to-possession, add pitch/outfield response, swept bat contact, and spin/swing tuning. Accept when fast deliveries/edges do not tunnel, impacts match the visible bat, and frame rate does not materially change outcomes.
4. **Possession, throws, and decisions:** hand/glove windows, skill/context-based errors in actual trajectories, wicket impact, run-out event timing, and replay interpolation/state. Accept when the visible event explains the decision and seeded scenarios replay consistently on the supported configuration.
5. **Art and advanced motion:** optional rigged players, cricket-specific clips, dives/slides, secondary body motion, and selective physical falls. Profile on target phones before increasing physical body counts.

Do not make a full engine swap or whole-team ragdoll conversion the first milestone. The first prototype should demonstrate the user's actual goal: a fielder who moves, reaches, gathers, and recovers like a person.

## Verification performed

- `node --test tests/*.test.mjs`: **42 passed, 0 failed**.
- `npm run build`: **passed**. Vite reports large chunks; the Rapier chunk is approximately **4.34 MB uncompressed / 1.65 MB gzip**. Keep asynchronous initialization and measure first-match loading on mobile before deciding whether to change the compat packaging.
- Live npm audit: **0 known vulnerabilities**.
- Local browser smoke test: match setup, several deliveries, a batting input resulting in a four, and pause; no captured warning/error logs. This was a short functional check, not a device performance benchmark or an exhaustive gameplay review. The detailed motion findings above come from the source review.


## Implementation follow-up — 3 November 2026

The modern edition now uses a locally authored GPU-skinned body (656 vertices per athlete) over the existing IK rig. No external character assets, CDN runtime imports, or additional npm dependencies were introduced. Modern calibration uses adult-height actors, 0.036m ball radius, 0.156kg ball mass, 0.108m bat width, and 0.711m wicket height; the fictional/shared pitch and boundary layout remains. Bowling and batting use separate cricket-specific actions, including a straight-arm overhead release, front-foot plant, backlift/downswing, reachable two-handed grip, and follow-through. Running includes world-anchored support steps and a shorter sprint stance; low diving stops and aerial dives have different body paths. Wicketkeeping now uses actual swept glove contact. Delivery animation/input time advances with the same bounded elapsed time as ball simulation.

The existing locked dependency tree was checked again with `npm audit --json --ignore-scripts` on 3 November 2026: **zero known vulnerabilities**. This is an advisory check, not a security certification. Asset generation is local, and no downloaded models or code were executed. See `era-architecture.md` for implementation boundaries: contact/shot quality is still assisted, poses are authored/procedural, and neither the characters nor the field/rules constitute a photorealistic or complete regulation simulation.

## Gameplay corrections — 3 November 2026

- Stationary batting and keeping poses explicitly use 10° knee flexion. Sole grounding adjusts pelvis height, while the waist hinge and foot approach provide reach. Running, diving and jumping retain their separate action poses. The torso pivots at the pelvis; arm segments retain their lengths. Batting keeps the handed grip through pickup, contact and follow-through, straightens the torso during recovery, and tracks a passing ball with the head rather than reversing the stance.
- Short-range aerial chances get a reflex reach before chase assignment/reaction delay. Above-head chances retain the jump action rather than being intercepted by the reflex branch. Possession still requires swept hand/ball contact before the rope.
- Return receivers predict the arriving ball's lateral position. Normal release accuracy is higher; a 1.5% wild-release chance changes the actual launch. A separate 1.5% keeper bobble check runs once, only after genuine glove contact. Poorly directed throws remain live overthrows. The wicket-breaking action reaches into the stump volume instead of stopping just short of it.
- Auto camera uses a constant viewing direction, a tracking dead zone and frame-rate-based smoothing. Frustum containment follows the actual ball height, including long lofts. Other selectable cameras remain available.
- Timed power strokes have sufficient vertical launch speed to clear the modern roof (87m radius / 18.5m height). Sixes continue travelling beyond it to 115m; the game labels a roof-clearing flight. Ordinary grounded strokes retain low launch angles. This is still an assisted shot model, not a simulated bat-face collision.

### Wides

The reference is the [ICC Men's T20I Playing Conditions, October 2026](https://images.icc-cricket.com/image/upload/prd/bsxcho7ufe2pjban0wjp.pdf), clauses 7.5, 22 and Appendix C. The guidelines sit 17in inward of the 1.32m return-crease offset (0.8882m from centre). The game compares the actual delivery at the striker plane against normal, release and current striker positions; contact and no-ball override a wide. It applies a strict limited-overs leg-side interpretation, accounts for ball radius, and recognizes an untouched bounced ball above upright head height. The umpire signals after the ball passes the striker's wicket; the ball stays live, adds one penalty, and does not count in the over. Extra runs remain wides through the shared scoring engine. Ordinary modern bowling intent is calibrated around off stump at adult scale; fault intent alters the launch rather than predetermining the decision.

The reach envelope, leg line, upright head/waist heights and assisted contact remain gameplay approximations. The existing pitch layout is shared and fictional; adding the wide guides does not make every ground dimension regulation. This pass does not implement every T20 playing condition or every dismissal permitted on a wide.

Development checks at `?era=2027&fieldingLab=1` now include left/right stance inspection and a stadium power drive, alongside actual-contact catches, rope saves and returns. The panel starts closed and can be closed/reopened. No new runtime dependency, external character asset or network-loaded game code was added in this pass.

Validation: **98 automated tests passed**; the production build passed (the existing large Rapier/main bundle warnings remain). Browser checks confirmed a normal delivery advancing the over, a `jump → catch` with 0.12m closest-hand distance, a `released → received → wicket` return, and a power drive continuing beyond the roof to 115m. Score and control offsets relative to the stage were unchanged before/after a normal delivery. The six-pixel outlined ball marker improves contrast against white stadium structures. These checks are not a mobile performance benchmark.


## Broadcast camera correction — 3 November 2026

Supersedes the translating auto-camera described above. Modern auto now uses stationary physical mounts: an elevated end-of-ground delivery camera and eight stand cameras selected by shot direction. The end view contains the real left/right bowling rigs from the start of the run-up through overhead release, the striker and the keeper. A shot retains its selected field camera, which pans/tilts and adjusts its lens; positions are never interpolated between mounts. A near-wicket return cuts back to the end view. Replays record mount IDs, aiming points and lenses and preserve the same cuts. Tests cover the actual bowling action, eight shot directions, high/long shots, portrait/landscape framing, stationary mounts, return cuts and replay interpolation. The suite passes **101 tests**.

The shared format configuration adds 2 overs while selecting 5 by default. The two-over format uses two bowlers, one over each; the existing innings/scoring code counts 12 legal balls. Browser setup confirmed the default and started a match displaying `/ 2 OV`. No dependencies were added.
