// Spike for issue #9: compare the new ball integrator with the prototype's Rapier setup.
// Run: node tools/spikes/physics-compare.mjs
import { deliveryLaunch } from '../../legacy/src/modern-cricket.js';
import { advanceBall, initPhysics, resetBallPhysics, setBallSpin } from '../../legacy/src/physics.js';
import { createBall, stepBall } from '../../src/sim/ball/ball.ts';

const DT = 1 / 120;
const CREASE_Z = 9.2;
const RELEASE = { x: -0.35, y: 2.1, z: -8.6 };

// The prototype's effective settings: Rapier averages the two colliders' coefficients.
const legacyEnv = {
  gravity: 9.81,
  dragK: 0.0025,
  magnusK: 0.0008,
  radius: 0.036,
  surfaceAt: () => ({ height: 0.12, restitution: (0.48 + 0.58) / 2, friction: (0.03 + 0.12) / 2 }),
};

const deliveries = [];
for (const length of ['Yorker', 'Full', 'Good', 'Short', 'Bouncer']) {
  for (const [travel, line] of [[0.46, 0.15], [0.55, -0.1], [0.66, 0.3], [0.8, 0]]) {
    deliveries.push({ length, travel, line });
  }
}

function track(step, pos, vel) {
  let t = 0;
  let bounce = null;
  for (let i = 0; i < 400 && pos.z < CREASE_Z; i++) {
    const bounced = step();
    t += DT;
    if (bounced && !bounce) bounce = { x: pos.x, z: pos.z };
  }
  return { t, bounce, x: pos.x, y: pos.y, speed: Math.hypot(vel.x, vel.y, vel.z) };
}

await initPhysics({ modern: true });
const rows = [];
for (const d of deliveries) {
  const launch = deliveryLaunch({ release: RELEASE, line: d.line, travel: d.travel, length: d.length });

  resetBallPhysics();
  setBallSpin(launch.spin);
  const lp = { ...RELEASE };
  const lv = { ...launch.velocity };
  let hit = false;
  const legacy = track(() => (hit = advanceBall(lp, lv, DT, hit, { swing: 0, turnVelocity: 0, pitchRestitution: 0.58 })), lp, lv);

  const ball = createBall(RELEASE, launch.velocity, launch.spin);
  const fresh = track(() => (stepBall(ball, DT, legacyEnv), ball.bounces > 0), ball.pos, ball.vel);

  rows.push({
    delivery: `${d.length} ${d.travel}s`,
    'bounce dz cm': ((fresh.bounce.z - legacy.bounce.z) * 100).toFixed(1),
    'crease dy cm': ((fresh.y - legacy.y) * 100).toFixed(1),
    'crease dx cm': ((fresh.x - legacy.x) * 100).toFixed(1),
    'arrival dt ms': ((fresh.t - legacy.t) * 1000).toFixed(0),
    'speed d%': (((fresh.speed - legacy.speed) / legacy.speed) * 100).toFixed(1),
  });
}
console.table(rows);
const worst = (key) => Math.max(...rows.map((r) => Math.abs(Number(r[key])))).toFixed(1);
console.log(`worst: bounce ${worst('bounce dz cm')} cm, height at crease ${worst('crease dy cm')} cm, line ${worst('crease dx cm')} cm, arrival ${worst('arrival dt ms')} ms, speed ${worst('speed d%')} %`);

// Step cost.
const N = 200_000;
let start = performance.now();
const b = createBall(RELEASE, { x: 0, y: 0, z: 30 });
for (let i = 0; i < N; i++) {
  if (i % 200 === 0) Object.assign(b.pos, RELEASE), Object.assign(b.vel, { x: 0, y: 0, z: 30 });
  stepBall(b, DT, legacyEnv);
}
const mine = ((performance.now() - start) / N) * 1000;
start = performance.now();
const p = { ...RELEASE };
const v = { x: 0, y: 0, z: 30 };
for (let i = 0; i < N; i++) {
  if (i % 200 === 0) Object.assign(p, RELEASE), Object.assign(v, { x: 0, y: 0, z: 30 });
  advanceBall(p, v, DT, false, null);
}
const theirs = ((performance.now() - start) / N) * 1000;
console.log(`step cost: integrator ${mine.toFixed(3)} us, prototype Rapier path ${theirs.toFixed(3)} us`);
