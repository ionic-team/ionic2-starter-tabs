import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/selected-fact-page/selected-fact-page.html'
})
export class SelectedFactPage {

  private fact:string;
  
  constructor(private navController: NavController, private navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.fact = this.navParams.data.selectedFact;
  }

  goBack(){
    this.navController.pop();
  }
}
