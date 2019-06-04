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
import { type } from '@gngt/core/reducers';
import { of, pipe, throwError } from 'rxjs';
import { mergeMap, map, catchError, filter, tap } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { v4 } from 'uuid';
import { InjectionToken } from '@angular/core';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ModelActionTypes() { }
/**
 * @param {?} typeName
 * @return {?}
 */
function generateModelActionTypes(typeName) {
    return {
        LIST: type(`[${typeName}] List`),
        LIST_FAILURE: type(`[${typeName}] List failure`),
        LIST_SUCCESS: type(`[${typeName}] List success`),
        GET: type(`[${typeName}] Get`),
        GET_FAILURE: type(`[${typeName}] Get failure`),
        GET_SUCCESS: type(`[${typeName}] Get success`),
        CREATE: type(`[${typeName}] Create`),
        CREATE_FAILURE: type(`[${typeName}] Create failure`),
        CREATE_SUCCESS: type(`[${typeName}] Create success`),
        UPDATE: type(`[${typeName}] Update`),
        UPDATE_FAILURE: type(`[${typeName}] Update failure`),
        UPDATE_SUCCESS: type(`[${typeName}] Update success`),
        PATCH: type(`[${typeName}] Patch`),
        PATCH_FAILURE: type(`[${typeName}] Patch failure`),
        PATCH_SUCCESS: type(`[${typeName}] Patch success`),
        DELETE: type(`[${typeName}] Delete`),
        DELETE_FAILURE: type(`[${typeName}] Delete failure`),
        DELETE_SUCCESS: type(`[${typeName}] Delete success`),
        DELETE_ALL: type(`[${typeName}] Delete all`),
        DELETE_ALL_FAILURE: type(`[${typeName}] Delete all failure`),
        DELETE_ALL_SUCCESS: type(`[${typeName}] Delete all success`),
        QUERY: type(`[${typeName}] Query`),
        QUERY_FAILURE: type(`[${typeName}] Query failure`),
        QUERY_SUCCESS: type(`[${typeName}] Query success`),
    };
}
/**
 * @abstract
 */
class ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelGetAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelGetSuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelGetFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelListAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelListSuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelListFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelCreateAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelCreateSuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelCreateFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelUpdateAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelUpdateSuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelUpdateFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelPatchAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelPatchSuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelPatchFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteSuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelDeleteFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteAllAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteAllSuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelDeleteAllFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelQueryAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelQuerySuccessAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
/**
 * @abstract
 */
class ModelQueryFailureAction extends ModelBaseAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}

var modelActions = /*#__PURE__*/Object.freeze({
    ModelActionTypes: ModelActionTypes,
    generateModelActionTypes: generateModelActionTypes,
    ModelBaseAction: ModelBaseAction,
    ModelGetAction: ModelGetAction,
    ModelGetSuccessAction: ModelGetSuccessAction,
    ModelGetFailureAction: ModelGetFailureAction,
    ModelListAction: ModelListAction,
    ModelListSuccessAction: ModelListSuccessAction,
    ModelListFailureAction: ModelListFailureAction,
    ModelCreateAction: ModelCreateAction,
    ModelCreateSuccessAction: ModelCreateSuccessAction,
    ModelCreateFailureAction: ModelCreateFailureAction,
    ModelUpdateAction: ModelUpdateAction,
    ModelUpdateSuccessAction: ModelUpdateSuccessAction,
    ModelUpdateFailureAction: ModelUpdateFailureAction,
    ModelPatchAction: ModelPatchAction,
    ModelPatchSuccessAction: ModelPatchSuccessAction,
    ModelPatchFailureAction: ModelPatchFailureAction,
    ModelDeleteAction: ModelDeleteAction,
    ModelDeleteSuccessAction: ModelDeleteSuccessAction,
    ModelDeleteFailureAction: ModelDeleteFailureAction,
    ModelDeleteAllAction: ModelDeleteAllAction,
    ModelDeleteAllSuccessAction: ModelDeleteAllSuccessAction,
    ModelDeleteAllFailureAction: ModelDeleteAllFailureAction,
    ModelQueryAction: ModelQueryAction,
    ModelQuerySuccessAction: ModelQuerySuccessAction,
    ModelQueryFailureAction: ModelQueryFailureAction
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @type {?} */
const stateQueueLimit = 20;
/**
 * @template M
 * @return {?}
 */
function generateInitialModelState() {
    return {
        get: [],
        list: [],
        create: [],
        update: [],
        patch: [],
        delete: [],
        deleteAll: [],
        query: [],
    };
}
/**
 * @template M
 * @param {?} state
 * @param {?} action
 * @param {?} actionTypes
 * @return {?}
 */
function modelReducer(state, action, actionTypes) {
    switch (action.type) {
        case actionTypes.GET:
            return Object.assign({}, state, { get: [{
                        uuid: action.uuid,
                        loading: true,
                        options: { id: null },
                        id: ((/** @type {?} */ (action))).payload.id,
                        object: null,
                        error: null
                    }, ...state.get.slice(0, stateQueueLimit - 1)] });
        case actionTypes.GET_SUCCESS:
            /** @type {?} */
            const successGetIdx = state.get.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successGetIdx >= 0) {
                return Object.assign({}, state, { get: [...state.get.slice(0, successGetIdx), Object.assign({}, state.get[successGetIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }), ...state.get.slice(successGetIdx + 1)] });
            }
            return state;
        case actionTypes.GET_FAILURE:
            /** @type {?} */
            const failureGetIdx = state.get.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failureGetIdx >= 0) {
                return Object.assign({}, state, { get: [...state.get.slice(0, failureGetIdx), Object.assign({}, state.get[failureGetIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.get.slice(failureGetIdx + 1)] });
            }
            return state;
        case actionTypes.LIST:
            return Object.assign({}, state, { list: [{
                        uuid: action.uuid,
                        loading: true,
                        options: ((/** @type {?} */ (action))).payload.params,
                        objects: null,
                        error: null
                    }, ...state.list.slice(0, stateQueueLimit - 1)] });
        case actionTypes.LIST_SUCCESS:
            /** @type {?} */
            const successListIdx = state.list.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successListIdx >= 0) {
                return Object.assign({}, state, { list: [...state.list.slice(0, successListIdx), Object.assign({}, state.list[successListIdx], { loading: false, objects: ((/** @type {?} */ (action))).payload.result, error: null }), ...state.list.slice(successListIdx + 1)] });
            }
            return state;
        case actionTypes.LIST_FAILURE:
            /** @type {?} */
            const failureListIdx = state.list.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failureListIdx >= 0) {
                return Object.assign({}, state, { list: [...state.list.slice(0, failureListIdx), Object.assign({}, state.list[failureListIdx], { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.list.slice(failureListIdx + 1)] });
            }
            return state;
        case actionTypes.CREATE:
            return Object.assign({}, state, { create: [{
                        uuid: action.uuid,
                        loading: true,
                        object: ((/** @type {?} */ (action))).payload.item,
                        error: null
                    }, ...state.create.slice(0, stateQueueLimit - 1)] });
        case actionTypes.CREATE_SUCCESS:
            /** @type {?} */
            const successCreateIdx = state.create.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successCreateIdx >= 0) {
                return Object.assign({}, state, { create: [...state.create.slice(0, successCreateIdx), Object.assign({}, state.create[successCreateIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }), ...state.create.slice(successCreateIdx + 1)] });
            }
            return state;
        case actionTypes.CREATE_FAILURE:
            /** @type {?} */
            const failureCreateIdx = state.create.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failureCreateIdx >= 0) {
                return Object.assign({}, state, { create: [...state.create.slice(0, failureCreateIdx), Object.assign({}, state.create[failureCreateIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.create.slice(failureCreateIdx + 1)] });
            }
            return state;
        case actionTypes.UPDATE:
            return Object.assign({}, state, { update: [{
                        uuid: action.uuid,
                        loading: true,
                        id: ((/** @type {?} */ (action))).payload.item.id,
                        object: ((/** @type {?} */ (action))).payload.item,
                        error: null
                    }, ...state.update.slice(0, stateQueueLimit - 1)] });
        case actionTypes.UPDATE_SUCCESS:
            /** @type {?} */
            const successUpdateIdx = state.update.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successUpdateIdx >= 0) {
                return Object.assign({}, state, { update: [...state.update.slice(0, successUpdateIdx), Object.assign({}, state.update[successUpdateIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }), ...state.update.slice(successUpdateIdx + 1)] });
            }
            return state;
        case actionTypes.UPDATE_FAILURE:
            /** @type {?} */
            const failureUpdateIdx = state.update.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failureUpdateIdx >= 0) {
                return Object.assign({}, state, { update: [...state.update.slice(0, failureUpdateIdx), Object.assign({}, state.update[failureUpdateIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.update.slice(failureUpdateIdx + 1)] });
            }
            return state;
        case actionTypes.PATCH:
            return Object.assign({}, state, { patch: [{
                        uuid: action.uuid,
                        loading: true,
                        id: ((/** @type {?} */ (action))).payload.item.id,
                        object: ((/** @type {?} */ (action))).payload.item,
                        error: null
                    }, ...state.patch.slice(0, stateQueueLimit - 1)] });
        case actionTypes.PATCH_SUCCESS:
            /** @type {?} */
            const successPatchIdx = state.patch.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successPatchIdx >= 0) {
                return Object.assign({}, state, { patch: [...state.patch.slice(0, successPatchIdx), Object.assign({}, state.patch[successPatchIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }), ...state.patch.slice(successPatchIdx + 1)] });
            }
            return state;
        case actionTypes.PATCH_FAILURE:
            /** @type {?} */
            const failurePatchIdx = state.patch.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failurePatchIdx >= 0) {
                return Object.assign({}, state, { patch: [...state.patch.slice(0, failurePatchIdx), Object.assign({}, state.patch[failurePatchIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.patch.slice(failurePatchIdx + 1)] });
            }
            return state;
        case actionTypes.DELETE:
            return Object.assign({}, state, { delete: [{
                        uuid: action.uuid,
                        loading: true,
                        id: ((/** @type {?} */ (action))).payload.item.id,
                        object: null,
                        error: null
                    }, ...state.delete.slice(0, stateQueueLimit - 1)] });
        case actionTypes.DELETE_SUCCESS:
            /** @type {?} */
            const successDeleteIdx = state.delete.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successDeleteIdx >= 0) {
                return Object.assign({}, state, { delete: [...state.delete.slice(0, successDeleteIdx), Object.assign({}, state.delete[successDeleteIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }), ...state.delete.slice(successDeleteIdx + 1)] });
            }
            return state;
        case actionTypes.DELETE_FAILURE:
            /** @type {?} */
            const failureDeleteIdx = state.delete.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failureDeleteIdx >= 0) {
                return Object.assign({}, state, { delete: [...state.delete.slice(0, failureDeleteIdx), Object.assign({}, state.delete[failureDeleteIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.delete.slice(failureDeleteIdx + 1)] });
            }
            return state;
        case actionTypes.DELETE_ALL:
            return Object.assign({}, state, { deleteAll: [{
                        uuid: action.uuid,
                        loading: true,
                        ids: ((/** @type {?} */ (action))).payload.items.map((/**
                         * @param {?} i
                         * @return {?}
                         */
                        i => i.id)),
                        objects: null,
                        error: null
                    }, ...state.deleteAll.slice(0, stateQueueLimit - 1)] });
        case actionTypes.DELETE_ALL_SUCCESS:
            /** @type {?} */
            const successDeleteAllIdx = state.deleteAll.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successDeleteAllIdx >= 0) {
                return Object.assign({}, state, { deleteAll: [...state.deleteAll.slice(0, successDeleteAllIdx), Object.assign({}, state.deleteAll[successDeleteAllIdx], { loading: false, objects: ((/** @type {?} */ (action))).payload.items, error: null }), ...state.deleteAll.slice(successDeleteAllIdx + 1)] });
            }
            return state;
        case actionTypes.DELETE_ALL_FAILURE:
            /** @type {?} */
            const failureDeleteAllIdx = state.deleteAll.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failureDeleteAllIdx >= 0) {
                return Object.assign({}, state, { deleteAll: [...state.deleteAll.slice(0, failureDeleteAllIdx), Object.assign({}, state.deleteAll[failureDeleteAllIdx], { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.deleteAll.slice(failureDeleteAllIdx + 1)] });
            }
            return state;
        case actionTypes.QUERY:
            return Object.assign({}, state, { query: [{
                        uuid: action.uuid,
                        loading: true,
                        options: ((/** @type {?} */ (action))).payload.params,
                        objects: null,
                        error: null
                    }, ...state.query.slice(0, stateQueueLimit - 1)] });
        case actionTypes.QUERY_SUCCESS:
            /** @type {?} */
            const successQueryIdx = state.query.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (successQueryIdx >= 0) {
                return Object.assign({}, state, { query: [...state.query.slice(0, successQueryIdx), Object.assign({}, state.query[successQueryIdx], { loading: false, options: Object.assign({}, (/** @type {?} */ (state.query[successQueryIdx].options))), objects: ((/** @type {?} */ (action))).payload.result, error: null }), ...state.query.slice(successQueryIdx + 1)] });
            }
            return state;
        case actionTypes.QUERY_FAILURE:
            /** @type {?} */
            const failureQueryIdx = state.query.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            g => g.uuid === action.uuid));
            if (failureQueryIdx >= 0) {
                return Object.assign({}, state, { query: [...state.query.slice(0, failureQueryIdx), Object.assign({}, state.query[failureQueryIdx], { loading: false, options: Object.assign({}, (/** @type {?} */ (state.query[failureQueryIdx].options))), objects: null, error: ((/** @type {?} */ (action))).payload.error }), ...state.query.slice(failureQueryIdx + 1)] });
            }
            return state;
        default:
            return state;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template M
 */
function ModelPackageState() { }

var reducers = /*#__PURE__*/Object.freeze({
    ModelPackageState: ModelPackageState,
    generateInitialModelState: generateInitialModelState,
    modelReducer: modelReducer
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

class ModelGenericAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template A
 * @param {?} params
 * @return {?}
 */
function createAction(params) {
    /** @type {?} */
    const action = new ModelGenericAction(params.payload);
    action.type = params.type;
    action.uuid = params.uuid || v4();
    return (/** @type {?} */ (action));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template M, S, A, AT
 */
class ModelEffects {
    /**
     * @param {?} _actions
     * @param {?} _service
     * @param {?} _manager
     * @param {?} _actionTypes
     */
    constructor(_actions, _service, _manager, _actionTypes) {
        this._actions = _actions;
        this._service = _service;
        this._manager = _manager;
        this._actionTypes = _actionTypes;
        this.modelGet$ = this._actions.pipe(ofType(this._actionTypes.GET), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.get(action.payload.id).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => createAction({
            type: this._actionTypes.GET_SUCCESS,
            payload: { item },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.GET_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
        this.modelList$ = this._actions.pipe(ofType(this._actionTypes.LIST), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.list(action.payload.params).pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        (result) => createAction({
            type: this._actionTypes.LIST_SUCCESS,
            payload: { result },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.LIST_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
        this.modelCreate$ = this._actions.pipe(ofType(this._actionTypes.CREATE), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.create(action.payload.item).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => createAction({
            type: this._actionTypes.CREATE_SUCCESS,
            payload: { item },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.CREATE_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
        this.modelUpdate$ = this._actions
            .pipe(ofType(this._actionTypes.UPDATE), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.update(action.payload.item.id, action.payload.item).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => createAction({
            type: this._actionTypes.UPDATE_SUCCESS,
            payload: { item },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.CREATE_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
        this.modelPatch$ = this._actions.pipe(ofType(this._actionTypes.PATCH), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.patch(action.payload.item.id, action.payload.item).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => createAction({
            type: this._actionTypes.CREATE_SUCCESS,
            payload: { item },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.CREATE_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
        this.modelDelete$ = this._actions.pipe(ofType(this._actionTypes.DELETE), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.delete(action.payload.item.id).pipe(map((/**
         * @return {?}
         */
        () => createAction({
            type: this._actionTypes.DELETE_SUCCESS,
            payload: { item: action.payload.item },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.DELETE_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
        this.modelDeleteAll$ = this._actions.pipe(ofType(this._actionTypes.DELETE_ALL), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.deleteAll(action.payload.items.map((/**
         * @param {?} i
         * @return {?}
         */
        i => i.id))).pipe(map((/**
         * @return {?}
         */
        () => createAction({
            type: this._actionTypes.DELETE_ALL_SUCCESS,
            payload: { items: action.payload.items },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.DELETE_ALL_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
        this.modelQuery$ = this._actions.pipe(ofType(this._actionTypes.QUERY), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.query(action.payload.params).pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        (result) => createAction({
            type: this._actionTypes.QUERY_SUCCESS,
            payload: { result },
            uuid: action.uuid
        }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(createAction({
            type: this._actionTypes.QUERY_FAILURE,
            payload: { error },
            uuid: action.uuid
        }))))))));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @abstract
 * @template M
 */
class ModelManager {
    /**
     * @param {?} _config
     * @param {?} _endPoint
     * @param {?} _http
     */
    constructor(_config, _endPoint, _http) {
        this._config = _config;
        this._endPoint = _endPoint;
        this._http = _http;
        this._baseUrl = `${this._config.baseApiUrl}${this._endPoint}`;
    }
    /**
     * @protected
     * @return {?}
     */
    get endPoint() { return this._endPoint; }
    /**
     * @param {?} id
     * @return {?}
     */
    get(id) {
        return this._http.get(this._getObjectUrl(id));
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    list(options) {
        /** @type {?} */
        const params = this._listParamsToQueryParameters(options);
        return this._http.get(`${this._getListUrl()}${params}`);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    create(data) {
        return this._http.post(this._getListUrl(), data);
    }
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    update(id, data) {
        return this._http.put(this._getObjectUrl(id), data);
    }
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    patch(id, data) {
        return this._http.patch(this._getObjectUrl(id), data);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    delete(id) {
        return this._http.delete(this._getObjectUrl(id));
    }
    /**
     * @param {?} ids
     * @return {?}
     */
    deleteAll(ids) {
        /** @type {?} */
        let url = `${this._baseUrl}/delete_all`;
        if (this._config.addTrailingSlash) {
            url = `${url}/`;
        }
        return this._http.post(url, { ids });
    }
    /**
     * @param {?} params
     * @return {?}
     */
    query(params) {
        /** @type {?} */
        let url = `${this._baseUrl}/query`;
        if (this._config.addTrailingSlash) {
            url = `${url}/`;
        }
        return this._http.post(url, params);
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    _getObjectUrl(id) {
        /** @type {?} */
        let url = `${this._baseUrl}/${id}`;
        if (this._config.addTrailingSlash) {
            url = `${url}/`;
        }
        return url;
    }
    /**
     * @private
     * @return {?}
     */
    _getListUrl() {
        /** @type {?} */
        let url = this._baseUrl;
        if (this._config.addTrailingSlash) {
            url = `${url}/`;
        }
        return url;
    }
    /**
     * @private
     * @param {?=} options
     * @return {?}
     */
    _listParamsToQueryParameters(options) {
        /** @type {?} */
        let params = '';
        /** @type {?} */
        const paramsArray = [];
        if (options) {
            if (options.limit) {
                paramsArray.push(`limit=${options.limit}`);
            }
            if (options.start) {
                paramsArray.push(`start=${options.start}`);
            }
            if (options.sort) {
                /** @type {?} */
                const props = Object.keys(options.sort);
                paramsArray.push(`sort=${props.map((/**
                 * @param {?} p
                 * @return {?}
                 */
                p => `${p}:${(/** @type {?} */ (options.sort))[p]}`)).join(',')}`);
            }
            if (options.fields) {
                paramsArray.push(`fields=${options.fields.join(',')}`);
            }
            if (options.joins) {
                paramsArray.push(`joins=${options.joins.map((/**
                 * @param {?} j
                 * @return {?}
                 */
                j => {
                    /** @type {?} */
                    const join = `${j.model}.${j.property}`;
                    if (j.fields) {
                        return `${join}.${j.fields.join(';')}`;
                    }
                    return join;
                })).join(',')}`);
            }
            if (paramsArray.length > 0) {
                params = `?${paramsArray.join('&')}`;
            }
        }
        return params;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MODEL_OPTIONS = new InjectionToken('MODEL_OPTIONS', {
    providedIn: 'root',
    factory: (/**
     * @return {?}
     */
    () => ({
        baseApiUrl: '/'
    }))
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, S, A
 */
class ModelService {
    /**
     * @param {?} _store
     * @param {?} _actions
     * @param {?} _actionTypes
     * @param {?} statePrefixes
     */
    constructor(_store, _actions, _actionTypes, statePrefixes) {
        this._store = _store;
        this._actions = _actions;
        this._actionTypes = _actionTypes;
        /** @type {?} */
        const packageState = createFeatureSelector(statePrefixes[0]);
        this._modelState = createSelector(packageState, (/**
         * @param {?} s
         * @return {?}
         */
        s => (/** @type {?} */ (((/** @type {?} */ (s)))[statePrefixes[1]]))));
        this._lastGetEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.get))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
        this._lastListEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.list))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
        this._lastCreateEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.create))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
        this._lastPatchEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.patch))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
        this._lastUpdateEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.update))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
        this._lastDeleteEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.delete))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
        this._lastDeleteAllEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.deleteAll))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
        this._lastQueryEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.query))), filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.length > 0)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => g[0])));
    }
    /**
     * @return {?}
     */
    getGetLoading() {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getGetOptions() {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.options)));
    }
    /**
     * @return {?}
     */
    getGetId() {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.id)));
    }
    /**
     * @return {?}
     */
    getGetObject() {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.object)));
    }
    /**
     * @return {?}
     */
    getGetError() {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getListLoading() {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getListOptions() {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.options)));
    }
    /**
     * @return {?}
     */
    getListObjects() {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.objects)));
    }
    /**
     * @return {?}
     */
    getListError() {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getListHasNext() {
        return this._store.pipe(this._lastListEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.objects != null)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => (/** @type {?} */ (g.objects)).next)));
    }
    /**
     * @return {?}
     */
    getListCurrentStart() {
        return this._store.pipe(this._lastListEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.options != null)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => (/** @type {?} */ (g.options)).start != null ? (/** @type {?} */ (g.options)).start : 1)));
    }
    /**
     * @return {?}
     */
    getCreateLoading() {
        return this._store.pipe(this._lastCreateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getCreateObject() {
        return this._store.pipe(this._lastCreateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.object)));
    }
    /**
     * @return {?}
     */
    getCreateError() {
        return this._store.pipe(this._lastCreateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getUpdateLoading() {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getUpdateId() {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.id)));
    }
    /**
     * @return {?}
     */
    getUpdateObject() {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.object)));
    }
    /**
     * @return {?}
     */
    getUpdateError() {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getPatchLoading() {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getPatchId() {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.id)));
    }
    /**
     * @return {?}
     */
    getPatchObject() {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.object)));
    }
    /**
     * @return {?}
     */
    getPatchError() {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getDeleteLoading() {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getDeleteId() {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.id)));
    }
    /**
     * @return {?}
     */
    getDeleteObject() {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.object)));
    }
    /**
     * @return {?}
     */
    getDeleteError() {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getDeleteAllLoading() {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getDeleteAllIds() {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.ids)));
    }
    /**
     * @return {?}
     */
    getDeleteAllObjects() {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.objects)));
    }
    /**
     * @return {?}
     */
    getDeleteAllError() {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getQueryLoading() {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.loading)));
    }
    /**
     * @return {?}
     */
    getQueryOptions() {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.options)));
    }
    /**
     * @return {?}
     */
    getQueryObjects() {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.objects)));
    }
    /**
     * @return {?}
     */
    getQueryError() {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        g => g.error)));
    }
    /**
     * @return {?}
     */
    getQueryHasNext() {
        return this._store.pipe(this._lastQueryEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.objects != null)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => (/** @type {?} */ (g.objects)).next)));
    }
    /**
     * @return {?}
     */
    getQueryCurrentStart() {
        return this._store.pipe(this._lastQueryEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        g => g.options != null)), map((/**
         * @param {?} g
         * @return {?}
         */
        g => (/** @type {?} */ (g.options)).start != null ? (/** @type {?} */ (g.options)).start : 1)));
    }
    /**
     * @return {?}
     */
    getCreateSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.CREATE_SUCCESS));
    }
    /**
     * @return {?}
     */
    getUpdateSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.UPDATE_SUCCESS));
    }
    /**
     * @return {?}
     */
    getPatchSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.PATCH_SUCCESS));
    }
    /**
     * @return {?}
     */
    getDeleteSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.DELETE_SUCCESS));
    }
    /**
     * @return {?}
     */
    getDeleteAllSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.DELETE_ALL_SUCCESS));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    get(id) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.GET,
            payload: { id }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.get))), map((/**
         * @param {?} gets
         * @return {?}
         */
        gets => gets.find((/**
         * @param {?} g
         * @return {?}
         */
        g => g.uuid === action.uuid)))), filter((/**
         * @param {?} get
         * @return {?}
         */
        get => get != null)), tap((/**
         * @param {?} get
         * @return {?}
         */
        get => {
            if ((/** @type {?} */ (get)).error != null) {
                throwError((/** @type {?} */ (get)).error);
            }
        })), filter((/**
         * @param {?} get
         * @return {?}
         */
        get => (/** @type {?} */ (get)).object != null)), map((/**
         * @param {?} get
         * @return {?}
         */
        get => (/** @type {?} */ ((/** @type {?} */ (get)).object)))));
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    list(options) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.LIST,
            payload: { params: options || {} }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.list))), map((/**
         * @param {?} lists
         * @return {?}
         */
        lists => lists.find((/**
         * @param {?} l
         * @return {?}
         */
        l => l.uuid === action.uuid)))), filter((/**
         * @param {?} list
         * @return {?}
         */
        list => list != null)), tap((/**
         * @param {?} list
         * @return {?}
         */
        list => {
            if ((/** @type {?} */ (list)).error != null) {
                throwError((/** @type {?} */ (list)).error);
            }
        })), filter((/**
         * @param {?} list
         * @return {?}
         */
        list => (/** @type {?} */ (list)).objects != null)), map((/**
         * @param {?} list
         * @return {?}
         */
        list => (/** @type {?} */ ((/** @type {?} */ (list)).objects)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    create(data) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.CREATE,
            payload: { item: data },
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.create))), map((/**
         * @param {?} creates
         * @return {?}
         */
        creates => creates.find((/**
         * @param {?} c
         * @return {?}
         */
        c => c.uuid === action.uuid)))), filter((/**
         * @param {?} creates
         * @return {?}
         */
        creates => creates != null)), tap((/**
         * @param {?} create
         * @return {?}
         */
        create => {
            if ((/** @type {?} */ (create)).error != null) {
                throwError((/** @type {?} */ (create)).error);
            }
        })), filter((/**
         * @param {?} create
         * @return {?}
         */
        create => (/** @type {?} */ (create)).object != null)), map((/**
         * @param {?} create
         * @return {?}
         */
        create => (/** @type {?} */ ((/** @type {?} */ (create)).object)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    update(data) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.UPDATE,
            payload: { item: data },
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.update))), map((/**
         * @param {?} updates
         * @return {?}
         */
        updates => updates.find((/**
         * @param {?} u
         * @return {?}
         */
        u => u.uuid === action.uuid)))), filter((/**
         * @param {?} updates
         * @return {?}
         */
        updates => updates != null)), tap((/**
         * @param {?} update
         * @return {?}
         */
        update => {
            if ((/** @type {?} */ (update)).error != null) {
                throwError((/** @type {?} */ (update)).error);
            }
        })), filter((/**
         * @param {?} update
         * @return {?}
         */
        update => (/** @type {?} */ (update)).object != null)), map((/**
         * @param {?} update
         * @return {?}
         */
        update => (/** @type {?} */ ((/** @type {?} */ (update)).object)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    patch(data) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.PATCH,
            payload: { item: data }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.patch))), map((/**
         * @param {?} patches
         * @return {?}
         */
        patches => patches.find((/**
         * @param {?} p
         * @return {?}
         */
        p => p.uuid === action.uuid)))), filter((/**
         * @param {?} patches
         * @return {?}
         */
        patches => patches != null)), tap((/**
         * @param {?} patch
         * @return {?}
         */
        patch => {
            if ((/** @type {?} */ (patch)).error != null) {
                throwError((/** @type {?} */ (patch)).error);
            }
        })), filter((/**
         * @param {?} patch
         * @return {?}
         */
        patch => (/** @type {?} */ (patch)).object != null)), map((/**
         * @param {?} patch
         * @return {?}
         */
        patch => (/** @type {?} */ ((/** @type {?} */ (patch)).object)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    delete(data) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.DELETE,
            payload: { item: data }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.delete))), map((/**
         * @param {?} dels
         * @return {?}
         */
        dels => dels.find((/**
         * @param {?} d
         * @return {?}
         */
        d => d.uuid === action.uuid)))), filter((/**
         * @param {?} dels
         * @return {?}
         */
        dels => dels != null)), tap((/**
         * @param {?} del
         * @return {?}
         */
        del => {
            if ((/** @type {?} */ (del)).error != null) {
                throwError((/** @type {?} */ (del)).error);
            }
        })), filter((/**
         * @param {?} del
         * @return {?}
         */
        del => (/** @type {?} */ (del)).object != null)), map((/**
         * @param {?} del
         * @return {?}
         */
        del => (/** @type {?} */ ((/** @type {?} */ (del)).object)))));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    deleteAll(data) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.DELETE_ALL,
            payload: { items: data }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.deleteAll))), map((/**
         * @param {?} deleteAlls
         * @return {?}
         */
        deleteAlls => deleteAlls.find((/**
         * @param {?} d
         * @return {?}
         */
        d => d.uuid === action.uuid)))), filter((/**
         * @param {?} deleteAlls
         * @return {?}
         */
        deleteAlls => deleteAlls != null)), tap((/**
         * @param {?} deleteAll
         * @return {?}
         */
        deleteAll => {
            if ((/** @type {?} */ (deleteAll)).error != null) {
                throwError((/** @type {?} */ (deleteAll)).error);
            }
        })), filter((/**
         * @param {?} deleteAll
         * @return {?}
         */
        deleteAll => (/** @type {?} */ (deleteAll)).objects != null)), map((/**
         * @param {?} deleteAll
         * @return {?}
         */
        deleteAll => (/** @type {?} */ ((/** @type {?} */ (deleteAll)).objects)))));
    }
    /**
     * @param {?} options
     * @return {?}
     */
    query(options) {
        /** @type {?} */
        const action = createAction({
            type: this._actionTypes.QUERY,
            payload: { params: options || {} }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.query))), map((/**
         * @param {?} queries
         * @return {?}
         */
        queries => queries.find((/**
         * @param {?} q
         * @return {?}
         */
        q => q.uuid === action.uuid)))), filter((/**
         * @param {?} queries
         * @return {?}
         */
        queries => queries != null)), tap((/**
         * @param {?} query
         * @return {?}
         */
        query => {
            if ((/** @type {?} */ (query)).error != null) {
                throwError((/** @type {?} */ (query)).error);
            }
        })), filter((/**
         * @param {?} query
         * @return {?}
         */
        query => (/** @type {?} */ (query)).objects != null)), map((/**
         * @param {?} query
         * @return {?}
         */
        query => (/** @type {?} */ ((/** @type {?} */ (query)).objects)))));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MODEL_OPTIONS, modelActions as ModelActions, ModelEffects, ModelManager, ModelService, generateInitialModelState, modelReducer, reducers, ModelGenericAction as ɵa };
//# sourceMappingURL=model.js.map
