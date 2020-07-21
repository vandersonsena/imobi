import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { SocialLoginPage } from '../sociallogin/sociallogin';

import { DatabaseProvider } from '../../providers/database'
import { MsgSuccessPage } from '../msg-success/msg-success';

@Component({
  selector: 'page-myaction',
  templateUrl: 'myaction.html'
})

export class MyActionPage {

  constructor(public navCtrl: NavController,
              private helper: HelperProvider,
              private dbProvider:DatabaseProvider )
  {

    this.dbProvider.get()
      .then((result: number) => {
        if(result > 0) {
          this.navCtrl.push(MsgSuccessPage);
        }
      });

  }

  openHome()
  {
    this.navCtrl.setRoot(HomePage);
  }

  signin(title: string, type: number)
  {
    this.navCtrl.push(SocialLoginPage, {title: title, type: type});
  }
}
