'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const key = require('./key-d6a0381e.js');
const guid = require('./guid-f05bb751.js');
const debounce = require('./debounce-28722521.js');
const forIn = require('./forIn-74399451.js');
const popper = require('./popper-1fd7a0cb.js');
const utils = require('./utils-62e32488.js');

const filter = (data, value) => {
  const regex = new RegExp(value, "ig");
  if (data.length === 0) {
    console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  }
  const find = (input, RE) => {
    let found = false;
    forIn.forIn(input, (val) => {
      if (typeof val === "function") {
        return;
      }
      if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
        if (find(val, RE)) {
          found = true;
        }
      }
      else if (RE.test(val)) {
        found = true;
      }
    });
    return found;
  };
  const result = data.filter((item) => {
    return find(item, regex);
  });
  return result;
};

const calciteComboboxCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:relative}:host([disabled]){pointer-events:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;opacity:0.5}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-m:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1.25rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-m:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1.25rem;--calcite-combobox-item-spacing-unit-m:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:2.5rem}.wrapper{display:flex;flex-wrap:wrap;padding:var(--calcite-combobox-item-spacing-unit-m) var(--calcite-combobox-item-spacing-unit-l) 0 var(--calcite-combobox-item-spacing-unit-l);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-border-1);color:var(--calcite-ui-text-1);outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.wrapper--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.wrapper--single{padding:var(--calcite-combobox-item-spacing-unit-s) var(--calcite-combobox-item-spacing-unit-m);cursor:pointer}.input{flex-grow:1;font-size:inherit;font-family:inherit;padding:0;background-color:transparent;border:none;color:var(--calcite-ui-text-1);-webkit-appearance:none;appearance:none;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);min-width:120px;margin-top:1px;margin-bottom:var(--calcite-combobox-item-spacing-unit-m)}.input:focus{outline:none}.input--transparent{opacity:0}.input--single{margin-bottom:0;margin-top:0;cursor:pointer;padding:0}.wrapper--active .input-single{cursor:text}.input--hidden{width:0;min-width:0;opacity:0;pointer-events:none}.input--icon{padding:0 var(--calcite-combobox-item-spacing-unit-m)}.input-wrap{display:flex}.input-wrap--single{flex:1 1 auto}.label{height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);padding:0;display:block;flex:1 1 auto;pointer-events:none}.label--spaced{padding:0 var(--calcite-combobox-item-spacing-unit-m)}.icon-end,.icon-start{cursor:pointer;display:flex;align-items:center;width:var(--calcite-combobox-item-spacing-unit-l)}.popper-container{display:block;position:absolute;z-index:900;transform:scale(0);visibility:hidden;pointer-events:none;width:100%}.popper-container .calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:var(--calcite-border-radius)}.popper-container[data-popper-placement^=bottom] .calcite-popper-anim{transform:translateY(-5px)}.popper-container[data-popper-placement^=top] .calcite-popper-anim{transform:translateY(5px)}.popper-container[data-popper-placement^=left] .calcite-popper-anim{transform:translateX(5px)}.popper-container[data-popper-placement^=right] .calcite-popper-anim{transform:translateX(-5px)}.popper-container[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}:host([active]) .popper-container{pointer-events:initial;visibility:visible}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{overflow-y:auto;max-height:100vh;width:var(--calcite-dropdown-width);background:var(--calcite-ui-foreground-1)}.list{display:block;margin:0;padding:0}.list--hide{height:0;overflow:hidden}.chip{margin-right:var(--calcite-combobox-item-spacing-unit-s);margin-bottom:var(--calcite-combobox-item-spacing-unit-s)}.chip--active{background-color:var(--calcite-ui-foreground-3)}.chip:last-child{margin-right:0}:host([dir=rtl]) .chip{margin-right:unset;margin-left:var(--calcite-combobox-item-spacing-unit-m)}:host([dir=rtl]) .chip:last-child{margin-left:0}.item{display:block}";

const CalciteCombobox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteLookupChange = index.createEvent(this, "calciteLookupChange", 7);
    this.calciteComboboxFilterChange = index.createEvent(this, "calciteComboboxFilterChange", 7);
    this.calciteComboboxChipDismiss = index.createEvent(this, "calciteComboboxChipDismiss", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Open and close combobox */
    this.active = false;
    /** Disable combobox input */
    this.disabled = false;
    /** Specify the maximum number of combobox items (including nested children) to display before showing the scroller */
    this.maxItems = 0;
    /** specify the selection mode
     * - multi: allow any number of selected items (default)
     * - single: only one selection)
     * - ancestors: like multi, but show ancestors of selected items as selected, only deepest children shown in chips
     */
    this.selectionMode = "multi";
    /** Specify the scale of the combobox, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.items = [];
    this.groupItems = [];
    this.selectedItems = [];
    this.visibleItems = [];
    this.hideList = !this.active;
    this.activeItemIndex = -1;
    this.activeChipIndex = -1;
    this.activeDescendant = "";
    this.text = "";
    this.textInput = null;
    this.observer = null;
    this.guid = guid.guid();
    /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
    this.maxScrollerHeight = 0;
    this.inputHeight = 0;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setFocusClick = () => {
      this.setFocus();
    };
    this.setInactiveIfNotContained = (event) => {
      if (!this.active || event.composedPath().includes(this.el)) {
        return;
      }
      if (this.selectionMode === "single") {
        this.textInput.value = "";
        this.text = "";
        this.filterItems("");
        this.updateActiveItemIndex(-1);
      }
      this.active = false;
    };
    this.setMenuEl = (el) => {
      this.menuEl = el;
    };
    this.setListContainerEl = (el) => {
      this.listContainerEl = el;
    };
    this.setReferenceEl = (el) => {
      this.referenceEl = el;
    };
    this.inputHandler = (event) => {
      const value = event.target.value;
      this.text = value;
      this.filterItems(value);
      if (value) {
        this.activeChipIndex = -1;
      }
    };
    this.getTextValue = (el) => {
      return el
        ? el.tagName === utils.ComboboxItemGroup
          ? el.label
          : el.value
        : null;
    };
    this.filterItems = debounce.debounce((value) => {
      const filteredData = filter(this.data, value);
      const values = filteredData.map((item) => item.value);
      const items = this.getCombinedItems();
      items.forEach((item) => {
        const hidden = !values.includes(this.getTextValue(item));
        item.hidden = hidden;
        const [parent, grandparent] = item.ancestors;
        if ((parent || grandparent) &&
          (values.includes(this.getTextValue(parent)) ||
            values.includes(this.getTextValue(grandparent)))) {
          item.hidden = false;
        }
        if (!hidden) {
          item.ancestors.forEach((anscestor) => (anscestor.hidden = false));
        }
      });
      this.visibleItems = this.getVisibleItems();
      this.calciteComboboxFilterChange.emit({ visibleItems: [...this.visibleItems], text: value });
    }, 100);
    this.updateItems = () => {
      this.items = this.getItems();
      this.groupItems = this.getGroupItems();
      this.data = this.getData();
      this.selectedItems = this.getSelectedItems();
      this.visibleItems = this.getVisibleItems();
      this.needsIcon = this.getNeedsIcon();
      if (this.selectionMode === "single" && this.selectedItems.length) {
        this.selectedItem = this.selectedItems[0];
      }
    };
    this.comboboxFocusHandler = () => {
      this.active = true;
      this.textInput.focus();
    };
    this.comboboxBlurHandler = (event) => {
      this.setInactiveIfNotContained(event);
    };
  }
  activeHandler(newValue, oldValue) {
    clearTimeout(this.hideListTimeout);
    // when closing, wait transition time then hide to prevent overscroll
    if (oldValue && !newValue) {
      this.hideListTimeout = window.setTimeout(() => {
        this.hideList = true;
      }, utils.ComboboxTransitionDuration);
    }
    else if (!oldValue && newValue) {
      this.hideList = false;
    }
    this.reposition();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  documentClickHandler(event) {
    this.setInactiveIfNotContained(event);
  }
  calciteComboboxItemChangeHandler(event) {
    this.toggleSelection(event.detail);
  }
  calciteChipDismissHandler(event) {
    var _a;
    this.active = false;
    const value = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.value;
    const comboboxItem = this.items.find((item) => item.value === value);
    if (comboboxItem) {
      this.toggleSelection(comboboxItem, false);
    }
    this.calciteComboboxChipDismiss.emit(event.detail);
  }
  keydownHandler(event) {
    const key$1 = key.getKey(event.key, dom.getElementDir(this.el));
    switch (key$1) {
      case "Tab":
        this.activeChipIndex = -1;
        this.activeItemIndex = -1;
        this.active = false;
        break;
      case "ArrowLeft":
        this.previousChip();
        break;
      case "ArrowRight":
        this.nextChip();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.active = true;
        this.shiftActiveItemIndex(-1);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.active = true;
        this.shiftActiveItemIndex(1);
        break;
      case "Home":
        this.active = true;
        this.updateActiveItemIndex(0);
        break;
      case "End":
        this.active = true;
        this.updateActiveItemIndex(this.visibleItems.length - 1);
        break;
      case "Escape":
        this.active = false;
        break;
      case "Enter":
        if (this.activeItemIndex > -1) {
          this.toggleSelection(this.visibleItems[this.activeItemIndex]);
        }
        else if (this.activeChipIndex > -1) {
          this.removeActiveChip();
        }
        else if (this.allowCustomValues && this.text) {
          this.addCustomChip(this.text);
        }
        break;
      case "Delete":
      case "Backspace":
        if (this.activeChipIndex > -1) {
          this.removeActiveChip();
        }
        else if (!this.text && this.isMulti()) {
          this.removeLastChip();
        }
        break;
      default:
        if (!this.active) {
          this.setFocus();
        }
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async reposition() {
    const { popper: popper$1, menuEl } = this;
    const modifiers = this.getModifiers();
    popper$1
      ? popper.updatePopper({
        el: menuEl,
        modifiers,
        placement: utils.ComboboxDefaultPlacement,
        popper: popper$1
      })
      : this.createPopper();
  }
  async setFocus() {
    var _a;
    this.active = true;
    (_a = this.textInput) === null || _a === void 0 ? void 0 : _a.focus();
    this.activeChipIndex = -1;
    this.activeItemIndex = -1;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    {
      this.observer = new MutationObserver(this.updateItems);
    }
    this.createPopper();
  }
  componentWillLoad() {
    this.updateItems();
  }
  componentDidLoad() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    this.maxScrollerHeight = this.getMaxScrollerHeight(this.getCombinedItems());
  }
  componentDidRender() {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition();
      this.inputHeight = this.el.offsetHeight;
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
    this.destroyPopper();
  }
  /** when search text is cleared, reset active to  */
  textHandler() {
    this.updateActiveItemIndex(-1);
  }
  getModifiers() {
    const flipModifier = {
      name: "flip",
      enabled: true
    };
    flipModifier.options = {
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };
    return [flipModifier];
  }
  createPopper() {
    this.destroyPopper();
    const { menuEl, referenceEl } = this;
    const modifiers = this.getModifiers();
    this.popper = popper.createPopper({
      el: menuEl,
      modifiers,
      placement: utils.ComboboxDefaultPlacement,
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
  getMaxScrollerHeight(items) {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;
    items.forEach((item) => {
      if (itemsToProcess < maxItems && maxItems > 0) {
        maxScrollerHeight += this.calculateSingleItemHeight(item);
        itemsToProcess++;
      }
    });
    return maxScrollerHeight;
  }
  calculateSingleItemHeight(item) {
    let height = item.offsetHeight;
    // if item has children items, don't count their height twice
    const children = item.querySelectorAll(utils.ComboboxChildSelector);
    children.forEach((child) => {
      height -= child.offsetHeight;
    });
    return height;
  }
  getCombinedItems() {
    return [...this.groupItems, ...this.items];
  }
  toggleSelection(item, value = !item.selected) {
    if (!item) {
      return;
    }
    if (this.isMulti()) {
      item.selected = value;
      this.updateAncestors(item);
      this.selectedItems = this.getSelectedItems();
      this.calciteLookupChange.emit(this.selectedItems);
      this.resetText();
      this.textInput.focus();
      this.filterItems("");
    }
    else {
      this.items.forEach((el) => el.toggleSelected(false));
      item.toggleSelected(true);
      this.selectedItem = item;
      this.textInput.value = item.textLabel;
      this.active = false;
      this.updateActiveItemIndex(-1);
      this.resetText();
      this.filterItems("");
    }
  }
  updateAncestors(item) {
    if (this.selectionMode !== "ancestors") {
      return;
    }
    const ancestors = utils.getItemAncestors(item);
    const children = utils.getItemChildren(item);
    if (item.selected) {
      ancestors.forEach((el) => {
        el.selected = true;
      });
    }
    else {
      children.forEach((el) => (el.selected = false));
      [...ancestors].forEach((el) => {
        if (!utils.hasActiveChildren(el)) {
          el.selected = false;
        }
      });
    }
  }
  getVisibleItems() {
    return this.items.filter((item) => !item.hidden);
  }
  getSelectedItems() {
    return (this.items
      .filter((item) => item.selected && (this.selectionMode !== "ancestors" || !utils.hasActiveChildren(item)))
      /** Preserve order of entered tags */
      .sort((a, b) => {
      const aIdx = this.selectedItems.indexOf(a);
      const bIdx = this.selectedItems.indexOf(b);
      if (aIdx > -1 && bIdx > -1) {
        return aIdx - bIdx;
      }
      return bIdx - aIdx;
    }));
  }
  getData() {
    return this.items.map((item) => ({
      value: item.value,
      label: item.textLabel,
      guid: item.guid
    }));
  }
  getNeedsIcon() {
    return this.selectionMode === "single" && this.items.some((item) => item.icon);
  }
  resetText() {
    this.textInput.value = "";
    this.text = "";
  }
  getItems() {
    const items = Array.from(this.el.querySelectorAll(utils.ComboboxItem));
    return items.filter((item) => !item.disabled);
  }
  getGroupItems() {
    return Array.from(this.el.querySelectorAll(utils.ComboboxItemGroup));
  }
  addCustomChip(value) {
    const existingItem = this.items.find((el) => el.value === value || el.textLabel === value);
    if (existingItem) {
      this.toggleSelection(existingItem, true);
    }
    else {
      const item = document.createElement(utils.ComboboxItem);
      item.value = value;
      item.textLabel = value;
      item.guid = guid.guid();
      item.selected = true;
      this.el.appendChild(item);
      this.resetText();
      this.setFocus();
      this.updateItems();
      this.filterItems("");
    }
  }
  removeActiveChip() {
    this.toggleSelection(this.selectedItems[this.activeChipIndex], false);
    this.setFocus();
  }
  removeLastChip() {
    this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
    this.setFocus();
  }
  previousChip() {
    if (this.text) {
      return;
    }
    const length = this.selectedItems.length - 1;
    const active = this.activeChipIndex;
    this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
    this.updateActiveItemIndex(-1);
    this.focusChip();
  }
  nextChip() {
    if (this.text || this.activeChipIndex === -1) {
      return;
    }
    const last = this.selectedItems.length - 1;
    const newIndex = this.activeChipIndex + 1;
    if (newIndex > last) {
      this.activeChipIndex = -1;
      this.setFocus();
    }
    else {
      this.activeChipIndex = newIndex;
      this.focusChip();
    }
    this.updateActiveItemIndex(-1);
  }
  focusChip() {
    var _a;
    const guid = (_a = this.selectedItems[this.activeChipIndex]) === null || _a === void 0 ? void 0 : _a.guid;
    const chip = this.referenceEl.querySelector(`#chip-${guid}`);
    chip === null || chip === void 0 ? void 0 : chip.setFocus();
  }
  shiftActiveItemIndex(delta) {
    const length = this.visibleItems.length;
    const newIndex = (this.activeItemIndex + length + delta) % length;
    this.updateActiveItemIndex(newIndex);
    // ensure active item is in view if we have scrolling
    const activeItem = this.visibleItems[this.activeItemIndex];
    const height = this.calculateSingleItemHeight(activeItem);
    const { offsetHeight, scrollTop } = this.listContainerEl;
    if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
      this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
    }
    else if (activeItem.offsetTop < scrollTop) {
      this.listContainerEl.scrollTop = activeItem.offsetTop;
    }
  }
  updateActiveItemIndex(index) {
    this.activeItemIndex = index;
    let activeDescendant = null;
    this.visibleItems.forEach((el, i) => {
      if (i === index) {
        el.active = true;
        activeDescendant = el.guid;
      }
      else {
        el.active = false;
      }
    });
    this.activeDescendant = activeDescendant;
    if (this.activeItemIndex > -1) {
      this.activeChipIndex = -1;
      this.textInput.focus();
    }
  }
  isMulti() {
    return this.selectionMode === "multi" || this.selectionMode === "ancestors";
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderChips() {
    const { activeChipIndex, scale, selectionMode } = this;
    return this.selectedItems.map((item, i) => {
      const chipClasses = { chip: true, "chip--active": activeChipIndex === i };
      const ancestors = [...utils.getItemAncestors(item)].reverse();
      const pathLabel = [...ancestors, item].map((el) => el.textLabel);
      const label = selectionMode !== "ancestors" ? item.textLabel : pathLabel.join(" / ");
      return (index.h("calcite-chip", { class: chipClasses, dismissLabel: "remove tag", dismissible: true, icon: item.icon, id: `chip-${item.guid}`, key: item.value, scale: scale, value: item.value }, label));
    });
  }
  renderInput() {
    const { active, disabled, placeholder, selectionMode, needsIcon, label } = this;
    const single = selectionMode === "single";
    const showLabel = !active && single && !!this.selectedItem;
    return (index.h("span", { class: {
        "input-wrap": true,
        "input-wrap--single": single
      } }, showLabel && (index.h("span", { class: {
        label: true,
        "label--spaced": needsIcon
      }, key: "label", onFocus: this.comboboxFocusHandler, tabindex: "0" }, this.selectedItem.textLabel)), index.h("input", { "aria-activedescendant": this.activeDescendant, "aria-autocomplete": "list", "aria-controls": guid.guid, "aria-label": label, class: {
        input: true,
        "input--transparent": this.activeChipIndex > -1,
        "input--single": single,
        "input--hidden": showLabel,
        "input--icon": single && needsIcon
      }, disabled: disabled, id: `${guid.guid}-input`, key: "input", onBlur: this.comboboxBlurHandler, onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, placeholder: placeholder, ref: (el) => (this.textInput = el), type: "text" })));
  }
  renderListBoxOptions() {
    return this.visibleItems.map((item) => (index.h("li", { "aria-selected": (!!item.selected).toString(), id: item.guid, role: "option", tabindex: "-1" }, item.textLabel || item.value)));
  }
  renderPopperContainer() {
    const { active, maxScrollerHeight, setMenuEl, setListContainerEl, hideList } = this;
    const classes = {
      "list-container": true,
      [popper.CSS.animation]: true,
      [popper.CSS.animationActive]: active
    };
    const style = {
      maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
    };
    return (index.h("div", { "aria-hidden": "true", class: "popper-container", ref: setMenuEl }, index.h("div", { class: classes, ref: setListContainerEl, style: style }, index.h("ul", { class: { list: true, "list--hide": hideList } }, index.h("slot", null)))));
  }
  renderIconStart() {
    const { selectionMode, needsIcon, selectedItem } = this;
    const scale = this.scale === "l" ? "m" : "s";
    return (selectionMode === "single" &&
      needsIcon && (index.h("span", { class: "icon-start" }, (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) && (index.h("calcite-icon", { class: "selected-icon", icon: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon, scale: scale })))));
  }
  renderIconEnd() {
    const scale = this.scale === "l" ? "m" : "s";
    return (this.selectionMode === "single" && (index.h("span", { class: "icon-end" }, index.h("calcite-icon", { icon: "chevron-down", scale: scale }))));
  }
  render() {
    const { guid, active, el, label } = this;
    const single = this.selectionMode === "single";
    const dir = dom.getElementDir(el);
    const labelId = `${guid}-label`;
    return (index.h(index.Host, { active: active, dir: dir }, index.h("div", { "aria-autocomplete": "list", "aria-expanded": active.toString(), "aria-haspopup": "listbox", "aria-labelledby": labelId, "aria-owns": guid, class: {
        wrapper: true,
        "wrapper--active": active,
        "wrapper--single": single
      }, onClick: this.setFocusClick, ref: this.setReferenceEl, role: "combobox" }, this.renderIconStart(), !single && this.renderChips(), index.h("label", { class: "screen-readers-only", htmlFor: `${guid}-input`, id: labelId }, label), this.renderInput(), this.renderIconEnd()), index.h("ul", { "aria-labelledby": labelId, "aria-multiselectable": "true", class: "screen-readers-only", id: guid, role: "listbox", tabIndex: -1 }, this.renderListBoxOptions()), this.renderPopperContainer()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "text": ["textHandler"]
  }; }
};
CalciteCombobox.style = calciteComboboxCss;

exports.calcite_combobox = CalciteCombobox;
