// Usage: node scripts/fit-striker.mjs CesiumMan.glb
// Convert the stock bind pose to the rest pose used by attachAthleteSkin.
import fs from 'node:fs';
import { BufferGeometry, Float32BufferAttribute, Matrix4, Quaternion, Uint16BufferAttribute, Vector3 } from 'three';

const file = fs.readFileSync(process.argv[2]);
const jsonLength = file.readUInt32LE(12);
const gltf = JSON.parse(file.toString('utf8', 20, 20 + jsonLength));
const binary = file.subarray(28 + jsonLength);
function attribute(index, width) {
  const a = gltf.accessors[index], view = gltf.bufferViews[a.bufferView];
  const Type = a.componentType === 5123 ? Uint16Array : Float32Array;
  return new Type(binary.buffer, binary.byteOffset + (view.byteOffset || 0) + (a.byteOffset || 0), a.count * width);
}
const indices = attribute(0, 1), joints = attribute(1, 4), positions = attribute(3, 3);
const weights = attribute(5, 4), inverseBind = attribute(gltf.skins[0].inverseBindMatrices, 16);
// Source is Z-up and faces positive X. Keep a right-handed basis.
const convert = v => new Vector3(v.y, v.z, v.x);
const source = gltf.skins[0].joints.map((_, i) => convert(new Vector3().setFromMatrixPosition(
  new Matrix4().fromArray(inverseBind, i * 16).invert())));
const target = [[0,1.6,0],[0,2.04,0],[0,2.8,0],[0,2.98,0],[0,3.12,0],
  [.5,2.8,0],[-.5,2.8,0],[.5,2.31,0],[-.5,2.31,0],[.5,1.81,.018],[-.5,1.81,.018],
  [.2,1.48,0],[-.2,1.48,0],[.2,.78,0],[-.2,.78,0],[.2,.1,0],[-.2,.1,0],[.2,.05,.17],[-.2,.05,.17]].map(p => new Vector3(...p));
const child = [1,2,3,4,4,7,8,9,10,9,10,13,14,15,16,17,18,17,18];
const rig = [0,1,1,1,1,2,6,3,7,3,7,4,8,5,9,5,9,5,9];
const transforms = child.map((end, i) => {
  const from = source[end].clone().sub(source[i]), to = target[end].clone().sub(target[i]);
  const scale = from.length() ? to.length() / from.length() : 2.4;
  return { scale, rotation: new Quaternion().setFromUnitVectors(from.normalize(), to.normalize()) };
});
const fitted = [], mapped = [], region = [], keep = [];
for (let i = 0; i < positions.length / 3; i++) {
  const p = convert(new Vector3().fromArray(positions, i * 3)), result = new Vector3();
  let dominant = 0, largest = -1;
  for (let k = 0; k < 4; k++) {
    const j = joints[4*i+k], weight = weights[4*i+k], { rotation, scale } = transforms[j];
    mapped.push(rig[j]);
    if (weight > largest) { largest = weight; dominant = j; }
    result.addScaledVector(p.clone().sub(source[j]).applyQuaternion(rotation).multiplyScalar(scale).add(target[j]), weight);
  }
  fitted.push(...result.toArray());
  keep.push(dominant < 3 || (dominant >= 5 && dominant <= 8) || (dominant >= 11 && dominant <= 14));
  region.push(dominant >= 5 && dominant <= 8 && result.y < 2.5 ? 1 : 0);
}
const groups = [[], []];
for (let i = 0; i < indices.length; i += 3) {
  const triangle = indices.slice(i,i+3);
  if (triangle.every(v => keep[v])) groups[Number(triangle.reduce((sum,v) => sum+region[v],0)>=2)].push(...triangle);
}
// Discard unreferenced head and equipment vertices before download and skinning.
const used = [...new Set(groups.flat())];
const compact = new Map(used.map((original, index) => [original, index]));
function components(values, width) {
  return used.flatMap(index => Array.from(values.slice(index * width, (index + 1) * width)));
}
const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(components(fitted,3),3));
geometry.setAttribute('skinIndex', new Uint16BufferAttribute(components(mapped,4),4));
geometry.setAttribute('skinWeight', new Float32BufferAttribute(components(weights,4),4));
geometry.setIndex(groups.flat().map(index => compact.get(index)));
geometry.addGroup(0,groups[0].length,0);
geometry.addGroup(groups[0].length,groups[1].length,1);
geometry.computeVertexNormals();
fs.writeFileSync('public/legacy/models/striker-body.json', JSON.stringify(geometry.toJSON()));
