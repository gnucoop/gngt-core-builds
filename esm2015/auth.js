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
import { InjectionToken, Injectable, Inject, defineInjectable, inject, EventEmitter, NgModule } from '@angular/core';
import * as URLParse from 'url-parse';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap, map, take, exhaustMap, catchError, tap, delayWhen } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { Subscription, of, zip, timer, defer } from 'rxjs';
import { forceBooleanProp } from '@gngt/core/common';
import { ofType, Actions, Effect, EffectsModule } from '@ngrx/effects';
import { __decorate, __metadata } from 'tslib';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {string} */
const AuthApiActionTypes = {
    LoginSuccess: '[Auth/API] Login Success',
    LoginFailure: '[Auth/API] Login Failure',
    LoginRedirect: '[Auth/API] Login Redirect',
    RefreshToken: '[Auth/API] Refresh token',
};
class LoginSuccess {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = AuthApiActionTypes.LoginSuccess;
    }
}
class LoginFailure {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = AuthApiActionTypes.LoginFailure;
    }
}
class LoginRedirect {
    constructor() {
        this.type = AuthApiActionTypes.LoginRedirect;
    }
}
class RefreshToken {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = AuthApiActionTypes.RefreshToken;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {string} */
const AuthActionTypes = {
    InitUser: '[Auth] Init user',
    InitUserComplete: '[Auth] Init user complete',
    InitComplete: '[Auth] Init complete',
    Logout: '[Auth] Logout',
    LogoutConfirmation: '[Auth] Logout Confirmation',
    LogoutConfirmationDismiss: '[Auth] Logout Confirmation Dismiss',
};
class InitUser {
    constructor() {
        this.type = AuthActionTypes.InitUser;
    }
}
class InitUserComplete {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.InitUserComplete;
    }
}
class InitComplete {
    constructor() {
        this.type = AuthActionTypes.InitComplete;
    }
}
class Logout {
    constructor() {
        this.type = AuthActionTypes.Logout;
    }
}
class LogoutConfirmationDismiss {
    constructor() {
        this.type = AuthActionTypes.LogoutConfirmationDismiss;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const initialState = {
    init: false,
    user: null,
    token: null
};
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function reducer(state = initialState, action) {
    switch (action.type) {
        case AuthApiActionTypes.LoginSuccess: {
            return Object.assign({}, state, { user: action.payload.user });
        }
        case AuthActionTypes.Logout: {
            return initialState;
        }
        case AuthActionTypes.InitUserComplete: {
            return Object.assign({}, state, { init: true, user: action.payload.user });
        }
        case AuthActionTypes.InitComplete: {
            return Object.assign({}, state, { init: true });
        }
        default: {
            return state;
        }
    }
}
/** @type {?} */
const getInit = (/**
 * @param {?} state
 * @return {?}
 */
(state) => state.init);
/** @type {?} */
const getUser = (/**
 * @param {?} state
 * @return {?}
 */
(state) => state.user);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {string} */
const LoginPageActionTypes = {
    Login: '[Login Page] Login',
};
class Login {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = LoginPageActionTypes.Login;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const initialState$1 = {
    error: null,
    pending: false,
};
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
function reducer$1(state = initialState$1, action) {
    switch (action.type) {
        case LoginPageActionTypes.Login: {
            return Object.assign({}, state, { error: null, pending: true });
        }
        case AuthApiActionTypes.LoginSuccess: {
            return Object.assign({}, state, { error: null, pending: false });
        }
        case AuthApiActionTypes.LoginFailure: {
            return Object.assign({}, state, { error: action.payload.error, pending: false });
        }
        default: {
            return state;
        }
    }
}
/** @type {?} */
const getError = (/**
 * @param {?} state
 * @return {?}
 */
(state) => state.error);
/** @type {?} */
const getPending = (/**
 * @param {?} state
 * @return {?}
 */
(state) => state.pending);

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
const reducers = {
    status: reducer,
    loginPage: reducer$1,
};
/** @type {?} */
const selectAuthState = createFeatureSelector('auth');
/** @type {?} */
const selectAuthStatusState = createSelector(selectAuthState, (/**
 * @param {?} state
 * @return {?}
 */
(state) => state.status));
/** @type {?} */
const getInit$1 = createSelector(selectAuthStatusState, getInit);
/** @type {?} */
const getUser$1 = createSelector(selectAuthStatusState, getUser);
/** @type {?} */
const getLoggedIn = createSelector(getUser$1, (/**
 * @param {?} user
 * @return {?}
 */
user => user != null));
/** @type {?} */
const selectLoginPageState = createSelector(selectAuthState, (/**
 * @param {?} state
 * @return {?}
 */
(state) => state.loginPage));
/** @type {?} */
const getLoginPageError = createSelector(selectLoginPageState, getError);
/** @type {?} */
const getLoginPagePending = createSelector(selectLoginPageState, getPending);

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
const AUTH_OPTIONS = new InjectionToken('AUTH_OPTIONS', {
    providedIn: 'root',
    factory: (/**
     * @return {?}
     */
    () => ({
        loginUrl: '/login',
        logoutUrl: '/logout',
        refreshTokenUrl: '/refresh_token',
        meUrl: '/me'
    }))
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const JWT_OPTIONS = new InjectionToken('JWT_OPTIONS', {
    providedIn: 'root',
    factory: (/**
     * @return {?}
     */
    () => ({}))
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class JwtHelperService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.tokenGetter = config && config.tokenGetter ?
            config.tokenGetter : (/**
         * @return {?}
         */
        () => null);
        this.tokenSetter = config && config.tokenSetter ?
            config.tokenSetter : (/**
         * @return {?}
         */
        () => null);
        this.refreshTokenGetter = config && config.refreshTokenGetter ?
            config.refreshTokenGetter : (/**
         * @return {?}
         */
        () => null);
        this.refreshTokenSetter = config && config.refreshTokenSetter ?
            config.refreshTokenSetter : (/**
         * @return {?}
         */
        () => null);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    urlBase64Decode(str) {
        /** @type {?} */
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
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
    }
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64decode(str) {
        /** @type {?} */
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        /** @type {?} */
        let output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
        }
        for (
        // tslint:disable:no-bitwise
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0; 
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
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), (/**
         * @param {?} c
         * @return {?}
         */
        (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }))
            .join(''));
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    decodeToken(token = this.tokenGetter()) {
        if (token === null) {
            return null;
        }
        /** @type {?} */
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('The inspected token doesn\'t appear to be a JWT. '
                + 'Check to make sure it has three parts and see https://jwt.io for more.');
        }
        /** @type {?} */
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }
        return JSON.parse(decoded);
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getTokenExpirationDate(token = this.tokenGetter()) {
        /** @type {?} */
        let decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        /** @type {?} */
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    /**
     * @param {?=} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    isTokenExpired(token = this.tokenGetter(), offsetSeconds) {
        if (token === null || token === '') {
            return true;
        }
        /** @type {?} */
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return true;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
}
JwtHelperService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
JwtHelperService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] }
];
/** @nocollapse */ JwtHelperService.ngInjectableDef = defineInjectable({ factory: function JwtHelperService_Factory() { return new JwtHelperService(inject(JWT_OPTIONS)); }, token: JwtHelperService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class JwtInterceptor {
    /**
     * @param {?} config
     * @param {?} jwtHelper
     */
    constructor(config, jwtHelper) {
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
    isWhitelistedDomain(request) {
        /** @type {?} */
        const requestUrl = new URLParse(request.url);
        return (requestUrl.host === null ||
            this.whitelistedDomains.findIndex((/**
             * @param {?} domain
             * @return {?}
             */
            domain => typeof domain === 'string'
                ? domain === requestUrl.host
                : domain instanceof RegExp
                    ? domain.test(requestUrl.host)
                    : false)) > -1);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    isBlacklistedRoute(request) {
        /** @type {?} */
        const url = request.url;
        return (this.blacklistedRoutes.findIndex((/**
         * @param {?} route
         * @return {?}
         */
        route => typeof route === 'string'
            ? route === url
            : route instanceof RegExp
                ? route.test(url)
                : false)) > -1);
    }
    /**
     * @param {?} token
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    handleInterception(token, request, next) {
        /** @type {?} */
        let tokenIsExpired = false;
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
                setHeaders: {
                    [this.headerName]: `${this.authScheme}${token}`
                }
            });
        }
        return next.handle(request);
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        /** @type {?} */
        const token = this.tokenGetter ? this.tokenGetter() : null;
        return this.handleInterception(token, request, next);
    }
}
JwtInterceptor.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
JwtInterceptor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] },
    { type: JwtHelperService }
];
/** @nocollapse */ JwtInterceptor.ngInjectableDef = defineInjectable({ factory: function JwtInterceptor_Factory() { return new JwtInterceptor(inject(JWT_OPTIONS), inject(JwtHelperService)); }, token: JwtInterceptor, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthService {
    /**
     * @param {?} _http
     * @param {?} _config
     */
    constructor(_http, _config) {
        this._http = _http;
        this._config = _config;
    }
    /**
     * @param {?} credentials
     * @return {?}
     */
    login(credentials) {
        /** @type {?} */
        const url = this._config.loginUrl;
        return this._http.post(url, credentials);
    }
    /**
     * @return {?}
     */
    logout() {
        /** @type {?} */
        const url = this._config.logoutUrl;
        return this._http.post(url, {});
    }
    /**
     * @param {?} refreshToken
     * @return {?}
     */
    refreshToken(refreshToken) {
        /** @type {?} */
        const url = this._config.refreshTokenUrl;
        return this._http.post(url, { refresh_token: refreshToken });
    }
    /**
     * @return {?}
     */
    getCurrentUser() {
        /** @type {?} */
        const url = this._config.meUrl;
        return this._http.get(url);
    }
}
AuthService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] }] }
];
/** @nocollapse */ AuthService.ngInjectableDef = defineInjectable({ factory: function AuthService_Factory() { return new AuthService(inject(HttpClient), inject(AUTH_OPTIONS)); }, token: AuthService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthGuard {
    /**
     * @param {?} store
     */
    constructor(store) {
        this.store = store;
    }
    /**
     * @return {?}
     */
    canActivate() {
        return this._guard();
    }
    /**
     * @param {?} _cr
     * @param {?} _state
     * @return {?}
     */
    canActivateChild(_cr, _state) {
        return this._guard();
    }
    /**
     * @private
     * @return {?}
     */
    _guard() {
        return this.store.pipe(select(getInit$1), filter((/**
         * @param {?} init
         * @return {?}
         */
        init => init)), switchMap((/**
         * @return {?}
         */
        () => this.store.pipe(select(getLoggedIn)))), map((/**
         * @param {?} authed
         * @return {?}
         */
        authed => {
            if (!authed) {
                this.store.dispatch(new LoginRedirect());
                return false;
            }
            return true;
        })), take(1));
    }
}
AuthGuard.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
AuthGuard.ctorParameters = () => [
    { type: Store }
];
/** @nocollapse */ AuthGuard.ngInjectableDef = defineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(inject(Store)); }, token: AuthGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @abstract
 */
class AuthUserInteractionsService {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class LoginComponent {
    /**
     * @param {?} fb
     * @param {?} store
     * @param {?} _cdr
     */
    constructor(fb, store, _cdr) {
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
        () => this.loginForm.valid)));
        this._loginSub = this._loginEvt.subscribe((/**
         * @return {?}
         */
        () => {
            store.dispatch(new Login({ credentials: this.loginForm.value }));
        }));
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._disabled = forceBooleanProp(disabled);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    login() {
        this._loginEvt.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._loginSub.unsubscribe();
        this._loginEvt.complete();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthEffects {
    /**
     * @param {?} actions$
     * @param {?} authService
     * @param {?} jwtHelperService
     * @param {?} userInteractionsService
     * @param {?} router
     * @param {?} ts
     * @param {?} config
     */
    constructor(actions$, authService, jwtHelperService, userInteractionsService, router, ts, config) {
        this.actions$ = actions$;
        this.authService = authService;
        this.jwtHelperService = jwtHelperService;
        this.userInteractionsService = userInteractionsService;
        this.router = router;
        this.ts = ts;
        this.config = config;
        this.initUser$ = this.actions$.pipe(ofType(AuthActionTypes.InitUser), exhaustMap((/**
         * @return {?}
         */
        () => this.authService.getCurrentUser().pipe(catchError((/**
         * @param {?} _
         * @return {?}
         */
        _ => of(null)))))), map((/**
         * @param {?} user
         * @return {?}
         */
        (user) => new InitUserComplete({ user }))));
        this.initUserComplete$ = this.actions$.pipe(ofType(AuthActionTypes.InitUserComplete), map((/**
         * @return {?}
         */
        () => new InitComplete())));
        this.login$ = this.actions$.pipe(ofType(LoginPageActionTypes.Login), map((/**
         * @param {?} action
         * @return {?}
         */
        action => action.payload.credentials)), exhaustMap((/**
         * @param {?} auth
         * @return {?}
         */
        (auth) => this.authService.login(auth).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => new LoginSuccess(res))), catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            /** @type {?} */
            const errors = [];
            if (err.status === 0 || !err.error.message) {
                errors.push('Connection problem. Please try again');
            }
            else {
                errors.push(err.error.message);
            }
            return zip(...errors.map((/**
             * @param {?} e
             * @return {?}
             */
            e => (/** @type {?} */ (this.ts.get(e))))))
                .pipe(map((/**
             * @param {?} error
             * @return {?}
             */
            error => new LoginFailure({ error }))));
        }))))));
        this.loginSuccess$ = this.actions$.pipe(ofType(AuthApiActionTypes.LoginSuccess), tap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            /** @type {?} */
            const payload = (/** @type {?} */ (action.payload));
            /** @type {?} */
            const tokenKey = this.config.tokenKey || 'access_token';
            /** @type {?} */
            const refreshTokenKey = this.config.refreshTokenKey || 'refresh_token';
            this.jwtHelperService.tokenSetter(payload[tokenKey]);
            this.jwtHelperService.refreshTokenSetter(payload[refreshTokenKey]);
            this.router.navigate(['/']);
        })), map((/**
         * @return {?}
         */
        () => {
            return this._getRefreshTokenAction();
        })));
        this.loginFailure$ = this.actions$.pipe(ofType(AuthApiActionTypes.LoginFailure), tap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            this.userInteractionsService.showLoginError(action.payload.error.join('\n'));
        })));
        this.refreshToken$ = this.actions$.pipe(ofType(AuthApiActionTypes.RefreshToken), delayWhen((/**
         * @param {?} action
         * @return {?}
         */
        (action) => timer(action.payload.refreshDelay))), exhaustMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => this.authService.refreshToken(this.jwtHelperService.refreshTokenGetter() || '').pipe(switchMap((/**
         * @param {?} payload
         * @return {?}
         */
        (payload) => {
            /** @type {?} */
            const res = [];
            /** @type {?} */
            const tokenKey = this.config.tokenKey || 'access_token';
            this.jwtHelperService.tokenSetter(payload[tokenKey]);
            if (action.payload.fromInit) {
                res.push(new InitUser());
            }
            res.push(this._getRefreshTokenAction());
            return res;
        })), catchError((/**
         * @return {?}
         */
        () => of(new InitComplete())))))));
        this.loginRedirect$ = this.actions$.pipe(ofType(AuthApiActionTypes.LoginRedirect, AuthActionTypes.Logout), tap((/**
         * @param {?} _authed
         * @return {?}
         */
        _authed => {
            this.router.navigate(['/login']);
        })));
        this.logoutConfirmation$ = this.actions$.pipe(ofType(AuthActionTypes.LogoutConfirmation), exhaustMap((/**
         * @return {?}
         */
        () => this.userInteractionsService.askLogoutConfirm())), map((/**
         * @param {?} result
         * @return {?}
         */
        result => result
            ? new Logout()
            : new LogoutConfirmationDismiss())));
        this.init$ = defer((/**
         * @return {?}
         */
        () => of(null))).pipe(switchMap((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const res = [];
            /** @type {?} */
            const token = this.jwtHelperService.tokenGetter();
            if (token) {
                try {
                    if (!this.jwtHelperService.isTokenExpired(token)) {
                        /** @type {?} */
                        const decoded = this.jwtHelperService.decodeToken(token);
                        /** @type {?} */
                        const scopes = this.config.disableScopes ? [] : this._getScopesFromToken(decoded);
                        if (this.config.disableScopes || scopes.indexOf('admin') > -1) {
                            res.push(new InitUser());
                            res.push(this._getRefreshTokenAction());
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
    _getRefreshTokenAction(fromInit) {
        /** @type {?} */
        const accessToken = this.jwtHelperService.tokenGetter();
        /** @type {?} */
        const exp = this.jwtHelperService.getTokenExpirationDate(accessToken) || new Date();
        /** @type {?} */
        const refreshDelay = Math.max(0, Math.round((exp.getTime() - new Date().getTime()) * 0.8));
        return new RefreshToken({ refreshDelay, fromInit });
    }
    /**
     * @private
     * @param {?} token
     * @return {?}
     */
    _getScopesFromToken(token) {
        /** @type {?} */
        const scopesPath = this.config.scopesPath || ['scopes'];
        scopesPath.forEach((/**
         * @param {?} p
         * @return {?}
         */
        p => token = token[p]));
        return token;
    }
}
AuthEffects.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthEffects.ctorParameters = () => [
    { type: Actions },
    { type: AuthService },
    { type: JwtHelperService },
    { type: AuthUserInteractionsService },
    { type: Router },
    { type: TranslateService },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] }] }
];
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "initUser$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "initUserComplete$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "login$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "loginSuccess$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], AuthEffects.prototype, "loginFailure$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "refreshToken$", void 0);
__decorate([
    Effect({ dispatch: false }),
    __metadata("design:type", Object)
], AuthEffects.prototype, "loginRedirect$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "logoutConfirmation$", void 0);
__decorate([
    Effect(),
    __metadata("design:type", Object)
], AuthEffects.prototype, "init$", void 0);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AUTH_OPTIONS, AuthGuard, AuthModule, AuthService, AuthUserInteractionsService, JWT_OPTIONS, JwtHelperService, JwtInterceptor, LoginComponent, reducers$1 as reducers, reducers as ɵb, reducer as ɵc, reducer$1 as ɵd, AuthEffects as ɵe };
//# sourceMappingURL=auth.js.map
