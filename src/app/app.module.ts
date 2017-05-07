import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'

import { AngularFireModule } from 'angularfire2';

// Provider
import { LocationTracker } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { WindowProvider } from '../providers/window-provider';
import { IonicStorageModule } from '@ionic/storage';
// Provider

// import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
// import { Storage } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCEYUJzJfhjSr5K2LncLP7zk8lmd5GilxU",
  authDomain: "location-tracking-36de2.firebaseapp.com",
  databaseURL: "https://location-tracking-36de2.firebaseio.com",
  storageBucket: "location-tracking-36de2.appspot.com",
  messagingSenderId: "428760642764"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    // IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, BackgroundGeolocation, Geolocation, LocationTracker, WindowProvider, Network]
})
export class AppModule { }
