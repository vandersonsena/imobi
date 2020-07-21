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
import { Property4Page } from "./property4";

@Component({
  selector: "page-property3",
  templateUrl: "property3.html"
})
export class Property3Page {
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
      garage: [
        imvToAdd != null ? imvToAdd.garage : "",
        Validators.compose([Validators.required])
      ],
      occupied: [
        imvToAdd != null ? imvToAdd.occupied : "",
        Validators.compose([Validators.required])
      ],
      relationship: [
        imvToAdd != null ? imvToAdd.relationship : "",
        Validators.compose([Validators.required])
      ],
      kind: [
        imvToAdd != null ? imvToAdd.modid : "",
        Validators.compose([Validators.required])
      ],
      price: [
        imvToAdd != null ? imvToAdd.price : "",
        Validators.compose([Validators.required])
      ],
      visitdates: [
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
      this.navCtrl.push(Property4Page, { type: this.type, register: reg });
    }
  }

  showPassword() {}

  loginEmail() {}

  loadCategs() {}
}
