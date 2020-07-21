webpackJsonp([0],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelperProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HelperProvider = /** @class */ (function () {
    function HelperProvider(loadingCtrl, alertCtrl, toastCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.isConnected = true;
    }
    HelperProvider.prototype.presentToast = function (msgToast) {
        var toast = this.toastCtrl.create({
            message: msgToast,
            duration: 6000,
            position: 'bottom'
        });
        toast.present();
    };
    HelperProvider.prototype.removeFromArray = function (arr, item) {
        var what, a = item, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return true;
    };
    HelperProvider.prototype.presentAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    HelperProvider.prototype.presentConfirm = function (title, msg, callback) {
        var alert = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        if (callback)
                            callback(data);
                    }
                }
            ]
        });
        alert.present();
    };
    HelperProvider.prototype.presentPrompt = function (title, msg, inputs, callback) {
        var alert = this.alertCtrl.create({
            title: title,
            message: msg,
            inputs: [inputs],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Enviar',
                    handler: function (data) {
                        if (callback)
                            callback(data);
                    }
                }
            ]
        });
        alert.present();
    };
    HelperProvider.prototype.showLoading = function (msgLoading) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: msgLoading + '...'
        });
        this.loading.present();
    };
    HelperProvider.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    HelperProvider.prototype.distance = function (lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") {
                dist = dist * 1.609344;
            }
            if (unit == "N") {
                dist = dist * 0.8684;
            }
            return dist;
        }
    };
    HelperProvider.prototype.nl2br = function (text) {
        //return text.replace('\\r\\n', '\n');
        return text.replace('\n', '<br/>');
    };
    HelperProvider.prototype.validCPF = function (strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        for (var i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)))
            return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11)))
            return false;
        return true;
    };
    HelperProvider.prototype.validCNPJ = function (cnpj) {
        var tamanho = cnpj.length - 2;
        var numeros = cnpj.substring(0, tamanho);
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
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        else {
            return true;
        }
    };
    HelperProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], HelperProvider);
    return HelperProvider;
}());

//# sourceMappingURL=helper.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sociallogin_sociallogin__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyActionPage = /** @class */ (function () {
    function MyActionPage(navCtrl, helper) {
        this.navCtrl = navCtrl;
        this.helper = helper;
    }
    MyActionPage.prototype.openHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    MyActionPage.prototype.signin = function (title, type) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__sociallogin_sociallogin__["a" /* SocialLoginPage */], { title: title, type: type });
    };
    MyActionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-myaction',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/myaction/myaction.html"*/'<ion-content class="masters">\n    <div class="content">\n        <div class="maps-moving"></div>\n        <div>\n            <div class="header-start">\n                <img src="./../../assets/imgs/logo.png" class="ma-logo"/>\n            </div>\n            <div class="footer">\n                <div class="btns">\n                    <button id="bt1" type="button" ion-button (click)=\'signin("Procurar um novo imóvel", 1);\'>\n                        Procurar um<br>Novo Imóvel\n                    </button>\n                    <button id="bt2" type="button" ion-button (click)=\'signin("Anunciar um Imóvel", 3);\'>\n                        Anunciar um<br>Imóvel\n                    </button>\n                    <button id="bt3" type="button" ion-button (click)=\'signin("Entrar como Corretor", 2);\'>\n                        Entrar como<br>Corretor\n                    </button>\n                    <button id="bt4" type="button" ion-button (click)=\'signin("Entrar como Imobiliária", 4);\'>\n                        Entrar como<br>Imobiliária\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/myaction/myaction.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_helper__["a" /* HelperProvider */]])
    ], MyActionPage);
    return MyActionPage;
}());

//# sourceMappingURL=myaction.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PositionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PositionsProvider = /** @class */ (function () {
    function PositionsProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    PositionsProvider.prototype.getPositions = function (broid, latitude, longitude, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/position/broid/' + broid + '/' + latitude + '/' + longitude, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res; });
    };
    PositionsProvider.prototype.getVisit = function (proid, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/visit/' + proid, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.visits; });
    };
    PositionsProvider.prototype.cancelVisit = function (broid, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .delete(this.globals.getBaseUrl() + '/visit/' + broid, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res; });
    };
    PositionsProvider.prototype.brokerPosition = function (data, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .post(this.globals.getBaseUrl() + '/broker/position', data, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data; });
    };
    PositionsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], PositionsProvider);
    return PositionsProvider;
}());

//# sourceMappingURL=positions.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupProvider = /** @class */ (function () {
    function SignupProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    SignupProvider.prototype.save = function (register, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .post(this.globals.getBaseUrl() + '/signup', register, expandedHeaders)
            .timeout(15000)
            .map(function (res) {
            localStorage.setItem('usr-avatar', res.selfie);
            localStorage.setItem('usr-email', res.email);
            localStorage.setItem('usr-type', res.type);
            localStorage.setItem('usr-usrid', res.usrid);
            localStorage.setItem('usr-active', res.active);
            localStorage.setItem('usr-name', res.name);
            localStorage.setItem('reduce-user', res.name.split(" ", 1));
            localStorage.setItem('logged', res.logged);
            localStorage.setItem('login-info', JSON.stringify(res));
        });
    };
    SignupProvider.prototype.update = function (register, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .put(this.globals.getBaseUrl() + '/signup', register, expandedHeaders)
            .timeout(15000)
            .map(function (res) {
            localStorage.setItem('usr-name', res.name);
            localStorage.setItem('usr-type', res.usrid);
            localStorage.setItem('usr-usrid', res.usrid);
            localStorage.setItem('usr-active', res.active);
            localStorage.setItem('reduce-name', res.name.split(" ", 1));
            localStorage.setItem('logged', res.logged);
            localStorage.setItem('login-info', JSON.stringify(res));
        });
    };
    SignupProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], SignupProvider);
    return SignupProvider;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 146:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 146;

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Global = /** @class */ (function () {
    function Global() {
        this.KM_MINIMUM_LIMIT_VISIT = 5;
        this.KM_MINIMUM_BROKER_NEAR = 7;
        this.SECONDS_LISTEN_POSITION = 15000;
        this.status = false;
        this.networkDown = false;
        this.isUserLogged = false;
        this.showFooterOnSomePages = true;
        this.isHomePage = false;
        this.baseUrl = "https://api.imobiplaces.com.br/api/v1";
        this.appIdOneSignal = "21233d99-be0b-415e-8d6a-7eaf6f73e407";
        this.googleOneSignalID = "709548536063";
        this.pagseg_email = "";
        this.pagseg_token = "";
        this.mapboxToken = 'pk.eyJ1IjoiaW1vYmltYXBib3giLCJhIjoiY2s2ODkxb3ZiMDJrODNwbno2amo5NnFuNiJ9.get87rTaxsKLY8CehU9b5w';
        this.latitude = 0;
        this.longitude = 0;
        this.newlatlng = false;
        this.itemOnCart = false;
        this.total_cart = 0.00;
        this.item_cart = "Seu carrinho está vazio!";
        this.arrCart = [];
        this.cart_items = [];
        //this.storage.clear();
        //this.get(); 
    }
    Global.prototype.getBaseUrl = function () {
        return this.baseUrl;
    };
    Global.prototype.setStatusScript = function (status) {
        this.status = status;
    };
    Global.prototype.getStatusScript = function () {
        return this.status;
    };
    Global = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Global);
    return Global;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 187;

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(125);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SplashPage = /** @class */ (function () {
    function SplashPage(navCtrl, viewCtrl, splashScreen) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    SplashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 4000);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/splash/splash.html"*/'<ion-content class="masters">\n    <div class="logo-animation">\n        <div class="logo-wp animated fadeIn"></div>\n        <div class="logo-p animated bounce"></div>\n    </div>       \n</ion-content>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/splash/splash.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Carrousel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Carrousel = /** @class */ (function () {
    function Carrousel(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.images = null;
        this.currentIndex = null;
        this.images = this.navParams.get('images');
        this.currentIndex = this.navParams.get('currentIndex');
    }
    Carrousel.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    Carrousel.prototype.slideChanged = function () {
        var currentIndex = this.mySlider.getActiveIndex();
        // console.log('Current index is', currentIndex);
    };
    Carrousel.prototype.goToSlide = function () {
        this.mySlider.slideTo(2, 500);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('mySlider'),
        __metadata("design:type", Object)
    ], Carrousel.prototype, "mySlider", void 0);
    Carrousel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'carrousel',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/details/gallery/carrousel.html"*/'<ion-content class="masters">\n  <button class="btn-back" ion-button icon-only (click)="dismiss()">\n    <ion-icon name="close" color="branco"></ion-icon>\n  </button>\n  <ion-slides paginationClickable=true\n              initialSlide="{{currentIndex}}"\n              loop=true\n              autoplay=5000\n              speed=2000\n              #mySlider\n              class="main_view"\n              (ionSlideDidChange)="slideChanged()">\n\n    <ion-slide *ngFor="let item of images" class="home-slide">\n\n      <div class="img-slide" [style.background-image]="\'url(\' + item.urlimage + \')\'"></div>\n      \n    </ion-slide>\n  </ion-slides> \n\n  <ion-slides paginationClickable=true\n    slidesPerView=2\n    loop=true\n    speed=2000\n    spaceBetween=5\n    #mySlider\n    class="view_next">\n\n    <ion-slide *ngFor="let item of images" class="home-slide">\n      <div class="img-slide" [style.background-image]="\'url(\' + item.urlimage + \')\'"></div>\n    </ion-slide>\n  </ion-slides>\n</ion-content>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/details/gallery/carrousel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], Carrousel);
    return Carrousel;
}());

//# sourceMappingURL=carrousel.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sociallogin_sociallogin__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_zbar__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__details_details__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__schedule_schedule__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__discover_discover__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__property_property__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_property__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_schedule__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_brokers__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_escape_string_regexp__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_escape_string_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_escape_string_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__filter_filter__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__terms_terms__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__neighboors_neighboors__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_launch_navigator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_google_maps__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__favorites_favorites__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
























__WEBPACK_IMPORTED_MODULE_16_moment__["locale"]('pt-br'); // :| imobimapbox Im0b1@2020_mapbox
var HomePage = /** @class */ (function () {
    function HomePage(global, navCtrl, helper, login, brokers, googleMaps, property, schedule, platform, zbar, zone, launchNavigator, geolocation, modalCtrl) {
        var _this = this;
        this.global = global;
        this.navCtrl = navCtrl;
        this.helper = helper;
        this.login = login;
        this.brokers = brokers;
        this.googleMaps = googleMaps;
        this.property = property;
        this.schedule = schedule;
        this.platform = platform;
        this.zbar = zbar;
        this.zone = zone;
        this.launchNavigator = launchNavigator;
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.ARR_ITEMS = [];
        this.ARR_PROPERTIES_OWNER_ONLINE = [];
        this.ARR_PROPERTIES_OWNER_OFFLINE = [];
        this.ARR_PROPERTY_IMV = [];
        this.ARR_PROPERTY_OFF_IMV = [];
        this.ARR_LOCATIONS = [];
        this.usr_status = 0;
        this._userLogged = "none";
        this._showFilter = false;
        this._userProfile = 0;
        this._brokerOffline = true;
        this._tabNum = 1;
        this._ownerTab = null;
        this._reTab = null;
        this.lblToggle = "OFFLINE";
        this.favoriteColor = "amarelo";
        this._colorChanges = true;
        this.input_search = "";
        this.locations_searched = [];
        this.check = __WEBPACK_IMPORTED_MODULE_16_moment__();
        this.month = this.check.format('M');
        this.monthName = this.check.format('MMMM');
        this.day = this.check.format('D');
        this.year = this.check.format('YYYY');
        this.hour = this.check.format('HH:mm');
        this.currentWeekDay = this.check.format('dddd');
        this.goToStore = function (address) {
            _this.zone.run(function () {
                var options = {
                    appSelection: {
                        dialogHeaderText: "Navegar até o local usando...",
                        cancelButtonText: "Cancelar",
                        rememberChoice: {
                            enabled: false,
                            prompt: {
                                headerText: "Navegar até o local",
                                bodyText: "Utilizar este App na próxima vez?",
                                yesButtonText: "SIM",
                                noButtonText: "NÃO"
                            }
                        }
                    }
                };
                _this.launchNavigator.navigate(address, options)
                    .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
            });
        };
        window.angularComponent = { goToStore: this.goToStore, zone: zone, navCtrl: this.navCtrl, openProperty: this.openProperty };
        this.infoWindows = [];
        this.coordinate = {
            latitude: '',
            longitude: ''
        };
    }
    HomePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.initMap();
        });
    };
    HomePage.prototype.initMap = function () {
        var _this = this;
        var map = this.googleMaps.create(this.mapElement.nativeElement);
        map.one(__WEBPACK_IMPORTED_MODULE_22__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function (data) {
            _this.geolocation.getCurrentPosition()
                .then(function (resp) {
                _this.coordinate.latitude = resp.coords.latitude;
                _this.coordinate.longitude = resp.coords.longitude;
                var coordinates = new __WEBPACK_IMPORTED_MODULE_22__ionic_native_google_maps__["d" /* LatLng */](resp.coords.latitude, resp.coords.longitude);
                var position = {
                    target: coordinates,
                    zoom: 14
                };
                map.animateCamera(position);
                var markerOptions = {
                    position: coordinates,
                    icon: "assets/icon/v2/home_ico_marker.png",
                    title: 'Sua localização'
                };
                var marker = map.addMarker(markerOptions)
                    .then(function (marks) {
                    //marks.showInfoWindow();
                });
                _this.getMarkers(map);
            }).catch(function (error) {
                _this.helper.presentToast('Erro ao recuperar sua posição');
            });
        });
    };
    HomePage.prototype.closeAllInfoWindows = function () {
        for (var _i = 0, _a = this.infoWindows; _i < _a.length; _i++) {
            var window_1 = _a[_i];
            window_1.close();
        }
    };
    HomePage.prototype.getMarkers = function (map) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.property.getDiscover(this.coordinate).subscribe(function (res) {
                            res.forEach(function (mark) {
                                _this.addMarkersToMap(mark.data, map);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.addMarkersToMap = function (mark, map) {
        var _this = this;
        if (mark !== null) {
            var coordinates = new __WEBPACK_IMPORTED_MODULE_22__ionic_native_google_maps__["d" /* LatLng */](mark.latitude, mark.longitude);
            var markerOptions = {
                position: coordinates,
                icon: "assets/icon/v2/home_ico_yellow_marker.png",
                proid: mark.proid,
                urlimage: mark.urlimage,
                //animation: google.maps.Animation.DROP,
                address: "blabla"
            };
            var marks = map.addMarker(markerOptions)
                .then(function (marca) {
                //mark.showInfoWindow();
                _this.addInfoWindowToMarker(marca, mark);
            });
        }
    };
    HomePage.prototype.addInfoWindowToMarker = function (mark, marker) {
        var _this = this;
        var infoWindowContent = '<img border: 1vw solid white; style="z-index: 100000; width: 20vw; height: 20vw; border-radius: 10vw; position: fixed; left: calc(50% - 10vw); top: -58vw; border: 2px aliceblue solid" src="' + marker.urlimage + '">' +
            '<p style="color: black; font-size: 3vw; margin-left: 0; width: 99%; margin-right: 10px;"><br><br><strong>' + marker.title + '</strong></p>' +
            '<p style="color: black; margin-left: 0; width: 99%; margin-right: 10px;"><br>' + marker.address + '</p>' +
            '<p onclick="window.angularComponent.openProperty(' + marker.proid + ')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -2vw;">VER IMÓVEL</p>' +
            '<p onclick="window.angularComponent.goToStore(\'' + marker.address + '\')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -3vw;">IR ATÉ LÁ</p>';
        var infoWindow = new __WEBPACK_IMPORTED_MODULE_22__ionic_native_google_maps__["c" /* HtmlInfoWindow */]();
        infoWindow.setContent(infoWindowContent, { width: "280px", height: "40vw", "border-radius": "10px", border: "2px aliceblue solid" });
        mark.on(__WEBPACK_IMPORTED_MODULE_22__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK).subscribe(function () {
            _this.closeAllInfoWindows();
            infoWindow.open(mark);
        });
        this.infoWindows.push(infoWindow);
    };
    /**
     * PROFILE IDs
     *
     * 0-1  - USER
     * 2    - BROKER
     * 3    - OWNER
     * 4    - REALESTATE
     */
    /* ionViewDidLoad()
    {
      let check = localStorage.getItem("TO_ACTIVE");
      if (check == "true")
      {
        localStorage.setItem("TO_ACTIVE", "false");
        this.loadProperties(1, 3);
      } else {
        localStorage.setItem("ARR_PROPERTY_IMV", JSON.stringify([]));
        localStorage.setItem("ARR_PROPERTY_OFF_IMV", JSON.stringify([]));
        this.loadProperties(1, 3);
      }
    } */
    HomePage.prototype.visitsPage = function () { };
    /**
     * Open profile based TABS
     * @param tab
     */
    HomePage.prototype.openTab = function (tab) {
        var t_s = document.getElementById('tab_schedule');
        var t_c = document.getElementById('tab_client');
        var t_a = document.getElementById('tab_ads');
        var t_o = document.getElementById('tab_onair');
        var t_f = document.getElementById('tab_offline');
        var t_v = document.getElementById('tab_visits');
        var t_e = document.getElementById('tab_ended');
        var t_r = document.getElementById('tab_re');
        var t_i = document.getElementById('tab_im');
        switch (tab) {
            case 0:
                t_c.classList.add('tab-active');
                t_a.classList.remove('tab-active');
                break;
            case 1:
                t_c.classList.remove('tab-active');
                t_a.classList.remove('tab-active');
                break;
            case 2:
                t_c.classList.remove('tab-active');
                t_a.classList.add('tab-active');
                break;
            case 3:
                t_o.classList.add("tab-active");
                t_f.classList.remove("tab-active");
                this.loadProperties(1, 3);
                break;
            case 4:
                t_o.classList.remove("tab-active");
                t_f.classList.add("tab-active");
                this.loadProperties(1, 4);
                break;
            case 5:
                t_v.classList.add("tab-active");
                t_e.classList.remove("tab-active");
                this.loadSchedules("broid", 1);
                break;
            case 6:
                t_v.classList.remove("tab-active");
                t_e.classList.add("tab-active");
                this.loadSchedules("broid", 1);
                break;
            case 7:
                t_r.classList.add("tab-active");
                t_i.classList.remove("tab-active");
                this.loadProperties(1);
                break;
            case 8:
                t_r.classList.remove("tab-active");
                t_i.classList.add("tab-active");
                this.loadProperties(0);
                break;
            case 9:
                t_r.classList.add("tab-active");
                t_i.classList.remove("tab-active");
                this.loadProperties(9);
                break;
            case 10:
                t_r.classList.remove("tab-active");
                t_i.classList.add("tab-active");
                break;
            case 11:
                t_r.classList.add("tab-active");
                t_i.classList.remove("tab-active");
                this.loadSchedules("broid", 1);
                break;
            case 12:
                t_r.classList.remove("tab-active");
                t_i.classList.add("tab-active");
                break;
            case 13:
                t_r.classList.remove("tab-active");
                t_i.classList.add("tab-active");
                break;
        }
        this._tabNum = tab;
    };
    HomePage.prototype.ownerTab = function (tab) {
        var ot_0 = document.getElementById("ot_0");
        var ot_1 = document.getElementById("ot_1");
        if (tab == 0) {
            ot_0.classList.add("toggle-active");
            ot_1.classList.remove("toggle-active");
            this._tabNum = 3;
            //this.openTab(3);
        }
        if (tab == 1) {
            ot_0.classList.remove("toggle-active");
            ot_1.classList.add("toggle-active");
            this._tabNum = 5;
            //this.openTab(5);
        }
        this._ownerTab = tab;
    };
    HomePage.prototype.generateRandomNumber = function (numberOfIndexs) {
        var randomNumber = Math.floor(Math.random() * numberOfIndexs);
        return randomNumber;
    };
    HomePage.prototype.setArraysForLocalStorage = function () {
        this.ARR_PROPERTY_IMV = JSON.parse(localStorage.getItem("ARR_PROPERTY_IMV"));
        this.ARR_PROPERTY_OFF_IMV = JSON.parse(localStorage.getItem("ARR_PROPERTY_OFF_IMV"));
    };
    HomePage.prototype.search = function (tab) {
        if (this.search_term == "") {
            this.setArraysForLocalStorage();
            return;
        }
        var currentArray = tab == 3 ? this.ARR_PROPERTY_IMV : this.ARR_PROPERTY_OFF_IMV;
        var match = new RegExp(__WEBPACK_IMPORTED_MODULE_15_escape_string_regexp___default()(this.search_term), "i");
        if (currentArray.length > 0) {
            var newArray = currentArray.filter(function (imv) { return match.test(imv.neighboor) || match.test(imv.city); });
        }
        else {
            this.setArraysForLocalStorage();
            var currentArray = tab == 3 ? this.ARR_PROPERTY_IMV : this.ARR_PROPERTY_OFF_IMV;
            var newArray = currentArray.filter(function (imv) { return match.test(imv.neighboor) || match.test(imv.city); });
        }
        tab == 3
            ? (this.ARR_PROPERTY_IMV = newArray)
            : (this.ARR_PROPERTY_OFF_IMV = newArray);
    };
    HomePage.prototype.defineNewImvArrays = function (imvs, checkTab) {
        var firstItem = checkTab == 4 ? 31 : 32;
        var secondItem = checkTab == 4 ? 30 : 42;
        var thirdItem = checkTab == 4 ? 20 : 2;
        var arrayForProperty = imvs.filter(function (imv) {
            return imv.proid == firstItem ||
                imv.proid == secondItem ||
                imv.proid == thirdItem;
        });
        if (checkTab == 3) {
            var check = JSON.parse(localStorage.getItem("ARR_PROPERTY_IMV"));
            this.ARR_PROPERTY_IMV = check.length > 0 ? check : arrayForProperty;
            localStorage.setItem("ARR_PROPERTY_IMV", JSON.stringify(this.ARR_PROPERTY_IMV));
            this.propertyLength = this.ARR_PROPERTY_IMV.length;
        }
        else {
            var check = JSON.parse(localStorage.getItem("ARR_PROPERTY_OFF_IMV"));
            this.ARR_PROPERTY_OFF_IMV = check.length > 0 ? check : arrayForProperty;
            localStorage.setItem("ARR_PROPERTY_OFF_IMV", JSON.stringify(this.ARR_PROPERTY_OFF_IMV));
        }
    };
    HomePage.prototype.activeImv = function (id) {
        var removeImv = this.ARR_PROPERTY_OFF_IMV.find(function (imv) { return imv.proid == id; });
        this.ARR_PROPERTY_OFF_IMV = this.ARR_PROPERTY_OFF_IMV.filter(function (imv) { return imv.proid != id; });
        this.ARR_PROPERTY_IMV.push(removeImv);
        localStorage.setItem("ARR_PROPERTY_IMV", JSON.stringify(this.ARR_PROPERTY_IMV));
        this.propertyLength = this.ARR_PROPERTY_IMV.length;
        localStorage.setItem("ARR_PROPERTY_OFF_IMV", JSON.stringify(this.ARR_PROPERTY_OFF_IMV));
    };
    HomePage.prototype.loadProperties = function (reaid, checkTab) {
        if (checkTab === void 0) { checkTab = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var runApi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        runApi = true;
                        if ((this.ARR_PROPERTIES_OWNER_ONLINE.length > 0 && checkTab == 3) ||
                            (this.ARR_PROPERTIES_OWNER_OFFLINE.length > 0 && checkTab == 4)) {
                            runApi = false;
                        }
                        if (!runApi) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.helper.showLoading("Aguarde")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.property.listProperty(reaid).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (checkTab == 3)
                                                this.ARR_PROPERTIES_OWNER_ONLINE = data;
                                            if (checkTab == 4)
                                                this.ARR_PROPERTIES_OWNER_OFFLINE = data;
                                            //5 e 6 ownertab
                                            //this.ARR_ITEMS = data;
                                            this.propertyLength = (this.ARR_PROPERTIES_OWNER_OFFLINE.length +
                                                this.ARR_PROPERTIES_OWNER_OFFLINE.length);
                                            return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.helper.presentToast("Não foi possível carregar os imóveis")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.loadSchedules = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.helper.showLoading("Aguarde")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.schedule.getSchedules(type, value).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.ARR_ITEMS = data;
                                            return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.helper.presentToast("Não foi possível carregar os agendamentos")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.reTab = function (tab) {
        var rt_0 = document.getElementById("rt_0");
        var rt_1 = document.getElementById("rt_1");
        var rt_2 = document.getElementById("rt_2");
        var rt_3 = document.getElementById("rt_3");
        if (tab == 0) {
            rt_0.classList.add("toggle-active");
            rt_1.classList.remove("toggle-active");
            rt_2.classList.remove("toggle-active");
            rt_3.classList.remove("toggle-active");
            this._tabNum = 9;
            this.openTab(9);
        }
        if (tab == 1) {
            rt_0.classList.remove("toggle-active");
            rt_1.classList.add("toggle-active");
            rt_2.classList.remove("toggle-active");
            rt_3.classList.remove("toggle-active");
            this._tabNum = 11;
            this.openTab(11);
        }
        if (tab == 2) {
            rt_0.classList.remove("toggle-active");
            rt_1.classList.remove("toggle-active");
            rt_2.classList.add("toggle-active");
            rt_3.classList.remove("toggle-active");
            this._tabNum = 7;
            this.loadProperties(1);
        }
        if (tab == 3) {
            rt_0.classList.remove("toggle-active");
            rt_1.classList.remove("toggle-active");
            rt_2.classList.remove("toggle-active");
            rt_3.classList.add("toggle-active");
            this._tabNum = 13;
        }
        this._reTab = tab;
    };
    HomePage.prototype.scrolling = function (event) {
        //var elmnt = document.getElementsByTagName("ion-header")[0];
        // const sheet = new CSSStyleSheet();
        //sheet.insertRule('#target {color: darkseagreen}');
        // elmnt.innerHTML = sheet;
    };
    HomePage.prototype.exitMyApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        val = localStorage.getItem("logged");
                        return [4 /*yield*/, localStorage.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.helper.showLoading("Saindo")];
                    case 2:
                        _a.sent();
                        //await this.login.logout().subscribe(
                        //async data => {
                        //if (val === "facebook") 
                        //{
                        /* this.facebook.logout().then( res => {
                            localStorage.setItem('logged', 'false');
                            localStorage.clear();
                            this.platform.exitApp();
                          }).catch(e => {
                            localStorage.setItem('logged', 'false');
                            localStorage.clear();
                            this.platform.exitApp();
                          }); */
                        //} else {
                        return [4 /*yield*/, localStorage.clear()];
                    case 3:
                        //await this.login.logout().subscribe(
                        //async data => {
                        //if (val === "facebook") 
                        //{
                        /* this.facebook.logout().then( res => {
                            localStorage.setItem('logged', 'false');
                            localStorage.clear();
                            this.platform.exitApp();
                          }).catch(e => {
                            localStorage.setItem('logged', 'false');
                            localStorage.clear();
                            this.platform.exitApp();
                          }); */
                        //} else {
                        _a.sent();
                        return [4 /*yield*/, setTimeout(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.platform.exitApp()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 1000)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.ionViewDidLoad = function (filter) {
        if (filter === void 0) { filter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, sts;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, localStorage.getItem("type")];
                    case 1:
                        _a.usr_type = _l.sent();
                        _b = this;
                        return [4 /*yield*/, localStorage.getItem("profile")];
                    case 2:
                        _b.usr_profile = _l.sent();
                        _c = this;
                        return [4 /*yield*/, localStorage.getItem("logged")];
                    case 3:
                        _c.usr_logged = _l.sent();
                        _d = this;
                        return [4 /*yield*/, localStorage.getItem("reduce-user")];
                    case 4:
                        _d.usr_user = _l.sent();
                        _e = this;
                        return [4 /*yield*/, localStorage.getItem("usr-avatar")];
                    case 5:
                        _e.usr_avatar = _l.sent();
                        _f = this;
                        return [4 /*yield*/, localStorage.getItem("usr-broker")];
                    case 6:
                        _f.usr_broker = _l.sent();
                        _g = this;
                        return [4 /*yield*/, localStorage.getItem("usr-nickname")];
                    case 7:
                        _g.usr_nickname = _l.sent();
                        _h = this;
                        return [4 /*yield*/, localStorage.getItem("usr-email")];
                    case 8:
                        _h.usr_email = _l.sent();
                        _j = this;
                        return [4 /*yield*/, localStorage.getItem("usr-phone")];
                    case 9:
                        _j.usr_phone = _l.sent();
                        _k = this;
                        return [4 /*yield*/, parseInt(localStorage.getItem("usr-status"))];
                    case 10:
                        _k.usr_status = _l.sent();
                        this._userLogged = this.usr_logged === null
                            ? "none"
                            : this.usr_logged;
                        this._userProfile = isNaN(parseInt(this.usr_type)) || this.usr_type === null
                            ? 0
                            : parseInt(this.usr_type);
                        if (!(this._userProfile == 2)) return [3 /*break*/, 12];
                        return [4 /*yield*/, localStorage.getItem("statusBroker")];
                    case 11:
                        sts = _l.sent();
                        if (!isNaN(parseInt(sts)) && parseInt(sts) > 0) {
                            this._brokerOffline = false;
                            this.lblToggle = "ONLINE PARA VISITAS";
                        }
                        else {
                            this._brokerOffline = true;
                            this.lblToggle = "OFFLINE";
                        }
                        _l.label = 12;
                    case 12:
                        if (!(this._userProfile == 0 || this._userProfile == 1)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.helper.showLoading("Aguarde")];
                    case 13:
                        _l.sent();
                        return [4 /*yield*/, this.property.getHighlights(filter).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.ARR_ITEMS = data;
                                            return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.helper.presentToast("Imóvel não localizado ou indisponível.")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 14:
                        _l.sent();
                        return [4 /*yield*/, this.initializeMapbox()];
                    case 15:
                        _l.sent();
                        this._tabNum = 0;
                        return [3 /*break*/, 17];
                    case 16:
                        if (this._userProfile == 2) {
                            this._tabNum = 0;
                            // Owner Profile [3]
                        }
                        else if (this._userProfile == 3) {
                            this._tabNum = 3;
                            this._ownerTab = 0;
                            //this.openTab(3);
                            // Real Estate Profile [4]
                        }
                        else if (this._userProfile == 4) {
                            this._tabNum = 7;
                            this._reTab = 2;
                        }
                        _l.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.loginPage = function (type) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__sociallogin_sociallogin__["a" /* SocialLoginPage */], { title: "", type: 1 });
    };
    HomePage.prototype.schedulePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__schedule_schedule__["a" /* SchedulePage */], { title: "", type: 1 });
    };
    HomePage.prototype.openProperty = function (proid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__details_details__["a" /* DetailsPage */], { proid: proid });
    };
    HomePage.prototype.discoverPage = function (val) {
        if (val === void 0) { val = null; }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__discover_discover__["a" /* DiscoverPage */], { title: "", type: 1, near: val });
    };
    HomePage.prototype.mapsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__maps_maps__["a" /* MapsPage */], { title: "", type: 1 });
    };
    HomePage.prototype.neighboorPage = function (match) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_20__neighboors_neighboors__["a" /* NeighboorsPage */], { location: match.neighboor + ' - ' + match.city, match: match });
    };
    HomePage.prototype.signinPage = function (title, type) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__sociallogin_sociallogin__["a" /* SocialLoginPage */], { title: title, type: type });
    };
    HomePage.prototype.rateApp = function () {
        this.helper.presentToast("Direciona para Google Play ou Apple Store para avaliação!");
    };
    HomePage.prototype.favouritePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_23__favorites_favorites__["a" /* FavoritesPage */]);
    };
    HomePage.prototype.closeDeal = function (id) {
        var deal = document.getElementById("deal-" + id);
        deal.classList.remove("hide-deal");
    };
    HomePage.prototype.termsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_19__terms_terms__["a" /* TermsPage */], {});
    };
    HomePage.prototype.showFilter = function () {
        var _this = this;
        var openFilter = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_17__filter_filter__["a" /* Filter */], { input_search: this.input_search });
        openFilter.onDidDismiss(function (data) {
            if (data) {
                _this.ionViewDidLoad(data);
            }
        });
        openFilter.present();
    };
    HomePage.prototype.enableBroker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var label, reg, status, toggle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        label = "está indisponível no momento!";
                        if (!this._brokerOffline) {
                            status = "0";
                            this._brokerOffline = true;
                            toggle = "OFFLINE";
                            reg = { status: 0 };
                        }
                        else if (this._brokerOffline) {
                            status = "1";
                            this._brokerOffline = false;
                            toggle = "ONLINE PARA VISITAS";
                            label = "está disponível para visitas!";
                            reg = { status: 1 };
                        }
                        return [4 /*yield*/, this.brokers.statusBroker(reg).subscribe(function (data) {
                                localStorage.setItem("statusBroker", status);
                                _this.lblToggle = toggle;
                                _this.helper.presentToast("Você " + label);
                            }, function (error) {
                                _this._brokerOffline = !_this._brokerOffline;
                                _this.helper.presentToast("Ocorreu um erro ao alterar seu status!");
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.search_location = function () {
        var _this = this;
        if (!this.input_search.trim().length) {
            this.locations_searched = [];
            return;
        }
        var match = new RegExp(__WEBPACK_IMPORTED_MODULE_15_escape_string_regexp___default()(this.input_search), "i");
        if (this.input_search.trim().length > 3) {
            this.property.getNeighboors(this.input_search).subscribe(function (res) {
                _this.locations_searched = res.neighboors;
            });
        }
    };
    HomePage.prototype.choose = function (item) {
        this.input_search = item;
        this.locations_searched = [];
    };
    HomePage.prototype.removeFocus = function () {
        // this.locations_searched = [];
    };
    HomePage.prototype.onCancel = function () {
        this.input_search = "";
    };
    HomePage.prototype.scanImage = function () {
        var _this = this;
        var options = {
            flash: "off",
            text_title: "QRCode Imobi",
            text_instructions: "Focalize o QRCode na placa do imóvel",
            drawSight: false
        };
        this.zbar
            .scan(options)
            .then(function (result) {
            var getOnlyQRCodeWithoutURL = result.split(/[\s/]+/);
            _this.property.getProperty(getOnlyQRCodeWithoutURL[getOnlyQRCodeWithoutURL.length - 1]).subscribe(function (data) {
                //salvar consulta tb para bigdata
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__details_details__["a" /* DetailsPage */], { qrcode: getOnlyQRCodeWithoutURL[getOnlyQRCodeWithoutURL.length - 1], type: 1 });
            }, function (error) {
                _this.helper.presentToast("Imóvel não localizado ou indisponível.");
            });
        })
            .catch(function (error) {
            if (error != "cancelled")
                _this.helper.presentToast("Falha ao efetuar a leitura do QRCode.");
        });
    };
    /**
     *
     */
    HomePage.prototype.initializeMapbox = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.addProperty = function (imv, hasImv) {
        if (hasImv === void 0) { hasImv = false; }
        if (hasImv) {
            localStorage.setItem("imvToActive", JSON.stringify(imv));
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__property_property__["a" /* PropertyPage */], {
            lat: -23.5526198,
            lng: -46.6634091,
            type: 1
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])("map"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-home",template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only color="branco">\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title color="azul">\n      <div class="center-home-logo">\n        <img src="./../../assets/imgs/logo.png" class="logo-home"/>\n      </div>\n    </ion-title>\n    <ion-buttons end *ngIf="_userLogged != \'none\'">\n      <img src="{{ usr_avatar }}" class="avatar"/>\n    </ion-buttons>\n    <a (click)=\'signinPage()\'>\n      <ion-buttons end *ngIf="_userLogged == \'none\'">\n        <ion-icon name="contact" color="branco" (click)=\'signinPage("Entrar no Imobi Places", 1);\'></ion-icon>\n      </ion-buttons>\n    </a>\n  </ion-navbar> \n</ion-header>\n \n<ion-menu [content]="myContent" type="overlay">\n  <ion-content style="background-color: #FFFFFF;">\n    <ion-list class="list-menu-app">\n      <div class="bg-top-menu">\n        <div class="logo-in-menu"></div>\n      </div>\n      <div class="main-logged-menu" *ngIf="_userLogged != \'none\'">\n        <div class="item-div-menu-logged">\n          <span class="item-span-menu-logged item-span-title-menu-logged">Olá {{ usr_user }}!</span>\n          <span class="item-span-menu-logged det-login">{{ usr_email }}</span>\n          <span class="item-span-menu-logged det-login">{{ usr_profile }}</span>\n        </div>\n        <div menuClose class="item-div-menu-logged" (click)="exitMyApp()">\n          <ion-icon icon-left name="log-out" class="icons-menu-logged"></ion-icon>\n        </div>\n      </div>\n      <div class="main-list-menu">\n        <div menuClose class="item-div-menu" *ngIf="usr_type == 1 || usr_type == 2" (click)="schedulePage()">\n          <ion-icon icon-left name="calendar" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Agendamentos</span>\n        </div>\n        <div menuClose class="item-div-menu" *ngIf="usr_type == 2">\n          <ion-icon icon-left name="calendar" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Visitas em Andamento</span>\n        </div>\n        <!-- <div menuClose class="item-div-menu" (click)="contactPage()">\n          <ion-icon icon-left name="call" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Fale Conosco</span>\n        </div> -->\n        <div menuClose *ngIf="_userLogged == \'none\'" class="item-div-menu" (click)=\'signinPage("Entrar como Proprietário", 3);\'>\n          <ion-icon icon-left name="person" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Entrar como Proprietário</span>\n        </div>\n        <div menuClose *ngIf="_userLogged == \'none\'" class="item-div-menu" (click)=\'signinPage("Entrar como Morador", 1);\'>\n          <ion-icon icon-left name="person-add" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Entrar como Morador</span>\n        </div>\n        <div menuClose *ngIf="_userLogged == \'none\'" class="item-div-menu" (click)=\'signinPage("Entrar como Corretor", 2);\'>\n          <ion-icon icon-left name="people" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Entrar como Corretor</span>\n        </div>\n        <div menuClose *ngIf="_userLogged == \'none\'" class="item-div-menu" (click)=\'signinPage("Entrar como Imobiliária", 4);\'>\n          <ion-icon icon-left name="people" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Entrar como Imobiliária</span>\n        </div>\n       <!--  <div menuClose class="item-div-menu" (click)="rateApp()">\n          <ion-icon icon-left name="star" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Avalie o App</span>\n        </div> -->\n        <div menuClose class="item-div-menu" (click)="termsPage()">\n          <ion-icon icon-left name="clipboard" class="icons-menu"></ion-icon>\n          <span class="item-span-menu">Termos de Uso</span>\n        </div>\n      </div>\n      <div class="bg-bottom-menu"></div>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav id="nav" #myContent [root]="rootPage"></ion-nav>\n\n<div *ngIf="_showFilter" class="filter-options">\n    <div class="bg-filter">\n        <div class="find-field-custom">\n            <form [formGroup]="form" (submit)="loginEmail()">\n                <ion-list radio-group no-lines>\n                    <ion-item class="nolines">\n                        <ion-label class="nolines" stacked></ion-label>\n                        <ion-input type="text" placeholder="Buscar Endereço ou Imóvel" name="name" formControlName="name"></ion-input>\n                    </ion-item>\n                    <ion-icon (click)="showFilter()" class="showpin" name="pin" color="cinza" ></ion-icon>    \n                </ion-list>\n            </form>\n          </div>\n    </div>\n</div>\n\n<ion-content padding class="gray menuios" (ionScroll)="scrolling($event)">\n\n  <!-- USER TAB (USUARIO) [0-1] -->\n  <div *ngIf="_userProfile == 0 || _userProfile == 1">\n      <div class="main-content-home">\n        <div class="fixed-content-home">\n            <div class="block-searchbar">\n                <div class="find-field">\n                  <div class="autocomplete">\n                    <div (click)="showFilter()" class="pin-icon-input"></div>\n                    <ion-searchbar\n                      [(ngModel)]="input_search"\n                      (ionInput)="search_location()"\n                      (ionBlur)="removeFocus()"\n                      (ionCancel)="onCancel()"\n                      placeholder="Buscar endereço"\n                      debounce=500>\n                    </ion-searchbar>\n                    <ion-list>\n                      <ion-item *ngFor="let location of locations_searched" (click)="neighboorPage(location)">\n                        <ion-icon name="pin" item-left></ion-icon>\n                        {{location.neighboor}}, {{location.city}}\n                      </ion-item>\n                    </ion-list>\n                  </div>\n                </div>\n                <div class="block-actions">\n                    <div class="action-buttons">\n                      <div class="qrcode" (click)="scanImage();"><div class="title-action">QR CODE</div></div>\n                      <div class="favourites" (click)="favouritePage()"><div class="title-action">FAVORITOS</div></div>\n                      <div class="near" (click)="discoverPage(17)"><div class="title-action">PRÓXIMOS</div></div>\n                    </div>\n                </div> \n            </div>\n            <div class="start-scroll"></div>\n        </div>\n        <div class="scroll-content">\n            <div class="block-suggestions">\n                <div class="suggestions">\n                  <h4 class="suggestions-h4">Sugestões Imobi</h4>\n                  <div class="listprops">\n                    <div *ngFor="let pro of ARR_ITEMS" class="thumb-content" (click)="openProperty(pro.proid);">\n                      <div class="img-thumb" [style.background-image]="\'url(\' + pro.urlimage + \')\'"></div>\n                      <div class="category"> {{ pro.alias }}</div>\n                        <div class="thumb-details">\n                          <div class="location"> {{ pro.neighboor }}</div>\n                          <div class="modality">{{ pro.modality }}</div>\n                          <div class="price">R$ {{ pro.price }}</div>\n                          <div class="group-icons">\n                            <div class="icons">\n                              <div class="area"><div class="icon-home-h"></div></div>\n                              <div class="measure">{{ pro.area }} m²</div>\n                            </div>\n                            <div class="icons">\n                              <div class="area"><div class="icon-home-b"></div></div>\n                              <div class="measure">{{ pro.rooms }}</div>\n                            </div>\n                            <div class="icons">\n                              <div class="area"><div [class]="pro.icons"></div></div>\n                              <div class="measure">{{ pro.types }}</div>\n                            </div>\n                          </div> \n                        </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="block-map">\n                <div class="map-content">\n                  <h4 class="suggestions-h4">Descubra</h4>\n                    <!-- <div class="subtitles-map">\n                      <div class="sub-pin" (click)="discover()"><div class="img-pin"></div>Imóveis</div>\n                      <div class="sub-pin" (click)="discover()"><div class="img-bro"></div>Corretores</div>\n                    </div> -->\n                    <div #map id="map"></div>\n                </div>\n            </div>\n        </div>\n      </div> \n    </div>\n\n    <!-- BROKER TAB (CORRETOR) [2] -->\n    <div *ngIf="_userProfile == 2" class="home-broker">\n      <div class="fixed-content-home">\n          <div class="enable-broker">\n              <div class="bg-toggle"></div>\n              <div class="lbl_toggle animated fadeIn" (click)="enableBroker()">{{ lblToggle }}</div>\n              <div *ngIf="_brokerOffline" class="toggle-off" (click)="enableBroker()">\n                <div class="icon-toggle-off"></div>\n              </div>\n              <div *ngIf="!_brokerOffline" class="toggle-on" (click)="enableBroker()">\n                <div class="icon-toggle-on"></div>\n              </div>\n            </div>\n            <div class="tabs-broker">\n              <div id="tab_client" class="tab-item-owner tab-active" (click)="openTab(0)">CLIENTES</div>\n              <div id="tab_ads" class="tab-item-owner" (click)="openTab(2)">ANÚNCIOS</div>\n              <div class="tabs-content-broker">\n                <div class="clients-broker animated fadeIn" *ngIf="_tabNum == 0">\n                  \n\n                  <div class="client-info" (swipe)="closeDeal(1)">\n                    <div class="img-client"></div>\n                    <div class="client-data">\n                      <strong>FERNANDA REIS</strong><br>\n                      Visitou o imóvel C25-ML28<br>\n                      fernanda_2@gmail.com<br>\n                      +55 11 98765-1234\n                    </div>\n                  </div>\n\n\n                    <div id="deal-1" class="deal-client animated bounceInRight hide-deal">Fechar<br><br><strong>X</strong></div>\n                </div>          \n      \n                <div class="ads-broker animated fadeIn" *ngIf="_tabNum == 2">                \n                  <div *ngFor="let imv of ARR_PROPERTY_IMV" >\n                    <div class="listprops2" (click)="openProperty(imv.proid);">\n                      <img src="{{ imv.urlimage }}" class="img-property"/>\n                      <div class="prop-cat">{{ imv.alias }}</div>\n                      <div class="info">\n                        <div class="prop-location">{{ imv.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ imv.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ imv.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div [class]="imv.icons"></div></div>\n                            <div class="measure">{{ imv.types }}</div>\n                          </div>\n                        </div>\n                        <!-- <div class="modality2">{{ imv.modality }}</div> -->\n                        <div class="price2">R$ {{ imv.price }} </div>\n                      </div>\n                    </div>\n                  </div>             \n                </div>          \n              </div>\n              <div class="schedule-broker animated fadeIn">\n                <div class="schedule-date">\n                  <div class="schedule-data-info-title">AGENDA DO DIA</div>\n                  <div class="schedule-data-info">{{currentWeekDay}}, {{day}} de {{monthName}} de {{year}}</div>\n                </div>\n\n                <div class="content-schedule">\n\n                  <div class="schedule-info">\n                    <div class="schedule-hour-info">19:15</div>\n                    <div class="check-schedule"></div>\n                    <div class="schedule-client-info"><strong>Cliente: Inacio Lisboa<br>Visita Imóvel: </strong>C76-ML28 - Rua Junior Baptista, 1020 - São Bernando do Campo / SP</div>\n                  </div>\n                            \n                </div>\n              </div>\n            </div>\n      </div> \n    </div>\n\n    <!-- OWNER TAB (PROPRIETARIO) -->\n    <div *ngIf="_userProfile == 3" class="home-owner">\n      <div class="toggle-owner">\n        <div id="ot_0" class="toggle-property toggle-active" (click)="ownerTab(0)">\n          <div class="ico-toggle-property"></div>\n          <div class="toggle-num-property">{{ propertyLength }}</div>\n          <div class="toggle-lbl-property">imóveis</div>\n        </div>\n        <div id="ot_1" class="toggle-schedule" (click)="ownerTab(1)">\n          <div class="ico-toggle-schedule"></div>\n          <div class="toggle-num-schedule">0</div>\n          <div class="toggle-lbl-schedule">agendamentos</div>\n        </div>\n      </div>\n      <div class="tabs-owner" *ngIf="_ownerTab == 0">\n        <div id="tab_onair" class="tab-item-owner tab-active" (click)="openTab(3)">NO AR</div>\n        <div id="tab_offline" class="tab-item-owner" (click)="openTab(4)">OFFLINE</div>\n        <div class="tabs-content">\n          <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 3">\n            <div *ngFor="let imv of ARR_PROPERTIES_OWNER_ONLINE" >\n              <div class="listprops2" (click)="openProperty(imv.proid);">\n                <img src="{{ imv.urlimage }}" class="img-property"/>\n                <div class="prop-cat">{{ imv.alias }}</div>\n                <div class="info">\n                  <div class="prop-location">{{ imv.neighboor }}</div>\n                  <div class="group-icons bottom">\n                    <div class="icons">\n                      <div class="area"><div class="icon-home-h"></div></div>\n                      <div class="measure">{{ imv.area }} m²</div>\n                    </div>\n                    <div class="icons">\n                      <div class="area"><div class="icon-home-b"></div></div>\n                      <div class="measure">{{ imv.rooms }}</div>\n                    </div>\n                    <div class="icons">\n                      <div class="area"><div [class]="imv.icons"></div></div>\n                      <div class="measure">{{ imv.types }}</div>\n                    </div>\n                  </div>\n                  <!-- <div class="modality2">{{ imv.modality }}</div> -->\n                  <div class="price2">R$ {{ imv.price }} </div>\n                </div>\n              </div>\n            </div>        \n          </div>\n          <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 4">\n            <div *ngFor="let imv of ARR_PROPERTIES_OWNER_OFFLINE" >\n              <div class="listprops2" (click)="openProperty(imv.proid);">\n                <div class="action-offline">\n                  <button class="bt" type="button" (click)="addProperty(imv, true)" ion-button>REVISAR E ATIVAR</button>\n                  <div class="title-offline">Anúncio Recusado</div>\n                  <div class="descr-offline">As imagens estao identicas. Favor atualizar as fotos.</div>\n                </div>\n                <img src="{{ imv.urlimage }}" class="img-property"/>\n                <div class="prop-cat">{{ imv.alias }}</div>\n                <div class="info">\n                  <div class="prop-location">{{ imv.neighboor }}</div>\n                  <div class="group-icons bottom">\n                    <div class="icons">\n                      <div class="area"><div class="icon-home-h"></div></div>\n                      <div class="measure">{{ imv.area }} m²</div>\n                    </div>\n                    <div class="icons">\n                      <div class="area"><div class="icon-home-b"></div></div>\n                      <div class="measure">{{ imv.rooms }}</div>\n                    </div>\n                    <div class="icons">\n                      <div class="area"><div [class]="imv.icons"></div></div>\n                      <div class="measure">{{ imv.types }}</div>\n                    </div>\n                  </div>\n                  <div class="price2">R$ {{ imv.price }} </div>\n                </div>\n              </div>\n            </div> \n          </div>\n        </div>\n      </div> \n\n\n\n      <div class="tabs-owner" *ngIf="_ownerTab == 1">\n        <div id="tab_visits" class="tab-item-owner tab-active" (click)="openTab(5)">EM ANDAMENTO</div>\n        <div id="tab_ended" class="tab-item-owner" (click)="openTab(6)">FINALIZADOS</div>\n        <div class="tabs-content" style="height: calc(100% + 15px);display: flex; justify-content: center;">\n          <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 5">\n            <div class="ot-listprops">\n              <div class="ot-img-schedule"><div class="ot-status-visit">Visita Confirmada</div></div>\n              <div class="ot-prop-cat">Casa</div>\n              <div class="ot-info">\n                <div class="ot-prop-location"> VILA MARIANA</div>\n                <div class="group-icons bottom">\n                  <div class="icons">\n                    <div class="area"><div class="icon-home-h"></div></div>\n                    <div class="measure">123 m²</div>\n                  </div>\n                  <div class="icons">\n                    <div class="area"><div class="icon-home-b"></div></div>\n                    <div class="measure">456</div>\n                  </div>\n                  <div class="icons">\n                    <div class="area"><div class="icon-home-p"></div></div>\n                    <div class="measure">789</div>\n                  </div>\n                </div>\n                <!-- <div class="ot-modality">Aluguel</div> -->                  \n                <div class="ot-price">R$ 1.800</div>\n              </div>\n              <div class="ot-info-broker">\n                <div class="ot-img-broker"></div>\n                <div class="ot-name-broker"><strong>CORRETOR</strong><br>Daniel Triboni</div>\n                <div class="ot-h-line"></div>\n                <div class="ot-v-line"></div>\n                <div class="ot-day">15</div>\n                <div class="ot-month">MAI</div>\n                <div class="ot-hour">10:30</div>\n              </div>\n            </div>\n          </div>\n          <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 4">\n            <div *ngFor="let imv of ARR_PROPERTY_OFF_IMV">\n              <div class="listprops2" (click)="openProperty(imv.proid);">\n                <div class="action-offline">\n                  <button class="bt" type="button" (click)="addProperty(imv, true)" ion-button>REVISAR E ATIVAR</button>\n                  <div class="title-offline">Anúncio Recusado</div>\n                  <div class="descr-offline">As imagens estao identicas. Favor atualizar as fotos.</div>\n                </div>\n                <img src="{{ imv.urlimage }}" class="img-property"/>\n                <div class="prop-cat">{{ imv.alias }}</div>\n                <div class="info">\n                  <div class="prop-location">{{ imv.neighboor }}</div>\n                  <div class="group-icons bottom">\n                    <div class="icons">\n                      <div class="area"><div class="icon-home-h"></div></div>\n                      <div class="measure">{{ imv.area }} m²</div>\n                    </div>\n                    <div class="icons">\n                      <div class="area"><div class="icon-home-b"></div></div>\n                      <div class="measure">{{ imv.rooms }}</div>\n                    </div>\n                    <div class="icons">\n                      <div class="area"><div [class]="imv.icons"></div></div>\n                      <div class="measure">{{ imv.types }}</div>\n                    </div>\n                  </div>\n                  <div class="price2">R$ {{ imv.price }} </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div> \n    </div>\n\n\n    <!-- REAL ESTATE TAB (IMOBILIARIA) [4] -->\n    <div *ngIf="_userProfile == 4" class="home-owner">\n        <div class="toggle-realestate">\n          <div id="rt_0" class="toggle-property" (click)="reTab(0)">\n            <div class="ico-toggle-broker"></div>\n            <div class="toggle-num-property">0</div>\n            <div class="toggle-lbl-property">corretores</div>\n          </div>\n          <div id="rt_1" class="toggle-schedule" (click)="reTab(1)">\n            <div class="ico-toggle-schedule"></div>\n            <div class="toggle-num-schedule">0</div>\n            <div class="toggle-lbl-schedule">agendamentos</div>\n          </div>\n        </div> \n        <div class="toggle-realestate">\n          <div id="rt_2" class="toggle-property toggle-active" (click)="reTab(2)">\n            <div class="ico-toggle-property"></div>\n            <div class="toggle-num-property">0</div>\n            <div class="toggle-lbl-property">imóveis</div>\n          </div>\n          <div id="rt_3" class="toggle-schedule" (click)="reTab(3)">\n            <div class="ico-toggle-star"></div>\n            <div class="toggle-num-schedule">0</div>\n            <div class="toggle-lbl-schedule">leads</div>\n          </div>\n        </div>\n  \n  \n          <div class="tabs-re" *ngIf="_reTab == 0">\n              <div id="tab_re" class="tab-item-owner tab-active" (click)="openTab(9)">IMOBILIÁRIA</div>\n              <div id="tab_im" class="tab-item-owner" (click)="openTab(10)">PARCEIROS</div>\n              <div class="tabs-content" style="height: calc(100% + 15px);display: flex; justify-content: center;" >\n\n\n                  <div class="clients-broker animated fadeIn" *ngIf="_tabNum == 9">\n                      <div class="client-info" (swipe)="closeDeal(1)">\n                          <div class="img-client"></div>\n                          <div class="client-data">\n                              <strong>FERNANDA REIS</strong><br>\n                              fernanda_2@gmail.com<br>\n                              +55 11 98765-1234\n                          </div>\n                        </div>\n                      \n                       \n                    </div>\n\n                    <div class="clients-broker animated fadeIn" *ngIf="_tabNum == 10">\n                        <div class="client-info" (swipe)="closeDeal(1)">\n                            <div class="img-client"></div>\n                            <div class="client-data">\n                                <strong>FERNANDA REIS</strong><br>\n                                fernanda_2@gmail.com<br>\n                                +55 11 98765-1234\n                            </div>\n                          </div>\n                         \n\n                         \n                      </div>\n\n              </div>\n          </div>\n          \n\n          <div class="tabs-re" *ngIf="_reTab == 3">\n              <div id="tab_re" class="tab-item-re tab-active" (click)="openTab(13)">NOVOS LEADS</div>\n              <div class="tabs-content" style="height: calc(100% + 15px);display: flex; justify-content: center;">\n\n                  <div class="clients-broker animated fadeIn" *ngIf="_tabNum == 13">\n                      <div class="client-info" (swipe)="closeDeal(1)">\n                          <div class="img-client"></div>\n                          <div class="client-data">\n                              <strong>FERNANDA REIS</strong><br>\n                              Visitou o imóvel C25-ML28 em 20/08<br>\n                              fernanda_2@gmail.com<br>\n                              +55 11 98765-1234\n                          </div>\n                        </div>\n                       \n                       \n                    </div>\n\n                </div>\n          </div>\n          \n          <div class="tabs-re" *ngIf="_reTab == 1">\n            <div id="tab_re" class="tab-item-owner tab-active" (click)="openTab(11)">EM ANDAMENTO</div>\n            <div id="tab_im" class="tab-item-owner" (click)="openTab(12)">FINALIZADOS</div>\n            <div class="tabs-content" style="height: calc(100% + 15px);display: flex; justify-content: center;">\n              <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 11">\n                <div *ngFor="let age of ARR_ITEMS">\n                  <div class="ot-listprops" (click)="openProperty(age.proid);">\n                      <div class="ot-img-schedule"><div class="ot-status-visit">Visita Confirmada</div></div>\n                      <div class="ot-prop-cat">{{ age.alias }}</div>\n                      <div class="ot-info">\n                        <div class="ot-prop-location"> {{ age.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ age.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ age.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-p"></div></div>\n                            <div class="measure">{{ age.type }}</div>\n                          </div>\n                        </div>\n                        <!-- <div class="ot-modality">Aluguel</div> -->                  \n                        <div class="ot-price">R$ {{ age.price }}</div>\n                      </div>\n                      <div class="ot-info-broker">\n                        <div class="ot-img-broker"></div>\n                        <div class="ot-name-broker"><strong>CORRETOR</strong><br>{{ age.broker }}</div>\n                        <div class="ot-h-line"></div>\n                        <div class="ot-v-line"></div>\n                        <div class="ot-day">{{ age.day_visit }}</div>\n                        <div class="ot-month">{{ age.month_visit }}</div>\n                        <div class="ot-hour">{{ age.hour_visit }}</div>\n                      </div>\n                    </div>\n                  </div>     \n                </div>\n\n                <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 12">\n                  <div *ngFor="let age of ARR_ITEMS">\n                    <div class="ot-listprops" (click)="openProperty(age.proid);">\n                      <div class="ot-img-schedule"><div class="ot-status-visit">Visita Confirmada</div></div>\n                      <div class="ot-prop-cat">{{ age.alias }}</div>\n                      <div class="ot-info">\n                        <div class="ot-prop-location"> {{ age.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ age.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ age.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-p"></div></div>\n                            <div class="measure">{{ age.type }}</div>\n                          </div>\n                        </div>\n                        <!-- <div class="ot-modality">Aluguel</div> -->                  \n                        <div class="ot-price">R$ {{ age.price }}</div>\n                      </div>\n                      <div class="ot-info-broker">\n                        <div class="ot-img-broker"></div>\n                        <div class="ot-name-broker"><strong>CORRETOR</strong><br>{{ age.broker }}</div>\n                        <div class="ot-h-line"></div>\n                        <div class="ot-v-line"></div>\n                        <div class="ot-day">{{ age.day_visit }}</div>\n                        <div class="ot-month">{{ age.month_visit }}</div>\n                        <div class="ot-hour">{{ age.hour_visit }}</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n  \n            <div class="tabs-re" *ngIf="_reTab == 2">\n              <div id="tab_re" class="tab-item-owner tab-active" (click)="openTab(7)">IMOBILIÁRIA</div>\n              <div id="tab_im" class="tab-item-owner" (click)="openTab(8)">IMOBI</div>\n              <div class="tabs-content" style="height: calc(100% + 15px);display: flex; justify-content: center;">\n                <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 7">\n                  <div *ngFor="let imv of ARR_ITEMS">\n                    <div class="listprops2" (click)="openProperty(imv.proid);">\n                      <img src="{{ imv.urlimage }}" class="img-property"/>\n                      <div class="prop-cat">{{ imv.alias }}</div>\n                      <div class="info">\n                        <div class="prop-location">{{ imv.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ imv.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ imv.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div [class]="imv.icons"></div></div>\n                            <div class="measure">{{ imv.types }}</div>\n                          </div>\n                        </div>\n                        <!-- <div class="modality2">{{ imv.modality }}</div> -->\n                        <div class="price2">R$ {{ imv.price }} </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 8">\n                  <div *ngFor="let imv of ARR_ITEMS">\n                    <div class="listprops2" (click)="openProperty(imv.proid);">\n                      <img src="{{ imv.urlimage }}" class="img-property"/>\n                      <div class="prop-cat">{{ imv.alias }}</div>\n                      <div class="info">\n                        <div class="prop-location">{{ imv.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ imv.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ imv.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div [class]="imv.icons"></div></div>\n                            <div class="measure">{{ imv.types }}</div>\n                          </div>\n                        </div>\n                        <!-- <div class="modality2">{{ imv.modality }}</div> -->\n                        <div class="price2">R$ {{ imv.price }} </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n    \n                <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 4">\n                  <div>   \n                    <div class="listprops2" (click)="openProperty(imv.proid);">\n                      <div class="action-offline">\n                        <button class="bt" type="button" (click)="addProperty(imv, true)" ion-button>REVISAR E ATIVAR</button>\n                        <div class="title-offline">Anúncio Recusado</div>\n                        <div class="descr-offline">As imagens estao identicas. Favor atualizar as fotos.</div>\n                      </div>\n                      <img src="{{ imv.urlimage }}" class="img-property"/>\n                      <div class="prop-cat">{{ imv.alias }}</div>\n                      <div class="info">\n                        <div class="prop-location">{{ imv.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ imv.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ imv.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div [class]="imv.icons"></div></div>\n                            <div class="measure">{{ imv.types }}</div>\n                          </div>\n                        </div>\n                        <div class="price2">R$ {{ imv.price }} </div>\n                      </div>\n                    </div>\n                  </div> \n                </div>\n              </div>\n            </div> \n  \n            <div class="tabs-owner" *ngIf="_ownerTab == 1">\n              <div id="tab_visits" class="tab-item-owner tab-active" (click)="openTab(5)">EM ANDAMENTO</div>\n              <div id="tab_ended" class="tab-item-owner" (click)="openTab(6)">FINALIZADOS</div>\n              <div class="tabs-content">\n                <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 5">\n                  <div *ngFor="let age of ARR_ITEMS" (click)="openProperty(age.proid);">\n                    <div class="ot-listprops">\n                      <div class="ot-img-schedule"><div class="ot-status-visit">Visita Confirmada</div></div>\n                      <div class="ot-prop-cat">{{ age.alias }}</div>\n                      <div class="ot-info">\n                        <div class="ot-prop-location"> {{ age.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ age.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ age.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-p"></div></div>\n                            <div class="measure">{{ age.type }}</div>\n                          </div>\n                        </div>\n                        <!-- <div class="ot-modality">Aluguel</div> -->                  \n                        <div class="ot-price">R$ {{ age.price }}</div>\n                      </div>\n                      <div class="ot-info-broker">\n                        <div class="ot-img-broker"></div>\n                        <div class="ot-name-broker"><strong>CORRETOR</strong><br>{{ age.broker }}</div>\n                        <div class="ot-h-line"></div>\n                        <div class="ot-v-line"></div>\n                        <div class="ot-day">{{ age.day_visit }}</div>\n                        <div class="ot-month">{{ age.month_visit }}</div>\n                        <div class="ot-hour">{{ age.hour_visit }}</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n      \n                <div class="ads-owner animated fadeIn" *ngIf="_tabNum == 4">\n                  <div>\n                    <div class="listprops2" (click)="openProperty(imv.proid);">\n                      <div class="action-offline">\n                        <button class="bt" type="button" (click)="addProperty(imv, true)" ion-button>REVISAR E ATIVAR</button>\n                        <div class="title-offline">Anúncio Recusado</div>\n                        <div class="descr-offline">As imagens estao identicas. Favor atualizar as fotos.</div>\n                      </div>\n                      <img src="{{ imv.urlimage }}" class="img-property"/>\n                      <div class="prop-cat">{{ imv.alias }}</div>\n                      <div class="info">\n                        <div class="prop-location">{{ imv.neighboor }}</div>\n                        <div class="group-icons bottom">\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-h"></div></div>\n                            <div class="measure">{{ imv.area }} m²</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div class="icon-home-b"></div></div>\n                            <div class="measure">{{ imv.rooms }}</div>\n                          </div>\n                          <div class="icons">\n                            <div class="area"><div [class]="imv.icons"></div></div>\n                            <div class="measure">{{ imv.types }}</div>\n                          </div>\n                        </div>\n                        <div class="price2">R$ {{ imv.price }} </div>\n                      </div>\n                    </div>\n                  </div>   \n                </div>\n              </div>\n            </div>  \n      </div>\n \n</ion-content>\n\n<div class="add-property" *ngIf="_userProfile != 0 && _userProfile != 1" (click)="addProperty();"></div>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_18__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_brokers__["a" /* BrokersProvider */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_12__providers_property__["a" /* PropertyProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_schedule__["a" /* ScheduleProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_zbar__["a" /* ZBar */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// util.ts


var TokenProvider = /** @class */ (function () {
    function TokenProvider() {
    }
    TokenProvider.prototype.prepareHeader = function (headers) {
        var val = localStorage.getItem('login-info');
        if (val != null) {
            var key = JSON.parse(val);
            this.api_key = key.token;
        }
        else {
            this.api_key = "4j3qbuO5Da1nDzOINuLmfN0swGmAnUzugtbo/XhD1jw=";
        }
        headers = headers || new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('imobi-api-key', this.api_key);
        return {
            headers: headers
        };
    };
    TokenProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], TokenProvider);
    return TokenProvider;
}());

//# sourceMappingURL=token.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup2__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_signup__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, helper, formBuilder, signup) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.formBuilder = formBuilder;
        this.signup = signup;
        this.submitAttempt = false;
        this._eye = 'eye';
        this._type = 'password';
        this.profile = "Novo Usuário";
        this.currentMask = { mask: '00000000000000', len: 14 };
        this.form = this.formBuilder.group({
            'name': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'email': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'pwd': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9_ ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'cpwd': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9_ ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.equalto('pwd')])],
            'tel': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'niver': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10)])],
            'cpfcnpj': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([this.checkCPFCNPJ("cpfcnpj"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    SignupPage.prototype.ionViewWillEnter = function () {
        this.profile = this.navParams.get('profile');
        this.type = this.navParams.get('type');
    };
    SignupPage.prototype.equalto = function (field_name) {
        return function (control) {
            var input = control.value;
            var isValid = control.root.value[field_name] == input;
            if (!isValid)
                return { 'equalTo': { isValid: isValid } };
            else
                return null;
        };
    };
    SignupPage.prototype.checkCPFCNPJ = function (field_name) {
        var _this = this;
        return function (control) {
            var cpfcnpj = control.root.value[field_name];
            var input = control.value;
            cpfcnpj = input;
            if (cpfcnpj != undefined) {
                cpfcnpj = cpfcnpj.replace(/[^\d]+/g, '');
                if (cpfcnpj.length == 11) {
                    if (_this.helper.validCPF(cpfcnpj)) {
                        _this.currentMask = { mask: '000.000.000-00', len: 14 };
                        return null;
                    }
                    else {
                        return { 'checkCPF': false };
                    }
                }
                if (cpfcnpj.length == 14) {
                    if (_this.helper.validCNPJ(cpfcnpj)) {
                        _this.currentMask = { mask: '00.000.000/0000-00', len: 18 };
                        return null;
                    }
                    else {
                        return { 'checkCNPJ': false };
                    }
                }
                if (cpfcnpj.length != 11 && cpfcnpj.length != 14) {
                    _this.currentMask = { mask: '00000000000000', len: 14 };
                    return { 'checkCPFCNPJ': false };
                }
            }
            else {
                _this.currentMask = { mask: '00000000000000', len: 14 };
                return null;
            }
        };
    };
    SignupPage.prototype.isRequired = function () {
        var frm = this;
        if (this.type == 1 || this.type == 3) {
            frm.form.controls["cpfcnpj"].setValue("00000000191");
        }
    };
    SignupPage.prototype.submitSignup = function () {
        var _this = this;
        this.isRequired();
        this.submitAttempt = true;
        if (this.form.valid) {
            if (this.type == 3) {
                this.helper.showLoading('Salvando Cadastro');
                this.signup.save(this.form.value).subscribe(function (res) {
                    _this.helper.hideLoading();
                    _this.helper.presentToast("Imobiliária cadastrada com sucesso! Aguarde contato da Imobi.");
                }, function (error) {
                    _this.helper.hideLoading();
                    _this.helper.presentToast("Ocorreu um erro ao salvar seu cadastro! " + JSON.stringify(error));
                });
                setTimeout(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                }, 2000);
            }
            else {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup2__["a" /* Signup2Page */], { type: this.type, profile: this.profile, register: this.form.value });
            }
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/signup/signup.html"*/'<ion-header>\n    <ion-navbar >\n      <ion-title>{{ profile }}</ion-title>\n    </ion-navbar> \n  </ion-header>\n\n<ion-content  padding class="masters">\n\n    <div class="footer-frm">\n        <div class="numbers">\n            <div class="bg-num">\n                <div class="num">1</div>\n                <div *ngIf="type != 4" class="num-out">2</div>\n            </div>\n        </div>\n        <form [formGroup]="form">\n            <ion-list radio-group no-lines>\n                <ion-item class="nolines">\n                    <ion-label *ngIf="form.controls.name.valid || (!form.controls.name.dirty && !submitAttempt)" color="light" stacked>Informe seu Nome:</ion-label>\n                    <ion-label *ngIf="!form.controls.name.valid && (form.controls.name.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe seu nome!</strong></ion-label>\n                    <ion-input type="text" placeholder="ex: Danielly Souza" name="name" formControlName="name"></ion-input>\n                </ion-item>\n                <ion-item class="nolines">\n                    <ion-label *ngIf="form.controls.email.valid || (!form.controls.email.dirty && !submitAttempt)" color="light" stacked>Informe seu Email:</ion-label>\n                    <ion-label *ngIf="!form.controls.email.valid && (form.controls.email.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe seu email!</strong></ion-label>\n                    <ion-input type="email" placeholder="ex: seu@email.com.br" name="email" formControlName="email"></ion-input>\n                </ion-item>\n                <ion-item class="nolines">\n                    <ion-label *ngIf="form.controls.pwd.valid || (!form.controls.pwd.dirty && !submitAttempt)" color="light" stacked>Senha:</ion-label>\n                    <ion-label *ngIf="!form.controls.pwd.valid && (form.controls.pwd.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe uma senha válida!</strong></ion-label>\n                    <ion-input maxlength="8" formControlName="pwd" type="password" placeholder="De 6 a 8 caracteres"></ion-input>\n                </ion-item>\n                <ion-item class="nolines">\n                    <ion-label *ngIf="form.controls.cpwd.valid || (!form.controls.cpwd.dirty && !submitAttempt)" color="light" stacked>Confirme a Senha:</ion-label>\n                    <ion-label *ngIf="!form.controls.cpwd.valid && (form.controls.cpwd.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> As senhas não conferem!</strong></ion-label>\n                    <ion-input maxlength="8" formControlName="cpwd" type="password" placeholder="De 6 a 8 caracteres"></ion-input>\n                </ion-item>\n               <ion-item class="nolines" *ngIf="type != 4">\n                    <ion-label *ngIf="form.controls.tel.valid || (!form.controls.tel.dirty && !submitAttempt)" color="light" stacked>Informe seu Telefone:</ion-label>\n                    <ion-label *ngIf="!form.controls.tel.valid && (form.controls.tel.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe seu telefone!</strong></ion-label>\n                    <ion-input type="tel" maxlength="15" [brmasker]="{phone: true}" placeholder="ex: (11) 93456-0000" name="tel" formControlName="tel"></ion-input>\n                </ion-item>\n                <ion-item class="nolines" *ngIf="type == 4">\n                    <ion-label *ngIf="form.controls.tel.valid || (!form.controls.tel.dirty && !submitAttempt)" color="light" stacked>Telefone para Contato da Imobi:</ion-label>\n                    <ion-label *ngIf="!form.controls.tel.valid && (form.controls.tel.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe um telefone de contato!</strong></ion-label>\n                    <ion-input type="tel" maxlength="15" [brmasker]="{phone: true}" placeholder="ex: (11) 93456-0000" name="tel" formControlName="tel"></ion-input>\n                </ion-item>\n                <ion-item class="nolines">\n                    <ion-label *ngIf="form.controls.niver.valid || (!form.controls.niver.dirty && !submitAttempt)" color="light" stacked>Sua Data de Nascimento:</ion-label>\n                    <ion-label *ngIf="!form.controls.niver.valid && (form.controls.niver.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe seu nascimento!</strong></ion-label>\n                    <ion-input type="tel" maxlength="10" [brmasker]="{mask:\'00/00/0000\', len:10}" placeholder="ex: 14/01/1981" name="niver" formControlName="niver"></ion-input>\n                </ion-item>\n                <ion-item class="nolines" *ngIf="type == 2">\n                    <ion-label *ngIf="form.controls.cpfcnpj.valid || (!form.controls.cpfcnpj.dirty && !submitAttempt)" color="light" stacked>Informe seu CPF:</ion-label>\n                    <ion-label *ngIf="!form.controls.cpfcnpj.valid && (form.controls.cpfcnpj.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe seu CPF corretamente!</strong></ion-label>\n                    <ion-input type="tel" maxlength="18" [brmasker]="this.currentMask" placeholder="ex: 543.765.987-10" name="cpfcnpj" formControlName="cpfcnpj"></ion-input>\n                </ion-item>\n                <ion-item class="nolines" *ngIf="type == 4">\n                    <ion-label *ngIf="form.controls.cpfcnpj.valid || (!form.controls.cpfcnpj.dirty && !submitAttempt)" color="light" stacked>Informe o CNPJ da Imobiliária:</ion-label>\n                    <ion-label *ngIf="!form.controls.cpfcnpj.valid && (form.controls.cpfcnpj.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o CNPJ corretamente!</strong></ion-label>\n                    <ion-input type="tel" maxlength="18" [brmasker]="this.currentMask" placeholder="ex: 01.234.567/0001-89" name="cpfcnpj" formControlName="cpfcnpj"></ion-input>\n                </ion-item>\n            </ion-list>\n        </form>\n    </div>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar color="azul">\n       <!--  <button id="btback" ion-button block icon-left type="submit">\n            <ion-icon name="arrow-dropleft-circle"></ion-icon>\n            VOLTAR\n        </button> -->\n        <button id="btok" ion-button block icon-right type="button" (click)="submitSignup()">\n            AVANÇAR\n            <ion-icon name="arrow-dropright-circle"></ion-icon>\n        </button>\n    </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_6__providers_signup__["a" /* SignupProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signup2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_signup__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_categories__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Signup2Page = /** @class */ (function () {
    function Signup2Page(navCtrl, navParams, helper, formBuilder, camera, sanitizer, signup, categs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.sanitizer = sanitizer;
        this.signup = signup;
        this.categs = categs;
        this._eye = 'eye';
        this._type = 'password';
        this.submitAttempt = false;
        this.type = 1;
        this.profile = "Usuário";
        this.currentMask = { mask: '00000000000000', len: 14 };
        this.categories = [];
        this.lowPrice = 0;
        this.highPrice = 0;
        this.knobValues = {
            upper: 500000,
            lower: 150000
        };
        this.finalRange = "0|0";
        this.form = this.formBuilder.group({
            'civistate': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'kids': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'pets': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'cityb': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'creci': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'cnpj': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([this.checkCNPJ("cnpj"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'exclusive': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'wishcat': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'wishmod': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'rangeprice': '',
            'type': '',
            'selfie': '',
            'photo': ''
        });
        this.lowPrice = this.knobValues.lower;
        this.highPrice = this.knobValues.upper;
        this.finalRange = this.lowPrice + "|" + this.highPrice;
    }
    Signup2Page.prototype.ionViewWillEnter = function () {
        this.profile = this.navParams.get('profile');
        this.type = this.navParams.get('type');
        this.register = this.navParams.get('register');
        if (this.type != 2) {
            this.loadCategs();
        }
    };
    Signup2Page.prototype.loadCategs = function () {
        var _this = this;
        this.helper.showLoading('Aguarde');
        this.categs.get()
            .subscribe(function (data) {
            _this.categories = data;
            _this.helper.hideLoading();
        }, function (error) {
            _this.helper.hideLoading();
            _this.helper.presentToast("Ocorreu um erro ao obter os imóveis!");
        });
    };
    Signup2Page.prototype.setKnobs = function (knob) {
        this.lowPrice = knob.lower;
        this.highPrice = knob.upper;
        this.finalRange = this.lowPrice + "|" + this.highPrice;
    };
    Signup2Page.prototype.checkCNPJ = function (field_name) {
        var _this = this;
        return function (control) {
            var cpfcnpj = control.root.value[field_name];
            var input = control.value;
            cpfcnpj = input;
            if (cpfcnpj != undefined) {
                cpfcnpj = cpfcnpj.replace(/[^\d]+/g, '');
                if (cpfcnpj.length == 11) {
                    if (_this.helper.validCPF(cpfcnpj)) {
                        _this.currentMask = { mask: '000.000.000-00', len: 14 };
                        return null;
                    }
                    else {
                        return { 'checkCPF': false };
                    }
                }
                if (cpfcnpj.length == 14) {
                    if (_this.helper.validCNPJ(cpfcnpj)) {
                        _this.currentMask = { mask: '00.000.000/0000-00', len: 18 };
                        return null;
                    }
                    else {
                        return { 'checkCNPJ': false };
                    }
                }
                if (cpfcnpj.length != 11 && cpfcnpj.length != 14) {
                    _this.currentMask = { mask: '00000000000000', len: 14 };
                    return { 'checkCPFCNPJ': false };
                }
            }
            else {
                _this.currentMask = { mask: '00000000000000', len: 14 };
                return null;
            }
        };
    };
    Signup2Page.prototype.addSelfie = function () {
        var _this = this;
        var options = {
            quality: 75,
            correctOrientation: true,
            cameraDirection: 1,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64image = 'data:image/png;base64,' + imageData;
            _this.selfie = base64image;
            //save base64 to DB
        }, function (err) {
            //get err from camera
        });
    };
    Signup2Page.prototype.addPhoto = function () {
        var _this = this;
        var options = {
            quality: 75,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64image = 'data:image/png;base64,' + imageData;
            _this.photo = base64image;
            //save base64 to DB
        }, function (err) {
            //get err from camera
        });
    };
    Signup2Page.prototype.isRequired = function () {
        var frm = this;
        if (this.type != 2) {
            frm.form.controls["creci"].setValue("000000-0");
            frm.form.controls["cityb"].setValue("N/A");
            frm.form.controls["exclusive"].setValue("0");
            frm.form.controls["cnpj"].setValue("10562144000195");
        }
        else {
            frm.form.controls["kids"].setValue("0");
            frm.form.controls["pets"].setValue("0");
            frm.form.controls["civistate"].setValue("0");
            frm.form.controls["wishcat"].setValue("0");
            frm.form.controls["wishmod"].setValue("0");
            frm.form.controls["rangeprice"].setValue("0|0");
        }
    };
    Signup2Page.prototype.submitSignup = function () {
        var _this = this;
        this.isRequired();
        this.submitAttempt = true;
        if (this.form.valid) {
            this.form.controls["rangeprice"].setValue(this.finalRange);
            this.form.controls["type"].setValue(this.type);
            this.form.controls["selfie"].setValue(this.selfie);
            this.form.controls["photo"].setValue(this.photo);
            var reg = Object.assign(this.register, this.form.value);
            this.helper.showLoading('Salvando Cadastro');
            this.signup.save(reg).subscribe(function (res) {
                _this.helper.hideLoading();
                _this.helper.presentToast("Seu cadastro foi efetuado com sucesso!");
                setTimeout(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                }, 2000);
            }, function (error) {
                _this.helper.hideLoading();
                _this.helper.presentToast("Ocorreu um erro ao salvar seu cadastro! ");
                setTimeout(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                }, 2000);
            });
        }
    };
    Signup2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup2',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/signup/signup2.html"*/'<ion-header>\n        <ion-navbar >\n          <ion-title>{{ profile }}</ion-title>\n        </ion-navbar> \n      </ion-header>\n    \n    <ion-content  padding class="masters">\n        <div class="footer-frm">\n            <div class="numbers">\n                <div class="bg-num">\n                    <div class="num">1</div>\n                    <div class="num">2</div>\n                </div>\n            </div>\n            <form [formGroup]="form">\n                <ion-list radio-group no-lines>\n                    <ion-item class="nolines" *ngIf="type == 2">\n                        <ion-label color="light" stacked>Enviar Foto:</ion-label>\n                    </ion-item>\n                    <ion-item class="nolines div-photos" *ngIf="type == 2">\n                        <div class="title-photo">1 Selfie com CRECI em mãos</div>\n                        <div class="title-photo">1 foto de Perfil</div>\n                        <div class="center-circ">\n                            <div class="circ-avatar" [style.background-image]="\'url(\' + selfie + \')\'" (click)="addSelfie()"><div class="icon-edit-avatar"></div></div>\n                            <div class="circ-avatar" [style.background-image]="\'url(\' + photo + \')\'" (click)="addPhoto()"><div class="icon-edit-avatar"></div></div>\n                        </div>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type != 2 && type != 4">\n                        <ion-label color="light" stacked>Escolha uma Foto:</ion-label>\n                    </ion-item>\n                    <ion-item class="nolines div-photos" *ngIf="type != 2 && type != 4">\n                        <div class="center-circ2">\n                            <div class="circ-avatar" [style.background-image]="\'url(\' + selfie + \')\'" (click)="addSelfie()"><div class="icon-edit-avatar"></div></div>\n<!--                            <div class="circ-avatar" [style.background-image]="\'url(\' + photo + \')\'" (click)="addPhoto()"><div class="icon-edit-avatar"></div></div>\n-->                     </div>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type != 2 && type != 4">\n                        <ion-label *ngIf="form.controls.civistate.valid || (!form.controls.civistate.dirty && !submitAttempt)" color="light" stacked>Estado Civil:</ion-label>\n                        <ion-label *ngIf="!form.controls.civistate.valid && (form.controls.civistate.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Selecione uma opção!</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="ex: Solteiro, Casado" formControlName="civistate">\n                            <ion-option [selected]="isFemale" value="1">Solteiro</ion-option>\n                            <ion-option [selected]="isMale" value="2">Casado</ion-option>\n                            <ion-option [selected]="isMale" value="3">Divorciado</ion-option>\n                            <ion-option [selected]="isMale" value="4">Viúvo</ion-option>\n                        </ion-select>                   \n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type != 2 && type != 4">\n                        <ion-label *ngIf="form.controls.pets.valid || (!form.controls.pets.dirty && !submitAttempt)" color="light" stacked>Pets?</ion-label>\n                        <ion-label *ngIf="!form.controls.pets.valid && (form.controls.pets.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Você tem Pets?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="pets">\n                            <ion-option [selected]="isFemale" value="1">SIM, tenho!</ion-option>\n                            <ion-option [selected]="isMale" value="0">Sem Pets!</ion-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type != 2 && type != 4">\n                        <ion-label *ngIf="form.controls.kids.valid || (!form.controls.kids.dirty && !submitAttempt)" color="light" stacked>Filhos:</ion-label>\n                        <ion-label *ngIf="!form.controls.kids.valid && (form.controls.kids.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Você tem filhos?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="kids">\n                            <ion-option [selected]="isFemale" value="1">SIM, tenho!</ion-option>\n                            <ion-option [selected]="isMale" value="0">Sem filhos!</ion-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type != 2 && type != 4">\n                        <ion-label *ngIf="form.controls.wishmod.valid || (!form.controls.wishmod.dirty && !submitAttempt)" color="light" stacked>O que deseja?</ion-label>\n                        <ion-label *ngIf="!form.controls.wishmod.valid && (form.controls.wishmod.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Deseja alugar ou comprar?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Alugar ou Comprar" formControlName="wishmod">\n                            <ion-option [selected]="isFemale" value="1">Alugar</ion-option>\n                            <ion-option [selected]="isMale" value="2">Comprar</ion-option>\n                            <ion-option [selected]="isMale" value="3">Vender</ion-option>\n                        </ion-select>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type != 2 && type != 4">\n                        <ion-label *ngIf="form.controls.wishcat.valid || (!form.controls.wishcat.dirty && !submitAttempt)" color="light" stacked>Imóvel:</ion-label>\n                        <ion-label *ngIf="!form.controls.wishcat.valid && (form.controls.wishcat.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Qual o tipo do imóvel?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="wishcat">\n                            <ion-option *ngFor="let cat of categories" [value]="cat.catid">{{ cat.alias }}</ion-option>                           \n                        </ion-select>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type != 2 && type != 4">\n                        <ion-label color="light" stacked>Valor Aproximado:<br>{{ lowPrice | currency: \'R$\' : \'symbol\' : \'1.2-2\' : \'pt\' }} a {{ highPrice | currency: \'R$\' : \'symbol\' : \'1.2-2\' : \'pt\' }}</ion-label>\n                        <ion-range (ionChange)="setKnobs(knobValues);" dualKnobs="true" min="50000" max="2000000" [(ngModel)]="knobValues" step="50000" pin="true" color="azul" formControlName="rangeprice"></ion-range>\n                    </ion-item>\n\n                    <ion-item class="nolines" *ngIf="type == 2">\n                        <ion-label *ngIf="form.controls.exclusive.valid || (!form.controls.exclusive.dirty && !submitAttempt)" color="light" stacked>Exclusivo de Imobiliária?</ion-label>\n                        <ion-label *ngIf="!form.controls.exclusive.valid && (form.controls.exclusive.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Exclusivo de Imobiliária?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="exclusive">\n                            <ion-option [selected]="1" value="1">SIM</ion-option>\n                            <ion-option [selected]="0" value="0">NÃO</ion-option>\n                        </ion-select>\n                    </ion-item>\n                   <ion-item class="nolines" *ngIf="type == 2">\n                        <ion-label *ngIf="form.controls.cnpj.valid || (!form.controls.cnpj.dirty && !submitAttempt)" color="light" stacked>Informe CNPJ da Imobiliária:</ion-label>\n                        <ion-label *ngIf="!form.controls.cnpj.valid && (form.controls.cnpj.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o CNPJ!</strong></ion-label>\n                        <ion-input type="tel" maxlength="18" [brmasker]="this.currentMask" placeholder="ex: 54.321.0123/0001-00" name="cnpj" formControlName="cnpj"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type == 2">\n                        <ion-label *ngIf="form.controls.cityb.valid || (!form.controls.cityb.dirty && !submitAttempt)" color="light" stacked>Cidade/Estado de atuação:</ion-label>\n                        <ion-label *ngIf="!form.controls.cityb.valid && (form.controls.cityb.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe a cidade de atuação!</strong></ion-label>\n                        <ion-input type="text" maxlength="50" placeholder="ex: São Bernardo do Campo" name="cityb" formControlName="cityb"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="type == 2">\n                        <ion-label *ngIf="form.controls.creci.valid || (!form.controls.creci.dirty && !submitAttempt)" color="light" stacked>Número do CRECI:</ion-label>\n                        <ion-label *ngIf="!form.controls.creci.valid && (form.controls.creci.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o número CRECI!</strong></ion-label>\n                        <ion-input type="text" maxlength="8" [brmasker]="{mask:\'000000-0\', len:8}" placeholder="ex: 074839-X" name="creci" formControlName="creci"></ion-input>\n                    </ion-item>\n                   \n                </ion-list>\n            </form>\n        </div>\n    </ion-content>\n    \n    <ion-footer>\n        <ion-toolbar color="azul">\n           <!--  <button id="btback" ion-button block icon-left type="submit">\n                <ion-icon name="arrow-dropleft-circle"></ion-icon>\n                VOLTAR\n            </button> -->\n            <button id="btok" ion-button block icon-right type="button" (click)="submitSignup()">\n                AVANÇAR\n                <ion-icon name="arrow-dropright-circle"></ion-icon>\n            </button>\n        </ion-toolbar>\n      </ion-footer>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/signup/signup2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_7__providers_signup__["a" /* SignupProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_categories__["a" /* CategoriesProvider */]])
    ], Signup2Page);
    return Signup2Page;
}());

//# sourceMappingURL=signup2.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__msg_success_msg_success__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_waitinglist__ = __webpack_require__(377);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FormListPage = /** @class */ (function () {
    function FormListPage(navCtrl, navParams, formBuilder, loadingCtrl, provider, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.provider = provider;
        this.toast = toast;
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        this.form1 = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(emailRegex)]],
            name: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            cpf: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            cep: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            tel: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
        this.form2 = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(emailRegex)]],
            name: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            cpf: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            tel: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            endereco: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
        this.form3 = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(emailRegex)]],
            name: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            tel: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            creci: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            perfil: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            selltype: ['']
        });
        this.form4 = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(emailRegex)]],
            name: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            tel: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            endereco: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            creci: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            cnpj: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            contact: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    }
    FormListPage.prototype.ionViewWillEnter = function () {
        this.userType = this.navParams.get('type');
        if (this.userType == 1) {
            this.linkOrigin = 'Buscando um imóvel';
        }
        else if (this.userType == 2) {
            this.linkOrigin = 'Corretor';
        }
        else if (this.userType == 3) {
            this.linkOrigin = 'Proprietário';
        }
        else {
            this.linkOrigin = 'Imobiliária';
        }
    };
    FormListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FormListPage');
    };
    FormListPage.prototype.verifyPerfil = function () {
        this.perfil = this.form3.value.perfil;
    };
    FormListPage.prototype.sendForm1 = function () {
        var _this = this;
        this.provider.register(this.form1.value, 1).subscribe(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__msg_success_msg_success__["a" /* MsgSuccessPage */], { type: _this.userType });
        }, function (error) {
            //alert("Erro " + JSON.stringify(error));
            alert("Error");
        });
    };
    FormListPage.prototype.sendForm2 = function () {
        var _this = this;
        this.provider.register(this.form2.value, 2).subscribe(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__msg_success_msg_success__["a" /* MsgSuccessPage */], { type: _this.userType });
        }, function (error) {
            //alert("Erro " + JSON.stringify(error));
            alert("Error");
        });
    };
    FormListPage.prototype.sendForm3 = function () {
        var _this = this;
        this.provider.register(this.form3.value, 3).subscribe(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__msg_success_msg_success__["a" /* MsgSuccessPage */], { type: _this.userType });
        }, function (error) {
            //alert("Erro " + JSON.stringify(error));
            alert("Error");
        });
    };
    FormListPage.prototype.sendForm4 = function () {
        var _this = this;
        this.provider.register(this.form4.value, 4).subscribe(function (res) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__msg_success_msg_success__["a" /* MsgSuccessPage */], { type: _this.userType });
        }, function (error) {
            //alert("Erro " + JSON.stringify(error));
            alert("Error");
        });
    };
    FormListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-form-list',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/form-list/form-list.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding fullscreen>\n\n  <h1>Faça parte da revolução imobiliária</h1>\n  <hr>\n\n  <div role="main" id="formulario-app-7959b983e8cbce694350"></div>\n\n  <!--<div *ngIf="userType == 1">\n    <form [formGroup]="form1">\n      <ion-input type="origin" value="{{linkOrigin}}" style="display: none;"></ion-input>\n      <ion-list>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Nome completo</ion-label>\n          <ion-input formControlName="name" type="text" name="name"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>CPF</ion-label>\n          <ion-input type="text" name="cpf" formControlName="cpf" [brmasker]="{mask:\'000.000.000-00\', len:14}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>CEP</ion-label>\n          <ion-input type="text" name="cep" formControlName="cep" [brmasker]="{mask:\'00000-000\', len:9}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>E-mail</ion-label>\n          <ion-input formControlName="email" type="text" name="email"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Telefone</ion-label>\n          <ion-input type="text" formControlName="tel" name="tel" [brmasker]="{phone: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <p class="msg-spam">Utilizaremos esses dados para criar sua conta. Nada de spam.</p>\n        </ion-item>\n      </ion-list>\n      <div style="text-align: center;">\n        <button type="submit" class="btn btn-yellow" [disabled]="!form1.valid" center ion-button (click)=\'sendForm1();\'>\n          Entrar na lista de espera\n        </button>\n      </div>\n    </form>\n  </div>\n\n  <div *ngIf="userType == 3">\n    <form [formGroup]="form2">\n      <ion-input type="origin" value="{{linkOrigin}}" style="display: none;"></ion-input>\n      <ion-list>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Nome completo</ion-label>\n          <ion-input formControlName="name" type="text" name="name"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>CPF</ion-label>\n          <ion-input formControlName="cpf" type="text" name="cpf" [brmasker]="{mask:\'000.000.000-00\', len:14}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Endereço imóvel</ion-label>\n          <ion-input formControlName="endereco" type="text" name="endereco"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>E-mail</ion-label>\n          <ion-input formControlName="email" type="text" name="email"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Telefone</ion-label>\n          <ion-input formControlName="tel" type="text" name="tel" [brmasker]="{phone: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <p class="msg-spam">Utilizaremos esses dados para criar sua conta. Nada de spam.</p>\n        </ion-item>\n      </ion-list>\n      <div style="text-align: center;">\n        <button type="submit" class="btn btn-yellow" [disabled]="!form2.valid" center ion-button (click)=\'sendForm2();\'>\n          Entrar na lista de espera\n        </button>\n      </div>\n    </form>\n  </div>\n\n  <div *ngIf="userType == 2">\n    <form [formGroup]="form3">\n      <ion-input type="origin" value="{{linkOrigin}}" style="display: none;"></ion-input>\n      <ion-list>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Nome completo</ion-label>\n          <ion-input formControlName="name" type="text" name="name"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>CRECI</ion-label>\n          <ion-input formControlName="creci" type="text" name="creci"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Perfil</ion-label>\n          <ion-select formControlName="perfil" name="perfil" (ionChange)="verifyPerfil()" style="font-size: 1em !important;">\n            <ion-option></ion-option>\n            <ion-option>Locação</ion-option>\n            <ion-option>Venda</ion-option>\n            <ion-option>Locação e Venda</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item *ngIf="perfil == \'Venda\'">\n          <ion-label class="label" color="primary" stacked>Tipo Venda</ion-label>\n          <ion-select formControlName="selltype" name="selltype" style="font-size: 1em !important;">\n            <ion-option></ion-option>\n            <ion-option>MCMV</ion-option>\n            <ion-option>Intermediário</ion-option>\n            <ion-option>Alto padrão</ion-option>\n            <ion-option>Todos</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>E-mail</ion-label>\n          <ion-input formControlName="email" type="text" name="email"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Telefone</ion-label>\n          <ion-input formControlName="tel" type="text" name="tel" [brmasker]="{phone: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <p class="msg-spam">Utilizaremos esses dados para criar sua conta. Nada de spam.</p>\n        </ion-item>\n\n      </ion-list>\n      <div style="text-align: center;">\n        <button type="submit" class="btn btn-yellow" [disabled]="!form3.valid" center ion-button (click)=\'sendForm3();\'>\n          Entrar na lista de espera\n        </button>\n      </div>\n    </form>\n  </div>\n\n  <div *ngIf="userType == 4">\n    <form [formGroup]="form4">\n      <ion-input type="origin" value="{{linkOrigin}}" style="display: none;"></ion-input>\n      <ion-list>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Nome completo</ion-label>\n          <ion-input formControlName="name" type="text" name="name"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>CNPJ</ion-label>\n          <ion-input formControlName="cnpj" type="text" name="cnpj" [brmasker]="{mask:\'00.000.000/0000-00\', len:18}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>CRECI J</ion-label>\n          <ion-input formControlName="creci" type="text" name="creci"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Nome para contato</ion-label>\n          <ion-input formControlName="contact" type="text" name="contact"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Endereço</ion-label>\n          <ion-input formControlName="endereco" type="text" name="endereco"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>E-mail</ion-label>\n          <ion-input formControlName="email" type="text" name="email"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label class="label" color="primary" stacked>Telefone</ion-label>\n          <ion-input formControlName="tel" type="text" name="tel" [brmasker]="{phone: true}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <p class="msg-spam">Utilizaremos esses dados para criar sua conta. Nada de spam.</p>\n        </ion-item>\n      </ion-list>\n      <div style="text-align: center;">\n        <button type="submit" class="btn btn-yellow" [disabled]="!form4.valid" center ion-button (click)=\'sendForm4();\'>\n          Entrar na lista de espera\n        </button>\n      </div>\n    </form>\n  </div>-->\n\n</ion-content>\n'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/form-list/form-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_waitinglist__["a" /* WaitinglistProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], FormListPage);
    return FormListPage;
}());

//# sourceMappingURL=form-list.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MsgSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__myaction_myaction__ = __webpack_require__(128);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MsgSuccessPage = /** @class */ (function () {
    function MsgSuccessPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MsgSuccessPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MsgSuccessPage');
    };
    MsgSuccessPage.prototype.goToHome = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__myaction_myaction__["a" /* MyActionPage */]);
    };
    MsgSuccessPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-msg-success',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/msg-success/msg-success.html"*/'<ion-content padding fullscreen>\n  <br><br><br>\n  <h1>Faça parte da revolução imobiliária</h1>\n  <hr>\n  <br><br><br>\n  <p>Seu cadastro foi recebido com sucesso.<br>Agora é só aguardar.</p>\n\n  <p>Te ligaremos e enviaremos um e-mail assim que seu convite chegar!</p>\n\n  <p>Agradecemos o interesse!<br>Seu convite chegará muito em breve</p>\n  <br><br><br>\n  <hr>\n\n  <div style="text-align: center;">\n    <button type="submit" class="btn btn-yellow" center ion-button (click)=\'goToHome();\'>\n      Voltar para a tela inicial\n    </button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/msg-success/msg-success.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], MsgSuccessPage);
    return MsgSuccessPage;
}());

//# sourceMappingURL=msg-success.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaitinglistProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WaitinglistProvider = /** @class */ (function () {
    function WaitinglistProvider(http) {
        this.http = http;
        //public URL_PORTAL = 'https://autocarx.com.br/imobi_app/';
        this.URL_PORTAL = 'https://clinicaorel.com.br/portal-app/';
        this.API_URL = this.URL_PORTAL + 'api/ws.php';
    }
    WaitinglistProvider.prototype.register = function (data, type) {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            })
        };
        var form = '';
        if (type == 1) {
            form = 'form1';
        }
        else if (type == 2) {
            form = 'form2';
        }
        else if (type == 3) {
            form = 'form3';
        }
        else if (type == 4) {
            form = 'form4';
        }
        return this.http
            .post(this.API_URL + '?action=' + form, data, {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Authorization', 'my-auth-token'),
        })
            .timeout(15000)
            .map(function (data) { return data; });
    };
    WaitinglistProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], WaitinglistProvider);
    return WaitinglistProvider;
}());

//# sourceMappingURL=waitinglist.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mapbox_gl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mapbox_gl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sociallogin_sociallogin__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_zbar__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_schedule__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SchedulePage = /** @class */ (function () {
    //showBlue: boolean = true;
    function SchedulePage(navCtrl, schedule, helper, zbar, formBuilder, geolocation) {
        this.navCtrl = navCtrl;
        this.schedule = schedule;
        this.helper = helper;
        this.zbar = zbar;
        this.formBuilder = formBuilder;
        this.geolocation = geolocation;
        this.ARR_ITEMS = [];
        this.form = this.formBuilder.group({
            'name': ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required])],
            'email': ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required])],
            'tel': '',
            'niver': '',
            'cpf': ''
        });
    }
    SchedulePage.prototype.ionViewWillEnter = function () {
        //setTimeout(() => {
        //this.showBlue = false;
        //this.initializeMapbox();
        //}, 1000);
        this.loadSchedules('broid', 1);
    };
    SchedulePage.prototype.loadSchedules = function (type, value) {
        var _this = this;
        this.helper.showLoading("Aguarde");
        this.schedule.getSchedules(type, value)
            .subscribe(function (data) {
            _this.ARR_ITEMS = data;
            _this.helper.hideLoading();
        }, function (error) {
            _this.helper.presentToast('Não foi possível carregar os agendamentos');
            _this.helper.hideLoading();
        });
    };
    SchedulePage.prototype.searchPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sociallogin_sociallogin__["a" /* SocialLoginPage */], { title: "", type: 1 });
    };
    SchedulePage.prototype.clearHome = function () {
        //
    };
    SchedulePage.prototype.signin = function (type) {
        //check if is logged
        //turn to especific page or signup/signin
    };
    SchedulePage.prototype.scanImage = function () {
        var _this = this;
        var options = {
            flash: 'off',
            text_title: 'Ler QR Code',
            text_instructions: 'Focalize o QRCode na placa',
            drawSight: false
        };
        this.zbar.scan(options)
            .then(function (result) {
            alert(result); // Scanned code
            alert('redirect pagina detalhes imovel');
            _this.helper.presentToast('Imóvel não localizado ou indisponível.');
        })
            .catch(function (error) {
            // console.log(error); // Error message
            _this.helper.presentToast('Falha ao efetuar a leitura do QRCode.');
        });
    };
    SchedulePage.prototype.initializeMapbox = function () {
        // chave da api
        var _this = this;
        var geojson = {
            type: 'FeatureCollection',
            features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-46.6565887, -23.5629]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'TRIANON MASP'
                    }
                }, {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-46.6526147, -23.5649491]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'Avenida Paulista'
                    }
                }]
        };
        __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["accessToken"] = 'pk.eyJ1Ijoiam9hb25ldHRvbWUiLCJhIjoiU1BhZGROYyJ9.sodwEG5A7ooeniSBtwsg6A';
        var map = new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Map"]({
            container: this.mapElement.nativeElement,
            style: 'mapbox://styles/mapbox/outdoors-v10',
            zoom: 13,
            center: [-48.8769, -23.9793],
            logoPosition: 'bottom-right',
            pitch: 45,
            bearing: -17.6,
            antialias: true
        });
        map.addControl(new __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder___default.a({
            accessToken: __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["accessToken"],
            mapboxgl: __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__
        }));
        map.on('load', function () {
            // Insert the layer beneath any symbol layer.
            var layers = map.getStyle().layers;
            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',
                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);
            geojson.features.forEach(function (marker) {
                // create a HTML element for each feature
                var el = document.createElement('div');
                el.className = 'marker-bro';
                // make a marker for each feature and add to the map
                new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"](el)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Popup"]({ offset: 25 }) // add popups
                    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                    .addTo(map);
            });
            /* var url = 'https://wanderdrone.appspot.com/';
           window.setInterval(function() {
             map.getSource('drone').setData(url);
             }, 2000);
     
             map.addSource('drone', { type: 'geojson', data: url });
             map.addLayer({
               "id": "drone",
               "type": "symbol",
               "source": "drone",
               "layout": {
               "icon-image": "rocket-15"
             }
             }); */
        });
        this.geolocation.getCurrentPosition()
            .then(function (response) {
            _this.startPosition = response.coords;
            map.setCenter([_this.startPosition.longitude, _this.startPosition.latitude]);
            var marker = new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"]()
                .setLngLat([_this.startPosition.longitude, _this.startPosition.latitude])
                .addTo(map);
        });
    };
    SchedulePage.prototype.calculateRoute = function () {
        if (this.destinationPosition && this.startPosition) {
            var request = {
                origin: this.startPosition,
                destination: this.destinationPosition,
                travelMode: 'DRIVING'
            };
            //this.traceRoute(this.directionsService, this.directionsDisplay, request);
        }
    };
    SchedulePage.prototype.traceRoute = function (service, display, request) {
        service.route(request, function (result, status) {
            if (status == 'OK') {
                display.setDirections(result);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SchedulePage.prototype, "mapElement", void 0);
    SchedulePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-schedule',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/schedule/schedule.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title >Agendamentos</ion-title>\n  </ion-navbar> \n</ion-header>\n\n<ion-content  class="masters" >\n   \n      <div class="suggestions">\n        <h4 class="suggestions-h4">Próximos</h4>\n          \n        <div  *ngFor="let age of ARR_ITEMS" class="listprops">\n            <div class="img-schedule"><div class="status-visit">Visita Confirmada</div></div>\n            <div class="info">\n              <div class="prop-cat">{{ age.alias }}</div>\n              <div class="prop-location"> {{ age.neighboor }}</div>\n              <div class="prop-area">\n                <div class="icon-area"></div>\n                <div class="measure">{{ age.area }} m²</div>\n              </div>\n              <div class="prop-room">\n                <div class="icon-room"></div>\n                <div class="measure">{{ age.rooms }} dorms</div>\n              </div>\n              <div class="prop-pets">\n                <div class="icon-pets"></div>\n                <div class="measure">Sim</div>\n              </div>\n              <div class="modality">{{ age.modality }}</div>\n              <div class="price">R$ {{ age.price }}</div>\n            </div>\n            <div class="info-broker">\n              <div class="img-broker"></div>\n              <div class="name-broker"><strong>CORRETOR</strong><br>{{ age.broker }}</div>\n              <div class="h-line"></div>\n              <div class="v-line"></div>\n              <div class="day">{{ age.day_visit }}</div>\n              <div class="month">{{ age.month_visit }}</div>\n              <div class="hour">{{ age.hour_visit }}</div>\n            </div>\n          </div>\n           \n          \n\n      </div>\n\n      <div class="separator">\n        <div class="line"></div>\n      </div>\n\n      <div class="suggestions">\n        <h4 class="suggestions-h4">Anteriores</h4>\n          \n        <div  *ngFor="let age of ARR_ITEMS" class="listprops">\n            <div class="img-schedule"><div class="status-visit">Visita Confirmada</div></div>\n            <div class="info">\n              <div class="prop-cat">{{ age.alias }}</div>\n              <div class="prop-location"> {{ age.neighboor }}</div>\n              <div class="prop-area">\n                <div class="icon-area"></div>\n                <div class="measure">{{ age.area }} m²</div>\n              </div>\n              <div class="prop-room">\n                <div class="icon-room"></div>\n                <div class="measure">{{ age.rooms }} dorms</div>\n              </div>\n              <div class="prop-pets">\n                <div class="icon-pets"></div>\n                <div class="measure">Sim</div>\n              </div>\n              <div class="modality">{{ age.modality }}</div>\n              <div class="price">R$ {{ age.price }}</div>\n            </div>\n            <div class="info-broker">\n              <div class="img-broker"></div>\n              <div class="name-broker"><strong>CORRETOR</strong><br>{{ age.broker }}</div>\n              <div class="h-line"></div>\n              <div class="v-line"></div>\n              <div class="day">{{ age.day_visit }}</div>\n              <div class="month">{{ age.month_visit }}</div>\n              <div class="hour">{{ age.hour_visit }}</div>\n            </div>\n          </div>\n            \n      </div>\n    \n</ion-content>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/schedule/schedule.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_9__providers_schedule__["a" /* ScheduleProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_helper__["a" /* HelperProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_zbar__["a" /* ZBar */], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], SchedulePage);
    return SchedulePage;
}());

//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_property__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__details_details__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var DiscoverPage = /** @class */ (function () {
    //directionsService = new google.maps.DirectionsService();
    //directionsDisplay = new google.maps.DirectionsRenderer();
    function DiscoverPage(navParams, statusBar, navCtrl, helper, googleMaps, platform, global, zone, launchNavigator, geolocation, property) {
        var _this = this;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.helper = helper;
        this.googleMaps = googleMaps;
        this.platform = platform;
        this.global = global;
        this.zone = zone;
        this.launchNavigator = launchNavigator;
        this.geolocation = geolocation;
        this.property = property;
        this.ARR_ITEMS = [];
        this.goToStore = function (address) {
            _this.zone.run(function () {
                var options = {
                    appSelection: {
                        dialogHeaderText: "Navegar até o local usando...",
                        cancelButtonText: "Cancelar",
                        rememberChoice: {
                            enabled: false,
                            prompt: {
                                headerText: "Navegar até o local",
                                bodyText: "Utilizar este App na próxima vez?",
                                yesButtonText: "SIM",
                                noButtonText: "NÃO"
                            }
                        }
                    }
                };
                _this.launchNavigator.navigate(address, options)
                    .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
            });
        };
        this.near = this.navParams.get('near');
        window.angularComponent = { goToStore: this.goToStore, zone: zone, navCtrl: this.navCtrl, openProperty: this.openProperty };
        this.infoWindows = [];
        this.coordinate = {
            latitude: '',
            longitude: ''
        };
    }
    DiscoverPage.prototype.scrolling = function (event) {
        //var elmnt = document.getElementsByTagName("ion-header")[0];
        // const sheet = new CSSStyleSheet();
        //sheet.insertRule('#target {color: darkseagreen}');
        // elmnt.innerHTML = sheet;
    };
    DiscoverPage.prototype.openProperty = function (proid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__details_details__["a" /* DetailsPage */], { proid: proid });
    };
    DiscoverPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DiscoverPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.helper.showLoading("Aguarde")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.property.getHighlights().subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.ARR_ITEMS = data;
                                            return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.helper.presentToast("Imóvel não localizado ou indisponível.")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DiscoverPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.initMap();
        });
    };
    DiscoverPage.prototype.initMap = function () {
        var _this = this;
        var map = this.googleMaps.create(this.mapElement.nativeElement);
        map.one(__WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function (data) {
            _this.geolocation.getCurrentPosition()
                .then(function (resp) {
                _this.coordinate.latitude = resp.coords.latitude;
                _this.coordinate.longitude = resp.coords.longitude;
                var coordinates = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["d" /* LatLng */](resp.coords.latitude, resp.coords.longitude);
                var position = {
                    target: coordinates,
                    zoom: 14
                };
                map.animateCamera(position);
                var markerOptions = {
                    position: coordinates,
                    icon: "assets/icon/v2/home_ico_marker.png",
                    title: 'Sua localização'
                };
                var marker = map.addMarker(markerOptions)
                    .then(function (marks) {
                    //marks.showInfoWindow();
                });
                _this.getMarkers(map);
            }).catch(function (error) {
                _this.helper.presentToast('Erro ao recuperar sua posição');
            });
        });
    };
    DiscoverPage.prototype.closeAllInfoWindows = function () {
        for (var _i = 0, _a = this.infoWindows; _i < _a.length; _i++) {
            var window_1 = _a[_i];
            window_1.close();
        }
    };
    DiscoverPage.prototype.getMarkers = function (map) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.property.getDiscover(this.coordinate).subscribe(function (res) {
                            res.forEach(function (mark) {
                                _this.addMarkersToMap(mark.data, map);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DiscoverPage.prototype.addMarkersToMap = function (mark, map) {
        var _this = this;
        if (mark !== null) {
            var coordinates = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["d" /* LatLng */](mark.latitude, mark.longitude);
            var markerOptions = {
                position: coordinates,
                icon: "assets/icon/v2/home_ico_yellow_marker.png",
                proid: mark.proid,
                urlimage: mark.urlimage,
                //animation: google.maps.Animation.DROP,
                address: "blabla"
            };
            var marks = map.addMarker(markerOptions)
                .then(function (marca) {
                //mark.showInfoWindow();
                _this.addInfoWindowToMarker(marca, mark);
            });
        }
    };
    DiscoverPage.prototype.addInfoWindowToMarker = function (mark, marker) {
        var _this = this;
        var infoWindowContent = '<img border: 1vw solid white; style="z-index: 100000; width: 20vw; height: 20vw; border-radius: 10vw; position: fixed; left: calc(50% - 10vw); top: -58vw; border: 2px aliceblue solid" src="' + marker.urlimage + '">' +
            '<p style="color: black; font-size: 3vw; margin-left: 0; width: 99%; margin-right: 10px;"><br><br><strong>' + marker.title + '</strong></p>' +
            '<p style="color: black; margin-left: 0; width: 99%; margin-right: 10px;"><br>' + marker.address + '</p>' +
            '<p onclick="window.angularComponent.openProperty(' + marker.proid + ')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -2vw;">VER IMÓVEL</p>' +
            '<p onclick="window.angularComponent.goToStore(\'' + marker.address + '\')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -3vw;">IR ATÉ LÁ</p>';
        var infoWindow = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["c" /* HtmlInfoWindow */]();
        infoWindow.setContent(infoWindowContent, { width: "280px", height: "40vw", "border-radius": "10px", border: "2px aliceblue solid" });
        mark.on(__WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK).subscribe(function () {
            _this.closeAllInfoWindows();
            infoWindow.open(mark);
        });
        this.infoWindows.push(infoWindow);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], DiscoverPage.prototype, "mapElement", void 0);
    DiscoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-discover',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/discover/discover.html"*/'<ion-content padding class="gray menuios" (ionScroll)="scrolling($event)">\n      <div class="main-home">\n        <div class="map-content">\n          <div #map id="map"></div>\n        </div>\n        <button class="btn-back" ion-button icon-only (click)="goBack()">\n          <ion-icon name="arrow-back" color="amarelo"></ion-icon>\n        </button>\n          <div class="suggestions">\n            <h4 class="suggestions-h4">Próximos de Você</h4>\n            <div class="listprops">\n              <div *ngFor="let pro of ARR_ITEMS" class="thumb-content" (click)="openProperty(pro.proid);">\n                <div class="img-thumb" [style.background-image]="\'url(\' + pro.urlimage + \')\'"></div>\n                <div class="category"> {{ pro.alias }}</div>\n                  <div class="thumb-details">\n                    <div class="location"> {{ pro.neighboor }}</div>\n                    <div class="modality">{{ pro.modality }}</div>\n                    <div class="price">R$ {{ pro.price }}</div>\n                    <div class="group-icons">\n                      <div class="icons">\n                        <div class="area"><div class="icon-home-h"></div></div>\n                        <div class="measure">{{ pro.area }} m²</div>\n                      </div>\n                      <div class="icons">\n                        <div class="area"><div class="icon-home-b"></div></div>\n                        <div class="measure">{{ pro.rooms }}</div>\n                      </div>\n                      <div class="icons">\n                        <div class="area"><div [class]="pro.icons"></div></div>\n                        <div class="measure">{{ pro.types }}</div>\n                      </div>\n                    </div> \n                  </div>\n              </div>\n            </div>\n          </div>\n      </div>    \n  </ion-content>\n  '/*ion-inline-end:"/var/www/html/imobi_places/src/pages/discover/discover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__providers_property__["a" /* PropertyProvider */]])
    ], DiscoverPage);
    return DiscoverPage;
}());

//# sourceMappingURL=discover.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__property2__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_categories__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PropertyPage = /** @class */ (function () {
    function PropertyPage(navCtrl, navParams, helper, categs, formBuilder, login) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.categs = categs;
        this.formBuilder = formBuilder;
        this.login = login;
        this.submitAttempt = false;
        this._eye = "eye";
        this._type = "password";
        this.profile = "";
        this.currentMask = { mask: "00000000000000", len: 14 };
        this.categories = [];
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.form = this.formBuilder.group({
            city: [
                imvToAdd != null ? imvToAdd.city : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(40), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            catid: [
                imvToAdd != null ? imvToAdd.catid : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            address: [
                imvToAdd != null ? imvToAdd.address : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            number: imvToAdd != null ? imvToAdd.number : "",
            complement: "",
            neighboor: [
                imvToAdd != null ? imvToAdd.neighboor : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            zipcode: [
                imvToAdd != null ? imvToAdd.zipcode : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(9),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(9),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required
                ])
            ],
            uf: [
                imvToAdd != null ? "SP" : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(2),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required
                ])
            ]
        });
    }
    PropertyPage.prototype.ionViewDidLoad = function () {
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.profile = imvToAdd != null ? "Editar" : "Novo Imóvel";
    };
    PropertyPage.prototype.ionViewWillUnload = function () {
        localStorage.setItem("imvToActive", JSON.stringify(null));
    };
    PropertyPage.prototype.ionViewWillEnter = function () {
        this.loadCategs();
    };
    PropertyPage.prototype.submitProperty = function () {
        this.submitAttempt = true;
        if (this.form.valid) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__property2__["a" /* Property2Page */], {
                type: this.type,
                register: this.form.value
            });
        }
    };
    PropertyPage.prototype.showPassword = function () { };
    PropertyPage.prototype.loginEmail = function () { };
    PropertyPage.prototype.loadCategs = function () {
        var _this = this;
        this.helper.showLoading("Aguarde");
        this.categs.get().subscribe(function (data) {
            _this.categories = data;
            _this.helper.hideLoading();
        }, function (error) {
            _this.helper.hideLoading();
            _this.helper.presentToast("Ocorreu um erro ao obter os imóveis!");
        });
    };
    PropertyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-property",template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/property/property.html"*/'<ion-header>\n        <ion-navbar >\n          <ion-title>{{ profile }}</ion-title>\n        </ion-navbar> \n        <div class="numbers">\n                <div class="bg-num">\n                    <div class="num">1</div>\n                    <div class="num-out">2</div>\n                    <div class="num-out">3</div>\n                    <div class="num-out">4</div>\n                 </div>\n            </div>\n      </ion-header>\n    \n    <ion-content  padding class="masters">\n    \n        <div class="footer-frm">\n            <form [formGroup]="form">\n                <ion-list radio-group no-lines>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.city.valid || (!form.controls.city.dirty && !submitAttempt)" color="light" stacked>Qual a cidade do seu imóvel?</ion-label>\n                        <ion-label *ngIf="!form.controls.city.valid && (form.controls.city.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe a cidade!</strong></ion-label>\n                        <ion-input type="text" placeholder="ex: São Bernardo do Campo" name="name" formControlName="city"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.catid.valid || (!form.controls.catid.dirty && !submitAttempt)" color="light" stacked>Tipo do Imóvel:</ion-label>\n                        <ion-label *ngIf="!form.controls.catid.valid && (form.controls.catid.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Selecione o tipo do imóvel!</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="catid">\n                            <ion-option *ngFor="let cat of categories" [value]="cat.catid">{{ cat.category }}</ion-option>                           \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.address.valid || (!form.controls.address.dirty && !submitAttempt)" color="light" stacked>Endereço:</ion-label>\n                        <ion-label *ngIf="!form.controls.address.valid && (form.controls.address.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o endereço do imóvel!</strong></ion-label>\n                        <ion-input maxlength="50" formControlName="address" type="text" placeholder="Ex: Rua Jurubatuba"></ion-input>\n                    </ion-item>\n                    <div class="row">\n                            <div class="col">\n                                <ion-item class="nolines">\n                                    <ion-label color="light" *ngIf="form.controls.number.valid || (!form.control.number.dirty && !submitAttempt)" stacked>Número:</ion-label>\n                                    <ion-label *ngIf="!form.controls.number.valid  && (form.controls.number.dirty || submitAttempt)" color="light" stacked><strong class="error"><ion-icon name="alert"></ion-icon> N&ordm; incorreto!</strong></ion-label>\n                                    <ion-input #mynumber maxlength="10" type="text"  formControlName="number" placeholder="10, 100, 1000"></ion-input>\n                                </ion-item>\n                            </div>\n                            <div class="col">\n                                <ion-item class="nolines">\n                                    <ion-label color="light" stacked>Complemento:</ion-label>\n                                    <ion-input #complement value="{{ usr_complement }}" maxlength="20" type="text" formControlName="complement" placeholder="Ex: Apto 10"></ion-input>\n                                </ion-item>\n                            </div>\n                        </div>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.zipcode.valid || (!form.controls.zipcode.dirty && !submitAttempt)" color="light" stacked>CEP:</ion-label>\n                        <ion-label *ngIf="!form.controls.zipcode.valid && (form.controls.zipcode.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o CEP!</strong></ion-label>\n                        <ion-input type="tel" maxlength="9" [brmasker]="{mask:\'00000-000\', len:9}" placeholder="ex: 01539-000" name="zipcode" formControlName="zipcode"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.neighboor.valid || (!form.controls.neighboor.dirty && !submitAttempt)" color="light" stacked>Bairro:</ion-label>\n                        <ion-label *ngIf="!form.controls.neighboor.valid && (form.controls.neighboor.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o bairro!</strong></ion-label>\n                        <ion-input type="text" maxlength="50" placeholder="ex: Centro" name="neighboor" formControlName="neighboor"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.uf.valid || (!form.controls.uf.dirty && !submitAttempt)" color="light" stacked>UF:</ion-label>\n                        <ion-label *ngIf="!form.controls.uf.valid && (form.controls.uf.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o Estado!</strong></ion-label>\n                        <ion-input type="text" maxlength="2" placeholder="ex: SP" name="uf" formControlName="uf"></ion-input>\n                    </ion-item>\n                </ion-list>\n            </form>\n        </div>\n    </ion-content>\n    \n    <ion-footer>\n        <ion-toolbar color="azul">\n           <!--  <button id="btback" ion-button block icon-left type="submit">\n                <ion-icon name="arrow-dropleft-circle"></ion-icon>\n                VOLTAR\n            </button> -->\n            <button id="btok" ion-button block icon-right type="button" (click)="submitProperty()">\n                AVANÇAR\n                <ion-icon name="arrow-dropright-circle"></ion-icon>\n            </button>\n        </ion-toolbar>\n      </ion-footer>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/property/property.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_categories__["a" /* CategoriesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__providers_login__["a" /* LoginProvider */]])
    ], PropertyPage);
    return PropertyPage;
}());

//# sourceMappingURL=property.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Property2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__property3__ = __webpack_require__(382);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Property2Page = /** @class */ (function () {
    function Property2Page(navCtrl, navParams, helper, formBuilder, login) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.formBuilder = formBuilder;
        this.login = login;
        this.submitAttempt = false;
        this._eye = "eye";
        this._type = "password";
        this.profile = "Novo Imóvel";
        this.currentMask = { mask: "00000000000000", len: 14 };
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.form = this.formBuilder.group({
            description: [
                imvToAdd != null ? imvToAdd.description.substring(0, 30) : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(300), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            area: [
                imvToAdd != null ? imvToAdd.area : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            rooms: [
                imvToAdd != null ? imvToAdd.rooms : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            suits: [
                imvToAdd != null ? imvToAdd.suits : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            bathrooms: [
                imvToAdd != null ? imvToAdd.bathrooms : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            furniture: [
                imvToAdd != null ? imvToAdd.furniture : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            keytype: [
                imvToAdd != null ? "1" : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ]
        });
    }
    Property2Page.prototype.ionViewDidLoad = function () {
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.profile = imvToAdd != null ? "Editar" : "Novo Imóvel";
    };
    Property2Page.prototype.ionViewWillEnter = function () {
        this.register = this.navParams.get("register");
    };
    Property2Page.prototype.submitProperty = function () {
        this.submitAttempt = true;
        if (this.form.valid) {
            var reg = Object.assign(this.register, this.form.value);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__property3__["a" /* Property3Page */], { type: this.type, register: reg });
        }
    };
    Property2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-property2",template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/property/property2.html"*/'<ion-header>\n        <ion-navbar >\n          <ion-title>{{ profile }}</ion-title>\n        </ion-navbar> \n        <div class="numbers">\n                <div class="bg-num">\n                    <div class="num">1</div>\n                    <div class="num">2</div>\n                    <div class="num-out">3</div>\n                    <div class="num-out">4</div>\n                 </div>\n            </div>\n      </ion-header>\n    \n    <ion-content  padding class="masters">\n    \n        <div class="footer-frm">\n            <form [formGroup]="form">\n                <ion-list radio-group no-lines>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.description.valid || (!form.controls.description.dirty && !submitAttempt)" color="light" stacked>Conte mais sobre o imóvel:</ion-label>\n                        <ion-label *ngIf="!form.controls.description.valid && (form.controls.description.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Preencha a descrição!</strong></ion-label>\n                        <ion-textarea placeholder="ex: Lindo apto com varanda gourmet..." name="description" formControlName="description"></ion-textarea>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.area.valid || (!form.controls.area.dirty && !submitAttempt)" color="light" stacked>Área útil (m²):</ion-label>\n                        <ion-label *ngIf="!form.controls.area.valid && (form.controls.area.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe a área útil!</strong></ion-label>\n                        <ion-input maxlength="8" formControlName="area" type="text"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.rooms.valid || (!form.controls.rooms.dirty && !submitAttempt)" color="light" stacked>Dormitórios:</ion-label>\n                        <ion-label *ngIf="!form.controls.rooms.valid && (form.controls.rooms.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Selecione o nº de dormitórios!</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="rooms">\n                            <ion-option value="1">1</ion-option>\n                            <ion-option value="2">2</ion-option>\n                            <ion-option value="3">3</ion-option>\n                            <ion-option value="4">4</ion-option>\n                            <ion-option value="5">5</ion-option>\n                            <ion-option value="6">6</ion-option>\n                            <ion-option value="7">7</ion-option>\n                            <ion-option value="8">8</ion-option>\n                            <ion-option value="9">9</ion-option>                           \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.suits.valid || (!form.controls.suits.dirty && !submitAttempt)" color="light" stacked>Quantas Suítes possui?</ion-label>\n                        <ion-label *ngIf="!form.controls.suits.valid && (form.controls.suits.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Selecione o nº de suítes!</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="suits">\n                            <ion-option value="0" selected>Sem Suítes</ion-option>\n                            <ion-option value="1">1</ion-option>\n                            <ion-option value="2">2</ion-option>\n                            <ion-option value="3">3</ion-option>\n                            <ion-option value="4">4</ion-option>\n                            <ion-option value="5">5</ion-option>\n                            <ion-option value="6">6</ion-option>\n                            <ion-option value="7">7</ion-option>\n                            <ion-option value="8">8</ion-option>\n                            <ion-option value="9">9</ion-option>                           \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.bathrooms.valid || (!form.controls.bathrooms.dirty && !submitAttempt)" color="light" stacked>Banheiros:</ion-label>\n                        <ion-label *ngIf="!form.controls.bathrooms.valid && (form.controls.bathrooms.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Selecione o nº de banheiros!</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="bathrooms">\n                            <ion-option value="1">1</ion-option>\n                            <ion-option value="2">2</ion-option>\n                            <ion-option value="3">3</ion-option>\n                            <ion-option value="4">4</ion-option>\n                            <ion-option value="5">5</ion-option>\n                            <ion-option value="6">6</ion-option>\n                            <ion-option value="7">7</ion-option>\n                            <ion-option value="8">8</ion-option>\n                            <ion-option value="9">9</ion-option>                           \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.furniture.valid || (!form.controls.furniture.dirty && !submitAttempt)" color="light" stacked>Mobília:</ion-label>\n                        <ion-label *ngIf="!form.controls.furniture.valid && (form.controls.furniture.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Possui mobília?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="furniture">\n                            <ion-option value="0">Não Mobiliado</ion-option>\n                            <ion-option value="1">Mobiliado</ion-option>                         \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.keytype.valid || (!form.controls.keytype.dirty && !submitAttempt)" color="light" stacked>Tipos de Chave:</ion-label>\n                        <ion-label *ngIf="!form.controls.keytype.valid && (form.controls.keytype.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Selecione o tipo de chave!</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="keytype">\n                            <ion-option value="1">Chave</ion-option>\n                            <ion-option value="2">Senha</ion-option>\n                            <ion-option value="3">Biometria</ion-option>                         \n                        </ion-select> \n                    </ion-item>\n                </ion-list>\n            </form>\n        </div>\n    </ion-content>\n    \n    <ion-footer>\n        <ion-toolbar color="azul">\n           <!--  <button id="btback" ion-button block icon-left type="submit">\n                <ion-icon name="arrow-dropleft-circle"></ion-icon>\n                VOLTAR\n            </button> -->\n            <button id="btok" ion-button block icon-right type="button" (click)="submitProperty()">\n                AVANÇAR\n                <ion-icon name="arrow-dropright-circle"></ion-icon>\n            </button>\n        </ion-toolbar>\n      </ion-footer>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/property/property2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__providers_login__["a" /* LoginProvider */]])
    ], Property2Page);
    return Property2Page;
}());

//# sourceMappingURL=property2.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Property3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__property4__ = __webpack_require__(383);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Property3Page = /** @class */ (function () {
    function Property3Page(navCtrl, navParams, helper, formBuilder, login) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.formBuilder = formBuilder;
        this.login = login;
        this.submitAttempt = false;
        this._eye = "eye";
        this._type = "password";
        this.profile = "Novo Imóvel";
        this.currentMask = { mask: "00000000000000", len: 14 };
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.form = this.formBuilder.group({
            garage: [
                imvToAdd != null ? imvToAdd.garage : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            occupied: [
                imvToAdd != null ? imvToAdd.occupied : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            relationship: [
                imvToAdd != null ? imvToAdd.relationship : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            kind: [
                imvToAdd != null ? imvToAdd.modid : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            price: [
                imvToAdd != null ? imvToAdd.price : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            visitdates: [
                imvToAdd != null ? "1" : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ]
        });
    }
    Property3Page.prototype.ionViewDidLoad = function () {
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.profile = imvToAdd != null ? "Editar" : "Novo Imóvel";
    };
    Property3Page.prototype.ionViewWillEnter = function () {
        this.register = this.navParams.get("register");
    };
    Property3Page.prototype.submitProperty = function () {
        this.submitAttempt = true;
        if (this.form.valid) {
            var reg = Object.assign(this.register, this.form.value);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__property4__["a" /* Property4Page */], { type: this.type, register: reg });
        }
    };
    Property3Page.prototype.showPassword = function () { };
    Property3Page.prototype.loginEmail = function () { };
    Property3Page.prototype.loadCategs = function () { };
    Property3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-property3",template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/property/property3.html"*/'<ion-header>\n        <ion-navbar >\n          <ion-title>{{ profile }}</ion-title>\n        </ion-navbar> \n        <div class="numbers">\n                <div class="bg-num">\n                    <div class="num">1</div>\n                    <div class="num">2</div>\n                    <div class="num">3</div>\n                    <div class="num-out">4</div>\n                 </div>\n            </div>\n      </ion-header>\n    \n    <ion-content  padding class="masters">\n    \n        <div class="footer-frm">\n            <form [formGroup]="form">\n                <ion-list radio-group no-lines>\n                    \n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.garage.valid || (!form.controls.garage.dirty && !submitAttempt)" color="light" stacked>Vagas de Garagem:</ion-label>\n                        <ion-label *ngIf="!form.controls.garage.valid && (form.controls.garage.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Possui garagem?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="garage">\n                            <ion-option value="0">Sem Garagem</ion-option>\n                            <ion-option value="1">1</ion-option>\n                            <ion-option value="2">2</ion-option>\n                            <ion-option value="3">3</ion-option>\n                            <ion-option value="4">4</ion-option>\n                            <ion-option value="5">5</ion-option>\n                            <ion-option value="6">6</ion-option>\n                            <ion-option value="7">7</ion-option>\n                            <ion-option value="8">8</ion-option>\n                            <ion-option value="9">9</ion-option>                           \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.occupied.valid || (!form.controls.occupied.dirty && !submitAttempt)" color="light" stacked>Quem mora no imóvel?</ion-label>\n                        <ion-label *ngIf="!form.controls.occupied.valid && (form.controls.occupied.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Quem mora no imóvel?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="occupied">\n                            <ion-option value="0">Eu Moro</ion-option>\n                            <ion-option value="1">Desocupado</ion-option>\n                            <ion-option value="2">Inquilino Mora</ion-option>                              \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.relationship.valid || (!form.controls.relationship.dirty && !submitAttempt)" color="light" stacked>Qual sua relação com o proprietário?</ion-label>\n                        <ion-label *ngIf="!form.controls.relationship.valid && (form.controls.relationship.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Qual sua relação com o proprietário?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="relationship">\n                            <ion-option value="0">Proprietário</ion-option>\n                            <ion-option value="1">Administrador/Terceiro</ion-option>\n                            <ion-option value="2">Imobiliária</ion-option>                               \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.kind.valid || (!form.controls.kind.dirty && !submitAttempt)" color="light" stacked>O que deseja?</ion-label>\n                        <ion-label *ngIf="!form.controls.kind.valid && (form.controls.kind.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Deseja vender ou alugar?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="kind">\n                            <ion-option value="1">Quero Alugar</ion-option>\n                            <ion-option value="2">Quero Vender</ion-option>                              \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.price.valid || (!form.controls.price.dirty && !submitAttempt)" color="light" stacked>Preço de Venda/Locação:</ion-label>\n                        <ion-label *ngIf="!form.controls.price.valid && (form.controls.price.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o Preço de Venda/Locação!</strong></ion-label>\n                        <ion-input type="tel" maxlength="15" [brmasker]="{money: true, thousand: \'.\',  decimalCaracter: \',\', decimal: \'2\'}" placeholder="ex: 01539-000" name="price" formControlName="price"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.visitdates.valid || (!form.controls.visitdates.dirty && !submitAttempt)" color="light" stacked>Qual a possibilidade de visitas do imóvel?</ion-label>\n                        <ion-label *ngIf="!form.controls.visitdates.valid && (form.controls.visitdates.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Qual a possibilidade de visitas do imóvel?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="visitdates">\n                            <ion-option value="1">De segunda a sexta, 08h as 19h</ion-option>\n                            <ion-option value="2">Sábados, das 09h as 14h</ion-option>\n                            <ion-option value="3">Domingo, das 09 as 14h</ion-option>                              \n                        </ion-select> \n                    </ion-item>\n                </ion-list>\n            </form>\n        </div>\n    </ion-content>\n    \n    <ion-footer>\n        <ion-toolbar color="azul">\n           <!--  <button id="btback" ion-button block icon-left type="submit">\n                <ion-icon name="arrow-dropleft-circle"></ion-icon>\n                VOLTAR\n            </button> -->\n            <button id="btok" ion-button block icon-right type="button" (click)="submitProperty()">\n                AVANÇAR\n                <ion-icon name="arrow-dropright-circle"></ion-icon>\n            </button>\n        </ion-toolbar>\n      </ion-footer>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/property/property3.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__providers_login__["a" /* LoginProvider */]])
    ], Property3Page);
    return Property3Page;
}());

//# sourceMappingURL=property3.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Property4Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_property__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_categories__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Property4Page = /** @class */ (function () {
    function Property4Page(navCtrl, navParams, helper, camera, categs, formBuilder, property) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.camera = camera;
        this.categs = categs;
        this.formBuilder = formBuilder;
        this.property = property;
        this.submitAttempt = false;
        this._eye = "eye";
        this._type = "password";
        this.profile = "Novo Imóvel";
        this.currentMask = { mask: "00000000000000", len: 14 };
        this.imgPreview = [];
        this.maxphotos = 10;
        this.currentNumPhotos = 0;
        this.realestates = [];
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.form = this.formBuilder.group({
            pets: [
                imvToAdd != null ? imvToAdd.pets : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            tax: [
                imvToAdd != null ? imvToAdd.tax : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            iptu: [
                imvToAdd != null ? imvToAdd.iptu : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            concierge: [
                imvToAdd != null ? imvToAdd.concierge : "",
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])
            ],
            reaid: 0,
            photo: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
    }
    Property4Page.prototype.ionViewDidLoad = function () {
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        this.profile = imvToAdd != null ? "Editar" : "Novo Imóvel";
    };
    Property4Page.prototype.ionViewWillEnter = function () {
        this.register = this.navParams.get("register");
        this.loadRealestates();
    };
    Property4Page.prototype.removeImg = function (arr, item) {
        var _this = this;
        this.helper.presentConfirm("Atenção", "Deseja excluir esta imagem?", function (res) {
            _this.helper.removeFromArray(arr, item);
        });
    };
    Property4Page.prototype.loadRealestates = function () {
        var _this = this;
        this.helper.showLoading("Aguarde");
        this.categs.realestates().subscribe(function (data) {
            _this.realestates = data;
            _this.helper.hideLoading();
        }, function (error) {
            _this.helper.hideLoading();
            _this.helper.presentToast("Ocorreu um erro ao obter as imobiliárias!");
        });
    };
    Property4Page.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 90,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        if (this.currentNumPhotos > this.maxphotos) {
            this.helper.presentAlert("Atenção", "Número de imagens excedido. Permitido no máximo 10 fotos por imóvel.");
        }
        else {
            this.camera.getPicture(options).then(function (imageData) {
                _this.imgPreview[_this.currentNumPhotos] = 'data:image/jpeg;base64,' + imageData;
                _this.currentNumPhotos++;
                if (_this.imgPreview.length > 0) {
                    _this.form.controls["photo"].setValue(_this.imgPreview[0]);
                }
            });
        }
    };
    Property4Page.prototype.getPhoto = function () {
        var _this = this;
        var options = {
            quality: 90,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        if (this.currentNumPhotos > this.maxphotos) {
            this.helper.presentAlert("Atenção", "Número de imagens excedido. Permitido no máximo 10 fotos por imóvel.");
        }
        else {
            this.camera.getPicture(options).then(function (imageData) {
                _this.imgPreview[_this.currentNumPhotos] = 'data:image/jpeg;base64,' + imageData;
                _this.currentNumPhotos++;
                if (_this.imgPreview.length > 0) {
                    _this.form.controls["photo"].setValue(_this.imgPreview[0]);
                }
            });
        }
    };
    Property4Page.prototype.submitProperty = function () {
        var _this = this;
        var imvToAdd = JSON.parse(localStorage.getItem("imvToActive"));
        var arraysIMV = JSON.parse(localStorage.getItem("ARR_PROPERTY_IMV"));
        var arraysIMVOF = JSON.parse(localStorage.getItem("ARR_PROPERTY_OFF_IMV"));
        if (imvToAdd != null) {
            this.helper.showLoading("Salvando Imóvel");
            setTimeout(function () {
                _this.helper.hideLoading();
                var removeImv = arraysIMVOF.find(function (imv) { return imv.proid == imvToAdd.proid; });
                arraysIMVOF = arraysIMVOF.filter(function (imv) { return imv.proid != imvToAdd.proid; });
                arraysIMV.push(removeImv);
                localStorage.setItem("ARR_PROPERTY_IMV", JSON.stringify(arraysIMV));
                localStorage.setItem("ARR_PROPERTY_OFF_IMV", JSON.stringify(arraysIMVOF));
                localStorage.setItem("TO_ACTIVE", "true");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                _this.helper.presentToast("Seu imóvel foi ativado com sucesso!");
            }, 2000);
        }
        else {
            this.submitAttempt = true;
            if (this.form.valid) {
                this.form.value.photos = JSON.parse(JSON.stringify(this.imgPreview));
                var reg = Object.assign(this.register, this.form.value);
                //alert(JSON.stringify(reg));
                this.helper.showLoading("Salvando Imóvel");
                this.property.save(reg).subscribe(function (res) {
                    // console.log(JSON.stringify(res));
                    _this.helper.hideLoading();
                    _this.helper.presentToast("Seu imóvel foi cadastrado com sucesso!");
                }, function (error) {
                    _this.helper.hideLoading();
                    // console.log(JSON.stringify(error));
                    _this.helper.presentToast("Ocorreu um erro ao salvar seu imóvel! " + JSON.stringify(error));
                });
            }
        }
    };
    Property4Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-property4",template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/property/property4.html"*/'<ion-header>\n        <ion-navbar >\n          <ion-title>{{ profile }}</ion-title>\n        </ion-navbar> \n        <div class="numbers">\n                <div class="bg-num">\n                    <div class="num">1</div>\n                    <div class="num">2</div>\n                    <div class="num">3</div>\n                    <div class="num">4</div>\n                 </div>\n            </div>\n      </ion-header>\n    \n    <ion-content  padding class="masters">\n    \n        <div class="footer-frm">\n            <form [formGroup]="form">\n                <ion-list radio-group no-lines>\n                    \n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.pets.valid || (!form.controls.pets.dirty && !submitAttempt)" color="light" stacked>Aceita animais de estimação?</ion-label>\n                        <ion-label *ngIf="!form.controls.pets.valid && (form.controls.pets.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Selecione uma opção!</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="pets">\n                            <ion-option value="1">Sim</ion-option>\n                            <ion-option value="0">Não</ion-option>                     \n                        </ion-select> \n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.tax.valid || (!form.controls.tax.dirty && !submitAttempt)" color="light" stacked>Valor mensal Condomínio:</ion-label>\n                        <ion-label *ngIf="!form.controls.tax.valid && (form.controls.tax.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o CEP!</strong></ion-label>\n                        <ion-input type="tel" maxlength="9" [brmasker]="{money: true, thousand: \'.\',  decimalCaracter: \',\', decimal: \'2\'}" placeholder="ex: 100,00" name="tax" formControlName="tax"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines">\n                            <ion-label *ngIf="form.controls.iptu.valid || (!form.controls.iptu.dirty && !submitAttempt)" color="light" stacked>Valor mensal IPTU:</ion-label>\n                            <ion-label *ngIf="!form.controls.iptu.valid && (form.controls.iptu.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Informe o CEP!</strong></ion-label>\n                            <ion-input type="tel" maxlength="9" [brmasker]="{money: true, thousand: \'.\',  decimalCaracter: \',\', decimal: \'2\'}" placeholder="ex: 200,00" name="iptu" formControlName="iptu"></ion-input>\n                        </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label *ngIf="form.controls.concierge.valid || (!form.controls.concierge.dirty && !submitAttempt)" color="light" stacked>Portaria:</ion-label>\n                        <ion-label *ngIf="!form.controls.concierge.valid && (form.controls.concierge.dirty || submitAttempt)" stacked><strong class="error"><ion-icon name="alert"></ion-icon> Possui portaria?</strong></ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="concierge">\n                            <ion-option value="0">24H</ion-option>\n                            <ion-option value="1">Diurna</ion-option>\n                            <ion-option value="2">Noturna</ion-option> \n                            <ion-option value="3">Sem Portaria</ion-option>                              \n                        </ion-select> \n                    </ion-item>\n\n                    <ion-item class="nolines">\n                        <ion-label color="light" stacked>Imobiliária:</ion-label>\n                        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" formControlName="reaid">\n                            <ion-option *ngFor="let rea of realestates" [value]="rea.reaid">{{ rea.name }}</ion-option>                           \n                        </ion-select> \n                    </ion-item>\n\n                    <ion-item class="nolines" >\n                        <ion-label color="light" stacked>Imagens do imóvel</ion-label>\n                    </ion-item>\n                    <ion-item class="nolines" *ngIf="imgPreview.length > 0"> \n                        <ion-grid>\n                            <ion-row>\n                                <ion-col col-3 *ngFor="let img of imgPreview">\n                                    <ion-avatar item-start>\n                                        <div class="delimg" (click)="removeImg(imgPreview, img)"><ion-icon name="close"></ion-icon></div>\n                                        <div class="thumb-container" [style.background-image]="\'url(\' + img + \')\'"></div>\n                                    </ion-avatar>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <button type="button" ion-button outline color="azul" (click)="getPhoto()" icon-start>\n                                <ion-icon name="image"></ion-icon> \n                                ADICIONAR FOTOS\n                        </button>\n                        <button type="button" ion-button outline color="azul" (click)="takePhoto()" icon-start>\n                                <ion-icon name="camera"></ion-icon> \n                                TIRAR FOTO\n                        </button>\n                    </ion-item>\n                    \n                </ion-list>\n            </form>\n        </div>\n    </ion-content>\n    \n    <ion-footer>\n        <ion-toolbar color="azul">\n           <!--  <button id="btback" ion-button block icon-left type="submit">\n                <ion-icon name="arrow-dropleft-circle"></ion-icon>\n                VOLTAR\n            </button> -->\n            <button id="btok" ion-button block icon-right type="button" (click)="submitProperty()">\n                AVANÇAR\n                <ion-icon name="arrow-dropright-circle"></ion-icon>\n            </button>\n        </ion-toolbar>\n      </ion-footer>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/property/property4.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__providers_categories__["a" /* CategoriesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__providers_property__["a" /* PropertyProvider */]])
    ], Property4Page);
    return Property4Page;
}());

//# sourceMappingURL=property4.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_categories__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Filter = /** @class */ (function () {
    function Filter(navParams, helper, viewCtrl, navCtrl, categs) {
        this.navParams = navParams;
        this.helper = helper;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.categs = categs;
        this.locations_searched = [];
        this.lowPrice = 350000;
        this.highPrice = 700000;
        this.knobValues = {
            upper: 700000,
            lower: 350000
        };
        this.selectedReasons = [];
        this.filters = {};
        this.categories = [];
        this.loadCategs();
    }
    Filter.prototype.loadCategs = function () {
        var _this = this;
        this.helper.showLoading('Aguarde');
        this.categs.get()
            .subscribe(function (data) {
            _this.categories = data;
            _this.helper.hideLoading();
        }, function (error) {
            _this.helper.hideLoading();
            _this.helper.presentToast("Ocorreu um erro ao obter os imóveis!");
        });
    };
    Filter.prototype.filter = function () {
        this.filters.modalities = JSON.parse(JSON.stringify(this.selectedReasons));
        this.viewCtrl.dismiss(this.filters);
    };
    Filter.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    Filter.prototype.setKnobs = function (knob) {
        this.lowPrice = knob.lower;
        this.highPrice = knob.upper;
        this.filters.lowPrice = this.lowPrice;
        this.filters.highPrice = this.highPrice;
    };
    Filter.prototype.selectReason = function (data) {
        this.selectedReasons.push(data);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('mySlider'),
        __metadata("design:type", Object)
    ], Filter.prototype, "mySlider", void 0);
    Filter = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'filter',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/home/filter/filter.html"*/'<ion-content class="masters">\n  <div class="main">\n    <button class="btn-close" ion-button icon-only (click)="cancel()">\n      <ion-icon name="close" color="amarelo"></ion-icon>\n    </button>\n    <ion-list>\n      <ion-item>\n        <ion-label>Quero comprar</ion-label>\n        <ion-checkbox color="amarelo" (click)="selectReason(2)" checked="false"></ion-checkbox>\n      </ion-item>\n      <ion-item>\n        <ion-label>Quero alugar</ion-label>\n        <ion-checkbox color="amarelo" (click)="selectReason(1)" checked="false"></ion-checkbox>\n      </ion-item>\n      <ion-item class="nolines">\n        <ion-label stacked>Imóvel:</ion-label>\n        <ion-select okText="OK" cancelText="Cancelar" placeholder="Selecione" [(ngModel)]="filters.catid">\n            <ion-option *ngFor="let cat of categories" [value]="cat.catid">{{ cat.alias }}</ion-option>                           \n        </ion-select>\n      </ion-item>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n              <ion-item class="nolines" >\n                  <ion-label stacked>Dorms.</ion-label>\n                  <ion-input color="amarelo" [(ngModel)]="filters.rooms" type="tel" max-length="2"></ion-input>\n              </ion-item>\n          </ion-col>\n          <ion-col col-6>\n              <ion-item class="nolines" >\n                  <ion-label stacked>Banheiros</ion-label>\n                  <ion-input color="amarelo" [(ngModel)]="filters.bathrooms" type="tel" max-length="2"></ion-input>\n              </ion-item>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-item>\n        <ion-label color="light" stacked>Valor Aproximado:<br>{{ lowPrice | currency: \'R$\' : \'symbol\' : \'1.2-2\' : \'pt\' }} a {{ highPrice | currency: \'R$\' : \'symbol\' : \'1.2-2\' : \'pt\' }}</ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-range (ionChange)="setKnobs(knobValues);" dualKnobs="true" min="50000" max="20000000" [(ngModel)]="knobValues" step="50000" pin="true" color="azul"></ion-range>\n      </ion-item>\n    </ion-list>\n    <div class="btn-schedule">\n      <button id="btw" type="button" ion-button (click)=\'filter();\'>\n        CONFIRMAR\n      </button>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/home/filter/filter.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_categories__["a" /* CategoriesProvider */]])
    ], Filter);
    return Filter;
}());

//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_helper__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TermsPage = /** @class */ (function () {
    function TermsPage(navParams, navCtrl, helper) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.helper = helper;
    }
    TermsPage.prototype.ionViewWillEnter = function () {
    };
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-terms',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/terms/terms.html"*/'<ion-header>\n    <ion-navbar >\n      <ion-title>Termos de Uso</ion-title>\n    </ion-navbar> \n  </ion-header>\n<ion-content padding class="masters">\n\n        <h2>POLITICA DE PRIVACIDADE & TERMOS DE USO</h2>\n\n        <h5>SEÇÃO 1 &#8211; O QUE FAREMOS COM ESTA INFORMAÇÃO?</h5>\n        <p>Quando você realiza alguma transação em nosso site ou aplicativo, coletamos as informações pessoais que você nos dá tais como: nome, e-mail e endereço.</p>\n        <p>Quando você acessa nosso site, também recebemos automaticamente o protocolo de internet do seu computador, endereço de IP, a fim de obter informações que nos ajudam a aprender sobre seu navegador e sistema operacional.</p>\n        <p>Email Marketing será realizado apenas caso você permita. Nestes emails você poderá receber notícias sobre nossa empresa, nossos produtos e outras atualizações.</p>\n        \n        <h5>SEÇÃO 2 &#8211; CONSENTIMENTO<br />\n        Como vocês obtêm meu consentimento?</h5>\n        <p>Quando você fornece informações pessoais como nome, telefone e endereço, para completar uma transação, uma solicitação ou uma busca. Após a realização de ações entendemos que você está de acordo com a coleta de dados para serem utilizados pela nossa empresa.</p>\n        <p>Se pedimos por suas informações pessoais por uma razão secundária, como marketing, vamos lhe pedir diretamente por seu consentimento, ou lhe fornecer a oportunidade de dizer não.</p>\n        <p>E se eu quiser retirar meu consentimento, como proceder?</p>\n        <p>Se após você nos fornecer seus dados, você mudar de ideia, você pode retirar o seu consentimento para que possamos entrar em contato, para a coleção de dados contínua, uso ou divulgação de suas informações, a qualquer momento, entrando em contato conosco em contato@imobiplaces.com.br ou nos enviando uma correspondência em: Imobi Places Rua Jurubatuba, 1350, sala 308; Vila Lusitânia; São Bernardo do Campo; SP; 09725-210. No caso de e-mail marketings, você poderá deixar de receber os e- mails quando quiser, ao selecionar essa opção no fim de uma mensagem.</p>\n       \n        <h5>SEÇÃO 3 &#8211; DIVULGAÇÃO</h5>\n        <p>Podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.</p>\n        \n        <h5>SEÇÃO 4 &#8211; SERVIÇOS DE TERCEIROS</h5>\n        <p>No geral, os fornecedores terceirizados usados por nós irão apenas coletar, usar e divulgar suas informações na medida do necessário para permitir que eles realizem os serviços que eles nos fornecem.</p>\n        <p>Entretanto, certos fornecedores de serviços terceirizados, tais como gateways de pagamento e outros processadores de transação de pagamento, têm suas próprias políticas de privacidade com respeito à informação que somos obrigados a fornecer para eles de suas transações relacionadas com compras.</p>\n        <p>Para esses fornecedores, recomendamos que você leia suas políticas de privacidade para que você possa entender a maneira na qual suas informações pessoais serão usadas por esses fornecedores.</p>\n        <p>Em particular, lembre-se que certos fornecedores podem ser localizados em ou possuir instalações que são localizadas em jurisdições diferentes que você ou nós. Assim, se você quer continuar com uma transação que envolve os serviços de um fornecedor de serviço terceirizado, então suas informações podem tornar-se sujeitas às leis da(s) jurisdição(ões) nas quais o fornecedor de serviço ou suas instalações estão localizados.</p>\n        <p>Como um exemplo, se você está localizado no Canadá e sua transação é processada por um gateway de pagamento localizado nos Estados Unidos, então suas informações pessoais usadas para completar aquela transação podem estar sujeitas a divulgação sob a legislação dos Estados Unidos, incluindo o Ato Patriota.</p>\n        <p>Uma vez que você deixe o site da nossa loja ou seja redirecionado para um aplicativo ou site de terceiros, você não será mais regido por essa Política de Privacidade ou pelos Termos de Serviço do nosso site.</p>\n        <p>Links</p>\n        <p>Quando você clica em links no nosso site ou aplicativo, eles podem lhe direcionar para outros endereços. Não somos responsáveis pelas práticas de privacidade de outros sites e lhe incentivamos a ler as declarações de privacidade deles.</p>\n        \n        <h5>SEÇÃO 5 &#8211; SEGURANÇA</h5>\n        <p>Para proteger suas informações pessoais, tomamos precauções razoáveis e seguimos as melhores práticas da indústria para nos certificar que elas não serão perdidas inadequadamente, usurpadas, acessadas, divulgadas, alteradas ou destruídas.</p>\n        <p>Se você nos fornecer as suas informações de cartão de crédito, essa informação é criptografada usando tecnologia &#8220;secure socket layer&#8221; (SSL) e armazenada com uma criptografia AES-256. Embora nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro, nós seguimos todos os requisitos da PCI-DSS e implementamos padrões adicionais geralmente aceitos pela indústria.</p>\n        \n        <h5>SEÇÃO 6 &#8211; ALTERAÇÕES PARA ESSA POLÍTICA DE PRIVACIDADE</h5>\n        <p>Reservamos o direito de modificar essa política de privacidade a qualquer momento, então por favor, revise-a com frequência. Alterações e esclarecimentos vão surtir efeito imediatamente após sua publicação no site. Se fizermos alterações de materiais para essa política, iremos notificá-lo aqui que eles foram atualizados, para que você tenha ciência sobre quais informações coletamos, como as usamos, e sob que circunstâncias, se alguma, usamos e/ ou divulgamos elas.</p>\n        <p>Se nossa empresa for adquirida ou fundida com outra organização, suas informações podem ser transferidas para os novos proprietários para que possamos continuar a vender produtos para você.</p><br><br><br><br>\n</ion-content>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/terms/terms.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_helper__["a" /* HelperProvider */]])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NeighboorsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mapbox_gl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mapbox_gl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_property__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__details_details__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var NeighboorsPage = /** @class */ (function () {
    function NeighboorsPage(navParams, statusBar, navCtrl, helper, global, property, geolocation) {
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.helper = helper;
        this.global = global;
        this.property = property;
        this.geolocation = geolocation;
        this.ARR_ITEMS = [];
        this.near = this.navParams.get('near');
    }
    NeighboorsPage.prototype.scrolling = function (event) {
        //var elmnt = document.getElementsByTagName("ion-header")[0];
        // const sheet = new CSSStyleSheet();
        //sheet.insertRule('#target {color: darkseagreen}');
        // elmnt.innerHTML = sheet;
    };
    NeighboorsPage.prototype.propertyPage = function (proid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__details_details__["a" /* DetailsPage */], { proid: proid });
    };
    NeighboorsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    NeighboorsPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.match = this.navParams.get('match');
                        this.location = this.navParams.get('location');
                        return [4 /*yield*/, this.helper.showLoading("Aguarde")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.property.getSearchedNeighboors(this.match.neighboor, this.match.city).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.ARR_ITEMS = data.neighboors;
                                            return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.helper.presentToast("Não foi possível buscar os imóveis desta região.")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeighboorsPage.prototype.initializeMapbox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.geolocation.getCurrentPosition().then(function (response) {
                            _this.startPosition = response.coords;
                            __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["accessToken"] = _this.global.mapboxToken;
                            //"pk.eyJ1Ijoiam9hb25ldHRvbWUiLCJhIjoiU1BhZGROYyJ9.sodwEG5A7ooeniSBtwsg6A";
                            var map = new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Map"]({
                                container: _this.mapElement.nativeElement,
                                style: "mapbox://styles/mapbox/outdoors-v10",
                                zoom: 13,
                                center: [_this.startPosition.longitude, _this.startPosition.latitude],
                                logoPosition: "bottom-right",
                                pitch: 45,
                                bearing: -17.6,
                                antialias: true
                            });
                            map.addControl(new __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder___default.a({
                                accessToken: __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["accessToken"],
                                mapboxgl: __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__
                            }));
                            map.on("load", function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var markerUserLocation, layers, labelLayerId, i;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            markerUserLocation = new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"]()
                                                .setLngLat([this.startPosition.longitude, this.startPosition.latitude])
                                                .addTo(map);
                                            layers = map.getStyle().layers;
                                            for (i = 0; i < layers.length; i++) {
                                                if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
                                                    labelLayerId = layers[i].id;
                                                    break;
                                                }
                                            }
                                            map.addLayer({
                                                id: "3d-buildings",
                                                source: "composite",
                                                "source-layer": "building",
                                                filter: ["==", "extrude", "true"],
                                                type: "fill-extrusion",
                                                minzoom: 15,
                                                paint: {
                                                    "fill-extrusion-color": "#aaa",
                                                    "fill-extrusion-height": [
                                                        "interpolate",
                                                        ["linear"],
                                                        ["zoom"],
                                                        15,
                                                        0,
                                                        15.05,
                                                        ["get", "height"]
                                                    ],
                                                    "fill-extrusion-base": [
                                                        "interpolate",
                                                        ["linear"],
                                                        ["zoom"],
                                                        15,
                                                        0,
                                                        15.05,
                                                        ["get", "min_height"]
                                                    ],
                                                    "fill-extrusion-opacity": 0.6
                                                }
                                            }, labelLayerId);
                                            return [4 /*yield*/, this.property.getDiscover("discover").subscribe(function (res) {
                                                    res.forEach(function (marker) {
                                                        if (marker.data.type == "broker") {
                                                            var elBroker = document.createElement("div");
                                                            elBroker.className = "marker-bro animated fadeIn";
                                                            new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"](elBroker)
                                                                .setLngLat(marker.geometry.coordinates)
                                                                .setPopup(new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Popup"]({ offset: 25 }).setHTML("<h3 class='title-broker-map'>" +
                                                                marker.data.title +
                                                                "</h3><p class='descr-broker-map'>" +
                                                                marker.data.description +
                                                                "</p>"))
                                                                .addTo(map);
                                                        }
                                                        if (marker.data.type == "home") {
                                                            var elHome = document.createElement("div");
                                                            elHome.className = "marker-pin animated fadeIn";
                                                            new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"](elHome)
                                                                .setLngLat(marker.geometry.coordinates)
                                                                .setPopup(new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Popup"]({ offset: 25 }).setHTML("<h3>" +
                                                                marker.data.title +
                                                                "</h3><p>" +
                                                                marker.data.description +
                                                                "</p>"))
                                                                .addTo(map);
                                                        }
                                                    });
                                                }, function (error) {
                                                    _this.helper.presentToast("Não foi possível carregar o mapa no momento.");
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }).catch(function (error) {
                            console.log('Error getting location', error);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NeighboorsPage.prototype, "mapElement", void 0);
    NeighboorsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-neighboors',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/neighboors/neighboors.html"*/'<ion-header>\n  <ion-navbar >\n    <ion-title>{{ location }}</ion-title>\n  </ion-navbar> \n</ion-header>\n<ion-content padding class="gray menuios" (ionScroll)="scrolling($event)">\n      <div class="main-home">\n        <!-- <div class="map-content">\n          <div #map id="map"></div>\n        </div>\n        <button class="btn-back" ion-button icon-only (click)="goBack()">\n          <ion-icon name="arrow-back" color="amarelo"></ion-icon>\n        </button> -->\n          <div class="suggestions">\n            <h4 class="suggestions-h4">Próximos de Você</h4>\n            <div class="listprops">\n              <div *ngFor="let pro of ARR_ITEMS" class="thumb-content" (click)="propertyPage(pro.proid);">\n                <div class="img-thumb" [style.background-image]="\'url(\' + pro.urlimage + \')\'"></div>\n                <div class="category"> {{ pro.alias }}</div>\n                  <div class="thumb-details">\n                    <div class="location"> {{ pro.neighboor }}</div>\n                    <div class="modality">{{ pro.modality }}</div>\n                    <div class="price">R$ {{ pro.price }}</div>\n                    <div class="group-icons">\n                      <div class="icons">\n                        <div class="area"><div class="icon-home-h"></div></div>\n                        <div class="measure">{{ pro.area }} m²</div>\n                      </div>\n                      <div class="icons">\n                        <div class="area"><div class="icon-home-b"></div></div>\n                        <div class="measure">{{ pro.rooms }}</div>\n                      </div>\n                      <div class="icons">\n                        <div class="area"><div [class]="pro.icons"></div></div>\n                        <div class="measure">{{ pro.types }}</div>\n                      </div>\n                    </div> \n                  </div>\n              </div>\n            </div>\n          </div>\n      </div>    \n  </ion-content>\n  '/*ion-inline-end:"/var/www/html/imobi_places/src/pages/neighboors/neighboors.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_8__providers_property__["a" /* PropertyProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], NeighboorsPage);
    return NeighboorsPage;
}());

//# sourceMappingURL=neighboors.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_property__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__details_details__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var FavoritesPage = /** @class */ (function () {
    //directionsService = new google.maps.DirectionsService();
    //directionsDisplay = new google.maps.DirectionsRenderer();
    function FavoritesPage(navParams, statusBar, navCtrl, helper, googleMaps, platform, global, zone, launchNavigator, geolocation, property) {
        var _this = this;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.helper = helper;
        this.googleMaps = googleMaps;
        this.platform = platform;
        this.global = global;
        this.zone = zone;
        this.launchNavigator = launchNavigator;
        this.geolocation = geolocation;
        this.property = property;
        this.ARR_ITEMS = [];
        this.goToStore = function (address) {
            _this.zone.run(function () {
                var options = {
                    appSelection: {
                        dialogHeaderText: "Navegar até o local usando...",
                        cancelButtonText: "Cancelar",
                        rememberChoice: {
                            enabled: false,
                            prompt: {
                                headerText: "Navegar até o local",
                                bodyText: "Utilizar este App na próxima vez?",
                                yesButtonText: "SIM",
                                noButtonText: "NÃO"
                            }
                        }
                    }
                };
                _this.launchNavigator.navigate(address, options)
                    .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
            });
        };
        this.near = this.navParams.get('near');
        window.angularComponent = { goToStore: this.goToStore, zone: zone, navCtrl: this.navCtrl, openProperty: this.openProperty };
        this.infoWindows = [];
        this.coordinate = {
            latitude: '',
            longitude: ''
        };
    }
    FavoritesPage.prototype.scrolling = function (event) {
        //var elmnt = document.getElementsByTagName("ion-header")[0];
        // const sheet = new CSSStyleSheet();
        //sheet.insertRule('#target {color: darkseagreen}');
        // elmnt.innerHTML = sheet;
    };
    FavoritesPage.prototype.openProperty = function (proid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__details_details__["a" /* DetailsPage */], { proid: proid });
    };
    FavoritesPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    FavoritesPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var checkFavourites, getFavourites, a, jsonFavs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.favs = "";
                        checkFavourites = localStorage.getItem('favourites');
                        if (checkFavourites != null) {
                            getFavourites = checkFavourites.split(",");
                            for (a = 0; a < getFavourites.length; a++) {
                                if (getFavourites[a] != 'null' && getFavourites[a] != 'undefined' && getFavourites[a] != '' &&
                                    getFavourites[a] != null && getFavourites[a] != undefined && getFavourites[a].substring(0, 4) != 'null') {
                                    this.favs += getFavourites[a] + ',';
                                }
                            }
                        }
                        else {
                            this.favs = '0';
                        }
                        jsonFavs = { favs: this.favs };
                        return [4 /*yield*/, this.helper.showLoading("Aguarde")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.property.getHighlights(jsonFavs).subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.ARR_ITEMS = data;
                                            return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.helper.hideLoading()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.helper.presentToast("Imóvel não localizado ou indisponível.")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FavoritesPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.initMap();
        });
    };
    FavoritesPage.prototype.initMap = function () {
        var _this = this;
        var map = this.googleMaps.create(this.mapElement.nativeElement);
        map.one(__WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function (data) {
            _this.geolocation.getCurrentPosition()
                .then(function (resp) {
                _this.coordinate.latitude = resp.coords.latitude;
                _this.coordinate.longitude = resp.coords.longitude;
                var coordinates = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["d" /* LatLng */](resp.coords.latitude, resp.coords.longitude);
                var position = {
                    target: coordinates,
                    zoom: 14
                };
                map.animateCamera(position);
                var markerOptions = {
                    position: coordinates,
                    icon: "assets/icon/v2/home_ico_marker.png",
                    title: 'Sua localização'
                };
                var marker = map.addMarker(markerOptions)
                    .then(function (marks) {
                    //marks.showInfoWindow();
                });
                _this.getMarkers(map);
            }).catch(function (error) {
                _this.helper.presentToast('Erro ao recuperar sua posição');
            });
        });
    };
    FavoritesPage.prototype.closeAllInfoWindows = function () {
        for (var _i = 0, _a = this.infoWindows; _i < _a.length; _i++) {
            var window_1 = _a[_i];
            window_1.close();
        }
    };
    FavoritesPage.prototype.getMarkers = function (map) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.property.getDiscover(this.coordinate).subscribe(function (res) {
                            res.forEach(function (mark) {
                                _this.addMarkersToMap(mark.data, map);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FavoritesPage.prototype.addMarkersToMap = function (mark, map) {
        var _this = this;
        if (mark !== null) {
            var coordinates = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["d" /* LatLng */](mark.latitude, mark.longitude);
            var markerOptions = {
                position: coordinates,
                icon: "assets/icon/v2/home_ico_yellow_marker.png",
                proid: mark.proid,
                urlimage: mark.urlimage,
                //animation: google.maps.Animation.DROP,
                address: "blabla"
            };
            var marks = map.addMarker(markerOptions)
                .then(function (marca) {
                //mark.showInfoWindow();
                _this.addInfoWindowToMarker(marca, mark);
            });
        }
    };
    FavoritesPage.prototype.addInfoWindowToMarker = function (mark, marker) {
        var _this = this;
        var infoWindowContent = '<img border: 1vw solid white; style="z-index: 100000; width: 20vw; height: 20vw; border-radius: 10vw; position: fixed; left: calc(50% - 10vw); top: -58vw; border: 2px aliceblue solid" src="' + marker.urlimage + '">' +
            '<p style="color: black; font-size: 3vw; margin-left: 0; width: 99%; margin-right: 10px;"><br><br><strong>' + marker.title + '</strong></p>' +
            '<p style="color: black; margin-left: 0; width: 99%; margin-right: 10px;"><br>' + marker.address + '</p>' +
            '<p onclick="window.angularComponent.openProperty(' + marker.proid + ')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -2vw;">VER IMÓVEL</p>' +
            '<p onclick="window.angularComponent.goToStore(\'' + marker.address + '\')" style="margin-left: 0; font-size: 2.5vw; margin-right: 10px; border-radius: 5px; background-color:#3599d5; text-align: center; line-height: 35px; max-width: 99%; vertical-align: middle; color: white; font-weight:bold; position: relative; top: -3vw;">IR ATÉ LÁ</p>';
        var infoWindow = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["c" /* HtmlInfoWindow */]();
        infoWindow.setContent(infoWindowContent, { width: "280px", height: "40vw", "border-radius": "10px", border: "2px aliceblue solid" });
        mark.on(__WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK).subscribe(function () {
            _this.closeAllInfoWindows();
            infoWindow.open(mark);
        });
        this.infoWindows.push(infoWindow);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], FavoritesPage.prototype, "mapElement", void 0);
    FavoritesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-favorites',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/favorites/favorites.html"*/'<ion-content padding class="gray menuios" (ionScroll)="scrolling($event)">\n      <div class="main-home">\n        <div class="map-content">\n          <div #map id="map"></div>\n        </div>\n        <button class="btn-back" ion-button icon-only (click)="goBack()">\n          <ion-icon name="arrow-back" color="amarelo"></ion-icon>\n        </button>\n          <div class="suggestions">\n            <h4 class="suggestions-h4">Favoritos</h4>\n            <div class="listprops">\n              <div *ngFor="let pro of ARR_ITEMS" class="thumb-content" (click)="openProperty(pro.proid);">\n                <div class="img-thumb" [style.background-image]="\'url(\' + pro.urlimage + \')\'"></div>\n                <div class="category"> {{ pro.alias }}</div>\n                  <div class="thumb-details">\n                    <div class="location"> {{ pro.neighboor }}</div>\n                    <div class="modality">{{ pro.modality }}</div>\n                    <div class="price">R$ {{ pro.price }}</div>\n                    <div class="group-icons">\n                      <div class="icons">\n                        <div class="area"><div class="icon-home-h"></div></div>\n                        <div class="measure">{{ pro.area }} m²</div>\n                      </div>\n                      <div class="icons">\n                        <div class="area"><div class="icon-home-b"></div></div>\n                        <div class="measure">{{ pro.rooms }}</div>\n                      </div>\n                      <div class="icons">\n                        <div class="area"><div [class]="pro.icons"></div></div>\n                        <div class="measure">{{ pro.types }}</div>\n                      </div>\n                    </div> \n                  </div>\n              </div>\n            </div>\n          </div>\n      </div>    \n  </ion-content>\n  '/*ion-inline-end:"/var/www/html/imobi_places/src/pages/favorites/favorites.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__providers_property__["a" /* PropertyProvider */]])
    ], FavoritesPage);
    return FavoritesPage;
}());

//# sourceMappingURL=favorites.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(408);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_locales_pt__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_brmasker_ionic_3__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_deeplinks__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_details_gallery_carrousel__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_filter_filter__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_login_login__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_zbar__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_launch_navigator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_onesignal__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_sociallogin_sociallogin__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_signup_signup__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_signup_signup2__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_splash_splash__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_myaction_myaction__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_schedule_schedule__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_signup__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_categories__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_modalities__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_discover_discover__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_details_details__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_positions__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_property_property__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_property_property2__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_property_property3__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_property_property4__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_property__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers_schedule__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__providers_brokers__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_background_mode__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_terms_terms__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_neighboors_neighboors__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_google_maps__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_favorites_favorites__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_form_list_form_list__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_msg_success_msg_success__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__providers_waitinglist__ = __webpack_require__(377);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















































Object(__WEBPACK_IMPORTED_MODULE_6__angular_common__["i" /* registerLocaleData */])(__WEBPACK_IMPORTED_MODULE_7__angular_common_locales_pt__["a" /* default */]);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_28__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_myaction_myaction__["a" /* MyActionPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_sociallogin_sociallogin__["a" /* SocialLoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_signup_signup2__["a" /* Signup2Page */],
                __WEBPACK_IMPORTED_MODULE_38__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_property_property2__["a" /* Property2Page */],
                __WEBPACK_IMPORTED_MODULE_40__pages_property_property3__["a" /* Property3Page */],
                __WEBPACK_IMPORTED_MODULE_41__pages_property_property4__["a" /* Property4Page */],
                __WEBPACK_IMPORTED_MODULE_34__pages_discover_discover__["a" /* DiscoverPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_neighboors_neighboors__["a" /* NeighboorsPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_details_gallery_carrousel__["a" /* Carrousel */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_filter_filter__["a" /* Filter */],
                __WEBPACK_IMPORTED_MODULE_50__pages_form_list_form_list__["a" /* FormListPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_msg_success_msg_success__["a" /* MsgSuccessPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8_brmasker_ionic_3__["a" /* BrMaskerModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    locationStrategy: 'path',
                }, {
                    // DeepLinker
                    links: [
                        { component: __WEBPACK_IMPORTED_MODULE_35__pages_details_details__["a" /* DetailsPage */], name: 'Details', segment: 'portal/property/:qrcode' },
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_28__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_myaction_myaction__["a" /* MyActionPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_sociallogin_sociallogin__["a" /* SocialLoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_property_property2__["a" /* Property2Page */],
                __WEBPACK_IMPORTED_MODULE_40__pages_property_property3__["a" /* Property3Page */],
                __WEBPACK_IMPORTED_MODULE_41__pages_property_property4__["a" /* Property4Page */],
                __WEBPACK_IMPORTED_MODULE_26__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_signup_signup2__["a" /* Signup2Page */],
                __WEBPACK_IMPORTED_MODULE_34__pages_discover_discover__["a" /* DiscoverPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_neighboors_neighboors__["a" /* NeighboorsPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_details_gallery_carrousel__["a" /* Carrousel */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_filter_filter__["a" /* Filter */],
                __WEBPACK_IMPORTED_MODULE_50__pages_form_list_form_list__["a" /* FormListPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_msg_success_msg_success__["a" /* MsgSuccessPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_zbar__["a" /* ZBar */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_deeplinks__["a" /* Deeplinks */],
                __WEBPACK_IMPORTED_MODULE_25__providers_global__["a" /* Global */],
                __WEBPACK_IMPORTED_MODULE_24__providers_token__["a" /* TokenProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_categories__["a" /* CategoriesProvider */],
                __WEBPACK_IMPORTED_MODULE_33__providers_modalities__["a" /* ModalitiesProvider */],
                __WEBPACK_IMPORTED_MODULE_44__providers_brokers__["a" /* BrokersProvider */],
                __WEBPACK_IMPORTED_MODULE_37__providers_positions__["a" /* PositionsProvider */],
                __WEBPACK_IMPORTED_MODULE_42__providers_property__["a" /* PropertyProvider */],
                __WEBPACK_IMPORTED_MODULE_43__providers_schedule__["a" /* ScheduleProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_login__["a" /* LoginProvider */],
                __WEBPACK_IMPORTED_MODULE_31__providers_signup__["a" /* SignupProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_helper__["a" /* HelperProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* LOCALE_ID */], useValue: 'pt-BR' },
                __WEBPACK_IMPORTED_MODULE_52__providers_waitinglist__["a" /* WaitinglistProvider */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_15" /* enableProdMode */])();
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_launch_navigator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_property__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__gallery_carrousel__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_schedule__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













__WEBPACK_IMPORTED_MODULE_10_moment__["locale"]('pt-br');
var DetailsPage = /** @class */ (function () {
    function DetailsPage(navCtrl, navParams, geoloc, launchNavigator, property, sp, global, helper, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geoloc = geoloc;
        this.launchNavigator = launchNavigator;
        this.property = property;
        this.sp = sp;
        this.global = global;
        this.helper = helper;
        this.modalCtrl = modalCtrl;
        this.ARR_ITEMS = [];
        this._showSchedule = false;
        this._checkingPosition = true;
        this._disableVisit = true;
        this._findByPropertyId = null;
        this._findByQRCode = null;
        this._brokerInProgress = false;
        this._showMapWhenPropertyIsIdle = false;
        this.favoriteColor = "amarelo";
        this.isFav = false;
        this.retFavourites = null;
        this.parseFavourites = null;
        this._colorChanges = true;
        this.precheck = __WEBPACK_IMPORTED_MODULE_10_moment__();
        this.verifyHour = this.precheck.format('HH');
        this.add_day = (parseInt(this.verifyHour) > 17 ? 1 : 0);
        this.check = __WEBPACK_IMPORTED_MODULE_10_moment__().add(this.add_day, 'days');
        this.month = this.check.format('MM');
        this.monthName = this.check.format('MMMM');
        this.day = this.check.format('DD');
        this.year = this.check.format('YYYY');
        this.hour = this.check.format('HH:mm');
        this.currentWeekDay = __WEBPACK_IMPORTED_MODULE_10_moment__["weekdays"](true)[this.check.isoWeekday()];
    }
    DetailsPage.prototype.showLoc = function () {
        var s = document.getElementById('lblsell');
        var p = document.getElementById('lblprice');
        var s_l = document.getElementById('lblloc');
        var p_l = document.getElementById('lblpriceloc');
        s_l.classList.remove('hideloc');
        p_l.classList.remove('hideloc');
        s.classList.add('hideloc');
        p.classList.add('hideloc');
    };
    DetailsPage.prototype.showSell = function () {
        var s = document.getElementById('lblsell');
        var p = document.getElementById('lblprice');
        var s_l = document.getElementById('lblloc');
        var p_l = document.getElementById('lblpriceloc');
        s.classList.remove('hideloc');
        p.classList.remove('hideloc');
        s_l.classList.add('hideloc');
        p_l.classList.add('hideloc');
    };
    DetailsPage.prototype.changePrices = function () {
        var changes = false;
        window.setInterval(function () {
            if (!changes) {
                changes = true;
                var s = document.getElementById('lblsell');
                var p = document.getElementById('lblprice');
                var s_l = document.getElementById('lblloc');
                var p_l = document.getElementById('lblpriceloc');
                s_l.classList.remove('hideloc');
                p_l.classList.remove('hideloc');
                s.classList.add('hideloc');
                p.classList.add('hideloc');
            }
            else {
                changes = false;
                var s = document.getElementById('lblsell');
                var p = document.getElementById('lblprice');
                var s_l = document.getElementById('lblloc');
                var p_l = document.getElementById('lblpriceloc');
                s.classList.remove('hideloc');
                p.classList.remove('hideloc');
                s_l.classList.add('hideloc');
                p_l.classList.add('hideloc');
            }
        }, 7000);
    };
    DetailsPage.prototype.updateScheduleDateTime = function ($event) {
        var populateDT = JSON.parse(JSON.stringify($event));
        console.log(populateDT.day);
        this.month = (populateDT.month < 10 ? "0" + populateDT.month : populateDT.month);
        this.day = (populateDT.day < 10 ? "0" + populateDT.day : populateDT.day);
        this.year = populateDT.year;
        this.hour = (populateDT.hour < 10 ? "0" + populateDT.hour : populateDT.hour) + ":" +
            (populateDT.minute < 10 ? "0" + populateDT.minute : populateDT.minute);
    };
    DetailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this._findByQRCode = this.navParams.get('qrcode');
        this._findByPropertyId = this.navParams.get('proid');
        this.helper.showLoading("Aguarde");
        var getOnlyQRCodeWithoutURL;
        var finalQRCode;
        if (this._findByQRCode != undefined) {
            getOnlyQRCodeWithoutURL = this._findByQRCode.split(/[\s/]+/);
            finalQRCode = getOnlyQRCodeWithoutURL[getOnlyQRCodeWithoutURL.length - 1];
        }
        else {
            finalQRCode = 0;
        }
        var _id = (isNaN(this._findByPropertyId) ? finalQRCode : this._findByPropertyId);
        this.property.getProperty(_id)
            .subscribe(function (data) {
            _this.ARR_ITEMS = data;
            _this.format_description = _this.helper.nl2br(_this.ARR_ITEMS[0].description);
            _this._lnLat = _this.ARR_ITEMS[0].latitude;
            _this._lnLng = _this.ARR_ITEMS[0].longitude;
            _this._proID = _this.ARR_ITEMS[0].proid;
            _this._broID = _this.ARR_ITEMS[0].broid;
            _this._reaID = _this.ARR_ITEMS[0].reaid;
            var brokerInProgress = localStorage.getItem("brokerInProgress");
            var propertyBusy = localStorage.getItem("propertyBusy");
            if (!isNaN(parseInt(brokerInProgress)) && parseInt(brokerInProgress) > 0) {
                _this._brokerInProgress = true;
                if (!isNaN(parseInt(propertyBusy)) && (propertyBusy) == _this._proID) {
                    _this._showMapWhenPropertyIsIdle = true;
                }
                else {
                    _this._showMapWhenPropertyIsIdle = false;
                }
            }
            else {
                _this._brokerInProgress = false;
            }
            if (_this._showMapWhenPropertyIsIdle) {
                _this._disableVisit = false;
                _this._checkingPosition = false;
            }
            else {
                if (_this._brokerInProgress) {
                    _this._disableVisit = true;
                    _this._checkingPosition = false;
                }
                else {
                    _this.geoloc.getCurrentPosition()
                        .then(function (response) {
                        var myPosition = response.coords;
                        var km_visit = _this.global.KM_MINIMUM_LIMIT_VISIT;
                        var km_dist = _this.helper.distance(myPosition.latitude, myPosition.longitude, _this.ARR_ITEMS[0].latitude, _this.ARR_ITEMS[0].longitude, "K");
                        if (km_dist <= km_visit) {
                            var finaldist = (Math.floor(km_dist) == 0 ? "próximo" : Math.floor(km_dist) + "km");
                            _this.helper.presentToast("Você está " + finaldist + " do imóvel.");
                            _this._disableVisit = false;
                            _this._checkingPosition = false;
                        }
                        else {
                            _this._disableVisit = true;
                            _this._checkingPosition = false;
                            _this.helper.presentToast("Você está muito longe do imóvel. Experimente agendar uma visita!");
                        }
                    }).catch(function (error) {
                        _this.helper.presentToast("Sem sinal GPS para verificar sua localização.");
                        _this._checkingPosition = false;
                        _this._disableVisit = true;
                    });
                }
            }
            _this.helper.hideLoading();
            _this.changePrices();
            _this.fav = _id;
            _this.parseFavourites = localStorage.getItem('favourites');
            if (_this.parseFavourites != null) {
                _this.retFavourites = _this.parseFavourites;
                var getFavourites = localStorage.getItem('favourites').split(",");
                for (var a = 0; a < getFavourites.length; a++) {
                    if (getFavourites[a] != null) {
                        if (getFavourites[a] == _id) {
                            _this.isFav = true;
                            _this.favoriteColor = "branco";
                            break;
                        }
                    }
                }
            }
        }, function (error) {
            _this.helper.hideLoading();
            _this.helper.presentToast('Imóvel não localizado ou indisponível.');
        });
    };
    DetailsPage.prototype.goToProperty = function () {
        var options = {
            appSelection: {
                dialogHeaderText: "Navegar até o local usando...",
                cancelButtonText: "Cancelar",
                rememberChoice: {
                    enabled: false,
                    prompt: {
                        headerText: "Navegar até o local",
                        bodyText: "Utilizar este App na próxima vez?",
                        yesButtonText: "SIM",
                        noButtonText: "NÃO"
                    }
                }
            }
        };
        this.launchNavigator.navigate([this._lnLat, this._lnLng], options)
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    DetailsPage.prototype.setPropertyStatus = function (status) {
        var _this = this;
        var lblStatus = (status == 1 ? 'aprovado' : 'reprovado');
        var sendStatus = false;
        var msgStatus = "";
        this.helper.presentConfirm("Atenção", "Confirma marcar este imóvel como" + lblStatus + "?", function (res) {
            if (status == 0) {
                _this.helper.presentPrompt("Imóvel Reprovado", "Informe uma mensagem ao sobre a reprovação do imóvel:", { name: 'msg', type: 'text' }, function (msg) {
                    sendStatus = true;
                    msgStatus = msg;
                });
            }
            else {
                sendStatus = true;
            }
            if (sendStatus) {
                var _id = (isNaN(_this._findByPropertyId) ? _this._findByQRCode : _this._findByPropertyId);
                _this.helper.showLoading('Aguarde');
                _this.property.status({ status: status, msg: msgStatus, proid: _id }).subscribe(function (data) {
                    _this.helper.presentToast("Status alterado com sucesso.");
                    _this.helper.hideLoading();
                }, function (error) {
                    _this.helper.hideLoading();
                    _this.helper.presentToast('Impossível alterar status do imóvel.');
                });
            }
        });
    };
    DetailsPage.prototype.slideNext = function () {
        this.mySlider.slideNext();
    };
    DetailsPage.prototype.slidePrev = function () {
        this.mySlider.slidePrev();
    };
    DetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DetailsPage.prototype.openModal = function (images) {
        var openCarrousel = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__gallery_carrousel__["a" /* Carrousel */], { images: images, currentIndex: this.mySlider.getPreviousIndex() }, { showBackdrop: true, enableBackdropDismiss: true });
        openCarrousel.present();
    };
    DetailsPage.prototype.schedule = function () {
        this._showSchedule = true;
    };
    DetailsPage.prototype.cancel = function () {
        this._showSchedule = false;
    };
    DetailsPage.prototype.favorite = function () {
        var _this = this;
        //this._colorChanges = !this._colorChanges;
        //this.helper.presentToast("Imóvel " + label + " como favorito.");
        if (this.isFav == false) {
            this.isFav = true;
            this.retFavourites += ',' + this.fav;
            this.favoriteColor = "branco";
            setTimeout(function () {
                _this.helper.presentToast("Imóvel marcado como favorito.");
            }, 500);
        }
        else {
            this.isFav = false;
            this.favoriteColor = "amarelo";
            if (this.parseFavourites != null) {
                var getFavourites = localStorage.getItem('favourites');
                this.retFavourites = getFavourites.replace(',' + this.fav, '');
            }
            setTimeout(function () {
                _this.helper.presentToast("Imóvel desmarcado como favorito.");
            }, 500);
        }
        localStorage.removeItem('favourites');
        localStorage.setItem('favourites', this.retFavourites + '');
    };
    DetailsPage.prototype.saveSchedule = function () {
        var _this = this;
        if (localStorage.getItem('logged') !== null) {
            this.helper.showLoading("Verificando disponibilidade");
            var data = {
                broid: this._broID,
                usrid: localStorage.getItem('usrid'),
                reaid: this._reaID,
                proid: this._proID,
                eventdate: this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":00"
            };
            this.sp.saveSchedule(data).subscribe(function (res) {
                setTimeout(function () {
                    _this.helper.presentToast("Agendamento efetuado com sucesso.");
                    _this.helper.hideLoading();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
                }, 3000);
            }, function (err) {
                _this.helper.hideLoading();
                _this.helper.presentToast("Imóvel indisponível para agendamento. Tente outra data!");
            });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__login_login__["a" /* LoginPage */], { type: 1, redirect: "DetailsPage", proid: this._proID });
        }
    };
    DetailsPage.prototype.map = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__maps_maps__["a" /* MapsPage */], { lat: this.ARR_ITEMS[0].latitude,
            lng: this.ARR_ITEMS[0].longitude,
            type: 1,
            pro_id: this.ARR_ITEMS[0].proid,
            rea_id: this.ARR_ITEMS[0].reaid });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('mySlider'),
        __metadata("design:type", Object)
    ], DetailsPage.prototype, "mySlider", void 0);
    DetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-details',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/details/details.html"*/'<ion-content *ngFor="let pro of ARR_ITEMS" class="masters">\n\n    <div class="bg-schedule animated fadeIn" *ngIf="_showSchedule">\n      <div class="schedule">\n        <button class="btn-close" ion-button icon-only (click)="cancel()">\n          <ion-icon name="close" color="amarelo"></ion-icon>\n        </button>\n        <div class="title-schedule">AGENDAR VISITA</div>\n        <div class="title-day-schedule">DIA</div>\n        <div class="title-month-schedule">MÊS</div>\n        <div class="day-schedule">{{day}}</div>\n        <div class="month-schedule">{{month}}</div>\n        <div class="h-line"></div>\n        <div class="title-hour-schedule">HORA</div>\n        <div class="hour-schedule">{{hour}}</div>\n        <ion-datetime #myPicker\n                      displayFormat="DD/MM/YYYY HH:mm" \n                      (ionChange)="updateScheduleDateTime(myPicker.value)"\n                      hourValues="8,9,10,11,12,13,14,15,16,17,18,19" \n                      cancelText="Cancelar" \n                      doneText="OK" \n                      [(ngModel)]="myDateSelected"></ion-datetime>\n        <div class="btn-schedule">\n          <button id="btw" type="button" ion-button (click)=\'saveSchedule();\'>\n            CONFIRMAR\n          </button>\n        </div>\n      </div>\n    </div>\n\n        <button class="btn-back" ion-button icon-only (click)="goBack()">\n          <ion-icon name="arrow-back" color="amarelo"></ion-icon>\n        </button>\n        <ion-slides paginationClickable=true\n                    initialSlide=0\n                    loop=true\n                    autoplay=5000\n                    speed=2000\n                    #mySlider>\n          <ion-slide *ngFor="let item of pro.images" class="home-slide">\n            <div class="img-slide" [style.background-image]="\'url(\' + item.urlimage + \')\'"></div>\n          </ion-slide>\n        </ion-slides>\n        <div class="swiper-button-next" (click)="slideNext()"></div>\n        <div class="swiper-button-prev" (click)="slidePrev()"></div>\n        \n        <div id="tv"></div>\n        <div class="prop-details">\n          <button class="btn-route" ion-button icon-only (click)="goToProperty();">\n            <ion-icon name="compass" class="fav-icon" color="amarelo"></ion-icon>\n          </button>\n          <button class="btn-fav" ion-button (click)="favorite()" icon-only>\n            <ion-icon name="heart" class="fav-icon" color="{{favoriteColor}}" ></ion-icon>\n          </button>\n          <button class="btn-zoom" (click)="openModal(pro.images)" ion-button icon-only>\n            <ion-icon name="search" class="fav-icon" color="amarelo"></ion-icon>\n          </button>\n          <div class="start-scroll"></div>\n\n          <div class="scroll-details">\n\n              <div class="prop-cat">{{ pro.alias }}</div>\n              <div class="prop-location"> {{ pro.neighboor }}</div>\n              <div class="title-description"><strong>Descrição</strong></div>\n              <div class="details-description2"[innerHTML]="\'Visitas: \' + pro.visitdates"></div>\n              <div class="details-description" [innerHTML]="pro.description"></div>\n\n              <div class="group-icons">\n                <div class="icons">\n                  <div class="area"><div class="icon-home-h"></div></div>\n                  <div class="measure">{{ pro.area }} m²</div>\n                </div>\n                <div class="icons">\n                  <div class="area"><div class="icon-home-b"></div></div>\n                  <div class="measure">{{ pro.rooms }}</div>\n                </div>\n                <div class="icons">\n                  <div class="area"><div [class]="pro.icons"></div></div>\n                  <div class="measure">{{ pro.types }}</div>\n                </div>\n              </div>\n\n              <div class="group-details">\n                  <div class="details"> \n                    <div class="tax">\n                      <span>{{ pro.title }},</span>\n                      <span *ngIf="pro.bathrooms > 0">contendo {{ pro.bathrooms }} banheiro(s), </span>\n                      <span *ngIf="pro.garage > 0">com {{ pro.garage }} vaga(s) de garagem, </span>\n                      <span *ngIf="pro.furniture == 1">mobiliado,</span>\n                      <span *ngIf="pro.occupied == 1">encontra-se ocupado no momento,</span>\n                      <span *ngIf="pro.concierge > 0">com portaria {{ pro.concierge }},</span>\n                      <span *ngIf="pro.modid == 1 && pro.iptu > 0">o valor do IPTU &eacute; de {{ pro.iptu | currency: \'R$\' : \'symbol\' : \'1.2-2\' : \'pt\' }}</span>\n                      <span *ngIf="pro.modid == 1 && pro.tax > 0">o valor do condom&iacute;nio &eacute; de {{ pro.tax | currency: \'R$\' : \'symbol\' : \'1.2-2\' : \'pt\' }}</span>\n                      <span>esperando pela sua visita!</span>\n                    </div>\n                  </div>\n                 \n                  <div class="details broker-width">\n                    <div class="group-broker" *ngIf="pro.broid > 0">\n                      <div class="img-broker" [style.background-image]="\'url(\' + pro.imgbroker + \')\'"></div>\n                      <div class="name-broker"><strong>CORRETOR</strong><br>{{ pro.broker }}</div>\n                    </div>\n                    <div class="group-broker" *ngIf="pro.reaid > 0">\n                      <div class="img-realestate" [style.background-image]="\'url(\' + pro.imgrealestate + \')\'"></div>\n                      <div class="name-realestate"><strong>IMOBILIARIA</strong><br>{{ pro.realestate }}</div>\n                    </div>\n                  </div>\n                </div>\n              <div id="lblsell" class="modality animated fadeIn" (click)="showLoc()">Venda</div>\n              <div id="lblprice" class="price animated fadeIn" (click)="showLoc()">R$ {{ pro.price }}</div>\n              <div id="lblloc" class="modalityloc hideloc animated fadeIn" *ngIf="pro.priceloc > 0" (click)="showSell()">Loca&ccedil;&atilde;o</div>\n              <div id="lblpriceloc" class="priceloc hideloc animated fadeIn" *ngIf="pro.priceloc > 0" (click)="showSell()">R$ {{ pro.priceloc }}</div>\n          </div>\n        </div>\n        \n</ion-content>\n<div *ngIf="!_showSchedule" class="end-scroll"></div>\n<div *ngIf="!_showSchedule" class="btn-actions">\n  <button class="bt" type="button" ion-button (click)=\'schedule();\'>\n    AGENDAR\n  </button>\n  <div *ngIf="_checkingPosition" class="visit-loading"><img src="../../assets/imgs/loading.gif"></div>\n  <button class="bt" [disabled]="_disableVisit" type="button" ion-button (click)=\'map();\'>\n    VER AGORA\n  </button>\n  <div *ngIf="_isRealEstate">\n    <button class="btg" type="button" ion-button (click)=\'setPropertyStatus(1);\'>\n      APROVAR\n    </button>\n    <button class="btr" type="button" ion-button (click)=\'setPropertyStatus(0);\'>\n      REPROVAR\n    </button>\n  </div>\n</div>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/details/details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_7__providers_property__["a" /* PropertyProvider */],
            __WEBPACK_IMPORTED_MODULE_12__providers_schedule__["a" /* ScheduleProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_2__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], DetailsPage);
    return DetailsPage;
}());

//# sourceMappingURL=details.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PropertyProvider = /** @class */ (function () {
    function PropertyProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    PropertyProvider.prototype.getHighlights = function (filter, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        if (filter) {
            return this.http
                .post(this.globals.getBaseUrl() + '/highlights', filter, expandedHeaders)
                .timeout(15000)
                .map(function (res) { return res.filters; });
        }
        return this.http
            .get(this.globals.getBaseUrl() + '/highlights', expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.highlights; });
    };
    PropertyProvider.prototype.getSearchedNeighboors = function (neighboor, city, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/search-neighboors/' + neighboor + '/' + city, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res; });
    };
    PropertyProvider.prototype.listProperty = function (reaid, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/property/reaid/' + reaid, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.property; });
    };
    PropertyProvider.prototype.getProperty = function (proid, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/property/' + proid, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.property; });
    };
    PropertyProvider.prototype.getNeighboors = function (match, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/neighboors/' + match, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res; });
    };
    PropertyProvider.prototype.save = function (reg, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .post(this.globals.getBaseUrl() + '/property', reg, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res; });
    };
    PropertyProvider.prototype.status = function (reg, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .put(this.globals.getBaseUrl() + '/property-status', reg, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res; });
    };
    PropertyProvider.prototype.getDiscover = function (coordinate, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        var urlParam = (coordinate !== null ? coordinate.latitude + "/" + coordinate.longitude : "0/0");
        return this.http
            .get(this.globals.getBaseUrl() + '/discover/' + urlParam, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.features; });
    };
    PropertyProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], PropertyProvider);
    return PropertyProvider;
}());

//# sourceMappingURL=property.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_background_mode__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_splash_splash__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_myaction_myaction__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_positions__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_brokers__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_deeplinks__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_details_details__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


















var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, app, splashScreen, network, deeplinks, modalCtrl, 
        //private viewCtrl: ViewController,
        global, helper, backgroundMode, position, broker, geolocation, oneSignal) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.app = app;
        this.splashScreen = splashScreen;
        this.network = network;
        this.deeplinks = deeplinks;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.helper = helper;
        this.backgroundMode = backgroundMode;
        this.position = position;
        this.broker = broker;
        this.geolocation = geolocation;
        this.oneSignal = oneSignal;
        this._svTitle = "";
        this._svType = null;
        this._svIcon = "pin";
        this._svDate = "";
        this._svView = "broker";
        this._svAddress = "";
        this._svKm = "";
        this._svButton = "ACEITAR";
        this._payload = null;
        this._notificationOpened = false;
        this.appStart();
    }
    MyApp.prototype.appStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var splash, isLogged;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _a.sent();
                        this.initDeepLinks();
                        this.initOneSignal();
                        this.updateConnectionStatus();
                        this.network.onchange().subscribe(function () { return _this.updateConnectionStatus(); });
                        splash = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__pages_splash_splash__["a" /* SplashPage */]);
                        splash.present();
                        isLogged = localStorage.getItem("logged");
                        if (isLogged != 'email' /* gmail, facebook*/) {
                            setTimeout(function () { _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_myaction_myaction__["a" /* MyActionPage */]; }, 3000);
                        }
                        else {
                            this.getBrokerPositions();
                            //alert(this.viewCtrl.name);
                            setTimeout(function () { _this.rootPage = __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */]; }, 3000);
                        }
                        if (this.platform.is('cordova')) {
                            this.statusBar.overlaysWebView(false);
                            this.statusBar.styleBlackOpaque();
                            this.statusBar.backgroundColorByHexString('#3599d5');
                            this.splashScreen.hide();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.initDeepLinks = function () {
        this.deeplinks.routeWithNavController(this.navChild, {
            '/portal/property/:qrcode': __WEBPACK_IMPORTED_MODULE_16__pages_details_details__["a" /* DetailsPage */],
        }).subscribe(function (match) {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            //alert('Native route' + JSON.stringify(match));
        }, function (nomatch) {
            //alert('Got a deeplink that didn\'t match' + JSON.stringify(nomatch));
        });
    };
    MyApp.prototype.getBrokerPositions = function () {
        var _this = this;
        var timer = window.setInterval(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var broid, sts;
            return __generator(this, function (_a) {
                broid = localStorage.getItem('broid');
                if (!isNaN(parseInt(broid)) && parseInt(broid) > 0) {
                    sts = localStorage.getItem('statusBroker');
                    if (!isNaN(parseInt(sts)) && parseInt(sts) > 0) {
                        this.backgroundMode.enable();
                        this.sendPosition(parseInt(broid));
                    }
                }
                return [2 /*return*/];
            });
        }); }, this.global.SECONDS_LISTEN_POSITION);
    };
    MyApp.prototype.initOneSignal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.oneSignal.startInit('04588e1a-1b4a-46f8-bffa-f6643714d920', '58936741602')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.oneSignal.handleNotificationOpened().subscribe(function (data) { return _this.onPushOpened(data.notification.payload); })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.oneSignal.handleNotificationReceived().subscribe(function (res) { return _this.onPushReceived(res.payload); })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.oneSignal.endInit()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Private method for OneSignal Open Push Notifications
     * type 1 = visit, 2 = schedule
     * @param payload
     */
    MyApp.prototype.onPushReceived = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var res, title, address, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = payload.additionalData;
                        title = payload.title + ", " + payload.body;
                        address = res.address;
                        date = res.date;
                        if (!(res.view == 'broker')) return [3 /*break*/, 3];
                        if (!(res.type == 'visit')) return [3 /*break*/, 2];
                        this._svTitle = title;
                        this._svType = res.type;
                        this._svView = res.view;
                        this._svIcon = 'pin';
                        this._svDate = date;
                        this._svCode = 'selecionado';
                        this._svAddress = address;
                        this._svKm = "22";
                        this._svButton = 'ACEITAR';
                        this._payload = res;
                        return [4 /*yield*/, this.showPopupScheduleVisit()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 2: return [3 /*break*/, 7];
                    case 3:
                        if (!(res.type == 'visit')) return [3 /*break*/, 7];
                        if (!(res.status == 1)) return [3 /*break*/, 5];
                        this._svTitle = title;
                        this._svType = res.type;
                        this._svView = res.view;
                        this._svIcon = 'pin';
                        this._svDate = date;
                        this._svCode = 'selecionado';
                        this._svAddress = address;
                        this._svKm = "22";
                        this._svButton = 'VISUALIZAR';
                        this._payload = res;
                        localStorage.setItem("brokerInProgress", res.broid);
                        localStorage.setItem("propertyBusy", res.proid);
                        return [4 /*yield*/, this.showPopupScheduleVisit()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.helper.presentToast(title);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Private method for OneSignal Open Push Notifications
     * works only if User open push by buttons on Notification
     * @param payload
     */
    MyApp.prototype.onPushOpened = function (payload) {
        var _this = this;
        var res = payload.additionalData;
        this._notificationOpened = true;
        if (res.view == 'broker') {
            if (res.type == 'visit') {
                var _custom = JSON.parse(payload.rawPayload);
                var status = (_custom.actionSelected == "bt_1" ? 1 : 0);
                var data = { broid: res.broid,
                    proid: res.proid,
                    reaid: res.reaid,
                    usrid: res.usrid,
                    status: status };
                this.broker.saveBrokerIncoming(data).subscribe(function (result) {
                    if (status == 1) {
                        _this.helper.presentAlert("Atenção", "Dirija-se ao imóvel solicitado pelo usuário " + res.address);
                        _this._notificationOpened = false;
                    }
                }, function (error) {
                    _this.helper.presentToast("O usuário cancelou a solicitação de visita.");
                    _this._notificationOpened = false;
                });
            }
            else {
                //schedule control
                this._notificationOpened = false;
            }
        }
        else {
            var _custom = JSON.parse(payload.rawPayload);
            var status = (_custom.actionSelected == "bt_1" ? 1 : 0);
            if (res.type == 'visit') {
                if (status == 1) {
                    this._notificationOpened = false;
                    localStorage.setItem("brokerInProgress", res.broid);
                    localStorage.setItem("propertyBusy", res.proid);
                    var nav = this.app.getRootNav();
                    nav.push(__WEBPACK_IMPORTED_MODULE_10__pages_maps_maps__["a" /* MapsPage */], { lat: res.latitude,
                        lng: res.longitude,
                        type: 1,
                        pro_id: res.proid,
                        rea_id: res.reaid });
                }
            }
            else {
                //schedule control
                if (status == 1) {
                    this._notificationOpened = false;
                }
            }
        }
    };
    MyApp.prototype.updateConnectionStatus = function () {
        this.helper.isConnected =
            this.network.type &&
                (this.network.type === '3g' || this.network.type === '4g' || this.network.type === 'wifi');
    };
    MyApp.prototype.sendPosition = function (broid) {
        var _this = this;
        this.geolocation.getCurrentPosition()
            .then(function (response) {
            var myPosition = response.coords;
            var data = { broid: broid, latitude: myPosition.latitude, longitude: myPosition.longitude };
            _this.position.brokerPosition(data).subscribe(function (data) {
            }, function (error) {
                _this.helper.presentToast("Sem sinal GPS para enviar sua localização.");
            });
        }).catch(function (error) {
            _this.helper.presentToast("Sem sinal GPS para buscar sua localização.");
        });
    };
    MyApp.prototype.showPopupScheduleVisit = function () {
        var s_v = document.getElementById('schedules_visits');
        s_v.classList.remove('hide-bg');
    };
    MyApp.prototype.closePopupScheduleVisit = function (type, view) {
        this.skipSV(type, view);
    };
    MyApp.prototype.skipSV = function (type, view) {
        var _this = this;
        if (type == 'visit') {
            if (view == 'broker') {
                var data = { broid: this._payload.broid,
                    proid: this._payload.proid,
                    reaid: this._payload.reaid,
                    usrid: this._payload.usrid,
                    status: 0 }; //status dinamico
                this.broker.saveBrokerIncoming(data).subscribe(function (res) {
                    var s_v = document.getElementById('schedules_visits');
                    s_v.classList.add('hide-bg');
                    //redirect to map
                    //start chrono
                    //open right tab
                    /*  let nav = this.app.getRootNav();
                     nav.push(MapsPage, {lat: this._payload.latitude,
                                         lng: this._payload.longitude,
                                         type: 1,
                                         pro_id: this._payload.proid,
                                         rea_id: this._payload.reaid}); */
                }, function (error) {
                    var s_v = document.getElementById('schedules_visits');
                    s_v.classList.add('hide-bg');
                    _this.helper.presentToast("Falha ao responder sua localização.");
                });
            }
            else {
                //alert('cancela a visita apos o corretor avisar');
                var s_v = document.getElementById('schedules_visits');
                s_v.classList.add('hide-bg');
            }
        }
        else {
        }
    };
    MyApp.prototype.agreeSV = function (type, view) {
        var _this = this;
        if (type == 'visit') {
            if (view == 'broker') {
                var data = { broid: this._payload.broid,
                    proid: this._payload.proid,
                    reaid: this._payload.reaid,
                    usrid: this._payload.usrid,
                    status: 1 };
                this.broker.saveBrokerIncoming(data).subscribe(function (res) {
                    var s_v = document.getElementById('schedules_visits');
                    s_v.classList.add('hide-bg');
                }, function (error) {
                    _this.helper.presentToast("Falha ao responder sua localização.");
                    var s_v = document.getElementById('schedules_visits');
                    s_v.classList.add('hide-bg');
                });
            }
            else {
                var s_v = document.getElementById('schedules_visits');
                s_v.classList.add('hide-bg');
                localStorage.setItem("brokerInProgress", this._payload.broid);
                localStorage.setItem("propertyBusy", this._payload.proid);
                var nav = this.app.getRootNav();
                nav.push(__WEBPACK_IMPORTED_MODULE_10__pages_maps_maps__["a" /* MapsPage */], { lat: this._payload.latitude,
                    lng: this._payload.longitude,
                    type: 1,
                    pro_id: this._payload.proid,
                    rea_id: this._payload.reaid });
            }
        }
        else {
            //schedule control
            if (view == 'broker') {
            }
            else {
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "navChild", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/var/www/html/imobi_places/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n<div class="bg-wizard">\n    \n</div>\n\n<div id="schedules_visits" class="bg-broker-schedule-visit hide-bg">\n    <div class="bg-broker-content">\n        <ion-icon class="close-schedule-visit" color="branco" name="close-circle" (click)="closePopupScheduleVisit(_svType, _svView)"></ion-icon>\n        <div class="calendar">\n            <ion-icon class="calendar-size" [name]="_svIcon" color="branco"></ion-icon>\n            <ion-icon *ngIf="_svType == 2" class="check-size" name="checkmark-circle" color="branco"></ion-icon>\n          </div>\n        <div class="msg-calendar">\n            {{ _svTitle }}<br>\n            {{ _svDate }}<br><!-- \n            para o imóvel {{ _svCode }}<br>\n            <strong>{{ _svAddress }}</strong><br>\n            à {{ _svKm }}km de você! -->\n        </div>\n        <div class="btn-schedule-visit">\n            <button id="btc" type="button" ion-button (click)=\'skipSV(_svType, _svView);\'>\n              CANCELAR\n            </button>\n            <button id="btw" type="button" ion-button (click)=\'agreeSV(_svType, _svView);\'>\n              {{ _svButton }}\n            </button>\n          </div>\n    </div>\n</div>'/*ion-inline-end:"/var/www/html/imobi_places/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_deeplinks__["a" /* Deeplinks */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_13__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_7__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_11__providers_positions__["a" /* PositionsProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_brokers__["a" /* BrokersProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginProvider = /** @class */ (function () {
    function LoginProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    LoginProvider.prototype.login = function (credentials, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .post(this.globals.getBaseUrl() + '/login', credentials, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res; });
    };
    LoginProvider.prototype.remember = function (email, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/remember/' + email, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data.code; });
    };
    LoginProvider.prototype.savepassword = function (pass, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .put(this.globals.getBaseUrl() + '/savepassword', pass, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data.password; });
    };
    LoginProvider.prototype.userinfo = function (headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http.get(this.globals.getBaseUrl() + '/user-info', expandedHeaders)
            .timeout(30000)
            .map(function (data) { return data.userinfo[0]; });
    };
    LoginProvider.prototype.logout = function () {
        return this.http
            .get(this.globals.getBaseUrl() + '/logout')
            .timeout(15000)
            .do(function (data) { });
    };
    LoginProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], LoginProvider);
    return LoginProvider;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 241,
	"./af.js": 241,
	"./ar": 242,
	"./ar-dz": 243,
	"./ar-dz.js": 243,
	"./ar-kw": 244,
	"./ar-kw.js": 244,
	"./ar-ly": 245,
	"./ar-ly.js": 245,
	"./ar-ma": 246,
	"./ar-ma.js": 246,
	"./ar-sa": 247,
	"./ar-sa.js": 247,
	"./ar-tn": 248,
	"./ar-tn.js": 248,
	"./ar.js": 242,
	"./az": 249,
	"./az.js": 249,
	"./be": 250,
	"./be.js": 250,
	"./bg": 251,
	"./bg.js": 251,
	"./bm": 252,
	"./bm.js": 252,
	"./bn": 253,
	"./bn.js": 253,
	"./bo": 254,
	"./bo.js": 254,
	"./br": 255,
	"./br.js": 255,
	"./bs": 256,
	"./bs.js": 256,
	"./ca": 257,
	"./ca.js": 257,
	"./cs": 258,
	"./cs.js": 258,
	"./cv": 259,
	"./cv.js": 259,
	"./cy": 260,
	"./cy.js": 260,
	"./da": 261,
	"./da.js": 261,
	"./de": 262,
	"./de-at": 263,
	"./de-at.js": 263,
	"./de-ch": 264,
	"./de-ch.js": 264,
	"./de.js": 262,
	"./dv": 265,
	"./dv.js": 265,
	"./el": 266,
	"./el.js": 266,
	"./en-au": 267,
	"./en-au.js": 267,
	"./en-ca": 268,
	"./en-ca.js": 268,
	"./en-gb": 269,
	"./en-gb.js": 269,
	"./en-ie": 270,
	"./en-ie.js": 270,
	"./en-il": 271,
	"./en-il.js": 271,
	"./en-in": 272,
	"./en-in.js": 272,
	"./en-nz": 273,
	"./en-nz.js": 273,
	"./en-sg": 274,
	"./en-sg.js": 274,
	"./eo": 275,
	"./eo.js": 275,
	"./es": 276,
	"./es-do": 277,
	"./es-do.js": 277,
	"./es-us": 278,
	"./es-us.js": 278,
	"./es.js": 276,
	"./et": 279,
	"./et.js": 279,
	"./eu": 280,
	"./eu.js": 280,
	"./fa": 281,
	"./fa.js": 281,
	"./fi": 282,
	"./fi.js": 282,
	"./fil": 283,
	"./fil.js": 283,
	"./fo": 284,
	"./fo.js": 284,
	"./fr": 285,
	"./fr-ca": 286,
	"./fr-ca.js": 286,
	"./fr-ch": 287,
	"./fr-ch.js": 287,
	"./fr.js": 285,
	"./fy": 288,
	"./fy.js": 288,
	"./ga": 289,
	"./ga.js": 289,
	"./gd": 290,
	"./gd.js": 290,
	"./gl": 291,
	"./gl.js": 291,
	"./gom-deva": 292,
	"./gom-deva.js": 292,
	"./gom-latn": 293,
	"./gom-latn.js": 293,
	"./gu": 294,
	"./gu.js": 294,
	"./he": 295,
	"./he.js": 295,
	"./hi": 296,
	"./hi.js": 296,
	"./hr": 297,
	"./hr.js": 297,
	"./hu": 298,
	"./hu.js": 298,
	"./hy-am": 299,
	"./hy-am.js": 299,
	"./id": 300,
	"./id.js": 300,
	"./is": 301,
	"./is.js": 301,
	"./it": 302,
	"./it-ch": 303,
	"./it-ch.js": 303,
	"./it.js": 302,
	"./ja": 304,
	"./ja.js": 304,
	"./jv": 305,
	"./jv.js": 305,
	"./ka": 306,
	"./ka.js": 306,
	"./kk": 307,
	"./kk.js": 307,
	"./km": 308,
	"./km.js": 308,
	"./kn": 309,
	"./kn.js": 309,
	"./ko": 310,
	"./ko.js": 310,
	"./ku": 311,
	"./ku.js": 311,
	"./ky": 312,
	"./ky.js": 312,
	"./lb": 313,
	"./lb.js": 313,
	"./lo": 314,
	"./lo.js": 314,
	"./lt": 315,
	"./lt.js": 315,
	"./lv": 316,
	"./lv.js": 316,
	"./me": 317,
	"./me.js": 317,
	"./mi": 318,
	"./mi.js": 318,
	"./mk": 319,
	"./mk.js": 319,
	"./ml": 320,
	"./ml.js": 320,
	"./mn": 321,
	"./mn.js": 321,
	"./mr": 322,
	"./mr.js": 322,
	"./ms": 323,
	"./ms-my": 324,
	"./ms-my.js": 324,
	"./ms.js": 323,
	"./mt": 325,
	"./mt.js": 325,
	"./my": 326,
	"./my.js": 326,
	"./nb": 327,
	"./nb.js": 327,
	"./ne": 328,
	"./ne.js": 328,
	"./nl": 329,
	"./nl-be": 330,
	"./nl-be.js": 330,
	"./nl.js": 329,
	"./nn": 331,
	"./nn.js": 331,
	"./oc-lnc": 332,
	"./oc-lnc.js": 332,
	"./pa-in": 333,
	"./pa-in.js": 333,
	"./pl": 334,
	"./pl.js": 334,
	"./pt": 335,
	"./pt-br": 336,
	"./pt-br.js": 336,
	"./pt.js": 335,
	"./ro": 337,
	"./ro.js": 337,
	"./ru": 338,
	"./ru.js": 338,
	"./sd": 339,
	"./sd.js": 339,
	"./se": 340,
	"./se.js": 340,
	"./si": 341,
	"./si.js": 341,
	"./sk": 342,
	"./sk.js": 342,
	"./sl": 343,
	"./sl.js": 343,
	"./sq": 344,
	"./sq.js": 344,
	"./sr": 345,
	"./sr-cyrl": 346,
	"./sr-cyrl.js": 346,
	"./sr.js": 345,
	"./ss": 347,
	"./ss.js": 347,
	"./sv": 348,
	"./sv.js": 348,
	"./sw": 349,
	"./sw.js": 349,
	"./ta": 350,
	"./ta.js": 350,
	"./te": 351,
	"./te.js": 351,
	"./tet": 352,
	"./tet.js": 352,
	"./tg": 353,
	"./tg.js": 353,
	"./th": 354,
	"./th.js": 354,
	"./tl-ph": 355,
	"./tl-ph.js": 355,
	"./tlh": 356,
	"./tlh.js": 356,
	"./tr": 357,
	"./tr.js": 357,
	"./tzl": 358,
	"./tzl.js": 358,
	"./tzm": 359,
	"./tzm-latn": 360,
	"./tzm-latn.js": 360,
	"./tzm.js": 359,
	"./ug-cn": 361,
	"./ug-cn.js": 361,
	"./uk": 362,
	"./uk.js": 362,
	"./ur": 363,
	"./ur.js": 363,
	"./uz": 364,
	"./uz-latn": 365,
	"./uz-latn.js": 365,
	"./uz.js": 364,
	"./vi": 366,
	"./vi.js": 366,
	"./x-pseudo": 367,
	"./x-pseudo.js": 367,
	"./yo": 368,
	"./yo.js": 368,
	"./zh-cn": 369,
	"./zh-cn.js": 369,
	"./zh-hk": 370,
	"./zh-hk.js": 370,
	"./zh-mo": 371,
	"./zh-mo.js": 371,
	"./zh-tw": 372,
	"./zh-tw.js": 372
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 509;

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalitiesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ModalitiesProvider = /** @class */ (function () {
    function ModalitiesProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    ModalitiesProvider.prototype.get = function (headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/modalities', expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.modalities; });
    };
    ModalitiesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], ModalitiesProvider);
    return ModalitiesProvider;
}());

//# sourceMappingURL=modalities.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mapbox_gl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mapbox_gl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_positions__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_brokers__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











//import { Geolocation } from '@ionic-native/geolocation';
var MapsPage = /** @class */ (function () {
    function MapsPage(navCtrl, navParams, helper, globals, positions, brokers, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.globals = globals;
        this.positions = positions;
        this.brokers = brokers;
        this.geolocation = geolocation;
        this._pairingBroker = false;
        this._brokerDetails = false;
        this._brokerBusy = false;
        this._noBrokersNear = false;
        this.ARR_ITEMS = [];
        this._showFlow = false;
    }
    MapsPage.prototype.ionViewWillEnter = function () {
        this._currLat = this.navParams.get('lat');
        this._currLng = this.navParams.get('lng');
        this._proID = this.navParams.get('pro_id');
        this._broID = this.navParams.get('bro_id');
        this._reaID = this.navParams.get('rea_id');
        __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["accessToken"] = this.globals.mapboxToken;
        this.map = new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Map"]({
            container: this.mapElement.nativeElement,
            center: [this._currLng, this._currLat],
            style: 'mapbox://styles/mapbox/outdoors-v10',
            bearing: 1,
            zoom: 13
        });
        this.initializeMapbox(this._currLat, this._currLng);
    };
    MapsPage.prototype.initializeMapbox = function (lat, lng) {
        var _this = this;
        this.map.addControl(new __WEBPACK_IMPORTED_MODULE_4__mapbox_mapbox_gl_geocoder___default.a({
            accessToken: __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["accessToken"],
            mapboxgl: __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__
        }));
        new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"]().setLngLat([lng, lat]).addTo(this.map);
        /**
         * Get Current Brokers near you and the property
         * The maximum distance range is 5KM - AS DEFINED
         * Controlled by API
         */
        /*  var data = 'http://107.180.79.23/api/v1/position/broid/1';
         map.on('load', function () {
           window.setInterval(function() {
             //console.log(data.latitude);
           map.getSource('drone').setData(data);
           }, 10000);
           map.addSource('drone', { type: 'geojson', data: data });
           map.addLayer({
           "id": "drone",
           "type": "symbol",
           "source": "drone",
           "layout": {
           "icon-image": "rocket-15"
           }
           });
           }); */
        //},
        //error => { 
        //this.helper.hideLoading();
        //  this.helper.presentToast("Ocorreu um erro ao obter os dados!");
        //});
        this.map.on('load', function (ret) {
            /**
             * Function to get near brokers in find mode
             */
            var currentMarkers = [];
            var brokerInProgress = localStorage.getItem("brokerInProgress");
            if (isNaN(parseInt(brokerInProgress))) {
                //this._brokerBusy = false;
                _this.helper.showLoading('Buscando corretores disponíveis');
                var timer = window.setInterval(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var coords;
                    return __generator(this, function (_a) {
                        coords = { latitude: lat, longitude: lng };
                        this.brokers.nearBrokers(coords).subscribe(function (data) {
                            if (currentMarkers !== null) {
                                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                                    if (currentMarkers[i] !== undefined) {
                                        currentMarkers[i].remove();
                                    }
                                }
                            }
                            data.features.forEach(function (marker) {
                                _this._noBrokersNear = false;
                                var el = document.createElement('div');
                                el.className = 'animated fadeIn marker-bro';
                                var oneMarker = new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"](el)
                                    .setLngLat(marker.geometry.coordinates)
                                    .addTo(_this.map);
                                currentMarkers.push(oneMarker);
                                el.addEventListener('click', function () {
                                    _this.brokerDetails(marker.data);
                                });
                            });
                            _this.helper.hideLoading();
                        }, function (error) {
                            if (_this._noBrokersNear == false) {
                                _this.helper.hideLoading();
                                _this.helper.presentToast("Nenhum corretor próximo disponível!");
                                //window.clearInterval(timer);
                                _this._noBrokersNear = true;
                            }
                        });
                        return [2 /*return*/];
                    });
                }); }, 7000);
            }
            /**\
             * Get the broker current position in visit mode
             */
            if (!isNaN(parseInt(brokerInProgress)) && parseInt(brokerInProgress) > 0) {
                _this.helper.showLoading('Buscando posição do corretor');
                var timerPos = window.setInterval(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.positions.getPositions(brokerInProgress, lat, lng).subscribe(function (data) {
                            var coordinates = data.features[0].geometry.coordinates;
                            var measures = data.features[0].geometry.measures;
                            if (_this.map.getLayer('trace-'))
                                _this.map.removeLayer('trace-');
                            if (_this.map.getSource('trace-'))
                                _this.map.removeSource('trace-');
                            data.features[0].geometry.coordinates = [coordinates[0]];
                            data.features[0].geometry.measures = [measures[0]];
                            _this.map.addSource('trace-', { type: 'geojson', data: data });
                            _this.map.addLayer({
                                "id": "trace-",
                                "type": "line",
                                "source": "trace-",
                                "paint": {
                                    "line-color": "#3599d5",
                                    "line-opacity": 0.75,
                                    "line-width": 7
                                }
                            });
                            _this.map.setPitch(30);
                            var i = 0;
                            var timerPos1 = window.setInterval(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var j, el, oneMarker;
                                return __generator(this, function (_a) {
                                    if (i < coordinates.length) {
                                        data.features[0].geometry.coordinates.push(coordinates[i]);
                                        data.features[0].geometry.measures.push(measures[i]);
                                        this.broker_dist = data.features[0].geometry.measures[i][0];
                                        this.broker_minutes = data.features[0].geometry.measures[i][1];
                                        this.map.getSource('trace-').setData(data);
                                        //this.map.panTo(coordinates[i]);
                                        if (coordinates[i]) {
                                            if (currentMarkers !== null) {
                                                for (j = currentMarkers.length - 1; j >= 0; j--) {
                                                    if (currentMarkers[j] !== undefined) {
                                                        currentMarkers[j].remove();
                                                    }
                                                }
                                            }
                                            el = document.createElement('div');
                                            el.className = 'marker-bro';
                                            oneMarker = new __WEBPACK_IMPORTED_MODULE_3_mapbox_gl__["Marker"](el)
                                                .setLngLat(coordinates[i])
                                                .addTo(this.map);
                                            currentMarkers.push(oneMarker);
                                        }
                                        i++;
                                    }
                                    else {
                                        window.clearInterval(timerPos1);
                                    }
                                    return [2 /*return*/];
                                });
                            }); }, 50);
                            _this.broker_name = data.features[0].data.name;
                            _this.broker_email = data.features[0].data.email;
                            _this.broker_phone = data.features[0].data.phone;
                            _this.broker_img = data.features[0].data.avatar;
                            _this._brokerBusy = true;
                            _this.positions.getVisit(_this._proID).subscribe(function (data) {
                                _this.ARR_ITEMS = data;
                                _this.hour_broker = _this.ARR_ITEMS[0].hour_broker;
                                _this.hour_others = _this.ARR_ITEMS[0].hour_others;
                                _this.hour_visit = _this.ARR_ITEMS[0].hour_visit;
                            }, function (error) {
                                _this._brokerBusy = false;
                                _this.helper.presentToast("Falha ao obter detalhes da visita.");
                            });
                            _this.helper.hideLoading();
                        }, function (error) {
                            //this.helper.presentToast("Ocorreu um erro ao obter as localizações!");
                            _this.helper.hideLoading();
                        });
                        return [2 /*return*/];
                    });
                }); }, 10000);
            }
        });
    };
    MapsPage.prototype.cancelVisit = function (dist) {
        var _this = this;
        //if (parseInt(dist) <= 1)
        //{
        // this.helper.presentAlert("Corretor próximo!", "O corretor já está a menos de 1km do imóvel. Não é mais possível cancelar.");
        //}else{
        this.helper.presentConfirm("Atenção", "Deseja cancelar esta visita?", function (res) {
            _this.helper.showLoading('Cancelando visita');
            var brokerInProgress = localStorage.getItem("brokerInProgress");
            _this.positions.cancelVisit(brokerInProgress).subscribe(function (data) {
                _this.helper.hideLoading();
                localStorage.removeItem("brokerInProgress");
                localStorage.removeItem("propertyBusy");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__home_home__["a" /* HomePage */]);
                _this.helper.presentToast("A visita foi cancelada com sucesso!");
            }, function (error) {
                _this.helper.hideLoading();
                _this.helper.presentToast("Falha ao cancelar a visita." + JSON.stringify(error));
            });
        });
        //}
    };
    MapsPage.prototype.callBroker = function () {
        var _this = this;
        if (localStorage.getItem('logged') !== null) {
            this._pairingBroker = true;
            this._brokerDetails = false;
            var data = { broid: this.broker_id, proid: this._proID, reaid: this._reaID };
            this.brokers.callBroker(data).subscribe(function (data) {
                _this._pairingBroker = false;
                _this.helper.presentToast("Solicitação enviada! Aguarde confirmação do corretor!");
            }, function (error) {
                _this._pairingBroker = false;
                _this._brokerDetails = true;
                _this.helper.presentToast("Ocorreu um erro ao comunicar-se com o corretor. Tente novamente!");
            });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__login_login__["a" /* LoginPage */], { type: 1, redirect: "MapsPage", broid: 0, proid: this._proID, reaid: this._reaID });
        }
    };
    MapsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    MapsPage.prototype.showHideFlow = function () {
        var sh_f = document.getElementById('div-flow');
        var h_f = document.getElementById('hide-flow');
        if (this._showFlow == false) {
            this._showFlow = true;
            sh_f.classList.add('show-key');
            h_f.classList.remove('hide-flow');
        }
        else if (this._showFlow == true) {
            this._showFlow = false;
            sh_f.classList.remove('show-key');
            h_f.classList.add('hide-flow');
        }
    };
    MapsPage.prototype.brokerDetails = function (data) {
        window.setTimeout(function () {
            this._brokerDetails = false;
        }, 2000);
        this.broker_id = data.broid;
        this.broker_img = data.avatar;
        this.broker_name = data.name;
        this.broker_email = data.email;
        this.broker_phone = data.phone;
        this.broker_minutes = data.minute;
        this.broker_dist = data.distance;
        this._brokerDetails = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], MapsPage.prototype, "mapElement", void 0);
    MapsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-maps',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/maps/maps.html"*/'<ion-content>\n        <button class="btn-back" ion-button icon-only (click)="goBack()">\n            <ion-icon name="arrow-back" color="azul"></ion-icon>\n        </button>\n    <div class="map-content">            \n        <div #map id="map"></div>\n    </div>\n</ion-content>\n<div id="div-flow" *ngIf="_brokerBusy" class="broker-position" (click)="showHideFlow();">\n    <div class="key-ico animated pulse infinite"></div>\n    <div id="hide-flow" class="flow-visit hide-flow animated bounceInRight">\n        <div class="item-flow">\n            <div class="ico-broker"></div>\n            <div class="ico-pin animated pulse infinite"></div>\n            <div class="line-flow"></div>\n            <div class="lbl_person">CORRETOR</div>\n            <div class="lbl_time">{{ hour_broker }}</div>\n            <div class="lbl_status">Aceitou Visita</div>\n        </div>\n        <div class="item-flow">\n            <div class="ico-broker"></div>\n            <div class="ico-pin animated pulse infinite"></div>\n            <div class="line-flow"></div>\n            <div class="lbl_person">IMOBILIÁRIA</div>\n            <div class="lbl_time">{{ hour_others }}</div>\n            <div class="lbl_status">Notificada</div>\n        </div>\n        <div class="item-flow">\n            <div class="ico-broker"></div>\n            <div class="ico-pin animated pulse infinite"></div>\n            <div class="line-flow-c"></div>\n            <div class="lbl_person">PROPRIETÁRIO</div>\n            <div class="lbl_time">{{ hour_others }}</div>\n            <div class="lbl_status">Notificado</div>\n        </div>\n        <div class="item-flow">\n            <div class="ico-visit"></div>\n            <div class="ico-pin animated pulse infinite"></div>\n            <div class="lbl_person">VISITA</div>\n            <div class="lbl_time">{{ hour_visit }}</div>\n            <div class="lbl_status">Encerramento</div>\n        </div>\n    </div>\n</div> \n<div class="info">\n    <div class="wait" *ngIf="_pairingBroker">\n        <div class="txt-wait animated pulse infinite">Aguarde! Comunicando-se com <br>o corretor selecionado...</div>\n        <button id="btc-wait" type="button" ion-button (click)=\'cancel();\'>\n            CANCELAR SOLICITAÇÃO\n        </button>\n    </div>\n    <div class="info-content" *ngIf="_brokerDetails">\n        <div class="img-broker" [style.background-image]="\'url(\' + broker_img + \')\'" ></div>\n        <div class="bullet"></div>\n        <div class="name-broker"><strong>CORRETOR</strong><br>{{ broker_name }}</div>\n        <div class="status-broker">Disponível Agora</div>\n        <div class="v-line"></div>\n        <div class="distance"><strong>á {{ broker_dist }} km<br>Aprox. {{ broker_minutes }} min</strong></div>\n        <div class="contacts">{{ broker_email }}<br>{{ broker_phone }}</div>\n        <button id="bt" type="button" ion-button (click)="callBroker();">\n            VER AGORA\n        </button>\n    </div>\n    <div class="info-content" *ngIf="_brokerBusy">\n        <div class="img-broker" [style.background-image]="\'url(\' + broker_img + \')\'"></div>\n        <div class="bullet animated fadeIn infinite"></div>\n        <div class="name-broker"><strong>CORRETOR</strong><br>{{ broker_name }}</div>\n        <div class="status-broker">A CAMINHO</div>\n        <div class="v-line"></div>\n        <div class="distance"><strong>á {{ broker_dist }} km<br>Aprox. {{ broker_minutes }} min</strong></div>\n        <div class="contacts">{{ broker_email }}<br>{{ broker_phone }}</div>\n        <button id="btc" type="button" ion-button (click)=\'cancelVisit(broker_dist);\'>\n            CANCELAR\n        </button>\n    </div>\n</div>  '/*ion-inline-end:"/var/www/html/imobi_places/src/pages/maps/maps.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_5__providers_positions__["a" /* PositionsProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_brokers__["a" /* BrokersProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */]])
    ], MapsPage);
    return MapsPage;
}());

//# sourceMappingURL=maps.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CategoriesProvider = /** @class */ (function () {
    function CategoriesProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    CategoriesProvider.prototype.get = function (headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/categories', expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.categories; });
    };
    CategoriesProvider.prototype.realestates = function (headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/realestates', expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.categories; });
    };
    CategoriesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], CategoriesProvider);
    return CategoriesProvider;
}());

//# sourceMappingURL=categories.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocialLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_list_form_list__ = __webpack_require__(375);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SocialLoginPage = /** @class */ (function () {
    function SocialLoginPage(navParams, navCtrl, helper, formBuilder) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.helper = helper;
        this.formBuilder = formBuilder;
        this.userType = 1;
        this.profiles = [];
        this.form = this.formBuilder.group({
            'user': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'pwd': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    SocialLoginPage.prototype.ionViewWillEnter = function () {
        this.titleLogin = this.navParams.get('title');
        this.userType = this.navParams.get('type');
        this.profiles[1] = 'Usuário';
        this.profiles[3] = 'Proprietário';
        this.profiles[2] = 'Corretor';
        this.profiles[4] = 'Imobiliária';
    };
    SocialLoginPage.prototype.signin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], { type: this.userType, profile: this.profiles[this.userType] });
    };
    SocialLoginPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */], { type: this.userType, profile: this.profiles[this.userType] });
    };
    SocialLoginPage.prototype.toForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__form_list_form_list__["a" /* FormListPage */], { type: this.userType });
    };
    SocialLoginPage.prototype.goToSlide = function (to) {
        this.slides.slideTo(to, 500);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], SocialLoginPage.prototype, "slides", void 0);
    SocialLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-sociallogin',template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/sociallogin/sociallogin.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title> </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content fullscreen padding>\n        <!--<div class="header-sl">\n            <img src="./../../assets/imgs/logo.png" class="logo-sl"/>\n            <div class="title-login">{{ titleLogin }}</div>\n         </div>\n        <div class="bg-page" [style.backgroundImage]="\'url(./../../assets/imgs/\' + userType + \'.png)\'"></div>-->\n\n        <ion-slides>\n          <ion-slide>\n            <img src="./../../assets/imgs/slide1.png" style="display: block; margin: 3em auto; width: 90%;"/>\n            <h1>Hmmm, está procurando um imóvel?</h1>\n            <h3>Você achou a solução perfeita para a sua necessidade. Vamos te ajudar a resolver isso...</h3>\n            <br><br>\n            <button type="button" class="btn btn-yellow" ion-button (click)=\'goToSlide(1);\'>\n              Próximo\n            </button>\n            <div class="field-bullet">\n              <span class="bullet active"></span>\n              <span class="bullet"></span>\n              <span class="bullet last"></span>\n            </div>\n          </ion-slide>\n          <ion-slide>\n            <img src="./../../assets/imgs/slide2.png" style="display: block; margin: 3em auto; width: 90%;"/>\n            <h1>Você sabia?</h1>\n            <h3>O Imobi Places tem os melhores imóveis para a sua necessidade. Exibiremos tudo que está disponível de acordo com a sua localização.</h3>\n            <br><br>\n            <button type="button" class="btn btn-yellow" ion-button (click)=\'goToSlide(2);\'>\n              Próximo\n            </button>\n            <div class="field-bullet">\n              <span class="bullet"></span>\n              <span class="bullet active"></span>\n              <span class="bullet last"></span>\n            </div>\n          </ion-slide>\n          <ion-slide>\n            <img src="./../../assets/imgs/slide3.png" style="display: block; margin: 3em auto; width: 90%;"/>\n            <h1>Faça parte!</h1>\n            <h3>Entre na plataforma com a rede mais completa de imóveis da sua região.</h3>\n            <br><br>\n            <ion-grid>\n              <ion-row>\n                <ion-col>\n                  <button type="button" class="btn btn-yellow" style="width: 100%;" ion-button (click)=\'toForm();\'>\n                    PEDIR MEU CONVITE\n                  </button>\n                </ion-col>\n                <ion-col>\n                  <button id="bt" type="button" class="btn" style="width: 100%;" ion-button (click)=\'signin();\'>\n                    Log In\n                  </button>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n            <div class="field-bullet">\n              <span class="bullet"></span>\n              <span class="bullet"></span>\n              <span class="bullet active last"></span>\n            </div>\n          </ion-slide>\n        </ion-slides>\n\n        <div class="footer">\n            <!--<form [formGroup]="form" (submit)="loginEmail()">\n                 <div class="btns">\n                    <button id="gl" type="button" ion-button block icon-left (click)=\'loginFacebook();\'>\n                        <ion-icon name="logo-google"></ion-icon>\n                        Entrar com Google\n                    </button>\n                </div>\n                <div class="btns">\n                    <button id="fb" type="button" ion-button block icon-left (click)=\'loginFacebook();\'>\n                        <ion-icon name="logo-facebook"></ion-icon>\n                        Entrar com Facebook\n                    </button>\n                </div>\n                <div class="btns">\n                        <button id="bt" type="button" ion-button (click)=\'signup();\'>\n                            Cadastrar\n                        </button>\n                        <button id="bt" type="button" ion-button (click)=\'signin();\'>\n                            Entrar\n                        </button>\n                </div>\n              </form>-->\n\n        </div>\n\n  </ion-content>\n'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/sociallogin/sociallogin.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], SocialLoginPage);
    return SocialLoginPage;
}());

//# sourceMappingURL=sociallogin.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__maps_maps__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__details_details__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, helper, formBuilder, oneSignal, login) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.formBuilder = formBuilder;
        this.oneSignal = oneSignal;
        this.login = login;
        this._eye = "eye";
        this.redirect = "HomePage";
        this.proid = 0;
        this.broid = 0;
        this.reaid = 0;
        this._type = "password";
        this.titleLogin = "Login";
        this.form = this.formBuilder.group({
            user: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            pwd: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    LoginPage.prototype.showPassword = function () {
        if (this._eye == "eye") {
            this._eye = "eye-off";
            this._type = "text";
        }
        else {
            this._eye = "eye";
            this._type = "password";
        }
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.userType = this.navParams.get('type');
        this.redirect = this.navParams.get('redirect');
        this.proid = this.navParams.get('proid');
        this.broid = this.navParams.get('broid');
        this.reaid = this.navParams.get('reaid');
    };
    LoginPage.prototype.setOneSignal = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.oneSignal.sendTag("type", res.type);
                this.oneSignal.sendTag("usrid", res.usrid);
                this.oneSignal.sendTag("usrname", res.user.split(" ", 1));
                if (res.type == 2) {
                    this.oneSignal.sendTag("broid", res.broid);
                    this.oneSignal.sendTag("brokername", res.broker.split(" ", 1));
                }
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.loginApp = function () {
        var _this = this;
        this.helper.showLoading("Efetuando login");
        this.login.login(this.form.value).subscribe(function (res) {
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
            if (res.user_running !== 0 && res.property_busy !== 0) {
                localStorage.setItem('brokerInProgress', res.user_running);
                localStorage.setItem('propertyBusy', res.property_busy);
            }
            _this.setOneSignal(res);
            _this.helper.hideLoading();
            //setroot can be dynamic
            if (_this.redirect == "DetailsPage") {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__details_details__["a" /* DetailsPage */], { proid: _this.proid });
            }
            else if (_this.redirect == "MapsPage") {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__maps_maps__["a" /* MapsPage */], { pro_id: _this.proid, bro_id: _this.broid, rea_id: _this.reaid });
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        }, function (err) {
            _this.helper.hideLoading();
            _this.helper.presentToast("Informe seu email e sua senha corretamente!");
            alert(JSON.stringify(err));
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "page-login",template:/*ion-inline-start:"/var/www/html/imobi_places/src/pages/login/login.html"*/'<ion-header no-border transparent>\n        <ion-navbar>\n          <button (click)="clearHome();" ion-button menuToggle icon-only color="branco">\n            <ion-icon name=\'menu\'></ion-icon>\n          </button>\n        </ion-navbar> \n      </ion-header>\n\n<ion-content fullscreen padding class="masters">\n        <div class="header-img">\n            <img src="./../../assets/imgs/logo.png" class="logo"/>\n            <div class="title-login">{{ titleLogin }}</div>\n         </div>   \n         <div class="bg-page" [style.backgroundImage]="\'url(./../../assets/imgs/\' + userType + \'.png)\'"></div> \n        <div class="footer">\n            <form [formGroup]="form" (submit)="loginApp()">\n                <ion-list radio-group no-lines>\n                    <ion-item class="nolines">\n                        <ion-label class="nolines" stacked>Informe seu Email:</ion-label>\n                        <ion-input type="email" placeholder="seu@email.com.br" name="user" formControlName="user"></ion-input>\n                    </ion-item>\n                    <ion-item class="nolines">\n                        <ion-label color="light" stacked>Digite sua Senha:</ion-label>\n                        <ion-input [type]="_type" placeholder="Se já possuir cadastro!" name="pwd" formControlName="pwd"></ion-input>\n                    </ion-item>\n                    <ion-icon class="showpwd" [name]="_eye" color="azul" (click)=\'showPassword()\'></ion-icon>\n                 </ion-list>\n                <div class="btnslm" align="center">\n                    <button id="btenter" ion-button block type="submit">\n                        Entrar\n                    </button>\n                </div>\n            </form>\n        </div>\n        <div class="footer-a">\n            <a href="#" (click)="renew();">Esqueceu sua senha?</a>\n        </div>\n        \n  </ion-content>'/*ion-inline-end:"/var/www/html/imobi_places/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* HelperProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_4__providers_login__["a" /* LoginProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrokersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BrokersProvider = /** @class */ (function () {
    function BrokersProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    BrokersProvider.prototype.callBroker = function (data, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .post(this.globals.getBaseUrl() + '/broker/call', data, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data; });
    };
    BrokersProvider.prototype.saveBrokerIncoming = function (data, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .put(this.globals.getBaseUrl() + '/broker/incoming', data, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data; });
    };
    BrokersProvider.prototype.statusBroker = function (reg, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .put(this.globals.getBaseUrl() + '/broker/status', reg, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data; });
    };
    BrokersProvider.prototype.nearBrokers = function (coords, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .post(this.globals.getBaseUrl() + '/brokers/near', coords, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data; });
    };
    BrokersProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], BrokersProvider);
    return BrokersProvider;
}());

//# sourceMappingURL=brokers.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ScheduleProvider = /** @class */ (function () {
    function ScheduleProvider(http, token, globals) {
        this.http = http;
        this.token = token;
        this.globals = globals;
    }
    ScheduleProvider.prototype.getSchedules = function (type, value, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .get(this.globals.getBaseUrl() + '/scheduler/' + type + '/' + value, expandedHeaders)
            .timeout(15000)
            .map(function (res) { return res.schedule; });
    };
    ScheduleProvider.prototype.saveSchedule = function (data, headers) {
        var expandedHeaders = this.token.prepareHeader(headers);
        return this.http
            .post(this.globals.getBaseUrl() + '/scheduler', data, expandedHeaders)
            .timeout(15000)
            .map(function (data) { return data; });
    };
    ScheduleProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__token__["a" /* TokenProvider */],
            __WEBPACK_IMPORTED_MODULE_2__global__["a" /* Global */]])
    ], ScheduleProvider);
    return ScheduleProvider;
}());

//# sourceMappingURL=schedule.js.map

/***/ })

},[388]);
//# sourceMappingURL=main.js.map