import { r as registerInstance, h, H as Host, c as createEvent, g as getElement } from './index-cbdbef9d.js';
import { s as setRequestedIcon, b as getElementProp, g as getElementDir } from './dom-b2b7d90d.js';
import { g as getKey } from './key-040272ec.js';
import Color from 'color';

const CSS = {
  swatch: "swatch"
};

const calciteColorSwatchCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-flex}:host([scale=s]){height:20px;width:20px}:host([scale=m]){height:24px;width:24px}:host([scale=l]){height:28px;width:28px}.swatch{height:inherit;width:inherit;overflow:visible}.swatch rect{transition:all 150ms ease-in-out}";

const ACTIVE_BORDER_COLOR = "rgba(0, 0, 0, 0.15)";
const CalciteColorSwatch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.internalColor = Color(color);
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
    const { internalColor, active, theme } = this;
    const hex = internalColor.hex();
    const borderColor = active
      ? ACTIVE_BORDER_COLOR
      : internalColor[theme === "light" ? "darken" : "whiten"](0.25).hex();
    const borderRadius = active ? "100%" : "0";
    return (h(Host, { "aria-label": hex, title: hex }, h("svg", { class: CSS.swatch, xmlns: "http://www.w3.org/2000/svg" }, h("rect", { fill: hex, height: "100%", rx: borderRadius, stroke: borderColor, width: "100%" }))));
  }
  static get watchers() { return {
    "color": ["handleColorChange"]
  }; }
};
CalciteColorSwatch.style = calciteColorSwatchCss;

const INPUTTYPEICONS = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
};

const calciteInputCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}.sc-calcite-input:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-input-h{display:none}[scale=s].sc-calcite-input-h textarea.sc-calcite-input,[scale=s].sc-calcite-input-h input.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:0.75rem;padding:0.5rem;height:2rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input{min-height:32px}[scale=s].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:2rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input,[scale=s].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=s].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:32px;min-width:32px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input,[scale=m].sc-calcite-input-h input.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:0.875rem;padding:0.75rem;height:44px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input{min-height:44px}[scale=m].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:44px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input,[scale=m].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=m].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:44px;min-width:44px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input,[scale=l].sc-calcite-input-h input.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:1.125rem;padding:1rem;height:56px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input{min-height:56px}[scale=l].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:56px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input,[scale=l].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=l].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:56px;min-width:56px}[disabled].sc-calcite-input-h{pointer-events:none}[disabled].sc-calcite-input-h .calcite-input-wrapper.sc-calcite-input{opacity:0.4;pointer-events:none}[disabled].sc-calcite-input-h textarea.sc-calcite-input,[disabled].sc-calcite-input-h input.sc-calcite-input{pointer-events:none}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{display:flex;position:relative;min-width:20%;max-width:100%;max-height:100%;flex:1;box-sizing:border-box;-webkit-appearance:none;font-family:inherit;transition:150ms ease-in-out, height 0s;box-shadow:0 0 0 0 transparent;outline:0;margin:0;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);font-weight:400;border-radius:0;-webkit-border-radius:0}.sc-calcite-input-h input[type=search].sc-calcite-input::-webkit-search-decoration{-webkit-appearance:none}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.sc-calcite-input-h textarea.sc-calcite-input:focus,.sc-calcite-input-h input.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.sc-calcite-input-h input.sc-calcite-input,.sc-calcite-input-h textarea.sc-calcite-input{color:var(--calcite-ui-text-1);border:1px solid var(--calcite-ui-border-1)}.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}.sc-calcite-input-h input.sc-calcite-input::placeholder,.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h input.sc-calcite-input::-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}.sc-calcite-input-h input.sc-calcite-input:focus,.sc-calcite-input-h textarea.sc-calcite-input:focus{border-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-text-1)}.sc-calcite-input-h input[readonly].sc-calcite-input,.sc-calcite-input-h textarea[readonly].sc-calcite-input{background-color:var(--calcite-ui-background)}.sc-calcite-input-h input[readonly].sc-calcite-input:focus,.sc-calcite-input-h textarea[readonly].sc-calcite-input:focus{color:var(--calcite-ui-text-1)}.sc-calcite-input-h calcite-icon.sc-calcite-input{color:var(--calcite-ui-text-1)}.sc-calcite-input-h slot.sc-calcite-input:not[name=input-message]{display:block;margin-bottom:0.375rem;color:var(--calcite-ui-text-2);font-weight:500}[icon].sc-calcite-input-h input.sc-calcite-input{padding-left:2.25rem}[dir=rtl][icon].sc-calcite-input-h input.sc-calcite-input{padding-right:2.25rem;padding-left:0.75rem}[dir=rtl][icon][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-right:3rem;padding-left:0.75rem}[icon][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-left:3rem}.calcite-input-element-wrapper.sc-calcite-input{display:inline-flex;flex:1;min-width:20%;position:relative;order:3}.calcite-input-icon.sc-calcite-input{display:block;position:absolute;pointer-events:none;transition:150ms ease-in-out;top:calc(50% - 9px);left:0.75rem;margin:1px auto 0;z-index:1}[scale=l].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{top:calc(50% - 12px)}[dir=rtl].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{left:unset;right:0.75rem}input[type=text].sc-calcite-input::-ms-clear{display:none;width:0;height:0}input[type=text].sc-calcite-input::-ms-reveal{display:none;width:0;height:0}input[type=search].sc-calcite-input::-webkit-search-decoration,input[type=search].sc-calcite-input::-webkit-search-cancel-button,input[type=search].sc-calcite-input::-webkit-search-results-button,input[type=search].sc-calcite-input::-webkit-search-results-decoration,input[type=date].sc-calcite-input::-webkit-clear-button,input[type=time].sc-calcite-input::-webkit-clear-button{display:none}.calcite-input-clear-button.sc-calcite-input{display:flex;align-self:stretch;align-items:center;justify-content:center;box-sizing:border-box;cursor:pointer;min-height:100%;border:1px solid var(--calcite-ui-border-1);transition:150ms ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none;order:4}.calcite-input-clear-button.sc-calcite-input:hover,.calcite-input-clear-button.sc-calcite-input:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-clear-button.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}.calcite-input-clear-button.sc-calcite-input:disabled{opacity:0.4}[dir=rtl].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:none}.calcite-input-clear-button.sc-calcite-input{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.calcite-input-clear-button.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-input-loading.sc-calcite-input{display:block;pointer-events:none;position:absolute;top:1px;left:1px;right:1px}.calcite-input-action-wrapper.sc-calcite-input{display:flex;order:7}.calcite-input-prefix.sc-calcite-input,.calcite-input-suffix.sc-calcite-input{display:flex;align-items:center;align-content:center;height:auto;min-height:100%;word-break:break-word;-webkit-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box;font-weight:500;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-background);color:var(--calcite-ui-text-2);line-height:1}.calcite-input-prefix.sc-calcite-input{order:2;border-right-width:0px}.calcite-input-suffix.sc-calcite-input{order:5;border-left-width:0px}[dir=rtl].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input{border-right-width:1px;border-left-width:0px}[dir=rtl].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{border-left-width:1px;border-right-width:0px}[readonly].sc-calcite-input-h .calcite-input-number-button-item.sc-calcite-input{pointer-events:none}[alignment=start].sc-calcite-input-h textarea.sc-calcite-input,[alignment=start].sc-calcite-input-h input.sc-calcite-input{text-align:left}[alignment=end].sc-calcite-input-h textarea.sc-calcite-input,[alignment=end].sc-calcite-input-h input.sc-calcite-input{text-align:right}[dir=rtl][alignment=start].sc-calcite-input-h textarea.sc-calcite-input,[dir=rtl][alignment=start].sc-calcite-input-h input.sc-calcite-input{text-align:right}[dir=rtl][alignment=end].sc-calcite-input-h textarea.sc-calcite-input,[dir=rtl][alignment=end].sc-calcite-input-h input.sc-calcite-input{text-align:left}.sc-calcite-input-h input[type=number].sc-calcite-input{-moz-appearance:textfield}.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-inner-spin-button,.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.calcite-input-number-button-wrapper.sc-calcite-input{box-sizing:border-box;display:flex;flex-direction:column;box-sizing:border-box;transition:150ms ease-in-out;pointer-events:none;order:6}[number-button-type=vertical].sc-calcite-input-h .calcite-input-wrapper.sc-calcite-input{flex-direction:row;display:flex}[number-button-type=vertical].sc-calcite-input-h input.sc-calcite-input,[number-button-type=vertical].sc-calcite-input-h textarea.sc-calcite-input{order:2}[dir=rtl][number-button-type=horizontal].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(-90deg)}[dir=rtl][number-button-type=horizontal].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(-90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{min-height:100%;max-height:100%;order:1;align-self:auto}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{order:5}[dir=rtl].sc-calcite-input-h .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input{border-right:1px solid var(--calcite-ui-border-1);border-left:0px}[dir=rtl].sc-calcite-input-h .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}[number-button-type=vertical].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=down].sc-calcite-input{border-top:0}.calcite-input-number-button-item.sc-calcite-input{display:flex;align-self:center;align-items:center;box-sizing:border-box;cursor:pointer;max-height:50%;min-height:50%;padding:0 0.75rem;border:1px solid var(--calcite-ui-border-1);transition:background-color 0.15s ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none}.calcite-input-number-button-item.sc-calcite-input calcite-icon.sc-calcite-input{pointer-events:none}.calcite-input-number-button-item.sc-calcite-input:hover,.calcite-input-number-button-item.sc-calcite-input:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-number-button-item.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}[dir=rtl][number-button-type=vertical].sc-calcite-input-h .calcite-input-number-button-item.sc-calcite-input{border-right:none;border-left:1px solid var(--calcite-ui-border-1)}.calcite-input-wrapper.sc-calcite-input{display:flex;flex-direction:row;position:relative}.sc-calcite-input-h input.sc-calcite-input::-webkit-calendar-picker-indicator{display:none}.sc-calcite-input-h input[type=date].sc-calcite-input::-webkit-input-placeholder{visibility:hidden !important}.sc-calcite-input-h textarea.sc-calcite-input::-webkit-resizer{box-sizing:border-box;position:absolute;bottom:0;right:0;padding:0 0.375rem}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.calcite-input-resize-icon-wrapper.sc-calcite-input{display:none}}.calcite-input-resize-icon-wrapper.sc-calcite-input{background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);position:absolute;z-index:1;bottom:2px;right:2px;pointer-events:none;width:16px;height:16px}.calcite-input-resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:4px;right:4px;transform:rotate(-45deg)}[dir=rtl].sc-calcite-input-h textarea.sc-calcite-input::-webkit-resizer{left:0;right:unset}[dir=rtl].sc-calcite-input-h .calcite-input-resize-icon-wrapper.sc-calcite-input{left:2px;right:unset}[dir=rtl].sc-calcite-input-h .calcite-input-resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:4px;right:4px;transform:rotate(45deg)}[type=file].sc-calcite-input-h input.sc-calcite-input,[type=file].sc-calcite-input-h textarea.sc-calcite-input{cursor:pointer;padding:1.5rem;border:1px dashed #d4d4d4;background-color:#f8f8f8;text-align:center}[status=invalid].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-red-1)}[status=valid].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-green-1)}[status=idle].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-text-2)}";

const CalciteInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInputFocus = createEvent(this, "calciteInputFocus", 7);
    this.calciteInputBlur = createEvent(this, "calciteInputBlur", 7);
    this.calciteInputInput = createEvent(this, "calciteInputInput", 7);
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
    /** specify the input type */
    this.type = "text";
    /** input value */
    this.value = "";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** keep track of the rendered child type */
    this.childElType = "input";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
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
        const inputStep = this.stepString ? parseFloat(this.stepString) : 1;
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
    this.maxString = this.max.toString() || null;
  }
  /** watcher to update number-to-string for min */
  minWatcher() {
    this.minString = this.min.toString() || null;
  }
  stepWatcher() {
    this.maxString = this.max.toString() || null;
  }
  valueWatcher() {
    this.calciteInputInput.emit({
      element: this.childEl,
      value: this.value
    });
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(INPUTTYPEICONS, this.icon, this.type);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);
  }
  componentWillLoad() {
    this.childElType = this.type === "textarea" ? "textarea" : "input";
    this.requestedIcon = setRequestedIcon(INPUTTYPEICONS, this.icon, this.type);
  }
  componentDidLoad() {
    var _a, _b, _c;
    this.minString = (_a = this.min) === null || _a === void 0 ? void 0 : _a.toString();
    this.maxString = (_b = this.max) === null || _b === void 0 ? void 0 : _b.toString();
    this.stepString = (_c = this.step) === null || _c === void 0 ? void 0 : _c.toString();
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
    const dir = getElementDir(this.el);
    const attributes = this.getAttributes();
    const loader = (h("div", { class: "calcite-input-loading" }, h("calcite-progress", { type: "indeterminate" })));
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
    const inputClearButton = (h("button", { class: "calcite-input-clear-button", disabled: this.loading, onClick: this.clearInputValue }, h("calcite-icon", { icon: "x", scale: iconScale, theme: this.theme })));
    const iconEl = (h("calcite-icon", { class: "calcite-input-icon", dir: dir, flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: iconScale, theme: this.theme }));
    const numberButtonClassModifier = this.numberButtonType === "horizontal" ? "number-button-item-horizontal" : null;
    const numberButtonsHorizontalUp = (h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, "data-adjustment": "up", onMouseDown: this.updateNumberValue }, h("calcite-icon", { icon: "chevron-up", scale: iconScale, theme: this.theme })));
    const numberButtonsHorizontalDown = (h("div", { class: `calcite-input-number-button-item ${numberButtonClassModifier}`, "data-adjustment": "down", onMouseDown: this.updateNumberValue }, h("calcite-icon", { icon: "chevron-down", scale: iconScale, theme: this.theme })));
    const numberButtonsVertical = (h("div", { class: `calcite-input-number-button-wrapper` }, numberButtonsHorizontalUp, numberButtonsHorizontalDown));
    const prefixText = h("div", { class: "calcite-input-prefix" }, this.prefixText);
    const suffixText = h("div", { class: "calcite-input-suffix" }, this.suffixText);
    const childEl = [
      h(this.childElType, Object.assign({}, attributes, { autofocus: this.autofocus ? true : null, disabled: this.disabled ? true : null, max: this.maxString, min: this.minString, onBlur: this.inputBlurHandler, onFocus: this.inputFocusHandler, onInput: this.inputInputHandler, placeholder: this.placeholder || "", ref: (el) => (this.childEl = el), required: this.required ? true : null, step: this.stepString, tabIndex: this.disabled ? -1 : null, type: this.type, value: this.value }), this.value),
      this.isTextarea ? (h("div", { class: "calcite-input-resize-icon-wrapper" }, h("calcite-icon", { icon: "chevron-down", scale: "s" }))) : null
    ];
    return (h(Host, { dir: dir, onClick: this.inputFocusHandler }, h("div", { class: "calcite-input-wrapper" }, this.type === "number" && this.numberButtonType === "horizontal"
      ? numberButtonsHorizontalDown
      : null, this.prefixText ? prefixText : null, h("div", { class: "calcite-input-element-wrapper" }, childEl, this.isClearable ? inputClearButton : null, this.requestedIcon ? iconEl : null, this.loading ? loader : null), h("div", { class: "calcite-input-action-wrapper" }, h("slot", { name: "input-action" })), this.type === "number" && this.numberButtonType === "vertical"
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
    if (this.isClearable && getKey(e.key) === "Escape") {
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
  getAttributes() {
    // spread attributes from the component to rendered child, filtering out props
    const props = [
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
    ];
    return Array.from(this.el.attributes)
      .filter((a) => a && !props.includes(a.name))
      .reduce((acc, { name, value }) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
  }
  get el() { return getElement(this); }
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

export { CalciteColorSwatch as calcite_color_swatch, CalciteInput as calcite_input };
