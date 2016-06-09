import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/contact-page/contact-page.html'
})
export class ContactPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(_navController) {
    this._navControler = _navController;
  }
}
