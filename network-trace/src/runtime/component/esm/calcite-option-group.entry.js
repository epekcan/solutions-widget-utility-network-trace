import { r as registerInstance, c as createEvent, h, H as Host } from './index-cbdbef9d.js';

const CalciteOptionGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteOptionGroupChange = createEvent(this, "calciteOptionGroupChange", 7);
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
    return (h(Host, null, h("div", null, this.label), h("slot", null)));
  }
  static get watchers() { return {
    "disabled": ["handlePropChange"],
    "label": ["handlePropChange"]
  }; }
};

export { CalciteOptionGroup as calcite_option_group };
