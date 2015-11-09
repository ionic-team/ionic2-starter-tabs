import {Page, NavParams} from 'ionic/ionic';

@Page({
  templateUrl: 'app/chat/chat.html'
})
export class ChatDetail {
  constructor(params: NavParams) {
    this.chat = params.get('chat');
  }
}
