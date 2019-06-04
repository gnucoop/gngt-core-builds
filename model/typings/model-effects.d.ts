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
import { Model } from '@gngt/core/common';
import * as ModelActions from './model-actions';
import { ModelManager } from './model-manager';
import { ModelService } from './model-service';
import * as fromModel from './model-reducer';
export declare abstract class ModelEffects<M extends Model, S extends fromModel.State<M>, A extends Action, AT extends ModelActions.ModelActionTypes> {
    protected _actions: Actions;
    protected _service: ModelService<M, S, AT>;
    protected _manager: ModelManager<M>;
    private _actionTypes;
    protected readonly modelGet$: Observable<A>;
    protected readonly modelList$: Observable<A>;
    protected readonly modelCreate$: Observable<A>;
    protected readonly modelUpdate$: Observable<A>;
    protected readonly modelPatch$: Observable<A>;
    protected readonly modelDelete$: Observable<A>;
    protected readonly modelDeleteAll$: Observable<A>;
    protected readonly modelQuery$: Observable<A>;
    constructor(_actions: Actions, _service: ModelService<M, S, AT>, _manager: ModelManager<M>, _actionTypes: AT);
}
