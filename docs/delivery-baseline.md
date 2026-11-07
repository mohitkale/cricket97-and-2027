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
