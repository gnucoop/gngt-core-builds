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
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actions, OnInitEffects } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth';
import * as AuthActions from './auth-actions';
import * as AuthApiActions from './auth-api-actions';
import { AuthOptions } from './auth-options';
import { AuthUserInteractionsService } from './auth-user-interactions';
import { JwtHelperService } from './jwt-helper';
export declare class AuthEffects implements OnInitEffects {
    private _actions$;
    private _authService;
    private _jwtHelperService;
    private _userInteractionsService;
    private _router;
    private _ts;
    private _config;
    initUser$: Observable<AuthActions.InitUserComplete>;
    initUserComplete$: Observable<AuthActions.InitComplete>;
    login$: Observable<AuthApiActions.LoginSuccess | AuthApiActions.LoginFailure>;
    loginSuccess$: Observable<AuthActions.InitUserComplete | AuthApiActions.RefreshToken>;
    loginFailure$: Observable<AuthApiActions.LoginFailure>;
    refreshToken$: Observable<AuthActions.Init | AuthActions.InitUser | AuthActions.InitUserComplete | AuthActions.InitComplete | AuthActions.Logout | AuthActions.LogoutConfirmation | AuthActions.LogoutConfirmationDismiss | AuthApiActions.LoginSuccess | AuthApiActions.LoginFailure | AuthApiActions.LoginRedirect | AuthApiActions.RefreshToken>;
    loginRedirect$: Observable<never>;
    logoutConfirmation$: Observable<AuthActions.Logout | AuthActions.LogoutConfirmationDismiss>;
    init$: Observable<AuthActions.Init | AuthActions.InitUser | AuthActions.InitUserComplete | AuthActions.InitComplete | AuthActions.Logout | AuthActions.LogoutConfirmation | AuthActions.LogoutConfirmationDismiss | AuthApiActions.LoginSuccess | AuthApiActions.LoginFailure | AuthApiActions.LoginRedirect | AuthApiActions.RefreshToken>;
    constructor(_actions$: Actions, _authService: AuthService, _jwtHelperService: JwtHelperService, _userInteractionsService: AuthUserInteractionsService, _router: Router, _ts: TranslateService, _config: AuthOptions);
    ngrxOnInitEffects(): AuthActions.Init;
    private _getRefreshTokenAction;
    private _getScopesFromToken;
}
