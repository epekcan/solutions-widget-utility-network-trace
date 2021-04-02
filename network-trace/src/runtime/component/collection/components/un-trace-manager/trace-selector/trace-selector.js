import { Component, Host, h } from '@stencil/core';
export class TraceSelector {
  render() {
    return (h(Host, null,
      h("div", { style: { height: "10px", width: "100%" } }),
      h("calcite-card", null,
        h("div", { style: { height: "10px", width: "100%" } }),
        h("calcite-label", { class: "sc-calcite-label-h sc-calcite-label-s", dir: "ltr", status: "idle", scale: "m", layout: "default", "calcite-hydrated": "" },
          h("label", { class: "sc-calcite-label-h sc-calcite-label-s sc-calcite-label" },
            "Select a trace operation",
            h("calcite-select", { label: "Select a trace group", dir: "ltr", scale: "m", theme: "light", width: "auto", "calcite-hydrated": "" },
              h("calcite-option", { selected: true, "calcite-hydrated": "" }, "Isolation Trace Group"))),
          h("label", { class: "sc-calcite-label-h sc-calcite-label-s sc-calcite-label" }, "This trace will select isolating and isolated features.")))));
  }
  static get is() { return "trace-selector"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["trace-selector.css"]
  }; }
  static get styleUrls() { return {
    "$": ["trace-selector.css"]
  }; }
}
