import {instanceFixtures} from './stadium-fixtures.js';
import {RenderQuality} from './render-quality.js';
import {manageRendererLifetime} from './renderer-lifetime.js';
import {sanctionFromBall,fieldRestrictionFault,fieldForDelivery,opponentStroke} from './modern-field.js';
import {modernBowlingVariation} from './bowling-profiles.js';
import {firstPadContact,lbwEligible} from './pad-contact.js';
import { signalOutcome } from './modern-umpire.js';
import { createDeliveryBenchmark } from './delivery-benchmark.js';
import * as THREE from 'three';
import {judgeWide,WIDE_GUIDE} from './wide-ball.js';
import {poseGroundFielding} from './ground-fielding.js';
import {applyFieldingContact} from './fielding-contact.js';
import {BallCamera,broadcastPhase,fixedBroadcastView,replayBroadcastView} from './ball-camera.js';
import {DEFAULT_MATCH_OVERS,MATCH_FORMATS,matchFormat} from './match-format.js';
import {CRICKET,athleteScale,ankleHeight,gloveRadius} from './cricket-scale.js';
import {poseBowling,poseBatting,poseKeeping,poseBattingReady} from './cricket-actions.js';
import {safeOpeningSingle,sweptContact} from './fielding-planner.js';
import {sweptWicketHit,groundedAtCrease,strikerBreaksWicket} from './return-throw.js';
import { stepRun, judgeThrow, runnerAtEnd, requestRun, callDown, overthrowAllowance } from './running.js';
import { SHOT_KEYS, shotVelocity, canReachDelivery } from './shots.js';
import { createMatchStats, batterStats, bowlerStats, recordDelivery, strikeRate, economyRate } from './match-stats.js';
import { battingSetup, resetBowlerModel, resetFielderModel, nonStrikerPosition, bowlingArmAngle, shoulderOffsets } from './player-pose.js';
import { throwPosition } from './ball-path.js';
import { advanceBall, initPhysics, resetBallPhysics, syncAthletes, setBallSpin } from './physics.js';
import { deliveryHeight, pickDelivery, scoreDelivery, nextFreeHit, deliverySpeed, keeperCanCollect, wicketIntersection } from './delivery.js';
import { resolveEra } from './eras.js';
import { mountEditionUI, decorateSetup, updateVenueUI, VENUES } from './edition-ui.js';
import { createAthlete, dressAthlete, solveArm, gripBat, solveLeg, plantFeet, plantStandingFeet } from './athlete.js';
import { moveAthlete, resetMotor, turnAthlete, poseLocomotion, idleAthlete, groundRunningBat } from './athlete-motion.js';
import { deliveryLaunch, modernShotResponse, modernDeliveryLine, assistedStroke, outsideEdge, edgeVelocity } from './modern-cricket.js';
import { advanceAthleticRun } from './locomotion.js';
import { batchAthletes } from './athlete-batch.js';
import { buildModernCrowd, markCrowdMatrices } from './modern-crowd.js';
import { ReturnController, runnerGroundPoints, touchWicketWithBall } from './return-controller.js';
import { FieldingController, handPoint } from './fielding-controller.js';
import { buildModernStadium } from './modern-stadium.js';
const era=resolveEra(new URLSearchParams(location.search).get('era'))||resolveEra('97');
const rosterProfiles=era.rosters;
let venueId='horizon', frameDelta=1/60,fieldingLab=null;

import { resolveToss } from './toss.js';
import { powerRemaining, consumePower } from './power.js';
import { bowlingProfile, bowlingOrder, bowlingVariation, keeperIndex } from './bowling-profiles.js';
import './style.css';

const teamDesigns={India:{flag:'🇮🇳',color:0x2266ae},Australia:{flag:'🇦🇺',color:0xe3c74c},England:{flag:'🏴',color:0xeee9d9},'West Indies':{flag:'🌴',color:0x812c40},Pakistan:{flag:'🇵🇰',color:0x278443},'South Africa':{flag:'🇿🇦',color:0x2f865a}};
if(era.modern){const colors={India:0x157acb,Australia:0xf2cc35,England:0x183f7a,'West Indies':0x922e47,Pakistan:0x137b52,'South Africa':0x126b54};for(const[name,color]of Object.entries(colors))teamDesigns[name].color=color;}
const teams=Object.fromEntries(Object.entries(teamDesigns).map(([name,design])=>[name,{...design,players:rosterProfiles[name].map(p=>p.name)}]));
const profiles=new Map(Object.values(rosterProfiles).flat().map(p=>[p.name,p]));
function profile(name){return profiles.get(name)||{name,bat:'right',bowl:'right'}}

let difficulty='normal', replayBoundaries=false, replayWickets=false, matchOvers=DEFAULT_MATCH_OVERS;let home='India',away='Australia',squads={},state={phase:'ready',innings:0,score:[0,0],wickets:[0,0],balls:[0,0],history:[],extras:[0,0],stats:createMatchStats(),shot:null,line:'Good',batIndex:0,striker:0,partner:1,nextBatter:2,bowlIndex:8,anim:null,camera:0,muted:true,shotDirection:0,autoAt:0};
Object.entries(teams).forEach(([k,v])=>squads[k]=era.modern?[...v.players]:[...v.players,'Reserve A','Reserve B','Reserve C','Reserve D']);
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const app=document.querySelector('#app');
app.innerHTML=`<div class="shell"><header class="topbar"><div class="brand"><div class="brand-icon">◉</div><div class="brand-name">CRICKET<span> <em>1997</em></span><small>THE CLASSIC GAME</small></div></div><nav class="topnav"><span class="active">MATCH DAY</span><span>THE PAVILION</span><span>HOW TO PLAY</span></nav><div class="top-right"><span class="edition"><i class="live-dot"></i> THE CLASSIC EDITION</span><button class="sound" id="sound">♪ SOUND OFF</button></div></header><main class="main"><div class="herohead"><div><div class="eyebrow">● &nbsp; THE GENTLEMAN'S GAME, REIMAGINED</div><h1>WELCOME TO <span>THE CREASE.</span></h1></div><p>A little nostalgia. A lot of cricket.<br>Pick your side and make every ball count.</p></div><div class="game-layout"><section class="stage" id="stage"><div class="stage-top"><span id="broadcast" class="visually-hidden">MATCH PREVIEW</span><div class="live-tools"><span class="live-badge" id="live-badge"><i></i> LIVE</span><button id="pause-game" class="fullscreen-control" aria-label="Pause match" title="Pause match">Ⅱ</button><button id="fullscreen" class="fullscreen-control" aria-label="Enter fullscreen" title="Enter fullscreen">⛶</button></div></div><div class="play-status" id="play-status">MATCH PREVIEW</div><div class="commentary" id="commentary" aria-live="polite">WELCOME TO THE GRAND OVAL</div><div class="delivery-speed" id="delivery-speed" hidden></div><div id="ball-flight-label" class="ball-flight-label" hidden></div><div class="stage-controls hidden" id="stage-controls"></div><div class="run-inset hidden" id="run-inset"><div id="run-inset-label">BATTERS RUNNING</div><div class="run-camera" id="run-camera"></div><small>LIVE PITCH VIEW</small></div><div class="tab-pause hidden" id="tab-pause"><div><strong>MATCH PAUSED</strong><p>Another game tab is active.</p><button id="resume-match">RESUME THIS MATCH</button></div></div><div class="player-intro hidden" id="player-intro" aria-live="polite"></div><div class="replay-ui hidden" id="replay-ui"><span>◉ &nbsp; ACTION REPLAY</span><button id="skip-replay">SKIP REPLAY &nbsp; ⏭</button></div><div class="broadcast-score" id="broadcast-score" aria-label="Live match figures"></div><div class="stage-bottom"><div class="ground-label"><span id="ground-time">A PERFECT DAY FOR CRICKET</span><strong>THE GRAND OVAL</strong><span id="ground-conditions">EST. 1997 &nbsp; / &nbsp; CLEAR SKIES</span></div><div class="stage-message" id="message">YOUR MATCH AWAITS<br><span style="color:#aabbab">SET YOUR TEAMS TO BEGIN</span></div></div></section><aside class="sidebar"><section class="panel"><div class="panel-head">THE SCOREBOARD <span class="tag" id="innings-tag">QUICK MATCH</span></div><div class="score" id="score"></div></section><section class="panel"><div class="panel-head">MATCH DETAILS <span class="tag" id="match-time">● &nbsp; DAY MATCH</span></div><div class="match-info"><div class="info-row"><span>Venue</span><b>The Grand Oval</b></div><div class="info-row"><span>Match type</span><b id="match-format">5 overs per side</b></div><div class="info-row"><span>Conditions</span><b id="conditions">Clear & sunny &nbsp; ☀</b></div><div class="stage-actions"><button class="camera" id="lighting" aria-label="Switch to night match">☀ DAY</button><button class="camera" id="camera">◈ &nbsp; CAMERA: AUTO [C]</button></div></div></section><section class="panel controls"><div class="control-title" id="control-title">READY TO PLAY?</div><div class="hint" id="hint">Choose your teams and playing XI, then step out onto the field.</div><div id="controls"></div></section></aside></div><footer class="bottomline"><span>BUILT FOR THE LOVE OF <b>THE GAME.</b> &nbsp; © 1997 / REIMAGINED</span><div class="bottom-links"><button id="help">GAMEPLAY / SHOTS</button><button id="audio-credits">AUDIO CREDITS</button><button id="newmatch">NEW MATCH ↗</button></div></footer></main></div><div id="modal-root"></div>`;
const $=s=>document.querySelector(s), stage=$('#stage');
mountEditionUI(era);

// A small, deliberately low-poly cricket ground.
const scene=new THREE.Scene();scene.background=new THREE.Color(0x9fc5c2);scene.fog=new THREE.Fog(0x9fc5c2,100,240);
const mobileRender=era.modern && matchMedia('(pointer: coarse)').matches;
const renderer=new THREE.WebGLRenderer({antialias:!mobileRender});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;stage.prepend(renderer.domElement);
const rendererReleased=manageRendererLifetime(renderer);
const benchmark = import.meta.env.DEV && new URLSearchParams(location.search).has('benchmark')
  ? createDeliveryBenchmark(() => renderer.getPixelRatio()) : null;
if (benchmark) {
  window.cricketBenchmark = () => benchmark.report();
  document.addEventListener('visibilitychange', () => benchmark.interrupt());
}
const camera=new THREE.PerspectiveCamera(era.modern?36:43,1,.1,400);const hemi=new THREE.HemisphereLight(0xe4f3df,0x61784d,2.1);scene.add(hemi);const sun=new THREE.DirectionalLight(0xffedc4,2.1);sun.position.set(-30,60,20);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-65;sun.shadow.camera.right=65;sun.shadow.camera.top=65;sun.shadow.camera.bottom=-65;scene.add(sun);
if(era.modern){sun.shadow.mapSize.setScalar(mobileRender?512:1024);sun.shadow.bias=-.00015;sun.shadow.normalBias=.03;}
const floodFill=new THREE.DirectionalLight(0xdbe8ff,0);floodFill.position.set(35,45,-30);scene.add(floodFill);
const mat=c=>new THREE.MeshStandardMaterial({color:c,roughness:1});const grass=mat(0x4f8b40), grass2=mat(0x579647), chalk=mat(0xe9e5c8), pitchmat=mat(0xc6ad77), dark=mat(0x293f33);
function box(w,h,d,m,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.receiveShadow=true;scene.add(o);return o}
const field=new THREE.Mesh(new THREE.CircleGeometry(62,96),grass);field.rotation.x=-Math.PI/2;field.receiveShadow=true;scene.add(field);
// Alternating mowing bands clipped by the circular ground.
for(let x=-55;x<=55;x+=10){let half=Math.sqrt(Math.max(0,59*59-x*x));if(half<1)continue;box(4.8,.025,half*2,grass2,x,.015,0)}
function ring(radius,tube,color,y){const mesh=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,5,120),mat(color));mesh.rotation.x=Math.PI/2;mesh.position.y=y;scene.add(mesh)}ring(50,.12,0xeee6c6,.09);ring(62,.32,0xddd2ac,.1);
// Regulation-style inner fielding circle: two 30-yard arcs joined by straight lines.
{const radius=era.modern?27.43:27.4,end=era.modern?10.4:10.06;const pts=[];for(let i=0;i<=80;i++){let a=Math.PI*i/80;pts.push(new THREE.Vector3(Math.cos(a)*radius,.11,-end-Math.sin(a)*radius))}for(let i=0;i<=80;i++){let a=Math.PI+Math.PI*i/80;pts.push(new THREE.Vector3(Math.cos(a)*radius,.11,end-Math.sin(a)*radius))}pts.push(pts[0].clone());scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0xf2ead1})));}
box(5,.08,25,pitchmat,0,.08,0);box(5.6,.025,.12,chalk,0,.14,-9.3);box(5.6,.025,.12,chalk,0,.14,9.3);box(.1,.025,2.7,chalk,-2.5,.14,-10);box(.1,.025,2.7,chalk,2.5,.14,-10);box(.1,.025,2.7,chalk,-2.5,.14,10);box(.1,.025,2.7,chalk,2.5,.14,10);
if(era.modern)for(const z of [-9.85,9.85])for(const x of [-WIDE_GUIDE,WIDE_GUIDE])box(.035,.012,1.1,chalk,x,.149,z);
// Faceted tiers, repeated crowd and roof supports make the stadium read at a distance.
for(let tier=0;tier<4;tier++){let geo=new THREE.RingGeometry(64+tier*3,67+tier*3,64);let m=new THREE.Mesh(geo,mat([0x938a6b,0x7c7762,0xaaa080,0x6f7461][tier]));m.rotation.x=-Math.PI/2;m.position.y=.5+tier*1.8;scene.add(m)}
// Concrete risers, fascia and a continuous roof frame the spectator sections.
for(let tier=0;tier<4;tier++){let radius=64+tier*3;let wall=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,1.8,96,1,true),new THREE.MeshStandardMaterial({color:[0x777962,0x696e5f,0x8a8872,0x656d5e][tier],side:THREE.DoubleSide,roughness:1}));wall.position.y=.5+tier*1.8-.9;scene.add(wall)}
let roof=new THREE.Mesh(new THREE.RingGeometry(76.5,84,96),new THREE.MeshStandardMaterial({color:0x455d50,side:THREE.DoubleSide,roughness:1}));roof.rotation.x=-Math.PI/2;roof.position.y=13.3;scene.add(roof);
let roofLip=new THREE.Mesh(new THREE.CylinderGeometry(76.5,76.5,.45,96,1,true),new THREE.MeshStandardMaterial({color:0xddd8bc,side:THREE.DoubleSide}));roofLip.position.y=13.15;scene.add(roofLip);
const crowdColors=[0xded5bc,0x526d5a,0xa65346,0xdec66e,0x7c9aaa,0xe7dfc7,0x855d4b];
// Instanced heads and torsos give each spectator a silhouette without thousands of draw calls.
const crowdCount=mobileRender?1560:5200;
const crowdBatchSize=crowdCount/10;
const crowdBody=new THREE.InstancedMesh(new THREE.CapsuleGeometry(.25,.43,2,5),mat(0xffffff),crowdCount),crowdHead=new THREE.InstancedMesh(new THREE.SphereGeometry(.19,6,4),mat(0xffffff),crowdCount);const dummy=new THREE.Object3D(),spectators=[];
for(let i=0;i<crowdCount;i++){let a=Math.random()*Math.PI*2,r=65+Math.random()*11,y=.8+(r-65)*.58;dummy.position.set(Math.sin(a)*r,y+.5,Math.cos(a)*r);dummy.rotation.set(0,-a,Math.random()*.15-.075);dummy.scale.setScalar(.75+Math.random()*.45);spectators.push({x:dummy.position.x,y:dummy.position.y,z:dummy.position.z,rotation:dummy.rotation.y,lean:dummy.rotation.z,scale:dummy.scale.x,phase:Math.random()*Math.PI*2});dummy.updateMatrix();crowdBody.setMatrixAt(i,dummy.matrix);crowdBody.setColorAt(i,new THREE.Color(crowdColors[i%crowdColors.length]));dummy.position.y=y+1.08;dummy.updateMatrix();crowdHead.setMatrixAt(i,dummy.matrix);crowdHead.setColorAt(i,new THREE.Color([0xd5a681,0x9c694d,0xe3bc96,0x714c3b][i%4]));}if(era.modern){crowdBody.geometry.dispose();crowdBody.geometry=mobileRender?new THREE.OctahedronGeometry(1).scale(.25,.465,.25):new THREE.CapsuleGeometry(.25,.43,1,4);crowdHead.geometry.dispose();crowdHead.geometry=mobileRender?new THREE.OctahedronGeometry(.19):new THREE.SphereGeometry(.19,4,3);}
if(era.modern)for(const mesh of [crowdBody,crowdHead])mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(crowdBody,crowdHead);
const modernCrowd=era.modern?buildModernCrowd(scene,spectators):null;
// Small team flags in the stands, rendered locally without external images.
const flagPoles=[];const flagMaterial=[0,1].map(()=>new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));
function flagTexture(team){let c=document.createElement('canvas');c.width=180;c.height=110;let x=c.getContext('2d');x.fillStyle='#ffffff';x.fillRect(0,0,180,110);
 if(team==='India'){x.fillStyle='#f59238';x.fillRect(0,0,180,37);x.fillStyle='#21824a';x.fillRect(0,74,180,36);x.strokeStyle='#183a78';x.lineWidth=4;x.beginPath();x.arc(90,55,14,0,Math.PI*2);x.stroke()}
 else if(team==='Australia'){x.fillStyle='#203d83';x.fillRect(0,0,180,110);x.fillStyle='#fff';for(let p of [[125,23],[145,55],[116,76],[157,86],[76,80]]){x.beginPath();x.arc(...p,5,0,Math.PI*2);x.fill()}x.fillRect(0,20,78,10);x.fillRect(32,0,10,50);x.fillStyle='#c83e44';x.fillRect(0,23,78,4);x.fillRect(35,0,4,50)}
 else if(team==='England'){x.fillStyle='#bf3037';x.fillRect(0,45,180,20);x.fillRect(80,0,20,110)}
 else if(team==='Pakistan'){x.fillStyle='#147348';x.fillRect(0,0,180,110);x.fillStyle='#fff';x.fillRect(0,0,35,110);x.beginPath();x.arc(105,55,28,0,Math.PI*2);x.fill();x.fillStyle='#147348';x.beginPath();x.arc(116,47,24,0,Math.PI*2);x.fill()}
 else if(team==='West Indies'){x.fillStyle='#812c40';x.fillRect(0,0,180,110);x.fillStyle='#ecc868';x.font='bold 46px Arial';x.textAlign='center';x.fillText('WI',90,72)}
 else {x.fillStyle='#c73c39';x.fillRect(0,0,180,52);x.fillStyle='#2c5093';x.fillRect(0,58,180,52);x.strokeStyle='#fff';x.lineWidth=22;x.beginPath();x.moveTo(0,0);x.lineTo(70,55);x.lineTo(0,110);x.stroke();x.strokeStyle='#248859';x.lineWidth=13;x.beginPath();x.moveTo(0,0);x.lineTo(70,55);x.lineTo(0,110);x.moveTo(60,55);x.lineTo(180,55);x.stroke()}
 let t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const fixtures=new Map();
function groupFixture(kind,mesh){
  if(era.modern){
    if(!fixtures.has(kind))fixtures.set(kind,[]);
    fixtures.get(kind).push(mesh);
  }
  return mesh;
}
for(let i=0;i<32;i++){let a=i*Math.PI*2/32,r=69+(i%3)*3,x=Math.sin(a)*r,z=Math.cos(a)*r,y=3+(r-65)*.58;groupFixture('flagpole',box(.07,3,.07,mat(0xeee7d1),x,y+1.3,z));let flag=new THREE.Mesh(new THREE.PlaneGeometry(2,1.2),flagMaterial[i%2]);flag.position.set(x+.95,y+2.2,z);flag.rotation.y=a;scene.add(flag);flagPoles.push(flag)}
function updateCrowd(){for(let i=0;i<crowdCount;i++){let color=i%7===0?crowdColors[i%crowdColors.length]:(i%2?teams[home].color:teams[away].color);crowdBody.setColorAt(i,new THREE.Color(color))}crowdBody.instanceColor.needsUpdate=true;[home,away].forEach((t,i)=>{if(flagMaterial[i].map)flagMaterial[i].map.dispose();flagMaterial[i].map=flagTexture(t);flagMaterial[i].needsUpdate=true})}
for(let i=0;i<16;i++){let a=i*Math.PI*2/16,x=Math.sin(a)*78,z=Math.cos(a)*78;groupFixture('support',box(.45,12,.45,mat(0xc8c3a7),x,6,z));let roof=groupFixture('support-roof',box(8,.5,5,mat(0x3c5949),x,12,z));roof.rotation.y=a;}
// Floodlight towers are visible in either mode; lamps and cool fill light switch on at night.
const lamps=[];
for(const [x,z] of [[-68,-68],[68,-68],[-68,68],[68,68]]){
 const mast=box(.8,28,.8,mat(0x7d8986),x,14,z);mast.castShadow=false;
 const bank=box(8,3,.6,mat(0x303d43),x,28,z);bank.lookAt(0,28,0);
 for(let row=0;row<2;row++)for(let col=0;col<6;col++){
  const lamp=new THREE.Mesh(new THREE.SphereGeometry(.32,6,4),new THREE.MeshBasicMaterial({color:0xb6bdb2}));
  lamp.position.set((col-2.5)*1.15,(row-.5)*1.1,-.4);bank.add(lamp);lamps.push(lamp);
 }
}
if(era.modern){const lampBatch=instanceFixtures(scene,lamps);lamps.splice(0,lamps.length,lampBatch);}
let modernStadium=era.modern?buildModernStadium(scene,{grass,grass2,pitchmat,roof,roofLip,renderer,mobileRender}):null;
let night=false;
function setTimeOfDay(value){
 night=value;if(era.modern)renderer.shadowMap.needsUpdate=true;modernStadium?.setNight(night);scene.background.setHex(night?0x101e32:0x9fc5c2);scene.fog.color.copy(scene.background);
 hemi.intensity=night?.72:2.1;hemi.color.setHex(night?0x9ab2d6:0xe4f3df);
 sun.intensity=night?.5:2.1;sun.color.setHex(night?0xc4d8ff:0xffedc4);floodFill.intensity=night?(era.modern?3.4:2.1):0;
 if(era.modern){hemi.intensity=night?1.55:2.1;sun.intensity=night?1.1:2.1;scene.background.setHex(night?VENUES[venueId].sky:0x9fcbd4);scene.fog.color.copy(scene.background);}
 lamps.forEach(l=>l.material.color.setHex(night?0xfff5cf:0xb6bdb2));
 $('#lighting').textContent=night?'☾ NIGHT':'☀ DAY';$('#lighting').setAttribute('aria-label',night?'Switch to day match':'Switch to night match');
 $('#match-time').textContent=night?'●   NIGHT MATCH':'●   DAY MATCH';$('#conditions').textContent=night?'Under floodlights ☾':'Clear & sunny ☀';
 $('#ground-time').textContent=night?'CRICKET UNDER LIGHTS':'A PERFECT DAY FOR CRICKET';$('#ground-conditions').textContent=night?'EST. 1997  /  FLOODLIT':'EST. 1997  /  CLEAR SKIES';
}
$('#lighting').onclick=()=>setTimeOfDay(!night);
// Advertising hoardings facing the pitch.
// In-game advertising panels sit outside the boundary rope.
function modernBoardTexture(kind){const c=document.createElement('canvas');c.width=1024;c.height=192;const x=c.getContext('2d');const bright=['zephyr','cricket','kestrel'].includes(kind);x.fillStyle=bright?'#c3ff54':'#092332';x.fillRect(0,0,1024,192);x.fillStyle=bright?'#0e2920':'#ecf9ec';x.font='900 62px Arial';x.textBaseline='middle';x.textAlign='center';x.fillText(kind==='oval'?VENUES[venueId].name.toUpperCase():kind==='sport'?'THEN. NOW. ALWAYS.':'2027 EDITION',512,98,960);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
function adTexture(kind){if(era.modern)return modernBoardTexture(kind);let c=document.createElement('canvas');c.width=512;c.height=96;let x=c.getContext('2d');let data={kestrel:['#c51e27','#ffffff','KESTREL TEA'],zephyr:['#1c5fd8','#ffffff','ZEPHYR'],northwind:['#53236f','#ffffff','NORTHWIND'],cricket:['#e9e2c6','#214437','1997 EDITION'],oval:['#183b30','#e7c866','THE GRAND OVAL'],sport:['#f2efe5','#173c64','SPORTS LIVE']}[kind];x.fillStyle=data[0];x.fillRect(0,0,512,96);x.strokeStyle='#ffffff44';x.lineWidth=3;x.strokeRect(2,2,508,92);x.fillStyle=data[1];x.textAlign='center';x.textBaseline='middle';x.font=`900 ${kind==='oval'?52:60}px Arial`;x.fillText(data[2],256,50,490);let t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
 return t}
const adKinds=['kestrel','zephyr','northwind','cricket','zephyr','oval','kestrel','sport'];const adMaterials=Object.fromEntries([...new Set(adKinds)].map(k=>[k,new THREE.MeshBasicMaterial({map:adTexture(k),side:THREE.DoubleSide})]));
for(let i=0;i<32;i++){let a=i*Math.PI*2/32,rad=61;let b=box(11,2,.3,mat(0xe8e3cc),Math.sin(a)*rad,1.12,Math.cos(a)*rad);groupFixture('boundary-board',b);b.rotation.y=a;let panel=new THREE.Mesh(new THREE.PlaneGeometry(10.8,1.8),adMaterials[adKinds[i%adKinds.length]]);panel.position.set(Math.sin(a)*(rad-.18),1.12,Math.cos(a)*(rad-.18));panel.rotation.y=a+Math.PI;scene.add(panel);groupFixture(panel.material.uuid+panel.geometry.parameters.width,panel)}
for(let i=0;i<16;i++){let a=(i+.5)*Math.PI*2/16,r=76.2;let panel=new THREE.Mesh(new THREE.PlaneGeometry(12,1.5),adMaterials[adKinds[(i+2)%adKinds.length]]);panel.position.set(Math.sin(a)*r,9,Math.cos(a)*r);panel.rotation.y=a+Math.PI;scene.add(panel);groupFixture(panel.material.uuid+panel.geometry.parameters.width,panel)}
for(const group of fixtures.values())instanceFixtures(scene,group);
fixtures.clear();
function stumps(z){let group=new THREE.Group(),wood=mat(0xe8d9ad);group.position.z=z;for(let x of [-.35,0,.35]){let o=new THREE.Mesh(new THREE.BoxGeometry(.09,1.2,.09),wood);o.position.set(x,.7,0);group.add(o)}for(let x of [-.18,.18]){let o=new THREE.Mesh(new THREE.BoxGeometry(.38,.065,.09),wood);o.position.set(x,1.34,0);group.add(o)}group.children.forEach((o,i)=>{o.castShadow=true;o.userData.initial=o.position.clone();o.userData.index=i});if(era.modern){group.scale.set(.228/.79,.711/1.275,1);group.position.y=.12-.1*group.scale.y;}scene.add(group);return group}
const farStumps=stumps(-10.4),nearStumps=stumps(10.4),wicketParts=[...farStumps.children,...nearStumps.children];
function resetWickets(){wicketParts.forEach(o=>{o.position.copy(o.userData.initial);o.rotation.set(0,0,0)})}
function breakWicket(now){state.anim.wicketBrokenAt=now}
function animateWicket(now){let when=state.anim?.wicketBrokenAt;if(when===undefined)return;let t=Math.max(0,(now-when)/1000);(state.anim?.throwEnd==='bowler'?farStumps:nearStumps).children.forEach((o,i)=>{let dir=i%2?1:-1;o.rotation.z=dir*Math.min(1.35,t*(i<3?2.5:5));o.rotation.x=Math.min(1.2,t*2);o.position.x=o.userData.initial.x+dir*Math.min(1.5,t*(i<3?.5:1.3));o.position.y=Math.max(i<3?.18:.12,o.userData.initial.y+Math.sin(Math.min(t*3,Math.PI))*(i<3?.05:.9)-t*t*2);o.position.z=Math.min(1.2,t*(i<3?.3:.9))})}
function player(x,z,shirt,heading=0,role='fielder'){
 if(era.modern){const p=createAthlete(scene,x,z,shirt,heading,role);p.scale.setScalar(CRICKET.athleteScale);p.userData.head.scale.setScalar(.9);return p;}
 const g=new THREE.Group(),white=mat(0xe5e1d2),skin=mat(0xb97f5c),kit=mat(shirt),shoes=mat(0x393b34),hair=mat(0x292b25);g.userData.kit=kit;
 function mesh(parent,geometry,material,x,y,z){const o=new THREE.Mesh(geometry,material);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o}
 // A tapered shirt, collar and waist create a more athletic silhouette.
 mesh(g,new THREE.CylinderGeometry(.46,.36,1.18,12),kit,0,2.25,0).scale.set(1.12,1,.7);
 mesh(g,new THREE.CylinderGeometry(.27,.31,.12,12),white,0,2.86,0).scale.z=.75;
 mesh(g,new THREE.SphereGeometry(.34,12,8),white,0,1.55,0).scale.set(1.05,.48,.7);
 if(role!=='umpire'){const c=document.createElement('canvas');c.width=512;c.height=160;let texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;let label=new THREE.Mesh(new THREE.PlaneGeometry(.92,.32),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide,depthWrite:false}));label.position.set(0,2.55,-.35);label.rotation.y=Math.PI;g.add(label);g.userData.nameCanvas=c;g.userData.nameTexture=texture;}

 const head=new THREE.Group();head.position.y=3.37;g.add(head);g.userData.head=head;
 mesh(head,new THREE.SphereGeometry(.32,12,10),skin,0,0,0).scale.set(.9,1.1,.9);
 mesh(head,new THREE.SphereGeometry(.33,10,6,0,Math.PI*2,0,Math.PI*.45),role==='umpire'?white:hair,0,.13,0);
 const eye=mat(0x211d1b);for(const x of [-.11,.11])mesh(head,new THREE.SphereGeometry(.035,6,6),eye,x,.04,.278);
 mesh(head,new THREE.SphereGeometry(.065,8,6),skin,0,-.02,.29).scale.set(.7,1,1.2);
 function arm(x){const pivot=new THREE.Group();pivot.position.set(x,2.8,0);g.add(pivot);
  mesh(pivot,new THREE.CapsuleGeometry(.13,.28,4,8),kit,0,-.22,0);
  const elbow=new THREE.Group();elbow.position.y=-.45;pivot.add(elbow);pivot.userData.elbow=elbow;
  mesh(elbow,new THREE.CapsuleGeometry(.115,.27,4,8),kit,0,-.22,0);
  const hand=mesh(elbow,new THREE.SphereGeometry(.15,8,6),(role==='batter'||role==='keeper')?white:skin,0,-.46,0);pivot.userData.hand=hand;hand.userData.digits=[];if(role==='batter')hand.visible=false;else {for(let finger=0;finger<4;finger++){let digit=mesh(hand,new THREE.CapsuleGeometry(.025,.10,2,5),(role==='keeper')?white:skin,(finger-1.5)*.055,-.15,.025);digit.rotation.x=.12;hand.userData.digits.push(digit)}let thumb=mesh(hand,new THREE.CapsuleGeometry(.03,.11,2,5),(role==='keeper')?white:skin,x<0?-.16:.16,-.03,.02);thumb.rotation.z=x<0?-.7:.7}return pivot}
 // The model faces local +Z: its anatomical left is local +X.
 const shoulders=shoulderOffsets(),leftArm=arm(shoulders.left),rightArm=arm(shoulders.right);leftArm.rotation.z=.15;rightArm.rotation.z=-.15;
 function leg(x){const pivot=new THREE.Group();pivot.position.set(x,1.45,0);g.add(pivot);
  mesh(pivot,new THREE.CapsuleGeometry(.15,.34,4,8),white,0,-.3,0);
  const knee=new THREE.Group();knee.position.y=-.62;pivot.add(knee);pivot.userData.knee=knee;
  mesh(knee,new THREE.CapsuleGeometry(.13,.35,4,8),white,0,-.28,0);
  mesh(knee,new THREE.SphereGeometry(.19,8,6),shoes,0,-.61,.12).scale.set(1,.55,1.65);
  if(role==='batter'){let pad=mesh(knee,new THREE.CapsuleGeometry(.19,.36,3,6),white,0,-.27,.14);pad.scale.z=.55}
  return pivot}
 const leftLeg=leg(-.23),rightLeg=leg(.23);g.userData.knees=[leftLeg.userData.knee,rightLeg.userData.knee];
 if(role==='batter'){
  mesh(head,new THREE.SphereGeometry(.37,10,8,0,Math.PI*2,0,Math.PI*.48),kit,0,.08,0);
  // Both gloves share the grip; arm pivots are aimed at it each frame.
  const bat=new THREE.Group();bat.position.set(0,1.9,.3);g.add(bat);
  mesh(bat,new THREE.CylinderGeometry(.05,.05,.55,8),mat(0x61432d),0,-.2,0);
  mesh(bat,new THREE.BoxGeometry(.38,1.12,.14),mat(0xd9b578),0,-.92,0);
  mesh(bat,new THREE.SphereGeometry(.14,8,6),white,-.08,-.04,0);mesh(bat,new THREE.SphereGeometry(.14,8,6),white,.08,-.22,0);
  g.userData.bat=bat;

 }
 if(role==='umpire')mesh(g,new THREE.CylinderGeometry(.47,.47,.07,12),white,0,3.62,0);
 g.position.set(x,0,z);g.rotation.y=heading;g.userData.arms=[leftArm,rightArm];g.userData.elbows=[leftArm.userData.elbow,rightArm.userData.elbow];g.userData.legs=[leftLeg,rightLeg];scene.add(g);return g
}
// Striker stands behind the popping crease, in front of the stumps. The non-striker
// is grounded behind the opposite crease and clear of the bowler's approach.
let batter=player(.12,9.8,0x276caf,Math.PI/2,'batter'),nonStriker=player(-1.85,-9.75,0x276caf,0,'batter'),bowler=player(1.5,-20,0xe0c84e),keeper=player(0,13.6,0xe0c84e,Math.PI,'keeper'),umpire=player(.1,-13.1,0xf4f0dd,0,'umpire'),legUmpire=player(-14.5,8,0xf4f0dd,0,'umpire');
keeper.position.y=-.16;keeper.rotation.x=-.36;keeper.userData.arms.forEach(a=>a.rotation.x=-.9);keeper.userData.legs.forEach(l=>l.rotation.x=.2);
const bat=batter.userData.bat;
let fielders=[];[[7,13],[-8,12],[20,7],[-22,4],[27,-20],[-27,-18],[7,-30],[-7,-31],[35,12]].forEach(([x,z])=>{let p=player(x,z,0xe0c84e,Math.PI);p.userData.home=p.position.clone();fielders.push(p)});
const modernFielding=era.modern?new FieldingController([...fielders,bowler]):null;
const matchActors=[batter,nonStriker,bowler,keeper,umpire,legUmpire,...fielders];
let updatePlayerDetail;
if(era.modern)import('./stock-striker.js')
  .then(({loadStockPlayers})=>loadStockPlayers(matchActors))
  .then(update=>{updatePlayerDetail=update;})
  .catch(error=>console.warn('Stock player bodies unavailable.',error));
const athleteBatch=era.modern?batchAthletes(scene,matchActors,{mobile:mobileRender}):null;
// The batch updates world matrices before copying joint transforms into instances.
// Keep that single update for the main draw and the pitch inset.
if(athleteBatch)scene.matrixWorldAutoUpdate=false;
let modernShadowFrame=0;
function renderFrame(){updatePlayerDetail?.(camera);athleteBatch?.update();if(era.modern&&state.anim&&++modernShadowFrame%4===0)renderer.shadowMap.needsUpdate=true;renderer.render(scene,camera);}
function facePoint(p,target){p.rotation.y=Math.atan2(target.x-p.position.x,target.z-p.position.z)}
function watchPoint(p,target){let angle=Math.atan2(target.x-p.position.x,target.z-p.position.z)-p.rotation.y;angle=Math.atan2(Math.sin(angle),Math.cos(angle));p.userData.head.rotation.y=THREE.MathUtils.clamp(angle,-1.25,1.25)}
function keeperWalk(p,amount,now){const stride=Math.sin(now*.014)*Math.min(.7,amount*8);stridePose(p,stride);p.userData.knees[0].rotation.x=.38+Math.max(0,-stride)*.7;p.userData.knees[1].rotation.x=.38+Math.max(0,stride)*.7;p.position.y=-.16+Math.abs(stride)*.05;p.rotation.z=stride*.06}
function stridePose(p,stride){p.userData.legs[0].rotation.x=stride;p.userData.legs[1].rotation.x=-stride;p.userData.knees[0].rotation.x=Math.max(0,-stride)*.9;p.userData.knees[1].rotation.x=Math.max(0,stride)*.9}
function aimHandAt(p,armIndex,target){if(era.modern){solveArm(p,armIndex,target);return;}p.userData.elbows[armIndex].rotation.set(0,0,0);p.updateMatrixWorld(true);let arm=p.userData.arms[armIndex],local=p.worldToLocal(target.clone()),direction=local.sub(arm.position),length=direction.length();arm.quaternion.setFromUnitVectors(downward,direction.normalize());arm.scale.y=THREE.MathUtils.clamp(length/.91,.6,1.5)}
function gripFingers(p,armIndex,amount){let hand=p.userData.arms[armIndex].userData.hand;hand.userData.digits.forEach((digit,i)=>digit.rotation.x=.12+amount*(.55+i*.06))}
function handPosition(p,armIndex){return p.userData.arms[armIndex].userData.hand.getWorldPosition(new THREE.Vector3())}
fielders.forEach(p=>facePoint(p,batter.position));
const downward=new THREE.Vector3(0,-1,0);
function aimBattingArms(p){if(era.modern){gripBat(p);return;}let grip=p.userData.bat.position;for(const arm of p.userData.arms){let direction=grip.clone().sub(arm.position),length=direction.length();arm.quaternion.setFromUnitVectors(downward,direction.normalize());arm.scale.y=length/.91}}
function applyBattingStance(p,hand,striker){let pose=battingSetup(hand,striker);p.userData.stance=pose;if(era.modern){poseBattingReady(p,{hand,striker});return;}p.rotation.set(striker?.25:.04,pose.yaw,0);p.userData.head.rotation.set(0,pose.headYaw,0);p.userData.bat.position.set(0,1.9,.3);p.userData.bat.rotation.set(0,0,-pose.sign*.12);p.userData.legs[0].rotation.x=.15;p.userData.legs[1].rotation.x=-.12;p.userData.knees.forEach(k=>k.rotation.x=striker?.35:.12);p.userData.elbows.forEach(e=>e.rotation.set(0,0,0));if(era.modern){p.rotation.x=striker?.06:.02;p.position.y=striker?-.12:-.08;p.userData.torso.rotation.x=.3;p.userData.bat.position.y=2;plantFeet(p);}aimBattingArms(p)}
function resetBowler(){if(era.modern)resetMotor(bowler);return resetBowlerModel(bowler,bowler.userData.bowlHand)}
function placeNonStriker(){let p=nonStrikerPosition(bowler.userData.bowlHand);nonStriker.position.set(p.x,p.y,p.z)}
function resetKeeper(){if(era.modern)resetMotor(keeper);keeper.position.set(0,-.16,keeper.userData.standingZ??13.6);keeper.rotation.set(-.36,Math.PI,0);keeper.userData.arms.forEach(a=>{a.rotation.set(-.9,0,0);a.scale.y=1});keeper.userData.legs.forEach(l=>l.rotation.set(.2,0,0));keeper.userData.knees.forEach(k=>k.rotation.x=.45);keeper.userData.elbows.forEach(e=>e.rotation.x=.25);if(era.modern){keeper.rotation.x=.04;keeper.userData.torso.rotation.x=.42;keeper.userData.elbows.forEach(e=>e.rotation.set(-.25,0,0));keeper.userData.knees.forEach(k=>k.rotation.set(.45,0,0));plantStandingFeet(keeper);}watchPoint(keeper,batter.position)}
function keeperGlove(){return handPosition(keeper,1)}
function holdBallAtRunUp(){ball.position.copy(handPosition(bowler,bowlingHomeArm()))}
function bowlingHomeArm(){return bowler.userData.bowlHand==='left'?0:1}
function resetFielders(){fielders.forEach(p=>{resetFielderModel(p);if(era.modern)resetMotor(p);facePoint(p,batter.position);p.rotation.x=.18;p.userData.knees.forEach(k=>k.rotation.x=.35);if(era.modern){p.rotation.x=.04;plantFeet(p);}watchPoint(p,batter.position)})}
let ball=new THREE.Mesh(new THREE.SphereGeometry(era.modern?CRICKET.ballRadius:.27,era.modern?24:12,era.modern?16:10),mat(era.modern?0xf2f1e8:0x9a2625));ball.position.set(1.5,2,-20);ball.castShadow=true;scene.add(ball);
function ballTrackingTexture(){const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');x.fillStyle='#10242d';x.beginPath();x.arc(16,16,15,0,Math.PI*2);x.fill();x.fillStyle='#fffdf0';x.beginPath();x.arc(16,16,10,0,Math.PI*2);x.fill();return new THREE.CanvasTexture(c);}
const ballGlint=era.modern?new THREE.Points(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]),new THREE.PointsMaterial({color:0xfffdf0,map:ballTrackingTexture(),size:6,sizeAttenuation:false,transparent:true,alphaTest:.1})):null;
if(ballGlint)scene.add(ballGlint);
// A ground marker and short fading trail make a fast ball readable at stadium scale.
let ballMarker=new THREE.Mesh(new THREE.RingGeometry(era.modern?.11:.5,era.modern?.15:.7,24),new THREE.MeshBasicMaterial({color:0xffdc72,transparent:true,opacity:era.modern?.25:.85,side:THREE.DoubleSide,depthTest:false}));ballMarker.rotation.x=-Math.PI/2;ballMarker.visible=false;scene.add(ballMarker);
const trailPositions=new Float32Array(18*3),trailGeometry=new THREE.BufferGeometry();trailGeometry.setAttribute('position',new THREE.BufferAttribute(trailPositions,3));trailGeometry.setDrawRange(0,0);const ballTrail=new THREE.Line(trailGeometry,new THREE.LineBasicMaterial({color:0xffed9f,transparent:true,opacity:.8,depthTest:false}));ballTrail.visible=false;ballTrail.frustumCulled=false;scene.add(ballTrail);let trailPoints=[];
function updateBallVisual(){
 const a=state.anim,flightLabel=$('#ball-flight-label'),hidden=!a?.outOfStadium;
 if(flightLabel.hidden!==hidden)flightLabel.hidden=hidden;
 if(a?.outOfStadium&&flightLabel.textContent!=='SIX • OUT OF THE STADIUM')flightLabel.textContent='SIX • OUT OF THE STADIUM';
 const active=!!a&&(a.flight||(era.modern?(a.simTime||0)>1.8:((performance.now()-a.start)/1000)>1.8));
 if(ballGlint){ballGlint.visible=active;ballGlint.position.copy(ball.position);}
 ballMarker.visible=active;ballTrail.visible=active&&!era.modern;
 if(!active){trailPoints=[];return}
 ballMarker.position.set(ball.position.x,.18,ball.position.z);
 if(era.modern)return;
 trailPoints.push(ball.position.clone());if(trailPoints.length>18)trailPoints.shift();
 const attr=trailGeometry.attributes.position;
 trailPoints.forEach((p,i)=>attr.setXYZ(i,p.x,p.y,p.z));attr.needsUpdate=true;trailGeometry.setDrawRange(0,trailPoints.length);
}
function updateRunInset(){
 const inset=$('#run-inset'),a=state.anim,offPitch=Math.abs(ball.position.x)>4||ball.position.z>12||ball.position.z< -12;
 const show=!!a&&a.live&&['field','pickup'].includes(a.phase)&&offPitch&&state.camera===0&&state.phase!=='replay';
 inset.classList.toggle('hidden',!show);
 if(show){
   const label=$('#run-inset-label'),text=a.runActive?(a.runReturning?'GOING BACK':'BATTERS RUNNING'):'BATTERS HOLDING';
   if(label.textContent!==text)label.textContent=text;
 }
}
const pitchCamera=new THREE.OrthographicCamera(-6.8,6.8,15.5,-15.5,.1,100);pitchCamera.position.set(0,48,0);pitchCamera.up.set(0,0,-1);pitchCamera.lookAt(0,0,0);
function renderPitchInset(){const inset=$('#run-inset');if(inset.classList.contains('hidden'))return;const rect=$('#run-camera').getBoundingClientRect(),base=stage.getBoundingClientRect();const x=rect.left-base.left,y=base.bottom-rect.bottom;if(rect.width<1||rect.height<1)return;renderer.setScissorTest(true);renderer.setScissor(x,y,rect.width,rect.height);renderer.setViewport(x,y,rect.width,rect.height);const old=renderer.autoClear,shadowUpdate=renderer.shadowMap.autoUpdate;renderer.autoClear=false;renderer.shadowMap.autoUpdate=false;renderer.clearDepth();renderer.render(scene,pitchCamera);renderer.shadowMap.autoUpdate=shadowUpdate;renderer.autoClear=old;renderer.setScissorTest(false);renderer.setViewport(0,0,stage.clientWidth,stage.clientHeight)}


function resize(){let w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);document.addEventListener('fullscreenchange',()=>{resize();let full=document.fullscreenElement===stage;$('#fullscreen').setAttribute('aria-label',full?'Exit fullscreen':'Enter fullscreen');$('#fullscreen').title=full?'Exit fullscreen':'Enter fullscreen'});if(window.ResizeObserver)new ResizeObserver(resize).observe(stage);$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement===stage)await document.exitFullscreen();else await stage.requestFullscreen()}catch(err){console.warn('Fullscreen unavailable',err)}};resize();
const cameraNames=['AUTO','STADIUM','BOWLER','KEEPER','BATTER'];
const cameraTarget=new THREE.Vector3(),cameraLook=new THREE.Vector3(),ballCamera=new BallCamera();
let currentBroadcastView=null;
function applyBroadcastView(view){
 camera.position.copy(view.position);camera.lookAt(view.look);
 if(Math.abs(camera.fov-view.fov)>.001){camera.fov=view.fov;camera.updateProjectionMatrix();}
 currentBroadcastView=view;
}
function updateCamera(instant=false){
 if(era.modern){
  const a=state.anim;
  // Close-up inspection views belong only to the optional development lab.
  if(a?.lab&&!a.labBallCamera){
   const p=a.returnThrow?a.returnThrow.state.receiver:a.labPlayer;
   if(a.returnThrow?.state.phase==='windup'){cameraTarget.set(15,16,23);cameraLook.set(7,1,0);}
   else{cameraTarget.set(p.position.x+3.5,2.8,p.position.z+6);cameraLook.set(p.position.x,.9,p.position.z+.5);}
   if(a.phase==='pose'){cameraTarget.set(p.position.x+5,3,p.position.z+8);cameraLook.set(0,1,p.position.z+1.8);}
   applyBroadcastView({id:'inspection',position:cameraTarget,look:cameraLook,fov:36});return;
  }
  if(state.camera===0&&reducedMotion.matches&&state.phase!=='ready'){applyBroadcastView(fixedBroadcastView('stadium'));return;}
  const view=state.camera===0
   ? state.phase==='replay'&&state.replay?.cameraView||ballCamera.update({ball:ball.position,velocity:a?.velocity||a?.deliveryVelocity,active:!!a?.flight,phase:state.phase==='ready'?'preview':broadcastPhase(a),deliveryKey:a,throwEnd:a?.throwEnd,battingHand:!a?.lab&&humanBatting()&&['playing','animating'].includes(state.phase)?(a?.battingHand||profile(lineup().striker).bat):null,dt:frameDelta,aspect:camera.aspect,players:modernFielding.players})
   : fixedBroadcastView(['delivery','stadium','delivery','keeper','batter'][state.camera]);
  applyBroadcastView(view);return;
 }
 let mode=state.camera;if(mode===0)mode=state.anim&&state.anim.flight?1:2;
 if(mode===1){cameraTarget.set(35,50,50);cameraLook.set(0,0,0)}
 else if(mode===2){cameraTarget.set(0,17,-44);cameraLook.set(0,1,4)}
 else if(mode===3){cameraTarget.set(0,6,21);cameraLook.set(0,1,-4)}
 else {cameraTarget.set(5,11,25);cameraLook.set(0,1,2)}
 if(state.camera===0&&state.anim&&state.anim.flight){cameraTarget.set(ball.position.x+13,27,ball.position.z+27);cameraLook.set(ball.position.x,0,ball.position.z)}
 if(instant)camera.position.copy(cameraTarget);else camera.position.lerp(cameraTarget,.055);camera.lookAt(cameraLook);
}updateCamera(true);
function firstBatting(){return state.firstBatting||home}
function secondBatting(){return firstBatting()===home?away:home}
function humanBatting(){return (state.innings===0?firstBatting():secondBatting())===home}
function setKit(){const recolor=(p,color)=>p.userData.kit.color.setHex(color);[batter,nonStriker].forEach(p=>recolor(p,teams[state.innings===0?firstBatting():secondBatting()].color));[bowler,keeper,...fielders].forEach(p=>recolor(p,teams[state.innings===0?secondBatting():firstBatting()].color))}
function setPlayerName(p,name,number){p.userData.playerName=name;if(era.modern){const team=Object.keys(rosterProfiles).find(t=>rosterProfiles[t].some(v=>v.name===name))||home;dressAthlete(p,name,team);}if(!p.userData.nameCanvas)return;let key=`${name}:${number}`;if(p.userData.nameKey===key)return;p.userData.nameKey=key;let c=p.userData.nameCanvas,x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.textAlign='center';x.font='bold 58px Arial';x.lineWidth=8;x.strokeStyle='#263326';x.fillStyle='#fff';let text=name.split(' ').slice(-1)[0].toUpperCase();x.strokeText(text,256,68,480);x.fillText(text,256,68,480);x.font='bold 72px Arial';x.strokeText(String(number),256,143);x.fillText(String(number),256,143);p.userData.nameTexture.needsUpdate=true}
function lineup(){let batting=state.innings===0?firstBatting():secondBatting(),bowling=state.innings===0?secondBatting():firstBatting(),over=Math.floor(state.balls[state.innings]/6),order=bowlingOrder(squads[bowling],matchFormat(matchOvers).bowlers),bowlerIndex=order[Math.min(over,matchOvers-1)%order.length].index;return {batting,bowling,bowlerIndex,striker:squads[batting][Math.min(state.striker,10)],partner:squads[batting][Math.min(state.partner,10)],bowler:squads[bowling][bowlerIndex]}}
function syncPlayers(){let l=lineup();setPlayerName(batter,l.striker,state.striker+1);setPlayerName(nonStriker,l.partner,state.partner+1);setPlayerName(bowler,l.bowler,l.bowlerIndex+1);if(era.modern){batter.position.z=9.8;nonStriker.position.z=-9.75;}batter.position.x=profile(l.striker).bat==='left'?.35:-.35;applyBattingStance(batter,profile(l.striker).bat,true);applyBattingStance(nonStriker,profile(l.partner).bat,false);bowler.userData.bowlHand=profile(l.bowler).bowl;resetBowler();placeNonStriker();legUmpire.position.set(profile(l.striker).bat==='left'?14.5:-14.5,0,8);facePoint(legUmpire,new THREE.Vector3(0,0,9.8));resetKeeper();let keeperPos=keeperIndex(squads[l.bowling]);setPlayerName(keeper,squads[l.bowling][keeperPos],keeperPos+1);let f=squads[l.bowling].slice(0,11).map((name,i)=>({name,i})).filter(v=>v.i!==keeperPos&&v.i!==l.bowlerIndex);fielders.forEach((p,i)=>setPlayerName(p,f[i]?.name||'Fielder',(f[i]?.i??i)+1))}
function introducePlayers(reason,newName){let l=lineup(),incoming=newName||l.striker;state.phase='intro';state.introUntil=performance.now()+4200;renderUI();let intro=$('#player-intro');let heading=reason==='start'&&state.toss?`${state.toss.result.toUpperCase()} · ${state.toss.userWon?'YOU WIN':'COMPUTER WINS'} THE TOSS`:reason==='start'?'THE OPENING PLAYERS':reason==='innings'?'THE CHASE BEGINS':reason==='wicket'?'NEW BATTER':reason==='both'?'NEW BATTER & BOWLER':'NEW BOWLER';let lines=reason==='bowler'?`<span>COMING ON TO BOWL</span><strong>${l.bowler}</strong><small>${l.bowling} · ${profile(l.bowler).bowl.toUpperCase()}-ARM</small>`:(reason==='wicket'||reason==='both')?`<span>COMING IN TO BAT</span><strong>${incoming}</strong><small>${profile(incoming).bat.toUpperCase()}-HAND BAT · ${reason==='both'?'NEW BOWLER:':'FACING'} ${l.bowler}</small>`:`<span>AT THE CREASE</span><strong>${l.striker} &nbsp; / &nbsp; ${l.partner}</strong><small>${profile(l.striker).bat.toUpperCase()}-HAND BAT · ${l.bowler} · ${profile(l.bowler).bowl.toUpperCase()}-ARM</small>`;intro.innerHTML=`<div class="intro-kicker">${heading}</div>${lines}`;if(era.modern){
  const skip=document.createElement('button');skip.className='skip-intro';skip.textContent='Skip intro';
  skip.onclick=()=>{introSequence++;stopSpokenAudio();state.introUntil=performance.now();};intro.append(skip);
}intro.classList.remove('hidden');$('#play-status').textContent=heading;message(heading,reason==='bowler'?l.bowler.toUpperCase():`${l.striker.toUpperCase()} ON STRIKE`);syncPlayers();announceLineup(reason,l,incoming)}
function overs(n){return `${Math.floor(n/6)}.${n%6}`}
function renderBroadcastScore(){
 let i=state.innings,l=lineup(),innings=state.stats[i],first=batterStats(innings,l.striker),second=batterStats(innings,l.partner),bowl=bowlerStats(innings,l.bowler);
 const surname=name=>name.split(' ').slice(-1)[0].toUpperCase();
 const ballsLeft=matchOvers*6-state.balls[i];
 const needed=state.score[0]+1-state.score[1];
 const chasing=era.modern&&i===1&&ballsLeft>0&&needed>0&&state.phase!=='finished';
 const chaseLine=chasing?`<div class="chase-line">Need ${needed} off ${ballsLeft} · RRR ${(needed*6/ballsLeft).toFixed(2)}</div>`:'';

 $('#broadcast-score').innerHTML=`<div class="broadcast-score-top"><strong>${teams[l.batting].flag} ${l.batting.toUpperCase()} ${state.score[i]}/${state.wickets[i]}</strong><span>${overs(state.balls[i])} / ${matchOvers} OV</span></div>${chaseLine}<div class="batting-cue" id="batting-cue" hidden></div><div class="broadcast-figures"><span title="${l.striker}">${surname(l.striker)}* <b>${first.runs} (${first.balls}) · SR ${strikeRate(first)}</b></span><span title="${l.partner}">${surname(l.partner)} <b>${second.runs} (${second.balls}) · SR ${strikeRate(second)}</b></span><span title="${l.bowler}">${surname(l.bowler)} <b>${bowl.wickets}/${bowl.runs} · ${overs(bowl.balls)} · ECO ${economyRate(bowl)}</b></span></div>`;
 $('#live-badge').innerHTML=state.phase==='ready'?'<i></i> PREVIEW':'<i></i> LIVE';
}
const heldShotKeys=new Set();
let selectShotFromKeyboard=()=>{};
function renderUI(){
 modernStadium?.update({team:lineup().batting,score:`${state.score[state.innings]}/${state.wickets[state.innings]}`,overs:overs(state.balls[state.innings]),venue:VENUES[venueId].name});
 if(state.phase==='ready'||state.phase==='finished')$('#delivery-speed').hidden=true;$('#fullscreen').hidden=state.phase==='ready'||state.phase==='finished';$('#pause-game').hidden=state.phase==='ready'||state.phase==='finished';renderBroadcastScore();let batting=state.innings===0?firstBatting():secondBatting(),bowling=state.innings===0?secondBatting():firstBatting();let i=state.innings,j=1-i;$('#score').innerHTML=`<div class="score-line"><div class="flag">${teams[batting].flag}</div><div class="teamname">${batting}<small>${i===0?'BATTING FIRST':'CHASING'}</small></div><div class="score-num">${state.score[i]}/${state.wickets[i]}<small>${overs(state.balls[i])} / ${matchOvers} OV</small></div></div><div class="versus">V E R S U S</div><div class="score-line secondary"><div class="flag">${teams[bowling].flag}</div><div class="teamname">${bowling}<small>${i===0?'YET TO BAT':'FIRST INNINGS'}</small></div><div class="score-num">${i===0?'—':state.score[j]+'/'+state.wickets[j]}<small>${i===0?'':overs(state.balls[j])+' OV'}</small></div></div><div class="score-foot"><span>${i===1?'TARGET':'CURRENT RUN RATE'}</span><b>${i===1?state.score[0]+1:(state.balls[i]?((state.score[i]*6)/state.balls[i]).toFixed(1):'0.0')}</b></div><div class="score-foot"><span>EXTRAS</span><b>${state.extras[i]}</b></div><div class="score-foot"><span>ON STRIKE</span><b>${squads[batting][Math.min(state.striker||0,10)]}</b></div>`;
$('#innings-tag').textContent=state.phase==='ready'?'QUICK MATCH':(i===0?'1ST INNINGS':'2ND INNINGS');$('#broadcast').textContent=state.phase==='ready'?'MATCH PREVIEW':(era.modern?`LIVE FROM ${VENUES[venueId].name.toUpperCase()}`:'LIVE FROM THE GRAND OVAL');let controls=$('#controls');
if(state.phase==='ready'){let touch=$('#stage-controls');touch.classList.remove('hidden');touch.innerHTML='<div class="touch-row"><button class="touch-bowl" id="stage-setup">SET UP MATCH →</button></div>';$('#stage-setup').onclick=showSetup;$('#play-status').textContent='MATCH PREVIEW';$('#control-title').textContent='READY TO PLAY?';$('#hint').textContent='Choose your teams and playing XI, then step out onto the field.';controls.innerHTML='<button class="primary" id="setup">SET UP MATCH &nbsp; ↗</button>';$('#setup').onclick=showSetup;return}
let isBat=humanBatting();if(era.modern)stage.dataset.batHand=isBat?profile(lineup().striker).bat:'';$('#stage-controls').classList.toggle('bowling-controls',!isBat);$('#control-title').textContent=isBat?'YOU ARE BATTING':'YOU ARE BOWLING';
$('#hint').innerHTML=isBat?'The <b>computer bowls automatically</b>. ← / → cover drives, ↑ attacking drive, ↓ defend, Space sweep. During a run, ↓ sends them back early or calls the next run after halfway. R queues another run.':'The <b>computer is batting</b>. Choose a delivery to bowl immediately. Q = yorker, E = bouncer, F = full toss.';
if(era.modern)$('#hint').textContent=isBat?'Tap Play shot or press Enter as the ball arrives. Choose a specific stroke below to override.':'Tap Bowl good length or press Enter. Choose a different length below to override.';
const running=isBat&&state.anim?.flight&&state.anim.live;
const options=isBat?['Left cover','Right cover','Attacking drive','Defend','Sweep','Hook','Pull','Cut','Flick','Straight drive']:['Yorker','Full','Good','Short','Bouncer','Full toss'];
const buttons=options.map((v,n)=>`<button data-choice="${v}" class="${(isBat?state.shot:state.line)===v?'selected':''}"><small>${isBat?['←','→','↑','↓','SPACE','1','2','3','4','5'][n]:['Q','←','↓','→','E','F'][n]}</small>${v}</button>`).join('');
const runButton=running?`<button class="touch-bowl" data-run>${state.anim.queuedRun?'NEXT RUN QUEUED':state.anim.runActive?'QUEUE NEXT RUN':'RUN'}</button>`:'';
controls.innerHTML=running?`<div class="hint">Runs: ${state.anim.runs}. Down sends them back early or queues the next run after halfway. R queues the next run.</div><div class="action-row">${runButton}</div>`:`<div class="action-row">${buttons}</div>`;
if(era.modern&&!isBat&&state.phase==='playing'&&!state.freeHit){
 const label=document.createElement('label');
 label.className='field-plan';label.textContent='Field placement ';
 const select=document.createElement('select');
 for(const [value,name] of [['auto','Automatic'],['cover','Cover'],['midwicket','Midwicket']])select.add(new Option(name,value));
 select.value=state.fieldPlan||'auto';
 select.onchange=()=>{state.fieldPlan=select.value;placeModernField();resetFielders()};
 label.append(select);controls.append(label);
}
let touch=$('#stage-controls');touch.classList.remove('hidden');
const padButton=(name,symbol,area,label)=>`<button data-choice="${name}" class="pad-${area} ${(state.shot===name||state.secondaryShot===name)?'selected':''}" aria-label="${symbol}: ${name}"><b>${symbol}</b><small>${label}</small></button>`;
const shotPad=`<div class="batting-controls"><div class="shot-pad" role="group" aria-label="Batting arrow controls">${padButton('Attacking drive','↑','up','ATTACK')}${padButton('Left cover','←','left','LEFT COVER')}${padButton('Right cover','→','right','RIGHT COVER')}${padButton('Defend','↓','down','DEFEND')}${padButton('Sweep','SPACE','space','SWEEP')}</div><div class="shot-extra-row" role="group" aria-label="More shots and power">${['Hook','Pull','Cut','Flick','Straight drive'].map((shot,i)=>`<button data-choice="${shot}" class="${state.shot===shot?'selected':''}" aria-label="${i+1}: ${shot}"><b>${i+1}</b><small>${i===4?'STRAIGHT':shot.toUpperCase()}</small></button>`).join('')}<button data-power class="power-button ${state.powerArmed?'selected':''}" aria-label="Super boost: Shift; ${powerRemaining(state.powerUsed)} of 2 remaining" aria-pressed="${!!state.powerArmed}" ${powerRemaining(state.powerUsed)===0?'disabled':''}><b>SHIFT</b><small>SUPER ${powerRemaining(state.powerUsed)}/2</small></button></div></div>`;
const runPad=`<div class="shot-pad run-pad" role="group" aria-label="Running controls"><button data-return class="pad-down" aria-label="Down: back early, or next run after halfway" title="Down: back early / next run past halfway">↓</button><button data-run class="pad-space" aria-label="Run or queue next run" title="R: run or queue next run">${state.anim?.queuedRun?'✓':state.anim?.runActive?'NEXT':'RUN'}</button></div>`;
const modernRunPad=`<div class="batting-controls running-controls"><div class="shot-pad" role="group" aria-label="Running controls"><button data-return class="pad-down" aria-label="Down: back early, or next run after halfway"><b>↓</b><small>BACK / NEXT</small></button><button data-run class="pad-space" aria-label="Run or queue next run"><b>${state.anim?.queuedRun?'✓':'R'}</b><small>${state.anim?.queuedRun?'QUEUED':state.anim?.runActive?'NEXT RUN':'RUN'}</small></button></div><div class="shot-extra-row" aria-hidden="true"></div></div>`;
touch.innerHTML=isBat?(running?(era.modern?modernRunPad:runPad):shotPad):`<div class="touch-label">${lineup().bowler.toUpperCase()} · ${profile(lineup().bowler).bowl.toUpperCase()}-ARM ${bowlingProfile(lineup().bowler).style.toUpperCase()} · TAP TO BOWL</div><div class="touch-row">${buttons}</div>`;
if(era.modern && !running){
  const runUp=!isBat&&state.phase==='animating'&&!state.anim?.releasePoint&&!state.anim?.flight;
  const label=isBat?'PLAY SHOT':runUp?'STOP RUN-UP':'BOWL GOOD LENGTH';
  const canEvade=isBat&&state.phase==='animating'&&!state.anim?.flight;
  const overrides=touch.innerHTML+(canEvade?'<button type="button" data-evade>Evade delivery</button>':'');
  touch.innerHTML='<div class="touch-row"><button class="touch-bowl" data-assisted>'+label+'</button></div><details class="assist-options"><summary>'+(isBat?'Choose stroke':'Choose length')+'</summary>'+overrides+'</details>';
  touch.querySelector('[data-assisted]').disabled=isBat?state.phase!=='animating'||!!state.anim?.flight:state.phase!=='playing'&&!runUp;
  touch.querySelector('[data-assisted]').onclick=()=>runUp?stopRunUp():select(isBat?assistedStroke(state.anim):'Good');
  const evade=touch.querySelector('[data-evade]');
  if(evade)evade.onclick=()=>{
    const a=state.anim;
    if(!a||a.flight)return;
    a.avoiding=true;a.swing=null;a.selectedShot=null;a.power=false;
    state.shot=null;state.secondaryShot=null;state.queuedPower=false;state.powerArmed=false;state.lastShotInput=null;heldShotKeys.clear();
    touch.querySelectorAll('.selected').forEach(button=>button.classList.remove('selected'));
    controls.querySelectorAll('.selected').forEach(button=>button.classList.remove('selected'));
    touch.querySelector('[data-power]')?.setAttribute('aria-pressed','false');
    message('EVADING','BAT WITHDRAWN');
  };
}
function select(v, keyboardPower=false){if(isBat){if(state.phase==='animating'&&state.anim?.flight)return;let now=performance.now(),previous=state.lastShotInput,held=[...heldShotKeys].find(name=>name!==v);state.secondaryShot=held||(previous&&previous.name!==v&&now-previous.time<650?previous.name:null);state.lastShotInput={name:v,time:now};state.shot=v;state.queuedPower=powerRemaining(state.powerUsed)>0&&!!(state.powerArmed||keyboardPower);if(state.phase==='animating'){state.anim.avoiding=false;swing()}else if(state.phase==='playing')state.queuedShot=v;
 if(era.modern){
   for(const panel of [controls,touch]){
     for(const button of panel.querySelectorAll('[data-choice]')){
       const choice=button.dataset.choice;
       button.classList.toggle('selected',choice===state.shot||choice===state.secondaryShot);
     }
   }
   return;
 }
}else if(state.phase==='playing'){state.line=v;startDelivery();return}renderUI()}
function togglePower(){if(!humanBatting()||state.anim?.flight||powerRemaining(state.powerUsed)===0)return;state.powerArmed=!state.powerArmed;state.queuedPower=state.powerArmed;if(state.anim&&state.anim.swing!==null)state.anim.power=state.powerArmed;renderUI()}

selectShotFromKeyboard=(shot,power)=>select(shot,power);
[controls,touch].forEach(el=>el.querySelectorAll('[data-choice]').forEach(b=>b.onclick=e=>{e.stopPropagation();select(b.dataset.choice,!!e.shiftKey)}));
[controls,touch].forEach(el=>el.querySelectorAll('[data-run]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleRun()}));
touch.querySelectorAll('[data-power]').forEach(b=>b.onclick=e=>{e.stopPropagation();togglePower()});
touch.querySelectorAll('[data-return]').forEach(b=>b.onclick=e=>{e.stopPropagation();callBack()});
$('#play-status').textContent=running?'BALL IN PLAY • RUN OR STOP':isBat?(state.phase==='animating'?'COMPUTER BOWLING • TIME YOUR SHOT':'COMPUTER BOWLING • NEXT DELIVERY SOON'):(state.phase==='animating'?'COMPUTER BATTING • BALL IN PLAY':'COMPUTER BATTING • CHOOSE YOUR LENGTH');
}
function showSetup(){let root=$('#modal-root');root.innerHTML=`<div class="modal-wrap"><div class="modal"><div class="modal-top"><div><div class="eyebrow">YOUR MATCH, YOUR RULES</div><h2>SELECT YOUR SIDES<span style="color:#e4c45f">.</span></h2></div><button class="close" aria-label="Close">×</button></div><div class="setup"><div class="setup-grid"><div class="setup-card"><div class="setup-label">01 / YOUR TEAM</div><select id="home-select">${Object.keys(teams).map(t=>`<option ${t===home?'selected':''}>${t}</option>`).join('')}</select><div class="roster" id="home-roster"></div></div><div class="setup-card"><div class="setup-label">02 / OPPOSITION</div><select id="away-select">${Object.keys(teams).map(t=>`<option ${t===away?'selected':''}>${t}</option>`).join('')}</select><div class="roster" id="away-roster"></div></div></div><div class="setup-options"><div class="option">MATCH FORMAT<b>5 OVERS / SIDE</b></div><div class="option">VENUE<b>THE GRAND OVAL</b></div><div class="option">YOUR ROLE<b>BAT & BOWL</b></div></div><label class="match-conditions" for="match-conditions">MATCH CONDITIONS <select id="match-conditions"><option value="day" ${!night?'selected':''}>DAY MATCH</option><option value="night" ${night?'selected':''}>NIGHT MATCH · FLOODLIGHTS</option></select></label><label class="match-conditions">OVERS PER SIDE <select id="match-overs">${MATCH_FORMATS.map(format=>`<option value="${format.overs}" ${format.overs===DEFAULT_MATCH_OVERS?'selected':''}>${format.label}</option>`).join('')}</select></label><label class="match-conditions">CALL THE TOSS <select id="toss-call"><option value="heads">HEADS</option><option value="tails">TAILS</option></select></label><label class="match-conditions">IF YOU WIN <select id="toss-decision"><option value="bat">BAT FIRST</option><option value="bowl">BOWL FIRST</option></select></label><label class="match-conditions">DIFFICULTY <select id="difficulty"><option value="normal">NORMAL</option><option value="easy">EASY · MORE BOUNDARIES</option></select></label><div class="setup-replays">ACTION REPLAYS <label><input type="checkbox" id="replay-boundaries"> BOUNDARIES</label><label><input type="checkbox" id="replay-wickets"> WICKETS</label></div><div class="setup-footer"><p>Move players up or down to select your XI. The first 11 play; R1–R4 are reserves. Top order bats first.</p><button class="primary" id="start">LET'S PLAY CRICKET &nbsp; →</button></div></div></div></div>`;$('.close').onclick=()=>root.innerHTML='';function roster(side){let team=side==='home'?home:away;let el=$('#'+side+'-roster');el.innerHTML=squads[team].map((p,n)=>`<div class="player ${n>=11?'reserve':''}"><b>${n>=11?'R'+(n-10):String(n+1).padStart(2,'0')}</b> ${p}${era.modern?`<em class="roster-role">${profile(p).role||'batter'}</em>`:''}<span><button data-move="${n}" data-dir="-1" title="Move up">↑</button><button data-move="${n}" data-dir="1" title="Move down">↓</button></span></div>`).join('');el.querySelectorAll('button').forEach(b=>b.onclick=()=>{let n=+b.dataset.move,to=n+(+b.dataset.dir);if(to<0||to>=squads[team].length)return;[squads[team][n],squads[team][to]]=[squads[team][to],squads[team][n]];roster(side)})}roster('home');roster('away');$('#home-select').onchange=e=>{home=e.target.value;if(home===away){away=Object.keys(teams).find(t=>t!==home);$('#away-select').value=away}roster('home');roster('away')};$('#away-select').onchange=e=>{away=e.target.value;if(away===home){home=Object.keys(teams).find(t=>t!==away);$('#home-select').value=home}roster('home');roster('away')};$('#start').onclick=async()=>{const button=$('#start');button.disabled=true;button.textContent='PREPARING MATCH…';try{await initPhysics({modern:era.modern})}catch(error){button.disabled=false;button.textContent='LET’S PLAY CRICKET →';alert('Could not initialize the local physics engine. Please reload and try again.');console.error(error);return}manualPaused=false;$('#pause-game').textContent='Ⅱ';$('#pause-game').setAttribute('aria-label','Pause match');thawMatch();difficulty=$('#difficulty').value;matchOvers=matchFormat($('#match-overs').value).overs;$('#match-format').textContent=`${matchOvers} overs per side`;replayBoundaries=$('#replay-boundaries').checked;replayWickets=$('#replay-wickets').checked;if(era.modern){venueId=$('#venue-select').value;modernStadium.setVenue(updateVenueUI(venueId));for(const[k,m]of Object.entries(adMaterials)){m.map.dispose();m.map=modernBoardTexture(k);m.needsUpdate=true;}}setTimeOfDay($('#match-conditions').value==='night');const toss=resolveToss($('#toss-call').value,$('#toss-decision').value),first=toss.userBatsFirst?home:away;root.innerHTML='';claimAudioFocus();state={...state,fieldPlan:'auto',overRate:[],freeHit:false,phase:'playing',innings:0,firstBatting:first,toss,shot:null,score:[0,0],wickets:[0,0],balls:[0,0],extras:[0,0],stats:createMatchStats(),history:[],batIndex:0,striker:0,partner:1,nextBatter:2,bowlIndex:8,queuedShot:null,queuedPower:false,powerArmed:false,powerUsed:0,secondaryShot:null,lastShotInput:null,anim:null,replay:null,autoAt:performance.now()+3500};resetWickets();$('#replay-ui').classList.add('hidden');setKit();updateCrowd();if(!userMuted)enableSound();syncPlayers();renderUI();introducePlayers('start')};decorateSetup(era,venueId)}
function message(a,b=''){ $('#message').innerHTML=`${a}<br><span style="color:#aabbab">${b}</span>` }
function stopRunUp(){
 const a=state.anim;
 if(!era.modern||humanBatting()||state.phase!=='animating'||!a||a.releasePoint||a.flight)return;
 state.anim=null;state.phase='playing';
 resetBowler();holdBallAtRunUp();setCrowdMood('between');
 benchmark?.interrupt();renderUI();
 message('DEAD BALL','BOWLER STOPPED BEFORE RELEASE');announce('Dead ball.');
}
function placeModernField(){
   const l=lineup(),spin=bowlingProfile(l.bowler).spin;
   const positions=fieldForDelivery({hand:profile(l.striker).bat,spin,balls:state.balls[state.innings],overs:matchOvers,slowOverRate:slowOverRateActive(),fieldPlan:humanBatting()?'auto':state.fieldPlan});
   positions.forEach(([x,z],i)=>fielders[i].userData.home.set(x,0,z));
   keeper.userData.standingZ=spin?11.8:15.5;
}
function startDelivery(){if(state.phase!=='playing')return;
 benchmark?.begin();
 const home=resetBowler();
 if(era.modern){
   placeModernField();
   resetMotor(batter);resetMotor(nonStriker);}placeNonStriker();resetKeeper();resetFielders();modernFielding?.begin();applyBattingStance(batter,profile(lineup().striker).bat,true);applyBattingStance(nonStriker,profile(lineup().partner).bat,false);
 const delivery=pickDelivery(state.line,humanBatting()),length=delivery.type;
 const bowlerName=lineup().bowler, bowling=bowlingProfile(bowlerName), variation=era.modern?modernBowlingVariation(bowlerName,bowler.userData.bowlHand):bowlingVariation(bowlerName);
 const lineX=era.modern?modernDeliveryLine(delivery,profile(lineup().striker).bat,variation.movement):delivery.line+(delivery.wide?0:variation.movement), speed=Math.round(deliverySpeed(bowling.style)*(variation.speedFactor??1)), travel=20.12/(speed/3.6)*(era.modern?1:2.1);$('#delivery-speed').hidden=true;umpire.userData.arms.forEach(arm=>arm.rotation.set(0,0,0));
 const ballsLeft=Math.max(1,matchOvers*6-state.balls[state.innings]);
 const requiredRate=state.innings===1?(state.score[0]+1-state.score[1])/ballsLeft:1;
 state.phase='animating';setCrowdMood('delivery');state.anim={start:performance.now(),last:performance.now(),swing:state.queuedShot?1.8+travel-.3:null,selectedShot:state.queuedShot||null,secondaryShot:state.secondaryShot,power:!!state.queuedPower,variation,freeHit:era.modern&&!!state.freeHit,spin:bowling.spin,speed,flight:false,live:false,length,lineX,travel,noBall:delivery.noBall,wide:era.modern?false:delivery.wide,guardX:batter.position.x,battingHand:profile(lineup().striker).bat,called:false,bowlerX:home.x,bowlerArm:home.arm,cpuShot:era.modern?opponentStroke(length,requiredRate,Math.random,{ballsLeft,wicketsInHand:10-state.wickets[state.innings]}):['Defend','Left cover','Right cover','Attacking drive','Sweep'][Math.floor(Math.random()*5)],impact:1.8+travel,runs:0,runProgress:0,runActive:false,runAllowed:false,dismissal:null};
 state.queuedShot=null;message(state.anim.freeHit?'FREE HIT':slowOverRateActive()?'SLOW OVER RATE • FOUR OUTSIDE':humanBatting()?'THE BOWLER IS IN':'RUNNING IN TO BOWL',`${length.toUpperCase()} · ${variation.name.toUpperCase()}`);renderUI()
}
function swing(){if(state.phase!=='animating'||!humanBatting()||!state.anim||state.anim.flight)return;if(state.anim.swing!==null){state.anim.selectedShot=state.shot;state.anim.secondaryShot=state.secondaryShot;state.anim.power=!!state.queuedPower;message(state.shot.toUpperCase()+' SHOT',state.anim.power?'POWER SHOT':state.anim.secondaryShot?'COMBINATION SHOT':'SHOT CHANGED');return}benchmark?.swing();const pressed=era.modern?(state.anim.simTime||0):(performance.now()-state.anim.start)/1000;state.anim.swing=Math.max(pressed,state.anim.impact-.35);if(era.modern)state.anim.preparationAt=pressed;state.anim.selectedShot=state.shot;state.anim.secondaryShot=state.secondaryShot;state.anim.power=!!state.queuedPower;let timing=Math.abs(state.anim.swing-state.anim.impact);message(state.shot.toUpperCase()+' SHOT',timing<.42?'GOOD TIMING':state.anim.swing<state.anim.impact?'EARLY SHOT':'LATE SHOT');}
function runFeedback(action){if(action==='back')message('GO BACK!','RETURN TO YOUR CREASE');else if(action==='queued')message('COMING BACK FOR ANOTHER!','NEXT RUN QUEUED');else if(action==='started')message('RUNNING!','WATCH FOR THE THROW');renderUI()}
function toggleRun(){let a=state.anim;if(!a?.live||!humanBatting())return;runFeedback(requestRun(a))}
function callBack(){let a=state.anim;if(!a?.live||!humanBatting())return;runFeedback(callDown(a))}

function winningExtra(a){
 if(!era.modern || state.innings!==1 || state.score[1]!==state.score[0] || !(a.wide||a.noBall))return false;
 a.flight=true;
 endPlay(0,null);
 return true;
}
function beginFlight(now){let a=state.anim;let cue=$('#batting-cue');if(cue)cue.hidden=true;a.flight=true;a.flightStart=now;a.flightSimTime=a.simTime;const isHuman=humanBatting();if(isHuman){const boost=consumePower(state.powerUsed,!!(a.power&&a.swing!==null));state.powerUsed=boost.used;a.power=boost.enabled}const timing=isHuman?(a.swing===null?99:Math.abs(a.swing+(era.modern?.3:0)-a.impact)):.15+Math.random()*.35;
 a.lineX=ball.position.x;let shot=isHuman?(a.selectedShot||state.shot):a.cpuShot;state.shot=null;state.queuedShot=null;state.powerArmed=false;state.queuedPower=false;state.secondaryShot=null;state.lastShotInput=null;heldShotKeys.clear();let easyBatting=isHuman&&difficulty==='easy';let miss=(!era.modern&&a.wide)||!canReachDelivery(shot,era.modern?ball.position.y/CRICKET.athleteScale:ball.position.y,era.modern?a.lineX/CRICKET.athleteScale:a.lineX,easyBatting)||timing>(easyBatting?1.15:.75)||Math.random()<(easyBatting?.01:timing>.42?.2:.04);
 if(era.modern){a.contactPoint=ball.position.clone();if(!a.deliveryBounced&&ball.position.y>1.05)a.noBall=true;a.wide=judgeWide({x:a.lineX,height:ball.position.y,hand:a.battingHand,guardX:a.guardX,releaseX:a.releaseGuardX,strikerX:batter.position.x,bounced:!!a.deliveryBounced,noBall:a.noBall,touched:!miss});if(a.noBall&&!a.called&&!a.ending){a.called=true;umpire.userData.arms[0].rotation.z=-Math.PI/2;message('NO BALL',a.fieldFault||'ONE EXTRA • BALL STILL LIVE');announce('No ball. One extra.');if(winningExtra(a))return;}}
 if(miss){state.powerArmed=false;state.queuedPower=false;setCrowdMood('tension');if(Math.abs(a.lineX)<.5)crowdReaction('gasp');let wicket=era.modern?sweptWicketHit(ball.position,ball.position.clone().addScaledVector(a.deliveryVelocity,Math.max(0,(10.5-ball.position.z)/a.deliveryVelocity.z)),'keeper'):wicketIntersection({x:a.lineX,y:ball.position.y,releaseX:a.releasePoint.x,releaseZ:a.releasePoint.z,type:a.length});
  if(!era.modern&&wicket&&!a.noBall&&!a.wide&&!a.freeHit){a.live=false;a.phase='miss';a.missStart=ball.position.clone();const padContact=(a.swing!==null||!isHuman)&&Math.abs(a.lineX-batter.position.x)<.24&&Math.random()<.18;a.dismissal=padContact?'LBW':'BOWLED';a.missTarget=padContact?new THREE.Vector3(a.lineX,.65,9.55):new THREE.Vector3(wicket.x,wicket.y,wicket.z);a.phaseAt=now}
  else {resetBallPhysics();a.bye=true;a.live=true;a.phase='keeper-chase';a.bounced=era.modern?!!a.deliveryBounced:a.length!=='Full toss';a.velocity=era.modern?a.deliveryVelocity.clone():new THREE.Vector3((a.lineX-a.releasePoint.x)/a.travel*.38,-.2,20.12/a.travel*.82);a.runAllowed=false;a.runActive=false;a.runProgress=0;a.runs=0;message(!era.modern&&a.wide?'WIDE BALL':'BEATEN','KEEPER MOVES TO COLLECT')}
  renderUI();$('#play-status').textContent='BALL PASSES THE BAT';return}
 if(era.modern){
   a.edged=outsideEdge({line:a.lineX,hand:a.battingHand,timing,shot});
   a.struckAt=a.simTime;a.captureContact=true;
   poseBatting(batter,{phase:.43,shot,contact:a.contactPoint,hand:a.battingHand,edge:a.edged});
 }let v=shotVelocity(shot,timing,Math.random,{height:ball.position.y,line:a.lineX,difficulty:easyBatting?'easy':'normal',secondaryShot:a.secondaryShot,power:a.power,hand:profile(lineup().striker).bat});if(a.edged)v=edgeVelocity(a.deliveryVelocity,a.battingHand);else if(era.modern)v=modernShotResponse(v,a.deliveryVelocity,isHuman?(a.swing??a.impact)+.3-a.impact:.08,profile(lineup().striker).bat,{shot,power:a.power});state.powerArmed=false;state.queuedPower=false;resetBallPhysics();
 a.velocity=new THREE.Vector3(v.x,v.y,v.z);
 a.phase='field';a.live=true;a.bounced=false;a.runAllowed=v.autoRun&&(!era.modern||!isHuman||safeOpeningSingle(ball.position,a.velocity,[...fielders,bowler,keeper]));a.runActive=a.runAllowed;a.runReturning=false;a.runProgress=0;a.runs=0;
 a.fielder=null;a.fielderStart=null;setCrowdMood('shot');if(shot==='Attacking drive')crowdReaction('anticipation');playEffect(a.edged?'edge':'hit');announce(a.edged?'Outside edge!':shot==='Attacking drive'?'Up in the air!':shot==='Defend'?'Played into the field.':'A well timed shot!');renderUI();$('#play-status').textContent=isHuman?'BALL IN PLAY • RUN OR STOP':'COMPUTER BATTING • FIELDERS CHASING';
}
function advanceRunners(a,dt,now){if(era.modern&&a.flight&&(a.flightSimTime!==undefined?(a.simTime-a.flightSimTime)<.25:now-a.flightStart<250))return;let parity=a.runs%2;const step=stepRun(a,era.modern?advanceAthleticRun(a,dt):dt);if(!step.moved)return;let z1=parity?-9.75:9.8,z2=parity?9.8:-9.75;batter.position.z=THREE.MathUtils.lerp(z1,z2,step.position);nonStriker.position.z=THREE.MathUtils.lerp(z2,z1,step.position);if(era.modern){for(const[p,dest]of[[batter,step.returning?z1:z2],[nonStriker,step.returning?z2:z1]]){const m=p.userData.motor;m.speed=Math.abs(a.runnerVelocity||0);m.vx=0;m.vz=Math.sign(dest-p.position.z)*m.speed;m.phase+=m.speed*dt/2.6*Math.PI*2;turnAthlete(p,new THREE.Vector3(p.position.x,0,dest),dt);poseLocomotion(p,dt);groundRunningBat(p,dest>0?9.3:-9.3);}if(step.finished&&humanBatting())renderUI();if(step.finished&&!a.runActive)a.runnerVelocity=0;return;}facePoint(batter,new THREE.Vector3(batter.position.x,0,step.returning?z1:z2));facePoint(nonStriker,new THREE.Vector3(nonStriker.position.x,0,step.returning?z2:z1));let stride=Math.sin(now*.019)*.85;for(const p of [batter,nonStriker]){stridePose(p,stride);p.userData.arms[0].rotation.x=-stride*.65;p.userData.arms[1].rotation.x=stride*.65;p.userData.elbows.forEach(e=>e.rotation.x=.5);p.rotation.x=(a.phase==='throw'||a.phase==='receive')&&a.runProgress>.75?.8:.16;p.position.y=Math.abs(stride)*.07;p.rotation.z=stride*.035;watchPoint(p,ball.position)}if(step.finished){[batter,nonStriker].forEach(p=>{p.userData.legs.forEach(l=>l.rotation.x=0);p.userData.knees.forEach(k=>k.rotation.x=.15);p.position.y=0;p.rotation.z=0});if(humanBatting())renderUI()}}

function beginReturnThrow(a,f,now){if(era.modern){
 modernFielding.held=f;
 a.returnThrow=new ReturnController({players:[...fielders,bowler],keeper,fielding:modernFielding});
 const context=a.returnThrow.prepare({fielder:f,batters:[batter,nonStriker],run:a,random:a.throwRandom||Math.random});
 a.receiver=context.receiver;a.throwEnd=context.end;a.velocity=context.velocity;a.throwCount=(a.throwCount||0)+1;a.phase='modern-return';
 message('RETURN THROW',a.throwEnd==='bowler'?'TO THE BOWLER’S END':'TO THE KEEPER');return;
 }f.rotation.x=0;f.userData.legs.forEach(l=>l.rotation.x=0);a.phase='throw';a.phaseAt=now;a.throwFrom=ball.position.clone();a.throwEnd=f!==bowler&&(a.runActive?a.runProgress<.5:Math.random()<.5)?'bowler':'keeper';if(a.throwEnd==='bowler'){bowler.position.set(1,-.05,-11.8);facePoint(bowler,f.position);bowler.userData.arms[1].rotation.x=-1;bowler.userData.elbows[1].rotation.x=.25}a.throwTarget=a.throwEnd==='bowler'?handPosition(bowler,1):keeperGlove();a.throwDuration=Math.max(.7,a.throwFrom.distanceTo(a.throwTarget)/24);a.throwAccurate=Math.random()<.65;facePoint(f,a.throwTarget);watchPoint(f,a.throwTarget);f.userData.elbows[1].rotation.x=.5;f.userData.arms[1].rotation.x=-1.25;message('FIELDING SIDE',a.throwEnd==='bowler'?'THROW TO THE BOWLER':'THROW TO THE KEEPER');if(a.runActive){setCrowdMood('tension');crowdReaction('gasp')}announce('The fielder picks up and throws.')}

function modernPickup(a,dt,now){
 a.pickElapsed=(a.pickElapsed||0)+dt;
 const f=a.fielder,elapsed=a.pickElapsed,handIndex=a.carryHand??1;
 if(!a.possessionAt){
  const before=ball.position.clone(),hands=[handPoint(f,0),handPoint(f,1)];
  a.bounced=advanceBall(ball.position,a.velocity,dt,a.bounced);
  const direction=ball.position.clone().sub(f.position);direction.y=0;direction.normalize();
  // Keep the stance on one side throughout a gather. After a missed
  // reach, step around the ball if the previous approach was blocked.
  if(!a.pickOffset){
    const offset=direction.clone();
    if(offset.lengthSq()===0)offset.set(Math.sin(f.rotation.y),0,Math.cos(f.rotation.y));
    if(a.missedPicker===f)offset.applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2);
    a.pickOffset=offset.multiplyScalar(-athleteScale(f));
  }
  const goal=ball.position.clone().add(a.pickOffset);goal.y=0;
  moveAthlete(f,goal,dt,2.6,{facingYaw:Math.atan2(direction.x,direction.z)});poseGroundFielding(f,ball.position,dt);
  const taken=hands.findIndex((hand,i)=>sweptContact(hand,handPoint(f,i),before,ball.position,gloveRadius(f))!==null);
  if(taken>=0){a.carryHand=taken;a.possessionAt=now;a.liftElapsed=0;a.carryRotation=f.userData.torso.rotation.x;a.pickY=f.position.y;a.pickFeet=null;a.missedPicker=null;modernFielding.hold(f);gripFingers(f,taken,1);}
  else if(Math.hypot(ball.position.x,ball.position.z)>=50){endPlay(a.bye||a.bounced?4:6,null);return;}
  else if(elapsed>1.65){a.missedPicker=f;a.phase='field';modernFielding.held=null;a.pickFeet=null;f.userData.fielding.groundBlend=0;return;}
 }else{
  if(!a.pickFeet){f.updateMatrixWorld(true);a.pickFeet=f.userData.knees.map(k=>k.localToWorld(new THREE.Vector3(0,-.68,.095)));}
  a.liftElapsed=(a.liftElapsed||0)+dt;const rise=THREE.MathUtils.smoothstep(Math.min(1,a.liftElapsed/.48),0,1);
  f.position.y=(a.pickY??-athleteScale(f))*(1-rise);f.rotation.x=.04;f.userData.torso.rotation.x=a.carryRotation*(1-rise);
  f.userData.arms[handIndex].rotation.x=-.6;f.userData.elbows[handIndex].rotation.x=-.7;
  a.pickFeet.forEach((foot,i)=>solveLeg(f,i,foot));ball.position.copy(handPoint(f,handIndex));
  if(rise>=1){f.position.y=0;beginReturnThrow(a,f,now);}
 }
 advanceRunners(a,dt,now);
}

function endPlay(outcome,dismissal){let a=state.anim;if(!a||a.ending)return;dismissal=scoreDelivery({runs:outcome,dismissal,noBall:a.noBall,wide:a.wide,freeHit:a.freeHit}).dismissal;a.ending=true;a.live=false;a.outcome=outcome;a.dismissal=dismissal||null;a.phase='settle';a.phaseAt=performance.now();if(['BOWLED','RUN OUT','STUMPED','HIT WICKET'].includes(dismissal))breakWicket(a.phaseAt);
 if(a.deadReason){message('NO BALL • DEAD BALL',a.deadReason);announce('No ball. Dead ball. One extra.');}
 else if(dismissal){message('WICKET!',dismissal);playEffect('wicket');setCrowdMood('celebrate');crowdReaction('wicket');announce(dismissal==='HIT WICKET'?'Hit wicket!':dismissal==='STUMPED'?'Stumped! The keeper takes the bails off.':dismissal==='LBW'?'That is leg before wicket!':dismissal==='BOWLED'?'Bowled him!':dismissal==='CAUGHT & BOWLED'?'Caught and bowled!':dismissal==='RUN OUT'?'Run out! The keeper takes the bails off.':'Caught in the field!')}
 else if(a.overthrowRuns!==undefined&&a.boundaryOutcome===4){message('FOUR OVERTHROWS',outcome+' RUNS');setCrowdMood('celebrate');crowdReaction('four');announce('Four overthrows.');}
 else if(outcome===4||outcome===6){message(a.wide?'FIVE WIDES!':a.legBye?'FOUR LEG BYES!':a.bye?'FOUR BYES!':outcome===4?'FOUR!':'SIX!', 'BOUNDARY');setCrowdMood('celebrate');crowdReaction(outcome===6?'six':'four');announce(outcome===4?'That has raced away for four!':'That is a magnificent six!')}
 else if(a.noBall||a.wide){setCrowdMood('tension');message(a.noBall?'NO BALL':'WIDE',outcome?`${outcome} RUN${outcome===1?'':'S'} + 1 EXTRA`:state.innings===1&&state.score[1]===state.score[0]?'WINNING EXTRA':'1 EXTRA • REBOWL');if(!era.modern||!(a.called||a.wideCalled))announce(a.noBall?'No ball. One extra.':'Wide ball. One extra.') }
 else {setCrowdMood(outcome?'shot':'quiet');if(outcome>0)crowdReaction('runs');message(outcome===0?'DOT BALL':`${outcome} RUN${outcome===1?'':'S'}`,'BALL RETURNED');announce(outcome===0?'No run.':outcome===1?'They take a single.':`They come back for ${outcome}.`)}renderUI();$('#play-status').textContent=dismissal||'PLAY COMPLETE';
}
// Record rendered transforms so replay shows the actual delivery, shot and fielding.
const replayActors=[ball,batter,nonStriker,bowler,keeper,...fielders,...(era.modern?[umpire]:[])];
function pose(o){return [o.position.x,o.position.y,o.position.z,o.rotation.x,o.rotation.y,o.rotation.z]}
function applyPose(o,p){o.position.set(p[0],p[1],p[2]);o.rotation.set(p[3],p[4],p[5])}
function captureFrame(now){
 if(era.modern&&!replayBoundaries&&!replayWickets)return;
 let a=state.anim;if(!a||state.phase!=='animating'||(!a.captureContact&&now-(a.lastCapture||0)<(era.modern?33:55)))return;a.captureContact=false;a.lastCapture=now;let limbs=replayActors.slice(1).map(p=>p.userData.arms&&p.userData.legs?[...p.userData.arms,...p.userData.elbows,...p.userData.legs,...p.userData.knees].map(v=>[v.rotation.x,v.rotation.y,v.rotation.z]):[]);(a.frames||(a.frames=[])).push({t:now-a.start,camera:era.modern&&state.camera===0&&currentBroadcastView?{id:currentBroadcastView.id,position:camera.position.toArray(),look:currentBroadcastView.look.toArray(),fov:camera.fov}:null,actors:replayActors.map(pose),limbs,details:replayActors.slice(1).map(p=>({head:p.userData.head?pose(p.userData.head):null,torso:p.userData.torso?pose(p.userData.torso):null,bat:p.userData.bat?pose(p.userData.bat):null})),stumps:wicketParts.map(pose)});if(a.frames.length>(era.modern?600:260))a.frames.shift()}
function startReplay(){let a=state.anim;if(!a?.frames||a.frames.length<3){resolveDelivery();return}state.phase='replay';state.replay={frames:a.frames,start:performance.now(),base:a.frames[0].t};$('#stage-controls').classList.add('hidden');$('#replay-ui').classList.remove('hidden');$('#play-status').textContent='ACTION REPLAY';$('#broadcast').textContent='ACTION REPLAY';}
function finishReplay(){if(state.phase!=='replay')return;state.replay=null;$('#replay-ui').classList.add('hidden');state.phase='animating';resolveDelivery()}
$('#skip-replay').onclick=finishReplay;
function updateReplay(now){
 const r=state.replay,elapsed=(now-r.start)*.8+r.base,frames=r.frames;
 if(elapsed>=frames[frames.length-1].t){finishReplay();return;}
 let index=0;while(index<frames.length-2&&frames[index+1].t<elapsed)index++;
 const f=frames[index],next=frames[index+1],blend=era.modern?THREE.MathUtils.clamp((elapsed-f.t)/(next.t-f.t||1),0,1):0;
 const mix=(a,b,rotation=false)=>a.map((v,i)=>{const delta=(rotation||i>=3)?Math.atan2(Math.sin(b[i]-v),Math.cos(b[i]-v)):b[i]-v;return v+delta*blend;});
 f.actors.forEach((v,i)=>applyPose(replayActors[i],mix(v,next.actors[i])));
 f.limbs.forEach((limbs,i)=>{const p=replayActors[i+1];if(p.userData.arms&&p.userData.legs)limbs.forEach((v,j)=>[...p.userData.arms,...p.userData.elbows,...p.userData.legs,...p.userData.knees][j].rotation.set(...mix(v,next.limbs[i][j],true)));});
 f.details.forEach((d,i)=>{const p=replayActors[i+1];if(d.head)applyPose(p.userData.head,mix(d.head,next.details[i].head));if(d.torso)applyPose(p.userData.torso,mix(d.torso,next.details[i].torso));if(d.bat)applyPose(p.userData.bat,mix(d.bat,next.details[i].bat));});
 f.stumps.forEach((v,i)=>applyPose(wicketParts[i],mix(v,next.stumps[i])));
 if(era.modern)r.cameraView=replayBroadcastView(f.camera,next.camera,blend);
}
function resolveDelivery(){let i=state.innings,a=state.anim,batting=i===0?firstBatting():secondBatting(),outcome=a.outcome||0,newBatterName=a.dismissal?squads[batting][Math.min(state.nextBatter,10)]:null;const result=scoreDelivery({runs:outcome,dismissal:a.dismissal,noBall:a.noBall,wide:a.wide,byes:a.bye,legByes:a.legBye,freeHit:a.freeHit});if(era.modern)state.freeHit=nextFreeHit(!!a.freeHit,result);benchmark?.finish(result.legal);const l=lineup();const dismissalInfo=era.modern&&result.dismissal?{
   batter:a.dismissedPlayer===undefined?l.striker:squads[batting][a.dismissedPlayer],
   fielder:(a.dismissal==='STUMPED'?keeper:a.fielder)?.userData.playerName
 }:null;
 recordDelivery(state.stats[i],l.striker,l.bowler,result,dismissalInfo);if(result.legal)state.balls[i]++;state.score[i]+=outcome+result.penalty;state.extras[i]+=result.penalty+((result.extra==='WIDE'||result.byes)?outcome:0);
 if(outcome%2===1)[state.striker,state.partner]=[state.partner,state.striker];
 if(a.dismissal){state.wickets[i]++;let incoming=state.nextBatter++;if(a.dismissal==='RUN OUT'&&a.dismissedPlayer===state.partner)state.partner=incoming;else state.striker=incoming}
 let overChanged=result.legal&&state.balls[i]%6===0;if(overChanged){[state.striker,state.partner]=[state.partner,state.striker];state.powerUsed=0}state.history.push(a.dismissal||result.extra||outcome);let hadWicket=!!a.dismissal;state.phase='playing';state.anim=null;resetWickets();umpire.userData.arms.forEach(arm=>arm.rotation.set(0,0,0));ball.position.set(1.5,2,-20);resetBowler();resetKeeper();batter.position.set(profile(lineup().striker).bat==='left'?.7:-.7,0,9.8);placeNonStriker();resetFielders();state.autoAt=performance.now()+3200;setCrowdMood('between');
 if((i===1&&state.score[1]>state.score[0])||state.balls[i]>=matchOvers*6||state.wickets[i]>=10){if(i===0){state.phase='innings-summary';showInningsSummary();renderUI();return}else{state.phase='finished';showResult();renderUI();return}}syncPlayers();renderUI();if(hadWicket)introducePlayers(overChanged?'both':'wicket',newBatterName);else if(overChanged)introducePlayers('bowler')}
function inningsCard(index){
 const batting=index===0?firstBatting():secondBatting(),bowling=index===0?secondBatting():firstBatting(),innings=state.stats[index];
 const extraDetail=era.modern&&innings.extras?` (Wd ${innings.extras.wides}, Nb ${innings.extras.noBalls}, B ${innings.extras.byes}, Lb ${innings.extras.legByes})`:'';
 const batters=Object.entries(innings.batters).map(([name,b])=>`<tr><th scope="row">${name}${era.modern?`<small class="dismissal-note">${b.dismissal||'not out'}</small>`:''}</th><td>${b.runs}</td><td>${b.balls}</td><td>${strikeRate(b)}</td></tr>`).join('')||'<tr><td colspan="4">No balls faced</td></tr>';
 const bowlers=Object.entries(innings.bowlers).map(([name,b])=>`<tr><th scope="row">${name}</th><td>${overs(b.balls)}</td><td>${b.runs}</td><td>${b.wickets}</td><td>${economyRate(b)}</td></tr>`).join('')||'<tr><td colspan="5">No deliveries</td></tr>';
 return `<section class="innings-card"><div class="innings-card-heading"><strong>${batting} ${state.score[index]}/${state.wickets[index]}</strong><span>${overs(state.balls[index])} overs · ${state.extras[index]} extras${extraDetail}</span></div><div class="scorecard-grid"><div><h3>${batting} batting</h3><table><thead><tr><th>BATTER</th><th>R</th><th>B</th><th>SR</th></tr></thead><tbody>${batters}</tbody></table></div><div><h3>${bowling} bowling</h3><table><thead><tr><th>BOWLER</th><th>O</th><th>R</th><th>W</th><th>ECO</th></tr></thead><tbody>${bowlers}</tbody></table></div></div></section>`;
}
function exitMatchFullscreen(){if(document.fullscreenElement)document.exitFullscreen().catch(()=>{})}
function showInningsSummary(){exitMatchFullscreen();$('#modal-root').innerHTML=`<div class="modal-wrap"><div class="modal scorecard-modal"><div class="eyebrow">INNINGS BREAK · ${secondBatting().toUpperCase()} NEED ${state.score[0]+1}</div><h2>FIRST INNINGS</h2>${inningsCard(0)}<button class="primary" id="next-innings">START THE CHASE →</button></div></div>`;$('#next-innings').onclick=()=>{$('#modal-root').innerHTML='';state.innings=1;state.freeHit=false;state.striker=0;state.partner=1;state.nextBatter=2;state.powerUsed=0;setKit();message('INNINGS BREAK',`${secondBatting().toUpperCase()} NEED ${state.score[0]+1} TO WIN`);announce(`${secondBatting()} need ${state.score[0]+1} to win.`);syncPlayers();renderUI();introducePlayers('innings')}}
function showResult(){exitMatchFullscreen();setCrowdMood('celebrate');crowdReaction('finish');let a=state.score[0],b=state.score[1],result=b>a?`${secondBatting()} win by ${10-state.wickets[1]} wicket${state.wickets[1]===9?'':'s'}`:a>b?`${firstBatting()} win by ${a-b} run${a-b===1?'':'s'}`:'Match tied!';$('#modal-root').innerHTML=`<div class="modal-wrap"><div class="modal scorecard-modal"><div class="eyebrow">FULL TIME AT ${era.modern?VENUES[venueId].name.toUpperCase():'THE GRAND OVAL'}</div><h2>${result}</h2>${inningsCard(0)}${inningsCard(1)}<button class="primary" id="again">PLAY AGAIN →</button></div></div>`;$('#again').onclick=()=>{state.phase='ready';$('#modal-root').innerHTML='';renderUI();showSetup()}}

function cycleCamera(){state.camera=(state.camera+1)%cameraNames.length;$('#camera').innerHTML=`◈ &nbsp; CAMERA: ${cameraNames[state.camera]} [C]`}
$('#camera').onclick=cycleCamera;$('#newmatch').onclick=showSetup;$('#help').onclick=()=>{alert('BAT: The computer bowls automatically. As the ball arrives, press LEFT or RIGHT for cover drives, UP for an attacking drive, DOWN to defend, SPACE to sweep, or 1–5 for hook, pull, cut, flick and straight drive. Hold SHIFT with a shot for a super boost (twice per over); two quick shot keys blend their directions. Tap POWER on touch screens.\n\nBOWL: Choose a length with the buttons; arrows select FULL / GOOD / SHORT, Q selects YORKER, E selects BOUNCER and F selects FULL TOSS. Choosing a length bowls immediately. The computer bats.\n\nC cycles cameras. Sound starts with the match. During a run, Press DOWN early to turn back, or after halfway to queue another run. At the crease, DOWN starts another run. Press R or tap RUN/NEXT to start or queue a run. Choose 2, 5, 10 or 20 overs per side (5 by default). Bowlers can bowl at most 1, 1, 2 or 4 overs respectively.')};
// Stadium recordings and commentary are bundled locally. Crowd and commentary
// use separate buses so match reactions can be ducked while speech is playing.
let audioCtx,masterMix,crowdMaster,crowdDuck,ambienceGain,reactionsGain,crowdSource,commentarySource,userMuted=false,spokenSources=[],introSequence=0;
const commentaryBuffers={},crowdBuffers={};let commentaryLoading=false,crowdLoading=false;
const commentaryFiles={'That has raced away for four!':'four','That is a magnificent six!':'six','Bowled him!':'bowled','That is leg before wicket!':'lbw','Caught in the field!':'caught','Caught and bowled!':'caught_bowled','Run out! The keeper takes the bails off.':'keeper_runout','A well timed shot!':'shot','Up in the air!':'loft','Played into the field.':'defend','The fielder picks up and throws.':'fielder','No run.':'dot','They take a single.':'one','They come back for 2.':'two','They come back for 3.':'three','No ball. One extra.':'no-ball','Wide ball. One extra.':'wide'};
function loadAudio(name){return fetch(`./audio/${name}.mp3`).then(r=>{if(!r.ok)throw Error('Missing audio: '+name);return r.arrayBuffer()}).then(b=>audioCtx.decodeAudioData(b))}
function loadCommentary(){if(commentaryLoading)return;commentaryLoading=true;for(const name of Object.values(commentaryFiles))loadAudio(name).then(b=>commentaryBuffers[name]=b).catch(e=>console.warn(e))}
function stopSpokenAudio(){if(commentarySource)try{commentarySource.stop()}catch{};commentarySource=null;for(const src of spokenSources)try{src.stop()}catch{}spokenSources=[]}
function announceLineup(reason,l,incoming){let text=reason==='bowler'?`${l.bowler} comes on to bowl.`:reason==='wicket'||reason==='both'?`${incoming} comes in to bat. ${l.bowler} is bowling.`:`${l.striker} and ${l.partner} come to the crease. ${l.bowler} will bowl.`;$('#commentary').textContent=text.toUpperCase();introSequence++;announce(text)}
function pressureLevel(){let ballsLeft=matchOvers*6-state.balls[1],needed=state.score[0]+1-state.score[1];return state.innings===1&&ballsLeft<=6&&needed>0&&needed<=ballsLeft*3?.76:.58}
function setCrowdMood(mood){if(!audioCtx||!ambienceGain||state.muted)return;let normal=pressureLevel(),levels={between:normal,delivery:normal*.74,quiet:normal*.86,shot:normal*1.22,tension:normal*1.3,celebrate:normal*1.38};let now=audioCtx.currentTime;ambienceGain.gain.cancelScheduledValues(now);ambienceGain.gain.setTargetAtTime(levels[mood]??normal,now,mood==='delivery'?.7:.35)}
function startCrowdLoop(buffer){if(crowdSource){try{crowdSource.stop()}catch{}}crowdSource=audioCtx.createBufferSource();crowdSource.buffer=buffer;crowdSource.loop=true;crowdSource.connect(ambienceGain);crowdSource.start();if(!state.muted)setCrowdMood('between')}
function loadCrowd(){if(crowdLoading)return;crowdLoading=true;(()=>{let len=audioCtx.sampleRate*5,buffer=audioCtx.createBuffer(1,len,audioCtx.sampleRate),data=buffer.getChannelData(0),smooth=0;for(let i=0;i<len;i++){smooth=smooth*.95+(Math.random()*2-1)*.05;data[i]=smooth*(.7+.3*Math.sin(i/audioCtx.sampleRate*1.8))}startCrowdLoop(buffer)})();for(const name of ['crowd-applause','crowd-gasp'])loadAudio(name).then(b=>crowdBuffers[name]=b).catch(e=>console.warn(e))}
function enableSound(){claimAudioFocus();try{if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();masterMix=audioCtx.createDynamicsCompressor();masterMix.threshold.value=-10;masterMix.ratio.value=4;masterMix.attack.value=.01;masterMix.release.value=.25;masterMix.connect(audioCtx.destination);crowdMaster=audioCtx.createGain();crowdDuck=audioCtx.createGain();ambienceGain=audioCtx.createGain();reactionsGain=audioCtx.createGain();ambienceGain.connect(crowdDuck);reactionsGain.connect(crowdDuck);crowdDuck.connect(crowdMaster);crowdMaster.connect(masterMix);crowdMaster.gain.value=0;ambienceGain.gain.value=.58}audioCtx.resume();userMuted=false;state.muted=false;loadCommentary();loadCrowd();crowdMaster.gain.cancelScheduledValues(audioCtx.currentTime);crowdMaster.gain.setTargetAtTime(1,audioCtx.currentTime,.18);setCrowdMood('between');$('#sound').textContent='♪ SOUND ON'}catch(e){console.warn('Audio unavailable',e)}}
function playEffect(kind){if(state.muted||!audioCtx)return;let o=audioCtx.createOscillator(),g=audioCtx.createGain(),now=audioCtx.currentTime;o.type=kind==='wicket'?'square':'triangle';const pitch={wicket:260,hit:700,edge:1250,glove:175,pad:105}[kind]??700;o.frequency.setValueAtTime(pitch,now);o.frequency.exponentialRampToValueAtTime(100,now+.12);g.gain.setValueAtTime(kind==='pad'||kind==='glove'?.055:.1,now);g.gain.exponentialRampToValueAtTime(.001,now+.16);o.connect(g).connect(masterMix);o.start(now);o.stop(now+.17)}
function crowdReaction(kind){if(state.muted||!audioCtx)return;let gasp=kind==='gasp'||kind==='anticipation',buffer=crowdBuffers[gasp?'crowd-gasp':'crowd-applause'];if(!buffer)return;let now=audioCtx.currentTime,src=audioCtx.createBufferSource(),g=audioCtx.createGain();let durations={gasp:2.5,anticipation:1.7,runs:2.1,four:5,six:7,wicket:6,finish:8},volumes={gasp:.7,anticipation:.5,runs:.38,four:.85,six:1,wicket:.9,finish:1};let offset=gasp?0:1,duration=Math.min(durations[kind]||3,buffer.duration-offset);if(duration<=.1)return;src.buffer=buffer;src.playbackRate.value=.96+Math.random()*.08;g.gain.setValueAtTime(.001,now);g.gain.linearRampToValueAtTime(volumes[kind]||.6,now+.2);g.gain.setValueAtTime(volumes[kind]||.6,now+Math.max(.2,duration-.7));g.gain.linearRampToValueAtTime(.001,now+duration);src.connect(g).connect(reactionsGain);src.start(now,offset,duration)}
function duckCrowd(duration){if(!crowdDuck||!audioCtx)return;let now=audioCtx.currentTime,g=crowdDuck.gain;g.cancelScheduledValues(now);g.setValueAtTime(g.value,now);g.linearRampToValueAtTime(.42,now+.12);g.setValueAtTime(.42,now+Math.max(.15,duration));g.linearRampToValueAtTime(1,now+Math.max(.15,duration)+.6)}
function announce(text){$('#commentary').textContent=text.toUpperCase();if(state.muted||!audioCtx)return;let clip=commentaryBuffers[commentaryFiles[text]];if(clip){try{stopSpokenAudio();commentarySource=audioCtx.createBufferSource();commentarySource.buffer=clip;const gain=audioCtx.createGain();gain.gain.value=1.1;commentarySource.connect(gain).connect(masterMix);duckCrowd(clip.duration);commentarySource.start()}catch{}return}if(!('speechSynthesis' in window))return;try{let voice=speechSynthesis.getVoices().find(v=>v.localService&&/^en/i.test(v.lang));if(!voice)return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.voice=voice;u.rate=1.03;u.pitch=.9;u.volume=1;duckCrowd(Math.min(4,text.length/14));speechSynthesis.speak(u)}catch{}}
$('#sound').onclick=()=>{if(state.muted)enableSound();else{state.muted=true;userMuted=true;introSequence++;stopSpokenAudio();if('speechSynthesis' in window)speechSynthesis.cancel();if(crowdMaster)crowdMaster.gain.setTargetAtTime(0,audioCtx.currentTime,.08);$('#sound').textContent='♪ SOUND OFF'}};
if (era.modern) $('#audio-credits').textContent = 'CREDITS';
$('#audio-credits').onclick=()=>alert('Crowd applause: stephan, public domain. Crowd gasp: starlite, public domain. Full source and license links are in the project README and audio/CREDITS.txt.' + (era.modern ? '\n\nStriker body adapted from Cesium Man, © 2017 Cesium, CC BY 4.0. Source, licence and modifications: models/CREDITS.txt.' : ''));
// Pause both the clock and audio when the page is hidden or another game tab
// takes focus. Some embedded browsers keep background pages marked visible.
const tabIdentity=Math.random().toString(36).slice(2)+Date.now().toString(36);let matchChannel=null,externallyPaused=false,manualPaused=false,pausedAt=document.hidden?performance.now():null;
function setPlayControlsInert(inert){
 if(!era.modern)return;
 $('#controls').inert=inert;$('#stage-controls').inert=inert;
}
setPlayControlsInert(pausedAt!==null);
function freezeMatch(){if(state.overRate?.[state.innings])state.overRate[state.innings].last=null;setPlayControlsInert(true);if(pausedAt===null)pausedAt=performance.now();if(audioCtx&&audioCtx.state==='running')audioCtx.suspend().catch(()=>{});if('speechSynthesis' in window)speechSynthesis.cancel()}
function thawMatch(){if(document.hidden||externallyPaused||manualPaused||pausedAt===null)return;let now=performance.now(),gap=now-pausedAt;pausedAt=null;setPlayControlsInert(false);let a=state.anim;if(a)for(const key of ['start','last','lastCapture','phaseAt','flightStart','wicketBrokenAt'])if(typeof a[key]==='number')a[key]+=gap;if(state.replay)state.replay.start+=gap;if(state.introUntil)state.introUntil+=gap;if(state.autoAt)state.autoAt+=gap;if(audioCtx&&!state.muted)audioCtx.resume().catch(()=>{})}
function claimAudioFocus(){if(matchChannel)matchChannel.postMessage({type:'claim',id:tabIdentity});else{try{localStorage.setItem('cricket97-active-tab',JSON.stringify({id:tabIdentity,t:Date.now()}))}catch{}}}
function receiveClaim(id){if(id===tabIdentity)return;if(state.phase==='ready'&&(!audioCtx||state.muted))return;externallyPaused=true;freezeMatch();$('#tab-pause').classList.remove('hidden')}
try{if('BroadcastChannel' in window){matchChannel=new BroadcastChannel('cricket97-match-focus');matchChannel.onmessage=e=>{if(e.data?.type==='claim')receiveClaim(e.data.id)}}else window.addEventListener('storage',e=>{if(e.key==='cricket97-active-tab'&&e.newValue){try{receiveClaim(JSON.parse(e.newValue).id)}catch{}}})}catch{}
document.addEventListener('visibilitychange',()=>{if(document.hidden)freezeMatch();else thawMatch()});
$('#pause-game').onclick=()=>{manualPaused=!manualPaused;let b=$('#pause-game');b.textContent=manualPaused?'▶':'Ⅱ';b.setAttribute('aria-label',manualPaused?'Resume match':'Pause match');b.title=manualPaused?'Resume match':'Pause match';if(manualPaused)freezeMatch();else thawMatch()};
$('#resume-match').onclick=()=>{externallyPaused=false;$('#tab-pause').classList.add('hidden');claimAudioFocus();thawMatch()};
window.addEventListener('keyup',e=>{if(SHOT_KEYS[e.code])heldShotKeys.delete(SHOT_KEYS[e.code])});window.addEventListener('blur',()=>heldShotKeys.clear());
window.addEventListener('keydown',e=>{if($('#modal-root').children.length||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(state.phase==='replay'){if(e.code==='KeyK'||e.code==='Escape'||e.code==='Space'){e.preventDefault();finishReplay()}return}if(state.phase==='intro'){if(era.modern&&['Enter','Space'].includes(e.code)){e.preventDefault();$('#player-intro .skip-intro')?.click();}return;}if(manualPaused||externallyPaused||document.hidden)return;if(e.code==='KeyC'){cycleCamera();return}if(e.code==='KeyR'){toggleRun();return}if(!['Space','Enter','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','KeyQ','KeyE','KeyF','Digit1','Digit2','Digit3','Digit4','Digit5'].includes(e.code))return;e.preventDefault();if(state.phase==='ready'){if(e.code==='Enter'||e.code==='Space')showSetup();return}if(state.phase==='finished')return;if(era.modern&&e.code==='Enter'){if(!e.repeat&&!manualPaused&&!externallyPaused)$('#stage-controls [data-assisted]')?.click();return}if(humanBatting()){if(e.code==='ArrowDown'&&state.anim?.live){callBack();return}let shot=SHOT_KEYS[e.code];if(shot&&!e.repeat){heldShotKeys.add(shot);selectShotFromKeyboard(shot,e.shiftKey)}}else{let line={ArrowLeft:'Full',ArrowDown:'Good',ArrowUp:'Good',ArrowRight:'Short',KeyQ:'Yorker',KeyE:'Bouncer',KeyF:'Full toss'}[e.code];if(line&&state.phase==='playing'){state.line=line;startDelivery()}else if(!line&&state.phase==='playing')startDelivery()}});

const renderQuality=era.modern?new RenderQuality(renderer.getPixelRatio(),mobileRender ? .8 : renderer.getPixelRatio()):null;
if(renderQuality)renderer.setPixelRatio(renderQuality.ratio);
let lastCrowdFrame=0,crowdCursor=0;
function animateCrowd(now){
 if(era.modern&&reducedMotion.matches)return;
 if(now-lastCrowdFrame<(renderQuality&&renderQuality.ratio<renderQuality.max?200:100))return;lastCrowdFrame=now;
 let excited=state.anim?.phase==='settle'&&(state.anim.dismissal||state.anim.outcome>=4);
 for(let n=0;n<crowdBatchSize;n++){let i=(crowdCursor+n)%spectators.length,v=spectators[i],wave=Math.sin(now*.003+v.phase),lift=excited?Math.max(0,wave)*.32:Math.max(0,wave)*.045;
  dummy.position.set(v.x,v.y+lift,v.z);dummy.rotation.set(0,v.rotation,v.lean+wave*(excited?.2:.035));dummy.scale.setScalar(v.scale);dummy.updateMatrix();crowdBody.setMatrixAt(i,dummy.matrix);
  dummy.position.y=v.y+.58+lift;dummy.updateMatrix();crowdHead.setMatrixAt(i,dummy.matrix);
 }
 modernCrowd?.update(crowdCursor,crowdBatchSize,now,excited);
 if(era.modern){
   markCrowdMatrices(crowdBody,crowdCursor,crowdBatchSize,spectators.length);
   markCrowdMatrices(crowdHead,crowdCursor,crowdBatchSize,spectators.length);
 }else{
   crowdBody.instanceMatrix.needsUpdate=true;
   crowdHead.instanceMatrix.needsUpdate=true;
 }
 crowdCursor=(crowdCursor+crowdBatchSize)%spectators.length;
 flagPoles.forEach((flag,i)=>flag.rotation.z=Math.sin(now*.002+i)*.07);
}
let previousFrame=0;
const debugOutput=import.meta.env.DEV&&new URLSearchParams(location.search).has('debug')?document.createElement('output'):null;
if(debugOutput){debugOutput.style.cssText='position:fixed;top:0;left:0;z-index:99;background:#000;color:#c3ff54;font:11px monospace;padding:8px;pointer-events:none';document.body.append(debugOutput);}
// Debug-only live-delivery samples. Exclude idle, replay and background gaps.
const deliveryIntervals = [];
let lastDeliveryFrame = null;
let sampledDelivery = null;
let deliveryFrameStats = '';
function updateDeliveryStats(now) {
  const active = state.phase === 'animating' && pausedAt === null && !document.hidden;
  if (active && sampledDelivery === state.anim && lastDeliveryFrame !== null) {
    deliveryIntervals.push(now - lastDeliveryFrame);
    if (deliveryIntervals.length === 120) {
      deliveryIntervals.sort((a, b) => a - b);
      deliveryFrameStats = ` · live p95 ${deliveryIntervals[113].toFixed(1)} ms (120 frames)`;
      deliveryIntervals.length = 0;
    }
  }
  sampledDelivery = active ? state.anim : null;
  lastDeliveryFrame = active ? now : null;
}
document.addEventListener('visibilitychange', () => { lastDeliveryFrame = null; });
function slowOverRateActive(){
 const clock=state.overRate?.[state.innings];
 return !!clock && state.balls[state.innings]>=clock.fromBall;
}
function updateOverRate(now){
 if(!era.modern || matchOvers!==20)return;
 const clocks=state.overRate??=[];
 const clock=clocks[state.innings]??={elapsed:0,last:null,fromBall:Infinity};
 // Only charge playable match time. Presentation, pause and hidden tabs
 // have their own clocks and cannot use up the fielding side's allowance.
 if(pausedAt!==null || document.hidden || !['playing','animating'].includes(state.phase)){
   clock.last=null;return;
 }
 if(clock.last!==null)clock.elapsed+=Math.max(0,now-clock.last);
 clock.last=now;
 if(clock.elapsed>=85*60*1000 && clock.fromBall===Infinity){
   clock.fromBall=sanctionFromBall(state.balls[state.innings],matchOvers,!!state.anim);
 }
}
function animate(now){
 if(rendererReleased())return;
 updateOverRate(now);
 const elapsed=previousFrame?(now-previousFrame)/1000:1/60;
 if(renderQuality&&state.phase==='animating'&&pausedAt===null&&!document.hidden){
   const ratio=renderQuality.observe(elapsed*1000);
   if(ratio!==null)renderer.setPixelRatio(ratio);
 }
 benchmark?.frame(now, state.phase==='animating' && pausedAt===null && !document.hidden);
 frameDelta=Math.min(era.modern?.1:.05,elapsed);previousFrame=now;
 if(fieldingLab){const a=state.anim,actions=modernFielding.events.map(e=>e.type).filter((v,i,all)=>v!==all[i-1]);fieldingLab.update(a?.lab?`${a.labName}: ${actions.join(' → ')||'tracking'} · ${a.labPlayer.userData.fielding?.mode||'stance'} · ${a.phase||'delivery'}${a.dismissal?' · '+a.dismissal:''} · closest hand ${modernFielding.closestHand.toFixed(2)}`:'Choose a drill. Results come from live contact.');}
 if(debugOutput && era.modern)updateDeliveryStats(now);
 if(debugOutput)debugOutput.textContent=`${Math.round(1/elapsed)} FPS · ${renderer.info.render.calls} draw calls · ${state.phase}/${state.anim?.phase||'delivery'} ${state.anim?.cpuShot||''} · camera ${currentBroadcastView?.id||cameraNames[state.camera]} @ ${camera.position.toArray().map(n=>n.toFixed(1)).join(',')} · ball ${ball.position.x.toFixed(2)},${ball.position.y.toFixed(2)},${ball.position.z.toFixed(2)}${deliveryFrameStats}`;
 requestAnimationFrame(animate);animateCrowd(now);
 if(pausedAt!==null){renderFrame();return}
 if(state.phase==='intro'&&now>=state.introUntil){state.phase='playing';state.autoAt=now+1800;$('#player-intro').classList.add('hidden');renderUI()}
 if(state.phase==='replay'){updateReplay(now);updateBallVisual();updateRunInset();if(state.replay){if(era.modern)updateCamera();else{camera.position.lerp(new THREE.Vector3(ball.position.x+13,27,ball.position.z+27),.09);camera.lookAt(ball.position.x,0,ball.position.z)}}renderFrame();return}
 if(state.phase==='playing'&&humanBatting()&&state.autoAt&&now>=state.autoAt&&!$('#modal-root').children.length)startDelivery();
 if(!state.anim)holdBallAtRunUp();
 if(era.modern){if(state.phase!=='replay')syncAthletes([batter,nonStriker,bowler,keeper,...fielders]);if(!state.anim){[bowler,...fielders].forEach(p=>idleAthlete(p,now/1000,frameDelta));}}
 if(state.anim){let a=state.anim,t=(now-a.start)/1000,dt=Math.min((now-a.last)/1000,era.modern?.1:.05)*(a.lab?(a.labSpeed??.2):1);a.last=now;if(era.modern&&(!a.lab||a.labClock)){a.simTime=(a.simTime||0)+dt;t=a.simTime;}
  if(era.modern&&a.flight&&a.phase!=='field')modernFielding.finishActions(dt,ball.position,[a.fielder,a.receiver]);
  let swingAt=humanBatting()?a.swing:a.impact-(era.modern?.3:.22);
  const preparationAt=a.preparationAt??swingAt;
  if(a.avoiding&&!a.flight&&a.releasePoint){
    const away=Math.sign(a.guardX-a.lineX)||(a.battingHand==='left'?1:-1);
    const displacement=Math.min(.3,Math.abs(batter.position.x-a.guardX)+1.6*dt);
    batter.position.x=a.guardX+away*displacement;
    poseBattingReady(batter,{hand:a.battingHand});
    a.attemptedAvoidance=displacement>0;
  }
  if(era.modern&&!a.regainingGround&&swingAt!==null&&t>=preparationAt&&(t-swingAt)<.75&&(!a.runActive||a.simTime-a.flightSimTime<.25)){
    const preparation=Math.min(.2,Math.max(0,swingAt-preparationAt)/.7);
    let phase=t<swingAt?(t-preparationAt)/.7:Math.max(preparation,(t-swingAt)/.7);
    if(a.struckAt!==undefined)phase=.43+(t-a.struckAt)/.7;
    if(phase>0)benchmark?.pose();
    poseBatting(batter,{phase:THREE.MathUtils.clamp(phase,0,1),shot:(humanBatting()?(a.selectedShot||state.shot):a.cpuShot)||'Straight drive',contact:a.contactPoint||new THREE.Vector3(a.lineX,ball.position.z>5?ball.position.y:.65,9.2),hand:a.battingHand,edge:a.edged});
  }
  else if(era.modern&&!a.regainingGround&&a.flight&&!a.runActive&&swingAt!==null&&t-swingAt>=.75&&!a.battingRecovered){poseBattingReady(batter,{hand:a.battingHand});a.battingRecovered=true;}
  if(!era.modern&&swingAt!==null&&(!a.flight||a.phase==='field'&&(t-swingAt)<.75)){let swingDuration=a.power?.44:.75,progress=Math.min(Math.max((t-swingAt)/swingDuration,0),1),arc=Math.sin(progress*Math.PI),stance=batter.userData.stance,shot=humanBatting()?(a.selectedShot||state.shot):a.cpuShot,power=shot==='Defend'?.5:shot==='Attacking drive'?1.45:shot==='Sweep'?1.25:1.05;if(progress>0)benchmark?.pose();let grip=batter.userData.bat,isSweep=shot==='Sweep',isHook=shot==='Hook'||shot==='Pull',isCut=shot==='Cut',isFlick=shot==='Flick',groundDrive=shot==='Straight drive';grip.position.set(stance.sign*arc*(isSweep?.55:isCut?-.32:isFlick?.36:.28),1.9+arc*(isSweep?-.55:isHook?.58:.16),.3-arc*(groundDrive?.35:.18));grip.rotation.set(isSweep?arc*1.2:isHook?-arc*1.1:isCut?arc*.65:shot==='Attacking drive'?-arc*.65:arc*.18,0,-stance.sign*(.12+arc*(isHook?1.55:power)*(a.power?1.5:1)));batter.userData.knees[0].rotation.x=.18+arc*(isSweep?.8:isHook?.12:.3);batter.userData.knees[1].rotation.x=.18+arc*(isSweep?.5:.12);if((shot==='Attacking drive'||groundDrive)&&!a.flight)batter.position.z=9.8-arc*(groundDrive?.55:.95);batter.rotation.x=.14+arc*(isSweep?.38:isHook?-.05:.08);batter.rotation.y=stance.yaw+stance.sign*arc*(isSweep?.65:isHook?-.45:isCut?-.3:.22);batter.userData.head.rotation.y=stance.headYaw-stance.sign*arc*.22;aimBattingArms(batter);if(era.modern)plantFeet(batter)}

  // After a missed stroke the striker can recover while the keeper gathers.
  if(era.modern&&a.flight&&!a.runActive&&t-a.flightSimTime>.24&&
     ['keeper-chase','keeper-gather','stumping'].includes(a.phase)&&
     !groundedAtCrease(runnerGroundPoints(batter),'keeper')){
    a.regainingGround=true;
    moveAthlete(batter,new THREE.Vector3(batter.position.x,0,9.85),dt,3.2,{facingYaw:0});
    groundRunningBat(batter,9.3);
  }
  if(!a.flight){
   if(era.modern)poseKeeping(keeper,ball.position,a.deliveryVelocity,dt);else{watchPoint(keeper,ball.position);keeper.userData.knees.forEach(k=>k.rotation.x=.45+.04*Math.sin(t*3));if(t>1.8+a.travel*.55){let move=THREE.MathUtils.clamp(a.lineX-keeper.position.x,-2.4*dt,2.4*dt);keeper.position.x+=move;keeperWalk(keeper,Math.abs(move),now);}}
   if(humanBatting()){
     const ready=t>a.impact-.48,status=$('#play-status');
     const text=ready?'COMPUTER BOWLING • HIT NOW!':'COMPUTER BOWLING • GET READY';
     if(status.textContent!==text)status.textContent=text;
     const cue=$('#batting-cue');
     if(cue){
       if(cue.hidden)cue.hidden=false;
       const cueText=ready?'HIT NOW':'GET READY';
       if(cue.textContent!==cueText)cue.textContent=cueText;
       cue.classList.toggle('hit',ready);
     }
   }
   if(era.modern){poseBowling(bowler,t,dt,a.bowlerArm);watchPoint(bowler,batter.position);}else{let run=Math.min(t/1.8,1);bowler.position.z=-20+run*9;let stride=t<1.8?Math.sin(t*15):0;stridePose(bowler,stride*.7);if(era.modern){const m=bowler.userData.motor;m.speed=t<1.8?5:0;m.vx=0;m.vz=m.speed;m.phase+=m.speed*dt/2.6*Math.PI*2;poseLocomotion(bowler,dt);}watchPoint(bowler,batter.position);bowler.rotation.x=t<1.8?.08+Math.abs(stride)*.05:0;bowler.position.y=t<1.8?Math.abs(stride)*.07:0;let deliveryArm=bowler.userData.arms[a.bowlerArm],otherArm=bowler.userData.arms[1-a.bowlerArm];otherArm.rotation.x=-stride*.5;deliveryArm.rotation.x=t<1.05?stride*.55:bowlingArmAngle(t);deliveryArm.rotation.z=0;bowler.userData.elbows[a.bowlerArm].rotation.x=t<1.05?(era.modern?-.42:.42):0;bowler.userData.elbows[1-a.bowlerArm].rotation.x=era.modern?-.55:.55;}
   if(t<1.8){ball.position.copy(handPosition(bowler,a.bowlerArm))}
   else if(era.modern){
    let flightStep=dt;
    if(!a.releasePoint){a.releasePoint=handPosition(bowler,a.bowlerArm);
      a.fieldFault=fieldRestrictionFault({fielders,keeper,bowler,hand:a.battingHand,balls:state.balls[state.innings],overs:matchOvers,slowOverRate:slowOverRateActive()});
      if(a.fieldFault)a.noBall=true;
      if(!humanBatting())renderUI();ball.position.copy(a.releasePoint);flightStep=Math.min(dt,Math.max(0,t-1.8));a.releaseGuardX=batter.position.x;const launch=deliveryLaunch({release:a.releasePoint,line:a.lineX,travel:a.travel,length:a.length,movement:a.variation.movement,spin:a.spin,turn:a.variation.turn,pitch:venueId});a.deliveryVelocity=new THREE.Vector3(launch.velocity.x,launch.velocity.y,launch.velocity.z);a.deliveryForces=launch;resetBallPhysics();setBallSpin(launch.spin);$('#delivery-speed').textContent=`${a.speed} km/h`;$('#delivery-speed').hidden=false;}
    const before=ball.position.clone();const wasBounced=a.deliveryBounced;a.deliveryBounced=advanceBall(ball.position,a.deliveryVelocity,flightStep,a.deliveryBounced,a.deliveryForces);
    if(a.deliveryBounced && ball.position.z<9.2 && a.deliveryVelocity.lengthSq()<.0001){
      a.noBall=true;a.deadReason='DELIVERY CAME TO REST';a.flight=true;
      endPlay(0,null);
    }
    if(!wasBounced&&a.deliveryBounced)a.pitchX=a.deliveryForces.pitchX??ball.position.x;
    if(ball.position.z>=9.2){const fraction=(9.2-before.z)/(ball.position.z-before.z||1);ball.position.lerpVectors(before,ball.position.clone(),THREE.MathUtils.clamp(fraction,0,1));a.impact=t;}
    if(a.noBall&&!a.called&&!a.ending){a.called=true;umpire.userData.arms[0].rotation.z=-Math.PI/2;message('NO BALL',a.fieldFault||'ONE EXTRA • BALL STILL LIVE');announce('No ball. One extra.');winningExtra(a)}
   }else {if(!a.releasePoint){a.releasePoint=handPosition(bowler,a.bowlerArm);$('#delivery-speed').textContent=`${a.speed} km/h`;$('#delivery-speed').hidden=false}let p=Math.min((t-1.8)/a.travel,1),height=deliveryHeight(a.length,p)+(a.releasePoint.y-2.7)*(1-p);ball.position.set(THREE.MathUtils.lerp(a.releasePoint.x,a.lineX,p)+(a.spin&&p>.62?Math.sin((p-.62)/.38*Math.PI)*a.variation.movement*.35:Math.sin(Math.PI*p)*a.variation.movement*.5),height,THREE.MathUtils.lerp(a.releasePoint.z,9.2,p));if(a.noBall&&!a.called&&!a.ending){a.called=true;umpire.userData.arms[0].rotation.z=-Math.PI/2;message('NO BALL',a.fieldFault||'ONE EXTRA • BALL STILL LIVE');announce('No ball. One extra.')}}
   if(era.modern?!a.ending&&!!a.releasePoint&&ball.position.z>=9.199:t>=a.impact){if(a.wide&&!era.modern){umpire.userData.arms[0].rotation.z=-Math.PI/2;umpire.userData.arms[1].rotation.z=Math.PI/2;message('WIDE BALL','ONE EXTRA • REBOWL')}beginFlight(now)}
  }else if(a.phase==='miss'){
   let p=Math.min((now-a.phaseAt)/600,1);ball.position.lerpVectors(a.missStart,a.missTarget,p);if(p>=1)endPlay(0,a.dismissal);
  }else if(a.phase==='keeper-chase'&&era.modern){
   // Resolve the pad, wicket and glove in the same short steps as the ball.
   // A low frame rate can otherwise move a fast delivery past a whole stance.
   for(let remaining=dt;remaining>1e-7&&a.phase==='keeper-chase';){
    const step=Math.min(1/120,remaining);remaining-=step;
    const before=ball.position.clone(),hands=[handPoint(keeper,0),handPoint(keeper,1)];
    a.bounced=advanceBall(ball.position,a.velocity,step,a.bounced);poseKeeping(keeper,ball.position,a.velocity,step);
    const wicket=sweptWicketHit(before,ball.position,'keeper');
    const pad=a.padTouched?null:firstPadContact(before,wicket?new THREE.Vector3(wicket.x,wicket.y,wicket.z):ball.position,batter);
    if(pad){
      a.padTouched=true;a.wide=false;playEffect('pad');
      const playedShot=a.swing!==null||!humanBatting();
      const untilStumps=Math.max(0,(10.5-pad.point.z)/Math.max(.01,a.velocity.z));
      const projected=pad.point.clone().addScaledVector(a.velocity,untilStumps);
      projected.y-=4.905*untilStumps**2;
      const wouldHit=sweptWicketHit(pad.point,projected,'keeper');
      ball.position.copy(pad.point);
      if(lbwEligible({pitchX:a.pitchX,impactX:pad.point.x,hand:a.battingHand,playedShot,wouldHit,noBall:a.noBall,freeHit:a.freeHit}))endPlay(0,'LBW');
      else if(!playedShot&&!a.attemptedAvoidance)endPlay(0,null);
      else {a.legBye=true;a.phase='field';a.velocity.multiplyScalar(.22);a.velocity.z*=-1;resetBallPhysics();message('OFF THE PAD','BALL IN PLAY');renderUI();}
    }else if(wicket&&!a.noBall&&!a.freeHit){
      ball.position.set(wicket.x,wicket.y,wicket.z);a.wide=false;endPlay(0,'BOWLED');
    }else{
    const glove=hands.findIndex((hand,i)=>sweptContact(hand,handPoint(keeper,i),before,ball.position,gloveRadius(keeper))!==null);
    if(glove>=0){playEffect('glove');a.phase='keeper-gather';a.glove=glove;a.phaseAt=now;a.gatherFrom=ball.position.clone();ball.position.copy(handPoint(keeper,glove));message('WICKETKEEPER','CLEAN GLOVE CONTACT');}
    else if(ball.position.z>keeper.position.z+.8){a.phase='field';a.runAllowed=true;a.runActive=true;a.runReturning=false;message(a.wide?'WIDE BALL':'BYE','PAST THE KEEPER • BATTERS RUN');renderUI();}
    }
   }
  }else if(a.phase==='keeper-chase'){
   a.bounced=advanceBall(ball.position,a.velocity,dt,a.bounced);
   let shift=THREE.MathUtils.clamp(ball.position.x-keeper.position.x,-3.0*dt,3.0*dt);keeper.position.x+=shift;keeperWalk(keeper,Math.abs(shift),now);keeper.rotation.x=-.48;watchPoint(keeper,ball.position);aimHandAt(keeper,0,ball.position);aimHandAt(keeper,1,ball.position);
   if(keeperCanCollect(ball.position,keeper.position)){a.phase='keeper-gather';a.phaseAt=now;a.gatherFrom=ball.position.clone();message('WICKETKEEPER','COLLECTS THE BALL')}
   else if(ball.position.z>keeper.position.z+1.4){a.phase='field';a.runAllowed=true;a.runActive=true;a.runReturning=false;message(a.wide?'WIDE BALL':'BYE','PAST THE KEEPER • BATTERS RUN');renderUI()}
  }else if(a.phase==='keeper-gather'){
   let p=Math.min((now-a.phaseAt)/420,1);if(era.modern){
     ball.position.copy(handPoint(keeper,a.glove??1));
     if(!a.noBall&&!a.freeHit&&!a.runActive&&!groundedAtCrease(runnerGroundPoints(batter),'keeper')){
       a.phase='stumping';a.stumpingTime=0;
     }else if(p>=1)endPlay(0,null);
   }else{keeper.rotation.x=-.48-.12*p;keeper.userData.knees.forEach(k=>k.rotation.x=.65);ball.position.lerpVectors(a.gatherFrom,keeperGlove(),p);if(p>=1)endPlay(0,null);}
  }else if(a.phase==='stumping'){
   a.stumpingTime+=dt;
   const hit=touchWicketWithBall(keeper,a.glove??1,ball.position,'keeper',a.stumpingTime,dt);
   if(hit){const safe=groundedAtCrease(runnerGroundPoints(batter),'keeper');endPlay(0,safe?null:'STUMPED');}
   else if(a.stumpingTime>2)endPlay(0,null);
  }else if(a.phase==='field'&&era.modern){
   const before=ball.position.clone();a.bounced=advanceBall(ball.position,a.velocity,dt,a.bounced);ball.rotation.x+=Math.hypot(a.velocity.x,a.velocity.z)*dt/.16;
   const event=modernFielding.update({ball:ball.position,previousBall:before,velocity:a.velocity,bounced:a.bounced,dt});
   advanceRunners(a,dt,now);
   if(event?.type==='catch'){
    a.fielder=event.player;a.caughtBall=true;a.phase='catch';a.phaseAt=now;a.catchFrom=ball.position.clone();
    a.fieldingDismissal=!a.noBall&&!a.bye&&!a.wide&&!a.freeHit;ball.position.copy(handPoint(a.fielder,1));
    message(a.fieldingDismissal?'CATCH!':'BALL HELD',a.fielder.userData.fielding.mode==='dive'?'A DIVING TAKE':'FIELDER TAKES THE BALL');
   }else if(event?.type==='stop'||event?.type==='block'){
    applyFieldingContact(ball.position,a.velocity,before,event);
    if(event.controlled){
     a.phase='pickup';a.phaseAt=now;a.pickElapsed=0;a.liftElapsed=0;a.fielder=event.player;a.carryHand=event.hand;a.possessionAt=now;
     a.carryRotation=event.player.userData.torso.rotation.x;a.pickY=event.player.position.y;a.pickFeet=null;
     modernFielding.hold(event.player);ball.position.copy(handPoint(event.player,event.hand));
     message('CLEAN GATHER','FIELDER HAS THE BALL');
    }else message(event.type==='block'?'BODY BLOCK':['dive','slide'].includes(event.player.userData.fielding.mode)?'DIVING STOP':'SHARP STOP','BALL DEADENED • STILL LIVE');
   }else if(event?.type==='gather'){
    a.phase='pickup';a.phaseAt=now;a.pickElapsed=0;a.liftElapsed=0;a.pickFrom=ball.position.clone();a.fielder=event.player;a.pickOffset=null;a.pickFeet=null;a.possessionAt=null;modernFielding.held=event.player;
    message('FIELDING SIDE','FIELDER MOVES TO GATHER');
   }
   if(a.phase==='field'&&Math.hypot(ball.position.x,ball.position.z)>=50){a.boundaryOutcome=a.overthrowRuns!==undefined||a.bye||a.bounced?4:6;a.phase='boundary';a.phaseAt=now;a.live=false;}
  }else if(a.phase==='field'){
   a.bounced=advanceBall(ball.position,a.velocity,dt,a.bounced);ball.rotation.x+=Math.hypot(a.velocity.x,a.velocity.z)*dt/.27;
   let candidates=[...fielders,bowler],target=ball.position.clone();let prediction=Math.min(.65,Math.hypot(a.velocity.x,a.velocity.z)/30);target.x+=a.velocity.x*prediction;target.z+=a.velocity.z*prediction;let radius=Math.hypot(target.x,target.z);if(radius>49){target.x*=49/radius;target.z*=49/radius}target.y=0;
   let ranked=candidates.map(p=>({p,d:(p.position.x-target.x)**2+(p.position.z-target.z)**2})).sort((a,b)=>a.d-b.d),closest=candidates.reduce((best,p)=>Math.hypot(p.position.x-ball.position.x,p.position.z-ball.position.z)<Math.hypot(best.position.x-ball.position.x,best.position.z-ball.position.z)?p:best,candidates[0]);let lead=ranked[0].p,backup=closest===lead?ranked[1].p:closest,stride=Math.sin(now*.015)*.75;if(era.modern){if(!a.fieldSelectionAt||now-a.fieldSelectionAt>500){a.fieldLead=lead;a.fieldBackup=backup;a.fieldSelectionAt=now;}lead=a.fieldLead;backup=a.fieldBackup;}
   candidates.forEach((f,i)=>{let rank=f===lead?0:f===backup?1:2;if(rank<2){let destination=ball.position;facePoint(f,destination);watchPoint(f,ball.position);let delta=new THREE.Vector3(destination.x-f.position.x,0,destination.z-f.position.z),dist=delta.length(),step=Math.min(dist,(rank===0?7.5:6.5)*dt);if(dist>.01)f.position.addScaledVector(delta,step/dist);let diving=dist<3.8&&dist>1.2&&ball.position.y>.5&&ball.position.y<2.6;if(diving){f.rotation.x=.85;f.userData.arms[1].rotation.x=-1.3}let gait=dist>.18?stride:0;stridePose(f,gait);f.userData.arms[0].rotation.x=-gait*.7;f.userData.arms[1].rotation.x=diving?-1.3:gait*.7;f.userData.elbows[0].rotation.x=.65+Math.max(0,gait)*.2;f.userData.elbows[1].rotation.x=.65+Math.max(0,-gait)*.2;f.position.y=dist>.18?Math.abs(gait)*.06:0;f.rotation.x=diving?.85:dist>.18?.14:.04}else if(f.userData.legs){facePoint(f,ball.position);watchPoint(f,ball.position);f.userData.legs[0].rotation.x*=.8;f.userData.legs[1].rotation.x*=.8;f.userData.knees.forEach(k=>k.rotation.x*=.8);f.rotation.x*=.8}});
   let nearest=candidates.map(p=>({p,d:Math.hypot(ball.position.x-p.position.x,ball.position.z-p.position.z)})).sort((a,b)=>a.d-b.d)[0],f=nearest.p,distance=nearest.d;a.fielder=f;
   advanceRunners(a,dt,now);
   if(Math.hypot(ball.position.x,ball.position.z)>=50){a.boundaryOutcome=a.bye||a.bounced?4:6;a.phase='boundary';a.phaseAt=now;a.live=false}
   else if((era.modern?distance<1.15&&(a.bounced||a.bye||handPosition(f,1).distanceTo(ball.position)<.42):distance<1.4)&&ball.position.y<(era.modern?3.15:2.9)){if(!a.bye&&!a.bounced&&ball.position.y>.7&&!a.noBall){a.phase='catch';a.phaseAt=now;a.catchFrom=ball.position.clone();a.fielder=f;facePoint(f,ball.position);watchPoint(f,ball.position);aimHandAt(f,1,ball.position);message('CATCH!', 'FIELDER TAKES THE BALL')}else{a.phase='pickup';a.phaseAt=now;a.pickFrom=ball.position.clone();a.fielder=f;f.userData.legs.forEach(l=>l.rotation.x=0);message('FIELDING SIDE','FIELDER GATHERS THE BALL')}}
  }else if(a.phase==='boundary'){
   a.bounced=advanceBall(ball.position,a.velocity,dt,a.bounced);ball.rotation.x+=Math.hypot(a.velocity.x,a.velocity.z)*dt/.27;
   const radius=Math.hypot(ball.position.x,ball.position.z),elapsed=(now-a.phaseAt)/1000;
   if(a.boundaryOutcome===4){if(radius>=60.5&&!a.boardHit){a.boardHit=true;a.boardAt=now;let nx=ball.position.x/radius,nz=ball.position.z/radius,dot=a.velocity.x*nx+a.velocity.z*nz;a.velocity.x-=1.35*dot*nx;a.velocity.z-=1.35*dot*nz;a.velocity.y=Math.max(a.velocity.y,1.1)}if((a.boardHit&&now-a.boardAt>650)||elapsed>4)endPlay(a.overthrowRuns??4,null)}
   else {let standHeight=radius>=65?Math.max(.5,(radius-65)*.58):0;if(era.modern&&radius>=87&&ball.position.y>18.5)a.outOfStadium=true;let landedInStand=radius>=65&&(!era.modern||radius<87)&&ball.position.y<=standHeight+.3;if(landedInStand||radius>=(era.modern?115:88)||elapsed>(era.modern?10:7))endPlay(6,null)}
  }else if(a.phase==='catch'){
   let p=Math.min((now-a.phaseAt)/420,1),f=a.fielder;gripFingers(f,1,p);if(era.modern)ball.position.copy(handPosition(f,1));else ball.position.lerpVectors(a.catchFrom,handPosition(f,1),p);if(p>=1){if(era.modern&&!a.fieldingDismissal){a.caughtBall=false;beginReturnThrow(a,f,now);}else endPlay(0,f===bowler?'CAUGHT & BOWLED':'CAUGHT');}
  }else if(a.phase==='pickup'&&era.modern){
   modernPickup(a,dt,now);
  }else if(a.phase==='pickup'){
   let p=Math.min((now-a.phaseAt)/850,1),f=a.fielder;f.rotation.x=.68*Math.sin(p*Math.PI);f.userData.legs[0].rotation.x=.38*Math.sin(p*Math.PI);f.userData.legs[1].rotation.x=-.2*Math.sin(p*Math.PI);f.userData.knees.forEach(k=>k.rotation.x=.55*Math.sin(p*Math.PI));gripFingers(f,1,p);f.userData.elbows[1].rotation.x=.3*Math.sin(p*Math.PI);f.userData.arms[1].rotation.x=.75*Math.sin(p*Math.PI);watchPoint(f,ball.position);f.updateMatrixWorld(true);let hand=handPosition(f,1);ball.position.lerpVectors(a.pickFrom,hand,Math.max(0,(p-.35)/.65));advanceRunners(a,dt,now);
   if(p>=1)beginReturnThrow(a,f,now);
  }else if(a.phase==='modern-return'){
   advanceRunners(a,dt,now);
   for(const event of a.returnThrow.update(ball.position,dt)){modernFielding.events.push({type:event.type,player:a.fielder});
    if(event.type==='released'){a.overthrowRuns=overthrowAllowance(a);message('THE THROW IS AWAY','WATCH THE CREASE');announce('The fielder picks up and throws.');}
    else if(event.type==='received'){message('CLEAN TAKE','THE FIELDER MOVES TO BREAK THE WICKET');}
    else if(event.type==='wicket'){
     a.throwEnd=event.end;breakWicket(now);
     if(event.out){a.dismissedPlayer=event.batterIndex===0?state.striker:state.partner;endPlay(a.runs,'RUN OUT');}
     else if(a.runActive){a.phase='safe';a.runAllowed=false;a.queuedRun=false;message('BATTER SAFE','COMPLETE THE RUN');}
     else endPlay(a.runs,null);
    }else if(event.type==='overthrow'){
     a.phase='field';a.receiver=null;modernFielding.held=null;modernFielding.planAt=-1;message(event.bobble?'KEEPER BOBBLES THE TAKE':'THE THROW GETS AWAY','BALL STILL LIVE • OVERTHROW CHANCE');
    }else if(event.type==='complete')endPlay(a.runs,null);
   }
  }else if(a.phase==='throw'){
   let p=Math.min((now-a.phaseAt)/1000/a.throwDuration,1);gripFingers(a.fielder,1,Math.max(0,1-p*5));a.fielder.userData.arms[1].rotation.x=THREE.MathUtils.lerp(-1.25,1.1,Math.min(1,p*4));a.fielder.userData.elbows[1].rotation.x=.5*(1-Math.min(1,p*4));a.fielder.rotation.x=.15*Math.sin(Math.min(1,p*3)*Math.PI);watchPoint(a.fielder,ball.position);let thrown=throwPosition(a.throwFrom,a.throwTarget,p,era.modern?a.throwDuration:null);ball.position.set(thrown.x,thrown.y,thrown.z);
   advanceRunners(a,dt,now);
   if(p>=1){a.phase='receive';a.phaseAt=now;a.receiveStart=keeper.position.clone();message(a.throwEnd==='bowler'?'BOWLER':'WICKETKEEPER','TAKES THE THROW')}
  }else if(a.phase==='receive'){
   let p=Math.min((now-a.phaseAt)/650,1);if(a.throwEnd==='bowler'){bowler.rotation.x=-.15*p;ball.position.copy(handPosition(bowler,1))}else{let before=keeper.position.z;keeper.position.z=THREE.MathUtils.lerp(a.receiveStart.z,12.5,p);keeperWalk(keeper,Math.abs(keeper.position.z-before),now);gripFingers(keeper,1,p);keeper.rotation.x=-.36-p*.18;keeper.userData.arms.forEach(arm=>arm.rotation.x=-.9-p*.3);ball.position.copy(keeperGlove())}advanceRunners(a,dt,now);
   if(p>=1){let decision=judgeThrow(a);if(decision==='run-out'){a.dismissedPlayer=runnerAtEnd(batter.position.z,nonStriker.position.z,a.throwEnd)==='striker'?state.striker:state.partner;endPlay(a.runs,'RUN OUT')}else if(decision==='missed-active'){a.phase='safe';a.runAllowed=false;a.queuedRun=false;message('BATTER SAFE','COMPLETE THE RUN')}else endPlay(a.runs,null)}
  }else if(a.phase==='safe'){advanceRunners(a,dt,now);if(!a.runActive)endPlay(a.runs,null)
  }else if(a.phase==='settle'){animateWicket(now);if(era.modern)signalOutcome(umpire,a,(now-a.phaseAt)/1000);if(now-a.phaseAt>1600){captureFrame(now);if(a.lab){a.phase='lab-result';}else if((a.dismissal&&replayWickets)||((a.outcome===4||a.outcome===6)&&replayBoundaries))startReplay();else resolveDelivery()}}
  if(era.modern&&a.flight&&t<2.5&&bowler!==a.fielder&&bowler.userData.fielding?.mode==='ready')poseBowling(bowler,t,dt,a.bowlerArm);
  if(era.modern&&a.releasePoint&&!a.noBall&&!a.freeHit&&!a.ending&&swingAt!==null&&t>=swingAt&&t-swingAt<.75&&!a.runActive){
    const points=runnerGroundPoints(batter);
    points.push(bat.localToWorld(new THREE.Vector3(0,-.93,0)),bat.localToWorld(new THREE.Vector3(0,-.4,0)));
    if(strikerBreaksWicket(a.strikerWicketPoints,points))endPlay(0,'HIT WICKET');
    a.strikerWicketPoints=points;
  }
  if(era.modern&&a.wide&&!a.wideCalled&&ball.position.z>=10.4){a.wideCalled=true;umpire.userData.arms.forEach(arm=>arm.rotation.z=arm===umpire.userData.arms[0]?-Math.PI/2:Math.PI/2);message('WIDE BALL','ONE EXTRA • BALL STILL LIVE');announce('Wide ball. One extra.');winningExtra(a);}
  if(era.modern&&state.anim===a&&a.caughtBall)ball.position.copy(handPoint(a.fielder,1));
 }
 updateBallVisual();updateRunInset();updateCamera();if(state.phase==='animating')captureFrame(now);renderFrame();renderPitchInset();benchmark?.rendered()
}if(era.modern){updateVenueUI(venueId);setTimeOfDay(era.defaultNight);}updateCrowd();syncPlayers();requestAnimationFrame(animate);renderUI();

if(import.meta.env.DEV&&era.modern&&new URLSearchParams(location.search).has('fieldingLab')){
 import('./fielding-lab.js').then(({mountFieldingLab})=>{
  fieldingLab=mountFieldingLab({
   pause:()=>{manualPaused=true;freezeMatch();},
   resume:()=>{manualPaused=false;thawMatch();},
   launch:async id=>{
    await initPhysics({modern:true});manualPaused=false;externallyPaused=false;thawMatch();
    resetFielders();resetBowler();resetKeeper();resetWickets();syncPlayers();resetMotor(batter);resetMotor(nonStriker);
    if(id==='delivery'){
     state.phase='playing';state.autoAt=0;state.camera=0;startDelivery();
     Object.assign(state.anim,{lab:true,labClock:true,labBallCamera:true,labPlayer:bowler,labName:'bowling camera',labSpeed:.2});
     $('#modal-root').innerHTML='';$('#player-intro').classList.add('hidden');$('#replay-ui').classList.add('hidden');renderUI();updateCamera(true);return;
    }
    const presets={ground:{player:[20,0],ball:[20,.036,7],velocity:[0,0,-14],bounced:true},body:{player:[20,0],ball:[20,.5,1.5],velocity:[0,0,-24],bounced:true},standing:{player:[0,0],ball:[0,1.5,6],velocity:[0,4,-8]},dive:{player:[1.7,0],ball:[0,.7,5],velocity:[0,2,-10]},rope:{player:[44,0],ball:[40,.036,1.5],velocity:[12,0,0],bounced:true},backpedal:{player:[0,10],ball:[0,3,-2],velocity:[0,6,9],yaw:Math.PI}};
    const preset=presets[id]||presets.standing,p=fielders[0];
    [...fielders,bowler].forEach((actor,i)=>{actor.position.set(-52+i*1.2,0,-48);actor.rotation.set(0,0,0);});
    p.position.set(preset.player[0],0,preset.player[1]);p.rotation.y=preset.yaw||0;
    modernFielding.begin();resetBallPhysics();ball.position.set(...preset.ball);
    const now=performance.now();state.phase='animating';state.autoAt=0;
    state.anim={lab:true,labPlayer:p,labName:id,start:now-5000,last:now,flight:true,flightStart:now-500,impact:-10,swing:null,phase:'field',live:true,velocity:new THREE.Vector3(...preset.velocity),bounced:!!preset.bounced,runs:0,runProgress:0,runActive:false,runAllowed:false,noBall:false,wide:false,bye:false,dismissal:null};
    if(id.endsWith('-stance')){
     const hand=id.startsWith('left')?'left':'right';
     batter.position.set(hand==='left'?.35:-.35,0,9.8);poseBattingReady(batter,{hand});
     Object.assign(state.anim,{labPlayer:batter,phase:'pose',labName:`${hand}-hand stance`,battingHand:hand});
     ball.position.set(0,1.2,12.6);
    }else if(id==='loft'){
     resetFielders();resetBowler();modernFielding.begin();
     ball.position.set(0,.65,9.2);
     const base=shotVelocity('Attacking drive',0,()=>.5,{height:.65,power:true,hand:'right'});
     const velocity=modernShotResponse(base,{z:40},0,'right',{shot:'Attacking drive',power:true});
     Object.assign(state.anim,{labBallCamera:true,labSpeed:.5,labName:'timed power drive',velocity:new THREE.Vector3(velocity.x,velocity.y,velocity.z),flightStart:now});
     state.camera=0;
    }else if(['return','runout','overthrow'].includes(id)){
     const a=state.anim;let randomIndex=0;
     p.position.set(id==='overthrow'?46:id==='runout'?8:20,0,0);bowler.position.set(0,0,-11);keeper.position.set(0,0,13.6);
     batter.position.set(-.7,0,id==='runout'?7.85:9.8);nonStriker.position.set(.7,0,id==='runout'?-7.795:-9.75);
     a.labBallCamera=true;state.camera=0;
     a.runActive=id==='runout';a.runAllowed=a.runActive;a.runProgress=id==='runout'?.1:0;a.fielder=p;a.bounced=true;
     a.throwRandom=id==='overthrow'?()=>randomIndex++%2===0?1:0:()=>.5;
     beginReturnThrow(a,p,now);
    }
    $('#modal-root').innerHTML='';$('#player-intro').classList.add('hidden');$('#replay-ui').classList.add('hidden');renderUI();updateCamera(true);syncAthletes([batter,nonStriker,bowler,keeper,...fielders]);
   }
  });
 });
}
