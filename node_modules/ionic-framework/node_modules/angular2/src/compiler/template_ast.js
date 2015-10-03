'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var TextAst = (function () {
    function TextAst(value, sourceInfo) {
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    TextAst.prototype.visit = function (visitor) { return visitor.visitText(this); };
    return TextAst;
})();
exports.TextAst = TextAst;
var BoundTextAst = (function () {
    function BoundTextAst(value, sourceInfo) {
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    BoundTextAst.prototype.visit = function (visitor) { return visitor.visitBoundText(this); };
    return BoundTextAst;
})();
exports.BoundTextAst = BoundTextAst;
var AttrAst = (function () {
    function AttrAst(name, value, sourceInfo) {
        this.name = name;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    AttrAst.prototype.visit = function (visitor) { return visitor.visitAttr(this); };
    return AttrAst;
})();
exports.AttrAst = AttrAst;
var BoundElementPropertyAst = (function () {
    function BoundElementPropertyAst(name, type, value, unit, sourceInfo) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.sourceInfo = sourceInfo;
    }
    BoundElementPropertyAst.prototype.visit = function (visitor) { return visitor.visitElementProperty(this); };
    return BoundElementPropertyAst;
})();
exports.BoundElementPropertyAst = BoundElementPropertyAst;
var BoundEventAst = (function () {
    function BoundEventAst(name, target, handler, sourceInfo) {
        this.name = name;
        this.target = target;
        this.handler = handler;
        this.sourceInfo = sourceInfo;
    }
    BoundEventAst.prototype.visit = function (visitor) { return visitor.visitEvent(this); };
    return BoundEventAst;
})();
exports.BoundEventAst = BoundEventAst;
var VariableAst = (function () {
    function VariableAst(name, value, sourceInfo) {
        this.name = name;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    VariableAst.prototype.visit = function (visitor) { return visitor.visitVariable(this); };
    return VariableAst;
})();
exports.VariableAst = VariableAst;
var ElementAst = (function () {
    function ElementAst(attrs, properties, events, vars, directives, children, sourceInfo) {
        this.attrs = attrs;
        this.properties = properties;
        this.events = events;
        this.vars = vars;
        this.directives = directives;
        this.children = children;
        this.sourceInfo = sourceInfo;
    }
    ElementAst.prototype.visit = function (visitor) { return visitor.visitElement(this); };
    return ElementAst;
})();
exports.ElementAst = ElementAst;
var EmbeddedTemplateAst = (function () {
    function EmbeddedTemplateAst(attrs, vars, directives, children, sourceInfo) {
        this.attrs = attrs;
        this.vars = vars;
        this.directives = directives;
        this.children = children;
        this.sourceInfo = sourceInfo;
    }
    EmbeddedTemplateAst.prototype.visit = function (visitor) { return visitor.visitEmbeddedTemplate(this); };
    return EmbeddedTemplateAst;
})();
exports.EmbeddedTemplateAst = EmbeddedTemplateAst;
var BoundDirectivePropertyAst = (function () {
    function BoundDirectivePropertyAst(directiveName, templateName, value, sourceInfo) {
        this.directiveName = directiveName;
        this.templateName = templateName;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    BoundDirectivePropertyAst.prototype.visit = function (visitor) { return visitor.visitDirectiveProperty(this); };
    return BoundDirectivePropertyAst;
})();
exports.BoundDirectivePropertyAst = BoundDirectivePropertyAst;
var DirectiveAst = (function () {
    function DirectiveAst(directive, properties, hostProperties, hostEvents, sourceInfo) {
        this.directive = directive;
        this.properties = properties;
        this.hostProperties = hostProperties;
        this.hostEvents = hostEvents;
        this.sourceInfo = sourceInfo;
    }
    DirectiveAst.prototype.visit = function (visitor) { return visitor.visitDirective(this); };
    return DirectiveAst;
})();
exports.DirectiveAst = DirectiveAst;
var NgContentAst = (function () {
    function NgContentAst(select, sourceInfo) {
        this.select = select;
        this.sourceInfo = sourceInfo;
    }
    NgContentAst.prototype.visit = function (visitor) { return visitor.visitNgContent(this); };
    return NgContentAst;
})();
exports.NgContentAst = NgContentAst;
(function (PropertyBindingType) {
    PropertyBindingType[PropertyBindingType["Property"] = 0] = "Property";
    PropertyBindingType[PropertyBindingType["Attribute"] = 1] = "Attribute";
    PropertyBindingType[PropertyBindingType["Class"] = 2] = "Class";
    PropertyBindingType[PropertyBindingType["Style"] = 3] = "Style";
})(exports.PropertyBindingType || (exports.PropertyBindingType = {}));
var PropertyBindingType = exports.PropertyBindingType;
function templateVisitAll(visitor, asts) {
    var result = [];
    asts.forEach(function (ast) {
        var astResult = ast.visit(visitor);
        if (lang_1.isPresent(astResult)) {
            result.push(astResult);
        }
    });
    return result;
}
exports.templateVisitAll = templateVisitAll;
//# sourceMappingURL=template_ast.js.map