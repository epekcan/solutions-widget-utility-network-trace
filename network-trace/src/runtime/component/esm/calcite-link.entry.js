import { r as registerInstance, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir, a as getAttributes, f as focusElement } from './dom-558ef00c.js';

const calciteLinkCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline;--calcite-link-blue-underline:rgba(0, 97, 155, 0.4)}:host([theme=dark]){--calcite-link-blue-underline:rgba(0, 160, 255, 0.4)}:host a,:host span{display:flex;position:relative;align-items:center;justify-content:center;border-radius:0;border-style:none;font-family:inherit;cursor:pointer;text-decoration:none;line-height:inherit;font-size:inherit;-webkit-appearance:none;transition:150ms ease-in-out}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.calcite-link--icon{transition:150ms ease-in-out}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}:host .calcite-link--icon.icon-start{margin-right:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-start{margin-right:0;margin-left:0.5rem}:host .calcite-link--icon.icon-end{margin-left:0.5rem}:host([dir=rtl]) .calcite-link--icon.icon-end{margin-left:0;margin-right:0.5rem}:host span,:host a{display:inline;padding:0;border-style:none;background-color:transparent;position:relative;color:var(--calcite-ui-text-link);line-height:inherit;white-space:initial;background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-link-blue-underline), var(--calcite-link-blue-underline));background-position:0% 100%, 100% 100%;background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px;transition:all 0.15s ease-in-out, background-size 0.3s ease-in-out}:host:hover,:host:focus{color:var(--calcite-ui-brand);background-size:100% 1px, 100% 1px}:host:hover .calcite-link--icon,:host:focus .calcite-link--icon{fill:var(--calcite-ui-brand)}:host:active{color:var(--calcite-ui-text-link);background-size:100% 2px, 100% 2px}:host([dir=rtl]) span,:host([dir=rtl]) a{background-position:100% 100%, 100% 100%}";

const CalciteLink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** the node type of the rendered child element */
    this.childElType = "span";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.storeTagRef = (el) => {
      this.childEl = el;
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.childElType = this.href ? "a" : "span";
  }
  render() {
    const dir = getElementDir(this.el);
    const iconStartEl = (h("calcite-icon", { class: "calcite-link--icon icon-start", dir: dir, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const iconEndEl = (h("calcite-icon", { class: "calcite-link--icon icon-end", dir: dir, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    const attributes = getAttributes(this.el, ["dir", "icon-end", "icon-start", "id", "theme"]);
    const Tag = this.childElType;
    const role = this.childElType === "span" ? "link" : null;
    const tabIndex = this.disabled ? -1 : this.childElType === "span" ? 0 : null;
    return (h(Host, { dir: dir, role: "presentation" }, h(Tag, Object.assign({}, attributes, { href: Tag === "a" && this.href, ref: this.storeTagRef, role: role, tabIndex: tabIndex }), this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    focusElement(this.childEl);
  }
  get el() { return getElement(this); }
};
CalciteLink.style = calciteLinkCss;

export { CalciteLink as calcite_link };
