import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HelperProvider } from '../../providers/helper';
import { StatusBar } from '@ionic-native/status-bar';
import { Global } from '../../providers/global';
import { PropertyProvider } from '../../providers/property';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  HtmlInfoWindow,
  Marker
} from "@ionic-native/google-maps";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  favs: any;

  public startPosition: any;
          ARR_ITEMS = [];
          originPosition: string;
          destinationPosition: string;
          near: string;

          infoWindows: any;
          coordinate: any;
          //directionsService = new google.maps.DirectionsService();
          //directionsDisplay = new google.maps.DirectionsRenderer();
         

  constructor(private navParams: NavParams, 
              private statusBar: StatusBar, 
              public navCtrl: NavController, 
              private helper: HelperProvider, 
              public googleMaps: GoogleMaps, 
              private platform: Platform,
              private global: Global,
              public zone: NgZone, 
              private launchNavigator: LaunchNavigator,
              private geolocation: Geolocation,
              private property: PropertyProvider) {

      this.near = this.navParams.get('near');
      (window as any).angularComponent = { goToStore: this.goToStore, zone: zone, navCtrl: this.navCtrl, openProperty: this.openProperty };
        this.infoWindows = [];
        this.coordinate = {
          latitude: '', 
          longitude: ''
        }
  }

  scrolling(event) 
  { 
    //var elmnt = document.getElementsByTagName("ion-header")[0];
   // const sheet = new CSSStyleSheet();
    //sheet.insertRule('#target {color: darkseagreen}');
   // elmnt.innerHTML = sheet;
  }

  private openProperty(proid: number) 
  {
    this.navCtrl.push(DetailsPage, { proid: proid });
  }

  goBack() 
  {
    this.navCtrl.pop();
  }

  async ionViewWillEnter()
  {

    this.favs = "";
    var checkFavourites = localStorage.getItem('favourites');
    if (checkFavourites != null){
      var getFavourites = checkFavourites.split(",");
      for(var a = 0; a < getFavourites.length; a++){
        if (getFavourites[a] != 'null' && getFavourites[a] != 'undefined' && getFavourites[a] != '' &&
        getFavourites[a] != null && getFavourites[a] != undefined && getFavourites[a].substring(0, 4) != 'null'){
          this.favs += getFavourites[a] + ',';
        }
      }
    }else{
      this.favs = '0';
    } 

    var jsonFavs = {favs: this.favs}

    await this.helper.showLoading("Aguarde");
      await this.property.getHighlights(jsonFavs).subscribe(
        async data => {
          this.ARR_ITEMS = data;
          await this.helper.hideLoading();
        },
        async error => {
          await this.helper.hideLoading();
          await this.helper.presentToast("Imóvel não localizado ou indisponível.");
        }
      );
      //this.initializeMapbox();
  }


  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() 
  {
    let map: GoogleMap = this.googleMaps.create(this.mapElement.nativeElement);
    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      this.geolocation.getCurrentPosition() 
        .then((resp) => {
          this.coordinate.latitude = resp.coords.latitude;
          this.coordinate.longitude = resp.coords.longitude;    
          let coordinates: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
          let position = {
            target: coordinates,
            zoom: 14
          };
          map.animateCamera(position);
          let markerOptions: MarkerOptions = {
            position: coordinates,
            icon: "assets/icon/v2/home_ico_marker.png",
            title: 'Sua localização'
          };
          const marker = map.addMarker(markerOptions)
            .then((marks: Marker) => {
              //marks.showInfoWindow();
          });
          this.getMarkers(map);
      }).catch((error) => {

          this.helper.presentToast('Erro ao recuperar sua posição');  
      });
    }) 
  }

  goToStore = (address) => {
    this.zone.run(() => {
      let options: LaunchNavigatorOptions = {
        appSelection: {
          dialogHeaderText: "Navegar até o local usando...",
          cancelButtonText: "Cancelar",
          rememberChoice: {
            enabled: false,
            prompt: {
              headerText: "Navegar até o local",
              bodyText: "Utilizar este App na próxima vez?",
              yesButtonText: "SIM",
              noButtonText: "NÃO"
            }
          }
      }};
      this.launchNavigator.navigate(address, options)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
    });
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  async getMarkers(map) 
  {
    await this.property.getDiscover(this.coordinate).subscribe(
      res => {
        res.forEach((mark) => 
        {
          this.addMarkersToMap(mark.data, map);
        });
    });
  }

  addMarkersToMap(mark, map) 
  {   
    if (mark !== null){
        let coordinates: LatLng = new LatLng(mark.latitude,
                                              mark.longitude);
        let markerOptions: MarkerOptions = {
          position: coordinates,
          icon: "assets/icon/v2/home_ico_yellow_marker.png",
          proid: mark.proid,
          urlimage: mark.urlimage,
          //animation: google.maps.Animation.DROP,
          address: "blabla"
        };
        const marks = map.addMarker(markerOptions)
          .then((marca: Marker) => {
            //mark.showInfoWindow();
            this.addInfoWindowToMarker(marca, mark);
        });
    }
  }

  addInfoWindowToMarker(mark, marker) 
  {
    var infoWindowContent = '<img border: 1vw solid white; style="z-index: 100000; width: 20vw; height: 20vw; border-radius: 10vw; position: fixed; left: calc(50% - 10vw); top: -58vw; border: 2px aliceblue solid" src="' + marker.urlimage + '">' +
    '<p style="color: black; font-size: 3vw; margin-left: 0; width: 99%; margin-right: 10px;"><br><br><strong>' + marker.title + '</strong></p>' +
    '<p style="color: black; margin-left: 0; width: 99%; margin-right: 10px;"><br>' + marker.address + '</p>' + 
    '<p onclick="window.angularComponent.openProperty(' + marker.proid + ')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -2vw;">VER IMÓVEL</p>' +
    '<p onclick="window.angularComponent.goToStore(\'' + marker.address + '\')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -3vw;">IR ATÉ LÁ</p>';

    var infoWindow = new HtmlInfoWindow();
    infoWindow.setContent(infoWindowContent, {width: "280px", height: "40vw", "border-radius": "10px", border: "2px aliceblue solid" });
    mark.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.closeAllInfoWindows();
      infoWindow.open(mark);
    });
    this.infoWindows.push(infoWindow);
  }


  

}
