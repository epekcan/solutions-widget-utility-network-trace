import{r as t,h as e,H as i,g as n}from"./p-551d452f.js";import{g as s}from"./p-f450c62e.js";const a=class{constructor(e){t(this,e),this.userSelect=!0,this.childElType="span"}connectedCallback(){this.childElType=this.href?"a":"span"}render(){const t=s(this.el),n=this.getAttributes(),a=this.childElType,o="span"===this.childElType?"link":null,c=this.disabled?-1:"span"===this.childElType?0:null,r=e("calcite-icon",{class:"calcite-link--icon icon-start",dir:t,flipRtl:"start"===this.iconFlipRtl||"both"===this.iconFlipRtl,icon:this.iconStart,scale:"s"}),l=e("calcite-icon",{class:"calcite-link--icon icon-end",dir:t,flipRtl:"end"===this.iconFlipRtl||"both"===this.iconFlipRtl,icon:this.iconEnd,scale:"s"});return e(i,{dir:t},e(a,Object.assign({},n,{href:"a"===a&&this.href,ref:t=>this.childEl=t,role:o,tabIndex:c}),this.iconStart?r:null,e("slot",null),this.iconEnd?l:null))}async setFocus(){this.childEl.focus()}getAttributes(){const t=["dir","icon-end","icon-start","id","theme","user-select"];return Array.from(this.el.attributes).filter((e=>e&&!t.includes(e.name))).reduce(((t,{name:e,value:i})=>Object.assign(Object.assign({},t),{[e]:i})),{})}get el(){return n(this)}};a.style="@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline;--calcite-blue-accessible:#00619b;--calcite-link-blue-underline:rgba(0, 97, 155, 0.4)}:host([theme=dark]){--calcite-blue-accessible:#00A0FF;--calcite-link-blue-underline:rgba(0, 160, 255, 0.4)}:host a,:host span{position:relative;display:flex;align-items:center;justify-content:center;text-decoration:none;border-radius:0;border:none;line-height:inherit;font-size:inherit;font-family:inherit;-webkit-appearance:none;cursor:pointer;transition:150ms ease-in-out}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-link--icon{transition:150ms ease-in-out}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:0.4}:host .calcite-link--icon.icon-start{margin-right:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-start{margin-right:0;margin-left:0.5rem}:host .calcite-link--icon.icon-end{margin-left:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-end{margin-left:0;margin-right:0.5rem}:host([user-select]) span,:host([user-select]) a{-webkit-user-select:text;-ms-user-select:text;user-select:text}:host span,:host a{display:inline;padding:0;border:none;color:var(--calcite-blue-accessible);line-height:inherit;white-space:initial;background-color:transparent;position:relative;background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-blue-underline), var(--calcite-link-blue-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host span:hover,:host span:focus,:host a:hover,:host a:focus{color:var(--calcite-ui-blue-1);background-size:100% 1px, 100% 1px}:host span:hover .calcite-link--icon,:host span:focus .calcite-link--icon,:host a:hover .calcite-link--icon,:host a:focus .calcite-link--icon{fill:var(--calcite-ui-blue-1)}:host span:active,:host a:active{color:var(--calcite-blue-accessible);background-size:100% 2px, 100% 2px}:host([dir=rtl]) span,:host([dir=rtl]) a{background-position:100% 100%, 100% 100%}";export{a as calcite_link}