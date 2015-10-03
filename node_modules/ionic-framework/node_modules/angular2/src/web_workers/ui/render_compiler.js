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
var decorators_1 = require('angular2/src/core/di/decorators');
var api_1 = require('angular2/src/core/render/api');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
var bind_1 = require('./bind');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var MessageBasedRenderCompiler = (function () {
    function MessageBasedRenderCompiler(_brokerFactory, _renderCompiler) {
        this._brokerFactory = _brokerFactory;
        this._renderCompiler = _renderCompiler;
    }
    MessageBasedRenderCompiler.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(messaging_api_1.RENDER_COMPILER_CHANNEL);
        broker.registerMethod("compileHost", [api_1.RenderDirectiveMetadata], bind_1.bind(this._renderCompiler.compileHost, this._renderCompiler), api_1.ProtoViewDto);
        broker.registerMethod("compile", [api_1.ViewDefinition], bind_1.bind(this._renderCompiler.compile, this._renderCompiler), api_1.ProtoViewDto);
        broker.registerMethod("mergeProtoViewsRecursively", [api_1.RenderProtoViewRef], bind_1.bind(this._renderCompiler.mergeProtoViewsRecursively, this._renderCompiler), api_1.RenderProtoViewMergeMapping);
    };
    MessageBasedRenderCompiler = __decorate([
        decorators_1.Injectable(), 
        __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, api_1.RenderCompiler])
    ], MessageBasedRenderCompiler);
    return MessageBasedRenderCompiler;
})();
exports.MessageBasedRenderCompiler = MessageBasedRenderCompiler;
//# sourceMappingURL=render_compiler.js.map