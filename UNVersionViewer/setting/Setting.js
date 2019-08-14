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

define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  "dijit/form/Select",
  'jimu/BaseWidgetSetting',
  'jimu/dijit/ItemSelector',
  'jimu/dijit/Popup',
  'jimu/dijit/Message',
  'jimu/dijit/Checkbox',
  'jimu/portalUtils',
  'jimu/portalUrlUtils',
  'jimu/tokenUtils',
  'jimu/Role',
  'jimu/LayerInfos/LayerInfos',
],
function(declare,
  lang,
  array,
  on,
  Select,
  BaseWidgetSetting,
  ItemSelector,
  Popup,
  Message,
  Checkbox,
  portalUtils,
  portalUrlUtils,
  tokenUtils,
  Role,
  LayerInfos
  ) {
  return declare([BaseWidgetSetting], {
    baseClass: 'UNVersionViewer-setting',
    portalUrl: null,
    portal: null,
    fsSelector: null,
    chkSwitchVersion: null,
    chkCreateVersion: null,
    tempFS: null,
    operLayerInfos: [],

    postCreate: function(){
      //the config object is passed in
      this.setConfig(this.config);
      this.portalUrl = portalUrlUtils.getStandardPortalUrl(this.appConfig.portalUrl);
      this.portal = portalUtils.getPortal(this.portalUrl);

      this._getOperationalLayers();
    },

    setConfig: function(config){
      //this.textNode.value = config.configText;
    },

    getConfig: function(){
      //WAB will get config object through this method
      if(this.operLayerInfos.length > 0) {
        return {
          serviceURL: this.fsSelector.value,
          geometryService: "https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
          allowVersionSwitch: this.chkSwitchVersion.getStatus(),
          allowVersionCreation: this.chkAllowVersionCreation.getStatus()
        };
      } else {
        new Message({
          message: "Please choose a Feature Service"
        });
      }
    },


    _createSelectionBox: function() {
      var optionChoice = [];
      this.operLayerInfos.forEach(lang.hitch(this, function(opl) {
        console.log(opl);
          var obj = {
            label: opl,
            value: opl,
            selected: (opl === this.config.serviceURL)?true:false
          };
          optionChoice.push(obj);
      }));
      var selectionBox = new Select({
        options: optionChoice
      });
      selectionBox.placeAt(this.fsChooser);
      selectionBox.startup();
      this.fsSelector = selectionBox;
    },

    _createSwitchVersionCheckbox: function() {
      var checkbox = new Checkbox({
        checked: (this.config.allowVersionSwitch)?true:false
      });
      checkbox.placeAt(this.chkAllowSwitchVersion);
      checkbox.startup();
      this.chkSwitchVersion = checkbox;
    },

    _createCreateVersionCheckbox: function() {
      var checkbox = new Checkbox({
        checked: (this.config.allowVersionCreation)?true:false
      });
      checkbox.placeAt(this.chkAllowVersionCreation);
      checkbox.startup();
      this.chkAllowVersionCreation = checkbox;
    },

    _getOperationalLayers: function() {
      //need to get the layers because the version results do not have spatial reference tied to results.
      var itemInfo = this._obtainMapLayers();
      LayerInfos.getInstance(this.map, itemInfo)
        .then(lang.hitch(this, function(operLayerInfos) {
          var filteredLayers = operLayerInfos._operLayers.filter(function(opl) {
            return(opl.url.indexOf("FeatureServer") > -1);
          });
          if(filteredLayers.length > 0) {
            array.forEach(filteredLayers, lang.hitch(this, function(fl) {
              var position = fl.url.indexOf("FeatureServer");
              var truncate = fl.url.substring(0, position+13);
              if(this.operLayerInfos.indexOf(truncate) <= -1) {
                this.operLayerInfos.push(truncate);
              }
            }));
            this._createSelectionBox();
            this._createSwitchVersionCheckbox();
            this._createCreateVersionCheckbox();
          }
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




  });
});