# src/render

three.js helpers shared by both editions: asset loading, quality tiers, capture hooks.

`ball-view.ts` displays the stitched ball, its seam orientation, a contact shadow and an optional trajectory trail. The #22 lab scene at `/lab/?scene=delivery-ball` takes its positions and angular velocity from the ball simulation. The `bowler=1` view adds the authored pace action to the sim flight and the `release=1` view holds the release marker. The pace slice uses a tall bowler calibrated to the sim's release height and advances at the authored jog's ground speed until the gather. Delegated Chromium review used `delivery-ball`, `delivery-ball-trail`, `pace-bowler-flight` and `pace-sim-release`. The release readout covers the ball centre at the bowling-hand socket. It measured 0.00 cm in the capture, with the leading foot established before release.
