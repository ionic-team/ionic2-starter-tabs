'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lang_1 = require("angular2/src/core/facade/lang");
/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * Angular expects that the data flows from top (root) component to child (leaf) components.
 * This is known as directed acyclic graph. This allows Angular to only execute change detection
 * once and prevents loops in change detection data flow.
 *
 * This exception is only thrown in dev mode.
 */
var ExpressionChangedAfterItHasBeenCheckedException = (function (_super) {
    __extends(ExpressionChangedAfterItHasBeenCheckedException, _super);
    function ExpressionChangedAfterItHasBeenCheckedException(exp, oldValue, currValue, context) {
        _super.call(this, ("Expression '" + exp + "' has changed after it was checked. ") +
            ("Previous value: '" + oldValue + "'. Current value: '" + currValue + "'"));
    }
    return ExpressionChangedAfterItHasBeenCheckedException;
})(lang_1.BaseException);
exports.ExpressionChangedAfterItHasBeenCheckedException = ExpressionChangedAfterItHasBeenCheckedException;
/**
 * Thrown when an expression evaluation raises an exception.
 *
 * This error wraps the original exception, this is done to attach expression location information.
 */
var ChangeDetectionError = (function (_super) {
    __extends(ChangeDetectionError, _super);
    function ChangeDetectionError(exp, originalException, originalStack, context) {
        _super.call(this, originalException + " in [" + exp + "]", originalException, originalStack, context);
        this.location = exp;
    }
    return ChangeDetectionError;
})(lang_1.BaseException);
exports.ChangeDetectionError = ChangeDetectionError;
/**
 * Thrown when change detector executes on dehydrated view.
 *
 * This is angular internal error.
 */
var DehydratedException = (function (_super) {
    __extends(DehydratedException, _super);
    function DehydratedException() {
        _super.call(this, 'Attempt to detect changes on a dehydrated detector.');
    }
    return DehydratedException;
})(lang_1.BaseException);
exports.DehydratedException = DehydratedException;
//# sourceMappingURL=exceptions.js.map