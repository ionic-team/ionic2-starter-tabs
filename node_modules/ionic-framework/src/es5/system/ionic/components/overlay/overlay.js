System.register('ionic/components/overlay/overlay', ['angular2/angular2', 'angular2/src/core/compiler/element_injector', '../../animations/animation', 'ionic/util'], function (_export) {
    'use strict';

    var Component, DirectiveBinding, Animation, util, Overlay, OverlayRef, ROOT_Z_INDEX;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
        }, function (_angular2SrcCoreCompilerElement_injector) {
            DirectiveBinding = _angular2SrcCoreCompilerElement_injector.DirectiveBinding;
        }, function (_animationsAnimation) {
            Animation = _animationsAnimation.Animation;
        }, function (_ionicUtil) {
            util = _ionicUtil;
        }],
        execute: function () {
            Overlay = (function () {
                function Overlay(app, config) {
                    _classCallCheck(this, Overlay);

                    this.app = app;
                    this.config = config;
                    this.mode = config.setting('mode');
                }

                _createClass(Overlay, [{
                    key: 'create',
                    value: function create(overlayType, componentType) {
                        var _this = this;

                        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                        var context = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

                        return new Promise(function (resolve, reject) {
                            var app = _this.app;
                            var annotation = new Component({
                                selector: 'ion-' + overlayType,
                                host: {
                                    '[style.z-index]': 'zIndex',
                                    'mode': _this.mode,
                                    'class': overlayType
                                }
                            });
                            var overlayComponentType = DirectiveBinding.createFromType(componentType, annotation);
                            // create a unique token that works as a cache key
                            overlayComponentType.token = overlayType + componentType.name;
                            app.appendComponent(overlayComponentType).then(function (ref) {
                                var overlayRef = new OverlayRef(app, overlayType, opts, ref, context);
                                overlayRef._open(opts).then(function () {
                                    resolve(overlayRef);
                                });
                            })['catch'](function (err) {
                                console.error('Overlay appendComponent:', err);
                                reject(err);
                            });
                        })['catch'](function (err) {
                            console.error('Overlay create:', err);
                        });
                    }
                }, {
                    key: 'getByType',
                    value: function getByType(overlayType) {
                        if (this.app) {
                            for (var i = this.app.overlays.length - 1; i >= 0; i--) {
                                if (overlayType === this.app.overlays[i]._type) {
                                    return this.app.overlays[i];
                                }
                            }
                        }
                        return null;
                    }
                }, {
                    key: 'getByHandle',
                    value: function getByHandle(handle, overlayType) {
                        if (this.app) {
                            for (var i = this.app.overlays.length - 1; i >= 0; i--) {
                                if (handle === this.app.overlays[i]._handle && overlayType === this.app.overlays[i]._type) {
                                    return this.app.overlays[i];
                                }
                            }
                        }
                        return null;
                    }
                }]);

                return Overlay;
            })();

            _export('Overlay', Overlay);

            OverlayRef = (function () {
                function OverlayRef(app, overlayType, opts, ref, context) {
                    var _this2 = this;

                    _classCallCheck(this, OverlayRef);

                    this.app = app;
                    var overlayInstance = ref && ref.instance;
                    if (!overlayInstance) return;
                    if (context) {
                        util.extend(ref.instance, context);
                    }
                    this._instance = overlayInstance;
                    overlayInstance.onViewLoaded && overlayInstance.onViewLoaded();
                    this.zIndex = ROOT_Z_INDEX;
                    for (var i = 0; i < app.overlays.length; i++) {
                        if (app.overlays[i].zIndex >= this.zIndex) {
                            this.zIndex = app.overlays[i].zIndex + 1;
                        }
                    }
                    overlayInstance.zIndex = this.zIndex;
                    overlayInstance.overlayRef = this;
                    overlayInstance.close = function (instanceOpts) {
                        _this2.close(instanceOpts);
                    };
                    this._elementRef = ref.location;
                    this._type = overlayType;
                    this._opts = opts;
                    this._handle = opts.handle || this.zIndex;
                    this._dispose = function () {
                        _this2._instance = null;
                        ref.dispose && ref.dispose();
                        util.array.remove(app.overlays, _this2);
                    };
                    app.overlays.push(this);
                }

                _createClass(OverlayRef, [{
                    key: 'getElementRef',
                    value: function getElementRef() {
                        return this._elementRef;
                    }
                }, {
                    key: '_open',
                    value: function _open() {
                        var _this3 = this;

                        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        return new Promise(function (resolve) {
                            var instance = _this3._instance || {};
                            instance.onViewWillEnter && instance.onViewWillEnter();
                            var animationName = opts && opts.animation || _this3._opts.enterAnimation;
                            var animation = Animation.create(_this3._elementRef.nativeElement, animationName);
                            animation.before.addClass('show-overlay');
                            _this3.app.setEnabled(false, animation.duration());
                            _this3.app.setTransitioning(true, animation.duration());
                            _this3.app.zoneRunOutside(function () {
                                animation.play().then(function () {
                                    _this3.app.zoneRun(function () {
                                        _this3.app.setEnabled(true);
                                        _this3.app.setTransitioning(false);
                                        animation.dispose();
                                        instance.onViewDidEnter && instance.onViewDidEnter();
                                        resolve();
                                    });
                                });
                            });
                        })['catch'](function (err) {
                            console.error(err);
                        });
                    }
                }, {
                    key: 'close',
                    value: function close() {
                        var _this4 = this;

                        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        return new Promise(function (resolve) {
                            var instance = _this4._instance || {};
                            instance.onViewWillLeave && instance.onViewWillLeave();
                            instance.onViewWillUnload && instance.onViewWillUnload();
                            var animationName = opts && opts.animation || _this4._opts.leaveAnimation;
                            var animation = Animation.create(_this4._elementRef.nativeElement, animationName);
                            animation.after.removeClass('show-overlay');
                            _this4.app.setEnabled(false, animation.duration());
                            _this4.app.setTransitioning(true, animation.duration());
                            animation.play().then(function () {
                                instance.onViewDidLeave && instance.onViewDidLeave();
                                instance.onViewDidUnload && instance.onViewDidUnload();
                                _this4._dispose();
                                _this4.app.setEnabled(true);
                                _this4.app.setTransitioning(false);
                                animation.dispose();
                                resolve();
                            });
                        })['catch'](function (err) {
                            console.error(err);
                        });
                    }
                }]);

                return OverlayRef;
            })();

            _export('OverlayRef', OverlayRef);

            ROOT_Z_INDEX = 1000;
        }
    };
});