# One-over performance capture

Run `npm run dev` and open `/?era=2027&benchmark`. Bat first, leave replays off and play a full over. Press a shot during each live delivery. In the browser console, run `window.cricketBenchmark()`. The capture stops after six legal deliveries, including any intervening extras. Reload to start a new capture. Repeat with `?era=97&benchmark` on the same device and viewport. For Android, use Chrome remote debugging to read the report.

Frame intervals use animation-frame timestamps during active deliveries. Inter-delivery gaps, paused frames and background discontinuities are excluded. The reported p95 pools the frames from every captured delivery. Shot response starts when the game accepts a live swing and ends when the engine submits a frame with a positive stroke phase. This includes the game's wait for its swing window. Hardware touch processing, display scanout and shots queued before a delivery are outside this measurement. A missing response means no qualifying swing frame was measured for that ball.

## Repeat the capture from a terminal

Start Vite and a dedicated Chrome instance with remote debugging enabled on a loopback port. With Node 22 or newer, run the following command from the repository root, substituting the two local ports as needed:

```sh
node scripts/benchmark-over.mjs http://127.0.0.1:5173 http://127.0.0.1:9222
```

The script creates a temporary tab, sets up the reference workload, prints the six-ball report as JSON and closes its tab. Record the viewport, render ratios and browser from the report alongside the hardware used. A separate Chrome profile avoids competing game tabs.

## Reference workload

Local Vite development build in headless desktop Chrome on macOS. Start the default India versus Australia match with heads, bat first, normal difficulty and replays off. For this controlled comparison, the browser driver fixed Math.random to 0.25 at setup and clicked Defend on the first animation frame showing HIT NOW for each delivery. The diagnostic URL is available only in development. This workload measures repeated good-length balls. Hardware and GPU differences can change the result substantially.

MacBookPro16,1, Intel Core i7-9750H, 16 GB RAM, headless Chrome 156, 880 × 693 CSS pixels at render pixel ratio 1. No Android handset was attached during this run.

| Edition | Live frame intervals | Median interval | 95th percentile interval | Accepted swing to render submission, balls 1–6 (ms) |
| --- | ---: | ---: | ---: | --- |
| 2027 | 2,199 | 16.7 ms | 66.6 ms | 101.0, 133.1, 75.3, 135.2, 97.3, 179.0 |
| 97 | 2,560 | 16.7 ms | 50.1 ms | 157.3, 133.1, 173.1, 116.3, 116.6, 133.1 |

The 2027 over exceeded the proposed 33 ms frame target at p95. Four of its six shots exceeded the 100 ms response target. At the first HIT NOW frame, the cue can appear 480 ms before projected impact while the stroke is scheduled no earlier than 350 ms before impact. That creates up to roughly 130 ms of intentional wait for an on-cue input before rendering cost. For the next batting change, prototype an immediate preparation pose while preserving the timed contact frame, then repeat this capture. Use a GPU trace to investigate slow frames separately. These desktop measurements establish a comparison point. Physical-phone performance and end-to-end touch latency still require a handset.

## Task 2 stock-striker comparison

Repeated the same desktop workload with the 698-vertex fitted body. The final stock-body over produced 1,005 frame intervals, a 16.8 ms median and a 350 ms p95. The contemporaneous classic run also slowed down (1,240 intervals, 16.7 ms median, 166.6 ms p95). Chrome logged CVDisplayLink creation failures in this headless session. These runs miss the frame-time target and are unsuitable for estimating phone performance.

Blocking the asset and repeating the identical modern over produced 947 intervals, 16.7 ms median and 400 ms p95. The fallback also completed all six deliveries. The slow tail persists with either body. A hardware GPU trace remains necessary before assigning a cause or expanding the rig to all players.

## November 9 follow-up

The real-time Chrome capture at 880 × 693 produced 2,552 live frame intervals. Median was 16.7 ms and p95 was 83.3 ms. Adaptive rendering changed from pixel ratio 1 to 0.8 during the first delivery. The six accepted defensive shots reached their first submitted swing frames in 13.7, 16.5, 144.1, 18.8, 116.5 and 88.4 ms. Four met the 100 ms target. The p95 frame target remains open. This capture includes the revised batting pose and keeper substeps. The accelerated long-match checks use a different clock and are only for functional validation.

The following renderer change keeps the existing manual scene transform pass for the modern instanced players and reuses its results for rendering. It also updates instance colours only when they change. A repeat over on the same workload produced 2,442 live intervals, a 16.7 ms median and a 50.0 ms p95. Input-to-render samples were 16.9, 221.4, 62.4, 58.2, 14.7 and 9.7 ms. Five of six met the input target; the 33 ms frame target remains open. An isolated 15-actor CPU comparison over 270 measured updates showed a median of 0.90 ms before and 0.64 ms after; this isolates actor updates and does not measure GPU cost.

In a 390 × 844 CSS-pixel Chrome viewport at DPR 2, touch input successfully opened setup, started a match, skipped the intro and played a legal scoring shot. The narrower score overlay, mirrored control placement and portrait camera preserve space for the striker, wicket and bounce. See [portrait batting capture](qa/portrait-batting.png). There was no connected Android handset.

## Stadium fixtures and optional replay capture

Repeated the six-ball desktop defence workload on 9 November at 880 × 693. The starting build recorded 2,178 live frame intervals, a 16.7 ms median and 50.0 ms p95. Five of six input-to-render samples were under 100 ms. A three-second CPU profile showed draw submission and shader setup among the sampled rendering costs.

Grouping repeated flagpoles, tower supports, lamps and advertising fixtures reduced the fixed preview from 173 to 157 draw calls. The match also skips pose recording when neither modern replay option is selected. With these changes the repeat over recorded 2,556 live intervals, a 16.7 ms median and 33.3 ms p95. The six response samples were 9.9, 15.4, 17.1, 16.2, 81.9 and 15.9 ms. Both runs retained pixel ratio 1. These are paired workload observations in headless Chrome; they do not isolate either change's contribution or establish handset performance.


On the build with partial crowd uploads, a subsequent full over recorded 100 ms p95 and four of six inputs below 100 ms. In a follow-up over alternating between full uploads on odd-numbered deliveries and partial uploads on even-numbered deliveries, the three paired p95 values (full vs partial, ms) were 83.4 vs 83.3, 66.7 vs 66.7, and 66.6 vs 66.7. Partial uploads reduce bytes transferred; this comparison found no discernible frame-time benefit or penalty. The rendering target remains open.

The checked-in benchmark runner completed its own six-ball verification on the final build: 1,737 frame intervals, 33.2 ms median, 83.3 ms p95, and five of six inputs below 100 ms. The final render ratio was 0.8. Across these runs, the preview draw-count reduction and smaller crowd transfers were reproducible; the 33 ms live-frame target was not.

A separate 390 × 844 portrait run used emulated touch events on the visible Play Shot button for six deliveries. All six inputs registered. Accepted-shot-to-render times were 8.3, 28.7, 20.4, 27.9, 82.3 and 25.1 ms. Across 1,542 live intervals the median was 33.3 ms and p95 was 83.4 ms, with the render ratio dropping from 1.5 to 0.8. This validates assisted touch input at a phone viewport, not physical touch-to-display latency.
