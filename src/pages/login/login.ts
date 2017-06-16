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
    try {
      this.email = this.email.replace(/ /g, '');
      this.password = this.password.replace(/ /g, '');
      if (this.email != null && this.password != null) {
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
              duration: 1500,
              position: 'top'
            });
            toast.present();
            let currentUser = {
              email: response.auth.email,
              picture: response.auth.photoURL,
              uid: response.auth.uid
            };
            window.localStorage.clear();
            while (currentUser.uid == null) {
              setInterval(100);
            }
            this.locationTracker.uid = currentUser.uid;
            // console.log(this.uid);
            // window.localStorage.setItem('currentuser', this.uid);

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
    } catch (error) {

      console.log(error);

    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
