(this["webpackJsonpfront-diplom"]=this["webpackJsonpfront-diplom"]||[]).push([[0],{15:function(e,t,n){e.exports={sideNav:"MySideNav_sideNav__1FFRD"}},26:function(e,t,n){},27:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(10),s=n.n(r),o=(n(26),n(27),n(9)),i=n(6),u=n(7),l=n.n(u),d=n(8),m=n.n(d),h=(n(29),n(15)),g=n.n(h),j=n(4),b=n.n(j),f=n(2),v=function(e){var t=e.children,n=Object(c.useState)(!0),a=Object(i.a)(n,2),r=a[0],s=a[1];return Object(f.jsxs)(b.a,{className:g.a.sideNav,children:[Object(f.jsx)(b.a.Toggle,{onClick:function(){s(!r)}}),Object(f.jsx)(b.a.Nav,{children:t})]})},x=n.p+"static/media/box-arrow-in-down.4d5ac51f.svg",p=n.p+"static/media/box-arrow-down.8303b01f.svg",O=n.p+"static/media/brush.7071756d.svg",y=n.p+"static/media/eraser.4f781844.svg",w=n.p+"static/media/square.469d3ad2.svg",I=n.p+"static/media/triangle.ddb6eff2.svg",N=n.p+"static/media/circle.ae80814a.svg",E=n.p+"static/media/rotate.6914f04b.svg",k=n.p+"static/media/crop.522302f3.svg",_=(n.p,n.p+"static/media/arrow-counterclockwise.48745dc8.svg"),C=n.p+"static/media/arrow-clockwise.2ba77545.svg",B=n.p+"static/media/asterisk.dce0ba3a.svg",S=n.p+"static/media/bullseye.56bf8b4b.svg",L=(n(36),function(e){var t=e.active,n=e.setActive,c=e.children;return Object(f.jsx)("div",{className:t?"modal active":"modal",onClick:function(){return n(!1)},children:Object(f.jsx)("div",{className:t?"modal__content active":"modal__content",onClick:function(e){return e.stopPropagation()},children:c})})}),M=n(5),z=n(18),T=function(){var e=Object(c.useState)(!0),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(!1),s=Object(i.a)(r,2),u=s[0],d=s[1],h=Object(c.useState)(!1),g=Object(i.a)(h,2),b=g[0],T=g[1],q=Object(c.useState)(!1),D=Object(i.a)(q,2),P=D[0],A=D[1],F=Object(c.useState)(!1),G=Object(i.a)(F,2),R=G[0],U=G[1],H=Object(c.useState)(!1),J=Object(i.a)(H,2),Q=J[0],W=J[1],X=Object(c.useState)(!1),V=Object(i.a)(X,2),Y=V[0],K=V[1],Z=Object(c.useState)(!1),$=Object(i.a)(Z,2),ee=$[0],te=$[1],ne=Object(c.useState)(!1),ce=Object(i.a)(ne,2),ae=(ce[0],ce[1]),re=Object(c.useState)(!1),se=Object(i.a)(re,2),oe=(se[0],se[1]),ie=Object(c.useState)(10),ue=Object(i.a)(ie,2),le=ue[0],de=ue[1],me=Object(c.useState)(20),he=Object(i.a)(me,2),ge=he[0],je=he[1],be=Object(c.useState)("#aabbcc"),fe=Object(i.a)(be,2),ve=fe[0],xe=fe[1],pe=Object(c.useState)("0"),Oe=Object(i.a)(pe,2),ye=Oe[0],we=Oe[1],Ie=Object(c.useState)(""),Ne=Object(i.a)(Ie,2),Ee=Ne[0],ke=Ne[1],_e=Object(c.useState)(""),Ce=Object(i.a)(_e,2),Be=Ce[0],Se=Ce[1],Le=Object(c.useState)(""),Me=Object(i.a)(Le,2),ze=(Me[0],Me[1]),Te=Object(c.useState)(""),qe=Object(i.a)(Te,2),De=(qe[0],qe[1],Object(c.useState)(0)),Pe=Object(i.a)(De,2),Ae=Pe[0],Fe=Pe[1],Ge="http://palitra-redactor.ru:8080/api/";window.addEventListener("load",(function(){var e=document.getElementById("bg").getContext("2d"),t=document.getElementById("fg"),n=t.getContext("2d");document.getElementById("readyimg").getContext("2d");e.webkitImageSmoothingEnabled=!1,e.msImageSmoothingEnabled=!1,e.imageSmoothingEnabled=!1;var c=[],a=0,r=0,s=!1,o=function(e){a=e.offsetX,r=e.offsetY},i=function(e){o(e),s=!0,n.beginPath(),n.moveTo(a,r),c.push({x:a,y:r,mode:"begin"}),Re.casheMut(!0),document.querySelector("#resizeInp").value=2},u=function(e){o(e),s&&(n.lineTo(a,r),n.stroke(),c.push({x:a,y:r,mode:"draw"})),Re.casheMut(!0),document.querySelector("#resizeInp").value=2},l=function(e){o(e),s=!1,c.push({x:a,y:r,mode:"end"}),Re.casheMut(!0),document.querySelector("#resizeInp").value=2},d=[],m=function(){n.globalCompositeOperation="source-over",t.removeEventListener("mousedown",i),t.removeEventListener("mousemove",u),t.removeEventListener("mouseup",l)},h=function e(c){console.log(d),o(c),d.push({x:a,y:r}),3===d.length&&(s=!0,n.beginPath(),n.moveTo(d[0].x,d[0].y),n.lineTo(d[1].x,d[1].y),n.lineTo(d[2].x,d[2].y),n.closePath(),n.stroke(),s=!1,t.removeEventListener("click",e),d.length=0),Re.casheMut(!0),document.querySelector("#resizeInp").value=2},g=function e(c){if(console.log(d),o(c),d.push({x:a,y:r}),2===d.length){s=!0;var i=Math.abs(d[1].x-d[0].x),u=Math.abs(d[1].y-d[0].y);n.strokeRect(d[0].x,d[0].y,i,u),s=!1,t.removeEventListener("click",e),d.length=0}Re.casheMut(!0),document.querySelector("#resizeInp").value=2},j=[],b=function e(n){if(o(n),j.push({x:a,y:r}),2===j.length){var c=Math.abs(j[0].x-j[1].x),s=Math.abs(j[0].y-j[1].y),i=j[0].y<j[1].y?j[0].y:j[1].y,u=j[0].x<j[1].x?j[0].x:j[1].x;console.log(s,c,u,i);try{!function(e,t,n,c){tt.apply(this,arguments)}(u,i,c,s)}catch(l){console.log("err on crop")}j.length=0,t.removeEventListener("click",e)}Re.casheMut(!0),document.querySelector("#resizeInp").value=2},f=function e(c){if(console.log(d),o(c),d.push({x:a,y:r}),2===d.length){s=!0;var i=Math.abs(d[1].x-d[0].x);n.beginPath(),n.arc(d[0].x,d[0].y,i,0,2*Math.PI,!1),n.closePath(),n.stroke(),s=!1,t.removeEventListener("click",e),d.length=0}Re.casheMut(!0),document.querySelector("#resizeInp").value=2};document.getElementById("triangleBtn").addEventListener("click",(function(){m(),t.addEventListener("click",h)})),document.getElementById("rectBtn").addEventListener("click",(function(){m(),t.addEventListener("click",g)})),document.getElementById("circleBtn").addEventListener("click",(function(){m(),t.addEventListener("click",f)})),document.getElementById("mybrushBtn").addEventListener("click",(function(){n.globalCompositeOperation="source-over",t.addEventListener("mousedown",i),t.addEventListener("mousemove",u),t.addEventListener("mouseup",l)})),document.getElementById("cropBtn").addEventListener("click",(function(){m(),t.addEventListener("click",b)})),document.getElementById("eraseBtn").addEventListener("click",(function(){t.addEventListener("mousedown",i),t.addEventListener("mousemove",u),t.addEventListener("mouseup",l),n.globalCompositeOperation="destination-out"}))}));var Re={bg_path:null,fg_path:null,changable:!0,casheMut:function(e){this.changable=e},setCashe:function(e){this.bg_path=e[0],this.fg_path=e[1]},getCache:function(){return[this.bg_path,this.fg_path]},rewriteCache:function(){var e=Object(o.a)(l.a.mark((function e(t){var n,c,a,r,s,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.changable){e.next=15;break}return n=st(document.getElementById("fg")).src.replace("data:","").replace(/^.+,/,""),c=st(document.getElementById("bg")).src.replace("data:","").replace(/^.+,/,""),a=Je([["base64image",c]]),r=Je([["base64image",n]]),e.next=7,fetch(Ge,a).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on saving")}));case 7:return s=e.sent,e.next=10,fetch(Ge,r).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on saving")}));case 10:o=e.sent,this.setCashe([s.path,o.path]),this.casheMut(t),e.next=16;break;case 15:console.log("cant change cache");case 16:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()};function Ue(){return(Ue=Object(o.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("called encoded change"),n=t.target.files[0],Se(n.name),e.t0=ke,e.next=6,He(n);case 6:e.t1=e.sent,(0,e.t0)(e.t1);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var He=function(e){return new Promise((function(t,n){var c=new FileReader;c.readAsDataURL(e),c.onload=function(){return t(c.result.replace("data:","").replace(/^.+,/,""))},c.onerror=function(e){return n("Error: ",e)}}))},Je=function(e){var t=new Headers;t.append("Content-Type","application/x-www-form-urlencoded");var n=new URLSearchParams;return e.forEach((function(e){return n.append(e[0],e[1])})),{method:"POST",headers:t,body:n,redirect:"follow"}};function Qe(){return(Qe=Object(o.a)(l.a.mark((function e(t){var n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=Je([["base64image",Ee],["image_name",Be]]),e.next=4,fetch(Ge,n).then((function(e){return e.json()})).catch((function(e){return console.log("error occured ".concat(e))}));case 4:return c=e.sent,e.next=7,We(c.meta.width,c.meta.height).then((function(e){return console.log(e)}));case 7:return e.next=9,Xe(c.bs64string,c.meta.width,c.meta.height,c.meta.format).then((function(e){return console.log(e)}));case 9:ze(c.path),a(!1),Re.casheMut(!0);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var We=function(e,t){return new Promise((function(n,c){var a=document.getElementById("bg").getContext("2d"),r=document.getElementById("fg").getContext("2d"),s=document.getElementById("readyimg").getContext("2d");a.canvas.width=e,a.canvas.height=t,r.canvas.width=e,r.canvas.height=t,s.canvas.width=e,s.canvas.height=t,n("canvases resized"),c("error occored with resizing canvases")}))},Xe=function(e,t,n,c){return new Promise((function(a,r){var s=new Image;s.src="data:image/".concat(c,";base64,").concat(e),s.width=t,s.height=n,console.log("On BG we have"),console.log(s);var o=document.getElementById("bg").getContext("2d");s.onload=function(){o.drawImage(s,0,0),a("BG image was drawn on canvas"),r("Canvas error occured")}}))},Ve=function(e,t,n,c){return new Promise((function(a,r){var s=new Image;s.src="data:image/".concat(c,";base64,").concat(e),s.width=t,s.height=n,console.log("On FG we have"),console.log(s);var o=document.getElementById("fg").getContext("2d");s.onload=function(){o.drawImage(s,0,0),a("FG image was drawn on canvas"),r("Canvas error occured")}}))};function Ye(e){e.preventDefault(),K(!0)}function Ke(e){e.preventDefault(),K(!1)}function Ze(){return(Ze=Object(o.a)(l.a.mark((function e(t){var n,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),K(!1),n=t.dataTransfer.files[0],console.log(n),e.t0=Je,e.next=7,He(n);case 7:return e.t1=e.sent,e.t2=["base64image",e.t1],e.t3=["image_name",n.name],e.t4=[e.t2,e.t3],c=(0,e.t0)(e.t4),e.next=14,fetch(Ge,c).then((function(e){return e.json()})).catch((function(e){return console.log("error occured ".concat(e))}));case 14:return r=e.sent,e.next=17,We(r.meta.width,r.meta.height).then((function(e){return console.log(e)}));case 17:return e.next=19,Xe(r.bs64string,r.meta.width,r.meta.height,r.meta.format).then((function(e){return console.log(e)}));case 19:ze(r.path),a(!1),Re.casheMut(!0);case 22:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $e(e){return et.apply(this,arguments)}function et(){return(et=Object(o.a)(l.a.mark((function e(t){var n,c,a,r,s,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=st(document.getElementById("fg")).src.replace("data:","").replace(/^.+,/,""),c=st(document.getElementById("bg")).src.replace("data:","").replace(/^.+,/,""),a=Je([["base64image",c],["image_name",Be],["angle",t]]),r=Je([["base64image",n],["image_name",Be],["angle",t]]),e.next=6,fetch(Ge+"rotate",a).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on sending rotate req")}));case 6:return s=e.sent,e.next=9,We(s.meta.width,s.meta.height).then((function(e){return console.log(e)}));case 9:return e.next=11,Xe(s.bs64string,s.meta.width,s.meta.height,s.meta.format).then((function(e){return console.log(e)}));case 11:return e.next=13,fetch(Ge+"rotate",r).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on sending rotate req")}));case 13:return o=e.sent,e.next=16,Ve(o.bs64string,o.meta.width,o.meta.height,o.meta.format).then((function(e){return console.log(e)}));case 16:document.querySelector("#resizeInp").value=2,Re.casheMut(!0);case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function tt(){return(tt=Object(o.a)(l.a.mark((function e(t,n,c,a){var r,s,o,i,u,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=st(document.getElementById("fg")).src.replace("data:","").replace(/^.+,/,""),s=st(document.getElementById("bg")).src.replace("data:","").replace(/^.+,/,""),o=Je([["base64image",s],["image_name",Be],["left",t],["top",n],["width",c],["height",a]]),i=Je([["base64image",r],["image_name",Be],["left",t],["top",n],["width",c],["height",a]]),e.next=6,fetch(Ge+"crop",o).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on sending rotate req")}));case 6:return u=e.sent,e.next=9,We(u.meta.width,u.meta.height).then((function(e){return console.log(e)}));case 9:return e.next=11,Xe(u.bs64string,u.meta.width,u.meta.height,u.meta.format).then((function(e){return console.log(e)}));case 11:return e.next=13,fetch(Ge+"crop",i).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on sending rotate req")}));case 13:return d=e.sent,e.next=16,Ve(d.bs64string,d.meta.width,d.meta.height,d.meta.format).then((function(e){return console.log(e)}));case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function nt(){return nt=Object(o.a)(l.a.mark((function e(){var t,n,c,a,r,s,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Re.rewriteCache(!1);case 2:return t=Re.getCache(),n=Object(i.a)(t,2),c=n[0],a=n[1],r=Number(document.querySelector("#resizeInp").value)/2,e.next=6,fetch("".concat(Ge,"resize?path=").concat(c,"&kf=").concat(r),{method:"GET"}).then((function(e){return e.json()}));case 6:return s=e.sent,e.next=9,We(s.meta.width,s.meta.height).then((function(e){return console.log(e)}));case 9:return e.next=11,Xe(s.bs64string,s.meta.width,s.meta.height,s.meta.format).then((function(e){return console.log(e)}));case 11:return e.next=13,fetch("".concat(Ge,"resize?path=").concat(a,"&kf=").concat(r),{method:"GET"}).then((function(e){return e.json()}));case 13:return o=e.sent,e.next=16,Ve(o.bs64string,o.meta.width,o.meta.height,o.meta.format).then((function(e){return console.log(e)}));case 16:case"end":return e.stop()}}),e)}))),nt.apply(this,arguments)}function ct(){return(ct=Object(o.a)(l.a.mark((function e(t){var n,c,a,r,s,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=st(document.getElementById("fg")).src.replace("data:","").replace(/^.+,/,""),c=st(document.getElementById("bg")).src.replace("data:","").replace(/^.+,/,""),a=Je([["base64image",c],["image_name",Be],["sigma",t]]),r=Je([["base64image",n],["image_name",Be],["sigma",t]]),console.log(Ge+"gblur",a),e.next=7,fetch(Ge+"gblur",a).then((function(e){return e.json()}));case 7:return s=e.sent,e.next=10,We(s.meta.width,s.meta.height).then((function(e){return console.log(e)}));case 10:return e.next=12,Xe(s.bs64string,s.meta.width,s.meta.height,s.meta.format).then((function(e){return console.log(e)}));case 12:return e.next=14,fetch(Ge+"gblur",r).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on sending rotate req")}));case 14:return o=e.sent,e.next=17,Ve(o.bs64string,o.meta.width,o.meta.height,o.meta.format).then((function(e){return console.log(e)}));case 17:document.querySelector("#resizeInp").value=2,Re.casheMut(!0);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function at(){return(at=Object(o.a)(l.a.mark((function e(){var t,n,c,a,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=st(document.getElementById("fg")).src.replace("data:","").replace(/^.+,/,""),n=st(document.getElementById("bg")).src.replace("data:","").replace(/^.+,/,""),c=Je([["base64image",n],["image_name",Be]]),a=Je([["base64image",t],["image_name",Be]]),e.next=6,fetch(Ge+"/filter/greyscale",c).then((function(e){return e.json()}));case 6:return r=e.sent,e.next=9,We(r.meta.width,r.meta.height).then((function(e){return console.log(e)}));case 9:return e.next=11,Xe(r.bs64string,r.meta.width,r.meta.height,r.meta.format).then((function(e){return console.log(e)}));case 11:return e.next=13,fetch(Ge+"/filter/greyscale",a).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on sending rotate req")}));case 13:return s=e.sent,e.next=16,Ve(s.bs64string,s.meta.width,s.meta.height,s.meta.format).then((function(e){return console.log(e)}));case 16:document.querySelector("#resizeInp").value=2,Re.casheMut(!0);case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function rt(){return(rt=Object(o.a)(l.a.mark((function e(){var t,n,c,a,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=st(document.getElementById("fg")).src.replace("data:","").replace(/^.+,/,""),n=st(document.getElementById("bg")).src.replace("data:","").replace(/^.+,/,""),c=Je([["base64image",n],["image_name",Be]]),a=Je([["base64image",t],["image_name",Be]]),e.next=6,fetch(Ge+"/filter/negate",c).then((function(e){return e.json()}));case 6:return r=e.sent,e.next=9,We(r.meta.width,r.meta.height).then((function(e){return console.log(e)}));case 9:return e.next=11,Xe(r.bs64string,r.meta.width,r.meta.height,r.meta.format).then((function(e){return console.log(e)}));case 11:return e.next=13,fetch(Ge+"/filter/negate",a).then((function(e){return e.json()})).catch((function(e){return console.log("error occured on sending rotate req")}));case 13:return s=e.sent,e.next=16,Ve(s.bs64string,s.meta.width,s.meta.height,s.meta.format).then((function(e){return console.log(e)}));case 16:document.querySelector("#resizeInp").value=2,Re.casheMut(!0);case 18:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var st=function(e){var t=e.toDataURL(),n=new Image;return n.src=t,n};return Object(f.jsxs)("div",{children:[Object(f.jsxs)(v,{children:[Object(f.jsxs)(j.NavItem,{className:"navItem",onClick:function(){return a(!0)},children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"icon1",src:x})}),Object(f.jsx)(j.NavText,{children:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c"})]}),Object(f.jsxs)(j.NavItem,{onClick:function(){var e=document.getElementById("readyimg"),t=document.getElementById("fg"),n=document.getElementById("bg"),c=st(n),a=st(t),r=e.getContext("2d");c.onload=function(){r.drawImage(c,0,0),a.onload=function(){r.drawImage(a,0,0),function(e){var t=document.createElement("a");t.setAttribute("href",e.src),t.setAttribute("download","canvasImage"),t.click()}(st(e))}}},children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{alt:"save",src:p})}),Object(f.jsx)(j.NavText,{children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"mybrushBtn",onClick:function(){return d(!0)},children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{alt:"Brush",src:O})}),Object(f.jsx)(j.NavText,{children:"\u041a\u0438\u0441\u0442\u044c"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"eraseBtn",onClick:function(){return T(!0)},children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{alt:"Eraser",src:y})}),Object(f.jsx)(j.NavText,{children:"\u041b\u0430\u0441\u0442\u0438\u043a"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"rectBtn",children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"rect",src:w})}),Object(f.jsx)(j.NavText,{children:"\u041f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"triangleBtn",children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"triangle",src:I})}),Object(f.jsx)(j.NavText,{children:"\u0422\u0440\u0435\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"circleBtn",children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"circle",src:N})}),Object(f.jsx)(j.NavText,{children:"\u041a\u0440\u0443\u0433"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"rotateBtn",onClick:function(){return te(!0)},children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"rotate",src:E})}),Object(f.jsx)(j.NavText,{children:"\u041f\u043e\u0432\u043e\u0440\u043e\u0442"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"cropBtn",children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"crop",src:k})}),Object(f.jsx)(j.NavText,{children:"\u041e\u0431\u0440\u0435\u0437\u043a\u0430"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"gaussBtn",onClick:function(){return W(!0)},children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"gauss",src:S})}),Object(f.jsx)(j.NavText,{children:"\u0420\u0430\u0437\u043c\u044b\u0442\u0438\u0435 \u043f\u043e \u0413\u0430\u0443\u0441\u0441\u0443"})]}),Object(f.jsxs)(j.NavItem,{className:"navItem",id:"filterBtn",onClick:function(){return U(!0)},children:[Object(f.jsx)(j.NavIcon,{children:Object(f.jsx)("img",{className:"icon1",alt:"filter",src:B})}),Object(f.jsx)(j.NavText,{children:"\u0424\u0438\u043b\u044c\u0442\u0440\u044b"})]})]}),Object(f.jsx)("form",{id:"form",action:"",method:"post",children:Object(f.jsxs)("div",{className:"paint-canvas",onMouseOver:function(){oe(!1),ae(!1)},children:[Object(f.jsx)("canvas",{id:"bg",className:m.a.cnvs_bg}),Object(f.jsx)("canvas",{id:"fg",className:m.a.cnvs_fg}),Object(f.jsx)("canvas",{id:"readyimg",className:m.a.cnvs_save}),Object(f.jsx)("input",{id:"canvas_img",type:"hidden",name:"canvas_img",value:""})]})}),Object(f.jsxs)(L,{active:n,setActive:a,children:[Object(f.jsx)(M.b,{onSubmit:function(e){return Qe.apply(this,arguments)},encType:"multipart/form-data",method:"post",children:Object(f.jsxs)(M.c,{children:[Object(f.jsx)(M.e,{for:"loadFile",children:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043b"}),Object(f.jsx)(M.d,{id:"loadFile",type:"file",onChange:function(e){return Ue.apply(this,arguments)}}),Object(f.jsx)(M.a,{className:m.a.button,children:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c"})]})}),Object(f.jsx)("div",{className:"text-between",children:"\u0438\u043b\u0438"}),Y?Object(f.jsx)("div",{className:"drop-area",onDragStart:function(e){return Ye(e)},onDragLeave:function(e){return Ke(e)},onDragOver:function(e){return Ye(e)},onDrop:function(e){return function(e){return Ze.apply(this,arguments)}(e)},children:"\u041e\u0442\u043f\u0443\u0441\u0442\u0438\u0442\u0435 \u0444\u0430\u0439\u043b"}):Object(f.jsx)("div",{className:"drop-area",onDragStart:function(e){return Ye(e)},onDragLeave:function(e){return Ke(e)},onDragOver:function(e){return Ye(e)},children:"\u041f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043b \u0441\u044e\u0434\u0430"})]}),Object(f.jsx)(L,{active:ee,setActive:te,children:Object(f.jsxs)(M.b,{children:[Object(f.jsxs)(M.c,{children:[Object(f.jsx)(M.e,{for:"angle",children:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0443\u0433\u043e\u043b \u043f\u043e\u0432\u043e\u0440\u043e\u0442\u0430"}),Object(f.jsx)(M.d,{id:"angle",name:"angle",type:"text",onChange:function(){var e=document.getElementById("angle");we(e.value)},value:ye})]}),Object(f.jsx)(M.a,{className:m.a.button_form,onClick:function(){return $e(ye)},children:"\u041e\u043a"}),Object(f.jsxs)(M.c,{children:[Object(f.jsx)(M.a,{type:"button",className:m.a.button,onClick:function(){return $e("90")},children:Object(f.jsx)("img",{src:C,id:"clockwise",alt:"rotateOnClock"})}),Object(f.jsx)("br",{}),Object(f.jsx)(M.a,{type:"button",className:m.a.button,onClick:function(){return $e("270")},children:Object(f.jsx)("img",{src:_,alt:"rotateOnClock"})})]})]})}),Object(f.jsxs)(L,{active:u,setActive:d,children:[Object(f.jsx)("div",{children:"\u0420\u0430\u0437\u043c\u0435\u0440"}),Object(f.jsx)(M.d,{id:"brushSize",type:"range",min:"0",max:"100",onChange:function(){var e=document.getElementById("fg").getContext("2d"),t=document.getElementById("brushSize");de(t.value),e.lineWidth=le},value:le}),Object(f.jsx)("div",{children:"\u0426\u0432\u0435\u0442"}),Object(f.jsx)(z.a,{color:ve,onChange:xe}),Object(f.jsx)(M.a,{className:m.a.button,onClick:function(){document.getElementById("fg").getContext("2d").strokeStyle=ve},children:"\u041f\u043e\u043c\u0435\u043d\u044f\u0442\u044c \u0446\u0432\u0435\u0442"})]}),Object(f.jsxs)(L,{active:b,setActive:T,children:[Object(f.jsx)("div",{children:"\u0420\u0430\u0437\u043c\u0435\u0440"}),Object(f.jsx)(M.d,{id:"eraseSize",type:"range",min:"0",max:"100",onChange:function(){var e=document.getElementById("fg").getContext("2d"),t=document.getElementById("eraseSize");je(t.value),e.lineWidth=ge},value:ge})]}),Object(f.jsx)(L,{active:P,setActive:A,children:Object(f.jsxs)(M.b,{children:[Object(f.jsx)(M.c,{children:Object(f.jsx)(M.d,{id:"inp1",type:"text"})}),Object(f.jsx)(M.c,{children:Object(f.jsx)(M.d,{id:"inp2",type:"text"})}),Object(f.jsx)(M.c,{children:Object(f.jsx)(M.d,{id:"inp3",type:"text"})}),Object(f.jsx)(M.c,{children:Object(f.jsx)(M.d,{id:"inp4",type:"text"})}),Object(f.jsx)(M.a,{type:"button",className:m.a.button,children:"\u041e\u0431\u0440\u0435\u0437\u0430\u0442\u044c"})]})}),Object(f.jsx)(L,{active:Q,setActive:W,children:Object(f.jsxs)(M.b,{children:[Object(f.jsxs)(M.c,{children:[Object(f.jsx)(M.e,{for:"gauss",children:"\u0420\u0430\u0437\u043c\u044b\u0442\u0438\u0435 \u043f\u043e \u0413\u0430\u0443\u0441\u0441\u0443"}),Object(f.jsx)(M.d,{id:"gauss",name:"gauss",type:"text",onChange:function(){var e=document.querySelector("#gauss");Fe(e.value)},value:Ae})]}),Object(f.jsx)(M.a,{type:"button",className:m.a.button,onClick:function(){return function(e){return ct.apply(this,arguments)}(Ae)},children:"\u041e\u043a"})]})}),Object(f.jsxs)(L,{active:R,setActive:U,children:[Object(f.jsx)(M.a,{type:"button",className:m.a.button,onClick:function(){return rt.apply(this,arguments)},children:"\u041d\u0435\u0433\u0430\u0442\u0438\u0432"}),Object(f.jsx)(M.a,{type:"button",className:m.a.button,onClick:function(){return at.apply(this,arguments)},children:"\u0427\u0435\u0440\u043d\u043e-\u0431\u0435\u043b\u044b\u0439"}),Object(f.jsx)(M.a,{type:"button",className:m.a.button,children:"\u0421\u0435\u043f\u0438\u044f"})]}),Object(f.jsxs)("div",{id:"resize",children:[Object(f.jsx)("div",{children:"\u041c\u0430\u0441\u0448\u0442\u0430\u0431"}),Object(f.jsx)(M.d,{id:"resizeInp",type:"range",min:"1",max:"3",step:"0.1",onChange:function(){return nt.apply(this,arguments)}})]})]})},q=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsx)(T,{})})};s.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(q,{})}),document.getElementById("root"))},8:function(e,t,n){e.exports={cnvs_bg:"MyCanvas_cnvs_bg__2NX2Q",cnvs_fg:"MyCanvas_cnvs_fg__1pFzq",cnvs_save:"MyCanvas_cnvs_save__1v4LH",button:"MyCanvas_button__LSk_V",button_form:"MyCanvas_button_form__3eI89",container:"MyCanvas_container__1miQv"}}},[[37,1,2]]]);
//# sourceMappingURL=main.dcd31019.chunk.js.map