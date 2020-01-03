class AvCustom64{constructor(e){if(65!==e.length)throw new Error("Encode str must have 65 bytes");this._keyStr=e}encode(e){e=this._utf8_encode(e);for(var t,r,a,o,n,c,h,_="",i=0;i<e.length;)o=(t=e.charCodeAt(i++))>>2,n=(3&t)<<4|(r=e.charCodeAt(i++))>>4,c=(15&r)<<2|(a=e.charCodeAt(i++))>>6,h=63&a,isNaN(r)?c=h=64:isNaN(a)&&(h=64),_=_+this._keyStr.charAt(o)+this._keyStr.charAt(n)+this._keyStr.charAt(c)+this._keyStr.charAt(h);return _}decode(e){e=e.replace(/[^A-Za-z0-9+\/=]/g,"");for(var t,r,a,o,n,c,h="",_=0;_<e.length;)t=this._keyStr.indexOf(e.charAt(_++))<<2|(o=this._keyStr.indexOf(e.charAt(_++)))>>4,r=(15&o)<<4|(n=this._keyStr.indexOf(e.charAt(_++)))>>2,a=(3&n)<<6|(c=this._keyStr.indexOf(e.charAt(_++))),h+=String.fromCharCode(t),64!=n&&(h+=String.fromCharCode(r)),64!=c&&(h+=String.fromCharCode(a));return this._utf8_decode(h)}_utf8_encode(e){e=e.replace(/rn/g,"n");for(var t="",r=0;r<e.length;r++){var a=e.charCodeAt(r);a<128?t+=String.fromCharCode(a):a>127&&a<2048?(t+=String.fromCharCode(a>>6|192),t+=String.fromCharCode(63&a|128)):(t+=String.fromCharCode(a>>12|224),t+=String.fromCharCode(a>>6&63|128),t+=String.fromCharCode(63&a|128))}return t}_utf8_decode(e){var t,r,a,o="",n=0;for(t=r=0;n<e.length;)(t=e.charCodeAt(n))<128?(o+=String.fromCharCode(t),n++):t>191&&t<224?(r=e.charCodeAt(n+1),o+=String.fromCharCode((31&t)<<6|63&r),n+=2):(r=e.charCodeAt(n+1),a=e.charCodeAt(n+2),o+=String.fromCharCode((15&t)<<12|(63&r)<<6|63&a),n+=3);return o}}const av_char_uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ",av_char_lowercase="abcdefghijklmnopqrstuvwxyz",av_char_numbers="0123456789",av_char_symbols="%/&",av_char_64=av_char_uppercase+av_char_lowercase+"0123456789%/&",avCustom64=new AvCustom64(av_char_64),av_tables=[],av_tables_functions=[e=>{let t=[];for(let r=0;r<e.length;r++)for(let a=0;a<e[r].length;a++)t.push(av_char_64[e[r][a]]);return t},e=>{let t=[];for(let r=e.length-1;r>=0;r--)for(let a=e[r].length-1;a>=0;a--)t.push(av_char_64[e[r][a]]);return t},e=>{let t=[],r=[];for(let a=0;a<e.length;a++)for(let o=0;o<e[a].length;o++)e[a][o]%2==0?r.push(av_char_64[e[a][o]]):t.push(av_char_64[e[a][o]]);return t.concat(r)},e=>{let t=[],r=[];for(let a=0;a<e.length;a++)for(let o=0;o<e[a].length;o++)e[a][o]%2==0?t.push(av_char_64[e[a][o]]):r.push(av_char_64[e[a][o]]);return t.concat(r)}],av_fetch_index=(e,t,r,a)=>{let o=parseInt(a.indexOf(t)),n=parseInt(e),c="+"===r?o+n:o-n;return c<0&&(c+=64),c>64&&(c-=64),c};function av_mtx(e,t){var r,a,o=[];for(r=0,a=-1;r<e.length;r++)r%t==0&&(o[++a]=[]),o[a].push(e[r]);return o}function av_create_buffer(e){let t=new Array(65),r=[],a=[],o=[],n=[];for(let t=0,r=e.split("");t<r.length;t++)if(0!==t){let e=null;e=t%4!=0?""+r[t]+r[t-1]:""+r[t],-1===n.indexOf(e)&&n.push(e)}for(let e=0;e<t.length;e++)t[e]=e,-1===n.indexOf(JSON.stringify(t[e]))?parseInt(t[e])%2==0?o.push(t[e]):a.push(t[e]):r.push(t[e]);return av_mtx([].concat(r,a,o),8)}const av_core={start:e=>{String.prototype.includes||(String.prototype.includes=function(e,t){"use strict";return"number"!=typeof t&&(t=0),!(t+e.length>this.length)&&-1!==this.indexOf(e,t)});for(let t=0;t<av_tables_functions.length;t++)av_tables[t]=av_tables_functions[t](e)},create_key:e=>avCustom64.encode(e).split("").map(e=>av_char_64.indexOf(e)).join(""),create_buffer:e=>av_create_buffer(e),encode64:e=>avCustom64.encode(e),decode64:e=>avCustom64.decode(e),define_key:(e,t)=>{for(;e.length<t.length;)e+=e;return e},apply:(e,t,r)=>{let a="",o=t.split(""),n=e.split("");for(let e=1;e<=t.length;e++)a+="encode"===r?av_tables[e%4][av_fetch_index(n[e-1],o[e-1],"+",av_char_64.split(""))]:av_char_64.split("")[av_fetch_index(n[e-1],o[e-1],"-",av_tables[e%4])];return a},get_date:e=>e?new Date(parseInt(e)):JSON.stringify((new Date).getTime()),mix:(e,t)=>`${e}$${t}`,split:e=>e.split("$")};export class AV64X4{constructor(e){e&&this.init(e)}init(e){const t=av_core.create_key(e),r=av_core.create_buffer(t),a=av_core.create_key("timestamp");this["[[av_key]]"]=t,this["[[av_date]]"]=a,av_core.start(r)}encode(e){this._doCheck("encode");try{let t=av_core.encode64(e),r=av_core.get_date(),a=av_core.define_key(this["[[av_key]]"],t),o=av_core.define_key(this["[[av_date]]"],r);return av_core.mix(av_core.apply(a,t,"encode"),av_core.apply(o,r,"encode"))}catch(e){throw new Error("Encode failed.")}}decode(e){this._doCheck("decode");try{let t=av_core.split(e)[0],r=av_core.define_key(this["[[av_key]]"],t),a=av_core.apply(r,t,"decode");return av_core.decode64(a)}catch(e){throw new Error("Encode failed.")}}when(e){this._doCheck("check when");try{let t=av_core.split(e)[1],r=av_core.define_key(this["[[av_date]]"],t),a=av_core.apply(r,t,"decode");return av_core.get_date(a)}catch(e){throw new Error("When failed.")}}_doCheck(e){if(!this["[[av_key]]"])throw new Error(`Cannot ${e} before initiation. Call AV64X4.init("your_key")`)}}export const encode64=av_core.encode64(str);export const decode64=av_core.decode64(str);