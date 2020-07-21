import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import escapeRegExp from "escape-string-regexp";
import * as moment from 'moment';
import { CategoriesProvider } from '../../../providers/categories';
import { HelperProvider } from '../../../providers/helper';

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class Filter {

  public locations_searched: string[] = [];
  private lowPrice: number = 350000;
  private highPrice: number = 700000;
  private knobValues: any = {
                              upper:700000,
                              lower:350000
                            }
  private selectedReasons :any = [];
  private filters: any = {};
  categories = [];

  @ViewChild('mySlider') mySlider: any;

  constructor(private navParams: NavParams, 
              private helper: HelperProvider, 
              public viewCtrl: ViewController, 
              private navCtrl: NavController, 
              private categs: CategoriesProvider) 
  {
    this.loadCategs();
  }


  loadCategs() {
    this.helper.showLoading('Aguarde');
    this.categs.get()
      .subscribe(data => {
        this.categories = data;
        this.helper.hideLoading();
      },
      error => { 
        this.helper.hideLoading();
        this.helper.presentToast("Ocorreu um erro ao obter os imóveis!");
      });
  }
  

  filter() {
    this.filters.modalities = JSON.parse(JSON.stringify(this.selectedReasons));
    this.viewCtrl.dismiss(this.filters);
  }

  cancel()
  {
    this.viewCtrl.dismiss();
  }

  private setKnobs(knob){
    this.lowPrice = knob.lower;
    this.highPrice = knob.upper;
    this.filters.lowPrice = this.lowPrice;
    this.filters.highPrice = this.highPrice;
  }

  private selectReason(data)
  {
    this.selectedReasons.push(data);
  }



}