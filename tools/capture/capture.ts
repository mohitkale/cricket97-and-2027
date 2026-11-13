/**
 * Capture harness. Renders a named scenario in headless Chromium and writes
 *   captures/<scenario>/sheet.png   a 12-frame contact sheet (deterministic)
 *   captures/<scenario>/clip.webm   a short video of the same frames
 *
 * Usage: npm run capture -- --scenario pitch-plan [--scenario other] [--out captures]
 *        npm run capture -- --list
 */
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { type Browser, chromium, type Page } from 'playwright-core';
import { createServer } from 'vite';
import { SCENARIOS, type Scenario } from './scenarios.ts';
import { installVirtualTime } from './virtual-time.ts';

const SHEET_FRAMES = 12;
const VIDEO_FPS = 12;

interface Frame {
  t: number;
  png: Buffer;
}

/**
 * Screenshot through the DevTools protocol. Playwright's own page.screenshot waits on a
 * real animation frame inside the page, which never arrives once time is virtual.
 */
async function shot(page: Page): Promise<Buffer> {
  const session = await page.context().newCDPSession(page);
  try {
    const { data } = await session.send('Page.captureScreenshot', { format: 'png' });
    return Buffer.from(data, 'base64');
  } finally {
    await session.detach();
  }
}

async function captureFrames(
  browser: Browser,
  origin: string,
  scenario: Scenario,
): Promise<Frame[]> {
  const context = await browser.newContext({ viewport: scenario.viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));

  const count = Math.max(SHEET_FRAMES, Math.round(scenario.duration * VIDEO_FPS));
  const times = Array.from({ length: count }, (_, i) => (scenario.duration * i) / (count - 1));
  const frames: Frame[] = [];

  if (scenario.kind === 'lab') {
    await page.goto(`${origin}/lab/?scene=${scenario.scene}&seed=${scenario.seed}&capture=1`);
    await page.evaluate(() => window.__lab?.ready);
    for (const t of times) {
      await page.evaluate((time) => window.__lab?.renderAt(time), t);
      frames.push({ t, png: await shot(page) });
    }
  } else {
    await page.addInitScript(installVirtualTime, scenario.seed);
    const frameMs = scenario.frameMs;
    const advance = (ms: number) =>
      page.evaluate(([amount, frame]) => window.__vt.advance(amount ?? 0, frame), [ms, frameMs]);
    await page.goto(origin + scenario.path, { waitUntil: 'networkidle' });
    try {
      await scenario.setup(page, advance);
    } catch (error) {
      // Leave evidence of where the page was when the scripted setup got stuck.
      await mkdir('captures', { recursive: true });
      await writeFile('captures/setup-failure.png', await shot(page));
      const buttons = await page.locator('button:visible').allInnerTexts();
      console.error(`Setup failed. Visible buttons: ${buttons.join(' | ')}`);
      console.error(`Page errors: ${errors.join(' | ') || 'none'}`);
      throw error;
    }
    let previous = 0;
    for (const t of times) {
      await advance((t - previous) * 1000);
      previous = t;
      frames.push({ t, png: await shot(page) });
    }
  }

  await context.close();
  if (errors.length) throw new Error(`Page errors during capture:\n${errors.join('\n')}`);
  return frames;
}

/** Lay 12 evenly spaced frames out as a labelled 4 x 3 grid and screenshot it. */
async function contactSheet(browser: Browser, frames: Frame[], title: string): Promise<Buffer> {
  const picks = Array.from({ length: SHEET_FRAMES }, (_, i) => {
    const frame = frames[Math.round((i * (frames.length - 1)) / (SHEET_FRAMES - 1))];
    if (!frame) throw new Error('Not enough frames for a contact sheet');
    return frame;
  });
  const cells = picks
    .map(
      (frame) =>
        `<figure><img src="data:image/png;base64,${frame.png.toString('base64')}"><figcaption>${frame.t.toFixed(2)} s</figcaption></figure>`,
    )
    .join('');
  const page = await browser.newPage({
    viewport: { width: 1640, height: 800 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<style>
      body { margin: 0; padding: 12px; background: #111; color: #ddd; font: 13px monospace; }
      h1 { font-size: 14px; margin: 0 0 10px; }
      main { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
      figure { margin: 0; } img { width: 100%; display: block; } figcaption { padding: 2px 0 0; }
    </style><h1>${title}</h1><main>${cells}</main>`);
  await page.evaluate(() => Promise.all([...document.images].map((image) => image.decode())));
  const sheet = await page.screenshot({ fullPage: true });
  await page.close();
  return sheet;
}

/** Encode the frames as a WebM clip using the browser's own recorder. Not deterministic. */
async function clip(browser: Browser, frames: Frame[], scenario: Scenario): Promise<Buffer> {
  const page = await browser.newPage({ viewport: scenario.viewport });
  const base64 = await page.evaluate(
    async ({ images, width, height, fps }) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const g = canvas.getContext('2d');
      if (!g) throw new Error('no 2d context');
      const recorder = new MediaRecorder(canvas.captureStream(fps), { mimeType: 'video/webm' });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => chunks.push(event.data);
      const stopped = new Promise<void>((done) => {
        recorder.onstop = () => done();
      });
      recorder.start();
      for (const source of images) {
        const image = new Image();
        image.src = source;
        await image.decode();
        g.drawImage(image, 0, 0, width, height);
        await new Promise((next) => setTimeout(next, 1000 / fps));
      }
      recorder.stop();
      await stopped;
      const bytes = new Uint8Array(await new Blob(chunks).arrayBuffer());
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      return btoa(binary);
    },
    {
      images: frames.map((frame) => `data:image/png;base64,${frame.png.toString('base64')}`),
      width: scenario.viewport.width,
      height: scenario.viewport.height,
      fps: VIDEO_FPS,
    },
  );
  await page.close();
  return Buffer.from(base64, 'base64');
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      scenario: { type: 'string', multiple: true },
      out: { type: 'string', default: 'captures' },
      list: { type: 'boolean', default: false },
      'no-video': { type: 'boolean', default: false },
    },
  });
  if (values.list || !values.scenario?.length) {
    console.log(`Scenarios: ${Object.keys(SCENARIOS).join(', ')}`);
    return;
  }

  const server = await createServer({ server: { port: 0, host: '127.0.0.1' }, logLevel: 'error' });
  await server.listen();
  const address = server.httpServer?.address();
  if (!address || typeof address === 'string') throw new Error('Dev server did not start');
  const origin = `http://127.0.0.1:${address.port}`;

  // Software rendering keeps WebGL output identical from run to run on one machine.
  const browser = await chromium.launch({
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  try {
    for (const name of values.scenario) {
      const scenario = SCENARIOS[name];
      if (!scenario) throw new Error(`Unknown scenario "${name}". Try --list.`);
      const started = performance.now();
      const frames = await captureFrames(browser, origin, scenario);
      const sheet = await contactSheet(browser, frames, `${name}  seed ${scenario.seed}`);
      const folder = join(values.out, name);
      await mkdir(folder, { recursive: true });
      await writeFile(join(folder, 'sheet.png'), sheet);
      if (!values['no-video'])
        await writeFile(join(folder, 'clip.webm'), await clip(browser, frames, scenario));
      const hash = createHash('sha256').update(sheet).digest('hex').slice(0, 16);
      const seconds = ((performance.now() - started) / 1000).toFixed(1);
      console.log(
        `${name}: ${frames.length} frames, sheet sha256 ${hash}, ${seconds} s -> ${folder}`,
      );
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

await main();
