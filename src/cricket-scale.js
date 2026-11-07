// Modern world units are metres. The authored rig keeps its local joint
// coordinates; only its root is scaled, and all world-space reach follows it.
export const CRICKET=Object.freeze({athleteScale:.54,ballRadius:.036,ballMass:.156,wicketHeight:.711,wicketHalfWidth:.114,pitchTop:.12});
export const athleteScale=p=>p.scale?.y??1;
export const groundHeight=(x,z)=>Math.abs(x)<2.5&&Math.abs(z)<12.5?CRICKET.pitchTop:0;
export const ankleHeight=p=>groundHeight(p.position.x,p.position.z)+.07*athleteScale(p);
export const gloveRadius=p=>CRICKET.ballRadius+.115*athleteScale(p)+.045;
