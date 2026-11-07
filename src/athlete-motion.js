import * as THREE from 'three';
import { createMotor, stepMotor, wrapAngle } from './locomotion.js';
import { constrainAthlete } from './physics.js';
import { solveArm, solveLeg } from './athlete.js';
import {athleteScale,ankleHeight,groundHeight} from './cricket-scale.js';

const jointEuler=new THREE.Euler(),jointQuaternion=new THREE.Quaternion();
function blendJoint(joint,x,y,z,blend){
  jointQuaternion.setFromEuler(jointEuler.set(x,y,z));
  joint.quaternion.slerp(jointQuaternion,blend);
}

export function resetMotor(p){p.userData.motor=createMotor(p.userData.identityPhase||0);p.userData.fielding=null;p.userData.torso?.rotation.set(0,0,0);}
export function moveAthlete(p,target,dt,maxSpeed=7.5,options={}){
  const m=p.userData.motor||(p.userData.motor=createMotor(p.userData.identityPhase||0));
  const step=stepMotor(m,p.position,p.rotation.y,target,dt,maxSpeed,options);
  const allowed=constrainAthlete(p.uuid,p.position,step);
  p.position.x+=allowed.x;p.position.z+=allowed.z;p.rotation.y=step.yaw;
  if(dt>0){m.vx=allowed.x/dt;m.vz=allowed.z/dt;m.speed=Math.hypot(m.vx,m.vz);}
  poseLocomotion(p,dt);return m.speed;
}
export function turnAthlete(p,target,dt){
  const yaw=Math.atan2(target.x-p.position.x,target.z-p.position.z);
  p.rotation.y+=THREE.MathUtils.clamp(wrapAngle(yaw-p.rotation.y),-4*dt,4*dt);
}
export function poseLocomotion(p,dt,speedOverride){
  const m=p.userData.motor||(p.userData.motor=createMotor(p.userData.identityPhase||0));
  const scale=athleteScale(p),speed=speedOverride??m.speed,blend=1-Math.exp(-14*dt),stride=Math.cos(m.phase)*Math.min(.72,speed*.1);
  const forward=m.vx*Math.sin(p.rotation.y)+m.vz*Math.cos(p.rotation.y),sideways=m.vx*Math.cos(p.rotation.y)-m.vz*Math.sin(p.rotation.y),backwards=forward<-.2;
  const gait=backwards?-stride*.6:stride;
  const sideLean=THREE.MathUtils.clamp(sideways*.018,-.1,.1);
  p.userData.arms.forEach((a,i)=>{
    a.scale.y=1;
    blendJoint(a,backwards?-.18+(i?-gait:gait)*.25:-.08+(i?-gait:gait)*.72,0,(i?-1:1)*(backwards?.26:.1)-sideLean,blend);
  });
  // The rig faces +Z. Negative elbow flexion brings the hand in front;
  // positive X flexion folds the forearm behind the athlete.
  p.userData.elbows.forEach(e=>blendJoint(e,backwards?-.95:-.28-Math.min(.8,speed*.1),0,0,blend));
  if(p.userData.torso)blendJoint(p.userData.torso,backwards?-.04:Math.min(.07,speed*.01),Math.sin(m.phase)*Math.min(.09,speed*.013),-sideLean*.45,blend);
  p.position.y+=((speed>.2?-Math.min(.25,speed*.042)+Math.cos(m.phase*2)*Math.min(.03,speed*.005):0)*scale-p.position.y)*blend;
  p.rotation.x+=((backwards?-.04:Math.min(.12,speed*.016))-p.rotation.x)*blend;
  p.rotation.z+=(-THREE.MathUtils.clamp(m.turnVelocity*.025,-.13,.13)-p.rotation.z)*blend;
  // Alternate a grounded support foot and a lifted return step. IK keeps
  // knees bending backwards and feet clear of the turf at every heading.
  const travel=new THREE.Vector2(sideways,forward),length=travel.length();
  if(length>.1)travel.divideScalar(length);else travel.set(0,1);
  const reach=Math.min(.7,speed*.08);
  const duty=THREE.MathUtils.lerp(.62,.27,THREE.MathUtils.clamp((speed-1.5)/6.7,0,1));
  const plants=m.footPlants||(m.footPlants=[]);
  for(let i=0;i<2;i++){
    const cycle=(((m.phase+i*Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2))/(Math.PI*2),stance=cycle<duty;
    const swing=THREE.MathUtils.clamp((cycle-duty)/(1-duty),0,1);
    const along=stance?reach:reach*(-1+2*swing);
    const lift=stance?0:Math.sin(swing*Math.PI)*Math.min(.32,speed*.045);
    const foot=p.localToWorld(new THREE.Vector3((i?-.23:.23)+travel.x*along,0,travel.y*along));foot.y=ankleHeight(p)+lift*scale;
    if(stance){
      if(!plants[i]?.stance||plants[i].point.distanceTo(p.position)>2*scale)plants[i]={stance:true,point:foot.clone()};
      foot.copy(plants[i].point);foot.y=ankleHeight(p);
    }else if(plants[i])plants[i].stance=false;
    solveLeg(p,i,foot);
  }
  if(p.userData.bat&&speed>.2){
    const carry=p.userData.batHand==='left'?0:1;
    p.userData.bat.position.set(carry?-.38:.38,1.95,.22);p.userData.bat.rotation.set(.2,0,carry?-.55:.55);
    p.updateMatrixWorld(true);solveArm(p,carry,p.userData.bat.localToWorld(new THREE.Vector3(0,-.15,0)));
  }
}

export function coastAthlete(p,dt,braking=9){
  const m=p.userData.motor;if(!m)return;
  const speed=Math.hypot(m.vx,m.vz),next=Math.max(0,speed-braking*dt),factor=speed?next/speed:0;
  const step={x:m.vx*dt*(1+factor)*.5,z:m.vz*dt*(1+factor)*.5},allowed=constrainAthlete(p.uuid,p.position,step);
  p.position.x+=allowed.x;p.position.z+=allowed.z;m.vx*=factor;m.vz*=factor;m.speed=next;m.phase+=Math.hypot(allowed.x,allowed.z)/2.6*Math.PI*2;
  poseLocomotion(p,dt);
  if(next>1)p.rotation.x-=Math.min(.16,next*.018);
}
export function idleAthlete(p,seconds,dt){
  const phase=p.userData.identityPhase||0,blend=1-Math.exp(-5*dt);
  p.position.y+=(Math.sin(seconds*1.8+phase)*.009-p.position.y)*blend;
  p.userData.elbows.forEach((e,i)=>blendJoint(e,-.22+Math.sin(seconds*1.6+phase+i)*.035,0,0,blend));
}

/** A running batter lowers and stretches the bat in the last few metres.
 * Its rendered toe is the same point used by the run-out grounding check. */
export function groundRunningBat(p,endZ){
  if(!p.userData.bat)return;
  const distance=Math.abs(p.position.z-endZ),blend=THREE.MathUtils.clamp((3.2-distance)/1.3,0,1);
  if(!blend)return;
  p.rotation.x+=(.42-p.rotation.x)*blend;p.userData.torso.rotation.x+=(.35-p.userData.torso.rotation.x)*blend;
  p.updateMatrixWorld(true);
  const carry=p.userData.batHand==='left'?0:1;
  const scale=athleteScale(p),bat=p.userData.bat,grip=p.localToWorld(new THREE.Vector3(carry?-.25:.25,1.75,.55)),drop=THREE.MathUtils.clamp(grip.y-(groundHeight(p.position.x,p.position.z)+.02),.2*scale,1.485*scale);
  const forward=Math.sqrt((1.49*scale)**2-drop*drop),direction=endZ<0?-1:1;
  const worldRotation=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,-1,0),new THREE.Vector3(0,-drop,direction*forward).normalize());
  const localRotation=p.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(worldRotation);
  bat.position.lerp(p.worldToLocal(grip.clone()),blend);bat.quaternion.slerp(localRotation,blend);
  p.updateMatrixWorld(true);solveArm(p,carry,bat.localToWorld(new THREE.Vector3(0,-.15,0)));
}
