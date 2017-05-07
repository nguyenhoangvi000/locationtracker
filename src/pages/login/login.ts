import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { ToastController } from 'ionic-angular';

import { WindowProvider } from '../../providers/window-provider';
import { LocationTracker } from '../../providers/location-tracker';

import { HomePage } from '../home/home';



/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: any;
  password: any;
  uid: string;

  constructor(public navCtrl: NavController, private locationTracker: LocationTracker, public navParams: NavParams, public angfire: AngularFire, public toastController: ToastController) { 
    window.localStorage.clear();
  }

  login() {
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    }, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response) => {
        // console.log('Login Success' + JSON.stringify(response));
        let toast = this.toastController.create({
          message: 'Login Success',
          duration: 2000,
          position: "bottom"
        });
        toast.present();
        let currentUser = {
          email: response.auth.email,
          picture: response.auth.photoURL,
          uid: response.auth.uid
        };

        this.uid = currentUser.uid;
        window.localStorage.setItem('currentuser', this.uid);
        console.log(this.uid);

        this.navCtrl.pop();

      }).catch((error) => {
        // console.log(error);
        let toast = this.toastController.create({
          message: error.toString(),
          duration: 10000,
          position: "bottom"
        });
        toast.present();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


}
