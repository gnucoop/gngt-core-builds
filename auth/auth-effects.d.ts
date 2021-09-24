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
import { Router } from '@angular/router';
import { Actions, OnInitEffects } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { AuthActionsUnion, Init } from './auth-actions';
import { AuthApiActionsUnion } from './auth-api-actions';
import { AuthOptions } from './auth-options';
import { AuthUserInteractionsService } from './auth-user-interactions';
import { JwtHelperService } from './jwt-helper';
export declare type AllAuthActions = AuthActionsUnion | AuthApiActionsUnion;
export declare class AuthEffects implements OnInitEffects {
    private _actions$;
    private _authService;
    private _jwtHelperService;
    private _userInteractionsService;
    private _router;
    private _ts;
    private _config;
    initUser$: Observable<AuthActionsUnion>;
    initUserComplete$: Observable<AuthActionsUnion>;
    login$: Observable<AuthApiActionsUnion>;
    loginSuccess$: Observable<AllAuthActions>;
    loginFailure$: Observable<AuthApiActionsUnion>;
    refreshToken$: Observable<AllAuthActions>;
    loginRedirect$: Observable<AllAuthActions>;
    logoutConfirmation$: Observable<AuthActionsUnion>;
    logout$: Observable<AuthActionsUnion>;
    init$: Observable<AllAuthActions>;
    constructor(_actions$: Actions, _authService: AuthService, _jwtHelperService: JwtHelperService, _userInteractionsService: AuthUserInteractionsService, _router: Router, _ts: TranslateService, _config: AuthOptions);
    ngrxOnInitEffects(): Init;
    private _getRefreshTokenAction;
    private _getScopesFromToken;
}
