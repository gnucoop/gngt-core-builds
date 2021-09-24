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
import { ModelActionTypes, ModelBaseAction } from './model-actions';
import { ModelError } from './model-error';
export interface ModelGetState<M extends Model> {
    uuid: string;
    loading: boolean;
    options: ModelGetParams;
    id: number | null;
    object: M | null;
    error: ModelError | null;
}
export interface ModelListState<M extends Model> {
    uuid: string;
    loading: boolean;
    options: ModelListParams;
    objects: ModelListResult<M> | null;
    error: ModelError | null;
}
export interface ModelCreateState<M extends Model> {
    uuid: string;
    loading: boolean;
    object: M | null;
    error: ModelError | null;
}
export interface ModelUpdateState<M extends Model> {
    uuid: string;
    loading: boolean;
    id: number | null;
    object: M | null;
    error: ModelError | null;
}
export interface ModelPatchState<M extends Model> {
    uuid: string;
    loading: boolean;
    id: number | null;
    object: M | null;
    error: ModelError | null;
}
export interface ModelDeleteState<M extends Model> {
    uuid: string;
    loading: boolean;
    id: number | null;
    object: M | null;
    error: ModelError | null;
}
export interface ModelDeleteAllState<M extends Model> {
    uuid: string;
    loading: boolean;
    ids: number[] | null;
    objects: M[] | null;
    error: ModelError | null;
}
export interface ModelQueryState<M extends Model> {
    uuid: string;
    loading: boolean;
    options: ModelQueryParams | null;
    objects: ModelListResult<M> | null;
    error: ModelError | null;
}
export interface State<M extends Model> {
    get: ModelGetState<M>[];
    list: ModelListState<M>[];
    create: ModelCreateState<M>[];
    update: ModelUpdateState<M>[];
    patch: ModelPatchState<M>[];
    delete: ModelDeleteState<M>[];
    deleteAll: ModelDeleteAllState<M>[];
    query: ModelQueryState<M>[];
}
export declare function generateInitialModelState<M extends Model>(): State<M>;
export declare function modelReducer<M extends Model>(state: State<M>, action: ModelBaseAction, actionTypes: ModelActionTypes): State<M>;
