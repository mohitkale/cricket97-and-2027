import type { Page } from 'playwright-core';

export interface Viewport {
  width: number;
  height: number;
}

interface ScenarioBase {
  /** Seconds of scene time covered by the capture. */
  duration: number;
  viewport: Viewport;
  seed: number;
}

/** A scene from src/lab, addressed by name. Rendered by calling renderAt(t). */
export interface LabScenario extends ScenarioBase {
  kind: 'lab';
  scene: string;
}

/** An ordinary page driven under virtual time: used for the prototype. */
export interface PageScenario extends ScenarioBase {
  kind: 'page';
  path: string;
  /** Milliseconds of virtual time per animation frame. Larger is faster to capture. */
  frameMs: number;
  /** Bring the page to the moment the capture should start. */
  setup(page: Page, advance: (ms: number) => Promise<void>): Promise<void>;
}

export type Scenario = LabScenario | PageScenario;

const PHONE_LANDSCAPE: Viewport = { width: 844, height: 390 };
/** Small on purpose: the prototype renders in software here, and every virtual frame is drawn. */
const SMALL_LANDSCAPE: Viewport = { width: 640, height: 360 };

/** Click a visible button whose text matches, waiting in real time for it to appear. */
async function press(page: Page, text: RegExp): Promise<void> {
  await page.locator('button:visible', { hasText: text }).first().click({ timeout: 20_000 });
}

/**
 * Take the prototype from page load to the first delivery of a match, batting first.
 * Real-time pauses let network and WebAssembly loading finish; virtual time only moves
 * by fixed amounts, so the game state at the first captured frame is the same every run.
 */
async function startLegacyMatch(page: Page, advance: (ms: number) => Promise<void>): Promise<void> {
  const settle = () => page.waitForTimeout(1500);
  await advance(100);
  await press(page, /SET UP MATCH/);
  await advance(100);
  await page.locator('#start').click({ timeout: 20_000 });
  await settle();
  await advance(300);
  // Each prompt appears only in some flows (toss won or lost, intro on or off).
  for (const prompt of [/heads/i, /^\s*bat/i, /skip intro/i]) {
    const button = page.locator('button:visible', { hasText: prompt }).first();
    if (await button.isVisible()) {
      await button.click();
      await advance(300);
    }
  }
}

export const SCENARIOS: Record<string, Scenario> = {
  'stroke-map': {
    kind: 'lab',
    scene: 'stroke-map',
    duration: 3,
    viewport: { width: 720, height: 720 },
    seed: 1,
  },
  'ball-flight': {
    kind: 'lab',
    scene: 'ball-flight',
    duration: 0.8,
    viewport: PHONE_LANDSCAPE,
    seed: 1,
  },
  'pitch-plan': {
    kind: 'lab',
    scene: 'pitch-plan',
    duration: 2,
    viewport: PHONE_LANDSCAPE,
    seed: 1,
  },
  'legacy-2027-delivery': {
    kind: 'page',
    path: '/legacy/?era=2027',
    duration: 5,
    viewport: SMALL_LANDSCAPE,
    frameMs: 50,
    seed: 7,
    setup: startLegacyMatch,
  },
  'legacy-1997-delivery': {
    kind: 'page',
    path: '/legacy/?era=97',
    duration: 5,
    viewport: SMALL_LANDSCAPE,
    frameMs: 50,
    seed: 7,
    setup: startLegacyMatch,
  },
};
