# solutions-widget-utility-network-trace
A widget to perform tracing for the ArcGIS Utility Network Management Extension

* Developed for ArcGIS Web AppBuilder, use 3D layout to deploy
* Developed with Javascript API 4.x.  

Pre Req:
 * A published ArcGIS Utility Network Management feature service
 * A map service of the above to use in ArcGIS Web Appbuilder for visualization. (Web Scene does not support UN Feature Layers as of 8/30/18)
  
How to use:
* Create a map with the UN map service.
* Download ArcGIS Web AppBuilder Dev Edition
* Download this widget and add it to <location of WAB dev edition download>/client/stemap3dp/widgets
* Register WAB dev ed to your organization
* Create and app, select the map you created.
* Add and configure the UNTrace widget.
  
  NOTE: The widget looks for the Utility Network Feature Service, not the map service.  map service is purely for visualization.
