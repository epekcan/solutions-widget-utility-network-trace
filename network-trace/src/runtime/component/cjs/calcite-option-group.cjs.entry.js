'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');

const CalciteOptionGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteOptionGroupChange = index.createEvent(this, "calciteOptionGroupChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When true, it prevents selection from any of its associated options.
     */
    this.disabled = false;
  }
  handlePropChange() {
    this.calciteOptionGroupChange.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    return (index.h(index.Host, null, index.h("div", null, this.label), index.h("slot", null)));
  }
  static get watchers() { return {
    "disabled": ["handlePropChange"],
    "label": ["handlePropChange"]
  }; }
};

exports.calcite_option_group = CalciteOptionGroup;
