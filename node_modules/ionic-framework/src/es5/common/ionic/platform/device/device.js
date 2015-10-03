"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _plugin = require('../plugin');

/**
 * Access information about the underlying device and platform.
 *
 * @usage
 * ```js
 * let info = Device.getDevice();
 * // Device sits below
 * ```
 */
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
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
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _Device = (function () {
    function Device() {
        _classCallCheck(this, Device);
    }

    _createClass(Device, null, [{
        key: "getDevice",

        /**
         * Returns the whole device object.
         * @see https://github.com/apache/cordova-plugin-device
         * @returns {Object} The device object.
         */
        value: function getDevice() {
            return this.ifPlugin(function () {
                return device;
            }, function () {
                return {
                    name: _Device.getName(),
                    model: _Device.getModel(),
                    platform: _Device.getPlatform(),
                    uuid: _Device.getUUID(),
                    version: _Device.getVersion()
                };
            });
        }

        /**
         * Returns the Cordova version.
         * @see https://github.com/apache/cordova-plugin-device#devicecordova
         * @returns {String} The Cordova version.
         */
    }, {
        key: "getCordova",
        value: function getCordova() {
            this.ifPlugin(function () {
                return device.cordova;
            });
        }

        /**
         * Returns the name of the device's model or product.
         * @see https://github.com/apache/cordova-plugin-device#devicemodel
         * @returns {String} The name of the device's model or product.
         */
    }, {
        key: "getModel",
        value: function getModel() {
            this.ifPlugin(function () {
                return device.model;
            }, function () {
                return 'unknown';
            });
        }

        /**
         * @deprecated device.name is deprecated as of version 2.3.0. Use device.model instead.
         * @returns {String}
         */
    }, {
        key: "getName",
        value: function getName() {
            this.ifPlugin(function () {
                return device.name;
            }, function () {
                return 'unknown';
            });
        }

        /**
         * Returns the device's operating system name.
         * @see https://github.com/apache/cordova-plugin-device#deviceplatform
         * @returns {String} The device's operating system name.
         */
    }, {
        key: "getPlatform",
        value: function getPlatform() {
            this.ifPlugin(function () {
                return device.name;
            }, function () {
                return 'unknown';
            });
        }

        /**
         * Returns the device's Universally Unique Identifier.
         * @see https://github.com/apache/cordova-plugin-device#deviceuuid
         * @returns {String} The device's Universally Unique Identifier
         */
    }, {
        key: "getUUID",
        value: function getUUID() {
            this.ifPlugin(function () {
                return device.uuid;
            }, function () {
                return 'unknown';
            });
        }

        /**
         * Returns the operating system version.
         * @see https://github.com/apache/cordova-plugin-device#deviceversion
         * @returns {String}
         */
    }, {
        key: "getVersion",
        value: function getVersion() {
            this.ifPlugin(function () {
                return device.version;
            }, function () {
                return 'unknown';
            });
        }

        /**
         * Returns the device manufacturer.
         * @returns {String}
         */
    }, {
        key: "getManufacturer",
        value: function getManufacturer() {
            this.ifPlugin(function () {
                return device.manufacturer;
            }, function () {
                return 'unknown';
            });
        }
    }]);

    return Device;
})();
exports.Device = _Device;
_Device = __decorate([(0, _plugin.NativePlugin)({
    name: 'Device',
    plugins: ['ios', 'android', 'web'],
    engines: {
        cordova: 'cordova-plugin-device'
    },
    pluginCheck: function pluginCheck() {
        return !!window.device;
    }
}), __metadata('design:paramtypes', [])], _Device);