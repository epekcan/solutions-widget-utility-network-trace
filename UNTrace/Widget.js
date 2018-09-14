define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./Widget.html',
  'dojo/dom',
  'dojo/on',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/registry',
  'dojo/dom-attr',
  'dojo/dom-style',
  'dojo/dom-construct',
  'dojo/query',
  'esri/geometry/geometryEngineAsync',
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/MapImageLayer",
  "esri/WebMap",
  "esri/identity/IdentityManager",
  "esri/widgets/LayerList",
  "esri/layers/MapImageLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/tasks/ImageServiceIdentifyTask",
  "esri/tasks/support/ImageServiceIdentifyParameters",
  "esri/tasks/IdentifyTask",
  "esri/tasks/support/IdentifyParameters",
  "esri/tasks/support/Query",
  "esri/geometry/projection",
  "esri/geometry/SpatialReference",
  'jimu/tokenUtils',
  "./portal",
  "./utilitynetwork",
  'dojo/text!./config.json',
  'dijit/form/TextBox',
  'dijit/form/Select'
],
function(declare,
    _WidgetBase,
    _TemplatedMixin,
    template,
  dom,
  on,
  lang,
  array,
  registry,
  domAttr,
  domStyle,
  domConstruct,
  domQuery,
  geometryEngineAsync,
  Map,
  MapView,
  FeatureLayer,
  MapLayer,
  WebMap,
  IdentityManager,
  Toc,
  MapImageLayer,
  GraphicsLayer,
  Graphic,
  ImageServiceIdentifyTask,
  ImageServiceIdentifyParameters,
  IdentifyTask,
  IdentifyParameters,
  Query,
  projection,
  SpatialReference,
  tokenUtils,
  Portal,
  UtilityNetwork,
  Configuration
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([_WidgetBase, _TemplatedMixin],{
    //Please note that the widget depends on the 4.0 API
    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,
    baseClass: 'jimu-widget-untrace',

    highlight: null,
    portal: null,
    mapView: null,
    GraphicClass: null,
    handles: [],
    un: null,
    gl: null,
    activeTraceLocation: null,
    traceLocations: null,
    handleStartPoints: null,
    handleBarriers: null,
    mouseHandler: null,
    traceCounter: 0,
    traceMax: 0,
    token: null,
    traceLocationsParam: [],
    tempRecordSet: null,
    //config: JSON.parse(Configuration),

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
      this.mapView = this.sceneView;

      this.portal = Portal;
      this.un = UtilityNetwork;
      this.token = this.generateToken();

      this.createCustomTraceButtons();
    },

    startup: function() {
      this.inherited(arguments);
      console.log('startup');
      this.connect();

      this.own(on(this.optTools, "click", lang.hitch(this, function() {
        this.switchPanels("tools");
      })));

      this.own(on(this.optSettings, "click", lang.hitch(this, function() {
        this.switchPanels("settings");
      })));

      this.own(on(this.btnStartingPoint, "click", lang.hitch(this, this.btnStartingPointClick)));

      this.own(on(this.btnBarriers, "click", lang.hitch(this, this.btnBarriersClick)));

      //this.own(on(this.btnFindIslands, "click", lang.hitch(this, this.IslandTrace)));

      //this.own(on(this.btnTraceIsolation, "click", lang.hitch(this, this.IsolationTrace)));

      this.own(on(this.btnClearTraceLocations, "click", lang.hitch(this, function(e) {
        if(this.mouseHandler !== null) {
            this.mouseHandler.remove();
        }
        this.activeTraceLocation = undefined;
        if(traceLocations !== null) {
            while (traceLocations.firstChild) traceLocations.removeChild(traceLocations.firstChild);
        }
        domAttr.set(this.btnStartingPoint, "class", "button_nonactive");
        domAttr.set(this.btnBarriers, "class", "button_nonactive");
        this.mapView.graphics = [];
        this.gl.graphics = [];
        this.updateStatus("");
      })));

      this.own(on(this.btnConnect, "click", lang.hitch(this, function(e) {
        this.connect();
      })));

      this.own(on(this.cmbItems, "change", lang.hitch(this,this.cmbItemsChange)));

    },

    createCustomTraceButtons: function() {
        //if(this.config.userTraces !== null) {
            for (var key in this.config.userTraces) {
                let container = domConstruct.create("div",{'class':'rowBtn'},this.customTracesHolder);
                let userTrace = domConstruct.create("div",{'class':'button_nonactive', 'innerHTML': key, 'count':this.config.userTraces[key].traces.length},container);

                this.own(on(userTrace, "click", lang.hitch(this, function() {
                    this.traceCounter = 0;
                    this.traceMax = parseInt(domAttr.get(userTrace,'count'));
                    this.traceLocationsParam = [];
                    this.determineTracesToRun({'groupName':domAttr.get(userTrace,'innerHTML')});
                })));
            }
        //}
    },


    connect: function() {
        //let portalUrl = "http://arcgisutilitysolutionsdemo.esri.com/portal";
        //let username = "admin";
        //let password = "esri.agp";
      //clear the list of services.
      while (this.cmbItems.firstChild) this.cmbItems.removeChild(this.cmbItems.firstChild);
      this.portal = Portal;
      this.portal.url = this.portalUrl.value;
      this.portal.username = this.username.value;
      this.portal.password = this.password.value;
      this.portal.connect().then(lang.hitch(this, function(token) {
          //populate domain networks, clear list first
          while (this.cmbDomainNetworks.firstChild) this.cmbDomainNetworks.removeChild(this.cmbDomainNetworks.firstChild);
          while (this.cmbTiers.firstChild) this.cmbTiers.removeChild(this.cmbTiers.firstChild);
          while (this.cmbSubnetworks.firstChild) this.cmbSubnetworks.removeChild(this.cmbSubnetworks.firstChild);
          this.portal.items().then(myItems => {
              myItems.forEach(a => {
                      if (a.type === "Web Map") {
                          let listItem = document.createElement("option");
                          listItem.textContent = a.title;
                          listItem.url = a.url;
                          listItem.id = a.id;
                          this.cmbItems.appendChild(listItem);
                      }
                  }
              )
              if (this.cmbItems.options.length === 0) {
                this.updateStatus("No web maps found for user  " + username);
                this.cmbItems.selectedIndex = -1;
              } else {
                  let event = new Event('change');
                  this.cmbItems.selectedIndex = 4;
                  this.cmbItems.dispatchEvent(event);
              }
          })


      })).catch(rejected => this.updateStatus("Unable to connect to portal. " + rejected));
    },

    updateStatus: function(params) {
      dom.byId("lblStatus").textContent = params;
    },

    getTraceLocationsParam: function() {
      let traceLocationsParam = [];
      traceLocations.childNodes.forEach(li => {
          let startLocation = {};
          startLocation.globalId = li.globalId;
          startLocation.layerId = li.layerId;
          startLocation.assetGroupCode = li.assetGroupCode;
          startLocation.assetTypeCode = li.assetTypeCode;
          if (li.isTerminalConfigurationSupported == true) {
              let cmbTerminalConfig = document.getElementById("cmbTerminalConfig" + li.locationId);
              startLocation.terminalId = cmbTerminalConfig.options[cmbTerminalConfig.selectedIndex].value;
          }
          startLocation.traceLocationType = li.traceLocationType;
          traceLocationsParam.push(startLocation);
      });

      return traceLocationsParam;
    },

    mapClick: function(event) {
        event.stopPropagation();

        let color = this.activeTraceLocation === this.config.TRACELOCATION_START ? this.config.TRACING_STARTPOINT_COLOR : this.config.TRACING_BARRIER_COLOR;

        this.un.traceControls.forEach(tc => {

        const fl = new FeatureLayer({
            url: this.un.featureServiceUrl + "/" + tc
        });

        const query = new Query();
        query.outSpatialReference = { wkid: 102100 };
        query.returnGeometry = true;
        query.outFields = [ "*" ];
        query.distance = 2;
        query.geometry = event.mapPoint;
        fl.queryFeatures(query).then(lang.hitch(this, function(hitResults){
            console.log(hitResults.features);  // prints the array of features to the console

            let supportedClasses = ["esriUNFCUTDevice", "esriUNFCUTJunction"] //, "esriUNFCUTLine" ]
            if (hitResults.features.length) {
                hitResults.features.forEach(g => {

                    let img = document.createElement("img");

                    if (this.activeTraceLocation === this.config.TRACELOCATION_START)
                        img.src = this.folderUrl + "/images/startPoint.png"
                    else
                        img.src = this.folderUrl + "/images/barrier.png";
                    let rowTraceLocation = document.createElement("tr");
                    let columnImg = document.createElement("td");
                    rowTraceLocation.appendChild(columnImg);
                    columnImg.appendChild(img);
                    let columnElement = document.createElement("td");
                    // let columntraceLocationType = document.createElement("td");
                    let columnTerminal = document.createElement("td");
                    columnTerminal.className = "col120";
                    //rowTraceLocation.appendChild(img)
                    rowTraceLocation.appendChild(columnElement);
                    //   rowTraceLocation.appendChild(columntraceLocationType);
                    rowTraceLocation.appendChild(columnTerminal);
                    let columnBtn = document.createElement("td");
                    rowTraceLocation.appendChild(columnBtn);
                    let deleteTraceLocation = document.createElement("button");
                    deleteTraceLocation.textContent = "X";
                    deleteTraceLocation.className = "btnX";
                    deleteTraceLocation.addEventListener("click", lang.hitch(this, function(e){
                        traceLocations.removeChild(rowTraceLocation);
                        //try to remove the graphic
                        for (let i = 0; i < this.gl.graphics.items.length; i++) {
                            let g = this.gl.graphics.items[i];
                            if (g.name === rowTraceLocation.globalId) {
                                this.gl.remove(g);
                                break;
                            }

                        }


                    }));
                    columnBtn.appendChild(deleteTraceLocation);
                    let at = this.un.getAssetType(tc, this.getVal(g.attributes, "assetgroup"), this.getVal(g.attributes, "assettype"));

                    //if it is not a device or a junction or a line exit..
                    if (!supportedClasses.find(c => c == at.utilityNetworkFeatureClassUsageType)) return;
                    this.config.locationId++;
                    rowTraceLocation.globalId = this.getVal(g.attributes, "globalid");
                    rowTraceLocation.locationId = this.config.locationId;
                    rowTraceLocation.isTerminalConfigurationSupported = at.isTerminalConfigurationSupported;
                    rowTraceLocation.layerId = tc;
                    rowTraceLocation.assetGroupCode = this.getVal(g.attributes, "assetgroup");
                    rowTraceLocation.assetTypeCode = this.getVal(g.attributes, "assettype");
                    columnElement.textContent = " (" + at.assetGroupName + "/" + at.assetTypeName + ") "
                    // columntraceLocationType.textContent = activeTraceLocation;
                    //if termianls supported show it
                    if (at.isTerminalConfigurationSupported == true) {
                        let terminalList = document.createElement("select");
                        terminalList.className = "mini";
                        terminalList.id = "cmbTerminalConfig" + this.config.locationId;
                        let terminalConfiguration = this.un.getTerminalConfiguration(at.terminalConfigurationId);
                        terminalConfiguration.terminals.forEach(t => {
                            let terminalItem = document.createElement("option");
                            terminalItem.textContent = t.terminalName;
                            terminalItem.value = t.terminalId;
                            terminalList.appendChild(terminalItem);
                        })
                        columnTerminal.appendChild(terminalList);
                    }

                    rowTraceLocation.traceLocationType = this.activeTraceLocation;
                    traceLocations.appendChild(rowTraceLocation);

                    //create graphic on the map
                    let bufferedGeo =  geometryEngineAsync.buffer(g.geometry, this.config.TRACING_STARTLOCATION_BUFFER)
                        .then(lang.hitch(this, function(geom){
                            this.gl.graphics.add(this.getGraphic("polygon", geom, color, rowTraceLocation.globalId));
                        }));
                })



            }

        }));


        //this.mapServiceHandler({"mapServiceURL":this.mapView.map.itemInfo.itemData.operationalLayers});
        /*
        this.mapView.hitTest({ x: event.x, y: event.y }).then(lang.hitch(this,function(hitResults) {
            //console.log(hitResults);

            let supportedClasses = ["esriUNFCUTDevice", "esriUNFCUTJunction", "esriUNFCUTLine"] //, "esriUNFCUTLine" ]
            if (hitResults.results.length) {
                hitResults.results.forEach(g => {

                    let img = document.createElement("img");

                    if (this.activeTraceLocation === this.config.TRACELOCATION_START)
                        img.src = this.folderUrl + "/images/startPoint.png"
                    else
                        img.src = this.folderUrl + "/images/barrier.png";
                    let rowTraceLocation = document.createElement("tr");
                    let columnImg = document.createElement("td");
                    rowTraceLocation.appendChild(columnImg);
                    columnImg.appendChild(img);
                    let columnElement = document.createElement("td");
                    // let columntraceLocationType = document.createElement("td");
                    let columnTerminal = document.createElement("td");
                    columnTerminal.className = "col120";
                    //rowTraceLocation.appendChild(img)
                    rowTraceLocation.appendChild(columnElement);
                    //   rowTraceLocation.appendChild(columntraceLocationType);
                    rowTraceLocation.appendChild(columnTerminal);
                    let columnBtn = document.createElement("td");
                    rowTraceLocation.appendChild(columnBtn);
                    let deleteTraceLocation = document.createElement("button");
                    deleteTraceLocation.textContent = "X";
                    deleteTraceLocation.className = "btnX";
                    deleteTraceLocation.addEventListener("click", lang.hitch(this, function(e){
                        traceLocations.removeChild(rowTraceLocation);
                        //try to remove the graphic
                        for (let i = 0; i < this.gl.graphics.items.length; i++) {
                            let g = this.gl.graphics.items[i];
                            if (g.name === rowTraceLocation.globalId) {
                                this.gl.remove(g);
                                break;
                            }

                        }


                    }));
                    columnBtn.appendChild(deleteTraceLocation);

                    let at = this.un.getAssetType(g.graphic.layer.layerId, this.getVal(g.graphic.attributes, "assetgroup"), this.getVal(g.graphic.attributes, "assettype"));
                    //if it is not a device or a junction or a line exit..
                    if (!supportedClasses.find(c => c == at.utilityNetworkFeatureClassUsageType)) return;
                    this.config.locationId++;
                    rowTraceLocation.globalId = this.getVal(g.graphic.attributes, "globalid");
                    rowTraceLocation.locationId = this.config.locationId;
                    rowTraceLocation.isTerminalConfigurationSupported = at.isTerminalConfigurationSupported;
                    rowTraceLocation.layerId = g.graphic.layer.layerId;
                    rowTraceLocation.assetGroupCode = this.getVal(g.graphic.attributes, "assetgroup");
                    rowTraceLocation.assetTypeCode = this.getVal(g.graphic.attributes, "assettype");
                    columnElement.textContent = " (" + at.assetGroupName + "/" + at.assetTypeName + ") "
                    // columntraceLocationType.textContent = activeTraceLocation;
                    //if termianls supported show it
                    if (at.isTerminalConfigurationSupported == true) {
                        let terminalList = document.createElement("select");
                        terminalList.className = "mini";
                        terminalList.id = "cmbTerminalConfig" + this.config.locationId;
                        let terminalConfiguration = this.un.getTerminalConfiguration(at.terminalConfigurationId);
                        terminalConfiguration.terminals.forEach(t => {
                            let terminalItem = document.createElement("option");
                            terminalItem.textContent = t.terminalName;
                            terminalItem.value = t.terminalId;
                            terminalList.appendChild(terminalItem);
                        })
                        columnTerminal.appendChild(terminalList);
                    }

                    rowTraceLocation.traceLocationType = this.activeTraceLocation;
                    traceLocations.appendChild(rowTraceLocation);

                    //create graphic on the map
                    let bufferedGeo =  geometryEngineAsync.buffer(g.graphic.geometry, this.config.TRACING_STARTLOCATION_BUFFER)
                        .then(lang.hitch(this, function(geom){
                            this.gl.graphics.add(this.getGraphic("polygon", geom, color, rowTraceLocation.globalId));
                        }));
                })



            }

        }));
        */
        });

    },

    btnBarriersClick: function(params) {
        domAttr.set(this.btnStartingPoint, "class", "button_nonactive");
        domAttr.set(this.btnBarriers, "class", "button_active");
      if (this.activeTraceLocation == undefined) {
        this.mouseHandler = this.mapView.on("click", lang.hitch(this,this.mapClick));
      }
      this.activeTraceLocation = this.config.TRACELOCATION_BARRIER;
    },

    btnStartingPointClick: function(params) {
      domAttr.set(this.btnStartingPoint, "class", "button_active");
      domAttr.set(this.btnBarriers, "class", "button_nonactive");
      if (this.activeTraceLocation == undefined) {
        this.mouseHandler = this.mapView.on("click", lang.hitch(this, this.mapClick));
      }
      this.activeTraceLocation = this.config.TRACELOCATION_START;
    },

    determineTracesToRun: function(param) {
        for (var key in this.config.userTraces) {
            if(key === param.groupName) {
                var arrTraces = this.config.userTraces[key].traces;
                this._traceToRun({'traceInfo':arrTraces[this.traceCounter]}).then(lang.hitch(this, function() {
                  console.log("run" + this.traceCounter);
                  this.traceCounter++;
                  if(this.traceCounter < this.traceMax) {
                      this.determineTracesToRun(param);
                  }
              }));
            }
        }
    },

    _traceToRun: async function(param) {
      return new Promise( (resolve, reject) => {
          this.updateStatus("Tracing...");
          if(param.traceInfo.useAsStart !== "userDefined" || param.traceInfo.useAsBarrier !== "userDefined") {
              this.updateLocationsFromResults({"traceInfo":param.traceInfo, "featuresJson":this.tempRecordSet});
          } else {
              if(this.traceLocationsParam.length <= 0) {
                  this.traceLocationsParam = this.getTraceLocationsParam();
              }
          }

          let configuration = this.replaceSpecificTraceConfig(param);

          //only attempt to trace when there is at leats one starting point
          if (!this.traceLocationsParam.length) {
              this.updateStatus("No starting points were found.");
              return;
          }
          //var traceObj = this.un;
          switch(param.traceInfo.type) {
            case 'connected':
              var traceObj = this.un.connectedTrace(this.traceLocationsParam, configuration);
              break;
            case 'upstream':
              var traceObj = this.un.upstreamTrace(this.traceLocationsParam, this.config.domainNetwork, this.config.tier, "", configuration);
              break;
            case 'downstream':
              var traceObj = this.un.downstream(this.traceLocationsParam, this.config.domainNetwork, this.config.tier, "", configuration);
              break;
            default:
              var traceObj = this.un.connectedTrace(this.traceLocationsParam, configuration);
              break;
          }

          traceObj.then(traceResults => {
                  if(this.traceCounter === (this.traceMax - 1)) {
                    this.drawTraceResults(this.un, traceResults);
                  }
                  this.tempRecordSet = traceResults;
                })
              .then(a => {
                  this.updateStatus("Done");
                  resolve(true);
              })
              .catch(er => {
                  this.updateStatus(er);
                  reject(true);
              });

      });
  },

    replaceSpecificTraceConfig: function(param) {
        let configuration = lang.clone(this.config.emptyTraceConfiguration);
        configuration.includeContainers = param.traceInfo.traceConfig.includeContainers;
        configuration.includeContent = param.traceInfo.traceConfig.includeStructLineContent;
        configuration.includeStructures = param.traceInfo.traceConfig.includeStructures;
        configuration.includeBarriers = param.traceInfo.traceConfig.includeBarriers;
        configuration.validateConsistency = param.traceInfo.traceConfig.validateConsistency;
        configuration.domainNetworkName = this.config.domainNetwork;
        configuration.tierName = this.config.tier;
        configuration.conditionBarriers = param.traceInfo.traceConfig.conditionBarriers;
        configuration.filterBarriers = param.traceInfo.traceConfig.filterBarriers;
        configuration.outputConditions = param.traceInfo.traceConfig.outputConditions;
        return configuration;
    },

    cmbItemsChange: function(params) {
      let itemId = params.target.options[params.target.selectedIndex].id;
      this.updateStatus("Loading item...");
      let itemData = this.portal.loadItem(itemId).then(lang.hitch(this, function(result) {
        this.updateStatus("");
        // get the first operational layer so we know the feature service
        let serviceUrl = result.operationalLayers[0].url;
        let arrayService = serviceUrl.split("/")
        arrayService.length--;
        serviceUrl = arrayService.join("/");
        this.un = UtilityNetwork;
        this.un.token = this.portal.token;
        this.un.featureServiceUrl = serviceUrl;
        this.un.emptyTraceConfiguration = this.config.emptyTraceConfiguration;
        let serviceJson = this.un.featureServiceJson;
        this.un.load().then(lang.hitch(this, function() {
                this.loadUtilityNetwork(this.un, itemId, "mapDiv");

                //this.own(on(this.btnTrace, "click" , lang.hitch(this, this.btnTraceClick)));
                this.own(on(this.cmbDomainNetworks, "change" , lang.hitch(this, this.cmbDomainNetworksChange)));
                this.own(on(this.cmbTiers, "change" , lang.hitch(this, this.cmbTiersChange)));
                this.own(on(this.cmbSubnetworks, "change" , lang.hitch(this, this.cmbSubnetworksChange)));

                //populate domain networks, clear list first
                while (this.cmbDomainNetworks.firstChild) this.cmbDomainNetworks.removeChild(this.cmbDomainNetworks.firstChild);
                while (this.cmbTiers.firstChild) this.cmbTiers.removeChild(this.cmbTiers.firstChild);
                while (this.cmbSubnetworks.firstChild) this.cmbSubnetworks.removeChild(this.cmbSubnetworks.firstChild);
                this.un.dataElement.domainNetworks.forEach(domainNetwork => {
                    let dn = document.createElement("option");
                    dn.textContent = domainNetwork.domainNetworkName;
                    this.cmbDomainNetworks.appendChild(dn);
                })
                //cmbDomainNetworks.selectedIndex = -1;
                // ST - Hard code to WaterDistribution for demo
                if (this.un.dataElement.domainNetworks.length > 1) {
                    let event = new Event('change');
                    this.cmbDomainNetworks.selectedIndex = 1;
                    this.cmbDomainNetworks.dispatchEvent(event);
                } else {
                    this.cmbDomainNetworks.selectedIndex = -1;
                }
        }),function (err) {console.log(err)});
    }));

    },

    btnTraceClick: function(params) {
      let domainNetworkName = this.cmbDomainNetworks.options[this.cmbDomainNetworks.selectedIndex].textContent;
      let tierName = this.cmbTiers.options[this.cmbTiers.selectedIndex].textContent;
      let subnetworkName = "";
      //if subnetwork is not selected
      if (this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex] != undefined) {
          subnetworkName = this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex].textContent;
      }

      this.updateStatus("Tracing...");
      this.traceLocationsParam = this.getTraceLocationsParam();
      this.un.subnetworkTrace(this.traceLocationsParam, domainNetworkName, tierName, subnetworkName)
          .then(traceResults => {
            if(this.traceCounter === (this.traceMax - 1)) {
              this.drawTraceResults(this.un, traceResults);
            }
          })
          .then(a => this.updateStatus("Done"))
          .catch(err => this.updateStatus(err));
    },

    cmbDomainNetworksChange: function(params) {
      while (this.cmbTiers.firstChild) this.cmbTiers.removeChild(this.cmbTiers.firstChild);
      while (this.cmbSubnetworks.firstChild) this.cmbSubnetworks.removeChild(this.cmbSubnetworks.firstChild);
      let selectedDomainNetwork = params.target.options[params.target.selectedIndex].textContent;

      let domainNetwork = this.un.getDomainNetwork(selectedDomainNetwork);

      domainNetwork.tiers.forEach(tier => {
          let tn = document.createElement("option");
          tn.textContent = tier.name;
          this.cmbTiers.appendChild(tn);
      })
      //cmbTiers.selectedIndex = -1;
      if (domainNetwork.tiers.length > 0) {
          let event = new Event('change');
          this.cmbTiers.dispatchEvent(event);
      } else {
          this.cmbTiers.selectedIndex = -1;
      }
    },

    cmbTiersChange: function(params) {
      while (this.cmbSubnetworks.firstChild) this.cmbSubnetworks.removeChild(this.cmbSubnetworks.firstChild);
      let selectedDomainNetwork = this.cmbDomainNetworks.options[this.cmbDomainNetworks.selectedIndex].textContent;
      let selectedTier = this.cmbTiers.options[this.cmbTiers.selectedIndex].textContent;

      this.un.getSubnetworks(selectedDomainNetwork, selectedTier).then(lang.hitch(this, function(results) {
          results.features.forEach(feature => {
              let sn = document.createElement("option");
              for (let propt in feature.attributes)
                  if (propt.toUpperCase() === "SUBNETWORKNAME")
                      sn.textContent = feature.attributes[propt];

              this.cmbSubnetworks.appendChild(sn);
          })
          this.cmbSubnetworks.selectedIndex = -1;
      }));
    },

    cmbSubnetworksChange: function(params) {
      this.mapView.graphics = []
      let subnetworkName = this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex].textContent;
      this.un.query(this.un.subnetLineLayerId, "SUBNETWORKNAME = '" + subnetworkName + "'")
          .then(rowsJson => {
              //let featureLayer = this.mapView.byId(this.un.subnetLineLayerId);
              //if no subnetline is found exit.
              if (rowsJson.features.length === 0)
                this.updateStatus("Subnetline feature not found. Please make sure to update all subnetworks to generate subnetline.");
              else {
                  console.log(rowsJson);
                let polylineGraphic = this.getGraphic("line", rowsJson.features[0].geometry);

                this.mapView.graphics.add(polylineGraphic);
                this.mapView.goTo(polylineGraphic.geometry);
                //this.mapView.then(e => this.mapView.goTo(polylineGraphic.geometry));
              }
          });
    },

    loadUtilityNetwork: function(utilityNetwork, itemId, mapViewDiv) {
      let token = this.portal.token;
      let serviceJson = utilityNetwork.featureServiceJson;
      let serviceUrl = utilityNetwork.featureServiceUrl;

      this.GraphicClass = Graphic;
      this.gl = new GraphicsLayer();
      this.gl.screenSizePerspectiveEnabled = true
      this.mapView.map.add(this.gl);

    },

    updateLocationsFromResults: function(param) {
        console.log(param);
        let newStartArr = [];
        let newBarrArr = [];
        for (let f of param.featuresJson.traceResults.elements) {
            if (f.enabled === false) {
                //console.log("found one element that is disabled " + f.globalId);
                continue; //if the element is disabled skip it
            }
            let layerObj = this.un.getLayerIdfromSourceId(f.networkSourceId);
            if (layerObj === undefined) continue;
            let layerId = layerObj.layerId;
            if(param.traceInfo.useAsStart !== "userDefined") {
                for (let s of param.traceInfo.traceConfig.startLocationLayers) {
                    if(s.layerId === layerId) {
                        if(parseInt(s.assetGroupCode) === parseInt(f.assetGroupCode) &&
                        parseInt(s.assetTypeCode) === parseInt(f.assetTypeCode)
                        ) {
                            let newObj = {
                                "assetGroupCode": f.assetGroupCode,
                                "assetTypeCode": f.assetTypeCode,
                                "globalId": f.globalId,
                                "layerId": [layerId],
                                "terminalId": f.terminalId,
                                "traceLocationType": "startingPoint"
                            };
                            newStartArr.push(newObj);
                        }
                    }
                }
            }
            if(param.traceInfo.useAsBarrier !== "userDefined") {
                for (let s of param.traceInfo.traceConfig.barriersLayers) {
                    if(s.layerId === layerId) {
                        if(parseInt(s.assetGroupCode) === parseInt(f.assetGroupCode) &&
                        parseInt(s.assetTypeCode) === parseInt(f.assetTypeCode)
                        ) {
                            let newObj = {
                                "assetGroupCode": f.assetGroupCode,
                                "assetTypeCode": f.assetTypeCode,
                                "globalId": f.globalId,
                                "layerId": [layerId],
                                "terminalId": f.terminalId,
                                "traceLocationType": "barrier"
                            };
                            newBarrArr.push(newObj);
                        }
                    }
                }
            }
        }
        if(newStartArr.length > 0) {
            if(param.traceInfo.useAsStart !== "addToExistingResults") {
                let filteredArr = array.filter(this.traceLocationsParam, function(item){
                    return item.traceLocationType !== "startingPoint";
                });
                this.traceLocationsParam = filteredArr;
            }
            this.traceLocationsParam = this.traceLocationsParam.concat(newStartArr);
        }
        if(newBarrArr.length > 0) {
            if(param.traceInfo.useAsBarrier !== "addToExistingResults") {
                let filteredArr = array.filter(this.traceLocationsParam, function(item){
                    return item.traceLocationType !== "barrier";
                });
                this.traceLocationsParam = filteredArr;
            }
            this.traceLocationsParam = this.traceLocationsParam.concat(newBarrArr);
        }
    },

    buildTraceResults: function(featuresJson) {
      //build the trace results so we group them by layerid
      let traceResults = {};
      traceResults.layers = [];
      console.log("total elements " + featuresJson.traceResults.elements.length);
      for (let f of featuresJson.traceResults.elements) {
          if (f.enabled == false) {
              console.log("found one element that is disabled " + f.globalId);
              continue; //if the element is disabled skip it
          }

          let layerObj = this.un.getLayerIdfromSourceId(f.networkSourceId);
          if (layerObj === undefined) continue;

          let layerId = layerObj.layerId;

          if (traceResults.layers[layerId] == undefined) traceResults.layers[layerId] = {};
          if (traceResults.layers[layerId].objectIds == undefined) traceResults.layers[layerId].objectIds = [];
          if (traceResults.layers[layerId].type == undefined) traceResults.layers[layerId].type = layerObj.type;

          traceResults.layers[layerId].objectIds.push(f.objectId);
      }

      return traceResults;
    },

    drawTraceResults: function(un, traceResults, color = this.config.SELECTION_COLOR, clearGraphics = true) {
      //console.log(JSON.stringify(traceResults))
      let selectionTraceResult = this.buildTraceResults(traceResults);

      let promises = [];
      for (let layerId in selectionTraceResult.layers) {
          let layerObj = selectionTraceResult.layers[layerId];
          let subOids = this.createGroupedArray(layerObj.objectIds, this.config.QUERY_PAGE);
          subOids.forEach(oidGroup => promises.push(this.un.query(layerId, "1=1", layerObj, oidGroup.join(","))));
      }

      Promise.all(promises).then(rows => {
          if (clearGraphics) this.mapView.graphics = [];
          let graphics = [];
          //let geometries = [];
          //let featureLayer = this.mapView.byId(rows.layerId);
          for (let featureSet of rows) {
              let layerObj = featureSet.obj;
              if (featureSet.features != undefined)
                  for (let g of featureSet.features) {

                      let graphic = this.getGraphic(layerObj.type, g.geometry, color);
                      graphics.push(graphic);
                  }
          }
          this.mapView.graphics.addMany(graphics);
      });
    },

    IslandTrace: function() {

        let islands = 0;
        let total = 0;
        let startTime = new Date();
        //for each layer that is device/line/junction in each domain network, query and find disconnected features.
        let layers = [];
        let deviceLayers = this.un.getDeviceLayers();
        let junctionLayers = this.un.getJunctionLayers();
        let lineLayers = this.un.getLineLayers()
        layers = layers.concat(deviceLayers, junctionLayers, lineLayers);

        for (let i = 0; i < layers.length; i++) {
            let dLayer = layers[i];
            this.updateStatus("Querying device layer for features with unknown subnetwork name ...");
                this.un.query(dLayer, "systemsubnetworkname = 'Unknown'").then(lang.hitch(this, function(queryResults) {
                    console.log(queryResults);
                this.updateStatus(queryResults.features.length + " features found with unknown subnetwork name.");
                total = total + queryResults.features.length
                //loop through each and add a starting point and check if the feature is in island.
                for (let f = 0; f < queryResults.features.length; f++) {
                    let feature = queryResults.features[f];
                    //[{"traceLocationType":"startingPoint", layerId: 5, "globalId":"{00B313AC-FBC4-4FF4-9D7A-6BF40F4D4CAD}"}]
                    let startingPoints = [];
                    let startPoint = {};
                    startPoint.traceLocationType = "startingPoint";
                    startPoint.layerId = dLayer;
                    startPoint.globalId = this.getVal(feature.attributes, "globalid");
                    startPoint.assetGroupCode = this.getVal(feature.attributes, "assetgroup");
                    startPoint.assetTypeCode = this.getVal(feature.attributes, "assettype");
                    startingPoints.push(startPoint);
                    try {
                        feature.isInIsland = this.un.isInIsland(startingPoints).then();
                    } catch (ex) {
                        feature.isInIsland = true; //in case of errors tracing if the element doesn't exists (new feature created)
                    }

                    if (feature.isInIsland === true) islands++;
                    console.log(startPoint.globalId + " is " + feature.isInIsland);
                    this.updateStatus("Processing feature " + (f + 1) + " of " + queryResults.features.length + " [" + Math.round(f * 100 / queryResults.features.length, 1) + "%]")
                }

                let endTime = new Date();
                let timeInSeconds = (endTime.getTime() - startTime.getTime()) / 1000
                this.updateStatus("Process completed in . " + timeInSeconds + " seconds. " + islands + " features out of " + total + " found in islands without controllers.");

            })).catch(function(err) {
                console.log(err);
            });
        }
    },

    //only for water
    IsolationTrace: async function() {
        //run upstream trace, stop when you find protective device valves
        //trace configuration for barrier protective
        //let WaterUpstreamConfiguration = {"includeContainers": true, "includeContent": false, "includeStructures": true, "includeBarriers": true, "validateConsistency": false, "domainNetworkName": "Water", "tierName": "System", "targetTierName": "", "subnetworkName": "", "diagramTemplateName": "", "shortestPathNetworkAttributeName": "", "filterBitsetNetworkAttributeName": "", "traversabilityScope": "junctionsAndEdges", "conditionBarriers": [{ "name": "Pipe Device Status", "type": "networkAttribute", "operator": "equal", "value": 0, "combineUsingOr": true, "isSpecificValue": true }, { "name": "Lifecycle Status", "type": "networkAttribute", "operator": "doesNotIncludeAny", "value": 24, "combineUsingOr": false, "isSpecificValue": true }], "functionBarriers": [], "arcadeExpressionBarrier": "", "filterBarriers": [{ "name": "Category", "type": "category", "operator": "equal", "value": "Disconnecting", "combineUsingOr": true, "isSpecificValue": true }, { "name": "Category", "type": "category", "operator": "equal", "value": "Protective", "combineUsingOr": true, "isSpecificValue": true }, { "name": "Category", "type": "category", "operator": "equal", "value": "Isolating", "combineUsingOr": false, "isSpecificValue": true }], "filterFunctionBarriers": [], "filterScope": "junctionsAndEdges", "functions": [], "nearestNeighbor": { "count": -1, "costNetworkAttributeName": "", "nearestCategories": [], "nearestAssets": [] }, "outputFilters": [], "outputConditions": [{ "name": "Category", "type": "category", "operator": "equal", "value": "Disconnecting", "combineUsingOr": true, "isSpecificValue": true }, { "name": "Category", "type": "category", "operator": "equal", "value": "Protective", "combineUsingOr": true, "isSpecificValue": true }, { "name": "Category", "type": "category", "operator": "equal", "value": "Isolating", "combineUsingOr": false, "isSpecificValue": true }], "propagators": [] };
        //let WaterCustomerConfiguration = {"includeContainers": false, "includeContent": false, "includeStructures": false, "includeBarriers": true, "validateConsistency": true, "domainNetworkName": "", "tierName": "", "targetTierName": "", "subnetworkName": "", "diagramTemplateName": "", "shortestPathNetworkAttributeName": "", "filterBitsetNetworkAttributeName": "", "traversabilityScope": "junctionsAndEdges", "conditionBarriers": [], "functionBarriers": [], "arcadeExpressionBarrier": "", "filterBarriers": [], "filterFunctionBarriers": [], "filterScope": "junctionsAndEdges", "functions": [], "nearestNeighbor": { "count": -1, "costNetworkAttributeName": "", "nearestCategories": [], "nearestAssets": [] }, "outputFilters": [{"networkSourceId":6,"assetGroupCode":12,"assetTypeCode":65},{"networkSourceId":6,"assetGroupCode":12,"assetTypeCode":61},{"networkSourceId":6,"assetGroupCode":12,"assetTypeCode":62},{"networkSourceId":6,"assetGroupCode":12,"assetTypeCode":63},{"networkSourceId":6,"assetGroupCode":12,"assetTypeCode":64},{"networkSourceId":6,"assetGroupCode":12,"assetTypeCode":0}], "outputConditions": [], "propagators": [] };

        let UpstreamConfiguration = lang.clone(this.config.emptyTraceConfiguration);
        UpstreamConfiguration.includeContainers = this.config.upstreamTraceConfiguration.includeContainers;
        UpstreamConfiguration.domainNetworkName = this.config.upstreamTraceConfiguration.domainNetworkName;
        UpstreamConfiguration.tierName = this.config.upstreamTraceConfiguration.tierName;
        UpstreamConfiguration.conditionBarriers = this.config.upstreamTraceConfiguration.conditionBarriers;
        UpstreamConfiguration.filterBarriers = this.config.upstreamTraceConfiguration.filterBarriers;
        UpstreamConfiguration.outputConditions = this.config.upstreamTraceConfiguration.outputConditions;

        let CustomerConfiguration = lang.clone(this.config.emptyTraceConfiguration);
        CustomerConfiguration.outputFilters = this.config.customerCountTraceConfiguration.outputFilters;

        let traceConfiguration = UpstreamConfiguration;
        let customerConfiguration = CustomerConfiguration; //only return customers config

        if (this.cmbDomainNetworks.selectedIndex != -1 && this.cmbTiers.selectedIndex != -1) {
            try {

                let domainNetworkName = this.cmbDomainNetworks.options[this.cmbDomainNetworks.selectedIndex].textContent;
                let tierName = this.cmbTiers.options[this.cmbTiers.selectedIndex].textContent;
                traceConfiguration.domainNetworkName = domainNetworkName;
                traceConfiguration.tierName = tierName;
                let totalIsolatingDevices = 0;
                let realIsolatingDevices = 0;

                this.traceLocationsParam = this.getTraceLocationsParam();
                let start = new Date();
                this.updateStatus("Upstream trace...");
                let valveBarriers = await this.un.upstreamTrace(this.traceLocationsParam, null, null, null, traceConfiguration)
                valveBarriers.traceResults.elements.forEach(e => e.enabled = true);

                this.updateStatus("Eliminating false barriers ...");
                let realValveBarrier = valveBarriers;
                let chkEliminate = document.getElementById("chkEliminate").checked;
                if (chkEliminate) realValveBarrier = await this.eliminate(valveBarriers, domainNetworkName, tierName, traceConfiguration)
                realValveBarrier.traceResults.elements.forEach(v => v.enabled === true ? realIsolatingDevices++ : 0);
                this.drawTraceResults(this.un, realValveBarrier, this.config.TRACING_BARRIER_COLOR)
                this.updateStatus("Finding affected customers...");
                let customersResults = await this.findAffectedCustomers(this.traceLocationsParam, realValveBarrier, customerConfiguration)
                let end = new Date();
                let totalTime = (end.getTime() - start.getTime()) / 1000
                this.updateStatus("Done in .. " + totalTime + " seconds " + " found " + realValveBarrier.traceResults.elements.length + " isolation devices where only " + realIsolatingDevices + " are valid, and total affected customers of " + customersResults.traceResults.elements.length);
                //.catch(err=> updateStatus(err));

            } catch (err) {
                this.updateStatus(err);
            }
        } else {
            this.updateStatus("Please select domain and tier");
        }
    },

    findAffectedCustomers: async function(startParam, barriersObj, configFilterServiceCustomers) {

        let barriers = barriersObj.traceResults;
        let startingLocations = startParam;
        //build up starting locations
        for (let j = 0; j < barriers.elements.length; j++) {
            let e = barriers.elements[j];
            e.traceLocationType = this.config.TRACELOCATION_BARRIER;
            //only use barrier if it is valid.
            if (e.enabled === undefined || e.enabled === true) startingLocations.push(e);
        }


        let results = await this.un.connectedTrace(startingLocations, configFilterServiceCustomers)
        this.drawTraceResults(this.un, results, this.config.CUSTOMER_COLOR, false);
        return new Promise((resolve, reject) => {
            resolve(results);
        })
    },

    eliminate: async function(traceResultsObj, domainNetworkName, tierName, traceConfiguration) {
        let traceResults = traceResultsObj.traceResults;
        for (let j = 0; j < traceResults.elements.length; j++) {
            let e = traceResults.elements[j];
            let startingLocations = [];
            e.traceLocationType = this.config.TRACELOCATION_START;
            startingLocations.push(e);
            //for each element but as starting point and all the rest as barriers...
            for (let i = 0; i < traceResults.elements.length; i++) {
                let e1 = traceResults.elements[i];
                //don't add the same element as starting point
                if (e1.globalId === e.globalId) continue;

                e1.traceLocationType = this.config.TRACELOCATION_BARRIER;
                startingLocations.push(e1);
            }
            //after that we are now ready... lets trace.

            //console.log(JSON.stringify(startingLocations));
            let controllerTraceResult = await this.un.subnetworkControllerTrace(startingLocations, domainNetworkName, tierName, null);
            //if no controllers found remove that barrier... its not a candidate., when no controllers found an error is returned extendedCode=-2147208935
            if (controllerTraceResult.success == false) {

                traceResults.elements[j].enabled = false;
            } else
                traceResults.elements[j].enabled = true;


        }

        //console.log(JSON.stringify(traceResults));

        return new Promise((resolve, reject) => {
            resolve(traceResultsObj);
        })
    },

    switchPanels: function(id) {
      if (id === "settings") {
          document.getElementById("optTools").style.display = "block";
          document.getElementById("optSettings").style.display = "none";
          document.getElementById("tools").style.display = "none";
          document.getElementById("settings").style.display = "block";
      } else {
          document.getElementById("optTools").style.display = "none";
          document.getElementById("optSettings").style.display = "block";
          document.getElementById("tools").style.display = "block";
          document.getElementById("settings").style.display = "none";
      }
    },

    getVal: function(obj, prop) {
      prop = (prop + "").toLowerCase();
      for (var p in obj) {
          if (obj.hasOwnProperty(p) && prop == (p + "").toLowerCase()) {
              return obj[p];
              break;
          }
      }
      return undefined;
    },

    createGroupedArray: function(arr, chunkSize) {
      var groups = [],
          i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
      return groups;
    },

    getGraphic: function(type, geometry, color = this.config.SELECTION_COLOR, name) {
      let symbol;
      let geometryObject;
      switch (type) {
          case "point":
              symbol = {
                  type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                  color: color,
                  size: this.config.SELECTION_SIZE,
                  outline: { // autocasts as new SimpleLineSymbol()
                      color: color,
                      width: 0
                  }
              }
              geometryObject = {
                  type: "point",
                  x: geometry.x,
                  y: geometry.y,
                  spatialReference: this.config.DEFAULT_SPATIAL_REFERENCE
              }
              break;
          case "line":
              symbol = {
                  type: "simple-line", // autocasts as SimpleLineSymbol()
                  color: color,
                  width: this.config.SELECTION_SIZE
              };
              geometryObject = {
                  type: "polyline",
                  paths: geometry.paths,
                  spatialReference: this.config.DEFAULT_SPATIAL_REFERENCE
              }
              break;
          case "polygon":
              symbol = {
                  type: "simple-fill", // autocasts as new SimpleFillSymbol()
                  color: color,
                  outline: { // autocasts as new SimpleLineSymbol()
                      color: color, //[255, 255, 255],
                      width: this.config.SELECTION_SIZE
                  }
              };
              geometryObject = {
                  type: "polygon",
                  rings: geometry.rings,
                  spatialReference: this.config.DEFAULT_SPATIAL_REFERENCE
              }
      }
      return this.GraphicClass({
          geometry: geometryObject,
          symbol: symbol,
          name: name
      });

  },

  makeRequest: function(opts) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open(opts.method, opts.url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            let jsonRes = xhr.response;
            if (typeof jsonRes !== "object") jsonRes = JSON.parse(xhr.response);
            resolve(jsonRes);
        } else {
            reject({
            status: this.status,
            statusText: xhr.statusText
            });
        }
    };

    //xhr.onerror =   err => reject({status: this.status, statusText: xhr.statusText}) ;
    xhr.onerror =   err => reject(err) ;


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

  generateToken: function() {
    var tokenTool = tokenUtils;
    tokenTool.portalUrl = this.appConfig.portalUrl;
    return tokenTool.getPortalCredential(this.appConfig.portalUrl).token;
  },

    onOpen: function(){
      console.log('onOpen');
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    }
  });
});