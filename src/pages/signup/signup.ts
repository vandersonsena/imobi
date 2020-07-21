import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { HelperProvider } from '../../providers/helper';
import { LoginProvider } from '../../providers/login';
import { Signup2Page } from './signup2';
import { HomePage } from '../home/home';
import { SignupProvider } from '../../providers/signup';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

    public form: FormGroup;
    private submitAttempt: boolean = false;
    private _eye: string = 'eye';
    private _type: string = 'password';
    private profile: string = "Novo Usuário";
    private currentMask: object = {mask:'00000000000000', len:14};
    private type: number;

  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              private helper: HelperProvider, 
              private formBuilder: FormBuilder,
              private signup: SignupProvider) {

    this.form = this.formBuilder.group({
        'name': ['', Validators.compose([Validators.maxLength(40), Validators.required])],
        'email': ['', Validators.compose([Validators.maxLength(40), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
        'pwd': ['', Validators.compose([Validators.maxLength(8), Validators.minLength(6), Validators.pattern('[a-zA-Z0-9_ ]*'), Validators.required])],
        'cpwd': ['', Validators.compose([Validators.maxLength(8), Validators.minLength(6), Validators.pattern('[a-zA-Z0-9_ ]*'), Validators.required, this.equalto('pwd')])],
        'tel': ['', Validators.compose([Validators.required])],
        'niver': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
        'cpfcnpj': ['', Validators.compose([this.checkCPFCNPJ("cpfcnpj"), Validators.required])]
    });
  }

  ionViewWillEnter()
  {
    this.profile = this.navParams.get('profile');
    this.type = this.navParams.get('type');
  }

  private equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] == input;
        if (!isValid)
          return {'equalTo': {isValid}};
        else
          return null;
    };
  }

  private checkCPFCNPJ(field_name): ValidatorFn {
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

  isRequired(){ 
    let frm = this;
    if (this.type == 1 || this.type == 3){
      frm.form.controls["cpfcnpj"].setValue("00000000191");
    }
  }

  private submitSignup()
  {
    this.isRequired();
    this.submitAttempt = true;
    if(this.form.valid)
    {
      if (this.type == 3)
      {
        this.helper.showLoading('Salvando Cadastro');
        this.signup.save(this.form.value).subscribe((res) => {
            this.helper.hideLoading();     
            this.helper.presentToast("Imobiliária cadastrada com sucesso! Aguarde contato da Imobi.");
        }, error => { 
          this.helper.hideLoading();
          this.helper.presentToast("Ocorreu um erro ao salvar seu cadastro! " + JSON.stringify(error));
        }); 
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
        }, 2000);

      }else{
        this.navCtrl.push(Signup2Page, {type: this.type, profile: this.profile, register: this.form.value});
      }
    } 
  }
}