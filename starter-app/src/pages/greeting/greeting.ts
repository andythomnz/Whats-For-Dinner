import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../services/share/share';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the GreetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-greeting',
  templateUrl: 'greeting.html',
})
export class GreetingPage {
  name: string;
  //shareService: ShareService
  //alertCtrl: AlertController

  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService, public alertCtrl: AlertController) {
    //this.shareService = shareService;
    //this.alertCtrl = alertCtrl;
    this.name = shareService.getName();
    this.showAlert();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'New User!',
      subTitle: 'Welcome to the SWEN325 app, ' + this.name + '!',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GreetingPage');
  }

}
