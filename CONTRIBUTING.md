# Contributing

Thanks for helping. People and coding agents follow the same rules, which live in [AGENTS.md](AGENTS.md). The plan is in [docs/PLAN.md](docs/PLAN.md) and the task list is the issues, grouped by milestone.

## Flow

1. Pick an issue labelled `status:ready` in the earliest open milestone and comment that you are taking it.
2. Branch from `main` as `feat/<issue>-<slug>` (or `fix/`, `chore/`, `docs/`, `asset/`).
3. Open a pull request titled in Conventional Commits style, with `Closes #<issue>`. Fill in the template.
4. The `ci` check must pass. Pull requests are squash-merged; the branch is deleted on merge.

`main` cannot be pushed to directly, force-pushed or deleted.

## Labels

- `type:*` what kind of work, `area:*` which part of the game, `edition:*` which edition.
- `status:ready` can be started now. `status:blocked` waits on a dependency or a decision. `status:triage` is new and unsorted.
- `gate:owner-feel` and `gate:owner-look` are closed by the maintainer after playing a preview build.
- `human-only` needs a person (decisions, recordings, real devices).

## Assets

Only CC0 or CC BY 4.0 material, or work you made yourself and release under one of those. Record every file in `ASSETS.md`. No real players, sponsors, broadcast footage or content from other games.
