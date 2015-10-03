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
export let Barcode = class {
    /**
     * Scan a barcode.
     *
     * @return Promise that resolves with an object of the format: {
     *   text: text that was scanned,
     *   format: format of barcode,
     *   cancelled: was it canceled?
     * }
     */
    static scan() {
        return new Promise((resolve, reject) => {
            let hasPlugin = this.ifPlugin(() => {
                window.cordova.plugins.barcodeScanner.scan((result) => {
                    resolve(result);
                }, (err) => {
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
    static encode(type, data) {
        return new Promise((resolve, reject) => {
            let hasPlugin = this.ifPlugin(() => {
                window.cordova.plugins.barcodeScanner.encode(type, data, (result) => {
                    resolve(result);
                }, (err) => {
                    reject(err);
                });
            });
            if (!hasPlugin) {
                reject('No scanner available');
            }
        });
    }
};
Barcode.TEXT_TYPE = "TEXT_TYPE";
Barcode.EMAIL_TYPE = "EMAIL_TYPE";
Barcode.PHONE_TYPE = "PHONE_TYPE";
Barcode.SMS_TYPE = "SMS_TYPE";
Barcode = __decorate([
    NativePlugin({
        name: 'Barcode',
        platforms: ['ios', 'android'],
        engines: {
            cordova: 'phonegap-plugin-barcodescanner'
        },
        pluginCheck: () => {
            return window.cordova && window.cordova.plugins && window.cordova.plugins.barcodeScanner;
        }
    }), 
    __metadata('design:paramtypes', [])
], Barcode);