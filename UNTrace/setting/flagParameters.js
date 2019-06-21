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
  'dojo/Evented',
  "dojo/on",
  "dojo/dom-construct",
  "dojo/dom-style",
  "dojo/dom-class",
  "dojo/query",
  "dojo/_base/lang",
  "dojo/_base/array",
  'jimu/dijit/SimpleTable',
  "dijit/form/Select"],
function (declare,
  _WidgetsInTemplateMixin,
  BaseWidgetSetting, Evented, on, domConstruct, domStyle, domClass, query, lang, array,
  SimpleTable, Select
) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin, Evented], {
    baseClass: 'jimu-widget-UNTrace-setting',
    nls: null,
    un: null,
    dataElements: null,
    domainValueListHelper: [],
    existingValues: null,
    flagTable: null,
    flagType: null,
    flagUsage: null,
    flagTypeAssetHolder: "",
    flagTableHolder: null,
    parent: null,
    currentTrace: null,
    addRowOnNew: true,
    validAssets: null,

    constructor: function (/*Object*/args) {
      this.map = args.map;
    },

    postMixInProperties: function () {
      this.inherited(arguments);
      this.nls.common = window.jimuNls.common;
    },

    postCreate: function () {
      this.inherited(arguments);
      switch(this.parent) {
        case "flags":
          this.currentTrace = this.existingValues;
          break;
        case "outputFilter":
          this.currentTrace = this.existingValues.traceConfig;
          break;
        case "KNN":
          this.currentTrace = this.existingValues.traceConfig.nearestNeighbor;
          break;
        default:
          this.currentTrace = this.existingValues;
          break;
      }
      this.startup();
    },

    startup: function () {
      if(this.currentTrace !== null) {
        this._showAssetHolder({"useType": this.flagUsage});
      } else {
        this._showAssetHolder({"value": ""});
      }

    },

    _showAssetHolder: function(param) {
      if(typeof(param.useType) !== "undefined") {
        if(param.useType === 'useExisting' || param.useType === "") {
          domConstruct.empty(this.flagTableHolder);
        } else {
          domConstruct.empty(this.flagTableHolder);
          this._createFlagTable();
          if(this.currentTrace[this.flagTypeAssetHolder].length > 0) {
            array.forEach(this.currentTrace[this.flagTypeAssetHolder], lang.hitch(this, function(asset) {
              if(this.parent === "flags") {
                this.flagTableAddRow({"predefined":asset.assetGroupCode + ":" + asset.assetTypeCode + ":" + asset.layerId});
              } else {
                this.flagTableAddRow({"predefined":asset.assetGroupCode + ":" + asset.assetTypeCode + ":" + asset.networkSourceId});
              }
            }));
          } else {
            if(this.addRowOnNew) {
              this.flagTableAddRow({"predefined":null});
            }
          }
        }
      }
    },

    _createFlagTable: function() {
      if(this.flagTable !== null) {
        domConstruct.empty(this.flagTableHolder);
        this.flagTable = null;
      }
      this._createAddNewRowButton();
      var fields = [{
        name: 'flags',
        title: "Select your <span style='font-weight:bold'>"+this.flagType+"</span> Asset Group/Type",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'actions',
        title: "Actions",
        type: 'actions',
        width: '75px',
        'class': 'actions',
        actions: ['delete']//'up','down',
      },{
        name: 'hiddenValue',
        type: 'text',
        hidden: true,
        'class': 'editable'
      }];
      var args = {
        fields: fields,
        selectable: false
      };
      this.flagTable = new SimpleTable(args);
      this.flagTable.placeAt(this.flagTableHolder);
      this.flagTable.startup();

      this.own(on(this.flagTable, "row-add", lang.hitch(this, function(tr) {
        this._createAGATList({tr:tr});
        this.storeTempConfig();
      })));

      this.own(on(this.flagTable, "row-delete", lang.hitch(this, function(tr) {
        this.storeTempConfig();
      })));
    },

    flagTableAddRow: function(param) {
      this.flagTable.addRow({
        "hiddenValue": param.predefined
      });
      //this.storeTempConfig();
    },

    _createAGATList: function(param) {
      var rowData = this.flagTable.getRowData(param.tr);
      var td = query('.simple-table-cell', param.tr)[0];
      var optionList = [];

      var justCommod = this.validAssets.filter(lang.hitch(this, function(va) {
        if(this.currentTrace.traceConfig.domainNetwork !== "") {
          return va.domain.toLowerCase() === this.currentTrace.traceConfig.domainNetwork.toLowerCase();
        } else {
          return va.domain !== "Structure";
        }
      }));

      if(justCommod.length > 0) {
        var justTiers = justCommod[0].tiers.filter(lang.hitch(this, function(t) {
          if(this.currentTrace.traceConfig.tier !== "") {
            return t.tier.toLowerCase() === this.currentTrace.traceConfig.tier.toLowerCase();
          }
        }));
        if(justTiers.length > 0) {
          justCommod[0].tiers = justTiers;
        }

        justCommod.map(lang.hitch(this, function(jc) {
          jc.tiers.map(lang.hitch(this, function(t) {
            t.validDevices.map(lang.hitch(this, function(vd){
              vd.assetTypes.map(lang.hitch(this, function(at){
                var currVal = vd.assetGroupCode + ":" + at.assetTypeCode + ":" + vd.layerId;
                var check = optionList.find(lang.hitch(this, function(ol) {
                  return this._checkDupe(ol, currVal);
                }));
                if(typeof(check) === "undefined") {
                  if(this.parent === "flags") {
                    optionList.push({
                      label: vd.assetGroupName + " - " + at.assetTypeName,
                      value: vd.assetGroupCode + ":" + at.assetTypeCode + ":" + vd.layerId,
                      layerId: vd.layerId,
                      sourceId: vd.sourceId
                    });
                  } else {
                    optionList.push({
                      label: vd.assetGroupName + " - " + at.assetTypeName,
                      value: vd.assetGroupCode + ":" + at.assetTypeCode + ":" + vd.sourceId,
                      layerId: vd.layerId,
                      sourceId: vd.sourceId
                    });
                  }
                }
              }));
            }));
          }));
        }));
      }

      optionList.sort(this._compare("label"));

      var selectionBox = new Select({
        options: optionList,
        style: {width: '500px'},
      });
      selectionBox.placeAt(td);
      selectionBox.startup();

      if(rowData.hiddenValue !== null) {
        selectionBox.set("value", rowData.hiddenValue);
      }

      param.tr.flags = selectionBox;
      this.own(on(selectionBox, "change", lang.hitch(this, function(val) {
        this.storeTempConfig();
      })));

    },

    _checkDupe: function(item, checkVal) {
      return item.value === checkVal;
    },

    _removeDuplicates: function(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    },

    storeTempConfig: function() {

      var assetList = [];
      var rows = this.flagTable.getRows();
      if(rows.length > 0) {
        array.forEach(rows, lang.hitch(this, function(row) {
          var splitAGAT = (row.flags.value).split(":");
          var indx = 0;
          for (i=0; i<row.flags.options.length; i++) {
            if (row.flags.options[i].selected) {indx = i;}
          }
          if(this.parent === "flags") {
            //row.flags.options[indx].layerId
            assetList.push({
              "assetGroupCode": parseInt(splitAGAT[0]),
              "assetTypeCode": parseInt(splitAGAT[1]),
              "layerId": parseInt(splitAGAT[2])
            });
          } else {
            assetList.push({
              "assetGroupCode": parseInt(splitAGAT[0]),
              "assetTypeCode": parseInt(splitAGAT[1]),
              "networkSourceId": parseInt(splitAGAT[2])
            });
          }
        }));
        this.currentTrace[this.flagTypeAssetHolder] = assetList;
      } else {
        this.currentTrace[this.flagTypeAssetHolder] = [];
      }
      return true;
      //emit that config change so it can saved
      //this.emit("config-change", tempSetting);

    },

    _createAddNewRowButton: function() {
      var table = domConstruct.create("table");
      domConstruct.place(table, this.flagTableHolder);
      domStyle.set(table, "width", "100%");
      var row = table.insertRow(0);
      var cellDesc = row.insertCell(0);
      var cellAction = row.insertCell(1);
      domStyle.set(cellAction, "width", "35px");
      domStyle.set(cellDesc, "width", "95%");
      cellDesc.innerHTML = "Add a "+ this.flagType +": ";
      domClass.add(cellAction, 'addIcon');
      this.own(on(cellAction, "click", lang.hitch(this, function() {
        this.flagTableAddRow({"predefined":null});
      })));
    },

    _compare: function(prop) {
      return function(a,b) {
        let comparison = 0;
        if (a[prop] > b[prop]) {
          comparison = 1;
        } else if (a[prop] < b[prop]) {
          comparison = -1;
        }
        return comparison;
      }
    },

    destroy: function () {
    }
  });
});
