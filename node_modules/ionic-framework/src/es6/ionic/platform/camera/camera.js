var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as util from 'ionic/util';
import { NativePlugin } from '../plugin';
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
export let Camera = class {
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
    static getPicture(options) {
        return new Promise((resolve, reject) => {
            if (!navigator.camera) {
                this.pluginWarn();
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
    static cleanup() {
        return new Promise((resolve, reject) => {
            navigator.camera.cleanup(function () {
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    }
};
Camera = __decorate([
    NativePlugin({
        name: 'Camera',
        platforms: ['ios', 'android'],
        engines: {
            cordova: 'cordova-plugin-camera'
        },
        pluginCheck: () => {
            return !!navigator.camera;
        }
    }), 
    __metadata('design:paramtypes', [])
], Camera);