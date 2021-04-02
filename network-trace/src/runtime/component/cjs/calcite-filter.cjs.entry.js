'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const resources = require('./resources-c7d5cc25.js');
const lodashEs = require('lodash-es');

const CSS = {
  searchIcon: "search-icon",
  clearButton: "clear-button"
};
const TEXT = {
  filterLabel: "filter",
  clear: "Clear filter"
};
const ICONS = {
  search: "search",
  close: "x"
};

const calciteFilterCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:0.875rem;line-height:1.5}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;padding:var(--calcite-spacing-half) var(--calcite-spacing-half);width:100%}label{align-items:center;display:flex;margin:0 var(--calcite-spacing-quarter);overflow:hidden;position:relative;width:100%}input[type=text]{background-color:transparent;border:0;font-family:inherit;font-size:0.875rem;line-height:1.5;margin-bottom:2px;padding:var(--calcite-spacing-quarter) var(--calcite-spacing-quarter) var(--calcite-spacing-quarter) var(--calcite-spacing-plus-half);transition:padding 150ms ease-in-out, box-shadow 150ms ease-in-out;width:100%}input[type=text]::-ms-clear{display:none}.search-icon{color:var(--calcite-ui-text-2);display:flex;left:0;position:absolute;transition:left 150ms ease-in-out, right 150ms ease-in-out, opacity 150ms ease-in-out}.calcite--rtl .search-icon{left:unset;right:0}input[type=text]:focus{border-color:var(--calcite-ui-blue-1);box-shadow:0 2px 0 var(--calcite-ui-blue-1);outline:none;padding-left:var(--calcite-spacing-quarter);padding-right:var(--calcite-spacing-quarter)}input[type=text]:focus~.search-icon{left:calc(var(--calcite-icon-size) * -1);opacity:0}.calcite--rtl input[type=text]{padding-left:var(--calcite-spacing-quarter);padding-right:var(--calcite-spacing-plus-half)}.calcite--rtl input[type=text]:focus{padding-right:var(--calcite-spacing-plus-quarter)}.calcite--rtl input[type=text]:focus~.search-icon{right:calc(var(--calcite-icon-size) * -1)}.clear-button{color:var(--calcite-ui-text-2);background:none;border:0;cursor:pointer}.clear-button:hover,.clear-button:focus{color:var(--calcite-ui-text-1)}";

const filterDebounceInMs = 250;
const CalciteFilter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteFilterChange = index.createEvent(this, "calciteFilterChange", 7);
    this.empty = true;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.filter = lodashEs.debounce((value) => {
      const regex = new RegExp(value, "ig");
      if (this.data.length === 0) {
        console.warn(`No data was passed to calcite-filter.
      The data property expects an array of objects`);
        this.calciteFilterChange.emit([]);
        return;
      }
      const find = (input, RE) => {
        let found = false;
        lodashEs.forIn(input, (val) => {
          if (typeof val === "function") {
            return;
          }
          if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
            if (find(val, RE)) {
              found = true;
            }
          }
          else if (RE.test(val)) {
            found = true;
          }
        });
        return found;
      };
      const result = this.data.filter((item) => {
        return find(item, regex);
      });
      this.calciteFilterChange.emit(result);
    }, filterDebounceInMs);
    this.inputHandler = (event) => {
      const target = event.target;
      this.empty = target.value === "";
      this.filter(target.value);
    };
    this.clear = () => {
      this.textInput.value = "";
      this.empty = true;
      this.calciteFilterChange.emit(this.data);
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const rtl = dom.getElementDir(this.el) === "rtl";
    return (index.h(index.Host, null, index.h("label", { class: rtl ? resources.CSS_UTILITY.rtl : null }, index.h("input", { "aria-label": this.intlLabel || TEXT.filterLabel, onInput: this.inputHandler, placeholder: this.placeholder, ref: (el) => {
        this.textInput = el;
      }, type: "text", value: "" }), index.h("div", { class: CSS.searchIcon }, index.h("calcite-icon", { icon: ICONS.search, scale: "s" }))), !this.empty ? (index.h("button", { "aria-label": this.intlClear || TEXT.clear, class: CSS.clearButton, onClick: this.clear }, index.h("calcite-icon", { icon: ICONS.close }))) : null));
  }
  get el() { return index.getElement(this); }
};
CalciteFilter.style = calciteFilterCss;

exports.calcite_filter = CalciteFilter;
