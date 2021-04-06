import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { e as getElementTheme, d as getSlotted, g as getElementDir } from './dom-558ef00c.js';
import { C as CSS_UTILITY } from './resources-c23b068d.js';
import { C as CalciteHeading } from './CalciteHeading-6f7131cd.js';

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
  expand: "Expand",
  loading: "Loading"
};
const SLOTS = {
  icon: "icon",
  control: "control"
};
const HEADING_LEVEL = 4;

const calciteBlockCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex-grow:0;flex-shrink:0;flex-direction:column;padding:0;transition-property:margin;transition-duration:150ms;transition-timing-function:cubic-bezier(0.215, 0.440, 0.420, 0.880);border-width:0;border-bottom-width:1px;border-color:var(--calcite-ui-border-3);border-style:solid;flex-basis:auto}.header{margin:0;display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-2);fill:var(--calcite-ui-text-2)}.heading{padding:0;margin:0;font-weight:var(--calcite-font-weight-medium);line-height:1.5}.header .heading{flex:1 0 auto;padding:var(--calcite-spacing-half) var(--calcite-spacing-half)}h1.heading{font-size:var(--calcite-font-size-2)}h2.heading{font-size:var(--calcite-font-size-1)}h3.heading{font-size:var(--calcite-font-size-0)}h4.heading,h5.heading{font-size:var(--calcite-font-size--1)}.header{justify-content:flex-start;padding:0}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto;grid-template-areas:\"handle header control\";grid-column:header-start/control-end;grid-row:1/2}.header-container>.header{padding-top:0.75rem;padding-bottom:0.75rem;padding-left:0;padding-right:0}.toggle{display:flex;flex-wrap:nowrap;font-family:inherit;align-items:center;margin:0;padding-top:0.75rem;padding-bottom:0.75rem;padding-left:0;padding-right:0;border-style:none;cursor:pointer;text-align:left;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;background-color:transparent}.toggle:hover{background-color:var(--calcite-ui-foreground-2)}.toggle:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}calcite-loader[inline]{grid-area:control;align-self:center}calcite-handle{grid-area:handle}.title{margin:0;padding-left:0.75rem;padding-right:0.75rem;padding-top:0;padding-bottom:0}.header .title .heading{padding:0;font-size:var(--calcite-font-size--1);color:var(--calcite-ui-text-3);word-wrap:break-word;word-break:break-word;transition-property:color;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.summary{padding:0;font-size:var(--calcite-font-size--2);color:var(--calcite-ui-text-3);word-wrap:break-word;word-break:break-word}.icon{margin-left:0.75rem}.toggle-icon{flex-grow:0;flex-shrink:0;fill:currentColor;margin:0;margin-right:1rem;flex-basis:1rem}.content{padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;position:relative;animation:in 300ms ease-in-out}.control-container{display:flex;margin:0;grid-area:control}calcite-scrim{pointer-events:none}.calcite--rtl .icon{margin-left:0;margin-right:0.75rem}:host([open]){margin-top:0.75rem;margin-bottom:0.75rem;box-shadow:1px 0 0 var(--calcite-ui-border-1) inset}:host([open]).calcite--rtl{box-shadow:-1px 0 0 var(--calcite-ui-border-1) inset}:host([open]) .header .title .heading{color:var(--calcite-ui-text-1)}:host([disabled]){pointer-events:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;user-select:none}:host([disabled]) .header-container{opacity:0.5}:host([drag-handle]) .title{padding-left:0.25rem}:host([drag-handle]) .icon{margin-left:0;margin-right:0.5rem}:host([drag-handle]) .calcite--rtl .title{padding-left:0;padding-right:0.25rem}:host([drag-handle]) .calcite--rtl .icon{margin-right:0;margin-left:0.25rem}";

const CalciteBlock = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteBlockToggle = createEvent(this, "calciteBlockToggle", 7);
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
     * Number at which section headings should start for this component.
     */
    this.headingLevel = HEADING_LEVEL;
    /** string to override English loading text */
    this.intlLoading = TEXT.loading;
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
    const defaultSlot = h("slot", null);
    return loading || disabled ? (h("calcite-scrim", { loading: loading, theme: getElementTheme(el) }, defaultSlot)) : (defaultSlot);
  }
  render() {
    const { collapsible, disabled, el, heading, intlCollapse, intlExpand, loading, open, summary, intlLoading, headingLevel } = this;
    const toggleLabel = open ? intlCollapse || TEXT.collapse : intlExpand || TEXT.expand;
    const hasIcon = getSlotted(el, SLOTS.icon);
    const headerContent = (h("header", { class: CSS.header }, hasIcon ? (h("div", { class: CSS.icon }, h("slot", { name: SLOTS.icon }))) : null, h("div", { class: CSS.title }, h(CalciteHeading, { class: CSS.heading, level: headingLevel }, heading), summary ? h("div", { class: CSS.summary }, summary) : null)));
    const hasControl = getSlotted(el, SLOTS.control);
    const headerNode = (h("div", { class: CSS.headerContainer }, this.dragHandle ? h("calcite-handle", null) : null, collapsible ? (h("button", { "aria-label": toggleLabel, class: CSS.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent)) : (headerContent), loading ? (h("calcite-loader", { inline: true, "is-active": true, label: intlLoading })) : hasControl ? (h("div", { class: CSS.controlContainer }, h("slot", { name: SLOTS.control }))) : null));
    const rtl = getElementDir(el) === "rtl";
    return (h(Host, { tabIndex: disabled ? -1 : null }, h("article", { "aria-busy": loading.toString(), "aria-expanded": collapsible ? open.toString() : null, class: {
        [CSS.article]: true,
        [CSS_UTILITY.rtl]: rtl
      } }, headerNode, h("div", { class: CSS.content, hidden: !open }, this.renderScrim()))));
  }
  get el() { return getElement(this); }
};
CalciteBlock.style = calciteBlockCss;

export { CalciteBlock as calcite_block };
