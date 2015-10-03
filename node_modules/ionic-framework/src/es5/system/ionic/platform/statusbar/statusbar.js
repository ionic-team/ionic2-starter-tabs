System.register("ionic/platform/statusbar/statusbar", ["../plugin"], function (_export) {
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
    "use strict";

    var NativePlugin, __decorate, __metadata, _StatusBar;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_plugin) {
            NativePlugin = _plugin.NativePlugin;
        }],
        execute: function () {
            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
                switch (arguments.length) {
                    case 2:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(o) || o;
                        }, target);
                    case 3:
                        return decorators.reduceRight(function (o, d) {
                            return (d && d(target, key), void 0);
                        }, void 0);
                    case 4:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(target, key, o) || o;
                        }, desc);
                }
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _StatusBar = (function () {
                function StatusBar() {
                    _classCallCheck(this, StatusBar);
                }

                _createClass(StatusBar, null, [{
                    key: "show",

                    /**
                     * Show the StatusBar
                     */
                    value: function show() {
                        this.ifPlugin(function () {
                            window.StatusBar.show();
                        });
                    }

                    /**
                     * Hide the StatusBar
                     */
                }, {
                    key: "hide",
                    value: function hide() {
                        this.ifPlugin(function () {
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
                }, {
                    key: "setStyle",
                    value: function setStyle(style) {
                        this.ifPlugin(function () {
                            switch (style) {
                                case _StatusBar.DEFAULT:
                                    window.StatusBar.styleDefault();
                                    break;
                                case _StatusBar.LIGHT_CONTENT:
                                    window.StatusBar.styleLightContent();
                                    break;
                                case _StatusBar.BLACK_TRANSLUCENT:
                                    window.StatusBar.styleBlackTranslucent();
                                    break;
                                case _StatusBar.BLACK_OPAQUE:
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
                }, {
                    key: "setHexColor",
                    value: function setHexColor(hex) {
                        this.ifPlugin(function () {
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
                }, {
                    key: "setNamedColor",
                    value: function setNamedColor(name) {
                        this.ifPlugin(function () {
                            window.StatusBar.backgroundColorByName(name);
                        });
                    }

                    /**
                     * Set whether the status bar overlays the main app view. The default
                     * is true.
                     *
                     * @param doesOverlay whether the status bar overlays the main app view.
                     */
                }, {
                    key: "setOverlays",
                    value: function setOverlays(doesOverlay) {
                        this.ifPlugin(function () {
                            window.StatusBar.overlaysWebView(doesOverlay);
                        });
                    }
                }]);

                return StatusBar;
            })();

            _export("StatusBar", _StatusBar);

            _StatusBar.DEFAULT = 0;
            _StatusBar.LIGHT_CONTENT = 1;
            _StatusBar.BLACK_TRANSLUCENT = 2;
            _StatusBar.BLACK_OPAQUE = 3;
            _StatusBar = __decorate([NativePlugin({
                name: 'StatusBar',
                platforms: ['ios', 'android'],
                engines: {
                    cordova: 'cordova-plugin-statusbar'
                },
                pluginCheck: function pluginCheck() {
                    return !!window.StatusBar;
                }
            }), __metadata('design:paramtypes', [])], _StatusBar);
        }
    };
});