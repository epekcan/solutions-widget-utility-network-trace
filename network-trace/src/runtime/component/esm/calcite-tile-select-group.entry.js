import { r as registerInstance, h, H as Host } from './index-cbdbef9d.js';

const calciteTileSelectGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-right:1px;margin-bottom:1px}:host([layout=vertical]){flex-direction:column}";

const CalciteTileSelectGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Tiles by default move horizontally, stacking with each row, vertical allows single-column layouts */
    this.layout = "horizontal";
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
CalciteTileSelectGroup.style = calciteTileSelectGroupCss;

export { CalciteTileSelectGroup as calcite_tile_select_group };
