import {
  type AnimationAction,
  type AnimationClip,
  AnimationMixer,
  Quaternion,
  Vector3,
} from 'three';
import { MARKERS } from '../anim/clips';
import { solveTwoBone } from '../anim/ik';
import { OVER_CLIPS } from '../anim/over-clips';
import { KEEPER_PALM_ON_GLOVE } from '../anim/skeleton';
import type { FieldEvent, FieldKey, FieldTrack } from '../game/field-trace';
import { BALL } from '../sim/units';
import { loadClips } from './assets';
import type { Character } from './character';

export const FIELD_CLIP_FILES = [
  'clips/ual1-candidates.glb',
  'clips/ual1-fielding.glb',
  'clips/ual2-candidates.glb',
  'clips/keeper-ready.glb',
  'clips/keeper-regulation-take.glb',
  'clips/over-field-actions.glb',
];

export async function loadFieldingClips() {
  return new Map(
    (await Promise.all(FIELD_CLIP_FILES.map(loadClips))).flat().map((clip) => [clip.name, clip]),
  );
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => {
  const t = clamp01(n);
  return t * t * (3 - 2 * t);
};

function chooseAction(event: FieldEvent, keeper: boolean, stumping: boolean) {
  const reach = Math.hypot(event.ball.x - event.x, event.ball.z - event.z);
  if (stumping) return 'Keeper_Stumping';
  if (event.kind === 'release')
    return event.ball.y < 1.2 ? 'Field_Throw_Underarm' : 'OverhandThrow';
  if (event.kind === 'gather') {
    const cross = event.dz * (event.ball.x - event.x) - event.dx * (event.ball.z - event.z);
    if (event.speed > 4.75 && reach > 0.68) {
      return cross >= 0 ? 'Field_Dive_Left' : 'Field_Dive_Right';
    }
    return event.speed > 1.1 ? 'Field_Pickup_Moving' : 'Field_Pickup_Static';
  }
  if (keeper) {
    if (reach > 1.35) return 'Keeper_Dive';
    if (Math.abs(event.ball.x - event.x) > 0.45) return 'Keeper_Take_Wide';
    return event.ball.y < 0.6 ? 'Keeper_Take_Low' : 'Keeper_Regulation_Take';
  }
  if (event.ball.y > 1.12) return 'Field_Catch_High';
  return event.ball.y > 0.86 ? 'Keeper_Regulation_Take' : 'Field_Catch_Low';
}

interface PlayAction {
  at: FieldEvent;
  animation: string;
  start: number;
  from: number;
  marker: number;
  duration: number;
  yaw: number;
  position: Vector3;
  contact: Vector3;
  side: 'l' | 'r';
  twoHands: boolean;
}

/** Deterministic presentation actor. A trace can be scrubbed, replayed or replaced on input. */
export function createFielder(
  character: Character,
  clips: ReadonlyMap<string, AnimationClip>,
  keeper: boolean,
) {
  const { root } = character;
  const mixer = new AnimationMixer(root);
  const named = (name: string) => {
    const node = root.getObjectByName(name);
    if (!node) throw new Error(`Fielder needs ${name}`);
    return node;
  };
  const arms = {
    l: [named('upperarm_l'), named('lowerarm_l'), named('hand_l')],
    r: [named('upperarm_r'), named('lowerarm_r'), named('hand_r')],
  } as const;
  const legs = [
    [named('thigh_l'), named('calf_l'), named('foot_l')],
    [named('thigh_r'), named('calf_r'), named('foot_r')],
  ] as const;
  const feet = [new Vector3(), new Vector3()] as const;
  const gloves = { l: character.socket('glove_l'), r: character.socket('glove_r') };
  const socket = character.socket('ball');
  const current = new Vector3();
  const wrist = new Vector3();
  const elbow = new Vector3();
  const target = new Vector3();
  const world = new Quaternion();
  const parent = new Quaternion();
  const actions = new Map<string, AnimationAction>();
  let playing: AnimationAction[] = [];
  let track: FieldTrack | undefined;
  let index = 0;
  let planned: PlayAction[] = [];
  let holding: PlayAction | undefined;
  let active: PlayAction | undefined;
  let transfer = 0;

  const handPoint = (side: 'l' | 'r', two: boolean, into: Vector3) => {
    if (!two && side === 'r') return socket.getWorldPosition(into);
    const [x, y, z] = KEEPER_PALM_ON_GLOVE[side];
    return gloves[side].localToWorld(into.set(x, y, z));
  };
  const clip = (name: string) => {
    const item = clips.get(name);
    if (!item) throw new Error(`Missing fielding clip ${name}`);
    return item;
  };
  function schedulePose(name: string, time: number, weight: number) {
    let action = actions.get(name);
    if (!action) {
      action = mixer.clipAction(clip(name));
      actions.set(name, action);
    }
    action.play().setEffectiveWeight(weight);
    action.time = Math.min(action.getClip().duration - 1e-5, Math.max(0, time));
    playing.push(action);
  }
  function clearPose() {
    for (const action of playing) action.setEffectiveWeight(0);
    playing.length = 0;
  }
  function fit(side: 'l' | 'r', action: PlayAction, weight: number) {
    const [upper, lower, hand] = arms[side];
    hand.getWorldPosition(wrist);
    hand.getWorldQuaternion(world);
    lower.getWorldPosition(elbow);
    handPoint(side, action.twoHands, current);
    target.copy(action.contact).sub(current).add(wrist);
    if (action.twoHands) {
      const sign = side === 'l' ? 1 : -1;
      target.x += Math.cos(action.yaw) * BALL.radius * sign * 0.8;
      target.z -= Math.sin(action.yaw) * BALL.radius * sign * 0.8;
    }
    solveTwoBone(upper, lower, hand, target, elbow, weight);
    hand.quaternion.copy(lower.getWorldQuaternion(parent).invert()).multiply(world);
    hand.updateMatrixWorld(true);
  }
  function makeAction(event: FieldEvent, previous?: FieldEvent, next?: FieldEvent): PlayAction {
    const stumping = keeper && (event.kind === 'stump' || next?.kind === 'stump');
    const animation = chooseAction(event, keeper, stumping);
    const name =
      event.kind === 'gather' || event.kind === 'release' || event.kind === 'stump'
        ? event.kind
        : 'catch';
    const duration = clip(animation).duration;
    const markers = MARKERS[animation];
    const marker = markers?.find((item) => item.name === name)?.time ?? 0;
    if (marker <= 0) throw new Error(`Missing ${animation} ${name} marker`);
    const side = animation === 'Field_Dive_Left' ? 'l' : 'r';
    const twoHands =
      (event.kind === 'catch' || event.kind === 'take') && animation !== 'Keeper_Dive';
    const x = (event.aim?.x ?? event.ball.x) - event.x;
    const z = (event.aim?.z ?? event.ball.z) - event.z;
    const ahead = Math.hypot(x, z) > 0.08 ? Math.atan2(x, z) : Math.atan2(event.dx, event.dz);
    const yaw =
      keeper && !event.aim
        ? Math.PI - Math.max(-0.65, Math.min(0.65, x * 0.45))
        : ahead + (animation.startsWith('Field_Dive') ? (side === 'l' ? -0.85 : 0.85) : 0);
    const from = event.kind === 'stump' ? (OVER_CLIPS.Keeper_Stumping?.markers[0]?.time ?? 0) : 0;
    const lead = previous ? Math.min(marker - from, (event.time - previous.time) * 0.88) : marker;
    const contact = new Vector3(event.ball.x, event.ball.y, event.ball.z);
    root.position.set(event.x, 0, event.z);
    root.rotation.y = yaw;
    clearPose();
    schedulePose(animation, marker, 1);
    mixer.update(0);
    handPoint(side, twoHands, current);
    if (twoHands) current.lerp(handPoint('l', true, wrist), 0.5);
    const lift =
      event.kind === 'gather'
        ? Math.max(-0.12, Math.min(0, contact.y - current.y))
        : event.kind === 'catch' || event.kind === 'take'
          ? Math.max(0, contact.y - current.y - (animation === 'Field_Catch_High' ? 0.04 : 0.3))
          : 0;
    const position = new Vector3(
      event.x + contact.x - current.x,
      lift,
      event.z + contact.z - current.z,
    );
    return {
      at: event,
      animation,
      start: event.time - lead,
      from,
      marker,
      duration,
      yaw,
      position,
      contact,
      side,
      twoHands,
    };
  }

  function gait(key: FieldKey, time: number, weight: number) {
    const speed = key.speed;
    if (speed < 0.12) {
      const name = keeper ? 'Keeper_Ready_Loop' : 'Idle_Loop';
      schedulePose(name, Math.max(0, time) % clip(name).duration, weight);
      return;
    }
    const name = speed < 1.65 ? 'Walk_Loop' : speed < 6.5 ? 'Jog_Fwd_Loop' : 'Sprint_Loop';
    const stride = speed < 1.65 ? 1.12 : speed < 6.5 ? 5 : 5.5;
    schedulePose(name, ((key.distance / stride) % 1) * clip(name).duration, weight);
  }

  return {
    plan(next: FieldTrack | undefined) {
      track = next;
      index = 0;
      holding = undefined;
      const events = next?.events ?? [];
      planned = events.map((event, i) => makeAction(event, events[i - 1], events[i + 1]));
      root.visible = !!next;
    },
    sample(time: number, look: Vector3) {
      const keys = track?.keys;
      if (!keys?.length) return;
      if ((keys[index]?.time ?? 0) > time) index = 0;
      while ((keys[index + 1]?.time ?? Infinity) <= time) index++;
      const prev = keys[index];
      const next = keys[index + 1];
      if (!prev) return;
      const f = next ? clamp01((time - prev.time) / (next.time - prev.time)) : 0;
      const x = prev.x + ((next?.x ?? prev.x) - prev.x) * f;
      const z = prev.z + ((next?.z ?? prev.z) - prev.z) * f;
      const yaw =
        prev.speed > 0.12 ? Math.atan2(prev.dx, prev.dz) : Math.atan2(look.x - x, look.z - z);
      root.position.set(x, 0, z);
      root.rotation.y = yaw;
      let action: PlayAction | undefined;
      holding = undefined;
      for (const entry of planned) {
        if (time >= entry.start) action = entry;
        if (time >= entry.at.time) holding = entry;
      }
      active = action;
      transfer = 0;
      clearPose();
      const delta = action ? time - action.at.time : 0;
      if (!action || delta > action.duration - action.marker + 0.16) {
        gait(prev, time, 1);
        mixer.update(0);
        return;
      }
      const lead = Math.max(1e-6, action.at.time - action.start);
      const blend =
        delta < 0
          ? ease(1 + delta / lead)
          : 1 - ease((delta - 0.11) / (action.duration - action.marker + 0.05));
      const elapsed =
        delta < 0
          ? action.from + (action.marker - action.from) * (1 + delta / lead)
          : action.marker + delta;
      const turn = Math.atan2(Math.sin(action.yaw - yaw), Math.cos(action.yaw - yaw));
      root.rotation.y += turn * blend;
      root.position.x += (action.position.x - root.position.x) * blend;
      root.position.z += (action.position.z - root.position.z) * blend;
      const height = action.position.y * blend;
      root.position.y = Math.max(0, height);
      if (blend < 1) gait(prev, time, 1 - blend);
      schedulePose(action.animation, elapsed, blend);
      mixer.update(0);
      if (height < 0) {
        legs[0][2].getWorldPosition(feet[0]);
        legs[1][2].getWorldPosition(feet[1]);
        root.position.y = height;
        root.updateMatrixWorld(true);
        for (const [i, [upper, lower, foot]] of legs.entries()) {
          lower.getWorldPosition(elbow);
          solveTwoBone(upper, lower, foot, feet[i as 0 | 1], elbow);
        }
      }
      if (action.at.kind === 'release' && delta < 0) transfer = ease((time - action.start) / 0.12);
      const fitWeight = ease(1 - Math.abs(delta) / 0.13);
      if (fitWeight > 0) {
        fit(action.side, action, fitWeight);
        if (action.twoHands) fit('l', action, fitWeight);
      }
    },
    /** The held ball follows the presented hand until the sim says it's released. */
    heldBall(into: Vector3) {
      if (!holding || holding.at.kind === 'release') return false;
      handPoint(holding.side, holding.twoHands, into);
      if (holding.twoHands) into.lerp(handPoint('l', true, current), 0.5);
      if (active && transfer > 0) into.lerp(handPoint(active.side, false, current), transfer);
      return true;
    },
    contactPoint(into: Vector3) {
      if (!holding) throw new Error('No active contact');
      handPoint(holding.side, holding.twoHands, into);
      if (holding.twoHands) into.lerp(handPoint('l', true, current), 0.5);
      return into;
    },
    contactError(ball: Vector3) {
      if (!holding) throw new Error('No active contact');
      const error = handPoint(holding.side, holding.twoHands, current).distanceTo(ball);
      return holding.twoHands
        ? Math.max(error, handPoint('l', true, current).distanceTo(ball))
        : error;
    },
    get actionName() {
      return holding?.animation;
    },
  };
}
