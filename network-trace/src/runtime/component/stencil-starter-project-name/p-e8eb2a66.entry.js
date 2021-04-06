import{r as t,c as e,h as i,H as a,g as s}from"./p-551d452f.js";import{d as o}from"./p-ddb29161.js";import{g as r}from"./p-769235dc.js";import{I as c}from"./p-485d2f2d.js";import{C as n,S as l}from"./p-7699aa9c.js";const h=class{constructor(i){t(this,i),this.calciteListItemRemove=e(this,"calciteListItemRemove",7),this.disabled=!1,this.disableDeselect=!1,this.handleActivated=!1,this.icon=null,this.removable=!1,this.selected=!1,this.pickListItem=null,this.guid="calcite-value-list-item-"+r(),this.getPickListRef=t=>this.pickListItem=t,this.handleKeyDown=t=>{" "===t.key&&(this.handleActivated=!this.handleActivated)},this.handleBlur=()=>{this.handleActivated=!1},this.handleSelectChange=t=>{this.selected=t.detail.selected}}async toggleSelected(t){this.pickListItem.toggleSelected(t)}async setFocus(){var t;null===(t=this.pickListItem)||void 0===t||t.setFocus()}calciteListItemChangeHandler(t){t.detail.item=this.el}renderActionsEnd(){const{el:t}=this;return o(t,"actions-end")?i("slot",{name:"actions-end",slot:l.actionsEnd}):null}renderActionsStart(){const{el:t}=this;return o(t,"actions-start")?i("slot",{name:"actions-start",slot:l.actionsStart}):null}renderHandle(){const{icon:t}=this;if(t===c.grip)return i("span",{"aria-pressed":this.handleActivated.toString(),class:{[n.handle]:!0,[n.handleActivated]:this.handleActivated},"data-js-handle":!0,onBlur:this.handleBlur,onKeyDown:this.handleKeyDown,role:"button",tabindex:"0"},i("calcite-icon",{icon:"drag",scale:"s"}))}render(){return i(a,{"data-id":this.guid},this.renderHandle(),i("calcite-pick-list-item",{description:this.description,disableDeselect:this.disableDeselect,disabled:this.disabled,label:this.label,metadata:this.metadata,onCalciteListItemChange:this.handleSelectChange,ref:this.getPickListRef,removable:this.removable,selected:this.selected,value:this.value},this.renderActionsStart(),this.renderActionsEnd()))}get el(){return s(this)}};h.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{margin-bottom:1px;display:flex;transition:background-color 150ms ease-in-out, box-shadow 150ms ease-in-out;box-shadow:0 1px 0 var(--calcite-ui-border-3)}calcite-pick-list-item{box-shadow:none;flex-grow:1;position:relative;margin:0}:host([active]),:host([selected]){box-shadow:0 0 0 1px var(--calcite-ui-brand)}.handle{display:flex;align-items:center;justify-content:center;padding:0 var(--calcite-spacing-quarter);background-color:transparent;border:none;color:var(--calcite-ui-border-1);line-height:0;cursor:move;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.handle:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.handle:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.handle--activated{background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-1)}";export{h as calcite_value_list_item}