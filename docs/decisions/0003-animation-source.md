# 0003: Where cricket animation clips come from

- Status: **proposed**. Library clips do not cover batting. Capture from video is built, validated on known motion, and its video-file path, including side-on filming, now works on a stand-in video; it still needs a real video from the owner to judge (issue #11)
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

The owner chooses. Option 1 has since been spiked; see the next section. The others are untested.

1. **Capture from the owner's own video, in the browser.** Route (b) of the original issue, without any install: a lab page runs a pose-estimation model on a phone video of someone playing the stroke, and repository tooling retargets the result to this skeleton. Licence position is clean (own work). Risks: hands and bat are tracked poorly, depth from one camera is noisy, and clean-up without a modelling tool is limited to filtering and IK. Worth a spike on one cover drive before committing.
2. **Widen the licence rule to admit the CMU motion capture database.** It has golf and baseball swings, which are two-handed and side-on, so closer than a sword slash. They are still not cricket strokes, and its terms are permissive but not CC0 or CC BY 4.0, so rule 6 in `AGENTS.md` would have to change.
3. **Have the clips made by someone with a modelling tool**, the owner on another machine or a commissioned animator, delivered as glTF on this skeleton under CC0 or CC BY 4.0. Best quality; costs time or money and is outside this repository.
4. **Allow a modelling tool after all**, restoring route (a).

My recommendation was to spike option 1 first, because it is the only one that needs nothing installed, bought or relicensed, and to keep option 3 in reserve if the result is not good enough for the feel gate. The owner agreed on 2026-11-17.

## Capture from video: what was built and what it shows

**Built** (nothing installed; the pose model is the MediaPipe Pose Landmarker, Apache 2.0, running in the browser):

1. `lab/capture.html` (dev server only) reads a video frame by frame, runs the pose model on each, and saves 33 body landmarks per frame to `assets/src/capture/<name>.json`. The video stays on the computer. The model file, about 30 MB, is fetched from Google's servers when the page runs.
2. `src/anim/retarget.ts` solves joint rotations for the shared skeleton from those landmarks, and puts the body back in the room by keeping the lower foot planted on the ground. It only solves from the landmarks; it does not pose anything by hand.
3. `tools/assets/retarget-capture.ts <name>` writes the result as a clip, `assets/src/clips/capture-<name>.glb`, which `npm run assets` builds and the lab plays.

**Validated on motion whose truth is known**, since there is no cricket video yet. The library's `OverhandThrow` was put through the pipeline twice:

| Input to the retargeter | Result |
| --- | --- |
| The clip's true joint positions (`OverhandThrow-truth`) | Looks the same as the original from the front and the side, lunge included (`clip-capture-OverhandThrow-truth`). Unit tests recover a posed skeleton to within 1 cm at every limb joint |
| What the pose model saw in a front render of the clip (`OverhandThrow-seen`) | From the front, recognisably the same throw. From the side, wrong: the step forward into the throw is missing and the feet tilt (`clip-capture-OverhandThrow-seen`) |

The pose model's landmarks were on average 18 cm from the truth after levelling (21 cm before), split very unevenly: about 3 cm across the image, 7 cm vertically, 15 cm in depth. It also saw a bend at the hips that was not there (torso 23° forward, legs 9°, where the truth is 4° back and 2°). The `--level` option removes the constant part of that tilt and nothing more.

**What this means**

- The retargeting half works and is tested. Whatever produces good landmarks will produce a good clip.
- One camera gives good motion across the picture and poor motion toward or away from it. A stroke filmed so that the bat swing crosses the frame should fare better than this throw, which lunges at the camera, but the depth part of any stroke (the stride, the shoulder turn) will be weak.
- The test subject was a purple mannequin render, not a person. The pose model is trained on people, so a real video may do better. That is not known until one is tried.
- Hands: the pose model gives three points per hand. That is enough for the hand's direction, not for a grip on a bat. The bat would be attached to the hands by IK in the animation runtime (issue #20).

## The video-file path, exercised with a stand-in (2026-11-17)

The owner had no video yet and asked for the work to continue without one. So, instead of a cover drive, the same library throw was rendered to two ordinary video files (MP4, H.264, 30 fps, 720 x 660, one from the front and one from the side) and each was read through the page's file picker exactly as a phone video would be: pick the file, name it, press Capture. Then `retarget-capture.ts <name> --face --level` (`--face` was added afterwards; see below), `npm run assets`, and the contact sheets `clip-capture-standin-throw-front` and `clip-capture-standin-throw-side`. The videos are not in the repository; the landmarks and clips are.

**The path works.** Both files were decoded, seeked and read with a person found in all 40 frames. Two defects were found and fixed in `src/lab/capture/main.ts`: the last frame was dropped (the frame count rounded down a duration of 1.3333 s), and seeks landed exactly on frame boundaries, where a decoder may return either neighbour; seeks now aim at the middle of each 1/30 s. A video that reports no length (common for recordings saved by a browser) now fails with a message instead of looping.

**Measured against the clip's true joint positions** (each capture from its own hip midpoint, after the one rotation about the vertical that fits best, unlevelled):

| Take | Mean error | Across the picture | Vertical | Toward or away from the camera |
| --- | --- | --- | --- | --- |
| Front, from the video file | 20.5 cm | 5.9 cm | 6.4 cm | 16.9 cm |
| Front, rendered straight into the pose model (earlier) | 20.2 cm | 5.3 cm | 6.6 cm | 16.6 cm |
| Side, from the video file | 14.1 cm | 5.0 cm | 4.5 cm | 10.5 cm |

The front take from a file matches the earlier in-browser result, so video compression and seeking cost nothing measurable. The side take is clearly better for this motion, because the throw's lunge runs across that camera's picture.

**What the sheets show.**

- Side take, seen from the camera it was filmed with (its left panel): the lunge is there, a long stride with the back leg straight and the body bent over the front knee, close to the original's side view. This is the step that the front take loses.
- Side take, from 90 degrees to that camera (its right panel): wrong in the way the numbers predict. The feet stay too close together, the legs look pinched inward, and the bend toward the camera is much weaker than in the original.
- Before facing was added (below), the whole side-take clip faced 90 degrees away from the original. The pose model reports the body relative to the camera, so a clip faced whichever way the camera looked.
- Front take: as before, the step forward is missing from the side and the feet tilt.

**Facing a clip forward (`--face`).** `retarget-capture.ts <name> --face` turns every frame about the vertical by one angle, chosen so that the chest faces the skeleton's forward (+Z) in the first frame, where the subject is asked to stand square. No camera position needs to be stated. `--yaw <degrees>` turns further when the first frame is not square. It runs before `--level`, which only removes tilt in the forward-vertical plane; without it, levelling a side take corrected tilt in the wrong plane. Unit test: a body turned a quarter turn comes back facing forward, and later frames keep their turn relative to the first.

With `--face`, the side take lands within 6 degrees of the best fitting turn (14.5 cm mean against 14.1 cm at the best turn; both captures and the truth faced the same way). The library throw itself starts about 17 degrees from square, so both faced clips turn by that much against the original.

The faced side take's sheet (`clip-capture-standin-throw-side`): it stands and finishes facing forward like the original, and from the side the lunge is a long stride with the body bent over the front knee. What is wrong: through the lunge (0.4 to 0.9 s) the body turns too far toward profile, so from the front the stride looks partly sideways. That is the side camera's depth axis, which is the subject's left and right.

For batting, "forward" is the batter's chest in the stance, which faces point for a right-hander, not down the pitch. Placing a batting clip at the crease is the animation runtime's job (issue #20).

**What this means for a cover drive.** Film it from point (side-on), as already asked. The stride and the downswing then cross the picture, which is the axis the pose model gets right. The shoulder turn and how far the front foot lands toward or away from the off side will be the weak part. The stand-in is still a purple mannequin, not a person, so none of this is a judgement of real footage.

**To judge the route, the owner supplies one video**: a right-handed cover drive, shadow-batted, whole body in frame, phone held still at about chest height, starting from standing upright for a second. Two takes would be better: one from side-on (point, looking at the batter's chest) and one from the bowler's end. Then:

1. `npm run dev`, open `/lab/capture.html`, pick the video, name it `cover-drive`, press Capture.
2. `node tools/assets/retarget-capture.ts cover-drive --face --level`
3. `npm run assets`, add the `ASSETS.md` rows (own work), add the name to `CANDIDATE_CLIPS` and `CLIP_REVIEWS`, capture and look.

If one camera is not good enough, the next step within this route is to combine the two takes, using each for the axes it sees well. That is not built.

## Recipe for a library clip (the part that works)

1. Download the Standard zip of the library from quaternius.itch.io and unzip it outside the repository.
2. `node tools/assets/extract-clips.ts <library>.glb assets/src/clips/<set>.glb --clips Name_One,Name_Two`
3. `npm run assets`
4. Add rows to `ASSETS.md` for the source and the built file.
5. Add the names to `CANDIDATE_CLIPS` in `src/lab/scenes/clip-review.ts` and to `CLIP_REVIEWS` in `tools/capture/scenarios.ts`, then `npm run capture -- --scenario clip-<name>` and look at the sheet.

## Not covered

Any real video (the stand-in is a render of a library clip), phone formats (portrait, 60 fps, HEVC `.mov`) beyond the one MP4 tried, a first frame that is not square (only `--yaw` by hand), two-camera capture, retargeting to a character with different proportions, foot sliding when a clip is played while moving, and whether the mannequin itself is the base body for issue #19 (it is a stylised female figure; the plan calls for a 1.80 m adult default).
