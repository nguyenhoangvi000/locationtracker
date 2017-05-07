import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class WindowProvider {

  public window = window;

  constructor() {

  }

}
