import {
  AnimationMixer,
  MathUtils,
  type Object3D,
  type Scene,
  type SkinnedMesh,
  type Vector3,
} from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { BODY_LODS, DEFAULT_STATURE } from '../../anim/skeleton';
import { blendGaits } from '../../anim/warp';
import { loadClips } from '../../render/assets';
import { asCharacter } from '../../render/character';
import { createJerseyAtlas, type LineupPlayer, makeJersey } from './lineup-kit';
import { loadPlayerBodies } from './player-bodies';

// Displacement per cycle in the publisher's CC0 UAL1_Standard_RM.glb (metres).
const GROUND_CYCLES = [
  { name: 'Walk_Loop', metres: 1.3 },
  { name: 'Jog_Fwd_Loop', metres: 5 },
  { name: 'Sprint_Loop', metres: 5.5 },
];

interface FieldingSource extends Object3D {
  userData: {
    fielding?: { mode: string } | null;
    motor?: { vx: number; vz: number };
  };
}

export function canRenderForwardFielding(mode: string, facing: number, vx: number, vz: number) {
  if (mode !== 'ready' && mode !== 'pursuit' && mode !== 'brake') return false;
  const speed = Math.hypot(vx, vz);
  return speed <= 0.3 || (vx * Math.sin(facing) + vz * Math.cos(facing)) / speed >= 0.65;
}

export function outfieldLod(distance: number, phone: boolean) {
  if (distance < (phone ? 10 : 15)) return 0;
  return distance < (phone ? 22 : 32) ? 1 : 2;
}

/** Render-only substitution. Match actors still own placement, contacts and outcomes. */
export async function loadLiveFielders(
  scene: Scene,
  sources: readonly FieldingSource[],
  groundHeight: (x: number, z: number) => number,
) {
  const [bodies, idleClips, gaitClips] = await Promise.all([
    loadPlayerBodies(),
    loadClips('clips/ual1-candidates.glb'),
    loadClips('clips/ual1-fielding.glb'),
  ]);
  const idleClip = idleClips.find((clip) => clip.name === 'Idle_Loop');
  if (!idleClip) throw new Error('Live fielders require Idle_Loop');
  const gaits = GROUND_CYCLES.map(({ name, metres }) => {
    const clip = gaitClips.find((candidate) => candidate.name === name);
    if (!clip || clip.duration <= 0) throw new Error(`Missing fielder clip ${name}`);
    return { clip, speed: metres / clip.duration };
  });
  const atlas = createJerseyAtlas(sources.length);
  const makeActor = (gender: LineupPlayer['gender'], slot: number) => {
    const character = asCharacter(clone(bodies[gender]));
    const mixer = new AnimationMixer(character.root);
    const idle = mixer.clipAction(idleClip).play();
    const actions = gaits.map(({ clip }) => mixer.clipAction(clip).play());
    const stature = gender === 'female' ? 1.71 : 1.83;
    character.setStature(stature);
    const dress = makeJersey(character.root, atlas, slot);
    character.root.visible = false;
    character.root.traverse((node) => {
      if ((node as SkinnedMesh).isSkinnedMesh) node.castShadow = true;
    });
    return {
      gender,
      character,
      mixer,
      idle,
      actions,
      dress,
      stature,
      weights: gaits.map(() => 0),
      cycle: 0,
      idleTime: slot * 0.23,
      lod: -1,
    };
  };
  const actors: Array<ReturnType<typeof makeActor> | undefined> = [];
  const stats = { active: 0, moving: 0, male: 0, female: 0, triangles: 0 };

  return {
    setPlayers(players: readonly LineupPlayer[]) {
      atlas.write(players);
      players.forEach((player, slot) => {
        let actor = actors[slot];
        if (actor?.gender !== player.gender) {
          if (actor) {
            scene.remove(actor.character.root);
            actor.character.root.traverse((node) => {
              const mesh = node as SkinnedMesh;
              if (mesh.isSkinnedMesh && !Array.isArray(mesh.material)) mesh.material.dispose();
            });
          }
          actor = makeActor(player.gender, slot);
          actors[slot] = actor;
          scene.add(actor.character.root);
        }
        actor.dress(player);
      });
    },

    update(
      camera: Vector3,
      dt: number,
      allow: boolean,
      phone: boolean,
      carrier: Object3D | undefined,
      receiver: Object3D | undefined,
    ) {
      stats.active = stats.moving = stats.male = stats.female = stats.triangles = 0;
      for (let slot = 0; slot < sources.length; slot++) {
        const source = sources[slot];
        const actor = actors[slot];
        if (!source || !actor) continue;
        const { character, mixer, actions, idle, weights } = actor;
        const fielding = source.userData.fielding;
        const mode = fielding?.mode ?? 'ready';
        const { vx = 0, vz = 0 } = source.userData.motor ?? {};
        const heading = source.rotation.y;
        const show =
          allow &&
          source !== carrier &&
          source !== receiver &&
          canRenderForwardFielding(mode, heading, vx, vz);
        character.root.visible = show;
        source.visible = !show;
        if (!show) continue;

        const { x, z } = source.position;
        character.root.position.set(x, groundHeight(x, z), z);
        character.root.rotation.y = heading;
        const lod = outfieldLod(camera.distanceTo(character.root.position), phone);
        if (lod !== actor.lod) {
          character.setLod(lod);
          actor.lod = lod;
        }

        const speed = Math.hypot(vx, vz);
        const moving = MathUtils.smoothstep(speed, 0.2, 0.8);
        const rate = blendGaits(gaits, speed * (DEFAULT_STATURE / actor.stature), weights);
        let duration = 0;
        for (const [index, gait] of gaits.entries())
          duration += (weights[index] ?? 0) * gait.clip.duration;
        if (duration > 0 && moving > 0) actor.cycle = (actor.cycle + (dt * rate) / duration) % 1;
        actor.idleTime = (actor.idleTime + dt) % idleClip.duration;
        idle.time = actor.idleTime;
        idle.setEffectiveWeight(1 - moving);
        for (const [index, action] of actions.entries()) {
          action.time = actor.cycle * action.getClip().duration;
          action.setEffectiveWeight((weights[index] ?? 0) * moving);
        }
        mixer.update(0);
        stats.active++;
        stats[actor.gender]++;
        if (moving > 0.5) stats.moving++;
        stats.triangles += BODY_LODS[lod];
      }
      return stats;
    },
  };
}
