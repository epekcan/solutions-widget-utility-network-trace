import { r as registerInstance, c as createEvent, h, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir, f as focusElement } from './dom-558ef00c.js';
import { g as getKey } from './key-6f340c70.js';
import { n as normalizeHex, i as isValidHex, a as isLonghandHex, r as rgbToHex, h as hexToRGB, b as hexChar } from './utils-62431832.js';
import { c as color } from './index-5c2e0d3a.js';
import { T as TEXT } from './resources-3ce03a54.js';

const CSS = {
  container: "container",
  preview: "preview",
  input: "input"
};

const calciteColorPickerHexInputCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}.container{width:100%;display:-ms-inline-grid;display:inline-grid;-ms-grid-columns:1fr auto;grid-template-columns:1fr auto;align-items:center}.preview{-ms-grid-column:2;-ms-grid-column-span:1;grid-column:2/3;display:flex;align-items:center;pointer-events:none;margin:0 6px;z-index:1}.preview,.input{-ms-grid-row:1;grid-row:1}.input{-ms-grid-column:1;-ms-grid-column-span:2;grid-column:1/3;text-transform:uppercase;width:100%}";

const DEFAULT_COLOR = color();
const CalciteColorPickerHexInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteColorPickerHexInputChange = createEvent(this, "calciteColorPickerHexInputChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When false, empty color (null) will be allowed as a value. Otherwise, a color value is always enforced by the component.
     *
     * When true, clearing the input and blurring will restore the last valid color set. When false, it will set it to empty.
     */
    this.allowEmpty = false;
    /**
     * Label used for the hex input.
     */
    this.intlHex = TEXT.hex;
    /**
     * Label used for the hex input when there is no color selected.
     */
    this.intlNoColor = TEXT.noColor;
    /**
     * The component's scale.
     */
    this.scale = "m";
    /**
     * The component's theme.
     */
    this.theme = "light";
    /**
     * The hex value.
     */
    this.value = normalizeHex(DEFAULT_COLOR.hex());
    this.onCalciteInputBlur = (event) => {
      const node = event.currentTarget;
      const inputValue = node.value;
      const hex = `#${inputValue}`;
      const willClearValue = this.allowEmpty && !inputValue;
      if (willClearValue || (isValidHex(hex) && isLonghandHex(hex))) {
        return;
      }
      // manipulating DOM directly since rerender doesn't update input value
      node.value =
        this.allowEmpty && !this.internalColor
          ? ""
          : this.formatForInternalInput(rgbToHex(this.internalColor.object()));
    };
    this.onInputChange = (event) => {
      const node = event.currentTarget;
      const inputValue = node.value;
      let value;
      if (inputValue) {
        const hex = inputValue;
        const color = hexToRGB(`#${hex}`);
        if (!color) {
          return;
        }
        value = normalizeHex(hex);
      }
      else if (this.allowEmpty) {
        value = null;
      }
      this.value = value;
      this.calciteColorPickerHexInputChange.emit();
    };
    this.onInputKeyDown = (event) => {
      const { altKey, ctrlKey, metaKey, shiftKey } = event;
      const { inputNode, internalColor, value } = this;
      const key = getKey(event.key);
      const nudgeable = value && (key === "ArrowDown" || key === "ArrowUp");
      if (nudgeable) {
        const direction = key === "ArrowUp" ? 1 : -1;
        const bump = shiftKey ? 10 : 1;
        this.value = normalizeHex(this.nudgeRGBChannels(internalColor, bump * direction).hex());
        event.preventDefault();
        return;
      }
      const withModifiers = altKey || ctrlKey || metaKey;
      const exceededHexLength = inputNode.value.length >= 6;
      const hasTextSelection = getSelection().type === "Range";
      if (key.length === 1 &&
        !withModifiers &&
        !hasTextSelection &&
        (!hexChar.test(key) || exceededHexLength)) {
        event.preventDefault();
      }
    };
    /**
     * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
     */
    this.internalColor = DEFAULT_COLOR;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.storeInputRef = (node) => {
      this.inputNode = node;
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const { allowEmpty, value } = this;
    if (value) {
      const normalized = normalizeHex(value);
      if (isValidHex(normalized)) {
        this.internalColor = color(normalized);
        this.value = normalized;
      }
      return;
    }
    if (allowEmpty) {
      this.internalColor = null;
      this.value = null;
    }
  }
  handleValueChange(value, oldValue) {
    if (value) {
      const normalized = normalizeHex(value);
      if (isValidHex(normalized)) {
        const { internalColor } = this;
        const changed = !internalColor || normalized !== normalizeHex(internalColor.hex());
        this.internalColor = color(normalized);
        this.value = normalized;
        if (changed) {
          this.calciteColorPickerHexInputChange.emit();
        }
        return;
      }
    }
    else if (this.allowEmpty) {
      this.internalColor = null;
      this.value = null;
      this.calciteColorPickerHexInputChange.emit();
      return;
    }
    this.value = oldValue;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const { el, intlHex, value } = this;
    const hexInputValue = this.formatForInternalInput(value);
    const elementDir = getElementDir(el);
    return (h("div", { class: CSS.container }, h("calcite-input", { "aria-label": intlHex, class: CSS.input, dir: elementDir, onCalciteInputBlur: this.onCalciteInputBlur, onChange: this.onInputChange, onKeyDown: this.onInputKeyDown, prefixText: "#", ref: this.storeInputRef, scale: "s", value: hexInputValue }), hexInputValue ? (h("calcite-color-picker-swatch", { active: true, class: CSS.preview, color: `#${hexInputValue}`, scale: "s" })) : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.inputNode);
  }
  formatForInternalInput(hex) {
    return hex ? hex.replace("#", "") : "";
  }
  nudgeRGBChannels(color$1, amount) {
    return color.rgb(color$1.array().map((channel) => channel + amount));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["handleValueChange"]
  }; }
};
CalciteColorPickerHexInput.style = calciteColorPickerHexInputCss;

export { CalciteColorPickerHexInput as calcite_color_picker_hex_input };
