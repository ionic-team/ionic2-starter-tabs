import {Page, NavController, ViewController} from 'ionic/ionic';
import {Friends} from '../data/data';
import {ChatDetailCtrl} from '../chat/chat';

@Page({
  templateUrl: 'app/chats/chats.html'
})
export class ChatsCtrl {
  constructor(friends: Friends, nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view;
    this.chats = friends.all();


  }

  passChat(chat) {
    this.nav.push(ChatDetailCtrl, {
      chat: chat
    });
  }
}
