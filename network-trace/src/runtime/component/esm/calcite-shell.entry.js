import { r as registerInstance, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { d as getSlotted } from './dom-558ef00c.js';

const CSS = {
  main: "main",
  mainReversed: "main--reversed",
  content: "content",
  contentBehind: "content--behind",
  footer: "footer"
};
const SLOTS = {
  centerRow: "center-row",
  primaryPanel: "primary-panel",
  contextualPanel: "contextual-panel",
  header: "shell-header",
  footer: "shell-footer"
};

const calciteShellCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{width:100%;height:100%;position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{height:100%;width:100%;flex:1 1 auto;display:flex;flex-direction:row;position:relative;border-top:1px solid var(--calcite-ui-border-3);border-bottom:1px solid var(--calcite-ui-border-3);justify-content:space-between;overflow:hidden}.main--reversed{flex-direction:row-reverse}.content{border-left:1px solid var(--calcite-ui-border-3);border-right:1px solid var(--calcite-ui-border-3);height:100%;overflow:auto;width:100%;display:flex;flex-flow:column nowrap}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){align-self:stretch;flex:1 1 auto;max-height:unset}.content--behind{border:0;display:initial;position:absolute;left:0;right:0;bottom:0;top:0;z-index:0}::slotted(calcite-shell-center-row){width:unset}::slotted(.header .heading){font-weight:var(--calcite-font-weight-normal);font-size:0.875rem;line-height:1.5}::slotted(calcite-shell-panel),::slotted(calcite-shell-center-row){position:relative;z-index:1}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])){border-left:1px solid var(--calcite-ui-border-3);border-right:1px solid var(--calcite-ui-border-3)}::slotted(calcite-tip-manager){border-radius:0.25rem;box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);position:absolute;animation:in-up 300ms ease-in-out;bottom:var(--calcite-spacing-plus-half);box-sizing:border-box;left:var(--calcite-shell-tip-spacing);right:var(--calcite-shell-tip-spacing);z-index:2}";

const CalciteShell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const hasHeader = !!getSlotted(this.el, SLOTS.header);
    return hasHeader ? h("slot", { name: SLOTS.header }) : null;
  }
  renderContent() {
    return !!this.contentBehind ? this.renderContentBehind() : this.renderContentInline();
  }
  renderContentBehind() {
    return (h("div", { class: {
        [CSS.content]: true,
        [CSS.contentBehind]: !!this.contentBehind
      } }, h("slot", null)));
  }
  renderContentInline() {
    return (h("div", { class: CSS.content }, h("slot", null), this.renderCenterRow()));
  }
  renderCenterRow() {
    const hasCenterRow = !!getSlotted(this.el, SLOTS.centerRow);
    return hasCenterRow ? h("slot", { name: SLOTS.centerRow }) : null;
  }
  renderFooter() {
    const hasFooter = !!getSlotted(this.el, SLOTS.footer);
    return hasFooter ? (h("div", { class: CSS.footer }, h("slot", { name: SLOTS.footer }))) : null;
  }
  renderMain() {
    const primaryPanel = getSlotted(this.el, SLOTS.primaryPanel);
    const mainClasses = {
      [CSS.main]: true,
      [CSS.mainReversed]: (primaryPanel === null || primaryPanel === void 0 ? void 0 : primaryPanel.position) === "end"
    };
    return (h("div", { class: mainClasses }, h("slot", { name: SLOTS.primaryPanel }), this.renderContent(), !!this.contentBehind ? this.renderCenterRow() : null, h("slot", { name: SLOTS.contextualPanel })));
  }
  render() {
    return (h(Host, null, this.renderHeader(), this.renderMain(), this.renderFooter()));
  }
  get el() { return getElement(this); }
};
CalciteShell.style = calciteShellCss;

export { CalciteShell as calcite_shell };
