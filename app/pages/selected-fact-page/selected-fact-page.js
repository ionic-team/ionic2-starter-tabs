import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/selected-fact-page/selected-fact-page.html'
})
export class SelectedFactPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(_navController, _navParams) {
    this._navController = _navController;
    this._navParams = _navParams;
  }

  ionViewWillEnter(){
    this.fact = this._navParams.data.selectedFact;
  }

  goBack(){
    this._navController.pop();
  }
}
