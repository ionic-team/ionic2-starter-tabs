import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/selected-fact-page/selected-fact-page.html'
})
export class SelectedFactPage {

  private fact:string;
  
  constructor(private _navController: NavController, private _navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.fact = this._navParams.data.selectedFact;
  }

  goBack(){
    this._navController.pop();
  }
}
