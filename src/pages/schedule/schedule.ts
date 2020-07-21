import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { SocialLoginPage } from '../sociallogin/sociallogin';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';
import { HelperProvider } from '../../providers/helper';
import { ScheduleProvider } from '../../providers/schedule';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  ARR_ITEMS = [];
  public form: FormGroup;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  //showBlue: boolean = true;

  constructor(public navCtrl: NavController, 
    private schedule: ScheduleProvider,
    private helper: HelperProvider, private zbar: ZBar, private formBuilder: FormBuilder, private geolocation: Geolocation) {

    this.form = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required])],
      'tel': '',
      'niver': '',
      'cpf': ''
  });


  }

 

  ionViewWillEnter(){
    //setTimeout(() => {
      //this.showBlue = false;
      //this.initializeMapbox();
    //}, 1000);
    this.loadSchedules('broid', 1);
  }

  loadSchedules(type: string, value: number)
  {
    this.helper.showLoading("Aguarde");
    this.schedule.getSchedules(type, value)
    .subscribe(
      data => {
        this.ARR_ITEMS = data;
        this.helper.hideLoading();     
      }, error => {
        this.helper.presentToast('Não foi possível carregar os agendamentos');
        this.helper.hideLoading();     
      }
    );
  }

  searchPage(){
   this.navCtrl.push(SocialLoginPage, {title: "", type: 1});
  }

  clearHome(){
    //
  }

  signin(type: number){
    //check if is logged
    //turn to especific page or signup/signin
  }

  scanImage(){
    let options: ZBarOptions = {
      flash: 'off',
      text_title: 'Ler QR Code',
      text_instructions: 'Focalize o QRCode na placa',
      drawSight: false
    };
    this.zbar.scan(options)
    .then(result => {
        alert(result); // Scanned code
        alert('redirect pagina detalhes imovel');
        this.helper.presentToast('Imóvel não localizado ou indisponível.');
    })
    .catch(error => {
        // console.log(error); // Error message
        this.helper.presentToast('Falha ao efetuar a leitura do QRCode.');
    });
  }

  initializeMapbox() {
    // chave da api

    var geojson = {
      type: 'FeatureCollection',
      features: [ {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-46.6565887, -23.5629]
                  },
                  properties: {
                    title: 'Mapbox',
                    description: 'TRIANON MASP'
                  }
                }, {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-46.6526147, -23.5649491]
                  },
                  properties: {
                    title: 'Mapbox',
                    description: 'Avenida Paulista'
                  }
      }]
    };
    



    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hb25ldHRvbWUiLCJhIjoiU1BhZGROYyJ9.sodwEG5A7ooeniSBtwsg6A';
    const map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v10',
      zoom: 13,
      center: [-48.8769, -23.9793],
      logoPosition: 'bottom-right',
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));

    map.on('load', function() {
      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
       
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      labelLayerId = layers[i].id;
      break;
      }
      }
       
      map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
      'fill-extrusion-color': '#aaa',
       
      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      'fill-extrusion-height': [
      "interpolate", ["linear"], ["zoom"],
      15, 0,
      15.05, ["get", "height"]
      ],
      'fill-extrusion-base': [
      "interpolate", ["linear"], ["zoom"],
      15, 0,
      15.05, ["get", "min_height"]
      ],
      'fill-extrusion-opacity': .6
      }
      }, labelLayerId);

      geojson.features.forEach(function(marker) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker-bro';
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
          .addTo(map);
      });

       /* var url = 'https://wanderdrone.appspot.com/';
      window.setInterval(function() {
        map.getSource('drone').setData(url);
        }, 2000);

        map.addSource('drone', { type: 'geojson', data: url });
        map.addLayer({
          "id": "drone",
          "type": "symbol",
          "source": "drone",
          "layout": {
          "icon-image": "rocket-15"
        }
        }); */
      }); 

    this.geolocation.getCurrentPosition()
      .then((response) => {
        this.startPosition = response.coords;
        map.setCenter([this.startPosition.longitude, this.startPosition.latitude]);

        var marker = new mapboxgl.Marker()
          .setLngLat([this.startPosition.longitude, this.startPosition.latitude])
          .addTo(map);
      })

      


      
  }

    calculateRoute() {
      if (this.destinationPosition && this.startPosition) {
        const request = {
          origin: this.startPosition,
          destination: this.destinationPosition,
          travelMode: 'DRIVING'
        };
        //this.traceRoute(this.directionsService, this.directionsDisplay, request);
      }
    }

    traceRoute(service: any, display: any, request: any) {
      service.route(request, function (result, status) {
        if (status == 'OK') {
          display.setDirections(result);
        }
      });
    }


}
