import { recordField } from '../game/field-trace';
import type { PracticeFrame } from '../game/pace-practice';
import { keeperPosition } from '../sim/agents/field';
import { createAgent } from '../sim/agents/movement';
import { resolvePlay } from '../sim/agents/play';
import { createRunner, type End, type RunControl } from '../sim/agents/running';
import { type BallObserver, createBall, groundEnvironment } from '../sim/ball/ball';
import { ASSIST } from '../sim/contact/strokes';
import { Rng } from '../sim/core/prng';
import { playDelivery } from '../sim/match/delivery';
import { standardTeam } from '../sim/match/players';
import { BALL, PITCH } from '../sim/units';

const env = groundEnvironment('hard');
const SAFE = { pace: 0.8, agility: 0.85, hands: 1, arm: 0.9 };
export type FieldScene = 'chase' | 'dive' | 'caught-behind' | 'stumping';

export function fieldFixture(
  kind: FieldScene | 'catch' | 'gather',
  seed: number,
  throwEnd?: End,
  running?: RunControl,
) {
  const field = recordField(1, 2);
  const frames: PracticeFrame[] = [];
  const observe: BallObserver = (time, { pos, spin, bounces }) => {
    frames.push({ time, pos: { ...pos }, spin: { ...spin }, bounces });
  };
  const random = new Rng(seed).stream('fixture');
  if (kind === 'stumping') {
    const batting = standardTeam(1);
    const fieldingTeam = standardTeam(2);
    const [striker, nonStriker] = batting;
    const bowler = fieldingTeam[8]?.bowling;
    if (!striker || !nonStriker || !bowler) throw new Error('Missing spin fixture players');
    // Same ratings and keeper, with the fixture IDs used by the delivery.
    const actual = recordField(
      fieldingTeam.findIndex(({ keeper }) => keeper),
      8,
    );
    const result = playDelivery(
      {
        striker: { ...striker, hand: 'right' },
        nonStriker,
        bowler,
        bowlerIndex: 8,
        fieldingTeam,
        batting: {
          stroke: 'cover-drive',
          timingError: -0.45,
          lofted: false,
          assist: ASSIST.pro,
          power: 0.8,
          misread: { x: 0, y: 0 },
        },
        intent: { line: -0.42, length: 5, kmh: 83, swing: 0, turn: 0.12 },
        field: 'spin-spread',
        env,
        ballAge: 3,
        random,
        strikerAdvanced: true,
      },
      observe,
      actual.observer,
    );
    return { field: actual.trace, frames, wicket: result.wicketBroken, play: result.play };
  }
  const behind = kind === 'caught-behind';
  const aerial = kind === 'catch' || behind;
  const x = random.range(-0.16, 0.16);
  const placed = aerial
    ? { x, y: behind ? 0.95 : random.range(0.9, 1.8), z: PITCH.length - (behind ? 0.7 : 2.8) }
    : { x, y: BALL.radius + 0.02, z: PITCH.length - 2.5 };
  const keeper = keeperPosition(behind);
  const fielders = [
    createAgent(
      0,
      behind ? -12 : aerial ? 0.1 : kind === 'dive' ? 21 : 17,
      behind ? 14 : aerial ? placed.z - 1.45 : kind === 'dive' ? 21 : placed.z - 1.3,
      SAFE,
    ),
    createAgent(1, keeper.x, keeper.z, SAFE),
    createAgent(2, 0.2, 2.4, SAFE),
  ];
  const ball = createBall(
    placed,
    aerial
      ? {
          x: random.range(-0.2, 0.2),
          y: behind ? 1.3 : random.range(0.8, 2.2),
          z: behind ? 10 : -9,
        }
      : { x: kind === 'dive' ? 15.5 : 17 + random.range(-1, 1), y: 0, z: -0.6 },
  );
  if (!aerial) {
    ball.bounces = 1;
    ball.rolling = true;
  }
  observe(0, ball);
  const play = resolvePlay(
    {
      ball,
      fielders,
      env,
      guards: { striker: 1, bowler: 2 },
      runners: [createRunner('striker', SAFE), createRunner('non-striker', SAFE)],
      random,
      ...(aerial ? {} : { caution: -2, noCatch: true }),
      ...(throwEnd === undefined ? {} : { throwEnd }),
      ...(running === undefined ? {} : { running }),
    },
    observe,
    field.observer,
  );
  return { field: field.trace, frames, wicket: null, play };
}

/** One grounded and one short at the frame the return puts the wicket down. */
export function runningFixture(short: boolean) {
  return fieldFixture('dive', short ? 1 : 9, 'striker', {
    automatic: false,
    commands: [{ time: short ? 0.2 : 1.25, action: 'run' }],
  });
}
