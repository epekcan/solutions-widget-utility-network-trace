///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/BaseWidgetSetting',
  'dojo/text!./traceParameters.html',
  'dojo/Evented',
  "dijit/registry",
  "dojo/on",
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/dom-attr",
  "dojo/dom-style",
  "dojo/query",
  "dojo/_base/lang",
  "dojo/_base/array",
  "esri/arcgis/Portal",
  "./PrivilegeUtil",
  "./utilitynetwork",
  "./portal",
  "jimu/tokenUtils",
  'jimu/dijit/SimpleTable',
  'jimu/dijit/Popup',
  "dijit/form/TextBox",
  "dijit/form/Select",
  "dijit/form/RadioButton",
  'dijit/form/CheckBox'],
function (declare,
  _WidgetsInTemplateMixin,
  BaseWidgetSetting,
  template,
  Evented,
  registry, on, dom, domConstruct, domAttr, domStyle, query, lang, array, agsPortal, PrivilegeUtil, UtilityNetwork, PortalHelper, tokenUtils, 
  SimpleTable, popup, Textbox, Select, RadioButton, CheckBox
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-UNTrace-setting',
    un: null,
    cmbDomainNetworks: null,
    domainValueListHelper: [],
    tempTraceConfigs: null,
    barriersList: [],
    conditionBarriersTable: null,
    row: null,
    startLocationCheckboxList: [],
    barriersLocationCheckboxList: [],
    existingValues: null,

    constructor: function (/*Object*/args) {
      this.map = args.map;
    },

    postMixInProperties: function () {
      this.inherited(arguments);
      this.nls.common = window.jimuNls.common;
    },

    postCreate: function () {
      this.inherited(arguments);

      this.barriersList = [
        "conditionBarriers",
        "filterBarriers",
        "outputConditions"
      ];

      this.startup();
    },

    startup: function () {
      if(this.existingValues !== null) {
        this._createStartList({"value": this.existingValues.useAsStart});
        this._createBarrierList({"value": this.existingValues.useAsBarrier});
      } else {
        this._createStartList({"value": ""});
        this._createBarrierList({"value": ""});  
      } 

      this._createTraverseTable(this.conditionBarriersTable, this.conditionBarriersHolder);

      this.own(on(this.addConditionBarriers, "click", lang.hitch(this, function() {     
        this.addRowTraverse(this.conditionBarriersTable, this.tempTraceConfigs);
      })));

    },

    _createStartList: function(param) {
      console.log(param.value);
      if(typeof(param.value) !== "undefined") {
        if(query(".startFeatureGroup").length > 0) {
          if(param.value === 'userDefined' || param.value === "") {
            this.startLocationCheckboxList = [];
            domConstruct.empty(this.startFeatureHolder);
            domStyle.set(query(".startFeatureGroup")[0], "display", "none");  
          } else {
            domStyle.set(query(".startFeatureGroup")[0], "display", "block");
            this._createAGATList({"node":this.startFeatureHolder, "type": "start", "predefined":this.existingValues});
          }
        }
      } else {
        if(query(".startFeatureGroup").length > 0) {
          domStyle.set(query(".startFeatureGroup")[0], "display", "none");  
        }  
      }
    },

    _createBarrierList: function(param) {
      if(typeof(param.value) !== "undefined") {
        if(query(".barrierFeatureGroup").length > 0) {
          if(param.value === 'userDefined' || param.value === "") {
            this.barriersLocationCheckboxList = [];
            domConstruct.empty(this.barrierFeatureHolder);
            domStyle.set(query(".barrierFeatureGroup")[0], "display", "none");  
          } else {
            domStyle.set(query(".barrierFeatureGroup")[0], "display", "block");
            this._createAGATList({"node":this.barrierFeatureHolder, "type": "barrier", "predefined":this.existingValues});
          }
        }
      } else {
        if(query(".barrierFeatureGroup").length > 0) {
          domStyle.set(query(".barrierFeatureGroup")[0], "display", "none");
        }
      }
    },

    _createAGATList: function(param) {
      console.log(this.existingValues);
      if(param.type === "start") {
        this.startLocationCheckboxList = [];
      } else {
        this.barriersLocationCheckboxList = [];  
      }
      var assetGroupList = this.un.getAGByDevice(this.cmbDomainNetworks.value);
      array.forEach(assetGroupList[0].assetGroup, lang.hitch(this, function(ag) {
        array.forEach(ag.assetTypes, lang.hitch(this, function(at) {
          //Check for exisitng values, and check box if it exist
          var flag = false;
          if(param.type === "start") {
            if(typeof(param.predefined) !== "undefined") {
              if(typeof(param.predefined.traceConfig) !== "undefined") {
                if((param.predefined.traceConfig.startLocationLayers).length > 0) {
                  array.forEach(param.predefined.traceConfig.startLocationLayers, lang.hitch(this, function(item) {
                    if(ag.assetGroupCode === parseInt(item.assetGroupCode) && at.assetTypeCode === parseInt(item.assetTypeCode)) {
                      flag = true;  
                    }
                  }));  
                }
              }
            }            
          } else {
            if(typeof(param.predefined) !== "undefined") {
              if(typeof(param.predefined.traceConfig) !== "undefined") {
                if((param.predefined.traceConfig.barriersLayers).length > 0) {
                  array.forEach(param.predefined.traceConfig.barriersLayers, lang.hitch(this, function(item) {
                    if(ag.assetGroupCode === parseInt(item.assetGroupCode) && at.assetTypeCode === parseInt(item.assetTypeCode)) {
                      flag = true;  
                    }
                  }));  
                }
              }
            }
          }

          var dom = domConstruct.create("div");
          domConstruct.place(dom, param.node);
          var checkBox = new CheckBox({
            name: "AGAT_" + param.type,
            value: ag.assetGroupCode + ":" + at.assetTypeCode,
            checked: flag,
            "layerId": assetGroupList[0].layerId
          });
          checkBox.placeAt(dom);
          var label = domConstruct.create("label", {"innerHTML": " " + ag.assetGroupName + " - " + at.assetTypeName + "<br>", "for":"AGAT"}, param.node );
          domConstruct.place(label, dom);

          this.own(on(checkBox, "change", lang.hitch(this, function(val) {
            this.storeTempConfig();
          })));

          if(param.type === "start") {
            this.startLocationCheckboxList.push(checkBox);
          } else {
            this.barriersLocationCheckboxList.push(checkBox);
          }

        }));
      }));
      //this.own(on(selectionBox, "change", lang.hitch(this, function(val) {
      //  this.storeTempConfig();
      //})));

    },

    _createTraverseTable: function(table, node) {
      if(this.conditionBarriersTable !== null) {
        domConstruct.empty(this.conditionBarriersHolder);
        this.conditionBarriersTable = null;
      }
      var fields = [{
        name: 'name',
        title: "Name",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'operator',
        title: "Operator",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'type',
        title: "Type",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'value',
        title: "Value",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'combine',
        title: "Combine Using",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'actions',
        title: "Actions",
        type: 'actions',
        width: '100px',
        'class': 'actions',
        actions: ['up','down','delete']//'up','down',
      }];
      var args = {
        fields: fields,
        selectable: true
      };
      this.conditionBarriersTable = new SimpleTable(args);
      this.conditionBarriersTable.placeAt(this.conditionBarriersHolder);
      this.conditionBarriersTable.startup();
      //this.addRowTraverse(param);

      return true;
    },

    addRowTraverse: function(table, predefinedValues) {
      var addRowResult = table.addRow({});
      this._addTraverseNameSelection({"tr":addRowResult.tr, "predefinedValues":predefinedValues});
      this._addTraverseOperatorSelection({"tr":addRowResult.tr, "predefinedValues":predefinedValues});
      this._addTraverseTypeSelection({"tr":addRowResult.tr, "predefinedValues":predefinedValues});
      this._addTraverseCombineSelection({"tr":addRowResult.tr, "predefinedValues":predefinedValues});
      return addRowResult;
    },

    _addTraverseNameSelection: function(param) {
      var flag = "";      
      var td = query('.simple-table-cell', param.tr)[0];
      var selectionBox = new Select().placeAt(td);
      var netAtt = this.networkAttributeList();
      var outlier = {"name": "Category", "domainName": "Category"};
      netAtt.push(outlier);
      array.forEach(netAtt, function(NAObj, i) {
         var selOption = document.createElement("option");
         selOption.textContent = NAObj.name; 
         selOption.value = i;
         selOption.domainName = NAObj.domainName;
         if(typeof(param.predefinedValues.name) !== 'undefined') {
           if(NAObj.name === param.predefinedValues.name) {             
            flag = i;
           }  
         }
         selectionBox.addOption(selOption);      
      });
      if(flag !== "") {
        selectionBox.set("value",flag);
      }        
      selectionBox.startup();
      param.tr.name = selectionBox;

      on(selectionBox, "change", lang.hitch(this, function(val) {
        var currType = "";
        array.forEach(param.tr.type.options, function(ops) {
          if(ops.value === param.tr.type.value) {
            currType = ops;
          }
        });         
        this.contextSensitiveList({"tr":param.tr, "name":selectionBox.options[val], "type":currType, "currValues":param.predefinedValues });
      })); 

      return true;
    },

    _addTraverseOperatorSelection: function(param) {
      var flag = "";      
      var td = query('.simple-table-cell', param.tr)[1];
      var selectionBox = new Select().placeAt(td);  
      var opList = this.createOperatorList();
      array.forEach(opList, function(op) {
         var selOption = document.createElement("option");
         selOption.textContent = op.display; 
         selOption.value = op.value;  
         if(typeof(param.predefinedValues.operator) !== 'undefined') {
          if(op.value === param.predefinedValues.operator) {             
           flag = op.value;
          }  
         }             
         selectionBox.addOption(selOption);
      });
      if(flag !== "") {
        selectionBox.set("value",flag); 
      }       
      selectionBox.startup();
      param.tr.operator = selectionBox;
    },

    _addTraverseTypeSelection: function(param) {
      var flag = "";      
      var td = query('.simple-table-cell', param.tr)[2];
      var selectionBox = new Select().placeAt(td);  
      var typeList = this.createTypeList(); 
      array.forEach(typeList, function(type) {
         var selOption = document.createElement("option");
         selOption.textContent = type.display; 
         selOption.value = type.value;  
         if(typeof(param.predefinedValues.type) !== 'undefined') {
          if(type.value === param.predefinedValues.type) {            
           flag = type.value;
          }  
         }             
         selectionBox.addOption(selOption);
      });
      //we store networkAttribute as the value, but if isSpecificValue is true, swith it to specificValue.
      //that is how it works in Pro
      if(typeof(param.predefinedValues.type) !== 'undefined') {
        if(param.predefinedValues.type === "networkAttribute" && param.predefinedValues.isSpecificValue === true) {
          flag = "specificValue";
          param.predefinedValues.type = "specificValue";
        }  
      }     
      if(flag !== "") {
        selectionBox.set("value",flag);
      }      
      selectionBox.startup();
      param.tr.type = selectionBox;

      this.contextSensitiveList({"tr":param.tr, "name":param.tr.name.options[0], "type":param.tr.type.options[0], "currValues":param.predefinedValues });

      on(selectionBox, "change", lang.hitch(this, function(val) {
        var currDomain = "";
        array.forEach(param.tr.name.options, function(ops) {
          if(ops.value === param.tr.name.value) {
            currDomain = ops;
          }
        });         
        this.contextSensitiveList({"tr":param.tr, "name":currDomain, "type":selectionBox.value, "currValues":param.predefinedValues });
      }));      
    },

    _addTraverseCombineSelection: function(param) {
      var flag = "";      
      var td = query('.simple-table-cell', param.tr)[4];
      var selectionBox = new Select().placeAt(td);  
      var combineList = this.createCombineUsingList();
      array.forEach(combineList, function(combineItem) {
         var selOption = document.createElement("option");
         selOption.textContent = combineItem.display; 
         selOption.value = combineItem.value;                
         selectionBox.addOption(selOption);
      });
      flag = "";
      if(typeof(param.predefinedValues.combineUsingOr) !== 'undefined') {
        if(param.predefinedValues.combineUsingOr === true) {             
          flag = "Or";
        } else {
          flag = "And";
        }  
      }
      if(flag !== "") {
        selectionBox.set("value",flag);  
      }      
      selectionBox.startup();
      param.tr.combine = selectionBox;
    },

    contextSensitiveList: function(param) {
      console.log(param);
      var td = query('.simple-table-cell', param.tr)[3];    
      domConstruct.empty(td);
      var flag = "";
      if(param.type.value === "specificValue") {
        if(param.name.domainName !== "") {
          if(param.name.domainName === "Category") {
            var categorySelection = new Select().placeAt(td); 
            var catList = this.categoryList(); 
            array.forEach(catList, function(cat) {
               var selOption = document.createElement("option");
               selOption.textContent = cat.name; 
               selOption.value = cat.name;  
               if(typeof(param.currValues.value) !== 'undefined') {
                if(cat.name === param.currValues.value) {             
                 flag = cat.name;
                }  
               }             
               categorySelection.addOption(selOption);
            });
            this.own(on(categorySelection, "change", lang.hitch(this, this.storeTempTraverseSettings)));
            if(flag !== "") {
              categorySelection.set("value",flag);
            }
            param.tr.value = categorySelection;
          } else {
            var fbValueSelection = new Select().placeAt(td);
            array.forEach(this.domainValueListHelper, lang.hitch(this, function(value){
              if (value.domainName === param.name.domainName) {
                array.forEach(value.codedValues, lang.hitch(this, function(cv) {
                  var selOption = document.createElement("option");
                  selOption.textContent = cv.name; 
                  selOption.value = cv.code; 
                  if(typeof(param.currValues.value) !== 'undefined') {                 
                    if((cv.code).toString() === (param.currValues.value).toString()) {            
                    flag = cv.code;
                    }  
                  }                
                  fbValueSelection.addOption(selOption);               
                }));
              }
            })); 
            this.own(on(fbValueSelection, "change", lang.hitch(this, this.storeTempTraverseSettings))); 
            if(flag !== "") {
              fbValueSelection.set("value", flag);  
            }
            param.tr.value = fbValueSelection;
          }           
        } else {
          var textbox = new Textbox().placeAt(td);
          if(typeof(param.currValues.value) !== 'undefined') {
            textbox.set("value", param.currValues.value);  
          }           
          this.own(on(textbox, "blur", lang.hitch(this, this.storeTempTraverseSettings)));
        }
      } else {
        var domainSelection = new Select().placeAt(td); 
        var netAtt = this.networkAttributeList();
        array.forEach(netAtt, function(NAObj, i) {
           var selOption = document.createElement("option");
           selOption.textContent = NAObj.name; 
           selOption.value = i;
           selOption.domainName = NAObj.domainName;
           if(typeof(param.currValues.value) !== 'undefined') {
            if(NAObj.name === param.currValues.value) {             
             flag = i;
            }  
           }           
           domainSelection.addOption(selOption);      
        });
        if(flag !== "") {
          domainSelection.set("value",flag);  
        }        
        this.own(on(domainSelection, "change", lang.hitch(this, this.storeTempTraverseSettings)));
      }
      this.storeTempTraverseSettings();
    },


    restoreIncludesCheckboxesState: function(param) {
      if(typeof(this.tempTraceConfigs[param]) !== 'undefined') {
        var traceTypeNode = this.tempTraceConfigs[param];
        if(traceTypeNode.includeContainers) {this.chkContainers.checked = true;}
        if(traceTypeNode.includeContent) {this.chkStructLineContent.checked = true;}
        if(traceTypeNode.includeStructures) {this.chkStructures.checked = true;}
        if(traceTypeNode.includeBarriers) {this.chkBarrierFeatures.checked = true;}
        if(traceTypeNode.validateConsistency) {this.chkValidateConsistency.checked = true;}
      }
    },

    resetInclusionTypes: function() {
      this.chkContainers.checked = false;
      this.chkStructLineContent.checked = false;
      this.chkStructures.checked = false;
      this.chkBarrierFeatures.checked = false;
      this.chkValidateConsistency.checked = false;
    },

    storeTempConfig: function() {
      var layerAsStart = [];
      var layerAsBarrier = [];
      if(this.startLocationCheckboxList.length > 0) {
        array.forEach(this.startLocationCheckboxList, lang.hitch(this, function(startChk) {
          if(startChk.get("checked")) {
            var splitAGAT = (startChk.get("value")).split(":");            
            layerAsStart.push({
              "assetGroupCode": splitAGAT[0],
              "assetTypeCode": splitAGAT[1],
              "layerId": startChk.get("layerId")
            });
          }  
        }));
      }
      if(this.barriersLocationCheckboxList.length > 0) {
        array.forEach(this.barriersLocationCheckboxList, lang.hitch(this, function(barrierChk) {
          if(barrierChk.get("checked")) {
            var splitAGAT = (barrierChk.get("value")).split(":");
            layerAsBarrier.push({
              "assetGroupCode": splitAGAT[0],
              "assetTypeCode": splitAGAT[1],
              "layerId": barrierChk.get("layerId")
            });
          }  
        }));
      }

      this.emit("config-change", {
        "startLocationLayers":layerAsStart, 
        "barriersLayers":layerAsBarrier}
      );
      
      /*
      var userRowData = this.userDefinedTraces.getSelectedRow();
      var rows = this.traceTypesTable.getRows();
     
      var userGroupName = {"traces":[]};

      array.forEach(rows, lang.hitch(this, function(tr) {
        var useFeature = null;
        var rowData = this.traceTypesTable.getRowData(tr);  
        if(rowData.resultAsStart || rowData.resultAsBarrier) {
          var splitAGAT = tr.filterFeature.value.split(":");
          useFeature = {
            "assetGroupCode": splitAGAT[0],
            "assetTypeCode": splitAGAT[1],
            "layerid": tr.filterFeature.layerId
          };
        }     
        var obj = {
          "type": tr.traceType.value,
          "resultAsStart": rowData.resultAsStart,
          "resultAsBarrier": rowData.resultAsBarrier,
          "layerToUseAs": useFeature,
          "traceID": rowData.rowID
        };
        userGroupName["traces"].push(obj);
      }));
      this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value] = userGroupName;
      return userGroupName;
      */
    },



    //support functions
    categoryList: function() {
      var categories = this.un.dataElement.categories;      
      return categories;
    },

    networkAttributeList: function() {
      var na = this.un.dataElement.networkAttributes; 
      return na;  
    },

    pullDomainValueList: async function() {
      this.domainValueListHelper = [];
      this.un.token = this.token;
      var dupeFlag = false;
      await this.un.getDeviceInfo().then(lang.hitch(this,function(devInf) {
        array.forEach(devInf, lang.hitch(this, function(info) {
          array.forEach(info.dataElement.fields.fieldArray, lang.hitch(this, function(fieldObj) {
            dupeFlag = false;
            if(typeof(fieldObj.domain) !== "undefined") {
              for (var i = 0; i < this.domainValueListHelper.length; i++) {
                if (this.domainValueListHelper[i]["domainName"] === fieldObj.domain.domainName) {
                    dupeFlag = true;
                }
              }
              if(!dupeFlag) {
                this.domainValueListHelper.push(fieldObj.domain); 
              }
            }
          }));
        }));
        console.log(this.domainValueListHelper);
      }));
    },

    createOperatorList: function() {
      var validOperators = [
        {display: "Is equal to", value: "equal"},
        {display: "Does not equal", value: "doesNotEqual"},
        {display: "Is greater than", value: "isGreaterThan"},
        {display: "Is greater than or equal to", value: "isGreaterThanOrEqualTo"},
        {display: "Is less than", value: "isLessThan"},
        {display: "Is less than or equal to", value: "isLessThanOrEqualTo"},
        {display: "Includes the values", value: "includesTheValues"},
        {display: "Does not include the values", value: "doesNotIncludeTheValues"},
        {display: "Includes any", value: "includesAny"},
        {display: "Does not include any", value: "doesNotIncludeAny"}
      ];
      return validOperators;
    },

    createTypeList: function() {
      var TypeList = [
        {display: "Specific value", value: "specificValue"},
        {display: "Network Attribute", value: "networkAttribute"}
      ];
      return TypeList;
    },

    createCombineUsingList: function() {
      var combineList = [
        {display: "", value: ""},
        {display: "And", value: "And"},
        {display: "Or", value: "Or"}
      ];
      return combineList;
    },

    destroy: function () {
    }
  });
});
