import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-cbdbef9d.js';
import { g as getElementDir } from './dom-b2b7d90d.js';
import { g as getKey } from './key-040272ec.js';
import { isHidden, isFocusable } from '@a11y/focus-trap/focusable';
import { queryShadowRoot } from '@a11y/focus-trap/shadow';

const calciteModalCss = "@keyframes calcite-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes calcite-fade-in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes calcite-fade-in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:fixed;top:0;right:0;bottom:0;left:0;display:flex;justify-content:center;align-items:center;overflow-y:hidden;color:var(--calcite-ui-text-2);opacity:0;visibility:hidden !important;transition:visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);z-index:101;--calcite-modal-title-padding:12px 16px;--calcite-modal-title-text:20px;--calcite-modal-content-padding:16px;--calcite-modal-content-text:16px;--calcite-modal-close-padding:12px;--calcite-modal-footer-padding:12px}:host([scale=s]){--calcite-modal-title-padding:8px 12px;--calcite-modal-title-text:18px;--calcite-modal-content-padding:12px;--calcite-modal-content-text:14px;--calcite-modal-close-padding:8px;--calcite-modal-footer-padding:8px}:host([scale=l]){--calcite-modal-title-padding:16px 20px;--calcite-modal-title-text:26px;--calcite-modal-content-padding:20px;--calcite-modal-content-text:18px;--calcite-modal-close-padding:16px;--calcite-modal-footer-padding:16px}.scrim{position:fixed;top:0;right:0;bottom:0;left:0;display:flex;overflow-y:hidden}.modal{box-shadow:var(--calcite-shadow-2-press);box-sizing:border-box;z-index:102;float:none;text-align:left;-webkit-overflow-scrolling:touch;display:flex;flex-direction:column;flex-wrap:row-wrap;opacity:0;visibility:hidden;pointer-events:none;transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transform:translate3d(0, 20px, 0);background-color:var(--calcite-ui-foreground-1);border-radius:var(--calcite-border-radius);margin:1.5rem;width:100%}.modal__close{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.modal__close.modal__close:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([is-active]){visibility:visible !important;opacity:1;transition-delay:0ms}:host([is-active]) .modal{pointer-events:auto;visibility:visible;opacity:1;transition-delay:0ms;transform:translate3d(0, 0, 0);transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88)}:host([dir=rtl]) .modal{text-align:right}.modal__header{background-color:var(--calcite-ui-foreground-1);flex:0 0 auto;display:flex;max-width:100%;min-width:0;z-index:2;border-bottom:1px solid var(--calcite-ui-border-3);border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.modal__close{padding:var(--calcite-modal-close-padding);margin:0;order:2;flex:0 0 auto;transition-delay:300ms;transition:all 0.15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;color:var(--calcite-ui-text-1);outline:none;cursor:pointer;border-radius:0 var(--calcite-border-radius) 0 0}.modal__close calcite-icon{pointer-events:none;vertical-align:-2px}.modal__close:hover,.modal__close:focus{background-color:var(--calcite-ui-foreground-2)}.modal__close:active{background-color:var(--calcite-ui-foreground-3)}:host([dir=rtl]) .modal__close{border-radius:var(--calcite-border-radius) 0 0 0}.modal__title{display:flex;align-items:center;padding:var(--calcite-modal-title-padding);flex:1 1 auto;order:1;min-width:0}slot[name=header]::slotted(*),*::slotted([slot=header]){margin:0;font-weight:400;font-size:var(--calcite-modal-title-text);color:var(--calcite-ui-text-1)}.modal__content{position:relative;padding:0;height:100%;overflow:auto;max-height:calc(100vh - 12rem);overflow-y:auto;display:block;background-color:var(--calcite-ui-foreground-1);box-sizing:border-box;z-index:1}.modal__content--spaced{padding:var(--calcite-modal-content-padding)}slot[name=content]::slotted(*),*::slotted([slot=content]){font-size:var(--calcite-modal-content-text);line-height:1.5}:host([background-color=grey]) .modal__content{background-color:var(--calcite-ui-background)}.modal__footer{display:flex;flex:0 0 auto;justify-content:space-between;padding:var(--calcite-modal-footer-padding);margin-top:auto;box-sizing:border-box;border-radius:0 0 var(--calcite-border-radius) var(--calcite-border-radius);width:100%;background-color:var(--calcite-ui-foreground-1);border-top:1px solid var(--calcite-ui-border-3);z-index:2}.modal__footer--hide-back .modal__back,.modal__footer--hide-secondary .modal__secondary{display:none}.modal__back{display:block;margin-right:auto}:host([dir=rtl]) .modal__back{margin-left:auto;margin-right:unset}.modal__secondary{display:block;margin:0 0.375rem}slot[name=primary]{display:block}:host([width=small]) .modal{width:auto}:host([width=s]) .modal{max-width:32rem}@media screen and (max-width: 35rem){:host([width=s]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=s]) .modal__content{flex:1 1 auto;max-height:unset}:host([width=s]) .modal__header,:host([width=s]) .modal__footer{flex:inherit}:host([width=s][docked]){align-items:flex-end}}:host([width=m]) .modal{max-width:48rem}@media screen and (max-width: 51rem){:host([width=m]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=m]) .modal__content{flex:1 1 auto;max-height:unset}:host([width=m]) .modal__header,:host([width=m]) .modal__footer{flex:inherit}:host([width=m][docked]){align-items:flex-end}}:host([width=l]) .modal{max-width:94rem}@media screen and (max-width: 97rem){:host([width=l]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=l]) .modal__content{flex:1 1 auto;max-height:unset}:host([width=l]) .modal__header,:host([width=l]) .modal__footer{flex:inherit}:host([width=l][docked]){align-items:flex-end}}:host([fullscreen]){background-color:transparent}:host([fullscreen]) .modal{transform:translate3D(0, 20px, 0) scale(0.95);height:100%;max-height:100%;width:100%;max-width:100%;margin:0}:host([fullscreen]) .modal__content{flex:1 1 auto;max-height:100%}:host([fullscreen]) .modal__header,:host([fullscreen]) .modal__footer{flex:inherit}:host([is-active][fullscreen]) .modal{transform:translate3D(0, 0, 0) scale(1)}:host([is-active][fullscreen]) .modal__header{border-radius:0}:host([is-active][fullscreen]) .modal__footer{border-radius:0}:host([docked]) .modal{height:auto !important}:host([docked]) .modal__content{height:auto;flex:1 1 auto}@media screen and (max-width: 860px){:host([docked]) .modal{border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}:host([docked]) .modal__close{border-radius:0 var(--calcite-border-radius) 0 0}}@media screen and (max-width: 860px){:host([docked][dir=rtl]) .modal__close{border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}}:host([color=red]) .modal{border-top:4px solid var(--calcite-ui-red-1)}:host([color=blue]) .modal{border-top:4px solid var(--calcite-ui-blue-1)}:host([color=red]) .modal__header,:host([color=blue]) .modal__header{border-radius:var(--calcite-border-radius)}@media screen and (max-width: 860px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:1.2019rem;line-height:1.5}}@media screen and (max-width: 860px) and (max-width: 859px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:1.1305rem}}@media screen and (max-width: 860px) and (max-width: 479px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:1.0625rem}}@media screen and (max-width: 860px){.modal__title{padding:0.375rem 1.0125rem}}@media screen and (max-width: 860px){.modal__close{padding:0.75rem}}@media screen and (max-width: 860px){.modal__content--spaced{padding:1.0125rem}}@media screen and (max-width: 860px){.modal__footer{position:sticky;bottom:0}}@media screen and (max-width: 480px){.modal__footer{flex-direction:column}.modal__back,.modal__secondary{margin:0;margin-bottom:0.375rem}}";

const CalciteModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteModalOpen = createEvent(this, "calciteModalOpen", 7);
    this.calciteModalClose = createEvent(this, "calciteModalClose", 7);
    /** Optionally pass a function to run before close */
    this.beforeClose = () => Promise.resolve();
    /** Aria label for the close button */
    this.intlClose = "Close";
    /** specify the scale of modal, defaults to m */
    this.scale = "m";
    /** Set the width of the modal. Can use stock sizes or pass a number (in pixels) */
    this.width = "m";
    /** Background color of modal content */
    this.backgroundColor = "white";
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    // when modal initially renders, if active was set we need to open as watcher doesn't fire
    if (this.active) {
      this.open();
    }
  }
  render() {
    const dir = getElementDir(this.el);
    return (h(Host, { "aria-modal": "true", dir: dir, "is-active": this.isActive, role: "dialog" }, h("calcite-scrim", { class: "scrim", theme: "dark" }), this.renderStyle(), h("div", { class: "modal" }, h("div", { "data-focus-fence": "true", onFocus: this.focusLastElement.bind(this), tabindex: "0" }), h("div", { class: "modal__header" }, this.renderCloseButton(), h("header", { class: "modal__title" }, h("slot", { name: "header" }))), h("div", { class: {
        modal__content: true,
        "modal__content--spaced": !this.noPadding
      }, ref: (el) => (this.modalContent = el) }, h("slot", { name: "content" })), this.renderFooter(), h("div", { "data-focus-fence": "true", onFocus: this.focusFirstElement.bind(this), tabindex: "0" }))));
  }
  renderFooter() {
    return this.el.querySelector("[slot=back], [slot=secondary], [slot=primary]") ? (h("div", { class: "modal__footer" }, h("span", { class: "modal__back" }, h("slot", { name: "back" })), h("span", { class: "modal__secondary" }, h("slot", { name: "secondary" })), h("span", { class: "modal__primary" }, h("slot", { name: "primary" })))) : null;
  }
  renderCloseButton() {
    return !this.disableCloseButton ? (h("button", { "aria-label": this.intlClose, class: "modal__close", onClick: () => this.close(), ref: (el) => (this.closeButtonEl = el), title: this.intlClose }, h("calcite-icon", { icon: "x", scale: "l" }))) : null;
  }
  renderStyle() {
    const hasCustomWidth = !isNaN(parseInt(`${this.width}`));
    return hasCustomWidth ? (h("style", null, `
        .modal {
          max-width: ${this.width}px;
        }
        @media screen and (max-width: ${this.width}px) {
          .modal {
            height: 100%;
            max-height: 100%;
            width: 100%;
            max-width: 100%;
            margin: 0;
            border-radius: 0;
          }
          .modal__content {
            flex: 1 1 auto;
            max-height: unset;
          }
          .modal__header,
          .modal__footer {
            flex: inherit;
          }
        }
      `)) : null;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleEscape(e) {
    if (this.active && !this.disableEscape && getKey(e.key) === "Escape") {
      this.close();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Focus first interactive element */
  async focusElement(el) {
    var _a;
    if (el) {
      el.focus();
      return;
    }
    const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    else {
      (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  /** Set the scroll top of the modal content */
  async scrollContent(top = 0, left = 0) {
    if (this.modalContent) {
      if (this.modalContent.scrollTo) {
        this.modalContent.scrollTo({ top, left, behavior: "smooth" });
      }
      else {
        this.modalContent.scrollTop = top;
        this.modalContent.scrollLeft = left;
      }
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  async toggleModal(value, oldValue) {
    if (value !== oldValue) {
      if (value) {
        this.open();
      }
      else if (!value) {
        this.close();
      }
    }
  }
  /** Open the modal */
  open() {
    this.previousActiveElement = document.activeElement;
    this.isActive = true;
    // wait for the modal to open, then handle focus.
    setTimeout(() => {
      this.focusElement(this.firstFocus);
      this.calciteModalOpen.emit();
    }, 300);
    document.documentElement.classList.add("overflow-hidden");
  }
  /** Close the modal, first running the `beforeClose` method */
  close() {
    return this.beforeClose(this.el).then(() => {
      var _a;
      this.active = false;
      this.isActive = false;
      (_a = this.previousActiveElement) === null || _a === void 0 ? void 0 : _a.focus();
      document.documentElement.classList.remove("overflow-hidden");
      setTimeout(() => this.calciteModalClose.emit(), 300);
    });
  }
  focusFirstElement() {
    var _a;
    (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  focusLastElement() {
    var _a;
    const focusableElements = queryShadowRoot(this.el, isHidden, isFocusable).filter((el) => !el.getAttribute("data-focus-fence"));
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
    else {
      (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["toggleModal"]
  }; }
};
CalciteModal.style = calciteModalCss;

export { CalciteModal as calcite_modal };
