import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir, b as getElementProp } from './dom-b2b7d90d.js';

const calciteRadioGroupItemCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:flex;align-self:stretch;cursor:pointer;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out}:host label{display:flex;flex:1;color:var(--calcite-ui-text-3);border:1px solid transparent;margin:4px;box-sizing:border-box;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;pointer-events:none;display:flex;align-items:center}:host([layout=horizontal]) label{justify-content:center}:host{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([scale=s]) label{font-size:0.75rem;padding:0.25rem 0.75rem}:host([scale=m]) label{font-size:0.875rem;padding:0.4rem 1rem}:host([scale=l]) label{font-size:1.125rem;padding:0.5rem 1.5rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{background-color:var(--calcite-ui-blue-1);border-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-background);cursor:default}:host([appearance=outline][checked]) label{background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);color:var(--calcite-ui-blue-1)}::slotted(input){display:none}.radio-group-item-icon{display:inline-flex;position:relative;margin:0;line-height:inherit;transition:150ms ease-in-out}:host([icon-position=start]) .radio-group-item-icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .radio-group-item-icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .radio-group-item-icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .radio-group-item-icon{margin-left:0;margin-right:0.5rem}";

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
