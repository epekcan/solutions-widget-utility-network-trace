import { a as getAssetPath, r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir } from './dom-b2b7d90d.js';
import { g as getKey } from './key-040272ec.js';
import { d as dateFromISO, a as dateToISO, b as dateFromRange, p as parseDateString, i as inRange } from './date-3d6f3569.js';

/**
 * List of supported country codes
 * @private
 */
const supportedLocales = [
  "ar",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "de-CH",
  "el",
  "en",
  "en-AU",
  "en-CA",
  "en-GB",
  "es",
  "es-MX",
  "et",
  "fi",
  "fr",
  "fr-CH",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "it-CH",
  "ja",
  "ko",
  "lt",
  "lv",
  "mk",
  "nb",
  "nl",
  "pl",
  "pt",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
];
/**
 * Get supported locale code from raw user input
 * Exported for testing purposes.
 * @private
 */
function getSupportedLocale(lang = "") {
  if (supportedLocales.indexOf(lang) > -1) {
    return lang;
  }
  else {
    const base = lang.split("-")[0];
    if (supportedLocales.indexOf(base) > -1) {
      return base;
    }
    else {
      return "en";
    }
  }
}
/**
 * CLDR cache.
 * Exported for testing purposes.
 * @private
 */
const translationCache = {};
/**
 * CLDR request cache.
 * Exported for testing purposes.
 * @private
 */
const requestCache = {};
/**
 * Fetch calendar data for a given locale from list of supported languages
 * @public
 */
async function getLocaleData(lang) {
  const locale = getSupportedLocale(lang);
  if (translationCache[locale]) {
    return translationCache[locale];
  }
  if (!requestCache[locale]) {
    requestCache[locale] = fetch(getAssetPath(`./calcite-date-nls/${locale}.json`))
      .then((resp) => resp.json())
      .catch(() => {
      console.error(`Translations for "${locale}" not found or invalid, falling back to english`);
      return getLocaleData("en");
    });
  }
  const data = await requestCache[locale];
  translationCache[locale] = data;
  return data;
}

const TEXT = {
  nextMonth: "next month",
  prevMonth: "previous month"
};

const calciteDateCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:inline-block;vertical-align:top;width:100%;position:relative;overflow:visible}.slot{display:none}:host([scale=s]){max-width:216px}:host([scale=m]){max-width:286px}:host([scale=l]){max-width:398px}.calendar-icon{color:var(--calcite-ui-text-3);position:absolute;top:50%;margin:-8px 0.75rem;pointer-events:none}.calendar-picker-wrapper{box-shadow:var(--calcite-shadow-2);position:absolute;top:100%;background-color:var(--calcite-ui-foreground-1);opacity:0;width:100%;line-height:0;visibility:hidden;overflow:visible;transform:translate3d(0, -1.5rem, 0);transition:all 0.15s ease-in-out;pointer-events:none;z-index:3}.input .calcite-input-wrapper{margin-top:0}:host([active]){box-shadow:var(--calcite-shadow-2);background-color:var(--calcite-ui-foreground-1);border-radius:var(--calcite-border-radius)}:host([active]) .calendar-picker-wrapper{opacity:1;transform:translate3d(0, 0, 0);visibility:visible;pointer-events:initial}:host([active]) .date-input-wrapper{border:1px solid var(--calcite-ui-foreground-1);border-bottom:1px solid var(--calcite-ui-border-3)}:host([no-calendar-input]){box-shadow:none}:host([no-calendar-input]) .calendar-picker-wrapper{box-shadow:none;position:static;transform:translate3d(0, 0, 0);border-radius:none;border:1px solid var(--calcite-ui-border-2)}";

const CalciteDate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDateChange = createEvent(this, "calciteDateChange", 7);
    /** Expand or collapse when calendar does not have input */
    this.active = false;
    /** Localized string for "previous month" (used for aria label) */
    this.intlPrevMonth = TEXT.prevMonth;
    /** Localized string for "next month" (used for aria label) */
    this.intlNextMonth = TEXT.nextMonth;
    /** BCP 47 language tag for desired language and country format */
    this.locale = document.documentElement.lang || "en-US";
    /** Show only calendar popup */
    this.noCalendarInput = false;
    /** specify the scale of the date picker */
    this.scale = "m";
    this.hasShadow =  !!document.head.attachShadow;
    /**
     * Update component based on input proxy
     */
    this.syncThisToProxyInput = () => {
      this.min = this.inputProxy.min;
      this.max = this.inputProxy.max;
      const min = dateFromISO(this.min);
      const max = dateFromISO(this.max);
      const date = dateFromISO(this.inputProxy.value);
      this.value = dateToISO(dateFromRange(date, min, max));
    };
    /**
     * Update input proxy
     */
    this.syncProxyInputToThis = () => {
      if (this.inputProxy) {
        this.inputProxy.value = this.value || "";
        if (this.min) {
          this.inputProxy.min = this.min;
        }
        if (this.max) {
          this.inputProxy.max = this.max;
        }
      }
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  focusOutHandler() {
    this.reset();
  }
  /**
   * Blur doesn't fire properly when there is no shadow dom (ege/IE11)
   * Check if the focused element is inside the date picker, if not close
   */
  focusInHandler(e) {
    if (!this.hasShadow && !this.el.contains(e.srcElement)) {
      this.reset();
    }
  }
  keyDownHandler(e) {
    if (getKey(e.key) === "Escape") {
      this.reset();
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.setupProxyInput();
    this.loadLocaleData();
    if (this.value) {
      this.setValueAsDate(this.value);
    }
  }
  componentWillRender() {
    this.syncProxyInputToThis();
  }
  render() {
    const min = dateFromISO(this.min);
    const max = dateFromISO(this.max);
    const date = dateFromRange(this.valueAsDate, min, max);
    const activeDate = this.getActiveDate(date, min, max);
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const dir = getElementDir(this.el);
    return (h(Host, { dir: dir, role: "application" }, h("div", { class: "slot" }, h("slot", null)), !this.noCalendarInput && this.localeData && (h("div", { role: "application" }, h("calcite-input", { class: "input", icon: "calendar", "number-button-type": "none", onCalciteInputBlur: (e) => this.blur(e.detail), onCalciteInputFocus: () => (this.active = true), onCalciteInputInput: (e) => this.input(e.detail.value), placeholder: this.localeData.placeholder, scale: this.scale, type: "text", value: formattedDate }))), this.localeData && (h("div", { class: "calendar-picker-wrapper" }, h("calcite-date-month-header", { activeDate: activeDate, dir: dir, intlNextMonth: this.intlNextMonth, intlPrevMonth: this.intlPrevMonth, localeData: this.localeData, max: max, min: min, onCalciteActiveDateChange: (e) => {
        this.setValue(new Date(e.detail));
        this.activeDate = new Date(e.detail);
        this.calciteDateChange.emit(new Date(e.detail));
      }, scale: this.scale, selectedDate: date || new Date() }), h("calcite-date-month", { activeDate: activeDate, dir: dir, localeData: this.localeData, max: max, min: min, onCalciteActiveDateChange: (e) => {
        this.activeDate = new Date(e.detail);
      }, onCalciteDateSelect: (e) => {
        this.setValue(new Date(e.detail));
        this.activeDate = new Date(e.detail);
        this.calciteDateChange.emit(new Date(e.detail));
        this.reset();
      }, scale: this.scale, selectedDate: date })))));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  valueWatcher(value) {
    this.setValueAsDate(value);
  }
  async loadLocaleData() {
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }
  /**
   * Register slotted date input proxy, or create one if not provided
   */
  setupProxyInput() {
    // check for a proxy input
    this.inputProxy = this.el.querySelector("input");
    // if the user didn't pass a proxy input create one for them
    if (!this.inputProxy) {
      this.inputProxy = document.createElement("input");
      try {
        this.inputProxy.type = "date";
      }
      catch (e) {
        this.inputProxy.type = "text";
      }
      this.syncProxyInputToThis();
      this.el.appendChild(this.inputProxy);
    }
    this.syncThisToProxyInput();
    {
      this.observer = new MutationObserver(this.syncThisToProxyInput);
      this.observer.observe(this.inputProxy, { attributes: true });
    }
  }
  /**
   * Set both iso value and date value and update proxy
   */
  setValue(date) {
    this.value = new Date(date).toISOString().split("T")[0];
    this.syncProxyInputToThis();
  }
  /**
   * Update date instance of value if valid
   */
  setValueAsDate(value) {
    if (value) {
      const date = dateFromISO(value);
      if (date) {
        this.valueAsDate = date;
      }
    }
  }
  /**
   * Reset active date and close
   */
  reset() {
    if (this.valueAsDate) {
      this.activeDate = new Date(this.valueAsDate);
    }
    if (!this.noCalendarInput) {
      this.active = false;
    }
  }
  /**
   * If inputted string is a valid date, update value/active
   */
  input(value) {
    const date = this.getDateFromInput(value);
    if (date) {
      this.setValue(date);
      this.activeDate = date;
      this.calciteDateChange.emit(new Date(date));
    }
  }
  /**
   * Clean up invalid date from input on blur
   */
  blur(target) {
    const date = this.getDateFromInput(target.value);
    if (!date && this.valueAsDate) {
      target.value = this.valueAsDate.toLocaleDateString(this.locale);
    }
  }
  /**
   * Get an active date using the value, or current date as default
   */
  getActiveDate(value, min, max) {
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
  }
  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   */
  getDateFromInput(value) {
    if (!this.localeData) {
      return false;
    }
    const { separator } = this.localeData;
    const { day, month, year } = parseDateString(value, this.localeData);
    const validDay = day > 0;
    const validMonth = month > -1;
    const date = new Date(year, month, day);
    date.setFullYear(year);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter((c) => c).length > 2;
    const validYear = year.toString().length > 0;
    if (validDay &&
      validMonth &&
      validDate &&
      validLength &&
      validYear &&
      inRange(date, this.min, this.max)) {
      return date;
    }
    return false;
  }
  static get assetsDirs() { return ["calcite-date-nls"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueWatcher"],
    "locale": ["loadLocaleData"]
  }; }
};
CalciteDate.style = calciteDateCss;

export { CalciteDate as calcite_date };
