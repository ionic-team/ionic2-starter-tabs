'use strict';/**
 * @module
 * @description
 * The http module provides services to perform http requests. To get started, see the {@link Http}
 * class.
 */
var di_1 = require('angular2/di');
var http_1 = require('./src/http/http');
var xhr_backend_1 = require('./src/http/backends/xhr_backend');
var jsonp_backend_1 = require('./src/http/backends/jsonp_backend');
var browser_xhr_1 = require('./src/http/backends/browser_xhr');
var browser_jsonp_1 = require('./src/http/backends/browser_jsonp');
var base_request_options_1 = require('./src/http/base_request_options');
var base_response_options_1 = require('./src/http/base_response_options');
var mock_backend_1 = require('./src/http/backends/mock_backend');
exports.MockConnection = mock_backend_1.MockConnection;
exports.MockBackend = mock_backend_1.MockBackend;
var static_request_1 = require('./src/http/static_request');
exports.Request = static_request_1.Request;
var static_response_1 = require('./src/http/static_response');
exports.Response = static_response_1.Response;
var interfaces_1 = require('./src/http/interfaces');
exports.Connection = interfaces_1.Connection;
exports.ConnectionBackend = interfaces_1.ConnectionBackend;
var browser_xhr_2 = require('./src/http/backends/browser_xhr');
exports.BrowserXhr = browser_xhr_2.BrowserXhr;
var base_request_options_2 = require('./src/http/base_request_options');
exports.BaseRequestOptions = base_request_options_2.BaseRequestOptions;
exports.RequestOptions = base_request_options_2.RequestOptions;
var base_response_options_2 = require('./src/http/base_response_options');
exports.BaseResponseOptions = base_response_options_2.BaseResponseOptions;
exports.ResponseOptions = base_response_options_2.ResponseOptions;
var xhr_backend_2 = require('./src/http/backends/xhr_backend');
exports.XHRBackend = xhr_backend_2.XHRBackend;
exports.XHRConnection = xhr_backend_2.XHRConnection;
var jsonp_backend_2 = require('./src/http/backends/jsonp_backend');
exports.JSONPBackend = jsonp_backend_2.JSONPBackend;
exports.JSONPConnection = jsonp_backend_2.JSONPConnection;
var http_2 = require('./src/http/http');
exports.Http = http_2.Http;
exports.Jsonp = http_2.Jsonp;
var headers_1 = require('./src/http/headers');
exports.Headers = headers_1.Headers;
var enums_1 = require('./src/http/enums');
exports.ResponseTypes = enums_1.ResponseTypes;
exports.ReadyStates = enums_1.ReadyStates;
exports.RequestMethods = enums_1.RequestMethods;
exports.RequestCredentialsOpts = enums_1.RequestCredentialsOpts;
exports.RequestCacheOpts = enums_1.RequestCacheOpts;
exports.RequestModesOpts = enums_1.RequestModesOpts;
var url_search_params_1 = require('./src/http/url_search_params');
exports.URLSearchParams = url_search_params_1.URLSearchParams;
/**
 * Provides a basic set of injectables to use the {@link Http} service in any application.
 *
 * #Example
 *
 * ```
 * import {HTTP_BINDINGS, Http} from 'http/http';
 * @Component({selector: 'http-app', viewBindings: [HTTP_BINDINGS]})
 * @View({template: '{{data}}'})
 * class MyApp {
 *   constructor(http:Http) {
 *     http.request('data.txt').subscribe(res => this.data = res.text());
 *   }
 * }
 * ```
 *
 */
exports.HTTP_BINDINGS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    di_1.bind(http_1.Http)
        .toFactory(function (xhrBackend, requestOptions) { return new http_1.Http(xhrBackend, requestOptions); }, [xhr_backend_1.XHRBackend, base_request_options_1.RequestOptions]),
    browser_xhr_1.BrowserXhr,
    di_1.bind(base_request_options_1.RequestOptions).toClass(base_request_options_1.BaseRequestOptions),
    di_1.bind(base_response_options_1.ResponseOptions).toClass(base_response_options_1.BaseResponseOptions),
    xhr_backend_1.XHRBackend
];
exports.JSONP_BINDINGS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    di_1.bind(http_1.Jsonp)
        .toFactory(function (jsonpBackend, requestOptions) { return new http_1.Jsonp(jsonpBackend, requestOptions); }, [jsonp_backend_1.JSONPBackend, base_request_options_1.RequestOptions]),
    browser_jsonp_1.BrowserJsonp,
    di_1.bind(base_request_options_1.RequestOptions).toClass(base_request_options_1.BaseRequestOptions),
    di_1.bind(base_response_options_1.ResponseOptions).toClass(base_response_options_1.BaseResponseOptions),
    jsonp_backend_1.JSONPBackend
];
//# sourceMappingURL=http.js.map