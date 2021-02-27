import { Component, Prop, h, State, Event, EventEmitter, Watch} from '@stencil/core';
import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import {UnTraceHandler} from "./un-trace-handler";
import "@esri/calcite-components";
import * as GeometryEngine from '@arcgis/core/geometry/GeometryEngine';
import * as projection from "@arcgis/core/geometry/projection";

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
  @Prop() gdbVersion: string = "sde.DEFAULT";
  @Prop() inAssets: any;
  @Prop() inTC: any = {tc:{}, action:"update"};
  @Prop() runIsoTraceTwice: boolean = true;
  @Prop() isBasic: boolean = true;

  @Watch('inAssets')
  watchHandler(newValue: any, oldValue: any, prop:any) {
    this[prop] = newValue;
    if(prop === 'inAssets') {this.assetPropsChange();}
  }

  @Event({eventName: 'emitQueryTrace', composed: true, bubbles: true}) emitQueryTrace: EventEmitter<any>;
  @Event({eventName: 'emitSelectedTrace', composed: true, bubbles: true}) emitSelectedTrace: EventEmitter<any>;
  @Event({eventName: 'emitFlagChange', composed: true, bubbles: true}) emitFlagChange: EventEmitter<any>;
  @Event({eventName: 'emitTraceResults', composed: true, bubbles: true}) emitTraceResults: EventEmitter<any>;

  @Event({eventName: 'emitDrawComplete', composed: true, bubbles: true}) emitDrawComplete: EventEmitter<any>;

  @State() unHandler: any;
  @State() token: string;
  @State() searchByUser: string = "";
  @State() traceList: Array<any> = [];
  @State() activeStep: number = 1;
  @State() activeTrace: any = null;
  @State() traceResults: any = null;
  @State() loader: boolean = false;
  @State() flags: Array<any> = [];
  //@State() flags: string = '[{"traceLocationType":"startingPoint","globalId":"{DB331F49-422D-4067-992E-8091D11E479C}","percentAlong":0.5}]';
  //@State() flags: string = '[{"traceLocationType":"startingPoint","globalId":"{DB331F49-422D-4067-992E-8091D11E479C}","percentAlong":0.5},{"traceLocationType":"barrier","globalId":"{24787450-40BE-44A3-BF1A-2F90630C5DD1}","percentAlong":0.5},{"traceLocationType":"barrier","globalId":"{309C3A4B-CC00-4393-8724-6DA5075BCB16}","percentAlong":0.5},{"traceLocationType":"barrier","globalId":"{074001AE-6A01-4440-A234-9A85C1F93740}","percentAlong":0.5},{"traceLocationType":"barrier","globalId":"{29A7D702-FBB2-46DF-A0FA-99F4D9615BEE}","percentAlong":0.5}]';
  @State() terminals: Array<any> = [];
  @State() layersForFlagLookup: Array<any> = [];
  @State() controllerLayer: any;

  componentWillLoad() {
    this.unHandler = new UnTraceHandler(this.host, this.name);
    this.unHandler.getToken().then((response:any) => {
      this.token = response.token;

      this.unHandler.queryDataElement(this.token).then((dataElement:any) => {
        this.controllerLayer = this.unHandler.findControllerLayer(dataElement);
        this.layersForFlagLookup = this.unHandler.queryLayersForFlag(this.controllerLayer);
        this.terminals = this.unHandler.queryATAGTerminals(this.controllerLayer);
        console.log(this.controllerLayer);
        console.log(this.layersForFlagLookup);
        console.log(this.terminals);

        if(this.inAssets) {this.assetPropsChange();}

      });

    });
  }

  processFlag1(geom:any) {
    //this.clickPointPropsChange(geom);
  }

  render() {
      return(
        <div style={{display:'flex', flexDirection:'row'}}>
        <div>
        <calcite-split-button
          style={{color:'#000'}}
          appearance="solid"
          color="dark"
          primary-icon-start="search"
          primary-text="Identify the leak"
          primary-label="Identify the leak"
          dropdown-label="Additional Options"
          dropdown-icon-type="chevron"
          dir="ltr"
          calcite-hydrated=""
          onClick={(evt:any) =>{
            console.log(evt);
            console.log('inside component: click flag');
            this.emitFlagChange.emit({type:'start',tool:'point', callback:this.assetPropsChange});
          }}
        >
          <calcite-dropdown-group
          style={{color:'#000'}}
            selection-mode="none"
            dir="ltr"
            role="menu"
            calcite-hydrated=""
          >
            <calcite-dropdown-item
              style={{color:'#000'}}
              dir="ltr"
              role="menuitem"
              selection-mode="none"
              tabindex="0"
              calcite-hydrated=""
              icon-start="point"
            >
              Click a point on the map
            </calcite-dropdown-item>
            <calcite-dropdown-item
              style={{color:'#000'}}
              dir="ltr"
              role="menuitem"
              selection-mode="none"
              tabindex="0"
              calcite-hydrated=""
              icon-start="polygonArea"
            >
              Draw an area of interest
            </calcite-dropdown-item>
            <calcite-dropdown-item
              style={{color:'#000'}}
              dir="ltr"
              role="menuitem"
              selection-mode="none"
              tabindex="0"
              calcite-hydrated=""
              icon-start="list"
            >
              View list of leak locations
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>
        </div>
        <div style={{width:"1%"}}></div>
        <div>
        <calcite-button
          appearance="solid"
          color="blue"
          scale="m"
          href=""
          icon-start="caretRight"
          dir="ltr"
          width="auto"
          calcite-hydrated=""
        >
          Run
        </calcite-button>
        </div>
        <div style={{width:"1%"}}></div>
        <div>
        <calcite-button
          appearance="solid"
          color="light"
          scale="m"
          href=""
          icon-start="xCircle"
          dir="ltr"
          width="auto"
          calcite-hydrated=""
        >
          Clear
        </calcite-button>
        </div>
      </div>);
  }

  renderTraceList(result:any): any {
    let list = [];
      result.map((r:any) => {
        list.push(<calcite-card key={r.name}>
          <h3 slot="title">{r.name}</h3>
          <span slot="subtitle">{r.description}</span>
          <calcite-link slot="footer-leading" onClick={
            () => {
              this.activeStep = 3;
              this.activeTrace = r;
              this.emitSelectedTrace.emit(r);
            }
          }>Select</calcite-link>
          <calcite-link slot="footer-trailing">Edit Config</calcite-link>
        </calcite-card>
        );
      })
    return(
      <div style={{height:"175px", overflow:"auto"}}><div>{list}</div></div>
    )
  }

  renderTraceResults(): any {
    if(this.traceResults !== null) {
      let list = [];
      if(this.traceResults.hasOwnProperty("message")) {
        list.push(<calcite-card>
          <h3 slot="title">{this.traceResults.message}</h3>
        </calcite-card>
        );
      } else {
        this.traceResults.traceResults.elements.map((r:any) => {
          list.push(<calcite-card key={r.globalId}>
            <h3 slot="title">{r.globalId}</h3>
            <calcite-link slot="footer-leading">Hightlight</calcite-link>
          </calcite-card>
          );
        })
      }
      return(
        <div style={{height:"175px", overflow:"auto"}}><div>{list}</div></div>
      )
    } else {
      return <div>Error</div>
    }
  }

  //Prop change updates
  assetPropsChange() {
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
            const lyrObj = {layerId: lyr.layerId, ids:[], subtypes:[]};
            assetList.push(this.lookupAsset(lyrObj, a.geometry));
          });
        }
      });
      Promise.all(assetList).then((response:any) => {
        if(response.length > 0) {
          response.map((res:any) => {
            if(res.result.features.length > 0) {
              console.log(res);
              res.result.features.map((feat:any) => {
                if(res.result.geometryType === 'esriGeometryPolyline') {
                  //get percent along
                  this.getPercentAlong(feat.geometry,  res.flagGeom, res.result.spatialReference).then((result:any) => {
                    const flagExists = this.flags.indexOf((f:any) => {
                      return f.globalId === feat.attributes.globalid;
                    });
                    if(flagExists === -1) {
                      this.flags.push(
                        {"traceLocationType":"start","globalId": feat.attributes.globalid, "percentAlong":result}
                      );
                    }
                  });
                  //if line on line, send back the intersected point for flag graphic
                  if(res.flagGeom.type === "polyline") {
                    this.intersectToPoint(feat.geometry, res.flagGeom, res.result.spatialReference).then((points:any) => {
                      console.log("line/line to point");
                      this.emitDrawComplete.emit({type:'start', geometry: points});
                    });
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
                        {"traceLocationType":"start", "globalId": feat.attributes.globalid, "terminal":terminalList[0].terminalConfiguration.terminals[0], "allTerminals":terminalList[0].terminalConfiguration}
                      );
                    }
                  }
                } else {
                  //do nothing, it might be a polygon or invalid type
                }
              });
            }
          });
          console.log(this.flags);
        }
      });
    }
  }

  //SUPPORT FUNCTIONS
  lookupAsset(lyr?:any, geom?: any): Promise<any> {
    return new Promise(async(resolve, reject) => {
      let geomObj = geom;
      if(geom.type === "polygon") {
        //convert it to polyline and reproject it.
        const rings = geom.rings;
        geomObj = await this.unHandler._createPolyline(rings, geom.spatialReference.wkid);
      } else {
        //polyline and point, just reproject
      }
      this.unHandler.queryForFeature(this.token, lyr, geomObj).then((response:any)=> {
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

  getPercentAlong(geometry:any, flagGeom: any, sr:any) {
    return new Promise((resolve, reject) => {
      this.unHandler.getPercentageAlong(geometry,  flagGeom, sr).then((response:any) => {
        resolve(response);
      })
      .catch((e: any) => {
        resolve(e);
      });
    });
  }

  async intersectToPoint(geometry:any, flagGeom: any, sourceSR:any) {
    let flagPointArray = [];
    const sourceLine = await this.unHandler._createPolyline(geometry.paths, sourceSR.wkid);
    const flagToProjected = await this.unHandler.projectGeometry(flagGeom, sourceSR);
    //since intersecting lines do not return the point, have to cut line and then check start/end points to get points.
    const cutGeoms = GeometryEngine.cut(sourceLine,flagToProjected);
    //check start/end points if they intersect flag line, if they do consider it flag
    if(cutGeoms && cutGeoms.length > 0) {
      const [
        {default: Point}
      ] = await Promise.all([
        import('@arcgis/core/geometry/Point')
      ]);
      cutGeoms.map((cg:any) => {
        cg.paths.map((p:any) => {
          //get first point and last points and see if they intersect flag geom
          const firstCoord = p[0];
          const firstPoint = new Point({x: firstCoord[0], y:firstCoord[1], spatialReference: cg.spatialReference});
          const lastCoord = p[p.length - 1];
          const lastPoint = new Point({x: lastCoord[0], y:lastCoord[1], spatialReference: cg.spatialReference});
          const doesFirstIntersect = GeometryEngine.intersects(flagToProjected, firstPoint);
          const doesLastIntersect = GeometryEngine.intersects(flagToProjected, lastPoint);
          if(doesFirstIntersect) {
            if(flagPointArray.length > 0) {
              const found = flagPointArray.indexOf((fp:any) => {
                return(GeometryEngine.equals(fp, firstPoint))
              });
              if(found === -1) {
                flagPointArray.push(firstPoint);
              }
            } else {
              flagPointArray.push(firstPoint);
            }
          }
          if(doesLastIntersect) {
            if(flagPointArray.length > 0) {
              const found = flagPointArray.indexOf((fp:any) => {
                return(GeometryEngine.equals(fp, lastPoint))
              });
              if(found === -1) {
                flagPointArray.push(lastPoint);
              }
            } else {
              flagPointArray.push(lastPoint);
            }
          }
        });
      });
    }
    return flagPointArray;
  }

}
