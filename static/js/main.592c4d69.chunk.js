(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,n){"use strict";n.r(e);var a=n(6),i=n(4),r=n(7),o=n(0),c=n.n(o),d=n(3),u=n(8),s=(n(16),["https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg","https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg","https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg","https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg","https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg","https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg"]),p=function(t){return{x:0,y:-4*t,scale:1,rot:20*Math.random()-10,delay:100*t}},g=function(t){return{x:0,rot:0,scale:1.5,y:-1e3}},l=function(t,e){return"perspective(1500px) rotateX(30deg) rotateY(".concat(t/10,"deg) rotateZ(").concat(t,"deg) scale(").concat(e,")")};Object(r.render)(c.a.createElement(function(){var t=Object(o.useState)(function(){return new Set}),e=Object(i.a)(t,1)[0],n=Object(d.c)(s.length,function(t){return Object(a.a)({},p(t),{from:g(t)})}),r=Object(i.a)(n,2),f=r[0],w=r[1],_=Object(u.a)(function(t){var n=Object(i.a)(t.args,1)[0],a=t.down,r=Object(i.a)(t.delta,1)[0],o=(t.distance,Object(i.a)(t.direction,1)[0]),c=t.velocity,d=o<0?-1:1;!a&&c>.2&&e.add(n),w(function(t){if(n===t){var i=e.has(n);return{x:i?(200+window.innerWidth)*d:a?r:0,rot:r/100+(i?10*d*c:0),scale:a?1.1:1,delay:void 0,config:{friction:50,tension:a?800:i?200:500}}}}),a||e.size!==s.length||setTimeout(function(){return e.clear()||w(function(t){return p(t)})},600)});return f.map(function(t,e){var n=t.x,a=t.y,i=t.rot,r=t.scale;return c.a.createElement(d.a.div,{key:e,style:{transform:Object(d.b)([n,a],function(t,e){return"translate3d(".concat(t,"px,").concat(e,"px,0)")})}},c.a.createElement(d.a.div,Object.assign({},_(e),{style:{transform:Object(d.b)([i,r],l),backgroundImage:"url(".concat(s[e],")")}})))})},null),document.getElementById("root"))},16:function(t,e,n){},9:function(t,e,n){t.exports=n(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.592c4d69.chunk.js.map