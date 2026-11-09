# One-over performance capture

Run `npm run dev` and open `/?era=2027&benchmark`. Bat first, leave replays off and play a full over. Press a shot during each live delivery. In the browser console, run `window.cricketBenchmark()`. The capture stops after six legal deliveries, including any intervening extras. Reload to start a new capture. Repeat with `?era=97&benchmark` on the same device and viewport. For Android, use Chrome remote debugging to read the report.

Frame intervals use animation-frame timestamps during active deliveries. Inter-delivery gaps, paused frames and background discontinuities are excluded. The reported p95 pools the frames from every captured delivery. Shot response starts when the game accepts a live swing and ends when the engine submits a frame with a positive stroke phase. This includes the game's wait for its swing window. Hardware touch processing, display scanout and shots queued before a delivery are outside this measurement. A missing response means no qualifying swing frame was measured for that ball.

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
