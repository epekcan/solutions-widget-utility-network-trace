'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-adeb0063.js');
const dom = require('./dom-c66de328.js');
const interfaces = require('./interfaces-8710f3f8.js');

const calciteTreeCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;outline:none}";

const CalciteTree = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteTreeSelect = index.createEvent(this, "calciteTreeSelect", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Display indentation guide lines */
    this.lines = false;
    /** @internal If this tree is nested within another tree, set to false */
    this.root = true;
    /** Specify the scale of the tree, defaults to m */
    this.scale = "m";
    /** Customize how tree selection works (single, multi, children, multi-children) */
    this.selectionMode = interfaces.TreeSelectionMode.Single;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillRender() {
    const parent = this.el.parentElement.closest("calcite-tree");
    // this.theme = getElementTheme(this.el);
    this.lines = parent ? parent.lines : this.lines;
    this.scale = parent ? parent.scale : this.scale;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.root = parent ? false : true;
  }
  render() {
    return (index.h(index.Host, { "aria-multiselectable": this.selectionMode === interfaces.TreeSelectionMode.Multi ||
        this.selectionMode === interfaces.TreeSelectionMode.MultiChildren, role: this.root ? "tree" : undefined, tabindex: this.root ? "0" : undefined }, index.h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onFocus() {
    if (this.root) {
      const selectedNode = this.el.querySelector("calcite-tree-item[selected]");
      const firstNode = this.el.querySelector("calcite-tree-item");
      (selectedNode || firstNode).focus();
    }
  }
  onClick(e) {
    const target = e.target;
    const childItems = dom.nodeListToArray(target.querySelectorAll("calcite-tree-item"));
    const shouldSelect = this.selectionMode !== null &&
      (!target.hasChildren ||
        (target.hasChildren &&
          (this.selectionMode === interfaces.TreeSelectionMode.Children ||
            this.selectionMode === interfaces.TreeSelectionMode.MultiChildren)));
    const shouldModifyToCurrentSelection = e.detail.modifyCurrentSelection &&
      (this.selectionMode === interfaces.TreeSelectionMode.Multi ||
        this.selectionMode === interfaces.TreeSelectionMode.MultiChildren);
    const shouldSelectChildren = this.selectionMode === interfaces.TreeSelectionMode.MultiChildren ||
      this.selectionMode === interfaces.TreeSelectionMode.Children;
    const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
      (((this.selectionMode === interfaces.TreeSelectionMode.Single ||
        this.selectionMode === interfaces.TreeSelectionMode.Multi) &&
        childItems.length <= 0) ||
        this.selectionMode === interfaces.TreeSelectionMode.Children ||
        this.selectionMode === interfaces.TreeSelectionMode.MultiChildren);
    const shouldExpandTarget = this.selectionMode === interfaces.TreeSelectionMode.Children ||
      this.selectionMode === interfaces.TreeSelectionMode.MultiChildren;
    if (this.root) {
      const targetItems = [];
      if (shouldSelect) {
        targetItems.push(target);
      }
      if (shouldSelectChildren) {
        childItems.forEach((treeItem) => {
          targetItems.push(treeItem);
        });
      }
      if (shouldClearCurrentSelection) {
        const selectedItems = dom.nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
        selectedItems.forEach((treeItem) => {
          if (!targetItems.includes(treeItem)) {
            treeItem.selected = false;
          }
        });
      }
      if (shouldExpandTarget && !e.detail.forceToggle) {
        target.expanded = true;
      }
      if (shouldModifyToCurrentSelection) {
        window.getSelection().removeAllRanges();
      }
      if ((shouldModifyToCurrentSelection && target.selected) ||
        (shouldSelectChildren && e.detail.forceToggle)) {
        targetItems.forEach((treeItem) => {
          treeItem.selected = false;
        });
      }
      else {
        targetItems.forEach((treeItem) => {
          treeItem.selected = true;
        });
      }
    }
    if (this.root) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.calciteTreeSelect.emit({
      selected: dom.nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected)
    });
  }
  get el() { return index.getElement(this); }
};
CalciteTree.style = calciteTreeCss;

exports.calcite_tree = CalciteTree;
