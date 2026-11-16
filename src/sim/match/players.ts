/**
 * What the simulation needs to know about a player. Names, faces and kits live in
 * presentation; the sim only sees abilities.
 */
import type { Ratings } from '../agents/movement.ts';
import { Rng } from '../core/prng.ts';

export interface Bowling {
  kind: 'pace' | 'spin';
  hand: 'right' | 'left';
  /** Typical speed of the stock ball, km/h. */
  kmh: number;
  /** For spinners: which way the stock ball turns for a right-handed batter. */
  turn: 'off' | 'leg' | null;
  /** 0 to 1: accuracy and control. */
  skill: number;
}

export interface SimPlayer {
  hand: 'right' | 'left';
  /** 0 to 1: timing and shot selection. */
  batting: number;
  bowling: Bowling | null;
  fielding: Ratings;
  keeper: boolean;
}

export type SimTeam = SimPlayer[];

/**
 * A balanced eleven for tests and headless matches: six batters (one keeps wicket),
 * an all-rounder, and four bowlers. `strength` moves every ability up or down.
 */
export function standardTeam(seed: number, strength = 0.6): SimTeam {
  const random = new Rng(seed).stream('team');
  const near = (centre: number) => {
    const value = centre + random.range(-0.12, 0.12);
    return value < 0 ? 0 : value > 1 ? 1 : value;
  };
  const fielding = (): Ratings => ({
    pace: near(strength),
    agility: near(strength),
    hands: near(strength),
    arm: near(strength),
  });
  const pace = (kmh: number, skill: number): Bowling => ({
    kind: 'pace',
    hand: random.chance(0.25) ? 'left' : 'right',
    kmh,
    turn: null,
    skill: near(skill),
  });
  const spin = (turn: 'off' | 'leg', skill: number): Bowling => ({
    kind: 'spin',
    hand: 'right',
    kmh: 84 + random.int(8),
    turn,
    skill: near(skill),
  });
  const player = (batting: number, bowling: Bowling | null, keeper = false): SimPlayer => ({
    hand: random.chance(0.3) ? 'left' : 'right',
    batting: near(batting),
    bowling,
    fielding: fielding(),
    keeper,
  });
  return [
    player(strength + 0.15, null),
    player(strength + 0.15, null),
    player(strength + 0.2, spin('off', strength - 0.25)),
    player(strength + 0.2, null),
    player(strength + 0.1, null, true),
    player(strength + 0.05, pace(126, strength - 0.1)),
    player(strength - 0.05, spin('leg', strength + 0.05)),
    player(strength - 0.2, pace(138, strength + 0.1)),
    player(strength - 0.3, spin('off', strength + 0.1)),
    player(strength - 0.35, pace(142, strength + 0.15)),
    player(strength - 0.4, pace(136, strength + 0.1)),
  ];
}
