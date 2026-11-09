import * as THREE from 'three';
import {athleteScale,gloveRadius} from './cricket-scale.js';
import {createMotor,wrapAngle} from './locomotion.js';
import {moveAthlete,coastAthlete,turnAthlete} from './athlete-motion.js';
import {solveArm,plantFeet,plantStandingFeet} from './athlete.js';
import {poseGroundFielding} from './ground-fielding.js';
import {bodySegments,sweptLimbContact} from './fielding-contact.js';
import {constrainAthlete} from './physics.js';
import {predictFieldingPath,planInterception,sweptContact,boundaryCrossing} from './fielding-planner.js';

const clamp=THREE.MathUtils.clamp,smooth=t=>THREE.MathUtils.smoothstep(clamp(t,0,1),0,1);
const planar=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const activeAction=s=>s&&['dive','slide','recover','jump'].includes(s.mode);
export const handPoint=(p,i)=>p.userData.arms[i].userData.hand.getWorldPosition(new THREE.Vector3());

/** Sports actions own their complete pose until landing/recovery finishes.
 * A boundary ends scoring eligibility, not the athlete's momentum. */
export class FieldingController{
  constructor(players){this.players=players;this.begin();}
  begin(){
    this.elapsed=0;this.planAt=-1;this.assignments=[];this.held=null;this.events=[];this.closestHand=Infinity;this.groundPursuit=null;
    for(const p of this.players){p.userData.fielding={mode:'ready',elapsed:0};p.userData.motor=createMotor(p.userData.identityPhase||0);}
  }
  hold(p){this.held=p;p.userData.fielding.held=true;}
  release(p){if(this.held===p)this.held=null;}
  update({ball,previousBall,velocity,bounced,dt,live=true}){
    if(!live){this.finishActions(dt,ball);return null;}
    // Sample athletic motion and hand contact at physics cadence, including
    // the curved hand path during a fast low dive at a lower render rate.
    const count=Math.max(1,Math.ceil(dt*120-1e-8));
    for(let i=0;i<count;i++){
      const before=previousBall.clone().lerp(ball,i/count),after=previousBall.clone().lerp(ball,(i+1)/count);
      const event=this.step({ball:after,previousBall:before,velocity,bounced,dt:dt/count});
      if(event){if(event.t!==undefined)event.t=(i+event.t)/count;return event;}
    }
    return null;
  }
  step({ball,previousBall,velocity,bounced,dt}){
    this.elapsed+=dt;
    const crossing=boundaryCrossing(previousBall,ball);
    if(this.elapsed-this.planAt>=.12){
      const path=predictFieldingPath(ball,velocity,bounced);
      this.assignments=this.players.filter(p=>!activeAction(p.userData.fielding)).map(p=>({p,plan:planInterception(p,path)})).sort((a,b)=>a.plan.cost-b.plan.cost);
      // A backup converging on a stationary ball can pin the collector
      // against another capsule. Keep one collector and change the approach
      // if that player stops making progress outside pickup range.
      if(bounced && velocity.lengthSq()<.25 && this.assignments.length){
        const pursuit=this.groundPursuit;
        let index=pursuit?this.assignments.findIndex(entry=>entry.p===pursuit.player):-1;
        if(index<0 || planar(pursuit.ball,ball)>.3){
          index=0;
          this.groundPursuit={player:this.assignments[0].p,ball:ball.clone(),distance:Infinity,at:this.elapsed};
        }
        const current=this.groundPursuit;
        const distance=planar(current.player.position,ball);
        if(distance<current.distance-.1){
          current.distance=distance;current.at=this.elapsed;
        }else if(this.elapsed-current.at>1.2 && this.assignments.length>1){
          index=(index+1)%this.assignments.length;
          current.player=this.assignments[index].p;current.distance=Infinity;current.at=this.elapsed;
        }
        this.assignments=[this.assignments[index]];
      }else this.groundPursuit=null;
      this.path=path;this.planAt=this.elapsed;
    }
    let contact=null;
    for(const p of this.players){
      const before=[handPoint(p,0),handPoint(p,1)],s=p.userData.fielding,scale=athleteScale(p);
      const nearby=planar(p.position,ball)<2.8*scale+.35,bodyBefore=nearby?bodySegments(p):null;
      s.bodyCooldown=Math.max(0,(s.bodyCooldown||0)-dt);
      s.handCooldown=Math.max(0,(s.handCooldown||0)-dt);
      if(activeAction(s))this.advanceAction(p,dt,ball);
      else{
        const rank=this.assignments.findIndex(v=>v.p===p),entry=this.assignments[rank];
        const speed2=velocity.x**2+velocity.z**2;
        const interceptTime=speed2?clamp(((p.position.x-ball.x)*velocity.x+(p.position.z-ball.z)*velocity.z)/speed2-.7*scale/Math.sqrt(speed2),0,.16):0;
        const intercept=ball.clone().addScaledVector(velocity,interceptTime);intercept.y-=4.905*interceptTime**2;
        const groundTime=speed2?clamp(((p.position.x-ball.x)*velocity.x+(p.position.z-ball.z)*velocity.z)/speed2,0,.7):0;
        const groundMeet=ball.clone().addScaledVector(velocity,groundTime);groundMeet.y=ball.y;
        const groundChance=bounced&&ball.y<.55*scale&&planar(p.position,ball)<Math.max(1.5,Math.sqrt(speed2)*.7)&&planar(p.position,groundMeet)<.8*scale;
        if(!groundChance){s.groundBlend=0;s.groundAnchor=null;}
        const reflex=!bounced&&ball.y<=3.8*scale&&planar(p.position,ball)<2.2&&p.userData.arms.some(a=>a.getWorldPosition(new THREE.Vector3()).distanceTo(intercept)<.99*scale+gloveRadius(p)*.5);
        if(groundChance){
          const direction=new THREE.Vector3(velocity.x,0,velocity.z).normalize();
          if(s.mode!=='ground-set'||!s.groundAnchor)s.groundAnchor=groundMeet.clone();
          s.groundAnchor.y=ball.y;const target=s.groundAnchor.clone().addScaledVector(direction,scale);
          const facingYaw=speed2>1?Math.atan2(-velocity.x,-velocity.z):Math.atan2(ball.x-p.position.x,ball.z-p.position.z);
          moveAthlete(p,target,dt,3.8,{facingYaw});s.mode='ground-set';poseGroundFielding(p,s.groundAnchor,dt);this.watch(p,ball,dt);
        }else if(reflex){
          coastAthlete(p,dt,18);turnAthlete(p,intercept,dt);s.mode='reach';this.prepareCatch(p,intercept,dt);this.watch(p,ball,dt);
        }else if(rank>=0&&rank<2&&this.elapsed>.12+(p.userData.identityPhase||0)*.012){
          const plan=entry.plan,target=new THREE.Vector3(plan.x,0,plan.z);
          const ballAngle=Math.atan2(ball.x-p.position.x,ball.z-p.position.z),travelAngle=Math.atan2(target.x-p.position.x,target.z-p.position.z);
          const backpedal=!bounced&&plan.t<1.8&&planar(p.position,target)<5.5&&Math.abs(wrapAngle(ballAngle-travelAngle))>1.8;
          const reaching=!bounced&&planar(p.position,ball)<4.3&&ball.y<4.2*scale;
          if(backpedal&&!s.backpedalled){s.backpedalled=true;this.events.push({type:'backpedal',player:p});}
          s.mode=backpedal?'backpedal':'pursuit';
          moveAthlete(p,target,dt,backpedal?4.6:rank===0?8.8:7.8,backpedal||reaching?{facingYaw:ballAngle}:{});
          const future=this.path.find(v=>v.t>=.3)||plan,distance=planar(p.position,future);
          const outward=ball.x*velocity.x+ball.z*velocity.z>0;
          const groundDive=bounced&&Math.hypot(ball.x,ball.z)>35&&outward&&Math.hypot(velocity.x,velocity.z)>3;
          const airborneDive=!bounced&&ball.y<2.8*scale&&future.y>.45*scale&&future.y<2.8*scale;
          if((groundDive||airborneDive)&&distance>1.8*scale&&distance<5.4*scale&&planar(p.position,ball)<7){
            this.startDive(p,future,groundDive);this.advanceAction(p,dt,ball);
          }else if(!bounced&&ball.y>3.05*scale&&ball.y<4.25*scale&&velocity.y<2&&planar(p.position,ball)<1.65){
            s.mode='jump';s.elapsed=0;s.vx=p.userData.motor.vx*.65;s.vz=p.userData.motor.vz*.65;this.events.push({type:'jump',player:p});this.advanceAction(p,dt,ball);
          }else if(!bounced&&planar(p.position,ball)<4.3&&ball.y<4.2*scale){
            s.mode=backpedal?'backpedal':'reach';this.prepareCatch(p,ball,dt);
          }
          this.watch(p,ball,dt);
        }else{coastAthlete(p,dt);turnAthlete(p,ball,dt);this.watch(p,ball,dt);s.mode=p.userData.motor.speed>.1?'brake':'ready';}
      }
      const after=[handPoint(p,0),handPoint(p,1)];
      this.closestHand=Math.min(this.closestHand,after[0].distanceTo(ball),after[1].distanceTo(ball));
      // Both ball and hands are swept. A catch cannot happen after the ball
      // crosses the rope or while the fielder is standing outside it.
      for(let i=0;i<2;i++){
        const t=sweptContact(before[i],after[i],previousBall,ball,gloveRadius(p));
        if(s.handCooldown>0||t===null||crossing!==null&&t>=crossing||Math.hypot(p.position.x,p.position.z)>49.65)continue;
        if(!contact||t<contact.t)contact={player:p,t,type:bounced?'stop':'catch',part:'hand',hand:i,controlled:bounced&&velocity.length()<18&&!activeAction(s)};
      }
      if(bodyBefore&&s.bodyCooldown===0&&Math.hypot(p.position.x,p.position.z)<49.65){
        const afterBody=bodySegments(p);
        for(let i=0;i<afterBody.length;i++){
          const hit=sweptLimbContact(bodyBefore[i],afterBody[i],previousBall,ball);
          // A prepared take can graze the same forearm on its way into the
          // glove during this physics step. Preserve actual glove contact.
          if(hit&&contact?.player===p&&contact.part==='hand'&&/^(forearm|arm)/.test(hit.part))continue;
          if(hit&&(crossing===null||hit.t<crossing)&&(!contact||hit.t<contact.t-.015))contact={...hit,player:p,type:'block'};
        }
      }
    }
    if(contact){
      if(contact.type==='catch')this.hold(contact.player);
      else {if(contact.type!=='block')contact.player.userData.fielding.handCooldown=.15;contact.player.userData.fielding.bodyCooldown=.15;}
      this.events.push(contact);return contact;
    }
    if(crossing===null){
      // Slow ground balls are gathered by the existing hand-contact pickup
      // sequence. A failed reach leaves the ball live.
      const nearest=this.players.filter(p=>!activeAction(p.userData.fielding)).sort((a,b)=>planar(a.position,ball)-planar(b.position,ball))[0];
      if(nearest&&bounced&&ball.y<.65&&planar(nearest.position,ball)<1.12*athleteScale(nearest)&&Math.hypot(velocity.x,velocity.z)<10)return {type:'gather',player:nearest};
    }
    return null;
  }
  prepareCatch(p,ball,dt){
    // Turn into the chance before extending the arms. Do not wrap a reaching
    // arm backwards around the body while the bounded turn is still underway.
    if(p.worldToLocal(ball.clone()).z<-.35)return;
    const scale=athleteScale(p),blend=1-Math.exp(-20*dt),crouch=clamp((1.7*scale-ball.y)/(1.2*scale),0,1);
    p.position.y+=(-.55*scale*crouch-p.position.y)*blend;p.rotation.x+=(.02-p.rotation.x)*blend;
    p.userData.torso.rotation.x+=(.65*crouch-(ball.y>3*scale? .16:0)-p.userData.torso.rotation.x)*blend;
    if(p.userData.role==='keeper'){p.userData.torso.rotation.x=.25+1.3*crouch;plantStandingFeet(p);}
    else if(p.userData.motor.speed<1.4)plantFeet(p);
    const target=ball.clone();solveArm(p,0,target.clone().add(new THREE.Vector3(.065*scale,0,0)));solveArm(p,1,target.clone().add(new THREE.Vector3(-.065*scale,0,0)));
  }
  startDive(p,target,low=false){
    const dx=target.x-p.position.x,dz=target.z-p.position.z,d=Math.hypot(dx,dz)||1,s=p.userData.fielding;
    const speed=clamp(p.userData.motor.speed+3,6,10.5);
    Object.assign(s,{mode:'dive',elapsed:0,vx:dx/d*speed,vz:dz/d*speed,held:false,low});
    p.rotation.y=Math.atan2(dx,dz);p.userData.motor.vx=s.vx;p.userData.motor.vz=s.vz;
    this.events.push({type:'dive',player:p});
  }
  advanceAction(p,dt,ball){
    const s=p.userData.fielding,scale=athleteScale(p);s.elapsed+=dt;
    if(s.mode==='dive'||s.mode==='slide'){
      const sliding=s.mode==='slide',speed=Math.hypot(s.vx,s.vz),next=Math.max(0,speed-(sliding?10:1.3)*dt),factor=speed?next/speed:0;
      const delta=constrainAthlete(p.uuid,p.position,{x:s.vx*dt,z:s.vz*dt});p.position.x+=delta.x;p.position.z+=delta.z;s.vx*=factor;s.vz*=factor;
      p.userData.motor.vx=s.vx;p.userData.motor.vz=s.vz;p.userData.motor.speed=next;
      p.rotation.x=1.43*smooth(s.elapsed/(s.low?.12:.19)+(sliding?1:0));p.rotation.z=Math.sin(s.elapsed*5)*.07;
      p.position.y=(s.low?.08:sliding?.24:.24*smooth(s.elapsed/.13)+Math.sin(clamp(s.elapsed/.56,0,1)*Math.PI)*.32)*scale;
      p.userData.torso.rotation.set(.05,0,0);p.userData.legs[0].rotation.set(-.15,0,.1);p.userData.legs[1].rotation.set(.2,0,-.12);
      p.userData.knees[0].rotation.set(.45,0,0);p.userData.knees[1].rotation.set(.8,0,0);
      const target=s.held?p.localToWorld(new THREE.Vector3(0,3.25,.12)):ball.clone();
      solveArm(p,0,target.clone().add(new THREE.Vector3(.09*scale,0,0)));solveArm(p,1,target.clone().add(new THREE.Vector3(-.09*scale,0,0)));
      if(!sliding&&s.elapsed>=.56){s.mode='slide';s.elapsed=0;this.events.push({type:'slide',player:p});}
      else if(sliding&&(s.elapsed>.8||next<.4)){s.mode='recover';s.elapsed=0;s.startPitch=p.rotation.x;this.events.push({type:'recover',player:p});}
    }else if(s.mode==='jump'){
      const delta=constrainAthlete(p.uuid,p.position,{x:s.vx*dt,z:s.vz*dt});p.position.x+=delta.x;p.position.z+=delta.z;
      p.position.y=Math.max(0,3.8*s.elapsed-4.905*s.elapsed*s.elapsed);p.rotation.x=.03;p.userData.torso.rotation.x=-.12;
      p.userData.knees.forEach(k=>k.rotation.x=.5);const target=s.held?p.localToWorld(new THREE.Vector3(0,2.9,.55)):ball.clone();solveArm(p,0,target);solveArm(p,1,target);
      if(s.elapsed>.78){s.mode='recover';s.elapsed=.75;s.startPitch=0;}
    }else if(s.mode==='recover'){
      coastAthlete(p,dt,12);const t=smooth(s.elapsed/1.05);
      p.rotation.x=(s.startPitch||0)*(1-t);p.rotation.z=0;p.position.y=(.24*(1-t)-.22*Math.sin(t*Math.PI))*scale;
      p.userData.torso.rotation.x=.35*Math.sin(t*Math.PI);
      p.userData.knees[0].rotation.x=.3+Math.sin(t*Math.PI);p.userData.knees[1].rotation.x=.15+.65*Math.sin(t*Math.PI);
      p.userData.arms.forEach((a,i)=>{a.rotation.set(-.7*(1-t),0,(i?-1:1)*.15);p.userData.elbows[i].rotation.set(-.4,0,0);});
      if(s.elapsed>=1.05){s.mode='ready';s.elapsed=0;p.position.y=0;p.rotation.x=0;p.userData.torso.rotation.x=0;}
    }
  }
  finishActions(dt,ball,exclude=[]){
    for(const p of this.players){
      const s=p.userData.fielding;if(activeAction(s))this.advanceAction(p,dt,ball);
      else if(p!==this.held&&!exclude.includes(p)){coastAthlete(p,dt);s.mode=p.userData.motor.speed>.1?'brake':'ready';this.watch(p,ball,dt);}
    }
  }
  watch(p,ball,dt){
    const yaw=wrapAngle(Math.atan2(ball.x-p.position.x,ball.z-p.position.z)-p.rotation.y),head=p.userData.head;
    head.rotation.y+=(clamp(yaw,-1.25,1.25)-head.rotation.y)*(1-Math.exp(-9*dt));
  }
}
