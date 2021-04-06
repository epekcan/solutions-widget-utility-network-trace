'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const resources = require('./resources-37257685.js');

const CalcitePopoverManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * CSS Selector to match reference elements for popovers.
     */
    this.selector = `[${resources.POPOVER_REFERENCE}]`;
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
  closeOpenPopovers(event) {
    const target = event.target;
    const { autoClose, el, selector } = this;
    const popoverSelector = "calcite-popover";
    const isTargetInsidePopover = target.closest(popoverSelector);
    const describedByElement = dom.getDescribedByElement(target.closest(selector));
    if (autoClose && !isTargetInsidePopover) {
      Array.from(document.body.querySelectorAll(popoverSelector))
        .filter((popover) => popover.open && popover !== describedByElement)
        .forEach((popover) => popover.toggle(false));
    }
    if (!el.contains(target)) {
      return;
    }
    if (describedByElement) {
      describedByElement.toggle();
    }
  }
  get el() { return index.getElement(this); }
};

exports.calcite_popover_manager = CalcitePopoverManager;
