import { Component, Prop, h, State, Event, EventEmitter, Watch} from '@stencil/core';
import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import {UnTraceHandler} from "./un-trace-handler";
import {GeometryHandler} from "./geometry_handler";
import "@esri/calcite-components";
import { defineCustomElements } from "@esri/calcite-components/dist/loader";
//@ts-ignore
import { loadModules } from "https://unpkg.com/esri-loader@3.1.0/dist/esm/esri-loader.js";
import "http://pwonglap.esri.com/arcgis-js-api/test-apps/dojo-config.js";

const options = {url:"http://pwonglap.esri.com/arcgis-js-api/dojo/dojo.js" };

@Component({
  tag: 'un-trace-manager',
  styleUrl: 'un-trace-manager.scss',
  shadow: true,
})
export class UnTraceManager {
  @Prop() host: string = "";
  @Prop() name: string = "";
  @Prop() webmap: string = "";
  @Prop() showTerminals: boolean;
  @Prop() appToken: string;
  @Prop() gdbVersion: string = "";
  @Prop() inAssets: any;
  @Prop() flagGeometry: any;
  @Prop() inTC: any = {tc:{}, action:"update"};
  @Prop() runIsoTraceTwice: boolean = true;
  @Prop() isBasic: boolean = true;
  @Prop() orientation: string = 'ltr';

  @Watch('flagGeometry')
  watchHandler(newValue: any, oldValue: any, prop:any) {
    console.log(oldValue);
    console.log(newValue);
    this[prop] = newValue;
    if(prop === 'flagGeometry') {this.queryFeaturesForFlag(newValue);}
    //if(prop === 'inAssets') {this.assetPropsChange();}
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
  @State() loader: boolean = false;
  @State() flags: Array<any> = [];
  @State() terminals: Array<any> = [];
  @State() layersForFlagLookup: Array<any> = [];

  @State() unObj: any;
  @State() controllerLayer: any;
  @State() traces: Array<any> = [];
  @State() traceResults: Array<any> = [];

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
    this._getUNFromMap();
  }

  async _getUNFromMap() {
    this.unHandler = new UnTraceHandler(this.host, this.name, this.gdbVersion, this.webmap, this.appToken);
    this.geometryHandler = new GeometryHandler();

    this.unObj = await this.unHandler.load();
    if(this.unObj) {
      if(this.unObj.hasOwnProperty('sharedNamedTraceConfigurations')) {
        this.traces = [...this.unObj.sharedNamedTraceConfigurations];
        this.traces.map((t:any, i:number) => {
          if(i === 0) {
            t["selected"] = true;
          } else {
            t["selected"] = false;
          }
        });
      }
    }

    /*
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
    */

  }

  componentDidRender() {
    /*
    const domElement = document.querySelector('calcite-notice');
    console.log(domElement);
    if(domElement !== null) {
      domElement.addEventListener('calciteNoticeClose', event => {
        console.log(event);
      });
    }
    */
  }

  render() {

      return(
        <div style={{display:'flex', flexDirection:'row', width:"100%"}}>
          <calcite-tabs position="above" layout="center">
            <calcite-tab-nav slot="tab-nav">
              <calcite-tab-title active={(this.currentTab === 'input')?true:false} onClick={()=>{this.clickTabChange('input')}}>Inputs</calcite-tab-title>
              <calcite-tab-title active={(this.currentTab === 'output')?true:false} onClick={()=>{this.clickTabChange('output')}}>Outputs</calcite-tab-title>
            </calcite-tab-nav>

            <calcite-tab active={(this.currentTab === 'input')?true:false} style={{backgroundColor:"#f8f8f8"}}>
              {(this.showAllFlags)?this.renderUIAllFlags(this.showFlagsType):this.renderUIFlags()}
              {this.renderUITraceSelector()}
              {this.renderUIExecute()}
            </calcite-tab>
            <calcite-tab active={(this.currentTab === 'output')?true:false} style={{backgroundColor:"#f8f8f8"}}>
              {(this.showResultsDetails)?this.renderUITraceResultsDetails(null):this.renderUITraceResults()}
              {this.renderUITraceSelector()}
              {this.renderUIExecute()}
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
      if(i <= 1) {startFlagList.push(this.generateAssetRow(f));}
    });

    onlyBarriers = this.flags.filter((f:any) => {
      return f.traceLocationType === 'barrier';
    });
    onlyBarriers.map((f:any, i:number) => {
      if(i <= 1) {barrierFlagList.push(this.generateAssetRow(f));}
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
                {(onlyStart.length > 2) && <calcite-link onClick={()=>{this.clickShowAllFlags('startingPoint', true)}}>See All</calcite-link>}
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
                  onClick={() => {this.clickAddFlag('startingPoint', 'point')}}
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
                {(onlyBarriers.length > 2) && <calcite-link onClick={()=>{this.clickShowAllFlags('barrier', true)}}>See All</calcite-link>}
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
                  onClick={() => {this.clickAddFlag('barrier', 'point')}}
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

  renderUIAllFlags(type:string) {

    let title = '';
    switch(type) {
      case "startingPoint":
        title = 'starting';
        break;
      case "barrier":
        title = 'barrier';
        break;
      default:
        break;
    }

    let flagList = [];
    let onlyByType = [];
    onlyByType = this.flags.filter((f:any) => {
      return f.traceLocationType === type;
    });
    onlyByType.map((f:any) => {
      flagList.push(this.generateAssetRow(f));
    });

    return(
      <div>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-panel dir={this.orientation} height-scale="s" intl-close="Close" theme="light">
          <div class="heading" slot="header-content">
            <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">{"All " + title  + " points"}</div>
          </div>
          <calcite-action
            text="Action"
            label="Action"
            slot="header-actions-start"
            icon="chevron-left"
            appearance="solid"
            scale="s"
            onClick={()=>{this.clickShowAllFlags(type,false)}}
          ></calcite-action>
        </calcite-panel>
        <div style={{height:"10px", width:"100%"}}></div>

        <calcite-input
          scale="m"
          status="idle"
          type="text"
          alignment="start"
          number-button-type="horizontal"
          min="0"
          max="100"
          step="1"
          prefix-text=""
          suffix-text=""
          value=""
          placeholder="Search"
          class="sc-calcite-input-h sc-calcite-input-s"
          dir={this.orientation}
        >
        </calcite-input>
        <div style={{height:"5px", width:"100%"}}></div>
        {flagList}
        <div style={{height:"10px", width:"100%"}}></div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <calcite-link onClick={()=>{this.clickRemoveAllFlag(type)}}>Clear All</calcite-link>
        </div>
      </div>
    );
  }

  generateAssetRow(feat:any) {
    return(
      <div>
      <calcite-popover-manager>
      <calcite-panel dir={this.orientation} height-scale="s" intl-close="Close" theme="light">
        <div class="heading" slot="header-content">
          <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">Global id: {feat.globalId}</div>
        </div>
        {
          (feat.hasOwnProperty('terminalId')) &&
          <calcite-action
          text="Action"
          label="Action"
          slot="header-actions-start"
          icon={(feat.showTerminal)?"chevron-down":"chevron-up"}
          appearance="solid"
          scale="s"
          onClick={()=>{this.clickShowFlagTerminal(feat.globalId)}}
          ></calcite-action>
        }
        <calcite-action
          text="Action"
          label="Action"
          slot="header-actions-end"
          icon="ellipsis"
          appearance="solid"
          scale="s"
          id={feat.globalId}
          onClick={()=>{this.clickShowFlagAssetOptions(feat.globalId,true)}}
        >
        </calcite-action>
        {
          (feat.showTerminal) && <calcite-card dir={this.orientation}>
          {
            (this.currentTab === 'output') && <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label" style={{display:'flex', flexDirection:"row"}}>
            <div style={{display:"flex", flex:"1"}}><calcite-icon icon="nodes-unmerge" scale="m" aria-hidden="true"></calcite-icon></div>
            <div style={{display:"flex", flex:"3"}}>Bypass asset for the next trace</div>
            <div style={{display:"flex", flex:"1", justifyContent:"flex-end"}}>
              <calcite-switch
                name="setting"
                value="enabled"
                switched=""
                scale="m">
              </calcite-switch>
            </div>
          </div>
          }
          {
            (this.currentTab === 'output') && <div style={{height:"5px", width:"100%"}}></div>
          }
          <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label" style={{display:'flex', flexDirection:"column"}}>
            <div>Terminal</div>
            <div>
              <calcite-select
                label="Select a Terminal"
                dir={this.orientation}
                scale="m"
                theme="light"
                width="auto"
                calcite-hydrated=""
                >
                <calcite-option selected={true} calcite-hydrated="">Terminal 1</calcite-option>
              </calcite-select>
            </div>
          </div>
          </calcite-card>
        }
      </calcite-panel>
      </calcite-popover-manager>
      <calcite-popover
      theme="light"
      reference-element={feat.globalId}
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
      open={true}
      text-close="Close"
    >
      <div style={{padding:"12px 16px"}}>
        <b>I am a title!</b>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <calcite-link>I am an inline link</calcite-link>
      </div>
    </calcite-popover>
    </div>
    );
  }

  renderUITraceSelector() {
    let traces = [];
    if(this.traces.length > 0) {
      this.traces.map((ntc:any) => {
        traces.push(
          <calcite-option selected={ntc.selected} calcite-hydrated="" value={ntc}>{ntc.title}</calcite-option>
        );
      });
    }

    return (
      (traces.length > 0) && <div>
      <div style={{height:"10px", width:"100%"}}></div>
      <calcite-card>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-label
          class="sc-calcite-label-h sc-calcite-label-s"
          dir={this.orientation}
          status="idle"
          scale="m"
          layout="default"
          calcite-hydrated=""
        >
          <label class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">
            Select a trace operation
            <calcite-select
              label="Select a trace group"
              dir={this.orientation}
              scale="m"
              theme="light"
              width="auto"
              calcite-hydrated=""
            >
              {traces}
            </calcite-select>
          </label>
          <label class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">
            This trace will select isolating and isolated features.
          </label>
        </calcite-label>
      </calcite-card>
      </div>
    );
  }

  renderUIExecute() {
    return (
      <div>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-card>
          <div style={{height:"10px", width:"100%"}}></div>
          <calcite-notice
            theme="light"
            icon=""
            active={this.showExecuteNotice}
            dismissible={true}
            scale="s"
            width="auto"
            color="red"
          >
            <div slot="notice-title">Add starting point</div>
            <div slot="notice-message">You first need to add a starting point to run the trace.</div>
          </calcite-notice>
          <div style={{height:"10px", width:"100%"}}></div>
          <calcite-button scale="s" color="blue"  width="full" onClick={()=>{this.clickCanExecute()}}>Run</calcite-button>
          <div style={{height:"10px", width:"100%"}}></div>
        </calcite-card>
      </div>
    );
  }

  renderUITraceResults() {
    let resultPanels = [];
    if(this.traceResults.length > 0) {
      this.traceResults.map((tr:any) => {
        resultPanels.push(
          <calcite-panel dir={this.orientation} height-scale="s" intl-close="Close" theme="light">
          <div class="heading" slot="header-content">
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <div style={{paddingLeft: "5px", paddingRight: "5px"}}>
                <div style={{ borderRadius: "40px", width: "20px", height: "20px", backgroundColor: "#f00" }}></div>
              </div>
              <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">{tr.trace.title} ({tr.results.elements.length})</div>
                <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">{tr.trace.description}</div>
              </div>
            </div>
          </div>
          <calcite-action
            text="Action"
            label="Action"
            slot="header-actions-end"
            icon="chevron-right"
            appearance="solid"
            scale="s"
            onClick={()=>{this.clickShowResultsDetails(true)}}
          ></calcite-action>
          </calcite-panel>
        );
      })
    } else {
      resultPanels.push(
        <calcite-loader
          active=""
          type="indeterminate"
          scale="s"
          value="0"
          id="03f8e6e4-3169-efe2-2c77-d99f9f5796a3"
          role="progressbar"
        ></calcite-loader>
      )
    }
    return (
      <div>
        <div style={{height:"25px", width:"100%", textAlign:"center", paddingTop: '10px'}}>
          <calcite-label class="sc-calcite-label-h sc-calcite-label-s" dir={this.orientation} alignment="center" status="idle" scale="s" layout="default">
            Trace completed 4/14/2021 at 11:20am
          </calcite-label>
        </div>
        {resultPanels}
      </div>
    );
  }

  renderUITraceResultsDetails(trace:any) {
    console.log(trace);
    return(
      <div>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-panel dir={this.orientation} height-scale="s" intl-close="Close" theme="light">
          <div class="heading" slot="header-content">
            <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label">Isolated (3)</div>
          </div>
          <calcite-action
            text="ActionBackResults"
            label="ActionBackResults"
            slot="header-actions-start"
            icon="chevron-left"
            appearance="solid"
            scale="s"
            onClick={()=>{this.clickShowResultsDetails(false)}}
          ></calcite-action>
        </calcite-panel>
        <div style={{height:"10px", width:"100%"}}></div>
        <calcite-input
          scale="m"
          status="idle"
          type="text"
          alignment="start"
          number-button-type="horizontal"
          min="0"
          max="100"
          step="1"
          prefix-text=""
          suffix-text=""
          value=""
          placeholder="Search"
          class="sc-calcite-input-h sc-calcite-input-s"
          dir={this.orientation}
        >
        </calcite-input>
        <div style={{height:"5px", width:"100%"}}></div>
        <calcite-panel dir={this.orientation} height-scale="s" intl-close="Close" theme="light">
          <div class="heading" slot="header-content">
            <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label" style={{display:'flex', flexDirection:"row"}}>
              <div><calcite-icon icon="nodes-unmerge" scale="m" aria-hidden="true"></calcite-icon></div>
              <div>Asset id: 123456</div>
            </div>
          </div>
          <calcite-action
            text="Action"
            label="Action"
            slot="header-actions-start"
            icon="chevron-up"
            appearance="solid"
            scale="s"
          ></calcite-action>
          <calcite-action
            text="Action"
            label="Action"
            slot="header-actions-end"
            icon="zoom-to-object"
            appearance="solid"
            scale="s"
          ></calcite-action>
        </calcite-panel>
        <calcite-card dir={this.orientation}>
            <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label" style={{display:'flex', flexDirection:"row"}}>
              <div style={{display:"flex", flex:"1"}}><calcite-icon icon="nodes-unmerge" scale="m" aria-hidden="true"></calcite-icon></div>
              <div style={{display:"flex", flex:"3"}}>Bypass asset for the next trace</div>
              <div style={{display:"flex", flex:"1", justifyContent:"flex-end"}}>
                <calcite-switch
                  name="setting"
                  value="enabled"
                  switched=""
                  scale="m">
                </calcite-switch>
              </div>
            </div>
            <div style={{height:"5px", width:"100%"}}></div>
            <div class="sc-calcite-label-h sc-calcite-label-s sc-calcite-label" style={{display:'flex', flexDirection:"column"}}>
              <div>Terminal</div>
              <div>
                <calcite-select
                  label="Select a Terminal"
                  dir={this.orientation}
                  scale="m"
                  theme="light"
                  width="auto"
                  calcite-hydrated=""
                  >
                  <calcite-option selected={true} calcite-hydrated="">Terminal 1</calcite-option>
                </calcite-select>
              </div>
            </div>
        </calcite-card>
      </div>
    )
  }

  clickTabChange = (tab:string) => {
    this.currentTab = tab;
  }

  clickShowAllFlags = (type:string, show:boolean) => {
    this.showFlagsType = type;
    this.showAllFlags = show;
  }

  clickShowFlagAssetOptions =(id:string, show:boolean) => {
    console.log('here');
    this.popoverIdLink = id;
    this.showFlagAssetPopper = show;
  }

  clickShowFlagTerminal =(id:string) => {
    let localFlag = [...this.flags];
    localFlag.map((f:any) => {
      if(f.globalId === id) {
        f.showTerminal = !f.showTerminal;
      }
    });
    this.flags = localFlag;
  }

  clickShowResultsDetails(show:boolean) {
    this.showResultsDetails = show;
  }

  clickCanExecute =() => {
    let atleastOneStart = this.flags.some((f:any) => {
      return f.traceLocationType === 'startingPoint';
    });
    if(atleastOneStart) {
      this.clickTabChange('output');
      this.showExecuteNotice = false;

      let haveTraces = this.traces.filter((t:any) => {
        return t.selected === true;
      })

      if(haveTraces.length > 0) {
        console.log(haveTraces);
        console.log(this.unObj);
        haveTraces.map((t:any) => {
          let params = {
            query: {
              gdbVersion:'sde.DEFAULT',
              sessionId:this.appToken,
              moment:'',
              traceType: t.traceType,
              traceLocations: this.flags,
              traceConfigurationGlobalId:t.globalId,
              traceConfiguration:'',
              token:this.appToken
            }
          };
          this.unHandler.executeTrace(t, this.unObj.networkServiceUrl, params.query, params).then((results:any) => {
            this.traceResults = results;
          });
        });
      }


    } else {
      this.showExecuteNotice = true;
    }
  }

  clickAddFlag =(type:string, geomType:string) => {
    //let newFlags = [...this.flags];
    //newFlags.push(
    //  {traceLocationType:type, globalId: type + (this.flags.length +1), terminal:0, allTerminals:[{terminalid:0, terminalName:'High Side'},{terminalid:1, terminalName:'Low Side'}], showTerminal:false}
    //);
    //this.flags = newFlags;
    let param = {type:type, geometryType:geomType};
    this.emitFlagChange.emit(param);
  }

  clickRemoveAllFlag =(type:string) => {
    let filtered = this.flags.filter((f:any) => {
      return f.traceLocationType !== type;
    });
    this.flags = filtered;
    this.showAllFlags = false;
  }

  searchAsset =(parameter:string, search: string, arrayList:any) => {
    arrayList.filter((al:any) => {
      return al[parameter].indexOf(search) > -1;
    });
    return arrayList;
  }



  queryFeaturesForFlag =(screenPoint:any) => {
    loadModules(["esri/geometry/Point"], options)
    .then(([Point]) => {
      let srcPoint = JSON.parse(screenPoint);
      const point = new Point.default({
        x: srcPoint.mapPoint.x,
        y: srcPoint.mapPoint.y,
        spatialReference: srcPoint.mapPoint.spatialReference
      });
      this.unHandler.queryAssetByGeom(point).then((results:any) => {
        if(results.length > 0) {
          let newFlags = [...this.flags];
          results.map(async(res:any) => {
            console.log(res);
            //if it's line, get percentage along
            if(res.layer.geometryType === 'polyline') {
              const perct = await this.geometryHandler.getPercentageAlong(res.geometry,  point, res.geometry.spatialReference);
              newFlags.push(
                {traceLocationType:'startingPoint', globalId: res.attributes.globalid, percentAlong: perct}
              );
            } else {
              //it's a point, query terminals
            }

          });
          this.flags = newFlags;
        }
      });
    })
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
      if(this.traces.length > 0) {
        this.traces.map((tc:any) => {
          if(tc.traceType === 'isolation') {
            this.unHandler.executeTrace(tc.traceType, this.flags, '', tc.globalId).then((results:any) => {
              this.processResults(tc.traceConfiguration.includeIsolated, results.traceResults);
              //this.emitTraceResults.emit({isIsolated:tc.traceConfiguration.includeIsolated, results:results.traceResults});
            });
          }
        });
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
