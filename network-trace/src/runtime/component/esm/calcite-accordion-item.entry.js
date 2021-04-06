import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { b as getElementProp, g as getElementDir } from './dom-b2b7d90d.js';
import { g as getKey } from './key-040272ec.js';

const calciteAccordionItemCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host-context([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.75rem}:host-context([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:0.875rem}:host-context([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:1.125rem}:host([icon-position=start]){--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-rotation:90deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:-90deg;--calcite-accordion-item-active-icon-rotation-rtl:-180deg;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(--calcite-accordion-item-spacing-unit)}:host([icon-position=end]){--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-rotation:-90deg;--calcite-accordion-item-active-icon-rotation:0deg;--calcite-accordion-item-icon-rotation-rtl:90deg;--calcite-accordion-item-active-icon-rotation-rtl:0deg;--calcite-accordion-item-icon-spacing-start:var(--calcite-accordion-item-spacing-unit);--calcite-accordion-item-icon-spacing-end:0}:host([icon-position=end]:not([icon-type=plus-minus])){--calcite-accordion-item-icon-rotation:0deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:0deg;--calcite-accordion-item-active-icon-rotation-rtl:-180deg}:host{--calcite-accordion-item-background:var(--calcite-ui-foreground-1)}:host-context([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0}:host-context([appearance=transparent]){--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}:host{display:flex;flex-direction:column;background-color:var(--calcite-accordion-item-background);color:var(--calcite-ui-text-3);transition:150ms ease-in-out;text-decoration:none;position:relative;outline:none;position:relative;--calcite-accordion-item-border:var(--calcite-ui-border-2)}:host .accordion-item-header{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .accordion-item-header{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([active]){color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-content{display:block;color:var(--calcite-ui-text-1)}:host([active]) .accordion-item-header{border-bottom-color:transparent}:host .accordion-item-header{display:flex;flex-direction:var(--calcite-accordion-item-flex-direction);align-items:center;cursor:pointer}:host .accordion-item-icon{display:inline-flex;position:relative;margin:0;margin-right:var(--calcite-accordion-item-icon-spacing-start);margin-left:var(--calcite-accordion-item-icon-spacing-end);color:var(--calcite-ui-text-3);transition:150ms ease-in-out}:host([dir=rtl]) .accordion-item-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end)}:host .accordion-item-content,:host .accordion-item-header{padding:var(--calcite-accordion-item-padding);border-bottom:1px solid var(--calcite-accordion-item-border)}:host .accordion-item-header *{display:inline-flex;align-items:center;transition:150ms ease-in-out}:host .accordion-item-content{display:none;color:var(--calcite-ui-text-3);padding-top:0;text-align:initial}:host .accordion-item-expand-icon{margin-left:var(--calcite-accordion-item-icon-spacing-start);margin-right:var(--calcite-accordion-item-icon-spacing-end);color:var(--calcite-ui-text-3);transform:rotate(var(--calcite-accordion-item-icon-rotation))}:host([dir=rtl]) .accordion-item-expand-icon{margin-left:var(--calcite-accordion-item-icon-spacing-end);margin-right:var(--calcite-accordion-item-icon-spacing-start);transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}:host([active]) .accordion-item-expand-icon{color:var(--calcite-ui-text-1);transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}:host([active][dir=rtl]) .accordion-item-expand-icon{transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}:host .accordion-item-header-text{margin-right:auto;flex-direction:column;flex:1;text-align:initial}:host([dir=rtl]) .accordion-item-header-text{margin-left:auto;margin-right:0}:host .accordion-item-title,:host .accordion-item-subtitle{display:flex;width:100%}:host .accordion-item-title{color:var(--calcite-ui-text-2);font-weight:500}:host .accordion-item-subtitle{color:var(--calcite-ui-text-3)}:host([dir=rtl]) .accordion-item-title{margin-right:0;margin-left:auto}:host(:focus) .accordion-item-title,:host(:hover) .accordion-item-title{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-icon,:host(:hover) .accordion-item-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-expand-icon,:host(:hover) .accordion-item-expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-subtitle,:host(:hover) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}:host(:focus) .accordion-item-title,:host(:active) .accordion-item-title,:host([active]) .accordion-item-title{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-icon,:host(:active) .accordion-item-icon,:host([active]) .accordion-item-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-expand-icon,:host(:active) .accordion-item-expand-icon,:host([active]) .accordion-item-expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .accordion-item-subtitle,:host(:active) .accordion-item-subtitle,:host([active]) .accordion-item-subtitle{color:var(--calcite-ui-text-2)}";

const CalciteAccordionItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteAccordionItemKeyEvent = createEvent(this, "calciteAccordionItemKeyEvent", 7);
    this.calciteAccordionItemSelect = createEvent(this, "calciteAccordionItemSelect", 7);
    this.calciteAccordionItemClose = createEvent(this, "calciteAccordionItemClose", 7);
    this.calciteAccordionItemRegister = createEvent(this, "calciteAccordionItemRegister", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    this.active = false;
    /** handle clicks on item header */
    this.itemHeaderClickHandler = () => this.emitRequestedItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.parent = this.el.parentElement;
    this.selectionMode = getElementProp(this.el, "selection-mode", "multi");
    this.iconType = getElementProp(this.el, "icon-type", "chevron");
    this.iconPosition = getElementProp(this.el, "icon-position", "end");
    this.scale = getElementProp(this.el, "scale", "m");
  }
  componentDidLoad() {
    this.itemPosition = this.getItemPosition();
    this.calciteAccordionItemRegister.emit({
      parent: this.parent,
      position: this.itemPosition
    });
  }
  render() {
    const dir = getElementDir(this.el);
    const iconScale = this.scale !== "l" ? "s" : "m";
    const iconEl = h("calcite-icon", { class: "accordion-item-icon", icon: this.icon, scale: iconScale });
    return (h(Host, { "aria-expanded": this.active.toString(), dir: dir, "icon-position": this.iconPosition, tabindex: "0" }, h("div", { class: "accordion-item-header", onClick: this.itemHeaderClickHandler }, this.icon ? iconEl : null, h("div", { class: "accordion-item-header-text" }, h("span", { class: "accordion-item-title" }, this.itemTitle), h("span", { class: "accordion-item-subtitle" }, this.itemSubtitle)), h("calcite-icon", { class: "accordion-item-expand-icon", icon: this.iconType === "chevron"
        ? "chevronUp"
        : this.iconType === "caret"
          ? "caretUp"
          : this.active
            ? "minus"
            : "plus", scale: "s" })), h("div", { class: "accordion-item-content" }, h("slot", null))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(e) {
    if (e.target === this.el) {
      switch (getKey(e.key)) {
        case " ":
        case "Enter":
          this.emitRequestedItem();
          e.preventDefault();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "Home":
        case "End":
          this.calciteAccordionItemKeyEvent.emit({
            parent: this.parent,
            item: e
          });
          e.preventDefault();
          break;
      }
    }
  }
  updateActiveItemOnChange(event) {
    this.requestedAccordionItem = event.detail
      .requestedAccordionItem;
    this.determineActiveItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.el === this.requestedAccordionItem)
          this.active = !this.active;
        break;
      case "single":
        if (this.el === this.requestedAccordionItem)
          this.active = !this.active;
        else
          this.active = false;
        break;
      case "single-persist":
        this.active = this.el === this.requestedAccordionItem;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteAccordionItemSelect.emit({
      requestedAccordionItem: this.el
    });
  }
  getItemPosition() {
    return Array.prototype.indexOf.call(this.parent.querySelectorAll("calcite-accordion-item"), this.el);
  }
  get el() { return getElement(this); }
};
CalciteAccordionItem.style = calciteAccordionItemCss;

export { CalciteAccordionItem as calcite_accordion_item };
