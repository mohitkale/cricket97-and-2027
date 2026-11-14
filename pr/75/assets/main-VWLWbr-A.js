const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/stock-striker-DhyNT33-.js","assets/legacy-CGadfCkY.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/legacy-BOQhSbEX.css"])))=>i.map(i=>d[i]);
import{m as ph,_ as mh,r as Bu}from"./legacy-CGadfCkY.js";const Dc="187",hp=0,zu=1,fp=2,Ws=1,pp=2,Mr=3,xs=0,yn=1,Vt=2,Xs=0,Tr=1,ku=2,Hu=3,Gu=4,mp=5,Hs=100,gp=101,xp=102,_p=103,vp=104,Mp=200,Sp=201,yp=202,Ep=203,gh=204,xh=205,bp=206,Tp=207,wp=208,Ap=209,Rp=210,Cp=211,Dp=212,Pp=213,Lp=214,_l=0,vl=1,Ml=2,Ur=3,Sl=4,yl=5,El=6,bl=7,_h=0,Ip=1,Np=2,Ci=0,vh=1,Mh=2,Sh=3,Pc=4,yh=5,Eh=6,bh=7,Vu="attached",Up="detached",Th=300,$s=301,Or=302,Uo=303,Oo=304,Ja=1e3,Ai=1001,Tl=1002,nn=1003,Op=1004,oa=1005,Sn=1006,Fo=1007,Ki=1008,Ln=1009,wh=1010,Ah=1011,Fr=1012,Lc=1013,pi=1014,Vn=1015,mi=1016,Ic=1017,Nc=1018,Ks=1020,Rh=35902,Ch=35899,Dh=1021,Ph=1022,ei=1023,Qi=1026,Zi=1027,Uc=1028,Oc=1029,_s=1030,Fc=1031,Bc=1033,za=33776,ka=33777,Ha=33778,Ga=33779,wl=35840,Al=35841,Rl=35842,Cl=35843,Dl=36196,Pl=37492,Ll=37496,Il=37488,Nl=37489,Qa=37490,Ul=37491,Ol=37808,Fl=37809,Bl=37810,zl=37811,kl=37812,Hl=37813,Gl=37814,Vl=37815,Wl=37816,Xl=37817,ql=37818,Yl=37819,$l=37820,Kl=37821,Zl=36492,Jl=36494,Ql=36495,jl=36283,ec=36284,ja=36285,tc=36286,Fp=3200,nc=0,Bp=1,$i="",Bt="srgb",eo="srgb-linear",to="linear",ct="srgb",Bo=7680,zp=519,kp=512,Hp=513,Gp=514,Lh=515,Vp=516,Wp=517,Ih=518,Nh=519,Uh=35044,zc=35048,Wu="300 es",ti=2e3,Br=2001;function Xp(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}const qp={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function la(n,e){return new qp[n](e)}function no(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Yp(){const n=no("canvas");return n.style.display="block",n}const Xu={};function io(...n){const e="THREE."+n.shift();console.log(e,...n)}function Oh(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Pe(...n){n=Oh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function rt(...n){n=Oh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Va(...n){const e=n.join(" ");e in Xu||(Xu[e]=!0,Pe(...n))}function $p(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Kp={[_l]:_l,[Ml]:El,[Sl]:Sl,[Ur]:yl,[vl]:vl,[El]:Ml,[bl]:bl,[yl]:Ur};class ys{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qu=1234567;const wr=Math.PI/180,zr=180/Math.PI;function Ui(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function je(n,e,t){return Math.max(e,Math.min(t,n))}function kc(n,e){return(n%e+e)%e}function Zp(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Jp(n,e,t){return n!==e?(t-n)/(e-n):0}function Ar(n,e,t){return(1-t)*n+t*e}function Qp(n,e,t,i){return Ar(n,e,1-Math.exp(-t*i))}function jp(n,e=1){return e-Math.abs(kc(n,e*2)-e)}function em(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function tm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function nm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function im(n,e){return n+Math.random()*(e-n)}function sm(n){return n*(.5-Math.random())}function rm(n){n!==void 0&&(qu=n);let e=qu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function am(n){return n*wr}function om(n){return n*zr}function lm(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function cm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Fh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function um(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),f=a((e-i)/2),h=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*g,l*h,o*c);break;case"YXY":n.set(l*h,o*u,l*g,o*c);break;case"ZYZ":n.set(l*g,l*h,o*u,o*c);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function So(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Hc(n,e){if(e.constructor===Float32Array)return n;const t=So(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function Gc(n,e){if(e.constructor===Float32Array)return n;const t=So(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}const tt={DEG2RAD:wr,RAD2DEG:zr,generateUUID:Ui,clamp:je,euclideanModulo:kc,mapLinear:Zp,inverseLerp:Jp,lerp:Ar,damp:Qp,pingpong:jp,smoothstep:em,smootherstep:tm,randInt:nm,randFloat:im,randFloatSpread:sm,seededRandom:rm,degToRad:am,radToDeg:om,isPowerOfTwo:lm,ceilPowerOfTwo:cm,floorPowerOfTwo:Fh,setQuaternionFromProperEuler:um,normalize:Gc,denormalize:Hc},Eu=class Eu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Eu.prototype.isVector2=!0;let We=Eu;class Tn{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],f=r[a+0],h=r[a+1],g=r[a+2],M=r[a+3];if(d!==M||l!==f||c!==h||u!==g){let m=l*f+c*h+u*g+d*M;m<0&&(f=-f,h=-h,g=-g,M=-M,m=-m);let p=1-o;if(m<.9995){const _=Math.acos(m),y=Math.sin(_);p=Math.sin(p*_)/y,o=Math.sin(o*_)/y,l=l*p+f*o,c=c*p+h*o,u=u*p+g*o,d=d*p+M*o}else{l=l*p+f*o,c=c*p+h*o,u=u*p+g*o,d=d*p+M*o;const _=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=_,c*=_,u*=_,d*=_}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],f=r[a+1],h=r[a+2],g=r[a+3];return e[t]=o*g+u*d+l*h-c*f,e[t+1]=l*g+u*f+c*d-o*h,e[t+2]=c*g+u*h+o*f-l*d,e[t+3]=u*g-o*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),f=l(i/2),h=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"YZX":this._x=f*u*d+c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d-f*h*g;break;case"XZY":this._x=f*u*d-c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d+f*h*g;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+o+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(a-s)*h}else if(i>o&&i>d){const h=2*Math.sqrt(1+i-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-i-d);this._w=(r-c)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-i-o);this._w=(a-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const bu=class bu{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return zo.copy(this).projectOnVector(e),this.sub(zo)}reflect(e){return this.sub(zo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};bu.prototype.isVector3=!0;let P=bu;const zo=new P,Yu=new Tn,Tu=class Tu{constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],M=s[0],m=s[3],p=s[6],_=s[1],y=s[4],b=s[7],R=s[2],E=s[5],x=s[8];return r[0]=a*M+o*_+l*R,r[3]=a*m+o*y+l*E,r[6]=a*p+o*b+l*x,r[1]=c*M+u*_+d*R,r[4]=c*m+u*y+d*E,r[7]=c*p+u*b+d*x,r[2]=f*M+h*_+g*R,r[5]=f*m+h*y+g*E,r[8]=f*p+h*b+g*x,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,f=o*l-u*r,h=c*r-a*l,g=t*d+i*f+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=d*M,e[1]=(s*c-u*i)*M,e[2]=(o*i-s*a)*M,e[3]=f*M,e[4]=(u*t-s*l)*M,e[5]=(s*r-o*t)*M,e[6]=h*M,e[7]=(i*l-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Va("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ko.makeScale(e,t)),this}rotate(e){return Va("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ko.makeRotation(-e)),this}translate(e,t){return Va("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ko.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Tu.prototype.isMatrix3=!0;let Fe=Tu;const ko=new Fe,$u=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ku=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dm(){const n={enabled:!0,workingColorSpace:eo,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ct&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ct&&(s.r=qs(s.r),s.g=qs(s.g),s.b=qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===$i?to:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[eo]:{primaries:e,whitePoint:i,transfer:to,toXYZ:$u,fromXYZ:Ku,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:$u,fromXYZ:Ku,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),n}const et=dm();function Di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ws;class hm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ws===void 0&&(ws=no("canvas")),ws.width=e.width,ws.height=e.height;const s=ws.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ws}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=no("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Di(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Di(t[i]/255)*255):t[i]=Di(t[i]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fm=0;class Vc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=Ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ho(s[a].image)):r.push(Ho(s[a]))}else r=Ho(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ho(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?hm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let pm=0;const Go=new P;class un extends ys{constructor(e=un.DEFAULT_IMAGE,t=un.DEFAULT_MAPPING,i=Ai,s=Ai,r=Sn,a=Ki,o=ei,l=Ln,c=un.DEFAULT_ANISOTROPY,u=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=Ui(),this.name="",this.source=new Vc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Go).x}get height(){return this.source.getSize(Go).y}get depth(){return this.source.getSize(Go).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Th)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ja:e.x=e.x-Math.floor(e.x);break;case Ai:e.x=e.x<0?0:1;break;case Tl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ja:e.y=e.y-Math.floor(e.y);break;case Ai:e.y=e.y<0?0:1;break;case Tl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=Th;un.DEFAULT_ANISOTROPY=1;const wu=class wu{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],g=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,b=(h+1)/2,R=(p+1)/2,E=(u+f)/4,x=(d+M)/4,v=(g+m)/4;return y>b&&y>R?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=E/i,r=x/i):b>R?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=E/s,r=v/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=x/r,s=v/r),this.set(i,s,r,t),this}let _=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(f-u)*(f-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-M)/_,this.z=(f-u)/_,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};wu.prototype.isVector4=!0;let dt=wu;class mm extends ys{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t),this.textures=[];const s=i.count;for(let r=0;r<s;r++)this.textures[r]=new un({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Vc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends mm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Bh extends un{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gm extends un{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Mo=class Mo{constructor(e,t,i,s,r,a,o,l,c,u,d,f,h,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,f,h,g,M,m)}set(e,t,i,s,r,a,o,l,c,u,d,f,h,g,M,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mo().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/As.setFromMatrixColumn(e,0).length(),r=1/As.setFromMatrixColumn(e,1).length(),a=1/As.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=a*u,h=a*d,g=o*u,M=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+g*c,t[5]=f-M*c,t[9]=-o*l,t[2]=M-f*c,t[6]=g+h*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,g=c*u,M=c*d;t[0]=f+M*o,t[4]=g*o-h,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-g,t[6]=M+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,g=c*u,M=c*d;t[0]=f-M*o,t[4]=-a*d,t[8]=g+h*o,t[1]=h+g*o,t[5]=a*u,t[9]=M-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,h=a*d,g=o*u,M=o*d;t[0]=l*u,t[4]=g*c-h,t[8]=f*c+M,t[1]=l*d,t[5]=M*c+f,t[9]=h*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,h=a*c,g=o*l,M=o*c;t[0]=l*u,t[4]=M-f*d,t[8]=g*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*d+g,t[10]=f-M*d}else if(e.order==="XZY"){const f=a*l,h=a*c,g=o*l,M=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+M,t[5]=a*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=o*u,t[10]=M*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xm,e,_m)}lookAt(e,t,i){const s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Bi.crossVectors(i,An),Bi.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Bi.crossVectors(i,An)),Bi.normalize(),ca.crossVectors(An,Bi),s[0]=Bi.x,s[4]=ca.x,s[8]=An.x,s[1]=Bi.y,s[5]=ca.y,s[9]=An.y,s[2]=Bi.z,s[6]=ca.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],M=i[6],m=i[10],p=i[14],_=i[3],y=i[7],b=i[11],R=i[15],E=s[0],x=s[4],v=s[8],C=s[12],A=s[1],L=s[5],U=s[9],k=s[13],I=s[2],G=s[6],$=s[10],W=s[14],se=s[3],q=s[7],te=s[11],ie=s[15];return r[0]=a*E+o*A+l*I+c*se,r[4]=a*x+o*L+l*G+c*q,r[8]=a*v+o*U+l*$+c*te,r[12]=a*C+o*k+l*W+c*ie,r[1]=u*E+d*A+f*I+h*se,r[5]=u*x+d*L+f*G+h*q,r[9]=u*v+d*U+f*$+h*te,r[13]=u*C+d*k+f*W+h*ie,r[2]=g*E+M*A+m*I+p*se,r[6]=g*x+M*L+m*G+p*q,r[10]=g*v+M*U+m*$+p*te,r[14]=g*C+M*k+m*W+p*ie,r[3]=_*E+y*A+b*I+R*se,r[7]=_*x+y*L+b*G+R*q,r[11]=_*v+y*U+b*$+R*te,r[15]=_*C+y*k+b*W+R*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],M=e[7],m=e[11],p=e[15],_=l*h-c*f,y=o*h-c*d,b=o*f-l*d,R=a*h-c*u,E=a*f-l*u,x=a*d-o*u;return t*(M*_-m*y+p*b)-i*(g*_-m*R+p*E)+s*(g*y-M*R+p*x)-r*(g*b-M*E+m*x)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],M=e[13],m=e[14],p=e[15],_=t*o-i*a,y=t*l-s*a,b=t*c-r*a,R=i*l-s*o,E=i*c-r*o,x=s*c-r*l,v=u*M-d*g,C=u*m-f*g,A=u*p-h*g,L=d*m-f*M,U=d*p-h*M,k=f*p-h*m,I=_*k-y*U+b*L+R*A-E*C+x*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/I;return e[0]=(o*k-l*U+c*L)*G,e[1]=(s*U-i*k-r*L)*G,e[2]=(M*x-m*E+p*R)*G,e[3]=(f*E-d*x-h*R)*G,e[4]=(l*A-a*k-c*C)*G,e[5]=(t*k-s*A+r*C)*G,e[6]=(m*b-g*x-p*y)*G,e[7]=(u*x-f*b+h*y)*G,e[8]=(a*U-o*A+c*v)*G,e[9]=(i*A-t*U-r*v)*G,e[10]=(g*E-M*b+p*_)*G,e[11]=(d*b-u*E-h*_)*G,e[12]=(o*C-a*L-l*v)*G,e[13]=(t*L-i*C+s*v)*G,e[14]=(M*y-g*R-m*_)*G,e[15]=(u*R-d*y+f*_)*G,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,f=r*c,h=r*u,g=r*d,M=a*u,m=a*d,p=o*d,_=l*c,y=l*u,b=l*d,R=i.x,E=i.y,x=i.z;return s[0]=(1-(M+p))*R,s[1]=(h+b)*R,s[2]=(g-y)*R,s[3]=0,s[4]=(h-b)*E,s[5]=(1-(f+p))*E,s[6]=(m+_)*E,s[7]=0,s[8]=(g+y)*x,s[9]=(m-_)*x,s[10]=(1-(f+M))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=As.set(s[0],s[1],s[2]).length();const o=As.set(s[4],s[5],s[6]).length(),l=As.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Yn.copy(this);const c=1/a,u=1/o,d=1/l;return Yn.elements[0]*=c,Yn.elements[1]*=c,Yn.elements[2]*=c,Yn.elements[4]*=u,Yn.elements[5]*=u,Yn.elements[6]*=u,Yn.elements[8]*=d,Yn.elements[9]*=d,Yn.elements[10]*=d,t.setFromRotationMatrix(Yn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=ti,l=!1){const c=this.elements,u=2*r/(t-e),d=2*r/(i-s),f=(t+e)/(t-e),h=(i+s)/(i-s);let g,M;if(l)g=r/(a-r),M=a*r/(a-r);else if(o===ti)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Br)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=ti,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-s),f=-(t+e)/(t-e),h=-(i+s)/(i-s);let g,M;if(l)g=1/(a-r),M=a/(a-r);else if(o===ti)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===Br)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Mo.prototype.isMatrix4=!0;let Ye=Mo;const As=new P,Yn=new Ye,xm=new P(0,0,0),_m=new P(1,1,1),Bi=new P,ca=new P,An=new P,Zu=new Ye,Ju=new Tn;class si{constructor(e=0,t=0,i=0,s=si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ju.setFromEuler(this),this.setFromQuaternion(Ju,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class zh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vm=0;const Qu=new P,Rs=new Tn,vi=new Ye,ua=new P,ar=new P,Mm=new P,Sm=new Tn,ju=new P(1,0,0),ed=new P(0,1,0),td=new P(0,0,1),nd={type:"added"},ym={type:"removed"},Cs={type:"childadded",child:null},Vo={type:"childremoved",child:null};class bt extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vm++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new P,t=new si,i=new Tn,s=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new Fe}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(e,t){return Rs.setFromAxisAngle(e,t),this.quaternion.premultiply(Rs),this}rotateX(e){return this.rotateOnAxis(ju,e)}rotateY(e){return this.rotateOnAxis(ed,e)}rotateZ(e){return this.rotateOnAxis(td,e)}translateOnAxis(e,t){return Qu.copy(e).applyQuaternion(this.quaternion),this.position.add(Qu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ju,e)}translateY(e){return this.translateOnAxis(ed,e)}translateZ(e){return this.translateOnAxis(td,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ua.copy(e):ua.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(ar,ua,this.up):vi.lookAt(ua,ar,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),Rs.setFromRotationMatrix(vi),this.quaternion.premultiply(Rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nd),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ym),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nd),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,e,Mm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,Sm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}bt.DEFAULT_UP=new P(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Lt extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Em={type:"move"};class Wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,i),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Em)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Lt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const kh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},da={h:0,s:0,l:0};function Xo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class He{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=et.workingColorSpace){if(e=kc(e,1),t=je(t,0,1),i=je(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Xo(a,r,e+1/3),this.g=Xo(a,r,e),this.b=Xo(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Bt){function i(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const i=kh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=qs(e.r),this.g=qs(e.g),this.b=qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return et.workingToColorSpace(on.copy(this),e),Math.round(je(on.r*255,0,255))*65536+Math.round(je(on.g*255,0,255))*256+Math.round(je(on.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(on.copy(this),t);const i=on.r,s=on.g,r=on.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Bt){et.workingToColorSpace(on.copy(this),e);const t=on.r,i=on.g,s=on.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(zi),this.setHSL(zi.h+e,zi.s+t,zi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(zi),e.getHSL(da);const i=Ar(zi.h,da.h,t),s=Ar(zi.s,da.s,t),r=Ar(zi.l,da.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new He;He.NAMES=kh;class Wc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new He(e),this.near=t,this.far=i}clone(){return new Wc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bm extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const $n=new P,Mi=new P,qo=new P,Si=new P,Ds=new P,Ps=new P,id=new P,Yo=new P,$o=new P,Ko=new P,Zo=new dt,Jo=new dt,Qo=new dt;class jn{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),$n.subVectors(e,t),s.cross($n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){$n.subVectors(s,t),Mi.subVectors(i,t),qo.subVectors(e,t);const a=$n.dot($n),o=$n.dot(Mi),l=$n.dot(qo),c=Mi.dot(Mi),u=Mi.dot(qo),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,h=(c*l-o*u)*f,g=(a*u-o*l)*f;return r.set(1-h-g,g,h)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Si.x),l.addScaledVector(a,Si.y),l.addScaledVector(o,Si.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Zo.setScalar(0),Jo.setScalar(0),Qo.setScalar(0),Zo.fromBufferAttribute(e,t),Jo.fromBufferAttribute(e,i),Qo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Zo,r.x),a.addScaledVector(Jo,r.y),a.addScaledVector(Qo,r.z),a}static isFrontFacing(e,t,i,s){return $n.subVectors(i,t),Mi.subVectors(e,t),$n.cross(Mi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),$n.cross(Mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return jn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Ds.subVectors(s,i),Ps.subVectors(r,i),Yo.subVectors(e,i);const l=Ds.dot(Yo),c=Ps.dot(Yo);if(l<=0&&c<=0)return t.copy(i);$o.subVectors(e,s);const u=Ds.dot($o),d=Ps.dot($o);if(u>=0&&d<=u)return t.copy(s);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),t.copy(i).addScaledVector(Ds,a);Ko.subVectors(e,r);const h=Ds.dot(Ko),g=Ps.dot(Ko);if(g>=0&&h<=g)return t.copy(r);const M=h*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Ps,o);const m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return id.subVectors(r,s),o=(d-u)/(d-u+(h-g)),t.copy(s).addScaledVector(id,o);const p=1/(m+M+f);return a=M*p,o=f*p,t.copy(i).addScaledVector(Ds,a).addScaledVector(Ps,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ts{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kn):Kn.fromBufferAttribute(r,a),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ha.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ha.copy(i.boundingBox)),ha.applyMatrix4(e.matrixWorld),this.union(ha)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),fa.subVectors(this.max,or),Ls.subVectors(e.a,or),Is.subVectors(e.b,or),Ns.subVectors(e.c,or),ki.subVectors(Is,Ls),Hi.subVectors(Ns,Is),rs.subVectors(Ls,Ns);let t=[0,-ki.z,ki.y,0,-Hi.z,Hi.y,0,-rs.z,rs.y,ki.z,0,-ki.x,Hi.z,0,-Hi.x,rs.z,0,-rs.x,-ki.y,ki.x,0,-Hi.y,Hi.x,0,-rs.y,rs.x,0];return!jo(t,Ls,Is,Ns,fa)||(t=[1,0,0,0,1,0,0,0,1],!jo(t,Ls,Is,Ns,fa))?!1:(pa.crossVectors(ki,Hi),t=[pa.x,pa.y,pa.z],jo(t,Ls,Is,Ns,fa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yi=[new P,new P,new P,new P,new P,new P,new P,new P],Kn=new P,ha=new ts,Ls=new P,Is=new P,Ns=new P,ki=new P,Hi=new P,rs=new P,or=new P,fa=new P,pa=new P,as=new P;function jo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){as.fromArray(n,r);const o=s.x*Math.abs(as.x)+s.y*Math.abs(as.y)+s.z*Math.abs(as.z),l=e.dot(as),c=t.dot(as),u=i.dot(as);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ft=new P,ma=new We;let Tm=0;class In extends ys{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uh,this.updateRanges=[],this.gpuType=Vn,this.version=0,this._normalizationScale=e!==void 0?So(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ma.fromBufferAttribute(this,t),ma.applyMatrix3(e),this.setXY(t,ma.x,ma.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Hc(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Gc(e,this.array)}}class Xc extends In{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Hh extends In{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class nt extends In{constructor(e,t,i){super(new Float32Array(e),t,i)}}const wm=new ts,lr=new P,el=new P;class xi{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):wm.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;lr.subVectors(e,this.center);const t=lr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(lr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(el.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(lr.copy(e.center).add(el)),this.expandByPoint(lr.copy(e.center).sub(el))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Am=0;const zn=new Ye,tl=new bt,Us=new P,Rn=new ts,cr=new ts,Zt=new P;class Tt extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xp(e)?Hh:Xc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Fe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,t,i){return zn.makeTranslation(e,t,i),this.applyMatrix4(zn),this}scale(e,t,i){return zn.makeScale(e,t,i),this.applyMatrix4(zn),this}lookAt(e){return tl.lookAt(e),tl.updateMatrix(),this.applyMatrix4(tl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ts);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];cr.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(Rn.min,cr.min),Rn.expandByPoint(Zt),Zt.addVectors(Rn.max,cr.max),Rn.expandByPoint(Zt)):(Rn.expandByPoint(cr.min),Rn.expandByPoint(cr.max))}Rn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Zt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Zt.fromBufferAttribute(o,c),l&&(Us.fromBufferAttribute(e,c),Zt.add(Us)),s=Math.max(s,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new In(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(i.count);for(let C=0;C<i.count;C++)o[C]=new P,l[C]=new P;const u=new P,d=new P,f=new P,h=new We,g=new We,M=new We,m=new P,p=new P;function _(C,A,L){c[C]=c[A]=c[L]=1,u.fromBufferAttribute(i,C),d.fromBufferAttribute(i,A),f.fromBufferAttribute(i,L),h.fromBufferAttribute(r,C),g.fromBufferAttribute(r,A),M.fromBufferAttribute(r,L),d.sub(u),f.sub(u),g.sub(h),M.sub(h);const U=1/(g.x*M.y-M.x*g.y);isFinite(U)&&(m.copy(d).multiplyScalar(M.y).addScaledVector(f,-g.y).multiplyScalar(U),p.copy(f).multiplyScalar(g.x).addScaledVector(d,-M.x).multiplyScalar(U),o[C].add(m),o[A].add(m),o[L].add(m),l[C].add(p),l[A].add(p),l[L].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let C=0,A=y.length;C<A;++C){const L=y[C],U=L.start,k=L.count;for(let I=U,G=U+k;I<G;I+=3)_(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const b=new P,R=new P,E=new P,x=new P;function v(C){E.fromBufferAttribute(s,C),x.copy(E);const A=o[C];b.copy(A),b.sub(E.multiplyScalar(E.dot(A))).normalize(),R.crossVectors(x,A);const U=R.dot(l[C])<0?-1:1;a.setXYZW(C,b.x,b.y,b.z,U)}for(let C=0,A=i.count;C<A;++C)c[C]&&v(C);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new In(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,u=new P,d=new P;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),M=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let h=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?h=l[M]*o.data.stride+o.offset:h=l[M]*u;for(let p=0;p<u;p++)f[g++]=c[h++]}return new In(f,u,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rm{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Uh,this.updateRanges=[],this.version=0,this.uuid=Ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=sd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const i=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=sd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}}function sd(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=Ui()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}const hn=new P;class so{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s,this._normalizationScale=e!==void 0?So(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){io("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new In(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new so(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){io("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Hc(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Gc(e,this.data.array)}}const nl=new P,Cm=new P,Dm=new Fe;class Xi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=nl.subVectors(i,t).cross(Cm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(nl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Dm.getNormalMatrix(e),s=this.coplanarPoint(nl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Pm=0;class Es extends ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=Tr,this.side=xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gh,this.blendDst=xh,this.blendEquation=Hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bo,this.stencilZFail=Bo,this.stencilZPass=Bo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new He().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Xi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ei=new P,il=new P,ga=new P,xa=new P;class Jr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,t),Ei.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){il.copy(e).add(t).multiplyScalar(.5),ga.copy(t).sub(e).normalize(),xa.copy(this.origin).sub(il);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ga),o=xa.dot(this.direction),l=-xa.dot(ga),c=xa.lengthSq(),u=Math.abs(1-a*a);let d,f,h,g;if(u>0)if(d=a*l-o,f=a*o-l,g=r*u,d>=0)if(f>=-g)if(f<=g){const M=1/u;d*=M,f*=M,h=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),h=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(il).addScaledVector(ga,f),h}intersectSphere(e,t){if(e.radius<0)return null;Ei.subVectors(e.center,this.origin);const i=Ei.dot(this.direction),s=Ei.dot(Ei)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,f=e.y-a.y,h=e.z-a.z,g=t.x-a.x,M=t.y-a.y,m=t.z-a.z,p=i.x-a.x,_=i.y-a.y,y=i.z-a.z,b=Math.abs(l),R=Math.abs(c),E=Math.abs(u);let x,v,C,A,L,U,k,I,G,$,W,se;if(b>=R&&b>=E?(C=l,U=d,G=g,se=p,l>=0?(x=c,v=u,A=f,L=h,k=M,I=m,$=_,W=y):(x=u,v=c,A=h,L=f,k=m,I=M,$=y,W=_)):R>=E?(C=c,U=f,G=M,se=_,c>=0?(x=u,v=l,A=h,L=d,k=m,I=g,$=y,W=p):(x=l,v=u,A=d,L=h,k=g,I=m,$=p,W=y)):(C=u,U=h,G=m,se=y,u>=0?(x=l,v=c,A=d,L=f,k=g,I=M,$=p,W=_):(x=c,v=l,A=f,L=d,k=M,I=g,$=_,W=p)),C===0)return null;const q=x/C,te=v/C,ie=1/C,we=A-q*U,Be=L-te*U,Q=k-q*G,_e=I-te*G,ye=$-q*se,Le=W-te*se,ve=ye*_e-Le*Q,ke=we*Le-Be*ye,Ut=Q*Be-_e*we;if(s){if(ve<0||ke<0||Ut<0)return null}else if((ve<0||ke<0||Ut<0)&&(ve>0||ke>0||Ut>0))return null;const Ne=ve+ke+Ut;if(Ne===0)return null;const ot=ie*(ve*U+ke*G+Ut*se);return(Ne>0?ot<0:ot>0)?null:this.at(ot/Ne,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gi extends Es{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=_h,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rd=new Ye,os=new Jr,_a=new xi,ad=new P,va=new P,Ma=new P,Sa=new P,sl=new P,ya=new P,od=new P,Ea=new P;class st extends bt{constructor(e=new Tt,t=new gi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ya.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(sl.fromBufferAttribute(d,e),a?ya.addScaledVector(sl,u):ya.addScaledVector(sl.sub(t),u))}t.add(ya)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_a.copy(i.boundingSphere),_a.applyMatrix4(r),os.copy(e.ray).recast(e.near),!(_a.containsPoint(os.origin)===!1&&(os.intersectSphere(_a,ad)===null||os.origin.distanceToSquared(ad)>(e.far-e.near)**2))&&(rd.copy(r).invert(),os.copy(e.ray).applyMatrix4(rd),!(i.boundingBox!==null&&os.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=a[m.materialIndex],_=Math.max(m.start,h.start),y=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let b=_,R=y;b<R;b+=3){const E=o.getX(b),x=o.getX(b+1),v=o.getX(b+2);s=ba(this,p,e,i,c,u,d,E,x,v),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),M=Math.min(o.count,h.start+h.count);for(let m=g,p=M;m<p;m+=3){const _=o.getX(m),y=o.getX(m+1),b=o.getX(m+2);s=ba(this,a,e,i,c,u,d,_,y,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=a[m.materialIndex],_=Math.max(m.start,h.start),y=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let b=_,R=y;b<R;b+=3){const E=b,x=b+1,v=b+2;s=ba(this,p,e,i,c,u,d,E,x,v),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),M=Math.min(l.count,h.start+h.count);for(let m=g,p=M;m<p;m+=3){const _=m,y=m+1,b=m+2;s=ba(this,a,e,i,c,u,d,_,y,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Lm(n,e,t,i,s,r,a,o){let l;if(e.side===yn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===xs,o),l===null)return null;Ea.copy(o),Ea.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ea);return c<t.near||c>t.far?null:{distance:c,point:Ea.clone(),object:n}}function ba(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,va),n.getVertexPosition(l,Ma),n.getVertexPosition(c,Sa);const u=Lm(n,e,t,i,va,Ma,Sa,od);if(u){const d=new P;jn.getBarycoord(od,va,Ma,Sa,d),s&&(u.uv=jn.getInterpolatedAttribute(s,o,l,c,d,new We)),r&&(u.uv1=jn.getInterpolatedAttribute(r,o,l,c,d,new We)),a&&(u.normal=jn.getInterpolatedAttribute(a,o,l,c,d,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new P,materialIndex:0};jn.getNormal(va,Ma,Sa,f.normal),u.face=f,u.barycoord=d}return u}const ur=new dt,ld=new dt,cd=new dt,Im=new dt,ud=new Ye,Ta=new P,rl=new xi,dd=new Ye,al=new Jr;class Nm extends st{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Vu,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ts),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ta),this.boundingBox.expandByPoint(Ta)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ta),this.boundingSphere.expandByPoint(Ta)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rl.copy(this.boundingSphere),rl.applyMatrix4(s),e.ray.intersectsSphere(rl)!==!1&&(dd.copy(s).invert(),al.copy(e.ray).applyMatrix4(dd),!(this.boundingBox!==null&&al.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,al)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new dt,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Vu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Up?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;ld.fromBufferAttribute(s.attributes.skinIndex,e),cd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(ur.copy(t),t.set(0,0,0,0)):(ur.set(t.x,t.y,t.z,1),t.set(0,0,0)),ur.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=cd.getComponent(r);if(a!==0){const o=ld.getComponent(r);ud.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Im.copy(ur).applyMatrix4(ud),a)}}return t.isVector4&&(t.w=ur.w),t.applyMatrix4(this.bindMatrixInverse)}}class ic extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qc extends un{constructor(e=null,t=1,i=1,s,r,a,o,l,c=nn,u=nn,d,f){super(null,a,o,l,c,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hd=new Ye,Um=new Ye;class Yc{constructor(e=[],t=[]){this.uuid=Ui(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Ye;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Um;hd.multiplyMatrices(o,t[r]),hd.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Yc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new qc(t,e,e,ei,Vn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(Pe("Skeleton: No bone found with UUID:",r),a=new ic),this.bones.push(a),this.boneInverses.push(new Ye().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class sc extends In{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Os=new Ye,fd=new Ye,wa=[],pd=new ts,Om=new Ye,dr=new st,hr=new xi;class Pi extends st{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new sc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Om)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ts),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Os),pd.copy(e.boundingBox).applyMatrix4(Os),this.boundingBox.union(pd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Os),hr.copy(e.boundingSphere).applyMatrix4(Os),this.boundingSphere.union(hr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(dr.geometry=this.geometry,dr.material=this.material,dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hr.copy(this.boundingSphere),hr.applyMatrix4(i),e.ray.intersectsSphere(hr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Os),fd.multiplyMatrices(i,Os),dr.matrixWorld=fd,dr.raycast(e,wa);for(let a=0,o=wa.length;a<o;a++){const l=wa[a];l.instanceId=r,l.object=this,t.push(l)}wa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new sc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new qc(new Float32Array(s*this.count),s,this.count,Uc,Vn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ls=new xi,Fm=new We(.5,.5),Aa=new P;class kr{constructor(e=new Xi,t=new Xi,i=new Xi,s=new Xi,r=new Xi,a=new Xi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ti,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],f=r[6],h=r[7],g=r[8],M=r[9],m=r[10],p=r[11],_=r[12],y=r[13],b=r[14],R=r[15];if(s[0].setComponents(c-a,h-u,p-g,R-_).normalize(),s[1].setComponents(c+a,h+u,p+g,R+_).normalize(),s[2].setComponents(c+o,h+d,p+M,R+y).normalize(),s[3].setComponents(c-o,h-d,p-M,R-y).normalize(),i)s[4].setComponents(l,f,m,b).normalize(),s[5].setComponents(c-l,h-f,p-m,R-b).normalize();else if(s[4].setComponents(c-l,h-f,p-m,R-b).normalize(),t===ti)s[5].setComponents(c+l,h+f,p+m,R+b).normalize();else if(t===Br)s[5].setComponents(l,f,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(e){ls.center.set(0,0,0);const t=Fm.distanceTo(e.center);return ls.radius=.7071067811865476+t,ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Aa.x=s.normal.x>0?e.max.x:e.min.x,Aa.y=s.normal.y>0?e.max.y:e.min.y,Aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Aa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const md=new Ye;class $c{constructor(){this.coordinateSystem=ti,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];md.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new kr),i[s].setFromProjectionMatrix(md,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new kr),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new $c().copy(this)}}class Kc extends Es{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ro=new P,ao=new P,gd=new Ye,fr=new Jr,Ra=new xi,ol=new P,xd=new P;class Gh extends bt{constructor(e=new Tt,t=new Kc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ro.fromBufferAttribute(t,s-1),ao.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ro.distanceTo(ao);e.setAttribute("lineDistance",new nt(i,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ra.copy(i.boundingSphere),Ra.applyMatrix4(s),Ra.radius+=r,e.ray.intersectsSphere(Ra)===!1)return;gd.copy(s).invert(),fr.copy(e.ray).applyMatrix4(gd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=h,m=g-1;M<m;M+=c){const p=u.getX(M),_=u.getX(M+1),y=Ca(this,e,fr,l,p,_,M);y&&t.push(y)}if(this.isLineLoop){const M=u.getX(g-1),m=u.getX(h),p=Ca(this,e,fr,l,M,m,g-1);p&&t.push(p)}}else{const h=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let M=h,m=g-1;M<m;M+=c){const p=Ca(this,e,fr,l,M,M+1,M);p&&t.push(p)}if(this.isLineLoop){const M=Ca(this,e,fr,l,g-1,h,g-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ca(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(ro.fromBufferAttribute(o,s),ao.fromBufferAttribute(o,r),t.distanceSqToSegment(ro,ao,ol,xd)>i)return;ol.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ol);if(!(c<e.near||c>e.far))return{distance:c,point:xd.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}class Vh extends Es{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _d=new Ye,rc=new Jr,Da=new xi,Pa=new P;class Bm extends bt{constructor(e=new Tt,t=new Vh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Da.copy(i.boundingSphere),Da.applyMatrix4(s),Da.radius+=r,e.ray.intersectsSphere(Da)===!1)return;_d.copy(s).invert(),rc.copy(e.ray).applyMatrix4(_d);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),h=Math.min(c.count,a.start+a.count);for(let g=f,M=h;g<M;g++){const m=c.getX(g);Pa.fromBufferAttribute(d,m),vd(Pa,m,l,s,e,t,this)}}else{const f=Math.max(0,a.start),h=Math.min(d.count,a.start+a.count);for(let g=f,M=h;g<M;g++)Pa.fromBufferAttribute(d,g),vd(Pa,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function vd(n,e,t,i,s,r,a){const o=rc.distanceSqToPoint(n);if(o<t){const l=new P;rc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Wh extends un{constructor(e=[],t=$s,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ni extends un{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zs extends un{constructor(e,t,i=pi,s,r,a,o=nn,l=nn,c,u=Qi,d=1){if(u!==Qi&&u!==Zi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Xh extends Zs{constructor(e,t=pi,i=$s,s,r,a=nn,o=nn,l,c=Qi){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qh extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rt extends Tt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let f=0,h=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(u,3)),this.setAttribute("uv",new nt(d,2));function g(M,m,p,_,y,b,R,E,x,v,C){const A=b/x,L=R/v,U=b/2,k=R/2,I=E/2,G=x+1,$=v+1;let W=0,se=0;const q=new P;for(let te=0;te<$;te++){const ie=te*L-k;for(let we=0;we<G;we++){const Be=we*A-U;q[M]=Be*_,q[m]=ie*y,q[p]=I,c.push(q.x,q.y,q.z),q[M]=0,q[m]=0,q[p]=E>0?1:-1,u.push(q.x,q.y,q.z),d.push(we/x),d.push(1-te/v),W+=1}}for(let te=0;te<v;te++)for(let ie=0;ie<x;ie++){const we=f+ie+G*te,Be=f+ie+G*(te+1),Q=f+(ie+1)+G*(te+1),_e=f+(ie+1)+G*te;l.push(we,Be,_e),l.push(Be,Q,_e),se+=6}o.addGroup(h,se,C),h+=se,f+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Gt extends Tt{constructor(e=1,t=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:s,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],u=t/2,d=Math.PI/2*e,f=t,h=2*d+f,g=i*2+r,M=s+1,m=new P,p=new P;for(let _=0;_<=g;_++){let y=0,b=0,R=0,E=0;if(_<=i){const C=_/i,A=C*Math.PI/2;b=-u-e*Math.cos(A),R=e*Math.sin(A),E=-e*Math.cos(A),y=C*d}else if(_<=i+r){const C=(_-i)/r;b=-u+C*t,R=e,E=0,y=d+C*f}else{const C=(_-i-r)/i,A=C*Math.PI/2;b=u+e*Math.sin(A),R=e*Math.cos(A),E=e*Math.sin(A),y=d+f+C*d}const x=Math.max(0,Math.min(1,y/h));let v=0;_===0?v=.5/s:_===g&&(v=-.5/s);for(let C=0;C<=s;C++){const A=C/s,L=A*Math.PI*2,U=Math.sin(L),k=Math.cos(L);p.x=-R*k,p.y=b,p.z=R*U,o.push(p.x,p.y,p.z),m.set(-R*k,E,R*U),m.normalize(),l.push(m.x,m.y,m.z),c.push(A+v,x)}if(_>0){const C=(_-1)*M;for(let A=0;A<s;A++){const L=C+A,U=C+A+1,k=_*M+A,I=_*M+A+1;a.push(L,U,k),a.push(U,I,k)}}}this.setIndex(a),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Zc extends Tt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new P,u=new We;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const h=i+d/t*s;c.x=e*Math.cos(h),c.y=e*Math.sin(h),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(o,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class mn extends Tt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],h=[];let g=0;const M=[],m=i/2;let p=0;_(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(f,3)),this.setAttribute("uv",new nt(h,2));function _(){const b=new P,R=new P;let E=0;const x=(t-e)/i;for(let v=0;v<=r;v++){const C=[],A=v/r,L=A*(t-e)+e;for(let U=0;U<=s;U++){const k=U/s,I=k*l+o,G=Math.sin(I),$=Math.cos(I);R.x=L*G,R.y=-A*i+m,R.z=L*$,d.push(R.x,R.y,R.z),b.set(G,x,$).normalize(),f.push(b.x,b.y,b.z),h.push(k,1-A),C.push(g++)}M.push(C)}for(let v=0;v<s;v++)for(let C=0;C<r;C++){const A=M[C][v],L=M[C+1][v],U=M[C+1][v+1],k=M[C][v+1];(e>0||C!==0)&&(u.push(A,L,k),E+=3),(t>0||C!==r-1)&&(u.push(L,U,k),E+=3)}c.addGroup(p,E,0),p+=E}function y(b){const R=g,E=new We,x=new P;let v=0;const C=b===!0?e:t,A=b===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,m*A,0),f.push(0,A,0),h.push(.5,.5),g++;const L=g;for(let U=0;U<=s;U++){const I=U/s*l+o,G=Math.cos(I),$=Math.sin(I);x.x=C*$,x.y=m*A,x.z=C*G,d.push(x.x,x.y,x.z),f.push(0,A,0),E.x=G*.5+.5,E.y=$*.5*A+.5,h.push(E.x,E.y),g++}for(let U=0;U<s;U++){const k=R+U,I=L+U;b===!0?u.push(I,I+1,k):u.push(I+1,I,k),v+=3}c.addGroup(p,v,b===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Jc extends Tt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(r.slice(),3)),this.setAttribute("uv",new nt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const y=new P,b=new P,R=new P;for(let E=0;E<t.length;E+=3)h(t[E+0],y),h(t[E+1],b),h(t[E+2],R),l(y,b,R,_)}function l(_,y,b,R){const E=R+1,x=[];for(let v=0;v<=E;v++){x[v]=[];const C=_.clone().lerp(b,v/E),A=y.clone().lerp(b,v/E),L=E-v;for(let U=0;U<=L;U++)U===0&&v===E?x[v][U]=C:x[v][U]=C.clone().lerp(A,U/L)}for(let v=0;v<E;v++)for(let C=0;C<2*(E-v)-1;C++){const A=Math.floor(C/2);C%2===0?(f(x[v][A+1]),f(x[v+1][A]),f(x[v][A])):(f(x[v][A+1]),f(x[v+1][A+1]),f(x[v+1][A]))}}function c(_){const y=new P;for(let b=0;b<r.length;b+=3)y.x=r[b+0],y.y=r[b+1],y.z=r[b+2],y.normalize().multiplyScalar(_),r[b+0]=y.x,r[b+1]=y.y,r[b+2]=y.z}function u(){const _=new P;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];const b=m(_)/2/Math.PI+.5,R=p(_)/Math.PI+.5;a.push(b,1-R)}g(),d()}function d(){for(let _=0;_<a.length;_+=6){const y=a[_+0],b=a[_+2],R=a[_+4],E=Math.max(y,b,R),x=Math.min(y,b,R);E>.9&&x<.1&&(y<.2&&(a[_+0]+=1),b<.2&&(a[_+2]+=1),R<.2&&(a[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function h(_,y){const b=_*3;y.x=e[b+0],y.y=e[b+1],y.z=e[b+2]}function g(){const _=new P,y=new P,b=new P,R=new P,E=new We,x=new We,v=new We;for(let C=0,A=0;C<r.length;C+=9,A+=6){_.set(r[C+0],r[C+1],r[C+2]),y.set(r[C+3],r[C+4],r[C+5]),b.set(r[C+6],r[C+7],r[C+8]),E.set(a[A+0],a[A+1]),x.set(a[A+2],a[A+3]),v.set(a[A+4],a[A+5]),R.copy(_).add(y).add(b).divideScalar(3);const L=m(R);M(E,A+0,_,L),M(x,A+2,y,L),M(v,A+4,b,L)}}function M(_,y,b,R){R<0&&_.x===1&&(a[y]=_.x-1),b.x===0&&b.z===0&&(a[y]=R/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jc(e.vertices,e.indices,e.radius,e.detail)}}class oo extends Jc{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new oo(e.radius,e.detail)}}class Nn extends Tt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,f=t/l,h=[],g=[],M=[],m=[];for(let p=0;p<u;p++){const _=p*f-a;for(let y=0;y<c;y++){const b=y*d-r;g.push(b,-_,0),M.push(0,0,1),m.push(y/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){const y=_+c*p,b=_+c*(p+1),R=_+1+c*(p+1),E=_+1+c*p;h.push(y,b,E),h.push(b,R,E)}this.setIndex(h),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(M,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Qr extends Tt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let d=e;const f=(t-e)/s,h=new P,g=new We;for(let M=0;M<=s;M++){for(let m=0;m<=i;m++){const p=r+m/i*a;h.x=d*Math.cos(p),h.y=d*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),g.x=(h.x/t+1)/2,g.y=(h.y/t+1)/2,u.push(g.x,g.y)}d+=f}for(let M=0;M<s;M++){const m=M*(i+1);for(let p=0;p<i;p++){const _=p+m,y=_,b=_+i+1,R=_+i+2,E=_+1;o.push(y,b,E),o.push(b,R,E)}}this.setIndex(o),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(c,3)),this.setAttribute("uv",new nt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class At extends Tt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new P,f=new P,h=[],g=[],M=[],m=[];for(let p=0;p<=i;p++){const _=[],y=p/i,b=a+y*o,R=e*Math.cos(b),E=Math.sqrt(e*e-R*R);let x=0;p===0&&a===0?x=.5/t:p===i&&l===Math.PI&&(x=-.5/t);for(let v=0;v<=t;v++){const C=v/t,A=s+C*r;d.x=-E*Math.cos(A),d.y=R,d.z=E*Math.sin(A),g.push(d.x,d.y,d.z),f.copy(d).normalize(),M.push(f.x,f.y,f.z),m.push(C+x,1-y),_.push(c++)}u.push(_)}for(let p=0;p<i;p++)for(let _=0;_<t;_++){const y=u[p][_+1],b=u[p][_],R=u[p+1][_],E=u[p+1][_+1];(p!==0||a>0)&&h.push(y,b,E),(p!==i-1||l<Math.PI)&&h.push(b,R,E)}this.setIndex(h),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(M,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new At(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Js extends Tt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],u=[],d=[],f=new P,h=new P,g=new P;for(let M=0;M<=i;M++){const m=a+M/i*o;for(let p=0;p<=s;p++){const _=p/s*r;h.x=(e+t*Math.cos(m))*Math.cos(_),h.y=(e+t*Math.cos(m))*Math.sin(_),h.z=t*Math.sin(m),c.push(h.x,h.y,h.z),f.x=e*Math.cos(_),f.y=e*Math.sin(_),g.subVectors(h,f).normalize(),u.push(g.x,g.y,g.z),d.push(p/s),d.push(M/i)}}for(let M=1;M<=i;M++)for(let m=1;m<=s;m++){const p=(s+1)*M+m-1,_=(s+1)*(M-1)+m-1,y=(s+1)*(M-1)+m,b=(s+1)*M+m;l.push(p,_,b),l.push(_,y,b)}this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(u,3)),this.setAttribute("uv",new nt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Qs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Md(s))s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Md(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function pn(n){const e={};for(let t=0;t<n.length;t++){const i=Qs(n[t]);for(const s in i)e[s]=i[s]}return e}function Md(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function zm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Yh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const km={clone:Qs,merge:pn};var Hm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vs extends Es{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hm,this.fragmentShader=Gm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qs(e.uniforms),this.uniformsGroups=zm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new He().setHex(s.value);break;case"v2":this.uniforms[i].value=new We().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new dt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Fe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ye().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Vm extends vs{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class yt extends Es{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nc,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wm extends Es{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xm extends Es{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Sd={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(yd(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!yd(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function yd(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class qm{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],g=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ym=new qm;class Qc{constructor(e){this.manager=e!==void 0?e:Ym,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}}Qc.DEFAULT_MATERIAL_NAME="__DEFAULT";const bi={};class $m extends Error{constructor(e,t){super(e),this.response=t}}class Km extends Qc{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Sd.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(bi[e]!==void 0){bi[e].push({onLoad:t,onProgress:i,onError:s});return}bi[e]=[],bi[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=bi[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,g=h!==0;let M=0;const m=new ReadableStream({start(p){_();function _(){d.read().then(({done:y,value:b})=>{if(y)p.close();else{M+=b.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:M,total:h});for(let E=0,x=u.length;E<x;E++){const v=u[E];v.onProgress&&v.onProgress(R)}p.enqueue(b),_()}},y=>{p.error(y)})}}});return new Response(m)}else throw new $m(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(g=>h.decode(g))}}}).then(c=>{Sd.add(`file:${e}`,c);const u=bi[e];delete bi[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=bi[e];if(u===void 0)throw this.manager.itemError(e),c;delete bi[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class $h extends bt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Zm extends $h{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ll=new Ye,Ed=new P,bd=new P;class Jm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kr,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Ed.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ed),bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){ll.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(ll,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Br||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ll)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const La=new P,Ia=new Tn,ai=new P;class Kh extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(La,Ia,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(La,Ia,ai.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(La,Ia,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(La,Ia,ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new P,Td=new We,wd=new We;class Qn extends Kh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z)}getViewSize(e,t){return this.getViewBounds(e,Td,wd),t.subVectors(wd,Td)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(wr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class jc extends Kh{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Qm extends Jm{constructor(){super(new jc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zh extends $h{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Qm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class jm extends Tt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class JS extends Qc{constructor(e){super(e)}load(e,t,i,s){const r=this,a=new Km(r.manager);a.setPriority(r.priority),a.setCache(r.cache),a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){s?s(l):rt(l),r.manager.itemError(e)}},i,s)}parse(e){const t={},i={};function s(h,g){if(t[g]!==void 0)return t[g];const m=h.interleavedBuffers[g],p=r(h,m.buffer),_=la(m.type,p),y=new Rm(_,m.stride);return y.uuid=m.uuid,m.usage!==void 0&&y.setUsage(m.usage),t[g]=y,y}function r(h,g){if(i[g]!==void 0)return i[g];const m=h.arrayBuffers[g],p=new Uint32Array(m).buffer;return i[g]=p,p}const a=e.isInstancedBufferGeometry?new jm:new Tt,o=e.data.index;if(o!==void 0){const h=la(o.type,o.array);a.setIndex(new In(h,1))}const l=e.data.attributes;for(const h in l){const g=l[h];let M;if(g.isInterleavedBufferAttribute){const m=s(e.data,g.data);M=new so(m,g.itemSize,g.offset,g.normalized)}else{const m=la(g.type,g.array),p=g.isInstancedBufferAttribute?sc:In;M=new p(m,g.itemSize,g.normalized)}g.name!==void 0&&(M.name=g.name),g.usage!==void 0&&M.setUsage(g.usage),g.gpuType!==void 0&&(M.gpuType=g.gpuType),a.setAttribute(h,M)}const c=e.data.morphAttributes;if(c)for(const h in c){const g=c[h],M=[];for(let m=0,p=g.length;m<p;m++){const _=g[m];let y;if(_.isInterleavedBufferAttribute){const b=s(e.data,_.data);y=new so(b,_.itemSize,_.offset,_.normalized)}else{const b=la(_.type,_.array);y=new In(b,_.itemSize,_.normalized)}_.name!==void 0&&(y.name=_.name),_.usage!==void 0&&y.setUsage(_.usage),_.gpuType!==void 0&&(y.gpuType=_.gpuType),M.push(y)}a.morphAttributes[h]=M}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);const d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let h=0,g=d.length;h!==g;++h){const M=d[h];a.addGroup(M.start,M.count,M.materialIndex)}const f=e.data.boundingSphere;return f!==void 0&&(a.boundingSphere=new xi().fromJSON(f)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}}const Fs=-90,Bs=1;class ac extends bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Qn(Fs,Bs,e,t);s.layers=this.layers,this.add(s);const r=new Qn(Fs,Bs,e,t);r.layers=this.layers,this.add(r);const a=new Qn(Fs,Bs,e,t);a.layers=this.layers,this.add(a);const o=new Qn(Fs,Bs,e,t);o.layers=this.layers,this.add(o);const l=new Qn(Fs,Bs,e,t);l.layers=this.layers,this.add(l);const c=new Qn(Fs,Bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===ti)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Br)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.mipmapsAutoUpdate=M,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class e0 extends Qn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function Ad(n,e,t,i){const s=t0(i);switch(t){case Dh:return n*e;case Uc:return n*e/s.components*s.byteLength;case Oc:return n*e/s.components*s.byteLength;case _s:return n*e*2/s.components*s.byteLength;case Fc:return n*e*2/s.components*s.byteLength;case Ph:return n*e*3/s.components*s.byteLength;case ei:return n*e*4/s.components*s.byteLength;case Bc:return n*e*4/s.components*s.byteLength;case za:case ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ha:case Ga:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Al:case Cl:return Math.max(n,16)*Math.max(e,8)/4;case wl:case Rl:return Math.max(n,8)*Math.max(e,8)/2;case Dl:case Pl:case Il:case Nl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ll:case Qa:case Ul:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Bl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case zl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case kl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Gl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Vl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Wl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Xl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ql:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Yl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case $l:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Kl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Zl:case Jl:case Ql:return Math.ceil(n/4)*Math.ceil(e/4)*16;case jl:case ec:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ja:case tc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function t0(n){switch(n){case Ln:case wh:return{byteLength:1,components:1};case Fr:case Ah:case mi:return{byteLength:2,components:1};case Ic:case Nc:return{byteLength:2,components:4};case pi:case Lc:case Vn:return{byteLength:4,components:1};case Rh:case Ch:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dc}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dc);function Jh(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function n0(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){const g=d[f],M=d[h];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++f,d[f]=M)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){const M=d[h];n.bufferSubData(c,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var i0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,r0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,l0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,u0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,d0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,h0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,m0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,g0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,x0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,E0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,b0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,T0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,w0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,A0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,R0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,P0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,L0="gl_FragColor = linearToOutputTexel( gl_FragColor );",I0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,N0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,O0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,F0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,B0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,k0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,H0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,V0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,W0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,X0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,q0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Y0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,$0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,K0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Z0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,J0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Q0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,j0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,eg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ng=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ig=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sg=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ag=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ug=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gg=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_g=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Tg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Lg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ig=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ng=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ug=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Og=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,zg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ix=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rx=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ux=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,px=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Sx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ex=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ax=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Px=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ix=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ux=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:i0,alphahash_pars_fragment:s0,alphamap_fragment:r0,alphamap_pars_fragment:a0,alphatest_fragment:o0,alphatest_pars_fragment:l0,aomap_fragment:c0,aomap_pars_fragment:u0,batching_pars_vertex:d0,batching_vertex:h0,begin_vertex:f0,beginnormal_vertex:p0,bsdfs:m0,iridescence_fragment:g0,bumpmap_pars_fragment:x0,clipping_planes_fragment:_0,clipping_planes_pars_fragment:v0,clipping_planes_pars_vertex:M0,clipping_planes_vertex:S0,color_fragment:y0,color_pars_fragment:E0,color_pars_vertex:b0,color_vertex:T0,common:w0,defaultnormal_vertex:A0,displacementmap_pars_vertex:R0,displacementmap_vertex:C0,emissivemap_fragment:D0,emissivemap_pars_fragment:P0,colorspace_fragment:L0,colorspace_pars_fragment:I0,envmap_fragment:N0,envmap_common_pars_fragment:U0,envmap_pars_fragment:O0,envmap_pars_vertex:F0,envmap_physical_pars_fragment:$0,envmap_vertex:B0,fog_vertex:z0,fog_pars_vertex:k0,fog_fragment:H0,fog_pars_fragment:G0,gradientmap_pars_fragment:V0,lightmap_pars_fragment:W0,lights_lambert_fragment:X0,lights_lambert_pars_fragment:q0,lights_pars_begin:Y0,lights_toon_fragment:K0,lights_toon_pars_fragment:Z0,lights_phong_fragment:J0,lights_phong_pars_fragment:Q0,lights_physical_fragment:j0,lights_physical_pars_fragment:eg,lights_fragment_begin:tg,lights_fragment_maps:ng,lights_fragment_end:ig,lightprobes_pars_fragment:sg,logdepthbuf_fragment:rg,logdepthbuf_pars_fragment:ag,logdepthbuf_pars_vertex:og,logdepthbuf_vertex:lg,map_fragment:cg,map_pars_fragment:ug,map_particle_fragment:dg,map_particle_pars_fragment:hg,metalnessmap_fragment:fg,metalnessmap_pars_fragment:pg,morphinstance_vertex:mg,morphcolor_vertex:gg,morphnormal_vertex:xg,morphtarget_pars_vertex:_g,morphtarget_vertex:vg,normal_fragment_begin:Mg,normal_fragment_maps:Sg,normal_pars_fragment:yg,normal_pars_vertex:Eg,normal_vertex:bg,normalmap_pars_fragment:Tg,clearcoat_normal_fragment_begin:wg,clearcoat_normal_fragment_maps:Ag,clearcoat_pars_fragment:Rg,iridescence_pars_fragment:Cg,opaque_fragment:Dg,packing:Pg,premultiplied_alpha_fragment:Lg,project_vertex:Ig,dithering_fragment:Ng,dithering_pars_fragment:Ug,roughnessmap_fragment:Og,roughnessmap_pars_fragment:Fg,shadowmap_pars_fragment:Bg,shadowmap_pars_vertex:zg,shadowmap_vertex:kg,shadowmask_pars_fragment:Hg,skinbase_vertex:Gg,skinning_pars_vertex:Vg,skinning_vertex:Wg,skinnormal_vertex:Xg,specularmap_fragment:qg,specularmap_pars_fragment:Yg,tonemapping_fragment:$g,tonemapping_pars_fragment:Kg,transmission_fragment:Zg,transmission_pars_fragment:Jg,uv_pars_fragment:Qg,uv_pars_vertex:jg,uv_vertex:ex,worldpos_vertex:tx,background_vert:nx,background_frag:ix,backgroundCube_vert:sx,backgroundCube_frag:rx,cube_vert:ax,cube_frag:ox,depth_vert:lx,depth_frag:cx,distance_vert:ux,distance_frag:dx,equirect_vert:hx,equirect_frag:fx,linedashed_vert:px,linedashed_frag:mx,meshbasic_vert:gx,meshbasic_frag:xx,meshlambert_vert:_x,meshlambert_frag:vx,meshmatcap_vert:Mx,meshmatcap_frag:Sx,meshnormal_vert:yx,meshnormal_frag:Ex,meshphong_vert:bx,meshphong_frag:Tx,meshphysical_vert:wx,meshphysical_frag:Ax,meshtoon_vert:Rx,meshtoon_frag:Cx,points_vert:Dx,points_frag:Px,shadow_vert:Lx,shadow_frag:Ix,sprite_vert:Nx,sprite_frag:Ux},xe={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},ci={basic:{uniforms:pn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:pn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new He(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:pn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:pn([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:pn([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new He(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:pn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:pn([xe.points,xe.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:pn([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:pn([xe.common,xe.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:pn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:pn([xe.sprite,xe.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:pn([xe.common,xe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:pn([xe.lights,xe.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};ci.physical={uniforms:pn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Fe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Na={r:0,b:0,g:0},Ox=new Ye,Qh=new Fe;Qh.set(-1,0,0,0,1,0,0,0,1);function Fx(n,e,t,i,s,r){const a=new He(0);let o=s===!0?0:1,l,c,u=null,d=0,f=null;function h(_){let y=_.isScene===!0?_.background:null;if(y&&y.isTexture){const b=_.backgroundBlurriness>0;y=e.get(y,b)}return y}function g(_){let y=!1;const b=h(_);b===null?m(a,o):b&&b.isColor&&(m(b,1),y=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(_,y){const b=h(y);b&&b.isCubeTexture?(c===void 0&&(c=new st(new Rt(1,1,1),new vs({name:"BackgroundCubeMaterial",uniforms:Qs(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,E,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ox.makeRotationFromEuler(y.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Qh),c.material.toneMapped=et.getTransfer(b.colorSpace)!==ct,(u!==b||d!==b.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,f=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new st(new Nn(2,2),new vs({name:"BackgroundMaterial",uniforms:Qs(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=et.getTransfer(b.colorSpace)!==ct,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,f=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,y){_.getRGB(Na,Yh(n)),t.buffers.color.setClear(Na.r,Na.g,Na.b,y,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),o=y,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:g,addToRenderList:M,dispose:p}}function Bx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(L,U,k,I,G){let $=!1;const W=d(L,I,k,U);r!==W&&(r=W,c(r.object)),$=h(L,I,k,G),$&&g(L,I,k,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,b(L,U,k,I),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(L){return n.bindVertexArray(L)}function u(L){return n.deleteVertexArray(L)}function d(L,U,k,I){const G=I.wireframe===!0;let $=i[U.id];$===void 0&&($={},i[U.id]=$);const W=L.isInstancedMesh===!0?L.id:0;let se=$[W];se===void 0&&(se={},$[W]=se);let q=se[k.id];q===void 0&&(q={},se[k.id]=q);let te=q[G];return te===void 0&&(te=f(l()),q[G]=te),te}function f(L){const U=[],k=[],I=[];for(let G=0;G<t;G++)U[G]=0,k[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:I,object:L,attributes:{},index:null}}function h(L,U,k,I){const G=r.attributes,$=U.attributes;let W=0;const se=k.getAttributes();for(const q in se)if(se[q].location>=0){const ie=G[q];let we=$[q];if(we===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(we=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(we=L.instanceColor)),ie===void 0||ie.attribute!==we||we&&ie.data!==we.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function g(L,U,k,I){const G={},$=U.attributes;let W=0;const se=k.getAttributes();for(const q in se)if(se[q].location>=0){let ie=$[q];ie===void 0&&(q==="instanceMatrix"&&L.instanceMatrix&&(ie=L.instanceMatrix),q==="instanceColor"&&L.instanceColor&&(ie=L.instanceColor));const we={};we.attribute=ie,ie&&ie.data&&(we.data=ie.data),G[q]=we,W++}r.attributes=G,r.attributesNum=W,r.index=I}function M(){const L=r.newAttributes;for(let U=0,k=L.length;U<k;U++)L[U]=0}function m(L){p(L,0)}function p(L,U){const k=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;k[L]=1,I[L]===0&&(n.enableVertexAttribArray(L),I[L]=1),G[L]!==U&&(n.vertexAttribDivisor(L,U),G[L]=U)}function _(){const L=r.newAttributes,U=r.enabledAttributes;for(let k=0,I=U.length;k<I;k++)U[k]!==L[k]&&(n.disableVertexAttribArray(k),U[k]=0)}function y(L,U,k,I,G,$,W){W===!0?n.vertexAttribIPointer(L,U,k,G,$):n.vertexAttribPointer(L,U,k,I,G,$)}function b(L,U,k,I){M();const G=I.attributes,$=k.getAttributes(),W=U.defaultAttributeValues;for(const se in $){const q=$[se];if(q.location>=0){let te=G[se];if(te===void 0&&(se==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),se==="instanceColor"&&L.instanceColor&&(te=L.instanceColor)),te!==void 0){const ie=te.normalized,we=te.itemSize,Be=e.get(te);if(Be===void 0)continue;const Q=Be.buffer,_e=Be.type,ye=Be.bytesPerElement,Le=_e===n.INT||_e===n.UNSIGNED_INT||te.gpuType===Lc;if(te.isInterleavedBufferAttribute){const ve=te.data,ke=ve.isInterleavedBuffer===!0?ve.stride:ve.itemSize,Ut=te.offset;if(ve.isInstancedInterleavedBuffer||ve.isInstancedBufferAttribute){for(let Ne=0;Ne<q.locationSize;Ne++)p(q.location+Ne,ve.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Ne=0;Ne<q.locationSize;Ne++)m(q.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,Q);for(let Ne=0;Ne<q.locationSize;Ne++)y(q.location+Ne,we/q.locationSize,_e,ie,ke*ye,(Ut+we/q.locationSize*Ne)*ye,Le)}else{if(te.isInstancedBufferAttribute){for(let ve=0;ve<q.locationSize;ve++)p(q.location+ve,te.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ve=0;ve<q.locationSize;ve++)m(q.location+ve);n.bindBuffer(n.ARRAY_BUFFER,Q);for(let ve=0;ve<q.locationSize;ve++)y(q.location+ve,we/q.locationSize,_e,ie,we*ye,we/q.locationSize*ve*ye,Le)}}else if(W!==void 0){const ie=W[se];if(ie!==void 0)switch(ie.length){case 2:n.vertexAttrib2fv(q.location,ie);break;case 3:n.vertexAttrib3fv(q.location,ie);break;case 4:n.vertexAttrib4fv(q.location,ie);break;default:n.vertexAttrib1fv(q.location,ie)}}}}_()}function R(){C();for(const L in i){const U=i[L];for(const k in U){const I=U[k];for(const G in I){const $=I[G];for(const W in $)u($[W].object),delete $[W];delete I[G]}}delete i[L]}}function E(L){if(i[L.id]===void 0)return;const U=i[L.id];for(const k in U){const I=U[k];for(const G in I){const $=I[G];for(const W in $)u($[W].object),delete $[W];delete I[G]}}delete i[L.id]}function x(L){for(const U in i){const k=i[U];for(const I in k){const G=k[I];if(G[L.id]===void 0)continue;const $=G[L.id];for(const W in $)u($[W].object),delete $[W];delete G[L.id]}}}function v(L){for(const U in i){const k=i[U],I=L.isInstancedMesh===!0?L.id:0,G=k[I];if(G!==void 0){for(const $ in G){const W=G[$];for(const se in W)u(W[se].object),delete W[se];delete G[$]}delete k[I],Object.keys(k).length===0&&delete i[U]}}}function C(){A(),a=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:A,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:x,initAttributes:M,enableAttribute:m,disableUnusedAttributes:_}}function zx(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let h=0;h<u;h++)f+=c[h];t.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function kx(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const x=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==ei&&i.convert(x)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){const v=x===mi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==Ln&&x!==Vn&&!v&&i.convert(x)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Pe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&Pe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:b,maxSamples:R,samples:E}}function Hx(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Xi,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||i!==0||s;return s=f,i=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const _=r?0:i,y=_*4;let b=p.clippingState||null;l.value=b,b=u(g,f,y,h);for(let R=0;R!==y;++R)b[R]=t[R];p.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const p=h+M*4,_=f.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,b=h;y!==M;++y,b+=4)a.copy(d[y]).applyMatrix4(_,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}class eu extends di{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Wh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Rt(5,5,5),r=new vs({name:"CubemapFromEquirect",uniforms:Qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:yn,blending:Xs});r.uniforms.tEquirect.value=t;const a=new st(s,r),o=t.minFilter;return t.minFilter===Ki&&(t.minFilter=Sn),new ac(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const Rd=256,Gx=3,Vx=20,jh=256,ef=16,Wx=3,Xx=new P,qx=new He;class lo{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ac(1,10,null),this._boxMesh=new st(new Rt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Xx}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);const d=l.autoClear,f=l.autoClearColor,h=l.autoClearDepth,g=l.autoClearStencil,M=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,M===null&&(e.background=l.getClearColor(qx));const m=new ac(i,s,u);return m.position.copy(o),m.update(l,e),l.autoClear=d,l.autoClearColor=f,l.autoClearDepth=h,l.autoClearStencil=g,e.background=M,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Rd,Fh(e))}_fromTexture(e,t){e.mapping===$s||e.mapping===Or?this._setSize(e.image.length===0?Rd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,t=Cd(e,!1,!1),i=Math.log2(e)-Gx;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Cd(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){const s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===$s||e.mapping===Or?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pd()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Dd()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Yx(),this._integrationMaterial=$x());const t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/ef);for(let a=0;a<=i;a++){const o=lo.lodToRoughness(a,i);if(a>i-Wx)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(jh*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Kx());const i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}}function Cd(n,e,t){return new eu(n,{minFilter:Ki,generateMipmaps:e,type:mi,colorSpace:eo,depthBuffer:t})}function jr(n,e,t){return new vs({name:n,uniforms:e,vertexShader:qe.cube_vert,fragmentShader:t,side:yn,blending:Xs,depthTest:!1,depthWrite:!1})}function Yx(){return jr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${jh}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function $x(){return jr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:ef}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Kx(){return jr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Vx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Dd(){return jr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Pd(){return jr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Zx(n){let e=new WeakMap,t=new WeakMap,i=null;function s(f,h=!1){return f==null?null:h?a(f):r(f)}function r(f){if(f&&f.isTexture){const h=f.mapping;if(h===Uo||h===Oo)if(e.has(f)){const g=e.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const M=new eu(g.height);return M.fromEquirectangularTexture(n,f),e.set(f,M),f.addEventListener("dispose",c),o(M.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){const h=f.mapping,g=h===Uo||h===Oo,M=h===$s||h===Or;if(g||M){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return i===null&&(i=new lo(n)),m=g?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const _=f.image;return g&&_&&_.height>0||M&&_&&l(_)?(i===null&&(i=new lo(n)),m=g?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,h){return h===Uo?f.mapping=$s:h===Oo&&(f.mapping=Or),f}function l(f){let h=0;const g=6;for(let M=0;M<g;M++)f[M]!==void 0&&h++;return h===g}function c(f){const h=f.target;h.removeEventListener("dispose",c);const g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){const h=f.target;h.removeEventListener("dispose",u);const g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Jx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Va("WebGLRenderer: "+i+" extension not supported."),s}}}function Qx(n,e,t,i){const s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(const m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);const M=r.get(g);M&&(e.remove(M),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,M){return s[M.id]!==void 0||(M.addEventListener("dispose",o),s[M.id]=new WeakRef(M),a.register(M,M.id,M),t.memory.geometries++),M}function u(g){const M=g.attributes;for(const m in M)e.update(M[m],n.ARRAY_BUFFER)}function d(g){const M=g.index,m=g.attributes.position;let p=0;if(m===void 0)return;const _=M!==null?M.array.length:m.array.length/3-1,y=m.count>=65535?Hh:Xc,b=new y(Math.ceil(_/3)*6,1),R=b.array;if(M!==null){const x=M.array;p=M.version;for(let v=0,C=0;v<_;v+=3){const A=x[v+0],L=x[v+1],U=x[v+2];R[C++]=A,R[C++]=L,R[C++]=L,R[C++]=U,R[C++]=U,R[C++]=A}}else{p=m.version;for(let x=0,v=0;x<_;x+=3){const C=x+0,A=x+1,L=x+2;R[v++]=C,R[v++]=A,R[v++]=A,R[v++]=L,R[v++]=L,R[v++]=C}}b.version=p;const E=r.get(g);E&&e.remove(E),r.set(g,b)}function f(g){const M=r.get(g);if(M){const m=g.index;m!==null&&M.version<m.version&&d(g)}else d(g);return r.get(g)}function h(){for(const g in s){const M=s[g].deref();M!==void 0&&l(M)}}return{get:c,update:u,getWireframeAttribute:f,dispose:h}}function jx(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){n.drawElements(i,f,r,d*a),t.update(f,i,1)}function c(d,f,h){h!==0&&(n.drawElementsInstanced(i,f,r,d*a,h),t.update(f,i,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,h);let M=0;for(let m=0;m<h;m++)M+=f[m];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function e_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function t_(n,e,t){const i=new WeakMap,s=new dt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let C=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",C)};f!==void 0&&f.texture.dispose();const h=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let y=0;h===!0&&(y=1),g===!0&&(y=2),M===!0&&(y=3);let b=o.attributes.position.count*y,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const E=new Float32Array(b*R*4*d),x=new Bh(E,b,R,d);x.type=Vn,x.needsUpdate=!0;const v=y*4;for(let A=0;A<d;A++){const L=m[A],U=p[A],k=_[A],I=b*R*4*A;for(let G=0;G<L.count;G++){const $=G*v;h===!0&&(s.fromBufferAttribute(L,G),E[I+$+0]=s.x,E[I+$+1]=s.y,E[I+$+2]=s.z,E[I+$+3]=0),g===!0&&(s.fromBufferAttribute(U,G),E[I+$+4]=s.x,E[I+$+5]=s.y,E[I+$+6]=s.z,E[I+$+7]=0),M===!0&&(s.fromBufferAttribute(k,G),E[I+$+8]=s.x,E[I+$+9]=s.y,E[I+$+10]=s.z,E[I+$+11]=k.itemSize===4?s.w:1)}}f={count:d,texture:x,size:new We(b,R)},i.set(o,f),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let h=0;for(let M=0;M<c.length;M++)h+=c[M];const g=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function n_(n,e,t,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,d=c.geometry,f=e.get(c,d);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const i_={[vh]:"LINEAR_TONE_MAPPING",[Mh]:"REINHARD_TONE_MAPPING",[Sh]:"CINEON_TONE_MAPPING",[Pc]:"ACES_FILMIC_TONE_MAPPING",[Eh]:"AGX_TONE_MAPPING",[bh]:"NEUTRAL_TONE_MAPPING",[yh]:"CUSTOM_TONE_MAPPING"};function s_(n,e,t,i,s,r){const a=new di(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const u=new Tt;u.setAttribute("position",new nt([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new nt([0,2,0,0,2,0],2));const d=new Vm({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new st(u,d),h=new jc(-1,1,1,-1,0,1);let g=null,M=null,m=!1,p,_=null,y=[],b=!1;this.setSize=function(R,E){a.setSize(R,E),o!==null&&o.setSize(R,E),l!==null&&l.setSize(R,E);for(let x=0;x<y.length;x++){const v=y[x];v.setSize&&v.setSize(R,E)}},this.setEffects=function(R){y=R,b=y.length>0&&y[0].isRenderPass===!0;const E=a.width,x=a.height;y.length>0&&o===null&&(o=new di(E,x,{type:mi,depthBuffer:!1,stencilBuffer:!1}),l=new di(E,x,{type:mi,depthBuffer:!1,stencilBuffer:!1}));const v=s===!0&&y.some(C=>C.needsDepthTexture===!0);v!==(a.depthTexture!==null)&&(v===!0&&c===null&&(c=new Zs(E,x),r===!0&&(c.format=Zi,c.type=Ks)),a.dispose(),a.depthTexture=v?c:null,a.resolveDepthBuffer=v,a.storeMultisampledDepthBuffer=v);for(let C=0;C<y.length;C++){const A=y[C];A.setSize&&A.setSize(E,x),v&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(R,E){if(m||R.toneMapping===Ci&&y.length===0)return!1;if(_=E,E!==null){const x=E.width,v=E.height;(a.width!==x||a.height!==v)&&this.setSize(x,v)}return b===!1&&R.setRenderTarget(a),p=R.toneMapping,R.toneMapping=Ci,!0},this.hasRenderPass=function(){return b},this.end=function(R,E){R.toneMapping=p,m=!0;let x=a,v=o;for(let C=0;C<y.length;C++){const A=y[C];A.enabled!==!1&&(A.render(R,v,x,E),A.needsSwap!==!1&&(x=v,v=v===o?l:o))}if(g!==R.outputColorSpace||M!==R.toneMapping){g=R.outputColorSpace,M=R.toneMapping,d.defines={},et.getTransfer(g)===ct&&(d.defines.SRGB_TRANSFER="");const C=i_[M];C&&(d.defines[C]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=x.texture,R.setRenderTarget(_),R.render(f,h),_=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),d.dispose()}}const tf=new un,nf=new Zs(1,1),sf=new Xh(1),rf=new Bh,af=new gm,of=new Wh,Ld=[],Id=[],Nd=new Float32Array(16),Ud=new Float32Array(9),Od=new Float32Array(4);function nr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ld[s];if(r===void 0&&(r=new Float32Array(s),Ld[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function qt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function yo(n,e){let t=Id[e];t===void 0&&(t=new Int32Array(e),Id[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function r_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function a_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),qt(t,e)}}function o_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),qt(t,e)}}function l_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),qt(t,e)}}function c_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Od.set(i),n.uniformMatrix2fv(this.addr,!1,Od),qt(t,i)}}function u_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Ud.set(i),n.uniformMatrix3fv(this.addr,!1,Ud),qt(t,i)}}function d_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;Nd.set(i),n.uniformMatrix4fv(this.addr,!1,Nd),qt(t,i)}}function h_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function f_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),qt(t,e)}}function p_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),qt(t,e)}}function m_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),qt(t,e)}}function g_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function x_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),qt(t,e)}}function __(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),qt(t,e)}}function v_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),qt(t,e)}}function Eo(n){return n.version===0&&(n.compareFunction=Nh,n.needsUpdate=!0),n}function M_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=Eo(nf):r=tf,t.setTexture2D(e||r,s)}function S_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||af,s)}function y_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=Eo(sf):r=of,t.setTextureCube(e||r,s)}function E_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||rf,s)}function b_(n){switch(n){case 5126:return r_;case 35664:return a_;case 35665:return o_;case 35666:return l_;case 35674:return c_;case 35675:return u_;case 35676:return d_;case 5124:case 35670:return h_;case 35667:case 35671:return f_;case 35668:case 35672:return p_;case 35669:case 35673:return m_;case 5125:return g_;case 36294:return x_;case 36295:return __;case 36296:return v_;case 35678:case 36198:case 36298:case 36306:case 35682:return M_;case 35679:case 36299:case 36307:return S_;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return E_}}function T_(n,e){n.uniform1fv(this.addr,e)}function w_(n,e){const t=nr(e,this.size,2);n.uniform2fv(this.addr,t)}function A_(n,e){const t=nr(e,this.size,3);n.uniform3fv(this.addr,t)}function R_(n,e){const t=nr(e,this.size,4);n.uniform4fv(this.addr,t)}function C_(n,e){const t=nr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function D_(n,e){const t=nr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function P_(n,e){const t=nr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function L_(n,e){n.uniform1iv(this.addr,e)}function I_(n,e){n.uniform2iv(this.addr,e)}function N_(n,e){n.uniform3iv(this.addr,e)}function U_(n,e){n.uniform4iv(this.addr,e)}function O_(n,e){n.uniform1uiv(this.addr,e)}function F_(n,e){n.uniform2uiv(this.addr,e)}function B_(n,e){n.uniform3uiv(this.addr,e)}function z_(n,e){n.uniform4uiv(this.addr,e)}function k_(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Eo(nf):a=tf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function H_(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||af,r[a])}function G_(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=Eo(sf):a=of;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function V_(n,e,t){const i=this.cache,s=e.length,r=yo(t,s);Xt(i,r)||(n.uniform1iv(this.addr,r),qt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||rf,r[a])}function W_(n){switch(n){case 5126:return T_;case 35664:return w_;case 35665:return A_;case 35666:return R_;case 35674:return C_;case 35675:return D_;case 35676:return P_;case 5124:case 35670:return L_;case 35667:case 35671:return I_;case 35668:case 35672:return N_;case 35669:case 35673:return U_;case 5125:return O_;case 36294:return F_;case 36295:return B_;case 36296:return z_;case 35678:case 36198:case 36298:case 36306:case 35682:return k_;case 35679:case 36299:case 36307:return H_;case 35680:case 36300:case 36308:case 36293:return G_;case 36289:case 36303:case 36311:case 36292:return V_}}class X_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=b_(t.type)}}class q_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=W_(t.type)}}class Y_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const cl=/(\w+)(\])?(\[|\.)?/g;function Fd(n,e){n.seq.push(e),n.map[e.id]=e}function $_(n,e,t){const i=n.name,s=i.length;for(cl.lastIndex=0;;){const r=cl.exec(i),a=cl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Fd(t,c===void 0?new X_(o,n,e):new q_(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Y_(o),Fd(t,d)),t=d}}}class Wa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);$_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Bd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const K_=37297;let Z_=0;function J_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const zd=new Fe;function Q_(n){et._getMatrix(zd,et.workingColorSpace,n);const e=`mat3( ${zd.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case to:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function kd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+J_(n.getShaderSource(e),o)}else return r}function j_(n,e){const t=Q_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const ev={[vh]:"Linear",[Mh]:"Reinhard",[Sh]:"Cineon",[Pc]:"ACESFilmic",[Eh]:"AgX",[bh]:"Neutral",[yh]:"Custom"};function tv(n,e){const t=ev[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ua=new P;function nv(){et.getLuminanceCoefficients(Ua);const n=Ua.x.toFixed(4),e=Ua.y.toFixed(4),t=Ua.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function iv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sr).join(`
`)}function sv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function rv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Sr(n){return n!==""}function Hd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Gd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const av=/^[ \t]*#include +<([\w\d./]+)>/gm;function oc(n){return n.replace(av,ov)}function ov(n,e){const t=qe[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return oc(t)}const lv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vd(n){return n.replace(lv,cv)}function cv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const uv={[Ws]:"SHADOWMAP_TYPE_PCF",[Mr]:"SHADOWMAP_TYPE_VSM"};function dv(n){return uv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const hv={[Or]:"ENVMAP_MODE_REFRACTION"};function fv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":hv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const pv={[_h]:"ENVMAP_BLENDING_MULTIPLY",[Ip]:"ENVMAP_BLENDING_MIX",[Np]:"ENVMAP_BLENDING_ADD"};function mv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":pv[n.combine]||"ENVMAP_BLENDING_NONE"}function gv(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=dv(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=fv(t),d=mv(t),f=iv(t),h=sv(r),g=s.createProgram();let M,m,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Sr).join(`
`),M.length>0&&(M+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Sr).join(`
`),m.length>0&&(m+=`
`)):(M=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sr).join(`
`),m=[Wd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?qe.tonemapping_pars_fragment:"",t.toneMapping!==Ci?tv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,j_("linearToOutputTexel",t.outputColorSpace),nv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Sr).join(`
`)),a=oc(a),a=Hd(a,t),a=Gd(a,t),o=oc(o),o=Hd(o,t),o=Gd(o,t),a=Vd(a),o=Vd(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,M=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,m=["#define varying in",t.glslVersion===Wu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=p+M+a,y=p+m+o,b=Bd(s,s.VERTEX_SHADER,_),R=Bd(s,s.FRAGMENT_SHADER,y);s.attachShader(g,b),s.attachShader(g,R),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(A){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(g)||"",U=s.getShaderInfoLog(b)||"",k=s.getShaderInfoLog(R)||"",I=L.trim(),G=U.trim(),$=k.trim();let W=!0,se=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,b,R);else{const q=kd(s,b,"vertex"),te=kd(s,R,"fragment");rt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+I+`
`+q+`
`+te)}else I!==""?Pe("WebGLProgram: Program Info Log:",I):(G===""||$==="")&&(se=!1);se&&(A.diagnostics={runnable:W,programLog:I,vertexShader:{log:G,prefix:M},fragmentShader:{log:$,prefix:m}})}s.deleteShader(b),s.deleteShader(R),x=new Wa(s,g),v=rv(s,g)}let x;this.getUniforms=function(){return x===void 0&&E(this),x};let v;this.getAttributes=function(){return v===void 0&&E(this),v};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(g,K_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Z_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=R,this}let xv=0;class _v{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vv(e),t.set(e,i)),i}}class vv{constructor(e){this.id=xv++,this.code=e,this.usedTimes=0}}function Mv(n){return n===_s||n===Qa||n===ja}function Sv(n,e,t,i,s,r){const a=new zh,o=new _v,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,v,C,A,L,U){const k=A.fog,I=L.geometry,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?A.environment:null,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,W=e.get(x.envMap||G,$),se=f[x.type];let q=i.precision;x.precision!==null&&(q=i.getMaxPrecision(x.precision),q!==x.precision&&Pe("WebGLProgram.getParameters:",x.precision,"not supported, using",q,"instead."));const te=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ie=te!==void 0?te.length:0;let we=0;I.morphAttributes.position!==void 0&&(we=1),I.morphAttributes.normal!==void 0&&(we=2),I.morphAttributes.color!==void 0&&(we=3);let Be,Q,_e,ye;if(se){const ge=ci[se];Be=ge.vertexShader,Q=ge.fragmentShader}else{Be=x.vertexShader,Q=x.fragmentShader;const ge=o.getVertexShaderStage(x),lt=o.getFragmentShaderStage(x);o.update(x,ge,lt),_e=ge.id,ye=lt.id}const Le=n.getRenderTarget(),ve=n.state.buffers.depth.getReversed(),ke=L.isInstancedMesh===!0,Ut=L.isBatchedMesh===!0,Ne=!!x.map,ot=!!x.matcap,ht=!!W,Ze=ht&&W.isPMREMTexture===!0,Qt=!!x.aoMap,zt=!!x.lightMap,_n=!!x.bumpMap&&x.wireframe===!1,Mt=!!x.normalMap,ri=!!x.displacementMap,Yt=!!x.emissiveMap,Un=!!x.metalnessMap,On=!!x.roughnessMap,Fn=x.anisotropy>0,F=x.clearcoat>0,Bn=x.diffuseRoughness>0,xt=x.dispersion>0,_t=x.retroreflectivity>0,me=x.iridescence>0,kt=x.sheen>0,Ie=x.transmission>0,Oe=Fn&&!!x.anisotropyMap,D=F&&!!x.clearcoatMap,S=F&&!!x.clearcoatNormalMap,z=F&&!!x.clearcoatRoughnessMap,re=Bn&&!!x.diffuseRoughnessMap,ee=me&&!!x.iridescenceMap,le=me&&!!x.iridescenceThicknessMap,fe=kt&&!!x.sheenColorMap,Z=kt&&!!x.sheenRoughnessMap,J=!!x.specularMap,ue=!!x.specularColorMap,N=!!x.specularIntensityMap,j=Ie&&!!x.transmissionMap,K=Ie&&!!x.thicknessMap,de=!!x.gradientMap,oe=!!x.alphaMap,ce=x.alphaTest>0,Re=!!x.alphaHash,Xe=!!x.extensions;let ae=Ci;x.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(ae=n.toneMapping);const Ce=Ze?W.isCompressedCubeTexture?W.image[0].mipmaps:W.mipmaps:null,Ge={shaderID:se,shaderType:x.type,shaderName:x.name,vertexShader:Be,fragmentShader:Q,defines:x.defines,customVertexShaderID:_e,customFragmentShaderID:ye,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:q,batching:Ut,batchingColor:Ut&&L._colorsTexture!==null,instancing:ke,instancingColor:ke&&L.instanceColor!==null,instancingMorph:ke&&L.morphTexture!==null,outputColorSpace:Le===null?n.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ne,matcap:ot,envMap:ht,envMapMode:ht&&W.mapping,envMapPMREM:Ze,envMapMaxLod:Ze?Ce.length-1:null,envMapSize:Ze?Ce[0].width:null,aoMap:Qt,lightMap:zt,bumpMap:_n,normalMap:Mt,displacementMap:ri,emissiveMap:Yt,normalMapObjectSpace:Mt&&x.normalMapType===Bp,normalMapTangentSpace:Mt&&x.normalMapType===nc,packedNormalMap:Mt&&x.normalMapType===nc&&Mv(x.normalMap.format),metalnessMap:Un,roughnessMap:On,anisotropy:Fn,anisotropyMap:Oe,clearcoat:F,clearcoatMap:D,clearcoatNormalMap:S,clearcoatRoughnessMap:z,diffuseRoughness:Bn,diffuseRoughnessMap:re,dispersion:xt,retroreflection:_t,iridescence:me,iridescenceMap:ee,iridescenceThicknessMap:le,sheen:kt,sheenColorMap:fe,sheenRoughnessMap:Z,specularMap:J,specularColorMap:ue,specularIntensityMap:N,transmission:Ie,transmissionMap:j,thicknessMap:K,gradientMap:de,opaque:x.transparent===!1&&x.blending===Tr&&x.alphaToCoverage===!1,alphaMap:oe,alphaTest:ce,alphaHash:Re,combine:x.combine,mapUv:Ne&&h(x.map.channel),aoMapUv:Qt&&h(x.aoMap.channel),lightMapUv:zt&&h(x.lightMap.channel),bumpMapUv:_n&&h(x.bumpMap.channel),normalMapUv:Mt&&h(x.normalMap.channel),displacementMapUv:ri&&h(x.displacementMap.channel),emissiveMapUv:Yt&&h(x.emissiveMap.channel),metalnessMapUv:Un&&h(x.metalnessMap.channel),roughnessMapUv:On&&h(x.roughnessMap.channel),anisotropyMapUv:Oe&&h(x.anisotropyMap.channel),clearcoatMapUv:D&&h(x.clearcoatMap.channel),clearcoatNormalMapUv:S&&h(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&h(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:re&&h(x.diffuseRoughnessMap.channel),iridescenceMapUv:ee&&h(x.iridescenceMap.channel),iridescenceThicknessMapUv:le&&h(x.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&h(x.sheenColorMap.channel),sheenRoughnessMapUv:Z&&h(x.sheenRoughnessMap.channel),specularMapUv:J&&h(x.specularMap.channel),specularColorMapUv:ue&&h(x.specularColorMap.channel),specularIntensityMapUv:N&&h(x.specularIntensityMap.channel),transmissionMapUv:j&&h(x.transmissionMap.channel),thicknessMapUv:K&&h(x.thicknessMap.channel),alphaMapUv:oe&&h(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Mt||Fn),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!I.attributes.uv&&(Ne||oe),fog:!!k,useFog:x.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&Mt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ve,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:we,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:U.filter(ge=>ge.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,decodeVideoTexture:Ne&&x.map.isVideoTexture===!0&&et.getTransfer(x.map.colorSpace)===ct,decodeVideoTextureEmissive:Yt&&x.emissiveMap.isVideoTexture===!0&&et.getTransfer(x.emissiveMap.colorSpace)===ct,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Vt,flipSided:x.side===yn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Xe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&x.extensions.multiDraw===!0||Ut)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ge.vertexUv1s=l.has(1),Ge.vertexUv2s=l.has(2),Ge.vertexUv3s=l.has(3),l.clear(),Ge}function M(x){const v=[];if(x.shaderID?v.push(x.shaderID):(v.push(x.customVertexShaderID),v.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)v.push(C),v.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(m(v,x),p(v,x),v.push(n.outputColorSpace)),v.push(x.customProgramCacheKey),v.join()}function m(x,v){x.push(v.precision),x.push(v.outputColorSpace),x.push(v.envMapMode),x.push(v.envMapPMREM),x.push(v.envMapMaxLod),x.push(v.envMapSize),x.push(v.mapUv),x.push(v.alphaMapUv),x.push(v.lightMapUv),x.push(v.aoMapUv),x.push(v.bumpMapUv),x.push(v.normalMapUv),x.push(v.displacementMapUv),x.push(v.emissiveMapUv),x.push(v.metalnessMapUv),x.push(v.roughnessMapUv),x.push(v.anisotropyMapUv),x.push(v.clearcoatMapUv),x.push(v.clearcoatNormalMapUv),x.push(v.clearcoatRoughnessMapUv),x.push(v.diffuseRoughnessMapUv),x.push(v.iridescenceMapUv),x.push(v.iridescenceThicknessMapUv),x.push(v.sheenColorMapUv),x.push(v.sheenRoughnessMapUv),x.push(v.specularMapUv),x.push(v.specularColorMapUv),x.push(v.specularIntensityMapUv),x.push(v.transmissionMapUv),x.push(v.thicknessMapUv),x.push(v.combine),x.push(v.fogExp2),x.push(v.sizeAttenuation),x.push(v.morphTargetsCount),x.push(v.numSunLights),x.push(v.numDirLights),x.push(v.numPointLights),x.push(v.numSpotLights),x.push(v.numSpotLightMaps),x.push(v.numHemiLights),x.push(v.numRectAreaLights),x.push(v.numSunLightShadows),x.push(v.numDirLightShadows),x.push(v.numPointLightShadows),x.push(v.numSpotLightShadows),x.push(v.numSpotLightShadowsWithMaps),x.push(v.numLightProbes),x.push(v.numLightProbeGrids),x.push(v.shadowMapType),x.push(v.toneMapping),x.push(v.numClippingPlanes),x.push(v.numClipIntersection),x.push(v.depthPacking)}function p(x,v){a.disableAll(),v.instancing&&a.enable(0),v.instancingColor&&a.enable(1),v.instancingMorph&&a.enable(2),v.matcap&&a.enable(3),v.envMap&&a.enable(4),v.normalMapObjectSpace&&a.enable(5),v.normalMapTangentSpace&&a.enable(6),v.clearcoat&&a.enable(7),v.iridescence&&a.enable(8),v.alphaTest&&a.enable(9),v.vertexColors&&a.enable(10),v.vertexAlphas&&a.enable(11),v.vertexUv1s&&a.enable(12),v.vertexUv2s&&a.enable(13),v.vertexUv3s&&a.enable(14),v.vertexTangents&&a.enable(15),v.anisotropy&&a.enable(16),v.alphaHash&&a.enable(17),v.batching&&a.enable(18),v.dispersion&&a.enable(19),v.retroreflection&&a.enable(24),v.diffuseRoughness&&a.enable(25),v.batchingColor&&a.enable(20),v.gradientMap&&a.enable(21),v.packedNormalMap&&a.enable(22),v.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),v.numLightProbeGrids>0&&a.enable(22),v.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function _(x){const v=f[x.type];let C;if(v){const A=ci[v];C=km.clone(A.uniforms)}else C=x.uniforms;return C}function y(x,v){let C=u.get(v);return C!==void 0?++C.usedTimes:(C=new gv(n,v,x,s),c.push(C),u.set(v,C)),C}function b(x){if(--x.usedTimes===0){const v=c.indexOf(x);c[v]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function R(x){o.remove(x)}function E(){o.dispose()}return{getParameters:g,getProgramCacheKey:M,getUniforms:_,acquireProgram:y,releaseProgram:b,releaseShaderCache:R,programs:c,dispose:E}}function yv(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Ev(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Xd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function qd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,g,M,m,p){let _=n[e];return _===void 0?(_={id:f.id,object:f,geometry:h,material:g,materialVariant:a(f),groupOrder:M,renderOrder:f.renderOrder,z:m,group:p},n[e]=_):(_.id=f.id,_.object=f,_.geometry=h,_.material=g,_.materialVariant=a(f),_.groupOrder=M,_.renderOrder=f.renderOrder,_.z=m,_.group=p),e++,_}function l(f,h,g,M,m,p,_){_.reversedDepth===!0&&(m=-m);const y=o(f,h,g,M,m,p);g.transmission>0?i.push(y):g.transparent===!0?s.push(y):t.push(y)}function c(f,h,g,M,m,p){const _=o(f,h,g,M,m,p);g.transmission>0?i.unshift(_):g.transparent===!0?s.unshift(_):t.unshift(_)}function u(f,h){t.length>1&&t.sort(f||Ev),i.length>1&&i.sort(h||Xd),s.length>1&&s.sort(h||Xd)}function d(){for(let f=e,h=n.length;f<h;f++){const g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function bv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new qd,n.set(i,[a])):s>=r.length?(a=new qd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Tv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new He};break;case"SpotLight":t={position:new P,direction:new P,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function wv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Av=0;function Rv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Cv(n){const e=new Tv,t=wv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const s=new P,r=new Ye,a=new Ye;function o(c){let u=0,d=0,f=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let h=0,g=0,M=0,m=0,p=0,_=0,y=0,b=0,R=0,E=0,x=0,v=0,C=0,A=0;c.sort(Rv);for(let U=0,k=c.length;U<k;U++){const I=c[U],G=I.color,$=I.intensity,W=I.distance;let se=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===_s?se=I.shadow.map.texture:se=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=G.r*$,d+=G.g*$,f+=G.b*$;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],$);A++}else if(I.isSunLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,ie=t.get(I);ie.shadowIntensity=te.intensity,ie.shadowBias=te.bias,ie.shadowNormalBias=te.normalBias,ie.shadowRadius=te.radius,ie.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[g]=ie,i.sunShadowMap[g]=se;const we=te.getViewportCount();for(let Be=0;Be<we;Be++)i.sunShadowMatrix[M+Be]=te.getMatrix(Be),i.sunShadowCascade[M+Be]=te._cascadeData[Be];M+=we,g++}i.sun[h]=q,h++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const te=I.shadow,ie=t.get(I);ie.shadowIntensity=te.intensity,ie.shadowBias=te.bias,ie.shadowNormalBias=te.normalBias,ie.shadowRadius=te.radius,ie.shadowMapSize=te.mapSize,i.directionalShadow[m]=ie,i.directionalShadowMap[m]=se,i.directionalShadowMatrix[m]=I.shadow.matrix,R++}i.directional[m]=q,m++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(G).multiplyScalar($),q.distance=W,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[_]=q;const te=I.shadow;if(I.map&&(i.spotLightMap[v]=I.map,v++,te.updateMatrices(I),I.castShadow&&C++),i.spotLightMatrix[_]=te.matrix,I.castShadow){const ie=t.get(I);ie.shadowIntensity=te.intensity,ie.shadowBias=te.bias,ie.shadowNormalBias=te.normalBias,ie.shadowRadius=te.radius,ie.shadowMapSize=te.mapSize,i.spotShadow[_]=ie,i.spotShadowMap[_]=se,x++}_++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(G).multiplyScalar($),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[y]=q,y++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const te=I.shadow,ie=t.get(I);ie.shadowIntensity=te.intensity,ie.shadowBias=te.bias,ie.shadowNormalBias=te.normalBias,ie.shadowRadius=te.radius,ie.shadowMapSize=te.mapSize,ie.shadowCameraNear=te.camera.near,ie.shadowCameraFar=te.camera.far,i.pointShadow[p]=ie,i.pointShadowMap[p]=se,i.pointShadowMatrix[p]=I.shadow.matrix,E++}i.point[p]=q,p++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar($),q.groundColor.copy(I.groundColor).multiplyScalar($),i.hemi[b]=q,b++}}y>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const L=i.hash;(L.sunLength!==h||L.directionalLength!==m||L.pointLength!==p||L.spotLength!==_||L.rectAreaLength!==y||L.hemiLength!==b||L.numSunShadows!==g||L.numDirectionalShadows!==R||L.numPointShadows!==E||L.numSpotShadows!==x||L.numSpotMaps!==v||L.numLightProbes!==A)&&(i.sun.length=h,i.directional.length=m,i.spot.length=_,i.rectArea.length=y,i.point.length=p,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=x,i.spotShadowMap.length=x,i.spotLightMatrix.length=x+v-C,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,L.sunLength=h,L.directionalLength=m,L.pointLength=p,L.spotLength=_,L.rectAreaLength=y,L.hemiLength=b,L.numSunShadows=g,L.numDirectionalShadows=R,L.numPointShadows=E,L.numSpotShadows=x,L.numSpotMaps=v,L.numLightProbes=A,i.version=Av++)}function l(c,u){let d=0,f=0,h=0,g=0,M=0,m=0;const p=u.matrixWorldInverse;for(let _=0,y=c.length;_<y;_++){const b=c[_];if(b.isSunLight){const R=i.sun[d];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(p),d++}else if(b.isDirectionalLight){const R=i.directional[f];R.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),f++}else if(b.isSpotLight){const R=i.spot[g];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const R=i.rectArea[M];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),M++}else if(b.isPointLight){const R=i.point[h];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(p),h++}else if(b.isHemisphereLight){const R=i.hemi[m];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function Yd(n){const e=new Cv(n),t=[],i=[],s=[];function r(d){u.camera=d,t.length=0,i.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):t.push(d)}function o(d){i.push(d)}function l(){e.setup(t),s.sort((d,f)=>d.priority-f.priority||d.id-f.id)}function c(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Dv(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Yd(n),e.set(s,[o])):r>=a.length?(o=new Yd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Pv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Iv=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Nv=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],$d=new Ye,pr=new P,ul=new P;function Uv(n,e,t){let i=new kr;const s=new We,r=new We,a=new dt,o=new Wm,l=new Xm,c={},u=t.maxTextureSize,d={[xs]:yn,[yn]:xs,[Vt]:Vt},f=new vs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:Pv,fragmentShader:Lv}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new Tt;g.setAttribute("position",new In(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new st(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ws;let p=this.type;this.render=function(E,x,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===pp&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ws);const C=n.getRenderTarget(),A=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Xs),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const k=p!==this.type;k&&x.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=E.length;I<G;I++){const $=E[I],W=$.shadow;if(W===void 0){Pe("WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const se=W.getFrameExtents();s.multiply(se),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/se.x),s.x=r.x*se.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/se.y),s.y=r.y*se.y,W.mapSize.y=r.y));const q=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=q,W.map===null||k===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Mr){if($.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new di(s.x,s.y,{format:_s,type:mi,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),W.map.texture.name=$.name+".shadowMap",W.map.depthTexture=new Zs(s.x,s.y,Vn),W.map.depthTexture.name=$.name+".shadowMapDepth",W.map.depthTexture.format=Qi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=nn,W.map.depthTexture.magFilter=nn}else $.isPointLight?(W.map=new eu(s.x),W.map.depthTexture=new Xh(s.x,pi)):(W.map=new di(s.x,s.y),W.map.depthTexture=new Zs(s.x,s.y,pi)),W.map.depthTexture.name=$.name+".shadowMap",W.map.depthTexture.format=Qi,this.type===Ws?(W.map.depthTexture.compareFunction=q?Ih:Lh,W.map.depthTexture.minFilter=Sn,W.map.depthTexture.magFilter=Sn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=nn,W.map.depthTexture.magFilter=nn);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const te=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();$.isPointLight!==!0&&W.updateMatrices($,v);const ie=(W.camera.layers.mask&4294967294)!==0?W.camera.layers:v.layers;for(let we=0;we<te;we++){const Be=W.getCamera(we);if($.isPointLight){const Q=W.camera,_e=W.matrix,ye=$.distance||Q.far;ye!==Q.far&&(Q.far=ye,Q.updateProjectionMatrix()),pr.setFromMatrixPosition($.matrixWorld),Q.position.copy(pr),ul.copy(Q.position),ul.add(Iv[we]),Q.up.copy(Nv[we]),Q.lookAt(ul),Q.updateMatrixWorld(),_e.makeTranslation(-pr.x,-pr.y,-pr.z),$d.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),W._frustum.setFromProjectionMatrix($d,Q.coordinateSystem,Q.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,we),n.clear();else{we===0&&(n.setRenderTarget(W.map),n.clear());const Q=W.getViewport(we);a.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),U.viewport(a)}i=W.getFrustum(we),b(x,v,Be,$,ie,this.type)}W.isPointLightShadow!==!0&&this.type===Mr&&_(W,v),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(C,A,L)};function _(E,x){const v=e.update(M);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null?E.mapPass=new di(s.x,s.y,{format:_s,type:mi}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(x,null,v,f,M,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(x,null,v,h,M,null)}function y(E,x,v,C){let A=null;const L=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)A=L;else if(A=v.isPointLight===!0?l:o,n.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){const U=A.uuid,k=x.uuid;let I=c[U];I===void 0&&(I={},c[U]=I);let G=I[k];G===void 0&&(G=A.clone(),I[k]=G,x.addEventListener("dispose",R)),A=G}if(A.visible=x.visible,A.wireframe=x.wireframe,C===Mr?A.side=x.shadowSide!==null?x.shadowSide:x.side:A.side=x.shadowSide!==null?x.shadowSide:d[x.side],A.alphaMap=x.alphaMap,A.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,A.map=x.map,A.clipShadows=x.clipShadows,A.clippingPlanes=x.clippingPlanes,A.clipIntersection=x.clipIntersection,A.displacementMap=x.displacementMap,A.displacementScale=x.displacementScale,A.displacementBias=x.displacementBias,A.wireframeLinewidth=x.wireframeLinewidth,A.linewidth=x.linewidth,v.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const U=n.properties.get(A);U.light=v}return A}function b(E,x,v,C,A,L){if(E.visible===!1)return;if(E.layers.test(A)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===Mr)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const I=e.update(E),G=E.material;if(Array.isArray(G)){const $=I.groups;for(let W=0,se=$.length;W<se;W++){const q=$[W],te=G[q.materialIndex];if(te&&te.visible){const ie=y(E,te,C,L);E.onBeforeShadow(n,E,x,v,I,ie,q),n.renderBufferDirect(v,null,I,ie,E,q),E.onAfterShadow(n,E,x,v,I,ie,q)}}}else if(G.visible){const $=y(E,G,C,L);E.onBeforeShadow(n,E,x,v,I,$,null),n.renderBufferDirect(v,null,I,$,E,null),E.onAfterShadow(n,E,x,v,I,$,null)}}const k=E.children;for(let I=0,G=k.length;I<G;I++)b(k[I],x,v,C,A,L)}function R(E){E.target.removeEventListener("dispose",R);for(const v in c){const C=c[v],A=E.target.uuid;A in C&&(C[A].dispose(),delete C[A])}}}function Ov(n,e){function t(){let N=!1;const j=new dt;let K=null;const de=new dt(0,0,0,0);return{setMask:function(oe){K!==oe&&!N&&(n.colorMask(oe,oe,oe,oe),K=oe)},setLocked:function(oe){N=oe},setClear:function(oe,ce,Re,Xe,ae){ae===!0&&(oe*=Xe,ce*=Xe,Re*=Xe),j.set(oe,ce,Re,Xe),de.equals(j)===!1&&(n.clearColor(oe,ce,Re,Xe),de.copy(j))},reset:function(){N=!1,K=null,de.set(-1,0,0,0)}}}function i(){let N=!1,j=!1,K=null,de=null,oe=null;return{setReversed:function(ce){if(j!==ce){const Re=e.get("EXT_clip_control");ce?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),j=ce;const Xe=oe;oe=null,this.setClear(Xe)}},getReversed:function(){return j},setTest:function(ce){ce?ve(n.DEPTH_TEST):ke(n.DEPTH_TEST)},setMask:function(ce){K!==ce&&!N&&(n.depthMask(ce),K=ce)},setFunc:function(ce){if(j&&(ce=Kp[ce]),de!==ce){switch(ce){case _l:n.depthFunc(n.NEVER);break;case vl:n.depthFunc(n.ALWAYS);break;case Ml:n.depthFunc(n.LESS);break;case Ur:n.depthFunc(n.LEQUAL);break;case Sl:n.depthFunc(n.EQUAL);break;case yl:n.depthFunc(n.GEQUAL);break;case El:n.depthFunc(n.GREATER);break;case bl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}de=ce}},setLocked:function(ce){N=ce},setClear:function(ce){oe!==ce&&(oe=ce,j&&(ce=1-ce),n.clearDepth(ce))},reset:function(){N=!1,K=null,de=null,oe=null,j=!1}}}function s(){let N=!1,j=null,K=null,de=null,oe=null,ce=null,Re=null,Xe=null,ae=null;return{setTest:function(Ce){N||(Ce?ve(n.STENCIL_TEST):ke(n.STENCIL_TEST))},setMask:function(Ce){j!==Ce&&!N&&(n.stencilMask(Ce),j=Ce)},setFunc:function(Ce,Ge,ge){(K!==Ce||de!==Ge||oe!==ge)&&(n.stencilFunc(Ce,Ge,ge),K=Ce,de=Ge,oe=ge)},setOp:function(Ce,Ge,ge){(ce!==Ce||Re!==Ge||Xe!==ge)&&(n.stencilOp(Ce,Ge,ge),ce=Ce,Re=Ge,Xe=ge)},setLocked:function(Ce){N=Ce},setClear:function(Ce){ae!==Ce&&(n.clearStencil(Ce),ae=Ce)},reset:function(){N=!1,j=null,K=null,de=null,oe=null,ce=null,Re=null,Xe=null,ae=null}}}const r=new t,a=new i,o=new s;let l={};const c=new WeakMap;let u={},d={},f={},h=new WeakMap,g=[],M=null,m=!1,p=null,_=null,y=null,b=null,R=null,E=null,x=null,v=new He(0,0,0),C=0,A=!1,L=null,U=null,k=null,I=null,G=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,se=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(q)[1]),W=se>=1):q.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),W=se>=2);let te=null,ie={};const we=n.getParameter(n.SCISSOR_BOX),Be=n.getParameter(n.VIEWPORT),Q=new dt().fromArray(we),_e=new dt().fromArray(Be);function ye(N,j,K,de){const oe=new Uint8Array(4),ce=n.createTexture();n.bindTexture(N,ce),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Re=0;Re<K;Re++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(j,0,n.RGBA,1,1,de,0,n.RGBA,n.UNSIGNED_BYTE,oe):n.texImage2D(j+Re,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,oe);return ce}const Le={};Le[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),Le[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Le[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Le[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ve(n.DEPTH_TEST),a.setFunc(Ur),_n(!1),Mt(zu),ve(n.CULL_FACE),Qt(Xs);function ve(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function ke(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Ut(N,j){return f[N]!==j?(n.bindFramebuffer(N,j),f[N]=j,N===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=j),N===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=j),!0):!1}function Ne(N,j){let K=g,de=!1;if(N){K=h.get(j),K===void 0&&(K=[],h.set(j,K));const oe=N.textures;if(K.length!==oe.length||K[0]!==n.COLOR_ATTACHMENT0){for(let ce=0,Re=oe.length;ce<Re;ce++)K[ce]=n.COLOR_ATTACHMENT0+ce;K.length=oe.length,de=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,de=!0);de&&n.drawBuffers(K)}function ot(N){return M!==N?(n.useProgram(N),M=N,!0):!1}const ht={[Hs]:n.FUNC_ADD,[gp]:n.FUNC_SUBTRACT,[xp]:n.FUNC_REVERSE_SUBTRACT};ht[_p]=n.MIN,ht[vp]=n.MAX;const Ze={[Mp]:n.ZERO,[Sp]:n.ONE,[yp]:n.SRC_COLOR,[gh]:n.SRC_ALPHA,[Rp]:n.SRC_ALPHA_SATURATE,[wp]:n.DST_COLOR,[bp]:n.DST_ALPHA,[Ep]:n.ONE_MINUS_SRC_COLOR,[xh]:n.ONE_MINUS_SRC_ALPHA,[Ap]:n.ONE_MINUS_DST_COLOR,[Tp]:n.ONE_MINUS_DST_ALPHA,[Cp]:n.CONSTANT_COLOR,[Dp]:n.ONE_MINUS_CONSTANT_COLOR,[Pp]:n.CONSTANT_ALPHA,[Lp]:n.ONE_MINUS_CONSTANT_ALPHA};function Qt(N,j,K,de,oe,ce,Re,Xe,ae,Ce){if(N===Xs){m===!0&&(ke(n.BLEND),m=!1);return}if(m===!1&&(ve(n.BLEND),m=!0),N!==mp){if(N!==p||Ce!==A){if((_!==Hs||R!==Hs)&&(n.blendEquation(n.FUNC_ADD),_=Hs,R=Hs),Ce)switch(N){case Tr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ku:n.blendFunc(n.ONE,n.ONE);break;case Hu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:rt("WebGLState: Invalid blending: ",N);break}else switch(N){case Tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ku:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Hu:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gu:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",N);break}y=null,b=null,E=null,x=null,v.set(0,0,0),C=0,p=N,A=Ce}return}oe=oe||j,ce=ce||K,Re=Re||de,(j!==_||oe!==R)&&(n.blendEquationSeparate(ht[j],ht[oe]),_=j,R=oe),(K!==y||de!==b||ce!==E||Re!==x)&&(n.blendFuncSeparate(Ze[K],Ze[de],Ze[ce],Ze[Re]),y=K,b=de,E=ce,x=Re),(Xe.equals(v)===!1||ae!==C)&&(n.blendColor(Xe.r,Xe.g,Xe.b,ae),v.copy(Xe),C=ae),p=N,A=!1}function zt(N,j){N.side===Vt?ke(n.CULL_FACE):ve(n.CULL_FACE);let K=N.side===yn;j&&(K=!K),_n(K),N.blending===Tr&&N.transparent===!1?Qt(Xs):Qt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const de=N.stencilWrite;o.setTest(de),de&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Yt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ve(n.SAMPLE_ALPHA_TO_COVERAGE):ke(n.SAMPLE_ALPHA_TO_COVERAGE)}function _n(N){L!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),L=N)}function Mt(N){N!==hp?(ve(n.CULL_FACE),N!==U&&(N===zu?n.cullFace(n.BACK):N===fp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ke(n.CULL_FACE),U=N}function ri(N){N!==k&&(W&&n.lineWidth(N),k=N)}function Yt(N,j,K){N?(ve(n.POLYGON_OFFSET_FILL),(I!==j||G!==K)&&(I=j,G=K,a.getReversed()&&(j=-j,K=-K),n.polygonOffset(j,K))):ke(n.POLYGON_OFFSET_FILL)}function Un(N){N?ve(n.SCISSOR_TEST):ke(n.SCISSOR_TEST)}function On(N){N===void 0&&(N=n.TEXTURE0+$-1),te!==N&&(n.activeTexture(N),te=N)}function Fn(N,j,K){K===void 0&&(te===null?K=n.TEXTURE0+$-1:K=te);let de=ie[K];de===void 0&&(de={type:void 0,texture:void 0},ie[K]=de),(de.type!==N||de.texture!==j)&&(te!==K&&(n.activeTexture(K),te=K),n.bindTexture(N,j||Le[N]),de.type=N,de.texture=j)}function F(){const N=ie[te];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Bn(){try{n.compressedTexImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function xt(){try{n.compressedTexImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function _t(){try{n.texSubImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function me(){try{n.texSubImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function kt(){try{n.compressedTexSubImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function Ie(){try{n.compressedTexSubImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function Oe(){try{n.texStorage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function D(){try{n.texStorage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function S(){try{n.texImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function z(){try{n.texImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function re(N){return d[N]!==void 0?d[N]:n.getParameter(N)}function ee(N,j){d[N]!==j&&(n.pixelStorei(N,j),d[N]=j)}function le(N){Q.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Q.copy(N))}function fe(N){_e.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),_e.copy(N))}function Z(N,j){let K=c.get(j);K===void 0&&(K=new WeakMap,c.set(j,K));let de=K.get(N);de===void 0&&(de=n.getUniformBlockIndex(j,N.name),n.uniformBlockBinding(j,de,de),K.set(N,de))}function J(N,j,K){const oe=c.get(j).get(N);l[oe]!==K&&(n.bindBufferBase(n.UNIFORM_BUFFER,oe,K),l[oe]=K)}function ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,ie={},f={},l={},h=new WeakMap,g=[],M=null,m=!1,p=null,_=null,y=null,b=null,R=null,E=null,x=null,v=new He(0,0,0),C=0,A=!1,L=null,U=null,k=null,I=null,G=null,Q.set(0,0,n.canvas.width,n.canvas.height),_e.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ve,disable:ke,bindFramebuffer:Ut,drawBuffers:Ne,useProgram:ot,setBlending:Qt,setMaterial:zt,setFlipSided:_n,setCullFace:Mt,setLineWidth:ri,setPolygonOffset:Yt,setScissorTest:Un,activeTexture:On,bindTexture:Fn,unbindTexture:F,compressedTexImage2D:Bn,compressedTexImage3D:xt,texImage2D:S,texImage3D:z,pixelStorei:ee,getParameter:re,updateUBOMapping:Z,uniformBlockBinding:J,texStorage2D:Oe,texStorage3D:D,texSubImage2D:_t,texSubImage3D:me,compressedTexSubImage2D:kt,compressedTexSubImage3D:Ie,scissor:le,viewport:fe,reset:ue}}function Fv(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,u=new WeakMap,d=new Set;let f;const h=new WeakMap,g=new Set,M=new FinalizationRegistry(D=>g.delete(D));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(D,S){return m?new OffscreenCanvas(D,S):no("canvas")}function _(D,S,z){let re=1;const ee=Oe(D);if((ee.width>z||ee.height>z)&&(re=z/Math.max(ee.width,ee.height)),re<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const le=Math.floor(re*ee.width),fe=Math.floor(re*ee.height);f===void 0&&(f=p(le,fe));const Z=S?p(le,fe):f;return Z.width=le,Z.height=fe,Z.getContext("2d").drawImage(D,0,0,le,fe),Pe("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+le+"x"+fe+")."),Z}else return"data"in D&&Pe("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),D;return D}function y(D){return D.generateMipmaps}function b(D){n.generateMipmap(D)}function R(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(D,S,z,re,ee,le=!1){if(D!==null){if(n[D]!==void 0)return n[D];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let fe;re&&(fe=e.get("EXT_texture_norm16"),fe||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=S;if(S===n.RED&&(z===n.FLOAT&&(Z=n.R32F),z===n.HALF_FLOAT&&(Z=n.R16F),z===n.UNSIGNED_BYTE&&(Z=n.R8),z===n.UNSIGNED_SHORT&&fe&&(Z=fe.R16_EXT),z===n.SHORT&&fe&&(Z=fe.R16_SNORM_EXT)),S===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.R8UI),z===n.UNSIGNED_SHORT&&(Z=n.R16UI),z===n.UNSIGNED_INT&&(Z=n.R32UI),z===n.BYTE&&(Z=n.R8I),z===n.SHORT&&(Z=n.R16I),z===n.INT&&(Z=n.R32I)),S===n.RG&&(z===n.FLOAT&&(Z=n.RG32F),z===n.HALF_FLOAT&&(Z=n.RG16F),z===n.UNSIGNED_BYTE&&(Z=n.RG8),z===n.UNSIGNED_SHORT&&fe&&(Z=fe.RG16_EXT),z===n.SHORT&&fe&&(Z=fe.RG16_SNORM_EXT)),S===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RG8UI),z===n.UNSIGNED_SHORT&&(Z=n.RG16UI),z===n.UNSIGNED_INT&&(Z=n.RG32UI),z===n.BYTE&&(Z=n.RG8I),z===n.SHORT&&(Z=n.RG16I),z===n.INT&&(Z=n.RG32I)),S===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),z===n.UNSIGNED_INT&&(Z=n.RGB32UI),z===n.BYTE&&(Z=n.RGB8I),z===n.SHORT&&(Z=n.RGB16I),z===n.INT&&(Z=n.RGB32I)),S===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),z===n.UNSIGNED_INT&&(Z=n.RGBA32UI),z===n.BYTE&&(Z=n.RGBA8I),z===n.SHORT&&(Z=n.RGBA16I),z===n.INT&&(Z=n.RGBA32I)),S===n.RGB&&(z===n.UNSIGNED_SHORT&&fe&&(Z=fe.RGB16_EXT),z===n.SHORT&&fe&&(Z=fe.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),S===n.RGBA){const J=le?to:et.getTransfer(ee);z===n.FLOAT&&(Z=n.RGBA32F),z===n.HALF_FLOAT&&(Z=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Z=J===ct?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&fe&&(Z=fe.RGBA16_EXT),z===n.SHORT&&fe&&(Z=fe.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function x(D,S){let z;return D?S===null||S===pi||S===Ks?z=n.DEPTH24_STENCIL8:S===Vn?z=n.DEPTH32F_STENCIL8:S===Fr&&(z=n.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===pi||S===Ks?z=n.DEPTH_COMPONENT24:S===Vn?z=n.DEPTH_COMPONENT32F:S===Fr&&(z=n.DEPTH_COMPONENT16),z}function v(D,S){return y(D)===!0||D.isFramebufferTexture&&D.minFilter!==nn&&D.minFilter!==Sn?Math.log2(Math.max(S.width,S.height))+1:D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?S.mipmaps.length:1}function C(D){const S=new WeakRef(D);i.get(D).__ref=S,g.add(S),M.register(D,S,S)}function A(D){const S=i.get(D).__ref;S!==void 0&&(g.delete(S),M.unregister(S))}function L(D){k(D.target)}function U(D){I(D.target)}function k(D){D.removeEventListener("dispose",L),A(D),$(D),D.isVideoTexture&&u.delete(D),D.isHTMLTexture&&d.delete(D)}function I(D){D.removeEventListener("dispose",U),A(D),se(D)}function G(){for(const D of g){const S=D.deref();S!==void 0&&(S.isRenderTarget===!0?I(S):k(S))}g.clear(),d.clear()}function $(D){const S=i.get(D);if(S.__webglInit===void 0)return;const z=D.source,re=h.get(z);if(re){const ee=re[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&W(D),Object.keys(re).length===0&&h.delete(z)}i.remove(D)}function W(D){const S=i.get(D);n.deleteTexture(S.__webglTexture);const z=D.source,re=h.get(z);delete re[S.__cacheKey],a.memory.textures--}function se(D){const S=i.get(D);S.__depthDisposeCallback&&S.__depthDisposeCallback();const z=D.depthTexture;if(z&&z.renderTarget===D&&k(z),D.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(S.__webglFramebuffer[ee]))for(let le=0;le<S.__webglFramebuffer[ee].length;le++)n.deleteFramebuffer(S.__webglFramebuffer[ee][le]);else n.deleteFramebuffer(S.__webglFramebuffer[ee]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[ee])}else{if(Array.isArray(S.__webglFramebuffer))for(let ee=0;ee<S.__webglFramebuffer.length;ee++)n.deleteFramebuffer(S.__webglFramebuffer[ee]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ee=0;ee<S.__webglColorRenderbuffer.length;ee++)S.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[ee]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const re=D.textures;for(let ee=0,le=re.length;ee<le;ee++){const fe=i.get(re[ee]);fe.__webglTexture&&(n.deleteTexture(fe.__webglTexture),a.memory.textures--),i.remove(re[ee])}i.remove(D)}let q=0;function te(){q=0}function ie(){return q}function we(D){q=D}function Be(){const D=q;return D>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,D}function Q(D){const S=[];return S.push(D.wrapS),S.push(D.wrapT),S.push(D.wrapR||0),S.push(D.magFilter),S.push(D.minFilter),S.push(D.anisotropy),S.push(D.internalFormat),S.push(D.format),S.push(D.type),S.push(D.generateMipmaps),S.push(D.mipmapsAutoUpdate),S.push(D.premultiplyAlpha),S.push(D.flipY),S.push(D.unpackAlignment),S.push(D.colorSpace),S.join()}function _e(D,S){const z=i.get(D);if(D.isVideoTexture&&kt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&z.__version!==D.version){const re=D.image;if(re===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{zt(z,D,S);return}}else D.isExternalTexture&&(z.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+S)}function ye(D,S){const z=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&z.__version!==D.version){zt(z,D,S);return}else D.isExternalTexture&&(z.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+S)}function Le(D,S){const z=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&z.__version!==D.version){zt(z,D,S);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+S)}function ve(D,S){const z=i.get(D);if(D.version>0&&z.__version!==D.version){_n(z,D,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+S)}const ke={[Ja]:n.REPEAT,[Ai]:n.CLAMP_TO_EDGE,[Tl]:n.MIRRORED_REPEAT},Ut={[nn]:n.NEAREST,[Op]:n.NEAREST_MIPMAP_NEAREST,[oa]:n.NEAREST_MIPMAP_LINEAR,[Sn]:n.LINEAR,[Fo]:n.LINEAR_MIPMAP_NEAREST,[Ki]:n.LINEAR_MIPMAP_LINEAR},Ne={[kp]:n.NEVER,[Nh]:n.ALWAYS,[Hp]:n.LESS,[Lh]:n.LEQUAL,[Gp]:n.EQUAL,[Ih]:n.GEQUAL,[Vp]:n.GREATER,[Wp]:n.NOTEQUAL};function ot(D,S){if(S.type===Vn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Sn||S.magFilter===Fo||S.magFilter===oa||S.magFilter===Ki||S.minFilter===Sn||S.minFilter===Fo||S.minFilter===oa||S.minFilter===Ki)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,ke[S.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,ke[S.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,ke[S.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,Ut[S.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,Ut[S.minFilter]),S.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,Ne[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===nn||S.minFilter!==oa&&S.minFilter!==Ki||S.type===Vn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function ht(D,S){let z=!1;D.__webglInit===void 0&&(D.__webglInit=!0,S.addEventListener("dispose",L),C(S));const re=S.source;let ee=h.get(re);ee===void 0&&(ee={},h.set(re,ee));const le=Q(S);if(le!==D.__cacheKey){ee[le]===void 0&&(ee[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ee[le].usedTimes++;const fe=ee[D.__cacheKey];fe!==void 0&&(ee[D.__cacheKey].usedTimes--,fe.usedTimes===0&&W(S)),D.__cacheKey=le,D.__webglTexture=ee[le].texture}return z}function Ze(D,S,z){return Math.floor(Math.floor(D/z)/S)}function Qt(D,S,z,re){const le=D.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,z,re,S.data);else{le.sort((N,j)=>N.start-j.start);let fe=0;for(let N=1;N<le.length;N++){const j=le[fe],K=le[N],de=j.start+j.count,oe=Ze(K.start,S.width,4),ce=Ze(j.start,S.width,4);K.start<=de+1&&oe===ce&&Ze(K.start+K.count-1,S.width,4)===oe?j.count=Math.max(j.count,K.start+K.count-j.start):(++fe,le[fe]=K)}le.length=fe+1;const Z=t.getParameter(n.UNPACK_ROW_LENGTH),J=t.getParameter(n.UNPACK_SKIP_PIXELS),ue=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let N=0,j=le.length;N<j;N++){const K=le[N],de=Math.floor(K.start/4),oe=Math.ceil(K.count/4),ce=de%S.width,Re=Math.floor(de/S.width),Xe=oe,ae=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(n.UNPACK_SKIP_ROWS,Re),t.texSubImage2D(n.TEXTURE_2D,0,ce,Re,Xe,ae,z,re,S.data)}D.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Z),t.pixelStorei(n.UNPACK_SKIP_PIXELS,J),t.pixelStorei(n.UNPACK_SKIP_ROWS,ue)}}function zt(D,S,z){let re=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(re=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(re=n.TEXTURE_3D);const ee=ht(D,S),le=S.source;t.bindTexture(re,D.__webglTexture,n.TEXTURE0+z);const fe=i.get(le);if(le.version!==fe.__version||ee===!0){if(t.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const ae=et.getPrimaries(et.workingColorSpace),Ce=S.colorSpace===$i?null:et.getPrimaries(S.colorSpace),Ge=S.colorSpace===$i||ae===Ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge)}t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment);let J=_(S.image,!1,s.maxTextureSize);J=Ie(S,J);const ue=r.convert(S.format,S.colorSpace),N=r.convert(S.type);let j=E(S.internalFormat,ue,N,S.normalized,S.colorSpace,S.isVideoTexture);ot(re,S);let K;const de=S.mipmaps,oe=S.isVideoTexture!==!0,ce=fe.__version===void 0||ee===!0,Re=le.dataReady,Xe=v(S,J);if(S.isDepthTexture)j=x(S.format===Zi,S.type),ce&&(oe?t.texStorage2D(n.TEXTURE_2D,1,j,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,j,J.width,J.height,0,ue,N,null));else if(S.isDataTexture)if(de.length>0){oe&&ce&&t.texStorage2D(n.TEXTURE_2D,Xe,j,de[0].width,de[0].height);for(let ae=0,Ce=de.length;ae<Ce;ae++)K=de[ae],oe?Re&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,ue,N,K.data):t.texImage2D(n.TEXTURE_2D,ae,j,K.width,K.height,0,ue,N,K.data);S.generateMipmaps=!1}else oe?(ce&&t.texStorage2D(n.TEXTURE_2D,Xe,j,J.width,J.height),Re&&Qt(S,J,ue,N)):t.texImage2D(n.TEXTURE_2D,0,j,J.width,J.height,0,ue,N,J.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){oe&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Xe,j,de[0].width,de[0].height,J.depth);for(let ae=0,Ce=de.length;ae<Ce;ae++)if(K=de[ae],S.format!==ei)if(ue!==null)if(oe){if(Re)if(S.layerUpdates.size>0){const Ge=Ad(K.width,K.height,S.format,S.type);for(const ge of S.layerUpdates){const lt=K.data.subarray(ge*Ge/K.data.BYTES_PER_ELEMENT,(ge+1)*Ge/K.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,ge,K.width,K.height,1,ue,lt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,K.width,K.height,J.depth,ue,K.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,j,K.width,K.height,J.depth,0,K.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?Re&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,K.width,K.height,J.depth,ue,N,K.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,j,K.width,K.height,J.depth,0,ue,N,K.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{oe&&ce&&t.texStorage2D(n.TEXTURE_2D,Xe,j,de[0].width,de[0].height);for(let ae=0,Ce=de.length;ae<Ce;ae++)K=de[ae],S.format!==ei?ue!==null?oe?Re&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,ue,K.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,j,K.width,K.height,0,K.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?Re&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,K.width,K.height,ue,N,K.data):t.texImage2D(n.TEXTURE_2D,ae,j,K.width,K.height,0,ue,N,K.data)}else if(S.isDataArrayTexture)if(oe){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Xe,j,J.width,J.height,J.depth),Re)if(S.layerUpdates.size>0){const ae=Ad(J.width,J.height,S.format,S.type);for(const Ce of S.layerUpdates){const Ge=J.data.subarray(Ce*ae/J.data.BYTES_PER_ELEMENT,(Ce+1)*ae/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ce,J.width,J.height,1,ue,N,Ge)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ue,N,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,j,J.width,J.height,J.depth,0,ue,N,J.data);else if(S.isData3DTexture)oe?(ce&&t.texStorage3D(n.TEXTURE_3D,Xe,j,J.width,J.height,J.depth),Re&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ue,N,J.data)):t.texImage3D(n.TEXTURE_3D,0,j,J.width,J.height,J.depth,0,ue,N,J.data);else if(S.isFramebufferTexture){if(ce)if(oe)t.texStorage2D(n.TEXTURE_2D,Xe,j,J.width,J.height);else{let ae=J.width,Ce=J.height;for(let Ge=0;Ge<Xe;Ge++)t.texImage2D(n.TEXTURE_2D,Ge,j,ae,Ce,0,ue,N,null),ae>>=1,Ce>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in n){const ae=n.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),J.parentNode!==ae){ae.appendChild(J),d.add(S),ae.onpaint=Ce=>{const Ge=Ce.changedElements;for(const ge of d)Ge.includes(ge.image)&&(ge.needsUpdate=!0)},ae.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,J);else{const Ge=n.RGBA,ge=n.RGBA,lt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ge,ge,lt,J)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(de.length>0){if(oe&&ce){const ae=Oe(de[0]);t.texStorage2D(n.TEXTURE_2D,Xe,j,ae.width,ae.height)}for(let ae=0,Ce=de.length;ae<Ce;ae++)K=de[ae],oe?Re&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ue,N,K):t.texImage2D(n.TEXTURE_2D,ae,j,ue,N,K);S.generateMipmaps=!1}else if(oe){if(ce){const ae=Oe(J);t.texStorage2D(n.TEXTURE_2D,Xe,j,ae.width,ae.height)}Re&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,N,J)}else t.texImage2D(n.TEXTURE_2D,0,j,ue,N,J);y(S)&&S.mipmapsAutoUpdate===!0&&b(re),fe.__version=le.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function _n(D,S,z){if(S.image.length!==6)return;const re=ht(D,S),ee=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+z);const le=i.get(ee);if(ee.version!==le.__version||re===!0){t.activeTexture(n.TEXTURE0+z);const fe=et.getPrimaries(et.workingColorSpace),Z=S.colorSpace===$i?null:et.getPrimaries(S.colorSpace),J=S.colorSpace===$i||fe===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const ue=S.isCompressedTexture||S.image[0].isCompressedTexture,N=S.image[0]&&S.image[0].isDataTexture,j=[];for(let ge=0;ge<6;ge++)!ue&&!N?j[ge]=_(S.image[ge],!0,s.maxCubemapSize):j[ge]=N?S.image[ge].image:S.image[ge],j[ge]=Ie(S,j[ge]);const K=j[0],de=r.convert(S.format,S.colorSpace),oe=r.convert(S.type);let ce=E(S.internalFormat,de,oe,S.normalized,S.colorSpace);const Re=S.isVideoTexture!==!0,Xe=le.__version===void 0||re===!0,ae=ee.dataReady;let Ce=v(S,K);ot(n.TEXTURE_CUBE_MAP,S);let Ge;if(S.isDepthTexture){if(ce=x(S.format===Zi,S.type),Xe)if(Re)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,ce,K.width,K.height);else for(let ge=0;ge<6;ge++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ce,K.width,K.height,0,de,oe,null)}else if(ue){Re&&Xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,ce,K.width,K.height);for(let ge=0;ge<6;ge++){Ge=j[ge].mipmaps;for(let lt=0;lt<Ge.length;lt++){const $t=Ge[lt];S.format!==ei?de!==null?Re?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt,0,0,$t.width,$t.height,de,$t.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt,ce,$t.width,$t.height,0,$t.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt,0,0,$t.width,$t.height,de,oe,$t.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt,ce,$t.width,$t.height,0,de,oe,$t.data)}}}else{if(Ge=S.mipmaps,Re&&Xe){Ge.length>0&&Ce++;const ge=Oe(j[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,ce,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(N){Re?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,j[ge].width,j[ge].height,de,oe,j[ge].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ce,j[ge].width,j[ge].height,0,de,oe,j[ge].data);for(let lt=0;lt<Ge.length;lt++){const Oi=Ge[lt].image[ge].image;Re?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt+1,0,0,Oi.width,Oi.height,de,oe,Oi.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt+1,ce,Oi.width,Oi.height,0,de,oe,Oi.data)}}else{Re?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,de,oe,j[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ce,de,oe,j[ge]);for(let lt=0;lt<Ge.length;lt++){const $t=Ge[lt];Re?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt+1,0,0,de,oe,$t.image[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,lt+1,ce,de,oe,$t.image[ge])}}}y(S)&&S.mipmapsAutoUpdate===!0&&b(n.TEXTURE_CUBE_MAP),le.__version=ee.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function Mt(D,S,z,re,ee,le){const fe=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),J=E(z.internalFormat,fe,Z,z.normalized,z.colorSpace),ue=i.get(S),N=i.get(z);if(N.__renderTarget=S,!ue.__hasExternalTextures){const j=Math.max(1,S.width>>le),K=Math.max(1,S.height>>le);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,le,J,j,K,S.depth,0,fe,Z,null):t.texImage2D(ee,le,J,j,K,0,fe,Z,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,re,ee,N.__webglTexture,0,_t(S)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,re,ee,N.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ri(D,S,z){if(n.bindRenderbuffer(n.RENDERBUFFER,D),S.depthBuffer){const re=S.depthTexture,ee=re&&re.isDepthTexture?re.type:null,le=x(S.stencilBuffer,ee),fe=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;me(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(S),le,S.width,S.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(S),le,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,le,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,fe,n.RENDERBUFFER,D)}else{const re=S.textures;for(let ee=0;ee<re.length;ee++){const le=re[ee],fe=r.convert(le.format,le.colorSpace),Z=r.convert(le.type),J=E(le.internalFormat,fe,Z,le.normalized,le.colorSpace);me(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(S),J,S.width,S.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(S),J,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,J,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Yt(D,S,z){const re=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ee=i.get(S.depthTexture);ee.__renderTarget=S;const le=re?S.depthTexture.image[0]:S.depthTexture.image;(!ee.__webglTexture||le.width!==S.width||le.height!==S.height)&&(le.width=S.width,le.height=S.height,S.depthTexture.needsUpdate=!0),re?ve(S.depthTexture,0):_e(S.depthTexture,0);const fe=ee.__webglTexture,Z=_t(S),J=re?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,ue=S.depthTexture.format===Zi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(S.depthTexture.format===Qi)me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,J,fe,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,ue,J,fe,0);else if(S.depthTexture.format===Zi)me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,J,fe,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,ue,J,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Un(D){const S=i.get(D),z=D.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==D.depthTexture){const re=D.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),re){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,re.removeEventListener("dispose",ee)};re.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=re}if(D.depthTexture&&!S.__autoAllocateDepthBuffer)if(z)for(let re=0;re<6;re++)Yt(S.__webglFramebuffer[re],D,re);else D.texture.mipmaps.length>0?Yt(S.__webglFramebuffer[0],D,0):Yt(S.__webglFramebuffer,D,0);else if(z){S.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[re]),S.__webglDepthbuffer[re]===void 0)S.__webglDepthbuffer[re]=n.createRenderbuffer(),ri(S.__webglDepthbuffer[re],D,!1);else{const ee=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=S.__webglDepthbuffer[re];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,le)}}else if(D.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),ri(S.__webglDepthbuffer,D,!1);else{const ee=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,le)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function On(D,S,z){const re=i.get(D);S!==void 0&&Mt(re.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Un(D)}function Fn(D){const S=D.texture,z=i.get(D),re=i.get(S);D.addEventListener("dispose",U),C(D);const ee=D.textures,le=D.isWebGLCubeRenderTarget===!0,fe=ee.length>1;if(fe||(re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture()),re.__version=S.version,a.memory.textures++),le){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(S.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let J=0;J<S.mipmaps.length;J++)z.__webglFramebuffer[Z][J]=n.createFramebuffer()}else z.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(S.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<S.mipmaps.length;Z++)z.__webglFramebuffer[Z]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(fe)for(let Z=0,J=ee.length;Z<J;Z++){const ue=i.get(ee[Z]);ue.__webglTexture===void 0&&(ue.__webglTexture=n.createTexture(),a.memory.textures++)}if(D.samples>0&&me(D)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<ee.length;Z++){const J=ee[Z];z.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);const ue=r.convert(J.format,J.colorSpace),N=r.convert(J.type),j=E(J.internalFormat,ue,N,J.normalized,J.colorSpace,D.isXRRenderTarget===!0),K=_t(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,K,j,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),ri(z.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),ot(n.TEXTURE_CUBE_MAP,S);for(let Z=0;Z<6;Z++)if(S.mipmaps.length>0)for(let J=0;J<S.mipmaps.length;J++)Mt(z.__webglFramebuffer[Z][J],D,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,J);else Mt(z.__webglFramebuffer[Z],D,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);y(S)?b(n.TEXTURE_CUBE_MAP):S.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}else if(fe){for(let Z=0,J=ee.length;Z<J;Z++){const ue=ee[Z],N=i.get(ue);let j=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(j=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,N.__webglTexture),ot(j,ue),Mt(z.__webglFramebuffer,D,ue,n.COLOR_ATTACHMENT0+Z,j,0),y(ue)&&b(j)}t.unbindTexture()}else{let Z=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Z=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Z,re.__webglTexture),ot(Z,S),S.mipmaps.length>0)for(let J=0;J<S.mipmaps.length;J++)Mt(z.__webglFramebuffer[J],D,S,n.COLOR_ATTACHMENT0,Z,J);else Mt(z.__webglFramebuffer,D,S,n.COLOR_ATTACHMENT0,Z,0);y(S)?b(Z):S.mipmaps.length>0&&n.texParameteri(Z,n.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}D.depthBuffer&&Un(D)}function F(D){const S=D.textures;for(let z=0,re=S.length;z<re;z++){const ee=S[z];if(y(ee)&&ee.mipmapsAutoUpdate===!0){const le=R(D),fe=i.get(ee).__webglTexture;t.bindTexture(le,fe),b(le),t.unbindTexture()}}}const Bn=[];function xt(D){if(D.samples>0){if(me(D)===!1){const S=D.textures,z=D.width,re=D.height;let ee=n.COLOR_BUFFER_BIT;const le=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(D),Z=S.length>1;if(Z)for(let ue=0;ue<S.length;ue++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),D.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ue=0;ue<S.length;ue++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[ue]);const N=i.get(S[ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,N,0)}n.blitFramebuffer(0,0,z,re,0,0,z,re,ee,n.NEAREST),l===!0&&(Bn.length=0,Bn.push(n.COLOR_ATTACHMENT0+ue),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&Bn.push(le),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Bn))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let ue=0;ue<S.length;ue++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,fe.__webglColorRenderbuffer[ue]);const N=i.get(S[ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,N,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&l){const S=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function _t(D){return Math.min(s.maxSamples,D.samples)}function me(D){const S=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function kt(D){const S=a.render.frame;u.get(D)!==S&&(u.set(D,S),D.update())}function Ie(D,S){const z=D.colorSpace,re=D.format,ee=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||z!==eo&&z!==$i&&(et.getTransfer(z)===ct?(re!==ei||ee!==Ln)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",z)),S}function Oe(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=Be,this.resetTextureUnits=te,this.getTextureUnits=ie,this.setTextureUnits=we,this.setTexture2D=_e,this.setTexture2DArray=ye,this.setTexture3D=Le,this.setTextureCube=ve,this.rebindTextures=On,this.setupRenderTarget=Fn,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Un,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=me,this.dispose=G}function Bv(n,e){function t(i,s=$i){let r;const a=et.getTransfer(s);if(i===Ln)return n.UNSIGNED_BYTE;if(i===Ic)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Nc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Rh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ch)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===wh)return n.BYTE;if(i===Ah)return n.SHORT;if(i===Fr)return n.UNSIGNED_SHORT;if(i===Lc)return n.INT;if(i===pi)return n.UNSIGNED_INT;if(i===Vn)return n.FLOAT;if(i===mi)return n.HALF_FLOAT;if(i===Dh)return n.ALPHA;if(i===Ph)return n.RGB;if(i===ei)return n.RGBA;if(i===Qi)return n.DEPTH_COMPONENT;if(i===Zi)return n.DEPTH_STENCIL;if(i===Uc)return n.RED;if(i===Oc)return n.RED_INTEGER;if(i===_s)return n.RG;if(i===Fc)return n.RG_INTEGER;if(i===Bc)return n.RGBA_INTEGER;if(i===za||i===ka||i===Ha||i===Ga)if(a===ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===za)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ka)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===za)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ka)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===wl||i===Al||i===Rl||i===Cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===wl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Dl||i===Pl||i===Ll||i===Il||i===Nl||i===Qa||i===Ul)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Dl||i===Pl)return a===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ll)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Il)return r.COMPRESSED_R11_EAC;if(i===Nl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Qa)return r.COMPRESSED_RG11_EAC;if(i===Ul)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ol||i===Fl||i===Bl||i===zl||i===kl||i===Hl||i===Gl||i===Vl||i===Wl||i===Xl||i===ql||i===Yl||i===$l||i===Kl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ol)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===zl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===kl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Hl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Gl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Xl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ql)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Yl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===$l)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Kl)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zl||i===Jl||i===Ql)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Zl)return a===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Jl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ql)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===jl||i===ec||i===ja||i===tc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===jl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ec)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ja)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ks?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const zv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Hv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new qh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new vs({vertexShader:zv,fragmentShader:kv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new Nn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gv extends ys{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,g=null;const M=typeof XRWebGLBinding<"u",m=new Hv,p={},_=t.getContextAttributes();let y=null,b=null;const R=[],E=[],x=new We;let v=null,C=null;const A=new Qn;A.viewport=new dt;const L=new Qn;L.viewport=new dt;const U=[A,L],k=new e0;let I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let _e=R[Q];return _e===void 0&&(_e=new Wo,R[Q]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(Q){let _e=R[Q];return _e===void 0&&(_e=new Wo,R[Q]=_e),_e.getGripSpace()},this.getHand=function(Q){let _e=R[Q];return _e===void 0&&(_e=new Wo,R[Q]=_e),_e.getHandSpace()};function $(Q){const _e=E.indexOf(Q.inputSource);if(_e===-1)return;const ye=R[_e];ye!==void 0&&(ye.update(Q.inputSource,Q.frame,c||a),ye.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",se);for(let Q=0;Q<R.length;Q++){const _e=E[Q];_e!==null&&(E[Q]=null,R[Q].disconnect(_e))}I=null,G=null,m.reset();for(const Q in p)delete p[Q];if(e.setRenderTarget(y),h=null,f=null,d=null,s=null,b=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(x.width,x.height,!1),C!==null){const Q=C.camera;Q.fov=C.fov,Q.zoom=C.zoom,Q.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",W),s.addEventListener("inputsourceschange",se),_.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(x),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Le=null,ve=null;_.depth&&(ve=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=_.stencil?Zi:Qi,Le=_.stencil?Ks:pi);const ke={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(ke),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new di(f.textureWidth,f.textureHeight,{format:ei,type:Ln,depthTexture:new Zs(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const ye={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new di(h.framebufferWidth,h.framebufferHeight,{format:ei,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Be.setContext(s),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(Q){for(let _e=0;_e<Q.removed.length;_e++){const ye=Q.removed[_e],Le=E.indexOf(ye);Le>=0&&(E[Le]=null,R[Le].disconnect(ye))}for(let _e=0;_e<Q.added.length;_e++){const ye=Q.added[_e];let Le=E.indexOf(ye);if(Le===-1){for(let ke=0;ke<R.length;ke++)if(ke>=E.length){E.push(ye),Le=ke;break}else if(E[ke]===null){E[ke]=ye,Le=ke;break}if(Le===-1)break}const ve=R[Le];ve&&ve.connect(ye)}}function q(Q,_e){_e===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(_e.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let _e=Q.near,ye=Q.far;m.texture!==null&&(m.depthNear>0&&(_e=m.depthNear),m.depthFar>0&&(ye=m.depthFar)),k.near=L.near=A.near=_e,k.far=L.far=A.far=ye,(I!==k.near||G!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),I=k.near,G=k.far),k.layers.mask=Q.layers.mask|6,A.layers.mask=k.layers.mask&-5,L.layers.mask=k.layers.mask&-3;const Le=Q.parent,ve=k.cameras;q(k,Le);for(let ke=0;ke<ve.length;ke++)q(ve[ke],Le);k.projectionMatrix.copy(A.projectionMatrix),k.projectionMatrixInverse.copy(A.projectionMatrixInverse),C===null&&Q.isPerspectiveCamera&&(C={camera:Q,fov:Q.fov,zoom:Q.zoom}),te(Q,k,Le)};function te(Q,_e,ye){ye===null?Q.matrix.copy(_e.matrixWorld):(Q.matrix.copy(ye.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(_e.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(_e.projectionMatrix),Q.projectionMatrixInverse.copy(_e.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=zr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(Q){return p[Q]};let ie=null;function we(Q,_e){if(u=_e.getViewerPose(c||a),g=_e,u!==null){const ye=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let Le=!1;ye.length!==k.cameras.length&&(k.cameras.length=0,Le=!0);for(let Ne=0;Ne<ye.length;Ne++){const ot=ye[Ne];let ht=null;if(h!==null)ht=h.getViewport(ot);else{const Qt=d.getViewSubImage(f,ot);ht=Qt.viewport,Ne===0&&(e.setRenderTargetTextures(b,Qt.colorTexture,Qt.depthStencilTexture),e.setRenderTarget(b))}let Ze=U[Ne];Ze===void 0&&(Ze=new Qn,Ze.layers.enable(Ne),Ze.viewport=new dt,U[Ne]=Ze),Ze.matrix.fromArray(ot.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(ot.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(ht.x,ht.y,ht.width,ht.height),Ne===0&&(k.matrix.copy(Ze.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Le===!0&&k.cameras.push(Ze)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const Ne=d.getDepthInformation(ye[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,s.renderState)}if(ve&&ve.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let Ne=0;Ne<ye.length;Ne++){const ot=ye[Ne].camera;if(ot){let ht=p[ot];ht||(ht=new qh,p[ot]=ht);const Ze=d.getCameraImage(ot);ht.sourceTexture=Ze}}}}for(let ye=0;ye<R.length;ye++){const Le=E[ye],ve=R[ye];Le!==null&&ve!==void 0&&ve.update(Le,_e,c||a)}ie&&ie(Q,_e),_e.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_e}),g=null}const Be=new Jh;Be.setAnimationLoop(we),this.setAnimationLoop=function(Q){ie=Q},this.dispose=function(){}}}const Vv=new Ye,lf=new Fe;lf.set(-1,0,0,0,1,0,0,0,1);function Wv(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Yh(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,_,y,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,_,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===yn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===yn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),y=_.envMap,b=_.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(Vv.makeRotationFromEuler(b)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(lf),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,_){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Xv(n,e,t,i){let s={},r={};function a(_,y){const b=y.program;i.uniformBlockBinding(_,b,s[_.id])}function o(_,y){let b=s[_.id];b===void 0&&(g(_),b=l(_),s[_.id]=b,_.addEventListener("dispose",m));const R=y.program;i.updateUBOMapping(_,R);const E=e.render.frame;r[_.id]!==E&&(c(_),r[_.id]=E)}function l(_){const y=n.createBuffer(),b=_.__size,R=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,b,R),n.bindBuffer(n.UNIFORM_BUFFER,null),y}function c(_){const y=s[_.id],b=_.uniforms,R=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let E=0,x=b.length;E<x;E++){const v=b[E];if(Array.isArray(v))for(let C=0,A=v.length;C<A;C++)u(v[C],E,C,R);else u(v,E,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(_,y,b,R){if(f(_,y,b,R)===!0){const E=_.__offset,x=_.value;if(Array.isArray(x)){let v=0;for(let C=0;C<x.length;C++){const A=x[C],L=M(A,!0);d(A,_.__data,v),v+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else d(x,_.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,E,_.__data)}}function d(_,y,b){typeof _=="number"||typeof _=="boolean"?y[b]=_:_.isMatrix3?(y[b]=_.elements[0],y[b+1]=_.elements[1],y[b+2]=_.elements[2],y[b+3]=0,y[b+4]=_.elements[3],y[b+5]=_.elements[4],y[b+6]=_.elements[5],y[b+7]=0,y[b+8]=_.elements[6],y[b+9]=_.elements[7],y[b+10]=_.elements[8],y[b+11]=0):ArrayBuffer.isView(_)?y.set(_.subarray(0,y.length-b),b):_.toArray(y,b)}function f(_,y,b,R){const E=_.value,x=y+"_"+b;if(Array.isArray(E)){R[x]===void 0&&(R[x]=[]);const v=R[x];let C=!1;for(let A=0;A<E.length;A++)h(E[A],v,A)===!0&&(C=!0);return C}return h(E,R,x)}function h(_,y,b){if(y[b]===void 0)return typeof _=="number"||typeof _=="boolean"?y[b]=_:ArrayBuffer.isView(_)?y[b]=_.slice():y[b]=_.clone(),!0;{const R=y[b];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return y[b]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function g(_){const y=_.uniforms;let b=0;const R=16;for(let x=0,v=y.length;x<v;x++){const C=Array.isArray(y[x])?y[x]:[y[x]];for(let A=0,L=C.length;A<L;A++){const U=C[A],k=Array.isArray(U.value)?U.value:[U.value],I=Array.isArray(y[x])||Array.isArray(U.value);let G=b;for(let W=0,se=k.length;W<se;W++){const q=k[W],te=M(q,I),ie=b%R,we=ie%te.boundary,Be=ie+we;b+=we,Be!==0&&R-Be<te.storage&&(b+=R-Be),W===0&&(G=b),b+=te.storage}const $=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new $((b-G)/Float32Array.BYTES_PER_ELEMENT),U.__offset=G}}const E=b%R;return E>0&&(b+=R-E),_.__size=b,_.__cache={},this}function M(_,y){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=16,b.storage=48):_.isMatrix4?(b.boundary=16,b.storage=64):_.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(b.boundary=16,b.storage=_.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",_),y===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(_){const y=_.target;y.removeEventListener("dispose",m),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const _ in s)n.deleteBuffer(s[_]);s={},r={}}return{bind:a,update:o,dispose:p}}const qv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let oi=null;function Yv(){return oi===null&&(oi=new qc(qv,16,16,_s,mi),oi.name="DFG_LUT",oi.minFilter=Sn,oi.magFilter=Sn,oi.wrapS=Ai,oi.wrapT=Ai,oi.generateMipmaps=!1,oi.needsUpdate=!0),oi}class $v{constructor(e={}){const{canvas:t=Yp(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=Ln}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const M=h,m=new Set([Bc,Fc,Oc]),p=new Set([Ln,pi,Fr,Ks,Ic,Nc]),_=new Uint32Array(4),y=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]};let R=null,E=null;const x=[],v=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let L=!1,U=null,k=null,I=null,G=null;this._outputColorSpace=Bt;let $=0,W=0,se=null,q=-1,te=null;const ie=new dt,we=new dt;let Be=null;const Q=new He(0);let _e=0,ye=t.width,Le=t.height,ve=1,ke=null,Ut=null;const Ne=new dt(0,0,ye,Le),ot=new dt(0,0,ye,Le);let ht=!1;const Ze=new kr,Qt=new $c;let zt=!1,_n=!1;const Mt=new Ye,ri=new P,Yt=new dt,Un={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let On=!1;function Fn(){return se===null?ve:1}let F=i;function Bn(w,O){return t.getContext(w,O)}let xt,_t,me,kt,Ie,Oe,D,S,z,re,ee,le,fe,Z,J,ue,N,j,K,de,oe,ce,Re;try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dc}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",Ge,!1),t.addEventListener("webglcontextcreationerror",ge,!1),F===null){const O="webgl2";if(F=Bn(O,w),F===null)throw Bn(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Xe()}catch(w){throw t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",Ge,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),rt("WebGLRenderer: "+w.message),w}function Xe(){xt=new Jx(F),xt.init(),oe=new Bv(F,xt),_t=new kx(F,xt,e,oe),me=new Ov(F,xt),_t.reversedDepthBuffer&&f&&me.buffers.depth.setReversed(!0),k=F.createFramebuffer(),I=F.createFramebuffer(),G=F.createFramebuffer(),kt=new e_(F),Ie=new yv,Oe=new Fv(F,xt,me,Ie,_t,oe,kt),D=new Zx(A),S=new n0(F),ce=new Bx(F,S),z=new Qx(F,S,kt,ce),re=new n_(F,z,S,ce,kt),j=new t_(F,_t,Oe),J=new Hx(Ie),ee=new Sv(A,D,xt,_t,ce,J),le=new Wv(A,Ie),fe=new bv,Z=new Dv(xt),N=new Fx(A,D,me,re,g,l),ue=new Uv(A,re,_t),Re=new Xv(F,kt,_t,me),K=new zx(F,xt,kt),de=new jx(F,xt,kt),kt.programs=ee.programs,A.capabilities=_t,A.extensions=xt,A.properties=Ie,A.renderLists=fe,A.shadowMap=ue,A.state=me,A.info=kt}M!==Ln&&(C=new s_(M,t.width,t.height,o,s,r));const ae=new Gv(A,F);this.xr=ae,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const w=xt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=xt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(w){w!==void 0&&(ve=w,this.setSize(ye,Le,!1))},this.getSize=function(w){return w.set(ye,Le)},this.setSize=function(w,O,X=!0){if(ae.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=w,Le=O,t.width=Math.floor(w*ve),t.height=Math.floor(O*ve),X===!0&&(t.style.width=w+"px",t.style.height=O+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(ye*ve,Le*ve).floor()},this.setDrawingBufferSize=function(w,O,X){ye=w,Le=O,ve=X,t.width=Math.floor(w*X),t.height=Math.floor(O*X),this.setViewport(0,0,w,O)},this.setEffects=function(w){if(M===Ln){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let O=0;O<w.length;O++)if(w[O].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ie)},this.getViewport=function(w){return w.copy(Ne)},this.setViewport=function(w,O,X,B){w.isVector4?Ne.set(w.x,w.y,w.z,w.w):Ne.set(w,O,X,B),me.viewport(ie.copy(Ne).multiplyScalar(Fn()).round())},this.getScissor=function(w){return w.copy(ot)},this.setScissor=function(w,O,X,B){w.isVector4?ot.set(w.x,w.y,w.z,w.w):ot.set(w,O,X,B),me.scissor(we.copy(ot).multiplyScalar(Fn()).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(w){me.setScissorTest(ht=w)},this.setOpaqueSort=function(w){ke=w},this.setTransparentSort=function(w){Ut=w},this.getClearColor=function(w){return w.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(w=!0,O=!0,X=!0){let B=0;if(w){let H=!1;if(se!==null){const pe=se.texture.format;H=m.has(pe)}if(H){const pe=se.texture.type,Se=p.has(pe),he=N.getClearColor(),Me=N.getClearAlpha(),Ae=he.r,ze=he.g,Je=he.b;Se?(_[0]=Ae,_[1]=ze,_[2]=Je,_[3]=Me,F.clearBufferuiv(F.COLOR,0,_)):(y[0]=Ae,y[1]=ze,y[2]=Je,y[3]=Me,F.clearBufferiv(F.COLOR,0,y))}else B|=F.COLOR_BUFFER_BIT}O&&(B|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(B|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&F.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),U=w},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",Ge,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),N.dispose(),fe.dispose(),Z.dispose(),Oe.dispose(),Ie.dispose(),D.dispose(),re.dispose(),z.dispose(),ce.dispose(),Re.dispose(),ee.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Ru),ae.removeEventListener("sessionend",Cu),ns.stop()};function Ce(w){w.preventDefault(),io("WebGLRenderer: Context Lost."),L=!0}function Ge(){io("WebGLRenderer: Context Restored."),L=!1;const w=kt.autoReset,O=ue.enabled,X=ue.autoUpdate,B=ue.needsUpdate,H=ue.type;Xe(),kt.autoReset=w,ue.enabled=O,ue.autoUpdate=X,ue.needsUpdate=B,ue.type=H}function ge(w){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function lt(w){const O=w.target;O.removeEventListener("dispose",lt),$t(O)}function $t(w){Oi(w),Ie.remove(w)}function Oi(w){const O=Ie.get(w).programs;O!==void 0&&(O.forEach(function(X){ee.releaseProgram(X)}),w.isShaderMaterial&&ee.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,X,B,H,pe){O===null&&(O=Un);const Se=H.isMesh&&H.matrixWorld.determinantAffine()<0,he=cp(w,O,X,B,H);me.setMaterial(B,Se);let Me=X.index,Ae=1;if(B.wireframe===!0){if(Me=z.getWireframeAttribute(X),Me===void 0)return;Ae=2}const ze=X.drawRange,Je=X.attributes.position;let Ee=ze.start*Ae,Qe=(ze.start+ze.count)*Ae;pe!==null&&(Ee=Math.max(Ee,pe.start*Ae),Qe=Math.min(Qe,(pe.start+pe.count)*Ae)),Me!==null?(Ee=Math.max(Ee,0),Qe=Math.min(Qe,Me.count)):Je!=null&&(Ee=Math.max(Ee,0),Qe=Math.min(Qe,Je.count));const Ot=Qe-Ee;if(Ot<0||Ot===1/0)return;ce.setup(H,B,he,X,Me);let pt,ft=K;if(Me!==null&&(pt=S.get(Me),ft=de,ft.setIndex(pt)),H.isMesh)B.wireframe===!0?(me.setLineWidth(B.wireframeLinewidth*Fn()),ft.setMode(F.LINES)):ft.setMode(F.TRIANGLES);else if(H.isLine){let sn=B.linewidth;sn===void 0&&(sn=1),me.setLineWidth(sn*Fn()),H.isLineSegments?ft.setMode(F.LINES):H.isLineLoop?ft.setMode(F.LINE_LOOP):ft.setMode(F.LINE_STRIP)}else H.isPoints?ft.setMode(F.POINTS):H.isSprite&&ft.setMode(F.TRIANGLES);if(H.isBatchedMesh)if(xt.get("WEBGL_multi_draw"))ft.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const sn=H._multiDrawStarts,be=H._multiDrawCounts,dn=H._multiDrawCount,at=Me?S.get(Me).bytesPerElement:1,is=Ie.get(B).currentProgram.getUniforms();for(let rn=0;rn<dn;rn++)is.setValue(F,"_gl_DrawID",rn),ft.render(sn[rn]/at,be[rn])}else if(H.isInstancedMesh)ft.renderInstances(Ee,Ot,H.count);else if(X.isInstancedBufferGeometry){const sn=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,be=Math.min(X.instanceCount,sn);ft.renderInstances(Ee,Ot,be)}else ft.render(Ee,Ot)};function Au(w,O,X,B){U!==null&&w.isNodeMaterial&&U.setObject(B,w),zt===!0&&J.setState(w,X,!1),w.transparent===!0&&w.side===Vt&&w.forceSinglePass===!1?(w.side=yn,w.needsUpdate=!0,rr(w,O,B),w.side=xs,w.needsUpdate=!0,rr(w,O,B),w.side=Vt):rr(w,O,B)}this.compile=function(w,O,X=null){X===null&&(X=w),U!==null&&U.renderStart(w,O,X),E=Z.get(X),E.init(O),v.push(E),X.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),w!==X&&w.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(E.pushLight(H),H.castShadow&&E.pushShadow(H))}),E.setupLights(),U!==null&&U.updateLights(E.state.lightsArray),_n=this.localClippingEnabled,zt=J.init(this.clippingPlanes,_n),zt===!0&&J.setGlobalState(this.clippingPlanes,O),U!==null&&ue.render(E.state.shadowsArray,X,O);const B=new Set;return w.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let Se=0;Se<pe.length;Se++){const he=pe[Se];Au(he,X,O,H),B.add(he)}else Au(pe,X,O,H),B.add(pe)}),E=v.pop(),U!==null&&U.renderEnd(),B},this.compileAsync=function(w,O,X=null){const B=this.compile(w,O,X);return new Promise(H=>{function pe(){if(B.forEach(function(Se){const Me=Ie.get(Se).currentProgram;(Me===void 0||Me.isReady())&&B.delete(Se)}),B.size===0){H(w);return}setTimeout(pe,10)}xt.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Io=null;function op(w){Io&&Io(w)}function Ru(){ns.stop()}function Cu(){ns.start()}const ns=new Jh;ns.setAnimationLoop(op),typeof self<"u"&&ns.setContext(self),this.setAnimationLoop=function(w){Io=w,ae.setAnimationLoop(w),w===null?ns.stop():ns.start()},ae.addEventListener("sessionstart",Ru),ae.addEventListener("sessionend",Cu),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;U!==null&&U.renderStart(w,O);const X=ae.enabled===!0&&ae.isPresenting===!0,B=C!==null&&(se===null||X)&&C.begin(A,se);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(O),O=ae.getCamera()),w.isScene===!0&&w.onBeforeRender(A,w,O,se),E=Z.get(w,v.length),E.init(O),E.state.textureUnits=Oe.getTextureUnits(),v.push(E),Mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?Qt.setFromArrayCamera(O):Ze.setFromProjectionMatrix(Mt,ti,O.reversedDepth),_n=this.localClippingEnabled,zt=J.init(this.clippingPlanes,_n),R=fe.get(w,x.length),R.init(),x.push(R),this.info.render.frame++,ae.enabled===!0&&ae.isPresenting===!0){const Se=A.xr.getDepthSensingMesh();Se!==null&&No(Se,O,-1/0,A.sortObjects)}No(w,O,0,A.sortObjects),R.finish(),U!==null&&U.updateLights(E.state.lightsArray),A.sortObjects===!0&&R.sort(ke,Ut),On=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,On&&N.addToRenderList(R,w),this.info.autoReset===!0&&this.info.reset(),zt===!0&&J.beginShadows();const H=E.state.shadowsArray;if(ue.render(H,w,O),zt===!0&&J.endShadows(),(B&&C.hasRenderPass())===!1){const Se=R.opaque,he=R.transmissive;if(E.setupLights(),O.isArrayCamera){const Me=O.cameras;if(he.length>0)for(let Ae=0,ze=Me.length;Ae<ze;Ae++){const Je=Me[Ae];Pu(Se,he,w,Je)}On&&N.render(w);for(let Ae=0,ze=Me.length;Ae<ze;Ae++){const Je=Me[Ae];Du(R,w,Je,Je.viewport)}}else he.length>0&&Pu(Se,he,w,O),On&&N.render(w),Du(R,w,O)}se!==null&&W===0&&(Oe.updateMultisampleRenderTarget(se),Oe.updateRenderTargetMipmap(se)),B&&C.end(A),w.isScene===!0&&w.onAfterRender(A,w,O),ce.resetDefaultState(),q=-1,te=null,v.pop(),v.length>0?(E=v[v.length-1],Oe.setTextureUnits(E.state.textureUnits),zt===!0&&J.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,x.pop(),x.length>0?R=x[x.length-1]:R=null,U!==null&&U.renderEnd()};function No(w,O,X,B){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)E.pushLight(w),w.castShadow&&E.pushShadow(w);else if(w.isSprite){const Se=O.isArrayCamera?Qt:Ze;if(!w.frustumCulled||w.intersectsFrustum(Se)){B&&Yt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Mt);const he=re.update(w),Me=w.material;Me.visible&&R.push(w,he,Me,X,Yt.z,null,O)}}else if(w.isMesh||w.isLine||w.isPoints){const Se=O.isArrayCamera?Qt:Ze;if(!w.frustumCulled||w.intersectsFrustum(Se)){const he=re.update(w),Me=w.material;if(B&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Yt.copy(w.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Yt.copy(he.boundingSphere.center)),Yt.applyMatrix4(w.matrixWorld).applyMatrix4(Mt)),Array.isArray(Me)){const Ae=he.groups;for(let ze=0,Je=Ae.length;ze<Je;ze++){const Ee=Ae[ze],Qe=Me[Ee.materialIndex];Qe&&Qe.visible&&R.push(w,he,Qe,X,Yt.z,Ee,O)}}else Me.visible&&R.push(w,he,Me,X,Yt.z,null,O)}}}const pe=w.children;for(let Se=0,he=pe.length;Se<he;Se++)No(pe[Se],O,X,B)}function Du(w,O,X,B){const{opaque:H,transmissive:pe,transparent:Se}=w;E.setupLightsView(X),zt===!0&&J.setGlobalState(A.clippingPlanes,X),B&&me.viewport(ie.copy(B)),H.length>0&&ra(H,O,X),pe.length>0&&ra(pe,O,X),Se.length>0&&ra(Se,O,X),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Pu(w,O,X,B){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[B.id]===void 0){const Ee=xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[B.id]=new di(1,1,{generateMipmaps:!0,type:Ee?mi:Ln,minFilter:Ki,samples:Math.max(4,_t.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}const pe=E.state.transmissionRenderTarget[B.id],Se=B.viewport||ie;pe.setSize(Se.z*A.transmissionResolutionScale,Se.w*A.transmissionResolutionScale);const he=A.getRenderTarget(),Me=A.getActiveCubeFace(),Ae=A.getActiveMipmapLevel();A.setRenderTarget(pe),A.getClearColor(Q),_e=A.getClearAlpha(),_e<1&&A.setClearColor(16777215,.5),A.clear(),On&&N.render(X);const ze=A.toneMapping;A.toneMapping=Ci;const Je=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),E.setupLightsView(B),zt===!0&&J.setGlobalState(A.clippingPlanes,B),ra(w,X,B),Oe.updateMultisampleRenderTarget(pe),Oe.updateRenderTargetMipmap(pe),xt.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Qe=0,Ot=O.length;Qe<Ot;Qe++){const pt=O[Qe],{object:ft,geometry:sn,material:be,group:dn}=pt;if(be.side===Vt&&ft.layers.test(B.layers)){const at=be.side;be.side=yn,be.needsUpdate=!0,Lu(ft,X,B,sn,be,dn),be.side=at,be.needsUpdate=!0,Ee=!0}}Ee===!0&&(Oe.updateMultisampleRenderTarget(pe),Oe.updateRenderTargetMipmap(pe))}A.setRenderTarget(he,Me,Ae),A.setClearColor(Q,_e),Je!==void 0&&(B.viewport=Je),A.toneMapping=ze}function ra(w,O,X){const B=O.isScene===!0?O.overrideMaterial:null;for(let H=0,pe=w.length;H<pe;H++){const Se=w[H],{object:he,geometry:Me,group:Ae}=Se;let ze=Se.material;ze.allowOverride===!0&&B!==null&&(ze=B),he.layers.test(X.layers)&&Lu(he,O,X,Me,ze,Ae)}}function Lu(w,O,X,B,H,pe){U!==null&&H.isNodeMaterial&&U.setObject(w,H),w.onBeforeRender(A,O,X,B,H,pe),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),H.onBeforeRender(A,O,X,B,w,pe),H.transparent===!0&&H.side===Vt&&H.forceSinglePass===!1?(H.side=yn,H.needsUpdate=!0,A.renderBufferDirect(X,O,B,H,w,pe),H.side=xs,H.needsUpdate=!0,A.renderBufferDirect(X,O,B,H,w,pe),H.side=Vt):A.renderBufferDirect(X,O,B,H,w,pe),w.onAfterRender(A,O,X,B,H,pe)}function Iu(w){let O=0;for(const X of w)X.texture!==null&&O++;return O}function rr(w,O,X){O.isScene!==!0&&(O=Un);const B=Ie.get(w),H=E.state.lights,pe=E.state.shadowsArray,Se=H.state.version,he=ee.getParameters(w,H.state,pe,O,X,E.state.lightProbeGridArray),Me=ee.getProgramCacheKey(he);let Ae=B.programs;B.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?O.environment:null,B.fog=O.fog;const ze=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;B.envMap=D.get(w.envMap||B.environment,ze),B.envMapRotation=B.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Ae===void 0&&(w.addEventListener("dispose",lt),Ae=new Map,B.programs=Ae,B.programVariants=new Map);let Je=Ae.get(Me);if(Je!==void 0){if(B.currentProgram===Je&&B.lightsStateVersion===Se)return Uu(w,he),Je}else he.uniforms=ee.getUniforms(w),U!==null&&w.isNodeMaterial&&U.build(w,X,he),w.onBeforeCompile(he,A),Je=ee.acquireProgram(he,Me),Ae.set(Me,Je),B.uniforms=he.uniforms;const Ee=B.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ee.clippingPlanes=J.uniform),Uu(w,he),B.needsLights=dp(w),B.lightsStateVersion=Se,B.needsLights&&(Ee.ambientLightColor.value=H.state.ambient,Ee.lightProbe.value=H.state.probe,Ee.sunLights.value=H.state.sun,Ee.sunLightShadows.value=H.state.sunShadow,Ee.directionalLights.value=H.state.directional,Ee.directionalLightShadows.value=H.state.directionalShadow,Ee.spotLights.value=H.state.spot,Ee.spotLightShadows.value=H.state.spotShadow,Ee.rectAreaLights.value=H.state.rectArea,Ee.ltc_1.value=H.state.rectAreaLTC1,Ee.ltc_2.value=H.state.rectAreaLTC2,Ee.pointLights.value=H.state.point,Ee.pointLightShadows.value=H.state.pointShadow,Ee.hemisphereLights.value=H.state.hemi,Ee.sunShadowMatrix.value=H.state.sunShadowMatrix,Ee.sunShadowCascade.value=H.state.sunShadowCascade,Ee.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ee.spotLightMatrix.value=H.state.spotLightMatrix,Ee.spotLightMap.value=H.state.spotLightMap,Ee.pointShadowMatrix.value=H.state.pointShadowMatrix),B.numLightProbeGrids=Iu(E.state.lightProbeGridArray),B.currentProgram=Je,B.uniformsList=null,Je}function lp(w,O,X,B,H){const pe=Ie.get(w),Se=pe.currentProgram.id+","+B+","+H;let he=pe.programVariants.get(Se);return he===void 0?(he=rr(w,O,X),pe.programVariants.set(Se,he)):(pe.currentProgram=he,pe.uniformsList=null,pe.outputColorSpace=B,pe.toneMapping=H),he}function Nu(w){if(w.uniformsList===null){const O=w.currentProgram.getUniforms();w.uniformsList=Wa.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Uu(w,O){const X=Ie.get(w);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function cp(w,O,X,B,H){O.isScene!==!0&&(O=Un),Oe.resetTextureUnits();const pe=O.fog,Se=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?O.environment:null,he=se===null?A.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:et.workingColorSpace,Me=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Ae=D.get(B.envMap||Se,Me),ze=B.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Je=!!X.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ee=!!X.morphAttributes.position,Qe=!!X.morphAttributes.normal,Ot=!!X.morphAttributes.color;let pt=Ci;B.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(pt=A.toneMapping);const ft=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,sn=ft!==void 0?ft.length:0,be=Ie.get(B),dn=E.state.lights;if(zt===!0&&(_n===!0||w!==te)){const St=w===te&&B.id===q;J.setState(B,w,St)}let at=!1,is=!1;B.version===be.__version?be.needsLights&&be.lightsStateVersion!==dn.state.version||H.isBatchedMesh&&be.batching===!1||!H.isBatchedMesh&&be.batching===!0||H.isBatchedMesh&&be.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&be.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&be.instancing===!1||!H.isInstancedMesh&&be.instancing===!0||H.isSkinnedMesh&&be.skinning===!1||!H.isSkinnedMesh&&be.skinning===!0||H.isInstancedMesh&&be.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&be.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&be.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&be.instancingMorph===!1&&H.morphTexture!==null||be.envMap!==Ae||B.fog===!0&&be.fog!==pe||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==J.numPlanes||be.numIntersection!==J.numIntersection)||be.vertexAlphas!==ze||be.vertexTangents!==Je||be.morphTargets!==Ee||be.morphNormals!==Qe||be.morphColors!==Ot||be.morphTargetsCount!==sn||be.numLightProbeGrids!==Iu(E.state.lightProbeGridArray)?at=!0:(be.outputColorSpace!==he||be.toneMapping!==pt)&&(is=!0):(at=!0,be.__version=B.version);let rn=be.currentProgram;(at===!0||is===!0)&&(rn=is===!0?lp(B,O,H,he,pt):rr(B,O,H),U&&B.isNodeMaterial&&U.onUpdateProgram(B,rn,be));let aa=!1,Fi=!1,ss=!1;const it=rn.getUniforms(),jt=be.uniforms;if(me.useProgram(rn.program)&&(aa=!0,Fi=!0,ss=!0),B.id!==q&&(q=B.id,Fi=!0),aa||te!==w){me.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),it.setValue(F,"projectionMatrix",w.projectionMatrix),it.setValue(F,"viewMatrix",w.matrixWorldInverse);const Kt=it.map.cameraPosition;Kt!==void 0&&Kt.setValue(F,ri.setFromMatrixPosition(w.matrixWorld)),_t.logarithmicDepthBuffer&&it.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&it.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),te!==w&&(te=w,Fi=!0,ss=!0)}if(be.needsLights&&(dn.state.sunShadowMap.length>0&&it.setValue(F,"sunShadowMap",dn.state.sunShadowMap,Oe),dn.state.directionalShadowMap.length>0&&it.setValue(F,"directionalShadowMap",dn.state.directionalShadowMap,Oe),dn.state.spotShadowMap.length>0&&it.setValue(F,"spotShadowMap",dn.state.spotShadowMap,Oe),dn.state.pointShadowMap.length>0&&it.setValue(F,"pointShadowMap",dn.state.pointShadowMap,Oe)),H.isSkinnedMesh){it.setOptional(F,H,"bindMatrix"),it.setOptional(F,H,"bindMatrixInverse");const St=H.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),it.setValue(F,"boneTexture",St.boneTexture,Oe))}H.isBatchedMesh&&(it.setOptional(F,H,"batchingTexture"),it.setValue(F,"batchingTexture",H._matricesTexture,Oe),it.setOptional(F,H,"batchingIdTexture"),it.setValue(F,"batchingIdTexture",H._indirectTexture,Oe),it.setOptional(F,H,"batchingColorTexture"),H._colorsTexture!==null&&it.setValue(F,"batchingColorTexture",H._colorsTexture,Oe));const qn=X.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&j.update(H,X,rn),(Fi||be.receiveShadow!==H.receiveShadow)&&(be.receiveShadow=H.receiveShadow,it.setValue(F,"receiveShadow",H.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&O.environment!==null&&(jt.envMapIntensity.value=O.environmentIntensity),jt.dfgLUT!==void 0&&(jt.dfgLUT.value=Yv()),Fi){if(it.setValue(F,"toneMappingExposure",A.toneMappingExposure),be.needsLights&&up(jt,ss),pe&&B.fog===!0&&le.refreshFogUniforms(jt,pe),le.refreshMaterialUniforms(jt,B,ve,Le,E.state.transmissionRenderTarget[w.id]),be.needsLights&&be.numLightProbeGrids>0){const St=b;let Kt=0;for(const _i of E.state.lightProbeGridArray)_i.texture!==null&&(St.textures[Kt]=_i.texture,St.min[Kt]=_i.boundingBox.min,St.max[Kt]=_i.boundingBox.max,St.resolution[Kt]=_i.resolution,Kt++);for(const _i in St)St[_i].length=Kt;jt.probesSH.value=St.textures,jt.probesMin.value=St.min,jt.probesMax.value=St.max,jt.probesResolution.value=St.resolution}Wa.upload(F,Nu(be),jt,Oe)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Wa.upload(F,Nu(be),jt,Oe),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&it.setValue(F,"center",H.center),it.setValue(F,"modelViewMatrix",H.modelViewMatrix),it.setValue(F,"normalMatrix",H.normalMatrix),it.setValue(F,"modelMatrix",H.matrixWorld),B.uniformsGroups!==void 0){const St=B.uniformsGroups;for(let Kt=0,_i=St.length;Kt<_i;Kt++){const Fu=St[Kt];Re.update(Fu,rn),Re.bind(Fu,rn)}}return rn}function up(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.sunLights.needsUpdate=O,w.sunLightShadows.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function dp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(w,O,X){const B=Ie.get(w);B.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),Ie.get(w.texture).__webglTexture=O,Ie.get(w.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:X,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,O){const X=Ie.get(w);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,X=0){se=w,$=O,W=X;let B=null,H=!1,pe=!1;if(w){const he=Ie.get(w);if(he.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(F.FRAMEBUFFER,he.__webglFramebuffer),ie.copy(w.viewport),we.copy(w.scissor),Be=w.scissorTest,me.viewport(ie),me.scissor(we),me.setScissorTest(Be),q=-1;return}else if(he.__webglFramebuffer===void 0)Oe.setupRenderTarget(w);else if(he.__hasExternalTextures)Oe.rebindTextures(w,Ie.get(w.texture).__webglTexture,Ie.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ze=w.depthTexture;if(he.__boundDepthTexture!==ze){if(ze!==null&&Ie.has(ze)&&(w.width!==ze.image.width||w.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(w)}}const Me=w.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(pe=!0);const Ae=Ie.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ae[O])?B=Ae[O][X]:B=Ae[O],H=!0):w.samples>0&&Oe.useMultisampledRTT(w)===!1?B=Ie.get(w).__webglMultisampledFramebuffer:Array.isArray(Ae)?B=Ae[X]:B=Ae,ie.copy(w.viewport),we.copy(w.scissor),Be=w.scissorTest}else ie.copy(Ne).multiplyScalar(ve).floor(),we.copy(ot).multiplyScalar(ve).floor(),Be=ht;if(X!==0&&(B=k),me.bindFramebuffer(F.FRAMEBUFFER,B)&&me.drawBuffers(w,B),me.viewport(ie),me.scissor(we),me.setScissorTest(Be),H){const he=Ie.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,he.__webglTexture,X)}else if(pe){const he=O;for(let Me=0;Me<w.textures.length;Me++){const Ae=Ie.get(w.textures[Me]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Me,Ae.__webglTexture,X,he)}}else if(w!==null&&X!==0){const he=Ie.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,he.__webglTexture,X)}q=-1};function Ou(w){const O=Ie.get(w);return(O.__readFormat!==w.format||O.__readType!==w.type)&&(O.__readFormat=w.format,O.__readType=w.type,O.__formatReadable=_t.textureFormatReadable(w.format),O.__typeReadable=_t.textureTypeReadable(w.type)),O}this.readRenderTargetPixels=function(w,O,X,B,H,pe,Se,he=0){if(!(w&&w.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ie.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Se!==void 0&&(Me=Me[Se],Array.isArray(Me)&&(Me=Me[0])),Me){me.bindFramebuffer(F.FRAMEBUFFER,Me);try{const Ae=w.textures[he],ze=Ae.format,Je=Ae.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+he);const Ee=Ou(Ae);if(Ee.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-B&&X>=0&&X<=w.height-H&&F.readPixels(O,X,B,H,oe.convert(ze),oe.convert(Je),pe)}finally{const Ae=se!==null?Ie.get(se).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(w,O,X,B,H,pe,Se,he=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Ie.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Se!==void 0&&(Me=Me[Se],Array.isArray(Me)&&(Me=Me[0])),Me)if(O>=0&&O<=w.width-B&&X>=0&&X<=w.height-H){me.bindFramebuffer(F.FRAMEBUFFER,Me);const Ae=w.textures[he],ze=Ae.format,Je=Ae.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+he);const Ee=Ou(Ae);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Qe),F.bufferData(F.PIXEL_PACK_BUFFER,pe.byteLength,F.STREAM_READ),F.readPixels(O,X,B,H,oe.convert(ze),oe.convert(Je),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const Ot=se!==null?Ie.get(se).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,Ot);const pt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await $p(F,pt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Qe),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,pe),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(Qe),F.deleteSync(pt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,O=null,X=0){const B=Math.pow(2,-X),H=Math.floor(w.image.width*B),pe=Math.floor(w.image.height*B),Se=O!==null?O.x:0,he=O!==null?O.y:0;Oe.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,Se,he,H,pe),me.unbindTexture()},this.copyTextureToTexture=function(w,O,X=null,B=null,H=0,pe=0){let Se,he,Me,Ae,ze,Je,Ee,Qe,Ot;const pt=w.isCompressedTexture?w.mipmaps[pe]:w.image;if(X!==null)Se=X.max.x-X.min.x,he=X.max.y-X.min.y,Me=X.isBox3?X.max.z-X.min.z:1,Ae=X.min.x,ze=X.min.y,Je=X.isBox3?X.min.z:0;else{const it=Math.pow(2,-H);Se=Math.floor(pt.width*it),he=Math.floor(pt.height*it),w.isDataArrayTexture?Me=pt.depth:w.isData3DTexture?Me=Math.floor(pt.depth*it):Me=1,Ae=0,ze=0,Je=0}B!==null?(Ee=B.x,Qe=B.y,Ot=B.z):(Ee=0,Qe=0,Ot=0);const ft=oe.convert(O.format),sn=oe.convert(O.type);let be;O.isData3DTexture?(Oe.setTexture3D(O,0),be=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Oe.setTexture2DArray(O,0),be=F.TEXTURE_2D_ARRAY):(Oe.setTexture2D(O,0),be=F.TEXTURE_2D),me.activeTexture(F.TEXTURE0),me.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),me.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),me.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);const dn=me.getParameter(F.UNPACK_ROW_LENGTH),at=me.getParameter(F.UNPACK_IMAGE_HEIGHT),is=me.getParameter(F.UNPACK_SKIP_PIXELS),rn=me.getParameter(F.UNPACK_SKIP_ROWS),aa=me.getParameter(F.UNPACK_SKIP_IMAGES);me.pixelStorei(F.UNPACK_ROW_LENGTH,pt.width),me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pt.height),me.pixelStorei(F.UNPACK_SKIP_PIXELS,Ae),me.pixelStorei(F.UNPACK_SKIP_ROWS,ze),me.pixelStorei(F.UNPACK_SKIP_IMAGES,Je);const Fi=w.isDataArrayTexture||w.isData3DTexture,ss=O.isDataArrayTexture||O.isData3DTexture;if(w.isDepthTexture){const it=Ie.get(w),jt=Ie.get(O),qn=Ie.get(it.__renderTarget),St=Ie.get(jt.__renderTarget);me.bindFramebuffer(F.READ_FRAMEBUFFER,qn.__webglFramebuffer),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Kt=0;Kt<Me;Kt++)Fi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ie.get(w).__webglTexture,H,Je+Kt),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ie.get(O).__webglTexture,pe,Ot+Kt)),F.blitFramebuffer(Ae,ze,Ae+Se,ze+he,Ee,Qe,Ee+Se,Qe+he,F.DEPTH_BUFFER_BIT,F.NEAREST);me.bindFramebuffer(F.READ_FRAMEBUFFER,null),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(H!==0||w.isRenderTargetTexture||Ie.has(w)){const it=Ie.get(w),jt=Ie.get(O);me.bindFramebuffer(F.READ_FRAMEBUFFER,I),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,G);for(let qn=0;qn<Me;qn++)Fi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,it.__webglTexture,H,Je+qn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,it.__webglTexture,H),ss?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,jt.__webglTexture,pe,Ot+qn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,jt.__webglTexture,pe),H!==0?F.blitFramebuffer(Ae,ze,Ae+Se,ze+he,Ee,Qe,Ee+Se,Qe+he,F.COLOR_BUFFER_BIT,F.NEAREST):ss?F.copyTexSubImage3D(be,pe,Ee,Qe,Ot+qn,Ae,ze,Se,he):F.copyTexSubImage2D(be,pe,Ee,Qe,Ae,ze,Se,he);me.bindFramebuffer(F.READ_FRAMEBUFFER,null),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ss?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(be,pe,Ee,Qe,Ot,Se,he,Me,ft,sn,pt.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(be,pe,Ee,Qe,Ot,Se,he,Me,ft,pt.data):F.texSubImage3D(be,pe,Ee,Qe,Ot,Se,he,Me,ft,sn,pt):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,pe,Ee,Qe,Se,he,ft,sn,pt.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,pe,Ee,Qe,pt.width,pt.height,ft,pt.data):F.texSubImage2D(F.TEXTURE_2D,pe,Ee,Qe,Se,he,ft,sn,pt);me.pixelStorei(F.UNPACK_ROW_LENGTH,dn),me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,at),me.pixelStorei(F.UNPACK_SKIP_PIXELS,is),me.pixelStorei(F.UNPACK_SKIP_ROWS,rn),me.pixelStorei(F.UNPACK_SKIP_IMAGES,aa),pe===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&F.generateMipmap(be),me.unbindTexture()},this.initRenderTarget=function(w){Ie.get(w).__webglFramebuffer===void 0&&Oe.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Oe.setTextureCube(w,0):w.isData3DTexture?Oe.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Oe.setTexture2DArray(w,0):Oe.setTexture2D(w,0),me.unbindTexture()},this.resetState=function(){$=0,W=0,se=null,me.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}function cf(n,e){const t=e[0],i=new Pi(t.geometry,t.material,e.length);return i.castShadow=t.castShadow,i.receiveShadow=t.receiveShadow,e.forEach((s,r)=>{s.updateWorldMatrix(!0,!1),i.setMatrixAt(r,s.matrixWorld),s.removeFromParent(),s.geometry!==t.geometry&&s.geometry.dispose()}),i.computeBoundingSphere(),n.add(i),i}class Kv{constructor(e,t=e){this.max=e,this.ratio=Math.min(e,t),this.samples=0,this.slow=0,this.fast=0,this.fastWindows=0}observe(e){if(this.samples++,e>40&&this.slow++,e<21&&this.fast++,this.samples<90)return null;let t=this.ratio;return this.slow>=18?(t=Math.max(Math.min(.8,this.max),Math.round((this.ratio-.2)*100)/100),this.fastWindows=0):(this.fastWindows=this.fast>=85?this.fastWindows+1:0,this.fastWindows>=5&&(t=Math.min(this.max,Math.round((this.ratio+.1)*100)/100),this.fastWindows=0)),this.samples=this.fast=this.slow=0,Math.abs(t-this.ratio)<.001?null:(this.ratio=t,t)}}function Zv(n,e=window){let t=!1,i=!1;return e.addEventListener("pagehide",()=>{t||(t=!0,n.dispose(),n.forceContextLoss())}),e.addEventListener("pageshow",s=>{!s.persisted||!t||i||(i=!0,e.location.reload())}),()=>t}const mt=Object.freeze({athleteScale:.54,ballRadius:.036,ballMass:.156,wicketHeight:.711,wicketHalfWidth:.114,pitchTop:.12}),vt=n=>n.scale?.y??1,ea=(n,e)=>Math.abs(n)<2.5&&Math.abs(e)<12.5?mt.pitchTop:0,Hr=n=>ea(n.position.x,n.position.z)+.07*vt(n),Gr=n=>mt.ballRadius+.115*vt(n)+.045;function lc(n){n.updateMatrixWorld(!0);const e=vt(n),t=[],i=(r,a,o,l)=>t.push({id:r,a,b:o,r:l*e+mt.ballRadius}),s=(r,a,o,l)=>r.localToWorld(new P(a,o,l));for(let r=0;r<2;r++){const a=n.userData.legs[r],o=n.userData.knees[r],l=n.userData.arms[r],c=n.userData.elbows[r];i(`thigh${r}`,a.getWorldPosition(new P),o.getWorldPosition(new P),.17),i(`shin${r}`,o.getWorldPosition(new P),s(o,0,-.68,.095),.12),i(`shoe${r}`,s(o,0,-.68,-.04),s(o,0,-.68,.3),.08),i(`arm${r}`,l.getWorldPosition(new P),c.getWorldPosition(new P),.105),i(`forearm${r}`,c.getWorldPosition(new P),s(c,0,-.42,0),.086)}return i("head",s(n.userData.head,0,-.12,0),s(n.userData.head,0,.12,0),.24),i("torso",s(n.userData.torso,0,.26,0),s(n.userData.torso,0,1.27,0),.3),t}function Jv(n,e,t,i){const s=t.distanceTo(i)+Math.max(n.a.distanceTo(e.a),n.b.distanceTo(e.b)),r=Math.max(n.r,e.r),a=new P,o=new P,l=new P,c=new P,u=new P;let d=0;for(let f=0;f<64&&d<=1;f++){a.lerpVectors(n.a,e.a,d),o.lerpVectors(n.b,e.b,d),l.lerpVectors(t,i,d),u.copy(o).sub(a);const h=u.lengthSq(),g=h?tt.clamp(l.clone().sub(a).dot(u)/h,0,1):0;c.copy(a).addScaledVector(u,g);const M=l.distanceTo(c),m=M-r;if(m<5e-5){const p=l.clone().sub(c).normalize();return p.lengthSq()<.5&&p.copy(t).sub(i).normalize(),{t:d,normal:p,point:l.clone(),part:e.id}}if(s<1e-9)return null;d+=Math.max(1e-5,m/s)}return null}function Qv(n,e,t,i){n.lerpVectors(t,n.clone(),i.t??1);const s=e.clone();if(i.part==="hand")e.multiplyScalar(Math.min(.12,1.4/Math.max(.01,e.length())));else{const r=i.normal,a=e.dot(r);a<0&&e.addScaledVector(r,-a),e.multiplyScalar(.24),e.x*s.x+e.z*s.z<0&&(e.x=0,e.z=0)}return e.y=Math.min(.2,e.y),i.normal&&n.addScaledVector(i.normal,.008),e}const jv=[[3.2,15],[6.6,14.2],[18,9],[22,0],[13,-15],[-15,-12],[-17,7],[29,-31],[-32,-29]],eM=[[4,15],[18,8],[19,-3],[-14,-9],[31,-29],[-32,-27],[40,5],[-39,9],[13,-42]],tM=[[2.6,12.8],[-3.8,8.4],[16,10],[19,-2],[13,-16],[-15,-12],[-19,4],[33,-27],[-36,-24]],nM=[[3.6,13],[-4.6,7.8],[18,6],[-18,-5],[37,13],[30,-31],[-31,-29],[-40,9],[11,-42]];function uf(n,e){return n<6*Math.max(1,Math.round(e*.3))}function iM(n){return n.userData?.legs?lc(n).some(({a:e,b:t,r:i})=>Math.max(e.z,t.z)+i-mt.ballRadius>=9.3):n.position.z>=9.3}function sM({fielders:n,keeper:e,bowler:t,hand:i,balls:s,overs:r,slowOverRate:a=!1}){const o=uf(s,r),l=i==="left"?1:-1;let c=0,u=0,d=0;for(const f of[...n,t,e]){const{x:h,z:g}=f.position;Math.hypot(h,Math.max(0,Math.abs(g)-10.4))>27.43&&c++,h*l>0&&(u++,f!==e&&iM(f)&&d++)}return c>(o?2:a?4:5)?"TOO MANY OUTSIDE THE CIRCLE":u>5?"TOO MANY ON THE LEG SIDE":d>2?"TOO MANY BEHIND SQUARE ON LEG":null}function rM({hand:n,spin:e,balls:t,overs:i,slowOverRate:s=!1,fieldPlan:r}){const a=uf(t,i),o=e?a?tM:nM:a?jv:eM,l=n==="left"?-1:1;return o.map(([c,u],d)=>r==="cover"&&d===2?[20*l,-7]:r==="midwicket"&&d===5?[-21*l,-6]:s&&!a&&d===8?[12*l,-17]:[c*l,u])}function aM(n,e,t=Math.random,{wicketsInHand:i=10,ballsLeft:s=120}={}){if(n==="Yorker")return"Defend";if(n==="Short"||n==="Bouncer")return t()<.7?"Pull":"Cut";const r=i<=3&&s>6,a=r?.25:.65;return e>1.5&&t()<a?"Attacking drive":n==="Good"&&t()<(r?.65:.45)?"Defend":t()<.5?"Straight drive":"Flick"}function oM(n,e,t){return e!==20||n>=6*(e-1)?1/0:(Math.ceil(n/6)+(t&&n%6===0?1:0))*6}const lM={"Kabir Saxena":["fast",5],"Ishaan Trivedi":["fast",5],"Manav Bhatt":["leg spin",5],"Dhruv Nair":["off spin",5],"Sameer Rao":["medium",4],"Arvind Mehta":["leg spin",3],"Blake Stroud":["fast",5],"Heath Halloran":["fast",5],"Jarrah Pendle":["fast",5],"Darcy Lockhart":["leg spin",5],"Hamish Dunmore":["medium",4],"Declan Mullane":["off spin",3],"Jasper Fenwick":["fast",5],"Giles Winslow":["fast",5],"Edmund Hartwell":["fast",5],"Barnaby Radcliffe":["left-arm spin",5],"Tobias Thorne":["fast",5],"Elliot Briarley":["off spin",3],"Kareem Thibou":["fast",5],"Leon Carrington":["fast",5],"Shaquille Ferrier":["fast",5],"Nigel Marchand":["fast",5],"Tyrell Clarkeson":["off spin",4],"Andre Fontaine":["off spin",4],"Saad Lodhi":["fast",5],"Junaid Sheikh":["fast",5],"Omer Mirza":["fast",5],"Rehan Kazmi":["off spin",5],"Tariq Farooqi":["leg spin",5],"Zain Chaudhry":["left-arm spin",3],"Andile Mahlangu":["fast",5],"Dewan Steenkamp":["fast",5],"Heino Joubert":["fast",5],"Bongani Grobler":["left-arm spin",5],"Johan Naidoo":["fast",5],"Sipho Khumalo":["medium",3]};function ir(n){const e=ph.get(n);if(e)return{style:e.style,skill:e.role==="bowler"?5:e.role==="all-rounder"?4:1,spin:e.style.includes("spin")};const[t,i]=lM[n]||["medium",1];return{style:t,skill:i,spin:t.includes("spin")}}const cM=new Set(["Vivek Kulkarni","Flynn Ashby","Freddie Pembury","Jermaine Rampersad","Kamran Siddiqui","Liam Swanepoel"]);function df(n){const e=n.slice(0,11).findIndex(t=>cM.has(t)||ph.get(t)?.role==="keeper");return e<0?6:e}function uM(n,e=5){const t=df(n);return n.slice(0,11).map((i,s)=>({name:i,index:s,...ir(i)})).filter(i=>i.index!==t).sort((i,s)=>s.skill-i.skill||i.index-s.index).slice(0,e)}function hf(n,e=Math.random){const{style:t,spin:i}=ir(n),s=e();return i?t==="leg spin"?s<.72?{name:"Leg break",movement:.48}:{name:"Googly",movement:-.34}:t==="off spin"?s<.78?{name:"Off break",movement:-.42}:{name:"Doosra",movement:.3}:s<.8?{name:"Stock spin",movement:.38}:{name:"Arm ball",movement:-.15}:n==="Saad Lodhi"&&s>.78?{name:"Reverse swing",movement:s>.89?.32:-.32}:s<.38?{name:"Inswing",movement:.25}:s<.76?{name:"Outswing",movement:-.25}:{name:"Straight",movement:0}}function dM(n,e,t=Math.random){const i=hf(n,t),s=e==="left"?-1:1;if(ir(n).spin)return{...i,turn:i.movement,speedFactor:1};const r=t();return r<.12?{name:"Slower ball",movement:0,turn:0,speedFactor:.81}:r<.24?{name:"Off cutter",movement:0,turn:-.23*s,speedFactor:.9}:r<.36?{name:"Seam away",movement:0,turn:.15*s,speedFactor:.98}:{...i,movement:i.movement*s,turn:0,speedFactor:1}}function hM(n,e,t){const i=e.clone().sub(n),s=i.length();if(!s)return null;const r=new Jr(n,i.divideScalar(s)),a=.18*vt(t)+mt.ballRadius;let o=null;for(const l of t.userData.knees){const c=l.localToWorld(new P(0,-.08,.13)),u=l.localToWorld(new P(0,-.52,.13)),d=new P,f=r.distanceSqToSegment(c,u,d);if(f>a*a)continue;const h=Math.max(0,n.distanceTo(d)-Math.sqrt(a*a-f));h<=s&&(!o||h<o.distance)&&(o={distance:h,point:r.at(h,new P)})}return o}function fM({pitchX:n,impactX:e,hand:t,playedShot:i,wouldHit:s,noBall:r,freeHit:a}){const o=t==="left"?-1:1,l=mt.wicketHalfWidth;return!!s&&!r&&!a&&(n==null||n*o>=-l)&&e*o>=-l&&(!i||e*o<=l)}function pM(n,e,t){const[i,s]=n.userData.arms,r=Math.min(1,t/.24);e.boundaryOutcome===6?(i.rotation.z=r*2.95,s.rotation.z=-r*2.95):e.boundaryOutcome===4?(i.rotation.x=-r*1.45,i.rotation.y=r*Math.sin(t*7)*.85):e.dismissal&&(i.rotation.z=r*2.85)}const cc=1.32-.4318;function mM({x:n,height:e,hand:t="right",guardX:i=t==="left"?.35:-.35,releaseX:s=i,strikerX:r=s,headHeight:a=1.95,bounced:o=!0,noBall:l=!1,touched:c=!1}){if(l||c)return!1;if(o&&e-mt.ballRadius>a)return!0;const u=t==="left"?-1:1,d=n*u,f=(n-s+i)*u,h=(n-r+i)*u,g=M=>M>cc+mt.ballRadius||M<i*u-.16-mt.ballRadius;return g(d)&&g(f)&&g(h)}function gM(n,e){const t=n.userData,i=new ic,s=[i],r=[null];n.add(i);function a(R,E){const x=new ic;return x.position.copy(R.position),x.quaternion.copy(R.quaternion),E.add(x),s.push(x),r.push(R),s.length-1}const o=a(t.torso,i),l=[];for(let R=0;R<2;R++){const E=a(t.arms[R],s[o]),x=a(t.elbows[R],s[E]),v=a(t.legs[R],i),C=a(t.knees[R],s[v]);l.push({arm:E,elbow:x,hip:v,knee:C})}const c=[],u=[],d=[],f=[],h=[];function g(R,E=16){const x=c.length/3;R.forEach(v=>{for(let C=0;C<E;C++){const A=C/E*Math.PI*2;c.push(v.x+Math.cos(A)*v.rx,v.y,Math.sin(A)*v.rz),d.push(v.a,v.b??v.a,0,0),f.push(1-(v.mix||0),v.mix||0,0,0),h.push(v.region||0)}});for(let v=0;v<R.length-1;v++)for(let C=0;C<E;C++){const A=x+v*E+C,L=x+v*E+(C+1)%E,U=A+E,k=L+E;u.push(A,L,U,L,k,U)}}const M=(R,E,x,v,C,A=C,L=0,U=0)=>({x:R,y:E,rx:x,rz:v,a:C,b:A,mix:L,region:U});g([[1.48,.33,.21,0],[1.68,.35,.22,.15],[1.9,.33,.21,.7],[2.15,.38,.23,1],[2.48,.47,.255,1],[2.72,.46,.235,1],[2.88,.18,.145,1]].map(([R,E,x,v])=>M(0,R,E,x,0,o,v)));for(let R=0;R<2;R++){const E=R?-1:1,{arm:x,elbow:v,hip:C,knee:A}=l[R];g([[2.82,.13,0],[2.68,.145,0],[2.51,.125,0],[2.42,.108,.2],[2.31,.092,.5],[2.2,.099,.9],[2.04,.087,1],[1.83,.063,1]].map(([L,U,k])=>M(E*.5,L,U,U*.92,x,v,k,L<2.5?1:0))),g([[1.6,.19,0],[1.4,.185,0],[1.17,.168,0],[.96,.145,.1],[.8,.126,.45],[.65,.129,.85],[.45,.119,1],[.17,.082,1],[.07,.08,1]].map(([L,U,k])=>M(E*.2,L,U,U*.9,C,A,k,2)))}const m=new Tt;m.setIndex(u),m.setAttribute("position",new nt(c,3)),m.setAttribute("skinIndex",new Xc(d,4)),m.setAttribute("skinWeight",new nt(f,4)),m.setAttribute("color",new nt(new Float32Array(c.length),3)),m.computeVertexNormals();const p=new yt({vertexColors:!0,roughness:.92}),_=new Nm(m,p);_.castShadow=!0,_.receiveShadow=!0,_.frustumCulled=!1,n.add(_),n.updateMatrixWorld(!0),_.bind(new Yc(s));for(const R of e)R.visible=!1,R.userData.replacedBySkin=!0;let y="";function b(){for(let E=1;E<s.length;E++)s[E].position.copy(r[E].position),s[E].quaternion.copy(r[E].quaternion);if(_.geometry!==m)return;const R=`${t.kit.color.getHex()}:${t.skin.color.getHex()}`;if(R!==y){const E=m.attributes.color;for(let x=0;x<h.length;x++){const v=(h[x]===1?t.skin.color:t.kit.color).clone();h[x]===2&&v.multiplyScalar(.86),E.setXYZ(x,v.r,v.g,v.b)}E.needsUpdate=!0,y=R}}return b(),t.skinMesh=_,t.updateSkin=b,_}const uc=new P(0,-1,0);function xM(n){return[...n].reduce((e,t)=>Math.imul(e,31)+t.charCodeAt(0)>>>0,17)}function _M(n,e,t,i,s=0,r="fielder"){const a=new Lt;a.rotation.order="YXZ",a.userData.modern=!0,a.userData.role=r;const o=[],l=new yt({color:i,roughness:.83}),c=new yt({color:11828057,roughness:.78}),u=new yt({color:15135195,roughness:.65}),d=new yt({color:15462119,roughness:.68}),f=new yt({color:2300953,roughness:1});a.userData.kit=l,a.userData.skin=c,a.userData.trim=u;function h(A,L,U,k,I,G,$=1,W=1,se=1){const q=new st(L,U);return q.position.set(k,I,G),q.scale.set($,W,se),q.castShadow=!0,q.receiveShadow=!0,A.add(q),q}const g=A=>new At(A,16,12);o.push(h(a,new mn(.43,.32,1.05,20),l,0,2.35,0,1.12,1,.62)),o.push(h(a,g(.36),l,0,1.7,0,1.05,.65,.66)),h(a,new mn(.17,.21,.24,16),c,0,2.99,0),h(a,new Js(.2,.033,5,20,Math.PI),u,0,2.91,.06).rotation.x=Math.PI/2;const M=h(a,new Nn(.57,.31),u,0,2.48,.277),m=document.createElement("canvas");m.width=256,m.height=128;const p=new Ni(m);p.colorSpace=Bt,M.material=new yt({map:p,transparent:!0,roughness:.9}),a.userData.shirtCanvas=m,a.userData.shirtTexture=p;const _=new Lt;_.position.y=3.3,a.add(_),a.userData.head=_,h(_,g(.265),c,0,0,0,.86,1.17,.94),h(_,g(.14),c,0,-.15,.08,1.1,.65,.9),h(_,g(.058),c,0,-.015,.249,.65,1.2,1.2);for(const A of[-1,1]){h(_,g(.064),c,A*.228,-.015,0,.5,1,.7),h(_,g(.032),new yt({color:16181462}),A*.09,.053,.223,1,.45,.5),h(_,g(.019),f,A*.09,.05,.236,.65,.85,.6);const L=h(_,new Rt(.09,.018,.025),f,A*.09,.103,.221);L.rotation.z=A*-.09}h(_,new Rt(.087,.013,.018),new yt({color:7490107}),0,-.122,.223);const y=h(_,new At(.27,16,10,0,Math.PI*2,0,Math.PI*.46),f,0,.05,-.015,.91,1.13,.99),b=h(_,new At(.255,16,10,0,Math.PI*2,Math.PI*.55,Math.PI*.33),f,0,-.005,0,.86,1.1,1.02);if(a.userData.beard=b,a.userData.hair=y,r==="batter"||r==="keeper"){const A=h(_,new At(.295,20,12,0,Math.PI*2,0,Math.PI*.57),l,0,.05,-.02,.98,1.1,1.02);if(h(_,new Rt(.44,.025,.22),l,0,.07,.25),r==="batter"){const L=new yt({color:9543587,metalness:.7,roughness:.25});for(const U of[-.04,-.14])h(_,new Js(.26,.009,4,20,Math.PI),L,0,U,.04).rotation.x=Math.PI/2;for(const U of[-1,1])h(_,new mn(.009,.009,.24,5),L,U*.23,-.04,.17).rotation.z=U*.2}a.userData.helmet=A}else r!=="umpire"?(h(_,new At(.28,16,10,0,Math.PI*2,0,Math.PI*.47),l,0,.08,-.015,.95,1.05,1),h(_,new Rt(.35,.025,.26),l,0,.13,.22)):(h(_,new mn(.31,.31,.2,16),u,0,.26,0),h(_,new mn(.43,.43,.035,24),u,0,.18,0));const R=[],E=[],x=[],v=[];for(const A of[1,-1]){const L=new Lt;L.position.set(A*.5,2.8,0),a.add(L),o.push(h(L,new Gt(.145,.19,6,12),l,0,-.15,0,1,1,.92)),o.push(h(L,new Gt(.101,.23,6,12),c,0,-.32,0));const U=new Lt;U.position.y=-.49,L.add(U),L.userData.elbow=U,o.push(h(U,g(.103),c,0,0,0)),o.push(h(U,new Gt(.086,.29,6,12),c,0,-.24,0));const k=h(U,g(.115),r==="batter"||r==="keeper"?u:c,0,-.5,.018,.8,1.1,.55);k.userData.digits=[],L.userData.hand=k;for(let $=0;$<4;$++){const W=h(k,new Gt(.026,.09,3,6),r==="batter"||r==="keeper"?u:c,($-1.5)*.05,-.1,0);k.userData.digits.push(W)}R.push(L),E.push(U);const I=new Lt;I.position.set(A*.2,1.48,0),a.add(I),o.push(h(I,new Gt(.17,.36,6,12),l,0,-.34,0,1,1,.9));const G=new Lt;if(G.position.y=-.7,I.add(G),I.userData.knee=G,o.push(h(G,g(.13),l,0,0,0)),o.push(h(G,new Gt(.12,.39,6,12),l,0,-.32,0)),h(G,g(.17),d,0,-.68,.095,.8,.48,1.7),h(G,new Rt(.25,.04,.39),u,0,-.73,.105),r==="batter"){h(G,new Gt(.18,.35,6,12),u,0,-.3,.13,1,.98,.6);for(const $ of[-.13,-.3,-.46])h(G,new Rt(.29,.025,.04),d,0,$,.246)}x.push(I),v.push(G)}if(a.userData.arms=R,a.userData.elbows=E,a.userData.legs=x,a.userData.knees=v,r==="batter"){const A=new Lt;A.position.set(0,1.9,.3),a.add(A),a.userData.bat=A;const L=new yt({color:14926221,roughness:.7});h(A,new mn(.042,.042,.53,10),u,0,-.18,0),h(A,new Rt(.2,1.08,.08),L,0,-.93,0),h(A,new Rt(.17,.23,.008),l,0,-.65,.062);for(let U=0;U<5;U++)h(A,new Rt(.002,.78,.002),new yt({color:12819306}),-.1+U*.045,-1,.06)}if(r!=="umpire"){const A=document.createElement("canvas");A.width=512,A.height=160;const L=new Ni(A);L.colorSpace=Bt;const U=h(a,new Nn(.69,.34),new gi({map:L,transparent:!0,side:Vt,depthWrite:!1}),0,2.44,-.274);U.rotation.y=Math.PI,a.userData.nameCanvas=A,a.userData.nameTexture=L}const C=new Lt;C.position.y=1.48,a.add(C),a.updateMatrixWorld(!0);for(const A of[...a.children])A!==C&&A!==a.userData.bat&&A.position.y>=2&&C.attach(A);return a.userData.torso=C,gM(a,o),a.position.set(e,0,t),a.rotation.y=s,n.add(a),a}function vM(n,e,t){if(!n.userData.modern)return;const i=xM(e),s=[15055258,13013101,11433813,9001531,6307371,14264963];n.userData.skin.color.setHex(s[i%s.length]),n.userData.beard.visible=i%3!==0,n.userData.identityPhase=i%100/100*Math.PI*2;const r=n.userData.shirtCanvas,a=r.getContext("2d");a.clearRect(0,0,r.width,r.height),a.fillStyle="#edf6e0",a.textAlign="center",a.font="900 31px Arial",a.fillText(t.toUpperCase(),128,67,230),a.fillStyle="#e4db91",a.fillRect(108,14,40,4),n.userData.shirtTexture.needsUpdate=!0;const o=n.userData.kit.color;n.userData.trim.color.setHex(o.g>.45&&o.r>.45?2182193:14806755)}function vn(n,e,t){const i=n.userData.arms[e],s=n.userData.elbows[e],r=i.parent.worldToLocal(t.clone()),a=i.position.clone(),o=r.clone().sub(a),l=o.length();if(l<1e-5)return;const c=.49,u=.5,d=tt.clamp(l,.08,c+u-.005);o.normalize();const f=(c*c-u*u+d*d)/(2*d),h=new P(Math.sign(a.x)*.5,-.3,-.8);h.addScaledVector(o,-h.dot(o)).normalize();const g=Math.sqrt(Math.max(0,c*c-f*f)),M=a.clone().addScaledVector(o,f).addScaledVector(h,g),m=a.clone().addScaledVector(o,d);i.scale.y=1,i.quaternion.setFromUnitVectors(uc,M.clone().sub(a).normalize());const p=m.sub(M).normalize().applyQuaternion(i.quaternion.clone().invert());s.quaternion.setFromUnitVectors(uc,p)}function tu(n){for(let e=0;e<2;e++){const t=n.userData.batHand==="left"?1:0,i=n.userData.bat.localToWorld(new P(0,e===t?-.04:-.23,0));vn(n,e,i)}}function ta(n,e,t){const i=n.userData.legs[e],s=n.userData.knees[e],r=i.position.clone(),o=n.worldToLocal(t.clone()).clone().sub(r),l=tt.clamp(o.length(),.08,1.375);o.normalize();const c=new P(0,-.68,.095),u=.7,d=c.length(),f=(u*u-d*d+l*l)/(2*l),h=new P(0,0,1);h.addScaledVector(o,-h.dot(o)).normalize();const g=r.clone().addScaledVector(o,f).addScaledVector(h,Math.sqrt(Math.max(0,u*u-f*f)));i.quaternion.setFromUnitVectors(uc,g.clone().sub(r).normalize());const M=r.clone().addScaledVector(o,l).sub(g).normalize().applyQuaternion(i.quaternion.clone().invert());s.quaternion.setFromUnitVectors(c.normalize(),M)}function bo(n){for(let e=0;e<2;e++){const t=n.localToWorld(new P(e?-.23:.23,0,e?-.06:.12));t.y=Hr(n),ta(n,e,t)}}function sr(n,e=10){const t=tt.degToRad(e);for(let r=0;r<2;r++)n.userData.legs[r].rotation.set(-t*.5,0,0),n.userData.knees[r].rotation.set(t,0,0);const i=n.userData.knees.map(r=>r.localToWorld(new P(0,-.75,.105))),s=Hr(n)-.07*n.scale.y;n.position.y+=s-Math.min(...i.map(r=>r.y))}function ff(n,e,t){const i=vt(n),s=ea(n.position.x,n.position.z),r=n.userData.fielding||n.userData,a=r.groundBlend=(r.groundBlend||0)+(1-(r.groundBlend||0))*(1-Math.exp(-14*t));n.position.y=s-i*a,n.rotation.x=.04,n.rotation.z=0,n.userData.torso.rotation.set(1.3*a,0,0);for(let o=0;o<2;o++){const l=n.localToWorld(new P(o?-.22:.32,0,o?.34:.04));l.y=s+.07*i,ta(n,o,l),vn(n,o,e.clone().add(new P((o?-1:1)*.035,0,0)))}}const Ms=Object.freeze({keeper:{crease:9.3,wicket:10.4,direction:1},bowler:{crease:-9.3,wicket:-10.4,direction:-1}});function MM(n,e,{speed:t=28,accuracy:i=.9,random:s=Math.random}={}){const r=Math.hypot(e.x-n.x,e.z-n.z),a=Math.max(.22,r/t),o=.12+(1-Math.max(0,Math.min(1,i)))*r*.14,l=(s()-s())*o,c=(s()-s())*o,u=(s()-s())*o*.45,d={x:e.x+l,y:Math.max(.3,e.y+u),z:e.z+c};return{velocity:{x:(d.x-n.x)/a*1.025,y:(d.y-n.y)/a+4.905*a,z:(d.z-n.z)/a*1.025},aim:d,duration:a,spread:o}}function js(n,e,t,i=mt.ballRadius){const s=Ms[t];if(!s)return null;const r={x:[-mt.wicketHalfWidth-i,mt.wicketHalfWidth+i],y:[mt.pitchTop-i,mt.pitchTop+mt.wicketHeight+i],z:[s.wicket-i-.025,s.wicket+i+.025]};let a=0,o=1;for(const l of["x","y","z"]){const c=e[l]-n[l],[u,d]=r[l];if(Math.abs(c)<1e-8){if(n[l]<u||n[l]>d)return null;continue}const f=(u-n[l])/c,h=(d-n[l])/c;if(a=Math.max(a,Math.min(f,h)),o=Math.min(o,Math.max(f,h)),a>o)return null}return{x:n.x+(e.x-n.x)*a,y:n.y+(e.y-n.y)*a,z:n.z+(e.z-n.z)*a,t:a}}function Xa(n,e){const t=Ms[e];return!!t&&n.some(i=>i.y<=.19&&i.y>=-.12&&(i.z-t.crease)*t.direction>=0)}function SM(n,e,t,i=7){return t?Object.entries(Ms).map(([r,a])=>{const o=e.reduce((u,d)=>Math.abs(u.z-a.crease)<Math.abs(d.z-a.crease)?u:d),l=Math.hypot(n.x,n.z-a.wicket)/28+.3,c=Math.abs(o.z-a.crease)/Math.max(2,i);return{end:r,margin:c-l}}).sort((r,a)=>a.margin-r.margin)[0].end:"keeper"}function yM(n,e){return!!n&&e.some((t,i)=>js(n[i],t,"keeper",.02))}const{clamp:qa,radToDeg:Kd}=tt,Vi=(n,e,t,i)=>Object.freeze({id:n,position:Object.freeze(e),look:Object.freeze(t),fov:i}),Zd=Object.freeze({delivery:Vi("delivery",[-8,16,-72],[0,1,1.5],22),shoulderRight:Vi("shoulderRight",[1.75,2.85,15.8],[0,1.1,1.6],38),shoulderLeft:Vi("shoulderLeft",[-1.75,2.85,15.8],[0,1.1,1.6],38),preview:Vi("preview",[8,3.4,17],[0,1,9.2],36),stadium:Vi("stadium",[58,36,58],[0,1,0],55),keeper:Vi("keeper",[8,16,72],[0,1,0],22),batter:Vi("batter",[24,12,60],[0,1,9.2],18),...Object.fromEntries(Array.from({length:8},(n,e)=>{const t=e*Math.PI/4,i=`field-${e}`;return[i,Vi(i,[-Math.sin(t)*82,22,-Math.cos(t)*82],[0,1,0],22)]}))});function EM(n){return!n?.flight||["miss","keeper-chase","keeper-gather"].includes(n.phase)?"delivery":n.phase==="modern-return"?"return":"field"}function dc(n){const e=Zd[n]||Zd.delivery;return{id:e.id,position:new P(...e.position),look:new P(...e.look),fov:e.fov}}function bM(n,e,t){const i=n.clone().setY(.1),s=Math.hypot(i.x,i.z);s>47&&(i.x*=47/s,i.z*=47/s);const r=[n.clone(),i],a=e.map(o=>({p:o,position:o.position||o})).filter(({position:o})=>Math.hypot(o.x,o.z)<51).sort((o,l)=>o.position.distanceToSquared(i)-l.position.distanceToSquared(i)).slice(0,2);for(const{p:o,position:l}of a)r.push(new P(l.x,.1,l.z)),r.push(o.userData?.head?o.userData.head.getWorldPosition(new P):new P(l.x,1.95,l.z));return t&&r.push(new P(0,.1,0)),{ground:i,points:r}}class TM{constructor(){this.key=null,this.shot=null,this.id=null,this.look=new P,this.fov=22,this.lofted=!1}update({ball:e,velocity:t,active:i=!1,phase:s="delivery",deliveryKey:r=null,throwEnd:a=null,battingHand:o=null,dt:l=1/60,aspect:c=1.5,players:u=[]}){r!==this.key&&(this.key=r,this.shot=null,this.lofted=!1);let d=o?o==="left"?"shoulderLeft":"shoulderRight":"delivery",f=!1;if(s==="preview")d="preview";else if(i&&s!=="delivery")if(s==="return"&&Math.hypot(e.x,e.z)<18)d="delivery",f=!0,this.shot=null;else{const M=Math.abs(e.x)>4||e.z<-13||e.z>18||e.y>5;if(!this.shot&&M){const m=e.x,p=e.z-9.2,_=Math.hypot(m,p)>2?Math.atan2(m,p):Math.atan2(t?.x||0,t?.z||-1);this.shot=`field-${(Math.round(_/(Math.PI/4))+8)%8}`}this.shot&&(d=this.shot,f=!0)}const h=dc(d),g=d!==this.id;if(this.id=d,!f&&c<1&&(d==="shoulderRight"||d==="shoulderLeft")){const M=qa((1-c)/.45,0,1);h.fov+=12*M,h.look.x-=h.position.x*.4*M}if(!f)this.look.copy(h.look),this.fov=h.fov;else{s==="return"?this.lofted=!1:e.y>6&&(this.lofted=!0);const{ground:M,points:m}=bM(e,u,this.lofted);s==="return"&&Ms[a]&&m.push(new P(0,.7,Ms[a].wicket));const p=e.clone().addScaledVector(t||new P,.06);if(this.lofted&&p.lerp(M,.62),g)this.look.copy(p);else{const v=p.sub(this.look),C=v.length();C>.3&&this.look.addScaledVector(v,(C-.3)/C*(1-Math.exp(-7*l)))}const _=(this.lofted?24:10)/Math.min(1,c),y=qa(Kd(2*Math.atan(_/h.position.distanceTo(this.look))),12,45);this.fov=g?y:tt.lerp(this.fov,y,1-Math.exp(-3*l));const b=this.look.clone().sub(h.position).normalize(),R=b.clone().cross(new P(0,1,0)).normalize(),E=R.clone().cross(b);let x=0;for(const v of m){const C=v.clone().sub(h.position),A=Math.max(1,C.dot(b));x=Math.max(x,Math.abs(C.dot(E))/A,Math.abs(C.dot(R))/A/c)}this.fov=Math.max(this.fov,Kd(2*Math.atan(x/.72)))}return h.look.copy(this.look),h.fov=qa(this.fov,12,70),h}}function wM(n,e,t){if(!n)return null;const i=e?.id===n.id?e:n,s=qa(t,0,1);return{id:n.id,position:new P(...n.position),look:new P(...n.look).lerp(new P(...i.look),s),fov:tt.lerp(n.fov,i.fov,s)}}const nu=5,hc=Object.freeze([Object.freeze({overs:2,bowlers:2,maxBowlerOvers:1,label:"2 overs · 1 over per bowler"}),Object.freeze({overs:5,bowlers:5,maxBowlerOvers:1,label:"5 overs · 1 over per bowler"}),Object.freeze({overs:10,bowlers:6,maxBowlerOvers:2,label:"10 overs · up to 2 per bowler"}),Object.freeze({overs:20,bowlers:7,maxBowlerOvers:4,label:"20 overs · up to 4 per bowler"})]);function pf(n){return hc.find(e=>e.overs===Number(n))||hc.find(e=>e.overs===nu)}const fc=(n,e,t)=>Math.max(e,Math.min(t,n)),Vr=n=>Math.atan2(Math.sin(n),Math.cos(n));function To(n=0){return{vx:0,vz:0,phase:n,distance:0,speed:0,runSpeed:0,turnVelocity:0}}function AM(n,e,t,i,s,r=7.5,a={}){if(s=fc(s,0,.1),!s)return{x:0,z:0,yaw:t,distance:0};const o=i.x-e.x,l=i.z-e.z,c=Math.hypot(o,l),u=a.facingYaw??(c>.05?Math.atan2(o,l):t),d=Vr(u-t),f=fc(d,-5.2*s,5.2*s),h=t+f,g=12,M=Math.min(r,Math.sqrt(2*g*Math.max(0,c-.12)))*(a.facingYaw===void 0?Math.max(.12,Math.cos(d*.65)):1),m=c>.12?o/c*M:0,p=c>.12?l/c*M:0,_=m-n.vx,y=p-n.vz,b=Math.hypot(_,y),R=(M<n.speed?g:8.5)*s,E=b>0?Math.min(1,R/b):0;n.vx+=_*E,n.vz+=y*E;let x=n.vx*s,v=n.vz*s;c<.13&&Math.hypot(x,v)<.03&&(x=0,v=0,n.vx=0,n.vz=0);const C=Math.hypot(x,v);return n.speed=Math.hypot(n.vx,n.vz),n.distance+=C,n.phase+=C/(n.speed>4?2.6:1.8)*Math.PI*2,n.turnVelocity=f/s,{x,z:v,yaw:h,distance:C}}function RM(n,e){if(!n.runActive)return n.runnerVelocity=0,0;const t=n.runReturning?-1:1,i=t<0?n.runProgress:1-n.runProgress,s=t*Math.min(8.2,Math.sqrt(Math.max(0,i)*19.55*2*13)+1.1),r=n.runnerVelocity||0,a=fc(s-r,-12*e,12*e);return n.runnerVelocity=r+a,Math.max(0,n.runnerVelocity*t)*e/19.55*2.7}let Pn,Ht,Oa,Ti,Hn=!1,ds=.22,Ya=0,Rr,pc;const mc=new Map;function CM(n={}){return Oa||(Hn=!!n.modern,ds=Hn?mt.ballRadius:.22),Oa||(Oa=mh(()=>import("./rapier-Dr7-2af2.js"),[]).then(async e=>{Ti=e.default,await Ti.init(),Pn=new Ti.World({x:0,y:-9.81,z:0}),Pn.createCollider(Ti.ColliderDesc.cuboid(1e3,.1,1e3).setTranslation(0,-.1,0).setFriction(.03).setRestitution(.48)),Ht=Pn.createRigidBody(Ti.RigidBodyDesc.dynamic().setCanSleep(!1).setTranslation(0,2,0).setLinearDamping(Hn?.006:.015).setCcdEnabled(Hn)),Pn.createCollider(Ti.ColliderDesc.ball(ds).setMass(Hn?mt.ballMass:.16).setCollisionGroups(Hn?65537:4294967295).setFriction(.03).setRestitution(.48),Ht),Hn&&(pc=Pn.createCollider(Ti.ColliderDesc.cuboid(2.5,.06,12.5).setTranslation(0,.06,0).setFriction(.12).setRestitution(.58)),Rr=Pn.createCharacterController(.015),Rr.setApplyImpulsesToDynamicBodies(!1))})),Oa}function Wr(){Ya=0,Ht&&Ht.setAngvel({x:0,y:0,z:0},!0)}function mf(n){Ht&&Ht.setAngvel(n,!0)}function qi(n,e,t,i=!1,s=null){if(!Pn)throw new Error("Physics engine is not initialized");pc&&pc.setRestitution(s?.pitchRestitution??.58),Ht.setTranslation({x:n.x,y:Math.max(ds,n.y),z:n.z},!0),Ht.setLinvel({x:e.x,y:e.y,z:e.z},!0);let r=Math.max(0,Math.min(t,.1));for(Hn&&(Ya+=r,r=Math.floor((Ya+1e-9)*120)/120,Ya-=r);r>1e-7;){const l=Math.min(r,.008333333333333333);if(r-=l,Hn){const f=Ht.linvel(),h=Ht.angvel(),g=Math.hypot(f.x,f.y,f.z),M=.0025*g;Ht.setLinvel({x:f.x+((s?.swing||0)-M*f.x+8e-4*(h.y*f.z-h.z*f.y))*l,y:f.y+(-M*f.y+8e-4*(h.z*f.x-h.x*f.z))*l,z:f.z+(-M*f.z+8e-4*(h.x*f.y-h.y*f.x))*l},!0)}Pn.timestep=l,Pn.step();let c=Ht.translation(),u=Ht.linvel();const d=Hn&&Math.abs(c.x)<2.5&&Math.abs(c.z)<12.5?.12:0;if(c.y<=ds+d+.005&&(Hn&&!i&&s&&(s.pitchX=c.x,d>0&&s.turnVelocity&&Ht.setLinvel({x:u.x+s.turnVelocity,y:u.y,z:u.z},!0)),i=!0,c.y<ds+d&&Ht.setTranslation({x:c.x,y:ds+d,z:c.z},!0),Math.abs(u.y)<.55)){const f=Math.hypot(u.x,u.z),h=f?Math.max(0,f-3.4*l)/f:0;Ht.setLinvel({x:u.x*h,y:0,z:u.z*h},!0)}}const a=Ht.translation(),o=Ht.linvel();return n.x=a.x,n.y=Math.max(ds,a.y),n.z=a.z,e.x=o.x,e.y=o.y,e.z=o.z,i}function gf(n){if(!(!Hn||!Pn)){for(const e of n){let t=mc.get(e.uuid);if(!t){const s=Pn.createRigidBody(Ti.RigidBodyDesc.kinematicPositionBased()),r=vt(e),a=Pn.createCollider(Ti.ColliderDesc.capsule(1.15*r,.35*r).setCollisionGroups(131074),s);t={body:s,collider:a},mc.set(e.uuid,t)}if(["dive","slide","recover"].includes(e.userData?.fielding?.mode)&&e.rotation.x>.3&&e.localToWorld){e.updateMatrixWorld(!0);const s=e.localToWorld(e.position.clone().set(0,1.5,0));s.y=Math.max(s.y,.35*vt(e)+.02+ea(s.x,s.z)),t.body.setTranslation(s,!1),t.body.setRotation(e.quaternion,!1)}else t.body.setTranslation({x:e.position.x,y:mt.pitchTop+1.52*vt(e)+.02,z:e.position.z},!1),t.body.setRotation({x:0,y:0,z:0,w:1},!1);t.body.setNextKinematicTranslation(t.body.translation()),t.body.setNextKinematicRotation(t.body.rotation())}Pn.propagateModifiedBodyPositionsToColliders()}}function co(n,e,t){const i=mc.get(n);if(!i||!Rr)return t;Rr.computeColliderMovement(i.collider,{x:t.x,y:0,z:t.z},void 0,void 0,a=>a.handle!==i.collider.handle&&a.parent()?.handle!==Ht.handle);const s=Rr.computedMovement(),r=i.body.translation();return i.body.setNextKinematicTranslation({x:r.x+s.x,y:r.y,z:r.z+s.z}),{x:s.x,z:s.z}}const DM=new si,Jd=new Tn;function $a(n,e,t,i,s){Jd.setFromEuler(DM.set(e,t,i)),n.quaternion.slerp(Jd,s)}function Xr(n){n.userData.motor=To(n.userData.identityPhase||0),n.userData.fielding=null,n.userData.torso?.rotation.set(0,0,0)}function Ss(n,e,t,i=7.5,s={}){const r=n.userData.motor||(n.userData.motor=To(n.userData.identityPhase||0)),a=AM(r,n.position,n.rotation.y,e,t,i,s),o=co(n.uuid,n.position,a);return n.position.x+=o.x,n.position.z+=o.z,n.rotation.y=a.yaw,t>0&&(r.vx=o.x/t,r.vz=o.z/t,r.speed=Math.hypot(r.vx,r.vz)),na(n,t),r.speed}function uo(n,e,t){const i=Math.atan2(e.x-n.position.x,e.z-n.position.z);n.rotation.y+=tt.clamp(Vr(i-n.rotation.y),-4*t,4*t)}function na(n,e,t){const i=n.userData.motor||(n.userData.motor=To(n.userData.identityPhase||0)),s=vt(n),r=i.speed,a=1-Math.exp(-14*e),o=Math.cos(i.phase)*Math.min(.72,r*.1),l=i.vx*Math.sin(n.rotation.y)+i.vz*Math.cos(n.rotation.y),c=i.vx*Math.cos(n.rotation.y)-i.vz*Math.sin(n.rotation.y),u=l<-.2,d=u?-o*.6:o,f=tt.clamp(c*.018,-.1,.1);n.userData.arms.forEach((_,y)=>{_.scale.y=1,$a(_,u?-.18+(y?-d:d)*.25:-.08+(y?-d:d)*.72,0,(y?-1:1)*(u?.26:.1)-f,a)}),n.userData.elbows.forEach(_=>$a(_,u?-.95:-.28-Math.min(.8,r*.1),0,0,a)),n.userData.torso&&$a(n.userData.torso,u?-.04:Math.min(.07,r*.01),Math.sin(i.phase)*Math.min(.09,r*.013),-f*.45,a),n.position.y+=((r>.2?-Math.min(.25,r*.042)+Math.cos(i.phase*2)*Math.min(.03,r*.005):0)*s-n.position.y)*a,n.rotation.x+=((u?-.04:Math.min(.12,r*.016))-n.rotation.x)*a,n.rotation.z+=(-tt.clamp(i.turnVelocity*.025,-.13,.13)-n.rotation.z)*a;const h=new We(c,l),g=h.length();g>.1?h.divideScalar(g):h.set(0,1);const M=Math.min(.7,r*.08),m=tt.lerp(.62,.27,tt.clamp((r-1.5)/6.7,0,1)),p=i.footPlants||(i.footPlants=[]);for(let _=0;_<2;_++){const y=((i.phase+_*Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2),b=y<m,R=tt.clamp((y-m)/(1-m),0,1),E=b?M:M*(-1+2*R),x=b?0:Math.sin(R*Math.PI)*Math.min(.32,r*.045),v=n.localToWorld(new P((_?-.23:.23)+h.x*E,0,h.y*E));v.y=Hr(n)+x*s,b?((!p[_]?.stance||p[_].point.distanceTo(n.position)>2*s)&&(p[_]={stance:!0,point:v.clone()}),v.copy(p[_].point),v.y=Hr(n)):p[_]&&(p[_].stance=!1),ta(n,_,v)}if(n.userData.bat&&r>.2){const _=n.userData.batHand==="left"?0:1;n.userData.bat.position.set(_?-.38:.38,1.95,.22),n.userData.bat.rotation.set(.2,0,_?-.55:.55),n.updateMatrixWorld(!0),vn(n,_,n.userData.bat.localToWorld(new P(0,-.15,0)))}}function Fa(n,e,t=9){const i=n.userData.motor;if(!i)return;const s=Math.hypot(i.vx,i.vz),r=Math.max(0,s-t*e),a=s?r/s:0,o={x:i.vx*e*(1+a)*.5,z:i.vz*e*(1+a)*.5},l=co(n.uuid,n.position,o);n.position.x+=l.x,n.position.z+=l.z,i.vx*=a,i.vz*=a,i.speed=r,i.phase+=Math.hypot(l.x,l.z)/2.6*Math.PI*2,na(n,e),r>1&&(n.rotation.x-=Math.min(.16,r*.018))}function PM(n,e,t){const i=n.userData.identityPhase||0,s=1-Math.exp(-5*t);n.position.y+=(Math.sin(e*1.8+i)*.009-n.position.y)*s,n.userData.elbows.forEach((r,a)=>$a(r,-.22+Math.sin(e*1.6+i+a)*.035,0,0,s))}function xf(n,e){if(!n.userData.bat)return;const t=Math.abs(n.position.z-e),i=tt.clamp((3.2-t)/1.3,0,1);if(!i)return;n.rotation.x+=(.42-n.rotation.x)*i,n.userData.torso.rotation.x+=(.35-n.userData.torso.rotation.x)*i,n.updateMatrixWorld(!0);const s=n.userData.batHand==="left"?0:1,r=vt(n),a=n.userData.bat,o=n.localToWorld(new P(s?-.25:.25,1.75,.55)),l=tt.clamp(o.y-(ea(n.position.x,n.position.z)+.02),.2*r,1.485*r),c=Math.sqrt((1.49*r)**2-l*l),u=e<0?-1:1,d=new Tn().setFromUnitVectors(new P(0,-1,0),new P(0,-l,u*c).normalize()),f=n.getWorldQuaternion(new Tn).invert().multiply(d);a.position.lerp(n.worldToLocal(o.clone()),i),a.quaternion.slerp(f,i),n.updateMatrixWorld(!0),vn(n,s,a.localToWorld(new P(0,-.15,0)))}const Ri=tt.clamp,Cr=n=>tt.smoothstep(n,0,1),Qd=new Tn,Ba=new Tn;function gc(n,{hand:e="right",striker:t=!0}={}){const i=e==="left"?-1:1;n.userData.batHand=e,n.rotation.set(.02,i*Math.PI/2,0),n.userData.torso.rotation.set(.25,0,-i*.12),n.userData.bat.position.set(0,2.25,.3),n.userData.bat.rotation.set(0,0,-i*.18),sr(n),tu(n),n.userData.head.rotation.set(0,t?i*Math.PI/2:-i*Math.PI/2,0)}function jd(n,e,t,i){const s=n.userData.standingZ??13.1,r=vt(n),a=t?.z>1?Ri((s-e.z)/t.z,0,.5):0,o=e.z>0?e.x+(t?.x||0)*a:0,l=e.z>11&&e.y<.6,c=new P(Ri(o,-2.4,2.4),0,l?Math.max(s,e.z+.75):s);Ss(n,c,i,3.6,{facingYaw:Math.atan2(e.x-n.position.x,e.z-n.position.z)});const u=n.position.z-.45,d=t?.z>1?Ri((u-e.z)/t.z,0,.18):0,f=e.distanceTo(n.position)<3?e.clone():new P(c.x,1.4*r,u);d>0&&e.z>9.2&&e.z<u-.4&&f.set(e.x+(t.x||0)*d,Math.max(.15,e.y+(t.y||0)*d-4.905*d**2),u);const h=Ri((2.2*r-f.y)/(1.8*r),0,1);n.rotation.x=.025,n.userData.torso.rotation.set(.36+1.35*h,0,.16*h),sr(n,12+65*h),n.worldToLocal(f.clone()).z>-.2&&(vn(n,0,f.clone().add(new P(.035,0,0))),vn(n,1,f.clone().add(new P(-.035,0,0))))}function eh(n,e,t,i=1){const s=vt(n),r=i===1?1:-1,a=n.userData.motor,o=Math.min(e,1.8),l=9/(1.8-.175);if(n.position.z=-20+(o<.35?l*o*o/.7:l*(o-.175)),a.speed=e<1.8?l*Math.min(1,e/.35):Math.max(0,4*(1-(e-1.8)/.65)),a.vx=0,a.vz=a.speed,a.phase+=a.speed*t/2.1*Math.PI*2,na(n,t),e<1.1)return;const c=Cr((e-1.1)/.35),u=Cr((e-1.45)/.35),d=Ri((e-1.8)/.65,0,1);if(n.rotation.y=r*(.38*c-.52*u+.14*d),n.rotation.x=.06+.16*u+.12*Math.sin(d*Math.PI),n.userData.torso.rotation.set(.08*u,r*(.3*c-.48*u),0),n.userData.arms[i].rotation.set(1.2*c+2.45*u+1.9*d,0,-r*.06),n.userData.elbows[i].rotation.set(-.3*(1-u),0,0),n.userData.arms[1-i].rotation.set(-2.7*c+2.45*u,0,r*.12),n.userData.elbows[1-i].rotation.set(-.4-.35*u,0,0),n.position.y+=Math.sin(Ri((e-1.25)/.48,0,1)*Math.PI)*.13*s,u>.7&&d<.2){const f=i===1?0:1,h=new P(r*.12,Hr(n),-10.85);ta(n,f,h)}d&&(n.position.z=-11+2.2*d,n.userData.knees[i===1?1:0].rotation.x=.6*(1-d))}function _f(n,{phase:e,shot:t="Straight drive",contact:i,hand:s="right",edge:r=!1}){const a=vt(n),o=s==="left"?-1:1,l=n.userData.bat;n.userData.batHand=s;const c=Cr(e/.2),u=Cr((e-.2)/.23),d=Cr((e-.43)/.57),f=t==="Sweep",h=["Cut","Pull","Hook"].includes(t),g=t==="Defend",M=(g?.45:f?.7:h?.25:1)*c;n.position.z=9.8-M*.1-.45*u,n.position.y=-.12+(.12-a*(f?.48:.2))*c,n.rotation.set(.06*(1-c)-.04*c,o*Math.PI/2-o*(.12*c+.18*u+.32*d),0);const m=Ri(1.1-i.y,0,.8),p=h?.95+m:(f?1.15:.82)+m*.78;n.userData.torso.rotation.set(.25*(1-c)-.1*c,o*(.18*c-.35*u-.18*d),-o*p*u*(1-.8*d));const _=10+u*(h?10:f?64:32+m*22)*(1-.8*d);sr(n,_);const y=n.localToWorld(new P(-o*.12,2.35,.2)),b=i.clone();b.y=Ri(b.y,.2,1.65),Ba.setFromEuler(new si(0,Math.PI,-o*(f?1.35:h?1.15:0)+d*o*(h?1.6:.9)));const R=new P(r?-o*.1*a:0,-.93*a,0).applyQuaternion(Ba),E=b.clone().sub(R),x=y.clone().lerp(E,u);x.y+=d*(g?.05:.6),x.z-=d*(h?.1:.35),x.x+=d*o*(f?.5:h?.45:.15),l.position.copy(n.worldToLocal(x.clone()));const v=new Tn().setFromEuler(new si(.15,0,-o*2.25));Qd.copy(n.getWorldQuaternion(new Tn)).invert().multiply(Ba),l.quaternion.copy(v).slerp(Qd,u);for(let A=0;A<16;A++){const L=new P;for(let U=0;U<2;U++){const k=U===(s==="left"?1:0)?-.04:-.23,I=x.clone().add(new P(0,k*a,0).applyQuaternion(Ba)),G=n.userData.arms[U].getWorldPosition(new P),$=I.sub(G),W=$.length();W>.96*a&&L.addScaledVector($,(W-.96*a)/W)}if(L.y=0,L.lengthSq()<1e-8)break;L.clampLength(0,.045),n.position.addScaledVector(L,u),l.position.copy(n.worldToLocal(x.clone()))}tu(n);const C=Math.atan2(i.x-n.position.x,i.z-n.position.z)-n.rotation.y;n.userData.head.rotation.y=Ri(Math.atan2(Math.sin(C),Math.cos(C)),-1.3,1.3)}const LM=(n,e,t)=>Math.max(e,Math.min(t,n));function vf(n,e,t=!1,i=3){const s={...n},r={...e},a=[],o=1/60;for(let l=1;l<=Math.ceil(i/o);l++){const c=.0025*Math.hypot(r.x,r.y,r.z);r.x*=1-c*o,r.z*=1-c*o,r.y=(r.y-9.81*o)*(1-c*o),s.x+=r.x*o,s.y+=r.y*o,s.z+=r.z*o;const u=ea(s.x,s.z)+mt.ballRadius;if(s.y<=u&&(s.y=u,t=!0,r.y=Math.abs(r.y)*.5,r.y<.55)){r.y=0;const d=Math.hypot(r.x,r.z),f=d?Math.max(0,d-3.4*o)/d:0;r.x*=f,r.z*=f}l%3===0&&a.push({...s,t:l*o,bounced:t})}return a}function Dr(n,e,t=8.8){const i=e.x-n.position.x,s=e.z-n.position.z,r=Math.max(0,Math.hypot(i,s)-.65*vt(n)),a=n.userData?.motor||{},o=r?Math.max(0,((a.vx||0)*i+(a.vz||0)*s)/Math.hypot(i,s)):0,l=8.5,c=Math.max(0,(t-o)/l),u=(o+t)*.5*c,d=r<=u?(Math.sqrt(o*o+2*l*r)-o)/l:c+(r-u)/t,f=n.rotation.y,h=Math.atan2(i,s)-f,g=Math.abs(Math.atan2(Math.sin(h),Math.cos(h)))*.045;return d+g}function IM(n,e){let t=null;for(const i of e){if(i.y>3.6*vt(n)+.7||Math.hypot(i.x,i.z)>50.5)continue;const s=Dr(n,i),r=i.t-s,a=s+Math.max(0,-r)*1.7+(i.bounced?.24:0);if(r>=-.07&&i.y<=3.6*vt(n))return{...i,eta:s,cost:a,reachable:!0};(!t||a<t.cost)&&(t={...i,eta:s,cost:a,reachable:!1})}return t||{...e[e.length-1],eta:5,cost:8,reachable:!1}}function wo(n,e,t,i,s=.34){const r=n.x-t.x,a=n.y-t.y,o=n.z-t.z,l=e.x-i.x-r,c=e.y-i.y-a,u=e.z-i.z-o,d=l*l+c*c+u*u,f=r*r+a*a+o*o-s*s;if(f<=0)return 0;if(d<1e-12)return null;const h=2*(r*l+a*c+o*u),g=h*h-4*d*f;if(g<0)return null;const M=(-h-Math.sqrt(g))/(2*d);return M>=0&&M<=1?M:null}function NM(n,e,t=50){if(Math.hypot(n.x,n.z)>=t)return 0;if(Math.hypot(e.x,e.z)<t)return null;const i=e.x-n.x,s=e.z-n.z,r=i*i+s*s;if(r<1e-12)return 0;const a=2*(n.x*i+n.z*s),o=n.x*n.x+n.z*n.z-t*t;return LM((-a+Math.sqrt(Math.max(0,a*a-4*r*o)))/(2*r),0,1)}function UM(n,e,t){const s=vf(n,e,!1,3.7);for(const r of s){if(Math.hypot(r.x,r.z)>=50)break;if(r.y>2.5)continue;const a=Math.hypot(r.x,Math.abs(r.z)-10.4);if(!(r.t+.3+a/30>=3.7)&&t.some(o=>Dr(o,r)<=r.t+.12))return!1}return!0}function OM(n,e){if(!n.runActive)return{moved:!1,finished:!1};const t=!!n.runReturning,i=Math.max(0,Math.min(1,n.runProgress+(t?-1:1)*e/2.7));n.runProgress=i;let s=!1;return t&&i<=0?(n.runActive=!1,n.runReturning=!1,n.queuedRun=!1,s=!0):!t&&i>=1&&(n.runs++,n.runProgress=0,n.runActive=!!n.queuedRun,n.runAllowed=!!n.queuedRun,n.queuedRun=!1,s=!0),{moved:!0,finished:s,position:i,returning:t}}function FM(n){return n.runActive&&n.runProgress>.03&&n.runProgress<.96?n.throwAccurate?"run-out":"missed-active":"complete"}function BM(n,e,t){return t==="bowler"?n<e?"striker":"partner":n>e?"striker":"partner"}function zM(n){return n.runActive?(n.runAllowed=!1,n.queuedRun=!1,n.runReturning=!0,!0):!1}function xc(n){return n.runActive?n.runReturning?"returning":(n.queuedRun=!0,"queued"):(n.runAllowed=!0,n.runActive=!0,n.runReturning=!1,n.runProgress=0,n.queuedRun=!1,"started")}function kM(n){return n.runActive?n.runReturning?"returning":n.runProgress>=.5?xc(n):(zM(n),"back"):xc(n)}function HM(n){return 4+n.runs+ +(!!n.runActive&&!n.runReturning&&n.runProgress>.5)}const dl={"Left cover":{angle:.72,speed:23,lift:2,autoRun:!0},"Right cover":{angle:-.72,speed:23,lift:2,autoRun:!0},"Straight drive":{angle:0,speed:24,lift:1.4,autoRun:!0},"Attacking drive":{angle:0,speed:25,lift:8.5,autoRun:!0},Defend:{angle:.15,speed:8,lift:.6,autoRun:!1},Sweep:{angle:1.82,speed:18,lift:.35,autoRun:!0},Hook:{angle:-2.25,speed:23,lift:6,autoRun:!0},Pull:{angle:-1.45,speed:22,lift:3.5,autoRun:!0},Cut:{angle:1.55,speed:22,lift:2.3,autoRun:!0},Flick:{angle:2.8,speed:17,lift:1.4,autoRun:!0}},_c={ArrowLeft:"Left cover",ArrowRight:"Right cover",ArrowUp:"Attacking drive",ArrowDown:"Defend",Space:"Sweep",Digit1:"Hook",Digit2:"Pull",Digit3:"Cut",Digit4:"Flick",Digit5:"Straight drive"};function GM(n,e,t,i=!1){return Math.abs(t)>(i?2:1.65)?!1:e<=(n==="Defend"?1.9:n==="Sweep"?1.45:3)+(i?.45:0)&&e>=.15}function VM(n,e,t=Math.random,i={}){const s=dl[n]||dl["Attacking drive"],r=Math.max(.55,Math.min(1,1-e*.5)),a=i.secondaryShot&&dl[i.secondaryShot],o=(p,_)=>_==="Sweep"&&i.hand==="left"?-p.angle:p.angle,l=o(s,n),c=a?o(a,i.secondaryShot):0,d=(a?Math.atan2(Math.sin(l)+Math.sin(c),Math.cos(l)+Math.cos(c)):l)+(t()-.5)*.22+Math.max(-.14,Math.min(.14,(i.line||0)*.12)),f=a?(s.speed+a.speed)/2:s.speed,h=i.power?1.4:1,g=f*r*h*(i.difficulty==="easy"?1.08:1)*(.94+t()*.12),M=a?(s.lift+a.lift)/2:s.lift,m=Math.max(.3,M+Math.max(-.4,Math.min(1.2,((i.height??.8)-.8)*.5)))+(i.power?10*r:0);return{x:Math.sin(d)*g,y:m,z:-Math.cos(d)*g,autoRun:s.autoRun}}function Mf(){return[{batters:{},bowlers:{}},{batters:{},bowlers:{}}]}function th(n,e){return n.batters[e]||{runs:0,balls:0}}function WM(n,e){return n.bowlers[e]||{balls:0,runs:0,wickets:0}}function XM(n,e,t,i,s=null){const r=n.extras||={wides:0,noBalls:0,byes:0,legByes:0};i.extra==="WIDE"&&(r.wides+=i.penalty+i.runs),i.extra==="NO BALL"&&(r.noBalls+=i.penalty),i.byes&&(r[i.legByes?"legByes":"byes"]+=i.runs);const a=n.batters[e]||={runs:0,balls:0},o=n.bowlers[t]||={balls:0,runs:0,wickets:0};if(i.extra!=="WIDE"&&a.balls++,i.extra!=="WIDE"&&!i.byes&&(a.runs+=i.runs),i.legal&&o.balls++,o.runs+=(i.byes?0:i.runs)+i.penalty,i.dismissal&&i.dismissal!=="RUN OUT"&&o.wickets++,i.dismissal&&s){const l=n.batters[s.batter]||={runs:0,balls:0},c=s.fielder,u={CAUGHT:c?`c ${c} b ${t}`:`caught b ${t}`,"CAUGHT & BOWLED":`c & b ${t}`,STUMPED:`st ${c||"keeper"} b ${t}`,"RUN OUT":"run out",BOWLED:`b ${t}`,LBW:`lbw b ${t}`,"HIT WICKET":`hit wicket b ${t}`};l.dismissal=u[i.dismissal]||i.dismissal}}function vc(n){return n.balls?(n.runs*100/n.balls).toFixed(2):"0.00"}function Sf(n){return n.balls?(n.runs*6/n.balls).toFixed(2):"—"}function qM(){return{left:.55,right:-.55}}function YM(n,e=!0){const t=n==="left"?-1:1;return{hand:t<0?"left":"right",sign:t,yaw:t*Math.PI/2,headYaw:e?t*Math.PI/2:-t*Math.PI/2}}function yf(n){return{x:n==="left"?-1.5:1.5,y:0,z:-20,arm:n==="left"?0:1}}function $M(n){return Math.max(0,Math.min(1,(n-1.05)/.75))*Math.PI*1.5}function KM(n,e){const t=yf(e);return n.position.set(t.x,t.y,t.z),n.rotation.set(0,0,0),n.userData.arms.forEach(i=>i.rotation.set(0,0,0)),n.userData.legs.forEach(i=>i.rotation.set(0,0,0)),n.userData.knees?.forEach(i=>i.rotation.set(0,0,0)),n.userData.elbows?.forEach(i=>i.rotation.set(0,0,0)),n.userData.arms.forEach(i=>{i.scale&&(i.scale.y=1)}),t}function ZM(n){n.position.copy(n.userData.home),n.rotation.x=0,n.rotation.z=0,n.userData.arms.forEach(e=>e.rotation.set(0,0,0)),n.userData.legs.forEach(e=>e.rotation.set(0,0,0)),n.userData.knees?.forEach(e=>e.rotation.set(0,0,0)),n.userData.elbows?.forEach(e=>e.rotation.set(0,0,0)),n.userData.arms.forEach(e=>{e.scale&&(e.scale.y=1)})}function JM(n){return{x:yf(n).x>0?-2.4:2.4,y:0,z:-9.75}}function QM(n,e,t,i=null){const s=Math.max(0,Math.min(1,t));return s===0?{x:n.x,y:n.y,z:n.z}:s===1?{x:e.x,y:e.y,z:e.z}:{x:n.x+(e.x-n.x)*s,y:n.y+(e.y-n.y)*s+(i===null?Math.sin(Math.PI*s)*2:4.905*i*i*s*(1-s)),z:n.z+(e.z-n.z)*s}}function Mc(n,e){const t=Math.max(0,Math.min(1,e));if(n==="Full toss")return 2.7-1.85*t;const i={Yorker:.94,Full:.82,Good:.62,Short:.44,Bouncer:.3}[n]??.62,s={Yorker:.25,Full:.55,Good:.85,Short:1.45,Bouncer:2.55}[n]??.85;if(t<=i)return .22+2.48*(1-t/i);const r=(t-i)/(1-i);return .22+(s-.22)*r+Math.sin(Math.PI*r)*(n==="Bouncer"?.35:.18)}function jM(n,e,t=Math.random){const i=["Good","Good","Full","Short","Yorker","Bouncer","Full toss"],s=e?i[Math.floor(t()*i.length)]:n,r=t(),a=r<.045,o=!a&&r<.105,l=o?(t()<.5?-1:1)*(2.7+t()*.5):(t()-.5)*2;return{type:s,line:l,noBall:a,wide:o}}function eS(n,e=Math.random){const t=n.includes("spin")?[75,98]:n==="fast"?[125,150]:[100,120];return Math.round(t[0]+e()*(t[1]-t[0]))}function tS(n,e){return Math.abs(n.z-e.z)<1.25&&Math.abs(n.x-e.x)<.75&&n.y<2.9}function Ef({runs:n=0,dismissal:e=null,noBall:t=!1,wide:i=!1,byes:s=!1,legByes:r=!1,freeHit:a=!1}){const o=t?"NO BALL":i?"WIDE":null,c=(t||a||i&&!["STUMPED","HIT WICKET"].includes(e))&&e!=="RUN OUT"?null:e;return{legal:!o,penalty:o?1:0,runs:n,dismissal:c,extra:o,...(s||r)&&!i?{byes:!0}:{},...r&&!i?{legByes:!0}:{}}}function nS({x:n,y:e,releaseX:t,releaseZ:i,type:s}){const l=9.2-i,c=n+(l?(n-t)/l*(10.4-9.2):0),u=(Mc(s,1)-Mc(s,.98))/(.02*20.12),d=Math.max(.27,e+u*(10.4-9.2));return Math.abs(c)<=.395+.27&&d<=1.34+.27?{x:c,y:d,z:10.4}:null}function iS(n,e){return e.extra==="NO BALL"||n&&!e.legal}const ji={horizon:{name:"Horizon Arena",city:"Mumbai, India",description:"A full house. A fresh innings.",turf:2583867,accent:12844884,sky:1056306},coastal:{name:"Coastal Oval",city:"Cape Town, South Africa",description:"Ocean air. Electric atmosphere.",turf:3701835,accent:5627373,sky:1518656},riverside:{name:"Riverside Ground",city:"London, England",description:"Old soul. A modern stage.",turf:3568195,accent:16747691,sky:1646903}};function sS(n){const e=document.querySelector(".topnav"),t=document.createElement("a");if(t.href="./",t.className="era-switch",t.textContent="↗ CHANGE ERA",t.setAttribute("aria-label","Return to era selection"),document.querySelector(".top-right").prepend(t),!n.modern)return;document.querySelector(".brand-name").innerHTML="CRICKET<span> <em>2027</em></span><small>THE NEXT INNINGS</small>",e.innerHTML='<span class="active">PLAY</span><span>INTERNATIONAL</span><span class="nav-season">SEASON 2027</span>',document.querySelector(".edition").innerHTML='<i class="live-dot"></i> MODERN EDITION',document.querySelector(".herohead .eyebrow").textContent="THE GAME HAS MOVED ON. SO HAVE YOU.",document.querySelector(".herohead h1").innerHTML="THE NEXT INNINGS.<br><span>STARTS WITH YOU.</span>",document.querySelector(".herohead p").innerHTML="Six nations. One unforgettable feeling.<br>Make this your moment.",document.querySelector(".ground-label strong").textContent=n.venue,document.querySelector(".match-info .info-row b").textContent=n.venue,document.querySelector(".panel-head").firstChild.textContent="MATCH CENTRE ",document.querySelector(".bottomline>span").innerHTML='1997 <span class="footer-line"></span> 2027 &nbsp; <b>THEN. NOW. ALWAYS.</b>';const i=document.createElement("div");i.className="modern-match-ribbon",i.innerHTML="<span><i></i> INTERNATIONAL CRICKET</span><span>HORIZON ARENA <b>•</b> MUMBAI</span><span>2027 SEASON</span>",document.querySelector(".game-layout").before(i)}function rS(n,e){if(!n.modern)return;const t=document.querySelector(".modal");t.classList.add("modern-setup"),t.querySelector(".eyebrow").textContent="YOUR MATCHDAY STARTS HERE",t.querySelector("h2").innerHTML="BUILD YOUR <span>BIG MOMENT.</span>";const i=document.createElement("div");i.className="setup-intro",i.innerHTML="<span>01 <b>CHOOSE YOUR SIDES</b></span><span>02 <b>SET THE STAGE</b></span><span>03 <b>OWN THE CREASE</b></span>",t.querySelector(".setup").prepend(i);const s=document.createElement("label");s.className="match-conditions venue-picker",s.innerHTML=`THE STAGE <select id="venue-select" aria-label="Modern stadium">${Object.entries(ji).map(([a,o])=>`<option value="${a}" ${a===e?"selected":""}>${o.name} · ${o.city}</option>`).join("")}</select>`,t.querySelector(".setup-options").after(s),t.querySelector(".setup-options").innerHTML='<div class="option">THE EXPERIENCE<b>MODERN INTERNATIONAL</b></div><div class="option">THE MOVEMENT<b>ATHLETIC & RESPONSIVE</b></div><div class="option">THE SQUADS<b>CONTEMPORARY GENERATION</b></div>';const r=document.createElement("p");r.className="roster-source",r.textContent="Squads are fictional. Reorder to select your XI.",t.querySelector(".setup-footer").before(r),t.querySelector("#start").textContent="TAKE THE FIELD ↗",t.querySelector(".setup-footer p").textContent="Your first 11 take the field. Move players up or down to shape your side; the remaining four are your reserves."}function bf(n){const e=ji[n]||ji.horizon;document.querySelector(".match-info .info-row b").textContent=e.name,document.querySelector(".ground-label strong").textContent=e.name.toUpperCase();const t=document.querySelector(".modern-match-ribbon");return t&&(t.children[1].textContent=`${e.name.toUpperCase()} • ${e.city.toUpperCase()}`),e}function aS(n,e,t=0){return n.wide?n.line*.5:(e==="left"?-.2:.2)+n.line*.45+t*.4}function oS({release:n,line:e,travel:t,length:i,movement:s=0,spin:r=!1,turn:a=r?s:0,pitch:o="horizon"}){const c={Yorker:.94,Full:.82,Good:.62,Short:.44,Bouncer:.3}[i]??.62,u=Math.max(.16,t*c),d=i==="Full toss"?(.75-n.y+.5*9.81*t*t)/t:(mt.pitchTop+mt.ballRadius-n.y+.5*9.81*u*u)/u,f=r?0:s*2.7;return{velocity:{x:(e-n.x-.5*f*t*t)/t,y:d,z:(9.2-n.z)/t*1.025},swing:f,turnVelocity:a*(o==="horizon"?2.8:o==="coastal"?1.9:2.3),pitchRestitution:o==="coastal"?.68:o==="riverside"?.52:.58,spin:r?{x:s>0?-10:10,y:s*60,z:s*24}:{x:-7,y:0,z:0}}}function lS(n,e,t,i="right",s={}){const r=Math.max(-.65,Math.min(.65,t)),a=r*.48*(i==="left"?-1:1),o=Math.cos(a),l=Math.sin(a),c=Math.min(1.18,1+Math.hypot(e?.x||0,e?.z||0)/220),u=Math.max(0,1-Math.abs(r)/.55);let d=Math.max(.25,n.y+Math.abs(r)*1.1);return s.shot==="Attacking drive"&&(d=Math.max(d,12+u*3)),s.power&&s.shot!=="Defend"&&(d=Math.max(d,18+u*7)),{x:(n.x*o-n.z*l)*c,y:d,z:(n.x*l+n.z*o)*c,autoRun:n.autoRun}}function cS(n){if(!n)return"Straight drive";const e=n.lineX*(n.battingHand==="left"?-1:1);return n.length==="Bouncer"?"Hook":n.length==="Short"?e>.26?"Cut":"Pull":n.length==="Yorker"?"Defend":n.spin&&n.length==="Good"?"Sweep":e<-.25?"Flick":"Straight drive"}function uS({line:n,hand:e,timing:t,shot:i}){return n*(e==="left"?-1:1)>.27&&Math.abs(t)>.19&&["Defend","Left cover","Right cover","Straight drive","Attacking drive"].includes(i)}function dS(n,e){return{x:(e==="left"?-1:1)*Math.min(9,Math.abs(n.z)*.24),y:2.6,z:Math.max(5,n.z*.41),autoRun:!1}}function hS(n){const e=n.parameters;return n.type==="SphereGeometry"?new At(e.radius,Math.min(8,e.widthSegments),Math.min(6,e.heightSegments),e.phiStart,e.phiLength,e.thetaStart,e.thetaLength):n.type==="CapsuleGeometry"?new Gt(e.radius,e.height,Math.min(2,e.capSegments),Math.min(6,e.radialSegments),e.heightSegments):n}function fS(n,e,{mobile:t=!1}={}){const i=new Map,s=new Ye,r=new Map,a=new Ye().makeScale(0,0,0);for(const l of e)l.traverse(c=>{if(!c.isMesh||c.isSkinnedMesh||c.userData.replacedBySkin||Array.isArray(c.material)||c.material.map)return;const u=c.material,d=c.geometry,f={...d.parameters};let h=null;d.type==="BoxGeometry"?(h=new P(f.width,f.height,f.depth),delete f.width,delete f.height,delete f.depth):d.type==="SphereGeometry"&&(h=new P().setScalar(f.radius),delete f.radius);const g=JSON.stringify([d.type,f,u.type,u.roughness,u.metalness,u.side]);if(!r.has(g))r.set(g,{geometry:d,material:u,objects:[],dimensions:h});else if(h){const M=h.divide(r.get(g).dimensions);(M.x!==1||M.y!==1||M.z!==1)&&i.set(c,M)}r.get(g).objects.push(c),c.layers.set(1)});for(const l of r.values()){const c=l.material.clone();c.color.setHex(16777215);const u=t?hS(l.geometry):l.geometry;l.mesh=new Pi(u,c,l.objects.length),l.colors=l.objects.map(()=>new He(-1,-1,-1)),l.mesh.castShadow=!t,l.mesh.receiveShadow=!0,l.mesh.frustumCulled=!1,l.mesh.instanceMatrix.setUsage(zc),n.add(l.mesh)}function o(){e.forEach(l=>l.userData.updateSkin?.()),n.updateMatrixWorld(!0);for(const{objects:l,mesh:c,colors:u}of r.values()){let d=!1;for(let f=0;f<l.length;f++){const h=l[f],g=i.get(h),M=g?s.copy(h.matrixWorld).scale(g):h.matrixWorld;c.setMatrixAt(f,h.visible?M:a),u[f].equals(h.material.color)||(u[f].copy(h.material.color),c.setColorAt(f,u[f]),d=!0)}c.instanceMatrix.needsUpdate=!0,d&&(c.instanceColor.needsUpdate=!0)}}return o(),{update:o,batchCount:r.size}}function Pr(n,e,t,i,s=1,r=1){const a=n.instanceMatrix;let o=!1;function l(u,d){const f=Math.ceil(u/r)*s,h=Math.ceil(d/r)*s;h<=f||(a.addUpdateRange(f*a.itemSize,(h-f)*a.itemSize),o=!0)}const c=e+t;l(e,Math.min(c,i)),c>i&&l(0,c-i),o&&(a.needsUpdate=!0)}function pS(n,e){const t=new Pi(new Rt(.11,.4,.11),new yt({color:13872517,roughness:.9}),e.length*2),i=new Pi(new Rt(.075,.125,.025),new gi({color:13233919}),Math.ceil(e.length/45)),s=new Pi(new Nn(.6,.38),new yt({color:12844884,side:Vt}),Math.ceil(e.length/75));for(const o of[t,i,s])o.instanceMatrix.setUsage(zc);const r=new bt;n.add(t,i,s);function a(o,l,c,u){for(let d=0;d<l;d++){const f=(o+d)%e.length,h=e[f],g=Math.sin(c*.004+h.phase),M=u?Math.max(0,g):.08;for(let m=0;m<2;m++){const p=m?1:-1,_=p*.29;r.position.set(h.x+Math.cos(h.rotation)*_,h.y-.1+M*.3,h.z-Math.sin(h.rotation)*_),r.rotation.set(M*-.4,h.rotation,p*(.12+M*2.4)),r.scale.setScalar(h.scale),r.updateMatrix(),t.setMatrixAt(f*2+m,r.matrix)}f%45===0&&(r.position.set(h.x+.24,h.y+.25+M*.3,h.z),r.rotation.set(-.1,h.rotation,M*.2),r.scale.setScalar(h.scale),r.updateMatrix(),i.setMatrixAt(f/45,r.matrix)),f%75===0&&(r.position.set(h.x,h.y+.9+M*.3,h.z),r.rotation.set(.1,h.rotation+g*.2,.15+g*.15),r.scale.setScalar(h.scale),r.updateMatrix(),s.setMatrixAt(f/75,r.matrix))}l<e.length&&(Pr(t,o,l,e.length,2),Pr(i,o,l,e.length,1,45),Pr(s,o,l,e.length,1,75))}return a(0,e.length,0,!1),{update:a}}const us=tt.clamp,hl=n=>tt.smoothstep(us(n,0,1),0,1),fn=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z),mr=n=>n&&["dive","slide","recover","jump"].includes(n.mode),Ct=(n,e)=>n.userData.arms[e].userData.hand.getWorldPosition(new P);class mS{constructor(e){this.players=e,this.begin()}begin(){this.elapsed=0,this.planAt=-1,this.assignments=[],this.held=null,this.events=[],this.closestHand=1/0,this.groundPursuit=null;for(const e of this.players)e.userData.fielding={mode:"ready",elapsed:0},e.userData.motor=To(e.userData.identityPhase||0)}hold(e){this.held=e,e.userData.fielding.held=!0}release(e){this.held===e&&(this.held=null)}update({ball:e,previousBall:t,velocity:i,bounced:s,dt:r,live:a=!0}){if(!a)return this.finishActions(r,e),null;const o=Math.max(1,Math.ceil(r*120-1e-8));for(let l=0;l<o;l++){const c=t.clone().lerp(e,l/o),u=t.clone().lerp(e,(l+1)/o),d=this.step({ball:u,previousBall:c,velocity:i,bounced:s,dt:r/o});if(d)return d.t!==void 0&&(d.t=(l+d.t)/o),d}return null}step({ball:e,previousBall:t,velocity:i,bounced:s,dt:r}){this.elapsed+=r;const a=NM(t,e);if(this.elapsed-this.planAt>=.12){const l=vf(e,i,s);if(this.assignments=this.players.filter(c=>!mr(c.userData.fielding)).map(c=>({p:c,plan:IM(c,l)})).sort((c,u)=>c.plan.cost-u.plan.cost),s&&i.lengthSq()<.25&&this.assignments.length){const c=this.groundPursuit;let u=c?this.assignments.findIndex(h=>h.p===c.player):-1;(u<0||fn(c.ball,e)>.3)&&(u=0,this.groundPursuit={player:this.assignments[0].p,ball:e.clone(),distance:1/0,at:this.elapsed});const d=this.groundPursuit,f=fn(d.player.position,e);f<d.distance-.1?(d.distance=f,d.at=this.elapsed):this.elapsed-d.at>1.2&&this.assignments.length>1&&(u=(u+1)%this.assignments.length,d.player=this.assignments[u].p,d.distance=1/0,d.at=this.elapsed),this.assignments=[this.assignments[u]]}else this.groundPursuit=null;this.path=l,this.planAt=this.elapsed}let o=null;for(const l of this.players){const c=[Ct(l,0),Ct(l,1)],u=l.userData.fielding,d=vt(l),f=fn(l.position,e)<2.8*d+.35,h=f?lc(l):null;if(u.bodyCooldown=Math.max(0,(u.bodyCooldown||0)-r),u.handCooldown=Math.max(0,(u.handCooldown||0)-r),mr(u))this.advanceAction(l,r,e);else{const M=this.assignments.findIndex(v=>v.p===l),m=this.assignments[M],p=i.x**2+i.z**2,_=p?us(((l.position.x-e.x)*i.x+(l.position.z-e.z)*i.z)/p-.7*d/Math.sqrt(p),0,.16):0,y=e.clone().addScaledVector(i,_);y.y-=4.905*_**2;const b=p?us(((l.position.x-e.x)*i.x+(l.position.z-e.z)*i.z)/p,0,.7):0,R=e.clone().addScaledVector(i,b);R.y=e.y;const E=s&&e.y<.55*d&&fn(l.position,e)<Math.max(1.5,Math.sqrt(p)*.7)&&fn(l.position,R)<.8*d;E||(u.groundBlend=0,u.groundAnchor=null);const x=!s&&e.y<=3.8*d&&fn(l.position,e)<2.2&&l.userData.arms.some(v=>v.getWorldPosition(new P).distanceTo(y)<.99*d+Gr(l)*.5);if(E){const v=new P(i.x,0,i.z).normalize();(u.mode!=="ground-set"||!u.groundAnchor)&&(u.groundAnchor=R.clone()),u.groundAnchor.y=e.y;const C=u.groundAnchor.clone().addScaledVector(v,d),A=p>1?Math.atan2(-i.x,-i.z):Math.atan2(e.x-l.position.x,e.z-l.position.z);Ss(l,C,r,3.8,{facingYaw:A}),u.mode="ground-set",ff(l,u.groundAnchor,r),this.watch(l,e,r)}else if(x)Fa(l,r,18),uo(l,y,r),u.mode="reach",this.prepareCatch(l,y,r),this.watch(l,e,r);else if(M>=0&&M<2&&this.elapsed>.12+(l.userData.identityPhase||0)*.012){const v=m.plan,C=new P(v.x,0,v.z),A=Math.atan2(e.x-l.position.x,e.z-l.position.z),L=Math.atan2(C.x-l.position.x,C.z-l.position.z),U=!s&&v.t<1.8&&fn(l.position,C)<5.5&&Math.abs(Vr(A-L))>1.8,k=!s&&fn(l.position,e)<4.3&&e.y<4.2*d;U&&!u.backpedalled&&(u.backpedalled=!0,this.events.push({type:"backpedal",player:l})),u.mode=U?"backpedal":"pursuit",Ss(l,C,r,U?4.6:M===0?8.8:7.8,U||k?{facingYaw:A}:{});const I=this.path.find(q=>q.t>=.3)||v,G=fn(l.position,I),$=e.x*i.x+e.z*i.z>0,W=s&&Math.hypot(e.x,e.z)>35&&$&&Math.hypot(i.x,i.z)>3,se=!s&&e.y<2.8*d&&I.y>.45*d&&I.y<2.8*d;(W||se)&&G>1.8*d&&G<5.4*d&&fn(l.position,e)<7?(this.startDive(l,I,W),this.advanceAction(l,r,e)):!s&&e.y>3.05*d&&e.y<4.25*d&&i.y<2&&fn(l.position,e)<1.65?(u.mode="jump",u.elapsed=0,u.vx=l.userData.motor.vx*.65,u.vz=l.userData.motor.vz*.65,this.events.push({type:"jump",player:l}),this.advanceAction(l,r,e)):!s&&fn(l.position,e)<4.3&&e.y<4.2*d&&(u.mode=U?"backpedal":"reach",this.prepareCatch(l,e,r)),this.watch(l,e,r)}else Fa(l,r),uo(l,e,r),this.watch(l,e,r),u.mode=l.userData.motor.speed>.1?"brake":"ready"}const g=[Ct(l,0),Ct(l,1)];this.closestHand=Math.min(this.closestHand,g[0].distanceTo(e),g[1].distanceTo(e));for(let M=0;M<2;M++){const m=wo(c[M],g[M],t,e,Gr(l));u.handCooldown>0||m===null||a!==null&&m>=a||Math.hypot(l.position.x,l.position.z)>49.65||(!o||m<o.t)&&(o={player:l,t:m,type:s?"stop":"catch",part:"hand",hand:M,controlled:s&&i.length()<18&&!mr(u)})}if(h&&u.bodyCooldown===0&&Math.hypot(l.position.x,l.position.z)<49.65){const M=lc(l);for(let m=0;m<M.length;m++){const p=Jv(h[m],M[m],t,e);p&&o?.player===l&&o.part==="hand"&&/^(forearm|arm)/.test(p.part)||p&&(a===null||p.t<a)&&(!o||p.t<o.t-.015)&&(o={...p,player:l,type:"block"})}}}if(o)return o.type==="catch"?this.hold(o.player):(o.type!=="block"&&(o.player.userData.fielding.handCooldown=.15),o.player.userData.fielding.bodyCooldown=.15),this.events.push(o),o;if(a===null){const l=this.players.filter(c=>!mr(c.userData.fielding)).sort((c,u)=>fn(c.position,e)-fn(u.position,e))[0];if(l&&s&&e.y<.65&&fn(l.position,e)<1.12*vt(l)&&Math.hypot(i.x,i.z)<10)return{type:"gather",player:l}}return null}prepareCatch(e,t,i){if(e.worldToLocal(t.clone()).z<-.35)return;const s=vt(e),r=1-Math.exp(-20*i),a=us((1.7*s-t.y)/(1.2*s),0,1);e.position.y+=(-.55*s*a-e.position.y)*r,e.rotation.x+=(.02-e.rotation.x)*r,e.userData.torso.rotation.x+=(.65*a-(t.y>3*s?.16:0)-e.userData.torso.rotation.x)*r,e.userData.role==="keeper"?(e.userData.torso.rotation.x=.25+1.3*a,sr(e)):e.userData.motor.speed<1.4&&bo(e);const o=t.clone();vn(e,0,o.clone().add(new P(.065*s,0,0))),vn(e,1,o.clone().add(new P(-.065*s,0,0)))}startDive(e,t,i=!1){const s=t.x-e.position.x,r=t.z-e.position.z,a=Math.hypot(s,r)||1,o=e.userData.fielding,l=us(e.userData.motor.speed+3,6,10.5);Object.assign(o,{mode:"dive",elapsed:0,vx:s/a*l,vz:r/a*l,held:!1,low:i}),e.rotation.y=Math.atan2(s,r),e.userData.motor.vx=o.vx,e.userData.motor.vz=o.vz,this.events.push({type:"dive",player:e})}advanceAction(e,t,i){const s=e.userData.fielding,r=vt(e);if(s.elapsed+=t,s.mode==="dive"||s.mode==="slide"){const a=s.mode==="slide",o=Math.hypot(s.vx,s.vz),l=Math.max(0,o-(a?10:1.3)*t),c=o?l/o:0,u=co(e.uuid,e.position,{x:s.vx*t,z:s.vz*t});e.position.x+=u.x,e.position.z+=u.z,s.vx*=c,s.vz*=c,e.userData.motor.vx=s.vx,e.userData.motor.vz=s.vz,e.userData.motor.speed=l,e.rotation.x=1.43*hl(s.elapsed/(s.low?.12:.19)+(a?1:0)),e.rotation.z=Math.sin(s.elapsed*5)*.07,e.position.y=(s.low?.08:a?.24:.24*hl(s.elapsed/.13)+Math.sin(us(s.elapsed/.56,0,1)*Math.PI)*.32)*r,e.userData.torso.rotation.set(.05,0,0),e.userData.legs[0].rotation.set(-.15,0,.1),e.userData.legs[1].rotation.set(.2,0,-.12),e.userData.knees[0].rotation.set(.45,0,0),e.userData.knees[1].rotation.set(.8,0,0);const d=s.held?e.localToWorld(new P(0,3.25,.12)):i.clone();vn(e,0,d.clone().add(new P(.09*r,0,0))),vn(e,1,d.clone().add(new P(-.09*r,0,0))),!a&&s.elapsed>=.56?(s.mode="slide",s.elapsed=0,this.events.push({type:"slide",player:e})):a&&(s.elapsed>.8||l<.4)&&(s.mode="recover",s.elapsed=0,s.startPitch=e.rotation.x,this.events.push({type:"recover",player:e}))}else if(s.mode==="jump"){const a=co(e.uuid,e.position,{x:s.vx*t,z:s.vz*t});e.position.x+=a.x,e.position.z+=a.z,e.position.y=Math.max(0,3.8*s.elapsed-4.905*s.elapsed*s.elapsed),e.rotation.x=.03,e.userData.torso.rotation.x=-.12,e.userData.knees.forEach(l=>l.rotation.x=.5);const o=s.held?e.localToWorld(new P(0,2.9,.55)):i.clone();vn(e,0,o),vn(e,1,o),s.elapsed>.78&&(s.mode="recover",s.elapsed=.75,s.startPitch=0)}else if(s.mode==="recover"){Fa(e,t,12);const a=hl(s.elapsed/1.05);e.rotation.x=(s.startPitch||0)*(1-a),e.rotation.z=0,e.position.y=(.24*(1-a)-.22*Math.sin(a*Math.PI))*r,e.userData.torso.rotation.x=.35*Math.sin(a*Math.PI),e.userData.knees[0].rotation.x=.3+Math.sin(a*Math.PI),e.userData.knees[1].rotation.x=.15+.65*Math.sin(a*Math.PI),e.userData.arms.forEach((o,l)=>{o.rotation.set(-.7*(1-a),0,(l?-1:1)*.15),e.userData.elbows[l].rotation.set(-.4,0,0)}),s.elapsed>=1.05&&(s.mode="ready",s.elapsed=0,e.position.y=0,e.rotation.x=0,e.userData.torso.rotation.x=0)}}finishActions(e,t,i=[]){for(const s of this.players){const r=s.userData.fielding;mr(r)?this.advanceAction(s,e,t):s!==this.held&&!i.includes(s)&&(Fa(s,e),r.mode=s.userData.motor.speed>.1?"brake":"ready",this.watch(s,t,e))}}watch(e,t,i){const s=Vr(Math.atan2(t.x-e.position.x,t.z-e.position.z)-e.rotation.y),r=e.userData.head;r.rotation.y+=(us(s,-1.25,1.25)-r.rotation.y)*(1-Math.exp(-9*i))}}function yr(n){const e=n.userData.knees.map(t=>t.localToWorld(new P(0,-.75,.105)));return n.userData.bat&&e.push(n.userData.bat.localToWorld(new P(0,-1.49,0))),e}function Tf(n,e,t,i,s,r){const a=Ms[i],o=t.clone(),l=vt(n),c=new P(.22*l,0,a.wicket+a.direction*.7*l),u=Math.atan2(-n.position.x,a.wicket-n.position.z);return Ss(n,c,r,4.8,{facingYaw:u}),n.rotation.x=.025,n.userData.torso.rotation.set(1.45*Math.min(1,s/.3),0,0),sr(n),vn(n,e,new P(0,mt.pitchTop+.45,a.wicket)),t.copy(Ct(n,e)),js(o,t,i)}class gS{constructor({players:e,keeper:t,fielding:i}){this.players=e,this.keeper=t,this.fielding=i}prepare({fielder:e,batters:t,run:i,random:s=Math.random}){const r=SM(e.position,t.map(f=>f.position),i.runActive,Math.abs(i.runnerVelocity)||7),a=Ms[r],o=new P(.35,0,a.wicket+a.direction*.65),l=this.players.filter(f=>f!==e&&!["dive","slide","recover","jump"].includes(f.userData.fielding?.mode)),c=r==="keeper"?this.keeper:l.sort((f,h)=>Dr(f,o)-Dr(h,o))[0]||this.keeper,u=e.position.distanceTo(o),d=Math.abs(Vr(Math.atan2(o.x-e.position.x,o.z-e.position.z)-e.rotation.y));return this.state={phase:"windup",elapsed:0,end:r,wicket:a,goal:o,receiver:c,fielder:e,batters:t,run:i,random:s,velocity:new P,windup:.34+d/9,direct:!!i.runActive&&Dr(c,o)>u/28+.4,received:!1},this.state}decision(){const e=this.state,t=e.wicket,i=Math.abs(e.batters[0].position.z-t.crease)<Math.abs(e.batters[1].position.z-t.crease)?0:1;return{out:!!e.run.runActive&&!Xa(yr(e.batters[i]),e.end),batterIndex:i}}moveReceiver(e,t){const i=this.state,s=i.receiver,r=Math.atan2(e.x-s.position.x,e.z-s.position.z),a=i.goal.clone();if(i.phase==="flight"&&Math.abs(i.velocity.z)>.5){const o=tt.clamp((i.goal.z-e.z)/i.velocity.z,0,.7);a.x=tt.clamp(e.x+i.velocity.x*o,-3,3)}Ss(s,a,t,7.8,{facingYaw:r}),s.position.distanceTo(e)<4&&this.fielding.prepareCatch(s,e,t)}update(e,t){let i=Math.max(0,Math.min(t,.1));const s=[];for(;i>1e-7;){const r=Math.min(i,.008333333333333333);i-=r,gf([this.state.receiver,this.state.fielder]);const a=this.step(e,r);a&&s.push(a)}return s}step(e,t){const i=this.state;if(i.elapsed+=t,i.phase==="windup"){this.moveReceiver(e,t),uo(i.fielder,i.goal,t);const s=Math.min(1,i.elapsed/i.windup),r=i.fielder;if(r.rotation.x=.08+Math.sin(s*Math.PI)*.12,r.userData.torso.rotation.y=-Math.sin(s*Math.PI)*.35,r.userData.arms[1].rotation.set(-.5-s*1.75,0,-.08),r.userData.elbows[1].rotation.set(-.35-.8*Math.sin(s*Math.PI),0,0),r.userData.arms[0].rotation.set(-.3-s*.6,0,.25),r.userData.elbows[0].rotation.set(-.55,0,0),e.copy(Ct(r,1)),s>=1){const a=e.clone(),o=r.position.clone().sub(i.goal);o.y=0,o.normalize();const l=i.direct?new P(0,.55,i.wicket.wicket):i.goal.clone().addScaledVector(o,.18).setY(2.7*vt(i.receiver)),c=a.distanceTo(l),d=i.random()>.985?.45:Math.max(.86,.985-c*.0015-(i.run.throwCount||0)*.005),f=MM(a,l,{speed:30-Math.min(5,c*.05),accuracy:d,random:i.random});return i.velocity.set(f.velocity.x,f.velocity.y,f.velocity.z),i.launch=f,i.phase="flight",i.elapsed=0,Wr(),mf({x:5,y:0,z:0}),{type:"released",end:i.end}}}else if(i.phase==="flight"){const s=[Ct(i.receiver,0),Ct(i.receiver,1)],r=e.clone();this.moveReceiver(e,t),qi(e,i.velocity,t);const a=js(r,e,i.end);if(a)return e.set(a.x,a.y,a.z),i.phase="complete",{type:"wicket",end:i.end,...this.decision()};const o=i.fielder,l=Math.min(1,i.elapsed/.35);o.userData.arms[1].rotation.x=-2.25+l*3.2,o.userData.elbows[1].rotation.x=-.35*(1-l),o.userData.torso.rotation.y=.12*l;for(let c=0;c<2;c++)if(wo(s[c],Ct(i.receiver,c),r,e,Gr(i.receiver))!==null)return i.receiver===this.keeper&&!i.takeChecked&&(i.takeChecked=!0,i.random()<.015)?(i.phase="overthrow",i.velocity.multiplyScalar(.3),i.velocity.y=-.8,{type:"overthrow",end:i.end,bobble:!0}):(i.phase="receive",i.elapsed=0,i.received=!0,e.copy(Ct(i.receiver,1)),{type:"received",end:i.end});if(i.elapsed>i.launch.duration+1.2)return i.phase="overthrow",{type:"overthrow",end:i.end}}else if(i.phase==="receive"){if(Tf(i.receiver,1,e,i.end,i.elapsed,t))return i.phase="complete",{type:"wicket",end:i.end,...this.decision()};if(i.elapsed>2)return i.phase="complete",{type:"complete",end:i.end}}return null}}function nh(n){const e=document.createElement("canvas");e.width=e.height=256;const t=e.getContext("2d");t.fillStyle=n==="grass"?"#8fa482":"#bdad8b",t.fillRect(0,0,256,256);let i=149;function s(){return i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296}for(let a=0;a<8e3;a++)t.fillStyle=a%2?"#ffffff14":"#07191020",t.fillRect(s()*256,s()*256,n==="grass"?1:2,n==="grass"?4:1);if(n==="pitch")for(const a of[30,226])for(let o=0;o<500;o++){const l=(s()+s()-1)*48;t.fillStyle=o%2?"#78623a33":"#ddcea444",t.fillRect(128+l,a+(s()+s()-1)*20,1+s()*6,1+s()*2)}const r=new Ni(e);return r.wrapS=r.wrapT=Ja,r.repeat.set(n==="grass"?35:1,n==="grass"?35:1),r.colorSpace=Bt,r}function xS(n,{grass:e,grass2:t,pitchmat:i,roof:s,roofLip:r,renderer:a,mobileRender:o=!1}){a.toneMapping=Pc,a.toneMappingExposure=1.18,a.shadowMap.type=Ws,a.setPixelRatio(Math.min(devicePixelRatio,o?1:1.5)),a.shadowMap.autoUpdate=!1,a.shadowMap.needsUpdate=!0,e.map=nh("grass"),e.color.setHex(4224837),e.needsUpdate=!0,t.map=e.map,t.color.setHex(3894588),t.needsUpdate=!0,i.map=nh("pitch"),i.color.setHex(13351311),i.needsUpdate=!0,s.visible=!1,r.material.color.setHex(6585477);const l=new yt({color:8559006,metalness:.5,roughness:.5}),c=new yt({color:14475733,side:Vt,roughness:.8}),u=new gi({color:12844884}),d=[],f=[],h=(v,C,A)=>new P(Math.sin(v)*C,A,Math.cos(v)*C);for(let v=0;v<48;v++){const C=v*Math.PI*2/48,A=(v+1)*Math.PI*2/48;for(const L of[h(C,73,15.3),h(A,73,15.3),h((C+A)/2,87,18.5)])d.push(...L.toArray());f.push([h(C,73,15.3),h(C,87,18.5),.08]),v%3===0&&f.push([h(C,82,0),h(C,87,18.5),.17])}const g=new Tt;g.setAttribute("position",new nt(d,3)),g.computeVertexNormals(),n.add(new st(g,c));const M=new Pi(new mn(1,1,1,6),l,f.length),m=new P(0,1,0);f.forEach(([v,C,A],L)=>{const U=C.clone().sub(v),k=U.length(),I=new Ye().compose(v.clone().lerp(C,.5),new Tn().setFromUnitVectors(m,U.normalize()),new P(A,k,A));M.setMatrixAt(L,I)}),n.add(M);for(const v of[-1,1]){const C=new st(new Nn(15,5),new yt({color:1384486,roughness:1}));C.position.set(0,3,v*61),C.rotation.y=v>0?Math.PI:0,n.add(C)}for(const[v,C]of[[63,.4],[70,5.9],[76.5,11.3]]){const A=new st(new Js(v,.07,5,160),u);A.rotation.x=Math.PI/2,A.position.y=C,n.add(A)}const p=document.createElement("canvas");p.width=1024,p.height=512;const _=new Ni(p);_.colorSpace=Bt;for(const v of[Math.PI*.12,Math.PI*1.12]){const C=new Lt;C.position.set(Math.sin(v)*74,11,Math.cos(v)*74),C.lookAt(0,11,0);const A=new st(new Rt(17,9,.5),new yt({color:726818}));C.add(A);const L=new st(new Nn(16,8),new gi({map:_}));L.position.z=.28,C.add(L),n.add(C)}const y=o?125:500,b=y*12,R=new Pi(new Rt(.48,.12,.43),new yt({color:2841970,roughness:.8}),b),E=new bt;for(let v=0;v<b;v++){const C=Math.floor(v/y),A=v%y/y*Math.PI*2,L=64.6+C*.98;E.position.set(Math.sin(A)*L,.7+C*.57,Math.cos(A)*L),E.rotation.y=A,E.updateMatrix(),R.setMatrixAt(v,E.matrix)}n.add(R);let x="";return{setVenue(v){e.color.setHex(v.turf),t.color.copy(e.color).multiplyScalar(1.12),u.color.setHex(v.accent)},setNight(v){a.toneMappingExposure=v?1.26:1.05},update(v){const C=JSON.stringify(v);if(C===x)return;x=C;const A=p.getContext("2d");A.fillStyle="#091d2a",A.fillRect(0,0,1024,512),A.fillStyle="#c3ff54",A.fillRect(0,0,1024,9),A.font="700 29px Arial",A.textAlign="left",A.fillText("2027 EDITION",50,65),A.textAlign="right",A.fillStyle="#91b7b1",A.font="24px Arial",A.fillText(v.venue.toUpperCase(),974,65),A.textAlign="center",A.fillStyle="#f0f8e8",A.font="bold 55px Arial",A.fillText(v.team.toUpperCase(),512,165),A.font="bold 135px Arial",A.fillText(v.score,512,315),A.fillStyle="#c3ff54",A.font="32px Arial",A.fillText(`${v.overs} OVERS   •   INTERNATIONAL`,512,395),A.fillStyle="#70978c",A.font="20px Arial",A.fillText("THEN. NOW. ALWAYS.",512,465),_.needsUpdate=!0}}}function _S(n,e,t=Math.random){const i=t()<.5?"heads":"tails",s=n===i,r=s?e:t()<.5?"bat":"bowl";return{result:i,userWon:s,choice:r,userBatsFirst:s?r==="bat":r==="bowl"}}const vS=2;function Gs(n=0){return Math.max(0,vS-n)}function MS(n=0,e=!1){const t=e&&Gs(n)>0;return{enabled:t,used:n+(t?1:0)}}const V=Bu(new URLSearchParams(location.search).get("era"))||Bu("97"),ho=V.rosters;let hi="horizon",Sc=1/60;const wf={India:{flag:"🇮🇳",color:2254510},Australia:{flag:"🇦🇺",color:14927692},England:{flag:"🏴",color:15657433},"West Indies":{flag:"🌴",color:8465472},Pakistan:{flag:"🇵🇰",color:2589763},"South Africa":{flag:"🇿🇦",color:3114586}};if(V.modern){const n={India:1407691,Australia:15911989,England:1589114,"West Indies":9580103,Pakistan:1276754,"South Africa":1207124};for(const[e,t]of Object.entries(n))wf[e].color=t}const Wn=Object.fromEntries(Object.entries(wf).map(([n,e])=>[n,{...e,players:ho[n].map(t=>t.name)}])),SS=new Map(Object.values(ho).flat().map(n=>[n.name,n]));function Nt(n){return SS.get(n)||{name:n,bat:"right",bowl:"right"}}let Af="normal",iu=!1,su=!1,wn=nu,ln="India",kn="Australia",en={},T={phase:"ready",innings:0,score:[0,0],wickets:[0,0],balls:[0,0],history:[],extras:[0,0],stats:Mf(),shot:null,line:"Good",batIndex:0,striker:0,partner:1,nextBatter:2,bowlIndex:8,anim:null,camera:0,muted:!0,shotDirection:0,autoAt:0};Object.entries(Wn).forEach(([n,e])=>en[n]=V.modern?[...e.players]:[...e.players,"Reserve A","Reserve B","Reserve C","Reserve D"]);const Rf=window.matchMedia("(prefers-reduced-motion: reduce)"),yS=document.querySelector("#app");yS.innerHTML=`<div class="shell"><header class="topbar"><div class="brand"><div class="brand-icon">◉</div><div class="brand-name">CRICKET<span> <em>1997</em></span><small>THE CLASSIC GAME</small></div></div><nav class="topnav"><span class="active">MATCH DAY</span><span>THE PAVILION</span><span>HOW TO PLAY</span></nav><div class="top-right"><span class="edition"><i class="live-dot"></i> THE CLASSIC EDITION</span><button class="sound" id="sound">♪ SOUND OFF</button></div></header><main class="main"><div class="herohead"><div><div class="eyebrow">● &nbsp; THE GENTLEMAN'S GAME, REIMAGINED</div><h1>WELCOME TO <span>THE CREASE.</span></h1></div><p>A little nostalgia. A lot of cricket.<br>Pick your side and make every ball count.</p></div><div class="game-layout"><section class="stage" id="stage"><div class="stage-top"><span id="broadcast" class="visually-hidden">MATCH PREVIEW</span><div class="live-tools"><span class="live-badge" id="live-badge"><i></i> LIVE</span><button id="pause-game" class="fullscreen-control" aria-label="Pause match" title="Pause match">Ⅱ</button><button id="fullscreen" class="fullscreen-control" aria-label="Enter fullscreen" title="Enter fullscreen">⛶</button></div></div><div class="play-status" id="play-status">MATCH PREVIEW</div><div class="commentary" id="commentary" aria-live="polite">WELCOME TO THE GRAND OVAL</div><div class="delivery-speed" id="delivery-speed" hidden></div><div id="ball-flight-label" class="ball-flight-label" hidden></div><div class="stage-controls hidden" id="stage-controls"></div><div class="run-inset hidden" id="run-inset"><div id="run-inset-label">BATTERS RUNNING</div><div class="run-camera" id="run-camera"></div><small>LIVE PITCH VIEW</small></div><div class="tab-pause hidden" id="tab-pause"><div><strong>MATCH PAUSED</strong><p>Another game tab is active.</p><button id="resume-match">RESUME THIS MATCH</button></div></div><div class="player-intro hidden" id="player-intro" aria-live="polite"></div><div class="replay-ui hidden" id="replay-ui"><span>◉ &nbsp; ACTION REPLAY</span><button id="skip-replay">SKIP REPLAY &nbsp; ⏭</button></div><div class="broadcast-score" id="broadcast-score" aria-label="Live match figures"></div><div class="stage-bottom"><div class="ground-label"><span id="ground-time">A PERFECT DAY FOR CRICKET</span><strong>THE GRAND OVAL</strong><span id="ground-conditions">EST. 1997 &nbsp; / &nbsp; CLEAR SKIES</span></div><div class="stage-message" id="message">YOUR MATCH AWAITS<br><span style="color:#aabbab">SET YOUR TEAMS TO BEGIN</span></div></div></section><aside class="sidebar"><section class="panel"><div class="panel-head">THE SCOREBOARD <span class="tag" id="innings-tag">QUICK MATCH</span></div><div class="score" id="score"></div></section><section class="panel"><div class="panel-head">MATCH DETAILS <span class="tag" id="match-time">● &nbsp; DAY MATCH</span></div><div class="match-info"><div class="info-row"><span>Venue</span><b>The Grand Oval</b></div><div class="info-row"><span>Match type</span><b id="match-format">5 overs per side</b></div><div class="info-row"><span>Conditions</span><b id="conditions">Clear & sunny &nbsp; ☀</b></div><div class="stage-actions"><button class="camera" id="lighting" aria-label="Switch to night match">☀ DAY</button><button class="camera" id="camera">◈ &nbsp; CAMERA: AUTO [C]</button></div></div></section><section class="panel controls"><div class="control-title" id="control-title">READY TO PLAY?</div><div class="hint" id="hint">Choose your teams and playing XI, then step out onto the field.</div><div id="controls"></div></section></aside></div><footer class="bottomline"><span>BUILT FOR THE LOVE OF <b>THE GAME.</b> &nbsp; © 1997 / REIMAGINED</span><div class="bottom-links"><button id="help">GAMEPLAY / SHOTS</button><button id="audio-credits">AUDIO CREDITS</button><button id="newmatch">NEW MATCH ↗</button></div></footer></main></div><div id="modal-root"></div>`;const ne=n=>document.querySelector(n),ni=ne("#stage");sS(V);const Ke=new bm;Ke.background=new He(10470850);Ke.fog=new Wc(10470850,100,240);const es=V.modern&&matchMedia("(pointer: coarse)").matches,ut=new $v({antialias:!es});ut.setPixelRatio(Math.min(devicePixelRatio,2));ut.shadowMap.enabled=!0;ut.shadowMap.type=Ws;ni.prepend(ut.domElement);const ES=Zv(ut),tn=new Qn(V.modern?36:43,1,.1,400),Ka=new Zm(15004639,6387789,2.1);Ke.add(Ka);const En=new Zh(16772548,2.1);En.position.set(-30,60,20);En.castShadow=!0;En.shadow.mapSize.set(2048,2048);En.shadow.camera.left=-65;En.shadow.camera.right=65;En.shadow.camera.top=65;En.shadow.camera.bottom=-65;Ke.add(En);V.modern&&(En.shadow.mapSize.setScalar(es?512:1024),En.shadow.bias=-15e-5,En.shadow.normalBias=.03);const ru=new Zh(14412031,0);ru.position.set(35,45,-30);Ke.add(ru);const gt=n=>new yt({color:n,roughness:1}),Cf=gt(5212992),Df=gt(5740103),bs=gt(15328712),Pf=gt(13020535);gt(2703155);function xn(n,e,t,i,s,r,a){const o=new st(new Rt(n,e,t),i);return o.position.set(s,r,a),o.receiveShadow=!0,Ke.add(o),o}const au=new st(new Zc(62,96),Cf);au.rotation.x=-Math.PI/2;au.receiveShadow=!0;Ke.add(au);for(let n=-55;n<=55;n+=10){let e=Math.sqrt(Math.max(0,3481-n*n));e<1||xn(4.8,.025,e*2,Df,n,.015,0)}function Lf(n,e,t,i){const s=new st(new Js(n,e,5,120),gt(t));s.rotation.x=Math.PI/2,s.position.y=i,Ke.add(s)}Lf(50,.12,15656646,.09);Lf(62,.32,14537388,.1);{const n=V.modern?27.43:27.4,e=V.modern?10.4:10.06,t=[];for(let i=0;i<=80;i++){let s=Math.PI*i/80;t.push(new P(Math.cos(s)*n,.11,-e-Math.sin(s)*n))}for(let i=0;i<=80;i++){let s=Math.PI+Math.PI*i/80;t.push(new P(Math.cos(s)*n,.11,e-Math.sin(s)*n))}t.push(t[0].clone()),Ke.add(new Gh(new Tt().setFromPoints(t),new Kc({color:15919825})))}xn(5,.08,25,Pf,0,.08,0);xn(5.6,.025,.12,bs,0,.14,-9.3);xn(5.6,.025,.12,bs,0,.14,9.3);xn(.1,.025,2.7,bs,-2.5,.14,-10);xn(.1,.025,2.7,bs,2.5,.14,-10);xn(.1,.025,2.7,bs,-2.5,.14,10);xn(.1,.025,2.7,bs,2.5,.14,10);if(V.modern)for(const n of[-9.85,9.85])for(const e of[-cc,cc])xn(.035,.012,1.1,bs,e,.149,n);for(let n=0;n<4;n++){let e=new Qr(64+n*3,67+n*3,64),t=new st(e,gt([9669227,8157026,11182208,7304289][n]));t.rotation.x=-Math.PI/2,t.position.y=.5+n*1.8,Ke.add(t)}for(let n=0;n<4;n++){let e=64+n*3,t=new st(new mn(e,e,1.8,96,1,!0),new yt({color:[7829858,6909535,9078898,6647134][n],side:Vt,roughness:1}));t.position.y=.5+n*1.8-.9,Ke.add(t)}let Ao=new st(new Qr(76.5,84,96),new yt({color:4545872,side:Vt,roughness:1}));Ao.rotation.x=-Math.PI/2;Ao.position.y=13.3;Ke.add(Ao);let ou=new st(new mn(76.5,76.5,.45,96,1,!0),new yt({color:14538940,side:Vt}));ou.position.y=13.15;Ke.add(ou);const fo=[14603708,5401946,10900294,14599790,8166058,15196103,8740171],ia=es?1560:5200,gr=ia/10,ii=new Pi(new Gt(.25,.43,2,5),gt(16777215),ia),Li=new Pi(new At(.19,6,4),gt(16777215),ia),wt=new bt,hs=[];for(let n=0;n<ia;n++){let e=Math.random()*Math.PI*2,t=65+Math.random()*11,i=.8+(t-65)*.58;wt.position.set(Math.sin(e)*t,i+.5,Math.cos(e)*t),wt.rotation.set(0,-e,Math.random()*.15-.075),wt.scale.setScalar(.75+Math.random()*.45),hs.push({x:wt.position.x,y:wt.position.y,z:wt.position.z,rotation:wt.rotation.y,lean:wt.rotation.z,scale:wt.scale.x,phase:Math.random()*Math.PI*2}),wt.updateMatrix(),ii.setMatrixAt(n,wt.matrix),ii.setColorAt(n,new He(fo[n%fo.length])),wt.position.y=i+1.08,wt.updateMatrix(),Li.setMatrixAt(n,wt.matrix),Li.setColorAt(n,new He([14001793,10250573,14924950,7425083][n%4]))}V.modern&&(ii.geometry.dispose(),ii.geometry=es?new oo(1).scale(.25,.465,.25):new Gt(.25,.43,1,4),Li.geometry.dispose(),Li.geometry=es?new oo(.19):new At(.19,4,3));if(V.modern)for(const n of[ii,Li])n.instanceMatrix.setUsage(zc);Ke.add(ii,Li);const bS=V.modern?pS(Ke,hs):null,If=[],Er=[0,1].map(()=>new gi({color:16777215,side:Vt}));function TS(n){let e=document.createElement("canvas");e.width=180,e.height=110;let t=e.getContext("2d");if(t.fillStyle="#ffffff",t.fillRect(0,0,180,110),n==="India")t.fillStyle="#f59238",t.fillRect(0,0,180,37),t.fillStyle="#21824a",t.fillRect(0,74,180,36),t.strokeStyle="#183a78",t.lineWidth=4,t.beginPath(),t.arc(90,55,14,0,Math.PI*2),t.stroke();else if(n==="Australia"){t.fillStyle="#203d83",t.fillRect(0,0,180,110),t.fillStyle="#fff";for(let s of[[125,23],[145,55],[116,76],[157,86],[76,80]])t.beginPath(),t.arc(...s,5,0,Math.PI*2),t.fill();t.fillRect(0,20,78,10),t.fillRect(32,0,10,50),t.fillStyle="#c83e44",t.fillRect(0,23,78,4),t.fillRect(35,0,4,50)}else n==="England"?(t.fillStyle="#bf3037",t.fillRect(0,45,180,20),t.fillRect(80,0,20,110)):n==="Pakistan"?(t.fillStyle="#147348",t.fillRect(0,0,180,110),t.fillStyle="#fff",t.fillRect(0,0,35,110),t.beginPath(),t.arc(105,55,28,0,Math.PI*2),t.fill(),t.fillStyle="#147348",t.beginPath(),t.arc(116,47,24,0,Math.PI*2),t.fill()):n==="West Indies"?(t.fillStyle="#812c40",t.fillRect(0,0,180,110),t.fillStyle="#ecc868",t.font="bold 46px Arial",t.textAlign="center",t.fillText("WI",90,72)):(t.fillStyle="#c73c39",t.fillRect(0,0,180,52),t.fillStyle="#2c5093",t.fillRect(0,58,180,52),t.strokeStyle="#fff",t.lineWidth=22,t.beginPath(),t.moveTo(0,0),t.lineTo(70,55),t.lineTo(0,110),t.stroke(),t.strokeStyle="#248859",t.lineWidth=13,t.beginPath(),t.moveTo(0,0),t.lineTo(70,55),t.lineTo(0,110),t.moveTo(60,55),t.lineTo(180,55),t.stroke());let i=new Ni(e);return i.colorSpace=Bt,i}const Lr=new Map;function er(n,e){return V.modern&&(Lr.has(n)||Lr.set(n,[]),Lr.get(n).push(e)),e}for(let n=0;n<32;n++){let e=n*Math.PI*2/32,t=69+n%3*3,i=Math.sin(e)*t,s=Math.cos(e)*t,r=3+(t-65)*.58;er("flagpole",xn(.07,3,.07,gt(15656913),i,r+1.3,s));let a=new st(new Nn(2,1.2),Er[n%2]);a.position.set(i+.95,r+2.2,s),a.rotation.y=e,Ke.add(a),If.push(a)}function Nf(){for(let n=0;n<ia;n++){let e=n%7===0?fo[n%fo.length]:n%2?Wn[ln].color:Wn[kn].color;ii.setColorAt(n,new He(e))}ii.instanceColor.needsUpdate=!0,[ln,kn].forEach((n,e)=>{Er[e].map&&Er[e].map.dispose(),Er[e].map=TS(n),Er[e].needsUpdate=!0})}for(let n=0;n<16;n++){let e=n*Math.PI*2/16,t=Math.sin(e)*78,i=Math.cos(e)*78;er("support",xn(.45,12,.45,gt(13157287),t,6,i));let s=er("support-roof",xn(8,.5,5,gt(3955017),t,12,i));s.rotation.y=e}const Ir=[];for(const[n,e]of[[-68,-68],[68,-68],[-68,68],[68,68]]){const t=xn(.8,28,.8,gt(8227206),n,14,e);t.castShadow=!1;const i=xn(8,3,.6,gt(3161411),n,28,e);i.lookAt(0,28,0);for(let s=0;s<2;s++)for(let r=0;r<6;r++){const a=new st(new At(.32,6,4),new gi({color:11976114}));a.position.set((r-2.5)*1.15,(s-.5)*1.1,-.4),i.add(a),Ir.push(a)}}if(V.modern){const n=cf(Ke,Ir);Ir.splice(0,Ir.length,n)}let lu=V.modern?xS(Ke,{grass:Cf,grass2:Df,pitchmat:Pf,roof:Ao,roofLip:ou,renderer:ut,mobileRender:es}):null,Pt=!1;function cu(n){Pt=n,V.modern&&(ut.shadowMap.needsUpdate=!0),lu?.setNight(Pt),Ke.background.setHex(Pt?1056306:10470850),Ke.fog.color.copy(Ke.background),Ka.intensity=Pt?.72:2.1,Ka.color.setHex(Pt?10138326:15004639),En.intensity=Pt?.5:2.1,En.color.setHex(Pt?12900607:16772548),ru.intensity=Pt?V.modern?3.4:2.1:0,V.modern&&(Ka.intensity=Pt?1.55:2.1,En.intensity=Pt?1.1:2.1,Ke.background.setHex(Pt?ji[hi].sky:10472404),Ke.fog.color.copy(Ke.background)),Ir.forEach(e=>e.material.color.setHex(Pt?16774607:11976114)),ne("#lighting").textContent=Pt?"☾ NIGHT":"☀ DAY",ne("#lighting").setAttribute("aria-label",Pt?"Switch to day match":"Switch to night match"),ne("#match-time").textContent=Pt?"●   NIGHT MATCH":"●   DAY MATCH",ne("#conditions").textContent=Pt?"Under floodlights ☾":"Clear & sunny ☀",ne("#ground-time").textContent=Pt?"CRICKET UNDER LIGHTS":"A PERFECT DAY FOR CRICKET",ne("#ground-conditions").textContent=Pt?"EST. 1997  /  FLOODLIT":"EST. 1997  /  CLEAR SKIES"}ne("#lighting").onclick=()=>cu(!Pt);function Uf(n){const e=document.createElement("canvas");e.width=1024,e.height=192;const t=e.getContext("2d"),i=["zephyr","cricket","kestrel"].includes(n);t.fillStyle=i?"#c3ff54":"#092332",t.fillRect(0,0,1024,192),t.fillStyle=i?"#0e2920":"#ecf9ec",t.font="900 62px Arial",t.textBaseline="middle",t.textAlign="center",t.fillText(n==="oval"?ji[hi].name.toUpperCase():n==="sport"?"THEN. NOW. ALWAYS.":"2027 EDITION",512,98,960);const s=new Ni(e);return s.colorSpace=Bt,s}function wS(n){if(V.modern)return Uf(n);let e=document.createElement("canvas");e.width=512,e.height=96;let t=e.getContext("2d"),i={kestrel:["#c51e27","#ffffff","KESTREL TEA"],zephyr:["#1c5fd8","#ffffff","ZEPHYR"],northwind:["#53236f","#ffffff","NORTHWIND"],cricket:["#e9e2c6","#214437","1997 EDITION"],oval:["#183b30","#e7c866","THE GRAND OVAL"],sport:["#f2efe5","#173c64","SPORTS LIVE"]}[n];t.fillStyle=i[0],t.fillRect(0,0,512,96),t.strokeStyle="#ffffff44",t.lineWidth=3,t.strokeRect(2,2,508,92),t.fillStyle=i[1],t.textAlign="center",t.textBaseline="middle",t.font=`900 ${n==="oval"?52:60}px Arial`,t.fillText(i[2],256,50,490);let s=new Ni(e);return s.colorSpace=Bt,s.anisotropy=Math.min(4,ut.capabilities.getMaxAnisotropy()),s}const qr=["kestrel","zephyr","northwind","cricket","zephyr","oval","kestrel","sport"],uu=Object.fromEntries([...new Set(qr)].map(n=>[n,new gi({map:wS(n),side:Vt})]));for(let n=0;n<32;n++){let e=n*Math.PI*2/32,t=61,i=xn(11,2,.3,gt(15262668),Math.sin(e)*t,1.12,Math.cos(e)*t);er("boundary-board",i),i.rotation.y=e;let s=new st(new Nn(10.8,1.8),uu[qr[n%qr.length]]);s.position.set(Math.sin(e)*(t-.18),1.12,Math.cos(e)*(t-.18)),s.rotation.y=e+Math.PI,Ke.add(s),er(s.material.uuid+s.geometry.parameters.width,s)}for(let n=0;n<16;n++){let e=(n+.5)*Math.PI*2/16,t=76.2,i=new st(new Nn(12,1.5),uu[qr[(n+2)%qr.length]]);i.position.set(Math.sin(e)*t,9,Math.cos(e)*t),i.rotation.y=e+Math.PI,Ke.add(i),er(i.material.uuid+i.geometry.parameters.width,i)}for(const n of Lr.values())cf(Ke,n);Lr.clear();function Of(n){let e=new Lt,t=gt(15260077);e.position.z=n;for(let i of[-.35,0,.35]){let s=new st(new Rt(.09,1.2,.09),t);s.position.set(i,.7,0),e.add(s)}for(let i of[-.18,.18]){let s=new st(new Rt(.38,.065,.09),t);s.position.set(i,1.34,0),e.add(s)}return e.children.forEach((i,s)=>{i.castShadow=!0,i.userData.initial=i.position.clone(),i.userData.index=s}),V.modern&&(e.scale.set(.228/.79,.711/1.275,1),e.position.y=.12-.1*e.scale.y),Ke.add(e),e}const Ff=Of(-10.4),Bf=Of(10.4),du=[...Ff.children,...Bf.children];function zf(){du.forEach(n=>{n.position.copy(n.userData.initial),n.rotation.set(0,0,0)})}function kf(n){T.anim.wicketBrokenAt=n}function AS(n){let e=T.anim?.wicketBrokenAt;if(e===void 0)return;let t=Math.max(0,(n-e)/1e3);(T.anim?.throwEnd==="bowler"?Ff:Bf).children.forEach((i,s)=>{let r=s%2?1:-1;i.rotation.z=r*Math.min(1.35,t*(s<3?2.5:5)),i.rotation.x=Math.min(1.2,t*2),i.position.x=i.userData.initial.x+r*Math.min(1.5,t*(s<3?.5:1.3)),i.position.y=Math.max(s<3?.18:.12,i.userData.initial.y+Math.sin(Math.min(t*3,Math.PI))*(s<3?.05:.9)-t*t*2),i.position.z=Math.min(1.2,t*(s<3?.3:.9))})}function Ts(n,e,t,i=0,s="fielder"){if(V.modern){const R=_M(Ke,n,e,t,i,s);return R.scale.setScalar(mt.athleteScale),R.userData.head.scale.setScalar(.9),R}const r=new Lt,a=gt(15065554),o=gt(12156764),l=gt(t),c=gt(3750708),u=gt(2698021);r.userData.kit=l;function d(R,E,x,v,C,A){const L=new st(E,x);return L.position.set(v,C,A),L.castShadow=!0,R.add(L),L}if(d(r,new mn(.46,.36,1.18,12),l,0,2.25,0).scale.set(1.12,1,.7),d(r,new mn(.27,.31,.12,12),a,0,2.86,0).scale.z=.75,d(r,new At(.34,12,8),a,0,1.55,0).scale.set(1.05,.48,.7),s!=="umpire"){const R=document.createElement("canvas");R.width=512,R.height=160;let E=new Ni(R);E.colorSpace=Bt;let x=new st(new Nn(.92,.32),new gi({map:E,transparent:!0,side:Vt,depthWrite:!1}));x.position.set(0,2.55,-.35),x.rotation.y=Math.PI,r.add(x),r.userData.nameCanvas=R,r.userData.nameTexture=E}const f=new Lt;f.position.y=3.37,r.add(f),r.userData.head=f,d(f,new At(.32,12,10),o,0,0,0).scale.set(.9,1.1,.9),d(f,new At(.33,10,6,0,Math.PI*2,0,Math.PI*.45),s==="umpire"?a:u,0,.13,0);const h=gt(2170139);for(const R of[-.11,.11])d(f,new At(.035,6,6),h,R,.04,.278);d(f,new At(.065,8,6),o,0,-.02,.29).scale.set(.7,1,1.2);function g(R){const E=new Lt;E.position.set(R,2.8,0),r.add(E),d(E,new Gt(.13,.28,4,8),l,0,-.22,0);const x=new Lt;x.position.y=-.45,E.add(x),E.userData.elbow=x,d(x,new Gt(.115,.27,4,8),l,0,-.22,0);const v=d(x,new At(.15,8,6),s==="batter"||s==="keeper"?a:o,0,-.46,0);if(E.userData.hand=v,v.userData.digits=[],s==="batter")v.visible=!1;else{for(let A=0;A<4;A++){let L=d(v,new Gt(.025,.1,2,5),s==="keeper"?a:o,(A-1.5)*.055,-.15,.025);L.rotation.x=.12,v.userData.digits.push(L)}let C=d(v,new Gt(.03,.11,2,5),s==="keeper"?a:o,R<0?-.16:.16,-.03,.02);C.rotation.z=R<0?-.7:.7}return E}const M=qM(),m=g(M.left),p=g(M.right);m.rotation.z=.15,p.rotation.z=-.15;function _(R){const E=new Lt;E.position.set(R,1.45,0),r.add(E),d(E,new Gt(.15,.34,4,8),a,0,-.3,0);const x=new Lt;if(x.position.y=-.62,E.add(x),E.userData.knee=x,d(x,new Gt(.13,.35,4,8),a,0,-.28,0),d(x,new At(.19,8,6),c,0,-.61,.12).scale.set(1,.55,1.65),s==="batter"){let v=d(x,new Gt(.19,.36,3,6),a,0,-.27,.14);v.scale.z=.55}return E}const y=_(-.23),b=_(.23);if(r.userData.knees=[y.userData.knee,b.userData.knee],s==="batter"){d(f,new At(.37,10,8,0,Math.PI*2,0,Math.PI*.48),l,0,.08,0);const R=new Lt;R.position.set(0,1.9,.3),r.add(R),d(R,new mn(.05,.05,.55,8),gt(6374189),0,-.2,0),d(R,new Rt(.38,1.12,.14),gt(14267768),0,-.92,0),d(R,new At(.14,8,6),a,-.08,-.04,0),d(R,new At(.14,8,6),a,.08,-.22,0),r.userData.bat=R}return s==="umpire"&&d(r,new mn(.47,.47,.07,12),a,0,3.62,0),r.position.set(n,0,e),r.rotation.y=i,r.userData.arms=[m,p],r.userData.elbows=[m.userData.elbow,p.userData.elbow],r.userData.legs=[y,b],Ke.add(r),r}let De=Ts(.12,9.8,2583727,Math.PI/2,"batter"),Jt=Ts(-1.85,-9.75,2583727,0,"batter"),Ue=Ts(1.5,-20,14731342),Te=Ts(0,13.6,14731342,Math.PI,"keeper"),Gn=Ts(.1,-13.1,16052445,0,"umpire"),yc=Ts(-14.5,8,16052445,0,"umpire");Te.position.y=-.16;Te.rotation.x=-.36;Te.userData.arms.forEach(n=>n.rotation.x=-.9);Te.userData.legs.forEach(n=>n.rotation.x=.2);const ih=De.userData.bat;let gn=[];[[7,13],[-8,12],[20,7],[-22,4],[27,-20],[-27,-18],[7,-30],[-7,-31],[35,12]].forEach(([n,e])=>{let t=Ts(n,e,14731342,Math.PI);t.userData.home=t.position.clone(),gn.push(t)});const Dn=V.modern?new mS([...gn,Ue]):null,Hf=[De,Jt,Ue,Te,Gn,yc,...gn];let Gf;V.modern&&mh(async()=>{const{loadStockPlayers:n}=await import("./stock-striker-DhyNT33-.js");return{loadStockPlayers:n}},__vite__mapDeps([0,1,2,3])).then(({loadStockPlayers:n})=>n(Hf)).then(n=>{Gf=n}).catch(n=>console.warn("Stock player bodies unavailable.",n));const Vf=V.modern?fS(Ke,Hf,{mobile:es}):null;Vf&&(Ke.matrixWorldAutoUpdate=!1);let RS=0;function fl(){Gf?.(tn),Vf?.update(),V.modern&&T.anim&&++RS%4===0&&(ut.shadowMap.needsUpdate=!0),ut.render(Ke,tn)}function fi(n,e){n.rotation.y=Math.atan2(e.x-n.position.x,e.z-n.position.z)}function Cn(n,e){let t=Math.atan2(e.x-n.position.x,e.z-n.position.z)-n.rotation.y;t=Math.atan2(Math.sin(t),Math.cos(t)),n.userData.head.rotation.y=tt.clamp(t,-1.25,1.25)}function pl(n,e,t){const i=Math.sin(t*.014)*Math.min(.7,e*8);po(n,i),n.userData.knees[0].rotation.x=.38+Math.max(0,-i)*.7,n.userData.knees[1].rotation.x=.38+Math.max(0,i)*.7,n.position.y=-.16+Math.abs(i)*.05,n.rotation.z=i*.06}function po(n,e){n.userData.legs[0].rotation.x=e,n.userData.legs[1].rotation.x=-e,n.userData.knees[0].rotation.x=Math.max(0,-e)*.9,n.userData.knees[1].rotation.x=Math.max(0,e)*.9}function ml(n,e,t){if(V.modern){vn(n,e,t);return}n.userData.elbows[e].rotation.set(0,0,0),n.updateMatrixWorld(!0);let i=n.userData.arms[e],s=n.worldToLocal(t.clone()),r=s.sub(i.position),a=r.length();i.quaternion.setFromUnitVectors(Wf,r.normalize()),i.scale.y=tt.clamp(a/.91,.6,1.5)}function br(n,e,t){n.userData.arms[e].userData.hand.userData.digits.forEach((s,r)=>s.rotation.x=.12+t*(.55+r*.06))}function Jn(n,e){return n.userData.arms[e].userData.hand.getWorldPosition(new P)}gn.forEach(n=>fi(n,De.position));const Wf=new P(0,-1,0);function Xf(n){if(V.modern){tu(n);return}let e=n.userData.bat.position;for(const t of n.userData.arms){let i=e.clone().sub(t.position),s=i.length();t.quaternion.setFromUnitVectors(Wf,i.normalize()),t.scale.y=s/.91}}function mo(n,e,t){let i=YM(e,t);if(n.userData.stance=i,V.modern){gc(n,{hand:e,striker:t});return}n.rotation.set(t?.25:.04,i.yaw,0),n.userData.head.rotation.set(0,i.headYaw,0),n.userData.bat.position.set(0,1.9,.3),n.userData.bat.rotation.set(0,0,-i.sign*.12),n.userData.legs[0].rotation.x=.15,n.userData.legs[1].rotation.x=-.12,n.userData.knees.forEach(s=>s.rotation.x=t?.35:.12),n.userData.elbows.forEach(s=>s.rotation.set(0,0,0)),V.modern&&(n.rotation.x=t?.06:.02,n.position.y=t?-.12:-.08,n.userData.torso.rotation.x=.3,n.userData.bat.position.y=2,bo(n)),Xf(n)}function Ro(){return V.modern&&Xr(Ue),KM(Ue,Ue.userData.bowlHand)}function hu(){let n=JM(Ue.userData.bowlHand);Jt.position.set(n.x,n.y,n.z)}function fu(){V.modern&&Xr(Te),Te.position.set(0,-.16,Te.userData.standingZ??13.6),Te.rotation.set(-.36,Math.PI,0),Te.userData.arms.forEach(n=>{n.rotation.set(-.9,0,0),n.scale.y=1}),Te.userData.legs.forEach(n=>n.rotation.set(.2,0,0)),Te.userData.knees.forEach(n=>n.rotation.x=.45),Te.userData.elbows.forEach(n=>n.rotation.x=.25),V.modern&&(Te.rotation.x=.04,Te.userData.torso.rotation.x=.42,Te.userData.elbows.forEach(n=>n.rotation.set(-.25,0,0)),Te.userData.knees.forEach(n=>n.rotation.set(.45,0,0)),sr(Te)),Cn(Te,De.position)}function Ec(){return Jn(Te,1)}function qf(){Y.position.copy(Jn(Ue,CS()))}function CS(){return Ue.userData.bowlHand==="left"?0:1}function pu(){gn.forEach(n=>{ZM(n),V.modern&&Xr(n),fi(n,De.position),n.rotation.x=.18,n.userData.knees.forEach(e=>e.rotation.x=.35),V.modern&&(n.rotation.x=.04,bo(n)),Cn(n,De.position)})}let Y=new st(new At(V.modern?mt.ballRadius:.27,V.modern?24:12,V.modern?16:10),gt(V.modern?15921640:10102309));Y.position.set(1.5,2,-20);Y.castShadow=!0;Ke.add(Y);function DS(){const n=document.createElement("canvas");n.width=n.height=32;const e=n.getContext("2d");return e.fillStyle="#10242d",e.beginPath(),e.arc(16,16,15,0,Math.PI*2),e.fill(),e.fillStyle="#fffdf0",e.beginPath(),e.arc(16,16,10,0,Math.PI*2),e.fill(),new Ni(n)}const Nr=V.modern?new Bm(new Tt().setFromPoints([new P]),new Vh({color:16776688,map:DS(),size:6,sizeAttenuation:!1,transparent:!0,alphaTest:.1})):null;Nr&&Ke.add(Nr);let Yr=new st(new Qr(V.modern?.11:.5,V.modern?.15:.7,24),new gi({color:16768114,transparent:!0,opacity:V.modern?.25:.85,side:Vt,depthTest:!1}));Yr.rotation.x=-Math.PI/2;Yr.visible=!1;Ke.add(Yr);const PS=new Float32Array(54),$r=new Tt;$r.setAttribute("position",new In(PS,3));$r.setDrawRange(0,0);const Co=new Gh($r,new Kc({color:16772511,transparent:!0,opacity:.8,depthTest:!1}));Co.visible=!1;Co.frustumCulled=!1;Ke.add(Co);let zs=[];function sh(){const n=T.anim,e=ne("#ball-flight-label"),t=!n?.outOfStadium;e.hidden!==t&&(e.hidden=t),n?.outOfStadium&&e.textContent!=="SIX • OUT OF THE STADIUM"&&(e.textContent="SIX • OUT OF THE STADIUM");const i=!!n&&(n.flight||(V.modern?(n.simTime||0)>1.8:(performance.now()-n.start)/1e3>1.8));if(Nr&&(Nr.visible=i,Nr.position.copy(Y.position)),Yr.visible=i,Co.visible=i&&!V.modern,!i){zs=[];return}if(Yr.position.set(Y.position.x,.18,Y.position.z),V.modern)return;zs.push(Y.position.clone()),zs.length>18&&zs.shift();const s=$r.attributes.position;zs.forEach((r,a)=>s.setXYZ(a,r.x,r.y,r.z)),s.needsUpdate=!0,$r.setDrawRange(0,zs.length)}function rh(){const n=ne("#run-inset"),e=T.anim,t=Math.abs(Y.position.x)>4||Y.position.z>12||Y.position.z<-12,i=!!e&&e.live&&["field","pickup"].includes(e.phase)&&t&&T.camera===0&&T.phase!=="replay";if(n.classList.toggle("hidden",!i),i){const s=ne("#run-inset-label"),r=e.runActive?e.runReturning?"GOING BACK":"BATTERS RUNNING":"BATTERS HOLDING";s.textContent!==r&&(s.textContent=r)}}const Do=new jc(-6.8,6.8,15.5,-15.5,.1,100);Do.position.set(0,48,0);Do.up.set(0,0,-1);Do.lookAt(0,0,0);function LS(){if(ne("#run-inset").classList.contains("hidden"))return;const e=ne("#run-camera").getBoundingClientRect(),t=ni.getBoundingClientRect(),i=e.left-t.left,s=t.bottom-e.bottom;if(e.width<1||e.height<1)return;ut.setScissorTest(!0),ut.setScissor(i,s,e.width,e.height),ut.setViewport(i,s,e.width,e.height);const r=ut.autoClear,a=ut.shadowMap.autoUpdate;ut.autoClear=!1,ut.shadowMap.autoUpdate=!1,ut.clearDepth(),ut.render(Ke,Do),ut.shadowMap.autoUpdate=a,ut.autoClear=r,ut.setScissorTest(!1),ut.setViewport(0,0,ni.clientWidth,ni.clientHeight)}function Po(){let n=ni.clientWidth,e=ni.clientHeight;ut.setSize(n,e,!1),tn.aspect=n/e,tn.updateProjectionMatrix()}window.addEventListener("resize",Po);document.addEventListener("fullscreenchange",()=>{Po();let n=document.fullscreenElement===ni;ne("#fullscreen").setAttribute("aria-label",n?"Exit fullscreen":"Enter fullscreen"),ne("#fullscreen").title=n?"Exit fullscreen":"Enter fullscreen"});window.ResizeObserver&&new ResizeObserver(Po).observe(ni);ne("#fullscreen").onclick=async()=>{try{document.fullscreenElement===ni?await document.exitFullscreen():await ni.requestFullscreen()}catch(n){console.warn("Fullscreen unavailable",n)}};Po();const ah=["AUTO","STADIUM","BOWLER","KEEPER","BATTER"],Zn=new P,li=new P,IS=new TM;let Za=null;function gl(n){tn.position.copy(n.position),tn.lookAt(n.look),Math.abs(tn.fov-n.fov)>.001&&(tn.fov=n.fov,tn.updateProjectionMatrix()),Za=n}function bc(n=!1){if(V.modern){const t=T.anim;if(t?.lab&&!t.labBallCamera){const s=t.returnThrow?t.returnThrow.state.receiver:t.labPlayer;t.returnThrow?.state.phase==="windup"?(Zn.set(15,16,23),li.set(7,1,0)):(Zn.set(s.position.x+3.5,2.8,s.position.z+6),li.set(s.position.x,.9,s.position.z+.5)),t.phase==="pose"&&(Zn.set(s.position.x+5,3,s.position.z+8),li.set(0,1,s.position.z+1.8)),gl({id:"inspection",position:Zn,look:li,fov:36});return}if(T.camera===0&&Rf.matches&&T.phase!=="ready"){gl(dc("stadium"));return}const i=T.camera===0?T.phase==="replay"&&T.replay?.cameraView||IS.update({ball:Y.position,velocity:t?.velocity||t?.deliveryVelocity,active:!!t?.flight,phase:T.phase==="ready"?"preview":EM(t),deliveryKey:t,throwEnd:t?.throwEnd,battingHand:!t?.lab&&It()&&["playing","animating"].includes(T.phase)?t?.battingHand||Nt(Wt().striker).bat:null,dt:Sc,aspect:tn.aspect,players:Dn.players}):dc(["delivery","stadium","delivery","keeper","batter"][T.camera]);gl(i);return}let e=T.camera;e===0&&(e=T.anim&&T.anim.flight?1:2),e===1?(Zn.set(35,50,50),li.set(0,0,0)):e===2?(Zn.set(0,17,-44),li.set(0,1,4)):e===3?(Zn.set(0,6,21),li.set(0,1,-4)):(Zn.set(5,11,25),li.set(0,1,2)),T.camera===0&&T.anim&&T.anim.flight&&(Zn.set(Y.position.x+13,27,Y.position.z+27),li.set(Y.position.x,0,Y.position.z)),n?tn.position.copy(Zn):tn.position.lerp(Zn,.055),tn.lookAt(li)}bc(!0);function Xn(){return T.firstBatting||ln}function bn(){return Xn()===ln?kn:ln}function It(){return(T.innings===0?Xn():bn())===ln}function Yf(){const n=(e,t)=>e.userData.kit.color.setHex(t);[De,Jt].forEach(e=>n(e,Wn[T.innings===0?Xn():bn()].color)),[Ue,Te,...gn].forEach(e=>n(e,Wn[T.innings===0?bn():Xn()].color))}function xr(n,e,t){if(n.userData.playerName=e,V.modern){const o=Object.keys(ho).find(l=>ho[l].some(c=>c.name===e))||ln;vM(n,e,o)}if(!n.userData.nameCanvas)return;let i=`${e}:${t}`;if(n.userData.nameKey===i)return;n.userData.nameKey=i;let s=n.userData.nameCanvas,r=s.getContext("2d");r.clearRect(0,0,s.width,s.height),r.textAlign="center",r.font="bold 58px Arial",r.lineWidth=8,r.strokeStyle="#263326",r.fillStyle="#fff";let a=e.split(" ").slice(-1)[0].toUpperCase();r.strokeText(a,256,68,480),r.fillText(a,256,68,480),r.font="bold 72px Arial",r.strokeText(String(t),256,143),r.fillText(String(t),256,143),n.userData.nameTexture.needsUpdate=!0}function Wt(){let n=T.innings===0?Xn():bn(),e=T.innings===0?bn():Xn(),t=Math.floor(T.balls[T.innings]/6),i=uM(en[e],pf(wn).bowlers),s=i[Math.min(t,wn-1)%i.length].index;return{batting:n,bowling:e,bowlerIndex:s,striker:en[n][Math.min(T.striker,10)],partner:en[n][Math.min(T.partner,10)],bowler:en[e][s]}}function sa(){let n=Wt();xr(De,n.striker,T.striker+1),xr(Jt,n.partner,T.partner+1),xr(Ue,n.bowler,n.bowlerIndex+1),V.modern&&(De.position.z=9.8,Jt.position.z=-9.75),De.position.x=Nt(n.striker).bat==="left"?.35:-.35,mo(De,Nt(n.striker).bat,!0),mo(Jt,Nt(n.partner).bat,!1),Ue.userData.bowlHand=Nt(n.bowler).bowl,Ro(),hu(),yc.position.set(Nt(n.striker).bat==="left"?14.5:-14.5,0,8),fi(yc,new P(0,0,9.8)),fu();let e=df(en[n.bowling]);xr(Te,en[n.bowling][e],e+1);let t=en[n.bowling].slice(0,11).map((i,s)=>({name:i,i:s})).filter(i=>i.i!==e&&i.i!==n.bowlerIndex);gn.forEach((i,s)=>xr(i,t[s]?.name||"Fielder",(t[s]?.i??s)+1))}function go(n,e){let t=Wt(),i=e||t.striker;T.phase="intro",T.introUntil=performance.now()+4200,Et();let s=ne("#player-intro"),r=n==="start"&&T.toss?`${T.toss.result.toUpperCase()} · ${T.toss.userWon?"YOU WIN":"COMPUTER WINS"} THE TOSS`:n==="start"?"THE OPENING PLAYERS":n==="innings"?"THE CHASE BEGINS":n==="wicket"?"NEW BATTER":n==="both"?"NEW BATTER & BOWLER":"NEW BOWLER",a=n==="bowler"?`<span>COMING ON TO BOWL</span><strong>${t.bowler}</strong><small>${t.bowling} · ${Nt(t.bowler).bowl.toUpperCase()}-ARM</small>`:n==="wicket"||n==="both"?`<span>COMING IN TO BAT</span><strong>${i}</strong><small>${Nt(i).bat.toUpperCase()}-HAND BAT · ${n==="both"?"NEW BOWLER:":"FACING"} ${t.bowler}</small>`:`<span>AT THE CREASE</span><strong>${t.striker} &nbsp; / &nbsp; ${t.partner}</strong><small>${Nt(t.striker).bat.toUpperCase()}-HAND BAT · ${t.bowler} · ${Nt(t.bowler).bowl.toUpperCase()}-ARM</small>`;if(s.innerHTML=`<div class="intro-kicker">${r}</div>${a}`,V.modern){const o=document.createElement("button");o.className="skip-intro",o.textContent="Skip intro",o.onclick=()=>{_u(),T.introUntil=performance.now()},s.append(o)}s.classList.remove("hidden"),ne("#play-status").textContent=r,Ve(r,n==="bowler"?t.bowler.toUpperCase():`${t.striker.toUpperCase()} ON STRIKE`),sa(),WS(n,t,i)}function ps(n){return`${Math.floor(n/6)}.${n%6}`}function NS(){let n=T.innings,e=Wt(),t=T.stats[n],i=th(t,e.striker),s=th(t,e.partner),r=WM(t,e.bowler);const a=d=>d.split(" ").slice(-1)[0].toUpperCase(),o=wn*6-T.balls[n],l=T.score[0]+1-T.score[1],u=V.modern&&n===1&&o>0&&l>0&&T.phase!=="finished"?`<div class="chase-line">Need ${l} off ${o} · RRR ${(l*6/o).toFixed(2)}</div>`:"";ne("#broadcast-score").innerHTML=`<div class="broadcast-score-top"><strong>${Wn[e.batting].flag} ${e.batting.toUpperCase()} ${T.score[n]}/${T.wickets[n]}</strong><span>${ps(T.balls[n])} / ${wn} OV</span></div>${u}<div class="batting-cue" id="batting-cue" hidden></div><div class="broadcast-figures"><span title="${e.striker}">${a(e.striker)}* <b>${i.runs} (${i.balls}) · SR ${vc(i)}</b></span><span title="${e.partner}">${a(e.partner)} <b>${s.runs} (${s.balls}) · SR ${vc(s)}</b></span><span title="${e.bowler}">${a(e.bowler)} <b>${r.wickets}/${r.runs} · ${ps(r.balls)} · ECO ${Sf(r)}</b></span></div>`,ne("#live-badge").innerHTML=T.phase==="ready"?"<i></i> PREVIEW":"<i></i> LIVE"}const tr=new Set;let $f=()=>{};function Et(){lu?.update({team:Wt().batting,score:`${T.score[T.innings]}/${T.wickets[T.innings]}`,overs:ps(T.balls[T.innings]),venue:ji[hi].name}),(T.phase==="ready"||T.phase==="finished")&&(ne("#delivery-speed").hidden=!0),ne("#fullscreen").hidden=T.phase==="ready"||T.phase==="finished",ne("#pause-game").hidden=T.phase==="ready"||T.phase==="finished",NS();let n=T.innings===0?Xn():bn(),e=T.innings===0?bn():Xn(),t=T.innings,i=1-t;ne("#score").innerHTML=`<div class="score-line"><div class="flag">${Wn[n].flag}</div><div class="teamname">${n}<small>${t===0?"BATTING FIRST":"CHASING"}</small></div><div class="score-num">${T.score[t]}/${T.wickets[t]}<small>${ps(T.balls[t])} / ${wn} OV</small></div></div><div class="versus">V E R S U S</div><div class="score-line secondary"><div class="flag">${Wn[e].flag}</div><div class="teamname">${e}<small>${t===0?"YET TO BAT":"FIRST INNINGS"}</small></div><div class="score-num">${t===0?"—":T.score[i]+"/"+T.wickets[i]}<small>${t===0?"":ps(T.balls[i])+" OV"}</small></div></div><div class="score-foot"><span>${t===1?"TARGET":"CURRENT RUN RATE"}</span><b>${t===1?T.score[0]+1:T.balls[t]?(T.score[t]*6/T.balls[t]).toFixed(1):"0.0"}</b></div><div class="score-foot"><span>EXTRAS</span><b>${T.extras[t]}</b></div><div class="score-foot"><span>ON STRIKE</span><b>${en[n][Math.min(T.striker||0,10)]}</b></div>`,ne("#innings-tag").textContent=T.phase==="ready"?"QUICK MATCH":t===0?"1ST INNINGS":"2ND INNINGS",ne("#broadcast").textContent=T.phase==="ready"?"MATCH PREVIEW":V.modern?`LIVE FROM ${ji[hi].name.toUpperCase()}`:"LIVE FROM THE GRAND OVAL";let s=ne("#controls");if(T.phase==="ready"){let p=ne("#stage-controls");p.classList.remove("hidden"),p.innerHTML='<div class="touch-row"><button class="touch-bowl" id="stage-setup">SET UP MATCH →</button></div>',ne("#stage-setup").onclick=Kr,ne("#play-status").textContent="MATCH PREVIEW",ne("#control-title").textContent="READY TO PLAY?",ne("#hint").textContent="Choose your teams and playing XI, then step out onto the field.",s.innerHTML='<button class="primary" id="setup">SET UP MATCH &nbsp; ↗</button>',ne("#setup").onclick=Kr;return}let r=It();V.modern&&(ni.dataset.batHand=r?Nt(Wt().striker).bat:""),ne("#stage-controls").classList.toggle("bowling-controls",!r),ne("#control-title").textContent=r?"YOU ARE BATTING":"YOU ARE BOWLING",ne("#hint").innerHTML=r?"The <b>computer bowls automatically</b>. ← / → cover drives, ↑ attacking drive, ↓ defend, Space sweep. During a run, ↓ sends them back early or calls the next run after halfway. R queues another run.":"The <b>computer is batting</b>. Choose a delivery to bowl immediately. Q = yorker, E = bouncer, F = full toss.",V.modern&&(ne("#hint").textContent=r?"Tap Play shot or press Enter as the ball arrives. Choose a specific stroke below to override.":"Tap Bowl good length or press Enter. Choose a different length below to override.");const a=r&&T.anim?.flight&&T.anim.live,l=(r?["Left cover","Right cover","Attacking drive","Defend","Sweep","Hook","Pull","Cut","Flick","Straight drive"]:["Yorker","Full","Good","Short","Bouncer","Full toss"]).map((p,_)=>`<button data-choice="${p}" class="${(r?T.shot:T.line)===p?"selected":""}"><small>${r?["←","→","↑","↓","SPACE","1","2","3","4","5"][_]:["Q","←","↓","→","E","F"][_]}</small>${p}</button>`).join(""),c=a?`<button class="touch-bowl" data-run>${T.anim.queuedRun?"NEXT RUN QUEUED":T.anim.runActive?"QUEUE NEXT RUN":"RUN"}</button>`:"";if(s.innerHTML=a?`<div class="hint">Runs: ${T.anim.runs}. Down sends them back early or queues the next run after halfway. R queues the next run.</div><div class="action-row">${c}</div>`:`<div class="action-row">${l}</div>`,V.modern&&!r&&T.phase==="playing"&&!T.freeHit){const p=document.createElement("label");p.className="field-plan",p.textContent="Field placement ";const _=document.createElement("select");for(const[y,b]of[["auto","Automatic"],["cover","Cover"],["midwicket","Midwicket"]])_.add(new Option(b,y));_.value=T.fieldPlan||"auto",_.onchange=()=>{T.fieldPlan=_.value,Kf(),pu()},p.append(_),s.append(p)}let u=ne("#stage-controls");u.classList.remove("hidden");const d=(p,_,y,b)=>`<button data-choice="${p}" class="pad-${y} ${T.shot===p||T.secondaryShot===p?"selected":""}" aria-label="${_}: ${p}"><b>${_}</b><small>${b}</small></button>`,f=`<div class="batting-controls"><div class="shot-pad" role="group" aria-label="Batting arrow controls">${d("Attacking drive","↑","up","ATTACK")}${d("Left cover","←","left","LEFT COVER")}${d("Right cover","→","right","RIGHT COVER")}${d("Defend","↓","down","DEFEND")}${d("Sweep","SPACE","space","SWEEP")}</div><div class="shot-extra-row" role="group" aria-label="More shots and power">${["Hook","Pull","Cut","Flick","Straight drive"].map((p,_)=>`<button data-choice="${p}" class="${T.shot===p?"selected":""}" aria-label="${_+1}: ${p}"><b>${_+1}</b><small>${_===4?"STRAIGHT":p.toUpperCase()}</small></button>`).join("")}<button data-power class="power-button ${T.powerArmed?"selected":""}" aria-label="Super boost: Shift; ${Gs(T.powerUsed)} of 2 remaining" aria-pressed="${!!T.powerArmed}" ${Gs(T.powerUsed)===0?"disabled":""}><b>SHIFT</b><small>SUPER ${Gs(T.powerUsed)}/2</small></button></div></div>`,h=`<div class="shot-pad run-pad" role="group" aria-label="Running controls"><button data-return class="pad-down" aria-label="Down: back early, or next run after halfway" title="Down: back early / next run past halfway">↓</button><button data-run class="pad-space" aria-label="Run or queue next run" title="R: run or queue next run">${T.anim?.queuedRun?"✓":T.anim?.runActive?"NEXT":"RUN"}</button></div>`,g=`<div class="batting-controls running-controls"><div class="shot-pad" role="group" aria-label="Running controls"><button data-return class="pad-down" aria-label="Down: back early, or next run after halfway"><b>↓</b><small>BACK / NEXT</small></button><button data-run class="pad-space" aria-label="Run or queue next run"><b>${T.anim?.queuedRun?"✓":"R"}</b><small>${T.anim?.queuedRun?"QUEUED":T.anim?.runActive?"NEXT RUN":"RUN"}</small></button></div><div class="shot-extra-row" aria-hidden="true"></div></div>`;if(u.innerHTML=r?a?V.modern?g:h:f:`<div class="touch-label">${Wt().bowler.toUpperCase()} · ${Nt(Wt().bowler).bowl.toUpperCase()}-ARM ${ir(Wt().bowler).style.toUpperCase()} · TAP TO BOWL</div><div class="touch-row">${l}</div>`,V.modern&&!a){const p=!r&&T.phase==="animating"&&!T.anim?.releasePoint&&!T.anim?.flight,_=r?"PLAY SHOT":p?"STOP RUN-UP":"BOWL GOOD LENGTH",y=r&&T.phase==="animating"&&!T.anim?.flight,b=u.innerHTML+(y?'<button type="button" data-evade>Evade delivery</button>':"");u.innerHTML='<div class="touch-row"><button class="touch-bowl" data-assisted>'+_+'</button></div><details class="assist-options"><summary>'+(r?"Choose stroke":"Choose length")+"</summary>"+b+"</details>",u.querySelector("[data-assisted]").disabled=r?T.phase!=="animating"||!!T.anim?.flight:T.phase!=="playing"&&!p,u.querySelector("[data-assisted]").onclick=()=>p?US():M(r?cS(T.anim):"Good");const R=u.querySelector("[data-evade]");R&&(R.onclick=()=>{const E=T.anim;!E||E.flight||(E.avoiding=!0,E.swing=null,E.selectedShot=null,E.power=!1,T.shot=null,T.secondaryShot=null,T.queuedPower=!1,T.powerArmed=!1,T.lastShotInput=null,tr.clear(),u.querySelectorAll(".selected").forEach(x=>x.classList.remove("selected")),s.querySelectorAll(".selected").forEach(x=>x.classList.remove("selected")),u.querySelector("[data-power]")?.setAttribute("aria-pressed","false"),Ve("EVADING","BAT WITHDRAWN"))})}function M(p,_=!1){if(r){if(T.phase==="animating"&&T.anim?.flight)return;let y=performance.now(),b=T.lastShotInput,R=[...tr].find(E=>E!==p);if(T.secondaryShot=R||(b&&b.name!==p&&y-b.time<650?b.name:null),T.lastShotInput={name:p,time:y},T.shot=p,T.queuedPower=Gs(T.powerUsed)>0&&!!(T.powerArmed||_),T.phase==="animating"?(T.anim.avoiding=!1,OS()):T.phase==="playing"&&(T.queuedShot=p),V.modern){for(const E of[s,u])for(const x of E.querySelectorAll("[data-choice]")){const v=x.dataset.choice;x.classList.toggle("selected",v===T.shot||v===T.secondaryShot)}return}}else if(T.phase==="playing"){T.line=p,xo();return}Et()}function m(){!It()||T.anim?.flight||Gs(T.powerUsed)===0||(T.powerArmed=!T.powerArmed,T.queuedPower=T.powerArmed,T.anim&&T.anim.swing!==null&&(T.anim.power=T.powerArmed),Et())}$f=(p,_)=>M(p,_),[s,u].forEach(p=>p.querySelectorAll("[data-choice]").forEach(_=>_.onclick=y=>{y.stopPropagation(),M(_.dataset.choice,!!y.shiftKey)})),[s,u].forEach(p=>p.querySelectorAll("[data-run]").forEach(_=>_.onclick=y=>{y.stopPropagation(),Jf()})),u.querySelectorAll("[data-power]").forEach(p=>p.onclick=_=>{_.stopPropagation(),m()}),u.querySelectorAll("[data-return]").forEach(p=>p.onclick=_=>{_.stopPropagation(),Qf()}),ne("#play-status").textContent=a?"BALL IN PLAY • RUN OR STOP":r?T.phase==="animating"?"COMPUTER BOWLING • TIME YOUR SHOT":"COMPUTER BOWLING • NEXT DELIVERY SOON":T.phase==="animating"?"COMPUTER BATTING • BALL IN PLAY":"COMPUTER BATTING • CHOOSE YOUR LENGTH"}function Kr(){let n=ne("#modal-root");n.innerHTML=`<div class="modal-wrap"><div class="modal"><div class="modal-top"><div><div class="eyebrow">YOUR MATCH, YOUR RULES</div><h2>SELECT YOUR SIDES<span style="color:#e4c45f">.</span></h2></div><button class="close" aria-label="Close">×</button></div><div class="setup"><div class="setup-grid"><div class="setup-card"><div class="setup-label">01 / YOUR TEAM</div><select id="home-select">${Object.keys(Wn).map(t=>`<option ${t===ln?"selected":""}>${t}</option>`).join("")}</select><div class="roster" id="home-roster"></div></div><div class="setup-card"><div class="setup-label">02 / OPPOSITION</div><select id="away-select">${Object.keys(Wn).map(t=>`<option ${t===kn?"selected":""}>${t}</option>`).join("")}</select><div class="roster" id="away-roster"></div></div></div><div class="setup-options"><div class="option">MATCH FORMAT<b>5 OVERS / SIDE</b></div><div class="option">VENUE<b>THE GRAND OVAL</b></div><div class="option">YOUR ROLE<b>BAT & BOWL</b></div></div><label class="match-conditions" for="match-conditions">MATCH CONDITIONS <select id="match-conditions"><option value="day" ${Pt?"":"selected"}>DAY MATCH</option><option value="night" ${Pt?"selected":""}>NIGHT MATCH · FLOODLIGHTS</option></select></label><label class="match-conditions">OVERS PER SIDE <select id="match-overs">${hc.map(t=>`<option value="${t.overs}" ${t.overs===nu?"selected":""}>${t.label}</option>`).join("")}</select></label><label class="match-conditions">CALL THE TOSS <select id="toss-call"><option value="heads">HEADS</option><option value="tails">TAILS</option></select></label><label class="match-conditions">IF YOU WIN <select id="toss-decision"><option value="bat">BAT FIRST</option><option value="bowl">BOWL FIRST</option></select></label><label class="match-conditions">DIFFICULTY <select id="difficulty"><option value="normal">NORMAL</option><option value="easy">EASY · MORE BOUNDARIES</option></select></label><div class="setup-replays">ACTION REPLAYS <label><input type="checkbox" id="replay-boundaries"> BOUNDARIES</label><label><input type="checkbox" id="replay-wickets"> WICKETS</label></div><div class="setup-footer"><p>Move players up or down to select your XI. The first 11 play; R1–R4 are reserves. Top order bats first.</p><button class="primary" id="start">LET'S PLAY CRICKET &nbsp; →</button></div></div></div></div>`,ne(".close").onclick=()=>n.innerHTML="";function e(t){let i=t==="home"?ln:kn,s=ne("#"+t+"-roster");s.innerHTML=en[i].map((r,a)=>`<div class="player ${a>=11?"reserve":""}"><b>${a>=11?"R"+(a-10):String(a+1).padStart(2,"0")}</b> ${r}${V.modern?`<em class="roster-role">${Nt(r).role||"batter"}</em>`:""}<span><button data-move="${a}" data-dir="-1" title="Move up">↑</button><button data-move="${a}" data-dir="1" title="Move down">↓</button></span></div>`).join(""),s.querySelectorAll("button").forEach(r=>r.onclick=()=>{let a=+r.dataset.move,o=a+ +r.dataset.dir;o<0||o>=en[i].length||([en[i][a],en[i][o]]=[en[i][o],en[i][a]],e(t))})}e("home"),e("away"),ne("#home-select").onchange=t=>{ln=t.target.value,ln===kn&&(kn=Object.keys(Wn).find(i=>i!==ln),ne("#away-select").value=kn),e("home"),e("away")},ne("#away-select").onchange=t=>{kn=t.target.value,kn===ln&&(ln=Object.keys(Wn).find(i=>i!==kn),ne("#home-select").value=ln),e("home"),e("away")},ne("#start").onclick=async()=>{const t=ne("#start");t.disabled=!0,t.textContent="PREPARING MATCH…";try{await CM({modern:V.modern})}catch(r){t.disabled=!1,t.textContent="LET’S PLAY CRICKET →",alert("Could not initialize the local physics engine. Please reload and try again."),console.error(r);return}if(ui=!1,ne("#pause-game").textContent="Ⅱ",ne("#pause-game").setAttribute("aria-label","Pause match"),Lo(),Af=ne("#difficulty").value,wn=pf(ne("#match-overs").value).overs,ne("#match-format").textContent=`${wn} overs per side`,iu=ne("#replay-boundaries").checked,su=ne("#replay-wickets").checked,V.modern){hi=ne("#venue-select").value,lu.setVenue(bf(hi));for(const[r,a]of Object.entries(uu))a.map.dispose(),a.map=Uf(r),a.needsUpdate=!0}cu(ne("#match-conditions").value==="night");const i=_S(ne("#toss-call").value,ne("#toss-decision").value),s=i.userBatsFirst?ln:kn;n.innerHTML="",Su(),T={...T,fieldPlan:"auto",overRate:[],freeHit:!1,phase:"playing",innings:0,firstBatting:s,toss:i,shot:null,score:[0,0],wickets:[0,0],balls:[0,0],extras:[0,0],stats:Mf(),history:[],batIndex:0,striker:0,partner:1,nextBatter:2,bowlIndex:8,queuedShot:null,queuedPower:!1,powerArmed:!1,powerUsed:0,secondaryShot:null,lastShotInput:null,anim:null,replay:null,autoAt:performance.now()+3500},zf(),ne("#replay-ui").classList.add("hidden"),Yf(),Nf(),xu||rp(),sa(),Et(),go("start")},rS(V,hi)}function Ve(n,e=""){ne("#message").innerHTML=`${n}<br><span style="color:#aabbab">${e}</span>`}function US(){const n=T.anim;!V.modern||It()||T.phase!=="animating"||!n||n.releasePoint||n.flight||(T.anim=null,T.phase="playing",Ro(),qf(),Mn("between"),Et(),Ve("DEAD BALL","BOWLER STOPPED BEFORE RELEASE"),cn("Dead ball."))}function Kf(){const n=Wt(),e=ir(n.bowler).spin;rM({hand:Nt(n.striker).bat,spin:e,balls:T.balls[T.innings],overs:wn,slowOverRate:yu(),fieldPlan:It()?"auto":T.fieldPlan}).forEach(([i,s],r)=>gn[r].userData.home.set(i,0,s)),Te.userData.standingZ=e?11.8:15.5}function xo(){if(T.phase!=="playing")return;const n=Ro();V.modern&&(Kf(),Xr(De),Xr(Jt)),hu(),fu(),pu(),Dn?.begin(),mo(De,Nt(Wt().striker).bat,!0),mo(Jt,Nt(Wt().partner).bat,!1);const e=jM(T.line,It()),t=e.type,i=Wt().bowler,s=ir(i),r=V.modern?dM(i,Ue.userData.bowlHand):hf(i),a=V.modern?aS(e,Nt(Wt().striker).bat,r.movement):e.line+(e.wide?0:r.movement),o=Math.round(eS(s.style)*(r.speedFactor??1)),l=20.12/(o/3.6)*(V.modern?1:2.1);ne("#delivery-speed").hidden=!0,Gn.userData.arms.forEach(d=>d.rotation.set(0,0,0));const c=Math.max(1,wn*6-T.balls[T.innings]),u=T.innings===1?(T.score[0]+1-T.score[1])/c:1;T.phase="animating",Mn("delivery"),T.anim={start:performance.now(),last:performance.now(),swing:T.queuedShot?1.8+l-.3:null,selectedShot:T.queuedShot||null,secondaryShot:T.secondaryShot,power:!!T.queuedPower,variation:r,freeHit:V.modern&&!!T.freeHit,spin:s.spin,speed:o,flight:!1,live:!1,length:t,lineX:a,travel:l,noBall:e.noBall,wide:V.modern?!1:e.wide,guardX:De.position.x,battingHand:Nt(Wt().striker).bat,called:!1,bowlerX:n.x,bowlerArm:n.arm,cpuShot:V.modern?aM(t,u,Math.random,{ballsLeft:c,wicketsInHand:10-T.wickets[T.innings]}):["Defend","Left cover","Right cover","Attacking drive","Sweep"][Math.floor(Math.random()*5)],impact:1.8+l,runs:0,runProgress:0,runActive:!1,runAllowed:!1,dismissal:null},T.queuedShot=null,Ve(T.anim.freeHit?"FREE HIT":yu()?"SLOW OVER RATE • FOUR OUTSIDE":It()?"THE BOWLER IS IN":"RUNNING IN TO BOWL",`${t.toUpperCase()} · ${r.name.toUpperCase()}`),Et()}function OS(){if(T.phase!=="animating"||!It()||!T.anim||T.anim.flight)return;if(T.anim.swing!==null){T.anim.selectedShot=T.shot,T.anim.secondaryShot=T.secondaryShot,T.anim.power=!!T.queuedPower,Ve(T.shot.toUpperCase()+" SHOT",T.anim.power?"POWER SHOT":T.anim.secondaryShot?"COMBINATION SHOT":"SHOT CHANGED");return}const n=V.modern?T.anim.simTime||0:(performance.now()-T.anim.start)/1e3;T.anim.swing=Math.max(n,T.anim.impact-.35),V.modern&&(T.anim.preparationAt=n),T.anim.selectedShot=T.shot,T.anim.secondaryShot=T.secondaryShot,T.anim.power=!!T.queuedPower;let e=Math.abs(T.anim.swing-T.anim.impact);Ve(T.shot.toUpperCase()+" SHOT",e<.42?"GOOD TIMING":T.anim.swing<T.anim.impact?"EARLY SHOT":"LATE SHOT")}function Zf(n){n==="back"?Ve("GO BACK!","RETURN TO YOUR CREASE"):n==="queued"?Ve("COMING BACK FOR ANOTHER!","NEXT RUN QUEUED"):n==="started"&&Ve("RUNNING!","WATCH FOR THE THROW"),Et()}function Jf(){let n=T.anim;!n?.live||!It()||Zf(xc(n))}function Qf(){let n=T.anim;!n?.live||!It()||Zf(kM(n))}function Tc(n){return!V.modern||T.innings!==1||T.score[1]!==T.score[0]||!(n.wide||n.noBall)?!1:(n.flight=!0,Dt(0,null),!0)}function FS(n){let e=T.anim,t=ne("#batting-cue");t&&(t.hidden=!0),e.flight=!0,e.flightStart=n,e.flightSimTime=e.simTime;const i=It();if(i){const c=MS(T.powerUsed,!!(e.power&&e.swing!==null));T.powerUsed=c.used,e.power=c.enabled}const s=i?e.swing===null?99:Math.abs(e.swing+(V.modern?.3:0)-e.impact):.15+Math.random()*.35;e.lineX=Y.position.x;let r=i?e.selectedShot||T.shot:e.cpuShot;T.shot=null,T.queuedShot=null,T.powerArmed=!1,T.queuedPower=!1,T.secondaryShot=null,T.lastShotInput=null,tr.clear();let a=i&&Af==="easy",o=!V.modern&&e.wide||!GM(r,V.modern?Y.position.y/mt.athleteScale:Y.position.y,V.modern?e.lineX/mt.athleteScale:e.lineX,a)||s>(a?1.15:.75)||Math.random()<(a?.01:s>.42?.2:.04);if(V.modern&&(e.contactPoint=Y.position.clone(),!e.deliveryBounced&&Y.position.y>1.05&&(e.noBall=!0),e.wide=mM({x:e.lineX,height:Y.position.y,hand:e.battingHand,guardX:e.guardX,releaseX:e.releaseGuardX,strikerX:De.position.x,bounced:!!e.deliveryBounced,noBall:e.noBall,touched:!o}),e.noBall&&!e.called&&!e.ending&&(e.called=!0,Gn.userData.arms[0].rotation.z=-Math.PI/2,Ve("NO BALL",e.fieldFault||"ONE EXTRA • BALL STILL LIVE"),cn("No ball. One extra."),Tc(e))))return;if(o){T.powerArmed=!1,T.queuedPower=!1,Mn("tension"),Math.abs(e.lineX)<.5&&Ji("gasp");let c=V.modern?js(Y.position,Y.position.clone().addScaledVector(e.deliveryVelocity,Math.max(0,(10.5-Y.position.z)/e.deliveryVelocity.z)),"keeper"):nS({x:e.lineX,y:Y.position.y,releaseX:e.releasePoint.x,releaseZ:e.releasePoint.z,type:e.length});if(!V.modern&&c&&!e.noBall&&!e.wide&&!e.freeHit){e.live=!1,e.phase="miss",e.missStart=Y.position.clone();const u=(e.swing!==null||!i)&&Math.abs(e.lineX-De.position.x)<.24&&Math.random()<.18;e.dismissal=u?"LBW":"BOWLED",e.missTarget=u?new P(e.lineX,.65,9.55):new P(c.x,c.y,c.z),e.phaseAt=n}else Wr(),e.bye=!0,e.live=!0,e.phase="keeper-chase",e.bounced=V.modern?!!e.deliveryBounced:e.length!=="Full toss",e.velocity=V.modern?e.deliveryVelocity.clone():new P((e.lineX-e.releasePoint.x)/e.travel*.38,-.2,20.12/e.travel*.82),e.runAllowed=!1,e.runActive=!1,e.runProgress=0,e.runs=0,Ve(!V.modern&&e.wide?"WIDE BALL":"BEATEN","KEEPER MOVES TO COLLECT");Et(),ne("#play-status").textContent="BALL PASSES THE BAT";return}V.modern&&(e.edged=uS({line:e.lineX,hand:e.battingHand,timing:s,shot:r}),e.struckAt=e.simTime,e.captureContact=!0,_f(De,{phase:.43,shot:r,contact:e.contactPoint,hand:e.battingHand,edge:e.edged}));let l=VM(r,s,Math.random,{height:Y.position.y,line:e.lineX,difficulty:a?"easy":"normal",secondaryShot:e.secondaryShot,power:e.power,hand:Nt(Wt().striker).bat});e.edged?l=dS(e.deliveryVelocity,e.battingHand):V.modern&&(l=lS(l,e.deliveryVelocity,i?(e.swing??e.impact)+.3-e.impact:.08,Nt(Wt().striker).bat,{shot:r,power:e.power})),T.powerArmed=!1,T.queuedPower=!1,Wr(),e.velocity=new P(l.x,l.y,l.z),e.phase="field",e.live=!0,e.bounced=!1,e.runAllowed=l.autoRun&&(!V.modern||!i||UM(Y.position,e.velocity,[...gn,Ue,Te])),e.runActive=e.runAllowed,e.runReturning=!1,e.runProgress=0,e.runs=0,e.fielder=null,e.fielderStart=null,Mn("shot"),r==="Attacking drive"&&Ji("anticipation"),_o(e.edged?"edge":"hit"),cn(e.edged?"Outside edge!":r==="Attacking drive"?"Up in the air!":r==="Defend"?"Played into the field.":"A well timed shot!"),Et(),ne("#play-status").textContent=i?"BALL IN PLAY • RUN OR STOP":"COMPUTER BATTING • FIELDERS CHASING"}function Wi(n,e,t){if(V.modern&&n.flight&&(n.flightSimTime!==void 0?n.simTime-n.flightSimTime<.25:t-n.flightStart<250))return;let i=n.runs%2;const s=OM(n,V.modern?RM(n,e):e);if(!s.moved)return;let r=i?-9.75:9.8,a=i?9.8:-9.75;if(De.position.z=tt.lerp(r,a,s.position),Jt.position.z=tt.lerp(a,r,s.position),V.modern){for(const[l,c]of[[De,s.returning?r:a],[Jt,s.returning?a:r]]){const u=l.userData.motor;u.speed=Math.abs(n.runnerVelocity||0),u.vx=0,u.vz=Math.sign(c-l.position.z)*u.speed,u.phase+=u.speed*e/2.6*Math.PI*2,uo(l,new P(l.position.x,0,c),e),na(l,e),xf(l,c>0?9.3:-9.3)}s.finished&&It()&&Et(),s.finished&&!n.runActive&&(n.runnerVelocity=0);return}fi(De,new P(De.position.x,0,s.returning?r:a)),fi(Jt,new P(Jt.position.x,0,s.returning?a:r));let o=Math.sin(t*.019)*.85;for(const l of[De,Jt])po(l,o),l.userData.arms[0].rotation.x=-o*.65,l.userData.arms[1].rotation.x=o*.65,l.userData.elbows.forEach(c=>c.rotation.x=.5),l.rotation.x=(n.phase==="throw"||n.phase==="receive")&&n.runProgress>.75?.8:.16,l.position.y=Math.abs(o)*.07,l.rotation.z=o*.035,Cn(l,Y.position);s.finished&&([De,Jt].forEach(l=>{l.userData.legs.forEach(c=>c.rotation.x=0),l.userData.knees.forEach(c=>c.rotation.x=.15),l.position.y=0,l.rotation.z=0}),It()&&Et())}function wc(n,e,t){if(V.modern){Dn.held=e,n.returnThrow=new gS({players:[...gn,Ue],keeper:Te,fielding:Dn});const i=n.returnThrow.prepare({fielder:e,batters:[De,Jt],run:n,random:n.throwRandom||Math.random});n.receiver=i.receiver,n.throwEnd=i.end,n.velocity=i.velocity,n.throwCount=(n.throwCount||0)+1,n.phase="modern-return",Ve("RETURN THROW",n.throwEnd==="bowler"?"TO THE BOWLER’S END":"TO THE KEEPER");return}e.rotation.x=0,e.userData.legs.forEach(i=>i.rotation.x=0),n.phase="throw",n.phaseAt=t,n.throwFrom=Y.position.clone(),n.throwEnd=e!==Ue&&(n.runActive?n.runProgress<.5:Math.random()<.5)?"bowler":"keeper",n.throwEnd==="bowler"&&(Ue.position.set(1,-.05,-11.8),fi(Ue,e.position),Ue.userData.arms[1].rotation.x=-1,Ue.userData.elbows[1].rotation.x=.25),n.throwTarget=n.throwEnd==="bowler"?Jn(Ue,1):Ec(),n.throwDuration=Math.max(.7,n.throwFrom.distanceTo(n.throwTarget)/24),n.throwAccurate=Math.random()<.65,fi(e,n.throwTarget),Cn(e,n.throwTarget),e.userData.elbows[1].rotation.x=.5,e.userData.arms[1].rotation.x=-1.25,Ve("FIELDING SIDE",n.throwEnd==="bowler"?"THROW TO THE BOWLER":"THROW TO THE KEEPER"),n.runActive&&(Mn("tension"),Ji("gasp")),cn("The fielder picks up and throws.")}function BS(n,e,t){n.pickElapsed=(n.pickElapsed||0)+e;const i=n.fielder,s=n.pickElapsed,r=n.carryHand??1;if(n.possessionAt){n.pickFeet||(i.updateMatrixWorld(!0),n.pickFeet=i.userData.knees.map(o=>o.localToWorld(new P(0,-.68,.095)))),n.liftElapsed=(n.liftElapsed||0)+e;const a=tt.smoothstep(Math.min(1,n.liftElapsed/.48),0,1);i.position.y=(n.pickY??-vt(i))*(1-a),i.rotation.x=.04,i.userData.torso.rotation.x=n.carryRotation*(1-a),i.userData.arms[r].rotation.x=-.6,i.userData.elbows[r].rotation.x=-.7,n.pickFeet.forEach((o,l)=>ta(i,l,o)),Y.position.copy(Ct(i,r)),a>=1&&(i.position.y=0,wc(n,i,t))}else{const a=Y.position.clone(),o=[Ct(i,0),Ct(i,1)];n.bounced=qi(Y.position,n.velocity,e,n.bounced);const l=Y.position.clone().sub(i.position);if(l.y=0,l.normalize(),!n.pickOffset){const d=l.clone();d.lengthSq()===0&&d.set(Math.sin(i.rotation.y),0,Math.cos(i.rotation.y)),n.missedPicker===i&&d.applyAxisAngle(new P(0,1,0),Math.PI/2),n.pickOffset=d.multiplyScalar(-vt(i))}const c=Y.position.clone().add(n.pickOffset);c.y=0,Ss(i,c,e,2.6,{facingYaw:Math.atan2(l.x,l.z)}),ff(i,Y.position,e);const u=o.findIndex((d,f)=>wo(d,Ct(i,f),a,Y.position,Gr(i))!==null);if(u>=0)n.carryHand=u,n.possessionAt=t,n.liftElapsed=0,n.carryRotation=i.userData.torso.rotation.x,n.pickY=i.position.y,n.pickFeet=null,n.missedPicker=null,Dn.hold(i),br(i,u,1);else if(Math.hypot(Y.position.x,Y.position.z)>=50){Dt(n.bye||n.bounced?4:6,null);return}else if(s>1.65){n.missedPicker=i,n.phase="field",Dn.held=null,n.pickFeet=null,i.userData.fielding.groundBlend=0;return}}Wi(n,e,t)}function Dt(n,e){let t=T.anim;!t||t.ending||(e=Ef({runs:n,dismissal:e,noBall:t.noBall,wide:t.wide,freeHit:t.freeHit}).dismissal,t.ending=!0,t.live=!1,t.outcome=n,t.dismissal=e||null,t.phase="settle",t.phaseAt=performance.now(),["BOWLED","RUN OUT","STUMPED","HIT WICKET"].includes(e)&&kf(t.phaseAt),t.deadReason?(Ve("NO BALL • DEAD BALL",t.deadReason),cn("No ball. Dead ball. One extra.")):e?(Ve("WICKET!",e),_o("wicket"),Mn("celebrate"),Ji("wicket"),cn(e==="HIT WICKET"?"Hit wicket!":e==="STUMPED"?"Stumped! The keeper takes the bails off.":e==="LBW"?"That is leg before wicket!":e==="BOWLED"?"Bowled him!":e==="CAUGHT & BOWLED"?"Caught and bowled!":e==="RUN OUT"?"Run out! The keeper takes the bails off.":"Caught in the field!")):t.overthrowRuns!==void 0&&t.boundaryOutcome===4?(Ve("FOUR OVERTHROWS",n+" RUNS"),Mn("celebrate"),Ji("four"),cn("Four overthrows.")):n===4||n===6?(Ve(t.wide?"FIVE WIDES!":t.legBye?"FOUR LEG BYES!":t.bye?"FOUR BYES!":n===4?"FOUR!":"SIX!","BOUNDARY"),Mn("celebrate"),Ji(n===6?"six":"four"),cn(n===4?"That has raced away for four!":"That is a magnificent six!")):t.noBall||t.wide?(Mn("tension"),Ve(t.noBall?"NO BALL":"WIDE",n?`${n} RUN${n===1?"":"S"} + 1 EXTRA`:T.innings===1&&T.score[1]===T.score[0]?"WINNING EXTRA":"1 EXTRA • REBOWL"),(!V.modern||!(t.called||t.wideCalled))&&cn(t.noBall?"No ball. One extra.":"Wide ball. One extra.")):(Mn(n?"shot":"quiet"),n>0&&Ji("runs"),Ve(n===0?"DOT BALL":`${n} RUN${n===1?"":"S"}`,"BALL RETURNED"),cn(n===0?"No run.":n===1?"They take a single.":`They come back for ${n}.`)),Et(),ne("#play-status").textContent=e||"PLAY COMPLETE")}const Ys=[Y,De,Jt,Ue,Te,...gn,...V.modern?[Gn]:[]];function _r(n){return[n.position.x,n.position.y,n.position.z,n.rotation.x,n.rotation.y,n.rotation.z]}function vr(n,e){n.position.set(e[0],e[1],e[2]),n.rotation.set(e[3],e[4],e[5])}function oh(n){if(V.modern&&!iu&&!su)return;let e=T.anim;if(!e||T.phase!=="animating"||!e.captureContact&&n-(e.lastCapture||0)<(V.modern?33:55))return;e.captureContact=!1,e.lastCapture=n;let t=Ys.slice(1).map(i=>i.userData.arms&&i.userData.legs?[...i.userData.arms,...i.userData.elbows,...i.userData.legs,...i.userData.knees].map(s=>[s.rotation.x,s.rotation.y,s.rotation.z]):[]);(e.frames||(e.frames=[])).push({t:n-e.start,camera:V.modern&&T.camera===0&&Za?{id:Za.id,position:tn.position.toArray(),look:Za.look.toArray(),fov:tn.fov}:null,actors:Ys.map(_r),limbs:t,details:Ys.slice(1).map(i=>({head:i.userData.head?_r(i.userData.head):null,torso:i.userData.torso?_r(i.userData.torso):null,bat:i.userData.bat?_r(i.userData.bat):null})),stumps:du.map(_r)}),e.frames.length>(V.modern?600:260)&&e.frames.shift()}function zS(){let n=T.anim;if(!n?.frames||n.frames.length<3){gu();return}T.phase="replay",T.replay={frames:n.frames,start:performance.now(),base:n.frames[0].t},ne("#stage-controls").classList.add("hidden"),ne("#replay-ui").classList.remove("hidden"),ne("#play-status").textContent="ACTION REPLAY",ne("#broadcast").textContent="ACTION REPLAY"}function mu(){T.phase==="replay"&&(T.replay=null,ne("#replay-ui").classList.add("hidden"),T.phase="animating",gu())}ne("#skip-replay").onclick=mu;function kS(n){const e=T.replay,t=(n-e.start)*.8+e.base,i=e.frames;if(t>=i[i.length-1].t){mu();return}let s=0;for(;s<i.length-2&&i[s+1].t<t;)s++;const r=i[s],a=i[s+1],o=V.modern?tt.clamp((t-r.t)/(a.t-r.t||1),0,1):0,l=(c,u,d=!1)=>c.map((f,h)=>{const g=d||h>=3?Math.atan2(Math.sin(u[h]-f),Math.cos(u[h]-f)):u[h]-f;return f+g*o});r.actors.forEach((c,u)=>vr(Ys[u],l(c,a.actors[u]))),r.limbs.forEach((c,u)=>{const d=Ys[u+1];d.userData.arms&&d.userData.legs&&c.forEach((f,h)=>[...d.userData.arms,...d.userData.elbows,...d.userData.legs,...d.userData.knees][h].rotation.set(...l(f,a.limbs[u][h],!0)))}),r.details.forEach((c,u)=>{const d=Ys[u+1];c.head&&vr(d.userData.head,l(c.head,a.details[u].head)),c.torso&&vr(d.userData.torso,l(c.torso,a.details[u].torso)),c.bat&&vr(d.userData.bat,l(c.bat,a.details[u].bat))}),r.stumps.forEach((c,u)=>vr(du[u],l(c,a.stumps[u]))),V.modern&&(e.cameraView=wM(r.camera,a.camera,o))}function gu(){let n=T.innings,e=T.anim,t=n===0?Xn():bn(),i=e.outcome||0,s=e.dismissal?en[t][Math.min(T.nextBatter,10)]:null;const r=Ef({runs:i,dismissal:e.dismissal,noBall:e.noBall,wide:e.wide,byes:e.bye,legByes:e.legBye,freeHit:e.freeHit});V.modern&&(T.freeHit=iS(!!e.freeHit,r));const a=Wt(),o=V.modern&&r.dismissal?{batter:e.dismissedPlayer===void 0?a.striker:en[t][e.dismissedPlayer],fielder:(e.dismissal==="STUMPED"?Te:e.fielder)?.userData.playerName}:null;if(XM(T.stats[n],a.striker,a.bowler,r,o),r.legal&&T.balls[n]++,T.score[n]+=i+r.penalty,T.extras[n]+=r.penalty+(r.extra==="WIDE"||r.byes?i:0),i%2===1&&([T.striker,T.partner]=[T.partner,T.striker]),e.dismissal){T.wickets[n]++;let u=T.nextBatter++;e.dismissal==="RUN OUT"&&e.dismissedPlayer===T.partner?T.partner=u:T.striker=u}let l=r.legal&&T.balls[n]%6===0;l&&([T.striker,T.partner]=[T.partner,T.striker],T.powerUsed=0),T.history.push(e.dismissal||r.extra||i);let c=!!e.dismissal;if(T.phase="playing",T.anim=null,zf(),Gn.userData.arms.forEach(u=>u.rotation.set(0,0,0)),Y.position.set(1.5,2,-20),Ro(),fu(),De.position.set(Nt(Wt().striker).bat==="left"?.7:-.7,0,9.8),hu(),pu(),T.autoAt=performance.now()+3200,Mn("between"),n===1&&T.score[1]>T.score[0]||T.balls[n]>=wn*6||T.wickets[n]>=10)if(n===0){T.phase="innings-summary",HS(),Et();return}else{T.phase="finished",GS(),Et();return}sa(),Et(),c?go(l?"both":"wicket",s):l&&go("bowler")}function Ac(n){const e=n===0?Xn():bn(),t=n===0?bn():Xn(),i=T.stats[n],s=V.modern&&i.extras?` (Wd ${i.extras.wides}, Nb ${i.extras.noBalls}, B ${i.extras.byes}, Lb ${i.extras.legByes})`:"",r=Object.entries(i.batters).map(([o,l])=>`<tr><th scope="row">${o}${V.modern?`<small class="dismissal-note">${l.dismissal||"not out"}</small>`:""}</th><td>${l.runs}</td><td>${l.balls}</td><td>${vc(l)}</td></tr>`).join("")||'<tr><td colspan="4">No balls faced</td></tr>',a=Object.entries(i.bowlers).map(([o,l])=>`<tr><th scope="row">${o}</th><td>${ps(l.balls)}</td><td>${l.runs}</td><td>${l.wickets}</td><td>${Sf(l)}</td></tr>`).join("")||'<tr><td colspan="5">No deliveries</td></tr>';return`<section class="innings-card"><div class="innings-card-heading"><strong>${e} ${T.score[n]}/${T.wickets[n]}</strong><span>${ps(T.balls[n])} overs · ${T.extras[n]} extras${s}</span></div><div class="scorecard-grid"><div><h3>${e} batting</h3><table><thead><tr><th>BATTER</th><th>R</th><th>B</th><th>SR</th></tr></thead><tbody>${r}</tbody></table></div><div><h3>${t} bowling</h3><table><thead><tr><th>BOWLER</th><th>O</th><th>R</th><th>W</th><th>ECO</th></tr></thead><tbody>${a}</tbody></table></div></div></section>`}function jf(){document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function HS(){jf(),ne("#modal-root").innerHTML=`<div class="modal-wrap"><div class="modal scorecard-modal"><div class="eyebrow">INNINGS BREAK · ${bn().toUpperCase()} NEED ${T.score[0]+1}</div><h2>FIRST INNINGS</h2>${Ac(0)}<button class="primary" id="next-innings">START THE CHASE →</button></div></div>`,ne("#next-innings").onclick=()=>{ne("#modal-root").innerHTML="",T.innings=1,T.freeHit=!1,T.striker=0,T.partner=1,T.nextBatter=2,T.powerUsed=0,Yf(),Ve("INNINGS BREAK",`${bn().toUpperCase()} NEED ${T.score[0]+1} TO WIN`),cn(`${bn()} need ${T.score[0]+1} to win.`),sa(),Et(),go("innings")}}function GS(){jf(),Mn("celebrate"),Ji("finish");let n=T.score[0],e=T.score[1],t=e>n?`${bn()} win by ${10-T.wickets[1]} wicket${T.wickets[1]===9?"":"s"}`:n>e?`${Xn()} win by ${n-e} run${n-e===1?"":"s"}`:"Match tied!";ne("#modal-root").innerHTML=`<div class="modal-wrap"><div class="modal scorecard-modal"><div class="eyebrow">FULL TIME AT ${V.modern?ji[hi].name.toUpperCase():"THE GRAND OVAL"}</div><h2>${t}</h2>${Ac(0)}${Ac(1)}<button class="primary" id="again">PLAY AGAIN →</button></div></div>`,ne("#again").onclick=()=>{T.phase="ready",ne("#modal-root").innerHTML="",Et(),Kr()}}function ep(){T.camera=(T.camera+1)%ah.length,ne("#camera").innerHTML=`◈ &nbsp; CAMERA: ${ah[T.camera]} [C]`}ne("#camera").onclick=ep;ne("#newmatch").onclick=Kr;ne("#help").onclick=()=>{alert(`BAT: The computer bowls automatically. As the ball arrives, press LEFT or RIGHT for cover drives, UP for an attacking drive, DOWN to defend, SPACE to sweep, or 1–5 for hook, pull, cut, flick and straight drive. Hold SHIFT with a shot for a super boost (twice per over); two quick shot keys blend their directions. Tap POWER on touch screens.

BOWL: Choose a length with the buttons; arrows select FULL / GOOD / SHORT, Q selects YORKER, E selects BOUNCER and F selects FULL TOSS. Choosing a length bowls immediately. The computer bats.

C cycles cameras. Sound starts with the match. During a run, Press DOWN early to turn back, or after halfway to queue another run. At the crease, DOWN starts another run. Press R or tap RUN/NEXT to start or queue a run. Choose 2, 5, 10 or 20 overs per side (5 by default). Bowlers can bowl at most 1, 1, 2 or 4 overs respectively.`)};let $e,wi,Yi,Vs,ms,Rc,cs,fs,xu=!1,lh=[];const tp={},np={};let ch=!1,uh=!1;const ip={"That has raced away for four!":"four","That is a magnificent six!":"six","Bowled him!":"bowled","That is leg before wicket!":"lbw","Caught in the field!":"caught","Caught and bowled!":"caught_bowled","Run out! The keeper takes the bails off.":"keeper_runout","A well timed shot!":"shot","Up in the air!":"loft","Played into the field.":"defend","The fielder picks up and throws.":"fielder","No run.":"dot","They take a single.":"one","They come back for 2.":"two","They come back for 3.":"three","No ball. One extra.":"no-ball","Wide ball. One extra.":"wide"};function sp(n){return fetch(`./audio/${n}.mp3`).then(e=>{if(!e.ok)throw Error("Missing audio: "+n);return e.arrayBuffer()}).then(e=>$e.decodeAudioData(e))}function VS(){if(!ch){ch=!0;for(const n of Object.values(ip))sp(n).then(e=>tp[n]=e).catch(e=>console.warn(e))}}function _u(){if(fs)try{fs.stop()}catch{}fs=null;for(const n of lh)try{n.stop()}catch{}lh=[]}function WS(n,e,t){let i=n==="bowler"?`${e.bowler} comes on to bowl.`:n==="wicket"||n==="both"?`${t} comes in to bat. ${e.bowler} is bowling.`:`${e.striker} and ${e.partner} come to the crease. ${e.bowler} will bowl.`;ne("#commentary").textContent=i.toUpperCase(),cn(i)}function XS(){let n=wn*6-T.balls[1],e=T.score[0]+1-T.score[1];return T.innings===1&&n<=6&&e>0&&e<=n*3?.76:.58}function Mn(n){if(!$e||!ms||T.muted)return;let e=XS(),t={between:e,delivery:e*.74,quiet:e*.86,shot:e*1.22,tension:e*1.3,celebrate:e*1.38},i=$e.currentTime;ms.gain.cancelScheduledValues(i),ms.gain.setTargetAtTime(t[n]??e,i,n==="delivery"?.7:.35)}function qS(n){if(cs)try{cs.stop()}catch{}cs=$e.createBufferSource(),cs.buffer=n,cs.loop=!0,cs.connect(ms),cs.start(),T.muted||Mn("between")}function YS(){if(!uh){uh=!0,(()=>{let n=$e.sampleRate*5,e=$e.createBuffer(1,n,$e.sampleRate),t=e.getChannelData(0),i=0;for(let s=0;s<n;s++)i=i*.95+(Math.random()*2-1)*.05,t[s]=i*(.7+.3*Math.sin(s/$e.sampleRate*1.8));qS(e)})();for(const n of["crowd-applause","crowd-gasp"])sp(n).then(e=>np[n]=e).catch(e=>console.warn(e))}}function rp(){Su();try{$e||($e=new(window.AudioContext||window.webkitAudioContext),wi=$e.createDynamicsCompressor(),wi.threshold.value=-10,wi.ratio.value=4,wi.attack.value=.01,wi.release.value=.25,wi.connect($e.destination),Yi=$e.createGain(),Vs=$e.createGain(),ms=$e.createGain(),Rc=$e.createGain(),ms.connect(Vs),Rc.connect(Vs),Vs.connect(Yi),Yi.connect(wi),Yi.gain.value=0,ms.gain.value=.58),$e.resume(),xu=!1,T.muted=!1,VS(),YS(),Yi.gain.cancelScheduledValues($e.currentTime),Yi.gain.setTargetAtTime(1,$e.currentTime,.18),Mn("between"),ne("#sound").textContent="♪ SOUND ON"}catch(n){console.warn("Audio unavailable",n)}}function _o(n){if(T.muted||!$e)return;let e=$e.createOscillator(),t=$e.createGain(),i=$e.currentTime;e.type=n==="wicket"?"square":"triangle";const s={wicket:260,hit:700,edge:1250,glove:175,pad:105}[n]??700;e.frequency.setValueAtTime(s,i),e.frequency.exponentialRampToValueAtTime(100,i+.12),t.gain.setValueAtTime(n==="pad"||n==="glove"?.055:.1,i),t.gain.exponentialRampToValueAtTime(.001,i+.16),e.connect(t).connect(wi),e.start(i),e.stop(i+.17)}function Ji(n){if(T.muted||!$e)return;let e=n==="gasp"||n==="anticipation",t=np[e?"crowd-gasp":"crowd-applause"];if(!t)return;let i=$e.currentTime,s=$e.createBufferSource(),r=$e.createGain(),a={gasp:2.5,anticipation:1.7,runs:2.1,four:5,six:7,wicket:6,finish:8},o={gasp:.7,anticipation:.5,runs:.38,four:.85,six:1,wicket:.9,finish:1},l=e?0:1,c=Math.min(a[n]||3,t.duration-l);c<=.1||(s.buffer=t,s.playbackRate.value=.96+Math.random()*.08,r.gain.setValueAtTime(.001,i),r.gain.linearRampToValueAtTime(o[n]||.6,i+.2),r.gain.setValueAtTime(o[n]||.6,i+Math.max(.2,c-.7)),r.gain.linearRampToValueAtTime(.001,i+c),s.connect(r).connect(Rc),s.start(i,l,c))}function dh(n){if(!Vs||!$e)return;let e=$e.currentTime,t=Vs.gain;t.cancelScheduledValues(e),t.setValueAtTime(t.value,e),t.linearRampToValueAtTime(.42,e+.12),t.setValueAtTime(.42,e+Math.max(.15,n)),t.linearRampToValueAtTime(1,e+Math.max(.15,n)+.6)}function cn(n){if(ne("#commentary").textContent=n.toUpperCase(),T.muted||!$e)return;let e=tp[ip[n]];if(e){try{_u(),fs=$e.createBufferSource(),fs.buffer=e;const t=$e.createGain();t.gain.value=1.1,fs.connect(t).connect(wi),dh(e.duration),fs.start()}catch{}return}if("speechSynthesis"in window)try{let t=speechSynthesis.getVoices().find(s=>s.localService&&/^en/i.test(s.lang));if(!t)return;speechSynthesis.cancel();let i=new SpeechSynthesisUtterance(n);i.voice=t,i.rate=1.03,i.pitch=.9,i.volume=1,dh(Math.min(4,n.length/14)),speechSynthesis.speak(i)}catch{}}ne("#sound").onclick=()=>{T.muted?rp():(T.muted=!0,xu=!0,_u(),"speechSynthesis"in window&&speechSynthesis.cancel(),Yi&&Yi.gain.setTargetAtTime(0,$e.currentTime,.08),ne("#sound").textContent="♪ SOUND OFF")};V.modern&&(ne("#audio-credits").textContent="CREDITS");ne("#audio-credits").onclick=()=>alert("Crowd applause: stephan, public domain. Crowd gasp: starlite, public domain. Full source and license links are in the project README and audio/CREDITS.txt."+(V.modern?`

Striker body adapted from Cesium Man, © 2017 Cesium, CC BY 4.0. Source, licence and modifications: models/CREDITS.txt.`:""));const Cc=Math.random().toString(36).slice(2)+Date.now().toString(36);let vo=null,Zr=!1,ui=!1,Ii=document.hidden?performance.now():null;function vu(n){V.modern&&(ne("#controls").inert=n,ne("#stage-controls").inert=n)}vu(Ii!==null);function Mu(){T.overRate?.[T.innings]&&(T.overRate[T.innings].last=null),vu(!0),Ii===null&&(Ii=performance.now()),$e&&$e.state==="running"&&$e.suspend().catch(()=>{}),"speechSynthesis"in window&&speechSynthesis.cancel()}function Lo(){if(document.hidden||Zr||ui||Ii===null)return;let n=performance.now(),e=n-Ii;Ii=null,vu(!1);let t=T.anim;if(t)for(const i of["start","last","lastCapture","phaseAt","flightStart","wicketBrokenAt"])typeof t[i]=="number"&&(t[i]+=e);T.replay&&(T.replay.start+=e),T.introUntil&&(T.introUntil+=e),T.autoAt&&(T.autoAt+=e),$e&&!T.muted&&$e.resume().catch(()=>{})}function Su(){if(vo)vo.postMessage({type:"claim",id:Cc});else try{localStorage.setItem("cricket97-active-tab",JSON.stringify({id:Cc,t:Date.now()}))}catch{}}function hh(n){n!==Cc&&(T.phase==="ready"&&(!$e||T.muted)||(Zr=!0,Mu(),ne("#tab-pause").classList.remove("hidden")))}try{"BroadcastChannel"in window?(vo=new BroadcastChannel("cricket97-match-focus"),vo.onmessage=n=>{n.data?.type==="claim"&&hh(n.data.id)}):window.addEventListener("storage",n=>{if(n.key==="cricket97-active-tab"&&n.newValue)try{hh(JSON.parse(n.newValue).id)}catch{}})}catch{}document.addEventListener("visibilitychange",()=>{document.hidden?Mu():Lo()});ne("#pause-game").onclick=()=>{ui=!ui;let n=ne("#pause-game");n.textContent=ui?"▶":"Ⅱ",n.setAttribute("aria-label",ui?"Resume match":"Pause match"),n.title=ui?"Resume match":"Pause match",ui?Mu():Lo()};ne("#resume-match").onclick=()=>{Zr=!1,ne("#tab-pause").classList.add("hidden"),Su(),Lo()};window.addEventListener("keyup",n=>{_c[n.code]&&tr.delete(_c[n.code])});window.addEventListener("blur",()=>tr.clear());window.addEventListener("keydown",n=>{if(!(ne("#modal-root").children.length||/INPUT|SELECT|TEXTAREA/.test(n.target.tagName))){if(T.phase==="replay"){(n.code==="KeyK"||n.code==="Escape"||n.code==="Space")&&(n.preventDefault(),mu());return}if(T.phase==="intro"){V.modern&&["Enter","Space"].includes(n.code)&&(n.preventDefault(),ne("#player-intro .skip-intro")?.click());return}if(!(ui||Zr||document.hidden)){if(n.code==="KeyC"){ep();return}if(n.code==="KeyR"){Jf();return}if(["Space","Enter","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","KeyQ","KeyE","KeyF","Digit1","Digit2","Digit3","Digit4","Digit5"].includes(n.code)){if(n.preventDefault(),T.phase==="ready"){(n.code==="Enter"||n.code==="Space")&&Kr();return}if(T.phase!=="finished"){if(V.modern&&n.code==="Enter"){!n.repeat&&!ui&&!Zr&&ne("#stage-controls [data-assisted]")?.click();return}if(It()){if(n.code==="ArrowDown"&&T.anim?.live){Qf();return}let e=_c[n.code];e&&!n.repeat&&(tr.add(e),$f(e,n.shiftKey))}else{let e={ArrowLeft:"Full",ArrowDown:"Good",ArrowUp:"Good",ArrowRight:"Short",KeyQ:"Yorker",KeyE:"Bouncer",KeyF:"Full toss"}[n.code];e&&T.phase==="playing"?(T.line=e,xo()):!e&&T.phase==="playing"&&xo()}}}}}});const gs=V.modern?new Kv(ut.getPixelRatio(),es?.8:ut.getPixelRatio()):null;gs&&ut.setPixelRatio(gs.ratio);let fh=0,ks=0;function $S(n){if(V.modern&&Rf.matches||n-fh<(gs&&gs.ratio<gs.max?200:100))return;fh=n;let e=T.anim?.phase==="settle"&&(T.anim.dismissal||T.anim.outcome>=4);for(let t=0;t<gr;t++){let i=(ks+t)%hs.length,s=hs[i],r=Math.sin(n*.003+s.phase),a=e?Math.max(0,r)*.32:Math.max(0,r)*.045;wt.position.set(s.x,s.y+a,s.z),wt.rotation.set(0,s.rotation,s.lean+r*(e?.2:.035)),wt.scale.setScalar(s.scale),wt.updateMatrix(),ii.setMatrixAt(i,wt.matrix),wt.position.y=s.y+.58+a,wt.updateMatrix(),Li.setMatrixAt(i,wt.matrix)}bS?.update(ks,gr,n,e),V.modern?(Pr(ii,ks,gr,hs.length),Pr(Li,ks,gr,hs.length)):(ii.instanceMatrix.needsUpdate=!0,Li.instanceMatrix.needsUpdate=!0),ks=(ks+gr)%hs.length,If.forEach((t,i)=>t.rotation.z=Math.sin(n*.002+i)*.07)}let xl=0;document.addEventListener("visibilitychange",()=>{});function yu(){const n=T.overRate?.[T.innings];return!!n&&T.balls[T.innings]>=n.fromBall}function KS(n){if(!V.modern||wn!==20)return;const e=T.overRate??=[],t=e[T.innings]??={elapsed:0,last:null,fromBall:1/0};if(Ii!==null||document.hidden||!["playing","animating"].includes(T.phase)){t.last=null;return}t.last!==null&&(t.elapsed+=Math.max(0,n-t.last)),t.last=n,t.elapsed>=5100*1e3&&t.fromBall===1/0&&(t.fromBall=oM(T.balls[T.innings],wn,!!T.anim))}function ap(n){if(ES())return;KS(n);const e=xl?(n-xl)/1e3:1/60;if(gs&&T.phase==="animating"&&Ii===null&&!document.hidden){const t=gs.observe(e*1e3);t!==null&&ut.setPixelRatio(t)}if(Sc=Math.min(V.modern?.1:.05,e),xl=n,requestAnimationFrame(ap),$S(n),Ii!==null){fl();return}if(T.phase==="intro"&&n>=T.introUntil&&(T.phase="playing",T.autoAt=n+1800,ne("#player-intro").classList.add("hidden"),Et()),T.phase==="replay"){kS(n),sh(),rh(),T.replay&&(V.modern?bc():(tn.position.lerp(new P(Y.position.x+13,27,Y.position.z+27),.09),tn.lookAt(Y.position.x,0,Y.position.z))),fl();return}if(T.phase==="playing"&&It()&&T.autoAt&&n>=T.autoAt&&!ne("#modal-root").children.length&&xo(),T.anim||qf(),V.modern&&(T.phase!=="replay"&&gf([De,Jt,Ue,Te,...gn]),T.anim||[Ue,...gn].forEach(t=>PM(t,n/1e3,Sc))),T.anim){let t=T.anim,i=(n-t.start)/1e3,s=Math.min((n-t.last)/1e3,V.modern?.1:.05)*(t.lab?t.labSpeed??.2:1);t.last=n,V.modern&&(!t.lab||t.labClock)&&(t.simTime=(t.simTime||0)+s,i=t.simTime),V.modern&&t.flight&&t.phase!=="field"&&Dn.finishActions(s,Y.position,[t.fielder,t.receiver]);let r=It()?t.swing:t.impact-(V.modern?.3:.22);const a=t.preparationAt??r;if(t.avoiding&&!t.flight&&t.releasePoint){const o=Math.sign(t.guardX-t.lineX)||(t.battingHand==="left"?1:-1),l=Math.min(.3,Math.abs(De.position.x-t.guardX)+1.6*s);De.position.x=t.guardX+o*l,gc(De,{hand:t.battingHand}),t.attemptedAvoidance=l>0}if(V.modern&&!t.regainingGround&&r!==null&&i>=a&&i-r<.75&&(!t.runActive||t.simTime-t.flightSimTime<.25)){const o=Math.min(.2,Math.max(0,r-a)/.7);let l=i<r?(i-a)/.7:Math.max(o,(i-r)/.7);t.struckAt!==void 0&&(l=.43+(i-t.struckAt)/.7),_f(De,{phase:tt.clamp(l,0,1),shot:(It()?t.selectedShot||T.shot:t.cpuShot)||"Straight drive",contact:t.contactPoint||new P(t.lineX,Y.position.z>5?Y.position.y:.65,9.2),hand:t.battingHand,edge:t.edged})}else V.modern&&!t.regainingGround&&t.flight&&!t.runActive&&r!==null&&i-r>=.75&&!t.battingRecovered&&(gc(De,{hand:t.battingHand}),t.battingRecovered=!0);if(!V.modern&&r!==null&&(!t.flight||t.phase==="field"&&i-r<.75)){let o=t.power?.44:.75,l=Math.min(Math.max((i-r)/o,0),1),c=Math.sin(l*Math.PI),u=De.userData.stance,d=It()?t.selectedShot||T.shot:t.cpuShot,f=d==="Defend"?.5:d==="Attacking drive"?1.45:d==="Sweep"?1.25:1.05,h=De.userData.bat,g=d==="Sweep",M=d==="Hook"||d==="Pull",m=d==="Cut",p=d==="Flick",_=d==="Straight drive";h.position.set(u.sign*c*(g?.55:m?-.32:p?.36:.28),1.9+c*(g?-.55:M?.58:.16),.3-c*(_?.35:.18)),h.rotation.set(g?c*1.2:M?-c*1.1:m?c*.65:d==="Attacking drive"?-c*.65:c*.18,0,-u.sign*(.12+c*(M?1.55:f)*(t.power?1.5:1))),De.userData.knees[0].rotation.x=.18+c*(g?.8:M?.12:.3),De.userData.knees[1].rotation.x=.18+c*(g?.5:.12),(d==="Attacking drive"||_)&&!t.flight&&(De.position.z=9.8-c*(_?.55:.95)),De.rotation.x=.14+c*(g?.38:M?-.05:.08),De.rotation.y=u.yaw+u.sign*c*(g?.65:M?-.45:m?-.3:.22),De.userData.head.rotation.y=u.headYaw-u.sign*c*.22,Xf(De),V.modern&&bo(De)}if(V.modern&&t.flight&&!t.runActive&&i-t.flightSimTime>.24&&["keeper-chase","keeper-gather","stumping"].includes(t.phase)&&!Xa(yr(De),"keeper")&&(t.regainingGround=!0,Ss(De,new P(De.position.x,0,9.85),s,3.2,{facingYaw:0}),xf(De,9.3)),t.flight)if(t.phase==="miss"){let o=Math.min((n-t.phaseAt)/600,1);Y.position.lerpVectors(t.missStart,t.missTarget,o),o>=1&&Dt(0,t.dismissal)}else if(t.phase==="keeper-chase"&&V.modern)for(let o=s;o>1e-7&&t.phase==="keeper-chase";){const l=Math.min(.008333333333333333,o);o-=l;const c=Y.position.clone(),u=[Ct(Te,0),Ct(Te,1)];t.bounced=qi(Y.position,t.velocity,l,t.bounced),jd(Te,Y.position,t.velocity,l);const d=js(c,Y.position,"keeper"),f=t.padTouched?null:hM(c,d?new P(d.x,d.y,d.z):Y.position,De);if(f){t.padTouched=!0,t.wide=!1,_o("pad");const h=t.swing!==null||!It(),g=Math.max(0,(10.5-f.point.z)/Math.max(.01,t.velocity.z)),M=f.point.clone().addScaledVector(t.velocity,g);M.y-=4.905*g**2;const m=js(f.point,M,"keeper");Y.position.copy(f.point),fM({pitchX:t.pitchX,impactX:f.point.x,hand:t.battingHand,playedShot:h,wouldHit:m,noBall:t.noBall,freeHit:t.freeHit})?Dt(0,"LBW"):!h&&!t.attemptedAvoidance?Dt(0,null):(t.legBye=!0,t.phase="field",t.velocity.multiplyScalar(.22),t.velocity.z*=-1,Wr(),Ve("OFF THE PAD","BALL IN PLAY"),Et())}else if(d&&!t.noBall&&!t.freeHit)Y.position.set(d.x,d.y,d.z),t.wide=!1,Dt(0,"BOWLED");else{const h=u.findIndex((g,M)=>wo(g,Ct(Te,M),c,Y.position,Gr(Te))!==null);h>=0?(_o("glove"),t.phase="keeper-gather",t.glove=h,t.phaseAt=n,t.gatherFrom=Y.position.clone(),Y.position.copy(Ct(Te,h)),Ve("WICKETKEEPER","CLEAN GLOVE CONTACT")):Y.position.z>Te.position.z+.8&&(t.phase="field",t.runAllowed=!0,t.runActive=!0,t.runReturning=!1,Ve(t.wide?"WIDE BALL":"BYE","PAST THE KEEPER • BATTERS RUN"),Et())}}else if(t.phase==="keeper-chase"){t.bounced=qi(Y.position,t.velocity,s,t.bounced);let o=tt.clamp(Y.position.x-Te.position.x,-3*s,3*s);Te.position.x+=o,pl(Te,Math.abs(o),n),Te.rotation.x=-.48,Cn(Te,Y.position),ml(Te,0,Y.position),ml(Te,1,Y.position),tS(Y.position,Te.position)?(t.phase="keeper-gather",t.phaseAt=n,t.gatherFrom=Y.position.clone(),Ve("WICKETKEEPER","COLLECTS THE BALL")):Y.position.z>Te.position.z+1.4&&(t.phase="field",t.runAllowed=!0,t.runActive=!0,t.runReturning=!1,Ve(t.wide?"WIDE BALL":"BYE","PAST THE KEEPER • BATTERS RUN"),Et())}else if(t.phase==="keeper-gather"){let o=Math.min((n-t.phaseAt)/420,1);V.modern?(Y.position.copy(Ct(Te,t.glove??1)),!t.noBall&&!t.freeHit&&!t.runActive&&!Xa(yr(De),"keeper")?(t.phase="stumping",t.stumpingTime=0):o>=1&&Dt(0,null)):(Te.rotation.x=-.48-.12*o,Te.userData.knees.forEach(l=>l.rotation.x=.65),Y.position.lerpVectors(t.gatherFrom,Ec(),o),o>=1&&Dt(0,null))}else if(t.phase==="stumping")if(t.stumpingTime+=s,Tf(Te,t.glove??1,Y.position,"keeper",t.stumpingTime,s)){const l=Xa(yr(De),"keeper");Dt(0,l?null:"STUMPED")}else t.stumpingTime>2&&Dt(0,null);else if(t.phase==="field"&&V.modern){const o=Y.position.clone();t.bounced=qi(Y.position,t.velocity,s,t.bounced),Y.rotation.x+=Math.hypot(t.velocity.x,t.velocity.z)*s/.16;const l=Dn.update({ball:Y.position,previousBall:o,velocity:t.velocity,bounced:t.bounced,dt:s});Wi(t,s,n),l?.type==="catch"?(t.fielder=l.player,t.caughtBall=!0,t.phase="catch",t.phaseAt=n,t.catchFrom=Y.position.clone(),t.fieldingDismissal=!t.noBall&&!t.bye&&!t.wide&&!t.freeHit,Y.position.copy(Ct(t.fielder,1)),Ve(t.fieldingDismissal?"CATCH!":"BALL HELD",t.fielder.userData.fielding.mode==="dive"?"A DIVING TAKE":"FIELDER TAKES THE BALL")):l?.type==="stop"||l?.type==="block"?(Qv(Y.position,t.velocity,o,l),l.controlled?(t.phase="pickup",t.phaseAt=n,t.pickElapsed=0,t.liftElapsed=0,t.fielder=l.player,t.carryHand=l.hand,t.possessionAt=n,t.carryRotation=l.player.userData.torso.rotation.x,t.pickY=l.player.position.y,t.pickFeet=null,Dn.hold(l.player),Y.position.copy(Ct(l.player,l.hand)),Ve("CLEAN GATHER","FIELDER HAS THE BALL")):Ve(l.type==="block"?"BODY BLOCK":["dive","slide"].includes(l.player.userData.fielding.mode)?"DIVING STOP":"SHARP STOP","BALL DEADENED • STILL LIVE")):l?.type==="gather"&&(t.phase="pickup",t.phaseAt=n,t.pickElapsed=0,t.liftElapsed=0,t.pickFrom=Y.position.clone(),t.fielder=l.player,t.pickOffset=null,t.pickFeet=null,t.possessionAt=null,Dn.held=l.player,Ve("FIELDING SIDE","FIELDER MOVES TO GATHER")),t.phase==="field"&&Math.hypot(Y.position.x,Y.position.z)>=50&&(t.boundaryOutcome=t.overthrowRuns!==void 0||t.bye||t.bounced?4:6,t.phase="boundary",t.phaseAt=n,t.live=!1)}else if(t.phase==="field"){t.bounced=qi(Y.position,t.velocity,s,t.bounced),Y.rotation.x+=Math.hypot(t.velocity.x,t.velocity.z)*s/.27;let o=[...gn,Ue],l=Y.position.clone(),c=Math.min(.65,Math.hypot(t.velocity.x,t.velocity.z)/30);l.x+=t.velocity.x*c,l.z+=t.velocity.z*c;let u=Math.hypot(l.x,l.z);u>49&&(l.x*=49/u,l.z*=49/u),l.y=0;let d=o.map(y=>({p:y,d:(y.position.x-l.x)**2+(y.position.z-l.z)**2})).sort((y,b)=>y.d-b.d),f=o.reduce((y,b)=>Math.hypot(b.position.x-Y.position.x,b.position.z-Y.position.z)<Math.hypot(y.position.x-Y.position.x,y.position.z-Y.position.z)?b:y,o[0]),h=d[0].p,g=f===h?d[1].p:f,M=Math.sin(n*.015)*.75;V.modern&&((!t.fieldSelectionAt||n-t.fieldSelectionAt>500)&&(t.fieldLead=h,t.fieldBackup=g,t.fieldSelectionAt=n),h=t.fieldLead,g=t.fieldBackup),o.forEach((y,b)=>{let R=y===h?0:y===g?1:2;if(R<2){let E=Y.position;fi(y,E),Cn(y,Y.position);let x=new P(E.x-y.position.x,0,E.z-y.position.z),v=x.length(),C=Math.min(v,(R===0?7.5:6.5)*s);v>.01&&y.position.addScaledVector(x,C/v);let A=v<3.8&&v>1.2&&Y.position.y>.5&&Y.position.y<2.6;A&&(y.rotation.x=.85,y.userData.arms[1].rotation.x=-1.3);let L=v>.18?M:0;po(y,L),y.userData.arms[0].rotation.x=-L*.7,y.userData.arms[1].rotation.x=A?-1.3:L*.7,y.userData.elbows[0].rotation.x=.65+Math.max(0,L)*.2,y.userData.elbows[1].rotation.x=.65+Math.max(0,-L)*.2,y.position.y=v>.18?Math.abs(L)*.06:0,y.rotation.x=A?.85:v>.18?.14:.04}else y.userData.legs&&(fi(y,Y.position),Cn(y,Y.position),y.userData.legs[0].rotation.x*=.8,y.userData.legs[1].rotation.x*=.8,y.userData.knees.forEach(E=>E.rotation.x*=.8),y.rotation.x*=.8)});let m=o.map(y=>({p:y,d:Math.hypot(Y.position.x-y.position.x,Y.position.z-y.position.z)})).sort((y,b)=>y.d-b.d)[0],p=m.p,_=m.d;t.fielder=p,Wi(t,s,n),Math.hypot(Y.position.x,Y.position.z)>=50?(t.boundaryOutcome=t.bye||t.bounced?4:6,t.phase="boundary",t.phaseAt=n,t.live=!1):(V.modern?_<1.15&&(t.bounced||t.bye||Jn(p,1).distanceTo(Y.position)<.42):_<1.4)&&Y.position.y<(V.modern?3.15:2.9)&&(!t.bye&&!t.bounced&&Y.position.y>.7&&!t.noBall?(t.phase="catch",t.phaseAt=n,t.catchFrom=Y.position.clone(),t.fielder=p,fi(p,Y.position),Cn(p,Y.position),ml(p,1,Y.position),Ve("CATCH!","FIELDER TAKES THE BALL")):(t.phase="pickup",t.phaseAt=n,t.pickFrom=Y.position.clone(),t.fielder=p,p.userData.legs.forEach(y=>y.rotation.x=0),Ve("FIELDING SIDE","FIELDER GATHERS THE BALL")))}else if(t.phase==="boundary"){t.bounced=qi(Y.position,t.velocity,s,t.bounced),Y.rotation.x+=Math.hypot(t.velocity.x,t.velocity.z)*s/.27;const o=Math.hypot(Y.position.x,Y.position.z),l=(n-t.phaseAt)/1e3;if(t.boundaryOutcome===4){if(o>=60.5&&!t.boardHit){t.boardHit=!0,t.boardAt=n;let c=Y.position.x/o,u=Y.position.z/o,d=t.velocity.x*c+t.velocity.z*u;t.velocity.x-=1.35*d*c,t.velocity.z-=1.35*d*u,t.velocity.y=Math.max(t.velocity.y,1.1)}(t.boardHit&&n-t.boardAt>650||l>4)&&Dt(t.overthrowRuns??4,null)}else{let c=o>=65?Math.max(.5,(o-65)*.58):0;V.modern&&o>=87&&Y.position.y>18.5&&(t.outOfStadium=!0),(o>=65&&(!V.modern||o<87)&&Y.position.y<=c+.3||o>=(V.modern?115:88)||l>(V.modern?10:7))&&Dt(6,null)}}else if(t.phase==="catch"){let o=Math.min((n-t.phaseAt)/420,1),l=t.fielder;br(l,1,o),V.modern?Y.position.copy(Jn(l,1)):Y.position.lerpVectors(t.catchFrom,Jn(l,1),o),o>=1&&(V.modern&&!t.fieldingDismissal?(t.caughtBall=!1,wc(t,l,n)):Dt(0,l===Ue?"CAUGHT & BOWLED":"CAUGHT"))}else if(t.phase==="pickup"&&V.modern)BS(t,s,n);else if(t.phase==="pickup"){let o=Math.min((n-t.phaseAt)/850,1),l=t.fielder;l.rotation.x=.68*Math.sin(o*Math.PI),l.userData.legs[0].rotation.x=.38*Math.sin(o*Math.PI),l.userData.legs[1].rotation.x=-.2*Math.sin(o*Math.PI),l.userData.knees.forEach(u=>u.rotation.x=.55*Math.sin(o*Math.PI)),br(l,1,o),l.userData.elbows[1].rotation.x=.3*Math.sin(o*Math.PI),l.userData.arms[1].rotation.x=.75*Math.sin(o*Math.PI),Cn(l,Y.position),l.updateMatrixWorld(!0);let c=Jn(l,1);Y.position.lerpVectors(t.pickFrom,c,Math.max(0,(o-.35)/.65)),Wi(t,s,n),o>=1&&wc(t,l,n)}else if(t.phase==="modern-return"){Wi(t,s,n);for(const o of t.returnThrow.update(Y.position,s))Dn.events.push({type:o.type,player:t.fielder}),o.type==="released"?(t.overthrowRuns=HM(t),Ve("THE THROW IS AWAY","WATCH THE CREASE"),cn("The fielder picks up and throws.")):o.type==="received"?Ve("CLEAN TAKE","THE FIELDER MOVES TO BREAK THE WICKET"):o.type==="wicket"?(t.throwEnd=o.end,kf(n),o.out?(t.dismissedPlayer=o.batterIndex===0?T.striker:T.partner,Dt(t.runs,"RUN OUT")):t.runActive?(t.phase="safe",t.runAllowed=!1,t.queuedRun=!1,Ve("BATTER SAFE","COMPLETE THE RUN")):Dt(t.runs,null)):o.type==="overthrow"?(t.phase="field",t.receiver=null,Dn.held=null,Dn.planAt=-1,Ve(o.bobble?"KEEPER BOBBLES THE TAKE":"THE THROW GETS AWAY","BALL STILL LIVE • OVERTHROW CHANCE")):o.type==="complete"&&Dt(t.runs,null)}else if(t.phase==="throw"){let o=Math.min((n-t.phaseAt)/1e3/t.throwDuration,1);br(t.fielder,1,Math.max(0,1-o*5)),t.fielder.userData.arms[1].rotation.x=tt.lerp(-1.25,1.1,Math.min(1,o*4)),t.fielder.userData.elbows[1].rotation.x=.5*(1-Math.min(1,o*4)),t.fielder.rotation.x=.15*Math.sin(Math.min(1,o*3)*Math.PI),Cn(t.fielder,Y.position);let l=QM(t.throwFrom,t.throwTarget,o,V.modern?t.throwDuration:null);Y.position.set(l.x,l.y,l.z),Wi(t,s,n),o>=1&&(t.phase="receive",t.phaseAt=n,t.receiveStart=Te.position.clone(),Ve(t.throwEnd==="bowler"?"BOWLER":"WICKETKEEPER","TAKES THE THROW"))}else if(t.phase==="receive"){let o=Math.min((n-t.phaseAt)/650,1);if(t.throwEnd==="bowler")Ue.rotation.x=-.15*o,Y.position.copy(Jn(Ue,1));else{let l=Te.position.z;Te.position.z=tt.lerp(t.receiveStart.z,12.5,o),pl(Te,Math.abs(Te.position.z-l),n),br(Te,1,o),Te.rotation.x=-.36-o*.18,Te.userData.arms.forEach(c=>c.rotation.x=-.9-o*.3),Y.position.copy(Ec())}if(Wi(t,s,n),o>=1){let l=FM(t);l==="run-out"?(t.dismissedPlayer=BM(De.position.z,Jt.position.z,t.throwEnd)==="striker"?T.striker:T.partner,Dt(t.runs,"RUN OUT")):l==="missed-active"?(t.phase="safe",t.runAllowed=!1,t.queuedRun=!1,Ve("BATTER SAFE","COMPLETE THE RUN")):Dt(t.runs,null)}}else t.phase==="safe"?(Wi(t,s,n),t.runActive||Dt(t.runs,null)):t.phase==="settle"&&(AS(n),V.modern&&pM(Gn,t,(n-t.phaseAt)/1e3),n-t.phaseAt>1600&&(oh(n),t.lab?t.phase="lab-result":t.dismissal&&su||(t.outcome===4||t.outcome===6)&&iu?zS():gu()));else{if(V.modern)jd(Te,Y.position,t.deliveryVelocity,s);else if(Cn(Te,Y.position),Te.userData.knees.forEach(o=>o.rotation.x=.45+.04*Math.sin(i*3)),i>1.8+t.travel*.55){let o=tt.clamp(t.lineX-Te.position.x,-2.4*s,2.4*s);Te.position.x+=o,pl(Te,Math.abs(o),n)}if(It()){const o=i>t.impact-.48,l=ne("#play-status"),c=o?"COMPUTER BOWLING • HIT NOW!":"COMPUTER BOWLING • GET READY";l.textContent!==c&&(l.textContent=c);const u=ne("#batting-cue");if(u){u.hidden&&(u.hidden=!1);const d=o?"HIT NOW":"GET READY";u.textContent!==d&&(u.textContent=d),u.classList.toggle("hit",o)}}if(V.modern)eh(Ue,i,s,t.bowlerArm),Cn(Ue,De.position);else{let o=Math.min(i/1.8,1);Ue.position.z=-20+o*9;let l=i<1.8?Math.sin(i*15):0;if(po(Ue,l*.7),V.modern){const d=Ue.userData.motor;d.speed=i<1.8?5:0,d.vx=0,d.vz=d.speed,d.phase+=d.speed*s/2.6*Math.PI*2,na(Ue,s)}Cn(Ue,De.position),Ue.rotation.x=i<1.8?.08+Math.abs(l)*.05:0,Ue.position.y=i<1.8?Math.abs(l)*.07:0;let c=Ue.userData.arms[t.bowlerArm],u=Ue.userData.arms[1-t.bowlerArm];u.rotation.x=-l*.5,c.rotation.x=i<1.05?l*.55:$M(i),c.rotation.z=0,Ue.userData.elbows[t.bowlerArm].rotation.x=i<1.05?V.modern?-.42:.42:0,Ue.userData.elbows[1-t.bowlerArm].rotation.x=V.modern?-.55:.55}if(i<1.8)Y.position.copy(Jn(Ue,t.bowlerArm));else if(V.modern){let o=s;if(!t.releasePoint){t.releasePoint=Jn(Ue,t.bowlerArm),t.fieldFault=sM({fielders:gn,keeper:Te,bowler:Ue,hand:t.battingHand,balls:T.balls[T.innings],overs:wn,slowOverRate:yu()}),t.fieldFault&&(t.noBall=!0),It()||Et(),Y.position.copy(t.releasePoint),o=Math.min(s,Math.max(0,i-1.8)),t.releaseGuardX=De.position.x;const u=oS({release:t.releasePoint,line:t.lineX,travel:t.travel,length:t.length,movement:t.variation.movement,spin:t.spin,turn:t.variation.turn,pitch:hi});t.deliveryVelocity=new P(u.velocity.x,u.velocity.y,u.velocity.z),t.deliveryForces=u,Wr(),mf(u.spin),ne("#delivery-speed").textContent=`${t.speed} km/h`,ne("#delivery-speed").hidden=!1}const l=Y.position.clone(),c=t.deliveryBounced;if(t.deliveryBounced=qi(Y.position,t.deliveryVelocity,o,t.deliveryBounced,t.deliveryForces),t.deliveryBounced&&Y.position.z<9.2&&t.deliveryVelocity.lengthSq()<1e-4&&(t.noBall=!0,t.deadReason="DELIVERY CAME TO REST",t.flight=!0,Dt(0,null)),!c&&t.deliveryBounced&&(t.pitchX=t.deliveryForces.pitchX??Y.position.x),Y.position.z>=9.2){const u=(9.2-l.z)/(Y.position.z-l.z||1);Y.position.lerpVectors(l,Y.position.clone(),tt.clamp(u,0,1)),t.impact=i}t.noBall&&!t.called&&!t.ending&&(t.called=!0,Gn.userData.arms[0].rotation.z=-Math.PI/2,Ve("NO BALL",t.fieldFault||"ONE EXTRA • BALL STILL LIVE"),cn("No ball. One extra."),Tc(t))}else{t.releasePoint||(t.releasePoint=Jn(Ue,t.bowlerArm),ne("#delivery-speed").textContent=`${t.speed} km/h`,ne("#delivery-speed").hidden=!1);let o=Math.min((i-1.8)/t.travel,1),l=Mc(t.length,o)+(t.releasePoint.y-2.7)*(1-o);Y.position.set(tt.lerp(t.releasePoint.x,t.lineX,o)+(t.spin&&o>.62?Math.sin((o-.62)/.38*Math.PI)*t.variation.movement*.35:Math.sin(Math.PI*o)*t.variation.movement*.5),l,tt.lerp(t.releasePoint.z,9.2,o)),t.noBall&&!t.called&&!t.ending&&(t.called=!0,Gn.userData.arms[0].rotation.z=-Math.PI/2,Ve("NO BALL",t.fieldFault||"ONE EXTRA • BALL STILL LIVE"),cn("No ball. One extra."))}(V.modern?!t.ending&&t.releasePoint&&Y.position.z>=9.199:i>=t.impact)&&(t.wide&&!V.modern&&(Gn.userData.arms[0].rotation.z=-Math.PI/2,Gn.userData.arms[1].rotation.z=Math.PI/2,Ve("WIDE BALL","ONE EXTRA • REBOWL")),FS(n))}if(V.modern&&t.flight&&i<2.5&&Ue!==t.fielder&&Ue.userData.fielding?.mode==="ready"&&eh(Ue,i,s,t.bowlerArm),V.modern&&t.releasePoint&&!t.noBall&&!t.freeHit&&!t.ending&&r!==null&&i>=r&&i-r<.75&&!t.runActive){const o=yr(De);o.push(ih.localToWorld(new P(0,-.93,0)),ih.localToWorld(new P(0,-.4,0))),yM(t.strikerWicketPoints,o)&&Dt(0,"HIT WICKET"),t.strikerWicketPoints=o}V.modern&&t.wide&&!t.wideCalled&&Y.position.z>=10.4&&(t.wideCalled=!0,Gn.userData.arms.forEach(o=>o.rotation.z=o===Gn.userData.arms[0]?-Math.PI/2:Math.PI/2),Ve("WIDE BALL","ONE EXTRA • BALL STILL LIVE"),cn("Wide ball. One extra."),Tc(t)),V.modern&&T.anim===t&&t.caughtBall&&Y.position.copy(Ct(t.fielder,1))}sh(),rh(),bc(),T.phase==="animating"&&oh(n),fl(),LS()}V.modern&&(bf(hi),cu(V.defaultNight));Nf();sa();requestAnimationFrame(ap);Et();const QS=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{JS as B,QS as m};
