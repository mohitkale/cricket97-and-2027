import { Quaternion, Scene, Vector3, WebGLRenderer } from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import {
  type PracticeAssist,
  type PracticeShot,
  practiceArrival,
  practiceClock,
  practiceDelivery,
  practiceGround,
  practiceSwingError,
  practiceWindow,
} from '../../game/pace-practice';
import { bindBattingInput } from '../../platform/batting-input';
import { loadClips, loadModel } from '../../render/assets';
import { createBallView } from '../../render/ball-view';
import { createBatterStroke, STROKE_CLIP_FILES } from '../../render/batter-stroke';
import { asCharacter, attach } from '../../render/character';
import { createFielder, loadFieldingClips } from '../../render/fielding';
import { createPaceBowler, PACE_APPROACH } from '../../render/pace-bowler';
import { createPracticeCamera } from '../../render/practice-camera';
import { addSliceGround } from '../../render/slice';
import type { End } from '../../sim/agents/running';
import { PITCH } from '../../sim/units';
import { createJerseyAtlas, makeJersey } from './lineup-kit';
import { outfieldLod } from './live-fielders';
import { loadPlayerBodies } from './player-bodies';
import './pace-practice.css';

const get = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing practice element ${selector}`);
  return element;
};
const screen = get<HTMLElement>('#practice');
const canvas = get<HTMLCanvasElement>('#pitch');
const next = get<HTMLButtonElement>('#next');
const playShot = get<HTMLButtonElement>('#play-shot');
const assist = get<HTMLSelectElement>('#assist');
const returnEnd = get<HTMLSelectElement>('#return-end');
const trail = get<HTMLInputElement>('#trail');
const cue = get<HTMLElement>('#cue');
const feedback = get<HTMLElement>('#feedback');
const verdict = get<HTMLElement>('#feedback strong');
const meter = get<HTMLMeterElement>('#feedback meter');
const score = get<HTMLElement>('#score');
const overs = get<HTMLElement>('#overs');

const START = 'Bowl first ball';
const SHOW_UNTIL = 1.5;
const query = new URLSearchParams(location.search);
const rosterMode = query.get('mode') ?? 'mixed';
if (matchMedia('(pointer: coarse)').matches)
  get('#help').textContent = 'Swipe to drive · tap to defend · swipe farther to loft';

async function start() {
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35));
  const scene = new Scene();
  const [bodies, jogClips, paceClips, strikeClips, ballAsset, bat, helmet, pads, gloves, ground] =
    await Promise.all([
      loadPlayerBodies(),
      loadClips('clips/ual1-fielding.glb'),
      loadClips('clips/bowling-pace-delivery.glb'),
      Promise.all(STROKE_CLIP_FILES.map(loadClips)),
      loadModel('equipment/cricket-ball.glb'),
      loadModel('equipment/bat.glb'),
      loadModel('equipment/helmet.glb'),
      loadModel('equipment/pads.glb'),
      loadModel('equipment/batting-gloves.glb'),
      addSliceGround(scene, renderer),
    ]);
  const strikerInfo = {
    name: rosterMode === 'male' ? 'Neel Joshi' : 'Avani Joshi',
    team: 'India',
    color: 0x276ed2,
    number: 18,
    gender: rosterMode === 'male' ? 'male' : 'female',
  } as const;
  const bowlerInfo = {
    name: rosterMode === 'female' ? 'Adele Brannigan' : 'Alex Brannigan',
    team: 'Australia',
    color: 0xd4ac2c,
    number: 36,
    gender: rosterMode === 'female' ? 'female' : 'male',
  } as const;
  const atlas = createJerseyAtlas(2);
  atlas.write([strikerInfo, bowlerInfo]);
  const striking = asCharacter(clone(bodies[strikerInfo.gender]));
  const bowling = asCharacter(clone(bodies[bowlerInfo.gender]));
  makeJersey(striking.root, atlas, 0)(strikerInfo);
  makeJersey(bowling.root, atlas, 1)(bowlerInfo);
  attach(striking, 'helmet', helmet);
  for (const name of ['pad_l', 'pad_r'] as const) {
    const pad = pads.getObjectByName(name);
    if (pad) attach(striking, name, pad);
  }
  for (const name of ['glove_l', 'glove_r'] as const) {
    const glove = gloves.getObjectByName(name);
    if (glove) attach(striking, name, glove);
  }
  for (const player of [striking, bowling]) {
    player.root.traverse((part) => {
      part.castShadow = true;
    });
    scene.add(player.root);
  }
  const jog = jogClips.find(({ name }) => name === 'Jog_Fwd_Loop');
  const delivery = paceClips.find(({ name }) => name === 'Bowling_Pace_Delivery');
  let mode = assist.value as PracticeAssist;
  const selectedEnd = () => (returnEnd.value || undefined) as End | undefined;
  let played = practiceDelivery(0, mode, undefined, undefined, selectedEnd());
  let trace = played.frames.map(({ pos }) => pos);
  const release = played.frames[0];
  if (!jog || !delivery || !release) throw new Error('Missing pace practice fixture');
  const bowler = createPaceBowler(bowling, jog, delivery, release.pos);
  const striker = createBatterStroke(striking, bat, strikeClips.flat(), 'right', release.pos);
  const ball = createBallView(ballAsset);
  const camera = createPracticeCamera();
  scene.add(striker.bat, ball.root);
  const [fieldingClips, keeperGloves] = await Promise.all([
    loadFieldingClips(),
    loadModel('equipment/keeping-gloves.glb'),
  ]);
  const fieldAtlas = createJerseyAtlas(played.field.track.size);
  const fieldIds = [...played.field.track.keys()];
  const kits = fieldIds.map((id) => ({
    ...bowlerInfo,
    number: id + 1,
    name: id === played.field.keeper ? 'Keeper' : '',
    gender: rosterMode === 'mixed' && id % 2 === 0 ? ('female' as const) : bowlerInfo.gender,
  }));
  fieldAtlas.write(kits);
  const field = fieldIds.map((id, index) => {
    const kit = kits[index] ?? bowlerInfo;
    const keeper = id === played.field.keeper;
    const character = asCharacter(clone(bodies[kit.gender]));
    character.setStature(kit.gender === 'female' ? 1.71 : 1.83);
    makeJersey(character.root, fieldAtlas, index)(kit);
    if (keeper) {
      for (const name of ['glove_l', 'glove_r'] as const) {
        const glove = keeperGloves.getObjectByName(name);
        if (glove) attach(character, name, glove);
      }
    }
    scene.add(character.root);
    return { id, character, actor: createFielder(character, fieldingClips, keeper) };
  });
  const phone = matchMedia('(pointer: coarse)').matches;
  const pitch = new Vector3(0, 0, PITCH.length - PITCH.poppingCrease);
  const planField = () => {
    for (const { id, actor } of field) actor.plan(played.field.track.get(id));
  };
  planField();

  const position = new Vector3();
  const socket = new Vector3();
  const axis = new Vector3();
  const turn = new Quaternion();
  const orientation = new Quaternion();
  const before = new Vector3();
  let liveAt = Number.NaN;
  let inputAt = Number.NaN;
  let expected = 0;
  let earlyLate = 0;
  let legal = 0;
  let runs = 0;
  let wickets = 0;
  let attempted = 0;
  let choice = false;
  let leaving = false;
  let tooLate = false;
  let broken = false;
  let pathIndex = 0;
  let lastFlight = 0;

  function draw(time: number) {
    const { frames, result } = played;
    bowler.sample(time, socket);
    striker.sample(time);
    if (time < 0) {
      position.copy(socket);
      orientation.identity();
    } else {
      if (time < lastFlight) pathIndex = 0;
      while (pathIndex + 1 < frames.length && (frames[pathIndex + 1]?.time ?? Infinity) <= time)
        pathIndex++;
      const previous = frames[pathIndex] ?? release;
      const following = frames[pathIndex + 1];
      if (!previous) throw new Error('Missing current ball frame');
      position.set(previous.pos.x, previous.pos.y, previous.pos.z);
      if (following && following.time > previous.time) {
        const f = (time - previous.time) / (following.time - previous.time);
        position.x += (following.pos.x - previous.pos.x) * f;
        position.y += (following.pos.y - previous.pos.y) * f;
        position.z += (following.pos.z - previous.pos.z) * f;
      }
      axis.set(previous.spin.x, previous.spin.y, previous.spin.z);
      const step = Math.max(0, time - lastFlight);
      const spin = axis.length();
      if (spin > 0 && step > 0)
        orientation.premultiply(turn.setFromAxisAngle(axis.normalize(), spin * step)).normalize();
    }
    let heldBy: (typeof field)[number] | undefined;
    let touchAt = -Infinity;
    for (const player of field) {
      const { id, actor, character } = player;
      const track = played.field.track.get(id);
      const active = id !== played.field.bowler || (time >= 1 && !!track?.events.length);
      character.root.visible = active;
      if (id === played.field.bowler) bowling.root.visible = !active;
      if (!active) continue;
      actor.sample(time, time < 0 ? pitch : position);
      character.setLod(
        outfieldLod(character.root.position.distanceTo(camera.camera.position), phone),
      );
      for (const event of track?.events ?? []) {
        if (event.time > time || event.time <= touchAt) continue;
        touchAt = event.time;
        heldBy = event.kind === 'release' ? undefined : player;
      }
    }
    if (heldBy?.actor.heldBall(position)) orientation.identity();
    lastFlight = time;
    ball.setPose(position, orientation, practiceGround.surfaceAt(position.x, position.z).height);
    ball.setTrail(trace, pathIndex, position, time >= 0 && trail.checked);
    if (result.wicketBroken && time >= result.wicketBroken.t) {
      ground.breakWicket(result.wicketBroken, time - result.wicketBroken.t);
      broken = true;
    } else if (broken) {
      ground.breakWicket(null, 0);
      broken = false;
    }
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (
      canvas.width !== Math.floor(width * renderer.getPixelRatio()) ||
      canvas.height !== Math.floor(height * renderer.getPixelRatio())
    ) {
      renderer.setSize(width, height, false);
    }
    // Hold the lens through the exact sim contact, then pan with that same ball.
    camera.frame(width, height, position, result.contact?.impact ? time - result.contact.time : 0);
    renderer.render(scene, camera.camera);
    if (Number.isFinite(inputAt) && before.distanceToSquared(striker.bat.position) > 0.000001) {
      screen.dataset.inputResponse = (performance.now() - inputAt).toFixed(1);
      inputAt = Number.NaN;
    }
    screen.dataset.phase =
      time < 0
        ? 'approach'
        : result.contact?.impact && time > result.contact.time
          ? 'follow'
          : 'flight';
  }

  function finish() {
    const { outcome, contact } = played.result;
    const illegal = outcome.illegal;
    if (!illegal) legal++;
    attempted++;
    if (outcome.dismissal) wickets++;
    runs += (outcome.boundary ?? outcome.runsRun ?? 0) + (illegal ? 1 : 0);
    score.textContent = `${runs} / ${wickets}`;
    overs.textContent = `${Math.floor(legal / 6)}.${legal % 6} / 5 overs`;
    const outcomeLabel =
      illegal ?? outcome.dismissal?.kind ?? (outcome.boundary ? `${outcome.boundary} runs` : '');
    const strike =
      contact?.kind === 'middled'
        ? 'Clean hit'
        : contact?.kind === 'edge'
          ? 'Edge'
          : contact?.impact
            ? 'Mistimed hit'
            : 'Miss';
    const timing = tooLate
      ? 'Too late'
      : !choice
        ? 'No shot'
        : Math.abs(earlyLate) <= 0.055
          ? 'On time'
          : earlyLate > 0
            ? 'Late'
            : 'Early';
    const action = choice || tooLate ? `${strike} · ${timing}` : timing;
    verdict.textContent = outcomeLabel ? `${action} · ${outcomeLabel}` : action;
    meter.value = Math.max(-1, Math.min(1, earlyLate / 0.19));
    meter.hidden = !choice && !tooLate;
    feedback.hidden = false;
    cue.textContent = '';
    screen.dataset.phase = 'ready';
    screen.dataset.legal = String(legal);
    liveAt = Number.NaN;
    next.disabled = false;
    playShot.hidden = true;
    next.hidden = false;
    assist.disabled = false;
    returnEnd.disabled = false;
    next.textContent = legal >= 30 ? 'Restart practice' : 'Next ball';
  }

  function choose(shot: PracticeShot) {
    if (!Number.isFinite(liveAt) || choice) return;
    const now = performance.now();
    const time = practiceClock((now - liveAt) / 1000 - PACE_APPROACH, mode);
    expected = practiceArrival(played.frames, shot.stroke);
    const window = practiceWindow(expected, mode);
    if (time > window.closes) {
      tooLate = true;
      earlyLate = time - window.ideal;
      return;
    }
    earlyLate = time - window.ideal;
    const timingError = practiceSwingError(time, expected, mode);
    const previous = played;
    played = practiceDelivery(attempted, mode, shot, timingError, selectedEnd());
    const event = played.result.contact;
    if (event?.impact && event.time <= time + 0.018) played = previous;
    planField();
    trace = played.frames.map(({ pos }) => pos);
    const chosen = played.result.contact;
    const start = time - 0.018;
    before.copy(striker.bat.position);
    inputAt = now;
    choice = true;
    pathIndex = 0;
    striker.plan(
      shot.stroke,
      start,
      chosen?.impact ? chosen.time : Math.max(time + 0.105, expected + timingError),
      chosen?.impact ?? null,
    );
    playShot.disabled = true;
    cue.classList.remove('playing');
    cue.textContent = 'Shot played';
    draw(time);
  }
  bindBattingInput(canvas, choose);
  playShot.addEventListener('click', () => choose({ stroke: 'straight-drive', lofted: false }));

  next.addEventListener('click', () => {
    if (legal >= 30) {
      legal = 0;
      runs = 0;
      wickets = 0;
      attempted = 0;
      score.textContent = '0 / 0';
      overs.textContent = '0.0 / 5 overs';
    }
    mode = assist.value as PracticeAssist;
    played = practiceDelivery(attempted, mode, undefined, undefined, selectedEnd());
    planField();
    trace = played.frames.map(({ pos }) => pos);
    expected = practiceArrival(played.frames, 'cover-drive');
    choice = false;
    leaving = false;
    tooLate = false;
    earlyLate = 0;
    pathIndex = 0;
    lastFlight = 0;
    striker.reset();
    cue.textContent = '';
    feedback.hidden = true;
    next.disabled = true;
    next.hidden = true;
    playShot.hidden = false;
    playShot.disabled = true;
    assist.disabled = true;
    returnEnd.disabled = true;
    delete screen.dataset.inputResponse;
    canvas.focus();
    liveAt = performance.now();
    requestAnimationFrame(frame);
  });

  function frame(now: number) {
    const impact = played.result.contact?.impact ? played.result.contact.time : undefined;
    const time = practiceClock((now - liveAt) / 1000 - PACE_APPROACH, mode, impact);
    if (!choice) {
      const { opens, closes } = practiceWindow(expected, mode);
      const ready = time >= opens && time <= closes;
      const nextCue = time < opens ? 'Get ready' : ready ? 'Play now' : '';
      if (cue.textContent !== nextCue) cue.textContent = nextCue;
      cue.classList.toggle('playing', ready);
      playShot.disabled = !ready;
      if (time > closes && !leaving) {
        leaving = true;
        striker.plan('leave', time, time + 0.22, null);
      }
    } else if (impact !== undefined && time >= impact) {
      const contact = played.result.contact;
      const strike =
        contact?.kind === 'middled'
          ? 'Clean hit'
          : contact?.kind === 'edge'
            ? 'Edge'
            : 'Mistimed hit';
      if (cue.textContent !== strike) cue.textContent = strike;
    }
    draw(time);
    const until = Math.max(SHOW_UNTIL, (played.frames.at(-1)?.time ?? 0) + 0.35);
    if (time < until) requestAnimationFrame(frame);
    else finish();
  }
  window.addEventListener('resize', () => {
    if (!Number.isFinite(liveAt)) draw(-PACE_APPROACH);
  });

  draw(-PACE_APPROACH);
  screen.dataset.phase = 'ready';
  next.disabled = false;
  next.textContent = START;
}

void start().catch((error: unknown) => {
  console.error(error);
  next.textContent = 'Could not load the practice pitch';
});
