import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { returnedWicket, runFrameAt } from '../../game/field-trace';
import { loadClips, loadModel } from '../../render/assets';
import { loadCharacter } from '../../render/character';
import { createRunningBatter } from '../../render/running-batter';
import { addSliceGround } from '../../render/slice';
import { CREASE } from '../../sim/agents/running';
import { runningFixture } from '../field-fixtures';
import type { LabSceneFactory } from '../scene';

export const runningScene =
  (short: boolean): LabSceneFactory =>
  async ({ stage }) => {
    const { field, frames } = runningFixture(short);
    const wicket = returnedWicket(field.wicket);
    if (!wicket || field.wicket?.out !== short) throw new Error('Run-out fixture changed');
    const frame = runFrameAt(field.running, wicket.t).current;
    if (!frame) throw new Error('Missing runner at the wicket break');
    const end = wicket.end ?? 'striker';
    const slot = frame.batters[0].goal === end ? 0 : 1;
    const marker = CREASE[end];
    const renderer = new WebGLRenderer({ antialias: true });
    stage.append(renderer.domElement);
    const scene = new Scene();
    const [character, clips, bat, ball, ground] = await Promise.all([
      loadCharacter(),
      loadClips('clips/over-movement.glb'),
      loadModel('equipment/bat.glb'),
      loadModel('equipment/cricket-ball.glb'),
      addSliceGround(scene, renderer),
    ]);
    const runner = createRunningBatter(character, bat, clips, slot);
    scene.add(runner.root, ball);
    const camera = new PerspectiveCamera(38, 1, 0.05, 150);
    camera.position.set(4.45, 1.45, marker - 1.25);
    camera.lookAt(0.2, 0.58, marker - 0.85);
    const cue = document.createElement('p');
    cue.style.cssText =
      'position:fixed;top:12px;left:12px;background:#173622ec;color:white;padding:6px 10px;font:13px monospace';
    stage.append(cue);
    const toe = new Vector3();
    const direction = end === 'striker' ? 1 : -1;
    const impactAt = 1.35;
    return {
      duration: 2.55,
      renderAt(t) {
        const time = wicket.t + (Math.min(t, impactAt) - impactAt) * 0.42;
        runner.sample(time, field.running);
        const flight = frames.find((item) => item.time >= time) ?? frames.at(-1);
        if (flight) ball.position.set(flight.pos.x, flight.pos.y, flight.pos.z);
        ground.breakWicket(t >= impactAt ? wicket : null, Math.max(0, t - impactAt));
        const { clientWidth: width, clientHeight: height } = stage;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        runner.toe(toe);
        const distance = ((toe.z - marker) * direction * 100).toFixed(1);
        cue.textContent =
          t < impactAt
            ? 'Run-out replay'
            : `${short ? 'Out' : 'Safe'} · bat ${Math.abs(Number(distance)).toFixed(1)} cm ${Number(distance) < 0 ? 'short' : 'past the crease'}`;
        renderer.render(scene, camera);
      },
      dispose() {
        cue.remove();
        renderer.dispose();
      },
    };
  };
