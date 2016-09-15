import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
