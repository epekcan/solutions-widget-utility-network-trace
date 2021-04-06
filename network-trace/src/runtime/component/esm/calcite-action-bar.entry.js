import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { c as getSlotted } from './dom-b2b7d90d.js';
import { t as toggleChildActionText, C as CalciteExpandToggle } from './CalciteExpandToggle-f11fd57f.js';

const CSS = {
  actionGroupBottom: "action-group--bottom"
};
const SLOTS = {
  bottomActions: "bottom-actions"
};
const TEXT = {
  expand: "Expand",
  collapse: "Collapse"
};

const calciteActionBarCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{align-self:stretch;display:inline-flex;flex-direction:column;max-width:15vw;overflow-y:auto;pointer-events:auto}:host([expanded]){max-width:20vw}::slotted(calcite-action-group){border-bottom:1px solid var(--calcite-ui-border-2)}::slotted(calcite-action-group:last-child){border-bottom:none}.action-group--bottom{padding-bottom:0;flex-grow:1;justify-content:flex-end}";

const CalciteActionBar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteActionBarToggle = createEvent(this, "calciteActionBarToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates whether widget can be expanded.
     */
    this.expand = true;
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    this.observer = new MutationObserver(() => {
      const { el, expanded } = this;
      toggleChildActionText({ parent: el, expanded });
    });
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
      toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }
  }
  expandedHandler(expanded) {
    if (this.expand) {
      toggleChildActionText({ parent: this.el, expanded });
    }
    this.calciteActionBarToggle.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    const { el, expand, expanded } = this;
    if (expand) {
      toggleChildActionText({ parent: el, expanded });
    }
    this.observer.observe(el, { childList: true });
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expand, intlExpand, intlCollapse, el, position, toggleExpand, tooltipExpand } = this;
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;
    const expandToggleNode = expand ? (h(CalciteExpandToggle, { el: el, expanded: expanded, intlCollapse: collapseLabel, intlExpand: expandLabel, position: position, toggleExpand: toggleExpand, tooltipExpand: tooltipExpand })) : null;
    return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (h("calcite-action-group", { class: CSS.actionGroupBottom }, h("slot", { name: SLOTS.bottomActions }), expandToggleNode)) : null;
  }
  render() {
    return (h(Host, null, h("slot", null), this.renderBottomActionGroup()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expand": ["expandHandler"],
    "expanded": ["expandedHandler"]
  }; }
};
CalciteActionBar.style = calciteActionBarCss;

export { CalciteActionBar as calcite_action_bar };
