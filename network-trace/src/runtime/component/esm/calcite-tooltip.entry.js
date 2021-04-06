import { r as registerInstance, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import './dom-b2b7d90d.js';
import { g as guid } from './guid-9ad8042d.js';
import { d as defaultOffsetDistance, u as updatePopper, c as createPopper, C as CSS } from './popper-47c2d00a.js';
import { T as TOOLTIP_REFERENCE, A as ARIA_DESCRIBED_BY, C as CSS$1 } from './resources-8385d367.js';

const calciteTooltipCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px}.calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:var(--calcite-border-radius)}:host([data-popper-placement^=bottom]) .calcite-popper-anim{transform:translateY(-5px)}:host([data-popper-placement^=top]) .calcite-popper-anim{transform:translateY(5px)}:host([data-popper-placement^=left]) .calcite-popper-anim{transform:translateX(5px)}:host([data-popper-placement^=right]) .calcite-popper-anim{transform:translateX(-5px)}:host([data-popper-placement]) .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:\"\";box-shadow:var(--calcite-shadow-1);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top]) .arrow{bottom:-4px}:host([data-popper-placement^=bottom]) .arrow{top:-4px}:host([data-popper-placement^=left]) .arrow{right:-4px}:host([data-popper-placement^=right]) .arrow{left:-4px}.container{position:relative;background:var(--calcite-ui-foreground-1);max-width:300px;max-height:300px;display:flex;justify-content:flex-start;flex-direction:column;font-weight:500;color:var(--calcite-ui-text-1);padding:12px 16px;overflow:hidden;font-size:0.8125rem;line-height:1.5}:host([theme=dark]) .container{background:var(--calcite-ui-foreground-2)}";

const CalciteTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
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
    this._referenceElement = this.getReferenceElement();
    this.guid = `calcite-tooltip-${guid()}`;
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
      _referenceElement.setAttribute(TOOLTIP_REFERENCE, "");
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
      _referenceElement.removeAttribute(TOOLTIP_REFERENCE);
    };
    this.show = () => {
      this.open = true;
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
  openHandler() {
    this.reposition();
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
    this.addReferences();
    this.createPopper();
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
  getReferenceElement() {
    const { referenceElement } = this;
    return ((typeof referenceElement === "string"
      ? document.getElementById(referenceElement)
      : referenceElement) || null);
  }
  getModifiers() {
    const { arrowEl, offsetDistance, offsetSkidding } = this;
    const arrowModifier = {
      name: "arrow",
      enabled: true,
      options: {
        element: arrowEl
      }
    };
    const offsetModifier = {
      name: "offset",
      enabled: true,
      options: {
        offset: [offsetSkidding, offsetDistance]
      }
    };
    return [arrowModifier, offsetModifier];
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
  render() {
    const { _referenceElement, open } = this;
    const displayed = _referenceElement && open;
    return (h(Host, { "aria-hidden": !displayed ? "true" : "false", id: this.getId(), role: "tooltip" }, h("div", { class: {
        [CSS.animation]: true,
        [CSS.animationActive]: displayed
      } }, h("div", { class: CSS$1.arrow, ref: (arrowEl) => (this.arrowEl = arrowEl) }), h("div", { class: CSS$1.container }, h("slot", null)))));
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
CalciteTooltip.style = calciteTooltipCss;

export { CalciteTooltip as calcite_tooltip };
