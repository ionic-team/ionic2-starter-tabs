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
 * Take a photo or capture video.
 *
 * Requires Cordova plugin: `cordova-plugin-camera`. For more info, please see the [Cordova Camera Plugin Docs](https://github.com/apache/cordova-plugin-camera).
 *
 * @usage
 * ```js
 * Camera.getPicture(options).then((imageData) => {
 *  // imageData is either a base64 encoded string or a file URI
 *  // If it's base64:
 *  let base64Image = "data:image/jpeg;base64," + imageData;
 * }, (err) => {
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
var Camera = (function () {
    function Camera() {
        _classCallCheck(this, Camera);
    }

    _createClass(Camera, null, [{
        key: "getPicture",

        /**
         * Let the user take a photo or capture video.
         *
         * @param options {object} options for the photo. Of the form (with defaults):
         * {
         *  quality: 80,
         *  destinationType: window.Camera.DestinationType.DATA_URL,
         *  sourceType: window.Camera.PictureSourceType.CAMERA (VIDEO or ALLMEDIA for both),
         *  allowEdit: true,
         *  encodingType: window.Camera.EncodingType.JPEG,
         *  popoverOptions: window.CameraPopoverOptions,
         *  saveToPhotoAlbum: false
         * }
         * @return {Promise} resolving with data or rejecting on error
         */
        value: function getPicture(options) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (!navigator.camera) {
                    _this.pluginWarn();
                    resolve(null);
                    return;
                }
                var options = util.defaults({
                    quality: 80,
                    destinationType: window.Camera.DestinationType.DATA_URL,
                    sourceType: window.Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: window.Camera.EncodingType.JPEG,
                    popoverOptions: window.CameraPopoverOptions,
                    saveToPhotoAlbum: false
                }, options);
                navigator.camera.getPicture(function (imageData) {
                    resolve(imageData);
                }, function (err) {
                    reject(err);
                }, options);
            });
        }

        /**
         * If using FILE_URI and taking photos, photos will be stored temporarily. To
         * remove them, call cleanup when the camera session is finished.
         * @return {Promise}
         */
    }, {
        key: "cleanup",
        value: function cleanup() {
            return new Promise(function (resolve, reject) {
                navigator.camera.cleanup(function () {
                    resolve();
                }, function (err) {
                    reject(err);
                });
            });
        }
    }]);

    return Camera;
})();
exports.Camera = Camera;
exports.Camera = Camera = __decorate([(0, _plugin.NativePlugin)({
    name: 'Camera',
    platforms: ['ios', 'android'],
    engines: {
        cordova: 'cordova-plugin-camera'
    },
    pluginCheck: function pluginCheck() {
        return !!navigator.camera;
    }
}), __metadata('design:paramtypes', [])], Camera);