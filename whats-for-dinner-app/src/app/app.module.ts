import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicImageLoader } from 'ionic-image-loader';


import { MealsPage } from '../pages/meals/meals';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewMealPage } from '../pages/view-meal/view-meal';
import { EditMealPage } from '../pages/edit-meal/edit-meal';
import { ChosenMealPage } from '../pages/chosen-meal/chosen-meal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppDataProvider } from '../providers/app-data/app-data';

@NgModule({
  declarations: [
    MyApp,
    MealsPage,
    SettingsPage,
    HomePage,
    TabsPage,
    ViewMealPage,
    EditMealPage,
    ChosenMealPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MealsPage,
    SettingsPage,
    HomePage,
    TabsPage,
    ViewMealPage,
    EditMealPage,
    ChosenMealPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppDataProvider
  ]
})
export class AppModule {}
