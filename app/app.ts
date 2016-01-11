import {App, Platform, Config} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';

@App({
  template: '<ion-nav id="nav" [root]="root" #content></ion-nav>'
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {}
})
export class MyApp {
  
  tab1Root: Object;
  tab2Root: Object;
  tab3Root: Object;
  
  constructor(platform: Platform) {
    this.root = TabsPage;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
