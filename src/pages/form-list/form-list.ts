import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { WaitinglistProvider } from '../../providers/waitinglist';

import { MsgSuccessPage } from '../msg-success/msg-success';

import { DatabaseProvider } from '../../providers/database'

@Component({
  selector: 'page-form-list',
  templateUrl: 'form-list.html',
})
export class FormListPage {

  private userType: number;
  private linkOrigin: string;

  private id_form: any;

  private nameform1: any = 'buscando-5f3e8f21baf8d194a0b2';
  private nameform2: any = 'corretor-dac5a5ef681b1a10371f';
  private nameform3: any = 'proprietario-b1a74b5997f4d549b20d';
  private nameform4: any = 'imobiliaria-cc61235a65a0a7f4ad04';

  perfil: any = 'custom_fields[1068525]';
  fantasia: any = 'custom_fields[1054958]';
  creci: any = 'custom_fields[726566]';
  cep: any = 'custom_fields[1046813]';
  endereco: any = 'custom_fields[1046814]';
  nome: any = 'name';
  email: any = 'email';

  perfil_corretor: any = 'custom_fields[1068510]';
  tipo_venda: any = 'custom_fields[1068512]';
  cpf: any = 'custom_fields[1046819]';
  cnpj: any = 'custom_fields[1046817]';
  contato: any = 'custom_fields[1046818]';
  tel: any = 'personal_phone';

  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;

  loading: Loading;

  showForm: boolean = true;
  msgForm: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private provider: WaitinglistProvider,
    private toast: ToastController,
    private dbProvider:DatabaseProvider
  ) {

    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    this.form = this.formBuilder.group({
      cpf: [''],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      name: [''],
      tel: [''],
      cep: ['']
    });

    this.form2 = this.formBuilder.group({
      creci: [''],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      name: [''],
      tel: [''],
      perfil: [''],
      tipo_venda: [''],
      cep: ['']
    });

    this.form3 = this.formBuilder.group({
      cpf: [''],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      name: [''],
      tel: [''],
      cep: ['']
    });

    this.form4 = this.formBuilder.group({
      cnpj: [''],
      fantasia: [''],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      contato: [''],
      tel: [''],
      cep: ['']
    });

  }

  ionViewWillEnter(){
    this.userType = this.navParams.get('type');

    var perfil = '';

    if(this.userType == 1) {
      this.linkOrigin = 'Buscando um imóvel';
      this.id_form = this.nameform1;
    }
    else if(this.userType == 2){
      this.linkOrigin = 'Corretor';
      this.id_form = this.nameform2;
    }
    else if(this.userType == 3){
      this.linkOrigin = 'Proprietário';
      this.id_form = this.nameform3;
    }
    else {
      this.linkOrigin = 'Imobiliária';
      this.id_form = this.nameform4;
    }

    var seuNode = document.getElementById('formulario-app-'+this.id_form);

    document.getElementById('content-form').appendChild(seuNode);

    seuNode.style.display = "block";

    var inputElement = <HTMLInputElement>document.querySelector('[name="custom_fields[1052016]"]');
    inputElement.value = this.linkOrigin;
    inputElement.parentElement.style.display = "none";

    document.querySelector('form').addEventListener("submit", function(event){
      document.getElementById('content-page-form').style.display = "none";
      document.getElementById('success').style.display = "block";
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormListPage');
  }

  ionViewWillLeave() {
    var seuNode = document.getElementById('formulario-app-'+this.id_form);
    var type_form = '';

    if(this.userType == 1) {
      type_form = 'form1';
    }
    else if(this.userType == 2){
      type_form = 'form2';
    }
    else if(this.userType == 3){
      type_form = 'form3';
    }
    else {
      type_form = 'form4';
    }

    document.getElementById('content-'+type_form).appendChild(seuNode);

    seuNode.style.display = "none";
  }

  goToPosition() {
    this.navCtrl.push(MsgSuccessPage);
  }

  verifyPerfil() {
    this.perfil = this.form2.value.perfil;

    this.onKey2(this.perfil_corretor, 'perfil');
  }

  onChange(e, v) {
    this.onKey2(e, v);
  }

  onKey(e, v) {
    var inputElement = <HTMLInputElement>document.querySelector('[name="'+e+'"]');
    inputElement.value = this.form.value[v];
  }

  onKey2(e, v) {
    var inputElement = <HTMLInputElement>document.querySelector('[name="'+e+'"]');
    inputElement.value = this.form2.value[v];
  }

  onKey3(e, v) {
    var inputElement = <HTMLInputElement>document.querySelector('[name="'+e+'"]');
    inputElement.value = this.form3.value[v];
  }

  onKey4(e, v) {
    var inputElement = <HTMLInputElement>document.querySelector('[name="'+e+'"]');
    inputElement.value = this.form4.value[v];
  }

  sendForm(formSend: any) {

    this.dbProvider.insert(formSend.value.tel).then(() => {
      console.log('sucesso')
    })
    .catch((e) => console.error(e));

    var element = <HTMLButtonElement>document.querySelector('#formulario-app-'+this.id_form+' button');
    element.click();

    this.showForm = false;
    this.msgForm = true;
  }

}
