import {Vector3, Ray} from 'three';
import {CRICKET, athleteScale} from './cricket-scale.js';

export function firstPadContact(before, after, batter) {
  const direction=after.clone().sub(before), length=direction.length();
  if (!length) return null;
  const ray=new Ray(before,direction.divideScalar(length));
  const radius=.18*athleteScale(batter)+CRICKET.ballRadius;
  let first=null;
  for (const knee of batter.userData.knees) {
    const top=knee.localToWorld(new Vector3(0,-.08,.13));
    const bottom=knee.localToWorld(new Vector3(0,-.52,.13));
    const closest=new Vector3();
    const distanceSq=ray.distanceSqToSegment(top,bottom,closest);
    if(distanceSq>radius*radius) continue;
    const distance=Math.max(0,before.distanceTo(closest)-Math.sqrt(radius*radius-distanceSq));
    if(distance<=length && (!first || distance<first.distance))
      first={distance,point:ray.at(distance,new Vector3())};
  }
  return first;
}

export function lbwEligible({pitchX,impactX,hand,playedShot,wouldHit,noBall,freeHit}) {
  const off=hand==='left'?-1:1, edge=CRICKET.wicketHalfWidth;
  return !!wouldHit && !noBall && !freeHit && (pitchX==null || pitchX*off>=-edge)
    && impactX*off>=-edge && (!playedShot || impactX*off<=edge);
}
