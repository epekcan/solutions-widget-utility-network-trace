import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { c as getSlotted } from './dom-b2b7d90d.js';

const CSS = {
  container: "container",
  header: "header",
  heading: "heading",
  close: "close",
  imageFrame: "image-frame",
  content: "content",
  info: "info"
};
const ICONS = {
  close: "x"
};
const SLOTS = {
  thumbnail: "thumbnail"
};
const TEXT = {
  close: "Close"
};

const calciteTipCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:relative;display:flex;flex-flow:row;margin:var(--calcite-spacing) var(--calcite-spacing);border:solid 1px var(--calcite-ui-border-2);--tip-content-only-width:100%;--tip-content-width:70%;--tip-image-frame-width:25%;--tip-image-max-width:100%}.container{padding:var(--calcite-spacing)}:host([selected]) .container{border:none;margin:0;padding:0}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-ui-text-weight-demi);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:1.25rem}h2.heading{font-size:1.125rem}h3.heading{font-size:1rem}h4.heading,h5.heading{font-size:0.875rem}.header{margin-bottom:var(--calcite-spacing-half)}.header .heading{color:var(--calcite-ui-text-2);padding:0}.container[hidden]{display:none}.content{display:flex}.info{padding:0 var(--calcite-spacing);width:var(--tip-content-width)}.info:only-child{width:var(--tip-content-only-width);padding-left:0;padding-right:0}::slotted(p){margin-top:0}::slotted(a){color:var(--calcite-ui-blue-1);outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}::slotted(a:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.image-frame{width:var(--tip-image-frame-width)}.image-frame img{max-width:var(--tip-image-max-width)}::slotted(img){max-width:var(--tip-image-max-width)}";

const CalciteTip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTipDismiss = createEvent(this, "calciteTipDismiss", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * No longer displays the tip.
     */
    this.dismissed = false;
    /**
     * Indicates whether the tip can be dismissed.
     */
    this.nonDismissible = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.hideTip = () => {
      this.dismissed = true;
      this.calciteTipDismiss.emit();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const { heading } = this;
    return heading ? (h("header", { class: CSS.header }, h("h3", { class: CSS.heading }, heading))) : null;
  }
  renderDismissButton() {
    const { nonDismissible, hideTip, intlClose } = this;
    const text = intlClose || TEXT.close;
    return !nonDismissible ? (h("calcite-action", { class: CSS.close, icon: ICONS.close, onClick: hideTip, scale: "l", text: text })) : null;
  }
  renderImageFrame() {
    const { el } = this;
    return getSlotted(el, SLOTS.thumbnail) ? (h("div", { class: CSS.imageFrame }, h("slot", { name: SLOTS.thumbnail }))) : null;
  }
  renderInfoNode() {
    return (h("div", { class: CSS.info }, h("slot", null)));
  }
  renderContent() {
    return (h("div", { class: CSS.content }, this.renderImageFrame(), this.renderInfoNode()));
  }
  render() {
    return (h(Host, null, h("article", { class: CSS.container, hidden: this.dismissed }, this.renderHeader(), this.renderContent()), this.renderDismissButton()));
  }
  get el() { return getElement(this); }
};
CalciteTip.style = calciteTipCss;

export { CalciteTip as calcite_tip };
