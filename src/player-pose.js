/** Geometry-independent handedness defaults used by the match renderer. */
export function battingSetup(hand, striker = true) {
  const sign = hand === 'left' ? -1 : 1;
  return { hand: sign < 0 ? 'left' : 'right', sign, yaw: sign * Math.PI / 2, headYaw: striker ? sign * Math.PI / 2 : -sign * Math.PI / 2 };
}
export function bowlingHome(hand) {
  return { x: hand === 'left' ? -1.5 : 1.5, y: 0, z: -20, arm: hand === 'left' ? 0 : 1 };
}

/** Rotate the bowling shoulder up over the head and forward before release. */
export function bowlingArmAngle(time) {
  const progress = Math.max(0, Math.min(1, (time - 1.05) / 0.75));
  return progress * Math.PI * 1.5;
}

/** Return a bowler model to the start of its run-up on every delivery. */
export function resetBowlerModel(model, hand) {
  const home = bowlingHome(hand);
  model.position.set(home.x, home.y, home.z);
  model.rotation.set(0, 0, 0);
  model.userData.arms.forEach(arm => arm.rotation.set(0, 0, 0));
  model.userData.legs.forEach(leg => leg.rotation.set(0, 0, 0));
  model.userData.knees?.forEach(knee => knee.rotation.set(0, 0, 0));
  model.userData.elbows?.forEach(elbow => elbow.rotation.set(0, 0, 0));
  model.userData.arms.forEach(arm => { if (arm.scale) arm.scale.y = 1; });
  return home;
}

/** Reset a fielder after a chase without retaining the pickup pose. */
export function resetFielderModel(model) {
  model.position.copy(model.userData.home);
  model.rotation.x = 0;
  model.rotation.z = 0;
  model.userData.arms.forEach(arm => arm.rotation.set(0, 0, 0));
  model.userData.legs.forEach(leg => leg.rotation.set(0, 0, 0));
  model.userData.knees?.forEach(knee => knee.rotation.set(0, 0, 0));
  model.userData.elbows?.forEach(elbow => elbow.rotation.set(0, 0, 0));
  model.userData.arms.forEach(arm => { if (arm.scale) arm.scale.y = 1; });
}

/** Keep the non-striker on the other side of the pitch from the run-up. */
export function nonStrikerPosition(hand) {
  const home = bowlingHome(hand);
  return { x: home.x > 0 ? -2.4 : 2.4, y: 0, z: -9.75 };
}
