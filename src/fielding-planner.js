import {CRICKET,athleteScale,groundHeight} from './cricket-scale.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/** Short-horizon prediction for decisions only. The live ball stays in Rapier. */
export function predictFieldingPath(position,velocity,bounced=false,horizon=3){
  const p={...position},v={...velocity},samples=[];const dt=1/60;
  for(let i=1;i<=Math.ceil(horizon/dt);i++){
    const drag=.0025*Math.hypot(v.x,v.y,v.z);
    v.x*=1-drag*dt;v.z*=1-drag*dt;v.y=(v.y-9.81*dt)*(1-drag*dt);
    p.x+=v.x*dt;p.y+=v.y*dt;p.z+=v.z*dt;
    const floor=groundHeight(p.x,p.z)+CRICKET.ballRadius;
    if(p.y<=floor){p.y=floor;bounced=true;v.y=Math.abs(v.y)*.5;if(v.y<.55){v.y=0;const speed=Math.hypot(v.x,v.z),factor=speed?Math.max(0,speed-3.4*dt)/speed:0;v.x*=factor;v.z*=factor;}}
    if(i%3===0)samples.push({...p,t:i*dt,bounced});
  }
  return samples;
}

export function arrivalTime(player,target,maxSpeed=8.8){
  const dx=target.x-player.position.x,dz=target.z-player.position.z,distance=Math.max(0,Math.hypot(dx,dz)-.65*athleteScale(player));
  const motor=player.userData?.motor||{},along=distance?Math.max(0,((motor.vx||0)*dx+(motor.vz||0)*dz)/Math.hypot(dx,dz)):0;
  const acceleration=8.5,timeToSpeed=Math.max(0,(maxSpeed-along)/acceleration),acceleratingDistance=(along+maxSpeed)*.5*timeToSpeed;
  const travel=distance<=acceleratingDistance?(Math.sqrt(along*along+2*acceleration*distance)-along)/acceleration:timeToSpeed+(distance-acceleratingDistance)/maxSpeed;
  const yaw=player.rotation.y,angle=Math.atan2(dx,dz)-yaw,turn=Math.abs(Math.atan2(Math.sin(angle),Math.cos(angle)))*.045;
  return travel+turn;
}

export function planInterception(player,path){
  let best=null;
  for(const sample of path){
    // Prefer an actual catch point before the first bounce; otherwise get in
    // front of the rolling ball, rather than pursuing its current position.
    if(sample.y>3.6*athleteScale(player)+.7||Math.hypot(sample.x,sample.z)>50.5)continue;
    const eta=arrivalTime(player,sample),margin=sample.t-eta;
    const cost=eta+Math.max(0,-margin)*1.7+(sample.bounced?.24:0);
    if(margin>=-.07&&sample.y<=3.6*athleteScale(player))return {...sample,eta,cost,reachable:true};
    if(!best||cost<best.cost)best={...sample,eta,cost,reachable:false};
  }
  return best||{...path[path.length-1],eta:5,cost:8,reachable:false};
}

/** Earliest contact of two swept points, including fast balls between frames. */
export function sweptContact(handBefore,handAfter,ballBefore,ballAfter,radius=.34){
  const rx=handBefore.x-ballBefore.x,ry=handBefore.y-ballBefore.y,rz=handBefore.z-ballBefore.z;
  const dx=handAfter.x-ballAfter.x-rx,dy=handAfter.y-ballAfter.y-ry,dz=handAfter.z-ballAfter.z-rz;
  const a=dx*dx+dy*dy+dz*dz,c=rx*rx+ry*ry+rz*rz-radius*radius;
  if(c<=0)return 0;if(a<1e-12)return null;
  const b=2*(rx*dx+ry*dy+rz*dz),discriminant=b*b-4*a*c;
  if(discriminant<0)return null;const t=(-b-Math.sqrt(discriminant))/(2*a);
  return t>=0&&t<=1?t:null;
}

export function boundaryCrossing(before,after,radius=50){
  if(Math.hypot(before.x,before.z)>=radius)return 0;
  if(Math.hypot(after.x,after.z)<radius)return null;
  const dx=after.x-before.x,dz=after.z-before.z,a=dx*dx+dz*dz;
  if(a<1e-12)return 0;
  const b=2*(before.x*dx+before.z*dz),c=before.x*before.x+before.z*before.z-radius*radius;
  return clamp((-b+Math.sqrt(Math.max(0,b*b-4*a*c)))/(2*a),0,1);
}

// Allow acceleration, crease braking and the strike follow-through before a run.
export function safeOpeningSingle(position, velocity, fielders) {
  const deadline = 3.7;
  const path = predictFieldingPath(position, velocity, false, deadline);
  for (const sample of path) {
    if (Math.hypot(sample.x, sample.z) >= 50) break;
    if (sample.y > 2.5) continue;
    const returnDistance = Math.hypot(sample.x, Math.abs(sample.z) - 10.4);
    if (sample.t + .3 + returnDistance / 30 >= deadline) continue;
    if (fielders.some(player => arrivalTime(player, sample) <= sample.t + .12)) return false;
  }
  return true;
}
