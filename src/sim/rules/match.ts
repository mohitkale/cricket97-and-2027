/**
 * Match scoring: what a delivery does to the score, the batters, the bowler and the
 * match. Everything here is bookkeeping and law. What physically happened on the ball
 * (runs, catch, edge) is decided elsewhere in the sim and arrives as a BallOutcome.
 *
 * State is plain data. Players are indices into their team's batting order (0 to 10).
 */
import { type RuleSet, superOverRules } from './rule-sets.ts';

export type DismissalKind = 'bowled' | 'caught' | 'lbw' | 'run-out' | 'stumped' | 'hit-wicket';

export interface Dismissal {
  kind: DismissalKind;
  /** Who is out. Only a run-out can dismiss the non-striker. */
  batter?: 'striker' | 'non-striker';
  /** Fielder involved, as an index in the fielding side. */
  fielder?: number;
  /** For a catch or run-out: had the batters crossed on the run in progress? */
  crossed?: boolean;
}

export interface BallOutcome {
  illegal?: 'wide' | 'no-ball';
  /** A short ball passing above shoulder height. Counts towards the per-over limit. */
  bouncer?: boolean;
  /** Runs the batters completed by running. */
  runsRun?: number;
  /** The ball reached the boundary. Replaces runs run. */
  boundary?: 4 | 6;
  /** How the runs are credited when the bat was not involved. */
  credit?: 'bat' | 'byes' | 'leg-byes';
  dismissal?: Dismissal;
}

export interface BatterCard {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  out: null | { kind: DismissalKind; bowler: number | null; fielder: number | null };
}

export interface BowlerCard {
  /** Legal balls bowled. */
  balls: number;
  runs: number;
  wickets: number;
  maidens: number;
  wides: number;
  noBalls: number;
}

export type InningsEnd = 'all-out' | 'overs' | 'target-reached';

export interface InningsState {
  battingTeam: 0 | 1;
  runs: number;
  wickets: number;
  legalBalls: number;
  extras: { wides: number; noBalls: number; byes: number; legByes: number };
  /** Batting-order index of the batter facing the next ball. */
  striker: number;
  nonStriker: number;
  /** Next batter to come in; equals team size when nobody is left. */
  nextBatter: number;
  bowler: number | null;
  previousBowler: number | null;
  freeHit: boolean;
  /** Within the current over. */
  over: { legal: number; bowlerRuns: number; bouncers: number };
  batters: BatterCard[];
  bowlers: Record<number, BowlerCard>;
  fallOfWickets: { wicket: number; runs: number; legalBalls: number; batter: number }[];
  /** Runs needed to win, for the side batting second. */
  target: number | null;
  /** Reviews left: [batting side, fielding side]. */
  reviews: [number, number];
  ended: InningsEnd | null;
}

export type MatchResult =
  | { type: 'win'; winner: 0 | 1; by: 'runs' | 'wickets'; margin: number; ballsLeft: number }
  | { type: 'tie' };

export interface MatchState {
  rules: RuleSet;
  teamSize: number;
  innings: InningsState[];
  /** Set when the scheduled innings are over. A tie under super-over rules starts another pair. */
  result: MatchResult | null;
  superOver: boolean;
}

export interface BallSummary {
  legal: boolean;
  /** The outcome was upgraded to a no-ball by the bouncer limit. */
  noBallForBouncers: boolean;
  /** Total added to the team score, including penalties. */
  runs: number;
  /** The dismissal that stood, if any. */
  wicket: DismissalKind | null;
  /** A dismissal was claimed but the laws do not allow it on this ball. */
  dismissalDisallowed: boolean;
  wasFreeHit: boolean;
  freeHitNext: boolean;
  overComplete: boolean;
  inningsEnded: InningsEnd | null;
  matchResult: MatchResult | null;
  /** A tie that goes to a super over: the next two innings have just been created. */
  superOverStarted: boolean;
}

const newBatter = (): BatterCard => ({ runs: 0, balls: 0, fours: 0, sixes: 0, out: null });
const newBowler = (): BowlerCard => ({
  balls: 0,
  runs: 0,
  wickets: 0,
  maidens: 0,
  wides: 0,
  noBalls: 0,
});

function createInnings(
  battingTeam: 0 | 1,
  rules: RuleSet,
  teamSize: number,
  target: number | null,
): InningsState {
  return {
    battingTeam,
    runs: 0,
    wickets: 0,
    legalBalls: 0,
    extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0 },
    striker: 0,
    nonStriker: 1,
    nextBatter: 2,
    bowler: null,
    previousBowler: null,
    freeHit: false,
    over: { legal: 0, bowlerRuns: 0, bouncers: 0 },
    batters: Array.from({ length: teamSize }, newBatter),
    bowlers: {},
    fallOfWickets: [],
    target,
    reviews: [rules.reviewsPerInnings, rules.reviewsPerInnings],
    ended: null,
  };
}

export function createMatch(rules: RuleSet, battingFirst: 0 | 1 = 0, teamSize = 11): MatchState {
  return {
    rules,
    teamSize,
    innings: [createInnings(battingFirst, rules, teamSize, null)],
    result: null,
    superOver: false,
  };
}

export function currentInnings(match: MatchState): InningsState {
  const innings = match.innings[match.innings.length - 1];
  if (!innings) throw new Error('Match has no innings');
  return innings;
}

/** Overs bowled as cricket writes them: 4.3 means four overs and three balls. */
export function oversText(legalBalls: number, ballsPerOver = 6): string {
  return `${Math.floor(legalBalls / ballsPerOver)}.${legalBalls % ballsPerOver}`;
}

export type BowlerRefusal =
  | 'mid-over'
  | 'bowled-previous-over'
  | 'quota-used'
  | 'not-in-team'
  | 'innings-over';

/** Why this bowler may not bowl the next over, or null if they may. */
export function bowlerRefusal(match: MatchState, bowler: number): BowlerRefusal | null {
  const innings = currentInnings(match);
  if (innings.ended) return 'innings-over';
  if (bowler < 0 || bowler >= match.teamSize) return 'not-in-team';
  if (innings.over.legal > 0 && innings.bowler !== bowler) return 'mid-over';
  if (innings.over.legal === 0 && innings.previousBowler === bowler) return 'bowled-previous-over';
  const card = innings.bowlers[bowler];
  const { ballsPerOver, maxOversPerBowler } = match.rules;
  if (card && card.balls >= maxOversPerBowler * ballsPerOver) return 'quota-used';
  return null;
}

export function setBowler(match: MatchState, bowler: number): void {
  const refusal = bowlerRefusal(match, bowler);
  if (refusal) throw new Error(`Bowler ${bowler} cannot bowl: ${refusal}`);
  currentInnings(match).bowler = bowler;
}

/** Which dismissals the laws allow on this kind of delivery. */
export function dismissalAllowed(
  kind: DismissalKind,
  illegal: BallOutcome['illegal'],
  freeHit: boolean,
): boolean {
  if (illegal === 'no-ball' || freeHit) return kind === 'run-out';
  if (illegal === 'wide') return kind === 'run-out' || kind === 'stumped' || kind === 'hit-wicket';
  return true;
}

const BOWLER_GETS_WICKET: Record<DismissalKind, boolean> = {
  bowled: true,
  caught: true,
  lbw: true,
  stumped: true,
  'hit-wicket': true,
  'run-out': false,
};

/** Use one review. A successful review is kept. Returns false if none were left. */
export function useReview(
  match: MatchState,
  side: 'batting' | 'fielding',
  successful: boolean,
): boolean {
  const innings = currentInnings(match);
  const index = side === 'batting' ? 0 : 1;
  if (innings.reviews[index] <= 0) return false;
  if (!successful) innings.reviews[index] -= 1;
  return true;
}

function decideResult(match: MatchState): MatchResult {
  const [first, second] = match.innings.slice(-2);
  if (!first || !second) throw new Error('Result needs two innings');
  if (second.runs > first.runs) {
    const ballsLeft = match.rules.overs * match.rules.ballsPerOver - second.legalBalls;
    return {
      type: 'win',
      winner: second.battingTeam,
      by: 'wickets',
      margin: match.rules.wickets - second.wickets,
      ballsLeft,
    };
  }
  if (first.runs > second.runs) {
    return {
      type: 'win',
      winner: first.battingTeam,
      by: 'runs',
      margin: first.runs - second.runs,
      ballsLeft: 0,
    };
  }
  return { type: 'tie' };
}

/** Apply one delivery to the match. Requires a bowler to have been set. */
export function applyBall(match: MatchState, outcome: BallOutcome): BallSummary {
  const { rules } = match;
  const innings = currentInnings(match);
  if (match.result) throw new Error('Match is over');
  if (innings.ended) throw new Error('Innings is over');
  if (innings.bowler === null) throw new Error('No bowler set');

  const wasFreeHit = innings.freeHit;
  let illegal = outcome.illegal;
  let noBallForBouncers = false;
  if (outcome.bouncer) {
    innings.over.bouncers += 1;
    if (innings.over.bouncers > rules.bouncersPerOver && illegal !== 'no-ball') {
      illegal = 'no-ball'; // a no-ball overrides a wide
      noBallForBouncers = true;
    }
  }
  const legal = !illegal;
  const credit = illegal === 'wide' ? 'wides' : (outcome.credit ?? 'bat');
  const scored = outcome.boundary ?? outcome.runsRun ?? 0;
  const penalty =
    illegal === 'wide' ? rules.widePenalty : illegal === 'no-ball' ? rules.noBallPenalty : 0;

  const claimed = outcome.dismissal;
  const standing =
    claimed && dismissalAllowed(claimed.kind, illegal, wasFreeHit) ? claimed : undefined;
  // Runs do not count when the striker is caught.
  const counted = standing?.kind === 'caught' ? 0 : scored;

  const batter = innings.batters[innings.striker];
  const bowler = (innings.bowlers[innings.bowler] ??= newBowler());
  if (!batter) throw new Error('Striker is not in the batting order');

  // Score, extras and the two cards.
  innings.runs += counted + penalty;
  if (illegal === 'wide') {
    innings.extras.wides += penalty + counted;
    bowler.wides += penalty + counted;
    bowler.runs += penalty + counted;
  } else {
    batter.balls += 1;
    if (illegal === 'no-ball') {
      innings.extras.noBalls += penalty;
      bowler.noBalls += penalty;
      bowler.runs += penalty;
    }
    if (credit === 'bat') {
      batter.runs += counted;
      bowler.runs += counted;
      if (outcome.boundary === 4 && counted === 4) batter.fours += 1;
      if (outcome.boundary === 6 && counted === 6) batter.sixes += 1;
    } else if (credit === 'byes') {
      innings.extras.byes += counted;
    } else {
      innings.extras.legByes += counted;
    }
  }
  innings.over.bowlerRuns += illegal === 'wide' || credit === 'bat' ? counted + penalty : penalty;
  if (legal) {
    innings.legalBalls += 1;
    innings.over.legal += 1;
    bowler.balls += 1;
  }

  // Ends: batters change ends for each completed run; a boundary leaves them where they were.
  const completed = outcome.boundary ? 0 : (outcome.runsRun ?? 0);
  const caught = standing?.kind === 'caught';
  let swapped = caught ? false : completed % 2 === 1;
  if (standing?.crossed && (standing.kind === 'run-out' || (caught && rules.crossingCountsOnCatch)))
    swapped = !swapped;
  if (swapped) [innings.striker, innings.nonStriker] = [innings.nonStriker, innings.striker];

  if (standing) {
    // After any swap above, find the dismissed batter by who they were when the ball was bowled.
    const wasStriker = (standing.batter ?? 'striker') === 'striker';
    const slot: 'striker' | 'nonStriker' = wasStriker === !swapped ? 'striker' : 'nonStriker';
    const dismissed = innings[slot];
    const card = innings.batters[dismissed];
    const credited = BOWLER_GETS_WICKET[standing.kind];
    if (card)
      card.out = {
        kind: standing.kind,
        bowler: credited ? innings.bowler : null,
        fielder: standing.fielder ?? null,
      };
    if (credited) bowler.wickets += 1;
    innings.wickets += 1;
    innings.fallOfWickets.push({
      wicket: innings.wickets,
      runs: innings.runs,
      legalBalls: innings.legalBalls,
      batter: dismissed,
    });
    innings[slot] = innings.nextBatter;
    innings.nextBatter += 1;
  }

  innings.freeHit = rules.freeHit && (illegal === 'no-ball' || (wasFreeHit && !legal));

  // End of the over.
  const overComplete = legal && innings.over.legal === rules.ballsPerOver;
  if (overComplete) {
    if (innings.over.bowlerRuns === 0) bowler.maidens += 1;
    innings.previousBowler = innings.bowler;
    innings.bowler = null;
    innings.over = { legal: 0, bowlerRuns: 0, bouncers: 0 };
    [innings.striker, innings.nonStriker] = [innings.nonStriker, innings.striker];
  }

  // End of the innings and of the match.
  const batsmenLeft = match.teamSize - 1;
  if (innings.target !== null && innings.runs >= innings.target) innings.ended = 'target-reached';
  else if (innings.wickets >= rules.wickets || innings.wickets >= batsmenLeft)
    innings.ended = 'all-out';
  else if (innings.legalBalls >= rules.overs * rules.ballsPerOver) innings.ended = 'overs';

  let superOverStarted = false;
  if (innings.ended) {
    const secondOfPair = match.innings.length % 2 === 0;
    if (!secondOfPair) {
      const other: 0 | 1 = innings.battingTeam === 0 ? 1 : 0;
      match.innings.push(createInnings(other, rules, match.teamSize, innings.runs + 1));
    } else {
      const result = decideResult(match);
      if (result.type === 'tie' && (rules.superOver || match.superOver)) {
        // The side that batted second in the tied innings bats first in the super over.
        match.rules = match.superOver ? rules : superOverRules(rules);
        match.superOver = true;
        match.innings.push(createInnings(innings.battingTeam, match.rules, match.teamSize, null));
        superOverStarted = true;
      } else {
        match.result = result;
      }
    }
  }

  return {
    legal,
    noBallForBouncers,
    runs: counted + penalty,
    wicket: standing?.kind ?? null,
    dismissalDisallowed: Boolean(claimed) && !standing,
    wasFreeHit,
    freeHitNext: innings.freeHit,
    overComplete,
    inningsEnded: innings.ended,
    matchResult: match.result,
    superOverStarted,
  };
}
