import{r as a,h as e,H as i}from"./p-551d452f.js";const o=class{constructor(e){a(this,e),this.checked=!1,this.disabled=!1,this.focused=!1,this.hidden=!1,this.hovered=!1,this.scale="m",this.theme="light"}render(){return e(i,null,e("div",{class:"radio"}))}};o.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host .radio{border-radius:100%;box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);cursor:pointer;transition:all 0.15s ease-in-out}:host([hovered]) .radio,:host(:not([checked])[focused]) .radio{box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([disabled]) .radio{cursor:default;opacity:var(--calcite-ui-opacity-disabled)}:host([hovered][disabled]) .radio{box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1)}:host([scale=s]) .radio{height:12px;min-width:12px;max-width:12px}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-ui-brand)}:host([scale=s][focused][checked]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([scale=m]) .radio{height:14px;min-width:14px;max-width:14px}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-ui-brand)}:host([scale=m][focused][checked]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([scale=l]) .radio{height:20px;min-width:20px;max-width:20px}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-ui-brand)}:host([scale=l][focused][checked]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([hidden]){display:none}";export{o as calcite_radio}