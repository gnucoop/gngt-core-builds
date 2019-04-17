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
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Model, ModelListResult } from '@gngt/core/common';
import * as ModelActions from './model-actions';
import { ModelManager } from './model-manager';
import { ModelService } from './model-service';
import * as fromModel from './model-reducer';
export declare abstract class ModelEffects<M extends Model, S extends fromModel.State<M>, A extends Action, A1 extends ModelActions.ModelGetAction, A2 extends ModelActions.ModelListAction, A3 extends ModelActions.ModelCreateAction<M>, A4 extends ModelActions.ModelUpdateAction<M>, A5 extends ModelActions.ModelPatchAction<M>, A6 extends ModelActions.ModelDeleteAction<M>, A7 extends ModelActions.ModelDeleteAllAction<M>, A8 extends ModelActions.ModelQueryAction> {
    protected _actions: Actions;
    protected _service: ModelService<M, S, A1, A2, A3, A4, A5, A6, A7, A8>;
    protected _manager: ModelManager<M>;
    private _params;
    protected readonly modelGet$: Observable<A>;
    protected readonly modelList$: Observable<A>;
    protected readonly modelCreate$: Observable<A>;
    protected readonly modelUpdate$: Observable<A>;
    protected readonly modelPatch$: Observable<A>;
    protected readonly modelDelete$: Observable<A>;
    protected readonly modelDeleteAll$: Observable<A>;
    protected readonly modelQuery$: Observable<A>;
    constructor(_actions: Actions, _service: ModelService<M, S, A1, A2, A3, A4, A5, A6, A7, A8>, _manager: ModelManager<M>, _params: {
        getActionType: string;
        getSuccessAction: new (p: {
            item: M;
        }) => A;
        getFailureAction: new (p: {
            error: any;
        }) => A;
        listActionType: string;
        listSuccessAction: new (p: {
            result: ModelListResult<M>;
        }) => A;
        listFailureAction: new (p: {
            error: any;
        }) => A;
        createActionType: string;
        createSuccessAction: new (p: {
            item: M;
        }) => A;
        createFailureAction: new (p: {
            error: any;
        }) => A;
        updateActionType: string;
        updateSuccessAction: new (p: {
            item: M;
        }) => A;
        updateFailureAction: new (p: {
            error: any;
        }) => A;
        patchActionType: string;
        patchSuccessAction: new (p: {
            item: M;
        }) => A;
        patchFailureAction: new (p: {
            error: any;
        }) => A;
        deleteActionType: string;
        deleteSuccessAction: new (p: {
            item: M;
        }) => A;
        deleteFailureAction: new (p: {
            error: any;
        }) => A;
        deleteAllActionType: string;
        deleteAllSuccessAction: new (p: {
            items: M[];
        }) => A;
        deleteAllFailureAction: new (p: {
            error: any;
        }) => A;
        queryActionType: string;
        querySuccessAction: new (p: {
            result: ModelListResult<M>;
        }) => A;
        queryFailureAction: new (p: {
            error: any;
        }) => A;
    });
}
