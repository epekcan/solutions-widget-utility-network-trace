# my-component



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute             | Description | Type      | Default                                                                                                                                                                                              |
| ------------------ | --------------------- | ----------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appToken`         | `app-token`           |             | `string`  | `"Cl8tJFi4nxyV8LIgXKBzpgoWO0XDlHhE-xlJ03-DxqZybCe0ug_qf11W6PDrCve7rUU8kzWNNPpPbubeNn39gLr69SdTKgqnlFPVOSz2KWslkKXqfuHsyyZRvScmhG8pkVTbn-onG9g4xvCCB9G412LLq0hJPe8Azx26FWU3jlVn3X1UNH70-5o-H9NCV5tc"` |
| `gdbVersion`       | `gdb-version`         |             | `string`  | `""`                                                                                                                                                                                                 |
| `host`             | `host`                |             | `string`  | `""`                                                                                                                                                                                                 |
| `inAssets`         | `in-assets`           |             | `any`     | `undefined`                                                                                                                                                                                          |
| `inTC`             | `in-t-c`              |             | `any`     | `{tc:{}, action:"update"}`                                                                                                                                                                           |
| `isBasic`          | `is-basic`            |             | `boolean` | `true`                                                                                                                                                                                               |
| `name`             | `name`                |             | `string`  | `""`                                                                                                                                                                                                 |
| `orientation`      | `orientation`         |             | `string`  | `'ltr'`                                                                                                                                                                                              |
| `runIsoTraceTwice` | `run-iso-trace-twice` |             | `boolean` | `true`                                                                                                                                                                                               |
| `showTerminals`    | `show-terminals`      |             | `boolean` | `undefined`                                                                                                                                                                                          |


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
- calcite-card
- calcite-link

### Graph
```mermaid
graph TD;
  un-trace-manager --> calcite-tabs
  un-trace-manager --> calcite-tab-nav
  un-trace-manager --> calcite-tab-title
  un-trace-manager --> calcite-tab
  un-trace-manager --> calcite-card
  un-trace-manager --> calcite-link
  calcite-tab-title --> calcite-icon
  calcite-card --> calcite-loader
  calcite-card --> calcite-checkbox
  calcite-checkbox --> calcite-label
  calcite-link --> calcite-icon
  style un-trace-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
