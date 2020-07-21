import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper';
import { LoginProvider } from '../../providers/login';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpClient } from '@angular/common/http';
import { PositionsProvider } from '../../providers/positions';
import { Global } from '../../providers/global';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../login/login';
import { BrokersProvider } from '../../providers/brokers';
import { HomePage } from '../home/home';
//import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {

  @ViewChild('map') mapElement: ElementRef;
  
  private map: any;

  private _pairingBroker: boolean = false;
  private _brokerDetails: boolean = false;
  private _brokerBusy: boolean = false;
  private _noBrokersNear: boolean = false;
  private _currLat: any;
  private _currLng: any;
  private _proID: any;
  private _broID: any;
  private _reaID: any;

  private broker_id;
  private broker_img;
  private broker_name;
  private broker_email;
  private broker_phone;
  private broker_minutes;
  private broker_dist;

  private ARR_ITEMS = [];
  private hour_broker;
  private hour_others;
  private hour_visit;

  private _showFlow: boolean = false;

  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              private helper: HelperProvider, 
              private globals: Global,
              private positions: PositionsProvider,
              private brokers: BrokersProvider,
              private geolocation: Geolocation) {
  }

  ionViewWillEnter()
  {
    this._currLat = this.navParams.get('lat');
    this._currLng = this.navParams.get('lng');
    this._proID = this.navParams.get('pro_id');
    this._broID = this.navParams.get('bro_id');
    this._reaID = this.navParams.get('rea_id');
     
    mapboxgl.accessToken = this.globals.mapboxToken;

    this.map = new mapboxgl.Map(
    {
      container: this.mapElement.nativeElement,
      center: [this._currLng, this._currLat],
      style: 'mapbox://styles/mapbox/outdoors-v10',
      bearing: 1,
      zoom: 13
    });

    this.initializeMapbox(this._currLat, this._currLng); 

  }

  initializeMapbox(lat: any, lng: any) 
  {
   
    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
  

  /**
   * Get Current Brokers near you and the property
   * The maximum distance range is 5KM - AS DEFINED
   * Controlled by API
   */
     /*  var data = 'http://107.180.79.23/api/v1/position/broid/1';
      map.on('load', function () {
        window.setInterval(function() {
          //console.log(data.latitude);
        map.getSource('drone').setData(data);
        }, 10000);
        map.addSource('drone', { type: 'geojson', data: data });
        map.addLayer({
        "id": "drone",
        "type": "symbol",
        "source": "drone",
        "layout": {
        "icon-image": "rocket-15"
        }
        });
        }); */
   
    //},
    //error => { 
      //this.helper.hideLoading();
    //  this.helper.presentToast("Ocorreu um erro ao obter os dados!");
    //});
        
        
    this.map.on('load', ret => {

      /**
       * Function to get near brokers in find mode
       */
      var currentMarkers=[];
      var brokerInProgress = localStorage.getItem("brokerInProgress");

      if (isNaN(parseInt(brokerInProgress)))
      {
        //this._brokerBusy = false;
        this.helper.showLoading('Buscando corretores disponíveis');
        var timer = window.setInterval(async res => {
          var coords = {latitude: lat, longitude: lng};
          this.brokers.nearBrokers(coords).subscribe(data => { 
            if (currentMarkers !== null){
              for (var i = currentMarkers.length - 1; i >= 0; i--){
                if (currentMarkers[i] !== undefined){
                    currentMarkers[i].remove();
                }
              }
            }
            data.features.forEach(marker => {
              this._noBrokersNear = false;
              var el = document.createElement('div');
              el.className = 'animated fadeIn marker-bro';
              var oneMarker = new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(this.map);
              currentMarkers.push(oneMarker); 
              el.addEventListener('click', () => { 
                this.brokerDetails(marker.data);
              });
            });
            this.helper.hideLoading();
  
          }, error => {
            if(this._noBrokersNear == false){
              this.helper.hideLoading();
              this.helper.presentToast("Nenhum corretor próximo disponível!");
              //window.clearInterval(timer);
              this._noBrokersNear = true;
            }
          });
        }, 7000); 
      } 


      
      /**\
       * Get the broker current position in visit mode
       */
     
      if (!isNaN(parseInt(brokerInProgress)) && parseInt(brokerInProgress) > 0)
      {
        this.helper.showLoading('Buscando posição do corretor');
        var timerPos = window.setInterval(async res => {
          this.positions.getPositions(brokerInProgress, lat, lng).subscribe(data => { 
            var coordinates = data.features[0].geometry.coordinates;
            var measures = data.features[0].geometry.measures;
           
              if (this.map.getLayer('trace-')) this.map.removeLayer('trace-');
              if (this.map.getSource('trace-')) this.map.removeSource('trace-');

              data.features[0].geometry.coordinates = [coordinates[0]];
              data.features[0].geometry.measures = [measures[0]];
              this.map.addSource('trace-', { type: 'geojson', data: data });
              this.map.addLayer({
                "id": "trace-",
                "type": "line",
                "source": "trace-",
                "paint": {
                  "line-color": "#3599d5",
                  "line-opacity": 0.75,
                  "line-width": 7
                }
              });
              
              this.map.setPitch(30);  

              var i = 0;
              var timerPos1 = window.setInterval(async res => {
                if (i < coordinates.length) 
                {
                  data.features[0].geometry.coordinates.push(coordinates[i]);
                  data.features[0].geometry.measures.push(measures[i]);

                  this.broker_dist = data.features[0].geometry.measures[i][0];
                  this.broker_minutes = data.features[0].geometry.measures[i][1];

                  this.map.getSource('trace-').setData(data);
                  //this.map.panTo(coordinates[i]);
                  
                  if (coordinates[i])
                  {
                    if (currentMarkers !== null){
                      for (var j = currentMarkers.length - 1; j >= 0; j--){
                        if (currentMarkers[j] !== undefined){
                            currentMarkers[j].remove();
                        }
                      }
                    }

                    var el = document.createElement('div');
                    el.className = 'marker-bro';
                    var oneMarker = new mapboxgl.Marker(el)
                      .setLngLat(coordinates[i])
                      .addTo(this.map);
                      currentMarkers.push(oneMarker);
                  }
                  i++;

                }else{
                  window.clearInterval(timerPos1);
                }

              }, 50);

              this.broker_name = data.features[0].data.name;
              this.broker_email = data.features[0].data.email;
              this.broker_phone = data.features[0].data.phone;
              this.broker_img = data.features[0].data.avatar;
              this._brokerBusy = true;

              this.positions.getVisit(this._proID).subscribe(data => { 

              this.ARR_ITEMS = data;
              this.hour_broker = this.ARR_ITEMS[0].hour_broker;
              this.hour_others = this.ARR_ITEMS[0].hour_others;
              this.hour_visit = this.ARR_ITEMS[0].hour_visit;

               
              }, error => {
                this._brokerBusy = false;
                this.helper.presentToast("Falha ao obter detalhes da visita.");
              });

            this.helper.hideLoading();
          }, error => {
            //this.helper.presentToast("Ocorreu um erro ao obter as localizações!");
            this.helper.hideLoading();
          });
  
        }, 10000);
      }  
    }); 
  }
  
  cancelVisit(dist: any)
  {
    //if (parseInt(dist) <= 1)
    //{
     // this.helper.presentAlert("Corretor próximo!", "O corretor já está a menos de 1km do imóvel. Não é mais possível cancelar.");
    //}else{
      this.helper.presentConfirm("Atenção", "Deseja cancelar esta visita?", res => {
        
        this.helper.showLoading('Cancelando visita');

        var brokerInProgress = localStorage.getItem("brokerInProgress");
        
        this.positions.cancelVisit(brokerInProgress).subscribe(data => { 
          
          this.helper.hideLoading();
          localStorage.removeItem("brokerInProgress");
          localStorage.removeItem("propertyBusy");
          this.navCtrl.setRoot(HomePage);
          this.helper.presentToast("A visita foi cancelada com sucesso!");
           
          }, error => {

            this.helper.hideLoading();
            this.helper.presentToast("Falha ao cancelar a visita." + JSON.stringify(error));

          });

      });
    //}
  }


  callBroker()
  {
    if (localStorage.getItem('logged') !== null)
    {
      this._pairingBroker = true;
      this._brokerDetails = false;
      var data = {broid: this.broker_id, proid: this._proID, reaid: this._reaID};
      this.brokers.callBroker(data).subscribe(data => { 
        this._pairingBroker = false;
        this.helper.presentToast("Solicitação enviada! Aguarde confirmação do corretor!");
      }, error => {
        this._pairingBroker = false;
        this._brokerDetails = true;
        this.helper.presentToast("Ocorreu um erro ao comunicar-se com o corretor. Tente novamente!");
      });
    }else{
      this.navCtrl.push(LoginPage, {type: 1, redirect: "MapsPage", broid: 0, proid: this._proID, reaid: this._reaID});
    }
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  showHideFlow()
  {
    var sh_f = document.getElementById('div-flow');
    var h_f = document.getElementById('hide-flow');
    if (this._showFlow == false)
    {
      this._showFlow = true;
      sh_f.classList.add('show-key');
      h_f.classList.remove('hide-flow');
    }else if (this._showFlow == true){
      this._showFlow = false;
      sh_f.classList.remove('show-key');
      h_f.classList.add('hide-flow');
    }
  }

  brokerDetails(data: any)
  {
    window.setTimeout(function(){
      this._brokerDetails = false;
    }, 2000);
    this.broker_id = data.broid;
    this.broker_img = data.avatar;
    this.broker_name = data.name;
    this.broker_email = data.email;
    this.broker_phone = data.phone;
    this.broker_minutes = data.minute;
    this.broker_dist = data.distance;
    this._brokerDetails = true;
   
  }
 

}