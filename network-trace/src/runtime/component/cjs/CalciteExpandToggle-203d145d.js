'use strict';

const index = require('./index-adeb0063.js');
const dom = require('./dom-38a6a540.js');

const ICONS = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function getCalcitePosition(position, el) {
  var _a;
  return position || ((_a = el.closest("calcite-shell-panel")) === null || _a === void 0 ? void 0 : _a.position) || "start";
}
function toggleChildActionText({ parent, expanded }) {
  parent.querySelectorAll("calcite-action").forEach((action) => (action.textEnabled = expanded));
}
const setTooltipReference = (tooltip, referenceElement, expanded) => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement;
  }
  return referenceElement;
};
const CalciteExpandToggle = ({ expanded, intlExpand, intlCollapse, toggleExpand, el, position, tooltipExpand }) => {
  const rtl = dom.getElementDir(el) === "rtl";
  const expandText = expanded ? intlCollapse : intlExpand;
  const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
  if (rtl) {
    icons.reverse();
  }
  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];
  const actionNode = (index.h("calcite-action", { icon: expanded ? expandIcon : collapseIcon, onClick: toggleExpand, ref: (referenceElement) => setTooltipReference(tooltipExpand, referenceElement, expanded), text: expandText, textEnabled: expanded }));
  return tooltipExpand ? (index.h("calcite-tooltip-manager", null, actionNode)) : (actionNode);
};

exports.CalciteExpandToggle = CalciteExpandToggle;
exports.toggleChildActionText = toggleChildActionText;
