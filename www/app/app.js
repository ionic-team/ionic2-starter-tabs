import {App, Platform, StatusBar} from 'ionic/ionic';
import {TabsPage} from './tabs/tabs';
import {Friends} from './data/data';
import './app.scss';

@App({
  template: '<ion-nav [root]="root"></ion-nav>',
  providers: [Friends]
})
export class TabsPage {
  constructor(platform: Platform) {
    this.platform = platform;
    this.root = TabsPage;

    this.platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
