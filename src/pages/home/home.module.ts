import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Home } from './home';

@NgModule({
  declarations: [
    Home,
  ],
  imports: [
    IonicPageModule.forChild(Home),
  ]
})
export class HomeModule {}
