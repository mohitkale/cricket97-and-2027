// Angles are measured from the bowler's end, in world coordinates. The
// broadcast camera faces +Z, so its left is +X and its right is -X.
export const SHOTS = {
  'Left cover': { angle: 0.72, speed: 23, lift: 2.0, autoRun: true },
  'Right cover': { angle: -0.72, speed: 23, lift: 2.0, autoRun: true },
  'Attacking drive': { angle: 0, speed: 25, lift: 8.5, autoRun: true },
  'Defend': { angle: 0.15, speed: 8, lift: 0.6, autoRun: false },
  'Sweep': { angle: 2.2, speed: 18, lift: 2.8, autoRun: false },
  'Hook': { angle: -2.25, speed: 23, lift: 6, autoRun: true },
  'Pull': { angle: -1.45, speed: 22, lift: 3.5, autoRun: true },
  'Cut': { angle: 1.55, speed: 22, lift: 2.3, autoRun: true },
  'Flick': { angle: 2.8, speed: 17, lift: 1.4, autoRun: true },
};

export const SHOT_KEYS = {
  ArrowLeft: 'Left cover', ArrowRight: 'Right cover', ArrowUp: 'Attacking drive',
  ArrowDown: 'Defend', Space: 'Sweep',
  Digit1: 'Hook', Digit2: 'Pull', Digit3: 'Cut', Digit4: 'Flick',
};

export function canReachDelivery(name, height, line, easy = false) {
  if (Math.abs(line) > (easy ? 2 : 1.65)) return false;
  const upper = name === 'Defend' ? 1.9 : name === 'Sweep' ? 1.45 : 3.0;
  return height <= upper + (easy ? 0.45 : 0) && height >= 0.15;
}

export function shotVelocity(name, timing, random = Math.random, contact = {}) {
  const shot = SHOTS[name] || SHOTS['Attacking drive'];
  const quality = Math.max(0.55, Math.min(1, 1 - timing * 0.5));
  const angle = shot.angle + (random() - 0.5) * 0.22 + Math.max(-0.14, Math.min(0.14, (contact.line || 0) * 0.12));
  const speed = shot.speed * quality * (0.94 + random() * 0.12);
  const lift = Math.max(0.3, shot.lift + Math.max(-0.4, Math.min(1.2, ((contact.height ?? 0.8) - 0.8) * 0.5)));
  return { x: Math.sin(angle) * speed, y: lift, z: -Math.cos(angle) * speed, autoRun: shot.autoRun };
}
