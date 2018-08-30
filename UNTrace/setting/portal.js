///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'esri/request',
  'esri/geometry/geometryEngine',
  'dojo/Deferred',
  'dojo/_base/lang',
  'dojo/_base/array'
], function (
  esriRequest,
  geometryEngine,
  Deferred,
  lang,
  Message,
  array
) {

  var mo = {};
  mo.url = null;
  mo.username = null;
  mo.password = null;
  mo.token = null;

  mo.connect = function()
  {
      let tokenUrl = this.url + "/sharing/rest/generateToken";
  
      let token = null;
      let postJson = {
          username: this.username,
          password: this.password,
          referer: window.location.host,
          expiration: 60,
          f: "json"
      }
      
      return new Promise((resolve, reject) => this.makeRequest({method: 'POST', url: tokenUrl, params: postJson }).then(response=> 
           {
                if (response.token !== undefined)
                {
                  this.token = response.token; 
                  resolve(this.token);
                 }
               else
                reject("Invalid token")
           } ).catch(rejected=>reject("Fail to execute request")));
  };



  mo.items = function()
  {
      return new Promise( (resolve, reject) => {

              let userItemsUrl = this.url + "/sharing/rest/search";
              let postJson = {
                  token: this.token,
                  num : 100,
                  q : "owner:" + this.username,
                  f : "json"
              }

              this.makeRequest({method: 'POST', url: userItemsUrl, params: postJson }).then(response => {  
                  let myItems =  response;
                  resolve(myItems.results);
                })

      })

  };

  mo.loadItem = function(itemId)
  {  
      let itemUrl = this.url + "/sharing/rest/content/items/" + itemId + "/data";
      let postJson = {
          token: this.token,
          f: "json"
      }

     return this.makeRequest({method: 'POST', url: itemUrl , params : postJson })
      
  };

  mo.makeRequest = function(opts) {
      console.log(opts);
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
            
        xhr.open(opts.method, opts.url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            let jsonRes = xhr.response;
            if (typeof jsonRes !== "object") jsonRes = JSON.parse(xhr.response);
            resolve(jsonRes);
        } else {
            reject({
            status: this.status,
            statusText: xhr.statusText
            });
        }
    };

    //xhr.onerror =   err => reject({status: this.status, statusText: xhr.statusText}) ;
    xhr.onerror =   err => reject(err) ;
    

    if (opts.headers) 
    Object.keys(opts.headers).forEach(  key => xhr.setRequestHeader(key, opts.headers[key]) )

    let params = opts.params;
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') 
        params = Object.keys(params).map(key =>  encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
    
    xhr.send(params);
    });
  };


  return mo;
});