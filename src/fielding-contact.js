import * as THREE from 'three';
import {CRICKET,athleteScale} from './cricket-scale.js';

/** Read limb capsules from the rendered rig, rather than using the much
 * broader upright locomotion capsule as an invisible catching volume. */
export function bodySegments(p){
  p.updateMatrixWorld(true);const scale=athleteScale(p),out=[];
  const add=(id,a,b,r)=>out.push({id,a,b,r:r*scale+CRICKET.ballRadius});
  const point=(object,x,y,z)=>object.localToWorld(new THREE.Vector3(x,y,z));
  for(let i=0;i<2;i++){
    const hip=p.userData.legs[i],knee=p.userData.knees[i],arm=p.userData.arms[i],elbow=p.userData.elbows[i];
    add(`thigh${i}`,hip.getWorldPosition(new THREE.Vector3()),knee.getWorldPosition(new THREE.Vector3()),.17);
    add(`shin${i}`,knee.getWorldPosition(new THREE.Vector3()),point(knee,0,-.68,.095),.12);
    add(`shoe${i}`,point(knee,0,-.68,-.04),point(knee,0,-.68,.3),.08);
    add(`arm${i}`,arm.getWorldPosition(new THREE.Vector3()),elbow.getWorldPosition(new THREE.Vector3()),.105);
    add(`forearm${i}`,elbow.getWorldPosition(new THREE.Vector3()),point(elbow,0,-.42,0),.086);
  }
  add('head',point(p.userData.head,0,-.12,0),point(p.userData.head,0,.12,0),.24);
  add('torso',point(p.userData.torso,0,.26,0),point(p.userData.torso,0,1.27,0),.3);
  return out;
}

/** Conservative advancement of a ball against a moving limb capsule. The
 * distance bound includes endpoint motion, so fast balls cannot tunnel. */
export function sweptLimbContact(before,after,ballBefore,ballAfter){
  const travel=ballBefore.distanceTo(ballAfter)+Math.max(before.a.distanceTo(after.a),before.b.distanceTo(after.b));
  const radius=Math.max(before.r,after.r),a=new THREE.Vector3(),b=new THREE.Vector3(),ball=new THREE.Vector3(),closest=new THREE.Vector3(),axis=new THREE.Vector3();
  let t=0;
  for(let i=0;i<64&&t<=1;i++){
    a.lerpVectors(before.a,after.a,t);b.lerpVectors(before.b,after.b,t);ball.lerpVectors(ballBefore,ballAfter,t);
    axis.copy(b).sub(a);const length=axis.lengthSq();
    const along=length?THREE.MathUtils.clamp(ball.clone().sub(a).dot(axis)/length,0,1):0;
    closest.copy(a).addScaledVector(axis,along);const distance=ball.distanceTo(closest),gap=distance-radius;
    if(gap<.00005){
      const normal=ball.clone().sub(closest).normalize();
      if(normal.lengthSq()<.5)normal.copy(ballBefore).sub(ballAfter).normalize();
      return {t,normal,point:ball.clone(),part:after.id};
    }
    if(travel<1e-9)return null;t+=Math.max(.00001,gap/travel);
  }
  return null;
}

/** Soft hands and a body block dissipate energy. Neither adds the old
 * scripted kick back towards the pitch. Only glove contact gives possession. */
export function applyFieldingContact(ball,velocity,before,event){
  ball.lerpVectors(before,ball.clone(),event.t??1);
  const incoming=velocity.clone();
  if(event.part==='hand')velocity.multiplyScalar(Math.min(.12,1.4/Math.max(.01,velocity.length())));
  else {
    const normal=event.normal,approach=velocity.dot(normal);
    if(approach<0)velocity.addScaledVector(normal,-approach);
    velocity.multiplyScalar(.24);
    // No negative restitution: a barrier blocks normal momentum instead of
    // turning every contact into a rebound or a kick.
    if(velocity.x*incoming.x+velocity.z*incoming.z<0){velocity.x=0;velocity.z=0;}
  }
  velocity.y=Math.min(.2,velocity.y);if(event.normal)ball.addScaledVector(event.normal,.008);
  return velocity;
}
