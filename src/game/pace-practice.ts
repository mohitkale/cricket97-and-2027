import type { End, RunControl } from '../sim/agents/running';
import { AI_LEVELS, chooseStroke } from '../sim/ai/ai';
import { type BallObserver, groundEnvironment } from '../sim/ball/ball';
import { ASSIST, STROKES } from '../sim/contact/strokes';
import { Rng } from '../sim/core/prng';
import { type BattingIntent, type BowlingIntent, playDelivery } from '../sim/match/delivery';
import { standardTeam } from '../sim/match/players';
import { PITCH } from '../sim/units';
import { recordField } from './field-trace';
import { PRACTICE_OVERS } from './practice-innings';

export type PracticeShot = Pick<BattingIntent, 'stroke' | 'lofted'>;
export type PracticeAssist = keyof typeof ASSIST;
export type PracticeFrame = Parameters<BallObserver>[1] & { readonly time: number };
export const practiceGround = groundEnvironment('hard');
export const PRACTICE_TIMING = {
  casual: { speed: 0.65, lead: 0.105, cue: 0.19, earlyBuffer: 0.065, contactHold: 0.075 },
  classic: { speed: 0.82, lead: 0.13, cue: 0.19, earlyBuffer: 0.06, contactHold: 0.05 },
  pro: { speed: 1, lead: 0.13, cue: 0.15, earlyBuffer: 0, contactHold: 0 },
} as const;

/** First usable cue and last usable input are in simulation seconds from release. */
export function practiceWindow(arrival: number, assist: PracticeAssist) {
  const { lead, cue } = PRACTICE_TIMING[assist];
  return { ideal: arrival - lead, opens: arrival - lead - cue, closes: arrival - 0.035 };
}

export function practiceSwingError(time: number, arrival: number, assist: PracticeAssist) {
  const window = practiceWindow(arrival, assist);
  const error = time - window.ideal;
  const { earlyBuffer } = PRACTICE_TIMING[assist];
  return time >= window.opens && earlyBuffer ? Math.max(-earlyBuffer, error) : error;
}

/** Only the practice view slows the incoming ball and briefly holds a successful impact. */
export function practiceClock(elapsedFromRelease: number, assist: PracticeAssist, impact?: number) {
  const { speed, contactHold } = PRACTICE_TIMING[assist];
  const flight = elapsedFromRelease * speed;
  if (elapsedFromRelease <= 0) return elapsedFromRelease;
  if (impact === undefined || flight < impact) return flight;
  return impact + Math.max(0, elapsedFromRelease - impact / speed - contactHold);
}

const battingTeam = standardTeam(1);
const fieldingTeam = standardTeam(2);

export interface PracticeOptions {
  throwEnd?: End;
  bowl?: { intent: BowlingIntent; style: 'off' | 'leg' | null };
  running?: RunControl;
  innings?: {
    striker: number;
    nonStriker: number;
    bowler: number | null;
    legalBalls: number;
    wickets: number;
  };
}

export function practiceDelivery(
  number: number,
  assist: PracticeAssist,
  shot: PracticeShot = { stroke: 'leave', lofted: false },
  timingError = 0,
  { throwEnd, bowl, running, innings }: PracticeOptions = {},
) {
  const striker = battingTeam[innings?.striker ?? 0];
  const nonStriker = battingTeam[innings?.nonStriker ?? 1];
  const bowlerIndex = innings?.bowler ?? 9;
  const bowler = fieldingTeam[bowlerIndex]?.bowling;
  if (!striker || !nonStriker || !bowler) throw new Error('Missing practice players');
  const length = 4.7 + (number % 5) * 0.25;
  const random = new Rng(number);
  const bowling = bowl?.style
    ? { ...bowler, kind: 'spin' as const, turn: bowl.style, hand: 'right' as const }
    : { ...bowler, kind: 'pace' as const, turn: null, hand: 'right' as const };
  const rightHanded = { ...striker, hand: 'right' as const };
  const legal = innings?.legalBalls ?? number;
  const situation = {
    over: Math.floor(legal / 6),
    overs: PRACTICE_OVERS,
    wickets: innings?.wickets ?? 0,
    toWin: null,
    ballsLeft: Math.max(1, PRACTICE_OVERS * 6 - legal),
    bouncersLeft: 1,
    ballAge: number / 6,
  };
  const ai = bowl
    ? chooseStroke(
        rightHanded,
        bowling,
        bowl.intent,
        situation,
        AI_LEVELS[assist],
        random.stream('batter'),
      )
    : null;
  const batting = ai?.intent ?? {
    ...shot,
    timingError,
    assist: ASSIST[assist],
    power: 0.8,
    misread: { x: 0, y: 0 },
  };
  const frames: PracticeFrame[] = [];
  const field = recordField(
    fieldingTeam.findIndex(({ keeper }) => keeper),
    bowlerIndex,
  );
  const result = playDelivery(
    {
      bowler: bowling,
      intent: bowl?.intent ?? {
        line: -0.13 - (number % 4) * 0.035,
        length,
        kmh: 132 + (number % 4) * 2,
        swing: 0.15,
        turn: 0,
      },
      batting,
      striker: rightHanded,
      nonStriker,
      fieldingTeam,
      bowlerIndex,
      field: bowl?.style ? 'spin-spread' : 'pace-spread',
      env: practiceGround,
      ballAge: number / 6,
      random: random.stream('delivery'),
      ...(ai ? { caution: ai.caution } : {}),
      ...(throwEnd === undefined ? {} : { throwEnd }),
      ...(running === undefined ? {} : { running }),
    },
    (time, { pos, spin, bounces }) => {
      frames.push({ time, pos: { ...pos }, spin: { ...spin }, bounces });
    },
    field.observer,
  );
  return { result, frames, field: field.trace, batting };
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
