import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';

@Component({
  selector: 'page-meals',
  templateUrl: 'meals.html'
})
export class MealsPage {

  public meals = [];


  constructor(public navCtrl: NavController, public alertController: AlertController, public appData: AppDataProvider) {
    //this.meals = this.appData.meals;


  }

  addMeal() {
    let addMealAlert = this.alertController.create({
      title: "Add New Meal",
      message: "Enter a meal name",
      inputs: [
        {
          type: "text",
          name: "addMealInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Meal",
          handler: (inputData)=> {
            let mealName = inputData.addMealInput;

            let breakfast = false;
            let lunch = false;
            let dinner = false;

            switch (this.appData.currentMeal) {
              case "breakfast": {
                breakfast = true;
                break;
              }
              case "lunch": {
                lunch = true
                break;
              }
              case "dinner": {
                dinner = true;
                break;
              }
            }

            let newMeal = {
              name: mealName,
              cost: 0,
              convenience: 0,
              breakfast: breakfast,
              lunch: lunch,
              dinner: dinner
            };
            this.appData.meals.push(newMeal);
            this.appData.sortMealList();
          }
        }
      ]
    });
    addMealAlert.present();

  }

}
