'use strict';// Some of the code comes from WebComponents.JS
// https://github.com/webcomponents/webcomponentsjs/blob/master/src/HTMLImports/path.js
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
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/core/facade/lang');
var url_resolver_1 = require('angular2/src/core/services/url_resolver');
/**
 * Rewrites URLs by resolving '@import' and 'url()' URLs from the given base URL,
 * removes and returns the @import urls
 */
var StyleUrlResolver = (function () {
    function StyleUrlResolver(_resolver) {
        this._resolver = _resolver;
    }
    StyleUrlResolver.prototype.resolveUrls = function (cssText, baseUrl) {
        cssText = this._replaceUrls(cssText, _cssUrlRe, baseUrl);
        return cssText;
    };
    StyleUrlResolver.prototype.extractImports = function (cssText) {
        var foundUrls = [];
        cssText = this._extractUrls(cssText, _cssImportRe, foundUrls);
        return new StyleWithImports(cssText, foundUrls);
    };
    StyleUrlResolver.prototype._replaceUrls = function (cssText, re, baseUrl) {
        var _this = this;
        return lang_1.StringWrapper.replaceAllMapped(cssText, re, function (m) {
            var pre = m[1];
            var originalUrl = m[2];
            if (lang_1.RegExpWrapper.test(_dataUrlRe, originalUrl)) {
                // Do not attempt to resolve data: URLs
                return m[0];
            }
            var url = lang_1.StringWrapper.replaceAll(originalUrl, _quoteRe, '');
            var post = m[3];
            var resolvedUrl = _this._resolver.resolve(baseUrl, url);
            return pre + "'" + resolvedUrl + "'" + post;
        });
    };
    StyleUrlResolver.prototype._extractUrls = function (cssText, re, foundUrls) {
        return lang_1.StringWrapper.replaceAllMapped(cssText, re, function (m) {
            var originalUrl = m[2];
            if (lang_1.RegExpWrapper.test(_dataUrlRe, originalUrl)) {
                // Do not attempt to resolve data: URLs
                return m[0];
            }
            var url = lang_1.StringWrapper.replaceAll(originalUrl, _quoteRe, '');
            foundUrls.push(url);
            return '';
        });
    };
    StyleUrlResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [url_resolver_1.UrlResolver])
    ], StyleUrlResolver);
    return StyleUrlResolver;
})();
exports.StyleUrlResolver = StyleUrlResolver;
var StyleWithImports = (function () {
    function StyleWithImports(style, styleUrls) {
        this.style = style;
        this.styleUrls = styleUrls;
    }
    return StyleWithImports;
})();
exports.StyleWithImports = StyleWithImports;
var _cssUrlRe = /(url\()([^)]*)(\))/g;
var _cssImportRe = /(@import[\s]+(?:url\()?)['"]?([^'"\)]*)['"]?(.*;)/g;
var _quoteRe = /['"]/g;
var _dataUrlRe = /^['"]?data:/g;
//# sourceMappingURL=style_url_resolver.js.map