# 0003: Where cricket animation clips come from

- Status: **proposed**. The tested route does not cover batting; the owner needs to choose how to fill the gap (issue #11)
- Date: 2026-11-17

## Question

Which production route supplies cricket-specific motion? The owner ruled out Blender and other installed tools (issue #7) and asked for CC0 library clips only to be tested (issue #11).

## Finding

CC0 library clips are a sound source for **general** motion and no source at all for **cricket-specific** motion.

- No CC0 cricket batting, bowling or wicketkeeping clip was found. Every cricket animation that a search turned up is a paid commercial asset.
- The closest CC0 material, the two Quaternius Universal Animation Libraries (86 clips in the free tiers), has six swing clips. All six were captured and looked at (`npm run capture -- --scenario clip-<name>`). Every one is a one-handed slash with a wide fighting lunge: `Sword_Attack`, `Sword_Regular_A`, `_B`, `_C`, `Sword_Heavy_Combo`, and `TreeChopping_Loop`, which is a one-arm overhead chop despite its name.
- A cover drive is a two-handed, side-on stroke: stride to the pitch of the ball, bat swinging down and through in a near-vertical plane, high front elbow, weight over the front knee. None of the six shares the stance, the grip, the swing plane or the footwork.
- The repository allows code to blend, time-warp and apply IK to clips (rule 3 in `AGENTS.md`). Those change timing and where an end point lands; they cannot change the stance, swing plane and footwork of a clip. Getting from a sword slash to a cover drive would mean setting most joints by hand in code, which rule 3 forbids and which would look wrong.

So the cover drive the issue asks for **was not produced**, and in my judgement cannot be produced by this route. The first acceptance check (clips reviewable in the lab) is met only in the sense that the candidates are reviewable: `/lab/?scene=clip-Sword_Attack` and the other names in `src/lab/scenes/clip-review.ts`.

## What the route does give

Measured on the files now in the repository:

| | Result |
| --- | --- |
| Character | Quaternius mannequin, 14,612 triangles, 65 joints, Unreal-style bone names (`pelvis`, `spine_01`, `upperarm_l`, `hand_r`, fingers). 1,206 kB source, 135 kB built |
| Clips | Bind by bone name, so one clip file drives any character on this skeleton. Ten clips, 1.76 MB source, 606 kB built |
| Licence | CC0 1.0, stated in the `License.txt` inside each download |
| Tools | `tools/assets/extract-clips.ts` (new) and `npm run assets`. Node only |
| Time per clip | Minutes: name the clip, extract, build, add the `ASSETS.md` row |

Clips in the two libraries that map onto cricket needs without changing what they are:

| Need | Library clip | Looked at |
| --- | --- | --- |
| Fielder's throw | `OverhandThrow` | Yes: wind-up, release, deep follow-through. Usable |
| Standing, waiting | `Idle_Loop` | Not yet |
| Walking in, jogging, sprinting | `Walk_Loop`, `Jog_Fwd_Loop`, `Sprint_Loop` | Not yet |
| Picking the ball up | `PickUp_Table` | Not yet; it is a table-height pick-up, the ground may differ |
| Sliding stop or dive | `Slide_Start`, `Slide_Loop`, `Slide_Exit` | Not yet |
| Crouch (keeper, slips) | `Crouch_Idle_Loop` | Not yet |

That is most of the general motion in clip set B (issue #29) and none of clip set A (issue #21).

## What is still missing

Batting strokes and stance, the bowling action for pace and spin, wicketkeeping takes, catching, and umpire signals.

## Options for the missing motion

The owner chooses. None is tested yet.

1. **Capture from the owner's own video, in the browser.** Route (b) of the original issue, without any install: a lab page runs a pose-estimation model on a phone video of someone playing the stroke, and repository tooling retargets the result to this skeleton. Licence position is clean (own work). Risks: hands and bat are tracked poorly, depth from one camera is noisy, and clean-up without a modelling tool is limited to filtering and IK. Worth a spike on one cover drive before committing.
2. **Widen the licence rule to admit the CMU motion capture database.** It has golf and baseball swings, which are two-handed and side-on, so closer than a sword slash. They are still not cricket strokes, and its terms are permissive but not CC0 or CC BY 4.0, so rule 6 in `AGENTS.md` would have to change.
3. **Have the clips made by someone with a modelling tool**, the owner on another machine or a commissioned animator, delivered as glTF on this skeleton under CC0 or CC BY 4.0. Best quality; costs time or money and is outside this repository.
4. **Allow a modelling tool after all**, restoring route (a).

My recommendation is to spike option 1 next, because it is the only one that needs nothing installed, bought or relicensed, and to keep option 3 in reserve if the result is not good enough for the feel gate.

## Recipe for a library clip (the part that works)

1. Download the Standard zip of the library from quaternius.itch.io and unzip it outside the repository.
2. `node tools/assets/extract-clips.ts <library>.glb assets/src/clips/<set>.glb --clips Name_One,Name_Two`
3. `npm run assets`
4. Add rows to `ASSETS.md` for the source and the built file.
5. Add the names to `CANDIDATE_CLIPS` in `src/lab/scenes/clip-review.ts` and to `CLIP_REVIEWS` in `tools/capture/scenarios.ts`, then `npm run capture -- --scenario clip-<name>` and look at the sheet.

## Not covered

Retargeting to a character with different proportions, foot sliding when a clip is played while moving, and whether the mannequin itself is the base body for issue #19 (it is a stylised female figure; the plan calls for a 1.80 m adult default).
