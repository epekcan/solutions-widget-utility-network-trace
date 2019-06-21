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
  'dojo/text!./importUtils.html',
  "dojo/on",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dijit/form/SimpleTextarea"
],
function(declare, BaseWidgetSetting, _TemplatedMixin, template, on, lang, array, SimpleTextarea) {
  return declare([BaseWidgetSetting, _TemplatedMixin], {
    templateString: template,
    baseClass: 'jimu-widget-untrace-setting',
    nls: null,
    token : null,
    un: null,
    cmbDomainNetworks: null,
    domainValueListHelper: [],
    traceTemplate: {
      "type": "",
      "traceID": 0,
      "useAsStart": "useExisting",
      "useAsBarrier": "useExisting",
      "startLocationLayers": [],
      "barriersLayers": [],
      "traceColor": {
        "r": 0,
        "g": 0,
        "b": 255,
        "a": 0.7
      },
      "traceConfig":{}
    },
    importTrace: null,
    textInput: null,
    validInput: true,
    validAssets: [],

    postCreate: function(){
      this.textInput = new SimpleTextarea({
        name: "importCode",
        style: "width:100%; height:400px;"
      });
      this.textInput.placeAt(this.inputText);
      this.textInput.startup();

      this.own(on(this.textInput, "change", lang.hitch(this, function(val) {
        this.importTrace = lang.clone(this.traceTemplate);
        this.validateString({pycode: val});
      })));
    },

    validateString: function(param) {
      if(param.pycode !== "") {
        //removing arcpy parts
        var stringSig = param.pycode.slice(param.pycode.indexOf("(")+1);
        stringSig = stringSig.slice(0, -1);
        //Slice apart string into array by comma
        var stringSigArr = stringSig.split(",");
        if(stringSigArr.length >= 30) {
          //get the trace type part
          this.validInput = this.parseTraceType({value: stringSigArr[1], node:"type", preNode:""});
          this.validInput = this.parseTraceType({value: stringSigArr[1], node:"type", preNode:"traceConfig"});
          //set the target tier
          if(this.validInput) {
            this.validInput = this.parseTier({value: stringSigArr[4], node:"domainNetwork", preNode:"traceConfig"});
            this.validInput = this.parseTier({value: stringSigArr[5], node:"tier", preNode:"traceConfig"});
            this.validInput = this.parseTier({value: stringSigArr[6], node:"targetTier", preNode:"traceConfig"});
          }
          if(this.validInput) {
            this.validInput = this.parseIncludes({value: stringSigArr[9], node:"includeContainers"});
            this.validInput = this.parseIncludes({value: stringSigArr[10], node:"includeStructLineContent"});
            this.validInput = this.parseIncludes({value: stringSigArr[11], node:"includeStructures"});
            this.validInput = this.parseIncludes({value: stringSigArr[12], node:"includeBarriers"});
            this.validInput = this.parseIncludes({value: stringSigArr[13], node:"validateConsistency"});
            this.validInput = this.parseIncludes({value: stringSigArr[30], node:"includeIsolated"});
          }
          if(this.validInput) {
            this.validInput = this.parseBarriersFiltersFunctions({value: stringSigArr[14], node:"conditionBarriers"});
          }
          if(this.validInput) {
            this.validInput = this.parseBarriersFiltersFunctions({value: stringSigArr[15], node:"functionBarriers"});
          }
          if(this.validInput) {
            this.validInput = this.parseBarriersFiltersFunctions({value: stringSigArr[17], node:"filterBarriers"});
          }
          if(this.validInput) {
            this.validInput = this.parseBarriersFiltersFunctions({value: stringSigArr[18], node:"filterFunctionBarriers"});
          }
          if(this.validInput) {
            this.validInput = this.parseBarriersFiltersFunctions({value: stringSigArr[29], node:"outputConditions"});
          }
          if(this.validInput) {
            this.validInput = this.parseBarriersFiltersFunctions({value: stringSigArr[26], node:"functions"});
          }
          if(this.validInput) {
            this.validInput = this.parseKNN({
              useNearest: stringSigArr[21],
              count: stringSigArr[22],
              costNetworkAttributeName: stringSigArr[23],
              nearestCategories: stringSigArr[24],
              nearestAssets: stringSigArr[25],
              node:"nearestNeighbor"
            });
          }
          if(this.validInput) {
            this.validInput = this.parseAssetList({value: stringSigArr[28], node:"outputFilters"});
          }
        } else {
          this.validInput = false;
          alert("no valid import");
        }
      } else {
        this.validInput = false;
        alert("no valid import");
      }
    },

    parseTraceType: function(param) {
      param.value = (param.value).trim();
      if(param.value !== "None") {
        if(param.preNode === "") {
          this.importTrace[param.node] = ((param.value.replace(/"/g, '')).trim()).toLowerCase();
        } else {
          this.importTrace.traceConfig[param.node] = ((param.value.replace(/"/g, '')).trim()).toLowerCase();
        }
        this.importTrace["traceID"] = ((new Date()).getTime()).toString();
        return true;
      } else {
        if(param.preNode === "") {
          this.importTrace[param.node] = "connected";
        } else {
          this.importTrace.traceConfig[param.node] = "connected";
        }
        this.importTrace["traceID"] = ((new Date()).getTime()).toString();
        return true;
      }
    },
    parseTier: function(param) {
      param.value = (param.value).trim();
      if(param.value !== "None") {
        if(param.preNode === "") {
          this.importTrace[param.node] = ((param.value.replace(/"/g, '')).trim()).toLowerCase();
        } else {
          this.importTrace.traceConfig[param.node] = ((param.value.replace(/"/g, '')).trim()).toLowerCase();
        }
        return true;
      } else {
        if(param.preNode === "") {
          this.importTrace[param.node] = "";
        } else {
          this.importTrace.traceConfig[param.node] = "";
        }
        return true;
      }
    },
    parseIncludes: function(param) {
      param.value = (param.value).trim();
      if(param.value !== "None") {
          if(param.value.indexOf("EXCLUDE") > -1 || param.value.indexOf("DO_NOT") > -1) {
            this.importTrace.traceConfig[param.node] = false;
          } else {
            this.importTrace.traceConfig[param.node] = true;
          }
        return true;
      } else {
        this.importTrace.traceConfig[param.node] = false;
        return false;
      }
    },
    parseBarriersFiltersFunctions: function(param) {
      param.value = (param.value).trim();
      if(param.value !== "None") {
        var cleanStr = (param.value).trim();
        this.importTrace.traceConfig[param.node] = [];
        if(cleanStr.indexOf(";") > -1) {
          var objList = cleanStr.split(";"); //check if there are multiple conditions by slipting at semicolon
          for(var i=0; i< objList.length; i++) {
            objList[i] = this.handleNamewithSpace(objList[i]);
            var objItems = objList[i].split(" "); //after split, the params are separted by a space. split to make them array
            //notice that if isSpecificValue is true, the type is networkAttribute. it's what is sent to rest.
            switch(param.node) {
              case "functions":
                this.functionHandler({values: objItems, node:param.node});
                break;
              case "functionBarriers":
              case "filterFunctionBarriers":
                this.functionBarrierHandler({values: objItems, node:param.node});
                break;
              default:
                this.filterHandler({values: objItems, node:param.node});
                break;
            }
          }
        } else {
          cleanStr = this.handleNamewithSpace(cleanStr);
          var objItems = cleanStr.split(" "); //after split, the params are separted by a space. split to make them array
          switch(param.node) {
            case "functions":
              this.functionHandler({values: objItems, node:param.node});
              break;
            case "functionBarriers":
            case "filterFunctionBarriers":
              this.functionBarrierHandler({values: objItems, node:param.node});
              break;
            default:
              this.filterHandler({values: objItems, node:param.node});
              break;
          }
        }
        return true;
      } else {
        this.importTrace.traceConfig[param.node] = [];
        return true;
      }
    },
    parseKNN: function(param) {
      param.useNearest = (param.useNearest).trim();
      if(param.useNearest !== "None") {
        cleanUseNearest = (param.useNearest.replace(/"/g, "")).trim();
        if(cleanUseNearest !== "DO_NOT_FILTER") {
          this.importTrace.traceConfig[param.node] = {
            "count": parseInt(param.count),
            "costNetworkAttributeName": (param.costNetworkAttributeName.replace(/"/g, "")).trim(),
            "nearestCategories": ((param.nearestCategories.replace(/"/g, "")).trim()).split(";")
          }
          this.validInput = this.parseAssetList({value: param.nearestAssets, node:"nearestAssets",  preNode:"nearestNeighbor"});

        } else {
          this.importTrace.traceConfig[param.node] = {
            "count": -1,
            "costNetworkAttributeName": "",
            "nearestCategories": [],
            "nearestAssets": []
          };
        }
        return true;
      } else {
        this.importTrace.traceConfig[param.node] = {
          "count": -1,
          "costNetworkAttributeName": "",
          "nearestCategories": [],
          "nearestAssets": []
        };
        return false;
      }
    },
    parseAssetList: function(param) {
      param.value = (param.value).trim();
      if(param.value !== "None") {
        var assetList = this._createAGATList();
        var cleanStr = (param.value.replace(/["']/g, "")).trim();
        var importList = [];
        if(cleanStr.indexOf(";") > -1) {
          var objList = cleanStr.split(";");
          for(var i=0;i<objList.length;i++) {
            var obj = objList[i].split("/");
            for(var z=0;z<assetList.length;z++) {
              if(assetList[z].assetGroupName === obj[1] && assetList[z].assetTypeName === obj[2]) {
                importList.push({
                  "assetGroupCode": parseInt(assetList[z].assetGroupCode),
                  "assetTypeCode": parseInt(assetList[z].assetTypeCode),
                  "networkSourceId": parseInt(assetList[z].networkSourceId)
                });
              }
            }
          }
        } else {
          var obj = cleanStr.split("/");
          for(var z=0;z<assetList.length;z++) {
            if(assetList[z].assetGroupName === obj[1] && assetList[z].assetTypeName === obj[2]) {
              importList.push({
                "assetGroupCode": parseInt(assetList[z].assetGroupCode),
                "assetTypeCode": parseInt(assetList[z].assetTypeCode),
                "networkSourceId": parseInt(assetList[z].networkSourceId)
              });
            }
          }
        }
        if(typeof(param.preNode) !== "undefined") {
          this.importTrace.traceConfig[param.preNode][param.node] = importList;
        } else {
          this.importTrace.traceConfig[param.node] = importList;
        }
        return true;
      } else {
        if(typeof(param.preNode) !== "undefined") {
          this.importTrace.traceConfig[param.preNode][param.node] = [];
        } else {
          this.importTrace.traceConfig[param.node] = [];
        }
        return true;
      }
    },
    //support functions
    filterHandler: function(param) {
      var typeHandler = "networkAttribute";
      if((param.values[0].replace(/["']/g, "")).replace(/[$]/g, " ") === "Category") {
        typeHandler = "category";
      } else {
        if(param.values[2] === "SPECIFIC_VALUE") {
          typeHandler = "networkAttribute";
        } else {
          typeHandler = this._enumMapper(param.values[2]);
        }
      }
      var value = (param.values[3].replace(/["']/g, "")).replace(/[$]/g, " ");
      this.importTrace.traceConfig[param.node].push({
        "name": ((param.values[0].replace(/["']/g, "")).replace(/[$]/g, " ")).trim(),
        "type": typeHandler,
        "operator": this._enumMapper(param.values[1]),
        "value": (isNaN(value))? value : Number(value),
        "combineUsingOr": (param.values[4] === "OR")? true : false,
        "isSpecificValue": (param.values[2] === "SPECIFIC_VALUE")? true : false
      });
    },
    functionHandler: function(param) {
      var typeHandler = "networkAttribute";
      if((param.values[2].replace(/["']/g, "")).replace(/[$]/g, " ") === "Category") {
        typeHandler = "category";
      } else {
        if(param.values[4] === "SPECIFIC_VALUE") {
          typeHandler = "networkAttribute";
        } else {
          typeHandler = this._enumMapper(param.values[4]);
        }
      }
      var functionObj = {
        "functionType": (((param.values[0].replace(/["']/g, "")).replace(/[$]/g, " ")).trim()).toLowerCase(),
        "networkAttributeName": ((param.values[1].replace(/["']/g, "")).replace(/[$]/g, " ")).trim(),
        "summaryAttributeName": "",
        "conditions": []
      };
      if((param.values[2].replace(/["']/g, "")).replace(/[$]/g, " ") !== "None") {
        var value = ((param.values[5].replace(/["']/g, "")).replace(/[$]/g, " ")).trim();
        functionObj["conditions"].push({
          "name": (param.values[2].replace(/["']/g, "")).replace(/[$]/g, " "),
          "type": typeHandler,
          "operator": this._enumMapper(param.values[3]),
          "value": (isNaN(value))? value : Number(value),
          "combineUsingOr": false,
          "isSpecificValue": (param.values[4] === "SPECIFIC_VALUE")? true : false
        });
      }
      this.importTrace.traceConfig[param.node].push(functionObj);
    },
    functionBarrierHandler: function(param) {
      var value = ((param.values[3].replace(/["']/g, "")).replace(/[$]/g, " ")).trim();
      this.importTrace.traceConfig[param.node].push({
        "functionType": (((param.values[0].replace(/["']/g, "")).replace(/[$]/g, " ")).trim()).toLowerCase(),
        "networkAttributeName": ((param.values[1].replace(/["']/g, "")).replace(/[$]/g, " ")).trim(),
        "operator": this._enumMapper(param.values[2]),
        "value": (isNaN(value))? value : Number(value),
        "useLocalValues": (param.values[4] === "true" || param.values[4] === true)? true : false
      });
    },
    handleNamewithSpace: function(param) {
      if(param.indexOf("'") > -1) {
        var inputArr = param.match(/'([^']+)'/g);
        if(inputArr !== null) {
          if(inputArr.length > 0) {
            for(var i=0;i<inputArr.length;i++) {
              replaceVal = inputArr[i].replace(/ /g, "$");
              param = param.replace(inputArr[i], replaceVal);
            }
            return param;
          } else {
            return param;
          }
        } else {
          return param;
        }
      } else {
        return param;
      }
    },
    _createAGATList: function() {
      var assetList = [];

      var justCommod = this.validAssets.filter(function(va) {
        return va.domain !== "Structure";
      });

      if(justCommod.length > 0) {
        justCommod.map(lang.hitch(this, function(jc) {
          jc.tiers.map(lang.hitch(this, function(t) {
            t.validDevices.map(lang.hitch(this, function(vd){
              vd.assetTypes.map(lang.hitch(this, function(at){
                assetList.push({
                  "assetGroupCode": vd.assetGroupCode,
                  "assetGroupName": vd.assetGroupName,
                  "assetTypeCode": at.assetTypeCode,
                  "assetTypeName": at.assetTypeName,
                  "networkSourceId": vd.sourceId,
                  "layerId": vd.layerId
                });
              }));
            }));
          }));
        }));
      }
      return assetList;
    },
    _enumMapper: function(param) {
      var list = {
        "IS_EQUAL_TO": "equal",
        "DOES_NOT_EQUAL": "notEqual",
        "IS_GREATER_THAN": "greaterThan",
        "IS_GREATER_THAN_OR_EQUAL_TO": "greaterThanEqual",
        "IS_LESS_THAN": "lessThan",
        "IS_LESS_THAN_OR_EQUAL": "lessThanEqual",
        "INCLUDES_THE_VALUES": "includesTheValues",
        "INCLUDES_ANY": "includesAny",
        "DOES_NOT_INCLUDE_ANY": "doesNotIncludeAny",
        "DOES_NOT_INCLUDE_THE_VALUES": "doesNotIncludeTheValues",
        "SPECIFIC_VALUE": "specificValue",
        "NETWORK_ATTRIBUTE": "networkAttribute"
      }
      if(list.hasOwnProperty(param)) {
        return list[param];
      } else {
        return param;
      }
    }

/*
        stringSigArr[0];  //UN service
        stringSigArr[1];  //trace type
        stringSigArr[2];  //starting points GDB
        stringSigArr[3];  //Barriers GDB
        stringSigArr[4];  //Domain network
        stringSigArr[5];  //Tier
        stringSigArr[6];  //Target Tier
        stringSigArr[7];  //Subnetwork Name
        stringSigArr[8];  //shortest path network Attribute
        stringSigArr[9];  //include containers
        stringSigArr[10];  //include content
        stringSigArr[11];  //include structures
        stringSigArr[12];  //include barriers
        stringSigArr[13];  //validate consistency
        stringSigArr[14];  //Condition barriers
        stringSigArr[15];  //Function Barriers
        stringSigArr[16];  //Apply Traverse to
        stringSigArr[17];  //Filter Barriers
        stringSigArr[18];  //Filter function barriers
        stringSigArr[19];  //Apply Filter To
        stringSigArr[20];  //Filter by bitset NA
        stringSigArr[21];  //Filter By Nearest (KNN)
        stringSigArr[22];  //KNN Count
        stringSigArr[23];  //Cost Network Attribute
        stringSigArr[24];  //Nearest Categories
        stringSigArr[25];  //Nearest Asset Groups/Types
        stringSigArr[26];  //Functions
        stringSigArr[27];  //Propagators
        stringSigArr[28];  //Output Asset Types
        stringSigArr[29];  //Output Conditions
        stringSigArr[30];  //Output Utility Network


*/

  });
});