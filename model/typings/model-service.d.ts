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
import { MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import * as fromRoot from '@gngt/core/reducers';
import { Model, ModelGetParams, ModelListParams, ModelListResult } from '@gngt/core/common';
import * as ModelActions from './model-actions';
import * as fromModel from './reducers';
export declare abstract class ModelService<T extends Model, S extends fromModel.State<T>, A1 extends ModelActions.ModelGetAction, A2 extends ModelActions.ModelListAction, A3 extends ModelActions.ModelCreateAction<T>, A4 extends ModelActions.ModelUpdateAction<T>, A5 extends ModelActions.ModelPatchAction<T>, A6 extends ModelActions.ModelDeleteAction<T>, A7 extends ModelActions.ModelDeleteAllAction<T>> {
    protected _store: Store<fromRoot.State>;
    private _actions;
    private _getAction;
    private _listAction;
    private _createAction;
    private _updateAction;
    private _patchAction;
    private _deleteAction;
    private _deleteAllAction;
    protected _modelState: MemoizedSelector<object, S>;
    constructor(_store: Store<fromRoot.State>, _actions: Actions, _getAction: {
        new (p: {
            id: number;
        }): A1;
    }, _listAction: {
        new (p: {
            params: ModelListParams;
        }): A2;
    }, _createAction: {
        new (p: {
            item: T;
        }): A3;
    }, _updateAction: {
        new (p: {
            item: T;
        }): A4;
    }, _patchAction: {
        new (p: {
            item: T;
        }): A5;
    }, _deleteAction: {
        new (p: {
            item: T;
        }): A6;
    }, _deleteAllAction: {
        new (p: {
            items: T[];
        }): A7;
    }, statePrefixes: [string, string]);
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
    getCreateSuccess(): Observable<ModelActions.ModelCreateSuccessAction<T>>;
    getUpdateSuccess(): Observable<ModelActions.ModelUpdateSuccessAction<T>>;
    getPatchSuccess(): Observable<ModelActions.ModelUpdateSuccessAction<T>>;
    getDeleteSuccess(): Observable<ModelActions.ModelDeleteSuccessAction<T>>;
    getDeleteAllSuccess(): Observable<ModelActions.ModelDeleteAllSuccessAction<T>>;
    get(id: number): void;
    list(options?: ModelListParams): void;
    create(data: T): void;
    update(data: T): void;
    patch(data: T): void;
    delete(data: T): void;
    deleteAll(data: T[]): void;
}
