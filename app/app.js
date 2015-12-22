import {App, Platform} from 'ionic/ionic';
import {Page1} from './pages/page1/page1';
import {Page2} from './pages/page2/page2';
import {Page3} from './pages/page3/page3';


@App({
  templateUrl: 'build/app.html'
})
export class MyApp {
  constructor(platform: Platform) {

    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Page1;
    this.tab2Root = Page2;
    this.tab3Root = Page3;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
