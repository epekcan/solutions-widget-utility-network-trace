import { r as registerInstance, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir, d as getSlotted } from './dom-558ef00c.js';
import { C as CSS_UTILITY } from './resources-c23b068d.js';
import { C as CalciteHeading } from './CalciteHeading-6f7131cd.js';

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
    registerInstance(this, hostRef);
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
    const rtl = getElementDir(el) === "rtl";
    const hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
    const sectionClasses = {
      [CSS.container]: true,
      [CSS.indented]: hasParentItem,
      [CSS_UTILITY.rtl]: rtl
    };
    const title = groupTitle;
    return (h(Host, null, title ? (h(CalciteHeading, { class: CSS.heading, level: headingLevel }, title)) : null, h("slot", { name: SLOTS.parentItem }), h("section", { class: sectionClasses }, h("slot", null))));
  }
  get el() { return getElement(this); }
};
CalcitePickListGroup.style = calcitePickListGroupCss;

export { CalcitePickListGroup as calcite_pick_list_group };
