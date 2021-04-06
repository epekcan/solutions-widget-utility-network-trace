'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const resources = require('./resources-c7d5cc25.js');
const CalciteHeading = require('./CalciteHeading-1ee0d4c6.js');

const CSS = {
  backButton: "back-button",
  container: "container",
  header: "header",
  heading: "heading",
  summary: "summary",
  headerContent: "header-content",
  headerActions: "header-actions",
  headerActionsEnd: "header-actions--end",
  headerActionsStart: "header-actions--start",
  contentContainer: "content-container",
  fabContainer: "fab-container",
  footer: "footer",
  menuContainer: "menu-container",
  menuButton: "menu-button",
  menu: "menu",
  menuOpen: "menu--open"
};
const ICONS = {
  close: "x",
  menu: "ellipsis",
  backLeft: "chevron-left",
  backRight: "chevron-right"
};
const SLOTS = {
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerActions: "footer-actions"
};
const TEXT = {
  back: "Back",
  close: "Close",
  open: "Open",
  options: "Options"
};
const HEADING_LEVEL = 3;

const calcitePanelCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;position:relative;max-height:var(--calcite-panel-max-height);width:var(--calcite-panel-width);max-width:var(--calcite-panel-max-width);min-width:var(--calcite-panel-min-width);transition:max-height 150ms ease-in-out, width 150ms ease-in-out;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3);--calcite-panel-max-height:unset;--calcite-panel-width:100%;--calcite-panel-min-width:unset;--calcite-panel-max-width:unset}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}.container{display:flex;flex-direction:column;align-items:stretch;background-color:var(--calcite-ui-background);height:100%;width:100%;padding:0;margin:0}calcite-scrim{display:flex;flex-direction:column;align-items:stretch;width:100%;height:100%;pointer-events:none}:host([height-scale=s]){--calcite-panel-max-height:40vh}:host([height-scale=m]){--calcite-panel-max-height:60vh}:host([height-scale=l]){--calcite-panel-max-height:80vh}:host([width-scale=s]){--calcite-panel-width:12vw;--calcite-panel-max-width:300px;--calcite-panel-min-width:150px}:host([width-scale=m]){--calcite-panel-width:20vw;--calcite-panel-max-width:420px;--calcite-panel-min-width:240px}:host([width-scale=l]){--calcite-panel-width:45vw;--calcite-panel-max-width:680px;--calcite-panel-min-width:340px}.container[hidden]{display:none}:host([loading]) .container,:host([disabled]) .container{position:relative;z-index:1}.header{border-bottom:1px solid;align-items:stretch;background-color:var(--calcite-ui-foreground-1);justify-content:flex-start;position:sticky;top:0;border-bottom-color:var(--calcite-ui-border-3);width:100%;flex:0 0 auto;min-height:3rem;z-index:2;width:100%}.header-content{display:block;overflow:hidden;margin-right:auto;padding-top:1rem;padding-bottom:1rem;padding-left:0.75rem;padding-right:0.75rem}.header-content .heading,.header-content .summary{padding:0;display:block;overflow:hidden;white-space:nowrap;width:100%;text-overflow:ellipsis}.header-content .heading{font-weight:var(--calcite-font-weight-bold);margin-top:0;margin-left:0;margin-right:0;margin-bottom:0.25rem;font-size:var(--calcite-font-size-0);line-height:1.375}.header-content .heading:only-child{margin-bottom:0}.header-content .summary{color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1);line-height:1.375}.header-actions{display:flex;align-items:stretch;flex-flow:row nowrap}.menu-container:only-child{margin-left:auto}.menu-button{align-self:stretch;flex:0 1 auto;height:100%;position:relative}.menu{min-width:10rem;flex-flow:column nowrap}.content-container{align-items:stretch;background-color:var(--calcite-ui-background);display:flex;flex:1 1 auto;overflow:auto;display:flex;flex-flow:column nowrap}.footer{border-top:1px solid;background-color:var(--calcite-ui-foreground-1);border-top-color:var(--calcite-ui-border-3);display:flex;justify-content:space-evenly;position:sticky;bottom:0;width:100%;flex:0 0 auto;min-height:3rem;padding:0.5rem}.calcite--rtl .header-content{margin-left:auto;margin-right:unset}.calcite--rtl .menu-container:only-child{margin-right:auto;margin-left:unset}.fab-container{display:inline-block;position:sticky;margin-top:0;margin-bottom:0;margin-left:auto;margin-right:auto;bottom:0;left:0;right:0;z-index:1;padding:0.5rem}";

const CalcitePanel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calcitePanelDismissedChange = index.createEvent(this, "calcitePanelDismissedChange", 7);
    this.calcitePanelScroll = index.createEvent(this, "calcitePanelScroll", 7);
    this.calcitePanelBackClick = index.createEvent(this, "calcitePanelBackClick", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Hides the panel.
     */
    this.dismissed = false;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * Displays a close button in the trailing side of the header.
     */
    this.dismissible = false;
    /**
     * Number at which section headings should start for this component.
     */
    this.headingLevel = HEADING_LEVEL;
    /**
     * Shows a back button in the header.
     */
    this.showBackButton = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Opens the action menu.
     */
    this.menuOpen = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setContainerRef = (node) => {
      this.containerEl = node;
    };
    this.setDismissRef = (node) => {
      this.dismissButtonEl = node;
    };
    this.setBackRef = (node) => {
      this.backButtonEl = node;
    };
    this.panelKeyUpHandler = (event) => {
      if (event.key === "Escape") {
        this.dismiss();
      }
    };
    this.dismiss = () => {
      this.dismissed = true;
    };
    this.panelScrollHandler = () => {
      this.calcitePanelScroll.emit();
    };
    this.backButtonClick = () => {
      this.calcitePanelBackClick.emit();
    };
  }
  dismissedHandler() {
    this.calcitePanelDismissedChange.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus(focusId) {
    var _a, _b, _c;
    if (focusId === "dismiss-button") {
      (_a = this.dismissButtonEl) === null || _a === void 0 ? void 0 : _a.setFocus();
      return;
    }
    if (focusId === "back-button") {
      (_b = this.backButtonEl) === null || _b === void 0 ? void 0 : _b.setFocus();
      return;
    }
    (_c = this.containerEl) === null || _c === void 0 ? void 0 : _c.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBackButton() {
    const { el } = this;
    const rtl = dom.getElementDir(el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;
    return showBackButton ? (index.h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: SLOTS.headerActionsStart, text: label })) : null;
  }
  renderHeaderContent() {
    const { heading, headingLevel, summary } = this;
    const headingNode = heading ? (index.h(CalciteHeading.CalciteHeading, { class: CSS.heading, level: headingLevel }, heading)) : null;
    const summaryNode = summary ? index.h("span", { class: CSS.summary }, summary) : null;
    return headingNode || summaryNode ? (index.h("div", { class: CSS.headerContent, key: "header-content" }, headingNode, summaryNode)) : null;
  }
  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent() {
    return (index.h("div", { class: CSS.headerContent, key: "header-content" }, index.h("slot", { name: SLOTS.headerContent })));
  }
  renderHeaderStartActions() {
    const { el } = this;
    const hasStartActions = dom.getSlotted(el, SLOTS.headerActionsStart);
    return hasStartActions ? (index.h("div", { class: { [CSS.headerActionsStart]: true, [CSS.headerActions]: true }, key: "header-actions-start" }, index.h("slot", { name: SLOTS.headerActionsStart }))) : null;
  }
  renderHeaderActionsEnd() {
    const { dismiss, dismissible, el, intlClose } = this;
    const text = intlClose || TEXT.close;
    const dismissibleNode = dismissible ? (index.h("calcite-action", { "aria-label": text, icon: ICONS.close, onClick: dismiss, ref: this.setDismissRef, text: text })) : null;
    const slotNode = index.h("slot", { name: SLOTS.headerActionsEnd });
    const hasEndActions = dom.getSlotted(el, SLOTS.headerActionsEnd);
    return hasEndActions || dismissibleNode ? (index.h("div", { class: { [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }, key: "header-actions-end" }, slotNode, dismissibleNode)) : null;
  }
  renderMenu() {
    const { el, intlOptions, menuOpen } = this;
    const hasMenuItems = dom.getSlotted(el, SLOTS.headerMenuActions);
    return hasMenuItems ? (index.h("calcite-action-menu", { flipPlacements: ["top", "bottom"], intlOptions: intlOptions, open: menuOpen, placement: "bottom-end" }, index.h("slot", { name: SLOTS.headerMenuActions }))) : null;
  }
  renderHeaderNode() {
    const { el, showBackButton } = this;
    const backButtonNode = this.renderBackButton();
    const hasHeaderSlottedContent = dom.getSlotted(el, SLOTS.headerContent);
    const headerContentNode = hasHeaderSlottedContent
      ? this.renderHeaderSlottedContent()
      : this.renderHeaderContent();
    const actionsNodeStart = this.renderHeaderStartActions();
    const actionsNodeEnd = this.renderHeaderActionsEnd();
    const headerMenuNode = this.renderMenu();
    return actionsNodeStart ||
      headerContentNode ||
      actionsNodeEnd ||
      headerMenuNode ||
      showBackButton ? (index.h("header", { class: CSS.header }, backButtonNode, actionsNodeStart, headerContentNode, actionsNodeEnd, headerMenuNode)) : null;
  }
  /**
   * Allows user to override the entire footer node.
   */
  renderFooterSlottedContent() {
    const { el } = this;
    const hasFooterSlottedContent = dom.getSlotted(el, SLOTS.footer);
    return hasFooterSlottedContent ? (index.h("footer", { class: CSS.footer }, index.h("slot", { name: SLOTS.footer }))) : null;
  }
  renderFooterActions() {
    const { el } = this;
    const hasFooterActions = dom.getSlotted(el, SLOTS.footerActions);
    return hasFooterActions ? (index.h("footer", { class: CSS.footer }, index.h("slot", { name: SLOTS.footerActions }))) : null;
  }
  renderContent() {
    return (index.h("section", { class: CSS.contentContainer, onScroll: this.panelScrollHandler, tabIndex: 0 }, index.h("slot", null), this.renderFab()));
  }
  renderFab() {
    const { el } = this;
    const hasFab = dom.getSlotted(el, SLOTS.fab);
    return hasFab ? (index.h("div", { class: CSS.fabContainer }, index.h("slot", { name: SLOTS.fab }))) : null;
  }
  render() {
    const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;
    const rtl = dom.getElementDir(el) === "rtl";
    const panelNode = (index.h("article", { "aria-busy": loading.toString(), class: {
        [CSS.container]: true,
        [resources.CSS_UTILITY.rtl]: rtl
      }, hidden: dismissible && dismissed, onKeyUp: panelKeyUpHandler, ref: this.setContainerRef, tabIndex: dismissible ? 0 : -1 }, this.renderHeaderNode(), this.renderContent(), this.renderFooterSlottedContent() || this.renderFooterActions()));
    return (index.h(index.Host, null, loading || disabled ? (index.h("calcite-scrim", { loading: loading }, panelNode)) : (panelNode)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "dismissed": ["dismissedHandler"]
  }; }
};
CalcitePanel.style = calcitePanelCss;

exports.calcite_panel = CalcitePanel;
