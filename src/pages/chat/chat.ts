import { Component, ViewChild } from '@angular/core';

import { Content } from 'ionic-angular';

import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

import { TrackingPage } from '../tracking/tracking';

import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  messageContent: any;
  messages: Array<any>;
  username: String = "Vi hoang";
  @ViewChild(Content) content: Content;

  constructor() {
    this.messages = new Array<String>();
    for (var index = 0; index < 10; index++) {
      let data = { message: "Message Test" + (index + 1), username: "Qy", date: Date.now() };
      this.messages.push(data);
    }

  };

  scrollToBottom() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentTop + dimensions.contentHeight, 2500);
  }

  send() {
    this.scrollToBottom();
    let data = { message: this.messageContent, username: this.username, date: Date.now() };
    this.messages.push(data);
    this.messageContent = "";
  }

}
