'use strict';var async_1 = require('angular2/src/core/facade/async');
var SpyLocation = (function () {
    function SpyLocation() {
        this.urlChanges = [];
        this._path = '';
        this._subject = new async_1.EventEmitter();
        this._baseHref = '';
        // TODO: remove these once Location is an interface, and can be implemented cleanly
        this.platformStrategy = null;
    }
    SpyLocation.prototype.setInitialPath = function (url) { this._path = url; };
    SpyLocation.prototype.setBaseHref = function (url) { this._baseHref = url; };
    SpyLocation.prototype.path = function () { return this._path; };
    SpyLocation.prototype.simulateUrlPop = function (pathname) { async_1.ObservableWrapper.callNext(this._subject, { 'url': pathname }); };
    SpyLocation.prototype.normalizeAbsolutely = function (url) { return this._baseHref + url; };
    SpyLocation.prototype.go = function (url) {
        url = this.normalizeAbsolutely(url);
        if (this._path == url) {
            return;
        }
        this._path = url;
        this.urlChanges.push(url);
    };
    SpyLocation.prototype.forward = function () {
        // TODO
    };
    SpyLocation.prototype.back = function () {
        // TODO
    };
    SpyLocation.prototype.subscribe = function (onNext, onThrow, onReturn) {
        if (onThrow === void 0) { onThrow = null; }
        if (onReturn === void 0) { onReturn = null; }
        async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
    };
    SpyLocation.prototype.normalize = function (url) { return null; };
    return SpyLocation;
})();
exports.SpyLocation = SpyLocation;
//# sourceMappingURL=location_mock.js.map