/**
 * Summary statistics over many simulated matches: what the balance tests assert on and
 * what `npm run sim` prints.
 */
import type { AiLevel } from '../ai/ai.ts';
import type { PitchType } from '../ball/coefficients.ts';
import type { DismissalKind } from '../rules/match.ts';
import { type RuleSetId, ruleSet } from '../rules/rule-sets.ts';
import { standardTeam } from './players.ts';
import { type MatchReport, simulateMatch } from './runner.ts';

export interface Summary {
  matches: number;
  /** First-innings totals. */
  firstInnings: { low: number; p10: number; median: number; p90: number; high: number };
  /** Runs per over across all innings. */
  runRate: number;
  wicketsPerInnings: number;
  extrasPerInnings: number;
  /** Shares of all balls bowled, 0 to 1. */
  dots: number;
  fours: number;
  sixes: number;
  /** Share of all runs that came in fours and sixes. */
  boundaryRuns: number;
  /** Share of dismissals by kind, 0 to 1. */
  dismissals: Record<DismissalKind, number>;
  /** How deliveries ended, as shares of all balls: hit, left, missed, pad and the dismissals. */
  endings: Record<string, number>;
  /** Share of balls on which the batters ran one, two or three. */
  ran: { one: number; two: number; three: number };
  /** Share of decided matches won by the side batting second. */
  chaseWins: number;
  ties: number;
}

const KINDS: DismissalKind[] = ['caught', 'bowled', 'lbw', 'run-out', 'stumped', 'hit-wicket'];

export function summarise(reports: MatchReport[]): Summary {
  const firsts = reports.map((report) => report.match.innings[0]?.runs ?? 0).sort((a, b) => a - b);
  const at = (share: number) =>
    firsts[Math.min(firsts.length - 1, Math.floor(share * firsts.length))] ?? 0;
  let runs = 0;
  let legalBalls = 0;
  let wickets = 0;
  let extras = 0;
  let innings = 0;
  let balls = 0;
  let dots = 0;
  let fours = 0;
  let sixes = 0;
  let chases = 0;
  let decided = 0;
  let ties = 0;
  const out: Record<string, number> = {};
  const endings: Record<string, number> = {};
  const ran = { one: 0, two: 0, three: 0 };
  for (const { match, tally } of reports) {
    // Only the scheduled innings: super overs would distort rates.
    for (const entry of match.innings.slice(0, 2)) {
      runs += entry.runs;
      legalBalls += entry.legalBalls;
      wickets += entry.wickets;
      extras +=
        entry.extras.wides + entry.extras.noBalls + entry.extras.byes + entry.extras.legByes;
      innings += 1;
    }
    balls += tally.balls;
    dots += tally.dots;
    fours += tally.fours;
    sixes += tally.sixes;
    for (const kind of KINDS) out[kind] = (out[kind] ?? 0) + (tally.dismissals[kind] ?? 0);
    for (const [ending, count] of Object.entries(tally.endings))
      endings[ending] = (endings[ending] ?? 0) + count;
    ran.one += tally.ran[1];
    ran.two += tally.ran[2];
    ran.three += tally.ran[3];
    const first = match.innings[0];
    if (match.result?.type === 'win' && first) {
      decided += 1;
      if (match.result.winner !== first.battingTeam) chases += 1;
    } else {
      ties += 1;
    }
  }
  const dismissed = KINDS.reduce((sum, kind) => sum + (out[kind] ?? 0), 0) || 1;
  const share = (kind: DismissalKind) => (out[kind] ?? 0) / dismissed;
  return {
    matches: reports.length,
    firstInnings: { low: at(0), p10: at(0.1), median: at(0.5), p90: at(0.9), high: at(1) },
    runRate: legalBalls ? (runs * 6) / legalBalls : 0,
    wicketsPerInnings: innings ? wickets / innings : 0,
    extrasPerInnings: innings ? extras / innings : 0,
    dots: balls ? dots / balls : 0,
    fours: balls ? fours / balls : 0,
    sixes: balls ? sixes / balls : 0,
    boundaryRuns: runs ? (fours * 4 + sixes * 6) / runs : 0,
    dismissals: {
      caught: share('caught'),
      bowled: share('bowled'),
      lbw: share('lbw'),
      'run-out': share('run-out'),
      stumped: share('stumped'),
      'hit-wicket': share('hit-wicket'),
    },
    endings: Object.fromEntries(
      Object.entries(endings).map(([ending, count]) => [ending, count / (balls || 1)]),
    ),
    ran: {
      one: ran.one / (balls || 1),
      two: ran.two / (balls || 1),
      three: ran.three / (balls || 1),
    },
    chaseWins: decided ? chases / decided : 0,
    ties,
  };
}

export interface SeriesOptions {
  rules: RuleSetId;
  overs?: number;
  matches: number;
  levels?: [AiLevel, AiLevel];
  pitch?: PitchType;
  /** First seed; match n uses seed + n. */
  seed?: number;
}

/** Play a series between fresh standard teams and return every match. */
export function playSeries(options: SeriesOptions): MatchReport[] {
  const rules = ruleSet(options.rules, options.overs);
  const base = options.seed ?? 0;
  return Array.from({ length: options.matches }, (_, n) =>
    simulateMatch({
      rules,
      teams: [standardTeam(base + n * 2 + 1), standardTeam(base + n * 2 + 2)],
      levels: options.levels ?? ['pro', 'pro'],
      seed: base + n,
      battingFirst: n % 2 === 0 ? 0 : 1,
      ...(options.pitch ? { pitch: options.pitch } : {}),
    }),
  );
}
