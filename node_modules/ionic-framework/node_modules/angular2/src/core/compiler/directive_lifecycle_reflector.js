'use strict';var lang_1 = require('angular2/src/core/facade/lang');
var metadata_1 = require('angular2/metadata');
function hasLifecycleHook(e, type, annotation) {
    if (lang_1.isPresent(annotation.lifecycle)) {
        return annotation.lifecycle.indexOf(e) !== -1;
    }
    else {
        if (!(type instanceof lang_1.Type))
            return false;
        var proto = type.prototype;
        switch (e) {
            case metadata_1.LifecycleEvent.AfterContentInit:
                return !!proto.afterContentInit;
            case metadata_1.LifecycleEvent.AfterContentChecked:
                return !!proto.afterContentChecked;
            case metadata_1.LifecycleEvent.AfterViewInit:
                return !!proto.afterViewInit;
            case metadata_1.LifecycleEvent.AfterViewChecked:
                return !!proto.afterViewChecked;
            case metadata_1.LifecycleEvent.OnChanges:
                return !!proto.onChanges;
            case metadata_1.LifecycleEvent.DoCheck:
                return !!proto.doCheck;
            case metadata_1.LifecycleEvent.OnDestroy:
                return !!proto.onDestroy;
            case metadata_1.LifecycleEvent.OnInit:
                return !!proto.onInit;
            default:
                return false;
        }
    }
}
exports.hasLifecycleHook = hasLifecycleHook;
//# sourceMappingURL=directive_lifecycle_reflector.js.map