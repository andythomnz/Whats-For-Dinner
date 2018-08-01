import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public appData: AppDataProvider) {

  }

}
