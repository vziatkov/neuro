(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const za="181",Di={ROTATE:0,DOLLY:1,PAN:2},Pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Dc=0,lo=1,Lc=2,Rl=1,Ic=2,En=3,Xn=0,zt=1,An=2,pn=0,Li=1,is=2,co=3,ho=4,Uc=5,ni=100,Nc=101,Fc=102,Oc=103,Bc=104,zc=200,Vc=201,kc=202,Hc=203,Xr=204,qr=205,Gc=206,Wc=207,Xc=208,qc=209,Yc=210,jc=211,$c=212,Kc=213,Zc=214,Yr=0,jr=1,$r=2,Ui=3,Kr=4,Zr=5,Jr=6,Qr=7,Pl=0,Jc=1,Qc=2,Wn=0,Dl=1,Ll=2,Il=3,Ul=4,Nl=5,Fl=6,Ol=7,Bl=300,Ni=301,Fi=302,ea=303,ta=304,ar=306,na=1e3,wn=1001,ia=1002,Yt=1003,eh=1004,gs=1005,en=1006,fr=1007,ri=1008,Dn=1009,zl=1010,Vl=1011,ss=1012,Va=1013,oi=1014,Cn=1015,mn=1016,ka=1017,Ha=1018,rs=1020,kl=35902,Hl=35899,Gl=1021,Wl=1022,ln=1023,as=1026,os=1027,Xl=1028,Ga=1029,Wa=1030,Xa=1031,qa=1033,qs=33776,Ys=33777,js=33778,$s=33779,sa=35840,ra=35841,aa=35842,oa=35843,la=36196,ca=37492,ha=37496,ua=37808,da=37809,fa=37810,pa=37811,ma=37812,xa=37813,ga=37814,_a=37815,va=37816,Ma=37817,Sa=37818,ba=37819,ya=37820,Ea=37821,Ta=36492,Aa=36494,wa=36495,Ca=36283,Ra=36284,Pa=36285,Da=36286,th=3200,nh=3201,ih=0,sh=1,Hn="",Xt="srgb",Oi="srgb-linear",Qs="linear",Ke="srgb",di=7680,uo=519,rh=512,ah=513,oh=514,ql=515,lh=516,ch=517,hh=518,uh=519,fo=35044,po="300 es",dn=2e3,er=2001;function Yl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dh(){const i=tr("canvas");return i.style.display="block",i}const mo={};function xo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Le(...i){const e="THREE."+i.shift();console.warn(e,...i)}function mt(...i){const e="THREE."+i.shift();console.error(e,...i)}function ls(...i){const e=i.join(" ");e in mo||(mo[e]=!0,Le(...i))}function fh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let go=1234567;const es=Math.PI/180,cs=180/Math.PI;function ki(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function ze(i,e,t){return Math.max(e,Math.min(t,i))}function Ya(i,e){return(i%e+e)%e}function ph(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function mh(i,e,t){return i!==e?(t-i)/(e-i):0}function ts(i,e,t){return(1-t)*i+t*e}function xh(i,e,t,n){return ts(i,e,1-Math.exp(-t*n))}function gh(i,e=1){return e-Math.abs(Ya(i,e*2)-e)}function _h(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function vh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Mh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Sh(i,e){return i+Math.random()*(e-i)}function bh(i){return i*(.5-Math.random())}function yh(i){i!==void 0&&(go=i);let e=go+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Eh(i){return i*es}function Th(i){return i*cs}function Ah(i){return(i&i-1)===0&&i!==0}function wh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ch(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Rh(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),x=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*x,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*x,o*l);break;case"ZYZ":i.set(c*x,c*f,o*h,o*l);break;default:Le("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ri(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ie={DEG2RAD:es,RAD2DEG:cs,generateUUID:ki,clamp:ze,euclideanModulo:Ya,mapLinear:ph,inverseLerp:mh,lerp:ts,damp:xh,pingpong:gh,smoothstep:_h,smootherstep:vh,randInt:Mh,randFloat:Sh,randFloatSpread:bh,seededRandom:yh,degToRad:Eh,radToDeg:Th,isPowerOfTwo:Ah,ceilPowerOfTwo:wh,floorPowerOfTwo:Ch,setQuaternionFromProperEuler:Rh,normalize:Dt,denormalize:Ri};class Te{constructor(e=0,t=0){Te.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class li{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],x=r[a+2],g=r[a+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o>=1){e[t+0]=d,e[t+1]=f,e[t+2]=x,e[t+3]=g;return}if(u!==g||c!==d||l!==f||h!==x){let m=c*d+l*f+h*x+u*g;m<0&&(d=-d,f=-f,x=-x,g=-g,m=-m);let p=1-o;if(m<.9995){const E=Math.acos(m),b=Math.sin(E);p=Math.sin(p*E)/b,o=Math.sin(o*E)/b,c=c*p+d*o,l=l*p+f*o,h=h*p+x*o,u=u*p+g*o}else{c=c*p+d*o,l=l*p+f*o,h=h*p+x*o,u=u*p+g*o;const E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],x=r[a+3];return e[t]=o*x+h*u+c*f-l*d,e[t+1]=c*x+h*d+l*u-o*f,e[t+2]=l*x+h*f+o*d-c*u,e[t+3]=h*x-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*x,this._y=l*f*u-d*h*x,this._z=l*h*x+d*f*u,this._w=l*h*u-d*f*x;break;case"YXZ":this._x=d*h*u+l*f*x,this._y=l*f*u-d*h*x,this._z=l*h*x-d*f*u,this._w=l*h*u+d*f*x;break;case"ZXY":this._x=d*h*u-l*f*x,this._y=l*f*u+d*h*x,this._z=l*h*x+d*f*u,this._w=l*h*u-d*f*x;break;case"ZYX":this._x=d*h*u-l*f*x,this._y=l*f*u+d*h*x,this._z=l*h*x-d*f*u,this._w=l*h*u+d*f*x;break;case"YZX":this._x=d*h*u+l*f*x,this._y=l*f*u+d*h*x,this._z=l*h*x-d*f*u,this._w=l*h*u-d*f*x;break;case"XZY":this._x=d*h*u-l*f*x,this._y=l*f*u-d*h*x,this._z=l*h*x+d*f*u,this._w=l*h*u+d*f*x;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_o.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_o.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return pr.copy(this).projectOnVector(e),this.sub(pr)}reflect(e){return this.sub(pr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pr=new D,_o=new li;class Oe{constructor(e,t,n,s,r,a,o,c,l){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],x=n[8],g=s[0],m=s[3],p=s[6],E=s[1],b=s[4],A=s[7],C=s[2],y=s[5],w=s[8];return r[0]=a*g+o*E+c*C,r[3]=a*m+o*b+c*y,r[6]=a*p+o*A+c*w,r[1]=l*g+h*E+u*C,r[4]=l*m+h*b+u*y,r[7]=l*p+h*A+u*w,r[2]=d*g+f*E+x*C,r[5]=d*m+f*b+x*y,r[8]=d*p+f*A+x*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,x=t*u+n*d+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/x;return e[0]=u*g,e[1]=(s*l-h*n)*g,e[2]=(o*n-s*a)*g,e[3]=d*g,e[4]=(h*t-s*c)*g,e[5]=(s*r-o*t)*g,e[6]=f*g,e[7]=(n*c-l*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(mr.makeScale(e,t)),this}rotate(e){return this.premultiply(mr.makeRotation(-e)),this}translate(e,t){return this.premultiply(mr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const mr=new Oe,vo=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mo=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ph(){const i={enabled:!0,workingColorSpace:Oi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ke&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ke&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Qs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ls("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ls("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Oi]:{primaries:e,whitePoint:n,transfer:Qs,toXYZ:vo,fromXYZ:Mo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:n,transfer:Ke,toXYZ:vo,fromXYZ:Mo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),i}const Ye=Ph();function Pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ii(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let fi;class Dh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fi===void 0&&(fi=tr("canvas")),fi.width=e.width,fi.height=e.height;const s=fi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=fi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=tr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Pn(t[n]/255)*255):t[n]=Pn(t[n]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Lh=0;class ja{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xr(s[a].image)):r.push(xr(s[a]))}else r=xr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function xr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Dh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let Ih=0;const gr=new D;class Ut extends ci{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=wn,s=wn,r=en,a=ri,o=ln,c=Dn,l=Ut.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=ki(),this.name="",this.source=new ja(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(gr).x}get height(){return this.source.getSize(gr).y}get depth(){return this.source.getSize(gr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case na:e.x=e.x-Math.floor(e.x);break;case wn:e.x=e.x<0?0:1;break;case ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case na:e.y=e.y-Math.floor(e.y);break;case wn:e.y=e.y<0?0:1;break;case ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Bl;Ut.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,n=0,s=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],x=c[9],g=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(x+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,A=(f+1)/2,C=(p+1)/2,y=(h+d)/4,w=(u+g)/4,U=(x+m)/4;return b>A&&b>C?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=y/n,r=w/n):A>C?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=y/s,r=U/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=w/r,s=U/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-x)*(m-x)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(m-x)/E,this.y=(u-g)/E,this.z=(d-h)/E,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uh extends ci{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Ut(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ja(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Uh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class jl extends Ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Nh extends Ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class us{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),_s.copy(n.boundingBox)),_s.applyMatrix4(e.matrixWorld),this.union(_s)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xi),vs.subVectors(this.max,Xi),pi.subVectors(e.a,Xi),mi.subVectors(e.b,Xi),xi.subVectors(e.c,Xi),In.subVectors(mi,pi),Un.subVectors(xi,mi),$n.subVectors(pi,xi);let t=[0,-In.z,In.y,0,-Un.z,Un.y,0,-$n.z,$n.y,In.z,0,-In.x,Un.z,0,-Un.x,$n.z,0,-$n.x,-In.y,In.x,0,-Un.y,Un.x,0,-$n.y,$n.x,0];return!_r(t,pi,mi,xi,vs)||(t=[1,0,0,0,1,0,0,0,1],!_r(t,pi,mi,xi,vs))?!1:(Ms.crossVectors(In,Un),t=[Ms.x,Ms.y,Ms.z],_r(t,pi,mi,xi,vs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _n=[new D,new D,new D,new D,new D,new D,new D,new D],nn=new D,_s=new us,pi=new D,mi=new D,xi=new D,In=new D,Un=new D,$n=new D,Xi=new D,vs=new D,Ms=new D,Kn=new D;function _r(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Kn.fromArray(i,r);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),c=e.dot(Kn),l=t.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Fh=new us,qi=new D,vr=new D;class ds{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Fh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qi.subVectors(e,this.center);const t=qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(qi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qi.copy(e.center).add(vr)),this.expandByPoint(qi.copy(e.center).sub(vr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const vn=new D,Mr=new D,Ss=new D,Nn=new D,Sr=new D,bs=new D,br=new D;class fs{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Mr.copy(e).add(t).multiplyScalar(.5),Ss.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(Mr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ss),o=Nn.dot(this.direction),c=-Nn.dot(Ss),l=Nn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,x;if(h>0)if(u=a*c-o,d=a*o-c,x=r*h,u>=0)if(d>=-x)if(d<=x){const g=1/h;u*=g,d*=g,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-x?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=x?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Mr).addScaledVector(Ss,d),f}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,s,r){Sr.subVectors(t,e),bs.subVectors(n,e),br.crossVectors(Sr,bs);let a=this.direction.dot(br),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Nn.subVectors(this.origin,e);const c=o*this.direction.dot(bs.crossVectors(Nn,bs));if(c<0)return null;const l=o*this.direction.dot(Sr.cross(Nn));if(l<0||c+l>a)return null;const h=-o*Nn.dot(br);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,n,s,r,a,o,c,l,h,u,d,f,x,g,m){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,d,f,x,g,m)}set(e,t,n,s,r,a,o,c,l,h,u,d,f,x,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=x,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/gi.setFromMatrixColumn(e,0).length(),r=1/gi.setFromMatrixColumn(e,1).length(),a=1/gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,x=o*h,g=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+x*l,t[5]=d-g*l,t[9]=-o*c,t[2]=g-d*l,t[6]=x+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,x=l*h,g=l*u;t[0]=d+g*o,t[4]=x*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-x,t[6]=g+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,x=l*h,g=l*u;t[0]=d-g*o,t[4]=-a*u,t[8]=x+f*o,t[1]=f+x*o,t[5]=a*h,t[9]=g-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,x=o*h,g=o*u;t[0]=c*h,t[4]=x*l-f,t[8]=d*l+g,t[1]=c*u,t[5]=g*l+d,t[9]=f*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,x=o*c,g=o*l;t[0]=c*h,t[4]=g-d*u,t[8]=x*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+x,t[10]=d-g*u}else if(e.order==="XZY"){const d=a*c,f=a*l,x=o*c,g=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+g,t[5]=a*h,t[9]=f*u-x,t[2]=x*u-f,t[6]=o*h,t[10]=g*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Oh,e,Bh)}lookAt(e,t,n){const s=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Fn.crossVectors(n,Ht),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Fn.crossVectors(n,Ht)),Fn.normalize(),ys.crossVectors(Ht,Fn),s[0]=Fn.x,s[4]=ys.x,s[8]=Ht.x,s[1]=Fn.y,s[5]=ys.y,s[9]=Ht.y,s[2]=Fn.z,s[6]=ys.z,s[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],x=n[2],g=n[6],m=n[10],p=n[14],E=n[3],b=n[7],A=n[11],C=n[15],y=s[0],w=s[4],U=s[8],S=s[12],M=s[1],L=s[5],O=s[9],V=s[13],W=s[2],H=s[6],Y=s[10],Z=s[14],G=s[3],ne=s[7],re=s[11],be=s[15];return r[0]=a*y+o*M+c*W+l*G,r[4]=a*w+o*L+c*H+l*ne,r[8]=a*U+o*O+c*Y+l*re,r[12]=a*S+o*V+c*Z+l*be,r[1]=h*y+u*M+d*W+f*G,r[5]=h*w+u*L+d*H+f*ne,r[9]=h*U+u*O+d*Y+f*re,r[13]=h*S+u*V+d*Z+f*be,r[2]=x*y+g*M+m*W+p*G,r[6]=x*w+g*L+m*H+p*ne,r[10]=x*U+g*O+m*Y+p*re,r[14]=x*S+g*V+m*Z+p*be,r[3]=E*y+b*M+A*W+C*G,r[7]=E*w+b*L+A*H+C*ne,r[11]=E*U+b*O+A*Y+C*re,r[15]=E*S+b*V+A*Z+C*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],x=e[3],g=e[7],m=e[11],p=e[15];return x*(+r*c*u-s*l*u-r*o*d+n*l*d+s*o*f-n*c*f)+g*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*h-r*c*h)+m*(+t*l*u-t*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+p*(-s*o*h-t*c*u+t*o*d+s*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],x=e[12],g=e[13],m=e[14],p=e[15],E=u*m*l-g*d*l+g*c*f-o*m*f-u*c*p+o*d*p,b=x*d*l-h*m*l-x*c*f+a*m*f+h*c*p-a*d*p,A=h*g*l-x*u*l+x*o*f-a*g*f-h*o*p+a*u*p,C=x*u*c-h*g*c-x*o*d+a*g*d+h*o*m-a*u*m,y=t*E+n*b+s*A+r*C;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/y;return e[0]=E*w,e[1]=(g*d*r-u*m*r-g*s*f+n*m*f+u*s*p-n*d*p)*w,e[2]=(o*m*r-g*c*r+g*s*l-n*m*l-o*s*p+n*c*p)*w,e[3]=(u*c*r-o*d*r-u*s*l+n*d*l+o*s*f-n*c*f)*w,e[4]=b*w,e[5]=(h*m*r-x*d*r+x*s*f-t*m*f-h*s*p+t*d*p)*w,e[6]=(x*c*r-a*m*r-x*s*l+t*m*l+a*s*p-t*c*p)*w,e[7]=(a*d*r-h*c*r+h*s*l-t*d*l-a*s*f+t*c*f)*w,e[8]=A*w,e[9]=(x*u*r-h*g*r-x*n*f+t*g*f+h*n*p-t*u*p)*w,e[10]=(a*g*r-x*o*r+x*n*l-t*g*l-a*n*p+t*o*p)*w,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*f-t*o*f)*w,e[12]=C*w,e[13]=(h*g*s-x*u*s+x*n*d-t*g*d-h*n*m+t*u*m)*w,e[14]=(x*o*s-a*g*s-x*n*c+t*g*c+a*n*m-t*o*m)*w,e[15]=(a*u*s-h*o*s+h*n*c-t*u*c-a*n*d+t*o*d)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,x=r*u,g=a*h,m=a*u,p=o*u,E=c*l,b=c*h,A=c*u,C=n.x,y=n.y,w=n.z;return s[0]=(1-(g+p))*C,s[1]=(f+A)*C,s[2]=(x-b)*C,s[3]=0,s[4]=(f-A)*y,s[5]=(1-(d+p))*y,s[6]=(m+E)*y,s[7]=0,s[8]=(x+b)*w,s[9]=(m-E)*w,s[10]=(1-(d+g))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=gi.set(s[0],s[1],s[2]).length();const a=gi.set(s[4],s[5],s[6]).length(),o=gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const l=1/r,h=1/a,u=1/o;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,t.setFromRotationMatrix(sn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=dn,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let x,g;if(c)x=r/(a-r),g=a*r/(a-r);else if(o===dn)x=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===er)x=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=dn,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let x,g;if(c)x=1/(a-r),g=a/(a-r);else if(o===dn)x=-2/(a-r),g=-(a+r)/(a-r);else if(o===er)x=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const gi=new D,sn=new xt,Oh=new D(0,0,0),Bh=new D(1,1,1),Fn=new D,ys=new D,Ht=new D,So=new xt,bo=new li;class gn{constructor(e=0,t=0,n=0,s=gn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return So.makeRotationFromQuaternion(e),this.setFromRotationMatrix(So,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bo.setFromEuler(this),this.setFromQuaternion(bo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gn.DEFAULT_ORDER="XYZ";class $a{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zh=0;const yo=new D,_i=new li,Mn=new xt,Es=new D,Yi=new D,Vh=new D,kh=new li,Eo=new D(1,0,0),To=new D(0,1,0),Ao=new D(0,0,1),wo={type:"added"},Hh={type:"removed"},vi={type:"childadded",child:null},yr={type:"childremoved",child:null};class Nt extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new D,t=new gn,n=new li,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xt},normalMatrix:{value:new Oe}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.multiply(_i),this}rotateOnWorldAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.premultiply(_i),this}rotateX(e){return this.rotateOnAxis(Eo,e)}rotateY(e){return this.rotateOnAxis(To,e)}rotateZ(e){return this.rotateOnAxis(Ao,e)}translateOnAxis(e,t){return yo.copy(e).applyQuaternion(this.quaternion),this.position.add(yo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Eo,e)}translateY(e){return this.translateOnAxis(To,e)}translateZ(e){return this.translateOnAxis(Ao,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Es.copy(e):Es.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(Yi,Es,this.up):Mn.lookAt(Es,Yi,this.up),this.quaternion.setFromRotationMatrix(Mn),s&&(Mn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(Mn),this.quaternion.premultiply(_i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wo),vi.child=e,this.dispatchEvent(vi),vi.child=null):mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hh),yr.child=e,this.dispatchEvent(yr),yr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wo),vi.child=e,this.dispatchEvent(vi),vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,Vh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,kh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Nt.DEFAULT_UP=new D(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new D,Sn=new D,Er=new D,bn=new D,Mi=new D,Si=new D,Co=new D,Tr=new D,Ar=new D,wr=new D,Cr=new _t,Rr=new _t,Pr=new _t;class on{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),Sn.subVectors(n,t),Er.subVectors(e,t);const a=rn.dot(rn),o=rn.dot(Sn),c=rn.dot(Er),l=Sn.dot(Sn),h=Sn.dot(Er),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,x=(a*h-o*c)*d;return r.set(1-f-x,x,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bn.x),c.addScaledVector(a,bn.y),c.addScaledVector(o,bn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Cr.setScalar(0),Rr.setScalar(0),Pr.setScalar(0),Cr.fromBufferAttribute(e,t),Rr.fromBufferAttribute(e,n),Pr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Cr,r.x),a.addScaledVector(Rr,r.y),a.addScaledVector(Pr,r.z),a}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),Sn.subVectors(e,t),rn.cross(Sn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),rn.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Mi.subVectors(s,n),Si.subVectors(r,n),Tr.subVectors(e,n);const c=Mi.dot(Tr),l=Si.dot(Tr);if(c<=0&&l<=0)return t.copy(n);Ar.subVectors(e,s);const h=Mi.dot(Ar),u=Si.dot(Ar);if(h>=0&&u<=h)return t.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Mi,a);wr.subVectors(e,r);const f=Mi.dot(wr),x=Si.dot(wr);if(x>=0&&f<=x)return t.copy(r);const g=f*l-c*x;if(g<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(Si,o);const m=h*x-f*u;if(m<=0&&u-h>=0&&f-x>=0)return Co.subVectors(r,s),o=(u-h)/(u-h+(f-x)),t.copy(s).addScaledVector(Co,o);const p=1/(m+g+d);return a=g*p,o=d*p,t.copy(n).addScaledVector(Mi,a).addScaledVector(Si,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Dr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ye.workingColorSpace){if(e=Ya(e,1),t=ze(t,0,1),n=ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Dr(a,r,e+1/3),this.g=Dr(a,r,e),this.b=Dr(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=Xt){function n(r){r!==void 0&&parseFloat(r)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const n=$l[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pn(e.r),this.g=Pn(e.g),this.b=Pn(e.b),this}copyLinearToSRGB(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return Ye.workingToColorSpace(Ct.copy(this),e),Math.round(ze(Ct.r*255,0,255))*65536+Math.round(ze(Ct.g*255,0,255))*256+Math.round(ze(Ct.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Ct.copy(this),t);const n=Ct.r,s=Ct.g,r=Ct.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Xt){Ye.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,s=Ct.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(Ts);const n=ts(On.h,Ts.h,t),s=ts(On.s,Ts.s,t),r=ts(On.l,Ts.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new xe;xe.NAMES=$l;let Gh=0;class Hi extends ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=Li,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xr,this.blendDst=qr,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=Ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Li&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xr&&(n.blendSrc=this.blendSrc),this.blendDst!==qr&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ui&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ka extends Hi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=Pl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new D,As=new Te;let Wh=0;class xn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fo,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)As.fromBufferAttribute(this,t),As.applyMatrix3(e),this.setXY(t,As.x,As.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ri(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ri(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ri(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ri(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),s=Dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),s=Dt(s,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fo&&(e.usage=this.usage),e}}class Kl extends xn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zl extends xn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dt extends xn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Xh=0;const Kt=new xt,Lr=new Nt,bi=new D,Gt=new us,ji=new us,Et=new D;class jt extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yl(e)?Zl:Kl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Oe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,n){return Kt.makeTranslation(e,t,n),this.applyMatrix4(Kt),this}scale(e,t,n){return Kt.makeScale(e,t,n),this.applyMatrix4(Kt),this}lookAt(e){return Lr.lookAt(e),Lr.updateMatrix(),this.applyMatrix4(Lr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new dt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new us);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Gt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ji.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Gt.min,ji.min),Gt.expandByPoint(Et),Et.addVectors(Gt.max,ji.max),Gt.expandByPoint(Et)):(Gt.expandByPoint(ji.min),Gt.expandByPoint(ji.max))}Gt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Et.fromBufferAttribute(o,l),c&&(bi.fromBufferAttribute(e,l),Et.add(bi)),s=Math.max(s,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let U=0;U<n.count;U++)o[U]=new D,c[U]=new D;const l=new D,h=new D,u=new D,d=new Te,f=new Te,x=new Te,g=new D,m=new D;function p(U,S,M){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,S),x.fromBufferAttribute(r,M),h.sub(l),u.sub(l),f.sub(d),x.sub(d);const L=1/(f.x*x.y-x.x*f.y);isFinite(L)&&(g.copy(h).multiplyScalar(x.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-x.x).multiplyScalar(L),o[U].add(g),o[S].add(g),o[M].add(g),c[U].add(m),c[S].add(m),c[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let U=0,S=E.length;U<S;++U){const M=E[U],L=M.start,O=M.count;for(let V=L,W=L+O;V<W;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const b=new D,A=new D,C=new D,y=new D;function w(U){C.fromBufferAttribute(s,U),y.copy(C);const S=o[U];b.copy(S),b.sub(C.multiplyScalar(C.dot(S))).normalize(),A.crossVectors(y,S);const L=A.dot(c[U])<0?-1:1;a.setXYZW(U,b.x,b.y,b.z,L)}for(let U=0,S=E.length;U<S;++U){const M=E[U],L=M.start,O=M.count;for(let V=L,W=L+O;V<W;V+=3)w(e.getX(V+0)),w(e.getX(V+1)),w(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,h=new D,u=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const x=e.getX(d+0),g=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,x=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?f=c[g]*o.data.stride+o.offset:f=c[g]*h;for(let p=0;p<h;p++)d[x++]=l[f++]}return new xn(d,h,u)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ro=new xt,Zn=new fs,ws=new ds,Po=new D,Cs=new D,Rs=new D,Ps=new D,Ir=new D,Ds=new D,Do=new D,Ls=new D;class Ln extends Nt{constructor(e=new jt,t=new Ka){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ds.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Ir.fromBufferAttribute(u,e),a?Ds.addScaledVector(Ir,h):Ds.addScaledVector(Ir.sub(t),h))}t.add(Ds)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere),ws.applyMatrix4(r),Zn.copy(e.ray).recast(e.near),!(ws.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(ws,Po)===null||Zn.origin.distanceToSquared(Po)>(e.far-e.near)**2))&&(Ro.copy(r).invert(),Zn.copy(e.ray).applyMatrix4(Ro),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,g=d.length;x<g;x++){const m=d[x],p=a[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let A=E,C=b;A<C;A+=3){const y=o.getX(A),w=o.getX(A+1),U=o.getX(A+2);s=Is(this,p,e,n,l,h,u,y,w,U),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=x,p=g;m<p;m+=3){const E=o.getX(m),b=o.getX(m+1),A=o.getX(m+2);s=Is(this,a,e,n,l,h,u,E,b,A),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,g=d.length;x<g;x++){const m=d[x],p=a[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let A=E,C=b;A<C;A+=3){const y=A,w=A+1,U=A+2;s=Is(this,p,e,n,l,h,u,y,w,U),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let m=x,p=g;m<p;m+=3){const E=m,b=m+1,A=m+2;s=Is(this,a,e,n,l,h,u,E,b,A),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function qh(i,e,t,n,s,r,a,o){let c;if(e.side===zt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Xn,o),c===null)return null;Ls.copy(o),Ls.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ls);return l<t.near||l>t.far?null:{distance:l,point:Ls.clone(),object:i}}function Is(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Cs),i.getVertexPosition(c,Rs),i.getVertexPosition(l,Ps);const h=qh(i,e,t,n,Cs,Rs,Ps,Do);if(h){const u=new D;on.getBarycoord(Do,Cs,Rs,Ps,u),s&&(h.uv=on.getInterpolatedAttribute(s,o,c,l,u,new Te)),r&&(h.uv1=on.getInterpolatedAttribute(r,o,c,l,u,new Te)),a&&(h.normal=on.getInterpolatedAttribute(a,o,c,l,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new D,materialIndex:0};on.getNormal(Cs,Rs,Ps,d.normal),h.face=d,h.barycoord=u}return h}class ps extends jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2));function x(g,m,p,E,b,A,C,y,w,U,S){const M=A/w,L=C/U,O=A/2,V=C/2,W=y/2,H=w+1,Y=U+1;let Z=0,G=0;const ne=new D;for(let re=0;re<Y;re++){const be=re*L-V;for(let Xe=0;Xe<H;Xe++){const Ze=Xe*M-O;ne[g]=Ze*E,ne[m]=be*b,ne[p]=W,l.push(ne.x,ne.y,ne.z),ne[g]=0,ne[m]=0,ne[p]=y>0?1:-1,h.push(ne.x,ne.y,ne.z),u.push(Xe/w),u.push(1-re/U),Z+=1}}for(let re=0;re<U;re++)for(let be=0;be<w;be++){const Xe=d+be+H*re,Ze=d+be+H*(re+1),st=d+(be+1)+H*(re+1),rt=d+(be+1)+H*re;c.push(Xe,Ze,rt),c.push(Ze,st,rt),G+=6}o.addGroup(f,G,S),f+=G,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Lt(i){const e={};for(let t=0;t<i.length;t++){const n=Bi(i[t]);for(const s in n)e[s]=n[s]}return e}function Yh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Jl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const qn={clone:Bi,merge:Lt};var jh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$h=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class St extends Hi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jh,this.fragmentShader=$h,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=Yh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ql extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new D,Lo=new Te,Io=new Te;class Qt extends Ql{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,Lo,Io),t.subVectors(Io,Lo)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(es*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const yi=-90,Ei=1;class Kh extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Qt(yi,Ei,e,t);s.layers=this.layers,this.add(s);const r=new Qt(yi,Ei,e,t);r.layers=this.layers,this.add(r);const a=new Qt(yi,Ei,e,t);a.layers=this.layers,this.add(a);const o=new Qt(yi,Ei,e,t);o.layers=this.layers,this.add(o);const c=new Qt(yi,Ei,e,t);c.layers=this.layers,this.add(c);const l=new Qt(yi,Ei,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===er)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class ec extends Ut{constructor(e=[],t=Ni,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zh extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ec(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ps(5,5,5),r=new St({name:"CubemapFromEquirect",uniforms:Bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:pn});r.uniforms.tEquirect.value=t;const a=new Ln(s,r),o=t.minFilter;return t.minFilter===ri&&(t.minFilter=en),new Kh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class Us extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jh={type:"move"};class Ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,x=.005;l.inputState.pinching&&d>f+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jh)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Us;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Za{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(e),this.density=t}clone(){return new Za(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Qh extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class eu extends Ut{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Yt,h=Yt,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nr=new D,tu=new D,nu=new Oe;class Tn{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Nr.subVectors(n,t).cross(tu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Nr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||nu.getNormalMatrix(e),s=this.coplanarPoint(Nr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new ds,iu=new Te(.5,.5),Ns=new D;class tc{constructor(e=new Tn,t=new Tn,n=new Tn,s=new Tn,r=new Tn,a=new Tn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],x=r[8],g=r[9],m=r[10],p=r[11],E=r[12],b=r[13],A=r[14],C=r[15];if(s[0].setComponents(l-a,f-h,p-x,C-E).normalize(),s[1].setComponents(l+a,f+h,p+x,C+E).normalize(),s[2].setComponents(l+o,f+u,p+g,C+b).normalize(),s[3].setComponents(l-o,f-u,p-g,C-b).normalize(),n)s[4].setComponents(c,d,m,A).normalize(),s[5].setComponents(l-c,f-d,p-m,C-A).normalize();else if(s[4].setComponents(l-c,f-d,p-m,C-A).normalize(),t===dn)s[5].setComponents(l+c,f+d,p+m,C+A).normalize();else if(t===er)s[5].setComponents(c,d,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(e){Jn.center.set(0,0,0);const t=iu.distanceTo(e.center);return Jn.radius=.7071067811865476+t,Jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ns.x=s.normal.x>0?e.max.x:e.min.x,Ns.y=s.normal.y>0?e.max.y:e.min.y,Ns.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class su extends Hi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const nr=new D,ir=new D,Uo=new xt,$i=new fs,Fs=new ds,Fr=new D,No=new D;class ru extends Nt{constructor(e=new jt,t=new su){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)nr.fromBufferAttribute(t,s-1),ir.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=nr.distanceTo(ir);e.setAttribute("lineDistance",new dt(n,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(s),Fs.radius+=r,e.ray.intersectsSphere(Fs)===!1)return;Uo.copy(s).invert(),$i.copy(e.ray).applyMatrix4(Uo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let g=f,m=x-1;g<m;g+=l){const p=h.getX(g),E=h.getX(g+1),b=Os(this,e,$i,c,p,E,g);b&&t.push(b)}if(this.isLineLoop){const g=h.getX(x-1),m=h.getX(f),p=Os(this,e,$i,c,g,m,x-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let g=f,m=x-1;g<m;g+=l){const p=Os(this,e,$i,c,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Os(this,e,$i,c,x-1,f,x-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Os(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(nr.fromBufferAttribute(o,s),ir.fromBufferAttribute(o,r),t.distanceSqToSegment(nr,ir,Fr,No)>n)return;Fr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Fr);if(!(l<e.near||l>e.far))return{distance:l,point:No.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Fo=new D,Oo=new D;class au extends ru{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Fo.fromBufferAttribute(t,s),Oo.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Fo.distanceTo(Oo);e.setAttribute("lineDistance",new dt(n,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ou extends Hi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bo=new xt,La=new fs,Bs=new ds,zs=new D;class lu extends Nt{constructor(e=new jt,t=new ou){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere),Bs.applyMatrix4(s),Bs.radius+=r,e.ray.intersectsSphere(Bs)===!1)return;Bo.copy(s).invert(),La.copy(e.ray).applyMatrix4(Bo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let x=d,g=f;x<g;x++){const m=l.getX(x);zs.fromBufferAttribute(u,m),zo(zs,m,c,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let x=d,g=f;x<g;x++)zs.fromBufferAttribute(u,x),zo(zs,x,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function zo(i,e,t,n,s,r,a){const o=La.distanceSqToPoint(i);if(o<t){const c=new D;La.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class nc extends Ut{constructor(e,t,n=oi,s,r,a,o=Yt,c=Yt,l,h=as,u=1){if(h!==as&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ja(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ic extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class or extends jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,d=t/c,f=[],x=[],g=[],m=[];for(let p=0;p<h;p++){const E=p*d-a;for(let b=0;b<l;b++){const A=b*u-r;x.push(A,-E,0),g.push(0,0,1),m.push(b/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<o;E++){const b=E+l*p,A=E+l*(p+1),C=E+1+l*(p+1),y=E+1+l*p;f.push(b,A,y),f.push(A,C,y)}this.setIndex(f),this.setAttribute("position",new dt(x,3)),this.setAttribute("normal",new dt(g,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.width,e.height,e.widthSegments,e.heightSegments)}}class cu extends St{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hu extends Hi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uu extends Hi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class sc extends Ql{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class du extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ja{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Vo=new xt;class fu{constructor(e,t,n=0,s=1/0){this.ray=new fs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new $a,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):mt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Vo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vo),this}intersectObject(e,t=!0,n=[]){return Ia(e,this,n,t),n.sort(ko),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Ia(e[s],this,n,t);return n.sort(ko),n}}function ko(i,e){return i.distance-e.distance}function Ia(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Ia(r[a],e,t,!0)}}class Ho{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class pu extends ci{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Le("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Go(i,e,t,n){const s=mu(n);switch(t){case Gl:return i*e;case Xl:return i*e/s.components*s.byteLength;case Ga:return i*e/s.components*s.byteLength;case Wa:return i*e*2/s.components*s.byteLength;case Xa:return i*e*2/s.components*s.byteLength;case Wl:return i*e*3/s.components*s.byteLength;case ln:return i*e*4/s.components*s.byteLength;case qa:return i*e*4/s.components*s.byteLength;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case js:case $s:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ra:case oa:return Math.max(i,16)*Math.max(e,8)/4;case sa:case aa:return Math.max(i,8)*Math.max(e,8)/2;case la:case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case da:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case fa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case pa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case xa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ga:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case _a:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case va:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ba:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ea:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ta:case Aa:case wa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ca:case Ra:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Pa:case Da:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mu(i){switch(i){case Dn:case zl:return{byteLength:1,components:1};case ss:case Vl:case mn:return{byteLength:2,components:1};case ka:case Ha:return{byteLength:2,components:4};case oi:case Va:case Cn:return{byteLength:4,components:1};case kl:case Hl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:za}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=za);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rc(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function xu(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,x)=>f.start-x.start);let d=0;for(let f=1;f<u.length;f++){const x=u[d],g=u[f];g.start<=x.start+x.count+1?x.count=Math.max(x.count,g.start+g.count-x.start):(++d,u[d]=g)}u.length=d+1;for(let f=0,x=u.length;f<x;f++){const g=u[f];i.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var gu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_u=`#ifdef USE_ALPHAHASH
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
#endif`,vu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Su=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yu=`#ifdef USE_AOMAP
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
#endif`,Eu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tu=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pu=`#ifdef USE_IRIDESCENCE
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
#endif`,Du=`#ifdef USE_BUMPMAP
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
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Vu=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
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
} // validated`,ku=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hu=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",ju=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$u=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
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
#endif`,Ju=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ed=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sd=`#ifdef USE_GRADIENTMAP
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
}`,rd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ad=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ld=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,cd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,md=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
		float roughness = material.clearcoatRoughness;
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
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
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
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xd=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_d=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Md=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ed=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Td=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ad=`#if defined( USE_POINTS_UV )
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
#endif`,wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`#ifdef USE_MORPHTARGETS
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
#endif`,Id=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ud=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zd=`#ifdef USE_NORMALMAP
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
#endif`,Vd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$d=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,ef=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,tf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,nf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sf=`#ifdef USE_SKINNING
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
#endif`,rf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,af=`#ifdef USE_SKINNING
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
#endif`,of=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,uf=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,df=`#ifdef USE_TRANSMISSION
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
#endif`,ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_f=`uniform sampler2D t2D;
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
}`,vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yf=`#include <common>
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
}`,Ef=`#if DEPTH_PACKING == 3200
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
}`,Tf=`#define DISTANCE
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
}`,Af=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`uniform float scale;
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
}`,Pf=`uniform vec3 diffuse;
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
}`,Df=`#include <common>
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
}`,Lf=`uniform vec3 diffuse;
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
}`,If=`#define LAMBERT
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
}`,Uf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Nf=`#define MATCAP
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
}`,Ff=`#define MATCAP
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
}`,Of=`#define NORMAL
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
}`,Bf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zf=`#define PHONG
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
}`,Vf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
}`,kf=`#define STANDARD
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
}`,Hf=`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
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
#include <packing>
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
#include <cube_uv_reflection_fragment>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,Gf=`#define TOON
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
}`,Wf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Xf=`uniform float size;
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
}`,qf=`uniform vec3 diffuse;
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
}`,Yf=`#include <common>
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
}`,jf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,$f=`uniform float rotation;
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
}`,Kf=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:gu,alphahash_pars_fragment:_u,alphamap_fragment:vu,alphamap_pars_fragment:Mu,alphatest_fragment:Su,alphatest_pars_fragment:bu,aomap_fragment:yu,aomap_pars_fragment:Eu,batching_pars_vertex:Tu,batching_vertex:Au,begin_vertex:wu,beginnormal_vertex:Cu,bsdfs:Ru,iridescence_fragment:Pu,bumpmap_pars_fragment:Du,clipping_planes_fragment:Lu,clipping_planes_pars_fragment:Iu,clipping_planes_pars_vertex:Uu,clipping_planes_vertex:Nu,color_fragment:Fu,color_pars_fragment:Ou,color_pars_vertex:Bu,color_vertex:zu,common:Vu,cube_uv_reflection_fragment:ku,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Gu,displacementmap_vertex:Wu,emissivemap_fragment:Xu,emissivemap_pars_fragment:qu,colorspace_fragment:Yu,colorspace_pars_fragment:ju,envmap_fragment:$u,envmap_common_pars_fragment:Ku,envmap_pars_fragment:Zu,envmap_pars_vertex:Ju,envmap_physical_pars_fragment:cd,envmap_vertex:Qu,fog_vertex:ed,fog_pars_vertex:td,fog_fragment:nd,fog_pars_fragment:id,gradientmap_pars_fragment:sd,lightmap_pars_fragment:rd,lights_lambert_fragment:ad,lights_lambert_pars_fragment:od,lights_pars_begin:ld,lights_toon_fragment:hd,lights_toon_pars_fragment:ud,lights_phong_fragment:dd,lights_phong_pars_fragment:fd,lights_physical_fragment:pd,lights_physical_pars_fragment:md,lights_fragment_begin:xd,lights_fragment_maps:gd,lights_fragment_end:_d,logdepthbuf_fragment:vd,logdepthbuf_pars_fragment:Md,logdepthbuf_pars_vertex:Sd,logdepthbuf_vertex:bd,map_fragment:yd,map_pars_fragment:Ed,map_particle_fragment:Td,map_particle_pars_fragment:Ad,metalnessmap_fragment:wd,metalnessmap_pars_fragment:Cd,morphinstance_vertex:Rd,morphcolor_vertex:Pd,morphnormal_vertex:Dd,morphtarget_pars_vertex:Ld,morphtarget_vertex:Id,normal_fragment_begin:Ud,normal_fragment_maps:Nd,normal_pars_fragment:Fd,normal_pars_vertex:Od,normal_vertex:Bd,normalmap_pars_fragment:zd,clearcoat_normal_fragment_begin:Vd,clearcoat_normal_fragment_maps:kd,clearcoat_pars_fragment:Hd,iridescence_pars_fragment:Gd,opaque_fragment:Wd,packing:Xd,premultiplied_alpha_fragment:qd,project_vertex:Yd,dithering_fragment:jd,dithering_pars_fragment:$d,roughnessmap_fragment:Kd,roughnessmap_pars_fragment:Zd,shadowmap_pars_fragment:Jd,shadowmap_pars_vertex:Qd,shadowmap_vertex:ef,shadowmask_pars_fragment:tf,skinbase_vertex:nf,skinning_pars_vertex:sf,skinning_vertex:rf,skinnormal_vertex:af,specularmap_fragment:of,specularmap_pars_fragment:lf,tonemapping_fragment:cf,tonemapping_pars_fragment:hf,transmission_fragment:uf,transmission_pars_fragment:df,uv_pars_fragment:ff,uv_pars_vertex:pf,uv_vertex:mf,worldpos_vertex:xf,background_vert:gf,background_frag:_f,backgroundCube_vert:vf,backgroundCube_frag:Mf,cube_vert:Sf,cube_frag:bf,depth_vert:yf,depth_frag:Ef,distanceRGBA_vert:Tf,distanceRGBA_frag:Af,equirect_vert:wf,equirect_frag:Cf,linedashed_vert:Rf,linedashed_frag:Pf,meshbasic_vert:Df,meshbasic_frag:Lf,meshlambert_vert:If,meshlambert_frag:Uf,meshmatcap_vert:Nf,meshmatcap_frag:Ff,meshnormal_vert:Of,meshnormal_frag:Bf,meshphong_vert:zf,meshphong_frag:Vf,meshphysical_vert:kf,meshphysical_frag:Hf,meshtoon_vert:Gf,meshtoon_frag:Wf,points_vert:Xf,points_frag:qf,shadow_vert:Yf,shadow_frag:jf,sprite_vert:$f,sprite_frag:Kf},ae={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},un={basic:{uniforms:Lt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Lt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new xe(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Lt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Lt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Lt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new xe(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Lt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Lt([ae.points,ae.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Lt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Lt([ae.common,ae.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Lt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Lt([ae.sprite,ae.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Lt([ae.common,ae.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Lt([ae.lights,ae.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};un.physical={uniforms:Lt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Vs={r:0,b:0,g:0},Qn=new gn,Zf=new xt;function Jf(i,e,t,n,s,r,a){const o=new xe(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function x(b){let A=b.isScene===!0?b.background:null;return A&&A.isTexture&&(A=(b.backgroundBlurriness>0?t:e).get(A)),A}function g(b){let A=!1;const C=x(b);C===null?p(o,c):C&&C.isColor&&(p(C,1),A=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,A){const C=x(A);C&&(C.isCubeTexture||C.mapping===ar)?(h===void 0&&(h=new Ln(new ps(1,1,1),new St({name:"BackgroundCubeMaterial",uniforms:Bi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(y,w,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Qn.copy(A.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Zf.makeRotationFromEuler(Qn)),h.material.toneMapped=Ye.getTransfer(C.colorSpace)!==Ke,(u!==C||d!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Ln(new or(2,2),new St({name:"BackgroundMaterial",uniforms:Bi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(C.colorSpace)!==Ke,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=C,d=C.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,A){b.getRGB(Vs,Jl(i)),n.buffers.color.setClear(Vs.r,Vs.g,Vs.b,A,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,A=1){o.set(b),c=A,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(o,c)},render:g,addToRenderList:m,dispose:E}}function Qf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(M,L,O,V,W){let H=!1;const Y=u(V,O,L);r!==Y&&(r=Y,l(r.object)),H=f(M,V,O,W),H&&x(M,V,O,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,A(M,L,O,V),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,L,O){const V=O.wireframe===!0;let W=n[M.id];W===void 0&&(W={},n[M.id]=W);let H=W[L.id];H===void 0&&(H={},W[L.id]=H);let Y=H[V];return Y===void 0&&(Y=d(c()),H[V]=Y),Y}function d(M){const L=[],O=[],V=[];for(let W=0;W<t;W++)L[W]=0,O[W]=0,V[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:V,object:M,attributes:{},index:null}}function f(M,L,O,V){const W=r.attributes,H=L.attributes;let Y=0;const Z=O.getAttributes();for(const G in Z)if(Z[G].location>=0){const re=W[G];let be=H[G];if(be===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(be=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(be=M.instanceColor)),re===void 0||re.attribute!==be||be&&re.data!==be.data)return!0;Y++}return r.attributesNum!==Y||r.index!==V}function x(M,L,O,V){const W={},H=L.attributes;let Y=0;const Z=O.getAttributes();for(const G in Z)if(Z[G].location>=0){let re=H[G];re===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(re=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(re=M.instanceColor));const be={};be.attribute=re,re&&re.data&&(be.data=re.data),W[G]=be,Y++}r.attributes=W,r.attributesNum=Y,r.index=V}function g(){const M=r.newAttributes;for(let L=0,O=M.length;L<O;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const O=r.newAttributes,V=r.enabledAttributes,W=r.attributeDivisors;O[M]=1,V[M]===0&&(i.enableVertexAttribArray(M),V[M]=1),W[M]!==L&&(i.vertexAttribDivisor(M,L),W[M]=L)}function E(){const M=r.newAttributes,L=r.enabledAttributes;for(let O=0,V=L.length;O<V;O++)L[O]!==M[O]&&(i.disableVertexAttribArray(O),L[O]=0)}function b(M,L,O,V,W,H,Y){Y===!0?i.vertexAttribIPointer(M,L,O,W,H):i.vertexAttribPointer(M,L,O,V,W,H)}function A(M,L,O,V){g();const W=V.attributes,H=O.getAttributes(),Y=L.defaultAttributeValues;for(const Z in H){const G=H[Z];if(G.location>=0){let ne=W[Z];if(ne===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(ne=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(ne=M.instanceColor)),ne!==void 0){const re=ne.normalized,be=ne.itemSize,Xe=e.get(ne);if(Xe===void 0)continue;const Ze=Xe.buffer,st=Xe.type,rt=Xe.bytesPerElement,q=st===i.INT||st===i.UNSIGNED_INT||ne.gpuType===Va;if(ne.isInterleavedBufferAttribute){const K=ne.data,de=K.stride,Fe=ne.offset;if(K.isInstancedInterleavedBuffer){for(let ve=0;ve<G.locationSize;ve++)p(G.location+ve,K.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ve=0;ve<G.locationSize;ve++)m(G.location+ve);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let ve=0;ve<G.locationSize;ve++)b(G.location+ve,be/G.locationSize,st,re,de*rt,(Fe+be/G.locationSize*ve)*rt,q)}else{if(ne.isInstancedBufferAttribute){for(let K=0;K<G.locationSize;K++)p(G.location+K,ne.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let K=0;K<G.locationSize;K++)m(G.location+K);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let K=0;K<G.locationSize;K++)b(G.location+K,be/G.locationSize,st,re,be*rt,be/G.locationSize*K*rt,q)}}else if(Y!==void 0){const re=Y[Z];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv(G.location,re);break;case 3:i.vertexAttrib3fv(G.location,re);break;case 4:i.vertexAttrib4fv(G.location,re);break;default:i.vertexAttrib1fv(G.location,re)}}}}E()}function C(){U();for(const M in n){const L=n[M];for(const O in L){const V=L[O];for(const W in V)h(V[W].object),delete V[W];delete L[O]}delete n[M]}}function y(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const O in L){const V=L[O];for(const W in V)h(V[W].object),delete V[W];delete L[O]}delete n[M.id]}function w(M){for(const L in n){const O=n[L];if(O[M.id]===void 0)continue;const V=O[M.id];for(const W in V)h(V[W].object),delete V[W];delete O[M.id]}}function U(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:y,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:m,disableUnusedAttributes:E}}function ep(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let x=0;x<u;x++)f+=h[x];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let x=0;x<l.length;x++)a(l[x],h[x],d[x]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let x=0;for(let g=0;g<u;g++)x+=h[g]*d[g];t.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function tp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==ln&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const U=w===mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Dn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Cn&&!U)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Le("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=x>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:x,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:A,vertexTextures:C,maxSamples:y}}function np(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Tn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const x=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||x===null||x.length===0||r&&!m)r?h(null):l();else{const E=r?0:n,b=E*4;let A=p.clippingState||null;c.value=A,A=h(x,d,b,f);for(let C=0;C!==b;++C)A[C]=t[C];p.clippingState=A,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,x){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=c.value,x!==!0||m===null){const p=f+g*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,A=f;b!==g;++b,A+=4)a.copy(u[b]).applyMatrix4(E,o),a.normal.toArray(m,A),m[A+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function ip(i){let e=new WeakMap;function t(a,o){return o===ea?a.mapping=Ni:o===ta&&(a.mapping=Fi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ea||o===ta)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Zh(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Gn=4,Wo=[.125,.215,.35,.446,.526,.582],ii=20,sp=512,Ki=new sc,Xo=new xe;let Or=null,Br=0,zr=0,Vr=!1;const rp=new D;class qo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=rp}=r;Or=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),zr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$o(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Or,Br,zr),this._renderer.xr.enabled=Vr,e.scissorTest=!1,Ti(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ni||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Or=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),zr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:mn,format:ln,colorSpace:Oi,depthBuffer:!1},s=Yo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yo(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ap(r)),this._blurMaterial=lp(r,e,t)}return s}_compileMaterial(e){const t=new Ln(new jt,e);this._renderer.compile(t,Ki)}_sceneToCubeUV(e,t,n,s,r){const c=new Qt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Xo),u.toneMapping=Wn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ln(new ps,new Ka({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const E=e.background;E?E.isColor&&(m.color.copy(E),e.background=null,p=!0):(m.color.copy(Xo),p=!0);for(let b=0;b<6;b++){const A=b%3;A===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):A===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const C=this._cubeSize;Ti(s,A*C,b>2?C:0,C,C),u.setRenderTarget(s),p&&u.render(g,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ni||e.mapping===Fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$o()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Ti(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ki)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget;if(this._ggxMaterial===null){const E=3*Math.max(this._cubeSize,16),b=4*this._cubeSize;this._ggxMaterial=op(this._lodMax,E,b)}const a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=.05+l*.95,f=u*d,{_lodMax:x}=this,g=this._sizeLods[n],m=3*g*(n>x-Gn?n-x+Gn:0),p=4*(this._cubeSize-g);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=x-t,Ti(r,m,p,3*g,2*g),s.setRenderTarget(r),s.render(o,Ki),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-n,Ti(e,m,p,3*g,2*g),s.setRenderTarget(e),s.render(o,Ki)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&mt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const d=l.uniforms,f=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ii-1),g=r/x,m=isFinite(r)?1+Math.floor(h*g):ii;m>ii&&Le(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ii}`);const p=[];let E=0;for(let w=0;w<ii;++w){const U=w/g,S=Math.exp(-U*U/2);p.push(S),w===0?E+=S:w<m&&(E+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/E;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=x,d.mipInt.value=b-n;const A=this._sizeLods[s],C=3*A*(s>b-Gn?s-b+Gn:0),y=4*(this._cubeSize-A);Ti(t,C,y,3*A,2*A),c.setRenderTarget(t),c.render(u,Ki)}}function ap(i){const e=[],t=[],n=[];let s=i;const r=i-Gn+1+Wo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Gn?c=Wo[a-i+Gn-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,x=6,g=3,m=2,p=1,E=new Float32Array(g*x*f),b=new Float32Array(m*x*f),A=new Float32Array(p*x*f);for(let y=0;y<f;y++){const w=y%3*2/3-1,U=y>2?0:-1,S=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];E.set(S,g*x*y),b.set(d,m*x*y);const M=[y,y,y,y,y,y];A.set(M,p*x*y)}const C=new jt;C.setAttribute("position",new xn(E,g)),C.setAttribute("uv",new xn(b,m)),C.setAttribute("faceIndex",new xn(A,p)),n.push(new Ln(C,null)),s>Gn&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Yo(i,e,t){const n=new cn(i,e,t);return n.texture.mapping=ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ti(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function op(i,e,t){return new St({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function lp(i,e,t){const n=new Float32Array(ii),s=new D(0,1,0);return new St({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function jo(){return new St({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function $o(){return new St({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function lr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function cp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===ea||c===ta,h=c===Ni||c===Fi;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new qo(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new qo(i)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function hp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ls("WebGLRenderer: "+n+" extension not supported."),s}}}function up(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,x=u.attributes.position;let g=0;if(f!==null){const E=f.array;g=f.version;for(let b=0,A=E.length;b<A;b+=3){const C=E[b+0],y=E[b+1],w=E[b+2];d.push(C,y,y,w,w,C)}}else if(x!==void 0){const E=x.array;g=x.version;for(let b=0,A=E.length/3-1;b<A;b+=3){const C=b+0,y=b+1,w=b+2;d.push(C,y,y,w,w,C)}}else return;const m=new(Yl(d)?Zl:Kl)(d,1);m.version=g;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function dp(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,x){x!==0&&(i.drawElementsInstanced(n,f,r,d*a,x),t.update(f,n,x))}function h(d,f,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,x);let m=0;for(let p=0;p<x;p++)m+=f[p];t.update(m,n,1)}function u(d,f,x,g){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,g,0,x);let p=0;for(let E=0;E<x;E++)p+=f[E]*g[E];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function fp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function pp(i,e,t){const n=new WeakMap,s=new _t;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let M=function(){U.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const x=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let A=0;x===!0&&(A=1),g===!0&&(A=2),m===!0&&(A=3);let C=o.attributes.position.count*A,y=1;C>e.maxTextureSize&&(y=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const w=new Float32Array(C*y*4*u),U=new jl(w,C,y,u);U.type=Cn,U.needsUpdate=!0;const S=A*4;for(let L=0;L<u;L++){const O=p[L],V=E[L],W=b[L],H=C*y*4*L;for(let Y=0;Y<O.count;Y++){const Z=Y*S;x===!0&&(s.fromBufferAttribute(O,Y),w[H+Z+0]=s.x,w[H+Z+1]=s.y,w[H+Z+2]=s.z,w[H+Z+3]=0),g===!0&&(s.fromBufferAttribute(V,Y),w[H+Z+4]=s.x,w[H+Z+5]=s.y,w[H+Z+6]=s.z,w[H+Z+7]=0),m===!0&&(s.fromBufferAttribute(W,Y),w[H+Z+8]=s.x,w[H+Z+9]=s.y,w[H+Z+10]=s.z,w[H+Z+11]=W.itemSize===4?s.w:1)}}d={count:u,texture:U,size:new Te(C,y)},n.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let x=0;for(let m=0;m<l.length;m++)x+=l[m];const g=o.morphTargetsRelative?1:1-x;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function mp(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const ac=new Ut,Ko=new nc(1,1),oc=new jl,lc=new Nh,cc=new ec,Zo=[],Jo=[],Qo=new Float32Array(16),el=new Float32Array(9),tl=new Float32Array(4);function Gi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Zo[s];if(r===void 0&&(r=new Float32Array(s),Zo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function cr(i,e){let t=Jo[e];t===void 0&&(t=new Int32Array(e),Jo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function xp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),yt(t,e)}}function _p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),yt(t,e)}}function vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),yt(t,e)}}function Mp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,n))return;tl.set(n),i.uniformMatrix2fv(this.addr,!1,tl),yt(t,n)}}function Sp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,n))return;el.set(n),i.uniformMatrix3fv(this.addr,!1,el),yt(t,n)}}function bp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(bt(t,n))return;Qo.set(n),i.uniformMatrix4fv(this.addr,!1,Qo),yt(t,n)}}function yp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),yt(t,e)}}function Tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),yt(t,e)}}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),yt(t,e)}}function wp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),yt(t,e)}}function Rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),yt(t,e)}}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),yt(t,e)}}function Dp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ko.compareFunction=ql,r=Ko):r=ac,t.setTexture2D(e||r,s)}function Lp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||lc,s)}function Ip(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||cc,s)}function Up(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||oc,s)}function Np(i){switch(i){case 5126:return xp;case 35664:return gp;case 35665:return _p;case 35666:return vp;case 35674:return Mp;case 35675:return Sp;case 35676:return bp;case 5124:case 35670:return yp;case 35667:case 35671:return Ep;case 35668:case 35672:return Tp;case 35669:case 35673:return Ap;case 5125:return wp;case 36294:return Cp;case 36295:return Rp;case 36296:return Pp;case 35678:case 36198:case 36298:case 36306:case 35682:return Dp;case 35679:case 36299:case 36307:return Lp;case 35680:case 36300:case 36308:case 36293:return Ip;case 36289:case 36303:case 36311:case 36292:return Up}}function Fp(i,e){i.uniform1fv(this.addr,e)}function Op(i,e){const t=Gi(e,this.size,2);i.uniform2fv(this.addr,t)}function Bp(i,e){const t=Gi(e,this.size,3);i.uniform3fv(this.addr,t)}function zp(i,e){const t=Gi(e,this.size,4);i.uniform4fv(this.addr,t)}function Vp(i,e){const t=Gi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function kp(i,e){const t=Gi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Hp(i,e){const t=Gi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Gp(i,e){i.uniform1iv(this.addr,e)}function Wp(i,e){i.uniform2iv(this.addr,e)}function Xp(i,e){i.uniform3iv(this.addr,e)}function qp(i,e){i.uniform4iv(this.addr,e)}function Yp(i,e){i.uniform1uiv(this.addr,e)}function jp(i,e){i.uniform2uiv(this.addr,e)}function $p(i,e){i.uniform3uiv(this.addr,e)}function Kp(i,e){i.uniform4uiv(this.addr,e)}function Zp(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||ac,r[a])}function Jp(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||lc,r[a])}function Qp(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||cc,r[a])}function em(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);bt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||oc,r[a])}function tm(i){switch(i){case 5126:return Fp;case 35664:return Op;case 35665:return Bp;case 35666:return zp;case 35674:return Vp;case 35675:return kp;case 35676:return Hp;case 5124:case 35670:return Gp;case 35667:case 35671:return Wp;case 35668:case 35672:return Xp;case 35669:case 35673:return qp;case 5125:return Yp;case 36294:return jp;case 36295:return $p;case 36296:return Kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return Jp;case 35680:case 36300:case 36308:case 36293:return Qp;case 36289:case 36303:case 36311:case 36292:return em}}class nm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Np(t.type)}}class im{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tm(t.type)}}class sm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const kr=/(\w+)(\])?(\[|\.)?/g;function nl(i,e){i.seq.push(e),i.map[e.id]=e}function rm(i,e,t){const n=i.name,s=n.length;for(kr.lastIndex=0;;){const r=kr.exec(n),a=kr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){nl(t,l===void 0?new nm(o,i,e):new im(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new sm(o),nl(t,u)),t=u}}}class Ks{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);rm(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function il(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const am=37297;let om=0;function lm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const sl=new Oe;function cm(i){Ye._getMatrix(sl,Ye.workingColorSpace,i);const e=`mat3( ${sl.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case Qs:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+lm(i.getShaderSource(e),o)}else return r}function hm(i,e){const t=cm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function um(i,e){let t;switch(e){case Dl:t="Linear";break;case Ll:t="Reinhard";break;case Il:t="Cineon";break;case Ul:t="ACESFilmic";break;case Fl:t="AgX";break;case Ol:t="Neutral";break;case Nl:t="Custom";break;default:Le("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ks=new D;function dm(){Ye.getLuminanceCoefficients(ks);const i=ks.x.toFixed(4),e=ks.y.toFixed(4),t=ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zi).join(`
`)}function pm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Zi(i){return i!==""}function al(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ol(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ua(i){return i.replace(xm,_m)}const gm=new Map;function _m(i,e){let t=Be[e];if(t===void 0){const n=gm.get(e);if(n!==void 0)t=Be[n],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ua(t)}const vm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ll(i){return i.replace(vm,Mm)}function Mm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Sm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ic?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function bm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ni:case Fi:e="ENVMAP_TYPE_CUBE";break;case ar:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ym(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fi:e="ENVMAP_MODE_REFRACTION";break}return e}function Em(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Pl:e="ENVMAP_BLENDING_MULTIPLY";break;case Jc:e="ENVMAP_BLENDING_MIX";break;case Qc:e="ENVMAP_BLENDING_ADD";break}return e}function Tm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Am(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Sm(t),l=bm(t),h=ym(t),u=Em(t),d=Tm(t),f=fm(t),x=pm(r),g=s.createProgram();let m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Zi).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Zi).join(`
`),p.length>0&&(p+=`
`)):(m=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),p=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Wn?um("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,hm("linearToOutputTexel",t.outputColorSpace),dm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zi).join(`
`)),a=Ua(a),a=al(a,t),a=ol(a,t),o=Ua(o),o=al(o,t),o=ol(o,t),a=ll(a),o=ll(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===po?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===po?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=E+m+a,A=E+p+o,C=il(s,s.VERTEX_SHADER,b),y=il(s,s.FRAGMENT_SHADER,A);s.attachShader(g,C),s.attachShader(g,y),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function w(L){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(g)||"",V=s.getShaderInfoLog(C)||"",W=s.getShaderInfoLog(y)||"",H=O.trim(),Y=V.trim(),Z=W.trim();let G=!0,ne=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,C,y);else{const re=rl(s,C,"vertex"),be=rl(s,y,"fragment");mt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+re+`
`+be)}else H!==""?Le("WebGLProgram: Program Info Log:",H):(Y===""||Z==="")&&(ne=!1);ne&&(L.diagnostics={runnable:G,programLog:H,vertexShader:{log:Y,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(C),s.deleteShader(y),U=new Ks(s,g),S=mm(s,g)}let U;this.getUniforms=function(){return U===void 0&&w(this),U};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(g,am)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=om++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=y,this}let wm=0;class Cm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Rm(e),t.set(e,n)),n}}class Rm{constructor(e){this.id=wm++,this.code=e,this.usedTimes=0}}function Pm(i,e,t,n,s,r,a){const o=new $a,c=new Cm,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,M,L,O,V){const W=O.fog,H=V.geometry,Y=S.isMeshStandardMaterial?O.environment:null,Z=(S.isMeshStandardMaterial?t:e).get(S.envMap||Y),G=Z&&Z.mapping===ar?Z.image.height:null,ne=x[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&Le("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const re=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,be=re!==void 0?re.length:0;let Xe=0;H.morphAttributes.position!==void 0&&(Xe=1),H.morphAttributes.normal!==void 0&&(Xe=2),H.morphAttributes.color!==void 0&&(Xe=3);let Ze,st,rt,q;if(ne){const Je=un[ne];Ze=Je.vertexShader,st=Je.fragmentShader}else Ze=S.vertexShader,st=S.fragmentShader,c.update(S),rt=c.getVertexShaderID(S),q=c.getFragmentShaderID(S);const K=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Fe=V.isInstancedMesh===!0,ve=V.isBatchedMesh===!0,ke=!!S.map,Tt=!!S.matcap,Ve=!!Z,lt=!!S.aoMap,R=!!S.lightMap,He=!!S.bumpMap,Ge=!!S.normalMap,at=!!S.displacementMap,me=!!S.emissiveMap,ct=!!S.metalnessMap,Se=!!S.roughnessMap,Ne=S.anisotropy>0,T=S.clearcoat>0,_=S.dispersion>0,F=S.iridescence>0,X=S.sheen>0,$=S.transmission>0,k=Ne&&!!S.anisotropyMap,_e=T&&!!S.clearcoatMap,oe=T&&!!S.clearcoatNormalMap,ye=T&&!!S.clearcoatRoughnessMap,ge=F&&!!S.iridescenceMap,J=F&&!!S.iridescenceThicknessMap,te=X&&!!S.sheenColorMap,Ce=X&&!!S.sheenRoughnessMap,Ae=!!S.specularMap,he=!!S.specularColorMap,De=!!S.specularIntensityMap,P=$&&!!S.transmissionMap,le=$&&!!S.thicknessMap,ie=!!S.gradientMap,se=!!S.alphaMap,Q=S.alphaTest>0,j=!!S.alphaHash,fe=!!S.extensions;let Ue=Wn;S.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ue=i.toneMapping);const ot={shaderID:ne,shaderType:S.type,shaderName:S.name,vertexShader:Ze,fragmentShader:st,defines:S.defines,customVertexShaderID:rt,customFragmentShaderID:q,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:ve,batchingColor:ve&&V._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&V.instanceColor!==null,instancingMorph:Fe&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Oi,alphaToCoverage:!!S.alphaToCoverage,map:ke,matcap:Tt,envMap:Ve,envMapMode:Ve&&Z.mapping,envMapCubeUVHeight:G,aoMap:lt,lightMap:R,bumpMap:He,normalMap:Ge,displacementMap:d&&at,emissiveMap:me,normalMapObjectSpace:Ge&&S.normalMapType===sh,normalMapTangentSpace:Ge&&S.normalMapType===ih,metalnessMap:ct,roughnessMap:Se,anisotropy:Ne,anisotropyMap:k,clearcoat:T,clearcoatMap:_e,clearcoatNormalMap:oe,clearcoatRoughnessMap:ye,dispersion:_,iridescence:F,iridescenceMap:ge,iridescenceThicknessMap:J,sheen:X,sheenColorMap:te,sheenRoughnessMap:Ce,specularMap:Ae,specularColorMap:he,specularIntensityMap:De,transmission:$,transmissionMap:P,thicknessMap:le,gradientMap:ie,opaque:S.transparent===!1&&S.blending===Li&&S.alphaToCoverage===!1,alphaMap:se,alphaTest:Q,alphaHash:j,combine:S.combine,mapUv:ke&&g(S.map.channel),aoMapUv:lt&&g(S.aoMap.channel),lightMapUv:R&&g(S.lightMap.channel),bumpMapUv:He&&g(S.bumpMap.channel),normalMapUv:Ge&&g(S.normalMap.channel),displacementMapUv:at&&g(S.displacementMap.channel),emissiveMapUv:me&&g(S.emissiveMap.channel),metalnessMapUv:ct&&g(S.metalnessMap.channel),roughnessMapUv:Se&&g(S.roughnessMap.channel),anisotropyMapUv:k&&g(S.anisotropyMap.channel),clearcoatMapUv:_e&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:te&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&g(S.sheenRoughnessMap.channel),specularMapUv:Ae&&g(S.specularMap.channel),specularColorMapUv:he&&g(S.specularColorMap.channel),specularIntensityMapUv:De&&g(S.specularIntensityMap.channel),transmissionMapUv:P&&g(S.transmissionMap.channel),thicknessMapUv:le&&g(S.thicknessMap.channel),alphaMapUv:se&&g(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Ge||Ne),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!H.attributes.uv&&(ke||se),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:V.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Xe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,decodeVideoTexture:ke&&S.map.isVideoTexture===!0&&Ye.getTransfer(S.map.colorSpace)===Ke,decodeVideoTextureEmissive:me&&S.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(S.emissiveMap.colorSpace)===Ke,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===An,flipSided:S.side===zt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:fe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&S.extensions.multiDraw===!0||ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ot.vertexUv1s=l.has(1),ot.vertexUv2s=l.has(2),ot.vertexUv3s=l.has(3),l.clear(),ot}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)M.push(L),M.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(E(M,S),b(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function E(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function b(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function A(S){const M=x[S.type];let L;if(M){const O=un[M];L=qn.clone(O.uniforms)}else L=S.uniforms;return L}function C(S,M){let L;for(let O=0,V=h.length;O<V;O++){const W=h[O];if(W.cacheKey===M){L=W,++L.usedTimes;break}}return L===void 0&&(L=new Am(i,M,S,r),h.push(L)),L}function y(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function w(S){c.remove(S)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:A,acquireProgram:C,releaseProgram:y,releaseShaderCache:w,programs:h,dispose:U}}function Dm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Lm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function hl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ul(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,f,x,g,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=x,p.renderOrder=u.renderOrder,p.z=g,p.group=m),e++,p}function o(u,d,f,x,g,m){const p=a(u,d,f,x,g,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(u,d,f,x,g,m){const p=a(u,d,f,x,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Lm),n.length>1&&n.sort(d||hl),s.length>1&&s.sort(d||hl)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Im(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new ul,i.set(n,[a])):s>=r.length?(a=new ul,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Um(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new xe};break;case"SpotLight":t={position:new D,direction:new D,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function Nm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Fm=0;function Om(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Bm(i){const e=new Um,t=Nm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const s=new D,r=new xt,a=new xt;function o(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,x=0,g=0,m=0,p=0,E=0,b=0,A=0,C=0,y=0,w=0;l.sort(Om);for(let S=0,M=l.length;S<M;S++){const L=l[S],O=L.color,V=L.intensity,W=L.distance,H=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=O.r*V,u+=O.g*V,d+=O.b*V;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],V);w++}else if(L.isDirectionalLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Z=L.shadow,G=t.get(L);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=L.shadow.matrix,E++}n.directional[f]=Y,f++}else if(L.isSpotLight){const Y=e.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(O).multiplyScalar(V),Y.distance=W,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[g]=Y;const Z=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,Z.updateMatrices(L),L.castShadow&&y++),n.spotLightMatrix[g]=Z.matrix,L.castShadow){const G=t.get(L);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[g]=G,n.spotShadowMap[g]=H,A++}g++}else if(L.isRectAreaLight){const Y=e.get(L);Y.color.copy(O).multiplyScalar(V),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=Y,m++}else if(L.isPointLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const Z=L.shadow,G=t.get(L);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[x]=G,n.pointShadowMap[x]=H,n.pointShadowMatrix[x]=L.shadow.matrix,b++}n.point[x]=Y,x++}else if(L.isHemisphereLight){const Y=e.get(L);Y.skyColor.copy(L.color).multiplyScalar(V),Y.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[p]=Y,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const U=n.hash;(U.directionalLength!==f||U.pointLength!==x||U.spotLength!==g||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==E||U.numPointShadows!==b||U.numSpotShadows!==A||U.numSpotMaps!==C||U.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=x,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=A+C-y,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=w,U.directionalLength=f,U.pointLength=x,U.spotLength=g,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=E,U.numPointShadows=b,U.numSpotShadows=A,U.numSpotMaps=C,U.numLightProbes=w,n.version=Fm++)}function c(l,h){let u=0,d=0,f=0,x=0,g=0;const m=h.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){const b=l[p];if(b.isDirectionalLight){const A=n.directional[u];A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),u++}else if(b.isSpotLight){const A=n.spot[f];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const A=n.point[d];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const A=n.hemi[g];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function dl(i){const e=new Bm(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function zm(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new dl(i),e.set(s,[o])):r>=a.length?(o=new dl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Vm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,km=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hm(i,e,t){let n=new tc;const s=new Te,r=new Te,a=new _t,o=new hu({depthPacking:nh}),c=new uu,l={},h=t.maxTextureSize,u={[Xn]:zt,[zt]:Xn,[An]:An},d=new St({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:Vm,fragmentShader:km}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const x=new jt;x.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ln(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rl;let p=this.type;this.render=function(y,w,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const S=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),O=i.state;O.setBlending(pn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const V=p!==En&&this.type===En,W=p===En&&this.type!==En;for(let H=0,Y=y.length;H<Y;H++){const Z=y[H],G=Z.shadow;if(G===void 0){Le("WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ne=G.getFrameExtents();if(s.multiply(ne),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ne.x),s.x=r.x*ne.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ne.y),s.y=r.y*ne.y,G.mapSize.y=r.y)),G.map===null||V===!0||W===!0){const be=this.type!==En?{minFilter:Yt,magFilter:Yt}:{};G.map!==null&&G.map.dispose(),G.map=new cn(s.x,s.y,be),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const re=G.getViewportCount();for(let be=0;be<re;be++){const Xe=G.getViewport(be);a.set(r.x*Xe.x,r.y*Xe.y,r.x*Xe.z,r.y*Xe.w),O.viewport(a),G.updateMatrices(Z,be),n=G.getFrustum(),A(w,U,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===En&&E(G,U),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,M,L)};function E(y,w){const U=e.update(g);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,f.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new cn(s.x,s.y)),d.uniforms.shadow_pass.value=y.map.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(w,null,U,d,g,null),f.uniforms.shadow_pass.value=y.mapPass.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(w,null,U,f,g,null)}function b(y,w,U,S){let M=null;const L=U.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(L!==void 0)M=L;else if(M=U.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const O=M.uuid,V=w.uuid;let W=l[O];W===void 0&&(W={},l[O]=W);let H=W[V];H===void 0&&(H=M.clone(),W[V]=H,w.addEventListener("dispose",C)),M=H}if(M.visible=w.visible,M.wireframe=w.wireframe,S===En?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=i.properties.get(M);O.light=U}return M}function A(y,w,U,S,M){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===En)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,y.matrixWorld);const V=e.update(y),W=y.material;if(Array.isArray(W)){const H=V.groups;for(let Y=0,Z=H.length;Y<Z;Y++){const G=H[Y],ne=W[G.materialIndex];if(ne&&ne.visible){const re=b(y,ne,S,M);y.onBeforeShadow(i,y,w,U,V,re,G),i.renderBufferDirect(U,null,V,re,y,G),y.onAfterShadow(i,y,w,U,V,re,G)}}}else if(W.visible){const H=b(y,W,S,M);y.onBeforeShadow(i,y,w,U,V,H,null),i.renderBufferDirect(U,null,V,H,y,null),y.onAfterShadow(i,y,w,U,V,H,null)}}const O=y.children;for(let V=0,W=O.length;V<W;V++)A(O[V],w,U,S,M)}function C(y){y.target.removeEventListener("dispose",C);for(const U in l){const S=l[U],M=y.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Gm={[Yr]:jr,[$r]:Jr,[Kr]:Qr,[Ui]:Zr,[jr]:Yr,[Jr]:$r,[Qr]:Kr,[Zr]:Ui};function Wm(i,e){function t(){let P=!1;const le=new _t;let ie=null;const se=new _t(0,0,0,0);return{setMask:function(Q){ie!==Q&&!P&&(i.colorMask(Q,Q,Q,Q),ie=Q)},setLocked:function(Q){P=Q},setClear:function(Q,j,fe,Ue,ot){ot===!0&&(Q*=Ue,j*=Ue,fe*=Ue),le.set(Q,j,fe,Ue),se.equals(le)===!1&&(i.clearColor(Q,j,fe,Ue),se.copy(le))},reset:function(){P=!1,ie=null,se.set(-1,0,0,0)}}}function n(){let P=!1,le=!1,ie=null,se=null,Q=null;return{setReversed:function(j){if(le!==j){const fe=e.get("EXT_clip_control");j?fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.ZERO_TO_ONE_EXT):fe.clipControlEXT(fe.LOWER_LEFT_EXT,fe.NEGATIVE_ONE_TO_ONE_EXT),le=j;const Ue=Q;Q=null,this.setClear(Ue)}},getReversed:function(){return le},setTest:function(j){j?K(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(j){ie!==j&&!P&&(i.depthMask(j),ie=j)},setFunc:function(j){if(le&&(j=Gm[j]),se!==j){switch(j){case Yr:i.depthFunc(i.NEVER);break;case jr:i.depthFunc(i.ALWAYS);break;case $r:i.depthFunc(i.LESS);break;case Ui:i.depthFunc(i.LEQUAL);break;case Kr:i.depthFunc(i.EQUAL);break;case Zr:i.depthFunc(i.GEQUAL);break;case Jr:i.depthFunc(i.GREATER);break;case Qr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}se=j}},setLocked:function(j){P=j},setClear:function(j){Q!==j&&(le&&(j=1-j),i.clearDepth(j),Q=j)},reset:function(){P=!1,ie=null,se=null,Q=null,le=!1}}}function s(){let P=!1,le=null,ie=null,se=null,Q=null,j=null,fe=null,Ue=null,ot=null;return{setTest:function(Je){P||(Je?K(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(Je){le!==Je&&!P&&(i.stencilMask(Je),le=Je)},setFunc:function(Je,hn,tn){(ie!==Je||se!==hn||Q!==tn)&&(i.stencilFunc(Je,hn,tn),ie=Je,se=hn,Q=tn)},setOp:function(Je,hn,tn){(j!==Je||fe!==hn||Ue!==tn)&&(i.stencilOp(Je,hn,tn),j=Je,fe=hn,Ue=tn)},setLocked:function(Je){P=Je},setClear:function(Je){ot!==Je&&(i.clearStencil(Je),ot=Je)},reset:function(){P=!1,le=null,ie=null,se=null,Q=null,j=null,fe=null,Ue=null,ot=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],x=null,g=!1,m=null,p=null,E=null,b=null,A=null,C=null,y=null,w=new xe(0,0,0),U=0,S=!1,M=null,L=null,O=null,V=null,W=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,Z=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),Y=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Y=Z>=2);let ne=null,re={};const be=i.getParameter(i.SCISSOR_BOX),Xe=i.getParameter(i.VIEWPORT),Ze=new _t().fromArray(be),st=new _t().fromArray(Xe);function rt(P,le,ie,se){const Q=new Uint8Array(4),j=i.createTexture();i.bindTexture(P,j),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let fe=0;fe<ie;fe++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,se,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(le+fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return j}const q={};q[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(Ui),He(!1),Ge(lo),K(i.CULL_FACE),lt(pn);function K(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function de(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Fe(P,le){return u[P]!==le?(i.bindFramebuffer(P,le),u[P]=le,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=le),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=le),!0):!1}function ve(P,le){let ie=f,se=!1;if(P){ie=d.get(le),ie===void 0&&(ie=[],d.set(le,ie));const Q=P.textures;if(ie.length!==Q.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let j=0,fe=Q.length;j<fe;j++)ie[j]=i.COLOR_ATTACHMENT0+j;ie.length=Q.length,se=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,se=!0);se&&i.drawBuffers(ie)}function ke(P){return x!==P?(i.useProgram(P),x=P,!0):!1}const Tt={[ni]:i.FUNC_ADD,[Nc]:i.FUNC_SUBTRACT,[Fc]:i.FUNC_REVERSE_SUBTRACT};Tt[Oc]=i.MIN,Tt[Bc]=i.MAX;const Ve={[zc]:i.ZERO,[Vc]:i.ONE,[kc]:i.SRC_COLOR,[Xr]:i.SRC_ALPHA,[Yc]:i.SRC_ALPHA_SATURATE,[Xc]:i.DST_COLOR,[Gc]:i.DST_ALPHA,[Hc]:i.ONE_MINUS_SRC_COLOR,[qr]:i.ONE_MINUS_SRC_ALPHA,[qc]:i.ONE_MINUS_DST_COLOR,[Wc]:i.ONE_MINUS_DST_ALPHA,[jc]:i.CONSTANT_COLOR,[$c]:i.ONE_MINUS_CONSTANT_COLOR,[Kc]:i.CONSTANT_ALPHA,[Zc]:i.ONE_MINUS_CONSTANT_ALPHA};function lt(P,le,ie,se,Q,j,fe,Ue,ot,Je){if(P===pn){g===!0&&(de(i.BLEND),g=!1);return}if(g===!1&&(K(i.BLEND),g=!0),P!==Uc){if(P!==m||Je!==S){if((p!==ni||A!==ni)&&(i.blendEquation(i.FUNC_ADD),p=ni,A=ni),Je)switch(P){case Li:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case is:i.blendFunc(i.ONE,i.ONE);break;case co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ho:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:mt("WebGLState: Invalid blending: ",P);break}else switch(P){case Li:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case co:mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ho:mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:mt("WebGLState: Invalid blending: ",P);break}E=null,b=null,C=null,y=null,w.set(0,0,0),U=0,m=P,S=Je}return}Q=Q||le,j=j||ie,fe=fe||se,(le!==p||Q!==A)&&(i.blendEquationSeparate(Tt[le],Tt[Q]),p=le,A=Q),(ie!==E||se!==b||j!==C||fe!==y)&&(i.blendFuncSeparate(Ve[ie],Ve[se],Ve[j],Ve[fe]),E=ie,b=se,C=j,y=fe),(Ue.equals(w)===!1||ot!==U)&&(i.blendColor(Ue.r,Ue.g,Ue.b,ot),w.copy(Ue),U=ot),m=P,S=!1}function R(P,le){P.side===An?de(i.CULL_FACE):K(i.CULL_FACE);let ie=P.side===zt;le&&(ie=!ie),He(ie),P.blending===Li&&P.transparent===!1?lt(pn):lt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const se=P.stencilWrite;o.setTest(se),se&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),me(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(P){M!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),M=P)}function Ge(P){P!==Dc?(K(i.CULL_FACE),P!==L&&(P===lo?i.cullFace(i.BACK):P===Lc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),L=P}function at(P){P!==O&&(Y&&i.lineWidth(P),O=P)}function me(P,le,ie){P?(K(i.POLYGON_OFFSET_FILL),(V!==le||W!==ie)&&(i.polygonOffset(le,ie),V=le,W=ie)):de(i.POLYGON_OFFSET_FILL)}function ct(P){P?K(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function Se(P){P===void 0&&(P=i.TEXTURE0+H-1),ne!==P&&(i.activeTexture(P),ne=P)}function Ne(P,le,ie){ie===void 0&&(ne===null?ie=i.TEXTURE0+H-1:ie=ne);let se=re[ie];se===void 0&&(se={type:void 0,texture:void 0},re[ie]=se),(se.type!==P||se.texture!==le)&&(ne!==ie&&(i.activeTexture(ie),ne=ie),i.bindTexture(P,le||q[P]),se.type=P,se.texture=le)}function T(){const P=re[ne];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function X(){try{i.texSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function $(){try{i.texSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function _e(){try{i.compressedTexSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function oe(){try{i.texStorage2D(...arguments)}catch(P){P("WebGLState:",P)}}function ye(){try{i.texStorage3D(...arguments)}catch(P){P("WebGLState:",P)}}function ge(){try{i.texImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function J(){try{i.texImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function te(P){Ze.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Ze.copy(P))}function Ce(P){st.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),st.copy(P))}function Ae(P,le){let ie=l.get(le);ie===void 0&&(ie=new WeakMap,l.set(le,ie));let se=ie.get(P);se===void 0&&(se=i.getUniformBlockIndex(le,P.name),ie.set(P,se))}function he(P,le){const se=l.get(le).get(P);c.get(le)!==se&&(i.uniformBlockBinding(le,se,P.__bindingPointIndex),c.set(le,se))}function De(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ne=null,re={},u={},d=new WeakMap,f=[],x=null,g=!1,m=null,p=null,E=null,b=null,A=null,C=null,y=null,w=new xe(0,0,0),U=0,S=!1,M=null,L=null,O=null,V=null,W=null,Ze.set(0,0,i.canvas.width,i.canvas.height),st.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:de,bindFramebuffer:Fe,drawBuffers:ve,useProgram:ke,setBlending:lt,setMaterial:R,setFlipSided:He,setCullFace:Ge,setLineWidth:at,setPolygonOffset:me,setScissorTest:ct,activeTexture:Se,bindTexture:Ne,unbindTexture:T,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:ge,texImage3D:J,updateUBOMapping:Ae,uniformBlockBinding:he,texStorage2D:oe,texStorage3D:ye,texSubImage2D:X,texSubImage3D:$,compressedTexSubImage2D:k,compressedTexSubImage3D:_e,scissor:te,viewport:Ce,reset:De}}function Xm(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Te,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(T,_){return f?new OffscreenCanvas(T,_):tr("canvas")}function g(T,_,F){let X=1;const $=Ne(T);if(($.width>F||$.height>F)&&(X=F/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const k=Math.floor(X*$.width),_e=Math.floor(X*$.height);u===void 0&&(u=x(k,_e));const oe=_?x(k,_e):u;return oe.width=k,oe.height=_e,oe.getContext("2d").drawImage(T,0,0,k,_e),Le("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+k+"x"+_e+")."),oe}else return"data"in T&&Le("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,_,F,X,$=!1){if(T!==null){if(i[T]!==void 0)return i[T];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let k=_;if(_===i.RED&&(F===i.FLOAT&&(k=i.R32F),F===i.HALF_FLOAT&&(k=i.R16F),F===i.UNSIGNED_BYTE&&(k=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(k=i.R8UI),F===i.UNSIGNED_SHORT&&(k=i.R16UI),F===i.UNSIGNED_INT&&(k=i.R32UI),F===i.BYTE&&(k=i.R8I),F===i.SHORT&&(k=i.R16I),F===i.INT&&(k=i.R32I)),_===i.RG&&(F===i.FLOAT&&(k=i.RG32F),F===i.HALF_FLOAT&&(k=i.RG16F),F===i.UNSIGNED_BYTE&&(k=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(k=i.RG8UI),F===i.UNSIGNED_SHORT&&(k=i.RG16UI),F===i.UNSIGNED_INT&&(k=i.RG32UI),F===i.BYTE&&(k=i.RG8I),F===i.SHORT&&(k=i.RG16I),F===i.INT&&(k=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(k=i.RGB8UI),F===i.UNSIGNED_SHORT&&(k=i.RGB16UI),F===i.UNSIGNED_INT&&(k=i.RGB32UI),F===i.BYTE&&(k=i.RGB8I),F===i.SHORT&&(k=i.RGB16I),F===i.INT&&(k=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(k=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(k=i.RGBA16UI),F===i.UNSIGNED_INT&&(k=i.RGBA32UI),F===i.BYTE&&(k=i.RGBA8I),F===i.SHORT&&(k=i.RGBA16I),F===i.INT&&(k=i.RGBA32I)),_===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(k=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(k=i.R11F_G11F_B10F)),_===i.RGBA){const _e=$?Qs:Ye.getTransfer(X);F===i.FLOAT&&(k=i.RGBA32F),F===i.HALF_FLOAT&&(k=i.RGBA16F),F===i.UNSIGNED_BYTE&&(k=_e===Ke?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(k=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(k=i.RGB5_A1)}return(k===i.R16F||k===i.R32F||k===i.RG16F||k===i.RG32F||k===i.RGBA16F||k===i.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function A(T,_){let F;return T?_===null||_===oi||_===rs?F=i.DEPTH24_STENCIL8:_===Cn?F=i.DEPTH32F_STENCIL8:_===ss&&(F=i.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===oi||_===rs?F=i.DEPTH_COMPONENT24:_===Cn?F=i.DEPTH_COMPONENT32F:_===ss&&(F=i.DEPTH_COMPONENT16),F}function C(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Yt&&T.minFilter!==en?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function y(T){const _=T.target;_.removeEventListener("dispose",y),U(_),_.isVideoTexture&&h.delete(_)}function w(T){const _=T.target;_.removeEventListener("dispose",w),M(_)}function U(T){const _=n.get(T);if(_.__webglInit===void 0)return;const F=T.source,X=d.get(F);if(X){const $=X[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(T),Object.keys(X).length===0&&d.delete(F)}n.remove(T)}function S(T){const _=n.get(T);i.deleteTexture(_.__webglTexture);const F=T.source,X=d.get(F);delete X[_.__cacheKey],a.memory.textures--}function M(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(_.__webglFramebuffer[X]))for(let $=0;$<_.__webglFramebuffer[X].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[X][$]);else i.deleteFramebuffer(_.__webglFramebuffer[X]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[X])}else{if(Array.isArray(_.__webglFramebuffer))for(let X=0;X<_.__webglFramebuffer.length;X++)i.deleteFramebuffer(_.__webglFramebuffer[X]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let X=0;X<_.__webglColorRenderbuffer.length;X++)_.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[X]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=T.textures;for(let X=0,$=F.length;X<$;X++){const k=n.get(F[X]);k.__webglTexture&&(i.deleteTexture(k.__webglTexture),a.memory.textures--),n.remove(F[X])}n.remove(T)}let L=0;function O(){L=0}function V(){const T=L;return T>=s.maxTextures&&Le("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function W(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function H(T,_){const F=n.get(T);if(T.isVideoTexture&&ct(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){const X=T.image;if(X===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,T,_);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function Y(T,_){const F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){q(F,T,_);return}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function Z(T,_){const F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){q(F,T,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function G(T,_){const F=n.get(T);if(T.version>0&&F.__version!==T.version){K(F,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const ne={[na]:i.REPEAT,[wn]:i.CLAMP_TO_EDGE,[ia]:i.MIRRORED_REPEAT},re={[Yt]:i.NEAREST,[eh]:i.NEAREST_MIPMAP_NEAREST,[gs]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[fr]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},be={[rh]:i.NEVER,[uh]:i.ALWAYS,[ah]:i.LESS,[ql]:i.LEQUAL,[oh]:i.EQUAL,[hh]:i.GEQUAL,[lh]:i.GREATER,[ch]:i.NOTEQUAL};function Xe(T,_){if(_.type===Cn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===en||_.magFilter===fr||_.magFilter===gs||_.magFilter===ri||_.minFilter===en||_.minFilter===fr||_.minFilter===gs||_.minFilter===ri)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ne[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ne[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ne[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,re[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,re[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,be[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Yt||_.minFilter!==gs&&_.minFilter!==ri||_.type===Cn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Ze(T,_){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",y));const X=_.source;let $=d.get(X);$===void 0&&($={},d.set(X,$));const k=W(_);if(k!==T.__cacheKey){$[k]===void 0&&($[k]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),$[k].usedTimes++;const _e=$[T.__cacheKey];_e!==void 0&&($[T.__cacheKey].usedTimes--,_e.usedTimes===0&&S(_)),T.__cacheKey=k,T.__webglTexture=$[k].texture}return F}function st(T,_,F){return Math.floor(Math.floor(T/F)/_)}function rt(T,_,F,X){const k=T.updateRanges;if(k.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,X,_.data);else{k.sort((J,te)=>J.start-te.start);let _e=0;for(let J=1;J<k.length;J++){const te=k[_e],Ce=k[J],Ae=te.start+te.count,he=st(Ce.start,_.width,4),De=st(te.start,_.width,4);Ce.start<=Ae+1&&he===De&&st(Ce.start+Ce.count-1,_.width,4)===he?te.count=Math.max(te.count,Ce.start+Ce.count-te.start):(++_e,k[_e]=Ce)}k.length=_e+1;const oe=i.getParameter(i.UNPACK_ROW_LENGTH),ye=i.getParameter(i.UNPACK_SKIP_PIXELS),ge=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let J=0,te=k.length;J<te;J++){const Ce=k[J],Ae=Math.floor(Ce.start/4),he=Math.ceil(Ce.count/4),De=Ae%_.width,P=Math.floor(Ae/_.width),le=he,ie=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,De),i.pixelStorei(i.UNPACK_SKIP_ROWS,P),t.texSubImage2D(i.TEXTURE_2D,0,De,P,le,ie,F,X,_.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,oe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function q(T,_,F){let X=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(X=i.TEXTURE_3D);const $=Ze(T,_),k=_.source;t.bindTexture(X,T.__webglTexture,i.TEXTURE0+F);const _e=n.get(k);if(k.version!==_e.__version||$===!0){t.activeTexture(i.TEXTURE0+F);const oe=Ye.getPrimaries(Ye.workingColorSpace),ye=_.colorSpace===Hn?null:Ye.getPrimaries(_.colorSpace),ge=_.colorSpace===Hn||oe===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let J=g(_.image,!1,s.maxTextureSize);J=Se(_,J);const te=r.convert(_.format,_.colorSpace),Ce=r.convert(_.type);let Ae=b(_.internalFormat,te,Ce,_.colorSpace,_.isVideoTexture);Xe(X,_);let he;const De=_.mipmaps,P=_.isVideoTexture!==!0,le=_e.__version===void 0||$===!0,ie=k.dataReady,se=C(_,J);if(_.isDepthTexture)Ae=A(_.format===os,_.type),le&&(P?t.texStorage2D(i.TEXTURE_2D,1,Ae,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,Ae,J.width,J.height,0,te,Ce,null));else if(_.isDataTexture)if(De.length>0){P&&le&&t.texStorage2D(i.TEXTURE_2D,se,Ae,De[0].width,De[0].height);for(let Q=0,j=De.length;Q<j;Q++)he=De[Q],P?ie&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,te,Ce,he.data):t.texImage2D(i.TEXTURE_2D,Q,Ae,he.width,he.height,0,te,Ce,he.data);_.generateMipmaps=!1}else P?(le&&t.texStorage2D(i.TEXTURE_2D,se,Ae,J.width,J.height),ie&&rt(_,J,te,Ce)):t.texImage2D(i.TEXTURE_2D,0,Ae,J.width,J.height,0,te,Ce,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){P&&le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Ae,De[0].width,De[0].height,J.depth);for(let Q=0,j=De.length;Q<j;Q++)if(he=De[Q],_.format!==ln)if(te!==null)if(P){if(ie)if(_.layerUpdates.size>0){const fe=Go(he.width,he.height,_.format,_.type);for(const Ue of _.layerUpdates){const ot=he.data.subarray(Ue*fe/he.data.BYTES_PER_ELEMENT,(Ue+1)*fe/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,Ue,he.width,he.height,1,te,ot)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,J.depth,te,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,Ae,he.width,he.height,J.depth,0,he.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?ie&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,he.width,he.height,J.depth,te,Ce,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,Ae,he.width,he.height,J.depth,0,te,Ce,he.data)}else{P&&le&&t.texStorage2D(i.TEXTURE_2D,se,Ae,De[0].width,De[0].height);for(let Q=0,j=De.length;Q<j;Q++)he=De[Q],_.format!==ln?te!==null?P?ie&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,te,he.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,Ae,he.width,he.height,0,he.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?ie&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,he.width,he.height,te,Ce,he.data):t.texImage2D(i.TEXTURE_2D,Q,Ae,he.width,he.height,0,te,Ce,he.data)}else if(_.isDataArrayTexture)if(P){if(le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,Ae,J.width,J.height,J.depth),ie)if(_.layerUpdates.size>0){const Q=Go(J.width,J.height,_.format,_.type);for(const j of _.layerUpdates){const fe=J.data.subarray(j*Q/J.data.BYTES_PER_ELEMENT,(j+1)*Q/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,J.width,J.height,1,te,Ce,fe)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,te,Ce,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,J.width,J.height,J.depth,0,te,Ce,J.data);else if(_.isData3DTexture)P?(le&&t.texStorage3D(i.TEXTURE_3D,se,Ae,J.width,J.height,J.depth),ie&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,te,Ce,J.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,J.width,J.height,J.depth,0,te,Ce,J.data);else if(_.isFramebufferTexture){if(le)if(P)t.texStorage2D(i.TEXTURE_2D,se,Ae,J.width,J.height);else{let Q=J.width,j=J.height;for(let fe=0;fe<se;fe++)t.texImage2D(i.TEXTURE_2D,fe,Ae,Q,j,0,te,Ce,null),Q>>=1,j>>=1}}else if(De.length>0){if(P&&le){const Q=Ne(De[0]);t.texStorage2D(i.TEXTURE_2D,se,Ae,Q.width,Q.height)}for(let Q=0,j=De.length;Q<j;Q++)he=De[Q],P?ie&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,te,Ce,he):t.texImage2D(i.TEXTURE_2D,Q,Ae,te,Ce,he);_.generateMipmaps=!1}else if(P){if(le){const Q=Ne(J);t.texStorage2D(i.TEXTURE_2D,se,Ae,Q.width,Q.height)}ie&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,te,Ce,J)}else t.texImage2D(i.TEXTURE_2D,0,Ae,te,Ce,J);m(_)&&p(X),_e.__version=k.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function K(T,_,F){if(_.image.length!==6)return;const X=Ze(T,_),$=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const k=n.get($);if($.version!==k.__version||X===!0){t.activeTexture(i.TEXTURE0+F);const _e=Ye.getPrimaries(Ye.workingColorSpace),oe=_.colorSpace===Hn?null:Ye.getPrimaries(_.colorSpace),ye=_.colorSpace===Hn||_e===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const ge=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,te=[];for(let j=0;j<6;j++)!ge&&!J?te[j]=g(_.image[j],!0,s.maxCubemapSize):te[j]=J?_.image[j].image:_.image[j],te[j]=Se(_,te[j]);const Ce=te[0],Ae=r.convert(_.format,_.colorSpace),he=r.convert(_.type),De=b(_.internalFormat,Ae,he,_.colorSpace),P=_.isVideoTexture!==!0,le=k.__version===void 0||X===!0,ie=$.dataReady;let se=C(_,Ce);Xe(i.TEXTURE_CUBE_MAP,_);let Q;if(ge){P&&le&&t.texStorage2D(i.TEXTURE_CUBE_MAP,se,De,Ce.width,Ce.height);for(let j=0;j<6;j++){Q=te[j].mipmaps;for(let fe=0;fe<Q.length;fe++){const Ue=Q[fe];_.format!==ln?Ae!==null?P?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,0,0,Ue.width,Ue.height,Ae,Ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,De,Ue.width,Ue.height,0,Ue.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,0,0,Ue.width,Ue.height,Ae,he,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe,De,Ue.width,Ue.height,0,Ae,he,Ue.data)}}}else{if(Q=_.mipmaps,P&&le){Q.length>0&&se++;const j=Ne(te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,se,De,j.width,j.height)}for(let j=0;j<6;j++)if(J){P?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,te[j].width,te[j].height,Ae,he,te[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,De,te[j].width,te[j].height,0,Ae,he,te[j].data);for(let fe=0;fe<Q.length;fe++){const ot=Q[fe].image[j].image;P?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,0,0,ot.width,ot.height,Ae,he,ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,De,ot.width,ot.height,0,Ae,he,ot.data)}}else{P?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ae,he,te[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,De,Ae,he,te[j]);for(let fe=0;fe<Q.length;fe++){const Ue=Q[fe];P?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,0,0,Ae,he,Ue.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,fe+1,De,Ae,he,Ue.image[j])}}}m(_)&&p(i.TEXTURE_CUBE_MAP),k.__version=$.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function de(T,_,F,X,$,k){const _e=r.convert(F.format,F.colorSpace),oe=r.convert(F.type),ye=b(F.internalFormat,_e,oe,F.colorSpace),ge=n.get(_),J=n.get(F);if(J.__renderTarget=_,!ge.__hasExternalTextures){const te=Math.max(1,_.width>>k),Ce=Math.max(1,_.height>>k);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,k,ye,te,Ce,_.depth,0,_e,oe,null):t.texImage2D($,k,ye,te,Ce,0,_e,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,$,J.__webglTexture,0,at(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,$,J.__webglTexture,k),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(T,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){const X=_.depthTexture,$=X&&X.isDepthTexture?X.type:null,k=A(_.stencilBuffer,$),_e=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=at(_);me(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,k,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,k,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,k,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,T)}else{const X=_.textures;for(let $=0;$<X.length;$++){const k=X[$],_e=r.convert(k.format,k.colorSpace),oe=r.convert(k.type),ye=b(k.internalFormat,_e,oe,k.colorSpace),ge=at(_);F&&me(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,ye,_.width,_.height):me(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge,ye,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ye,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(_.depthTexture);X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H(_.depthTexture,0);const $=X.__webglTexture,k=at(_);if(_.depthTexture.format===as)me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(_.depthTexture.format===os)me(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function ke(T){const _=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const X=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),X){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,X.removeEventListener("dispose",$)};X.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=X}if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const X=T.texture.mipmaps;X&&X.length>0?ve(_.__webglFramebuffer[0],T):ve(_.__webglFramebuffer,T)}else if(F){_.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[X]),_.__webglDepthbuffer[X]===void 0)_.__webglDepthbuffer[X]=i.createRenderbuffer(),Fe(_.__webglDepthbuffer[X],T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=_.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,k)}}else{const X=T.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Fe(_.__webglDepthbuffer,T,!1);else{const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,k)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(T,_,F){const X=n.get(T);_!==void 0&&de(X.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&ke(T)}function Ve(T){const _=T.texture,F=n.get(T),X=n.get(_);T.addEventListener("dispose",w);const $=T.textures,k=T.isWebGLCubeRenderTarget===!0,_e=$.length>1;if(_e||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=_.version,a.memory.textures++),k){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let ye=0;ye<_.mipmaps.length;ye++)F.__webglFramebuffer[oe][ye]=i.createFramebuffer()}else F.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<_.mipmaps.length;oe++)F.__webglFramebuffer[oe]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(_e)for(let oe=0,ye=$.length;oe<ye;oe++){const ge=n.get($[oe]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&me(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let oe=0;oe<$.length;oe++){const ye=$[oe];F.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[oe]);const ge=r.convert(ye.format,ye.colorSpace),J=r.convert(ye.type),te=b(ye.internalFormat,ge,J,ye.colorSpace,T.isXRRenderTarget===!0),Ce=at(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,te,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,F.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Fe(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(k){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Xe(i.TEXTURE_CUBE_MAP,_);for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0)for(let ye=0;ye<_.mipmaps.length;ye++)de(F.__webglFramebuffer[oe][ye],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye);else de(F.__webglFramebuffer[oe],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(_)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let oe=0,ye=$.length;oe<ye;oe++){const ge=$[oe],J=n.get(ge);let te=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(te=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,J.__webglTexture),Xe(te,ge),de(F.__webglFramebuffer,T,ge,i.COLOR_ATTACHMENT0+oe,te,0),m(ge)&&p(te)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(oe=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,X.__webglTexture),Xe(oe,_),_.mipmaps&&_.mipmaps.length>0)for(let ye=0;ye<_.mipmaps.length;ye++)de(F.__webglFramebuffer[ye],T,_,i.COLOR_ATTACHMENT0,oe,ye);else de(F.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,oe,0);m(_)&&p(oe),t.unbindTexture()}T.depthBuffer&&ke(T)}function lt(T){const _=T.textures;for(let F=0,X=_.length;F<X;F++){const $=_[F];if(m($)){const k=E(T),_e=n.get($).__webglTexture;t.bindTexture(k,_e),p(k),t.unbindTexture()}}}const R=[],He=[];function Ge(T){if(T.samples>0){if(me(T)===!1){const _=T.textures,F=T.width,X=T.height;let $=i.COLOR_BUFFER_BIT;const k=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(T),oe=_.length>1;if(oe)for(let ge=0;ge<_.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const ye=T.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let ge=0;ge<_.length;ge++){if(T.resolveDepthBuffer&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const J=n.get(_[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,F,X,0,0,F,X,$,i.NEAREST),c===!0&&(R.length=0,He.length=0,R.push(i.COLOR_ATTACHMENT0+ge),T.depthBuffer&&T.resolveDepthBuffer===!1&&(R.push(k),He.push(k),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,He)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,R))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let ge=0;ge<_.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const J=n.get(_[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function at(T){return Math.min(s.maxSamples,T.samples)}function me(T){const _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ct(T){const _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function Se(T,_){const F=T.colorSpace,X=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Oi&&F!==Hn&&(Ye.getTransfer(F)===Ke?(X!==ln||$!==Dn)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):mt("WebGLTextures: Unsupported texture color space:",F)),_}function Ne(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.setTexture2D=H,this.setTexture2DArray=Y,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=Tt,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=de,this.useMultisampledRTT=me}function qm(i,e){function t(n,s=Hn){let r;const a=Ye.getTransfer(s);if(n===Dn)return i.UNSIGNED_BYTE;if(n===ka)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ha)return i.UNSIGNED_SHORT_5_5_5_1;if(n===kl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Hl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zl)return i.BYTE;if(n===Vl)return i.SHORT;if(n===ss)return i.UNSIGNED_SHORT;if(n===Va)return i.INT;if(n===oi)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===mn)return i.HALF_FLOAT;if(n===Gl)return i.ALPHA;if(n===Wl)return i.RGB;if(n===ln)return i.RGBA;if(n===as)return i.DEPTH_COMPONENT;if(n===os)return i.DEPTH_STENCIL;if(n===Xl)return i.RED;if(n===Ga)return i.RED_INTEGER;if(n===Wa)return i.RG;if(n===Xa)return i.RG_INTEGER;if(n===qa)return i.RGBA_INTEGER;if(n===qs||n===Ys||n===js||n===$s)if(a===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sa||n===ra||n===aa||n===oa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===la||n===ca||n===ha)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===la||n===ca)return a===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ha)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ua||n===da||n===fa||n===pa||n===ma||n===xa||n===ga||n===_a||n===va||n===Ma||n===Sa||n===ba||n===ya||n===Ea)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ua)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===da)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ma)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ga)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_a)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===va)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ma)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Sa)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ba)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ya)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ea)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ta||n===Aa||n===wa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ta)return a===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Aa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ca||n===Ra||n===Pa||n===Da)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ca)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Da)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Ym=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jm=`
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

}`;class $m{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ic(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new St({vertexShader:Ym,fragmentShader:jm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ln(new or(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Km extends ci{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,x=null;const g=typeof XRWebGLBinding<"u",m=new $m,p={},E=t.getContextAttributes();let b=null,A=null;const C=[],y=[],w=new Te;let U=null;const S=new Qt;S.viewport=new _t;const M=new Qt;M.viewport=new _t;const L=[S,M],O=new du;let V=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let K=C[q];return K===void 0&&(K=new Ur,C[q]=K),K.getTargetRaySpace()},this.getControllerGrip=function(q){let K=C[q];return K===void 0&&(K=new Ur,C[q]=K),K.getGripSpace()},this.getHand=function(q){let K=C[q];return K===void 0&&(K=new Ur,C[q]=K),K.getHandSpace()};function H(q){const K=y.indexOf(q.inputSource);if(K===-1)return;const de=C[K];de!==void 0&&(de.update(q.inputSource,q.frame,l||a),de.dispatchEvent({type:q.type,data:q.inputSource}))}function Y(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Z);for(let q=0;q<C.length;q++){const K=y[q];K!==null&&(y[q]=null,C[q].disconnect(K))}V=null,W=null,m.reset();for(const q in p)delete p[q];e.setRenderTarget(b),f=null,d=null,u=null,s=null,A=null,rt.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Z),E.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(w),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Fe=null,ve=null;E.depth&&(ve=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=E.stencil?os:as,Fe=E.stencil?rs:oi);const ke={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ke),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),A=new cn(d.textureWidth,d.textureHeight,{format:ln,type:Dn,depthTexture:new nc(d.textureWidth,d.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const de={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),A=new cn(f.framebufferWidth,f.framebufferHeight,{format:ln,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),rt.setContext(s),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(q){for(let K=0;K<q.removed.length;K++){const de=q.removed[K],Fe=y.indexOf(de);Fe>=0&&(y[Fe]=null,C[Fe].disconnect(de))}for(let K=0;K<q.added.length;K++){const de=q.added[K];let Fe=y.indexOf(de);if(Fe===-1){for(let ke=0;ke<C.length;ke++)if(ke>=y.length){y.push(de),Fe=ke;break}else if(y[ke]===null){y[ke]=de,Fe=ke;break}if(Fe===-1)break}const ve=C[Fe];ve&&ve.connect(de)}}const G=new D,ne=new D;function re(q,K,de){G.setFromMatrixPosition(K.matrixWorld),ne.setFromMatrixPosition(de.matrixWorld);const Fe=G.distanceTo(ne),ve=K.projectionMatrix.elements,ke=de.projectionMatrix.elements,Tt=ve[14]/(ve[10]-1),Ve=ve[14]/(ve[10]+1),lt=(ve[9]+1)/ve[5],R=(ve[9]-1)/ve[5],He=(ve[8]-1)/ve[0],Ge=(ke[8]+1)/ke[0],at=Tt*He,me=Tt*Ge,ct=Fe/(-He+Ge),Se=ct*-He;if(K.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Se),q.translateZ(ct),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ve[10]===-1)q.projectionMatrix.copy(K.projectionMatrix),q.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Ne=Tt+ct,T=Ve+ct,_=at-Se,F=me+(Fe-Se),X=lt*Ve/T*Ne,$=R*Ve/T*Ne;q.projectionMatrix.makePerspective(_,F,X,$,Ne,T),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function be(q,K){K===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(K.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let K=q.near,de=q.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(de=m.depthFar)),O.near=M.near=S.near=K,O.far=M.far=S.far=de,(V!==O.near||W!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),V=O.near,W=O.far),O.layers.mask=q.layers.mask|6,S.layers.mask=O.layers.mask&3,M.layers.mask=O.layers.mask&5;const Fe=q.parent,ve=O.cameras;be(O,Fe);for(let ke=0;ke<ve.length;ke++)be(ve[ke],Fe);ve.length===2?re(O,S,M):O.projectionMatrix.copy(S.projectionMatrix),Xe(q,O,Fe)};function Xe(q,K,de){de===null?q.matrix.copy(K.matrixWorld):(q.matrix.copy(de.matrixWorld),q.matrix.invert(),q.matrix.multiply(K.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(K.projectionMatrix),q.projectionMatrixInverse.copy(K.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=cs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(q){return p[q]};let Ze=null;function st(q,K){if(h=K.getViewerPose(l||a),x=K,h!==null){const de=h.views;f!==null&&(e.setRenderTargetFramebuffer(A,f.framebuffer),e.setRenderTarget(A));let Fe=!1;de.length!==O.cameras.length&&(O.cameras.length=0,Fe=!0);for(let Ve=0;Ve<de.length;Ve++){const lt=de[Ve];let R=null;if(f!==null)R=f.getViewport(lt);else{const Ge=u.getViewSubImage(d,lt);R=Ge.viewport,Ve===0&&(e.setRenderTargetTextures(A,Ge.colorTexture,Ge.depthStencilTexture),e.setRenderTarget(A))}let He=L[Ve];He===void 0&&(He=new Qt,He.layers.enable(Ve),He.viewport=new _t,L[Ve]=He),He.matrix.fromArray(lt.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(lt.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(R.x,R.y,R.width,R.height),Ve===0&&(O.matrix.copy(He.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Fe===!0&&O.cameras.push(He)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const Ve=u.getDepthInformation(de[0]);Ve&&Ve.isValid&&Ve.texture&&m.init(Ve,s.renderState)}if(ve&&ve.includes("camera-access")&&g){e.state.unbindTexture(),u=n.getBinding();for(let Ve=0;Ve<de.length;Ve++){const lt=de[Ve].camera;if(lt){let R=p[lt];R||(R=new ic,p[lt]=R);const He=u.getCameraImage(lt);R.sourceTexture=He}}}}for(let de=0;de<C.length;de++){const Fe=y[de],ve=C[de];Fe!==null&&ve!==void 0&&ve.update(Fe,K,l||a)}Ze&&Ze(q,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),x=null}const rt=new rc;rt.setAnimationLoop(st),this.setAnimationLoop=function(q){Ze=q},this.dispose=function(){}}}const ei=new gn,Zm=new xt;function Jm(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Jl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,b,A){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,A)):p.isMeshMatcapMaterial?(r(m,p),x(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),g(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,E,b):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===zt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===zt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p),b=E.envMap,A=E.envMapRotation;b&&(m.envMap.value=b,ei.copy(A),ei.x*=-1,ei.y*=-1,ei.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),m.envMapRotation.value.setFromMatrix4(Zm.makeRotationFromEuler(ei)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===zt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Qm(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,b){const A=b.program;n.uniformBlockBinding(E,A)}function l(E,b){let A=s[E.id];A===void 0&&(x(E),A=h(E),s[E.id]=A,E.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(E,C);const y=e.render.frame;r[E.id]!==y&&(d(E),r[E.id]=y)}function h(E){const b=u();E.__bindingPointIndex=b;const A=i.createBuffer(),C=E.__size,y=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,A),A}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const b=s[E.id],A=E.uniforms,C=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let y=0,w=A.length;y<w;y++){const U=Array.isArray(A[y])?A[y]:[A[y]];for(let S=0,M=U.length;S<M;S++){const L=U[S];if(f(L,y,S,C)===!0){const O=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let W=0;for(let H=0;H<V.length;H++){const Y=V[H],Z=g(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,O+W,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,W),W+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,b,A,C){const y=E.value,w=b+"_"+A;if(C[w]===void 0)return typeof y=="number"||typeof y=="boolean"?C[w]=y:C[w]=y.clone(),!0;{const U=C[w];if(typeof y=="number"||typeof y=="boolean"){if(U!==y)return C[w]=y,!0}else if(U.equals(y)===!1)return U.copy(y),!0}return!1}function x(E){const b=E.uniforms;let A=0;const C=16;for(let w=0,U=b.length;w<U;w++){const S=Array.isArray(b[w])?b[w]:[b[w]];for(let M=0,L=S.length;M<L;M++){const O=S[M],V=Array.isArray(O.value)?O.value:[O.value];for(let W=0,H=V.length;W<H;W++){const Y=V[W],Z=g(Y),G=A%C,ne=G%Z.boundary,re=G+ne;A+=ne,re!==0&&C-re<Z.storage&&(A+=C-re),O.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=A,A+=Z.storage}}}const y=A%C;return y>0&&(A+=C-y),E.__size=A,E.__cache={},this}function g(E){const b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Le("WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){const b=E.target;b.removeEventListener("dispose",m);const A=a.indexOf(b.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}const e0=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let yn=null;function t0(){return yn===null&&(yn=new eu(e0,32,32,Wa,mn),yn.minFilter=en,yn.magFilter=en,yn.wrapS=wn,yn.wrapT=wn,yn.generateMipmaps=!1,yn.needsUpdate=!0),yn}class n0{constructor(e={}){const{canvas:t=dh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const x=new Set([qa,Xa,Ga]),g=new Set([Dn,oi,ss,rs,ka,Ha]),m=new Uint32Array(4),p=new Int32Array(4);let E=null,b=null;const A=[],C=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let w=!1;this._outputColorSpace=Xt;let U=0,S=0,M=null,L=-1,O=null;const V=new _t,W=new _t;let H=null;const Y=new xe(0);let Z=0,G=t.width,ne=t.height,re=1,be=null,Xe=null;const Ze=new _t(0,0,G,ne),st=new _t(0,0,G,ne);let rt=!1;const q=new tc;let K=!1,de=!1;const Fe=new xt,ve=new D,ke=new _t,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function lt(){return M===null?re:1}let R=n;function He(v,I){return t.getContext(v,I)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${za}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",fe,!1),R===null){const I="webgl2";if(R=He(I,v),R===null)throw He(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw v("WebGLRenderer: "+v.message),v}let Ge,at,me,ct,Se,Ne,T,_,F,X,$,k,_e,oe,ye,ge,J,te,Ce,Ae,he,De,P,le;function ie(){Ge=new hp(R),Ge.init(),De=new qm(R,Ge),at=new tp(R,Ge,e,De),me=new Wm(R,Ge),at.reversedDepthBuffer&&d&&me.buffers.depth.setReversed(!0),ct=new fp(R),Se=new Dm,Ne=new Xm(R,Ge,me,Se,at,De,ct),T=new ip(y),_=new cp(y),F=new xu(R),P=new Qf(R,F),X=new up(R,F,ct,P),$=new mp(R,X,F,ct),Ce=new pp(R,at,Ne),ge=new np(Se),k=new Pm(y,T,_,Ge,at,P,ge),_e=new Jm(y,Se),oe=new Im,ye=new zm(Ge),te=new Jf(y,T,_,me,$,f,c),J=new Hm(y,$,at),le=new Qm(R,ct,at,me),Ae=new ep(R,Ge,ct),he=new dp(R,Ge,ct),ct.programs=k.programs,y.capabilities=at,y.extensions=Ge,y.properties=Se,y.renderLists=oe,y.shadowMap=J,y.state=me,y.info=ct}ie();const se=new Km(y,R);this.xr=se,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const v=Ge.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ge.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(v){v!==void 0&&(re=v,this.setSize(G,ne,!1))},this.getSize=function(v){return v.set(G,ne)},this.setSize=function(v,I,B=!0){if(se.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,ne=I,t.width=Math.floor(v*re),t.height=Math.floor(I*re),B===!0&&(t.style.width=v+"px",t.style.height=I+"px"),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(G*re,ne*re).floor()},this.setDrawingBufferSize=function(v,I,B){G=v,ne=I,re=B,t.width=Math.floor(v*B),t.height=Math.floor(I*B),this.setViewport(0,0,v,I)},this.getCurrentViewport=function(v){return v.copy(V)},this.getViewport=function(v){return v.copy(Ze)},this.setViewport=function(v,I,B,z){v.isVector4?Ze.set(v.x,v.y,v.z,v.w):Ze.set(v,I,B,z),me.viewport(V.copy(Ze).multiplyScalar(re).round())},this.getScissor=function(v){return v.copy(st)},this.setScissor=function(v,I,B,z){v.isVector4?st.set(v.x,v.y,v.z,v.w):st.set(v,I,B,z),me.scissor(W.copy(st).multiplyScalar(re).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(v){me.setScissorTest(rt=v)},this.setOpaqueSort=function(v){be=v},this.setTransparentSort=function(v){Xe=v},this.getClearColor=function(v){return v.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(v=!0,I=!0,B=!0){let z=0;if(v){let N=!1;if(M!==null){const ee=M.texture.format;N=x.has(ee)}if(N){const ee=M.texture.type,ce=g.has(ee),pe=te.getClearColor(),ue=te.getClearAlpha(),we=pe.r,Re=pe.g,Me=pe.b;ce?(m[0]=we,m[1]=Re,m[2]=Me,m[3]=ue,R.clearBufferuiv(R.COLOR,0,m)):(p[0]=we,p[1]=Re,p[2]=Me,p[3]=ue,R.clearBufferiv(R.COLOR,0,p))}else z|=R.COLOR_BUFFER_BIT}I&&(z|=R.DEPTH_BUFFER_BIT),B&&(z|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),te.dispose(),oe.dispose(),ye.dispose(),Se.dispose(),T.dispose(),_.dispose(),$.dispose(),P.dispose(),le.dispose(),k.dispose(),se.dispose(),se.removeEventListener("sessionstart",to),se.removeEventListener("sessionend",no),Yn.stop()};function Q(v){v.preventDefault(),xo("WebGLRenderer: Context Lost."),w=!0}function j(){xo("WebGLRenderer: Context Restored."),w=!1;const v=ct.autoReset,I=J.enabled,B=J.autoUpdate,z=J.needsUpdate,N=J.type;ie(),ct.autoReset=v,J.enabled=I,J.autoUpdate=B,J.needsUpdate=z,J.type=N}function fe(v){mt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ue(v){const I=v.target;I.removeEventListener("dispose",Ue),ot(I)}function ot(v){Je(v),Se.remove(v)}function Je(v){const I=Se.get(v).programs;I!==void 0&&(I.forEach(function(B){k.releaseProgram(B)}),v.isShaderMaterial&&k.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,B,z,N,ee){I===null&&(I=Tt);const ce=N.isMesh&&N.matrixWorld.determinant()<0,pe=Tc(v,I,B,z,N);me.setMaterial(z,ce);let ue=B.index,we=1;if(z.wireframe===!0){if(ue=X.getWireframeAttribute(B),ue===void 0)return;we=2}const Re=B.drawRange,Me=B.attributes.position;let We=Re.start*we,Qe=(Re.start+Re.count)*we;ee!==null&&(We=Math.max(We,ee.start*we),Qe=Math.min(Qe,(ee.start+ee.count)*we)),ue!==null?(We=Math.max(We,0),Qe=Math.min(Qe,ue.count)):Me!=null&&(We=Math.max(We,0),Qe=Math.min(Qe,Me.count));const ft=Qe-We;if(ft<0||ft===1/0)return;P.setup(N,z,pe,B,ue);let pt,nt=Ae;if(ue!==null&&(pt=F.get(ue),nt=he,nt.setIndex(pt)),N.isMesh)z.wireframe===!0?(me.setLineWidth(z.wireframeLinewidth*lt()),nt.setMode(R.LINES)):nt.setMode(R.TRIANGLES);else if(N.isLine){let Ee=z.linewidth;Ee===void 0&&(Ee=1),me.setLineWidth(Ee*lt()),N.isLineSegments?nt.setMode(R.LINES):N.isLineLoop?nt.setMode(R.LINE_LOOP):nt.setMode(R.LINE_STRIP)}else N.isPoints?nt.setMode(R.POINTS):N.isSprite&&nt.setMode(R.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ls("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))nt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ee=N._multiDrawStarts,ht=N._multiDrawCounts,je=N._multiDrawCount,Vt=ue?F.get(ue).bytesPerElement:1,ui=Se.get(z).currentProgram.getUniforms();for(let kt=0;kt<je;kt++)ui.setValue(R,"_gl_DrawID",kt),nt.render(Ee[kt]/Vt,ht[kt])}else if(N.isInstancedMesh)nt.renderInstances(We,ft,N.count);else if(B.isInstancedBufferGeometry){const Ee=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ht=Math.min(B.instanceCount,Ee);nt.renderInstances(We,ft,ht)}else nt.render(We,ft)};function hn(v,I,B){v.transparent===!0&&v.side===An&&v.forceSinglePass===!1?(v.side=zt,v.needsUpdate=!0,xs(v,I,B),v.side=Xn,v.needsUpdate=!0,xs(v,I,B),v.side=An):xs(v,I,B)}this.compile=function(v,I,B=null){B===null&&(B=v),b=ye.get(B),b.init(I),C.push(b),B.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(b.pushLight(N),N.castShadow&&b.pushShadow(N))}),v!==B&&v.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(b.pushLight(N),N.castShadow&&b.pushShadow(N))}),b.setupLights();const z=new Set;return v.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ee=N.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){const pe=ee[ce];hn(pe,B,N),z.add(pe)}else hn(ee,B,N),z.add(ee)}),b=C.pop(),z},this.compileAsync=function(v,I,B=null){const z=this.compile(v,I,B);return new Promise(N=>{function ee(){if(z.forEach(function(ce){Se.get(ce).currentProgram.isReady()&&z.delete(ce)}),z.size===0){N(v);return}setTimeout(ee,10)}Ge.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let tn=null;function Ec(v){tn&&tn(v)}function to(){Yn.stop()}function no(){Yn.start()}const Yn=new rc;Yn.setAnimationLoop(Ec),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(v){tn=v,se.setAnimationLoop(v),v===null?Yn.stop():Yn.start()},se.addEventListener("sessionstart",to),se.addEventListener("sessionend",no),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(I),I=se.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,I,M),b=ye.get(v,C.length),b.init(I),C.push(b),Fe.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(Fe,dn,I.reversedDepth),de=this.localClippingEnabled,K=ge.init(this.clippingPlanes,de),E=oe.get(v,A.length),E.init(),A.push(E),se.enabled===!0&&se.isPresenting===!0){const ee=y.xr.getDepthSensingMesh();ee!==null&&ur(ee,I,-1/0,y.sortObjects)}ur(v,I,0,y.sortObjects),E.finish(),y.sortObjects===!0&&E.sort(be,Xe),Ve=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ve&&te.addToRenderList(E,v),this.info.render.frame++,K===!0&&ge.beginShadows();const B=b.state.shadowsArray;J.render(B,v,I),K===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=E.opaque,N=E.transmissive;if(b.setupLights(),I.isArrayCamera){const ee=I.cameras;if(N.length>0)for(let ce=0,pe=ee.length;ce<pe;ce++){const ue=ee[ce];so(z,N,v,ue)}Ve&&te.render(v);for(let ce=0,pe=ee.length;ce<pe;ce++){const ue=ee[ce];io(E,v,ue,ue.viewport)}}else N.length>0&&so(z,N,v,I),Ve&&te.render(v),io(E,v,I);M!==null&&S===0&&(Ne.updateMultisampleRenderTarget(M),Ne.updateRenderTargetMipmap(M)),v.isScene===!0&&v.onAfterRender(y,v,I),P.resetDefaultState(),L=-1,O=null,C.pop(),C.length>0?(b=C[C.length-1],K===!0&&ge.setGlobalState(y.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?E=A[A.length-1]:E=null};function ur(v,I,B,z){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)B=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLight)b.pushLight(v),v.castShadow&&b.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||q.intersectsSprite(v)){z&&ke.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Fe);const ce=$.update(v),pe=v.material;pe.visible&&E.push(v,ce,pe,B,ke.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||q.intersectsObject(v))){const ce=$.update(v),pe=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ke.copy(v.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),ke.copy(ce.boundingSphere.center)),ke.applyMatrix4(v.matrixWorld).applyMatrix4(Fe)),Array.isArray(pe)){const ue=ce.groups;for(let we=0,Re=ue.length;we<Re;we++){const Me=ue[we],We=pe[Me.materialIndex];We&&We.visible&&E.push(v,ce,We,B,ke.z,Me)}}else pe.visible&&E.push(v,ce,pe,B,ke.z,null)}}const ee=v.children;for(let ce=0,pe=ee.length;ce<pe;ce++)ur(ee[ce],I,B,z)}function io(v,I,B,z){const{opaque:N,transmissive:ee,transparent:ce}=v;b.setupLightsView(B),K===!0&&ge.setGlobalState(y.clippingPlanes,B),z&&me.viewport(V.copy(z)),N.length>0&&ms(N,I,B),ee.length>0&&ms(ee,I,B),ce.length>0&&ms(ce,I,B),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function so(v,I,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;b.state.transmissionRenderTarget[z.id]===void 0&&(b.state.transmissionRenderTarget[z.id]=new cn(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?mn:Dn,minFilter:ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace}));const ee=b.state.transmissionRenderTarget[z.id],ce=z.viewport||V;ee.setSize(ce.z*y.transmissionResolutionScale,ce.w*y.transmissionResolutionScale);const pe=y.getRenderTarget(),ue=y.getActiveCubeFace(),we=y.getActiveMipmapLevel();y.setRenderTarget(ee),y.getClearColor(Y),Z=y.getClearAlpha(),Z<1&&y.setClearColor(16777215,.5),y.clear(),Ve&&te.render(B);const Re=y.toneMapping;y.toneMapping=Wn;const Me=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),b.setupLightsView(z),K===!0&&ge.setGlobalState(y.clippingPlanes,z),ms(v,B,z),Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Qe=0,ft=I.length;Qe<ft;Qe++){const pt=I[Qe],{object:nt,geometry:Ee,material:ht,group:je}=pt;if(ht.side===An&&nt.layers.test(z.layers)){const Vt=ht.side;ht.side=zt,ht.needsUpdate=!0,ro(nt,B,z,Ee,ht,je),ht.side=Vt,ht.needsUpdate=!0,We=!0}}We===!0&&(Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee))}y.setRenderTarget(pe,ue,we),y.setClearColor(Y,Z),Me!==void 0&&(z.viewport=Me),y.toneMapping=Re}function ms(v,I,B){const z=I.isScene===!0?I.overrideMaterial:null;for(let N=0,ee=v.length;N<ee;N++){const ce=v[N],{object:pe,geometry:ue,group:we}=ce;let Re=ce.material;Re.allowOverride===!0&&z!==null&&(Re=z),pe.layers.test(B.layers)&&ro(pe,I,B,ue,Re,we)}}function ro(v,I,B,z,N,ee){v.onBeforeRender(y,I,B,z,N,ee),v.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),N.onBeforeRender(y,I,B,z,v,ee),N.transparent===!0&&N.side===An&&N.forceSinglePass===!1?(N.side=zt,N.needsUpdate=!0,y.renderBufferDirect(B,I,z,N,v,ee),N.side=Xn,N.needsUpdate=!0,y.renderBufferDirect(B,I,z,N,v,ee),N.side=An):y.renderBufferDirect(B,I,z,N,v,ee),v.onAfterRender(y,I,B,z,N,ee)}function xs(v,I,B){I.isScene!==!0&&(I=Tt);const z=Se.get(v),N=b.state.lights,ee=b.state.shadowsArray,ce=N.state.version,pe=k.getParameters(v,N.state,ee,I,B),ue=k.getProgramCacheKey(pe);let we=z.programs;z.environment=v.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(v.isMeshStandardMaterial?_:T).get(v.envMap||z.environment),z.envMapRotation=z.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,we===void 0&&(v.addEventListener("dispose",Ue),we=new Map,z.programs=we);let Re=we.get(ue);if(Re!==void 0){if(z.currentProgram===Re&&z.lightsStateVersion===ce)return oo(v,pe),Re}else pe.uniforms=k.getUniforms(v),v.onBeforeCompile(pe,y),Re=k.acquireProgram(pe,ue),we.set(ue,Re),z.uniforms=pe.uniforms;const Me=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Me.clippingPlanes=ge.uniform),oo(v,pe),z.needsLights=wc(v),z.lightsStateVersion=ce,z.needsLights&&(Me.ambientLightColor.value=N.state.ambient,Me.lightProbe.value=N.state.probe,Me.directionalLights.value=N.state.directional,Me.directionalLightShadows.value=N.state.directionalShadow,Me.spotLights.value=N.state.spot,Me.spotLightShadows.value=N.state.spotShadow,Me.rectAreaLights.value=N.state.rectArea,Me.ltc_1.value=N.state.rectAreaLTC1,Me.ltc_2.value=N.state.rectAreaLTC2,Me.pointLights.value=N.state.point,Me.pointLightShadows.value=N.state.pointShadow,Me.hemisphereLights.value=N.state.hemi,Me.directionalShadowMap.value=N.state.directionalShadowMap,Me.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Me.spotShadowMap.value=N.state.spotShadowMap,Me.spotLightMatrix.value=N.state.spotLightMatrix,Me.spotLightMap.value=N.state.spotLightMap,Me.pointShadowMap.value=N.state.pointShadowMap,Me.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Re,z.uniformsList=null,Re}function ao(v){if(v.uniformsList===null){const I=v.currentProgram.getUniforms();v.uniformsList=Ks.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function oo(v,I){const B=Se.get(v);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Tc(v,I,B,z,N){I.isScene!==!0&&(I=Tt),Ne.resetTextureUnits();const ee=I.fog,ce=z.isMeshStandardMaterial?I.environment:null,pe=M===null?y.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Oi,ue=(z.isMeshStandardMaterial?_:T).get(z.envMap||ce),we=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Re=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Me=!!B.morphAttributes.position,We=!!B.morphAttributes.normal,Qe=!!B.morphAttributes.color;let ft=Wn;z.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(ft=y.toneMapping);const pt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,nt=pt!==void 0?pt.length:0,Ee=Se.get(z),ht=b.state.lights;if(K===!0&&(de===!0||v!==O)){const Pt=v===O&&z.id===L;ge.setState(z,v,Pt)}let je=!1;z.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==ht.state.version||Ee.outputColorSpace!==pe||N.isBatchedMesh&&Ee.batching===!1||!N.isBatchedMesh&&Ee.batching===!0||N.isBatchedMesh&&Ee.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ee.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ee.instancing===!1||!N.isInstancedMesh&&Ee.instancing===!0||N.isSkinnedMesh&&Ee.skinning===!1||!N.isSkinnedMesh&&Ee.skinning===!0||N.isInstancedMesh&&Ee.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ee.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ee.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ee.instancingMorph===!1&&N.morphTexture!==null||Ee.envMap!==ue||z.fog===!0&&Ee.fog!==ee||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ge.numPlanes||Ee.numIntersection!==ge.numIntersection)||Ee.vertexAlphas!==we||Ee.vertexTangents!==Re||Ee.morphTargets!==Me||Ee.morphNormals!==We||Ee.morphColors!==Qe||Ee.toneMapping!==ft||Ee.morphTargetsCount!==nt)&&(je=!0):(je=!0,Ee.__version=z.version);let Vt=Ee.currentProgram;je===!0&&(Vt=xs(z,I,N));let ui=!1,kt=!1,Wi=!1;const ut=Vt.getUniforms(),Ft=Ee.uniforms;if(me.useProgram(Vt.program)&&(ui=!0,kt=!0,Wi=!0),z.id!==L&&(L=z.id,kt=!0),ui||O!==v){me.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ut.setValue(R,"projectionMatrix",v.projectionMatrix),ut.setValue(R,"viewMatrix",v.matrixWorldInverse);const Ot=ut.map.cameraPosition;Ot!==void 0&&Ot.setValue(R,ve.setFromMatrixPosition(v.matrixWorld)),at.logarithmicDepthBuffer&&ut.setValue(R,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(R,"isOrthographic",v.isOrthographicCamera===!0),O!==v&&(O=v,kt=!0,Wi=!0)}if(N.isSkinnedMesh){ut.setOptional(R,N,"bindMatrix"),ut.setOptional(R,N,"bindMatrixInverse");const Pt=N.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),ut.setValue(R,"boneTexture",Pt.boneTexture,Ne))}N.isBatchedMesh&&(ut.setOptional(R,N,"batchingTexture"),ut.setValue(R,"batchingTexture",N._matricesTexture,Ne),ut.setOptional(R,N,"batchingIdTexture"),ut.setValue(R,"batchingIdTexture",N._indirectTexture,Ne),ut.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&ut.setValue(R,"batchingColorTexture",N._colorsTexture,Ne));const $t=B.morphAttributes;if(($t.position!==void 0||$t.normal!==void 0||$t.color!==void 0)&&Ce.update(N,B,Vt),(kt||Ee.receiveShadow!==N.receiveShadow)&&(Ee.receiveShadow=N.receiveShadow,ut.setValue(R,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ft.envMap.value=ue,Ft.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(Ft.envMapIntensity.value=I.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=t0()),kt&&(ut.setValue(R,"toneMappingExposure",y.toneMappingExposure),Ee.needsLights&&Ac(Ft,Wi),ee&&z.fog===!0&&_e.refreshFogUniforms(Ft,ee),_e.refreshMaterialUniforms(Ft,z,re,ne,b.state.transmissionRenderTarget[v.id]),Ks.upload(R,ao(Ee),Ft,Ne)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ks.upload(R,ao(Ee),Ft,Ne),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(R,"center",N.center),ut.setValue(R,"modelViewMatrix",N.modelViewMatrix),ut.setValue(R,"normalMatrix",N.normalMatrix),ut.setValue(R,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Pt=z.uniformsGroups;for(let Ot=0,dr=Pt.length;Ot<dr;Ot++){const jn=Pt[Ot];le.update(jn,Vt),le.bind(jn,Vt)}}return Vt}function Ac(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function wc(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(v,I,B){const z=Se.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Se.get(v.texture).__webglTexture=I,Se.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,I){const B=Se.get(v);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0};const Cc=R.createFramebuffer();this.setRenderTarget=function(v,I=0,B=0){M=v,U=I,S=B;let z=!0,N=null,ee=!1,ce=!1;if(v){const ue=Se.get(v);if(ue.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(R.FRAMEBUFFER,null),z=!1;else if(ue.__webglFramebuffer===void 0)Ne.setupRenderTarget(v);else if(ue.__hasExternalTextures)Ne.rebindTextures(v,Se.get(v.texture).__webglTexture,Se.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Me=v.depthTexture;if(ue.__boundDepthTexture!==Me){if(Me!==null&&Se.has(Me)&&(v.width!==Me.image.width||v.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ne.setupDepthRenderbuffer(v)}}const we=v.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ce=!0);const Re=Se.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Re[I])?N=Re[I][B]:N=Re[I],ee=!0):v.samples>0&&Ne.useMultisampledRTT(v)===!1?N=Se.get(v).__webglMultisampledFramebuffer:Array.isArray(Re)?N=Re[B]:N=Re,V.copy(v.viewport),W.copy(v.scissor),H=v.scissorTest}else V.copy(Ze).multiplyScalar(re).floor(),W.copy(st).multiplyScalar(re).floor(),H=rt;if(B!==0&&(N=Cc),me.bindFramebuffer(R.FRAMEBUFFER,N)&&z&&me.drawBuffers(v,N),me.viewport(V),me.scissor(W),me.setScissorTest(H),ee){const ue=Se.get(v.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+I,ue.__webglTexture,B)}else if(ce){const ue=I;for(let we=0;we<v.textures.length;we++){const Re=Se.get(v.textures[we]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+we,Re.__webglTexture,B,ue)}}else if(v!==null&&B!==0){const ue=Se.get(v.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ue.__webglTexture,B)}L=-1},this.readRenderTargetPixels=function(v,I,B,z,N,ee,ce,pe=0){if(!(v&&v.isWebGLRenderTarget)){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=Se.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue){me.bindFramebuffer(R.FRAMEBUFFER,ue);try{const we=v.textures[pe],Re=we.format,Me=we.type;if(!at.textureFormatReadable(Re)){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(Me)){mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-z&&B>=0&&B<=v.height-N&&(v.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pe),R.readPixels(I,B,z,N,De.convert(Re),De.convert(Me),ee))}finally{const we=M!==null?Se.get(M).__webglFramebuffer:null;me.bindFramebuffer(R.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(v,I,B,z,N,ee,ce,pe=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=Se.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue)if(I>=0&&I<=v.width-z&&B>=0&&B<=v.height-N){me.bindFramebuffer(R.FRAMEBUFFER,ue);const we=v.textures[pe],Re=we.format,Me=we.type;if(!at.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(Me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,We),R.bufferData(R.PIXEL_PACK_BUFFER,ee.byteLength,R.STREAM_READ),v.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pe),R.readPixels(I,B,z,N,De.convert(Re),De.convert(Me),0);const Qe=M!==null?Se.get(M).__webglFramebuffer:null;me.bindFramebuffer(R.FRAMEBUFFER,Qe);const ft=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await fh(R,ft,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,We),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ee),R.deleteBuffer(We),R.deleteSync(ft),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,I=null,B=0){const z=Math.pow(2,-B),N=Math.floor(v.image.width*z),ee=Math.floor(v.image.height*z),ce=I!==null?I.x:0,pe=I!==null?I.y:0;Ne.setTexture2D(v,0),R.copyTexSubImage2D(R.TEXTURE_2D,B,0,0,ce,pe,N,ee),me.unbindTexture()};const Rc=R.createFramebuffer(),Pc=R.createFramebuffer();this.copyTextureToTexture=function(v,I,B=null,z=null,N=0,ee=null){ee===null&&(N!==0?(ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=N,N=0):ee=0);let ce,pe,ue,we,Re,Me,We,Qe,ft;const pt=v.isCompressedTexture?v.mipmaps[ee]:v.image;if(B!==null)ce=B.max.x-B.min.x,pe=B.max.y-B.min.y,ue=B.isBox3?B.max.z-B.min.z:1,we=B.min.x,Re=B.min.y,Me=B.isBox3?B.min.z:0;else{const $t=Math.pow(2,-N);ce=Math.floor(pt.width*$t),pe=Math.floor(pt.height*$t),v.isDataArrayTexture?ue=pt.depth:v.isData3DTexture?ue=Math.floor(pt.depth*$t):ue=1,we=0,Re=0,Me=0}z!==null?(We=z.x,Qe=z.y,ft=z.z):(We=0,Qe=0,ft=0);const nt=De.convert(I.format),Ee=De.convert(I.type);let ht;I.isData3DTexture?(Ne.setTexture3D(I,0),ht=R.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Ne.setTexture2DArray(I,0),ht=R.TEXTURE_2D_ARRAY):(Ne.setTexture2D(I,0),ht=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,I.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,I.unpackAlignment);const je=R.getParameter(R.UNPACK_ROW_LENGTH),Vt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),ui=R.getParameter(R.UNPACK_SKIP_PIXELS),kt=R.getParameter(R.UNPACK_SKIP_ROWS),Wi=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,pt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,pt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,we),R.pixelStorei(R.UNPACK_SKIP_ROWS,Re),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Me);const ut=v.isDataArrayTexture||v.isData3DTexture,Ft=I.isDataArrayTexture||I.isData3DTexture;if(v.isDepthTexture){const $t=Se.get(v),Pt=Se.get(I),Ot=Se.get($t.__renderTarget),dr=Se.get(Pt.__renderTarget);me.bindFramebuffer(R.READ_FRAMEBUFFER,Ot.__webglFramebuffer),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,dr.__webglFramebuffer);for(let jn=0;jn<ue;jn++)ut&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Se.get(v).__webglTexture,N,Me+jn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Se.get(I).__webglTexture,ee,ft+jn)),R.blitFramebuffer(we,Re,ce,pe,We,Qe,ce,pe,R.DEPTH_BUFFER_BIT,R.NEAREST);me.bindFramebuffer(R.READ_FRAMEBUFFER,null),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(N!==0||v.isRenderTargetTexture||Se.has(v)){const $t=Se.get(v),Pt=Se.get(I);me.bindFramebuffer(R.READ_FRAMEBUFFER,Rc),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,Pc);for(let Ot=0;Ot<ue;Ot++)ut?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,$t.__webglTexture,N,Me+Ot):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,$t.__webglTexture,N),Ft?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Pt.__webglTexture,ee,ft+Ot):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Pt.__webglTexture,ee),N!==0?R.blitFramebuffer(we,Re,ce,pe,We,Qe,ce,pe,R.COLOR_BUFFER_BIT,R.NEAREST):Ft?R.copyTexSubImage3D(ht,ee,We,Qe,ft+Ot,we,Re,ce,pe):R.copyTexSubImage2D(ht,ee,We,Qe,we,Re,ce,pe);me.bindFramebuffer(R.READ_FRAMEBUFFER,null),me.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Ft?v.isDataTexture||v.isData3DTexture?R.texSubImage3D(ht,ee,We,Qe,ft,ce,pe,ue,nt,Ee,pt.data):I.isCompressedArrayTexture?R.compressedTexSubImage3D(ht,ee,We,Qe,ft,ce,pe,ue,nt,pt.data):R.texSubImage3D(ht,ee,We,Qe,ft,ce,pe,ue,nt,Ee,pt):v.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ee,We,Qe,ce,pe,nt,Ee,pt.data):v.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ee,We,Qe,pt.width,pt.height,nt,pt.data):R.texSubImage2D(R.TEXTURE_2D,ee,We,Qe,ce,pe,nt,Ee,pt);R.pixelStorei(R.UNPACK_ROW_LENGTH,je),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Vt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ui),R.pixelStorei(R.UNPACK_SKIP_ROWS,kt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Wi),ee===0&&I.generateMipmaps&&R.generateMipmap(ht),me.unbindTexture()},this.initRenderTarget=function(v){Se.get(v).__webglFramebuffer===void 0&&Ne.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Ne.setTextureCube(v,0):v.isData3DTexture?Ne.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Ne.setTexture2DArray(v,0):Ne.setTexture2D(v,0),me.unbindTexture()},this.resetState=function(){U=0,S=0,M=null,me.reset(),P.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const fl={type:"change"},Qa={type:"start"},hc={type:"end"},Hs=new fs,pl=new Tn,i0=Math.cos(70*Ie.DEG2RAD),Mt=new D,Bt=2*Math.PI,tt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hr=1e-6;class s0 extends pu{constructor(e,t=null){super(e,t),this.state=tt.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Di.ROTATE,MIDDLE:Di.DOLLY,RIGHT:Di.PAN},this.touches={ONE:Pi.ROTATE,TWO:Pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new li,this._lastTargetPosition=new D,this._quat=new li().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ho,this._sphericalDelta=new Ho,this._scale=1,this._panOffset=new D,this._rotateStart=new Te,this._rotateEnd=new Te,this._rotateDelta=new Te,this._panStart=new Te,this._panEnd=new Te,this._panDelta=new Te,this._dollyStart=new Te,this._dollyEnd=new Te,this._dollyDelta=new Te,this._dollyDirection=new D,this._mouse=new Te,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=a0.bind(this),this._onPointerDown=r0.bind(this),this._onPointerUp=o0.bind(this),this._onContextMenu=p0.bind(this),this._onMouseWheel=h0.bind(this),this._onKeyDown=u0.bind(this),this._onTouchStart=d0.bind(this),this._onTouchMove=f0.bind(this),this._onMouseDown=l0.bind(this),this._onMouseMove=c0.bind(this),this._interceptControlDown=m0.bind(this),this._interceptControlUp=x0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(fl),this.update(),this.state=tt.NONE}update(e=null){const t=this.object.position;Mt.copy(t).sub(this.target),Mt.applyQuaternion(this._quat),this._spherical.setFromVector3(Mt),this.autoRotate&&this.state===tt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Bt:n>Math.PI&&(n-=Bt),s<-Math.PI?s+=Bt:s>Math.PI&&(s-=Bt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Mt.setFromSpherical(this._spherical),Mt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Mt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Mt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Mt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Hs.origin.copy(this.object.position),Hs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hs.direction))<i0?this.object.lookAt(this.target):(pl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hs.intersectPlane(pl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Hr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hr||this._lastTargetPosition.distanceToSquared(this.target)>Hr?(this.dispatchEvent(fl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Bt/60*this.autoRotateSpeed*e:Bt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Mt.setFromMatrixColumn(t,0),Mt.multiplyScalar(-e),this._panOffset.add(Mt)}_panUp(e,t){this.screenSpacePanning===!0?Mt.setFromMatrixColumn(t,1):(Mt.setFromMatrixColumn(t,0),Mt.crossVectors(this.object.up,Mt)),Mt.multiplyScalar(e),this._panOffset.add(Mt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Mt.copy(s).sub(this.target);let r=Mt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Te,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function r0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function a0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function o0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(hc),this.state=tt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function l0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=tt.DOLLY;break;case Di.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=tt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=tt.ROTATE}break;case Di.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=tt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=tt.PAN}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(Qa)}function c0(i){switch(this.state){case tt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case tt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case tt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function h0(i){this.enabled===!1||this.enableZoom===!1||this.state!==tt.NONE||(i.preventDefault(),this.dispatchEvent(Qa),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(hc))}function u0(i){this.enabled!==!1&&this._handleKeyDown(i)}function d0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Pi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=tt.TOUCH_ROTATE;break;case Pi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=tt.TOUCH_PAN;break;default:this.state=tt.NONE}break;case 2:switch(this.touches.TWO){case Pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=tt.TOUCH_DOLLY_PAN;break;case Pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=tt.TOUCH_DOLLY_ROTATE;break;default:this.state=tt.NONE}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(Qa)}function f0(i){switch(this._trackPointer(i),this.state){case tt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case tt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case tt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case tt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=tt.NONE}}function p0(i){this.enabled!==!1&&i.preventDefault()}function m0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function x0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Zs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class hi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const g0=new sc(-1,1,1,-1,0,1);class _0 extends jt{constructor(){super(),this.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new dt([0,2,0,0,2,0],2))}}const v0=new _0;class hr{constructor(e){this._mesh=new Ln(v0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,g0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class M0 extends hi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof St?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=qn.clone(e.uniforms),this.material=new St({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new hr(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ml extends hi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class S0 extends hi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class b0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Te);this._width=n.width,this._height=n.height,t=new cn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:mn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new M0(Zs),this.copyPass.material.blending=pn,this.clock=new Ja}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ml!==void 0&&(a instanceof ml?n=!0:a instanceof S0&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class y0 extends hi{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new xe}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const E0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new xe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class zi extends hi{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new Te(e.x,e.y):new Te(256,256),this.clearColor=new xe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new cn(r,a,{type:mn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new cn(r,a,{type:mn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new cn(r,a,{type:mn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=E0;this.highPassUniforms=qn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new St({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Te(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=qn.clone(Zs.uniforms),this.blendMaterial=new St({uniforms:this.copyUniforms,vertexShader:Zs.vertexShader,fragmentShader:Zs.fragmentShader,blending:is,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new xe,this._oldClearAlpha=1,this._basic=new Ka,this._fsQuad=new hr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Te(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=zi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=zi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(n*n))/n);return new St({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Te(.5,.5)},direction:{value:new Te(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;
					}
					gl_FragColor = vec4( diffuseSum, 1.0 );
				}`})}_getCompositeMaterial(e){return new St({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}zi.BlurDirectionX=new Te(1,0);zi.BlurDirectionY=new Te(0,1);const T0={name:"FilmShader",uniforms:{tDiffuse:{value:null},time:{value:0},intensity:{value:.5},grayscale:{value:!1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		uniform float intensity;
		uniform bool grayscale;
		uniform float time;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 base = texture2D( tDiffuse, vUv );

			float noise = rand( fract( vUv + time ) );

			vec3 color = base.rgb + base.rgb * clamp( 0.1 + noise, 0.0, 1.0 );

			color = mix( base.rgb, color, intensity );

			if ( grayscale ) {

				color = vec3( luminance( color ) ); // assuming linear-srgb

			}

			gl_FragColor = vec4( color, base.a );

		}`};class A0 extends hi{constructor(e=.5,t=!1){super();const n=T0;this.uniforms=qn.clone(n.uniforms),this.material=new St({name:n.name,uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.uniforms.intensity.value=e,this.uniforms.grayscale.value=t,this._fsQuad=new hr(this.material)}render(e,t,n,s){this.uniforms.tDiffuse.value=n.texture,this.uniforms.time.value+=s,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Gs={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class w0 extends hi{constructor(){super(),this.uniforms=qn.clone(Gs.uniforms),this.material=new cu({name:Gs.name,uniforms:this.uniforms,vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader}),this._fsQuad=new hr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ye.getTransfer(this._outputColorSpace)===Ke&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Dl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ll?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Il?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ul?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Fl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ol?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Nl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Pe={paused:!1,activePaletteIndex:1,currentFormation:0,numFormations:8,densityFactor:1,demoMode:!1},uc=["Quantum Cortex","Hyperdimensional Mesh","Neural Vortex","Synaptic Cloud","Grid Network","Sphere Formation","ASCII Neural Network","TSP Solver"],ns=[[new xe(5195493),new xe(8141549),new xe(12592851),new xe(14362487),new xe(9133302)],[new xe(16096779),new xe(16347926),new xe(14427686),new xe(8330525),new xe(16498468)],[new xe(15485081),new xe(9133302),new xe(6514417),new xe(3900150),new xe(11032055)],[new xe(1096065),new xe(10741301),new xe(16436245),new xe(16486972),new xe(4906624)]],dc=`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m*=m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p,float time){
    float value=0.0;float amplitude=0.5;float frequency=1.0;int octaves=3;
    for(int i=0;i<octaves;i++){
        value+=amplitude*snoise(p*frequency+time*0.2*frequency);
        amplitude*=0.5;frequency*=2.0;
    }
    return value;
}`,xl={vertexShader:`${dc}
attribute float nodeSize;attribute float nodeType;attribute vec3 nodeColor;attribute float distanceFromRoot;
uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;uniform float uBaseNodeSize;
varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;

float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
    if (pulseTime < 0.0) return 0.0;
    float timeSinceClick = uTime - pulseTime;
    if (timeSinceClick < 0.0 || timeSinceClick > 3.0) return 0.0;

    float pulseRadius = timeSinceClick * uPulseSpeed;
    float distToClick = distance(worldPos, pulsePos);
    float pulseThickness = 2.0;
    float waveProximity = abs(distToClick - pulseRadius);

    return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(3.0, 0.0, timeSinceClick);
}

void main() {
    vNodeType = nodeType;
    vColor = nodeColor;
    vDistanceFromRoot = distanceFromRoot;

    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vPosition = worldPos;

    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 3; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);

    float timeScale = 0.5 + 0.5 * sin(uTime * 0.8 + distanceFromRoot * 0.2);
    float baseSize = nodeSize * (0.8 + 0.2 * timeScale);
    float pulseSize = baseSize * (1.0 + vPulseIntensity * 2.0);

    vec3 modifiedPosition = position;
    if (nodeType > 0.5) {
        float noise = fbm(position * 0.1, uTime * 0.1);
        modifiedPosition += normalize(position) * noise * 0.2;
    }

    vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
    gl_PointSize = pulseSize * uBaseNodeSize * (800.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}`,fragmentShader:`
uniform float uTime;uniform vec3 uPulseColors[3];
varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;

void main() {
    vec2 center = 2.0 * gl_PointCoord - 1.0;
    float dist = length(center);
    if (dist > 1.0) discard;

    float glowStrength = 1.0 - smoothstep(0.0, 1.0, dist);
    glowStrength = pow(glowStrength, 1.4);

    vec3 baseColor = vColor * (0.8 + 0.2 * sin(uTime * 0.5 + vDistanceFromRoot * 0.3));
    vec3 finalColor = baseColor;

    if (vPulseIntensity > 0.0) {
        vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
        finalColor = mix(baseColor, pulseColor, vPulseIntensity);
        finalColor *= (1.0 + vPulseIntensity * 0.7);
    }

    float alpha = glowStrength * (0.9 - 0.5 * dist);

    float camDistance = length(vPosition - cameraPosition);
    float distanceFade = smoothstep(80.0, 10.0, camDistance);

    if (vNodeType > 0.5) {
        alpha *= 0.85;
    } else {
        finalColor *= 1.2;
    }

    gl_FragColor = vec4(finalColor, alpha * distanceFade);
}`},gl={vertexShader:`${dc}
attribute vec3 startPoint;attribute vec3 endPoint;attribute float connectionStrength;attribute float pathIndex;attribute vec3 connectionColor;
uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;
varying vec3 vColor;varying float vConnectionStrength;varying float vPulseIntensity;varying float vPathPosition;

float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
    if (pulseTime < 0.0) return 0.0;
    float timeSinceClick = uTime - pulseTime;
    if (timeSinceClick < 0.0 || timeSinceClick > 3.0) return 0.0;
    float pulseRadius = timeSinceClick * uPulseSpeed;
    float distToClick = distance(worldPos, pulsePos);
    float pulseThickness = 2.0;
    float waveProximity = abs(distToClick - pulseRadius);
    return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(3.0, 0.0, timeSinceClick);
}

void main() {
    float t = position.x;
    vPathPosition = t;

    vec3 midPoint = mix(startPoint, endPoint, 0.5);
    float pathOffset = sin(t * 3.14159) * 0.1;
    vec3 perpendicular = normalize(cross(normalize(endPoint - startPoint), vec3(0.0, 1.0, 0.0)));
    if (length(perpendicular) < 0.1) perpendicular = vec3(1.0, 0.0, 0.0);
    midPoint += perpendicular * pathOffset;

    vec3 p0 = mix(startPoint, midPoint, t);
    vec3 p1 = mix(midPoint, endPoint, t);
    vec3 finalPos = mix(p0, p1, t);

    float noiseTime = uTime * 0.2;
    float noise = fbm(vec3(pathIndex * 0.1, t * 0.5, noiseTime), noiseTime);
    finalPos += perpendicular * noise * 0.1;

    vec3 worldPos = (modelMatrix * vec4(finalPos, 1.0)).xyz;

    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 3; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);

    vColor = connectionColor;
    vConnectionStrength = connectionStrength;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
}`,fragmentShader:`
uniform float uTime;uniform vec3 uPulseColors[3];
varying vec3 vColor;varying float vConnectionStrength;varying float vPulseIntensity;varying float vPathPosition;

void main() {
    vec3 baseColor = vColor * (0.7 + 0.3 * sin(uTime * 0.5 + vPathPosition * 10.0));

    float flowPattern = sin(vPathPosition * 20.0 - uTime * 3.0) * 0.5 + 0.5;
    float flowIntensity = 0.3 * flowPattern * vConnectionStrength;

    vec3 finalColor = baseColor;

    if (vPulseIntensity > 0.0) {
        vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
        finalColor = mix(baseColor, pulseColor, vPulseIntensity);
        flowIntensity += vPulseIntensity * 0.5;
    }

    finalColor *= (0.6 + flowIntensity + vConnectionStrength * 0.4);

    float alpha = 0.8 * vConnectionStrength + 0.2 * flowPattern;
    alpha = mix(alpha, min(1.0, alpha * 2.0), vPulseIntensity);

    gl_FragColor = vec4(finalColor, alpha);
}`},Ai={fov:60,near:.1,far:1200,initialPosition:{x:0,y:5,z:22}},Ji={maxPixelRatio:2,clearColor:0,antialias:!0,powerPreference:"high-performance"},_l={fogColor:0,fogDensity:.0015},zn={enableDamping:!0,dampingFactor:.05,rotateSpeed:.5,minDistance:5,maxDistance:100,autoRotate:!0,autoRotateSpeed:.15,enablePan:!1},Gr={strength:1.5,radius:.4,threshold:.68},vl={noiseIntensity:.35,grayscale:!1},sr={speed:15,baseNodeSize:.5,maxPulses:3,interactionPlaneOffset:.5},At={sizeRange:{type0:{min:.7,max:1.2},type1:{min:.4,max:.9}},rootNodeSizes:{quantumCortex:1.5,hyperdimensionalMesh:1.5,neuralVortex:1.8,synapticCloud:1.5},colorVariation:{hue:.05,saturation:.1,lightness:.1}},qe={sphereDistribution:0,cloudRadiusDistributionExponent:.5,positionSpread:1,clusterDistanceMin:.3,clusterDistanceMax:1,cloudRadiusBase:7,cloudRadiusVariation:3,intermediateJitter:3,jumpConnectionJitter:8,bridgeNodeJitter:5,longRangeJitter:4,spiralJitter:1.5,radialJitter:2},fc={segmentsPerConnection:15},gt={primaryAxes:6,nodesPerAxis:8,axisLength:20,axisExponent:.8,connectionStrengthFalloff:.3,ringDistances:[5,10,15],ringDensityMultiplier:3,ringConnectionProbability:.4,ringJumpInterval:4,ringJumpMinLength:5,closestNodeMaxDistance:8,closestNodeStrengthRange:{min:.5,max:1},interRingConnectionRatio:.5,interRingStrength:.6,numIntermediates:3,intermediateStrength:.5},et={dimensions:4,baseNodesPerDimension:40,maxRadius:20,radiusExponent:.7,biasStrengthRange:{min:.6,max:1},randomVecStrength:.3,leafProbability:.4,leafThreshold:.8,rootConnectionThreshold:.3,rootConnectionStrength:.7,layers:4,connectionsPerNodeRange:{min:1,max:3},connectionStrengthRange:{min:.4,max:.8},prevLayerStrength:.8,interDimensionConnections:5,interDimensionStrength:.5,jumpConnections:10,jumpNumPointsRange:{min:3,max:6}},Ws={rotationAmplitude:.08,rotationFrequency:.05},wi={densitySliderDebounce:300,autoRotateDelay:2e3,resetCameraDelay:1500},Zt={width:100,height:100,spacing:.5,rotationX:0,rotationY:0,rotationZ:0,connectionStrength:.8,leafProbability:.1};function C0(i=1){const e=[],t=Math.floor(Zt.width*i),n=Math.floor(Zt.height*i),s=[],r=new it(new D(0,0,0),0,0);r.size=At.rootNodeSizes.quantumCortex,e.push(r);const a=-(t-1)*Zt.spacing/2,o=-(n-1)*Zt.spacing/2;for(let h=0;h<n;h++){const u=[];for(let d=0;d<t;d++){let f=new D(a+d*Zt.spacing,0,o+h*Zt.spacing);const x=new gn(Zt.rotationX,Zt.rotationY,Zt.rotationZ);f.applyEuler(x);const g=t/2,m=n/2,p=Math.sqrt(Math.pow(d-g,2)+Math.pow(h-m,2)),E=Math.sqrt(Math.pow(t/2,2)+Math.pow(n/2,2)),b=Math.floor(p/E*5)+1,C=Math.random()<Zt.leafProbability?1:0,y=new it(f,b,C);y.distanceFromRoot=r.position.distanceTo(f),e.push(y),u.push(y)}s.push(u)}for(let h=0;h<n;h++)for(let u=0;u<t;u++){const d=s[h][u];if(u<t-1){const f=s[h][u+1];d.addConnection(f,Zt.connectionStrength)}if(h<n-1){const f=s[h+1][u];d.addConnection(f,Zt.connectionStrength)}}const c=Math.floor(n/2),l=Math.floor(t/2);return s[c]&&s[c][l]&&r.addConnection(s[c][l],1),{nodes:e,rootNode:r}}const Wt={radius:15,numNodes:5e3,numLayers:1,layerSpacing:5,connectionRadius:2,connectionStrength:.7,maxConnectionsPerNode:6,leafProbability:.05};function R0(i=1){const e=[],t=Math.floor(Wt.numNodes*i),n=Wt.numLayers,s=new it(new D(0,0,0),0,0);s.size=At.rootNodeSizes.quantumCortex,e.push(s);const r=Math.floor(t/n);for(let o=0;o<n;o++){const c=Wt.radius+o*Wt.layerSpacing;for(let l=0;l<r;l++){let h;h=c*Math.cbrt(Math.random());const u=Math.random()*Math.PI*2,d=Math.acos(2*Math.random()-1);let f=new D(h*Math.sin(d)*Math.cos(u),h*Math.sin(d)*Math.sin(u),h*Math.cos(d));const x=f.length(),g=Wt.radius+(n-1)*Wt.layerSpacing,m=Math.floor(x/g*5)+1,E=Math.random()<Wt.leafProbability?1:0,b=new it(f,m,E);b.distanceFromRoot=x,e.push(b)}}const a=Wt.connectionRadius*Wt.connectionRadius;for(let o=0;o<e.length;o++){const c=e[o];let l=0;for(let h=o+1;h<e.length;h++){const u=e[h],d=c.position.distanceToSquared(u.position);if(d<=a&&l<Wt.maxConnectionsPerNode){const f=Math.sqrt(d),x=Wt.connectionStrength*(1-f/Wt.connectionRadius);c.addConnection(u,x),l++,u.connections.length<Wt.maxConnectionsPerNode&&u.addConnection(c,x)}}}return e.filter(c=>c!==s).sort((c,l)=>c.distanceFromRoot-l.distanceFromRoot).slice(0,Math.min(10,Math.floor(t/10))).forEach(c=>{s.addConnection(c,1)}),{nodes:e,rootNode:s}}const Jt={nodeSpacing:3,scale:1,depth:5,numLayers:3,layerRotation:Math.PI/8,connectionStrength:.85,layerConnectionStrength:.6},Ml=[{x:-2,y:-1,id:0},{x:0,y:-1,id:1},{x:2,y:-1,id:2},{x:-3,y:0,id:3},{x:-1,y:0,id:4},{x:1,y:0,id:5},{x:3,y:0,id:6},{x:-2,y:1,id:7},{x:0,y:1,id:8},{x:2,y:1,id:9}],P0=[[0,1],[1,2],[3,4],[4,5],[5,6],[7,8],[8,9],[3,0],[4,1],[5,2],[6,2],[3,7],[4,8],[5,8],[6,9],[3,4],[4,5],[5,6],[7,4],[8,5],[9,6]];function D0(i=1){const e=[],t=new it(new D(0,0,0),0,0);t.size=At.rootNodeSizes.quantumCortex,e.push(t);const n=Jt.numLayers,s=Jt.depth/(n-1),r=-5/2,a=[];for(let o=0;o<n;o++){const c=[],l=r+o*s,h=o*Jt.layerRotation;Ml.forEach((u,d)=>{let f=u.x*Jt.nodeSpacing*Jt.scale,x=u.y*Jt.nodeSpacing*Jt.scale;const g=Math.cos(h),m=Math.sin(h),p=f*g-x*m,E=f*m+x*g;let b=new D(p,E,l);const A=t.position.distanceTo(b),C=Math.sqrt(Math.pow(3*Jt.nodeSpacing*Jt.scale,2)+Math.pow(Jt.depth/2,2)),y=Math.floor(A/C*5)+1,w=new it(b,y,0);w.distanceFromRoot=A,e.push(w),c.push(w)}),a.push(c),P0.forEach(([u,d])=>{const f=c[u],x=c[d];f&&x&&f.addConnection(x,Jt.connectionStrength)})}for(let o=0;o<Ml.length;o++)for(let c=0;c<n-1;c++){const l=a[c][o],h=a[c+1][o];l&&h&&l.addConnection(h,Jt.layerConnectionStrength)}if(a[0]&&a[0].length>4){const o=a[0][4];o&&t.addConnection(o,1)}return{nodes:e,rootNode:t}}const L0={numCities:10,cityRadius:14,cityNodeSize:2.2,startCitySize:2.8,topRoutesToShow:4,completeGraphStrength:.06,routeStrengths:[1,.35,.18,.1],routeIntermediates:[6,3,2,1],intermediateSize:[.9,.45,.3,.2],routeOffsetScale:.6,satelliteCount:5,satelliteRadius:1.2,satelliteSize:.35,satelliteStrength:.7};function I0(i){const e=i.length,t=Array.from({length:e},()=>new Array(e).fill(0));for(let n=0;n<e;n++)for(let s=n+1;s<e;s++){const r=i[n].distanceTo(i[s]);t[n][s]=r,t[s][n]=r}return t}function U0(i,e,t){const n=[];let s=1/0;const r=Array.from({length:e-1},(o,c)=>c+1);function a(o,c){if(c===1){let l=0;const h=[0,...o];for(let u=0;u<h.length;u++)l+=i[h[u]][h[(u+1)%h.length]];n.length<t?(n.push({path:[...h],totalDistance:l}),n.sort((u,d)=>u.totalDistance-d.totalDistance),n.length===t&&(s=n[t-1].totalDistance)):l<s&&(n[t-1]={path:[...h],totalDistance:l},n.sort((u,d)=>u.totalDistance-d.totalDistance),s=n[t-1].totalDistance);return}for(let l=0;l<c;l++)a(o,c-1),c%2===1?[o[0],o[c-1]]=[o[c-1],o[0]]:[o[l],o[c-1]]=[o[c-1],o[l]]}return a(r,r.length),n}function N0(i,e){const t=[],n=Math.PI*(3-Math.sqrt(5));for(let s=0;s<i;s++){const r=1-s/(i-1)*2,a=Math.sqrt(1-r*r),o=n*s,c=.15,l=new D(e*a*Math.cos(o)+Ie.randFloatSpread(e*c),e*r*.55+Ie.randFloatSpread(e*c*.5),e*a*Math.sin(o)+Ie.randFloatSpread(e*c));t.push(l)}return t}function F0(i=1){const e=L0,t=[],n=Math.max(6,Math.round(e.numCities*i)),s=new it(new D(0,0,0),0,0);s.size=1.5,t.push(s);const r=N0(n,e.cityRadius),a=[];for(let l=0;l<n;l++){const h=Math.floor(l/n*4),u=new it(r[l],h,1);u.size=l===0?e.startCitySize:e.cityNodeSize,u.distanceFromRoot=r[l].length(),t.push(u),a.push(u)}s.addConnection(a[0],1);for(let l=0;l<e.satelliteCount;l++){const h=l/e.satelliteCount*Math.PI*2,u=new D(Math.cos(h),0,Math.sin(h)),d=new D(0,Math.sin(h*2)*.4,0),f=r[0].clone().add(u.multiplyScalar(e.satelliteRadius)).add(d),x=new it(f,0,0);x.size=e.satelliteSize,x.distanceFromRoot=f.length(),t.push(x),a[0].addConnection(x,e.satelliteStrength);const g=t.length-1;l>0&&t[g].addConnection(t[g-1],.4)}{const l=t[t.length-e.satelliteCount],h=t[t.length-1];l.addConnection(h,.4)}for(let l=0;l<n;l++)for(let h=l+1;h<n;h++)a[l].addConnection(a[h],e.completeGraphStrength);const o=I0(r),c=U0(o,n,e.topRoutesToShow);console.log(`%c🧭 TSP Solver: ${n} cities`,"color: #FFD700; font-weight: bold; font-size: 14px"),c.forEach((l,h)=>{const u=h===0?"🏆 OPTIMAL":`   #${h+1}`;console.log(`%c${u}: distance ${l.totalDistance.toFixed(2)}  path [${l.path.join(" → ")} → ${l.path[0]}]`,h===0?"color: #FFD700; font-weight: bold":"color: #888")});for(let l=0;l<c.length;l++){const h=c[l],u=e.routeStrengths[Math.min(l,e.routeStrengths.length-1)],d=e.routeIntermediates[Math.min(l,e.routeIntermediates.length-1)],f=e.intermediateSize[Math.min(l,e.intermediateSize.length-1)],x=l;for(let g=0;g<h.path.length;g++){const m=h.path[g],p=h.path[(g+1)%h.path.length],E=r[m],b=r[p],A=new D().subVectors(b,E).normalize();let C=new D().crossVectors(A,new D(0,1,0));C.length()<.01&&(C=new D().crossVectors(A,new D(1,0,0))),C.normalize();let y=a[m];for(let w=1;w<=d;w++){const U=w/(d+1),S=new D().lerpVectors(E,b,U);if(l>0){const O=C.clone().multiplyScalar(e.routeOffsetScale*l*(w%2===0?1:-1));S.add(O)}const M=Math.sin(U*Math.PI)*.4*(l+1);S.y+=M;const L=new it(S,x,0);L.size=f,L.distanceFromRoot=S.length(),t.push(L),y.addConnection(L,u),y=L}y.addConnection(a[p],u)}}return{nodes:t,rootNode:s}}class it{position;connections;level;type;size;distanceFromRoot;dimension;spiralIndex;spiralPosition;clusterRef;constructor(e,t=0,n=0){this.position=e,this.connections=[],this.level=t,this.type=n,this.size=n===0?Ie.randFloat(At.sizeRange.type0.min,At.sizeRange.type0.max):Ie.randFloat(At.sizeRange.type1.min,At.sizeRange.type1.max),this.distanceFromRoot=0}addConnection(e,t=1){this.isConnectedTo(e)||(this.connections.push({node:e,strength:t}),e.connections.push({node:this,strength:t}))}isConnectedTo(e){return this.connections.some(t=>t.node===e)}}function O0(i,e,t){const n=gt.primaryAxes,s=gt.nodesPerAxis,r=gt.axisLength,a=[];for(let c=0;c<n;c++){const l=Math.acos(-1+2*c/n),h=Math.PI*(1+Math.sqrt(5))*c,u=new D(Math.sin(l)*Math.cos(h),Math.sin(l)*Math.sin(h),Math.cos(l));let d=e;for(let f=1;f<=s;f++){const x=f/s,g=r*Math.pow(x,gt.axisExponent),m=new D().copy(u).multiplyScalar(g),p=f===s?1:0,E=new it(m,f,p);E.distanceFromRoot=g,i.push(E),d.addConnection(E,1-x*gt.connectionStrengthFalloff),d=E,f===s&&a.push(E)}}const o=[];for(const c of gt.ringDistances){const l=Math.floor(c*gt.ringDensityMultiplier*t),h=[];for(let u=0;u<l;u++){const d=u/l,f=Math.pow(Math.random(),1-qe.sphereDistribution),x=Math.acos(2*Math.random()-1),g=2*Math.PI*d,m=c*f,p=new D(m*Math.sin(x)*Math.cos(g),m*Math.sin(x)*Math.sin(g),m*Math.cos(x)),E=Math.ceil(c/5),b=Math.random()<gt.ringConnectionProbability?1:0,A=new it(p,E,b);A.distanceFromRoot=c,i.push(A),h.push(A)}o.push(h);for(let u=0;u<h.length;u++){const d=h[u],f=h[(u+1)%h.length];if(d.addConnection(f,.7),u%gt.ringJumpInterval===0&&h.length>gt.ringJumpMinLength){const x=(u+Math.floor(h.length/2))%h.length;d.addConnection(h[x],.4)}}}for(const c of o)for(const l of c){let h=null,u=1/0;for(const d of i){if(d===e||d===l||d.level===0||d.type!==0)continue;const f=l.position.distanceTo(d.position);f<u&&(u=f,h=d)}if(h&&u<gt.closestNodeMaxDistance){const d=gt.closestNodeStrengthRange.min+(1-u/gt.closestNodeMaxDistance)*(gt.closestNodeStrengthRange.max-gt.closestNodeStrengthRange.min);l.addConnection(h,d)}}for(let c=0;c<o.length-1;c++){const l=o[c],h=o[c+1],u=Math.floor(l.length*gt.interRingConnectionRatio);for(let d=0;d<u;d++){const f=l[Math.floor(Math.random()*l.length)],x=h[Math.floor(Math.random()*h.length)];f.isConnectedTo(x)||f.addConnection(x,gt.interRingStrength)}}for(let c=0;c<a.length;c++){const l=a[c],h=a[(c+2)%a.length];let u=l;for(let d=1;d<=gt.numIntermediates;d++){const f=d/(gt.numIntermediates+1),x=new D().lerpVectors(l.position,h.position,f);x.add(new D(Ie.randFloatSpread(qe.intermediateJitter),Ie.randFloatSpread(qe.intermediateJitter),Ie.randFloatSpread(qe.intermediateJitter)));const g=new it(x,l.level,0);g.distanceFromRoot=e.position.distanceTo(x),i.push(g),u.addConnection(g,gt.intermediateStrength),u=g}u.addConnection(h,gt.intermediateStrength)}}function B0(i,e,t){const n=et.dimensions,s=Math.floor(et.baseNodesPerDimension*t),r=et.maxRadius,a=[new D(1,1,1).normalize(),new D(-1,1,-1).normalize(),new D(1,-1,-1).normalize(),new D(-1,-1,1).normalize()],o=[];for(let l=0;l<n;l++){const h=[],u=a[l];for(let d=0;d<s;d++){const f=r*Math.pow(Math.random(),et.radiusExponent),x=new D(Ie.randFloatSpread(qe.positionSpread),Ie.randFloatSpread(qe.positionSpread),Ie.randFloatSpread(qe.positionSpread)).normalize(),m=new D().addVectors(u.clone().multiplyScalar(et.biasStrengthRange.min+Math.random()*(et.biasStrengthRange.max-et.biasStrengthRange.min)),x.clone().multiplyScalar(et.randomVecStrength)).normalize().clone().multiplyScalar(f),p=Math.random()<et.leafProbability||f>r*et.leafThreshold,E=Math.floor(f/(r/4))+1,b=new it(m,E,p?1:0);b.distanceFromRoot=f,b.dimension=l,i.push(b),h.push(b),f<r*et.rootConnectionThreshold&&e.addConnection(b,et.rootConnectionStrength)}o.push(h)}for(let l=0;l<n;l++){const h=o[l];h.sort((d,f)=>d.distanceFromRoot-f.distanceFromRoot);const u=Math.ceil(h.length/et.layers);for(let d=0;d<et.layers;d++){const f=d*u,x=Math.min(f+u,h.length);for(let g=f;g<x;g++){const m=h[g],p=et.connectionsPerNodeRange.min+Math.floor(Math.random()*(et.connectionsPerNodeRange.max-et.connectionsPerNodeRange.min+1)),E=h.slice(f,x).filter(b=>b!==m).sort((b,A)=>m.position.distanceTo(b.position)-m.position.distanceTo(A.position));for(let b=0;b<Math.min(p,E.length);b++)m.isConnectedTo(E[b])||m.addConnection(E[b],et.connectionStrengthRange.min+Math.random()*(et.connectionStrengthRange.max-et.connectionStrengthRange.min));if(d>0){const b=h.slice((d-1)*u,d*u).sort((A,C)=>m.position.distanceTo(A.position)-m.position.distanceTo(C.position));b.length>0&&!m.isConnectedTo(b[0])&&m.addConnection(b[0],et.prevLayerStrength)}}}}for(let l=0;l<n;l++)for(let h=l+1;h<n;h++){const u=Math.floor(et.interDimensionConnections*t);for(let d=0;d<u;d++){const f=o[l][Math.floor(Math.random()*o[l].length)],x=o[h][Math.floor(Math.random()*o[h].length)];if(!f.isConnectedTo(x)){const g=new D().lerpVectors(f.position,x.position,.5);g.add(new D(Ie.randFloatSpread(qe.intermediateJitter),Ie.randFloatSpread(qe.intermediateJitter),Ie.randFloatSpread(qe.intermediateJitter)));const m=new it(g,Math.max(f.level,x.level),0);m.distanceFromRoot=e.position.distanceTo(g),i.push(m),f.addConnection(m,et.interDimensionStrength),m.addConnection(x,et.interDimensionStrength)}}}const c=Math.floor(et.jumpConnections*t);for(let l=0;l<c;l++){const h=Math.floor(Math.random()*n),u=(h+2)%n,d=o[h][Math.floor(Math.random()*o[h].length)],f=o[u][Math.floor(Math.random()*o[u].length)];if(!d.isConnectedTo(f)){const x=et.jumpNumPointsRange.min+Math.floor(Math.random()*(et.jumpNumPointsRange.max-et.jumpNumPointsRange.min+1));let g=d;for(let m=1;m<x;m++){const p=m/x,E=new D().lerpVectors(d.position,f.position,p);E.add(new D(Ie.randFloatSpread(qe.jumpConnectionJitter)*Math.sin(p*Math.PI),Ie.randFloatSpread(qe.jumpConnectionJitter)*Math.sin(p*Math.PI),Ie.randFloatSpread(qe.jumpConnectionJitter)*Math.sin(p*Math.PI)));const b=new it(E,Math.max(d.level,f.level),0);b.distanceFromRoot=e.position.distanceTo(E),i.push(b),g.addConnection(b,.4),g=b}g.addConnection(f,.4)}}}function z0(i,e,t){const a=Math.floor(30*t),o=[];for(let u=0;u<6;u++){const d=u/6*Math.PI*2,f=[];for(let x=0;x<a;x++){const g=x/(a-1),m=(g-.5)*30,E=16*Math.sin(g*Math.PI),A=d+g*Math.PI*2*2.5,C=new D(E*Math.cos(A),m,E*Math.sin(A));C.add(new D(Ie.randFloatSpread(qe.spiralJitter),Ie.randFloatSpread(qe.spiralJitter),Ie.randFloatSpread(qe.spiralJitter)));const y=Math.floor(g*5)+1,w=Math.random()<.3||x>a-3,U=new it(C,y,w?1:0);U.distanceFromRoot=Math.sqrt(E*E+m*m),U.spiralIndex=u,U.spiralPosition=g,i.push(U),f.push(U)}o.push(f)}for(const u of o){e.addConnection(u[0],1);for(let d=0;d<u.length-1;d++)u[d].addConnection(u[d+1],.9)}for(let u=0;u<6;u++){const d=o[u],f=o[(u+1)%6],x=5;for(let g=0;g<x;g++){const m=g/(x-1),p=Math.floor(m*(d.length-1)),E=Math.floor(m*(f.length-1));d[p].addConnection(f[E],.7)}}for(let u=0;u<6;u++){const d=o[u],f=o[(u+2)%6],x=3;for(let g=0;g<x;g++){const m=(g+.5)/x,p=(g+1)/x,E=Math.floor(m*(d.length-1)),b=Math.floor(p*(f.length-1)),A=d[E],C=f[b],y=new D().lerpVectors(A.position,C.position,.5).multiplyScalar(.7),w=new it(y,Math.max(A.level,C.level),0);w.distanceFromRoot=e.position.distanceTo(y),i.push(w),A.addConnection(w,.6),w.addConnection(C,.6)}}const c=5;for(let u=0;u<c;u++){const d=(u/(c-1)-.5)*30*.7,f=i.filter(x=>x!==e&&Math.abs(x.position.y-d)<2);if(f.sort((x,g)=>Math.atan2(x.position.z,x.position.x)-Math.atan2(g.position.z,g.position.x)),f.length>3)for(let x=0;x<f.length;x++)f[x].addConnection(f[(x+1)%f.length],.5)}const l=Math.floor(10*t),h=i.filter(u=>u!==e&&u.position.length()>5).sort(()=>Math.random()-.5).slice(0,l);for(const u of h){const d=1+Math.floor(Math.random()*2);let f=u;for(let x=1;x<=d;x++){const g=x/(d+1),m=u.position.clone().multiplyScalar(1-g);m.add(new D(Ie.randFloatSpread(qe.radialJitter),Ie.randFloatSpread(qe.radialJitter),Ie.randFloatSpread(qe.radialJitter)));const p=new it(m,Math.floor(u.level*(1-g)),0);p.distanceFromRoot=e.position.distanceTo(m),i.push(p),f.addConnection(p,.7),f=p}f.addConnection(e,.8)}}function V0(i,e,t){const r=[];for(let l=0;l<6;l++){const h=Math.acos(2*Math.random()-1),u=2*Math.PI*Math.random(),d=18*(qe.clusterDistanceMin+(qe.clusterDistanceMax-qe.clusterDistanceMin)*Math.random()),f=new D(d*Math.sin(h)*Math.cos(u),d*Math.sin(h)*Math.sin(u),d*Math.cos(h)),x=new it(f,1,0);x.size=1.2,x.distanceFromRoot=d,i.push(x),r.push(x),e.addConnection(x,.9)}for(let l=0;l<r.length;l++)for(let h=l+1;h<r.length;h++){const u=r[l].position.distanceTo(r[h].position),d=1-u/36;if(Math.random()<d){const f=.5+.5*(1-u/36);r[l].addConnection(r[h],f)}}for(const l of r){const h=Math.floor(20*t),u=qe.cloudRadiusBase+Math.random()*qe.cloudRadiusVariation;for(let d=0;d<h;d++){const f=u*Math.pow(Math.random(),qe.cloudRadiusDistributionExponent),x=new D(Ie.randFloatSpread(qe.positionSpread*2),Ie.randFloatSpread(qe.positionSpread*2),Ie.randFloatSpread(qe.positionSpread*2)).normalize(),g=new D().copy(l.position).add(x.multiplyScalar(f)),m=f,p=e.position.distanceTo(g),E=2+Math.floor(m/3),b=Math.random()<.5,A=new it(g,E,b?1:0);A.distanceFromRoot=p,A.clusterRef=l,i.push(A);const C=.7*(1-m/u);l.addConnection(A,C);const y=i.filter(U=>U!==A&&U!==l&&U.clusterRef===l&&U.position.distanceTo(g)<u*.4),w=Math.floor(Math.random()*3);y.sort((U,S)=>g.distanceTo(U.position)-g.distanceTo(S.position));for(let U=0;U<Math.min(w,y.length);U++){const M=.4*(1-g.distanceTo(y[U].position)/(u*.4));A.addConnection(y[U],M)}}}const a=Math.floor(15*t);for(let l=0;l<a;l++){const h=r[Math.floor(Math.random()*r.length)];let u;do u=r[Math.floor(Math.random()*r.length)];while(u===h);const d=new D().lerpVectors(h.position,u.position,.3+Math.random()*.4);d.add(new D(Ie.randFloatSpread(qe.bridgeNodeJitter),Ie.randFloatSpread(qe.bridgeNodeJitter),Ie.randFloatSpread(qe.bridgeNodeJitter)));const f=new it(d,2,0);f.distanceFromRoot=e.position.distanceTo(d),i.push(f),h.addConnection(f,.5),u.addConnection(f,.5);const x=i.filter(g=>g!==f&&g!==h&&g!==u&&g.position.distanceTo(d)<8);if(x.length>0){const g=x[Math.floor(Math.random()*x.length)];f.addConnection(g,.4)}}const o=Math.floor(10*t),c=i.filter(l=>l.distanceFromRoot>18*.6).sort(()=>Math.random()-.5).slice(0,o);for(const l of c){const h=2+Math.floor(Math.random()*2);let u=l;for(let f=1;f<=h;f++){const x=f/(h+1),g=l.position.clone().multiplyScalar(1-x*.8);g.add(new D(Ie.randFloatSpread(qe.longRangeJitter),Ie.randFloatSpread(qe.longRangeJitter),Ie.randFloatSpread(qe.longRangeJitter)));const m=new it(g,l.level,0);m.distanceFromRoot=e.position.distanceTo(g),i.push(m),u.addConnection(m,.6),u=m}const d=i.filter(f=>f.distanceFromRoot<18*.4&&f!==e);if(d.length>0){const f=d[Math.floor(Math.random()*d.length)];u.addConnection(f,.5)}}}function k0(i,e=1){let t=[],n;switch(i%8){case 0:n=new it(new D(0,0,0),0,0),n.size=At.rootNodeSizes.quantumCortex,t.push(n),O0(t,n,e);break;case 1:n=new it(new D(0,0,0),0,0),n.size=At.rootNodeSizes.hyperdimensionalMesh,t.push(n),B0(t,n,e);break;case 2:n=new it(new D(0,0,0),0,0),n.size=At.rootNodeSizes.neuralVortex,t.push(n),z0(t,n,e);break;case 3:n=new it(new D(0,0,0),0,0),n.size=At.rootNodeSizes.synapticCloud,t.push(n),V0(t,n,e);break;case 4:return C0(e);case 5:return R0(e);case 6:return D0(e);case 7:return F0(e)}if(e<1){const s=t.length;t=t.filter((r,a)=>r===n?!0:(a*31+Math.floor(e*100))%100<e*100),t.forEach(r=>{r.connections=r.connections.filter(a=>t.includes(a.node))}),console.log(`Density Filter: ${s} -> ${t.length} nodes`)}return{nodes:t,rootNode:n}}class H0{container=null;content=null;logs=[];maxLogs=50;isExpanded=!1;allTags=new Set;visibleLevels=new Set(["all"]);filterButtons=new Map;theme="dark";activeGroups=new Map;timers=new Map;activeTagFilter=null;constructor(){this.init()}init(){const e=document.createElement("div");e.id="gpt-logger",e.className="collapsed",e.style.cssText=`
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      max-width: calc(100vw - 40px);
      max-height: 300px;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(255, 120, 50, 0.3);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      z-index: 9999;
      font-family: 'Inter', 'Monaco', monospace;
      font-size: 11px;
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    `;const t=document.createElement("div");t.style.cssText=`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 10px;
      background: rgba(255, 120, 50, 0.1);
      border-bottom: 1px solid rgba(255, 120, 50, 0.2);
      border-radius: 7px 7px 0 0;
      cursor: move;
      user-select: none;
    `;const n=document.createElement("div");n.textContent="Debug Log",n.style.cssText=`
      color: rgba(255, 120, 50, 0.9);
      font-weight: 600;
      font-size: 12px;
    `;const s=document.createElement("div");s.style.cssText="display: flex; gap: 4px;";const r=this.createButton("Clear",()=>this.clear()),a=this.createButton("+",()=>this.toggle());s.appendChild(r),s.appendChild(a),t.appendChild(n),t.appendChild(s);const o=document.createElement("div");o.id="gpt-logger-content",o.style.cssText=`
      flex: 1;
      overflow-y: auto;
      padding: 6px 10px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 11px;
      display: none;
    `,e.appendChild(t),e.appendChild(o),document.body.appendChild(e),this.container=e,this.content=o,this.makeDraggable(t,e)}createButton(e,t){const n=document.createElement("button");return n.textContent=e,n.style.cssText=`
      background: rgba(255, 120, 50, 0.2);
      border: 1px solid rgba(255, 120, 50, 0.3);
      color: rgba(255, 120, 50, 0.9);
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 10px;
      transition: all 0.2s ease;
    `,n.onclick=t,n.onmouseenter=()=>{n.style.background="rgba(255, 120, 50, 0.3)"},n.onmouseleave=()=>{n.style.background="rgba(255, 120, 50, 0.2)"},n}makeDraggable(e,t){let n=!1,s=0,r=0,a=0,o=0;e.addEventListener("mousedown",c=>{n=!0,s=c.clientX,r=c.clientY;const l=t.getBoundingClientRect();a=l.left,o=l.top,t.style.transition="none"}),document.addEventListener("mousemove",c=>{if(!n)return;const l=c.clientX-s,h=c.clientY-r,u=a+l,d=o+h,f=window.innerWidth-t.offsetWidth,x=window.innerHeight-t.offsetHeight;t.style.left=`${Math.max(0,Math.min(u,f))}px`,t.style.top=`${Math.max(0,Math.min(d,x))}px`,t.style.right="auto",t.style.bottom="auto"}),document.addEventListener("mouseup",()=>{n&&(n=!1,t.style.transition="all 0.3s ease")})}formatMessage(e){if(typeof e=="object"&&e!==null)try{const t=JSON.stringify(e,null,2);return{text:Object.keys(e).length===0?"{}":`{${Object.keys(e).length} keys}`,isObject:!0,json:t}}catch{return{text:String(e),isObject:!1}}return{text:String(e),isObject:!1}}getTimeString(){const e=new Date,t=e.getHours().toString().padStart(2,"0"),n=e.getMinutes().toString().padStart(2,"0"),s=e.getSeconds().toString().padStart(2,"0");return`${t}:${n}:${s}`}log(e,t="info",n){if(!this.content)return;const s=this.formatMessage(e),r=this.getTimeString(),a=Date.now();n&&n.length>0&&n.forEach(u=>this.allTags.add(u));const o={message:s.isObject?s.json:s.text,level:t,time:r,timestamp:a,tags:n||[]};this.logs.push(o),this.logs.length>this.maxLogs&&this.logs.shift();const c=document.createElement("div");c.style.cssText=`
      margin-bottom: 3px;
      padding: 2px 0;
      border-left: 2px solid ${this.getLevelColor(t)};
      padding-left: 6px;
      color: ${this.getLevelColor(t)};
      font-size: 10px;
    `;const l=document.createElement("span");l.textContent=`[${r}] `,l.style.cssText="color: rgba(255,255,255,0.5); margin-right: 4px;",n&&n.length>0&&n.forEach(u=>{const d=document.createElement("span");d.textContent=u,d.style.cssText=`
          display: inline-block;
          background: rgba(255, 120, 50, 0.2);
          border: 1px solid rgba(255, 120, 50, 0.4);
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 9px;
          margin-right: 4px;
          margin-left: 4px;
        `,c.appendChild(d)});const h=document.createElement("span");if(s.isObject&&s.json){const u=document.createElement("span");u.textContent=s.text,u.style.cssText="cursor: pointer; font-weight: bold; margin-right: 4px;";const d=document.createElement("pre");d.textContent=s.json,d.style.cssText=`
        display: none;
        margin: 4px 0 0 12px;
        padding: 4px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        font-size: 9px;
        overflow-x: auto;
      `;let f=!1;u.onclick=()=>{f=!f,d.style.display=f?"block":"none"},h.appendChild(u),h.appendChild(d)}else h.textContent=s.text;c.appendChild(l),c.appendChild(h),this.content.appendChild(c),this.content.scrollHeight-this.content.scrollTop<this.content.clientHeight+50&&c.scrollIntoView({behavior:"smooth",block:"nearest"})}getLevelColor(e){switch(e){case"success":return"rgba(0, 255, 0, 0.8)";case"warning":return"rgba(255, 165, 0, 0.8)";case"error":return"rgba(255, 68, 68, 0.8)";default:return"rgba(100, 200, 255, 0.8)"}}clear(){this.content&&(this.logs=[],this.content.innerHTML="")}toggle(){if(!this.container||!this.content)return;this.isExpanded=!this.isExpanded;const e=this.container.querySelector("button:last-child");this.isExpanded?(this.container.style.maxHeight="300px",this.content.style.display="block",e&&(e.textContent="−")):(this.container.style.maxHeight="auto",this.content.style.display="none",e&&(e.textContent="+"))}info(e,t){this.log(e,"info",t)}success(e,t){this.log(e,"success",t)}warn(e,t){this.log(e,"warning",t)}error(e,t){this.log(e,"error",t)}}const Vi=new H0,Sl=(i,e="info",t)=>{Vi.log(i,e,t)},Rn=(i,e)=>Vi.info(i,e),hs=(i,e)=>Vi.success(i,e),Na=(i,e)=>Vi.error(i,e),G0=(i,e,t,n,s)=>{const r={position:{x:parseFloat(i.toFixed(2)),y:parseFloat(e.toFixed(2)),z:parseFloat(t.toFixed(2))},color:n,intensity:s?parseFloat(s.toFixed(2)):void 0,timestamp:Date.now()},a=s&&s>.7?"success":"info";Vi.log(`⚡ Pulse at (${r.position.x}, ${r.position.y}, ${r.position.z})`,a,["pulse","trace"]),Vi.log(r,a,["pulse","data"])};let W0=0;const Xs=new Map;function X0(i,e){if(!i||i.nodes.length===0)return null;let t=null,n=-1,s=1/0;return i.nodes.forEach((r,a)=>{const o=r.position.distanceTo(e);o<s&&(s=o,t=r,n=a)}),t?{node:t,index:n}:null}function q0(i,e,t,n=1,s=50,r=.15,a=.1){const o=X0(i,e);if(!o)return null;const c=++W0,l=Date.now(),h={pulseId:c,originNodeId:o.index,originPosition:o.node.position.clone(),startColor:t,startIntensity:n,startTime:l,steps:[],activatedNodes:new Map,maxDistance:0,totalDistance:0};h.activatedNodes.set(o.index,{nodeId:o.index,totalEnergy:n,activationTime:0}),Rn(`⚡ Pulse #${c} origin`,["pulse","origin"]),Sl({nodeId:o.index,position:{x:parseFloat(o.node.position.x.toFixed(2)),y:parseFloat(o.node.position.y.toFixed(2)),z:parseFloat(o.node.position.z.toFixed(2))},initialIntensity:n,color:t,nodeType:o.node.type===0?"regular":"leaf",connections:o.node.connections.length},"success",["pulse","origin","data"]);const u=[{nodeIndex:o.index,energy:n,stepIndex:0,parentIndex:-1}],d=new Set;d.add(o.index);let f=0;for(;u.length>0&&f<s;){const C=u.shift(),y=i.nodes[C.nodeIndex];if(!(!y||C.energy<a))for(const w of y.connections){const U=w.node,S=i.nodes.indexOf(U);if(S===-1)continue;const M=y.position.distanceTo(U.position),L=1-w.strength*.5,O=Math.max(.1,1-M/20),V=r*L*O,W=C.energy*(1-V);if(W<a)continue;f++;const H={stepIndex:f,sourceNodeId:C.nodeIndex,targetNodeId:S,energy:parseFloat(W.toFixed(3)),energyDecay:parseFloat(V.toFixed(3)),connectionStrength:parseFloat(w.strength.toFixed(2)),distance:parseFloat(M.toFixed(2)),timestamp:Date.now()-l};h.steps.push(H),(f<=10||f%5===0)&&Rn(`  Step ${H.stepIndex}: Node ${H.sourceNodeId} → ${H.targetNodeId} | Energy: ${H.energy} (decay: ${H.energyDecay}) | Distance: ${H.distance}`,["pulse","step",`pulse-${c}`]);const Y=h.activatedNodes.get(S);Y?Y.totalEnergy=Math.max(Y.totalEnergy,W):(h.activatedNodes.set(S,{nodeId:S,totalEnergy:W,activationTime:H.timestamp}),f<=10&&Rn(`    ✓ Node ${S} activated | Threshold: ${a.toFixed(2)} | Energy: ${W.toFixed(3)} | Delta: ${H.timestamp}ms`,["pulse","activation",`pulse-${c}`]),!d.has(S)&&W>a*1.5&&(d.add(S),u.push({nodeIndex:S,energy:W,stepIndex:f,parentIndex:C.nodeIndex})));const Z=h.totalDistance+M;h.totalDistance=Z,h.maxDistance=Math.max(h.maxDistance,M)}}const g=Date.now()-l,m=h.steps.length>0?g/h.steps.length:0,p=h.steps.length>0?h.steps[h.steps.length-1].energy:n,E=p/n*100,b=Math.min(1,E/100),A=Y0(t,b);if(hs(`⚡ Pulse #${c} completed: traveled ${h.steps.length} steps, activated ${h.activatedNodes.size} nodes in ${(g/1e3).toFixed(2)}s. Final energy: ${E.toFixed(1)}% (${A})`,["pulse","complete",`pulse-${c}`]),Sl({pulseId:c,totalSteps:h.steps.length,activatedNodes:h.activatedNodes.size,totalDistance:parseFloat(h.totalDistance.toFixed(2)),maxDistance:parseFloat(h.maxDistance.toFixed(2)),duration:g,avgLatencyPerHop:parseFloat(m.toFixed(2)),finalEnergy:parseFloat(p.toFixed(3)),energyRetention:parseFloat(E.toFixed(1))+"%",finalColor:A,startColor:t},"success",["pulse","stats",`pulse-${c}`]),Xs.set(c,h),Xs.size>10){const C=Math.min(...Xs.keys());Xs.delete(C)}return h}function Y0(i,e){const t=i.replace("#",""),n=parseInt(t.substr(0,2),16),s=parseInt(t.substr(2,2),16),r=parseInt(t.substr(4,2),16),a=Math.round(n*e),o=Math.round(s*e),c=Math.round(r*e);return`#${a.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}${c.toString(16).padStart(2,"0")}`}async function pc(i){const e=await fetch(i);if(!e.ok)throw new Error(`Failed to load ${i}`);return await e.text()}function mc(i){try{return JSON.parse(i)}catch{return null}}function xc(i){const e=i.trim().split(/\r?\n/),t=e.shift()?.split(",")??[];return e.map(n=>{const s=n.split(","),r={};return t.forEach((a,o)=>r[a.trim()]=(s[o]??"").trim()),r})}async function j0(i){const e=await pc(i),t=mc(e);return t||xc(e).map(s=>({timestamp:Number(s.timestamp),ecg:s.ecg!==void 0&&s.ecg!==""?Number(s.ecg):void 0,resp:s.resp!==void 0&&s.resp!==""?Number(s.resp):void 0})).filter(s=>Number.isFinite(s.timestamp))}async function $0(i){const e=await pc(i),t=mc(e);return t||xc(e).map(s=>({start_ts:Number(s.start_ts),end_ts:Number(s.end_ts),label:s.label??"neutral"})).filter(s=>Number.isFinite(s.start_ts)&&Number.isFinite(s.end_ts)&&s.end_ts>s.start_ts)}function bl(i){const e=i.length;if(e===0)return i;const t=i.reduce((r,a)=>r+a,0)/e,n=i.reduce((r,a)=>r+(a-t)**2,0)/e,s=Math.sqrt(n)||1e-6;return i.map(r=>(r-t)/s)}function gc(i,e,t,n,s){if(t===i)return e;const r=(s-i)/(t-i);return e+r*(n-e)}function yl(i,e,t){let n=0,s=i.length-1;if(t<=i[0])return e[0];if(t>=i[s])return e[s];for(;s-n>1;){const r=n+s>>1;i[r]<=t?n=r:s=r}return gc(i[n],e[n],i[s],e[s],t)}function K0(i,e){return i.map(t=>e.find(s=>t>=s.start_ts&&t<s.end_ts)?.label??"neutral")}function Z0(i,e,t=30){if(!i.length)return{t:[]};const n=i.map(y=>y.timestamp),s=i.map(y=>y.ecg).filter(y=>typeof y=="number"),r=i.map(y=>y.resp).filter(y=>typeof y=="number"),a=s.length>0,o=r.length>0,c=a?i.map(y=>typeof y.ecg=="number"?y.ecg:NaN):[],l=o?i.map(y=>typeof y.resp=="number"?y.resp:NaN):[];function h(y){if(!y.length)return y;let w=y.find(S=>Number.isFinite(S));const U=y.slice();for(let S=0;S<U.length;S++){if(!Number.isFinite(U[S])){let M=S+1,L;for(;M<U.length&&!Number.isFinite(U[M]);)M++;M<U.length&&(L=U[M]);const V=w!==void 0&&L!==void 0&&M!==S?gc(0,w,M-S,L,1):w??L??0;U[S]=V}w=U[S]}return U}const u=a?h(c):[],d=o?h(l):[],f=a?bl(u):[],x=o?bl(d):[],g=1e3/t,m=n[0],p=n[n.length-1],E=[];for(let y=m;y<=p;y+=g)E.push(Math.round(y));const b=a?E.map(y=>yl(n,f,y)):void 0,A=o?E.map(y=>yl(n,x,y)):void 0,C=e?K0(E,e):void 0;return{t:E,ecg:b,resp:A,label:C}}function*J0(i){const e=i.t.length;let t=0;for(let n=0;n<e;n++){const s=i.t[n],r=i.ecg?.[n],a=i.resp?.[n],o=i.label?.[n]??"neutral",c=a!==void 0&&a>=t?"inhale":"exhale";t=a??t;const l=d=>1/(1+Math.exp(-d)),h={t:s};r!==void 0&&(h.heart={bpmLike:60+20*l(r),intensity:l(r)}),a!==void 0&&(h.breath={depth:Math.max(0,Math.min(1,(a+3)/6)),phase:c});const u={calm:.2,neutral:.4,focus:.6,amusement:.7,stress:.9};h.emotion={label:o,value01:u[o]??.4},yield h}}function _c(i){console.info("[emotional-core]",i.source,i.emotion,`strength=${i.strength.toFixed(2)}`,i.meta)}const El="#FF3B30",Q0={scout:{id:"scout",role:"sensor",edges:[{target:"explorer",weight:.92},{target:"guardian",weight:.35}]},explorer:{id:"explorer",role:"pathfinder",edges:[{target:"wise",weight:.87},{target:"dreamer",weight:.4}]},wise:{id:"wise",role:"strategist",edges:[{target:"guardian",weight:.65}]},guardian:{id:"guardian",role:"shield",edges:[{target:"explorer",weight:.2}]},dreamer:{id:"dreamer",role:"storyteller",edges:[{target:"wise",weight:.3}]},coward:{id:"coward",role:"sentinel",edges:[{target:"wise",weight:.78}]}},ex=[];function tx(i){ex.forEach(e=>e(i))}function nx(i){const e={type:"DANGER_NEAR",strength:Mc(i.strength),origin:"coward",trace:[],emotionTag:"panic"};_c({source:"biometric",emotion:"panic",strength:e.strength,meta:{impulse:e.type,bpm:i.biometric.bpm,stress:i.biometric.stress}}),vc("coward",e,new Set)}function vc(i,e,t=new Set){if(t.has(i))return;t.add(i);const n=Q0[i];!n||e.strength<=.01||(e.trace.push(i),_c({source:i,emotion:e.emotionTag,strength:e.strength,meta:{impulse:e.type,role:n.role,trace:[...e.trace],color:El}}),tx({node:i,color:El,amplitude:e.strength,comment:`${e.type} ripple`,tremor:e.type==="DANGER_NEAR"?.3:void 0}),n.edges.forEach(s=>{const r=e.strength*Mc(s.weight);if(r<=.01)return;const a={...e,strength:r,trace:[...e.trace]};vc(s.target,a,t)}))}function Mc(i){return Number.isNaN(i)?0:Math.max(0,Math.min(1,i))}class ix{flow;clock;isRunning=!1;pulseCallbacks=[];externalSources={};externalPlaying=!1;externalCursor=0;externalFrames=[];externalTargetHz=30;externalFrameInterval=0;lastExternalFrameTime=0;BREATH_FREQ=.2;HEART_FREQ=1;EMOTION_FREQ=.02;constructor(){this.clock=new Ja,this.flow=this.createDefaultFlow()}createDefaultFlow(){return{layers:[{id:"breath",type:"respiratory",active:!0,data:{phase:0,depth:.85,rate_bpm:12,intensity:.9},visual:{color:"#4fd1c5",pulse_origin:new D(0,5,0),pattern:"wave_expansion",radius:8.5},phase:0,lastPulseTime:0},{id:"heart",type:"cardiovascular",active:!0,data:{bpm:72,hrv:45,intensity:.7,variability:.12},visual:{color:"#f6ad55",pulse_origin:new D(2,0,-3),pattern:"pulse_radiation",radius:6.2},phase:0,lastPulseTime:0},{id:"emotion",type:"affective",active:!0,data:{stress:.3,calm:.8,focus:.6,dominant:"calm",intensity:.5},visual:{color:"#ed64a6",pulse_origin:new D(-2,-3,2),pattern:"node_color_shift",radius:5},phase:0,lastPulseTime:0}],links:[{source:"breath",target:"heart",strength:.8,effect:"amplify",description:"Deep breath amplifies heart pulse"},{source:"heart",target:"emotion",strength:.6,effect:"modulate",description:"Heart rhythm modulates emotional state"},{source:"emotion",target:"breath",strength:.5,effect:"influence",description:"Calm emotion regulates breathing"}]}}loadFlow(e){e.flow&&e.flow.layers&&(this.flow.layers=e.flow.layers.map(t=>({...t,visual:{...t.visual,pulse_origin:new D(t.visual.pulse_origin.x,t.visual.pulse_origin.y,t.visual.pulse_origin.z)},phase:0,lastPulseTime:0})),e.flow.links&&(this.flow.links=e.flow.links))}onPulse(e){this.pulseCallbacks.push(e)}start(){this.isRunning||(this.isRunning=!0,this.clock.start(),this.update(),hs("🧬 Biometric simulator started",["biometric","simulator"]))}stop(){this.isRunning=!1,this.clock.stop(),Rn("🧬 Biometric simulator stopped",["biometric","simulator"])}update(){if(!this.isRunning)return;this.tickExternal();const e=this.clock.getDelta(),t=this.clock.getElapsedTime();(!this.externalPlaying||this.externalFrames.length===0)&&this.flow.layers.forEach(n=>{if(n.active){switch(n.phase+=e,n.type){case"respiratory":this.updateBreathLayer(n,e,t);break;case"cardiovascular":this.updateHeartLayer(n,e,t);break;case"affective":this.updateEmotionLayer(n,e);break}this.applyLinks(n)}}),requestAnimationFrame(()=>this.update())}updateBreathLayer(e,t,n){const s=(e.data.rate_bpm||12)/60;e.phase=(e.phase+t*s*2*Math.PI)%(2*Math.PI);const r=Math.sin(e.phase),a=e.phase<Math.PI;e.data.intensity=.5+(e.data.depth||.5)*(a?r:-r*.3),a&&r>.95&&n-e.lastPulseTime>.5&&(this.triggerPulse(e,e.data.intensity),e.lastPulseTime=n)}updateHeartLayer(e,t,n){const s=e.data.bpm||72,a=1/(s/60),o=e.data.variability||.1,c=Math.sin(n*.5)*o,l=a*(1+c);if(n-e.lastPulseTime>=l){const u=(e.data.intensity||.7)*(1+Math.sin(n*2)*.2);this.triggerPulse(e,u),e.lastPulseTime=n,this.evaluateHybridImpulse(s,this.getEmotionStress())}}updateEmotionLayer(e,t){const n=Math.sin(this.clock.getElapsedTime()*this.EMOTION_FREQ*2*Math.PI)*.1;e.data.stress!==void 0&&(e.data.stress=Math.max(0,Math.min(1,(e.data.stress||.3)+n*.05))),e.data.calm!==void 0&&(e.data.calm=Math.max(0,Math.min(1,(e.data.calm||.8)-n*.05))),e.data.stress&&e.data.calm&&(e.data.dominant=e.data.stress>e.data.calm?"stress":"calm",e.data.intensity=Math.abs(e.data.stress-e.data.calm)),Math.random()<.001&&this.triggerPulse(e,e.data.intensity||.5)}applyLinks(e){this.flow.links.forEach(t=>{if(t.target!==e.id)return;const n=this.flow.layers.find(s=>s.id===t.source);if(!(!n||!n.active))switch(t.effect){case"amplify":n.data.intensity>.7&&(e.data.intensity=Math.min(1,e.data.intensity*(1+t.strength*.1)));break;case"modulate":if(n.type==="cardiovascular"&&n.data.hrv){const r=n.data.hrv/100;e.data.intensity=e.data.intensity*(.9+r*t.strength)}break;case"influence":const s=t.strength*.01;if(n.data.calm&&e.data.rate_bpm){const r=10+n.data.calm*4;e.data.rate_bpm=e.data.rate_bpm*(1-s)+r*s}break}})}triggerPulse(e,t){this.pulseCallbacks.forEach(n=>{n(e,t)})}evaluateHybridImpulse(e,t=0){if(e<=110)return;const n=Math.min(Math.max((e-110)/40,0),1);nx({strength:n,biometric:{bpm:e,stress:t}})}getEmotionStress(){const t=this.getLayer("emotion")?.data.stress??0;return Math.min(Math.max(t,0),1)}getFlow(){return{...this.flow}}getLayer(e){return this.flow.layers.find(t=>t.id===e)}onHeart(e){this.externalSources.heart=e}onBreath(e){this.externalSources.breath=e}onEmotion(e){this.externalSources.emotion=e}async loadFromDatasets(e){try{this.externalTargetHz=e.targetHz??30,this.externalFrameInterval=1e3/this.externalTargetHz,Rn(`Loading biometric data from ${e.physioUrl}...`,["biometric","data"]);const t=await j0(e.physioUrl),n=e.wesadUrl?await $0(e.wesadUrl):null;if(t.length===0){Na("No data loaded from physio source",["biometric","error"]);return}const s=Z0(t,n,this.externalTargetHz);this.externalFrames=Array.from(J0(s)),this.externalCursor=0,this.lastExternalFrameTime=0,hs(`Loaded ${this.externalFrames.length} frames from real data`,["biometric","data"])}catch(t){throw Na(`Failed to load biometric data: ${t}`,["biometric","error"]),t}}playExternal(){this.externalPlaying=!0,this.lastExternalFrameTime=this.clock.getElapsedTime()*1e3,Rn("Playing external biometric data",["biometric","data"])}pauseExternal(){this.externalPlaying=!1,Rn("Paused external biometric data",["biometric","data"])}tickExternal(){if(!this.externalPlaying||this.externalFrames.length===0)return;const e=this.clock.getElapsedTime()*1e3;if(e-this.lastExternalFrameTime>=this.externalFrameInterval){const n=this.externalFrames[this.externalCursor];if(n){if(n.heart&&this.externalSources.heart){this.externalSources.heart(n);const s=this.getLayer("heart");s&&s.active&&(s.data.bpm=n.heart.bpmLike,s.data.intensity=n.heart.intensity,n.heart.intensity>.5&&(this.triggerPulse(s,n.heart.intensity),this.evaluateHybridImpulse(n.heart.bpmLike,this.getEmotionStress())))}if(n.breath&&this.externalSources.breath){this.externalSources.breath(n);const s=this.getLayer("breath");s&&s.active&&(s.data.depth=n.breath.depth,s.data.rate_bpm=n.breath.phase==="inhale"?14:10,s.data.intensity=n.breath.depth,n.breath.phase==="inhale"&&n.breath.depth>.7&&this.triggerPulse(s,n.breath.depth))}if(n.emotion&&this.externalSources.emotion){this.externalSources.emotion(n);const s=this.getLayer("emotion");if(s)switch(s.data.dominant=n.emotion.label,s.data.intensity=n.emotion.value01,n.emotion.label){case"calm":s.data.calm=.9,s.data.stress=.1;break;case"stress":s.data.stress=.9,s.data.calm=.1;break;case"focus":s.data.focus=.8;break;default:s.data.calm=.5,s.data.stress=.3}}}this.externalCursor=(this.externalCursor+1)%this.externalFrames.length,this.lastExternalFrameTime=e}}hasExternalData(){return this.externalFrames.length>0}}let kn=null;function Tl(){if(!kn)return;kn.getFlow().layers.some(e=>e.active)?(kn.stop(),kn.getFlow().layers.forEach(e=>e.active=!1),Rn("🧬 Biometric simulation paused",["biometric"])):(kn.getFlow().layers.forEach(e=>e.active=!0),kn.start(),hs("🧬 Biometric simulation active",["biometric"]))}function sx(){return kn=new ix,kn}let ai,fn,an,si,Fa,$e,eo,qt=null,It=null,Rt=null,Oa,Js,Qi,Ba,Vn=0,Al,Ci=null,Wr=null,rr=null;const wl={uTime:{value:0},uPulsePositions:{value:[new D(1e3,1e3,1e3),new D(1e3,1e3,1e3),new D(1e3,1e3,1e3)]},uPulseTimes:{value:[-1e3,-1e3,-1e3]},uPulseColors:{value:[new xe(1,1,1),new xe(1,1,1),new xe(1,1,1)]},uPulseSpeed:{value:sr.speed},uBaseNodeSize:{value:sr.baseNodeSize}};function rx(i){const e=document.getElementById("formation-title");e&&(e.textContent=uc[i]||`Formation ${i+1}`,e.classList.add("show"),Wr&&clearTimeout(Wr),Wr=setTimeout(()=>{e.classList.remove("show")},2500))}function ti(i,e=1){if(console.log(`Creating formation ${i}, density ${e}`),rx(i),Rn(`Formation: ${uc[i]}`,["network","formation"]),It&&(ai.remove(It),It.geometry.dispose(),It.material.dispose(),It=null),Rt&&(ai.remove(Rt),Rt.geometry.dispose(),Rt.material.dispose(),Rt=null),qt=k0(i,e),!qt||qt.nodes.length===0){console.error("Network generation failed or resulted in zero nodes."),Na("Network generation failed",["network","error"]);return}hs(`Network created: ${qt.nodes.length} nodes`,["network","success"]);const t=new jt,n=[],s=[],r=[],a=[],o=[];qt.nodes.forEach(A=>{n.push(A.position.x,A.position.y,A.position.z),s.push(A.type),r.push(A.size),o.push(A.distanceFromRoot);const C=ns[Pe.activePaletteIndex],y=Math.min(A.level,C.length-1),w=C[y%C.length].clone();w.offsetHSL(Ie.randFloatSpread(At.colorVariation.hue),Ie.randFloatSpread(At.colorVariation.saturation),Ie.randFloatSpread(At.colorVariation.lightness)),a.push(w.r,w.g,w.b)}),t.setAttribute("position",new dt(n,3)),t.setAttribute("nodeType",new dt(s,1)),t.setAttribute("nodeSize",new dt(r,1)),t.setAttribute("nodeColor",new dt(a,3)),t.setAttribute("distanceFromRoot",new dt(o,1));const c=new St({uniforms:qn.clone(wl),vertexShader:xl.vertexShader,fragmentShader:xl.fragmentShader,transparent:!0,depthWrite:!1,blending:is});It=new lu(t,c),ai.add(It);const l=new jt,h=[],u=[],d=[],f=[],x=[],g=[],m=new Set;let p=0;qt.nodes.forEach((A,C)=>{A.connections.forEach(y=>{const w=y.node,U=qt.nodes.indexOf(w);if(U===-1)return;const S=[Math.min(C,U),Math.max(C,U)].join("-");if(!m.has(S)){m.add(S);const M=A.position,L=w.position,O=fc.segmentsPerConnection;for(let V=0;V<O;V++){const W=V/(O-1);d.push(W,0,0),f.push(M.x,M.y,M.z),x.push(L.x,L.y,L.z),g.push(p),u.push(y.strength);const H=ns[Pe.activePaletteIndex],Y=Math.min(Math.floor((A.level+w.level)/2),H.length-1),Z=H[Y%H.length].clone();Z.offsetHSL(Ie.randFloatSpread(.05),Ie.randFloatSpread(.1),Ie.randFloatSpread(.1)),h.push(Z.r,Z.g,Z.b)}p++}})}),l.setAttribute("position",new dt(d,3)),l.setAttribute("startPoint",new dt(f,3)),l.setAttribute("endPoint",new dt(x,3)),l.setAttribute("connectionStrength",new dt(u,1)),l.setAttribute("connectionColor",new dt(h,3)),l.setAttribute("pathIndex",new dt(g,1));const E=new St({uniforms:qn.clone(wl),vertexShader:gl.vertexShader,fragmentShader:gl.fragmentShader,transparent:!0,depthWrite:!1,blending:is});Rt=new au(l,E),ai.add(Rt);const b=ns[Pe.activePaletteIndex];E.uniforms.uPulseColors.value[0].copy(b[0]),E.uniforms.uPulseColors.value[1].copy(b[1]),E.uniforms.uPulseColors.value[2].copy(b[2]),c.uniforms.uPulseColors.value[0].copy(b[0]),c.uniforms.uPulseColors.value[1].copy(b[1]),c.uniforms.uPulseColors.value[2].copy(b[2])}function Sc(i){if(Pe.activePaletteIndex=i,!It||!Rt||!qt)return;const e=ns[i],t=It.geometry.attributes.nodeColor;for(let o=0;o<t.count;o++){const c=qt.nodes[o];if(!c)continue;const l=Math.min(c.level,e.length-1),h=e[l%e.length].clone();h.offsetHSL(Ie.randFloatSpread(At.colorVariation.hue),Ie.randFloatSpread(At.colorVariation.saturation),Ie.randFloatSpread(At.colorVariation.lightness)),t.setXYZ(o,h.r,h.g,h.b)}t.needsUpdate=!0;const n=[],s=new Set;qt.nodes.forEach((o,c)=>{o.connections.forEach(l=>{const h=l.node,u=qt.nodes.indexOf(h);if(u===-1)return;const d=[Math.min(c,u),Math.max(c,u)].join("-");if(!s.has(d)){s.add(d);const f=fc.segmentsPerConnection;for(let x=0;x<f;x++){const g=Math.min(Math.floor((o.level+h.level)/2),e.length-1),m=e[g%e.length].clone();m.offsetHSL(Ie.randFloatSpread(.05),Ie.randFloatSpread(.1),Ie.randFloatSpread(.1)),n.push(m.r,m.g,m.b)}}})}),Rt.geometry.setAttribute("connectionColor",new dt(n,3)),Rt.geometry.attributes.connectionColor.needsUpdate=!0;const r=It.material,a=Rt.material;r.uniforms.uPulseColors.value.forEach((o,c)=>o.copy(e[c%e.length])),a.uniforms.uPulseColors.value.forEach((o,c)=>o.copy(e[c%e.length]))}function bc(i,e,t){if(!It||!Rt)return;const n=eo.getElapsedTime();Vn=(Vn+1)%sr.maxPulses;const s=It.material,r=Rt.material;s.uniforms.uPulsePositions.value[Vn].copy(i),s.uniforms.uPulseTimes.value[Vn]=n,r.uniforms.uPulsePositions.value[Vn].copy(i),r.uniforms.uPulseTimes.value[Vn]=n;const a=new xe(e);s.uniforms.uPulseColors.value[Vn].copy(a),r.uniforms.uPulseColors.value[Vn].copy(a),G0(i.x,i.y,i.z,e,t),qt&&q0(qt,i,e,t,50,.15,.1)}function Cl(i,e){if(Js.x=i/window.innerWidth*2-1,Js.y=-(e/window.innerHeight)*2+1,Oa.setFromCamera(Js,fn),Qi.normal.copy(fn.position).normalize(),Qi.constant=-Qi.normal.dot(fn.position)+fn.position.length()*sr.interactionPlaneOffset,Oa.ray.intersectPlane(Qi,Ba)){const t=ns[Pe.activePaletteIndex],s="#"+t[Math.floor(Math.random()*t.length)].getHexString();bc(Ba,s,1)}}function ax(){an.domElement.addEventListener("click",c=>{c.target.closest(".ui-panel, #control-buttons")||Pe.paused||Cl(c.clientX,c.clientY)}),an.domElement.addEventListener("touchstart",c=>{c.target.closest(".ui-panel, #control-buttons")||(c.preventDefault(),c.touches.length>0&&!Pe.paused&&Cl(c.touches[0].clientX,c.touches[0].clientY))},{passive:!1});const i=document.querySelectorAll(".theme-button");i.forEach(c=>{c.addEventListener("click",l=>{l.stopPropagation();const h=parseInt(c.dataset.theme,10);Sc(h),i.forEach(u=>u.classList.remove("active")),c.classList.add("active")})});const e=document.getElementById("density-slider"),t=document.getElementById("density-value");e.addEventListener("input",c=>{c.stopPropagation();const l=parseInt(e.value,10);Pe.densityFactor=l/100,t.textContent=`${l}%`,clearTimeout(Al),Al=setTimeout(()=>{ti(Pe.currentFormation,Pe.densityFactor)},wi.densitySliderDebounce)});const n=document.getElementById("change-formation-btn"),s=document.getElementById("pause-play-btn"),r=document.getElementById("reset-camera-btn");n.addEventListener("click",c=>{c.stopPropagation(),Pe.currentFormation=(Pe.currentFormation+1)%Pe.numFormations,ti(Pe.currentFormation,Pe.densityFactor),$e.autoRotate=!1,setTimeout(()=>{$e.autoRotate=!0},wi.autoRotateDelay)}),s.addEventListener("click",c=>{c.stopPropagation(),Pe.paused=!Pe.paused,s.textContent=Pe.paused?"Play":"Pause",$e.autoRotate=!Pe.paused}),r.addEventListener("click",c=>{c.stopPropagation(),$e.reset(),$e.autoRotate=!1,setTimeout(()=>{$e.autoRotate=!0},wi.resetCameraDelay)});const a=document.getElementById("demo-mode-btn");a.addEventListener("click",c=>{c.stopPropagation(),Pe.demoMode=!Pe.demoMode,Pe.demoMode?(a.textContent="Stop Demo",a.style.background="rgba(255, 100, 50, .5)",Ci&&clearInterval(Ci),Ci=setInterval(()=>{Pe.currentFormation=(Pe.currentFormation+1)%Pe.numFormations,ti(Pe.currentFormation,Pe.densityFactor),$e.reset(),$e.autoRotate=!0},4e3),Pe.currentFormation=0,ti(0,Pe.densityFactor),$e.reset(),$e.autoRotate=!0):(a.textContent="Demo",a.style.background="",Ci&&(clearInterval(Ci),Ci=null),$e.autoRotate=!1)});const o=document.getElementById("biometric-mode-btn");o.addEventListener("click",c=>{c.stopPropagation(),Tl();const l=rr?.getFlow().layers.some(h=>h.active)||!1;o.textContent=l?"🧬 Bio ON":"🧬 Bio",o.style.background=l?"rgba(100, 200, 255, .4)":""}),window.addEventListener("keydown",c=>{if(!(c.target instanceof HTMLInputElement||c.target instanceof HTMLTextAreaElement))switch(c.key.toLowerCase()){case" ":c.preventDefault(),Pe.paused=!Pe.paused,s.textContent=Pe.paused?"Play":"Pause",$e.autoRotate=!Pe.paused;break;case"r":c.preventDefault(),$e.reset(),$e.autoRotate=!1,setTimeout(()=>{$e.autoRotate=!0},wi.resetCameraDelay);break;case"f":c.preventDefault(),Pe.currentFormation=(Pe.currentFormation+1)%Pe.numFormations,ti(Pe.currentFormation,Pe.densityFactor),$e.autoRotate=!1,setTimeout(()=>{$e.autoRotate=!0},wi.autoRotateDelay);break;case"b":c.preventDefault(),Tl();const l=rr?.getFlow().layers.some(u=>u.active)||!1;o.textContent=l?"🧬 Bio ON":"🧬 Bio",o.style.background=l?"rgba(100, 200, 255, .4)":"";break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":c.preventDefault();const h=parseInt(c.key)-1;h<Pe.numFormations&&(Pe.currentFormation=h,ti(Pe.currentFormation,Pe.densityFactor),$e.autoRotate=!1,setTimeout(()=>{$e.autoRotate=!0},wi.autoRotateDelay));break}})}function yc(){requestAnimationFrame(yc);const i=eo.getElapsedTime();if(!Pe.paused){if(It){const e=It.material;e.uniforms.uTime.value=i,It.rotation.y=Math.sin(i*Ws.rotationFrequency)*Ws.rotationAmplitude}if(Rt){const e=Rt.material;e.uniforms.uTime.value=i,Rt.rotation.y=Math.sin(i*Ws.rotationFrequency)*Ws.rotationAmplitude}}$e.update(),si.render()}function ox(){fn.aspect=window.innerWidth/window.innerHeight,fn.updateProjectionMatrix(),an.setSize(window.innerWidth,window.innerHeight),an.setPixelRatio(Math.min(window.devicePixelRatio,Ji.maxPixelRatio)),si.setSize(window.innerWidth,window.innerHeight),Fa.resolution.set(window.innerWidth,window.innerHeight)}function lx(){const i=document.getElementById("neural-network-canvas");ai=new Qh,ai.fog=new Za(_l.fogColor,_l.fogDensity),fn=new Qt(Ai.fov,window.innerWidth/window.innerHeight,Ai.near,Ai.far),fn.position.set(Ai.initialPosition.x,Ai.initialPosition.y,Ai.initialPosition.z),an=new n0({canvas:i,antialias:Ji.antialias,powerPreference:Ji.powerPreference}),an.setSize(window.innerWidth,window.innerHeight),an.setPixelRatio(Math.min(window.devicePixelRatio,Ji.maxPixelRatio)),an.setClearColor(Ji.clearColor),an.outputColorSpace=Xt,$e=new s0(fn,an.domElement),$e.enableDamping=zn.enableDamping,$e.dampingFactor=zn.dampingFactor,$e.rotateSpeed=zn.rotateSpeed,$e.minDistance=zn.minDistance,$e.maxDistance=zn.maxDistance,$e.autoRotate=zn.autoRotate,$e.autoRotateSpeed=zn.autoRotateSpeed,$e.enablePan=zn.enablePan,si=new b0(an),si.addPass(new y0(ai,fn)),Fa=new zi(new Te(window.innerWidth,window.innerHeight),Gr.strength,Gr.radius,Gr.threshold),si.addPass(Fa);const e=new A0(vl.noiseIntensity,vl.grayscale);si.addPass(e),si.addPass(new w0),Oa=new fu,Js=new Te,Qi=new Tn(new D(0,0,1),0),Ba=new D,eo=new Ja,ax(),ti(Pe.currentFormation,Pe.densityFactor),document.querySelectorAll(".theme-button").forEach(n=>n.classList.remove("active"));const t=document.querySelector(`.theme-button[data-theme="${Pe.activePaletteIndex}"]`);t&&t.classList.add("active"),Sc(Pe.activePaletteIndex),window.addEventListener("resize",ox),rr=sx(),rr.onPulse((n,s)=>{bc(n.visual.pulse_origin,n.visual.color,s)}),yc()}function cx(i){i.innerHTML=`
    <div id="instructions-container" class="ui-panel">
      <div id="instruction-title">Interactive Neural Network</div>
      <div>Click or tap to create energy pulses through the network. Drag to rotate.</div>
      <div style="margin-top: 8px; font-size: 12px; opacity: 0.7;">
        <div>⌨️ Shortcuts: Space (pause), R (reset), F (formation), B (bio), 1-8 (formations)</div>
      </div>
    </div>

    <div id="theme-selector" class="ui-panel">
      <div id="theme-selector-title">Visual Theme</div>
      <div class="theme-grid">
        <button class="theme-button" id="theme-1" data-theme="0" aria-label="Theme 1"></button>
        <button class="theme-button" id="theme-2" data-theme="1" aria-label="Theme 2"></button>
        <button class="theme-button" id="theme-3" data-theme="2" aria-label="Theme 3"></button>
        <button class="theme-button" id="theme-4" data-theme="3" aria-label="Theme 4"></button>
      </div>
      <div id="density-controls">
        <div class="density-label"><span>Density</span><span id="density-value">100%</span></div>
        <input type="range" min="20" max="100" value="100" class="density-slider" id="density-slider" aria-label="Network Density">
      </div>
    </div>

    <div id="control-buttons">
      <button id="change-formation-btn" class="control-button">Formation</button>
      <button id="pause-play-btn" class="control-button">Pause</button>
      <button id="reset-camera-btn" class="control-button">Reset Cam</button>
      <button id="demo-mode-btn" class="control-button">Demo</button>
      <button id="biometric-mode-btn" class="control-button">🧬 Bio</button>
    </div>

    <div id="formation-title" class="formation-title"></div>

    <canvas id="neural-network-canvas"></canvas>
  `,lx()}cx(document.getElementById("app"));
