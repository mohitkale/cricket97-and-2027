# assets

Source art lives in `assets/src/`. `npm run assets` builds it into `public/assets/`, which is what the game loads. Both are committed; CI never builds assets.

## Setup

Nothing beyond `npm ci`. The pipeline is Node only (glTF Transform, meshoptimizer, sharp). It does not use Blender or any other installed tool, by the owner's decision on issue #7.

## Adding or changing an asset

1. Put the source in `assets/src/<area>/<name>.glb` (or `.gltf`). Sources are glTF, in metres, Y up, facing +Z. Keep the source as authored: uncompressed geometry, PNG or JPEG textures.
2. Run `npm run assets` (or `npm run assets -- <part of the path>` for one file). The output is `public/assets/<area>/<name>.glb`, and the script prints the size before and after and the triangle count.
3. Add a row to `ASSETS.md` for the source and one for the built file. `npm run check` fails without them, or if the licence is not CC0, public domain or CC BY 4.0.
4. Load it with `loadModel('<area>/<name>.glb')` from `src/render/assets.ts` and look at it in the lab.

## What the build does

Removes duplicate and unused data, welds vertices, resamples animation, resizes textures to at most 1024 px and converts them to WebP, then compresses geometry and animation with meshopt.

Textures are WebP, not KTX2: the KTX2 encoder is a separately installed command-line tool. WebP is smaller to download but is held uncompressed in GPU memory, so texture memory on phones needs watching when the hero characters arrive (issue #58 enforces budgets).

## The sample

`assets/src/equipment/cricket-ball.glb` is written by `node tools/assets/make-sample.ts`. It proves the pipeline end to end and is viewable at `/lab/?scene=asset-sample`.

## Base body and equipment

`node tools/assets/make-body.ts` writes `assets/src/characters/base-body.glb` (the shared skeleton, three levels of detail and the equipment sockets) and `node tools/assets/make-equipment.ts` writes the equipment under `assets/src/equipment/`. Load the body with `loadCharacter()` from `src/render/character.ts`. See `docs/skeleton.md`.

### 2027 candidate body fits

The [male](https://grab3d.com/models/characters/man-base-character/) and [female](https://grab3d.com/models/characters/woman-base-character/) fits for #48 use Grab3D’s CC0 rigged GLB downloads with the #19 skeleton. Select **Rigged** and **Full quality** on each source page and save the GLBs outside the repo. Rebuild the fits and runtime assets with:

```sh
node tools/assets/fit-2027-body.ts /path/to/male.glb assets/src/characters/2027-male-fit.glb
node tools/assets/fit-2027-body.ts /path/to/female.glb assets/src/characters/2027-female-fit.glb
npm run assets -- 2027-
```

Review both on the shared authored `Idle_Loop` at `/lab/?scene=hero-rig`. The staged 15-body view at `/lab/?scene=hero-field` shows the projected triangle and draw-call load with the slice ground. These are body fit candidates with baked source clothing and four weights per vertex. Team kit, finger articulation, equipment fit, far impostor and match integration are tracked in #48.

## Ground

`node tools/assets/make-ground.ts` writes `assets/src/ground/slice-ground.glb` (outfield, pitch and creases in the sim's frame). `addSliceGround()` in `src/render/slice.ts` puts it in a scene with both wickets, the sun and the sky; `/lab/?scene=bowled` shows it.

## Clips from an animation library

Do not commit a whole library. Cut out the clips in use with `node tools/assets/extract-clips.ts <library.glb> assets/src/clips/<set>.glb --clips Name_One,Name_Two` (or `--mesh` to keep only the character), then build as above. Clips bind by bone name, so a clip file drives any character on the same skeleton; load them with `loadClips()` from `src/render/assets.ts`. See `docs/decisions/0003-animation-source.md`.

For the #29 fielding locomotion subset, use the in-place `UAL1_Standard.glb` from the publisher’s [Standard archive](https://quaternius.itch.io/universal-animation-library):

```sh
node tools/assets/extract-clips.ts /path/to/UAL1_Standard.glb assets/src/clips/ual1-fielding.glb --clips Walk_Loop,Jog_Fwd_Loop,Sprint_Loop,Crouch_Idle_Loop
npm run assets -- ual1-fielding
```

Review each clip in `/lab/?scene=clip-<name>` at normal and quarter speed. The raw viewer plays these in place. The animation runtime viewer at `/lab/?scene=anim&state=walk&clip=<name>` lets the gait move along the ground before foot planting is reviewed. Cricket-specific keeping takes, throws, stops and gathers still need their matching clips and sim events.

The right-handed batting stance layers an original bat-grip track in `assets/src/clips/batting-stance-grip.json` onto Quaternius's planted `Sword_Idle` performance. Bake the arm constraints and gaze with `node tools/assets/fit-batting-stance.ts`, then run `npm run assets -- batting-stance`. Review the clip with the bat attached at `/lab/?scene=anim&state=bat`.

Delegated review for #92 covered the `anim-bat` and `anim-bat-quarter` Chromium captures. Both contact sheets show the batter watching down the pitch with two planted feet and both hands on the handle. The whole-loop test samples raw and runtime playback at 240 Hz and checks less than 2 cm of foot drift and less than 1 cm from each wrist to its grip reference. This review covers the ready stance on the shared rig. Match strokes and final kit fit have their own acceptance checks.

The #21 backlift shares the planted base and the original guard's grip. `batting-backlift-grip.json` supplies the rearward lift and timing. Build with `node tools/assets/fit-batting-stance.ts batting-backlift` and `npm run assets -- batting-backlift`. The asset test checks that the blade rises above the wrists and both wrists stay within 1 cm of their grip references.

The #21 keeper guard blends two CC0 Quaternius idles and bakes both foot plants and glove positions on the shared rig. Build with `node tools/assets/fit-keeper-stance.ts` and `npm run assets -- keeper-ready`. The asset test samples the full 2.5-second loop at 120 Hz and checks both foot plants and both wrists within 1 cm of their guard references.

The #21 leave raises the bat away from the line, holds it during the leave marker and settles back to guard. Build with `node tools/assets/fit-batting-stance.ts batting-leave` and `npm run assets -- batting-leave`. The raw clip test samples at 120 Hz and finds both wrists within 1 cm of their references and both feet within 2 cm of their anchors. The leave marker is at 0.56 s. This is an authored batting take for the lab. The match's ball path and any decision to leave belong to the sim and its presentation adapter.

For umpire idle, reuse Quaternius's CC0 `Idle_Loop` from `ual1-candidates.glb`. It has relaxed hands and both feet planted across the 2.5-second loop. A 120 Hz source clip probe measured less than 0.1 mm of foot drift.

For the pace run-up loop, use the CC0 `Jog_Fwd_Loop` with the stitched ball in the right-hand socket. The lab plays the loop at the source ground speed with both foot plants marked. The `pace-run-up` and `pace-run-up-quarter` captures show the ball held through the stride. The gather, release and follow-through need a separate cricket delivery take.

The regulation take uses the keeper guard's planted base. The glove track brings the palms together at the 0.36 s catch marker and gives towards the body. Build with `node tools/assets/fit-keeper-stance.ts keeper-regulation-take` and `npm run assets -- keeper-regulation-take`. The raw clip check measures less than 2 cm of foot drift and less than 1 cm from each palm reference to the surface of the ball in the settled grip. Delegated Chromium review used the full and quarter-speed captures with a reference ball and fitted gloves. In-match contact checks belong to the delivery and fielding presentation work.

The front-foot defence and cover drive use the browser-authored footwork and body motion in `batting-footwork.glb`. Refit the matching bat tracks with `node tools/assets/fit-batting-stance.ts batting-front-foot-defence` and `node tools/assets/fit-batting-stance.ts batting-cover-drive`, then run `npm run assets -- batting-` to rebuild the batting clips. The handed variants in the animation lab mirror the same three-dimensional action. The contact markers are at 0.527 s for the defence and 0.635 s for the drive.

The browser-authored pace delivery starts with a gather and includes the front-foot block, release and follow-through. Build the source take with `npm run assets -- bowling-pace-delivery`. Its release is at frame 17 on the authoring timeline at 30 fps. The animation lab carries a reference ball in the bowling hand until that marker.

Delegated Chromium review covers all clip-set A actions at full and quarter speed. The two batting capture pairs are `batting-front-foot-defence` and `batting-cover-drive` with their `-quarter` variants. The pace pair is `clip-Bowling_Pace_Delivery` and `pace-delivery-quarter`. The batting and bowling captures show the authored footwork, grip and release pose. The integrated ball and hand alignment gates are tracked in #22 and #23.

## Full-over clip set

The `over-*.glb` sources hold the authored keys for movement, fielding, keeping, umpire signals, spin and batting footwork. They are editable glTF takes on the shared skeleton. The Quaternius UAL2 Standard slide uses `Slide_Start,Slide_Loop,Slide_Exit` from `UAL2_Standard.glb`, cut with the extraction command above. The eight additional batting takes each have a matching grip track. Rebuild each one with `node tools/assets/fit-batting-stance.ts batting-<name>`. After replacing the running source takes, run `node tools/assets/fit-running-bat.ts` to restore the baked bat constraint. Build the touched GLBs with `npm run assets -- over-` and `npm run assets -- batting-`.

Open `/lab/` for the `clip-<name>` scenes. Each shows the front and side and exposes the lab's pause, scrub and playback controls. The contact markers from `src/anim/over-clips.ts` are shared with the runtime. The umpire actions follow [MCC's signals](https://lawsofcricket.lords.org/umpire-signals).

## Clips captured from video

`lab/capture.html` (run `npm run dev`) turns a video of a person into pose landmarks in `assets/src/capture/<name>.json`. `node tools/assets/retarget-capture.ts <name> --level` turns those into `assets/src/clips/capture-<name>.glb`. Then build as above. The landmark file is the source of the clip and is committed; the video is not. See `docs/decisions/0003-animation-source.md` for what this can and cannot capture.
