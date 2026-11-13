# Instructions for coding agents

These rules apply to every agent and model working in this repository, whatever harness runs it. Humans follow them too.

## Read first

1. `docs/PLAN.md` — what we are building, the architecture, budgets and milestones.
2. The issue you were given. Work on exactly one issue.
3. Nothing in `docs/legacy/` or `legacy/` is a specification. It is the previous attempt, kept for reference.

## Picking up work

- Take an open issue labelled `status:ready` from the lowest-numbered open milestone. Check that every issue listed under "Depends on" is closed. If not, stop and say so.
- Issues labelled `human-only` or `type:decision` need the owner. Prepare options and evidence if asked; do not decide.
- If the issue is unclear or its acceptance checks cannot be met, comment on the issue with what you found and stop. Do not redefine the task.

## Branches, commits, pull requests

- `main` is protected: no direct pushes, no force pushes, no deletion. All changes arrive by pull request, squash-merged.
- Branch from fresh `main`: `feat/<issue>-<slug>`, `fix/<issue>-<slug>`, `chore/<issue>-<slug>`, `docs/<issue>-<slug>`, `asset/<issue>-<slug>`.
- PR title uses Conventional Commits, for example `feat(sim): ball bounce model (#13)`. The body follows the PR template and contains `Closes #<issue>`.
- One issue per PR. Keep code changes under about 600 lines; split the issue (ask first) if it will not fit.
- Never commit build output, `node_modules`, secrets, or generated files under `public/assets/` without their source in `assets/src/`.

## Commands

```sh
npm ci           # install
npm run check    # lint + typecheck + tests + build: run this before every PR
npm test         # unit tests only, must stay under 30 s
npm run format   # apply Biome formatting and safe fixes
npm run dev      # local dev server
```

New code is TypeScript (strict). The prototype's JavaScript is excluded from lint and typecheck.

## Rules that are easy to break

1. **`src/sim` is pure.** No three.js, DOM, timers, `Date.now()` or `Math.random()`. Use the sim clock and seeded PRNG. Every sim change comes with tests.
2. **The sim decides outcomes.** Presentation never decides a catch, a wicket or a run. It reads sim state and predicted events.
3. **Do not generate human motion in code.** No sine-wave strides, no hand-posed joints for cricket actions. Motion comes from clips; code blends, warps and applies IK.
4. **Do not draw characters or stadiums from primitives** in shipped code. Geometry comes from the asset pipeline. Grey-box placeholders are allowed only in issues that say so.
5. **Editions never fork logic.** Differences are data (rules, tuning) and presentation.
6. **Every asset has a licence entry** in `ASSETS.md`. CC0 or CC BY 4.0 only. No real players, sponsors, broadcasts or other games' content.
7. **Stay inside budgets** in `docs/PLAN.md` section 5. A PR that exceeds one says so and explains.
8. **Do not weaken a test to make it pass**, and do not mark visual or feel work done on the strength of unit tests.

## Proving visual and feel work

- Any PR that changes what the player sees or how input feels must attach captures (contact sheet and short video) produced by the capture harness, plus the preview link.
- State plainly what you could not verify (for example, real phone performance). Never write "complete" for something only checked in an emulator.
- Issues labelled `gate:owner-feel` or `gate:owner-look` are closed by the owner after playing the preview, not by the PR merging. Use `Refs #<issue>` instead of `Closes` for those.

## Definition of done

- Acceptance checks in the issue are each shown to pass (test name, capture, or measurement).
- `npm run check` passes locally and in CI.
- New behaviour has tests; new assets have licence entries; docs touched by the change are updated.
- The PR description lists what changed, how it was verified, and what remains unverified.
