import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HelperProvider } from '../providers/helper';
import { SplashPage } from '../pages/splash/splash';
import { MyActionPage } from '../pages/myaction/myaction';
import { MapsPage } from '../pages/maps/maps';
import { PositionsProvider } from '../providers/positions';
import { Geolocation } from '@ionic-native/geolocation';
import { Global } from '../providers/global';
import { BrokersProvider } from '../providers/brokers';
import { Deeplinks } from '@ionic-native/deeplinks';
import { DetailsPage } from '../pages/details/details';
import { HomePage } from '../pages/home/home';

import { DatabaseProvider } from '../providers/database'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navChild: Nav;

  rootPage:any;

  public _svTitle: string = "";
  public _svType: string = null;
  public _svIcon: string = "pin";
  public _svDate: string = "";
  public _svCode: any;
  public _svView: string = "broker";
  public _svAddress: string = "";
  public _svKm: string = "";
  public _svButton: string = "ACEITAR";
  public _payload: any = null;

  private _notificationOpened: boolean = false;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              public app: App,
              private splashScreen: SplashScreen,
              private network: Network,
              private deeplinks: Deeplinks,
              private modalCtrl: ModalController,
              //private viewCtrl: ViewController,
              private global: Global,
              private helper: HelperProvider,
              private backgroundMode: BackgroundMode,
              private position: PositionsProvider,
              private broker: BrokersProvider,
              private geolocation: Geolocation,
              private oneSignal: OneSignal,
              private dbProvider: DatabaseProvider
            )

  {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      //Criando o banco de dados
      dbProvider.createDatabase()
      .then(() => {
        // fechando a SplashScreen somente quando o banco for criado
      })
      .catch(() => {
        // ou se houver erro na criação do banco
      });
    });

    this.appStart();
  }


private async appStart()
{
  await this.platform.ready();

  this.initDeepLinks();
  this.initOneSignal();
  this.updateConnectionStatus();
  this.network.onchange().subscribe(() => this.updateConnectionStatus());

  let splash = this.modalCtrl.create(SplashPage);
      splash.present();

  var isLogged = localStorage.getItem("logged");
  if (isLogged != 'email' /* gmail, facebook*/)
  {
    setTimeout(() => { this.rootPage = MyActionPage; }, 3000);

  } else {

    this.getBrokerPositions();
    //alert(this.viewCtrl.name);
    setTimeout(() => { this.rootPage = HomePage; }, 3000);
  }

  if (this.platform.is('cordova'))
  {
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleBlackOpaque();
    this.statusBar.backgroundColorByHexString('#3599d5');
    this.splashScreen.hide();
  }
}

private initDeepLinks()
{
  this.deeplinks.routeWithNavController(this.navChild, {
    '/portal/property/:qrcode': DetailsPage,
  }).subscribe((match) => {
    // match.$route - the route we matched, which is the matched entry from the arguments to route()
    // match.$args - the args passed in the link
    // match.$link - the full link data
    //alert('Native route' + JSON.stringify(match));
  }, (nomatch) => {
    //alert('Got a deeplink that didn\'t match' + JSON.stringify(nomatch));
  });
}

private getBrokerPositions()
{
  var timer = window.setInterval(async res => {
    var broid = localStorage.getItem('broid');
    if (!isNaN(parseInt(broid)) && parseInt(broid) > 0)
    {
      var sts = localStorage.getItem('statusBroker');
      if (!isNaN(parseInt(sts)) && parseInt(sts) > 0)
      {
        this.backgroundMode.enable();
        this.sendPosition(parseInt(broid));
      }
    }
  }, this.global.SECONDS_LISTEN_POSITION);
}


  private async initOneSignal()
  {
    await this.oneSignal.startInit('04588e1a-1b4a-46f8-bffa-f6643714d920', '58936741602');
    await this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    await this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
    await this.oneSignal.handleNotificationReceived().subscribe(res => this.onPushReceived(res.payload));
    await this.oneSignal.endInit();
  }


  /**
   * Private method for OneSignal Open Push Notifications
   * type 1 = visit, 2 = schedule
   * @param payload
   */
  private async onPushReceived(payload: OSNotificationPayload)
  {
    //if (this._notificationOpened == false)
    //{
      var res = payload.additionalData;
      var title = payload.title + ", " + payload.body;
      var address = res.address;
      var date = res.date;

      if(res.view == 'broker')
      {
        if (res.type == 'visit')
        {
            this._svTitle = title;
            this._svType = res.type;
            this._svView = res.view;
            this._svIcon = 'pin';
            this._svDate = date;
            this._svCode = 'selecionado';
            this._svAddress = address;
            this._svKm = "22";
            this._svButton = 'ACEITAR';
            this._payload = res;

            await this.showPopupScheduleVisit();


        }else{

        }



      }else{

        if (res.type == 'visit')
        {
          if (res.status == 1)
          {
            this._svTitle = title;
            this._svType = res.type;
            this._svView = res.view;
            this._svIcon = 'pin';
            this._svDate = date;
            this._svCode = 'selecionado';
            this._svAddress = address;
            this._svKm = "22";
            this._svButton = 'VISUALIZAR';
            this._payload = res;
            localStorage.setItem("brokerInProgress", res.broid);
            localStorage.setItem("propertyBusy", res.proid);
            await this.showPopupScheduleVisit();

          }else{

            this.helper.presentToast(title);
          }

        }else{

        }
      }
    //}
  }

  /**
   * Private method for OneSignal Open Push Notifications
   * works only if User open push by buttons on Notification
   * @param payload
   */
  private onPushOpened(payload: OSNotificationPayload)
  {
    var res = payload.additionalData;

    this._notificationOpened = true;

    if(res.view == 'broker')
    {
      if(res.type == 'visit')
      {
        var _custom = JSON.parse(payload.rawPayload);
        var status = (_custom.actionSelected == "bt_1" ? 1 : 0);

        var data = { broid: res.broid,
                     proid: res.proid,
                     reaid: res.reaid,
                     usrid: res.usrid,
                     status: status };
        this.broker.saveBrokerIncoming(data).subscribe(result => {

          if (status == 1)
          {
            this.helper.presentAlert("Atenção", "Dirija-se ao imóvel solicitado pelo usuário " + res.address);
            this._notificationOpened = false;
          }

        }, error => {

          this.helper.presentToast("O usuário cancelou a solicitação de visita.");
          this._notificationOpened = false;

        });

      }else{

        //schedule control
        this._notificationOpened = false;

      }

    }else{

      var _custom = JSON.parse(payload.rawPayload);
      var status = (_custom.actionSelected == "bt_1" ? 1 : 0);

      if(res.type == 'visit')
      {
        if (status == 1)
        {
          this._notificationOpened = false;
          localStorage.setItem("brokerInProgress", res.broid);
          localStorage.setItem("propertyBusy", res.proid);

          let nav = this.app.getRootNav();
          nav.push(MapsPage, {lat: res.latitude,
                              lng: res.longitude,
                              type: 1,
                              pro_id: res.proid,
                              rea_id: res.reaid});
        }

      }else{

        //schedule control
        if (status == 1)
        {

          this._notificationOpened = false;

        }

      }
    }
  }

  private updateConnectionStatus()
  {
    this.helper.isConnected =
      this.network.type &&
      (this.network.type === '3g' || this.network.type === '4g' || this.network.type === 'wifi');
  }


  private sendPosition(broid: number)
  {
    this.geolocation.getCurrentPosition()
      .then((response) => {
        var myPosition = response.coords;
        var data = {broid: broid, latitude: myPosition.latitude, longitude: myPosition.longitude};
        this.position.brokerPosition(data).subscribe(data => {

        }, error => {
          this.helper.presentToast("Sem sinal GPS para enviar sua localização.");
        });
      }).catch((error) => {
        this.helper.presentToast("Sem sinal GPS para buscar sua localização.");
      });
  }


  showPopupScheduleVisit()
  {
    var s_v = document.getElementById('schedules_visits');
    s_v.classList.remove('hide-bg');
  }



  closePopupScheduleVisit(type: string, view: string)
  {
   this.skipSV(type, view);
  }



  skipSV(type: string, view: string)
  {
    if (type == 'visit')
    {
      if (view == 'broker')
      {
        var data = { broid: this._payload.broid,
          proid: this._payload.proid,
          reaid: this._payload.reaid,
          usrid: this._payload.usrid,
          status: 0 }; //status dinamico
          this.broker.saveBrokerIncoming(data).subscribe(res => {

            var s_v = document.getElementById('schedules_visits');
            s_v.classList.add('hide-bg');
            //redirect to map
            //start chrono
            //open right tab
           /*  let nav = this.app.getRootNav();
            nav.push(MapsPage, {lat: this._payload.latitude,
                                lng: this._payload.longitude,
                                type: 1,
                                pro_id: this._payload.proid,
                                rea_id: this._payload.reaid}); */

        }, error => {

            var s_v = document.getElementById('schedules_visits');
            s_v.classList.add('hide-bg');
            this.helper.presentToast("Falha ao responder sua localização.");
        });


      }else{

          //alert('cancela a visita apos o corretor avisar');
          var s_v = document.getElementById('schedules_visits');
          s_v.classList.add('hide-bg');
      }


    }else{

    }
  }

  agreeSV(type: string, view: string)
  {
    if (type == 'visit')
    {
      if (view == 'broker')
      {
        var data = { broid: this._payload.broid,
          proid: this._payload.proid,
          reaid: this._payload.reaid,
          usrid: this._payload.usrid,
          status: 1 };

          this.broker.saveBrokerIncoming(data).subscribe(res => {

            var s_v = document.getElementById('schedules_visits');
            s_v.classList.add('hide-bg');

          }, error => {

            this.helper.presentToast("Falha ao responder sua localização.");
            var s_v = document.getElementById('schedules_visits');
            s_v.classList.add('hide-bg');

          });

      }else{

        var s_v = document.getElementById('schedules_visits');
            s_v.classList.add('hide-bg');
        localStorage.setItem("brokerInProgress", this._payload.broid);
        localStorage.setItem("propertyBusy", this._payload.proid);
        let nav = this.app.getRootNav();
        nav.push(MapsPage, {lat: this._payload.latitude,
                            lng: this._payload.longitude,
                            type: 1,
                            pro_id: this._payload.proid,
                            rea_id: this._payload.reaid});
      }

    }else{

       //schedule control
      if (view == 'broker')
      {

      }else{

      }



    }
  }
}
