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
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from './reducers';
export declare class LoginUsernameDirective {
}
export declare class LoginPasswordDirective {
}
export declare class LoginActionDirective {
}
export declare abstract class LoginComponent implements OnDestroy {
    protected _cdr: ChangeDetectorRef;
    readonly loginForm: FormGroup;
    readonly valid: Observable<boolean>;
    private _disabled;
    get disabled(): boolean;
    set disabled(disabled: boolean);
    private _usernamePlaceholder;
    get usernamePlaceholder(): string;
    set usernamePlaceholder(usernamePlaceholder: string);
    private _passwordPlaceholder;
    get passwordPlaceholder(): string;
    set passwordPlaceholder(passwordPlaceholder: string);
    private _showLabels;
    get showLabels(): boolean;
    set showLabels(showLabels: boolean);
    private _loginEvt;
    private _loginSub;
    constructor(fb: FormBuilder, store: Store<fromAuth.State>, _cdr: ChangeDetectorRef);
    login(): void;
    ngOnDestroy(): void;
}
