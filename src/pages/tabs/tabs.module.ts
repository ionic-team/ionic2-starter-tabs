import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePageModule } from '../home/home.module';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    HomePageModule,
    IonicPageModule.forChild(TabsPage),
  ]
})
export class TabsPageModule {}