'use strict';

const dom = require('./dom-c66de328.js');

const ComboboxItem = "CALCITE-COMBOBOX-ITEM";
const ComboboxItemGroup = "CALCITE-COMBOBOX-ITEM-GROUP";
const ComboboxChildSelector = `${ComboboxItem}, ${ComboboxItemGroup}`;
const ComboboxDefaultPlacement = "bottom-start";
const ComboboxTransitionDuration = 150;

function getAncestors(element) {
  var _a, _b;
  const parent = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.closest(ComboboxChildSelector);
  const grandparent = (_b = parent === null || parent === void 0 ? void 0 : parent.parentElement) === null || _b === void 0 ? void 0 : _b.closest(ComboboxChildSelector);
  return [parent, grandparent].filter((el) => el);
}
function getItemAncestors(item) {
  var _a;
  return (((_a = item.ancestors) === null || _a === void 0 ? void 0 : _a.filter((el) => el.nodeName === "CALCITE-COMBOBOX-ITEM")) || []);
}
function getItemChildren(item) {
  return dom.nodeListToArray(item.querySelectorAll("calcite-combobox-item"));
}
function hasActiveChildren(node) {
  const items = dom.nodeListToArray(node.querySelectorAll("calcite-combobox-item"));
  return items.filter((item) => item.selected).length > 0;
}
function getDepth(element) {
  const [parent, grandparent] = getAncestors(element);
  if (!parent) {
    return 0;
  }
  if (!grandparent) {
    return 1;
  }
  return 2;
}

exports.ComboboxChildSelector = ComboboxChildSelector;
exports.ComboboxDefaultPlacement = ComboboxDefaultPlacement;
exports.ComboboxItem = ComboboxItem;
exports.ComboboxItemGroup = ComboboxItemGroup;
exports.ComboboxTransitionDuration = ComboboxTransitionDuration;
exports.getAncestors = getAncestors;
exports.getDepth = getDepth;
exports.getItemAncestors = getItemAncestors;
exports.getItemChildren = getItemChildren;
exports.hasActiveChildren = hasActiveChildren;
