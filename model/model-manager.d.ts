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
import { HttpClient } from '@angular/common/http';
import { Model, ModelListParams, ModelListResult, ModelManager as BaseModelManager, ModelQueryParams } from '@gngt/core/common';
import { SyncService } from '@gngt/core/sync';
import { Observable } from 'rxjs';
import { ModelOptions } from './model-options';
export declare abstract class ModelManager<M extends Model = Model> extends BaseModelManager {
    protected _http: HttpClient;
    private _baseUrl;
    get baseUrl(): string;
    private _useTrailingSlash;
    constructor(config: ModelOptions, endPoint: string, _http: HttpClient, syncService?: SyncService);
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
