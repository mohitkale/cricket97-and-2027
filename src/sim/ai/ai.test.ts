import { describe, expect, test } from 'vitest';
import { Rng } from '../core/prng.ts';
import type { BowlingIntent } from '../match/delivery.ts';
import { type Bowling, standardTeam } from '../match/players.ts';
import { chooseBowler, simulateMatch } from '../match/runner.ts';
import {
  applyBall,
  bowlerRefusal,
  createMatch,
  currentInnings,
  setBowler,
} from '../rules/match.ts';
import { ruleSet } from '../rules/rule-sets.ts';
import { AI_LEVELS, aggression, chooseDelivery, chooseStroke, type Situation } from './ai.ts';

const START: Situation = {
  over: 0,
  overs: 20,
  wickets: 0,
  toWin: null,
  ballsLeft: 120,
  bouncersLeft: 1,
  ballAge: 0,
};
const QUICK: Bowling = { kind: 'pace', hand: 'right', kmh: 140, turn: null, skill: 0.8 };
const OFFIE: Bowling = { kind: 'spin', hand: 'right', kmh: 88, turn: 'off', skill: 0.8 };
const LEGGIE: Bowling = { ...OFFIE, turn: 'leg' };
const batter = standardTeam(3)[2];
if (!batter) throw new Error('no batter');
const share = <T>(items: T[], test: (item: T) => boolean) =>
  items.filter(test).length / items.length;

describe('how hard to go', () => {
  test('a T20 side starts more freely than a 50-over side', () => {
    expect(aggression(START)).toBeGreaterThan(
      aggression({ ...START, overs: 50, ballsLeft: 300 }) + 0.1,
    );
  });

  test('batting first, intent rises as the overs run out', () => {
    const at = (over: number) =>
      aggression({ ...START, over, ballsLeft: 120 - over * 6, wickets: 3 });
    expect(at(18)).toBeGreaterThan(at(10));
    expect(at(10)).toBeGreaterThanOrEqual(at(2));
  });

  test('losing wickets early reins it in', () => {
    expect(aggression({ ...START, over: 6, ballsLeft: 84, wickets: 6 })).toBeLessThan(
      aggression({ ...START, over: 6, ballsLeft: 84, wickets: 1 }) - 0.1,
    );
  });

  test('chasing, the required rate sets the tempo', () => {
    const chase = (toWin: number) =>
      aggression({ ...START, over: 10, ballsLeft: 60, wickets: 3, toWin });
    expect(chase(130)).toBeGreaterThan(chase(70) + 0.2);
    expect(chase(20)).toBeLessThan(0.5);
    expect(chase(130)).toBe(1);
  });
});

describe('what to bowl', () => {
  const bowl = (bowler: Bowling, situation: Situation, level = AI_LEVELS.pro, seed = 1) => {
    const random = new Rng(seed).stream('bowling');
    return Array.from({ length: 600 }, () => chooseDelivery(bowler, situation, level, random));
  };
  const yorker = (ball: BowlingIntent) => ball.length < 2;
  const bouncer = (ball: BowlingIntent) => ball.length > 10;

  test('a quick bowls a length early and goes to yorkers and slower balls at the death', () => {
    const early = bowl(QUICK, START);
    const death = bowl(QUICK, { ...START, over: 19, ballsLeft: 6, ballAge: 19 });
    expect(share(early, (ball) => ball.length > 5.5 && ball.length < 8)).toBeGreaterThan(0.5);
    expect(share(death, yorker)).toBeGreaterThan(share(early, yorker) + 0.2);
    expect(share(death, (ball) => ball.kmh < 125)).toBeGreaterThan(
      share(early, (ball) => ball.kmh < 125),
    );
  });

  test('the new ball is swung more than the old one', () => {
    const swing = (age: number) =>
      bowl(QUICK, { ...START, ballAge: age }).reduce((sum, ball) => sum + Math.abs(ball.swing), 0);
    expect(swing(0)).toBeGreaterThan(swing(15) * 1.3);
  });

  test('no bouncer is bowled once the over’s allowance is used', () => {
    expect(share(bowl(QUICK, START), bouncer)).toBeGreaterThan(0.01);
    expect(share(bowl(QUICK, { ...START, bouncersLeft: 0 }), bouncer)).toBe(0);
  });

  test('spinners pitch it up and turn it their own way', () => {
    const off = bowl(OFFIE, START);
    const leg = bowl(LEGGIE, START);
    expect(share(off, (ball) => ball.length < 5.5)).toBeGreaterThan(0.9);
    expect(share(off, (ball) => ball.turn > 0)).toBeGreaterThan(0.9);
    expect(share(leg, (ball) => ball.turn < 0)).toBeGreaterThan(0.9);
  });

  test('a weaker AI offers more loose balls', () => {
    const loose = (ball: BowlingIntent) => ball.kmh === QUICK.kmh - 4;
    expect(share(bowl(QUICK, START, AI_LEVELS.casual), loose)).toBeGreaterThan(
      share(bowl(QUICK, START, AI_LEVELS.pro), loose) + 0.3,
    );
  });
});

describe('what to play', () => {
  const play = (
    ball: Partial<BowlingIntent>,
    situation: Situation = START,
    level = AI_LEVELS.pro,
    bowler = QUICK,
  ) => {
    const random = new Rng(5).stream('batting');
    const bowled: BowlingIntent = {
      line: -0.2,
      length: 6.8,
      kmh: bowler.kmh,
      swing: 0,
      turn: 0,
      ...ball,
    };
    return Array.from({ length: 500 }, () =>
      chooseStroke(batter, bowler, bowled, situation, level, random),
    );
  };
  const strokes = (choices: ReturnType<typeof play>) =>
    choices.map((choice) => choice.intent.stroke);
  const mostly = (choices: ReturnType<typeof play>, allowed: string[]) =>
    share(strokes(choices), (stroke) => allowed.includes(stroke));

  test('short and wide is cut, short and straight is pulled or defended', () => {
    expect(mostly(play({ line: -0.7, length: 9 }), ['cut', 'leave'])).toBeGreaterThan(0.9);
    expect(mostly(play({ line: 0, length: 9 }), ['pull', 'back-defence'])).toBeGreaterThan(0.9);
  });

  test('a half-volley is driven according to its line', () => {
    expect(
      mostly(play({ line: -0.5, length: 4 }), ['cover-drive', 'forward-defence', 'straight-drive']),
    ).toBeGreaterThan(0.9);
    expect(
      share(strokes(play({ line: -0.5, length: 4 })), (stroke) => stroke === 'cover-drive'),
    ).toBeGreaterThan(0.5);
    expect(
      share(strokes(play({ line: 0.2, length: 4 })), (stroke) => stroke === 'on-drive'),
    ).toBeGreaterThan(0.5);
  });

  test('a good ball outside off is often left alone when there is no hurry', () => {
    const patient: Situation = { ...START, overs: 50, ballsLeft: 300 };
    expect(
      share(strokes(play({ line: -0.7, length: 6.8 }, patient)), (stroke) => stroke === 'leave'),
    ).toBeGreaterThan(0.4);
  });

  test('the same ball is attacked harder when runs are needed quickly', () => {
    const power = (situation: Situation) =>
      play({ line: -0.2, length: 4.5 }, situation).reduce(
        (sum, choice) => sum + choice.intent.power,
        0,
      );
    const calm: Situation = { ...START, over: 10, ballsLeft: 60, toWin: 30 };
    const frantic: Situation = { ...START, over: 10, ballsLeft: 60, toWin: 130 };
    expect(power(frantic)).toBeGreaterThan(power(calm) * 1.2);
    const lofted = (situation: Situation) =>
      share(play({ line: -0.2, length: 4.5 }, situation), (choice) => choice.intent.lofted);
    expect(lofted(frantic)).toBeGreaterThan(lofted(calm) + 0.1);
  });

  test('batters under pressure run with less margin', () => {
    const calm = play({}, { ...START, over: 10, ballsLeft: 60, toWin: 30 })[0];
    const frantic = play({}, { ...START, over: 10, ballsLeft: 60, toWin: 130 })[0];
    expect(frantic?.caution).toBeLessThan(calm?.caution ?? 0);
  });

  test('a weaker AI mistimes more and misjudges more', () => {
    const error = (level: typeof AI_LEVELS.pro) => {
      const choices = play({}, START, level);
      return {
        timing: choices.reduce((sum, choice) => sum + Math.abs(choice.intent.timingError), 0),
        judging: choices.reduce((sum, choice) => sum + Math.abs(choice.intent.misread.x), 0),
      };
    };
    expect(error(AI_LEVELS.casual).timing).toBeGreaterThan(error(AI_LEVELS.pro).timing * 1.3);
    expect(error(AI_LEVELS.casual).judging).toBeGreaterThan(error(AI_LEVELS.pro).judging * 1.3);
  });

  test('a swinging or turning ball is harder to judge', () => {
    const judging = (ball: Partial<BowlingIntent>) =>
      play(ball).reduce((sum, choice) => sum + Math.abs(choice.intent.misread.x), 0);
    expect(judging({ swing: 0.9 })).toBeGreaterThan(judging({ swing: 0 }) * 1.2);
  });

  test('the AI batter is given no assistance', () => {
    expect(play({})[0]?.intent.assist).toEqual({ timingScale: 1, aim: 0, batWidth: 1 });
  });
});

describe('captaincy', () => {
  test('the captain always names someone who is allowed to bowl, and never the keeper', () => {
    const team = standardTeam(8);
    const match = createMatch(ruleSet('2027-t20', 10));
    const random = new Rng(2).stream('captain');
    for (let over = 0; over < 10; over++) {
      const chosen = chooseBowler(match, team, random);
      expect(bowlerRefusal(match, chosen)).toBeNull();
      expect(team[chosen]?.keeper).toBe(false);
      setBowler(match, chosen);
      for (let ball = 0; ball < 6; ball++) applyBall(match, {});
    }
    const cards = Object.values(match.innings[0]?.bowlers ?? {});
    expect(Math.max(...cards.map((card) => card.balls))).toBeLessThanOrEqual(12);
    expect(currentInnings(match).battingTeam).toBe(1);
  });
});

describe('whole matches', () => {
  test('a match plays to a result and the same seed replays it exactly', () => {
    const setup = {
      rules: ruleSet('2027-t20', 5),
      teams: [standardTeam(1), standardTeam(2)] as [
        ReturnType<typeof standardTeam>,
        ReturnType<typeof standardTeam>,
      ],
      levels: ['pro', 'pro'] as ['pro', 'pro'],
      seed: 4,
    };
    const once = simulateMatch(setup);
    const again = simulateMatch(setup);
    expect(once.match.result).not.toBeNull();
    expect(again.match).toEqual(once.match);
    expect(once.tally.balls).toBeGreaterThanOrEqual(30);
  });

  test('no illegal field or bowling change in 500 overs of both formats', () => {
    let overs = 0;
    let seed = 0;
    while (overs < 500) {
      const id = seed % 2 ? '1997-odi' : '2027-t20';
      const report = simulateMatch({
        rules: ruleSet(id, 10),
        teams: [standardTeam(seed + 50), standardTeam(seed + 90)],
        levels: ['classic', 'pro'],
        seed,
      });
      expect(report.tally.illegalFields).toBe(0);
      expect(report.tally.illegalBowlers).toBe(0);
      expect(report.match.result).not.toBeNull();
      overs += report.match.innings.reduce(
        (sum, innings) => sum + Math.ceil(innings.legalBalls / 6),
        0,
      );
      seed += 1;
    }
  }, 30_000);

  test('Pro beats Casual in at least 70 of 100 matches between identical teams', () => {
    let wins = 0;
    for (let seed = 0; seed < 100; seed++) {
      const proBatsFirst = seed % 2 === 0;
      const team = standardTeam(900 + seed);
      const report = simulateMatch({
        rules: ruleSet('2027-t20', 5),
        teams: [team, team],
        levels: proBatsFirst ? ['pro', 'casual'] : ['casual', 'pro'],
        seed: 1000 + seed,
      });
      const result = report.match.result;
      if (result?.type === 'win' && (result.winner === 0) === proBatsFirst) wins += 1;
    }
    expect(wins).toBeGreaterThanOrEqual(70);
  }, 30_000);
});
