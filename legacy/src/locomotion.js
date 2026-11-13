const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const wrapAngle=a=>Math.atan2(Math.sin(a),Math.cos(a));
export function createMotor(seed=0){return {vx:0,vz:0,phase:seed,distance:0,speed:0,runSpeed:0,turnVelocity:0};}

/** A bounded acceleration/turning motor; expressed independently of Three.js. */
export function stepMotor(motor,position,yaw,target,dt,maxSpeed=7.5,options={}) {
  dt=clamp(dt,0,.1);if(!dt)return {x:0,z:0,yaw,distance:0};
  const dx=target.x-position.x,dz=target.z-position.z,d=Math.hypot(dx,dz);
  const desiredYaw=options.facingYaw??(d>.05?Math.atan2(dx,dz):yaw),error=wrapAngle(desiredYaw-yaw);
  const turn=clamp(error,-5.2*dt,5.2*dt),nextYaw=yaw+turn;
  const braking=12,desiredSpeed=Math.min(maxSpeed,Math.sqrt(2*braking*Math.max(0,d-.12)))*(options.facingYaw===undefined?Math.max(.12,Math.cos(error*.65)):1);
  const desiredX=d>.12?dx/d*desiredSpeed:0,desiredZ=d>.12?dz/d*desiredSpeed:0;
  const ax=desiredX-motor.vx,az=desiredZ-motor.vz,a=Math.hypot(ax,az);
  const limit=(desiredSpeed<motor.speed?braking:8.5)*dt,factor=a>0?Math.min(1,limit/a):0;
  motor.vx+=ax*factor;motor.vz+=az*factor;
  let x=motor.vx*dt,z=motor.vz*dt;
  if(d<.13&&Math.hypot(x,z)<.03){x=0;z=0;motor.vx=0;motor.vz=0;}
  const travelled=Math.hypot(x,z);motor.speed=Math.hypot(motor.vx,motor.vz);motor.distance+=travelled;
  motor.phase+=travelled/(motor.speed>4?2.6:1.8)*Math.PI*2;motor.turnVelocity=turn/dt;
  return {x,z,yaw:nextYaw,distance:travelled};
}

// Smooth launch, braking, and crease turn without changing the classic rules.
// runProgress remains the shared scoring/return-to-crease state.
export function advanceAthleticRun(run,dt) {
  if(!run.runActive){run.runnerVelocity=0;return 0;}
  const direction=run.runReturning?-1:1,remaining=direction<0?run.runProgress:1-run.runProgress;
  const desired=direction*Math.min(8.2,Math.sqrt(Math.max(0,remaining)*19.55*2*13)+1.1);
  const current=run.runnerVelocity||0,change=clamp(desired-current,-12*dt,12*dt);
  run.runnerVelocity=current+change;
  return Math.max(0,run.runnerVelocity*direction)*dt/19.55*2.7;
}
