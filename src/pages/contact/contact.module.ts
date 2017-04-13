import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Contact } from './contact';

@NgModule({
  declarations: [
    Contact,
  ],
  imports: [
    IonicPageModule.forChild(Contact),
  ]
})
export class ContactModule {}
