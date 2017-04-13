import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Tabs } from './tabs';

@NgModule({
  declarations: [
    Tabs
  ],
  imports: [
    IonicPageModule.forChild(Tabs)
  ]
})
export class TabsModule {}
