/**
 * A whole match played by the AI on both sides, with no rendering. Used for balance
 * tests, AI tuning and the `npm run sim` report.
 */

import { chooseField, type FieldName, faultsOf, fieldPositions } from '../agents/field.ts';
import { AI_LEVELS, type AiLevel, chooseDelivery, chooseStroke, type Situation } from '../ai/ai.ts';
import { groundEnvironment } from '../ball/ball.ts';
import type { PitchType } from '../ball/coefficients.ts';
import { Rng } from '../core/prng.ts';
import {
  applyBall,
  bowlerRefusal,
  createMatch,
  currentInnings,
  type DismissalKind,
  type MatchState,
  setBowler,
} from '../rules/match.ts';
import type { RuleSet } from '../rules/rule-sets.ts';
import { type DeliveryEnding, playDelivery } from './delivery.ts';
import type { Bowling, SimPlayer, SimTeam } from './players.ts';

export interface MatchSetup {
  rules: RuleSet;
  teams: [SimTeam, SimTeam];
  levels: [AiLevel, AiLevel];
  seed: number;
  pitch?: PitchType;
  battingFirst?: 0 | 1;
}

export interface MatchTally {
  balls: number;
  fours: number;
  sixes: number;
  dots: number;
  wides: number;
  noBalls: number;
  dismissals: Partial<Record<DismissalKind, number>>;
  endings: Partial<Record<DeliveryEnding, number>>;
  /** Balls on which 0, 1, 2 or 3 runs were run (index is the number of runs). */
  ran: [number, number, number, number];
  /** Fields or bowling changes that broke the playing conditions. Must stay at zero. */
  illegalFields: number;
  illegalBowlers: number;
}

export interface MatchReport {
  match: MatchState;
  tally: MatchTally;
}

/** Anyone can turn their arm over: a gentle medium-pacer for players with no bowling. */
const PART_TIMER: Bowling = { kind: 'pace', hand: 'right', kmh: 112, turn: null, skill: 0.2 };

const player = (team: SimTeam, index: number): SimPlayer => {
  const found = team[index < team.length ? index : team.length - 1];
  if (!found) throw new Error('empty team');
  return found;
};

/**
 * The captain's bowling change: the best bowler who is allowed to bowl, with pace
 * preferred at the start and the end of the innings and spin through the middle.
 */
export function chooseBowler(match: MatchState, team: SimTeam, random: { next(): number }): number {
  const innings = currentInnings(match);
  const over = Math.floor(innings.legalBalls / match.rules.ballsPerOver);
  const edge = over < match.rules.overs * 0.3 || over >= match.rules.overs * 0.8;
  let best = -1;
  let bestScore = Number.NEGATIVE_INFINITY;
  team.forEach((member, index) => {
    if (bowlerRefusal(match, index) !== null || member.keeper) return;
    const bowling = member.bowling;
    const fits = bowling ? (bowling.kind === 'pace') === edge : false;
    const score = (bowling ? bowling.skill : -1) + (fits ? 0.25 : 0) + random.next() * 0.2;
    if (score > bestScore) {
      bestScore = score;
      best = index;
    }
  });
  return best;
}

export function simulateMatch(setup: MatchSetup): MatchReport {
  const { teams, levels } = setup;
  const rng = new Rng(setup.seed);
  const env = groundEnvironment(setup.pitch ?? 'hard');
  const match = createMatch(setup.rules, setup.battingFirst ?? 0, teams[0].length);
  const tally: MatchTally = {
    balls: 0,
    fours: 0,
    sixes: 0,
    dots: 0,
    wides: 0,
    noBalls: 0,
    dismissals: {},
    endings: {},
    ran: [0, 0, 0, 0],
    illegalFields: 0,
    illegalBowlers: 0,
  };
  let field: FieldName = 'new-ball';

  // A match cannot run away: twice the scheduled balls is far more than extras can add.
  for (let guard = 0; guard < 4000 && !match.result; guard++) {
    const rules = match.rules;
    const innings = currentInnings(match);
    const battingSide = innings.battingTeam;
    const bowlingSide: 0 | 1 = battingSide === 0 ? 1 : 0;
    const battingTeam = teams[battingSide];
    const bowlingTeam = teams[bowlingSide];
    const over = Math.floor(innings.legalBalls / rules.ballsPerOver);

    if (innings.bowler === null) {
      const chosen = chooseBowler(match, bowlingTeam, rng.stream('captain'));
      if (chosen < 0 || bowlerRefusal(match, chosen) !== null) {
        tally.illegalBowlers += 1;
        break;
      }
      setBowler(match, chosen);
      const kind = (player(bowlingTeam, chosen).bowling ?? PART_TIMER).kind;
      field = chooseField(rules, over, kind);
    }
    const bowlerIndex = innings.bowler ?? 0;
    const bowler = player(bowlingTeam, bowlerIndex).bowling ?? PART_TIMER;
    const striker = player(battingTeam, innings.striker);
    const nonStriker = player(battingTeam, innings.nonStriker);
    if (faultsOf(fieldPositions(field, striker.hand), rules, over, striker.hand).length > 0)
      tally.illegalFields += 1;

    const situation: Situation = {
      over,
      overs: rules.overs,
      wickets: innings.wickets,
      toWin: innings.target === null ? null : innings.target - innings.runs,
      ballsLeft: rules.overs * rules.ballsPerOver - innings.legalBalls,
      bouncersLeft: rules.bouncersPerOver - innings.over.bouncers,
      ballAge: innings.legalBalls / rules.ballsPerOver,
    };
    const bowlingLevel = AI_LEVELS[levels[bowlingSide]];
    const battingLevel = AI_LEVELS[levels[battingSide]];
    const intent = chooseDelivery(bowler, situation, bowlingLevel, rng.stream('bowling'));
    const choice = chooseStroke(
      striker,
      bowler,
      intent,
      situation,
      battingLevel,
      rng.stream('batting'),
      fieldPositions(field, striker.hand),
    );
    // A weaker AI also lands the ball less accurately.
    const control = bowler.skill / bowlingLevel.execution;
    const result = playDelivery({
      bowler: { ...bowler, skill: control },
      intent,
      batting: choice.intent,
      striker,
      nonStriker,
      fieldingTeam: bowlingTeam,
      bowlerIndex,
      field,
      env,
      ballAge: situation.ballAge,
      random: rng.stream('delivery'),
      caution: choice.caution,
    });
    const summary = applyBall(match, result.outcome);

    tally.balls += 1;
    tally.endings[result.ending] = (tally.endings[result.ending] ?? 0) + 1;
    if (summary.wicket)
      tally.dismissals[summary.wicket] = (tally.dismissals[summary.wicket] ?? 0) + 1;
    if (result.outcome.illegal === 'wide') tally.wides += 1;
    else if (!summary.legal) tally.noBalls += 1;
    const run = result.outcome.runsRun ?? 0;
    if (!result.outcome.boundary && run >= 1 && run <= 3) tally.ran[run as 1 | 2 | 3] += 1;
    if (result.outcome.boundary === 4) tally.fours += 1;
    if (result.outcome.boundary === 6) tally.sixes += 1;
    if (summary.runs === 0 && summary.legal) tally.dots += 1;
  }
  return { match, tally };
}
