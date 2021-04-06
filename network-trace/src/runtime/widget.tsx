/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx, DataSourceManager, css, ThemeVariables, SerializedStyles,
  lodash, Immutable, defaultMessages as jimuCoreMessages, getAppStore, SessionManager, urlUtils, WidgetManager } from 'jimu-core';
import { Alert,
  defaultMessages as jimuUIDefaultMessages,
  maxSizeModifier, applyMaxSizeModifier, getCustomFlipModifier
} from 'jimu-ui';
import { JimuMapViewComponent, JimuMapView, loadArcGISJSAPIModules } from "jimu-arcgis";
import { IMConfig } from '../config';

import { defineCustomElements } from './component/esm/loader';
import { applyPolyfills } from './component/esm/polyfills/index';
import defaultMessages from './translations/default'
const refreshIcon = require('jimu-ui/lib/icons/reset.svg');

applyPolyfills().then(() => {
  defineCustomElements(window);
});

const modifiers = [
  getCustomFlipModifier({fallbackPlacements: ['top', 'left', 'right'], useClosestVerticalPlacement: true}),
  maxSizeModifier,
  applyMaxSizeModifier
];
const menuProps = { zIndex: '2002' };

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any> {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      activeVersion: '',
      drawingLayer: null,
      currentSketchViewModel: null
    };
  }
  drawingLayer: null;
  graphic: null;
  sketchViewModel: null;
  //drawingLayer = new GraphicsLayer();
  //geometryService = new GeometryService(this.props.portalSelf.helperServices.geometry.url);


  componentWillMount() {
    //window.customElements.define("un_trace_manager", un_trace_manager);

    console.log(this);
    const token = this.getServiceToken('https://dev0016770.esri.com/server/rest/services/Water_Distribution_Utility_Network/FeatureServer');
    this.loadJSAPIGraphics();
    this.getMapView();
    this.setState({token: token});

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate(preProps, preState) {
    const { config } = this.props;
    if (window.jimuConfig.isInBuilder) {
      //if in builder, switching simple/advanced updates the widget in the canvas
    }
  }

/*
        <un_trace_manager
          apptoken={this.state.token}
          host={'https://dev0016770.esri.com'}
          name={'Water_Distribution_Utility_Network'}
          gdbversion={'sde.Default'}
        />

        <my-component first="Previn" last="Wong" middle="none" />
*/


  render() {
    const { theme } = this.props;

    let jmc;
    jmc = <Alert color='danger'> {this.formatMessage('warningNoMap')} </Alert>;
    if (this.props.config.hasOwnProperty("useMapWidgetIds") &&
      this.props.config.useMapWidgetIds &&
      this.props.config.useMapWidgetIds.length >= 1) {
      jmc = <JimuMapViewComponent
        useMapWidgetId={this.props.config.useMapWidgetIds?.[0]} onViewsCreate={this.viewsCreateHandler} onActiveViewChange={this.activeViewChangeHandler} />;
    }

    return (
      <div className="jimu-widget display-flex-column-1 overflow-auto" style={{ backgroundColor: theme.surfaces[1].bg, height: '100%', padding: 10 }}
        css={this.getStyle(this.props.theme)}>
        trace widget

        <un-trace-manager
          apptoken={this.state.token}
          host={'https://dev0016770.esri.com'}
          name={'Water_Distribution_Utility_Network'}
          gdbversion={'sde.Default'}
        />

        {jmc}

      </div>
    );
  }

  viewsCreateHandler =(viewIds: any) => {
    console.log("views created");
    //console.log(viewIds);
    //this.loadJSAPISketch(viewIds[0]);
  }


  activeViewChangeHandler =(jmv: JimuMapView) => {
    console.log("active view changed");
    console.log(jmv);
    this.loadJSAPISketch(jmv);
  }


  //********************** */
  //UI Helper functions
  toggleCreationModel = (status: boolean) => {
    if (status) {
      this.setState({ showVersionSettingsModal: false, showCreationAlert: false, creationAlertMsg: '', userSearchValue: '', portalUsers: [], autoSwitchVersion: false });
    } else {
      this.setState({ showVersionSettingsModal: true, showCreationAlert: false, creationAlertMsg: '', userSearchValue: '', portalUsers: [], autoSwitchVersion: false });
    }
  }
  //END helper functions
  //*************************** */

  //************************ */
  //get session token
  getServiceToken =(url:string) => {
    const baseURL = urlUtils.getUrlHost(url.toLowerCase());
    const session = SessionManager.getInstance();
    const allSessions = session.getSessions();
    allSessions.filter((as:any) => {
      return (((as.portal).toLowerCase()).indexOf(baseURL) > -1);
    });
    let serviceToken = this.props.token;
    if(allSessions.length > 0) {
      serviceToken = allSessions[0].token;
    }
    return serviceToken;
  }

  //Find Map from Datasource
  getMapDS = async (mapConf: any) => {
    let foundMap:any = null;
    const ds = DataSourceManager.getInstance();
    if(this.props.useDataSources) {
      if(this.props.useDataSources.length > 0) {
        await ds.createDataSourceByUseDataSource(this.props.useDataSources[0], this.props.widgetId);
        const dsList = ds.getDataSources();
        for(const key in dsList) {
          if(dsList[key].type === 'WEB_MAP') {
            foundMap = dsList[key];
          }
        }
        const mapView = this.getMapView();
        console.log(mapView);
      }
    }
    console.log(foundMap);
    return foundMap;
  }

  //get map view
  getMapView = () => {
    /*
    let jmc;
    jmc = <Alert color='danger'> {this.formatMessage('warningNoMap')} </Alert>;
    if (this.props.config.hasOwnProperty("useMapWidgetIds") &&
      this.props.config.useMapWidgetIds &&
      this.props.config.useMapWidgetIds.length >= 1) {
      jmc = <JimuMapViewComponent
        useMapWidgetIds={this.props.config.useMapWidgetIds} onViewsCreate={this.viewsCreateHandler} onActiveViewChange={this.activeViewChangeHandler} />;
    }
    console.log(jmc);
    return jmc;
    */
  }


  loadJSAPIGraphics =() => {
    return new Promise((resolve, reject) => {
      loadArcGISJSAPIModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic']).then(async ([GraphicsLayer, Graphic]) => {
        const gl = new GraphicsLayer();
        const grp = new Graphic();
        this.drawingLayer = gl;
        this.graphic = grp;
        resolve(true);
      });
    });
  }

  loadJSAPISketch =(jmv:any) => {
    return new Promise((resolve, reject) => {
      loadArcGISJSAPIModules([
        'esri/widgets/Sketch']).then(async ([Sketch]) => {
          jmv.view.map.addMany([this.drawingLayer]);
          const sketchVM = new Sketch({
            view: jmv.view,
            layer: this.drawingLayer,
            updateOnGraphicClick: false,
            polylineSymbol: {
              type: "simple-line",
              color: "#00FFFF",
              width: 2
            },
            defaultUpdateOptions: {
              // set the default options for the update operations
              toggleToolOnClick: false // only reshape operation will be enabled
            }
          });
          sketchVM.on("create", event => {
            if (event.state === "complete") {
              console.log('completed');
            } else if (event.state === "cancel") {
              console.log('cancel');
            }
          });
          this.sketchViewModel = sketchVM;
          jmv.view.ui.add(sketchVM, "top-right");
          sketchVM.create("polygon", { mode: "freehand" });
          resolve(true);
      });
    });
  }


  _getSizeOfContainer(): ClientRect {
    const layoutElem = document.querySelector('div.gdb-version-management');
    if (layoutElem) {
      return layoutElem.getBoundingClientRect();
    }
    return null;
  }

  _sizePopperHeight = (offset: number) => {
    let returnSize = null;
    const widgetSize = this._getSizeOfContainer();
    if (widgetSize !== null) {
      returnSize = this._getSizeOfContainer().height - offset;
    } else {
      returnSize = 'auto';
    }
    return returnSize;
  }

  _sizePopperWidth = (offset: number) => {
    let returnSize = null;
    const widgetSize = this._getSizeOfContainer();
    if (widgetSize !== null) {
      returnSize = this._getSizeOfContainer().width - offset;
    } else {
      returnSize = 'auto';
    }
    return returnSize;
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreMessages);
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] }, values);
  }

  //END config get/set
  //************************ */


  //************************** */
  //CSS for rendering the UI
  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      .td-middle {
        vertical-align: middle !important;
      }
      .background-light{
        background-color: ${theme.colors.primary};
      }
      .display-flex-column-1{
        flex:1;
        flex-direction:column;
        display:flex;
      }
      .display-flex-row-1{
        flex:1;
        flex-direction:row;
        display:flex;
      }
      .simple-view-header-bgcolor{
        background: ${theme.colors.primary};
        color: ${theme.colors.light};
      }
      .overflow-auto{
        overflow:'auto';
      }
      .button-inactive-color{
        background: ${theme.colors.secondary};
      }
      .button-active-color{
        background: ${theme.colors.primary};
      }
      .icon-inactive-color{
        background: ${theme.colors.palette.light[700]};
      }
      .icon-active-color{
        background: ${theme.colors.palette.primary[700]};
      }
      .flex-center{
        align-items:center;
        display:flex;
      }
      .padding-left-right-5{
        padding-left:5;
        padding-right:5;
      }
      .color-dark-small-font{
        color: ${theme.colors.dark};
        font-family: ${theme.typography.fontFamilyBase};
        font-size: ${theme.typography.sizes.display6};
      }
      .color-primary-small-font{
        color: ${theme.colors.primary};
        font-family: ${theme.typography.fontFamilyBase};
        font-size: ${theme.typography.sizes.display6};
        font-weight:bold;
      }
      .color-light-small-font{
        color: ${theme.colors.light};
        font-family: ${theme.typography.fontFamilyBase};
        font-size: ${theme.typography.sizes.display6};
      }
      .cursor-hand {
        cursor: pointer;
      }

    `
  }


/*
import * as  Point from 'esri/geometry/Point';
import * as  Draw from 'esri/views/draw/Draw';
import * as  Graphic from 'esri/Graphic';
import * as  GeometryService from 'esri/tasks/GeometryService';
import * as  SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import * as  GraphicsLayer from 'esri/layers/GraphicsLayer';
import * as  geodesicUtils from 'esri/geometry/support/geodesicUtils';
import * as  SpatialReference from 'esri/geometry/SpatialReference';
import * as  Geoprocessor from 'esri/tasks/Geoprocessor';
*/

/*
import GeometryService = require("esri/tasks/GeometryService");
import SketchViewModel = require("esri/widgets/Sketch/SketchViewModel");
import GraphicsLayer = require("esri/layers/GraphicsLayer");
import Graphic = require("esri/Graphic");
import Geoprocessor = require("esri/tasks/Geoprocessor");
import geodesicUtils = require("esri/geometry/support/geodesicUtils");
import SpatialReference = require("esri/geometry/SpatialReference");
*/


}
