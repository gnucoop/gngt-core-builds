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
import { Model, ModelGetParams, ModelListParams, ModelListResult } from '@gngt/core/common';
import * as ModelActions from './model-actions';
export interface State<M extends Model> {
    get: {
        loading: boolean;
        options: ModelGetParams;
        id: number | null;
        object: M | null;
        error: any;
    };
    list: {
        loading: boolean;
        options: ModelListParams;
        objects: ModelListResult<M> | null;
        error: any;
    };
    create: {
        loading: boolean;
        object: M | null;
        error: any;
    };
    update: {
        loading: boolean;
        id: number | null;
        object: M | null;
        error: any;
    };
    patch: {
        loading: boolean;
        id: number | null;
        object: M | null;
        error: any;
    };
    delete: {
        loading: boolean;
        id: number | null;
        object: M | null;
        error: any;
    };
    deleteAll: {
        loading: boolean;
        ids: number[] | null;
        objects: M[] | null;
        error: any;
    };
}
export declare function generateInitialModelState<M extends Model>(): State<M>;
export declare function modelReducer<M extends Model>(state: State<M>, action: Action, actionTypes: ModelActions.ModelActionTypes): State<M>;
