# Balance

How the simulation is kept playing like cricket, and how to retune it.

## The report

```sh
npm run sim -- --matches 200 --rules 2027-t20
npm run sim -- --matches 40 --rules 1997-odi --levels classic,pro --pitch dry
npm run sim -- --matches 60 --rules 2027-t20 --overs 5
```

It plays whole AI-versus-AI matches with no rendering and prints first-innings totals, run rate, wickets, extras, how balls were scored off, how deliveries ended, the dismissal mix and how often the chasing side won. A T20 match takes about 0.1 s.

## The tests

`src/sim/match/balance.test.ts` runs 40 T20 matches and 12 fifty-over matches (Pro against Pro, hard pitch) as part of `npm run check` and fails if a statistic leaves its range.

| Statistic | 2027 T20 range | Measured | 1997 fifty-over range | Measured |
| --- | --- | --- | --- | --- |
| First-innings median | 135 to 185 | 160 | 185 to 275 | 223 |
| Run rate | 7.0 to 9.2 | 8.1 | 3.9 to 5.6 | 4.6 |
| Wickets per innings | 4.5 to 8 | 5.2 | 6 to 9.6 | 7.9 |
| Dot balls | 34 to 52 % | 47 % | 45 to 66 % | 57 % |
| Fours, of balls | 9 to 16 % | 13.6 % | | 4.6 % |
| Sixes, of balls | 3 to 7.5 % | 5.2 % | | 1.0 % |
| Runs in boundaries | 50 to 72 % | 66 % | 20 to 50 % | 33 % |
| Caught, of dismissals | 40 to 72 % | 52 % | | 34 % |
| Run out, of dismissals | 2 to 14 % | 10 % | | 8 % |
| Chases won | 30 to 70 % | 60 % | | |

Measured values are from 60 T20 and 24 fifty-over matches at the time this file was written.

## Known gaps against real cricket

- **Too many dot balls and too few singles** in the T20 (about 47 % and 21 %; real matches are nearer 36 % and 38 %). Batters do not yet nudge the ball around enough.
- **Too many twos** (about 11 % against a real 6 %).
- **Fifty-over dismissals** lean to bowled and lbw; in real matches more than half are caught.
- Stumpings and hit wicket never happen: they are not modelled.

These are honest shortfalls, not targets. The ranges above are wide enough to contain today's behaviour and narrow enough to catch a change that breaks the game.

## Where to tune

Change the cause, not the range.

| To change | Look at |
| --- | --- |
| How the ball flies, bounces and rolls | `src/sim/ball/coefficients.ts` |
| How strokes behave, bat speeds, forgiveness | `src/sim/contact/strokes.ts` |
| Catching, ground fielding, throwing, gather time | `src/sim/agents/play.ts` (values marked "tuned") |
| Running speed and bat reach | `src/sim/agents/running.ts` |
| What the AI bowls and plays, how hard it goes, lapses and errors | `src/sim/ai/ai.ts` |
| Where fielders stand | `src/sim/agents/field.ts` |

Method: change one thing, run `npm run sim -- --matches 60`, read the whole report (a fix to one line often moves another), then run `npm run check`.

## When a range may change

Only when the owner agrees that the game should play differently, for example a decision that the 1997 Edition should be faster-scoring than real matches of its time. A pull request that widens a range to make a failing test pass, without that agreement, should be refused.
