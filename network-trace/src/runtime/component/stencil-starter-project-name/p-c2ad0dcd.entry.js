import{r as s,h as r,g as t,H as o}from"./p-551d452f.js";import{h as e}from"./p-ddb29161.js";import{P as a}from"./p-39a8d341.js";const p=class{constructor(r){s(this,r),this.selector=`[${a}]`,this.getRelatedPopover=s=>e(s.closest(this.selector),a)}render(){return r(o,null)}closeOpenPopovers(s){const r=s.target,{autoClose:t,el:o}=this,e="calcite-popover",a=r.closest(e),p=this.getRelatedPopover(r);t&&!a&&Array.from(document.body.querySelectorAll(e)).filter((s=>s.open&&s!==p)).forEach((s=>s.toggle(!1))),o.contains(r)&&p&&p.toggle()}get el(){return t(this)}};export{p as calcite_popover_manager}