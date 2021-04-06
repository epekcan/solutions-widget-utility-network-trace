import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { d as getSlotted } from './dom-558ef00c.js';
import { C as CalciteHeading } from './CalciteHeading-6f7131cd.js';
import { H as HEADING_LEVEL$1 } from './resources-ed9e05cf.js';

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
const HEADING_LEVEL = (HEADING_LEVEL$1 + 1);

const calciteTipCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:relative;display:flex;flex-flow:row;margin:var(--calcite-spacing) var(--calcite-spacing);border:solid 1px var(--calcite-ui-border-2);--tip-content-only-width:100%;--tip-content-width:70%;--tip-image-frame-width:25%;--tip-image-max-width:100%}.container{padding:var(--calcite-spacing)}:host([selected]) .container{border:none;margin:0;padding:0}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}.header{margin-bottom:var(--calcite-spacing-half)}.header .heading{color:var(--calcite-ui-text-2);padding:0}.container[hidden]{display:none}.content{display:flex}.info{padding:0 var(--calcite-spacing);width:var(--tip-content-width)}.info:only-child{width:var(--tip-content-only-width);padding-left:0;padding-right:0}::slotted(p){margin-top:0}::slotted(a){color:var(--calcite-ui-brand);outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}::slotted(a:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.image-frame{width:var(--tip-image-frame-width)}.image-frame img{max-width:var(--tip-image-max-width)}::slotted(img){max-width:var(--tip-image-max-width)}";

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
    /**
     * Number at which section headings should start for this component.
     */
    this.headingLevel = HEADING_LEVEL;
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
    const { heading, headingLevel } = this;
    return heading ? (h("header", { class: CSS.header }, h(CalciteHeading, { class: CSS.heading, level: headingLevel }, heading))) : null;
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
