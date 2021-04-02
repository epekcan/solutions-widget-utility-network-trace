import{r as t,h as a,g as n}from"./p-551d452f.js";import{g as i}from"./p-769235dc.js";function s(t){return t<0?-1:1}function e(t,a,n){const i=a[0]-t[0];return i?(3*(a[1]-t[1])/i-n)/2:n}function r(t,a,n,i,s){const[e,r]=t,[h,o]=a,c=(h-e)/3;return`C ${s([e+c,r+c*n]).join(",")} ${s([h-c,o-c*i]).join(",")} ${s([h,o]).join(",")}`}const h=class{constructor(a){t(this,a),this.data=[],this.width=300,this.height=100,this.maskId="calcite-graph-mask-"+i()}render(){const{data:t,width:n,height:i,highlightMax:h,highlightMin:o}=this,c=this.maskId;if(!t||0===t.length)return a("svg",{class:"svg",height:i,preserveAspectRatio:"none",viewBox:`0 0 ${n} ${i}`,width:n});const{min:p,max:l}=function(t){const[a,n]=t[0];return t.reduce((({min:t,max:a},[n,i])=>({min:[Math.min(t[0],n),Math.min(t[1],i)],max:[Math.max(a[0],n),Math.max(a[1],i)]})),{min:[a,n],max:[a,n]})}(t),$=function({width:t,height:a,min:n,max:i}){const s=i[0]-n[0],e=i[1]-n[1];return n=>[n[0]/s*t,a-n[1]/e*a]}({min:p,max:l,width:n,height:i}),[m]=$([o,l[1]]),[d]=$([h,l[1]]),g=function({data:t,min:a,max:n,t:i}){if(0===t.length)return"";const[h,o]=i(t[0]),[c,p]=i(a),[l]=i(n);let $,m,d;const g=t.reduce(((a,n,h)=>{if(m=t[h-2],d=t[h-1],h>1){const t=function(t,a,n){const i=a[0]-t[0],e=n[0]-a[0],r=(a[1]-t[1])/(i||e<0&&0),h=(n[1]-a[1])/(e||i<0&&0),o=(r*e+h*i)/(i+e);return(s(r)+s(h))*Math.min(Math.abs(r),Math.abs(h),.5*Math.abs(o))||0}(m,d,n),h=void 0===$?e(m,d,t):$,o=r(m,d,h,t,i);return $=t,`${a} ${o}`}return a}),`M ${c},${p} L ${c},${o} L ${h},${o}`),f=t[t.length-1];return`${g} ${r(d,f,$,e(d,f,$),i)} L ${l},${p} Z`}({data:t,min:p,max:l,t:$});return a("svg",{class:"svg",height:i,preserveAspectRatio:"none",viewBox:`0 0 ${n} ${i}`,width:n},void 0!==o?a("svg",{class:"svg",height:i,preserveAspectRatio:"none",viewBox:`0 0 ${n} ${i}`,width:n},a("mask",{height:"100%",id:c+"1",width:"100%",x:"0%",y:"0%"},a("path",{d:`\n              M 0,0\n              L ${m-1},0\n              L ${m-1},${i}\n              L 0,${i}\n              Z\n            `,fill:"white"})),a("mask",{height:"100%",id:c+"2",width:"100%",x:"0%",y:"0%"},a("path",{d:`\n              M ${m+1},0\n              L ${d-1},0\n              L ${d-1},${i}\n              L ${m+1}, ${i}\n              Z\n            `,fill:"white"})),a("mask",{height:"100%",id:c+"3",width:"100%",x:"0%",y:"0%"},a("path",{d:`\n                  M ${d+1},0\n                  L ${n},0\n                  L ${n},${i}\n                  L ${d+1}, ${i}\n                  Z\n                `,fill:"white"})),a("path",{class:"graph-path",d:g,mask:`url(#${c}1)`}),a("path",{class:"graph-path--highlight",d:g,mask:`url(#${c}2)`}),a("path",{class:"graph-path",d:g,mask:`url(#${c}3)`})):a("path",{class:"graph-path",d:g}))}get el(){return n(this)}};h.style="@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}.svg{fill:currentColor;stroke:transparent;margin:0;padding:0;display:block}";export{h as calcite_graph}