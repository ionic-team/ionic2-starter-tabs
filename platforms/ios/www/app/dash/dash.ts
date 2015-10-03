import {IonicView, NavController, ViewController} from 'ionic/ionic';

@IonicView({
  templateUrl: 'app/dash/dash.html'
})
export class DashCtrl {
  constructor(nav: NavController, view: ViewController) {
    this.nav = nav;
    this.view = view
    this.view.didEnter() =>{
      console.log('ready')
    }
  }

}
