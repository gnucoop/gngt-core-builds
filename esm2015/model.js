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
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
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
class ModelGetAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelGetSuccessAction {
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
class ModelGetFailureAction {
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
class ModelListAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelListSuccessAction {
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
class ModelListFailureAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelCreateAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelCreateSuccessAction {
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
class ModelCreateFailureAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelUpdateAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelUpdateSuccessAction {
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
class ModelUpdateFailureAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelPatchAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelPatchSuccessAction {
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
class ModelPatchFailureAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteSuccessAction {
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
class ModelDeleteFailureAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteAllAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelDeleteAllSuccessAction {
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
class ModelDeleteAllFailureAction {
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
class ModelQueryAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}
/**
 * @abstract
 * @template T
 */
class ModelQuerySuccessAction {
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
class ModelQueryFailureAction {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
    }
}

var modelActions = /*#__PURE__*/Object.freeze({
    ModelActionTypes: ModelActionTypes,
    generateModelActionTypes: generateModelActionTypes,
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
/**
 * @template M
 * @return {?}
 */
function generateInitialModelState() {
    return {
        get: {
            loading: false,
            options: { id: null },
            id: null,
            object: null,
            error: null
        },
        list: {
            loading: false,
            options: {},
            objects: null,
            error: null
        },
        create: {
            loading: false,
            object: null,
            error: null
        },
        update: {
            loading: false,
            id: null,
            object: null,
            error: null
        },
        patch: {
            loading: false,
            id: null,
            object: null,
            error: null
        },
        delete: {
            loading: false,
            id: null,
            object: null,
            error: null
        },
        deleteAll: {
            loading: false,
            ids: null,
            objects: null,
            error: null
        },
        query: {
            loading: false,
            options: null,
            objects: null,
            error: null
        },
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
            return Object.assign({}, state, { get: Object.assign({}, state.get, { loading: true, options: { id: null }, id: ((/** @type {?} */ (action))).payload.id, object: null, error: null }) });
        case actionTypes.GET_SUCCESS:
            return Object.assign({}, state, { get: Object.assign({}, state.get, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.GET_FAILURE:
            return Object.assign({}, state, { get: Object.assign({}, state.get, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
        case actionTypes.LIST:
            return Object.assign({}, state, { list: Object.assign({}, state.list, { loading: true, options: ((/** @type {?} */ (action))).payload.params, objects: null, error: null }) });
        case actionTypes.LIST_SUCCESS:
            return Object.assign({}, state, { list: Object.assign({}, state.list, { loading: false, objects: ((/** @type {?} */ (action))).payload.result, error: null }) });
        case actionTypes.LIST_FAILURE:
            return Object.assign({}, state, { list: Object.assign({}, state.list, { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error }) });
        case actionTypes.CREATE:
            return Object.assign({}, state, { create: Object.assign({}, state.create, { loading: true, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.CREATE_SUCCESS:
            return Object.assign({}, state, { create: Object.assign({}, state.create, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.CREATE_FAILURE:
            return Object.assign({}, state, { create: Object.assign({}, state.create, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
        case actionTypes.UPDATE:
            return Object.assign({}, state, { update: Object.assign({}, state.update, { loading: true, id: ((/** @type {?} */ (action))).payload.item.id, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.UPDATE_SUCCESS:
            return Object.assign({}, state, { update: Object.assign({}, state.update, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.UPDATE_FAILURE:
            return Object.assign({}, state, { update: Object.assign({}, state.update, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
        case actionTypes.PATCH:
            return Object.assign({}, state, { patch: Object.assign({}, state.patch, { loading: true, id: ((/** @type {?} */ (action))).payload.item.id, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.PATCH_SUCCESS:
            return Object.assign({}, state, { patch: Object.assign({}, state.patch, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.PATCH_FAILURE:
            return Object.assign({}, state, { patch: Object.assign({}, state.patch, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
        case actionTypes.DELETE:
            return Object.assign({}, state, { delete: Object.assign({}, state.delete, { loading: true, id: ((/** @type {?} */ (action))).payload.item.id, object: null, error: null }) });
        case actionTypes.DELETE_SUCCESS:
            return Object.assign({}, state, { delete: Object.assign({}, state.delete, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
        case actionTypes.DELETE_FAILURE:
            return Object.assign({}, state, { delete: Object.assign({}, state.delete, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
        case actionTypes.DELETE_ALL:
            return Object.assign({}, state, { deleteAll: Object.assign({}, state.deleteAll, { loading: true, ids: ((/** @type {?} */ (action))).payload.items.map((/**
                     * @param {?} i
                     * @return {?}
                     */
                    i => i.id)), objects: null, error: null }) });
        case actionTypes.DELETE_ALL_SUCCESS:
            return Object.assign({}, state, { deleteAll: Object.assign({}, state.deleteAll, { loading: false, objects: ((/** @type {?} */ (action))).payload.items, error: null }) });
        case actionTypes.DELETE_ALL_FAILURE:
            return Object.assign({}, state, { deleteAll: Object.assign({}, state.deleteAll, { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error }) });
        case actionTypes.QUERY:
            return Object.assign({}, state, { list: Object.assign({}, state.list, { loading: true, options: ((/** @type {?} */ (action))).payload.params, objects: null, error: null }) });
        case actionTypes.QUERY_SUCCESS:
            return Object.assign({}, state, { list: Object.assign({}, state.list, { loading: false, objects: ((/** @type {?} */ (action))).payload.result, error: null }) });
        case actionTypes.QUERY_FAILURE:
            return Object.assign({}, state, { list: Object.assign({}, state.list, { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error }) });
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
/**
 * @abstract
 * @template M, S, A, A1, A2, A3, A4, A5, A6, A7, A8
 */
class ModelEffects {
    /**
     * @param {?} _actions
     * @param {?} _service
     * @param {?} _manager
     * @param {?} _params
     */
    constructor(_actions, _service, _manager, _params) {
        this._actions = _actions;
        this._service = _service;
        this._manager = _manager;
        this._params = _params;
        this.modelGet$ = this._actions
            .pipe(ofType(this._params.getActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.get(action.payload.id)
            .pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => new this._params.getSuccessAction({ item }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.getFailureAction({ error }))))))));
        this.modelList$ = this._actions
            .pipe(ofType(this._params.listActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.list(action.payload.params)
            .pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        (result) => new this._params.listSuccessAction({ result }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.listFailureAction({ error }))))))));
        this.modelCreate$ = this._actions
            .pipe(ofType(this._params.createActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.create(action.payload.item)
            .pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => new this._params.createSuccessAction({ item }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.createFailureAction({ error }))))))));
        this.modelUpdate$ = this._actions
            .pipe(ofType(this._params.updateActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.update(action.payload.item.id, action.payload.item)
            .pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => new this._params.updateSuccessAction({ item }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.updateFailureAction({ error }))))))));
        this.modelPatch$ = this._actions
            .pipe(ofType(this._params.patchActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.patch(action.payload.item.id, action.payload.item)
            .pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => new this._params.patchSuccessAction({ item }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.patchFailureAction({ error }))))))));
        this.modelDelete$ = this._actions
            .pipe(ofType(this._params.deleteActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.delete(action.payload.item.id)
            .pipe(map((/**
         * @return {?}
         */
        () => new this._params.deleteSuccessAction({ item: action.payload.item }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.deleteFailureAction({ error }))))))));
        this.modelDeleteAll$ = this._actions
            .pipe(ofType(this._params.deleteAllActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.deleteAll(action.payload.items.map((/**
         * @param {?} i
         * @return {?}
         */
        i => i.id)))
            .pipe(map((/**
         * @return {?}
         */
        () => new this._params.deleteAllSuccessAction({ items: action.payload.items }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.deleteAllFailureAction({ error }))))))));
        this.modelQuery$ = this._actions
            .pipe(ofType(this._params.queryActionType), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        action => this._manager.query(action.payload.params)
            .pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        (result) => new this._params.querySuccessAction({ result }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of(new this._params.queryFailureAction({ error }))))))));
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
 * @template T
 * @param {?} type
 * @param {?} id
 * @return {?}
 */
function createGetAction(type, id) {
    return new type({ id });
}
/**
 * @template T
 * @param {?} type
 * @param {?} params
 * @return {?}
 */
function createListAction(type, params) {
    return new type({ params });
}
/**
 * @template T, M
 * @param {?} type
 * @param {?} item
 * @return {?}
 */
function createCreateAction(type, item) {
    return new type({ item });
}
/**
 * @template T, M
 * @param {?} type
 * @param {?} item
 * @return {?}
 */
function createUpdateAction(type, item) {
    return new type({ item });
}
/**
 * @template T, M
 * @param {?} type
 * @param {?} item
 * @return {?}
 */
function createPatchAction(type, item) {
    return new type({ item });
}
/**
 * @template T, M
 * @param {?} type
 * @param {?} item
 * @return {?}
 */
function createDeleteAction(type, item) {
    return new type({ item });
}
/**
 * @template T, M
 * @param {?} type
 * @param {?} items
 * @return {?}
 */
function createDeleteAllAction(type, items) {
    return new type({ items });
}
/**
 * @template T
 * @param {?} type
 * @param {?} params
 * @return {?}
 */
function createQueryAction(type, params) {
    return new type({ params });
}
/**
 * @abstract
 * @template T, S, A1, A2, A3, A4, A5, A6, A7, A8
 */
class ModelService {
    /**
     * @param {?} _store
     * @param {?} _actions
     * @param {?} _getAction
     * @param {?} _listAction
     * @param {?} _createAction
     * @param {?} _updateAction
     * @param {?} _patchAction
     * @param {?} _deleteAction
     * @param {?} _deleteAllAction
     * @param {?} _queryAction
     * @param {?} statePrefixes
     */
    constructor(_store, _actions, _getAction, _listAction, _createAction, _updateAction, _patchAction, _deleteAction, _deleteAllAction, _queryAction, statePrefixes) {
        this._store = _store;
        this._actions = _actions;
        this._getAction = _getAction;
        this._listAction = _listAction;
        this._createAction = _createAction;
        this._updateAction = _updateAction;
        this._patchAction = _patchAction;
        this._deleteAction = _deleteAction;
        this._deleteAllAction = _deleteAllAction;
        this._queryAction = _queryAction;
        /** @type {?} */
        const packageState = createFeatureSelector(statePrefixes[0]);
        this._modelState = createSelector(packageState, (/**
         * @param {?} s
         * @return {?}
         */
        s => (/** @type {?} */ (((/** @type {?} */ (s)))[statePrefixes[1]]))));
    }
    /**
     * @return {?}
     */
    getGetLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.get.loading))));
    }
    /**
     * @return {?}
     */
    getGetOptions() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.get.options))));
    }
    /**
     * @return {?}
     */
    getGetId() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.get.id))));
    }
    /**
     * @return {?}
     */
    getGetObject() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.get.object))));
    }
    /**
     * @return {?}
     */
    getGetError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.get.error))));
    }
    /**
     * @return {?}
     */
    getListLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.list.loading))));
    }
    /**
     * @return {?}
     */
    getListOptions() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.list.options))));
    }
    /**
     * @return {?}
     */
    getListObjects() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.list.objects))));
    }
    /**
     * @return {?}
     */
    getListError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.list.error))));
    }
    /**
     * @return {?}
     */
    getListHasNext() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.list.objects && state.list.objects.next))));
    }
    /**
     * @return {?}
     */
    getListCurrentStart() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            if (state.list.options && state.list.options.start != null) {
                return state.list.options.start;
            }
            return 1;
        }))));
    }
    /**
     * @return {?}
     */
    getCreateLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.create.loading))));
    }
    /**
     * @return {?}
     */
    getCreateObject() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.create.object))));
    }
    /**
     * @return {?}
     */
    getCreateError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.create.error))));
    }
    /**
     * @return {?}
     */
    getUpdateLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.update.loading))));
    }
    /**
     * @return {?}
     */
    getUpdateId() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.update.id))));
    }
    /**
     * @return {?}
     */
    getUpdateObject() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.update.object))));
    }
    /**
     * @return {?}
     */
    getUpdateError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.update.error))));
    }
    /**
     * @return {?}
     */
    getPatchLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.patch.loading))));
    }
    /**
     * @return {?}
     */
    getPatchId() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.patch.id))));
    }
    /**
     * @return {?}
     */
    getPatchObject() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.patch.object))));
    }
    /**
     * @return {?}
     */
    getPatchError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.patch.error))));
    }
    /**
     * @return {?}
     */
    getDeleteLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.delete.loading))));
    }
    /**
     * @return {?}
     */
    getDeleteId() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.delete.id))));
    }
    /**
     * @return {?}
     */
    getDeleteObject() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.delete.object))));
    }
    /**
     * @return {?}
     */
    getDeleteError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.delete.error))));
    }
    /**
     * @return {?}
     */
    getDeleteAllLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.deleteAll.loading))));
    }
    /**
     * @return {?}
     */
    getDeleteAllIds() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.deleteAll.ids))));
    }
    /**
     * @return {?}
     */
    getDeleteAllObjects() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.deleteAll.objects))));
    }
    /**
     * @return {?}
     */
    getDeleteAllError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.deleteAll.error))));
    }
    /**
     * @return {?}
     */
    getQueryLoading() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.query.loading))));
    }
    /**
     * @return {?}
     */
    getQueryOptions() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.query.options))));
    }
    /**
     * @return {?}
     */
    getQueryObjects() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.query.objects))));
    }
    /**
     * @return {?}
     */
    getQueryError() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.query.error))));
    }
    /**
     * @return {?}
     */
    getQueryHasNext() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.query.objects && state.query.objects.next))));
    }
    /**
     * @return {?}
     */
    getQueryCurrentStart() {
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            if (state.query.options && state.query.options.start != null) {
                return state.query.options.start;
            }
            return 1;
        }))));
    }
    /**
     * @return {?}
     */
    getCreateSuccess() {
        return this._actions.pipe(ofType(new this._createAction((/** @type {?} */ (null))).type));
    }
    /**
     * @return {?}
     */
    getUpdateSuccess() {
        return this._actions.pipe(ofType(new this._updateAction((/** @type {?} */ (null))).type));
    }
    /**
     * @return {?}
     */
    getPatchSuccess() {
        return this._actions.pipe(ofType(new this._patchAction((/** @type {?} */ (null))).type));
    }
    /**
     * @return {?}
     */
    getDeleteSuccess() {
        return this._actions.pipe(ofType(new this._deleteAction((/** @type {?} */ (null))).type));
    }
    /**
     * @return {?}
     */
    getDeleteAllSuccess() {
        return this._actions.pipe(ofType(new this._deleteAllAction((/** @type {?} */ (null))).type));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    get(id) {
        this._store.dispatch(createGetAction(this._getAction, id));
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    list(options) {
        this._store.dispatch(createListAction(this._listAction, options || {}));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    create(data) {
        this._store.dispatch(createCreateAction(this._createAction, data));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    update(data) {
        this._store.dispatch(createUpdateAction(this._updateAction, data));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    patch(data) {
        this._store.dispatch(createPatchAction(this._patchAction, data));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    delete(data) {
        this._store.dispatch(createDeleteAction(this._deleteAction, data));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    deleteAll(data) {
        this._store.dispatch(createDeleteAllAction(this._deleteAllAction, data));
    }
    /**
     * @param {?} options
     * @return {?}
     */
    query(options) {
        this._store.dispatch(createQueryAction(this._queryAction, options || {}));
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

export { MODEL_OPTIONS, modelActions as ModelActions, ModelEffects, ModelManager, ModelService, generateInitialModelState, modelReducer, reducers };
//# sourceMappingURL=model.js.map
