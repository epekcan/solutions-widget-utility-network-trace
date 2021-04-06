import { r as registerInstance, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { d as getSlotted } from './dom-558ef00c.js';

const SLOTS = {
  menuActions: "menu-actions"
};

const calciteActionGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex-direction:column;padding:var(--calcite-spacing-half) 0}:host(:first-child){padding-top:0}::slotted(calcite-action){display:flex;width:100%}";

const CalciteActionGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Opens the action menu.
     */
    this.menuOpen = false;
  }
  expandedHandler() {
    this.menuOpen = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderMenu() {
    const { el, expanded, intlOptions, menuOpen } = this;
    const hasMenuItems = getSlotted(el, SLOTS.menuActions);
    return hasMenuItems ? (h("calcite-action-menu", { expanded: expanded, flipPlacements: ["left", "right"], intlOptions: intlOptions, open: menuOpen, placement: "leading-start" }, h("slot", { name: SLOTS.menuActions }))) : null;
  }
  render() {
    return (h(Host, null, h("slot", null), this.renderMenu()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"]
  }; }
};
CalciteActionGroup.style = calciteActionGroupCss;

export { CalciteActionGroup as calcite_action_group };
