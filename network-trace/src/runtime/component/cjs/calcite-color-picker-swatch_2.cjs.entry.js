'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const key = require('./key-d6a0381e.js');
const index$1 = require('./index-362c1927.js');

const CSS = {
  swatch: "swatch",
  noColorIcon: "no-color-icon"
};
const COLORS = {
  emptyFill: "rgba(0, 0, 0, 0)",
  activeBorder: "rgba(0, 0, 0, 0.15)"
};

const calciteColorPickerSwatchCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-flex;position:relative}:host([scale=s]){height:20px;width:20px}:host([scale=m]){height:24px;width:24px}:host([scale=l]){height:28px;width:28px}.swatch{height:inherit;width:inherit;overflow:visible}.swatch rect{transition:all 150ms ease-in-out}.no-color-icon{height:100%;width:100%;top:0;left:0;bottom:0;right:0;position:absolute}";

const CalciteColorPickerSwatch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * Used to display whether the swatch is active or not.
     */
    this.active = false;
    /**
     * The component scale.
     */
    this.scale = "m";
    /**
     * The component's theme.
     */
    this.theme = "light";
  }
  handleColorChange(color) {
    this.internalColor = index$1.color(color);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.handleColorChange(this.color);
  }
  render() {
    const { active, internalColor, theme } = this;
    const borderRadius = active ? "100%" : "0";
    const hex = internalColor.hex();
    const borderColor = active
      ? COLORS.activeBorder
      : internalColor[theme === "light" ? "darken" : "whiten"](0.25).hex();
    return (index.h(index.Host, { "aria-label": hex, title: hex }, index.h("svg", { class: CSS.swatch, xmlns: "http://www.w3.org/2000/svg" }, index.h("rect", { fill: hex, height: "100%", rx: borderRadius, stroke: borderColor, width: "100%" }))));
  }
  static get watchers() { return {
    "color": ["handleColorChange"]
  }; }
};
CalciteColorPickerSwatch.style = calciteColorPickerSwatchCss;

const INPUT_TYPE_ICONS = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
};

const calciteInputCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}.sc-calcite-input:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-input-h{display:none}[scale=s].sc-calcite-input-h textarea.sc-calcite-input,[scale=s].sc-calcite-input-h input.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:var(--calcite-font-size--2);padding:0.5rem;height:2rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input{min-height:32px}[scale=s].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:2rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input,[scale=s].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=s].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:32px;min-width:32px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input,[scale=m].sc-calcite-input-h input.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:var(--calcite-font-size--1);padding:0.75rem;height:44px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input{min-height:44px}[scale=m].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:44px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input,[scale=m].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=m].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:44px;min-width:44px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input,[scale=l].sc-calcite-input-h input.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:var(--calcite-font-size-1);padding:1rem;height:56px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input{min-height:56px}[scale=l].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:56px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input,[scale=l].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=l].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:56px;min-width:56px}[disabled].sc-calcite-input-h{pointer-events:none}[disabled].sc-calcite-input-h .calcite-input-wrapper.sc-calcite-input{opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}[disabled].sc-calcite-input-h textarea.sc-calcite-input,[disabled].sc-calcite-input-h input.sc-calcite-input{pointer-events:none}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{display:flex;position:relative;min-width:20%;max-width:100%;max-height:100%;flex:1;box-sizing:border-box;-webkit-appearance:none;font-family:inherit;transition:150ms ease-in-out, height 0s;box-shadow:0 0 0 0 transparent;outline:0;margin:0;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);font-weight:400;border-radius:0;-webkit-border-radius:0}.sc-calcite-input-h input[type=search].sc-calcite-input::-webkit-search-decoration{-webkit-appearance:none}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.sc-calcite-input-h textarea.sc-calcite-input:focus,.sc-calcite-input-h input.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.sc-calcite-input-h input.sc-calcite-input,.sc-calcite-input-h textarea.sc-calcite-input{color:var(--calcite-ui-text-1);border:1px solid var(--calcite-ui-border-1)}.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}.sc-calcite-input-h input.sc-calcite-input::placeholder,.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h input.sc-calcite-input::-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}.sc-calcite-input-h input.sc-calcite-input:focus,.sc-calcite-input-h textarea.sc-calcite-input:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-text-1)}.sc-calcite-input-h input[readonly].sc-calcite-input,.sc-calcite-input-h textarea[readonly].sc-calcite-input{background-color:var(--calcite-ui-background)}.sc-calcite-input-h input[readonly].sc-calcite-input:focus,.sc-calcite-input-h textarea[readonly].sc-calcite-input:focus{color:var(--calcite-ui-text-1)}.sc-calcite-input-h calcite-icon.sc-calcite-input{color:var(--calcite-ui-text-1)}.sc-calcite-input-h slot.sc-calcite-input:not[name=input-message]{display:block;margin-bottom:0.375rem;color:var(--calcite-ui-text-2);font-weight:500}[icon].sc-calcite-input-h input.sc-calcite-input{padding-left:2.25rem}[dir=rtl][icon].sc-calcite-input-h input.sc-calcite-input{padding-right:2.25rem;padding-left:0.75rem}[dir=rtl][icon][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-right:3rem;padding-left:0.75rem}[icon][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-left:3rem}.calcite-input-element-wrapper.sc-calcite-input{display:inline-flex;flex:1;min-width:20%;position:relative;order:3}.calcite-input-icon.sc-calcite-input{display:block;position:absolute;pointer-events:none;transition:150ms ease-in-out;top:calc(50% - 9px);left:0.75rem;margin:1px auto 0;z-index:1}[scale=l].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{top:calc(50% - 12px)}[dir=rtl].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{left:unset;right:0.75rem}input[type=text].sc-calcite-input::-ms-clear{display:none;width:0;height:0}input[type=text].sc-calcite-input::-ms-reveal{display:none;width:0;height:0}input[type=search].sc-calcite-input::-webkit-search-decoration,input[type=search].sc-calcite-input::-webkit-search-cancel-button,input[type=search].sc-calcite-input::-webkit-search-results-button,input[type=search].sc-calcite-input::-webkit-search-results-decoration,input[type=date].sc-calcite-input::-webkit-clear-button,input[type=time].sc-calcite-input::-webkit-clear-button{display:none}.calcite-input-clear-button.sc-calcite-input{display:flex;align-self:stretch;align-items:center;justify-content:center;box-sizing:border-box;cursor:pointer;min-height:100%;border:1px solid var(--calcite-ui-border-1);transition:150ms ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none;order:4}.calcite-input-clear-button.sc-calcite-input:hover,.calcite-input-clear-button.sc-calcite-input:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-clear-button.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}.calcite-input-clear-button.sc-calcite-input:disabled{opacity:var(--calcite-ui-opacity-disabled)}[dir=rtl].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:none}.calcite-input-clear-button.sc-calcite-input{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.calcite-input-clear-button.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.calcite-input-loading.sc-calcite-input{display:block;pointer-events:none;position:absolute;top:1px;left:1px;right:1px}.calcite-input-action-wrapper.sc-calcite-input{display:flex;order:7}.calcite-input-prefix.sc-calcite-input,.calcite-input-suffix.sc-calcite-input{display:flex;align-items:center;align-content:center;height:auto;min-height:100%;word-break:break-word;-webkit-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box;font-weight:500;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-background);color:var(--calcite-ui-text-2);line-height:1}.calcite-input-prefix.sc-calcite-input{order:2;border-right-width:0px}.calcite-input-suffix.sc-calcite-input{order:5;border-left-width:0px}[dir=rtl].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input{border-right-width:1px;border-left-width:0px}[dir=rtl].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{border-left-width:1px;border-right-width:0px}[readonly].sc-calcite-input-h .calcite-input-number-button-item.sc-calcite-input{pointer-events:none}[alignment=start].sc-calcite-input-h textarea.sc-calcite-input,[alignment=start].sc-calcite-input-h input.sc-calcite-input{text-align:left}[alignment=end].sc-calcite-input-h textarea.sc-calcite-input,[alignment=end].sc-calcite-input-h input.sc-calcite-input{text-align:right}[dir=rtl][alignment=start].sc-calcite-input-h textarea.sc-calcite-input,[dir=rtl][alignment=start].sc-calcite-input-h input.sc-calcite-input{text-align:right}[dir=rtl][alignment=end].sc-calcite-input-h textarea.sc-calcite-input,[dir=rtl][alignment=end].sc-calcite-input-h input.sc-calcite-input{text-align:left}.sc-calcite-input-h input[type=number].sc-calcite-input{-moz-appearance:textfield}.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-inner-spin-button,.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.calcite-input-number-button-wrapper.sc-calcite-input{box-sizing:border-box;display:flex;flex-direction:column;box-sizing:border-box;transition:150ms ease-in-out;pointer-events:none;order:6}[number-button-type=vertical].sc-calcite-input-h .calcite-input-wrapper.sc-calcite-input{flex-direction:row;display:flex}[number-button-type=vertical].sc-calcite-input-h input.sc-calcite-input,[number-button-type=vertical].sc-calcite-input-h textarea.sc-calcite-input{order:2}[dir=rtl][number-button-type=horizontal].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(-90deg)}[dir=rtl][number-button-type=horizontal].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(-90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{min-height:100%;max-height:100%;order:1;align-self:auto}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{order:5}[dir=rtl].sc-calcite-input-h .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input{border-right:1px solid var(--calcite-ui-border-1);border-left:0px}[dir=rtl].sc-calcite-input-h .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}[number-button-type=vertical].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=down].sc-calcite-input{border-top:0}.calcite-input-number-button-item.sc-calcite-input{display:flex;align-self:center;align-items:center;box-sizing:border-box;cursor:pointer;max-height:50%;min-height:50%;padding:0 0.75rem;border:1px solid var(--calcite-ui-border-1);transition:background-color 0.15s ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none}.calcite-input-number-button-item.sc-calcite-input calcite-icon.sc-calcite-input{pointer-events:none}.calcite-input-number-button-item.sc-calcite-input:hover,.calcite-input-number-button-item.sc-calcite-input:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-number-button-item.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}[dir=rtl][number-button-type=vertical].sc-calcite-input-h .calcite-input-number-button-item.sc-calcite-input{border-right:none;border-left:1px solid var(--calcite-ui-border-1)}.calcite-input-wrapper.sc-calcite-input{display:flex;flex-direction:row;position:relative}.sc-calcite-input-h input.sc-calcite-input::-webkit-calendar-picker-indicator{display:none}.sc-calcite-input-h input[type=date].sc-calcite-input::-webkit-input-placeholder{visibility:hidden !important}.sc-calcite-input-h textarea.sc-calcite-input::-webkit-resizer{box-sizing:border-box;position:absolute;bottom:0;right:0;padding:0 0.375rem}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.calcite-input-resize-icon-wrapper.sc-calcite-input{display:none}}.calcite-input-resize-icon-wrapper.sc-calcite-input{background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);position:absolute;z-index:1;bottom:2px;right:2px;pointer-events:none;width:16px;height:16px}.calcite-input-resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:4px;right:4px;transform:rotate(-45deg)}[dir=rtl].sc-calcite-input-h textarea.sc-calcite-input::-webkit-resizer{left:0;right:unset}[dir=rtl].sc-calcite-input-h .calcite-input-resize-icon-wrapper.sc-calcite-input{left:2px;right:unset}[dir=rtl].sc-calcite-input-h .calcite-input-resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:4px;right:4px;transform:rotate(45deg)}[type=file].sc-calcite-input-h input.sc-calcite-input,[type=file].sc-calcite-input-h textarea.sc-calcite-input{cursor:pointer;padding:1.5rem;border:1px dashed #d4d4d4;background-color:#f8f8f8;text-align:center}.no-bottom-border.sc-calcite-input-h input.sc-calcite-input.sc-calcite-input{border-bottom:none}[status=invalid].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-danger)}[status=valid].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-success)}[status=idle].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-text-2)}";

const CalciteInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInputFocus = index.createEvent(this, "calciteInputFocus", 7);
    this.calciteInputBlur = index.createEvent(this, "calciteInputBlur", 7);
    this.calciteInputInput = index.createEvent(this, "calciteInputInput", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the alignment of the value of the input */
    this.alignment = "start";
    /** should the input autofocus */
    this.autofocus = false;
    /** specify if the input is in loading state */
    this.loading = false;
    /** specify the placement of the number buttons */
    this.numberButtonType = "vertical";
    /** is the input required */
    this.required = false;
    /** specify the scale of the input, defaults to m */
    this.scale = "m";
    /** specify the status of the input field, determines message and icons */
    this.status = "idle";
    /**
     * specify the input type
     *
     * Note that the following types add type-specific icons by default: `date`, `email`, `password`, `search`, `tel`, `time`
     */
    this.type = "text";
    /** input value */
    this.value = "";
    /** keep track of the rendered child type */
    this.childElType = "input";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.reset = () => {
      this.value = this.defaultValue;
    };
    this.inputInputHandler = (e) => {
      this.value = e.target.value;
    };
    this.inputBlurHandler = () => {
      this.calciteInputBlur.emit({
        element: this.childEl,
        value: this.value
      });
    };
    this.inputFocusHandler = (e) => {
      if (e.target !== this.slottedActionEl)
        this.setFocus();
      this.calciteInputFocus.emit({
        element: this.childEl,
        value: this.value
      });
    };
    this.clearInputValue = () => {
      this.value = "";
    };
    this.updateNumberValue = (e) => {
      // todo, when dropping ie11 support, refactor to use stepup/stepdown
      // prevent blur and re-focus of input on mousedown
      e.preventDefault();
      if (this.childElType === "input" && this.type === "number") {
        const inputMax = this.maxString ? parseFloat(this.maxString) : null;
        const inputMin = this.minString ? parseFloat(this.minString) : null;
        const inputStep = Number(this.stepString) > 0 ? parseFloat(this.stepString) : 1;
        let inputVal = this.value && this.value !== "" ? parseFloat(this.value) : 0;
        switch (e.target.dataset.adjustment) {
          case "up":
            if ((!inputMax && inputMax !== 0) || inputVal < inputMax)
              this.childEl.value = (inputVal += inputStep).toString();
            break;
          case "down":
            if ((!inputMin && inputMin !== 0) || inputVal > inputMin)
              this.childEl.value = (inputVal -= inputStep).toString();
            break;
        }
        this.value = this.childEl.value.toString();
      }
    };
  }
  disabledWatcher() {
    if (this.disabled)
      this.setDisabledAction();
  }
  /** watcher to update number-to-string for max */
  maxWatcher() {
    var _a;
    this.maxString = ((_a = this.max) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  /** watcher to update number-to-string for min */
  minWatcher() {
    var _a;
    this.minString = ((_a = this.min) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  stepWatcher() {
    var _a;
    this.stepString = ((_a = this.step) === null || _a === void 0 ? void 0 : _a.toString()) || null;
  }
  valueWatcher() {
    this.calciteInputInput.emit({
      element: this.childEl,
      value: this.value
    });
  }
  updateRequestedIcon() {
    this.requestedIcon = dom.setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.status = dom.getElementProp(this.el, "status", this.status);
    this.scale = dom.getElementProp(this.el, "scale", this.scale);
    this.form = this.el.closest("form");
    (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener("reset", this.reset);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.form) === null || _a === void 0 ? void 0 : _a.removeEventListener("reset", this.reset);
  }
  componentWillLoad() {
    var _a, _b, _c;
    this.defaultValue = this.value;
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.requestedIcon = dom.setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
    this.minString = (_a = this.min) === null || _a === void 0 ? void 0 : _a.toString();
    this.maxString = (_b = this.max) === null || _b === void 0 ? void 0 : _b.toString();
    this.stepString = (_c = this.step) === null || _c === void 0 ? void 0 : _c.toString();
  }
  componentDidLoad() {
    this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    if (this.disabled)
      this.setDisabledAction();
  }
  get isTextarea() {
    return this.childElType === "textarea";
  }
  get isClearable() {
    return !this.isTextarea && (this.clearable || this.type === "search") && this.value.length > 0;
  }
  render() {
    const dir = dom.getElementDir(this.el);
    const attributes = dom.getAttributes(this.el, [
      "alignment",
      "dir",
      "clearable",
      "min",
      "max",
      "step",
      "value",
      "icon",
      "loading",
      "prefix-text",
      "scale",
      "status",
      "suffix-text",
      "theme",
      "number-button-type"
    ]);
    const loader = (index.h("div", { class: "calcite-input-loading" }, index.h("calcite-progress", { type: "indeterminate" })));
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
    const inputClearButton = (index.h("button", { class: "calcite-input-clear-button", disabled: this.loading, onClick: this.clearInputValue }, index.h("calcite-icon", { icon: "x", scale: iconScale, theme: this.theme })));
    const iconEl = (index.h("calcite-icon", { class: "calcite-input-icon", dir: dir, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: iconScale, theme: this.theme }));
    const numberButtonClassModifier = this.numberButtonType === "horizontal" ? "number-button-item-horizontal" : null;
    const numberButtonsHorizontalUp = (index.h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, "data-adjustment": "up", onMouseDown: this.updateNumberValue }, index.h("calcite-icon", { icon: "chevron-up", scale: iconScale, theme: this.theme })));
    const numberButtonsHorizontalDown = (index.h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, "data-adjustment": "down", onMouseDown: this.updateNumberValue }, index.h("calcite-icon", { icon: "chevron-down", scale: iconScale, theme: this.theme })));
    const numberButtonsVertical = (index.h("div", { class: `calcite-input-number-button-wrapper` }, numberButtonsHorizontalUp, numberButtonsHorizontalDown));
    const prefixText = index.h("div", { class: "calcite-input-prefix" }, this.prefixText);
    const suffixText = index.h("div", { class: "calcite-input-suffix" }, this.suffixText);
    const childEl = [
      index.h(this.childElType, Object.assign({}, attributes, { autofocus: this.autofocus ? true : null, defaultValue: this.defaultValue, disabled: this.disabled ? true : null, max: this.maxString, maxlength: this.maxlength, min: this.minString, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputInputHandler, placeholder: this.placeholder || "", ref: (el) => (this.childEl = el), required: this.required ? true : null, step: this.stepString, tabIndex: this.disabled ? -1 : null, type: this.type, value: this.value }), this.value),
      this.isTextarea ? (index.h("div", { class: "calcite-input-resize-icon-wrapper" }, index.h("calcite-icon", { icon: "chevron-down", scale: "s" }))) : null
    ];
    return (index.h(index.Host, { dir: dir, onClick: this.inputFocusHandler }, index.h("div", { class: "calcite-input-wrapper" }, this.type === "number" && this.numberButtonType === "horizontal"
      ? numberButtonsHorizontalDown
      : null, this.prefixText ? prefixText : null, index.h("div", { class: "calcite-input-element-wrapper" }, childEl, this.isClearable ? inputClearButton : null, this.requestedIcon ? iconEl : null, this.loading ? loader : null), index.h("div", { class: "calcite-input-action-wrapper" }, index.h("slot", { name: "input-action" })), this.type === "number" && this.numberButtonType === "vertical"
      ? numberButtonsVertical
      : null, this.suffixText ? suffixText : null, this.type === "number" && this.numberButtonType === "horizontal"
      ? numberButtonsHorizontalUp
      : null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(e) {
    if (this.isClearable && key.getKey(e.key) === "Escape") {
      this.clearInputValue();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** focus the rendered child element */
  async setFocus() {
    var _a;
    (_a = this.childEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  setDisabledAction() {
    if (this.slottedActionEl)
      this.slottedActionEl.setAttribute("disabled", "");
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"],
    "max": ["maxWatcher"],
    "min": ["minWatcher"],
    "step": ["stepWatcher"],
    "value": ["valueWatcher"],
    "icon": ["updateRequestedIcon"],
    "type": ["updateRequestedIcon"]
  }; }
};
CalciteInput.style = calciteInputCss;

exports.calcite_color_picker_swatch = CalciteColorPickerSwatch;
exports.calcite_input = CalciteInput;
