import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GreetingPage } from '../greeting/greeting';
import { ShareService } from '../../services/share/share';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shareService: ShareService

  constructor(public navCtrl: NavController, shareService: ShareService) {
    this.shareService = shareService;
  }

  register(firstName, lastName) {

    firstName = firstName || 'No Name';

    this.shareService.setUserName(firstName,lastName);

    this.navCtrl.push(GreetingPage);
  }

}
