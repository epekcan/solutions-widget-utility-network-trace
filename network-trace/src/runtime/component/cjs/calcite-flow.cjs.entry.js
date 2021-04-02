'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');

const CSS = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating"
};

const calciteFlowCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{align-items:stretch;background-color:transparent;display:flex;width:100%;height:100%;overflow:hidden;position:relative}:host .frame{align-items:stretch;width:100%;padding:0;margin:0;display:flex;flex-flow:column;position:relative}:host ::slotted(calcite-panel){height:100%}:host .frame--advancing{animation:calcite-frame-advance 150ms ease-in-out}:host .frame--retreating{animation:calcite-frame-retreat 150ms ease-in-out}@keyframes calcite-frame-advance{0%{opacity:0.5;transform:translate3d(50px, 0, 0)}100%{opacity:1;transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-retreat{0%{opacity:0.5;transform:translate3d(-50px, 0, 0)}100%{opacity:1;transform:translate3d(0, 0, 0)}}";

const CalciteFlow = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.panelCount = 0;
    this.flowDirection = null;
    this.panels = [];
    this.getFlowDirection = (oldPanelCount, newPanelCount) => {
      const allowRetreatingDirection = oldPanelCount > 1;
      const allowAdvancingDirection = oldPanelCount && newPanelCount > 1;
      if (!allowAdvancingDirection && !allowRetreatingDirection) {
        return null;
      }
      return newPanelCount < oldPanelCount ? "retreating" : "advancing";
    };
    this.updateFlowProps = () => {
      const { panels } = this;
      const newPanels = Array.from(this.el.querySelectorAll("calcite-panel"));
      const oldPanelCount = panels.length;
      const newPanelCount = newPanels.length;
      const activePanel = newPanels[newPanelCount - 1];
      const previousPanel = newPanels[newPanelCount - 2];
      if (newPanelCount && activePanel) {
        newPanels.forEach((panelNode) => {
          panelNode.showBackButton = newPanelCount > 1;
          panelNode.hidden = panelNode !== activePanel;
        });
      }
      if (previousPanel) {
        previousPanel.menuOpen = false;
      }
      this.panels = newPanels;
      if (oldPanelCount !== newPanelCount) {
        const flowDirection = this.getFlowDirection(oldPanelCount, newPanelCount);
        this.panelCount = newPanelCount;
        this.flowDirection = flowDirection;
      }
    };
    this.panelItemObserver = new MutationObserver(this.updateFlowProps);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Removes the currently active `calcite-panel`.
   */
  async back() {
    const lastItem = this.el.querySelector("calcite-panel:last-child");
    if (!lastItem) {
      return;
    }
    const beforeBack = lastItem.beforeBack
      ? lastItem.beforeBack
      : () => Promise.resolve();
    return beforeBack.call(lastItem).then(() => {
      lastItem.remove();
      return lastItem;
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.panelItemObserver.observe(this.el, { childList: true, subtree: true });
    this.updateFlowProps();
  }
  disconnectedCallback() {
    this.panelItemObserver.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  handleCalcitePanelBackClick() {
    this.back();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { flowDirection, panelCount } = this;
    const frameDirectionClasses = {
      [CSS.frame]: true,
      [CSS.frameAdvancing]: flowDirection === "advancing",
      [CSS.frameRetreating]: flowDirection === "retreating"
    };
    return (index.h(index.Host, null, index.h("div", { class: frameDirectionClasses, key: panelCount }, index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
};
CalciteFlow.style = calciteFlowCss;

exports.calcite_flow = CalciteFlow;
