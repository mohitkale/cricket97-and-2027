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

## Clips captured from video

`lab/capture.html` (run `npm run dev`) turns a video of a person into pose landmarks in `assets/src/capture/<name>.json`. `node tools/assets/retarget-capture.ts <name> --level` turns those into `assets/src/clips/capture-<name>.glb`. Then build as above. The landmark file is the source of the clip and is committed; the video is not. See `docs/decisions/0003-animation-source.md` for what this can and cannot capture.
