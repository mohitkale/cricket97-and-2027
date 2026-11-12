# One cricket game, two eras

The opening page deliberately asks the player to choose an edition every visit. `src/entry.js` loads a small chooser first; Three.js and the match engine load only after an edition is selected. The URL is the edition boundary: `?era=97` or `?era=2027`. A full navigation when switching eras also cleans up the old WebGL context, listeners, physics world, and audio without duplicating or running two engines together.

## Shared engine

`src/main.js` still owns the match state machine, scene, setup interactions, player assignment, input, scoreboards, commentary, and replay recorder. These helpers remain shared:

- `delivery.js`: delivery choices and cricket scoring decisions.
- `shots.js`: shot catalogue, input mapping, reach, and assisted shot selection.
- `running.js`: shared run requests, turning back, run completion, and classic throw decisions.
- `bowling-profiles.js`: bowling styles, keeper selection, and over rotation.
- `match-stats.js`, `power.js`, `toss.js`, `ball-path.js`, and `player-pose.js`.
- `physics.js`: one lazily initialized Rapier world, configured for the selected era.

The existing classic roster JSON is untouched. Classic movement, delivery curves, material choices, default day lighting, and arcade rules retain their previous paths. The only intentional classic navigation change is access to the era chooser. Existing tests continue to cover the classic behavior.

This structure reuses the existing engine and utilities. A percentage based on total lines would be misleading because the new artwork and animation code adds lines; there is no duplicated modern scoring, input, match, or running implementation.

## Edition data and presentation

`eras.js` defines the edition metadata and modern squad snapshot. Modern playing roles also feed the shared bowling/keeper utilities. Team lists contain 15 players each; the first 11 after reordering form the selected XI. The setup labels the source date and links to the ICC list.

`portal.css` and `entry.js` own the era chooser. `modern.css` scopes presentation to `body[data-era="2027"]`; `edition-ui.js` decorates the common match/setup DOM. It does not implement another setup state machine. `modern-stadium.js` upgrades the common ground with architecture, surfaces, live score screens, seating, and LED treatment. The three fictional venues are palette/presentation variants of that shared model. `modern-crowd.js` adds instanced arms, supporter flags, and phones to the existing spectator positions.

No runtime CDN imports, downloaded models, external fonts, or new npm dependencies were added. Canvas textures and character geometry are created locally. Modern full-name introductions use an available local browser speech voice; the existing recorded commentary/crowd assets remain shared. Some browsers will provide text-only modern introductions.

## Character and physics upgrades

`athlete-skin.js` builds a local 656-vertex skinned body per athlete, with tapered clothing/limbs and blended elbow/knee weights. It follows the existing rig without external models, animation downloads, or dependencies. `athlete-batch.js` instances the remaining repeated equipment/face primitives and updates the skin skeletons; it excludes SkinnedMesh bodies and replaced capsule geometry from instancing. Crowd geometry and cached shadows also use a lighter rendering path.

`athlete.js` creates generic articulated athletes using the same `userData` rig contract as the classic players. Fixed-length, two-segment IK positions arms and feet. Identity variation is stable per name and is not intended to reproduce an individual's appearance.

`locomotion.js` is a renderer-independent acceleration, braking, angular-speed, gait-distance, and athletic-running model. Running poses bend forearms towards the front of the upper arm, counter-swing the shoulders against the leading thigh, and alternate a world-anchored support foot with a lifted return step. Faster running has a shorter stance interval and airborne phases; the pelvis lowers enough for a bent support knee instead of asking an unreachable straight leg to touch the turf. Joint transitions use shortest-path quaternion blending, so a previous reach does not send an arm through a full rotation. Arm IK places the elbow behind a forward-reaching wrist, and fielders turn towards a catch before extending their arms. `athlete-motion.js` applies those results to the rig and asks Rapier's kinematic character controller to constrain movement around other capsules. Possession is separate from body collision: a torso cannot become a catching surface. Modern low pickups leave the ball live until a reaching hand is close enough; an unsuccessful gather returns to the chase.

Modern ball simulation uses 1/120-second accumulated steps, CCD, a separate pitch collider, drag, and calibrated seam/spin forces. `modern-cricket.js` solves launch velocity for a selected bounce length; Rapier supplies the actual bounce. Contact retains the shared assisted shot catalogue, adding incoming-pace and signed timing response. Modern return throws use `return-controller.js` and `return-throw.js`; the classic arc helper remains in `ball-path.js`. Modern replays interpolate recorded transforms and joint angles; classic playback retains its existing discrete behavior.

The modern broadcast HUD uses fixed stage-relative scorecard, speed badge, and control-dock anchors. Batting and running share the same pad dimensions and button cells, including on mobile; the timing cue has reserved space and cannot shift the score figures.

## Scale, technique, and presentation

`cricket-scale.js` centralizes the modern world calibration: rig root scale 0.54 (approximately adult human height), 0.036m ball radius, 0.156kg ball mass, and 0.711m wicket height. Reach, capsules, crouches, diving heights, glove contact, bat grounding, and wicket-contact bounds use the rendered scale. Modern bat width is 0.108m. The original pitch endpoints, crease positions, and fictional boundary/venue layout remain shared game dimensions; this is not a claim that the entire ground matches ICC playing conditions.

`cricket-actions.js` owns modern bowling and batting technique. Bowling accelerates through a gather, front-foot plant, straight-arm overhead release, and step-through. The display pace feeds release travel without the previous 1.65x artificial travel-time multiplier. Delivery action time and batting input timestamps use the same bounded elapsed simulation time as the ball, so a slow render frame cannot skip the body animation ahead of the delivery. Batting separates the backlift, downswing, blade contact pose, and follow-through, with a body fit that maintains a reachable two-handed grip. Left-handed grips mirror correctly. Modern wicketkeeping anticipates the incoming line, shuffles into a crouched take, and acquires possession only through swept glove contact; a missed take stays live. Running starts after a brief follow-through interval, and the bat is carried in the dominant hand. Shot quality/contact decisions remain assisted rather than a full bat/ball rigid-body collision.

The modern broadcast director in `ball-camera.js` holds an elevated end-of-ground camera through the complete run-up, release and delivery. After the ball leaves the pitch or climbs into a loft, it selects one of eight fixed stand mounts by direction and keeps that camera for the shot. Pan/tilt and lens changes follow the ball without translating the mount; return throws cut to the end view near the wickets. Recorded mount IDs, pan targets and lenses preserve cuts in replays without flying between camera positions. Manual modern views also use fixed mounts. The oversized yellow trail is disabled for modern play; an outlined six-pixel marker makes the physical ball readable against stadium structures. The optional development lab has separate inspection close-ups; its Bowling camera and Stadium six checks use the production director.

## Modern gameplay

### Fielding actions

Modern fielding now runs through `fielding-controller.js`, with short-horizon interception decisions in `fielding-planner.js`. The controller distinguishes pursuit, backward pursuit, reaching, jumps, dives, sliding, recovery, and braking. It predicts reachable future ball positions instead of simply following the current position. Backward pursuit faces the incoming ball and uses a separate balanced arm/leg pose; ordinary running clears stale IK rotations on all limb axes.

Catch and stop decisions sweep both hands and the ball between simulation frames. A low dive can take an airborne catch, while a diving ground stop deflects/slows the live ball for a subsequent gather. Contacts are ordered against the boundary crossing, and fielders outside the rope cannot turn a crossed ball into a catch. When the ball is dead, the controller continues momentum, landing, sliding, and getting up. The dive capsule follows the tilted body in Rapier rather than remaining an upright obstacle. Waist pivots are included in replay snapshots.

During development, open `/?era=2027&fieldingLab=1` for deterministic standing-catch, diving-catch, rope-save, backward-pursuit, return-throw, run-out-attempt, and missed-return checks. These buttons launch ordinary live shots through the same match state machine, character rigs, controller, and Rapier ball; they do not force possession or scoring outcomes. The panel starts closed: use Fielding Checks to open it, and its close button or Escape to dismiss it. The diagnostic controls and slow motion are omitted from production builds. Regression tests include real capsule-based diving stops at 30/60/120 FPS and continued movement after a boundary.

### Returns and crease grounding

`return-controller.js` separates wind-up, hand release, free ball flight, glove possession, and wicket contact. Receivers accelerate into position and face the ball independently of their travel direction. They take the actual moving ball through swept hand contact, then crouch and reach to break the wicket. A slower receiver can prompt a direct throw. Release error changes the physical launch direction and height; a missed take returns to live fielding as an overthrow, rather than silently becoming possession.

`return-throw.js` selects an end from the runners’ positions and compares the swept ball path with the visible stump volume. Modern run-outs check actual shoe-sole and bat-toe ground points beyond that end’s crease at wicket contact, replacing the classic hidden throw-accuracy decision. `groundRunningBat` lowers and extends the rendered bat during the final metres. A safe runner can finish the current run. Standard match scoring, extras, and run requests remain shared.

### Remaining scope

This is a playable procedural modern edition, not a photorealistic sports simulation. The characters are generic athletes; there are no licensed likenesses or cricket motion-capture assets. Animation remains procedural, with IK and movement-dependent blending. The player, ball, bat, and wicket scales are calibrated in metres, but the retained match geometry and procedural poses are not a complete regulation-scale biomechanical model.

Bat contact still uses assisted timing/reach decisions instead of a fully swept, rotating bat collider. LBW and bowled decisions remain assisted. The wicket reaction uses a procedural stump/bail animation after contact; the stumps are not individual free rigid bodies. Modern throws use Rapier flight and release error, but catching and throwing are still procedural athletic actions rather than a biomechanical muscle simulation. Grounding/contact tolerances still include small gameplay assistance margins. Pitch wear, fatigue, detailed ball condition, and complete real-world fielding rules are not simulated. Swing and spin coefficients are game tuning values, not measured CFD results.

Future work should extend these modules: add a swept bat contact adapter, impact-driven individual stumps, richer wicketkeeping, cricket motion clips, and device-specific performance measurements. Those improvements should stay edition-controlled so the classic experience remains available.

## Validation

Run `npm test` for both classic regression and modern behavior tests, then `npm run build`. Modern tests cover era isolation, squad viability, acceleration/turn limits, braking, 30/60/120-fps movement consistency, limb lengths, forward forearm flexion at multiple headings, reaching elbow direction, support/swing feet, bounded pose transitions, skinned-body deformation/weights, human-scale release height, dominant-hand bat carrying, two-handed blade contact poses, planted feet, shared running rules, physical bounce lengths, fixed-step ball consistency, capsule collision, signed timing, actual release error, moving receivers, live overthrows, downward glove/wicket contact, and grounded-bat run-out timing.

For browser verification, exercise both era links, team reordering, venue/day/night selection, a complete delivery and scoring transition, fielding, pause/resume, and replay. Mobile layout and target-device frame times should be checked before adding heavier models or full physical skeletons.

Match formats are shared in `match-format.js`: 2/5/10/20 overs, default 5. The 2-over format uses two different bowlers with a one-over limit each and the existing 12-legal-ball innings limit. Setup options, match initialization and bowler rotation consume this configuration in both editions.
