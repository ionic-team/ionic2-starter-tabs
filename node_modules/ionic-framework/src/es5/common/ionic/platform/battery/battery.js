"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ionicUtil = require('ionic/util');

var util = _interopRequireWildcard(_ionicUtil);

var _plugin = require('../plugin');

/**
 * Track battery status. Uses the HTMl5 Battery API if available or
 * the `cordova-plugin-battery-status` plugin.
 *
 * @usage
 *
 * ```js
 * Battery.getStatus().then((data) => {
 *   console.log(data.charging, data.level, data.chargingTime, data.dischargingTime)
 * });
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
var _Battery = (function () {
    function Battery() {
        _classCallCheck(this, Battery);
    }

    _createClass(Battery, null, [{
        key: "getStatus",

        /**
         * Get the status of the battery. Data is of the format:
         * { charging, level, chargingTime, dischargingTime }
         *
         * Note: certain fields might not be available depending on the platform.
         *
         * @return {object} battery status
         */
        value: function getStatus() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (navigator.getBattery) {
                    navigator.getBattery().then(function (battery) {
                        _this.battery = battery;
                        resolve(_Battery._format(battery));
                    });
                } else {
                    var fnCb = function fnCb(battery) {
                        resolve(battery);
                        window.removeEventListener('batterystatus', fnCb);
                    };
                    window.addEventListener('batterystatus', fnCb);
                }
            });
        }
    }, {
        key: "_format",
        value: function _format(batteryObj) {
            if (typeof batteryObj.isPlugged !== 'undefined') {
                // This is the old format, map it to the new format
                util.extend(batteryObj, {
                    charging: batteryObj.isPlugged,
                    level: batteryObj.level / 100,
                    chargingTime: 0,
                    dischargingTime: 0 //not provided
                });
            }
            return batteryObj;
        }
    }]);

    return Battery;
})();
exports.Battery = _Battery;
_Battery = __decorate([(0, _plugin.NativePlugin)({
    name: 'Battery',
    platforms: ['ios', 'android', 'web'],
    engines: {
        cordova: 'cordova-plugin-battery-status'
    }
}), __metadata('design:paramtypes', [])], _Battery);