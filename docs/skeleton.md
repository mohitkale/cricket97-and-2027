# The shared skeleton

One skeleton for every player and umpire in both editions (issue #19, decision 0003). The data lives in `src/anim/skeleton.ts`; this file explains it. `src/anim/skeleton.test.ts` checks the built assets against it.

## Skeleton

- **Source.** The Quaternius Universal Animation Library skeleton, CC0. Every clip from those libraries and every clip captured by `tools/assets/retarget-capture.ts` binds to it by bone name.
- **Units and axes.** Metres, Y up, the character faces +Z. Left is +X.
- **Rest pose.** A T-pose: arms straight out along X, palms down, thumbs forward; feet under the hips.
- **Bones.** 65 joints with Unreal-style names: `root`, `pelvis`, `spine_01` to `spine_03`, `neck_01`, `Head`, and for each side (`_l`, `_r`) `clavicle`, `upperarm`, `lowerarm`, `hand`, five fingers of three or four joints each, `thigh`, `calf`, `foot`, `ball`. `BONES` in `skeleton.ts` lists the ones code may rely on. Names are case-sensitive (`Head` has a capital).
- **Stature.** The base body stands 1.808 m tall in its rest pose (`REST_STATURE`). Characters are shown at 1.80 m (`DEFAULT_STATURE`) unless the roster says otherwise. Height is set by scaling the whole character (`setStature` in `src/render/character.ts`), which scales clips with it; no bone is lengthened on its own.

## Base body

`assets/src/characters/base-body.glb`, written by `node tools/assets/make-body.ts` from the CC0 Quaternius mannequin. It holds the skeleton, one skin and three levels of detail that share it:

| Node | Triangles | Use |
| --- | --- | --- |
| `body_lod0` | 11,998 (target 12,000) | Close: batters, bowler, close fielders |
| `body_lod1` | 3,999 (target 4,000) | Mid distance |
| `body_lod2` | 1,198 (target 1,200) | Deep fielders, the far umpire |

Which level is shown at which distance belongs to the quality tiers (decision 0002); `setLod` switches. The mannequin is a stylised figure, not the believable athlete of the 2027 Edition: the hero bodies (issue #48) replace it on the same skeleton.

## Sockets

A socket is an empty node named `socket_<name>` under a bone of the built body, marked with a `socket` entry in its glTF extras so the build keeps it. Equipment is authored in its socket's frame, so attaching it is `attach(character, name, model)` with no offset.

| Socket | Bone | Model frame (origin, axes) |
| --- | --- | --- |
| `bat` | `hand_r` | Origin at the bottom hand's grip, handle top +Y, face +Z. In the rest pose the handle points back and the face down, as a palm-down fist holds it |
| `ball` | `hand_r` | Origin in the fingers |
| `helmet` | `Head` | Origin at the `Head` joint, up +Y, facing +Z |
| `pad_l`, `pad_r` | `calf_l`, `calf_r` | Origin at the knee, the pad down the front of the shin |
| `glove_l`, `glove_r` | `hand_l`, `hand_r` | Origin at the wrist, fingers along the hand (−X for the right hand, +X for the left), palm down |

Batting sockets are for a right-handed batter: the bat sits in the bottom (right) hand and the top hand goes on the handle by IK (issue #20). A left-handed batter is the same clips mirrored, which is for issue #20 to define.

## Equipment

`node tools/assets/make-equipment.ts` writes, under `assets/src/equipment/`: `bat`, `stumps` (three stumps and two bails as separate nodes, so the wicket can break; middle stump at the origin, standing on the ground), `helmet`, `pads`, `batting-gloves` and `keeping-gloves` (a `_l` and `_r` node each). Sizes follow the Laws where the Laws set them: bat 965 × 108 × 67 mm at most, stumps 711 mm high and 228.6 mm wide across. They are simple shaded shapes without textures, enough for the first ball; the 2027 hero kits (issue #48) replace them.

## Look at it

`/lab/?scene=character`, or `npm run capture -- --scenario character`.

## Known limits

- The gloves are rigid. When a clip curls the fingers, they come out under the glove. Gloves skinned to the finger bones come with the hero kits.
- The pads are rigid on the shin and do not bend at the knee.
