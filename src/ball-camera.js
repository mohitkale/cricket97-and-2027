import * as THREE from 'three';

const {clamp,radToDeg}=THREE.MathUtils;
const mount=(id,position,look,fov)=>Object.freeze({id,position:Object.freeze(position),look:Object.freeze(look),fov});

// Physical camera locations. A shot changes the selected mount, never the
// location of a mounted camera. Pan/tilt and the lens may follow the action.
export const BROADCAST_MOUNTS=Object.freeze({
  delivery:mount('delivery',[-8,16,-72],[0,1,1.5],22),
  shoulderRight:mount('shoulderRight',[1.75,2.85,15.8],[0,1.1,1.6],38),
  shoulderLeft:mount('shoulderLeft',[-1.75,2.85,15.8],[0,1.1,1.6],38),
  preview:mount('preview',[8,3.4,17],[0,1,9.2],36),
  stadium:mount('stadium',[58,36,58],[0,1,0],55),
  keeper:mount('keeper',[8,16,72],[0,1,0],22),
  batter:mount('batter',[24,12,60],[0,1,9.2],18),
  ...Object.fromEntries(Array.from({length:8},(_,sector)=>{
    const angle=sector*Math.PI/4,id=`field-${sector}`;
    // The opposite stand keeps even a roof-clearing six in front of the lens.
    return [id,mount(id,[-Math.sin(angle)*82,22,-Math.cos(angle)*82],[0,1,0],22)];
  })),
});

export function broadcastPhase(animation){
  if(!animation?.flight||['miss','keeper-chase','keeper-gather'].includes(animation.phase))return 'delivery';
  return animation.phase==='modern-return'?'return':'field';
}

export function fixedBroadcastView(id){
  const m=BROADCAST_MOUNTS[id]||BROADCAST_MOUNTS.delivery;
  return {id:m.id,position:new THREE.Vector3(...m.position),look:new THREE.Vector3(...m.look),fov:m.fov};
}

// Keep the anticipated fielding area and real athletes in the composition.
// Outside the rope, the ground anchor stops at the boundary rather than
// following the ball into empty space beyond the stadium.
function fieldSubjects(ball,players,lofted){
  const ground=ball.clone().setY(.1),radius=Math.hypot(ground.x,ground.z);
  if(radius>47){ground.x*=47/radius;ground.z*=47/radius;}
  const points=[ball.clone(),ground];
  const nearby=players.map(p=>({p,position:p.position||p})).filter(({position:p})=>Math.hypot(p.x,p.z)<51)
    .sort((a,b)=>a.position.distanceToSquared(ground)-b.position.distanceToSquared(ground)).slice(0,2);
  for(const {p,position}of nearby){
    points.push(new THREE.Vector3(position.x,.1,position.z));
    points.push(p.userData?.head?p.userData.head.getWorldPosition(new THREE.Vector3()):new THREE.Vector3(position.x,1.95,position.z));
  }
  if(lofted)points.push(new THREE.Vector3(0,.1,0));
  return {ground,points};
}

/** Broadcast director: a locked end view for the entire delivery, followed by
 * a direction-selected stand camera. Cuts are instantaneous; only pan/tilt
 * and zoom are smoothed. A shot retains its camera rather than sector-flapping. */
export class BallCamera{
  constructor(){this.key=null;this.shot=null;this.id=null;this.look=new THREE.Vector3();this.fov=22;this.lofted=false;}
  update({ball,velocity,active=false,phase='delivery',deliveryKey=null,battingHand=null,dt=1/60,aspect=1.5,players=[]}){
    if(deliveryKey!==this.key){this.key=deliveryKey;this.shot=null;this.lofted=false;}
    let id=battingHand?(battingHand==='left'?'shoulderLeft':'shoulderRight'):'delivery',tracking=false;
    if(phase==='preview')id='preview';
    else if(active&&phase!=='delivery'){
      if(phase==='return'&&Math.hypot(ball.x,ball.z)<18){id='delivery';tracking=true;this.shot=null;}
      else {
        const outsidePitch=Math.abs(ball.x)>4||ball.z< -13||ball.z>18||ball.y>5;
        if(!this.shot&&outsidePitch){
          const dx=ball.x,dz=ball.z-9.2;
          const angle=Math.hypot(dx,dz)>2?Math.atan2(dx,dz):Math.atan2(velocity?.x||0,velocity?.z||-1);
          this.shot=`field-${(Math.round(angle/(Math.PI/4))+8)%8}`;
        }
        if(this.shot){id=this.shot;tracking=true;}
      }
    }
    const view=fixedBroadcastView(id),cut=id!==this.id;this.id=id;
    if(!tracking){this.look.copy(view.look);this.fov=view.fov;}
    else {
      if(phase==='return')this.lofted=false;else if(ball.y>6)this.lofted=true;
      const {ground,points}=fieldSubjects(ball,players,this.lofted);
      if(phase==='return')points.push(new THREE.Vector3(0,.7,(velocity?.z??0)>=0?10.4:-10.4));
      const target=ball.clone().addScaledVector(velocity||new THREE.Vector3(),.06);
      if(this.lofted)target.lerp(ground,.62);
      if(cut)this.look.copy(target);
      else {
        const delta=target.sub(this.look),length=delta.length();
        if(length>.3)this.look.addScaledVector(delta,(length-.3)/length*(1-Math.exp(-7*dt)));
      }
      const extent=(this.lofted?24:10)/Math.min(1,aspect);
      const desired=clamp(radToDeg(2*Math.atan(extent/view.position.distanceTo(this.look))),12,45);
      this.fov=cut?desired:THREE.MathUtils.lerp(this.fov,desired,1-Math.exp(-3*dt));
      // Frame the whole play, including the ball, turf and the nearest athletes.
      // Widen the lens instead of cropping everything down to sky and ball.
      const forward=this.look.clone().sub(view.position).normalize();
      const right=forward.clone().cross(new THREE.Vector3(0,1,0)).normalize(),up=right.clone().cross(forward);
      let tangent=0;
      for(const point of points){
        const relative=point.clone().sub(view.position),depth=Math.max(1,relative.dot(forward));
        tangent=Math.max(tangent,Math.abs(relative.dot(up))/depth,Math.abs(relative.dot(right))/depth/aspect);
      }
      this.fov=Math.max(this.fov,radToDeg(2*Math.atan(tangent/.72)));
    }
    view.look.copy(this.look);view.fov=clamp(this.fov,12,70);return view;
  }
}

/** Interpolate a recorded pan/lens only while the physical camera is the same.
 * Replays cut between mounts just like the live broadcast. */
export function replayBroadcastView(before,after,blend){
  if(!before)return null;
  const next=after?.id===before.id?after:before,t=clamp(blend,0,1);
  return {id:before.id,position:new THREE.Vector3(...before.position),
    look:new THREE.Vector3(...before.look).lerp(new THREE.Vector3(...next.look),t),
    fov:THREE.MathUtils.lerp(before.fov,next.fov,t)};
}
