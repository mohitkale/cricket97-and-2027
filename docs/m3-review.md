# M3 motion and fielding review

## #29 Full-over clip set

Reviewed the front and side Chromium contact sheets for the full clip set. The new hand-keyed takes provide the change-of-direction and stopping motions, fielding and keeping actions, batting strokes and running, spin releases, signals and reactions. The Quaternius clips supply the established gaits, overarm throw and slide. The individual takes are available under `/lab/?scene=clip-<name>`.

`src/anim/over-clips.test.ts` checks each take's shared-rig bindings and markers. At 120 Hz it verifies less than 2 cm of drift in authored support intervals and less than 1 cm from either wrist to the handle throughout the eight new two-handed takes. It also measures the grounding, pickup and release reference poses. The review was delegated by the owner.

## #30 Fielding and wicketkeeping

The 50 seeded plays produced 24 catches and 32 gathers. The worst displayed hand-to-ball error was 3.36 cm across the shared base rig and both 2027 fits. The measured distance is from the full-sized ball's centre to the farther hand on two-handed contacts. The return-release and stumping checks use the same event renderer. The tests exercise automatic returns and both explicit return ends.

Reviewed the harness sheets for `fielding-chase`, `fielding-dive`, `fielding-caught-behind`, `fielding-stumping` and `pace-practice-portrait`. The fielding captures use seeded scenarios starting from a batted trajectory, except the stumping, which runs a full spin delivery. The portrait route shows the existing bowler-end framing through contact before following the ball into the field. Real-phone performance remains unmeasured.

## #28 Bowling controls

Two fresh Chrome sessions completed six legal stock balls on their first attempt. The keyboard session used the arrow-key aim and Space release. The touch session used release taps in a phone viewport. Chrome on Intel UHD Graphics 630 submitted the visible aim change in 4.9 ms and the first changed delivery frames within 11.3 ms for keyboard and 36 ms for touch. The pace and off-spin lab captures show the timing meter, run-up and authored release. A two-person hallway test and real-phone input measurements remain open.

## #31 Running between wickets

Casual calls runs automatically. In Classic and Pro, use **Run** or **R**. The same control calls both batters back once they are running. The risk text compares the sim's estimated run and return times.

Reviewed `running-safe` and `running-short` at the wicket-break frame. The rendered bat was 45.8 cm past the crease on the safe call and 17.8 cm short on the run-out. The replay test compares the displayed blade with the sim's grounding position and verifies that canceling returns both batters without scoring. The run and cancel traces matched in Node, Chromium, Firefox and WebKit.
