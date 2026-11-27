/** Sample warmed animation runtime allocations in local Chromium for issue #20. */
import { chromium } from 'playwright-core';
import { createServer } from 'vite';
import type { AnimatorInput } from '../../src/anim/animator';

declare global {
  interface Window {
    runAnimationFrames: (count: number) => void;
  }
}

const MODES = ['stance', 'walking', 'external-bat'] as const;
const WARMUP_BATCHES = 5;
const WARMUP_FRAMES = 20_000;
const SAMPLE_FRAMES = 4_000;
const SAMPLING_INTERVAL = 256;

const server = await createServer({
  server: { host: '127.0.0.1', port: 0 },
  logLevel: 'error',
});
await server.listen();
try {
  const address = server.httpServer?.address();
  if (!address || typeof address === 'string') throw new Error('Lab listener missing');
  const browser = await chromium.launch({
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${address.port}/lab/?scene=anim&capture=1`);
    await page.evaluate(() => window.__lab?.ready);
    const devtools = await page.context().newCDPSession(page);

    for (const mode of MODES) {
      await page.evaluate(async (mode) => {
        // Resolve the lab's Vite modules inside Chromium.
        const paths = {
          animator: '/src/anim/animator.ts',
          clips: '/src/anim/clips.ts',
          assets: '/src/render/assets.ts',
        };
        const [{ Animator }, { markClip }, { loadClips, loadModel }] = (await Promise.all([
          import(paths.animator),
          import(paths.clips),
          import(paths.assets),
        ])) as [
          typeof import('../../src/anim/animator'),
          typeof import('../../src/anim/clips'),
          typeof import('../../src/render/assets'),
        ];
        const [root, stanceClips, gaits, equipment] = await Promise.all([
          loadModel('characters/base-body.glb'),
          loadClips('clips/batting-stance.glb'),
          loadClips('clips/ual2-locomotion.glb'),
          loadModel('equipment/bat.glb'),
        ]);
        const stance = stanceClips[0];
        const gait = gaits.find(({ name }) => name === 'Walk_Carry_Loop');
        const bat = equipment.getObjectByName('bat');
        const socket = root.getObjectByName('socket_bat');
        if (!stance || !gait || !bat || !socket) throw new Error('Animation fixture missing');

        const walk = mode === 'walking';
        const markedGait = markClip(gait, root);
        const animator = new Animator(root, markClip(stance, root), walk ? [markedGait] : []);
        const input: AnimatorInput = {
          speed: walk ? markedGait.stride : 0,
          lookTarget: walk ? root.position.clone().set(0.5, 1.5, 5) : null,
          bat: walk ? null : bat,
        };
        if (mode === 'stance') socket.add(bat);
        if (mode === 'external-bat') {
          animator.update(0, { ...input, bat: null });
          socket.getWorldPosition(bat.position);
          socket.getWorldQuaternion(bat.quaternion);
          bat.position.y += 0.035;
          bat.position.z -= 0.025;
        }

        window.runAnimationFrames = (count) => {
          for (let frame = 0; frame < count; frame++) {
            if (input.lookTarget) {
              root.position.z += input.speed / 60;
              input.lookTarget.z = root.position.z + 5;
            }
            animator.update(1 / 60, input);
          }
        };
      }, mode);

      const advance = (count: number) => page.evaluate((n) => window.runAnimationFrames(n), count);
      for (let batch = 0; batch < WARMUP_BATCHES; batch++) await advance(WARMUP_FRAMES);
      await devtools.send('HeapProfiler.startSampling', {
        samplingInterval: SAMPLING_INTERVAL,
        includeObjectsCollectedByMajorGC: true,
        includeObjectsCollectedByMinorGC: true,
      });
      await advance(SAMPLE_FRAMES);
      const { profile } = await devtools.send('HeapProfiler.stopSampling');

      // Include library calls made by our IK. The mixer's track evaluation is separate.
      const runtimeBytes = (node: typeof profile.head, underIk = false): number => {
        const url = new URL(node.callFrame.url || 'about:blank').pathname;
        const usingIk = underIk || url === '/src/anim/ik.ts';
        const ownBytes = usingIk || url.startsWith('/src/anim/') ? node.selfSize : 0;
        return node.children.reduce(
          (total, child) => total + runtimeBytes(child, usingIk),
          ownBytes,
        );
      };
      console.log(
        `${mode}: ${runtimeBytes(profile.head)} sampled runtime bytes / ${SAMPLE_FRAMES} frames`,
      );
    }
  } finally {
    await browser.close();
  }
} finally {
  await server.close();
}
