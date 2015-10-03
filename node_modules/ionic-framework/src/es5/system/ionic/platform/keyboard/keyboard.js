System.register("ionic/platform/keyboard/keyboard", ["../plugin"], function (_export) {
    /**
     * Manage the native keyboard. Note: this plugin performs mainly in the native
     * app context. Most operations are non-functional in a normal web browser as
     * keyboard control is limited.
     *
     * @usage
     * ```js
     * // Hide the accessory bar
     * Keyboard.setAccessoryBarVisible(false)
     *
     * Keyboard.close()
     * ```
     */
    "use strict";

    var NativePlugin, __decorate, __metadata, Keyboard;

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

            Keyboard = (function () {
                function Keyboard() {
                    _classCallCheck(this, Keyboard);
                }

                _createClass(Keyboard, null, [{
                    key: "setAccessoryBarVisible",

                    /**
                     * Set whether the accessory bar is visible.
                     *
                     * Note: this only works while running natively (accessory bar cannot be removed
                     * in most web browsers), and by default the bar is hidden when running natively.
                     *
                     * @param isVisible whether the accessory bar is visible
                     */
                    value: function setAccessoryBarVisible(isVisible) {
                        this.ifPlugin(function () {
                            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!isVisible);
                        });
                    }

                    /**
                     * Close the keyboard.
                     */
                }, {
                    key: "close",
                    value: function close() {
                        this.ifPlugin(function () {
                            cordova.plugins.Keyboard.close();
                        });
                    }

                    /**
                     * Show the keyboard. Does nothing on iOS (has to be triggered from an input)
                     */
                }, {
                    key: "show",
                    value: function show() {
                        this.ifPlugin(function () {
                            cordova.plugins.Keyboard.show();
                        });
                    }

                    /**
                     * @return the visibility of the keyboard.
                     */
                }, {
                    key: "isVisible",
                    value: function isVisible() {
                        return this.ifPlugin(function () {
                            return cordova.plugins.Keyboard.isVisible;
                        });
                    }
                }]);

                return Keyboard;
            })();

            _export("Keyboard", Keyboard);

            _export("Keyboard", Keyboard = __decorate([NativePlugin({
                name: 'Keyboard',
                platforms: ['ios', 'android'],
                engines: {
                    cordova: 'ionic-plugin-keyboard'
                },
                pluginCheck: function pluginCheck() {
                    return window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard;
                }
            }), __metadata('design:paramtypes', [])], Keyboard));
        }
    };
});