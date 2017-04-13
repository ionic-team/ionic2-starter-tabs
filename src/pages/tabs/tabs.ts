import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class Tabs {

  tab1Root = 'Home';
  tab2Root = 'About';
  tab3Root = 'Contact';

  constructor() {

  }
}
