'use strict';var collection_1 = require('angular2/src/core/facade/collection');
var lang_1 = require('angular2/src/core/facade/lang');
var template_ast_1 = require('./template_ast');
var selector_1 = require('angular2/src/core/render/dom/compiler/selector');
var html_ast_1 = require('./html_ast');
var util_1 = require('./util');
// Group 1 = "bind-"
// Group 2 = "var-" or "#"
// Group 3 = "on-"
// Group 4 = "bindon-"
// Group 5 = the identifier after "bind-", "var-/#", or "on-"
// Group 6 = idenitifer inside [()]
// Group 7 = idenitifer inside []
// Group 8 = identifier inside ()
var BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(var-|#)|(on-)|(bindon-))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/g;
var NG_CONTENT_SELECT_ATTR = 'select';
var NG_CONTENT_ELEMENT = 'ng-content';
var TEMPLATE_ELEMENT = 'template';
var TEMPLATE_ATTR = 'template';
var TEMPLATE_ATTR_PREFIX = '*';
var CLASS_ATTR = 'class';
var IMPLICIT_VAR_NAME = '$implicit';
var PROPERTY_PARTS_SEPARATOR = new RegExp('\\.');
var ATTRIBUTE_PREFIX = 'attr';
var CLASS_PREFIX = 'class';
var STYLE_PREFIX = 'style';
var TemplateParser = (function () {
    function TemplateParser(_exprParser, _schemaRegistry) {
        this._exprParser = _exprParser;
        this._schemaRegistry = _schemaRegistry;
    }
    TemplateParser.prototype.parse = function (domNodes, directives) {
        var parseVisitor = new TemplateParseVisitor(directives, this._exprParser, this._schemaRegistry);
        var result = html_ast_1.htmlVisitAll(parseVisitor, domNodes);
        if (parseVisitor.errors.length > 0) {
            var errorString = parseVisitor.errors.join('\n');
            throw new lang_1.BaseException("Template parse errors:\n" + errorString);
        }
        return result;
    };
    return TemplateParser;
})();
exports.TemplateParser = TemplateParser;
var TemplateParseVisitor = (function () {
    function TemplateParseVisitor(directives, _exprParser, _schemaRegistry) {
        var _this = this;
        this._exprParser = _exprParser;
        this._schemaRegistry = _schemaRegistry;
        this.errors = [];
        this.selectorMatcher = new selector_1.SelectorMatcher();
        directives.forEach(function (directive) {
            var selector = selector_1.CssSelector.parse(directive.selector);
            _this.selectorMatcher.addSelectables(selector, directive);
        });
    }
    TemplateParseVisitor.prototype._reportError = function (message) { this.errors.push(message); };
    TemplateParseVisitor.prototype._parseInterpolation = function (value, sourceInfo) {
        try {
            return this._exprParser.parseInterpolation(value, sourceInfo);
        }
        catch (e) {
            this._reportError("" + e); // sourceInfo is already contained in the AST
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
    };
    TemplateParseVisitor.prototype._parseAction = function (value, sourceInfo) {
        try {
            return this._exprParser.parseAction(value, sourceInfo);
        }
        catch (e) {
            this._reportError("" + e); // sourceInfo is already contained in the AST
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
    };
    TemplateParseVisitor.prototype._parseBinding = function (value, sourceInfo) {
        try {
            return this._exprParser.parseBinding(value, sourceInfo);
        }
        catch (e) {
            this._reportError("" + e); // sourceInfo is already contained in the AST
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
    };
    TemplateParseVisitor.prototype._parseTemplateBindings = function (value, sourceInfo) {
        try {
            return this._exprParser.parseTemplateBindings(value, sourceInfo);
        }
        catch (e) {
            this._reportError("" + e); // sourceInfo is already contained in the AST
            return [];
        }
    };
    TemplateParseVisitor.prototype.visitText = function (ast) {
        var expr = this._parseInterpolation(ast.value, ast.sourceInfo);
        if (lang_1.isPresent(expr)) {
            return new template_ast_1.BoundTextAst(expr, ast.sourceInfo);
        }
        else {
            return new template_ast_1.TextAst(ast.value, ast.sourceInfo);
        }
    };
    TemplateParseVisitor.prototype.visitAttr = function (ast) { return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceInfo); };
    TemplateParseVisitor.prototype.visitElement = function (element) {
        var _this = this;
        var nodeName = element.name;
        var matchableAttrs = [];
        var elementOrDirectiveProps = [];
        var vars = [];
        var events = [];
        var templateElementOrDirectiveProps = [];
        var templateVars = [];
        var templateMatchableAttrs = [];
        var hasInlineTemplates = false;
        var attrs = [];
        var selectAttr = null;
        element.attrs.forEach(function (attr) {
            matchableAttrs.push([attr.name, attr.value]);
            if (attr.name == NG_CONTENT_SELECT_ATTR) {
                selectAttr = attr.value;
            }
            var hasBinding = _this._parseAttr(attr, matchableAttrs, elementOrDirectiveProps, events, vars);
            var hasTemplateBinding = _this._parseInlineTemplateBinding(attr, templateMatchableAttrs, templateElementOrDirectiveProps, templateVars);
            if (!hasBinding && !hasTemplateBinding) {
                // don't include the bindings as attributes as well in the AST
                attrs.push(_this.visitAttr(attr));
            }
            if (hasTemplateBinding) {
                hasInlineTemplates = true;
            }
        });
        var directives = this._createDirectiveAsts(element.name, this._parseDirectives(this.selectorMatcher, nodeName, matchableAttrs), elementOrDirectiveProps, element.sourceInfo);
        var elementProps = this._createElementPropertyAsts(element.name, elementOrDirectiveProps, directives);
        var children = html_ast_1.htmlVisitAll(this, element.children);
        var parsedElement;
        if (nodeName == NG_CONTENT_ELEMENT) {
            parsedElement = new template_ast_1.NgContentAst(selectAttr, element.sourceInfo);
        }
        else if (nodeName == TEMPLATE_ELEMENT) {
            this._assertNoComponentsNorElementBindingsOnTemplate(directives, elementProps, events, element.sourceInfo);
            parsedElement =
                new template_ast_1.EmbeddedTemplateAst(attrs, vars, directives, children, element.sourceInfo);
        }
        else {
            this._assertOnlyOneComponent(directives, element.sourceInfo);
            parsedElement = new template_ast_1.ElementAst(attrs, elementProps, events, vars, directives, children, element.sourceInfo);
        }
        if (hasInlineTemplates) {
            var templateDirectives = this._createDirectiveAsts(element.name, this._parseDirectives(this.selectorMatcher, TEMPLATE_ELEMENT, templateMatchableAttrs), templateElementOrDirectiveProps, element.sourceInfo);
            var templateElementProps = this._createElementPropertyAsts(element.name, templateElementOrDirectiveProps, templateDirectives);
            this._assertNoComponentsNorElementBindingsOnTemplate(templateDirectives, templateElementProps, [], element.sourceInfo);
            parsedElement = new template_ast_1.EmbeddedTemplateAst([], templateVars, templateDirectives, [parsedElement], element.sourceInfo);
        }
        return parsedElement;
    };
    TemplateParseVisitor.prototype._parseInlineTemplateBinding = function (attr, targetMatchableAttrs, targetProps, targetVars) {
        var templateBindingsSource = null;
        if (attr.name == TEMPLATE_ATTR) {
            templateBindingsSource = attr.value;
        }
        else if (lang_1.StringWrapper.startsWith(attr.name, TEMPLATE_ATTR_PREFIX)) {
            var key = lang_1.StringWrapper.substring(attr.name, TEMPLATE_ATTR_PREFIX.length); // remove the star
            templateBindingsSource = (attr.value.length == 0) ? key : key + ' ' + attr.value;
        }
        if (lang_1.isPresent(templateBindingsSource)) {
            var bindings = this._parseTemplateBindings(templateBindingsSource, attr.sourceInfo);
            for (var i = 0; i < bindings.length; i++) {
                var binding = bindings[i];
                var dashCaseKey = util_1.camelCaseToDashCase(binding.key);
                if (binding.keyIsVar) {
                    targetVars.push(new template_ast_1.VariableAst(util_1.dashCaseToCamelCase(binding.key), binding.name, attr.sourceInfo));
                    targetMatchableAttrs.push([dashCaseKey, binding.name]);
                }
                else if (lang_1.isPresent(binding.expression)) {
                    this._parsePropertyAst(dashCaseKey, binding.expression, attr.sourceInfo, targetMatchableAttrs, targetProps);
                }
                else {
                    targetMatchableAttrs.push([dashCaseKey, '']);
                }
            }
            return true;
        }
        return false;
    };
    TemplateParseVisitor.prototype._parseAttr = function (attr, targetMatchableAttrs, targetProps, targetEvents, targetVars) {
        var attrName = this._normalizeAttributeName(attr.name);
        var attrValue = attr.value;
        var bindParts = lang_1.RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
        var hasBinding = false;
        if (lang_1.isPresent(bindParts)) {
            hasBinding = true;
            if (lang_1.isPresent(bindParts[1])) {
                this._parseProperty(bindParts[5], attrValue, attr.sourceInfo, targetMatchableAttrs, targetProps);
            }
            else if (lang_1.isPresent(bindParts[2])) {
                var identifier = bindParts[5];
                var value = attrValue.length === 0 ? IMPLICIT_VAR_NAME : attrValue;
                this._parseVariable(identifier, value, attr.sourceInfo, targetMatchableAttrs, targetVars);
            }
            else if (lang_1.isPresent(bindParts[3])) {
                this._parseEvent(bindParts[5], attrValue, attr.sourceInfo, targetMatchableAttrs, targetEvents);
            }
            else if (lang_1.isPresent(bindParts[4])) {
                this._parseProperty(bindParts[5], attrValue, attr.sourceInfo, targetMatchableAttrs, targetProps);
                this._parseAssignmentEvent(bindParts[5], attrValue, attr.sourceInfo, targetMatchableAttrs, targetEvents);
            }
            else if (lang_1.isPresent(bindParts[6])) {
                this._parseProperty(bindParts[6], attrValue, attr.sourceInfo, targetMatchableAttrs, targetProps);
                this._parseAssignmentEvent(bindParts[6], attrValue, attr.sourceInfo, targetMatchableAttrs, targetEvents);
            }
            else if (lang_1.isPresent(bindParts[7])) {
                this._parseProperty(bindParts[7], attrValue, attr.sourceInfo, targetMatchableAttrs, targetProps);
            }
            else if (lang_1.isPresent(bindParts[8])) {
                this._parseEvent(bindParts[8], attrValue, attr.sourceInfo, targetMatchableAttrs, targetEvents);
            }
        }
        else {
            hasBinding = this._parsePropertyInterpolation(attrName, attrValue, attr.sourceInfo, targetMatchableAttrs, targetProps);
        }
        if (!hasBinding) {
            this._parseLiteralAttr(attrName, attrValue, attr.sourceInfo, targetProps);
        }
        return hasBinding;
    };
    TemplateParseVisitor.prototype._normalizeAttributeName = function (attrName) {
        return lang_1.StringWrapper.startsWith(attrName, 'data-') ? lang_1.StringWrapper.substring(attrName, 5) :
            attrName;
    };
    TemplateParseVisitor.prototype._parseVariable = function (identifier, value, sourceInfo, targetMatchableAttrs, targetVars) {
        targetVars.push(new template_ast_1.VariableAst(util_1.dashCaseToCamelCase(identifier), value, sourceInfo));
        targetMatchableAttrs.push([identifier, value]);
    };
    TemplateParseVisitor.prototype._parseProperty = function (name, expression, sourceInfo, targetMatchableAttrs, targetProps) {
        this._parsePropertyAst(name, this._parseBinding(expression, sourceInfo), sourceInfo, targetMatchableAttrs, targetProps);
    };
    TemplateParseVisitor.prototype._parsePropertyInterpolation = function (name, value, sourceInfo, targetMatchableAttrs, targetProps) {
        var expr = this._parseInterpolation(value, sourceInfo);
        if (lang_1.isPresent(expr)) {
            this._parsePropertyAst(name, expr, sourceInfo, targetMatchableAttrs, targetProps);
            return true;
        }
        return false;
    };
    TemplateParseVisitor.prototype._parsePropertyAst = function (name, ast, sourceInfo, targetMatchableAttrs, targetProps) {
        targetMatchableAttrs.push([name, ast.source]);
        targetProps.push(new BoundElementOrDirectiveProperty(name, ast, false, sourceInfo));
    };
    TemplateParseVisitor.prototype._parseAssignmentEvent = function (name, expression, sourceInfo, targetMatchableAttrs, targetEvents) {
        this._parseEvent(name, expression + "=$event", sourceInfo, targetMatchableAttrs, targetEvents);
    };
    TemplateParseVisitor.prototype._parseEvent = function (name, expression, sourceInfo, targetMatchableAttrs, targetEvents) {
        // long format: 'target: eventName'
        var parts = splitAtColon(name, [null, name]);
        var target = parts[0];
        var eventName = parts[1];
        targetEvents.push(new template_ast_1.BoundEventAst(util_1.dashCaseToCamelCase(eventName), target, this._parseAction(expression, sourceInfo), sourceInfo));
        // Don't detect directives for event names for now,
        // so don't add the event name to the matchableAttrs
    };
    TemplateParseVisitor.prototype._parseLiteralAttr = function (name, value, sourceInfo, targetProps) {
        targetProps.push(new BoundElementOrDirectiveProperty(util_1.dashCaseToCamelCase(name), this._exprParser.wrapLiteralPrimitive(value, sourceInfo), true, sourceInfo));
    };
    TemplateParseVisitor.prototype._parseDirectives = function (selectorMatcher, elementName, matchableAttrs) {
        var cssSelector = new selector_1.CssSelector();
        cssSelector.setElement(elementName);
        for (var i = 0; i < matchableAttrs.length; i++) {
            var attrName = matchableAttrs[i][0].toLowerCase();
            var attrValue = matchableAttrs[i][1];
            cssSelector.addAttribute(attrName, attrValue);
            if (attrName == CLASS_ATTR) {
                var classes = splitClasses(attrValue);
                classes.forEach(function (className) { return cssSelector.addClassName(className); });
            }
        }
        var directives = [];
        selectorMatcher.match(cssSelector, function (selector, directive) { directives.push(directive); });
        // Need to sort the directives so that we get consistent results throughout,
        // as selectorMatcher uses Maps inside.
        // Also need to make components the first directive in the array
        collection_1.ListWrapper.sort(directives, function (dir1, dir2) {
            var dir1Comp = dir1.isComponent;
            var dir2Comp = dir2.isComponent;
            if (dir1Comp && !dir2Comp) {
                return -1;
            }
            else if (!dir1Comp && dir2Comp) {
                return 1;
            }
            else {
                return lang_1.StringWrapper.compare(dir1.type.typeName, dir2.type.typeName);
            }
        });
        return directives;
    };
    TemplateParseVisitor.prototype._createDirectiveAsts = function (elementName, directives, props, sourceInfo) {
        var _this = this;
        return directives.map(function (directive) {
            var hostProperties = [];
            var hostEvents = [];
            var directiveProperties = [];
            var changeDetection = directive.changeDetection;
            if (lang_1.isPresent(changeDetection)) {
                _this._createDirectiveHostPropertyAsts(elementName, changeDetection.hostProperties, sourceInfo, hostProperties);
                _this._createDirectiveHostEventAsts(changeDetection.hostListeners, sourceInfo, hostEvents);
                _this._createDirectivePropertyAsts(changeDetection.properties, props, directiveProperties);
            }
            return new template_ast_1.DirectiveAst(directive, directiveProperties, hostProperties, hostEvents, sourceInfo);
        });
    };
    TemplateParseVisitor.prototype._createDirectiveHostPropertyAsts = function (elementName, hostProps, sourceInfo, targetPropertyAsts) {
        var _this = this;
        if (lang_1.isPresent(hostProps)) {
            collection_1.StringMapWrapper.forEach(hostProps, function (expression, propName) {
                var exprAst = _this._parseBinding(expression, sourceInfo);
                targetPropertyAsts.push(_this._createElementPropertyAst(elementName, propName, exprAst, sourceInfo));
            });
        }
    };
    TemplateParseVisitor.prototype._createDirectiveHostEventAsts = function (hostListeners, sourceInfo, targetEventAsts) {
        var _this = this;
        if (lang_1.isPresent(hostListeners)) {
            collection_1.StringMapWrapper.forEach(hostListeners, function (expression, propName) {
                _this._parseEvent(propName, expression, sourceInfo, [], targetEventAsts);
            });
        }
    };
    TemplateParseVisitor.prototype._createDirectivePropertyAsts = function (directiveProperties, boundProps, targetBoundDirectiveProps) {
        if (lang_1.isPresent(directiveProperties)) {
            var boundPropsByName = new Map();
            boundProps.forEach(function (boundProp) {
                return boundPropsByName.set(util_1.dashCaseToCamelCase(boundProp.name), boundProp);
            });
            directiveProperties.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
                var dirProp = parts[0];
                var elProp = util_1.dashCaseToCamelCase(parts[1]);
                var boundProp = boundPropsByName.get(elProp);
                // Bindings are optional, so this binding only needs to be set up if an expression is given.
                if (lang_1.isPresent(boundProp)) {
                    targetBoundDirectiveProps.push(new template_ast_1.BoundDirectivePropertyAst(dirProp, boundProp.name, boundProp.expression, boundProp.sourceInfo));
                }
            });
        }
    };
    TemplateParseVisitor.prototype._createElementPropertyAsts = function (elementName, props, directives) {
        var _this = this;
        var boundElementProps = [];
        var boundDirectivePropsIndex = new Map();
        directives.forEach(function (directive) {
            directive.properties.forEach(function (prop) {
                boundDirectivePropsIndex.set(prop.templateName, prop);
            });
        });
        props.forEach(function (prop) {
            if (!prop.isLiteral && lang_1.isBlank(boundDirectivePropsIndex.get(prop.name))) {
                boundElementProps.push(_this._createElementPropertyAst(elementName, prop.name, prop.expression, prop.sourceInfo));
            }
        });
        return boundElementProps;
    };
    TemplateParseVisitor.prototype._createElementPropertyAst = function (elementName, name, ast, sourceInfo) {
        var unit = null;
        var bindingType;
        var boundPropertyName;
        var parts = lang_1.StringWrapper.split(name, PROPERTY_PARTS_SEPARATOR);
        if (parts.length === 1) {
            boundPropertyName = this._schemaRegistry.getMappedPropName(util_1.dashCaseToCamelCase(parts[0]));
            bindingType = template_ast_1.PropertyBindingType.Property;
            if (!this._schemaRegistry.hasProperty(elementName, boundPropertyName)) {
                this._reportError("Can't bind to '" + boundPropertyName + "' since it isn't a known native property in " + sourceInfo);
            }
        }
        else if (parts[0] == ATTRIBUTE_PREFIX) {
            boundPropertyName = util_1.dashCaseToCamelCase(parts[1]);
            bindingType = template_ast_1.PropertyBindingType.Attribute;
        }
        else if (parts[0] == CLASS_PREFIX) {
            // keep original case!
            boundPropertyName = parts[1];
            bindingType = template_ast_1.PropertyBindingType.Class;
        }
        else if (parts[0] == STYLE_PREFIX) {
            unit = parts.length > 2 ? parts[2] : null;
            boundPropertyName = util_1.dashCaseToCamelCase(parts[1]);
            bindingType = template_ast_1.PropertyBindingType.Style;
        }
        else {
            this._reportError("Invalid property name " + name + " in " + sourceInfo);
            bindingType = null;
        }
        return new template_ast_1.BoundElementPropertyAst(boundPropertyName, bindingType, ast, unit, sourceInfo);
    };
    TemplateParseVisitor.prototype._findComponentDirectiveNames = function (directives) {
        var componentTypeNames = [];
        directives.forEach(function (directive) {
            var typeName = directive.directive.type.typeName;
            if (directive.directive.isComponent) {
                componentTypeNames.push(typeName);
            }
        });
        return componentTypeNames;
    };
    TemplateParseVisitor.prototype._assertOnlyOneComponent = function (directives, sourceInfo) {
        var componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 1) {
            this._reportError("More than one component: " + componentTypeNames.join(',') + " in " + sourceInfo);
        }
    };
    TemplateParseVisitor.prototype._assertNoComponentsNorElementBindingsOnTemplate = function (directives, elementProps, events, sourceInfo) {
        var _this = this;
        var componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 0) {
            this._reportError("Components on an embedded template: " + componentTypeNames.join(',') + " in " + sourceInfo);
        }
        elementProps.forEach(function (prop) {
            _this._reportError("Property binding " + prop.name + " not used by any directive on an embedded template in " + prop.sourceInfo);
        });
        events.forEach(function (event) {
            _this._reportError("Event binding " + event.name + " on an embedded template in " + event.sourceInfo);
        });
    };
    return TemplateParseVisitor;
})();
var BoundElementOrDirectiveProperty = (function () {
    function BoundElementOrDirectiveProperty(name, expression, isLiteral, sourceInfo) {
        this.name = name;
        this.expression = expression;
        this.isLiteral = isLiteral;
        this.sourceInfo = sourceInfo;
    }
    return BoundElementOrDirectiveProperty;
})();
var ParseError = (function () {
    function ParseError(message, sourceInfo) {
        this.message = message;
        this.sourceInfo = sourceInfo;
    }
    return ParseError;
})();
function splitClasses(classAttrValue) {
    return lang_1.StringWrapper.split(classAttrValue.trim(), /\s+/g);
}
exports.splitClasses = splitClasses;
function splitAtColon(input, defaultValues) {
    var parts = lang_1.StringWrapper.split(input.trim(), /\s*:\s*/g);
    if (parts.length > 1) {
        return parts;
    }
    else {
        return defaultValues;
    }
}
exports.splitAtColon = splitAtColon;
//# sourceMappingURL=template_parser.js.map