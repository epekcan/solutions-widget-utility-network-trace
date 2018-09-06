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
  'jimu/dijit/Popup',
  "dijit/form/TextBox",
  "dijit/form/Select"
],
function(declare, BaseWidgetSetting, _TemplatedMixin, on, domConstruct, query, lang, array, 
  agsPortal, PrivilegeUtil, UtilityNetwork, PortalHelper, traceParameters, tokenUtils, 
  SimpleTable, Popup, Textbox, Select) {
  return declare([BaseWidgetSetting, _TemplatedMixin], {
    baseClass: 'jimu-widget-untrace-setting',

    portal: null,
    portalHelper: null,
    token : null,
    un: null,
    domainValueListHelper: [],
    tempTraceConfigs: null,
    traceConfigParameter: null,
    barriersList: [],

    userDefinedTraces: null,
    traceTypesTable: null,
    conditionBarriersTable: null,

    postCreate: function(){
    
      this.portalHelper = PortalHelper;
      this.un = UtilityNetwork;
      this.token = this.generateToken();

      this.tempTraceConfigs = {
        "userTraces":{}
      };

      this.barriersList = [
        "conditionBarriers",
        "filterBarriers",
        "outputConditions"
      ];

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
      this.config.service = this.cmbItems.value;
      this.config.featureServiceItem = this.cmbItems.options[this.cmbItems.selectedIndex].id;
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
                this.cmbItems.appendChild(listItem);
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
              this.un.featureServiceUrl = this.cmbItems.options[this.cmbItems.selectedIndex].url;
              var event = new Event('change');
              this.cmbItems.dispatchEvent(event);
            }

            //this._createUserDefinedTraceTable();

          }));
        })); 
      })); 
    },

    listDomainNetworks: function(e) {
      //this.resetAll();
      this.un.featureServiceUrl = this.cmbItems.options[this.cmbItems.selectedIndex].url;
      this.un.load().then(lang.hitch(this, function() {
        console.log(this.un);
        //populate tiers, clear list first
        while (this.cmbDomainNetworks.firstChild) this.cmbDomainNetworks.removeChild(this.cmbDomainNetworks.firstChild);
        while (this.cmbTiers.firstChild) this.cmbTiers.removeChild(this.cmbTiers.firstChild);
        this.un.dataElement.domainNetworks.forEach(domainNetwork => {
            var dn = document.createElement("option");
            dn.textContent = domainNetwork.domainNetworkName;
            this.cmbDomainNetworks.appendChild(dn);
        })
        if (this.un.dataElement.domainNetworks.length > 1) {
            let event = new Event('change');
            this.cmbDomainNetworks.selectedIndex = 1;
            this.cmbDomainNetworks.dispatchEvent(event);
        } else {
            this.cmbDomainNetworks.selectedIndex = -1;
        }

        this.deleteConfigurationTable(this.userDefinedTraces, this.dynamicUserTraces);
        this.deleteConfigurationTable(this.traceTypesTable, this.traceTypesTableHolder);

        this._createUserDefinedTraceTable();

      }));         
    },

    listTiers: async function(e) {
      //this.resetAll();

      while (this.cmbTiers.firstChild) this.cmbTiers.removeChild(this.cmbTiers.firstChild);
      var selectedDomainNetwork = e.target.options[e.target.selectedIndex].textContent;

      var domainNetwork = this.un.getDomainNetwork(selectedDomainNetwork);

      await this.pullDomainValueList();

      domainNetwork.tiers.forEach(tier => {
          let tn = document.createElement("option");
          tn.textContent = tier.name;
          this.cmbTiers.appendChild(tn);
      });

      if (this.cmbTiers.options.length > 1) {
        let event = new Event('change');
        this.cmbTiers.selectedIndex = 0;
        this.cmbTiers.dispatchEvent(event);
      } else {
        this.cmbTiers.selectedIndex = -1;
      }
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

      var existTraceCheck = this.tempTraceConfigs["userTraces"];
      var newFlag = true;
      for (var key in existTraceCheck) {
        if (existTraceCheck.hasOwnProperty(key)) {
          var obj = {};
          obj[key] = existTraceCheck[key];
          this.addRowUserDefined({"predefined":obj});
          newFlag = false;
        }
      }      
      if(newFlag) {
        this.addRowUserDefined({"predefined":null});  
      }

      this.own(on(this.userDefinedTraces, "row-select", lang.hitch(this, function(tr) {
        var defaultVal = null;
        var existTraceCheck = this.tempTraceConfigs["userTraces"];
        for (var key in existTraceCheck) {
          if (key === tr.userDefinedName.value) {
            var obj = {};
            obj[key] = existTraceCheck[key];            
            defaultVal = obj;
          }
        }         
        this._restoreTraceTypeRows({"tr":tr, "predefined":defaultVal});
      })));

    },

    addRowUserDefined: function(param) {
      var addRowResult = this.userDefinedTraces.addRow({});
      this._addUserTextbox({"tr":addRowResult.tr, "predefined":param.predefined});
    
      this.userDefinedTraces.selectRow(addRowResult.tr); 
      this._createTraceTypeTable({"predefined":param.predefined});     
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
        if(this.traceConfigParameter !== null) {
          this.traceConfigParameter._createStartList({"value":val}); 
        }
        this.traceConfigParameter.storeTempConfig();
      })));
    },

    _addTraceBarrierSelection: function(param) {
      var td = query('.simple-table-cell', param.tr)[2];
      var noneOption = [{label: "None", value: ""}];
      var optionChoice = noneOption.concat(this.interactionList());
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
        if(this.traceConfigParameter !== null) {
          this.traceConfigParameter._createBarrierList({"value":val}); 
        }        
        this.traceConfigParameter.storeTempConfig();
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
      var userRowData = this.userDefinedTraces.getSelectedRow();
      var rows = this.traceTypesTable.getRows();
     
      var userGroupName = {"traces":[]};
      var selectedRowMatch = this.traceTypesTable.getSelectedRowData();

      array.forEach(rows, lang.hitch(this, function(tr) {
        var rowData = this.traceTypesTable.getRowData(tr);  

        var obj = {
          "type": tr.traceType.value,
          "traceID": rowData.rowID,
          "useAsStart": tr.useAsStart.value,
          "useAsBarrier": tr.useAsBarrier.value
        };        

        if(selectedRowMatch.rowID === rowData.rowID) {
          if(typeof(param) !== "undefined") {
            obj["traceConfig"] = param.traceConfig;
          }
        }
        
        userGroupName["traces"].push(obj);
      }));
      this.tempTraceConfigs.userTraces[userRowData.userDefinedName.value] = userGroupName;
      return userGroupName;
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
        {label: "User Defined", value: "userDefined"},
        {label: "A previous trace", value: "previousTrace"},
        {label: "Add to Existing results", value: "addToExistingResults"}
      ];
      return userActions;
    }



  });
});