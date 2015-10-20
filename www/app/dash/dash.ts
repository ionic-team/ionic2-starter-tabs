///<referenc path="../../../typings/angular2/angular2.d.ts" />
import {Page, NavController, ViewController} from 'ionic/ionic';
@Page({
  templateUrl: 'app/dash/dash.html',
})
export class Dash {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

}
