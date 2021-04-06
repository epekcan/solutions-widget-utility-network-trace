'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const resources = require('./resources-c7d5cc25.js');
const CalciteHeading = require('./CalciteHeading-1ee0d4c6.js');

const CSS = {
  heading: "heading",
  container: "container",
  indented: "container--indented"
};
const SLOTS = {
  parentItem: "parent-item"
};
const HEADING_LEVEL = 3;

const calcitePickListGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{background-color:transparent;display:block;margin-bottom:0.25rem}:host(:last-child){margin-bottom:0}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}h3.heading{font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-ui-text-3);margin:0.5rem 1rem}.container--indented{margin-left:1.5rem}.calcite--rtl.container--indented{margin-left:0;margin-right:1.5rem}";

const CalcitePickListGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Number at which section headings should start for this component.
     */
    this.headingLevel = HEADING_LEVEL;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { el, groupTitle, headingLevel } = this;
    const rtl = dom.getElementDir(el) === "rtl";
    const hasParentItem = dom.getSlotted(el, SLOTS.parentItem) !== null;
    const sectionClasses = {
      [CSS.container]: true,
      [CSS.indented]: hasParentItem,
      [resources.CSS_UTILITY.rtl]: rtl
    };
    const title = groupTitle;
    return (index.h(index.Host, null, title ? (index.h(CalciteHeading.CalciteHeading, { class: CSS.heading, level: headingLevel }, title)) : null, index.h("slot", { name: SLOTS.parentItem }), index.h("section", { class: sectionClasses }, index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
};
CalcitePickListGroup.style = calcitePickListGroupCss;

exports.calcite_pick_list_group = CalcitePickListGroup;
