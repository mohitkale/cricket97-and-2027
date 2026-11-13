import type { LabHandle, LabScene } from './scene';
import { SCENES } from './scenes';

declare global {
  interface Window {
    __lab?: LabHandle;
  }
}

const params = new URLSearchParams(location.search);
const name = params.get('scene');
const seed = Number(params.get('seed') ?? 1);
const fixedTime = params.get('t');
const stage = document.querySelector<HTMLElement>('#stage');
const menu = document.querySelector<HTMLElement>('#menu');
if (!stage || !menu) throw new Error('Lab page is missing #stage or #menu');

const factory = name ? SCENES[name] : undefined;

if (!factory) {
  menu.innerHTML = Object.keys(SCENES)
    .map((key) => `<a href="?scene=${key}">${key}</a>`)
    .join('');
} else {
  let scene: LabScene | undefined;
  const handle: LabHandle = {
    duration: 0,
    renderAt: (t) => scene?.renderAt(t),
    ready: Promise.resolve(factory({ stage, seed })).then((created) => {
      scene = created;
      handle.duration = created.duration;
    }),
  };
  window.__lab = handle;

  // With ?capture=1 the harness drives renderAt itself. Otherwise show a fixed time or loop.
  if (!params.has('capture')) {
    void handle.ready.then(() => {
      if (fixedTime !== null) {
        handle.renderAt(Number(fixedTime));
        return;
      }
      const started = performance.now();
      const tick = () => {
        handle.renderAt(((performance.now() - started) / 1000) % handle.duration);
        requestAnimationFrame(tick);
      };
      tick();
    });
  }
}
