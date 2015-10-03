'use strict';function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var post_message_bus_1 = require('angular2/src/web_workers/shared/post_message_bus');
var application_common_1 = require("angular2/src/web_workers/worker/application_common");
__export(require("angular2/src/web_workers/shared/message_bus"));
var _postMessage = postMessage;
/**
 * Bootstrapping a Webworker Application
 *
 * You instantiate the application side by calling bootstrapWebworker from your webworker index
 * script.
 * You can call bootstrapWebworker() exactly as you would call bootstrap() in a regular Angular
 * application
 * See the bootstrap() docs for more details.
 */
function bootstrapWebWorker(appComponentType, componentInjectableBindings) {
    if (componentInjectableBindings === void 0) { componentInjectableBindings = null; }
    var sink = new post_message_bus_1.PostMessageBusSink({
        postMessage: function (message, transferrables) { _postMessage(message, transferrables); }
    });
    var source = new post_message_bus_1.PostMessageBusSource();
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    return application_common_1.bootstrapWebWorkerCommon(appComponentType, bus, componentInjectableBindings);
}
exports.bootstrapWebWorker = bootstrapWebWorker;
//# sourceMappingURL=application.js.map