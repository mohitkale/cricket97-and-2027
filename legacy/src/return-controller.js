import * as THREE from 'three';
import {athleteScale,gloveRadius,CRICKET} from './cricket-scale.js';
import {moveAthlete,turnAthlete} from './athlete-motion.js';
import {solveArm,plantFeet,plantStandingFeet} from './athlete.js';
import {handPoint} from './fielding-controller.js';
import {arrivalTime,sweptContact} from './fielding-planner.js';
import {advanceBall,resetBallPhysics,setBallSpin,syncAthletes} from './physics.js';
import {ENDS,chooseReturnEnd,returnThrowLaunch,sweptWicketHit,groundedAtCrease} from './return-throw.js';
import {wrapAngle} from './locomotion.js';

export function runnerGroundPoints(p){
  const points=p.userData.knees.map(k=>k.localToWorld(new THREE.Vector3(0,-.75,.105)));
  if(p.userData.bat)points.push(p.userData.bat.localToWorld(new THREE.Vector3(0,-1.49,0)));
  return points;
}

// The same held-ball contact decides a return or a keeper's stumping attempt.
export function touchWicketWithBall(receiver, hand, ballPosition, end, elapsed, dt) {
  const wicket=ENDS[end], before=ballPosition.clone(), scale=athleteScale(receiver);
  const goal=new THREE.Vector3(.22*scale,0,wicket.wicket+wicket.direction*.7*scale);
  const facingYaw=Math.atan2(-receiver.position.x,wicket.wicket-receiver.position.z);
  moveAthlete(receiver,goal,dt,4.8,{facingYaw});
  receiver.rotation.x=.025;
  receiver.userData.torso.rotation.set(1.45*Math.min(1,elapsed/.3),0,0);
  plantStandingFeet(receiver);
  solveArm(receiver,hand,new THREE.Vector3(0,CRICKET.pitchTop+.45,wicket.wicket));
  ballPosition.copy(handPoint(receiver,hand));
  return sweptWicketHit(before,ballPosition,end);
}

/** Release, flight, glove possession, and wicket contact are separate events.
 * Receivers run into position; neither receiver nor ball is teleported. */
export class ReturnController{
  constructor({players,keeper,fielding}){this.players=players;this.keeper=keeper;this.fielding=fielding;}
  prepare({fielder,batters,run,random=Math.random}){
    const end=chooseReturnEnd(fielder.position,batters.map(p=>p.position),run.runActive,Math.abs(run.runnerVelocity)||7),wicket=ENDS[end];
    const goal=new THREE.Vector3(.35,0,wicket.wicket+wicket.direction*.65);
    const eligible=this.players.filter(p=>p!==fielder&&!['dive','slide','recover','jump'].includes(p.userData.fielding?.mode));
    const receiver=end==='keeper'?this.keeper:eligible.sort((a,b)=>arrivalTime(a,goal)-arrivalTime(b,goal))[0]||this.keeper;
    const distance=fielder.position.distanceTo(goal),turn=Math.abs(wrapAngle(Math.atan2(goal.x-fielder.position.x,goal.z-fielder.position.z)-fielder.rotation.y));
    this.state={phase:'windup',elapsed:0,end,wicket,goal,receiver,fielder,batters,run,random,velocity:new THREE.Vector3(),windup:.34+turn/9,direct:!!run.runActive&&arrivalTime(receiver,goal)>distance/28+.4,received:false};
    return this.state;
  }
  decision(){
    const s=this.state,w=s.wicket;
    const index=Math.abs(s.batters[0].position.z-w.crease)<Math.abs(s.batters[1].position.z-w.crease)?0:1;
    return {out:!!s.run.runActive&&!groundedAtCrease(runnerGroundPoints(s.batters[index]),s.end),batterIndex:index};
  }
  moveReceiver(ball,dt){
    const s=this.state,r=s.receiver;
    const facingYaw=Math.atan2(ball.x-r.position.x,ball.z-r.position.z);
    const goal=s.goal.clone();
    if(s.phase==='flight'&&Math.abs(s.velocity.z)>.5){
      const time=THREE.MathUtils.clamp((s.goal.z-ball.z)/s.velocity.z,0,.7);
      goal.x=THREE.MathUtils.clamp(ball.x+s.velocity.x*time,-3,3);
    }
    moveAthlete(r,goal,dt,7.8,{facingYaw});
    if(r.position.distanceTo(ball)<4)this.fielding.prepareCatch(r,ball,dt);
  }
  update(ball,dt){
    // Pose/contact decisions need the same small steps as the free ball.
    // Otherwise a fast return can pass the receiver between render frames.
    let remaining=Math.max(0,Math.min(dt,.1));
    const events=[];
    while(remaining>1e-7){
      const step=Math.min(remaining,1/120);remaining-=step;
      syncAthletes([this.state.receiver,this.state.fielder]);
      const next=this.step(ball,step);if(next)events.push(next);
    }
    return events;
  }
  step(ball,dt){
    const s=this.state;s.elapsed+=dt;
    if(s.phase==='windup'){
      this.moveReceiver(ball,dt);turnAthlete(s.fielder,s.goal,dt);
      const p=Math.min(1,s.elapsed/s.windup),f=s.fielder;
      f.rotation.x=.08+Math.sin(p*Math.PI)*.12;f.userData.torso.rotation.y=-Math.sin(p*Math.PI)*.35;
      f.userData.arms[1].rotation.set(-.5-p*1.75,0,-.08);f.userData.elbows[1].rotation.set(-.35-.8*Math.sin(p*Math.PI),0,0);
      f.userData.arms[0].rotation.set(-.3-p*.6,0,.25);f.userData.elbows[0].rotation.set(-.55,0,0);ball.copy(handPoint(f,1));
      if(p>=1){
        const from=ball.clone(),towards=f.position.clone().sub(s.goal);towards.y=0;towards.normalize();
        const target=s.direct?new THREE.Vector3(0,.55,s.wicket.wicket):s.goal.clone().addScaledVector(towards,.18).setY(2.7*athleteScale(s.receiver));
        const distance=from.distanceTo(target),wildRelease=s.random()>.985;
        const accuracy=wildRelease?.45:Math.max(.86,.985-distance*.0015-(s.run.throwCount||0)*.005);
        const launch=returnThrowLaunch(from,target,{speed:30-Math.min(5,distance*.05),accuracy,random:s.random});
        s.velocity.set(launch.velocity.x,launch.velocity.y,launch.velocity.z);s.launch=launch;s.phase='flight';s.elapsed=0;
        resetBallPhysics();setBallSpin({x:5,y:0,z:0});return {type:'released',end:s.end};
      }
    }else if(s.phase==='flight'){
      const handBefore=[handPoint(s.receiver,0),handPoint(s.receiver,1)],before=ball.clone();
      this.moveReceiver(ball,dt);advanceBall(ball,s.velocity,dt);
      const hit=sweptWicketHit(before,ball,s.end);
      if(hit){ball.set(hit.x,hit.y,hit.z);s.phase='complete';return {type:'wicket',end:s.end,...this.decision()};}
      const f=s.fielder,follow=Math.min(1,s.elapsed/.35);f.userData.arms[1].rotation.x=-2.25+follow*3.2;f.userData.elbows[1].rotation.x=-.35*(1-follow);f.userData.torso.rotation.y=.12*follow;
      for(let i=0;i<2;i++)if(sweptContact(handBefore[i],handPoint(s.receiver,i),before,ball,gloveRadius(s.receiver))!==null){
        if(s.receiver===this.keeper&&!s.takeChecked){
          s.takeChecked=true;
          if(s.random()<.015){s.phase='overthrow';s.velocity.multiplyScalar(.3);s.velocity.y=-.8;return {type:'overthrow',end:s.end,bobble:true};}
        }
        s.phase='receive';s.elapsed=0;s.received=true;ball.copy(handPoint(s.receiver,1));return {type:'received',end:s.end};
      }
      if(s.elapsed>s.launch.duration+1.2){s.phase='overthrow';return {type:'overthrow',end:s.end};}
    }else if(s.phase==='receive'){
      const hit=touchWicketWithBall(s.receiver,1,ball,s.end,s.elapsed,dt);
      if(hit){s.phase='complete';return {type:'wicket',end:s.end,...this.decision()};}
      if(s.elapsed>2){s.phase='complete';return {type:'complete',end:s.end};}
    }
    return null;
  }
}
