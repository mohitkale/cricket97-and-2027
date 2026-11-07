import {CRICKET} from './cricket-scale.js';
export const ENDS=Object.freeze({keeper:{crease:9.3,wicket:10.4,direction:1},bowler:{crease:-9.3,wicket:-10.4,direction:-1}});

/** Errors alter the actual launch, rather than a hidden accurate/inaccurate
 * boolean after a visually perfect throw has arrived. */
export function returnThrowLaunch(from,target,{speed=28,accuracy=.9,random=Math.random}={}){
  const distance=Math.hypot(target.x-from.x,target.z-from.z),duration=Math.max(.22,distance/speed);
  const spread=.12+(1-Math.max(0,Math.min(1,accuracy)))*distance*.14;
  const dx=(random()-random())*spread,dz=(random()-random())*spread,dy=(random()-random())*spread*.45;
  const aim={x:target.x+dx,y:Math.max(.3,target.y+dy),z:target.z+dz};
  return {velocity:{x:(aim.x-from.x)/duration*1.025,y:(aim.y-from.y)/duration+4.905*duration,z:(aim.z-from.z)/duration*1.025},aim,duration,spread};
}

export function sweptWicketHit(before,after,end,radius=CRICKET.ballRadius){
  const wicket=ENDS[end];if(!wicket)return null;
  // Sweep through the stump volume, including a downward glove movement
  // along its face. A plane crossing alone misses that common run-out action.
  const bounds={x:[-CRICKET.wicketHalfWidth-radius,CRICKET.wicketHalfWidth+radius],y:[CRICKET.pitchTop-radius,CRICKET.pitchTop+CRICKET.wicketHeight+radius],z:[wicket.wicket-radius-.025,wicket.wicket+radius+.025]};
  let enter=0,exit=1;
  for(const axis of ['x','y','z']){
    const delta=after[axis]-before[axis],[low,high]=bounds[axis];
    if(Math.abs(delta)<1e-8){if(before[axis]<low||before[axis]>high)return null;continue;}
    const a=(low-before[axis])/delta,b=(high-before[axis])/delta;
    enter=Math.max(enter,Math.min(a,b));exit=Math.min(exit,Math.max(a,b));
    if(enter>exit)return null;
  }
  return {x:before.x+(after.x-before.x)*enter,y:before.y+(after.y-before.y)*enter,z:before.z+(after.z-before.z)*enter,t:enter};
}

export function groundedAtCrease(points,end){
  const wicket=ENDS[end];
  return !!wicket&&points.some(p=>p.y<=.19&&p.y>=-.12&&(p.z-wicket.crease)*wicket.direction>=0);
}

export function chooseReturnEnd(from,runnerPositions,runActive,runnerSpeed=7){
  if(!runActive)return 'keeper';
  const danger=Object.entries(ENDS).map(([end,wicket])=>{
    const runner=runnerPositions.reduce((a,b)=>Math.abs(a.z-wicket.crease)<Math.abs(b.z-wicket.crease)?a:b);
    const travel=Math.hypot(from.x,from.z-wicket.wicket)/28+.3;
    const runnerTime=Math.abs(runner.z-wicket.crease)/Math.max(2,runnerSpeed);
    return {end,margin:runnerTime-travel};
  });
  return danger.sort((a,b)=>b.margin-a.margin)[0].end;
}
