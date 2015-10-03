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
import { Injectable } from 'angular2/angular2';
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
export let Translate = class {
    constructor() {
        this._transMap = {};
    }
    translations(lang, map) {
        this._transMap[lang] = map;
    }
    setLanguage(lang) {
        this._language = lang;
    }
    getTranslations(lang) {
        return this._transMap[lang];
    }
    translate(key, lang) {
        // If the language isn't specified and we have no overridden one, return the string passed.
        if (!lang && !this._language) {
            return key;
        }
        let setLanguage = lang || this._language;
        let map = this.getTranslations(setLanguage);
        if (!map) {
            console.warn('I18N: No translation for key', key, 'using language', setLanguage);
            return '';
        }
        return this._getTranslation(map, key);
    }
    _getTranslation(map, key) {
        return map && map[key] || '';
    }
};
Translate = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], Translate);