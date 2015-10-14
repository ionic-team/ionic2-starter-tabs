///<referenc path="../../../typings/angular2/angular2.d.ts" />
import {Page, NavController, ViewController, IonicConfig} from 'ionic/ionic';
@Page({
  templateUrl: 'app/dash/dash.html',
})
export class DashCtrl {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
  }

  passChat(chat) {
    this.nav.push(ChatDetailCtrl, {
      chat: chat
    });
  }
}
