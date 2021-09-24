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
import { Model, ModelGetParams, ModelListParams, ModelListResult, ModelQueryParams } from '@gngt/core/common';
import * as fromRoot from '@gngt/core/reducers';
import { Actions } from '@ngrx/effects';
import { MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModelActionTypes, ModelCreateSuccessAction, ModelDeleteAllSuccessAction, ModelDeleteSuccessAction, ModelUpdateSuccessAction } from './model-actions';
import { ModelError } from './model-error';
import { ModelGenericAction } from './model-generic-action';
import * as fromModel from './reducers';
export declare abstract class ModelService<T extends Model = Model, S extends fromModel.State<T> = fromModel.State<T>, A extends ModelActionTypes = ModelActionTypes> {
    protected _store: Store<fromRoot.State>;
    protected _actions: Actions<ModelGenericAction>;
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
    getGetError(): Observable<ModelError | null>;
    getListLoading(): Observable<boolean>;
    getListOptions(): Observable<ModelListParams>;
    getListObjects(): Observable<ModelListResult<T> | null>;
    getListError(): Observable<ModelError | null>;
    getListHasNext(): Observable<boolean>;
    getListCurrentStart(): Observable<number>;
    getCreateLoading(): Observable<boolean>;
    getCreateObject(): Observable<T | null>;
    getCreateError(): Observable<ModelError | null>;
    getUpdateLoading(): Observable<boolean>;
    getUpdateId(): Observable<number | null>;
    getUpdateObject(): Observable<T | null>;
    getUpdateError(): Observable<ModelError | null>;
    getPatchLoading(): Observable<boolean>;
    getPatchId(): Observable<number | null>;
    getPatchObject(): Observable<T | null>;
    getPatchError(): Observable<ModelError | null>;
    getDeleteLoading(): Observable<boolean>;
    getDeleteId(): Observable<number | null>;
    getDeleteObject(): Observable<T | null>;
    getDeleteError(): Observable<ModelError | null>;
    getDeleteAllLoading(): Observable<boolean>;
    getDeleteAllIds(): Observable<number[] | null>;
    getDeleteAllObjects(): Observable<T[] | null>;
    getDeleteAllError(): Observable<ModelError | null>;
    getQueryLoading(): Observable<boolean>;
    getQueryOptions(): Observable<ModelQueryParams | null>;
    getQueryObjects(): Observable<ModelListResult<T> | null>;
    getQueryError(): Observable<ModelError | null>;
    getQueryHasNext(): Observable<boolean>;
    getQueryCurrentStart(): Observable<number>;
    getCreateSuccess(): Observable<ModelCreateSuccessAction<T>>;
    getUpdateSuccess(): Observable<ModelUpdateSuccessAction<T>>;
    getPatchSuccess(): Observable<ModelUpdateSuccessAction<T>>;
    getDeleteSuccess(): Observable<ModelDeleteSuccessAction<T>>;
    getDeleteAllSuccess(): Observable<ModelDeleteAllSuccessAction<T>>;
    get(id: number): Observable<T>;
    list(options?: ModelListParams): Observable<ModelListResult<T>>;
    create(data: Partial<T>): Observable<T>;
    update(data: T): Observable<T>;
    patch(data: T): Observable<T>;
    delete(data: T): Observable<T>;
    deleteAll(data: T[]): Observable<T[]>;
    query(options: ModelQueryParams): Observable<ModelListResult<T>>;
}
