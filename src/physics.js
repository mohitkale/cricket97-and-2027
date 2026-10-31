// Distances are approximately metres and time is in seconds. Integrate in small
// steps so a slow frame cannot send the ball through the ground.
export function advanceBall(position, velocity, seconds, bounced = false) {
  let remaining = Math.max(0, Math.min(seconds, 0.1));
  while (remaining > 0) {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    const grounded = position.y <= 0.22 && velocity.y <= 0;
    if (!grounded) velocity.y -= 9.81 * dt;
    position.x += velocity.x * dt;
    position.y += velocity.y * dt;
    position.z += velocity.z * dt;
    if (position.y <= 0.22) {
      position.y = 0.22;
      if (!grounded && velocity.y < -0.8) {
        velocity.y = -velocity.y * 0.42;
        velocity.x *= 0.88;
        velocity.z *= 0.88;
        bounced = true;
      } else {
        velocity.y = 0;
        bounced = true;
        const speed = Math.hypot(velocity.x, velocity.z);
        const next = Math.max(0, speed - 3.4 * dt);
        const factor = speed ? next / speed : 0;
        velocity.x *= factor;
        velocity.z *= factor;
      }
    }
  }
  return bounced;
}
