import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  type Object3D,
  type PerspectiveCamera,
  Plane,
  Raycaster,
  RingGeometry,
  Vector2,
  Vector3,
} from 'three';
import {
  BOWL_TARGET,
  BOWL_TOLERANCE,
  bowlAim,
  bowlMeter,
  GOOD_LENGTH,
  selectBowling,
  type Variation,
} from '../../game/bowling-aim';
import type { PracticeAssist } from '../../game/pace-practice';

export function bindBowlingControls(
  canvas: HTMLCanvasElement,
  camera: PerspectiveCamera,
  pitch: Object3D,
  panel: HTMLElement,
  redraw: () => void,
  release: (delivery: ReturnType<typeof selectBowling>) => void,
) {
  const selector = panel.querySelector<HTMLSelectElement>('select');
  const output = panel.querySelector<HTMLElement>('output');
  if (!selector || !output) throw new Error('Missing bowling controls');
  const variation = selector;
  const meter = output;
  panel.hidden = false;
  const ring = new Mesh(
    new RingGeometry(0.25, 0.52, 36),
    new MeshBasicMaterial({
      color: 0xc5ff42,
      side: DoubleSide,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  ring.rotation.x = -Math.PI / 2 + 0.23;
  pitch.add(ring);
  const uv = new Vector2();
  const target = new Vector3();
  const ray = new Raycaster();
  const ground = new Plane(new Vector3(0, 1, 0), 0);
  let aim = { ...GOOD_LENGTH };
  let started = Number.NaN;
  let assist: PracticeAssist = 'casual';
  let live = false;
  let pointer: number | undefined;

  function setAim(x: number, z: number) {
    aim = bowlAim(x, z);
    ring.position.set(aim.x, 0.13, aim.z);
  }
  setAim(aim.x, aim.z);
  const fromPointer = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    uv.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      1 - ((event.clientY - bounds.top) / bounds.height) * 2,
    );
    ray.setFromCamera(uv, camera);
    if (ray.ray.intersectPlane(ground, target)) {
      setAim(target.x, target.z);
      redraw();
    }
  };
  canvas.addEventListener('pointerdown', (event) => {
    if (live || !event.isPrimary) return;
    pointer = event.pointerId;
    canvas.setPointerCapture(pointer);
    fromPointer(event);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!live && event.pointerId === pointer) fromPointer(event);
  });
  canvas.addEventListener('lostpointercapture', () => {
    pointer = undefined;
  });
  const getMeter = (now: number) => bowlMeter((now - started) / 1000);
  function commit() {
    if (!Number.isFinite(started) || live) return;
    const chosen = selectBowling(
      aim,
      variation.value as Variation,
      getMeter(performance.now()),
      assist,
    );
    started = Number.NaN;
    meter.hidden = true;
    ring.visible = false;
    live = true;
    variation.disabled = true;
    release(chosen);
  }
  window.addEventListener('keydown', (event) => {
    if (
      event.repeat ||
      live ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLButtonElement
    )
      return;
    if (event.code === 'Space') {
      if (Number.isFinite(started)) {
        commit();
        event.preventDefault();
      }
      return;
    }
    const step = event.shiftKey ? 0.28 : 0.1;
    const across = event.code === 'ArrowLeft' ? -step : event.code === 'ArrowRight' ? step : 0;
    const length = event.code === 'ArrowUp' ? 0.36 : event.code === 'ArrowDown' ? -0.36 : 0;
    if (!across && !length) return;
    event.preventDefault();
    setAim(aim.x + across, aim.z + length);
    redraw();
  });

  function render(now: number) {
    if (!Number.isFinite(started)) return;
    const progress = getMeter(now);
    meter.style.setProperty('--position', `${progress * 100}%`);
    meter.dataset.ready = String(Math.abs(progress - BOWL_TARGET) <= BOWL_TOLERANCE[assist]);
    requestAnimationFrame(render);
  }

  return {
    get timing() {
      return Number.isFinite(started);
    },
    press(mode: PracticeAssist) {
      if (Number.isFinite(started)) {
        commit();
        return false;
      }
      assist = mode;
      started = performance.now();
      meter.style.setProperty('--good-start', `${100 * (BOWL_TARGET - BOWL_TOLERANCE[mode])}%`);
      meter.style.setProperty('--good-width', `${200 * BOWL_TOLERANCE[mode]}%`);
      meter.hidden = false;
      render(started);
      return true;
    },
    ready() {
      live = false;
      ring.visible = true;
      variation.disabled = false;
    },
  };
}
