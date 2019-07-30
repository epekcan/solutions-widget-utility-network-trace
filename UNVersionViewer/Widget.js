///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
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
define(['dojo/_base/declare',
'jimu/BaseWidget',
'dojo/_base/lang',
'dojo/_base/array',
'dojo/dom-construct',
'dojo/dom-class',
'dojo/dom-attr',
'dojo/dom-style',
'dojo/on',
'dojo/store/Memory',
"dijit/form/RadioButton",
"dijit/registry",
'jimu/dijit/ToggleButton',
'jimu/tokenUtils',
'jimu/LayerInfos/LayerInfos',
"esri/graphic",
"esri/geometry/Point",
"esri/geometry/Polyline",
"esri/geometry/Polygon",
"esri/symbols/SimpleMarkerSymbol",
"esri/symbols/SimpleFillSymbol",
"esri/symbols/SimpleLineSymbol",
"esri/Color",
"esri/tasks/GeometryService",
"esri/geometry/geometryEngine",
"esri/SpatialReference",
"esri/InfoTemplate"
],
function(declare, BaseWidget,
  lang,
  array,
  domConstruct,
  domClass,
  domAttr,
  domStyle,
  on,
  Memory,
  RadioButton,
  registry,
  ToggleButton,
  tokenUtils,
  LayerInfos,
  Graphic,
  Point,
  Polyline,
  Polygon,
  SimpleMarkerSymbol,
  SimpleFillSymbol,
  SimpleLineSymbol,
  Color,
  GeometryService,
  geometryEngine,
  SpatialReference,
  InfoTemplate
  ) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'UNVersionViewer',
    token:null,
    operLayerInfos: null,
    gsvc: null,
    versionDifferenceHolder : [],

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
      this.token = this.generateToken();
      this.gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

      this._getOperationalLayers();
    },

    startup: function() {
      this.inherited(arguments);
      console.log('startup');
    },

    //REQUEST FUNCTIONS
    requestAllVersions: function(opts) {
      var requestURL = "https://arcgisutilitysolutionsdemo.esri.com/server/rest/services/Water_Distribution_Utility_Network/VersionManagementServer/versionInfos";
      this.requestData({method: 'POST', url:requestURL, params: {f : "json", ownerFilter:"admin", includeHidden:true, token: this.token}}).then(lang.hitch(this, function(result) {
        console.log(result);
        this.versionDifferenceHolder = result.versions;
        this._createVersionInfoRow(result);
      }));
    },

    requestStartRead: function(opts, loadingNode, detailsNode) {
      var versionStripped = opts.versionGuid.replace("{","");
      versionStripped = versionStripped.replace("}","");
      var requestURL = "https://arcgisutilitysolutionsdemo.esri.com/server/rest/services/Water_Distribution_Utility_Network/VersionManagementServer/versions/"+versionStripped+"/startReading/";
      this.requestData({method: 'POST', url:requestURL,
        params: {f : "json",
        sessionId: opts.versionGuid,
        token: this.token
      }}).then(lang.hitch(this, function(result) {
        this.requestSpecificVersion(opts, loadingNode, detailsNode);
      }));
    },

    requestStopRead: function(opts) {
      var versionStripped = opts.versionGuid.replace("{","");
      versionStripped = versionStripped.replace("}","");
      var requestURL = "https://arcgisutilitysolutionsdemo.esri.com/server/rest/services/Water_Distribution_Utility_Network/VersionManagementServer/versions/"+versionStripped+"/stopReading/";
      this.requestData({method: 'POST', url:requestURL,
        params: {f : "json",
        sessionId: opts.versionGuid,
        token: this.token
      }}).then(lang.hitch(this, function(result) {
        //nothing
      }));
    },

    requestSpecificVersion: function(opts, loadingNode, detailsNode) {
      var versionStripped = opts.versionGuid.replace("{","");
      versionStripped = versionStripped.replace("}","");
      var requestURL = "https://arcgisutilitysolutionsdemo.esri.com/server/rest/services/Water_Distribution_Utility_Network/VersionManagementServer/versions/"+versionStripped+"/differences/";
      console.log(requestURL);
      this.requestData({method: 'POST', url:requestURL,
        params: {f : "json",
        sessionId: opts.versionGuid,
        moment: null,
        resultType: "features",
        token: this.token
      }}).then(lang.hitch(this, function(result) {
        this.requestStopRead(opts);
        console.log(result);
        this._showDifferences(result, opts, loadingNode, detailsNode);
      }));
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
    // END REQUEST FUNCTIONS

    //CREATE VERSION ROW UI ELEMENTS
    _createVersionInfoRow: function(params) {
      if(params.hasOwnProperty("success")) {
        if(params.hasOwnProperty("versions") && params.versions.length > 0) {
          params.versions.map(lang.hitch(this, function(ver) {
            var versionInfoHolder = domConstruct.create("div", {'class': 'flex-container-row bottom-padding-10'});
            domConstruct.place(versionInfoHolder, this.UNVersionList);
            //create version info spot
            var versionInfo = domConstruct.create("div", {'class': 'flex-container-column flex-grow-2'});
            domConstruct.place(versionInfo, versionInfoHolder);
            //create version loading gif spot
            var versionLoading = domConstruct.create("div", {'class': 'flex-grow-1 active-align-first noLoading'});
            domConstruct.place(versionLoading, versionInfoHolder);
            //create version active toggle spot
            var versionActiveToggle = domConstruct.create("div", {'class': 'flex-grow-1 active-align-first'});
            domConstruct.place(versionActiveToggle, versionInfoHolder);
            //create version toggle spot
            var versionToggle = domConstruct.create("div", {'class': 'flex-grow-1 flex-align-end'});
            domConstruct.place(versionToggle, versionInfoHolder);
            //create version changes detail spot
            var versionChangeDetails = domConstruct.create("div", {'class': 'flex-grow-1 details-align-end'});
            domConstruct.place(versionChangeDetails, versionInfoHolder);

            this._createVersionToggle(ver, versionToggle, versionLoading, versionChangeDetails);
            this._createActiveVersionToggle(ver, versionActiveToggle, versionLoading, versionToggle);

            //create Version info details spot
            var versionInfoName = domConstruct.create("div", {'class': '', innerHTML: ver.versionName});
            domConstruct.place(versionInfoName, versionInfo);
            //create version info description spot
            var versionInfoDesc = domConstruct.create("div", {'class': '', innerHTML: ver.description});
            domConstruct.place(versionInfoDesc, versionInfo);
            //create version info dates
            var versionInfoLastUpdate = domConstruct.create("div", {'class': '', innerHTML: "modified: " + new Date(ver.modifiedDate).toDateString()});
            domConstruct.place(versionInfoLastUpdate, versionInfo);
          }));
        }
      }
    },
    //END CREATE VERSION ROW UI ELEMENTS

    //CREATE ACTIVE VERSION BUTTON
    _createActiveVersionToggle: function(version, node, loadingNode, versionToggle) {
      var versionRadio = new RadioButton({
        checked: (version.versionName === "sde.DEFAULT")?true:false,
        value: version,
        name: "rdVersion",
      }, node);
      versionRadio.startup();
      this.own(on(versionRadio, "click", lang.hitch(this, function(val) {
        var widget = registry.byId(versionToggle.id);
        console.log(widget);
        widget.set("checked", false);
        this.switchGDBVersion(version);
      })));

    },
    //END CREATE ACTIVE VERSION

    //CREATE TOGGLE VERSION BUTTON
    _createVersionToggle: function(version, node, loadingNode, detailsNode) {
      if(version.versionName !== "sde.DEFAULT") {
        var toggleOptions = {
          toggleTips: {
            toggleOn: "Turn on version",
            toggleOff: "Turn off version"
          }
        };
        var toggleButton = new ToggleButton(toggleOptions, node);
        toggleButton.startup();
        this.own(on(toggleButton, "change", lang.hitch(this, function(val) {
          if(val) {
            domClass.remove(loadingNode, "noLoading");
            domClass.add(loadingNode, "loading");
            this.requestStartRead(version, loadingNode, detailsNode);
          } else {
            domClass.remove(detailsNode, "bgArrowRight");
            this.removeGraphic(version);
          }
        })));
      }
    },
    //END CREATE TOGGLE VERSION

    //SHOW DIFFERENCES
    _showDifferences: function(results, version, loadingNode, detailsNode) {
      domClass.remove(loadingNode, "loading");
      domClass.add(loadingNode, "noLoading");
      domClass.add(detailsNode, "bgArrowRight");
      if(results.hasOwnProperty("features")) {
        array.forEach(this.versionDifferenceHolder, lang.hitch(this, function(diffVer) {
          if(diffVer.versionGuid === version.versionGuid) {
            if(diffVer.hasOwnProperty("differenceGraphics")) {
              array.forEach(diffVer.differenceGraphics, lang.hitch(this, function(grp) {
                this.map.graphics.remove(grp);
              }));
              diffVer.differenceGraphics = [];
            } else {
              diffVer.differenceGraphics = [];
            }
            this._createGraphic(results.features, version, diffVer);
          }
        }));
        this.own(on(detailsNode, "click", lang.hitch(this, function() {
          this.createAttributeTable(results.features);
        })));
      } else {
        if(results.success){
          alert("No difference from Default version");
        } else {
          alert("An error ocurred");
        }
      }
    },
    //END SHOW DIFFERENCES

    //SWITCH FEATURE SERVICE VERSION
    switchGDBVersion: function(version) {
      console.log(version);
      array.forEach(this.operLayerInfos, lang.hitch(this, function(lyrInf) {
        lyrInf.layerObject.setGDBVersion(version.versionName);
      }));
    },
    //END SWITCH FEATURE SERVICE VERSION

    //CREATE GRAPHIC TO SHOW DIFFERENCES
    _createGraphic: function(features, diffVer) {
      if(features.length > 0) {
        features.map(lang.hitch(this, function(feat) {
          if(feat.hasOwnProperty("inserts")) {
            this._projectGeom(feat, "inserts", diffVer);
          }
          if(feat.hasOwnProperty("deletes")) {
            this._projectGeom(feat, "deletes", diffVer);
          }
          if(feat.hasOwnProperty("updates")) {
            this._projectGeom(feat, "updates", diffVer);
          }
        }));
      }
    },

    _projectGeom: function(feat, type, diffVer) {
      feat[type].map(lang.hitch(this, function(act) {
        var layerObj = this._lookupLayer(feat.layerId);
        if(typeof(layerObj) !== "undefined") {
          if(act.geometry.hasOwnProperty("rings")) {
            //it's a polygon
            var geom = new Polygon(layerObj.layerObject.spatialReference);
            geom.addRing(act.geometry.rings[0]);
          } else if (act.geometry.hasOwnProperty("paths")) {
            //it's a line
            var geom = new Polyline(layerObj.layerObject.spatialReference);
            geom.addPath(act.geometry.paths[0]);
          } else {
            //it's a point
            var geom = new Point(act.geometry.x, act.geometry.y, layerObj.layerObject.spatialReference);
          }
          var outSR = new SpatialReference(102100);
          this.gsvc.project([ geom ], outSR, lang.hitch(this,function(projected) {
            console.log(projected);
            this._createGraphicObject(projected[0], feat, act, diffVer, type);
          }));
        }
      }));
    },

    _createGraphicObject: function(geom, feat, act, diffVer, type) {
      var layerObj = this._lookupLayer(feat.layerId);
      var layerSymbol = this._lookupSymbol(layerObj, act);
      var attr = act.attributes;
      var string = "";
      for(key in attr) {
        string + string + key + " : " + attr[key] + "<br>";
      }
      var infoTemplate = new InfoTemplate("Version Changes",string);
      var graphic = new Graphic(geom,layerSymbol.symbol,attr, infoTemplate);
      var buffer = this._simpleBuffer(geom, type);
      this.map.graphics.add(buffer);
      this.map.graphics.add(graphic);
      diffVer.differenceGraphics.push(buffer);
      diffVer.differenceGraphics.push(graphic);
    },
    //END GRAPHIC FOR DIFFERENCES

    //CREATE DETAIL ATTRIBUTE TABLE
    createAttributeTable: function(features) {
      domConstruct.empty(this.UNDetailList);
      domClass.remove(this.UNDetailList, "hide");
      domClass.add(this.UNVersionList, "hide");
      console.log(features);
      var header = domConstruct.create("div", {'class': 'flex-container-row flex-grow-2 bottom-padding-10'});
      domConstruct.place(header, this.UNDetailList);

      var returnBack = domConstruct.create("div", {'class': 'flex-grow-1 details-align-end bgArrowLeft'});
      domConstruct.place(returnBack, header);
      this.own(on(returnBack, "click", lang.hitch(this, function() {
        this.closeDetailsPanel();
      })));

      var returnMessage = domConstruct.create("div", {'class': 'flex-grow-2 alignCenter', innerHTML:"Back to Version List"});
      domConstruct.place(returnMessage, header);

      var recordsHolder = domConstruct.create("div", {'class': 'flex-container-column'});
      domConstruct.place(recordsHolder, this.UNDetailList);

      var sortHolder = domConstruct.create("div", {'class': 'flex-grow-1 details-align-end cud'});
      domConstruct.place(sortHolder, header);
      this.own(on(sortHolder, "click", lang.hitch(this, function() {
        var sort = "cud";
        if (domClass.contains(sortHolder, "cud")){
          sort = "date";
          domClass.remove(sortHolder, "cud");
          domClass.add(sortHolder, "calendar");
        } else {
          sort = "cud";
          domClass.add(sortHolder, "cud");
          domClass.remove(sortHolder, "calendar");
        }
        this._featuredModifiedLayer(features, recordsHolder, sort);
      })));

      this._featuredModifiedLayer(features, recordsHolder, "cud");
    },

    _featuredModifiedLayer: function(features, recordsHolder, sort) {
      domConstruct.empty(recordsHolder);
      array.forEach(features, lang.hitch(this, function(feats) {
        var transactionLog = [];
        var layerObj = this._lookupLayer(feats.layerId);
        if(feats.hasOwnProperty("inserts")) {
          array.forEach(feats.inserts, lang.hitch(this, function(act) {
            act.type = "Insert";
            transactionLog.push(act);
          }));
        }
        if(feats.hasOwnProperty("updates")) {
          array.forEach(feats.updates, lang.hitch(this, function(act) {
            act.type = "Update";
            transactionLog.push(act);
          }));
        }
        if(feats.hasOwnProperty("deletes")) {
          array.forEach(feats.deletes, lang.hitch(this, function(act) {
            act.type = "Delete";
            transactionLog.push(act);
          }));
        }

        if(sort !== "cud") {
          transactionLog.sort(this._compareValues("lastupdate", "desc"));
        }

        var versionLayer = domConstruct.create("div", {'class': 'flex-container-row bottom-padding-10 underlineTopBorder'});
        domConstruct.place(versionLayer, recordsHolder);

        var descriptionHolder = domConstruct.create("div", {'class': 'flex-container-column flex-grow-2',
          innerHTML: (typeof(layerObj) !== "undefined")?(layerObj.layerObject.description)?layerObj.layerObject.description:feats.layerId:feats.layerId
        });
        domConstruct.place(descriptionHolder, versionLayer);

        this._featureModifiedRows(transactionLog, layerObj, recordsHolder);
      }));
    },

    _featureModifiedRows: function(feature, layerObj, recordsHolder) {
      array.forEach(feature, lang.hitch(this, function(feature, i) {
        var borderCSS = "leftBorder" + feature.type;
        var rowCSS = (i % 2 === 0)?"bgRowColor":"";
        var subType = this._lookupSubType(layerObj, feature.attributes.assetgroup);
        var versionInfoHolder = domConstruct.create("div", {'class': 'flex-container-row ' + rowCSS + ' ' + borderCSS});
        domConstruct.place(versionInfoHolder, recordsHolder);
        //create version info spot
        var versionInfo = domConstruct.create("div", {
          'class': 'flex-container-column flex-grow-2',
          innerHTML:(subType !== null)?subType.name:feature.attributes.objectid
        });
        domConstruct.place(versionInfo, versionInfoHolder);
        var dateInfo = domConstruct.create("div", {
          'class': 'flex-container-column flex-grow-2',
          innerHTML:new Date(feature.attributes.lastupdate).toDateString()
        });
        domConstruct.place(dateInfo, versionInfoHolder);
        //create zoom to record spot
        var versionZoom = domConstruct.create("div", {'class': 'flex-grow-1 details-align-end bgZoom'});
        domConstruct.place(versionZoom, versionInfoHolder);
        this.own(on(versionZoom, "click", lang.hitch(this, function() {
          this.zoomToFeature(feature, layerObj);
        })));
        var spacer = domConstruct.create("div", {'class': 'flex-container-row bottom-padding-10'});
        domConstruct.place(spacer, recordsHolder);
      }));
    },
    //END CREATE DETAIL ATTRIBUTE TABLE

    //ZOOM TO MODIFIED FEATURE
    zoomToFeature: function(feature, layerObj) {
      if(feature.geometry.hasOwnProperty("rings")) {
        //it's a polygon
        var geom = new Polygon(layerObj.layerObject.spatialReference);
        geom.addRing(feature.geometry.rings[0]);
      } else if (feature.geometry.hasOwnProperty("paths")) {
        //it's a line
        var geom = new Polyline(layerObj.layerObject.spatialReference);
        geom.addPath(feature.geometry.paths[0]);
      } else {
        //it's a point
        var geom = new Point(feature.geometry.x, feature.geometry.y, layerObj.layerObject.spatialReference);
      }
      var outSR = new SpatialReference(102100);
      this.gsvc.project([ geom ], outSR, lang.hitch(this,function(projected) {
        var buffer = geometryEngine.buffer(projected[0], 50, "feet");
        this.map.setExtent(buffer.getExtent());
      }));
    },
    //END ZOOM TO MODIFIED FEATURE


    //SUPPORT FUNCTIONS
    generateToken: function() {
      var tokenTool = tokenUtils;
      tokenTool.portalUrl = this.appConfig.portalUrl;
      console.log(tokenTool.getPortalCredential(this.appConfig.portalUrl));
      return tokenTool.getPortalCredential(this.appConfig.portalUrl).token;
    },

    _getOperationalLayers: function() {
      //need to get the layers because the version results do not have spatial reference tied to results.
      console.log(this.map.graphicsLayerIds);
      var itemInfo = this._obtainMapLayers();
      LayerInfos.getInstance(this.map, itemInfo)
        .then(lang.hitch(this, function(operLayerInfos) {
          this.operLayerInfos = operLayerInfos._operLayers;
          console.log(this.operLayerInfos);
          this.requestAllVersions(null);
        }));
    },

    _obtainMapLayers: function() {
      // summary:
      //    obtain basemap layers and operational layers if the map is not webmap.
      var basemapLayers = [],
        operLayers = [];
      // emulate a webmapItemInfo.
      var retObj = {
        itemData: {
          baseMap: {
            baseMapLayers: []
          },
          operationalLayers: []
        }
      };
      array.forEach(this.map.graphicsLayerIds, function(layerId) {
        var layer = this.map.getLayer(layerId);
        if (layer.isOperationalLayer) {
          operLayers.push({
            layerObject: layer,
            title: layer.label || layer.title || layer.name || layer.id || " ",
            id: layer.id || " "
          });
        }
      }, this);
      array.forEach(this.map.layerIds, function(layerId) {
        var layer = this.map.getLayer(layerId);
        if (layer.isOperationalLayer) {
          operLayers.push({
            layerObject: layer,
            title: layer.label || layer.title || layer.name || layer.id || " ",
            id: layer.id || " "
          });
        } else {
          basemapLayers.push({
            layerObject: layer,
            id: layer.id || " "
          });
        }
      }, this);

      retObj.itemData.baseMap.baseMapLayers = basemapLayers;
      retObj.itemData.operationalLayers = operLayers;
      return retObj;
    },

    _lookupLayer: function(layerId) {
      var layer = this.operLayerInfos.filter(function(ol) {
        if(typeof(ol.layerObject.layerId) !== "undefined") {
          return parseInt(ol.layerObject.layerId) === parseInt(layerId);
        }
      });
      return layer[0];
    },

    _lookupSymbol: function(layer, feat) {
      var symbols = layer.layerObject.renderer.infos;
      var symbol = symbols.filter(function(sym) {
        return parseInt(sym.value) === parseInt(feat.attributes.assetgroup);
      });
      if(symbol.length > 0) {
        return symbol[0];
      } else {
        return symbol;
      }
    },

    _lookupSubType: function(layerObj, code) {
      if(typeof(layerObj) !== "undefined"){
        if(layerObj.layerObject.hasOwnProperty("types")){
          var subType = layerObj.layerObject.types.filter(function(lyr) {
            return(parseInt(lyr.id) === parseInt(code));
          });
          if(subType.length > 0) {
            return subType[0];
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    },

    _simpleBuffer: function(geom, type) {
      var buffer = geometryEngine.buffer(geom, 50, "feet");
      var color = [0,255,0,0.25];
      if(type === "deletes") {
        color = [255,0,0,0.25];
      } else if(type === "updates") {
        color = [255,255,0,0.50];
      } else {
        color = [0,255,0,0.25];
      }
      var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new Color(color), 3),new Color(color)
      );
      var graphic = new Graphic(buffer,sfs);
      return graphic;
    },

    removeGraphic: function(version) {
      array.forEach(this.versionDifferenceHolder, lang.hitch(this, function(diffVer) {
        if(diffVer.versionGuid === version.versionGuid) {
          if(diffVer.hasOwnProperty("differenceGraphics")) {
            array.forEach(diffVer.differenceGraphics, lang.hitch(this, function(grp) {
              this.map.graphics.remove(grp);
            }));
            diffVer.differenceGraphics = [];
          } else {
            diffVer.differenceGraphics = [];
          }
        }
      }));
    },

    closeDetailsPanel: function() {
      domClass.add(this.UNDetailList, "hide");
      domClass.remove(this.UNVersionList, "hide");
    },

    _compareValues: function(key, order='asc') {
      return function(a, b) {
        if(!a.attributes.hasOwnProperty(key) || !b.attributes.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = (typeof a.attributes[key] === 'string') ?a.attributes[key].toUpperCase() : a.attributes[key];
        const varB = (typeof b.attributes[key] === 'string') ?b.attributes[key].toUpperCase() : b.attributes[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order == 'desc') ? (comparison * -1) : comparison
        );
      };
    },
    //END SUPPORT FUNCTIONS

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
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    },

    showVertexCount: function(count){
      this.vertexCount.innerHTML = 'The vertex count is: ' + count;
    }
  });
});