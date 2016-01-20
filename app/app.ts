import {App, Platform} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
  template: '<ion-nav id="nav" [root]="root" #content></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  root: Type = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
