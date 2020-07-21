import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HelperProvider } from '../../providers/helper';
import { LoginProvider } from '../../providers/login';
import { DomSanitizer } from '@angular/platform-browser';
import { HomePage } from '../home/home';
import { SignupProvider } from '../../providers/signup';
import { CategoriesProvider } from '../../providers/categories';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html'
})
export class Signup2Page {

    public form: FormGroup;
    private _eye: string = 'eye';
    private _type: string = 'password';
    private submitAttempt: boolean = false;
    private type: number = 1;
    private profile: string = "Usuário";
    private register: any;
    private currentMask: object = {mask:'00000000000000', len:14};
    private selfie: any;
    private photo: any;
    categories = [];

    private lowPrice: number = 0;
    private highPrice: number = 0;
    private knobValues: any = {
              upper:500000,
              lower:150000
            }
    private finalRange: string = "0|0";


  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              private helper: HelperProvider, 
              private formBuilder: FormBuilder,
              private camera: Camera,
              private sanitizer: DomSanitizer,
              private signup: SignupProvider,
              private categs: CategoriesProvider) {

                this.form = this.formBuilder.group({
                  'civistate': ['', Validators.compose([Validators.required])],
                  'kids': ['', Validators.compose([Validators.required])],
                  'pets': ['', Validators.compose([Validators.required])],
                  'cityb': ['', Validators.compose([Validators.required])],
                  'creci': ['', Validators.compose([Validators.minLength(8), Validators.required])],
                  'cnpj': ['', Validators.compose([this.checkCNPJ("cnpj"), Validators.required])],
                  'exclusive': ['', Validators.compose([Validators.required])],
                  'wishcat': ['', Validators.compose([Validators.required])],
                  'wishmod': ['', Validators.compose([Validators.required])],
                  'rangeprice': '',
                  'type': '',
                  'selfie': '',
                  'photo': ''
              });

              this.lowPrice = this.knobValues.lower;
              this.highPrice = this.knobValues.upper;
              this.finalRange = this.lowPrice + "|" + this.highPrice;
  }

  ionViewWillEnter()
  {
    this.profile = this.navParams.get('profile');
    this.type = this.navParams.get('type');
    this.register = this.navParams.get('register');
    if (this.type != 2)
    {
      this.loadCategs();
    }
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

  private setKnobs(knob){
    this.lowPrice = knob.lower;
    this.highPrice = knob.upper;
    this.finalRange = this.lowPrice + "|" + this.highPrice;
  }

  private checkCNPJ(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      var cpfcnpj = control.root.value[field_name];
      var input = control.value;
      cpfcnpj = input;
      if (cpfcnpj != undefined){
        cpfcnpj = cpfcnpj.replace(/[^\d]+/g,'');
        if (cpfcnpj.length == 11){
          if(this.helper.validCPF(cpfcnpj)){
            this.currentMask = {mask:'000.000.000-00', len:14};
            return null;
          }else{
            return {'checkCPF' : false};
          }
        }
        if (cpfcnpj.length == 14){
          if(this.helper.validCNPJ(cpfcnpj)){
            this.currentMask = {mask:'00.000.000/0000-00', len:18};
            return null;
          }else{
            return {'checkCNPJ' : false};
          }
        }
        if (cpfcnpj.length != 11 && cpfcnpj.length != 14){
            this.currentMask = {mask:'00000000000000', len:14};
            return {'checkCPFCNPJ' : false};
        }
      }else{
        this.currentMask = {mask:'00000000000000', len:14};
        return null;
      }
    }
  }

  addSelfie(){
    const options: CameraOptions = {
      quality: 75,
      correctOrientation: true,
      cameraDirection: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64image = 'data:image/png;base64,' + imageData;
      this.selfie = base64image;
      //save base64 to DB
    }, (err) => {
      //get err from camera
    })
  }

  addPhoto(){
    const options: CameraOptions = {
      quality: 75,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64image = 'data:image/png;base64,' + imageData;
      this.photo = base64image;
      //save base64 to DB
    }, (err) => {
      //get err from camera
    })
  }

  isRequired(){ 
    let frm = this;
    if (this.type != 2){
      frm.form.controls["creci"].setValue("000000-0");
      frm.form.controls["cityb"].setValue("N/A");
      frm.form.controls["exclusive"].setValue("0");
      frm.form.controls["cnpj"].setValue("10562144000195");
    }else{
      frm.form.controls["kids"].setValue("0");
      frm.form.controls["pets"].setValue("0");
      frm.form.controls["civistate"].setValue("0");
      frm.form.controls["wishcat"].setValue("0");
      frm.form.controls["wishmod"].setValue("0");
      frm.form.controls["rangeprice"].setValue("0|0");
    } 
    
  }



  submitSignup()
  {
    this.isRequired();
    this.submitAttempt = true;
    if(this.form.valid)
    {
      this.form.controls["rangeprice"].setValue(this.finalRange);
      this.form.controls["type"].setValue(this.type);
      this.form.controls["selfie"].setValue(this.selfie);
      this.form.controls["photo"].setValue(this.photo);
      let reg = Object.assign(this.register, this.form.value);
      this.helper.showLoading('Salvando Cadastro');
      this.signup.save(reg).subscribe((res) => {
          this.helper.hideLoading();     
          this.helper.presentToast("Seu cadastro foi efetuado com sucesso!");
          setTimeout(() => {
            this.navCtrl.setRoot(HomePage);
          }, 2000);
      }, error => { 
        this.helper.hideLoading();
        this.helper.presentToast("Ocorreu um erro ao salvar seu cadastro! ");
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
        }, 2000);
      }); 
    }
  }
}