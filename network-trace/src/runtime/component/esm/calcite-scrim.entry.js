import { r as registerInstance, h, H as Host } from './index-cbdbef9d.js';

const CSS = {
  scrim: "scrim",
  content: "content"
};

const calciteScrimCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;position:relative;pointer-events:none;--calcite-scrim-background:rgba(255, 255, 255, 0.75)}:host([theme=dark]){--calcite-scrim-background:rgba(0, 0, 0, 0.75)}@keyframes calcite-scrim-fade-in{0%{opacity:0}100%{opacity:1}}.scrim{align-items:center;animation:calcite-scrim-fade-in 250ms ease-in-out;background-color:var(--calcite-scrim-background);bottom:0;display:flex;justify-content:center;left:0;position:absolute;right:0;top:0;-webkit-user-select:none;-ms-user-select:none;user-select:none;z-index:2}.content{position:relative;z-index:1;color:var(--calcite-ui-text-2)}";

const CalciteScrim = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Determines if the component will have the loader overlay.
     * Otherwise, will render opaque disabled state.
     */
    this.loading = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Method
  //
  // --------------------------------------------------------------------------
  render() {
    const loaderNode = this.loading ? h("calcite-loader", { active: true }) : null;
    const scrimNode = h("div", { class: CSS.scrim }, loaderNode);
    const contentNode = (h("div", { class: CSS.content }, h("slot", null)));
    return (h(Host, null, scrimNode, contentNode));
  }
};
CalciteScrim.style = calciteScrimCss;

export { CalciteScrim as calcite_scrim };
