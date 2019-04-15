/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Gnucoop Angular Toolkit (gngt).
 *
 * Gnucoop Angular Toolkit (gngt) is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Gnucoop Angular Toolkit (gngt) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Gnucoop Angular Toolkit (gngt).  If not, see http://www.gnu.org/licenses/.
 *
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/store'), require('@angular/core'), require('url-parse'), require('@angular/common/http'), require('rxjs/operators'), require('@angular/forms'), require('rxjs'), require('@gngt/core/common'), require('@ngrx/effects'), require('@angular/router'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/auth', ['exports', '@ngrx/store', '@angular/core', 'url-parse', '@angular/common/http', 'rxjs/operators', '@angular/forms', 'rxjs', '@gngt/core/common', '@ngrx/effects', '@angular/router', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.dewco = global.dewco || {}, global.dewco.core = global.dewco.core || {}, global.dewco.core.auth = {}), global.ngrx.store, global.ng.core, global.urlParse, global.ng.common.http, global.rxjs.operators, global.ng.forms, global.rxjs, global.gngt.core.common, global.ngrx.effects, global.ng.router, global.ngxt.core));
}(this, function (exports, store, core, URLParse, http, operators, forms, rxjs, common, effects, router, core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {string} */
    var AuthApiActionTypes = {
        LoginSuccess: '[Auth/API] Login Success',
        LoginFailure: '[Auth/API] Login Failure',
        LoginRedirect: '[Auth/API] Login Redirect',
        RefreshToken: '[Auth/API] Refresh token',
    };
    var LoginSuccess = /** @class */ (function () {
        function LoginSuccess(payload) {
            this.payload = payload;
            this.type = AuthApiActionTypes.LoginSuccess;
        }
        return LoginSuccess;
    }());
    var LoginFailure = /** @class */ (function () {
        function LoginFailure(payload) {
            this.payload = payload;
            this.type = AuthApiActionTypes.LoginFailure;
        }
        return LoginFailure;
    }());
    var LoginRedirect = /** @class */ (function () {
        function LoginRedirect() {
            this.type = AuthApiActionTypes.LoginRedirect;
        }
        return LoginRedirect;
    }());
    var RefreshToken = /** @class */ (function () {
        function RefreshToken(payload) {
            this.payload = payload;
            this.type = AuthApiActionTypes.RefreshToken;
        }
        return RefreshToken;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {string} */
    var AuthActionTypes = {
        InitUser: '[Auth] Init user',
        InitUserComplete: '[Auth] Init user complete',
        InitComplete: '[Auth] Init complete',
        Logout: '[Auth] Logout',
        LogoutConfirmation: '[Auth] Logout Confirmation',
        LogoutConfirmationDismiss: '[Auth] Logout Confirmation Dismiss',
    };
    var InitUser = /** @class */ (function () {
        function InitUser() {
            this.type = AuthActionTypes.InitUser;
        }
        return InitUser;
    }());
    var InitUserComplete = /** @class */ (function () {
        function InitUserComplete(payload) {
            this.payload = payload;
            this.type = AuthActionTypes.InitUserComplete;
        }
        return InitUserComplete;
    }());
    var InitComplete = /** @class */ (function () {
        function InitComplete() {
            this.type = AuthActionTypes.InitComplete;
        }
        return InitComplete;
    }());
    var Logout = /** @class */ (function () {
        function Logout() {
            this.type = AuthActionTypes.Logout;
        }
        return Logout;
    }());
    var LogoutConfirmationDismiss = /** @class */ (function () {
        function LogoutConfirmationDismiss() {
            this.type = AuthActionTypes.LogoutConfirmationDismiss;
        }
        return LogoutConfirmationDismiss;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var initialState = {
        init: false,
        user: null,
        token: null
    };
    /**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function reducer(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case AuthApiActionTypes.LoginSuccess: {
                return __assign({}, state, { user: action.payload.user });
            }
            case AuthActionTypes.Logout: {
                return initialState;
            }
            case AuthActionTypes.InitUserComplete: {
                return __assign({}, state, { init: true, user: action.payload.user });
            }
            case AuthActionTypes.InitComplete: {
                return __assign({}, state, { init: true });
            }
            default: {
                return state;
            }
        }
    }
    /** @type {?} */
    var getInit = (/**
     * @param {?} state
     * @return {?}
     */
    function (state) { return state.init; });
    /** @type {?} */
    var getUser = (/**
     * @param {?} state
     * @return {?}
     */
    function (state) { return state.user; });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {string} */
    var LoginPageActionTypes = {
        Login: '[Login Page] Login',
    };
    var Login = /** @class */ (function () {
        function Login(payload) {
            this.payload = payload;
            this.type = LoginPageActionTypes.Login;
        }
        return Login;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var initialState$1 = {
        error: null,
        pending: false,
    };
    /**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function reducer$1(state, action) {
        if (state === void 0) { state = initialState$1; }
        switch (action.type) {
            case LoginPageActionTypes.Login: {
                return __assign({}, state, { error: null, pending: true });
            }
            case AuthApiActionTypes.LoginSuccess: {
                return __assign({}, state, { error: null, pending: false });
            }
            case AuthApiActionTypes.LoginFailure: {
                return __assign({}, state, { error: action.payload.error, pending: false });
            }
            default: {
                return state;
            }
        }
    }
    /** @type {?} */
    var getError = (/**
     * @param {?} state
     * @return {?}
     */
    function (state) { return state.error; });
    /** @type {?} */
    var getPending = (/**
     * @param {?} state
     * @return {?}
     */
    function (state) { return state.pending; });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AuthState() { }
    /**
     * @record
     */
    function State() { }
    /** @type {?} */
    var reducers = {
        status: reducer,
        loginPage: reducer$1,
    };
    /** @type {?} */
    var selectAuthState = store.createFeatureSelector('auth');
    /** @type {?} */
    var selectAuthStatusState = store.createSelector(selectAuthState, (/**
     * @param {?} state
     * @return {?}
     */
    function (state) { return state.status; }));
    /** @type {?} */
    var getInit$1 = store.createSelector(selectAuthStatusState, getInit);
    /** @type {?} */
    var getUser$1 = store.createSelector(selectAuthStatusState, getUser);
    /** @type {?} */
    var getLoggedIn = store.createSelector(getUser$1, (/**
     * @param {?} user
     * @return {?}
     */
    function (user) { return user != null; }));
    /** @type {?} */
    var selectLoginPageState = store.createSelector(selectAuthState, (/**
     * @param {?} state
     * @return {?}
     */
    function (state) { return state.loginPage; }));
    /** @type {?} */
    var getLoginPageError = store.createSelector(selectLoginPageState, getError);
    /** @type {?} */
    var getLoginPagePending = store.createSelector(selectLoginPageState, getPending);

    var reducers$1 = /*#__PURE__*/Object.freeze({
        AuthState: AuthState,
        State: State,
        reducers: reducers,
        selectAuthState: selectAuthState,
        selectAuthStatusState: selectAuthStatusState,
        getInit: getInit$1,
        getUser: getUser$1,
        getLoggedIn: getLoggedIn,
        selectLoginPageState: selectLoginPageState,
        getLoginPageError: getLoginPageError,
        getLoginPagePending: getLoginPagePending
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AUTH_OPTIONS = new core.InjectionToken('AUTH_OPTIONS', {
        providedIn: 'root',
        factory: (/**
         * @return {?}
         */
        function () { return ({
            loginUrl: '/login',
            logoutUrl: '/logout',
            refreshTokenUrl: '/refresh_token',
            meUrl: '/me'
        }); })
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var JWT_OPTIONS = new core.InjectionToken('JWT_OPTIONS', {
        providedIn: 'root',
        factory: (/**
         * @return {?}
         */
        function () { return ({}); })
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var JwtHelperService = /** @class */ (function () {
        function JwtHelperService(config) {
            this.tokenGetter = config && config.tokenGetter ?
                config.tokenGetter : (/**
             * @return {?}
             */
            function () { return null; });
            this.tokenSetter = config && config.tokenSetter ?
                config.tokenSetter : (/**
             * @return {?}
             */
            function () { return null; });
            this.refreshTokenGetter = config && config.refreshTokenGetter ?
                config.refreshTokenGetter : (/**
             * @return {?}
             */
            function () { return null; });
            this.refreshTokenSetter = config && config.refreshTokenSetter ?
                config.refreshTokenSetter : (/**
             * @return {?}
             */
            function () { return null; });
        }
        /**
         * @param {?} str
         * @return {?}
         */
        JwtHelperService.prototype.urlBase64Decode = /**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
                case 0: {
                    break;
                }
                case 2: {
                    output += '==';
                    break;
                }
                case 3: {
                    output += '=';
                    break;
                }
                default: {
                    throw new Error('Illegal base64url string!');
                }
            }
            return this.b64DecodeUnicode(output);
        };
        // credits for decoder goes to https://github.com/atk
        // credits for decoder goes to https://github.com/atk
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        JwtHelperService.prototype.b64decode = 
        // credits for decoder goes to https://github.com/atk
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            /** @type {?} */
            var output = '';
            str = String(str).replace(/=+$/, '');
            if (str.length % 4 === 1) {
                throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
            }
            for (
            // tslint:disable:no-bitwise
            // initialize result and counters
            var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
            // get next character
            (buffer = str.charAt(idx++)); 
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
                ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4)
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0) {
                // try to find character in table (0-63, not found => -1)
                buffer = chars.indexOf(buffer);
                // tslint:enable:no-bitwise
            }
            return output;
        };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        JwtHelperService.prototype.b64DecodeUnicode = /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            return decodeURIComponent(Array.prototype.map
                .call(this.b64decode(str), (/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }))
                .join(''));
        };
        /**
         * @param {?=} token
         * @return {?}
         */
        JwtHelperService.prototype.decodeToken = /**
         * @param {?=} token
         * @return {?}
         */
        function (token) {
            if (token === void 0) { token = this.tokenGetter(); }
            if (token === null) {
                return null;
            }
            /** @type {?} */
            var parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('The inspected token doesn\'t appear to be a JWT. '
                    + 'Check to make sure it has three parts and see https://jwt.io for more.');
            }
            /** @type {?} */
            var decoded = this.urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error('Cannot decode the token.');
            }
            return JSON.parse(decoded);
        };
        /**
         * @param {?=} token
         * @return {?}
         */
        JwtHelperService.prototype.getTokenExpirationDate = /**
         * @param {?=} token
         * @return {?}
         */
        function (token) {
            if (token === void 0) { token = this.tokenGetter(); }
            /** @type {?} */
            var decoded;
            decoded = this.decodeToken(token);
            if (!decoded.hasOwnProperty('exp')) {
                return null;
            }
            /** @type {?} */
            var date = new Date(0);
            date.setUTCSeconds(decoded.exp);
            return date;
        };
        /**
         * @param {?=} token
         * @param {?=} offsetSeconds
         * @return {?}
         */
        JwtHelperService.prototype.isTokenExpired = /**
         * @param {?=} token
         * @param {?=} offsetSeconds
         * @return {?}
         */
        function (token, offsetSeconds) {
            if (token === void 0) { token = this.tokenGetter(); }
            if (token === null || token === '') {
                return true;
            }
            /** @type {?} */
            var date = this.getTokenExpirationDate(token);
            offsetSeconds = offsetSeconds || 0;
            if (date === null) {
                return true;
            }
            return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
        };
        JwtHelperService.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] },
        ];
        /** @nocollapse */
        JwtHelperService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [JWT_OPTIONS,] }] }
        ]; };
        /** @nocollapse */ JwtHelperService.ngInjectableDef = core.defineInjectable({ factory: function JwtHelperService_Factory() { return new JwtHelperService(core.inject(JWT_OPTIONS)); }, token: JwtHelperService, providedIn: "root" });
        return JwtHelperService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var JwtInterceptor = /** @class */ (function () {
        function JwtInterceptor(config, jwtHelper) {
            this.jwtHelper = jwtHelper;
            this.tokenGetter = config.tokenGetter;
            this.headerName = config.headerName || 'Authorization';
            this.authScheme =
                config.authScheme || config.authScheme === ''
                    ? config.authScheme
                    : 'Bearer ';
            this.whitelistedDomains = config.whitelistedDomains || [];
            this.blacklistedRoutes = config.blacklistedRoutes || [];
            this.throwNoTokenError = config.throwNoTokenError || false;
            this.skipWhenExpired = config.skipWhenExpired || false;
        }
        /**
         * @param {?} request
         * @return {?}
         */
        JwtInterceptor.prototype.isWhitelistedDomain = /**
         * @param {?} request
         * @return {?}
         */
        function (request) {
            /** @type {?} */
            var requestUrl = new URLParse(request.url);
            return (requestUrl.host === null ||
                this.whitelistedDomains.findIndex((/**
                 * @param {?} domain
                 * @return {?}
                 */
                function (domain) {
                    return typeof domain === 'string'
                        ? domain === requestUrl.host
                        : domain instanceof RegExp
                            ? domain.test(requestUrl.host)
                            : false;
                })) > -1);
        };
        /**
         * @param {?} request
         * @return {?}
         */
        JwtInterceptor.prototype.isBlacklistedRoute = /**
         * @param {?} request
         * @return {?}
         */
        function (request) {
            /** @type {?} */
            var url = request.url;
            return (this.blacklistedRoutes.findIndex((/**
             * @param {?} route
             * @return {?}
             */
            function (route) {
                return typeof route === 'string'
                    ? route === url
                    : route instanceof RegExp
                        ? route.test(url)
                        : false;
            })) > -1);
        };
        /**
         * @param {?} token
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
        JwtInterceptor.prototype.handleInterception = /**
         * @param {?} token
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
        function (token, request, next) {
            var _a;
            /** @type {?} */
            var tokenIsExpired = false;
            if (!token && this.throwNoTokenError) {
                throw new Error('Could not get token from tokenGetter function.');
            }
            if (this.skipWhenExpired) {
                tokenIsExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
            }
            if (token && tokenIsExpired && this.skipWhenExpired) {
                request = request.clone();
            }
            else if (token &&
                this.isWhitelistedDomain(request) &&
                !this.isBlacklistedRoute(request)) {
                request = request.clone({
                    setHeaders: (_a = {},
                        _a[this.headerName] = "" + this.authScheme + token,
                        _a)
                });
            }
            return next.handle(request);
        };
        /**
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
        JwtInterceptor.prototype.intercept = /**
         * @param {?} request
         * @param {?} next
         * @return {?}
         */
        function (request, next) {
            /** @type {?} */
            var token = this.tokenGetter ? this.tokenGetter() : null;
            return this.handleInterception(token, request, next);
        };
        JwtInterceptor.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] },
        ];
        /** @nocollapse */
        JwtInterceptor.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [JWT_OPTIONS,] }] },
            { type: JwtHelperService }
        ]; };
        /** @nocollapse */ JwtInterceptor.ngInjectableDef = core.defineInjectable({ factory: function JwtInterceptor_Factory() { return new JwtInterceptor(core.inject(JWT_OPTIONS), core.inject(JwtHelperService)); }, token: JwtInterceptor, providedIn: "root" });
        return JwtInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AuthService = /** @class */ (function () {
        function AuthService(_http, _config) {
            this._http = _http;
            this._config = _config;
        }
        /**
         * @param {?} credentials
         * @return {?}
         */
        AuthService.prototype.login = /**
         * @param {?} credentials
         * @return {?}
         */
        function (credentials) {
            /** @type {?} */
            var url = this._config.loginUrl;
            return this._http.post(url, credentials);
        };
        /**
         * @return {?}
         */
        AuthService.prototype.logout = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var url = this._config.logoutUrl;
            return this._http.post(url, {});
        };
        /**
         * @param {?} refreshToken
         * @return {?}
         */
        AuthService.prototype.refreshToken = /**
         * @param {?} refreshToken
         * @return {?}
         */
        function (refreshToken) {
            /** @type {?} */
            var url = this._config.refreshTokenUrl;
            return this._http.post(url, { refresh_token: refreshToken });
        };
        /**
         * @return {?}
         */
        AuthService.prototype.getCurrentUser = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var url = this._config.meUrl;
            return this._http.get(url);
        };
        AuthService.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] },
        ];
        /** @nocollapse */
        AuthService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_OPTIONS,] }] }
        ]; };
        /** @nocollapse */ AuthService.ngInjectableDef = core.defineInjectable({ factory: function AuthService_Factory() { return new AuthService(core.inject(http.HttpClient), core.inject(AUTH_OPTIONS)); }, token: AuthService, providedIn: "root" });
        return AuthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AuthGuard = /** @class */ (function () {
        function AuthGuard(store) {
            this.store = store;
        }
        /**
         * @return {?}
         */
        AuthGuard.prototype.canActivate = /**
         * @return {?}
         */
        function () {
            return this._guard();
        };
        /**
         * @param {?} _cr
         * @param {?} _state
         * @return {?}
         */
        AuthGuard.prototype.canActivateChild = /**
         * @param {?} _cr
         * @param {?} _state
         * @return {?}
         */
        function (_cr, _state) {
            return this._guard();
        };
        /**
         * @private
         * @return {?}
         */
        AuthGuard.prototype._guard = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return this.store.pipe(store.select(getInit$1), operators.filter((/**
             * @param {?} init
             * @return {?}
             */
            function (init) { return init; })), operators.switchMap((/**
             * @return {?}
             */
            function () { return _this.store.pipe(store.select(getLoggedIn)); })), operators.map((/**
             * @param {?} authed
             * @return {?}
             */
            function (authed) {
                if (!authed) {
                    _this.store.dispatch(new LoginRedirect());
                    return false;
                }
                return true;
            })), operators.take(1));
        };
        AuthGuard.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] },
        ];
        /** @nocollapse */
        AuthGuard.ctorParameters = function () { return [
            { type: store.Store }
        ]; };
        /** @nocollapse */ AuthGuard.ngInjectableDef = core.defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(core.inject(store.Store)); }, token: AuthGuard, providedIn: "root" });
        return AuthGuard;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    AuthUserInteractionsService = /** @class */ (function () {
        function AuthUserInteractionsService() {
        }
        return AuthUserInteractionsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    LoginComponent = /** @class */ (function () {
        function LoginComponent(fb, store, _cdr) {
            var _this = this;
            this._cdr = _cdr;
            this._loginEvt = new core.EventEmitter();
            this._loginSub = rxjs.Subscription.EMPTY;
            this.loginForm = fb.group({
                username: [null, [forms.Validators.required]],
                password: [null, [forms.Validators.required]]
            });
            this.valid = this.loginForm.valueChanges.pipe(operators.map((/**
             * @return {?}
             */
            function () { return _this.loginForm.valid; })));
            this._loginSub = this._loginEvt.subscribe((/**
             * @return {?}
             */
            function () {
                store.dispatch(new Login({ credentials: _this.loginForm.value }));
            }));
        }
        Object.defineProperty(LoginComponent.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} disabled
             * @return {?}
             */
            function (disabled) {
                this._disabled = common.forceBooleanProp(disabled);
                this._cdr.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        LoginComponent.prototype.login = /**
         * @return {?}
         */
        function () {
            this._loginEvt.next();
        };
        /**
         * @return {?}
         */
        LoginComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._loginSub.unsubscribe();
            this._loginEvt.complete();
        };
        return LoginComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AuthEffects = /** @class */ (function () {
        function AuthEffects(actions$, authService, jwtHelperService, userInteractionsService, router, ts, config) {
            var _this = this;
            this.actions$ = actions$;
            this.authService = authService;
            this.jwtHelperService = jwtHelperService;
            this.userInteractionsService = userInteractionsService;
            this.router = router;
            this.ts = ts;
            this.config = config;
            this.initUser$ = this.actions$.pipe(effects.ofType(AuthActionTypes.InitUser), operators.exhaustMap((/**
             * @return {?}
             */
            function () {
                return _this.authService.getCurrentUser().pipe(operators.catchError((/**
                 * @param {?} _
                 * @return {?}
                 */
                function (_) { return rxjs.of(null); })));
            })), operators.map((/**
             * @param {?} user
             * @return {?}
             */
            function (user) { return new InitUserComplete({ user: user }); })));
            this.initUserComplete$ = this.actions$.pipe(effects.ofType(AuthActionTypes.InitUserComplete), operators.map((/**
             * @return {?}
             */
            function () { return new InitComplete(); })));
            this.login$ = this.actions$.pipe(effects.ofType(LoginPageActionTypes.Login), operators.map((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return action.payload.credentials; })), operators.exhaustMap((/**
             * @param {?} auth
             * @return {?}
             */
            function (auth) {
                return _this.authService.login(auth).pipe(operators.map((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return new LoginSuccess(res); })), operators.catchError((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    /** @type {?} */
                    var errors = [];
                    if (err.status === 0 || !err.error.message) {
                        errors.push('Connection problem. Please try again');
                    }
                    else {
                        errors.push(err.error.message);
                    }
                    return rxjs.zip.apply(void 0, errors.map((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return (/** @type {?} */ (_this.ts.get(e))); }))).pipe(operators.map((/**
                     * @param {?} error
                     * @return {?}
                     */
                    function (error) { return new LoginFailure({ error: error }); })));
                })));
            })));
            this.loginSuccess$ = this.actions$.pipe(effects.ofType(AuthApiActionTypes.LoginSuccess), operators.tap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                /** @type {?} */
                var payload = (/** @type {?} */ (action.payload));
                /** @type {?} */
                var tokenKey = _this.config.tokenKey || 'access_token';
                /** @type {?} */
                var refreshTokenKey = _this.config.refreshTokenKey || 'refresh_token';
                _this.jwtHelperService.tokenSetter(payload[tokenKey]);
                _this.jwtHelperService.refreshTokenSetter(payload[refreshTokenKey]);
                _this.router.navigate(['/']);
            })), operators.map((/**
             * @return {?}
             */
            function () {
                return _this._getRefreshTokenAction();
            })));
            this.loginFailure$ = this.actions$.pipe(effects.ofType(AuthApiActionTypes.LoginFailure), operators.tap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                _this.userInteractionsService.showLoginError(action.payload.error.join('\n'));
            })));
            this.refreshToken$ = this.actions$.pipe(effects.ofType(AuthApiActionTypes.RefreshToken), operators.delayWhen((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return rxjs.timer(action.payload.refreshDelay); })), operators.exhaustMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this.authService.refreshToken(_this.jwtHelperService.refreshTokenGetter() || '').pipe(operators.switchMap((/**
                 * @param {?} payload
                 * @return {?}
                 */
                function (payload) {
                    /** @type {?} */
                    var res = [];
                    /** @type {?} */
                    var tokenKey = _this.config.tokenKey || 'access_token';
                    _this.jwtHelperService.tokenSetter(payload[tokenKey]);
                    if (action.payload.fromInit) {
                        res.push(new InitUser());
                    }
                    res.push(_this._getRefreshTokenAction());
                    return res;
                })), operators.catchError((/**
                 * @return {?}
                 */
                function () { return rxjs.of(new InitComplete()); })));
            })));
            this.loginRedirect$ = this.actions$.pipe(effects.ofType(AuthApiActionTypes.LoginRedirect, AuthActionTypes.Logout), operators.tap((/**
             * @param {?} _authed
             * @return {?}
             */
            function (_authed) {
                _this.router.navigate(['/login']);
            })));
            this.logoutConfirmation$ = this.actions$.pipe(effects.ofType(AuthActionTypes.LogoutConfirmation), operators.exhaustMap((/**
             * @return {?}
             */
            function () { return _this.userInteractionsService.askLogoutConfirm(); })), operators.map((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                return result
                    ? new Logout()
                    : new LogoutConfirmationDismiss();
            })));
            this.init$ = rxjs.defer((/**
             * @return {?}
             */
            function () { return rxjs.of(null); })).pipe(operators.switchMap((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var res = [];
                /** @type {?} */
                var token = _this.jwtHelperService.tokenGetter();
                if (token) {
                    try {
                        if (!_this.jwtHelperService.isTokenExpired(token)) {
                            /** @type {?} */
                            var decoded = _this.jwtHelperService.decodeToken(token);
                            /** @type {?} */
                            var scopes = _this.config.disableScopes ? [] : _this._getScopesFromToken(decoded);
                            if (_this.config.disableScopes || scopes.indexOf('admin') > -1) {
                                res.push(new InitUser());
                                res.push(_this._getRefreshTokenAction());
                            }
                        }
                        else {
                            res.push(new RefreshToken({ refreshDelay: 0, fromInit: true }));
                        }
                    }
                    catch (e) {
                        res.push(new InitComplete());
                    }
                }
                else {
                    res.push(new InitComplete());
                }
                return res;
            })));
        }
        /**
         * @private
         * @param {?=} fromInit
         * @return {?}
         */
        AuthEffects.prototype._getRefreshTokenAction = /**
         * @private
         * @param {?=} fromInit
         * @return {?}
         */
        function (fromInit) {
            /** @type {?} */
            var accessToken = this.jwtHelperService.tokenGetter();
            /** @type {?} */
            var exp = this.jwtHelperService.getTokenExpirationDate(accessToken) || new Date();
            /** @type {?} */
            var refreshDelay = Math.max(0, Math.round((exp.getTime() - new Date().getTime()) * 0.8));
            return new RefreshToken({ refreshDelay: refreshDelay, fromInit: fromInit });
        };
        /**
         * @private
         * @param {?} token
         * @return {?}
         */
        AuthEffects.prototype._getScopesFromToken = /**
         * @private
         * @param {?} token
         * @return {?}
         */
        function (token) {
            /** @type {?} */
            var scopesPath = this.config.scopesPath || ['scopes'];
            scopesPath.forEach((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return token = token[p]; }));
            return token;
        };
        AuthEffects.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AuthEffects.ctorParameters = function () { return [
            { type: effects.Actions },
            { type: AuthService },
            { type: JwtHelperService },
            { type: AuthUserInteractionsService },
            { type: router.Router },
            { type: core$1.TranslateService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_OPTIONS,] }] }
        ]; };
        __decorate([
            effects.Effect(),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "initUser$", void 0);
        __decorate([
            effects.Effect(),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "initUserComplete$", void 0);
        __decorate([
            effects.Effect(),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "login$", void 0);
        __decorate([
            effects.Effect(),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "loginSuccess$", void 0);
        __decorate([
            effects.Effect({ dispatch: false }),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "loginFailure$", void 0);
        __decorate([
            effects.Effect(),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "refreshToken$", void 0);
        __decorate([
            effects.Effect({ dispatch: false }),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "loginRedirect$", void 0);
        __decorate([
            effects.Effect(),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "logoutConfirmation$", void 0);
        __decorate([
            effects.Effect(),
            __metadata("design:type", Object)
        ], AuthEffects.prototype, "init$", void 0);
        return AuthEffects;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AuthModule = /** @class */ (function () {
        function AuthModule() {
        }
        AuthModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            store.StoreModule.forFeature('auth', reducers),
                            effects.EffectsModule.forFeature([AuthEffects]),
                        ],
                        providers: [
                            AuthEffects,
                            AuthGuard,
                            AuthService,
                            JwtHelperService,
                            JwtInterceptor
                        ]
                    },] },
        ];
        return AuthModule;
    }());

    exports.AUTH_OPTIONS = AUTH_OPTIONS;
    exports.AuthGuard = AuthGuard;
    exports.AuthModule = AuthModule;
    exports.AuthService = AuthService;
    exports.AuthUserInteractionsService = AuthUserInteractionsService;
    exports.JWT_OPTIONS = JWT_OPTIONS;
    exports.JwtHelperService = JwtHelperService;
    exports.JwtInterceptor = JwtInterceptor;
    exports.LoginComponent = LoginComponent;
    exports.reducers = reducers$1;
    exports.ɵb = reducers;
    exports.ɵc = reducer;
    exports.ɵd = reducer$1;
    exports.ɵe = AuthEffects;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-auth.umd.js.map
