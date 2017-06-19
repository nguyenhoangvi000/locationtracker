import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { ToastController } from 'ionic-angular';


import 'rxjs/add/operator/filter';



import { Network } from '@ionic-native/network';
import { WindowProvider } from './window-provider';


@Injectable()
export class LocationTracker {


  // private currentUser: any;
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  public uid: string;




  // private currentUser: any = JSON.parse(this.windowProvider.window.localStorage.getItem('currentuser'));

  // Get User through sql storage

  geolocationCurrents: FirebaseListObservable<any>;
  geolocationQuery: FirebaseListObservable<any>;


  currentGeolocation = [];

  constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation, private af: AngularFire, private windowProvider: WindowProvider, private network: Network, private toastController: ToastController) {
  }


  stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }



  startTracking(uid: string) {
    console.log('Vao trong roi ne');


    // // console.log(this.uid);

    this.geolocationCurrents = this.af.database.list('/geolocationCurrents/' + uid, { preserveSnapshot: true });
    this.geolocationQuery = this.af.database.list('/geolocationCurrents/' + uid, { preserveSnapshot: true });



    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      locationUpdateInterval: 30000,
      fastestLocationUpdateInterval: 20000,
    }



    let connectSubcription = this.network.onConnect().subscribe(() => {

    })

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
        console.log(location.latitude)
        console.log(location.longitude)
        this.geolocationCurrents.push({
          lat: location.latitude,
          lng: location.longitude,
          timestamp: Date.now()
        })
      });
    }, (err) => {
      console.log(err);
    });

    // Turn ON the background-geolocation system.
    // BackgroundGeolocation.start();
    this.backgroundGeolocation.start();

    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    // this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
      this.geolocationCurrents.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: formatDate(new Date())
      });

      const queryObservable = this.geolocationQuery;

      queryObservable.subscribe(queriedItems => {
        console.log(queriedItems);
        if (queriedItems != null) {
          if (Math.abs(queriedItems.lat - position.coords.latitude) < 0.01 && Math.abs(queriedItems.lat - position.coords.latitude) > 0 && Math.abs(queriedItems.lng - position.coords.longitude) < 0.01 && Math.abs(queriedItems.lng - position.coords.longitude) > 0) {
            if (this.network.type === '3g') {
              let toast = this.toastController.create({
                message: "3G",
                duration: 10000,
                position: "bottom"
              });
              toast.present();
              let currentGeolocationTemp = JSON.parse(this.windowProvider.window.localStorage.getItem('geolocation'));
              currentGeolocationTemp.forEach(item => {
                this.geolocationCurrents.push({
                  lat: item.lat,
                  lng: item.lng,
                  timestamp: item.timestamp
                })
              })

              this.windowProvider.window.localStorage.removeItem('geolocation');
              this.geolocationCurrents.push({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                timestamp: formatDate(new Date())
              });

              connectSubcription.unsubscribe();
            }
            else if (this.network.type === '2g') {
              let toast = this.toastController.create({
                message: "2G",
                duration: 10000,
                position: "bottom"
              });
              toast.present();
              this.currentGeolocation = JSON.parse(this.windowProvider.window.localStorage.getItem('geolocation'));

              this.currentGeolocation.push({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                timestamp: formatDate(new Date())
              })

              this.windowProvider.window.localStorage.setItem('geolocation', JSON.stringify(this.currentGeolocation));
            }
            else if (this.network.type === 'wifi') {
              let toast = this.toastController.create({
                message: "wifi",
                duration: 10000,
                position: "bottom"
              });
              toast.present();
              this.geolocationCurrents.push({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                timestamp: formatDate(new Date())
              });
            }
          }
        }
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });
      });
    });

    connectSubcription.unsubscribe();

  }
}

function createFirebaseList(uid: String) {

  this.geolocationCurrents = this.af.database.list('/geolocationCurrents/' + uid + "/" + new Date(), { preserveSnapshot: true });
  this.geolocationQuery = this.af.database.list('/geolocationCurrents/' + uid + new Date(), { preserveSnapshot: true });



}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}



