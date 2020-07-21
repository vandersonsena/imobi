import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HelperProvider } from '../../providers/helper';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { FormListPage } from '../form-list/form-list';

import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-sociallogin',
  templateUrl: 'sociallogin.html'
})
export class SocialLoginPage {

    @ViewChild(Slides) slides: Slides;

    public form: FormGroup;
    private titleLogin: string;
    private userType: number = 1;
    private profiles: any = [];

  constructor(public navParams: NavParams, public navCtrl: NavController, private helper: HelperProvider, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
        'user': ['', Validators.compose([Validators.required])],
        'pwd': ['', Validators.compose([Validators.required])]
    });
  }

  ionViewWillEnter(){
    this.titleLogin = this.navParams.get('title');
    this.userType = this.navParams.get('type');
    this.profiles[1] = 'Usuário';
    this.profiles[3] = 'Proprietário';
    this.profiles[2] = 'Corretor';
    this.profiles[4] = 'Imobiliária';
  }

  signin(){
    this.navCtrl.push(LoginPage, {type: this.userType, profile: this.profiles[this.userType]});
  }

  signup() {
    this.navCtrl.push(SignupPage, {type: this.userType, profile: this.profiles[this.userType]});
  }

  toForm() {
    document.getElementById('content-slides').style.display = "none";

    document.getElementById('content-loading').style.display = "block";

    setTimeout(() => {
      this.navCtrl.push(FormListPage, {type: this.userType});
    }, 2500);
  }

  goToSlide(to: any) {
    this.slides.slideTo(to, 500);
  }
}
