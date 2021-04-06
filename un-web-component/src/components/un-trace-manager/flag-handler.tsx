import { Component, Host, h } from '@stencil/core';
import "@esri/calcite-components";

@Component({
  tag: 'flag-handler',
  styleUrl: 'flag-handler.css',
  shadow: true,
})
export class FlagHandler {

  render() {
    return (
      <Host>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-card>
          <h3 slot="title">Starting points (0)</h3>
          <span slot="subtitle">Add points to the map where the trace should start.</span>
          <div class="flex-row-center">
            <calcite-button scale="s" color="light" icon-start="plus">Add</calcite-button>
          </div>
          <div style={{height:"10px", width:"100%"}}></div>
        </calcite-card>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-card>
          <h3 slot="title">Barriers (0)</h3>
        </calcite-card>
      </Host>
    );
  }

}
