'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');

const calciteTileSelectCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}.root{background-color:var(--calcite-ui-foreground-1);box-shadow:0 0 0 1px var(--calcite-ui-border-2);box-sizing:border-box;cursor:pointer;display:inline-block;height:100%;max-width:300px;padding:0.75rem;position:relative;transition:150ms ease-in-out;vertical-align:top;z-index:10}:host(:hover) .root{z-index:20;box-shadow:0 0 0 1px var(--calcite-ui-border-1)}:host([checked]) .root{z-index:30;box-shadow:0 0 0 1px var(--calcite-ui-brand)}.root.focused{z-index:30}:host(:not([input-enabled]):hover) .root{box-shadow:0 0 0 1px var(--calcite-ui-brand)}:host(:not([input-enabled])) .root.focused{box-shadow:0 0 0 1px var(--calcite-ui-brand), inset 0 0 0 2px var(--calcite-ui-foreground-1), inset 0 0 0 5px var(--calcite-ui-brand)}:host([width=full]) .root{max-width:none;display:block}:host(:not([input-enabled])) ::slotted(calcite-checkbox),:host(:not([input-enabled])) ::slotted(calcite-radio-button){position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([heading]:not([icon]):not([description])) .root{align-items:center}:host([input-enabled][input-alignment=start][icon][heading][description]) .root,:host([input-enabled][input-alignment=start]:not([icon])[heading]:not([description])) .root{display:inline-grid;grid-gap:0.75rem;grid-template-columns:-webkit-max-content 1fr;grid-template-columns:max-content 1fr}:host([input-enabled][input-alignment=start][icon][heading][description]) ::slotted(calcite-checkbox),:host([input-enabled][input-alignment=start][icon][heading][description]) ::slotted(calcite-radio-button),:host([input-enabled][input-alignment=start]:not([icon])[heading]:not([description])) ::slotted(calcite-checkbox),:host([input-enabled][input-alignment=start]:not([icon])[heading]:not([description])) ::slotted(calcite-radio-button){order:0}:host([input-enabled][input-alignment=start][icon][heading][description]) calcite-tile,:host([input-enabled][input-alignment=start]:not([icon])[heading]:not([description])) calcite-tile{order:1}:host([input-enabled][input-alignment=start][icon][heading]:not([description])) ::slotted(calcite-checkbox),:host([input-enabled][input-alignment=start][icon][heading]:not([description])) ::slotted(calcite-radio-button){position:absolute;top:0.75rem;left:0.75rem}:host([dir=rtl][input-enabled][input-alignment=start][icon][heading]:not([description])) ::slotted(calcite-checkbox),:host([dir=rtl][input-enabled][input-alignment=start][icon][heading]:not([description])) ::slotted(calcite-radio-button){right:0.75rem;left:unset}:host([input-enabled][input-alignment=end][icon][heading]) ::slotted(calcite-checkbox),:host([input-enabled][input-alignment=end][icon][heading]) ::slotted(calcite-radio-button){position:absolute;top:0.75rem;right:0.75rem}:host([dir=rtl][input-enabled][input-alignment=end][icon][heading]) ::slotted(calcite-checkbox),:host([dir=rtl][input-enabled][input-alignment=end][icon][heading]) ::slotted(calcite-radio-button){right:unset;left:0.75rem}:host([input-enabled][input-alignment=end][heading]:not([icon]):not([description])) .root{display:inline-grid;grid-gap:0.75rem;grid-template-columns:-webkit-max-content 1fr;grid-template-columns:max-content 1fr}:host([input-enabled][input-alignment=end][heading]:not([icon]):not([description])) ::slotted(calcite-checkbox),:host([input-enabled][input-alignment=end][heading]:not([icon]):not([description])) ::slotted(calcite-radio-button){justify-self:flex-end}:host([hidden]){display:none}:host([disabled]){opacity:0.5;pointer-events:none}";

const CalciteTileSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the tile select. */
    this.checked = false;
    /** The disabled state of the tile select. */
    this.disabled = false;
    /** The hidden state of the tile select. */
    this.hidden = false;
    /** The name of the tile select.  This name will appear in form submissions as either a radio or checkbox identifier based on the `type` property. */
    this.name = "";
    /** Display an interactive radio or checkbox. */
    this.inputEnabled = false;
    /** The side of the tile that the radio or checkbox appears on when inputEnabled is true. */
    this.inputAlignment = "start";
    /** The theme of the tile select. */
    this.theme = "light";
    /** The selection mode of the tile select: radio (single) or checkbox (multiple). */
    this.type = "radio";
    /** specify the width of the tile, defaults to auto */
    this.width = "auto";
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    /** The focused state of the tile-select. */
    this.focused = false;
  }
  checkedChanged(newChecked) {
    this.input.checked = newChecked;
  }
  nameChanged(newName) {
    this.input.name = newName;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    this.input.setFocus();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteCheckboxChangeEvent(event) {
    const checkbox = event.target;
    if (checkbox === this.input) {
      this.checked = checkbox.checked;
    }
  }
  calciteCheckboxFocusedChangeEvent(event) {
    const checkbox = event.target;
    if (checkbox === this.input) {
      this.focused = event.detail;
    }
  }
  calciteRadioButtonCheckedChangeEvent(event) {
    const radioButton = event.target;
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
  }
  calciteRadioButtonFocusedChangeEvent(event) {
    const radioButton = event.target;
    if (radioButton === this.input) {
      this.focused = radioButton.focused;
    }
  }
  click(event) {
    const target = event.target;
    const targets = ["calcite-tile", "calcite-tile-select"];
    if (targets.includes(target.localName)) {
      this.input.click();
    }
  }
  mouseenter() {
    if (this.input.localName === "calcite-radio-button") {
      this.input.hovered = true;
    }
    if (this.input.localName === "calcite-checkbox") {
      this.input.hovered = true;
    }
  }
  mouseleave() {
    if (this.input.localName === "calcite-radio-button") {
      this.input.hovered = false;
    }
    if (this.input.localName === "calcite-checkbox") {
      this.input.hovered = false;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.renderInput();
  }
  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderInput() {
    this.input = document.createElement(this.type === "radio" ? "calcite-radio-button" : "calcite-checkbox");
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.hidden = this.hidden;
    this.input.id = this.el.id;
    if (this.name) {
      this.input.name = this.name;
    }
    this.input.theme = this.theme;
    if (this.value) {
      this.input.value = this.value;
    }
    this.el.insertAdjacentElement("beforeend", this.input);
  }
  render() {
    const dir = dom.getElementDir(this.el);
    return (index.h(index.Host, { dir: dir }, index.h("div", { class: { focused: this.focused, root: true } }, index.h("calcite-tile", { active: this.checked, description: this.description, embed: true, heading: this.heading, icon: this.icon }), index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"],
    "name": ["nameChanged"]
  }; }
};
CalciteTileSelect.style = calciteTileSelectCss;

exports.calcite_tile_select = CalciteTileSelect;
