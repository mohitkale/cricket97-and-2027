# Delegated review for M2

Reviewed on November 27, 2026. The local pace practice is available at `http://127.0.0.1:4173/play/`. The existing match remains at `http://127.0.0.1:4173/legacy/?era=2027`. The practice uses the new simulation and shared-rig assets. The match route preserves the existing 2027 setup and Auto camera.

| Issue | Local evidence |
| --- | --- |
| #92 and #20 | Reviewed both fitted batting stances and both grips in Chromium. The worst measured foot drift and top-wrist error were both 0.02 cm. The warmed browser sample attributed zero allocations to the project runtime over its three sampled configurations. |
| #21 | Reviewed the original cover drive, front-foot defence and pace action at full and quarter speed. These complete the first-ball clip set. The tests sample the batting grips and support plants at 240 Hz. The bowling release also passes the measured elbow-extension check. |
| #22 | `pace-bowler-flight` shows the run-up, gather, release and flight. `pace-sim-release` holds the event and reads 0.00 cm from the bowling-hand socket to the sim ball centre. |
| #23 | `bat-contact-clean`, `bat-contact-late`, `bat-contact-edge` and `bat-contact-miss` show the animated batter and the simulated trajectories. The clean, late and edge holds read 0.0 cm from the displayed sweet spot to the simulated pose. The 30 seeded tests cover both batting hands and preserve the sim's off-centre impacts. |
| #24 | Completed five overs using keyboard and five using touch input with Chromium's phone viewport. The keyboard run finished on 23/3 and the touch run on 44/3. Observed timing feedback after each played ball. Installed Chrome on Intel UHD Graphics 630 submitted the first visibly moved bat pose after 15.4 ms for a keyboard shot and 13.8 ms for a touch tap. These are browser render-submission measurements. |
| #25 | Reviewed the whole run-up, release, bounce, contact and shot follow at 16:9, 20:9 and 9:19.5. The camera holds the lens and position through contact before panning to follow the simulated ball. |
| #27 | The five-over browser checks finished in both input modes. The live Chrome probes had 16.7 ms median and 90th-percentile frame intervals. Touch was exercised on the laptop in a phone viewport. A five-over playthrough and frame-pacing check on a real phone are still pending. |

The local suite has 555 passing tests. The traced delivery matches in Node, Chromium, Firefox and WebKit. Contact sheets and short videos are under the local `captures/m2-local/` directory.

Once the device check is established, publish the M2 branch as one PR, wait for CI and captures, squash-merge, and fast-forward local `main`. Full-over motion #29 follows the M2 gate. The fielding integration #30 then verifies 50 seeded catches and gathers before #48's full character, kit and rendering acceptance.
