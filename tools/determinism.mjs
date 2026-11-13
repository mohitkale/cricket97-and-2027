// Checks that the simulation computes exactly the same numbers in every JavaScript engine.
// Run: npm run determinism
// Needs: npx playwright-core install chromium-headless-shell firefox webkit
import { createHash } from 'node:crypto';
import { chromium, firefox, webkit } from 'playwright-core';
import { createServer } from 'vite';
import { simFingerprints } from '../src/sim/fingerprint.ts';

const digest = (prints) =>
  Object.entries(prints)
    .map(([name, value]) => `${name} ${createHash('sha256').update(value).digest('hex').slice(0, 12)}`)
    .join('  ');
const expected = simFingerprints();
console.log(`node ${process.version}`.padEnd(26), digest(expected));

const server = await createServer({ server: { port: 0, host: '127.0.0.1' }, logLevel: 'error' });
await server.listen();
const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
let failed = false;
let compared = 0;
for (const [name, engine] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
  let browser;
  try {
    browser = await engine.launch();
  } catch {
    console.log(name.padEnd(26), 'not installed, skipped');
    continue;
  }
  const page = await browser.newPage();
  await page.goto(`${origin}/lab/`);
  const prints = await page.evaluate(async () => (await import('/src/sim/fingerprint.ts')).simFingerprints());
  const different = Object.keys(expected).filter((key) => prints[key] !== expected[key]);
  failed ||= different.length > 0;
  compared += 1;
  console.log(
    `${name} ${browser.version()}`.padEnd(26),
    digest(prints),
    different.length ? `DIFFERENT: ${different.join(', ')}` : 'identical',
  );
  await browser.close();
}
await server.close();
if (compared === 0) console.log('No browser engines installed; nothing was compared.');
process.exit(failed || compared === 0 ? 1 : 0);
