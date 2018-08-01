import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';

@Component({
  selector: 'page-meals',
  templateUrl: 'meals.html'
})
export class MealsPage {

  constructor(public navCtrl: NavController, public appData: AppDataProvider) {

  }

}
