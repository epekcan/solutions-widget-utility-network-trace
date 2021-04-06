import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import './dom-b2b7d90d.js';
import { g as guid } from './guid-9ad8042d.js';
import { d as defaultOffsetDistance, u as updatePopper, c as createPopper, C as CSS$1 } from './popper-47c2d00a.js';
import { T as TEXT, P as POPOVER_REFERENCE, A as ARIA_DESCRIBED_BY, C as CSS } from './resources-fd284007.js';

const calcitePopoverCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}.calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:var(--calcite-border-radius)}:host([data-popper-placement^=bottom]) .calcite-popper-anim{transform:translateY(-5px)}:host([data-popper-placement^=top]) .calcite-popper-anim{transform:translateY(5px)}:host([data-popper-placement^=left]) .calcite-popper-anim{transform:translateX(5px)}:host([data-popper-placement^=right]) .calcite-popper-anim{transform:translateX(-5px)}:host([data-popper-placement]) .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:\"\";box-shadow:var(--calcite-shadow-1);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top]) .arrow{bottom:-4px}:host([data-popper-placement^=bottom]) .arrow{top:-4px}:host([data-popper-placement^=left]) .arrow{right:-4px}:host([data-popper-placement^=right]) .arrow{left:-4px}.container{background:var(--calcite-ui-foreground-1);position:relative;display:flex;overflow:hidden;flex-direction:column nowrap;color:var(--calcite-ui-text-1)}.content{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;line-height:24px}.close-button{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.close-button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.close-button{display:block;flex:0 0 auto;padding:12px;border:none;border-radius:0 var(--calcite-border-radius) 0 0;color:var(--calcite-ui-text-1);cursor:pointer;background:var(--calcite-ui-foreground-1);z-index:1}.close-button:hover{background:var(--calcite-ui-foreground-2)}.close-button:active{background:var(--calcite-ui-foreground-3)}:host-context([dir=rtl]) .close-button{border-radius:var(--calcite-border-radius) 0 0 0}.image-container{overflow:hidden;max-height:200px;margin:5px}slot[name=image]::slotted(img){height:auto;width:100%;max-height:200px;object-position:50% 50%;object-fit:cover}::slotted(calcite-panel),::slotted(calcite-flow){height:100%}";

const CalcitePopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calcitePopoverClose = createEvent(this, "calcitePopoverClose", 7);
    this.calcitePopoverOpen = createEvent(this, "calcitePopoverOpen", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Display a close button within the Popover.
     */
    this.closeButton = false;
    /**
     * Prevents flipping the popover's placement when it starts to overlap its reference element.
     */
    this.disableFlip = false;
    /**
     * Removes the caret pointer.
     */
    this.disablePointer = false;
    /**
     * Offset the position of the popover away from the reference element.
     */
    this.offsetDistance = defaultOffsetDistance;
    /**
     * Offset the position of the popover along the reference element.
     */
    this.offsetSkidding = 0;
    /**
     * Display and position the component.
     */
    this.open = false;
    /**
     * Determines where the component will be positioned relative to the referenceElement.
     */
    this.placement = "auto";
    /** Text for close button. */
    this.intlClose = TEXT.close;
    this._referenceElement = this.getReferenceElement();
    this.guid = `calcite-popover-${guid()}`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.getId = () => {
      return this.el.id || this.guid;
    };
    this.addReferences = () => {
      const { _referenceElement } = this;
      if (!_referenceElement) {
        return;
      }
      _referenceElement.setAttribute(POPOVER_REFERENCE, "");
      if (!_referenceElement.hasAttribute(ARIA_DESCRIBED_BY)) {
        _referenceElement.setAttribute(ARIA_DESCRIBED_BY, this.getId());
      }
    };
    this.removeReferences = () => {
      const { _referenceElement } = this;
      if (!_referenceElement) {
        return;
      }
      _referenceElement.removeAttribute(ARIA_DESCRIBED_BY);
      _referenceElement.removeAttribute(POPOVER_REFERENCE);
    };
    this.hide = () => {
      this.open = false;
    };
  }
  offsetDistanceOffsetHandler() {
    this.reposition();
  }
  offsetSkiddingHandler() {
    this.reposition();
  }
  openHandler(open) {
    this.reposition();
    if (open) {
      this.calcitePopoverOpen.emit();
    }
    else {
      this.calcitePopoverClose.emit();
    }
  }
  placementHandler() {
    this.reposition();
  }
  referenceElementHandler() {
    this.removeReferences();
    this._referenceElement = this.getReferenceElement();
    this.addReferences();
    this.createPopper();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentDidLoad() {
    this.createPopper();
    this.addReferences();
  }
  disconnectedCallback() {
    this.removeReferences();
    this.destroyPopper();
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async reposition() {
    const { popper, el, placement } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el,
        modifiers,
        placement,
        popper
      })
      : this.createPopper();
  }
  async setFocus(focusId) {
    var _a, _b;
    if (focusId === "close-button") {
      (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
      return;
    }
    (_b = this.el) === null || _b === void 0 ? void 0 : _b.focus();
  }
  async toggle(value = !this.open) {
    this.open = value;
  }
  getReferenceElement() {
    const { referenceElement } = this;
    return ((typeof referenceElement === "string"
      ? document.getElementById(referenceElement)
      : referenceElement) || null);
  }
  getModifiers() {
    const { arrowEl, flipPlacements, disableFlip, disablePointer, offsetDistance, offsetSkidding } = this;
    const flipModifier = {
      name: "flip",
      enabled: !disableFlip
    };
    if (flipPlacements) {
      flipModifier.options = {
        fallbackPlacements: flipPlacements
      };
    }
    const arrowModifier = {
      name: "arrow",
      enabled: !disablePointer
    };
    if (arrowEl) {
      arrowModifier.options = {
        element: arrowEl
      };
    }
    const offsetModifier = {
      name: "offset",
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance]
      }
    };
    return [arrowModifier, flipModifier, offsetModifier];
  }
  createPopper() {
    this.destroyPopper();
    const { el, placement, _referenceElement: referenceEl } = this;
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el,
      modifiers,
      placement,
      referenceEl
    });
  }
  destroyPopper() {
    const { popper } = this;
    if (popper) {
      popper.destroy();
    }
    this.popper = null;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderImage() {
    return this.el.querySelector("[slot=image]") ? (h("div", { class: CSS.imageContainer }, h("slot", { name: "image" }))) : null;
  }
  renderCloseButton() {
    const { closeButton, intlClose } = this;
    return closeButton ? (h("button", { "aria-label": intlClose, class: { [CSS.closeButton]: true }, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), title: intlClose }, h("calcite-icon", { icon: "x", scale: "m" }))) : null;
  }
  render() {
    const { _referenceElement, open, disablePointer } = this;
    const displayed = _referenceElement && open;
    const arrowNode = !disablePointer ? (h("div", { class: CSS.arrow, ref: (arrowEl) => (this.arrowEl = arrowEl) })) : null;
    return (h(Host, { "aria-hidden": !displayed ? "true" : "false", id: this.getId(), role: "dialog" }, h("div", { class: {
        [CSS$1.animation]: true,
        [CSS$1.animationActive]: displayed
      } }, arrowNode, h("div", { class: CSS.container }, this.renderImage(), h("div", { class: CSS.content }, h("slot", null), this.renderCloseButton())))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "offsetDistance": ["offsetDistanceOffsetHandler"],
    "offsetSkidding": ["offsetSkiddingHandler"],
    "open": ["openHandler"],
    "placement": ["placementHandler"],
    "referenceElement": ["referenceElementHandler"]
  }; }
};
CalcitePopover.style = calcitePopoverCss;

export { CalcitePopover as calcite_popover };
