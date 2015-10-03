System.register('ionic/gestures/gesture', ['ionic/util', 'ionic/gestures/hammer'], function (_export) {
    /**
     * A gesture recognizer class.
     *
     * TODO(mlynch): Re-enable the DOM event simulation that was causing issues (or verify hammer does this already, it might);
     */
    'use strict';

    var util, Hammer, Gesture;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_ionicUtil) {
            util = _ionicUtil;
        }, function (_ionicGesturesHammer) {
            Hammer = _ionicGesturesHammer.Hammer;
        }],
        execute: function () {
            Gesture = (function () {
                function Gesture(element) {
                    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                    _classCallCheck(this, Gesture);

                    util.defaults(opts, {
                        domEvents: true
                    });
                    this.element = element;
                    // Map 'x' or 'y' string to hammerjs opts
                    this.direction = opts.direction || 'x';
                    opts.direction = this.direction === 'x' ? Hammer.DIRECTION_HORIZONTAL : Hammer.DIRECTION_VERTICAL;
                    this._options = opts;
                    this._callbacks = {};
                }

                _createClass(Gesture, [{
                    key: 'options',
                    value: function options() {
                        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        util.extend(this._options, opts);
                    }
                }, {
                    key: 'on',
                    value: function on(type, cb) {
                        if (type == 'pinch' || type == 'rotate') {
                            this.hammertime.get('pinch').set({ enable: true });
                        }
                        this.hammertime.on(type, cb);
                        (this._callbacks[type] || (this._callbacks[type] = [])).push(cb);
                        //this.element.addEventListener(type, cb);
                    }
                }, {
                    key: 'listen',
                    value: function listen() {
                        this.hammertime = Hammer(this.element, this._options);
                    }
                }, {
                    key: 'unlisten',
                    value: function unlisten() {
                        if (this.hammertime) {
                            for (var type in this._callbacks) {
                                for (var i = 0; i < this._callbacks[type].length; i++) {
                                    //this.element.removeEventListener(type, this._callbacks[type][i]);
                                    this.hammertime.off(type, this._callbacks[type]);
                                }
                            }
                            this.hammertime.destroy();
                            this.hammertime = null;
                            this._callbacks = {};
                        }
                    }
                }, {
                    key: 'destroy',
                    value: function destroy() {
                        this.unlisten();
                    }
                }]);

                return Gesture;
            })();

            _export('Gesture', Gesture);
        }
    };
});