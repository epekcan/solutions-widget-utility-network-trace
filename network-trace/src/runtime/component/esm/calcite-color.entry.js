import { r as registerInstance, c as createEvent, h, g as getElement } from './index-cbdbef9d.js';
import { f as focusElement, g as getElementDir } from './dom-b2b7d90d.js';
import { n as normalizeHex, C as CSSColorMode, p as parseMode, c as colorEqual } from './utils-047e4e48.js';
import Color from 'color';
import { D as DEFAULT_COLOR, T as TEXT, a as DIMENSIONS, C as CSS, H as HSV_LIMITS, b as DEFAULT_STORAGE_KEY_PREFIX, R as RGB_LIMITS } from './resources-8d6cad5d.js';
import { throttle } from 'lodash-es';

const calciteColorCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]) .container{width:156px}:host([scale=s]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(20px, 1fr))}:host([scale=s]) .channels{flex-direction:column}:host([scale=s]) .channel{width:100%;margin-bottom:4px}:host([scale=s]) .channel:last-child{margin-bottom:0}:host([scale=m]) .container{width:272px}:host([scale=l][dir=rtl]) .control-section>:nth-child(2){margin-left:0;margin-right:12px}:host([scale=l]) .container{width:420px}:host([scale=l]) .color-field-and-slider{margin-bottom:-20px}:host([scale=l]) .section{padding:0 16px 16px}:host([scale=l]) .section:first-of-type{padding-top:16px}:host([scale=l]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(28px, 1fr));grid-gap:12px;padding-top:16px}:host([scale=l]) .control-section{flex-wrap:nowrap}:host([scale=l]) .control-section>:nth-child(2){margin-left:12px}:host([scale=l]) .color-hex-options{flex-shrink:1}:host([scale=l]) .color-mode-container{flex-shrink:3}:host([appearance=minimal]) .container{border:none}.container{display:inline-block;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-foreground-1)}.color-field-and-slider{margin-bottom:-16px}.color-field-and-slider--interactive{cursor:pointer}.control-section{display:flex;flex-direction:row;flex-wrap:wrap}.section{padding:0 12px 12px}.section:first-of-type{padding-top:12px}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;color:var(--calcite-ui-text-3);font-weight:500;font-size:0.875rem;line-height:1.5}.header.header--underlined{border-bottom:1px solid var(--calcite-ui-border-1)}.header--hex{line-height:1.5;font-size:0.875rem;line-height:1.5;padding:12px 0 15px}.control{margin-top:8px}.channels{display:flex;justify-content:space-between}.channel{width:31%}.saved-colors{padding-top:12px;display:-ms-grid;display:grid;grid-template-columns:repeat(auto-fill, minmax(24px, 1fr));grid-gap:8px;width:100%}.saved-colors-buttons{display:flex}.saved-color{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;cursor:pointer}.saved-color:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.saved-color:hover{transition:outline-color 100ms ease-in-out;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}";

const throttleFor60FpsInMs = 16;
const defaultColor = normalizeHex(DEFAULT_COLOR.hex());
const CalciteColor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteColorChange = createEvent(this, "calciteColorChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Public properties
    //
    //--------------------------------------------------------------------------
    /** specify the appearance - default (containing border), or minimal (no containing border) */
    this.appearance = "default";
    /**
     * Internal prop for advanced use-cases.
     *
     * @internal
     */
    this.color = DEFAULT_COLOR;
    /** When true, hides the hex input */
    this.hideHex = false;
    /** When true, hides the RGB/HSV channel inputs */
    this.hideChannels = false;
    /** When true, hides the saved colors section */
    this.hideSaved = false;
    /** Label used for the blue channel */
    this.intlB = TEXT.b;
    /** Label used for the blue channel description */
    this.intlBlue = TEXT.blue;
    /** Label used for the delete color button. */
    this.intlDeleteColor = TEXT.deleteColor;
    /** Label used for the green channel */
    this.intlG = TEXT.g;
    /** Label used for the green channel description */
    this.intlGreen = TEXT.green;
    /** Label used for the hue channel */
    this.intlH = TEXT.h;
    /** Label used for the HSV mode */
    this.intlHsv = TEXT.hsv;
    /** Label used for the hex input */
    this.intlHex = TEXT.hex;
    /** Label used for the hue channel description */
    this.intlHue = TEXT.hue;
    /** Label used for the red channel */
    this.intlR = TEXT.r;
    /** Label used for the red channel description */
    this.intlRed = TEXT.red;
    /** Label used for the RGB mode */
    this.intlRgb = TEXT.rgb;
    /** Label used for the saturation channel */
    this.intlS = TEXT.s;
    /** Label used for the saturation channel description */
    this.intlSaturation = TEXT.saturation;
    /** Label used for the save color button. */
    this.intlSaveColor = TEXT.saveColor;
    /** Label used for the saved colors section */
    this.intlSaved = TEXT.saved;
    /** Label used for the value channel */
    this.intlV = TEXT.v;
    /** Label used for the  */
    this.intlValue = TEXT.value;
    /**
     * The scale of the color picker.
     */
    this.scale = "m";
    /**
     * The component's theme.
     */
    this.theme = "light";
    /**
     * The color value.
     *
     * This value can be either a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color|CSS string}
     * a RGB, HSL or HSV object.
     *
     * The type will be preserved as the color is updated.
     */
    this.value = defaultColor;
    //--------------------------------------------------------------------------
    //
    //  Internal State/Props
    //
    //--------------------------------------------------------------------------
    this.colorUpdateLocked = false;
    this.hueThumbState = "idle";
    this.mode = CSSColorMode.HEX;
    this.sliderThumbState = "idle";
    this.colorFieldAndSliderInteractive = false;
    this.channelMode = "rgb";
    this.channels = this.toChannels(DEFAULT_COLOR);
    this.dimensions = DIMENSIONS.m;
    this.savedColors = [];
    this.handleTabActivate = (event) => {
      this.channelMode = event.currentTarget.getAttribute("data-color-mode");
      this.updateChannelsFromColor(this.color);
    };
    this.handleHexInputChange = (event) => {
      event.stopPropagation();
      const { color } = this;
      const input = event.target;
      const hex = input.value;
      if (hex !== normalizeHex(color.hex())) {
        this.internalColorSet(Color(hex));
      }
    };
    this.handleSavedColorSelect = (event) => {
      const swatch = event.currentTarget;
      this.internalColorSet(Color(swatch.color));
    };
    this.handleChannelInput = (event) => {
      const input = event.target;
      const channelIndex = Number(input.getAttribute("data-channel-index"));
      const limit = this.channelMode === "rgb"
        ? RGB_LIMITS[Object.keys(RGB_LIMITS)[channelIndex]]
        : HSV_LIMITS[Object.keys(HSV_LIMITS)[channelIndex]];
      const clamped = Math.max(0, Math.min(Number(input.value), limit));
      input.value = `${clamped}`;
    };
    this.handleChannelChange = (event) => {
      const input = event.target;
      const channelIndex = Number(input.getAttribute("data-channel-index"));
      const channels = [...this.channels];
      channels[channelIndex] = Number(input.value);
      this.updateColorFromChannels(channels);
    };
    this.handleSavedColorKeyDown = (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        this.handleSavedColorSelect(event);
      }
    };
    this.handleColorFieldAndSliderMouseLeave = () => {
      this.colorFieldAndSliderInteractive = false;
    };
    this.handleColorFieldAndSliderMouseEnterOrMove = ({ offsetY }) => {
      const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
      this.colorFieldAndSliderInteractive = offsetY <= colorFieldHeight + sliderHeight;
    };
    this.renderChannelsTabTitle = (channelMode) => {
      const { channelMode: activeChannelMode, intlRgb, intlHsv } = this;
      const active = channelMode === activeChannelMode;
      const label = channelMode === "rgb" ? intlRgb : intlHsv;
      return (h("calcite-tab-title", { active: active, class: CSS.colorMode, "data-color-mode": channelMode, onCalciteTabsActivate: this.handleTabActivate }, label));
    };
    this.renderChannelsTab = (channelMode) => {
      const { channelMode: activeChannelMode, channels, intlB, intlBlue, intlG, intlGreen, intlH, intlHue, intlR, intlRed, intlS, intlSaturation, intlV, intlValue } = this;
      const active = channelMode === activeChannelMode;
      const isRgb = channelMode === "rgb";
      const channelLabels = isRgb ? [intlR, intlG, intlB] : [intlH, intlS, intlV];
      const channelAriaLabels = isRgb
        ? [intlRed, intlGreen, intlBlue]
        : [intlHue, intlSaturation, intlValue];
      return (h("calcite-tab", { active: active, class: CSS.control }, h("div", { class: CSS.channels }, channels.map((channel, index) => this.renderChannel(channel, index, channelLabels[index], channelAriaLabels[index])))));
    };
    this.renderChannel = (value, index, label, ariaLabel) => (h("calcite-input", { "aria-label": ariaLabel, class: CSS.channel, "data-channel-index": index, numberButtonType: "none", onChange: this.handleChannelChange, onInput: this.handleChannelInput, prefixText: label, scale: "s", type: "number", value: value.toString() }));
    this.deleteColor = () => {
      const colorToDelete = this.color.hex();
      const inStorage = this.savedColors.indexOf(colorToDelete) > -1;
      if (!inStorage) {
        return;
      }
      const savedColors = this.savedColors.filter((color) => color !== colorToDelete);
      this.savedColors = savedColors;
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
      if (this.storageId) {
        localStorage.setItem(storageKey, JSON.stringify(savedColors));
      }
    };
    this.saveColor = () => {
      const colorToSave = this.color.hex();
      const alreadySaved = this.savedColors.indexOf(colorToSave) > -1;
      if (alreadySaved) {
        return;
      }
      const savedColors = [...this.savedColors, colorToSave];
      this.savedColors = savedColors;
      const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
      if (this.storageId) {
        localStorage.setItem(storageKey, JSON.stringify(savedColors));
      }
    };
    this.drawColorFieldAndSlider = throttle(() => {
      if (!this.fieldAndSliderRenderingContext) {
        return;
      }
      this.drawColorField();
      this.drawHueSlider();
    }, throttleFor60FpsInMs);
    this.initColorFieldAndSlider = (canvas) => {
      this.fieldAndSliderRenderingContext = canvas.getContext("2d");
      this.setCanvasContextSize(canvas, {
        width: this.dimensions.colorField.width,
        height: this.dimensions.colorField.height +
          this.dimensions.slider.height +
          this.getSliderCapSpacing() * 2
      });
      this.drawColorFieldAndSlider();
      const yWithin = (y) => {
        const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height: sliderHeight } } } = this;
        if (y <= colorFieldHeight) {
          return "color-field";
        }
        if (y <= colorFieldHeight + sliderHeight) {
          return "slider";
        }
        return "none";
      };
      const captureColor = (x, y) => {
        const { dimensions: { colorField: { height, width } } } = this;
        const saturation = Math.round((HSV_LIMITS.s / width) * x);
        const value = Math.round((HSV_LIMITS.v / height) * (height - y));
        this.internalColorSet(this.color.hsv().saturationv(saturation).value(value));
      };
      canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
        const region = yWithin(offsetY);
        if (region === "color-field") {
          this.hueThumbState = "drag";
          captureColor(offsetX, offsetY);
        }
        else if (region === "slider") {
          this.sliderThumbState = "drag";
          captureSliderColor(offsetX);
        }
      });
      canvas.addEventListener("mouseout", () => {
        this.hueThumbState = "idle";
        this.sliderThumbState = "idle";
        this.drawColorFieldAndSlider();
      });
      canvas.addEventListener("mouseup", () => {
        this.hueThumbState = "hover";
        this.sliderThumbState = "hover";
        this.drawColorFieldAndSlider();
      });
      canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
        const region = yWithin(offsetY);
        if (region === "color-field") {
          const prevHueThumbState = this.hueThumbState;
          const color = this.color.hsv();
          const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
          const centerX = Math.round(color.saturationv() / (HSV_LIMITS.s / width));
          const centerY = Math.round(height - color.value() / (HSV_LIMITS.v / height));
          const hoveringThumb = this.containsPoint(offsetX, offsetY, centerX, centerY, radius);
          let transitionedBetweenHoverAndIdle = false;
          if (prevHueThumbState === "idle" && hoveringThumb) {
            this.hueThumbState = "hover";
            transitionedBetweenHoverAndIdle = true;
          }
          else if (prevHueThumbState === "hover" && !hoveringThumb) {
            this.hueThumbState = "idle";
            transitionedBetweenHoverAndIdle = true;
          }
          if (this.hueThumbState !== "drag") {
            if (transitionedBetweenHoverAndIdle) {
              // refresh since we won't update color and thus no redraw
              this.drawColorFieldAndSlider();
            }
            return;
          }
          captureColor(offsetX, offsetY);
        }
        else if (region === "slider") {
          const { dimensions: { slider: { height: sliderHeight, width: sliderWidth }, thumb: { radius: thumbRadius } } } = this;
          const prevSliderThumbState = this.sliderThumbState;
          const sliderThumbColor = this.color.hsv().saturationv(100).value(100);
          const sliderThumbCenterX = Math.round(sliderThumbColor.hue() / (360 / sliderWidth));
          const sliderThumbCenterY = Math.round((sliderHeight + this.getSliderCapSpacing()) / 2);
          const hoveringSliderThumb = this.containsPoint(offsetX, offsetY, sliderThumbCenterX, sliderThumbCenterY, thumbRadius);
          let sliderThumbTransitionedBetweenHoverAndIdle = false;
          if (prevSliderThumbState === "idle" && hoveringSliderThumb) {
            this.sliderThumbState = "hover";
            sliderThumbTransitionedBetweenHoverAndIdle = true;
          }
          else if (prevSliderThumbState === "hover" && !hoveringSliderThumb) {
            this.sliderThumbState = "idle";
            sliderThumbTransitionedBetweenHoverAndIdle = true;
          }
          if (this.sliderThumbState !== "drag") {
            if (sliderThumbTransitionedBetweenHoverAndIdle) {
              // refresh since we won't update color and thus no redraw
              this.drawColorFieldAndSlider();
            }
            return;
          }
          captureSliderColor(offsetX);
        }
      });
      const captureSliderColor = (x) => {
        const { dimensions: { slider: { width } } } = this;
        const hue = (360 / width) * x;
        this.internalColorSet(this.color.hue(hue));
      };
    };
  }
  handleColorChange(color) {
    this.drawColorFieldAndSlider();
    this.updateChannelsFromColor(color);
    if (this.colorUpdateLocked) {
      return;
    }
    const value = this.toValue(color);
    this.value = value;
  }
  handleScaleChange(scale = "m") {
    this.updateDimensions(scale);
  }
  handleValueChange(value, oldValue) {
    const nextMode = parseMode(value);
    if (!nextMode) {
      console.warn(`ignoring invalid color value: ${value}`);
      this.value = oldValue;
      return;
    }
    const modeChanged = this.mode !== nextMode;
    this.mode = nextMode;
    if (this.colorUpdateLocked) {
      this.calciteColorChange.emit();
      return;
    }
    const color = Color(value);
    const colorChanged = !colorEqual(color, this.color);
    if (modeChanged || colorChanged) {
      this.color = color;
      this.calciteColorChange.emit();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.hexInputNode);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    const storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}${this.storageId}`;
    if (this.storageId && localStorage.getItem(storageKey)) {
      this.savedColors = JSON.parse(localStorage.getItem(storageKey));
    }
    this.handleValueChange(this.value, defaultColor);
    this.updateDimensions(this.scale);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    const { color, intlDeleteColor, el, hideHex, hideChannels, hideSaved, intlHex, intlSaved, intlSaveColor, savedColors, scale, theme } = this;
    const selectedColorInHex = color.hex();
    const hexInputScale = scale !== "s" ? "m" : scale;
    const { colorFieldAndSliderInteractive } = this;
    const elementDir = getElementDir(el);
    return (h("div", { class: CSS.container }, h("canvas", { class: {
        [CSS.colorFieldAndSlider]: true,
        [CSS.colorFieldAndSliderInteractive]: colorFieldAndSliderInteractive
      }, onMouseEnter: this.handleColorFieldAndSliderMouseEnterOrMove, onMouseLeave: this.handleColorFieldAndSliderMouseLeave, onMouseMove: this.handleColorFieldAndSliderMouseEnterOrMove, ref: this.initColorFieldAndSlider }), hideHex && hideChannels ? null : (h("div", { class: { [CSS.controlSection]: true, [CSS.section]: true } }, hideHex ? null : (h("div", { class: CSS.hexOptions }, h("span", { class: {
        [CSS.header]: true,
        [CSS.headerHex]: true,
        [CSS.underlinedHeader]: true
      } }, intlHex), h("calcite-color-hex-input", { class: CSS.control, dir: elementDir, onCalciteColorHexInputChange: this.handleHexInputChange, ref: (node) => (this.hexInputNode = node), scale: hexInputScale, theme: theme, value: selectedColorInHex }))), hideChannels ? null : (h("calcite-tabs", { class: {
        [CSS.colorModeContainer]: true,
        [CSS.splitSection]: true
      }, dir: elementDir }, h("calcite-tab-nav", { slot: "tab-nav" }, this.renderChannelsTabTitle("rgb"), this.renderChannelsTabTitle("hsv")), this.renderChannelsTab("rgb"), this.renderChannelsTab("hsv"))))), hideSaved ? null : (h("div", { class: { [CSS.savedColorsSection]: true, [CSS.section]: true } }, h("div", { class: CSS.header }, h("label", null, intlSaved), h("div", { class: CSS.savedColorsButtons }, h("calcite-button", { appearance: "transparent", "aria-label": intlDeleteColor, class: CSS.deleteColor, color: "dark", iconStart: "minus", onClick: this.deleteColor, scale: scale, theme: theme }), h("calcite-button", { appearance: "transparent", "aria-label": intlSaveColor, class: CSS.saveColor, color: "dark", iconStart: "plus", onClick: this.saveColor, scale: scale, theme: theme }))), savedColors.length > 0 ? (h("div", { class: CSS.savedColors }, [
      ...savedColors.map((color) => (h("calcite-color-swatch", { active: selectedColorInHex === color, class: CSS.savedColor, color: color, key: color, onClick: this.handleSavedColorSelect, onKeyDown: this.handleSavedColorKeyDown, scale: scale, tabIndex: 0, theme: theme })))
    ])) : null))));
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  internalColorSet(color) {
    if (colorEqual(color, this.color)) {
      return;
    }
    this.colorUpdateLocked = true;
    this.color = color;
    this.value = this.toValue(color);
    this.colorUpdateLocked = false;
  }
  toValue(color) {
    const { mode } = this;
    const hexMode = "hex";
    if (mode.includes(hexMode)) {
      return normalizeHex(color[hexMode]());
    }
    if (mode.includes("-css")) {
      return color[mode.replace("-css", "").replace("a", "")]().string();
    }
    const colorObject = color[mode]().round().object();
    if (mode.endsWith("a")) {
      // normalize alpha prop
      colorObject.a = colorObject.alpha;
      delete colorObject.alpha;
    }
    return colorObject;
  }
  getSliderCapSpacing() {
    const { dimensions: { slider: { height }, thumb: { radius } } } = this;
    return radius * 2 - height;
  }
  updateDimensions(scale = "m") {
    this.dimensions = DIMENSIONS[scale];
  }
  drawColorField() {
    const context = this.fieldAndSliderRenderingContext;
    const { dimensions: { colorField: { height, width } } } = this;
    context.fillStyle = this.color.hsv().saturationv(100).value(100).string();
    context.fillRect(0, 0, width, height);
    const whiteGradient = context.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
    whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = whiteGradient;
    context.fillRect(0, 0, width, height);
    const blackGradient = context.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, "rgba(0,0,0,0)");
    blackGradient.addColorStop(1, "rgba(0,0,0,1)");
    context.fillStyle = blackGradient;
    context.fillRect(0, 0, width, height);
    this.drawActiveColorFieldColor();
  }
  setCanvasContextSize(canvas, { height, width }) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    const context = canvas.getContext("2d");
    context.scale(devicePixelRatio, devicePixelRatio);
  }
  containsPoint(testPointX, testPointY, boundsX, boundsY, boundsRadius) {
    return (Math.pow(testPointX - boundsX, 2) + Math.pow(testPointY - boundsY, 2) <=
      Math.pow(boundsRadius, 2));
  }
  drawActiveColorFieldColor() {
    const color = this.color.hsv();
    const { dimensions: { colorField: { height, width }, thumb: { radius } } } = this;
    const x = color.saturationv() / (HSV_LIMITS.s / width);
    const y = height - color.value() / (HSV_LIMITS.v / height);
    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.hueThumbState);
  }
  drawThumb(context, radius, x, y, color, state) {
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle);
    context.shadowBlur = state === "hover" ? 32 : 16;
    context.shadowColor = `rgba(0, 0, 0, ${state === "drag" ? 0.32 : 0.16})`;
    context.fillStyle = "#fff";
    context.fill();
    context.beginPath();
    context.arc(x, y, radius - 3, startAngle, endAngle);
    context.shadowBlur = 0;
    context.shadowColor = "transparent";
    context.fillStyle = color.rgb().string();
    context.fill();
  }
  drawActiveHueSliderColor() {
    const color = this.color.hsv().saturationv(100).value(100);
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width }, thumb: { radius } } } = this;
    const x = color.hue() / (360 / width);
    const y = height / 2 + colorFieldHeight;
    this.drawThumb(this.fieldAndSliderRenderingContext, radius, x, y, color, this.sliderThumbState);
  }
  drawHueSlider() {
    const context = this.fieldAndSliderRenderingContext;
    const { dimensions: { colorField: { height: colorFieldHeight }, slider: { height, width } } } = this;
    const gradient = context.createLinearGradient(0, 0, width, 0);
    const hueSliderColorStopKeywords = ["red", "yellow", "lime", "cyan", "blue", "magenta", "red"];
    const offset = 1 / (hueSliderColorStopKeywords.length - 1);
    let currentOffset = 0;
    hueSliderColorStopKeywords.forEach((keyword) => {
      gradient.addColorStop(currentOffset, Color(keyword).string());
      currentOffset += offset;
    });
    context.fillStyle = gradient;
    context.clearRect(0, colorFieldHeight, width, height + this.getSliderCapSpacing() * 2);
    context.fillRect(0, colorFieldHeight, width, height);
    this.drawActiveHueSliderColor();
  }
  updateColorFromChannels(channels) {
    this.internalColorSet(Color(channels, this.channelMode));
  }
  updateChannelsFromColor(color) {
    this.channels = this.toChannels(color);
  }
  toChannels(color) {
    const { channelMode } = this;
    return color[channelMode]()
      .array()
      .map((value) => Math.floor(value));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "color": ["handleColorChange"],
    "scale": ["handleScaleChange"],
    "value": ["handleValueChange"]
  }; }
};
CalciteColor.style = calciteColorCss;

export { CalciteColor as calcite_color };
