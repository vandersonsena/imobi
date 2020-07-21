import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { SocialLoginPage } from '../sociallogin/sociallogin';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';
import { HelperProvider } from '../../providers/helper';
import { DetailsPage } from '../details/details';
import { SchedulePage } from '../schedule/schedule';
import { MapsPage } from '../maps/maps';
import { DiscoverPage } from '../discover/discover';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login';
import { PositionsProvider } from '../../providers/positions';
import { PropertyPage } from '../property/property';
import { PropertyProvider } from '../../providers/property';
import { ScheduleProvider } from '../../providers/schedule';
import { BrokersProvider } from '../../providers/brokers';
import escapeRegExp from "escape-string-regexp";
import * as moment from 'moment';
import { Filter } from './filter/filter';
import { Global } from '../../providers/global';
import { TermsPage } from '../terms/terms';
import { NeighboorsPage } from '../neighboors/neighboors';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  HtmlInfoWindow,
  Marker
} from "@ionic-native/google-maps";
import { FavoritesPage } from '../favorites/favorites';

moment.locale('pt-br');  // :| imobimapbox Im0b1@2020_mapbox

declare var google;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  @ViewChild("map") mapElement: ElementRef;

  ARR_ITEMS = [];
  ARR_PROPERTIES_OWNER_ONLINE = [];
  ARR_PROPERTIES_OWNER_OFFLINE = [];
  ARR_PROPERTY_IMV = [];
  ARR_PROPERTY_OFF_IMV = [];
  ARR_LOCATIONS = [];
  private propertyLength: number;
  public form: FormGroup;
  //private map: any;
  private search_term: string;
  private usr_user: string;
  private usr_avatar: string;
  private usr_broker: string;
  private usr_nickname: string;
  private usr_status: number = 0;
  private usr_phone: string;
  private usr_email: string;
  private usr_type: string;
  private usr_profile: string;
  private usr_logged: string;

  infoWindows: any;
  coordinate: any;
  //directionsService = new google.maps.DirectionsService();
  //directionsDisplay = new google.maps.DirectionsRenderer();
  startPosition: any;
  originPosition: string;
  destinationPosition: string;

  private _userLogged: string = "none";
  private _showFilter: boolean = false;
  private _userProfile: number = 0;
  private _brokerOffline: boolean = true;
  private _tabNum: number = 1;
  private _ownerTab: number = null;
  private _reTab: number = null;
  private lblToggle: string = "OFFLINE";

  favoriteColor: string = "amarelo";
  _colorChanges: boolean = true;

  public input_search: string = "";
  public locations_searched: string[] = [];
  
  public check = moment();
  public month = this.check.format('M');
  public monthName = this.check.format('MMMM');
  public day = this.check.format('D');
  public year = this.check.format('YYYY');
  public hour = this.check.format('HH:mm');
  public currentWeekDay = this.check.format('dddd');
  

  constructor(
    private global: Global,
    private navCtrl: NavController,
    private helper: HelperProvider,
    private login: LoginProvider,
    private brokers: BrokersProvider,
    public googleMaps: GoogleMaps, 
    private property: PropertyProvider,
    private schedule: ScheduleProvider,
    private platform: Platform,
    private zbar: ZBar,
    public zone: NgZone, 
    private launchNavigator: LaunchNavigator,
    private geolocation: Geolocation,
    private modalCtrl: ModalController
  ) {

    (window as any).angularComponent = { goToStore: this.goToStore, zone: zone, navCtrl: this.navCtrl, openProperty: this.openProperty };
    this.infoWindows = [];
    this.coordinate = {
      latitude: '', 
      longitude: ''
    }
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

  /**
   * PROFILE IDs
   * 
   * 0-1  - USER
   * 2    - BROKER
   * 3    - OWNER
   * 4    - REALESTATE
   */

  /* ionViewDidLoad() 
  {
    let check = localStorage.getItem("TO_ACTIVE");
    if (check == "true") 
    {
      localStorage.setItem("TO_ACTIVE", "false");
      this.loadProperties(1, 3);
    } else {
      localStorage.setItem("ARR_PROPERTY_IMV", JSON.stringify([]));
      localStorage.setItem("ARR_PROPERTY_OFF_IMV", JSON.stringify([]));
      this.loadProperties(1, 3);
    }
  } */

  visitsPage() {}

  /**
   * Open profile based TABS 
   * @param tab 
   */
  openTab(tab: number)
  {
    var t_s = document.getElementById('tab_schedule');
    var t_c = document.getElementById('tab_client');
    var t_a = document.getElementById('tab_ads');
    var t_o = document.getElementById('tab_onair');
    var t_f = document.getElementById('tab_offline');
    var t_v = document.getElementById('tab_visits');
    var t_e = document.getElementById('tab_ended');
    var t_r = document.getElementById('tab_re');
    var t_i = document.getElementById('tab_im');
    switch (tab)
    {
      case 0:        
        t_c.classList.add('tab-active');
        t_a.classList.remove('tab-active');
      break;
      case 1:
        t_c.classList.remove('tab-active');
        t_a.classList.remove('tab-active');
      break;
      case 2: 
        t_c.classList.remove('tab-active');
        t_a.classList.add('tab-active');
      break;
      case 3:
        t_o.classList.add("tab-active");
        t_f.classList.remove("tab-active");
        this.loadProperties(1, 3);
        break;
      case 4:
        t_o.classList.remove("tab-active");
        t_f.classList.add("tab-active");
        this.loadProperties(1, 4);
        break;
      case 5:
        t_v.classList.add("tab-active");
        t_e.classList.remove("tab-active");
        this.loadSchedules("broid", 1);
        break;
      case 6:
        t_v.classList.remove("tab-active");
        t_e.classList.add("tab-active");
        this.loadSchedules("broid", 1);
        break;
      case 7:
        t_r.classList.add("tab-active");
        t_i.classList.remove("tab-active");
        this.loadProperties(1);
        break;
      case 8:
        t_r.classList.remove("tab-active");
        t_i.classList.add("tab-active");
        this.loadProperties(0);
        break;
      case 9:
        t_r.classList.add("tab-active");
        t_i.classList.remove("tab-active");
        this.loadProperties(9);
        break;
      case 10:
        t_r.classList.remove("tab-active");
        t_i.classList.add("tab-active");
        break;
      case 11:
        t_r.classList.add("tab-active");
        t_i.classList.remove("tab-active");
        this.loadSchedules("broid", 1);
        break;
      case 12:
        t_r.classList.remove("tab-active");
        t_i.classList.add("tab-active");
        break;
      case 13:
        t_r.classList.remove("tab-active");
        t_i.classList.add("tab-active");
        break;
    }
    this._tabNum = tab;
  }

  private ownerTab(tab: number) 
  {
    var ot_0 = document.getElementById("ot_0");
    var ot_1 = document.getElementById("ot_1");
    if (tab == 0) 
    {
      ot_0.classList.add("toggle-active");
      ot_1.classList.remove("toggle-active");
      this._tabNum = 3;
      //this.openTab(3);
    }
    if (tab == 1) 
    {
      ot_0.classList.remove("toggle-active");
      ot_1.classList.add("toggle-active");
      this._tabNum = 5;
      //this.openTab(5);
    }
    this._ownerTab = tab;
  }

  generateRandomNumber(numberOfIndexs: number) 
  {
    let randomNumber = Math.floor(Math.random() * numberOfIndexs);
    return randomNumber;
  }







  setArraysForLocalStorage() 
  {
    this.ARR_PROPERTY_IMV = JSON.parse(
      localStorage.getItem("ARR_PROPERTY_IMV")
    );
    this.ARR_PROPERTY_OFF_IMV = JSON.parse(
      localStorage.getItem("ARR_PROPERTY_OFF_IMV")
    );
  }

  search(tab: number) 
  {
    if (this.search_term == "") {
      this.setArraysForLocalStorage();
      return;
    }

    var currentArray =
      tab == 3 ? this.ARR_PROPERTY_IMV : this.ARR_PROPERTY_OFF_IMV;

    const match = new RegExp(escapeRegExp(this.search_term), "i");

    if (currentArray.length > 0) {
      var newArray = currentArray.filter(
        imv => match.test(imv.neighboor) || match.test(imv.city)
      );
    } else {
      this.setArraysForLocalStorage();
      var currentArray =
        tab == 3 ? this.ARR_PROPERTY_IMV : this.ARR_PROPERTY_OFF_IMV;
      var newArray = currentArray.filter(
        imv => match.test(imv.neighboor) || match.test(imv.city)
      );
    }

    tab == 3
      ? (this.ARR_PROPERTY_IMV = newArray)
      : (this.ARR_PROPERTY_OFF_IMV = newArray);
  }

  defineNewImvArrays(imvs, checkTab) {
    let firstItem = checkTab == 4 ? 31 : 32;
    let secondItem = checkTab == 4 ? 30 : 42;
    let thirdItem = checkTab == 4 ? 20 : 2;
    let arrayForProperty = imvs.filter(
      imv =>
        imv.proid == firstItem ||
        imv.proid == secondItem ||
        imv.proid == thirdItem
    );
    if (checkTab == 3) {
      let check = JSON.parse(localStorage.getItem("ARR_PROPERTY_IMV"));
      this.ARR_PROPERTY_IMV = check.length > 0 ? check : arrayForProperty;
      localStorage.setItem(
        "ARR_PROPERTY_IMV",
        JSON.stringify(this.ARR_PROPERTY_IMV)
      );
      this.propertyLength = this.ARR_PROPERTY_IMV.length;
    } else {
      let check = JSON.parse(localStorage.getItem("ARR_PROPERTY_OFF_IMV"));
      this.ARR_PROPERTY_OFF_IMV = check.length > 0 ? check : arrayForProperty;
      localStorage.setItem(
        "ARR_PROPERTY_OFF_IMV",
        JSON.stringify(this.ARR_PROPERTY_OFF_IMV)
      );
    }
  }

  activeImv(id: Number) {
    let removeImv = this.ARR_PROPERTY_OFF_IMV.find(imv => imv.proid == id);
    this.ARR_PROPERTY_OFF_IMV = this.ARR_PROPERTY_OFF_IMV.filter(
      imv => imv.proid != id
    );
    this.ARR_PROPERTY_IMV.push(removeImv);
    localStorage.setItem(
      "ARR_PROPERTY_IMV",
      JSON.stringify(this.ARR_PROPERTY_IMV)
    );
    this.propertyLength = this.ARR_PROPERTY_IMV.length;
    localStorage.setItem(
      "ARR_PROPERTY_OFF_IMV",
      JSON.stringify(this.ARR_PROPERTY_OFF_IMV)
    );
  }








  private async loadProperties(reaid: number, checkTab: number = 0) 
  {
    var runApi: boolean = true;
    if (
        (this.ARR_PROPERTIES_OWNER_ONLINE.length > 0 && checkTab == 3) ||
        (this.ARR_PROPERTIES_OWNER_OFFLINE.length > 0 && checkTab == 4)
       )
    {
      runApi = false;
    }

    if (runApi)
    {
      await this.helper.showLoading("Aguarde");
      await this.property.listProperty(reaid).subscribe(
        async data => {
          if (checkTab == 3)
            this.ARR_PROPERTIES_OWNER_ONLINE = data;
          if (checkTab == 4)
          this.ARR_PROPERTIES_OWNER_OFFLINE = data;
          //5 e 6 ownertab
          
            //this.ARR_ITEMS = data;
          this.propertyLength = (this.ARR_PROPERTIES_OWNER_OFFLINE.length + 
                                 this.ARR_PROPERTIES_OWNER_OFFLINE.length);
          await this.helper.hideLoading();
        },
        async error => {
          await this.helper.hideLoading();
          await this.helper.presentToast("Não foi possível carregar os imóveis");
        }
      );
    }
  }

  private async loadSchedules(type: string, value: number) 
  {
    await this.helper.showLoading("Aguarde");
    await this.schedule.getSchedules(type, value).subscribe(
      async data => {
        this.ARR_ITEMS = data;
        await this.helper.hideLoading();
      },
      async error => {
        await this.helper.hideLoading();
        await this.helper.presentToast("Não foi possível carregar os agendamentos");
      }
    );
  }

  public reTab(tab: number) 
  {
    var rt_0 = document.getElementById("rt_0");
    var rt_1 = document.getElementById("rt_1");
    var rt_2 = document.getElementById("rt_2");
    var rt_3 = document.getElementById("rt_3");
    if (tab == 0) 
    {
      rt_0.classList.add("toggle-active");
      rt_1.classList.remove("toggle-active");
      rt_2.classList.remove("toggle-active");
      rt_3.classList.remove("toggle-active");
      this._tabNum = 9;
      this.openTab(9);
    }
    if (tab == 1) 
    {
      rt_0.classList.remove("toggle-active");
      rt_1.classList.add("toggle-active");
      rt_2.classList.remove("toggle-active");
      rt_3.classList.remove("toggle-active");
      this._tabNum = 11;
      this.openTab(11);
    }
    if (tab == 2) {
      rt_0.classList.remove("toggle-active");
      rt_1.classList.remove("toggle-active");
      rt_2.classList.add("toggle-active");
      rt_3.classList.remove("toggle-active");
      this._tabNum = 7;
      this.loadProperties(1);
    }
    if (tab == 3) {
      rt_0.classList.remove("toggle-active");
      rt_1.classList.remove("toggle-active");
      rt_2.classList.remove("toggle-active");
      rt_3.classList.add("toggle-active");
      this._tabNum = 13;
    }
    this._reTab = tab;
  }

  scrolling(event) {
    //var elmnt = document.getElementsByTagName("ion-header")[0];
    // const sheet = new CSSStyleSheet();
    //sheet.insertRule('#target {color: darkseagreen}');
    // elmnt.innerHTML = sheet;
  }

  private async exitMyApp() 
  {
    var val = localStorage.getItem("logged");
    await localStorage.clear();
    await this.helper.showLoading("Saindo");
    //await this.login.logout().subscribe(
      //async data => {
        //if (val === "facebook") 
        //{
          /* this.facebook.logout().then( res => {
              localStorage.setItem('logged', 'false');
              localStorage.clear();
              this.platform.exitApp();
            }).catch(e => {
              localStorage.setItem('logged', 'false');
              localStorage.clear();
              this.platform.exitApp();
            }); */
        //} else {
          await localStorage.clear();
          await setTimeout(async res => { 
            await this.platform.exitApp();
          }, 1000);
        //}
      //}, async error => {
      //  await localStorage.clear();
      //  await this.platform.exitApp();
      //}
    //);
  }

  async ionViewDidLoad(filter: any = null) 
  {
    this.usr_type = await localStorage.getItem("type");
    this.usr_profile = await localStorage.getItem("profile");
    this.usr_logged = await localStorage.getItem("logged");
    this.usr_user = await localStorage.getItem("reduce-user");
    this.usr_avatar = await localStorage.getItem("usr-avatar");
    this.usr_broker = await localStorage.getItem("usr-broker");
    this.usr_nickname = await localStorage.getItem("usr-nickname");
    this.usr_email = await localStorage.getItem("usr-email");
    this.usr_phone = await localStorage.getItem("usr-phone");
    this.usr_status = await parseInt(localStorage.getItem("usr-status"));

    this._userLogged = this.usr_logged === null 
      ? "none" 
      : this.usr_logged;

    this._userProfile = isNaN(parseInt(this.usr_type)) || this.usr_type === null 
      ? 0
      : parseInt(this.usr_type);

    if (this._userProfile == 2)
    {
      var sts = await localStorage.getItem("statusBroker");
      if (!isNaN(parseInt(sts)) && parseInt(sts) > 0) 
      {
        this._brokerOffline = false;
        this.lblToggle = "ONLINE PARA VISITAS";
      } else {
        this._brokerOffline = true;
        this.lblToggle = "OFFLINE";
      }
    }  

    // Map only loads with User Profile [0-1]
    if (this._userProfile == 0 || this._userProfile == 1) 
    {
      await this.helper.showLoading("Aguarde");
      await this.property.getHighlights(filter).subscribe(
        async data => {
          this.ARR_ITEMS = data;
          await this.helper.hideLoading();
        },
        async error => {
          await this.helper.hideLoading();
          await this.helper.presentToast("Imóvel não localizado ou indisponível.");
        }
      );
      await this.initializeMapbox();

      this._tabNum = 0;

    // Broker Profile [2]  
    } else if (this._userProfile == 2) {
      this._tabNum = 0;
    
    // Owner Profile [3]
    } else if (this._userProfile == 3) {
      this._tabNum = 3;
      this._ownerTab = 0;
      //this.openTab(3);
    
    // Real Estate Profile [4]
    } else if (this._userProfile == 4) {
      this._tabNum = 7;
      this._reTab = 2;
    }
  }

  private loginPage(type: number) 
  {
    this.navCtrl.push(SocialLoginPage, { title: "", type: 1 });
  }

  private schedulePage() 
  {
    this.navCtrl.push(SchedulePage, { title: "", type: 1 });
  }

  private openProperty(proid: number) 
  {
    this.navCtrl.push(DetailsPage, { proid: proid });
  }

  private discoverPage(val=null)
  {
    this.navCtrl.push(DiscoverPage, { title: "", type: 1, near: val });
  }

  private mapsPage() 
  {
    this.navCtrl.push(MapsPage, { title: "", type: 1 });
  }

  private neighboorPage(match: any)
  {
    this.navCtrl.push(NeighboorsPage, { location: match.neighboor + ' - ' + match.city, match: match });
  }

  private signinPage(title: string, type: number) 
  {
    this.navCtrl.push(SocialLoginPage, { title: title, type: type });
  }

  private rateApp() 
  {
    this.helper.presentToast(
      "Direciona para Google Play ou Apple Store para avaliação!"
    );
  }

  private favouritePage()
  {
    this.navCtrl.push(FavoritesPage);
  }

  private closeDeal(id) 
  {
    var deal = document.getElementById("deal-" + id);
    deal.classList.remove("hide-deal");
  }

  private termsPage() 
  {
    this.navCtrl.push(TermsPage, {});
  }

  private showFilter() 
  {
    const openFilter = this.modalCtrl.create(Filter, {input_search: this.input_search});
    openFilter.onDidDismiss( data => {
      if (data)
      {
        this.ionViewDidLoad(data);
      }
    });
    openFilter.present();
  }


  

  private async enableBroker() 
  {
    var label = "está indisponível no momento!";
    var reg;
    var status: string;
    var toggle: string
    if (!this._brokerOffline) 
    {
      status = "0";
      this._brokerOffline = true;
      toggle = "OFFLINE";
      reg = { status: 0 };

    } else if (this._brokerOffline) {

      status = "1";
      this._brokerOffline = false;
      toggle = "ONLINE PARA VISITAS";
      label = "está disponível para visitas!";
      reg = { status: 1 };
    }

    await this.brokers.statusBroker(reg).subscribe(
      data => {
        localStorage.setItem("statusBroker", status);
        this.lblToggle = toggle;
        this.helper.presentToast(
          "Você " + label
        );
      },
      error => {
        this._brokerOffline = !this._brokerOffline;
        this.helper.presentToast("Ocorreu um erro ao alterar seu status!");
    });
  }

  
  
  


  private search_location() 
  {
    if (!this.input_search.trim().length) 
    {
      this.locations_searched = [];
      return;
    }
    const match = new RegExp(escapeRegExp(this.input_search), "i");
    if (this.input_search.trim().length > 3)
    {
      this.property.getNeighboors(this.input_search).subscribe( res => {
        this.locations_searched = res.neighboors;
      });
    }
  }

  choose(item: string) {
    this.input_search = item;
    this.locations_searched = [];
  }

  removeFocus() {
    // this.locations_searched = [];
  }

  onCancel() {
    this.input_search = ""
  }





  private scanImage() 
  {
    let options: ZBarOptions = {
      flash: "off",
      text_title: "QRCode Imobi",
      text_instructions: "Focalize o QRCode na placa do imóvel",
      drawSight: false
    };
    this.zbar
    .scan(options)
    .then(result => {
      var getOnlyQRCodeWithoutURL = result.split(/[\s/]+/);
      this.property.getProperty(getOnlyQRCodeWithoutURL[getOnlyQRCodeWithoutURL.length - 1]).subscribe(
        data => {
          //salvar consulta tb para bigdata
          this.navCtrl.push(DetailsPage, { qrcode: getOnlyQRCodeWithoutURL[getOnlyQRCodeWithoutURL.length - 1], type: 1 });
        },
        error => {
          this.helper.presentToast("Imóvel não localizado ou indisponível.");
        }
      );
    })
    .catch(error => {
        if (error != "cancelled")
          this.helper.presentToast("Falha ao efetuar a leitura do QRCode.");
    });
  }

  /**
   * 
   */
  private async initializeMapbox() 
  {
    //this.initMap();
    /* this.geolocation.getCurrentPosition() 
      .then((resp) => {
        this.coordinate.latitude = resp.coords.latitude;
        this.coordinate.longitude = resp.coords.longitude;
        this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        

        const mapOptions = {
          zoom: 13,
          center: this.startPosition,
          disableDefaultUI: false,
        }
    
        //this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //this.directionsDisplay.setMap(this.map);
        this.getMarkers();
      }).catch((error) => {

        this.helper.presentToast('Erro ao recuperar sua posição');
        
      }); */ 
    /* await this.geolocation.getCurrentPosition().then(response => {
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

          this.helper.presentToast("Nenhum imóvel disponível próximo de você!");
        });
      });
      
    }).catch((error) => {

      console.log('Error getting location', error);
    }); */
  }

  private addProperty(imv: Object, hasImv: boolean = false) 
  {
    if (hasImv) 
    {
      localStorage.setItem("imvToActive", JSON.stringify(imv));
    }
    this.navCtrl.push(PropertyPage, {
      lat: -23.5526198,
      lng: -46.6634091,
      type: 1
    });
  }
}