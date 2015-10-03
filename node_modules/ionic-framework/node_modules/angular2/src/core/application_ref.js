'use strict';/**
 * Represents a Angular's representation of an Application.
 *
 * `ApplicationRef` represents a running application instance. Use it to retrieve the host
 * component, injector,
 * or dispose of an application.
 */
var ApplicationRef = (function () {
    /**
     * @private
     */
    function ApplicationRef(hostComponent, hostComponentType, injector) {
        this._hostComponent = hostComponent;
        this._injector = injector;
        this._hostComponentType = hostComponentType;
    }
    Object.defineProperty(ApplicationRef.prototype, "hostComponentType", {
        /**
         * Returns the current {@link ComponentMetadata} type.
         */
        get: function () { return this._hostComponentType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef.prototype, "hostComponent", {
        /**
         * Returns the current {@link ComponentMetadata} instance.
         */
        get: function () { return this._hostComponent.instance; },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose (un-load) the application.
     */
    ApplicationRef.prototype.dispose = function () {
        // TODO: We also need to clean up the Zone, ... here!
        this._hostComponent.dispose();
    };
    Object.defineProperty(ApplicationRef.prototype, "injector", {
        /**
         * Returns the root application {@link Injector}.
         */
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    return ApplicationRef;
})();
exports.ApplicationRef = ApplicationRef;
//# sourceMappingURL=application_ref.js.map