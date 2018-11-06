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
  'jimu/dijit/Popup',
  "./PrivilegeUtil",
  "./utilitynetwork",
  "./portal",
  './traceGroup',
  "jimu/tokenUtils",
  'jimu/dijit/SimpleTable',
  "dijit/form/TextBox",
  "dijit/form/Select"
],
function(declare, BaseWidgetSetting, _TemplatedMixin, on, domConstruct, query, lang, array,
  agsPortal, Popup, PrivilegeUtil, UtilityNetwork, PortalHelper, traceGroup, tokenUtils,
  SimpleTable, Textbox, Select) {
  return declare([BaseWidgetSetting, _TemplatedMixin], {
    baseClass: 'jimu-widget-untrace-setting',

    portal: null,
    portalHelper: null,
    token : null,
    un: null,
    domainValueListHelper: [],
    tempTraceConfigs: null,
    traceGroupParameter: null,
    servicesTable: null,
    userDefinedTraces: null,
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

      this.own(on(this.addUserTraces, "click", lang.hitch(this, function() {
        this.groupNamePopup();
      })));

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
          //this.traceConfigParameter.storeTempConfig();
          this.config.service = this.cmbItems.value;
          this.config.domainNetwork = this.cmbDomainNetworks.value;
          this.config.tier = this.cmbTiers.value;
          this.config.subnetLineLayer = this.un.subnetLineLayerId;
          this.config.UNLayerId = this.un.layerId;
          this.config.FSurl = this.un.featureServiceUrl;

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

    portalConnect: async function() {

      var cred = new PrivilegeUtil(this.appConfig.portalUrl);
      await cred.loadPrivileges(this.appConfig.portalUrl).then(lang.hitch(this, function() {
        this.portal = new agsPortal.Portal(this.appConfig.portalUrl);
        on(this.portal, "load", lang.hitch(this, function() {
          var currUser = cred.getUser().username;
          var params = {
            token: this.token,
            q:'owner:' + currUser,
            num:100
          };
          var portalItemCount = 0;
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

    // Create the table to handle UN service, domain, and tier
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

    // Query the UN module for list of domains and populate list
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

      }));
    },

    // Query the UN based on domain to find the tiers.  Once tiers are loaded, load the rest of the config form
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

      this.own(on(this.cmbItems, "change", lang.hitch(this,this.listDomainNetworks)));
      this.own(on(this.cmbDomainNetworks, "change", lang.hitch(this,this.listTiers)));

      this.deleteConfigurationTable(this.userDefinedTraces, this.dynamicUserTraces);
      //this.deleteConfigurationTable(this.traceTypesTable, this.traceTypesTableHolder);

      if(Object.keys(this.tempTraceConfigs["userTraces"]).length > 0) {
        this._createUserDefinedTraceTable();
        this._restoreUserDefinedGroups();
        //this._checkGroupForTraces();
        this._wireEventHandlers();

        var rows = this.userDefinedTraces.getRows();
        if(rows.length > 0) {
          this.launchTraceGroup({tr:rows[rows.length-1]});
        }

      }


    },

    //*****************************************
    // ******* Start User Defined Group management functions
    _createUserDefinedTraceTable: function() {
      var fields = [{
        name: 'userDefinedName',
        title: "Trace Name",
        type: 'text',
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

    },

    addRowUserDefined: function(param) {
      var addRowResult = this.userDefinedTraces.addRow({
        userDefinedName: param.predefined
      });
      //this._addUserTextbox({"tr":addRowResult.tr, "predefined":param.predefined});
      this.userDefinedTraces.selectRow(addRowResult.tr);

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
      var newFlag = true;
      for (var key in existTraceCheck) {
        if (existTraceCheck.hasOwnProperty(key)) {
          var obj = {};
          obj[key] = existTraceCheck[key];
          this.addRowUserDefined({"predefined":key});
          this._populateRunAmount({"predefined":obj[key]});
          newFlag = false;
        }
      }
      if(newFlag) {
        this.addRowUserDefined({"predefined":null});
        this._populateRunAmount({"predefined":null});
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
      } else {
        this.runTraceAmount.set("value", selectionBox.value);
      }
    },

    storeTempConfig: function(param) {
      var userRowData = this.userDefinedTraces.getSelectedRowData();
      if(userRowData !== null) {
        if((this.tempTraceConfigs.userTraces).hasOwnProperty(userRowData.userDefinedName)) {
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName].runAmount = this.runTraceAmount.value;
        } else {
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName] = {"traces":[], "runAmount":null};
          this.tempTraceConfigs.userTraces[userRowData.userDefinedName].runAmount = this.runTraceAmount.value;
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
      this.storeTempConfig();
      var group = null;
      var defaultVal = null;
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
        domainValueListHelper: this.domainValueListHelper,
        cmbDomainNetworks: this.cmbDomainNetworks.value,
        nls: this.nls,
        row: param.tr,
        existingValues: group
      }).placeAt(this.traceGroupHolder);
    },

    //*************************
    //**** START GLOBAL EVENT HANDLERS
    _wireEventHandlers: function() {
      this.own(on(this.userDefinedTraces, "row-select", lang.hitch(this, function(tr) {
        this.launchTraceGroup({tr:tr});
      })));

      this.own(on(this.userDefinedTraces, "row-delete", lang.hitch(this, function(tr, rowdata) {
        this.deleteUserGroup(tr, rowdata);
      })));
    },

    //**** END GLOBAL EVENT HANDLERS
    //*************************

    //support functions
    groupNamePopup: function() {
      var dom = domConstruct.create("div");
      var userTextbox = new Textbox({
        placeHolder: "Give your trace a name",
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
            var valid = this.verifyUserNameInput(userTextbox.value);
            if(valid) {
              if(this.userDefinedTraces !== null) {
                this.addRowUserDefined({"predefined":userTextbox.value});
                this.storeTempConfig();
              } else {
                this._createUserDefinedTraceTable();
                this._populateRunAmount({"predefined":null});
                this._wireEventHandlers();
                this.addRowUserDefined({"predefined":userTextbox.value});
              }
              popup.close();
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