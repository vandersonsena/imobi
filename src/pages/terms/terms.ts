import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper';

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {



  constructor(public navParams: NavParams, public navCtrl: NavController, private helper: HelperProvider) {

  }

  ionViewWillEnter(){
   
  }

}