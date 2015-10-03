'use strict';var api_1 = require('./api');
var lang_1 = require('angular2/src/core/facade/lang');
var async_1 = require('angular2/src/core/facade/async');
var html_ast_1 = require('./html_ast');
var NG_CONTENT_SELECT_ATTR = 'select';
var NG_CONTENT_ELEMENT = 'ng-content';
var LINK_ELEMENT = 'link';
var LINK_STYLE_REL_ATTR = 'rel';
var LINK_STYLE_HREF_ATTR = 'href';
var LINK_STYLE_REL_VALUE = 'stylesheet';
var STYLE_ELEMENT = 'style';
var TemplateLoader = (function () {
    function TemplateLoader(_xhr, _urlResolver, _styleUrlResolver, _domParser) {
        this._xhr = _xhr;
        this._urlResolver = _urlResolver;
        this._styleUrlResolver = _styleUrlResolver;
        this._domParser = _domParser;
    }
    TemplateLoader.prototype.loadTemplate = function (directiveType, encapsulation, template, templateUrl, styles, styleUrls) {
        var _this = this;
        if (lang_1.isPresent(template)) {
            return async_1.PromiseWrapper.resolve(this.createTemplateFromString(directiveType, encapsulation, template, directiveType.typeUrl, styles, styleUrls));
        }
        else {
            var sourceAbsUrl = this._urlResolver.resolve(directiveType.typeUrl, templateUrl);
            return this._xhr.get(sourceAbsUrl)
                .then(function (templateContent) {
                return _this.createTemplateFromString(directiveType, encapsulation, templateContent, sourceAbsUrl, styles, styleUrls);
            });
        }
    };
    TemplateLoader.prototype.createTemplateFromString = function (directiveType, encapsulation, template, templateSourceUrl, styles, styleUrls) {
        var _this = this;
        var domNodes = this._domParser.parse(template, directiveType.typeName);
        var visitor = new TemplatePreparseVisitor();
        var remainingNodes = html_ast_1.htmlVisitAll(visitor, domNodes);
        var allStyles = styles.concat(visitor.styles);
        var allStyleUrls = styleUrls.concat(visitor.styleUrls);
        allStyles = allStyles.map(function (style) {
            var styleWithImports = _this._styleUrlResolver.extractImports(style);
            styleWithImports.styleUrls.forEach(function (styleUrl) { return allStyleUrls.push(styleUrl); });
            return styleWithImports.style;
        });
        var allResolvedStyles = allStyles.map(function (style) { return _this._styleUrlResolver.resolveUrls(style, templateSourceUrl); });
        var allStyleAbsUrls = allStyleUrls.map(function (styleUrl) { return _this._urlResolver.resolve(templateSourceUrl, styleUrl); });
        return new api_1.TemplateMetadata({
            encapsulation: encapsulation,
            nodes: remainingNodes,
            styles: allResolvedStyles,
            styleAbsUrls: allStyleAbsUrls,
            ngContentSelectors: visitor.ngContentSelectors
        });
    };
    return TemplateLoader;
})();
exports.TemplateLoader = TemplateLoader;
var TemplatePreparseVisitor = (function () {
    function TemplatePreparseVisitor() {
        this.ngContentSelectors = [];
        this.styles = [];
        this.styleUrls = [];
    }
    TemplatePreparseVisitor.prototype.visitElement = function (ast) {
        var selectAttr = null;
        var hrefAttr = null;
        var relAttr = null;
        ast.attrs.forEach(function (attr) {
            if (attr.name == NG_CONTENT_SELECT_ATTR) {
                selectAttr = attr.value;
            }
            else if (attr.name == LINK_STYLE_HREF_ATTR) {
                hrefAttr = attr.value;
            }
            else if (attr.name == LINK_STYLE_REL_ATTR) {
                relAttr = attr.value;
            }
        });
        var nodeName = ast.name;
        var keepElement = true;
        if (nodeName == NG_CONTENT_ELEMENT) {
            this.ngContentSelectors.push(selectAttr);
        }
        else if (nodeName == STYLE_ELEMENT) {
            keepElement = false;
            var textContent = '';
            ast.children.forEach(function (child) {
                if (child instanceof html_ast_1.HtmlTextAst) {
                    textContent += child.value;
                }
            });
            this.styles.push(textContent);
        }
        else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
            keepElement = false;
            this.styleUrls.push(hrefAttr);
        }
        if (keepElement) {
            return new html_ast_1.HtmlElementAst(ast.name, ast.attrs, html_ast_1.htmlVisitAll(this, ast.children), ast.sourceInfo);
        }
        else {
            return null;
        }
    };
    TemplatePreparseVisitor.prototype.visitAttr = function (ast) { return ast; };
    TemplatePreparseVisitor.prototype.visitText = function (ast) { return ast; };
    return TemplatePreparseVisitor;
})();
//# sourceMappingURL=template_loader.js.map