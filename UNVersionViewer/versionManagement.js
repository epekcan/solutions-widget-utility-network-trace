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
  'dojo/text!./versionManagement.html',
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
    baseClass: 'create-version',
    templateString: template,
    nls: null,
    versionName: null,
    versionScope: "public",

    postCreate: function() {
      this.inherited(arguments);
      this._createBasicTitleForm();
      this._createScopeRadio();
      //domStyle.set(this.versionChooserOptions, "display", "block");
      //domStyle.set(this.versionMyContentHolder, "display", "none");

    },

    _createBasicTitleForm: function() {
      var versionToMapForm = domConstruct.create("div", {width: "100%"});
      var titleTextLabel = domConstruct.create("div", {"innerHTML": "Give a version a name", "class":"input-label versionHeaderLegend"});
      domConstruct.place(titleTextLabel, versionToMapForm);
      var versionToMapText = domConstruct.create("span");
      this.versionName = new ValidationTextBox({
        "name": "versionName",
        "required": true,
        "missingMessage": "Please provide a name",
        "class":"input-item"
      });
      this.versionName.placeAt(versionToMapText);
      domConstruct.place(versionToMapText, versionToMapForm);
      domConstruct.place(versionToMapForm, this.versionCreationText);
    },

    _createScopeRadio: function() {
      var radios = query(".scopeRadio", this.scopeSet);
      if(radios.length > 0) {
        array.forEach(radios, lang.hitch(this, function(rd) {
          this.own(on(rd, "click", lang.hitch(this, function(val) {
            var wid = registry.byNode(rd);
            if(typeof(wid) !== "undefined") {
              this.versionScope = wid.get("value");
            }
          })));
        }));
      }
    }

  });
});