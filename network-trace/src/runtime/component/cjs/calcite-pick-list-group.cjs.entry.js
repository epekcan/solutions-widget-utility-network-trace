'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const resources = require('./resources-c7d5cc25.js');

const CSS = {
  heading: "heading",
  container: "container",
  indented: "container--indented"
};
const SLOTS = {
  parentItem: "parent-item"
};

const calcitePickListGroupCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{background-color:transparent;display:block;margin-bottom:var(--calcite-spacing-quarter)}:host(:last-child){margin-bottom:0}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-ui-text-weight-demi);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:1.25rem}h2.heading{font-size:1.125rem}h3.heading{font-size:1rem}h4.heading,h5.heading{font-size:0.875rem}h3.heading{font-size:0.875rem;line-height:1.5;color:var(--calcite-ui-text-3);margin:var(--calcite-spacing-half) var(--calcite-spacing)}.container--indented{margin-left:var(--calcite-spacing-plus-half)}.calcite--rtl.container--indented{margin-left:0;margin-right:var(--calcite-spacing-plus-half)}";

const CalcitePickListGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { el, groupTitle } = this;
    const rtl = dom.getElementDir(el) === "rtl";
    const hasParentItem = dom.getSlotted(el, SLOTS.parentItem) !== null;
    const sectionClasses = {
      [CSS.container]: true,
      [CSS.indented]: hasParentItem,
      [resources.CSS_UTILITY.rtl]: rtl
    };
    const title = groupTitle;
    return (index.h(index.Host, null, title ? index.h("h3", { class: CSS.heading }, title) : null, index.h("slot", { name: SLOTS.parentItem }), index.h("section", { class: sectionClasses }, index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
};
CalcitePickListGroup.style = calcitePickListGroupCss;

exports.calcite_pick_list_group = CalcitePickListGroup;
