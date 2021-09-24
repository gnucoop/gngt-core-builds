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
import { Model } from '@gngt/core/common';
import { Actions, CreateEffectMetadata } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ModelActionTypes } from './model-actions';
import { ModelGenericAction } from './model-generic-action';
import { ModelManager } from './model-manager';
import * as fromModel from './model-reducer';
import { ModelService } from './model-service';
export declare abstract class ModelEffects<M extends Model = Model, S extends fromModel.State<M> = fromModel.State<M>, A extends ModelGenericAction = ModelGenericAction, AT extends ModelActionTypes = ModelActionTypes> {
    protected _actions: Actions;
    protected _service: ModelService<M, S, AT>;
    protected _manager: ModelManager<M>;
    private _actionTypes;
    protected readonly modelGet$: Observable<A> & CreateEffectMetadata;
    protected readonly modelList$: Observable<A> & CreateEffectMetadata;
    protected readonly modelCreate$: Observable<A> & CreateEffectMetadata;
    protected readonly modelUpdate$: Observable<A> & CreateEffectMetadata;
    protected readonly modelPatch$: Observable<A> & CreateEffectMetadata;
    protected readonly modelDelete$: Observable<A> & CreateEffectMetadata;
    protected readonly modelDeleteAll$: Observable<A> & CreateEffectMetadata;
    protected readonly modelQuery$: Observable<A> & CreateEffectMetadata;
    constructor(_actions: Actions, _service: ModelService<M, S, AT>, _manager: ModelManager<M>, _actionTypes: AT);
}
