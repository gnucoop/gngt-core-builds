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
import { Model, ModelActions, ModelService, reducers as fromModel } from '@gngt/core/model';
import { AdminEditField } from './edit-field';
import { ProcessDataFn } from './process-data-fn';
export declare abstract class AdminEditComponent<T extends Model, S extends fromModel.State<T>, A extends ModelActions.ModelActionTypes> implements OnDestroy {
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
    service: ModelService<T, S, A>;
    private _fields;
    fields: AdminEditField[];
    private _id;
    id: number | 'new';
    private _processObject;
    processObject: ProcessDataFn | Observable<ProcessDataFn>;
    private _processFormData;
    processFormData: ProcessDataFn | Observable<ProcessDataFn>;
    private _readonly;
    readonly: boolean;
    private _hideSaveButton;
    hideSaveButton: boolean;
    private _canSave;
    canSave: boolean;
    readonly form: Observable<FormGroup>;
    private _loading;
    readonly loading: Observable<boolean>;
    private _updateFormEvt;
    private _saveEvt;
    private _saveSub;
    private _valueChanges$;
    readonly valueChanges$: Observable<any>;
    constructor(_cdr: ChangeDetectorRef, _fb: FormBuilder, _router: Router);
    goBack(): void;
    save(): void;
    ngOnDestroy(): void;
    private _defaultProcessData;
    private _updateForm;
}
