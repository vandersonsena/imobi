import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()

export class Global {

  public KM_MINIMUM_LIMIT_VISIT:number = 5;
  public KM_MINIMUM_BROKER_NEAR:number = 7;
  public SECONDS_LISTEN_POSITION: number = 15000;
  
  public status: boolean = false;
  public networkDown: boolean = false;
  public isUserLogged: boolean = false;
  public showFooterOnSomePages: boolean = true;
  public isHomePage: boolean = false;

  public baseUrl =  "https://api.imobiplaces.com.br/api/v1";
  public appIdOneSignal = "21233d99-be0b-415e-8d6a-7eaf6f73e407";
  public googleOneSignalID = "709548536063";

  public pagseg_email = "";
  public pagseg_token = "";

  public mapboxToken = 'pk.eyJ1IjoiaW1vYmltYXBib3giLCJhIjoiY2s2ODkxb3ZiMDJrODNwbno2amo5NnFuNiJ9.get87rTaxsKLY8CehU9b5w';
  
  public latitude: number = 0;
  public longitude: number = 0;
  public newlatlng: boolean = false;

  public itemOnCart: boolean = false;
  public total_cart: number = 0.00;
  public item_cart: string = "Seu carrinho está vazio!";
  
  public arrCart = [];
  public cart_items = [];

  constructor() { 
    //this.storage.clear();
    //this.get(); 
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  setStatusScript(status: boolean) {
    this.status = status;
  }

  getStatusScript() {
    return this.status;
  }
}