(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fh="178",F0=0,Od=1,O0=2,lg=1,B0=2,fr=3,Zi=0,Bn=1,yi=2,Jr=0,Eo=1,Bd=2,kd=3,zd=4,k0=5,ws=100,z0=101,V0=102,H0=103,G0=104,W0=200,X0=201,Y0=202,q0=203,df=204,pf=205,$0=206,K0=207,j0=208,Z0=209,J0=210,Q0=211,ex=212,tx=213,nx=214,mf=0,gf=1,_f=2,Bo=3,xf=4,vf=5,yf=6,Sf=7,cg=0,ix=1,rx=2,Qr=0,sx=1,ox=2,ax=3,lx=4,cx=5,ux=6,fx=7,Vd="attached",hx="detached",ug=300,ko=301,zo=302,Mf=303,bf=304,jc=306,Vo=1e3,Yr=1001,Dc=1002,Gn=1003,fg=1004,Sa=1005,Mi=1006,ac=1007,mr=1008,Ji=1009,hg=1010,dg=1011,qa=1012,Oh=1013,zs=1014,Fi=1015,ul=1016,Bh=1017,kh=1018,$a=1020,pg=35902,mg=1021,gg=1022,bi=1023,Ka=1026,ja=1027,zh=1028,Vh=1029,_g=1030,Hh=1031,Gh=1033,lc=33776,cc=33777,uc=33778,fc=33779,Tf=35840,Ef=35841,wf=35842,Af=35843,Rf=36196,Cf=37492,Pf=37496,Df=37808,Lf=37809,If=37810,Nf=37811,Uf=37812,Ff=37813,Of=37814,Bf=37815,kf=37816,zf=37817,Vf=37818,Hf=37819,Gf=37820,Wf=37821,hc=36492,Xf=36494,Yf=36495,xg=36283,qf=36284,$f=36285,Kf=36286,Za=2300,Ja=2301,ou=2302,Hd=2400,Gd=2401,Wd=2402,dx=2500,px=0,vg=1,jf=2,mx=3200,gx=3201,yg=0,_x=1,Xr="",hn="srgb",zn="srgb-linear",Lc="linear",wt="srgb",$s=7680,Xd=519,xx=512,vx=513,yx=514,Sg=515,Sx=516,Mx=517,bx=518,Tx=519,Zf=35044,Yd="300 es",gr=2e3,Ic=2001;class na{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qd=1234567;const Da=Math.PI/180,Ho=180/Math.PI;function Oi(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[r&255]+mn[r>>8&255]+mn[r>>16&255]+mn[r>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function ht(r,e,t){return Math.max(e,Math.min(t,r))}function Wh(r,e){return(r%e+e)%e}function Ex(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function wx(r,e,t){return r!==e?(t-r)/(e-r):0}function La(r,e,t){return(1-t)*r+t*e}function Ax(r,e,t,n){return La(r,e,1-Math.exp(-t*n))}function Rx(r,e=1){return e-Math.abs(Wh(r,e*2)-e)}function Cx(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Px(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Dx(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Lx(r,e){return r+Math.random()*(e-r)}function Ix(r){return r*(.5-Math.random())}function Nx(r){r!==void 0&&(qd=r);let e=qd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ux(r){return r*Da}function Fx(r){return r*Ho}function Ox(r){return(r&r-1)===0&&r!==0}function Bx(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function kx(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function zx(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),f=s((e-n)/2),h=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*f,l*h,a*c);break;case"YZY":r.set(l*h,a*u,l*f,a*c);break;case"ZXZ":r.set(l*f,l*h,a*u,a*c);break;case"XZX":r.set(a*u,l*g,l*d,a*c);break;case"YXY":r.set(l*d,a*u,l*g,a*c);break;case"ZYZ":r.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ni(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function bt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Vx={DEG2RAD:Da,RAD2DEG:Ho,generateUUID:Oi,clamp:ht,euclideanModulo:Wh,mapLinear:Ex,inverseLerp:wx,lerp:La,damp:Ax,pingpong:Rx,smoothstep:Cx,smootherstep:Px,randInt:Dx,randFloat:Lx,randFloatSpread:Ix,seededRandom:Nx,degToRad:Ux,radToDeg:Fx,isPowerOfTwo:Ox,ceilPowerOfTwo:Bx,floorPowerOfTwo:kx,setQuaternionFromProperEuler:zx,normalize:bt,denormalize:Ni};class pt{constructor(e=0,t=0){pt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class as{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],f=n[i+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const w=Math.sqrt(y),A=Math.atan2(w,p*M);m=Math.sin(m*A)/w,a=Math.sin(a*A)/w}const x=a*M;if(l=l*m+h*x,c=c*m+d*x,u=u*m+g*x,f=f*m+_*x,m===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=w,c*=w,u*=w,f*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-a*d,e[t+2]=c*g+u*d+a*h-l*f,e[t+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),f=a(s/2),h=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=n+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=i*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($d.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($d.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),f=2*(s*n-o*t);return this.x=t+l*c+o*f-a*u,this.y=n+l*u+a*c-s*f,this.z=i+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return au.copy(this).projectOnVector(e),this.sub(au)}reflect(e){return this.sub(au.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const au=new V,$d=new as;class rt{constructor(e,t,n,i,s,o,a,l,c){rt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],y=i[4],x=i[7],w=i[2],A=i[5],T=i[8];return s[0]=o*_+a*M+l*w,s[3]=o*m+a*y+l*A,s[6]=o*p+a*x+l*T,s[1]=c*_+u*M+f*w,s[4]=c*m+u*y+f*A,s[7]=c*p+u*x+f*T,s[2]=h*_+d*M+g*w,s[5]=h*m+d*y+g*A,s[8]=h*p+d*x+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=t*f+n*h+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=h*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lu.makeScale(e,t)),this}rotate(e){return this.premultiply(lu.makeRotation(-e)),this}translate(e,t){return this.premultiply(lu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lu=new rt;function Mg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Qa(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Hx(){const r=Qa("canvas");return r.style.display="block",r}const Kd={};function wo(r){r in Kd||(Kd[r]=!0,console.warn(r))}function Gx(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Wx(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Xx(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const jd=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zd=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yx(){const r={enabled:!0,workingColorSpace:zn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===wt&&(i.r=br(i.r),i.g=br(i.g),i.b=br(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===wt&&(i.r=Ao(i.r),i.g=Ao(i.g),i.b=Ao(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Xr?Lc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return wo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return wo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[zn]:{primaries:e,whitePoint:n,transfer:Lc,toXYZ:jd,fromXYZ:Zd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:wt,toXYZ:jd,fromXYZ:Zd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),r}const gt=Yx();function br(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ao(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ks;class qx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ks===void 0&&(Ks=Qa("canvas")),Ks.width=e.width,Ks.height=e.height;const i=Ks.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ks}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=br(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(br(t[n]/255)*255):t[n]=br(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $x=0;class Xh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$x++}),this.uuid=Oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(cu(i[o].image)):s.push(cu(i[o]))}else s=cu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function cu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?qx.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kx=0;const uu=new V;class sn extends na{constructor(e=sn.DEFAULT_IMAGE,t=sn.DEFAULT_MAPPING,n=Yr,i=Yr,s=Mi,o=mr,a=bi,l=Ji,c=sn.DEFAULT_ANISOTROPY,u=Xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=Oi(),this.name="",this.source=new Xh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new pt(0,0),this.repeat=new pt(1,1),this.center=new pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(uu).x}get height(){return this.source.getSize(uu).y}get depth(){return this.source.getSize(uu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ug)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vo:e.x=e.x-Math.floor(e.x);break;case Yr:e.x=e.x<0?0:1;break;case Dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vo:e.y=e.y-Math.floor(e.y);break;case Yr:e.y=e.y<0?0:1;break;case Dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=ug;sn.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,n=0,i=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,x=(d+1)/2,w=(p+1)/2,A=(u+h)/4,T=(f+_)/4,C=(g+m)/4;return y>x&&y>w?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=A/n,s=T/n):x>w?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=A/i,s=C/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=T/s,i=C/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jx extends na{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new sn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Mi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Xh(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Er extends jx{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class bg extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zx extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=Yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nr{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ci):Ci.fromBufferAttribute(s,o),Ci.applyMatrix4(e.matrixWorld),this.expandByPoint(Ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ml.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ml.copy(n.boundingBox)),ml.applyMatrix4(e.matrixWorld),this.union(ml)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ci),Ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(la),gl.subVectors(this.max,la),js.subVectors(e.a,la),Zs.subVectors(e.b,la),Js.subVectors(e.c,la),Pr.subVectors(Zs,js),Dr.subVectors(Js,Zs),us.subVectors(js,Js);let t=[0,-Pr.z,Pr.y,0,-Dr.z,Dr.y,0,-us.z,us.y,Pr.z,0,-Pr.x,Dr.z,0,-Dr.x,us.z,0,-us.x,-Pr.y,Pr.x,0,-Dr.y,Dr.x,0,-us.y,us.x,0];return!fu(t,js,Zs,Js,gl)||(t=[1,0,0,0,1,0,0,0,1],!fu(t,js,Zs,Js,gl))?!1:(_l.crossVectors(Pr,Dr),t=[_l.x,_l.y,_l.z],fu(t,js,Zs,Js,gl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const rr=[new V,new V,new V,new V,new V,new V,new V,new V],Ci=new V,ml=new nr,js=new V,Zs=new V,Js=new V,Pr=new V,Dr=new V,us=new V,la=new V,gl=new V,_l=new V,fs=new V;function fu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){fs.fromArray(r,s);const a=i.x*Math.abs(fs.x)+i.y*Math.abs(fs.y)+i.z*Math.abs(fs.z),l=e.dot(fs),c=t.dot(fs),u=n.dot(fs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Jx=new nr,ca=new V,hu=new V;class ir{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Jx.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ca.subVectors(e,this.center);const t=ca.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ca,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ca.copy(e.center).add(hu)),this.expandByPoint(ca.copy(e.center).sub(hu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const sr=new V,du=new V,xl=new V,Lr=new V,pu=new V,vl=new V,mu=new V;class Zc{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=sr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(sr.copy(this.origin).addScaledVector(this.direction,t),sr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){du.copy(e).add(t).multiplyScalar(.5),xl.copy(t).sub(e).normalize(),Lr.copy(this.origin).sub(du);const s=e.distanceTo(t)*.5,o=-this.direction.dot(xl),a=Lr.dot(this.direction),l=-Lr.dot(xl),c=Lr.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(du).addScaledVector(xl,h),d}intersectSphere(e,t){sr.subVectors(e.center,this.origin);const n=sr.dot(this.direction),i=sr.dot(sr)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,sr)!==null}intersectTriangle(e,t,n,i,s){pu.subVectors(t,e),vl.subVectors(n,e),mu.crossVectors(pu,vl);let o=this.direction.dot(mu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Lr.subVectors(this.origin,e);const l=a*this.direction.dot(vl.crossVectors(Lr,vl));if(l<0)return null;const c=a*this.direction.dot(pu.cross(Lr));if(c<0||l+c>o)return null;const u=-a*Lr.dot(mu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,i,s,o,a,l,c,u,f,h,d,g,_,m){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,f,h,d,g,_,m)}set(e,t,n,i,s,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Qs.setFromMatrixColumn(e,0).length(),s=1/Qs.setFromMatrixColumn(e,1).length(),o=1/Qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qx,e,ev)}lookAt(e,t,n){const i=this.elements;return Jn.subVectors(e,t),Jn.lengthSq()===0&&(Jn.z=1),Jn.normalize(),Ir.crossVectors(n,Jn),Ir.lengthSq()===0&&(Math.abs(n.z)===1?Jn.x+=1e-4:Jn.z+=1e-4,Jn.normalize(),Ir.crossVectors(n,Jn)),Ir.normalize(),yl.crossVectors(Jn,Ir),i[0]=Ir.x,i[4]=yl.x,i[8]=Jn.x,i[1]=Ir.y,i[5]=yl.y,i[9]=Jn.y,i[2]=Ir.z,i[6]=yl.z,i[10]=Jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],x=n[11],w=n[15],A=i[0],T=i[4],C=i[8],b=i[12],v=i[1],P=i[5],U=i[9],B=i[13],W=i[2],Z=i[6],X=i[10],H=i[14],k=i[3],re=i[7],L=i[11],pe=i[15];return s[0]=o*A+a*v+l*W+c*k,s[4]=o*T+a*P+l*Z+c*re,s[8]=o*C+a*U+l*X+c*L,s[12]=o*b+a*B+l*H+c*pe,s[1]=u*A+f*v+h*W+d*k,s[5]=u*T+f*P+h*Z+d*re,s[9]=u*C+f*U+h*X+d*L,s[13]=u*b+f*B+h*H+d*pe,s[2]=g*A+_*v+m*W+p*k,s[6]=g*T+_*P+m*Z+p*re,s[10]=g*C+_*U+m*X+p*L,s[14]=g*b+_*B+m*H+p*pe,s[3]=M*A+y*v+x*W+w*k,s[7]=M*T+y*P+x*Z+w*re,s[11]=M*C+y*U+x*X+w*L,s[15]=M*b+y*B+x*H+w*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*f-i*c*f-s*a*h+n*c*h+i*a*d-n*l*d)+_*(+t*l*d-t*c*h+s*o*h-i*o*d+i*c*u-s*l*u)+m*(+t*c*f-t*a*d-s*o*f+n*o*d+s*a*u-n*c*u)+p*(-i*a*u-t*l*f+t*a*h+i*o*f-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,y=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,x=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,w=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,A=t*M+n*y+i*x+s*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=M*T,e[1]=(_*h*s-f*m*s-_*i*d+n*m*d+f*i*p-n*h*p)*T,e[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*p+n*l*p)*T,e[3]=(f*l*s-a*h*s-f*i*c+n*h*c+a*i*d-n*l*d)*T,e[4]=y*T,e[5]=(u*m*s-g*h*s+g*i*d-t*m*d-u*i*p+t*h*p)*T,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*T,e[7]=(o*h*s-u*l*s+u*i*c-t*h*c-o*i*d+t*l*d)*T,e[8]=x*T,e[9]=(g*f*s-u*_*s-g*n*d+t*_*d+u*n*p-t*f*p)*T,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*T,e[11]=(u*a*s-o*f*s-u*n*c+t*f*c+o*n*d-t*a*d)*T,e[12]=w*T,e[13]=(u*_*i-g*f*i+g*n*h-t*_*h-u*n*m+t*f*m)*T,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*T,e[15]=(o*f*i-u*a*i+u*n*l-t*f*l-o*n*h+t*a*h)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,M=l*c,y=l*u,x=l*f,w=n.x,A=n.y,T=n.z;return i[0]=(1-(_+p))*w,i[1]=(d+x)*w,i[2]=(g-y)*w,i[3]=0,i[4]=(d-x)*A,i[5]=(1-(h+p))*A,i[6]=(m+M)*A,i[7]=0,i[8]=(g+y)*T,i[9]=(m-M)*T,i[10]=(1-(h+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Qs.set(i[0],i[1],i[2]).length();const o=Qs.set(i[4],i[5],i[6]).length(),a=Qs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Pi.copy(this);const c=1/s,u=1/o,f=1/a;return Pi.elements[0]*=c,Pi.elements[1]*=c,Pi.elements[2]*=c,Pi.elements[4]*=u,Pi.elements[5]*=u,Pi.elements[6]*=u,Pi.elements[8]*=f,Pi.elements[9]*=f,Pi.elements[10]*=f,t.setFromRotationMatrix(Pi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=gr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),f=(t+e)/(t-e),h=(n+i)/(n-i);let d,g;if(a===gr)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ic)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=gr){const l=this.elements,c=1/(t-e),u=1/(n-i),f=1/(o-s),h=(t+e)*c,d=(n+i)*u;let g,_;if(a===gr)g=(o+s)*f,_=-2*f;else if(a===Ic)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Qs=new V,Pi=new st,Qx=new V(0,0,0),ev=new V(1,1,1),Ir=new V,yl=new V,Jn=new V,Jd=new st,Qd=new as;class Qi{constructor(e=0,t=0,n=0,i=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],f=i[2],h=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Jd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qd.setFromEuler(this),this.setFromQuaternion(Qd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class Tg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tv=0;const ep=new V,eo=new as,or=new st,Sl=new V,ua=new V,nv=new V,iv=new as,tp=new V(1,0,0),np=new V(0,1,0),ip=new V(0,0,1),rp={type:"added"},rv={type:"removed"},to={type:"childadded",child:null},gu={type:"childremoved",child:null};class Ht extends na{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tv++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ht.DEFAULT_UP.clone();const e=new V,t=new Qi,n=new as,i=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new st},normalMatrix:{value:new rt}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return eo.setFromAxisAngle(e,t),this.quaternion.multiply(eo),this}rotateOnWorldAxis(e,t){return eo.setFromAxisAngle(e,t),this.quaternion.premultiply(eo),this}rotateX(e){return this.rotateOnAxis(tp,e)}rotateY(e){return this.rotateOnAxis(np,e)}rotateZ(e){return this.rotateOnAxis(ip,e)}translateOnAxis(e,t){return ep.copy(e).applyQuaternion(this.quaternion),this.position.add(ep.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tp,e)}translateY(e){return this.translateOnAxis(np,e)}translateZ(e){return this.translateOnAxis(ip,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(or.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Sl.copy(e):Sl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ua.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?or.lookAt(ua,Sl,this.up):or.lookAt(Sl,ua,this.up),this.quaternion.setFromRotationMatrix(or),i&&(or.extractRotation(i.matrixWorld),eo.setFromRotationMatrix(or),this.quaternion.premultiply(eo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rp),to.child=e,this.dispatchEvent(to),to.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rv),gu.child=e,this.dispatchEvent(gu),gu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),or.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),or.multiply(e.parent.matrixWorld)),e.applyMatrix4(or),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rp),to.child=e,this.dispatchEvent(to),to.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,e,nv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,iv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Ht.DEFAULT_UP=new V(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Di=new V,ar=new V,_u=new V,lr=new V,no=new V,io=new V,sp=new V,xu=new V,vu=new V,yu=new V,Su=new vt,Mu=new vt,bu=new vt;class Ui{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Di.subVectors(e,t),i.cross(Di);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Di.subVectors(i,t),ar.subVectors(n,t),_u.subVectors(e,t);const o=Di.dot(Di),a=Di.dot(ar),l=Di.dot(_u),c=ar.dot(ar),u=ar.dot(_u),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,lr)===null?!1:lr.x>=0&&lr.y>=0&&lr.x+lr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,lr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,lr.x),l.addScaledVector(o,lr.y),l.addScaledVector(a,lr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Su.setScalar(0),Mu.setScalar(0),bu.setScalar(0),Su.fromBufferAttribute(e,t),Mu.fromBufferAttribute(e,n),bu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Su,s.x),o.addScaledVector(Mu,s.y),o.addScaledVector(bu,s.z),o}static isFrontFacing(e,t,n,i){return Di.subVectors(n,t),ar.subVectors(e,t),Di.cross(ar).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Di.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),Di.cross(ar).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ui.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ui.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Ui.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Ui.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ui.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;no.subVectors(i,n),io.subVectors(s,n),xu.subVectors(e,n);const l=no.dot(xu),c=io.dot(xu);if(l<=0&&c<=0)return t.copy(n);vu.subVectors(e,i);const u=no.dot(vu),f=io.dot(vu);if(u>=0&&f<=u)return t.copy(i);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(no,o);yu.subVectors(e,s);const d=no.dot(yu),g=io.dot(yu);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(io,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return sp.subVectors(s,i),a=(f-u)/(f-u+(d-g)),t.copy(i).addScaledVector(sp,a);const p=1/(m+_+h);return o=_*p,a=h*p,t.copy(n).addScaledVector(no,o).addScaledVector(io,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Eg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nr={h:0,s:0,l:0},Ml={h:0,s:0,l:0};function Tu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=gt.workingColorSpace){if(e=Wh(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Tu(o,s,e+1/3),this.g=Tu(o,s,e),this.b=Tu(o,s,e-1/3)}return gt.colorSpaceToWorking(this,i),this}setStyle(e,t=hn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=Eg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=br(e.r),this.g=br(e.g),this.b=br(e.b),this}copyLinearToSRGB(e){return this.r=Ao(e.r),this.g=Ao(e.g),this.b=Ao(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return gt.workingToColorSpace(gn.copy(this),e),Math.round(ht(gn.r*255,0,255))*65536+Math.round(ht(gn.g*255,0,255))*256+Math.round(ht(gn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(gn.copy(this),t);const n=gn.r,i=gn.g,s=gn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case n:l=(i-s)/f+(i<s?6:0);break;case i:l=(s-n)/f+2;break;case s:l=(n-i)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=hn){gt.workingToColorSpace(gn.copy(this),e);const t=gn.r,n=gn.g,i=gn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Nr),this.setHSL(Nr.h+e,Nr.s+t,Nr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nr),e.getHSL(Ml);const n=La(Nr.h,Ml.h,t),i=La(Nr.s,Ml.s,t),s=La(Nr.l,Ml.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new et;et.NAMES=Eg;let sv=0;class Ki extends na{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sv++}),this.uuid=Oi(),this.name="",this.type="Material",this.blending=Eo,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=df,this.blendDst=pf,this.blendEquation=ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=Bo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$s,this.stencilZFail=$s,this.stencilZPass=$s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Eo&&(n.blending=this.blending),this.side!==Zi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==df&&(n.blendSrc=this.blendSrc),this.blendDst!==pf&&(n.blendDst=this.blendDst),this.blendEquation!==ws&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class _r extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=cg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kt=new V,bl=new pt;let ov=0;class kn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ov++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zf,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bl.fromBufferAttribute(this,t),bl.applyMatrix3(e),this.setXY(t,bl.x,bl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zf&&(e.usage=this.usage),e}}class wg extends kn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ag extends kn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ai extends kn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let av=0;const pi=new st,Eu=new Ht,ro=new V,Qn=new nr,fa=new nr,ln=new V;class ki extends na{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:av++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mg(e)?Ag:wg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new rt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,t,n){return pi.makeTranslation(e,t,n),this.applyMatrix4(pi),this}scale(e,t,n){return pi.makeScale(e,t,n),this.applyMatrix4(pi),this}lookAt(e){return Eu.lookAt(e),Eu.updateMatrix(),this.applyMatrix4(Eu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ro).negate(),this.translate(ro.x,ro.y,ro.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ai(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Qn.setFromBufferAttribute(s),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Qn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Qn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Qn.min),this.boundingBox.expandByPoint(Qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ir);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(Qn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];fa.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(Qn.min,fa.min),Qn.expandByPoint(ln),ln.addVectors(Qn.max,fa.max),Qn.expandByPoint(ln)):(Qn.expandByPoint(fa.min),Qn.expandByPoint(fa.max))}Qn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)ln.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(ln));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ln.fromBufferAttribute(a,c),l&&(ro.fromBufferAttribute(e,c),ln.add(ro)),i=Math.max(i,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new V,l[C]=new V;const c=new V,u=new V,f=new V,h=new pt,d=new pt,g=new pt,_=new V,m=new V;function p(C,b,v){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,b),f.fromBufferAttribute(n,v),h.fromBufferAttribute(s,C),d.fromBufferAttribute(s,b),g.fromBufferAttribute(s,v),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[C].add(_),a[b].add(_),a[v].add(_),l[C].add(m),l[b].add(m),l[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let C=0,b=M.length;C<b;++C){const v=M[C],P=v.start,U=v.count;for(let B=P,W=P+U;B<W;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const y=new V,x=new V,w=new V,A=new V;function T(C){w.fromBufferAttribute(i,C),A.copy(w);const b=a[C];y.copy(b),y.sub(w.multiplyScalar(w.dot(b))).normalize(),x.crossVectors(A,b);const P=x.dot(l[C])<0?-1:1;o.setXYZW(C,y.x,y.y,y.z,P)}for(let C=0,b=M.length;C<b;++C){const v=M[C],P=v.start,U=v.count;for(let B=P,W=P+U;B<W;B+=3)T(e.getX(B+0)),T(e.getX(B+1)),T(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new kn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const i=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,f=new V;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(i,s),u.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(i,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new kn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ki,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const op=new st,hs=new Zc,Tl=new ir,ap=new V,El=new V,wl=new V,Al=new V,wu=new V,Rl=new V,lp=new V,Cl=new V;class On extends Ht{constructor(e=new ki,t=new _r){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Rl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(wu.fromBufferAttribute(f,e),o?Rl.addScaledVector(wu,u):Rl.addScaledVector(wu.sub(t),u))}t.add(Rl)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tl.copy(n.boundingSphere),Tl.applyMatrix4(s),hs.copy(e.ray).recast(e.near),!(Tl.containsPoint(hs.origin)===!1&&(hs.intersectSphere(Tl,ap)===null||hs.origin.distanceToSquared(ap)>(e.far-e.near)**2))&&(op.copy(s).invert(),hs.copy(e.ray).applyMatrix4(op),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,w=y;x<w;x+=3){const A=a.getX(x),T=a.getX(x+1),C=a.getX(x+2);i=Pl(this,p,e,n,c,u,f,A,T,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);i=Pl(this,o,e,n,c,u,f,M,y,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,w=y;x<w;x+=3){const A=x,T=x+1,C=x+2;i=Pl(this,p,e,n,c,u,f,A,T,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,x=m+2;i=Pl(this,o,e,n,c,u,f,M,y,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function lv(r,e,t,n,i,s,o,a){let l;if(e.side===Bn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Zi,a),l===null)return null;Cl.copy(a),Cl.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Cl);return c<t.near||c>t.far?null:{distance:c,point:Cl.clone(),object:r}}function Pl(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,El),r.getVertexPosition(l,wl),r.getVertexPosition(c,Al);const u=lv(r,e,t,n,El,wl,Al,lp);if(u){const f=new V;Ui.getBarycoord(lp,El,wl,Al,f),i&&(u.uv=Ui.getInterpolatedAttribute(i,a,l,c,f,new pt)),s&&(u.uv1=Ui.getInterpolatedAttribute(s,a,l,c,f,new pt)),o&&(u.normal=Ui.getInterpolatedAttribute(o,a,l,c,f,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new V,materialIndex:0};Ui.getNormal(El,wl,Al,h.normal),u.face=h,u.barycoord=f}return u}class fl extends ki{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ai(c,3)),this.setAttribute("normal",new Ai(u,3)),this.setAttribute("uv",new Ai(f,2));function g(_,m,p,M,y,x,w,A,T,C,b){const v=x/T,P=w/C,U=x/2,B=w/2,W=A/2,Z=T+1,X=C+1;let H=0,k=0;const re=new V;for(let L=0;L<X;L++){const pe=L*P-B;for(let Fe=0;Fe<Z;Fe++){const Ye=Fe*v-U;re[_]=Ye*M,re[m]=pe*y,re[p]=W,c.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[p]=A>0?1:-1,u.push(re.x,re.y,re.z),f.push(Fe/T),f.push(1-L/C),H+=1}}for(let L=0;L<C;L++)for(let pe=0;pe<T;pe++){const Fe=h+pe+Z*L,Ye=h+pe+Z*(L+1),j=h+(pe+1)+Z*(L+1),ue=h+(pe+1)+Z*L;l.push(Fe,Ye,ue),l.push(Ye,j,ue),k+=6}a.addGroup(d,k,b),d+=k,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Go(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Cn(r){const e={};for(let t=0;t<r.length;t++){const n=Go(r[t]);for(const i in n)e[i]=n[i]}return e}function cv(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Rg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}const uv={clone:Go,merge:Cn};var fv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wr extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fv,this.fragmentShader=hv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Go(e.uniforms),this.uniformsGroups=cv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Cg extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=gr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ur=new V,cp=new pt,up=new pt;class Nn extends Cg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ho*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ho*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ur.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ur.x,Ur.y).multiplyScalar(-e/Ur.z),Ur.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ur.x,Ur.y).multiplyScalar(-e/Ur.z)}getViewSize(e,t){return this.getViewBounds(e,cp,up),t.subVectors(up,cp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Da*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const so=-90,oo=1;class dv extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Nn(so,oo,e,t);i.layers=this.layers,this.add(i);const s=new Nn(so,oo,e,t);s.layers=this.layers,this.add(s);const o=new Nn(so,oo,e,t);o.layers=this.layers,this.add(o);const a=new Nn(so,oo,e,t);a.layers=this.layers,this.add(a);const l=new Nn(so,oo,e,t);l.layers=this.layers,this.add(l);const c=new Nn(so,oo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===gr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ic)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Pg extends sn{constructor(e=[],t=ko,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pv extends Er{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Pg(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new fl(5,5,5),s=new wr({name:"CubemapFromEquirect",uniforms:Go(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bn,blending:Jr});s.uniforms.tEquirect.value=t;const o=new On(i,s),a=t.minFilter;return t.minFilter===mr&&(t.minFilter=Mi),new dv(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class xr extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mv={type:"move"};class Au{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new xr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class gv extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class _v{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zf,this.updateRanges=[],this.version=0,this.uuid=Oi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new V;class Yh{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new kn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Yh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const fp=new V,hp=new vt,dp=new vt,xv=new V,pp=new st,Dl=new V,Ru=new ir,mp=new st,Cu=new Zc;class vv extends On{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Vd,this.bindMatrix=new st,this.bindMatrixInverse=new st,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new nr),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Dl),this.boundingBox.expandByPoint(Dl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ir),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Dl),this.boundingSphere.expandByPoint(Dl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ru.copy(this.boundingSphere),Ru.applyMatrix4(i),e.ray.intersectsSphere(Ru)!==!1&&(mp.copy(i).invert(),Cu.copy(e.ray).applyMatrix4(mp),!(this.boundingBox!==null&&Cu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new vt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Vd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hx?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;hp.fromBufferAttribute(i.attributes.skinIndex,e),dp.fromBufferAttribute(i.attributes.skinWeight,e),fp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=dp.getComponent(s);if(o!==0){const a=hp.getComponent(s);pp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(xv.copy(fp).applyMatrix4(pp),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Dg extends Ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Lg extends sn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Gn,u=Gn,f,h){super(null,o,a,l,c,u,i,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const gp=new st,yv=new st;class qh{constructor(e=[],t=[]){this.uuid=Oi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new st)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new st;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:yv;gp.multiplyMatrices(a,t[s]),gp.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new qh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Lg(t,e,e,bi,Fi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Dg),this.bones.push(o),this.boneInverses.push(new st().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Jf extends kn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ao=new st,_p=new st,Ll=[],xp=new nr,Sv=new st,ha=new On,da=new ir;class Mv extends On{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Sv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new nr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),xp.copy(e.boundingBox).applyMatrix4(ao),this.boundingBox.union(xp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ir),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ao),da.copy(e.boundingSphere).applyMatrix4(ao),this.boundingSphere.union(da)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ha.geometry=this.geometry,ha.material=this.material,ha.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),da.copy(this.boundingSphere),da.applyMatrix4(n),e.ray.intersectsSphere(da)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ao),_p.multiplyMatrices(n,ao),ha.matrixWorld=_p,ha.raycast(e,Ll);for(let o=0,a=Ll.length;o<a;o++){const l=Ll[o];l.instanceId=s,l.object=this,t.push(l)}Ll.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Lg(new Float32Array(i*this.count),i,this.count,zh,Fi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pu=new V,bv=new V,Tv=new rt;class ys{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pu.subVectors(n,t).cross(bv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Tv.getNormalMatrix(e),i=this.coplanarPoint(Pu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new ir,Ev=new pt(.5,.5),Il=new V;class $h{constructor(e=new ys,t=new ys,n=new ys,i=new ys,s=new ys,o=new ys){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],f=i[6],h=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],y=i[14],x=i[15];if(n[0].setComponents(l-s,h-c,m-d,x-p).normalize(),n[1].setComponents(l+s,h+c,m+d,x+p).normalize(),n[2].setComponents(l+o,h+u,m+g,x+M).normalize(),n[3].setComponents(l-o,h-u,m-g,x-M).normalize(),n[4].setComponents(l-a,h-f,m-_,x-y).normalize(),t===gr)n[5].setComponents(l+a,h+f,m+_,x+y).normalize();else if(t===Ic)n[5].setComponents(a,f,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);const t=Ev.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Il.x=i.normal.x>0?e.max.x:e.min.x,Il.y=i.normal.y>0?e.max.y:e.min.y,Il.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Il)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ig extends Ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Nc=new V,Uc=new V,vp=new st,pa=new Zc,Nl=new ir,Du=new V,yp=new V;class Kh extends Ht{constructor(e=new ki,t=new Ig){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Nc.fromBufferAttribute(t,i-1),Uc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Nc.distanceTo(Uc);e.setAttribute("lineDistance",new Ai(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nl.copy(n.boundingSphere),Nl.applyMatrix4(i),Nl.radius+=s,e.ray.intersectsSphere(Nl)===!1)return;vp.copy(i).invert(),pa.copy(e.ray).applyMatrix4(vp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=u.getX(_),M=u.getX(_+1),y=Ul(this,e,pa,l,p,M,_);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=Ul(this,e,pa,l,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=Ul(this,e,pa,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Ul(this,e,pa,l,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ul(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Nc.fromBufferAttribute(a,i),Uc.fromBufferAttribute(a,s),t.distanceSqToSegment(Nc,Uc,Du,yp)>n)return;Du.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Du);if(!(c<e.near||c>e.far))return{distance:c,point:yp.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Sp=new V,Mp=new V;class wv extends Kh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Sp.fromBufferAttribute(t,i),Mp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Sp.distanceTo(Mp);e.setAttribute("lineDistance",new Ai(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Av extends Kh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ng extends Ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bp=new st,Qf=new Zc,Fl=new ir,Ol=new V;class Rv extends Ht{constructor(e=new ki,t=new Ng){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fl.copy(n.boundingSphere),Fl.applyMatrix4(i),Fl.radius+=s,e.ray.intersectsSphere(Fl)===!1)return;bp.copy(i).invert(),Qf.copy(e.ray).applyMatrix4(bp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=c.getX(g);Ol.fromBufferAttribute(f,m),Tp(Ol,m,l,i,e,t,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)Ol.fromBufferAttribute(f,g),Tp(Ol,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Tp(r,e,t,n,i,s,o){const a=Qf.distanceSqToPoint(r);if(a<t){const l=new V;Qf.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Cv extends sn{constructor(e,t,n,i,s,o,a,l,c){super(e,t,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ug extends sn{constructor(e,t,n=zs,i,s,o,a=Gn,l=Gn,c,u=Ka,f=1){if(u!==Ka&&u!==ja)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Xh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class hl extends ki{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,f=e/a,h=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const M=p*h-o;for(let y=0;y<c;y++){const x=y*f-s;g.push(x,-M,0),_.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const y=M+c*p,x=M+c*(p+1),w=M+1+c*(p+1),A=M+1+c*p;d.push(y,x,A),d.push(x,w,A)}this.setIndex(d),this.setAttribute("position",new Ai(g,3)),this.setAttribute("normal",new Ai(_,3)),this.setAttribute("uv",new Ai(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hl(e.width,e.height,e.widthSegments,e.heightSegments)}}class jh extends ki{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new V,h=new V,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],y=p/n;let x=0;p===0&&o===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let w=0;w<=t;w++){const A=w/t;f.x=-e*Math.cos(i+A*s)*Math.sin(o+y*a),f.y=e*Math.cos(o+y*a),f.z=e*Math.sin(i+A*s)*Math.sin(o+y*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(A+x,1-y),M.push(c++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const y=u[p][M+1],x=u[p][M],w=u[p+1][M],A=u[p+1][M+1];(p!==0||o>0)&&d.push(y,x,A),(p!==n-1||l<Math.PI)&&d.push(x,w,A)}this.setIndex(d),this.setAttribute("position",new Ai(g,3)),this.setAttribute("normal",new Ai(_,3)),this.setAttribute("uv",new Ai(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zh extends Ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yg,this.normalScale=new pt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Cr extends Zh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new et(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new et(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new et(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Pv extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dv extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Bl(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Lv(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Iv(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ep(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Fg(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class dl{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Nv extends dl{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hd,endingEnd:Hd}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Gd:s=e,a=2*t-n;break;case Wd:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Gd:o=e,l=2*n-t;break;case Wd:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,M=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,y=(-1-d)*m+(1.5+d)*_+.5*g,x=d*m-d*_;for(let w=0;w!==a;++w)s[w]=p*o[u+w]+M*o[c+w]+y*o[l+w]+x*o[f+w];return s}}class Uv extends dl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*f+o[l+h]*u;return s}}class Fv extends dl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class zi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Bl(t,this.TimeBufferType),this.values=Bl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Bl(e.times,Array),values:Bl(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Uv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Nv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Za:t=this.InterpolantFactoryMethodDiscrete;break;case Ja:t=this.InterpolantFactoryMethodLinear;break;case ou:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Za;case this.InterpolantFactoryMethodLinear:return Ja;case this.InterpolantFactoryMethodSmooth:return ou}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Lv(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ou,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){const _=t[f+g];if(_!==t[h+g]||_!==t[d+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const f=a*n,h=o*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}zi.prototype.ValueTypeName="";zi.prototype.TimeBufferType=Float32Array;zi.prototype.ValueBufferType=Float32Array;zi.prototype.DefaultInterpolation=Ja;class ia extends zi{constructor(e,t,n){super(e,t,n)}}ia.prototype.ValueTypeName="bool";ia.prototype.ValueBufferType=Array;ia.prototype.DefaultInterpolation=Za;ia.prototype.InterpolantFactoryMethodLinear=void 0;ia.prototype.InterpolantFactoryMethodSmooth=void 0;class Og extends zi{constructor(e,t,n,i){super(e,t,n,i)}}Og.prototype.ValueTypeName="color";class Wo extends zi{constructor(e,t,n,i){super(e,t,n,i)}}Wo.prototype.ValueTypeName="number";class Ov extends dl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)as.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Xo extends zi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ov(this.times,this.values,this.getValueSize(),e)}}Xo.prototype.ValueTypeName="quaternion";Xo.prototype.InterpolantFactoryMethodSmooth=void 0;class ra extends zi{constructor(e,t,n){super(e,t,n)}}ra.prototype.ValueTypeName="string";ra.prototype.ValueBufferType=Array;ra.prototype.DefaultInterpolation=Za;ra.prototype.InterpolantFactoryMethodLinear=void 0;ra.prototype.InterpolantFactoryMethodSmooth=void 0;class Yo extends zi{constructor(e,t,n,i){super(e,t,n,i)}}Yo.prototype.ValueTypeName="vector";class Bv{constructor(e="",t=-1,n=[],i=dx){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Oi(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(zv(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(zi.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=Iv(l);l=Ep(l,1,u),c=Ep(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Wo(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const f=u[1];let h=i[f];h||(i[f]=h=[]),h.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,h,d,g,_){if(d.length!==0){const m=[],p=[];Fg(d,m,p,g),m.length!==0&&_.push(new f(h,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let f=0;f<c.length;f++){const h=c[f].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const d={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)d[h[g].morphTargets[_]]=-1;for(const _ in d){const m=[],p=[];for(let M=0;M!==h[g].morphTargets.length;++M){const y=h[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new Wo(".morphTargetInfluence["+_+"]",m,p))}l=d.length*o}else{const d=".bones["+t[f].name+"]";n(Yo,d+".position",h,"pos",i),n(Xo,d+".quaternion",h,"rot",i),n(Yo,d+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function kv(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wo;case"vector":case"vector2":case"vector3":case"vector4":return Yo;case"color":return Og;case"quaternion":return Xo;case"bool":case"boolean":return ia;case"string":return ra}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function zv(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=kv(r.type);if(r.times===void 0){const t=[],n=[];Fg(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const vr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Vv{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const Hv=new Vv;class sa{constructor(e){this.manager=e!==void 0?e:Hv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}sa.DEFAULT_MATERIAL_NAME="__DEFAULT";const cr={};class Gv extends Error{constructor(e,t){super(e),this.response=t}}class Bg extends sa{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=vr.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(cr[e]!==void 0){cr[e].push({onLoad:t,onProgress:n,onError:i});return}cr[e]=[],cr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=cr[e],f=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=h?parseInt(h):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){M();function M(){f.read().then(({done:y,value:x})=>{if(y)p.close();else{_+=x.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let A=0,T=u.length;A<T;A++){const C=u[A];C.onProgress&&C.onProgress(w)}p.enqueue(x),M()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Gv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{vr.add(`file:${e}`,c);const u=cr[e];delete cr[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=cr[e];if(u===void 0)throw this.manager.itemError(e),c;delete cr[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}const lo=new WeakMap;class Wv extends sa{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vr.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let f=lo.get(o);f===void 0&&(f=[],lo.set(o,f)),f.push({onLoad:t,onError:i})}return o}const a=Qa("img");function l(){u(),t&&t(this);const f=lo.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}lo.delete(this),s.manager.itemEnd(e)}function c(f){u(),i&&i(f),vr.remove(`image:${e}`);const h=lo.get(this)||[];for(let d=0;d<h.length;d++){const g=h[d];g.onError&&g.onError(f)}lo.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),vr.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class kg extends sa{constructor(e){super(e)}load(e,t,n,i){const s=new sn,o=new Wv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Jc extends Ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new et(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Lu=new st,wp=new V,Ap=new V;class Jh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pt(512,512),this.mapType=Ji,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $h,this._frameExtents=new pt(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;wp.setFromMatrixPosition(e.matrixWorld),t.position.copy(wp),Ap.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ap),t.updateMatrixWorld(),Lu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Lu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Xv extends Jh{constructor(){super(new Nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ho*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Yv extends Jc{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Xv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Rp=new st,ma=new V,Iu=new V;class qv extends Jh{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pt(4,2),this._viewportCount=6,this._viewports=[new vt(2,1,1,1),new vt(0,1,1,1),new vt(3,1,1,1),new vt(1,1,1,1),new vt(3,0,1,1),new vt(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ma.setFromMatrixPosition(e.matrixWorld),n.position.copy(ma),Iu.copy(n.position),Iu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Iu),n.updateMatrixWorld(),i.makeTranslation(-ma.x,-ma.y,-ma.z),Rp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rp)}}class zg extends Jc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new qv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Qh extends Cg{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $v extends Jh{constructor(){super(new Qh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dc extends Jc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new $v}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Kv extends Jc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ia{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Nu=new WeakMap;class jv extends sa{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vr.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(Nu.has(o)===!0)i&&i(Nu.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return vr.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Nu.set(l,c),vr.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});vr.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}}class Zv extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ed="\\[\\]\\.:\\/",Jv=new RegExp("["+ed+"]","g"),td="[^"+ed+"]",Qv="[^"+ed.replace("\\.","")+"]",ey=/((?:WC+[\/:])*)/.source.replace("WC",td),ty=/(WCOD+)?/.source.replace("WCOD",Qv),ny=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",td),iy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",td),ry=new RegExp("^"+ey+ty+ny+iy+"$"),sy=["material","materials","bones","map"];class oy{constructor(e,t,n){const i=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Tt{constructor(e,t,n){this.path=t,this.parsedPath=n||Tt.parseTrackName(t),this.node=Tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Tt.Composite(e,t,n):new Tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Jv,"")}static parseTrackName(e){const t=ry.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);sy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Tt.Composite=oy;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Cp(r,e,t,n){const i=ay(n);switch(t){case mg:return r*e;case zh:return r*e/i.components*i.byteLength;case Vh:return r*e/i.components*i.byteLength;case _g:return r*e*2/i.components*i.byteLength;case Hh:return r*e*2/i.components*i.byteLength;case gg:return r*e*3/i.components*i.byteLength;case bi:return r*e*4/i.components*i.byteLength;case Gh:return r*e*4/i.components*i.byteLength;case lc:case cc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case uc:case fc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ef:case Af:return Math.max(r,16)*Math.max(e,8)/4;case Tf:case wf:return Math.max(r,8)*Math.max(e,8)/2;case Rf:case Cf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Pf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Df:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Lf:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case If:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Nf:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Uf:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Ff:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Of:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Bf:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case kf:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case zf:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Vf:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Hf:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Gf:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Wf:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case hc:case Xf:case Yf:return Math.ceil(r/4)*Math.ceil(e/4)*16;case xg:case qf:return Math.ceil(r/4)*Math.ceil(e/4)*8;case $f:case Kf:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ay(r){switch(r){case Ji:case hg:return{byteLength:1,components:1};case qa:case dg:case ul:return{byteLength:2,components:1};case Bh:case kh:return{byteLength:2,components:4};case zs:case Oh:case Fi:return{byteLength:4,components:1};case pg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Vg(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function ly(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const u=l.array,f=l.updateRanges;if(r.bindBuffer(c,a),f.length===0)r.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var cy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uy=`#ifdef USE_ALPHAHASH
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
#endif`,fy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,py=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,my=`#ifdef USE_AOMAP
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
#endif`,gy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_y=`#ifdef USE_BATCHING
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
#endif`,xy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,My=`#ifdef USE_IRIDESCENCE
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
#endif`,by=`#ifdef USE_BUMPMAP
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
#endif`,Ty=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ey=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ay=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ry=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Py=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dy=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ly=`#define PI 3.141592653589793
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
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,Iy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ny=`vec3 transformedNormal = objectNormal;
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
#endif`,Uy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Oy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,By=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ky="gl_FragColor = linearToOutputTexel( gl_FragColor );",zy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vy=`#ifdef USE_ENVMAP
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
#endif`,Hy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gy=`#ifdef USE_ENVMAP
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
#endif`,Wy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xy=`#ifdef USE_ENVMAP
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
#endif`,Yy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$y=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ky=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jy=`#ifdef USE_GRADIENTMAP
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
}`,Zy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eS=`uniform bool receiveShadow;
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
#endif`,tS=`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
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
#endif`,nS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,oS=`PhysicalMaterial material;
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
#endif`,aS=`struct PhysicalMaterial {
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
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
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
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
}`,lS=`
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
#endif`,cS=`#if defined( RE_IndirectDiffuse )
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
#endif`,uS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_S=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xS=`#if defined( USE_POINTS_UV )
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
#endif`,vS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,SS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,MS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TS=`#ifdef USE_MORPHTARGETS
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
#endif`,ES=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,AS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,RS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,DS=`#ifdef USE_NORMALMAP
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
#endif`,LS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,IS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,NS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,US=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,FS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,OS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,BS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,VS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,HS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,WS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
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
#endif`,XS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,YS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qS=`float getShadowMask() {
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
}`,$S=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,KS=`#ifdef USE_SKINNING
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
#endif`,jS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ZS=`#ifdef USE_SKINNING
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
#endif`,JS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,QS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nM=`#ifdef USE_TRANSMISSION
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
#endif`,iM=`#ifdef USE_TRANSMISSION
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
#endif`,rM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cM=`uniform sampler2D t2D;
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
}`,uM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pM=`#include <common>
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
}`,mM=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,gM=`#define DISTANCE
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
}`,_M=`#define DISTANCE
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
}`,xM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yM=`uniform float scale;
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
}`,SM=`uniform vec3 diffuse;
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
}`,MM=`#include <common>
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
}`,bM=`uniform vec3 diffuse;
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
}`,TM=`#define LAMBERT
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
}`,EM=`#define LAMBERT
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
}`,wM=`#define MATCAP
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
}`,AM=`#define MATCAP
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
}`,RM=`#define NORMAL
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
}`,CM=`#define NORMAL
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
}`,PM=`#define PHONG
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
}`,DM=`#define PHONG
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
}`,LM=`#define STANDARD
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
}`,IM=`#define STANDARD
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
}`,NM=`#define TOON
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
}`,UM=`#define TOON
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
}`,FM=`uniform float size;
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
}`,OM=`uniform vec3 diffuse;
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
}`,BM=`#include <common>
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
}`,kM=`uniform vec3 color;
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
}`,zM=`uniform float rotation;
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
}`,VM=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:cy,alphahash_pars_fragment:uy,alphamap_fragment:fy,alphamap_pars_fragment:hy,alphatest_fragment:dy,alphatest_pars_fragment:py,aomap_fragment:my,aomap_pars_fragment:gy,batching_pars_vertex:_y,batching_vertex:xy,begin_vertex:vy,beginnormal_vertex:yy,bsdfs:Sy,iridescence_fragment:My,bumpmap_pars_fragment:by,clipping_planes_fragment:Ty,clipping_planes_pars_fragment:Ey,clipping_planes_pars_vertex:wy,clipping_planes_vertex:Ay,color_fragment:Ry,color_pars_fragment:Cy,color_pars_vertex:Py,color_vertex:Dy,common:Ly,cube_uv_reflection_fragment:Iy,defaultnormal_vertex:Ny,displacementmap_pars_vertex:Uy,displacementmap_vertex:Fy,emissivemap_fragment:Oy,emissivemap_pars_fragment:By,colorspace_fragment:ky,colorspace_pars_fragment:zy,envmap_fragment:Vy,envmap_common_pars_fragment:Hy,envmap_pars_fragment:Gy,envmap_pars_vertex:Wy,envmap_physical_pars_fragment:tS,envmap_vertex:Xy,fog_vertex:Yy,fog_pars_vertex:qy,fog_fragment:$y,fog_pars_fragment:Ky,gradientmap_pars_fragment:jy,lightmap_pars_fragment:Zy,lights_lambert_fragment:Jy,lights_lambert_pars_fragment:Qy,lights_pars_begin:eS,lights_toon_fragment:nS,lights_toon_pars_fragment:iS,lights_phong_fragment:rS,lights_phong_pars_fragment:sS,lights_physical_fragment:oS,lights_physical_pars_fragment:aS,lights_fragment_begin:lS,lights_fragment_maps:cS,lights_fragment_end:uS,logdepthbuf_fragment:fS,logdepthbuf_pars_fragment:hS,logdepthbuf_pars_vertex:dS,logdepthbuf_vertex:pS,map_fragment:mS,map_pars_fragment:gS,map_particle_fragment:_S,map_particle_pars_fragment:xS,metalnessmap_fragment:vS,metalnessmap_pars_fragment:yS,morphinstance_vertex:SS,morphcolor_vertex:MS,morphnormal_vertex:bS,morphtarget_pars_vertex:TS,morphtarget_vertex:ES,normal_fragment_begin:wS,normal_fragment_maps:AS,normal_pars_fragment:RS,normal_pars_vertex:CS,normal_vertex:PS,normalmap_pars_fragment:DS,clearcoat_normal_fragment_begin:LS,clearcoat_normal_fragment_maps:IS,clearcoat_pars_fragment:NS,iridescence_pars_fragment:US,opaque_fragment:FS,packing:OS,premultiplied_alpha_fragment:BS,project_vertex:kS,dithering_fragment:zS,dithering_pars_fragment:VS,roughnessmap_fragment:HS,roughnessmap_pars_fragment:GS,shadowmap_pars_fragment:WS,shadowmap_pars_vertex:XS,shadowmap_vertex:YS,shadowmask_pars_fragment:qS,skinbase_vertex:$S,skinning_pars_vertex:KS,skinning_vertex:jS,skinnormal_vertex:ZS,specularmap_fragment:JS,specularmap_pars_fragment:QS,tonemapping_fragment:eM,tonemapping_pars_fragment:tM,transmission_fragment:nM,transmission_pars_fragment:iM,uv_pars_fragment:rM,uv_pars_vertex:sM,uv_vertex:oM,worldpos_vertex:aM,background_vert:lM,background_frag:cM,backgroundCube_vert:uM,backgroundCube_frag:fM,cube_vert:hM,cube_frag:dM,depth_vert:pM,depth_frag:mM,distanceRGBA_vert:gM,distanceRGBA_frag:_M,equirect_vert:xM,equirect_frag:vM,linedashed_vert:yM,linedashed_frag:SM,meshbasic_vert:MM,meshbasic_frag:bM,meshlambert_vert:TM,meshlambert_frag:EM,meshmatcap_vert:wM,meshmatcap_frag:AM,meshnormal_vert:RM,meshnormal_frag:CM,meshphong_vert:PM,meshphong_frag:DM,meshphysical_vert:LM,meshphysical_frag:IM,meshtoon_vert:NM,meshtoon_frag:UM,points_vert:FM,points_frag:OM,shadow_vert:BM,shadow_frag:kM,sprite_vert:zM,sprite_frag:VM},Ae={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Gi={basic:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:Cn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:Cn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:Cn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new et(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:Cn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:Cn([Ae.points,Ae.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:Cn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:Cn([Ae.common,Ae.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:Cn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:Cn([Ae.sprite,Ae.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:Cn([Ae.common,Ae.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:Cn([Ae.lights,Ae.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};Gi.physical={uniforms:Cn([Gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const kl={r:0,b:0,g:0},ps=new Qi,HM=new st;function GM(r,e,t,n,i,s,o){const a=new et(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function _(y){let x=!1;const w=g(y);w===null?p(a,l):w&&w.isColor&&(p(w,1),x=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(y,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===jc)?(u===void 0&&(u=new On(new fl(1,1,1),new wr({name:"BackgroundCubeMaterial",uniforms:Go(Gi.backgroundCube.uniforms),vertexShader:Gi.backgroundCube.vertexShader,fragmentShader:Gi.backgroundCube.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ps.copy(x.backgroundRotation),ps.x*=-1,ps.y*=-1,ps.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(HM.makeRotationFromEuler(ps)),u.material.toneMapped=gt.getTransfer(w.colorSpace)!==wt,(f!==w||h!==w.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,f=w,h=w.version,d=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new On(new hl(2,2),new wr({name:"BackgroundMaterial",uniforms:Go(Gi.background.uniforms),vertexShader:Gi.background.vertexShader,fragmentShader:Gi.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=gt.getTransfer(w.colorSpace)!==wt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(f!==w||h!==w.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,f=w,h=w.version,d=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,x){y.getRGB(kl,Rg(r)),n.buffers.color.setClear(kl.r,kl.g,kl.b,x,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m,dispose:M}}function WM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,o=!1;function a(v,P,U,B,W){let Z=!1;const X=f(B,U,P);s!==X&&(s=X,c(s.object)),Z=d(v,B,U,W),Z&&g(v,B,U,W),W!==null&&e.update(W,r.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(v,P,U,B),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function u(v){return r.deleteVertexArray(v)}function f(v,P,U){const B=U.wireframe===!0;let W=n[v.id];W===void 0&&(W={},n[v.id]=W);let Z=W[P.id];Z===void 0&&(Z={},W[P.id]=Z);let X=Z[B];return X===void 0&&(X=h(l()),Z[B]=X),X}function h(v){const P=[],U=[],B=[];for(let W=0;W<t;W++)P[W]=0,U[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:B,object:v,attributes:{},index:null}}function d(v,P,U,B){const W=s.attributes,Z=P.attributes;let X=0;const H=U.getAttributes();for(const k in H)if(H[k].location>=0){const L=W[k];let pe=Z[k];if(pe===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(pe=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(pe=v.instanceColor)),L===void 0||L.attribute!==pe||pe&&L.data!==pe.data)return!0;X++}return s.attributesNum!==X||s.index!==B}function g(v,P,U,B){const W={},Z=P.attributes;let X=0;const H=U.getAttributes();for(const k in H)if(H[k].location>=0){let L=Z[k];L===void 0&&(k==="instanceMatrix"&&v.instanceMatrix&&(L=v.instanceMatrix),k==="instanceColor"&&v.instanceColor&&(L=v.instanceColor));const pe={};pe.attribute=L,L&&L.data&&(pe.data=L.data),W[k]=pe,X++}s.attributes=W,s.attributesNum=X,s.index=B}function _(){const v=s.newAttributes;for(let P=0,U=v.length;P<U;P++)v[P]=0}function m(v){p(v,0)}function p(v,P){const U=s.newAttributes,B=s.enabledAttributes,W=s.attributeDivisors;U[v]=1,B[v]===0&&(r.enableVertexAttribArray(v),B[v]=1),W[v]!==P&&(r.vertexAttribDivisor(v,P),W[v]=P)}function M(){const v=s.newAttributes,P=s.enabledAttributes;for(let U=0,B=P.length;U<B;U++)P[U]!==v[U]&&(r.disableVertexAttribArray(U),P[U]=0)}function y(v,P,U,B,W,Z,X){X===!0?r.vertexAttribIPointer(v,P,U,W,Z):r.vertexAttribPointer(v,P,U,B,W,Z)}function x(v,P,U,B){_();const W=B.attributes,Z=U.getAttributes(),X=P.defaultAttributeValues;for(const H in Z){const k=Z[H];if(k.location>=0){let re=W[H];if(re===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(re=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(re=v.instanceColor)),re!==void 0){const L=re.normalized,pe=re.itemSize,Fe=e.get(re);if(Fe===void 0)continue;const Ye=Fe.buffer,j=Fe.type,ue=Fe.bytesPerElement,oe=j===r.INT||j===r.UNSIGNED_INT||re.gpuType===Oh;if(re.isInterleavedBufferAttribute){const le=re.data,de=le.stride,De=re.offset;if(le.isInstancedInterleavedBuffer){for(let Re=0;Re<k.locationSize;Re++)p(k.location+Re,le.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Re=0;Re<k.locationSize;Re++)m(k.location+Re);r.bindBuffer(r.ARRAY_BUFFER,Ye);for(let Re=0;Re<k.locationSize;Re++)y(k.location+Re,pe/k.locationSize,j,L,de*ue,(De+pe/k.locationSize*Re)*ue,oe)}else{if(re.isInstancedBufferAttribute){for(let le=0;le<k.locationSize;le++)p(k.location+le,re.meshPerAttribute);v.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let le=0;le<k.locationSize;le++)m(k.location+le);r.bindBuffer(r.ARRAY_BUFFER,Ye);for(let le=0;le<k.locationSize;le++)y(k.location+le,pe/k.locationSize,j,L,pe*ue,pe/k.locationSize*le*ue,oe)}}else if(X!==void 0){const L=X[H];if(L!==void 0)switch(L.length){case 2:r.vertexAttrib2fv(k.location,L);break;case 3:r.vertexAttrib3fv(k.location,L);break;case 4:r.vertexAttrib4fv(k.location,L);break;default:r.vertexAttrib1fv(k.location,L)}}}}M()}function w(){C();for(const v in n){const P=n[v];for(const U in P){const B=P[U];for(const W in B)u(B[W].object),delete B[W];delete P[U]}delete n[v]}}function A(v){if(n[v.id]===void 0)return;const P=n[v.id];for(const U in P){const B=P[U];for(const W in B)u(B[W].object),delete B[W];delete P[U]}delete n[v.id]}function T(v){for(const P in n){const U=n[P];if(U[v.id]===void 0)continue;const B=U[v.id];for(const W in B)u(B[W].object),delete B[W];delete U[v.id]}}function C(){b(),o=!0,s!==i&&(s=i,c(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:b,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function XM(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,f){f!==0&&(r.drawArraysInstanced(n,c,u,f),t.update(u,n,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function l(c,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function YM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==bi&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const C=T===ul&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Ji&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Fi&&!C)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:w,maxSamples:A}}function qM(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new ys,a=new rt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||i;return i=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=r.get(f);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,y=M*4;let x=p.clippingState||null;l.value=x,x=u(g,h,y,d);for(let w=0;w!==y;++w)x[w]=t[w];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=d;y!==_;++y,x+=4)o.copy(f[y]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function $M(r){let e=new WeakMap;function t(o,a){return a===Mf?o.mapping=ko:a===bf&&(o.mapping=zo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Mf||a===bf)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new pv(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const vo=4,Pp=[.125,.215,.35,.446,.526,.582],As=20,Uu=new Qh,Dp=new et;let Fu=null,Ou=0,Bu=0,ku=!1;const Ss=(1+Math.sqrt(5))/2,co=1/Ss,Lp=[new V(-Ss,co,0),new V(Ss,co,0),new V(-co,0,Ss),new V(co,0,Ss),new V(0,Ss,-co),new V(0,Ss,co),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],KM=new V;class Ip{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=KM}=s;Fu=this._renderer.getRenderTarget(),Ou=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),ku=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Up(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fu,Ou,Bu),this._renderer.xr.enabled=ku,e.scissorTest=!1,zl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ko||e.mapping===zo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fu=this._renderer.getRenderTarget(),Ou=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),ku=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Mi,minFilter:Mi,generateMipmaps:!1,type:ul,format:bi,colorSpace:zn,depthBuffer:!1},i=Np(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Np(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jM(s)),this._blurMaterial=ZM(s,e,t)}return i}_compileMaterial(e){const t=new On(this._lodPlanes[0],e);this._renderer.compile(t,Uu)}_sceneToCubeUV(e,t,n,i,s){const l=new Nn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Dp),f.toneMapping=Qr,f.autoClear=!1;const g=new _r({name:"PMREM.Background",side:Bn,depthWrite:!1,depthTest:!1}),_=new On(new fl,g);let m=!1;const p=e.background;p?p.isColor&&(g.color.copy(p),e.background=null,m=!0):(g.color.copy(Dp),m=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const x=this._cubeSize;zl(i,y*x,M>2?x:0,x,x),f.setRenderTarget(i),m&&f.render(_,l),f.render(e,l)}_.geometry.dispose(),_.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ko||e.mapping===zo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Up());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new On(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;zl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Uu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Lp[(i-s-1)%Lp.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new On(this._lodPlanes[i],c),h=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*As-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):As;m>As&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${As}`);const p=[];let M=0;for(let T=0;T<As;++T){const C=T/_,b=Math.exp(-C*C/2);p.push(b),T===0?M+=b:T<m&&(M+=2*b)}for(let T=0;T<p.length;T++)p[T]=p[T]/M;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:y}=this;h.dTheta.value=g,h.mipInt.value=y-n;const x=this._sizeLods[i],w=3*x*(i>y-vo?i-y+vo:0),A=4*(this._cubeSize-x);zl(t,w,A,3*x,2*x),l.setRenderTarget(t),l.render(f,Uu)}}function jM(r){const e=[],t=[],n=[];let i=r;const s=r-vo+1+Pp.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-vo?l=Pp[o-r+vo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),y=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let A=0;A<d;A++){const T=A%3*2/3-1,C=A>2?0:-1,b=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];M.set(b,_*g*A),y.set(h,m*g*A);const v=[A,A,A,A,A,A];x.set(v,p*g*A)}const w=new ki;w.setAttribute("position",new kn(M,_)),w.setAttribute("uv",new kn(y,m)),w.setAttribute("faceIndex",new kn(x,p)),e.push(w),i>vo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Np(r,e,t){const n=new Er(r,e,t);return n.texture.mapping=jc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function ZM(r,e,t){const n=new Float32Array(As),i=new V(0,1,0);return new wr({name:"SphericalGaussianBlur",defines:{n:As,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:nd(),fragmentShader:`

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
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function Up(){return new wr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nd(),fragmentShader:`

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
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function Fp(){return new wr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function nd(){return`

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
	`}function JM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Mf||l===bf,u=l===ko||l===zo;if(c||u){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Ip(r)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new Ip(r)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function QM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&wo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function eb(r,e,t,n){const i={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete i[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return i[h.id]===!0||(h.addEventListener("dispose",o),i[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],r.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let y=0,x=M.length;y<x;y+=3){const w=M[y+0],A=M[y+1],T=M[y+2];h.push(w,A,A,T,T,w)}}else if(g!==void 0){const M=g.array;_=g.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const w=y+0,A=y+1,T=y+2;h.push(w,A,A,T,T,w)}}else return;const m=new(Mg(h)?Ag:wg)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function tb(r,e,t){let n;function i(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){r.drawElements(n,d,s,h*o),t.update(d,n,1)}function c(h,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,h*o,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function f(h,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function nb(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function ib(r,e,t){const n=new WeakMap,i=new vt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==f){let v=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var d=v;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let w=a.attributes.position.count*x,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const T=new Float32Array(w*A*4*f),C=new bg(T,w,A,f);C.type=Fi,C.needsUpdate=!0;const b=x*4;for(let P=0;P<f;P++){const U=p[P],B=M[P],W=y[P],Z=w*A*4*P;for(let X=0;X<U.count;X++){const H=X*b;g===!0&&(i.fromBufferAttribute(U,X),T[Z+H+0]=i.x,T[Z+H+1]=i.y,T[Z+H+2]=i.z,T[Z+H+3]=0),_===!0&&(i.fromBufferAttribute(B,X),T[Z+H+4]=i.x,T[Z+H+5]=i.y,T[Z+H+6]=i.z,T[Z+H+7]=0),m===!0&&(i.fromBufferAttribute(W,X),T[Z+H+8]=i.x,T[Z+H+9]=i.y,T[Z+H+10]=i.z,T[Z+H+11]=W.itemSize===4?i.w:1)}}h={count:f,texture:C,size:new pt(w,A)},n.set(a,h),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function rb(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=e.get(l,u);if(i.get(f)!==c&&(e.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return f}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Hg=new sn,Op=new Ug(1,1),Gg=new bg,Wg=new Zx,Xg=new Pg,Bp=[],kp=[],zp=new Float32Array(16),Vp=new Float32Array(9),Hp=new Float32Array(4);function oa(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Bp[i];if(s===void 0&&(s=new Float32Array(i),Bp[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function on(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function an(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Qc(r,e){let t=kp[e];t===void 0&&(t=new Int32Array(e),kp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function sb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ob(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2fv(this.addr,e),an(t,e)}}function ab(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;r.uniform3fv(this.addr,e),an(t,e)}}function lb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4fv(this.addr,e),an(t,e)}}function cb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Hp.set(n),r.uniformMatrix2fv(this.addr,!1,Hp),an(t,n)}}function ub(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Vp.set(n),r.uniformMatrix3fv(this.addr,!1,Vp),an(t,n)}}function fb(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;zp.set(n),r.uniformMatrix4fv(this.addr,!1,zp),an(t,n)}}function hb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function db(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2iv(this.addr,e),an(t,e)}}function pb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;r.uniform3iv(this.addr,e),an(t,e)}}function mb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4iv(this.addr,e),an(t,e)}}function gb(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function _b(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2uiv(this.addr,e),an(t,e)}}function xb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;r.uniform3uiv(this.addr,e),an(t,e)}}function vb(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4uiv(this.addr,e),an(t,e)}}function yb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Op.compareFunction=Sg,s=Op):s=Hg,t.setTexture2D(e||s,i)}function Sb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Wg,i)}function Mb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Xg,i)}function bb(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Gg,i)}function Tb(r){switch(r){case 5126:return sb;case 35664:return ob;case 35665:return ab;case 35666:return lb;case 35674:return cb;case 35675:return ub;case 35676:return fb;case 5124:case 35670:return hb;case 35667:case 35671:return db;case 35668:case 35672:return pb;case 35669:case 35673:return mb;case 5125:return gb;case 36294:return _b;case 36295:return xb;case 36296:return vb;case 35678:case 36198:case 36298:case 36306:case 35682:return yb;case 35679:case 36299:case 36307:return Sb;case 35680:case 36300:case 36308:case 36293:return Mb;case 36289:case 36303:case 36311:case 36292:return bb}}function Eb(r,e){r.uniform1fv(this.addr,e)}function wb(r,e){const t=oa(e,this.size,2);r.uniform2fv(this.addr,t)}function Ab(r,e){const t=oa(e,this.size,3);r.uniform3fv(this.addr,t)}function Rb(r,e){const t=oa(e,this.size,4);r.uniform4fv(this.addr,t)}function Cb(r,e){const t=oa(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Pb(r,e){const t=oa(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Db(r,e){const t=oa(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Lb(r,e){r.uniform1iv(this.addr,e)}function Ib(r,e){r.uniform2iv(this.addr,e)}function Nb(r,e){r.uniform3iv(this.addr,e)}function Ub(r,e){r.uniform4iv(this.addr,e)}function Fb(r,e){r.uniform1uiv(this.addr,e)}function Ob(r,e){r.uniform2uiv(this.addr,e)}function Bb(r,e){r.uniform3uiv(this.addr,e)}function kb(r,e){r.uniform4uiv(this.addr,e)}function zb(r,e,t){const n=this.cache,i=e.length,s=Qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Hg,s[o])}function Vb(r,e,t){const n=this.cache,i=e.length,s=Qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Wg,s[o])}function Hb(r,e,t){const n=this.cache,i=e.length,s=Qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Xg,s[o])}function Gb(r,e,t){const n=this.cache,i=e.length,s=Qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Gg,s[o])}function Wb(r){switch(r){case 5126:return Eb;case 35664:return wb;case 35665:return Ab;case 35666:return Rb;case 35674:return Cb;case 35675:return Pb;case 35676:return Db;case 5124:case 35670:return Lb;case 35667:case 35671:return Ib;case 35668:case 35672:return Nb;case 35669:case 35673:return Ub;case 5125:return Fb;case 36294:return Ob;case 36295:return Bb;case 36296:return kb;case 35678:case 36198:case 36298:case 36306:case 35682:return zb;case 35679:case 36299:case 36307:return Vb;case 35680:case 36300:case 36308:case 36293:return Hb;case 36289:case 36303:case 36311:case 36292:return Gb}}class Xb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Tb(t.type)}}class Yb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wb(t.type)}}class qb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const zu=/(\w+)(\])?(\[|\.)?/g;function Gp(r,e){r.seq.push(e),r.map[e.id]=e}function $b(r,e,t){const n=r.name,i=n.length;for(zu.lastIndex=0;;){const s=zu.exec(n),o=zu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Gp(t,c===void 0?new Xb(a,r,e):new Yb(a,r,e));break}else{let f=t.map[a];f===void 0&&(f=new qb(a),Gp(t,f)),t=f}}}class pc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);$b(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Wp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Kb=37297;let jb=0;function Zb(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Xp=new rt;function Jb(r){gt._getMatrix(Xp,gt.workingColorSpace,r);const e=`mat3( ${Xp.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(r)){case Lc:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Yp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Zb(r.getShaderSource(e),o)}else return i}function Qb(r,e){const t=Jb(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function eT(r,e){let t;switch(e){case sx:t="Linear";break;case ox:t="Reinhard";break;case ax:t="Cineon";break;case lx:t="ACESFilmic";break;case ux:t="AgX";break;case fx:t="Neutral";break;case cx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Vl=new V;function tT(){gt.getLuminanceCoefficients(Vl);const r=Vl.x.toFixed(4),e=Vl.y.toFixed(4),t=Vl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nT(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function iT(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function rT(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ma(r){return r!==""}function qp(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $p(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sT=/^[ \t]*#include +<([\w\d./]+)>/gm;function eh(r){return r.replace(sT,aT)}const oT=new Map;function aT(r,e){let t=ot[e];if(t===void 0){const n=oT.get(e);if(n!==void 0)t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return eh(t)}const lT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kp(r){return r.replace(lT,cT)}function cT(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function jp(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function uT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===lg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===B0?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===fr&&(e="SHADOWMAP_TYPE_VSM"),e}function fT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ko:case zo:e="ENVMAP_TYPE_CUBE";break;case jc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hT(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case zo:e="ENVMAP_MODE_REFRACTION";break}return e}function dT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case cg:e="ENVMAP_BLENDING_MULTIPLY";break;case ix:e="ENVMAP_BLENDING_MIX";break;case rx:e="ENVMAP_BLENDING_ADD";break}return e}function pT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function mT(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=uT(t),c=fT(t),u=hT(t),f=dT(t),h=pT(t),d=nT(t),g=iT(s),_=i.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ma).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ma).join(`
`),p.length>0&&(p+=`
`)):(m=[jp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),p=[jp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qr?"#define TONE_MAPPING":"",t.toneMapping!==Qr?ot.tonemapping_pars_fragment:"",t.toneMapping!==Qr?eT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Qb("linearToOutputTexel",t.outputColorSpace),tT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ma).join(`
`)),o=eh(o),o=qp(o,t),o=$p(o,t),a=eh(a),a=qp(a,t),a=$p(a,t),o=Kp(o),a=Kp(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Yd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+o,x=M+p+a,w=Wp(i,i.VERTEX_SHADER,y),A=Wp(i,i.FRAGMENT_SHADER,x);i.attachShader(_,w),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(P){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(w).trim(),W=i.getShaderInfoLog(A).trim();let Z=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,A);else{const H=Yp(i,w,"vertex"),k=Yp(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+H+`
`+k)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(B===""||W==="")&&(X=!1);X&&(P.diagnostics={runnable:Z,programLog:U,vertexShader:{log:B,prefix:m},fragmentShader:{log:W,prefix:p}})}i.deleteShader(w),i.deleteShader(A),C=new pc(i,_),b=rT(i,_)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,Kb)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=A,this}let gT=0;class _T{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new xT(e),t.set(e,n)),n}}class xT{constructor(e){this.id=gT++,this.code=e,this.usedTimes=0}}function vT(r,e,t,n,i,s,o){const a=new Tg,l=new _T,c=new Set,u=[],f=i.logarithmicDepthBuffer,h=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,P,U,B){const W=U.fog,Z=B.geometry,X=b.isMeshStandardMaterial?U.environment:null,H=(b.isMeshStandardMaterial?t:e).get(b.envMap||X),k=H&&H.mapping===jc?H.image.height:null,re=g[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const L=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,pe=L!==void 0?L.length:0;let Fe=0;Z.morphAttributes.position!==void 0&&(Fe=1),Z.morphAttributes.normal!==void 0&&(Fe=2),Z.morphAttributes.color!==void 0&&(Fe=3);let Ye,j,ue,oe;if(re){const Te=Gi[re];Ye=Te.vertexShader,j=Te.fragmentShader}else Ye=b.vertexShader,j=b.fragmentShader,l.update(b),ue=l.getVertexShaderID(b),oe=l.getFragmentShaderID(b);const le=r.getRenderTarget(),de=r.state.buffers.depth.getReversed(),De=B.isInstancedMesh===!0,Re=B.isBatchedMesh===!0,We=!!b.map,Xe=!!b.matcap,ye=!!H,D=!!b.aoMap,Ke=!!b.lightMap,He=!!b.bumpMap,G=!!b.normalMap,be=!!b.displacementMap,ee=!!b.emissiveMap,N=!!b.metalnessMap,J=!!b.roughnessMap,Me=b.anisotropy>0,R=b.clearcoat>0,S=b.dispersion>0,O=b.iridescence>0,Q=b.sheen>0,K=b.transmission>0,q=Me&&!!b.anisotropyMap,me=R&&!!b.clearcoatMap,ae=R&&!!b.clearcoatNormalMap,Se=R&&!!b.clearcoatRoughnessMap,ne=O&&!!b.iridescenceMap,ce=O&&!!b.iridescenceThicknessMap,ve=Q&&!!b.sheenColorMap,Oe=Q&&!!b.sheenRoughnessMap,Be=!!b.specularMap,ge=!!b.specularColorMap,Ge=!!b.specularIntensityMap,I=K&&!!b.transmissionMap,xe=K&&!!b.thicknessMap,se=!!b.gradientMap,he=!!b.alphaMap,ie=b.alphaTest>0,te=!!b.alphaHash,Ce=!!b.extensions;let Ie=Qr;b.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Ie=r.toneMapping);const ft={shaderID:re,shaderType:b.type,shaderName:b.name,vertexShader:Ye,fragmentShader:j,defines:b.defines,customVertexShaderID:ue,customFragmentShaderID:oe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Re,batchingColor:Re&&B._colorsTexture!==null,instancing:De,instancingColor:De&&B.instanceColor!==null,instancingMorph:De&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:zn,alphaToCoverage:!!b.alphaToCoverage,map:We,matcap:Xe,envMap:ye,envMapMode:ye&&H.mapping,envMapCubeUVHeight:k,aoMap:D,lightMap:Ke,bumpMap:He,normalMap:G,displacementMap:h&&be,emissiveMap:ee,normalMapObjectSpace:G&&b.normalMapType===_x,normalMapTangentSpace:G&&b.normalMapType===yg,metalnessMap:N,roughnessMap:J,anisotropy:Me,anisotropyMap:q,clearcoat:R,clearcoatMap:me,clearcoatNormalMap:ae,clearcoatRoughnessMap:Se,dispersion:S,iridescence:O,iridescenceMap:ne,iridescenceThicknessMap:ce,sheen:Q,sheenColorMap:ve,sheenRoughnessMap:Oe,specularMap:Be,specularColorMap:ge,specularIntensityMap:Ge,transmission:K,transmissionMap:I,thicknessMap:xe,gradientMap:se,opaque:b.transparent===!1&&b.blending===Eo&&b.alphaToCoverage===!1,alphaMap:he,alphaTest:ie,alphaHash:te,combine:b.combine,mapUv:We&&_(b.map.channel),aoMapUv:D&&_(b.aoMap.channel),lightMapUv:Ke&&_(b.lightMap.channel),bumpMapUv:He&&_(b.bumpMap.channel),normalMapUv:G&&_(b.normalMap.channel),displacementMapUv:be&&_(b.displacementMap.channel),emissiveMapUv:ee&&_(b.emissiveMap.channel),metalnessMapUv:N&&_(b.metalnessMap.channel),roughnessMapUv:J&&_(b.roughnessMap.channel),anisotropyMapUv:q&&_(b.anisotropyMap.channel),clearcoatMapUv:me&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(b.sheenRoughnessMap.channel),specularMapUv:Be&&_(b.specularMap.channel),specularColorMapUv:ge&&_(b.specularColorMap.channel),specularIntensityMapUv:Ge&&_(b.specularIntensityMap.channel),transmissionMapUv:I&&_(b.transmissionMap.channel),thicknessMapUv:xe&&_(b.thicknessMap.channel),alphaMapUv:he&&_(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(G||Me),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(We||he),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:de,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Fe,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ie,decodeVideoTexture:We&&b.map.isVideoTexture===!0&&gt.getTransfer(b.map.colorSpace)===wt,decodeVideoTextureEmissive:ee&&b.emissiveMap.isVideoTexture===!0&&gt.getTransfer(b.emissiveMap.colorSpace)===wt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===yi,flipSided:b.side===Bn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ce&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&b.extensions.multiDraw===!0||Re)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(b){const v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)v.push(P),v.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(M(v,b),y(v,b),v.push(r.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function M(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function y(b,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const v=g[b.type];let P;if(v){const U=Gi[v];P=uv.clone(U.uniforms)}else P=b.uniforms;return P}function w(b,v){let P;for(let U=0,B=u.length;U<B;U++){const W=u[U];if(W.cacheKey===v){P=W,++P.usedTimes;break}}return P===void 0&&(P=new mT(r,v,b,s),u.push(P)),P}function A(b){if(--b.usedTimes===0){const v=u.indexOf(b);u[v]=u[u.length-1],u.pop(),b.destroy()}}function T(b){l.remove(b)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:w,releaseProgram:A,releaseShaderCache:T,programs:u,dispose:C}}function yT(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function ST(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Zp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Jp(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(f,h,d,g,_,m){let p=r[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},r[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||ST),n.length>1&&n.sort(h||Zp),i.length>1&&i.sort(h||Zp)}function u(){for(let f=e,h=r.length;f<h;f++){const d=r[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function MT(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Jp,r.set(n,[o])):i>=s.length?(o=new Jp,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function bT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new et};break;case"SpotLight":t={position:new V,direction:new V,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new V,halfWidth:new V,halfHeight:new V};break}return r[e.id]=t,t}}}function TT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let ET=0;function wT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function AT(r){const e=new bT,t=TT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);const i=new V,s=new st,o=new st;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,y=0,x=0,w=0,A=0,T=0;c.sort(wT);for(let b=0,v=c.length;b<v;b++){const P=c[b],U=P.color,B=P.intensity,W=P.distance,Z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=U.r*B,f+=U.g*B,h+=U.b*B;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],B);T++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const H=P.shadow,k=t.get(P);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=Z,n.directionalShadowMatrix[d]=P.shadow.matrix,M++}n.directional[d]=X,d++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(U).multiplyScalar(B),X.distance=W,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[_]=X;const H=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,H.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[_]=H.matrix,P.castShadow){const k=t.get(P);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=Z,x++}_++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(U).multiplyScalar(B),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const H=P.shadow,k=t.get(P);k.shadowIntensity=H.intensity,k.shadowBias=H.bias,k.shadowNormalBias=H.normalBias,k.shadowRadius=H.radius,k.shadowMapSize=H.mapSize,k.shadowCameraNear=H.camera.near,k.shadowCameraFar=H.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=P.shadow.matrix,y++}n.point[g]=X,g++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(B),X.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=X,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const C=n.hash;(C.directionalLength!==d||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==M||C.numPointShadows!==y||C.numSpotShadows!==x||C.numSpotMaps!==w||C.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=T,C.directionalLength=d,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=M,C.numPointShadows=y,C.numSpotShadows=x,C.numSpotMaps=w,C.numLightProbes=T,n.version=ET++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const y=c[p];if(y.isDirectionalLight){const x=n.directional[f];x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(y.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),h++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Qp(r){const e=new AT(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function RT(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Qp(r),e.set(i,[a])):s>=o.length?(a=new Qp(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const CT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,PT=`uniform sampler2D shadow_pass;
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
}`;function DT(r,e,t){let n=new $h;const i=new pt,s=new pt,o=new vt,a=new Pv({depthPacking:gx}),l=new Dv,c={},u=t.maxTextureSize,f={[Zi]:Bn,[Bn]:Zi,[yi]:yi},h=new wr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pt},radius:{value:4}},vertexShader:CT,fragmentShader:PT}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new ki;g.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new On(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lg;let p=this.type;this.render=function(A,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const b=r.getRenderTarget(),v=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Jr),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const B=p!==fr&&this.type===fr,W=p===fr&&this.type!==fr;for(let Z=0,X=A.length;Z<X;Z++){const H=A[Z],k=H.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const re=k.getFrameExtents();if(i.multiply(re),s.copy(k.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/re.x),i.x=s.x*re.x,k.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/re.y),i.y=s.y*re.y,k.mapSize.y=s.y)),k.map===null||B===!0||W===!0){const pe=this.type!==fr?{minFilter:Gn,magFilter:Gn}:{};k.map!==null&&k.map.dispose(),k.map=new Er(i.x,i.y,pe),k.map.texture.name=H.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const L=k.getViewportCount();for(let pe=0;pe<L;pe++){const Fe=k.getViewport(pe);o.set(s.x*Fe.x,s.y*Fe.y,s.x*Fe.z,s.y*Fe.w),U.viewport(o),k.updateMatrices(H,pe),n=k.getFrustum(),x(T,C,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===fr&&M(k,C),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(b,v,P)};function M(A,T){const C=e.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Er(i.x,i.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(T,null,C,h,_,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(T,null,C,d,_,null)}function y(A,T,C,b){let v=null;const P=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)v=P;else if(v=C.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const U=v.uuid,B=T.uuid;let W=c[U];W===void 0&&(W={},c[U]=W);let Z=W[B];Z===void 0&&(Z=v.clone(),W[B]=Z,T.addEventListener("dispose",w)),v=Z}if(v.visible=T.visible,v.wireframe=T.wireframe,b===fr?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:f[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const U=r.properties.get(v);U.light=C}return v}function x(A,T,C,b,v){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===fr)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const B=e.update(A),W=A.material;if(Array.isArray(W)){const Z=B.groups;for(let X=0,H=Z.length;X<H;X++){const k=Z[X],re=W[k.materialIndex];if(re&&re.visible){const L=y(A,re,b,v);A.onBeforeShadow(r,A,T,C,B,L,k),r.renderBufferDirect(C,null,B,L,A,k),A.onAfterShadow(r,A,T,C,B,L,k)}}}else if(W.visible){const Z=y(A,W,b,v);A.onBeforeShadow(r,A,T,C,B,Z,null),r.renderBufferDirect(C,null,B,Z,A,null),A.onAfterShadow(r,A,T,C,B,Z,null)}}const U=A.children;for(let B=0,W=U.length;B<W;B++)x(U[B],T,C,b,v)}function w(A){A.target.removeEventListener("dispose",w);for(const C in c){const b=c[C],v=A.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}const LT={[mf]:gf,[_f]:yf,[xf]:Sf,[Bo]:vf,[gf]:mf,[yf]:_f,[Sf]:xf,[vf]:Bo};function IT(r,e){function t(){let I=!1;const xe=new vt;let se=null;const he=new vt(0,0,0,0);return{setMask:function(ie){se!==ie&&!I&&(r.colorMask(ie,ie,ie,ie),se=ie)},setLocked:function(ie){I=ie},setClear:function(ie,te,Ce,Ie,ft){ft===!0&&(ie*=Ie,te*=Ie,Ce*=Ie),xe.set(ie,te,Ce,Ie),he.equals(xe)===!1&&(r.clearColor(ie,te,Ce,Ie),he.copy(xe))},reset:function(){I=!1,se=null,he.set(-1,0,0,0)}}}function n(){let I=!1,xe=!1,se=null,he=null,ie=null;return{setReversed:function(te){if(xe!==te){const Ce=e.get("EXT_clip_control");te?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),xe=te;const Ie=ie;ie=null,this.setClear(Ie)}},getReversed:function(){return xe},setTest:function(te){te?le(r.DEPTH_TEST):de(r.DEPTH_TEST)},setMask:function(te){se!==te&&!I&&(r.depthMask(te),se=te)},setFunc:function(te){if(xe&&(te=LT[te]),he!==te){switch(te){case mf:r.depthFunc(r.NEVER);break;case gf:r.depthFunc(r.ALWAYS);break;case _f:r.depthFunc(r.LESS);break;case Bo:r.depthFunc(r.LEQUAL);break;case xf:r.depthFunc(r.EQUAL);break;case vf:r.depthFunc(r.GEQUAL);break;case yf:r.depthFunc(r.GREATER);break;case Sf:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}he=te}},setLocked:function(te){I=te},setClear:function(te){ie!==te&&(xe&&(te=1-te),r.clearDepth(te),ie=te)},reset:function(){I=!1,se=null,he=null,ie=null,xe=!1}}}function i(){let I=!1,xe=null,se=null,he=null,ie=null,te=null,Ce=null,Ie=null,ft=null;return{setTest:function(Te){I||(Te?le(r.STENCIL_TEST):de(r.STENCIL_TEST))},setMask:function(Te){xe!==Te&&!I&&(r.stencilMask(Te),xe=Te)},setFunc:function(Te,Ue,nt){(se!==Te||he!==Ue||ie!==nt)&&(r.stencilFunc(Te,Ue,nt),se=Te,he=Ue,ie=nt)},setOp:function(Te,Ue,nt){(te!==Te||Ce!==Ue||Ie!==nt)&&(r.stencilOp(Te,Ue,nt),te=Te,Ce=Ue,Ie=nt)},setLocked:function(Te){I=Te},setClear:function(Te){ft!==Te&&(r.clearStencil(Te),ft=Te)},reset:function(){I=!1,xe=null,se=null,he=null,ie=null,te=null,Ce=null,Ie=null,ft=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,y=null,x=null,w=null,A=null,T=new et(0,0,0),C=0,b=!1,v=null,P=null,U=null,B=null,W=null;const Z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,H=0;const k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(k)[1]),X=H>=1):k.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),X=H>=2);let re=null,L={};const pe=r.getParameter(r.SCISSOR_BOX),Fe=r.getParameter(r.VIEWPORT),Ye=new vt().fromArray(pe),j=new vt().fromArray(Fe);function ue(I,xe,se,he){const ie=new Uint8Array(4),te=r.createTexture();r.bindTexture(I,te),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ce=0;Ce<se;Ce++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(xe,0,r.RGBA,1,1,he,0,r.RGBA,r.UNSIGNED_BYTE,ie):r.texImage2D(xe+Ce,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ie);return te}const oe={};oe[r.TEXTURE_2D]=ue(r.TEXTURE_2D,r.TEXTURE_2D,1),oe[r.TEXTURE_CUBE_MAP]=ue(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[r.TEXTURE_2D_ARRAY]=ue(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),oe[r.TEXTURE_3D]=ue(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(r.DEPTH_TEST),o.setFunc(Bo),He(!1),G(Od),le(r.CULL_FACE),D(Jr);function le(I){u[I]!==!0&&(r.enable(I),u[I]=!0)}function de(I){u[I]!==!1&&(r.disable(I),u[I]=!1)}function De(I,xe){return f[I]!==xe?(r.bindFramebuffer(I,xe),f[I]=xe,I===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=xe),I===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=xe),!0):!1}function Re(I,xe){let se=d,he=!1;if(I){se=h.get(xe),se===void 0&&(se=[],h.set(xe,se));const ie=I.textures;if(se.length!==ie.length||se[0]!==r.COLOR_ATTACHMENT0){for(let te=0,Ce=ie.length;te<Ce;te++)se[te]=r.COLOR_ATTACHMENT0+te;se.length=ie.length,he=!0}}else se[0]!==r.BACK&&(se[0]=r.BACK,he=!0);he&&r.drawBuffers(se)}function We(I){return g!==I?(r.useProgram(I),g=I,!0):!1}const Xe={[ws]:r.FUNC_ADD,[z0]:r.FUNC_SUBTRACT,[V0]:r.FUNC_REVERSE_SUBTRACT};Xe[H0]=r.MIN,Xe[G0]=r.MAX;const ye={[W0]:r.ZERO,[X0]:r.ONE,[Y0]:r.SRC_COLOR,[df]:r.SRC_ALPHA,[J0]:r.SRC_ALPHA_SATURATE,[j0]:r.DST_COLOR,[$0]:r.DST_ALPHA,[q0]:r.ONE_MINUS_SRC_COLOR,[pf]:r.ONE_MINUS_SRC_ALPHA,[Z0]:r.ONE_MINUS_DST_COLOR,[K0]:r.ONE_MINUS_DST_ALPHA,[Q0]:r.CONSTANT_COLOR,[ex]:r.ONE_MINUS_CONSTANT_COLOR,[tx]:r.CONSTANT_ALPHA,[nx]:r.ONE_MINUS_CONSTANT_ALPHA};function D(I,xe,se,he,ie,te,Ce,Ie,ft,Te){if(I===Jr){_===!0&&(de(r.BLEND),_=!1);return}if(_===!1&&(le(r.BLEND),_=!0),I!==k0){if(I!==m||Te!==b){if((p!==ws||x!==ws)&&(r.blendEquation(r.FUNC_ADD),p=ws,x=ws),Te)switch(I){case Eo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Bd:r.blendFunc(r.ONE,r.ONE);break;case kd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case zd:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Eo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Bd:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case kd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,y=null,w=null,A=null,T.set(0,0,0),C=0,m=I,b=Te}return}ie=ie||xe,te=te||se,Ce=Ce||he,(xe!==p||ie!==x)&&(r.blendEquationSeparate(Xe[xe],Xe[ie]),p=xe,x=ie),(se!==M||he!==y||te!==w||Ce!==A)&&(r.blendFuncSeparate(ye[se],ye[he],ye[te],ye[Ce]),M=se,y=he,w=te,A=Ce),(Ie.equals(T)===!1||ft!==C)&&(r.blendColor(Ie.r,Ie.g,Ie.b,ft),T.copy(Ie),C=ft),m=I,b=!1}function Ke(I,xe){I.side===yi?de(r.CULL_FACE):le(r.CULL_FACE);let se=I.side===Bn;xe&&(se=!se),He(se),I.blending===Eo&&I.transparent===!1?D(Jr):D(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const he=I.stencilWrite;a.setTest(he),he&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ee(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?le(r.SAMPLE_ALPHA_TO_COVERAGE):de(r.SAMPLE_ALPHA_TO_COVERAGE)}function He(I){v!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),v=I)}function G(I){I!==F0?(le(r.CULL_FACE),I!==P&&(I===Od?r.cullFace(r.BACK):I===O0?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):de(r.CULL_FACE),P=I}function be(I){I!==U&&(X&&r.lineWidth(I),U=I)}function ee(I,xe,se){I?(le(r.POLYGON_OFFSET_FILL),(B!==xe||W!==se)&&(r.polygonOffset(xe,se),B=xe,W=se)):de(r.POLYGON_OFFSET_FILL)}function N(I){I?le(r.SCISSOR_TEST):de(r.SCISSOR_TEST)}function J(I){I===void 0&&(I=r.TEXTURE0+Z-1),re!==I&&(r.activeTexture(I),re=I)}function Me(I,xe,se){se===void 0&&(re===null?se=r.TEXTURE0+Z-1:se=re);let he=L[se];he===void 0&&(he={type:void 0,texture:void 0},L[se]=he),(he.type!==I||he.texture!==xe)&&(re!==se&&(r.activeTexture(se),re=se),r.bindTexture(I,xe||oe[I]),he.type=I,he.texture=xe)}function R(){const I=L[re];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function S(){try{r.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{r.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{r.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{r.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{r.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ae(){try{r.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Se(){try{r.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{r.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(){try{r.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(I){Ye.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),Ye.copy(I))}function Oe(I){j.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),j.copy(I))}function Be(I,xe){let se=c.get(xe);se===void 0&&(se=new WeakMap,c.set(xe,se));let he=se.get(I);he===void 0&&(he=r.getUniformBlockIndex(xe,I.name),se.set(I,he))}function ge(I,xe){const he=c.get(xe).get(I);l.get(xe)!==he&&(r.uniformBlockBinding(xe,he,I.__bindingPointIndex),l.set(xe,he))}function Ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},re=null,L={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,y=null,x=null,w=null,A=null,T=new et(0,0,0),C=0,b=!1,v=null,P=null,U=null,B=null,W=null,Ye.set(0,0,r.canvas.width,r.canvas.height),j.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:le,disable:de,bindFramebuffer:De,drawBuffers:Re,useProgram:We,setBlending:D,setMaterial:Ke,setFlipSided:He,setCullFace:G,setLineWidth:be,setPolygonOffset:ee,setScissorTest:N,activeTexture:J,bindTexture:Me,unbindTexture:R,compressedTexImage2D:S,compressedTexImage3D:O,texImage2D:ne,texImage3D:ce,updateUBOMapping:Be,uniformBlockBinding:ge,texStorage2D:ae,texStorage3D:Se,texSubImage2D:Q,texSubImage3D:K,compressedTexSubImage2D:q,compressedTexSubImage3D:me,scissor:ve,viewport:Oe,reset:Ge}}function NT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return d?new OffscreenCanvas(R,S):Qa("canvas")}function _(R,S,O){let Q=1;const K=Me(R);if((K.width>O||K.height>O)&&(Q=O/Math.max(K.width,K.height)),Q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const q=Math.floor(Q*K.width),me=Math.floor(Q*K.height);f===void 0&&(f=g(q,me));const ae=S?g(q,me):f;return ae.width=q,ae.height=me,ae.getContext("2d").drawImage(R,0,0,q,me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+me+")."),ae}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){r.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(R,S,O,Q,K=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let q=S;if(S===r.RED&&(O===r.FLOAT&&(q=r.R32F),O===r.HALF_FLOAT&&(q=r.R16F),O===r.UNSIGNED_BYTE&&(q=r.R8)),S===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.R8UI),O===r.UNSIGNED_SHORT&&(q=r.R16UI),O===r.UNSIGNED_INT&&(q=r.R32UI),O===r.BYTE&&(q=r.R8I),O===r.SHORT&&(q=r.R16I),O===r.INT&&(q=r.R32I)),S===r.RG&&(O===r.FLOAT&&(q=r.RG32F),O===r.HALF_FLOAT&&(q=r.RG16F),O===r.UNSIGNED_BYTE&&(q=r.RG8)),S===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RG8UI),O===r.UNSIGNED_SHORT&&(q=r.RG16UI),O===r.UNSIGNED_INT&&(q=r.RG32UI),O===r.BYTE&&(q=r.RG8I),O===r.SHORT&&(q=r.RG16I),O===r.INT&&(q=r.RG32I)),S===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RGB8UI),O===r.UNSIGNED_SHORT&&(q=r.RGB16UI),O===r.UNSIGNED_INT&&(q=r.RGB32UI),O===r.BYTE&&(q=r.RGB8I),O===r.SHORT&&(q=r.RGB16I),O===r.INT&&(q=r.RGB32I)),S===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),O===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),O===r.UNSIGNED_INT&&(q=r.RGBA32UI),O===r.BYTE&&(q=r.RGBA8I),O===r.SHORT&&(q=r.RGBA16I),O===r.INT&&(q=r.RGBA32I)),S===r.RGB&&O===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),S===r.RGBA){const me=K?Lc:gt.getTransfer(Q);O===r.FLOAT&&(q=r.RGBA32F),O===r.HALF_FLOAT&&(q=r.RGBA16F),O===r.UNSIGNED_BYTE&&(q=me===wt?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(R,S){let O;return R?S===null||S===zs||S===$a?O=r.DEPTH24_STENCIL8:S===Fi?O=r.DEPTH32F_STENCIL8:S===qa&&(O=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===zs||S===$a?O=r.DEPTH_COMPONENT24:S===Fi?O=r.DEPTH_COMPONENT32F:S===qa&&(O=r.DEPTH_COMPONENT16),O}function w(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Gn&&R.minFilter!==Mi?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function A(R){const S=R.target;S.removeEventListener("dispose",A),C(S),S.isVideoTexture&&u.delete(S)}function T(R){const S=R.target;S.removeEventListener("dispose",T),v(S)}function C(R){const S=n.get(R);if(S.__webglInit===void 0)return;const O=R.source,Q=h.get(O);if(Q){const K=Q[S.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(R),Object.keys(Q).length===0&&h.delete(O)}n.remove(R)}function b(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const O=R.source,Q=h.get(O);delete Q[S.__cacheKey],o.memory.textures--}function v(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(S.__webglFramebuffer[Q]))for(let K=0;K<S.__webglFramebuffer[Q].length;K++)r.deleteFramebuffer(S.__webglFramebuffer[Q][K]);else r.deleteFramebuffer(S.__webglFramebuffer[Q]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[Q])}else{if(Array.isArray(S.__webglFramebuffer))for(let Q=0;Q<S.__webglFramebuffer.length;Q++)r.deleteFramebuffer(S.__webglFramebuffer[Q]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Q=0;Q<S.__webglColorRenderbuffer.length;Q++)S.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[Q]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const O=R.textures;for(let Q=0,K=O.length;Q<K;Q++){const q=n.get(O[Q]);q.__webglTexture&&(r.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(O[Q])}n.remove(R)}let P=0;function U(){P=0}function B(){const R=P;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function W(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function Z(R,S){const O=n.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){const Q=R.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(O,R,S);return}}t.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+S)}function X(R,S){const O=n.get(R);if(R.version>0&&O.__version!==R.version){oe(O,R,S);return}t.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+S)}function H(R,S){const O=n.get(R);if(R.version>0&&O.__version!==R.version){oe(O,R,S);return}t.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+S)}function k(R,S){const O=n.get(R);if(R.version>0&&O.__version!==R.version){le(O,R,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+S)}const re={[Vo]:r.REPEAT,[Yr]:r.CLAMP_TO_EDGE,[Dc]:r.MIRRORED_REPEAT},L={[Gn]:r.NEAREST,[fg]:r.NEAREST_MIPMAP_NEAREST,[Sa]:r.NEAREST_MIPMAP_LINEAR,[Mi]:r.LINEAR,[ac]:r.LINEAR_MIPMAP_NEAREST,[mr]:r.LINEAR_MIPMAP_LINEAR},pe={[xx]:r.NEVER,[Tx]:r.ALWAYS,[vx]:r.LESS,[Sg]:r.LEQUAL,[yx]:r.EQUAL,[bx]:r.GEQUAL,[Sx]:r.GREATER,[Mx]:r.NOTEQUAL};function Fe(R,S){if(S.type===Fi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Mi||S.magFilter===ac||S.magFilter===Sa||S.magFilter===mr||S.minFilter===Mi||S.minFilter===ac||S.minFilter===Sa||S.minFilter===mr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,re[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,re[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,re[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,L[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,L[S.minFilter]),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,pe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Gn||S.minFilter!==Sa&&S.minFilter!==mr||S.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ye(R,S){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",A));const Q=S.source;let K=h.get(Q);K===void 0&&(K={},h.set(Q,K));const q=W(S);if(q!==R.__cacheKey){K[q]===void 0&&(K[q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,O=!0),K[q].usedTimes++;const me=K[R.__cacheKey];me!==void 0&&(K[R.__cacheKey].usedTimes--,me.usedTimes===0&&b(S)),R.__cacheKey=q,R.__webglTexture=K[q].texture}return O}function j(R,S,O){return Math.floor(Math.floor(R/O)/S)}function ue(R,S,O,Q){const q=R.updateRanges;if(q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,S.width,S.height,O,Q,S.data);else{q.sort((ce,ve)=>ce.start-ve.start);let me=0;for(let ce=1;ce<q.length;ce++){const ve=q[me],Oe=q[ce],Be=ve.start+ve.count,ge=j(Oe.start,S.width,4),Ge=j(ve.start,S.width,4);Oe.start<=Be+1&&ge===Ge&&j(Oe.start+Oe.count-1,S.width,4)===ge?ve.count=Math.max(ve.count,Oe.start+Oe.count-ve.start):(++me,q[me]=Oe)}q.length=me+1;const ae=r.getParameter(r.UNPACK_ROW_LENGTH),Se=r.getParameter(r.UNPACK_SKIP_PIXELS),ne=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,S.width);for(let ce=0,ve=q.length;ce<ve;ce++){const Oe=q[ce],Be=Math.floor(Oe.start/4),ge=Math.ceil(Oe.count/4),Ge=Be%S.width,I=Math.floor(Be/S.width),xe=ge,se=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ge),r.pixelStorei(r.UNPACK_SKIP_ROWS,I),t.texSubImage2D(r.TEXTURE_2D,0,Ge,I,xe,se,O,Q,S.data)}R.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ae),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Se),r.pixelStorei(r.UNPACK_SKIP_ROWS,ne)}}function oe(R,S,O){let Q=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=r.TEXTURE_3D);const K=Ye(R,S),q=S.source;t.bindTexture(Q,R.__webglTexture,r.TEXTURE0+O);const me=n.get(q);if(q.version!==me.__version||K===!0){t.activeTexture(r.TEXTURE0+O);const ae=gt.getPrimaries(gt.workingColorSpace),Se=S.colorSpace===Xr?null:gt.getPrimaries(S.colorSpace),ne=S.colorSpace===Xr||ae===Se?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let ce=_(S.image,!1,i.maxTextureSize);ce=J(S,ce);const ve=s.convert(S.format,S.colorSpace),Oe=s.convert(S.type);let Be=y(S.internalFormat,ve,Oe,S.colorSpace,S.isVideoTexture);Fe(Q,S);let ge;const Ge=S.mipmaps,I=S.isVideoTexture!==!0,xe=me.__version===void 0||K===!0,se=q.dataReady,he=w(S,ce);if(S.isDepthTexture)Be=x(S.format===ja,S.type),xe&&(I?t.texStorage2D(r.TEXTURE_2D,1,Be,ce.width,ce.height):t.texImage2D(r.TEXTURE_2D,0,Be,ce.width,ce.height,0,ve,Oe,null));else if(S.isDataTexture)if(Ge.length>0){I&&xe&&t.texStorage2D(r.TEXTURE_2D,he,Be,Ge[0].width,Ge[0].height);for(let ie=0,te=Ge.length;ie<te;ie++)ge=Ge[ie],I?se&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,ge.width,ge.height,ve,Oe,ge.data):t.texImage2D(r.TEXTURE_2D,ie,Be,ge.width,ge.height,0,ve,Oe,ge.data);S.generateMipmaps=!1}else I?(xe&&t.texStorage2D(r.TEXTURE_2D,he,Be,ce.width,ce.height),se&&ue(S,ce,ve,Oe)):t.texImage2D(r.TEXTURE_2D,0,Be,ce.width,ce.height,0,ve,Oe,ce.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){I&&xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,Be,Ge[0].width,Ge[0].height,ce.depth);for(let ie=0,te=Ge.length;ie<te;ie++)if(ge=Ge[ie],S.format!==bi)if(ve!==null)if(I){if(se)if(S.layerUpdates.size>0){const Ce=Cp(ge.width,ge.height,S.format,S.type);for(const Ie of S.layerUpdates){const ft=ge.data.subarray(Ie*Ce/ge.data.BYTES_PER_ELEMENT,(Ie+1)*Ce/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,Ie,ge.width,ge.height,1,ve,ft)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,ge.width,ge.height,ce.depth,ve,ge.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ie,Be,ge.width,ge.height,ce.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?se&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,ge.width,ge.height,ce.depth,ve,Oe,ge.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ie,Be,ge.width,ge.height,ce.depth,0,ve,Oe,ge.data)}else{I&&xe&&t.texStorage2D(r.TEXTURE_2D,he,Be,Ge[0].width,Ge[0].height);for(let ie=0,te=Ge.length;ie<te;ie++)ge=Ge[ie],S.format!==bi?ve!==null?I?se&&t.compressedTexSubImage2D(r.TEXTURE_2D,ie,0,0,ge.width,ge.height,ve,ge.data):t.compressedTexImage2D(r.TEXTURE_2D,ie,Be,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?se&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,ge.width,ge.height,ve,Oe,ge.data):t.texImage2D(r.TEXTURE_2D,ie,Be,ge.width,ge.height,0,ve,Oe,ge.data)}else if(S.isDataArrayTexture)if(I){if(xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,he,Be,ce.width,ce.height,ce.depth),se)if(S.layerUpdates.size>0){const ie=Cp(ce.width,ce.height,S.format,S.type);for(const te of S.layerUpdates){const Ce=ce.data.subarray(te*ie/ce.data.BYTES_PER_ELEMENT,(te+1)*ie/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,ce.width,ce.height,1,ve,Oe,Ce)}S.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,ve,Oe,ce.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Be,ce.width,ce.height,ce.depth,0,ve,Oe,ce.data);else if(S.isData3DTexture)I?(xe&&t.texStorage3D(r.TEXTURE_3D,he,Be,ce.width,ce.height,ce.depth),se&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,ve,Oe,ce.data)):t.texImage3D(r.TEXTURE_3D,0,Be,ce.width,ce.height,ce.depth,0,ve,Oe,ce.data);else if(S.isFramebufferTexture){if(xe)if(I)t.texStorage2D(r.TEXTURE_2D,he,Be,ce.width,ce.height);else{let ie=ce.width,te=ce.height;for(let Ce=0;Ce<he;Ce++)t.texImage2D(r.TEXTURE_2D,Ce,Be,ie,te,0,ve,Oe,null),ie>>=1,te>>=1}}else if(Ge.length>0){if(I&&xe){const ie=Me(Ge[0]);t.texStorage2D(r.TEXTURE_2D,he,Be,ie.width,ie.height)}for(let ie=0,te=Ge.length;ie<te;ie++)ge=Ge[ie],I?se&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,ve,Oe,ge):t.texImage2D(r.TEXTURE_2D,ie,Be,ve,Oe,ge);S.generateMipmaps=!1}else if(I){if(xe){const ie=Me(ce);t.texStorage2D(r.TEXTURE_2D,he,Be,ie.width,ie.height)}se&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ve,Oe,ce)}else t.texImage2D(r.TEXTURE_2D,0,Be,ve,Oe,ce);m(S)&&p(Q),me.__version=q.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function le(R,S,O){if(S.image.length!==6)return;const Q=Ye(R,S),K=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+O);const q=n.get(K);if(K.version!==q.__version||Q===!0){t.activeTexture(r.TEXTURE0+O);const me=gt.getPrimaries(gt.workingColorSpace),ae=S.colorSpace===Xr?null:gt.getPrimaries(S.colorSpace),Se=S.colorSpace===Xr||me===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const ne=S.isCompressedTexture||S.image[0].isCompressedTexture,ce=S.image[0]&&S.image[0].isDataTexture,ve=[];for(let te=0;te<6;te++)!ne&&!ce?ve[te]=_(S.image[te],!0,i.maxCubemapSize):ve[te]=ce?S.image[te].image:S.image[te],ve[te]=J(S,ve[te]);const Oe=ve[0],Be=s.convert(S.format,S.colorSpace),ge=s.convert(S.type),Ge=y(S.internalFormat,Be,ge,S.colorSpace),I=S.isVideoTexture!==!0,xe=q.__version===void 0||Q===!0,se=K.dataReady;let he=w(S,Oe);Fe(r.TEXTURE_CUBE_MAP,S);let ie;if(ne){I&&xe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Ge,Oe.width,Oe.height);for(let te=0;te<6;te++){ie=ve[te].mipmaps;for(let Ce=0;Ce<ie.length;Ce++){const Ie=ie[Ce];S.format!==bi?Be!==null?I?se&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Ie.width,Ie.height,Be,Ie.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Ge,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Ie.width,Ie.height,Be,ge,Ie.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Ge,Ie.width,Ie.height,0,Be,ge,Ie.data)}}}else{if(ie=S.mipmaps,I&&xe){ie.length>0&&he++;const te=Me(ve[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,he,Ge,te.width,te.height)}for(let te=0;te<6;te++)if(ce){I?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ve[te].width,ve[te].height,Be,ge,ve[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ge,ve[te].width,ve[te].height,0,Be,ge,ve[te].data);for(let Ce=0;Ce<ie.length;Ce++){const ft=ie[Ce].image[te].image;I?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,ft.width,ft.height,Be,ge,ft.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Ge,ft.width,ft.height,0,Be,ge,ft.data)}}else{I?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Be,ge,ve[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ge,Be,ge,ve[te]);for(let Ce=0;Ce<ie.length;Ce++){const Ie=ie[Ce];I?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,Be,ge,Ie.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Ge,Be,ge,Ie.image[te])}}}m(S)&&p(r.TEXTURE_CUBE_MAP),q.__version=K.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function de(R,S,O,Q,K,q){const me=s.convert(O.format,O.colorSpace),ae=s.convert(O.type),Se=y(O.internalFormat,me,ae,O.colorSpace),ne=n.get(S),ce=n.get(O);if(ce.__renderTarget=S,!ne.__hasExternalTextures){const ve=Math.max(1,S.width>>q),Oe=Math.max(1,S.height>>q);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?t.texImage3D(K,q,Se,ve,Oe,S.depth,0,me,ae,null):t.texImage2D(K,q,Se,ve,Oe,0,me,ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),ee(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,K,ce.__webglTexture,0,be(S)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,K,ce.__webglTexture,q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function De(R,S,O){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer){const Q=S.depthTexture,K=Q&&Q.isDepthTexture?Q.type:null,q=x(S.stencilBuffer,K),me=S.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ae=be(S);ee(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ae,q,S.width,S.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,ae,q,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,q,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,me,r.RENDERBUFFER,R)}else{const Q=S.textures;for(let K=0;K<Q.length;K++){const q=Q[K],me=s.convert(q.format,q.colorSpace),ae=s.convert(q.type),Se=y(q.internalFormat,me,ae,q.colorSpace),ne=be(S);O&&ee(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,Se,S.width,S.height):ee(S)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,Se,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,Se,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Re(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(S.depthTexture);Q.__renderTarget=S,(!Q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Z(S.depthTexture,0);const K=Q.__webglTexture,q=be(S);if(S.depthTexture.format===Ka)ee(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0,q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0);else if(S.depthTexture.format===ja)ee(S)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0,q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function We(R){const S=n.get(R),O=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const Q=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Q){const K=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Q.removeEventListener("dispose",K)};Q.addEventListener("dispose",K),S.__depthDisposeCallback=K}S.__boundDepthTexture=Q}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const Q=R.texture.mipmaps;Q&&Q.length>0?Re(S.__webglFramebuffer[0],R):Re(S.__webglFramebuffer,R)}else if(O){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]===void 0)S.__webglDepthbuffer[Q]=r.createRenderbuffer(),De(S.__webglDepthbuffer[Q],R,!1);else{const K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=S.__webglDepthbuffer[Q];r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,q)}}else{const Q=R.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=r.createRenderbuffer(),De(S.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=S.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Xe(R,S,O){const Q=n.get(R);S!==void 0&&de(Q.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&We(R)}function ye(R){const S=R.texture,O=n.get(R),Q=n.get(S);R.addEventListener("dispose",T);const K=R.textures,q=R.isWebGLCubeRenderTarget===!0,me=K.length>1;if(me||(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=S.version,o.memory.textures++),q){O.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[ae]=[];for(let Se=0;Se<S.mipmaps.length;Se++)O.__webglFramebuffer[ae][Se]=r.createFramebuffer()}else O.__webglFramebuffer[ae]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let ae=0;ae<S.mipmaps.length;ae++)O.__webglFramebuffer[ae]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(me)for(let ae=0,Se=K.length;ae<Se;ae++){const ne=n.get(K[ae]);ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&ee(R)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ae=0;ae<K.length;ae++){const Se=K[ae];O.__webglColorRenderbuffer[ae]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[ae]);const ne=s.convert(Se.format,Se.colorSpace),ce=s.convert(Se.type),ve=y(Se.internalFormat,ne,ce,Se.colorSpace,R.isXRRenderTarget===!0),Oe=be(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Oe,ve,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,O.__webglColorRenderbuffer[ae])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),De(O.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(q){t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),Fe(r.TEXTURE_CUBE_MAP,S);for(let ae=0;ae<6;ae++)if(S.mipmaps&&S.mipmaps.length>0)for(let Se=0;Se<S.mipmaps.length;Se++)de(O.__webglFramebuffer[ae][Se],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Se);else de(O.__webglFramebuffer[ae],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(S)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let ae=0,Se=K.length;ae<Se;ae++){const ne=K[ae],ce=n.get(ne);t.bindTexture(r.TEXTURE_2D,ce.__webglTexture),Fe(r.TEXTURE_2D,ne),de(O.__webglFramebuffer,R,ne,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,0),m(ne)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ae=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ae=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ae,Q.__webglTexture),Fe(ae,S),S.mipmaps&&S.mipmaps.length>0)for(let Se=0;Se<S.mipmaps.length;Se++)de(O.__webglFramebuffer[Se],R,S,r.COLOR_ATTACHMENT0,ae,Se);else de(O.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,ae,0);m(S)&&p(ae),t.unbindTexture()}R.depthBuffer&&We(R)}function D(R){const S=R.textures;for(let O=0,Q=S.length;O<Q;O++){const K=S[O];if(m(K)){const q=M(R),me=n.get(K).__webglTexture;t.bindTexture(q,me),p(q),t.unbindTexture()}}}const Ke=[],He=[];function G(R){if(R.samples>0){if(ee(R)===!1){const S=R.textures,O=R.width,Q=R.height;let K=r.COLOR_BUFFER_BIT;const q=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=n.get(R),ae=S.length>1;if(ae)for(let ne=0;ne<S.length;ne++)t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);const Se=R.texture.mipmaps;Se&&Se.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let ne=0;ne<S.length;ne++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),ae){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,me.__webglColorRenderbuffer[ne]);const ce=n.get(S[ne]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ce,0)}r.blitFramebuffer(0,0,O,Q,0,0,O,Q,K,r.NEAREST),l===!0&&(Ke.length=0,He.length=0,Ke.push(r.COLOR_ATTACHMENT0+ne),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ke.push(q),He.push(q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,He)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ke))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ae)for(let ne=0;ne<S.length;ne++){t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.RENDERBUFFER,me.__webglColorRenderbuffer[ne]);const ce=n.get(S[ne]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ne,r.TEXTURE_2D,ce,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[S])}}}function be(R){return Math.min(i.maxSamples,R.samples)}function ee(R){const S=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function N(R){const S=o.render.frame;u.get(R)!==S&&(u.set(R,S),R.update())}function J(R,S){const O=R.colorSpace,Q=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==zn&&O!==Xr&&(gt.getTransfer(O)===wt?(Q!==bi||K!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}function Me(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=Z,this.setTexture2DArray=X,this.setTexture3D=H,this.setTextureCube=k,this.rebindTextures=Xe,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=G,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=de,this.useMultisampledRTT=ee}function UT(r,e){function t(n,i=Xr){let s;const o=gt.getTransfer(i);if(n===Ji)return r.UNSIGNED_BYTE;if(n===Bh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===kh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===pg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===hg)return r.BYTE;if(n===dg)return r.SHORT;if(n===qa)return r.UNSIGNED_SHORT;if(n===Oh)return r.INT;if(n===zs)return r.UNSIGNED_INT;if(n===Fi)return r.FLOAT;if(n===ul)return r.HALF_FLOAT;if(n===mg)return r.ALPHA;if(n===gg)return r.RGB;if(n===bi)return r.RGBA;if(n===Ka)return r.DEPTH_COMPONENT;if(n===ja)return r.DEPTH_STENCIL;if(n===zh)return r.RED;if(n===Vh)return r.RED_INTEGER;if(n===_g)return r.RG;if(n===Hh)return r.RG_INTEGER;if(n===Gh)return r.RGBA_INTEGER;if(n===lc||n===cc||n===uc||n===fc)if(o===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===lc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===uc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===lc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===uc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Tf||n===Ef||n===wf||n===Af)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Tf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ef)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Af)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rf||n===Cf||n===Pf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Rf||n===Cf)return o===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Pf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Df||n===Lf||n===If||n===Nf||n===Uf||n===Ff||n===Of||n===Bf||n===kf||n===zf||n===Vf||n===Hf||n===Gf||n===Wf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Df)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===If)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Nf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ff)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Of)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===kf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===hc||n===Xf||n===Yf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===hc)return o===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xg||n===qf||n===$f||n===Kf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===hc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===qf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$f)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Kf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$a?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const FT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OT=`
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

}`;class BT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new sn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wr({vertexShader:FT,fragmentShader:OT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new On(new hl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kT extends na{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=new BT,m=t.getContextAttributes();let p=null,M=null;const y=[],x=[],w=new pt;let A=null;const T=new Nn;T.viewport=new vt;const C=new Nn;C.viewport=new vt;const b=[T,C],v=new Zv;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ue=y[j];return ue===void 0&&(ue=new Au,y[j]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(j){let ue=y[j];return ue===void 0&&(ue=new Au,y[j]=ue),ue.getGripSpace()},this.getHand=function(j){let ue=y[j];return ue===void 0&&(ue=new Au,y[j]=ue),ue.getHandSpace()};function B(j){const ue=x.indexOf(j.inputSource);if(ue===-1)return;const oe=y[ue];oe!==void 0&&(oe.update(j.inputSource,j.frame,c||o),oe.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Z);for(let j=0;j<y.length;j++){const ue=x[j];ue!==null&&(x[j]=null,y[j].disconnect(ue))}P=null,U=null,_.reset(),e.setRenderTarget(p),d=null,h=null,f=null,i=null,M=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,le=null,de=null;m.depth&&(de=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=m.stencil?ja:Ka,le=m.stencil?$a:zs);const De={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:s};f=new XRWebGLBinding(i,t),h=f.createProjectionLayer(De),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Er(h.textureWidth,h.textureHeight,{format:bi,type:Ji,depthTexture:new Ug(h.textureWidth,h.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const oe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,oe),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Er(d.framebufferWidth,d.framebufferHeight,{format:bi,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ye.setContext(i),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(j){for(let ue=0;ue<j.removed.length;ue++){const oe=j.removed[ue],le=x.indexOf(oe);le>=0&&(x[le]=null,y[le].disconnect(oe))}for(let ue=0;ue<j.added.length;ue++){const oe=j.added[ue];let le=x.indexOf(oe);if(le===-1){for(let De=0;De<y.length;De++)if(De>=x.length){x.push(oe),le=De;break}else if(x[De]===null){x[De]=oe,le=De;break}if(le===-1)break}const de=y[le];de&&de.connect(oe)}}const X=new V,H=new V;function k(j,ue,oe){X.setFromMatrixPosition(ue.matrixWorld),H.setFromMatrixPosition(oe.matrixWorld);const le=X.distanceTo(H),de=ue.projectionMatrix.elements,De=oe.projectionMatrix.elements,Re=de[14]/(de[10]-1),We=de[14]/(de[10]+1),Xe=(de[9]+1)/de[5],ye=(de[9]-1)/de[5],D=(de[8]-1)/de[0],Ke=(De[8]+1)/De[0],He=Re*D,G=Re*Ke,be=le/(-D+Ke),ee=be*-D;if(ue.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ee),j.translateZ(be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),de[10]===-1)j.projectionMatrix.copy(ue.projectionMatrix),j.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const N=Re+be,J=We+be,Me=He-ee,R=G+(le-ee),S=Xe*We/J*N,O=ye*We/J*N;j.projectionMatrix.makePerspective(Me,R,S,O,N,J),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,ue){ue===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ue.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let ue=j.near,oe=j.far;_.texture!==null&&(_.depthNear>0&&(ue=_.depthNear),_.depthFar>0&&(oe=_.depthFar)),v.near=C.near=T.near=ue,v.far=C.far=T.far=oe,(P!==v.near||U!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),P=v.near,U=v.far),T.layers.mask=j.layers.mask|2,C.layers.mask=j.layers.mask|4,v.layers.mask=T.layers.mask|C.layers.mask;const le=j.parent,de=v.cameras;re(v,le);for(let De=0;De<de.length;De++)re(de[De],le);de.length===2?k(v,T,C):v.projectionMatrix.copy(T.projectionMatrix),L(j,v,le)};function L(j,ue,oe){oe===null?j.matrix.copy(ue.matrixWorld):(j.matrix.copy(oe.matrixWorld),j.matrix.invert(),j.matrix.multiply(ue.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ue.projectionMatrix),j.projectionMatrixInverse.copy(ue.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ho*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let pe=null;function Fe(j,ue){if(u=ue.getViewerPose(c||o),g=ue,u!==null){const oe=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let le=!1;oe.length!==v.cameras.length&&(v.cameras.length=0,le=!0);for(let Re=0;Re<oe.length;Re++){const We=oe[Re];let Xe=null;if(d!==null)Xe=d.getViewport(We);else{const D=f.getViewSubImage(h,We);Xe=D.viewport,Re===0&&(e.setRenderTargetTextures(M,D.colorTexture,D.depthStencilTexture),e.setRenderTarget(M))}let ye=b[Re];ye===void 0&&(ye=new Nn,ye.layers.enable(Re),ye.viewport=new vt,b[Re]=ye),ye.matrix.fromArray(We.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(We.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Re===0&&(v.matrix.copy(ye.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),le===!0&&v.cameras.push(ye)}const de=i.enabledFeatures;if(de&&de.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&f){const Re=f.getDepthInformation(oe[0]);Re&&Re.isValid&&Re.texture&&_.init(e,Re,i.renderState)}}for(let oe=0;oe<y.length;oe++){const le=x[oe],de=y[oe];le!==null&&de!==void 0&&de.update(le,ue,c||o)}pe&&pe(j,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),g=null}const Ye=new Vg;Ye.setAnimationLoop(Fe),this.setAnimationLoop=function(j){pe=j},this.dispose=function(){}}}const ms=new Qi,zT=new st;function VT(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Rg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),y=M.envMap,x=M.envMapRotation;y&&(m.envMap.value=y,ms.copy(x),ms.x*=-1,ms.y*=-1,ms.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),m.envMapRotation.value.setFromMatrix4(zT.makeRotationFromEuler(ms)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function HT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const x=y.program;n.uniformBlockBinding(M,x)}function c(M,y){let x=i[M.id];x===void 0&&(g(M),x=u(M),i[M.id]=x,M.addEventListener("dispose",m));const w=y.program;n.updateUBOMapping(M,w);const A=e.render.frame;s[M.id]!==A&&(h(M),s[M.id]=A)}function u(M){const y=f();M.__bindingPointIndex=y;const x=r.createBuffer(),w=M.__size,A=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,w,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,x),x}function f(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const y=i[M.id],x=M.uniforms,w=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let A=0,T=x.length;A<T;A++){const C=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,v=C.length;b<v;b++){const P=C[b];if(d(P,A,b,w)===!0){const U=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let W=0;for(let Z=0;Z<B.length;Z++){const X=B[Z],H=_(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,U+W,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,W),W+=H.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(M,y,x,w){const A=M.value,T=y+"_"+x;if(w[T]===void 0)return typeof A=="number"||typeof A=="boolean"?w[T]=A:w[T]=A.clone(),!0;{const C=w[T];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return w[T]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function g(M){const y=M.uniforms;let x=0;const w=16;for(let T=0,C=y.length;T<C;T++){const b=Array.isArray(y[T])?y[T]:[y[T]];for(let v=0,P=b.length;v<P;v++){const U=b[v],B=Array.isArray(U.value)?U.value:[U.value];for(let W=0,Z=B.length;W<Z;W++){const X=B[W],H=_(X),k=x%w,re=k%H.boundary,L=k+re;x+=re,L!==0&&w-L<H.storage&&(x+=w-L),U.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=H.storage}}}const A=x%w;return A>0&&(x+=w-A),M.__size=x,M.__cache={},this}function _(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class GT{constructor(e={}){const{canvas:t=Hx(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=hn;let A=0,T=0,C=null,b=-1,v=null;const P=new vt,U=new vt;let B=null;const W=new et(0);let Z=0,X=t.width,H=t.height,k=1,re=null,L=null;const pe=new vt(0,0,X,H),Fe=new vt(0,0,X,H);let Ye=!1;const j=new $h;let ue=!1,oe=!1;const le=new st,de=new st,De=new V,Re=new vt,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function ye(){return C===null?k:1}let D=n;function Ke(E,z){return t.getContext(E,z)}try{const E={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fh}`),t.addEventListener("webglcontextlost",he,!1),t.addEventListener("webglcontextrestored",ie,!1),t.addEventListener("webglcontextcreationerror",te,!1),D===null){const z="webgl2";if(D=Ke(z,E),D===null)throw Ke(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let He,G,be,ee,N,J,Me,R,S,O,Q,K,q,me,ae,Se,ne,ce,ve,Oe,Be,ge,Ge,I;function xe(){He=new QM(D),He.init(),ge=new UT(D,He),G=new YM(D,He,e,ge),be=new IT(D,He),G.reverseDepthBuffer&&h&&be.buffers.depth.setReversed(!0),ee=new nb(D),N=new yT,J=new NT(D,He,be,N,G,ge,ee),Me=new $M(x),R=new JM(x),S=new ly(D),Ge=new WM(D,S),O=new eb(D,S,ee,Ge),Q=new rb(D,O,S,ee),ve=new ib(D,G,J),Se=new qM(N),K=new vT(x,Me,R,He,G,Ge,Se),q=new VT(x,N),me=new MT,ae=new RT(He),ce=new GM(x,Me,R,be,Q,d,l),ne=new DT(x,Q,G),I=new HT(D,ee,G,be),Oe=new XM(D,He,ee),Be=new tb(D,He,ee),ee.programs=K.programs,x.capabilities=G,x.extensions=He,x.properties=N,x.renderLists=me,x.shadowMap=ne,x.state=be,x.info=ee}xe();const se=new kT(x,D);this.xr=se,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=He.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=He.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(E){E!==void 0&&(k=E,this.setSize(X,H,!1))},this.getSize=function(E){return E.set(X,H)},this.setSize=function(E,z,$=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,H=z,t.width=Math.floor(E*k),t.height=Math.floor(z*k),$===!0&&(t.style.width=E+"px",t.style.height=z+"px"),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(X*k,H*k).floor()},this.setDrawingBufferSize=function(E,z,$){X=E,H=z,k=$,t.width=Math.floor(E*$),t.height=Math.floor(z*$),this.setViewport(0,0,E,z)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(pe)},this.setViewport=function(E,z,$,Y){E.isVector4?pe.set(E.x,E.y,E.z,E.w):pe.set(E,z,$,Y),be.viewport(P.copy(pe).multiplyScalar(k).round())},this.getScissor=function(E){return E.copy(Fe)},this.setScissor=function(E,z,$,Y){E.isVector4?Fe.set(E.x,E.y,E.z,E.w):Fe.set(E,z,$,Y),be.scissor(U.copy(Fe).multiplyScalar(k).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(E){be.setScissorTest(Ye=E)},this.setOpaqueSort=function(E){re=E},this.setTransparentSort=function(E){L=E},this.getClearColor=function(E){return E.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor(...arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha(...arguments)},this.clear=function(E=!0,z=!0,$=!0){let Y=0;if(E){let F=!1;if(C!==null){const fe=C.texture.format;F=fe===Gh||fe===Hh||fe===Vh}if(F){const fe=C.texture.type,we=fe===Ji||fe===zs||fe===qa||fe===$a||fe===Bh||fe===kh,Ne=ce.getClearColor(),Pe=ce.getClearAlpha(),Ve=Ne.r,qe=Ne.g,ze=Ne.b;we?(g[0]=Ve,g[1]=qe,g[2]=ze,g[3]=Pe,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Ve,_[1]=qe,_[2]=ze,_[3]=Pe,D.clearBufferiv(D.COLOR,0,_))}else Y|=D.COLOR_BUFFER_BIT}z&&(Y|=D.DEPTH_BUFFER_BIT),$&&(Y|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",he,!1),t.removeEventListener("webglcontextrestored",ie,!1),t.removeEventListener("webglcontextcreationerror",te,!1),ce.dispose(),me.dispose(),ae.dispose(),N.dispose(),Me.dispose(),R.dispose(),Q.dispose(),Ge.dispose(),I.dispose(),K.dispose(),se.dispose(),se.removeEventListener("sessionstart",Ee),se.removeEventListener("sessionend",Je),ke.stop()};function he(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ie(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const E=ee.autoReset,z=ne.enabled,$=ne.autoUpdate,Y=ne.needsUpdate,F=ne.type;xe(),ee.autoReset=E,ne.enabled=z,ne.autoUpdate=$,ne.needsUpdate=Y,ne.type=F}function te(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ce(E){const z=E.target;z.removeEventListener("dispose",Ce),Ie(z)}function Ie(E){ft(E),N.remove(E)}function ft(E){const z=N.get(E).programs;z!==void 0&&(z.forEach(function($){K.releaseProgram($)}),E.isShaderMaterial&&K.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,$,Y,F,fe){z===null&&(z=We);const we=F.isMesh&&F.matrixWorld.determinant()<0,Ne=Kn(E,z,$,Y,F);be.setMaterial(Y,we);let Pe=$.index,Ve=1;if(Y.wireframe===!0){if(Pe=O.getWireframeAttribute($),Pe===void 0)return;Ve=2}const qe=$.drawRange,ze=$.attributes.position;let Qe=qe.start*Ve,Et=(qe.start+qe.count)*Ve;fe!==null&&(Qe=Math.max(Qe,fe.start*Ve),Et=Math.min(Et,(fe.start+fe.count)*Ve)),Pe!==null?(Qe=Math.max(Qe,0),Et=Math.min(Et,Pe.count)):ze!=null&&(Qe=Math.max(Qe,0),Et=Math.min(Et,ze.count));const Gt=Et-Qe;if(Gt<0||Gt===1/0)return;Ge.setup(F,Y,Ne,$,Pe);let Ft,Ct=Oe;if(Pe!==null&&(Ft=S.get(Pe),Ct=Be,Ct.setIndex(Ft)),F.isMesh)Y.wireframe===!0?(be.setLineWidth(Y.wireframeLinewidth*ye()),Ct.setMode(D.LINES)):Ct.setMode(D.TRIANGLES);else if(F.isLine){let $e=Y.linewidth;$e===void 0&&($e=1),be.setLineWidth($e*ye()),F.isLineSegments?Ct.setMode(D.LINES):F.isLineLoop?Ct.setMode(D.LINE_LOOP):Ct.setMode(D.LINE_STRIP)}else F.isPoints?Ct.setMode(D.POINTS):F.isSprite&&Ct.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)wo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ct.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))Ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const $e=F._multiDrawStarts,kt=F._multiDrawCounts,_t=F._multiDrawCount,jn=Pe?S.get(Pe).bytesPerElement:1,qs=N.get(Y).currentProgram.getUniforms();for(let Zn=0;Zn<_t;Zn++)qs.setValue(D,"_gl_DrawID",Zn),Ct.render($e[Zn]/jn,kt[Zn])}else if(F.isInstancedMesh)Ct.renderInstances(Qe,Gt,F.count);else if($.isInstancedBufferGeometry){const $e=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,kt=Math.min($.instanceCount,$e);Ct.renderInstances(Qe,Gt,kt)}else Ct.render(Qe,Gt)};function Te(E,z,$){E.transparent===!0&&E.side===yi&&E.forceSinglePass===!1?(E.side=Bn,E.needsUpdate=!0,At(E,z,$),E.side=Zi,E.needsUpdate=!0,At(E,z,$),E.side=yi):At(E,z,$)}this.compile=function(E,z,$=null){$===null&&($=E),p=ae.get($),p.init(z),y.push(p),$.traverseVisible(function(F){F.isLight&&F.layers.test(z.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),E!==$&&E.traverseVisible(function(F){F.isLight&&F.layers.test(z.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const Y=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const fe=F.material;if(fe)if(Array.isArray(fe))for(let we=0;we<fe.length;we++){const Ne=fe[we];Te(Ne,$,F),Y.add(Ne)}else Te(fe,$,F),Y.add(fe)}),p=y.pop(),Y},this.compileAsync=function(E,z,$=null){const Y=this.compile(E,z,$);return new Promise(F=>{function fe(){if(Y.forEach(function(we){N.get(we).currentProgram.isReady()&&Y.delete(we)}),Y.size===0){F(E);return}setTimeout(fe,10)}He.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let Ue=null;function nt(E){Ue&&Ue(E)}function Ee(){ke.stop()}function Je(){ke.start()}const ke=new Vg;ke.setAnimationLoop(nt),typeof self<"u"&&ke.setContext(self),this.setAnimationLoop=function(E){Ue=E,se.setAnimationLoop(E),E===null?ke.stop():ke.start()},se.addEventListener("sessionstart",Ee),se.addEventListener("sessionend",Je),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(z),z=se.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,z,C),p=ae.get(E,y.length),p.init(z),y.push(p),de.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),j.setFromProjectionMatrix(de),oe=this.localClippingEnabled,ue=Se.init(this.clippingPlanes,oe),m=me.get(E,M.length),m.init(),M.push(m),se.enabled===!0&&se.isPresenting===!0){const fe=x.xr.getDepthSensingMesh();fe!==null&&Ze(fe,z,-1/0,x.sortObjects)}Ze(E,z,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(re,L),Xe=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Xe&&ce.addToRenderList(m,E),this.info.render.frame++,ue===!0&&Se.beginShadows();const $=p.state.shadowsArray;ne.render($,E,z),ue===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,F=m.transmissive;if(p.setupLights(),z.isArrayCamera){const fe=z.cameras;if(F.length>0)for(let we=0,Ne=fe.length;we<Ne;we++){const Pe=fe[we];lt(Y,F,E,Pe)}Xe&&ce.render(E);for(let we=0,Ne=fe.length;we<Ne;we++){const Pe=fe[we];Yt(m,E,Pe,Pe.viewport)}}else F.length>0&&lt(Y,F,E,z),Xe&&ce.render(E),Yt(m,E,z);C!==null&&T===0&&(J.updateMultisampleRenderTarget(C),J.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(x,E,z),Ge.resetDefaultState(),b=-1,v=null,y.pop(),y.length>0?(p=y[y.length-1],ue===!0&&Se.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Ze(E,z,$,Y){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){Y&&Re.setFromMatrixPosition(E.matrixWorld).applyMatrix4(de);const we=Q.update(E),Ne=E.material;Ne.visible&&m.push(E,we,Ne,$,Re.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const we=Q.update(E),Ne=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Re.copy(E.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Re.copy(we.boundingSphere.center)),Re.applyMatrix4(E.matrixWorld).applyMatrix4(de)),Array.isArray(Ne)){const Pe=we.groups;for(let Ve=0,qe=Pe.length;Ve<qe;Ve++){const ze=Pe[Ve],Qe=Ne[ze.materialIndex];Qe&&Qe.visible&&m.push(E,we,Qe,$,Re.z,ze)}}else Ne.visible&&m.push(E,we,Ne,$,Re.z,null)}}const fe=E.children;for(let we=0,Ne=fe.length;we<Ne;we++)Ze(fe[we],z,$,Y)}function Yt(E,z,$,Y){const F=E.opaque,fe=E.transmissive,we=E.transparent;p.setupLightsView($),ue===!0&&Se.setGlobalState(x.clippingPlanes,$),Y&&be.viewport(P.copy(Y)),F.length>0&&It(F,z,$),fe.length>0&&It(fe,z,$),we.length>0&&It(we,z,$),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function lt(E,z,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new Er(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?ul:Ji,minFilter:mr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));const fe=p.state.transmissionRenderTarget[Y.id],we=Y.viewport||P;fe.setSize(we.z*x.transmissionResolutionScale,we.w*x.transmissionResolutionScale);const Ne=x.getRenderTarget(),Pe=x.getActiveCubeFace(),Ve=x.getActiveMipmapLevel();x.setRenderTarget(fe),x.getClearColor(W),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),Xe&&ce.render($);const qe=x.toneMapping;x.toneMapping=Qr;const ze=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),ue===!0&&Se.setGlobalState(x.clippingPlanes,Y),It(E,$,Y),J.updateMultisampleRenderTarget(fe),J.updateRenderTargetMipmap(fe),He.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Et=0,Gt=z.length;Et<Gt;Et++){const Ft=z[Et],Ct=Ft.object,$e=Ft.geometry,kt=Ft.material,_t=Ft.group;if(kt.side===yi&&Ct.layers.test(Y.layers)){const jn=kt.side;kt.side=Bn,kt.needsUpdate=!0,Qt(Ct,$,Y,$e,kt,_t),kt.side=jn,kt.needsUpdate=!0,Qe=!0}}Qe===!0&&(J.updateMultisampleRenderTarget(fe),J.updateRenderTargetMipmap(fe))}x.setRenderTarget(Ne,Pe,Ve),x.setClearColor(W,Z),ze!==void 0&&(Y.viewport=ze),x.toneMapping=qe}function It(E,z,$){const Y=z.isScene===!0?z.overrideMaterial:null;for(let F=0,fe=E.length;F<fe;F++){const we=E[F],Ne=we.object,Pe=we.geometry,Ve=we.group;let qe=we.material;qe.allowOverride===!0&&Y!==null&&(qe=Y),Ne.layers.test($.layers)&&Qt(Ne,z,$,Pe,qe,Ve)}}function Qt(E,z,$,Y,F,fe){E.onBeforeRender(x,z,$,Y,F,fe),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(x,z,$,Y,E,fe),F.transparent===!0&&F.side===yi&&F.forceSinglePass===!1?(F.side=Bn,F.needsUpdate=!0,x.renderBufferDirect($,z,Y,F,E,fe),F.side=Zi,F.needsUpdate=!0,x.renderBufferDirect($,z,Y,F,E,fe),F.side=yi):x.renderBufferDirect($,z,Y,F,E,fe),E.onAfterRender(x,z,$,Y,F,fe)}function At(E,z,$){z.isScene!==!0&&(z=We);const Y=N.get(E),F=p.state.lights,fe=p.state.shadowsArray,we=F.state.version,Ne=K.getParameters(E,F.state,fe,z,$),Pe=K.getProgramCacheKey(Ne);let Ve=Y.programs;Y.environment=E.isMeshStandardMaterial?z.environment:null,Y.fog=z.fog,Y.envMap=(E.isMeshStandardMaterial?R:Me).get(E.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,Ve===void 0&&(E.addEventListener("dispose",Ce),Ve=new Map,Y.programs=Ve);let qe=Ve.get(Pe);if(qe!==void 0){if(Y.currentProgram===qe&&Y.lightsStateVersion===we)return yt(E,Ne),qe}else Ne.uniforms=K.getUniforms(E),E.onBeforeCompile(Ne,x),qe=K.acquireProgram(Ne,Pe),Ve.set(Pe,qe),Y.uniforms=Ne.uniforms;const ze=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ze.clippingPlanes=Se.uniform),yt(E,Ne),Y.needsLights=Tn(E),Y.lightsStateVersion=we,Y.needsLights&&(ze.ambientLightColor.value=F.state.ambient,ze.lightProbe.value=F.state.probe,ze.directionalLights.value=F.state.directional,ze.directionalLightShadows.value=F.state.directionalShadow,ze.spotLights.value=F.state.spot,ze.spotLightShadows.value=F.state.spotShadow,ze.rectAreaLights.value=F.state.rectArea,ze.ltc_1.value=F.state.rectAreaLTC1,ze.ltc_2.value=F.state.rectAreaLTC2,ze.pointLights.value=F.state.point,ze.pointLightShadows.value=F.state.pointShadow,ze.hemisphereLights.value=F.state.hemi,ze.directionalShadowMap.value=F.state.directionalShadowMap,ze.directionalShadowMatrix.value=F.state.directionalShadowMatrix,ze.spotShadowMap.value=F.state.spotShadowMap,ze.spotLightMatrix.value=F.state.spotLightMatrix,ze.spotLightMap.value=F.state.spotLightMap,ze.pointShadowMap.value=F.state.pointShadowMap,ze.pointShadowMatrix.value=F.state.pointShadowMatrix),Y.currentProgram=qe,Y.uniformsList=null,qe}function Rt(E){if(E.uniformsList===null){const z=E.currentProgram.getUniforms();E.uniformsList=pc.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function yt(E,z){const $=N.get(E);$.outputColorSpace=z.outputColorSpace,$.batching=z.batching,$.batchingColor=z.batchingColor,$.instancing=z.instancing,$.instancingColor=z.instancingColor,$.instancingMorph=z.instancingMorph,$.skinning=z.skinning,$.morphTargets=z.morphTargets,$.morphNormals=z.morphNormals,$.morphColors=z.morphColors,$.morphTargetsCount=z.morphTargetsCount,$.numClippingPlanes=z.numClippingPlanes,$.numIntersection=z.numClipIntersection,$.vertexAlphas=z.vertexAlphas,$.vertexTangents=z.vertexTangents,$.toneMapping=z.toneMapping}function Kn(E,z,$,Y,F){z.isScene!==!0&&(z=We),J.resetTextureUnits();const fe=z.fog,we=Y.isMeshStandardMaterial?z.environment:null,Ne=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:zn,Pe=(Y.isMeshStandardMaterial?R:Me).get(Y.envMap||we),Ve=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,qe=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),ze=!!$.morphAttributes.position,Qe=!!$.morphAttributes.normal,Et=!!$.morphAttributes.color;let Gt=Qr;Y.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Gt=x.toneMapping);const Ft=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ct=Ft!==void 0?Ft.length:0,$e=N.get(Y),kt=p.state.lights;if(ue===!0&&(oe===!0||E!==v)){const En=E===v&&Y.id===b;Se.setState(Y,E,En)}let _t=!1;Y.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==kt.state.version||$e.outputColorSpace!==Ne||F.isBatchedMesh&&$e.batching===!1||!F.isBatchedMesh&&$e.batching===!0||F.isBatchedMesh&&$e.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&$e.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&$e.instancing===!1||!F.isInstancedMesh&&$e.instancing===!0||F.isSkinnedMesh&&$e.skinning===!1||!F.isSkinnedMesh&&$e.skinning===!0||F.isInstancedMesh&&$e.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&$e.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&$e.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&$e.instancingMorph===!1&&F.morphTexture!==null||$e.envMap!==Pe||Y.fog===!0&&$e.fog!==fe||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==Se.numPlanes||$e.numIntersection!==Se.numIntersection)||$e.vertexAlphas!==Ve||$e.vertexTangents!==qe||$e.morphTargets!==ze||$e.morphNormals!==Qe||$e.morphColors!==Et||$e.toneMapping!==Gt||$e.morphTargetsCount!==Ct)&&(_t=!0):(_t=!0,$e.__version=Y.version);let jn=$e.currentProgram;_t===!0&&(jn=At(Y,z,F));let qs=!1,Zn=!1,aa=!1;const Ot=jn.getUniforms(),hi=$e.uniforms;if(be.useProgram(jn.program)&&(qs=!0,Zn=!0,aa=!0),Y.id!==b&&(b=Y.id,Zn=!0),qs||v!==E){be.buffers.depth.getReversed()?(le.copy(E.projectionMatrix),Wx(le),Xx(le),Ot.setValue(D,"projectionMatrix",le)):Ot.setValue(D,"projectionMatrix",E.projectionMatrix),Ot.setValue(D,"viewMatrix",E.matrixWorldInverse);const Vn=Ot.map.cameraPosition;Vn!==void 0&&Vn.setValue(D,De.setFromMatrixPosition(E.matrixWorld)),G.logarithmicDepthBuffer&&Ot.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ot.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),v!==E&&(v=E,Zn=!0,aa=!0)}if(F.isSkinnedMesh){Ot.setOptional(D,F,"bindMatrix"),Ot.setOptional(D,F,"bindMatrixInverse");const En=F.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Ot.setValue(D,"boneTexture",En.boneTexture,J))}F.isBatchedMesh&&(Ot.setOptional(D,F,"batchingTexture"),Ot.setValue(D,"batchingTexture",F._matricesTexture,J),Ot.setOptional(D,F,"batchingIdTexture"),Ot.setValue(D,"batchingIdTexture",F._indirectTexture,J),Ot.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&Ot.setValue(D,"batchingColorTexture",F._colorsTexture,J));const di=$.morphAttributes;if((di.position!==void 0||di.normal!==void 0||di.color!==void 0)&&ve.update(F,$,jn),(Zn||$e.receiveShadow!==F.receiveShadow)&&($e.receiveShadow=F.receiveShadow,Ot.setValue(D,"receiveShadow",F.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(hi.envMap.value=Pe,hi.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&z.environment!==null&&(hi.envMapIntensity.value=z.environmentIntensity),Zn&&(Ot.setValue(D,"toneMappingExposure",x.toneMappingExposure),$e.needsLights&&Ut(hi,aa),fe&&Y.fog===!0&&q.refreshFogUniforms(hi,fe),q.refreshMaterialUniforms(hi,Y,k,H,p.state.transmissionRenderTarget[E.id]),pc.upload(D,Rt($e),hi,J)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(pc.upload(D,Rt($e),hi,J),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ot.setValue(D,"center",F.center),Ot.setValue(D,"modelViewMatrix",F.modelViewMatrix),Ot.setValue(D,"normalMatrix",F.normalMatrix),Ot.setValue(D,"modelMatrix",F.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const En=Y.uniformsGroups;for(let Vn=0,su=En.length;Vn<su;Vn++){const cs=En[Vn];I.update(cs,jn),I.bind(cs,jn)}}return jn}function Ut(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function Tn(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,z,$){const Y=N.get(E);Y.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),N.get(E.texture).__webglTexture=z,N.get(E.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:$,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,z){const $=N.get(E);$.__webglFramebuffer=z,$.__useDefaultFramebuffer=z===void 0};const fi=D.createFramebuffer();this.setRenderTarget=function(E,z=0,$=0){C=E,A=z,T=$;let Y=!0,F=null,fe=!1,we=!1;if(E){const Pe=N.get(E);if(Pe.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(D.FRAMEBUFFER,null),Y=!1;else if(Pe.__webglFramebuffer===void 0)J.setupRenderTarget(E);else if(Pe.__hasExternalTextures)J.rebindTextures(E,N.get(E.texture).__webglTexture,N.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ze=E.depthTexture;if(Pe.__boundDepthTexture!==ze){if(ze!==null&&N.has(ze)&&(E.width!==ze.image.width||E.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(E)}}const Ve=E.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(we=!0);const qe=N.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(qe[z])?F=qe[z][$]:F=qe[z],fe=!0):E.samples>0&&J.useMultisampledRTT(E)===!1?F=N.get(E).__webglMultisampledFramebuffer:Array.isArray(qe)?F=qe[$]:F=qe,P.copy(E.viewport),U.copy(E.scissor),B=E.scissorTest}else P.copy(pe).multiplyScalar(k).floor(),U.copy(Fe).multiplyScalar(k).floor(),B=Ye;if($!==0&&(F=fi),be.bindFramebuffer(D.FRAMEBUFFER,F)&&Y&&be.drawBuffers(E,F),be.viewport(P),be.scissor(U),be.setScissorTest(B),fe){const Pe=N.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+z,Pe.__webglTexture,$)}else if(we){const Pe=N.get(E.texture),Ve=z;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Pe.__webglTexture,$,Ve)}else if(E!==null&&$!==0){const Pe=N.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Pe.__webglTexture,$)}b=-1},this.readRenderTargetPixels=function(E,z,$,Y,F,fe,we,Ne=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=N.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(Pe=Pe[we]),Pe){be.bindFramebuffer(D.FRAMEBUFFER,Pe);try{const Ve=E.textures[Ne],qe=Ve.format,ze=Ve.type;if(!G.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!G.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-Y&&$>=0&&$<=E.height-F&&(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ne),D.readPixels(z,$,Y,F,ge.convert(qe),ge.convert(ze),fe))}finally{const Ve=C!==null?N.get(C).__webglFramebuffer:null;be.bindFramebuffer(D.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(E,z,$,Y,F,fe,we,Ne=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=N.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&we!==void 0&&(Pe=Pe[we]),Pe)if(z>=0&&z<=E.width-Y&&$>=0&&$<=E.height-F){be.bindFramebuffer(D.FRAMEBUFFER,Pe);const Ve=E.textures[Ne],qe=Ve.format,ze=Ve.type;if(!G.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Qe),D.bufferData(D.PIXEL_PACK_BUFFER,fe.byteLength,D.STREAM_READ),E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ne),D.readPixels(z,$,Y,F,ge.convert(qe),ge.convert(ze),0);const Et=C!==null?N.get(C).__webglFramebuffer:null;be.bindFramebuffer(D.FRAMEBUFFER,Et);const Gt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Gx(D,Gt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Qe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,fe),D.deleteBuffer(Qe),D.deleteSync(Gt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,z=null,$=0){const Y=Math.pow(2,-$),F=Math.floor(E.image.width*Y),fe=Math.floor(E.image.height*Y),we=z!==null?z.x:0,Ne=z!==null?z.y:0;J.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,$,0,0,we,Ne,F,fe),be.unbindTexture()};const en=D.createFramebuffer(),tn=D.createFramebuffer();this.copyTextureToTexture=function(E,z,$=null,Y=null,F=0,fe=null){fe===null&&(F!==0?(wo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),fe=F,F=0):fe=0);let we,Ne,Pe,Ve,qe,ze,Qe,Et,Gt;const Ft=E.isCompressedTexture?E.mipmaps[fe]:E.image;if($!==null)we=$.max.x-$.min.x,Ne=$.max.y-$.min.y,Pe=$.isBox3?$.max.z-$.min.z:1,Ve=$.min.x,qe=$.min.y,ze=$.isBox3?$.min.z:0;else{const di=Math.pow(2,-F);we=Math.floor(Ft.width*di),Ne=Math.floor(Ft.height*di),E.isDataArrayTexture?Pe=Ft.depth:E.isData3DTexture?Pe=Math.floor(Ft.depth*di):Pe=1,Ve=0,qe=0,ze=0}Y!==null?(Qe=Y.x,Et=Y.y,Gt=Y.z):(Qe=0,Et=0,Gt=0);const Ct=ge.convert(z.format),$e=ge.convert(z.type);let kt;z.isData3DTexture?(J.setTexture3D(z,0),kt=D.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(J.setTexture2DArray(z,0),kt=D.TEXTURE_2D_ARRAY):(J.setTexture2D(z,0),kt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,z.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,z.unpackAlignment);const _t=D.getParameter(D.UNPACK_ROW_LENGTH),jn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),qs=D.getParameter(D.UNPACK_SKIP_PIXELS),Zn=D.getParameter(D.UNPACK_SKIP_ROWS),aa=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ft.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ft.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ve),D.pixelStorei(D.UNPACK_SKIP_ROWS,qe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ze);const Ot=E.isDataArrayTexture||E.isData3DTexture,hi=z.isDataArrayTexture||z.isData3DTexture;if(E.isDepthTexture){const di=N.get(E),En=N.get(z),Vn=N.get(di.__renderTarget),su=N.get(En.__renderTarget);be.bindFramebuffer(D.READ_FRAMEBUFFER,Vn.__webglFramebuffer),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,su.__webglFramebuffer);for(let cs=0;cs<Pe;cs++)Ot&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,N.get(E).__webglTexture,F,ze+cs),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,N.get(z).__webglTexture,fe,Gt+cs)),D.blitFramebuffer(Ve,qe,we,Ne,Qe,Et,we,Ne,D.DEPTH_BUFFER_BIT,D.NEAREST);be.bindFramebuffer(D.READ_FRAMEBUFFER,null),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||N.has(E)){const di=N.get(E),En=N.get(z);be.bindFramebuffer(D.READ_FRAMEBUFFER,en),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,tn);for(let Vn=0;Vn<Pe;Vn++)Ot?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,di.__webglTexture,F,ze+Vn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,di.__webglTexture,F),hi?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,En.__webglTexture,fe,Gt+Vn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,En.__webglTexture,fe),F!==0?D.blitFramebuffer(Ve,qe,we,Ne,Qe,Et,we,Ne,D.COLOR_BUFFER_BIT,D.NEAREST):hi?D.copyTexSubImage3D(kt,fe,Qe,Et,Gt+Vn,Ve,qe,we,Ne):D.copyTexSubImage2D(kt,fe,Qe,Et,Ve,qe,we,Ne);be.bindFramebuffer(D.READ_FRAMEBUFFER,null),be.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else hi?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(kt,fe,Qe,Et,Gt,we,Ne,Pe,Ct,$e,Ft.data):z.isCompressedArrayTexture?D.compressedTexSubImage3D(kt,fe,Qe,Et,Gt,we,Ne,Pe,Ct,Ft.data):D.texSubImage3D(kt,fe,Qe,Et,Gt,we,Ne,Pe,Ct,$e,Ft):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,fe,Qe,Et,we,Ne,Ct,$e,Ft.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,fe,Qe,Et,Ft.width,Ft.height,Ct,Ft.data):D.texSubImage2D(D.TEXTURE_2D,fe,Qe,Et,we,Ne,Ct,$e,Ft);D.pixelStorei(D.UNPACK_ROW_LENGTH,_t),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,jn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,qs),D.pixelStorei(D.UNPACK_SKIP_ROWS,Zn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,aa),fe===0&&z.generateMipmaps&&D.generateMipmap(kt),be.unbindTexture()},this.copyTextureToTexture3D=function(E,z,$=null,Y=null,F=0){return wo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,z,$,Y,F)},this.initRenderTarget=function(E){N.get(E).__webglFramebuffer===void 0&&J.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?J.setTextureCube(E,0):E.isData3DTexture?J.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?J.setTexture2DArray(E,0):J.setTexture2D(E,0),be.unbindTexture()},this.resetState=function(){A=0,T=0,C=null,be.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}}let Fr=null,em=null,uo=null,Vu=null,Hu=null,Gu=null;function WT(){return Fr=new gv,Fr.background=null,em=new Kv(4210752,.6),Fr.add(em),uo=new dc(16777215,1),uo.position.set(5,5,5),uo.castShadow=!0,uo.shadow.mapSize.width=2048,uo.shadow.mapSize.height=2048,Fr.add(uo),Vu=new dc(16777215,.5),Vu.position.set(-5,3,5),Fr.add(Vu),Hu=new dc(16777215,.3),Hu.position.set(0,-5,5),Fr.add(Hu),Gu=new zg(16777215,.8,100),Gu.position.set(0,0,10),Fr.add(Gu),Fr}let Wu=null;function XT(){const r=window.innerWidth,e=window.innerHeight;return Wu=new Nn(18,r/e,.1,1e3),Wu.position.set(0,0,33.6),Wu}let gs=null,tm=null,nm=null;function YT(r){const e=window.innerWidth,t=window.innerHeight;return gs=new GT({canvas:r,alpha:!0,antialias:!0}),gs.setSize(e,t),gs.setClearColor(0,0),gs.setSize(e,t),gs.setPixelRatio(Math.min(window.devicePixelRatio,2)),gs.setClearColor(0,0),gs}function qT(){return tm=new Er(window.innerWidth*Math.min(window.devicePixelRatio,2),window.innerHeight*Math.min(window.devicePixelRatio,2)),nm=new Er(window.innerWidth*Math.min(window.devicePixelRatio,2),window.innerHeight*Math.min(window.devicePixelRatio,2)),{mainRenderTarget:tm,backRenderTarget:nm}}const yo={mobile:{start:{x:.4,y:.5,z:0,scale:1.5},target:{x:-.89,y:.9,z:0,scale:.135}},tablet:{start:{x:.6,y:-.1,z:0,scale:2.8},target:{x:-.7,y:.7,z:0,scale:.3}},desktop:{start:{x:.55,y:-.15,z:0,scale:3},target:{x:-.94,y:.81,z:0,scale:.235}}},Yg={mobile:{initialSpacing:60,outwardFactor:2.2,finalFactor:3.4,levels:4,svgSizeMultiplier:1.8,lineWidth:1.5,lineColor:"#F2F2F2",lineOpacity:.8},tablet:{initialSpacing:55,outwardFactor:2,finalFactor:3.2,levels:4,svgSizeMultiplier:1.7,lineWidth:1.5,lineColor:"#F2F2F2",lineOpacity:.8},desktop:{initialSpacing:80,outwardFactor:1.9,finalFactor:3,levels:4,svgSizeMultiplier:1.6,lineWidth:.5,lineColor:"#F2F2F2",lineOpacity:.25}},tt={lineStagger:.02,lineDrawSingle:4.25,drawVerticalLinesTotal:2,drawVerticalLinesOffset:0,drawHorizontalLinesTotal:2,drawHorizontalLinesOffset:-1,outward:5.75,delayAfterGridDraw:3,delayAfterRotation:2,delayAfterRotationOLDNOW:0,delayBeforeTitle:0,titleWipeDuration:1.75,delayBeforeFirstBlock:6,blockGap:10.25,delayBeforeUnpin:1,fadeOutDelay:4,fadeOutDuration:5,rectDraw:2.25,rectFillFade:.7,highlightExpand:1.22,labelReveal:1.05,highlightShrink:1.22,amountDelayAfterLabel:2.5,amountAppear:2.15,amountCount:7},Ro={mobile:{enabled:!1,sizeFactor:.45,cornerRadiusFactor:.1,pattern:"none",cells:[],sizeFactorOutStart:void 0,sizeFactorOutEnd:void 0,sizeFactorFinalStart:void 0,sizeFactorFinalEnd:void 0,positionOutMultiplierStart:1,positionOutMultiplierEnd:1,positionFinalMultiplierStart:1,positionFinalMultiplierEnd:1,amount:{},label:{rotateDeg:void 0,padRight:void 0,padTop:void 0,padBottom:void 0}},tablet:{enabled:!1,sizeFactor:.48,cornerRadiusFactor:.18,pattern:"none",cells:[],sizeFactorOutStart:void 0,sizeFactorOutEnd:void 0,sizeFactorFinalStart:void 0,sizeFactorFinalEnd:void 0,positionOutMultiplierStart:1,positionOutMultiplierEnd:1,positionFinalMultiplierStart:1,positionFinalMultiplierEnd:1,amount:{},label:{rotateDeg:void 0,padRight:void 0,padTop:void 0,padBottom:void 0}},desktop:{enabled:!0,sizeFactor:1,cornerRadiusFactor:.1,pattern:"checker",cells:[[-2,0],[-1,0],[1,-1],[0,-2]],sizeFactorOutStart:1,sizeFactorOutEnd:1.4,sizeFactorFinalStart:1,sizeFactorFinalEnd:1,positionOutMultiplierStart:1,positionOutMultiplierEnd:1.5265,positionFinalMultiplierStart:1,positionFinalMultiplierEnd:1,rectDefaults:{gradientStart:"rgba(109, 62, 88, 0.0)",gradientEnd:"rgba(109, 62, 88, 0.8)",gradientAngle:45,strokeColor:"#FFFFFF",strokeOpacity:.38,strokeWidth:1,rxOverride:15},amount:{text:"$700M+",color:"rgba(255, 255, 255, 0.75)",fontFamily:"Roboto Mono, monospace",fontSize:36,fontWeight:"300",letterSpacing:1.44,center:!0,anchor:"middle",baseline:"middle",centerOffsetX:70,centerOffsetY:65,rotateDeg:-45},label:{text:"LOAN VOLUME",color:"#FFFFFF",opacity:.5,fontFamily:"Satoshi Variable, sans-serif",fontSize:16,fontWeight:"500",padLeft:200,padBottom:void 0,padRight:void 0,padTop:180,rotateDeg:-90,anchor:"start",baseline:"alphabetic"},blocks:[{amount:{text:"$700M+"},label:{text:"LOAN VOLUME"},rect:{}},{amount:{text:"73,000"},label:{text:"LOANS"},rect:{gradientStart:"rgba(139, 103, 76, 0.10)",gradientEnd:"rgba(139, 103, 76, 0.80)",gradientAngle:45}},{amount:{text:"$20,000"},label:{text:"AVERAGE LOAN"},rect:{gradientStart:"rgba(72, 55, 65, 0.10)",gradientEnd:"rgba(72, 55, 65, 0.80)",gradientAngle:45}},{amount:{text:"May 2020"},label:{text:"RUNNING SAFE SINCE"},rect:{}}]}},qg={pxPerSecond:100},mc={pxPerSecond:100,durationVh:600},gc={mobile:{width:600,height:560,left:"50%",top:"50%",xPercent:-50,yPercent:-50},tablet:{width:740,height:700,left:"50%",top:"50%",xPercent:-50,yPercent:-50},desktop:{width:680,height:620,left:"50%",top:"50%",xPercent:-20,yPercent:-43}},kr=20,xt={svg:{mobile:{x:-1500,scale:.5,transformOrigin:"0% 0%"},tablet:{x:-1500,scale:.5,transformOrigin:"0% 0%"},desktop:{x:0,scale:.325,transformOrigin:"-4% 3%"}},sequence:{yIn:-800,yOut:0,stagger:3.12,introDuration:10.5,outroDuration:10.5,riseDuration:2,holdDefault:6,returnDuration:2,baseStagger:.35,groupGap:1,jitterMax:.25},targets:{groupBaseHeight:kr,detail:[{id:"#animate-1stbox",group:"boxes",maxY:kr+50},{id:"#animate-2ndbox",group:"boxes",maxY:kr+70},{id:"#animate-2ndbox-button",group:"boxes",maxY:40},{id:"#animate-3rdbox",group:"boxes",maxY:kr+45},{id:"#animate-3rdbox-button",group:"boxes",maxY:30},{id:"#animate-4thbox",group:"boxes",maxY:kr+40},{id:"#animate-5thbox",group:"boxes",maxY:kr+50},{id:"#animate-6thbox",group:"boxes",maxY:kr+20},{id:"#animate-primary-btn",group:"table",maxY:20},{id:"#animate-1st-row",group:"table",maxY:50},{id:"#animate-2nd-row",group:"table",maxY:40},{id:"#animate-3rd-row",group:"table",maxY:30},{id:"#animate-4th-row",group:"table",maxY:20},{id:"#animate-Collateral-distribution",group:"donut",maxY:30},{id:"#animate-Currency-distribution",group:"donut",maxY:50},{id:"#animate-Protocol-distribution",group:"donut",maxY:70},{id:"#animate-pie1-animate-Collateral-distribution",group:"donut",maxY:20},{id:"#animate-pie2-animate-Collateral-distribution",group:"donut",maxY:40},{id:"#animate-pie3-animate-Collateral-distribution",group:"donut",maxY:60},{id:"#animate-pie4-animate-Collateral-distribution",group:"donut",maxY:80},{id:"#animate-pie5-animate-Collateral-distribution",group:"donut",maxY:100},{id:"#animate-pie1-animate-Currency-distribution",group:"donut",maxY:80},{id:"#animate-pie2-animate-Currency-distribution",group:"donut",maxY:120},{id:"#animate-pie3-animate-Currency-distribution",group:"donut",maxY:60},{id:"#animate-pie1-Protocol-distribution",group:"donut",maxY:10},{id:"#animate-pie2-Protocol-distribution",group:"donut",maxY:30},{id:"#animate-pie3-Protocol-distribution",group:"donut",maxY:50},{id:"#animate-pie4-Protocol-distribution",group:"donut",maxY:70},{id:"#animate-pie5-Protocol-distribution",group:"donut",maxY:90}],ids:["#animate-1stbox","#animate-2ndbox","#animate-3rdbox","#animate-4thbox","#animate-5thbox","#animate-6thbox"],bubbles:{parentId:"#animate-bubble",startWindowSec:1.25,holdMinSec:4,holdMaxSec:8,returnWindowSec:1.25,minRange:12,maxRange:120,extraIds:["#animate-Chart/Legend/Item1","#animate-Chart/Legend/Item2","#animate-Chart/Legend/Item3","#animate-Chart/Legend/Item4","#bubble-chart-all","#animate-legend2"]}}},$T={mobile:{x:-3.5,y:5.6,z:-6},tablet:{x:-10,y:4.8,z:-6.5},desktop:{x:-11.15,y:5.35,z:-7}},er={startScale:3,scrubDuration:1,floatAmplitude:.3,floatSpeed:.8,spinIntensity:.05,spinDecay:.1},_n={uIorR:1.15,uIorY:1.16,uIorG:1.18,uIorC:1.22,uIorB:1.22,uIorP:1.22,uSaturation:1.01,uChromaticAberration:.28,uRefractPower:.5,uFresnelPower:12.7,uShininess:28.2,uDiffuseness:.07,uLight:new V(-1.3,1.5,-.6),winResolution:new pt(window.innerWidth*Math.min(window.devicePixelRatio,2),window.innerHeight*Math.min(window.devicePixelRatio,2)),uTexture:null},xn={mouseDecayRate:.98,xRotationRate:{base:.2,modulation:.15,frequency:.1,mouseInfluenceUp:.15,mouseInfluenceDown:.1},yRotationRate:{base:.3,modulation:.2,frequency:.08,mouseInfluenceLeft:.2,mouseInfluenceRight:.15},zRotationRate:{base:.15,modulation:.1,frequency:.12}},KT=Object.freeze(Object.defineProperty({__proto__:null,ANIMATION_CONFIG:xn,ANIMATION_STATES:yo,GRID_STATES:Yg,GROUP_BASE_HEIGHT:kr,LOOPER_BG:gc,MODEL_CONFIG:er,RECT_STATES:Ro,SECTION2_SCROLL:qg,SECTION2_TIMINGS:tt,SECTION3:xt,SECTION3_SCROLL:mc,SHADER_DEFAULTS:_n,WHITE_SPHERE_POSITIONS:$T},Symbol.toStringTag,{value:"Module"}));let So=null,es=null,Ii=null,qo=null,$o=null,Na=null;function jT(){const r=document.getElementById("three-canvas");So=WT(),es=XT(),Ii=YT(r);const e=qT();return qo=e.mainRenderTarget,$o=e.backRenderTarget,Na={uIorR:{value:_n.uIorR},uIorY:{value:_n.uIorY},uIorG:{value:_n.uIorG},uIorC:{value:_n.uIorC},uIorB:{value:_n.uIorB},uIorP:{value:_n.uIorP},uSaturation:{value:_n.uSaturation},uChromaticAberration:{value:_n.uChromaticAberration},uRefractPower:{value:_n.uRefractPower},uFresnelPower:{value:_n.uFresnelPower},uShininess:{value:_n.uShininess},uDiffuseness:{value:_n.uDiffuseness},uLight:{value:_n.uLight.clone()},winResolution:{value:_n.winResolution.clone()},uTexture:{value:_n.uTexture}},{scene:So,camera:es,renderer:Ii,mainRenderTarget:qo,backRenderTarget:$o,uniforms:Na}}function ZT(){if(es){const r=window.innerWidth,e=window.innerHeight;es.aspect=r/e,es.updateProjectionMatrix()}if(Ii){const r=window.innerWidth,e=window.innerHeight;Ii.setSize(r,e),Ii.setPixelRatio(Math.min(window.devicePixelRatio,2))}if(qo&&$o){const r=window.innerWidth*Math.min(window.devicePixelRatio,2),e=window.innerHeight*Math.min(window.devicePixelRatio,2);qo.setSize(r,e),$o.setSize(r,e)}Na&&Na.winResolution&&Na.winResolution.value.set(window.innerWidth*Math.min(window.devicePixelRatio,2),window.innerHeight*Math.min(window.devicePixelRatio,2))}const JT="modulepreload",QT=function(r){return"/"+r},im={},_c=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let c=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var o=c;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");i=c(t.map(u=>{if(u=QT(u),u in im)return;im[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":JT,f||(d.as="script"),d.crossOrigin="",d.href=u,l&&d.setAttribute("nonce",l),document.head.appendChild(d),f)return new Promise((g,_)=>{d.addEventListener("load",g),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return i.then(a=>{for(const l of a||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})};function hr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function $g(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var li={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ko={duration:.5,overwrite:!1,delay:0},id,pn,Bt,Ti=1e8,Lt=1/Ti,th=Math.PI*2,eE=th/4,tE=0,Kg=Math.sqrt,nE=Math.cos,iE=Math.sin,fn=function(e){return typeof e=="string"},Xt=function(e){return typeof e=="function"},Ar=function(e){return typeof e=="number"},rd=function(e){return typeof e>"u"},tr=function(e){return typeof e=="object"},Wn=function(e){return e!==!1},sd=function(){return typeof window<"u"},Hl=function(e){return Xt(e)||fn(e)},jg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},bn=Array.isArray,nh=/(?:-?\.?\d|\.)+/gi,Zg=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Mo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Xu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Jg=/[+-]=-?[.\d]+/,Qg=/[^,'"\[\]\s]+/gi,rE=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,zt,Vi,ih,od,ci={},Fc={},e_,t_=function(e){return(Fc=jo(e,ci))&&$n},ad=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},el=function(e,t){return!t&&console.warn(e)},n_=function(e,t){return e&&(ci[e]=t)&&Fc&&(Fc[e]=t)||ci},tl=function(){return 0},sE={suppressEvents:!0,isStart:!0,kill:!1},xc={suppressEvents:!0,kill:!1},oE={suppressEvents:!0},ld={},ts=[],rh={},i_,ii={},Yu={},rm=30,vc=[],cd="",ud=function(e){var t=e[0],n,i;if(tr(t)||Xt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=vc.length;i--&&!vc[i].targetTest(t););n=vc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new A_(e[i],n)))||e.splice(i,1);return e},Ls=function(e){return e._gsap||ud(Ei(e))[0]._gsap},r_=function(e,t,n){return(n=e[t])&&Xt(n)?e[t]():rd(n)&&e.getAttribute&&e.getAttribute(t)||n},Xn=function(e,t){return(e=e.split(",")).forEach(t)||e},qt=function(e){return Math.round(e*1e5)/1e5||0},Jt=function(e){return Math.round(e*1e7)/1e7||0},Co=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},aE=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Oc=function(){var e=ts.length,t=ts.slice(0),n,i;for(rh={},ts.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},fd=function(e){return!!(e._initted||e._startAt||e.add)},s_=function(e,t,n,i){ts.length&&!pn&&Oc(),e.render(t,n,!!(pn&&t<0&&fd(e))),ts.length&&!pn&&Oc()},o_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Qg).length<2?t:fn(e)?e.trim():e},a_=function(e){return e},ui=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},lE=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},jo=function(e,t){for(var n in t)e[n]=t[n];return e},sm=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=tr(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Bc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ua=function(e){var t=e.parent||zt,n=e.keyframes?lE(bn(e.keyframes)):ui;if(Wn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},cE=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},l_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},eu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},rs=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Is=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},uE=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},sh=function(e,t,n,i){return e._startAt&&(pn?e._startAt.revert(xc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},fE=function r(e){return!e||e._ts&&r(e.parent)},om=function(e){return e._repeat?Zo(e._tTime,e=e.duration()+e._rDelay)*e:0},Zo=function(e,t){var n=Math.floor(e=Jt(e/t));return e&&n===e?n-1:n},kc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},tu=function(e){return e._end=Jt(e._start+(e._tDur/Math.abs(e._ts||e._rts||Lt)||0))},nu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Jt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),tu(e),n._dirty||Is(n,e)),e},c_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=kc(e.rawTime(),t),(!t._dur||pl(0,t.totalDuration(),n)-t._tTime>Lt)&&t.render(n,!0)),Is(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Lt}},Xi=function(e,t,n,i){return t.parent&&rs(t),t._start=Jt((Ar(n)?n:n||e!==zt?gi(e,n,t):e._time)+t._delay),t._end=Jt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),l_(e,t,"_first","_last",e._sort?"_start":0),oh(t)||(e._recent=t),i||c_(e,t),e._ts<0&&nu(e,e._tTime),e},u_=function(e,t){return(ci.ScrollTrigger||ad("scrollTrigger",t))&&ci.ScrollTrigger.create(t,e)},f_=function(e,t,n,i,s){if(dd(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!pn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&i_!==si.frame)return ts.push(e),e._lazy=[s,i],1},hE=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},oh=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},dE=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&hE(e)&&!(!e._initted&&oh(e))||(e._ts<0||e._dp._ts<0)&&!oh(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=pl(0,e._tDur,t),u=Zo(l,a),e._yoyo&&u&1&&(o=1-o),u!==Zo(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||pn||i||e._zTime===Lt||!t&&e._zTime){if(!e._initted&&f_(e,t,i,n,l))return;for(f=e._zTime,e._zTime=t||(n?Lt:0),n||(n=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&sh(e,t,n,!0),e._onUpdate&&!n&&ai(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ai(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&rs(e,1),!n&&!pn&&(ai(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},pE=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Jo=function(e,t,n,i){var s=e._repeat,o=Jt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Jt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&nu(e,e._tTime=e._tDur*a),e.parent&&tu(e),n||Is(e.parent,e),e},am=function(e){return e instanceof Un?Is(e):Jo(e,e._dur)},mE={_start:0,endTime:tl,totalDuration:tl},gi=function r(e,t,n){var i=e.labels,s=e._recent||mE,o=e.duration()>=Ti?s.endTime(!1):e._dur,a,l,c;return fn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(bn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Fa=function(e,t,n){var i=Ar(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Wn(l.vars.inherit)&&l.parent;o.immediateRender=Wn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Zt(t[0],o,t[s+1])},ls=function(e,t){return e||e===0?t(e):t},pl=function(e,t,n){return n<e?e:n>t?t:n},Sn=function(e,t){return!fn(e)||!(t=rE.exec(e))?"":t[1]},gE=function(e,t,n){return ls(n,function(i){return pl(e,t,i)})},ah=[].slice,h_=function(e,t){return e&&tr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&tr(e[0]))&&!e.nodeType&&e!==Vi},_E=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return fn(i)&&!t||h_(i,1)?(s=n).push.apply(s,Ei(i)):n.push(i)})||n},Ei=function(e,t,n){return Bt&&!t&&Bt.selector?Bt.selector(e):fn(e)&&!n&&(ih||!Qo())?ah.call((t||od).querySelectorAll(e),0):bn(e)?_E(e,n):h_(e)?ah.call(e,0):e?[e]:[]},lh=function(e){return e=Ei(e)[0]||el("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Ei(t,n.querySelectorAll?n:n===e?el("Invalid scope")||od.createElement("div"):e)}},d_=function(e){return e.sort(function(){return .5-Math.random()})},p_=function(e){if(Xt(e))return e;var t=tr(e)?e:{each:e},n=Ns(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,f=i;return fn(i)?u=f={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],f=i[1]),function(h,d,g){var _=(g||t).length,m=o[_],p,M,y,x,w,A,T,C,b;if(!m){if(b=t.grid==="auto"?0:(t.grid||[1,Ti])[1],!b){for(T=-Ti;T<(T=g[b++].getBoundingClientRect().left)&&b<_;);b<_&&b--}for(m=o[_]=[],p=l?Math.min(b,_)*u-.5:i%b,M=b===Ti?0:l?_*f/b-.5:i/b|0,T=0,C=Ti,A=0;A<_;A++)y=A%b-p,x=M-(A/b|0),m[A]=w=c?Math.abs(c==="y"?x:y):Kg(y*y+x*x),w>T&&(T=w),w<C&&(C=w);i==="random"&&d_(m),m.max=T-C,m.min=C,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(b>_?_-1:c?c==="y"?_/b:b:Math.max(b,_/b))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=Sn(t.amount||t.each)||0,n=n&&_<0?T_(n):n}return _=(m[h]-m.min)/m.max||0,Jt(m.b+(n?n(_):_)*m.v)+m.u}},ch=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Jt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Ar(n)?0:Sn(n))}},m_=function(e,t){var n=bn(e),i,s;return!n&&tr(e)&&(i=n=e.radius||Ti,e.values?(e=Ei(e.values),(s=!Ar(e[0]))&&(i*=i)):e=ch(e.increment)),ls(t,n?Xt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ti,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!i||c<=i?e[u]:o,s||u===o||Ar(o)?u:u+Sn(o)}:ch(e))},g_=function(e,t,n,i){return ls(bn(e)?!t:n===!0?!!(n=0):!i,function(){return bn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},xE=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},vE=function(e,t){return function(n){return e(parseFloat(n))+(t||Sn(n))}},yE=function(e,t,n){return x_(e,t,0,1,n)},__=function(e,t,n){return ls(n,function(i){return e[~~t(i)]})},SE=function r(e,t,n){var i=t-e;return bn(e)?__(e,r(0,e.length),t):ls(n,function(s){return(i+(s-e)%i)%i+e})},ME=function r(e,t,n){var i=t-e,s=i*2;return bn(e)?__(e,r(0,e.length-1),t):ls(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},nl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?Qg:nh),n+=e.substr(t,i-t)+g_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},x_=function(e,t,n,i,s){var o=t-e,a=i-n;return ls(s,function(l){return n+((l-e)/o*a||0)})},bE=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=fn(e),a={},l,c,u,f,h;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(bn(e)&&!bn(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(r(e[c-1],e[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},n=t}else i||(e=jo(bn(e)?[]:{},e));if(!u){for(l in t)hd.call(a,e,l,"get",t[l]);s=function(g){return gd(g,a)||(o?e.p:e)}}}return ls(n,s)},lm=function(e,t,n){var i=e.labels,s=Ti,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},ai=function(e,t,n){var i=e.vars,s=i[t],o=Bt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&ts.length&&Oc(),a&&(Bt=a),u=l?s.apply(c,l):s.call(c),Bt=o,u},ba=function(e){return rs(e),e.scrollTrigger&&e.scrollTrigger.kill(!!pn),e.progress()<1&&ai(e,"onInterrupt"),e},bo,v_=[],y_=function(e){if(e)if(e=!e.name&&e.default||e,sd()||e.headless){var t=e.name,n=Xt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:tl,render:gd,add:hd,kill:kE,modifier:BE,rawVars:0},o={targetTest:0,get:0,getSetter:md,aliases:{},register:0};if(Qo(),e!==i){if(ii[t])return;ui(i,ui(Bc(e,s),o)),jo(i.prototype,jo(s,Bc(e,o))),ii[i.prop=t]=i,e.targetTest&&(vc.push(i),ld[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}n_(t,i),e.register&&e.register($n,i,Yn)}else v_.push(e)},Dt=255,Ta={aqua:[0,Dt,Dt],lime:[0,Dt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Dt],navy:[0,0,128],white:[Dt,Dt,Dt],olive:[128,128,0],yellow:[Dt,Dt,0],orange:[Dt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Dt,0,0],pink:[Dt,192,203],cyan:[0,Dt,Dt],transparent:[Dt,Dt,Dt,0]},qu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Dt+.5|0},S_=function(e,t,n){var i=e?Ar(e)?[e>>16,e>>8&Dt,e&Dt]:0:Ta.black,s,o,a,l,c,u,f,h,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ta[e])i=Ta[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Dt,i&Dt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Dt,e&Dt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(nh),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=qu(l+1/3,s,o),i[1]=qu(l,s,o),i[2]=qu(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(Zg),n&&i.length<4&&(i[3]=1),i}else i=e.match(nh)||Ta.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/Dt,o=i[1]/Dt,a=i[2]/Dt,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},M_=function(e){var t=[],n=[],i=-1;return e.split(ns).forEach(function(s){var o=s.match(Mo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},cm=function(e,t,n){var i="",s=(e+i).match(ns),o=t?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=S_(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=M_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(ns,"1").split(Mo),f=c.length-1;a<f;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(ns),f=c.length-1;a<f;a++)i+=c[a]+s[a];return i+c[f]},ns=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ta)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),TE=/hsl[a]?\(/,b_=function(e){var t=e.join(" "),n;if(ns.lastIndex=0,ns.test(t))return n=TE.test(t),e[1]=cm(e[1],n),e[0]=cm(e[0],n,M_(e[1])),!0},il,si=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function _(m){var p=r()-i,M=m===!0,y,x,w,A;if((p>e||p<0)&&(n+=p-t),i+=p,w=i-n,y=w-o,(y>0||M)&&(A=++f.frame,h=w-f.time*1e3,f.time=w=w/1e3,o+=y+(y>=s?4:s-y),x=1),M||(l=c(_)),x)for(d=0;d<a.length;d++)a[d](w,h,A,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){e_&&(!ih&&sd()&&(Vi=ih=window,od=Vi.document||{},ci.gsap=$n,(Vi.gsapVersions||(Vi.gsapVersions=[])).push($n.version),t_(Fc||Vi.GreenSockGlobals||!Vi.gsap&&Vi||{}),v_.forEach(y_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},il=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),il=0,c=tl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,M){var y=p?function(x,w,A,T){m(x,w,A,T),f.remove(y)}:m;return f.remove(m),a[M?"unshift":"push"](y),Qo(),y},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f}(),Qo=function(){return!il&&si.wake()},mt={},EE=/^[\d.\-M][\d.\-,\s]/,wE=/["']/g,AE=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(wE,"").trim():+c,i=l.substr(a+1).trim();return t},RE=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},CE=function(e){var t=(e+"").split("("),n=mt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[AE(t[1])]:RE(e).split(",").map(o_)):mt._CE&&EE.test(e)?mt._CE("",e):n},T_=function(e){return function(t){return 1-e(1-t)}},E_=function r(e,t){for(var n=e._first,i;n;)n instanceof Un?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Ns=function(e,t){return e&&(Xt(e)?e:mt[e]||CE(e))||t},Ys=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Xn(e,function(a){mt[a]=ci[a]=s,mt[o=a.toLowerCase()]=n;for(var l in s)mt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=mt[a+"."+l]=s[l]}),s},w_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},$u=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/th*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*iE((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:w_(a);return s=th/s,l.config=function(c,u){return r(e,c,u)},l},Ku=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:w_(n);return i.config=function(s){return r(e,s)},i};Xn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Ys(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});mt.Linear.easeNone=mt.none=mt.Linear.easeIn;Ys("Elastic",$u("in"),$u("out"),$u());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Ys("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Ys("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Ys("Circ",function(r){return-(Kg(1-r*r)-1)});Ys("Sine",function(r){return r===1?1:-nE(r*eE)+1});Ys("Back",Ku("in"),Ku("out"),Ku());mt.SteppedEase=mt.steps=ci.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-Lt;return function(a){return((i*pl(0,o,a)|0)+s)*n}}};Ko.ease=mt["quad.out"];Xn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return cd+=r+","+r+"Params,"});var A_=function(e,t){this.id=tE++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:r_,this.set=t?t.getSetter:md},rl=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Jo(this,+t.duration,1,1),this.data=t.data,Bt&&(this._ctx=Bt,Bt.data.push(this)),il||si.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Jo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Qo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(nu(this,n),!s._dp||s.parent||c_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Xi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Lt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),s_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+om(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+om(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Zo(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Lt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?kc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Lt?0:this._rts,this.totalTime(pl(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),tu(this),uE(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Qo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Lt&&(this._tTime-=Lt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Xi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Wn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?kc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=oE);var i=pn;return pn=n,fd(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),pn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,am(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,am(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(gi(this,n),Wn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Wn(i)),this._dur||(this._zTime=-Lt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Lt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Lt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Lt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Xt(n)?n:a_,a=function(){var c=i.then;i.then=null,Xt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){ba(this)},r}();ui(rl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Lt,_prom:0,_ps:!1,_rts:1});var Un=function(r){$g(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Wn(n.sortChildren),zt&&Xi(n.parent||zt,hr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&u_(hr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Fa(0,arguments,this),this},t.from=function(i,s,o){return Fa(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Fa(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Ua(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Zt(i,s,gi(this,o),1),this},t.call=function(i,s,o){return Xi(this,Zt.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Zt(i,o,gi(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Ua(o).immediateRender=Wn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,f){return a.startAt=o,Ua(a).immediateRender=Wn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,f)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Jt(i),f=this._zTime<0!=i<0&&(this._initted||!c),h,d,g,_,m,p,M,y,x,w,A,T;if(this!==zt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),h=u,x=this._start,y=this._ts,p=!y,f&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(h=Jt(u%m),u===l?(_=this._repeat,h=c):(w=Jt(u/m),_=~~w,_&&_===w&&(h=c,_--),h>c&&(h=c)),w=Zo(this._tTime,m),!a&&this._tTime&&w!==_&&this._tTime-w*m-this._dur<=0&&(w=_),A&&_&1&&(h=c-h,T=1),_!==w&&!this._lock){var C=A&&w&1,b=C===(A&&_&1);if(_<w&&(C=!C),a=C?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Jt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&ai(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,b&&(this._lock=2,a=C?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;E_(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=pE(this,Jt(a),Jt(h)),M&&(u-=h-(h=M._start))),this._tTime=u,this._time=h,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&u&&!s&&!w&&(ai(this,"onStart"),this._tTime!==u))return this;if(h>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=-Lt);break}}d=g}else{d=this._last;for(var v=i<0?i:h;d;){if(g=d._prev,(d._act||v<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(v-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(v-d._start)*d._ts,s,o||pn&&fd(d)),h!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=v?-Lt:Lt);break}}d=g}}if(M&&!s&&(this.pause(),M.render(h>=a?0:-Lt)._zTime=h>=a?1:-1,this._ts))return this._start=x,tu(this),this.render(i,s,o);this._onUpdate&&!s&&ai(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&rs(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(ai(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Ar(s)||(s=gi(this,s,i)),!(i instanceof rl)){if(bn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(fn(i))return this.addLabel(i,s);if(Xt(i))i=Zt.delayedCall(0,i);else return this}return this!==i?Xi(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ti);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Zt?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return fn(i)?this.removeLabel(i):Xt(i)?this.killTweensOf(i):(i.parent===this&&eu(this,i),i===this._recent&&(this._recent=this._last),Is(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Jt(si.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=gi(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Zt.delayedCall(0,s||tl,o);return a.data="isPause",this._hasPause=1,Xi(this,a,gi(this,i))},t.removePause=function(i){var s=this._first;for(i=gi(this,i);s;)s._start===i&&s.data==="isPause"&&rs(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)qr!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Ei(i),l=this._first,c=Ar(s),u;l;)l instanceof Zt?aE(l._targets,a)&&(c?(!qr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=gi(o,i),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=Zt.to(o,ui({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Lt,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&Jo(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,ui({startAt:{time:gi(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),lm(this,gi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),lm(this,gi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Lt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Is(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Is(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Ti,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Xi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Jo(o,o===zt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(zt._ts&&(s_(zt,kc(i,zt)),i_=si.frame),si.frame>=rm){rm+=li.autoSleep||120;var s=zt._first;if((!s||!s._ts)&&li.autoSleep&&si._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||si.sleep()}}},e}(rl);ui(Un.prototype,{_lock:0,_hasPause:0,_forcing:0});var PE=function(e,t,n,i,s,o,a){var l=new Yn(this._pt,e,t,0,1,I_,null,s),c=0,u=0,f,h,d,g,_,m,p,M;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=nl(i)),o&&(M=[n,i],o(M,e,t),n=M[0],i=M[1]),h=n.match(Xu)||[];f=Xu.exec(i);)g=f[0],_=i.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Co(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=Xu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Jg.test(i)||p)&&(l.e=0),this._pt=l,l},hd=function(e,t,n,i,s,o,a,l,c,u){Xt(i)&&(i=i(s||0,e,o));var f=e[t],h=n!=="get"?n:Xt(f)?c?e[t.indexOf("set")||!Xt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=Xt(f)?c?UE:D_:pd,g;if(fn(i)&&(~i.indexOf("random(")&&(i=nl(i)),i.charAt(1)==="="&&(g=Co(h,i)+(Sn(h)||0),(g||g===0)&&(i=g))),!u||h!==i||uh)return!isNaN(h*i)&&i!==""?(g=new Yn(this._pt,e,t,+h||0,i-(h||0),typeof f=="boolean"?OE:L_,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(t in e)&&ad(t,i),PE.call(this,e,t,h,i,d,l||li.stringFilter,c))},DE=function(e,t,n,i,s){if(Xt(e)&&(e=Oa(e,s,t,n,i)),!tr(e)||e.style&&e.nodeType||bn(e)||jg(e))return fn(e)?Oa(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Oa(e[a],s,t,n,i);return o},R_=function(e,t,n,i,s,o){var a,l,c,u;if(ii[e]&&(a=new ii[e]).init(s,a.rawVars?t[e]:DE(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Yn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==bo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},qr,uh,dd=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,f=i.yoyoEase,h=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,M=p&&p.data==="nested"?p.vars.targets:m,y=e._overwrite==="auto"&&!id,x=e.timeline,w,A,T,C,b,v,P,U,B,W,Z,X,H;if(x&&(!h||!s)&&(s="none"),e._ease=Ns(s,Ko.ease),e._yEase=f?T_(Ns(f===!0?s:f,Ko.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!x&&!!i.runBackwards,!x||h&&!i.stagger){if(U=m[0]?Ls(m[0]).harness:0,X=U&&i[U.prop],w=Bc(i,ld),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?xc:sE),_._lazy=0),o){if(rs(e._startAt=Zt.set(m,ui({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Wn(l),startAt:null,delay:0,onUpdate:c&&function(){return ai(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pn||!a&&!d)&&e._startAt.revert(xc),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),T=ui({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Wn(l),immediateRender:a,stagger:0,parent:p},w),X&&(T[U.prop]=X),rs(e._startAt=Zt.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pn?e._startAt.revert(xc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Lt,Lt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Wn(l)||l&&!g,A=0;A<m.length;A++){if(b=m[A],P=b._gsap||ud(m)[A]._gsap,e._ptLookup[A]=W={},rh[P.id]&&ts.length&&Oc(),Z=M===m?A:M.indexOf(b),U&&(B=new U).init(b,X||w,e,Z,M)!==!1&&(e._pt=C=new Yn(e._pt,b,B.name,0,1,B.render,B,0,B.priority),B._props.forEach(function(k){W[k]=C}),B.priority&&(v=1)),!U||X)for(T in w)ii[T]&&(B=R_(T,w,e,Z,b,M))?B.priority&&(v=1):W[T]=C=hd.call(e,b,T,"get",w[T],Z,M,0,i.stringFilter);e._op&&e._op[A]&&e.kill(b,e._op[A]),y&&e._pt&&(qr=e,zt.killTweensOf(b,W,e.globalTime(t)),H=!e.parent,qr=0),e._pt&&l&&(rh[P.id]=1)}v&&N_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!H,h&&t<=0&&x.render(Ti,!0,!0)},LE=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return uh=1,e.vars[t]="+=0",dd(e,a),uh=0,l?el(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,f.e&&(f.e=qt(n)+Sn(f.e)),f.b&&(f.b=u.s+Sn(f.b))},IE=function(e,t){var n=e[0]?Ls(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=jo({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},NE=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(bn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Oa=function(e,t,n,i,s){return Xt(e)?e.call(t,n,i,s):fn(e)&&~e.indexOf("random(")?nl(e):e},C_=cd+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",P_={};Xn(C_+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return P_[r]=1});var Zt=function(r){$g(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ua(i))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,M=i.parent||zt,y=(bn(n)||jg(n)?Ar(n[0]):"length"in i)?[n]:Ei(n),x,w,A,T,C,b,v,P;if(a._targets=y.length?ud(y):el("GSAP target "+n+" not found. https://gsap.com",!li.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||Hl(c)||Hl(u)){if(i=a.vars,x=a.timeline=new Un({data:"nested",defaults:_||{},targets:M&&M.data==="nested"?M.vars.targets:y}),x.kill(),x.parent=x._dp=hr(a),x._start=0,h||Hl(c)||Hl(u)){if(T=y.length,v=h&&p_(h),tr(h))for(C in h)~C_.indexOf(C)&&(P||(P={}),P[C]=h[C]);for(w=0;w<T;w++)A=Bc(i,P_),A.stagger=0,p&&(A.yoyoEase=p),P&&jo(A,P),b=y[w],A.duration=+Oa(c,hr(a),w,b,y),A.delay=(+Oa(u,hr(a),w,b,y)||0)-a._delay,!h&&T===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),x.to(b,A,v?v(w,b,y):0),x._ease=mt.none;x.duration()?c=u=0:a.timeline=0}else if(g){Ua(ui(x.vars.defaults,{ease:"none"})),x._ease=Ns(g.ease||i.ease||"none");var U=0,B,W,Z;if(bn(g))g.forEach(function(X){return x.to(y,X,">")}),x.duration();else{A={};for(C in g)C==="ease"||C==="easeEach"||NE(C,g[C],A,g.easeEach);for(C in A)for(B=A[C].sort(function(X,H){return X.t-H.t}),U=0,w=0;w<B.length;w++)W=B[w],Z={ease:W.e,duration:(W.t-(w?B[w-1].t:0))/100*c},Z[C]=W.v,x.to(y,Z,U),U+=Z.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return d===!0&&!id&&(qr=hr(a),zt.killTweensOf(y),qr=0),Xi(M,hr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(f||!c&&!g&&a._start===Jt(M._time)&&Wn(f)&&fE(hr(a))&&M.data!=="nested")&&(a._tTime=-Lt,a.render(Math.max(0,-u)||0)),m&&u_(hr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,f=i>l-Lt&&!u?l:i<Lt?0:i,h,d,g,_,m,p,M,y,x;if(!c)dE(this,i,s,o);else if(f!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,y=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,o);if(h=Jt(f%_),f===l?(g=this._repeat,h=c):(m=Jt(f/_),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),p=this._yoyo&&g&1,p&&(x=this._yEase,h=c-h),m=Zo(this._tTime,_),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(y&&this._yEase&&E_(y,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==_&&this._initted&&(this._lock=o=1,this.render(Jt(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(f_(this,u?i:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(x||this._ease)(h/c),this._from&&(this.ratio=M=1-M),!a&&f&&!s&&!m&&(ai(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;y&&y.render(i<0?i:y._dur*y._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&sh(this,i,s,o),ai(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&ai(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&sh(this,i,!0,!0),(i||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&rs(this,1),!s&&!(u&&!a)&&(f||a||p)&&(ai(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){il||si.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||dd(this,c),u=this._ease(c/this._dur),LE(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(nu(this,0),this.parent||l_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ba(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,qr&&qr.vars.overwrite!==!0)._first||ba(this),this.parent&&o!==this.timeline.totalDuration()&&Jo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Ei(i):a,c=this._ptLookup,u=this._pt,f,h,d,g,_,m,p;if((!s||s==="all")&&cE(a,l))return s==="all"&&(this._pt=0),ba(this);for(f=this._op=this._op||[],s!=="all"&&(fn(s)&&(_={},Xn(s,function(M){return _[M]=1}),s=_),s=IE(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(f[p]=s,g=h,d={}):(d=f[p]=f[p]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&eu(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&ba(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Fa(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Fa(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return zt.killTweensOf(i,s,o)},e}(rl);ui(Zt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Xn("staggerTo,staggerFrom,staggerFromTo",function(r){Zt[r]=function(){var e=new Un,t=ah.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var pd=function(e,t,n){return e[t]=n},D_=function(e,t,n){return e[t](n)},UE=function(e,t,n,i){return e[t](i.fp,n)},FE=function(e,t,n){return e.setAttribute(t,n)},md=function(e,t){return Xt(e[t])?D_:rd(e[t])&&e.setAttribute?FE:pd},L_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},OE=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},I_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},gd=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},BE=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},kE=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?eu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},zE=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},N_=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Yn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||L_,this.d=l||this,this.set=c||pd,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=zE,this.m=n,this.mt=s,this.tween=i},r}();Xn(cd+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ld[r]=1});ci.TweenMax=ci.TweenLite=Zt;ci.TimelineLite=ci.TimelineMax=Un;zt=new Un({sortChildren:!1,defaults:Ko,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});li.stringFilter=b_;var Us=[],yc={},VE=[],um=0,HE=0,ju=function(e){return(yc[e]||VE).map(function(t){return t()})},fh=function(){var e=Date.now(),t=[];e-um>2&&(ju("matchMediaInit"),Us.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Vi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),ju("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),um=e,ju("matchMedia"))},U_=function(){function r(t,n){this.selector=n&&lh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=HE++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Xt(n)&&(s=i,i=n,n=Xt);var o=this,a=function(){var c=Bt,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=lh(s)),Bt=o,f=i.apply(o,arguments),Xt(f)&&o._r.push(f),Bt=c,o.selector=u,o.isReverted=!1,f};return o.last=a,n===Xt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Bt;Bt=null,n(this),Bt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Zt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Un?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Zt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Us.length;o--;)Us[o].id===this.id&&Us.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),GE=function(){function r(t){this.contexts=[],this.scope=t,Bt&&Bt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){tr(n)||(n={matches:n});var o=new U_(0,s||this.scope),a=o.conditions={},l,c,u;Bt&&!o.selector&&(o.selector=Bt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Vi.matchMedia(n[c]),l&&(Us.indexOf(o)<0&&Us.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(fh):l.addEventListener("change",fh)));return u&&i(o,function(f){return o.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),zc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return y_(i)})},timeline:function(e){return new Un(e)},getTweensOf:function(e,t){return zt.getTweensOf(e,t)},getProperty:function(e,t,n,i){fn(e)&&(e=Ei(e)[0]);var s=Ls(e||{}).get,o=n?a_:o_;return n==="native"&&(n=""),e&&(t?o((ii[t]&&ii[t].get||s)(e,t,n,i)):function(a,l,c){return o((ii[a]&&ii[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Ei(e),e.length>1){var i=e.map(function(u){return $n.quickSetter(u,t,n)}),s=i.length;return function(u){for(var f=s;f--;)i[f](u)}}e=e[0]||{};var o=ii[t],a=Ls(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var f=new o;bo._pt=0,f.init(e,n?u+n:u,bo,0,[e]),f.render(1,f),bo._pt&&gd(1,bo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=$n.to(e,ui((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return zt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ns(e.ease,Ko.ease)),sm(Ko,e||{})},config:function(e){return sm(li,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!ii[a]&&!ci[a]&&el(t+" effect requires "+a+" plugin.")}),Yu[t]=function(a,l,c){return n(Ei(a),ui(l||{},s),c)},o&&(Un.prototype[t]=function(a,l,c){return this.add(Yu[t](a,tr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){mt[e]=Ns(t)},parseEase:function(e,t){return arguments.length?Ns(e,t):mt},getById:function(e){return zt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Un(e),i,s;for(n.smoothChildTiming=Wn(e.smoothChildTiming),zt.remove(n),n._dp=0,n._time=n._tTime=zt._time,i=zt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Zt&&i.vars.onComplete===i._targets[0]))&&Xi(n,i,i._start-i._delay),i=s;return Xi(zt,n,0),n},context:function(e,t){return e?new U_(e,t):Bt},matchMedia:function(e){return new GE(e)},matchMediaRefresh:function(){return Us.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||fh()},addEventListener:function(e,t){var n=yc[e]||(yc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=yc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:SE,wrapYoyo:ME,distribute:p_,random:g_,snap:m_,normalize:yE,getUnit:Sn,clamp:gE,splitColor:S_,toArray:Ei,selector:lh,mapRange:x_,pipe:xE,unitize:vE,interpolate:bE,shuffle:d_},install:t_,effects:Yu,ticker:si,updateRoot:Un.updateRoot,plugins:ii,globalTimeline:zt,core:{PropTween:Yn,globals:n_,Tween:Zt,Timeline:Un,Animation:rl,getCache:Ls,_removeLinkedListItem:eu,reverting:function(){return pn},context:function(e){return e&&Bt&&(Bt.data.push(e),e._ctx=Bt),Bt},suppressOverwrites:function(e){return id=e}}};Xn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return zc[r]=Zt[r]});si.add(Un.updateRoot);bo=zc.to({},{duration:0});var WE=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},XE=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=WE(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Zu=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(fn(s)&&(l={},Xn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}XE(a,s)}}}},$n=zc.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)pn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Zu("roundProps",ch),Zu("modifiers"),Zu("snap",m_))||zc;Zt.version=Un.version=$n.version="3.13.0";e_=1;sd()&&Qo();mt.Power0;mt.Power1;mt.Power2;mt.Power3;mt.Power4;mt.Linear;mt.Quad;mt.Cubic;mt.Quart;mt.Quint;mt.Strong;mt.Elastic;mt.Back;mt.SteppedEase;mt.Bounce;mt.Sine;mt.Expo;mt.Circ;/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var fm,$r,Po,_d,Ps,hm,xd,YE=function(){return typeof window<"u"},Rr={},Ms=180/Math.PI,Do=Math.PI/180,fo=Math.atan2,dm=1e8,vd=/([A-Z])/g,qE=/(left|right|width|margin|padding|x)/i,$E=/[\s,\(]\S/,Yi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},hh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},KE=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},jE=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ZE=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},F_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},O_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},JE=function(e,t,n){return e.style[t]=n},QE=function(e,t,n){return e.style.setProperty(t,n)},ew=function(e,t,n){return e._gsap[t]=n},tw=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},nw=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},iw=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Vt="transform",qn=Vt+"Origin",rw=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Rr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Yi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=dr(i,a)}):this.tfm[e]=o.x?o[e]:dr(i,e),e===qn&&(this.tfm.zOrigin=o.zOrigin);else return Yi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Vt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(qn,t,"")),e=Vt}(s||t)&&this.props.push(e,t,s[e])},B_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},sw=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(vd,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=xd(),(!s||!s.isStart)&&!n[Vt]&&(B_(n),i.zOrigin&&n[qn]&&(n[qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},k_=function(e,t){var n={target:e,props:[],revert:sw,save:rw};return e._gsap||$n.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},z_,dh=function(e,t){var n=$r.createElementNS?$r.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):$r.createElement(e);return n&&n.style?n:$r.createElement(e)},wi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(vd,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ea(t)||t,1)||""},pm="O,Moz,ms,Ms,Webkit".split(","),ea=function(e,t,n){var i=t||Ps,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(pm[o]+e in s););return o<0?null:(o===3?"ms":o>=0?pm[o]:"")+e},ph=function(){YE()&&window.document&&(fm=window,$r=fm.document,Po=$r.documentElement,Ps=dh("div")||{style:{}},dh("div"),Vt=ea(Vt),qn=Vt+"Origin",Ps.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",z_=!!ea("perspective"),xd=$n.core.reverting,_d=1)},mm=function(e){var t=e.ownerSVGElement,n=dh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Po.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Po.removeChild(n),s},gm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},V_=function(e){var t,n;try{t=e.getBBox()}catch{t=mm(e),n=1}return t&&(t.width||t.height)||n||(t=mm(e)),t&&!t.width&&!t.x&&!t.y?{x:+gm(e,["x","cx","x1"])||0,y:+gm(e,["y","cy","y1"])||0,width:0,height:0}:t},H_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&V_(e))},Vs=function(e,t){if(t){var n=e.style,i;t in Rr&&t!==qn&&(t=Vt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(vd,"-$1").toLowerCase())):n.removeAttribute(t)}},Kr=function(e,t,n,i,s,o){var a=new Yn(e._pt,t,n,0,1,o?O_:F_);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},_m={deg:1,rad:1,turn:1},ow={grid:1,flex:1},ss=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Ps.style,l=qE.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=i==="px",d=i==="%",g,_,m,p;if(i===o||!s||_m[i]||_m[o])return s;if(o!=="px"&&!h&&(s=r(e,t,n,"px")),p=e.getCTM&&H_(e),(d||o==="%")&&(Rr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],qt(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===$r||!_.appendChild)&&(_=$r.body),m=_._gsap,m&&d&&m.width&&l&&m.time===si.time&&!m.uncache)return qt(s/m.width*f);if(d&&(t==="height"||t==="width")){var M=e.style[t];e.style[t]=f+i,g=e[u],M?e.style[t]=M:Vs(e,t)}else(d||o==="%")&&!ow[wi(_,"display")]&&(a.position=wi(e,"position")),_===e&&(a.position="static"),_.appendChild(Ps),g=Ps[u],_.removeChild(Ps),a.position="absolute";return l&&d&&(m=Ls(_),m.time=si.time,m.width=_[u]),qt(h?g*s/f:g&&s?f/g*s:0)},dr=function(e,t,n,i){var s;return _d||ph(),t in Yi&&t!=="transform"&&(t=Yi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Rr[t]&&t!=="transform"?(s=ol(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Hc(wi(e,qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Vc[t]&&Vc[t](e,t,n)||wi(e,t)||r_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ss(e,t,s,n)+n:s},aw=function(e,t,n,i){if(!n||n==="none"){var s=ea(t,e,1),o=s&&wi(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=wi(e,"borderTopColor"))}var a=new Yn(this._pt,e.style,t,0,1,I_),l=0,c=0,u,f,h,d,g,_,m,p,M,y,x,w;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=wi(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=wi(e,t)||i,_?e.style[t]=_:Vs(e,t)),u=[n,i],b_(u),n=u[0],i=u[1],h=n.match(Mo)||[],w=i.match(Mo)||[],w.length){for(;f=Mo.exec(i);)m=f[0],M=i.substring(l,f.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),m!==(_=h[c++]||"")&&(d=parseFloat(_)||0,x=_.substr((d+"").length),m.charAt(1)==="="&&(m=Co(d,m)+x),p=parseFloat(m),y=m.substr((p+"").length),l=Mo.lastIndex-y.length,y||(y=y||li.units[t]||x,l===i.length&&(i+=y,a.e+=y)),x!==y&&(d=ss(e,t,_,y)||0),a._pt={_next:a._pt,p:M||c===1?M:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?O_:F_;return Jg.test(i)&&(a.e=0),this._pt=a,a},xm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},lw=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=xm[n]||n,t[1]=xm[i]||i,t.join(" ")},cw=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Rr[a]&&(l=1,a=a==="transformOrigin"?qn:Vt),Vs(n,a);l&&(Vs(n,Vt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ol(n,1),o.uncache=1,B_(i)))}},Vc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Yn(e._pt,t,n,0,0,cw);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},sl=[1,0,0,1,0,0],G_={},W_=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},vm=function(e){var t=wi(e,Vt);return W_(t)?sl:t.substr(7).match(Zg).map(qt)},yd=function(e,t){var n=e._gsap||Ls(e),i=e.style,s=vm(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?sl:s):(s===sl&&!e.offsetParent&&e!==Po&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Po.appendChild(e)),s=vm(e),l?i.display=l:Vs(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Po.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},mh=function(e,t,n,i,s,o){var a=e._gsap,l=s||yd(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],M=l[5],y=t.split(" "),x=parseFloat(y[0])||0,w=parseFloat(y[1])||0,A,T,C,b;n?l!==sl&&(T=d*m-g*_)&&(C=x*(m/T)+w*(-_/T)+(_*M-m*p)/T,b=x*(-g/T)+w*(d/T)-(d*M-g*p)/T,x=C,w=b):(A=V_(e),x=A.x+(~y[0].indexOf("%")?x/100*A.width:x),w=A.y+(~(y[1]||y[0]).indexOf("%")?w/100*A.height:w)),i||i!==!1&&a.smooth?(p=x-c,M=w-u,a.xOffset=f+(p*d+M*_)-p,a.yOffset=h+(p*g+M*m)-M):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=w,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[qn]="0px 0px",o&&(Kr(o,a,"xOrigin",c,x),Kr(o,a,"yOrigin",u,w),Kr(o,a,"xOffset",f,a.xOffset),Kr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",x+" "+w)},ol=function(e,t){var n=e._gsap||new A_(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=wi(e,qn)||"0",u,f,h,d,g,_,m,p,M,y,x,w,A,T,C,b,v,P,U,B,W,Z,X,H,k,re,L,pe,Fe,Ye,j,ue;return u=f=h=_=m=p=M=y=x=0,d=g=1,n.svg=!!(e.getCTM&&H_(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Vt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Vt]!=="none"?l[Vt]:"")),i.scale=i.rotate=i.translate="none"),T=yd(e,n.svg),n.svg&&(n.uncache?(k=e.getBBox(),c=n.xOrigin-k.x+"px "+(n.yOrigin-k.y)+"px",H=""):H=!t&&e.getAttribute("data-svg-origin"),mh(e,H||c,!!H||n.originIsAbsolute,n.smooth!==!1,T)),w=n.xOrigin||0,A=n.yOrigin||0,T!==sl&&(P=T[0],U=T[1],B=T[2],W=T[3],u=Z=T[4],f=X=T[5],T.length===6?(d=Math.sqrt(P*P+U*U),g=Math.sqrt(W*W+B*B),_=P||U?fo(U,P)*Ms:0,M=B||W?fo(B,W)*Ms+_:0,M&&(g*=Math.abs(Math.cos(M*Do))),n.svg&&(u-=w-(w*P+A*B),f-=A-(w*U+A*W))):(ue=T[6],Ye=T[7],L=T[8],pe=T[9],Fe=T[10],j=T[11],u=T[12],f=T[13],h=T[14],C=fo(ue,Fe),m=C*Ms,C&&(b=Math.cos(-C),v=Math.sin(-C),H=Z*b+L*v,k=X*b+pe*v,re=ue*b+Fe*v,L=Z*-v+L*b,pe=X*-v+pe*b,Fe=ue*-v+Fe*b,j=Ye*-v+j*b,Z=H,X=k,ue=re),C=fo(-B,Fe),p=C*Ms,C&&(b=Math.cos(-C),v=Math.sin(-C),H=P*b-L*v,k=U*b-pe*v,re=B*b-Fe*v,j=W*v+j*b,P=H,U=k,B=re),C=fo(U,P),_=C*Ms,C&&(b=Math.cos(C),v=Math.sin(C),H=P*b+U*v,k=Z*b+X*v,U=U*b-P*v,X=X*b-Z*v,P=H,Z=k),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=qt(Math.sqrt(P*P+U*U+B*B)),g=qt(Math.sqrt(X*X+ue*ue)),C=fo(Z,X),M=Math.abs(C)>2e-4?C*Ms:0,x=j?1/(j<0?-j:j):0),n.svg&&(H=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!W_(wi(e,Vt)),H&&e.setAttribute("transform",H))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=qt(d),n.scaleY=qt(g),n.rotation=qt(_)+a,n.rotationX=qt(m)+a,n.rotationY=qt(p)+a,n.skewX=M+a,n.skewY=y+a,n.transformPerspective=x+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[qn]=Hc(c)),n.xOffset=n.yOffset=0,n.force3D=li.force3D,n.renderTransform=n.svg?fw:z_?X_:uw,n.uncache=0,n},Hc=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ju=function(e,t,n){var i=Sn(t);return qt(parseFloat(t)+parseFloat(ss(e,"x",n+"px",i)))+i},uw=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,X_(e,t)},_s="0deg",ga="0px",xs=") ",X_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,M=n.target,y=n.zOrigin,x="",w=p==="auto"&&e&&e!==1||p===!0;if(y&&(f!==_s||u!==_s)){var A=parseFloat(u)*Do,T=Math.sin(A),C=Math.cos(A),b;A=parseFloat(f)*Do,b=Math.cos(A),o=Ju(M,o,T*b*-y),a=Ju(M,a,-Math.sin(A)*-y),l=Ju(M,l,C*b*-y+y)}m!==ga&&(x+="perspective("+m+xs),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(w||o!==ga||a!==ga||l!==ga)&&(x+=l!==ga||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+xs),c!==_s&&(x+="rotate("+c+xs),u!==_s&&(x+="rotateY("+u+xs),f!==_s&&(x+="rotateX("+f+xs),(h!==_s||d!==_s)&&(x+="skew("+h+", "+d+xs),(g!==1||_!==1)&&(x+="scale("+g+", "+_+xs),M.style[Vt]=x||"translate(0, 0)"},fw=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,M=n.forceCSS,y=parseFloat(o),x=parseFloat(a),w,A,T,C,b;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Do,c*=Do,w=Math.cos(l)*f,A=Math.sin(l)*f,T=Math.sin(l-c)*-h,C=Math.cos(l-c)*h,c&&(u*=Do,b=Math.tan(c-u),b=Math.sqrt(1+b*b),T*=b,C*=b,u&&(b=Math.tan(u),b=Math.sqrt(1+b*b),w*=b,A*=b)),w=qt(w),A=qt(A),T=qt(T),C=qt(C)):(w=f,C=h,A=T=0),(y&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(y=ss(d,"x",o,"px"),x=ss(d,"y",a,"px")),(g||_||m||p)&&(y=qt(y+g-(g*w+_*T)+m),x=qt(x+_-(g*A+_*C)+p)),(i||s)&&(b=d.getBBox(),y=qt(y+i/100*b.width),x=qt(x+s/100*b.height)),b="matrix("+w+","+A+","+T+","+C+","+y+","+x+")",d.setAttribute("transform",b),M&&(d.style[Vt]=b)},hw=function(e,t,n,i,s){var o=360,a=fn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Ms:1),c=l-i,u=i+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*dm)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*dm)%o-~~(c/o)*o)),e._pt=h=new Yn(e._pt,t,n,i,c,KE),h.e=u,h.u="deg",e._props.push(n),h},ym=function(e,t){for(var n in t)e[n]=t[n];return e},dw=function(e,t,n){var i=ym({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,f,h,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Vt]=t,a=ol(n,1),Vs(n,Vt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Vt],o[Vt]=t,a=ol(n,1),o[Vt]=c);for(l in Rr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=Sn(c),g=Sn(u),f=d!==g?ss(n,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new Yn(e._pt,a,l,f,h-f,hh),e._pt.u=g||0,e._props.push(l));ym(a,i)};Xn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Vc[e>1?"border"+r:r]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return dr(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(l,d,f)}});var Y_={name:"css",register:ph,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,f,h,d,g,_,m,p,M,y,x,w,A,T,C;_d||ph(),this.styles=this.styles||k_(e),C=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(ii[_]&&R_(_,t,n,i,e,s)))){if(d=typeof u,g=Vc[_],d==="function"&&(u=u.call(n,i,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=nl(u)),g)g(this,e,_,u,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",ns.lastIndex=0,ns.test(c)||(m=Sn(c),p=Sn(u)),p?m!==p&&(c=ss(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,_),o.push(_),C.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],fn(c)&&~c.indexOf("random(")&&(c=nl(c)),Sn(c+"")||c==="auto"||(c+=li.units[_]||Sn(dr(e,_))||""),(c+"").charAt(1)==="="&&(c=dr(e,_))):c=dr(e,_),h=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),f=parseFloat(u),_ in Yi&&(_==="autoAlpha"&&(h===1&&dr(e,"visibility")==="hidden"&&f&&(h=0),C.push("visibility",0,a.visibility),Kr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=Yi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),y=_ in Rr,y){if(this.styles.save(_),d==="string"&&u.substring(0,6)==="var(--"&&(u=wi(e,u.substring(4,u.indexOf(")"))),f=parseFloat(u)),x||(w=e._gsap,w.renderTransform&&!t.parseTransform||ol(e,t.parseTransform),A=t.smoothOrigin!==!1&&w.smooth,x=this._pt=new Yn(this._pt,a,Vt,0,1,w.renderTransform,w,0,-1),x.dep=1),_==="scale")this._pt=new Yn(this._pt,w,"scaleY",w.scaleY,(M?Co(w.scaleY,M+f):f)-w.scaleY||0,hh),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){C.push(qn,0,a[qn]),u=lw(u),w.svg?mh(e,u,0,A,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==w.zOrigin&&Kr(this,w,"zOrigin",w.zOrigin,p),Kr(this,a,_,Hc(c),Hc(u)));continue}else if(_==="svgOrigin"){mh(e,u,1,A,0,this);continue}else if(_ in G_){hw(this,w,_,h,M?Co(h,M+u):u);continue}else if(_==="smoothOrigin"){Kr(this,w,"smooth",w.smooth,u);continue}else if(_==="force3D"){w[_]=u;continue}else if(_==="transform"){dw(this,u,e);continue}}else _ in a||(_=ea(_)||_);if(y||(f||f===0)&&(h||h===0)&&!$E.test(u)&&_ in a)m=(c+"").substr((h+"").length),f||(f=0),p=Sn(u)||(_ in li.units?li.units[_]:m),m!==p&&(h=ss(e,_,c,p)),this._pt=new Yn(this._pt,y?w:a,_,h,(M?Co(h,M+f):f)-h,!y&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?ZE:hh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=jE);else if(_ in a)aw.call(this,e,_,c,M?M+u:u);else if(_ in e)this.add(e,_,c||e[_],M?M+u:u,i,s);else if(_!=="parseTransform"){ad(_,u);continue}y||(_ in a?C.push(_,0,a[_]):typeof e[_]=="function"?C.push(_,2,e[_]()):C.push(_,1,c||e[_])),o.push(_)}}T&&N_(this)},render:function(e,t){if(t.tween._time||!xd())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:dr,aliases:Yi,getSetter:function(e,t,n){var i=Yi[t];return i&&i.indexOf(",")<0&&(t=i),t in Rr&&t!==qn&&(e._gsap.x||dr(e,"x"))?n&&hm===n?t==="scale"?tw:ew:(hm=n||{})&&(t==="scale"?nw:iw):e.style&&!rd(e.style[t])?JE:~t.indexOf("-")?QE:md(e,t)},core:{_removeProperty:Vs,_getMatrix:yd}};$n.utils.checkPrefix=ea;$n.core.getStyleSaver=k_;(function(r,e,t,n){var i=Xn(r+","+e+","+t,function(s){Rr[s]=1});Xn(e,function(s){li.units[s]="deg",G_[s]=1}),Yi[i[13]]=r+","+e,Xn(n,function(s){var o=s.split(":");Yi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Xn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){li.units[r]="px"});$n.registerPlugin(Y_);var _e=$n.registerPlugin(Y_)||$n;_e.core.Tween;let gh=!1;function pw(){return gh}window.isAnimationComplete=pw;function Sm(){return _c(async()=>{const{calculateStartPosition:r,calculateTargetPosition:e}=await Promise.resolve().then(()=>R0);return{calculateStartPosition:r,calculateTargetPosition:e}},void 0).then(({calculateStartPosition:r,calculateTargetPosition:e})=>{const t=r(),n=e(),i=document.querySelector(".section[data-section='1']");if(!i)return console.log("Trigger element not found, using start scale"),t.scale||er.startScale;const s=i.getBoundingClientRect(),o=s.height,a=s.top;let l=0;a<=0?l=Math.min(Math.abs(a)/o,1):l=0,l=Math.max(0,Math.min(1,l));const c=_e.utils.interpolate(t.scale||er.startScale,n.scale,l);return console.log("Calculated scale for ScrollTrigger position:",{triggerTop:a,triggerHeight:o,progress:l,startScale:t.scale,targetScale:n.scale,currentScale:c}),c})}let Si=null;function Sd(){return new Promise((r,e)=>{const t=document.querySelector(".hero");if(!t){e(new Error("Hero element not found"));return}const n=()=>{html2canvas(t,{backgroundColor:null,scale:2,useCORS:!0,allowTaint:!0,logging:!1,width:t.offsetWidth,height:t.offsetHeight,scrollX:window.scrollX,scrollY:window.scrollY}).then(s=>{const o=new Cv(s);o.needsUpdate=!0,window.textureReady=!0,window.wrapper&&!window.scrollScaleActive&&Sm().then(a=>{_e.to(window.wrapper.scale,{x:a,y:a,z:a,duration:1.5,ease:"power2.out",onStart:()=>{console.log("Initial scale animation started with scroll-adjusted scale:",a);const l=document.getElementById("three-canvas");l&&_e.to(l,{opacity:1,duration:.4,ease:"power1.out"}),window.wrapper&&(window.wrapper.visible=!0)},onUpdate:()=>{window.wrapper.scale.needsUpdate=!0},onComplete:()=>{gh=!0,console.log("Initial scale animation completed")}})}),r(o)}).catch(s=>{console.error("Error capturing hero:",s),window.textureReady=!0,window.wrapper&&!window.scrollScaleActive&&Sm().then(o=>{_e.to(window.wrapper.scale,{x:o,y:o,z:o,duration:1.5,ease:"power2.out",onStart:()=>{console.log("Fallback scale animation started with scroll-adjusted scale:",o)},onComplete:()=>{gh=!0,console.log("Fallback scale animation completed")}})}),e(s)})};(()=>{window.heroReady&&typeof window.heroReady.then=="function"?window.heroReady.then(()=>requestAnimationFrame(n)):document.fonts&&typeof document.fonts.ready?.then=="function"?document.fonts.ready.then(()=>requestAnimationFrame(n)):requestAnimationFrame(n)})()})}function mw(r,e){const t=new xr;t.visible=!0,r.add(t);const i=20*1,s=i*(591/1325),o=new hl(i,s),a=new _r({transparent:!0,opacity:.8,side:yi}),l=new On(o,a);l.position.set(0,0,-10),l.visible=!1,l.renderOrder=-1,r.add(l),Si=l,window.backgroundPlane=l,Sd().then(h=>{l.material.map=h,l.material.needsUpdate=!0,l.visible=!0}).catch(h=>{console.error("Failed to apply dynamic texture, using fallback:",h);const g=new kg().load("/images/header.png");l.material.map=g,l.material.needsUpdate=!0}),setTimeout(()=>{!window.textureReady&&window.wrapper&&!window.scrollScaleActive&&(window.textureReady=!0,_c(async()=>{const{calculateStartPosition:h}=await Promise.resolve().then(()=>R0);return{calculateStartPosition:h}},void 0).then(({calculateStartPosition:h})=>{const g=h().scale||er.startScale;_e.to(window.wrapper.scale,{x:g,y:g,z:g,duration:1.5,ease:"power2.out"})}))},3e3);const c=new jh(1,32,32),u=new _r({color:16777215,transparent:!0,opacity:1}),f=new On(c,u);_c(async()=>{const{getCurrentBreakpoint:h}=await Promise.resolve().then(()=>Vw);return{getCurrentBreakpoint:h}},void 0).then(({getCurrentBreakpoint:h})=>{_c(async()=>{const{WHITE_SPHERE_POSITIONS:d}=await Promise.resolve().then(()=>KT);return{WHITE_SPHERE_POSITIONS:d}},void 0).then(({WHITE_SPHERE_POSITIONS:d})=>{const g=h(),_=d[g]||d.desktop;f.position.set(_.x,_.y,_.z)})}),f.scale.setScalar(1.25),f.visible=!1,f.renderOrder=-2,r.add(f),window.DEBUG||(window.DEBUG={}),window.DEBUG.whiteSphere=f}function Mm(){if(Si){const r=xw();Si.position.set(r.x,r.y,r.z),document.getElementById("planeX")&&(document.getElementById("planeX").value=r.x,document.getElementById("planeXValue").textContent=r.x.toFixed(1)),document.getElementById("planeY")&&(document.getElementById("planeY").value=r.y,document.getElementById("planeYValue").textContent=r.y.toFixed(1)),document.getElementById("planeZ")&&(document.getElementById("planeZ").value=r.z,document.getElementById("planeZValue").textContent=r.z.toFixed(1))}}function bm(){Si&&Sd().then(r=>{Si.material.map&&Si.material.map.dispose(),Si.material.map=r,Si.material.needsUpdate=!0}).catch(r=>{console.error("Failed to update plane texture:",r)})}function gw(){Si&&(Si.visible=!0)}function _w(){Si&&(Si.visible=!1)}function xw(){const r=window.innerWidth,e=window.innerHeight,t=-4,n=0,i=0;let s=n*10,o=i*10;const a=-5;s+=t;const l=r/e;return l>1?s+=(l-1)*5:o+=(1-l)*5,{x:s,y:o,z:a}}function vw(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function yw(r,e,t){return e&&vw(r.prototype,e),r}/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var dn,Sc,oi,jr,Zr,Lo,q_,bs,Ba,$_,yr,Li,K_,j_=function(){return dn||typeof window<"u"&&(dn=window.gsap)&&dn.registerPlugin&&dn},Z_=1,To=[],ut=[],ji=[],ka=Date.now,_h=function(e,t){return t},Sw=function(){var e=Ba.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,ut),i.push.apply(i,ji),ut=n,ji=i,_h=function(o,a){return t[o](a)}},is=function(e,t){return~ji.indexOf(e)&&ji[ji.indexOf(e)+1][t]},za=function(e){return!!~$_.indexOf(e)},Rn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},An=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Gl="scrollLeft",Wl="scrollTop",xh=function(){return yr&&yr.isPressed||ut.cache++},Gc=function(e,t){var n=function i(s){if(s||s===0){Z_&&(oi.history.scrollRestoration="manual");var o=yr&&yr.isPressed;s=i.v=Math.round(s)||(yr&&yr.iOS?1:0),e(s),i.cacheID=ut.cache,o&&_h("ss",s)}else(t||ut.cache!==i.cacheID||_h("ref"))&&(i.cacheID=ut.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Fn={s:Gl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Gc(function(r){return arguments.length?oi.scrollTo(r,rn.sc()):oi.pageXOffset||jr[Gl]||Zr[Gl]||Lo[Gl]||0})},rn={s:Wl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Fn,sc:Gc(function(r){return arguments.length?oi.scrollTo(Fn.sc(),r):oi.pageYOffset||jr[Wl]||Zr[Wl]||Lo[Wl]||0})},Hn=function(e,t){return(t&&t._ctx&&t._ctx.selector||dn.utils.toArray)(e)[0]||(typeof e=="string"&&dn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Mw=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},os=function(e,t){var n=t.s,i=t.sc;za(e)&&(e=jr.scrollingElement||Zr);var s=ut.indexOf(e),o=i===rn.sc?1:2;!~s&&(s=ut.push(e)-1),ut[s+o]||Rn(e,"scroll",xh);var a=ut[s+o],l=a||(ut[s+o]=Gc(is(e,n),!0)||(za(e)?i:Gc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=dn.getProperty(e,"scrollBehavior")==="smooth"),l},vh=function(e,t,n){var i=e,s=e,o=ka(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=ka();_||m-o>l?(s=i,i=g,a=o,o=m):n?i+=g:i=s+(g-s)/(m-a)*(o-a)},f=function(){s=i=n?0:i,a=o=0},h=function(g){var _=a,m=s,p=ka();return(g||g===0)&&g!==i&&u(g),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:f,getVelocity:h}},_a=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Tm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},J_=function(){Ba=dn.core.globals().ScrollTrigger,Ba&&Ba.core&&Sw()},Q_=function(e){return dn=e||j_(),!Sc&&dn&&typeof document<"u"&&document.body&&(oi=window,jr=document,Zr=jr.documentElement,Lo=jr.body,$_=[oi,jr,Zr,Lo],dn.utils.clamp,K_=dn.core.context||function(){},bs="onpointerenter"in Lo?"pointer":"mouse",q_=$t.isTouch=oi.matchMedia&&oi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in oi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Li=$t.eventTypes=("ontouchstart"in Zr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Zr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Z_=0},500),J_(),Sc=1),Sc};Fn.op=rn;ut.cache=0;var $t=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Sc||Q_(dn)||console.warn("Please gsap.registerPlugin(Observer)"),Ba||J_();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,M=n.onDrag,y=n.onPress,x=n.onRelease,w=n.onRight,A=n.onLeft,T=n.onUp,C=n.onDown,b=n.onChangeX,v=n.onChangeY,P=n.onChange,U=n.onToggleX,B=n.onToggleY,W=n.onHover,Z=n.onHoverEnd,X=n.onMove,H=n.ignoreCheck,k=n.isNormalizer,re=n.onGestureStart,L=n.onGestureEnd,pe=n.onWheel,Fe=n.onEnable,Ye=n.onDisable,j=n.onClick,ue=n.scrollSpeed,oe=n.capture,le=n.allowClicks,de=n.lockAxis,De=n.onLockAxis;this.target=a=Hn(a)||Zr,this.vars=n,d&&(d=dn.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,ue=ue||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(oi.getComputedStyle(Lo).lineHeight)||22);var Re,We,Xe,ye,D,Ke,He,G=this,be=0,ee=0,N=n.passive||!u&&n.passive!==!1,J=os(a,Fn),Me=os(a,rn),R=J(),S=Me(),O=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Li[0]==="pointerdown",Q=za(a),K=a.ownerDocument||jr,q=[0,0,0],me=[0,0,0],ae=0,Se=function(){return ae=ka()},ne=function(Ue,nt){return(G.event=Ue)&&d&&Mw(Ue.target,d)||nt&&O&&Ue.pointerType!=="touch"||H&&H(Ue,nt)},ce=function(){G._vx.reset(),G._vy.reset(),We.pause(),f&&f(G)},ve=function(){var Ue=G.deltaX=Tm(q),nt=G.deltaY=Tm(me),Ee=Math.abs(Ue)>=i,Je=Math.abs(nt)>=i;P&&(Ee||Je)&&P(G,Ue,nt,q,me),Ee&&(w&&G.deltaX>0&&w(G),A&&G.deltaX<0&&A(G),b&&b(G),U&&G.deltaX<0!=be<0&&U(G),be=G.deltaX,q[0]=q[1]=q[2]=0),Je&&(C&&G.deltaY>0&&C(G),T&&G.deltaY<0&&T(G),v&&v(G),B&&G.deltaY<0!=ee<0&&B(G),ee=G.deltaY,me[0]=me[1]=me[2]=0),(ye||Xe)&&(X&&X(G),Xe&&(m&&Xe===1&&m(G),M&&M(G),Xe=0),ye=!1),Ke&&!(Ke=!1)&&De&&De(G),D&&(pe(G),D=!1),Re=0},Oe=function(Ue,nt,Ee){q[Ee]+=Ue,me[Ee]+=nt,G._vx.update(Ue),G._vy.update(nt),c?Re||(Re=requestAnimationFrame(ve)):ve()},Be=function(Ue,nt){de&&!He&&(G.axis=He=Math.abs(Ue)>Math.abs(nt)?"x":"y",Ke=!0),He!=="y"&&(q[2]+=Ue,G._vx.update(Ue,!0)),He!=="x"&&(me[2]+=nt,G._vy.update(nt,!0)),c?Re||(Re=requestAnimationFrame(ve)):ve()},ge=function(Ue){if(!ne(Ue,1)){Ue=_a(Ue,u);var nt=Ue.clientX,Ee=Ue.clientY,Je=nt-G.x,ke=Ee-G.y,Ze=G.isDragging;G.x=nt,G.y=Ee,(Ze||(Je||ke)&&(Math.abs(G.startX-nt)>=s||Math.abs(G.startY-Ee)>=s))&&(Xe=Ze?2:1,Ze||(G.isDragging=!0),Be(Je,ke))}},Ge=G.onPress=function(Te){ne(Te,1)||Te&&Te.button||(G.axis=He=null,We.pause(),G.isPressed=!0,Te=_a(Te),be=ee=0,G.startX=G.x=Te.clientX,G.startY=G.y=Te.clientY,G._vx.reset(),G._vy.reset(),Rn(k?a:K,Li[1],ge,N,!0),G.deltaX=G.deltaY=0,y&&y(G))},I=G.onRelease=function(Te){if(!ne(Te,1)){An(k?a:K,Li[1],ge,!0);var Ue=!isNaN(G.y-G.startY),nt=G.isDragging,Ee=nt&&(Math.abs(G.x-G.startX)>3||Math.abs(G.y-G.startY)>3),Je=_a(Te);!Ee&&Ue&&(G._vx.reset(),G._vy.reset(),u&&le&&dn.delayedCall(.08,function(){if(ka()-ae>300&&!Te.defaultPrevented){if(Te.target.click)Te.target.click();else if(K.createEvent){var ke=K.createEvent("MouseEvents");ke.initMouseEvent("click",!0,!0,oi,1,Je.screenX,Je.screenY,Je.clientX,Je.clientY,!1,!1,!1,!1,0,null),Te.target.dispatchEvent(ke)}}})),G.isDragging=G.isGesturing=G.isPressed=!1,f&&nt&&!k&&We.restart(!0),Xe&&ve(),p&&nt&&p(G),x&&x(G,Ee)}},xe=function(Ue){return Ue.touches&&Ue.touches.length>1&&(G.isGesturing=!0)&&re(Ue,G.isDragging)},se=function(){return(G.isGesturing=!1)||L(G)},he=function(Ue){if(!ne(Ue)){var nt=J(),Ee=Me();Oe((nt-R)*ue,(Ee-S)*ue,1),R=nt,S=Ee,f&&We.restart(!0)}},ie=function(Ue){if(!ne(Ue)){Ue=_a(Ue,u),pe&&(D=!0);var nt=(Ue.deltaMode===1?l:Ue.deltaMode===2?oi.innerHeight:1)*g;Oe(Ue.deltaX*nt,Ue.deltaY*nt,0),f&&!k&&We.restart(!0)}},te=function(Ue){if(!ne(Ue)){var nt=Ue.clientX,Ee=Ue.clientY,Je=nt-G.x,ke=Ee-G.y;G.x=nt,G.y=Ee,ye=!0,f&&We.restart(!0),(Je||ke)&&Be(Je,ke)}},Ce=function(Ue){G.event=Ue,W(G)},Ie=function(Ue){G.event=Ue,Z(G)},ft=function(Ue){return ne(Ue)||_a(Ue,u)&&j(G)};We=G._dc=dn.delayedCall(h||.25,ce).pause(),G.deltaX=G.deltaY=0,G._vx=vh(0,50,!0),G._vy=vh(0,50,!0),G.scrollX=J,G.scrollY=Me,G.isDragging=G.isGesturing=G.isPressed=!1,K_(this),G.enable=function(Te){return G.isEnabled||(Rn(Q?K:a,"scroll",xh),o.indexOf("scroll")>=0&&Rn(Q?K:a,"scroll",he,N,oe),o.indexOf("wheel")>=0&&Rn(a,"wheel",ie,N,oe),(o.indexOf("touch")>=0&&q_||o.indexOf("pointer")>=0)&&(Rn(a,Li[0],Ge,N,oe),Rn(K,Li[2],I),Rn(K,Li[3],I),le&&Rn(a,"click",Se,!0,!0),j&&Rn(a,"click",ft),re&&Rn(K,"gesturestart",xe),L&&Rn(K,"gestureend",se),W&&Rn(a,bs+"enter",Ce),Z&&Rn(a,bs+"leave",Ie),X&&Rn(a,bs+"move",te)),G.isEnabled=!0,G.isDragging=G.isGesturing=G.isPressed=ye=Xe=!1,G._vx.reset(),G._vy.reset(),R=J(),S=Me(),Te&&Te.type&&Ge(Te),Fe&&Fe(G)),G},G.disable=function(){G.isEnabled&&(To.filter(function(Te){return Te!==G&&za(Te.target)}).length||An(Q?K:a,"scroll",xh),G.isPressed&&(G._vx.reset(),G._vy.reset(),An(k?a:K,Li[1],ge,!0)),An(Q?K:a,"scroll",he,oe),An(a,"wheel",ie,oe),An(a,Li[0],Ge,oe),An(K,Li[2],I),An(K,Li[3],I),An(a,"click",Se,!0),An(a,"click",ft),An(K,"gesturestart",xe),An(K,"gestureend",se),An(a,bs+"enter",Ce),An(a,bs+"leave",Ie),An(a,bs+"move",te),G.isEnabled=G.isPressed=G.isDragging=!1,Ye&&Ye(G))},G.kill=G.revert=function(){G.disable();var Te=To.indexOf(G);Te>=0&&To.splice(Te,1),yr===G&&(yr=0)},To.push(G),k&&za(a)&&(yr=G),G.enable(_)},yw(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();$t.version="3.13.0";$t.create=function(r){return new $t(r)};$t.register=Q_;$t.getAll=function(){return To.slice()};$t.getById=function(r){return To.filter(function(e){return e.vars.id===r})[0]};j_()&&dn.registerPlugin($t);/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Le,go,ct,Nt,ri,Mt,Md,Wc,al,Va,Ea,Xl,vn,iu,yh,Ln,Em,wm,_o,e0,Qu,t0,Dn,Sh,n0,i0,zr,Mh,bd,Io,Td,Xc,bh,ef,Yl=1,yn=Date.now,tf=yn(),Ri=0,wa=0,Am=function(e,t,n){var i=ni(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Rm=function(e,t){return t&&(!ni(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},bw=function r(){return wa&&requestAnimationFrame(r)},Cm=function(){return iu=1},Pm=function(){return iu=0},Hi=function(e){return e},Aa=function(e){return Math.round(e*1e5)/1e5||0},r0=function(){return typeof window<"u"},s0=function(){return Le||r0()&&(Le=window.gsap)&&Le.registerPlugin&&Le},Hs=function(e){return!!~Md.indexOf(e)},o0=function(e){return(e==="Height"?Td:ct["inner"+e])||ri["client"+e]||Mt["client"+e]},a0=function(e){return is(e,"getBoundingClientRect")||(Hs(e)?function(){return wc.width=ct.innerWidth,wc.height=Td,wc}:function(){return pr(e)})},Tw=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=is(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?o0(s):e["client"+s])||0}},Ew=function(e,t){return!t||~ji.indexOf(e)?a0(e):function(){return wc}},qi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=is(e,n))?o()-a0(e)()[s]:Hs(e)?(ri[n]||Mt[n])-o0(i):e[n]-e["offset"+i])},ql=function(e,t){for(var n=0;n<_o.length;n+=3)(!t||~t.indexOf(_o[n+1]))&&e(_o[n],_o[n+1],_o[n+2])},ni=function(e){return typeof e=="string"},Mn=function(e){return typeof e=="function"},Ra=function(e){return typeof e=="number"},Ts=function(e){return typeof e=="object"},xa=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},nf=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},ho=Math.abs,l0="left",c0="top",Ed="right",wd="bottom",Fs="width",Os="height",Ha="Right",Ga="Left",Wa="Top",Xa="Bottom",jt="padding",xi="margin",ta="Width",Ad="Height",nn="px",vi=function(e){return ct.getComputedStyle(e)},ww=function(e){var t=vi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Dm=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},pr=function(e,t){var n=t&&vi(e)[yh]!=="matrix(1, 0, 0, 1, 0, 0)"&&Le.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Yc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},u0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},Aw=function(e){return function(t){return Le.utils.snap(u0(e),t)}},Rd=function(e){var t=Le.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},Rw=function(e){return function(t,n){return Rd(u0(e))(t,n.direction)}},$l=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},un=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Kl=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Lm={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},jl={toggleActions:"play",anticipatePin:0},qc={top:0,left:0,center:.5,bottom:1,right:1},Mc=function(e,t){if(ni(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in qc?qc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Zl=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=Nt.createElement("div"),_=Hs(n)||is(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?Mt:n,M=e.indexOf("start")!==-1,y=M?c:u,x="border-color:"+y+";font-size:"+f+";color:"+y+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(x+=(i===rn?Ed:wd)+":"+(o+parseFloat(h))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=x,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],bc(g,0,i,M),g},bc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+ta]=1,s["border"+a+ta]=0,s[n.p]=t+"px",Le.set(e,s)},at=[],Th={},ll,Im=function(){return yn()-Ri>34&&(ll||(ll=requestAnimationFrame(Tr)))},po=function(){(!Dn||!Dn.isPressed||Dn.startX>Mt.clientWidth)&&(ut.cache++,Dn?ll||(ll=requestAnimationFrame(Tr)):Tr(),Ri||Ws("scrollStart"),Ri=yn())},rf=function(){i0=ct.innerWidth,n0=ct.innerHeight},Ca=function(e){ut.cache++,(e===!0||!vn&&!t0&&!Nt.fullscreenElement&&!Nt.webkitFullscreenElement&&(!Sh||i0!==ct.innerWidth||Math.abs(ct.innerHeight-n0)>ct.innerHeight*.25))&&Wc.restart(!0)},Gs={},Cw=[],f0=function r(){return cn(je,"scrollEnd",r)||Ds(!0)},Ws=function(e){return Gs[e]&&Gs[e].map(function(t){return t()})||Cw},ti=[],h0=function(e){for(var t=0;t<ti.length;t+=5)(!e||ti[t+4]&&ti[t+4].query===e)&&(ti[t].style.cssText=ti[t+1],ti[t].getBBox&&ti[t].setAttribute("transform",ti[t+2]||""),ti[t+3].uncache=1)},Cd=function(e,t){var n;for(Ln=0;Ln<at.length;Ln++)n=at[Ln],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Xc=!0,t&&h0(t),t||Ws("revert")},d0=function(e,t){ut.cache++,(t||!In)&&ut.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),ni(e)&&(ct.history.scrollRestoration=bd=e)},In,Bs=0,Nm,Pw=function(){if(Nm!==Bs){var e=Nm=Bs;requestAnimationFrame(function(){return e===Bs&&Ds(!0)})}},p0=function(){Mt.appendChild(Io),Td=!Dn&&Io.offsetHeight||ct.innerHeight,Mt.removeChild(Io)},Um=function(e){return al(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ds=function(e,t){if(ri=Nt.documentElement,Mt=Nt.body,Md=[ct,Nt,ri,Mt],Ri&&!e&&!Xc){un(je,"scrollEnd",f0);return}p0(),In=je.isRefreshing=!0,ut.forEach(function(i){return Mn(i)&&++i.cacheID&&(i.rec=i())});var n=Ws("refreshInit");e0&&je.sort(),t||Cd(),ut.forEach(function(i){Mn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),at.slice(0).forEach(function(i){return i.refresh()}),Xc=!1,at.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),bh=1,Um(!0),at.forEach(function(i){var s=qi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Um(!1),bh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ut.forEach(function(i){Mn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),d0(bd,1),Wc.pause(),Bs++,In=2,Tr(2),at.forEach(function(i){return Mn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),In=je.isRefreshing=!1,Ws("refresh")},Eh=0,Tc=1,Ya,Tr=function(e){if(e===2||!In&&!Xc){je.isUpdating=!0,Ya&&Ya.update(0);var t=at.length,n=yn(),i=n-tf>=50,s=t&&at[0].scroll();if(Tc=Eh>s?-1:1,In||(Eh=s),i&&(Ri&&!iu&&n-Ri>200&&(Ri=0,Ws("scrollEnd")),Ea=tf,tf=n),Tc<0){for(Ln=t;Ln-- >0;)at[Ln]&&at[Ln].update(0,i);Tc=1}else for(Ln=0;Ln<t;Ln++)at[Ln]&&at[Ln].update(0,i);je.isUpdating=!1}ll=0},wh=[l0,c0,wd,Ed,xi+Xa,xi+Ha,xi+Wa,xi+Ga,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ec=wh.concat([Fs,Os,"boxSizing","max"+ta,"max"+Ad,"position",xi,jt,jt+Wa,jt+Ha,jt+Xa,jt+Ga]),Dw=function(e,t,n){No(n);var i=e._gsap;if(i.spacerIsNative)No(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},sf=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=wh.length,o=t.style,a=e.style,l;s--;)l=wh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[wd]=a[Ed]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Fs]=Yc(e,Fn)+nn,o[Os]=Yc(e,rn)+nn,o[jt]=a[xi]=a[c0]=a[l0]="0",No(i),a[Fs]=a["max"+ta]=n[Fs],a[Os]=a["max"+Ad]=n[Os],a[jt]=n[jt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Lw=/([A-Z])/g,No=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Le.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(Lw,"-$1").toLowerCase())}},Jl=function(e){for(var t=Ec.length,n=e.style,i=[],s=0;s<t;s++)i.push(Ec[s],n[Ec[s]]);return i.t=e,i},Iw=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},wc={left:0,top:0},Fm=function(e,t,n,i,s,o,a,l,c,u,f,h,d,g){Mn(e)&&(e=e(l)),ni(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?Mc("0"+e.substr(3),n):0));var _=d?d.time():0,m,p,M;if(d&&d.seek(0),isNaN(e)||(e=+e),Ra(e))d&&(e=Le.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),a&&bc(a,n,i,!0);else{Mn(t)&&(t=t(l));var y=(e||"0").split(" "),x,w,A,T;M=Hn(t,l)||Mt,x=pr(M)||{},(!x||!x.left&&!x.top)&&vi(M).display==="none"&&(T=M.style.display,M.style.display="block",x=pr(M),T?M.style.display=T:M.style.removeProperty("display")),w=Mc(y[0],x[i.d]),A=Mc(y[1]||"0",n),e=x[i.p]-c[i.p]-u+w+s-A,a&&bc(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var C=e+n,b=o._isStart;m="scroll"+i.d2,bc(o,C,i,b&&C>20||!b&&(f?Math.max(Mt[m],ri[m]):o.parentNode[m])<=C+1),f&&(c=pr(a),f&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+nn))}return d&&M&&(m=pr(M),d.seek(h),p=pr(M),d._caScrollDist=m[i.p]-p[i.p],e=e/d._caScrollDist*h),d&&d.seek(_),d?e:Math.round(e)},Nw=/(webkit|moz|length|cssText|inset)/i,Om=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Mt){e._stOrig=s.cssText,a=vi(e);for(o in a)!+o&&!Nw.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Le.core.getCache(e).uncache=1,t.appendChild(e)}},m0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Ql=function(e,t,n){var i={};i[t.p]="+="+n,Le.set(e,i)},Bm=function(e,t){var n=os(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,f){var h=o.tween,d=l.onComplete,g={};c=c||n();var _=m0(n,c,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,h&&h.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){ut.cache++,o.tween&&Tr()},l.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=Le.to(e,l),h};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(e,"wheel",n.wheelHandler),je.isTouch&&un(e,"touchmove",n.wheelHandler),s},je=function(){function r(t,n){go||r.register(Le)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Mh(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!wa){this.update=this.refresh=this.kill=Hi;return}n=Dm(ni(n)||Ra(n)||n.nodeType?{trigger:n}:n,jl);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,M=s.onSnapComplete,y=s.once,x=s.snap,w=s.pinReparent,A=s.pinSpacer,T=s.containerAnimation,C=s.fastScrollEnd,b=s.preventOverlaps,v=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Fn:rn,P=!f&&f!==0,U=Hn(n.scroller||ct),B=Le.core.getCache(U),W=Hs(U),Z=("pinType"in n?n.pinType:is(U,"pinType")||W&&"fixed")==="fixed",X=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],H=P&&n.toggleActions.split(" "),k="markers"in n?n.markers:jl.markers,re=W?0:parseFloat(vi(U)["border"+v.p2+ta])||0,L=this,pe=n.onRefreshInit&&function(){return n.onRefreshInit(L)},Fe=Tw(U,W,v),Ye=Ew(U,W),j=0,ue=0,oe=0,le=os(U,v),de,De,Re,We,Xe,ye,D,Ke,He,G,be,ee,N,J,Me,R,S,O,Q,K,q,me,ae,Se,ne,ce,ve,Oe,Be,ge,Ge,I,xe,se,he,ie,te,Ce,Ie;if(L._startClamp=L._endClamp=!1,L._dir=v,m*=45,L.scroller=U,L.scroll=T?T.time.bind(T):le,We=le(),L.vars=n,i=i||n.animation,"refreshPriority"in n&&(e0=1,n.refreshPriority===-9999&&(Ya=L)),B.tweenScroll=B.tweenScroll||{top:Bm(U,rn),left:Bm(U,Fn)},L.tweenTo=de=B.tweenScroll[v.p],L.scrubDuration=function(Ee){xe=Ra(Ee)&&Ee,xe?I?I.duration(Ee):I=Le.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:xe,paused:!0,onComplete:function(){return p&&p(L)}}):(I&&I.progress(1).kill(),I=0)},i&&(i.vars.lazy=!1,i._initted&&!L.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),L.animation=i.pause(),i.scrollTrigger=L,L.scrubDuration(f),ge=0,l||(l=i.vars.id)),x&&((!Ts(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in Mt.style&&Le.set(W?[Mt,ri]:U,{scrollBehavior:"auto"}),ut.forEach(function(Ee){return Mn(Ee)&&Ee.target===(W?Nt.scrollingElement||ri:U)&&(Ee.smooth=!1)}),Re=Mn(x.snapTo)?x.snapTo:x.snapTo==="labels"?Aw(i):x.snapTo==="labelsDirectional"?Rw(i):x.directional!==!1?function(Ee,Je){return Rd(x.snapTo)(Ee,yn()-ue<500?0:Je.direction)}:Le.utils.snap(x.snapTo),se=x.duration||{min:.1,max:2},se=Ts(se)?Va(se.min,se.max):Va(se,se),he=Le.delayedCall(x.delay||xe/2||.1,function(){var Ee=le(),Je=yn()-ue<500,ke=de.tween;if((Je||Math.abs(L.getVelocity())<10)&&!ke&&!iu&&j!==Ee){var Ze=(Ee-ye)/J,Yt=i&&!P?i.totalProgress():Ze,lt=Je?0:(Yt-Ge)/(yn()-Ea)*1e3||0,It=Le.utils.clamp(-Ze,1-Ze,ho(lt/2)*lt/.185),Qt=Ze+(x.inertia===!1?0:It),At,Rt,yt=x,Kn=yt.onStart,Ut=yt.onInterrupt,Tn=yt.onComplete;if(At=Re(Qt,L),Ra(At)||(At=Qt),Rt=Math.max(0,Math.round(ye+At*J)),Ee<=D&&Ee>=ye&&Rt!==Ee){if(ke&&!ke._initted&&ke.data<=ho(Rt-Ee))return;x.inertia===!1&&(It=At-Ze),de(Rt,{duration:se(ho(Math.max(ho(Qt-Yt),ho(At-Yt))*.185/lt/.05||0)),ease:x.ease||"power3",data:ho(Rt-Ee),onInterrupt:function(){return he.restart(!0)&&Ut&&Ut(L)},onComplete:function(){L.update(),j=le(),i&&!P&&(I?I.resetTo("totalProgress",At,i._tTime/i._tDur):i.progress(At)),ge=Ge=i&&!P?i.totalProgress():L.progress,M&&M(L),Tn&&Tn(L)}},Ee,It*J,Rt-Ee-It*J),Kn&&Kn(L,de.tween)}}else L.isActive&&j!==Ee&&he.restart(!0)}).pause()),l&&(Th[l]=L),h=L.trigger=Hn(h||d!==!0&&d),Ie=h&&h._gsap&&h._gsap.stRevert,Ie&&(Ie=Ie(L)),d=d===!0?h:Hn(d),ni(a)&&(a={targets:h,className:a}),d&&(g===!1||g===xi||(g=!g&&d.parentNode&&d.parentNode.style&&vi(d.parentNode).display==="flex"?!1:jt),L.pin=d,De=Le.core.getCache(d),De.spacer?Me=De.pinState:(A&&(A=Hn(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),De.spacerIsNative=!!A,A&&(De.spacerState=Jl(A))),De.spacer=O=A||Nt.createElement("div"),O.classList.add("pin-spacer"),l&&O.classList.add("pin-spacer-"+l),De.pinState=Me=Jl(d)),n.force3D!==!1&&Le.set(d,{force3D:!0}),L.spacer=O=De.spacer,Be=vi(d),Se=Be[g+v.os2],K=Le.getProperty(d),q=Le.quickSetter(d,v.a,nn),sf(d,O,Be),S=Jl(d)),k){ee=Ts(k)?Dm(k,Lm):Lm,G=Zl("scroller-start",l,U,v,ee,0),be=Zl("scroller-end",l,U,v,ee,0,G),Q=G["offset"+v.op.d2];var ft=Hn(is(U,"content")||U);Ke=this.markerStart=Zl("start",l,ft,v,ee,Q,0,T),He=this.markerEnd=Zl("end",l,ft,v,ee,Q,0,T),T&&(Ce=Le.quickSetter([Ke,He],v.a,nn)),!Z&&!(ji.length&&is(U,"fixedMarkers")===!0)&&(ww(W?Mt:U),Le.set([G,be],{force3D:!0}),ce=Le.quickSetter(G,v.a,nn),Oe=Le.quickSetter(be,v.a,nn))}if(T){var Te=T.vars.onUpdate,Ue=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){L.update(0,0,1),Te&&Te.apply(T,Ue||[])})}if(L.previous=function(){return at[at.indexOf(L)-1]},L.next=function(){return at[at.indexOf(L)+1]},L.revert=function(Ee,Je){if(!Je)return L.kill(!0);var ke=Ee!==!1||!L.enabled,Ze=vn;ke!==L.isReverted&&(ke&&(ie=Math.max(le(),L.scroll.rec||0),oe=L.progress,te=i&&i.progress()),Ke&&[Ke,He,G,be].forEach(function(Yt){return Yt.style.display=ke?"none":"block"}),ke&&(vn=L,L.update(ke)),d&&(!w||!L.isActive)&&(ke?Dw(d,O,Me):sf(d,O,vi(d),ne)),ke||L.update(ke),vn=Ze,L.isReverted=ke)},L.refresh=function(Ee,Je,ke,Ze){if(!((vn||!L.enabled)&&!Je)){if(d&&Ee&&Ri){un(r,"scrollEnd",f0);return}!In&&pe&&pe(L),vn=L,de.tween&&!ke&&(de.tween.kill(),de.tween=0),I&&I.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren&&i.getChildren(!0,!0,!1).forEach(function(Qe){return Qe.vars.immediateRender&&Qe.render(0,!0,!0)})),L.isReverted||L.revert(!0,!0),L._subPinOffset=!1;var Yt=Fe(),lt=Ye(),It=T?T.duration():qi(U,v),Qt=J<=.01||!J,At=0,Rt=Ze||0,yt=Ts(ke)?ke.end:n.end,Kn=n.endTrigger||h,Ut=Ts(ke)?ke.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),Tn=L.pinnedContainer=n.pinnedContainer&&Hn(n.pinnedContainer,L),fi=h&&Math.max(0,at.indexOf(L))||0,en=fi,tn,E,z,$,Y,F,fe,we,Ne,Pe,Ve,qe,ze;for(k&&Ts(ke)&&(qe=Le.getProperty(G,v.p),ze=Le.getProperty(be,v.p));en-- >0;)F=at[en],F.end||F.refresh(0,1)||(vn=L),fe=F.pin,fe&&(fe===h||fe===d||fe===Tn)&&!F.isReverted&&(Pe||(Pe=[]),Pe.unshift(F),F.revert(!0,!0)),F!==at[en]&&(fi--,en--);for(Mn(Ut)&&(Ut=Ut(L)),Ut=Am(Ut,"start",L),ye=Fm(Ut,h,Yt,v,le(),Ke,G,L,lt,re,Z,It,T,L._startClamp&&"_startClamp")||(d?-.001:0),Mn(yt)&&(yt=yt(L)),ni(yt)&&!yt.indexOf("+=")&&(~yt.indexOf(" ")?yt=(ni(Ut)?Ut.split(" ")[0]:"")+yt:(At=Mc(yt.substr(2),Yt),yt=ni(Ut)?Ut:(T?Le.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,ye):ye)+At,Kn=h)),yt=Am(yt,"end",L),D=Math.max(ye,Fm(yt||(Kn?"100% 0":It),Kn,Yt,v,le()+At,He,be,L,lt,re,Z,It,T,L._endClamp&&"_endClamp"))||-.001,At=0,en=fi;en--;)F=at[en],fe=F.pin,fe&&F.start-F._pinPush<=ye&&!T&&F.end>0&&(tn=F.end-(L._startClamp?Math.max(0,F.start):F.start),(fe===h&&F.start-F._pinPush<ye||fe===Tn)&&isNaN(Ut)&&(At+=tn*(1-F.progress)),fe===d&&(Rt+=tn));if(ye+=At,D+=At,L._startClamp&&(L._startClamp+=At),L._endClamp&&!In&&(L._endClamp=D||-.001,D=Math.min(D,qi(U,v))),J=D-ye||(ye-=.01)&&.001,Qt&&(oe=Le.utils.clamp(0,1,Le.utils.normalize(ye,D,ie))),L._pinPush=Rt,Ke&&At&&(tn={},tn[v.a]="+="+At,Tn&&(tn[v.p]="-="+le()),Le.set([Ke,He],tn)),d&&!(bh&&L.end>=qi(U,v)))tn=vi(d),$=v===rn,z=le(),me=parseFloat(K(v.a))+Rt,!It&&D>1&&(Ve=(W?Nt.scrollingElement||ri:U).style,Ve={style:Ve,value:Ve["overflow"+v.a.toUpperCase()]},W&&vi(Mt)["overflow"+v.a.toUpperCase()]!=="scroll"&&(Ve.style["overflow"+v.a.toUpperCase()]="scroll")),sf(d,O,tn),S=Jl(d),E=pr(d,!0),we=Z&&os(U,$?Fn:rn)(),g?(ne=[g+v.os2,J+Rt+nn],ne.t=O,en=g===jt?Yc(d,v)+J+Rt:0,en&&(ne.push(v.d,en+nn),O.style.flexBasis!=="auto"&&(O.style.flexBasis=en+nn)),No(ne),Tn&&at.forEach(function(Qe){Qe.pin===Tn&&Qe.vars.pinSpacing!==!1&&(Qe._subPinOffset=!0)}),Z&&le(ie)):(en=Yc(d,v),en&&O.style.flexBasis!=="auto"&&(O.style.flexBasis=en+nn)),Z&&(Y={top:E.top+($?z-ye:we)+nn,left:E.left+($?we:z-ye)+nn,boxSizing:"border-box",position:"fixed"},Y[Fs]=Y["max"+ta]=Math.ceil(E.width)+nn,Y[Os]=Y["max"+Ad]=Math.ceil(E.height)+nn,Y[xi]=Y[xi+Wa]=Y[xi+Ha]=Y[xi+Xa]=Y[xi+Ga]="0",Y[jt]=tn[jt],Y[jt+Wa]=tn[jt+Wa],Y[jt+Ha]=tn[jt+Ha],Y[jt+Xa]=tn[jt+Xa],Y[jt+Ga]=tn[jt+Ga],R=Iw(Me,Y,w),In&&le(0)),i?(Ne=i._initted,Qu(1),i.render(i.duration(),!0,!0),ae=K(v.a)-me+J+Rt,ve=Math.abs(J-ae)>1,Z&&ve&&R.splice(R.length-2,2),i.render(0,!0,!0),Ne||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Qu(0)):ae=J,Ve&&(Ve.value?Ve.style["overflow"+v.a.toUpperCase()]=Ve.value:Ve.style.removeProperty("overflow-"+v.a));else if(h&&le()&&!T)for(E=h.parentNode;E&&E!==Mt;)E._pinOffset&&(ye-=E._pinOffset,D-=E._pinOffset),E=E.parentNode;Pe&&Pe.forEach(function(Qe){return Qe.revert(!1,!0)}),L.start=ye,L.end=D,We=Xe=In?ie:le(),!T&&!In&&(We<ie&&le(ie),L.scroll.rec=0),L.revert(!1,!0),ue=yn(),he&&(j=-1,he.restart(!0)),vn=0,i&&P&&(i._initted||te)&&i.progress()!==te&&i.progress(te||0,!0).render(i.time(),!0,!0),(Qt||oe!==L.progress||T||_||i&&!i._initted)&&(i&&!P&&(i._initted||oe||i.vars.immediateRender!==!1)&&i.totalProgress(T&&ye<-.001&&!oe?Le.utils.normalize(ye,D,0):oe,!0),L.progress=Qt||(We-ye)/J===oe?0:oe),d&&g&&(O._pinOffset=Math.round(L.progress*ae)),I&&I.invalidate(),isNaN(qe)||(qe-=Le.getProperty(G,v.p),ze-=Le.getProperty(be,v.p),Ql(G,v,qe),Ql(Ke,v,qe-(Ze||0)),Ql(be,v,ze),Ql(He,v,ze-(Ze||0))),Qt&&!In&&L.update(),u&&!In&&!N&&(N=!0,u(L),N=!1)}},L.getVelocity=function(){return(le()-Xe)/(yn()-Ea)*1e3||0},L.endAnimation=function(){xa(L.callbackAnimation),i&&(I?I.progress(1):i.paused()?P||xa(i,L.direction<0,1):xa(i,i.reversed()))},L.labelToScroll=function(Ee){return i&&i.labels&&(ye||L.refresh()||ye)+i.labels[Ee]/i.duration()*J||0},L.getTrailing=function(Ee){var Je=at.indexOf(L),ke=L.direction>0?at.slice(0,Je).reverse():at.slice(Je+1);return(ni(Ee)?ke.filter(function(Ze){return Ze.vars.preventOverlaps===Ee}):ke).filter(function(Ze){return L.direction>0?Ze.end<=ye:Ze.start>=D})},L.update=function(Ee,Je,ke){if(!(T&&!ke&&!Ee)){var Ze=In===!0?ie:L.scroll(),Yt=Ee?0:(Ze-ye)/J,lt=Yt<0?0:Yt>1?1:Yt||0,It=L.progress,Qt,At,Rt,yt,Kn,Ut,Tn,fi;if(Je&&(Xe=We,We=T?le():Ze,x&&(Ge=ge,ge=i&&!P?i.totalProgress():lt)),m&&d&&!vn&&!Yl&&Ri&&(!lt&&ye<Ze+(Ze-Xe)/(yn()-Ea)*m?lt=1e-4:lt===1&&D>Ze+(Ze-Xe)/(yn()-Ea)*m&&(lt=.9999)),lt!==It&&L.enabled){if(Qt=L.isActive=!!lt&&lt<1,At=!!It&&It<1,Ut=Qt!==At,Kn=Ut||!!lt!=!!It,L.direction=lt>It?1:-1,L.progress=lt,Kn&&!vn&&(Rt=lt&&!It?0:lt===1?1:It===1?2:3,P&&(yt=!Ut&&H[Rt+1]!=="none"&&H[Rt+1]||H[Rt],fi=i&&(yt==="complete"||yt==="reset"||yt in i))),b&&(Ut||fi)&&(fi||f||!i)&&(Mn(b)?b(L):L.getTrailing(b).forEach(function(z){return z.endAnimation()})),P||(I&&!vn&&!Yl?(I._dp._time-I._start!==I._time&&I.render(I._dp._time-I._start),I.resetTo?I.resetTo("totalProgress",lt,i._tTime/i._tDur):(I.vars.totalProgress=lt,I.invalidate().restart())):i&&i.totalProgress(lt,!!(vn&&(ue||Ee)))),d){if(Ee&&g&&(O.style[g+v.os2]=Se),!Z)q(Aa(me+ae*lt));else if(Kn){if(Tn=!Ee&&lt>It&&D+1>Ze&&Ze+1>=qi(U,v),w)if(!Ee&&(Qt||Tn)){var en=pr(d,!0),tn=Ze-ye;Om(d,Mt,en.top+(v===rn?tn:0)+nn,en.left+(v===rn?0:tn)+nn)}else Om(d,O);No(Qt||Tn?R:S),ve&&lt<1&&Qt||q(me+(lt===1&&!Tn?ae:0))}}x&&!de.tween&&!vn&&!Yl&&he.restart(!0),a&&(Ut||y&&lt&&(lt<1||!ef))&&al(a.targets).forEach(function(z){return z.classList[Qt||y?"add":"remove"](a.className)}),o&&!P&&!Ee&&o(L),Kn&&!vn?(P&&(fi&&(yt==="complete"?i.pause().totalProgress(1):yt==="reset"?i.restart(!0).pause():yt==="restart"?i.restart(!0):i[yt]()),o&&o(L)),(Ut||!ef)&&(c&&Ut&&nf(L,c),X[Rt]&&nf(L,X[Rt]),y&&(lt===1?L.kill(!1,1):X[Rt]=0),Ut||(Rt=lt===1?1:3,X[Rt]&&nf(L,X[Rt]))),C&&!Qt&&Math.abs(L.getVelocity())>(Ra(C)?C:2500)&&(xa(L.callbackAnimation),I?I.progress(1):xa(i,yt==="reverse"?1:!lt,1))):P&&o&&!vn&&o(L)}if(Oe){var E=T?Ze/T.duration()*(T._caScrollDist||0):Ze;ce(E+(G._isFlipped?1:0)),Oe(E)}Ce&&Ce(-Ze/T.duration()*(T._caScrollDist||0))}},L.enable=function(Ee,Je){L.enabled||(L.enabled=!0,un(U,"resize",Ca),W||un(U,"scroll",po),pe&&un(r,"refreshInit",pe),Ee!==!1&&(L.progress=oe=0,We=Xe=j=le()),Je!==!1&&L.refresh())},L.getTween=function(Ee){return Ee&&de?de.tween:I},L.setPositions=function(Ee,Je,ke,Ze){if(T){var Yt=T.scrollTrigger,lt=T.duration(),It=Yt.end-Yt.start;Ee=Yt.start+It*Ee/lt,Je=Yt.start+It*Je/lt}L.refresh(!1,!1,{start:Rm(Ee,ke&&!!L._startClamp),end:Rm(Je,ke&&!!L._endClamp)},Ze),L.update()},L.adjustPinSpacing=function(Ee){if(ne&&Ee){var Je=ne.indexOf(v.d)+1;ne[Je]=parseFloat(ne[Je])+Ee+nn,ne[1]=parseFloat(ne[1])+Ee+nn,No(ne)}},L.disable=function(Ee,Je){if(L.enabled&&(Ee!==!1&&L.revert(!0,!0),L.enabled=L.isActive=!1,Je||I&&I.pause(),ie=0,De&&(De.uncache=1),pe&&cn(r,"refreshInit",pe),he&&(he.pause(),de.tween&&de.tween.kill()&&(de.tween=0)),!W)){for(var ke=at.length;ke--;)if(at[ke].scroller===U&&at[ke]!==L)return;cn(U,"resize",Ca),W||cn(U,"scroll",po)}},L.kill=function(Ee,Je){L.disable(Ee,Je),I&&!Je&&I.kill(),l&&delete Th[l];var ke=at.indexOf(L);ke>=0&&at.splice(ke,1),ke===Ln&&Tc>0&&Ln--,ke=0,at.forEach(function(Ze){return Ze.scroller===L.scroller&&(ke=1)}),ke||In||(L.scroll.rec=0),i&&(i.scrollTrigger=null,Ee&&i.revert({kill:!1}),Je||i.kill()),Ke&&[Ke,He,G,be].forEach(function(Ze){return Ze.parentNode&&Ze.parentNode.removeChild(Ze)}),Ya===L&&(Ya=0),d&&(De&&(De.uncache=1),ke=0,at.forEach(function(Ze){return Ze.pin===d&&ke++}),ke||(De.spacer=0)),n.onKill&&n.onKill(L)},at.push(L),L.enable(!1,!1),Ie&&Ie(L),i&&i.add&&!J){var nt=L.update;L.update=function(){L.update=nt,ut.cache++,ye||D||L.refresh()},Le.delayedCall(.01,L.update),J=.01,ye=D=0}else L.refresh();d&&Pw()},r.register=function(n){return go||(Le=n||s0(),r0()&&window.document&&r.enable(),go=wa),go},r.defaults=function(n){if(n)for(var i in n)jl[i]=n[i];return jl},r.disable=function(n,i){wa=0,at.forEach(function(o){return o[i?"kill":"disable"](n)}),cn(ct,"wheel",po),cn(Nt,"scroll",po),clearInterval(Xl),cn(Nt,"touchcancel",Hi),cn(Mt,"touchstart",Hi),$l(cn,Nt,"pointerdown,touchstart,mousedown",Cm),$l(cn,Nt,"pointerup,touchend,mouseup",Pm),Wc.kill(),ql(cn);for(var s=0;s<ut.length;s+=3)Kl(cn,ut[s],ut[s+1]),Kl(cn,ut[s],ut[s+2])},r.enable=function(){if(ct=window,Nt=document,ri=Nt.documentElement,Mt=Nt.body,Le&&(al=Le.utils.toArray,Va=Le.utils.clamp,Mh=Le.core.context||Hi,Qu=Le.core.suppressOverwrites||Hi,bd=ct.history.scrollRestoration||"auto",Eh=ct.pageYOffset||0,Le.core.globals("ScrollTrigger",r),Mt)){wa=1,Io=document.createElement("div"),Io.style.height="100vh",Io.style.position="absolute",p0(),bw(),$t.register(Le),r.isTouch=$t.isTouch,zr=$t.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Sh=$t.isTouch===1,un(ct,"wheel",po),Md=[ct,Nt,ri,Mt],Le.matchMedia?(r.matchMedia=function(c){var u=Le.matchMedia(),f;for(f in c)u.add(f,c[f]);return u},Le.addEventListener("matchMediaInit",function(){return Cd()}),Le.addEventListener("matchMediaRevert",function(){return h0()}),Le.addEventListener("matchMedia",function(){Ds(0,1),Ws("matchMedia")}),Le.matchMedia().add("(orientation: portrait)",function(){return rf(),rf})):console.warn("Requires GSAP 3.11.0 or later"),rf(),un(Nt,"scroll",po);var n=Mt.hasAttribute("style"),i=Mt.style,s=i.borderTopStyle,o=Le.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=pr(Mt),rn.m=Math.round(a.top+rn.sc())||0,Fn.m=Math.round(a.left+Fn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Mt.setAttribute("style",""),Mt.removeAttribute("style")),Xl=setInterval(Im,250),Le.delayedCall(.5,function(){return Yl=0}),un(Nt,"touchcancel",Hi),un(Mt,"touchstart",Hi),$l(un,Nt,"pointerdown,touchstart,mousedown",Cm),$l(un,Nt,"pointerup,touchend,mouseup",Pm),yh=Le.utils.checkPrefix("transform"),Ec.push(yh),go=yn(),Wc=Le.delayedCall(.2,Ds).pause(),_o=[Nt,"visibilitychange",function(){var c=ct.innerWidth,u=ct.innerHeight;Nt.hidden?(Em=c,wm=u):(Em!==c||wm!==u)&&Ca()},Nt,"DOMContentLoaded",Ds,ct,"load",Ds,ct,"resize",Ca],ql(un),at.forEach(function(c){return c.enable(0,1)}),l=0;l<ut.length;l+=3)Kl(cn,ut[l],ut[l+1]),Kl(cn,ut[l],ut[l+2])}},r.config=function(n){"limitCallbacks"in n&&(ef=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Xl)||(Xl=i)&&setInterval(Im,i),"ignoreMobileResize"in n&&(Sh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ql(cn)||ql(un,n.autoRefreshEvents||"none"),t0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Hn(n),o=ut.indexOf(s),a=Hs(s);~o&&ut.splice(o,a?6:2),i&&(a?ji.unshift(ct,i,Mt,i,ri,i):ji.unshift(s,i))},r.clearMatchMedia=function(n){at.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(ni(n)?Hn(n):n).getBoundingClientRect(),a=o[s?Fs:Os]*i||0;return s?o.right-a>0&&o.left+a<ct.innerWidth:o.bottom-a>0&&o.top+a<ct.innerHeight},r.positionInViewport=function(n,i,s){ni(n)&&(n=Hn(n));var o=n.getBoundingClientRect(),a=o[s?Fs:Os],l=i==null?a/2:i in qc?qc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/ct.innerWidth:(o.top+l)/ct.innerHeight},r.killAll=function(n){if(at.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Gs.killAll||[];Gs={},i.forEach(function(s){return s()})}},r}();je.version="3.13.0";je.saveStyles=function(r){return r?al(r).forEach(function(e){if(e&&e.style){var t=ti.indexOf(e);t>=0&&ti.splice(t,5),ti.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Le.core.getCache(e),Mh())}}):ti};je.revert=function(r,e){return Cd(!r,e)};je.create=function(r,e){return new je(r,e)};je.refresh=function(r){return r?Ca(!0):(go||je.register())&&Ds(!0)};je.update=function(r){return++ut.cache&&Tr(r===!0?2:0)};je.clearScrollMemory=d0;je.maxScroll=function(r,e){return qi(r,e?Fn:rn)};je.getScrollFunc=function(r,e){return os(Hn(r),e?Fn:rn)};je.getById=function(r){return Th[r]};je.getAll=function(){return at.filter(function(r){return r.vars.id!=="ScrollSmoother"})};je.isScrolling=function(){return!!Ri};je.snapDirectional=Rd;je.addEventListener=function(r,e){var t=Gs[r]||(Gs[r]=[]);~t.indexOf(e)||t.push(e)};je.removeEventListener=function(r,e){var t=Gs[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};je.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var f=[],h=[],d=Le.delayedCall(i,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Mn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Mn(s)&&(s=s(),un(je,"refresh",function(){return s=e.batchMax()})),al(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(je.create(c))}),t};var km=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},of=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+($t.isTouch?" pinch-zoom":""):"none",e===ri&&r(Mt,t)},ec={auto:1,scroll:1},Uw=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Le.core.getCache(s),a=yn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Mt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ec[(l=vi(s)).overflowY]||ec[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Hs(s)&&(ec[(l=vi(s)).overflowY]||ec[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},g0=function(e,t,n,i){return $t.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&Uw,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&un(Nt,$t.eventTypes[0],Vm,!1,!0)},onDisable:function(){return cn(Nt,$t.eventTypes[0],Vm,!0)}})},Fw=/(input|label|select|textarea)/i,zm,Vm=function(e){var t=Fw.test(e.target.tagName);(t||zm)&&(e._gsapAllow=!0,zm=t)},Ow=function(e){Ts(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Hn(e.target)||ri,u=Le.core.globals().ScrollSmoother,f=u&&u.get(),h=zr&&(e.content&&Hn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=os(c,rn),g=os(c,Fn),_=1,m=($t.isTouch&&ct.visualViewport?ct.visualViewport.scale*ct.visualViewport.width:ct.outerWidth)/ct.innerWidth,p=0,M=Mn(i)?function(){return i(a)}:function(){return i||2.8},y,x,w=g0(c,e.type,!0,s),A=function(){return x=!1},T=Hi,C=Hi,b=function(){l=qi(c,rn),C=Va(zr?1:0,l),n&&(T=Va(0,qi(c,Fn))),y=Bs},v=function(){h._gsap.y=Aa(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},P=function(){if(x){requestAnimationFrame(A);var k=Aa(a.deltaY/2),re=C(d.v-k);if(h&&re!==d.v+d.offset){d.offset=re-d.v;var L=Aa((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+L+", 0, 1)",h._gsap.y=L+"px",d.cacheID=ut.cache,Tr()}return!0}d.offset&&v(),x=!0},U,B,W,Z,X=function(){b(),U.isActive()&&U.vars.scrollY>l&&(d()>l?U.progress(1)&&d(l):U.resetTo("scrollY",l))};return h&&Le.set(h,{y:"+=0"}),e.ignoreCheck=function(H){return zr&&H.type==="touchmove"&&P()||_>1.05&&H.type!=="touchstart"||a.isGesturing||H.touches&&H.touches.length>1},e.onPress=function(){x=!1;var H=_;_=Aa((ct.visualViewport&&ct.visualViewport.scale||1)/m),U.pause(),H!==_&&of(c,_>1.01?!0:n?!1:"x"),B=g(),W=d(),b(),y=Bs},e.onRelease=e.onGestureStart=function(H,k){if(d.offset&&v(),!k)Z.restart(!0);else{ut.cache++;var re=M(),L,pe;n&&(L=g(),pe=L+re*.05*-H.velocityX/.227,re*=km(g,L,pe,qi(c,Fn)),U.vars.scrollX=T(pe)),L=d(),pe=L+re*.05*-H.velocityY/.227,re*=km(d,L,pe,qi(c,rn)),U.vars.scrollY=C(pe),U.invalidate().duration(re).play(.01),(zr&&U.vars.scrollY>=l||L>=l-1)&&Le.to({},{onUpdate:X,duration:re})}o&&o(H)},e.onWheel=function(){U._ts&&U.pause(),yn()-p>1e3&&(y=0,p=yn())},e.onChange=function(H,k,re,L,pe){if(Bs!==y&&b(),k&&n&&g(T(L[2]===k?B+(H.startX-H.x):g()+k-L[1])),re){d.offset&&v();var Fe=pe[2]===re,Ye=Fe?W+H.startY-H.y:d()+re-pe[1],j=C(Ye);Fe&&Ye!==j&&(W+=j-Ye),d(j)}(re||k)&&Tr()},e.onEnable=function(){of(c,n?!1:"x"),je.addEventListener("refresh",X),un(ct,"resize",X),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),w.enable()},e.onDisable=function(){of(c,!0),cn(ct,"resize",X),je.removeEventListener("refresh",X),w.kill()},e.lockAxis=e.lockAxis!==!1,a=new $t(e),a.iOS=zr,zr&&!d()&&d(1),zr&&Le.ticker.add(Hi),Z=a._dc,U=Le.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:m0(d,d(),function(){return U.pause()})},onUpdate:Tr,onComplete:Z.vars.onComplete}),a};je.sort=function(r){if(Mn(r))return at.sort(r);var e=ct.pageYOffset||0;return je.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ct.innerHeight}),at.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};je.observe=function(r){return new $t(r)};je.normalizeScroll=function(r){if(typeof r>"u")return Dn;if(r===!0&&Dn)return Dn.enable();if(r===!1){Dn&&Dn.kill(),Dn=r;return}var e=r instanceof $t?r:Ow(r);return Dn&&Dn.target===e.target&&Dn.kill(),Hs(e.target)&&(Dn=e),e};je.core={_getVelocityProp:vh,_inputObserver:g0,_scrollers:ut,_proxies:ji,bridge:{ss:function(){Ri||Ws("scrollStart"),Ri=yn()},ref:function(){return vn}}};s0()&&Le.registerPlugin(je);/*!
 * DrawSVGPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var $i,Pd,$c,_0,x0,Hm,Ah,v0,y0=function(){return typeof window<"u"},S0=function(){return $i||y0()&&($i=window.gsap)&&$i.registerPlugin&&$i},Bw=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,af={rect:["width","height"],circle:["r","r"],ellipse:["rx","ry"],line:["x2","y2"]},Rs=function(e){return Math.round(e*1e4)/1e4},Sr=function(e){return parseFloat(e)||0},Gm=function(e,t){var n=Sr(e);return~e.indexOf("%")?n/100*t:n},tc=function(e,t){return Sr(e.getAttribute(t))},Ac=Math.sqrt,Wm=function(e,t,n,i,s,o){return Ac(Math.pow((Sr(n)-Sr(e))*s,2)+Math.pow((Sr(i)-Sr(t))*o,2))},Xm=function(e){return console.warn(e)},M0=function(e){return e.getAttribute("vector-effect")==="non-scaling-stroke"},kw=1,zw=function(e,t,n){var i=e.indexOf(" "),s,o;return i<0?(s=n!==void 0?n+"":e,o=e):(s=e.substr(0,i),o=e.substr(i+1)),s=Gm(s,t),o=Gm(o,t),s>o?[o,s]:[s,o]},Rc=function(e){if(e=Pd(e)[0],!e)return 0;var t=e.tagName.toLowerCase(),n=e.style,i=1,s=1,o,a,l,c,u,f,h;M0(e)&&(s=e.getScreenCTM(),i=Ac(s.a*s.a+s.b*s.b),s=Ac(s.d*s.d+s.c*s.c));try{a=e.getBBox()}catch{Xm("Some browsers won't measure invisible elements (like display:none or masks inside defs).")}var d=a||{x:0,y:0,width:0,height:0},g=d.x,_=d.y,m=d.width,p=d.height;if((!a||!m&&!p)&&af[t]&&(m=tc(e,af[t][0]),p=tc(e,af[t][1]),t!=="rect"&&t!=="line"&&(m*=2,p*=2),t==="line"&&(g=tc(e,"x1"),_=tc(e,"y1"),m=Math.abs(m-g),p=Math.abs(p-_))),t==="path")c=n.strokeDasharray,n.strokeDasharray="none",o=e.getTotalLength()||0,Rs(i)!==Rs(s)&&!Hm&&(Hm=1)&&Xm("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."),o*=(i+s)/2,n.strokeDasharray=c;else if(t==="rect")o=m*2*i+p*2*s;else if(t==="line")o=Wm(g,_,g+m,_+p,i,s);else if(t==="polyline"||t==="polygon")for(l=e.getAttribute("points").match(Bw)||[],t==="polygon"&&l.push(l[0],l[1]),o=0,u=2;u<l.length;u+=2)o+=Wm(l[u-2],l[u-1],l[u],l[u+1],i,s)||0;else(t==="circle"||t==="ellipse")&&(f=m/2*i,h=p/2*s,o=Math.PI*(3*(f+h)-Ac((3*f+h)*(f+3*h))));return o||0},Ym=function(e,t){if(e=Pd(e)[0],!e)return[0,0];t||(t=Rc(e)+1);var n=$c.getComputedStyle(e),i=n.strokeDasharray||"",s=Sr(n.strokeDashoffset),o=i.indexOf(",");return o<0&&(o=i.indexOf(" ")),i=o<0?t:Sr(i.substr(0,o)),i>t&&(i=t),[-s||0,i-s||0]},qm=function(){y0()&&($c=window,x0=$i=S0(),Pd=$i.utils.toArray,Ah=$i.core.getStyleSaver,v0=$i.core.reverting||function(){},_0=(($c.navigator||{}).userAgent||"").indexOf("Edge")!==-1)},Dd={version:"3.13.0",name:"drawSVG",register:function(e){$i=e,qm()},init:function(e,t,n,i,s){if(!e.getBBox)return!1;x0||qm();var o=Rc(e),a,l,c;return this.styles=Ah&&Ah(e,"strokeDashoffset,strokeDasharray,strokeMiterlimit"),this.tween=n,this._style=e.style,this._target=e,t+""=="true"?t="0 100%":t?(t+"").indexOf(" ")===-1&&(t="0 "+t):t="0 0",a=Ym(e,o),l=zw(t,o,a[0]),this._length=Rs(o),this._dash=Rs(a[1]-a[0]),this._offset=Rs(-a[0]),this._dashPT=this.add(this,"_dash",this._dash,Rs(l[1]-l[0]),0,0,0,0,0,1),this._offsetPT=this.add(this,"_offset",this._offset,Rs(-l[0]),0,0,0,0,0,1),_0&&(c=$c.getComputedStyle(e),c.strokeLinecap!==c.strokeLinejoin&&(l=Sr(c.strokeMiterlimit),this.add(e.style,"strokeMiterlimit",l,l+.01))),this._live=M0(e)||~(t+"").indexOf("live"),this._nowrap=~(t+"").indexOf("nowrap"),this._props.push("drawSVG"),kw},render:function(e,t){if(t.tween._time||!v0()){var n=t._pt,i=t._style,s,o,a,l;if(n){for(t._live&&(s=Rc(t._target),s!==t._length&&(o=s/t._length,t._length=s,t._offsetPT&&(t._offsetPT.s*=o,t._offsetPT.c*=o),t._dashPT?(t._dashPT.s*=o,t._dashPT.c*=o):t._dash*=o));n;)n.r(e,n.d),n=n._next;a=t._dash||e&&e!==1&&1e-4||0,s=t._length-a+.1,l=t._offset,a&&l&&a+Math.abs(l%t._length)>t._length-.05&&(l+=l<0?.005:-.005)&&(s+=.005),i.strokeDashoffset=a?l:l+.001,i.strokeDasharray=s<.1?"none":a?a+"px,"+(t._nowrap?999999:s)+"px":"0px, 999999px"}}else t.styles.revert()},getLength:Rc,getPosition:Ym};S0()&&$i.registerPlugin(Dd);const Rh={mobile:768,tablet:1024};let Mr="desktop",Ld=[];function Id(){const r=window.innerWidth;return r<Rh.mobile?"mobile":r<Rh.tablet?"tablet":"desktop"}function Bi(){return Mr}function Nd(r){const e=yo[r]||yo.desktop;return typeof e.start.scale!="number"||isNaN(e.start.scale)?(console.warn(`Invalid start scale for ${r}:`,e.start.scale,"falling back to desktop"),yo.desktop):typeof e.target.scale!="number"||isNaN(e.target.scale)?(console.warn(`Invalid target scale for ${r}:`,e.target.scale,"falling back to desktop"),yo.desktop):e}function b0(){const e=Id();if(console.log("Checking state change:",{currentState:Mr,newState:e,windowWidth:window.innerWidth}),e!==Mr){const t=Mr;return Mr=e,console.log("State changed!",{from:t,to:e,windowWidth:window.innerWidth}),Ld.forEach(n=>{n(e,t)}),!0}return!1}function T0(r){Ld.push(r)}function E0(){Mr=Id(),window.addEventListener("resize",()=>{console.log("Window resized to:",window.innerWidth),b0()}),console.log("Breakpoint detection initialized. Current state:",Mr)}function xo(r){if(yo[r]){const e=Mr;return Mr=r,console.log("Debug: State manually changed to:",r),Ld.forEach(t=>{t(r,e)}),!0}else return console.error("Debug: Invalid state:",r),!1}const Vw=Object.freeze(Object.defineProperty({__proto__:null,BREAKPOINTS:Rh,debugSetState:xo,getAnimationState:Nd,getCurrentAnimationState:Bi,getCurrentBreakpoint:Id,hasStateChanged:b0,initializeBreakpointDetection:E0,onStateChange:T0},Symbol.toStringTag,{value:"Module"}));_e.registerPlugin(je,Dd);let Uo,Cc={x:0,y:0,z:0},Pc={x:3,y:3,z:3},Pt,Ch=0,$m=0,Wt,Cs,Ud;function Hw(r,e,t){if(Wt=r,Cs=e,Ud=t,!Wt)return;Cc={x:Wt.position.x,y:Wt.position.y,z:Wt.position.z},Pc={x:Wt.scale.x,y:Wt.scale.y,z:Wt.scale.z},"scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo(0,0),window.isInitialLoadComplete=!1;const n=_e.timeline().to(Wt.scale,{x:()=>Cs().scale,y:()=>Cs().scale,z:()=>Cs().scale,duration:1.5,ease:"power2.out"}).add(()=>{console.log("Initial GSAP scale animation complete - mesh now at START scale",{at:Date.now(),startScale:Cs().scale,wrapperScale:Wt.scale.x}),window.isInitialLoadComplete=!0,window.scrollScaleActive=!0;try{_e.killTweensOf(Wt.scale)}catch{}w0(),window.smoother&&(window.smoother.effects("body",{speed:1}),console.log("ScrollSmoother effects restored - normal scrolling enabled"))});window.smoother&&(window.smoother.effects("body",{speed:0}),console.log("ScrollSmoother effects disabled - scrolling prevented during mesh animation")),n.play(),T0((i,s)=>{console.log("ScrollTrigger: State changed, recreating animation",{from:s,to:i}),Gw()}),qw(),console.log("Scroll animation setup complete")}function w0(){Uo&&Uo.kill();try{_e.killTweensOf(Wt?.scale)}catch{}Uo=_e.timeline({scrollTrigger:{trigger:".section[data-section='1']",start:"top top",end:"bottom 30%",scrub:er.scrubDuration,onUpdate:r=>{if(window.isInitialLoadComplete){const e=r.progress,t=r.direction;Xw(t);const n=Ud(),i=Cs();Wt.position.x=_e.utils.interpolate(i.x,n.x,e),Wt.userData.targetY=_e.utils.interpolate(i.y,n.y,e),Wt.position.z=_e.utils.interpolate(i.z,n.z,e);const s=_e.utils.interpolate(i.scale||er.startScale,n.scale,e);Wt.scale.setScalar(s),console.log("S1 scroll debug",{progress:e,startScale:i.scale,targetScale:n.scale,currentScale:s,wrapperScale:Wt.scale.x,at:Date.now()})}}}})}function Gw(){Wt&&Cs&&Ud&&(Uo&&Uo.kill(),w0(),console.log("Scroll animation recreated for new state"))}function Ww(){Wt&&Uo&&(Wt.position.set(Cc.x,Cc.y,Cc.z),Wt.scale.set(Pc.x,Pc.y,Pc.z),delete Wt.userData.targetY,console.log("Scroll animation reset to original position"))}function Xw(r){const e=Date.now(),t=e-$m;r!==0&&(Ch+=r*er.spinIntensity),t>16&&(Ch*=er.spinDecay,$m=e)}function Yw(){return Ch}function qw(){console.log("Setting up Section 2 with 4-phase animation sequence"),console.log("Section 2 pinning will be handled by master timeline");const r=document.querySelector("section[data-section='2']");document.getElementById("smooth-content"),r?_e.context(()=>{s(r)},r):s(r);let e=!1,t=null;const n=o=>{if(e||o&&o===t)return;e=!0,o&&(t=o);try{Pt&&(Pt.scrollTrigger&&Pt.scrollTrigger.kill(),Pt.kill(),Pt=null)}catch(l){console.warn("Section 2 teardown warning (matchMedia):",l)}const a=document.querySelector("section[data-section='2']");a?_e.context(()=>{s(a,document.getElementById("smooth-content"))},a):s(a,document.getElementById("smooth-content")),requestAnimationFrame(()=>{try{je.refresh()}catch{}e=!1})},i=_e.matchMedia();i.add("(max-width: 767px)",()=>n("mobile")),i.add("(min-width: 768px) and (max-width: 1023px)",()=>n("tablet")),i.add("(min-width: 1024px)",()=>n("desktop"));function s(o,a){if(Pt&&Pt.scrollTrigger)try{Pt.scrollTrigger.kill()}catch{}if(Pt)try{Pt.kill()}catch{}Pt=_e.timeline({scrollTrigger:{trigger:o||"section[data-section='2']",start:"top top",end:()=>"+="+Math.round((Pt?Pt.totalDuration():4)*qg?.pxPerSecond),pin:!0,anticipatePin:1,invalidateOnRefresh:!0,scrub:!0}});const l=$w();Pt.add(l,0);const c=_e.timeline(),u=_e.timeline(),f=()=>window.lineGroups?.vertical??[],h=()=>window.lineGroups?.horizontal??[];c.addLabel("start",0),c.add(()=>{const y=f().length;if(!y)return;const x=Math.max(.01,tt.lineDrawSingle),w=y>1?Math.max(0,(tt.drawVerticalLinesTotal-x)/(y-1)):0;f().forEach((A,T)=>{c.to(A,{drawSVG:"0% 100%",ease:"none",duration:x},T*w)})},"start"),Pt.add(c,`+=${tt.drawVerticalLinesOffset}`),Pt.add(u,`>+=${tt.drawHorizontalLinesOffset}`),u.add(()=>{const y=h().length;if(!y)return;const x=Math.max(.01,tt.lineDrawSingle),w=y>1?Math.max(0,(tt.drawHorizontalLinesTotal-x)/(y-1)):0;h().forEach((A,T)=>{u.to(A,{drawSVG:"0% 100%",ease:"none",duration:x},T*w)})},0);const d=Jw();Pt.add(d,">-");const g=Qw();Pt.add(g,">-");const _=Kw();Pt.add(_,`>+=${tt.delayAfterGridDraw}`);const m=jw();Pt.add(m,`>+=${tt.delayAfterRotation}`);const p=Zw();Pt.add(p,`>+=${tt.delayAfterRotationOLDNOW}`);try{const y=document.querySelector(".key-metrics-title");if(y){const x=getComputedStyle(y),w="#FFFFFF",A=parseFloat(x.fontSize),T=4,C=20;_e.set(y,{opacity:0,position:x.position==="static"?"relative":x.position});const b=document.createElement("div");b.className="key-metrics-highlight",y.appendChild(b),_e.set(b,{position:"absolute",left:`${-T}px`,top:`${-C}px`,height:`${A+C*2}px`,width:0,backgroundColor:w,zIndex:1,pointerEvents:"none"});const v=()=>{const P=y.getBoundingClientRect();return Math.max(T*2,P.width+T*2)};Pt.to(b,{width:()=>v(),duration:tt.highlightExpand,ease:"none"},`>+=${tt.delayBeforeTitle}`),Pt.to(y,{opacity:1,duration:tt.labelReveal,ease:"none"},">"),Pt.to(b,{width:0,left:()=>`${-T+v()}px`,duration:tt.highlightShrink,ease:"none"},">")}}catch{}const M=eA();Pt.add(M,`>+=${tt.delayBeforeFirstBlock}`);try{let y=[];if(window.lineGroups&&window.lineGroups.all&&typeof window.lineGroups.all.length=="number"&&window.lineGroups.all.length>0)y=window.lineGroups.all;else{const x=document.getElementById("lines-svg");if(x&&typeof x.querySelectorAll=="function"){const w=x.querySelectorAll("path.line");y=Array.prototype.slice.call(w)}}y&&typeof y.length=="number"&&y.length>0&&Pt.to(y,{attr:{"stroke-opacity":0},duration:typeof tt.fadeOutDuration=="number"?tt.fadeOutDuration:2,ease:"power1.out"},`>+=${typeof tt.fadeOutDelay=="number"?tt.fadeOutDelay:0}`)}catch{}Pt.add(_e.timeline().to({},{duration:tt.delayBeforeUnpin}),">"),console.log("Master timeline with 4-phase animation created successfully");try{je.refresh()}catch{}}console.log("Section 2 3-phase animation setup complete")}function $w(){const r=_e.timeline(),e=document.getElementById("lines-svg");if(!e)return console.error("SVG container not found for drawing phase"),r;const t=tA(),n=Bi(),i=Yg[n];if(!i)return console.error("Grid state missing for",n),r;const s=typeof i.svgSizeMultiplier=="number"?i.svgSizeMultiplier:1.5,o=Math.max(window.innerWidth,window.innerHeight)*s;console.log(`Phase 1: Setting up 14 lines with dynamic length: ${t}px`),console.log(`SVG dimensions: ${o}x${o}px (more reasonable size)`),console.log(`Viewport dimensions: ${window.innerWidth}x${window.innerHeight}`),console.log(`Original calculated line length: ${t}px`);const a=o/2;for(_e.set(e,{attr:{viewBox:`-${a} -${a} ${o} ${o}`},width:o,height:o}),_e.set(e,{clearProps:"transform",x:"-50%",y:"-50%"}),console.log("SVG centered using GSAP canonical approach");e.firstChild;)e.removeChild(e.firstChild);const l=document.createElementNS("http://www.w3.org/2000/svg","g");_e.set(l,{attr:{id:"grid-lines"}}),e.appendChild(l);const c=0;console.log("Center point is now at (0,0) in centered coordinate system"),console.log(`SVG viewBox: -${o/2} -${o/2} ${o} ${o}`);const u=typeof i.initialSpacing=="number"?i.initialSpacing:50,f=Number.isInteger(i.levels)?i.levels:3;console.log("Center point is now at (0,0) in centered coordinate system");const h={horizontal:[],vertical:[],all:[]};for(let d=-f;d<=f;d++){const g=document.createElementNS("http://www.w3.org/2000/svg","path"),_=-o/2,m=o/2,p=c+d*u;_e.set(g,{attr:{class:"line horizontal",d:`M${_} ${p} L${m} ${p}`,"vector-effect":"non-scaling-stroke",fill:"none",stroke:i.lineColor??"#FFFFFF","stroke-opacity":i.lineOpacity??.8},strokeWidth:i.lineWidth??1}),g.dataset.axis="h",g.dataset.level=String(d),l.appendChild(g),h.horizontal.push(g),h.all.push(g)}for(let d=-f;d<=f;d++){const g=document.createElementNS("http://www.w3.org/2000/svg","path"),_=-o/2,m=o/2,p=c+d*u;_e.set(g,{attr:{class:"line vertical",d:`M${p} ${_} L${p} ${m}`,"vector-effect":"non-scaling-stroke",fill:"none",stroke:i.lineColor??"#FFFFFF","stroke-opacity":i.lineOpacity??.8},strokeWidth:i.lineWidth??1}),g.dataset.axis="v",g.dataset.level=String(d),l.appendChild(g),h.vertical.push(g),h.all.push(g)}console.log(`Phase 1: Created ${h.all.length} SVG path elements`),console.log("DrawSVGPlugin available:",typeof Dd<"u"),window.lineGroups=h,window.svgSize=o,window.svgCenter=0,window.gridGroup=l,window.gridInitialSpacing=u,window.gridState=i,_e.set(l,{transformOrigin:"50% 50%"}),h.all.forEach((d,g)=>{_e.set(d,{drawSVG:"50% 50%"})}),console.log("Phase 1: Grid built and initial draw state set (actual drawing handled by vertical/horizontal timelines)");try{je.refresh()}catch{}return r}function Kw(){const r=_e.timeline();if(!window.lineGroups||!window.svgSize)return console.error("Line groups not available for outward expansion phase"),r;const{horizontal:e,vertical:t,all:n}=window.lineGroups,i=window.gridGroup;console.log("Phase 2: Setting up outward expansion + 45° rotation - lines travel outwards from center while grid rotates"),_e.set(i,{transformOrigin:"50% 50%"}),console.log('Transform origin set to "50% 50%" using GSAP canonical approach');const s=typeof window.gridInitialSpacing=="number"?window.gridInitialSpacing:50,o=window.gridState&&typeof window.gridState.outwardFactor=="number"?window.gridState.outwardFactor:1.8,a=s*o;e.forEach(c=>{const f=Number(c.dataset.level)*a;r.to(c,{y:f,ease:"none",duration:tt.outward},0)}),t.forEach(c=>{const f=Number(c.dataset.level)*a;r.to(c,{x:f,ease:"none",duration:tt.outward},0)}),r.to(i,{rotation:45,ease:"none",duration:tt.outward},0);const l=document.getElementById("grid-cells");if(l){const c=Array.from(l.querySelectorAll(".cell-node")),u=Bi(),f=Ro[u];if(!f)return console.error("Rect state missing for",u),r;const h=typeof f.sizeFactorOutStart=="number"?f.sizeFactorOutStart:f.sizeFactor??.5,d=typeof f.sizeFactorOutEnd=="number"?f.sizeFactorOutEnd:f.sizeFactor??.5,g=typeof f.positionOutMultiplierStart=="number"?f.positionOutMultiplierStart:1,_=typeof f.positionOutMultiplierEnd=="number"?f.positionOutMultiplierEnd:1;r.eventCallback("onUpdate",()=>{const p=r.totalProgress(),M=_e.utils.interpolate(s,a,p),y=_e.utils.interpolate(h,d,p),x=_e.utils.interpolate(g,_,p),w=Math.max(2,M*y),A=w*(f.cornerRadiusFactor??.15);c.forEach(T=>{const C=Number(T.dataset.i),b=Number(T.dataset.j),v=C*(M*x)+M*x/2,P=b*(M*x)+M*x/2,U=v-w/2,B=P-w/2;T.setAttribute("transform",`translate(${U} ${B})`);const W=T.querySelector(".cell-rect");W&&_e.set(W,{attr:{width:w,height:w,rx:A,ry:A}})})})}return console.log("Phase 2: Outward expansion + rotation phase timeline created successfully"),r}function jw(){const r=_e.timeline();if(!window.lineGroups||!window.svgCenter)return console.error("Line groups not available for rotation phase"),r;const{all:e}=window.lineGroups;return console.log("Phase 3: Setting up coordinated rotation for all lines"),_e.set(e,{transformOrigin:"50% 50%"}),console.log('Transform origin set to "50% 50%" using GSAP canonical approach'),console.log("Phase 3: Rotation phase timeline created successfully"),r}function Zw(){const r=_e.timeline();if(!window.lineGroups||!window.svgSize||!window.svgCenter)return console.error("Line groups not available for expansion phase"),r;const{horizontal:e,vertical:t,all:n}=window.lineGroups;console.log("Phase 4: Setting up grid expansion while maintaining structure");const i=typeof window.gridInitialSpacing=="number"?window.gridInitialSpacing:50,s=window.gridState&&typeof window.gridState.finalFactor=="number"?window.gridState.finalFactor:2.5,o=i*s,a=document.getElementById("grid-cells");if(a){const l=Array.from(a.querySelectorAll(".cell-node")),c=Bi(),u=Ro[c];if(!u)return console.error("Rect state missing for",c),r;const f=typeof u.sizeFactorFinalStart=="number"?u.sizeFactorFinalStart:u.sizeFactor??.5,h=typeof u.sizeFactorFinalEnd=="number"?u.sizeFactorFinalEnd:u.sizeFactor??.5,d=typeof u.positionFinalMultiplierStart=="number"?u.positionFinalMultiplierStart:1,g=typeof u.positionFinalMultiplierEnd=="number"?u.positionFinalMultiplierEnd:1;r.eventCallback("onUpdate",()=>{const m=r.totalProgress(),p=_e.utils.interpolate(i,o,m),M=_e.utils.interpolate(f,h,m),y=_e.utils.interpolate(d,g,m),x=Math.max(2,p*M),w=x*(u.cornerRadiusFactor??.15);l.forEach(A=>{const T=Number(A.dataset.i),C=Number(A.dataset.j),b=T*(p*y)+p*y/2,v=C*(p*y)+p*y/2,P=b-x/2,U=v-x/2;A.setAttribute("transform",`translate(${P} ${U})`);const B=A.querySelector(".cell-rect");B&&_e.set(B,{attr:{width:x,height:x,rx:w,ry:w}})})})}return console.log("Phase 4: Expansion phase timeline created successfully"),r}function Jw(){const r=_e.timeline();if(!window.lineGroups||!window.gridState||!window.gridInitialSpacing||!window.gridGroup)return console.warn("Cells: prerequisites not met, skipping"),r;const e=Bi(),t=Ro[e];if(!t)return console.error("Rect state missing for",e),r;if(!t.enabled)return r;const{horizontal:n,vertical:i}=window.lineGroups,s=new Set([...n,...i].map(y=>Number(y.dataset.level))),o=Math.max(...s),a=Math.min(...s);if(typeof window.gridInitialSpacing!="number")return console.error("gridInitialSpacing missing"),r;const l=window.gridInitialSpacing,c=Math.max(2,l*(t.sizeFactor??.5)),u=c*(t.cornerRadiusFactor??.15),f=window.gridGroup,h=t.rectDefaults,d=document.getElementById("grid-cells");d&&d.parentNode&&d.parentNode.removeChild(d),window._primaryCellPlaced=!1;const g=document.createElementNS("http://www.w3.org/2000/svg","g");_e.set(g,{attr:{id:"grid-cells"}}),f.appendChild(g),_e.set(g,{transformOrigin:"50% 50%"});const _=Array.isArray(t.cells)?t.cells:[],m=_.length>0,p=Array.isArray(t.blocks)?t.blocks:null;let M=0;for(let y=a;y<=o-1;y++)for(let x=a;x<=o-1;x++){let w=!1;if(m?w=_.some(([oe,le])=>oe===y&&le===x):w=t.pattern==="all"?!0:t.pattern==="checker"?(y+x)%2===0:!1,!w)continue;const A=y*l+l/2,T=x*l+l/2,C=A-c/2,b=T-c/2,v=document.createElementNS("http://www.w3.org/2000/svg","g");v.setAttribute("class","cell-node"),v.dataset.i=String(y),v.dataset.j=String(x),v.setAttribute("transform",`translate(${C} ${b})`),_e.set(v,{opacity:0});const P=document.createElementNS("http://www.w3.org/2000/svg","rect");_e.set(P,{attr:{x:0,y:0,width:c,height:c,rx:u,ry:u,class:"cell-rect"}}),_e.set(P,{transformOrigin:"50% 50%",transformBox:"fill-box"}),v.appendChild(P);const U=M,B=Ro[Bi()]||Ro.desktop||{},W=B.amount||{},Z=B.label||{},X=p&&p[U]?p[U]:null,H=X&&X.amount?{...W,...X.amount}:W,k=X&&X.label?{...Z,...X.label}:Z,re=X&&X.rect?{...h,...X.rect}:h,L=document.getElementById("lines-svg");let pe=L.querySelector("defs");pe||(pe=document.createElementNS("http://www.w3.org/2000/svg","defs"),L.insertBefore(pe,L.firstChild));const Fe=`rect-grad-${U}`;let Ye=L.querySelector(`#${Fe}`);if(Ye){const oe=Ye.querySelectorAll("stop"),le=oe[0],de=oe[1];if(le&&le.setAttribute("stop-color",re.gradientStart??"#000000"),de){const De=re.gradientEnd??"rgba(0,0,0,0.5)";if(/rgba\(/i.test(De)){const Re=De.match(/rgba\(([^)]+)\)/i);if(Re){const We=Re[1].split(",").map(He=>He.trim()),[Xe,ye,D,Ke]=We;de.setAttribute("stop-color",`rgb(${Xe}, ${ye}, ${D})`),Ke!=null&&de.setAttribute("stop-opacity",`${Ke}`)}}else de.setAttribute("stop-color",De),de.removeAttribute("stop-opacity")}}else{Ye=document.createElementNS("http://www.w3.org/2000/svg","linearGradient"),Ye.setAttribute("id",Fe);const oe=Number(re.gradientAngle??135);Ye.setAttribute("gradientTransform",`rotate(${oe})`);const le=document.createElementNS("http://www.w3.org/2000/svg","stop");le.setAttribute("offset","0%"),le.setAttribute("stop-color",re.gradientStart??"#000000");const de=document.createElementNS("http://www.w3.org/2000/svg","stop");de.setAttribute("offset","97.66%");const De=re.gradientEnd??"rgba(0,0,0,0.5)";if(/rgba\(/i.test(De)){const Re=De.match(/rgba\(([^)]+)\)/i);if(Re){const We=Re[1].split(",").map(He=>He.trim()),[Xe,ye,D,Ke]=We;de.setAttribute("stop-color",`rgb(${Xe}, ${ye}, ${D})`),Ke!=null&&de.setAttribute("stop-opacity",`${Ke}`)}}else de.setAttribute("stop-color",De);Ye.appendChild(le),Ye.appendChild(de),pe.appendChild(Ye)}const j=Number(re.rxOverride??NaN),ue=Number.isFinite(j)?j:u;if(_e.set(P,{attr:{rx:ue,ry:ue,fill:`url(#${Fe})`,stroke:re.strokeColor??"#FFFFFF","stroke-opacity":re.strokeOpacity??.38,"stroke-width":re.strokeWidth??1}}),H||k){if(H){const oe=document.createElementNS("http://www.w3.org/2000/svg","text");oe.textContent=H.text??"$700M+",oe.setAttribute("fill",H.color??"rgba(255, 255, 255, 0.90)"),oe.setAttribute("font-family",H.fontFamily??"Roboto Mono, monospace"),oe.setAttribute("font-weight",H.fontWeight??"300"),oe.setAttribute("font-size",String(H.fontSize??36)),H.letterSpacing!=null&&oe.setAttribute("letter-spacing",String(H.letterSpacing)),oe.setAttribute("data-role","amount");const le=Number(H.fontSize??36),de=H.anchor==="middle"||H.center===!0;let De,Re,We=H.anchor!=null?H.anchor:de?"middle":"start",Xe=H.baseline!=null?H.baseline:de?"middle":"alphabetic";if(de){const D=Number(H.centerOffsetX??0),Ke=Number(H.centerOffsetY??0);De=c/2+D,Re=c/2+Ke}else{const D=Number(H.padLeft??8),Ke=Number(H.padTop??18);De=D,Re=Ke+le}oe.setAttribute("x",String(De)),oe.setAttribute("y",String(Re)),oe.setAttribute("text-anchor",We),oe.setAttribute("dominant-baseline",Xe);const ye=H.rotateDeg!=null?Number(H.rotateDeg):null;ye!=null&&oe.setAttribute("transform",`rotate(${ye} ${De} ${Re})`),v.appendChild(oe),_e.set(oe,{opacity:0})}if(k){const oe=document.createElementNS("http://www.w3.org/2000/svg","text");oe.textContent=k.text??"LOAN VOLUME",oe.setAttribute("fill",k.color??"#FFFFFF"),k.opacity!=null&&oe.setAttribute("opacity",String(k.opacity)),oe.setAttribute("font-family",k.fontFamily??"Satoshi Variable, sans-serif"),oe.setAttribute("font-weight",k.fontWeight??"500"),oe.setAttribute("font-size",String(k.fontSize??16)),oe.setAttribute("data-role","label");const le=Number(k.padLeft??8),de=Number(k.padBottom??8),De=k.padRight!=null?Number(k.padRight):null,Re=k.padTop!=null?Number(k.padTop):null;let We=le,Xe=c-de,ye=k.anchor??"start",D=k.baseline??"alphabetic";De!=null?(We=c-De,Xe=c-(k.padBottom??8),ye="end",D="alphabetic"):Re!=null&&(We=le,Xe=Re+(k.fontSize??16),ye="start",D="alphabetic"),oe.setAttribute("x",String(We)),oe.setAttribute("y",String(Xe)),oe.setAttribute("text-anchor",ye),oe.setAttribute("dominant-baseline",D);const Ke=k.rotateDeg!=null?Number(k.rotateDeg):null;Ke!=null&&oe.setAttribute("transform",`rotate(${Ke} ${We} ${Xe})`);const He=document.createElementNS("http://www.w3.org/2000/svg","rect"),G=Number(k.fontSize??16),be=4,ee=2,N=Xe-G-ee,J=We-(ye==="end"?0:be),Me=G+ee*2,R=k.color??"#FFFFFF";_e.set(He,{attr:{x:J,y:N,width:0,height:Me,fill:R,"fill-opacity":1}}),He.setAttribute("class","label-highlight"),Ke!=null&&He.setAttribute("transform",`rotate(${Ke} ${We} ${Xe})`),v.appendChild(oe),v.appendChild(He),_e.set(oe,{opacity:0})}}g.appendChild(v),M++}return window.visibleCellNodes=Array.from(g.querySelectorAll(".cell-node")),r}function Qw(){const r=_e.timeline(),e=document.getElementById("grid-cells");return e&&(Array.from(e.querySelectorAll("rect.cell-rect")).forEach(i=>{_e.set(i,{drawSVG:"50% 50%"}),_e.set(i,{attr:{"fill-opacity":0}})}),Array.from(e.querySelectorAll("rect.label-highlight")).forEach(i=>{i.getAttribute("y"),i.getAttribute("height"),_e.set(i,{attr:{width:0}}),_e.set(i,{attr:{"fill-opacity":1}})})),r}function eA(){const r=_e.timeline();let e=[];if(window.visibleCellNodes&&window.visibleCellNodes.length)e=window.visibleCellNodes;else{const t=document.getElementById("grid-cells");t&&(e=Array.from(t.querySelectorAll(".cell-node")))}return e.length?(e.forEach((t,n)=>{const i=t.querySelector("rect.cell-rect"),s=t.querySelector("rect.label-highlight"),o=t.querySelector('text[data-role="label"]'),a=tt.blockGap,l=n*a;if(r.to(t,{opacity:1,duration:.01},l),i&&(r.to(i,{drawSVG:"0% 100%",ease:"none",duration:tt.rectDraw},l),r.to(i,{attr:{"fill-opacity":1},duration:tt.rectFillFade,ease:"power1.out"},l+(tt.rectDraw-.03))),s&&o){const f=o.getAttribute("text-anchor"),h=o.getAttribute("x"),d=h!=null?Number(h):0,g=()=>{let _=0;if(typeof o.getComputedTextLength=="function")try{_=o.getComputedTextLength()}catch{}if(!_||_<=0)try{_=o.getBBox().width}catch{_=0}return Math.max(8,_+(f==="end"?0:8))};f==="end"?r.to(s,{attr:{width:()=>g(),x:()=>d-g()},ease:"none",duration:tt.highlightExpand},l+.02):r.to(s,{attr:{width:()=>g()},ease:"none",duration:tt.highlightExpand},l+.02),r.to(o,{opacity:.5,duration:tt.labelReveal,ease:"none"},l+.02+tt.highlightExpand),f==="end"?r.to(s,{attr:{width:0,x:()=>d},ease:"none",duration:tt.highlightShrink},l+.02+tt.highlightExpand+tt.labelReveal):r.to(s,{attr:{width:0,x:()=>d+g()},ease:"none",duration:tt.highlightShrink},l+.02+tt.highlightExpand+tt.labelReveal)}const c=t.querySelector('text[data-role="amount"]');if(c){const u=c.textContent??"",f=u.match(/(-?[\d,]+(?:\.[\d]+)?)/);if(f&&f.index!=null){const h=f[1],d=u.slice(0,f.index),g=u.slice(f.index+h.length),_=(h.split(".")[1]??"").length,m=parseFloat(h.replace(/,/g,"")),p=/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(d+g),M=new Intl.NumberFormat("en-US",{minimumFractionDigits:_,maximumFractionDigits:_,useGrouping:!p}),y={value:0},x=l+.02,w=tt.highlightExpand,A=tt.labelReveal,C=x+w+A+tt.amountDelayAfterLabel,b=tt.amountAppear;r.to(c,{opacity:1,duration:b,ease:"power1.out"},C),c.textContent=d+M.format(0)+g;const v=C+b;r.to(y,{value:m,duration:tt.amountCount,ease:"power2.out",onUpdate:()=>{c.textContent=d+M.format(y.value)+g},onComplete:()=>{c.textContent=d+M.format(m)+g}},v)}}}),r):(console.warn("Reveal phase: no cell nodes to reveal"),r)}try{document&&document.fonts&&typeof document.fonts.ready?.then=="function"&&document.fonts.ready.then(()=>{typeof je<"u"&&je?.refresh&&je.refresh()}).catch(()=>{})}catch{}function tA(){const r=window.innerWidth,e=window.innerHeight,t=Math.sqrt(r*r+e*e),n=Math.max(r,e)*.5;return Math.ceil(t+n)}let Ph;function A0(r){Ph=r}function ru(r,e){const t=window.innerWidth/window.innerHeight,n=Ph.fov*Math.PI/180,i=Math.abs(Ph.position.z),s=r*i*Math.tan(n/2)*t,o=e*i*Math.tan(n/2);return{x:s,y:o}}function Dh(){const r=Bi(),e=Nd(r),t=ru(e.target.x,e.target.y),n=typeof e.target.scale=="number"&&!isNaN(e.target.scale)?e.target.scale:.235;return{x:t.x,y:t.y,z:e.target.z,scale:n}}function Kc(){const r=Bi(),e=Nd(r),t=ru(e.start.x,e.start.y),n=typeof e.start.scale=="number"&&!isNaN(e.start.scale)?e.start.scale:3;return{x:t.x,y:t.y,z:e.start.z,scale:n}}const R0=Object.freeze(Object.defineProperty({__proto__:null,calculateStartPosition:Kc,calculateTargetPosition:Dh,initializeViewport:A0,worldToPosition:ru},Symbol.toStringTag,{value:"Module"}));function nA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function iA(r,e,t){return e&&nA(r.prototype,e),r}/*!
 * ScrollSmoother 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var St,nc,Pn,Hr,Pa,ur,Es,Km,it,Wi,ic,jm,Zm,Jm,Qm,C0=function(){return typeof window<"u"},P0=function(){return St||C0()&&(St=window.gsap)&&St.registerPlugin&&St},rA=function(e){return Math.round(e*1e5)/1e5||0},Or=function(e){return it.maxScroll(e||Pn)},sA=function(e,t){var n=e.parentNode||Pa,i=e.getBoundingClientRect(),s=n.getBoundingClientRect(),o=s.top-i.top,a=s.bottom-i.bottom,l=(Math.abs(o)>Math.abs(a)?o:a)/(1-t),c=-l*t,u,f;return l>0&&(u=s.height/(Pn.innerHeight+s.height),f=u===.5?s.height*2:Math.min(s.height,Math.abs(-l*u/(2*u-1)))*2*(t||1),c+=t?-f*t:-f/2,l+=f),{change:l,offset:c}},oA=function(e){var t=Hr.querySelector(".ScrollSmoother-wrapper");return t||(t=Hr.createElement("div"),t.classList.add("ScrollSmoother-wrapper"),e.parentNode.insertBefore(t,e),t.appendChild(e)),t},Xs=function(){function r(e){var t=this;nc||r.register(St)||console.warn("Please gsap.registerPlugin(ScrollSmoother)"),e=this.vars=e||{},Wi&&Wi.kill(),Wi=this,Jm(this);var n=e,i=n.smoothTouch,s=n.onUpdate,o=n.onStop,a=n.smooth,l=n.onFocusIn,c=n.normalizeScroll,u=n.wholePixels,f,h,d,g,_,m,p,M,y,x,w,A,T,C,b=this,v=e.effectsPrefix||"",P=it.getScrollFunc(Pn),U=it.isTouch===1?i===!0?.8:parseFloat(i)||0:a===0||a===!1?0:parseFloat(a)||.8,B=U&&+e.speed||1,W=0,Z=0,X=1,H=jm(0),k=function(){return H.update(-W)},re={y:0},L=function(){return f.style.overflow="visible"},pe,Fe=function(N){N.update();var J=N.getTween();J&&(J.pause(),J._time=J._dur,J._tTime=J._tDur),pe=!1,N.animation.progress(N.progress,!0)},Ye=function(N,J){(N!==W&&!x||J)&&(u&&(N=Math.round(N)),U&&(f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+N+", 0, 1)",f._gsap.y=N+"px"),Z=N-W,W=N,it.isUpdating||r.isRefreshing||it.update())},j=function(N){return arguments.length?(N<0&&(N=0),re.y=-N,pe=!0,x?W=-N:Ye(-N),it.isRefreshing?g.update():P(N/B),this):-W},ue=typeof ResizeObserver<"u"&&e.autoResize!==!1&&new ResizeObserver(function(){if(!it.isRefreshing){var ee=Or(h)*B;ee<-W&&j(ee),Qm.restart(!0)}}),oe,le=function(N){h.scrollTop=0,!(N.target.contains&&N.target.contains(h)||l&&l(t,N)===!1)&&(it.isInViewport(N.target)||N.target===oe||t.scrollTo(N.target,!1,"center center"),oe=N.target)},de=function(N,J){if(N<J.start)return N;var Me=isNaN(J.ratio)?1:J.ratio,R=J.end-J.start,S=N-J.start,O=J.offset||0,Q=J.pins||[],K=Q.offset||0,q=J._startClamp&&J.start<=0||J.pins&&J.pins.offset?0:J._endClamp&&J.end===Or()?1:.5;return Q.forEach(function(me){R-=me.distance,me.nativeStart<=N&&(S-=me.distance)}),K&&(S*=(R-K/Me)/R),N+(S-O*q)/Me-S},De=function ee(N,J,Me){Me||(N.pins.length=N.pins.offset=0);var R=N.pins,S=N.markers,O,Q,K,q,me,ae,Se,ne;for(Se=0;Se<J.length;Se++)if(ne=J[Se],N.trigger&&ne.trigger&&N!==ne&&(ne.trigger===N.trigger||ne.pinnedContainer===N.trigger||N.trigger.contains(ne.trigger))&&(me=ne._startNative||ne._startClamp||ne.start,ae=ne._endNative||ne._endClamp||ne.end,K=de(me,N),q=ne.pin&&ae>0?K+(ae-me):de(ae,N),ne.setPositions(K,q,!0,(ne._startClamp?Math.max(0,K):K)-me),ne.markerStart&&S.push(St.quickSetter([ne.markerStart,ne.markerEnd],"y","px")),ne.pin&&ne.end>0&&!Me)){if(O=ne.end-ne.start,Q=N._startClamp&&ne.start<0,Q){if(N.start>0){N.setPositions(0,N.end+(N._startNative-N.start),!0),ee(N,J);return}O+=ne.start,R.offset=-ne.start}R.push({start:ne.start,nativeStart:me,end:ne.end,distance:O,trig:ne}),N.setPositions(N.start,N.end+(Q?-ne.start:O),!0)}},Re=function(N,J){_.forEach(function(Me){return De(Me,N,J)})},We=function(){Pa=Hr.documentElement,ur=Hr.body,L(),requestAnimationFrame(L),_&&(it.getAll().forEach(function(N){N._startNative=N.start,N._endNative=N.end}),_.forEach(function(N){var J=N._startClamp||N.start,Me=N.autoSpeed?Math.min(Or(),N.end):J+Math.abs((N.end-J)/N.ratio),R=Me-N.end;if(J-=R/2,Me-=R/2,J>Me){var S=J;J=Me,Me=S}N._startClamp&&J<0?(Me=N.ratio<0?Or():N.end/N.ratio,R=Me-N.end,J=0):(N.ratio<0||N._endClamp&&Me>=Or())&&(Me=Or(),J=N.ratio<0||N.ratio>1?0:Me-(Me-N.start)/N.ratio,R=(Me-J)*N.ratio-(N.end-N.start)),N.offset=R||1e-4,N.pins.length=N.pins.offset=0,N.setPositions(J,Me,!0)}),Re(it.sort())),H.reset()},Xe=function(){return it.addEventListener("refresh",We)},ye=function(){return _&&_.forEach(function(N){return N.vars.onRefresh(N)})},D=function(){return _&&_.forEach(function(N){return N.vars.onRefreshInit(N)}),ye},Ke=function(N,J,Me,R){return function(){var S=typeof J=="function"?J(Me,R):J;S||S===0||(S=R.getAttribute("data-"+v+N)||(N==="speed"?1:0)),R.setAttribute("data-"+v+N,S);var O=(S+"").substr(0,6)==="clamp(";return{clamp:O,value:O?S.substr(6,S.length-7):S}}},He=function(N,J,Me,R,S){S=(typeof S=="function"?S(R,N):S)||0;var O=Ke("speed",J,R,N),Q=Ke("lag",Me,R,N),K=St.getProperty(N,"y"),q=N._gsap,me,ae,Se,ne,ce,ve,Oe=[],Be=function(){J=O(),Me=parseFloat(Q().value),me=parseFloat(J.value)||1,Se=J.value==="auto",ce=Se||ae&&ae._startClamp&&ae.start<=0||Oe.offset?0:ae&&ae._endClamp&&ae.end===Or()?1:.5,ne&&ne.kill(),ne=Me&&St.to(N,{ease:ic,overwrite:!1,y:"+=0",duration:Me}),ae&&(ae.ratio=me,ae.autoSpeed=Se)},ge=function(){q.y=K+"px",q.renderTransform(1),Be()},Ge=[],I=0,xe=function(he){if(Se){ge();var ie=sA(N,Km(0,1,-he.start/(he.end-he.start)));I=ie.change,ve=ie.offset}else ve=Oe.offset||0,I=(he.end-he.start-ve)*(1-me);Oe.forEach(function(te){return I-=te.distance*(1-me)}),he.offset=I||.001,he.vars.onUpdate(he),ne&&ne.progress(1)};return Be(),(me!==1||Se||ne)&&(ae=it.create({trigger:Se?N.parentNode:N,start:function(){return J.clamp?"clamp(top bottom+="+S+")":"top bottom+="+S},end:function(){return J.value<0?"max":J.clamp?"clamp(bottom top-="+S+")":"bottom top-="+S},scroller:h,scrub:!0,refreshPriority:-999,onRefreshInit:ge,onRefresh:xe,onKill:function(he){var ie=_.indexOf(he);ie>=0&&_.splice(ie,1),ge()},onUpdate:function(he){var ie=K+I*(he.progress-ce),te=Oe.length,Ce=0,Ie,ft,Te;if(he.offset){if(te){for(ft=-W,Te=he.end;te--;){if(Ie=Oe[te],Ie.trig.isActive||ft>=Ie.start&&ft<=Ie.end){ne&&(Ie.trig.progress+=Ie.trig.direction<0?.001:-.001,Ie.trig.update(0,0,1),ne.resetTo("y",parseFloat(q.y),-Z,!0),X&&ne.progress(1));return}ft>Ie.end&&(Ce+=Ie.distance),Te-=Ie.distance}ie=K+Ce+I*((St.utils.clamp(he.start,he.end,ft)-he.start-Ce)/(Te-he.start)-ce)}Ge.length&&!Se&&Ge.forEach(function(Ue){return Ue(ie-Ce)}),ie=rA(ie+ve),ne?(ne.resetTo("y",ie,-Z,!0),X&&ne.progress(1)):(q.y=ie+"px",q.renderTransform(1))}}}),xe(ae),St.core.getCache(ae.trigger).stRevert=D,ae.startY=K,ae.pins=Oe,ae.markers=Ge,ae.ratio=me,ae.autoSpeed=Se,N.style.willChange="transform"),ae};Xe(),it.addEventListener("killAll",Xe),St.delayedCall(.5,function(){return X=0}),this.scrollTop=j,this.scrollTo=function(ee,N,J){var Me=St.utils.clamp(0,Or(),isNaN(ee)?t.offset(ee,J,!!N&&!x):+ee);N?x?St.to(t,{duration:U,scrollTop:Me,overwrite:"auto",ease:ic}):P(Me):j(Me)},this.offset=function(ee,N,J){ee=Es(ee)[0];var Me=ee.style.cssText,R=it.create({trigger:ee,start:N||"top top"}),S;return _&&(X?it.refresh():Re([R],!0)),S=R.start/(J?B:1),R.kill(!1),ee.style.cssText=Me,St.core.getCache(ee).uncache=1,S};function G(){return d=f.clientHeight,f.style.overflow="visible",ur.style.height=Pn.innerHeight+(d-Pn.innerHeight)/B+"px",d-Pn.innerHeight}this.content=function(ee){if(arguments.length){var N=Es(ee||"#smooth-content")[0]||console.warn("ScrollSmoother needs a valid content element.")||ur.children[0];return N!==f&&(f=N,y=f.getAttribute("style")||"",ue&&ue.observe(f),St.set(f,{overflow:"visible",width:"100%",boxSizing:"border-box",y:"+=0"}),U||St.set(f,{clearProps:"transform"})),this}return f},this.wrapper=function(ee){return arguments.length?(h=Es(ee||"#smooth-wrapper")[0]||oA(f),M=h.getAttribute("style")||"",G(),St.set(h,U?{overflow:"hidden",position:"fixed",height:"100%",width:"100%",top:0,left:0,right:0,bottom:0}:{overflow:"visible",position:"relative",width:"100%",height:"auto",top:"auto",bottom:"auto",left:"auto",right:"auto"}),this):h},this.effects=function(ee,N){var J;if(_||(_=[]),!ee)return _.slice(0);ee=Es(ee),ee.forEach(function(me){for(var ae=_.length;ae--;)_[ae].trigger===me&&_[ae].kill()}),N=N||{};var Me=N,R=Me.speed,S=Me.lag,O=Me.effectsPadding,Q=[],K,q;for(K=0;K<ee.length;K++)q=He(ee[K],R,S,K,O),q&&Q.push(q);return(J=_).push.apply(J,Q),N.refresh!==!1&&it.refresh(),Q},this.sections=function(ee,N){var J;if(m||(m=[]),!ee)return m.slice(0);var Me=Es(ee).map(function(R){return it.create({trigger:R,start:"top 120%",end:"bottom -20%",onToggle:function(O){R.style.opacity=O.isActive?"1":"0",R.style.pointerEvents=O.isActive?"all":"none"}})});return N&&N.add?(J=m).push.apply(J,Me):m=Me.slice(0),Me},this.content(e.content),this.wrapper(e.wrapper),this.render=function(ee){return Ye(ee||ee===0?ee:W)},this.getVelocity=function(){return H.getVelocity(-W)},it.scrollerProxy(h,{scrollTop:j,scrollHeight:function(){return G()&&ur.scrollHeight},fixedMarkers:e.fixedMarkers!==!1&&!!U,content:f,getBoundingClientRect:function(){return{top:0,left:0,width:Pn.innerWidth,height:Pn.innerHeight}}}),it.defaults({scroller:h});var be=it.getAll().filter(function(ee){return ee.scroller===Pn||ee.scroller===h});be.forEach(function(ee){return ee.revert(!0,!0)}),g=it.create({animation:St.fromTo(re,{y:function(){return C=0,0}},{y:function(){return C=1,-G()},immediateRender:!1,ease:"none",data:"ScrollSmoother",duration:100,onUpdate:function(){if(C){var N=pe;N&&(Fe(g),re.y=W),Ye(re.y,N),k(),s&&!x&&s(b)}}}),onRefreshInit:function(N){if(!r.isRefreshing){if(r.isRefreshing=!0,_){var J=it.getAll().filter(function(R){return!!R.pin});_.forEach(function(R){R.vars.pinnedContainer||J.forEach(function(S){if(S.pin.contains(R.trigger)){var O=R.vars;O.pinnedContainer=S.pin,R.vars=null,R.init(O,R.animation)}})})}var Me=N.getTween();T=Me&&Me._end>Me._dp._time,A=W,re.y=0,U&&(it.isTouch===1&&(h.style.position="absolute"),h.scrollTop=0,it.isTouch===1&&(h.style.position="fixed"))}},onRefresh:function(N){N.animation.invalidate(),N.setPositions(N.start,G()/B),T||Fe(N),re.y=-P()*B,Ye(re.y),X||(T&&(pe=!1),N.animation.progress(St.utils.clamp(0,1,A/B/-N.end))),T&&(N.progress-=.001,N.update()),r.isRefreshing=!1},id:"ScrollSmoother",scroller:Pn,invalidateOnRefresh:!0,start:0,refreshPriority:-9999,end:function(){return G()/B},onScrubComplete:function(){H.reset(),o&&o(t)},scrub:U||!0}),this.smooth=function(ee){return arguments.length&&(U=ee||0,B=U&&+e.speed||1,g.scrubDuration(ee)),g.getTween()?g.getTween().duration():0},g.getTween()&&(g.getTween().vars.ease=e.ease||ic),this.scrollTrigger=g,e.effects&&this.effects(e.effects===!0?"[data-"+v+"speed], [data-"+v+"lag]":e.effects,{effectsPadding:e.effectsPadding,refresh:!1}),e.sections&&this.sections(e.sections===!0?"[data-section]":e.sections),be.forEach(function(ee){ee.vars.scroller=h,ee.revert(!1,!0),ee.init(ee.vars,ee.animation)}),this.paused=function(ee,N){return arguments.length?(!!x!==ee&&(ee?(g.getTween()&&g.getTween().pause(),P(-W/B),H.reset(),w=it.normalizeScroll(),w&&w.disable(),x=it.observe({preventDefault:!0,type:"wheel,touch,scroll",debounce:!1,allowClicks:!0,onChangeY:function(){return j(-W)}}),x.nested=Zm(Pa,"wheel,touch,scroll",!0,N!==!1)):(x.nested.kill(),x.kill(),x=0,w&&w.enable(),g.progress=(-W/B-g.start)/(g.end-g.start),Fe(g))),this):!!x},this.kill=this.revert=function(){t.paused(!1),Fe(g),g.kill();for(var ee=(_||[]).concat(m||[]),N=ee.length;N--;)ee[N].kill();it.scrollerProxy(h),it.removeEventListener("killAll",Xe),it.removeEventListener("refresh",We),h.style.cssText=M,f.style.cssText=y;var J=it.defaults({});J&&J.scroller===h&&it.defaults({scroller:Pn}),t.normalizer&&it.normalizeScroll(!1),clearInterval(p),Wi=null,ue&&ue.disconnect(),ur.style.removeProperty("height"),Pn.removeEventListener("focusin",le)},this.refresh=function(ee,N){return g.refresh(ee,N)},c&&(this.normalizer=it.normalizeScroll(c===!0?{debounce:!0,content:!U&&f}:c)),it.config(e),"scrollBehavior"in Pn.getComputedStyle(ur)&&St.set([ur,Pa],{scrollBehavior:"auto"}),Pn.addEventListener("focusin",le),p=setInterval(k,250),Hr.readyState==="loading"||requestAnimationFrame(function(){return it.refresh()})}return r.register=function(t){return nc||(St=t||P0(),C0()&&window.document&&(Pn=window,Hr=document,Pa=Hr.documentElement,ur=Hr.body),St&&(Es=St.utils.toArray,Km=St.utils.clamp,ic=St.parseEase("expo"),Jm=St.core.context||function(){},it=St.core.globals().ScrollTrigger,St.core.globals("ScrollSmoother",r),ur&&it&&(Qm=St.delayedCall(.2,function(){return it.isRefreshing||Wi&&Wi.refresh()}).pause(),jm=it.core._getVelocityProp,Zm=it.core._inputObserver,r.refresh=it.refresh,nc=1))),nc},iA(r,[{key:"progress",get:function(){return this.scrollTrigger?this.scrollTrigger.animation._time/100:0}}]),r}();Xs.version="3.13.0";Xs.create=function(r){return Wi&&r&&Wi.content()===Es(r.content)[0]?Wi:new Xs(r)};Xs.get=function(){return Wi};P0()&&St.registerPlugin(Xs);_e.registerPlugin(Xs);let mo=null,eg=!1,aA=!1,cl=null;class lA{constructor(){this.fpsHistory=[],this.scrollLatencyHistory=[],this.lastFrameTime=performance.now(),this.frameCount=0,this.lastScrollTime=performance.now()}startFrame(){const e=performance.now(),t=e-this.lastFrameTime;if(t>0){const n=1e3/t;this.fpsHistory.push(n),this.fpsHistory.length>60&&this.fpsHistory.shift()}this.lastFrameTime=e,this.frameCount++}recordScrollLatency(){const e=performance.now(),t=e-this.lastScrollTime;this.scrollLatencyHistory.push(t),this.scrollLatencyHistory.length>30&&this.scrollLatencyHistory.shift(),this.lastScrollTime=e}getAverageFPS(){if(this.fpsHistory.length===0)return 0;const e=this.fpsHistory.reduce((t,n)=>t+n,0);return Math.round(e/this.fpsHistory.length)}getAverageScrollLatency(){if(this.scrollLatencyHistory.length===0)return 0;const e=this.scrollLatencyHistory.reduce((t,n)=>t+n,0);return Math.round(e/this.scrollLatencyHistory.length)}getPerformanceReport(){return{currentFPS:this.getAverageFPS(),currentScrollLatency:this.getAverageScrollLatency(),frameCount:this.frameCount,isHealthy:this.getAverageFPS()>=55}}}function cA(){if(eg)return console.log("ScrollSmoother already initialized"),mo;try{return document.querySelector("#smooth-content")?(mo=Xs.create({wrapper:"#smooth-wrapper",content:"#smooth-content",smooth:2,effects:!0,normalizeScroll:!1,ignoreMobileResize:!0,smoothTouch:.1,ease:"power1.out",preventDefault:!1,syncInterval:60}),cl=new lA,mo.paused(!1),aA=!0,eg=!0,console.log("ScrollSmoother initialized and enabled by default"),window.smoother=mo,mo):(console.warn("ScrollSmoother: #smooth-content element not found, skipping initialization"),null)}catch(r){return console.warn("ScrollSmoother initialization failed, continuing with native scroll:",r),mo=null,null}}function uA(){cl&&cl.startFrame()}function fA(){cl&&cl.recordScrollLatency()}let Vr,mi,D0,L0;function hA(r,e,t){Vr=r,mi=e,D0=t,L0=Date.now()}function I0(){if(requestAnimationFrame(I0),uA(),mi&&D0){const r=(Date.now()-L0)*.001;window.mouseInfluence&&(window.mouseInfluence.x*=xn.mouseDecayRate,window.mouseInfluence.y*=xn.mouseDecayRate);const e=xn.xRotationRate.base+Math.sin(r*xn.xRotationRate.frequency)*xn.xRotationRate.modulation,t=window.mouseInfluence?window.mouseInfluence.y:0,n=t>=0?xn.xRotationRate.mouseInfluenceDown:xn.xRotationRate.mouseInfluenceUp;mi.rotation.x+=e*.02+t*n;const i=xn.yRotationRate.base+Math.cos(r*xn.yRotationRate.frequency)*xn.yRotationRate.modulation,s=window.mouseInfluence?window.mouseInfluence.x:0,o=s>=0?xn.yRotationRate.mouseInfluenceRight:xn.yRotationRate.mouseInfluenceLeft;mi.rotation.y+=i*.02+s*o;const a=xn.zRotationRate.base+Math.sin(r*xn.zRotationRate.frequency)*xn.zRotationRate.modulation;mi.rotation.z+=a*.02,window.textureReady===!0&&mi.visible===!0&&(mi.rotation.y+=Yw());const l=mi.scale.x,c=er.floatAmplitude*l,u=Math.sin(r*er.floatSpeed)*c;if(mi.userData.targetY!==void 0)mi.position.y=mi.userData.targetY+u;else{const f=Kc();mi.position.y=f.y+u}}if(Vr){gw();let r=null;So.traverse(e=>{e.isMesh&&e.material&&e.material.color&&e.material.color.getHexString()==="ffffff"&&(r=e)}),r&&(r.visible=!0),Vr.visible=!1,Ii.setRenderTarget($o),Ii.render(So,es),Vr.material.uniforms.uTexture.value=$o.texture,Vr.material.side=Bn,Vr.visible=!0,Ii.setRenderTarget(qo),Ii.render(So,es),Vr.material.uniforms.uTexture.value=qo.texture,Vr.material.side=Zi,_w(),r&&(r.visible=!1),Ii.setRenderTarget(null)}Ii.render(So,es)}function dA(){console.log("Initializing navigation...");const r=document.querySelectorAll(".dropdown-container");console.log("Found dropdown containers:",r.length),r.forEach((i,s)=>{const o=i.querySelector(".dropdown-trigger"),a=i.querySelector(".dropdown-menu");if(console.log(`Dropdown ${s}:`,{trigger:!!o,menu:!!a}),!o||!a){console.error("Missing trigger or menu element");return}o.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation();const u=a.classList.contains("open");document.querySelectorAll(".dropdown-menu.open").forEach(f=>{if(f!==a){f.classList.remove("open");const h=f.parentElement.querySelector(".dropdown-trigger");h&&h.classList.remove("open")}}),u?(a.classList.remove("open"),o.classList.remove("open")):(a.classList.add("open"),o.classList.add("open"))});const l=a.querySelectorAll(".dropdown-item");console.log(`Dropdown ${s} items:`,l.length),l.forEach((c,u)=>{c.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),console.log(`Clicked dropdown item ${u}:`,c.textContent),a.classList.remove("open"),o.classList.remove("open")})}),document.addEventListener("click",c=>{c.target.closest(".dropdown-container")||(a.classList.remove("open"),o.classList.remove("open"))}),document.addEventListener("keydown",c=>{c.key==="Escape"&&(a.classList.remove("open"),o.classList.remove("open"))})});const e=document.getElementById("mobile-menu-toggle"),t=document.getElementById("mobile-menu-overlay"),n=document.getElementById("mobile-menu-close");e&&t&&n&&(e.addEventListener("click",()=>{e.classList.add("active"),t.classList.add("active"),document.body.style.overflow="hidden"}),n.addEventListener("click",()=>{e.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow=""}),t.addEventListener("click",s=>{s.target===t&&(e.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow="")}),document.addEventListener("keydown",s=>{s.key==="Escape"&&t.classList.contains("active")&&(e.classList.remove("active"),t.classList.remove("active"),document.body.style.overflow="")}),document.querySelectorAll(".mobile-dropdown").forEach(s=>{const o=s.querySelector(".mobile-dropdown-trigger"),a=s.querySelector(".mobile-dropdown-menu");o&&a&&o.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const c=a.classList.contains("active");document.querySelectorAll(".mobile-dropdown-menu.active").forEach(u=>{if(u!==a){u.classList.remove("active");const f=u.parentElement.querySelector(".mobile-dropdown-trigger");f&&f.classList.remove("active")}}),c?(a.classList.remove("active"),o.classList.remove("active")):(a.classList.add("active"),o.classList.add("active"))})}))}function tg(r,e){if(e===px)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===jf||e===vg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===jf)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class pA extends sa{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new vA(t)}),this.register(function(t){return new RA(t)}),this.register(function(t){return new CA(t)}),this.register(function(t){return new PA(t)}),this.register(function(t){return new SA(t)}),this.register(function(t){return new MA(t)}),this.register(function(t){return new bA(t)}),this.register(function(t){return new TA(t)}),this.register(function(t){return new xA(t)}),this.register(function(t){return new EA(t)}),this.register(function(t){return new yA(t)}),this.register(function(t){return new AA(t)}),this.register(function(t){return new wA(t)}),this.register(function(t){return new gA(t)}),this.register(function(t){return new DA(t)}),this.register(function(t){return new LA(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Ia.extractUrlBase(e);o=Ia.resolveURL(c,this.path)}else o=Ia.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Bg(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===N0){try{o[dt.KHR_BINARY_GLTF]=new IA(e)}catch(f){i&&i(f);return}s=JSON.parse(o[dt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new YA(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](c);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const f=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(f){case dt.KHR_MATERIALS_UNLIT:o[f]=new _A;break;case dt.KHR_DRACO_MESH_COMPRESSION:o[f]=new NA(s,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:o[f]=new UA;break;case dt.KHR_MESH_QUANTIZATION:o[f]=new FA;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function mA(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class gA{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new et(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],zn);const f=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new dc(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new zg(u),c.distance=f;break;case"spot":c=new Yv(u),c.distance=f,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Gr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class _A{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return _r}extendParams(e,t,n){const i=[];e.color=new et(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],zn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,hn))}return Promise.all(i)}}class xA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class vA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new pt(a,a)}return Promise.all(s)}}class yA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class SA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new et(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],zn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,hn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class MA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class bA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new et().setRGB(a[0],a[1],a[2],zn),Promise.all(s)}}class TA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class EA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new et().setRGB(a[0],a[1],a[2],zn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,hn)),Promise.all(s)}}class wA{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class AA{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class RA{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class CA{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class PA{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class DA{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,f=i.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,i.mode,i.filter),d})})}else return null}}class LA{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==_i.TRIANGLES&&c.mode!==_i.TRIANGLE_STRIP&&c.mode!==_i.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),f=u.isGroup?u.children:[u],h=c[0].count,d=[];for(const g of f){const _=new st,m=new V,p=new as,M=new V(1,1,1),y=new Mv(g.geometry,g.material,h);for(let x=0;x<h;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&M.fromBufferAttribute(l.SCALE,x),y.setMatrixAt(x,_.compose(m,p,M));for(const x in l)if(x==="_COLOR_0"){const w=l[x];y.instanceColor=new Jf(w.array,w.itemSize,w.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);Ht.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const N0="glTF",va=12,ng={JSON:1313821514,BIN:5130562};class IA{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,va),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==N0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-va,s=new DataView(e,va);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===ng.JSON){const c=new Uint8Array(e,va+o,a);this.content=n.decode(c)}else if(l===ng.BIN){const c=va+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class NA{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const f=Lh[u]||u.toLowerCase();a[f]=o[u]}for(const u in e.attributes){const f=Lh[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],d=Fo[h.componentType];c[f]=d.name,l[f]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(f,h){i.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}f(d)},a,c,zn,h)})})}}class UA{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class FA{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}}class U0 extends dl{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,f=(n-t)/u,h=f*f,d=h*f,g=e*c,_=g-c,m=-2*d+3*h,p=d-h,M=1-m,y=p-h+f;for(let x=0;x!==a;x++){const w=o[_+x+a],A=o[_+x+l]*u,T=o[g+x+a],C=o[g+x]*u;s[x]=M*w+y*A+m*T+p*C}return s}}const OA=new as;class BA extends U0{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return OA.fromArray(s).normalize().toArray(s),s}}const _i={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Fo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ig={9728:Gn,9729:Mi,9984:fg,9985:ac,9986:Sa,9987:mr},rg={33071:Yr,33648:Dc,10497:Vo},lf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Lh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Br={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},kA={CUBICSPLINE:void 0,LINEAR:Ja,STEP:Za},cf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function zA(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Zh({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Zi})),r.DefaultMaterial}function vs(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Gr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function VA(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const f=e[c];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(i=!0),f.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const f=e[c];if(n){const h=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):r.attributes.position;o.push(h)}if(i){const h=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):r.attributes.normal;a.push(h)}if(s){const h=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):r.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],f=c[1],h=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=f),s&&(r.morphAttributes.color=h),r.morphTargetsRelative=!0,r})}function HA(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function GA(r){let e;const t=r.extensions&&r.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+uf(t.attributes):e=r.indices+":"+uf(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+uf(r.targets[n]);return e}function uf(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Ih(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function WA(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const XA=new st;class YA{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new mA,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new kg(this.options.manager):this.textureLoader=new jv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return vs(s,a,i),Gr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ia.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=lf[i.type],a=Fo[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new kn(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=lf[i.type],c=Fo[i.componentType],u=c.BYTES_PER_ELEMENT,f=u*l,h=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(d&&d!==f){const p=Math.floor(h/d),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(M);y||(_=new c(a,p*d,i.count*d/u),y=new _v(_,d/u),t.cache.add(M,y)),m=new Yh(y,l,h%d/u,g)}else a===null?_=new c(i.count*l):_=new c(a,h,i.count*l),m=new kn(_,l,g);if(i.sparse!==void 0){const p=lf.SCALAR,M=Fo[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,w=new M(o[1],y,i.sparse.count*p),A=new c(o[2],x,i.sparse.count*l);a!==null&&(m=new kn(m.array.slice(),m.itemSize,m.normalized));for(let T=0,C=w.length;T<C;T++){const b=w[T];if(m.setX(b,A[T*l]),l>=2&&m.setY(b,A[T*l+1]),l>=3&&m.setZ(b,A[T*l+2]),l>=4&&m.setW(b,A[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=ig[h.magFilter]||Mi,u.minFilter=ig[h.minFilter]||mr,u.wrapS=rg[h.wrapS]||Vo,u.wrapT=rg[h.wrapT]||Vo,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(f){c=!0;const h=new Blob([f],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(f){return new Promise(function(h,d){let g=h;t.isImageBitmapLoader===!0&&(g=function(_){const m=new sn(_);m.needsUpdate=!0,h(m)}),t.load(Ia.resolveURL(f,s.path),g,void 0,d)})}).then(function(f){return c===!0&&a.revokeObjectURL(l),f.userData.mimeType=o.mimeType||WA(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[dt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Ng,Ki.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Ig,Ki.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Zh}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[dt.KHR_MATERIALS_UNLIT]){const f=i[dt.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),c.push(f.extendParams(a,s,t))}else{const f=s.pbrMetallicRoughness||{};if(a.color=new et(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],zn),a.opacity=h[3]}f.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",f.baseColorTexture,hn)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=yi);const u=s.alphaMode||cf.OPAQUE;if(u===cf.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===cf.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==_r&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new pt(1,1),s.normalTexture.scale!==void 0)){const f=s.normalTexture.scale;a.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==_r&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==_r){const f=s.emissiveFactor;a.emissive=new et().setRGB(f[0],f[1],f[2],zn)}return s.emissiveTexture!==void 0&&o!==_r&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,hn)),Promise.all(c).then(function(){const f=new o(a);return s.name&&(f.name=s.name),Gr(f,s),t.associations.set(f,{materials:e}),s.extensions&&vs(i,f,s),f})}createUniqueName(e){const t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return sg(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=GA(c),f=i[u];if(f)o.push(f.promise);else{let h;c.extensions&&c.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?h=s(c):h=sg(new ki,c,t),i[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?zA(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],f=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],m=o[d];let p;const M=c[d];if(m.mode===_i.TRIANGLES||m.mode===_i.TRIANGLE_STRIP||m.mode===_i.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new vv(_,M):new On(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===_i.TRIANGLE_STRIP?p.geometry=tg(p.geometry,vg):m.mode===_i.TRIANGLE_FAN&&(p.geometry=tg(p.geometry,jf));else if(m.mode===_i.LINES)p=new wv(_,M);else if(m.mode===_i.LINE_STRIP)p=new Kh(_,M);else if(m.mode===_i.LINE_LOOP)p=new Av(_,M);else if(m.mode===_i.POINTS)p=new Rv(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&HA(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Gr(p,s),m.extensions&&vs(i,p,m),t.assignFinalMaterial(p),f.push(p)}for(let d=0,g=f.length;d<g;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return s.extensions&&vs(i,f[0],s),f[0];const h=new xr;s.extensions&&vs(i,h,s),t.associations.set(h,{meshes:e});for(let d=0,g=f.length;d<g;d++)h.add(f[d]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nn(Vx.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Qh(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Gr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const f=o[c];if(f){a.push(f);const h=new st;s!==null&&h.fromArray(s.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new qh(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let f=0,h=i.channels.length;f<h;f++){const d=i.channels[f],g=i.samplers[d.sampler],_=d.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],g=f[2],_=f[3],m=f[4],p=[];for(let M=0,y=h.length;M<y;M++){const x=h[M],w=d[M],A=g[M],T=_[M],C=m[M];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const b=n._createAnimationTracks(x,w,A,T,C);if(b)for(let v=0;v<b.length;v++)p.push(b[v])}return new Bv(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],f=c[1],h=c[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,XA)});for(let d=0,g=f.length;d<g;d++)u.add(f[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new Dg:c.length>1?u=new xr:c.length===1?u=c[0]:u=new Ht,u!==c[0])for(let f=0,h=c.length;f<h;f++)u.add(c[f]);if(s.name&&(u.userData.name=s.name,u.name=o),Gr(u,s),s.extensions&&vs(n,u,s),s.matrix!==void 0){const f=new st;f.fromArray(s.matrix),u.applyMatrix4(f)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new xr;n.name&&(s.name=i.createUniqueName(n.name)),Gr(s,n),n.extensions&&vs(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,f=l.length;u<f;u++)s.add(l[u]);const c=u=>{const f=new Map;for(const[h,d]of i.associations)(h instanceof Ki||h instanceof sn)&&f.set(h,d);return u.traverse(h=>{const d=i.associations.get(h);d!=null&&f.set(h,d)}),f};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Br[s.path]===Br.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(Br[s.path]){case Br.weights:c=Wo;break;case Br.rotation:c=Xo;break;case Br.position:case Br.scale:c=Yo;break;default:switch(n.itemSize){case 1:c=Wo;break;case 2:case 3:default:c=Yo;break}break}const u=i.interpolation!==void 0?kA[i.interpolation]:Ja,f=this._getArrayFromAccessor(n);for(let h=0,d=l.length;h<d;h++){const g=new c(l[h]+"."+Br[s.path],t.array,f,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ih(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Xo?BA:U0;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function qA(r,e,t){const n=e.attributes,i=new nr;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new V(l[0],l[1],l[2]),new V(c[0],c[1],c[2])),a.normalized){const u=Ih(Fo[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new V,l=new V;for(let c=0,u=s.length;c<u;c++){const f=s[c];if(f.POSITION!==void 0){const h=t.json.accessors[f.POSITION],d=h.min,g=h.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),h.normalized){const _=Ih(Fo[h.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new ir;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function sg(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Lh[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return gt.workingColorSpace!==zn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${gt.workingColorSpace}" not supported.`),Gr(r,e),qA(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?VA(r,e.targets,t):r})}const $A=`
varying vec3 worldNormal;
varying vec3 eyeVector;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  worldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
  eyeVector = normalize(worldPos.xyz - cameraPosition);
}
`,KA=`
uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;

uniform float uSaturation;
uniform float uChromaticAberration;
uniform float uRefractPower;
uniform float uFresnelPower;
uniform float uShininess;
uniform float uDiffuseness;
uniform vec3 uLight;

uniform vec2 winResolution;
uniform sampler2D uTexture;

varying vec3 worldNormal;
varying vec3 eyeVector;

vec3 sat(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;
  
  return pow(inversefresnelFactor, power);
}

float specular(vec3 light, float shininess, float diffuseness) {
  vec3 normal = worldNormal;
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeVector + lightVector);

  float NdotL = dot(normal, lightVector);
  float NdotH =  dot(normal, halfVector);
  float kDiffuse = max(0.0, NdotL);
  float NdotH2 = NdotH * NdotH;

  float kSpecular = pow(NdotH2, shininess);
  return  kSpecular + kDiffuse * diffuseness;
}

const int LOOP = 16;

void main() {
  float iorRatioRed = 1.0/uIorR;
  float iorRatioGreen = 1.0/uIorG;
  float iorRatioBlue = 1.0/uIorB;

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;
  vec3 color = vec3(0.0);

  for ( int i = 0; i < LOOP; i ++ ) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(eyeVector, normal,(1.0/uIorR));
    vec3 refractVecY = refract(eyeVector, normal, (1.0/uIorY));
    vec3 refractVecG = refract(eyeVector, normal, (1.0/uIorG));
    vec3 refractVecC = refract(eyeVector, normal, (1.0/uIorC));
    vec3 refractVecB = refract(eyeVector, normal, (1.0/uIorB));
    vec3 refractVecP = refract(eyeVector, normal, (1.0/uIorP));

    float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;

    float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;

    float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;

    float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;
          
    float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;

    float p = (texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;

    float R = r + (2.0*p + 2.0*y - c)/3.0;
    float G = g + (2.0*y + 2.0*c - p)/3.0;
    float B = b + (2.0*c + 2.0*p - y)/3.0;

    color.r += R;
    color.g += G;
    color.b += B;

    color = sat(color, uSaturation);
  }

  // Divide by the number of layers to normalize colors (rgb values can be worth up to the value of LOOP)
  color /= float( LOOP );

  // Specular
  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight;

  // Fresnel
  float f = fresnel(eyeVector, normal, uFresnelPower);
  color.rgb += f * vec3(1.0);
  
  gl_FragColor = vec4(color, 1.0);
}
`;let Nh=null,ei=null,Uh=!1;function jA(r,e,t,n,i,s,o,a,l,c){new pA().load("/models/nftfi_logo.glb",f=>{const h=new nr().setFromObject(f.scene),d=new V,g=new V;h.getCenter(d),h.getSize(g),f.scene.traverse(p=>{p.isMesh&&(Nh=p,p.geometry&&p.geometry.computeVertexNormals(),p.material=new wr({vertexShader:$A,fragmentShader:KA,uniforms:e,side:yi}),p.material.program&&p.material.program.error&&console.error("Shader compilation error:",p.material.program.error))}),ei=new xr,f.scene.position.set(-d.x,-d.y,-d.z),ei.add(f.scene);const _=t();ei.position.set(_.x,_.y,_.z),ei.scale.setScalar(1e-4),ei.visible=!1;const m=document.getElementById("three-canvas");m&&(m.style.opacity="0"),window.textureReady=!1,r.add(ei),window.wrapper=ei,window.DEBUG={gltf:f.scene,wrapper:ei,originalPosition:f.scene.position.clone(),center:d.clone(),size:g.clone(),box:h,setWrapperPosition:(p,M,y)=>{ei.position.set(p,M,y)},setOriginalPosition:(p,M,y)=>{f.scene.position.set(p,M,y)},resetPositions:()=>{ei.position.set(0,0,0),f.scene.position.set(-d.x,-d.y,-d.z)},logPositions:()=>{},resetScrollAnimation:s,updatePlaneTexture:()=>o(),captureHeroAsTexture:a,worldToPosition:l,calculateTargetPosition:c},Uh=!0,n(),i(ei,t,c)},f=>{},f=>{console.error("Error loading model:",f)})}_e.registerPlugin(je);function ZA(){console.log("Stats animations disabled - section 2 animations removed")}function JA(){console.log("Heading animations disabled")}_e.registerPlugin(je);let ff=null,og,ya,rc=!0;function QA(){const r=document.querySelector(".nav-items-desktop");if(document.querySelector(".nav-items-mobile"),!r){console.warn("Desktop navigation not found, header animation disabled");return}if(!r.parentElement.classList.contains("desktop-nav-wrapper")){const n=document.createElement("div");n.className="desktop-nav-wrapper",r.parentNode.insertBefore(n,r),n.appendChild(r)}ff=document.querySelector(".desktop-nav-wrapper");const e=()=>{clearTimeout(og),rc&&(rc=!1,_e.to(ff,{y:-100,duration:.3,overwrite:!0,ease:"power2.out"}))},t=()=>{clearTimeout(og),!rc&&(rc=!0,_e.to(ff,{y:0,duration:.3,overwrite:!0,ease:"power2.out"}))};if(ya&&ya.kill){try{ya.kill()}catch{}ya=null}ya=je.create({start:0,end:"max",onUpdate:n=>{const i=n.getVelocity();i>1?e():i<-1&&t()}}),console.log("Header hide/show animation initialized")}let ag;function e1(r){clearTimeout(ag),ag=setTimeout(()=>{r()},250)}function t1(r,e,t){return function(){r(),e(),e1(t)}}function n1(r){window.addEventListener("resize",r);let e;window.addEventListener("scroll",()=>{fA(),clearTimeout(e),e=setTimeout(()=>{},16)},{passive:!0}),window.addEventListener("mousemove",t=>{if(!window.mouseInfluence)return;const n=t.clientX/window.innerWidth*2-1,i=t.clientY/window.innerHeight*2-1;window.mouseInfluence.x+=(n-window.mouseInfluence.x)*.1,window.mouseInfluence.y+=(i-window.mouseInfluence.y)*.1,window.lastMousePos={x:t.clientX,y:t.clientY}}),window.addEventListener("touchmove",t=>{if(!window.mouseInfluence||t.touches.length===0)return;const n=t.touches[0],i=n.clientX/window.innerWidth*2-1,s=n.clientY/window.innerHeight*2-1;window.mouseInfluence.x+=(i-window.mouseInfluence.x)*.05,window.mouseInfluence.y+=(s-window.mouseInfluence.y)*.05,window.lastMousePos={x:n.clientX,y:n.clientY}},{passive:!0}),window.addEventListener("keydown",t=>{t.key.toLowerCase()==="s"&&t.ctrlKey&&(t.preventDefault(),window.scrollSmoother&&(window.scrollSmoother.status().isEnabled?(window.scrollSmoother.disable(),console.log("🔄 ScrollSmoother disabled via keyboard shortcut")):(window.scrollSmoother.enable(),console.log("🔄 ScrollSmoother enabled via keyboard shortcut")))),t.key.toLowerCase()==="t"&&t.ctrlKey&&(t.preventDefault(),window.scrollSmoother&&window.scrollSmoother.test()),t.key.toLowerCase()==="e"&&t.ctrlKey&&(t.preventDefault(),window.scrollSmoother&&(window.scrollSmoother.emergency(),console.log("🚨 Emergency ScrollSmoother disable triggered")))}),console.log("Event listeners added successfully")}let Oo=null;function sc(r){if(!xt)throw new Error("[Section3Dashboard] Missing SECTION3 config");if(!xt.svg)throw new Error("[Section3Dashboard] Missing SECTION3.svg config");const e=xt.svg[r];if(!e)throw new Error("[Section3Dashboard] Missing SECTION3.svg."+r+" config");if(typeof e.x!="number")throw new Error("[Section3Dashboard] Invalid x in SECTION3.svg."+r);if(typeof e.scale!="number")throw new Error("[Section3Dashboard] Invalid scale in SECTION3.svg."+r);const t=typeof e.transformOrigin=="string"?e.transformOrigin:"0% 0%";return{x:e.x,scale:e.scale,transformOrigin:t}}function Fd(){const r=document.getElementById("dashboard-svg-container");if(!r)throw new Error("[Section3Dashboard] Container #dashboard-svg-container not found");const e=r.querySelector("svg");if(!e)throw new Error("[Section3Dashboard] Inline SVG element not found");return e}function i1(r){const e=new Set,t=[];for(let n=0;n<r.length;n+=1){const i=r[n];e.has(i)||(e.add(i),t.push(i))}return t}function r1(r){const e=['[id^="#animate"]'],t=r.querySelectorAll(e.join(", ")),n=i1(Array.prototype.slice.call(t)),i=new Map;for(let o=0;o<n.length;o+=1){const a=n[o],l=a.getAttribute("id");l&&l.indexOf("#animate")===0&&i.set(l,a)}const s={all:n,byId:i,byClass:new Map};return Oo=s,s}async function s1(){try{const r=document.getElementById("dashboard-svg-container");if(!r)return console.warn("[Section3Dashboard] Container #dashboard-svg-container not found. Skipping SVG embed."),!1;if(r.querySelector("svg"))return!0;const t=await fetch("images/dashboard.svg",{cache:"no-store"});if(!t||!t.ok)return console.error("[Section3Dashboard] Failed to fetch images/dashboard.svg. Response not OK."),!1;const n=await t.text();if(typeof n!="string")return console.error("[Section3Dashboard] SVG response is not text."),!1;if(n.indexOf("<svg")===-1)return console.error("[Section3Dashboard] SVG content missing <svg> root element."),!1;r.innerHTML=n,r.setAttribute("data-dashboard-loaded","true");const i=Fd();if(typeof _e<"u"&&_e&&typeof _e.matchMedia=="function"){const s=_e.matchMedia();s.add("(min-width: 1024px)",()=>{try{const o=sc("desktop");_e.set(i,{x:o.x,scale:o.scale,transformOrigin:o.transformOrigin})}catch(o){console.error(o)}}),s.add("(min-width: 768px) and (max-width: 1023px)",()=>{try{const o=sc("tablet");_e.set(i,{x:o.x,scale:o.scale,transformOrigin:o.transformOrigin})}catch(o){console.error(o)}}),s.add("(max-width: 767px)",()=>{try{const o=sc("mobile");_e.set(i,{x:o.x,scale:o.scale,transformOrigin:o.transformOrigin})}catch(o){console.error(o)}})}else if(typeof _e<"u"&&_e&&typeof _e.set=="function")try{const s=sc("desktop");_e.set(i,{x:s.x,scale:s.scale,transformOrigin:s.transformOrigin})}catch(s){console.error(s)}else console.warn("[Section3Dashboard] GSAP not available to set initial SVG position.");return Oo=r1(i),console.log("[Section3Dashboard] animate* targets discovered:",{total:Oo.all.length,ids:Array.from(Oo.byId.keys()).slice(0,10)}),!0}catch(r){return console.error("[Section3Dashboard] Error embedding dashboard.svg:",r),!1}}function o1(){if(!Oo)throw new Error("[Section3Dashboard] Targets not discovered yet. Call initSection3Dashboard first.");return Oo}_e.registerPlugin(je);function a1(){const r=document.querySelector("section[data-section='3']");if(!r)return console.error("[Section3Dashboard] Section 3 element not found for ScrollTrigger"),null;const e=r.querySelector(".hero.hero--looper");Fd();const t=o1();let n=100;try{mc&&typeof mc.durationVh=="number"&&(n=Math.max(1,mc.durationVh))}catch{}const i=_e.timeline({scrollTrigger:{trigger:r,start:"top top",end:"+="+String(n)+"%",pin:!0,pinSpacing:!0,anticipatePin:1,invalidateOnRefresh:!0,scrub:!0}});try{_e.set(".section3-features .features-title",{opacity:0}),_e.set(".section3-features .feature-block",{opacity:0})}catch{}i.addLabel("intro",0),i.addLabel("highlight","+="+ks("introDuration")),i.addLabel("outro","+="+ks("outroDuration")),i.to(".section3-features .features-title",{opacity:1,duration:.35,ease:"power1.out"},"intro+=0.05"),l1(i,t),console.log("[Section3Dashboard] Section 3 timeline created with ScrollTrigger pin+scrub");try{je.refresh()}catch{}try{if(e&&typeof _e.matchMedia=="function"){const s=_e.matchMedia(),o=a=>()=>{const l=gc&&gc[a]?gc[a]:null;if(!l)return;const c=typeof l.width=="number"?l.width:null,u=typeof l.height=="number"?l.height:null,f=typeof l.left=="string"?l.left:"50%",h=typeof l.top=="string"?l.top:"50%",d=typeof l.xPercent=="number"?l.xPercent:-50,g=typeof l.yPercent=="number"?l.yPercent:-50,_={position:"absolute",zIndex:1,pointerEvents:"none",left:f,top:h,xPercent:d,yPercent:g};c!=null&&(_.width=c),u!=null&&(_.height=u),_e.set(e,_)};s.add("(max-width: 767px)",o("mobile")),s.add("(min-width: 768px) and (max-width: 1023px)",o("tablet")),s.add("(min-width: 1024px)",o("desktop"))}}catch{}return i}function ks(r){if(!xt||!xt.sequence)throw new Error("[Section3Dashboard] Missing SECTION3.sequence config");const e=xt.sequence[r];if(typeof e!="number")throw new Error("[Section3Dashboard] Invalid SECTION3.sequence."+r);return e}function l1(r,e){if(xt&&xt.targets&&Array.isArray(xt.targets.detail)&&xt.targets.detail.length>0){try{d1(r,e)}catch{}return}const t=ks("yIn"),n=ks("yOut"),i=ks("stagger");let s=[];xt&&xt.targets&&Array.isArray(xt.targets.ids)&&(s=xt.targets.ids);const o=[];for(let u=0;u<s.length;u+=1){const f=s[u];e.byId.has(f)&&o.push(f)}if(o.length>0){let u=0;for(let f=0;f<o.length;f+=1){const h=o[f],d=e.byId.get(h);d&&(hf(r,d,u,t,n,i),u+=1)}return}const a=Array.from(e.byId.keys()).sort(),l=Array.from(e.byClass.keys()).sort();let c=0;for(let u=0;u<a.length;u+=1){const f=a[u],h=e.byId.get(f);h&&(hf(r,h,c,t,n,i),c+=1)}for(let u=0;u<l.length;u+=1){const f=l[u],h=e.byClass.get(f);if(h)for(let d=0;d<h.length;d+=1)hf(r,h[d],c,t,n,i),c+=1}}function hf(r,e,t,n,i,s){const o="intro+="+(t*s).toFixed(3),a="highlight+="+(t*s).toFixed(3),l="outro+="+(t*s).toFixed(3);r.fromTo(e,{y:0},{y:n,ease:"none"},o),r.to(e,{y:n,ease:"none"},a),r.to(e,{y:i,ease:"none"},l)}function Wr(r){return ks(r)}function c1(){if(!xt)throw new Error("[Section3Dashboard] Missing SECTION3");if(!xt.targets||!Array.isArray(xt.targets.detail))throw new Error("[Section3Dashboard] Missing SECTION3.targets.detail");const r=Wr("riseDuration"),e=Wr("holdDefault"),t=Wr("returnDuration"),n=Wr("baseStagger"),i=Wr("groupGap"),s=Wr("jitterMax"),o=Math.abs(ks("yIn")),a=xt.targets.detail,l=[];for(let c=0;c<a.length;c+=1){const u=a[c];if(!u||typeof u.id!="string")continue;const f={id:u.id,group:typeof u.group=="string"?u.group:"default",maxY:typeof u.maxY=="number"?Math.max(0,u.maxY):o,hold:typeof u.hold=="number"?Math.max(0,u.hold):e,jitter:typeof u.jitter=="number"?Math.max(0,u.jitter):s,riseDuration:typeof u.riseDuration=="number"?Math.max(0,u.riseDuration):r,returnDuration:typeof u.returnDuration=="number"?Math.max(0,u.returnDuration):t};l.push(f)}return{specs:l,baseStagger:n,groupGap:i}}function u1(r,e){let t=2166136261;for(let s=0;s<r.length;s+=1)t^=r.charCodeAt(s),t=Math.imul(t,16777619);return((t>>>0)/4294967296*2-1)*e}function oc(r){let e=2166136261;for(let n=0;n<r.length;n+=1)e^=r.charCodeAt(n),e=Math.imul(e,16777619);return(e>>>0)/4294967296}function f1(r){if(!r||!r.byId)return[];const e=xt&&xt.targets&&xt.targets.bubbles?xt.targets.bubbles.parentId:"#animate-bubble",t=r.byId.get(e);if(!t||typeof t.querySelectorAll!="function")return[];const n=t.querySelectorAll("circle, ellipse"),i=Array.prototype.slice.call(n),s=[];for(let o=0;o<i.length;o+=1){const a=i[o];if(typeof a.getAttribute=="function"){const l=a.getAttribute("id");typeof l=="string"&&/^Ellipse\s*\d+$/.test(l)&&s.push(a)}}try{const o=xt&&xt.targets&&xt.targets.bubbles&&Array.isArray(xt.targets.bubbles.extraIds)?xt.targets.bubbles.extraIds:[],a=Fd();for(let l=0;l<o.length;l+=1){const c=o[l];if(typeof c!="string"||c.length===0)continue;let u=a.querySelector('[id="'+c+'"]');!u&&c.charAt(0)!=="#"&&(u=a.querySelector('[id="#'+c+'"]')),u&&s.indexOf(u)===-1&&s.push(u)}}catch{}return s}function h1(r,e,t){const n=f1(e);if(!n||n.length===0)return;const i=Wr("riseDuration"),s=Wr("returnDuration"),o=xt&&xt.targets&&xt.targets.bubbles?xt.targets.bubbles:{},a=typeof o.startWindowSec=="number"?o.startWindowSec:1.25,l=typeof o.holdMinSec=="number"?o.holdMinSec:4,c=typeof o.holdMaxSec=="number"?o.holdMaxSec:8,u=typeof o.returnWindowSec=="number"?o.returnWindowSec:1.25,f=typeof o.minRange=="number"?o.minRange:12,h=typeof o.maxRange=="number"?o.maxRange:60;let d=t;for(let g=0;g<n.length;g+=1){const _=n[g];let m="";if(typeof _.getAttribute=="function"){const v=_.getAttribute("id");typeof v=="string"&&v.length>0?m=v:m=String(_.tagName||"el")+"-"+String(g)}else m="el-"+String(g);const p=oc(m+":range"),M=oc(m+":start"),y=oc(m+":hold"),x=oc(m+":return"),w=f+p*(h-f),A=t+M*a,T=l+y*(c-l);r.to(_,{y:"-="+String(Math.abs(w)),duration:i,ease:"none"},"intro+="+A.toFixed(3));const C=A+i+T+x*u;r.to(_,{y:"+="+String(Math.abs(w)),duration:s,ease:"none"},"intro+="+C.toFixed(3));const b=C+s;b>d&&(d=b)}return Math.max(0,d-t)}function d1(r,e){const{specs:t,baseStagger:n,groupGap:i}=c1(),s=new Map;for(let u=0;u<t.length;u+=1){const f=t[u];s.has(f.group)||s.set(f.group,[]),s.get(f.group).push(f)}let o=0;const a=[".section3-features .feature-1",".section3-features .feature-2",".section3-features .feature-3",".section3-features .feature-4"];let l=0;const c=Array.from(s.keys());for(let u=0;u<c.length;u+=1){const f=c[u],h=s.get(f);let d=o;if(l<a.length){const g=a[l];try{r.to(g,{opacity:1,duration:.3,ease:"power1.out"},"intro+="+o.toFixed(3)),l+=1}catch{}}for(let g=0;g<h.length;g+=1){const _=h[g],m=e.byId.get(_.id);if(!m)continue;const p=u1(_.id,_.jitter),M=o+g*n+p,y=_.riseDuration,x=_.hold,w=_.returnDuration,A=-Math.abs(_.maxY);r.fromTo(m,{y:0},{y:A,duration:y,ease:"none"},"intro+="+M.toFixed(3));const T=M+y+x;r.to(m,{y:0,duration:w,ease:"none"},"intro+="+T.toFixed(3));const C=T+w;C>d&&(d=C)}if(f==="boxes"){const g=d+i;let _=0;try{const m=h1(r,e,g);typeof m=="number"&&m>0&&(_=m)}catch{}if(l<a.length){const m=a[l];try{r.to(m,{opacity:1,duration:.3,ease:"power1.out"},"intro+="+g.toFixed(3)),l+=1}catch{}}o=g+_+i;continue}o=d+i}}function p1(){window.scrollTo(0,0),setTimeout(()=>{window.scrollTo(0,0)},0),console.log("App initialized - ScrollSmoother will manage scrolling during animation"),E0();const r=cA();console.log("ScrollSmoother initialization result:",r?"success":"skipped"),QA();const{scene:e,camera:t,uniforms:n}=jT();document.getElementById("three-canvas"),mw(e),jA(e,n,Kc,Mm,Hw,Ww,bm,Sd,ru,Dh);const i=t1(ZT,Mm,bm);n1(i),window.mouseInfluence={x:0,y:0},window.lastMousePos={x:0,y:0},A0(t),ZA(),JA(),s1().then(o=>{if(console.log("Section 3 dashboard embed:",o?"success":"skipped"),o)try{a1()}catch(a){console.error(a)}});const s=()=>{Uh&&Nh&&ei?hA(Nh,ei,Uh):setTimeout(s,100)};s(),console.log("Current animation state:",Bi()),window.debugSetState=xo,window.getCurrentAnimationState=Bi,window.debugAnimationStates={testMobile:()=>xo("mobile"),testTablet:()=>xo("tablet"),testDesktop:()=>xo("desktop"),getCurrentPositions:()=>{const o=Kc(),a=Dh();return console.log("Current positions:",{state:Bi(),start:o,target:a}),{start:o,target:a}},testAllStates:()=>{console.log("Testing all animation states..."),["mobile","tablet","desktop"].forEach(o=>{xo(o),setTimeout(()=>{const a=window.debugAnimationStates.getCurrentPositions();console.log(`${o} state:`,a)},100)})}}}document.addEventListener("DOMContentLoaded",()=>{dA(),p1(),I0(),setTimeout(()=>{window.DEBUG&&window.DEBUG.updatePlaneTexture&&window.DEBUG.updatePlaneTexture()},500)});
