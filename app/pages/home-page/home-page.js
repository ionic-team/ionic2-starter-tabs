import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScientificFactsPage } from '../scientific-facts-page/scientific-facts-page';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(navController) {
    this.navController = navController;
  }

  goToFactsPage(){
    this.navController.push(ScientificFactsPage);
  }
}
