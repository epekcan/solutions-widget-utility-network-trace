'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const utils = require('./utils-87f837c4.js');

/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 */
function stringToHex(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let hex = "#";
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xff;
    hex += ("00" + value.toString(16)).substr(-2);
  }
  return hex;
}
/**
 * Find the hue of a color given the separate RGB color channels
 */
function rgbToHue(rgb) {
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (max === min) {
    return 0;
  }
  let hue = (max + min) / 2;
  switch (max) {
    case r:
      hue = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      hue = (b - r) / delta + 2;
      break;
    case b:
      hue = (r - g) / delta + 4;
      break;
  }
  return Math.round(hue * 60);
}
/**
 * For a hex color, find the hue
 * @param hex {string} - form of "#------"
 */
function hexToHue(hex) {
  return rgbToHue(utils.hexToRGB(hex));
}

const calciteAvatarCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-flex;justify-content:center;align-items:center;border-radius:50%;overflow:hidden}:host([scale=s]){width:1.5rem;height:1.5rem;font-size:var(--calcite-font-size--3)}:host([scale=m]){width:2rem;height:2rem;font-size:var(--calcite-font-size--2)}:host([scale=l]){width:2.5rem;height:2.5rem;font-size:var(--calcite-font-size--1)}.icon{display:flex}.background{width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:50%}.initials{font-weight:var(--calcite-font-weight-bold);text-transform:uppercase;color:var(--calcite-ui-text-3)}.thumbnail{width:100%;height:100%;border-radius:50%}";

const CalciteAvatar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** specify the scale of the avatar, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** True if thumnail fails to load */
    this.error = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const dir = dom.getElementDir(this.el);
    const content = this.determineContent();
    return index.h(index.Host, { dir: dir }, content);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  determineContent() {
    if (this.thumbnail && !this.error) {
      return (index.h("img", { alt: "", class: "thumbnail", onError: () => (this.error = true), src: this.thumbnail }));
    }
    const initials = this.generateInitials();
    const backgroundColor = this.generateFillColor();
    return (index.h("span", { class: "background", style: { backgroundColor } }, initials ? (index.h("span", { "aria-hidden": "true", class: "initials" }, initials)) : (index.h("calcite-icon", { class: "icon", icon: "user", scale: this.scale, theme: this.theme }))));
  }
  /**
   * Generate a valid background color that is consistent and unique to this user
   */
  generateFillColor() {
    const { userId, username, fullName } = this;
    const theme = dom.getElementTheme(this.el);
    const id = userId && `#${userId.substr(userId.length - 6)}`;
    const name = username || fullName || "";
    const hex = id && utils.isValidHex(id) ? id : stringToHex(name);
    // if there is not unique information, or an invalid hex is produced, return a default
    if ((!userId && !name) || !utils.isValidHex(hex)) {
      return `var(--calcite-ui-foreground-2)`;
    }
    const hue = hexToHue(hex);
    const l = theme === "dark" ? 20 : 90;
    return `hsl(${hue}, 60%, ${l}%)`;
  }
  /**
   * Use fullname or username to generate initials
   */
  generateInitials() {
    const { fullName, username } = this;
    if (fullName) {
      return fullName
        .trim()
        .split(" ")
        .map((name) => name.substring(0, 1))
        .join("");
    }
    else if (username) {
      return username.substring(0, 2);
    }
    return false;
  }
  get el() { return index.getElement(this); }
};
CalciteAvatar.style = calciteAvatarCss;

exports.calcite_avatar = CalciteAvatar;
