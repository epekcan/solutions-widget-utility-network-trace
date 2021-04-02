'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const resources = require('./resources-c7d5cc25.js');

const CSS = {
  article: "article",
  content: "content",
  headerContainer: "header-container",
  icon: "icon",
  toggle: "toggle",
  toggleIcon: "toggle-icon",
  title: "title",
  heading: "heading",
  header: "header",
  button: "button",
  summary: "summary",
  controlContainer: "control-container"
};
const TEXT = {
  collapse: "Collapse",
  expand: "Expand"
};
const SLOTS = {
  icon: "icon",
  control: "control"
};

const calciteBlockCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex:0 0 auto;flex-direction:column;padding:0;border-bottom:1px solid var(--calcite-ui-border-3);transition:margin 150ms ease-in-out, box-shadow 150ms ease-in-out}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-ui-text-weight-demi);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:1.25rem}h2.heading{font-size:1.125rem}h3.heading{font-size:1rem}h4.heading,h5.heading{font-size:0.875rem}.header{justify-content:flex-start;padding:0}.header,.toggle{grid-area:header}.header-container{display:grid;grid-template:auto/auto 1fr auto;grid-template-areas:\"handle header control\";grid-column:header-start/control-end;grid-row:1/2;align-items:stretch}.header-container>.header{padding:var(--calcite-spacing-three-quarters) 0}.toggle{display:flex;align-items:center;flex-wrap:nowrap;margin:0;padding:var(--calcite-spacing-three-quarters) 0;background-color:transparent;border:none;cursor:pointer;font-family:inherit;text-align:unset;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.toggle:hover{background-color:var(--calcite-ui-foreground-2)}.toggle:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}calcite-loader[inline]{grid-area:control;align-self:center}calcite-handle{grid-area:handle}.title{margin:0;padding:0 var(--calcite-spacing-three-quarters)}.header .title .heading{padding:0;color:var(--calcite-ui-text-3);transition:color 150ms ease-in-out;font-size:0.875rem;word-wrap:break-word;word-break:break-word}.summary{color:var(--calcite-ui-text-3);padding:0;font-size:0.75rem;word-wrap:break-word;word-break:break-word}.icon{margin-left:var(--calcite-spacing-three-quarters)}.toggle-icon{fill:currentColor;flex:0 0 var(--calcite-icon-size);margin:0 var(--calcite-spacing) 0 0}.content{padding:var(--calcite-spacing-half) var(--calcite-spacing-three-quarters);position:relative}.control-container{grid-area:control;display:flex;margin:0}calcite-scrim{pointer-events:none}.calcite--rtl .icon{margin-left:0;margin-right:var(--calcite-spacing-three-quarters)}:host([open]){margin-top:var(--calcite-spacing);margin-bottom:var(--calcite-spacing);box-shadow:1px 0 0 var(--calcite-ui-border-1) inset}:host([open]).calcite--rtl{box-shadow:-1px 0 0 var(--calcite-ui-border-1) inset}:host([open]) .header .title .heading{color:var(--calcite-ui-text-1)}:host([disabled]){pointer-events:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}:host([disabled]) .header-container{opacity:var(--calcite-ui-opacity-disabled)}:host([drag-handle]) .title{padding-left:var(--calcite-spacing-quarter)}:host([drag-handle]) .icon{margin-left:0;margin-right:var(--calcite-spacing-half)}:host([drag-handle]) .calcite--rtl .title{padding-left:0;padding-right:var(--calcite-spacing-quarter)}:host([drag-handle]) .calcite--rtl .icon{margin-right:0;margin-left:var(--calcite-spacing-quarter)}";

const CalciteBlock = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteBlockToggle = index.createEvent(this, "calciteBlockToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When true, this block will be collapsible.
     */
    this.collapsible = false;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * When true, displays a drag handle in the header.
     */
    this.dragHandle = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * When true, the block's content will be displayed.
     */
    this.open = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.onHeaderClick = () => {
      this.open = !this.open;
      this.calciteBlockToggle.emit();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderScrim() {
    const { disabled, loading, el } = this;
    const defaultSlot = index.h("slot", null);
    return loading || disabled ? (index.h("calcite-scrim", { loading: loading, theme: dom.getElementTheme(el) }, defaultSlot)) : (defaultSlot);
  }
  render() {
    const { collapsible, disabled, el, heading, intlCollapse, intlExpand, loading, open, summary } = this;
    const toggleLabel = open ? intlCollapse || TEXT.collapse : intlExpand || TEXT.expand;
    const hasIcon = dom.getSlotted(el, SLOTS.icon);
    const headerContent = (index.h("header", { class: CSS.header }, hasIcon ? (index.h("div", { class: CSS.icon }, index.h("slot", { name: SLOTS.icon }))) : null, index.h("div", { class: CSS.title }, index.h("h4", { class: CSS.heading }, heading), summary ? index.h("div", { class: CSS.summary }, summary) : null)));
    const hasControl = dom.getSlotted(el, SLOTS.control);
    const headerNode = (index.h("div", { class: CSS.headerContainer }, this.dragHandle ? index.h("calcite-handle", null) : null, collapsible ? (index.h("button", { "aria-label": toggleLabel, class: CSS.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent)) : (headerContent), loading ? (index.h("calcite-loader", { inline: true, "is-active": true })) : hasControl ? (index.h("div", { class: CSS.controlContainer }, index.h("slot", { name: SLOTS.control }))) : null));
    const rtl = dom.getElementDir(el) === "rtl";
    return (index.h(index.Host, { tabIndex: disabled ? -1 : null }, index.h("article", { "aria-busy": loading.toString(), "aria-expanded": collapsible ? open.toString() : null, class: {
        [CSS.article]: true,
        [resources.CSS_UTILITY.rtl]: rtl
      } }, headerNode, index.h("div", { class: CSS.content, hidden: !open }, this.renderScrim()))));
  }
  get el() { return index.getElement(this); }
};
CalciteBlock.style = calciteBlockCss;

exports.calcite_block = CalciteBlock;
