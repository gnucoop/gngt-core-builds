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
import { Action } from '@ngrx/store';
import { User } from './user';
export declare enum AuthActionTypes {
    InitUser = "[Auth] Init user",
    InitUserComplete = "[Auth] Init user complete",
    InitComplete = "[Auth] Init complete",
    Logout = "[Auth] Logout",
    LogoutConfirmation = "[Auth] Logout Confirmation",
    LogoutConfirmationDismiss = "[Auth] Logout Confirmation Dismiss"
}
export declare class InitUser implements Action {
    readonly type = AuthActionTypes.InitUser;
}
export declare class InitUserComplete implements Action {
    payload: {
        user: User | null;
    };
    readonly type = AuthActionTypes.InitUserComplete;
    constructor(payload: {
        user: User | null;
    });
}
export declare class InitComplete implements Action {
    readonly type = AuthActionTypes.InitComplete;
}
export declare class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}
export declare class LogoutConfirmation implements Action {
    readonly type = AuthActionTypes.LogoutConfirmation;
}
export declare class LogoutConfirmationDismiss implements Action {
    readonly type = AuthActionTypes.LogoutConfirmationDismiss;
}
export declare type AuthActionsUnion = InitUser | InitUserComplete | InitComplete | Logout | LogoutConfirmation | LogoutConfirmationDismiss;
