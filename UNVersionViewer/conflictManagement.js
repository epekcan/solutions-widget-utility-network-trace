///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/event',
  'dojo/on',
  'dojo/Evented',
  'dojo/dom-style',
  'dojo/dom-attr',
  'dojo/dom-construct',
  "dojo/query",
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  "dijit/registry",
  'dojo/text!./conflictManagement.html',
  'esri/graphicsUtils',
  'esri/tasks/FeatureSet',
  'jimu/dijit/AddItemForm',
  'jimu/dijit/Popup',
  'jimu/dijit/Message',
  'jimu/dijit/CheckBox',
  'jimu/dijit/RadioBtn',
  'dijit/form/ValidationTextBox',
], function(declare, lang, array, Event, on, Evented, domStyle, domAttr, domConstruct, query, _WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin, registry, template, graphicsUtils, FeatureSet, AddItemForm, Popup, Message, CheckBox, RadioButton, ValidationTextBox) {
  return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented], {
    baseClass: 'conflict-management',
    templateString: template,
    nls: null,
    recordSet: null,

    postCreate: function() {
      this.inherited(arguments);

    }

  });
});