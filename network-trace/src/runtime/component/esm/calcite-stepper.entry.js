import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir } from './dom-558ef00c.js';
import { g as getKey } from './key-6f340c70.js';

const STYLES = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  width: "100%",
  minWidth: "100%"
};
const IESTYLES = JSON.stringify(STYLES)
  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  .replace(/[,]/g, ";")
  .replace(/["{}]/g, "")
  .toLowerCase();

const calciteStepperCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex-direction:row;flex-wrap:wrap;position:relative;justify-content:space-between;align-items:stretch;width:100%;min-width:100%}:host([layout=vertical]){flex-direction:column;flex:1 auto auto}:host ::slotted(.calcite-stepper-content){display:flex;flex-direction:column;flex-wrap:wrap;width:100%;min-width:100%}";

const CalciteStepper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteStepperItemChange = createEvent(this, "calciteStepperItemChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** optionally display a status icon next to the step title */
    this.icon = false;
    /** specify the layout of stepper, defaults to horizontal */
    this.layout = "horizontal";
    /** optionally display the number next to the step title */
    this.numbered = false;
    /** specify the scale of stepper, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** created list of Stepper items */
    this.items = [];
    /** sorted list of Stepper items */
    this.sortedItems = [];
  }
  // watch for removal of disabled to register step
  contentWatcher() {
    if (this.layout === "horizontal") {
      if (!this.stepperContentContainer && this.requestedContent)
        this.addHorizontalContentContainer();
      this.updateContent(this.requestedContent);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    // if no stepper items are set as active, default to the first one
    if (!this.currentPosition) {
      this.calciteStepperItemChange.emit({
        position: 0
      });
    }
  }
  componentWillLoad() {
    if (this.layout === "horizontal" && !this.stepperContentContainer)
      this.addHorizontalContentContainer();
  }
  render() {
    const dir = getElementDir(this.el);
    return (h(Host, { dir: dir }, h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteStepperItemKeyEvent(e) {
    const item = e.detail.item;
    const itemToFocus = e.target;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.sortedItems.length - 1;
    switch (getKey(item.key)) {
      case "ArrowDown":
      case "ArrowRight":
        if (isLastItem)
          this.focusFirstItem();
        else
          this.focusNextItem(itemToFocus);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (isFirstItem)
          this.focusLastItem();
        else
          this.focusPrevItem(itemToFocus);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
  }
  registerItem(event) {
    const item = {
      item: event.target,
      position: event.detail.position,
      content: event.detail.content
    };
    if (item.content && item.item.active)
      this.requestedContent = item.content;
    if (!this.items.includes(item))
      this.items.push(item);
    this.sortedItems = this.sortItems();
  }
  updateItem(event) {
    if (event.detail.content)
      this.requestedContent = event.detail.content;
    this.currentPosition = event.detail.position;
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** set the next step as active */
  async nextStep() {
    this.currentPosition =
      this.currentPosition + 1 < this.items.length
        ? this.currentPosition + 1
        : this.currentPosition;
    this.emitChangedItem();
  }
  /** set the previous step as active */
  async prevStep() {
    this.currentPosition =
      this.currentPosition - 1 >= 0 ? this.currentPosition - 1 : this.currentPosition;
    this.emitChangedItem();
  }
  /** set the requested step as active */
  async goToStep(num) {
    this.currentPosition = num - 1;
    this.emitChangedItem();
  }
  /** set the first step as active */
  async startStep() {
    this.currentPosition = 0;
    this.emitChangedItem();
  }
  /** set the last step as active */
  async endStep() {
    this.currentPosition = this.items.length - 1;
    this.emitChangedItem();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  addHorizontalContentContainer() {
    this.stepperContentContainer = document.createElement("div");
    this.stepperContentContainer.classList.add("calcite-stepper-content");
    // handle ie styles
    const isIE = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));
    if (isIE)
      this.stepperContentContainer.style.cssText = IESTYLES;
    this.el.insertAdjacentElement("beforeend", this.stepperContentContainer);
  }
  emitChangedItem() {
    this.calciteStepperItemChange.emit({
      position: this.currentPosition
    });
  }
  focusFirstItem() {
    const firstItem = this.sortedItems[0];
    this.focusElement(firstItem);
  }
  focusLastItem() {
    const lastItem = this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(lastItem);
  }
  focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.sortedItems[index + 1] || this.sortedItems[0];
    this.focusElement(nextItem);
  }
  focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.sortedItems[index - 1] || this.sortedItems[this.sortedItems.length - 1];
    this.focusElement(prevItem);
  }
  itemIndex(e) {
    return this.sortedItems.indexOf(e);
  }
  focusElement(item) {
    const target = item;
    target.focus();
  }
  sortItems() {
    const items = Array.from(this.items)
      .filter((a) => !a.item.disabled)
      .sort((a, b) => a.position - b.position)
      .map((a) => a.item);
    return [...Array.from(new Set(items))];
  }
  updateContent(content) {
    this.stepperContentContainer.innerHTML = "";
    // handle ie
    const isIE = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));
    if (!isIE) {
      this.stepperContentContainer.append(...content);
    }
    else {
      // handle ie content
      content.forEach((contentItem) => {
        if (contentItem.nodeName === "#text") {
          const text = document.createTextNode(contentItem.textContent.trim());
          if (text.length > 0)
            this.stepperContentContainer.appendChild(text);
        }
        else if (contentItem.nodeName) {
          this.stepperContentContainer.insertAdjacentHTML("beforeend", contentItem.outerHTML);
        }
        else
          return;
      });
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "requestedContent": ["contentWatcher"]
  }; }
};
CalciteStepper.style = calciteStepperCss;

export { CalciteStepper as calcite_stepper };
