import config from '@arcgis/core/config';
config.assetsPath = 'https://cdn.jsdelivr.net/npm/@arcgis/core@4.18.1/assets';
import * as GeometryEngine from '@arcgis/core/geometry/GeometryEngine';
import * as projection from "@arcgis/core/geometry/projection";

export class GeometryHandler {
  constructor() {
  }

  // calculate the percentage of where user clicked on the line
  async getPercentageAlong(sourceGeom:any, flagGeom:any, inSR:any) {
    let flagLine = flagGeom;
    const sourceLine = await this.createPolyline(sourceGeom.paths, inSR.wkid);
    if(flagGeom.type === 'point') {
      const padFlagXMin = flagGeom.x - 50;
      const padFlagXMax = flagGeom.x + 50;
      const padFlagYMin = flagGeom.y - 50;
      const padFlagYMax = flagGeom.y + 50;
      const newCoodsForLine = [
         [padFlagXMin,padFlagYMin],
         [padFlagXMax,padFlagYMax]
       ];
      flagLine = await this.createPolyline(newCoodsForLine, flagGeom.spatialReference.wkid);
      if(!projection.isLoaded()) {
        await projection.load();
      }
      const projGeom = projection.project(flagLine, inSR);
      flagLine = projGeom;
      const newGeom = GeometryEngine.cut(sourceLine,flagLine);
      if(newGeom.length > 0) {
        const sourceLength = GeometryEngine.planarLength(sourceLine,'feet');
        const piece1Length = GeometryEngine.planarLength(newGeom[0],'feet');
        const percentage = piece1Length / sourceLength;
        return([percentage]);
      } else {
        return(0.5);
      }
    } else {
      //it's a line, reproject it
      if(!projection.isLoaded()) {
        await projection.load();
      }
      const projGeom = projection.project(flagGeom, inSR);
      flagLine = projGeom;
      const newGeom = GeometryEngine.cut(sourceLine,flagLine);
      if(newGeom.length > 0) {
        //TODO: handle line that intersects couple times, for now, take first geom.
        const sourceLength = GeometryEngine.planarLength(sourceLine,'feet');
        const piece1Length = GeometryEngine.planarLength(newGeom[0],'feet');
        const percentage = piece1Length / sourceLength;
        return([percentage]);
      } else {
        return(0.5);
      }
    }
  }

  //create a polyline to use tor percentage along calculation
  async createPolyline(geom:any, inSR:any) {
    //return new Promise(async(resolve, reject) => {
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
      return(newLine);
    //});
  }

  async intersectToPoint(geometry:any, flagGeom: any, sourceSR:any) {
    let flagPointArray = [];
    const sourceLine = await this.createPolyline(geometry.paths, sourceSR.wkid);
    const flagToProjected:any = await this.projectGeometry(flagGeom, sourceSR);
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

  //create a buffer for clicked point
  createBuffer(geom:any, distance, units) {
    return GeometryEngine.buffer(geom, distance, units);
  }

  async projectGeometry(sourceGeom:any, targetSR:any) {
    if(!projection.isLoaded()) {
      await projection.load();
    }
    const projGeom = projection.project(sourceGeom, targetSR);
    return projGeom;
  }


}