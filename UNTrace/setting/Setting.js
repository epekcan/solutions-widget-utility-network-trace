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
  "dijit/registry",
  "dojo/on",
  'dojo/Deferred',
  "dojo/dom-construct",
  "dojo/query",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/promise/all",
  "esri/arcgis/Portal",
  "esri/request",
  'jimu/dijit/Popup',
  "./PrivilegeUtil",
  "./utilitynetwork",
  './traceGroup',
  "jimu/tokenUtils",
  'jimu/dijit/SimpleTable',
  "dijit/form/TextBox",
  "dijit/form/Select"
],
function(declare, BaseWidgetSetting, _TemplatedMixin, registry, on, Deferred, domConstruct, query, lang, array, all,
  agsPortal, esriRequest, Popup, PrivilegeUtil, UtilityNetwork, traceGroup, tokenUtils,
  SimpleTable, Textbox, Select) {
  return declare([BaseWidgetSetting, _TemplatedMixin], {
    baseClass: 'jimu-widget-untrace-setting',

    portal: null,
    token : null,
    un: null,
    domainValueListHelper: [],
    tempTraceConfigs: null,
    traceGroupParameter: null,
    servicesTable: null,
    userDefinedTraces: null,
    unItems: [],
    unDomainNetworks: [],
    unTiers: [],
    unLayerId: null,
    unLayer: null,
    unDataElements: null,
    runTraceAmount: null,
    slDomainNetworks : null,
    slTiers: null,

    postCreate: function(){

      this.un = UtilityNetwork;
      this.token = this.generateToken();
      this.un.token = this.token;
      //this.portalConnect();
      this._checkURLLayersForUN().then(lang.hitch(this, function() {
        //request for dataElements
        if(this.unLayer !== null) {
          var strippedURL = this.unLayer.url;
          var requestURL = strippedURL + "/queryDataElements";
          this.requestData({method: 'POST', url:requestURL, params: {f : "json", layers:"["+this.unLayerId+"]", token: this.token}}).then(lang.hitch(this, function(result) {
            this.unDataElements = result;
            console.log(this.unDataElements);
            this.tempTraceConfigs = {
              "userTraces":{}
            };
            this.setConfig(this.config);

            //this.createServiceTable();
            this._listDefaultDomainNetworks(this.unDataElements.layerDataElements[0].dataElement);
            this._createUserDefinedTraceTable();
            this._restoreUserDefinedGroups();

            this.own(on(this.addUserTraces, "click", lang.hitch(this, function() {
              this.groupNamePopup();
            })));
          }));
        }

      }));
    },

    setConfig: function(config){
      this.tempTraceConfigs["userTraces"] =  this.config["userTraces"];
    },

    getConfig: function(){
      if(this.userDefinedTraces !== null)
      {
        var rows = this.userDefinedTraces.getRows();
        if (rows.length > 0) {
          //WAB will get config object through this method
          delete this.config.userTraces[""];
          /*
          this.config.service = this.cmbItems.value;
          this.config.tier = this.cmbTiers.value;
          this.config.subnetLineLayer = this.un.subnetLineLayerId;
          */
          this.config.domainNetwork = this.slDomainNetworks.get("value");
          this.config.tier = this.slTiers.get("value");
          this.config.UNLayerId = this.unLayerId;
          this.config.FSurl = this.unLayer.url;

          for(key in this.tempTraceConfigs["userTraces"]) {
            var curr = this.tempTraceConfigs["userTraces"];
            if(curr[key].traces.length <= 0) {
              alert("You need atleast 1 trace within " + key);
              return false;
            }
          }

          this.config["userTraces"] = this.tempTraceConfigs["userTraces"];

          return this.config;
        } else {
          alert("You need atleast 1 trace group");
          return false;
        }
      } else {
        alert("Please fill out all the information");
        return false;
      }
    },

    generateToken: function() {
      var tokenTool = tokenUtils;
      tokenTool.portalUrl = this.appConfig.portalUrl;
      return tokenTool.getPortalCredential(this.appConfig.portalUrl).token;
    },

    _listDefaultDomainNetworks: function(params) {
      var optionChoice = [];
      params.domainNetworks.forEach(lang.hitch(this, function(domainNetwork) {
        if(domainNetwork.domainNetworkName !== "Structure") {
          var obj = {
            label: domainNetwork.domainNetworkName,
            value: domainNetwork.domainNetworkName
          };
          if(this.config.domainNetwork !== null) {
            if(this.config.domainNetwork === domainNetwork.domainNetworkName) {
              obj.selected = true;
            }
          }
          optionChoice.push(obj);
        }
      }));
      var selectionBox = new Select({
        options: optionChoice
      });
      selectionBox.placeAt(this.domainNetworksSelectHolder);
      selectionBox.startup();
      this.slDomainNetworks = selectionBox;

      this.own(on(this.slDomainNetworks, "change", lang.hitch(this, function() {
        this._listDefaultTiers(this.slDomainNetworks.get("value"), params.domainNetworks);
      })));

      this._listDefaultTiers(this.slDomainNetworks.get("value"), params.domainNetworks);
    },

    _listDefaultTiers: function(dnValue, dn) {
      domConstruct.empty(this.tiersSelectHolder);
      this.slTiers = null;
      var validDN = dn.filter(lang.hitch(this, function(d) {
        return d.domainNetworkName === dnValue;
      }));
      if(validDN.length > 0) {
        var optionChoice = [];
        validDN[0].tiers.forEach(lang.hitch(this, function(tier) {
          var obj = {
            label: tier.name,
            value: tier.name
          };
          if(this.config.tier !== null) {
            if(this.config.tier === tier.name) {
              obj.selected = true;
            }
          }
          optionChoice.push(obj);
        }));
        var selectionBox = new Select({
          options: optionChoice
        });
        selectionBox.placeAt(this.tiersSelectHolder);
        selectionBox.startup();
        this.slTiers = selectionBox;

      }

    },

    //*****************************************
    // ******* Start User Defined Group management functions
    _createUserDefinedTraceTable: function() {
      var fields = [{
        name: 'userDefinedName',
        title: "Trace Name",
        type: 'text',
        width: '40%',
        'class': 'editable'
      },
      {
        name: 'runAmount',
        title: "Run",
        type: 'empty',
        width: '40%',
        'class': 'editable'
      },
      {
        name: 'actions',
        title: "Actions",
        type: 'actions',
        'class': 'actions',
        actions: ['delete']//'up','down',
      }];
      var args = {
        fields: fields,
        selectable: true
      };
      this.userDefinedTraces = new SimpleTable(args);
      this.userDefinedTraces.placeAt(this.dynamicUserTraces);
      this.userDefinedTraces.startup();
      this._wireEventHandlers();
    },

    addRowUserDefined: function(param) {
      var addRowResult = this.userDefinedTraces.addRow({
        userDefinedName: param.predefined
      });
      this._populateRunAmount({"tr":addRowResult.tr, "predefined":param.runAmount});
      this.userDefinedTraces.selectRow(addRowResult.tr);
      this.storeTempConfig();
      return addRowResult;
    },

    _addUserTextbox: function(param) {
      var defaultText = "";
      if(param.predefined !== null) {
        for (var key in param.predefined) {
          defaultText = key;
        }
      } else {
        defaultText = "Trace Group";
      }
      var td = query('.simple-table-cell', param.tr)[0];
      var userTextbox = new Textbox({
        placeHolder: "Give your trace a name",
        value: defaultText,
        style: {
          width: "100%",
          height: "26px"
        }
      });
      userTextbox.placeAt(td);
      userTextbox.startup();
      param.tr.userDefinedName = userTextbox;

      this.own(on(userTextbox, "focus", lang.hitch(this, function() {
        this.userDefinedTraces.selectRow(param.tr);
      })));


    },
    // ******* End user defined group management
    //*****************************************
    _restoreUserDefinedGroups: function() {
      var existTraceCheck = this.tempTraceConfigs["userTraces"];
      for (var key in existTraceCheck) {
        if (existTraceCheck.hasOwnProperty(key)) {
          var obj = {};
          obj[key] = existTraceCheck[key];
          this.addRowUserDefined({"predefined":key, "runAmount":obj[key]});
        }
      }
    },

    _populateRunAmount: function(param) {
      var td = query('.simple-table-cell', param.tr)[1];
      domConstruct.empty(td);
      var optionChoice = this.runOptions();
      var selectionBox = new Select({
        options: optionChoice
      });
      selectionBox.placeAt(td);
      selectionBox.startup();
      if(typeof(param.predefined) !== "undefined") {
        if(param.predefined !== null) {
          if(param.predefined.hasOwnProperty("runAmount")) {
            selectionBox.set("value", param.predefined.runAmount);
          }
        }
      }
      this.own(on(selectionBox, "change", lang.hitch(this, function(val) {
        this.userDefinedTraces.selectRow(param.tr);
      })));
    },

    storeTempConfig: function(param) {
      var userRowData = this.userDefinedTraces.getSelectedRowData();
      var userSelectedRow = this.userDefinedTraces.getSelectedRow();
      var td = query('.simple-table-cell', userSelectedRow)[1];
      var runOption = registry.byNode(td.childNodes[0]);
      if(userRowData !== null) {
        if((this.tempTraceConfigs.userTraces).hasOwnProperty(userRowData.userDefinedName)) {
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName].runAmount = runOption.value;
        } else {
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName] = {"traces":[], "runAmount":runOption.value};
          //if(this.runTraceAmount !== null) {
          //  this.tempTraceConfigs.userTraces[userRowData.userDefinedName].runAmount = this.runTraceAmount.value;
          //}
        }
      }
    },

    deleteUserGroup: function(tr, rowdata) {
      if(this.tempTraceConfigs.userTraces.hasOwnProperty(rowdata.userDefinedName)) {
        delete this.tempTraceConfigs.userTraces[rowdata.userDefinedName];
      }
      var rows = this.userDefinedTraces.getRows();
      if (rows.length > 0) {
        this.userDefinedTraces.selectRow(rows[rows.length - 1]);
      } else {
        domConstruct.empty(this.traceGroupHolder);
      }
    },

    //Reset functions
    deleteConfigurationTable: function(table, holder) {
      if(table !== null) {
        domConstruct.empty(holder);
        table = null;
      }
      return true;
    },

    launchTraceGroup: function(param) {
      var tdata = this.userDefinedTraces.getSelectedRowData(param.tr);
      var group = null;
      var existTraceCheck = this.tempTraceConfigs["userTraces"];
      for (var key in existTraceCheck) {
        if (key === tdata.userDefinedName) {
          var obj = {};
          obj[key] = existTraceCheck[key];
          group = obj[key];
          //defaultVal = obj;
        }
      }
      //this._createTraceTypeTable({"predefined":defaultVal});
      //this._restoreTraceTypeRows({"predefined":defaultVal});

      domConstruct.empty(this.traceGroupHolder);
      this.traceGroupParameter = new traceGroup({
        un: this.un,
        dataElements: this.unDataElements,
        nls: this.nls,
        row: param.tr,
        existingValues: group
      }).placeAt(this.traceGroupHolder);
    },

    //*************************
    //**** START GLOBAL EVENT HANDLERS
    _wireEventHandlers: function() {
      this.own(on(this.userDefinedTraces, "row-select", lang.hitch(this, function(tr) {
        this.storeTempConfig();
        this.launchTraceGroup({tr:tr});
      })));

      this.own(on(this.userDefinedTraces, "row-down", lang.hitch(this, function(tr) {
        this.reorderTraceGroup();
        this.storeTempConfig();
      })));
      this.own(on(this.userDefinedTraces, "row-up", lang.hitch(this, function(tr) {
        this.reorderTraceGroup();
        this.storeTempConfig();
      })));

      this.own(on(this.userDefinedTraces, "row-delete", lang.hitch(this, function(tr, rowdata) {
        this.deleteUserGroup(tr, rowdata);
      })));
    },

    //**** END GLOBAL EVENT HANDLERS
    //*************************
    _checkURLLayersForUN: function() {
      return new Promise(lang.hitch(this, function (resolve, reject) {
        var distinctURLs = [];
        var layers = this.map.itemInfo.itemData.operationalLayers;
        layers.map(function(lyr) {
          if(lyr.hasOwnProperty("itemProperties")) {
            var cleanURL = lyr.url.substring(0, lyr.url.lastIndexOf("/"));
            if(distinctURLs.indexOf(cleanURL) <= -1) {
              distinctURLs.push(cleanURL);
            };
          }
        });
        if(distinctURLs.length > 0) {
          distinctURLs.map(lang.hitch(this, function(u) {
            this.requestData({method: 'POST', url: u, params: {f : "json", token: this.token}}).then(
              lang.hitch(this, function(result) {
                if(result.hasOwnProperty("controllerDatasetLayers")) {
                  this.unLayerId = result.controllerDatasetLayers.utilityNetworkLayerId;
                  this.unLayer = result;
                  this.unLayer.url = u;
                  resolve(true);
                }
              })
            );
          }));
        }
      }));
    },

    //Request dataElements
    requestDataElementsOld: function (url) {
      var returnDef = new Deferred();
      var deURL = url + "/queryDataElements";
      console.log(deURL);
      var layersRequest = esriRequest({
          url: deURL,
          content: {
            token: this.token,
            layers: 501,
            f: "json"
          },
          handleAs: "json",
          callbackParamName: "callback"
        }, {
          usePost: true
        });
        layersRequest.then(
          function(result) {
            returnDef.resolve(result);
          }, function(error) {
            returnDef.resolve(error);
        });
      return returnDef.promise;

    },

    requestData: function(opts) {
      return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open(opts.method, opts.url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onerror = function(e){reject(e)};
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
              let jsonRes = xhr.response;
              try {
                if (typeof jsonRes !== "object") {jsonRes = JSON.parse(xhr.response)};
              } catch(e) {
                resolve(jsonRes);
              }
              resolve(jsonRes);
          } else {
              reject({
              status: this.status,
              statusText: xhr.statusText
              });
          }
        };

        if (opts.headers)
        Object.keys(opts.headers).forEach(  key => xhr.setRequestHeader(key, opts.headers[key]) )
        let params = opts.params;
        // We'll need to stringify if we've been given an object
        // If we have a string, this is skipped.
        if (params && typeof params === 'object')
            params = Object.keys(params).map(key =>  encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
        xhr.send(params);
      });
    },

    groupNamePopup: function() {
      var dom = domConstruct.create("div");
      var userTextbox = new Textbox({
        placeHolder: "Give your group a name",
        value: "",
        style: {
          width: "100%",
          height: "26px"
        }
      });
      userTextbox.startup();

      var popup = new Popup({
        width: 350,
        height: 150,
        content: userTextbox,
        titleLabel: "Give your group a name",
        onClose: lang.hitch(this, function () {
          userTextbox.destroy();
        }),
        buttons: [{
          label: "OK",
          onClick: lang.hitch(this, function () {
            if(userTextbox.value !== "") {
              var valid = this.verifyUserNameInput(userTextbox.value);
              if(valid) {
                if(this.userDefinedTraces !== null) {
                  this.addRowUserDefined({"predefined":userTextbox.value});
                  //this._populateRunAmount({"predefined":null});
                  this.storeTempConfig();
                }
                popup.close();
              }
            } else {
              alert("Provide a name for this group");
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

    reorderTraceGroup: function(param) {
      console.log("here");
      var newState = {}
      var rows = this.userDefinedTraces.getRows();
      if (rows.length > 0) {
        rows.map(lang.hitch(this, function(row,i) {
          var td = this.userDefinedTraces.getRowData(row);
          if(this.tempTraceConfigs["userTraces"].hasOwnProperty(td.userDefinedName)) {
            newState[td.userDefinedName] = this.tempTraceConfigs.userTraces[td.userDefinedName];
          }
        }));
      }
      this.tempTraceConfigs["userTraces"] = newState;
    },

    //support functions
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
    },

    verifyUserNameInput: function(param) {
      var regex = /^[a-zA-Z ]*$/;
      if (regex.test(param)) {
          return true;
      } else {
          alert("Only Alphbet Characters and Spaces Only");
          return false;
      }
    }



  });
});