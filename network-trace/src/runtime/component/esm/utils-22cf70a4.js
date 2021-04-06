import { n as nodeListToArray } from './dom-558ef00c.js';

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
  return nodeListToArray(item.querySelectorAll("calcite-combobox-item"));
}
function hasActiveChildren(node) {
  const items = nodeListToArray(node.querySelectorAll("calcite-combobox-item"));
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

export { ComboboxItemGroup as C, ComboboxTransitionDuration as a, ComboboxChildSelector as b, getItemChildren as c, ComboboxItem as d, ComboboxDefaultPlacement as e, getAncestors as f, getItemAncestors as g, hasActiveChildren as h, getDepth as i };
