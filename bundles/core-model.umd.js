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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@gngt/core/reducers'), require('rxjs'), require('rxjs/operators'), require('@ngrx/effects'), require('@angular/core'), require('@ngrx/store')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/model', ['exports', '@gngt/core/reducers', 'rxjs', 'rxjs/operators', '@ngrx/effects', '@angular/core', '@ngrx/store'], factory) :
    (global = global || self, factory((global.dewco = global.dewco || {}, global.dewco.core = global.dewco.core || {}, global.dewco.core.model = {}), global.gngt.core.reducers, global.rxjs, global.rxjs.operators, global.ngrx.effects, global.ng.core, global.ngrx.store));
}(this, function (exports, reducers$1, rxjs, operators, effects, core, store) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelActionTypes = /** @class */ (function () {
        function ModelActionTypes() {
        }
        return ModelActionTypes;
    }());
    /**
     * @param {?} typeName
     * @return {?}
     */
    function generateModelActionTypes(typeName) {
        return {
            LIST: reducers$1.type("[" + typeName + "] List"),
            LIST_FAILURE: reducers$1.type("[" + typeName + "] List failure"),
            LIST_SUCCESS: reducers$1.type("[" + typeName + "] List success"),
            GET: reducers$1.type("[" + typeName + "] Get"),
            GET_FAILURE: reducers$1.type("[" + typeName + "] Get failure"),
            GET_SUCCESS: reducers$1.type("[" + typeName + "] Get success"),
            CREATE: reducers$1.type("[" + typeName + "] Create"),
            CREATE_FAILURE: reducers$1.type("[" + typeName + "] Create failure"),
            CREATE_SUCCESS: reducers$1.type("[" + typeName + "] Create success"),
            UPDATE: reducers$1.type("[" + typeName + "] Update"),
            UPDATE_FAILURE: reducers$1.type("[" + typeName + "] Update failure"),
            UPDATE_SUCCESS: reducers$1.type("[" + typeName + "] Update success"),
            PATCH: reducers$1.type("[" + typeName + "] Patch"),
            PATCH_FAILURE: reducers$1.type("[" + typeName + "] Patch failure"),
            PATCH_SUCCESS: reducers$1.type("[" + typeName + "] Patch success"),
            DELETE: reducers$1.type("[" + typeName + "] Delete"),
            DELETE_FAILURE: reducers$1.type("[" + typeName + "] Delete failure"),
            DELETE_SUCCESS: reducers$1.type("[" + typeName + "] Delete success"),
            DELETE_ALL: reducers$1.type("[" + typeName + "] Delete all"),
            DELETE_ALL_FAILURE: reducers$1.type("[" + typeName + "] Delete all failure"),
            DELETE_ALL_SUCCESS: reducers$1.type("[" + typeName + "] Delete all success")
        };
    }
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelGetAction = /** @class */ (function () {
        function ModelGetAction(payload) {
            this.payload = payload;
        }
        return ModelGetAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelGetSuccessAction = /** @class */ (function () {
        function ModelGetSuccessAction(payload) {
            this.payload = payload;
        }
        return ModelGetSuccessAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelGetFailureAction = /** @class */ (function () {
        function ModelGetFailureAction(payload) {
            this.payload = payload;
        }
        return ModelGetFailureAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelListAction = /** @class */ (function () {
        function ModelListAction(payload) {
            this.payload = payload;
        }
        return ModelListAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelListSuccessAction = /** @class */ (function () {
        function ModelListSuccessAction(payload) {
            this.payload = payload;
        }
        return ModelListSuccessAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelListFailureAction = /** @class */ (function () {
        function ModelListFailureAction(payload) {
            this.payload = payload;
        }
        return ModelListFailureAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelCreateAction = /** @class */ (function () {
        function ModelCreateAction(payload) {
            this.payload = payload;
        }
        return ModelCreateAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelCreateSuccessAction = /** @class */ (function () {
        function ModelCreateSuccessAction(payload) {
            this.payload = payload;
        }
        return ModelCreateSuccessAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelCreateFailureAction = /** @class */ (function () {
        function ModelCreateFailureAction(payload) {
            this.payload = payload;
        }
        return ModelCreateFailureAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelUpdateAction = /** @class */ (function () {
        function ModelUpdateAction(payload) {
            this.payload = payload;
        }
        return ModelUpdateAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelUpdateSuccessAction = /** @class */ (function () {
        function ModelUpdateSuccessAction(payload) {
            this.payload = payload;
        }
        return ModelUpdateSuccessAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelUpdateFailureAction = /** @class */ (function () {
        function ModelUpdateFailureAction(payload) {
            this.payload = payload;
        }
        return ModelUpdateFailureAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelPatchAction = /** @class */ (function () {
        function ModelPatchAction(payload) {
            this.payload = payload;
        }
        return ModelPatchAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelPatchSuccessAction = /** @class */ (function () {
        function ModelPatchSuccessAction(payload) {
            this.payload = payload;
        }
        return ModelPatchSuccessAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelPatchFailureAction = /** @class */ (function () {
        function ModelPatchFailureAction(payload) {
            this.payload = payload;
        }
        return ModelPatchFailureAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelDeleteAction = /** @class */ (function () {
        function ModelDeleteAction(payload) {
            this.payload = payload;
        }
        return ModelDeleteAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelDeleteSuccessAction = /** @class */ (function () {
        function ModelDeleteSuccessAction(payload) {
            this.payload = payload;
        }
        return ModelDeleteSuccessAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelDeleteFailureAction = /** @class */ (function () {
        function ModelDeleteFailureAction(payload) {
            this.payload = payload;
        }
        return ModelDeleteFailureAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelDeleteAllAction = /** @class */ (function () {
        function ModelDeleteAllAction(payload) {
            this.payload = payload;
        }
        return ModelDeleteAllAction;
    }());
    /**
     * @abstract
     * @template T
     */
    var /**
     * @abstract
     * @template T
     */
    ModelDeleteAllSuccessAction = /** @class */ (function () {
        function ModelDeleteAllSuccessAction(payload) {
            this.payload = payload;
        }
        return ModelDeleteAllSuccessAction;
    }());
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ModelDeleteAllFailureAction = /** @class */ (function () {
        function ModelDeleteAllFailureAction(payload) {
            this.payload = payload;
        }
        return ModelDeleteAllFailureAction;
    }());

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
        ModelDeleteAllFailureAction: ModelDeleteAllFailureAction
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
            }
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
                return __assign({}, state, { get: __assign({}, state.get, { loading: true, options: { id: null }, id: ((/** @type {?} */ (action))).payload.id, object: null, error: null }) });
            case actionTypes.GET_SUCCESS:
                return __assign({}, state, { get: __assign({}, state.get, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.GET_FAILURE:
                return __assign({}, state, { get: __assign({}, state.get, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
            case actionTypes.LIST:
                return __assign({}, state, { list: __assign({}, state.list, { loading: true, options: ((/** @type {?} */ (action))).payload.params, objects: null, error: null }) });
            case actionTypes.LIST_SUCCESS:
                return __assign({}, state, { list: __assign({}, state.list, { loading: false, objects: ((/** @type {?} */ (action))).payload.result, error: null }) });
            case actionTypes.LIST_FAILURE:
                return __assign({}, state, { list: __assign({}, state.list, { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error }) });
            case actionTypes.CREATE:
                return __assign({}, state, { create: __assign({}, state.create, { loading: true, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.CREATE_SUCCESS:
                return __assign({}, state, { create: __assign({}, state.create, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.CREATE_FAILURE:
                return __assign({}, state, { create: __assign({}, state.create, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
            case actionTypes.UPDATE:
                return __assign({}, state, { update: __assign({}, state.update, { loading: true, id: ((/** @type {?} */ (action))).payload.item.id, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.UPDATE_SUCCESS:
                return __assign({}, state, { update: __assign({}, state.update, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.UPDATE_FAILURE:
                return __assign({}, state, { update: __assign({}, state.update, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
            case actionTypes.PATCH:
                return __assign({}, state, { patch: __assign({}, state.patch, { loading: true, id: ((/** @type {?} */ (action))).payload.item.id, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.PATCH_SUCCESS:
                return __assign({}, state, { patch: __assign({}, state.patch, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.PATCH_FAILURE:
                return __assign({}, state, { patch: __assign({}, state.patch, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
            case actionTypes.DELETE:
                return __assign({}, state, { delete: __assign({}, state.delete, { loading: true, id: ((/** @type {?} */ (action))).payload.item.id, object: null, error: null }) });
            case actionTypes.DELETE_SUCCESS:
                return __assign({}, state, { delete: __assign({}, state.delete, { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null }) });
            case actionTypes.DELETE_FAILURE:
                return __assign({}, state, { delete: __assign({}, state.delete, { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error }) });
            case actionTypes.DELETE_ALL:
                return __assign({}, state, { deleteAll: __assign({}, state.deleteAll, { loading: true, ids: ((/** @type {?} */ (action))).payload.items.map((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i.id; })), objects: null, error: null }) });
            case actionTypes.DELETE_ALL_SUCCESS:
                return __assign({}, state, { deleteAll: __assign({}, state.deleteAll, { loading: false, objects: ((/** @type {?} */ (action))).payload.items, error: null }) });
            case actionTypes.DELETE_ALL_FAILURE:
                return __assign({}, state, { deleteAll: __assign({}, state.deleteAll, { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error }) });
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
     * @template M, S, A, A1, A2, A3, A4, A5, A6, A7
     */
    var   /**
     * @abstract
     * @template M, S, A, A1, A2, A3, A4, A5, A6, A7
     */
    ModelEffects = /** @class */ (function () {
        function ModelEffects(_actions, _service, _manager, _params) {
            var _this = this;
            this._actions = _actions;
            this._service = _service;
            this._manager = _manager;
            this._params = _params;
            this.modelGet$ = this._actions
                .pipe(effects.ofType(this._params.getActionType), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this._manager.get(action.payload.id)
                    .pipe(operators.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return new _this._params.getSuccessAction({ item: item }); })), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return rxjs.of(new _this._params.getFailureAction({ error: error })); })));
            })));
            this.modelList$ = this._actions
                .pipe(effects.ofType(this._params.listActionType), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this._manager.list(action.payload.params)
                    .pipe(operators.map((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) { return new _this._params.listSuccessAction({ result: result }); })), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return rxjs.of(new _this._params.listFailureAction({ error: error })); })));
            })));
            this.modelCreate$ = this._actions
                .pipe(effects.ofType(this._params.createActionType), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this._manager.create(action.payload.item)
                    .pipe(operators.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return new _this._params.createSuccessAction({ item: item }); })), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return rxjs.of(new _this._params.createFailureAction({ error: error })); })));
            })));
            this.modelUpdate$ = this._actions
                .pipe(effects.ofType(this._params.updateActionType), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this._manager.update(action.payload.item.id, action.payload.item)
                    .pipe(operators.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return new _this._params.updateSuccessAction({ item: item }); })), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return rxjs.of(new _this._params.updateFailureAction({ error: error })); })));
            })));
            this.modelPatch$ = this._actions
                .pipe(effects.ofType(this._params.patchActionType), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this._manager.patch(action.payload.item.id, action.payload.item)
                    .pipe(operators.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return new _this._params.patchSuccessAction({ item: item }); })), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return rxjs.of(new _this._params.patchFailureAction({ error: error })); })));
            })));
            this.modelDelete$ = this._actions
                .pipe(effects.ofType(this._params.deleteActionType), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this._manager.delete(action.payload.item.id)
                    .pipe(operators.map((/**
                 * @return {?}
                 */
                function () { return new _this._params.deleteSuccessAction({ item: action.payload.item }); })), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return rxjs.of(new _this._params.deleteFailureAction({ error: error })); })));
            })));
            this.modelDeleteAll$ = this._actions
                .pipe(effects.ofType(this._params.deleteAllActionType), operators.switchMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                return _this._manager.deleteAll(action.payload.items.map((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return i.id; })))
                    .pipe(operators.map((/**
                 * @return {?}
                 */
                function () { return new _this._params.deleteAllSuccessAction({ items: action.payload.items }); })), operators.catchError((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return rxjs.of(new _this._params.deleteAllFailureAction({ error: error })); })));
            })));
        }
        return ModelEffects;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @abstract
     * @template M
     */
    var   /**
     * @abstract
     * @template M
     */
    ModelManager = /** @class */ (function () {
        function ModelManager(_config, _endPoint, _http) {
            this._config = _config;
            this._endPoint = _endPoint;
            this._http = _http;
            this._baseUrl = "" + this._config.baseApiUrl + this._endPoint;
        }
        Object.defineProperty(ModelManager.prototype, "endPoint", {
            get: /**
             * @protected
             * @return {?}
             */
            function () { return this._endPoint; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} id
         * @return {?}
         */
        ModelManager.prototype.get = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            return this._http.get(this._getObjectUrl(id));
        };
        /**
         * @param {?=} options
         * @return {?}
         */
        ModelManager.prototype.list = /**
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            /** @type {?} */
            var params = this._listParamsToQueryParameters(options);
            return this._http.get("" + this._getListUrl() + params);
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ModelManager.prototype.create = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return this._http.post(this._getListUrl(), data);
        };
        /**
         * @param {?} id
         * @param {?} data
         * @return {?}
         */
        ModelManager.prototype.update = /**
         * @param {?} id
         * @param {?} data
         * @return {?}
         */
        function (id, data) {
            return this._http.put(this._getObjectUrl(id), data);
        };
        /**
         * @param {?} id
         * @param {?} data
         * @return {?}
         */
        ModelManager.prototype.patch = /**
         * @param {?} id
         * @param {?} data
         * @return {?}
         */
        function (id, data) {
            return this._http.patch(this._getObjectUrl(id), data);
        };
        /**
         * @param {?} id
         * @return {?}
         */
        ModelManager.prototype.delete = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            return this._http.delete(this._getObjectUrl(id));
        };
        /**
         * @param {?} ids
         * @return {?}
         */
        ModelManager.prototype.deleteAll = /**
         * @param {?} ids
         * @return {?}
         */
        function (ids) {
            /** @type {?} */
            var url = this._baseUrl + "/delete_all";
            if (this._config.addTrailingSlash) {
                url = url + "/";
            }
            return this._http.post(url, { ids: ids });
        };
        /**
         * @private
         * @param {?} id
         * @return {?}
         */
        ModelManager.prototype._getObjectUrl = /**
         * @private
         * @param {?} id
         * @return {?}
         */
        function (id) {
            /** @type {?} */
            var url = this._baseUrl + "/" + id;
            if (this._config.addTrailingSlash) {
                url = url + "/";
            }
            return url;
        };
        /**
         * @private
         * @return {?}
         */
        ModelManager.prototype._getListUrl = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var url = this._baseUrl;
            if (this._config.addTrailingSlash) {
                url = url + "/";
            }
            return url;
        };
        /**
         * @private
         * @param {?=} options
         * @return {?}
         */
        ModelManager.prototype._listParamsToQueryParameters = /**
         * @private
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            /** @type {?} */
            var params = '';
            /** @type {?} */
            var paramsArray = [];
            if (options) {
                if (options.limit) {
                    paramsArray.push("limit=" + options.limit);
                }
                if (options.start) {
                    paramsArray.push("start=" + options.start);
                }
                if (options.sort) {
                    /** @type {?} */
                    var props = Object.keys(options.sort);
                    paramsArray.push("sort=" + props.map((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) { return p + ":" + (/** @type {?} */ (options.sort))[p]; })).join(','));
                }
                if (options.fields) {
                    paramsArray.push("fields=" + options.fields.join(','));
                }
                if (options.joins) {
                    paramsArray.push("joins=" + options.joins.map((/**
                     * @param {?} j
                     * @return {?}
                     */
                    function (j) {
                        /** @type {?} */
                        var join = j.model + "." + j.property;
                        if (j.fields) {
                            return join + "." + j.fields.join(';');
                        }
                        return join;
                    })).join(','));
                }
                if (paramsArray.length > 0) {
                    params = "?" + paramsArray.join('&');
                }
            }
            return params;
        };
        return ModelManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MODEL_OPTIONS = new core.InjectionToken('MODEL_OPTIONS', {
        providedIn: 'root',
        factory: (/**
         * @return {?}
         */
        function () { return ({
            baseApiUrl: '/'
        }); })
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
        return new type({ id: id });
    }
    /**
     * @template T
     * @param {?} type
     * @param {?} params
     * @return {?}
     */
    function createListAction(type, params) {
        return new type({ params: params });
    }
    /**
     * @template T, M
     * @param {?} type
     * @param {?} item
     * @return {?}
     */
    function createCreateAction(type, item) {
        return new type({ item: item });
    }
    /**
     * @template T, M
     * @param {?} type
     * @param {?} item
     * @return {?}
     */
    function createUpdateAction(type, item) {
        return new type({ item: item });
    }
    /**
     * @template T, M
     * @param {?} type
     * @param {?} item
     * @return {?}
     */
    function createPatchAction(type, item) {
        return new type({ item: item });
    }
    /**
     * @template T, M
     * @param {?} type
     * @param {?} item
     * @return {?}
     */
    function createDeleteAction(type, item) {
        return new type({ item: item });
    }
    /**
     * @template T, M
     * @param {?} type
     * @param {?} items
     * @return {?}
     */
    function createDeleteAllAction(type, items) {
        return new type({ items: items });
    }
    /**
     * @abstract
     * @template T, S, A1, A2, A3, A4, A5, A6, A7
     */
    var   /**
     * @abstract
     * @template T, S, A1, A2, A3, A4, A5, A6, A7
     */
    ModelService = /** @class */ (function () {
        function ModelService(_store, _actions, _getAction, _listAction, _createAction, _updateAction, _patchAction, _deleteAction, _deleteAllAction, statePrefixes) {
            this._store = _store;
            this._actions = _actions;
            this._getAction = _getAction;
            this._listAction = _listAction;
            this._createAction = _createAction;
            this._updateAction = _updateAction;
            this._patchAction = _patchAction;
            this._deleteAction = _deleteAction;
            this._deleteAllAction = _deleteAllAction;
            /** @type {?} */
            var packageState = store.createFeatureSelector(statePrefixes[0]);
            this._modelState = store.createSelector(packageState, (/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return (/** @type {?} */ (((/** @type {?} */ (s)))[statePrefixes[1]])); }));
        }
        /**
         * @return {?}
         */
        ModelService.prototype.getGetLoading = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.get.loading; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getGetOptions = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.get.options; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getGetId = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.get.id; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getGetObject = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.get.object; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getGetError = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.get.error; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getListLoading = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.list.loading; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getListOptions = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.list.options; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getListObjects = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.list.objects; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getListError = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.list.error; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getListHasNext = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.list.objects && state.list.objects.next; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getListCurrentStart = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                if (state.list.options && state.list.options.start != null) {
                    return state.list.options.start;
                }
                return 1;
            }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getCreateLoading = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.create.loading; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getCreateObject = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.create.object; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getCreateError = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.create.error; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getUpdateLoading = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.update.loading; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getUpdateId = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.update.id; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getUpdateObject = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.update.object; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getUpdateError = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.update.error; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getPatchLoading = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.patch.loading; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getPatchId = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.patch.id; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getPatchObject = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.patch.object; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getPatchError = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.patch.error; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteLoading = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.delete.loading; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteId = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.delete.id; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteObject = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.delete.object; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteError = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.delete.error; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteAllLoading = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.deleteAll.loading; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteAllIds = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.deleteAll.ids; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteAllObjects = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.deleteAll.objects; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteAllError = /**
         * @return {?}
         */
        function () {
            return this._store.pipe(store.select(store.createSelector(this._modelState, (/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.deleteAll.error; }))));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getCreateSuccess = /**
         * @return {?}
         */
        function () {
            return this._actions.pipe(effects.ofType(new this._createAction((/** @type {?} */ (null))).type));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getUpdateSuccess = /**
         * @return {?}
         */
        function () {
            return this._actions.pipe(effects.ofType(new this._updateAction((/** @type {?} */ (null))).type));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getPatchSuccess = /**
         * @return {?}
         */
        function () {
            return this._actions.pipe(effects.ofType(new this._patchAction((/** @type {?} */ (null))).type));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteSuccess = /**
         * @return {?}
         */
        function () {
            return this._actions.pipe(effects.ofType(new this._deleteAction((/** @type {?} */ (null))).type));
        };
        /**
         * @return {?}
         */
        ModelService.prototype.getDeleteAllSuccess = /**
         * @return {?}
         */
        function () {
            return this._actions.pipe(effects.ofType(new this._deleteAllAction((/** @type {?} */ (null))).type));
        };
        /**
         * @param {?} id
         * @return {?}
         */
        ModelService.prototype.get = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this._store.dispatch(createGetAction(this._getAction, id));
        };
        /**
         * @param {?=} options
         * @return {?}
         */
        ModelService.prototype.list = /**
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            this._store.dispatch(createListAction(this._listAction, options || {}));
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ModelService.prototype.create = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._store.dispatch(createCreateAction(this._createAction, data));
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ModelService.prototype.update = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._store.dispatch(createUpdateAction(this._updateAction, data));
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ModelService.prototype.patch = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._store.dispatch(createPatchAction(this._patchAction, data));
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ModelService.prototype.delete = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._store.dispatch(createDeleteAction(this._deleteAction, data));
        };
        /**
         * @param {?} data
         * @return {?}
         */
        ModelService.prototype.deleteAll = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._store.dispatch(createDeleteAllAction(this._deleteAllAction, data));
        };
        return ModelService;
    }());

    exports.ModelActions = modelActions;
    exports.reducers = reducers;
    exports.ModelEffects = ModelEffects;
    exports.ModelManager = ModelManager;
    exports.MODEL_OPTIONS = MODEL_OPTIONS;
    exports.generateInitialModelState = generateInitialModelState;
    exports.modelReducer = modelReducer;
    exports.ModelService = ModelService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-model.umd.js.map
