import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ScientificFactsPage} from '../scientific-facts-page/scientific-facts-page';

@Component({
  templateUrl: 'build/pages/home-page/home-page.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(_navController) {
    this._navController = _navController;
  }

  goToFactsPage(){
    this._navController.push(ScientificFactsPage);
  }
}
