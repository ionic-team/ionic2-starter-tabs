import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about-page/about-page.html'
})
export class AboutPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(navController) {
    this.navControler = navController;
  }
}
