import {CRICKET} from './cricket-scale.js';

// Aim ordinary deliveries around off stump at the adult player scale. Fault
// intent changes the launch line, but only judgeWide decides the outcome.
export function modernDeliveryLine(delivery,hand,movement=0){
  if(delivery.wide)return delivery.line*.5;
  return (hand==='left'?-.2:.2)+delivery.line*.45+movement*.4;
}
/** Solve the release velocity for a selected pitch length. Rapier determines
 * the actual bounce and subsequent flight; no rendered height curve is used. */
export function deliveryLaunch({release,line,travel,length,movement=0,spin=false,turn=spin?movement:0,pitch='horizon'}){
  const gravity=9.81;
  const fraction={Yorker:.94,Full:.82,Good:.62,Short:.44,Bouncer:.3}[length]??.62;
  const bounceTime=Math.max(.16,travel*fraction);
  const vy=length==='Full toss'?(.75-release.y+.5*gravity*travel*travel)/travel:(CRICKET.pitchTop+CRICKET.ballRadius-release.y+.5*gravity*bounceTime*bounceTime)/bounceTime;
  const swing=spin?0:movement*2.7;
  return {
    velocity:{x:(line-release.x-.5*swing*travel*travel)/travel,y:vy,z:(9.2-release.z)/travel*1.025},
    swing,
    // Venue presets are gameplay tuning. The kick applies once at pitch contact.
    turnVelocity:turn*(pitch==='horizon'?2.8:pitch==='coastal'?1.9:2.3),
    pitchRestitution:pitch==='coastal'?.68:pitch==='riverside'?.52:.58,
    spin:spin?{x:movement>0?-10:10,y:movement*60,z:movement*24}:{x:-7,y:0,z:0},
  };
}

/** Preserve shared shot selection, then express timing error and incoming
 * momentum in the modern contact response. Assistance remains intentional. */
export function modernShotResponse(base,incoming,timing,hand='right',options={}){
  const signed=Math.max(-.65,Math.min(.65,timing));
  const angle=signed*.48*(hand==='left'?-1:1),c=Math.cos(angle),s=Math.sin(angle);
  const paceBonus=Math.min(1.18,1+Math.hypot(incoming?.x||0,incoming?.z||0)/220);
  const quality=Math.max(0,1-Math.abs(signed)/.55);
  let lift=Math.max(.25,base.y+Math.abs(signed)*1.1);
  if(options.shot==='Attacking drive')lift=Math.max(lift,12+quality*3);
  if(options.power&&options.shot!=='Defend')lift=Math.max(lift,18+quality*7);
  return {x:(base.x*c-base.z*s)*paceBonus,y:lift,z:(base.x*s+base.z*c)*paceBonus,autoRun:base.autoRun};
}

// The player supplies timing. Delivery length and line choose the stroke.
export function assistedStroke(delivery) {
  if (!delivery) return 'Straight drive';
  const offSide = delivery.lineX * (delivery.battingHand === 'left' ? -1 : 1);
  if (delivery.length === 'Bouncer') return 'Hook';
  if (delivery.length === 'Short') return offSide > .26 ? 'Cut' : 'Pull';
  if (delivery.length === 'Yorker') return 'Defend';
  if (delivery.spin && delivery.length === 'Good') return 'Sweep';
  if (offSide < -.25) return 'Flick';
  return 'Straight drive';
}
