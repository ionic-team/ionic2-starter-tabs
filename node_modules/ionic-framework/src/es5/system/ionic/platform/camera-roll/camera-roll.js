System.register("ionic/platform/camera-roll/camera-roll", ["../plugin"], function (_export) {
    /**
     * Save and load photos from the Camera Roll (currently iOS only).
     *
     * Requires the Cordiva plugin `cordova-plugin-camera-roll`
     *
     * @usage
     * ```js
     * CameraRoll.save(base64EncodedImage).then(() => {
     *   // success
     * }, (err) => {})
     */
    "use strict";

    var NativePlugin, __decorate, __metadata, CameraRoll;

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

            CameraRoll = (function () {
                function CameraRoll() {
                    _classCallCheck(this, CameraRoll);
                }

                _createClass(CameraRoll, null, [{
                    key: "save",

                    /**
                     * Save the base64 encoded image to the camera roll.
                     *
                     * @param base64String {String} base-64 encoded image
                     * @return {Promise}
                     */
                    value: function save(base64String) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this.ifPlugin(function () {
                                window.CameraRoll.saveToCameraRoll(base64String, function () {
                                    resolve();
                                }, function (err) {
                                    reject(err);
                                });
                            });
                        });
                    }

                    /**
                     * Get photos from the camera roll.
                     */
                }, {
                    key: "getPhotos",
                    value: function getPhotos(options) {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2.ifPlugin(function () {
                                window.CameraRoll.getPhotos(function (photos) {
                                    resolve(photos);
                                });
                            });
                        });
                    }
                }]);

                return CameraRoll;
            })();

            _export("CameraRoll", CameraRoll);

            _export("CameraRoll", CameraRoll = __decorate([NativePlugin({
                name: 'CameraRoll',
                platforms: ['ios'],
                engines: {
                    cordova: 'cordova-plugin-camera-roll'
                },
                pluginCheck: function pluginCheck() {
                    return !!window.CameraRoll;
                }
            }), __metadata('design:paramtypes', [])], CameraRoll));
        }
    };
});