'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const guid = require('./guid-f05bb751.js');

const calciteRadioButtonCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}.sc-calcite-radio-button:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-radio-button-h{display:none}.sc-calcite-radio-button-h{cursor:pointer;display:inline-block}[labeled].sc-calcite-radio-button-h{--calcite-label-margin-bottom:0;align-items:center;display:inline-flex;gap:8px}[disabled].sc-calcite-radio-button-h{cursor:default}.sc-calcite-radio-button-h[disabled]>.sc-calcite-radio-button-s>calcite-label{cursor:default}[scale=s][labeled].sc-calcite-radio-button-h{line-height:1.33;margin-bottom:8px;margin-right:12px}@supports not (display: grid){[scale=s][labeled].sc-calcite-radio-button-h calcite-radio.sc-calcite-radio-button{margin-right:8px}}[scale=m][labeled].sc-calcite-radio-button-h{line-height:1.15;margin-bottom:8px;margin-right:16px}@supports not (display: grid){[scale=m][labeled].sc-calcite-radio-button-h calcite-radio.sc-calcite-radio-button{margin-right:8px}}[scale=l][labeled].sc-calcite-radio-button-h{gap:12px;line-height:1.2;margin-bottom:10px;margin-right:20px}@supports not (display: grid){[scale=l][labeled].sc-calcite-radio-button-h calcite-radio.sc-calcite-radio-button{margin-right:12px}}[hidden].sc-calcite-radio-button-h{display:none}";

const CalciteRadioButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteRadioButtonChange = index.createEvent(this, "calciteRadioButtonChange", 7);
    this.calciteRadioButtonCheckedChange = index.createEvent(this, "calciteRadioButtonCheckedChange", 7);
    this.calciteRadioButtonFocusedChange = index.createEvent(this, "calciteRadioButtonFocusedChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the radio button. */
    this.checked = false;
    /** The disabled state of the radio button. */
    this.disabled = false;
    /**
     * The focused state of the radio button.
     * @private
     */
    this.focused = false;
    /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
    this.hidden = false;
    /**
     * The hovered state of the radio button.
     * @private
     */
    this.hovered = false;
    /** Requires that a value is selected for the radio button group before the parent form will submit. */
    this.required = false;
    /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
    this.scale = "m";
    /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code>calcite-radio-button-group</code>. */
    this.theme = "light";
    this.setInputEl = (el) => {
      this.inputEl = el;
    };
    this.formResetHandler = () => {
      var _a;
      this.checked = this.initialChecked;
      this.initialChecked && ((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.setAttribute("checked", ""));
    };
    this.hideInputEl = () => {
      this.inputEl.style.setProperty("margin", "0", "important");
      this.inputEl.style.setProperty("opacity", "0", "important");
      this.inputEl.style.setProperty("padding", "0", "important");
      this.inputEl.style.setProperty("position", "absolute", "important");
      this.inputEl.style.setProperty("transform", "none", "important");
      this.inputEl.style.setProperty("z-index", "-1", "important");
    };
    this.onInputBlur = () => {
      this.focused = false;
      this.calciteRadioButtonFocusedChange.emit();
    };
    this.onInputFocus = () => {
      this.focused = true;
      this.calciteRadioButtonFocusedChange.emit();
    };
  }
  checkedChanged(newChecked) {
    if (newChecked) {
      this.uncheckOtherRadioButtonsInGroup();
    }
    if (this.inputEl) {
      this.inputEl.checked = newChecked;
    }
    this.calciteRadioButtonCheckedChange.emit(newChecked);
  }
  disabledChanged(disabled) {
    this.inputEl.disabled = disabled;
  }
  focusedChanged(focused) {
    if (!this.inputEl)
      return;
    if (focused && !this.el.hasAttribute("hidden")) {
      this.inputEl.focus();
    }
    else {
      this.inputEl.blur();
    }
  }
  hiddenChanged(newHidden) {
    this.inputEl.hidden = newHidden;
  }
  nameChanged(newName) {
    if (this.name === newName) {
      return;
    }
    if (this.inputEl) {
      this.inputEl.name = newName;
    }
    this.checkLastRadioButton();
    const currentValue = this.rootNode.querySelector(`input[name="${this.name}"]:checked`);
    if (!(currentValue === null || currentValue === void 0 ? void 0 : currentValue.value)) {
      this.uncheckAllRadioButtonsInGroup();
    }
  }
  requiredChanged(required) {
    this.inputEl.required = required;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    dom.focusElement(this.inputEl);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  checkLastRadioButton() {
    const radioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
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
  /** @internal */
  async emitCheckedChange() {
    this.calciteRadioButtonCheckedChange.emit();
  }
  uncheckAllRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }
  uncheckOtherRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name && radioButton.guid !== this.guid);
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
    if (this.el.closest("label") && (event.target === this.el || event.target === this.radio)) {
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
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.rootNode = this.el.getRootNode();
    this.guid = this.el.id || `calcite-radio-button-${guid.guid()}`;
    this.initialChecked = this.checked;
    if (this.name) {
      this.checkLastRadioButton();
    }
    const form = this.el.closest("form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
  }
  componentDidLoad() {
    this.hideInputEl();
    if (this.focused) {
      this.inputEl.focus();
    }
  }
  disconnectedCallback() {
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
  renderLabel() {
    if (this.el.textContent) {
      return (index.h("calcite-label", { dir: dom.getElementDir(this.el), "disable-spacing": true, disabled: this.disabled, for: `${this.guid}-input`, layout: "inline", scale: this.scale }, index.h("slot", null)));
    }
    return index.h("slot", null);
  }
  render() {
    return (index.h(index.Host, { labeled: !!this.el.textContent }, index.h("input", { "aria-label": this.value || this.guid, checked: this.checked, disabled: this.disabled, hidden: this.hidden, id: `${this.guid}-input`, name: this.name, onBlur: this.onInputBlur, onFocus: this.onInputFocus, ref: this.setInputEl, required: this.required, type: "radio", value: this.value }), index.h("calcite-radio", { checked: this.checked, disabled: this.disabled, focused: this.focused, hidden: this.hidden, hovered: this.hovered, ref: (el) => (this.radio = el), scale: this.scale, theme: this.theme }), this.renderLabel()));
  }
  get el() { return index.getElement(this); }
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

exports.calcite_radio_button = CalciteRadioButton;
