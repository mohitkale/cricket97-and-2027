# Cricket '97: The Classic Game

A local, low-poly cricket game inspired by the look and spirit of late-1990s cricket games. This is an original arcade homage, not a reproduction of the original game.

## Play

The production build is included and needs Python 3 and npm to run the command below. From this folder run:

```sh
npm start
```

Open http://127.0.0.1:4173 in a browser with WebGL. No internet connection is required to play.

To play on a phone connected to the same trusted Wi-Fi network, stop the local server and run `python3 -m http.server 4173 --bind 0.0.0.0 --directory dist` from this folder. On the phone, open `http://<your-computer-local-IP>:4173/`. This makes the game available to other devices on that local network while the server is running.

Choose two teams and arrange the first 11 players, then start the match. Your side bats first; the computer bowls. In the second innings, you bowl and the computer bats. Each side has two overs.

- **Batting:** The computer starts each delivery automatically. When the screen says HIT NOW, use Left or Right for cover drives, Up for an attacking drive, Down to defend, or Space to sweep behind the wicket. Keys 1–4 select hook, pull, cut and flick. The translucent pad offers the same shots by touch.
- **Bowling:** Press Left for full, Down for good length, Right for short, Q for a yorker, E for a bouncer, or F for a full toss; press Space or Enter to bowl. All choices are available as touch buttons. Choose Pace or Spin in match setup; Spin selects the eighth player and produces a slower ball with turn.
- **Running:** Batters automatically attempt one run on a drive, then hold their ground. Press **R** or tap **Run** to attempt another run while the ball is live. Press **Down** or tap the down arrow to send batters back during a run. A throw can cause a run-out.
- **Replays:** Replays are off by default. Enable boundary and/or wicket replays in match setup; enabled replays show the actual delivery. Tap **Skip Replay**, or press **K**, Escape or Space to continue.
- **Cameras:** Press C or click the camera button to cycle through Auto, Stadium, Bowler, Keeper and Batter views. Auto starts behind the bowler and follows the ball after contact.
- **Fullscreen and pause:** During a match, use the pause button or the fullscreen button next to LIVE; press Escape or the same button to exit. The scorecard shows the two batters and the current bowler.
- **Difficulty:** Choose Normal or Easy at match setup. Easy gives the human batter a wider timing window and more power on attacking shots.
- **Day / night:** Choose a day or floodlit night match in the setup screen. The DAY / NIGHT button beside the camera can also switch conditions during play.
- **Sound:** A recorded stadium crowd and offline spoken commentary start when a match begins. The crowd responds to deliveries, shots, close throws, runs, boundaries, wickets and a tight chase; it ducks under commentary. Use the sound button to mute or restore all crowd audio. The clips are included locally; browser audio requires starting a match or tapping the sound button. Play pauses and sound is suspended when the game tab is hidden. Starting a match in another updated game tab pauses the first; use Resume This Match to continue it. Refresh older tabs so they get this behavior.

This is an arcade simulation: deliveries vary in line, length and pace; shots follow gravity, bounce and slow on the turf. A shot’s reachable height and line, and its outgoing angle, depend on the delivery. Wides and no-balls add one extra and are re-bowled; a no-ball can still be hit, but only run-out dismissals are modelled on an illegal delivery. Two fielders pursue and gather the ball, throw to the wicketkeeper’s gloves, batters run between creases, stumps and bails move on bowled and run-out dismissals, and catches, bowled, LBW and run-outs can occur. The non-striker takes a position opposite the bowler's approach, including when the bowling arm changes. Timing, shot selection and chance affect outcomes. Players and spectators are stylized low-poly models, and the reserves are fictional placeholders. Player introductions use bundled full-name recordings; batting stances and bowling arms follow the roster’s handedness. The dismissal decisions and running rules are simplified; byes, leg-byes, free hits, player attributes and the original game's exact mechanics are not included.

The local boundary artwork includes the [Jio logo](https://commons.wikimedia.org/wiki/File:Reliance_Jio_Logo.svg), the [Adani logo](https://commons.wikimedia.org/wiki/File:Adani_logo_2012.svg), and a [Vimal Elaichi trademark image](https://www.quickcompany.in/trademarks/3394689-vimal-elaichi). Their respective owners retain their trademarks.

## Development

The source uses Vite and Three.js 0.187.0. With network access, run `npm install`, then `npm run dev` or `npm run build`. The included `dist/` can be played without installing packages.

## Audio credits

- Stadium ambience is an excerpt of [WWS FootballAustriavs.Sweden](https://commons.wikimedia.org/wiki/File:WWS_FootballAustriavs.Sweden.ogg), recorded by Work With Sounds / Torsten Nilsson, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The recording was excerpted, normalized, faded and converted to MP3. It is a football crowd recording used for stadium atmosphere.
- Audience applause is an excerpt of [Slow starting applause](https://commons.wikimedia.org/wiki/File:Slow_starting_applause.ogg) by stephan, released into the public domain. It was excerpted, normalized, faded and converted to MP3.
- Audience gasp is adapted from [Ohhh ahhh](https://commons.wikimedia.org/wiki/File:Ohhh_ahhh.ogg) by starlite, released into the public domain. It was normalized, faded and converted to MP3.
