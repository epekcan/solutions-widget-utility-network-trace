# my-component



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute             | Description | Type      | Default                    |
| ------------------ | --------------------- | ----------- | --------- | -------------------------- |
| `appToken`         | `app-token`           |             | `string`  | `""`                       |
| `gdbVersion`       | `gdb-version`         |             | `string`  | `""`                       |
| `host`             | `host`                |             | `string`  | `""`                       |
| `inAssets`         | `in-assets`           |             | `any`     | `undefined`                |
| `inTC`             | `in-t-c`              |             | `any`     | `{tc:{}, action:"update"}` |
| `isBasic`          | `is-basic`            |             | `boolean` | `true`                     |
| `name`             | `name`                |             | `string`  | `""`                       |
| `runIsoTraceTwice` | `run-iso-trace-twice` |             | `boolean` | `true`                     |
| `showTerminals`    | `show-terminals`      |             | `boolean` | `undefined`                |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `emitDrawComplete`  |             | `CustomEvent<any>` |
| `emitFlagChange`    |             | `CustomEvent<any>` |
| `emitQueryTrace`    |             | `CustomEvent<any>` |
| `emitSelectedTrace` |             | `CustomEvent<any>` |
| `emitTraceResults`  |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- calcite-tabs
- calcite-tab-nav
- calcite-tab-title
- calcite-tab
- [flag-handler](.)
- [trace-selector](trace-selector)
- [execute-handler](execute-handler)

### Graph
```mermaid
graph TD;
  un-trace-manager --> calcite-tabs
  un-trace-manager --> calcite-tab-nav
  un-trace-manager --> calcite-tab-title
  un-trace-manager --> calcite-tab
  un-trace-manager --> flag-handler
  un-trace-manager --> trace-selector
  un-trace-manager --> execute-handler
  calcite-tab-title --> calcite-icon
  flag-handler --> calcite-card
  flag-handler --> calcite-button
  calcite-card --> calcite-loader
  calcite-card --> calcite-checkbox
  calcite-checkbox --> calcite-label
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  trace-selector --> calcite-card
  trace-selector --> calcite-label
  trace-selector --> calcite-select
  trace-selector --> calcite-option
  calcite-select --> calcite-icon
  execute-handler --> calcite-card
  execute-handler --> calcite-notice
  execute-handler --> calcite-button
  calcite-notice --> calcite-icon
  style un-trace-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
