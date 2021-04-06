import { r as registerInstance, h, H as Host } from './index-cbdbef9d.js';
import { e as getDescribedByElement } from './dom-b2b7d90d.js';
import { g as getKey } from './key-040272ec.js';
import { T as TOOLTIP_REFERENCE, a as TOOLTIP_DELAY_MS } from './resources-8385d367.js';

const CalciteTooltipManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.timeouts = new WeakMap();
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * CSS Selector to match reference elements for tooltips.
     */
    this.selector = `[${TOOLTIP_REFERENCE}]`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.queryTooltip = (el) => {
      return getDescribedByElement(el.closest(this.selector));
    };
    this.clearTooltipTimeout = (tooltip) => {
      const { timeouts } = this;
      if (timeouts.has(tooltip)) {
        window.clearTimeout(timeouts.get(tooltip));
      }
    };
    this.focusedToggle = ({ referenceEl, tooltip, value }) => {
      this.focusedReferenceEl = value ? referenceEl : null;
      if (tooltip === this.hoveredTooltipEl) {
        this.hoveredTooltipEl = null;
        this.clearTooltipTimeout(tooltip);
        this.toggleFocusedTooltip(tooltip, value);
        return;
      }
      const { hoveredTooltipEl, hoveredReferenceEl } = this;
      if (referenceEl === hoveredReferenceEl || tooltip === hoveredTooltipEl) {
        return;
      }
      this.toggleFocusedTooltip(tooltip, value);
    };
    this.toggleFocusedTooltip = (tooltip, value) => {
      tooltip.open = value;
      this.focusedTooltipEl = value ? tooltip : null;
    };
    this.toggleHoveredTooltip = (tooltip, value) => {
      tooltip.open = value;
      this.hoveredTooltipEl = value ? tooltip : null;
    };
    this.hoveredToggle = ({ referenceEl, tooltip, value }) => {
      const { focusedReferenceEl, focusedTooltipEl } = this;
      this.hoveredReferenceEl = value ? referenceEl : null;
      if (referenceEl === focusedReferenceEl || tooltip === focusedTooltipEl) {
        return;
      }
      this.hoveredTooltipEl = tooltip;
      this.clearTooltipTimeout(tooltip);
      const { timeouts } = this;
      const timeoutId = window.setTimeout(() => this.toggleHoveredTooltip(tooltip, value), TOOLTIP_DELAY_MS );
      timeouts.set(tooltip, timeoutId);
    };
    this.activeTooltipHover = (event, referenceEl) => {
      const { hoveredTooltipEl } = this;
      if (!hoveredTooltipEl) {
        return;
      }
      const hoveringActiveTooltip = event.composedPath().includes(hoveredTooltipEl);
      hoveringActiveTooltip
        ? this.clearTooltipTimeout(hoveredTooltipEl)
        : this.hoveredToggle({ referenceEl, tooltip: hoveredTooltipEl, value: false });
    };
    this.hoverEvent = (event, value) => {
      const referenceEl = event.target;
      this.activeTooltipHover(event, referenceEl);
      const tooltip = this.queryTooltip(referenceEl);
      if (!tooltip) {
        return;
      }
      this.hoveredToggle({ referenceEl, tooltip, value });
    };
    this.focusEvent = (event, value) => {
      const referenceEl = event.target;
      const tooltip = this.queryTooltip(referenceEl);
      if (!tooltip) {
        return;
      }
      this.focusedToggle({ referenceEl, tooltip, value });
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return h(Host, null);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyUpHandler(event) {
    if (getKey(event.key) === "Escape") {
      const { hoveredTooltipEl, focusedTooltipEl } = this;
      this.hoveredReferenceEl = null;
      this.focusedReferenceEl = null;
      if (hoveredTooltipEl) {
        this.clearTooltipTimeout(hoveredTooltipEl);
        this.toggleHoveredTooltip(hoveredTooltipEl, false);
      }
      if (focusedTooltipEl) {
        this.toggleFocusedTooltip(focusedTooltipEl, false);
      }
    }
  }
  mouseEnterShow(event) {
    this.hoverEvent(event, true);
  }
  mouseLeaveHide(event) {
    this.hoverEvent(event, false);
  }
  focusShow(event) {
    this.focusEvent(event, true);
  }
  blurHide(event) {
    this.focusEvent(event, false);
  }
};

export { CalciteTooltipManager as calcite_tooltip_manager };
