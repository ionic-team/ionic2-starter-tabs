System.register('ionic/util/util', [], function (_export) {
    // Simple noop function
    'use strict';

    var isBoolean, isString, isNumber, isFunction, isDefined, isUndefined, isBlank, isObject, isArray, isTrueProperty, uid, Log, array;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    _export('noop', noop);

    /**
     * Extend the destination with an arbitrary number of other objects.
     * @param dst the destination
     * @param ... the param objects
     */

    _export('clamp', clamp);

    /**
     * Do a deep extend (merge).
     * @param dst the destination
     * @param ... the param objects
     */

    _export('extend', extend);

    _export('merge', merge);

    /**
     * Apply default arguments if they don't exist in
     * the first object.
     * @param the destination to apply defaults to.
     */

    _export('debounce', debounce);

    _export('defaults', defaults);

    _export('pascalCaseToDashCase', pascalCaseToDashCase);

    /**
     * A simple logger class.
     */

    _export('nextUid', nextUid);

    _export('getQuerystring', getQuerystring);

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function noop() {}

    /**
     * Given a min and max, restrict the given number
     * to the range.
     * @param min the minimum
     * @param n the value
     * @param max the maximum
     */

    function clamp(min, n, max) {
        return Math.max(min, Math.min(n, max));
    }

    function extend(dst) {
        return _baseExtend(dst, [].slice.call(arguments, 1), false);
    }

    function merge(dst) {
        return _baseExtend(dst, [].slice.call(arguments, 1), true);
    }

    function _baseExtend(dst, objs, deep) {
        for (var i = 0, ii = objs.length; i < ii; ++i) {
            var obj = objs[i];
            if (!obj || !isObject(obj) && !isFunction(obj)) continue;
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                var src = obj[key];
                if (deep && isObject(src)) {
                    if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
                    _baseExtend(dst[key], [src], true);
                } else {
                    dst[key] = src;
                }
            }
        }
        return dst;
    }

    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        return function () {
            context = this;
            args = arguments;
            timestamp = new Date();
            var later = function later() {
                var last = new Date() - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) result = func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) result = func.apply(context, args);
            return result;
        };
    }

    function defaults(dest) {
        for (var i = arguments.length - 1; i >= 1; i--) {
            var source = arguments[i] || {};
            for (var key in source) {
                if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
        return dest;
    }

    /**
     * Convert a string in the format thisIsAString to a slug format this-is-a-string
     */

    function pascalCaseToDashCase() {
        var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        return str.charAt(0).toLowerCase() + str.substring(1).replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
        });
    }

    function nextUid() {
        return ++uid;
    }

    /**
     * Grab the query string param value for the given key.
     * @param key the key to look for
     */

    function getQuerystring(url, key) {
        var queryParams = {};
        if (url) {
            var startIndex = url.indexOf('?');
            if (startIndex !== -1) {
                var queries = url.slice(startIndex + 1).split('&');
                if (queries.length) {
                    queries.forEach(function (param) {
                        var split = param.split('=');
                        queryParams[split[0]] = split[1].split('#')[0];
                    });
                }
            }
            if (key) {
                return queryParams[key] || '';
            }
        }
        return queryParams;
    }

    return {
        setters: [],
        execute: function () {
            ;
            isBoolean = function isBoolean(val) {
                return typeof val === 'boolean';
            };

            _export('isBoolean', isBoolean);

            isString = function isString(val) {
                return typeof val === 'string';
            };

            _export('isString', isString);

            isNumber = function isNumber(val) {
                return typeof val === 'number';
            };

            _export('isNumber', isNumber);

            isFunction = function isFunction(val) {
                return typeof val === 'function';
            };

            _export('isFunction', isFunction);

            isDefined = function isDefined(val) {
                return typeof val !== 'undefined';
            };

            _export('isDefined', isDefined);

            isUndefined = function isUndefined(val) {
                return typeof val === 'undefined';
            };

            _export('isUndefined', isUndefined);

            isBlank = function isBlank(val) {
                return val === undefined || val === null;
            };

            _export('isBlank', isBlank);

            isObject = function isObject(val) {
                return typeof val === 'object';
            };

            _export('isObject', isObject);

            isArray = Array.isArray;

            _export('isArray', isArray);

            isTrueProperty = function isTrueProperty(val) {
                return typeof val !== 'undefined' && val !== "false";
            };

            _export('isTrueProperty', isTrueProperty);

            uid = 0;

            Log = (function () {
                function Log() {
                    _classCallCheck(this, Log);
                }

                _createClass(Log, null, [{
                    key: 'log',
                    value: function log() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        console.log.apply(console, args);
                    }
                }, {
                    key: 'info',
                    value: function info() {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        console.info.apply(console, args);
                    }
                }, {
                    key: 'warn',
                    value: function warn() {
                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        console.warn.apply(console, args);
                    }
                }, {
                    key: 'error',
                    value: function error() {
                        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                            args[_key4] = arguments[_key4];
                        }

                        console.error.apply(console, args);
                    }
                }]);

                return Log;
            })();

            _export('Log', Log);

            array = {
                find: function find(arr, cb) {
                    for (var i = 0, ii = arr.length; i < ii; i++) {
                        if (cb(arr[i], i)) return arr[i];
                    }
                },
                remove: function remove(arr, itemOrIndex) {
                    var index = -1;
                    if (isNumber(itemOrIndex)) {
                        index = itemOrIndex;
                    } else {
                        index = arr.indexOf(itemOrIndex);
                    }
                    if (index < 0) {
                        return false;
                    }
                    arr.splice(index, 1);
                    return true;
                }
            };

            _export('array', array);
        }
    };
});