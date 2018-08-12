import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';

/**
 * Generated class for the ChosenMealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chosen-meal',
  templateUrl: 'chosen-meal.html',
})
export class ChosenMealPage {

  chosenMeal : any;
  upperCaseName : String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {
    this.chosenMeal = this.appData.meals[this.appData.selectedMealIndex];
    this.upperCaseName = this.chosenMeal.name.toUpperCase();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChosenMealPage');
  }

  buttonClicked() {
    this.navCtrl.pop();
  }

  getCapitalisedMeal() {
    return this.appData.currentMeal.charAt(0).toUpperCase() + this.appData.currentMeal.slice(1);
  }

}
