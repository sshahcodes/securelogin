/*!
 * tweetnacl-js, tweetnacl-util-js, tweetnacl-auth-js, async-scrypt
 * Copyright (c) 2013-2016 Dmitry Chestnykh | BSD License
 * https://github.com/dchest/scrypt-async-js
 */




//    unverified requests in cordova (deprecated)

window.handleOpenURL = function(arg) {
  clearTimeout(window.delayed_launch)
  /*
  var hash = arg.substr(arg.indexOf('#')+1)
  if(localStorage.current_profile){

    console.log(hash)
    messageDispatcher(fromQuery(hash));

  }else{
    location.hash = hash
  }
  */
}


try{
  window.nodeRequire = require;
  delete window.require;
  delete window.exports;
  delete window.module;

  E = nodeRequire('electron')

  E.ipcRenderer.on('verifiedRequest', function(event, arg){
    clearTimeout(window.delayed_launch)
    var hash = fromQuery(arg.request)
    hash.client = arg.client
    messageDispatcher(hash)
  })
}catch(e){
  E = false
}




!function(r){"use strict";function n(r,n){return r<<n|r>>>32-n}function e(r,n){var e=255&r[n+3];return e=e<<8|255&r[n+2],e=e<<8|255&r[n+1],e<<8|255&r[n+0]}function t(r,n){var e=r[n]<<24|r[n+1]<<16|r[n+2]<<8|r[n+3],t=r[n+4]<<24|r[n+5]<<16|r[n+6]<<8|r[n+7];return new sr(e,t)}function o(r,n,e){var t;for(t=0;t<4;t++)r[n+t]=255&e,e>>>=8}function i(r,n,e){r[n]=e.hi>>24&255,r[n+1]=e.hi>>16&255,r[n+2]=e.hi>>8&255,r[n+3]=255&e.hi,r[n+4]=e.lo>>24&255,r[n+5]=e.lo>>16&255,r[n+6]=e.lo>>8&255,r[n+7]=255&e.lo}function a(r,n,e,t,o){var i,a=0;for(i=0;i<o;i++)a|=r[n+i]^e[t+i];return(1&a-1>>>8)-1}function f(r,n,e,t){return a(r,n,e,t,16)}function u(r,n,e,t){return a(r,n,e,t,32)}function c(r,t,i,a,f){var u,c,w,y=new Uint32Array(16),l=new Uint32Array(16),s=new Uint32Array(16),h=new Uint32Array(4);for(u=0;u<4;u++)l[5*u]=e(a,4*u),l[1+u]=e(i,4*u),l[6+u]=e(t,4*u),l[11+u]=e(i,16+4*u);for(u=0;u<16;u++)s[u]=l[u];for(u=0;u<20;u++){for(c=0;c<4;c++){for(w=0;w<4;w++)h[w]=l[(5*c+4*w)%16];for(h[1]^=n(h[0]+h[3]|0,7),h[2]^=n(h[1]+h[0]|0,9),h[3]^=n(h[2]+h[1]|0,13),h[0]^=n(h[3]+h[2]|0,18),w=0;w<4;w++)y[4*c+(c+w)%4]=h[w]}for(w=0;w<16;w++)l[w]=y[w]}if(f){for(u=0;u<16;u++)l[u]=l[u]+s[u]|0;for(u=0;u<4;u++)l[5*u]=l[5*u]-e(a,4*u)|0,l[6+u]=l[6+u]-e(t,4*u)|0;for(u=0;u<4;u++)o(r,4*u,l[5*u]),o(r,16+4*u,l[6+u])}else for(u=0;u<16;u++)o(r,4*u,l[u]+s[u]|0)}function w(r,n,e,t){return c(r,n,e,t,!1),0}function y(r,n,e,t){return c(r,n,e,t,!0),0}function l(r,n,e,t,o,i,a){var f,u,c=new Uint8Array(16),y=new Uint8Array(64);if(!o)return 0;for(u=0;u<16;u++)c[u]=0;for(u=0;u<8;u++)c[u]=i[u];for(;o>=64;){for(w(y,c,a,Br),u=0;u<64;u++)r[n+u]=(e?e[t+u]:0)^y[u];for(f=1,u=8;u<16;u++)f=f+(255&c[u])|0,c[u]=255&f,f>>>=8;o-=64,n+=64,e&&(t+=64)}if(o>0)for(w(y,c,a,Br),u=0;u<o;u++)r[n+u]=(e?e[t+u]:0)^y[u];return 0}function s(r,n,e,t,o){return l(r,n,null,0,e,t,o)}function h(r,n,e,t,o){var i=new Uint8Array(32);return y(i,t,o,Br),s(r,n,e,t.subarray(16),i)}function g(r,n,e,t,o,i,a){var f=new Uint8Array(32);return y(f,i,a,Br),l(r,n,e,t,o,i.subarray(16),f)}function v(r,n){var e,t=0;for(e=0;e<17;e++)t=t+(r[e]+n[e]|0)|0,r[e]=255&t,t>>>=8}function b(r,n,e,t,o,i){var a,f,u,c,w=new Uint32Array(17),y=new Uint32Array(17),l=new Uint32Array(17),s=new Uint32Array(17),h=new Uint32Array(17);for(u=0;u<17;u++)y[u]=l[u]=0;for(u=0;u<16;u++)y[u]=i[u];for(y[3]&=15,y[4]&=252,y[7]&=15,y[8]&=252,y[11]&=15,y[12]&=252,y[15]&=15;o>0;){for(u=0;u<17;u++)s[u]=0;for(u=0;u<16&&u<o;++u)s[u]=e[t+u];for(s[u]=1,t+=u,o-=u,v(l,s),f=0;f<17;f++)for(w[f]=0,u=0;u<17;u++)w[f]=w[f]+l[u]*(u<=f?y[f-u]:320*y[f+17-u]|0)|0|0;for(f=0;f<17;f++)l[f]=w[f];for(c=0,u=0;u<16;u++)c=c+l[u]|0,l[u]=255&c,c>>>=8;for(c=c+l[16]|0,l[16]=3&c,c=5*(c>>>2)|0,u=0;u<16;u++)c=c+l[u]|0,l[u]=255&c,c>>>=8;c=c+l[16]|0,l[16]=c}for(u=0;u<17;u++)h[u]=l[u];for(v(l,Sr),a=0|-(l[16]>>>7),u=0;u<17;u++)l[u]^=a&(h[u]^l[u]);for(u=0;u<16;u++)s[u]=i[u+16];for(s[16]=0,v(l,s),u=0;u<16;u++)r[n+u]=l[u];return 0}function p(r,n,e,t,o,i){var a=new Uint8Array(16);return b(a,0,e,t,o,i),f(r,n,a,0)}function _(r,n,e,t,o){var i;if(e<32)return-1;for(g(r,0,n,0,e,t,o),b(r,16,r,32,e-32,r),i=0;i<16;i++)r[i]=0;return 0}function A(r,n,e,t,o){var i,a=new Uint8Array(32);if(e<32)return-1;if(h(a,0,32,t,o),0!==p(n,16,n,32,e-32,a))return-1;for(g(r,0,n,0,e,t,o),i=0;i<32;i++)r[i]=0;return 0}function U(r,n){var e;for(e=0;e<16;e++)r[e]=0|n[e]}function E(r){var n,e;for(e=0;e<16;e++)r[e]+=65536,n=Math.floor(r[e]/65536),r[(e+1)*(e<15?1:0)]+=n-1+37*(n-1)*(15===e?1:0),r[e]-=65536*n}function d(r,n,e){for(var t,o=~(e-1),i=0;i<16;i++)t=o&(r[i]^n[i]),r[i]^=t,n[i]^=t}function x(r,n){var e,t,o,i=hr(),a=hr();for(e=0;e<16;e++)a[e]=n[e];for(E(a),E(a),E(a),t=0;t<2;t++){for(i[0]=a[0]-65517,e=1;e<15;e++)i[e]=a[e]-65535-(i[e-1]>>16&1),i[e-1]&=65535;i[15]=a[15]-32767-(i[14]>>16&1),o=i[15]>>16&1,i[14]&=65535,d(a,i,1-o)}for(e=0;e<16;e++)r[2*e]=255&a[e],r[2*e+1]=a[e]>>8}function m(r,n){var e=new Uint8Array(32),t=new Uint8Array(32);return x(e,r),x(t,n),u(e,0,t,0)}function B(r){var n=new Uint8Array(32);return x(n,r),1&n[0]}function S(r,n){var e;for(e=0;e<16;e++)r[e]=n[2*e]+(n[2*e+1]<<8);r[15]&=32767}function K(r,n,e){var t;for(t=0;t<16;t++)r[t]=n[t]+e[t]|0}function T(r,n,e){var t;for(t=0;t<16;t++)r[t]=n[t]-e[t]|0}function Y(r,n,e){var t,o,i=new Float64Array(31);for(t=0;t<31;t++)i[t]=0;for(t=0;t<16;t++)for(o=0;o<16;o++)i[t+o]+=n[t]*e[o];for(t=0;t<15;t++)i[t]+=38*i[t+16];for(t=0;t<16;t++)r[t]=i[t];E(r),E(r)}function L(r,n){Y(r,n,n)}function k(r,n){var e,t=hr();for(e=0;e<16;e++)t[e]=n[e];for(e=253;e>=0;e--)L(t,t),2!==e&&4!==e&&Y(t,t,n);for(e=0;e<16;e++)r[e]=t[e]}function z(r,n){var e,t=hr();for(e=0;e<16;e++)t[e]=n[e];for(e=250;e>=0;e--)L(t,t),1!==e&&Y(t,t,n);for(e=0;e<16;e++)r[e]=t[e]}function R(r,n,e){var t,o,i=new Uint8Array(32),a=new Float64Array(80),f=hr(),u=hr(),c=hr(),w=hr(),y=hr(),l=hr();for(o=0;o<31;o++)i[o]=n[o];for(i[31]=127&n[31]|64,i[0]&=248,S(a,e),o=0;o<16;o++)u[o]=a[o],w[o]=f[o]=c[o]=0;for(f[0]=w[0]=1,o=254;o>=0;--o)t=i[o>>>3]>>>(7&o)&1,d(f,u,t),d(c,w,t),K(y,f,c),T(f,f,c),K(c,u,w),T(u,u,w),L(w,y),L(l,f),Y(f,c,f),Y(c,u,y),K(y,f,c),T(f,f,c),L(u,f),T(c,w,l),Y(f,c,Ar),K(f,f,w),Y(c,c,f),Y(f,w,l),Y(w,u,a),L(u,y),d(f,u,t),d(c,w,t);for(o=0;o<16;o++)a[o+16]=f[o],a[o+32]=c[o],a[o+48]=u[o],a[o+64]=w[o];var s=a.subarray(32),h=a.subarray(16);return k(s,s),Y(h,h,s),x(r,h),0}function P(r,n){return R(r,n,br)}function O(r,n){return gr(n,32),P(r,n)}function F(r,n,e){var t=new Uint8Array(32);return R(t,e,n),y(r,vr,t,Br)}function N(r,n,e,t,o,i){var a=new Uint8Array(32);return F(a,o,i),Kr(r,n,e,t,a)}function C(r,n,e,t,o,i){var a=new Uint8Array(32);return F(a,o,i),Tr(r,n,e,t,a)}function M(){var r,n,e,t=0,o=0,i=0,a=0,f=65535;for(e=0;e<arguments.length;e++)r=arguments[e].lo,n=arguments[e].hi,t+=r&f,o+=r>>>16,i+=n&f,a+=n>>>16;return o+=t>>>16,i+=o>>>16,a+=i>>>16,new sr(i&f|a<<16,t&f|o<<16)}function G(r,n){return new sr(r.hi>>>n,r.lo>>>n|r.hi<<32-n)}function Z(){var r,n=0,e=0;for(r=0;r<arguments.length;r++)n^=arguments[r].lo,e^=arguments[r].hi;return new sr(e,n)}function j(r,n){var e,t,o=32-n;return n<32?(e=r.hi>>>n|r.lo<<o,t=r.lo>>>n|r.hi<<o):n<64&&(e=r.lo>>>n|r.hi<<o,t=r.hi>>>n|r.lo<<o),new sr(e,t)}function q(r,n,e){var t=r.hi&n.hi^~r.hi&e.hi,o=r.lo&n.lo^~r.lo&e.lo;return new sr(t,o)}function I(r,n,e){var t=r.hi&n.hi^r.hi&e.hi^n.hi&e.hi,o=r.lo&n.lo^r.lo&e.lo^n.lo&e.lo;return new sr(t,o)}function V(r){return Z(j(r,28),j(r,34),j(r,39))}function X(r){return Z(j(r,14),j(r,18),j(r,41))}function D(r){return Z(j(r,1),j(r,8),G(r,7))}function H(r){return Z(j(r,19),j(r,61),G(r,6))}function J(r,n,e){var o,a,f,u=[],c=[],w=[],y=[];for(a=0;a<8;a++)u[a]=w[a]=t(r,8*a);for(var l=0;e>=128;){for(a=0;a<16;a++)y[a]=t(n,8*a+l);for(a=0;a<80;a++){for(f=0;f<8;f++)c[f]=w[f];for(o=M(w[7],X(w[4]),q(w[4],w[5],w[6]),Yr[a],y[a%16]),c[7]=M(o,V(w[0]),I(w[0],w[1],w[2])),c[3]=M(c[3],o),f=0;f<8;f++)w[(f+1)%8]=c[f];if(a%16===15)for(f=0;f<16;f++)y[f]=M(y[f],y[(f+9)%16],D(y[(f+1)%16]),H(y[(f+14)%16]))}for(a=0;a<8;a++)w[a]=M(w[a],u[a]),u[a]=w[a];l+=128,e-=128}for(a=0;a<8;a++)i(r,8*a,u[a]);return e}function Q(r,n,e){var t,o=new Uint8Array(64),a=new Uint8Array(256),f=e;for(t=0;t<64;t++)o[t]=Lr[t];for(J(o,n,e),e%=128,t=0;t<256;t++)a[t]=0;for(t=0;t<e;t++)a[t]=n[f-e+t];for(a[e]=128,e=256-128*(e<112?1:0),a[e-9]=0,i(a,e-8,new sr(f/536870912|0,f<<3)),J(o,a,e),t=0;t<64;t++)r[t]=o[t];return 0}function W(r,n){var e=hr(),t=hr(),o=hr(),i=hr(),a=hr(),f=hr(),u=hr(),c=hr(),w=hr();T(e,r[1],r[0]),T(w,n[1],n[0]),Y(e,e,w),K(t,r[0],r[1]),K(w,n[0],n[1]),Y(t,t,w),Y(o,r[3],n[3]),Y(o,o,Er),Y(i,r[2],n[2]),K(i,i,i),T(a,t,e),T(f,i,o),K(u,i,o),K(c,t,e),Y(r[0],a,f),Y(r[1],c,u),Y(r[2],u,f),Y(r[3],a,c)}function $(r,n,e){var t;for(t=0;t<4;t++)d(r[t],n[t],e)}function rr(r,n){var e=hr(),t=hr(),o=hr();k(o,n[2]),Y(e,n[0],o),Y(t,n[1],o),x(r,t),r[31]^=B(e)<<7}function nr(r,n,e){var t,o;for(U(r[0],pr),U(r[1],_r),U(r[2],_r),U(r[3],pr),o=255;o>=0;--o)t=e[o/8|0]>>(7&o)&1,$(r,n,t),W(n,r),W(r,r),$(r,n,t)}function er(r,n){var e=[hr(),hr(),hr(),hr()];U(e[0],dr),U(e[1],xr),U(e[2],_r),Y(e[3],dr,xr),nr(r,e,n)}function tr(r,n,e){var t,o=new Uint8Array(64),i=[hr(),hr(),hr(),hr()];for(e||gr(n,32),Q(o,n,32),o[0]&=248,o[31]&=127,o[31]|=64,er(i,o),rr(r,i),t=0;t<32;t++)n[t+32]=r[t];return 0}function or(r,n){var e,t,o,i;for(t=63;t>=32;--t){for(e=0,o=t-32,i=t-12;o<i;++o)n[o]+=e-16*n[t]*kr[o-(t-32)],e=n[o]+128>>8,n[o]-=256*e;n[o]+=e,n[t]=0}for(e=0,o=0;o<32;o++)n[o]+=e-(n[31]>>4)*kr[o],e=n[o]>>8,n[o]&=255;for(o=0;o<32;o++)n[o]-=e*kr[o];for(t=0;t<32;t++)n[t+1]+=n[t]>>8,r[t]=255&n[t]}function ir(r){var n,e=new Float64Array(64);for(n=0;n<64;n++)e[n]=r[n];for(n=0;n<64;n++)r[n]=0;or(r,e)}function ar(r,n,e,t){var o,i,a=new Uint8Array(64),f=new Uint8Array(64),u=new Uint8Array(64),c=new Float64Array(64),w=[hr(),hr(),hr(),hr()];Q(a,t,32),a[0]&=248,a[31]&=127,a[31]|=64;var y=e+64;for(o=0;o<e;o++)r[64+o]=n[o];for(o=0;o<32;o++)r[32+o]=a[32+o];for(Q(u,r.subarray(32),e+32),ir(u),er(w,u),rr(r,w),o=32;o<64;o++)r[o]=t[o];for(Q(f,r,e+64),ir(f),o=0;o<64;o++)c[o]=0;for(o=0;o<32;o++)c[o]=u[o];for(o=0;o<32;o++)for(i=0;i<32;i++)c[o+i]+=f[o]*a[i];return or(r.subarray(32),c),y}function fr(r,n){var e=hr(),t=hr(),o=hr(),i=hr(),a=hr(),f=hr(),u=hr();return U(r[2],_r),S(r[1],n),L(o,r[1]),Y(i,o,Ur),T(o,o,r[2]),K(i,r[2],i),L(a,i),L(f,a),Y(u,f,a),Y(e,u,o),Y(e,e,i),z(e,e),Y(e,e,o),Y(e,e,i),Y(e,e,i),Y(r[0],e,i),L(t,r[0]),Y(t,t,i),m(t,o)&&Y(r[0],r[0],mr),L(t,r[0]),Y(t,t,i),m(t,o)?-1:(B(r[0])===n[31]>>7&&T(r[0],pr,r[0]),Y(r[3],r[0],r[1]),0)}function ur(r,n,e,t){var o,i,a=new Uint8Array(32),f=new Uint8Array(64),c=[hr(),hr(),hr(),hr()],w=[hr(),hr(),hr(),hr()];if(i=-1,e<64)return-1;if(fr(w,t))return-1;for(o=0;o<e;o++)r[o]=n[o];for(o=0;o<32;o++)r[o+32]=t[o];if(Q(f,r,e),ir(f),nr(c,w,f),er(w,n.subarray(32)),W(c,w),rr(a,c),e-=64,u(n,0,a,0)){for(o=0;o<e;o++)r[o]=0;return-1}for(o=0;o<e;o++)r[o]=n[o+64];return i=e}function cr(r,n){if(r.length!==zr)throw new Error("bad key size");if(n.length!==Rr)throw new Error("bad nonce size")}function wr(r,n){if(r.length!==Cr)throw new Error("bad public key size");if(n.length!==Mr)throw new Error("bad secret key size")}function yr(){var r,n;for(n=0;n<arguments.length;n++)if("[object Uint8Array]"!==(r=Object.prototype.toString.call(arguments[n])))throw new TypeError("unexpected type "+r+", use Uint8Array")}function lr(r){for(var n=0;n<r.length;n++)r[n]=0}var sr=function(r,n){this.hi=0|r,this.lo=0|n},hr=function(r){var n,e=new Float64Array(16);if(r)for(n=0;n<r.length;n++)e[n]=r[n];return e},gr=function(){throw new Error("no PRNG")},vr=new Uint8Array(16),br=new Uint8Array(32);br[0]=9;var pr=hr(),_r=hr([1]),Ar=hr([56129,1]),Ur=hr([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),Er=hr([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),dr=hr([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),xr=hr([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),mr=hr([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]),Br=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]),Sr=new Uint32Array([5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,252]),Kr=_,Tr=A,Yr=[new sr(1116352408,3609767458),new sr(1899447441,602891725),new sr(3049323471,3964484399),new sr(3921009573,2173295548),new sr(961987163,4081628472),new sr(1508970993,3053834265),new sr(2453635748,2937671579),new sr(2870763221,3664609560),new sr(3624381080,2734883394),new sr(310598401,1164996542),new sr(607225278,1323610764),new sr(1426881987,3590304994),new sr(1925078388,4068182383),new sr(2162078206,991336113),new sr(2614888103,633803317),new sr(3248222580,3479774868),new sr(3835390401,2666613458),new sr(4022224774,944711139),new sr(264347078,2341262773),new sr(604807628,2007800933),new sr(770255983,1495990901),new sr(1249150122,1856431235),new sr(1555081692,3175218132),new sr(1996064986,2198950837),new sr(2554220882,3999719339),new sr(2821834349,766784016),new sr(2952996808,2566594879),new sr(3210313671,3203337956),new sr(3336571891,1034457026),new sr(3584528711,2466948901),new sr(113926993,3758326383),new sr(338241895,168717936),new sr(666307205,1188179964),new sr(773529912,1546045734),new sr(1294757372,1522805485),new sr(1396182291,2643833823),new sr(1695183700,2343527390),new sr(1986661051,1014477480),new sr(2177026350,1206759142),new sr(2456956037,344077627),new sr(2730485921,1290863460),new sr(2820302411,3158454273),new sr(3259730800,3505952657),new sr(3345764771,106217008),new sr(3516065817,3606008344),new sr(3600352804,1432725776),new sr(4094571909,1467031594),new sr(275423344,851169720),new sr(430227734,3100823752),new sr(506948616,1363258195),new sr(659060556,3750685593),new sr(883997877,3785050280),new sr(958139571,3318307427),new sr(1322822218,3812723403),new sr(1537002063,2003034995),new sr(1747873779,3602036899),new sr(1955562222,1575990012),new sr(2024104815,1125592928),new sr(2227730452,2716904306),new sr(2361852424,442776044),new sr(2428436474,593698344),new sr(2756734187,3733110249),new sr(3204031479,2999351573),new sr(3329325298,3815920427),new sr(3391569614,3928383900),new sr(3515267271,566280711),new sr(3940187606,3454069534),new sr(4118630271,4000239992),new sr(116418474,1914138554),new sr(174292421,2731055270),new sr(289380356,3203993006),new sr(460393269,320620315),new sr(685471733,587496836),new sr(852142971,1086792851),new sr(1017036298,365543100),new sr(1126000580,2618297676),new sr(1288033470,3409855158),new sr(1501505948,4234509866),new sr(1607167915,987167468),new sr(1816402316,1246189591)],Lr=new Uint8Array([106,9,230,103,243,188,201,8,187,103,174,133,132,202,167,59,60,110,243,114,254,148,248,43,165,79,245,58,95,29,54,241,81,14,82,127,173,230,130,209,155,5,104,140,43,62,108,31,31,131,217,171,251,65,189,107,91,224,205,25,19,126,33,121]),kr=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]),zr=32,Rr=24,Pr=32,Or=16,Fr=32,Nr=32,Cr=32,Mr=32,Gr=32,Zr=Rr,jr=Pr,qr=Or,Ir=64,Vr=32,Xr=64,Dr=32,Hr=64;r.lowlevel={crypto_core_hsalsa20:y,crypto_stream_xor:g,crypto_stream:h,crypto_stream_salsa20_xor:l,crypto_stream_salsa20:s,crypto_onetimeauth:b,crypto_onetimeauth_verify:p,crypto_verify_16:f,crypto_verify_32:u,crypto_secretbox:_,crypto_secretbox_open:A,crypto_scalarmult:R,crypto_scalarmult_base:P,crypto_box_beforenm:F,crypto_box_afternm:Kr,crypto_box:N,crypto_box_open:C,crypto_box_keypair:O,crypto_hash:Q,crypto_sign:ar,crypto_sign_keypair:tr,crypto_sign_open:ur,crypto_secretbox_KEYBYTES:zr,crypto_secretbox_NONCEBYTES:Rr,crypto_secretbox_ZEROBYTES:Pr,crypto_secretbox_BOXZEROBYTES:Or,crypto_scalarmult_BYTES:Fr,crypto_scalarmult_SCALARBYTES:Nr,crypto_box_PUBLICKEYBYTES:Cr,crypto_box_SECRETKEYBYTES:Mr,crypto_box_BEFORENMBYTES:Gr,crypto_box_NONCEBYTES:Zr,crypto_box_ZEROBYTES:jr,crypto_box_BOXZEROBYTES:qr,crypto_sign_BYTES:Ir,crypto_sign_PUBLICKEYBYTES:Vr,crypto_sign_SECRETKEYBYTES:Xr,crypto_sign_SEEDBYTES:Dr,crypto_hash_BYTES:Hr},r.util||(r.util={},r.util.decodeUTF8=r.util.encodeUTF8=r.util.encodeBase64=r.util.decodeBase64=function(){throw new Error("nacl.util moved into separate package: https://github.com/dchest/tweetnacl-util-js")}),r.randomBytes=function(r){var n=new Uint8Array(r);return gr(n,r),n},r.secretbox=function(r,n,e){yr(r,n,e),cr(e,n);for(var t=new Uint8Array(Pr+r.length),o=new Uint8Array(t.length),i=0;i<r.length;i++)t[i+Pr]=r[i];return _(o,t,t.length,n,e),o.subarray(Or)},r.secretbox.open=function(r,n,e){yr(r,n,e),cr(e,n);for(var t=new Uint8Array(Or+r.length),o=new Uint8Array(t.length),i=0;i<r.length;i++)t[i+Or]=r[i];return!(t.length<32)&&(0===A(o,t,t.length,n,e)&&o.subarray(Pr))},r.secretbox.keyLength=zr,r.secretbox.nonceLength=Rr,r.secretbox.overheadLength=Or,r.scalarMult=function(r,n){if(yr(r,n),r.length!==Nr)throw new Error("bad n size");if(n.length!==Fr)throw new Error("bad p size");var e=new Uint8Array(Fr);return R(e,r,n),e},r.scalarMult.base=function(r){if(yr(r),r.length!==Nr)throw new Error("bad n size");var n=new Uint8Array(Fr);return P(n,r),n},r.scalarMult.scalarLength=Nr,r.scalarMult.groupElementLength=Fr,r.box=function(n,e,t,o){var i=r.box.before(t,o);return r.secretbox(n,e,i)},r.box.before=function(r,n){yr(r,n),wr(r,n);var e=new Uint8Array(Gr);return F(e,r,n),e},r.box.after=r.secretbox,r.box.open=function(n,e,t,o){var i=r.box.before(t,o);return r.secretbox.open(n,e,i)},r.box.open.after=r.secretbox.open,r.box.keyPair=function(){var r=new Uint8Array(Cr),n=new Uint8Array(Mr);return O(r,n),{publicKey:r,secretKey:n}},r.box.keyPair.fromSecretKey=function(r){if(yr(r),r.length!==Mr)throw new Error("bad secret key size");var n=new Uint8Array(Cr);return P(n,r),{publicKey:n,secretKey:new Uint8Array(r)}},r.box.publicKeyLength=Cr,r.box.secretKeyLength=Mr,r.box.sharedKeyLength=Gr,r.box.nonceLength=Zr,r.box.overheadLength=r.secretbox.overheadLength,r.sign=function(r,n){if(yr(r,n),n.length!==Xr)throw new Error("bad secret key size");var e=new Uint8Array(Ir+r.length);return ar(e,r,r.length,n),e},r.sign.open=function(r,n){if(2!==arguments.length)throw new Error("nacl.sign.open accepts 2 arguments; did you mean to use nacl.sign.detached.verify?");if(yr(r,n),n.length!==Vr)throw new Error("bad public key size");var e=new Uint8Array(r.length),t=ur(e,r,r.length,n);if(t<0)return null;for(var o=new Uint8Array(t),i=0;i<o.length;i++)o[i]=e[i];return o},r.sign.detached=function(n,e){for(var t=r.sign(n,e),o=new Uint8Array(Ir),i=0;i<o.length;i++)o[i]=t[i];return o},r.sign.detached.verify=function(r,n,e){if(yr(r,n,e),n.length!==Ir)throw new Error("bad signature size");if(e.length!==Vr)throw new Error("bad public key size");var t,o=new Uint8Array(Ir+r.length),i=new Uint8Array(Ir+r.length);for(t=0;t<Ir;t++)o[t]=n[t];for(t=0;t<r.length;t++)o[t+Ir]=r[t];return ur(i,o,o.length,e)>=0},r.sign.keyPair=function(){var r=new Uint8Array(Vr),n=new Uint8Array(Xr);return tr(r,n),{publicKey:r,secretKey:n}},r.sign.keyPair.fromSecretKey=function(r){if(yr(r),r.length!==Xr)throw new Error("bad secret key size");for(var n=new Uint8Array(Vr),e=0;e<n.length;e++)n[e]=r[32+e];return{publicKey:n,secretKey:new Uint8Array(r)}},r.sign.keyPair.fromSeed=function(r){if(yr(r),r.length!==Dr)throw new Error("bad seed size");for(var n=new Uint8Array(Vr),e=new Uint8Array(Xr),t=0;t<32;t++)e[t]=r[t];return tr(n,e,!0),{publicKey:n,secretKey:e}},r.sign.publicKeyLength=Vr,r.sign.secretKeyLength=Xr,r.sign.seedLength=Dr,r.sign.signatureLength=Ir,r.hash=function(r){yr(r);var n=new Uint8Array(Hr);return Q(n,r,r.length),n},r.hash.hashLength=Hr,r.verify=function(r,n){return yr(r,n),0!==r.length&&0!==n.length&&(r.length===n.length&&0===a(r,0,n,0,r.length))},r.setPRNG=function(r){gr=r},function(){var n="undefined"!=typeof self?self.crypto||self.msCrypto:null;if(n&&n.getRandomValues){var e=65536;r.setPRNG(function(r,t){var o,i=new Uint8Array(t);for(o=0;o<t;o+=e)n.getRandomValues(i.subarray(o,o+Math.min(t-o,e)));for(o=0;o<t;o++)r[o]=i[o];lr(i)})}else"undefined"!=typeof require&&(n=require("crypto"),n&&n.randomBytes&&r.setPRNG(function(r,e){var t,o=n.randomBytes(e);for(t=0;t<e;t++)r[t]=o[t];lr(o)}))}()}("undefined"!=typeof module&&module.exports?module.exports:self.nacl=self.nacl||{});


function scryptjs(a,b,c,d,e,f,g,h){"use strict";function i(a){function b(a){for(var b=0,m=a.length;m>=64;){var n,o,p,q,r,s=d,t=e,u=f,v=g,w=h,x=i,y=j,z=k;for(o=0;o<16;o++)p=b+4*o,l[o]=(255&a[p])<<24|(255&a[p+1])<<16|(255&a[p+2])<<8|255&a[p+3];for(o=16;o<64;o++)n=l[o-2],q=(n>>>17|n<<15)^(n>>>19|n<<13)^n>>>10,n=l[o-15],r=(n>>>7|n<<25)^(n>>>18|n<<14)^n>>>3,l[o]=(q+l[o-7]|0)+(r+l[o-16]|0)|0;for(o=0;o<64;o++)q=(((w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7))+(w&x^~w&y)|0)+(z+(c[o]+l[o]|0)|0)|0,r=((s>>>2|s<<30)^(s>>>13|s<<19)^(s>>>22|s<<10))+(s&t^s&u^t&u)|0,z=y,y=x,x=w,w=v+q|0,v=u,u=t,t=s,s=q+r|0;d=d+s|0,e=e+t|0,f=f+u|0,g=g+v|0,h=h+w|0,i=i+x|0,j=j+y|0,k=k+z|0,b+=64,m-=64}}var c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],d=1779033703,e=3144134277,f=1013904242,g=2773480762,h=1359893119,i=2600822924,j=528734635,k=1541459225,l=new Array(64);b(a);var m,n=a.length%64,o=a.length/536870912|0,p=a.length<<3,q=n<56?56:120,r=a.slice(a.length-n,a.length);for(r.push(128),m=n+1;m<q;m++)r.push(0);return r.push(o>>>24&255),r.push(o>>>16&255),r.push(o>>>8&255),r.push(o>>>0&255),r.push(p>>>24&255),r.push(p>>>16&255),r.push(p>>>8&255),r.push(p>>>0&255),b(r),[d>>>24&255,d>>>16&255,d>>>8&255,d>>>0&255,e>>>24&255,e>>>16&255,e>>>8&255,e>>>0&255,f>>>24&255,f>>>16&255,f>>>8&255,f>>>0&255,g>>>24&255,g>>>16&255,g>>>8&255,g>>>0&255,h>>>24&255,h>>>16&255,h>>>8&255,h>>>0&255,i>>>24&255,i>>>16&255,i>>>8&255,i>>>0&255,j>>>24&255,j>>>16&255,j>>>8&255,j>>>0&255,k>>>24&255,k>>>16&255,k>>>8&255,k>>>0&255]}function j(a,b,c){function d(){for(var a=f-1;a>=f-4;a--){if(g[a]++,g[a]<=255)return;g[a]=0}}a=a.length<=64?a:i(a);var e,f=64+b.length+4,g=new Array(f),h=new Array(64),j=[];for(e=0;e<64;e++)g[e]=54;for(e=0;e<a.length;e++)g[e]^=a[e];for(e=0;e<b.length;e++)g[64+e]=b[e];for(e=f-4;e<f;e++)g[e]=0;for(e=0;e<64;e++)h[e]=92;for(e=0;e<a.length;e++)h[e]^=a[e];for(;c>=32;)d(),j=j.concat(i(h.concat(i(g)))),c-=32;return c>0&&(d(),j=j.concat(i(h.concat(i(g))).slice(0,c))),j}function k(a,b,c,d){var e,f,g=a[0]^b[c++],h=a[1]^b[c++],i=a[2]^b[c++],j=a[3]^b[c++],k=a[4]^b[c++],l=a[5]^b[c++],m=a[6]^b[c++],n=a[7]^b[c++],o=a[8]^b[c++],p=a[9]^b[c++],q=a[10]^b[c++],r=a[11]^b[c++],s=a[12]^b[c++],t=a[13]^b[c++],u=a[14]^b[c++],v=a[15]^b[c++],w=g,x=h,y=i,z=j,A=k,B=l,C=m,D=n,E=o,F=p,G=q,H=r,I=s,J=t,K=u,L=v;for(f=0;f<8;f+=2)e=w+I,A^=e<<7|e>>>25,e=A+w,E^=e<<9|e>>>23,e=E+A,I^=e<<13|e>>>19,e=I+E,w^=e<<18|e>>>14,e=B+x,F^=e<<7|e>>>25,e=F+B,J^=e<<9|e>>>23,e=J+F,x^=e<<13|e>>>19,e=x+J,B^=e<<18|e>>>14,e=G+C,K^=e<<7|e>>>25,e=K+G,y^=e<<9|e>>>23,e=y+K,C^=e<<13|e>>>19,e=C+y,G^=e<<18|e>>>14,e=L+H,z^=e<<7|e>>>25,e=z+L,D^=e<<9|e>>>23,e=D+z,H^=e<<13|e>>>19,e=H+D,L^=e<<18|e>>>14,e=w+z,x^=e<<7|e>>>25,e=x+w,y^=e<<9|e>>>23,e=y+x,z^=e<<13|e>>>19,e=z+y,w^=e<<18|e>>>14,e=B+A,C^=e<<7|e>>>25,e=C+B,D^=e<<9|e>>>23,e=D+C,A^=e<<13|e>>>19,e=A+D,B^=e<<18|e>>>14,e=G+F,H^=e<<7|e>>>25,e=H+G,E^=e<<9|e>>>23,e=E+H,F^=e<<13|e>>>19,e=F+E,G^=e<<18|e>>>14,e=L+K,I^=e<<7|e>>>25,e=I+L,J^=e<<9|e>>>23,e=J+I,K^=e<<13|e>>>19,e=K+J,L^=e<<18|e>>>14;b[d++]=a[0]=w+g|0,b[d++]=a[1]=x+h|0,b[d++]=a[2]=y+i|0,b[d++]=a[3]=z+j|0,b[d++]=a[4]=A+k|0,b[d++]=a[5]=B+l|0,b[d++]=a[6]=C+m|0,b[d++]=a[7]=D+n|0,b[d++]=a[8]=E+o|0,b[d++]=a[9]=F+p|0,b[d++]=a[10]=G+q|0,b[d++]=a[11]=H+r|0,b[d++]=a[12]=I+s|0,b[d++]=a[13]=J+t|0,b[d++]=a[14]=K+u|0,b[d++]=a[15]=L+v|0}function l(a,b,c,d,e){for(;e--;)a[b++]=c[d++]}function m(a,b,c,d,e){for(;e--;)a[b++]^=c[d++]}function n(a,b,c,d,e){l(a,0,b,c+16*(2*e-1),16);for(var f=0;f<2*e;f+=2)k(a,b,c+16*f,d+8*f),k(a,b,c+16*f+16,d+8*f+16*e)}function o(a,b,c){return a[b+16*(2*c-1)]}function p(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);d<128?b.push(d):d>127&&d<2048?(b.push(d>>6|192),b.push(63&d|128)):(b.push(d>>12|224),b.push(d>>6&63|128),b.push(63&d|128))}return b}function q(a){for(var b="0123456789abcdef".split(""),c=a.length,d=[],e=0;e<c;e++)d.push(b[a[e]>>>4&15]),d.push(b[a[e]>>>0&15]);return d.join("")}function r(a){for(var b,c,d,e,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),g=a.length,h=[],i=0;i<g;)b=i<g?a[i++]:0,c=i<g?a[i++]:0,d=i<g?a[i++]:0,e=(b<<16)+(c<<8)+d,h.push(f[e>>>18&63]),h.push(f[e>>>12&63]),h.push(f[e>>>6&63]),h.push(f[e>>>0&63]);return g%3>0&&(h[h.length-1]="=",g%3===1&&(h[h.length-2]="=")),h.join("")}function s(a){for(var b=0;b<32*d;b++){var c=a+4*b;D[I+b]=(255&F[c+3])<<24|(255&F[c+2])<<16|(255&F[c+1])<<8|(255&F[c+0])<<0}}function t(a,b){for(var c=a;c<b;c+=2)l(E,c*(32*d),D,I,32*d),n(G,D,I,J,d),l(E,(c+1)*(32*d),D,J,32*d),n(G,D,J,I,d)}function u(a,b){for(var c=a;c<b;c+=2){var e=o(D,I,d)&H-1;m(D,I,E,e*(32*d),32*d),n(G,D,I,J,d),e=o(D,J,d)&H-1,m(D,J,E,e*(32*d),32*d),n(G,D,J,I,d)}}function v(a){for(var b=0;b<32*d;b++){var c=D[I+b];F[a+4*b+0]=c>>>0&255,F[a+4*b+1]=c>>>8&255,F[a+4*b+2]=c>>>16&255,F[a+4*b+3]=c>>>24&255}}function w(a,b,c,d,e){!function f(){K(function(){d(a,a+c<b?a+c:b),a+=c,a<b?f():e()})}()}function x(b){var c=j(a,F,e);return"base64"===b?r(c):"hex"===b?q(c):"binary"===b?new Uint8Array(c):c}function y(){for(var a=0;a<B;a++)s(128*a*d),t(0,H),u(0,H),v(128*a*d);g(x(h))}function z(a){s(128*a*d),w(0,H,2*f,t,function(){w(0,H,2*f,u,function(){v(128*a*d),a+1<B?K(function(){z(a+1)}):g(x(h))})})}var A=-1>>>0,B=1;if("object"==typeof c){if(arguments.length>4)throw new Error("scrypt: incorrect number of arguments");var C=c;if(g=d,c=C.logN,"undefined"==typeof c){if("undefined"==typeof C.N)throw new Error("scrypt: missing N parameter");if(C.N<2||C.N>A)throw new Error("scrypt: N is out of range");if(0!==(C.N&C.N-1))throw new Error("scrypt: N is not a power of 2");c=Math.log(C.N)/Math.LN2}B=C.p||1,d=C.r,e=C.dkLen||32,f=C.interruptStep||0,h=C.encoding}if(B<1)throw new Error("scrypt: invalid p");if(d<=0)throw new Error("scrypt: invalid r");if(c<1||c>31)throw new Error("scrypt: logN must be between 1 and 31");var D,E,F,G,H=1<<c>>>0;if(d*B>=1<<30||d>A/128/B||d>A/256||H>A/128/d)throw new Error("scrypt: parameters are too large");"string"==typeof a&&(a=p(a)),"string"==typeof b&&(b=p(b)),"undefined"!=typeof Int32Array?(D=new Int32Array(64*d),E=new Int32Array(32*H*d),G=new Int32Array(16)):(D=[],E=[],G=new Array(16)),F=j(a,b,128*B*d);var I=0,J=32*d,K="undefined"!=typeof setImmediate?setImmediate:setTimeout;"function"==typeof f&&(h=g,g=f,f=1e3),f<=0?y():z(0)}"undefined"!=typeof module&&(module.exports=scryptjs);


!function(t,e){"use strict";"undefined"!=typeof module&&module.exports?module.exports=e(require("tweetnacl")):t.nacl.auth=e(t.nacl)}(this,function(t){"use strict";function e(e,n){var u,h,o=new Uint8Array(r+Math.max(a,e.length));for(n.length>r&&(n=t.hash(n)),u=0;r>u;u++)o[u]=54;for(u=0;u<n.length;u++)o[u]^=n[u];for(o.set(e,r),h=t.hash(o.subarray(0,r+e.length)),u=0;r>u;u++)o[u]=92;for(u=0;u<n.length;u++)o[u]^=n[u];return o.set(h,r),t.hash(o.subarray(0,r+h.length))}function n(t,n){var r=new Uint8Array(32);return r.set(e(t,n).subarray(0,32)),r}if(!t)throw new Error("tweetnacl not loaded");var r=128,a=64;return n.full=function(t,n){return e(t,n)},n.authLength=32,n.authFullLength=64,n.keyLength=32,n});


!function(e,n){"use strict";"undefined"!=typeof module&&module.exports?module.exports=n():e.nacl?e.nacl.util=n():(e.nacl={},e.nacl.util=n())}(this,function(){"use strict";var e={};return e.decodeUTF8=function(e){var n,t=unescape(encodeURIComponent(e)),r=new Uint8Array(t.length);for(n=0;n<t.length;n++)r[n]=t.charCodeAt(n);return r},e.encodeUTF8=function(e){var n,t=[];for(n=0;n<e.length;n++)t.push(String.fromCharCode(e[n]));return decodeURIComponent(escape(t.join("")))},e.encodeBase64=function(e){if("undefined"==typeof btoa)return new Buffer(e).toString("base64");var n,t=[],r=e.length;for(n=0;r>n;n++)t.push(String.fromCharCode(e[n]));return btoa(t.join(""))},e.decodeBase64=function(e){if("undefined"==typeof atob)return new Uint8Array(Array.prototype.slice.call(new Buffer(e,"base64"),0));var n,t=atob(e),r=new Uint8Array(t.length);for(n=0;n<t.length;n++)r[n]=t.charCodeAt(n);return r},e});




