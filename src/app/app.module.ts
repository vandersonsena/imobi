import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData, DatePipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { Deeplinks } from '@ionic-native/deeplinks';

import { MyApp } from './app.component';
import { Carrousel } from '../pages/details/gallery/carrousel'
import { Filter } from '../pages/home/filter/filter'
import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../pages/login/login';
import { HelperProvider } from '../providers/helper';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { ZBar } from '@ionic-native/zbar';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { OneSignal } from '@ionic-native/onesignal';
import { SocialLoginPage } from '../pages/sociallogin/sociallogin';
import { LoginProvider } from '../providers/login';
import { TokenProvider } from '../providers/token';
import { Global } from '../providers/global';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../pages/signup/signup';
import { Signup2Page } from '../pages/signup/signup2';
import { SplashPage } from '../pages/splash/splash';
import { MyActionPage } from '../pages/myaction/myaction';
import { SchedulePage } from '../pages/schedule/schedule';
import { SignupProvider } from '../providers/signup';
import { CategoriesProvider } from '../providers/categories';
import { ModalitiesProvider } from '../providers/modalities';
import { DiscoverPage } from '../pages/discover/discover';
import { DetailsPage } from '../pages/details/details';
import { MapsPage } from '../pages/maps/maps';
import { PositionsProvider } from '../providers/positions';
import { PropertyPage } from '../pages/property/property';
import { Property2Page } from '../pages/property/property2';
import { Property3Page } from '../pages/property/property3';
import { Property4Page } from '../pages/property/property4';
import { PropertyProvider } from '../providers/property';
import { ScheduleProvider } from '../providers/schedule';
import { BrokersProvider } from '../providers/brokers';
import { BackgroundMode } from '@ionic-native/background-mode';
import { TermsPage } from '../pages/terms/terms';
import { NeighboorsPage } from '../pages/neighboors/neighboors';
import { GoogleMaps } from '@ionic-native/google-maps';
import { FavoritesPage } from '../pages/favorites/favorites';

import { FormListPage } from '../pages/form-list/form-list';
import { MsgSuccessPage } from '../pages/msg-success/msg-success';
import { WaitinglistProvider } from '../providers/waitinglist';
import { HttpClient } from '@angular/common/http';

import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    MyActionPage,
    SocialLoginPage,
    LoginPage,
    SignupPage,
    Signup2Page,
    PropertyPage,
    Property2Page,
    Property3Page,
    Property4Page,
    DiscoverPage,
    NeighboorsPage,
    FavoritesPage,
    MapsPage,
    DetailsPage,
    SchedulePage,
    HomePage,
    TermsPage,
    Carrousel,
    Filter,
    FormListPage,
    MsgSuccessPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      locationStrategy: 'path',
    },
    {
      // DeepLinker
      links: [
        {component: DetailsPage, name: 'Details', segment: 'portal/property/:qrcode'},
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    MyActionPage,
    SocialLoginPage,
    LoginPage,
    PropertyPage,
    Property2Page,
    Property3Page,
    Property4Page,
    SignupPage,
    Signup2Page,
    DiscoverPage,
    MapsPage,
    DetailsPage,
    NeighboorsPage,
    FavoritesPage,
    SchedulePage,
    TermsPage,
    HomePage,
    Carrousel,
    Filter,
    FormListPage,
    MsgSuccessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    GoogleMaps,
    OneSignal,
    ZBar,
    Camera,
    BackgroundMode,
    LaunchNavigator,
    Deeplinks,
    Global,
    TokenProvider,
    CategoriesProvider,
    ModalitiesProvider,
    BrokersProvider,
    PositionsProvider,
    PropertyProvider,
    ScheduleProvider,
    LoginProvider,
    SignupProvider,
    HelperProvider,
    SQLite,
    DatabaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    WaitinglistProvider,
    HttpClient,
    DatabaseProvider
  ]
})
export class AppModule {}
enableProdMode();
