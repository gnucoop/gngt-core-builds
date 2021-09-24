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
import { Router } from '@angular/router';
import { Model } from '@gngt/core/common';
import { ModelActionTypes, ModelService, State as ModelState } from '@gngt/core/model';
import { Observable } from 'rxjs';
import { AdminEditField } from './edit-field';
import { ProcessDataFn } from './process-data-fn';
export declare abstract class AdminEditComponent<T extends Model = Model, S extends ModelState<T> = ModelState<T>, A extends ModelActionTypes = ModelActionTypes> implements OnDestroy {
    private _cdr;
    private _fb;
    private _router;
    private _title;
    get title(): string;
    set title(title: string);
    private _listUrl;
    set listUrl(listUrl: string);
    private _cancelLabel;
    get cancelLabel(): string;
    set cancelLabel(cancelLabel: string);
    private _saveLabel;
    get saveLabel(): string;
    set saveLabel(saveLabel: string);
    private _service;
    set service(service: ModelService<T, S, A>);
    private _fields;
    get fields(): AdminEditField[];
    set fields(fields: AdminEditField[]);
    private _id;
    set id(id: number | 'new');
    private _processObject;
    set processObject(processObject: ProcessDataFn | Observable<ProcessDataFn>);
    private _processFormData;
    set processFormData(processFormData: ProcessDataFn | Observable<ProcessDataFn>);
    private _readonly;
    get readonly(): boolean;
    set readonly(readonly: boolean);
    private _hideSaveButton;
    get hideSaveButton(): boolean;
    set hideSaveButton(hideSaveButton: boolean);
    private _canSave;
    get canSave(): boolean;
    set canSave(canSave: boolean);
    private _postSaveHook;
    set postSaveHook(postSaveHook: (obj: T) => Observable<T>);
    readonly form: Observable<FormGroup>;
    private _loading;
    readonly loading: Observable<boolean>;
    private _updateFormEvt;
    private _saveEvt;
    private _saveSub;
    private _valueChanges$;
    get valueChanges$(): Observable<any>;
    constructor(_cdr: ChangeDetectorRef, _fb: FormBuilder, _router: Router);
    goBack(): void;
    save(): void;
    ngOnDestroy(): void;
    private _defaultProcessData;
    private _updateForm;
}
