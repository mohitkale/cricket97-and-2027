/**
 * Renderer spike for issue #10. Draws 15, 30, 60 and 120 skinned load dummies with one
 * shadow-casting sun on each back end and reports the time between frames, so the
 * same page gives comparable numbers on a laptop and on phones.
 */
import type { Bone, Camera, Scene } from 'three';
import { createDummyRig, DUMMY } from './dummy';
import { type FrameSummary, summarise } from './stats';

type Three = typeof import('three');
interface GPUDeviceLike {
  queue: { onSubmittedWorkDone(): Promise<void> };
}

type BackEnd = 'webgl2' | 'webgpu' | 'webgpu-renderer-on-webgl2';

interface Renderer {
  domElement: HTMLCanvasElement;
  shadowMap: { enabled: boolean };
  setPixelRatio(ratio: number): void;
  setSize(width: number, height: number, updateStyle?: boolean): void;
  render(scene: Scene, camera: Camera): void;
  dispose(): void;
}

/** Resolves when the GPU has finished everything submitted so far. */
type Finish = () => Promise<void> | void;

const COUNTS = [15, 30, 60, 120];
const WARM_UP_MS = 1000;
const SAMPLE_MS = 4000;

const element = <E extends HTMLElement>(id: string) => {
  const found = document.querySelector<E>(`#${id}`);
  if (!found) throw new Error(`Benchmark page is missing #${id}`);
  return found;
};
const stage = element('stage');
const panel = element('panel');
const status = element('status');
const out = element('out');
const runButton = element<HTMLButtonElement>('run');
const copyButton = element<HTMLButtonElement>('copy');

const print = (line: string) => {
  out.textContent += `${line}\n`;
};
const nextFrame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve));

const pixel = new Uint8Array(4);
/** Reading a pixel back blocks until the GPU has drawn the frame; gl.finish() does not in Chrome. */
function readBack(gl: WebGLRenderingContext | WebGL2RenderingContext | undefined): void {
  gl?.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
}

async function createRenderer(
  backEnd: BackEnd,
): Promise<{ T: Three; renderer: Renderer; finish: Finish } | string> {
  if (backEnd === 'webgl2') {
    const T = await import('three');
    const renderer = new T.WebGLRenderer({ antialias: true });
    return { T, renderer, finish: () => readBack(renderer.getContext()) };
  }
  if (backEnd === 'webgpu' && !('gpu' in navigator))
    return 'WebGPU is not available in this browser';
  const G = await import('three/webgpu');
  const renderer = new G.WebGPURenderer({ antialias: true, forceWebGL: backEnd !== 'webgpu' });
  await renderer.init();
  const backend = renderer.backend as {
    isWebGPUBackend?: boolean;
    device?: GPUDeviceLike;
    gl?: WebGL2RenderingContext;
  };
  const onWebGpu = backend.isWebGPUBackend === true;
  if (backEnd === 'webgpu' && !onWebGpu) {
    renderer.dispose();
    return 'WebGPU did not start (no adapter); the renderer fell back to WebGL2';
  }
  const finish: Finish = () =>
    onWebGpu ? backend.device?.queue.onSubmittedWorkDone() : readBack(backend.gl);
  return { T: G as unknown as Three, renderer: renderer as unknown as Renderer, finish };
}

function buildScene(T: Three) {
  const scene = new T.Scene();
  scene.background = new T.Color('#7fa8c9');
  scene.add(new T.HemisphereLight('#ffffff', '#4a6b3a', 1.2));
  const sun = new T.DirectionalLight('#ffffff', 2.5);
  sun.position.set(6, 12, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -16,
    right: 16,
    top: 16,
    bottom: -16,
    near: 1,
    far: 40,
  });
  scene.add(sun);

  const ground = new T.Mesh(
    new T.PlaneGeometry(60, 60),
    new T.MeshStandardMaterial({ color: '#3f7d45', roughness: 0.9 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // A 1024 px texture so the material samples something of the size a kit will use.
  const size = 1024;
  const pixels = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const stripe = ((i % size) >> 5) % 2 === 0;
    pixels.set(stripe ? [236, 236, 228, 255] : [40, 90, 170, 255], i * 4);
  }
  const map = new T.DataTexture(pixels, size, size);
  map.colorSpace = T.SRGBColorSpace;
  map.generateMipmaps = true;
  map.minFilter = T.LinearMipmapLinearFilter;
  map.needsUpdate = true;
  const material = new T.MeshStandardMaterial({ map, roughness: 0.7 });

  const rig = createDummyRig(T);
  const dummies: { mesh: InstanceType<Three['SkinnedMesh']>; bones: Bone[] }[] = [];
  const most = COUNTS[COUNTS.length - 1] ?? 0;
  const columns = 15;
  for (let i = 0; i < most; i++) {
    const bones = rig.createBones();
    const mesh = new T.SkinnedMesh(rig.geometry, material);
    const root = bones[0];
    if (root) mesh.add(root);
    mesh.bind(new T.Skeleton(bones));
    mesh.castShadow = true;
    mesh.frustumCulled = false;
    mesh.position.set(((i % columns) - (columns - 1) / 2) * 1.6, 0, -Math.floor(i / columns) * 2.2);
    scene.add(mesh);
    dummies.push({ mesh, bones });
  }

  const camera = new T.PerspectiveCamera(45, 1, 0.1, 200);
  camera.position.set(0, 7, 15);
  camera.lookAt(0, 0.9, -7);

  /** Bend every bone a little, differently per dummy, so all skeletons are recomputed each frame. */
  const pose = (seconds: number, visible: number) => {
    dummies.forEach(({ mesh, bones }, d) => {
      mesh.visible = d < visible;
      if (!mesh.visible) return;
      for (let b = 1; b < bones.length; b++) {
        const bone = bones[b];
        if (bone) bone.rotation.z = 0.05 * Math.sin(seconds * 3 + d + b * 0.4);
      }
    });
  };
  return { scene, camera, pose };
}

async function measure(backEnd: BackEnd): Promise<void> {
  const created = await createRenderer(backEnd);
  if (typeof created === 'string') {
    print(`${backEnd}: skipped. ${created}`);
    return;
  }
  const { T, renderer, finish } = created;
  const { scene, camera, pose } = buildScene(T);
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  camera.aspect = stage.clientWidth / stage.clientHeight;
  camera.updateProjectionMatrix();
  stage.replaceChildren(renderer.domElement);

  for (const count of COUNTS) {
    status.textContent = `${backEnd}: ${count} characters`;
    const gaps: number[] = [];
    const cpu: number[] = [];
    const work: number[] = [];
    const started = await nextFrame();
    let previous = started;
    for (;;) {
      const now = await nextFrame();
      const sampling = now - started >= WARM_UP_MS;
      if (sampling) gaps.push(now - previous);
      previous = now;
      pose(now / 1000, count);
      const before = performance.now();
      renderer.render(scene, camera);
      const rendered = performance.now();
      await finish();
      if (sampling) {
        cpu.push(rendered - before);
        work.push(performance.now() - before);
      }
      if (now - started >= WARM_UP_MS + SAMPLE_MS) break;
    }
    print(row(backEnd, count, summarise(gaps), summarise(cpu).median, summarise(work)));
  }
  renderer.dispose();
  stage.replaceChildren();
}

/**
 * "work" is render() plus waiting for the GPU to finish: the cost of a frame whatever
 * the display rate. "frame" is the gap between displayed frames, which cannot go below
 * the display's refresh interval and is inflated if the browser throttles the tab.
 */
const row = (
  backEnd: BackEnd,
  count: number,
  frame: FrameSummary,
  cpuMedian: number,
  work: FrameSummary,
) =>
  `${backEnd} | ${count} chars | work median ${work.median} ms, p95 ${work.p95} | cpu ${cpuMedian} ms` +
  ` | frame median ${frame.median} ms, p95 ${frame.p95}, worst ${frame.worst} (${frame.fps} fps)`;

function gpuName(): string {
  const gl = document.createElement('canvas').getContext('webgl2');
  const info = gl?.getExtension('WEBGL_debug_renderer_info');
  return String((gl && info && gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) || 'unknown');
}

runButton.addEventListener('click', async () => {
  runButton.disabled = true;
  copyButton.disabled = true;
  panel.classList.add('running');
  out.textContent = '';
  const ratio = Math.min(devicePixelRatio, 2);
  print(`device: ${navigator.userAgent}`);
  print(`gpu: ${gpuName()}`);
  print(
    `canvas: ${Math.round(stage.clientWidth * ratio)} x ${Math.round(stage.clientHeight * ratio)} px (pixel ratio ${ratio})`,
  );
  print(
    `each character: ${DUMMY.triangles} triangles, ${DUMMY.bones} bones; one 2048 px shadow map`,
  );
  try {
    for (const backEnd of ['webgl2', 'webgpu', 'webgpu-renderer-on-webgl2'] as const) {
      await measure(backEnd);
    }
    status.textContent = 'Done. Press Copy results and paste them into the pull request.';
  } catch (error) {
    print(`stopped: ${error instanceof Error ? error.message : String(error)}`);
    status.textContent = 'The benchmark stopped early. Copy what is below.';
  }
  panel.classList.remove('running');
  runButton.disabled = false;
  copyButton.disabled = false;
});

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(out.textContent ?? '');
  copyButton.textContent = 'Copied';
});
