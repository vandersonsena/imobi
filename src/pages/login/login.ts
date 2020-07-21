import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HelperProvider } from "../../providers/helper";
import { LoginProvider } from "../../providers/login";
import { HomePage } from "../home/home";
import { OneSignal } from "@ionic-native/onesignal";
import { MapsPage } from "../maps/maps";
import { DetailsPage } from "../details/details";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  // 0 - dislogged
  // 0-1 - user
  // 2 - broker
  // 3 - owner
  // 4 - Real Estate

  public form: FormGroup;
  private _eye: string = "eye";
  private userType;
  private redirect: string = "HomePage";
  private proid: number = 0;
  private broid: number = 0;
  private reaid: number = 0;
  private _type: string = "password";
  private titleLogin: string = "Login";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private helper: HelperProvider,
    private formBuilder: FormBuilder,
    private oneSignal: OneSignal,
    private login: LoginProvider
  ) {
    this.form = this.formBuilder.group({
      user: ["", Validators.compose([Validators.required])],
      pwd: ["", Validators.compose([Validators.required])]
    });
  }

  private showPassword()
  {
    if (this._eye == "eye")
    {
      this._eye = "eye-off";
      this._type = "text";
    } else {
      this._eye = "eye";
      this._type = "password";
    }
  }

  ionViewWillEnter()
  {
    this.userType = this.navParams.get('type');
    this.redirect = this.navParams.get('redirect');
    this.proid = this.navParams.get('proid');
    this.broid = this.navParams.get('broid');
    this.reaid = this.navParams.get('reaid');
  }

  private async setOneSignal(res)
  {
   this.oneSignal.sendTag("type", res.type);
   this.oneSignal.sendTag("usrid", res.usrid);
   this.oneSignal.sendTag("usrname", res.user.split(" ", 1));
   if (res.type == 2)
   {
      this.oneSignal.sendTag("broid", res.broid);
      this.oneSignal.sendTag("brokername", res.broker.split(" ", 1));
    }
  }


  loginApp()
  {
    this.helper.showLoading("Efetuando login");
    this.login.login(this.form.value).subscribe(res => {
        localStorage.setItem("usrid", res.usrid);
        localStorage.setItem("broid", res.broid);
        localStorage.setItem('usr-avatar', res.avatar);
        localStorage.setItem("usr-broker", res.broker);
        localStorage.setItem("usr-nickname", res.nickname);
        localStorage.setItem("usr-email", res.email);
        localStorage.setItem("usr-status", res.status);
        localStorage.setItem("usr-phone", res.phone);
        localStorage.setItem("reduce-user", res.user.split(" ", 1));
        localStorage.setItem("reduce-broker", res.broker.split(" ", 1));
        localStorage.setItem("type", res.type);
        localStorage.setItem("profile", res.profile);
        localStorage.setItem("logged", res.logged);
        localStorage.setItem("login-info", JSON.stringify(res));

        if (res.user_running !== 0 && res.property_busy !== 0)
        {
          localStorage.setItem('brokerInProgress', res.user_running);
          localStorage.setItem('propertyBusy', res.property_busy);
        }

        this.setOneSignal(res);
        this.helper.hideLoading();
        //setroot can be dynamic
        if (this.redirect == "DetailsPage"){
          this.navCtrl.setRoot(DetailsPage, { proid: this.proid });
        }else if (this.redirect == "MapsPage") {
          this.navCtrl.setRoot(MapsPage, { pro_id: this.proid, bro_id: this.broid, rea_id: this.reaid });
        }else{
          this.navCtrl.setRoot(HomePage);
        }
      },
      err => {
        this.helper.hideLoading();
        this.helper.presentToast("Informe seu email e sua senha corretamente!");
        alert(JSON.stringify(err));
      }
    );
  }
}
