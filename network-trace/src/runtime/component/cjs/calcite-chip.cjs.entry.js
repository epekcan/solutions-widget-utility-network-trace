'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const guid = require('./guid-f05bb751.js');

const CSS = {
  close: "close"
};
const TEXT = {
  close: "close"
};

const calciteChipCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{--calcite-chip-transparent-hover:rgba(0, 0, 0, 0.05);--calcite-chip-transparent-press:rgba(0, 0, 0, 0.08)}:host([theme=dark]){--calcite-chip-transparent-hover:rgba(255, 255, 255, 0.05);--calcite-chip-transparent-press:rgba(255, 255, 255, 0.08)}:host([scale=s]){height:1.25rem;font-size:var(--calcite-font-size--3);--calcite-chip-spacing-unit-l:0.5rem;--calcite-chip-spacing-unit-s:0.25rem}:host([scale=s]) slot[name=chip-image]::slotted(*){height:1.25rem;width:1.25rem}:host([scale=m]){height:2rem;font-size:var(--calcite-font-size--2);--calcite-chip-spacing-unit-l:0.75rem;--calcite-chip-spacing-unit-s:6px}:host([scale=m]) slot[name=chip-image]::slotted(*){height:1.5rem;width:1.5rem;padding-left:0.25rem}:host([scale=l]){height:2.5rem;font-size:var(--calcite-font-size--1);--calcite-chip-spacing-unit-l:1rem;--calcite-chip-spacing-unit-s:0.5rem}:host([scale=l]) slot[name=chip-image]::slotted(*){height:2rem;width:2rem;padding-left:0.25rem}:host([dir=rtl][scale=m]) slot[name=chip-image]::slotted(*){padding-left:0;padding-right:0.25rem}:host([dir=rtl][scale=l]) slot[name=chip-image]::slotted(*){padding-left:0;padding-right:0.25rem}:host{--calcite-chip-button-border-radius:0 50px 50px 0;display:inline-flex;align-items:center;background-color:var(--calcite-ui-foreground-2);border-radius:50px;border:1px solid var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);font-weight:500;cursor:default}:host button{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([dir=rtl]){--calcite-chip-button-border-radius:50px 0 0 50px;text-align:right}:host span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host([dismissible]) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host([dir=rtl][dismissible]) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s)}:host([icon]:not([dismissible])) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s)}:host([dir=rtl][icon]:not([dismissible])) span{padding:var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-s) var(--calcite-chip-spacing-unit-l)}:host button{margin:0;padding:0;display:inline-flex;align-self:stretch;align-items:center;border-style:none;cursor:pointer;-webkit-appearance:none;background-color:transparent;border-radius:var(--calcite-chip-button-border-radius);transition:150ms ease-in-out;padding:var(--calcite-chip-spacing-unit-s);cursor:pointer;color:var(--calcite-ui-text-1)}:host button:hover,:host button:focus{background-color:var(--calcite-ui-foreground-2);border-color:var(--calcite-ui-foreground-2)}:host button:active{background-color:var(--calcite-ui-foreground-3)}:host slot[name=chip-image]::slotted(*){border-radius:50%;overflow:hidden;display:inline-flex}.calcite-chip--icon{display:inline-flex;position:relative;margin:0 0 0 var(--calcite-chip-spacing-unit-l);transition:150ms ease-in-out;border-radius:var(--calcite-chip-button-border-radius)}:host([dir=rtl]) .calcite-chip--icon{margin:0 var(--calcite-chip-spacing-unit-l) 0 0}:host([color=blue][appearance=solid]),:host([color=blue][appearance=solid]) button{border-color:var(--calcite-ui-brand);background-color:var(--calcite-ui-brand);color:var(--calcite-ui-foreground-1)}:host([appearance=solid]) button:hover,:host([appearance=solid]) button:focus{background-color:rgba(255, 255, 255, 0.1)}:host([appearance=solid]) button:active{background-color:rgba(0, 0, 0, 0.1)}:host([theme=dark][color=blue][appearance=solid]:not([color=grey])),:host([theme=dark][color=blue][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=blue][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-brand-press);background-color:transparent}:host([color=blue][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-brand-press)}:host([theme=dark][color=blue][appearance=clear]){border-color:var(--calcite-ui-brand-hover)}:host([color=blue][appearance=clear]) button:hover,:host([color=blue][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=blue][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=red][appearance=solid]),:host([color=red][appearance=solid]) button{border-color:var(--calcite-ui-danger);background-color:var(--calcite-ui-danger);color:var(--calcite-ui-foreground-1)}:host([appearance=solid]) button:hover,:host([appearance=solid]) button:focus{background-color:rgba(255, 255, 255, 0.1)}:host([appearance=solid]) button:active{background-color:rgba(0, 0, 0, 0.1)}:host([theme=dark][color=red][appearance=solid]:not([color=grey])),:host([theme=dark][color=red][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=red][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-danger-press);background-color:transparent}:host([color=red][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-danger-press)}:host([theme=dark][color=red][appearance=clear]){border-color:var(--calcite-ui-danger-hover)}:host([color=red][appearance=clear]) button:hover,:host([color=red][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=red][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=yellow][appearance=solid]),:host([color=yellow][appearance=solid]) button{border-color:var(--calcite-ui-warning);background-color:var(--calcite-ui-warning);color:var(--calcite-ui-text-1)}:host([appearance=solid]) button:hover,:host([appearance=solid]) button:focus{background-color:rgba(255, 255, 255, 0.1)}:host([appearance=solid]) button:active{background-color:rgba(0, 0, 0, 0.1)}:host([theme=dark][color=yellow][appearance=solid]:not([color=grey])),:host([theme=dark][color=yellow][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=yellow][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-warning);background-color:transparent}:host([color=yellow][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-warning)}:host([theme=dark][color=yellow][appearance=clear]){border-color:var(--calcite-ui-warning)}:host([color=yellow][appearance=clear]) button:hover,:host([color=yellow][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=yellow][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=green][appearance=solid]),:host([color=green][appearance=solid]) button{border-color:var(--calcite-ui-success);background-color:var(--calcite-ui-success);color:var(--calcite-ui-text-1)}:host([appearance=solid]) button:hover,:host([appearance=solid]) button:focus{background-color:rgba(255, 255, 255, 0.1)}:host([appearance=solid]) button:active{background-color:rgba(0, 0, 0, 0.1)}:host([theme=dark][color=green][appearance=solid]:not([color=grey])),:host([theme=dark][color=green][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=green][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-success);background-color:transparent}:host([color=green][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-success)}:host([theme=dark][color=green][appearance=clear]){border-color:var(--calcite-ui-success)}:host([color=green][appearance=clear]) button:hover,:host([color=green][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=green][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}:host([color=grey][appearance=solid]),:host([color=grey][appearance=solid]) button{border-color:var(--calcite-ui-foreground-2);background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host([appearance=solid]) button:hover,:host([appearance=solid]) button:focus{background-color:rgba(255, 255, 255, 0.1)}:host([appearance=solid]) button:active{background-color:rgba(0, 0, 0, 0.1)}:host([theme=dark][color=grey][appearance=solid]:not([color=grey])),:host([theme=dark][color=grey][appearance=solid]:not([color=grey])) button{color:var(--calcite-ui-background)}:host([color=grey][appearance=clear]){color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-text-3);background-color:transparent}:host([color=grey][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-text-1)}:host([theme=dark][color=grey][appearance=clear]){border-color:var(--calcite-ui-text-3-dark)}:host([color=grey][appearance=clear]) button:hover,:host([color=grey][appearance=clear]) button:focus{background-color:var(--calcite-chip-transparent-hover)}:host([color=grey][appearance=clear]) button:active{background-color:var(--calcite-chip-transparent-press)}";

const CalciteChip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteChipDismiss = index.createEvent(this, "calciteChipDismiss", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the button, defaults to blue */
    this.color = "grey";
    /** Optionally show a button the user can click to dismiss the chip */
    this.dismissible = false;
    /** Aria label for the "x" button */
    this.dismissLabel = TEXT.close;
    /** specify the scale of the chip, defaults to m */
    this.scale = "m";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.closeClickHandler = (event) => {
      event.preventDefault();
      this.calciteChipDismiss.emit(this.el);
    };
    this.guid = guid.guid();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  async setFocus() {
    var _a;
    (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    const dir = dom.getElementDir(this.el);
    const iconScale = this.scale !== "l" ? "s" : "m";
    const iconEl = (index.h("calcite-icon", { class: "calcite-chip--icon", dir: dir, flipRtl: this.iconFlipRtl, icon: this.icon, scale: iconScale }));
    const closeButton = (index.h("button", { "aria-describedby": this.guid, "aria-label": this.dismissLabel, class: CSS.close, onClick: this.closeClickHandler, ref: (el) => (this.closeButton = el) }, index.h("calcite-icon", { icon: "x", scale: iconScale })));
    return (index.h(index.Host, { dir: dir }, index.h("slot", { name: "chip-image" }), this.icon ? iconEl : null, index.h("span", { id: this.guid }, index.h("slot", null)), this.dismissible ? closeButton : null));
  }
  get el() { return index.getElement(this); }
};
CalciteChip.style = calciteChipCss;

exports.calcite_chip = CalciteChip;
