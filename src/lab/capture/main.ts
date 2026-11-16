/**
 * Turns a video of a person into pose landmarks for src/anim/retarget.ts (decision 0003).
 * Development only: it saves through the dev server into assets/src/capture/.
 *
 *   /lab/capture.html                      pick a video file
 *   /lab/capture.html?video=/path.mp4      a video the dev server can serve
 *   /lab/capture.html?clip=OverhandThrow   validation: render a library clip, then save both
 *                                          the true landmarks and what the pose model sees
 */
import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision';
import {
  AmbientLight,
  AnimationMixer,
  Color,
  DirectionalLight,
  type Object3D,
  PerspectiveCamera,
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { LANDMARK_COUNT, type LandmarkFrame, landmarksFromPose } from '../../anim/retarget';
import { loadClips, loadModel } from '../../render/assets';
import { CANDIDATE_CLIPS } from '../scenes/clip-review';

const FPS = 30;
const MODEL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task';
const WASM = '/node_modules/@mediapipe/tasks-vision/wasm';

declare global {
  interface Window {
    __capture?: { done: Promise<string> };
  }
}

const element = <E extends HTMLElement>(id: string) => {
  const found = document.querySelector<E>(`#${id}`);
  if (!found) throw new Error(`Capture page is missing #${id}`);
  return found;
};
const status = element('status');
const view = element('view');
const say = (text: string) => {
  status.textContent = text;
};

async function createLandmarker(): Promise<PoseLandmarker> {
  say('Loading the pose model…');
  const fileset = await FilesetResolver.forVisionTasks(WASM);
  return PoseLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: MODEL, delegate: 'CPU' },
    runningMode: 'VIDEO',
    numPoses: 1,
  });
}

/** One frame of landmarks in the retargeter's convention (Y up, facing +Z), or undefined if nobody was found. */
function detect(
  landmarker: PoseLandmarker,
  image: TexImageSource,
  t: number,
): number[] | undefined {
  const found = landmarker.detectForVideo(image, Math.round(t * 1000)).worldLandmarks[0];
  if (!found || found.length < LANDMARK_COUNT) return undefined;
  return found
    .slice(0, LANDMARK_COUNT)
    .flatMap((mark) => [mark.x, -mark.y, -mark.z, mark.visibility ?? 0]);
}

async function save(name: string, source: string, frames: LandmarkFrame[]): Promise<void> {
  const rounded = frames.map(({ t, points }) => ({
    t: Math.round(t * 1e4) / 1e4,
    points: points.map((value) => Math.round(value * 1e4) / 1e4),
  }));
  const response = await fetch(`/__capture/save?name=${encodeURIComponent(name)}`, {
    method: 'POST',
    body: JSON.stringify({ source, fps: FPS, frames: rounded }),
  });
  if (!response.ok) throw new Error(`Could not save ${name}: ${await response.text()}`);
}

async function captureVideo(url: string, name: string, source: string): Promise<string> {
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.src = url;
  view.replaceChildren(video);
  await new Promise<void>((resolve, reject) => {
    video.onloadeddata = () => resolve();
    video.onerror = () => reject(new Error('The video could not be read'));
  });
  const landmarker = await createLandmarker();
  const frames: LandmarkFrame[] = [];
  let missed = 0;
  const total = Math.floor(video.duration * FPS);
  for (let i = 0; i < total; i++) {
    const t = i / FPS;
    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve();
      video.currentTime = t;
    });
    const points = detect(landmarker, video, t);
    if (points) frames.push({ t, points });
    else missed++;
    say(`Frame ${i + 1} of ${total}`);
  }
  if (frames.length === 0) throw new Error('No person was found in any frame');
  await save(name, source, frames);
  return `Saved assets/src/capture/${name}.json: ${frames.length} frames, ${missed} with no person found.`;
}

/** Validation: the pose model looks at a rendered clip whose true joint positions are known. */
async function captureClip(clipName: string): Promise<string> {
  const file = CANDIDATE_CLIPS[clipName];
  if (!file) throw new Error(`Unknown clip ${clipName}`);
  const [model, clips] = await Promise.all([
    loadModel('characters/mannequin.glb'),
    loadClips(file),
  ]);
  const clip = clips.find((candidate) => candidate.name === clipName);
  if (!clip) throw new Error(`${file} has no clip ${clipName}`);

  const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(720, 720, false);
  view.replaceChildren(renderer.domElement);
  const scene = new Scene();
  scene.background = new Color('#cfd6da');
  scene.add(new AmbientLight('#ffffff', 1.6));
  const sun = new DirectionalLight('#ffffff', 2);
  sun.position.set(1, 3, 4);
  scene.add(sun, model);
  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 1, 4.6);
  camera.lookAt(0, 0.95, 0);

  const bones = new Map<string, Object3D>();
  model.traverse((node) => bones.set(node.name, node));
  const jointPosition = (name: string) => {
    const bone = bones.get(name);
    if (!bone) throw new Error(`The mannequin has no joint ${name}`);
    return bone.getWorldPosition(new Vector3());
  };
  const headRotation = () =>
    bones.get('Head')?.getWorldQuaternion(new Quaternion()) ?? new Quaternion();
  model.updateMatrixWorld(true);
  const restHead = headRotation();

  const mixer = new AnimationMixer(model);
  mixer.clipAction(clip).play();
  const landmarker = await createLandmarker();
  const truth: LandmarkFrame[] = [];
  const seen: LandmarkFrame[] = [];
  const total = Math.floor(clip.duration * FPS);
  for (let i = 0; i < total; i++) {
    const t = i / FPS;
    mixer.setTime(t);
    model.updateMatrixWorld(true);
    renderer.render(scene, camera);
    truth.push({ t, points: landmarksFromPose(jointPosition, headRotation(), restHead) });
    const points = detect(landmarker, renderer.domElement, t);
    if (points) seen.push({ t, points });
    say(`Frame ${i + 1} of ${total}`);
  }
  await save(`${clipName}-truth`, `True joint positions of the library clip ${clipName}`, truth);
  await save(
    `${clipName}-seen`,
    `Pose model looking at a front render of the library clip ${clipName}`,
    seen,
  );
  return `Saved ${clipName}-truth (${truth.length} frames) and ${clipName}-seen (${seen.length} frames).`;
}

function run(job: Promise<string>): void {
  window.__capture = {
    done: job.then(
      (message) => {
        say(message);
        return message;
      },
      (error: unknown) => {
        const message = `Failed: ${error instanceof Error ? error.message : String(error)}`;
        say(message);
        return message;
      },
    ),
  };
}

const params = new URLSearchParams(location.search);
const clipParam = params.get('clip');
const videoParam = params.get('video');
const nameOf = () => element<HTMLInputElement>('name').value.trim();
if (clipParam) run(captureClip(clipParam));
else if (videoParam) run(captureVideo(videoParam, params.get('name') ?? 'capture', videoParam));

element('go').addEventListener('click', () => {
  const file = element<HTMLInputElement>('file').files?.[0];
  if (!file) return say('Pick a video file first.');
  run(captureVideo(URL.createObjectURL(file), nameOf(), `Video file ${file.name}`));
});
