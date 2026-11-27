# M3 motion and fielding review

## #29 Full-over clip set

Reviewed the front and side Chromium contact sheets for the full clip set. The new hand-keyed takes provide the change-of-direction and stopping motions, fielding and keeping actions, batting strokes and running, spin releases, signals and reactions. The Quaternius clips supply the established gaits, overarm throw and slide. The individual takes are available under `/lab/?scene=clip-<name>`.

`src/anim/over-clips.test.ts` checks each take's shared-rig bindings and markers. At 120 Hz it verifies less than 2 cm of drift in authored support intervals and less than 1 cm from either wrist to the handle throughout the eight new two-handed takes. It also measures the grounding, pickup and release reference poses. The review was delegated by the owner.

## #30 Fielding and wicketkeeping

The 50 seeded plays produced 24 catches and 32 gathers. The worst displayed hand-to-ball error was 3.36 cm across the shared base rig and both 2027 fits. The measured distance is from the full-sized ball's centre to the farther hand on two-handed contacts. The return-release and stumping checks use the same event renderer. The tests exercise automatic returns and both explicit return ends.

Reviewed the harness sheets for `fielding-chase`, `fielding-dive`, `fielding-caught-behind`, `fielding-stumping` and `pace-practice-portrait`. The fielding captures use seeded scenarios starting from a batted trajectory, except the stumping, which runs a full spin delivery. The portrait route shows the existing bowler-end framing through contact before following the ball into the field. Real-phone performance remains unmeasured.
