import{r as t,h as i,H as c,c as e,g as a}from"./p-551d452f.js";import{s as n,b as l,g as s,a as r}from"./p-ddb29161.js";import{g as u}from"./p-4bacf9d8.js";import{c as p}from"./p-5852966b.js";const o=class{constructor(i){t(this,i),this.active=!1,this.scale="m",this.theme="light"}handleColorChange(t){this.internalColor=p(t)}componentWillLoad(){this.handleColorChange(this.color)}render(){const{active:t,internalColor:e,theme:a}=this,n=t?"100%":"0",l=e.hex(),s=t?"rgba(0, 0, 0, 0.15)":e["light"===a?"darken":"whiten"](.25).hex();return i(c,{"aria-label":l,title:l},i("svg",{class:"swatch",xmlns:"http://www.w3.org/2000/svg"},i("rect",{fill:l,height:"100%",rx:n,stroke:s,width:"100%"})))}static get watchers(){return{color:["handleColorChange"]}}};o.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-flex;position:relative}:host([scale=s]){height:20px;width:20px}:host([scale=m]){height:24px;width:24px}:host([scale=l]){height:28px;width:28px}.swatch{height:inherit;width:inherit;overflow:visible}.swatch rect{transition:all 150ms ease-in-out}.no-color-icon{height:100%;width:100%;top:0;left:0;bottom:0;right:0;position:absolute}";const h={tel:"phone",password:"lock",email:"email-address",date:"calendar",time:"clock",search:"search"},d=class{constructor(i){t(this,i),this.calciteInputFocus=e(this,"calciteInputFocus",7),this.calciteInputBlur=e(this,"calciteInputBlur",7),this.calciteInputInput=e(this,"calciteInputInput",7),this.alignment="start",this.autofocus=!1,this.loading=!1,this.numberButtonType="vertical",this.required=!1,this.scale="m",this.status="idle",this.type="text",this.value="",this.childElType="input",this.reset=()=>{this.value=this.defaultValue},this.inputInputHandler=t=>{this.value=t.target.value},this.inputBlurHandler=()=>{this.calciteInputBlur.emit({element:this.childEl,value:this.value})},this.inputFocusHandler=t=>{t.target!==this.slottedActionEl&&this.setFocus(),this.calciteInputFocus.emit({element:this.childEl,value:this.value})},this.clearInputValue=()=>{this.value=""},this.updateNumberValue=t=>{if(t.preventDefault(),"input"===this.childElType&&"number"===this.type){const i=this.maxString?parseFloat(this.maxString):null,c=this.minString?parseFloat(this.minString):null,e=Number(this.stepString)>0?parseFloat(this.stepString):1;let a=this.value&&""!==this.value?parseFloat(this.value):0;switch(t.target.dataset.adjustment){case"up":(!i&&0!==i||a<i)&&(this.childEl.value=(a+=e).toString());break;case"down":(!c&&0!==c||a>c)&&(this.childEl.value=(a-=e).toString())}this.value=this.childEl.value.toString()}}}disabledWatcher(){this.disabled&&this.setDisabledAction()}maxWatcher(){var t;this.maxString=(null===(t=this.max)||void 0===t?void 0:t.toString())||null}minWatcher(){var t;this.minString=(null===(t=this.min)||void 0===t?void 0:t.toString())||null}stepWatcher(){var t;this.stepString=(null===(t=this.step)||void 0===t?void 0:t.toString())||null}valueWatcher(){this.calciteInputInput.emit({element:this.childEl,value:this.value})}updateRequestedIcon(){this.requestedIcon=n(h,this.icon,this.type)}connectedCallback(){var t;this.status=l(this.el,"status",this.status),this.scale=l(this.el,"scale",this.scale),this.form=this.el.closest("form"),null===(t=this.form)||void 0===t||t.addEventListener("reset",this.reset)}disconnectedCallback(){var t;null===(t=this.form)||void 0===t||t.removeEventListener("reset",this.reset)}componentWillLoad(){var t,i,c;this.defaultValue=this.value,this.childElType="textarea"===this.type?"textarea":"input",this.requestedIcon=n(h,this.icon,this.type),this.minString=null===(t=this.min)||void 0===t?void 0:t.toString(),this.maxString=null===(i=this.max)||void 0===i?void 0:i.toString(),this.stepString=null===(c=this.step)||void 0===c?void 0:c.toString()}componentDidLoad(){this.slottedActionEl=this.el.querySelector("[slot=input-action]"),this.disabled&&this.setDisabledAction()}get isTextarea(){return"textarea"===this.childElType}get isClearable(){return!this.isTextarea&&(this.clearable||"search"===this.type)&&this.value.length>0}render(){const t=s(this.el),e=r(this.el,["alignment","dir","clearable","min","max","step","value","icon","loading","prefix-text","scale","status","suffix-text","theme","number-button-type"]),a=i("div",{class:"calcite-input-loading"},i("calcite-progress",{type:"indeterminate"})),n="s"===this.scale||"m"===this.scale?"s":"m",l=i("button",{class:"calcite-input-clear-button",disabled:this.loading,onClick:this.clearInputValue},i("calcite-icon",{icon:"x",scale:n,theme:this.theme})),u=i("calcite-icon",{class:"calcite-input-icon",dir:t,flipRtl:this.iconFlipRtl,icon:this.requestedIcon,scale:n,theme:this.theme}),p="horizontal"===this.numberButtonType?"number-button-item-horizontal":null,o=i("div",{class:"calcite-input-number-button-item "+p,"data-adjustment":"up",onMouseDown:this.updateNumberValue},i("calcite-icon",{icon:"chevron-up",scale:n,theme:this.theme})),h=i("div",{class:"calcite-input-number-button-item "+p,"data-adjustment":"down",onMouseDown:this.updateNumberValue},i("calcite-icon",{icon:"chevron-down",scale:n,theme:this.theme})),d=i("div",{class:"calcite-input-number-button-wrapper"},o,h),m=i("div",{class:"calcite-input-prefix"},this.prefixText),b=i("div",{class:"calcite-input-suffix"},this.suffixText),x=[i(this.childElType,Object.assign({},e,{autofocus:!!this.autofocus||null,defaultValue:this.defaultValue,disabled:!!this.disabled||null,max:this.maxString,maxlength:this.maxlength,min:this.minString,onBlur:this.inputBlurHandler,onFocus:this.inputFocusHandler,onInput:this.inputInputHandler,placeholder:this.placeholder||"",ref:t=>this.childEl=t,required:!!this.required||null,step:this.stepString,tabIndex:this.disabled?-1:null,type:this.type,value:this.value}),this.value),this.isTextarea?i("div",{class:"calcite-input-resize-icon-wrapper"},i("calcite-icon",{icon:"chevron-down",scale:"s"})):null];return i(c,{dir:t,onClick:this.inputFocusHandler},i("div",{class:"calcite-input-wrapper"},"number"===this.type&&"horizontal"===this.numberButtonType?h:null,this.prefixText?m:null,i("div",{class:"calcite-input-element-wrapper"},x,this.isClearable?l:null,this.requestedIcon?u:null,this.loading?a:null),i("div",{class:"calcite-input-action-wrapper"},i("slot",{name:"input-action"})),"number"===this.type&&"vertical"===this.numberButtonType?d:null,this.suffixText?b:null,"number"===this.type&&"horizontal"===this.numberButtonType?o:null))}keyDownHandler(t){this.isClearable&&"Escape"===u(t.key)&&this.clearInputValue()}async setFocus(){var t;null===(t=this.childEl)||void 0===t||t.focus()}setDisabledAction(){this.slottedActionEl&&this.slottedActionEl.setAttribute("disabled","")}get el(){return a(this)}static get watchers(){return{disabled:["disabledWatcher"],max:["maxWatcher"],min:["minWatcher"],step:["stepWatcher"],value:["valueWatcher"],icon:["updateRequestedIcon"],type:["updateRequestedIcon"]}}};d.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}.sc-calcite-input:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-input-h{display:none}[scale=s].sc-calcite-input-h textarea.sc-calcite-input,[scale=s].sc-calcite-input-h input.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:var(--calcite-font-size--2);padding:0.5rem;height:2rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input{min-height:32px}[scale=s].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=s].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:2rem}[scale=s].sc-calcite-input-h textarea.sc-calcite-input,[scale=s].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=s].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:32px;min-width:32px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input,[scale=m].sc-calcite-input-h input.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:var(--calcite-font-size--1);padding:0.75rem;height:44px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input{min-height:44px}[scale=m].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=m].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:44px}[scale=m].sc-calcite-input-h textarea.sc-calcite-input,[scale=m].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=m].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:44px;min-width:44px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input,[scale=l].sc-calcite-input-h input.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{font-size:var(--calcite-font-size-1);padding:1rem;height:56px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input{min-height:56px}[scale=l].sc-calcite-input-h .calcite-input-number-button-wrapper.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input,[scale=l].sc-calcite-input-h .calcite-input-action-wrapper.sc-calcite-input calcite-button.sc-calcite-input button.sc-calcite-input{height:56px}[scale=l].sc-calcite-input-h textarea.sc-calcite-input,[scale=l].sc-calcite-input-h input[type=file].sc-calcite-input{height:auto}[scale=l].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{min-height:56px;min-width:56px}[disabled].sc-calcite-input-h{pointer-events:none}[disabled].sc-calcite-input-h .calcite-input-wrapper.sc-calcite-input{opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}[disabled].sc-calcite-input-h textarea.sc-calcite-input,[disabled].sc-calcite-input-h input.sc-calcite-input{pointer-events:none}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{display:flex;position:relative;min-width:20%;max-width:100%;max-height:100%;flex:1;box-sizing:border-box;-webkit-appearance:none;font-family:inherit;transition:150ms ease-in-out, height 0s;box-shadow:0 0 0 0 transparent;outline:0;margin:0;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);font-weight:400;border-radius:0;-webkit-border-radius:0}.sc-calcite-input-h input[type=search].sc-calcite-input::-webkit-search-decoration{-webkit-appearance:none}.sc-calcite-input-h textarea.sc-calcite-input,.sc-calcite-input-h input.sc-calcite-input{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.sc-calcite-input-h textarea.sc-calcite-input:focus,.sc-calcite-input-h input.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.sc-calcite-input-h input.sc-calcite-input,.sc-calcite-input-h textarea.sc-calcite-input{color:var(--calcite-ui-text-1);border:1px solid var(--calcite-ui-border-1)}.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}.sc-calcite-input-h input.sc-calcite-input::placeholder,.sc-calcite-input-h input.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h input.sc-calcite-input::-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::placeholder,.sc-calcite-input-h textarea.sc-calcite-input:-ms-input-placeholder,.sc-calcite-input-h textarea.sc-calcite-input::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}.sc-calcite-input-h input.sc-calcite-input:focus,.sc-calcite-input-h textarea.sc-calcite-input:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-text-1)}.sc-calcite-input-h input[readonly].sc-calcite-input,.sc-calcite-input-h textarea[readonly].sc-calcite-input{background-color:var(--calcite-ui-background)}.sc-calcite-input-h input[readonly].sc-calcite-input:focus,.sc-calcite-input-h textarea[readonly].sc-calcite-input:focus{color:var(--calcite-ui-text-1)}.sc-calcite-input-h calcite-icon.sc-calcite-input{color:var(--calcite-ui-text-1)}.sc-calcite-input-h slot.sc-calcite-input:not[name=input-message]{display:block;margin-bottom:0.375rem;color:var(--calcite-ui-text-2);font-weight:500}[icon].sc-calcite-input-h input.sc-calcite-input{padding-left:2.25rem}[dir=rtl][icon].sc-calcite-input-h input.sc-calcite-input{padding-right:2.25rem;padding-left:0.75rem}[dir=rtl][icon][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-right:3rem;padding-left:0.75rem}[icon][scale=l].sc-calcite-input-h input.sc-calcite-input{padding-left:3rem}.calcite-input-element-wrapper.sc-calcite-input{display:inline-flex;flex:1;min-width:20%;position:relative;order:3}.calcite-input-icon.sc-calcite-input{display:block;position:absolute;pointer-events:none;transition:150ms ease-in-out;top:calc(50% - 9px);left:0.75rem;margin:1px auto 0;z-index:1}[scale=l].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{top:calc(50% - 12px)}[dir=rtl].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{left:unset;right:0.75rem}input[type=text].sc-calcite-input::-ms-clear{display:none;width:0;height:0}input[type=text].sc-calcite-input::-ms-reveal{display:none;width:0;height:0}input[type=search].sc-calcite-input::-webkit-search-decoration,input[type=search].sc-calcite-input::-webkit-search-cancel-button,input[type=search].sc-calcite-input::-webkit-search-results-button,input[type=search].sc-calcite-input::-webkit-search-results-decoration,input[type=date].sc-calcite-input::-webkit-clear-button,input[type=time].sc-calcite-input::-webkit-clear-button{display:none}.calcite-input-clear-button.sc-calcite-input{display:flex;align-self:stretch;align-items:center;justify-content:center;box-sizing:border-box;cursor:pointer;min-height:100%;border:1px solid var(--calcite-ui-border-1);transition:150ms ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none;order:4}.calcite-input-clear-button.sc-calcite-input:hover,.calcite-input-clear-button.sc-calcite-input:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-clear-button.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}.calcite-input-clear-button.sc-calcite-input:disabled{opacity:var(--calcite-ui-opacity-disabled)}[dir=rtl].sc-calcite-input-h .calcite-input-clear-button.sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:none}.calcite-input-clear-button.sc-calcite-input{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.calcite-input-clear-button.sc-calcite-input:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.calcite-input-loading.sc-calcite-input{display:block;pointer-events:none;position:absolute;top:1px;left:1px;right:1px}.calcite-input-action-wrapper.sc-calcite-input{display:flex;order:7}.calcite-input-prefix.sc-calcite-input,.calcite-input-suffix.sc-calcite-input{display:flex;align-items:center;align-content:center;height:auto;min-height:100%;word-break:break-word;-webkit-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box;font-weight:500;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-background);color:var(--calcite-ui-text-2);line-height:1}.calcite-input-prefix.sc-calcite-input{order:2;border-right-width:0px}.calcite-input-suffix.sc-calcite-input{order:5;border-left-width:0px}[dir=rtl].sc-calcite-input-h .calcite-input-prefix.sc-calcite-input{border-right-width:1px;border-left-width:0px}[dir=rtl].sc-calcite-input-h .calcite-input-suffix.sc-calcite-input{border-left-width:1px;border-right-width:0px}[readonly].sc-calcite-input-h .calcite-input-number-button-item.sc-calcite-input{pointer-events:none}[alignment=start].sc-calcite-input-h textarea.sc-calcite-input,[alignment=start].sc-calcite-input-h input.sc-calcite-input{text-align:left}[alignment=end].sc-calcite-input-h textarea.sc-calcite-input,[alignment=end].sc-calcite-input-h input.sc-calcite-input{text-align:right}[dir=rtl][alignment=start].sc-calcite-input-h textarea.sc-calcite-input,[dir=rtl][alignment=start].sc-calcite-input-h input.sc-calcite-input{text-align:right}[dir=rtl][alignment=end].sc-calcite-input-h textarea.sc-calcite-input,[dir=rtl][alignment=end].sc-calcite-input-h input.sc-calcite-input{text-align:left}.sc-calcite-input-h input[type=number].sc-calcite-input{-moz-appearance:textfield}.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-inner-spin-button,.sc-calcite-input-h input[type=number].sc-calcite-input::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.calcite-input-number-button-wrapper.sc-calcite-input{box-sizing:border-box;display:flex;flex-direction:column;box-sizing:border-box;transition:150ms ease-in-out;pointer-events:none;order:6}[number-button-type=vertical].sc-calcite-input-h .calcite-input-wrapper.sc-calcite-input{flex-direction:row;display:flex}[number-button-type=vertical].sc-calcite-input-h input.sc-calcite-input,[number-button-type=vertical].sc-calcite-input-h textarea.sc-calcite-input{order:2}[dir=rtl][number-button-type=horizontal].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(-90deg)}[dir=rtl][number-button-type=horizontal].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(-90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{min-height:100%;max-height:100%;order:1;align-self:auto}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input calcite-icon.sc-calcite-input,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input calcite-icon.sc-calcite-input{transform:rotate(90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{order:5}[dir=rtl].sc-calcite-input-h .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down].sc-calcite-input{border-right:1px solid var(--calcite-ui-border-1);border-left:0px}[dir=rtl].sc-calcite-input-h .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up].sc-calcite-input{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}[number-button-type=vertical].sc-calcite-input-h .calcite-input-number-button-item[data-adjustment=down].sc-calcite-input{border-top:0}.calcite-input-number-button-item.sc-calcite-input{display:flex;align-self:center;align-items:center;box-sizing:border-box;cursor:pointer;max-height:50%;min-height:50%;padding:0 0.75rem;border:1px solid var(--calcite-ui-border-1);transition:background-color 0.15s ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none}.calcite-input-number-button-item.sc-calcite-input calcite-icon.sc-calcite-input{pointer-events:none}.calcite-input-number-button-item.sc-calcite-input:hover,.calcite-input-number-button-item.sc-calcite-input:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-number-button-item.sc-calcite-input:active{background-color:var(--calcite-ui-foreground-3)}[dir=rtl][number-button-type=vertical].sc-calcite-input-h .calcite-input-number-button-item.sc-calcite-input{border-right:none;border-left:1px solid var(--calcite-ui-border-1)}.calcite-input-wrapper.sc-calcite-input{display:flex;flex-direction:row;position:relative}.sc-calcite-input-h input.sc-calcite-input::-webkit-calendar-picker-indicator{display:none}.sc-calcite-input-h input[type=date].sc-calcite-input::-webkit-input-placeholder{visibility:hidden !important}.sc-calcite-input-h textarea.sc-calcite-input::-webkit-resizer{box-sizing:border-box;position:absolute;bottom:0;right:0;padding:0 0.375rem}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.calcite-input-resize-icon-wrapper.sc-calcite-input{display:none}}.calcite-input-resize-icon-wrapper.sc-calcite-input{background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);position:absolute;z-index:1;bottom:2px;right:2px;pointer-events:none;width:16px;height:16px}.calcite-input-resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:4px;right:4px;transform:rotate(-45deg)}[dir=rtl].sc-calcite-input-h textarea.sc-calcite-input::-webkit-resizer{left:0;right:unset}[dir=rtl].sc-calcite-input-h .calcite-input-resize-icon-wrapper.sc-calcite-input{left:2px;right:unset}[dir=rtl].sc-calcite-input-h .calcite-input-resize-icon-wrapper.sc-calcite-input calcite-icon.sc-calcite-input{bottom:4px;right:4px;transform:rotate(45deg)}[type=file].sc-calcite-input-h input.sc-calcite-input,[type=file].sc-calcite-input-h textarea.sc-calcite-input{cursor:pointer;padding:1.5rem;border:1px dashed #d4d4d4;background-color:#f8f8f8;text-align:center}.no-bottom-border.sc-calcite-input-h input.sc-calcite-input.sc-calcite-input{border-bottom:none}[status=invalid].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-danger)}[status=valid].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-success)}[status=idle].sc-calcite-input-h .calcite-input-icon.sc-calcite-input{color:var(--calcite-ui-text-2)}";export{o as calcite_color_picker_swatch,d as calcite_input}