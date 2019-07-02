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
  cost : String;
  convenience : String;
  upperCaseName : String;
  loadingAnimation : String;
  style: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {
    this.chosenMeal = this.appData.meals[this.appData.selectedMealIndex];
    this.cost = this.appData.costDescriptions[this.appData.meals[this.appData.selectedMealIndex].cost];
    this.convenience = this.appData.convenienceDescriptions[this.appData.meals[this.appData.selectedMealIndex].convenience];
    this.upperCaseName = this.chosenMeal.name.toUpperCase();
    this.loadingAnimation = "assets/imgs/preloader.gif";

    this.style = "height: " + this.appData.imageHeight+"px; width: " + this.appData.imageWidth + "px;";
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
