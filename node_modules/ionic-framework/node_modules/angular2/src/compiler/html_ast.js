'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var HtmlTextAst = (function () {
    function HtmlTextAst(value, sourceInfo) {
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    HtmlTextAst.prototype.visit = function (visitor) { return visitor.visitText(this); };
    return HtmlTextAst;
})();
exports.HtmlTextAst = HtmlTextAst;
var HtmlAttrAst = (function () {
    function HtmlAttrAst(name, value, sourceInfo) {
        this.name = name;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    HtmlAttrAst.prototype.visit = function (visitor) { return visitor.visitAttr(this); };
    return HtmlAttrAst;
})();
exports.HtmlAttrAst = HtmlAttrAst;
var HtmlElementAst = (function () {
    function HtmlElementAst(name, attrs, children, sourceInfo) {
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.sourceInfo = sourceInfo;
    }
    HtmlElementAst.prototype.visit = function (visitor) { return visitor.visitElement(this); };
    return HtmlElementAst;
})();
exports.HtmlElementAst = HtmlElementAst;
function htmlVisitAll(visitor, asts) {
    var result = [];
    asts.forEach(function (ast) {
        var astResult = ast.visit(visitor);
        if (lang_1.isPresent(astResult)) {
            result.push(astResult);
        }
    });
    return result;
}
exports.htmlVisitAll = htmlVisitAll;
//# sourceMappingURL=html_ast.js.map