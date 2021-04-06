'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');
const key = require('./key-214fea4a.js');
const date = require('./date-caa4313a.js');

const calciteDateMonthCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}.calender{padding-bottom:4px}.week-headers{display:flex;flex-direction:row;border-top:1px solid var(--calcite-ui-border-3);padding:0 4px}.week-header{color:var(--calcite-ui-text-3);font-weight:600;width:calc(100% / 7);text-align:center}:host([scale=s]) .week-header{font-size:12px;padding:16px 0 16px 0}:host([scale=m]) .week-header{font-size:12px;padding:24px 0 20px 0}:host([scale=l]) .week-header{font-size:14px;padding:32px 0 24px 0}.week-days{outline:none;display:flex;flex-direction:row;padding:0 3px}";

const CalciteDateMonth = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteDateSelect = index.createEvent(this, "calciteDateSelect", 7);
    this.calciteActiveDateChange = index.createEvent(this, "calciteActiveDateChange", 7);
    /** Date currently active.*/
    this.activeDate = new Date();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  keyDownHandler(e) {
    const isRTL = this.el.dir === "rtl";
    switch (key.getKey(e.key)) {
      case "ArrowUp":
        e.preventDefault();
        this.addDays(-7);
        break;
      case "ArrowRight":
        e.preventDefault();
        this.addDays(isRTL ? -1 : 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        this.addDays(7);
        break;
      case "ArrowLeft":
        e.preventDefault();
        this.addDays(isRTL ? 1 : -1);
        break;
      case "PageUp":
        e.preventDefault();
        this.addMonths(-1);
        break;
      case "PageDown":
        e.preventDefault();
        this.addMonths(1);
        break;
      case "Home":
        e.preventDefault();
        this.activeDate.setDate(1);
        this.addDays();
        break;
      case "End":
        e.preventDefault();
        this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
        this.addDays();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        this.calciteDateSelect.emit(this.activeDate);
        break;
      case "Tab":
        this.activeFocus = false;
    }
  }
  /**
   * Once user is not interacting via keyboard,
   * disable auto focusing of active date
   */
  disableActiveFocus() {
    this.activeFocus = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const month = this.activeDate.getMonth();
    const year = this.activeDate.getFullYear();
    const startOfWeek = this.localeData.weekStart % 7;
    const { abbreviated, short, narrow } = this.localeData.days;
    const weekDays = this.scale === "s" ? narrow || short || abbreviated : short || abbreviated || narrow;
    const adjustedWeekDays = [...weekDays.slice(startOfWeek, 7), ...weekDays.slice(0, startOfWeek)];
    const curMonDays = this.getCurrentMonthDays(month, year);
    const prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
    const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
    const days = [
      ...prevMonDays.map((day) => {
        const date$1 = new Date(year, month - 1, day);
        return (index.h("calcite-date-day", { day: day, disabled: !date.inRange(date$1, this.min, this.max), localeData: this.localeData, onCalciteDaySelect: () => this.calciteDateSelect.emit(date$1), scale: this.scale, selected: date.sameDate(date$1, this.selectedDate) }));
      }),
      ...curMonDays.map((day) => {
        const date$1 = new Date(year, month, day);
        const active = date.sameDate(date$1, this.activeDate);
        return (index.h("calcite-date-day", { active: active, "current-month": true, day: day, disabled: !date.inRange(date$1, this.min, this.max), localeData: this.localeData, onCalciteDaySelect: () => this.calciteDateSelect.emit(date$1), ref: (el) => {
            // when moving via keyboard, focus must be updated on active date
            if (active && this.activeFocus) {
              el === null || el === void 0 ? void 0 : el.focus();
            }
          }, scale: this.scale, selected: date.sameDate(date$1, this.selectedDate) }));
      }),
      ...nextMonDays.map((day) => {
        const date$1 = new Date(year, month + 1, day);
        return (index.h("calcite-date-day", { day: day, disabled: !date.inRange(date$1, this.min, this.max), localeData: this.localeData, onCalciteDaySelect: () => this.calciteDateSelect.emit(date$1), scale: this.scale, selected: date.sameDate(date$1, this.selectedDate) }));
      })
    ];
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return (index.h(index.Host, null, index.h("div", { class: "calender", role: "grid" }, index.h("div", { class: "week-headers", role: "row" }, adjustedWeekDays.map((weekday) => (index.h("span", { class: "week-header", role: "columnheader" }, weekday)))), weeks.map((days) => (index.h("div", { class: "week-days", role: "row" }, days))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Add n months to the current month
   */
  addMonths(step) {
    const nextDate = new Date(this.activeDate);
    nextDate.setMonth(this.activeDate.getMonth() + step);
    this.calciteActiveDateChange.emit(date.dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }
  /**
   * Add n days to the current date
   */
  addDays(step = 0) {
    const nextDate = new Date(this.activeDate);
    nextDate.setDate(this.activeDate.getDate() + step);
    this.calciteActiveDateChange.emit(date.dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }
  /**
   * Get dates for last days of the previous month
   */
  getPrevMonthdays(month, year, startOfWeek) {
    const lastDate = new Date(year, month, 0);
    const date = lastDate.getDate();
    const day = lastDate.getDay();
    const days = [];
    if (day - 6 === startOfWeek) {
      return days;
    }
    for (let i = lastDate.getDay(); i >= startOfWeek; i--) {
      days.push(date - i);
    }
    return days;
  }
  /**
   * Get dates for the current month
   */
  getCurrentMonthDays(month, year) {
    const num = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < num; i++) {
      days.push(i + 1);
    }
    return days;
  }
  /**
   * Get dates for first days of the next month
   */
  getNextMonthDays(month, year, startOfWeek) {
    const endDay = new Date(year, month + 1, 0).getDay();
    const days = [];
    if (endDay === (startOfWeek + 6) % 7) {
      return days;
    }
    for (let i = 0; i < (6 - (endDay - startOfWeek)) % 7; i++) {
      days.push(i + 1);
    }
    return days;
  }
  get el() { return index.getElement(this); }
};
CalciteDateMonth.style = calciteDateMonthCss;

const calciteDateMonthHeaderCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}.header{display:flex;justify-content:space-between;padding:0 3px}:host([scale=s]) .text{font-size:14px}:host([scale=s]) .chevron{height:38px}:host([scale=m]) .text{font-size:16px}:host([scale=m]) .chevron{height:48px}:host([scale=l]) .text{font-size:18px}:host([scale=l]) .chevron{height:64px}.chevron{color:var(--calcite-ui-text-2);flex-grow:0;width:calc(100% / 7);box-sizing:content-box;outline:none;padding:0 4px;margin:0 -3px;border:none;display:flex;align-items:center;justify-content:center;background-color:var(--calcite-ui-foreground-1);cursor:pointer;transition:all 0.15s ease-in-out;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.chevron:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.chevron:hover,.chevron:focus{fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-2)}.chevron:active{background-color:var(--calcite-ui-foreground-3)}.chevron[aria-disabled=true]{pointer-events:none;opacity:0}.text{flex:1 1 auto;display:flex;align-items:center;justify-content:center;flex-direction:row;line-height:1;margin:auto 0;text-align:center}.text--reverse{flex-direction:row-reverse}.month,.year,.suffix{color:var(--calcite-ui-text-1);background:var(--calcite-ui-foreground-1);font-size:inherit;font-weight:500;line-height:1.25;margin:0 4px;display:inline-block}.year{font-family:inherit;text-align:center;border:none;width:3em;padding:0;background-color:transparent;position:relative;z-index:2;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.year:hover{transition:outline-color 100ms ease-in-out;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}.year:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.year--suffix{width:4rem;text-align:left}.year-wrap{position:relative}.suffix{position:absolute;width:4rem;white-space:nowrap;text-align:left;top:0;left:0}.suffix__invisible{visibility:hidden}";

const CalciteDateMonthHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteActiveDateChange = index.createEvent(this, "calciteActiveDateChange", 7);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    var _a;
    const activeMonth = this.activeDate.getMonth();
    const { months, unitOrder } = this.localeData;
    const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
    const localizedYear = date.localizeNumber(this.activeDate.getFullYear(), this.localeData);
    const iconScale = this.scale === "l" ? "m" : "s";
    const dir = dom.getElementDir(this.el);
    const order = date.getOrder(unitOrder);
    const reverse = order.indexOf("y") < order.indexOf("m");
    const nextMonthDate = date.dateFromRange(date.nextMonth(this.activeDate), this.min, this.max);
    const prevMonthDate = date.dateFromRange(date.prevMonth(this.activeDate), this.min, this.max);
    const suffix = (_a = this.localeData.year) === null || _a === void 0 ? void 0 : _a.suffix;
    return (index.h(index.Host, { dir: dir }, index.h("div", { class: "header" }, index.h("a", { "aria-disabled": (nextMonthDate.getMonth() === activeMonth).toString(), "aria-label": this.intlPrevMonth, class: "chevron", href: "#", onClick: (e) => this.handleArrowClick(e, prevMonthDate), onKeyDown: (e) => this.handleKeyDown(e, prevMonthDate), role: "button", tabindex: "0" }, index.h("calcite-icon", { dir: dir, "flip-rtl": true, icon: "chevron-left", scale: iconScale })), index.h("div", { class: { text: true, "text--reverse": reverse } }, index.h("span", { "aria-level": "2", class: "month", role: "heading" }, localizedMonth), index.h("span", { class: "year-wrap" }, index.h("input", { class: {
        year: true,
        "year--suffix": !!suffix
      }, inputmode: "numeric", maxlength: "4", minlength: "1", onChange: (event) => this.setYear(event.target.value), onKeyDown: (event) => this.onYearKey(event), pattern: "\\d*", ref: (el) => (this.yearInput = el), type: "text", value: localizedYear }), suffix && (index.h("span", { class: "suffix" }, index.h("span", { "aria-hidden": "true", class: "suffix__invisible" }, localizedYear), " " + suffix)))), index.h("a", { "aria-disabled": (nextMonthDate.getMonth() === activeMonth).toString(), "aria-label": this.intlNextMonth, class: "chevron", href: "#", onClick: (e) => this.handleArrowClick(e, nextMonthDate), onKeyDown: (e) => this.handleKeyDown(e, nextMonthDate), role: "button", tabindex: "0" }, index.h("calcite-icon", { dir: dir, "flip-rtl": true, icon: "chevron-right", scale: iconScale })))));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Increment year on UP/DOWN keys
   */
  onYearKey(e) {
    const year = e.target.value;
    switch (key.getKey(e.key)) {
      case "ArrowDown":
        e.preventDefault();
        this.setYear(year, -1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.setYear(year, 1);
        break;
    }
  }
  /*
   * Update active month on clicks of left/right arrows
   */
  handleArrowClick(e, date) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    e.stopPropagation();
    this.calciteActiveDateChange.emit(date);
  }
  /*
   * Because we have to use an anchor rather than button (#1069),
   * ensure enter/space work like a button would
   */
  handleKeyDown(e, date) {
    const key$1 = key.getKey(e.key);
    if (key$1 === " " || key$1 === "Enter") {
      this.handleArrowClick(e, date);
    }
  }
  /**
   * Parse localized year string from input,
   * set to active if in range
   */
  setYear(localizedYear, increment = 0) {
    const { min, max, activeDate, localeData, yearInput } = this;
    const parsedYear = date.parseNumber(localizedYear, localeData);
    const length = parsedYear.toString().length;
    const year = isNaN(parsedYear) ? false : parsedYear + increment;
    const inRange = year && (!min || min.getFullYear() <= year) && (!max || max.getFullYear() >= year);
    // if you've supplied a year and it's in range, update active date
    if (year && inRange && length === localizedYear.length) {
      const nextDate = new Date(activeDate);
      nextDate.setFullYear(year);
      const inRangeDate = date.dateFromRange(nextDate, min, max);
      this.calciteActiveDateChange.emit(inRangeDate);
      yearInput.value = date.localizeNumber(inRangeDate.getFullYear(), localeData);
    }
    else {
      // leave the current active date and clean up garbage input
      yearInput.value = date.localizeNumber(activeDate.getFullYear(), localeData);
    }
  }
  get el() { return index.getElement(this); }
};
CalciteDateMonthHeader.style = calciteDateMonthHeaderCss;

exports.calcite_date_month = CalciteDateMonth;
exports.calcite_date_month_header = CalciteDateMonthHeader;
