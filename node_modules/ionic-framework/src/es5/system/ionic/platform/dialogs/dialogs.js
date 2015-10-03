System.register("ionic/platform/dialogs/dialogs", ["../plugin"], function (_export) {
    /**
     * A native dialogs system. Native dialogs can give you a bit more
     * control over the UI than the browser built-ins, though the Dialogs
     * plugin will fall back to the built-ins when necessary.
     */
    "use strict";

    var NativePlugin, __decorate, __metadata, Dialogs;

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

            Dialogs = (function () {
                function Dialogs() {
                    _classCallCheck(this, Dialogs);
                }

                _createClass(Dialogs, null, [{
                    key: "alert",

                    /**
                     * Trigger an alert prompt.
                     *
                     * @param message the message to show
                     * @param title the title to show
                     * @param buttonName the button label to use (not available on browser fallback)
                     * @return Promise
                     */
                    value: (function (_alert) {
                        function alert(_x, _x2, _x3) {
                            return _alert.apply(this, arguments);
                        }

                        alert.toString = function () {
                            return _alert.toString();
                        };

                        return alert;
                    })(function (message, title, buttonName) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            if (!navigator.notification) {
                                _this.pluginWarn();
                                alert(message);
                                resolve();
                            } else {
                                navigator.notification.alert(message, function () {
                                    resolve();
                                }, title, buttonName);
                            }
                        });
                    })

                    /**
                     * Trigger a confirm prompt.
                     *
                     * @param message the message to show
                     * @param title the title to show
                     * @param buttonLabels the button labels to use (not available on browser fallback)
                     * @return Promise that resolves with the index of the button selected (zero indexed). 1 is OK on browser fallback
                     */
                }, {
                    key: "confirm",
                    value: (function (_confirm) {
                        function confirm(_x4, _x5, _x6) {
                            return _confirm.apply(this, arguments);
                        }

                        confirm.toString = function () {
                            return _confirm.toString();
                        };

                        return confirm;
                    })(function (message, title, buttonLabels) {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            if (!navigator.notification) {
                                _this2.pluginWarn();
                                var ok = confirm(message);
                                // Use 2 as OK
                                resolve(ok ? 2 : 0);
                            } else {
                                navigator.notification.confirm(message, function (buttonIndex) {
                                    resolve(buttonIndex - 1);
                                }, title, buttonLabels);
                            }
                        });
                    })
                }, {
                    key: "prompt",
                    value: (function (_prompt) {
                        function prompt(_x7, _x8, _x9, _x10) {
                            return _prompt.apply(this, arguments);
                        }

                        prompt.toString = function () {
                            return _prompt.toString();
                        };

                        return prompt;
                    })(function (message, title, buttonLabels, defaultText) {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            if (!navigator.notification) {
                                _this3.pluginWarn();
                                var response = prompt(message);
                                // Use 1 as OK
                                resolve(response);
                            } else {
                                navigator.notification.prompt(message, function (results) {
                                    resolve(results.input1, buttonIndex - 1);
                                }, title, buttonLabels, defaultText);
                            }
                        });
                    })

                    /**
                     * Beep n times. Not available on browser.
                     * @param times the number of times to beep
                     */
                }, {
                    key: "beep",
                    value: function beep(times) {
                        navigator.notification && navigator.notification.beep(times);
                    }
                }]);

                return Dialogs;
            })();

            _export("Dialogs", Dialogs);

            _export("Dialogs", Dialogs = __decorate([NativePlugin({
                name: 'Dialogs',
                platforms: ['ios', 'android', 'web'],
                engines: {
                    cordova: 'cordova-plugin-dialogs'
                }
            }), __metadata('design:paramtypes', [])], Dialogs));
        }
    };
});