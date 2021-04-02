export declare class GeometryHandler {
  constructor();
  getPercentageAlong(sourceGeom: any, flagGeom: any, inSR: any): Promise<number[] | 0.5>;
  createPolyline(geom: any, inSR: any): Promise<__esri.Polyline>;
  intersectToPoint(geometry: any, flagGeom: any, sourceSR: any): Promise<any[]>;
  createBuffer(geom: any, distance: any, units: any): __esri.Polygon | __esri.Polygon[];
  projectGeometry(sourceGeom: any, targetSR: any): Promise<__esri.Geometry | __esri.Geometry[]>;
}
