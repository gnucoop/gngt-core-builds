(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/store'), require('@angular/core'), require('url-parse'), require('@angular/common/http'), require('@ngrx/effects'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/coercion'), require('@angular/forms'), require('@gngt/core/common'), require('@angular/router'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/auth', ['exports', '@ngrx/store', '@angular/core', 'url-parse', '@angular/common/http', '@ngrx/effects', 'rxjs', 'rxjs/operators', '@angular/cdk/coercion', '@angular/forms', '@gngt/core/common', '@angular/router', '@ngx-translate/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.auth = {}), global.ngrx.store, global.ng.core, global.urlParse, global.ng.common.http, global.ngrx.effects, global.rxjs, global.rxjs.operators, global.ng.cdk.coercion, global.ng.forms, global.ng.core.common, global.ng.router, global.ngx.translate.core));
}(this, (function (exports, i1, i0, URLParse, i1$1, i2, rxjs, operators, coercion, forms, common, router, core) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var URLParse__namespace = /*#__PURE__*/_interopNamespace(URLParse);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var Init = /** @class */ (function () {
        function Init() {
            this.type = "[Auth] Init" /* Init */;
        }
        return Init;
    }());
    var InitUser = /** @class */ (function () {
        function InitUser() {
            this.type = "[Auth] Init user" /* InitUser */;
        }
        return InitUser;
    }());
    var InitUserComplete = /** @class */ (function () {
        function InitUserComplete(payload) {
            this.payload = payload;
            this.type = "[Auth] Init user complete" /* InitUserComplete */;
        }
        return InitUserComplete;
    }());
    var InitComplete = /** @class */ (function () {
        function InitComplete() {
            this.type = "[Auth] Init complete" /* InitComplete */;
        }
        return InitComplete;
    }());
    var Logout = /** @class */ (function () {
        function Logout() {
            this.type = "[Auth] Logout" /* Logout */;
        }
        return Logout;
    }());
    var LogoutConfirmation = /** @class */ (function () {
        function LogoutConfirmation() {
            this.type = "[Auth] Logout Confirmation" /* LogoutConfirmation */;
        }
        return LogoutConfirmation;
    }());
    var LogoutConfirmationDismiss = /** @class */ (function () {
        function LogoutConfirmationDismiss() {
            this.type = "[Auth] Logout Confirmation Dismiss" /* LogoutConfirmationDismiss */;
        }
        return LogoutConfirmationDismiss;
    }());

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var LoginSuccess = /** @class */ (function () {
        function LoginSuccess(payload) {
            this.payload = payload;
            this.type = "[Auth/API] Login Success" /* LoginSuccess */;
        }
        return LoginSuccess;
    }());
    var LoginFailure = /** @class */ (function () {
        function LoginFailure(payload) {
            this.payload = payload;
            this.type = "[Auth/API] Login Failure" /* LoginFailure */;
        }
        return LoginFailure;
    }());
    var LoginRedirect = /** @class */ (function () {
        function LoginRedirect() {
            this.type = "[Auth/API] Login Redirect" /* LoginRedirect */;
        }
        return LoginRedirect;
    }());
    var RefreshToken = /** @class */ (function () {
        function RefreshToken(payload) {
            this.payload = payload;
            this.type = "[Auth/API] Refresh token" /* RefreshToken */;
        }
        return RefreshToken;
    }());

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var initialState$1 = {
        init: false,
        user: null,
        token: null
    };
    function reducer$1(state, action) {
        if (state === void 0) { state = initialState$1; }
        switch (action.type) {
            case "[Auth/API] Login Success" /* LoginSuccess */: {
                return Object.assign(Object.assign({}, state), { user: action.payload.user });
            }
            case "[Auth] Logout" /* Logout */: {
                return Object.assign(Object.assign({}, state), { user: null });
            }
            case "[Auth] Init user complete" /* InitUserComplete */: {
                return Object.assign(Object.assign({}, state), { init: true, user: action.payload.user });
            }
            case "[Auth] Init complete" /* InitComplete */: {
                return Object.assign(Object.assign({}, state), { init: true });
            }
            default: {
                return state;
            }
        }
    }
    var getInit$1 = function (state) { return state.init; };
    var getUser$1 = function (state) { return state.user; };

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var initialState = {
        error: null,
        pending: false,
    };
    function reducer(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case "[Login Page] Login" /* Login */: {
                return Object.assign(Object.assign({}, state), { error: null, pending: true });
            }
            case "[Auth/API] Login Success" /* LoginSuccess */: {
                return Object.assign(Object.assign({}, state), { error: null, pending: false });
            }
            case "[Auth/API] Login Failure" /* LoginFailure */: {
                return Object.assign(Object.assign({}, state), { error: action.payload.error, pending: false });
            }
            default: {
                return state;
            }
        }
    }
    var getError = function (state) { return state.error; };
    var getPending = function (state) { return state.pending; };

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var reducers = {
        status: reducer$1,
        loginPage: reducer,
    };
    var selectAuthState = i1.createFeatureSelector('auth');
    var ɵ0 = function (state) { return state.status; };
    var selectAuthStatusState = i1.createSelector(selectAuthState, ɵ0);
    var getInit = i1.createSelector(selectAuthStatusState, getInit$1);
    var getUser = i1.createSelector(selectAuthStatusState, getUser$1);
    var ɵ1 = function (user) { return user != null; };
    var getLoggedIn = i1.createSelector(getUser, ɵ1);
    var ɵ2 = function (state) { return state.loginPage; };
    var selectLoginPageState = i1.createSelector(selectAuthState, ɵ2);
    var getLoginPageError = i1.createSelector(selectLoginPageState, getError);
    var getLoginPagePending = i1.createSelector(selectLoginPageState, getPending);

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var AUTH_OPTIONS = new i0.InjectionToken('AUTH_OPTIONS', {
        providedIn: 'root',
        factory: function () { return ({ loginUrl: '/login', logoutUrl: '/logout', refreshTokenUrl: '/refresh_token', meUrl: '/me' }); }
    });

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var JWT_OPTIONS = new i0.InjectionToken('JWT_OPTIONS', {
        providedIn: 'root',
        factory: function () { return ({}); },
    });

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var JwtHelperService = /** @class */ (function () {
        function JwtHelperService(config) {
            this.tokenGetter = config && config.tokenGetter ? config.tokenGetter : function () { return null; };
            this.tokenSetter = config && config.tokenSetter ? config.tokenSetter : function () { return null; };
            this.refreshTokenGetter =
                config && config.refreshTokenGetter ? config.refreshTokenGetter : function () { return null; };
            this.refreshTokenSetter =
                config && config.refreshTokenSetter ? config.refreshTokenSetter : function () { return null; };
        }
        JwtHelperService.prototype.urlBase64Decode = function (str) {
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
        JwtHelperService.prototype._b64decode = function (str) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = '';
            str = String(str).replace(/=+$/, '');
            if (str.length % 4 === 1) {
                throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
            }
            for (
            // tslint:disable
            // initialize result and counters
            var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
            // get next character
            (buffer = str.charAt(idx++)); 
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
                ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4) ?
                (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)))) :
                0) {
                // try to find character in table (0-63, not found => -1)
                buffer = chars.indexOf(buffer);
                // tslint:enable
            }
            return output;
        };
        JwtHelperService.prototype._b64DecodeUnicode = function (str) {
            return decodeURIComponent(Array.prototype.map
                .call(this._b64decode(str), function (c) {
                return '%' +
                    ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
                .join(''));
        };
        JwtHelperService.prototype.decodeToken = function (token) {
            if (token === void 0) { token = this.tokenGetter(); }
            if (token === null) {
                return null;
            }
            var parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('The inspected token doesn\'t appear to be a JWT. ' +
                    'Check to make sure it has three parts and see https://jwt.io for more.');
            }
            var decoded = this.urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error('Cannot decode the token.');
            }
            return JSON.parse(decoded);
        };
        JwtHelperService.prototype.getTokenExpirationDate = function (token) {
            if (token === void 0) { token = this.tokenGetter(); }
            var decoded;
            decoded = this.decodeToken(token);
            if (!decoded.hasOwnProperty('exp')) {
                return null;
            }
            var date = new Date(0);
            date.setUTCSeconds(decoded.exp);
            return date;
        };
        JwtHelperService.prototype.isTokenExpired = function (token, offsetSeconds) {
            if (token === void 0) { token = this.tokenGetter(); }
            if (token === null || token === '') {
                return true;
            }
            var date = this.getTokenExpirationDate(token);
            offsetSeconds = offsetSeconds || 0;
            if (date === null) {
                return true;
            }
            return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
        };
        return JwtHelperService;
    }());
    JwtHelperService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function JwtHelperService_Factory() { return new JwtHelperService(i0__namespace.ɵɵinject(JWT_OPTIONS)); }, token: JwtHelperService, providedIn: "root" });
    JwtHelperService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    JwtHelperService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [JWT_OPTIONS,] }] }
    ]; };

    var JwtInterceptor = /** @class */ (function () {
        function JwtInterceptor(config, jwtHelper) {
            this.jwtHelper = jwtHelper;
            this.tokenGetter = config.tokenGetter;
            this.headerName = config.headerName || 'Authorization';
            this.authScheme = config.authScheme || config.authScheme === '' ? config.authScheme : 'Bearer ';
            this.whitelistedDomains = config.whitelistedDomains || [];
            this.blacklistedRoutes = config.blacklistedRoutes || [];
            this.throwNoTokenError = config.throwNoTokenError || false;
            this.skipWhenExpired = config.skipWhenExpired || false;
        }
        JwtInterceptor.prototype.isWhitelistedDomain = function (request) {
            var requestUrl = new URLParse__namespace(request.url);
            return (requestUrl.host === null || this.whitelistedDomains.findIndex(function (domain) {
                if (typeof domain === 'string') {
                    return domain === requestUrl.host;
                }
                return domain instanceof RegExp ? domain.test(requestUrl.host) : false;
            }) > -1);
        };
        JwtInterceptor.prototype.isBlacklistedRoute = function (request) {
            var url = request.url;
            return (this.blacklistedRoutes.findIndex(function (route) {
                if (typeof route === 'string') {
                    return route === url;
                }
                return route instanceof RegExp ? route.test(url) : false;
            }) > -1);
        };
        JwtInterceptor.prototype.handleInterception = function (token, request, next) {
            var _a;
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
            else if (token && this.isWhitelistedDomain(request) && !this.isBlacklistedRoute(request)) {
                request = request.clone({ setHeaders: (_a = {}, _a[this.headerName] = "" + this.authScheme + token, _a) });
            }
            return next.handle(request);
        };
        JwtInterceptor.prototype.intercept = function (request, next) {
            var token = this.tokenGetter ? this.tokenGetter() : null;
            return this.handleInterception(token, request, next);
        };
        return JwtInterceptor;
    }());
    JwtInterceptor.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function JwtInterceptor_Factory() { return new JwtInterceptor(i0__namespace.ɵɵinject(JWT_OPTIONS), i0__namespace.ɵɵinject(JwtHelperService)); }, token: JwtInterceptor, providedIn: "root" });
    JwtInterceptor.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    JwtInterceptor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [JWT_OPTIONS,] }] },
        { type: JwtHelperService }
    ]; };

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var AuthService = /** @class */ (function () {
        function AuthService(_http, _config) {
            this._http = _http;
            this._config = _config;
        }
        AuthService.prototype.login = function (credentials) {
            var url = this._config.loginUrl;
            return this._http.post(url, credentials);
        };
        AuthService.prototype.logout = function () {
            var url = this._config.logoutUrl;
            return this._http.post(url, {});
        };
        AuthService.prototype.refreshToken = function (refreshToken) {
            var url = this._config.refreshTokenUrl;
            return this._http.post(url, { refresh_token: refreshToken });
        };
        AuthService.prototype.getCurrentUser = function () {
            var url = this._config.meUrl;
            return this._http.get(url);
        };
        AuthService.prototype.getLoggedInUser = function () {
            return this._config.loggedInUserGetter ? this._config.loggedInUserGetter() : null;
        };
        AuthService.prototype.getMe = function () {
            return this._config.meGetter ? this._config.meGetter() : null;
        };
        return AuthService;
    }());
    AuthService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0__namespace.ɵɵinject(i1__namespace.HttpClient), i0__namespace.ɵɵinject(AUTH_OPTIONS)); }, token: AuthService, providedIn: "root" });
    AuthService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    AuthService.ctorParameters = function () { return [
        { type: i1$1.HttpClient },
        { type: undefined, decorators: [{ type: i0.Inject, args: [AUTH_OPTIONS,] }] }
    ]; };

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var AuthHelper = /** @class */ (function () {
        function AuthHelper(_store, _actions) {
            this._store = _store;
            this._actions = _actions;
        }
        AuthHelper.prototype.logout = function (requestConfirmation) {
            if (requestConfirmation === void 0) { requestConfirmation = true; }
            if (!requestConfirmation) {
                this._store.dispatch(new Logout());
                return rxjs.of(true);
            }
            this._store.dispatch(new LogoutConfirmation());
            return this._actions.pipe(i2.ofType("[Auth] Logout" /* Logout */, "[Auth] Logout Confirmation Dismiss" /* LogoutConfirmationDismiss */), operators.map(function (action) { return action.type === "[Auth] Logout"; } /* Logout */));
        };
        return AuthHelper;
    }());
    AuthHelper.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AuthHelper_Factory() { return new AuthHelper(i0__namespace.ɵɵinject(i1__namespace$1.Store), i0__namespace.ɵɵinject(i2__namespace.Actions)); }, token: AuthHelper, providedIn: "root" });
    AuthHelper.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    AuthHelper.ctorParameters = function () { return [
        { type: i1.Store },
        { type: i2.Actions }
    ]; };

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var AuthGuard = /** @class */ (function () {
        function AuthGuard(_store) {
            this._store = _store;
        }
        AuthGuard.prototype.canActivate = function () {
            return this._guard();
        };
        AuthGuard.prototype.canActivateChild = function (_cr, _state) {
            return this._guard();
        };
        AuthGuard.prototype._guard = function () {
            var _this = this;
            return this._store.pipe(i1.select(getInit), operators.filter(function (init) { return init; }), operators.concatMap(function () { return _this._store.pipe(i1.select(getLoggedIn)); }), operators.map(function (authed) {
                if (!authed) {
                    _this._store.dispatch(new LoginRedirect());
                    return false;
                }
                return true;
            }), operators.take(1));
        };
        return AuthGuard;
    }());
    AuthGuard.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0__namespace.ɵɵinject(i1__namespace$1.Store)); }, token: AuthGuard, providedIn: "root" });
    AuthGuard.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    AuthGuard.ctorParameters = function () { return [
        { type: i1.Store }
    ]; };

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var AuthUserInteractionsService = /** @class */ (function () {
        function AuthUserInteractionsService() {
        }
        return AuthUserInteractionsService;
    }());

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var Login = /** @class */ (function () {
        function Login(payload) {
            this.payload = payload;
            this.type = "[Login Page] Login" /* Login */;
        }
        return Login;
    }());

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var LoginUsernameDirective = /** @class */ (function () {
        function LoginUsernameDirective() {
        }
        return LoginUsernameDirective;
    }());
    LoginUsernameDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[gngtLoginUsername]' },] }
    ];
    var LoginPasswordDirective = /** @class */ (function () {
        function LoginPasswordDirective() {
        }
        return LoginPasswordDirective;
    }());
    LoginPasswordDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[gngtLoginPassword]' },] }
    ];
    var LoginActionDirective = /** @class */ (function () {
        function LoginActionDirective() {
        }
        return LoginActionDirective;
    }());
    LoginActionDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[gngtLoginAction]' },] }
    ];
    var LoginComponent = /** @class */ (function () {
        function LoginComponent(fb, store, _cdr) {
            var _this = this;
            this._cdr = _cdr;
            this._showLabels = true;
            this._loginEvt = new i0.EventEmitter();
            this._loginSub = rxjs.Subscription.EMPTY;
            this.loginForm = fb.group({ username: [null, [forms.Validators.required]], password: [null, [forms.Validators.required]] });
            this.valid = this.loginForm.valueChanges.pipe(operators.map(function () { return _this.loginForm.valid; }));
            this._loginSub = this._loginEvt.subscribe(function () {
                store.dispatch(new Login({ credentials: _this.loginForm.value }));
            });
        }
        Object.defineProperty(LoginComponent.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = common.forceBooleanProp(disabled);
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LoginComponent.prototype, "usernamePlaceholder", {
            get: function () {
                return this._usernamePlaceholder;
            },
            set: function (usernamePlaceholder) {
                this._usernamePlaceholder = usernamePlaceholder;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LoginComponent.prototype, "passwordPlaceholder", {
            get: function () {
                return this._passwordPlaceholder;
            },
            set: function (passwordPlaceholder) {
                this._passwordPlaceholder = passwordPlaceholder;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LoginComponent.prototype, "showLabels", {
            get: function () {
                return this._showLabels;
            },
            set: function (showLabels) {
                this._showLabels = coercion.coerceBooleanProperty(showLabels);
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        LoginComponent.prototype.login = function () {
            this._loginEvt.next();
        };
        LoginComponent.prototype.ngOnDestroy = function () {
            this._loginSub.unsubscribe();
            this._loginEvt.complete();
        };
        return LoginComponent;
    }());
    LoginComponent.decorators = [
        { type: i0.Directive }
    ];
    LoginComponent.ctorParameters = function () { return [
        { type: forms.FormBuilder },
        { type: i1.Store },
        { type: i0.ChangeDetectorRef }
    ]; };
    LoginComponent.propDecorators = {
        disabled: [{ type: i0.Input }],
        usernamePlaceholder: [{ type: i0.Input }],
        passwordPlaceholder: [{ type: i0.Input }],
        showLabels: [{ type: i0.Input }]
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

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
            this.initUser$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth] Init user" /* InitUser */), operators.exhaustMap(function () { return _this._authService.getCurrentUser().pipe(operators.catchError(function (_) {
                return rxjs.of(_this._config.meGetter != null ? _this._config.meGetter() : null);
            })); }), operators.map(function (u) {
                var user = u;
                if (_this._config.meSetter != null) {
                    _this._config.meSetter(user);
                }
                return new InitUserComplete({ user: user });
            })); });
            this.initUserComplete$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth] Init user complete" /* InitUserComplete */), operators.map(function () { return new InitComplete(); })); });
            this.login$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Login Page] Login" /* Login */), operators.map(function (action) { return action.payload.credentials; }), operators.exhaustMap(function (auth) { return _this._authService.login(auth).pipe(operators.map(function (res) { return new LoginSuccess(res); }), operators.catchError(function (err) {
                var errors = [];
                if (err.status === 0 || !err.error.message) {
                    errors.push('Connection problem. Please try again');
                }
                else {
                    errors.push(err.error.message);
                }
                return rxjs.zip.apply(void 0, __spreadArray([], __read(errors.map(function (e) { return _this._ts.get(e); })))).pipe(operators.map(function (error) { return new LoginFailure({ error: error }); }));
            })); })); });
            this.loginSuccess$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth/API] Login Success" /* LoginSuccess */), operators.tap(function (action) {
                var payload = action.payload;
                var tokenKey = _this._config.tokenKey || 'access_token';
                var refreshTokenKey = _this._config.refreshTokenKey || 'refresh_token';
                _this._jwtHelperService.tokenSetter(payload[tokenKey]);
                _this._jwtHelperService.refreshTokenSetter(payload[refreshTokenKey]);
                if (_this._config.loggedInUserSetter) {
                    _this._config.loggedInUserSetter(payload.user_id);
                }
                if (_this._config.meSetter != null) {
                    _this._config.meSetter(payload.user);
                }
                _this._router.navigate(['/']);
            }), operators.mergeMap(function (action) { return [_this._getRefreshTokenAction(),
                new InitUserComplete({ user: action.payload.user }),
            ]; })); });
            this.loginFailure$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth/API] Login Failure" /* LoginFailure */), operators.tap(function (action) {
                _this._userInteractionsService.showLoginError(action.payload.error.join('\n'));
            })); }, { dispatch: false });
            this.refreshToken$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth/API] Refresh token" /* RefreshToken */), operators.delayWhen(function (action) { return rxjs.timer(action.payload.refreshDelay); }), operators.exhaustMap(function (action) { return _this._authService
                .refreshToken(_this._jwtHelperService.refreshTokenGetter() || '')
                .pipe(operators.switchMap(function (payload) {
                var res = [];
                var tokenKey = _this._config.tokenKey || 'access_token';
                _this._jwtHelperService.tokenSetter(payload[tokenKey]);
                if (action.payload.fromInit) {
                    res.push(new InitUser());
                }
                res.push(_this._getRefreshTokenAction());
                return res;
            }), operators.catchError(function (err) {
                if (err.status === 0) {
                    return rxjs.of(new InitUser());
                }
                return rxjs.of(new InitComplete());
            })); })); });
            this.loginRedirect$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth/API] Login Redirect" /* LoginRedirect */, "[Auth] Logout" /* Logout */), operators.tap(function (_authed) {
                _this._router.navigate(['/login']);
            })); }, { dispatch: false });
            this.logoutConfirmation$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth] Logout Confirmation" /* LogoutConfirmation */), operators.exhaustMap(function () { return _this._userInteractionsService.askLogoutConfirm(); }), operators.map(function (result) { return result ? new Logout() : new LogoutConfirmationDismiss(); })); });
            this.logout$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth] Logout" /* Logout */), operators.tap(function () {
                _this._jwtHelperService.tokenSetter(null);
                _this._jwtHelperService.refreshTokenSetter(null);
                if (_this._config.loggedInUserSetter != null) {
                    _this._config.loggedInUserSetter(null);
                }
                if (_this._config.meSetter != null) {
                    _this._config.meSetter(null);
                }
            })); }, { dispatch: false });
            this.init$ = i2.createEffect(function () { return _this._actions$.pipe(i2.ofType("[Auth] Init" /* Init */), operators.switchMap(function () {
                var res = [];
                var token = _this._jwtHelperService.tokenGetter();
                if (token) {
                    try {
                        if (!_this._jwtHelperService.isTokenExpired(token)) {
                            var decoded = _this._jwtHelperService.decodeToken(token);
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
            })); });
        }
        AuthEffects.prototype.ngrxOnInitEffects = function () {
            return new Init();
        };
        AuthEffects.prototype._getRefreshTokenAction = function (fromInit) {
            var accessToken = this._jwtHelperService.tokenGetter();
            var exp = this._jwtHelperService.getTokenExpirationDate(accessToken) || new Date();
            var refreshDelay = Math.max(0, Math.round((exp.getTime() - new Date().getTime()) * 0.8));
            return new RefreshToken({ refreshDelay: refreshDelay, fromInit: fromInit });
        };
        AuthEffects.prototype._getScopesFromToken = function (token) {
            var scopesPath = this._config.scopesPath || ['scopes'];
            scopesPath.forEach(function (p) { return token = token[p]; });
            return token;
        };
        return AuthEffects;
    }());
    AuthEffects.decorators = [
        { type: i0.Injectable }
    ];
    AuthEffects.ctorParameters = function () { return [
        { type: i2.Actions },
        { type: AuthService },
        { type: JwtHelperService },
        { type: AuthUserInteractionsService },
        { type: router.Router },
        { type: core.TranslateService },
        { type: undefined, decorators: [{ type: i0.Inject, args: [AUTH_OPTIONS,] }] }
    ]; };

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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
    var AuthModule = /** @class */ (function () {
        function AuthModule() {
        }
        return AuthModule;
    }());
    AuthModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        i2.EffectsModule.forFeature([AuthEffects]),
                        i1.StoreModule.forFeature('auth', reducers),
                    ],
                    declarations: [
                        LoginActionDirective,
                        LoginPasswordDirective,
                        LoginUsernameDirective,
                    ],
                    exports: [
                        LoginActionDirective,
                        LoginPasswordDirective,
                        LoginUsernameDirective,
                    ],
                    providers: [AuthEffects, AuthGuard, AuthHelper, AuthService, JwtHelperService, JwtInterceptor]
                },] }
    ];

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AUTH_OPTIONS = AUTH_OPTIONS;
    exports.AuthGuard = AuthGuard;
    exports.AuthHelper = AuthHelper;
    exports.AuthModule = AuthModule;
    exports.AuthService = AuthService;
    exports.AuthUserInteractionsService = AuthUserInteractionsService;
    exports.Init = Init;
    exports.InitComplete = InitComplete;
    exports.InitUser = InitUser;
    exports.InitUserComplete = InitUserComplete;
    exports.JWT_OPTIONS = JWT_OPTIONS;
    exports.JwtHelperService = JwtHelperService;
    exports.JwtInterceptor = JwtInterceptor;
    exports.LoginActionDirective = LoginActionDirective;
    exports.LoginComponent = LoginComponent;
    exports.LoginFailure = LoginFailure;
    exports.LoginPasswordDirective = LoginPasswordDirective;
    exports.LoginRedirect = LoginRedirect;
    exports.LoginSuccess = LoginSuccess;
    exports.LoginUsernameDirective = LoginUsernameDirective;
    exports.Logout = Logout;
    exports.LogoutConfirmation = LogoutConfirmation;
    exports.LogoutConfirmationDismiss = LogoutConfirmationDismiss;
    exports.RefreshToken = RefreshToken;
    exports.getInit = getInit;
    exports.getLoggedIn = getLoggedIn;
    exports.getLoginPageError = getLoginPageError;
    exports.getLoginPagePending = getLoginPagePending;
    exports.getUser = getUser;
    exports.reducers = reducers;
    exports.selectAuthState = selectAuthState;
    exports.selectAuthStatusState = selectAuthStatusState;
    exports.selectLoginPageState = selectLoginPageState;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;
    exports.ɵgc_gngt_src_core_auth_auth_b = reducer$1;
    exports.ɵgc_gngt_src_core_auth_auth_c = getInit$1;
    exports.ɵgc_gngt_src_core_auth_auth_d = getUser$1;
    exports.ɵgc_gngt_src_core_auth_auth_e = reducer;
    exports.ɵgc_gngt_src_core_auth_auth_f = getError;
    exports.ɵgc_gngt_src_core_auth_auth_g = getPending;
    exports.ɵgc_gngt_src_core_auth_auth_h = AuthEffects;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-auth.umd.js.map
