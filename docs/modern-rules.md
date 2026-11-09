# Cricket 2027 limited-overs rules inventory

Review target for the 20-over game is the [ICC Men's T20I playing conditions effective October 2026](https://images.icc-cricket.com/image/upload/prd/bsxcho7ufe2pjban0wjp.pdf). Short games are exhibition formats with the same scoring and free-hit decisions. Opening field restrictions last the nearest whole number of overs to 30%, with at least one opening over. A tied exhibition match ends as a tie. The existing 20-over game also ends as a tie; competition-specific tie-breaks remain open.

| Scenario | Implemented decision or remaining gap |
|---|---|
| Start, innings break, target and result | Two innings, chase ends on passing the first innings total, ten wickets or the configured legal-ball limit closes the innings. |
| Short formats and bowling rotation | 2, 5, 10 and 20 overs. Rotation selects 2, 5, 6 and 7 bowlers, with maximum spells set by the rotation and match length. |
| Wide with completed runs | Extra plus completed runs go to extras, the legal-ball count stays fixed, and odd completed runs change ends. |
| No-ball, then wide, then ordinary delivery | No-ball overrides wide, awards the extra and grants a free hit. An illegal ball retains it. A legal ball consumes it. |
| Ball misses bat and passes the keeper | Byes are tracked separately from batter runs. Overthrows continue in play. Boundary overthrows include runs completed plus a run already crossed at release. |
| Pad contact, bowled and LBW | First pad contact and subsequent projection determine LBW, including pitch line and attempted stroke. Clean bowled requires swept ball-to-wicket contact. A pad deflection can produce leg byes. The scorecard separates leg byes. Attempted avoidance on a leave remains open. |
| Catch and run-out | Hand contact competes with rope crossing. Returns require wicket contact and an ungrounded runner. A free-hit catch stays live. |
| Stumping | Keeper possession, actual wicket contact, no attempted run and the striker's grounding decide the wicket. A wide counts and a no-ball or free hit prevents the dismissal. |
| Fields | Opening presets keep at most two outside the inner circle. Later presets use at most five. Handedness mirrors placements. At release, actor centres determine circle and leg-side counts. Too many outside, more than five on leg, or more than two behind the striker’s popping crease on leg (excluding the keeper for this last check) trigger a no-ball. Whole-body crease geometry and over-rate sanctions remain open. |
| Dead ball and rarer stoppages | Ball resolution is single-shot. Stop Run-up before release calls dead ball under clause 20.4.2.10. The replacement keeps the score, strike, balls faced and free-hit state. Other stoppages, retirements, injury interruptions and revised rain targets remain open. |
