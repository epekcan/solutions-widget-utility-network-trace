import { r as registerInstance, h, g as getElement, H as Host } from './index-cbdbef9d.js';
import { e as getDescribedByElement } from './dom-b2b7d90d.js';
import { P as POPOVER_REFERENCE } from './resources-fd284007.js';

const CalcitePopoverManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * CSS Selector to match reference elements for popovers.
     */
    this.selector = `[${POPOVER_REFERENCE}]`;
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
  closeOpenPopovers(event) {
    const target = event.target;
    const { autoClose, el, selector } = this;
    const popoverSelector = "calcite-popover";
    const isTargetInsidePopover = target.closest(popoverSelector);
    const describedByElement = getDescribedByElement(target.closest(selector));
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
  get el() { return getElement(this); }
};

export { CalcitePopoverManager as calcite_popover_manager };
