import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about-page/about-page.html'
})
export class AboutPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(_navController) {
    this._navControler = _navController;
  }
}
