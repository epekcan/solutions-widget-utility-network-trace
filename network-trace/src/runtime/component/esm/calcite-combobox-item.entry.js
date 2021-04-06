import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { b as getElementProp, g as getElementDir } from './dom-558ef00c.js';
import { g as guid } from './guid-9ad8042d.js';
import { f as getAncestors, i as getDepth } from './utils-22cf70a4.js';

const CSS = {
  icon: "icon",
  iconActive: "icon--active",
  custom: "icon--custom",
  dot: "icon--dot",
  single: "label--single",
  label: "label",
  active: "label--active",
  selected: "label--selected",
  title: "title",
  textContainer: "text-container"
};

const calciteComboboxItemCss = "@charset \"UTF-8\";@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent-1:0.5rem;--calcite-combobox-item-spacing-indent-2:1rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent-1:0.75rem;--calcite-combobox-item-spacing-indent-2:1.5rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1.25rem;--calcite-combobox-item-spacing-unit-s:1rem;--calcite-combobox-item-spacing-indent-1:1rem;--calcite-combobox-item-spacing-indent-2:2rem}:host{--calcite-combobox-item-indent-start-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-end-1:unset;--calcite-combobox-item-indent-start-2:var(--calcite-combobox-item-spacing-indent-2);--calcite-combobox-item-indent-end-2:unset}:host([dir=rtl]){--calcite-combobox-item-indent-start-1:unset;--calcite-combobox-item-indent-end-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-start-2:unset;--calcite-combobox-item-indent-end-2:var(--calcite-combobox-item-spacing-indent-2)}:host(:focus){box-shadow:none}:host,ul{display:flex;flex-direction:column;margin:0;padding:0;outline:2px solid transparent;outline-offset:2px}.label{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;display:flex;box-sizing:border-box;width:100%;min-width:100%;align-items:center;color:var(--calcite-ui-text-3);cursor:pointer;position:relative;transition:150ms ease-in-out;padding:var(--calcite-combobox-item-spacing-unit-s);text-decoration:none}:host([disabled]) .label{cursor:default}.label--selected{color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium)}.label--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.label:hover,.label:active{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-2);box-shadow:none;text-decoration:none}.title{padding:0 var(--calcite-combobox-item-spacing-unit-s)}.icon{display:inline-flex;opacity:0;transition:150ms ease-in-out;}.icon--indent-1{padding-left:var(--calcite-combobox-item-indent-start-1);padding-right:var(--calcite-combobox-item-indent-end-1)}.icon--indent-2{padding-left:var(--calcite-combobox-item-indent-start-2);padding-right:var(--calcite-combobox-item-indent-end-2)}.icon--custom{margin-top:-1px;color:var(--calcite-ui-text-3)}.icon--active{color:var(--calcite-ui-text-1)}.icon--dot{display:flex;justify-content:flex-end;width:var(--calcite-combobox-item-spacing-unit-l)}.icon--dot:before{content:\"•\"}:host([dir=rtl]) .icon--dot:before{text-align:right}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-ui-brand)}:host(:hover[disabled]) .icon{opacity:1}";

const CalciteComboboxItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteComboboxItemChange = createEvent(this, "calciteComboboxItemChange", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** When true, the item cannot be clicked and is visually muted. */
    this.disabled = false;
    /** Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
    this.selected = false;
    /** True when item is highlighted either from keyboard or mouse hover */
    this.active = false;
    /** Unique identifier, used for accessibility */
    this.guid = guid();
    this.isSelected = this.selected;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.itemClickHandler = (event) => {
      event.preventDefault();
      if (this.disabled) {
        return;
      }
      this.isSelected = !this.isSelected;
      this.calciteComboboxItemChange.emit(this.el);
    };
  }
  selectedWatchHandler(newValue) {
    this.isSelected = newValue;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    this.ancestors = getAncestors(this.el);
    this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Used to toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   */
  async toggleSelected(coerce) {
    if (this.disabled) {
      return;
    }
    this.isSelected = typeof coerce === "boolean" ? coerce : !this.isSelected;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderIcon(scale, isSingle) {
    const { icon, el, disabled, isSelected } = this;
    const level = `${CSS.icon}--indent-${getDepth(el)}`;
    const iconScale = scale !== "l" ? "s" : "m";
    const defaultIcon = isSingle ? "dot" : "check";
    const iconPath = disabled ? "circle-disallowed" : defaultIcon;
    const showDot = isSingle && !icon && !disabled;
    return showDot ? (h("span", { class: {
        [CSS.icon]: true,
        [CSS.dot]: true,
        [level]: true
      } })) : (h("calcite-icon", { class: {
        [CSS.icon]: !icon,
        [CSS.custom]: !!icon,
        [CSS.iconActive]: icon && isSelected,
        [level]: true
      }, icon: icon || iconPath, scale: iconScale }));
  }
  renderChildren() {
    if (!this.hasDefaultSlot) {
      return null;
    }
    return (h("ul", null, h("slot", null)));
  }
  render() {
    const isSingleSelect = getElementProp(this.el, "selection-mode", "multi") === "single";
    const classes = {
      [CSS.label]: true,
      [CSS.selected]: this.isSelected,
      [CSS.active]: this.active,
      [CSS.single]: isSingleSelect
    };
    const scale = getElementProp(this.el, "scale", "m");
    const dir = getElementDir(this.el);
    return (h(Host, { "aria-hidden": true, dir: dir, disabled: this.disabled, scale: scale, tabIndex: -1 }, h("li", { class: classes, id: this.guid, onClick: this.itemClickHandler, ref: (el) => (this.comboboxItemEl = el), tabIndex: -1 }, this.renderIcon(scale, isSingleSelect), h("span", { class: CSS.title }, this.textLabel)), this.renderChildren()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "selected": ["selectedWatchHandler"]
  }; }
};
CalciteComboboxItem.style = calciteComboboxItemCss;

export { CalciteComboboxItem as calcite_combobox_item };
