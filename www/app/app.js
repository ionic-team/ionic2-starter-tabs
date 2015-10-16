import {App} from 'ionic/ionic';
import {DashCtrl} from './dash/dash';
import {ChatsCtrl} from './chats/chats';
import {AccountCtrl} from './account/account';
import {Friends} from './data/data';
@App({
  templateUrl: 'app/app.html',
  providers: [Friends]
})

export class TabsPage {
  constructor() {
    this.DashRoot = DashCtrl;
    this.ChatsRoot = ChatsCtrl;
    this.AccountRoot = AccountCtrl;
  }
}

