'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const utils = require('./utils-1de41822.js');
const Color = require('color');
const resources = require('./resources-30e186db.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const Color__default = /*#__PURE__*/_interopDefaultLegacy(Color);

const CSS = {
  container: "container",
  preview: "preview",
  input: "input"
};

const calciteColorHexInputCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}.container{width:100%;display:-ms-inline-grid;display:inline-grid;-ms-grid-columns:1fr auto;grid-template-columns:1fr auto;align-items:center}.preview{-ms-grid-column:2;-ms-grid-column-span:1;grid-column:2/3;display:flex;align-items:center;pointer-events:none;margin:0 6px;z-index:1}.preview,.input{-ms-grid-row:1;grid-row:1}.input{-ms-grid-column:1;-ms-grid-column-span:2;grid-column:1/3;text-transform:uppercase;width:100%}";

const DEFAULT_COLOR = Color__default['default']();
const CalciteColorHexInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteColorHexInputChange = index.createEvent(this, "calciteColorHexInputChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * Label used for the hex input.
     */
    this.intlHex = resources.TEXT.hex;
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
    this.value = utils.normalizeHex(DEFAULT_COLOR.hex());
    this.onCalciteInputBlur = (event) => {
      const node = event.currentTarget;
      const hex = `#${node.value}`;
      if (utils.isValidHex(hex) && utils.isLonghandHex(hex)) {
        return;
      }
      // manipulating DOM directly since rerender doesn't update input value
      node.value = this.formatForInternalInput(utils.rgbToHex(this.internalColor.object()));
    };
    this.onInputChange = (event) => {
      const node = event.currentTarget;
      const hex = node.value;
      const color = utils.hexToRGB(`#${hex}`);
      if (!color) {
        return;
      }
      this.value = utils.normalizeHex(hex);
      this.calciteColorHexInputChange.emit();
    };
    this.onInputKeyDown = (event) => {
      const { inputNode } = this;
      const { key, altKey, ctrlKey, metaKey } = event;
      const withModifiers = altKey || ctrlKey || metaKey;
      const exceededHexLength = inputNode.value.length >= 6;
      const hasTextSelection = getSelection().type === "Range";
      if (key.length === 1 &&
        !withModifiers &&
        !hasTextSelection &&
        (!utils.hexChar.test(key) || exceededHexLength)) {
        event.preventDefault();
      }
    };
    /**
     * The last valid/selected color. Used as a fallback if an invalid hex code is entered.
     */
    this.internalColor = DEFAULT_COLOR;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    const normalized = utils.normalizeHex(this.value);
    if (utils.isValidHex(normalized)) {
      this.internalColor = Color__default['default'](normalized);
      this.value = normalized;
    }
  }
  handleValueChange(value, oldValue) {
    const normalized = utils.normalizeHex(value);
    if (utils.isValidHex(normalized)) {
      const changed = normalized !== utils.normalizeHex(this.internalColor.hex());
      this.internalColor = Color__default['default'](normalized);
      this.value = normalized;
      if (changed) {
        this.calciteColorHexInputChange.emit();
      }
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
    const elementDir = dom.getElementDir(el);
    return (index.h("div", { class: CSS.container }, index.h("calcite-input", { "aria-label": intlHex, class: CSS.input, dir: elementDir, onCalciteInputBlur: this.onCalciteInputBlur, onChange: this.onInputChange, onKeyDown: this.onInputKeyDown, prefixText: "#", ref: (node) => (this.inputNode = node), scale: "s", value: hexInputValue }), index.h("calcite-color-swatch", { active: true, class: CSS.preview, color: `#${hexInputValue}`, scale: "s" })));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    dom.focusElement(this.inputNode);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  formatForInternalInput(hex) {
    return hex.replace("#", "");
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["handleValueChange"]
  }; }
};
CalciteColorHexInput.style = calciteColorHexInputCss;

exports.calcite_color_hex_input = CalciteColorHexInput;
