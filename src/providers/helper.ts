import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()

export class HelperProvider {

    private loading: any;
    public isConnected: boolean = true;

    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

    public presentToast(msgToast) 
    {
      let toast = this.toastCtrl.create({
        message: msgToast,
        duration: 6000,
        position: 'bottom'
      });
      toast.present();
    }

    public removeFromArray(arr, item) 
    {
      var what, a = item, L = a.length, ax;
      while (L > 1 && arr.length) {
          what = a[--L];
          while ((ax= arr.indexOf(what)) !== -1) {
              arr.splice(ax, 1);
          }
      }
      return true;
  }

    public presentAlert(title: string, msg: string) 
    {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: ['OK']
      });
      alert.present();
    }

    public presentConfirm(title: string, msg: string, callback) 
    {
      let alert = this.alertCtrl.create({
        title: title,
        message: msg,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              // console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: data => {
              if (callback) 
                callback(data);
            }
          }
        ]
      });
      alert.present();
    }

    public presentPrompt(title: string, msg: string, inputs: any, callback)
    {
      let alert = this.alertCtrl.create({
        title: title,
        message: msg,
        inputs: [inputs],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              // console.log('Cancel clicked');
            }
          },
          {
            text: 'Enviar',
            handler: data => {
              if (callback)
                callback(data)
            }
          }
        ]
      });
      alert.present();
    }

    public showLoading(msgLoading) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: msgLoading + '...'});
        this.loading.present();
    }

    public hideLoading(){
        this.loading.dismiss();
    }

    public distance(lat1, lon1, lat2, lon2, unit) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
      }
    }

    public nl2br(text: string) {
    //return text.replace('\\r\\n', '\n');
     return text.replace('\n', '<br/>');
  }

    public validCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
      for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
      Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    public validCNPJ(cnpj) {
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0,tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11; 
        if (resultado != digitos.charAt(1)){
          return false;
        }else{     
          return true;
        }
      }
  
  }
  