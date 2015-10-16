import {App, Platform, StatusBar} from 'ionic/ionic';
import {DashCtrl} from './dash/dash';
import {ChatsCtrl} from './chats/chats';
import {AccountCtrl} from './account/account';
import {Friends} from './data/data';
@App({
  templateUrl: 'app/app.html',
  providers: [Friends]
})

export class TabsPage {
  constructor(platform: Platform) {
    this.platform = platform;
    this.initializeApp();
    this.DashRoot = DashCtrl;
    this.ChatsRoot = ChatsCtrl;
    this.AccountRoot = AccountCtrl;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
      StatusBar.setStyle(StatusBar.DEFAULT);
    });
  }
}

