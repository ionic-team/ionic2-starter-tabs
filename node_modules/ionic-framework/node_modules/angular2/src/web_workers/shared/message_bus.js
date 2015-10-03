'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
exports.EventEmitter = async_1.EventEmitter;
exports.Observable = async_1.Observable;
function _abstract() {
    throw new lang_1.BaseException("This method is abstract");
}
/**
 * Message Bus is a low level API used to communicate between the UI and the background.
 * Communication is based on a channel abstraction. Messages published in a
 * given channel to one MessageBusSink are received on the same channel
 * by the corresponding MessageBusSource.
 */
var MessageBus = (function () {
    function MessageBus() {
    }
    /**
     * Returns an {@link EventEmitter} that emits every time a messsage
     * is received on the given channel.
     */
    MessageBus.prototype.from = function (channel) { throw _abstract(); };
    /**
     * Returns an {@link EventEmitter} for the given channel
     * To publish methods to that channel just call next (or add in dart) on the returned emitter
     */
    MessageBus.prototype.to = function (channel) { throw _abstract(); };
    return MessageBus;
})();
exports.MessageBus = MessageBus;
//# sourceMappingURL=message_bus.js.map