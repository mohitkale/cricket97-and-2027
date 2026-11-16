# Third-party and bundled assets

Every file under `public/` that is not source code is listed here, and so is every source file under `assets/src/`. Allowed licences: CC0 / public domain, CC BY 4.0, or own work released under one of those.

Schema: one table row per file (or per group, with `{a,b}` braces) giving the file in backticks, the source, the author, the licence and the changes made. The licence cell must read exactly `CC0`, `CC0 1.0`, `Public domain` or `CC BY 4.0`, optionally prefixed with `Own work, `. `src/assets-manifest.test.ts` fails `npm run check` when a file under `assets/src/` or `public/assets/` has no row, has another licence, or (for built files) has no source. The prototype files under `public/legacy/` predate this check and are not covered by it.

| File | Source | Author | Licence | Changes |
| --- | --- | --- | --- | --- |
| `public/legacy/audio/crowd-applause.mp3` | [Slow starting applause](https://commons.wikimedia.org/wiki/File:Slow_starting_applause.ogg) | stephan | Public domain | Excerpted, normalized, faded, converted to MP3 |
| `public/legacy/audio/crowd-gasp.mp3` | [Ohhh ahhh](https://commons.wikimedia.org/wiki/File:Ohhh_ahhh.ogg) | starlite | Public domain | Normalized, faded, converted to MP3 |
| `public/legacy/models/striker-body.json` | [Cesium Man](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CesiumMan) | © 2017 Cesium | CC BY 4.0 | Vertices and weights fitted to the cricket rig; textures and logo removed; head, hands and feet trimmed |
| `public/legacy/audio/{bowled,caught,caught_bowled,defend,dot,fielder,four,keeper_runout,lbw,loft,no-ball,one,run_out,shot,six,three,two,wide}.mp3` | Prototype commentary clips | Unrecorded | **Provenance not recorded** | Generic synthetic-speech lines made during the prototype. To be replaced by the commentary work (issues #40, #43, #55); do not reuse in new code |
| `public/legacy/audio/intro-{batter,bowler,new-bowler,openers}.mp3` | Prototype commentary clips | Unrecorded | **Provenance not recorded** | As above. No longer played |
| `assets/src/equipment/cricket-ball.glb` | Written by `tools/assets/make-sample.ts` | Project contributors | Own work, CC0 | None. Pipeline sample: sphere at the sim's ball radius with a stitched-seam texture |
| `public/assets/equipment/cricket-ball.glb` | Built from `assets/src/equipment/cricket-ball.glb` by `npm run assets` | Project contributors | Own work, CC0 | Welded, meshopt-compressed, texture resized to 1024 px and converted to WebP |

Removed from the repository: three company logos, spoken real-player names, and a football-crowd ambience recording.
