import {Page, NavController, ViewController} from 'ionic/ionic';
import {Friends} from '../data/data';
import {ChatDetail} from '../chat/chat';

@Page({
  templateUrl: 'app/chats/chats.html'
})
export class Chats {
  constructor(friends: Friends, nav: NavController) {
    this.nav = nav;
    this.friends = friends;
    this.chats = this.friends.chats;
  }

  passChat(chat) {
    this.nav.push(ChatDetail, {
      chat: chat
    });
  }

  remove(chat) {
    this.friends.remove(chat)
  }
}
