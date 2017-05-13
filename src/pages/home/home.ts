import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import { TrackingPage } from '../tracking/tracking';

import { LocationTracker } from '../../providers/location-tracker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private tab1: any;

  constructor() {
    this.tab1 = TrackingPage;

  };
}
