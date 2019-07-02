import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment';

@Injectable()
export class AppDataProvider {

  breakfastStart: string;
  breakfastTime: string;
  breakfastEnd: string;
  isBreakfastTime : Boolean;
  lunchStart: string;
  lunchTime: string;
  lunchEnd: string;
  isLunchTime: Boolean;
  dinnerStart: string;
  dinnerTime: string;
  dinnerEnd: string;
  isDinnerTime : Boolean;
  currentMeal: string;
  currentTime: Moment;

  meals: any[];
  selectedMealIndex: number;

  costDescriptions: any[]=[];
  convenienceDescriptions: any[]=[];

  task : any;

  imageUrl: String;
  imageWidth: any;
  imageHeight: any;

  getMealsForCurrentMealTime() {
    let appropriateMeals = [];
    for (let i=0; i < this.meals.length; i++) {
      let eachMeal = this.meals[i];
      if (this.currentMeal == "lunch" && eachMeal.lunch==true) {
        appropriateMeals.push(eachMeal);
      } else if (this.currentMeal == "breakfast" && eachMeal.breakfast==true) {
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
        //add a day to current time to compensate for adding a day to end time
      }
    }

    this.isBreakfastTime = currentTime.isBetween(startTime, endTime);
  }


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
        //add a day to current time to compensate for adding a day to end time
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
        //add a day to current time to compensate for adding a day to end time
      }
    }

    this.isDinnerTime = currentTime.isBetween(startTime, endTime);
  }

  determineMealTime() {
    this.currentTime = moment();
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
  }

  determineCutOffTimes() {
    // Splits a 24hr period into three segments (one for each meal), which surround the user specified Breakfast/Lunch/Dinner times. 
    // This is used to recommend the correct meal type during the period before / after specified meal times. 

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

    this.breakfastEnd = breakfastCutOff;
    this.lunchEnd = lunchCutOff;
    this.dinnerEnd = dinnerCutOff;

    this.breakfastStart = moment(dinnerCutOff, "HH:mm").add(1, "minute").format("HH:mm");
    this.lunchStart = moment(breakfastCutOff, "HH:mm").add(1, "minute").format("HH:mm");
    this.dinnerStart = moment(lunchCutOff, "HH:mm").add(1, "minute").format("HH:mm");
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
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Cereal",
      cost: 0,
      convenience: 0,
      breakfast: true,
      lunch: true,
      dinner: true
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
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "French toast with bacon",
      cost: 2,
      convenience: 2,
      breakfast: true,
      lunch: true,
      dinner: false
    });

    this.meals.push({
      name: "Omlette",
      cost: 0,
      convenience: 1,
      breakfast: true,
      lunch: false,
      dinner: true
    });

    //Lunches
    this.meals.push({
      name: "Toasted sandwhich",
      cost: 0,
      convenience: 1,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Instant noodles",
      cost: 0,
      convenience: 0,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Sushi",
      cost: 2,
      convenience: 0,
      breakfast: false,
      lunch: true,
      dinner: true
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
      dinner: true
    });

    this.meals.push({
      name: "McDonalds",
      cost: 1,
      convenience: 1,
      breakfast: true,
      lunch: true,
      dinner: true
    });

    // Dinners
    this.meals.push({
      name: "Beef Lasagne",
      cost: 2,
      convenience: 2,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Stir Fry",
      cost: 1,
      convenience: 1,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Nachos",
      cost: 0,
      convenience: 1,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.meals.push({
      name: "Nasi Goreng",
      cost: 0,
      convenience: 2,
      breakfast: false,
      lunch: true,
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
      name: "Pad Thai",
      cost: 1,
      convenience: 0,
      breakfast: false,
      lunch: true,
      dinner: true
    });

    this.sortMealList();
  }

  constructor(public http: HttpClient) {
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
