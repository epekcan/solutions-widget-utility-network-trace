'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');

const CSS = {
  main: "main",
  mainReversed: "main--reversed",
  content: "content",
  footer: "footer"
};
const SLOTS = {
  centerRow: "center-row",
  primaryPanel: "primary-panel",
  contextualPanel: "contextual-panel",
  header: "shell-header",
  footer: "shell-footer"
};

const calciteShellCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{width:100%;height:100%;position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{height:100%;width:100%;flex:1 1 auto;display:flex;flex-direction:row;position:relative;border-top:1px solid var(--calcite-ui-border-3);border-bottom:1px solid var(--calcite-ui-border-3);justify-content:space-between;overflow:hidden}.main--reversed{flex-direction:row-reverse}.content{height:100%;width:100%;position:absolute;left:0;right:0;bottom:0;top:0;z-index:0}::slotted(.header .heading){font-weight:var(--calcite-ui-text-weight);font-size:0.875rem;line-height:1.5}::slotted(calcite-shell-panel),::slotted(calcite-shell-center-row){position:relative;z-index:1}::slotted(calcite-tip-manager){animation:calcite-fade-in-up 150ms ease-in-out;border-radius:var(--calcite-border-radius);bottom:var(--calcite-spacing-plus-half);box-shadow:var(--calcite-shadow-2);box-sizing:border-box;left:var(--calcite-shell-tip-spacing);position:absolute;right:var(--calcite-shell-tip-spacing);z-index:2}.footer{padding:var(--calcite-spacing-half) var(--calcite-spacing)}";

const CalciteShell = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const hasHeader = !!dom.getSlotted(this.el, SLOTS.header);
    return hasHeader ? index.h("slot", { name: SLOTS.header }) : null;
  }
  renderContent() {
    return (index.h("div", { class: CSS.content }, index.h("slot", null)));
  }
  renderFooter() {
    const hasFooter = !!dom.getSlotted(this.el, SLOTS.footer);
    return hasFooter ? (index.h("div", { class: CSS.footer }, index.h("slot", { name: SLOTS.footer }))) : null;
  }
  renderMain() {
    const primaryPanel = dom.getSlotted(this.el, SLOTS.primaryPanel);
    const mainClasses = {
      [CSS.main]: true,
      [CSS.mainReversed]: (primaryPanel === null || primaryPanel === void 0 ? void 0 : primaryPanel.position) === "end"
    };
    return (index.h("div", { class: mainClasses }, index.h("slot", { name: SLOTS.primaryPanel }), this.renderContent(), index.h("slot", { name: SLOTS.centerRow }), index.h("slot", { name: SLOTS.contextualPanel })));
  }
  render() {
    return (index.h(index.Host, null, this.renderHeader(), this.renderMain(), this.renderFooter()));
  }
  get el() { return index.getElement(this); }
};
CalciteShell.style = calciteShellCss;

exports.calcite_shell = CalciteShell;
