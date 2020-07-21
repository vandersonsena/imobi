import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { MapsPage } from '../maps/maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Global } from '../../providers/global';
import { PropertyProvider } from '../../providers/property';
import { HomePage } from '../home/home';
import { Carrousel } from './gallery/carrousel';
import * as moment from 'moment';
import { LoginPage } from '../login/login';
import { ScheduleProvider } from '../../providers/schedule';
import { Deeplinks } from '@ionic-native/deeplinks';
moment.locale('pt-br'); 
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

    @ViewChild('mySlider') mySlider: any;

    ARR_ITEMS = [];
    format_description: string;
    _proID: string;
    _broID: string;
    _reaID: string;
    _showSchedule: boolean = false;
    _checkingPosition: boolean = true;
    _disableVisit: boolean = true;
    _findByPropertyId: any = null;  
    _findByQRCode: any = null; 
    _brokerInProgress: boolean = false;
    _showMapWhenPropertyIsIdle: boolean = false; 
    favoriteColor: string = "amarelo";
    isFav:boolean = false;
    fav:any;
    retFavourites: string = null;
    parseFavourites: string = null;
    _colorChanges: boolean = true;
    _lnLat: any;
    _lnLng: any;

    public precheck = moment();
    private verifyHour = this.precheck.format('HH');
    private add_day = (parseInt(this.verifyHour) > 17 ? 1 : 0);
    public check = moment().add(this.add_day, 'days');

    public myDateSelected;
    public month = this.check.format('MM');
    public monthName = this.check.format('MMMM');
    public day   = this.check.format('DD');
    public year  = this.check.format('YYYY');
    public hour = this.check.format('HH:mm');
    public currentWeekDay = moment.weekdays(true)[this.check.isoWeekday()]
    

  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              private geoloc: Geolocation,
              private launchNavigator: LaunchNavigator,
              private property: PropertyProvider,
              private sp: ScheduleProvider,
              private global: Global,
              private helper: HelperProvider,
              public modalCtrl: ModalController) {

       

    }

  showLoc(){  
    var s = document.getElementById('lblsell');
    var p = document.getElementById('lblprice');
    var s_l = document.getElementById('lblloc');
    var p_l = document.getElementById('lblpriceloc');
    s_l.classList.remove('hideloc');
    p_l.classList.remove('hideloc');
    s.classList.add('hideloc');
    p.classList.add('hideloc');
  }

  showSell(){
    var s = document.getElementById('lblsell');
    var p = document.getElementById('lblprice');
    var s_l = document.getElementById('lblloc');
    var p_l = document.getElementById('lblpriceloc');
    s.classList.remove('hideloc');
    p.classList.remove('hideloc');
    s_l.classList.add('hideloc');
    p_l.classList.add('hideloc');
  }

  changePrices()
  {
    var changes: boolean = false;
    window.setInterval(function() {
     if (!changes)
     {
       changes = true;
       var s = document.getElementById('lblsell');
       var p = document.getElementById('lblprice');
       var s_l = document.getElementById('lblloc');
       var p_l = document.getElementById('lblpriceloc');
       s_l.classList.remove('hideloc');
       p_l.classList.remove('hideloc');
       s.classList.add('hideloc');
       p.classList.add('hideloc');
     }else{
        changes = false;
        var s = document.getElementById('lblsell');
        var p = document.getElementById('lblprice');
        var s_l = document.getElementById('lblloc');
        var p_l = document.getElementById('lblpriceloc');
        s.classList.remove('hideloc');
        p.classList.remove('hideloc');
        s_l.classList.add('hideloc');
        p_l.classList.add('hideloc');
     }
    }, 7000);
  }

  updateScheduleDateTime($event) 
  {
   var populateDT = JSON.parse(JSON.stringify($event));
   console.log(populateDT.day); 
   this.month = (populateDT.month < 10  ? "0" + populateDT.month : populateDT.month);
   this.day = (populateDT.day < 10  ? "0" + populateDT.day : populateDT.day);
   this.year = populateDT.year;
   this.hour = (populateDT.hour < 10  ? "0" + populateDT.hour : populateDT.hour) + ":" + 
               (populateDT.minute < 10  ? "0" + populateDT.minute : populateDT.minute);
  }

  ionViewWillEnter()
  {
    this._findByQRCode = this.navParams.get('qrcode');
    this._findByPropertyId = this.navParams.get('proid');

    this.helper.showLoading("Aguarde");

    var getOnlyQRCodeWithoutURL;
    var finalQRCode;
    if (this._findByQRCode != undefined)
    {
      getOnlyQRCodeWithoutURL = this._findByQRCode.split(/[\s/]+/);
      finalQRCode = getOnlyQRCodeWithoutURL[getOnlyQRCodeWithoutURL.length - 1];
    }else{
      finalQRCode = 0;
    }

    var _id = (isNaN(this._findByPropertyId) ? finalQRCode : this._findByPropertyId);

    this.property.getProperty(_id)
    .subscribe(
      data => {
        this.ARR_ITEMS = data;
        this.format_description = this.helper.nl2br(this.ARR_ITEMS[0].description);
        this._lnLat = this.ARR_ITEMS[0].latitude;
        this._lnLng = this.ARR_ITEMS[0].longitude;
        this._proID = this.ARR_ITEMS[0].proid;
        this._broID = this.ARR_ITEMS[0].broid;
        this._reaID = this.ARR_ITEMS[0].reaid;
        var brokerInProgress = localStorage.getItem("brokerInProgress");
        var propertyBusy = localStorage.getItem("propertyBusy");

        if (!isNaN(parseInt(brokerInProgress)) && parseInt(brokerInProgress) > 0)
        {
          this._brokerInProgress = true;
          if (!isNaN(parseInt(propertyBusy)) && (propertyBusy) == this._proID)
          {
            this._showMapWhenPropertyIsIdle = true;
          }else{
            this._showMapWhenPropertyIsIdle = false;
          }
        }else{
          this._brokerInProgress = false;
        }

          if (this._showMapWhenPropertyIsIdle)
          {
            this._disableVisit = false;
            this._checkingPosition = false;

          }else{

            if (this._brokerInProgress)
            {
              this._disableVisit = true;
              this._checkingPosition = false;

            }else{

              this.geoloc.getCurrentPosition()
              .then((response) => {

                var myPosition = response.coords;
                var km_visit = this.global.KM_MINIMUM_LIMIT_VISIT;
                var km_dist = this.helper.distance(myPosition.latitude, myPosition.longitude, this.ARR_ITEMS[0].latitude, this.ARR_ITEMS[0].longitude, "K");
                if (km_dist <= km_visit)
                {
                  var finaldist = (Math.floor(km_dist) == 0 ? "próximo" : Math.floor(km_dist) + "km");
                  this.helper.presentToast("Você está " + finaldist + " do imóvel."); 
                  this._disableVisit = false;
                  this._checkingPosition = false;
                }else{
                  this._disableVisit = true;
                  this._checkingPosition = false;
                  this.helper.presentToast("Você está muito longe do imóvel. Experimente agendar uma visita!"); 
                }

              }).catch((error) => {
                this.helper.presentToast("Sem sinal GPS para verificar sua localização.");
                this._checkingPosition = false;
                this._disableVisit = true;
              }); 
            }
          }
        
        this.helper.hideLoading();
        this.changePrices();


        this.fav = _id;
        this.parseFavourites = localStorage.getItem('favourites');
        if (this.parseFavourites != null){
            this.retFavourites = this.parseFavourites;
            var getFavourites = localStorage.getItem('favourites').split(",");
            for(var a = 0; a < getFavourites.length; a++){
              if (getFavourites[a] != null){
                if (getFavourites[a] == _id){
                  this.isFav = true;
                  this.favoriteColor = "branco";
                  break;
                }
              }
            }
        }

      }, error => {
        this.helper.hideLoading();
        this.helper.presentToast('Imóvel não localizado ou indisponível.');
      }
    );   
  }
 
  goToProperty(){
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
    this.launchNavigator.navigate([this._lnLat, this._lnLng], options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  } 

  setPropertyStatus(status: number)
  {
    var lblStatus = (status == 1 ? 'aprovado' : 'reprovado');
    var sendStatus = false;
    var msgStatus = "";
    this.helper.presentConfirm("Atenção", "Confirma marcar este imóvel como" + lblStatus + "?", res => {
      if (status == 0)
      {
        this.helper.presentPrompt("Imóvel Reprovado", 
                                  "Informe uma mensagem ao sobre a reprovação do imóvel:", 
                                  {name: 'msg', type: 'text'}, msg => {
            sendStatus = true;
            msgStatus = msg;
        });

      }else{
        sendStatus = true;
      }
      if (sendStatus)
      {
        var _id = (isNaN(this._findByPropertyId) ? this._findByQRCode : this._findByPropertyId);
        this.helper.showLoading('Aguarde');
        this.property.status({status: status, msg: msgStatus, proid: _id}).subscribe(
          data => {
            this.helper.presentToast("Status alterado com sucesso.");
            this.helper.hideLoading();
          }, error => {
            this.helper.hideLoading();
            this.helper.presentToast('Impossível alterar status do imóvel.');
          });
      }
    });
  }


  slideNext(){
    this.mySlider.slideNext();
  }

  slidePrev(){
    this.mySlider.slidePrev();
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  openModal(images)
  {
    const openCarrousel = this.modalCtrl.create(Carrousel, {images: images, currentIndex: this.mySlider.getPreviousIndex()}, {showBackdrop: true, enableBackdropDismiss: true});
    openCarrousel.present();
  }

  schedule(){
    this._showSchedule = true;
  }
  
  cancel(){
    this._showSchedule = false;
  }

  favorite(){
    
    //this._colorChanges = !this._colorChanges;
    //this.helper.presentToast("Imóvel " + label + " como favorito.");
    if (this.isFav == false){
      this.isFav = true;
      this.retFavourites += ',' + this.fav;
      this.favoriteColor = "branco";
      setTimeout(() => {
        this.helper.presentToast("Imóvel marcado como favorito.");
      }, 500);
    }else{
      this.isFav = false;
      this.favoriteColor = "amarelo";
      if (this.parseFavourites != null){
        var getFavourites = localStorage.getItem('favourites');
        this.retFavourites = getFavourites.replace(',' + this.fav, '');
      }
      setTimeout(() => {
        this.helper.presentToast("Imóvel desmarcado como favorito.");
      }, 500);
    }
    localStorage.removeItem('favourites');
    localStorage.setItem('favourites', this.retFavourites+'');
  }

  saveSchedule()
  {
    if (localStorage.getItem('logged') !== null)
    {
      this.helper.showLoading("Verificando disponibilidade");
      var data = {
        broid: this._broID,
        usrid: localStorage.getItem('usrid'),
        reaid: this._reaID,
        proid: this._proID,
        eventdate: this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":00"
      }
      this.sp.saveSchedule(data).subscribe(res => {
          setTimeout(() => {
            this.helper.presentToast("Agendamento efetuado com sucesso.");
            this.helper.hideLoading();
            this.navCtrl.setRoot(HomePage);
          }, 3000);
        },
        err => {
          this.helper.hideLoading();
          this.helper.presentToast("Imóvel indisponível para agendamento. Tente outra data!");
        }
      );
      
    }else{
      this.navCtrl.push(LoginPage, {type: 1, redirect: "DetailsPage", proid: this._proID});
    }
  }

  map() 
  {
    this.navCtrl.push(MapsPage, {lat: this.ARR_ITEMS[0].latitude, 
                                 lng:this.ARR_ITEMS[0].longitude, 
                                 type: 1, 
                                 pro_id: this.ARR_ITEMS[0].proid, 
                                 rea_id: this.ARR_ITEMS[0].reaid});
  }
 

}