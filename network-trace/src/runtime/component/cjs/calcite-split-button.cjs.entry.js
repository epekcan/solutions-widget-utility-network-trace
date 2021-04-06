'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');

const calciteSplitButtonCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host .split-button__container{display:flex;align-items:stretch}:host .split-button__container>calcite-dropdown>calcite-button{height:100%}:host([appearance=solid]):host([color=blue]){--split-button-background:var(--calcite-ui-brand);--split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=solid]):host([color=red]){--split-button-background:var(--calcite-ui-danger);--split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=solid]):host([color=neutral]){--split-button-background:var(--calcite-ui-foreground-3);--split-button-divider:var(--calcite-ui-text-1)}:host([appearance=solid]):host([color=inverse]){--split-button-background:var(--calcite-ui-inverse);--split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=transparent]):host([color=blue]){--split-button-divider:var(--calcite-ui-brand)}:host([appearance=transparent]):host([color=red]){--split-button-divider:var(--calcite-ui-danger)}:host([appearance=transparent]):host([color=neutral]){--split-button-divider:var(--calcite-ui-text-1)}:host([appearance=transparent]):host([color=inverse]){--split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=clear]),:host([appearance=transparent]){--split-button-background:transparent}:host([appearance=outline]){--split-button-background:var(--calcite-ui-foreground-1)}:host([appearance=clear]):host([color=blue]),:host([appearance=outline]):host([color=blue]){--split-button-divider:var(--calcite-ui-brand)}:host([appearance=clear]):host([color=red]),:host([appearance=outline]):host([color=red]){--split-button-divider:var(--calcite-ui-danger)}:host([appearance=clear]):host([color=neutral]),:host([appearance=outline]):host([color=neutral]){--split-button-divider:var(--calcite-ui-foreground-3)}:host([appearance=clear]):host([color=inverse]),:host([appearance=outline]):host([color=inverse]){--split-button-divider:var(--calcite-ui-inverse)}.split-button__divider-container{width:1px;display:flex;align-items:stretch;transition:0.15s ease-in-out;background-color:var(--split-button-background)}.split-button__divider{width:1px;margin-top:0.25rem;margin-bottom:0.25rem;display:inline-block;background-color:var(--split-button-divider)}:host([appearance=outline]) .split-button__divider-container,:host([appearance=clear]) .split-button__divider-container{border-top:1px solid var(--split-button-divider);border-bottom:1px solid var(--split-button-divider)}:host([appearance=outline]):hover .split-button__divider-container,:host([appearance=clear]):hover .split-button__divider-container{background-color:var(--split-button-divider)}:host([appearance=outline]:hover) .split-button__divider-container,:host([appearance=clear]:hover) .split-button__divider-container{background-color:var(--split-button-divider)}:host([appearance=outline]:focus-within):host([color=blue]),:host([appearance=clear]:focus-within):host([color=blue]){--split-button-divider:var(--calcite-brand-press)}:host([appearance=outline]:focus-within):host([color=red]),:host([appearance=clear]:focus-within):host([color=red]){--split-button-divider:var(--calcite-ui-danger-press)}:host([appearance=outline]:focus-within) .split-button__divider-container,:host([appearance=clear]:focus-within) .split-button__divider-container{background-color:var(--split-button-divider)}:host([disabled]) .split-button__divider-container{opacity:0.5}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}";

const CalciteSplitButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteSplitButtonPrimaryClick = index.createEvent(this, "calciteSplitButtonPrimaryClick", 7);
    this.calciteSplitButtonSecondaryClick = index.createEvent(this, "calciteSplitButtonSecondaryClick", 7);
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the control, defaults to blue */
    this.color = "blue";
    /** specify the icon used for the dropdown menu, defaults to chevron */
    this.dropdownIconType = "chevron";
    /** optionally add a calcite-loader component to the control,
     disabling interaction. with the primary button */
    this.loading = false;
    /** specify the scale of the control, defaults to m */
    this.scale = "m";
    this.calciteSplitButtonPrimaryClickHandler = (e) => this.calciteSplitButtonPrimaryClick.emit(e);
    this.calciteSplitButtonSecondaryClickHandler = (e) => this.calciteSplitButtonSecondaryClick.emit(e);
  }
  render() {
    const dir = dom.getElementDir(this.el);
    return (index.h(index.Host, { dir: dir }, index.h("div", { class: "split-button__container" }, index.h("calcite-button", { appearance: this.appearance, "aria-label": this.primaryLabel, color: this.color, dir: dir, disabled: this.disabled, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, iconFlipRtl: this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null, loading: this.loading, onClick: this.calciteSplitButtonPrimaryClickHandler, scale: this.scale, splitChild: "primary", theme: this.theme }, this.primaryText), index.h("div", { class: "split-button__divider-container" }, index.h("div", { class: "split-button__divider" })), index.h("calcite-dropdown", { alignment: "end", dir: dir, onClick: this.calciteSplitButtonSecondaryClickHandler, scale: this.scale, theme: this.theme, width: this.scale }, index.h("calcite-button", { appearance: this.appearance, "aria-label": this.dropdownLabel, color: this.color, dir: dir, disabled: this.disabled, "icon-start": this.dropdownIcon, scale: this.scale, slot: "dropdown-trigger", splitChild: "secondary", theme: this.theme }), index.h("slot", null)))));
  }
  get dropdownIcon() {
    return this.dropdownIconType === "chevron"
      ? "chevronDown"
      : this.dropdownIconType === "caret"
        ? "caretDown"
        : this.dropdownIconType === "ellipsis"
          ? "ellipsis"
          : "handle-vertical";
  }
  get el() { return index.getElement(this); }
};
CalciteSplitButton.style = calciteSplitButtonCss;

exports.calcite_split_button = CalciteSplitButton;
