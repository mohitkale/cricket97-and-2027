/**
 * Playing conditions as data. The engine never asks which edition is running; it reads
 * these numbers. A new format or a house rule is a new object here, not a code branch.
 */

export interface FieldPhase {
  /** First over of the phase, counting from 0. */
  fromOver: number;
  /** Most fielders allowed outside the 30-yard circle. */
  maxOutsideCircle: number;
  /** Fielders who must stand in close catching positions. */
  minCloseCatchers: number;
}

export interface RuleSet {
  id: string;
  /** Overs per innings. */
  overs: number;
  ballsPerOver: number;
  /** Wickets that end an innings. */
  wickets: number;
  maxOversPerBowler: number;
  widePenalty: number;
  noBallPenalty: number;
  /** The ball after a no-ball is a free hit. */
  freeHit: boolean;
  /** Short balls above shoulder height allowed per over; one more is a no-ball. */
  bouncersPerOver: number;
  /** Fielding restriction phases in order of `fromOver`. */
  fieldPhases: FieldPhase[];
  /** Fielders allowed behind square on the leg side. */
  maxBehindSquareLeg: number;
  /** Player reviews of umpiring decisions each side has per innings. 0 means none. */
  reviewsPerInnings: number;
  /** A tied match goes to a super over instead of standing as a tie. */
  superOver: boolean;
  /**
   * After a catch, does it matter whether the batters crossed? Under the older law the
   * incoming batter went to the non-striker's end if they had; since 2022 the incoming
   * batter always takes strike.
   */
  crossingCountsOnCatch: boolean;
}

export type RuleSetId = '2027-t20' | '1997-odi';

const atLeast = (minimum: number, value: number) => (value < minimum ? minimum : value);

/** Format templates, defined at their full length. `ruleSet` scales them to short matches. */
const TEMPLATES: Record<
  RuleSetId,
  {
    fullOvers: number;
    powerplayOvers: number;
    base: Omit<RuleSet, 'id' | 'overs' | 'maxOversPerBowler' | 'fieldPhases'>;
    powerplay: Omit<FieldPhase, 'fromOver'>;
    afterwards: Omit<FieldPhase, 'fromOver'>;
  }
> = {
  '2027-t20': {
    fullOvers: 20,
    powerplayOvers: 6,
    powerplay: { maxOutsideCircle: 2, minCloseCatchers: 0 },
    afterwards: { maxOutsideCircle: 5, minCloseCatchers: 0 },
    base: {
      ballsPerOver: 6,
      wickets: 10,
      widePenalty: 1,
      noBallPenalty: 1,
      freeHit: true,
      bouncersPerOver: 1,
      maxBehindSquareLeg: 2,
      reviewsPerInnings: 2,
      superOver: true,
      crossingCountsOnCatch: false,
    },
  },
  '1997-odi': {
    fullOvers: 50,
    powerplayOvers: 15,
    powerplay: { maxOutsideCircle: 2, minCloseCatchers: 2 },
    afterwards: { maxOutsideCircle: 5, minCloseCatchers: 0 },
    base: {
      ballsPerOver: 6,
      wickets: 10,
      widePenalty: 1,
      noBallPenalty: 1,
      freeHit: false,
      bouncersPerOver: 1,
      maxBehindSquareLeg: 2,
      reviewsPerInnings: 0,
      superOver: false,
      crossingCountsOnCatch: true,
    },
  },
};

/**
 * A rule set for a match of `overs` overs. Restriction phases and the bowler quota keep
 * their proportion of the full format: a 5-over game in the T20 rules has a powerplay of
 * 2 overs (6 of 20) and one over per bowler.
 */
export function ruleSet(id: RuleSetId, overs?: number): RuleSet {
  const template = TEMPLATES[id];
  const length = overs ?? template.fullOvers;
  const powerplay = atLeast(1, Math.round((length * template.powerplayOvers) / template.fullOvers));
  const phases: FieldPhase[] = [{ fromOver: 0, ...template.powerplay }];
  if (powerplay < length) phases.push({ fromOver: powerplay, ...template.afterwards });
  return {
    id,
    overs: length,
    maxOversPerBowler: atLeast(1, Math.ceil(length / 5)),
    fieldPhases: phases,
    ...template.base,
  };
}

/** One over and two wickets a side, with the parent format's other conditions. */
export function superOverRules(parent: RuleSet): RuleSet {
  return {
    ...parent,
    id: `${parent.id}-super-over`,
    overs: 1,
    wickets: 2,
    maxOversPerBowler: 1,
    reviewsPerInnings: parent.reviewsPerInnings > 0 ? 1 : 0,
    fieldPhases: [{ fromOver: 0, maxOutsideCircle: 5, minCloseCatchers: 0 }],
  };
}

/** The restriction phase in force for an over (counting from 0). */
export function fieldPhaseFor(rules: RuleSet, over: number): FieldPhase {
  let current = rules.fieldPhases[0] ?? { fromOver: 0, maxOutsideCircle: 9, minCloseCatchers: 0 };
  for (const phase of rules.fieldPhases) if (phase.fromOver <= over) current = phase;
  return current;
}

export interface FieldCounts {
  outsideCircle: number;
  behindSquareLeg: number;
  closeCatchers: number;
}

export type FieldFault =
  | 'too-many-outside-circle'
  | 'too-many-behind-square-leg'
  | 'too-few-close-catchers';

/** Faults in a field setting for the given over. Any fault makes the delivery a no-ball. */
export function fieldFaults(rules: RuleSet, over: number, field: FieldCounts): FieldFault[] {
  const phase = fieldPhaseFor(rules, over);
  const faults: FieldFault[] = [];
  if (field.outsideCircle > phase.maxOutsideCircle) faults.push('too-many-outside-circle');
  if (field.behindSquareLeg > rules.maxBehindSquareLeg) faults.push('too-many-behind-square-leg');
  if (field.closeCatchers < phase.minCloseCatchers) faults.push('too-few-close-catchers');
  return faults;
}
