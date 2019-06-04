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
import { __extends, __assign } from 'tslib';
import { type } from '@gngt/core/reducers';
import { of, throwError, pipe } from 'rxjs';
import { mergeMap, map, catchError, filter, tap } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { v4 } from 'uuid';
import { InjectionToken } from '@angular/core';
import { select, createSelector, createFeatureSelector } from '@ngrx/store';

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
        LIST: type("[" + typeName + "] List"),
        LIST_FAILURE: type("[" + typeName + "] List failure"),
        LIST_SUCCESS: type("[" + typeName + "] List success"),
        GET: type("[" + typeName + "] Get"),
        GET_FAILURE: type("[" + typeName + "] Get failure"),
        GET_SUCCESS: type("[" + typeName + "] Get success"),
        CREATE: type("[" + typeName + "] Create"),
        CREATE_FAILURE: type("[" + typeName + "] Create failure"),
        CREATE_SUCCESS: type("[" + typeName + "] Create success"),
        UPDATE: type("[" + typeName + "] Update"),
        UPDATE_FAILURE: type("[" + typeName + "] Update failure"),
        UPDATE_SUCCESS: type("[" + typeName + "] Update success"),
        PATCH: type("[" + typeName + "] Patch"),
        PATCH_FAILURE: type("[" + typeName + "] Patch failure"),
        PATCH_SUCCESS: type("[" + typeName + "] Patch success"),
        DELETE: type("[" + typeName + "] Delete"),
        DELETE_FAILURE: type("[" + typeName + "] Delete failure"),
        DELETE_SUCCESS: type("[" + typeName + "] Delete success"),
        DELETE_ALL: type("[" + typeName + "] Delete all"),
        DELETE_ALL_FAILURE: type("[" + typeName + "] Delete all failure"),
        DELETE_ALL_SUCCESS: type("[" + typeName + "] Delete all success"),
        QUERY: type("[" + typeName + "] Query"),
        QUERY_FAILURE: type("[" + typeName + "] Query failure"),
        QUERY_SUCCESS: type("[" + typeName + "] Query success"),
    };
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelBaseAction = /** @class */ (function () {
    function ModelBaseAction(payload) {
        this.payload = payload;
    }
    return ModelBaseAction;
}());
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelGetAction = /** @class */ (function (_super) {
    __extends(ModelGetAction, _super);
    function ModelGetAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelGetAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelGetSuccessAction = /** @class */ (function (_super) {
    __extends(ModelGetSuccessAction, _super);
    function ModelGetSuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelGetSuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelGetFailureAction = /** @class */ (function (_super) {
    __extends(ModelGetFailureAction, _super);
    function ModelGetFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelGetFailureAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelListAction = /** @class */ (function (_super) {
    __extends(ModelListAction, _super);
    function ModelListAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelListAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelListSuccessAction = /** @class */ (function (_super) {
    __extends(ModelListSuccessAction, _super);
    function ModelListSuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelListSuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelListFailureAction = /** @class */ (function (_super) {
    __extends(ModelListFailureAction, _super);
    function ModelListFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelListFailureAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelCreateAction = /** @class */ (function (_super) {
    __extends(ModelCreateAction, _super);
    function ModelCreateAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelCreateAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelCreateSuccessAction = /** @class */ (function (_super) {
    __extends(ModelCreateSuccessAction, _super);
    function ModelCreateSuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelCreateSuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelCreateFailureAction = /** @class */ (function (_super) {
    __extends(ModelCreateFailureAction, _super);
    function ModelCreateFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelCreateFailureAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelUpdateAction = /** @class */ (function (_super) {
    __extends(ModelUpdateAction, _super);
    function ModelUpdateAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelUpdateAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelUpdateSuccessAction = /** @class */ (function (_super) {
    __extends(ModelUpdateSuccessAction, _super);
    function ModelUpdateSuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelUpdateSuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelUpdateFailureAction = /** @class */ (function (_super) {
    __extends(ModelUpdateFailureAction, _super);
    function ModelUpdateFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelUpdateFailureAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelPatchAction = /** @class */ (function (_super) {
    __extends(ModelPatchAction, _super);
    function ModelPatchAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelPatchAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelPatchSuccessAction = /** @class */ (function (_super) {
    __extends(ModelPatchSuccessAction, _super);
    function ModelPatchSuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelPatchSuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelPatchFailureAction = /** @class */ (function (_super) {
    __extends(ModelPatchFailureAction, _super);
    function ModelPatchFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelPatchFailureAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelDeleteAction = /** @class */ (function (_super) {
    __extends(ModelDeleteAction, _super);
    function ModelDeleteAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelDeleteAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelDeleteSuccessAction = /** @class */ (function (_super) {
    __extends(ModelDeleteSuccessAction, _super);
    function ModelDeleteSuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelDeleteSuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelDeleteFailureAction = /** @class */ (function (_super) {
    __extends(ModelDeleteFailureAction, _super);
    function ModelDeleteFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelDeleteFailureAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelDeleteAllAction = /** @class */ (function (_super) {
    __extends(ModelDeleteAllAction, _super);
    function ModelDeleteAllAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelDeleteAllAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelDeleteAllSuccessAction = /** @class */ (function (_super) {
    __extends(ModelDeleteAllSuccessAction, _super);
    function ModelDeleteAllSuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelDeleteAllSuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelDeleteAllFailureAction = /** @class */ (function (_super) {
    __extends(ModelDeleteAllFailureAction, _super);
    function ModelDeleteAllFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelDeleteAllFailureAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelQueryAction = /** @class */ (function (_super) {
    __extends(ModelQueryAction, _super);
    function ModelQueryAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelQueryAction;
}(ModelBaseAction));
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
ModelQuerySuccessAction = /** @class */ (function (_super) {
    __extends(ModelQuerySuccessAction, _super);
    function ModelQuerySuccessAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelQuerySuccessAction;
}(ModelBaseAction));
/**
 * @abstract
 */
var /**
 * @abstract
 */
ModelQueryFailureAction = /** @class */ (function (_super) {
    __extends(ModelQueryFailureAction, _super);
    function ModelQueryFailureAction(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    return ModelQueryFailureAction;
}(ModelBaseAction));

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
var stateQueueLimit = 20;
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
            return __assign({}, state, { get: [{
                        uuid: action.uuid,
                        loading: true,
                        options: { id: null },
                        id: ((/** @type {?} */ (action))).payload.id,
                        object: null,
                        error: null
                    }].concat(state.get.slice(0, stateQueueLimit - 1)) });
        case actionTypes.GET_SUCCESS:
            /** @type {?} */
            var successGetIdx = state.get.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successGetIdx >= 0) {
                return __assign({}, state, { get: state.get.slice(0, successGetIdx).concat([__assign({}, state.get[successGetIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null })], state.get.slice(successGetIdx + 1)) });
            }
            return state;
        case actionTypes.GET_FAILURE:
            /** @type {?} */
            var failureGetIdx = state.get.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failureGetIdx >= 0) {
                return __assign({}, state, { get: state.get.slice(0, failureGetIdx).concat([__assign({}, state.get[failureGetIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error })], state.get.slice(failureGetIdx + 1)) });
            }
            return state;
        case actionTypes.LIST:
            return __assign({}, state, { list: [{
                        uuid: action.uuid,
                        loading: true,
                        options: ((/** @type {?} */ (action))).payload.params,
                        objects: null,
                        error: null
                    }].concat(state.list.slice(0, stateQueueLimit - 1)) });
        case actionTypes.LIST_SUCCESS:
            /** @type {?} */
            var successListIdx = state.list.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successListIdx >= 0) {
                return __assign({}, state, { list: state.list.slice(0, successListIdx).concat([__assign({}, state.list[successListIdx], { loading: false, objects: ((/** @type {?} */ (action))).payload.result, error: null })], state.list.slice(successListIdx + 1)) });
            }
            return state;
        case actionTypes.LIST_FAILURE:
            /** @type {?} */
            var failureListIdx = state.list.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failureListIdx >= 0) {
                return __assign({}, state, { list: state.list.slice(0, failureListIdx).concat([__assign({}, state.list[failureListIdx], { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error })], state.list.slice(failureListIdx + 1)) });
            }
            return state;
        case actionTypes.CREATE:
            return __assign({}, state, { create: [{
                        uuid: action.uuid,
                        loading: true,
                        object: ((/** @type {?} */ (action))).payload.item,
                        error: null
                    }].concat(state.create.slice(0, stateQueueLimit - 1)) });
        case actionTypes.CREATE_SUCCESS:
            /** @type {?} */
            var successCreateIdx = state.create.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successCreateIdx >= 0) {
                return __assign({}, state, { create: state.create.slice(0, successCreateIdx).concat([__assign({}, state.create[successCreateIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null })], state.create.slice(successCreateIdx + 1)) });
            }
            return state;
        case actionTypes.CREATE_FAILURE:
            /** @type {?} */
            var failureCreateIdx = state.create.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failureCreateIdx >= 0) {
                return __assign({}, state, { create: state.create.slice(0, failureCreateIdx).concat([__assign({}, state.create[failureCreateIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error })], state.create.slice(failureCreateIdx + 1)) });
            }
            return state;
        case actionTypes.UPDATE:
            return __assign({}, state, { update: [{
                        uuid: action.uuid,
                        loading: true,
                        id: ((/** @type {?} */ (action))).payload.item.id,
                        object: ((/** @type {?} */ (action))).payload.item,
                        error: null
                    }].concat(state.update.slice(0, stateQueueLimit - 1)) });
        case actionTypes.UPDATE_SUCCESS:
            /** @type {?} */
            var successUpdateIdx = state.update.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successUpdateIdx >= 0) {
                return __assign({}, state, { update: state.update.slice(0, successUpdateIdx).concat([__assign({}, state.update[successUpdateIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null })], state.update.slice(successUpdateIdx + 1)) });
            }
            return state;
        case actionTypes.UPDATE_FAILURE:
            /** @type {?} */
            var failureUpdateIdx = state.update.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failureUpdateIdx >= 0) {
                return __assign({}, state, { update: state.update.slice(0, failureUpdateIdx).concat([__assign({}, state.update[failureUpdateIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error })], state.update.slice(failureUpdateIdx + 1)) });
            }
            return state;
        case actionTypes.PATCH:
            return __assign({}, state, { patch: [{
                        uuid: action.uuid,
                        loading: true,
                        id: ((/** @type {?} */ (action))).payload.item.id,
                        object: ((/** @type {?} */ (action))).payload.item,
                        error: null
                    }].concat(state.patch.slice(0, stateQueueLimit - 1)) });
        case actionTypes.PATCH_SUCCESS:
            /** @type {?} */
            var successPatchIdx = state.patch.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successPatchIdx >= 0) {
                return __assign({}, state, { patch: state.patch.slice(0, successPatchIdx).concat([__assign({}, state.patch[successPatchIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null })], state.patch.slice(successPatchIdx + 1)) });
            }
            return state;
        case actionTypes.PATCH_FAILURE:
            /** @type {?} */
            var failurePatchIdx = state.patch.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failurePatchIdx >= 0) {
                return __assign({}, state, { patch: state.patch.slice(0, failurePatchIdx).concat([__assign({}, state.patch[failurePatchIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error })], state.patch.slice(failurePatchIdx + 1)) });
            }
            return state;
        case actionTypes.DELETE:
            return __assign({}, state, { delete: [{
                        uuid: action.uuid,
                        loading: true,
                        id: ((/** @type {?} */ (action))).payload.item.id,
                        object: null,
                        error: null
                    }].concat(state.delete.slice(0, stateQueueLimit - 1)) });
        case actionTypes.DELETE_SUCCESS:
            /** @type {?} */
            var successDeleteIdx = state.delete.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successDeleteIdx >= 0) {
                return __assign({}, state, { delete: state.delete.slice(0, successDeleteIdx).concat([__assign({}, state.delete[successDeleteIdx], { loading: false, object: ((/** @type {?} */ (action))).payload.item, error: null })], state.delete.slice(successDeleteIdx + 1)) });
            }
            return state;
        case actionTypes.DELETE_FAILURE:
            /** @type {?} */
            var failureDeleteIdx = state.delete.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failureDeleteIdx >= 0) {
                return __assign({}, state, { delete: state.delete.slice(0, failureDeleteIdx).concat([__assign({}, state.delete[failureDeleteIdx], { loading: false, object: null, error: ((/** @type {?} */ (action))).payload.error })], state.delete.slice(failureDeleteIdx + 1)) });
            }
            return state;
        case actionTypes.DELETE_ALL:
            return __assign({}, state, { deleteAll: [{
                        uuid: action.uuid,
                        loading: true,
                        ids: ((/** @type {?} */ (action))).payload.items.map((/**
                         * @param {?} i
                         * @return {?}
                         */
                        function (i) { return i.id; })),
                        objects: null,
                        error: null
                    }].concat(state.deleteAll.slice(0, stateQueueLimit - 1)) });
        case actionTypes.DELETE_ALL_SUCCESS:
            /** @type {?} */
            var successDeleteAllIdx = state.deleteAll.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successDeleteAllIdx >= 0) {
                return __assign({}, state, { deleteAll: state.deleteAll.slice(0, successDeleteAllIdx).concat([__assign({}, state.deleteAll[successDeleteAllIdx], { loading: false, objects: ((/** @type {?} */ (action))).payload.items, error: null })], state.deleteAll.slice(successDeleteAllIdx + 1)) });
            }
            return state;
        case actionTypes.DELETE_ALL_FAILURE:
            /** @type {?} */
            var failureDeleteAllIdx = state.deleteAll.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failureDeleteAllIdx >= 0) {
                return __assign({}, state, { deleteAll: state.deleteAll.slice(0, failureDeleteAllIdx).concat([__assign({}, state.deleteAll[failureDeleteAllIdx], { loading: false, objects: null, error: ((/** @type {?} */ (action))).payload.error })], state.deleteAll.slice(failureDeleteAllIdx + 1)) });
            }
            return state;
        case actionTypes.QUERY:
            return __assign({}, state, { query: [{
                        uuid: action.uuid,
                        loading: true,
                        options: ((/** @type {?} */ (action))).payload.params,
                        objects: null,
                        error: null
                    }].concat(state.query.slice(0, stateQueueLimit - 1)) });
        case actionTypes.QUERY_SUCCESS:
            /** @type {?} */
            var successQueryIdx = state.query.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (successQueryIdx >= 0) {
                return __assign({}, state, { query: state.query.slice(0, successQueryIdx).concat([__assign({}, state.query[successQueryIdx], { loading: false, options: __assign({}, (/** @type {?} */ (state.query[successQueryIdx].options))), objects: ((/** @type {?} */ (action))).payload.result, error: null })], state.query.slice(successQueryIdx + 1)) });
            }
            return state;
        case actionTypes.QUERY_FAILURE:
            /** @type {?} */
            var failureQueryIdx = state.query.findIndex((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return g.uuid === action.uuid; }));
            if (failureQueryIdx >= 0) {
                return __assign({}, state, { query: state.query.slice(0, failureQueryIdx).concat([__assign({}, state.query[failureQueryIdx], { loading: false, options: __assign({}, (/** @type {?} */ (state.query[failureQueryIdx].options))), objects: null, error: ((/** @type {?} */ (action))).payload.error })], state.query.slice(failureQueryIdx + 1)) });
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

var ModelGenericAction = /** @class */ (function () {
    function ModelGenericAction(payload) {
        this.payload = payload;
    }
    return ModelGenericAction;
}());

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
    var action = new ModelGenericAction(params.payload);
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
var  /**
 * @abstract
 * @template M, S, A, AT
 */
ModelEffects = /** @class */ (function () {
    function ModelEffects(_actions, _service, _manager, _actionTypes) {
        var _this = this;
        this._actions = _actions;
        this._service = _service;
        this._manager = _manager;
        this._actionTypes = _actionTypes;
        this.modelGet$ = this._actions.pipe(ofType(this._actionTypes.GET), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.get(action.payload.id).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return createAction({
            type: _this._actionTypes.GET_SUCCESS,
            payload: { item: item },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.GET_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
        this.modelList$ = this._actions.pipe(ofType(this._actionTypes.LIST), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.list(action.payload.params).pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return createAction({
            type: _this._actionTypes.LIST_SUCCESS,
            payload: { result: result },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.LIST_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
        this.modelCreate$ = this._actions.pipe(ofType(this._actionTypes.CREATE), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.create(action.payload.item).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return createAction({
            type: _this._actionTypes.CREATE_SUCCESS,
            payload: { item: item },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.CREATE_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
        this.modelUpdate$ = this._actions
            .pipe(ofType(this._actionTypes.UPDATE), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.update(action.payload.item.id, action.payload.item).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return createAction({
            type: _this._actionTypes.UPDATE_SUCCESS,
            payload: { item: item },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.CREATE_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
        this.modelPatch$ = this._actions.pipe(ofType(this._actionTypes.PATCH), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.patch(action.payload.item.id, action.payload.item).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return createAction({
            type: _this._actionTypes.CREATE_SUCCESS,
            payload: { item: item },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.CREATE_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
        this.modelDelete$ = this._actions.pipe(ofType(this._actionTypes.DELETE), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.delete(action.payload.item.id).pipe(map((/**
         * @return {?}
         */
        function () { return createAction({
            type: _this._actionTypes.DELETE_SUCCESS,
            payload: { item: action.payload.item },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.DELETE_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
        this.modelDeleteAll$ = this._actions.pipe(ofType(this._actionTypes.DELETE_ALL), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.deleteAll(action.payload.items.map((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return i.id; }))).pipe(map((/**
         * @return {?}
         */
        function () { return createAction({
            type: _this._actionTypes.DELETE_ALL_SUCCESS,
            payload: { items: action.payload.items },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.DELETE_ALL_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
        this.modelQuery$ = this._actions.pipe(ofType(this._actionTypes.QUERY), mergeMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this._manager.query(action.payload.params).pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return createAction({
            type: _this._actionTypes.QUERY_SUCCESS,
            payload: { result: result },
            uuid: action.uuid
        }); })), catchError((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return of(createAction({
            type: _this._actionTypes.QUERY_FAILURE,
            payload: { error: error },
            uuid: action.uuid
        })); }))); })));
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
var  /**
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
     * @param {?} params
     * @return {?}
     */
    ModelManager.prototype.query = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var url = this._baseUrl + "/query";
        if (this._config.addTrailingSlash) {
            url = url + "/";
        }
        return this._http.post(url, params);
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
var MODEL_OPTIONS = new InjectionToken('MODEL_OPTIONS', {
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
 * @abstract
 * @template T, S, A
 */
var  /**
 * @abstract
 * @template T, S, A
 */
ModelService = /** @class */ (function () {
    function ModelService(_store, _actions, _actionTypes, statePrefixes) {
        this._store = _store;
        this._actions = _actions;
        this._actionTypes = _actionTypes;
        /** @type {?} */
        var packageState = createFeatureSelector(statePrefixes[0]);
        this._modelState = createSelector(packageState, (/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return (/** @type {?} */ (((/** @type {?} */ (s)))[statePrefixes[1]])); }));
        this._lastGetEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.get; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
        this._lastListEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.list; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
        this._lastCreateEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.create; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
        this._lastPatchEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.patch; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
        this._lastUpdateEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.update; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
        this._lastDeleteEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.delete; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
        this._lastDeleteAllEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.deleteAll; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
        this._lastQueryEntry = pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.query; }))), filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.length > 0; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g[0]; })));
    }
    /**
     * @return {?}
     */
    ModelService.prototype.getGetLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getGetOptions = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.options; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getGetId = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.id; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getGetObject = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.object; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getGetError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastGetEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getListLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getListOptions = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.options; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getListObjects = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.objects; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getListError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastListEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getListHasNext = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastListEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.objects != null; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return (/** @type {?} */ (g.objects)).next; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getListCurrentStart = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastListEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.options != null; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return (/** @type {?} */ (g.options)).start != null ? (/** @type {?} */ (g.options)).start : 1; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getCreateLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastCreateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getCreateObject = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastCreateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.object; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getCreateError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastCreateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getUpdateLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getUpdateId = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.id; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getUpdateObject = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.object; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getUpdateError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastUpdateEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getPatchLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getPatchId = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.id; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getPatchObject = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.object; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getPatchError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastPatchEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteId = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.id; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteObject = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.object; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteAllLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteAllIds = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.ids; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteAllObjects = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.objects; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteAllError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastDeleteAllEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getQueryLoading = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.loading; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getQueryOptions = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.options; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getQueryObjects = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.objects; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getQueryError = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastQueryEntry, map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.error; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getQueryHasNext = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastQueryEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.objects != null; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return (/** @type {?} */ (g.objects)).next; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getQueryCurrentStart = /**
     * @return {?}
     */
    function () {
        return this._store.pipe(this._lastQueryEntry, filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.options != null; })), map((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return (/** @type {?} */ (g.options)).start != null ? (/** @type {?} */ (g.options)).start : 1; })));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getCreateSuccess = /**
     * @return {?}
     */
    function () {
        return this._actions.pipe(ofType(this._actionTypes.CREATE_SUCCESS));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getUpdateSuccess = /**
     * @return {?}
     */
    function () {
        return this._actions.pipe(ofType(this._actionTypes.UPDATE_SUCCESS));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getPatchSuccess = /**
     * @return {?}
     */
    function () {
        return this._actions.pipe(ofType(this._actionTypes.PATCH_SUCCESS));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteSuccess = /**
     * @return {?}
     */
    function () {
        return this._actions.pipe(ofType(this._actionTypes.DELETE_SUCCESS));
    };
    /**
     * @return {?}
     */
    ModelService.prototype.getDeleteAllSuccess = /**
     * @return {?}
     */
    function () {
        return this._actions.pipe(ofType(this._actionTypes.DELETE_ALL_SUCCESS));
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
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.GET,
            payload: { id: id }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.get; }))), map((/**
         * @param {?} gets
         * @return {?}
         */
        function (gets) { return gets.find((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return g.uuid === action.uuid; })); })), filter((/**
         * @param {?} get
         * @return {?}
         */
        function (get) { return get != null; })), tap((/**
         * @param {?} get
         * @return {?}
         */
        function (get) {
            if ((/** @type {?} */ (get)).error != null) {
                throwError((/** @type {?} */ (get)).error);
            }
        })), filter((/**
         * @param {?} get
         * @return {?}
         */
        function (get) { return (/** @type {?} */ (get)).object != null; })), map((/**
         * @param {?} get
         * @return {?}
         */
        function (get) { return (/** @type {?} */ ((/** @type {?} */ (get)).object)); })));
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
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.LIST,
            payload: { params: options || {} }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.list; }))), map((/**
         * @param {?} lists
         * @return {?}
         */
        function (lists) { return lists.find((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l.uuid === action.uuid; })); })), filter((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list != null; })), tap((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            if ((/** @type {?} */ (list)).error != null) {
                throwError((/** @type {?} */ (list)).error);
            }
        })), filter((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return (/** @type {?} */ (list)).objects != null; })), map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return (/** @type {?} */ ((/** @type {?} */ (list)).objects)); })));
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
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.CREATE,
            payload: { item: data },
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.create; }))), map((/**
         * @param {?} creates
         * @return {?}
         */
        function (creates) { return creates.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.uuid === action.uuid; })); })), filter((/**
         * @param {?} creates
         * @return {?}
         */
        function (creates) { return creates != null; })), tap((/**
         * @param {?} create
         * @return {?}
         */
        function (create) {
            if ((/** @type {?} */ (create)).error != null) {
                throwError((/** @type {?} */ (create)).error);
            }
        })), filter((/**
         * @param {?} create
         * @return {?}
         */
        function (create) { return (/** @type {?} */ (create)).object != null; })), map((/**
         * @param {?} create
         * @return {?}
         */
        function (create) { return (/** @type {?} */ ((/** @type {?} */ (create)).object)); })));
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
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.UPDATE,
            payload: { item: data },
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.update; }))), map((/**
         * @param {?} updates
         * @return {?}
         */
        function (updates) { return updates.find((/**
         * @param {?} u
         * @return {?}
         */
        function (u) { return u.uuid === action.uuid; })); })), filter((/**
         * @param {?} updates
         * @return {?}
         */
        function (updates) { return updates != null; })), tap((/**
         * @param {?} update
         * @return {?}
         */
        function (update) {
            if ((/** @type {?} */ (update)).error != null) {
                throwError((/** @type {?} */ (update)).error);
            }
        })), filter((/**
         * @param {?} update
         * @return {?}
         */
        function (update) { return (/** @type {?} */ (update)).object != null; })), map((/**
         * @param {?} update
         * @return {?}
         */
        function (update) { return (/** @type {?} */ ((/** @type {?} */ (update)).object)); })));
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
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.PATCH,
            payload: { item: data }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.patch; }))), map((/**
         * @param {?} patches
         * @return {?}
         */
        function (patches) { return patches.find((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p.uuid === action.uuid; })); })), filter((/**
         * @param {?} patches
         * @return {?}
         */
        function (patches) { return patches != null; })), tap((/**
         * @param {?} patch
         * @return {?}
         */
        function (patch) {
            if ((/** @type {?} */ (patch)).error != null) {
                throwError((/** @type {?} */ (patch)).error);
            }
        })), filter((/**
         * @param {?} patch
         * @return {?}
         */
        function (patch) { return (/** @type {?} */ (patch)).object != null; })), map((/**
         * @param {?} patch
         * @return {?}
         */
        function (patch) { return (/** @type {?} */ ((/** @type {?} */ (patch)).object)); })));
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
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.DELETE,
            payload: { item: data }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.delete; }))), map((/**
         * @param {?} dels
         * @return {?}
         */
        function (dels) { return dels.find((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.uuid === action.uuid; })); })), filter((/**
         * @param {?} dels
         * @return {?}
         */
        function (dels) { return dels != null; })), tap((/**
         * @param {?} del
         * @return {?}
         */
        function (del) {
            if ((/** @type {?} */ (del)).error != null) {
                throwError((/** @type {?} */ (del)).error);
            }
        })), filter((/**
         * @param {?} del
         * @return {?}
         */
        function (del) { return (/** @type {?} */ (del)).object != null; })), map((/**
         * @param {?} del
         * @return {?}
         */
        function (del) { return (/** @type {?} */ ((/** @type {?} */ (del)).object)); })));
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
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.DELETE_ALL,
            payload: { items: data }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.deleteAll; }))), map((/**
         * @param {?} deleteAlls
         * @return {?}
         */
        function (deleteAlls) { return deleteAlls.find((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.uuid === action.uuid; })); })), filter((/**
         * @param {?} deleteAlls
         * @return {?}
         */
        function (deleteAlls) { return deleteAlls != null; })), tap((/**
         * @param {?} deleteAll
         * @return {?}
         */
        function (deleteAll) {
            if ((/** @type {?} */ (deleteAll)).error != null) {
                throwError((/** @type {?} */ (deleteAll)).error);
            }
        })), filter((/**
         * @param {?} deleteAll
         * @return {?}
         */
        function (deleteAll) { return (/** @type {?} */ (deleteAll)).objects != null; })), map((/**
         * @param {?} deleteAll
         * @return {?}
         */
        function (deleteAll) { return (/** @type {?} */ ((/** @type {?} */ (deleteAll)).objects)); })));
    };
    /**
     * @param {?} options
     * @return {?}
     */
    ModelService.prototype.query = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var action = createAction({
            type: this._actionTypes.QUERY,
            payload: { params: options || {} }
        });
        this._store.dispatch(action);
        return this._store.pipe(select(createSelector(this._modelState, (/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return state.query; }))), map((/**
         * @param {?} queries
         * @return {?}
         */
        function (queries) { return queries.find((/**
         * @param {?} q
         * @return {?}
         */
        function (q) { return q.uuid === action.uuid; })); })), filter((/**
         * @param {?} queries
         * @return {?}
         */
        function (queries) { return queries != null; })), tap((/**
         * @param {?} query
         * @return {?}
         */
        function (query) {
            if ((/** @type {?} */ (query)).error != null) {
                throwError((/** @type {?} */ (query)).error);
            }
        })), filter((/**
         * @param {?} query
         * @return {?}
         */
        function (query) { return (/** @type {?} */ (query)).objects != null; })), map((/**
         * @param {?} query
         * @return {?}
         */
        function (query) { return (/** @type {?} */ ((/** @type {?} */ (query)).objects)); })));
    };
    return ModelService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MODEL_OPTIONS, modelActions as ModelActions, ModelEffects, ModelManager, ModelService, generateInitialModelState, modelReducer, reducers, ModelGenericAction as ɵa };
//# sourceMappingURL=model.es5.js.map
