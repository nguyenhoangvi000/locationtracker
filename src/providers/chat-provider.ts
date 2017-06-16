import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatProvider {

    private message: String;
    private messageList: FirebaseListObservable<any>;

    constructor(af: AngularFire) {


    }

    

}
