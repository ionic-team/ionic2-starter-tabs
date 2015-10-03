'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var TypeMetadata = (function () {
    function TypeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, typeName = _b.typeName, typeUrl = _b.typeUrl;
        this.type = type;
        this.typeName = typeName;
        this.typeUrl = typeUrl;
    }
    return TypeMetadata;
})();
exports.TypeMetadata = TypeMetadata;
var ChangeDetectionMetadata = (function () {
    function ChangeDetectionMetadata(_a) {
        var changeDetection = _a.changeDetection, properties = _a.properties, events = _a.events, hostListeners = _a.hostListeners, hostProperties = _a.hostProperties;
        this.changeDetection = changeDetection;
        this.properties = properties;
        this.events = events;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
    }
    return ChangeDetectionMetadata;
})();
exports.ChangeDetectionMetadata = ChangeDetectionMetadata;
var TemplateMetadata = (function () {
    function TemplateMetadata(_a) {
        var encapsulation = _a.encapsulation, nodes = _a.nodes, styles = _a.styles, styleAbsUrls = _a.styleAbsUrls, ngContentSelectors = _a.ngContentSelectors;
        this.encapsulation = encapsulation;
        this.nodes = nodes;
        this.styles = styles;
        this.styleAbsUrls = styleAbsUrls;
        this.ngContentSelectors = ngContentSelectors;
    }
    return TemplateMetadata;
})();
exports.TemplateMetadata = TemplateMetadata;
/**
 * How the template and styles of a view should be encapsulated.
 */
(function (ViewEncapsulation) {
    /**
     * Emulate scoping of styles by preprocessing the style rules
     * and adding additional attributes to elements. This is the default.
     */
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    /**
     * Uses the native mechanism of the renderer. For the DOM this means creating a ShadowRoot.
     */
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    /**
     * Don't scope the template nor the styles.
     */
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
})(exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
var ViewEncapsulation = exports.ViewEncapsulation;
var DirectiveMetadata = (function () {
    function DirectiveMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, hostAttributes = _b.hostAttributes, changeDetection = _b.changeDetection, template = _b.template;
        this.type = type;
        this.isComponent = lang_1.normalizeBool(isComponent);
        this.selector = selector;
        this.hostAttributes = hostAttributes;
        this.changeDetection = changeDetection;
        this.template = template;
    }
    return DirectiveMetadata;
})();
exports.DirectiveMetadata = DirectiveMetadata;
//# sourceMappingURL=api.js.map