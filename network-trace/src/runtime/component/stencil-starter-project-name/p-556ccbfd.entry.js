import{r as t,c as i,h as e,H as a,g as s}from"./p-551d452f.js";import{g as n}from"./p-ddb29161.js";import{a as c,C as r}from"./p-84f46c35.js";import{H as o,T as l,C as h,I as p}from"./p-15c975da.js";const d=class{constructor(e){t(this,e),this.calciteTipManagerToggle=i(this,"calciteTipManagerToggle",7),this.closed=!1,this.headingLevel=o,this.observer=new MutationObserver((()=>this.setUpTips())),this.hideTipManager=()=>{this.closed=!0,this.calciteTipManagerToggle.emit()},this.previousClicked=()=>{this.previousTip()},this.nextClicked=()=>{this.nextTip()},this.tipManagerKeyUpHandler=t=>{if(t.target===this.container)switch(t.key){case"ArrowRight":t.preventDefault(),this.nextTip();break;case"ArrowLeft":t.preventDefault(),this.previousTip();break;case"Home":t.preventDefault(),this.selectedIndex=0;break;case"End":t.preventDefault(),this.selectedIndex=this.total-1}},this.storeContainerRef=t=>{this.container=t}}closedChangeHandler(){this.direction=null,this.calciteTipManagerToggle.emit()}selectedChangeHandler(){this.showSelectedTip(),this.updateGroupTitle()}connectedCallback(){this.setUpTips(),this.observer.observe(this.el,{childList:!0,subtree:!0})}disconnectedCallback(){this.observer.disconnect()}async nextTip(){this.direction="advancing",this.selectedIndex=(this.selectedIndex+1+this.total)%this.total}async previousTip(){this.direction="retreating",this.selectedIndex=(this.selectedIndex-1+this.total)%this.total}setUpTips(){const t=Array.from(this.el.querySelectorAll("calcite-tip"));if(this.total=t.length,0===this.total)return;const i=this.el.querySelector("calcite-tip[selected]");this.tips=t,this.selectedIndex=i?t.indexOf(i):0,t.forEach((t=>{t.headingLevel=c(this.headingLevel+1),t.nonDismissible=!0})),this.showSelectedTip(),this.updateGroupTitle()}showSelectedTip(){this.tips.forEach(((t,i)=>{const e=this.selectedIndex===i;t.selected=e,t.hidden=!e}))}updateGroupTitle(){const t=this.tips[this.selectedIndex].closest("calcite-tip-group");this.groupTitle=(null==t?void 0:t.groupTitle)||this.intlDefaultTitle||l.defaultGroupTitle}renderPagination(){const t=n(this.el),{selectedIndex:i,tips:a,total:s,intlNext:c,intlPrevious:r,intlPaginationLabel:o}=this,d=c||l.next,g=o||l.defaultPaginationLabel;return a.length>1?e("footer",{class:h.pagination},e("calcite-action",{class:h.pagePrevious,icon:"ltr"===t?p.chevronLeft:p.chevronRight,onClick:this.previousClicked,text:r||l.previous}),e("span",{class:h.pagePosition},`${g} ${i+1}/${s}`),e("calcite-action",{class:h.pageNext,icon:"ltr"===t?p.chevronRight:p.chevronLeft,onClick:this.nextClicked,text:d})):null}render(){const{closed:t,direction:i,headingLevel:s,groupTitle:n,selectedIndex:c,intlClose:o,total:d}=this,g=o||l.close;return 0===d?e(a,null):e(a,null,e("section",{"aria-hidden":t.toString(),class:h.container,hidden:t,onKeyUp:this.tipManagerKeyUpHandler,ref:this.storeContainerRef,tabIndex:0},e("header",{class:h.header},e(r,{class:h.heading,level:s},n),e("calcite-action",{class:h.close,icon:p.close,onClick:this.hideTipManager,text:g})),e("div",{class:{[h.tipContainer]:!0,[h.tipContainerAdvancing]:!t&&"advancing"===i,[h.tipContainerRetreating]:!t&&"retreating"===i},key:c,tabIndex:0},e("slot",null)),this.renderPagination()))}get el(){return s(this)}static get watchers(){return{closed:["closedChangeHandler"],selectedIndex:["selectedChangeHandler"]}}};d.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;--calcite-tip-manager-height:18vh;--calcite-tip-max-width:540px}:host([closed]){display:none}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}.header .heading{padding-left:var(--calcite-spacing-half);padding-right:var(--calcite-spacing-half)}.container{overflow:hidden;position:relative;padding:var(--calcite-spacing-half) var(--calcite-spacing-half) 0;min-height:150px;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.container:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.tip-container{animation-name:none;animation-duration:150ms;animation-timing-function:cubic-bezier(0.215, 0.44, 0.42, 0.88);height:var(--calcite-tip-manager-height);margin-top:var(--calcite-spacing-quarter);overflow:auto;display:flex;justify-content:center;align-items:flex-start;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.tip-container:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}::slotted(calcite-tip){border:none;max-width:var(--calcite-tip-max-width)}.tip-container--advancing{animation-name:tip-advance}.tip-container--retreating{animation-name:tip-retreat}.pagination{display:flex;align-items:center;justify-content:center;padding:var(--calcite-spacing-quarter) 0}.page-position{font-size:0.75rem;line-height:1.5;margin:0 var(--calcite-spacing-half)}@keyframes tip-advance{0%{opacity:0;transform:translate3d(50px, 0, 0) scale(0.99)}100%{opacity:1;transform:translate3d(0, 0, 0) scale(1)}}@keyframes tip-retreat{0%{opacity:0;transform:translate3d(-50px, 0, 0) scale(0.99)}100%{opacity:1;transform:translate3d(0, 0, 0) scale(1)}}";export{d as calcite_tip_manager}