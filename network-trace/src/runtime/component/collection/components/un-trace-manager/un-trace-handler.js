import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import { request } from '@esri/arcgis-rest-request';
import { GeometryHandler } from "./geometry_handler";
export class UnTraceHandler {
  constructor(host, name, gdbVersion, token) {
    this.host = '';
    this.unName = '';
    this.gdbVersion = '';
    this.token = '';
    this.geometryHandler = new GeometryHandler();
    this.host = host;
    this.unName = name;
    this.gdbVersion = gdbVersion;
    this.token = token;
  }
  getToken() {
    return new Promise((resolve) => {
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
      this._request({ method: 'POST', url: requestURL, params: params })
        .then((result) => {
        if (result.hasOwnProperty('error')) {
          resolve(false);
        }
        else {
          resolve(result);
        }
      })
        .catch((e) => {
        resolve(e);
      });
    });
  }
  getTraces(searchByUser) {
    return new Promise((resolve) => {
      const requestURL = this.host + '/server/rest/services/' + this.unName + '/UtilityNetworkServer/traceConfigurations/query';
      let params = {};
      if (this.token !== '') {
        if (searchByUser) {
          params = { f: 'json', globalIds: '', creators: (searchByUser !== '') ? '[' + searchByUser + ']' : '', tags: '', names: '', token: this.token };
        }
        else {
          params = { f: 'json', globalIds: '', creators: '', tags: '', names: '', token: this.token };
        }
      }
      else {
        resolve(false);
      }
      this._request({ method: 'POST', url: requestURL, params: params })
        .then((result) => {
        if (result.hasOwnProperty('error')) {
          resolve([]);
        }
        else {
          resolve(result);
        }
      })
        .catch((e) => {
        resolve(e);
      });
    });
  }
  executeTrace(traceType, flags, traceConfig, traceId) {
    //traceConfigurationGlobalId:'{80DDAE15-2720-49CA-971F-FBA76AEBC075}'
    //with barriers
    //'[{'traceLocationType':'startingPoint','globalId':'{DB331F49-422D-4067-992E-8091D11E479C}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{24787450-40BE-44A3-BF1A-2F90630C5DD1}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{309C3A4B-CC00-4393-8724-6DA5075BCB16}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{074001AE-6A01-4440-A234-9A85C1F93740}','percentAlong':0.5},{'traceLocationType':'barrier','globalId':'{29A7D702-FBB2-46DF-A0FA-99F4D9615BEE}','percentAlong':0.5}]'
    //just start
    ////'[{'traceLocationType':'startingPoint','globalId':'{DB331F49-422D-4067-992E-8091D11E479C}','percentAlong':0.5}]'
    return new Promise((resolve) => {
      const requestURL = this.host + '/server/rest/services/' + this.unName + '/UtilityNetworkServer/trace';
      let params = {};
      if (this.token !== '') {
        params = {
          f: 'json',
          gdbVersion: (this.gdbVersion !== '') ? this.gdbVersion : 'sde.DEFAULT',
          sessionId: '',
          moment: '',
          traceType: traceType,
          traceLocations: JSON.stringify(flags),
          traceConfigurationGlobalId: (typeof traceConfig === 'object' && traceConfig !== null && traceConfig !== '') ? '' : traceId,
          traceConfiguration: (traceConfig) ? JSON.stringify(traceConfig) : '',
          token: this.token
        };
      }
      else {
        resolve(false);
      }
      //requestURL = requestURL + 'VersionManagementServer/versions';
      this._request({ method: 'POST', url: requestURL, params: params })
        .then(async (result) => {
        if (result.hasOwnProperty('error')) {
          resolve(false);
        }
        else {
          resolve(result);
        }
      })
        .catch((e) => {
        resolve(e);
      });
    });
  }
  //query for feature to use for various functions such as percentage along and terminal config
  queryForFeature(layer, geom, moment) {
    return new Promise((resolve) => {
      const requestURL = this.host + '/server/rest/services/' + this.unName + '/FeatureServer/' + layer.layerId + '/query';
      let params = {};
      if (this.token !== '') {
        let geomObj = '';
        let geometryType = 'esriGeometryPoint';
        let whereClause = '';
        let objectIds = [];
        if (layer.ids.length > 0) {
          objectIds = layer.ids;
        }
        else {
          if (geom) {
            //line for outage area
            if (geom.type === "polyline") {
              geomObj = geom;
              geometryType = 'esriGeometryPolyline';
            }
            else {
              //it's leak point, buffer it
              geomObj = this.geometryHandler.createBuffer(geom, 25, 'feet');
              geometryType = 'esriGeometryPolygon';
            }
          }
          if (layer.subtypes.length > 0) {
            whereClause = 'assetgroup in (' + layer.subtypes.join(",") + ')';
          }
        }
        params = {
          f: 'json',
          objectids: (objectIds.length > 0) ? objectIds.join(",") : '',
          where: whereClause,
          geometry: (objectIds.length === 0) ? (geom && geom !== '') ? JSON.stringify(geomObj) : '' : '',
          geometryType: geometryType,
          outFields: "*",
          returnGeometry: true,
          gdbVersion: (this.gdbVersion !== '') ? this.gdbVersion : 'sde.DEFAULT',
          historicMoment: (moment) ? moment : '',
          token: this.token
        };
        //console.log(params);
        //console.log(requestURL);
      }
      else {
        resolve(false);
      }
      this._request({ method: 'POST', url: requestURL, params: params })
        .then(async (result) => {
        if (result.hasOwnProperty('error')) {
          resolve(false);
        }
        else {
          resolve(result);
        }
      })
        .catch((e) => {
        resolve(e);
      });
    });
  }
  //queryDataElement for various uses
  queryDataElement() {
    return new Promise((resolve) => {
      const requestURL = this.host + '/server/rest/services/' + this.unName + '/FeatureServer/queryDataElements';
      let params = {};
      if (this.token !== '') {
        params = { f: 'json', token: this.token };
      }
      else {
        resolve(false);
      }
      //requestURL = requestURL + 'VersionManagementServer/versions';
      this._request({ method: 'POST', url: requestURL, params: params })
        .then((result) => {
        if (result.hasOwnProperty('error')) {
          resolve(false);
        }
        else {
          resolve(result);
        }
      })
        .catch((e) => {
        resolve(e);
      });
    });
  }
  findControllerLayer(de) {
    let controller = {};
    const unLayer = de.layerDataElements.filter((lde) => {
      return lde.dataElement.hasOwnProperty('domainNetworks');
    });
    if (unLayer.length > 0) {
      controller = unLayer[0];
    }
    return controller;
  }
  queryLayersForFlag(controller) {
    let layers = [];
    const validNetwork = controller.dataElement.domainNetworks.filter((dn) => {
      return dn.subnetworkLayerId !== -1;
    });
    if (validNetwork.length > 0) {
      validNetwork.map((n) => {
        n.edgeSources.map((es) => {
          layers.push(es);
        });
        n.junctionSources.map((js) => {
          layers.push(js);
        });
      });
    }
    return layers;
  }
  queryATAGTerminals(controller) {
    let terminals = [];
    const commodities = controller.dataElement.domainNetworks.filter((dn) => {
      return dn.subnetworkLayerId !== -1;
    });
    if (commodities.length > 0) {
      commodities.map((c) => {
        const juncList = this._getTerminalSources(controller, c, "junctionSources");
        const edgeList = this._getTerminalSources(controller, c, "edgeSources");
        terminals = terminals.concat(juncList, edgeList);
      });
    }
    return terminals;
  }
  _getTerminalSources(controller, domain, sourceType) {
    const sources = [];
    domain[sourceType].map((js) => {
      js.assetGroups.map((ag) => {
        ag.assetTypes.map((at) => {
          if (at.isTerminalConfigurationSupported) {
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
  _getTerminalConfig(controller, terminalId) {
    const termConf = controller.dataElement.terminalConfigurations.filter((tc) => {
      return tc.terminalConfigurationId === terminalId;
    });
    if (termConf.length > 0) {
      return termConf[0];
    }
    else {
      return {};
    }
  }
  _request(requestObj) {
    return new Promise((resolve) => {
      request(requestObj.url, {
        params: requestObj.params
      }).then((response) => {
        resolve(response);
      })
        .catch((e) => {
        resolve(e);
      });
    });
  }
}
