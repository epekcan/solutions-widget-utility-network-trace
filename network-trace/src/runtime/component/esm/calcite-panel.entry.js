import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { f as focusElement, c as getSlotted, g as getElementDir } from './dom-b2b7d90d.js';
import { C as CSS_UTILITY } from './resources-c23b068d.js';
import { g as getRoundRobinIndex } from './array-e627ad50.js';

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
  open: "Open"
};

const calcitePanelCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;position:relative;max-height:var(--calcite-panel-max-height);width:var(--calcite-panel-width);max-width:var(--calcite-panel-max-width);min-width:var(--calcite-panel-min-width);transition:max-height 150ms ease-in-out, width 150ms ease-in-out;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3);--calcite-panel-max-height:unset;--calcite-panel-width:100%;--calcite-panel-min-width:unset;--calcite-panel-max-width:unset}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-ui-text-weight-demi);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:1.25rem}h2.heading{font-size:1.125rem}h3.heading{font-size:1rem}h4.heading,h5.heading{font-size:0.875rem}.container{align-items:stretch;background-color:var(--calcite-ui-background);height:100%;width:100%;padding:0;margin:0;display:flex;flex-flow:column}calcite-scrim{align-items:stretch;width:100%;height:100%;display:flex;flex-flow:column;pointer-events:none}:host([height-scale=s]){--calcite-panel-max-height:40vh}:host([height-scale=m]){--calcite-panel-max-height:60vh}:host([height-scale=l]){--calcite-panel-max-height:80vh}:host([width-scale=s]){--calcite-panel-width:12vw;--calcite-panel-max-width:300px;--calcite-panel-min-width:150px}:host([width-scale=m]){--calcite-panel-width:20vw;--calcite-panel-max-width:420px;--calcite-panel-min-width:240px}:host([width-scale=l]){--calcite-panel-width:45vw;--calcite-panel-max-width:680px;--calcite-panel-min-width:340px}.container[hidden]{display:none}:host([loading]) .container,:host([disabled]) .container{position:relative;z-index:1}.header{align-items:stretch;background-color:var(--calcite-ui-foreground-1);flex:0 0 auto;justify-content:flex-start;min-height:var(--calcite-header-min-height);position:sticky;top:0;z-index:2;border-bottom:1px solid var(--calcite-ui-border-3);width:100%}.header-content{display:block;overflow:hidden;margin-right:auto;padding:var(--calcite-spacing) var(--calcite-spacing-three-quarters)}.header-content .heading,.header-content .summary{padding:0;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.header-content .heading{color:var(--calcite-ui-text-3);font-weight:var(--calcite-ui-text-weight-demi);margin:0 0 var(--calcite-spacing-quarter);font-size:1rem}.header-content .heading:only-child{margin-bottom:0}.header-content .summary{color:var(--calcite-ui-text-3);font-size:0.75rem}.header-actions{align-items:stretch;display:flex;flex-flow:row nowrap}.menu-container:only-child{margin-left:auto}.menu-button{align-self:stretch;flex:0 1 auto;height:100%;position:relative}.menu{min-width:var(--calcite-menu-min-width);flex-flow:column nowrap}.content-container{align-items:stretch;background-color:var(--calcite-ui-background);display:flex;flex-flow:column nowrap;flex:1 1 auto;overflow:auto}.footer{background-color:var(--calcite-ui-foreground-1);border-top:1px solid var(--calcite-ui-border-3);display:flex;flex:0 0 auto;justify-content:space-evenly;min-height:var(--calcite-footer-min-height);padding:var(--calcite-spacing-half) var(--calcite-spacing-half);position:sticky;bottom:0;width:100%}.calcite--rtl .header-content{margin-left:auto;margin-right:unset}.calcite--rtl .menu-container:only-child{margin-left:unset;margin-right:auto}.fab-container{position:sticky;z-index:1;bottom:0;display:inline-block;margin:0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half);left:0;right:0}";

const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];
const CalcitePanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calcitePanelDismissedChange = createEvent(this, "calcitePanelDismissedChange", 7);
    this.calcitePanelScroll = createEvent(this, "calcitePanelScroll", 7);
    this.calcitePanelBackClick = createEvent(this, "calcitePanelBackClick", 7);
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
    this.setMenuButonRef = (node) => {
      this.menuButtonEl = node;
    };
    this.setDismissRef = (node) => {
      this.dismissButtonEl = node;
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
    this.toggleMenuOpen = () => {
      this.menuOpen = !this.menuOpen;
    };
    this.menuButtonKeyDown = (event) => {
      const { key } = event;
      const { menuOpen } = this;
      if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
        return;
      }
      const actions = this.queryActions();
      const { length } = actions;
      if (!length) {
        return;
      }
      event.preventDefault();
      if (!menuOpen) {
        this.menuOpen = true;
      }
      if (key === "ArrowUp") {
        const lastAction = actions[length - 1];
        focusElement(lastAction);
      }
      if (key === "ArrowDown") {
        const firstAction = actions[0];
        focusElement(firstAction);
      }
    };
    this.menuActionsKeydown = (event) => {
      const { key, target } = event;
      if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
        return;
      }
      const actions = this.queryActions();
      const { length } = actions;
      const currentIndex = actions.indexOf(target);
      if (!length || currentIndex === -1) {
        return;
      }
      event.preventDefault();
      if (key === "ArrowUp") {
        const value = getRoundRobinIndex(currentIndex - 1, length);
        const previousAction = actions[value];
        focusElement(previousAction);
      }
      if (key === "ArrowDown") {
        const value = getRoundRobinIndex(currentIndex + 1, length);
        const nextAction = actions[value];
        focusElement(nextAction);
      }
    };
    this.menuActionsContainerKeyDown = (event) => {
      const { key } = event;
      if (key === "Escape") {
        this.menuOpen = false;
      }
    };
  }
  dismissedHandler() {
    this.calcitePanelDismissedChange.emit();
  }
  queryActions() {
    return getSlotted(this.el, SLOTS.headerActionsEnd, {
      all: true
    });
  }
  isValidKey(key, supportedKeys) {
    return !!supportedKeys.find((k) => k === key);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus(focusId) {
    var _a, _b;
    if (focusId === "dismiss-button") {
      (_a = this.dismissButtonEl) === null || _a === void 0 ? void 0 : _a.setFocus();
      return;
    }
    (_b = this.containerEl) === null || _b === void 0 ? void 0 : _b.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBackButton() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;
    return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "back-button", onClick: backButtonClick, scale: "s", slot: SLOTS.headerActionsStart, text: label })) : null;
  }
  renderHeaderContent() {
    const { heading, summary } = this;
    const headingNode = heading ? h("h3", { class: CSS.heading }, heading) : null;
    const summaryNode = summary ? h("span", { class: CSS.summary }, summary) : null;
    return headingNode || summaryNode ? (h("div", { class: CSS.headerContent, key: "header-content" }, headingNode, summaryNode)) : null;
  }
  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent() {
    return (h("div", { class: CSS.headerContent, key: "header-content" }, h("slot", { name: SLOTS.headerContent })));
  }
  renderHeaderStartActions() {
    const { el } = this;
    const hasStartActions = getSlotted(el, SLOTS.headerActionsStart);
    return hasStartActions ? (h("div", { class: { [CSS.headerActionsStart]: true, [CSS.headerActions]: true }, key: "header-actions-start" }, h("slot", { name: SLOTS.headerActionsStart }))) : null;
  }
  renderHeaderActionsEnd() {
    const { dismiss, dismissible, el, intlClose } = this;
    const text = intlClose || TEXT.close;
    const dismissibleNode = dismissible ? (h("calcite-action", { "aria-label": text, icon: ICONS.close, onClick: dismiss, ref: this.setDismissRef, text: text })) : null;
    const slotNode = h("slot", { name: SLOTS.headerActionsEnd });
    const hasEndActions = getSlotted(el, SLOTS.headerActionsEnd);
    return hasEndActions || dismissibleNode ? (h("div", { class: { [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }, key: "header-actions-end" }, slotNode, dismissibleNode)) : null;
  }
  renderMenuItems() {
    const { menuOpen, menuButtonEl } = this;
    return (h("calcite-popover", { disablePointer: true, flipPlacements: ["bottom-end", "top-end"], offsetDistance: 0, onKeyDown: this.menuActionsKeydown, open: menuOpen, placement: "bottom-end", referenceElement: menuButtonEl }, h("div", { class: CSS.menu }, h("slot", { name: SLOTS.headerMenuActions }))));
  }
  renderMenuButton() {
    const { menuOpen, intlOpen, intlClose } = this;
    const closeLabel = intlClose || TEXT.close;
    const openLabel = intlOpen || TEXT.open;
    const menuLabel = menuOpen ? closeLabel : openLabel;
    return (h("calcite-action", { "aria-label": menuLabel, class: CSS.menuButton, icon: ICONS.menu, onClick: this.toggleMenuOpen, onKeyDown: this.menuButtonKeyDown, ref: this.setMenuButonRef, text: menuLabel }));
  }
  renderMenu() {
    const { el } = this;
    const hasMenuItems = getSlotted(el, SLOTS.headerMenuActions);
    return hasMenuItems ? (h("div", { class: CSS.menuContainer, onKeyDown: this.menuActionsContainerKeyDown }, this.renderMenuButton(), this.renderMenuItems())) : null;
  }
  renderHeaderNode() {
    const { el, showBackButton } = this;
    const backButtonNode = this.renderBackButton();
    const hasHeaderSlottedContent = getSlotted(el, SLOTS.headerContent);
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
      showBackButton ? (h("header", { class: CSS.header }, backButtonNode, actionsNodeStart, headerContentNode, actionsNodeEnd, headerMenuNode)) : null;
  }
  /**
   * Allows user to override the entire footer node.
   */
  renderFooterSlottedContent() {
    const { el } = this;
    const hasFooterSlottedContent = getSlotted(el, SLOTS.footer);
    return hasFooterSlottedContent ? (h("footer", { class: CSS.footer }, h("slot", { name: SLOTS.footer }))) : null;
  }
  renderFooterActions() {
    const { el } = this;
    const hasFooterActions = getSlotted(el, SLOTS.footerActions);
    return hasFooterActions ? (h("footer", { class: CSS.footer }, h("slot", { name: SLOTS.footerActions }))) : null;
  }
  renderContent() {
    return (h("section", { class: CSS.contentContainer, onScroll: this.panelScrollHandler, tabIndex: 0 }, h("slot", null), this.renderFab()));
  }
  renderFab() {
    const { el } = this;
    const hasFab = getSlotted(el, SLOTS.fab);
    return hasFab ? (h("div", { class: CSS.fabContainer }, h("slot", { name: SLOTS.fab }))) : null;
  }
  render() {
    const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;
    const rtl = getElementDir(el) === "rtl";
    const panelNode = (h("article", { "aria-busy": loading.toString(), class: {
        [CSS.container]: true,
        [CSS_UTILITY.rtl]: rtl
      }, hidden: dismissible && dismissed, onKeyUp: panelKeyUpHandler, ref: this.setContainerRef, tabIndex: dismissible ? 0 : -1 }, this.renderHeaderNode(), this.renderContent(), this.renderFooterSlottedContent() || this.renderFooterActions()));
    return (h(Host, null, loading || disabled ? (h("calcite-scrim", { loading: loading }, panelNode)) : (panelNode)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "dismissed": ["dismissedHandler"]
  }; }
};
CalcitePanel.style = calcitePanelCss;

export { CalcitePanel as calcite_panel };
