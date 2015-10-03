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
 * Manage the appearance of the native status bar.
 *
 * @usage
 * ```js
 * StatusBar.hide(); // Hide the bar
 *
 * StatusBar.setStyle(StatusBar.LIGHT_CONTENT) // Good for dark backgrounds
 * ```
 */
export let StatusBar = class {
    /**
     * Show the StatusBar
     */
    static show() {
        this.ifPlugin(() => {
            window.StatusBar.show();
        });
    }
    /**
     * Hide the StatusBar
     */
    static hide() {
        this.ifPlugin(() => {
            window.StatusBar.hide();
        });
    }
    /**
     * Hide the StatusBar
     *
     * Options:
     *
     * StatusBar.DEFAULT
     * StatusBar.LIGHT_CONTENT
     * StatusBar.BLACK_TRANSLUCENT
     * StatusBar.BLACK_OPAQUE
     *
     * @param style the style from above
     */
    static setStyle(style) {
        this.ifPlugin(() => {
            switch (style) {
                case StatusBar.DEFAULT:
                    window.StatusBar.styleDefault();
                    break;
                case StatusBar.LIGHT_CONTENT:
                    window.StatusBar.styleLightContent();
                    break;
                case StatusBar.BLACK_TRANSLUCENT:
                    window.StatusBar.styleBlackTranslucent();
                    break;
                case StatusBar.BLACK_OPAQUE:
                    window.StatusBar.styleBlackOpaque();
                    break;
            }
        });
    }
    /**
     * Set the status bar to a specific hex color (CSS shorthand supported!).
     *
     * iOS note: you must call StatusBar.setOverlay(false) to enable color changing.
     *
     * @param hex the hex value of the color.
     */
    static setHexColor(hex) {
        this.ifPlugin(() => {
            window.StatusBar.backgroundColorByHexName(hex);
        });
    }
    /**
     * Set the status bar to a specific named color. Valid options:
     * black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown.
     *
     * iOS note: you must call StatusBar.setOverlay(false) to enable color changing.
     *
     * @param name the name of the color (from above)
     */
    static setNamedColor(name) {
        this.ifPlugin(() => {
            window.StatusBar.backgroundColorByName(name);
        });
    }
    /**
     * Set whether the status bar overlays the main app view. The default
     * is true.
     *
     * @param doesOverlay whether the status bar overlays the main app view.
     */
    static setOverlays(doesOverlay) {
        this.ifPlugin(() => {
            window.StatusBar.overlaysWebView(doesOverlay);
        });
    }
};
StatusBar.DEFAULT = 0;
StatusBar.LIGHT_CONTENT = 1;
StatusBar.BLACK_TRANSLUCENT = 2;
StatusBar.BLACK_OPAQUE = 3;
StatusBar = __decorate([
    NativePlugin({
        name: 'StatusBar',
        platforms: ['ios', 'android'],
        engines: {
            cordova: 'cordova-plugin-statusbar'
        },
        pluginCheck: () => {
            return !!window.StatusBar;
        }
    }), 
    __metadata('design:paramtypes', [])
], StatusBar);