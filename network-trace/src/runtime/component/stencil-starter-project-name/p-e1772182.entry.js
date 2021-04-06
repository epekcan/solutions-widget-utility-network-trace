import{r as t,c as i,h as c,H as a,g as e}from"./p-551d452f.js";import{g as s}from"./p-4bacf9d8.js";const o=class{constructor(c){t(this,c),this.calciteAccordionChange=i(this,"calciteAccordionChange",7),this.appearance="default",this.iconPosition="end",this.iconType="chevron",this.scale="m",this.selectionMode="multi",this.items=[],this.sorted=!1,this.sortItems=t=>t.sort(((t,i)=>t.position-i.position)).map((t=>t.item))}componentDidLoad(){this.sorted||(this.items=this.sortItems(this.items),this.sorted=!0)}render(){return c(a,null,c("slot",null))}calciteAccordionItemKeyEvent(t){if(this.el===t.detail.parent){const i=s(t.detail.item.key),c=t.target,a=0===this.itemIndex(c),e=this.itemIndex(c)===this.items.length-1;switch(i){case"ArrowDown":e?this.focusFirstItem():this.focusNextItem(c);break;case"ArrowUp":a?this.focusLastItem():this.focusPrevItem(c);break;case"Home":this.focusFirstItem();break;case"End":this.focusLastItem()}}}registerCalciteAccordionItem(t){const i={item:t.target,parent:t.detail.parent,position:t.detail.position};this.el===i.parent&&this.items.push(i)}updateActiveItemOnChange(t){this.requestedAccordionItem=t.detail.requestedAccordionItem,this.calciteAccordionChange.emit({requestedAccordionItem:this.requestedAccordionItem})}focusFirstItem(){this.focusElement(this.items[0])}focusLastItem(){this.focusElement(this.items[this.items.length-1])}focusNextItem(t){const i=this.itemIndex(t);this.focusElement(this.items[i+1]||this.items[0])}focusPrevItem(t){const i=this.itemIndex(t);this.focusElement(this.items[i-1]||this.items[this.items.length-1])}itemIndex(t){return this.items.indexOf(t)}focusElement(t){t.focus()}get el(){return e(this)}};o.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:var(--calcite-font-size--2)}:host([scale=m]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-accordion-item-spacing-unit:1.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit)\n    var(--calcite-accordion-item-spacing-unit);font-size:var(--calcite-font-size-1)}:host{display:block;position:relative;max-width:100%;border:1px solid var(--calcite-ui-border-2);border-bottom:none;line-height:1.5;--calcite-accordion-item-border:var(--calcite-ui-border-2);--calcite-accordion-item-background:var(--calcite-ui-foreground-1)}:host([appearance=minimal]){--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0;border-color:transparent}:host([appearance=transparent]){border-color:transparent;--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}";export{o as calcite_accordion}