System.register("ionic/components/nav/nav-registry", [], function (_export) {
    /**
     * Map of possible views that can be navigated to using an Ionic NavController
     */
    "use strict";

    var NavRegistry;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [],
        execute: function () {
            NavRegistry = (function () {
                function NavRegistry() {
                    var views = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

                    _classCallCheck(this, NavRegistry);

                    this._views = new Map(views.map(function (view) {
                        return [view.name, view];
                    }));
                }

                _createClass(NavRegistry, [{
                    key: "get",
                    value: function get(viewName) {
                        return this._views.get(viewName);
                    }
                }, {
                    key: "set",
                    value: function set(view) {
                        this._views.set(view.name, view);
                    }
                }]);

                return NavRegistry;
            })();

            _export("NavRegistry", NavRegistry);
        }
    };
});