import { Component, Prop, h, State, Event, EventEmitter, Watch} from '@stencil/core';
import {UnTraceHandler} from "./un-trace-handler";
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
  @Prop() gdbVersion: string = "sde.DEFAULT";
  @Prop() inPoints: any;
  @Prop() inAssets: any;
  @Prop() inTC: any = {tc:{}, action:"update"};
  @Prop() runIsoTraceTwice: boolean = true;
  @Prop() isBasic: boolean = true;

  @Watch('inPoints')
  @Watch('inAssets')
  watchHandler(newValue: any, oldValue: any, prop:any) {
    if(typeof newValue === "string") {
      this[prop] = newValue;
      if(prop === 'inAssets') {this.assetPropsChange();}
    }
  }

  @Event({eventName: 'emitQueryTrace', composed: true, bubbles: true}) emitQueryTrace: EventEmitter<any>;
  @Event({eventName: 'emitSelectedTrace', composed: true, bubbles: true}) emitSelectedTrace: EventEmitter<any>;
  @Event({eventName: 'emitFlagChange', composed: true, bubbles: true}) emitFlagChange: EventEmitter<any>;
  @Event({eventName: 'emitTraceResults', composed: true, bubbles: true}) emitTraceResults: EventEmitter<any>;

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

        if(this.inPoints) {this.inPoints = JSON.parse(this.inPoints);}
        if(this.inAssets) {this.assetPropsChange();}

      });

    });
  }

  processFlag1(geom:any) {
    //this.clickPointPropsChange(geom);
  }

  render() {
      return(
        <calcite-split-button
          style={{color:'#000'}}
          appearance="solid"
          color="blue"
          primary-icon-start="i2DExplore"
          primary-text="Identify the leak"
          primary-label="Identify the leak"
          dropdown-label="Additional Options"
          dropdown-icon-type="chevron"
          dir="ltr"
          calcite-hydrated=""
          onClick={() =>{
            console.log('inside component: click flag');
            this.emitFlagChange.emit({type:'start',tool:'point', callback:this.processFlag});
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
            >
              Freehand
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>
      );
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
    this.inAssets = JSON.parse(this.inAssets);
    let assetList = [];
    this.inAssets.map((a:any) => {
      assetList.push(this.lookupAsset(a, null));
    });
    Promise.all(assetList).then((response:any) => {
      if(response.length > 0) {
        response.map((res:any) => {
          console.log(res);
          if(res.result.features.length > 0) {
            if(res.result.geometryType === 'esriGeometryPolyline') {
              let clickPoint = [1029437.0469165109,1859984.5320274457];
              //get percent along
              if(clickPoint) {
                this.getPercentAlong(res.result.features[0].geometry.paths[0],  clickPoint, res.result.spatialReference.wkid).then((result:any) => {
                  this.flags.push(
                    {"traceLocationType":res.asset.type,"globalId": res.result.features[0].attributes.GLOBALID, "percentAlong":result}
                  );
                  console.log(this.flags);
                });
              } else {
                this.flags.push(
                  {"traceLocationType":res.asset.type,"globalId": res.result.features[0].attributes.GLOBALID, "percentAlong":0.5}
                );
                console.log(this.flags);
              }
            } else if(res.result.geometryType === 'esriGeometryPoint') {
              //get terminals
              const terminalList = this.terminals.filter((t:any) => {
                return (
                  t.assetGroupCode === res.result.features[0].attributes.ASSETGROUP &&
                  t.assetTypeCode === res.result.features[0].attributes.ASSETTYPE
                )
              });
              if(terminalList.length > 0) {
                this.flags.push(
                  {"traceLocationType":res.asset.type,"globalId": res.result.features[0].attributes.GLOBALID, "terminal":terminalList[0].terminalConfiguration.terminals[0], "allTerminals":terminalList[0].terminalConfiguration}
                );
              }
              console.log(this.flags);
            } else {
              //do nothing, it might be a polygon or invalid type
            }
          }
        });
      }
    });
  }

  processFlag = ((geom:any) => {
    console.log('Inside Component: received click from parent, query.')
    //this.inPoints = JSON.parse(this.inPoints);
    let assetList = [];
    //this.inPoints.map((a:any) => {
    this.layersForFlagLookup.map((lyr:any) => {
      assetList.push(this.lookupAsset(lyr, geom));
    });
    //});
    Promise.all(assetList).then((response:any) => {
      if(response.length > 0) {
        response.map((res:any) => {
          console.log(res);
          if(res.result.geometryType === 'esriGeometryPolyline') {
            let clickPoint = [1029437.0469165109,1859984.5320274457];
            //get percent along
            if(clickPoint) {
              this.getPercentAlong(res.result.features[0].geometry.paths[0],  clickPoint, res.result.spatialReference.wkid).then((result:any) => {
                this.flags.push(
                  {"traceLocationType":res.asset.type,"globalId": res.result.features[0].attributes.GLOBALID, "percentAlong":result}
                );
              });
            } else {
              this.flags.push(
                {"traceLocationType":res.asset.type,"globalId": res.result.features[0].attributes.GLOBALID, "percentAlong":0.5}
              );
            }
            console.log(this.flags);
          } else if(res.result.geometryType === 'esriGeometryPoint') {
            //get terminals
            const terminalList = this.terminals.filter((t:any) => {
              return (
                t.assetGroupCode === res.result.features[0].attributes.ASSETGROUP &&
                t.assetTypeCode === res.result.features[0].attributes.ASSETTYPE
              )
            });
            if(terminalList.length > 0) {
              this.flags.push(
                {"traceLocationType":res.asset.type,"globalId": res.result.features[0].attributes.GLOBALID, "terminal":terminalList[0].terminalConfiguration.terminals[0], "allTerminals":terminalList[0].terminalConfiguration}
              );
            }
            console.log(this.flags);
          } else {
            //do nothing, it might be a polygon or invalid type
          }
        });
      }
    });
  });

  //SUPPORT FUNCTIONS
  lookupAsset(lyr:any, geom?: any, globalId?: string ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.unHandler.queryForFeature(this.token, lyr.layerId, geom, globalId).then((response:any)=> {
        console.log(response);
        const resObj = {
          "result": response
        }
        resolve(resObj);
      })
      .catch((e: any) => {
        resolve(e);
      });
    });
  }

  getPercentAlong(geometry:any, clickPoint: any, sr:any) {
    return new Promise((resolve, reject) => {
      this.unHandler.getPercentageAlong(geometry,  clickPoint, sr).then((response:any) => {
        resolve(response);
      })
      .catch((e: any) => {
        resolve(e);
      });
    });
  }

}
