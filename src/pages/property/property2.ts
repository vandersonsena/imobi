import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { HelperProvider } from "../../providers/helper";
import { LoginProvider } from "../../providers/login";
import { Property3Page } from "./property3";

@Component({
  selector: "page-property2",
  templateUrl: "property2.html"
})
export class Property2Page {
  public form: FormGroup;
  private submitAttempt: boolean = false;
  private _eye: string = "eye";
  private _type: string = "password";
  private profile: string = "Novo Imóvel";
  private currentMask: object = { mask: "00000000000000", len: 14 };
  private type: number;
  private register: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private helper: HelperProvider,
    private formBuilder: FormBuilder,
    private login: LoginProvider
  ) {
    let imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
    this.form = this.formBuilder.group({
      description: [
        imvToAdd != null ? imvToAdd.description.substring(0, 30) : "",
        Validators.compose([Validators.maxLength(300), Validators.required])
      ],
      area: [
        imvToAdd != null ? imvToAdd.area : "",
        Validators.compose([Validators.required])
      ],
      rooms: [
        imvToAdd != null ? imvToAdd.rooms : "",
        Validators.compose([Validators.required])
      ],
      suits: [
        imvToAdd != null ? imvToAdd.suits : "",
        Validators.compose([Validators.required])
      ],
      bathrooms: [
        imvToAdd != null ? imvToAdd.bathrooms : "",
        Validators.compose([Validators.required])
      ],
      furniture: [
        imvToAdd != null ? imvToAdd.furniture : "",
        Validators.compose([Validators.required])
      ],
      keytype: [
        imvToAdd != null ? "1" : "",
        Validators.compose([Validators.required])
      ]
    });
  }

  ionViewDidLoad() {
    let imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
    this.profile = imvToAdd != null ? "Editar" : "Novo Imóvel";
  }

  ionViewWillEnter() {
    this.register = this.navParams.get("register");
  }

  submitProperty() {
    this.submitAttempt = true;
    if (this.form.valid) {
      let reg = Object.assign(this.register, this.form.value);
      this.navCtrl.push(Property3Page, { type: this.type, register: reg });
    }
  }
}
