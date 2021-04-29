import { Component, Prop, h, State, Event, EventEmitter, Watch} from '@stencil/core';
import {UnTraceHandler} from "./un-trace-handler";
import {GeometryHandler} from "./geometry_handler";
import "@esri/calcite-components";
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

@Component({
  tag: 'un-trace-manager',
  styleUrl: 'un-trace-manager.scss',
  shadow: true,
})
export class UnTraceManager {
  @Prop() host: string = "";
  @Prop() name: string = "";
  @Prop() showTerminals: boolean;
  @Prop() appToken: string = "Cl8tJFi4nxyV8LIgXKBzpgoWO0XDlHhE-xlJ03-DxqZybCe0ug_qf11W6PDrCve7rUU8kzWNNPpPbubeNn39gLr69SdTKgqnlFPVOSz2KWslkKXqfuHsyyZRvScmhG8pkVTbn-onG9g4xvCCB9G412LLq0hJPe8Azx26FWU3jlVn3X1UNH70-5o-H9NCV5tc";
  @Prop() gdbVersion: string = "";
  @Prop() inAssets: any;
  @Prop() inTC: any = {tc:{}, action:"update"};
  @Prop() runIsoTraceTwice: boolean = true;
  @Prop() isBasic: boolean = true;
  @Prop() orientation: string = 'ltr';

  @Watch('inAssets')
  watchHandler(newValue: any, oldValue: any, prop:any) {
    console.log(oldValue);
    console.log(newValue);
    this[prop] = newValue;
    if(prop === 'inAssets') {this.assetPropsChange();}
  }

  @Event({eventName: 'emitQueryTrace', composed: true, bubbles: true}) emitQueryTrace: EventEmitter<any>;
  @Event({eventName: 'emitSelectedTrace', composed: true, bubbles: true}) emitSelectedTrace: EventEmitter<any>;
  @Event({eventName: 'emitFlagChange', composed: true, bubbles: true}) emitFlagChange: EventEmitter<any>;
  @Event({eventName: 'emitTraceResults', composed: true, bubbles: true}) emitTraceResults: EventEmitter<any>;
  @Event({eventName: 'emitDrawComplete', composed: true, bubbles: true}) emitDrawComplete: EventEmitter<any>;

  @State() currentTab: string = "input";
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

  @State() showStartFlags: boolean = true;
  @State() showBarrierFlags: boolean = false;
  @State() showAllFlags: boolean = false;
  @State() showFlagsType: string = 'startPoint';
  @State() showFlagAssetPopper: boolean = false;
  @State() showExecuteNotice: boolean = false;
  @State() showResultsDetails:boolean = false;

  @State() popoverIdLink: string = '';

  connectedCallback() {
    defineCustomElements(window);
  }

  componentWillLoad() {
    console.log(this.appToken);
    console.log(this.gdbVersion);
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

  processFlag1() {
    //this.clickPointPropsChange(geom);
  }

  render() {

    return(
      <div style={{display:'flex', flexDirection:'row', flex:"1"}}>
        <calcite-tabs position="above" layout="center">
          <calcite-tab-nav slot="tab-nav">
            <calcite-tab-title active={(this.currentTab === 'input')?true:false} onClick={()=>{this.clickTabChange('input')}}>Inputs</calcite-tab-title>
            <calcite-tab-title active={(this.currentTab === 'output')?true:false} onClick={()=>{this.clickTabChange('output')}}>Outputs</calcite-tab-title>
          </calcite-tab-nav>

          <calcite-tab active={(this.currentTab === 'input')?true:false} style={{backgroundColor:"#f8f8f8"}}>
            {this.renderUIFlags()}
          </calcite-tab>
          <calcite-tab active={(this.currentTab === 'output')?true:false} style={{backgroundColor:"#f8f8f8"}}>
          </calcite-tab>
        </calcite-tabs>

      </div>);
  }

  renderUIFlags() {
    let startFlagList = [];
    let barrierFlagList = [];
    let onlyStart = [];
    let onlyBarriers = [];
    onlyStart = this.flags.filter((f:any) => {
      return f.traceLocationType === 'startingPoint';
    });
    onlyStart.map((f:any, i:number) => {
      console.log(f);
      if(i <= 1) {//startFlagList.push(this.generateAssetRow(f));
      }
    });

    onlyBarriers = this.flags.filter((f:any) => {
      return f.traceLocationType === 'barrier';
    });
    onlyBarriers.map((f:any, i:number) => {
      console.log(f);
      if(i <= 1) {//barrierFlagList.push(this.generateAssetRow(f));
      }
    });

    return(
      <div>
        <div style={{height:"10px", width:"100%"}}></div>
          <calcite-accordion
            dir={this.orientation}
            scale="m"
            theme="light"
            appearance="default"
            icon-position="end"
            icon-type="chevron"
            selection-mode="multi"
          >
            <calcite-accordion-item
              icon="pin"
              item-title={"Starting Points (" + onlyStart.length  +")"}
              item-subtitle="Add points to where the trace should start."
              aria-expanded="false"
              dir={this.orientation}
              icon-position="end"
              tabindex="0"
              active={this.showStartFlags}
            >
              {startFlagList}

              <div style={{height:"10px", width:"100%"}}></div>
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                {(onlyStart.length > 2) && <calcite-link onClick={()=>{}}>See All</calcite-link>}
                {(onlyStart.length > 2) && <div style={{height:"10px", width:"100%"}}></div>}
                <calcite-split-button
                  appearance="solid"
                  color="light"
                  scale="s"
                  primary-icon-start="plus"
                  primary-text="Add Point"
                  primary-label="Primary Option"
                  dropdown-label="Additional Options"
                  dropdown-icon-type="chevron"
                  onClick={() => {}}
                >
                  <calcite-dropdown-group selection-mode="none">
                    <calcite-dropdown-item>Draw an area</calcite-dropdown-item>
                  </calcite-dropdown-group>
                </calcite-split-button>
              </div>
            </calcite-accordion-item>
          </calcite-accordion>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-accordion
            dir={this.orientation}
            scale="m"
            theme="light"
            appearance="default"
            icon-position="end"
            icon-type="chevron"
            selection-mode="multi"
          >
            <calcite-accordion-item
              icon="x-octagon-f"
              item-title={"Barriers (" + onlyBarriers.length + ")"}
              item-subtitle="Add points to where trace should not go."
              aria-expanded="false"
              dir={this.orientation}
              icon-position="end"
              tabindex="0"
              active={this.showBarrierFlags}
            >

              {barrierFlagList}

              <div style={{height:"10px", width:"100%"}}></div>
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                {(onlyBarriers.length > 2) && <calcite-link onClick={()=>{}}>See All</calcite-link>}
                {(onlyBarriers.length > 2) && <div style={{height:"10px", width:"100%"}}></div>}
                <calcite-split-button
                  appearance="solid"
                  color="light"
                  scale="s"
                  primary-icon-start="plus"
                  primary-text="Add Point"
                  primary-label="Primary Option"
                  dropdown-label="Additional Options"
                  dropdown-icon-type="chevron"
                  onClick={() => {}}
                >
                  <calcite-dropdown-group selection-mode="none">
                    <calcite-dropdown-item>Draw an area</calcite-dropdown-item>
                  </calcite-dropdown-group>
                </calcite-split-button>
              </div>

            </calcite-accordion-item>
          </calcite-accordion>
      </div>
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

  clickTabChange = (tab:string) => {
    this.currentTab = tab;
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
    return new Promise((resolve) => {
      this.unHandler.queryForFeature(this.appToken, lyr.layerId, geom, globalId).then((response:any)=> {
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
    return new Promise((resolve) => {
      this.unHandler.getPercentageAlong(geometry,  clickPoint, sr).then((response:any) => {
        resolve(response);
      })
      .catch((e: any) => {
        resolve(e);
      });
    });
  }

}
