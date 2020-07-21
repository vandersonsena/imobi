import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HelperProvider } from '../../providers/helper';
import { StatusBar } from '@ionic-native/status-bar';
import { Global } from '../../providers/global';
import { PropertyProvider } from '../../providers/property';
import { DetailsPage } from '../details/details';


@Component({
  selector: 'page-neighboors',
  templateUrl: 'neighboors.html'
})
export class NeighboorsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  match: any;
  location: string;
  public startPosition: any;
          ARR_ITEMS = [];
          originPosition: string;
          destinationPosition: string;
          near: string;

  constructor(private navParams: NavParams, 
              private statusBar: StatusBar, 
              public navCtrl: NavController, 
              private helper: HelperProvider, 
              private global: Global,
              private property: PropertyProvider,
              private geolocation: Geolocation) {

      this.near = this.navParams.get('near');
  }

  scrolling(event) 
  { 
    //var elmnt = document.getElementsByTagName("ion-header")[0];
   // const sheet = new CSSStyleSheet();
    //sheet.insertRule('#target {color: darkseagreen}');
   // elmnt.innerHTML = sheet;
  }

  private propertyPage(proid: number) 
  {
    this.navCtrl.push(DetailsPage, { proid: proid });
  }


  goBack() 
  {
    this.navCtrl.pop();
  }

  async ionViewWillEnter()
  {
    this.match = this.navParams.get('match');
    this.location = this.navParams.get('location');
     await this.helper.showLoading("Aguarde");
      await this.property.getSearchedNeighboors(this.match.neighboor, this.match.city).subscribe(
        async data => {
          this.ARR_ITEMS = data.neighboors;
          await this.helper.hideLoading();
        },
        async error => {
          await this.helper.hideLoading();
          await this.helper.presentToast("Não foi possível buscar os imóveis desta região.");
        }
      ); 
      //this.initializeMapbox();
  }


  private async initializeMapbox() 
  {
    await this.geolocation.getCurrentPosition().then(response => {
      this.startPosition = response.coords;
      mapboxgl.accessToken = this.global.mapboxToken;
      //"pk.eyJ1Ijoiam9hb25ldHRvbWUiLCJhIjoiU1BhZGROYyJ9.sodwEG5A7ooeniSBtwsg6A";
      const map = new mapboxgl.Map({
        container: this.mapElement.nativeElement,
        style: "mapbox://styles/mapbox/outdoors-v10",
        zoom: 13,
        center: [this.startPosition.longitude, this.startPosition.latitude],
        logoPosition: "bottom-right",
        pitch: 45,
        bearing: -17.6,
        antialias: true
      });
      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
      );
      map.on("load", async res => {
        var markerUserLocation = new mapboxgl.Marker()
        .setLngLat([this.startPosition.longitude, this.startPosition.latitude])
        .addTo(map); 
        var layers = map.getStyle().layers;
        var labelLayerId;
        for (var i = 0; i < layers.length; i++) 
        {
          if (layers[i].type === "symbol" && layers[i].layout["text-field"]) 
          {
            labelLayerId = layers[i].id;
            break;
          }
        }
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"]
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"]
              ],
              "fill-extrusion-opacity": 0.6
            }
          },
          labelLayerId
        );
        await this.property.getDiscover("discover").subscribe(
          res => {
            res.forEach(function(marker) 
            {
              if (marker.data.type == "broker") 
              {
                var elBroker = document.createElement("div");
                elBroker.className = "marker-bro animated fadeIn";
                new mapboxgl.Marker(elBroker)
                  .setLngLat(marker.geometry.coordinates)
                  .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setHTML(
                      "<h3 class='title-broker-map'>" +
                        marker.data.title +
                        "</h3><p class='descr-broker-map'>" +
                        marker.data.description +
                        "</p>"
                    )
                  )
                  .addTo(map);
              }
              if (marker.data.type == "home") 
              {
                var elHome = document.createElement("div");
                elHome.className = "marker-pin animated fadeIn";
                new mapboxgl.Marker(elHome)
                  .setLngLat(marker.geometry.coordinates)
                  .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setHTML(
                      "<h3>" +
                        marker.data.title +
                        "</h3><p>" +
                        marker.data.description +
                        "</p>"
                    )
                  )
                  .addTo(map);
              }
            }
          );
        },error => {

          this.helper.presentToast("Não foi possível carregar o mapa no momento.");
        });
      });
      
    }).catch((error) => {

      console.log('Error getting location', error);
    });
  }

}
