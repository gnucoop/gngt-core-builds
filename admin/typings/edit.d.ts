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
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminEditField } from './edit-field';
import { Model, ModelActions, ModelService, reducers as fromModel } from '@gngt/core/model';
export declare abstract class AdminEditComponent<T extends Model, S extends fromModel.State<T>, A1 extends ModelActions.ModelGetAction, A2 extends ModelActions.ModelListAction, A3 extends ModelActions.ModelCreateAction<T>, A4 extends ModelActions.ModelUpdateAction<T>, A5 extends ModelActions.ModelPatchAction<T>, A6 extends ModelActions.ModelDeleteAction<T>, A7 extends ModelActions.ModelDeleteAllAction<T>> implements OnDestroy {
    private _cdr;
    private _fb;
    private _router;
    private _title;
    title: string;
    private _listUrl;
    listUrl: string;
    private _cancelLabel;
    cancelLabel: string;
    private _saveLabel;
    saveLabel: string;
    private _service;
    service: ModelService<T, S, A1, A2, A3, A4, A5, A6, A7>;
    private _fields;
    fields: AdminEditField[];
    private _id;
    id: number | 'new';
    private _processObject;
    processObject: (value: any) => void;
    private _processFormData;
    processFormData: (value: any) => void;
    readonly form: Observable<FormGroup>;
    readonly loading: Observable<boolean>;
    private _updateFormEvt;
    private _saveEvt;
    private _saveSub;
    private _savedSub;
    private _valueChanges$;
    readonly valueChanges$: Observable<any>;
    constructor(_cdr: ChangeDetectorRef, _fb: FormBuilder, _router: Router);
    goBack(): void;
    save(): void;
    ngOnDestroy(): void;
    private _applyProcessFormData;
    private _defaultProcessData;
    private _updateForm;
}
