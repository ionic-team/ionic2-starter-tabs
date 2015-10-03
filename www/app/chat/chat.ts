import {IonicView, NavParams} from 'ionic/ionic';
import {Injectable} from "angular2/angular2";
@Injectable()
@IonicView({
  templateUrl: 'app/chat/chat.html'
})

export class ChatDetailCtrl {
   constructor(params: NavParams) {
    this.chat = params.get('chat');
   }


}
