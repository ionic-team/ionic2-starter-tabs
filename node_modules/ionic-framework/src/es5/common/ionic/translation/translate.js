"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

/**
 * Provide multi-language and i18n support in your app. Translate works by
 * mapping full strings to language translated ones. That means that you don't need
 * to provide strings for your default language, just new languages.
 *
 * @usage
 * ```js
 * Translate.translations({
 *   'de': {
 *     'Welcome to MyApp': 'Willkommen auf'
 *   }
 * })
 *
 * Changing the default language:
 *
 * Translate.setLanguage('de');
 * ```
 *
 * Usage in a template:
 *
 * ```js
 * <span>{{ 'Welcome to MyApp' | translate }}
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
var Translate = (function () {
    function Translate() {
        _classCallCheck(this, Translate);

        this._transMap = {};
    }

    _createClass(Translate, [{
        key: "translations",
        value: function translations(lang, map) {
            this._transMap[lang] = map;
        }
    }, {
        key: "setLanguage",
        value: function setLanguage(lang) {
            this._language = lang;
        }
    }, {
        key: "getTranslations",
        value: function getTranslations(lang) {
            return this._transMap[lang];
        }
    }, {
        key: "translate",
        value: function translate(key, lang) {
            // If the language isn't specified and we have no overridden one, return the string passed.
            if (!lang && !this._language) {
                return key;
            }
            var setLanguage = lang || this._language;
            var map = this.getTranslations(setLanguage);
            if (!map) {
                console.warn('I18N: No translation for key', key, 'using language', setLanguage);
                return '';
            }
            return this._getTranslation(map, key);
        }
    }, {
        key: "_getTranslation",
        value: function _getTranslation(map, key) {
            return map && map[key] || '';
        }
    }]);

    return Translate;
})();
exports.Translate = Translate;
exports.Translate = Translate = __decorate([(0, _angular2Angular2.Injectable)(), __metadata('design:paramtypes', [])], Translate);