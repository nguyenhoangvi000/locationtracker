import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the WindowProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WindowProvider {

  public window = window;

  // public storage: Storage;

  // constructor(storage: Storage) {

  // }
  constructor() {

  }

}
