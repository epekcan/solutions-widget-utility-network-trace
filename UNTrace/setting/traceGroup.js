///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  'dijit/_TemplatedMixin',
  'dojo/text!./traceGroup.html',
  "dojo/on",
  "dojo/dom-construct",
  "dojo/query",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-style",
  './traceParameters',
  './flagParameters',
  './importUtils',
  'jimu/dijit/SimpleTable',
  'jimu/dijit/Popup',
  "dijit/form/Select",
  "jimu/dijit/ColorPicker"
],
function(declare, BaseWidgetSetting, _TemplatedMixin, template, on, domConstruct, query, lang, array, domStyle,
  traceParameters, flagParameters, importUtils,
  SimpleTable, Popup, Select, ColorPicker) {
  return declare([BaseWidgetSetting, _TemplatedMixin], {
    templateString: template,
    baseClass: 'jimu-widget-untrace-setting',
    nls: null,
    token : null,
    un: null,
    dataElements: null,
    domainValueListHelper: [],
    tempTraceConfigs: null,
    traceConfigParameter: null,
    traceTypesTable: null,
    startFlagHandler: null,
    barrierFlagHandler: null,
    existingValues: null,
    validAssets: null,
    defaultColor: [0,0,255,0.7],

    postCreate: function(){
      console.log(this);
      this._createTraceTypeTable();

      //this.own(on(this.addTraceType, "click", lang.hitch(this, function() {
      //  this.addRowTraceType({"predefined":null});
      //})));

      this.own(on(this.importTrace, "click", lang.hitch(this, function() {
        this.launchImportUtils({"predefined":null});
      })));

      this.validAssets = this.getValidAssets();

      this._initialize();

      this.storeTempConfig();

      this._wireEventHandlers();

    },

    _initialize: function() {
      //if this is reloaded, check if existing values is populate, then loop. otherwise just add a new row
      if(this.existingValues !== null) {
        if(this.existingValues.traces.length > 0) {
          array.forEach(this.existingValues.traces, lang.hitch(this, function(trace) {
            this.addRowTraceType({"predefined":trace});
          }));
        } else {
          //this.addRowTraceType({"predefined":null});
        }
      } else {
        //this.addRowTraceType({"predefined":null});
      }

      //this.storeTempConfig();

     // this._wireEventHandlers();
    },

    _createTraceTypeTable: function() {
      if(this.traceTypesTable !== null) {
        domConstruct.empty(this.traceTypesTableHolder);
        this.traceTypesTable = null;
      }
      var fields = [{
        name: 'traceColor',
        title: "",
        type: 'empty',
        width: "35px",
        'class': 'editable'
      },{
        name: 'traceType',
        title: "Trace",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'useAsStart',
        title: "Start Locations",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'useAsBarrier',
        title: "Barriers",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'rowID',
        type: 'text',
        hidden: true,
        'class': 'editable'
      },{
        name: 'actions',
        title: "Actions",
        type: 'actions',
        width: '75px',
        'class': 'actions',
        actions: ['delete']//'up','down',
      }];
      var args = {
        fields: fields,
        selectable: true
      };
      this.traceTypesTable = new SimpleTable(args);
      this.traceTypesTable.placeAt(this.traceTypesTableHolder);
      this.traceTypesTable.startup();
    },

    addRowTraceType: function(param) {
      var rowUnique = new Date();
      var defaultID = rowUnique.getTime();
      var defaultUseAsStart = (this.interactionList())[0].value;
      var defaultUseAsBarrier = (this.interactionList())[0].value;
      var defaultColor = this.defaultColor;

      if(param.predefined !== null) {
        defaultID = param.predefined.traceID;
        defaultUseAsStart = param.predefined.useAsStart;
        defaultUseAsBarrier = param.predefined.useAsBarrier;
        defaultColor = param.predefined.color;
      }

      var addRowResult = this.traceTypesTable.addRow({
        "traceColor": defaultColor,
        "rowID": defaultID,
        "useAsStart": defaultUseAsStart,
        "useAsBarrier": defaultUseAsBarrier
      });

      this._addTraceTypeColor({"tr":addRowResult.tr, "predefined":param.predefined});
      this._addTraceTypeSelection({"tr":addRowResult.tr, "predefined":param.predefined});
      this._addTraceStartSelection({"tr":addRowResult.tr, "predefined":param.predefined});
      this._addTraceBarrierSelection({"tr":addRowResult.tr, "predefined":param.predefined});
      this.traceTypesTable.selectRow(addRowResult.tr);
      //this.getValidAssets({"tr":addRowResult.tr, "predefined":param.predefined});

      var deleteBtn = query(".jimu-icon-delete", addRowResult.tr);
      if(deleteBtn.length > 0) {
        this.own(on(deleteBtn[0], "click", lang.hitch(this, function() {
          this.deleteTraceType();
        })));
      }

      return addRowResult;
    },

    _addTraceTypeColor: function(param) {
      var td = query('.simple-table-cell', param.tr)[0];
      var color = this.defaultColor;
      if(param.predefined !== null && (typeof(param.predefined.traceColor) !== 'undefined')) {
        color = param.predefined.traceColor;
      }
      var colorPicker = new ColorPicker({
        color: color
      });
      domStyle.set(colorPicker.domNode, {"width": "25px", "height": "25px"});
      colorPicker.placeAt(td);
      param.tr.traceColor = colorPicker;
      this.own(on(colorPicker, "change", lang.hitch(this, this.storeTempConfig)));
    },

    _addTraceTypeSelection: function(param) {
      var td = query('.simple-table-cell', param.tr)[1];
      if(param.predefined !== null) {
        td.innerHTML = param.predefined.type;
        param.tr.traceType = param.predefined.type;
      }

    },

    _addTraceStartSelection: function(param) {
      var td = query('.simple-table-cell', param.tr)[2];
      var optionChoice = this.interactionList();
      var selectionBox = new Select({
        options: optionChoice
      });
      selectionBox.placeAt(td);
      selectionBox.startup();
      param.tr.useAsStart = selectionBox;

      if(param.predefined !== null) {
        selectionBox.set("value", param.predefined.useAsStart);
        param.tr.useAsStart.value = param.predefined.useAsStart;
      }

      this.own(on(selectionBox, "change", lang.hitch(this, function(val) {
        this.traceTypesTable.selectRow(param.tr);
        this.launchFlagParameters({
          val:val,
          tr: param.tr,
          flagtype: "Start",
          flagUsage: "useAsStart",
          assetHolder: "startLocationLayers",
          parent: "flags"
        },this.traceTypesStartFlagHolder);
      })));
    },

    _addTraceBarrierSelection: function(param) {
      var td = query('.simple-table-cell', param.tr)[3];
      var optionChoice = this.interactionList();
      var selectionBox = new Select({
        options: optionChoice
      });
      selectionBox.placeAt(td);
      selectionBox.startup();
      param.tr.useAsBarrier = selectionBox;

      if(param.predefined !== null) {
        selectionBox.set("value", param.predefined.useAsBarrier);
        param.tr.useAsBarrier.value = param.predefined.useAsBarrier;
      }

      this.own(on(selectionBox, "change", lang.hitch(this, function(val) {
        this.traceTypesTable.selectRow(param.tr);
        this.launchFlagParameters({
          val:val,
          tr: param.tr,
          flagtype: "Barrier",
          flagUsage: "useAsBarrier",
          assetHolder: "barriersLayers",
          parent: "flags"
        },this.traceTypesBarrierFlagHolder);
      })));

    },

    _restoreTraceTypeRows: function(param) {
      this.traceTypesTable.clear();
      if(param.predefined !== null) {
        for (var key in param.predefined) {
          var arrTraces = param.predefined[key].traces;
          array.forEach(arrTraces, lang.hitch(this, function(trace) {
            this.addRowTraceType({"predefined":trace});
          }));
        }
      } else {
        this.addRowTraceType(param);
      }
    },

    storeTempConfig: function(param) {
      var row = this.traceTypesTable.getSelectedRow();
      if(row !== null) {
        var selectedRowMatch = this.traceTypesTable.getSelectedRowData();
        var match = false;
        var color = row.traceColor.getColor();
        color.a = 0.7;
        array.forEach(this.existingValues.traces, lang.hitch(this, function(trace) {
          //var rowData = this.traceTypesTable.getRowData(tr);
          if(selectedRowMatch.rowID === trace.traceID) {
              trace["type"] = row.traceType;
              trace["traceID"] = selectedRowMatch.rowID;
              trace["useAsStart"] = row.useAsStart.value;
              trace["useAsBarrier"] = row.useAsBarrier.value;
              trace["traceColor"] = color;
              match = true;
          }
        }));
        if(!match) {
          var obj = {
            "type": row.traceType,
            "traceID": selectedRowMatch.rowID,
            "useAsStart": row.useAsStart.value,
            "useAsBarrier": row.useAsBarrier.value,
            "startLocationLayers": [],
            "barriersLayers": [],
            "traceColor": color,
            "traceConfig": {
              "includeContainers": true,
              "includeStructLineContent": true,
              "includeStructures": true,
              "includeBarriers": true,
              "validateConsistency": false,
              "includeIsolated": false,
              "conditionBarriers": [],
              "filterBarriers": [],
              "outputConditions": [],
              "outputFilters": [],
              "nearestNeighbor": {
                "count": "-1",
                "costNetworkAttributeName": "",
                "nearestCategories": [],
                "nearestAssets": []
              }
            }
          };
          this.existingValues.traces.push(obj);
        }
        return true;
      }
    },

    deleteTraceType: function(tr, rowdata) {
      var rows = this.traceTypesTable.getRows();
      var found = false;
      var counter = -1;
      array.forEach(this.existingValues.traces, lang.hitch(this, function(trace, i) {
        found = false;
        array.forEach(rows, lang.hitch(this, function(row) {
          var rowData = this.traceTypesTable.getRowData(row);
          if(trace.traceID === rowData.rowID) {
            found = true;
          }
        }));
        if(!found) {
          counter = i;
        }
      }));
      if(counter > -1) {
        (this.existingValues.traces).splice(counter, 1);
        this.storeTempConfig();
      }
      rows = this.traceTypesTable.getRows();
      if(rows.length > 0) {
        this.traceTypesTable.selectRow(rows[rows.length-1]);
      } else {
        domConstruct.empty(this.traceTypesStartFlagHolder);
        domConstruct.empty(this.traceTypesBarrierFlagHolder);
        this.storeTempConfig();
      }
    },

    deleteConfigurationTable: function(table, holder) {
      if(table !== null) {
        domConstruct.empty(holder);
        table = null;
      }
      return true;
    },

    launchFlagParameters: function(param, holder) {
      //var tr = this.traceTypesTable.selectRow(param.tr);
      var currentTrace = this.getCorrectTrace({tr: param.tr});
      this.storeTempConfig();
      if(param.val !== (this.interactionList())[0].value) {
        domConstruct.empty(holder);
        new flagParameters({
          nls: this.nls,
          un: this.un,
          dataElements: this.dataElements,
          existingValues: currentTrace,
          flagTypeAssetHolder: param.assetHolder,
          flagType: param.flagtype,
          flagUsage: currentTrace[param.flagUsage],
          flagTableHolder: holder,
          parent: param.parent,
          validAssets: this.validAssets
        }).placeAt(holder)
      } else {
        currentTrace[param.flagUsage] = (this.interactionList())[0].value;
        currentTrace[param.assetHolder] = [];
        domConstruct.empty(holder);
      }
    },

    launchTraceConfig: function(param) {
      this.traceTypesTable.selectRow(param);
      var currentTrace = this.getCorrectTrace({tr: param});
      var traceConfig = new traceParameters({
        nls: this.nls,
        un: this.un,
        dataElements: dataElements,
        domainValueListHelper: this.domainValueListHelper,
        existingValues: currentTrace
      });
      var popup = new Popup({
        width: 850,
        height: 650,
        content: traceConfig,
        titleLabel: "Trace Configuration",
        onClose: lang.hitch(this, function () {
          traceConfig.destroy();
        }),
        buttons: [{
          label: "OK",
          onClick: lang.hitch(this, function () {
            traceConfig.storeTempConfig();
            popup.close();
          })
        }, {
          label: "Cancel",
          classNames: ['jimu-btn-vacation'],
          onClick: lang.hitch(this, function () {
            popup.close();
          })
        }]
      });
    },

    launchImportUtils: function(param) {
      var importConfig = new importUtils({
        nls: this.nls,
        un: this.un,
        dataElements: this.dataElements,
        domainValueListHelper: this.domainValueListHelper,
        existingValues: this.existingValues,
        validAssets: this.validAssets
      });
      var popup = new Popup({
        width: 850,
        height: 650,
        content: importConfig,
        titleLabel: "Import Trace",
        onClose: lang.hitch(this, function () {
          importConfig.destroy();
        }),
        buttons: [{
          label: "OK",
          onClick: lang.hitch(this, function () {
            if(importConfig.validInput) {
              this.traceTypesTable.clear();
              console.log(this.existingValues);
              this.existingValues.traces.push(importConfig.importTrace);
              this._initialize();
              popup.close();
            } else {
              alert("Invalid Import");
            }
          })
        }, {
          label: "Cancel",
          classNames: ['jimu-btn-vacation'],
          onClick: lang.hitch(this, function () {
            popup.close();
          })
        }]
      });
    },

    //*************************
    //**** START GLOBAL EVENT HANDLERS
    _wireEventHandlers: function() {
      this.own(on(this.traceTypesTable, "row-select", lang.hitch(this, function(tr) {
        //for starts
       var start =  this.launchFlagParameters({
          val: tr.useAsStart.value,
          tr: tr,
          flagtype: "Start",
          flagUsage: "useAsStart",
          assetHolder: "startLocationLayers",
          parent: "flags"
        },this.traceTypesStartFlagHolder);
        //for barriers
       var barriers = this.launchFlagParameters({
          val:tr.useAsBarrier.value,
          tr: tr,
          flagtype: "Barrier",
          flagUsage: "useAsBarrier",
          assetHolder: "barriersLayers",
          parent: "flags"
        },this.traceTypesBarrierFlagHolder);
      })));

      this.own(on(this.traceTypesTable, 'actions-edit', lang.hitch(this, this.launchTraceConfig)));
      //this.own(on(this.traceTypesTable, 'row-delete', lang.hitch(this, function(tr, rowdata){
      //  this.deleteTraceType(tr, rowdata);
      //})));
    },
    //**** END GLOBAL EVENT HANDLERS
    //*************************

    //support functions
    getValidAssets: function() {
      //gets all valid assets so they can be used for starts and barriers
      var validAssets = [];
        var de = this.dataElements.layerDataElements[0].dataElement;
        de.domainNetworks.map(lang.hitch(this, function(dn){
          console.log(dn);
          var obj = {
            domain: dn.domainNetworkName,
            tiers: []
          };
          if(dn.tiers.length > 0) {
            //if there are tiers, get the valid assets from them
            dn.tiers.map(lang.hitch(this, function(t) {
              var tierObj = {
                tier: t.name,
                validDevices: []
              };

              t.validDevices.map(lang.hitch(this, function(vd) {
                var matchList = this._matchAG(vd, dn.junctionSources);
                if(matchList.length > 0) {
                  matchList.map(function(ml) {
                    tierObj.validDevices.push(ml);
                  });
                }
              }));
              obj.tiers.push(tierObj);
            }));
          }
          validAssets.push(obj);
        }));
      console.log(validAssets);
      return validAssets;
    },

    _matchAG: function(device, source) {
      var filtered = [];
      source.map(function(src) {
        var list = src.assetGroups.filter(function(s_ag) {
          s_ag["layerId"] = src.layerId;
          s_ag["sourceId"] = src.sourceId;
          return(parseInt(s_ag.assetGroupCode) === parseInt(device.assetGroupCode));
        });
        if(list.length > 0) {
          filtered.push(list[0]);
        }
      });
      return filtered;
    },

    getCorrectTrace: function(param) {
      var currTrace = "";
      var rowData = this.traceTypesTable.getSelectedRowData(param.tr);
      array.forEach(this.existingValues.traces, lang.hitch(this, function(trace) {
        if(rowData.rowID === trace.traceID) {
          currTrace = trace;
        }
      }));
      return currTrace;
    },

    interactionList: function() {
      var userActions = [
        {label: "Use Existing", value: "useExisting"},
        {label: "Add to Existing", value: "addToExisting"},
        {label: "Remove from Existing", value: "RemoveFromExisting"},
        {label: "Replace all with", value: "replaceAllWith"},
        {label: "Replace with first", value: "replaceFirst"}
      ];
      return userActions;
    },

    runOptions: function() {
      var userActions = [
        {label: "Run once", value: "runOnce"},
        {label: "Until no results", value: "runTillNoResults"}
      ];
      return userActions;
    }

    //******** UN connection Info */


  });
});