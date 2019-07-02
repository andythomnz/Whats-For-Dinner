import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
import { EditMealPage } from '../edit-meal/edit-meal';


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


  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider, private alertCtrl: AlertController) {
    this.selectedMeal = this.appData.meals[this.appData.selectedMealIndex];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMealPage');
  }

  editSelectedMeal(){
      this.navCtrl.push(EditMealPage);
  }

  deleteButtonClicked() {
    let alert = this.alertCtrl.create({
      title: "Are you sure?",
      message: "Do you really want to delete " + this.selectedMeal.name + "?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {

          }
        },
        {
          text: "Delete",
          handler: () => {
            this.deleteSelectedMeal();
          }
        }
      ]
    });
    alert.present();
  }

  deleteSelectedMeal(){
    this.appData.deleteMeal(this.appData.selectedMealIndex);
    this.navCtrl.pop();
  }

}
