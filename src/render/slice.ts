import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DirectionalLight,
  HemisphereLight,
  Object3D,
  PCFSoftShadowMap,
  Quaternion,
  type Scene,
  Vector3,
  type WebGLRenderer,
} from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import type { End } from '../sim/agents/running';
import type { WicketBreak } from '../sim/match/delivery';
import { PITCH } from '../sim/units';
import { loadModel } from './assets';
import { WICKET_PIECES, type WicketPiece, wicketPose } from './wicket';

/** The first-ball ground (issue #26), in the sim's frame. */
export interface SliceGround {
  /** Pose the striker's wicket `since` seconds after it was broken (rest pose for null). */
  breakWicket(hit: WicketBreak | null, since: number): void;
}

/** Shadow map size for the sun: the phone tier's budget, enough for contact shadows at the crease. */
const SHADOW_MAP = 1024;

export async function addSliceGround(scene: Scene, renderer: WebGLRenderer): Promise<SliceGround> {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  // The sky shader is physically based; without tone mapping it renders white.
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.6;

  const [ground, bowlerEnd, strikerEnd] = await Promise.all([
    loadModel('ground/slice-ground.glb'),
    loadModel('equipment/stumps.glb'),
    loadModel('equipment/stumps.glb'),
  ]);
  ground.traverse((node) => {
    node.receiveShadow = true;
  });
  scene.add(ground);
  bowlerEnd.rotation.y = Math.PI;
  strikerEnd.position.z = PITCH.length;
  for (const wicket of [bowlerEnd, strikerEnd]) {
    wicket.traverse((node) => {
      node.castShadow = true;
    });
    scene.add(wicket);
  }

  // Afternoon sun from over the bowler's shoulder, the shadow box tight on the striker's end.
  const sun = new DirectionalLight('#fff4e0', 2.6);
  sun.position.set(-6, 14, PITCH.length - 10);
  sun.target.position.set(0, 0, PITCH.length);
  sun.castShadow = true;
  sun.shadow.mapSize.set(SHADOW_MAP, SHADOW_MAP);
  Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 40 });
  sun.shadow.radius = 3;
  sun.shadow.bias = -0.0005;
  scene.add(sun, sun.target);
  scene.add(new HemisphereLight('#bcd7ff', '#3d5a2a', 0.9), new AmbientLight('#ffffff', 0.2));

  const sky = new Sky();
  sky.scale.setScalar(450);
  const uniforms = sky.material.uniforms;
  uniforms.turbidity && (uniforms.turbidity.value = 4);
  uniforms.rayleigh && (uniforms.rayleigh.value = 1.2);
  uniforms.sunPosition?.value.copy(sun.position).normalize();
  scene.add(sky);
  scene.background = new Color('#9cc4e8');

  // Each piece hangs from a pivot at its rest position (a stump's foot, a bail's centre).
  // The break moves the pivot; the piece keeps its own transform, which holds the asset
  // build's quantization scale and offset.
  const pieces = (
    Object.entries({ striker: strikerEnd, bowler: bowlerEnd }) as [End, Object3D][]
  ).map(([end, wicket]) => ({
    end,
    items: (Object.entries(WICKET_PIECES) as [WicketPiece, readonly number[]][]).map(
      ([name, rest]) => {
        const node = wicket.getObjectByName(name);
        if (!node) throw new Error(`stumps.glb has no ${name}`);
        const pivot = new Object3D();
        pivot.position.set(rest[0] ?? 0, rest[1] ?? 0, rest[2] ?? 0);
        wicket.add(pivot);
        node.position.sub(pivot.position);
        pivot.add(node);
        return [name, pivot] as const;
      },
    ),
  }));
  const axis = new Vector3();
  const turn = new Quaternion();
  return {
    breakWicket(hit, since) {
      for (const { end, items } of pieces) {
        const active = end === (hit?.end ?? 'striker') ? hit : null;
        const local =
          active && end === 'bowler'
            ? {
                ...active,
                at: { ...active.at, x: -active.at.x },
                vel: { x: -active.vel.x, y: active.vel.y, z: -active.vel.z },
              }
            : active;
        const pose = wicketPose(local, since);
        for (const [name, node] of items) {
          const { position, axis: around, angle } = pose[name];
          node.position.set(...position);
          node.quaternion.copy(turn.setFromAxisAngle(axis.set(...around), angle));
        }
      }
    },
  };
}
