import { h } from './index-cbdbef9d.js';
import { g as getElementDir } from './dom-558ef00c.js';

const ICONS = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function getCalcitePosition(position, el) {
  var _a;
  return position || ((_a = el.closest("calcite-shell-panel")) === null || _a === void 0 ? void 0 : _a.position) || "start";
}
function toggleChildActionText({ parent, expanded }) {
  Array.from(parent.querySelectorAll("calcite-action"))
    .filter((el) => el.slot !== "menu-actions")
    .forEach((action) => (action.textEnabled = expanded));
  parent.querySelectorAll("calcite-action-group").forEach((group) => (group.expanded = expanded));
}
const setTooltipReference = ({ tooltip, referenceElement, expanded, ref }) => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement;
  }
  if (ref) {
    ref(referenceElement);
  }
  return referenceElement;
};
const CalciteExpandToggle = ({ expanded, intlExpand, intlCollapse, toggle, el, position, tooltip, ref }) => {
  const rtl = getElementDir(el) === "rtl";
  const expandText = expanded ? intlCollapse : intlExpand;
  const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
  if (rtl) {
    icons.reverse();
  }
  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];
  const actionNode = (h("calcite-action", { dir: rtl ? "rtl" : "ltr", icon: expanded ? expandIcon : collapseIcon, onClick: toggle, ref: (referenceElement) => setTooltipReference({ tooltip, referenceElement, expanded, ref }), text: expandText, textEnabled: expanded }));
  return tooltip ? h("calcite-tooltip-manager", null, actionNode) : actionNode;
};

export { CalciteExpandToggle as C, toggleChildActionText as t };
