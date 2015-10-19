import {Page} from 'ionic/ionic';
import {Friends} from '../data/data';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
  templateUrl:'app/account/account.html',
})
export class AccountCtrl {
  constructor(friends:Friends){
    this.settings = new ControlGroup({
      enableFriends: new Control(true)
    });
  }
}

