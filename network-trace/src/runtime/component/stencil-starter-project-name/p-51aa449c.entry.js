import{r as t,c as e,h as i,g as s}from"./p-551d452f.js";import"./p-ddb29161.js";import"./p-7758183a.js";import"./p-485d2f2d.js";import{g as a}from"./p-7b3393a7.js";import{m as r,d as o,s as c,h as n,g as l,k as h,i as p,a as m,c as d,r as u,b as f,e as g,f as v,j as y,L as b}from"./p-ea6531c4.js";import{S as x}from"./p-ccfe3f2a.js";var w;!function(t){t.grip="grip"}(w||(w={}));const D=class{constructor(i){t(this,i),this.calciteListChange=e(this,"calciteListChange",7),this.calciteListOrderChange=e(this,"calciteListOrderChange",7),this.disabled=!1,this.dragEnabled=!1,this.filterEnabled=!1,this.loading=!1,this.multiple=!1,this.selectedValues=new Map,this.dataForFilter=[],this.lastSelectedItem=null,this.observer=new MutationObserver(r.bind(this)),this.deselectSiblingItems=o.bind(this),this.selectSiblings=c.bind(this),this.handleFilter=n.bind(this),this.getItemData=l.bind(this),this.keyDownHandler=t=>{const e=t.composedPath().find((t=>{var e;return void 0!==(null===(e=t.dataset)||void 0===e?void 0:e.jsHandle)})),i=t.composedPath().find((t=>{var e;return"calcite-value-list-item"===(null===(e=t.tagName)||void 0===e?void 0:e.toLowerCase())}));if(!e||!i.handleActivated)return void h.call(this,t);if("ArrowUp"!==t.key&&"ArrowDown"!==t.key)return;t.preventDefault();const{el:s,items:r}=this,o="ArrowDown"===t.key?1:-1,c=r.indexOf(i),n=a(c+o,r.length);if(n===r.length-1)s.appendChild(i);else{const t=s.children[n];s.insertBefore(i,t===i.nextElementSibling?t.nextElementSibling:t)}requestAnimationFrame((()=>e.focus())),i.handleActivated=!0}}connectedCallback(){p.call(this),m.call(this)}componentDidLoad(){this.setUpDragAndDrop()}disconnectedCallback(){d.call(this),this.cleanUpDragAndDrop()}calciteListItemRemoveHandler(t){u.call(this,t)}calciteListItemChangeHandler(t){f.call(this,t)}calciteListItemPropsChangeHandler(t){t.stopPropagation(),this.setUpFilter()}calciteListItemValueChangeHandler(t){g.call(this,t)}setUpItems(){v.call(this,"calcite-value-list-item")}setUpFilter(){this.filterEnabled&&(this.dataForFilter=this.getItemData())}setUpDragAndDrop(){this.dragEnabled&&(this.sortable=x.create(this.el,{handle:".handle",draggable:"calcite-value-list-item",group:this.group,onSort:()=>{this.items=Array.from(this.el.querySelectorAll("calcite-value-list-item"));const t=this.items.map((t=>t.value));this.calciteListOrderChange.emit(t)}}))}cleanUpDragAndDrop(){this.dragEnabled&&this.sortable.destroy()}async getSelectedItems(){return this.selectedValues}async setFocus(){return y.call(this)}getIconType(){let t=null;return this.dragEnabled&&(t=w.grip),t}render(){return i(b,{onKeyDown:this.keyDownHandler,props:this})}get el(){return s(this)}};D.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{align-items:stretch;background-color:transparent;display:flex;flex:0 0 auto;flex-flow:column;position:relative}calcite-value-list-item:last-of-type{box-shadow:none}header{background-color:var(--calcite-ui-foreground-1);display:flex;justify-content:flex-end;align-items:center;margin-bottom:var(--calcite-spacing-quarter);box-shadow:0 1px 0 var(--calcite-ui-border-3)}header.sticky{position:sticky;top:0;z-index:1}calcite-filter{margin-bottom:1px}calcite-scrim{display:flex;flex:0 0 auto;flex-flow:column;pointer-events:none}";export{D as calcite_value_list}