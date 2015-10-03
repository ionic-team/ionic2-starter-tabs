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
 * Access Network information and respond to changes in network state.
 *
 * @usage
 * ```js
 * let networkInfo = Network.getNetwork()
 * let isOnline = Network.isOnline()
 * let isOffline = Network.isOffline()
 * ```
 */
export let Network = class {
    /**
     * Return network info.
     */
    static info() {
        this.ifPlugin(() => {
            return navigator.connection.type;
        });
    }
    /**
     * @return whether the device is online
     */
    static isOnline() {
        this.ifPlugin(() => {
            var networkState = navigator.connection.type;
            return networkState !== window.Connection.UNKNOWN && networkState !== window.Connection.NONE;
        });
    }
};
Network = __decorate([
    NativePlugin({
        name: 'Network',
        platforms: ['ios', 'android'],
        engines: {
            cordova: 'cordova-plugin-network-information'
        },
        pluginCheck: () => {
            return !!navigator.connection;
        }
    }),
    Injectable(), 
    __metadata('design:paramtypes', [])
], Network);