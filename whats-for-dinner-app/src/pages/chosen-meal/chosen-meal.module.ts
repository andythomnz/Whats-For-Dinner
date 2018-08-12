import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChosenMealPage } from './chosen-meal';

@NgModule({
  declarations: [
    ChosenMealPage,
  ],
  imports: [
    IonicPageModule.forChild(ChosenMealPage),
  ],
})
export class ChosenMealPageModule {}
