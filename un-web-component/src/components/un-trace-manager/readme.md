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
- calcite-popover-manager
- calcite-popover
- calcite-link
- calcite-accordion
- calcite-accordion-item
- calcite-split-button
- calcite-dropdown-group
- calcite-dropdown-item
- calcite-panel
- calcite-action
- calcite-input
- calcite-card
- calcite-icon
- calcite-switch
- calcite-select
- calcite-option
- calcite-label
- calcite-notice
- calcite-button

### Graph
```mermaid
graph TD;
  un-trace-manager --> calcite-tabs
  un-trace-manager --> calcite-tab-nav
  un-trace-manager --> calcite-tab-title
  un-trace-manager --> calcite-tab
  un-trace-manager --> calcite-popover-manager
  un-trace-manager --> calcite-popover
  un-trace-manager --> calcite-link
  un-trace-manager --> calcite-accordion
  un-trace-manager --> calcite-accordion-item
  un-trace-manager --> calcite-split-button
  un-trace-manager --> calcite-dropdown-group
  un-trace-manager --> calcite-dropdown-item
  un-trace-manager --> calcite-panel
  un-trace-manager --> calcite-action
  un-trace-manager --> calcite-input
  un-trace-manager --> calcite-card
  un-trace-manager --> calcite-icon
  un-trace-manager --> calcite-switch
  un-trace-manager --> calcite-select
  un-trace-manager --> calcite-option
  un-trace-manager --> calcite-label
  un-trace-manager --> calcite-notice
  un-trace-manager --> calcite-button
  calcite-tab-title --> calcite-icon
  calcite-popover --> calcite-icon
  calcite-link --> calcite-icon
  calcite-accordion-item --> calcite-icon
  calcite-split-button --> calcite-button
  calcite-split-button --> calcite-dropdown
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-dropdown-item --> calcite-icon
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-tooltip-manager
  calcite-action-menu --> calcite-popover
  calcite-scrim --> calcite-loader
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-card --> calcite-loader
  calcite-card --> calcite-checkbox
  calcite-checkbox --> calcite-label
  calcite-select --> calcite-icon
  calcite-notice --> calcite-icon
  style un-trace-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
