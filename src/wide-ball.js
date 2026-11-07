import {CRICKET} from './cricket-scale.js';
// ICC Men's T20I playing conditions, October 2026: clauses 7.5, 22 and
// Appendix C. Painted lines guide the off-side decision; they are not a
// substitute for striker position, reach, contact or a no-ball override.
export const WIDE_GUIDE=1.32-.4318;
export function judgeWide({x,height,hand='right',guardX=hand==='left'?.35:-.35,releaseX=guardX,strikerX=releaseX,headHeight=1.95,bounced=true,noBall=false,touched=false}){
  if(noBall||touched)return false;
  if(bounced&&height-CRICKET.ballRadius>headHeight)return true;
  const off=hand==='left'?-1:1;
  const normal=x*off,release=(x-releaseX+guardX)*off,current=(x-strikerX+guardX)*off;
  // Strict limited-overs leg-side interpretation, behind the normal leg line.
  const outside=value=>value>WIDE_GUIDE+CRICKET.ballRadius||value<guardX*off-.16-CRICKET.ballRadius;
  return outside(normal)&&outside(release)&&outside(current);
}
