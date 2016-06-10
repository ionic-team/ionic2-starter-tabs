import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectedFactPage } from '../selected-fact-page/selected-fact-page';

@Component({
  templateUrl: 'build/pages/scientific-facts-page/scientific-facts-page.html'
})
export class ScientificFactsPage {

  private facts: string[];
  constructor(private navController: NavController) {
  }

  ionViewWillEnter(){
    let facts = [];
    facts.push('Banging your head against a wall uses 150 calories an hour.');
    facts.push('Dogs have four toes on their hind feet, and five on their front feet.');
    facts.push('The ant can lift 50 times its own weight, can pull 30 times its own weight and always falls over on its right side when intoxicated.');
    facts.push('A cockroach will live nine days without it\'s head, before it starves to death.');
    facts.push('Polar bears are left handed.');
    this.facts = facts;
  }

  selectFact(fact){
    this.navController.push(SelectedFactPage, {selectedFact: fact})
  }
}
