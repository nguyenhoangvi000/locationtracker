import { Component, ViewChild, OnInit } from '@angular/core';

import { Content } from 'ionic-angular';

import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import { TrackingPage } from '../tracking/tracking';

import { WindowProvider } from '../../providers/window-provider';

import { LocalStorageService } from 'angular-2-local-storage';

import { AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage implements OnInit {


  messageContent: any;
  // messages: Array<any>;
  messages: FirebaseListObservable<any[]>;
  messagesReverse: FirebaseListObservable<any[]>;

  drivers: FirebaseListObservable<any[]>;

  currentUidReceive: String = "";

  username: String = "Me";
  usernameReceive: String = "";
  @ViewChild(Content) content: Content;

  constructor(private dialog: AlertController, private af: AngularFire, private localStorage: LocalStorageService, private navParam: NavParams) {


    // this.messages = new Array<String>();
    // this.username = window.localStorage.getItem("username");
  };

  ngOnInit(): void {

    // this.currentUidReceive = this.navParam.get("uid");
    console.log(this.currentUidReceive);
    this.messages = this.af.database.list("/messages/" + this.navParam.get("uid") + "/" + localStorage.getItem("uid"));
    this.messagesReverse = this.af.database.list("/messages/" + localStorage.getItem("uid") + "/" + this.navParam.get("uid"));
    this.drivers = this.af.database.list("/drivers", {
      query: {
        equalTo: localStorage.getItem("uid"),
      }
    })

    this.drivers.subscribe(result => {
      result.forEach(item => {
        this.usernameReceive = item.name;
      })
    })
  }

  scrollToBottom() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentTop + dimensions.contentHeight, 2500);
  }

  send() {
    this.scrollToBottom();
    let data = { messageContent: this.messageContent, username: this.username, date: Date.now() };
    this.messages.push(data);
    this.messageContent = "";
  }

  upload() {
    let prompt = this.dialog.create({
      title: 'Thông tin',
      message: 'Chọn hình ảnh',
      buttons: [
        {
          text: 'Máy ảnh',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Bộ sưu tập',
          handler: data => {
            console.log('Cancel clicked');
          }
        }

      ]
    });
    prompt.present();
  }

}
