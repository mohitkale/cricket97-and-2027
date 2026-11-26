# src/editions/2027

The 2027 Edition: modern renderer, stadium, crowd, cameras, broadcast graphics, audio set, and its rules and tuning data. Presentation and data only; no game logic.

The opening lineup uses the shared-rig player fits, existing team primary colours and team-specific shoulder and side trim. It renders the two opening batters and opening bowler in the selected match with the authored Quaternius idle. Their surname and XI number share one projected jersey atlas. The intro runs on the match renderer and hands back to the current camera when it ends or the player skips it.

`legacy-2027-lineup-mixed` and `legacy-2027-lineup-female` capture the front and back of this presentation. The materials are projected for the lineup. Tailored garment geometry, cricket equipment, the active delivery rigs and the full-match player budget remain in #48.

The nine outfielders render with the same kits during a regular 2027 match. The match supplies position, heading and velocity. The renderer blends the authored idle and forward gaits using the displacement and duration of the publisher’s corresponding root-motion clips. It chooses among the three body LODs by camera distance. Unsupported directions, ball-contact actions and replays use their current match pose. The keeper, bowler and batters remain part of the live action work in #30 and #48.

`legacy-2027-live-outfield` plays a regular Mixed match and starts the capture on a shared-rig forward chase. With `?era=2027&debug=1` the dev game reports the active and moving shared bodies and their triangle ceiling. These counts cover the outfield rendering slice before the full-match budget check.
