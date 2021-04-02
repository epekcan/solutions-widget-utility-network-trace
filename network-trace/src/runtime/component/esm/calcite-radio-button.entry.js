import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir } from './dom-b2b7d90d.js';
import { g as guid } from './guid-9ad8042d.js';

const calciteRadioButtonCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{cursor:pointer;display:inline-block}:host .radio{border-radius:100%;box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);cursor:pointer;transition:all 0.15s ease-in-out}:host([labeled]){--calcite-label-margin-bottom:0;align-items:center;display:inline-flex;gap:8px}:host([hovered]) .radio,:host(:not([checked])[focused]) .radio{box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1)}:host([disabled]){cursor:default}:host([disabled]) .radio{cursor:default;opacity:0.4}:host([disabled])>::slotted(calcite-label){cursor:default}:host([hovered][disabled]) .radio{box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1)}:host([scale=s]) .radio{height:12px;min-width:12px;max-width:12px}:host([scale=s][labeled]){line-height:1.33;margin-bottom:8px;margin-right:12px}@supports not (display: grid){:host([scale=s][labeled]) .radio{height:12px;margin-right:8px}}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=s][focused][checked]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=m]) .radio{height:14px;min-width:14px;max-width:14px}:host([scale=m][labeled]){line-height:1.15;margin-bottom:8px;margin-right:16px}@supports not (display: grid){:host([scale=m][labeled]) .radio{margin-right:8px}}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1)}:host([scale=m][focused][checked]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=l]) .radio{height:20px;min-width:20px;max-width:20px}:host([scale=l][labeled]){gap:12px;line-height:1.2;margin-bottom:10px;margin-right:20px}@supports not (display: grid){:host([scale=l][labeled]) .radio{margin-right:12px}}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1)}:host([scale=l][focused][checked]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([hidden]){display:none}";

const CalciteRadioButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteRadioButtonChange = createEvent(this, "calciteRadioButtonChange", 7);
    this.calciteRadioButtonCheckedChange = createEvent(this, "calciteRadioButtonCheckedChange", 7);
    this.calciteRadioButtonFocusedChange = createEvent(this, "calciteRadioButtonFocusedChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the radio button. */
    this.checked = false;
    /** The disabled state of the radio button. */
    this.disabled = false;
    /** The focused state of the radio button. */
    this.focused = false;
    /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
    this.hidden = false;
    /** The hovered state of the radio button. */
    this.hovered = false;
    /** Requires that a value is selected for the radio button group before the parent form will submit. */
    this.required = false;
    /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
    this.scale = "m";
    /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
    this.theme = "light";
    this.formResetHandler = () => {
      this.checked = this.initialChecked;
      this.initialChecked && this.input.setAttribute("checked", "");
    };
  }
  checkedChanged(newChecked) {
    if (newChecked) {
      this.uncheckOtherRadioButtonsInGroup();
    }
    this.input.checked = newChecked;
    this.calciteRadioButtonCheckedChange.emit(newChecked);
  }
  disabledChanged(disabled) {
    this.input.disabled = disabled;
  }
  focusedChanged(focused) {
    if (focused && !this.el.hasAttribute("hidden")) {
      this.input.focus();
    }
    else {
      this.input.blur();
    }
  }
  hiddenChanged(newHidden) {
    this.input.hidden = newHidden;
  }
  nameChanged(newName) {
    this.input.name = newName;
    this.checkLastRadioButton();
    const currentValue = document.querySelector(`input[name="${this.name}"]:checked`);
    if (!(currentValue === null || currentValue === void 0 ? void 0 : currentValue.value)) {
      this.uncheckAllRadioButtonsInGroup();
    }
  }
  requiredChanged(required) {
    this.input.required = required;
  }
  /** @internal */
  async emitCheckedChange() {
    this.calciteRadioButtonCheckedChange.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  checkLastRadioButton() {
    const radioButtons = Array.from(document.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
    const checkedRadioButtons = radioButtons.filter((radioButton) => radioButton.checked);
    if ((checkedRadioButtons === null || checkedRadioButtons === void 0 ? void 0 : checkedRadioButtons.length) > 1) {
      const lastCheckedRadioButton = checkedRadioButtons[checkedRadioButtons.length - 1];
      checkedRadioButtons
        .filter((checkedRadioButton) => checkedRadioButton !== lastCheckedRadioButton)
        .forEach((checkedRadioButton) => {
        checkedRadioButton.checked = false;
        checkedRadioButton.emitCheckedChange();
      });
    }
  }
  setupTitleAttributeObserver() {
    this.titleAttributeObserver = new MutationObserver(() => {
      this.input.title = this.el.getAttribute("title");
    });
    this.titleAttributeObserver.observe(this.el, {
      attributes: true,
      attributeFilter: ["title"]
    });
  }
  uncheckAllRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(document.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }
  uncheckOtherRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(document.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name && radioButton.guid !== this.guid);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  check(event) {
    // Prevent parent label from clicking the first radio when calcite-radio-button is clicked
    if (this.el.closest("label") && event.target === this.el) {
      event.preventDefault();
    }
    if (!this.disabled && !this.hidden) {
      this.uncheckOtherRadioButtonsInGroup();
      this.checked = true;
      this.focused = true;
      this.calciteRadioButtonChange.emit();
    }
  }
  mouseenter() {
    this.hovered = true;
  }
  mouseleave() {
    this.hovered = false;
  }
  onInputBlur() {
    this.focused = false;
    this.calciteRadioButtonFocusedChange.emit();
  }
  onInputFocus() {
    this.focused = true;
    this.calciteRadioButtonFocusedChange.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.guid = this.el.id || `calcite-radio-button-${guid()}`;
    this.initialChecked = this.checked;
    this.renderLabel();
    this.renderInput();
    this.setupTitleAttributeObserver();
    if (this.name) {
      this.checkLastRadioButton();
    }
    const form = this.el.closest("form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
  }
  componentDidLoad() {
    if (this.focused) {
      this.input.focus();
    }
  }
  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
    this.titleAttributeObserver.disconnect();
    const form = this.el.closest("form");
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderInput() {
    // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
    // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
    this.input = document.createElement("input");
    this.input.checked = this.checked;
    this.checked && this.input.setAttribute("checked", "");
    this.input.setAttribute("aria-label", this.value || this.guid);
    this.input.disabled = this.disabled;
    this.input.hidden = this.hidden;
    this.input.id = `${this.guid}-input`;
    if (this.name) {
      this.input.name = this.name;
    }
    this.input.onblur = this.onInputBlur.bind(this);
    this.input.onfocus = this.onInputFocus.bind(this);
    // We're using option #3 explained here to hide the radio input without compromising accessibility
    // @link https://blog.bitsrc.io/customise-radio-buttons-without-compromising-accessibility-b03061b5ba93
    // The only difference is we're using "fixed" instead of "absolute" positioning thanks to this StackOverflow:
    // @link https://stackoverflow.com/questions/24299567/radio-button-causes-browser-to-jump-to-the-top/24323870
    this.input.style.opacity = "0";
    this.input.style.position = "fixed";
    this.input.style.zIndex = "-1";
    if (this.value) {
      this.input.value = this.value;
    }
    this.input.required = this.required;
    if (this.el.getAttribute("title")) {
      this.input.title = this.el.getAttribute("title");
    }
    else if (this.name && this.value) {
      this.input.title = `Radio button with name of ${this.name} and value of ${this.value}`;
    }
    else {
      this.input.title = this.guid;
    }
    this.input.type = "radio";
    this.el.insertAdjacentElement("beforeend", this.input);
  }
  renderLabel() {
    // Rendering a calcite-label outside of Shadow DOM for accessibility and form participation
    if (this.el.textContent) {
      const textNodes = Array.from(this.el.childNodes).filter((childNode) => childNode.nodeName === "#text");
      const labelText = textNodes.reduce((labelText, textNode) => (labelText += textNode.textContent), "");
      while (this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
      }
      this.label = document.createElement("calcite-label");
      this.label.setAttribute("dir", getElementDir(this.el));
      this.disabled && this.label.setAttribute("disabled", "");
      this.label.setAttribute("disable-spacing", "");
      this.label.setAttribute("scale", this.scale);
      this.label.appendChild(document.createTextNode(labelText));
      this.el.appendChild(this.label);
    }
  }
  render() {
    return (h(Host, { "aria-checked": this.checked.toString(), "aria-disabled": this.disabled.toString(), labeled: this.el.textContent ? true : false }, h("div", { class: "radio" }), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"],
    "disabled": ["disabledChanged"],
    "focused": ["focusedChanged"],
    "hidden": ["hiddenChanged"],
    "name": ["nameChanged"],
    "required": ["requiredChanged"]
  }; }
};
CalciteRadioButton.style = calciteRadioButtonCss;

export { CalciteRadioButton as calcite_radio_button };
