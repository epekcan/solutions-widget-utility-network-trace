import { Component, Host, h } from '@stencil/core';
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

@Component({
  tag: 'trace-selector',
  styleUrl: 'trace-selector.css',
  shadow: true,
})
export class TraceSelector {

  connectedCallback() {
    defineCustomElements(window);
  }

  render() {
    return (
      <Host>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-card>
          <div style={{height:"10px", width:"100%"}}></div>
          <calcite-label
            class="sc-calcite-label-h sc-calcite-label-s"
            dir="ltr"
            status="idle"
            scale="m"
            layout="default"
            calcite-hydrated=""
          >
            <label class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">
              Select a trace operation
              <calcite-select
                label="Select a trace group"
                dir="ltr"
                scale="m"
                theme="light"
                width="auto"
                calcite-hydrated=""
              >
                <calcite-option selected={true} calcite-hydrated="">Isolation Trace Group</calcite-option>
              </calcite-select>
            </label>
            <label class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">
              This trace will select isolating and isolated features.
            </label>
          </calcite-label>
        </calcite-card>

      </Host>
    );
  }

}
