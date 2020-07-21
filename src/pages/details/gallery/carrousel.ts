import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'carrousel',
  templateUrl: 'carrousel.html'
})
export class Carrousel {

  images: any = null;  
  currentIndex: any = null; 

  @ViewChild('mySlider') mySlider: any;

  constructor(private navParams: NavParams, public viewCtrl: ViewController) {
    this.images = this.navParams.get('images');
    this.currentIndex = this.navParams.get('currentIndex');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  slideChanged() {
    let currentIndex = this.mySlider.getActiveIndex();
    // console.log('Current index is', currentIndex);
  }

  goToSlide() {
    this.mySlider.slideTo(2, 500);
  }


}