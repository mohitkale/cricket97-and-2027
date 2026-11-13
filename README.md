# Cricket: Then. Now. Always.

> **Status: being rebuilt.** The code on `main` is an early prototype kept as a reference. The plan is in [docs/PLAN.md](docs/PLAN.md), the tasks are in the [issues](../../issues) grouped by [milestone](../../milestones), and contributor and agent rules are in [AGENTS.md](AGENTS.md). The prototype now lives in `legacy/` and is served at `/legacy/`; the rest of this page describes it.

A local Three.js cricket game with two eras over one shared match engine. Open the page to choose the **1997 Edition**, a low-poly arcade game, or the **2027 Edition**, a contemporary presentation with athletic characters, coloured kits, modern stadium treatments, and upgraded movement and ball flight.

**Name and originality.** The game is called *Cricket: Then. Now. Always.* and its two editions are the *1997 Edition* and the *2027 Edition*. It is an original game in a genre. Nothing is taken from any commercial cricket title: no names, logos, menus, fonts, art, music, commentary lines or recordings. Players and sponsors are fictional; squads are editable data. Both editions work offline once built.

## Play

With Node 24 and Python 3 installed, from this folder run:

```sh
npm ci
npm run build
npm start
```

Open http://127.0.0.1:4173 in a browser with WebGL. No internet connection is required to play.

Choose an era on the opening screen. Direct links also work: `/legacy/?era=97` and `/legacy/?era=2027`. **Change Era** returns to the opening screen; switching editions starts a fresh match. In the modern setup you can select Horizon Arena, Coastal Oval, or Riverside Ground: fictional venues sharing a common stadium model with different turf, lighting, and graphic palettes.

### What changes in 2027

- Six fictional 15-player squads with reserves, handedness, playing roles, and bowling styles.
- Adult-height articulated characters with locally generated skinned bodies, full coloured kits, caps/helmets, faces, gloves, pads, and fixed-length arm IK. Their appearances are generic.
- Gradual acceleration, braking, bounded turns, distance-driven strides, independent player phases, reaction delays, interception, and collision-aware kinematic capsules.
- Crouching pickups with planted feet, swept hand-contact catches, predictive fielding, jumps, diving catches/stops, slides, and getting back up. Fielders keep their momentum and brake after a boundary. Backward pursuit uses a separate balanced gait. Forearms flex forward, shoulders counter-swing, and IK alternates grounded support and lifted steps; reaching poses blend back into running without arm flips. Bowling follow-through and crease returns also use the athletic rig.
- Cricket-specific backlift, downswing and follow-through; two-handed bat grips; bowling gather, front-foot plant and overhead release. Player, ball, bat and wicket scale are calibrated together. A fixed elevated end camera shows the full run-up and release; stand cameras cover the field with pan, tilt, zoom and broadcast cuts.
- Rapier delivery flight and pitch bounce, a separate pitch surface, calibrated seam-swing/spin/drag approximations, ball CCD, timing-dependent shot direction, and live return throws with release errors and moving receivers.
- Return wind-ups, clean takes, direct-hit attempts, and live overthrows. Run-outs in 2027 require ball contact with the wicket while the threatened batter’s feet/bat remain short of the crease; runners stretch and lower their bats approaching it.
- Floodlit stadium canopies, LED ribbons, live stadium score screens, seating rows, crowd arms/flags/phones, a new matchday/setup design, and interpolated replays.

The editions share scoring, shot definitions, running decisions, bowling rotation, toss, match statistics, input handling, audio, replay recording, and the scene. There is no cloned modern game. See [the architecture notes](docs/legacy/era-architecture.md) for extension points and remaining simulation limits.

To play on a phone connected to the same trusted Wi-Fi network, stop the local server and run `python3 -m http.server 4173 --bind 0.0.0.0 --directory dist` from this folder. On the phone, open `http://<your-computer-local-IP>:4173/`. This makes the game available to other devices on that local network while the server is running.

Choose two teams and arrange the first 11 players, then start the match. Call heads or tails and choose whether to bat or bowl if you win; the computer chooses if it wins. You control your team in both innings. Choose 2, 5, 10 or 20 overs per side; 5 is the default. Bowlers can bowl at most 1, 1, 2 or 4 overs respectively; longer matches use additional bowlers where available.

- **Batting:** The computer starts each delivery automatically. Use Left or Right for cover drives, Up for an attacking drive, Down to defend, or Space to sweep behind the wicket. Keys 1–5 select hook, pull, cut, flick and straight drive; these shots are also available on the touch pad. A shot pressed during the run-up is queued for contact; time a later press when HIT NOW appears. The labelled arrow pad and shot row show every shortcut. Press two shot keys together or in quick succession to blend their directions. Hold Shift with a shot for a lofted super boost; on touch screens, tap SUPER before choosing a shot. Each batting side gets two boost attempts per over; an attempt on a wide or no-ball also uses one. Shot and power selections clear when the ball reaches the batter.
- **Bowling:** Press Left for full, Down for good length, Right for short, Q for a yorker, E for a bouncer, or F for a full toss; the selected delivery bowls immediately. All choices are available as touch buttons. Bowlers rotate by over using the selected XI, and their individual pace or spin styles and handedness determine their deliveries.
- **Running:** Batters automatically attempt one run on a drive, then hold their ground. Press **Down** at the crease to start another run. During a run, Down sends the batters back before halfway and queues another run after halfway. Press **R** or tap **Run / Next** to queue the next run at any point. A throw can cause a run-out.
- **Replays:** Replays are off by default. Enable boundary and/or wicket replays in match setup; enabled replays show the actual delivery. Tap **Skip Replay**, or press **K**, Escape or Space to continue.
- **Cameras:** Press C or click the camera button to cycle through Auto, Stadium, Bowler, Keeper and Batter views. In 2027, Auto holds an elevated end-of-ground camera throughout the delivery, then cuts to one of eight fixed stand cameras according to shot direction. Camera mounts stay stationary; only pan, tilt and zoom track the ball. Return throws cut back to the end camera as the ball approaches the wickets. Replays preserve those cuts. The 1997 camera behavior is unchanged. When the ball leaves the pitch, a live overhead inset shows the actual batters until the return throw.
- **Fullscreen and pause:** During a match, use the pause button or the fullscreen button next to LIVE; press Escape or the same button to exit. The live scorecard shows both batters’ strike rates and the current bowler’s economy. At the innings break and at full time, the scorecards show each batter and bowler who took part.
- **Difficulty:** Choose Normal or Easy at match setup. Easy gives the human batter a wider timing window and more power on attacking shots.
- **Day / night:** Choose a day or floodlit night match in the setup screen. The DAY / NIGHT button beside the camera can also switch conditions during play.
- **Sound:** A generated crowd bed and offline spoken commentary start when a match begins. The crowd responds to deliveries, shots, close throws, runs, boundaries, wickets and a tight chase; it ducks under commentary. Use the sound button to mute or restore all crowd audio. The clips are included locally; browser audio requires starting a match or tapping the sound button. Play pauses and sound is suspended when the game tab is hidden. Starting a match in another updated game tab pauses the first; use Resume This Match to continue it. Refresh older tabs so they get this behavior.

This is an arcade simulation: deliveries vary in line, length and pace; shots use the locally bundled Rapier physics engine for gravity and turf contact, bounce and rolling resistance. the 1997 Edition deliveries before contact use simplified cricket trajectories; the 2027 Edition simulates released deliveries in Rapier. A shot’s reachable height and line, and its outgoing angle, depend on the delivery. The ball remains live after a wide or a missed delivery: the keeper can collect it or the fielders can chase it. Runs from a wide are wides, while runs from an untouched legal delivery are byes. Wides and no-balls add one extra and are re-bowled; a no-ball can still be hit, but only run-out dismissals are modelled on an illegal delivery. Two fielders pursue and gather the ball, throw to the wicketkeeper’s gloves, batters run between creases, stumps and bails move on bowled and run-out dismissals, and catches, bowled, LBW and run-outs can occur. The non-striker takes a position opposite the bowler's approach, including when the bowling arm changes. Timing, shot selection and chance affect outcomes. Players and spectators are stylized low-poly models, and the reserves are fictional placeholders. Player introductions use bundled full-name recordings; batting stances and bowling arms follow the roster’s handedness. The dismissal decisions and running rules are simplified; leg-byes, free hits, complete player attributes and the original game's exact mechanics are not included.

## Development

The source uses Vite, Three.js 0.187.0 and Rapier 0.21.0. With network access, run `npm install`, then `npm run dev` or `npm run build`. Run `npm test` for the shared/classic and modern regression suites. In development, `/legacy/?era=2027&fieldingLab=1` opens slow-motion drills for catches, dives, rope saves, backward pursuit, return throws, run-out attempts, and missed returns. Open them with Fielding Checks; close the panel with × or Escape. The drills use live physics and contact decisions; this panel is excluded from production.

## Audio credits

- Audience applause is an excerpt of [Slow starting applause](https://commons.wikimedia.org/wiki/File:Slow_starting_applause.ogg) by stephan, released into the public domain. It was excerpted, normalized, faded and converted to MP3.
- Audience gasp is adapted from [Ohhh ahhh](https://commons.wikimedia.org/wiki/File:Ohhh_ahhh.ogg) by starlite, released into the public domain. It was normalized, faded and converted to MP3.
