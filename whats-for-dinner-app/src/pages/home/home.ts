import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
import { ChosenMealPage } from '../chosen-meal/chosen-meal';
import * as moment from "moment";

// hihihi

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  desiredCost : Decimal;
  desiredConvenience : Decimal;

  getCapitalisedMeal() {
    return this.appData.currentMeal.charAt(0).toUpperCase() + this.appData.currentMeal.slice(1);
  }

  convertMinutesToHoursAndMinutes(minutes) {
    let minuteAmount = minutes;
    if (minuteAmount < 0) {
      minuteAmount = minuteAmount * -1;
    }
    let hourAmount = 0;
    while (minuteAmount >= 60) {
      hourAmount++;
      minuteAmount = minuteAmount - 60;
    }
    if (hourAmount == 0) {
      if (minuteAmount > 1) {
        return minuteAmount + " minutes";
      } else {
        return minuteAmount + " minute";
      }

    } else if (minuteAmount == 0) {
      if (hourAmount > 1) {
        return hourAmount + " hours";
      } else {
        return hourAmount + " hour";
      }

    } else {
      let hourUnit = "hour";
      let minuteUnit = "minute";
      if (hourAmount > 1) {
        hourUnit = "hours";
      }
      if (minuteAmount > 1) {
        minuteUnit = "minutes";
      }

      return hourAmount + " " + hourUnit + " " + minuteAmount + " " + minuteUnit;
    }
  }

  chooseMeal() {
    let appropriateMeals = this.appData.getMealsForCurrentMealTime();

    if (appropriateMeals.length < 1) {
      // warn the user no meals for this meal time
      let noMealsAlert = this.alertCtrl.create({
        title: 'No matches!',
        subTitle: "You don't have any " + this.appData.getPluralOfCurrentMealTime() + " in your meals list!",
        buttons: ["OK"]
      });
      noMealsAlert.present();
      return;
    }
    let matchingMeals = [];
    for (let i = 0; i < appropriateMeals.length; i++) {
      let eachMeal = appropriateMeals[i];
      if ((eachMeal.cost == this.desiredCost) && (eachMeal.convenience == this.desiredConvenience)) {
        matchingMeals.push(eachMeal);
      }
    }
    if (matchingMeals.length < 1){
      // warn the user no meals are a perfect match
      let noMatchingMealsAlert = this.alertCtrl.create({
        title: 'No matches!',
        subTitle: "There aren't any meals matching your desired cost & convenience!",
        buttons: ["OK"]
      });
      noMatchingMealsAlert.present();
      return;
    }

    let randomIndex = Math.floor(Math.random() * (matchingMeals.length));
    this.appData.selectedMealIndex = randomIndex;
    this.navCtrl.push(ChosenMealPage);
    // alert(
    //   "Chose random index " + randomIndex + " of " + matchingMeals.length-1 + " \n" +
    //   matchingMeals[randomIndex].name + ": cost is " + matchingMeals[randomIndex].cost + ", convenience is: " + matchingMeals[randomIndex].convenience
    // );
  }

  getMealTimeDescription() {
    switch (this.appData.currentMeal) {
      case "breakfast": {
        //if it's breakfast

        //check if it's before defined breakfast time or after
        let startTime = moment(this.appData.breakfastStart, "HH:mm").subtract(1, "minutes");
        let endTime = moment(this.appData.breakfastTime, "HH:mm").add(1, "minutes");

        let earlyBreakfast = this.appData.currentTime.isBetween(startTime,endTime);

        //calculate the difference in time from the defined breakfast time
        let timeDiff = this.appData.currentTime.diff(endTime.subtract(1, "minutes"), "minutes");
        let timeDiffString = this.convertMinutesToHoursAndMinutes(timeDiff);

        if (earlyBreakfast) { //before the defined meal time
          return "I hope you're hungry!\n There's only " + timeDiffString + " until breakfast time!";
        } else {
          return "You're a bit slow this morning!\n Breakfast was " + timeDiffString + " ago!";
        }

        break;
      }
      case "lunch": {
        //if it's lunch
        //check if it's before defined lunch time or after
        let startTime = moment(this.appData.lunchStart, "HH:mm").subtract(1, "minutes");
        let endTime = moment(this.appData.lunchTime, "HH:mm").add(1, "minutes");

        let earlyLunch = this.appData.currentTime.isBetween(startTime,endTime);

        //calculate the difference in time from the defined lunch time
        let timeDiff = this.appData.currentTime.diff(endTime, "minutes");
        let timeDiffString = this.convertMinutesToHoursAndMinutes(timeDiff);

        if (earlyLunch) { //before the defined meal time
          return "Hang in there!\n There's only " + timeDiffString + " until lunch time!";
        } else {
          return "You must be having a busy day!\n Lunch was " + timeDiffString + " ago!";
        }

        break;
      }
      case "dinner": {
        //if it's dinner
        //check if it's before defined dinner time or after
        let startTime = moment(this.appData.dinnerStart, "HH:mm").subtract(1, "minutes");
        let endTime = moment(this.appData.dinnerTime, "HH:mm").add(1, "minutes");

        let earlyDinner = this.appData.currentTime.isBetween(startTime,endTime);

        //calculate the difference in time from the defined dinner time
        let timeDiff = this.appData.currentTime.diff(endTime, "minutes");
        let timeDiffString = this.convertMinutesToHoursAndMinutes(timeDiff);

        if (earlyDinner) { //before the defined meal time
          return "Not long now!\n There's only " + timeDiffString + " until dinner time!";
        } else {
          return "I bet you're starving!\n Dinner was " + timeDiffString + " ago!";
        }
        break;
      }
    }
  }

  constructor(public navCtrl: NavController, public appData: AppDataProvider, public alertCtrl: AlertController) {
    this.desiredCost = 0;
    this.desiredConvenience = 0;


  }




}
