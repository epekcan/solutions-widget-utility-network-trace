import { GeometryHandler } from "./geometry_handler";
export declare class UnTraceHandler {
  host: string;
  unName: string;
  gdbVersion: string;
  token: string;
  constructor(host: any, name: any, gdbVersion: any, token?: any);
  geometryHandler: GeometryHandler;
  getToken(): Promise<unknown>;
  getTraces(searchByUser?: string): Promise<any>;
  executeTrace(traceType: string, flags: Array<any>, traceConfig?: any, traceId?: string): Promise<any>;
  queryForFeature(layer?: any, geom?: any, moment?: string): Promise<any>;
  queryDataElement(): Promise<unknown>;
  findControllerLayer(de: any): {};
  queryLayersForFlag(controller: any): any[];
  queryATAGTerminals(controller: any): any[];
  _getTerminalSources(controller: any, domain: any, sourceType: string): any[];
  _getTerminalConfig(controller: any, terminalId: number): any;
  _request(requestObj: any): Promise<any>;
}
