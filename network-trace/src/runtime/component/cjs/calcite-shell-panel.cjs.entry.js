'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');

const CSS = {
  content: "content",
  contentDetached: "content--detached"
};
const SLOTS = {
  actionBar: "action-bar"
};

const calciteShellPanelCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;align-items:stretch;background-color:transparent;pointer-events:none;--calcite-shell-panel-detached-max-height:unset}::slotted(calcite-panel),::slotted(calcite-flow){height:100%;max-height:unset;max-width:unset;width:100%}.content{align-items:stretch;align-self:stretch;background-color:var(--calcite-ui-background);flex-flow:column nowrap;display:flex;padding:0;pointer-events:auto;width:var(--calcite-shell-panel-width);max-width:var(--calcite-shell-panel-max-width);min-width:var(--calcite-shell-panel-min-width);transition:max-height 150ms ease-in-out, max-width 150ms ease-in-out}:host([width-scale=s]) .content{--calcite-shell-panel-width:12vw;--calcite-shell-panel-max-width:300px;--calcite-shell-panel-min-width:150px}:host([width-scale=m]) .content{--calcite-shell-panel-width:20vw;--calcite-shell-panel-max-width:420px;--calcite-shell-panel-min-width:240px}:host([width-scale=l]) .content{--calcite-shell-panel-width:45vw;--calcite-shell-panel-max-width:680px;--calcite-shell-panel-min-width:340px}:host([detached-height-scale=s]) .content--detached{--calcite-shell-panel-detached-max-height:40vh}:host([detached-height-scale=m]) .content--detached{--calcite-shell-panel-detached-max-height:60vh}:host([detached-height-scale=l]) .content--detached{--calcite-shell-panel-detached-max-height:80vh}.content--detached{border-radius:var(--calcite-border-radius);box-shadow:var(--calcite-shadow-0);height:auto;margin:var(--calcite-spacing-half) var(--calcite-spacing-half) auto;max-height:var(--calcite-shell-panel-detached-max-height);overflow:hidden}.content--detached ::slotted(calcite-panel),.content--detached ::slotted(calcite-flow){max-height:unset}.content[hidden]{display:none}:host([position=start]) slot[name=action-bar]::slotted(calcite-action-bar){border-right:1px solid var(--calcite-ui-border-3)}:host([position=end]) slot[name=action-bar]::slotted(calcite-action-bar){border-left:1px solid var(--calcite-ui-border-3)}";

const CalciteShellPanel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteShellPanelToggle = index.createEvent(this, "calciteShellPanelToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Hide the content panel.
     */
    this.collapsed = false;
    /**
     * This property makes the content area appear like a "floating" panel.
     */
    this.detached = false;
    /**
     * Specifies the maxiumum height of the contents when detached.
     */
    this.detachedHeightScale = "l";
    /**
     * This sets width of the content area.
     */
    this.widthScale = "m";
  }
  watchHandler() {
    this.calciteShellPanelToggle.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { collapsed, detached, position } = this;
    const contentNode = (index.h("div", { class: { [CSS.content]: true, [CSS.contentDetached]: detached }, hidden: collapsed }, index.h("slot", null)));
    const actionBarNode = index.h("slot", { name: SLOTS.actionBar });
    const mainNodes = [actionBarNode, contentNode];
    if (position === "end") {
      mainNodes.reverse();
    }
    return index.h(index.Host, null, mainNodes);
  }
  static get watchers() { return {
    "collapsed": ["watchHandler"]
  }; }
};
CalciteShellPanel.style = calciteShellPanelCss;

exports.calcite_shell_panel = CalciteShellPanel;
