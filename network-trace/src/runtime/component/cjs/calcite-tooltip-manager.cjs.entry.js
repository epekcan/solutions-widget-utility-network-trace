'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const key = require('./key-214fea4a.js');
const resources = require('./resources-329d68fc.js');

const CalciteTooltipManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.timeouts = new WeakMap();
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * CSS Selector to match reference elements for tooltips.
     */
    this.selector = `[${resources.TOOLTIP_REFERENCE}]`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.queryTooltip = (el) => {
      return dom.getDescribedByElement(el.closest(this.selector));
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
      const timeoutId = window.setTimeout(() => this.toggleHoveredTooltip(tooltip, value), resources.TOOLTIP_DELAY_MS );
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
    return index.h(index.Host, null);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyUpHandler(event) {
    if (key.getKey(event.key) === "Escape") {
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

exports.calcite_tooltip_manager = CalciteTooltipManager;
