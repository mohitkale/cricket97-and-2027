import {
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  type Object3D,
  PlaneGeometry,
  type Quaternion,
  ShaderMaterial,
} from 'three';
import type { Vec3 } from '../sim/ball/ball';
import { BALL } from '../sim/units';

const TRAIL_POINTS = 19;

/** Present the sim's ball position and a seam orientation integrated by the caller. */
export function createBallView(model: Object3D) {
  const root = new Group();
  const ball = new Group();
  ball.add(model);
  root.add(ball);

  const opacity = { value: 0 };
  const shadow = new Mesh(
    new PlaneGeometry(1, 1),
    new ShaderMaterial({
      uniforms: { opacity },
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 spot;
        void main() {
          spot = uv * 2.0 - 1.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform float opacity;
        varying vec2 spot;
        void main() {
          float falloff = 1.0 - smoothstep(0.08, 1.0, length(spot));
          gl_FragColor = vec4(0.025, 0.045, 0.035, falloff * opacity);
        }`,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  root.add(shadow);

  const positions = new BufferAttribute(new Float32Array(TRAIL_POINTS * 3), 3);
  positions.setUsage(DynamicDrawUsage);
  const trail = new Line(
    new BufferGeometry().setAttribute('position', positions),
    new LineBasicMaterial({
      color: '#fff2c5',
      opacity: 0.68,
      transparent: true,
      depthWrite: false,
    }),
  );
  trail.frustumCulled = false;
  trail.visible = false;
  root.add(trail);

  return {
    root,
    setPose(position: Vec3, orientation: Quaternion, surfaceHeight: number) {
      ball.position.set(position.x, position.y, position.z);
      ball.quaternion.copy(orientation);
      const clearance = Math.max(0, position.y - surfaceHeight - BALL.radius);
      shadow.position.set(position.x, surfaceHeight + 0.003, position.z);
      shadow.scale.setScalar(BALL.radius * 3.6 + Math.min(0.12, clearance * 0.065));
      opacity.value = 0.65 / (1 + clearance * 5);
    },
    setTrail(samples: readonly Vec3[], through: number, head: Vec3, enabled: boolean) {
      trail.visible = enabled && through > 0;
      if (!trail.visible) return;
      const start = Math.max(0, through - TRAIL_POINTS + 2);
      let count = 0;
      for (let i = start; i <= through; i++) {
        const point = samples[i];
        if (point) positions.setXYZ(count++, point.x, point.y, point.z);
      }
      positions.setXYZ(count++, head.x, head.y, head.z);
      positions.needsUpdate = true;
      trail.geometry.setDrawRange(0, count);
    },
    dispose() {
      shadow.geometry.dispose();
      shadow.material.dispose();
      trail.geometry.dispose();
      trail.material.dispose();
      root.removeFromParent();
    },
  };
}
