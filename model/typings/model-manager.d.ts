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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model, ModelListParams, ModelListResult, ModelManager as BaseModelManager, ModelQueryParams } from '@gngt/core/common';
import { ModelOptions } from './model-options';
export declare abstract class ModelManager<M extends Model> extends BaseModelManager {
    private _config;
    private _endPoint;
    protected _http: HttpClient;
    readonly endPoint: string;
    private _baseUrl;
    constructor(_config: ModelOptions, _endPoint: string, _http: HttpClient);
    get(id: number): Observable<M>;
    list(options?: ModelListParams): Observable<ModelListResult<M>>;
    create(data: M): Observable<M>;
    update(id: number, data: M): Observable<M>;
    patch(id: number, data: M): Observable<M>;
    delete(id: number): Observable<M>;
    deleteAll(ids: number[]): Observable<M>;
    query(params: ModelQueryParams): Observable<ModelListResult<M>>;
    private _getObjectUrl;
    private _getListUrl;
    private _listParamsToQueryParameters;
}
