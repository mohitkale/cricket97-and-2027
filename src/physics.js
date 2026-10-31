// Only the ball and a single turf collider are simulated. The engine and WASM
// are bundled locally, initialized once, and reused for the entire match.
let world, ball, loading, RAPIER;
export function initPhysics() {
  if (!loading) loading = import('@dimforge/rapier3d-compat').then(async module => {
    RAPIER = module.default;
    await RAPIER.init();
    world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
    world.createCollider(RAPIER.ColliderDesc.cuboid(1000, .1, 1000)
      .setTranslation(0, -.1, 0).setFriction(.03).setRestitution(.48));
    ball = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setCanSleep(false)
      .setTranslation(0, 2, 0).setLinearDamping(.015));
    world.createCollider(RAPIER.ColliderDesc.ball(.22).setMass(.16)
      .setFriction(.03).setRestitution(.48), ball);
  });
  return loading;
}
export function resetBallPhysics() {
  if (ball) ball.setAngvel({ x: 0, y: 0, z: 0 }, true);
}
export function advanceBall(position, velocity, seconds, bounced = false) {
  if (!world) throw new Error('Physics engine is not initialized');
  ball.setTranslation({ x: position.x, y: Math.max(.22, position.y), z: position.z }, true);
  ball.setLinvel({ x: velocity.x, y: velocity.y, z: velocity.z }, true);
  let remaining = Math.max(0, Math.min(seconds, .1));
  while (remaining > 1e-7) {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    world.timestep = dt;
    world.step();
    let p = ball.translation(), v = ball.linvel();
    if (p.y <= .225) {
      bounced = true;
      if (p.y < .22) ball.setTranslation({x:p.x, y:.22, z:p.z}, true);
      if (Math.abs(v.y) < .55) {
        // Rolling resistance approximates the outfield, separately from the
        // impact friction that Rapier computes on turf contact.
        const speed = Math.hypot(v.x, v.z);
        const factor = speed ? Math.max(0, speed - 3.4 * dt) / speed : 0;
        ball.setLinvel({ x:v.x * factor, y:0, z:v.z * factor }, true);
      }
    }
  }
  const p = ball.translation(), v = ball.linvel();
  position.x = p.x; position.y = Math.max(.22, p.y); position.z = p.z;
  velocity.x = v.x; velocity.y = v.y; velocity.z = v.z;
  return bounced;
}
