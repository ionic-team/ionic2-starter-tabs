System.register("ionic/platform/network/network", ["../plugin"], function (_export) {
    /**
     * Access Network information and respond to changes in network state.
     *
     * @usage
     * ```js
     * let networkInfo = Network.getNetwork()
     * let isOnline = Network.isOnline()
     * let isOffline = Network.isOffline()
     * ```
     */
    "use strict";

    var NativePlugin, __decorate, __metadata, Network;

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

            Network = (function () {
                function Network() {
                    _classCallCheck(this, Network);
                }

                _createClass(Network, null, [{
                    key: "info",

                    /**
                     * Return network info.
                     */
                    value: function info() {
                        this.ifPlugin(function () {
                            return navigator.connection.type;
                        });
                    }

                    /**
                     * @return whether the device is online
                     */
                }, {
                    key: "isOnline",
                    value: function isOnline() {
                        this.ifPlugin(function () {
                            var networkState = navigator.connection.type;
                            return networkState !== window.Connection.UNKNOWN && networkState !== window.Connection.NONE;
                        });
                    }
                }]);

                return Network;
            })();

            _export("Network", Network);

            _export("Network", Network = __decorate([NativePlugin({
                name: 'Network',
                platforms: ['ios', 'android'],
                engines: {
                    cordova: 'cordova-plugin-network-information'
                },
                pluginCheck: function pluginCheck() {
                    return !!navigator.connection;
                }
            }), Injectable(), __metadata('design:paramtypes', [])], Network));
        }
    };
});