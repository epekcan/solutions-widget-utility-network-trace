import { r as registerInstance, h, H as Host } from './index-cbdbef9d.js';

const calciteTileCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{background-color:var(--calcite-ui-foreground-1);box-sizing:border-box;color:var(--calcite-ui-text-3);display:inline-block;transition:150ms ease-in-out;-webkit-user-select:none;-ms-user-select:none;user-select:none}:host(:not([embed])){box-shadow:0 0 0 1px var(--calcite-ui-border-2);max-width:300px;padding:0.75rem}:host(:not([embed])[href]:hover){box-shadow:0 0 0 2px var(--calcite-ui-brand);cursor:pointer}:host(:not([embed])[href]:active){box-shadow:0 0 0 3px var(--calcite-ui-brand)}:host([icon][heading]:not([description]):not([embed])){padding:unset}.tile{display:grid;grid-template-columns:1fr;grid-gap:0.75rem;pointer-events:none}.heading{font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-2);transition:150ms ease-in-out;font-weight:500;pointer-events:none}.large-visual{justify-items:center;min-height:200px}.large-visual .icon{align-self:self-end}.large-visual .heading{align-self:center}.description{font-size:0.9375rem;line-height:1.5;color:var(--calcite-ui-text-3);transition:150ms ease-in-out;pointer-events:none}:host(:hover) .heading,:host([active]) .heading{color:var(--calcite-ui-text-1)}:host(:hover) .description,:host([active]) .description{color:var(--calcite-ui-text-2)}";

const CalciteTile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** The embed mode of the tile.  When true, renders without a border and padding for use by other components. */
    this.embed = false;
    /**
     * The focused state of the tile.
     * @private
     */
    this.focused = false;
    /** The hidden state of the tile. */
    this.hidden = false;
    /** The theme of the tile. */
    this.theme = "light";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderTile() {
    const isLargeVisual = this.heading && this.icon && !this.description;
    const iconStyle = isLargeVisual
      ? {
        height: "64px",
        width: "64px"
      }
      : undefined;
    return (h("div", { class: { "large-visual": isLargeVisual, tile: true } }, this.icon && (h("div", { class: "icon" }, h("calcite-icon", { icon: this.icon, scale: "l", style: iconStyle }))), this.heading && h("div", { class: "heading" }, this.heading), this.description && h("div", { class: "description" }, this.description)));
  }
  render() {
    return (h(Host, null, this.href ? (h("calcite-link", { href: this.href, theme: this.theme }, this.renderTile())) : (this.renderTile())));
  }
};
CalciteTile.style = calciteTileCss;

export { CalciteTile as calcite_tile };
