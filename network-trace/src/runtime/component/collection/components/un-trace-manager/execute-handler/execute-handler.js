import { Component, Host, h } from '@stencil/core';
export class ExecuteHandler {
  render() {
    return (h(Host, null,
      h("div", { style: { height: "10px", width: "100%" } }),
      h("calcite-card", null,
        h("div", { style: { height: "10px", width: "100%" } }),
        h("calcite-notice", { theme: "light", icon: "", active: true, dismissible: true, scale: "m", width: "auto", color: "red" },
          h("div", { slot: "notice-title" }, "Add starting point"),
          h("div", { slot: "notice-message" }, "You first need to add a starting point to run the trace.")),
        h("div", { style: { height: "10px", width: "100%" } }),
        h("calcite-button", { scale: "s", color: "blue", width: "full" }, "Run"),
        h("div", { style: { height: "10px", width: "100%" } }))));
  }
  static get is() { return "execute-handler"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["execute-handler.css"]
  }; }
  static get styleUrls() { return {
    "$": ["execute-handler.css"]
  }; }
}
