import {IonicView} from 'ionic/ionic';
import {DashCtrl} from '../dash/dash';
import {ChatsCtrl} from '../chats/chats';
import {AccountCtrl} from '../account/account';

@IonicView({
  templateUrl: 'app/tabs/tabs.html',
})

export class TabsPage {
  constructor() {
    this.DashRoot = DashCtrl;
    this.ChatsRoot = ChatsCtrl;
    this.AccountRoot = AccountCtrl;
  }
}
