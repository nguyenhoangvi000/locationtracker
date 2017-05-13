import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import { LoginPage } from '../login/login';

import { LocationTracker } from '../../providers/location-tracker';

@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html'
})
export class TrackingPage {

  uid: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private af: AngularFire, public actionSheetCtrl: ActionSheetController, public locationTracker: LocationTracker) {

    if (!this.isLoggedin()) {
      console.log('You are not logged in');
      this.navCtrl.push(LoginPage);
    }
  };

  isLoggedin() {
    this.uid = window.localStorage.getItem('currentuser');
    console.log(this.uid);
    if (this.uid != null) {
      console.log(window.localStorage.getItem('currentuser'));
      window.localStorage.clear();
      return true;
    }
  }

  start() {
    console.log('ok');
    // console.log(window.localStorage.getItem('currentUser'));
    console.log(this.locationTracker.uid);
    // this.locationTracker.uid = JSON.parse(window.localStorage.getItem('currentuser').toString()).uid;
    this.locationTracker.startTracking(this.locationTracker.uid);
  }

  stop() {
    this.locationTracker.stopTracking();
  }


  signout() {
    this.af.auth.logout();
    this.navCtrl.push(LoginPage);
  }
}
