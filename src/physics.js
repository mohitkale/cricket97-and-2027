// A shared, locally bundled Rapier world. Classic mode simulates ball/turf;
// modern mode adds pitch contact, aerodynamics, and kinematic player capsules.
import {CRICKET,athleteScale,groundHeight} from './cricket-scale.js';
let world, ball, loading, RAPIER, modern=false, radius=.22, accumulator=0, controller;
const athletes=new Map();
export function initPhysics(options={}) {
  if (!loading) { modern=!!options.modern; radius=modern?CRICKET.ballRadius:.22; }
  if (!loading) loading = import('@dimforge/rapier3d-compat').then(async module => {
    RAPIER = module.default;
    await RAPIER.init();
    world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
    world.createCollider(RAPIER.ColliderDesc.cuboid(1000, .1, 1000)
      .setTranslation(0, -.1, 0).setFriction(.03).setRestitution(.48));
    ball = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setCanSleep(false)
      .setTranslation(0, 2, 0).setLinearDamping(modern?.006:.015).setCcdEnabled(modern));
    world.createCollider(RAPIER.ColliderDesc.ball(radius).setMass(modern?CRICKET.ballMass:.16).setCollisionGroups(modern?0x00010001:0xffffffff)
      .setFriction(.03).setRestitution(.48), ball);
    if(modern){
      world.createCollider(RAPIER.ColliderDesc.cuboid(2.5,.06,12.5).setTranslation(0,.06,0).setFriction(.12).setRestitution(.58));
      controller=world.createCharacterController(.015);
      controller.setApplyImpulsesToDynamicBodies(false);
    }
  });
  return loading;
}
export function resetBallPhysics() {
  accumulator=0;
  if (ball) ball.setAngvel({ x: 0, y: 0, z: 0 }, true);
}
export function setBallSpin(spin){if(ball)ball.setAngvel(spin,true);}
export function advanceBall(position, velocity, seconds, bounced = false, forces = null) {
  if (!world) throw new Error('Physics engine is not initialized');
  ball.setTranslation({ x: position.x, y: Math.max(radius, position.y), z: position.z }, true);
  ball.setLinvel({ x: velocity.x, y: velocity.y, z: velocity.z }, true);
  let remaining = Math.max(0, Math.min(seconds, .1));
  if(modern){accumulator+=remaining;remaining=Math.floor((accumulator+1e-9)*120)/120;accumulator-=remaining;}
  while (remaining > 1e-7) {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    if(modern){
      const v=ball.linvel(),w=ball.angvel(),speed=Math.hypot(v.x,v.y,v.z),drag=.0025*speed;
      // Calibrated game-scale aerodynamics, not a CFD simulation. Seam swing
      // is separate from the spin-induced Magnus force.
      ball.setLinvel({x:v.x+((forces?.swing||0)-drag*v.x+.0008*(w.y*v.z-w.z*v.y))*dt,y:v.y+(-drag*v.y+.0008*(w.z*v.x-w.x*v.z))*dt,z:v.z+(-drag*v.z+.0008*(w.x*v.y-w.y*v.x))*dt},true);
    }
    world.timestep = dt;
    world.step();
    let p = ball.translation(), v = ball.linvel();
    const floor=modern&&Math.abs(p.x)<2.5&&Math.abs(p.z)<12.5?.12:0;
    if (p.y <= radius+floor+.005) {
      bounced = true;
      if (p.y < radius+floor) ball.setTranslation({x:p.x, y:radius+floor, z:p.z}, true);
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
  position.x = p.x; position.y = Math.max(radius, p.y); position.z = p.z;
  velocity.x = v.x; velocity.y = v.y; velocity.z = v.z;
  return bounced;
}

/** Kinematic capsules constrain modern locomotion; cricket possession is a
 * separate hand/glove event so a torso cannot accidentally catch the ball. */
export function syncAthletes(models){
  if(!modern||!world)return;
  for(const model of models){
    let item=athletes.get(model.uuid);
    if(!item){
      const body=world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased());
      const scale=athleteScale(model);
      const collider=world.createCollider(RAPIER.ColliderDesc.capsule(1.15*scale,.35*scale).setCollisionGroups(0x00020002),body);
      item={body,collider};athletes.set(model.uuid,item);
    }
    const diving=['dive','slide','recover'].includes(model.userData?.fielding?.mode)&&model.rotation.x>.3;
    if(diving&&model.localToWorld){
      model.updateMatrixWorld(true);const center=model.localToWorld(model.position.clone().set(0,1.5,0));
      center.y=Math.max(center.y,.35*athleteScale(model)+.02+groundHeight(center.x,center.z));
      item.body.setTranslation(center,false);item.body.setRotation(model.quaternion,false);
    }else{
      // Keep the planar character capsule clear of the raised .12m pitch.
      // Feet are planted visually by IK; the pitch edge must not become an
      // invisible wall to a receiver stepping back onto the wicket square.
      item.body.setTranslation({x:model.position.x,y:CRICKET.pitchTop+1.52*athleteScale(model)+.02,z:model.position.z},false);item.body.setRotation({x:0,y:0,z:0,w:1},false);
    }
    // A rig reset/teleport must also replace the previous kinematic target;
    // otherwise the next physics step can restore an old delivery's pose.
    item.body.setNextKinematicTranslation(item.body.translation());
    item.body.setNextKinematicRotation(item.body.rotation());
  }
  world.propagateModifiedBodyPositionsToColliders();
}
export function constrainAthlete(id,position,step){
  const item=athletes.get(id);if(!item||!controller)return step;
  controller.computeColliderMovement(item.collider,{x:step.x,y:0,z:step.z},undefined,undefined,c=>c.handle!==item.collider.handle&&c.parent()?.handle!==ball.handle);
  const delta=controller.computedMovement();
  const current=item.body.translation();item.body.setNextKinematicTranslation({x:current.x+delta.x,y:current.y,z:current.z+delta.z});
  return {x:delta.x,z:delta.z};
}
