import * as THREE from 'three';
import {solveArm,solveLeg} from './athlete.js';
import {athleteScale,groundHeight} from './cricket-scale.js';

/** Ground collection / long barrier, shared by anticipation and the pickup.
 * Both feet stay planted; hips and waist lower the hands onto the rolling line. */
export function poseGroundFielding(p,ball,dt){
  const scale=athleteScale(p),floor=groundHeight(p.position.x,p.position.z),state=p.userData.fielding||p.userData;
  const blend=state.groundBlend=(state.groundBlend||0)+(1-(state.groundBlend||0))*(1-Math.exp(-14*dt));
  p.position.y=floor-scale*blend;p.rotation.x=.04;p.rotation.z=0;
  p.userData.torso.rotation.set(1.3*blend,0,0);
  for(let i=0;i<2;i++){
    const foot=p.localToWorld(new THREE.Vector3(i?-.22:.32,0,i?.34:.04));
    foot.y=floor+.07*scale;solveLeg(p,i,foot);
    solveArm(p,i,ball.clone().add(new THREE.Vector3((i?-1:1)*.035,0,0)));
  }
}
