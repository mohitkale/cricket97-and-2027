import type { Page } from 'playwright-core';
import { OVER_CLIPS } from '../../src/anim/over-clips.ts';

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

async function startPacePractice(page: Page, advance: (ms: number) => Promise<void>) {
  await advance(50);
  await page.getByRole('button', { name: 'Bowl first ball' }).click();
  await page.evaluate(() => {
    const cue = document.getElementById('cue');
    if (!cue) throw new Error('The practice timing cue did not load');
    const observer = new MutationObserver(() => {
      if (cue.textContent !== 'Play now') return;
      observer.disconnect();
      window.setTimeout(
        () => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' })),
        210,
      );
    });
    observer.observe(cue, { childList: true });
  });
}

async function startBowling(page: Page, advance: (ms: number) => Promise<void>, spin: boolean) {
  if (spin) await page.locator('#delivery-type').selectOption('off-spin');
  await advance(50);
  await page.getByRole('button', { name: 'Start timing' }).click();
  await page.evaluate(() => {
    window.setTimeout(
      () => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' })),
      1130,
    );
  });
}

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

async function startOpeningLineup(
  page: Page,
  advance: (ms: number) => Promise<void>,
  mode: 'Mixed' | 'Female',
): Promise<void> {
  await advance(100);
  await page.locator('#stage-setup').click();
  const dialog = page.getByRole('dialog', { name: 'Match setup' });
  await dialog.locator('.setup-modes label', { hasText: new RegExp(`^${mode}$`) }).click();
  await dialog.locator('#match-overs').selectOption('2');
  await dialog.locator('#match-conditions').selectOption(mode === 'Mixed' ? 'night' : 'day');
  await dialog.getByRole('button', { name: 'Play match' }).click();
  await dialog.waitFor({ state: 'hidden' });
  await page.waitForLoadState('networkidle');
  await advance(200);
  // Keep the pose and opening card in sync from the first frame of the capture.
  await page.locator('.show-opening-lineup').waitFor({ timeout: 10_000 });
  const players = page.locator('.opening-player-labels [data-player-gender]');
  const variants = await players.evaluateAll((rows) =>
    rows.map((row) => row.getAttribute('data-player-gender')),
  );
  if (variants.length !== 3 || new Set(variants).size !== (mode === 'Female' ? 1 : 2)) {
    throw new Error(`Unexpected opening players for ${mode}: ${variants.join(', ')}`);
  }
}

/** Source and fitted clips under review, with lengths in seconds. */
const CLIP_REVIEWS: [string, number][] = [
  ...Object.entries(OVER_CLIPS).map(([name, clip]): [string, number] => [name, clip.duration]),
  ['TreeChopping_Loop', 0.97],
  ['Sword_Attack', 1.53],
  ['Sword_Regular_A', 0.43],
  ['Sword_Regular_B', 0.53],
  ['Sword_Regular_C', 2.0],
  ['Sword_Heavy_Combo', 4.33],
  ['Farm_Harvest', 2.5],
  ['OverhandThrow', 1.33],
  ['Sword_Idle', 1.67],
  ['Idle_Loop', 2.5],
  ['Walk_Loop', 1.3333],
  ['Jog_Fwd_Loop', 0.9333],
  ['Sprint_Loop', 0.6666],
  ['Crouch_Idle_Loop', 2.9333],
  ['Keeper_Ready_Loop', 2.5],
  ['Keeper_Regulation_Take', 0.9],
  ['Bowling_Pace_Delivery', 40 / 30],
  ['capture-OverhandThrow-truth', 1.3],
  ['capture-OverhandThrow-seen', 1.3],
  ['capture-standin-throw-front', 1.3],
  ['capture-standin-throw-side', 1.3],
];

export const SCENARIOS: Record<string, Scenario> = {
  ...Object.fromEntries(
    [false, true].map((spin): [string, Scenario] => [
      spin ? 'bowling-input-spin' : 'bowling-input',
      {
        kind: 'page',
        path: '/play/?role=bowl',
        duration: 3.8,
        viewport: { width: 768, height: 432 },
        seed: 1,
        frameMs: 30,
        setup: (page, advance) => startBowling(page, advance, spin),
      },
    ]),
  ),
  ...Object.fromEntries(
    ['chase', 'dive', 'caught-behind', 'stumping'].map((name): [string, Scenario] => [
      `fielding-${name}`,
      {
        kind: 'lab',
        scene: `fielding-${name}`,
        duration: name === 'chase' ? 4 : 2.1,
        viewport: SMALL_LANDSCAPE,
        seed: 1,
      },
    ]),
  ),
  ...Object.fromEntries(
    [
      ['landscape', { width: 768, height: 432 }],
      ['wide', { width: 800, height: 360 }],
      ['portrait', { width: 390, height: 845 }],
    ].map(([name, viewport]): [string, Scenario] => [
      `pace-practice-${name}`,
      {
        kind: 'page',
        path: '/play/',
        duration: 3.1,
        frameMs: 25,
        viewport: viewport as Viewport,
        seed: 1,
        setup: startPacePractice,
      },
    ]),
  ),
  ...Object.fromEntries(
    CLIP_REVIEWS.map(([name, duration]): [string, Scenario] => [
      `clip-${name}`,
      {
        kind: 'lab',
        scene: `clip-${name}`,
        duration,
        viewport: { width: 720, height: 420 },
        seed: 1,
      },
    ]),
  ),
  'asset-sample': {
    kind: 'lab',
    scene: 'asset-sample',
    duration: 4,
    viewport: PHONE_LANDSCAPE,
    seed: 1,
  },
  anim: {
    kind: 'lab',
    scene: 'anim',
    duration: 3,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'anim-bat': {
    kind: 'lab',
    scene: 'anim&state=bat',
    duration: 3,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'anim-bat-quarter': {
    kind: 'lab',
    scene: 'anim&state=bat&rate=quarter',
    duration: 6.7,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'anim-bat-female-left': {
    kind: 'lab',
    scene: 'anim&state=bat&body=female&hand=left',
    duration: 1.7,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'anim-bat-male': {
    kind: 'lab',
    scene: 'anim&state=bat&body=male',
    duration: 1.7,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'batting-backlift': {
    kind: 'lab',
    scene: 'anim&state=bat&clip=Batting_Backlift&once=1',
    duration: 0.56,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'batting-backlift-quarter': {
    kind: 'lab',
    scene: 'anim&state=bat&clip=Batting_Backlift&once=1&rate=quarter',
    duration: 2.24,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'batting-leave': {
    kind: 'lab',
    scene: 'anim&state=bat&clip=Batting_Leave&once=1',
    duration: 1.12,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'batting-leave-quarter': {
    kind: 'lab',
    scene: 'anim&state=bat&clip=Batting_Leave&once=1&rate=quarter',
    duration: 4.48,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  ...Object.fromEntries(
    [
      ['front-foot-defence', 'Batting_Front_Foot_Defence', 1.55],
      ['cover-drive', 'Batting_Cover_Drive', 1.72],
    ].flatMap(([name, clip, duration]) =>
      [1, 4].map((slow): [string, Scenario] => [
        `batting-${name}${slow === 4 ? '-quarter' : ''}`,
        {
          kind: 'lab',
          scene: `anim&state=bat&clip=${clip}&once=1${slow === 4 ? '&rate=quarter' : ''}`,
          duration: Number(duration) * slow,
          viewport: { width: 960, height: 540 },
          seed: 1,
        },
      ]),
    ),
  ),
  'keeper-ready-quarter': {
    kind: 'lab',
    scene: 'clip-Keeper_Ready_Loop&rate=quarter',
    duration: 10,
    viewport: { width: 720, height: 420 },
    seed: 1,
  },
  'pace-delivery-quarter': {
    kind: 'lab',
    scene: 'clip-Bowling_Pace_Delivery&rate=quarter',
    duration: (40 / 30) * 4,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'keeper-regulation-take-quarter': {
    kind: 'lab',
    scene: 'clip-Keeper_Regulation_Take&rate=quarter',
    duration: 3.6,
    viewport: { width: 720, height: 420 },
    seed: 1,
  },
  'umpire-idle-quarter': {
    kind: 'lab',
    scene: 'clip-Idle_Loop&rate=quarter',
    duration: 10,
    viewport: { width: 720, height: 420 },
    seed: 1,
  },
  'pace-run-up': {
    kind: 'lab',
    scene: 'anim&state=walk&clip=Jog_Fwd_Loop&ball=1',
    duration: 1.2,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'pace-run-up-quarter': {
    kind: 'lab',
    scene: 'anim&state=walk&clip=Jog_Fwd_Loop&ball=1&rate=quarter',
    duration: 4.8,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'anim-sprint': {
    kind: 'lab',
    scene: 'anim&state=walk&clip=Sprint_Loop',
    duration: 1,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  bowled: {
    kind: 'lab',
    scene: 'bowled',
    duration: 2,
    viewport: { width: 960, height: 480 },
    seed: 1,
  },
  character: {
    kind: 'lab',
    scene: 'character',
    duration: 4,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'hero-rig': {
    kind: 'lab',
    scene: 'hero-rig',
    duration: 4,
    viewport: { width: 960, height: 600 },
    seed: 1,
  },
  'hero-field': {
    kind: 'lab',
    scene: 'hero-field',
    duration: 2,
    viewport: PHONE_LANDSCAPE,
    seed: 1,
  },
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
  'delivery-ball': {
    kind: 'lab',
    scene: 'delivery-ball',
    duration: 2.3,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'delivery-ball-trail': {
    kind: 'lab',
    scene: 'delivery-ball&trail=1',
    duration: 2.3,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'pace-bowler-flight': {
    kind: 'lab',
    scene: 'delivery-ball&bowler=1',
    duration: 7.9,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  'pace-sim-release': {
    kind: 'lab',
    scene: 'delivery-ball&bowler=1&release=1',
    duration: 0.5,
    viewport: { width: 960, height: 540 },
    seed: 1,
  },
  ...Object.fromEntries(
    ['clean', 'late', 'edge', 'miss'].map((name): [string, Scenario] => [
      `bat-contact-${name}`,
      {
        kind: 'lab',
        scene: `bat-contact&case=${name}`,
        duration: 2.92,
        viewport: { width: 900, height: 510 },
        seed: 1,
      },
    ]),
  ),
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
  'legacy-2027-bowler-end': {
    kind: 'page',
    path: '/legacy/?era=2027',
    duration: 7,
    viewport: { width: 768, height: 432 },
    frameMs: 100,
    seed: 7,
    async setup(page, advance) {
      await startLegacyMatch(page, advance);
      await page.locator('#fullscreen').click();
      await advance(50);
      if (!(await page.evaluate(() => document.fullscreenElement?.id === 'stage'))) {
        throw new Error('The match stage did not enter fullscreen');
      }
      await page.evaluate(() => {
        const score = document.getElementById('broadcast-score');
        if (!score) throw new Error('The match scoreboard did not load');
        const observer = new MutationObserver(() => {
          const cue = document.getElementById('batting-cue');
          const play = document.querySelector<HTMLButtonElement>('#stage-controls [data-assisted]');
          if (!cue || cue.hidden || cue.textContent !== 'HIT NOW' || !play || play.disabled) return;
          observer.disconnect();
          play.click();
        });
        observer.observe(score, { subtree: true, childList: true, attributes: true });
      });
      // The seeded toss may put the human side in the field. Start that delivery too.
      const bowl = page.locator('#stage-controls [data-assisted]', { hasText: 'BOWL GOOD LENGTH' });
      if ((await bowl.count()) && (await bowl.isEnabled())) await bowl.dispatchEvent('click');
    },
  },
  'legacy-2027-live-outfield': {
    kind: 'page',
    path: '/legacy/?era=2027',
    duration: 3.2,
    viewport: { width: 940, height: 528 },
    frameMs: 100,
    seed: 7,
    async setup(page, advance) {
      await startOpeningLineup(page, advance, 'Mixed');
      await page.getByRole('button', { name: 'Skip intro' }).click();
      await advance(200);
      const stage = page.locator('#stage');
      const counts = async () =>
        (await stage.getAttribute('data-shared-fielders'))?.split('/').map(Number) ?? [];
      const [active, , male, female] = await counts();
      if (active !== 9 || !male || !female) throw new Error('Mixed outfield must show both bodies');
      await page.locator('#fullscreen').click();
      await advance(100);
      const assisted = page.locator('#stage-controls [data-assisted]');
      let chased = false;
      for (let step = 0; step < 80 && !chased; step++) {
        if ((await assisted.count()) && (await assisted.isEnabled())) {
          const label = (await assisted.textContent())?.trim();
          const cue = (await page.locator('#batting-cue').textContent())?.trim();
          if (label === 'BOWL GOOD LENGTH' || (label === 'PLAY SHOT' && cue === 'HIT NOW')) {
            await assisted.dispatchEvent('click');
          }
        }
        await advance(150);
        chased = ((await counts())[1] ?? 0) > 0;
      }
      if (!chased) throw new Error('No authored forward chase during the played delivery');
    },
  },
  'legacy-2027-match-setup': {
    kind: 'page',
    path: '/legacy/?era=2027',
    duration: 1,
    viewport: { width: 390, height: 844 },
    frameMs: 100,
    seed: 7,
    async setup(page, advance) {
      await page.locator('#stage-setup').click();
      const dialog = page.getByRole('dialog', { name: 'Match setup' });
      const play = dialog.getByRole('button', { name: 'Play match' });
      for (const viewport of [
        { width: 1280, height: 720 },
        { width: 390, height: 844 },
      ]) {
        await page.setViewportSize(viewport);
        const box = await play.boundingBox();
        if (!box || box.y < 0 || box.y + box.height > viewport.height) {
          throw new Error('Play match must fit in the initial setup view');
        }
      }
      for (const mode of ['Male', 'Female', 'Mixed']) {
        await dialog.locator('.setup-modes label', { hasText: new RegExp(`^${mode}$`) }).click();
        for (const side of ['home', 'away']) {
          const lineup = dialog.locator(`#${side}-roster .player:not(.reserve)`);
          const genders = await lineup.evaluateAll((rows) =>
            rows.map((row) => row.getAttribute('data-roster-gender')),
          );
          const expected = mode === 'Mixed' ? 2 : 1;
          if (
            genders.length !== 11 ||
            new Set(genders).size !== expected ||
            (expected === 1 && genders[0] !== mode.toLowerCase())
          ) {
            throw new Error(`Invalid ${mode} playing XI for ${side}`);
          }
        }
        await dialog.locator('#match-overs').selectOption('2');
        await play.click();
        await dialog.waitFor({ state: 'hidden' });
        await advance(100);
        if (!(await page.locator('#match-format').textContent())?.includes(`${mode} · 2 overs`)) {
          throw new Error(`The match did not start with the selected ${mode} settings`);
        }
        await page.locator('#newmatch').click();
      }
    },
  },
  'legacy-2027-lineup-mixed': {
    kind: 'page',
    path: '/legacy/?era=2027',
    duration: 3.3,
    viewport: { width: 1024, height: 660 },
    frameMs: 90,
    seed: 7,
    setup: (page, advance) => startOpeningLineup(page, advance, 'Mixed'),
  },
  'legacy-2027-lineup-female': {
    kind: 'page',
    path: '/legacy/?era=2027',
    duration: 3.3,
    viewport: { width: 390, height: 844 },
    frameMs: 90,
    seed: 7,
    setup: (page, advance) => startOpeningLineup(page, advance, 'Female'),
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
