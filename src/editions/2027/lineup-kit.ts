import {
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  type MeshStandardMaterial,
  type Object3D,
  type SkinnedMesh,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from 'three';

export const LINEUP_SIZE = 3;
const TILE = 256;

export interface LineupPlayer {
  name: string;
  number: number;
  gender: 'male' | 'female';
  team: string;
  color: number;
}

/** The lineup or field uses one canvas and GPU texture for its shirt names and numbers. */
export function createJerseyAtlas(playerCount = LINEUP_SIZE) {
  const canvas = document.createElement('canvas');
  const columns = Math.ceil(playerCount / 3);
  const rows = Math.ceil(playerCount / columns);
  const tileWidth = 320;
  canvas.width = tileWidth * columns;
  canvas.height = TILE * rows;
  const draw = canvas.getContext('2d');
  if (!draw) throw new Error('Jersey atlas requires Canvas 2D');
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return {
    texture,
    scale: new Vector2(1 / columns, 1 / rows),
    offset(slot: number) {
      return new Vector2((slot % columns) / columns, 1 - (Math.floor(slot / columns) + 1) / rows);
    },
    write(players: readonly LineupPlayer[]) {
      draw.clearRect(0, 0, canvas.width, canvas.height);
      draw.textAlign = 'center';
      draw.textBaseline = 'middle';
      players.forEach(({ name, number, color }, slot) => {
        const tileTop = Math.floor(slot / columns) * TILE;
        const center = ((slot % columns) + 0.5) * tileWidth;
        const jersey = new Color(color);
        const luminance = 0.2126 * jersey.r + 0.7152 * jersey.g + 0.0722 * jersey.b;
        draw.fillStyle = luminance > 0.45 ? '#142534' : '#f9fbff';
        draw.font = 'bold 61px Arial';
        const surname = name.trim().split(/\s+/).at(-1)?.toUpperCase() ?? '';
        draw.fillText(surname, center, tileTop + 37, 290);
        draw.font = 'bold 142px Arial';
        draw.fillText(String(number), center, tileTop + 154, 280);
      });
      texture.needsUpdate = true;
    },
  };
}

/** Resolve the meshopt-quantized rest positions once before a clip or stage transform runs. */
export function prepareJerseyProjection(root: Object3D): void {
  root.updateMatrixWorld(true);
  root.traverse((node) => {
    const mesh = node as SkinnedMesh;
    if (!mesh.isSkinnedMesh) return;
    const vertices = mesh.geometry.getAttribute('position').count;
    const rest = new Float32Array(vertices * 3);
    const point = new Vector3();
    for (let vertex = 0; vertex < vertices; vertex++) {
      mesh.getVertexPosition(vertex, point).applyMatrix4(mesh.matrixWorld);
      point.toArray(rest, vertex * 3);
    }
    mesh.geometry.setAttribute('jerseyRest', new Float32BufferAttribute(rest, 3));
  });
}

const TEAM_ACCENTS: Record<string, number> = {
  India: 0xe4b54e,
  Australia: 0x203c2f,
  England: 0xcad9ed,
  'West Indies': 0xe9ab7d,
  Pakistan: 0xd3e9d2,
  'South Africa': 0xebba48,
};

const SKIN_TINTS = [
  [0.92, 0.82, 0.75],
  [0.56, 0.36, 0.27],
  [0.73, 0.54, 0.44],
  [0.86, 0.68, 0.57],
] as const;

/** Project the lineup uniform onto the fitted body. The source texture stays on exposed skin. */
export function makeJersey(
  root: Object3D,
  atlas: ReturnType<typeof createJerseyAtlas>,
  slot: number,
) {
  const primary = new Color();
  const accent = new Color();
  const skinTint = new Color();
  const tileOffset = atlas.offset(slot);
  root.traverse((node) => {
    const mesh = node as SkinnedMesh;
    if (!mesh.isSkinnedMesh) return;
    const material = (mesh.material as MeshStandardMaterial).clone();
    mesh.material = material;
    material.onBeforeCompile = (shader) => {
      shader.uniforms.kitPrimary = { value: primary };
      shader.uniforms.kitAccent = { value: accent };
      shader.uniforms.kitAtlas = { value: atlas.texture };
      shader.uniforms.kitTileOffset = { value: tileOffset };
      shader.uniforms.kitTileScale = { value: atlas.scale };
      shader.uniforms.kitSkinTint = { value: skinTint };
      shader.vertexShader =
        `attribute vec3 jerseyRest; varying vec3 vJerseyRest;\n${shader.vertexShader}`.replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvJerseyRest = jerseyRest;',
        );
      shader.fragmentShader = `varying vec3 vJerseyRest;
        uniform vec3 kitPrimary;
        uniform vec3 kitAccent;
        uniform sampler2D kitAtlas;
        uniform vec2 kitTileOffset;
        uniform vec2 kitTileScale;
        uniform vec3 kitSkinTint;
        ${shader.fragmentShader}`
        .replace(
          '#include <map_fragment>',
          `#include <map_fragment>
        vec3 p = vJerseyRest;
        float sleeve = 1.0 - smoothstep(0.305, 0.312, abs(p.x));
        float neckline = 1.54 + smoothstep(0.04, 0.15, abs(p.x)) * 0.01;
        float shirt = sleeve * (1.0 - smoothstep(neckline, neckline + 0.007, p.y));
        float clothing = mix(1.0, shirt, smoothstep(0.98, 1.04, p.y));
        float shoulder = smoothstep(1.436, 1.447, p.y) * smoothstep(0.168, 0.184, abs(p.x));
        float cuff = smoothstep(0.289, 0.295, abs(p.x));
        float side = 1.0 - smoothstep(0.025, 0.055, abs(p.z));
        side *= smoothstep(0.136, 0.181, abs(p.x)) * (1.0 - smoothstep(1.25, 1.39, p.y));
        float upper = smoothstep(0.98, 1.03, p.y);
        vec2 weave = p.xy * 1750.0;
        vec2 weaveDetail = sin(weave) * (1.0 - smoothstep(vec2(0.7), vec2(2.4), fwidth(weave)));
        float knit = 0.985 + 0.015 * weaveDetail.x * weaveDetail.y;
        vec3 cloth = mix(kitPrimary * 0.60, kitPrimary, upper);
        cloth = mix(cloth, kitAccent, max(max(shoulder, cuff), side) * 0.86);
        cloth = mix(vec3(0.81, 0.85, 0.84), cloth, smoothstep(0.085, 0.118, p.y));
        vec3 exposed = diffuseColor.rgb * mix(kitSkinTint, vec3(1.0), smoothstep(1.69, 1.78, p.y));
        diffuseColor.rgb = mix(exposed, cloth * knit, clothing);
        vec2 printUV = vec2(0.5 - p.x / 0.32, (p.y - 1.093) / 0.374);
        vec2 within = step(vec2(0.0), printUV) * step(printUV, vec2(1.0));
        vec2 atlasUV = kitTileOffset + kitTileScale * clamp(printUV, 0.015, 0.985);
        vec4 ink = texture2D(kitAtlas, atlasUV);
        float rear = 1.0 - smoothstep(-0.062, -0.025, p.z);
        diffuseColor.rgb = mix(diffuseColor.rgb, ink.rgb,
          ink.a * within.x * within.y * rear * clothing);`,
        )
        .replace(
          '#include <normal_fragment_maps>',
          `#include <normal_fragment_maps>
        #ifdef USE_NORMALMAP_TANGENTSPACE
          vec3 fabricNormal = normalize(tbn * vec3(weaveDetail * 0.075, 1.0));
          normal = normalize(mix(normal, fabricNormal, clothing * 0.45));
        #endif`,
        );
    };
  });
  return ({ color, team, name }: LineupPlayer) => {
    primary.setHex(color);
    accent.setHex(TEAM_ACCENTS[team] ?? 0xc9d9d4);
    const tone = Array.from(name).reduce((sum, letter) => sum + (letter.codePointAt(0) ?? 0), 0);
    const [red, green, blue] = SKIN_TINTS[tone % SKIN_TINTS.length] ?? SKIN_TINTS[0];
    skinTint.setRGB(red, green, blue);
  };
}
