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
import { Property2Page } from "./property2";
import { CategoriesProvider } from "../../providers/categories";

@Component({
  selector: "page-property",
  templateUrl: "property.html"
})
export class PropertyPage {
  public form: FormGroup;
  private submitAttempt: boolean = false;
  private _eye: string = "eye";
  private _type: string = "password";
  private profile: string = "";
  private currentMask: object = { mask: "00000000000000", len: 14 };
  private type: number;
  private categories = [];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private helper: HelperProvider,
    private categs: CategoriesProvider,
    private formBuilder: FormBuilder,
    private login: LoginProvider
  ) {
    let imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
    this.form = this.formBuilder.group({
      city: [
        imvToAdd != null ? imvToAdd.city : "",
        Validators.compose([Validators.maxLength(40), Validators.required])
      ],
      catid: [
        imvToAdd != null ? imvToAdd.catid : "",
        Validators.compose([Validators.required])
      ],
      address: [
        imvToAdd != null ? imvToAdd.address : "",
        Validators.compose([Validators.required])
      ],
      number: imvToAdd != null ? imvToAdd.number : "",
      complement: "",
      neighboor: [
        imvToAdd != null ? imvToAdd.neighboor : "",
        Validators.compose([Validators.required])
      ],
      zipcode: [
        imvToAdd != null ? imvToAdd.zipcode : "",
        Validators.compose([
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.required
        ])
      ],
      uf: [
        imvToAdd != null ? "SP" : "",
        Validators.compose([
          Validators.maxLength(2),
          Validators.minLength(2),
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {
    let imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
    this.profile = imvToAdd != null ? "Editar" : "Novo Imóvel";
  }

  ionViewWillUnload() {
    localStorage.setItem("imvToActive", JSON.stringify(null));
  }

  ionViewWillEnter() {
    this.loadCategs();
  }

  submitProperty() {
    this.submitAttempt = true;
    if (this.form.valid) {
      this.navCtrl.push(Property2Page, {
        type: this.type,
        register: this.form.value
      });
    }
  }

  showPassword() {}

  loginEmail() {}

  loadCategs() {
    this.helper.showLoading("Aguarde");
    this.categs.get().subscribe(
      data => {
        this.categories = data;
        this.helper.hideLoading();
      },
      error => {
        this.helper.hideLoading();
        this.helper.presentToast("Ocorreu um erro ao obter os imóveis!");
      }
    );
  }
}
