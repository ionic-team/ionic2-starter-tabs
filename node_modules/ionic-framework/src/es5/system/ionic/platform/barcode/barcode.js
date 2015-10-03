System.register("ionic/platform/barcode/barcode", ["../plugin"], function (_export) {
    /**
     * Scan barcodes and QR codes.
     *
     * @usage
     *
     * ## Scanning a code
     *
     * ```js
     * Barcode.scan().then((data) => {
     *   console.log("Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
     * }, (err) => {
     * })
     * ```
     *
     * ## Encoding data
     *
     * ```js
     * Barcode.encode(Barcode.TEXT_TYPE).then((data) => {}, (fail) => {});
     * ```
     */
    "use strict";

    var NativePlugin, __decorate, __metadata, Barcode;

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

            Barcode = (function () {
                function Barcode() {
                    _classCallCheck(this, Barcode);
                }

                _createClass(Barcode, null, [{
                    key: "scan",

                    /**
                     * Scan a barcode.
                     *
                     * @return Promise that resolves with an object of the format: {
                     *   text: text that was scanned,
                     *   format: format of barcode,
                     *   cancelled: was it canceled?
                     * }
                     */
                    value: function scan() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var hasPlugin = _this.ifPlugin(function () {
                                window.cordova.plugins.barcodeScanner.scan(function (result) {
                                    resolve(result);
                                }, function (err) {
                                    reject(err);
                                });
                            });
                            if (!hasPlugin) {
                                reject('No scanner available');
                            }
                        });
                    }

                    /**
                     * Encode the given data in a barcode.
                     *
                     * @param type the type to use for encoding (if in doubt, use TYPE_TEXT).
                     * @param data the data to encode
                     * @return Promise
                     */
                }, {
                    key: "encode",
                    value: function encode(type, data) {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var hasPlugin = _this2.ifPlugin(function () {
                                window.cordova.plugins.barcodeScanner.encode(type, data, function (result) {
                                    resolve(result);
                                }, function (err) {
                                    reject(err);
                                });
                            });
                            if (!hasPlugin) {
                                reject('No scanner available');
                            }
                        });
                    }
                }]);

                return Barcode;
            })();

            _export("Barcode", Barcode);

            Barcode.TEXT_TYPE = "TEXT_TYPE";
            Barcode.EMAIL_TYPE = "EMAIL_TYPE";
            Barcode.PHONE_TYPE = "PHONE_TYPE";
            Barcode.SMS_TYPE = "SMS_TYPE";
            _export("Barcode", Barcode = __decorate([NativePlugin({
                name: 'Barcode',
                platforms: ['ios', 'android'],
                engines: {
                    cordova: 'phonegap-plugin-barcodescanner'
                },
                pluginCheck: function pluginCheck() {
                    return window.cordova && window.cordova.plugins && window.cordova.plugins.barcodeScanner;
                }
            }), __metadata('design:paramtypes', [])], Barcode));
        }
    };
});