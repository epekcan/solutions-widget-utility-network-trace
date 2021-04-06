'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const key = require('./key-214fea4a.js');

const calciteRadioGroupCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-foreground-1)}:host([layout=vertical]){flex-direction:column;align-items:start;align-self:flex-start}:host([width=full]){width:100%}:host([width=full]) ::slotted(calcite-radio-group-item){flex:1 1 auto}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){justify-content:start}::slotted(calcite-radio-group-item[checked]),::slotted(calcite-radio-group-item:focus){z-index:0}:host([disabled]){opacity:0.4;pointer-events:none}";

const CalciteRadioGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteRadioGroupChange = index.createEvent(this, "calciteRadioGroupChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the appearance style of the radio group, defaults to solid. */
    this.appearance = "solid";
    /** specify the layout of the radio group, defaults to horizontal */
    this.layout = "horizontal";
    /** The scale of the radio group */
    this.scale = "m";
    /** specify the width of the group, defaults to auto */
    this.width = "auto";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.hiddenInput = (() => {
      const input = document.createElement("input");
      input.type = "hidden";
      this.el.appendChild(input);
      return input;
    })();
  }
  handleNameChange(value) {
    this.hiddenInput.name = value;
  }
  handleSelectedItemChange(newItem, oldItem) {
    if (newItem === oldItem) {
      return;
    }
    const items = this.getItems();
    const match = Array.from(items)
      .filter((item) => item === newItem)
      .pop();
    if (match) {
      this.selectItem(match);
      this.calciteRadioGroupChange.emit();
    }
    else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const items = this.getItems();
    const lastChecked = Array.from(items)
      .filter((item) => item.checked)
      .pop();
    if (lastChecked) {
      this.selectItem(lastChecked);
    }
    else if (items[0]) {
      items[0].tabIndex = 0;
    }
    const { hiddenInput, name } = this;
    if (name) {
      hiddenInput.name = name;
    }
    if (lastChecked) {
      hiddenInput.value = lastChecked.value;
    }
  }
  componentDidLoad() {
    this.hasLoaded = true;
  }
  render() {
    return (index.h(index.Host, { role: "radiogroup", tabIndex: this.disabled ? -1 : null }, index.h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleLabelFocus(e) {
    if (dom.hasLabel(e.detail.labelEl, this.el)) {
      this.setFocus();
    }
  }
  handleClick(event) {
    if (event.target.localName === "calcite-radio-group-item") {
      this.selectItem(event.target);
    }
  }
  handleSelected(event) {
    // only fire after initial setup to prevent semi-infinite loops
    if (this.hasLoaded) {
      event.stopPropagation();
      event.preventDefault();
      this.selectItem(event.target);
    }
  }
  handleKeyDown(event) {
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
    const key$1 = key.getKey(event.key);
    const { el, selectedItem } = this;
    if (keys.indexOf(key$1) === -1) {
      return;
    }
    let adjustedKey = key$1;
    if (dom.getElementDir(el) === "rtl") {
      if (key$1 === "ArrowRight") {
        adjustedKey = "ArrowLeft";
      }
      if (key$1 === "ArrowLeft") {
        adjustedKey = "ArrowRight";
      }
    }
    const items = this.getItems();
    let selectedIndex = -1;
    items.forEach((item, index) => {
      if (item === selectedItem) {
        selectedIndex = index;
      }
    });
    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        const previous = selectedIndex < 1 ? items.item(items.length - 1) : items.item(selectedIndex - 1);
        this.selectItem(previous);
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const next = selectedIndex === -1 ? items.item(1) : items.item(selectedIndex + 1) || items.item(0);
        this.selectItem(next);
        return;
      case " ":
        event.preventDefault();
        this.selectItem(event.target);
        return;
      default:
        return;
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Focuses the selected item. If there is no selection, it focuses the first item. */
  async setFocus() {
    var _a;
    (_a = (this.selectedItem || this.getItems()[0])) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getItems() {
    return this.el.querySelectorAll("calcite-radio-group-item");
  }
  selectItem(selected) {
    if (selected === this.selectedItem) {
      return;
    }
    const items = this.getItems();
    let match = null;
    items.forEach((item) => {
      const matches = item.value === selected.value;
      if ((matches && !item.checked) || (!matches && item.checked)) {
        item.checked = matches;
      }
      item.tabIndex = matches ? 0 : -1;
      if (matches) {
        match = item;
      }
    });
    this.selectedItem = match;
    this.syncWithInputProxy(match);
    if ( match) {
      match.focus();
    }
  }
  syncWithInputProxy(item) {
    this.hiddenInput.value = item ? item.value : "";
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "name": ["handleNameChange"],
    "selectedItem": ["handleSelectedItemChange"]
  }; }
};
CalciteRadioGroup.style = calciteRadioGroupCss;

exports.calcite_radio_group = CalciteRadioGroup;
