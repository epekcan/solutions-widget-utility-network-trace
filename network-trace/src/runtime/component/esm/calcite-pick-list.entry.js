import { r as registerInstance, c as createEvent, h, g as getElement } from './index-cbdbef9d.js';
import './dom-b2b7d90d.js';
import 'lodash-es';
import './array-e627ad50.js';
import { I as ICON_TYPES } from './resources-8903dad2.js';
import { m as mutationObserverCallback, d as deselectSiblingItems, s as selectSiblings, h as handleFilter, g as getItemData, k as keyDownHandler, i as initialize, a as initializeObserver, c as cleanUpObserver, r as removeItem, b as calciteListItemChangeHandler, e as calciteListItemValueChangeHandler, f as setUpItems, j as setFocus, L as List } from './shared-list-render-c25e175b.js';

const calcitePickListCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{align-items:stretch;background-color:transparent;display:flex;flex:1 0 auto;flex-flow:column;padding-bottom:var(--calcite-cap-spacing);position:relative}header{background-color:var(--calcite-ui-foreground-1);display:flex;justify-content:flex-end;align-items:stretch;margin-bottom:var(--calcite-spacing-quarter);box-shadow:0 1px 0 var(--calcite-ui-border-3)}header.sticky{position:sticky;top:0;z-index:1}calcite-filter{margin-bottom:1px}calcite-scrim{display:flex;flex:0 0 auto;flex-flow:column;pointer-events:none}:host([loading][disabled]){min-height:2rem}";

const CalcitePickList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteListChange = createEvent(this, "calciteListChange", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
     */
    this.filterEnabled = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Multiple works similar to standard radio buttons and checkboxes.
     * When true, a user can select multiple items at a time.
     * When false, only a single item can be selected at a time
     * and selecting a new item will deselect any other selected items.
     */
    this.multiple = false;
    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------
    this.selectedValues = new Map();
    this.dataForFilter = [];
    this.lastSelectedItem = null;
    this.observer = new MutationObserver(mutationObserverCallback.bind(this));
    this.deselectSiblingItems = deselectSiblingItems.bind(this);
    this.selectSiblings = selectSiblings.bind(this);
    this.handleFilter = handleFilter.bind(this);
    this.getItemData = getItemData.bind(this);
    this.keyDownHandler = keyDownHandler.bind(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    initialize.call(this);
    initializeObserver.call(this);
  }
  disconnectedCallback() {
    cleanUpObserver.call(this);
  }
  calciteListItemRemoveHandler(event) {
    removeItem.call(this, event);
  }
  calciteListItemChangeHandler(event) {
    calciteListItemChangeHandler.call(this, event);
  }
  calciteListItemPropsChangeHandler(event) {
    event.stopPropagation();
    this.setUpFilter();
  }
  calciteListItemValueChangeHandler(event) {
    calciteListItemValueChangeHandler.call(this, event);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setUpItems() {
    setUpItems.call(this, "calcite-pick-list-item");
  }
  setUpFilter() {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  async getSelectedItems() {
    return this.selectedValues;
  }
  async setFocus() {
    return setFocus.call(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  getIconType() {
    return this.multiple ? ICON_TYPES.square : ICON_TYPES.circle;
  }
  render() {
    return h(List, { onKeyDown: this.keyDownHandler, props: this });
  }
  get el() { return getElement(this); }
};
CalcitePickList.style = calcitePickListCss;

export { CalcitePickList as calcite_pick_list };
