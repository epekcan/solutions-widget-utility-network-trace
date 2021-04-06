import { r as registerInstance, c as createEvent, h, g as getElement } from './index-cbdbef9d.js';

const CSS = {
  handle: "handle",
  handleActivated: "handle--activated"
};
const ICONS = {
  drag: "drag"
};

const calciteHandleCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex}.handle{display:flex;align-items:center;align-self:stretch;justify-content:center;color:var(--calcite-ui-text-2);background-color:transparent;border-style:none;cursor:move;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;padding:0.75rem 0.25rem;line-height:0}.handle:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-2)}.handle:focus{color:var(--calcite-ui-text-1);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.handle--activated{background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-1)}";

const CalciteHandle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteHandleNudge = createEvent(this, "calciteHandleNudge", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * @internal - stores the activated state of the drag handle.
     */
    this.activated = false;
    /**
     * Value for the button title attribute
     */
    this.textTitle = "handle";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleKeyDown = (event) => {
      switch (event.key) {
        case " ":
          this.activated = !this.activated;
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!this.activated) {
            return;
          }
          const direction = event.key.toLowerCase().replace("arrow", "");
          this.calciteHandleNudge.emit({ handle: this.el, direction });
          break;
      }
    };
    this.handleBlur = () => {
      this.activated = false;
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  async setFocus() {
    this.handleButton.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
    // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486
    h("span", { "aria-pressed": this.activated.toString(), class: { [CSS.handle]: true, [CSS.handleActivated]: this.activated }, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, ref: (el) => {
        this.handleButton = el;
      }, role: "button", tabindex: "0", title: this.textTitle }, h("calcite-icon", { icon: ICONS.drag, scale: "s" })));
  }
  get el() { return getElement(this); }
};
CalciteHandle.style = calciteHandleCss;

export { CalciteHandle as calcite_handle };
