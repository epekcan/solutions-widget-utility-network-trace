import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir, b as getElementProp } from './dom-558ef00c.js';

const calciteDropdownGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){font-size:var(--calcite-font-size--2)}:host([scale=s]) .dropdown-title{padding-top:0.75rem;padding-bottom:0.75rem;margin-top:0;margin-left:0.75rem;margin-right:0.75rem}:host([scale=m]){font-size:var(--calcite-font-size--1)}:host([scale=m]) .dropdown-title{padding-top:1rem;padding-bottom:1rem;margin-top:0;margin-left:1rem;margin-right:1rem}:host([scale=l]){font-size:var(--calcite-font-size-1)}:host([scale=l]) .dropdown-title{padding-top:1.25rem;padding-bottom:1.25rem;margin-top:0;margin-left:1.25rem;margin-right:1.25rem}.dropdown-title{display:block;margin-bottom:-1px;border-bottom:1px solid var(--calcite-ui-border-3);color:var(--calcite-ui-text-2);font-weight:600;word-wrap:break-word;cursor:default}.dropdown-separator{display:block;height:1px;background-color:var(--calcite-ui-border-3)}";

const CalciteDropdownGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDropdownGroupRegister = createEvent(this, "calciteDropdownGroupRegister", 7);
    this.calciteDropdownItemChange = createEvent(this, "calciteDropdownItemChange", 7);
    /** specify the selection mode - multi (allow any number of (or no) active items), single (allow and require one active item),
     none (no active items), defaults to single */
    this.selectionMode = "single";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setDropdownTitleRef = (node) => {
      this.titleEl = node;
    };
    this.setDropdownSeparatorRef = (node) => {
      this.separatorEl = node;
    };
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** created list of dropdown items */
    this.items = [];
    this.separatorEl = null;
    this.titleEl = null;
    this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map((a) => a.item);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.groupPosition = this.getGroupPosition();
  }
  componentDidLoad() {
    this.items = this.sortItems(this.items);
    this.calciteDropdownGroupRegister.emit({
      items: this.items,
      position: this.groupPosition,
      group: this.el,
      titleEl: this.titleEl,
      separatorEl: this.separatorEl
    });
  }
  render() {
    const dir = getElementDir(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const groupTitle = this.groupTitle ? (h("span", { "aria-hidden": "true", class: "dropdown-title", ref: this.setDropdownTitleRef }, this.groupTitle)) : null;
    const dropdownSeparator = this.groupPosition > 0 ? (h("div", { class: "dropdown-separator", ref: this.setDropdownSeparatorRef, role: "separator" })) : null;
    return (h(Host, { dir: dir, role: "menu", scale: scale, title: this.groupTitle }, dropdownSeparator, groupTitle, h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  registerCalciteDropdownItem(event) {
    const item = event.target;
    if (this.selectionMode === "none") {
      item.active = false;
    }
    this.items.push({
      item,
      position: event.detail.position
    });
    event.stopPropagation();
  }
  updateActiveItemOnChange(event) {
    this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
    this.calciteDropdownItemChange.emit({
      requestedDropdownGroup: this.requestedDropdownGroup,
      requestedDropdownItem: this.requestedDropdownItem
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getGroupPosition() {
    return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
  }
  get el() { return getElement(this); }
};
CalciteDropdownGroup.style = calciteDropdownGroupCss;

export { CalciteDropdownGroup as calcite_dropdown_group };
