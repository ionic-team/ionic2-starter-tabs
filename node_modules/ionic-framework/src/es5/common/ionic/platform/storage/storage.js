/**
 * Storage is an easy way to store key/value pairs and other complicated
 * data in a way that uses a variety of storage engines underneath.
 *
 * For most cases, we recommend the SqlStorage system as it will store
 * data in a file in the app's sandbox. LocalStorage should ONLY be used
 * for temporary data as it may be "cleaned up" by the operation system
 * during low disk space situations.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Storage = (function () {
    function Storage(strategyCls, options) {
        _classCallCheck(this, Storage);

        this._strategy = new strategyCls(options);
    }

    _createClass(Storage, [{
        key: 'get',
        value: function get(key) {
            return this._strategy.get(key);
        }
    }, {
        key: 'getJson',
        value: function getJson(key) {
            try {
                return JSON.parse(this._strategy.get(key));
            } catch (e) {
                console.warn('Storage getJson(): unable to parse value for key', key, ' as JSON');
                return null;
            }
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            return this._strategy.set(key, value);
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            return this._strategy.remove(key);
        }
    }, {
        key: 'query',
        value: function query(_query) {
            return this._strategy.query(key);
        }
    }]);

    return Storage;
})();

exports.Storage = Storage;

var StorageEngine = (function () {
    function StorageEngine() {
        _classCallCheck(this, StorageEngine);
    }

    _createClass(StorageEngine, [{
        key: 'get',
        value: function get(key, value) {
            throw Error("get() not implemented for this storage engine");
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            throw Error("set() not implemented for this storage engine");
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            throw Error("remove() not implemented for this storage engine");
        }
    }, {
        key: 'query',
        value: function query(_query2) {
            throw Error("query() not implemented for this storage engine");
        }
    }]);

    return StorageEngine;
})();

exports.StorageEngine = StorageEngine;