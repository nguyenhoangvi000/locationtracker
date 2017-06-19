import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import { LocalStorageService } from 'angular-2-local-storage';

import { ChatPage } from '../chat/chat';

@Component({
    selector: 'userlist',
    templateUrl: 'userlist.html'
})
export class UserlistPage implements OnInit {

    currentUid: String = "";
    drivers: FirebaseListObservable<any[]>;

    constructor(private af: AngularFire, public localStorage: LocalStorageService, private navController: NavController) {
        this.drivers = af.database.list("/drivers");
        // this.currentUid = this.localStorage.getItem("uid").toString();
        // console.log(this.currentUid);
    }

    ngOnInit(): void {
        this.currentUid = localStorage.getItem("uid");
    }

    showDetailPage(driver) {

        console.log(driver.$key);

        this.navController.push(ChatPage, {
            uid: driver.$key
        })

    }





}
