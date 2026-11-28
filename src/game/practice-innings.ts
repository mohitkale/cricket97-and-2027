import {
  applyBall,
  type BallOutcome,
  createMatch,
  currentInnings,
  setBowler,
} from '../sim/rules/match';
import { ruleSet } from '../sim/rules/rule-sets';

export const PRACTICE_OVERS = 5;
export const RESULT_BEAT = 0.55;
export const RESET_WALK = 1.05;
const BOWLERS = [9, 10, 7, 5, 8];

/** A practice session plays one innings using the shared score and strike rules. */
export function createPracticeInnings() {
  const match = createMatch(ruleSet('2027-t20', PRACTICE_OVERS));
  const batting = currentInnings(match);
  setBowler(match, BOWLERS[0] ?? 9);
  let attempts = 0;
  return {
    batting,
    get attempts() {
      return attempts;
    },
    get end() {
      return Math.floor(batting.legalBalls / match.rules.ballsPerOver) % 2;
    },
    preview(outcome: BallOutcome) {
      return applyBall(structuredClone(match), outcome);
    },
    finish(outcome: BallOutcome) {
      const decision = applyBall(match, outcome);
      attempts++;
      if (decision.overComplete && !decision.inningsEnded) {
        const bowler = BOWLERS[batting.legalBalls / match.rules.ballsPerOver];
        if (bowler === undefined) throw new Error('Missing practice bowler');
        setBowler(match, bowler);
      }
      return decision;
    },
  };
}
