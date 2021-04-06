import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir } from './dom-b2b7d90d.js';
import { g as getKey } from './key-040272ec.js';
import { forIn, debounce } from 'lodash-es';
import { u as updatePopper, c as createPopper, C as CSS } from './popper-47c2d00a.js';

const filter = (data, value) => {
  const regex = new RegExp(value, "ig");
  if (data.length === 0) {
    console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  }
  const find = (input, RE) => {
    let found = false;
    forIn(input, (val) => {
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

const calciteComboboxCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:relative}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host([scale=s]){font-size:12px;--calcite-combobox-item-spacing-unit-l:12px;--calcite-combobox-item-spacing-unit-s:8px}:host([scale=m]){font-size:14px;--calcite-combobox-item-spacing-unit-l:16px;--calcite-combobox-item-spacing-unit-s:12px}:host([scale=l]){font-size:16px;--calcite-combobox-item-spacing-unit-l:20px;--calcite-combobox-item-spacing-unit-s:16px}[role=combobox]{display:flex}input{flex-grow:1;font-size:inherit;font-family:inherit;padding:var(--calcite-combobox-item-spacing-unit-s) var(--calcite-combobox-item-spacing-unit-l);background-color:var(--calcite-ui-foreground-1);border:1px solid var(--calcite-ui-border-1);color:1px solid var(--calcite-ui-text-1);outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}input:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.list-container{display:block;position:absolute;z-index:999;top:-999999px;left:-999999px;visibility:hidden;pointer-events:none}.list-container .calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:var(--calcite-border-radius)}.list-container[data-popper-placement^=bottom] .calcite-popper-anim{transform:translateY(-5px)}.list-container[data-popper-placement^=top] .calcite-popper-anim{transform:translateY(5px)}.list-container[data-popper-placement^=left] .calcite-popper-anim{transform:translateX(5px)}.list-container[data-popper-placement^=right] .calcite-popper-anim{transform:translateX(-5px)}.list-container[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}:host([active]) .list-container{width:100%;pointer-events:initial;visibility:visible}.list{display:block;margin:0;padding:0;max-height:100vh;width:var(--calcite-dropdown-width);background:var(--calcite-ui-foreground-1);overflow:hidden;overflow-y:scroll}.selections calcite-chip{margin-right:var(--calcite-combobox-item-spacing-unit-s);margin-bottom:var(--calcite-combobox-item-spacing-unit-s)}.selections calcite-chip:last-child{margin-right:0}:host([dir=rtl]) .selections calcite-chip{margin-right:unset;margin-left:var(--calcite-combobox-item-spacing-unit-s)}:host([dir=rtl]) .selections calcite-chip:last-child{margin-left:0}.item{display:block}";

const COMBO_BOX_ITEM = "calcite-combobox-item";
const DEFAULT_PLACEMENT = "bottom-start";
const CalciteCombobox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteLookupChange = createEvent(this, "calciteLookupChange", 7);
    this.calciteComboboxChipDismiss = createEvent(this, "calciteComboboxChipDismiss", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    this.active = false;
    this.disabled = false;
    /** specify the scale of the combobox, defaults to m */
    this.scale = "m";
    this.items = [];
    this.selectedItems = [];
    this.visibleItems = [];
    this.textInput = null;
    this.observer = null;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setInactiveIfNotContained = (target) => {
      if (!this.active || this.el.contains(target)) {
        return;
      }
      this.active = false;
    };
    this.setMenuEl = (el) => {
      this.menuEl = el;
    };
    this.setReferenceEl = (el) => {
      this.referenceEl = el;
    };
    this.inputHandler = (event) => {
      const target = event.target;
      this.filterItems(target.value);
    };
    this.handleInputKeyDown = (event) => {
      if (event.target === this.textInput) {
        const key = getKey(event.key);
        if (event.shiftKey && key === "Tab") {
          return;
        }
        else if (key === "Escape") {
          this.active = false;
        }
        else if (key === "ArrowDown") {
          this.focusFirstItem();
        }
        else if (key === "ArrowUp") {
          this.focusLastItem();
        }
        else {
          this.active = true;
          this.textInput.focus();
        }
      }
    };
    this.filterItems = debounce((value) => {
      const filteredData = filter(this.data, value);
      const values = filteredData.map((item) => item.value);
      this.items.forEach((item) => {
        item.hidden = values.indexOf(item.value) === -1;
        // If item is nested inside another item...
        const { parentItem } = item;
        if (parentItem) {
          // If the parent item is a match, show me.
          if (values.indexOf(parentItem.value) !== -1) {
            item.hidden = false;
          }
          // If I am a match, show my parent.
          if (values.indexOf(item.value) !== -1) {
            parentItem.hidden = false;
          }
        }
      });
      this.visibleItems = this.getVisibleItems();
    }, 100);
    this.comboboxFocusHandler = () => {
      this.active = true;
    };
    this.comboboxBlurHandler = (event) => {
      const relatedTarget = event.relatedTarget;
      this.setInactiveIfNotContained(relatedTarget);
    };
  }
  activeHandler() {
    this.reposition();
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
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
    this.destroyPopper();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async reposition() {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el: menuEl,
        modifiers,
        placement: DEFAULT_PLACEMENT,
        popper
      })
      : this.createPopper();
  }
  documentClickHandler(event) {
    const target = event.target;
    this.setInactiveIfNotContained(target);
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
    this.popper = createPopper({
      el: menuEl,
      modifiers,
      placement: DEFAULT_PLACEMENT,
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
  toggleSelection(item, value = !item.selected) {
    item.selected = value;
    this.selectedItems = this.getSelectedItems();
    this.calciteLookupChange.emit(this.selectedItems);
  }
  getVisibleItems() {
    return this.items.filter((item) => !item.hidden);
  }
  getSelectedItems() {
    return this.items.filter((item) => item.selected);
  }
  updateItems() {
    this.items = this.getItems();
    this.data = this.getData();
    this.selectedItems = this.getSelectedItems();
    this.visibleItems = this.getVisibleItems();
  }
  getData() {
    return this.items.map((item) => ({
      value: item.value,
      label: item.textLabel
    }));
  }
  getItems() {
    const items = Array.from(this.el.querySelectorAll(COMBO_BOX_ITEM));
    return items
      .filter((item) => !item.disabled)
      .map((item) => {
      const { parentElement } = item;
      item.parentItem = parentElement.matches(COMBO_BOX_ITEM)
        ? parentElement
        : null;
      return item;
    });
  }
  calciteComboboxItemKeyEventHandler(event) {
    const { item, event: keyboardEvent } = event.detail;
    const isFirstItem = this.itemIndex(item) === 0;
    const isLastItem = this.itemIndex(item) === this.items.length - 1;
    const shiftKey = keyboardEvent.shiftKey;
    const keyCode = getKey(keyboardEvent.key);
    switch (keyCode) {
      case "Tab":
        if (isFirstItem && shiftKey)
          this.closeCalciteCombobox();
        if (isLastItem && !shiftKey)
          this.closeCalciteCombobox();
        else if (isFirstItem && shiftKey)
          this.textInput.focus();
        else if (shiftKey)
          this.focusPrevItem(item);
        else
          this.focusNextItem(item);
        break;
      case "ArrowDown":
        this.focusNextItem(item);
        break;
      case "ArrowUp":
        this.focusPrevItem(item);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
      case "Escape":
        this.closeCalciteCombobox();
        break;
    }
  }
  closeCalciteCombobox() {
    this.textInput.focus();
    this.active = false;
  }
  focusFirstItem() {
    const firstItem = this.items[0];
    firstItem.focus();
  }
  focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    lastItem.focus();
  }
  focusNextItem(item) {
    const index = this.itemIndex(item);
    const nextItem = this.items[index + 1] || this.items[0];
    nextItem.focus();
  }
  focusPrevItem(item) {
    const index = this.itemIndex(item);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    prevItem.focus();
  }
  itemIndex(item) {
    return this.items.indexOf(item);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    const { active, disabled, el, label, placeholder, scale, selectedItems } = this;
    const dir = getElementDir(el);
    const listBoxId = "listbox";
    return (h(Host, { active: active, dir: dir }, h("div", { class: "selections" }, selectedItems.map((item) => {
      return (h("calcite-chip", { dir: dir, dismissible: true, key: item.value, scale: scale, value: item.value }, item.textLabel));
    })), h("div", { "aria-expanded": active.toString(), "aria-haspopup": "listbox", "aria-owns": listBoxId, ref: this.setReferenceEl, role: "combobox" }, h("input", { "aria-autocomplete": "list", "aria-controls": listBoxId, "aria-label": label, disabled: disabled, onBlur: this.comboboxBlurHandler, onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, onKeyDown: this.handleInputKeyDown, placeholder: placeholder, ref: (el) => (this.textInput = el), type: "text" })), h("div", { "aria-hidden": (!active).toString(), class: "list-container", ref: this.setMenuEl }, h("ul", { "aria-label": label, "aria-multiselectable": "true", class: {
        list: true,
        [CSS.animation]: true,
        [CSS.animationActive]: active
      }, id: listBoxId, role: "listbox" }, h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"]
  }; }
};
CalciteCombobox.style = calciteComboboxCss;

export { CalciteCombobox as calcite_combobox };
