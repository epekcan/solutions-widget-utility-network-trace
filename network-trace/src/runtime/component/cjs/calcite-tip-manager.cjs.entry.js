'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const CalciteHeading = require('./CalciteHeading-1ee0d4c6.js');
const resources = require('./resources-ec51215c.js');

const calciteTipManagerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;--calcite-tip-manager-height:18vh;--calcite-tip-max-width:540px}:host([closed]){display:none}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}.header .heading{padding-left:var(--calcite-spacing-half);padding-right:var(--calcite-spacing-half)}.container{overflow:hidden;position:relative;padding:var(--calcite-spacing-half) var(--calcite-spacing-half) 0;min-height:150px;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.container:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.tip-container{animation-name:none;animation-duration:150ms;animation-timing-function:cubic-bezier(0.215, 0.44, 0.42, 0.88);height:var(--calcite-tip-manager-height);margin-top:var(--calcite-spacing-quarter);overflow:auto;display:flex;justify-content:center;align-items:flex-start;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.tip-container:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}::slotted(calcite-tip){border:none;max-width:var(--calcite-tip-max-width)}.tip-container--advancing{animation-name:tip-advance}.tip-container--retreating{animation-name:tip-retreat}.pagination{display:flex;align-items:center;justify-content:center;padding:var(--calcite-spacing-quarter) 0}.page-position{font-size:0.75rem;line-height:1.5;margin:0 var(--calcite-spacing-half)}@keyframes tip-advance{0%{opacity:0;transform:translate3d(50px, 0, 0) scale(0.99)}100%{opacity:1;transform:translate3d(0, 0, 0) scale(1)}}@keyframes tip-retreat{0%{opacity:0;transform:translate3d(-50px, 0, 0) scale(0.99)}100%{opacity:1;transform:translate3d(0, 0, 0) scale(1)}}";

const CalciteTipManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteTipManagerToggle = index.createEvent(this, "calciteTipManagerToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Alternate text for closing the `calcite-tip-manager`.
     */
    this.closed = false;
    /**
     * Number at which section headings should start for this component.
     */
    this.headingLevel = resources.HEADING_LEVEL;
    this.observer = new MutationObserver(() => this.setUpTips());
    this.hideTipManager = () => {
      this.closed = true;
      this.calciteTipManagerToggle.emit();
    };
    this.previousClicked = () => {
      this.previousTip();
    };
    this.nextClicked = () => {
      this.nextTip();
    };
    this.tipManagerKeyUpHandler = (event) => {
      if (event.target !== this.container) {
        return;
      }
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          this.nextTip();
          break;
        case "ArrowLeft":
          event.preventDefault();
          this.previousTip();
          break;
        case "Home":
          event.preventDefault();
          this.selectedIndex = 0;
          break;
        case "End":
          event.preventDefault();
          this.selectedIndex = this.total - 1;
          break;
      }
    };
    this.storeContainerRef = (el) => {
      this.container = el;
    };
  }
  closedChangeHandler() {
    this.direction = null;
    this.calciteTipManagerToggle.emit();
  }
  selectedChangeHandler() {
    this.showSelectedTip();
    this.updateGroupTitle();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.setUpTips();
    this.observer.observe(this.el, { childList: true, subtree: true });
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async nextTip() {
    this.direction = "advancing";
    const nextIndex = this.selectedIndex + 1;
    this.selectedIndex = (nextIndex + this.total) % this.total;
  }
  async previousTip() {
    this.direction = "retreating";
    const previousIndex = this.selectedIndex - 1;
    this.selectedIndex = (previousIndex + this.total) % this.total;
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setUpTips() {
    const tips = Array.from(this.el.querySelectorAll("calcite-tip"));
    this.total = tips.length;
    if (this.total === 0) {
      return;
    }
    const selectedTip = this.el.querySelector("calcite-tip[selected]");
    this.tips = tips;
    this.selectedIndex = selectedTip ? tips.indexOf(selectedTip) : 0;
    tips.forEach((tip) => {
      tip.headingLevel = CalciteHeading.ConstrainHeadingLevel(this.headingLevel + 1);
      tip.nonDismissible = true;
    });
    this.showSelectedTip();
    this.updateGroupTitle();
  }
  showSelectedTip() {
    this.tips.forEach((tip, index) => {
      const isSelected = this.selectedIndex === index;
      tip.selected = isSelected;
      tip.hidden = !isSelected;
    });
  }
  updateGroupTitle() {
    const selectedTip = this.tips[this.selectedIndex];
    const tipParent = selectedTip.closest("calcite-tip-group");
    this.groupTitle = (tipParent === null || tipParent === void 0 ? void 0 : tipParent.groupTitle) || this.intlDefaultTitle || resources.TEXT.defaultGroupTitle;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderPagination() {
    const dir = dom.getElementDir(this.el);
    const { selectedIndex, tips, total, intlNext, intlPrevious, intlPaginationLabel } = this;
    const nextLabel = intlNext || resources.TEXT.next;
    const previousLabel = intlPrevious || resources.TEXT.previous;
    const paginationLabel = intlPaginationLabel || resources.TEXT.defaultPaginationLabel;
    return tips.length > 1 ? (index.h("footer", { class: resources.CSS.pagination }, index.h("calcite-action", { class: resources.CSS.pagePrevious, icon: dir === "ltr" ? resources.ICONS.chevronLeft : resources.ICONS.chevronRight, onClick: this.previousClicked, text: previousLabel }), index.h("span", { class: resources.CSS.pagePosition }, `${paginationLabel} ${selectedIndex + 1}/${total}`), index.h("calcite-action", { class: resources.CSS.pageNext, icon: dir === "ltr" ? resources.ICONS.chevronRight : resources.ICONS.chevronLeft, onClick: this.nextClicked, text: nextLabel }))) : null;
  }
  render() {
    const { closed, direction, headingLevel, groupTitle, selectedIndex, intlClose, total } = this;
    const closeLabel = intlClose || resources.TEXT.close;
    if (total === 0) {
      return index.h(index.Host, null);
    }
    return (index.h(index.Host, null, index.h("section", { "aria-hidden": closed.toString(), class: resources.CSS.container, hidden: closed, onKeyUp: this.tipManagerKeyUpHandler, ref: this.storeContainerRef, tabIndex: 0 }, index.h("header", { class: resources.CSS.header }, index.h(CalciteHeading.CalciteHeading, { class: resources.CSS.heading, level: headingLevel }, groupTitle), index.h("calcite-action", { class: resources.CSS.close, icon: resources.ICONS.close, onClick: this.hideTipManager, text: closeLabel })), index.h("div", { class: {
        [resources.CSS.tipContainer]: true,
        [resources.CSS.tipContainerAdvancing]: !closed && direction === "advancing",
        [resources.CSS.tipContainerRetreating]: !closed && direction === "retreating"
      }, key: selectedIndex, tabIndex: 0 }, index.h("slot", null)), this.renderPagination())));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "closed": ["closedChangeHandler"],
    "selectedIndex": ["selectedChangeHandler"]
  }; }
};
CalciteTipManager.style = calciteTipManagerCss;

exports.calcite_tip_manager = CalciteTipManager;
