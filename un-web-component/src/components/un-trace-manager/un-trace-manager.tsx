import { Component, Prop, h, State, Event, EventEmitter, Watch} from '@stencil/core';
import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import {UnTraceHandler} from "./un-trace-handler";
import {GeometryHandler} from "./geometry_handler";
import "@esri/calcite-components";

@Component({
  tag: 'un-trace-manager',
  styleUrl: 'un-trace-manager.css',
  shadow: true,
})
export class UnTraceManager {
  @Prop() host: string = "";
  @Prop() name: string = "";
  @Prop() showTerminals: boolean;
  @Prop() appToken: string = "";
  @Prop() gdbVersion: string = "";
  @Prop() inAssets: any;
  @Prop() inTC: any = {tc:{}, action:"update"};
  @Prop() runIsoTraceTwice: boolean = true;
  @Prop() isBasic: boolean = true;

  @Watch('inAssets')
  watchHandler(newValue: any, oldValue: any, prop:any) {
    console.log(oldValue);
    this[prop] = newValue;
    if(prop === 'inAssets') {this.assetPropsChange();}
  }

  @Event({eventName: 'emitQueryTrace', composed: true, bubbles: true}) emitQueryTrace: EventEmitter<any>;
  @Event({eventName: 'emitSelectedTrace', composed: true, bubbles: true}) emitSelectedTrace: EventEmitter<any>;
  @Event({eventName: 'emitFlagChange', composed: true, bubbles: true}) emitFlagChange: EventEmitter<any>;
  @Event({eventName: 'emitTraceResults', composed: true, bubbles: true}) emitTraceResults: EventEmitter<any>;
  @Event({eventName: 'emitDrawComplete', composed: true, bubbles: true}) emitDrawComplete: EventEmitter<any>;

  @State() unHandler: any;
  @State() geometryHandler: any;
  @State() searchByUser: string = "";
  @State() traceList: Array<any> = [];
  @State() activeStep: number = 1;
  @State() activeTrace: any = null;
  @State() traceResults: any = null;
  @State() loader: boolean = false;
  @State() flags: Array<any> = [];
  @State() terminals: Array<any> = [];
  @State() layersForFlagLookup: Array<any> = [];
  @State() controllerLayer: any;
  @State() traces:any;

  componentWillLoad() {
    this.unHandler = new UnTraceHandler(this.host, this.name, this.gdbVersion, this.appToken);
    this.geometryHandler = new GeometryHandler();
    //this.unHandler.getToken().then((response:any) => {
    //  this.token = response.token;

      this.unHandler.queryDataElement().then(async(dataElement:any) => {
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

      return(
        <div style={{display:'flex', flexDirection:'row', flex:"1"}}>
          <calcite-tabs position="above" layout="center">
            <calcite-tab-nav slot="tab-nav">
              <calcite-tab-title active={true}>Inputs</calcite-tab-title>
              <calcite-tab-title>Outputs</calcite-tab-title>
            </calcite-tab-nav>

            <calcite-tab active={true} style={{backgroundColor:"#f8f8f8"}}>
              <flag-handler />
              <trace-selector />
              <execute-handler />
            </calcite-tab>
            <calcite-tab>output tab</calcite-tab>
          </calcite-tabs>
        </div>);
  }

  //Prop change updates
  assetPropsChange() {
    this.flags = [];
    if(this.inAssets.length > 0) {
      console.log(this.inAssets);
      let assetList = [];
      this.inAssets.map(async (a:any) => {
        if(a.layers.length > 0) {
          a.layers.map((lyr:any) => {
            assetList.push(this.lookupAsset(lyr, a.geometry));
          });
        } else {
          // only geom is provided.  do lookup
          this.layersForFlagLookup.map((lyr:any) => {
            const usage = lyr.utilityNetworkFeatureClassUsageType;
            if(usage === 'esriUNFCUTJunction' || usage === 'esriUNFCUTDevice' || usage === 'esriUNFCUTLine') {
              const lyrObj = {layerId: lyr.layerId, ids:[], subtypes:[]};
              assetList.push(this.lookupAsset(lyrObj, a.geometry));
            }
          });
        }
      });
      Promise.all(assetList).then((response:any) => {
        if(response.length > 0) {
          response.map((res:any) => {
            if(res.result.features.length > 0) {
              res.result.features.map(async(feat:any) => {
                if(res.result.geometryType === 'esriGeometryPolyline') {
                  //get percent along
                  const perct = await this.geometryHandler.getPercentageAlong(feat.geometry,  res.flagGeom, res.result.spatialReference);
                  console.log(perct);
                  const flagExists = this.flags.indexOf((f:any) => {
                    return f.globalId === feat.attributes.globalid;
                  });
                  if(flagExists === -1) {
                    this.flags.push(
                      {traceLocationType:'startingPoint',globalId: feat.attributes.globalid, percentAlong:perct[0]}
                    );
                  }
                  //if line on line, send back the intersected point for flag graphic
                  if(res.flagGeom.type === "polyline") {
                    const points = await this.geometryHandler.intersectToPoint(feat.geometry, res.flagGeom, res.result.spatialReference);
                    this.emitDrawComplete.emit({type:'start', geometry: points});
                  } else {
                    this.emitDrawComplete.emit({type:'start', geometry: res.flagGeom});
                  }
                } else if(res.result.geometryType === 'esriGeometryPoint') {
                  //get terminals
                  const terminalList = this.terminals.filter((t:any) => {
                    return (
                      t.assetGroupCode === feat.attributes.assetgroup &&
                      t.assetTypeCode === feat.attributes.assettype &&
                      t.layerId === res.layerId
                    )
                  });
                  if(terminalList.length > 0) {
                    const flagExists = this.flags.indexOf((f:any) => {
                      return f.globalId === feat.attributes.globalid;
                    });
                    if(flagExists === -1) {
                      this.flags.push(
                        {traceLocationType:'startingPoint', globalId: feat.attributes.globalid, terminal:terminalList[0].terminalConfiguration.terminals[0], allTerminals:terminalList[0].terminalConfiguration}
                      );
                      this.emitDrawComplete.emit({type:'start', geometry: res.flagGeom});
                    }
                  }
                } else {
                  //do nothing, it might be a polygon or invalid type
                }
              });
            }
          });
          setTimeout(()=> {
            this.executeTrace();
          },1000);
        }
      });
    }
  }

  //SUPPORT FUNCTIONS
  lookupAsset(lyr?:any, geom?: any): Promise<any> {
    return new Promise(async(resolve) => {
      let geomObj = (geom)?geom:null;
      if(geomObj !== null) {
        if(geomObj.type === "polygon") {
          //convert it to polyline and reproject it.
          const rings = geomObj.rings;
          geomObj = await this.geometryHandler.createPolyline(rings, geomObj.spatialReference.wkid);
        } else {
          //polyline and point, just reproject
        }
      }
      this.unHandler.queryForFeature(lyr, geomObj).then((response:any)=> {
        //console.log(response);
        const resObj = {
          "result": response,
          "flagGeom": geomObj,
          "layerId": lyr.layerId
        }
        resolve(resObj);
      })
      .catch((e: any) => {
        resolve(e);
      });
    });
  }

  executeTrace() {
    if(this.traces.hasOwnProperty('traceConfigurations')) {
      if(this.traces.traceConfigurations.length > 0) {
        this.traces.traceConfigurations.map((tc:any) => {
          if(tc.traceType === 'isolation') {
            this.unHandler.executeTrace(tc.traceType, this.flags, '', tc.globalId).then((results:any) => {
              this.processResults(tc.traceConfiguration.includeIsolated, results.traceResults);
              //this.emitTraceResults.emit({isIsolated:tc.traceConfiguration.includeIsolated, results:results.traceResults});
            });
          }
        });
      }
    }
  }

  processResults(isIsolated:boolean, results:any) {
    if(results.hasOwnProperty("elements")) {
      if(results.elements.length > 0) {
        const grouped = [];
        results.elements.map((el:any) => {
          if(grouped[el.networkSourceId]) {
            grouped[el.networkSourceId].push(el.objectId);
          } else {
            grouped[el.networkSourceId] = [];
            grouped[el.networkSourceId].push(el.objectId);
          }
        });
        for(const key in grouped) {
          const findLayer = this.layersForFlagLookup.filter((lyr:any) => {
            return(lyr.sourceId === parseInt(key));
          });
          if(findLayer.length > 0) {
            const layerObj = {"layerId":findLayer[0].layerId, "subtypes":[], "ids":grouped[key]};
            this.lookupAsset(layerObj).then((results:any) => {
              console.log("results records");
              console.log(results);
              this.emitTraceResults.emit({isIsolated:isIsolated, results:results});
            });
          }
        }

      }
    }
  }


}
