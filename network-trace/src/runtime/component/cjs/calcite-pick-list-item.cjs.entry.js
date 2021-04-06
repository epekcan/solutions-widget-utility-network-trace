'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const resources$1 = require('./resources-1447adb6.js');
const resources = require('./resources-56abd2fb.js');

const calcitePickListItemCss = "@charset \"UTF-8\";@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{align-items:stretch;display:flex;color:var(--calcite-ui-text-1);box-shadow:0 1px 0 var(--calcite-ui-border-3);margin:0;margin-bottom:1px;transition:background-color 150ms ease-in-out;animation:calcite-fade-in 150ms ease-in-out}:host(:hover){background-color:var(--calcite-ui-foreground-2)}.icon{align-items:center;display:flex;margin-top:0;margin-bottom:0;margin-left:0.5rem;margin-right:0.5rem;opacity:0;color:var(--calcite-ui-brand);flex:0 0 auto;line-height:0}.icon-dot{width:0.5rem;margin:0.5rem}.icon-dot:before{content:\"•\"}:host([selected]) .icon{transition:opacity 150ms ease-in-out;opacity:1}.label{background-color:transparent;display:flex;flex:1 1 auto;padding:0.75rem;align-items:center;cursor:pointer;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.label:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.text-container{display:flex;overflow:hidden;pointer-events:none;padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem;flex-flow:column nowrap}.title{font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word;color:var(--calcite-ui-text-1)}.description{color:var(--calcite-ui-text-3);font-family:var(--calcite-code-family);margin-top:0.25rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word}.actions{align-items:stretch;display:flex;justify-content:flex-end;margin:0;flex:0 0 auto}.actions--start~.label{padding-left:0.25rem}.calcite--rtl .actions--start~.label{padding-left:unset;padding-right:0.25rem}";

const CalcitePickListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListItemChange = index.createEvent(this, "calciteListItemChange", 7);
    this.calciteListItemRemove = index.createEvent(this, "calciteListItemRemove", 7);
    this.calciteListItemPropsChange = index.createEvent(this, "calciteListItemPropsChange", 7);
    this.calciteListItemValueChange = index.createEvent(this, "calciteListItemValueChange", 7);
    /**
     * When true, the item cannot be clicked and is visually muted.
     */
    this.disabled = false;
    /**
     * When false, the item cannot be deselected by user interaction.
     */
    this.disableDeselect = false;
    /**
     * Determines the icon SVG symbol that will be shown. Options are circle, square, grid or null.
     */
    this.icon = null;
    /**
     * Set this to true to display a remove action that removes the item from the list.
     */
    this.removable = false;
    /**
     * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
     */
    this.selected = false;
    /**
     * The text for the remove item buttons. Only applicable if removable is true.
     */
    this.intlRemove = resources.TEXT.remove;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.pickListClickHandler = (event) => {
      if (this.disabled || (this.disableDeselect && this.selected)) {
        return;
      }
      this.shiftPressed = event.shiftKey;
      this.selected = !this.selected;
    };
    this.pickListKeyDownHandler = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        if (this.disableDeselect && this.selected) {
          return;
        }
        this.selected = !this.selected;
      }
    };
    this.removeClickHandler = () => {
      this.calciteListItemRemove.emit();
    };
  }
  descriptionWatchHandler() {
    this.calciteListItemPropsChange.emit();
  }
  labelWatchHandler() {
    this.calciteListItemPropsChange.emit();
  }
  metadataWatchHandler() {
    this.calciteListItemPropsChange.emit();
  }
  selectedWatchHandler() {
    this.calciteListItemChange.emit({
      item: this.el,
      value: this.value,
      selected: this.selected,
      shiftPressed: this.shiftPressed
    });
    this.shiftPressed = false;
  }
  valueWatchHandler(newValue, oldValue) {
    this.calciteListItemValueChange.emit({ oldValue, newValue });
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Used to toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   */
  async toggleSelected(coerce) {
    if (this.disabled) {
      return;
    }
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }
  async setFocus() {
    var _a;
    (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderIcon() {
    const { icon } = this;
    if (!icon) {
      return null;
    }
    return (index.h("span", { class: {
        [resources.CSS.icon]: true,
        [resources.CSS.iconDot]: icon === resources$1.ICON_TYPES.circle
      } }, icon === resources$1.ICON_TYPES.square ? index.h("calcite-icon", { icon: resources.ICONS.checked, scale: "s" }) : null));
  }
  renderRemoveAction() {
    return this.removable ? (index.h("calcite-action", { class: resources.CSS.remove, icon: resources.ICONS.remove, onClick: this.removeClickHandler, slot: resources.SLOTS.actionsEnd, text: this.intlRemove })) : null;
  }
  renderActionsStart() {
    const { el } = this;
    const hasActionsStart = dom.getSlotted(el, resources.SLOTS.actionsStart);
    return hasActionsStart ? (index.h("div", { class: { [resources.CSS.actions]: true, [resources.CSS.actionsStart]: true } }, index.h("slot", { name: resources.SLOTS.actionsStart }))) : null;
  }
  renderActionsEnd() {
    const { el, removable } = this;
    const hasActionsEnd = dom.getSlotted(el, resources.SLOTS.actionsEnd);
    return hasActionsEnd || removable ? (index.h("div", { class: { [resources.CSS.actions]: true, [resources.CSS.actionsEnd]: true } }, index.h("slot", { name: resources.SLOTS.actionsEnd }), this.renderRemoveAction())) : null;
  }
  render() {
    const { description, label } = this;
    return (index.h(index.Host, { "aria-checked": this.selected.toString(), role: "menuitemcheckbox" }, this.renderIcon(), this.renderActionsStart(), index.h("label", { "aria-label": label, class: resources.CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, ref: (focusEl) => (this.focusEl = focusEl), tabIndex: 0 }, index.h("div", { class: resources.CSS.textContainer }, index.h("span", { class: resources.CSS.title }, label), description ? index.h("span", { class: resources.CSS.description }, description) : null)), this.renderActionsEnd()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "description": ["descriptionWatchHandler"],
    "label": ["labelWatchHandler"],
    "metadata": ["metadataWatchHandler"],
    "selected": ["selectedWatchHandler"],
    "value": ["valueWatchHandler"]
  }; }
};
CalcitePickListItem.style = calcitePickListItemCss;

exports.calcite_pick_list_item = CalcitePickListItem;
