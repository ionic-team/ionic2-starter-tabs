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
var async_1 = require('angular2/src/core/facade/async');
var collection_1 = require('angular2/src/core/facade/collection');
var di_1 = require("angular2/di");
/**
 * A TypeScript implementation of {@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
var PostMessageBus = (function () {
    function PostMessageBus(_sink, _source) {
        this._sink = _sink;
        this._source = _source;
    }
    PostMessageBus.prototype.from = function (channel) { return this._source.from(channel); };
    PostMessageBus.prototype.to = function (channel) { return this._sink.to(channel); };
    PostMessageBus = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [PostMessageBusSink, PostMessageBusSource])
    ], PostMessageBus);
    return PostMessageBus;
})();
exports.PostMessageBus = PostMessageBus;
var PostMessageBusSink = (function () {
    function PostMessageBusSink(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = collection_1.StringMapWrapper.create();
    }
    PostMessageBusSink.prototype.to = function (channel) {
        var _this = this;
        if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
            return this._channels[channel];
        }
        else {
            var emitter = new async_1.EventEmitter();
            emitter.observer({
                next: function (message) {
                    _this._postMessageTarget.postMessage({ channel: channel, message: message });
                }
            });
            return emitter;
        }
    };
    return PostMessageBusSink;
})();
exports.PostMessageBusSink = PostMessageBusSink;
var PostMessageBusSource = (function () {
    function PostMessageBusSource(eventTarget) {
        var _this = this;
        this._channels = collection_1.StringMapWrapper.create();
        if (eventTarget) {
            eventTarget.addEventListener("message", function (ev) { return _this._handleMessage(ev); });
        }
        else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            addEventListener("message", function (ev) { return _this._handleMessage(ev); });
        }
    }
    PostMessageBusSource.prototype._handleMessage = function (ev) {
        var data = ev.data;
        var channel = data.channel;
        if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
            this._channels[channel].next(data.message);
        }
    };
    PostMessageBusSource.prototype.from = function (channel) {
        if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
            return this._channels[channel];
        }
        else {
            var emitter = new async_1.EventEmitter();
            this._channels[channel] = emitter;
            return emitter;
        }
    };
    return PostMessageBusSource;
})();
exports.PostMessageBusSource = PostMessageBusSource;
//# sourceMappingURL=post_message_bus.js.map