import { Prop} from '@stencil/core';
import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import {request} from '@esri/arcgis-rest-request';
import * as GeometryEngine from '@arcgis/core/geometry/GeometryEngine';
import * as projection from "@arcgis/core/geometry/projection";
//import * as Polyline from '@arcgis/core/geometry/Polyline';

export class UnTraceHandler {
  host="";
  unName="";
  constructor(host, name) {
    this.host = host;
    this.unName = name;
  }

  getToken() {
    return new Promise((resolve: any, reject: any) => {
      const requestURL = this.host + '/portal/sharing/rest/generateToken';
      const params = {
        client_id: 'b97taLpupCPAd4AH',
        client_secret: '164fbefcfe204fd99fcc2bd8798921d5',
        grant_type: 'client_credentials',
        username: 'admin',
        password: 'esri.agp',
        referer: 'http://pwonglap.esri.com:3333'
      };

      //username: 'pwong1',
      //password: 'pwong1.109',

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

  getTraces(token:string, searchByUser?:string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/UtilityNetworkServer/traceConfigurations/query';
      let params = {};
      if(token) {
        if(searchByUser) {
          params = {f : 'json', globalIds:'', creators:(searchByUser !== '')?'['+ searchByUser + ']':'', tags:'', names:'', token:token};
        } else {
          params = {f : 'json', globalIds:'', creators:'', tags:'', names:'', token:token};
        }
      } else {
        resolve(false);
      }
      this._request({method: 'POST', url:requestURL, params: params})
      .then((result:any) => {
        if(result.hasOwnProperty('error')) {
          resolve([]);
        } else {
          resolve(result);
        }
      })
      .catch((e:any) => {
        resolve(e);
      });
    });
  }

  executeTrace(token: string, traceType:string, flags:Array<any>, traceConfig?:any, traceId?:string): Promise<any> {
    //traceConfigurationGlobalId:'{80DDAE15-2720-49CA-971F-FBA76AEBC075}'
    //with barriers
    //'[{'traceLocationType':'startingPoint','globalId':'{DB331F49-422D-4067-992E-8091D11E479C}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{24787450-40BE-44A3-BF1A-2F90630C5DD1}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{309C3A4B-CC00-4393-8724-6DA5075BCB16}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{074001AE-6A01-4440-A234-9A85C1F93740}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{29A7D702-FBB2-46DF-A0FA-99F4D9615BEE}','percentAlong':0.5}]'
    //just start
    ////'[{'traceLocationType':'startingPoint','globalId':'{DB331F49-422D-4067-992E-8091D11E479C}','percentAlong':0.5}]'
    return new Promise((resolve, reject) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/UtilityNetworkServer/trace';
      let params = {};
      if(token) {
        params = {
          f : 'json',
          gdbVersion:'sde.DEFAULT',
          sessionId:'',
          moment:'',
          traceType: traceType,
          traceLocations: JSON.stringify(flags),
          traceConfigurationGlobalId:(typeof traceConfig === 'object' && traceConfig !== null  && traceConfig !== '')?'':traceId,
          traceConfiguration:(traceConfig)?JSON.stringify(traceConfig):'',
          token:token
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

  //SUPPORT FUNCTIONS
  //Switches the parameter for isolation trace so it can be ran twice
  switchIsoTraceParameter(traceType:string, traceConfig:any) {
    let updatedConfig = traceConfig;
    if(traceType === 'isolation') {
      if (updatedConfig.includeIsolated) {
        updatedConfig.includeIsolated = false;
      } else {
        updatedConfig.includeIsolated = true;
      }
    }
    return updatedConfig;
  }

  //query for feature to use for various functions such as percentage along and terminal config
  queryForFeature(token, layer?:any, geom?:any, gdbVersion?:string, moment?:Date): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/FeatureServer/'+ layer.layerId + '/query';
      let params = {};
      if(token) {
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
              geomObj = this._createBuffer(geom);
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
          gdbVersion: (gdbVersion)?gdbVersion:'sde.DEFAULT',
          historicMoment: (moment)?moment:'',
          token:token
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

  // calculate the percentage of where user clicked on the line
  async getPercentageAlong(sourceGeom:any, flagGeom:any, inSR:any) {
    let flagLine = flagGeom;
    const sourceLine = await this._createPolyline(sourceGeom.paths, inSR.wkid);
    if(flagGeom.type === 'point') {
      const padFlagXMin = flagGeom.x - 50;
      const padFlagXMax = flagGeom.x + 50;
      const padFlagYMin = flagGeom.y - 50;
      const padFlagYMax = flagGeom.y + 50;
      const newCoodsForLine = [
         [padFlagXMin,padFlagYMin],
         [padFlagXMax,padFlagYMax]
       ];
      flagLine = await this._createPolyline(newCoodsForLine, flagGeom.spatialReference.wkid);
      if(!projection.isLoaded()) {
        await projection.load();
      }
      const projGeom = projection.project(flagLine, inSR);
      flagLine = projGeom;
      const newGeom = GeometryEngine.cut(sourceLine,flagLine);
      if(newGeom.length > 0) {
        const sourceLength = GeometryEngine.planarLength(sourceLine,'feet');
        const piece1Length = GeometryEngine.planarLength(newGeom[0],'feet');
        const percentage = piece1Length / sourceLength;
        return(percentage);
      } else {
        return(0.5);
      }
    } else {
      //it's a line, reproject it
      if(!projection.isLoaded()) {
        await projection.load();
      }
      const projGeom = projection.project(flagGeom, inSR);
      flagLine = projGeom;
      const newGeom = GeometryEngine.cut(sourceLine,flagLine);
      if(newGeom.length > 0) {
        const sourceLength = GeometryEngine.planarLength(sourceLine,'feet');
        const piece1Length = GeometryEngine.planarLength(newGeom[0],'feet');
        const percentage = piece1Length / sourceLength;
        return(percentage);
      } else {
        return(0.5);
      }
    }
  }

  //create a polyline to use tor percentage along calculation
  async _createPolyline(geom:any, inSR:any) {
    //return new Promise(async(resolve, reject) => {
      const [
        {default: Polyline}
      ] = await Promise.all([
        import('@arcgis/core/geometry/Polyline')
      ]);
      const newLine = new Polyline({
        hasZ: false,
        hasM: true,
        paths: geom,
        spatialReference: { wkid: inSR }
      });
      return(newLine);
    //});
  }

  //create a buffer for clicked point
  _createBuffer(geom:any) {
    return GeometryEngine.buffer(geom, 25, 'feet');
  }

  //queryDataElement for various uses
  queryDataElement(token:string) {
    return new Promise((resolve: any, reject: any) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/FeatureServer/queryDataElements';
      let params = {};
      if(token) {
        params = {f : 'json', token:token};
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
      return lde.dataElement.hasOwnProperty('domainNetworks');
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

  async projectGeometry(sourceGeom:any, targetSR:any) {
    if(!projection.isLoaded()) {
      await projection.load();
    }
    const projGeom = projection.project(sourceGeom, targetSR);
    return projGeom;
  }


  _request(requestObj:any): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
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