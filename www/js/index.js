/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      console.log("onDeviceReady");

      //the "db" extension is added by the library
      app.db = window.sqlitePlugin.openDatabase({name: "/Databases/map.mbtiles"});
      
      //lets test if our database works, the following sql query selects our maximum zoom level
      app.db._executeSql(
        //query
        "SELECT DISTINCT zoom_level FROM tiles ORDER BY zoom_level DESC LIMIT 1;", 
        //parameters
        [], 
        //success
        function(res) {
          console.log("success");
          //initialize Leaflet
          app.map = new L.map('map', {center:[38.8977, -77.0365], zoom: 15});
          //create MBTiles Layer
          var tile = new L.TileLayer.MBTiles('', {maxZoom: 19, tms: true, scheme: 'tms', unloadInvisibleTiles:true}, app.db);
          tile.addTo(app.map);

        },
        //error
        function(e) {
          console.log("error");
          console.log(e);
        }
      );

    },
    db : null,
    map: null
};