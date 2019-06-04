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
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { MemoizedSelector, Store } from '@ngrx/store';
import * as fromRoot from '@gngt/core/reducers';
import { Model, ModelGetParams, ModelListParams, ModelListResult, ModelQueryParams } from '@gngt/core/common';
import * as ModelActions from './model-actions';
import { ModelGenericAction } from './model-generic-action';
import * as fromModel from './reducers';
export declare abstract class ModelService<T extends Model, S extends fromModel.State<T>, A extends ModelActions.ModelActionTypes> {
    protected _store: Store<fromRoot.State>;
    private _actions;
    private _actionTypes;
    protected _modelState: MemoizedSelector<object, S>;
    private _lastGetEntry;
    private _lastListEntry;
    private _lastCreateEntry;
    private _lastPatchEntry;
    private _lastUpdateEntry;
    private _lastDeleteEntry;
    private _lastDeleteAllEntry;
    private _lastQueryEntry;
    constructor(_store: Store<fromRoot.State>, _actions: Actions<ModelGenericAction>, _actionTypes: A, statePrefixes: [string, string]);
    getGetLoading(): Observable<boolean>;
    getGetOptions(): Observable<ModelGetParams>;
    getGetId(): Observable<number | null>;
    getGetObject(): Observable<T | null>;
    getGetError(): Observable<any>;
    getListLoading(): Observable<boolean>;
    getListOptions(): Observable<ModelListParams>;
    getListObjects(): Observable<ModelListResult<T> | null>;
    getListError(): Observable<any>;
    getListHasNext(): Observable<any>;
    getListCurrentStart(): Observable<any>;
    getCreateLoading(): Observable<boolean>;
    getCreateObject(): Observable<T | null>;
    getCreateError(): Observable<any>;
    getUpdateLoading(): Observable<boolean>;
    getUpdateId(): Observable<number | null>;
    getUpdateObject(): Observable<T | null>;
    getUpdateError(): Observable<any>;
    getPatchLoading(): Observable<boolean>;
    getPatchId(): Observable<number | null>;
    getPatchObject(): Observable<T | null>;
    getPatchError(): Observable<any>;
    getDeleteLoading(): Observable<boolean>;
    getDeleteId(): Observable<number | null>;
    getDeleteObject(): Observable<T | null>;
    getDeleteError(): Observable<any>;
    getDeleteAllLoading(): Observable<boolean>;
    getDeleteAllIds(): Observable<number[] | null>;
    getDeleteAllObjects(): Observable<T[] | null>;
    getDeleteAllError(): Observable<any>;
    getQueryLoading(): Observable<boolean>;
    getQueryOptions(): Observable<ModelQueryParams | null>;
    getQueryObjects(): Observable<ModelListResult<T> | null>;
    getQueryError(): Observable<any>;
    getQueryHasNext(): Observable<any>;
    getQueryCurrentStart(): Observable<any>;
    getCreateSuccess(): Observable<ModelActions.ModelCreateSuccessAction<T>>;
    getUpdateSuccess(): Observable<ModelActions.ModelUpdateSuccessAction<T>>;
    getPatchSuccess(): Observable<ModelActions.ModelUpdateSuccessAction<T>>;
    getDeleteSuccess(): Observable<ModelActions.ModelDeleteSuccessAction<T>>;
    getDeleteAllSuccess(): Observable<ModelActions.ModelDeleteAllSuccessAction<T>>;
    get(id: number): Observable<T>;
    list(options?: ModelListParams): Observable<ModelListResult<T>>;
    create(data: Partial<T>): Observable<T>;
    update(data: T): Observable<T>;
    patch(data: T): Observable<T>;
    delete(data: T): Observable<T>;
    deleteAll(data: T[]): Observable<T[]>;
    query(options: ModelQueryParams): Observable<ModelListResult<T>>;
}
