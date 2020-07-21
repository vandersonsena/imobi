import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { HomePage } from "../home/home";
import { HelperProvider } from "../../providers/helper";
import { PropertyProvider } from "../../providers/property";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { CategoriesProvider } from "../../providers/categories";

@Component({
  selector: "page-property4",
  templateUrl: "property4.html"
})
export class Property4Page {
  public form: FormGroup;
  private submitAttempt: boolean = false;
  private _eye: string = "eye";
  private _type: string = "password";
  private profile: string = "Novo Imóvel";
  private currentMask: object = { mask: "00000000000000", len: 14 };
  private type: number;
  private register: any;
  imgPreview = [];
  maxphotos: number = 10;
  currentNumPhotos: number = 0;
  private realestates = [];


  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private helper: HelperProvider,
    private camera: Camera,
    private categs: CategoriesProvider,
    private formBuilder: FormBuilder,
    private property: PropertyProvider
  ) {
    let imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
    this.form = this.formBuilder.group({
      pets: [
        imvToAdd != null ? imvToAdd.pets : "",
        Validators.compose([Validators.required])
      ],
      tax: [
        imvToAdd != null ? imvToAdd.tax : "",
        Validators.compose([Validators.required])
      ],
      iptu: [
        imvToAdd != null ? imvToAdd.iptu : "",
        Validators.compose([Validators.required])
      ],
      concierge: [
        imvToAdd != null ? imvToAdd.concierge : "",
        Validators.compose([Validators.required])
      ],
      reaid: 0,
      photo: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    let imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
    this.profile = imvToAdd != null ? "Editar" : "Novo Imóvel";
  }

  ionViewWillEnter() {
    this.register = this.navParams.get("register");
    this.loadRealestates();
  }

  removeImg(arr, item){
    this.helper.presentConfirm("Atenção","Deseja excluir esta imagem?", res => {
      this.helper.removeFromArray(arr, item);
    });  
  }

  loadRealestates() {
    this.helper.showLoading("Aguarde");
    this.categs.realestates().subscribe(
      data => {
        this.realestates = data;
        this.helper.hideLoading();
      },
      error => {
        this.helper.hideLoading();
        this.helper.presentToast("Ocorreu um erro ao obter as imobiliárias!");
      }
    );
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    if (this.currentNumPhotos > this.maxphotos){
      this.helper.presentAlert("Atenção", "Número de imagens excedido. Permitido no máximo 10 fotos por imóvel.");
    }else{
      this.camera.getPicture(options).then((imageData) => {
       
          this.imgPreview[this.currentNumPhotos] = 'data:image/jpeg;base64,' + imageData;
          this.currentNumPhotos++;
          if (this.imgPreview.length > 0){
            this.form.controls["photo"].setValue(this.imgPreview[0]);
          }

      });
    }
  }

  getPhoto() {
    
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    if (this.currentNumPhotos > this.maxphotos){
      this.helper.presentAlert("Atenção", "Número de imagens excedido. Permitido no máximo 10 fotos por imóvel.");
    }else{
      this.camera.getPicture(options).then((imageData) => {
       
          this.imgPreview[this.currentNumPhotos] = 'data:image/jpeg;base64,' + imageData;
          this.currentNumPhotos++;
          if (this.imgPreview.length > 0){
            this.form.controls["photo"].setValue(this.imgPreview[0]);
          }

      });
    }
  }

  submitProperty() {
    let imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));

    let arraysIMV = JSON.parse(localStorage.getItem("ARR_PROPERTY_IMV"));
    let arraysIMVOF = JSON.parse(localStorage.getItem("ARR_PROPERTY_OFF_IMV"));

    if (imvToAdd != null) {
      this.helper.showLoading("Salvando Imóvel");
      setTimeout(() => {
        this.helper.hideLoading();

        let removeImv = arraysIMVOF.find(imv => imv.proid == imvToAdd.proid);
        arraysIMVOF = arraysIMVOF.filter(imv => imv.proid != imvToAdd.proid);
        arraysIMV.push(removeImv);
        localStorage.setItem("ARR_PROPERTY_IMV", JSON.stringify(arraysIMV));
        localStorage.setItem(
          "ARR_PROPERTY_OFF_IMV",
          JSON.stringify(arraysIMVOF)
        );
        localStorage.setItem("TO_ACTIVE", "true");
        this.navCtrl.setRoot(HomePage);
        this.helper.presentToast("Seu imóvel foi ativado com sucesso!");
      }, 2000);
    } else {
      this.submitAttempt = true;
      if (this.form.valid) {

        this.form.value.photos = JSON.parse(JSON.stringify(this.imgPreview));
        
        let reg = Object.assign(this.register, this.form.value);
        //alert(JSON.stringify(reg));
        this.helper.showLoading("Salvando Imóvel");
        this.property.save(reg).subscribe(
          res => {
            // console.log(JSON.stringify(res));
            this.helper.hideLoading();
            this.helper.presentToast("Seu imóvel foi cadastrado com sucesso!");
          },
          error => {
            this.helper.hideLoading();
            // console.log(JSON.stringify(error));

            this.helper.presentToast(
              "Ocorreu um erro ao salvar seu imóvel! " + JSON.stringify(error)
            );
          }
        );
      }
    }
  }
}
