var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NativePlugin } from '../plugin';
/**
* Vibrate the device. Uses the HTMl5 Vibration API or the `cordova-plugin-vibration` plugin (preferred)
*
* @usage
* ```js
* Vibration.vibrate();
* ```
*/
export let Vibration = class {
    /**
     * Vibrate the device. Note: iOS does not support the pattern parameter.
     *
     * @param pattern the vibration pattern in ms to use [1000,1000,1000] (vibrate three times, one second each)
     */
    static vibrate(pattern) {
        if (!navigator.vibrate) {
            this.pluginWarn();
            console.log('Vibrate (dev): ', pattern);
        }
        else {
            navigator.vibrate(pattern);
        }
    }
};
Vibration = __decorate([
    NativePlugin({
        name: 'Vibration',
        platforms: ['ios', 'android', 'web'],
        engines: {
            cordova: 'cordova-plugin-vibration'
        }
    }), 
    __metadata('design:paramtypes', [])
], Vibration);