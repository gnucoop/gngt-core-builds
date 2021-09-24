import * as i1$1 from '@ngrx/store';
import { createFeatureSelector, createSelector, Store, select, StoreModule } from '@ngrx/store';
import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Directive, EventEmitter, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import * as URLParse from 'url-parse';
import * as i1 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as i2 from '@ngrx/effects';
import { ofType, Actions, createEffect, EffectsModule } from '@ngrx/effects';
import { of, Subscription, zip, timer } from 'rxjs';
import { map, filter, concatMap, take, exhaustMap, catchError, tap, mergeMap, delayWhen, switchMap } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Validators, FormBuilder } from '@angular/forms';
import { forceBooleanProp } from '@gngt/core/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
class Init {
    constructor() {
        this.type = "[Auth] Init" /* Init */;
    }
}
class InitUser {
    constructor() {
        this.type = "[Auth] Init user" /* InitUser */;
    }
}
class InitUserComplete {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth] Init user complete" /* InitUserComplete */;
    }
}
class InitComplete {
    constructor() {
        this.type = "[Auth] Init complete" /* InitComplete */;
    }
}
class Logout {
    constructor() {
        this.type = "[Auth] Logout" /* Logout */;
    }
}
class LogoutConfirmation {
    constructor() {
        this.type = "[Auth] Logout Confirmation" /* LogoutConfirmation */;
    }
}
class LogoutConfirmationDismiss {
    constructor() {
        this.type = "[Auth] Logout Confirmation Dismiss" /* LogoutConfirmationDismiss */;
    }
}

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
class LoginSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth/API] Login Success" /* LoginSuccess */;
    }
}
class LoginFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth/API] Login Failure" /* LoginFailure */;
    }
}
class LoginRedirect {
    constructor() {
        this.type = "[Auth/API] Login Redirect" /* LoginRedirect */;
    }
}
class RefreshToken {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth/API] Refresh token" /* RefreshToken */;
    }
}

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
const initialState$1 = {
    init: false,
    user: null,
    token: null
};
function reducer$1(state = initialState$1, action) {
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
const getInit$1 = (state) => state.init;
const getUser$1 = (state) => state.user;

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
const initialState = {
    error: null,
    pending: false,
};
function reducer(state = initialState, action) {
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
const getError = (state) => state.error;
const getPending = (state) => state.pending;

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
const reducers = {
    status: reducer$1,
    loginPage: reducer,
};
const selectAuthState = createFeatureSelector('auth');
const ɵ0 = (state) => state.status;
const selectAuthStatusState = createSelector(selectAuthState, ɵ0);
const getInit = createSelector(selectAuthStatusState, getInit$1);
const getUser = createSelector(selectAuthStatusState, getUser$1);
const ɵ1 = user => user != null;
const getLoggedIn = createSelector(getUser, ɵ1);
const ɵ2 = (state) => state.loginPage;
const selectLoginPageState = createSelector(selectAuthState, ɵ2);
const getLoginPageError = createSelector(selectLoginPageState, getError);
const getLoginPagePending = createSelector(selectLoginPageState, getPending);

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
const AUTH_OPTIONS = new InjectionToken('AUTH_OPTIONS', {
    providedIn: 'root',
    factory: () => ({ loginUrl: '/login', logoutUrl: '/logout', refreshTokenUrl: '/refresh_token', meUrl: '/me' })
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
const JWT_OPTIONS = new InjectionToken('JWT_OPTIONS', {
    providedIn: 'root',
    factory: () => ({}),
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
class JwtHelperService {
    constructor(config) {
        this.tokenGetter = config && config.tokenGetter ? config.tokenGetter : () => null;
        this.tokenSetter = config && config.tokenSetter ? config.tokenSetter : () => null;
        this.refreshTokenGetter =
            config && config.refreshTokenGetter ? config.refreshTokenGetter : () => null;
        this.refreshTokenSetter =
            config && config.refreshTokenSetter ? config.refreshTokenSetter : () => null;
    }
    urlBase64Decode(str) {
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
        return this._b64DecodeUnicode(output);
    }
    // credits for decoder goes to https://github.com/atk
    _b64decode(str) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
        }
        for (
        // tslint:disable
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0; 
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
    }
    _b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(this._b64decode(str), (c) => {
            return '%' +
                ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    }
    decodeToken(token = this.tokenGetter()) {
        if (token === null) {
            return null;
        }
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('The inspected token doesn\'t appear to be a JWT. ' +
                'Check to make sure it has three parts and see https://jwt.io for more.');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }
        return JSON.parse(decoded);
    }
    getTokenExpirationDate(token = this.tokenGetter()) {
        let decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    isTokenExpired(token = this.tokenGetter(), offsetSeconds) {
        if (token === null || token === '') {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return true;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
}
JwtHelperService.ɵprov = i0.ɵɵdefineInjectable({ factory: function JwtHelperService_Factory() { return new JwtHelperService(i0.ɵɵinject(JWT_OPTIONS)); }, token: JwtHelperService, providedIn: "root" });
JwtHelperService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
JwtHelperService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] }
];

class JwtInterceptor {
    constructor(config, jwtHelper) {
        this.jwtHelper = jwtHelper;
        this.tokenGetter = config.tokenGetter;
        this.headerName = config.headerName || 'Authorization';
        this.authScheme = config.authScheme || config.authScheme === '' ? config.authScheme : 'Bearer ';
        this.whitelistedDomains = config.whitelistedDomains || [];
        this.blacklistedRoutes = config.blacklistedRoutes || [];
        this.throwNoTokenError = config.throwNoTokenError || false;
        this.skipWhenExpired = config.skipWhenExpired || false;
    }
    isWhitelistedDomain(request) {
        const requestUrl = new URLParse(request.url);
        return (requestUrl.host === null || this.whitelistedDomains.findIndex(domain => {
            if (typeof domain === 'string') {
                return domain === requestUrl.host;
            }
            return domain instanceof RegExp ? domain.test(requestUrl.host) : false;
        }) > -1);
    }
    isBlacklistedRoute(request) {
        const url = request.url;
        return (this.blacklistedRoutes.findIndex(route => {
            if (typeof route === 'string') {
                return route === url;
            }
            return route instanceof RegExp ? route.test(url) : false;
        }) > -1);
    }
    handleInterception(token, request, next) {
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
        else if (token && this.isWhitelistedDomain(request) && !this.isBlacklistedRoute(request)) {
            request = request.clone({ setHeaders: { [this.headerName]: `${this.authScheme}${token}` } });
        }
        return next.handle(request);
    }
    intercept(request, next) {
        const token = this.tokenGetter ? this.tokenGetter() : null;
        return this.handleInterception(token, request, next);
    }
}
JwtInterceptor.ɵprov = i0.ɵɵdefineInjectable({ factory: function JwtInterceptor_Factory() { return new JwtInterceptor(i0.ɵɵinject(JWT_OPTIONS), i0.ɵɵinject(JwtHelperService)); }, token: JwtInterceptor, providedIn: "root" });
JwtInterceptor.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
JwtInterceptor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] },
    { type: JwtHelperService }
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
class AuthService {
    constructor(_http, _config) {
        this._http = _http;
        this._config = _config;
    }
    login(credentials) {
        const url = this._config.loginUrl;
        return this._http.post(url, credentials);
    }
    logout() {
        const url = this._config.logoutUrl;
        return this._http.post(url, {});
    }
    refreshToken(refreshToken) {
        const url = this._config.refreshTokenUrl;
        return this._http.post(url, { refresh_token: refreshToken });
    }
    getCurrentUser() {
        const url = this._config.meUrl;
        return this._http.get(url);
    }
    getLoggedInUser() {
        return this._config.loggedInUserGetter ? this._config.loggedInUserGetter() : null;
    }
    getMe() {
        return this._config.meGetter ? this._config.meGetter() : null;
    }
}
AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(AUTH_OPTIONS)); }, token: AuthService, providedIn: "root" });
AuthService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AuthService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] }] }
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
class AuthHelper {
    constructor(_store, _actions) {
        this._store = _store;
        this._actions = _actions;
    }
    logout(requestConfirmation = true) {
        if (!requestConfirmation) {
            this._store.dispatch(new Logout());
            return of(true);
        }
        this._store.dispatch(new LogoutConfirmation());
        return this._actions.pipe(ofType("[Auth] Logout" /* Logout */, "[Auth] Logout Confirmation Dismiss" /* LogoutConfirmationDismiss */), map(action => action.type === "[Auth] Logout" /* Logout */));
    }
}
AuthHelper.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthHelper_Factory() { return new AuthHelper(i0.ɵɵinject(i1$1.Store), i0.ɵɵinject(i2.Actions)); }, token: AuthHelper, providedIn: "root" });
AuthHelper.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AuthHelper.ctorParameters = () => [
    { type: Store },
    { type: Actions }
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
class AuthGuard {
    constructor(_store) {
        this._store = _store;
    }
    canActivate() {
        return this._guard();
    }
    canActivateChild(_cr, _state) {
        return this._guard();
    }
    _guard() {
        return this._store.pipe(select(getInit), filter(init => init), concatMap(() => this._store.pipe(select(getLoggedIn))), map(authed => {
            if (!authed) {
                this._store.dispatch(new LoginRedirect());
                return false;
            }
            return true;
        }), take(1));
    }
}
AuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.ɵɵinject(i1$1.Store)); }, token: AuthGuard, providedIn: "root" });
AuthGuard.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AuthGuard.ctorParameters = () => [
    { type: Store }
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
class AuthUserInteractionsService {
}

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
class Login {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Login Page] Login" /* Login */;
    }
}

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
class LoginUsernameDirective {
}
LoginUsernameDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtLoginUsername]' },] }
];
class LoginPasswordDirective {
}
LoginPasswordDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtLoginPassword]' },] }
];
class LoginActionDirective {
}
LoginActionDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtLoginAction]' },] }
];
class LoginComponent {
    constructor(fb, store, _cdr) {
        this._cdr = _cdr;
        this._showLabels = true;
        this._loginEvt = new EventEmitter();
        this._loginSub = Subscription.EMPTY;
        this.loginForm = fb.group({ username: [null, [Validators.required]], password: [null, [Validators.required]] });
        this.valid = this.loginForm.valueChanges.pipe(map(() => this.loginForm.valid));
        this._loginSub = this._loginEvt.subscribe(() => {
            store.dispatch(new Login({ credentials: this.loginForm.value }));
        });
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = forceBooleanProp(disabled);
        this._cdr.markForCheck();
    }
    get usernamePlaceholder() {
        return this._usernamePlaceholder;
    }
    set usernamePlaceholder(usernamePlaceholder) {
        this._usernamePlaceholder = usernamePlaceholder;
        this._cdr.markForCheck();
    }
    get passwordPlaceholder() {
        return this._passwordPlaceholder;
    }
    set passwordPlaceholder(passwordPlaceholder) {
        this._passwordPlaceholder = passwordPlaceholder;
        this._cdr.markForCheck();
    }
    get showLabels() {
        return this._showLabels;
    }
    set showLabels(showLabels) {
        this._showLabels = coerceBooleanProperty(showLabels);
        this._cdr.markForCheck();
    }
    login() {
        this._loginEvt.next();
    }
    ngOnDestroy() {
        this._loginSub.unsubscribe();
        this._loginEvt.complete();
    }
}
LoginComponent.decorators = [
    { type: Directive }
];
LoginComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: Store },
    { type: ChangeDetectorRef }
];
LoginComponent.propDecorators = {
    disabled: [{ type: Input }],
    usernamePlaceholder: [{ type: Input }],
    passwordPlaceholder: [{ type: Input }],
    showLabels: [{ type: Input }]
};

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
class AuthEffects {
    constructor(_actions$, _authService, _jwtHelperService, _userInteractionsService, _router, _ts, _config) {
        this._actions$ = _actions$;
        this._authService = _authService;
        this._jwtHelperService = _jwtHelperService;
        this._userInteractionsService = _userInteractionsService;
        this._router = _router;
        this._ts = _ts;
        this._config = _config;
        this.initUser$ = createEffect(() => this._actions$.pipe(ofType("[Auth] Init user" /* InitUser */), exhaustMap(() => this._authService.getCurrentUser().pipe(catchError(_ => {
            return of(this._config.meGetter != null ? this._config.meGetter() : null);
        }))), map((u) => {
            const user = u;
            if (this._config.meSetter != null) {
                this._config.meSetter(user);
            }
            return new InitUserComplete({ user });
        })));
        this.initUserComplete$ = createEffect(() => this._actions$.pipe(ofType("[Auth] Init user complete" /* InitUserComplete */), map(() => new InitComplete())));
        this.login$ = createEffect(() => this._actions$.pipe(ofType("[Login Page] Login" /* Login */), map(action => action.payload.credentials), exhaustMap((auth) => this._authService.login(auth).pipe(map((res) => new LoginSuccess(res)), catchError((err) => {
            const errors = [];
            if (err.status === 0 || !err.error.message) {
                errors.push('Connection problem. Please try again');
            }
            else {
                errors.push(err.error.message);
            }
            return zip(...errors.map(e => this._ts.get(e)))
                .pipe(map(error => new LoginFailure({ error })));
        })))));
        this.loginSuccess$ = createEffect(() => this._actions$.pipe(ofType("[Auth/API] Login Success" /* LoginSuccess */), tap((action) => {
            const payload = action.payload;
            const tokenKey = this._config.tokenKey || 'access_token';
            const refreshTokenKey = this._config.refreshTokenKey || 'refresh_token';
            this._jwtHelperService.tokenSetter(payload[tokenKey]);
            this._jwtHelperService.refreshTokenSetter(payload[refreshTokenKey]);
            if (this._config.loggedInUserSetter) {
                this._config.loggedInUserSetter(payload.user_id);
            }
            if (this._config.meSetter != null) {
                this._config.meSetter(payload.user);
            }
            this._router.navigate(['/']);
        }), mergeMap((action) => [this._getRefreshTokenAction(),
            new InitUserComplete({ user: action.payload.user }),
        ])));
        this.loginFailure$ = createEffect(() => this._actions$.pipe(ofType("[Auth/API] Login Failure" /* LoginFailure */), tap((action) => {
            this._userInteractionsService.showLoginError(action.payload.error.join('\n'));
        })), { dispatch: false });
        this.refreshToken$ = createEffect(() => this._actions$.pipe(ofType("[Auth/API] Refresh token" /* RefreshToken */), delayWhen((action) => timer(action.payload.refreshDelay)), exhaustMap((action) => this._authService
            .refreshToken(this._jwtHelperService.refreshTokenGetter() || '')
            .pipe(switchMap((payload) => {
            const res = [];
            const tokenKey = this._config.tokenKey || 'access_token';
            this._jwtHelperService.tokenSetter(payload[tokenKey]);
            if (action.payload.fromInit) {
                res.push(new InitUser());
            }
            res.push(this._getRefreshTokenAction());
            return res;
        }), catchError(err => {
            if (err.status === 0) {
                return of(new InitUser());
            }
            return of(new InitComplete());
        })))));
        this.loginRedirect$ = createEffect(() => this._actions$.pipe(ofType("[Auth/API] Login Redirect" /* LoginRedirect */, "[Auth] Logout" /* Logout */), tap(_authed => {
            this._router.navigate(['/login']);
        })), { dispatch: false });
        this.logoutConfirmation$ = createEffect(() => this._actions$.pipe(ofType("[Auth] Logout Confirmation" /* LogoutConfirmation */), exhaustMap(() => this._userInteractionsService.askLogoutConfirm()), map(result => result ? new Logout() : new LogoutConfirmationDismiss())));
        this.logout$ = createEffect(() => this._actions$.pipe(ofType("[Auth] Logout" /* Logout */), tap(() => {
            this._jwtHelperService.tokenSetter(null);
            this._jwtHelperService.refreshTokenSetter(null);
            if (this._config.loggedInUserSetter != null) {
                this._config.loggedInUserSetter(null);
            }
            if (this._config.meSetter != null) {
                this._config.meSetter(null);
            }
        })), { dispatch: false });
        this.init$ = createEffect(() => this._actions$.pipe(ofType("[Auth] Init" /* Init */), switchMap(() => {
            const res = [];
            const token = this._jwtHelperService.tokenGetter();
            if (token) {
                try {
                    if (!this._jwtHelperService.isTokenExpired(token)) {
                        const decoded = this._jwtHelperService.decodeToken(token);
                        const scopes = this._config.disableScopes ? [] : this._getScopesFromToken(decoded);
                        if (this._config.disableScopes || scopes.indexOf('admin') > -1) {
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
    ngrxOnInitEffects() {
        return new Init();
    }
    _getRefreshTokenAction(fromInit) {
        const accessToken = this._jwtHelperService.tokenGetter();
        const exp = this._jwtHelperService.getTokenExpirationDate(accessToken) || new Date();
        const refreshDelay = Math.max(0, Math.round((exp.getTime() - new Date().getTime()) * 0.8));
        return new RefreshToken({ refreshDelay, fromInit });
    }
    _getScopesFromToken(token) {
        const scopesPath = this._config.scopesPath || ['scopes'];
        scopesPath.forEach(p => token = token[p]);
        return token;
    }
}
AuthEffects.decorators = [
    { type: Injectable }
];
AuthEffects.ctorParameters = () => [
    { type: Actions },
    { type: AuthService },
    { type: JwtHelperService },
    { type: AuthUserInteractionsService },
    { type: Router },
    { type: TranslateService },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] }] }
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
class AuthModule {
}
AuthModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    EffectsModule.forFeature([AuthEffects]),
                    StoreModule.forFeature('auth', reducers),
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

export { AUTH_OPTIONS, AuthGuard, AuthHelper, AuthModule, AuthService, AuthUserInteractionsService, Init, InitComplete, InitUser, InitUserComplete, JWT_OPTIONS, JwtHelperService, JwtInterceptor, LoginActionDirective, LoginComponent, LoginFailure, LoginPasswordDirective, LoginRedirect, LoginSuccess, LoginUsernameDirective, Logout, LogoutConfirmation, LogoutConfirmationDismiss, RefreshToken, getInit, getLoggedIn, getLoginPageError, getLoginPagePending, getUser, reducers, selectAuthState, selectAuthStatusState, selectLoginPageState, ɵ0, ɵ1, ɵ2, reducer$1 as ɵgc_gngt_src_core_auth_auth_b, getInit$1 as ɵgc_gngt_src_core_auth_auth_c, getUser$1 as ɵgc_gngt_src_core_auth_auth_d, reducer as ɵgc_gngt_src_core_auth_auth_e, getError as ɵgc_gngt_src_core_auth_auth_f, getPending as ɵgc_gngt_src_core_auth_auth_g, AuthEffects as ɵgc_gngt_src_core_auth_auth_h };
//# sourceMappingURL=auth.js.map
