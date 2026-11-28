/**
 * One delivery from the bowler's hand to dead ball.
 *
 * Inputs are intentions: where the bowler means to pitch it and what the batter means
 * to play. Everything after that is the simulation: execution error, flight, the bat,
 * the stumps, the pad, the keeper, the field. The result is a BallOutcome for the
 * rules engine plus the detail presentation and commentary will want.
 */
import { type FieldName, fieldPositions, keeperPosition } from '../agents/field.ts';
import { type Agent, createAgent } from '../agents/movement.ts';
import { type FieldObserver, type PlayResult, resolvePlay } from '../agents/play.ts';
import { createRunner, type End, type RunControl } from '../agents/running.ts';
import {
  type BallEnvironment,
  type BallObserver,
  type BallOptions,
  type BallState,
  createBall,
  stepBall,
} from '../ball/ball.ts';
import { solveRelease } from '../ball/release.ts';
import { type ContactResult, planSwing, stepSwing } from '../contact/contact.ts';
import type { Assist, StrokeId } from '../contact/strokes.ts';
import type { RandomStream } from '../core/prng.ts';
import { type LbwFacts, type Line, lbwDecision } from '../rules/lbw.ts';
import type { BallOutcome } from '../rules/match.ts';
import { BALL, PITCH, SIM_DT, WICKET } from '../units.ts';
import type { Bowling, SimPlayer, SimTeam } from './players.ts';

const L = PITCH.length;
const CREASE_Z = L - PITCH.poppingCrease;
/** Half the wicket plus the ball: a ball's centre inside this hits the stumps. */
const STUMP_REACH = WICKET.width / 2 + BALL.radius;
/** Off-side wide line, metres from middle stump (limited-overs guide line). */
const WIDE_OFF = 0.89;
/** A ball passing this far down the leg side of middle stump is a wide in limited overs. */
const WIDE_LEG = 0.45;
const SHOULDER = 1.45;
const HEAD = 2.0;

export interface BowlingIntent {
  /** Where the ball should pitch: metres from middle stump (right-hander's off side negative). */
  line: number;
  /** Metres in front of the striker's stumps. */
  length: number;
  /** Release speed, km/h. */
  kmh: number;
  /** Seam presentation for swing, -1 to 1. See BallState.seamTilt. */
  swing: number;
  /** Side spin, -1 to 1: positive turns the ball towards +x off the pitch. */
  turn: number;
}

export interface BattingIntent {
  /** The stroke, or 'leave' to let the ball go. */
  stroke: StrokeId | 'leave';
  lofted: boolean;
  /** Seconds: positive is late. */
  timingError: number;
  assist: Assist;
  /** Share of full bat speed, 0 to 1. See SwingInput.power. */
  power: number;
  /** Misjudgement of the ball's position, metres. See SwingInput.misread. */
  misread: { x: number; y: number };
  /** Placement either side of the stroke's line. See SwingInput.steer. */
  steer?: number;
}

export interface DeliveryInput {
  bowler: Bowling;
  intent: BowlingIntent;
  batting: BattingIntent;
  striker: SimPlayer;
  nonStriker: SimPlayer;
  fieldingTeam: SimTeam;
  /** Index of the bowler in the fielding team. */
  bowlerIndex: number;
  field: FieldName;
  env: BallEnvironment;
  /** Age of the ball in overs. */
  ballAge: number;
  random: RandomStream;
  /** Seconds of safety the batters want before running. */
  caution?: number;
  throwEnd?: End;
  running?: RunControl;
  /** The striker has left their ground playing the delivery and is not attempting a run. */
  strikerAdvanced?: boolean;
}

export type DeliveryEnding =
  | 'bowled'
  | 'lbw'
  | 'caught'
  | 'run-out'
  | 'stumped'
  | 'hit'
  | 'pad'
  | 'left'
  | 'missed';

/**
 * The ball breaking the striker's wicket, for presentation to knock the bails off in the
 * right direction. Sim frame: metres, x across (off side negative for a right-hander),
 * y up, z along the pitch from the bowler's stumps; time in seconds from release.
 */
export interface WicketBreak {
  t: number;
  end?: End;
  /** Where the ball's centre crossed the line of the stumps (z is the stumps). */
  at: { x: number; y: number; z: number };
  /** The ball's velocity there, m/s. */
  vel: { x: number; y: number; z: number };
}

export interface DeliveryResult {
  outcome: BallOutcome;
  ending: DeliveryEnding;
  /** Where the ball pitched, or null for a full toss. */
  pitched: { x: number; z: number } | null;
  /** Speed at release, km/h. */
  kmh: number;
  contact: ContactResult | null;
  play: PlayResult | null;
  lbw: (LbwFacts & { out: boolean }) | null;
  /** Set when the wicket was broken by the delivery or the keeper. */
  wicketBroken: WicketBreak | null;
}

/** Two uniform draws make a bell-ish error without needing a normal distribution. */
const spread = (random: RandomStream, size: number) => (random.next() + random.next() - 1) * size;

function lineOf(x: number, side: number): Line {
  const across = x * side; // right-hander's frame: off negative, leg positive
  if (across < -STUMP_REACH) return 'outside-off';
  if (across > STUMP_REACH) return 'outside-leg';
  return 'in-line';
}

/** Fresh fielders for a delivery: the nine in the field, the keeper and the bowler. */
export function setField(
  input: Pick<DeliveryInput, 'fieldingTeam' | 'bowlerIndex' | 'field' | 'bowler' | 'striker'>,
): { fielders: Agent[]; keeper: number; bowler: number } {
  const { fieldingTeam, bowlerIndex } = input;
  const keeperIndex = Math.max(
    0,
    fieldingTeam.findIndex((player) => player.keeper),
  );
  const others = fieldingTeam
    .map((_, index) => index)
    .filter((index) => index !== keeperIndex && index !== bowlerIndex);
  const spots = fieldPositions(input.field, input.striker.hand);
  const fielders: Agent[] = [];
  others.slice(0, spots.length).forEach((index, i) => {
    const spot = spots[i];
    const player = fieldingTeam[index];
    if (spot && player) fielders.push(createAgent(index, spot.x, spot.z, player.fielding));
  });
  const keeper = fieldingTeam[keeperIndex];
  const bowler = fieldingTeam[bowlerIndex];
  const stand = keeperPosition(input.bowler.kind === 'spin');
  if (keeper) fielders.push(createAgent(keeperIndex, stand.x, stand.z, keeper.fielding));
  // The bowler has followed through a few paces down the pitch.
  if (bowler)
    fielders.push(
      createAgent(bowlerIndex, input.bowler.hand === 'right' ? -0.7 : 0.7, 4, bowler.fielding),
    );
  return { fielders, keeper: keeperIndex, bowler: bowlerIndex };
}

export function playDelivery(
  input: DeliveryInput,
  observe?: BallObserver,
  field?: FieldObserver,
): DeliveryResult {
  const { bowler, intent, batting, striker, env, random } = input;
  const side = striker.hand === 'right' ? 1 : -1;

  // The bowler misses the mark by an amount that shrinks with skill.
  const wayward = 1 - bowler.skill;
  const line = intent.line * side + spread(random, 0.1 + 0.3 * wayward);
  const length = Math.max(0.3, intent.length + spread(random, 0.35 + 1.1 * wayward));
  const kmh = intent.kmh + spread(random, 3);
  const overstepped = random.chance(0.002 + 0.012 * wayward);

  const from = {
    x: bowler.hand === 'right' ? -0.45 : 0.45,
    y: bowler.kind === 'pace' ? 2.12 : 2.25,
    z: PITCH.poppingCrease,
  };
  const spinRate = bowler.kind === 'spin' ? 190 : 0;
  const options: BallOptions = {
    age: input.ballAge,
    seamTilt: bowler.kind === 'pace' ? intent.swing : 0,
    seamUpright: bowler.kind === 'pace' ? 0.4 + 0.6 * bowler.skill : 0,
    spin:
      bowler.kind === 'spin' ? { x: 50, y: 0, z: -intent.turn * spinRate } : { x: -25, y: 0, z: 0 },
  };
  const release = solveRelease(
    { from, target: { x: line, z: L - length }, pace: kmh / 3.6, ball: options },
    env,
  );
  const ball = createBall(from, release.velocity, options);
  observe?.(0, ball);
  const initialField = field ? setField(input) : undefined;
  if (initialField) field?.frame(0, initialField.fielders);

  const swing =
    batting.stroke === 'leave'
      ? null
      : planSwing(ball, env, {
          stroke: batting.stroke,
          hand: striker.hand,
          lofted: batting.lofted,
          timingError: batting.timingError,
          assist: batting.assist,
          power: batting.power,
          misread: batting.misread,
          steer: batting.steer ?? 0,
        });

  // Fly the ball to the batter. Note where it pitches and how high it passes the crease.
  let contact: ContactResult | null = null;
  let heightAtCrease = 0;
  let lineAtCrease = 0;
  let crossedCrease = false;
  let pitched: DeliveryResult['pitched'] = null;
  let previous = { ...ball.pos };
  let flown = 0;
  for (let step = 0; step < 600 && ball.pos.z < L + 0.3; step++) {
    previous = { ...ball.pos };
    flown++;
    if (swing) {
      contact = stepSwing(swing, ball, env, SIM_DT, random);
      if (contact?.impact) {
        observe?.(contact.time, {
          pos: contact.impact.centre,
          spin: ball.spin,
          bounces: ball.bounces,
        });
        observe?.(flown * SIM_DT, ball);
        break;
      }
    } else {
      stepBall(ball, SIM_DT, env, random);
    }
    observe?.(flown * SIM_DT, ball);
    if (!pitched && ball.bounces > 0) pitched = { x: ball.landed.x, z: ball.landed.z };
    if (!crossedCrease && ball.pos.z >= CREASE_Z) {
      crossedCrease = true;
      heightAtCrease = ball.pos.y;
      lineAtCrease = ball.pos.x;
    }
    if (ball.rolling && ball.vel.z < 0.5) break; // a ball that died on the pitch
  }
  const hit = contact !== null && contact.kind !== 'miss';
  const bouncer = !hit && crossedCrease && heightAtCrease > SHOULDER && heightAtCrease <= HEAD;

  const base: BallOutcome = {};
  if (overstepped) base.illegal = 'no-ball';
  if (bouncer) base.bouncer = true;
  const finish = (
    ending: DeliveryEnding,
    outcome: BallOutcome,
    play: PlayResult | null = null,
    lbw: DeliveryResult['lbw'] = null,
    wicketBroken: WicketBreak | null = null,
  ): DeliveryResult => ({
    outcome: { ...base, ...outcome },
    ending,
    pitched,
    kmh,
    contact,
    play,
    lbw,
    wicketBroken,
  });

  const live = (noCatch: boolean): PlayResult => {
    const start = flown * SIM_DT;
    const { fielders, keeper, bowler: bowlerId } = initialField ?? setField(input);
    const setup = {
      ball,
      env,
      fielders,
      guards: { striker: keeper, bowler: bowlerId },
      runners: [
        createRunner('striker', striker.fielding),
        createRunner('non-striker', input.nonStriker.fielding),
      ] as [ReturnType<typeof createRunner>, ReturnType<typeof createRunner>],
      random,
      noCatch,
      ...(input.caution === undefined ? {} : { caution: input.caution }),
      ...(input.throwEnd === undefined ? {} : { throwEnd: input.throwEnd }),
      ...(input.running && {
        running: {
          automatic: input.running.automatic,
          commands: input.running.commands.map(({ time, action }) => ({
            time: time - start,
            action,
          })),
        },
      }),
    };
    return resolvePlay(
      setup,
      observe && ((time, frame) => observe(start + time, frame)),
      field && {
        frame: (time, agents) => field.frame(start + time, agents),
        touch: (time, actor, kind, point, aim) =>
          field.touch(start + time, actor, kind, point, aim),
        runners: (time, runners, status) => field.runners?.(start + time, runners, status),
        wicket: (time, end, out) => field.wicket?.(start + time, end, out),
      },
    );
  };
  const fromPlay = (play: PlayResult, credit: NonNullable<BallOutcome['credit']>): BallOutcome => {
    const outcome: BallOutcome = { credit };
    if (play.boundary) outcome.boundary = play.boundary;
    else outcome.runsRun = play.runs;
    if (play.dismissal)
      outcome.dismissal = {
        kind: play.dismissal.kind,
        batter: play.dismissal.batter,
        fielder: play.dismissal.fielder,
        crossed: play.dismissal.crossed,
      };
    return outcome;
  };

  if (hit) {
    const play = live(false);
    const ending: DeliveryEnding = play.dismissal ? play.dismissal.kind : 'hit';
    return finish(ending, fromPlay(play, 'bat'), play);
  }

  // The bat was not involved. Where the ball crossed the line of the stumps decides most of it.
  const travelled = ball.pos.z - previous.z;
  const part = travelled > 0 ? (L - previous.z) / travelled : 1;
  const atStumps = {
    x: previous.x + (ball.pos.x - previous.x) * part,
    y: previous.y + (ball.pos.y - previous.y) * part,
  };
  const reached = ball.pos.z >= L;
  const hitting =
    reached &&
    (atStumps.x < 0 ? -atStumps.x : atStumps.x) <= STUMP_REACH &&
    atStumps.y <= WICKET.height + BALL.radius;

  // The front pad is beside the bat for a forward stroke; a batter who leaves or plays
  // back has the pads in front of leg stump. The pad stops a ball in its line below the knee roll.
  const padX = swing ? swing.sweet.x + 0.17 * side : 0.14 * side;
  const offPad = lineAtCrease - padX;
  const struckPad =
    crossedCrease &&
    (offPad < 0 ? -offPad : offPad) <= 0.11 + BALL.radius &&
    heightAtCrease <= 0.78;

  if (struckPad) {
    const facts: LbwFacts = {
      pitched: pitched ? lineOf(pitched.x, side) : null,
      impact: lineOf(lineAtCrease, side),
      hitting,
      shotOffered: batting.stroke !== 'leave',
      batFirst: false,
    };
    const decision = lbwDecision(facts);
    if (decision.out)
      return finish('lbw', { dismissal: { kind: 'lbw' } }, null, { ...facts, out: true });
    // Off the pad and away: leg byes if the batter played a shot.
    ball.pos.z = CREASE_Z;
    ball.pos.x = lineAtCrease;
    ball.pos.y = heightAtCrease;
    ball.vel.x = (ball.vel.x + 4 * side) * 0.35 + spread(random, 2.5);
    ball.vel.z *= 0.3;
    ball.vel.y = 0.5;
    ball.rolling = false;
    const play = live(true);
    const outcome = fromPlay(play, 'leg-byes');
    if (!facts.shotOffered) outcome.runsRun = 0; // no leg byes without a stroke
    return finish(play.dismissal ? play.dismissal.kind : 'pad', outcome, play, {
      ...facts,
      out: false,
    });
  }

  if (hitting)
    return finish('bowled', { dismissal: { kind: 'bowled' } }, null, null, {
      t: (flown - 1 + part) * SIM_DT,
      at: { x: atStumps.x, y: atStumps.y, z: L },
      vel: { ...ball.vel },
    });

  // Through to the keeper. Wide if it was out of the batter's reach.
  const across = lineAtCrease * side;
  const wide =
    !overstepped &&
    crossedCrease &&
    (across < -WIDE_OFF || across > WIDE_LEG || heightAtCrease > HEAD);
  const ending: DeliveryEnding = batting.stroke === 'leave' ? 'left' : 'missed';
  const keeperTakes =
    (lineAtCrease < 0 ? -lineAtCrease : lineAtCrease) <= 1.7 && heightAtCrease <= 2.4;
  if (keeperTakes && reached && (field || input.strikerAdvanced)) {
    const placement = initialField ?? setField(input);
    const keeper = placement.fielders.find(({ id }) => id === placement.keeper);
    if (keeper) {
      const collectAt = keeper.pos.z - 0.55;
      for (let step = 0; step < 240 && ball.pos.z < collectAt && ball.vel.z > 0.5; step++) {
        stepBall(ball, SIM_DT, env);
        flown++;
        observe?.(flown * SIM_DT, ball);
      }
      if (ball.pos.z >= collectAt) {
        field?.touch(flown * SIM_DT, keeper, 'take', ball.pos);
        if (input.strikerAdvanced && !overstepped && bowler.kind === 'spin') {
          const t = flown * SIM_DT + 0.2;
          const at = { x: 0, y: WICKET.height - BALL.radius, z: L };
          field?.touch(t, keeper, 'stump', at);
          return finish(
            'stumped',
            {
              ...(wide ? { illegal: 'wide' } : {}),
              dismissal: { kind: 'stumped', fielder: keeper.id },
            },
            null,
            null,
            { t, at, vel: { x: 0, y: 0, z: -1 } },
          );
        }
      }
    }
  }
  if (keeperTakes || !reached) return finish(ending, wide ? { illegal: 'wide' } : {});
  // Past the keeper: byes (or wides) while the ball is chased.
  const play = live(true);
  const outcome = fromPlay(play, 'byes');
  if (wide) outcome.illegal = 'wide';
  return finish(play.dismissal ? play.dismissal.kind : ending, outcome, play);
}
