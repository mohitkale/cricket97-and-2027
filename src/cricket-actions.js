import * as THREE from 'three';
import {poseLocomotion,moveAthlete} from './athlete-motion.js';
import {gripBat,solveLeg,solveArm,plantStandingFeet} from './athlete.js';
import {athleteScale,ankleHeight} from './cricket-scale.js';

const clamp=THREE.MathUtils.clamp,smooth=x=>THREE.MathUtils.smoothstep(x,0,1);
const q=new THREE.Quaternion(),worldQ=new THREE.Quaternion();

export function poseBattingReady(p,{hand='right',striker=true}={}){
  const sign=hand==='left'?-1:1;p.userData.batHand=hand;
  p.rotation.set(.02,sign*Math.PI/2,0);p.userData.torso.rotation.set(.25,0,-sign*.12);
  p.userData.bat.position.set(0,2.25,.3);p.userData.bat.rotation.set(0,0,-sign*.18);
  plantStandingFeet(p);gripBat(p);
  p.userData.head.rotation.set(0,striker?sign*Math.PI/2:-sign*Math.PI/2,0);
}

export function poseKeeping(p,ball,velocity,dt){
  const scale=athleteScale(p),time=velocity?.z>1?clamp((13.1-ball.z)/velocity.z,0,.5):0;
  const predictedX=ball.z>0?ball.x+(velocity?.x||0)*time:0;
  const lowTake=ball.z>11&&ball.y<.6;
  const goal=new THREE.Vector3(clamp(predictedX,-2.4,2.4),0,lowTake?Math.max(13.1,ball.z+.75):13.1);
  moveAthlete(p,goal,dt,3.6,{facingYaw:Math.atan2(ball.x-p.position.x,ball.z-p.position.z)});
  const close=ball.distanceTo(p.position)<3,target=close?ball.clone():new THREE.Vector3(goal.x,1.4*scale,12.75);
  const crouch=clamp((2.2*scale-target.y)/(1.8*scale),0,1);
  p.rotation.x=.025;p.userData.torso.rotation.set(.25+1.3*crouch,0,.16*crouch);
  plantStandingFeet(p);
  if(p.worldToLocal(target.clone()).z>-.2){
    solveArm(p,0,target.clone().add(new THREE.Vector3(.035,0,0)));
    solveArm(p,1,target.clone().add(new THREE.Vector3(-.035,0,0)));
  }
}

/** Cricket delivery: accelerate, gather, front-foot plant, straight-arm
 * overhead release, and a step through. Release is at 1.8 seconds. */
export function poseBowling(p,t,dt,arm=1){
  const scale=athleteScale(p),side=arm===1?1:-1,m=p.userData.motor;
  const runTime=Math.min(t,1.8),topSpeed=9/(1.8-.175);
  p.position.z=-20+(runTime<.35?topSpeed*runTime*runTime/.7:topSpeed*(runTime-.175));
  m.speed=t<1.8?topSpeed*Math.min(1,t/.35):Math.max(0,4*(1-(t-1.8)/.65));m.vx=0;m.vz=m.speed;
  m.phase+=m.speed*dt/2.1*Math.PI*2;poseLocomotion(p,dt);
  if(t<1.1)return;
  const gather=smooth((t-1.1)/.35),delivery=smooth((t-1.45)/.35),follow=clamp((t-1.8)/.65,0,1);
  p.rotation.y=side*(.38*gather-.52*delivery+.14*follow);
  p.rotation.x=.06+.16*delivery+.12*Math.sin(follow*Math.PI);
  p.userData.torso.rotation.set(.08*delivery,side*(.3*gather-.48*delivery),0);
  p.userData.arms[arm].rotation.set(1.2*gather+2.45*delivery+1.9*follow,0,-side*.06);
  p.userData.elbows[arm].rotation.set(-.3*(1-delivery),0,0);
  p.userData.arms[1-arm].rotation.set(-2.7*gather+2.45*delivery,0,side*.12);
  p.userData.elbows[1-arm].rotation.set(-.4-.35*delivery,0,0);
  p.position.y+=Math.sin(clamp((t-1.25)/.48,0,1)*Math.PI)*.13*scale;
  if(delivery>.7&&follow<.2){
    const front=arm===1?0:1,foot=new THREE.Vector3(side*.12,ankleHeight(p),-10.85);
    solveLeg(p,front,foot);
  }
  if(follow){p.position.z=-11+2.2*follow;p.userData.knees[arm===1?1:0].rotation.x=.6*(1-follow);}
}

/** Animation-led technique over the shared shot choices. The contact pose
 * places the blade at the ball, with both hands on its handle. */
export function poseBatting(p,{phase,shot='Straight drive',contact,hand='right'}){
  const s=athleteScale(p),sign=hand==='left'?-1:1,bat=p.userData.bat;
  p.userData.batHand=hand;
  const load=smooth(phase/.2),down=smooth((phase-.2)/.23),follow=smooth((phase-.43)/.57);
  const sweep=shot==='Sweep',horizontal=['Cut','Pull','Hook'].includes(shot),defend=shot==='Defend';
  const step=(defend?.45:sweep?.7:horizontal?.25:1)*load;
  p.position.z=9.8-step*.1-.45*down;p.position.y=-.12+(.12-s*(sweep?.48:.2))*load;
  p.rotation.set(.06*(1-load)-.04*load,sign*Math.PI/2-sign*(.12*load+.18*down+.32*follow),0);
  const hinge=(sweep?1.35:.95)+clamp((1.1-contact.y),0,.8);
  p.userData.torso.rotation.set(.25*(1-load)-.1*load,sign*(.18*load-.35*down-.18*follow),-sign*hinge*down*(1-.8*follow));
  plantStandingFeet(p);
  const back=p.localToWorld(new THREE.Vector3(-sign*.12,2.35,.2));
  const hit=contact.clone();hit.y=clamp(hit.y,.2,1.65);
  worldQ.setFromEuler(new THREE.Euler(0,Math.PI,-sign*(sweep?1.35:horizontal?1.15:0)+follow*sign*(horizontal?1.6:.9)));
  const bladeOffset=new THREE.Vector3(0,-.93*s,0).applyQuaternion(worldQ);
  const grip=hit.clone().sub(bladeOffset);
  // Keep the pickup above the rear shoulder before the downswing.
  const position=back.clone().lerp(grip,down);
  position.y+=follow*(defend?.05:.6);position.z-=follow*(horizontal?.1:.35);
  position.x+=follow*sign*(sweep?.5:horizontal?.45:.15);
  bat.position.copy(p.worldToLocal(position.clone()));
  const backQ=new THREE.Quaternion().setFromEuler(new THREE.Euler(.15,0,-sign*2.25));
  q.copy(p.getWorldQuaternion(new THREE.Quaternion())).invert().multiply(worldQ);
  bat.quaternion.copy(backQ).slerp(q,down);
  // Fit the body to a reachable two-handed grip instead of stretching an
  // arm or leaving a glove behind the moving handle.
  for(let iteration=0;iteration<16;iteration++){
    const correction=new THREE.Vector3();p.updateMatrixWorld(true);
    for(let i=0;i<2;i++){
      const offset=i===(hand==='left'?1:0)?-.04:-.23;
      const wrist=position.clone().add(new THREE.Vector3(0,offset*s,0).applyQuaternion(worldQ));
      const shoulder=p.userData.arms[i].getWorldPosition(new THREE.Vector3()),delta=wrist.sub(shoulder),distance=delta.length();
      if(distance>.96*s)correction.addScaledVector(delta,(distance-.96*s)/distance);
    }
    correction.y=0;if(correction.lengthSq()<1e-8)break;correction.clampLength(0,.045);p.position.addScaledVector(correction,down);
    bat.position.copy(p.worldToLocal(position.clone()));
  }
  gripBat(p);
  const headYaw=Math.atan2(contact.x-p.position.x,contact.z-p.position.z)-p.rotation.y;p.userData.head.rotation.y=clamp(Math.atan2(Math.sin(headYaw),Math.cos(headYaw)),-1.3,1.3);
}
