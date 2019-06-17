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

define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'dojo/dom',
  'dojo/on',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-attr',
  'dojo/dom-style',
  'dojo/query',
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/graphic",
  "esri/geometry/Point",
  "esri/geometry/Polygon",
  "esri/geometry/Polyline",
  "esri/tasks/query",
  'esri/toolbars/draw',
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/Color",
  'jimu/tokenUtils',
  'jimu/CSVUtils',
  'jimu/MapManager',
  "./utilitynetwork",
  'dijit/form/TextBox',
  'dijit/form/Select'
],
function(declare,
  BaseWidget,
  dom,
  on,
  lang,
  array,
  domAttr,
  domStyle,
  domQuery,
  FeatureLayer,
  GraphicsLayer,
  Graphic,
  Point,
  Polygon,
  Polyline,
  Query,
  Draw,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  PictureMarkerSymbol,
  SimpleFillSymbol,
  Color,
  tokenUtils,
  CSVUtils,
  MapManager,
  UtilityNetwork
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget,],{
    //templateString: template,
    baseClass: 'jimu-widget-untrace',

    highlight: null,
    mapView: null,
    GraphicClass: null,
    handles: [],
    un: null,
    gl: null,
    activeTraceLocation: null,
    traceLocations: null,
    handleStartPoints: null,
    handleBarriers: null,
    traceCounter: 0,
    traceMax: 0,
    token: null,
    traceLocationsParam: [],
    tempRecordSet: null,
    commulativeRecordSet: [],
    selectionMode: "point",
    runFlag: true,
    initialRun: true,
    currentGroup: null,
    currentDomainNetwork: null,
    resultHighlightColor: [27,227,251,0.4],
    layerPopupState: [],

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');

      //load flag images
      domAttr.set(this.btnClearTraceLocations, "src", this.folderUrl + "/images/delete.png" );
      domAttr.set(this.btnStartingPoint, "src", this.folderUrl + "/images/flag.png" );
      domAttr.set(this.btnBarriers, "src", this.folderUrl + "/images/add-barriers-select.png" );
      domAttr.set(this.btnPoint, "src", this.folderUrl + "/images/add.png" );
      domAttr.set(this.btnPolygon, "src", this.folderUrl + "/images/polygon.png" );
      domAttr.set(this.btnRun, "src", this.folderUrl + "/images/run.png" );

      this.un = UtilityNetwork;
      this.token = this.generateToken();

      this.createCustomTraceButtons();
    },

    startup: function() {
      this.inherited(arguments);
      console.log('startup');
      this.loadUN();

      this.own(on(this.btnStartingPoint, "click", lang.hitch(this, this.btnStartingPointClick)));

      this.own(on(this.btnBarriers, "click", lang.hitch(this, this.btnBarriersClick)));

      this.own(on(this.lblExport, "click", lang.hitch(this, this.exportResults)));

      //this.own(on(this.cmbSubnetworks, "change" , lang.hitch(this, this.cmbSubnetworksChange)));

      this.own(on(this.btnPoint, "click", lang.hitch(this, function(){
        this.selectionMode = "point";
        this.enableCreateDrawing();
        domAttr.set(this.btnPoint, "class", "button_active");
        domAttr.set(this.btnPolygon, "class", "button_nonactive");
      })));

      this.own(on(this.btnPolygon, "click", lang.hitch(this, function(){
        this.selectionMode = "polygon";
        this.enableCreateDrawing();
        domAttr.set(this.btnPoint, "class", "button_nonactive");
        domAttr.set(this.btnPolygon, "class", "button_active");
      })));

      this.own(on(this.btnClearTraceLocations, "click", lang.hitch(this, function(e) {
        //if(this.mouseHandler !== null) {
        //    this.mouseHandler.remove();
        //}
        this.activeTraceLocation = undefined;
        if(traceLocations !== null) {
            while (traceLocations.firstChild) traceLocations.removeChild(traceLocations.firstChild);
        }
        domAttr.set(this.btnStartingPoint, "class", "button_nonactive");
        domAttr.set(this.btnBarriers, "class", "button_nonactive");
        domQuery(".traceLocations").style("display", "none");
        domQuery(".drawIconGroup").style("display", "none");
        domStyle.set(this.runButtonHolder, "display", "none");
        this.map.graphics.clear();
        //this.gl.graphics.clear();
        this.selectionMode = "none";
        this.updateStatus("");
        this.updateExportText("");
      })));

      this.own(on(this.btnRun, "click", lang.hitch(this, function() {
        domAttr.set(this.btnRun, "class", "button_active");
        currOption = this.cmbUserTraces.options[this.cmbUserTraces.selectedIndex];
        this.prepTraceParams(currOption);
        this.determineTracesToRun({'groupName':this.currentGroup});
      })));

    },

    createCustomTraceButtons: function() {
      var sn = document.createElement("option");
      sn.textContent = "Please Select a Trace";
      sn.count = 0;
      sn.value = "";
      this.cmbUserTraces.appendChild(sn);
      for (var key in this.config.userTraces) {
          //let container = domConstruct.create("div",{'class':'customTraceItem'}, this.customTracesHolder);
         // let userTrace = domConstruct.create("div",{'class':'button_nonactive userTraces', 'innerHTML': key, 'count':this.config.userTraces[key].traces.length}, container);
        var sn = document.createElement("option");
        sn.textContent = key;
        sn.count = this.config.userTraces[key].traces.length;
        sn.value = key;
        this.cmbUserTraces.appendChild(sn);
      }
      this.cmbUserTraces.selectedIndex = 0;

      this.own(on(this.cmbUserTraces, "change", lang.hitch(this, function(val) {
        currOption = this.cmbUserTraces.options[this.cmbUserTraces.selectedIndex];
        if(currOption.value !== "") {
          domStyle.set(this.flagsBlock, "display", "block");
          domStyle.set(this.runButtonHolder, "display", "inline");
          on.emit(this.btnClearTraceLocations, "click", {
            bubbles: true,
            cancelable: true
          });
          this.prepTraceParams(currOption);
        } else {
          domStyle.set(this.flagsBlock, "display", "none");
          domStyle.set(this.runButtonHolder, "display", "none");
          on.emit(this.btnClearTraceLocations, "click", {
            bubbles: true,
            cancelable: true
          });
        }

      })));

    },

    loadUN: function(params) {
      this.updateStatus("");
      this.un = UtilityNetwork;
      this.un.token = this.token;
      this.un.featureServiceUrl = this.config.FSurl;
      this.un.emptyTraceConfiguration = this.config.emptyTraceConfiguration;
      this.un.configuredDomain = this.config.domainNetwork;
      this.un.load().then(lang.hitch(this, function() {
        this.loadGraphicLayer();
        //this._populateSubnetWorkDropdown();
      }),function (err) {console.log(err)});
    },

    loadGraphicLayer: function() {
      this.GraphicClass = Graphic;
      this.gl = new GraphicsLayer();
      this.gl.screenSizePerspectiveEnabled = true;
      this.map.addLayer(this.gl);
    },

    /*****  STARTS AND BARRIERS
    handles handles starts and barriers adding/removing
    and map action after drawing is done to get start and barriers
    *******/
    btnBarriersClick: function(params) {
      domAttr.set(this.btnStartingPoint, "class", "button_nonactive");
      domAttr.set(this.btnBarriers, "class", "button_active");
      //if (this.activeTraceLocation == undefined) {
        domQuery(".drawIconGroup").style("display", "inline");
        var event = new Event('click');
        this.btnPoint.dispatchEvent(event);
        //this.mouseHandler = this.map.on("click", lang.hitch(this,this.mapClick));
      //}
      this.activeTraceLocation = this.config.TRACELOCATION_BARRIER;
    },

    btnStartingPointClick: function(params) {
      console.log(this.currentDomainNetwork);
      this.un.getValidAssets(this.currentDomainNetwork);
      domAttr.set(this.btnStartingPoint, "class", "button_active");
      domAttr.set(this.btnBarriers, "class", "button_nonactive");
      //if (this.activeTraceLocation == undefined) {
        domQuery(".drawIconGroup").style("display", "inline");
        var event = new Event('click');
        this.btnPoint.dispatchEvent(event);
        //this.mouseHandler = this.map.on("click", lang.hitch(this, this.mapClick));
      //}
      this.activeTraceLocation = this.config.TRACELOCATION_START;
    },

    mapClick: function(event) {
      let color = this.activeTraceLocation === this.config.TRACELOCATION_START ? this.config.TRACING_STARTPOINT_COLOR : this.config.TRACING_BARRIER_COLOR;
      this.un.traceControls.forEach(tc => {
      var fl = new FeatureLayer(this.un.featureServiceUrl + "/" + tc);
      this.own(on(fl, "load", lang.hitch(this, function() {
        const query = new Query();
        query.outSpatialReference = { wkid: 102100 };
        query.returnGeometry = true;
        query.outFields = [ "*" ];
        query.distance = 10;
        query.units = "feet"
        query.geometry = event;
        fl.queryFeatures(query, lang.hitch(this, function(hitResults){
            console.log(hitResults.features);  // prints the array of features to the console
            domQuery(".traceLocations").style("display", "block");

            let supportedClasses = ["esriUNFCUTDevice", "esriUNFCUTJunction", "esriUNFCUTLine"] //, "esriUNFCUTLine" ]
            if (hitResults.features.length) {
                hitResults.features.forEach(g => {

                    let img = document.createElement("img");
                    if (this.activeTraceLocation === this.config.TRACELOCATION_START) {
                        img.src = this.folderUrl + "/images/flag.png";
                        img.className = "btnStartItems";
                    }
                    else {
                        img.src = this.folderUrl + "/images/add-barriers-select.png";
                        img.className = "btnBarrierItems";
                    }
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
                    let deleteTraceLocation = document.createElement("img");
                    deleteTraceLocation.src = this.folderUrl + "/images/delete.png"
                    deleteTraceLocation.className = "btnX";
                    deleteTraceLocation.addEventListener("click", lang.hitch(this, function(e){
                        traceLocations.removeChild(rowTraceLocation);
                        //try to remove the graphic
                        for (let i = 0; i < this.map.graphics.graphics.length; i++) {
                            let g = this.map.graphics.graphics[i];
                            if(typeof(g.attributes) !== "undefined") {
                              if (g.attributes.name === rowTraceLocation.globalId) {
                                this.map.graphics.remove(g);
                                  break;
                              }
                            } else {
                              this.map.graphics.remove(g);
                            }
                        }

                        if(this.map.graphics.graphics.length <= 0) {
                          domQuery(".traceLocations").style("display", "none");
                          domStyle.set(this.runButtonHolder, "display", "none");
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
                    domStyle.set(this.runButtonHolder, "display", "inline");

                    //create graphic on the map
                    //let bufferedGeo =  geometryEngineAsync.buffer(g.geometry, this.config.TRACING_STARTLOCATION_BUFFER)
                    //    .then(lang.hitch(this, function(geom){
                      if(g.geometry.type === "point") {
                        this.map.graphics.add(this.getGraphic(g.geometry.type, g.geometry, color, rowTraceLocation.globalId, this.activeTraceLocation, false));
                      } else if(g.geometry.type === "line" || g.geometry.type === "polyline") {
                        var pntOnLine = g.geometry.getPoint(0,0);
                        this.map.graphics.add(this.getGraphic("point", event, color, rowTraceLocation.globalId, this.activeTraceLocation, false));
                      } else if(g.geometry.type === "polygon") {
                        var pntInPoly = g.geometry.getCentroid();
                        this.map.graphics.add(this.getGraphic("point", event, color, rowTraceLocation.globalId, this.activeTraceLocation, false));
                      } else {

                      }

                      console.log(this.map.graphics.graphics);
                      this.enableWebMapPopup();
                    //this.map.graphics.add(this.getGraphic(g.geometry.type, g.geometry, color, rowTraceLocation.globalId, this.activeTraceLocation, false));
                    //    }));
                })

              //this.map.graphics.add(this.getGraphic(event.type, event, color, null, this.activeTraceLocation, false));

            }

        }));
      })));
      /*
      this.map.hitTest({ x: event.x, y: event.y }).then(lang.hitch(this,function(hitResults) {
          //console.log(hitResults);
      */
      });

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

    /*****  CUSTOM TRACE RUNS
    determines what traces to run, how many traces
    and replaces empty trace config for each trace
    *******/
    prepTraceParams: function(param) {
      this.initialRun = true;
      this.traceCounter = 0;
      this.traceMax = parseInt(param.count);
      this.traceLocationsParam = [];
      if(this.config.userTraces[param.value].traces[0].traceConfig.domainNetwork !== "") {
        this.currentDomainNetwork = this.config.userTraces[param.value].traces[0].traceConfig.domainNetwork;
      } else {
        this.currentDomainNetwork = this.config.domainNetwork;
      }
      this.currentGroup = param.value;
      this.commulativeRecordSet = [];
    },

    determineTracesToRun: function(param) {
      for (var key in this.config.userTraces) {
          if(key === param.groupName) {
              var arrTraces = this.config.userTraces[key].traces;
              this.runFlag = this.config.userTraces[key].runAmount;
              this._traceToRun({'traceInfo':arrTraces[this.traceCounter]}).then(lang.hitch(this, function() {
                console.log("run" + this.traceCounter);
               // this.traceCounter++;
                this.initialRun = false;
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
          if(!this.initialRun) {
            if(param.traceInfo.useAsStart !== "useExisting" || param.traceInfo.useAsBarrier !== "useExisting") {
                this.updateLocationsFromResults({"traceInfo":param.traceInfo, "featuresJson":this.tempRecordSet});
            } else {
                if(this.traceLocationsParam.length <= 0) {
                    this.traceLocationsParam = this.getTraceLocationsParam();
                }
            }
          } else {
            if(this.traceLocationsParam.length <= 0) {
              this.traceLocationsParam = this.getTraceLocationsParam();
            }
          }

          let configuration = this.replaceSpecificTraceConfig(param);
          this.resultHighlightColor = param.traceInfo.traceColor;

          //only attempt to trace when there is at leats one starting point
          if (!this.traceLocationsParam.length) {
              this.updateStatus("No starting points were found.");
              return;
          }
          //var traceObj = this.un;
          var currDN = this.config.domainNetwork;
          var currTier = this.config.tier;
          if(param.traceInfo.traceConfig.domainNetwork !== "") {
            currDN = param.traceInfo.traceConfig.domainNetwork;
          }
          if(param.traceInfo.traceConfig.tier !== "") {
            currTier = param.traceInfo.traceConfig.tier;
          }
          switch(param.traceInfo.type) {
            case 'connected':
            case 'upstream':
            case 'downstream':
            case 'isolation':
              var traceObj = this.un.traceSetup(this.traceLocationsParam, currDN, currTier, "", configuration, param.traceInfo.type);
              break;
            case 'subnetwork':
              if (this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex] != undefined) {
                subnetworkName = this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex].textContent;
                var traceObj = this.un.traceSetup(this.traceLocationsParam, currDN, currTier, subnetworkName, configuration, param.traceInfo.type);
              } else {
                var traceObj = this.un.traceSetup(this.traceLocationsParam, currDN, currTier, "", configuration, param.traceInfo.type);
              }
              break;
            default:
              var traceObj = this.un.connectedTrace(this.traceLocationsParam, configuration);
              break;
          }

          traceObj.then(traceResults => {
            if(this.traceCounter >= (this.traceMax - 1)) {
              switch(this.runFlag) {
                case "runOnce":
                  //this.drawTraceResults(this.un, traceResults);
                  this.traceCounter++;
                  break;
                case "runTillNoResults":
                  if(traceResults.traceResults.elements.length > 0) {
                    if(!this.checkSameRecord(traceResults.traceResults.elements)) {
                      this.traceCounter = 0;
                    } else {
                      this.traceCounter++;
                    }
                  } else {
                    //this.drawTraceResults(this.un, traceResults);
                    this.traceCounter++;
                  }
                  break;
                default:
                  //this.drawTraceResults(this.un, traceResults);
                  this.traceCounter++;
                  break;
              }
            } else {
              this.traceCounter++;
            }
            this.drawTraceResults(this.un, traceResults, this.resultHighlightColor, false);
            this.tempRecordSet = traceResults;
            this.commulativeRecordSet = this.commulativeRecordSet.concat(traceResults.traceResults.elements);
          })
        .then(a => {
            domAttr.set(this.btnRun, "class", "button_nonactive");
            this.updateStatus("DONE");
            this.updateExportText("EXPORT");
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
        configuration.includeIsolated = param.traceInfo.traceConfig.includeIsolated;
        configuration.domainNetworkName = (param.traceInfo.traceConfig.domainNetwork)?param.traceInfo.traceConfig.domainNetwork:this.config.domainNetwork;
        configuration.tierName = (param.traceInfo.traceConfig.tier)?param.traceInfo.traceConfig.tier:this.config.tier;
        configuration.conditionBarriers = param.traceInfo.traceConfig.conditionBarriers;
        configuration.filterBarriers = param.traceInfo.traceConfig.filterBarriers;
        configuration.outputFilters = param.traceInfo.traceConfig.outputFilters;
        configuration.outputConditions = param.traceInfo.traceConfig.outputConditions;
        if(param.traceInfo.traceConfig.nearestNeighbor) {
          configuration.nearestNeighbor = param.traceInfo.traceConfig.nearestNeighbor;
        }
        if(param.traceInfo.traceConfig.functions) {
          configuration.functions = param.traceInfo.traceConfig.functions;
        }
        if(param.traceInfo.traceConfig.functionBarriers) {
          configuration.functionBarriers = param.traceInfo.traceConfig.functionBarriers;
        }
        if(param.traceInfo.traceConfig.filterFunctionBarriers) {
          configuration.filterFunctionBarriers = param.traceInfo.traceConfig.filterFunctionBarriers;
        }
        return configuration;
    },

    /*****  SUBNET TRACE FUNCTIONS
    handles the subnetwork drop down trace
    *******/
    _populateSubnetWorkDropdown: function() {
      while (this.cmbSubnetworks.firstChild) this.cmbSubnetworks.removeChild(this.cmbSubnetworks.firstChild);
      let selectedDomainNetwork = this.config.domainNetwork;
      let selectedTier = this.config.tier;

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
      this.map.graphics.clear();
      let subnetworkName = this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex].textContent;
      this.un.query(this.un.subnetLineLayerId, "SUBNETWORKNAME = '" + subnetworkName + "'")
          .then(rowsJson => {
              //let featureLayer = this.map.byId(this.un.subnetLineLayerId);
              //if no subnetline is found exit.
              if (rowsJson.features.length === 0)
                this.updateStatus("Subnetline feature not found. Please make sure to update all subnetworks to generate subnetline.");
              else {
                let polylineGraphic = this.getGraphic("line", rowsJson.features[0].geometry, this.resultHighlightColor, null, this.activeTraceLocation, true);

                this.map.graphics.add(polylineGraphic);
                this.map.goTo(polylineGraphic.geometry);
                //this.map.then(e => this.map.goTo(polylineGraphic.geometry));
              }
          });
    },

    /*****  TRACE RESULT FUNCTIONS
    If running multiple traces, starts and barriers will be updated.
    drawn results will not happen until all traces are run
    *******/
    updateLocationsFromResults: function(param) {
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
            if(param.traceInfo.useAsStart === "addToExisting" || param.traceInfo.useAsStart === "replaceAllWith" || param.traceInfo.useAsStart === "replaceFirst") {
                if((param.traceInfo.startLocationLayers).length > 0) {
                  for (let s of param.traceInfo.startLocationLayers) {
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
                } else {
                  let filteredArr = array.some(this.traceLocationsParam, function(item){
                    return item.globalId === f.globalId;
                  });
                  if(!filteredArr) {
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
            if(param.traceInfo.useAsBarrier === "addToExisting" || param.traceInfo.useAsBarrier === "replaceAllWith" || param.traceInfo.useAsBarrier === "replaceFirst") {
              if((param.traceInfo.barriersLayers).length > 0) {
                for (let s of param.traceInfo.barriersLayers) {
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
              } else {
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
            if (param.traceInfo.useAsStart === "replaceFirst" &&  newStartArr.length === 1) {
              break;
            }
            if (param.traceInfo.useAsBarrier === "replaceFirst" &&  newBarrArr.length === 1) {
              break;
            }
        }
        if(newStartArr.length > 0) {
            if(param.traceInfo.useAsStart === "replaceAllWith" || param.traceInfo.useAsStart === "replaceFirst") {
                let filteredArr = array.filter(this.traceLocationsParam, function(item){
                    return item.traceLocationType !== "startingPoint";
                });
                this.traceLocationsParam = filteredArr;
            }
            this.traceLocationsParam = this.traceLocationsParam.concat(newStartArr);
        }
        if(newBarrArr.length > 0) {
            if(param.traceInfo.useAsBarrier === "replaceAllWith" || param.traceInfo.useAsBarrier === "replaceFirst") {
                let filteredArr = array.filter(this.traceLocationsParam, function(item){
                    return item.traceLocationType !== "barrier";
                });
                this.traceLocationsParam = filteredArr;
            }
            this.traceLocationsParam = this.traceLocationsParam.concat(newBarrArr);
        }
        if(param.traceInfo.useAsStart === "RemoveFromExisting") {
          if(param.traceInfo.startLocationLayers.length > 0) {
            for (let s of param.traceInfo.startLocationLayers) {
              for (i = 0; i < this.traceLocationsParam.length; i++) {
                let item = this.traceLocationsParam[i];
                if (item.traceLocationType === "startingPoint" && item.layerId[0] === s.layerId && parseInt(s.assetGroupCode) === parseInt(item.assetGroupCode) && parseInt(s.assetTypeCode) === parseInt(item.assetTypeCode))  {
                  this.traceLocationsParam.splice(i,1);
                  i = 0;
                }
              }
            }
          }
        }
        if(param.traceInfo.useAsBarrier === "RemoveFromExisting") {
          if(param.traceInfo.barriersLayers.length > 0) {
            for (let s of param.traceInfo.barriersLayers) {
              for (i = 0; i < this.traceLocationsParam.length; i++) {
                let item = this.traceLocationsParam[i];
                if (item.traceLocationType === "barrier" && item.layerId[0] === s.layerId && parseInt(s.assetGroupCode) === parseInt(item.assetGroupCode) && parseInt(s.assetTypeCode) === parseInt(item.assetTypeCode))  {
                  this.traceLocationsParam.splice(i,1);
                  i = 0;
                }
              }
            }
          }
        }
    },

    checkSameRecord: function(param) {
      if(param.length > 0) {
        let isSameRecord = false;
        for (let f of param) {
          isSameRecord = array.some(this.commulativeRecordSet, function(item){
            return item.globalId === f.globalId;
          });
        }
        return isSameRecord;
      } else {
        return false;
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

    drawTraceResults: function(un, traceResults, color = this.resultHighlightColor, clearGraphics = false) {
      //console.log(JSON.stringify(traceResults))
      let selectionTraceResult = this.buildTraceResults(traceResults);

      let promises = [];
      for (let layerId in selectionTraceResult.layers) {
          let layerObj = selectionTraceResult.layers[layerId];
          let subOids = this.createGroupedArray(layerObj.objectIds, this.config.QUERY_PAGE);
          subOids.forEach(oidGroup => promises.push(this.un.query(layerId, "1=1", layerObj, oidGroup.join(","))));
      }

      Promise.all(promises).then(lang.hitch(this, function(rows) {
          if (clearGraphics) this.map.graphics.clear();
          let graphics = [];
          //let geometries = [];
          //let featureLayer = this.map.byId(rows.layerId);
          for (let featureSet of rows) {
              let layerObj = featureSet.obj;
              if (featureSet.features != undefined)
                  for (let g of featureSet.features) {
                      let graphic = this.getGraphic(layerObj.type, g.geometry, color, null, this.activeTraceLocation, true);
                      //graphics.push(graphic);
                      this.map.graphics.add(graphic);
                  }
          }
          //this.map.graphics.add(graphics);
      }));
    },

    /********SUPPORT FUNCTIONS
      creating a graphic,
      generate a token,
      make http request,
      upate status
    */
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

    getGraphic: function(type, geometry, color = this.resultHighlightColor, name, flagType, isResult) {
      let symbol;
      let geometryObject = geometry;
      switch (type) {
          case "point":
            if(isResult) {
              var pntGeom = new Point(geometry.x, geometry.y, this.config.DEFAULT_SPATIAL_REFERENCE);
              var sms = new SimpleMarkerSymbol().setColor(color);
              geometryObject = pntGeom;
              symbol = sms;
            } else {
              var imgIcon = this.folderUrl + "images/startPoint.png";
              if (flagType === this.config.TRACELOCATION_START) {
                imgIcon = this.folderUrl + "images/startPoint.png";
              } else {
                imgIcon = this.folderUrl + "images/barrier.png";
              }
              var pictureMarkerSymbol = new PictureMarkerSymbol(imgIcon, 24, 24);
              symbol = pictureMarkerSymbol;
              geometryObject = geometry;
            }
            break;
          case "line":
          case "polyline":
              if(isResult) {
                var polylineJson = {
                  "paths":geometry.paths,
                  "spatialReference":this.config.DEFAULT_SPATIAL_REFERENCE
                };
                var polyline = new Polyline(polylineJson);
                geometryObject = polyline;
              } else {
                geometryObject = geometry;
              }
              var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color(color),5);
              symbol = sls;
              break;
          case "polygon":
            if(isResult) {
              var polygonJson  = {"rings":geometry.rings, "spatialReference":this.config.DEFAULT_SPATIAL_REFERENCE};
              geometryObject = new Polygon(polygonJson);
            } else {
              geometryObject = geometry;
            }
            var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
              new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color(color), 2),new Color(color)
            );
            symbol = sfs;
            break;
      }
      var graphic = new Graphic(geometryObject,symbol);
      graphic.setAttributes({"name":name});
      return graphic;
      /*
      return this.GraphicClass({
          geometry: geometryObject,
          symbol: symbol,
          name: name
      });
      */
    },

    //************ HANDLE DRAWING FUNCTIONS */
    enableCreateDrawing: function() {
      if(this.selectionMode !== "none") {
        this.disableWebMapPopup();
        var newDraw = new Draw(this.map);
        if(this.selectionMode === "point") {
          newDraw.activate(Draw.POINT);
          //var action = newDraw.create("point");
          //this.map.focus();

          // Add a graphic representing the completed polygon
          // when user double-clicks on the view or presses the "C" key
          newDraw.on("draw-complete", lang.hitch(this, function (evt) {
            this.createDrawGraphic(evt);
            newDraw.deactivate();
          }));

        } else {
          newDraw.activate(Draw.POLYGON);
          newDraw.on("draw-complete", lang.hitch(this, function (evt) {
            this.createDrawGraphic(evt);
            newDraw.deactivate();
          }));
        }
      }
    },

    createDrawGraphic: function(param){
      domAttr.set(this.btnPoint, "class", "button_nonactive");
      domAttr.set(this.btnPolygon, "class", "button_nonactive");
      if(this.selectionMode !== "none") {
        //this.map.graphics.clear();
        if(this.selectionMode === "polygon") {
          var geom = param.geometry;
        } else {
          var geom = new Point(param.geometry.x, param.geometry.y, param.geometry.spatialReference);
          var sms = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_SQUARE).setColor(new Color([255,0,0,0.5]));
          var graphic = new Graphic(geom, sms);
        }

        //this.map.graphics.add(graphic);

        this.mapClick(geom);
      }

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
      console.log(tokenTool.getPortalCredential(this.appConfig.portalUrl));
      return tokenTool.getPortalCredential(this.appConfig.portalUrl).token;
    },

    updateStatus: function(params) {
      dom.byId("lblStatus").textContent = params;
    },

    updateExportText: function(params) {
      dom.byId("lblExport").textContent = params;
    },

    exportResults: function() {
      if(this.commulativeRecordSet.length > 0) {
        var exportData = this._createCSVContent(this.commulativeRecordSet, "traceResult");
        this._exportToCSVComplete(exportData, "TraceResult");
      }
    },
    _exportToCSVComplete: function (csvdata, fileName) {
      CSVUtils._download(fileName + '.csv', csvdata);
    },

    _createCSVContent: function (results, title) {
      var deferred, csvNewLineChar, csvContent, atts, dataLine, i;
      atts = [];
      var key;
      csvNewLineChar = "\r\n";
      csvContent = title + "," + csvNewLineChar;
      if (results && results.length > 0) {
        for (key in results[0]) {
          if (results[0].hasOwnProperty(key)) {
            atts.push(key);
          }
        }
        csvContent += atts.join(",") + csvNewLineChar;
        array.forEach(results, function (feature) {
          atts = [];
          var k;
          if (feature !== null) {
            for (k in feature) {
              if (feature.hasOwnProperty(k)) {
                atts.push("\"" +
                  this._replaceDoubleQuotesInString(feature[k]) +
                  "\"");
              }
            }
          }
          dataLine = atts.join(",");
          csvContent += dataLine + csvNewLineChar;
        }, this);
        csvContent += csvNewLineChar + csvNewLineChar;
      } else {
        /*
        array.forEach(results, function (field) {
          atts.push(field.alias);
        }, this);
        csvContent += atts.join(",") + csvNewLineChar;
        */
      }
      return csvContent;
    },

    _replaceDoubleQuotesInString: function (str) {
      var result;
      result = str;
      if (str) {
        result = str.toString().replace(/\"/g, '""');
      }
      return result;
    },

    disableWebMapPopup: function () {
      var mapManager = MapManager.getInstance();
      mapManager.disableWebMapPopup();
    },
    enableWebMapPopup: function () {
      var mapManager = MapManager.getInstance();
      mapManager.enableWebMapPopup();
    },


    onOpen: function(){
      console.log('onOpen');
    },

    onClose: function(){
      this.enableWebMapPopup();
      console.log('onClose');
    },

    onMinimize: function(){
      this.enableWebMapPopup();
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    }
  });
});