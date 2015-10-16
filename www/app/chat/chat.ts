import {Page, NavParams} from 'ionic/ionic';
@Page({
  templateUrl: 'app/chat/chat.html'
})

export class ChatDetailCtrl {
   constructor(params: NavParams) {
    this.chat = params.get('chat');
   }


}
