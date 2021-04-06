import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { i as hasLabel, g as getElementDir } from './dom-558ef00c.js';
import { g as getKey } from './key-6f340c70.js';

const calciteSwitchCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{--calcite-switch-hover-handle-border:var(--calcite-ui-brand);--calcite-switch-switched-track-background:var(--calcite-ui-brand);--calcite-switch-switched-track-border:var(--calcite-ui-brand);--calcite-switch-switched-handle-border:var(--calcite-ui-brand);--calcite-switch-switched-hover-track-background:var(--calcite-ui-brand);--calcite-switch-switched-hover-track-border:var(--calcite-ui-brand);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-brand-hover)}:host([scale=s]){--calcite-switch-track-width:28px;--calcite-switch-track-height:16px;--calcite-switch-handle-size:14px}:host([scale=m]){--calcite-switch-track-width:36px;--calcite-switch-track-height:20px;--calcite-switch-handle-size:18px}:host([scale=l]){--calcite-switch-track-width:44px;--calcite-switch-track-height:24px;--calcite-switch-handle-size:22px}::slotted(input){display:none}:host{display:inline-block;position:relative;width:auto;cursor:pointer;-webkit-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled);pointer-events:none;cursor:default}:host{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;width:auto}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.track{position:relative;display:inline-block;vertical-align:top;width:var(--calcite-switch-track-width);height:var(--calcite-switch-track-height);background-color:var(--calcite-ui-foreground-2);border-radius:30px;border:1px solid var(--calcite-ui-border-2);pointer-events:none;transition:all 150ms ease-in-out}.handle{position:absolute;display:block;width:var(--calcite-switch-handle-size);height:var(--calcite-switch-handle-size);top:-1px;left:-1px;right:auto;background-color:var(--calcite-ui-foreground-1);border-radius:30px;border:2px solid var(--calcite-ui-border-input);pointer-events:none;transition:all 150ms ease-in-out}:host(:hover) .handle,:host(:focus) .handle{border-color:var(--calcite-switch-hover-handle-border);box-shadow:inset 0 0 0 1px var(--calcite-switch-hover-handle-border);right:auto}:host([switched]) .track{background-color:var(--calcite-switch-switched-track-background);border-color:var(--calcite-switch-switched-track-border)}:host([switched]) .handle{right:-1px;left:auto;border-color:var(--calcite-switch-switched-handle-border)}:host([switched]:hover) .track{background-color:var(--calcite-switch-switched-hover-track-background);border-color:var(--calcite-switch-switched-hover-track-border)}:host([switched]:hover) .handle{border-color:var(--calcite-switch-switched-hover-handle-border);box-shadow:inset 0 0 0 1px var(--calcite-switch-switched-hover-handle-border)}:host([dir=rtl]){margin-right:0;margin-left:0.5em}:host([dir=rtl]) .handle{left:auto;right:-1px}:host([dir=rtl][switched]) .handle{right:auto;left:-1px}:host([dir=rtl][switched]:active) .handle,:host([dir=rtl][switched]:focus) .handle{right:auto;left:-1px}";

const CalciteSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 7);
    /** True if the switch is disabled */
    this.disabled = false;
    /** The name of the checkbox input */
    this.name = "";
    /** The scale of the switch */
    this.scale = "m";
    /** True if the switch is initially on */
    this.switched = false;
    /** The value of the checkbox input */
    this.value = "";
    this.syncThisToProxyInput = () => {
      this.switched = this.inputProxy.hasAttribute("checked");
      this.name = this.inputProxy.name;
      this.value = this.inputProxy.value;
    };
    this.syncProxyInputToThis = () => {
      this.switched
        ? this.inputProxy.setAttribute("checked", "")
        : this.inputProxy.removeAttribute("checked");
      this.inputProxy.setAttribute("name", this.name);
      this.inputProxy.setAttribute("value", this.value);
    };
  }
  handleLabelFocus(e) {
    if (!this.disabled &&
      !this.el.contains(e.detail.interactedEl) &&
      hasLabel(e.detail.labelEl, this.el)) {
      this.el.focus();
    }
    else
      return;
  }
  onClick(e) {
    // prevent duplicate click events that occur
    // when the component is wrapped in a label and checkbox is clicked
    if ((!this.disabled && this.el.closest("label") && e.target === this.inputProxy) ||
      (!this.el.closest("label") && e.target === this.el)) {
      this.updateSwitch(e);
    }
  }
  keyDownHandler(e) {
    const key = getKey(e.key);
    if (!this.disabled && (key === " " || key === "Enter")) {
      this.updateSwitch(e);
    }
  }
  switchWatcher() {
    this.switched
      ? this.inputProxy.setAttribute("checked", "")
      : this.inputProxy.removeAttribute("checked");
  }
  connectedCallback() {
    this.setupProxyInput();
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  componentWillRender() {
    this.syncProxyInputToThis();
  }
  render() {
    const dir = getElementDir(this.el);
    return (h(Host, { "aria-checked": this.switched.toString(), dir: dir, tabIndex: this.disabled ? -1 : this.tabIndex }, h("div", { class: "track" }, h("div", { class: "handle" }))));
  }
  get tabIndex() {
    const hasTabIndex = this.el.hasAttribute("tabindex");
    if (hasTabIndex) {
      return Number(this.el.getAttribute("tabindex"));
    }
    return 0;
  }
  setupProxyInput() {
    // check for a proxy input
    this.inputProxy = this.el.querySelector("input");
    // if the user didn't pass a proxy input create one for them
    if (!this.inputProxy) {
      this.inputProxy = document.createElement("input");
      this.inputProxy.type = "checkbox";
      this.inputProxy.disabled = this.disabled;
      this.syncProxyInputToThis();
      this.el.appendChild(this.inputProxy);
    }
    this.syncThisToProxyInput();
    {
      this.observer = new MutationObserver(this.syncThisToProxyInput);
      this.observer.observe(this.inputProxy, { attributes: true });
    }
  }
  updateSwitch(e) {
    e.preventDefault();
    this.switched = !this.switched;
    this.calciteSwitchChange.emit({
      switched: this.switched
    });
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "switched": ["switchWatcher"]
  }; }
};
CalciteSwitch.style = calciteSwitchCss;

export { CalciteSwitch as calcite_switch };
