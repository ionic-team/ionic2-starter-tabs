'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var abstract_change_detector_1 = require('./abstract_change_detector');
var change_detection_util_1 = require('./change_detection_util');
var codegen_name_util_1 = require('./codegen_name_util');
var codegen_logic_util_1 = require('./codegen_logic_util');
var codegen_facade_1 = require('./codegen_facade');
/**
 * The code generator takes a list of proto records and creates a function/class
 * that "emulates" what the developer would write by hand to implement the same
 * kind of behaviour.
 *
 * This code should be kept in sync with the Dart transformer's
 * `angular2.transform.template_compiler.change_detector_codegen` library. If you make updates
 * here, please make equivalent changes there.
*/
var ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
var UTIL = "ChangeDetectionUtil";
var IS_CHANGED_LOCAL = "isChanged";
var CHANGES_LOCAL = "changes";
var ChangeDetectorJITGenerator = (function () {
    function ChangeDetectorJITGenerator(id, changeDetectionStrategy, records, propertyBindingTargets, eventBindings, directiveRecords, genConfig) {
        this.id = id;
        this.changeDetectionStrategy = changeDetectionStrategy;
        this.records = records;
        this.propertyBindingTargets = propertyBindingTargets;
        this.eventBindings = eventBindings;
        this.directiveRecords = directiveRecords;
        this.genConfig = genConfig;
        this._names =
            new codegen_name_util_1.CodegenNameUtil(this.records, this.eventBindings, this.directiveRecords, UTIL);
        this._logic = new codegen_logic_util_1.CodegenLogicUtil(this._names, UTIL, changeDetectionStrategy);
        this._typeName = codegen_name_util_1.sanitizeName("ChangeDetector_" + this.id);
    }
    ChangeDetectorJITGenerator.prototype.generate = function () {
        var _this = this;
        var classDefinition = "\n      var " + this._typeName + " = function " + this._typeName + "(dispatcher) {\n        " + ABSTRACT_CHANGE_DETECTOR + ".call(\n            this, " + JSON.stringify(this.id) + ", dispatcher, " + this.records.length + ",\n            " + this._typeName + ".gen_propertyBindingTargets, " + this._typeName + ".gen_directiveIndices,\n            " + codegen_facade_1.codify(this.changeDetectionStrategy) + ");\n        this.dehydrateDirectives(false);\n      }\n\n      " + this._typeName + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n\n      " + this._typeName + ".prototype.detectChangesInRecordsInternal = function(throwOnChange) {\n        " + this._names.genInitLocals() + "\n        var " + IS_CHANGED_LOCAL + " = false;\n        var " + CHANGES_LOCAL + " = null;\n\n        " + this.records.map(function (r) { return _this._genRecord(r); }).join("\n") + "\n      }\n\n      " + this._maybeGenHandleEventInternal() + "\n\n      " + this._genCheckNoChanges() + "\n\n      " + this._maybeGenAfterContentLifecycleCallbacks() + "\n\n      " + this._maybeGenAfterViewLifecycleCallbacks() + "\n\n      " + this._maybeGenHydrateDirectives() + "\n\n      " + this._maybeGenDehydrateDirectives() + "\n\n      " + this._genPropertyBindingTargets() + "\n\n      " + this._genDirectiveIndices() + "\n\n      return function(dispatcher) {\n        return new " + this._typeName + "(dispatcher);\n      }\n    ";
        return new Function(ABSTRACT_CHANGE_DETECTOR, UTIL, classDefinition)(abstract_change_detector_1.AbstractChangeDetector, change_detection_util_1.ChangeDetectionUtil);
    };
    ChangeDetectorJITGenerator.prototype._genPropertyBindingTargets = function () {
        var targets = this._logic.genPropertyBindingTargets(this.propertyBindingTargets, this.genConfig.genDebugInfo);
        return this._typeName + ".gen_propertyBindingTargets = " + targets + ";";
    };
    ChangeDetectorJITGenerator.prototype._genDirectiveIndices = function () {
        var indices = this._logic.genDirectiveIndices(this.directiveRecords);
        return this._typeName + ".gen_directiveIndices = " + indices + ";";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenHandleEventInternal = function () {
        var _this = this;
        if (this.eventBindings.length > 0) {
            var handlers = this.eventBindings.map(function (eb) { return _this._genEventBinding(eb); }).join("\n");
            return "\n        " + this._typeName + ".prototype.handleEventInternal = function(eventName, elIndex, locals) {\n          var " + this._names.getPreventDefaultAccesor() + " = false;\n          " + this._names.genInitEventLocals() + "\n          " + handlers + "\n          return " + this._names.getPreventDefaultAccesor() + ";\n        }\n      ";
        }
        else {
            return '';
        }
    };
    ChangeDetectorJITGenerator.prototype._genEventBinding = function (eb) {
        var _this = this;
        var recs = eb.records.map(function (r) { return _this._genEventBindingEval(eb, r); }).join("\n");
        return "\n    if (eventName === \"" + eb.eventName + "\" && elIndex === " + eb.elIndex + ") {\n      " + recs + "\n    }";
    };
    ChangeDetectorJITGenerator.prototype._genEventBindingEval = function (eb, r) {
        if (r.lastInBinding) {
            var evalRecord = this._logic.genEventBindingEvalValue(eb, r);
            var markPath = this._genMarkPathToRootAsCheckOnce(r);
            var prevDefault = this._genUpdatePreventDefault(eb, r);
            return evalRecord + "\n" + markPath + "\n" + prevDefault;
        }
        else {
            return this._logic.genEventBindingEvalValue(eb, r);
        }
    };
    ChangeDetectorJITGenerator.prototype._genMarkPathToRootAsCheckOnce = function (r) {
        var br = r.bindingRecord;
        if (br.isDefaultChangeDetection()) {
            return "";
        }
        else {
            return this._names.getDetectorName(br.directiveRecord.directiveIndex) + ".markPathToRootAsCheckOnce();";
        }
    };
    ChangeDetectorJITGenerator.prototype._genUpdatePreventDefault = function (eb, r) {
        var local = this._names.getEventLocalName(eb, r.selfIndex);
        return "if (" + local + " === false) { " + this._names.getPreventDefaultAccesor() + " = true};";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenDehydrateDirectives = function () {
        var destroyPipesCode = this._names.genPipeOnDestroy();
        if (destroyPipesCode) {
            destroyPipesCode = "if (destroyPipes) { " + destroyPipesCode + " }";
        }
        var dehydrateFieldsCode = this._names.genDehydrateFields();
        if (!destroyPipesCode && !dehydrateFieldsCode)
            return '';
        return this._typeName + ".prototype.dehydrateDirectives = function(destroyPipes) {\n        " + destroyPipesCode + "\n        " + dehydrateFieldsCode + "\n    }";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenHydrateDirectives = function () {
        var hydrateDirectivesCode = this._logic.genHydrateDirectives(this.directiveRecords);
        var hydrateDetectorsCode = this._logic.genHydrateDetectors(this.directiveRecords);
        if (!hydrateDirectivesCode && !hydrateDetectorsCode)
            return '';
        return this._typeName + ".prototype.hydrateDirectives = function(directives) {\n      " + hydrateDirectivesCode + "\n      " + hydrateDetectorsCode + "\n    }";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenAfterContentLifecycleCallbacks = function () {
        var notifications = this._logic.genContentLifecycleCallbacks(this.directiveRecords);
        if (notifications.length > 0) {
            var directiveNotifications = notifications.join("\n");
            return "\n        " + this._typeName + ".prototype.afterContentLifecycleCallbacksInternal = function() {\n          " + directiveNotifications + "\n        }\n      ";
        }
        else {
            return '';
        }
    };
    ChangeDetectorJITGenerator.prototype._maybeGenAfterViewLifecycleCallbacks = function () {
        var notifications = this._logic.genViewLifecycleCallbacks(this.directiveRecords);
        if (notifications.length > 0) {
            var directiveNotifications = notifications.join("\n");
            return "\n        " + this._typeName + ".prototype.afterViewLifecycleCallbacksInternal = function() {\n          " + directiveNotifications + "\n        }\n      ";
        }
        else {
            return '';
        }
    };
    ChangeDetectorJITGenerator.prototype._genRecord = function (r) {
        var rec;
        if (r.isLifeCycleRecord()) {
            rec = this._genDirectiveLifecycle(r);
        }
        else if (r.isPipeRecord()) {
            rec = this._genPipeCheck(r);
        }
        else {
            rec = this._genReferenceCheck(r);
        }
        return "\n      " + this._maybeFirstInBinding(r) + "\n      " + rec + "\n      " + this._maybeGenLastInDirective(r) + "\n    ";
    };
    ChangeDetectorJITGenerator.prototype._genDirectiveLifecycle = function (r) {
        if (r.name === "DoCheck") {
            return this._genOnCheck(r);
        }
        else if (r.name === "OnInit") {
            return this._genOnInit(r);
        }
        else if (r.name === "OnChanges") {
            return this._genOnChange(r);
        }
        else {
            throw new lang_1.BaseException("Unknown lifecycle event '" + r.name + "'");
        }
    };
    ChangeDetectorJITGenerator.prototype._genPipeCheck = function (r) {
        var _this = this;
        var context = this._names.getLocalName(r.contextIndex);
        var argString = r.args.map(function (arg) { return _this._names.getLocalName(arg); }).join(", ");
        var oldValue = this._names.getFieldName(r.selfIndex);
        var newValue = this._names.getLocalName(r.selfIndex);
        var pipe = this._names.getPipeName(r.selfIndex);
        var pipeType = r.name;
        var read = "\n      if (" + pipe + " === " + UTIL + ".uninitialized) {\n        " + pipe + " = " + this._names.getPipesAccessorName() + ".get('" + pipeType + "');\n      }\n      " + newValue + " = " + pipe + ".transform(" + context + ", [" + argString + "]);\n    ";
        var check = "\n      if (" + oldValue + " !== " + newValue + ") {\n        " + newValue + " = " + UTIL + ".unwrapValue(" + newValue + ")\n        " + this._genChangeMarker(r) + "\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
        return r.shouldBeChecked() ? "" + read + check : read;
    };
    ChangeDetectorJITGenerator.prototype._genReferenceCheck = function (r) {
        var _this = this;
        var oldValue = this._names.getFieldName(r.selfIndex);
        var newValue = this._names.getLocalName(r.selfIndex);
        var read = "\n      " + this._logic.genPropertyBindingEvalValue(r) + "\n    ";
        var check = "\n      if (" + newValue + " !== " + oldValue + ") {\n        " + this._genChangeMarker(r) + "\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
        var genCode = r.shouldBeChecked() ? "" + read + check : read;
        if (r.isPureFunction()) {
            var condition = r.args.map(function (a) { return _this._names.getChangeName(a); }).join(" || ");
            if (r.isUsedByOtherRecord()) {
                return "if (" + condition + ") { " + genCode + " } else { " + newValue + " = " + oldValue + "; }";
            }
            else {
                return "if (" + condition + ") { " + genCode + " }";
            }
        }
        else {
            return genCode;
        }
    };
    ChangeDetectorJITGenerator.prototype._genChangeMarker = function (r) {
        return r.argumentToPureFunction ? this._names.getChangeName(r.selfIndex) + " = true" : "";
    };
    ChangeDetectorJITGenerator.prototype._genUpdateDirectiveOrElement = function (r) {
        if (!r.lastInBinding)
            return "";
        var newValue = this._names.getLocalName(r.selfIndex);
        var oldValue = this._names.getFieldName(r.selfIndex);
        var notifyDebug = this.genConfig.logBindingUpdate ? "this.logBindingUpdate(" + newValue + ");" : "";
        var br = r.bindingRecord;
        if (br.target.isDirective()) {
            var directiveProperty = this._names.getDirectiveName(br.directiveRecord.directiveIndex) + "." + br.target.name;
            return "\n        " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n        " + directiveProperty + " = " + newValue + ";\n        " + notifyDebug + "\n        " + IS_CHANGED_LOCAL + " = true;\n      ";
        }
        else {
            return "\n        " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n        this.notifyDispatcher(" + newValue + ");\n        " + notifyDebug + "\n      ";
        }
    };
    ChangeDetectorJITGenerator.prototype._genThrowOnChangeCheck = function (oldValue, newValue) {
        if (this.genConfig.genCheckNoChanges) {
            return "\n        if(throwOnChange) {\n          this.throwOnChangeError(" + oldValue + ", " + newValue + ");\n        }\n        ";
        }
        else {
            return '';
        }
    };
    ChangeDetectorJITGenerator.prototype._genCheckNoChanges = function () {
        if (this.genConfig.genCheckNoChanges) {
            return this._typeName + ".prototype.checkNoChanges = function() { this.runDetectChanges(true); }";
        }
        else {
            return '';
        }
    };
    ChangeDetectorJITGenerator.prototype._genAddToChanges = function (r) {
        var newValue = this._names.getLocalName(r.selfIndex);
        var oldValue = this._names.getFieldName(r.selfIndex);
        if (!r.bindingRecord.callOnChanges())
            return "";
        return CHANGES_LOCAL + " = this.addChange(" + CHANGES_LOCAL + ", " + oldValue + ", " + newValue + ");";
    };
    ChangeDetectorJITGenerator.prototype._maybeFirstInBinding = function (r) {
        var prev = change_detection_util_1.ChangeDetectionUtil.protoByIndex(this.records, r.selfIndex - 1);
        var firstInBindng = lang_1.isBlank(prev) || prev.bindingRecord !== r.bindingRecord;
        return firstInBindng && !r.bindingRecord.isDirectiveLifecycle() ?
            this._names.getPropertyBindingIndex() + " = " + r.propertyBindingIndex + ";" :
            '';
    };
    ChangeDetectorJITGenerator.prototype._maybeGenLastInDirective = function (r) {
        if (!r.lastInDirective)
            return "";
        return "\n      " + CHANGES_LOCAL + " = null;\n      " + this._genNotifyOnPushDetectors(r) + "\n      " + IS_CHANGED_LOCAL + " = false;\n    ";
    };
    ChangeDetectorJITGenerator.prototype._genOnCheck = function (r) {
        var br = r.bindingRecord;
        return "if (!throwOnChange) " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".doCheck();";
    };
    ChangeDetectorJITGenerator.prototype._genOnInit = function (r) {
        var br = r.bindingRecord;
        return "if (!throwOnChange && !" + this._names.getAlreadyCheckedName() + ") " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".onInit();";
    };
    ChangeDetectorJITGenerator.prototype._genOnChange = function (r) {
        var br = r.bindingRecord;
        return "if (!throwOnChange && " + CHANGES_LOCAL + ") " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".onChanges(" + CHANGES_LOCAL + ");";
    };
    ChangeDetectorJITGenerator.prototype._genNotifyOnPushDetectors = function (r) {
        var br = r.bindingRecord;
        if (!r.lastInDirective || br.isDefaultChangeDetection())
            return "";
        var retVal = "\n      if(" + IS_CHANGED_LOCAL + ") {\n        " + this._names.getDetectorName(br.directiveRecord.directiveIndex) + ".markAsCheckOnce();\n      }\n    ";
        return retVal;
    };
    return ChangeDetectorJITGenerator;
})();
exports.ChangeDetectorJITGenerator = ChangeDetectorJITGenerator;
//# sourceMappingURL=change_detection_jit_generator.js.map