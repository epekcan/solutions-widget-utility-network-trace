import { Component, Host, h } from '@stencil/core';
import "@esri/calcite-components";
export class FlagHandler {
  render() {
    return (h(Host, null,
      h("div", { style: { height: "10px", width: "100%" } }),
      h("calcite-card", null,
        h("h3", { slot: "title" }, "Starting points (0)"),
        h("span", { slot: "subtitle" }, "Add points to the map where the trace should start."),
        h("div", { class: "flex-row-center" },
          h("calcite-button", { scale: "s", color: "light", "icon-start": "plus" }, "Add")),
        h("div", { style: { height: "10px", width: "100%" } })),
      h("div", { style: { height: "10px", width: "100%" } }),
      h("calcite-card", null,
        h("h3", { slot: "title" }, "Barriers (0)"))));
  }
  static get is() { return "flag-handler"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["flag-handler.css"]
  }; }
  static get styleUrls() { return {
    "$": ["flag-handler.css"]
  }; }
}
