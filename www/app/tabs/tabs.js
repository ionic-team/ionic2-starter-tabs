import {Page} from 'ionic/ionic';
import {Dash} from '../dash/dash';
import {Chats} from '../chats/chats';
import {Account} from '../account/account';

@Page({
  templateUrl: 'app/tabs/tabs.html',
})
export class TabsPage {
  constructor() {
    this.DashRoot = Dash;
    this.ChatsRoot = Chats;
    this.AccountRoot = Account;
  }
}
