import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMealPage } from './edit-meal';

@NgModule({
  declarations: [
    EditMealPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMealPage),
  ],
})
export class EditMealPageModule {}
