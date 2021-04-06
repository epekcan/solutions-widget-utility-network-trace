'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const guid = require('./guid-f05bb751.js');
const resources$1 = require('./resources-c7d5cc25.js');
const popper = require('./popper-1fd7a0cb.js');
const array = require('./array-3f4409d6.js');
const resources = require('./resources-3d824dd4.js');

const CSS = {
  menuButton: "menu-button",
  menu: "menu"
};
const ICONS = {
  menu: "ellipsis"
};
const TEXT = {
  options: "Options"
};

const calciteActionMenuCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex-direction:column}::slotted(calcite-action){display:flex;width:100%}.menu-button{align-self:stretch;flex:0 1 auto;height:100%;position:relative}.menu{min-width:var(--calcite-menu-min-width);flex-flow:column nowrap}";

const SUPPORTED_BUTTON_NAV_KEYS = ["ArrowUp", "ArrowDown"];
const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const MENU_ANIMATION_DELAY_MS = 50;
const CalciteActionMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Offset the position of the menu away from the reference element.
     */
    this.offsetDistance = 0;
    /**
     * Opens the action menu.
     */
    this.open = false;
    /**
     * Determines where the component will be positioned relative to the referenceElement.
     */
    this.placement = "auto";
    this.actionElements = [];
    this.mutationObserver = new MutationObserver(() => this.getActions());
    this.guid = `calcite-action-menu-${guid.guid()}`;
    this.menuId = `${this.guid}-menu`;
    this.menuButtonId = `${this.guid}-menu-button`;
    this.activeMenuItemIndex = -1;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.menuButtonClick = () => {
      this.toggleOpen();
    };
    this.setMenuButtonRef = (node) => {
      this.menuButtonEl = node;
    };
    this.updateAction = (action, index) => {
      const { guid, activeMenuItemIndex } = this;
      const id = `${guid}-action-${index}`;
      action.tabIndex = -1;
      action.setAttribute("role", "menuitem");
      if (!action.id) {
        action.id = id;
      }
      action.active = index === activeMenuItemIndex;
    };
    this.updateActions = (actions) => {
      actions === null || actions === void 0 ? void 0 : actions.forEach(this.updateAction);
    };
    this.getActions = () => {
      var _a;
      const actionElements = ((_a = this.el
        .querySelector("slot")) === null || _a === void 0 ? void 0 : _a.assignedElements({ flatten: true }).filter((el) => el.tagName === "CALCITE-ACTION")) || [];
      this.updateActions(actionElements);
      this.actionElements = actionElements;
    };
    this.menuButtonKeyUp = (event) => {
      const { key } = event;
      const { actionElements } = this;
      if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
      if (!actionElements.length) {
        return;
      }
      this.toggleOpen(true);
      this.handleActionNavigation(key, actionElements);
    };
    this.menuButtonKeyDown = (event) => {
      const { key } = event;
      if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
    };
    this.menuActionsContainerKeyDown = (event) => {
      const { key } = event;
      const { actionElements, activeMenuItemIndex } = this;
      if (key === "Tab") {
        this.open = false;
        return;
      }
      if (key === " " || key === "Enter") {
        event.preventDefault();
        const action = actionElements[activeMenuItemIndex];
        action ? action.click() : this.toggleOpen(false);
        return;
      }
      if (this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
        event.preventDefault();
      }
    };
    this.menuActionsContainerKeyUp = (event) => {
      const { key } = event;
      const { actionElements } = this;
      if (key === "Escape") {
        this.toggleOpen(false);
        return;
      }
      if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
      if (!actionElements.length) {
        return;
      }
      this.handleActionNavigation(key, actionElements);
    };
    this.handleActionNavigation = (key, actions) => {
      const currentIndex = this.activeMenuItemIndex;
      if (key === "Home") {
        this.activeMenuItemIndex = 0;
      }
      if (key === "End") {
        this.activeMenuItemIndex = actions.length - 1;
      }
      if (key === "ArrowUp") {
        this.activeMenuItemIndex = array.getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
      }
      if (key === "ArrowDown") {
        this.activeMenuItemIndex = array.getRoundRobinIndex(currentIndex + 1, actions.length);
      }
    };
    this.toggleOpen = (value = !this.open) => {
      this.open = value;
      this.activeMenuItemIndex = -1;
      clearTimeout(this.menuFocusTimeout);
      if (value) {
        this.menuFocusTimeout = window.setTimeout(() => dom.focusElement(this.menuEl), MENU_ANIMATION_DELAY_MS);
      }
      else {
        dom.focusElement(this.menuButtonEl);
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });
    this.getActions();
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }
  expandedHandler() {
    this.open = false;
  }
  activeMenuItemIndexHandler() {
    this.updateActions(this.actionElements);
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderMenuButton() {
    const { menuButtonId, menuId, open, intlOptions, expanded } = this;
    const optionsText = intlOptions || TEXT.options;
    return (index.h("calcite-action", { active: open, "aria-controls": menuId, "aria-expanded": open.toString(), "aria-haspopup": "true", class: CSS.menuButton, icon: ICONS.menu, id: menuButtonId, label: optionsText, onClick: this.menuButtonClick, onKeyDown: this.menuButtonKeyDown, onKeyUp: this.menuButtonKeyUp, ref: this.setMenuButtonRef, text: optionsText, textEnabled: expanded }));
  }
  renderMenuItems() {
    const { actionElements, activeMenuItemIndex, open, menuButtonId, menuId, menuButtonEl, intlOptions, offsetDistance, placement } = this;
    const label = intlOptions || TEXT.options;
    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = (activeAction === null || activeAction === void 0 ? void 0 : activeAction.id) || null;
    return (index.h("calcite-popover", { disablePointer: true, label: label, offsetDistance: offsetDistance, open: open, placement: placement, referenceElement: menuButtonEl }, index.h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonId, class: CSS.menu, id: menuId, onKeyDown: this.menuActionsContainerKeyDown, onKeyUp: this.menuActionsContainerKeyUp, ref: (el) => (this.menuEl = el), role: "menu", tabIndex: -1 }, index.h("slot", null))));
  }
  render() {
    return (index.h(index.Host, null, this.renderMenuButton(), this.renderMenuItems()));
  }
  isValidKey(key, supportedKeys) {
    return !!supportedKeys.find((k) => k === key);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"],
    "activeMenuItemIndex": ["activeMenuItemIndexHandler"]
  }; }
};
CalciteActionMenu.style = calciteActionMenuCss;

const calcitePopoverCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:900;transform:scale(0)}.calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:var(--calcite-border-radius)}:host([data-popper-placement^=bottom]) .calcite-popper-anim{transform:translateY(-5px)}:host([data-popper-placement^=top]) .calcite-popper-anim{transform:translateY(5px)}:host([data-popper-placement^=left]) .calcite-popper-anim{transform:translateX(5px)}:host([data-popper-placement^=right]) .calcite-popper-anim{transform:translateX(-5px)}:host([data-popper-placement]) .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:\"\";box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top]) .arrow{bottom:-4px}:host([data-popper-placement^=bottom]) .arrow{top:-4px}:host([data-popper-placement^=left]) .arrow{right:-4px}:host([data-popper-placement^=right]) .arrow{left:-4px}:host{pointer-events:none}:host([open]){pointer-events:initial}.container{background-color:var(--calcite-ui-foreground-1);position:relative;display:flex;overflow:hidden;flex-wrap:nowrap;flex-direction:column;color:var(--calcite-ui-text-1)}.content{display:flex;flex-direction:row;justify-content:space-between;justify-content:flex-start;line-height:1.5rem}.close-button{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.close-button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.close-button{display:block;padding:0.75rem;border-style:none;color:var(--calcite-ui-text-1);cursor:pointer;background-color:var(--calcite-ui-foreground-1);flex:0 0 auto;border-radius:0 var(--calcite-border-radius) 0 0;z-index:1}.close-button:hover{background-color:var(--calcite-ui-foreground-2)}.close-button:active{background-color:var(--calcite-ui-foreground-3)}.calcite--rtl .close-button{border-radius:var(--calcite-border-radius) 0 0 0}.image-container{overflow:hidden;max-height:200px;margin:5px}slot[name=image]::slotted(img){height:auto;width:100%;object-fit:cover;max-height:200px;object-position:50% 50%}::slotted(calcite-panel),::slotted(calcite-flow){height:100%}";

const CalcitePopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calcitePopoverClose = index.createEvent(this, "calcitePopoverClose", 7);
    this.calcitePopoverOpen = index.createEvent(this, "calcitePopoverOpen", 7);
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
    this.offsetDistance = popper.defaultOffsetDistance;
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
    this.intlClose = resources.TEXT.close;
    this._referenceElement = this.getReferenceElement();
    this.guid = `calcite-popover-${guid.guid()}`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.getId = () => {
      return this.el.id || this.guid;
    };
    this.setExpandedAttr = () => {
      const { _referenceElement, open } = this;
      if (!_referenceElement) {
        return;
      }
      _referenceElement.setAttribute(resources.ARIA_EXPANDED, open.toString());
    };
    this.addReferences = () => {
      const { _referenceElement } = this;
      if (!_referenceElement) {
        return;
      }
      const id = this.getId();
      _referenceElement.setAttribute(resources.POPOVER_REFERENCE, id);
      _referenceElement.setAttribute(resources.ARIA_CONTROLS, id);
      this.setExpandedAttr();
    };
    this.removeReferences = () => {
      const { _referenceElement } = this;
      if (!_referenceElement) {
        return;
      }
      _referenceElement.removeAttribute(resources.POPOVER_REFERENCE);
      _referenceElement.removeAttribute(resources.ARIA_CONTROLS);
      _referenceElement.removeAttribute(resources.ARIA_EXPANDED);
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
    this.setExpandedAttr();
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
    const { popper: popper$1, el, placement } = this;
    const modifiers = this.getModifiers();
    popper$1
      ? popper.updatePopper({
        el,
        modifiers,
        placement,
        popper: popper$1
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
    this.popper = popper.createPopper({
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
    return this.el.querySelector("[slot=image]") ? (index.h("div", { class: resources.CSS.imageContainer }, index.h("slot", { name: "image" }))) : null;
  }
  renderCloseButton() {
    const { closeButton, intlClose } = this;
    return closeButton ? (index.h("button", { "aria-label": intlClose, class: { [resources.CSS.closeButton]: true }, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), title: intlClose }, index.h("calcite-icon", { icon: "x", scale: "m" }))) : null;
  }
  render() {
    const { _referenceElement, el, label, open, disablePointer } = this;
    const rtl = dom.getElementDir(el) === "rtl";
    const displayed = _referenceElement && open;
    const hidden = !displayed;
    const arrowNode = !disablePointer ? (index.h("div", { class: resources.CSS.arrow, ref: (arrowEl) => (this.arrowEl = arrowEl) })) : null;
    return (index.h(index.Host, { "aria-hidden": hidden.toString(), "aria-label": label, "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" }, index.h("div", { class: {
        [resources$1.CSS_UTILITY.rtl]: rtl,
        [popper.CSS.animation]: true,
        [popper.CSS.animationActive]: displayed
      } }, arrowNode, index.h("div", { class: resources.CSS.container }, this.renderImage(), index.h("div", { class: resources.CSS.content }, index.h("slot", null), this.renderCloseButton())))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "offsetDistance": ["offsetDistanceOffsetHandler"],
    "offsetSkidding": ["offsetSkiddingHandler"],
    "open": ["openHandler"],
    "placement": ["placementHandler"],
    "referenceElement": ["referenceElementHandler"]
  }; }
};
CalcitePopover.style = calcitePopoverCss;

exports.calcite_action_menu = CalciteActionMenu;
exports.calcite_popover = CalcitePopover;
