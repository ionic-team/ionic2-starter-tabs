'use strict';var constants_1 = require('./constants');
/**
 * Controls change detection.
 *
 * {@link ChangeDetectorRef} allows requesting checks for detectors that rely on observables. It
 * also allows detaching and attaching change detector subtrees.
 */
var ChangeDetectorRef = (function () {
    /**
     * @private
     */
    function ChangeDetectorRef(_cd) {
        this._cd = _cd;
    }
    /**
     * Request to check all OnPush ancestors.
     */
    ChangeDetectorRef.prototype.markForCheck = function () { this._cd.markPathToRootAsCheckOnce(); };
    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     */
    ChangeDetectorRef.prototype.detach = function () { this._cd.mode = constants_1.ChangeDetectionStrategy.Detached; };
    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also requests a check of this change detector. This reattached change detector will be
     * checked during the next change detection run.
     */
    ChangeDetectorRef.prototype.reattach = function () {
        this._cd.mode = constants_1.ChangeDetectionStrategy.CheckAlways;
        this.markForCheck();
    };
    return ChangeDetectorRef;
})();
exports.ChangeDetectorRef = ChangeDetectorRef;
//# sourceMappingURL=change_detector_ref.js.map