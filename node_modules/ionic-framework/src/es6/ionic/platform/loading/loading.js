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
 * Simple loading popup indicators.
 *
 * Uses the `cordova-plugin-progressindicator` Cordova plugin. See the [plugin docs](http://paolobernasconi.com/cordova-progressIndicator/)
 * for more information.
 *
 * @usage
 *
 * ```js
 * Loading.show(true, 'Waiting...') // Dim the background and show label
 * ```
 */
export let Loading = class {
    /**
     * Show a simple loading box.
     *
     * @param dim {Boolean} whether the dim the background
     * @param label {String} the custom label
     * @param detail {String} any detail text
     */
    static simple(dim, label, detail) {
        this.ifPlugin(() => {
            if (typeof label === 'undefined') {
                window.ProgressIndicator.showSimple(dim);
                return;
            }
            if (typeof detail === 'undefined') {
                window.ProgressIndicator.showSimpleWithLabel(dim, label);
                return;
            }
            window.ProgressIndicator.showSimpleWithLabelDetail(dim, label, detail);
        });
    }
    /**
     * Show a deteriminate loading box with progress bar
     * that completes after a certain amount of time
     *
     * @param dim {Boolean} whether the dim the background
     * @param timeout {Integer} the timeout for the loading box
     * @param label {String} the custom label
     */
    static determinate(dim, timeout, label) {
        this.ifPlugin(() => {
            if (typeof label === 'undefined') {
                window.ProgressIndicator.showDeterminate(dim, timeout);
                return;
            }
            if (typeof detail === 'undefined') {
                window.ProgressIndicator.showSimpleWithLabel(dim, timeout, label);
                return;
            }
        });
    }
    /**
     * Show a spinning circle
     *
     * @param dim {Boolean} whether the dim the background
     * @param timeout {Integer} the timeout for the loading box
     * @param label {String} the custom label
     */
    static annular(dim, timeout, label) {
        this.ifPlugin(() => {
            if (typeof label === 'undefined') {
                window.ProgressIndicator.showAnnular(dim, timeout);
                return;
            }
            if (typeof detail === 'undefined') {
                window.ProgressIndicator.showAnnularWithLabel(dim, timeout, label);
                return;
            }
        });
    }
    /**
     * Show a bar
     *
     * @param dim {Boolean} whether the dim the background
     * @param timeout {Integer} the timeout for the loading box
     * @param label {String} the custom label
     */
    static bar(dim, timeout, label) {
        this.ifPlugin(() => {
            if (typeof label === 'undefined') {
                window.ProgressIndicator.showBar(dim, timeout);
                return;
            }
            if (typeof detail === 'undefined') {
                window.ProgressIndicator.showBarWithLabel(dim, timeout, label);
                return;
            }
        });
    }
    /**
     * Show a success checkmark
     *
     * @param dim {Boolean} whether the dim the background
     * @param label {String} the custom label
     */
    static success(dim, label) {
        this.ifPlugin(() => {
            window.ProgressIndicator.showSuccess(dim, label);
        });
    }
    /**
     * Hide a loading box
     */
    static hide() {
        this.ifPlugin(() => {
            window.ProgressIndicator.hide();
        });
    }
};
Loading = __decorate([
    NativePlugin({
        name: 'Loading',
        platforms: ['ios', 'android', 'web'],
        engines: {
            cordova: 'cordova-plugin-progressindicator'
        },
        pluginCheck: () => {
            return !!window.ProgressIndicator;
        }
    }), 
    __metadata('design:paramtypes', [])
], Loading);