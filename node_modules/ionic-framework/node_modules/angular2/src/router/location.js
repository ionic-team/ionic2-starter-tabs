'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var location_strategy_1 = require('./location_strategy');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var lang_2 = require('angular2/src/core/facade/lang');
var di_1 = require('angular2/di');
exports.APP_BASE_HREF = lang_1.CONST_EXPR(new di_1.OpaqueToken('appBaseHref'));
/**
 * This is the service that an application developer will directly interact with.
 *
 * Responsible for normalizing the URL against the application's base href.
 * A normalized URL is absolute from the URL host, includes the application's base href, and has no
 * trailing slash:
 * - `/my/app/user/123` is normalized
 * - `my/app/user/123` **is not** normalized
 * - `/my/app/user/123/` **is not** normalized
 */
var Location = (function () {
    function Location(platformStrategy, href) {
        var _this = this;
        this.platformStrategy = platformStrategy;
        this._subject = new async_1.EventEmitter();
        var browserBaseHref = lang_1.isPresent(href) ? href : this.platformStrategy.getBaseHref();
        if (lang_2.isBlank(browserBaseHref)) {
            throw new lang_2.BaseException("No base href set. Either provide a binding to \"appBaseHrefToken\" or add a base element.");
        }
        this._baseHref = stripTrailingSlash(stripIndexHtml(browserBaseHref));
        this.platformStrategy.onPopState(function (_) { async_1.ObservableWrapper.callNext(_this._subject, { 'url': _this.path(), 'pop': true }); });
    }
    Location.prototype.path = function () { return this.normalize(this.platformStrategy.path()); };
    Location.prototype.normalize = function (url) {
        return stripTrailingSlash(_stripBaseHref(this._baseHref, stripIndexHtml(url)));
    };
    Location.prototype.normalizeAbsolutely = function (url) {
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return stripTrailingSlash(_addBaseHref(this._baseHref, url));
    };
    Location.prototype.go = function (url) {
        var finalUrl = this.normalizeAbsolutely(url);
        this.platformStrategy.pushState(null, '', finalUrl);
    };
    Location.prototype.forward = function () { this.platformStrategy.forward(); };
    Location.prototype.back = function () { this.platformStrategy.back(); };
    Location.prototype.subscribe = function (onNext, onThrow, onReturn) {
        if (onThrow === void 0) { onThrow = null; }
        if (onReturn === void 0) { onReturn = null; }
        async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
    };
    Location = __decorate([
        di_1.Injectable(),
        __param(1, di_1.Optional()),
        __param(1, di_1.Inject(exports.APP_BASE_HREF)), 
        __metadata('design:paramtypes', [location_strategy_1.LocationStrategy, String])
    ], Location);
    return Location;
})();
exports.Location = Location;
function _stripBaseHref(baseHref, url) {
    if (baseHref.length > 0 && url.startsWith(baseHref)) {
        return url.substring(baseHref.length);
    }
    return url;
}
function _addBaseHref(baseHref, url) {
    if (!url.startsWith(baseHref)) {
        return baseHref + url;
    }
    return url;
}
function stripIndexHtml(url) {
    if (/\/index.html$/g.test(url)) {
        // '/index.html'.length == 11
        return url.substring(0, url.length - 11);
    }
    return url;
}
function stripTrailingSlash(url) {
    if (/\/$/g.test(url)) {
        url = url.substring(0, url.length - 1);
    }
    return url;
}
//# sourceMappingURL=location.js.map