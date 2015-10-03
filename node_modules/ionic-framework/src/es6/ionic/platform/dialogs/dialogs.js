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
 * A native dialogs system. Native dialogs can give you a bit more
 * control over the UI than the browser built-ins, though the Dialogs
 * plugin will fall back to the built-ins when necessary.
 */
export let Dialogs = class {
    /**
     * Trigger an alert prompt.
     *
     * @param message the message to show
     * @param title the title to show
     * @param buttonName the button label to use (not available on browser fallback)
     * @return Promise
     */
    static alert(message, title, buttonName) {
        return new Promise((resolve, reject) => {
            if (!navigator.notification) {
                this.pluginWarn();
                alert(message);
                resolve();
            }
            else {
                navigator.notification.alert(message, () => {
                    resolve();
                }, title, buttonName);
            }
        });
    }
    /**
     * Trigger a confirm prompt.
     *
     * @param message the message to show
     * @param title the title to show
     * @param buttonLabels the button labels to use (not available on browser fallback)
     * @return Promise that resolves with the index of the button selected (zero indexed). 1 is OK on browser fallback
     */
    static confirm(message, title, buttonLabels) {
        return new Promise((resolve, reject) => {
            if (!navigator.notification) {
                this.pluginWarn();
                var ok = confirm(message);
                // Use 2 as OK
                resolve(ok ? 2 : 0);
            }
            else {
                navigator.notification.confirm(message, (buttonIndex) => {
                    resolve(buttonIndex - 1);
                }, title, buttonLabels);
            }
        });
    }
    static prompt(message, title, buttonLabels, defaultText) {
        return new Promise((resolve, reject) => {
            if (!navigator.notification) {
                this.pluginWarn();
                var response = prompt(message);
                // Use 1 as OK
                resolve(response);
            }
            else {
                navigator.notification.prompt(message, (results) => {
                    resolve(results.input1, buttonIndex - 1);
                }, title, buttonLabels, defaultText);
            }
        });
    }
    /**
     * Beep n times. Not available on browser.
     * @param times the number of times to beep
     */
    static beep(times) {
        navigator.notification && navigator.notification.beep(times);
    }
};
Dialogs = __decorate([
    NativePlugin({
        name: 'Dialogs',
        platforms: ['ios', 'android', 'web'],
        engines: {
            cordova: 'cordova-plugin-dialogs'
        }
    }), 
    __metadata('design:paramtypes', [])
], Dialogs);