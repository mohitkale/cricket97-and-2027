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

  // With ?capture=1 the harness drives renderAt itself. Otherwise show a fixed time, or play
  // with a transport bar.
  if (!params.has('capture')) {
    void handle.ready.then(() => {
      if (fixedTime !== null) {
        handle.renderAt(Number(fixedTime));
        return;
      }
      // Transport: pause, scrub and slow motion for every scene.
      const bar = document.createElement('div');
      bar.style.cssText =
        'position:fixed;left:8px;right:8px;bottom:4px;display:flex;gap:8px;align-items:center;font:12px ui-monospace,monospace';
      bar.innerHTML =
        '<button id="lab-play">pause</button>' +
        `<input id="lab-scrub" type="range" min="0" max="${handle.duration}" step="0.001" style="flex:1" />` +
        '<select id="lab-speed"><option>1</option><option>0.5</option><option>0.25</option><option>0.1</option></select>' +
        '<span id="lab-time"></span>';
      document.body.append(bar);
      const play = bar.querySelector('#lab-play') as HTMLButtonElement;
      const scrub = bar.querySelector('#lab-scrub') as HTMLInputElement;
      const speed = bar.querySelector('#lab-speed') as HTMLSelectElement;
      const readout = bar.querySelector('#lab-time') as HTMLElement;
      let playing = true;
      let t = 0;
      let last = performance.now();
      play.onclick = () => {
        playing = !playing;
        play.textContent = playing ? 'pause' : 'play';
      };
      scrub.oninput = () => {
        playing = false;
        play.textContent = 'play';
        t = Number(scrub.value);
      };
      const tick = (now: number) => {
        if (playing) t = (t + ((now - last) / 1000) * Number(speed.value)) % handle.duration;
        last = now;
        scrub.value = String(t);
        readout.textContent = `${t.toFixed(3)} / ${handle.duration.toFixed(2)} s`;
        handle.renderAt(t);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
}
