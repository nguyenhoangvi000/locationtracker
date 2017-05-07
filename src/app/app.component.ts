import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { LocationTracker } from '../../providers/location-tracker'


// import { Storage } from '@ionic/storage';

import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, af: AngularFire) {
    platform.ready().then(() => {

      var auth = af.auth.subscribe();
      if (auth != null) {
        this.rootPage = HomePage;
        console.log(auth);
      }
      else {
        this.rootPage = LoginPage;
        console.log(auth);
      }

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
