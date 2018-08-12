import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';

/*
  Generated class for the AppDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppDataProvider {

  breakfastStart: String;
  breakfastTime: String;
  breakfastEnd: String;
  isBreakfastTime : Boolean;
  lunchStart: String;
  lunchTime: String;
  lunchEnd: String;
  isLunchTime: Boolean;
  dinnerStart: String;
  dinnerTime: String;
  dinnerEnd: String;
  isDinnerTime : Boolean;
  currentMeal: String;
  currentTime: Moment;

  meals: any[];
  selectedMealIndex: Decimal;

  costDescriptions: any[]=[];
  convenienceDescriptions: any[]=[];

  task : any;

  getMealsForCurrentMealTime() {
    let appropriateMeals = [];
    for (let i=0; i < this.meals.length; i++) {
      let eachMeal = this.meals[i];
      if (this.currentMeal == "lunch" && eachMeal.lunch==true) {
        appropriateMeals.push(eachMeal);
      }else if (this.currentMeal == "breakfast" && eachMeal.breakfast==true) {
        appropriateMeals.push(eachMeal);
      } else if (this.currentMeal == "dinner" && eachMeal.dinner==true) {
        appropriateMeals.push(eachMeal);
      }
    }
    return appropriateMeals;
  }

  getPluralOfCurrentMealTime() {
    if (this.currentMeal == "lunch") {
      return "lunches"
    } else {
      return this.currentMeal + "s";
    }
  }

  checkIfBreakfastTime() {
    let currentTime = moment(this.currentTime);

    //Check if it's breakfast time
    let startTime = moment(this.breakfastStart, "HH:mm").subtract(1, "minutes");
    let endTime = moment(this.breakfastEnd, "HH:mm").add(1, "minutes");

    if ((startTime.hour() >= 12 && endTime.hour() <=12) || endTime.isBefore(startTime)) {
      //if start time is afternoon and end time is morning, end time must be the following day
      endTime.add(1, "days");
      if (currentTime.hour() <= 12) {
        currentTime.add(1, "days");
      }
    }

    this.isBreakfastTime = currentTime.isBetween(startTime, endTime);
  }

  //comment

  checkIfLunchTime() {
    let currentTime = moment(this.currentTime);
    //let currentTime = moment("10:30", "HH:mm");

    //Check if it's lunch time
    let startTime = moment(this.lunchStart, "HH:mm").subtract(1, "minutes");
    let endTime = moment(this.lunchEnd, "HH:mm").add(1, "minutes");

    if ((startTime.hour() >= 12 && endTime.hour() <=12) || endTime.isBefore(startTime)) {
      //if start time is afternoon and end time is morning, end time must be the following day
      endTime.add(1, "days");
      if (currentTime.hour() <= 12) {
        currentTime.add(1, "days");
      }
    }

    this.isLunchTime = currentTime.isBetween(startTime, endTime);
  }

  checkIfDinnerTime() {
    let currentTime = moment(this.currentTime);
    //let currentTime = moment("10:30", "HH:mm");
    //

    //Check if it's dinner time
    let startTime = moment(this.dinnerStart, "HH:mm").subtract(1, "minutes");
    let endTime = moment(this.dinnerEnd, "HH:mm").add(1, "minutes");

    if ((startTime.hour() >= 12 && endTime.hour() <=12) || endTime.isBefore(startTime)) {
      //if start time is afternoon and end time is morning, end time must be the following day
      endTime.add(1, "days");
      if (currentTime.hour() <= 12) {
        currentTime.add(1, "days");
      }
    }

    this.isDinnerTime = currentTime.isBetween(startTime, endTime);
  }

  determineMealTime() {
    this.currentTime = moment();
    //this.currentTime = moment("10:00", "HH:mm");
    this.checkIfBreakfastTime();
    this.checkIfLunchTime();
    this.checkIfDinnerTime();

    if (this.isDinnerTime) {
      this.currentMeal = "dinner";
    } else if (this.isLunchTime) {
      this.currentMeal = "lunch";
    }else {
      this.currentMeal = "breakfast";
    }

    // alert("It's currently " + this.currentMeal.toUpperCase());

  }

  determineCutOffTimes() {
    let diffBetweenBreakfastAndLunch = moment(this.lunchTime, "HH:mm").diff(moment(this.breakfastTime, "HH:mm"));
    let dBL = moment.duration(diffBetweenBreakfastAndLunch);
    let breakfastToLunch =  Math.floor(dBL.asHours()) + moment.utc(diffBetweenBreakfastAndLunch).format(":mm");

    let minsAfterBreakfast = (moment.duration(breakfastToLunch).asMinutes()/2);
    let breakfastCutOff = moment(this.breakfastTime, "HH:mm").add(minsAfterBreakfast, "minutes").format("HH:mm");

    let diffBetweenLunchAndDinner = moment(this.dinnerTime, "HH:mm").diff(moment(this.lunchTime, "HH:mm"));
    let dLD = moment.duration(diffBetweenLunchAndDinner);
    let lunchToDinner =  Math.floor(dLD.asHours()) + moment.utc(diffBetweenLunchAndDinner).format(":mm");

    let minsAfterLunch = (moment.duration(lunchToDinner).asMinutes()/2);
    let lunchCutOff = moment(this.lunchTime, "HH:mm").add(minsAfterLunch, "minutes").format("HH:mm");

    let diffBetweenDinnerAndBreakfast1 = moment(this.breakfastTime, "HH:mm").add(1, "day").diff(moment(this.dinnerTime, "HH:mm"));
    let dDB1 = moment.duration(diffBetweenDinnerAndBreakfast1);
    let dinnerToBreakfast1 =  Math.floor(dDB1.asHours()) + moment.utc(diffBetweenDinnerAndBreakfast1).format(":mm");

    let minsAfterDinner = (moment.duration(dinnerToBreakfast1).asMinutes()/2);
    let dinnerCutOff = moment(this.dinnerTime, "HH:mm").add(minsAfterDinner, "minutes").format("HH:mm");

    // alert(
    //   "Breakfast Time is: " + this.breakfastTime + "\n" +
    //   "Then wait " + breakfastToLunch + " until lunch" + "\n" +
    //   "The cut-off time for breakfast is: " + breakfastCutOff + "\n" +
    //   "Lunch Time is: " + this.lunchTime + "\n" +
    //   "Then wait " + lunchToDinner + " until dinner" + "\n" +
    //   "The cut-off time for lunch is: " + lunchCutOff + "\n" +
    //   "Dinner Time is: " + this.dinnerTime + "\n" +
    //   "Then wait " + dinnerToBreakfast1 + " until breakfast" + "\n" +
    //   "The cut-off time for dinner is: " + dinnerCutOff + ". \n"
    // );



    this.breakfastEnd = breakfastCutOff;
    this.lunchEnd = lunchCutOff;
    this.dinnerEnd = dinnerCutOff;

    this.breakfastStart = moment(dinnerCutOff, "HH:mm").add(1, "minute").format("HH:mm");
    this.lunchStart = moment(breakfastCutOff, "HH:mm").add(1, "minute").format("HH:mm");
    this.dinnerStart = moment(lunchCutOff, "HH:mm").add(1, "minute").format("HH:mm");

    // alert(
    //   "Breakfast time is " + this.breakfastTime + ", but it is available from " + this.breakfastStart + " until " + this.breakfastEnd + ". \n" +
    //   "Lunch time is " + this.lunchTime + ",  but it is available from " + this.lunchStart + " until " + this.lunchEnd + ". \n" +
    //   "Dinner time is " + this.dinnerTime + ", but it is available from " + this.dinnerStart + " until " + this.dinnerEnd + "."
    // );
    //comment


  }

  sortMealList() {
    this.meals.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  setSelectedMealIndex(index) {
    this.selectedMealIndex = index;
  }

  deleteMeal(index) {
    this.meals.splice(index, 1);
  }

  refresh() {
    this.sortMealList();
    this.determineCutOffTimes();
    this.determineMealTime();
  }

  addTemplateMeals() {
    //Breakfasts
    this.meals.push({
      name: "Toast",
      cost: 0,
      convenience: 0,
      breakfast: true,
      lunch: false,
      dinner: false
    });

    this.meals.push({
      name: "Cereal",
      cost: 0,
      convenience: 0,
      breakfast: true,
      lunch: true,
      dinner: false
    });

    this.meals.push({
      name: "Porridge",
      cost: 0,
      convenience: 1,
      breakfast: true,
      lunch: false,
      dinner: false
    });

    this.meals.push({
      name: "Pancakes",
      cost: 0,
      convenience: 2,
      breakfast: true,
      lunch: false,
      dinner: false
    });

    this.meals.push({
      name: "French toast with bacon",
      cost: 2,
      convenience: 2,
      breakfast: true,
      lunch: false,
      dinner: false
    });

    this.meals.push({
      name: "Omlette",
      cost: 0,
      convenience: 1,
      breakfast: true,
      lunch: false,
      dinner: false
    });

    //Lunches

    this.meals.push({
      name: "Toasted sandwhich",
      cost: 0,
      convenience: 1,
      breakfast: false,
      lunch: true,
      dinner: false
    });

    this.meals.push({
      name: "Instant noodles",
      cost: 0,
      convenience: 0,
      breakfast: false,
      lunch: true,
      dinner: false
    });

    this.meals.push({
      name: "Sushi",
      cost: 2,
      convenience: 0,
      breakfast: false,
      lunch: true,
      dinner: false
    });

    this.meals.push({
      name: "Caesar salad",
      cost: 1,
      convenience: 2,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Krishna food",
      cost: 0,
      convenience: 0,
      breakfast: false,
      lunch: true,
      dinner: false
    });

    this.meals.push({
      name: "Burger King",
      cost: 1,
      convenience: 1,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    // Dinners

    this.meals.push({
      name: "Beef Lasagne",
      cost: 2,
      convenience: 2,
      breakfast: false,
      lunch: false,
      dinner: true
    });

    this.meals.push({
      name: "Stir Fry",
      cost: 1,
      convenience: 1,
      breakfast: false,
      lunch: false,
      dinner: true
    });

    this.meals.push({
      name: "Nachos",
      cost: 0,
      convenience: 1,
      breakfast: false,
      lunch: false,
      dinner: true
    });

    this.meals.push({
      name: "Nasi Goreng",
      cost: 0,
      convenience: 2,
      breakfast: false,
      lunch: false,
      dinner: true
    });

    this.meals.push({
      name: "Chicken Katsu",
      cost: 1,
      convenience: 0,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Anything from KC Cafe",
      cost: 1,
      convenience: 0,
      breakfast: false,
      lunch: false,
      dinner: true
    });

    this.sortMealList();
  }

  constructor(public http: HttpClient) {
    console.log('Hello AppDataProvider Provider');

    this.costDescriptions = ["Cheap", "Moderate", "Expensive"];
    this.convenienceDescriptions = ["Quick & Easy", "Average", "Complex"];


    this.meals = [];
    this.addTemplateMeals();

    this.breakfastTime = "08:00";
    this.lunchTime = "13:00";
    this.dinnerTime = "20:00";

    this.determineCutOffTimes();
    this.determineMealTime();

    this.task = setInterval(() => {
      this.refresh();
    },5000);


  }

}
