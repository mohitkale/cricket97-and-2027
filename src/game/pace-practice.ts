import { type BallObserver, groundEnvironment } from '../sim/ball/ball';
import { ASSIST, STROKES } from '../sim/contact/strokes';
import { Rng } from '../sim/core/prng';
import { type BattingIntent, playDelivery } from '../sim/match/delivery';
import { standardTeam } from '../sim/match/players';
import { PITCH } from '../sim/units';

export type PracticeShot = Pick<BattingIntent, 'stroke' | 'lofted'>;
export type PracticeAssist = keyof typeof ASSIST;
export type PracticeFrame = Parameters<BallObserver>[1] & { readonly time: number };
export const practiceGround = groundEnvironment('hard');
const battingTeam = standardTeam(1);
const fieldingTeam = standardTeam(2);

export function practiceDelivery(
  number: number,
  assist: PracticeAssist,
  shot: PracticeShot = { stroke: 'leave', lofted: false },
  timingError = 0,
) {
  const [striker, nonStriker] = battingTeam;
  const bowler = fieldingTeam[9]?.bowling;
  if (!striker || !nonStriker || !bowler) throw new Error('Missing practice players');
  const length = 4.7 + (number % 5) * 0.25;
  const frames: PracticeFrame[] = [];
  const result = playDelivery(
    {
      bowler: { ...bowler, hand: 'right' },
      intent: {
        line: -0.05 - (number % 4) * 0.055,
        length,
        kmh: 132 + (number % 4) * 2,
        swing: 0.15,
        turn: 0,
      },
      batting: {
        ...shot,
        timingError,
        assist: ASSIST[assist],
        power: 0.8,
        misread: { x: 0, y: 0 },
      },
      striker: { ...striker, hand: 'right' },
      nonStriker,
      fieldingTeam,
      bowlerIndex: 9,
      field: 'pace-spread',
      env: practiceGround,
      ballAge: number / 6,
      random: new Rng(number).stream('delivery'),
    },
    (time, { pos, spin, bounces }) => {
      frames.push({ time, pos: { ...pos }, spin: { ...spin }, bounces });
    },
  );
  return { result, frames };
}

export function practiceArrival(
  frames: readonly PracticeFrame[],
  stroke: PracticeShot['stroke'],
): number {
  const plane = PITCH.length - (stroke === 'leave' ? 0 : STROKES[stroke].contactDistance);
  const i = frames.findIndex(({ pos }) => pos.z >= plane);
  const next = frames[i];
  const previous = frames[i - 1];
  if (!next || !previous) return frames.at(-1)?.time ?? 0.5;
  return (
    previous.time +
    ((next.time - previous.time) * (plane - previous.pos.z)) / (next.pos.z - previous.pos.z)
  );
}
