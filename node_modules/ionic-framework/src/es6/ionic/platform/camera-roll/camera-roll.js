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
import { NativePlugin } from '../plugin';
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
export let CameraRoll = class {
    /**
     * Save the base64 encoded image to the camera roll.
     *
     * @param base64String {String} base-64 encoded image
     * @return {Promise}
     */
    static save(base64String) {
        return new Promise((resolve, reject) => {
            this.ifPlugin(() => {
                window.CameraRoll.saveToCameraRoll(base64String, () => {
                    resolve();
                }, (err) => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get photos from the camera roll.
     */
    static getPhotos(options) {
        return new Promise((resolve, reject) => {
            this.ifPlugin(() => {
                window.CameraRoll.getPhotos((photos) => {
                    resolve(photos);
                });
            });
        });
    }
};
CameraRoll = __decorate([
    NativePlugin({
        name: 'CameraRoll',
        platforms: ['ios'],
        engines: {
            cordova: 'cordova-plugin-camera-roll'
        },
        pluginCheck: () => {
            return !!window.CameraRoll;
        }
    }), 
    __metadata('design:paramtypes', [])
], CameraRoll);