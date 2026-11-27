import { PerspectiveCamera, Quaternion, Scene, Vector3, WebGLRenderer } from 'three';
import { loadClips, loadModel } from '../../render/assets';
import { createBallView } from '../../render/ball-view';
import { loadCharacter } from '../../render/character';
import { createPaceBowler, PACE_APPROACH } from '../../render/pace-bowler';
import { addSliceGround } from '../../render/slice';
import { createBall, groundEnvironment, stepBall } from '../../sim/ball/ball';
import { solveRelease } from '../../sim/ball/release';
import { PITCH, SIM_DT } from '../../sim/units';
import type { LabSceneFactory } from '../scene';

const SLOW = 4;

/** Inspect a fixed simulation flight independently of the bowling animation. */
export const deliveryBall: LabSceneFactory = async ({ stage }) => {
  const params = new URLSearchParams(location.search);
  const withBowler = params.has('bowler');
  const atRelease = withBowler && params.has('release');
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setScissorTest(true);
  stage.append(renderer.domElement);
  const scene = new Scene();
  const [model] = await Promise.all([
    loadModel('equipment/cricket-ball.glb'),
    addSliceGround(scene, renderer),
  ]);
  const view = createBallView(model);
  scene.add(view.root);

  const env = groundEnvironment('hard');
  const from = { x: -0.32, y: 2.11, z: PITCH.poppingCrease };
  const bowler = await (async () => {
    if (!withBowler) return null;
    const [character, gait, action] = await Promise.all([
      loadCharacter(),
      loadClips('clips/ual1-fielding.glb'),
      loadClips('clips/bowling-pace-delivery.glb'),
    ]);
    const jog = gait.find(({ name }) => name === 'Jog_Fwd_Loop');
    const delivery = action.find(({ name }) => name === 'Bowling_Pace_Delivery');
    if (!jog || !delivery) throw new Error('Missing pace bowler clip');
    character.root.traverse((part) => {
      part.castShadow = true;
    });
    scene.add(character.root);
    return createPaceBowler(character, jog, delivery, from);
  })();
  const pace = 138 / 3.6;
  const options = { spin: { x: -31, y: 7, z: 4 }, seamTilt: 0.22 };
  const target = { x: 0.16, z: PITCH.length - 4.8 };
  const release = solveRelease({ from, target, pace, ball: options }, env);
  const ball = createBall(from, release.velocity, options);
  const points = [new Vector3(ball.pos.x, ball.pos.y, ball.pos.z)];
  const rotations = [new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), 0.42)];
  const axis = new Vector3();
  const turn = new Quaternion();
  let firstBounce = 0;
  while (ball.pos.z < PITCH.length + 1.25 && points.length < 360) {
    axis.set(ball.spin.x, ball.spin.y, ball.spin.z);
    const radians = axis.length() * SIM_DT;
    turn.setFromAxisAngle(axis.normalize(), radians);
    rotations.push(rotations[rotations.length - 1]!.clone().premultiply(turn).normalize());
    stepBall(ball, SIM_DT, env);
    points.push(new Vector3(ball.pos.x, ball.pos.y, ball.pos.z));
    if (!firstBounce && ball.bounces) firstBounce = points.length - 1;
  }
  if (!firstBounce) throw new Error('The lab delivery never pitched');
  const last = points.length - 1;
  const approach = bowler ? PACE_APPROACH : 0;
  const duration = atRelease ? 0.5 : (approach + last * SIM_DT) * SLOW;
  const position = new Vector3();
  const hand = new Vector3();
  const hips = new Vector3();
  const releasePoint = new Vector3(from.x, from.y, from.z);
  const orientation = new Quaternion();

  const pitch = new PerspectiveCamera(44, 1, 0.1, 1000);
  pitch.position.set(-24.5, 4.7, PITCH.length * 0.55);
  pitch.lookAt(0, 0.55, PITCH.length * 0.5);
  const close = new PerspectiveCamera(38, 1, 0.05, 1000);
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;top:12px;left:12px;right:12px;display:flex;justify-content:space-between;gap:12px;color:#edf4ec;font:13px ui-monospace,monospace';
  const readout = document.createElement('span');
  const label = document.createElement('label');
  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = params.get('trail') === '1';
  for (const item of [readout, label]) {
    item.style.cssText = 'background:#172925e8;padding:6px 8px;border-radius:4px';
  }
  label.append(toggle, ' Ball trail');
  overlay.append(readout, label);
  stage.append(overlay);

  return {
    duration,
    renderAt(t) {
      const flightTime = atRelease ? 0 : t / SLOW - approach;
      const clock = Math.max(0, Math.min(last, flightTime / SIM_DT));
      const fromIndex = Math.floor(clock);
      const nextIndex = Math.min(last, fromIndex + 1);
      position.lerpVectors(points[fromIndex]!, points[nextIndex]!, clock - fromIndex);
      orientation.slerpQuaternions(rotations[fromIndex]!, rotations[nextIndex]!, clock - fromIndex);
      bowler?.sample(flightTime, hand, hips);
      if (flightTime < 0) position.copy(hand);
      view.setPose(position, orientation, env.surfaceAt(position.x, position.z).height);
      view.setTrail(points, fromIndex, position, toggle.checked && flightTime >= 0);
      if (bowler && flightTime <= 0.16) {
        close.position.set(4.7, 1.65, hips.z + 0.9);
        close.lookAt(hips.x, 1.11, hips.z);
      } else {
        close.position.set(position.x + 1, Math.max(0.38, position.y + 0.28), position.z - 0.44);
        close.lookAt(position.x, position.y - 0.08, position.z);
      }

      const { clientWidth: width, clientHeight: height } = stage;
      renderer.setSize(width, height, false);
      const pitchWidth = Math.round(width * 0.66);
      for (const [camera, left, viewportWidth] of [
        [pitch, 0, pitchWidth],
        [close, pitchWidth, width - pitchWidth],
      ] as const) {
        camera.aspect = viewportWidth / height;
        camera.updateProjectionMatrix();
        renderer.setViewport(left, 0, viewportWidth, height);
        renderer.setScissor(left, 0, viewportWidth, height);
        renderer.render(scene, camera);
      }
      const phase =
        flightTime < 0
          ? 'approach'
          : clock === 0
            ? 'release'
            : clock >= firstBounce
              ? 'after bounce'
              : 'in flight';
      readout.textContent = `138 km/h · ${flightTime.toFixed(3)} s · ${phase} · ¼ speed`;
      if (atRelease)
        readout.textContent += ` · hand to ball ${(hand.distanceTo(releasePoint) * 100).toFixed(2)} cm`;
    },
    dispose() {
      view.dispose();
      renderer.dispose();
      overlay.remove();
    },
  };
};
