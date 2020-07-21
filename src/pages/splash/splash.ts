import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public splashScreen: SplashScreen) {

  }

  ionViewDidEnter() {

    this.splashScreen.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 4000);

  }


}