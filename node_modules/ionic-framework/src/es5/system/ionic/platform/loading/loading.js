System.register("ionic/platform/loading/loading", ["../plugin"], function (_export) {
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
    "use strict";

    var NativePlugin, __decorate, __metadata, Loading;

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

            Loading = (function () {
                function Loading() {
                    _classCallCheck(this, Loading);
                }

                _createClass(Loading, null, [{
                    key: "simple",

                    /**
                     * Show a simple loading box.
                     *
                     * @param dim {Boolean} whether the dim the background
                     * @param label {String} the custom label
                     * @param detail {String} any detail text
                     */
                    value: function simple(dim, label, detail) {
                        this.ifPlugin(function () {
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
                }, {
                    key: "determinate",
                    value: function determinate(dim, timeout, label) {
                        this.ifPlugin(function () {
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
                }, {
                    key: "annular",
                    value: function annular(dim, timeout, label) {
                        this.ifPlugin(function () {
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
                }, {
                    key: "bar",
                    value: function bar(dim, timeout, label) {
                        this.ifPlugin(function () {
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
                }, {
                    key: "success",
                    value: function success(dim, label) {
                        this.ifPlugin(function () {
                            window.ProgressIndicator.showSuccess(dim, label);
                        });
                    }

                    /**
                     * Hide a loading box
                     */
                }, {
                    key: "hide",
                    value: function hide() {
                        this.ifPlugin(function () {
                            window.ProgressIndicator.hide();
                        });
                    }
                }]);

                return Loading;
            })();

            _export("Loading", Loading);

            _export("Loading", Loading = __decorate([NativePlugin({
                name: 'Loading',
                platforms: ['ios', 'android', 'web'],
                engines: {
                    cordova: 'cordova-plugin-progressindicator'
                },
                pluginCheck: function pluginCheck() {
                    return !!window.ProgressIndicator;
                }
            }), __metadata('design:paramtypes', [])], Loading));
        }
    };
});