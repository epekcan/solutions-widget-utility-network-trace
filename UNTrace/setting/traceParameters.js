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
  "dojo/on",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/query",
  "dojo/_base/lang",
  "dojo/_base/array",
  './flagParameters',
  'jimu/dijit/SimpleTable',
  "dijit/form/TextBox",
  "dijit/form/Select",
  'dijit/form/CheckBox'],
function (declare,
  _WidgetsInTemplateMixin,
  BaseWidgetSetting,
  template, Evented, on, domConstruct, domStyle, query, lang, array, flagParameters,
  SimpleTable, Textbox, Select, CheckBox
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin, Evented], {
    templateString: template,
    baseClass: 'jimu-widget-UNTrace-setting',
    un: null,
    cmbDomainNetworks: null,
    domainValueListHelper: [],
    conditionBarriersTable: null,
    filterBarriersTable: null,
    outputConditionsTable: null,
    outputFilterTable: null,
    row: null,
    outputFilterCheckboxlist: [],
    existingValues: null,
    knnCount: null,
    knnCostNA: null,
    knnCategories: [],
    knnAGATCheckboxlist: [],

    postMixInProperties: function () {
      this.inherited(arguments);
      this.nls.common = window.jimuNls.common;
    },

    postCreate: function () {
      this.inherited(arguments);

      this.wireupEvents();
      this.startup();
    },

    startup: function () {
      this._createTraverseFilterTable("condition");
      this._createTraverseFilterTable("filter");
      this._createTraverseFilterTable("output");

      if(this.existingValues !== null) {
        this._resetInclusionTypes();
        if(typeof(this.existingValues.traceConfig) !== "undefined") {
          this._restoreIncludesCheckboxesState({"traceConfig": this.existingValues.traceConfig});
          this.launchFlagParameters({
            flagtype: "Output Filter",
            flagUsage: "outputFilters",
            assetHolder: "outputFilters",
            parent: "outputFilter"
          },this.outputFilterHolder);

          this._createKNNCountInput({"value": this.existingValues.traceConfig.nearestNeighbor.count});
          this._createKNNCostNA({"value": this.existingValues.traceConfig.nearestNeighbor.costNetworkAttributeName});
          this._createCategoryList({"node":this.KNNNearestCategoryHolder, "predefined": this.existingValues.traceConfig.nearestNeighbor.nearestCategories});
          this.launchFlagParameters({
            flagtype: "Nearest Asset Groups/Types",
            flagUsage: "nearestAssets",
            assetHolder: "nearestAssets",
            parent: "KNN"
          },this.KNNNearestAGATHolder);

          if(typeof(this.existingValues.traceConfig.conditionBarriers) !== "undefined") {
            array.forEach(this.existingValues.traceConfig.conditionBarriers, lang.hitch(this, function(cb){
              this.addRowTraverse(this.conditionBarriersTable, cb);
            }));
          }
          if(typeof(this.existingValues.traceConfig.filterBarriers) !== "undefined") {
            array.forEach(this.existingValues.traceConfig.filterBarriers, lang.hitch(this, function(fb){
              this.addRowTraverse(this.filterBarriersTable, fb);
            }));
          }
          if(typeof(this.existingValues.traceConfig.outputConditions) !== "undefined") {
            array.forEach(this.existingValues.traceConfig.outputConditions, lang.hitch(this, function(oc){
              this.addRowTraverse(this.outputConditionsTable, oc);
            }));
          }
        }
      } else {

      }

      this.own(on(this.addConditionBarriers, "click", lang.hitch(this, function() {
        this.addRowTraverse(this.conditionBarriersTable, this.existingValues);
      })));

      this.own(on(this.addFilterBarriers, "click", lang.hitch(this, function() {
        this.addRowTraverse(this.filterBarriersTable, this.existingValues);
      })));

      this.own(on(this.addOutputCondition, "click", lang.hitch(this, function() {
        this.addRowTraverse(this.outputConditionsTable, this.existingValues);
      })));

    },

    _createCategoryList: function(param) {
      this.knnCategories = [];
      var flag = false;
      var catList = this.categoryList();
      array.forEach(catList, lang.hitch(this,function(cat) {
        if(param !== null) {
          array.forEach(param.predefined, function(predefined) {
            if(predefined === cat.name) {
              flag = true;
            }
          });
        }
        var dom = domConstruct.create("div");
        domConstruct.place(dom, param.node);
        var checkBox = new CheckBox({
          name: "cat_" + cat.name,
          value: cat.name,
          checked: flag
        });
        checkBox.placeAt(dom);
        var label = domConstruct.create("label", {"innerHTML": " " + cat.name + "<br>", "for":"cat"}, param.node );
        domConstruct.place(label, dom);

        this.knnCategories.push(checkBox);
      }));
    },

    _createTraverseFilterTable: function(type) {
      switch(type) {
        case "condition":
          if(this.conditionBarriersTable !== null) {
            domConstruct.empty(this.conditionBarriersHolder);
            this.conditionBarriersTable = null;
          }
          break;
        case "filter":
          if(this.filterBarriersTable !== null) {
            domConstruct.empty(this.filterBarriersHolder);
            this.filterBarriersTable = null;
          }
          break;
        case "output":
          if(this.outputConditionsTable !== null) {
            domConstruct.empty(this.outputConditionsHolder);
            this.outputConditionsTable = null;
          }
          break;
        default:
          break;
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
        width: '75px',
        'class': 'actions',
        actions: ['up','down','delete']//'up','down',
      }];
      var args = {
        fields: fields,
        selectable: false
      };

      switch(type) {
        case "condition":
          this.conditionBarriersTable = new SimpleTable(args);
          this.conditionBarriersTable.placeAt(this.conditionBarriersHolder);
          this.conditionBarriersTable.startup();
          break;
        case "filter":
          this.filterBarriersTable = new SimpleTable(args);
          this.filterBarriersTable.placeAt(this.filterBarriersHolder);
          this.filterBarriersTable.startup();
          break;
        case "output":
          this.outputConditionsTable = new SimpleTable(args);
          this.outputConditionsTable.placeAt(this.outputConditionsHolder);
          this.outputConditionsTable.startup();
          break;
        default:
          break;
      }
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
      var outlier = [{"name": "Category", "domainName": "Category"}];
      netAtt = netAtt.concat(outlier);
      array.forEach(netAtt, function(NAObj, i) {
        var selOption = document.createElement("option");
        selOption.textContent = NAObj.name;
        selOption.value = i;
        selOption.domainName = NAObj.domainName;
        if(param.predefinedValues !== null) {
          if(typeof(param.predefinedValues.name) !== 'undefined') {
            if(NAObj.name === param.predefinedValues.name) {
              flag = i;
            }
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
        this.contextSensitiveList({"tr":param.tr, "name":selectionBox.options[val], "type":currType.value, "currValues":param.predefinedValues });
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
        if(param.predefinedValues !== null) {
          if(typeof(param.predefinedValues.operator) !== 'undefined') {
            if(op.value === param.predefinedValues.operator) {
              flag = op.value;
            }
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
        if(param.predefinedValues !== null) {
          if(typeof(param.predefinedValues.type) !== 'undefined') {
            if(type.value === param.predefinedValues.type) {
              flag = type.value;
            }
          }
        }
         selectionBox.addOption(selOption);
      });
      //we store networkAttribute as the value, but if isSpecificValue is true, swith it to specificValue.
      //that is how it works in Pro
      if(param.predefinedValues !== null) {
        if(typeof(param.predefinedValues.type) !== 'undefined') {
          if(param.predefinedValues.type === "networkAttribute" && param.predefinedValues.isSpecificValue === true) {
            flag = "specificValue";
            param.predefinedValues.type = "specificValue";
          }
        }
      }
      if(flag !== "") {
        selectionBox.set("value",flag);
      }
      selectionBox.startup();
      param.tr.type = selectionBox;

      var currDomain = "";
      array.forEach(param.tr.name.options, function(ops) {
        if(ops.value === param.tr.name.value) {
          currDomain = ops;
        }
      });
      this.contextSensitiveList({"tr":param.tr, "name":currDomain, "type":param.tr.type.value, "currValues":param.predefinedValues });

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
      var flag = false;
      var td = query('.simple-table-cell', param.tr)[4];
      var selectionBox = new Select().placeAt(td);
      var combineList = this.createCombineUsingList();
      array.forEach(combineList, function(combineItem) {
         var selOption = document.createElement("option");
         selOption.textContent = combineItem.display;
         selOption.value = combineItem.value;
         selectionBox.addOption(selOption);
      });
      if(param.predefinedValues !== null) {
        if(typeof(param.predefinedValues.combineUsingOr) !== 'undefined') {
          if(param.predefinedValues.combineUsingOr === true || param.predefinedValues.combineUsingOr === "true") {
            flag = "true";
          } else {
            flag = "false";
          }
        }
      }
      selectionBox.set("value",flag);
      selectionBox.startup();
      param.tr.combine = selectionBox;
    },

    contextSensitiveList: function(param) {
      var td = query('.simple-table-cell', param.tr)[3];
      domConstruct.empty(td);
      var flag = "";
      if(param.type === "specificValue") {
        if(param.name.domainName !== "") {
          if(param.name.domainName === "Category") {
            var categorySelection = new Select().placeAt(td);
            var catList = this.categoryList();
            array.forEach(catList, function(cat) {
              var selOption = document.createElement("option");
              selOption.textContent = cat.name;
              selOption.value = cat.name;
              if(param.currValues !== null) {
                if(typeof(param.currValues.value) !== 'undefined') {
                  if(cat.name === param.currValues.value) {
                    flag = cat.name;
                  }
                }
              }
              categorySelection.addOption(selOption);
            });
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
                  if(param.currValues !== null) {
                    if(typeof(param.currValues.value) !== 'undefined') {
                      if((cv.code).toString() === (param.currValues.value).toString()) {
                      flag = cv.code;
                      }
                    }
                  }
                  fbValueSelection.addOption(selOption);
                }));
              }
            }));
            if(flag !== "") {
              fbValueSelection.set("value", flag);
            }
            param.tr.value = fbValueSelection;
          }
        } else {
          var textbox = new Textbox().placeAt(td);
          if(param.currValues !== null) {
            if(typeof(param.currValues.value) !== 'undefined') {
              textbox.set("value", param.currValues.value);
            }
          }
          param.tr.value = textbox;
        }
      } else {
        var domainSelection = new Select().placeAt(td);
        var netAtt = this.networkAttributeList();
        array.forEach(netAtt, function(NAObj, i) {
          var selOption = document.createElement("option");
          selOption.textContent = NAObj.name;
          selOption.value = i;
          selOption.domainName = NAObj.domainName;
          if(param.currValues !== null) {
            if(typeof(param.currValues.value) !== 'undefined') {
              if(NAObj.name === param.currValues.value) {
              flag = i;
              }
            }
          }
          domainSelection.addOption(selOption);
        });
        if(flag !== "") {
          domainSelection.set("value",flag);
        }
      }
    },

    //KNN section
    _createKNNCountInput: function(param) {
      var preDefinedValue = -1;
      if(typeof(param) !== 'undefined') {
        preDefinedValue = param.value;
      }
      var userTextbox = new Textbox({
        placeHolder: "How many neighbors?",
        value: preDefinedValue,
        style: {
          width: "95%",
          height: "26px"
        }
      });
      userTextbox.placeAt(this.txtKNNCountHolder);
      userTextbox.startup();
      this.knnCount = userTextbox;
    },

    _createKNNCostNA: function(param) {
      var flag = "";
      var domainSelection = new Select().placeAt(this.KNNCostNetworkHolder);
      var netAtt = this.networkAttributeList();
      array.forEach(netAtt, function(NAObj, i) {
        var selOption = document.createElement("option");
        selOption.textContent = NAObj.name;
        selOption.value = i;
        selOption.domainName = NAObj.domainName;
        if(param.currValues !== null) {
          if(typeof(param.value) !== 'undefined') {
            if(NAObj.name === param.value) {
            flag = i;
            }
          }
        }
        domainSelection.addOption(selOption);
      });
      if(flag !== "") {
        domainSelection.set("value",flag);
      }
      this.knnCostNA = domainSelection;
    },
    //End KNN section

    _restoreIncludesCheckboxesState: function(param) {
      if(typeof(param) !== 'undefined') {
        if(param.traceConfig.includeContainers) {this.chkContainers.set("checked", true);}
        if(param.traceConfig.includeStructLineContent) {this.chkStructLineContent.set("checked", true);}
        if(param.traceConfig.includeStructures) {this.chkStructures.set("checked", true);}
        if(param.traceConfig.includeBarriers) {this.chkBarrierFeatures.set("checked", true);}
        if(param.traceConfig.validateConsistency) {this.chkValidateConsistency.set("checked", true);}
      }
    },

    _resetInclusionTypes: function() {
      this.chkContainers.checked = false;
      this.chkStructLineContent.checked = false;
      this.chkStructures.checked = false;
      this.chkBarrierFeatures.checked = false;
      this.chkValidateConsistency.checked = false;
    },

    launchFlagParameters: function(param, domHolder) {
      //var tr = this.traceTypesTable.selectRow(param.tr);
        domConstruct.empty(domHolder);
        var flags = new flagParameters({
          nls: this.nls,
          un: this.un,
          cmbDomainNetworks: this.cmbDomainNetworks,
          existingValues: this.existingValues,
          flagTypeAssetHolder: param.assetHolder,
          flagType: param.flagtype,
          flagUsage: param.flagUsage,
          flagTableHolder: domHolder,
          parent: param.parent,
          addRowOnNew: false
        }).placeAt(domHolder);
        flags.startup();
    },

    storeTempConfig: function() {
      //includes and checkboxes
      this.existingValues.traceConfig["includeContainers"] = this.chkContainers.checked;
      this.existingValues.traceConfig["includeStructLineContent"] = this.chkStructLineContent.checked;
      this.existingValues.traceConfig["includeStructures"] = this.chkStructures.checked;
      this.existingValues.traceConfig["includeBarriers"] = this.chkBarrierFeatures.checked;
      this.existingValues.traceConfig["validateConsistency"] = this.chkValidateConsistency.checked;

      //get Condition and filter tables
      var processList = [
        {"table": this.conditionBarriersTable, "node":"conditionBarriers"},
        {"table": this.filterBarriersTable, "node":"filterBarriers"},
        {"table": this.outputConditionsTable, "node":"outputConditions"}
      ];
      array.forEach(processList, lang.hitch(this, function(item) {
        var objArray = [];
        var rows = item.table.getRows();
        if(rows.length > 0) {
          array.forEach(rows, lang.hitch(this, function(row) {
            var valueInput = "";
            if(typeof(row.value) !== "undefined") {
              valueInput = row.value.value;
            } else {
              var rowData = item.table.getRowData(row);
              valueInput = rowData.value;
            }
            if(row.name.options[row.name.value].textContent === "Category") {
              var type = "category";
            } else {
              var type = "networkAttribute";
            }
            objArray.push({
              "name": row.name.options[row.name.value].textContent,
              "type": type,
              "operator": row.operator.value,
              "value": valueInput,
              "combineUsingOr": (typeof(row.combine) !== "undefined") ? row.combine.value : false,
              "isSpecificValue": (row.type.value === "specificValue") ? true : false,
            });
          }));
        }
        this.existingValues.traceConfig[item.node] = objArray;
      }));

      //getKNN setting
      if(this.knnCount.value > 0) {
        var chosenCategories = [];
        if(this.knnCategories.length > 0) {
          var filtered = array.filter(this.knnCategories, function(catChk) {
             return catChk.get("checked") === true;
          });
          array.forEach(filtered, function(catChk) {
            chosenCategories.push(catChk.get("value"));
          });
        }
        this.existingValues.traceConfig["nearestNeighbor"] = {
          "count": this.knnCount.value,
          "costNetworkAttributeName": this.knnCostNA.options[this.knnCostNA.value].textContent,
          "nearestCategories": chosenCategories
        };
      }

      //emit that config change so it can saved
      //this.emit("config-change", tempSetting);

    },

    //Wire Up Events
    wireupEvents: function() {
      this.own(on(this.includeHeaders, "click", lang.hitch(this, function() {
        this.hideShowSection(this.includeParametersHolder);
      })));
      this.own(on(this.CBHeader, "click", lang.hitch(this, function() {
        this.hideShowSection(this.conditionBarriersHolder);
      })));
      this.own(on(this.FBHeader, "click", lang.hitch(this, function() {
        this.hideShowSection(this.filterBarriersHolder);
      })));
      this.own(on(this.knnHeader, "click", lang.hitch(this, function() {
        this.hideShowSection(this.knnHolder);
      })));
      this.own(on(this.outputFilterHeader, "click", lang.hitch(this, function() {
        this.hideShowSection(this.outputFilterHolder);
      })));
      this.own(on(this.OCHeader, "click", lang.hitch(this, function() {
        this.hideShowSection(this.outputConditionsHolder);
      })));
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
      }));
    },

    createOperatorList: function() {
      var validOperators = [
        {display: "Is equal to", value: "equal"},
        {display: "Does not equal", value: "notEqual"},
        {display: "Is greater than", value: "greaterThan"},
        {display: "Is greater than or equal to", value: "greaterThanEqual"},
        {display: "Is less than", value: "lessThan"},
        {display: "Is less than or equal to", value: "lessThanEqual"},
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
        {display: "And", value: false},
        {display: "Or", value: true}
      ];
      return combineList;
    },

    hideShowSection: function(param) {
      var display = domStyle.get(param, "display");
      if(display === "block") {
        domStyle.set(param, "display", "none");
      } else {
        domStyle.set(param, "display", "block");
      }
    },

    destroy: function () {
    }
  });
});
