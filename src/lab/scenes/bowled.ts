import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { loadModel } from '../../render/assets';
import { addSliceGround } from '../../render/slice';
import { groundEnvironment } from '../../sim/ball/ball';
import { ASSIST } from '../../sim/contact/strokes';
import { Rng } from '../../sim/core/prng';
import { type DeliveryResult, playDelivery } from '../../sim/match/delivery';
import { standardTeam } from '../../sim/match/players';
import { BALL, GRAVITY, PITCH } from '../../sim/units';
import type { LabSceneFactory } from '../scene';

/** The first seed, counting up, whose straight ball beats a mistimed drive and hits the stumps. */
function bowledDelivery(): { seed: number; result: DeliveryResult } {
  const batters = standardTeam(1);
  const fielders = standardTeam(2);
  const [striker, nonStriker] = batters;
  const bowler = fielders[9]?.bowling;
  if (!striker || !nonStriker || !bowler) throw new Error('standard team is incomplete');
  for (let seed = 0; seed < 500; seed++) {
    const result = playDelivery({
      bowler,
      intent: { line: 0, length: 5, kmh: 136, swing: 0, turn: 0 },
      batting: {
        stroke: 'straight-drive',
        lofted: false,
        timingError: 0.13,
        assist: ASSIST.pro,
        power: 0.8,
        misread: { x: 0, y: 0 },
      },
      striker,
      nonStriker,
      fieldingTeam: fielders,
      bowlerIndex: 9,
      field: 'pace-spread',
      env: groundEnvironment('hard'),
      ballAge: 5,
      random: new Rng(seed).stream('delivery'),
    });
    if (result.wicketBroken) return { seed, result };
  }
  throw new Error('no bowled delivery in 500 seeds');
}

/**
 * The slice ground (issue #26) and a bowled ball decided by the sim. Left: side-on from the
 * off side. Right: from behind the bowler's line, close to the striker's wicket. The ball's
 * last flight is drawn from the sim's impact point and velocity; the stumps and bails react
 * to the sim's wicket-break event. The readout gives draw calls and triangles for one view.
 */
export const bowled: LabSceneFactory = async ({ stage }) => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setScissorTest(true);
  renderer.info.autoReset = false;
  stage.append(renderer.domElement);
  const scene = new Scene();
  const ground = await addSliceGround(scene, renderer);
  const ball = await loadModel('equipment/cricket-ball.glb');
  ball.traverse((node) => {
    node.castShadow = true;
  });
  scene.add(ball);
  const { seed, result } = bowledDelivery();
  const hit = result.wicketBroken;
  if (!hit) throw new Error('unreachable');

  const label = document.createElement('p');
  label.style.cssText =
    'position:fixed;left:12px;bottom:28px;margin:0;font:13px ui-monospace,monospace;color:#10161a';
  stage.append(label);

  const side = new PerspectiveCamera(30, 1, 0.1, 1000);
  side.position.set(-4.5, 0.9, PITCH.length + 0.6);
  side.lookAt(0, 0.45, PITCH.length + 0.6);
  const behind = new PerspectiveCamera(35, 1, 0.1, 1000);
  behind.position.set(0.9, 1.1, PITCH.length - 2.4);
  behind.lookAt(0, 0.45, PITCH.length + 0.4);

  // Shown at a quarter of real speed: at 110 km/h the ball crosses the side view in 0.1 s.
  const SLOW = 4;
  const breakAt = 0.3;
  const duration = 2;
  return {
    duration,
    renderAt(t) {
      const since = (t - breakAt) / SLOW;
      ground.breakWicket(since >= 0 ? hit : null, since);
      // The ball: on its sim path into the stumps, then on through at reduced pace.
      const v =
        since < 0 ? hit.vel : { x: hit.vel.x * 0.5, y: hit.vel.y * 0.5, z: hit.vel.z * 0.5 };
      ball.position.set(
        hit.at.x + v.x * since,
        Math.max(BALL.radius, hit.at.y + v.y * since - 0.5 * GRAVITY * since * since),
        hit.at.z + v.z * since,
      );

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      renderer.setSize(width, height, false);
      const half = Math.floor(width / 2);
      let calls = 0;
      let triangles = 0;
      [side, behind].forEach((camera, i) => {
        camera.aspect = half / height;
        camera.updateProjectionMatrix();
        renderer.setViewport(i * half, 0, half, height);
        renderer.setScissor(i * half, 0, half, height);
        renderer.info.reset();
        renderer.render(scene, camera);
        calls = Math.max(calls, renderer.info.render.calls);
        triangles = Math.max(triangles, renderer.info.render.triangles);
      });
      const kmh = Math.hypot(hit.vel.x, hit.vel.y, hit.vel.z) * 3.6;
      label.textContent =
        `bowled (seed ${seed})  ball at the stumps x ${hit.at.x.toFixed(3)} m, y ${hit.at.y.toFixed(3)} m, ${kmh.toFixed(0)} km/h` +
        `  ${SLOW}x slow, ${since >= 0 ? '+' : ''}${(since * 1000).toFixed(0)} ms from the break  ` +
        `view: ${calls} draw calls, ${(triangles / 1000).toFixed(1)}k triangles`;
    },
    dispose() {
      renderer.dispose();
      label.remove();
    },
  };
};
