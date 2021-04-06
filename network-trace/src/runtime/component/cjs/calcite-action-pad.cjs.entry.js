'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const CalciteExpandToggle = require('./CalciteExpandToggle-203d145d.js');
const resources = require('./resources-c7d5cc25.js');

const CSS = {
  actionGroupBottom: "action-group--bottom",
  container: "container"
};
const TEXT = {
  expand: "Expand",
  collapse: "Collapse"
};

const calciteActionPadCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{animation:calcite-fade-in 150ms ease-in-out}:host([expanded]){max-width:20vw}::slotted(calcite-action-group){border-bottom:1px solid var(--calcite-ui-border-2);padding-bottom:0;padding-top:0}.container{display:inline-flex;flex-direction:column;box-shadow:var(--calcite-shadow-2);max-width:15vw;overflow-y:auto}.action-group--bottom{padding-bottom:0;flex-grow:1;justify-content:flex-end}:host([layout=horizontal]) .container{flex-direction:row;max-width:unset}:host([layout=horizontal]) .container .action-group--bottom{padding:0}:host([layout=horizontal]) .container ::slotted(calcite-action-group){border-right:1px solid var(--calcite-ui-border-3);border-bottom:none;flex-direction:row;padding:0}:host([layout=horizontal]) .container.calcite--rtl ::slotted(calcite-action-group){border-right:none;border-left:1px solid var(--calcite-ui-border-3)}::slotted(calcite-action-group:last-child){border-bottom:none}";

const CalciteActionPad = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteActionPadToggle = index.createEvent(this, "calciteActionPadToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates the horizontal or vertical layout of the component.
     */
    this.layout = "vertical";
    /**
     * Indicates whether widget can be expanded.
     */
    this.expand = true;
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
    };
  }
  expandHandler(expand) {
    if (expand) {
      CalciteExpandToggle.toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }
  }
  expandedHandler(expanded) {
    if (this.expand) {
      CalciteExpandToggle.toggleChildActionText({ parent: this.el, expanded });
    }
    this.calciteActionPadToggle.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    const { el, expand, expanded } = this;
    if (expand) {
      CalciteExpandToggle.toggleChildActionText({ parent: el, expanded });
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expand, intlExpand, intlCollapse, el, position, toggleExpand, tooltipExpand } = this;
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;
    const expandToggleNode = expand ? (index.h(CalciteExpandToggle.CalciteExpandToggle, { el: el, expanded: expanded, intlCollapse: collapseLabel, intlExpand: expandLabel, position: position, toggleExpand: toggleExpand, tooltipExpand: tooltipExpand })) : null;
    return expandToggleNode ? (index.h("calcite-action-group", { class: CSS.actionGroupBottom }, expandToggleNode)) : null;
  }
  render() {
    const rtl = dom.getElementDir(this.el) === "rtl";
    const containerClasses = {
      [CSS.container]: true,
      [resources.CSS_UTILITY.rtl]: rtl
    };
    return (index.h(index.Host, null, index.h("div", { class: containerClasses }, index.h("slot", null), this.renderBottomActionGroup())));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expand": ["expandHandler"],
    "expanded": ["expandedHandler"]
  }; }
};
CalciteActionPad.style = calciteActionPadCss;

exports.calcite_action_pad = CalciteActionPad;
