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
import * as fromRoot from '@gngt/core/reducers';
import { ActionReducerMap, MemoizedSelector } from '@ngrx/store';
import { AuthApiActionsUnion } from './auth-api-actions';
import * as fromAuth from './auth-reducer';
import * as fromLoginPage from './login-page-reducer';
import { User } from './user';
export interface AuthState {
    status: fromAuth.State;
    loginPage: fromLoginPage.State;
}
export interface State extends fromRoot.State {
    auth: AuthState;
}
export declare const reducers: ActionReducerMap<AuthState, AuthApiActionsUnion>;
export declare const selectAuthState: MemoizedSelector<State, AuthState>;
export declare const selectAuthStatusState: MemoizedSelector<State, fromAuth.State>;
export declare const getInit: MemoizedSelector<State, boolean>;
export declare const getUser: MemoizedSelector<State, User | null>;
export declare const getLoggedIn: MemoizedSelector<State, boolean>;
export declare const selectLoginPageState: MemoizedSelector<State, fromLoginPage.State>;
export declare const getLoginPageError: MemoizedSelector<State, string | null>;
export declare const getLoginPagePending: MemoizedSelector<State, boolean>;
