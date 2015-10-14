import {App, IonicApp, IonicPlatform, IonicConfig} from 'ionic/ionic';
import {TabsPage} from './tabs/tabs';
import {Friends} from './data/data';

@App({
  template: `<ion-nav [root]="root"></ion-nav>`,
  providers: [Friends],
})

class MyApp {
  constructor(app: IonicApp, platform: IonicPlatform) {
    this.root = TabsPage;
  }
}
