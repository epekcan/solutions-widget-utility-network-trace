import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir, b as getElementProp } from './dom-558ef00c.js';

const calciteRadioGroupItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;align-self:stretch;cursor:pointer;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out}:host label{display:flex;flex:1;color:var(--calcite-ui-text-3);border:1px solid transparent;margin:4px;box-sizing:border-box;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;pointer-events:none;display:flex;align-items:center}:host([layout=horizontal]) label{justify-content:center}:host{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([scale=s]) label{font-size:var(--calcite-font-size--2);padding:0.25rem 0.75rem}:host([scale=m]) label{font-size:var(--calcite-font-size--1);padding:0.4rem 1rem}:host([scale=l]) label{font-size:var(--calcite-font-size-1);padding:0.5rem 1.5rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{background-color:var(--calcite-ui-brand);border-color:var(--calcite-ui-brand);color:var(--calcite-ui-background);cursor:default}:host([appearance=outline][checked]) label{background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);color:var(--calcite-ui-brand)}::slotted(input){display:none}.radio-group-item-icon{display:inline-flex;position:relative;margin:0;line-height:inherit;transition:150ms ease-in-out}:host([icon-position=start]) .radio-group-item-icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .radio-group-item-icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .radio-group-item-icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .radio-group-item-icon{margin-left:0;margin-right:0.5rem}";

const CalciteRadioGroupItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Indicates whether the control is checked. */
    this.checked = false;
    /** optionally used with icon, select where to position the icon */
    this.iconPosition = "start";
    this.mutationObserver = this.getMutationObserver();
  }
  handleCheckedChange() {
    this.calciteRadioGroupItemChange.emit();
    this.syncToExternalInput();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const inputProxy = this.el.querySelector(`input[slot="input"]`);
    if (inputProxy) {
      this.value = inputProxy.value;
      this.checked = inputProxy.checked;
      {
        this.mutationObserver.observe(inputProxy, { attributes: true });
      }
    }
    this.inputProxy = inputProxy;
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }
  componentWillLoad() {
    // only use default slot content in browsers that support shadow dom
    // or if ie11 has no label provided (#374)
    const label = this.el.querySelector("label");
    this.useFallback = !label || label.textContent === "";
  }
  render() {
    const { checked, useFallback, value } = this;
    const dir = getElementDir(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const appearance = getElementProp(this.el, "appearance", "solid");
    const layout = getElementProp(this.el, "layout", "horizontal");
    const iconEl = (h("calcite-icon", { class: "radio-group-item-icon", dir: dir, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "s" }));
    return (h(Host, { appearance: appearance, "aria-checked": checked.toString(), layout: layout, role: "radio", scale: scale }, h("label", null, this.icon && this.iconPosition === "start" ? iconEl : null, h("slot", null, useFallback ? value : ""), h("slot", { name: "input" }), this.icon && this.iconPosition === "end" ? iconEl : null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getMutationObserver() {
    return  new MutationObserver(() => this.syncFromExternalInput());
  }
  syncFromExternalInput() {
    if (this.inputProxy) {
      this.value = this.inputProxy.value;
      this.checked = this.inputProxy.checked;
    }
  }
  syncToExternalInput() {
    if (!this.inputProxy) {
      return;
    }
    this.inputProxy.value = this.value;
    if (this.checked) {
      this.inputProxy.setAttribute("checked", "true");
    }
    else {
      this.inputProxy.removeAttribute("checked");
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["handleCheckedChange"]
  }; }
};
CalciteRadioGroupItem.style = calciteRadioGroupItemCss;

export { CalciteRadioGroupItem as calcite_radio_group_item };
