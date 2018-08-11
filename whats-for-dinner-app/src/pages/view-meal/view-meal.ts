import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';

/**
 * Generated class for the ViewMealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 */

@IonicPage()
@Component({
  selector: 'page-view-meal',
  templateUrl: 'view-meal.html',
})
export class ViewMealPage {

  selectedMeal : any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {
    this.selectedMeal = this.appData.meals[this.appData.selectedMealIndex];
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMealPage');
  }

}
