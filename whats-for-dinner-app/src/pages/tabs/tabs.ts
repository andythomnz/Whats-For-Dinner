import { Component } from '@angular/core';
import { AppDataProvider } from '../../providers/app-data/app-data';

import { MealsPage } from '../meals/meals';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MealsPage;
  tab3Root = SettingsPage;

  constructor(public appData: AppDataProvider) {

  }
}
