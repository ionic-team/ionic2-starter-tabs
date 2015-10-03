System.register("ionic/util/events", ["angular2/angular2"], function (_export) {
    /**
     * Events is a pub/sub style event system for sending and responding to application-level
     * events across your app.
     */
    "use strict";

    var Injectable, __decorate, __metadata, Events;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Injectable = _angular2Angular2.Injectable;
        }],
        execute: function () {
            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
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

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            Events = (function () {
                function Events() {
                    _classCallCheck(this, Events);

                    this.channels = [];
                }

                /**
                 * Subscribe to an event topic. Events that get posted to that topic
                 * will trigger the provided handler.
                 *
                 * @param topic the topic to subscribe to
                 * @param handler the event handler
                 */

                _createClass(Events, [{
                    key: "subscribe",
                    value: function subscribe(topic) {
                        var _this = this;

                        if (!this.channels[topic]) {
                            this.channels[topic] = [];
                        }

                        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                            handlers[_key - 1] = arguments[_key];
                        }

                        handlers.forEach(function (handler) {
                            _this.channels[topic].push(handler);
                        });
                    }

                    /**
                     * Unsubscribe from the given topic. Your handler will
                     * no longer receive events published to this topic.
                     *
                     * @param topic the topic to unsubscribe from
                     * @param handler the event handler
                     *
                     * @return true if a handler was removed
                     */
                }, {
                    key: "unsubscribe",
                    value: function unsubscribe(topic, handler) {
                        var t = this.channels[topic];
                        if (!t) {
                            // Wasn't found, wasn't removed
                            return false;
                        }
                        if (!handler) {
                            // Remove all handlers for this topic
                            delete this.channels[topic];
                            return true;
                        }
                        // We need to find and remove a specific handler
                        var i = t.indexOf(handler);
                        if (i < 0) {
                            // Wasn't found, wasn't removed
                            return false;
                        }
                        t.splice(i, 1);
                        // If the channel is empty now, remove it from the channel map
                        if (!t.length) {
                            delete this.channels[topic];
                        }
                        return true;
                    }

                    /**
                     * Publish an event to the given topic.
                     *
                     * @param topic the topic to publish to
                     * @param eventData the data to send as the event
                     */
                }, {
                    key: "publish",
                    value: function publish(topic) {
                        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                            args[_key2 - 1] = arguments[_key2];
                        }

                        var t = this.channels[topic];
                        if (!t) {
                            return null;
                        }
                        var responses = [];
                        t.forEach(function (handler) {
                            responses.push(handler(args));
                        });
                        return responses;
                    }
                }]);

                return Events;
            })();

            _export("Events", Events);

            _export("Events", Events = __decorate([Injectable(), __metadata('design:paramtypes', [])], Events));
        }
    };
});