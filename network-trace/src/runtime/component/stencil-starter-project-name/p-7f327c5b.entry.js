import{r as i,c as e,h as t,H as a,g as n}from"./p-551d452f.js";import{c as r}from"./p-f450c62e.js";const o=class{constructor(t){i(this,t),this.calciteTipDismiss=e(this,"calciteTipDismiss",7),this.dismissed=!1,this.nonDismissible=!1,this.hideTip=()=>{this.dismissed=!0,this.calciteTipDismiss.emit()}}renderHeader(){const{heading:i}=this;return i?t("header",{class:"header"},t("h3",{class:"heading"},i)):null}renderDismissButton(){const{nonDismissible:i,hideTip:e,intlClose:a}=this;return i?null:t("calcite-action",{class:"close",icon:"x",onClick:e,scale:"l",text:a||"Close"})}renderImageFrame(){const{el:i}=this;return r(i,"thumbnail")?t("div",{class:"image-frame"},t("slot",{name:"thumbnail"})):null}renderInfoNode(){return t("div",{class:"info"},t("slot",null))}renderContent(){return t("div",{class:"content"},this.renderImageFrame(),this.renderInfoNode())}render(){return t(a,null,t("article",{class:"container",hidden:this.dismissed},this.renderHeader(),this.renderContent()),this.renderDismissButton())}get el(){return n(this)}};o.style="@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:relative;display:flex;flex-flow:row;margin:var(--calcite-spacing) var(--calcite-spacing);border:solid 1px var(--calcite-ui-border-2);--tip-content-only-width:100%;--tip-content-width:70%;--tip-image-frame-width:25%;--tip-image-max-width:100%}.container{padding:var(--calcite-spacing)}:host([selected]) .container{border:none;margin:0;padding:0}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-ui-text-weight-demi);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:1.25rem}h2.heading{font-size:1.125rem}h3.heading{font-size:1rem}h4.heading,h5.heading{font-size:0.875rem}.header{margin-bottom:var(--calcite-spacing-half)}.header .heading{color:var(--calcite-ui-text-2);padding:0}.container[hidden]{display:none}.content{display:flex}.info{padding:0 var(--calcite-spacing);width:var(--tip-content-width)}.info:only-child{width:var(--tip-content-only-width);padding-left:0;padding-right:0}::slotted(p){margin-top:0}::slotted(a){color:var(--calcite-ui-blue-1);outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}::slotted(a:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.image-frame{width:var(--tip-image-frame-width)}.image-frame img{max-width:var(--tip-image-max-width)}::slotted(img){max-width:var(--tip-image-max-width)}";export{o as calcite_tip}