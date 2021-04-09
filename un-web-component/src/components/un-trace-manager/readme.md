# my-component



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute             | Description | Type      | Default                    |
| ------------------ | --------------------- | ----------- | --------- | -------------------------- |
| `appToken`         | `app-token`           |             | `string`  | `""`                       |
| `gdbVersion`       | `gdb-version`         |             | `string`  | `"sde.DEFAULT"`            |
| `host`             | `host`                |             | `string`  | `""`                       |
| `inAssets`         | `in-assets`           |             | `any`     | `undefined`                |
| `inTC`             | `in-t-c`              |             | `any`     | `{tc:{}, action:"update"}` |
| `isBasic`          | `is-basic`            |             | `boolean` | `true`                     |
| `localeDisplay`    | `locale-display`      |             | `string`  | `'ltr'`                    |
| `localeStrings`    | `locale-strings`      |             | `any`     | `undefined`                |
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
- calcite-card
- calcite-button
- calcite-label
- calcite-select
- calcite-option
- calcite-notice
- calcite-panel
- calcite-action
- calcite-link

### Graph
```mermaid
graph TD;
  un-trace-manager --> calcite-tabs
  un-trace-manager --> calcite-tab-nav
  un-trace-manager --> calcite-tab-title
  un-trace-manager --> calcite-tab
  un-trace-manager --> calcite-card
  un-trace-manager --> calcite-button
  un-trace-manager --> calcite-label
  un-trace-manager --> calcite-select
  un-trace-manager --> calcite-option
  un-trace-manager --> calcite-notice
  un-trace-manager --> calcite-panel
  un-trace-manager --> calcite-action
  un-trace-manager --> calcite-link
  calcite-tab-title --> calcite-icon
  calcite-card --> calcite-loader
  calcite-card --> calcite-checkbox
  calcite-checkbox --> calcite-label
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-select --> calcite-icon
  calcite-notice --> calcite-icon
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-tooltip-manager
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-link --> calcite-icon
  style un-trace-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
