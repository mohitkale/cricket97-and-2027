import { describe, expect, test } from 'vitest';
import { createBall, groundEnvironment } from '../ball/ball.ts';
import { Rng } from '../core/prng.ts';
import { ruleSet } from '../rules/rule-sets.ts';
import { PITCH, SIM_DT } from '../units.ts';
import {
  chooseField,
  countField,
  FIELDS,
  type FieldName,
  faultsOf,
  fieldPositions,
  GROUND,
  insideBoundary,
  insideCircle,
  POSITIONS,
} from './field.ts';
import { interceptionFor, planFielding, predictPath } from './intercept.ts';
import {
  type Agent,
  AVERAGE,
  createAgent,
  distance,
  limitsFor,
  sendTo,
  stepAgent,
  timeToCover,
} from './movement.ts';

const L = PITCH.length;
const env = groundEnvironment('hard');
const angle = (a: { x: number; z: number }, b: { x: number; z: number }) =>
  Math.acos(Math.min(1, a.x * b.x + a.z * b.z));

describe('movement', () => {
  test('ratings widen the limits', () => {
    const slow = limitsFor({ pace: 0, agility: 0, hands: 0, arm: 0 });
    const quick = limitsFor({ pace: 1, agility: 1, hands: 1, arm: 1 });
    expect(quick.topSpeed).toBeGreaterThan(slow.topSpeed);
    expect(quick.accel).toBeGreaterThan(slow.accel);
    expect(quick.reaction).toBeLessThan(slow.reaction);
    expect(slow.topSpeed).toBeGreaterThan(6);
    expect(quick.topSpeed).toBeLessThan(9.5);
  });

  test('no agent ever exceeds its speed, acceleration, braking or turn limits', () => {
    const random = new Rng(17).stream('targets');
    for (let trial = 0; trial < 40; trial++) {
      const ratings = { pace: random.next(), agility: random.next(), hands: 0.5, arm: 0.5 };
      const agent = createAgent(trial, random.range(-40, 40), random.range(-20, 50), ratings);
      const { limits } = agent;
      for (let step = 0; step < 1200; step++) {
        if (step % 150 === 0)
          sendTo(agent, { x: random.range(-55, 55), z: random.range(-30, 55) }, random.chance(0.3));
        const before = { speed: agent.speed, heading: { ...agent.heading }, pos: { ...agent.pos } };
        stepAgent(agent, SIM_DT);
        expect(agent.speed).toBeLessThanOrEqual(limits.topSpeed + 1e-9);
        expect(agent.speed).toBeGreaterThanOrEqual(0);
        expect(agent.speed - before.speed).toBeLessThanOrEqual(limits.accel * SIM_DT + 1e-9);
        expect(before.speed - agent.speed).toBeLessThanOrEqual(limits.brake * SIM_DT + 1e-9);
        const allowed = (before.speed < 1 ? 2 : 1) * limits.turnRate * SIM_DT;
        expect(angle(before.heading, agent.heading)).toBeLessThanOrEqual(allowed + 1e-6);
        expect(distance(before.pos, agent.pos)).toBeLessThanOrEqual(
          limits.topSpeed * SIM_DT + 1e-9,
        );
        expect(Math.hypot(agent.heading.x, agent.heading.z)).toBeCloseTo(1, 9);
      }
    }
  });

  test('an idle player reacts before moving, then arrives and stops on the spot', () => {
    const agent = createAgent(1, 0, 0);
    sendTo(agent, { x: 0, z: 20 });
    for (let i = 0; i < Math.floor(agent.limits.reaction / SIM_DT); i++) stepAgent(agent, SIM_DT);
    expect(agent.pos.z).toBe(0);
    for (let i = 0; i < 120 * 8; i++) stepAgent(agent, SIM_DT);
    expect(distance(agent.pos, { x: 0, z: 20 })).toBeLessThan(0.1);
    expect(agent.speed).toBeLessThan(0.3);
  });

  test('running through a point keeps the speed up', () => {
    const agent = createAgent(1, 0, 0);
    sendTo(agent, { x: 0, z: 20 }, true);
    let speedThere = 0;
    for (let i = 0; i < 120 * 6 && agent.pos.z < 20; i++) {
      stepAgent(agent, SIM_DT);
      speedThere = agent.speed;
    }
    expect(speedThere).toBeGreaterThan(agent.limits.topSpeed * 0.9);
  });

  test('turning back costs time compared with running straight', () => {
    const run = (facing: { x: number; z: number }) => {
      const agent = createAgent(1, 0, 0, AVERAGE, facing);
      sendTo(agent, { x: 0, z: 15 }, true);
      let steps = 0;
      while (agent.pos.z < 15 && steps < 2000) {
        stepAgent(agent, SIM_DT);
        steps += 1;
      }
      return steps * SIM_DT;
    };
    expect(run({ x: 0, z: -1 })).toBeGreaterThan(run({ x: 0, z: 1 }) + 0.05);
  });

  test.each([3, 10, 25, 50])('the planning estimate for %i m is close to the real run', (gap) => {
    const agent = createAgent(1, 0, 0);
    sendTo(agent, { x: 0, z: gap }, true);
    let steps = 0;
    while (agent.pos.z < gap && steps < 4000) {
      stepAgent(agent, SIM_DT);
      steps += 1;
    }
    const actual = steps * SIM_DT;
    const estimate = timeToCover(gap, agent.limits);
    expect(Math.abs(estimate - actual)).toBeLessThan(0.12 + actual * 0.04);
  });
});

describe('the ground', () => {
  test('the circle is 30 yards from either wicket', () => {
    expect(insideCircle({ x: 27, z: L / 2 })).toBe(true);
    expect(insideCircle({ x: 28, z: L / 2 })).toBe(false);
    expect(insideCircle({ x: 0, z: L + 27 })).toBe(true);
    expect(insideCircle({ x: 0, z: -28 })).toBe(false);
  });

  test('every standard position is inside the boundary', () => {
    for (const point of Object.values(POSITIONS)) expect(insideBoundary(point)).toBe(true);
    expect(insideBoundary({ x: GROUND.boundaryRadius + 0.1, z: L / 2 })).toBe(false);
  });

  test.each(Object.keys(FIELDS) as FieldName[])(
    '%s has nine distinct fielders and never more than two behind square leg',
    (name) => {
      const field = fieldPositions(name);
      expect(field).toHaveLength(9);
      expect(new Set(FIELDS[name]).size).toBe(9);
      expect(countField(field).behindSquareLeg).toBeLessThanOrEqual(2);
    },
  );

  test('the new-ball field has two out and two close catchers', () => {
    expect(countField(fieldPositions('new-ball'))).toMatchObject({
      outsideCircle: 2,
      closeCatchers: 2,
    });
  });

  test('the spread fields have exactly five out', () => {
    for (const name of ['pace-spread', 'spin-spread', 'death'] as const) {
      expect(countField(fieldPositions(name)).outsideCircle).toBe(5);
    }
  });

  test('a mirrored field counts the same for a left-hander', () => {
    for (const name of Object.keys(FIELDS) as FieldName[]) {
      expect(countField(fieldPositions(name, 'left'), 'left')).toEqual(
        countField(fieldPositions(name)),
      );
    }
  });

  test('a spread field during the powerplay is a fault', () => {
    expect(faultsOf(fieldPositions('pace-spread'), ruleSet('2027-t20'), 0)).toContain(
      'too-many-outside-circle',
    );
    expect(faultsOf(fieldPositions('pace-spread'), ruleSet('2027-t20'), 6)).toEqual([]);
  });

  test.each([
    ['2027-t20', 20],
    ['2027-t20', 5],
    ['1997-odi', 50],
    ['1997-odi', 10],
  ] as const)('the chosen field is legal in every over of %s over %i overs', (id, overs) => {
    const rules = ruleSet(id, overs);
    for (let over = 0; over < overs; over++) {
      for (const bowling of ['pace', 'spin'] as const) {
        const name = chooseField(rules, over, bowling);
        expect(faultsOf(fieldPositions(name), rules, over)).toEqual([]);
      }
    }
  });

  test('fields spread out once the restrictions lift', () => {
    const rules = ruleSet('2027-t20');
    expect(chooseField(rules, 0, 'pace')).toBe('new-ball');
    expect(chooseField(rules, 10, 'pace')).toBe('pace-spread');
    expect(chooseField(rules, 10, 'spin')).toBe('spin-spread');
    expect(chooseField(rules, 19, 'pace')).toBe('death');
  });
});

describe('getting to the ball', () => {
  const field = (name: FieldName): Agent[] =>
    fieldPositions(name).map((point, id) => createAgent(id, point.x, point.z));
  const striker = { x: 0, y: 0.5, z: L - 2 };
  const idOf = (name: FieldName, position: string) =>
    (FIELDS[name] as readonly string[]).indexOf(position);

  test('the predicted path ends at the rope for a well hit ball and reports four or six', () => {
    const along = predictPath(createBall(striker, { x: -30, y: 2, z: -20 }), env);
    expect(along.end).toBe('boundary');
    expect(along.onTheFull).toBe(false);
    const over = predictPath(createBall(striker, { x: 0, y: 22, z: -30 }), env);
    expect(over.end).toBe('boundary');
    expect(over.onTheFull).toBe(true);
  });

  test('a gentle push stops in the infield', () => {
    const path = predictPath(createBall(striker, { x: -6, y: 0, z: -6 }), env);
    expect(path.end).toBe('stopped');
    const last = path.points[path.points.length - 1];
    expect(last && insideCircle(last)).toBe(true);
  });

  test('predicting does not move the ball', () => {
    const ball = createBall(striker, { x: 10, y: 3, z: -15 });
    const before = structuredClone(ball);
    predictPath(ball, env);
    expect(ball).toEqual(before);
  });

  test('a drive towards cover is fielded by cover, with a backup behind', () => {
    const cover = POSITIONS.cover;
    const dx = cover.x - striker.x;
    const dz = cover.z - striker.z;
    const size = Math.hypot(dx, dz);
    const ball = createBall(striker, { x: (dx / size) * 18, y: 0.5, z: (dz / size) * 18 });
    const plan = planFielding(field('new-ball'), predictPath(ball, env));
    expect(plan.primary?.fielder).toBe(idOf('new-ball', 'cover'));
    expect(plan.primary?.kind).toBe('ground');
    expect(plan.backup).not.toBeNull();
    expect(plan.backup?.fielder).not.toBe(plan.primary?.fielder);
  });

  test('a ball in the air to a fielder is a catch', () => {
    const target = POSITIONS['mid-off'];
    const flight = 2.2;
    const ball = createBall(striker, {
      x: (target.x - striker.x) / flight,
      y: 10.6,
      z: (target.z - striker.z) / flight,
    });
    const plan = planFielding(field('new-ball'), predictPath(ball, env));
    expect(plan.primary?.kind).toBe('catch');
    expect(plan.primary?.fielder).toBe(idOf('new-ball', 'mid-off'));
  });

  test('nobody can reach a ball hit hard into a gap before the rope', () => {
    const ball = createBall(striker, { x: 30, y: 1, z: 14 }); // square on the leg side with the field up
    const path = predictPath(ball, env);
    expect(path.end).toBe('boundary');
    expect(planFielding(field('new-ball'), path).primary).toBeNull();
  });

  test('a faster fielder can reach a ball a slower one cannot', () => {
    const ball = createBall(striker, { x: -14, y: 0.3, z: -3 });
    const path = predictPath(ball, env);
    const slow = createAgent(1, -20, L - 30, { pace: 0, agility: 0, hands: 0.5, arm: 0.5 });
    const quick = createAgent(2, -20, L - 30, { pace: 1, agility: 1, hands: 0.5, arm: 0.5 });
    const a = interceptionFor(slow, path);
    const b = interceptionFor(quick, path);
    expect(b).not.toBeNull();
    expect(a === null || a.time > (b?.time ?? 0)).toBe(true);
  });

  test('a fielder sent to the interception point is there when the ball arrives', () => {
    const ball = createBall(striker, { x: -9, y: 0.4, z: -13 });
    const fielders = field('new-ball');
    const plan = planFielding(fielders, predictPath(ball, env));
    const chosen = fielders.find((agent) => agent.id === plan.primary?.fielder);
    if (!plan.primary || !chosen) throw new Error('expected someone to field it');
    sendTo(chosen, plan.primary.point);
    for (let i = 0; i < Math.round(plan.primary.time / SIM_DT); i++) stepAgent(chosen, SIM_DT);
    expect(distance(chosen.pos, plan.primary.point)).toBeLessThan(1.6);
  });
});
