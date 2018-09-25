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
  "dojo/on",
  "dojo/dom-construct",
  "dojo/query",
  "dojo/_base/lang",
  "dojo/_base/array",
  "esri/arcgis/Portal",
  "./PrivilegeUtil",
  "./utilitynetwork",
  "./portal",
  './traceParameters',
  "jimu/tokenUtils",
  'jimu/dijit/SimpleTable',
  "dijit/form/TextBox",
  "dijit/form/Select"
],
function(declare, BaseWidgetSetting, _TemplatedMixin, on, domConstruct, query, lang, array,
  agsPortal, PrivilegeUtil, UtilityNetwork, PortalHelper, traceParameters, tokenUtils,
  SimpleTable, Textbox, Select) {
  return declare([BaseWidgetSetting, _TemplatedMixin], {
    baseClass: 'jimu-widget-untrace-setting',

    portal: null,
    portalHelper: null,
    token : null,
    un: null,
    domainValueListHelper: [],
    tempTraceConfigs: null,
    traceConfigParameter: null,

    servicesTable: null,
    userDefinedTraces: null,
    traceTypesTable: null,
    conditionBarriersTable: null,

    cmbItems: null,
    cmbDomainNetworks: null,
    cmbTiers: null,

    runTraceAmount: null,

    postCreate: function(){

      this.portalHelper = PortalHelper;
      this.un = UtilityNetwork;
      this.token = this.generateToken();

      this.tempTraceConfigs = {
        "userTraces":{}
      };

      this.createServiceTable();

      this.setConfig(this.config);
      this.portalConnect();

      //the config object is passed in
      this.own(on(this.cmbItems, "change", lang.hitch(this,this.listDomainNetworks)));
      this.own(on(this.cmbDomainNetworks, "change", lang.hitch(this,this.listTiers)));
      //this.own(on(this.cmbTiers, "change", lang.hitch(this,this.resetAll)));

      this.own(on(this.addUserTraces, "click", lang.hitch(this, function() {
        this.addRowUserDefined({"predefined":null});
      })));
      this.own(on(this.addTraceType, "click", lang.hitch(this, function() {
        this.addRowTraceType({"predefined":null});
      })));

    },

    setConfig: function(config){
      this.tempTraceConfigs["userTraces"] =  this.config["userTraces"];
    },

    getConfig: function(){
      //WAB will get config object through this method
      delete this.config.userTraces[""];
      this.traceConfigParameter.storeTempConfig();
      this.config.service = this.cmbItems.value;
      this.config.domainNetwork = this.cmbDomainNetworks.value;
      this.config.tier = this.cmbTiers.value;
      this.config.subnetLineLayer = this.un.subnetLineLayerId;
      this.config.UNLayerId = this.un.layerId;
      this.config.FSurl = this.un.featureServiceUrl;

      this.config["userTraces"] = this.tempTraceConfigs["userTraces"];

      return this.config;
    },

    generateToken: function() {
      var tokenTool = tokenUtils;
      tokenTool.portalUrl = this.appConfig.portalUrl;
      return tokenTool.getPortalCredential(this.appConfig.portalUrl).token;
    },

    createServiceTable: function() {
      var fields = [{
        name: 'service',
        title: "Service",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'domain',
        title: "Domains",
        type: 'empty',
        'class': 'editable'
      },{
        name: 'tier',
        title: "Tiers",
        type: 'empty',
        'class': 'editable'
      }];
      var args = {
        fields: fields
      };
      this.servicesTable = new SimpleTable(args);
      this.servicesTable.placeAt(this.UNConfig);
      this.servicesTable.startup();
      this.servicesTable.addRow({});
      var rows = this.servicesTable.getRows()[0];
      var slService = new Select();
      this.cmbItems = slService;
      slService.placeAt(rows.children[0]);
      var slDomain = new Select();
      this.cmbDomainNetworks = slDomain;
      slDomain.placeAt(rows.children[1]);
      var slTiers = new Select();
      this.cmbTiers = slTiers;
      slTiers.placeAt(rows.children[2]);
    },

    portalConnect: async function() {

      var cred = new PrivilegeUtil(this.appConfig.portalUrl);
      await cred.loadPrivileges(this.appConfig.portalUrl).then(lang.hitch(this, function() {
        this.portal = new agsPortal.Portal(this.appConfig.portalUrl);
        on(this.portal, "load", lang.hitch(this, function() {
          var currUser = cred.getUser().username;
          var params = {
            q:'owner:' + currUser,
            num:100
          };
          this.portal.queryItems(params).then(lang.hitch(this, function(results){
            array.forEach(results.results, lang.hitch(this, function(a) {
              if (a.type === "Feature Service") {
                var listItem = document.createElement("option");
                listItem.textContent = a.title;
                listItem.url = a.url;
                listItem.value = a.title;
                listItem.id = a.id;
                if(this.config.service !== null) {
                  if(this.config.service === a.title) {
                    listItem.setAttribute("selected", "selected");
                  }
                }
                this.cmbItems.addOption(listItem);
              }
            }));
            if(this.config.service !== null) {
              this.cmbItems.setAttribute("value", this.config.service);
            }

            if (this.cmbItems.options.length === 0) {
              this.cmbItems.selectedIndex = -1;
            } else {
              this.un = UtilityNetwork;
              this.un.token = this.token;
              var fsUrl = "";
              array.forEach(this.cmbItems.options, function(ops) {
                if(ops.defaultSelected) {
                  fsUrl = ops.url;
                }
              });
              this.un.featureServiceUrl = fsUrl;
              //this.cmbItems.emit("change", this.cmbItems);
              this.listDomainNetworks(this.cmbItems.value);
            }

            //this._createUserDefinedTraceTable();

          }));
        }));
      }));
    },

    listDomainNetworks: function(e) {
      //this.resetAll();
      var fsUrl = "";
      array.forEach(this.cmbItems.options, function(ops) {
        if(ops.value === e) {
          fsUrl = ops.url;
        }
      });
      this.un.featureServiceUrl = fsUrl;
      this.un.load().then(lang.hitch(this, function() {
        console.log(this.un);
        //populate tiers, clear list first
        while (this.cmbDomainNetworks.options.length > 0) this.cmbDomainNetworks.removeOption(this.cmbDomainNetworks.getOptions());
        while (this.cmbTiers.options.length > 0) this.cmbTiers.removeOption(this.cmbTiers.getOptions());
        this.un.dataElement.domainNetworks.forEach(domainNetwork => {
          if(domainNetwork.domainNetworkName !== "Structure") {
            var dn = document.createElement("option");
            dn.textContent = domainNetwork.domainNetworkName;
            this.cmbDomainNetworks.addOption(dn);
          }
        });
        if(this.config.domainNetwork !== null) {
          this.cmbDomainNetworks.setAttribute("value", this.config.domainNetwork);
        }
        if (this.un.dataElement.domainNetworks.length > 1) {
            this.cmbDomainNetworks.selectedIndex = 1;
            //this.cmbDomainNetworks.emit("change", this.cmbDomainNetworks);
            this.listTiers(this.cmbDomainNetworks.value);
        } else {
            this.cmbDomainNetworks.selectedIndex = -1;
        }

        //this.deleteConfigurationTable(this.userDefinedTraces, this.dynamicUserTraces);
        //this.deleteConfigurationTable(this.traceTypesTable, this.traceTypesTableHolder);

        //this._createUserDefinedTraceTable();

      }));
    },

    listTiers: async function(e) {
      //this.resetAll();
      while (this.cmbTiers.options.length > 0) this.cmbTiers.removeOption(this.cmbTiers.getOptions());
     // var selectedDomainNetwork = e.target.options[e.target.selectedIndex].textContent;

      var domainNetwork = this.un.getDomainNetwork(e);

      await this.pullDomainValueList();

      domainNetwork.tiers.forEach(tier => {
          let tn = document.createElement("option");
          tn.textContent = tier.name;
          this.cmbTiers.addOption(tn);
      });
      if(this.config.tier !== null) {
        this.cmbTiers.setAttribute("value", this.config.tier);
      }

      if (this.cmbTiers.options.length > 1) {
        let event = new Event('change');
        this.cmbTiers.selectedIndex = 0;
        //this.cmbTiers.dispatchEvent(event);
        this.cmbTiers.emit("change", this.cmbTiers.selectIndex);
      } else {
        this.cmbTiers.selectedIndex = -1;
      }

      this.deleteConfigurationTable(this.userDefinedTraces, this.dynamicUserTraces);
      this.deleteConfigurationTable(this.traceTypesTable, this.traceTypesTableHolder);

      this._createUserDefinedTraceTable();

    },

    _createUserDefinedTraceTable: function() {
      var fields = [{
        name: 'userDefinedName',
        title: "Trace Name",
        type: 'empty',
        width: '80%',
        'class': 'editable'
      },
      {
        name: 'actions',
        title: "Actions",
        type: 'actions',
        'class': 'actions',
        actions: ['up','down','delete']//'up','down',
      }];
      var args = {
        fields: fields,
        selectable: true
      };
      this.userDefinedTraces = new SimpleTable(args);
      this.userDefinedTraces.placeAt(this.dynamicUserTraces);
      this.userDefinedTraces.startup();

      this.own(on(this.userDefinedTraces, "row-select", lang.hitch(this, function(tr) {
        var defaultVal = null;
        var group = null;
        var existTraceCheck = this.tempTraceConfigs["userTraces"];
        for (var key in existTraceCheck) {
          if (key === tr.userDefinedName.value) {
            var obj = {};
            obj[key] = existTraceCheck[key];
            defaultVal = obj;
            group = obj[key];
          }
        }
        this._createTraceTypeTable({"predefined":defaultVal});
        this._restoreTraceTypeRows({"tr":tr, "predefined":defaultVal});
        this._populateRunAmount({"predefined":group});
      })));

      this.own(on(this.userDefinedTraces, "row-delete", lang.hitch(this, function(tr) {
        this.deleteUserGroup(tr);
      })));

      var existTraceCheck = this.tempTraceConfigs["userTraces"];
      var newFlag = true;
      for (var key in existTraceCheck) {
        if (existTraceCheck.hasOwnProperty(key)) {
          var obj = {};
          obj[key] = existTraceCheck[key];
          this.addRowUserDefined({"predefined":obj});
          this._populateRunAmount({"predefined":obj[key]});
          newFlag = false;
        }
      }
      if(newFlag) {
        this.addRowUserDefined({"predefined":null});
        this._populateRunAmount({"predefined":null});
      }


    },

    addRowUserDefined: function(param) {
      var addRowResult = this.userDefinedTraces.addRow({});
      this._addUserTextbox({"tr":addRowResult.tr, "predefined":param.predefined});
      this.userDefinedTraces.selectRow(addRowResult.tr);

      return addRowResult;
    },

    _addUserTextbox: function(param) {
      var defaultText = "";
      if(param.predefined !== null) {
        for (var key in param.predefined) {
          defaultText = key;
        }
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

    _createTraceTypeTable: function(param) {
      if(this.traceTypesTable !== null) {
        domConstruct.empty(this.traceTypesTableHolder);
        this.traceTypesTable = null;
      }
      var fields = [{
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
        actions: ['up','down','delete']//'up','down',
      }];
      var args = {
        fields: fields,
        selectable: true
      };
      this.traceTypesTable = new SimpleTable(args);
      this.traceTypesTable.placeAt(this.traceTypesTableHolder);
      this.traceTypesTable.startup();

      this.own(on(this.traceTypesTable, "row-select", lang.hitch(this, function(tr) {
        var existingData = null;
        var rowData = this.userDefinedTraces.getSelectedRow();
        for (var key in this.tempTraceConfigs.userTraces) {
          if(rowData.userDefinedName.value === key) {
            var arrTraces = this.tempTraceConfigs.userTraces[key].traces;
            array.forEach(arrTraces, lang.hitch(this, function(trace) {
              if(trace.type === tr.traceType.value) {
                existingData = trace;
              }
            }));
          }
        }
        this.launchTraceParameters({"tr":tr, "predefined":existingData});
      })));

      if(param.predefined !== null) {
        for (var key in param.predefined) {
          var arrTraces = param.predefined[key].traces;
          array.forEach(arrTraces, lang.hitch(this, function(trace) {
            this.addRowTraceType({"predefined":trace});
          }));
        }
      } else {
        this.addRowTraceType({"predefined":param.predefined});
      }

    },

    addRowTraceType: function(param) {
      var rowUnique = new Date();
      var defaultID = rowUnique.getTime();
      var defaultUseAsStart = false;
      var defaultUseAsBarrier = false;
      var defaultUseFeature = null;

      if(param.predefined !== null) {
        defaultID = param.predefined.traceID;
        defaultUseAsStart = param.predefined.useAsStart;
        defaultUseAsBarrier = param.predefined.useAsBarrier;
        defaultUseFeature = param.predefined.layerToUseAs;
      }

      var addRowResult = this.traceTypesTable.addRow({
        "rowID": defaultID,
        "useAsStart": defaultUseAsStart,
        "useAsBarrier": defaultUseAsBarrier
      });

      var deleteBtn = query(".jimu-icon-delete", addRowResult.tr);
      if(deleteBtn.length > 0) {
        this.own(on(deleteBtn[0], "click", lang.hitch(this, function() {
          this.deleteTraceType();
        })));
      }

      this._addTraceTypeSelection({"tr":addRowResult.tr, "predefined":param.predefined});
      this._addTraceStartSelection({"tr":addRowResult.tr, "predefined":param.predefined});
      this._addTraceBarrierSelection({"tr":addRowResult.tr, "predefined":param.predefined});
      this.traceTypesTable.selectRow(addRowResult.tr);
      return addRowResult;
    },

    _addTraceTypeSelection: function(param) {
      var td = query('.simple-table-cell', param.tr)[0];
      var selectionBox = new Select({
        options: [
            { label: "Connected", value: "connected" },
            { label: "Downstream", value: "downstream" },
            { label: "Subnetwork", value: "subnetwork" },
            { label: "Upstream", value: "upstream" }
        ]
      });
      selectionBox.placeAt(td);
      selectionBox.startup();
      param.tr.traceType = selectionBox;

      if(param.predefined !== null) {
        selectionBox.set("value", param.predefined.type);
        param.tr.traceType.value = param.predefined.type;
      }

      this.own(on(selectionBox, "change", lang.hitch(this, function(val) {
        this.traceTypesTable.selectRow(param.tr);
        this.traceConfigParameter.storeTempConfig();
      })));

    },

    _addTraceStartSelection: function(param) {
      var td = query('.simple-table-cell', param.tr)[1];
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
        if(this.traceConfigParameter !== null) {
          this.traceConfigParameter._createStartList({"value":val});
        }
        this.traceConfigParameter.storeTempConfig();

      })));
    },

    _addTraceBarrierSelection: function(param) {
      var td = query('.simple-table-cell', param.tr)[2];
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
        if(this.traceConfigParameter !== null) {
          this.traceConfigParameter._createBarrierList({"value":val});
        }
        this.traceConfigParameter.storeTempConfig();
       //this.launchTraceParameters({"tr":param.tr, "predefined":param.predefined});
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

    _populateRunAmount: function(param) {
      domConstruct.empty(this.runTraceAmountHolder);
      this.runTraceAmount = null;
      var optionChoice = this.runOptions();
      var selectionBox = new Select({
        options: optionChoice
      });
      selectionBox.placeAt(this.runTraceAmountHolder);
      selectionBox.startup();
      this.runTraceAmount = selectionBox;
      if(param.predefined !== null) {
        this.runTraceAmount.set("value", param.predefined.runAmount);
      }
    },

    storeTempConfig: function(param) {
      var userRowData = this.userDefinedTraces.getSelectedRow();
      var row = this.traceTypesTable.getSelectedRow();
      if(row !== null) {
        var userGroupName = {"traces":[]};
        var selectedRowMatch = this.traceTypesTable.getSelectedRowData();
        var match = false;
        if((this.tempTraceConfigs.userTraces).hasOwnProperty(userRowData.userDefinedName.value)) {
          array.forEach(this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].traces, lang.hitch(this, function(trace) {
            //var rowData = this.traceTypesTable.getRowData(tr);
            if(selectedRowMatch.rowID === trace.traceID) {
                trace["type"] = row.traceType.value;
                trace["traceID"] = selectedRowMatch.rowID;
                trace["useAsStart"] = row.useAsStart.value;
                trace["useAsBarrier"] = row.useAsBarrier.value;
                if(typeof(param) !== "undefined") {
                  trace["traceConfig"] = param.traceConfig;
                }
                this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].runAmount = this.runTraceAmount.value;
                match = true;
            }
          }));
          if(!match) {
            var obj = {
              "type": row.traceType.value,
              "traceID": selectedRowMatch.rowID,
              "useAsStart": row.useAsStart.value,
              "useAsBarrier": row.useAsBarrier.value
            };
            if(typeof(param) !== "undefined") {
              obj["traceConfig"] = param.traceConfig;
            }
            this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].traces.push(obj);
            this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].runAmount = this.runTraceAmount.value;
          }
        } else {
          var obj = {
            "type": row.traceType.value,
            "traceID": selectedRowMatch.rowID,
            "useAsStart": row.useAsStart.value,
            "useAsBarrier": row.useAsBarrier.value
          };
          if(typeof(param) !== "undefined") {
            obj["traceConfig"] = param.traceConfig;
          }
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value] = {"traces":[], "runAmount":null};
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].traces.push(obj);
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].runAmount = this.runTraceAmount.value;
        }
        return userGroupName;
      }
    },

    launchTraceParameters: function(param) {
      domConstruct.empty(this.traceConfigHolder);
      this.traceConfigParameter = null;
      this.traceConfigParameter = new traceParameters({
        un: this.un,
        domainValueListHelper: this.domainValueListHelper,
        cmbDomainNetworks: this.cmbDomainNetworks,
        nls: this.nls,
        row: param.tr,
        existingValues: param.predefined
      }).placeAt(this.traceConfigHolder);
      this.own(on(this.traceConfigParameter, "config-change", lang.hitch(this,function(results){
        this.storeTempConfig({"traceConfig": results});
      })));

    },

    deleteUserGroup: function(param) {
      if(this.tempTraceConfigs.userTraces.hasOwnProperty(param.userDefinedName.value)) {
        delete this.tempTraceConfigs.userTraces[param.userDefinedName.value];
      }
      var rows = this.userDefinedTraces.getRows();
      if (rows.length > 0) {
        this.userDefinedTraces.selectRow(rows[rows.length - 1]);
      }
    },

    deleteTraceType: function(tr, data) {
      var userRowData = this.userDefinedTraces.getSelectedRow();
      var rows = this.traceTypesTable.getRows();
      var spliceValue = -1;
      var found = false;
      if(userRowData) {
          var counter = 0;
          array.forEach(this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].traces, lang.hitch(this, function(trace) {
            if(typeof(trace) !== "undefined") {
              array.some(rows, lang.hitch(this, function(row) {
                var rowData = this.traceTypesTable.getRowData(row);
                if(trace.traceID === rowData.rowID) {
                  found = true;
                  //(this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].traces).splice(counter, 1);
                }
              }));
            }
            if(!found) {
              (this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value].traces).splice(counter, 1);
            }
            found = false;
            counter++;
          }));
      }

      if(rows.length > 0) {
        this.traceTypesTable.selectRow(rows[rows.length-1]);
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

    //support functions
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



  });
});