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
