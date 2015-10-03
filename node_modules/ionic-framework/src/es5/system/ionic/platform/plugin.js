System.register('ionic/platform/plugin', [], function (_export) {
    'use strict';

    var NativePluginDecorator;

    _export('NativePlugin', NativePlugin);

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function NativePlugin(config) {
        return function (cls) {
            var annotations = Reflect.getMetadata('annotations', cls) || [];
            annotations.push(new NativePluginDecorator(cls, config));
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
        };
    }

    return {
        setters: [],
        execute: function () {
            NativePluginDecorator = function NativePluginDecorator(cls, config) {
                var _this = this;

                _classCallCheck(this, NativePluginDecorator);

                this.cls = cls;
                this.config = config;
                cls.ifPlugin = function (cb) {
                    var returnType = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                    // Convert to boolean the plugin param
                    var exists = !!check;
                    if (typeof _this.config.pluginCheck === 'function') {
                        exists = _this.config.pluginCheck();
                    }
                    if (exists) {
                        return cb();
                    }
                    // We don't have the plugin, so print a warning message
                    cls.pluginWarn();
                    // If the user supplied a default return value, return it here.
                    if (returnType) {
                        return typeof returnType === 'function' ? returnType() : returnType;
                    }
                    return false;
                };
                cls.pluginWarn = function () {
                    if (cls._pluginWarned) {
                        // Only warn once
                        return;
                    }
                    var platformString = [];
                    for (var k in _this.config.engines) {
                        platformString.push('\t' + k + ': ' + _this.config.engines[k]);
                    }
                    console.warn('Plugin for ' + _this.config.name + ' not installed. For native functionality, please install the correct plugin for your platform:\n' + platformString.join('\n'));
                    // Set a flag so we don't warn again
                    cls._pluginWarned = true;
                };
            };

            _export('NativePluginDecorator', NativePluginDecorator);
        }
    };
});