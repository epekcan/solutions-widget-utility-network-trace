import { Component, Prop, h, State, Event, Watch } from '@stencil/core';
import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import { UnTraceHandler } from "./un-trace-handler";
import { GeometryHandler } from "./geometry_handler";
import "@esri/calcite-components";
import { defineCustomElements } from "@esri/calcite-components/dist/loader";
export class UnTraceManager {
  constructor() {
    this.host = "";
    this.name = "";
    this.appToken = "";
    this.gdbVersion = "";
    this.inTC = { tc: {}, action: "update" };
    this.runIsoTraceTwice = true;
    this.isBasic = true;
    this.searchByUser = "";
    this.traceList = [];
    this.activeStep = 1;
    this.activeTrace = null;
    this.traceResults = null;
    this.loader = false;
    this.flags = [];
    this.terminals = [];
    this.layersForFlagLookup = [];
  }
  watchHandler(newValue, oldValue, prop) {
    console.log(oldValue);
    this[prop] = newValue;
    if (prop === 'inAssets') {
      this.assetPropsChange();
    }
  }
  connectedCallback() {
    defineCustomElements(window);
  }
  componentWillLoad() {
    this.unHandler = new UnTraceHandler(this.host, this.name, this.gdbVersion, this.appToken);
    this.geometryHandler = new GeometryHandler();
    //this.unHandler.getToken().then((response:any) => {
    //  this.token = response.token;
    this.unHandler.queryDataElement().then(async (dataElement) => {
      this.controllerLayer = this.unHandler.findControllerLayer(dataElement);
      this.layersForFlagLookup = this.unHandler.queryLayersForFlag(this.controllerLayer);
      this.terminals = this.unHandler.queryATAGTerminals(this.controllerLayer);
      this.traces = await this.unHandler.getTraces();
      console.log(this.controllerLayer);
      console.log(this.layersForFlagLookup);
      console.log(this.terminals);
      console.log(this.traces);
    });
    //});
  }
  render() {
    return (h("div", { style: { display: 'flex', flexDirection: 'row', flex: "1" } },
      h("calcite-tabs", { position: "above", layout: "center" },
        h("calcite-tab-nav", { slot: "tab-nav" },
          h("calcite-tab-title", { active: true }, "Inputs"),
          h("calcite-tab-title", null, "Outputs")),
        h("calcite-tab", { active: true, style: { backgroundColor: "#f8f8f8" } },
          h("flag-handler", null),
          h("trace-selector", null),
          h("execute-handler", null)),
        h("calcite-tab", null, "output tab"))));
  }
  //Prop change updates
  assetPropsChange() {
    this.flags = [];
    if (this.inAssets.length > 0) {
      console.log(this.inAssets);
      let assetList = [];
      this.inAssets.map(async (a) => {
        if (a.layers.length > 0) {
          a.layers.map((lyr) => {
            assetList.push(this.lookupAsset(lyr, a.geometry));
          });
        }
        else {
          // only geom is provided.  do lookup
          this.layersForFlagLookup.map((lyr) => {
            const usage = lyr.utilityNetworkFeatureClassUsageType;
            if (usage === 'esriUNFCUTJunction' || usage === 'esriUNFCUTDevice' || usage === 'esriUNFCUTLine') {
              const lyrObj = { layerId: lyr.layerId, ids: [], subtypes: [] };
              assetList.push(this.lookupAsset(lyrObj, a.geometry));
            }
          });
        }
      });
      Promise.all(assetList).then((response) => {
        if (response.length > 0) {
          response.map((res) => {
            if (res.result.features.length > 0) {
              res.result.features.map(async (feat) => {
                if (res.result.geometryType === 'esriGeometryPolyline') {
                  //get percent along
                  const perct = await this.geometryHandler.getPercentageAlong(feat.geometry, res.flagGeom, res.result.spatialReference);
                  console.log(perct);
                  const flagExists = this.flags.indexOf((f) => {
                    return f.globalId === feat.attributes.globalid;
                  });
                  if (flagExists === -1) {
                    this.flags.push({ traceLocationType: 'startingPoint', globalId: feat.attributes.globalid, percentAlong: perct[0] });
                  }
                  //if line on line, send back the intersected point for flag graphic
                  if (res.flagGeom.type === "polyline") {
                    const points = await this.geometryHandler.intersectToPoint(feat.geometry, res.flagGeom, res.result.spatialReference);
                    this.emitDrawComplete.emit({ type: 'start', geometry: points });
                  }
                  else {
                    this.emitDrawComplete.emit({ type: 'start', geometry: res.flagGeom });
                  }
                }
                else if (res.result.geometryType === 'esriGeometryPoint') {
                  //get terminals
                  const terminalList = this.terminals.filter((t) => {
                    return (t.assetGroupCode === feat.attributes.assetgroup &&
                      t.assetTypeCode === feat.attributes.assettype &&
                      t.layerId === res.layerId);
                  });
                  if (terminalList.length > 0) {
                    const flagExists = this.flags.indexOf((f) => {
                      return f.globalId === feat.attributes.globalid;
                    });
                    if (flagExists === -1) {
                      this.flags.push({ traceLocationType: 'startingPoint', globalId: feat.attributes.globalid, terminal: terminalList[0].terminalConfiguration.terminals[0], allTerminals: terminalList[0].terminalConfiguration });
                      this.emitDrawComplete.emit({ type: 'start', geometry: res.flagGeom });
                    }
                  }
                }
                else {
                  //do nothing, it might be a polygon or invalid type
                }
              });
            }
          });
          setTimeout(() => {
            this.executeTrace();
          }, 1000);
        }
      });
    }
  }
  //SUPPORT FUNCTIONS
  lookupAsset(lyr, geom) {
    return new Promise(async (resolve) => {
      let geomObj = (geom) ? geom : null;
      if (geomObj !== null) {
        if (geomObj.type === "polygon") {
          //convert it to polyline and reproject it.
          const rings = geomObj.rings;
          geomObj = await this.geometryHandler.createPolyline(rings, geomObj.spatialReference.wkid);
        }
        else {
          //polyline and point, just reproject
        }
      }
      this.unHandler.queryForFeature(lyr, geomObj).then((response) => {
        //console.log(response);
        const resObj = {
          "result": response,
          "flagGeom": geomObj,
          "layerId": lyr.layerId
        };
        resolve(resObj);
      })
        .catch((e) => {
        resolve(e);
      });
    });
  }
  executeTrace() {
    if (this.traces.hasOwnProperty('traceConfigurations')) {
      if (this.traces.traceConfigurations.length > 0) {
        this.traces.traceConfigurations.map((tc) => {
          if (tc.traceType === 'isolation') {
            this.unHandler.executeTrace(tc.traceType, this.flags, '', tc.globalId).then((results) => {
              this.processResults(tc.traceConfiguration.includeIsolated, results.traceResults);
              //this.emitTraceResults.emit({isIsolated:tc.traceConfiguration.includeIsolated, results:results.traceResults});
            });
          }
        });
      }
    }
  }
  processResults(isIsolated, results) {
    if (results.hasOwnProperty("elements")) {
      if (results.elements.length > 0) {
        const grouped = [];
        results.elements.map((el) => {
          if (grouped[el.networkSourceId]) {
            grouped[el.networkSourceId].push(el.objectId);
          }
          else {
            grouped[el.networkSourceId] = [];
            grouped[el.networkSourceId].push(el.objectId);
          }
        });
        for (const key in grouped) {
          const findLayer = this.layersForFlagLookup.filter((lyr) => {
            return (lyr.sourceId === parseInt(key));
          });
          if (findLayer.length > 0) {
            const layerObj = { "layerId": findLayer[0].layerId, "subtypes": [], "ids": grouped[key] };
            this.lookupAsset(layerObj).then((results) => {
              console.log("results records");
              console.log(results);
              this.emitTraceResults.emit({ isIsolated: isIsolated, results: results });
            });
          }
        }
      }
    }
  }
  static get is() { return "un-trace-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["un-trace-manager.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["un-trace-manager.css"]
  }; }
  static get properties() { return {
    "host": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "host",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "name": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "name",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "showTerminals": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "show-terminals",
      "reflect": false
    },
    "appToken": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "app-token",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "gdbVersion": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "gdb-version",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "inAssets": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "in-assets",
      "reflect": false
    },
    "inTC": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "in-t-c",
      "reflect": false,
      "defaultValue": "{tc:{}, action:\"update\"}"
    },
    "runIsoTraceTwice": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "run-iso-trace-twice",
      "reflect": false,
      "defaultValue": "true"
    },
    "isBasic": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "is-basic",
      "reflect": false,
      "defaultValue": "true"
    }
  }; }
  static get states() { return {
    "unHandler": {},
    "geometryHandler": {},
    "searchByUser": {},
    "traceList": {},
    "activeStep": {},
    "activeTrace": {},
    "traceResults": {},
    "loader": {},
    "flags": {},
    "terminals": {},
    "layersForFlagLookup": {},
    "controllerLayer": {},
    "traces": {}
  }; }
  static get events() { return [{
      "method": "emitQueryTrace",
      "name": "emitQueryTrace",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "emitSelectedTrace",
      "name": "emitSelectedTrace",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "emitFlagChange",
      "name": "emitFlagChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "emitTraceResults",
      "name": "emitTraceResults",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "emitDrawComplete",
      "name": "emitDrawComplete",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get watchers() { return [{
      "propName": "inAssets",
      "methodName": "watchHandler"
    }]; }
}
