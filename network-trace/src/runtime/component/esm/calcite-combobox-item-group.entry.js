import { r as registerInstance, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { b as getElementProp, g as getElementDir } from './dom-558ef00c.js';
import { g as guid } from './guid-9ad8042d.js';
import { f as getAncestors, i as getDepth } from './utils-22cf70a4.js';

const CSS = {
  list: "list",
  label: "label",
  title: "title"
};

const calciteComboboxItemGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent-1:0.5rem;--calcite-combobox-item-spacing-indent-2:1rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent-1:0.75rem;--calcite-combobox-item-spacing-indent-2:1.5rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1.25rem;--calcite-combobox-item-spacing-unit-s:1rem;--calcite-combobox-item-spacing-indent-1:1rem;--calcite-combobox-item-spacing-indent-2:2rem}:host{--calcite-combobox-item-indent-start-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-end-1:unset;--calcite-combobox-item-indent-start-2:var(--calcite-combobox-item-spacing-indent-2);--calcite-combobox-item-indent-end-2:unset}:host([dir=rtl]){--calcite-combobox-item-indent-start-1:unset;--calcite-combobox-item-indent-end-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-start-2:unset;--calcite-combobox-item-indent-end-2:var(--calcite-combobox-item-spacing-indent-2)}:host,.list{display:flex;flex-direction:column;margin:0;padding:0;outline:2px solid transparent;outline-offset:2px}.label{box-sizing:border-box;width:100%;max-width:100%;min-width:0;color:var(--calcite-ui-text-3);display:flex}.label--indent-1{padding-left:var(--calcite-combobox-item-indent-start-1);padding-right:var(--calcite-combobox-item-indent-end-1)}.label--indent-2{padding-left:var(--calcite-combobox-item-indent-start-2);padding-right:var(--calcite-combobox-item-indent-end-2)}.title{border:0 solid;display:block;flex:1 1 0%;border-bottom-color:var(--calcite-ui-border-3);border-bottom-width:1px;margin-bottom:-1px;color:var(--calcite-ui-text-2);font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;padding:var(--calcite-combobox-item-spacing-unit-s) 0;margin-left:var(--calcite-combobox-item-spacing-unit-s);margin-right:var(--calcite-combobox-item-spacing-unit-s)}";

const CalciteComboboxItemGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guid = guid();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    this.ancestors = getAncestors(this.el);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { el } = this;
    const scale = getElementProp(el, "scale", "m");
    const dir = getElementDir(el);
    const indent = `${CSS.label}--indent-${getDepth(el)}`;
    return (h(Host, { dir: dir, scale: scale }, h("ul", { "aria-labelledby": this.guid, class: CSS.list, role: "group" }, h("li", { class: { [CSS.label]: true, [indent]: true }, id: this.guid, role: "presentation" }, h("span", { class: CSS.title }, this.label)), h("slot", null))));
  }
  get el() { return getElement(this); }
};
CalciteComboboxItemGroup.style = calciteComboboxItemGroupCss;

export { CalciteComboboxItemGroup as calcite_combobox_item_group };
