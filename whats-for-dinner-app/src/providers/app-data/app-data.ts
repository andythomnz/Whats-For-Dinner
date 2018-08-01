import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

/*
  Generated class for the AppDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppDataProvider {

  message : any;

  //breakfastStart: String;
  breakfastTime: String;
  //breakfastEnd: String;
  //lunchStart: String;
  lunchTime: String;
  //lundEnd: String;
  //dinnerStart: String;
  dinnerTime: String;
  //dinnerend: String;

  determineMealTime() {

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

    alert(
      "Breakfast Time is: " + this.breakfastTime + "\n" +
      "Then wait " + breakfastToLunch + " until lunch" + "\n" +
      "The cut-off time for breakfast is: " + breakfastCutOff + "\n" +
      "Lunch Time is: " + this.lunchTime + "\n" +
      "Then wait " + lunchToDinner + " until dinner" + "\n" +
      "The cut-off time for lunch is: " + lunchCutOff + "\n" +
      "Dinner Time is: " + this.dinnerTime + "\n" +
      "Then wait " + dinnerToBreakfast1 + " until breakfast" + "\n" +
      "The cut-off time for dinner is: " + dinnerCutOff + ". \n"
    );

    this.breakfastEnd = breakfastCutOff;
    this.lunchEnd = lunchCutOff;
    this.dinnerEnd = dinnerCutOff;

    this.breakfastStart = moment(dinnerCutOff, "HH:mm").add(1, "minute").format("HH:mm");
    this.lunchStart = moment(breakfastCutOff, "HH:mm").add(1, "minute").format("HH:mm");
    this.dinnerStart = moment(lunchCutOff, "HH:mm").add(1, "minute").format("HH:mm");

    alert(
      "Breakfast time is " + this.breakfastTime + ", but it is available from " + breakfastStart + " until " + breakfastCutOff + ". \n" +
      "Lunch time is " + this.lunchTime + ",  but it is available from " + lunchStart + " until " + lunchCutOff + ". \n" +
      "Dinner time is " + this.dinnerTime + ", but it is available from " + dinnerStart + " until " + dinnerCutOff + "."
    );


  }

  constructor(public http: HttpClient) {
    console.log('Hello AppDataProvider Provider');
    this.message = "default";
    this.breakfastTime = "07:30";
    this.lunchTime = "13:00";
    this.dinnerTime = "20:00";

    this.determineCutOffTimes();

    //test comment
    //another test comment
  }

}
