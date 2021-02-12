import { Prop} from '@stencil/core';
import {request} from '@esri/arcgis-rest-request';
import * as GeometryEngine from '@arcgis/core/geometry/GeometryEngine';
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
        client_id: 'yMUuCvnesE6q7Yx0',
        client_secret: '169b7867a10f4f239a7cdc2ce3a34bb4',
        grant_type: 'client_credentials',
        username: 'unadmin',
        password: 'unadmin1',
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
        params = {f : 'json', globalIds:'', creators:(searchByUser !== '')?'['+ searchByUser + ']':'', tags:'', names:'', token:token};
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
          gdbVersion:'',
          sessionId:'',
          moment:'',
          traceType: traceType,
          traceLocations: flags,
          traceConfigurationGlobalId:(typeof traceConfig === 'object' && traceConfig !== null)?'':traceId,
          traceConfiguration:(traceConfig)?traceConfig:'',
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
  queryForFeature(token, layerId:number, geom?:any, globalId?:string, gdbVersion?:string, moment?:Date): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestURL = this.host + '/server/rest/services/'+this.unName+'/FeatureServer/'+ layerId + '/query';
      let params = {};
      if(token) {
        let point: any = '';
        if(geom) {
          point = geom.x + "," + geom.y;
        }
        params = {
          f : 'json',
          where: (globalId && globalId !== '')?"globalid='" + globalId + "'":'',
          geometry: (geom && geom !== '')?point:'',
          geometryType:'esriGeometryPoint',
          outFields: "*",
          returnGeometry: true,
          gdbVersion: (gdbVersion)?gdbVersion:'sde.DEFAULT',
          historicMoment: (moment)?moment:'',
          token:token
        };
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
    //[1029437.0469165109,1859984.5320274457];

    const sourceLine = await this._createPolyline(sourceGeom, inSR);
    const padFlagXMin = flagGeom[0] - 50;
    const padFlagXMax = flagGeom[0] + 50;
    const padFlagYMin = flagGeom[1] - 50;
    const padFlagYMax = flagGeom[1] + 50;
    const newCoodsForLine = [
       [padFlagXMin,padFlagYMin],
       [padFlagXMax,padFlagYMax]
     ];
     const flagLine = await this._createPolyline(newCoodsForLine, inSR);
    const newGeom = GeometryEngine.cut(sourceLine,flagLine);
    const sourceLength = GeometryEngine.planarLength(sourceLine,'feet');
    const piece1Length = GeometryEngine.planarLength(newGeom[0],'feet');
    const percentage = piece1Length / sourceLength;
    return(percentage);
  }

  //create a polyline to use tor percentage along calculation
  async _createPolyline(geom:any, inSR:any) {
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
    return newLine;
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