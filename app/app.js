import {App, Platform} from 'ionic/ionic';
import {TabsPage} from './pages/tabs/tabs';


@App({
  templateUrl: 'build/app.html'
})
export class MyApp {
  constructor(platform: Platform) {
    this.root = TabsPage;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
