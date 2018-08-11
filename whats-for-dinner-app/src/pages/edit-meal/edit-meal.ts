import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';

/**
 * Generated class for the EditMealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-meal',
  templateUrl: 'edit-meal.html',
})
export class EditMealPage {

  selectedMeal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {
    this.selectedMeal = this.appData.meals[this.appData.selectedMealIndex];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMealPage');
  }

  clickedDone() {
    this.navCtrl.pop();
    this.appData.sortMealList();
  }

}
