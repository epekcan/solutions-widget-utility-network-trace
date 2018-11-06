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
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/dom',
  'dojo/on',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/dom-construct',
  'dojo/query',
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/tasks/support/Query",
  'esri/views/2d/draw/Draw',
  'jimu/tokenUtils',
  "./utilitynetwork",
  'dijit/form/TextBox',
  'dijit/form/Select'
],
function(declare,
  _WidgetBase,
  _TemplatedMixin,
  dom,
  on,
  lang,
  array,
  domAttr,
  domClass,
  domConstruct,
  domQuery,
  FeatureLayer,
  GraphicsLayer,
  Graphic,
  Query,
  Draw,
  tokenUtils,
  UtilityNetwork
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([_WidgetBase, _TemplatedMixin],{
    //Please note that the widget depends on the 4.0 API
    //please note that this property is be set by the framework when widget is loaded.
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
   // mouseHandler: null,
    traceCounter: 0,
    traceMax: 0,
    token: null,
    traceLocationsParam: [],
    tempRecordSet: null,
    commulativeRecordSet: [],
    selectionMode: "point",
    runFlag: true,
    initialRun: true,
    resultHighlightColor: [27,227,251,0.4],
    //config: JSON.parse(Configuration),

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
      this.mapView = this.sceneView;

      //load flag images
      domAttr.set(this.btnClearTraceLocations, "src", this.folderUrl + "/images/delete.png" );
      domAttr.set(this.btnStartingPoint, "src", this.folderUrl + "/images/add.png" );
      domAttr.set(this.btnBarriers, "src", this.folderUrl + "/images/add-barriers-select.png" );

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

      this.own(on(this.cmbSubnetworks, "change" , lang.hitch(this, this.cmbSubnetworksChange)));

      this.own(on(this.btnPoint, "click", lang.hitch(this, function(){
        this.selectionMode = "point";
        this.enableCreateDrawing();
        domClass.add(this.btnPoint, "active");
        domClass.remove(this.btnPolygon, "active");
      })));

      this.own(on(this.btnPolygon, "click", lang.hitch(this, function(){
        this.selectionMode = "polygon";
        this.enableCreateDrawing();
        domClass.add(this.btnPolygon, "active");
        domClass.remove(this.btnPoint, "active");
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
        this.mapView.graphics = [];
        this.gl.graphics = [];
        this.selectionMode = "none";
        this.updateStatus("");
      })));

    },

    createCustomTraceButtons: function() {
      for (var key in this.config.userTraces) {
          let container = domConstruct.create("div",{'class':'customTraceItem'}, this.customTracesHolder);
          let userTrace = domConstruct.create("div",{'class':'button_nonactive userTraces', 'innerHTML': key, 'count':this.config.userTraces[key].traces.length}, container);

          this.own(on(userTrace, "click", lang.hitch(this, function() {
            this.mapView.graphics = [];
            this.initialRun = true;
            this.traceCounter = 0;
            this.traceMax = parseInt(domAttr.get(userTrace,'count'));
            this.traceLocationsParam = [];
            this.determineTracesToRun({'groupName':domAttr.get(userTrace,'innerHTML')});
          })));
      }
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
        this._populateSubnetWorkDropdown();
      }),function (err) {console.log(err)});
    },

    loadGraphicLayer: function() {
      this.GraphicClass = Graphic;
      this.gl = new GraphicsLayer();
      this.gl.screenSizePerspectiveEnabled = true
      this.mapView.map.add(this.gl);
    },

    /*****  STARTS AND BARRIERS
    handles handles starts and barriers adding/removing
    and map action after drawing is done to get start and barriers
    *******/
    btnBarriersClick: function(params) {
      domAttr.set(this.btnStartingPoint, "class", "button_nonactive");
      domAttr.set(this.btnBarriers, "class", "button_active");
      //if (this.activeTraceLocation == undefined) {
        domQuery(".drawIconGroup").style("display", "block");
        var event = new Event('click');
        this.btnPoint.dispatchEvent(event);
        //this.mouseHandler = this.mapView.on("click", lang.hitch(this,this.mapClick));
      //}
      this.activeTraceLocation = this.config.TRACELOCATION_BARRIER;
    },

    btnStartingPointClick: function(params) {
      domAttr.set(this.btnStartingPoint, "class", "button_active");
      domAttr.set(this.btnBarriers, "class", "button_nonactive");
      //if (this.activeTraceLocation == undefined) {
        domQuery(".drawIconGroup").style("display", "block");
        var event = new Event('click');
        this.btnPoint.dispatchEvent(event);
        //this.mouseHandler = this.mapView.on("click", lang.hitch(this, this.mapClick));
      //}
      this.activeTraceLocation = this.config.TRACELOCATION_START;
    },

    mapClick: function(event) {
      let color = this.activeTraceLocation === this.config.TRACELOCATION_START ? this.config.TRACING_STARTPOINT_COLOR : this.config.TRACING_BARRIER_COLOR;
      this.un.traceControls.forEach(tc => {
      const fl = new FeatureLayer({
          url: this.un.featureServiceUrl + "/" + tc
      });
      const query = new Query();
      query.outSpatialReference = { wkid: 102100 };
      query.returnGeometry = true;
      query.outFields = [ "*" ];
      query.distance = 0.2;// previous 2 returned too much features
      query.geometry = event;
      fl.queryFeatures(query).then(lang.hitch(this, function(hitResults){
          console.log(hitResults.features);  // prints the array of features to the console
          domQuery(".traceLocations").style("display", "block");

          let supportedClasses = ["esriUNFCUTDevice", "esriUNFCUTJunction", "esriUNFCUTLine"] //, "esriUNFCUTLine" ]
          if (hitResults.features.length) {
              hitResults.features.forEach(g => {

                  let img = document.createElement("img");
                  if (this.activeTraceLocation === this.config.TRACELOCATION_START) {
                      img.src = this.folderUrl + "/images/add.png";
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
                      for (let i = 0; i < this.gl.graphics.items.length; i++) {
                          let g = this.gl.graphics.items[i];
                          if (g.name === rowTraceLocation.globalId) {
                              this.gl.remove(g);
                              break;
                          }

                      }
                      if(this.gl.graphics.items.length <= 0) {
                        domQuery(".traceLocations").style("display", "none");
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
                  //let bufferedGeo =  geometryEngineAsync.buffer(g.geometry, this.config.TRACING_STARTLOCATION_BUFFER)
                  //    .then(lang.hitch(this, function(geom){
                          this.gl.graphics.add(this.getGraphic(g.geometry.type, g.geometry, color, rowTraceLocation.globalId, this.activeTraceLocation));
                  //    }));
              })



          }

      }));
      /*
      this.mapView.hitTest({ x: event.x, y: event.y }).then(lang.hitch(this,function(hitResults) {
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
          switch(param.traceInfo.type) {
            case 'connected':
              var traceObj = this.un.connectedTrace(this.traceLocationsParam, configuration);
              break;
            case 'upstream':
              var traceObj = this.un.upstreamTrace(this.traceLocationsParam, this.config.domainNetwork, this.config.tier, "", configuration);
              break;
            case 'downstream':
              var traceObj = this.un.downstreamTrace(this.traceLocationsParam, this.config.domainNetwork, this.config.tier, "", configuration);
              break;
            case 'subnetwork':
              if (this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex] != undefined) {
                subnetworkName = this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex].textContent;
                var traceObj = this.un.subnetworkTrace(this.traceLocationsParam, this.config.domainNetwork, this.config.tier, subnetworkName, configuration);
              } else {
                var traceObj = this.un.subnetworkTrace(this.traceLocationsParam, this.config.domainNetwork, this.config.tier, "", configuration);
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
      this.mapView.graphics = [];
      let subnetworkName = this.cmbSubnetworks.options[this.cmbSubnetworks.selectedIndex].textContent;
      this.un.query(this.un.subnetLineLayerId, "SUBNETWORKNAME = '" + subnetworkName + "'")
          .then(rowsJson => {
              //let featureLayer = this.mapView.byId(this.un.subnetLineLayerId);
              //if no subnetline is found exit.
              if (rowsJson.features.length === 0)
                this.updateStatus("Subnetline feature not found. Please make sure to update all subnetworks to generate subnetline.");
              else {
                let polylineGraphic = this.getGraphic("line", rowsJson.features[0].geometry, this.resultHighlightColor, null, this.activeTraceLocation);

                this.mapView.graphics.add(polylineGraphic);
                this.mapView.goTo(polylineGraphic.geometry);
                //this.mapView.then(e => this.mapView.goTo(polylineGraphic.geometry));
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

      Promise.all(promises).then(rows => {
          if (clearGraphics) this.mapView.graphics = [];
          let graphics = [];
          //let geometries = [];
          //let featureLayer = this.mapView.byId(rows.layerId);
          for (let featureSet of rows) {
              let layerObj = featureSet.obj;
              if (featureSet.features != undefined)
                  for (let g of featureSet.features) {

                      let graphic = this.getGraphic(layerObj.type, g.geometry, color, null, this.activeTraceLocation);
                      graphics.push(graphic);
                  }
          }
          this.mapView.graphics.addMany(graphics);
      });
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

    getGraphic: function(type, geometry, color = this.resultHighlightColor, name, flagType) {
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
              if (flagType === this.config.TRACELOCATION_START) {
                symbol.url = this.folderUrl + "images/startPoint.png";
              } else {
                symbol.url = this.folderUrl + "images/barrier.png";
              }

              geometryObject = {
                  type: "point",
                  x: geometry.x,
                  y: geometry.y,
                  spatialReference: this.config.DEFAULT_SPATIAL_REFERENCE
              }
              break;
          case "line":
          case "polyline":
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

    updateStatus: function(params) {
      dom.byId("lblStatus").textContent = params;
    },

  //************ HANDLE DRAWING FUNCTIONS */
  enableCreateDrawing: function() {
    if(this.selectionMode !== "none") {
      var newDraw = new Draw({"view":this.mapView});
      if(this.selectionMode === "point") {
        var action = newDraw.create("point");
        this.mapView.focus();

        // Add a graphic representing the completed polygon
        // when user double-clicks on the view or presses the "C" key
        action.on("draw-complete", lang.hitch(this, function (evt) {
          this.createDrawGraphic({"vertices":evt, "status":"draw-complete"});
        }));

      } else {
        var action = newDraw.create("polygon");

        this.mapView.focus();
        // listen to vertex-add event on the action
        action.on("vertex-add", lang.hitch(this, function (evt) {
          this.createDrawGraphic({"vertices":evt.vertices, "status":"draw-progress"});
        }));

        // listen to cursor-update event on the action
        action.on("cursor-update", lang.hitch(this, function (evt) {
          this.createDrawGraphic({"vertices":evt.vertices, "status":"draw-progress"});
        }));

        // listen to vertex-remove event on the action
        action.on("vertex-remove", lang.hitch(this, function (evt) {
          this.createDrawGraphic({"vertices":evt.vertices, "status":"draw-progress"});
        }));
        // Add a graphic representing the completed polygon
        // when user double-clicks on the view or presses the "C" key
        action.on("draw-complete", lang.hitch(this, function (evt) {
          this.createDrawGraphic({"vertices":evt.vertices, "status":"draw-complete"});
        }));
      }
    }
  },

  createDrawGraphic: function(param){
    if(this.selectionMode !== "none") {
      this.mapView.graphics.removeAll();
      if(this.selectionMode === "polygon") {
        var geom = {
          type: "polygon", // autocasts as Polygon
          rings: param.vertices,
          spatialReference: this.mapView.spatialReference
        };
        var graphic = new Graphic({
          geometry: geom,
          symbol: {
            type: "simple-fill", // autocasts as SimpleFillSymbol
            color: "blue",
            style: "solid",
            outline: {  // autocasts as SimpleLineSymbol
              color: "white",
              width: 1
            }
          }
        });
      } else {
        var geom = {
          type: "point", // autocasts as /Point
          x: param.vertices.coordinates[0],
          y: param.vertices.coordinates[1],
          spatialReference: this.mapView.spatialReference
        };

        var graphic = new Graphic({
          geometry: geom,
          symbol: {
            type: "simple-marker", // autocasts as SimpleMarkerSymbol
            style: "square",
            color: "red",
            size: "16px",
            outline: { // autocasts as SimpleLineSymbol
              color: [255, 255, 0],
              width: 3
            }
          }
        });
      }

      this.mapView.graphics.add(graphic);

      if(param.status === "draw-complete") {
        this.mapView.graphics.removeAll();
        this.mapClick(geom);
      }
    }

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