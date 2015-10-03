"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _plugin = require('../plugin');

/**
* Vibrate the device. Uses the HTMl5 Vibration API or the `cordova-plugin-vibration` plugin (preferred)
*
* @usage
* ```js
* Vibration.vibrate();
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
var Vibration = (function () {
    function Vibration() {
        _classCallCheck(this, Vibration);
    }

    _createClass(Vibration, null, [{
        key: "vibrate",

        /**
         * Vibrate the device. Note: iOS does not support the pattern parameter.
         *
         * @param pattern the vibration pattern in ms to use [1000,1000,1000] (vibrate three times, one second each)
         */
        value: function vibrate(pattern) {
            if (!navigator.vibrate) {
                this.pluginWarn();
                console.log('Vibrate (dev): ', pattern);
            } else {
                navigator.vibrate(pattern);
            }
        }
    }]);

    return Vibration;
})();
exports.Vibration = Vibration;
exports.Vibration = Vibration = __decorate([(0, _plugin.NativePlugin)({
    name: 'Vibration',
    platforms: ['ios', 'android', 'web'],
    engines: {
        cordova: 'cordova-plugin-vibration'
    }
}), __metadata('design:paramtypes', [])], Vibration);