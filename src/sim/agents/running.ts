/**
 * Running between the wickets. Batters move along the pitch with the same kind of
 * weight as fielders: they accelerate, and to turn for another run they must slow,
 * ground the bat behind the line, and push off again.
 */
import { PITCH } from '../units.ts';
import { limitsFor, type MoveLimits, type Ratings } from './movement.ts';

export type End = 'striker' | 'bowler';

/** Popping crease positions along the pitch. */
export const CREASE: Record<End, number> = {
  striker: PITCH.length - PITCH.poppingCrease,
  bowler: PITCH.poppingCrease,
};
/** A batter makes their ground when the bat, held out in front, is over the line. Metres. */
export const BAT_REACH = 1.1;
/** Pads, bat and helmet cost a little speed [tuned]. */
const KIT = 0.95;

export interface Runner {
  /** Which batter this is, by where they stood when the ball was bowled. */
  role: 'striker' | 'non-striker';
  /** Position along the pitch. */
  z: number;
  /** Signed speed: positive towards the striker's end. */
  v: number;
  /** The end the batter is running to, or standing at. */
  goal: End;
  /** Bat grounded behind the line at `goal`. */
  home: boolean;
  /** Will turn for another run on arrival, so must stop at the crease. */
  turning: boolean;
  /** Seconds before the batter sets off (finishing the stroke). */
  delay: number;
  limits: MoveLimits;
}

export function createRunner(role: Runner['role'], ratings: Ratings): Runner {
  const limits = limitsFor(ratings);
  const striker = role === 'striker';
  return {
    role,
    // The non-striker backs up a little as the ball is bowled.
    z: striker ? CREASE.striker : CREASE.bowler + 1.8,
    v: 0,
    goal: striker ? 'striker' : 'bowler',
    home: striker,
    turning: false,
    delay: striker ? 0.15 : 0,
    limits: { ...limits, topSpeed: limits.topSpeed * KIT },
  };
}

/** Is the bat over the line at the end the batter is heading for? */
export function grounded(runner: Runner): boolean {
  return runner.goal === 'striker'
    ? runner.z + BAT_REACH >= CREASE.striker
    : runner.z - BAT_REACH <= CREASE.bowler;
}

/** Send the batter to the other end. */
export function setOff(runner: Runner): void {
  runner.goal = runner.goal === 'striker' ? 'bowler' : 'striker';
  runner.home = false;
}

export function stepRunner(runner: Runner, dt: number): void {
  const { limits } = runner;
  if (runner.delay > 0) {
    runner.delay -= dt;
    return;
  }
  const towards = runner.goal === 'striker' ? 1 : -1;
  // Stop with the bat just over the line when turning; otherwise run on through the crease.
  const stopAt = CREASE[runner.goal] - towards * (BAT_REACH - 0.25);
  const runTo = CREASE[runner.goal] + towards * 2.5;
  const target = runner.turning || runner.home ? stopAt : runTo;
  const gap = (target - runner.z) * towards;

  let wanted = 0;
  if (gap > 0.02) {
    wanted = limits.topSpeed;
    const stopping = Math.sqrt(2 * limits.brake * gap);
    if (stopping < wanted) wanted = stopping;
  }
  const along = runner.v * towards;
  const change = wanted - along;
  const up = limits.accel * dt;
  const down = limits.brake * dt;
  const next = along + (change > up ? up : change < -down ? -down : change);
  runner.v = next * towards;
  runner.z += runner.v * dt;
  if (!runner.home && grounded(runner)) runner.home = true;
}

/** Seconds for this batter to make their ground at the end they are heading for. */
export function etaHome(runner: Runner): number {
  if (runner.home) return 0;
  const towards = runner.goal === 'striker' ? 1 : -1;
  const gap = (CREASE[runner.goal] - towards * BAT_REACH - runner.z) * towards;
  if (gap <= 0) return 0;
  const { accel, topSpeed } = runner.limits;
  const along = runner.v * towards;
  const speed = along > 0 ? along : 0;
  // Accelerate from the current speed to top speed, then hold it.
  const toTop = (topSpeed * topSpeed - speed * speed) / (2 * accel);
  const run =
    gap <= toTop
      ? (Math.sqrt(speed * speed + 2 * accel * gap) - speed) / accel
      : (topSpeed - speed) / accel + (gap - toTop) / topSpeed;
  return (
    (runner.delay > 0 ? runner.delay : 0) + (along < 0 ? -along / runner.limits.brake : 0) + run
  );
}

/** Seconds a fresh run would take this batter from a standing turn at the crease. */
export function runTime(runner: Runner): number {
  const gap = CREASE.striker - CREASE.bowler - 2 * (BAT_REACH - 0.25) - 0.25;
  const { accel, topSpeed } = runner.limits;
  const toTop = (topSpeed * topSpeed) / (2 * accel);
  return gap <= toTop ? Math.sqrt((2 * gap) / accel) : topSpeed / accel + (gap - toTop) / topSpeed;
}

/**
 * Seconds for this batter to get to the other end from where they are and however they
 * are moving now. A batter who ran through the crease has to pull up and come back,
 * which costs far more than a turn at the line.
 */
export function nextRunTime(runner: Runner): number {
  const { accel, brake, topSpeed } = runner.limits;
  // The next run goes away from the end the batter is at now.
  const away = runner.goal === 'striker' ? -1 : 1;
  const wrongWay = -runner.v * away; // speed still carrying them the wrong way
  const stopTime = wrongWay > 0 ? wrongWay / brake : 0;
  const overrun = wrongWay > 0 ? (wrongWay * wrongWay) / (2 * brake) : 0;
  const far = runner.goal === 'striker' ? CREASE.bowler : CREASE.striker;
  const from = runner.z - away * overrun;
  const gap = (far - away * BAT_REACH - from) * away;
  if (gap <= 0) return stopTime;
  const toTop = (topSpeed * topSpeed) / (2 * accel);
  const run =
    gap <= toTop ? Math.sqrt((2 * gap) / accel) : topSpeed / accel + (gap - toTop) / topSpeed;
  return (runner.delay > 0 ? runner.delay : 0) + stopTime + run;
}
