import { type } from '@gngt/core/reducers';
import { createEffect, ofType } from '@ngrx/effects';
import { of, pipe, throwError } from 'rxjs';
import { mergeMap, map, catchError, filter, switchMap, tap, take } from 'rxjs/operators';
import { v4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Optional, InjectionToken } from '@angular/core';
import { ModelManager as ModelManager$1 } from '@gngt/core/common';
import { SyncService } from '@gngt/core/sync';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';

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
class ModelBaseAction {
    constructor(payload) {
        this.payload = payload;
    }
}
class ModelGetAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelGetSuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelGetFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelListAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelListSuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelListFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelCreateAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelCreateSuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelCreateFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelUpdateAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelUpdateSuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelUpdateFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelPatchAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelPatchSuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelPatchFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelDeleteAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelDeleteSuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelDeleteFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelDeleteAllAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelDeleteAllSuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelDeleteAllFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelQueryAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelQuerySuccessAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}
class ModelQueryFailureAction extends ModelBaseAction {
    constructor(payload) {
        super(payload);
        this.payload = payload;
    }
}

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
const stateQueueLimit = 20;
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
function modelReducer(state, action, actionTypes) {
    switch (action.type) {
        case actionTypes.GET:
            return Object.assign(Object.assign({}, state), { get: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        options: { id: null },
                        id: action.payload.id,
                        object: null,
                        error: null
                    },
                    ...state.get.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.GET_SUCCESS:
            const successGetIdx = state.get.findIndex(g => g.uuid === action.uuid);
            if (successGetIdx >= 0) {
                return Object.assign(Object.assign({}, state), { get: [
                        ...state.get.slice(0, successGetIdx),
                        Object.assign(Object.assign({}, state.get[successGetIdx]), { loading: false, object: action.payload.item, error: null }),
                        ...state.get.slice(successGetIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.GET_FAILURE:
            const failureGetIdx = state.get.findIndex(g => g.uuid === action.uuid);
            if (failureGetIdx >= 0) {
                return Object.assign(Object.assign({}, state), { get: [
                        ...state.get.slice(0, failureGetIdx),
                        Object.assign(Object.assign({}, state.get[failureGetIdx]), { loading: false, object: null, error: action.payload.error }),
                        ...state.get.slice(failureGetIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.LIST:
            return Object.assign(Object.assign({}, state), { list: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        options: action.payload.params,
                        objects: null,
                        error: null
                    },
                    ...state.list.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.LIST_SUCCESS:
            const successListIdx = state.list.findIndex(g => g.uuid === action.uuid);
            if (successListIdx >= 0) {
                return Object.assign(Object.assign({}, state), { list: [
                        ...state.list.slice(0, successListIdx),
                        Object.assign(Object.assign({}, state.list[successListIdx]), { loading: false, objects: action.payload.result, error: null }),
                        ...state.list.slice(successListIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.LIST_FAILURE:
            const failureListIdx = state.list.findIndex(g => g.uuid === action.uuid);
            if (failureListIdx >= 0) {
                return Object.assign(Object.assign({}, state), { list: [
                        ...state.list.slice(0, failureListIdx),
                        Object.assign(Object.assign({}, state.list[failureListIdx]), { loading: false, objects: null, error: action.payload.error }),
                        ...state.list.slice(failureListIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.CREATE:
            return Object.assign(Object.assign({}, state), { create: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        object: action.payload.item,
                        error: null
                    },
                    ...state.create.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.CREATE_SUCCESS:
            const successCreateIdx = state.create.findIndex(g => g.uuid === action.uuid);
            if (successCreateIdx >= 0) {
                return Object.assign(Object.assign({}, state), { create: [
                        ...state.create.slice(0, successCreateIdx),
                        Object.assign(Object.assign({}, state.create[successCreateIdx]), { loading: false, object: action.payload.item, error: null }),
                        ...state.create.slice(successCreateIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.CREATE_FAILURE:
            const failureCreateIdx = state.create.findIndex(g => g.uuid === action.uuid);
            if (failureCreateIdx >= 0) {
                return Object.assign(Object.assign({}, state), { create: [
                        ...state.create.slice(0, failureCreateIdx),
                        Object.assign(Object.assign({}, state.create[failureCreateIdx]), { loading: false, object: null, error: action.payload.error }),
                        ...state.create.slice(failureCreateIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.UPDATE:
            return Object.assign(Object.assign({}, state), { update: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        id: action.payload.item.id,
                        object: action.payload.item,
                        error: null
                    },
                    ...state.update.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.UPDATE_SUCCESS:
            const successUpdateIdx = state.update.findIndex(g => g.uuid === action.uuid);
            if (successUpdateIdx >= 0) {
                return Object.assign(Object.assign({}, state), { update: [
                        ...state.update.slice(0, successUpdateIdx),
                        Object.assign(Object.assign({}, state.update[successUpdateIdx]), { loading: false, object: action.payload.item, error: null }),
                        ...state.update.slice(successUpdateIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.UPDATE_FAILURE:
            const failureUpdateIdx = state.update.findIndex(g => g.uuid === action.uuid);
            if (failureUpdateIdx >= 0) {
                return Object.assign(Object.assign({}, state), { update: [
                        ...state.update.slice(0, failureUpdateIdx),
                        Object.assign(Object.assign({}, state.update[failureUpdateIdx]), { loading: false, object: null, error: action.payload.error }),
                        ...state.update.slice(failureUpdateIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.PATCH:
            return Object.assign(Object.assign({}, state), { patch: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        id: action.payload.item.id,
                        object: action.payload.item,
                        error: null
                    },
                    ...state.patch.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.PATCH_SUCCESS:
            const successPatchIdx = state.patch.findIndex(g => g.uuid === action.uuid);
            if (successPatchIdx >= 0) {
                return Object.assign(Object.assign({}, state), { patch: [
                        ...state.patch.slice(0, successPatchIdx),
                        Object.assign(Object.assign({}, state.patch[successPatchIdx]), { loading: false, object: action.payload.item, error: null }),
                        ...state.patch.slice(successPatchIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.PATCH_FAILURE:
            const failurePatchIdx = state.patch.findIndex(g => g.uuid === action.uuid);
            if (failurePatchIdx >= 0) {
                return Object.assign(Object.assign({}, state), { patch: [
                        ...state.patch.slice(0, failurePatchIdx),
                        Object.assign(Object.assign({}, state.patch[failurePatchIdx]), { loading: false, object: null, error: action.payload.error }),
                        ...state.patch.slice(failurePatchIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.DELETE:
            return Object.assign(Object.assign({}, state), { delete: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        id: action.payload.item.id,
                        object: null,
                        error: null
                    },
                    ...state.delete.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.DELETE_SUCCESS:
            const successDeleteIdx = state.delete.findIndex(g => g.uuid === action.uuid);
            if (successDeleteIdx >= 0) {
                return Object.assign(Object.assign({}, state), { delete: [
                        ...state.delete.slice(0, successDeleteIdx),
                        Object.assign(Object.assign({}, state.delete[successDeleteIdx]), { loading: false, object: action.payload.item, error: null }),
                        ...state.delete.slice(successDeleteIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.DELETE_FAILURE:
            const failureDeleteIdx = state.delete.findIndex(g => g.uuid === action.uuid);
            if (failureDeleteIdx >= 0) {
                return Object.assign(Object.assign({}, state), { delete: [
                        ...state.delete.slice(0, failureDeleteIdx),
                        Object.assign(Object.assign({}, state.delete[failureDeleteIdx]), { loading: false, object: null, error: action.payload.error }),
                        ...state.delete.slice(failureDeleteIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.DELETE_ALL:
            return Object.assign(Object.assign({}, state), { deleteAll: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        ids: action.payload.items.map(i => i.id),
                        objects: null,
                        error: null
                    },
                    ...state.deleteAll.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.DELETE_ALL_SUCCESS:
            const successDeleteAllIdx = state.deleteAll.findIndex(g => g.uuid === action.uuid);
            if (successDeleteAllIdx >= 0) {
                return Object.assign(Object.assign({}, state), { deleteAll: [
                        ...state.deleteAll.slice(0, successDeleteAllIdx),
                        Object.assign(Object.assign({}, state.deleteAll[successDeleteAllIdx]), { loading: false, objects: action.payload.items, error: null }),
                        ...state.deleteAll.slice(successDeleteAllIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.DELETE_ALL_FAILURE:
            const failureDeleteAllIdx = state.deleteAll.findIndex(g => g.uuid === action.uuid);
            if (failureDeleteAllIdx >= 0) {
                return Object.assign(Object.assign({}, state), { deleteAll: [
                        ...state.deleteAll.slice(0, failureDeleteAllIdx),
                        Object.assign(Object.assign({}, state.deleteAll[failureDeleteAllIdx]), { loading: false, objects: null, error: action.payload.error }),
                        ...state.deleteAll.slice(failureDeleteAllIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.QUERY:
            return Object.assign(Object.assign({}, state), { query: [
                    {
                        uuid: action.uuid,
                        loading: true,
                        options: action.payload.params,
                        objects: null,
                        error: null
                    },
                    ...state.query.slice(0, stateQueueLimit - 1)
                ] });
        case actionTypes.QUERY_SUCCESS:
            const successQueryIdx = state.query.findIndex(g => g.uuid === action.uuid);
            if (successQueryIdx >= 0) {
                return Object.assign(Object.assign({}, state), { query: [
                        ...state.query.slice(0, successQueryIdx),
                        Object.assign(Object.assign({}, state.query[successQueryIdx]), { loading: false, options: Object.assign({}, state.query[successQueryIdx].options), objects: action.payload.result, error: null }),
                        ...state.query.slice(successQueryIdx + 1)
                    ] });
            }
            return state;
        case actionTypes.QUERY_FAILURE:
            const failureQueryIdx = state.query.findIndex(g => g.uuid === action.uuid);
            if (failureQueryIdx >= 0) {
                return Object.assign(Object.assign({}, state), { query: [
                        ...state.query.slice(0, failureQueryIdx),
                        Object.assign(Object.assign({}, state.query[failureQueryIdx]), { loading: false, options: Object.assign({}, state.query[failureQueryIdx].options), objects: null, error: action.payload.error }),
                        ...state.query.slice(failureQueryIdx + 1)
                    ] });
            }
            return state;
        default:
            return state;
    }
}

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
function createAction(params) {
    return {
        type: params.type,
        uuid: params.uuid || v4(),
        payload: params.payload,
    };
}

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
class ModelEffects {
    constructor(_actions, _service, _manager, _actionTypes) {
        this._actions = _actions;
        this._service = _service;
        this._manager = _manager;
        this._actionTypes = _actionTypes;
        this.modelGet$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.GET), mergeMap(action => this._manager.get(action.payload.id)
            .pipe(map((item) => createAction({
            type: this._actionTypes.GET_SUCCESS,
            payload: { item },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.GET_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
        this.modelList$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.LIST), mergeMap(action => this._manager.list(action.payload.params)
            .pipe(map((result) => createAction({
            type: this._actionTypes.LIST_SUCCESS,
            payload: { result },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.LIST_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
        this.modelCreate$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.CREATE), mergeMap(action => this._manager.create(action.payload.item)
            .pipe(map((item) => createAction({
            type: this._actionTypes.CREATE_SUCCESS,
            payload: { item },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.CREATE_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
        this.modelUpdate$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.UPDATE), mergeMap(action => this._manager.update(action.payload.item.id, action.payload.item)
            .pipe(map((item) => createAction({
            type: this._actionTypes.UPDATE_SUCCESS,
            payload: { item },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.CREATE_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
        this.modelPatch$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.PATCH), mergeMap(action => this._manager.patch(action.payload.item.id, action.payload.item)
            .pipe(map((item) => createAction({
            type: this._actionTypes.PATCH_SUCCESS,
            payload: { item },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.PATCH_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
        this.modelDelete$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.DELETE), mergeMap(action => this._manager.delete(action.payload.item.id)
            .pipe(map(() => createAction({
            type: this._actionTypes.DELETE_SUCCESS,
            payload: { item: action.payload.item },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.DELETE_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
        this.modelDeleteAll$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.DELETE_ALL), mergeMap(action => this._manager.deleteAll(action.payload.items.map(i => i.id))
            .pipe(map(() => createAction({
            type: this._actionTypes.DELETE_ALL_SUCCESS,
            payload: { items: action.payload.items },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.DELETE_ALL_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
        this.modelQuery$ = createEffect(() => this._actions.pipe(ofType(this._actionTypes.QUERY), mergeMap(action => this._manager.query(action.payload.params)
            .pipe(map((result) => createAction({
            type: this._actionTypes.QUERY_SUCCESS,
            payload: { result },
            uuid: action.uuid
        })), catchError(error => of(createAction({
            type: this._actionTypes.QUERY_FAILURE,
            payload: { message: error.message, stack: error.stack },
            uuid: action.uuid
        })))))));
    }
}

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
class ModelManager extends ModelManager$1 {
    constructor(config, endPoint, _http, syncService) {
        super();
        this._http = _http;
        this._useTrailingSlash = false;
        this._endPoint = endPoint;
        this._baseUrl = `${config.baseApiUrl}${this._endPoint}`;
        this._useTrailingSlash = config.addTrailingSlash != null ? config.addTrailingSlash : false;
        if (syncService != null && config.syncModel) {
            if (config.tableName == null) {
                throw new Error(`Table name must be set for model ${this._endPoint}`);
            }
            syncService.registerSyncModel(this._baseUrl, config.tableName);
        }
    }
    get baseUrl() {
        return this._baseUrl;
    }
    get(id) {
        return this._http.get(this._getObjectUrl(id));
    }
    list(options) {
        const params = this._listParamsToQueryParameters(options);
        return this._http.get(`${this._getListUrl()}${params}`);
    }
    create(data) {
        return this._http.post(this._getListUrl(), data);
    }
    update(id, data) {
        return this._http.put(this._getObjectUrl(id), data);
    }
    patch(id, data) {
        return this._http.patch(this._getObjectUrl(id), data);
    }
    delete(id) {
        return this._http.delete(this._getObjectUrl(id));
    }
    deleteAll(ids) {
        let url = `${this._baseUrl}/delete_all`;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return this._http.post(url, { ids });
    }
    query(params) {
        let url = `${this._baseUrl}/query`;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return this._http.post(url, params);
    }
    _getObjectUrl(id) {
        let url = `${this._baseUrl}/${id}`;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return url;
    }
    _getListUrl() {
        let url = this._baseUrl;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return url;
    }
    _listParamsToQueryParameters(options) {
        let params = '';
        const paramsArray = [];
        if (options) {
            if (options.limit) {
                paramsArray.push(`limit=${options.limit}`);
            }
            if (options.start) {
                paramsArray.push(`start=${options.start}`);
            }
            if (options.sort) {
                const props = Object.keys(options.sort);
                paramsArray.push(`sort=${props.map(p => `${p}:${options.sort[p]}`).join(',')}`);
            }
            if (options.fields) {
                paramsArray.push(`fields=${options.fields.join(',')}`);
            }
            if (options.joins) {
                paramsArray.push(`joins=${options.joins
                    .map(j => {
                    const join = `${j.model}.${j.property}`;
                    if (j.fields) {
                        return `${join}.${j.fields.join(';')}`;
                    }
                    return join;
                })
                    .join(',')}`);
            }
            if (paramsArray.length > 0) {
                params = `?${paramsArray.join('&')}`;
            }
        }
        return params;
    }
}
ModelManager.ctorParameters = () => [
    { type: undefined },
    { type: String },
    { type: HttpClient },
    { type: SyncService, decorators: [{ type: Optional }] }
];

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
const MODEL_OPTIONS = new InjectionToken('MODEL_OPTIONS', { providedIn: 'root', factory: () => ({ baseApiUrl: '/' }) });

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
class ModelService {
    constructor(_store, _actions, _actionTypes, statePrefixes) {
        this._store = _store;
        this._actions = _actions;
        this._actionTypes = _actionTypes;
        const packageState = createFeatureSelector(statePrefixes[0]);
        this._modelState = createSelector(packageState, s => s[statePrefixes[1]]);
        this._lastGetEntry = pipe(select(createSelector(this._modelState, (state) => state.get)), filter(g => g.length > 0), map(g => g[0]));
        this._lastListEntry = pipe(select(createSelector(this._modelState, (state) => state.list)), filter(g => g.length > 0), map(g => g[0]));
        this._lastCreateEntry = pipe(select(createSelector(this._modelState, (state) => state.create)), filter(g => g.length > 0), map(g => g[0]));
        this._lastPatchEntry = pipe(select(createSelector(this._modelState, (state) => state.patch)), filter(g => g.length > 0), map(g => g[0]));
        this._lastUpdateEntry = pipe(select(createSelector(this._modelState, (state) => state.update)), filter(g => g.length > 0), map(g => g[0]));
        this._lastDeleteEntry = pipe(select(createSelector(this._modelState, (state) => state.delete)), filter(g => g.length > 0), map(g => g[0]));
        this._lastDeleteAllEntry = pipe(select(createSelector(this._modelState, (state) => state.deleteAll)), filter(g => g.length > 0), map(g => g[0]));
        this._lastQueryEntry = pipe(select(createSelector(this._modelState, (state) => state.query)), filter(g => g.length > 0), map(g => g[0]));
    }
    getGetLoading() {
        return this._store.pipe(this._lastGetEntry, map(g => g.loading));
    }
    getGetOptions() {
        return this._store.pipe(this._lastGetEntry, map(g => g.options));
    }
    getGetId() {
        return this._store.pipe(this._lastGetEntry, map(g => g.id));
    }
    getGetObject() {
        return this._store.pipe(this._lastGetEntry, map(g => g.object));
    }
    getGetError() {
        return this._store.pipe(this._lastGetEntry, map(g => g.error));
    }
    getListLoading() {
        return this._store.pipe(this._lastListEntry, map(g => g.loading));
    }
    getListOptions() {
        return this._store.pipe(this._lastListEntry, map(g => g.options));
    }
    getListObjects() {
        return this._store.pipe(this._lastListEntry, map(g => g.objects));
    }
    getListError() {
        return this._store.pipe(this._lastListEntry, map(g => g.error));
    }
    getListHasNext() {
        return this._store.pipe(this._lastListEntry, map(g => g.objects != null && g.objects.next != null));
    }
    getListCurrentStart() {
        return this._store.pipe(this._lastListEntry, filter(g => g.options != null), map(g => g.options.start != null ? g.options.start : 1));
    }
    getCreateLoading() {
        return this._store.pipe(this._lastCreateEntry, map(g => g.loading));
    }
    getCreateObject() {
        return this._store.pipe(this._lastCreateEntry, map(g => g.object));
    }
    getCreateError() {
        return this._store.pipe(this._lastCreateEntry, map(g => g.error));
    }
    getUpdateLoading() {
        return this._store.pipe(this._lastUpdateEntry, map(g => g.loading));
    }
    getUpdateId() {
        return this._store.pipe(this._lastUpdateEntry, map(g => g.id));
    }
    getUpdateObject() {
        return this._store.pipe(this._lastUpdateEntry, map(g => g.object));
    }
    getUpdateError() {
        return this._store.pipe(this._lastUpdateEntry, map(g => g.error));
    }
    getPatchLoading() {
        return this._store.pipe(this._lastPatchEntry, map(g => g.loading));
    }
    getPatchId() {
        return this._store.pipe(this._lastPatchEntry, map(g => g.id));
    }
    getPatchObject() {
        return this._store.pipe(this._lastPatchEntry, map(g => g.object));
    }
    getPatchError() {
        return this._store.pipe(this._lastPatchEntry, map(g => g.error));
    }
    getDeleteLoading() {
        return this._store.pipe(this._lastDeleteEntry, map(g => g.loading));
    }
    getDeleteId() {
        return this._store.pipe(this._lastDeleteEntry, map(g => g.id));
    }
    getDeleteObject() {
        return this._store.pipe(this._lastDeleteEntry, map(g => g.object));
    }
    getDeleteError() {
        return this._store.pipe(this._lastDeleteEntry, map(g => g.error));
    }
    getDeleteAllLoading() {
        return this._store.pipe(this._lastDeleteAllEntry, map(g => g.loading));
    }
    getDeleteAllIds() {
        return this._store.pipe(this._lastDeleteAllEntry, map(g => g.ids));
    }
    getDeleteAllObjects() {
        return this._store.pipe(this._lastDeleteAllEntry, map(g => g.objects));
    }
    getDeleteAllError() {
        return this._store.pipe(this._lastDeleteAllEntry, map(g => g.error));
    }
    getQueryLoading() {
        return this._store.pipe(this._lastQueryEntry, map(g => g.loading));
    }
    getQueryOptions() {
        return this._store.pipe(this._lastQueryEntry, map(g => g.options));
    }
    getQueryObjects() {
        return this._store.pipe(this._lastQueryEntry, map(g => g.objects));
    }
    getQueryError() {
        return this._store.pipe(this._lastQueryEntry, map(g => g.error));
    }
    getQueryHasNext() {
        return this._store.pipe(this._lastQueryEntry, map(g => g.objects != null && g.objects.next != null));
    }
    getQueryCurrentStart() {
        return this._store.pipe(this._lastQueryEntry, filter(g => g.options != null), map(g => g.options.start != null ? g.options.start : 1));
    }
    getCreateSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.CREATE_SUCCESS));
    }
    getUpdateSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.UPDATE_SUCCESS));
    }
    getPatchSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.PATCH_SUCCESS));
    }
    getDeleteSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.DELETE_SUCCESS));
    }
    getDeleteAllSuccess() {
        return this._actions.pipe(ofType(this._actionTypes.DELETE_ALL_SUCCESS));
    }
    get(id) {
        const action = createAction({ type: this._actionTypes.GET, payload: { id } });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.GET_SUCCESS, this._actionTypes.GET_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.get)(s)), map(gets => gets.find(g => g.uuid === action.uuid)), filter(get => get != null), tap(get => {
            if (get.error != null) {
                throwError(get.error);
            }
        }), filter(get => get.object != null), map(get => get.object), take(1));
    }
    list(options) {
        const action = createAction({ type: this._actionTypes.LIST, payload: { params: options || {} } });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.LIST_SUCCESS, this._actionTypes.LIST_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.list)(s)), map(lists => lists.find(l => l.uuid === action.uuid)), filter(list => list != null), tap(list => {
            if (list.error != null) {
                throwError(list.error);
            }
        }), filter(list => list.objects != null), map(list => list.objects), take(1));
    }
    create(data) {
        const action = createAction({
            type: this._actionTypes.CREATE,
            payload: { item: data },
        });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.CREATE_SUCCESS, this._actionTypes.CREATE_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.create)(s)), map(creates => creates.find(c => c.uuid === action.uuid)), filter(creates => creates != null), tap(create => {
            if (create.error != null) {
                throwError(create.error);
            }
        }), filter(create => create.object != null), map(create => create.object), take(1));
    }
    update(data) {
        const action = createAction({
            type: this._actionTypes.UPDATE,
            payload: { item: data },
        });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.UPDATE_SUCCESS, this._actionTypes.UPDATE_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.update)(s)), map(updates => updates.find(u => u.uuid === action.uuid)), filter(updates => updates != null), tap(update => {
            if (update.error != null) {
                throwError(update.error);
            }
        }), filter(update => update.object != null), map(update => update.object), take(1));
    }
    patch(data) {
        const action = createAction({ type: this._actionTypes.PATCH, payload: { item: data } });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.PATCH_SUCCESS, this._actionTypes.PATCH_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.patch)(s)), map(patches => patches.find(p => p.uuid === action.uuid)), filter(patches => patches != null), tap(patch => {
            if (patch.error != null) {
                throwError(patch.error);
            }
        }), filter(patch => patch.object != null), map(patch => patch.object), take(1));
    }
    delete(data) {
        const action = createAction({ type: this._actionTypes.DELETE, payload: { item: data } });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.DELETE_SUCCESS, this._actionTypes.DELETE_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.delete)(s)), map(dels => dels.find(d => d.uuid === action.uuid)), filter(dels => dels != null), tap(del => {
            if (del.error != null) {
                throwError(del.error);
            }
        }), filter(del => del.object != null), map(del => del.object), take(1));
    }
    deleteAll(data) {
        const action = createAction({ type: this._actionTypes.DELETE_ALL, payload: { items: data } });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.DELETE_ALL_SUCCESS, this._actionTypes.DELETE_ALL_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.deleteAll)(s)), map(deleteAlls => deleteAlls.find(d => d.uuid === action.uuid)), filter(deleteAlls => deleteAlls != null), tap(deleteAll => {
            if (deleteAll.error != null) {
                throwError(deleteAll.error);
            }
        }), filter(deleteAll => deleteAll.objects != null), map(deleteAll => deleteAll.objects), take(1));
    }
    query(options) {
        const action = createAction({ type: this._actionTypes.QUERY, payload: { params: options || {} } });
        this._store.dispatch(action);
        const actResult = this._actions.pipe(ofType(this._actionTypes.QUERY_SUCCESS, this._actionTypes.QUERY_FAILURE), filter(a => a.uuid === action.uuid));
        return actResult.pipe(switchMap(() => this._store), select(s => createSelector(this._modelState, (state) => state.query)(s)), map(queries => queries.find(q => q.uuid === action.uuid)), filter(queries => queries != null), tap(query => {
            if (query.error != null) {
                throwError(query.error);
            }
        }), filter(query => query.objects != null), map(query => query.objects), take(1));
    }
}

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

/**
 * Generated bundle index. Do not edit.
 */

export { MODEL_OPTIONS, ModelBaseAction, ModelCreateAction, ModelCreateFailureAction, ModelCreateSuccessAction, ModelDeleteAction, ModelDeleteAllAction, ModelDeleteAllFailureAction, ModelDeleteAllSuccessAction, ModelDeleteFailureAction, ModelDeleteSuccessAction, ModelEffects, ModelGetAction, ModelGetFailureAction, ModelGetSuccessAction, ModelListAction, ModelListFailureAction, ModelListSuccessAction, ModelManager, ModelPatchAction, ModelPatchFailureAction, ModelPatchSuccessAction, ModelQueryAction, ModelQueryFailureAction, ModelQuerySuccessAction, ModelService, ModelUpdateAction, ModelUpdateFailureAction, ModelUpdateSuccessAction, createAction, generateInitialModelState, generateModelActionTypes, modelReducer };
//# sourceMappingURL=model.js.map
