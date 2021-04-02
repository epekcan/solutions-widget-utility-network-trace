import{r as t,c as a,h as e,H as i,g as c}from"./p-551d452f.js";import{g as r}from"./p-f450c62e.js";import{C as s}from"./p-5b6c1e57.js";import{debounce as o,forIn as n}from"lodash-es";const l=class{constructor(e){t(this,e),this.calciteFilterChange=a(this,"calciteFilterChange",7),this.empty=!0,this.filter=o((t=>{const a=new RegExp(t,"ig");if(0===this.data.length)return console.warn("No data was passed to calcite-filter.\n      The data property expects an array of objects"),void this.calciteFilterChange.emit([]);const e=(t,a)=>{let i=!1;return n(t,(t=>{"function"!=typeof t&&(Array.isArray(t)||"object"==typeof t&&null!==t?e(t,a)&&(i=!0):a.test(t)&&(i=!0))})),i},i=this.data.filter((t=>e(t,a)));this.calciteFilterChange.emit(i)}),250),this.inputHandler=t=>{const a=t.target;this.empty=""===a.value,this.filter(a.value)},this.clear=()=>{this.textInput.value="",this.empty=!0,this.calciteFilterChange.emit(this.data)}}render(){const t="rtl"===r(this.el);return e(i,null,e("label",{class:t?s.rtl:null},e("input",{"aria-label":this.intlLabel||"filter",onInput:this.inputHandler,placeholder:this.placeholder,ref:t=>{this.textInput=t},type:"text",value:""}),e("div",{class:"search-icon"},e("calcite-icon",{icon:"search",scale:"s"}))),this.empty?null:e("button",{"aria-label":this.intlClear||"Clear filter",class:"clear-button",onClick:this.clear},e("calcite-icon",{icon:"x"})))}get el(){return c(this)}};l.style="@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;padding:var(--calcite-spacing-half) var(--calcite-spacing-half);width:100%}label{align-items:center;display:flex;margin:0 var(--calcite-spacing-quarter);overflow:hidden;position:relative;width:100%}input[type=text]{background-color:transparent;border:0;font-family:inherit;font-size:0.875rem;line-height:1.5;margin-bottom:2px;padding:var(--calcite-spacing-quarter) var(--calcite-spacing-quarter) var(--calcite-spacing-quarter) var(--calcite-spacing-plus-half);transition:padding 150ms ease-in-out, box-shadow 150ms ease-in-out;width:100%}input[type=text]::-ms-clear{display:none}.search-icon{color:var(--calcite-ui-text-2);display:flex;left:0;position:absolute;transition:left 150ms ease-in-out, right 150ms ease-in-out, opacity 150ms ease-in-out}.calcite--rtl .search-icon{left:unset;right:0}input[type=text]:focus{border-color:var(--calcite-ui-blue-1);box-shadow:0 2px 0 var(--calcite-ui-blue-1);outline:none;padding-left:var(--calcite-spacing-quarter);padding-right:var(--calcite-spacing-quarter)}input[type=text]:focus~.search-icon{left:calc(var(--calcite-icon-size) * -1);opacity:0}.calcite--rtl input[type=text]{padding-left:var(--calcite-spacing-quarter);padding-right:var(--calcite-spacing-plus-half)}.calcite--rtl input[type=text]:focus{padding-right:var(--calcite-spacing-plus-quarter)}.calcite--rtl input[type=text]:focus~.search-icon{right:calc(var(--calcite-icon-size) * -1)}.clear-button{color:var(--calcite-ui-text-2);background:none;border:0;cursor:pointer}.clear-button:hover,.clear-button:focus{color:var(--calcite-ui-text-1)}";export{l as calcite_filter}