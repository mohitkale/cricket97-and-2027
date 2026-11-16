/**
 * The computer player: what to bowl and what to play.
 *
 * Difficulty changes how well the AI decides and how well it executes. It never
 * changes the rules or the physics: a Casual batter picks the wrong stroke more often
 * and times it worse, and that is all.
 */
import { ASSIST, type StrokeId } from '../contact/strokes.ts';
import type { RandomStream } from '../core/prng.ts';
import type { BattingIntent, BowlingIntent } from '../match/delivery.ts';
import type { Bowling, SimPlayer } from '../match/players.ts';

export type AiLevel = 'casual' | 'classic' | 'pro';

export interface AiProfile {
  /** 0 to 1: how often the AI makes the sound choice instead of a loose one. */
  judgement: number;
  /** Multiplier on timing and judgement-of-line errors. 1 is the player's own ability. */
  execution: number;
}

export const AI_LEVELS: Record<AiLevel, AiProfile> = {
  casual: { judgement: 0.5, execution: 1.7 },
  classic: { judgement: 0.78, execution: 1.25 },
  pro: { judgement: 0.96, execution: 1 },
};

/** What both the bowler and the batter can see of the match. */
export interface Situation {
  /** Overs completed in this innings. */
  over: number;
  /** Overs in the innings. */
  overs: number;
  wickets: number;
  /** Runs needed to win, or null when batting first. */
  toWin: number | null;
  ballsLeft: number;
  /** Bouncers still allowed this over. */
  bouncersLeft: number;
  /** Age of the ball in overs. */
  ballAge: number;
}

const between = (value: number, low: number, high: number) =>
  value < low ? low : value > high ? high : value;
/** Two uniform draws: a bell-ish value in (-size, size). */
const bell = (random: RandomStream, size: number) => (random.next() + random.next() - 1) * size;
/** Pick from weighted options. */
function pick<T>(random: RandomStream, options: [T, number][]): T {
  let total = 0;
  for (const [, weight] of options) total += weight > 0 ? weight : 0;
  let roll = random.next() * total;
  for (const [value, weight] of options) {
    if (weight <= 0) continue;
    roll -= weight;
    if (roll <= 0) return value;
  }
  const last = options[options.length - 1];
  if (!last) throw new Error('nothing to pick from');
  return last[0];
}

/** 0 at the start of the innings, 1 in the last fifth: the "death" overs. */
const lateness = (situation: Situation) =>
  between((situation.over - situation.overs * 0.8) / (situation.overs * 0.2), 0, 1);

/** What the bowler means to bowl. Lines are in the batter's terms: negative is the off side. */
export function chooseDelivery(
  bowler: Bowling,
  situation: Situation,
  level: AiProfile,
  random: RandomStream,
): BowlingIntent {
  const late = lateness(situation);
  const fresh = between(1 - situation.ballAge / 12, 0, 1);

  // A lapse: a loose ball of the kind batters wait for.
  if (!random.chance(level.judgement)) {
    return pick<BowlingIntent>(random, [
      [{ line: 0.25, length: 4, kmh: bowler.kmh - 4, swing: 0, turn: 0 }, 1], // half-volley on the pads
      [{ line: -0.7, length: 9, kmh: bowler.kmh - 4, swing: 0, turn: 0 }, 1], // short and wide
      [{ line: -0.2, length: 3.2, kmh: bowler.kmh - 4, swing: 0, turn: 0 }, 1], // overpitched
    ]);
  }

  if (bowler.kind === 'spin') {
    // An off-break turns in to a right-hander (towards +x); a leg-break the other way.
    const turn = (bowler.turn === 'leg' ? -1 : 1) * random.range(0.6, 1);
    return pick<BowlingIntent>(random, [
      [{ line: -0.15, length: 4.3, kmh: bowler.kmh, swing: 0, turn }, 5], // stock ball
      [{ line: -0.3, length: 3.6, kmh: bowler.kmh - 6, swing: 0, turn }, 2], // tossed up
      [{ line: 0, length: 5.2, kmh: bowler.kmh + 6, swing: 0, turn: turn * 0.3 }, 1.5 + late], // quicker and flatter
    ]);
  }

  const swing = (random.chance(0.5) ? 1 : -1) * (0.3 + 0.6 * fresh);
  return pick<BowlingIntent>(random, [
    [{ line: -0.25, length: 6.8, kmh: bowler.kmh, swing: swing * 0.6, turn: 0 }, 5 - 3 * late], // top of off
    [{ line: -0.2, length: 4.8, kmh: bowler.kmh, swing, turn: 0 }, 1 + 2 * fresh], // pitched up to swing
    [{ line: 0, length: 1.3, kmh: bowler.kmh, swing: 0, turn: 0 }, 0.3 + 4 * late], // yorker
    [
      { line: -0.1, length: 10.6, kmh: bowler.kmh + 2, swing: 0, turn: 0 },
      situation.bouncersLeft > 0 ? 0.5 + 0.5 * late : 0,
    ], // bouncer
    [{ line: -0.2, length: 6, kmh: bowler.kmh - 22, swing: 0, turn: 0 }, 0.3 + 2 * late], // slower ball
    [{ line: -0.5, length: 6.5, kmh: bowler.kmh, swing: 0, turn: 0 }, 1], // wide of off, dry
  ]);
}

/**
 * How hard the batter is trying to score, 0 (survive) to 1 (everything goes).
 *
 * Batting first it follows resources: wickets in hand against overs left. Ten wickets
 * for twenty overs can be spent freely; ten wickets for fifty cannot. Chasing, the
 * required rate sets the tempo.
 */
export function aggression(situation: Situation): number {
  const inHand = 10 - situation.wickets;
  const oversLeft = situation.ballsLeft / 6;
  const spare = oversLeft > 0 ? inHand / oversLeft : 2;
  let want = 0.22 + 0.55 * between(spare / 0.7, 0, 1) + 0.15 * lateness(situation);
  if (situation.toWin !== null && situation.ballsLeft > 0) {
    const required = (situation.toWin * 6) / situation.ballsLeft;
    const chase = 0.25 + (required - 5) / 9;
    // Ahead of the rate there is no need to take the risks the resources would allow.
    want = chase < want ? (chase + want) / 2 : chase;
  }
  return between(want, 0.05, 1);
}

interface Reading {
  /** The scoring stroke this ball asks for. */
  attack: StrokeId;
  defend: StrokeId | 'leave';
  /** 0 to 1: how hittable the ball is. */
  loose: number;
}

/** The textbook answer to a ball of this line and length. */
function read(intent: BowlingIntent, spin: boolean): Reading {
  const { line, length } = intent;
  if (length < 2.2) return { attack: 'straight-drive', defend: 'forward-defence', loose: 0.15 };
  if (length < 5.2) {
    // Full: drive it, by line.
    const attack: StrokeId =
      line < -0.3
        ? 'cover-drive'
        : line < 0.08
          ? 'straight-drive'
          : line < 0.3
            ? 'on-drive'
            : 'glance';
    if (spin && length < 3.8 && line > -0.2)
      return { attack: 'sweep', defend: 'forward-defence', loose: 0.6 };
    return { attack, defend: 'forward-defence', loose: length < 4.3 ? 0.75 : 0.5 };
  }
  if (length < 8.2) {
    // Good length: respect it unless the line offers something.
    if (line < -0.55) return { attack: 'square-drive', defend: 'leave', loose: 0.45 };
    if (line > 0.2)
      return {
        attack: 'glance',
        defend: length > 7 ? 'back-defence' : 'forward-defence',
        loose: 0.6,
      };
    // In the channel on a length: hitting through the line is possible but risky.
    return {
      attack: line < -0.2 ? 'cover-drive' : 'straight-drive',
      defend: length > 7 ? 'back-defence' : 'forward-defence',
      loose: 0.22,
    };
  }
  // Short.
  if (length > 10.3) return { attack: 'hook', defend: 'leave', loose: 0.35 };
  if (line < -0.35) return { attack: 'cut', defend: 'leave', loose: 0.7 };
  return { attack: 'pull', defend: 'back-defence', loose: 0.6 };
}

const ATTACKS: StrokeId[] = [
  'cover-drive',
  'straight-drive',
  'on-drive',
  'cut',
  'pull',
  'sweep',
  'lofted-drive',
];

export interface BattingChoice {
  intent: BattingIntent;
  /** Seconds of safety wanted before taking a run. */
  caution: number;
}

/**
 * What the batter means to play. The batter reads the ball the bowler meant to bowl:
 * a ball that does something else is how good bowling takes wickets.
 */
export function chooseStroke(
  striker: SimPlayer,
  bowler: Bowling,
  bowled: BowlingIntent,
  situation: Situation,
  level: AiProfile,
  random: RandomStream,
): BattingChoice {
  const intent = aggression(situation);
  const reading = read(bowled, bowler.kind === 'spin');
  const late = lateness(situation);
  const sound = random.chance(level.judgement * (0.55 + 0.45 * striker.batting));

  let stroke: StrokeId | 'leave';
  let power: number;
  let lofted = false;

  // Go after it? More likely the looser the ball and the more the situation demands.
  const goFor = between(reading.loose * (0.45 + 0.7 * intent) + (intent - 0.55) * 0.9, 0, 1);
  if (!sound) {
    // A rush of blood: a big shot at whatever turns up.
    stroke = pick<StrokeId>(
      random,
      ATTACKS.map((id) => [id, 1]),
    );
    power = 0.9;
    lofted = random.chance(0.4);
  } else if (random.chance(goFor)) {
    stroke = reading.attack;
    power = between(0.5 + 0.5 * intent + random.range(-0.08, 0.08), 0.45, 1);
    lofted = random.chance(between(intent - 0.5, 0, 0.5) + 0.25 * late);
    if (lofted && stroke === 'straight-drive') stroke = 'lofted-drive';
  } else if (reading.defend === 'leave' || random.chance(0.5 - 0.4 * intent)) {
    stroke = reading.defend;
    power = 1; // defensive strokes are slow by definition
    // Working the ball for one: a checked drive instead of a dead bat, when in the mood.
    if (stroke === 'forward-defence' && random.chance(0.4 + 0.5 * intent)) {
      stroke = bowled.line > 0 ? 'on-drive' : 'straight-drive';
      power = 0.42;
    }
  } else {
    // A scoring chance turned down: push it into a gap.
    stroke = reading.attack;
    power = 0.42;
  }

  // Execution: better batters time it and judge it better; pace, movement and a big swing make it harder.
  const flaw = 1 - striker.batting;
  const movement = 1 + 0.5 * Math.abs(bowled.swing) + 0.7 * Math.abs(bowled.turn);
  const timing = (0.011 + 0.03 * flaw) * level.execution * (0.7 + 0.6 * power) * (bowled.kmh / 135);
  const judging = (0.014 + 0.055 * flaw) * level.execution * movement;
  return {
    intent: {
      stroke,
      lofted,
      power,
      timingError: bell(random, timing * 1.7),
      misread: { x: bell(random, judging * 1.7), y: bell(random, judging * 1.2) },
      assist: ASSIST.pro, // the AI gets no help: its skill is in the numbers above
    },
    caution: 0.6 - 0.25 * intent,
  };
}
