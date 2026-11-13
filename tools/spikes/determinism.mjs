// Spike for issue #9: does the ball integrator produce the same bits in every engine?
// Run: node tools/spikes/determinism.mjs   (needs: npx playwright-core install chromium-headless-shell firefox webkit)
import { createHash } from 'node:crypto';
import { chromium, firefox, webkit } from 'playwright-core';
import { createServer } from 'vite';
import { ballFingerprint } from '../../src/sim/ball/fingerprint.ts';

const digest = (hex) => createHash('sha256').update(hex).digest('hex').slice(0, 16);
const expected = ballFingerprint();
console.log(`node ${process.version}`.padEnd(28), digest(expected));

const server = await createServer({ server: { port: 0, host: '127.0.0.1' }, logLevel: 'error' });
await server.listen();
const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
let failed = false;
for (const [name, engine] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
  let browser;
  try {
    browser = await engine.launch();
  } catch {
    console.log(name.padEnd(28), 'not installed, skipped');
    continue;
  }
  const page = await browser.newPage();
  await page.goto(`${origin}/lab/`);
  const hex = await page.evaluate(async () => (await import('/src/sim/ball/fingerprint.ts')).ballFingerprint());
  const same = hex === expected;
  failed ||= !same;
  console.log(`${name} ${browser.version()}`.padEnd(28), digest(hex), same ? 'identical' : 'DIFFERENT');
  await browser.close();
}
await server.close();
process.exit(failed ? 1 : 0);
