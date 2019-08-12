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
import { createFeatureSelector, createSelector, select, Store, StoreModule } from '@ngrx/store';
import { __assign } from 'tslib';
import { InjectionToken, Injectable, Inject, ɵɵdefineInjectable, ɵɵinject, EventEmitter, NgModule } from '@angular/core';
import * as URLParse from 'url-parse';
import { HttpClient } from '@angular/common/http';
import { filter, concatMap, map, take, exhaustMap, catchError, tap, mergeMap, delayWhen, switchMap } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { Subscription, of, zip, timer } from 'rxjs';
import { forceBooleanProp } from '@gngt/core/common';
import { Actions, createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {string} */
var AuthActionTypes = {
    Init: '[Auth] Init',
    InitUser: '[Auth] Init user',
    InitUserComplete: '[Auth] Init user complete',
    InitComplete: '[Auth] Init complete',
    Logout: '[Auth] Logout',
    LogoutConfirmation: '[Auth] Logout Confirmation',
    LogoutConfirmationDismiss: '[Auth] Logout Confirmation Dismiss',
};
var Init = /** @class */ (function () {
    function Init() {
        this.type = AuthActionTypes.Init;
    }
    return Init;
}());
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
var LogoutConfirmation = /** @class */ (function () {
    function LogoutConfirmation() {
        this.type = AuthActionTypes.LogoutConfirmation;
    }
    return LogoutConfirmation;
}());
var LogoutConfirmationDismiss = /** @class */ (function () {
    function LogoutConfirmationDismiss() {
        this.type = AuthActionTypes.LogoutConfirmationDismiss;
    }
    return LogoutConfirmationDismiss;
}());

var authActions = /*#__PURE__*/Object.freeze({
    AuthActionTypes: AuthActionTypes,
    Init: Init,
    InitUser: InitUser,
    InitUserComplete: InitUserComplete,
    InitComplete: InitComplete,
    Logout: Logout,
    LogoutConfirmation: LogoutConfirmation,
    LogoutConfirmationDismiss: LogoutConfirmationDismiss
});

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

var authApiActions = /*#__PURE__*/Object.freeze({
    AuthApiActionTypes: AuthApiActionTypes,
    LoginSuccess: LoginSuccess,
    LoginFailure: LoginFailure,
    LoginRedirect: LoginRedirect,
    RefreshToken: RefreshToken
});

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
var selectAuthState = createFeatureSelector('auth');
var ɵ0 = /**
 * @param {?} state
 * @return {?}
 */
function (state) { return state.status; };
/** @type {?} */
var selectAuthStatusState = createSelector(selectAuthState, (ɵ0));
/** @type {?} */
var getInit$1 = createSelector(selectAuthStatusState, getInit);
/** @type {?} */
var getUser$1 = createSelector(selectAuthStatusState, getUser);
var ɵ1 = /**
 * @param {?} user
 * @return {?}
 */
function (user) { return user != null; };
/** @type {?} */
var getLoggedIn = createSelector(getUser$1, (ɵ1));
var ɵ2 = /**
 * @param {?} state
 * @return {?}
 */
function (state) { return state.loginPage; };
/** @type {?} */
var selectLoginPageState = createSelector(selectAuthState, (ɵ2));
/** @type {?} */
var getLoginPageError = createSelector(selectLoginPageState, getError);
/** @type {?} */
var getLoginPagePending = createSelector(selectLoginPageState, getPending);

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
    getLoginPagePending: getLoginPagePending,
    ɵ0: ɵ0,
    ɵ1: ɵ1,
    ɵ2: ɵ2
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var AUTH_OPTIONS = new InjectionToken('AUTH_OPTIONS', {
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
var JWT_OPTIONS = new InjectionToken('JWT_OPTIONS', {
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
        return this._b64DecodeUnicode(output);
    };
    // credits for decoder goes to https://github.com/atk
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype._b64decode = 
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
    JwtHelperService.prototype._b64DecodeUnicode = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(Array.prototype.map
            .call(this._b64decode(str), (/**
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
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    JwtHelperService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] }
    ]; };
    /** @nocollapse */ JwtHelperService.ngInjectableDef = ɵɵdefineInjectable({ factory: function JwtHelperService_Factory() { return new JwtHelperService(ɵɵinject(JWT_OPTIONS)); }, token: JwtHelperService, providedIn: "root" });
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
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    JwtInterceptor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] },
        { type: JwtHelperService }
    ]; };
    /** @nocollapse */ JwtInterceptor.ngInjectableDef = ɵɵdefineInjectable({ factory: function JwtInterceptor_Factory() { return new JwtInterceptor(ɵɵinject(JWT_OPTIONS), ɵɵinject(JwtHelperService)); }, token: JwtInterceptor, providedIn: "root" });
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
    /**
     * @return {?}
     */
    AuthService.prototype.getLoggedInUser = /**
     * @return {?}
     */
    function () {
        return this._config.loggedInUserGetter
            ? this._config.loggedInUserGetter()
            : null;
    };
    AuthService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] }] }
    ]; };
    /** @nocollapse */ AuthService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(ɵɵinject(HttpClient), ɵɵinject(AUTH_OPTIONS)); }, token: AuthService, providedIn: "root" });
    return AuthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthGuard = /** @class */ (function () {
    function AuthGuard(_store) {
        this._store = _store;
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
        return this._store.pipe(select(getInit$1), filter((/**
         * @param {?} init
         * @return {?}
         */
        function (init) { return init; })), concatMap((/**
         * @return {?}
         */
        function () { return _this._store.pipe(select(getLoggedIn)); })), map((/**
         * @param {?} authed
         * @return {?}
         */
        function (authed) {
            if (!authed) {
                _this._store.dispatch(new LoginRedirect());
                return false;
            }
            return true;
        })), take(1));
    };
    AuthGuard.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    AuthGuard.ctorParameters = function () { return [
        { type: Store }
    ]; };
    /** @nocollapse */ AuthGuard.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(ɵɵinject(Store)); }, token: AuthGuard, providedIn: "root" });
    return AuthGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @abstract
 */
var  /**
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
var  /**
 * @abstract
 */
LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, store, _cdr) {
        var _this = this;
        this._cdr = _cdr;
        this._loginEvt = new EventEmitter();
        this._loginSub = Subscription.EMPTY;
        this.loginForm = fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
        this.valid = this.loginForm.valueChanges.pipe(map((/**
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
            this._disabled = forceBooleanProp(disabled);
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
var AuthEffects = /** @class */ (function () {
    function AuthEffects(_actions$, _authService, _jwtHelperService, _userInteractionsService, _router, _ts, _config) {
        var _this = this;
        this._actions$ = _actions$;
        this._authService = _authService;
        this._jwtHelperService = _jwtHelperService;
        this._userInteractionsService = _userInteractionsService;
        this._router = _router;
        this._ts = _ts;
        this._config = _config;
        this.initUser$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthActionTypes.InitUser), exhaustMap((/**
         * @return {?}
         */
        function () {
            return _this._authService.getCurrentUser().pipe(catchError((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                return of(_this._config.meGetter != null ? _this._config.meGetter() : null);
            })));
        })), map((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            if (_this._config.meSetter != null) {
                _this._config.meSetter(user);
            }
            return new InitUserComplete({ user: user });
        }))); }));
        this.initUserComplete$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthActionTypes.InitUserComplete), map((/**
         * @return {?}
         */
        function () { return new InitComplete(); }))); }));
        this.login$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(LoginPageActionTypes.Login), map((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return action.payload.credentials; })), exhaustMap((/**
         * @param {?} auth
         * @return {?}
         */
        function (auth) {
            return _this._authService.login(auth).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return new LoginSuccess(res); })), catchError((/**
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
                return zip.apply(void 0, errors.map((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return (/** @type {?} */ (_this._ts.get(e))); }))).pipe(map((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return new LoginFailure({ error: error }); })));
            })));
        }))); }));
        this.loginSuccess$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthApiActionTypes.LoginSuccess), tap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            /** @type {?} */
            var payload = (/** @type {?} */ (action.payload));
            /** @type {?} */
            var tokenKey = _this._config.tokenKey || 'access_token';
            /** @type {?} */
            var refreshTokenKey = _this._config.refreshTokenKey || 'refresh_token';
            _this._jwtHelperService.tokenSetter(payload[tokenKey]);
            _this._jwtHelperService.refreshTokenSetter(payload[refreshTokenKey]);
            if (_this._config.loggedInUserSetter) {
                _this._config.loggedInUserSetter(payload.user_id);
            }
            _this._router.navigate(['/']);
        })), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return [
            _this._getRefreshTokenAction(),
            new InitUserComplete({ user: action.payload.user }),
        ]; }))); }));
        this.loginFailure$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthApiActionTypes.LoginFailure), tap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            _this._userInteractionsService.showLoginError(action.payload.error.join('\n'));
        }))); }), { dispatch: false });
        this.refreshToken$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthApiActionTypes.RefreshToken), delayWhen((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return timer(action.payload.refreshDelay); })), exhaustMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            return _this._authService.refreshToken(_this._jwtHelperService.refreshTokenGetter() || '').pipe(switchMap((/**
             * @param {?} payload
             * @return {?}
             */
            function (payload) {
                /** @type {?} */
                var res = [];
                /** @type {?} */
                var tokenKey = _this._config.tokenKey || 'access_token';
                _this._jwtHelperService.tokenSetter(payload[tokenKey]);
                if (action.payload.fromInit) {
                    res.push(new InitUser());
                }
                res.push(_this._getRefreshTokenAction());
                return res;
            })), catchError((/**
             * @return {?}
             */
            function () { return of(new InitComplete()); })));
        }))); }));
        this.loginRedirect$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthApiActionTypes.LoginRedirect, AuthActionTypes.Logout), tap((/**
         * @param {?} _authed
         * @return {?}
         */
        function (_authed) {
            _this._router.navigate(['/login']);
        }))); }), { dispatch: false });
        this.logoutConfirmation$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthActionTypes.LogoutConfirmation), exhaustMap((/**
         * @return {?}
         */
        function () { return _this._userInteractionsService.askLogoutConfirm(); })), map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            return result
                ? new Logout()
                : new LogoutConfirmationDismiss();
        }))); }));
        this.init$ = createEffect((/**
         * @return {?}
         */
        function () { return _this._actions$.pipe(ofType(AuthActionTypes.Init), switchMap((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var res = [];
            /** @type {?} */
            var token = _this._jwtHelperService.tokenGetter();
            if (token) {
                try {
                    if (!_this._jwtHelperService.isTokenExpired(token)) {
                        /** @type {?} */
                        var decoded = _this._jwtHelperService.decodeToken(token);
                        /** @type {?} */
                        var scopes = _this._config.disableScopes ? [] : _this._getScopesFromToken(decoded);
                        if (_this._config.disableScopes || scopes.indexOf('admin') > -1) {
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
        }))); }));
    }
    /**
     * @return {?}
     */
    AuthEffects.prototype.ngrxOnInitEffects = /**
     * @return {?}
     */
    function () {
        return new Init();
    };
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
        var accessToken = this._jwtHelperService.tokenGetter();
        /** @type {?} */
        var exp = this._jwtHelperService.getTokenExpirationDate(accessToken) || new Date();
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
        var scopesPath = this._config.scopesPath || ['scopes'];
        scopesPath.forEach((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return token = token[p]; }));
        return token;
    };
    AuthEffects.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthEffects.ctorParameters = function () { return [
        { type: Actions },
        { type: AuthService },
        { type: JwtHelperService },
        { type: AuthUserInteractionsService },
        { type: Router },
        { type: TranslateService },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] }] }
    ]; };
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
        { type: NgModule, args: [{
                    imports: [
                        StoreModule.forFeature('auth', reducers),
                        EffectsModule.forFeature([AuthEffects]),
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

export { AUTH_OPTIONS, authActions as AuthActions, authApiActions as AuthApiActions, AuthGuard, AuthModule, AuthService, AuthUserInteractionsService, JWT_OPTIONS, JwtHelperService, JwtInterceptor, LoginComponent, reducers$1 as reducers, reducers as ɵb, reducer as ɵc, reducer$1 as ɵd, AuthEffects as ɵe };
//# sourceMappingURL=auth.es5.js.map
