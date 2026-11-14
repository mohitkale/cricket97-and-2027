/**
 * The leg-before-wicket law as a decision on facts. Working out those facts (where the
 * ball pitched, where it struck the pad, whether it would have hit) is geometry and
 * belongs to the contact model; this file is only the law.
 */

export type Line = 'outside-off' | 'in-line' | 'outside-leg';

export interface LbwFacts {
  /** Where the ball pitched relative to the stumps. `null` for a full toss. */
  pitched: Line | null;
  /** Where the ball struck the batter. */
  impact: Line;
  /** Would the ball have gone on to hit the wicket? */
  hitting: boolean;
  /** Did the batter make a genuine attempt to play the ball with the bat? */
  shotOffered: boolean;
  /** Did the ball touch the bat or the hand holding it before the pad? */
  batFirst: boolean;
}

export type LbwReason =
  | 'out'
  | 'bat-first'
  | 'pitched-outside-leg'
  | 'impact-outside-leg'
  | 'impact-outside-off-playing-a-shot'
  | 'missing';

export function lbwDecision(facts: LbwFacts): { out: boolean; reason: LbwReason } {
  const notOut = (reason: LbwReason) => ({ out: false, reason });
  if (facts.batFirst) return notOut('bat-first');
  if (facts.pitched === 'outside-leg') return notOut('pitched-outside-leg');
  if (facts.impact === 'outside-leg') return notOut('impact-outside-leg');
  if (facts.impact === 'outside-off' && facts.shotOffered)
    return notOut('impact-outside-off-playing-a-shot');
  if (!facts.hitting) return notOut('missing');
  return { out: true, reason: 'out' };
}
