import {State} from '@stencil/core';
import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import {request} from '@esri/arcgis-rest-request';
import {GeometryHandler} from "./geometry_handler";
//@ts-ignore
import { loadModules } from "https://unpkg.com/esri-loader@3.1.0/dist/esm/esri-loader.js";
import "http://pwonglap.esri.com/arcgis-js-api/test-apps/dojo-config.js";
//import "http://pwonglap.esri.com/arcgis-js-api/dojo/dojo.js";

const options = {url:"http://pwonglap.esri.com/arcgis-js-api/dojo/dojo.js" };
const options2 = {url: "https://js.arcgis.com/4.19/"}

export class UnTraceHandler {
  host:string = '';
  unName:string = '';
  gdbVersion:string = '';
  webmap: string = '';
  token:string = '';
  un: any;
  mapObj: any;
  mapViewObj: any;
  constructor(host, name, gdbVersion, webmap, token?) {
    this.host = host;
    this.unName = name;
    this.gdbVersion = gdbVersion;
    this.webmap = webmap;
    this.token = token;
  }
  geometryHandler = new GeometryHandler();

  /*******  JS API UN */
  load() {
    return new Promise((resolve: any) => {
      loadModules(["esri/WebMap", "esri/views/MapView"], options)
      .then(([WebMap, MapView]) => {
        // create map with the given options at a DOM node w/ id 'mapNode'
        let webmap = new WebMap.default({
          portalItem: {
            id: this.webmap,
            portal: {url: this.host + "/portal"}
          }
        });

        this.mapViewObj = new MapView.default({
          map: webmap
        });

        webmap.load().then(() => {
          this.mapObj = webmap;
          this.un = webmap.utilityNetworks.getItemAt(0);
            this.un.load().then(() => {
              resolve(this.un);
            });
        });

      })
   })
  }

  queryAssetByGeom(geom:any) {
    //this.mapViewObj.hitTest(screenPoint).then((results:any) => {
    //  console.log(results);
    //});
    return new Promise((resolve: any) => {
      //const point = this.mapViewObj.toMap(validScrPoint);
      this.mapObj.layers.map((lyr:any) => {
        if(lyr.type === 'feature') {
          if(lyr.title === 'Water Line') {
            lyr.queryFeatures({
              geometry: geom,
              // distance and units will be null if basic query selected
              distance: 10,
              units: 'feet',
              spatialRelationship: "intersects",
              returnGeometry: true,
              returnQueryGeometry: true,
              outFields: ["*"],
            })
            .then(function(featureSet) {
              // set graphic location to mouse pointer and add to mapview
              resolve(featureSet.features);
            });
          }
        }
      });
    })

  }


  /************ END JS API UN */

  executeTrace(traceType:string, flags:Array<any>, traceConfig?:any, traceId?:string): Promise<any> {
    //traceConfigurationGlobalId:'{80DDAE15-2720-49CA-971F-FBA76AEBC075}'
    //with barriers
    //'[{'traceLocationType':'startingPoint','globalId':'{DB331F49-422D-4067-992E-8091D11E479C}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{24787450-40BE-44A3-BF1A-2F90630C5DD1}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{309C3A4B-CC00-4393-8724-6DA5075BCB16}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{074001AE-6A01-4440-A234-9A85C1F93740}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{29A7D702-FBB2-46DF-A0FA-99F4D9615BEE}','percentAlong':0.5}]'
    //just start
    ////'[{'traceLocationType':'startingPoint','globalId':'{DB331F49-422D-4067-992E-8091D11E479C}','percentAlong':0.5}]'
    return new Promise((resolve) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/UtilityNetworkServer/trace';
      let params = {};
      if(this.token !== '') {
        params = {
          f : 'json',
          gdbVersion:(this.gdbVersion !== '')?this.gdbVersion:'sde.DEFAULT',
          sessionId:'',
          moment:'',
          traceType: traceType,
          traceLocations: JSON.stringify(flags),
          traceConfigurationGlobalId:(typeof traceConfig === 'object' && traceConfig !== null  && traceConfig !== '')?'':traceId,
          traceConfiguration:(traceConfig)?JSON.stringify(traceConfig):'',
          token:this.token
        };
      } else {
        resolve(false);
      }
      //requestURL = requestURL + 'VersionManagementServer/versions';
      this._request({method: 'POST', url:requestURL, params: params})
      .then(async(result:any) => {
        if(result.hasOwnProperty('error')) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
      .catch((e:any) => {
        resolve(e);
      });
    });
  }

  //query for feature to use for various functions such as percentage along and terminal config
  queryForFeature2(layer?:any, geom?:any, moment?:string): Promise<any> {
    return new Promise((resolve) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/FeatureServer/'+ layer.layerId + '/query';
      let params = {};
      if(this.token !== '') {
        let geomObj: any = '';
        let geometryType: string = 'esriGeometryPoint';
        let whereClause:string = '';
        let objectIds = [];
        if(layer.ids.length > 0) {
          objectIds = layer.ids;
        } else {
          if(geom) {
            //line for outage area
            if(geom.type === "polyline") {
              geomObj = geom;
              geometryType = 'esriGeometryPolyline';
            } else {
              //it's leak point, buffer it
              geomObj = this.geometryHandler.createBuffer(geom, 25, 'feet');
              geometryType = 'esriGeometryPolygon';
            }
          }
          if(layer.subtypes.length > 0) {
            whereClause = 'assetgroup in (' + layer.subtypes.join(",") + ')';
          }
        }
        params = {
          f : 'json',
          objectids: (objectIds.length > 0)?objectIds.join(","):'',
          where: whereClause,
          geometry: (objectIds.length === 0)?(geom && geom !== '')?JSON.stringify(geomObj):'':'',
          geometryType: geometryType,
          outFields: "*",
          returnGeometry: true,
          gdbVersion:(this.gdbVersion !== '')?this.gdbVersion:'sde.DEFAULT',
          historicMoment: (moment)?moment:'',
          token:this.token
        };
        //console.log(params);
        //console.log(requestURL);
      } else {
        resolve(false);
      }
      this._request({method: 'POST', url:requestURL, params: params})
      .then(async(result:any) => {
        if(result.hasOwnProperty('error')) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
      .catch((e:any) => {
        resolve(e);
      });
    });
  }

  //queryDataElement for various uses
  queryDataElement() {
    return new Promise((resolve: any) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/FeatureServer/queryDataElements';
      let params = {};
      if(this.token !== '') {
        params = {f : 'json', token:this.token};
      } else {
        resolve(false);
      }
      //requestURL = requestURL + 'VersionManagementServer/versions';
      this._request({method: 'POST', url:requestURL, params: params})
      .then((result:any) => {
        if(result.hasOwnProperty('error')) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
      .catch((e:any) => {
        resolve(e);
      });
    });
  }

  findControllerLayer(de:any) {
    let controller = {};
    const unLayer = de.layerDataElements.filter((lde:any) => {
      return lde.dataElement.hasOwnProperty('domainNetworks') || lde.dataElement.hasOwnProperty('networkAttributes');
    });
    if(unLayer.length > 0) {
      controller = unLayer[0];
    }
    return controller;
  }

  queryLayersForFlag(controller:any) {
    let layers = [];
    const validNetwork = controller.dataElement.domainNetworks.filter((dn:any) => {
      return dn.subnetworkLayerId !== -1;
    });
    if(validNetwork.length > 0) {
      validNetwork.map((n:any) => {
        n.edgeSources.map((es:any) => {
          layers.push(es);
        });
        n.junctionSources.map((js:any) => {
          layers.push(js);
        });
      });
    }
    return layers;
  }

  queryATAGTerminals(controller:any) {
    let terminals = [];
    const commodities = controller.dataElement.domainNetworks.filter((dn:any) => {
      return dn.subnetworkLayerId !== -1;
    });
    if(commodities.length > 0) {
      commodities.map((c:any) => {
        const juncList = this._getTerminalSources(controller, c, "junctionSources");
        const edgeList = this._getTerminalSources(controller, c, "edgeSources");
        terminals = terminals.concat(juncList, edgeList);
      });
    }
    return terminals;
  }

  _getTerminalSources(controller:any, domain:any, sourceType: string) {
    const sources = [];
    domain[sourceType].map((js:any) => {
      js.assetGroups.map((ag:any) => {
        ag.assetTypes.map((at:any) => {
          if(at.isTerminalConfigurationSupported) {
            const termConf = this._getTerminalConfig(controller, at.terminalConfigurationId);
            sources.push({
              domainId: domain.domainNetworkId,
              domain: domain.domainNetworkName,
              layerId: js.layerId,
              sourceId: js.sourceId,
              assetGroupCode: ag.assetGroupCode,
              assetGroupName: ag.assetGroupName,
              assetTypeCode: at.assetTypeCode,
              assetTypeName: at.assetTypeName,
              terminalConfiguration: termConf
            });
          }
        });
      });
    });
    return sources;
  }

  _getTerminalConfig(controller: any, terminalId: number) {
    const termConf = controller.dataElement.terminalConfigurations.filter((tc:any) => {
      return tc.terminalConfigurationId === terminalId;
    });
    if(termConf.length > 0) {
      return termConf[0];
    } else {
      return {};
    }
  }

  _request(requestObj:any): Promise<any> {
    return new Promise((resolve: any) => {
      request(requestObj.url, {
        params: requestObj.params
      }).then((response:any) => {
        resolve(response);
      })
      .catch((e:any) => {
        resolve(e);
      })
    });
  }


}