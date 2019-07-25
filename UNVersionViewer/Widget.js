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
'jimu/dijit/ToggleButton',
'jimu/tokenUtils',
'jimu/LayerInfos/LayerInfos',
"esri/graphic",
"esri/geometry/Point",
"esri/symbols/SimpleMarkerSymbol",
"esri/Color",
"esri/tasks/GeometryService",
"esri/SpatialReference"
],
function(declare, BaseWidget,
  lang,
  array,
  domConstruct,
  domClass,
  domAttr,
  domStyle,
  on,
  ToggleButton,
  tokenUtils,
  LayerInfos,
  Graphic,
  Point,
  SimpleMarkerSymbol,
  Color,
  GeometryService,
  SpatialReference
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
        this._createVersionInfoRow(result);
      }));
    },

    requestStartRead: function(opts) {
      var versionStripped = opts.versionGuid.replace("{","");
      versionStripped = versionStripped.replace("}","");
      var requestURL = "https://arcgisutilitysolutionsdemo.esri.com/server/rest/services/Water_Distribution_Utility_Network/VersionManagementServer/versions/"+versionStripped+"/startReading/";
      this.requestData({method: 'POST', url:requestURL,
        params: {f : "json",
        sessionId: opts.versionGuid,
        token: this.token
      }}).then(lang.hitch(this, function(result) {
        this.requestSpecificVersion(opts);
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

    requestSpecificVersion: function(opts) {
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
        this._showDifferences(result);
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
            var VersionInfoHolder = domConstruct.create("div", {'class': 'flex-container-row bottom-padding-10'});
            domConstruct.place(VersionInfoHolder, this.UNVersionList);
            //create version info spot
            var VersionInfo = domConstruct.create("div", {'class': 'flex-container-column flex-grow-2'});
            domConstruct.place(VersionInfo, VersionInfoHolder);
            //create version toggle spot
            var VersionToggle = domConstruct.create("div", {'class': 'flex-grow-1 flex-align-end'});
            domConstruct.place(VersionToggle, VersionInfoHolder);
            this._createVersionToggle(ver,VersionToggle);
            //create version changes detail spot
            var VersionChangeDetails = domConstruct.create("div", {'class': 'flex-grow-1 flex-align-end'});
            domConstruct.place(VersionChangeDetails, VersionInfoHolder);
            //create Version info details spot
            var VersionInfoName = domConstruct.create("div", {'class': '', innerHTML: ver.versionName});
            domConstruct.place(VersionInfoName, VersionInfo);
            //create version info description spot
            var VersionInfoDesc = domConstruct.create("div", {'class': '', innerHTML: ver.description});
            domConstruct.place(VersionInfoDesc, VersionInfo);
            //create version info dates
            var VersionInfoLastUpdate = domConstruct.create("div", {'class': '', innerHTML: "modified: " + new Date(ver.modifiedDate).toDateString()});
            domConstruct.place(VersionInfoLastUpdate, VersionInfo);
          }));
        }
      }
    },
    //END CREATE VERSION ROW UI ELEMENTS

    //CREATE TOGGLE VERSION BUTTON
    _createVersionToggle: function(version, node) {
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
          this.requestStartRead(version);
        }
      })));

    },
    //END CREATE TOGGLE VERSION

    //SHOW DIFFERENCES
    _showDifferences: function(results) {
      if(results.hasOwnProperty("features")) {
        this._createGraphic(results.features);
      } else {
        if(results.success){
          alert("No difference from Default version");
        } else {
          alert("An error ocurred");
        }
      }
    },
    //END SHOW DIFFERENCES

    //SUPPORT FUNCTIONS
    generateToken: function() {
      var tokenTool = tokenUtils;
      tokenTool.portalUrl = this.appConfig.portalUrl;
      console.log(tokenTool.getPortalCredential(this.appConfig.portalUrl));
      return tokenTool.getPortalCredential(this.appConfig.portalUrl).token;
    },

    _createGraphic: function(features) {
      if(features.length > 0) {
        features.map(lang.hitch(this, function(feat) {
          if(feat.hasOwnProperty("inserts")) {
            feat.inserts.map(lang.hitch(this, function(ins) {
              if(ins.geometry.hasOwnProperty("rings")) {
                //it's a polygon
              } else if (ins.geometry.hasOwnProperty("paths")) {
                //it's a line
              } else {
                //it's a point
                var layerObj = this._lookupLayer(feat.layerId);
                var pt = new Point(ins.geometry.x, ins.geometry.y, layerObj.layerObject.spatialReference);
                var outSR = new SpatialReference(102100);
                this.gsvc.project([ pt ], outSR, lang.hitch(this,function(projectedPoints) {
                  var sms = new SimpleMarkerSymbol().setStyle(
                    SimpleMarkerSymbol.STYLE_SQUARE).setColor(
                    new Color([255,0,0,0.5]));
                  var attr = {"test":"test"};
                  var graphic = new Graphic(projectedPoints[0],sms,attr);
                  this.map.graphics.add(graphic);
                  console.log(this.map.graphics);
                }));
              }
            }));
          }
        }));
      }
    },

    _getOperationalLayers: function() {
      //need to get the layers because the version results do not have spatial reference tied to results.
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
        return ol.layerObject.layerId === layerId;
      });
      return layer[0];
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