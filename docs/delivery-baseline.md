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

## Mobile simulator verification, 10 November 2026

The iPhone 17 Pro simulator ran Safari 26.5 at a 402 × 714 CSS viewport. The Pixel API 36 emulator ran Chrome 134 at 411 × 785. The browser harness selected two overs, skipped the intro and used the visible assisted controls. Timing starts at accepted input and ends at WebGL submission. Emulator rendering and synthetic input do not measure physical touch-to-display latency.

Safari finished with India 37/0 and Australia successfully chasing. During a background/resume at 33/0 after 1.5 overs, the same score appeared when the tab became visible. Pixel Chrome finished with India 20/0 and Australia 22/3. A Pixel landscape check resized the live viewport to 865 × 307 before returning to portrait. The [game-speed recording](qa/portrait-game-speed.mp4) covers the left-handed yorker, spin bounce and bowler’s-end return.

| Workload | Frame p95 | Accepted shot to render (ms) |
|---|---:|---|
| Safari batting, initial | 111 ms | 57, 14, 37, 42, 32, 14 |
| Safari batting, reduced crowd and mobile drawing buffer | 77 ms | 18, 15, 31, 20, 32, 30 |
| Pixel batting, before primitive batching changes | 150.1 ms | 181.9, 152.6, 79.6, 96.3, 41.9, 27.4 |
| Pixel bowling, batched primitives and mobile geometry | 16.8 ms | No batting inputs |
| Pixel batting, batched primitives and mobile geometry | 16.8 ms | 115.5, 10.5, 13.1, 14.8, 14.5, 8.4 |
| Pixel batting, shot handler without full UI rebuild | 33.3 ms | 78.3, 25.4, 14.8, 8.1, 16.1, 8.8 |

The final Pixel input check addressed the first-shot response miss. All six samples met 100 ms. Its first two deliveries recorded 50 ms p95 and the last four recorded 16.8 ms; the pooled 33.3 ms still misses the strict under-33-ms target. The next change starts mobile at render ratio 0.8 to avoid waiting for the initial downshift. That setting retains gradual recovery to the device ceiling.

## Final Safari regression investigation, 11 November 2026

On the updated mobile renderer at ratio 0.8, a six-ball Safari run recorded 107 ms p95 with responses 49, 9, 50, 93, 48 and 14 ms. A short instrumented follow-up measured the animation callback itself at 7 ms median / 16 ms p95 and draw submission at 4 ms median / 7 ms p95. The larger animation-frame intervals therefore include time outside the measured callback; this trace does not isolate WebKit, GPU or simulator scheduling.

Old local QA tabs were navigated away when hidden, then the same six-ball workload was repeated to investigate tab interference. At 402 × 714, the isolated simulator run recorded 1,151 live intervals, 38 ms median and 64 ms p95. All six responses met 100 ms: 26, 17, 16, 38, 19 and 10 ms. The drawing-buffer ratio remained 0.8 throughout. These observations improve the recorded simulator result but still fail the strict under-33-ms frame target. No additional benchmark repetitions were made after that investigation.

The full source suite passed 138 tests and the production build passed. Vite continues to warn about the existing large Rapier chunk. Raw browser traces, benchmark JSON and command logs stay local under `/tmp/cricket-final-qa`; only the summarized evidence and review artifacts are checked in.

Production smoke at 756 × 469 completed a classic over with zero model requests. The modern check blocked the fitted-body model and applied 150 ms network latency / 150,000 bytes/s download throughput, then completed a legal delivery using the procedural fallback. Neither case reported a JavaScript exception. This functional smoke is separate from the mobile performance workload.

## Final task audit and remaining frame criterion, 11 November

The follow-up pass removed redundant live cue and visibility mutations, stopped updating the invisible modern ball trail and removed mobile backdrop blur. A six-ball Safari simulator over at 402 × 714 / ratio 0.8 recorded 1,192 intervals, 36 ms median and 58 ms p95. Accepted-shot responses were 46, 38, 27, 14, 36 and 36 ms.

The next change reduced mobile seats from 6,000 to 1,500 and removed small equipment batches from the shadow pass, retaining skinned-body shadows. Ordinary mobile frames fell from about 200,080 to 146,080 triangles. The specific follow-up over recorded 1,278 intervals, 36 ms median and 61 ms p95, with responses 41, 22, 22, 21, 41 and 13 ms. The lower geometry cost is reproducible; these simulator observations do not establish a frame-time improvement or meet 33 ms. Match randomness was retained, so these are not isolated estimates of either change's effect.

To distinguish scene cost from simulator scheduling, a separate page sampled eight seconds without WebGL, then eight seconds clearing a 321 × 392 WebGL canvas. The matched context disabled antialiasing and alpha, as in the mobile game. The blank phase recorded 467 intervals, 17 ms median / 21 ms p95. The minimal WebGL phase recorded 329 intervals, 27 ms median / 36 ms p95. Even that minimal WebGL workload missed the strict frame target in this environment. This establishes a limitation of the available validation environment; it does not predict physical handset performance or certify a release pass.

The original physical-device and human-player requests remain replaced by the user-approved simulations. No additional benchmark repetitions followed the scheduling investigation. Raw logs for this pass stay local under `/tmp/cricket-closeout`.

### Two-match resource and renderer-lifetime checks

Chrome used a 411 × 785 touch viewport and the visible assisted controls with deterministic decision randomness (0.25). Both two-over matches reached a result after 12 legal balls in each innings. The same renderer was reused for the rematch. Heap samples below follow explicit garbage collection and cover JavaScript heap, not total process or native GPU memory.

| Checkpoint | Uploaded geometries | Textures | Shader programs | DOM nodes | JavaScript heap |
|---|---:|---:|---:|---:|---:|
| result-1 | 170 | 58 | 26 | 530 | 15.50 MB |
| result-2 | 170 | 58 | 26 | 530 | 15.77 MB |

GPU resource counts, shader programs and DOM nodes were unchanged between results. Heap increased by about 0.27 MB across this bounded sample; this is not proof of indefinite-session memory stability. The fitted body was requested once across both matches. Classic requested no modern model after edition navigation.

The edition check exposed the browser retaining the old document in history. The renderer now explicitly disposes its allocations and releases the WebGL context on page exit. Animation stops after disposal. A cached history return opens a fresh game; ordinary tab background/resume preserves the existing game. In the follow-up navigation scenario, uploaded geometries and textures became zero, context loss was confirmed, and history return rendered a fresh match preview without a JavaScript exception.

Validation ran the 138-test full suite once, then the two newly added renderer-lifetime tests separately after that implementation. All passed. The production build passed after the lifecycle addition. The source checkpoints are `61dbef7` (mobile rendering work) and `138eb9a` (renderer lifecycle).

### Final production cold-load and fallback smoke

Headless Chrome 157 loaded the built output with the browser cache cleared before each case. Classic used 880 × 693; modern used a 411 × 785 touch viewport. Setup-ready time is the driver's first observation of the setup control. Transfer totals include the resources loaded through the first completed delivery (or the classic over), including physics and audio. The local Python server served raw files without HTTP compression, so these byte counts are not compressed hosting estimates.

| Case | Legal balls | First observed setup-ready | Encoded resource bytes | Model bytes | JavaScript errors |
|---|---:|---:|---:|---:|---:|
| 97 | 6 | 485 ms | 6,069,923 | 0 | 0 |
| 2027 | 1 | 998 ms | 6,143,162 | 150,374 | 0 |
| 2027-fallback | 1 | 6390 ms | 5,992,788 | 0 | 0 |

Classic requested zero modern models. The cold modern case loaded the 150,374-byte fitted body once and completed a legal scoring delivery. The fallback case blocked that model, applied 150 ms network latency and 150,000 bytes/s download throughput, and completed the same functional check with the procedural body. Both mobile cases confirmed that the score overlay had no backdrop blur. All three production cases passed.

## Simulation-only scope confirmation, 11 November

A physical-device availability check found a paired iPhone 12 Pro Max, but iOS refused the Safari launch because the device was locked. No physical benchmark was collected. The user explicitly chose “Continue with simulation only,” so hardware sign-off is deferred and is not treated as a passed release criterion.

One final Pixel API 36 / Chrome 134 over checked the earlier 33.3 ms miss against the latest rendering changes. The emulator booted cold using SwiftShader Vulkan software rendering. At 411 × 785 and ratio 0.8, it completed six legal deliveries and recorded 1,449 intervals: 16.8 ms median, 83.4 ms p95. Accepted-shot response times were 34, 25, 28.5, 44.9, 38.7, 4.7 ms, all below 100 ms. Delivery p95 values were 183.4, 150.1, 66.7, 50.1, 66.6, 50 ms. This cold-emulator result misses the frame target; it is not evidence that the lower geometry cost made frame times worse, since it is not an isolated before/after comparison.

No benchmark repetition followed this result. Raw reports and CPU snapshots remain local under `/tmp/cricket-sim-final`. Game code was unchanged in this verification pass, so the previously passing tests, build and production smoke were not repeated. All functional implementation and agreed simulated acceptance scenarios are complete. The recorded frame-time misses remain limitations of the validation evidence, and the branch stays unpromoted.
