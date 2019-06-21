solutions-widget-utility-network-trace

A widget to perform tracing for the ArcGIS Utility Network Management Extension

## Features
* An ArcGIS Web AppBuilder Widget
* Ability to combine a series a traces into a single workflow
* Import trace ArcPy command into the configuration

## Requirements
1. A published ArcGIS Utility Network Management feature service
2. A map with atleast 1 layer that participates in the Utility Network
3. Developed for ArcGIS Web AppBuilder, use 2D layout to deploy

## Instructions
1. Create a map with atleast 1 layer that participates in the Utility Network.
2. Download ArcGIS Web AppBuilder Dev Edition (optionally run as a custom widget in ArcGis Enterprise)
3. Download this widget and add it to `<location of WAB dev edition download>/client/stemapp/widgets`
4. Register WAB dev ed to your organization
5. Create and app, select the map you created.
6. Add and configure the UNTrace widget.

## Configuration
1. Click the circle plus icon next to "User Defined Trace Group" and give your trace a name.
2. On the right side, click the icon with the square arrow with up arrow. This will let you import an ArcPy command signature.
* Sample ArcPy Command
```
arcpy.un.Trace("L950Water_Utility_Network Utility Network", "ISOLATION", r"C:\Users\Documents\ArcGIS\Projects\UN Trace\UN Trace.gdb\UN_Temp_Starting_Points", r"C:\Users\Documents\ArcGIS\Projects\UN Trace\UN Trace.gdb\UN_Temp_Barriers", "Water", "System", None, None, None, "INCLUDE_CONTAINERS", "EXCLUDE_CONTENT", "INCLUDE_STRUCTURES", "INCLUDE_BARRIERS", "DO_NOT_VALIDATE_CONSISTENCY", "'Pipe Device Status' IS_EQUAL_TO SPECIFIC_VALUE 0 OR;'Lifecycle Status' DOES_NOT_INCLUDE_ANY SPECIFIC_VALUE 24 #", None, "BOTH_JUNCTIONS_AND_EDGES", "Category IS_EQUAL_TO SPECIFIC_VALUE Disconnecting OR;Category IS_EQUAL_TO SPECIFIC_VALUE Isolating OR;Category IS_EQUAL_TO SPECIFIC_VALUE Protective #", None, "BOTH_JUNCTIONS_AND_EDGES", None, "DO_NOT_FILTER", None, None, None, None, None, None, None, None, "INCLUDE_ISOLATED_FEATURES")
```
3. After import you will see your trace added.  Add any many traces into this group as needed.
4. You can chain traces within your group together by defining the starting and barriers flags for each trace.  The type of asset you choose to set as start/barrier will be selected from the results of the previous trace.
5. Click "OK" to save your configuration.

## Usage
1. Launch the configuration application
2. Click the UNTrace widget to open it in the panel
3. Select the trace you wish to run from the dropdown
4. Click the starting point icon (flag icon) and click an asset on the map
5. Click on the run button (traingle icon) to run the trace
6. Once finish you should see the trace highlight on the map with the status "Done" on the bottom of the widget

NOTE: Works on ES6 and greater supported browsers

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2019 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](License.txt) file.
