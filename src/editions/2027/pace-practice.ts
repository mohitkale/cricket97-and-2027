import { Group, Quaternion, Scene, Vector3, WebGLRenderer } from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import type { selectBowling } from '../../game/bowling-aim';
import { returnedWicket, runFrameAt } from '../../game/field-trace';
import {
  type PracticeAssist,
  type PracticeOptions,
  type PracticeShot,
  practiceArrival,
  practiceClock,
  practiceDelivery,
  practiceGround,
  practiceSwingError,
  practiceWindow,
} from '../../game/pace-practice';
import {
  createPracticeInnings,
  PRACTICE_OVERS,
  RESET_WALK,
  RESULT_BEAT,
} from '../../game/practice-innings';
import { type UmpireSignal, umpireSignals } from '../../game/umpire-signals';
import { bindBattingInput } from '../../platform/batting-input';
import { loadClips, loadModel } from '../../render/assets';
import { createBallView } from '../../render/ball-view';
import { createBatterStroke, STROKE_CLIP_FILES } from '../../render/batter-stroke';
import { asCharacter, attach, type Character } from '../../render/character';
import { createFielder, loadFieldingClips } from '../../render/fielding';
import { createPaceBowler, PACE_APPROACH } from '../../render/pace-bowler';
import { createPracticeCamera } from '../../render/practice-camera';
import { createRunningBatter } from '../../render/running-batter';
import { addSliceGround } from '../../render/slice';
import { createUmpire } from '../../render/umpire';
import type { End, RunCommand } from '../../sim/agents/running';
import { oversText } from '../../sim/rules/match';
import { PITCH } from '../../sim/units';
import { bindBowlingControls } from './bowling-controls';
import { createJerseyAtlas, type LineupPlayer, makeJersey } from './lineup-kit';
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
const runAction = get<HTMLButtonElement>('#run-action');
const runRisk = get<HTMLSpanElement>('#run-risk');
const assist = get<HTMLSelectElement>('#assist');
const returnEnd = get<HTMLSelectElement>('#return-end');
const trail = get<HTMLInputElement>('#trail');
const autoNext = get<HTMLInputElement>('#auto-next');
const cue = get<HTMLElement>('#cue');
const feedback = get<HTMLElement>('#feedback');
const verdict = get<HTMLElement>('#feedback strong');
const meter = get<HTMLMeterElement>('#feedback meter');
const score = get<HTMLElement>('#score');
const overs = get<HTMLElement>('#overs');
const onStrike = get<HTMLElement>('#on-strike');

const START = 'Bowl first ball';
const SHOW_UNTIL = 1.5;
const query = new URLSearchParams(location.search);
const rosterMode = query.get('mode') ?? 'mixed';
const userBowls = query.get('role') === 'bowl';
const alternate = new URLSearchParams(query);
if (userBowls) alternate.delete('role');
else alternate.set('role', 'bowl');
const swap = get<HTMLAnchorElement>('#swap-practice');
swap.href = `?${alternate}`;
swap.textContent = userBowls ? 'Practise batting' : 'Practise bowling';
if (matchMedia('(pointer: coarse)').matches)
  get('#help').textContent = 'Swipe to drive · tap to defend · swipe farther to loft';
if (userBowls) {
  get('#practice-hud p').textContent = 'Bowling practice';
  get('#help').textContent = 'Drag or use arrows to aim · Space to release';
  canvas.setAttribute('aria-label', 'Bowling pitch. Drag or use arrows to aim.');
}

async function start() {
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35));
  const scene = new Scene();
  const pitchActors = new Group();
  scene.add(pitchActors);
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
      addSliceGround(scene, renderer, pitchActors),
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
  function playerBody(gender: LineupPlayer['gender']) {
    const player = asCharacter(clone(bodies[gender]));
    player.root.traverse((part) => {
      part.castShadow = true;
    });
    player.root.visible = false;
    pitchActors.add(player.root);
    return player;
  }
  function equipBatter(player: Character) {
    attach(player, 'helmet', helmet.clone(true));
    for (const name of ['pad_l', 'pad_r', 'glove_l', 'glove_r'] as const) {
      const piece = (name.startsWith('pad') ? pads : gloves).getObjectByName(name);
      if (piece) attach(player, name, piece.clone(true));
    }
  }
  const walk = jogClips.find(({ name }) => name === 'Walk_Loop');
  const jog = jogClips.find(({ name }) => name === 'Jog_Fwd_Loop');
  const delivery = paceClips.find(({ name }) => name === 'Bowling_Pace_Delivery');
  let session = createPracticeInnings();
  let mode = assist.value as PracticeAssist;
  const selectedEnd = () => (returnEnd.value || undefined) as End | undefined;
  const runCommands: RunCommand[] = [];
  let activeShot: PracticeShot | undefined;
  let activeBowl: ReturnType<typeof selectBowling> | undefined;
  let swingError = 0;
  const options = (): PracticeOptions => {
    const throwEnd = selectedEnd();
    return {
      ...(throwEnd && { throwEnd }),
      ...(activeBowl && { bowl: activeBowl }),
      innings: session.batting,
      running: { automatic: userBowls || mode === 'casual', commands: runCommands },
    };
  };
  let played = practiceDelivery(0, mode, undefined, undefined, options());
  let trace = played.frames.map(({ pos }) => pos);
  const release = played.frames[0];
  if (!walk || !jog || !delivery || !release) throw new Error('Missing pace practice fixture');
  const ball = createBallView(ballAsset);
  const camera = createPracticeCamera();
  pitchActors.add(ball.root);
  const [fieldingClips, keeperGloves, runningClips, officialClips] = await Promise.all([
    loadFieldingClips(),
    loadModel('equipment/keeping-gloves.glb'),
    loadClips('clips/over-movement.glb'),
    loadClips('clips/over-officials.glb'),
  ]);
  const partner = {
    ...strikerInfo,
    name: 'Sam Dev',
    number: 7,
    gender: rosterMode === 'mixed' ? ('male' as const) : strikerInfo.gender,
  };
  const batters = [
    strikerInfo,
    partner,
    ...['Shah', 'Singh', 'Rao', 'Kumar', 'Patel', 'Nair', 'Jain', 'Das', 'Basu'].map(
      (name, index) => ({
        ...strikerInfo,
        name,
        number: index + 22,
        gender: index % 2 === 0 ? strikerInfo.gender : partner.gender,
      }),
    ),
  ];
  const atlas = createJerseyAtlas(3);
  const genders = [...new Set([strikerInfo.gender, partner.gender, bowlerInfo.gender])];
  const battingActors = genders.map((gender) => {
    const striker = playerBody(gender);
    equipBatter(striker);
    const stroke = createBatterStroke(
      striker,
      bat.clone(true),
      strikeClips.flat(),
      'right',
      release.pos,
    );
    stroke.bat.visible = false;
    pitchActors.add(stroke.bat);
    const runners = ([0, 1] as const).map((slot) => {
      const player = playerBody(gender);
      equipBatter(player);
      return {
        motion: createRunningBatter(player, bat.clone(true), runningClips, slot),
        dress: makeJersey(player.root, atlas, slot),
      };
    });
    return { gender, striker, stroke, runners, dress: makeJersey(striker.root, atlas, 0) };
  });
  const bowlingActors = genders.map((gender) => {
    const player = playerBody(gender);
    return {
      gender,
      player,
      motion: createPaceBowler(player, jog, delivery, release.pos, walk),
      dress: makeJersey(player.root, atlas, 2),
    };
  });
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
    pitchActors.add(character.root);
    return { id, character, actor: createFielder(character, fieldingClips, keeper) };
  });
  const phone = matchMedia('(pointer: coarse)').matches;
  const pitch = new Vector3(0, 0, PITCH.length - PITCH.poppingCrease);
  const officialAtlas = createJerseyAtlas(2);
  const officialMotion = new Map(fieldingClips);
  for (const clip of officialClips) officialMotion.set(clip.name, clip);
  const officials = (['bowler', 'square'] as const).map((station, index) => {
    const gender = station === 'bowler' ? 'male' : 'female';
    const character = asCharacter(clone(bodies[gender]));
    makeJersey(
      character.root,
      officialAtlas,
      index,
    )({
      name: '',
      number: 0,
      team: 'Official',
      gender,
      color: 0x647b8e,
    });
    pitchActors.add(character.root);
    return createUmpire(character, officialMotion, station);
  });
  const officialFocus = new Vector3();
  function lineup() {
    const { striker, nonStriker, bowler } = session.batting;
    const first = batters[striker] ?? strikerInfo;
    const second = batters[nonStriker] ?? partner;
    const currentBowler =
      bowler === 9 ? bowlerInfo : (kits[fieldIds.indexOf(bowler ?? 9)] ?? bowlerInfo);
    const batter = battingActors.find(({ gender }) => gender === first.gender);
    const runner = battingActors.find(({ gender }) => gender === second.gender);
    const bowling = bowlingActors.find(({ gender }) => gender === currentBowler.gender);
    const front = batter?.runners[0];
    const back = runner?.runners[1];
    if (!batter || !bowling || !front || !back) throw new Error('Missing practice lineup');
    atlas.write([first, second, currentBowler]);
    for (const actor of battingActors) {
      actor.striker.root.visible = false;
      actor.stroke.bat.visible = false;
      for (const { motion } of actor.runners) motion.root.visible = false;
    }
    for (const actor of bowlingActors) actor.player.root.visible = false;
    batter.dress(first);
    front.dress(first);
    back.dress(second);
    bowling.dress(currentBowler);
    onStrike.textContent = `${first.name} on strike`;
    screen.dataset.striker = String(striker);
    return {
      striker: batter.stroke,
      striking: batter.striker,
      bowler: bowling.motion,
      bowling: bowling.player,
      front: front.motion,
      back: back.motion,
    };
  }
  let actors = lineup();
  let activeEnd = session.end;
  screen.dataset.bowlingEnd = String(activeEnd);
  screen.dataset.legal = '0';
  screen.dataset.attempts = '0';
  let signals: UmpireSignal[] = [];
  let deadAt = 0;
  let wicket = played.result.wicketBroken;
  const planField = () => {
    wicket = played.result.wicketBroken ?? returnedWicket(played.field.wicket);
    deadAt = Math.max(played.frames.at(-1)?.time ?? 0, wicket?.t ?? 0);
    const passing = played.frames.find(({ pos }) => pos.z >= PITCH.length)?.time ?? deadAt;
    const returnEnd = played.field.wicket?.end;
    const outcome = played.result.outcome;
    const ruling = session.preview(outcome);
    signals = umpireSignals(
      ruling.noBallForBouncers ? { ...outcome, illegal: 'no-ball' } : outcome,
      {
        passing,
        dead: deadAt,
        freeHit: ruling.wasFreeHit,
        ...(returnEnd && { returnEnd }),
      },
    );
    for (const { id, actor } of field) actor.plan(played.field.track.get(id));
  };
  planField();

  const position = new Vector3();
  const socket = new Vector3();
  const axis = new Vector3();
  const turn = new Quaternion();
  const orientation = new Quaternion();
  const halfTurn = new Quaternion(0, 1, 0, 0);
  const before = new Vector3();
  let liveAt = Number.NaN;
  let inputAt = Number.NaN;
  let expected = 0;
  let earlyLate = 0;
  let deadSince = Number.NaN;
  let resetAt = 0;
  let resetFrame = 0;
  let choice = false;
  let leaving = false;
  let tooLate = false;
  let broken = false;
  let pathIndex = 0;
  let lastFlight = 0;
  let bowlingTiming = '';
  const spinClips = userBowls ? await loadClips('clips/over-spin.glb') : [];
  const bowlingControls = userBowls
    ? bindBowlingControls(
        canvas,
        camera.camera,
        pitchActors,
        get('#bowling'),
        () => {
          const input = performance.now();
          draw(-PACE_APPROACH);
          screen.dataset.aimResponse = (performance.now() - input).toFixed(1);
        },
        startDelivery,
      )
    : null;

  // Keep rig queries and aim rays in the sim frame. Turn the playing actors and
  // bowler-end camera together for the alternate end of the physical ground.
  function turnCamera() {
    const view = camera.camera;
    view.position.x *= -1;
    view.position.z = PITCH.length - view.position.z;
    view.quaternion.premultiply(halfTurn);
    view.updateMatrixWorld();
  }

  function draw(time: number, walkTime?: number) {
    const { frames, result } = played;
    const { striker, striking, bowler, bowling, front, back } = actors;
    bowler.sample(time, socket);
    if (walkTime !== undefined) bowler.walkBack(walkTime);
    striker.sample(time);
    const strikerRunning = front.sample(time, played.field.running);
    back.sample(time, played.field.running);
    striking.root.visible = !strikerRunning;
    striker.bat.visible = !strikerRunning;
    if (!userBowls && Number.isFinite(liveAt)) {
      const running = runFrameAt(played.field.running, time).current;
      runAction.hidden = !running?.available;
      runRisk.hidden = runAction.hidden;
      runAction.disabled = running?.returning ?? false;
      runAction.textContent = running?.active ? 'Cancel run' : 'Run';
      if (running?.available)
        runRisk.textContent = running.returning
          ? 'Turning back'
          : running.margin > 0.35
            ? 'Safe run'
            : running.margin > 0
              ? 'Tight run'
              : 'High risk';
    }
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
      const active =
        id !== played.field.bowler ||
        (walkTime === undefined && time >= 1 && !!track?.events.length);
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
    let showOfficial = false;
    for (const official of officials) {
      const signal = official.sample(time, signals);
      if (signal && time >= deadAt && walkTime === undefined) {
        showOfficial = true;
        officialFocus.copy(official.root.position);
        officialFocus.y = 1.07;
        if (cue.textContent !== signal.text) cue.textContent = signal.text;
      }
    }
    lastFlight = time;
    ball.root.visible = walkTime === undefined;
    ball.setPose(position, orientation, practiceGround.surfaceAt(position.x, position.z).height);
    ball.setTrail(trace, pathIndex, position, walkTime === undefined && time >= 0 && trail.checked);
    if (wicket && time >= wicket.t) {
      ground.breakWicket(wicket, time - wicket.t);
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
    camera.frame(
      width,
      height,
      showOfficial ? officialFocus : position,
      walkTime !== undefined
        ? 0
        : showOfficial
          ? 1
          : result.contact?.impact
            ? time - result.contact.time
            : 0,
    );
    if (activeEnd === 1) {
      pitchActors.position.z = PITCH.length;
      pitchActors.quaternion.copy(halfTurn);
      turnCamera();
    }
    renderer.render(scene, camera.camera);
    if (activeEnd === 1) {
      pitchActors.position.z = 0;
      pitchActors.quaternion.identity();
      pitchActors.updateMatrixWorld(true);
      turnCamera();
    }
    if (Number.isFinite(inputAt) && before.distanceToSquared(striker.bat.position) > 0.000001) {
      screen.dataset.inputResponse = (performance.now() - inputAt).toFixed(1);
      inputAt = Number.NaN;
    }
    screen.dataset.phase =
      walkTime !== undefined
        ? 'reset'
        : time < 0
          ? 'approach'
          : result.contact?.impact && time > result.contact.time
            ? 'follow'
            : 'flight';
  }

  function finish() {
    const { outcome, contact } = played.result;
    const ruling = session.finish(outcome);
    const { legalBalls, runs, wickets, ended } = session.batting;
    score.textContent = `${runs} / ${wickets}`;
    overs.textContent = `${oversText(legalBalls)} / ${PRACTICE_OVERS} overs`;
    const outcomeLabel = ruling.noBallForBouncers ? 'no-ball' : (outcome.illegal ?? ruling.wicket);
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
    const action = userBowls ? bowlingTiming : choice || tooLate ? `${strike} · ${timing}` : timing;
    const runsLabel = ruling.runs ? `${ruling.runs} run${ruling.runs === 1 ? '' : 's'}` : '';
    const nextLabel =
      ended === 'all-out'
        ? 'All out'
        : ended
          ? 'Practice complete'
          : ruling.overComplete
            ? 'Change ends'
            : '';
    verdict.textContent = [action, outcomeLabel, runsLabel, nextLabel].filter(Boolean).join(' · ');
    meter.value = Math.max(-1, Math.min(1, earlyLate / 0.19));
    meter.hidden = userBowls || (!choice && !tooLate);
    feedback.hidden = false;
    cue.classList.remove('playing');
    cue.textContent = '';
    screen.dataset.phase = 'ready';
    screen.dataset.legal = String(legalBalls);
    screen.dataset.attempts = String(session.attempts);
    liveAt = Number.NaN;
    next.disabled = false;
    playShot.hidden = true;
    runAction.hidden = true;
    runRisk.hidden = true;
    next.hidden = false;
    assist.disabled = false;
    returnEnd.disabled = false;
    next.textContent = ended ? 'Restart practice' : 'Next ball';
    if (!ended && autoNext.checked) scheduleReset();
  }

  function scheduleReset() {
    if (!resetFrame) {
      resetAt = performance.now();
      resetFrame = requestAnimationFrame(reset);
    }
  }

  function reset(now: number) {
    resetFrame = 0;
    if (!autoNext.checked) return;
    const elapsed = (now - resetAt) / 1000 - RESULT_BEAT;
    if (elapsed >= RESET_WALK) {
      advanceDelivery();
      return;
    }
    if (elapsed >= 0) draw(lastFlight, elapsed);
    resetFrame = requestAnimationFrame(reset);
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
    const { striker } = actors;
    const previous = played;
    played = practiceDelivery(session.attempts, mode, shot, timingError, options());
    const event = played.result.contact;
    if (event?.impact && event.time <= time + 0.018) played = previous;
    else {
      activeShot = shot;
      swingError = timingError;
    }
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
  if (!userBowls) bindBattingInput(canvas, choose);
  playShot.addEventListener('click', () => choose({ stroke: 'straight-drive', lofted: false }));
  const callRun = () => {
    const current = runFrameAt(played.field.running, lastFlight).current;
    if (!Number.isFinite(liveAt) || userBowls || !current?.available || current.returning) return;
    if ((runCommands.at(-1)?.time ?? -Infinity) > lastFlight) return;
    runCommands.push({ time: lastFlight + 1e-6, action: current.active ? 'cancel' : 'run' });
    played = practiceDelivery(session.attempts, mode, activeShot, swingError, options());
    trace = played.frames.map(({ pos }) => pos);
    pathIndex = 0;
    planField();
  };
  runAction.addEventListener('click', callRun);
  window.addEventListener('keydown', (event) => {
    if (event.code !== 'KeyR' || event.repeat || event.target instanceof HTMLSelectElement) return;
    event.preventDefault();
    callRun();
  });

  function prepareDelivery(bowl?: ReturnType<typeof selectBowling>) {
    if (session.batting.ended) {
      session = createPracticeInnings();
      score.textContent = '0 / 0';
      overs.textContent = `0.0 / ${PRACTICE_OVERS} overs`;
      screen.dataset.legal = '0';
      screen.dataset.attempts = '0';
    }
    actors = lineup();
    activeEnd = session.end;
    ground.setStrikerEnd(activeEnd === 1);
    screen.dataset.bowlingEnd = String(activeEnd);
    const { bowler, striker } = actors;
    mode = assist.value as PracticeAssist;
    activeShot = undefined;
    activeBowl = bowl;
    swingError = 0;
    runCommands.length = 0;
    played = practiceDelivery(session.attempts, mode, undefined, undefined, options());
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
    const style = bowl?.style === 'off' ? 'Bowling_Off_Spin' : 'Bowling_Leg_Spin';
    const take = bowl?.style ? spinClips.find(({ name }) => name === style) : delivery;
    const launch = played.frames[0];
    if (!take || !launch) throw new Error('Missing bowling take or launch');
    bowler.configure(take, launch.pos);
    if (bowl) {
      bowlingTiming = bowl.timing;
      const { stroke } = played.batting;
      const contact = played.result.contact;
      const event = contact?.impact ? contact.time : practiceArrival(played.frames, stroke);
      striker.plan(stroke, Math.max(0, event - 0.22), event, contact?.impact ?? null);
      choice = stroke !== 'leave';
    }
  }

  function startDelivery(bowl?: ReturnType<typeof selectBowling>) {
    const input = performance.now();
    if (Number.isFinite(liveAt)) return;
    prepareDelivery(bowl);
    cue.textContent = '';
    feedback.hidden = true;
    next.disabled = true;
    next.hidden = true;
    playShot.hidden = userBowls;
    playShot.disabled = true;
    assist.disabled = true;
    returnEnd.disabled = true;
    delete screen.dataset.inputResponse;
    canvas.focus();
    liveAt = performance.now();
    if (Number.isFinite(deadSince))
      screen.dataset.resetDelay = ((liveAt - deadSince) / 1000).toFixed(3);
    deadSince = Number.NaN;
    if (bowl) {
      draw(-PACE_APPROACH);
      screen.dataset.releaseResponse = (performance.now() - input).toFixed(1);
    }
    requestAnimationFrame(frame);
  }

  function advanceDelivery() {
    cancelAnimationFrame(resetFrame);
    resetFrame = 0;
    if (!bowlingControls) {
      startDelivery();
      return;
    }
    if (!bowlingControls.timing) {
      prepareDelivery();
      bowlingControls.ready();
      draw(-PACE_APPROACH);
      screen.dataset.phase = 'aim';
    }
    if (!bowlingControls.press(assist.value as PracticeAssist)) return;
    feedback.hidden = true;
    assist.disabled = true;
    next.textContent = 'Release ball';
    canvas.focus();
  }
  next.addEventListener('click', advanceDelivery);
  autoNext.addEventListener('change', () => {
    if (
      autoNext.checked &&
      !session.batting.ended &&
      Number.isFinite(deadSince) &&
      !Number.isFinite(liveAt) &&
      !bowlingControls?.timing
    )
      scheduleReset();
  });

  function frame(now: number) {
    const impact = played.result.contact?.impact ? played.result.contact.time : undefined;
    const time = practiceClock((now - liveAt) / 1000 - PACE_APPROACH, mode, impact);
    if (!userBowls && !choice && time < deadAt) {
      const { opens, closes } = practiceWindow(expected, mode);
      const ready = time >= opens && time <= closes;
      const nextCue = time < opens ? 'Get ready' : ready ? 'Play now' : '';
      if (cue.textContent !== nextCue) cue.textContent = nextCue;
      cue.classList.toggle('playing', ready);
      playShot.disabled = !ready;
      if (time > closes && !leaving) {
        leaving = true;
        actors.striker.plan('leave', time, time + 0.22, null);
      }
    } else if (impact !== undefined && time >= impact && time < deadAt) {
      const contact = played.result.contact;
      const strike =
        contact?.kind === 'middled'
          ? 'Clean hit'
          : contact?.kind === 'edge'
            ? 'Edge'
            : 'Mistimed hit';
      if (cue.textContent !== strike) cue.textContent = strike;
    }
    if (time >= deadAt && !Number.isFinite(deadSince)) deadSince = now;
    draw(time);
    const until = Math.max(SHOW_UNTIL, deadAt + 0.35, ...signals.map(({ end }) => end));
    if (time < until) requestAnimationFrame(frame);
    else finish();
  }
  window.addEventListener('resize', () => {
    if (!Number.isFinite(liveAt)) draw(-PACE_APPROACH);
  });

  draw(-PACE_APPROACH);
  screen.dataset.phase = 'ready';
  next.disabled = false;
  next.textContent = userBowls ? 'Start timing' : START;
}

void start().catch((error: unknown) => {
  console.error(error);
  next.textContent = 'Could not load the practice pitch';
});
