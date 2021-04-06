import{r as t,c as e,h as i,H as a,g as s}from"./p-551d452f.js";import{d as o}from"./p-ddb29161.js";import{I as r}from"./p-485d2f2d.js";import{T as n,I as l,C as c,S as h}from"./p-7699aa9c.js";const d=class{constructor(i){t(this,i),this.calciteListItemChange=e(this,"calciteListItemChange",7),this.calciteListItemRemove=e(this,"calciteListItemRemove",7),this.calciteListItemPropsChange=e(this,"calciteListItemPropsChange",7),this.calciteListItemValueChange=e(this,"calciteListItemValueChange",7),this.disabled=!1,this.disableDeselect=!1,this.icon=null,this.removable=!1,this.selected=!1,this.intlRemove=n.remove,this.pickListClickHandler=t=>{this.disabled||this.disableDeselect&&this.selected||(this.shiftPressed=t.shiftKey,this.selected=!this.selected)},this.pickListKeyDownHandler=t=>{if(" "===t.key){if(t.preventDefault(),this.disableDeselect&&this.selected)return;this.selected=!this.selected}},this.removeClickHandler=()=>{this.calciteListItemRemove.emit()}}descriptionWatchHandler(){this.calciteListItemPropsChange.emit()}labelWatchHandler(){this.calciteListItemPropsChange.emit()}metadataWatchHandler(){this.calciteListItemPropsChange.emit()}selectedWatchHandler(){this.calciteListItemChange.emit({item:this.el,value:this.value,selected:this.selected,shiftPressed:this.shiftPressed}),this.shiftPressed=!1}valueWatchHandler(t,e){this.calciteListItemValueChange.emit({oldValue:e,newValue:t})}async toggleSelected(t){this.disabled||(this.selected="boolean"==typeof t?t:!this.selected)}async setFocus(){var t;null===(t=this.focusEl)||void 0===t||t.focus()}renderIcon(){const{icon:t}=this;return t?i("span",{class:{[c.icon]:!0,[c.iconDot]:t===r.circle}},t===r.square?i("calcite-icon",{icon:l.checked,scale:"s"}):null):null}renderRemoveAction(){return this.removable?i("calcite-action",{class:c.remove,icon:l.remove,onClick:this.removeClickHandler,slot:h.actionsEnd,text:this.intlRemove}):null}renderActionsStart(){const{el:t}=this;return o(t,h.actionsStart)?i("div",{class:{[c.actions]:!0,[c.actionsStart]:!0}},i("slot",{name:h.actionsStart})):null}renderActionsEnd(){const{el:t,removable:e}=this;return o(t,h.actionsEnd)||e?i("div",{class:{[c.actions]:!0,[c.actionsEnd]:!0}},i("slot",{name:h.actionsEnd}),this.renderRemoveAction()):null}render(){const{description:t,label:e}=this;return i(a,{"aria-checked":this.selected.toString(),role:"menuitemcheckbox"},this.renderIcon(),this.renderActionsStart(),i("label",{"aria-label":e,class:c.label,onClick:this.pickListClickHandler,onKeyDown:this.pickListKeyDownHandler,ref:t=>this.focusEl=t,tabIndex:0},i("div",{class:c.textContainer},i("span",{class:c.title},e),t?i("span",{class:c.description},t):null)),this.renderActionsEnd())}get el(){return s(this)}static get watchers(){return{description:["descriptionWatchHandler"],label:["labelWatchHandler"],metadata:["metadataWatchHandler"],selected:["selectedWatchHandler"],value:["valueWatchHandler"]}}};d.style='@charset "UTF-8";@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{align-items:stretch;display:flex;color:var(--calcite-ui-text-1);box-shadow:0 1px 0 var(--calcite-ui-border-3);margin:0;margin-bottom:1px;transition:background-color 150ms ease-in-out;animation:calcite-fade-in 150ms ease-in-out}:host(:hover){background-color:var(--calcite-ui-foreground-2)}.icon{align-items:center;display:flex;margin-top:0;margin-bottom:0;margin-left:0.5rem;margin-right:0.5rem;opacity:0;color:var(--calcite-ui-brand);flex:0 0 auto;line-height:0}.icon-dot{width:0.5rem;margin:0.5rem}.icon-dot:before{content:"•"}:host([selected]) .icon{transition:opacity 150ms ease-in-out;opacity:1}.label{background-color:transparent;display:flex;flex:1 1 auto;padding:0.75rem;align-items:center;cursor:pointer;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.label:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.text-container{display:flex;overflow:hidden;pointer-events:none;padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem;flex-flow:column nowrap}.title{font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word;color:var(--calcite-ui-text-1)}.description{color:var(--calcite-ui-text-3);font-family:var(--calcite-code-family);margin-top:0.25rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word}.actions{align-items:stretch;display:flex;justify-content:flex-end;margin:0;flex:0 0 auto}.actions--start~.label{padding-left:0.25rem}.calcite--rtl .actions--start~.label{padding-left:unset;padding-right:0.25rem}';export{d as calcite_pick_list_item}