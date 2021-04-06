import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'execute-handler',
  styleUrl: 'execute-handler.css',
  shadow: true,
})
export class ExecuteHandler {

  render() {
    return (
      <Host>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-card>
          <div style={{height:"10px", width:"100%"}}></div>
          <calcite-notice
            theme="light"
            icon=""
            active={true}
            dismissible={true}
            scale="m"
            width="auto"
            color="red"
          >
            <div slot="notice-title">Add starting point</div>
            <div slot="notice-message">You first need to add a starting point to run the trace.</div>
          </calcite-notice>
          <div style={{height:"10px", width:"100%"}}></div>
          <calcite-button scale="s" color="blue"  width="full">Run</calcite-button>
          <div style={{height:"10px", width:"100%"}}></div>
        </calcite-card>
      </Host>
    );
  }

}
