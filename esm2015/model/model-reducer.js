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
export function generateInitialModelState() {
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
export function modelReducer(state, action, actionTypes) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtcmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVsL21vZGVsLXJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUF3Q0gsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBNkUzQixNQUFNLFVBQVUseUJBQXlCO0lBQ3ZDLE9BQU87UUFDTCxHQUFHLEVBQUUsRUFBRTtRQUNQLElBQUksRUFBRSxFQUFFO1FBQ1IsTUFBTSxFQUFFLEVBQUU7UUFDVixNQUFNLEVBQUUsRUFBRTtRQUNWLEtBQUssRUFBRSxFQUFFO1FBQ1QsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsRUFBRTtRQUNiLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUN4QixLQUFlLEVBQUUsTUFBdUIsRUFBRSxXQUE2QjtJQUN6RSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxXQUFXLENBQUMsR0FBRztZQUNsQix1Q0FDSyxLQUFLLEtBQ1IsR0FBRyxFQUFFO29CQUNIO3dCQUNFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTt3QkFDakIsT0FBTyxFQUFFLElBQUk7d0JBQ2IsT0FBTyxFQUFFLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBQzt3QkFDbkIsRUFBRSxFQUFtQixNQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ3ZDLE1BQU0sRUFBRSxJQUFJO3dCQUNaLEtBQUssRUFBRSxJQUFJO3FCQUNaO29CQUNELEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGVBQWUsR0FBRyxDQUFDLENBQUM7aUJBQzNDLElBQ0Q7UUFFSixLQUFLLFdBQVcsQ0FBQyxXQUFXO1lBQzFCLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMs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T0FBTyxDQUFDLEtBQUs7d0JBRXhELEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztxQkFDMUMsSUFDRDthQUNIO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFFZjtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgTW9kZWwsXG4gIE1vZGVsR2V0UGFyYW1zLFxuICBNb2RlbExpc3RQYXJhbXMsXG4gIE1vZGVsTGlzdFJlc3VsdCxcbiAgTW9kZWxRdWVyeVBhcmFtc1xufSBmcm9tICdAZ25ndC9jb3JlL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIE1vZGVsQWN0aW9uVHlwZXMsXG4gIE1vZGVsQmFzZUFjdGlvbixcbiAgTW9kZWxDcmVhdGVBY3Rpb24sXG4gIE1vZGVsQ3JlYXRlRmFpbHVyZUFjdGlvbixcbiAgTW9kZWxDcmVhdGVTdWNjZXNzQWN0aW9uLFxuICBNb2RlbERlbGV0ZUFjdGlvbixcbiAgTW9kZWxEZWxldGVBbGxBY3Rpb24sXG4gIE1vZGVsRGVsZXRlQWxsRmFpbHVyZUFjdGlvbixcbiAgTW9kZWxEZWxldGVBbGxTdWNjZXNzQWN0aW9uLFxuICBNb2RlbERlbGV0ZUZhaWx1cmVBY3Rpb24sXG4gIE1vZGVsRGVsZXRlU3VjY2Vzc0FjdGlvbixcbiAgTW9kZWxHZXRBY3Rpb24sXG4gIE1vZGVsR2V0RmFpbHVyZUFjdGlvbixcbiAgTW9kZWxHZXRTdWNjZXNzQWN0aW9uLFxuICBNb2RlbExpc3RBY3Rpb24sXG4gIE1vZGVsTGlzdEZhaWx1cmVBY3Rpb24sXG4gIE1vZGVsTGlzdFN1Y2Nlc3NBY3Rpb24sXG4gIE1vZGVsUGF0Y2hBY3Rpb24sXG4gIE1vZGVsUGF0Y2hGYWlsdXJlQWN0aW9uLFxuICBNb2RlbFBhdGNoU3VjY2Vzc0FjdGlvbixcbiAgTW9kZWxRdWVyeUFjdGlvbixcbiAgTW9kZWxRdWVyeUZhaWx1cmVBY3Rpb24sXG4gIE1vZGVsUXVlcnlTdWNjZXNzQWN0aW9uLFxuICBNb2RlbFVwZGF0ZUFjdGlvbixcbiAgTW9kZWxVcGRhdGVGYWlsdXJlQWN0aW9uLFxuICBNb2RlbFVwZGF0ZVN1Y2Nlc3NBY3Rpb24sXG59IGZyb20gJy4vbW9kZWwtYWN0aW9ucyc7XG5pbXBvcnQge01vZGVsRXJyb3J9IGZyb20gJy4vbW9kZWwtZXJyb3InO1xuXG5jb25zdCBzdGF0ZVF1ZXVlTGltaXQgPSAyMDtcblxuZXhwb3J0IGludGVyZmFjZSBNb2RlbEdldFN0YXRlPE0gZXh0ZW5kcyBNb2RlbD4ge1xuICB1dWlkOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIG9wdGlvbnM6IE1vZGVsR2V0UGFyYW1zO1xuICBpZDogbnVtYmVyfG51bGw7XG4gIG9iamVjdDogTXxudWxsO1xuICBlcnJvcjogTW9kZWxFcnJvcnxudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsTGlzdFN0YXRlPE0gZXh0ZW5kcyBNb2RlbD4ge1xuICB1dWlkOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIG9wdGlvbnM6IE1vZGVsTGlzdFBhcmFtcztcbiAgb2JqZWN0czogTW9kZWxMaXN0UmVzdWx0PE0+fG51bGw7XG4gIGVycm9yOiBNb2RlbEVycm9yfG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxDcmVhdGVTdGF0ZTxNIGV4dGVuZHMgTW9kZWw+IHtcbiAgdXVpZDogc3RyaW5nO1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBvYmplY3Q6IE18bnVsbDtcbiAgZXJyb3I6IE1vZGVsRXJyb3J8bnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RlbFVwZGF0ZVN0YXRlPE0gZXh0ZW5kcyBNb2RlbD4ge1xuICB1dWlkOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGlkOiBudW1iZXJ8bnVsbDtcbiAgb2JqZWN0OiBNfG51bGw7XG4gIGVycm9yOiBNb2RlbEVycm9yfG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxQYXRjaFN0YXRlPE0gZXh0ZW5kcyBNb2RlbD4ge1xuICB1dWlkOiBzdHJpbmc7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGlkOiBudW1iZXJ8bnVsbDtcbiAgb2JqZWN0OiBNfG51bGw7XG4gIGVycm9yOiBNb2RlbEVycm9yfG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWxEZWxldGVTdGF0ZTxNIGV4dGVuZHMgTW9kZWw+IHtcbiAgdXVpZDogc3RyaW5nO1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBpZDogbnVtYmVyfG51bGw7XG4gIG9iamVjdDogTXxudWxsO1xuICBlcnJvcjogTW9kZWxFcnJvcnxudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsRGVsZXRlQWxsU3RhdGU8TSBleHRlbmRzIE1vZGVsPiB7XG4gIHV1aWQ6IHN0cmluZztcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgaWRzOiBudW1iZXJbXXxudWxsO1xuICBvYmplY3RzOiBNW118bnVsbDtcbiAgZXJyb3I6IE1vZGVsRXJyb3J8bnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RlbFF1ZXJ5U3RhdGU8TSBleHRlbmRzIE1vZGVsPiB7XG4gIHV1aWQ6IHN0cmluZztcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgb3B0aW9uczogTW9kZWxRdWVyeVBhcmFtc3xudWxsO1xuICBvYmplY3RzOiBNb2RlbExpc3RSZXN1bHQ8TT58bnVsbDtcbiAgZXJyb3I6IE1vZGVsRXJyb3J8bnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZTxNIGV4dGVuZHMgTW9kZWw+IHtcbiAgZ2V0OiBNb2RlbEdldFN0YXRlPE0+W107XG4gIGxpc3Q6IE1vZGVsTGlzdFN0YXRlPE0+W107XG4gIGNyZWF0ZTogTW9kZWxDcmVhdGVTdGF0ZTxNPltdO1xuICB1cGRhdGU6IE1vZGVsVXBkYXRlU3RhdGU8TT5bXTtcbiAgcGF0Y2g6IE1vZGVsUGF0Y2hTdGF0ZTxNPltdO1xuICBkZWxldGU6IE1vZGVsRGVsZXRlU3RhdGU8TT5bXTtcbiAgZGVsZXRlQWxsOiBNb2RlbERlbGV0ZUFsbFN0YXRlPE0+W107XG4gIHF1ZXJ5OiBNb2RlbFF1ZXJ5U3RhdGU8TT5bXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSW5pdGlhbE1vZGVsU3RhdGU8TSBleHRlbmRzIE1vZGVsPigpOiBTdGF0ZTxNPiB7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBbXSxcbiAgICBsaXN0OiBbXSxcbiAgICBjcmVhdGU6IFtdLFxuICAgIHVwZGF0ZTogW10sXG4gICAgcGF0Y2g6IFtdLFxuICAgIGRlbGV0ZTogW10sXG4gICAgZGVsZXRlQWxsOiBbXSxcbiAgICBxdWVyeTogW10sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2RlbFJlZHVjZXI8TSBleHRlbmRzIE1vZGVsPihcbiAgICBzdGF0ZTogU3RhdGU8TT4sIGFjdGlvbjogTW9kZWxCYXNlQWN0aW9uLCBhY3Rpb25UeXBlczogTW9kZWxBY3Rpb25UeXBlcyk6IFN0YXRlPE0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9uVHlwZXMuR0VUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGdldDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHV1aWQ6IGFjdGlvbi51dWlkLFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtpZDogbnVsbH0sXG4gICAgICAgICAgICBpZDogKDxNb2RlbEdldEFjdGlvbj5hY3Rpb24pLnBheWxvYWQuaWQsXG4gICAgICAgICAgICBvYmplY3Q6IG51bGwsXG4gICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uc3RhdGUuZ2V0LnNsaWNlKDAsIHN0YXRlUXVldWVMaW1pdCAtIDEpXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgY2FzZSBhY3Rpb25UeXBlcy5HRVRfU1VDQ0VTUzpcbiAgICAgIGNvbnN0IHN1Y2Nlc3NHZXRJZHggPSBzdGF0ZS5nZXQuZmluZEluZGV4KGcgPT4gZy51dWlkID09PSBhY3Rpb24udXVpZCk7XG4gICAgICBpZiAoc3VjY2Vzc0dldElkeCA+PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgZ2V0OiBbXG4gICAgICAgICAgICAuLi5zdGF0ZS5nZXQuc2xpY2UoMCwgc3VjY2Vzc0dldElkeCksIHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUuZ2V0W3N1Y2Nlc3NHZXRJZHhdLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgb2JqZWN0OiAoPE1vZGVsR2V0U3VjY2Vzc0FjdGlvbjxNPj5hY3Rpb24pLnBheWxvYWQuaXRlbSxcbiAgICAgICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5zdGF0ZS5nZXQuc2xpY2Uoc3VjY2Vzc0dldElkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuR0VUX0ZBSUxVUkU6XG4gICAgICBjb25zdCBmYWlsdXJlR2V0SWR4ID0gc3RhdGUuZ2V0LmZpbmRJbmRleChnID0+IGcudXVpZCA9PT0gYWN0aW9uLnV1aWQpO1xuICAgICAgaWYgKGZhaWx1cmVHZXRJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGdldDogW1xuICAgICAgICAgICAgLi4uc3RhdGUuZ2V0LnNsaWNlKDAsIGZhaWx1cmVHZXRJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLmdldFtmYWlsdXJlR2V0SWR4XSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgIG9iamVjdDogbnVsbCxcbiAgICAgICAgICAgICAgZXJyb3I6ICg8TW9kZWxHZXRGYWlsdXJlQWN0aW9uPmFjdGlvbikucGF5bG9hZC5lcnJvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLnN0YXRlLmdldC5zbGljZShmYWlsdXJlR2V0SWR4ICsgMSlcbiAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuXG4gICAgY2FzZSBhY3Rpb25UeXBlcy5MSVNUOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiBhY3Rpb24udXVpZCxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBvcHRpb25zOiAoPE1vZGVsTGlzdEFjdGlvbj5hY3Rpb24pLnBheWxvYWQucGFyYW1zLFxuICAgICAgICAgICAgb2JqZWN0czogbnVsbCxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5zdGF0ZS5saXN0LnNsaWNlKDAsIHN0YXRlUXVldWVMaW1pdCAtIDEpXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgY2FzZSBhY3Rpb25UeXBlcy5MSVNUX1NVQ0NFU1M6XG4gICAgICBjb25zdCBzdWNjZXNzTGlzdElkeCA9IHN0YXRlLmxpc3QuZmluZEluZGV4KGcgPT4gZy51dWlkID09PSBhY3Rpb24udXVpZCk7XG4gICAgICBpZiAoc3VjY2Vzc0xpc3RJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgIC4uLnN0YXRlLmxpc3Quc2xpY2UoMCwgc3VjY2Vzc0xpc3RJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLmxpc3Rbc3VjY2Vzc0xpc3RJZHhdLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgb2JqZWN0czogKDxNb2RlbExpc3RTdWNjZXNzQWN0aW9uPE0+PmFjdGlvbikucGF5bG9hZC5yZXN1bHQsXG4gICAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uc3RhdGUubGlzdC5zbGljZShzdWNjZXNzTGlzdElkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuTElTVF9GQUlMVVJFOlxuICAgICAgY29uc3QgZmFpbHVyZUxpc3RJZHggPSBzdGF0ZS5saXN0LmZpbmRJbmRleChnID0+IGcudXVpZCA9PT0gYWN0aW9uLnV1aWQpO1xuICAgICAgaWYgKGZhaWx1cmVMaXN0SWR4ID49IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICAuLi5zdGF0ZS5saXN0LnNsaWNlKDAsIGZhaWx1cmVMaXN0SWR4KSwge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5saXN0W2ZhaWx1cmVMaXN0SWR4XSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgIG9iamVjdHM6IG51bGwsXG4gICAgICAgICAgICAgIGVycm9yOiAoPE1vZGVsTGlzdEZhaWx1cmVBY3Rpb24+YWN0aW9uKS5wYXlsb2FkLmVycm9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uc3RhdGUubGlzdC5zbGljZShmYWlsdXJlTGlzdElkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuQ1JFQVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGNyZWF0ZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHV1aWQ6IGFjdGlvbi51dWlkLFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIG9iamVjdDogKDxNb2RlbENyZWF0ZUFjdGlvbjxNPj5hY3Rpb24pLnBheWxvYWQuaXRlbSxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5zdGF0ZS5jcmVhdGUuc2xpY2UoMCwgc3RhdGVRdWV1ZUxpbWl0IC0gMSlcbiAgICAgICAgXSxcbiAgICAgIH07XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLkNSRUFURV9TVUNDRVNTOlxuICAgICAgY29uc3Qgc3VjY2Vzc0NyZWF0ZUlkeCA9IHN0YXRlLmNyZWF0ZS5maW5kSW5kZXgoZyA9PiBnLnV1aWQgPT09IGFjdGlvbi51dWlkKTtcbiAgICAgIGlmIChzdWNjZXNzQ3JlYXRlSWR4ID49IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBjcmVhdGU6IFtcbiAgICAgICAgICAgIC4uLnN0YXRlLmNyZWF0ZS5zbGljZSgwLCBzdWNjZXNzQ3JlYXRlSWR4KSwge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5jcmVhdGVbc3VjY2Vzc0NyZWF0ZUlkeF0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBvYmplY3Q6ICg8TW9kZWxDcmVhdGVTdWNjZXNzQWN0aW9uPE0+PmFjdGlvbikucGF5bG9hZC5pdGVtLFxuICAgICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLnN0YXRlLmNyZWF0ZS5zbGljZShzdWNjZXNzQ3JlYXRlSWR4ICsgMSlcbiAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuXG4gICAgY2FzZSBhY3Rpb25UeXBlcy5DUkVBVEVfRkFJTFVSRTpcbiAgICAgIGNvbnN0IGZhaWx1cmVDcmVhdGVJZHggPSBzdGF0ZS5jcmVhdGUuZmluZEluZGV4KGcgPT4gZy51dWlkID09PSBhY3Rpb24udXVpZCk7XG4gICAgICBpZiAoZmFpbHVyZUNyZWF0ZUlkeCA+PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgY3JlYXRlOiBbXG4gICAgICAgICAgICAuLi5zdGF0ZS5jcmVhdGUuc2xpY2UoMCwgZmFpbHVyZUNyZWF0ZUlkeCksIHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUuY3JlYXRlW2ZhaWx1cmVDcmVhdGVJZHhdLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgb2JqZWN0OiBudWxsLFxuICAgICAgICAgICAgICBlcnJvcjogKDxNb2RlbENyZWF0ZUZhaWx1cmVBY3Rpb24+YWN0aW9uKS5wYXlsb2FkLmVycm9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uc3RhdGUuY3JlYXRlLnNsaWNlKGZhaWx1cmVDcmVhdGVJZHggKyAxKVxuICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLlVQREFURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1cGRhdGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiBhY3Rpb24udXVpZCxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBpZDogKDxNb2RlbFVwZGF0ZUFjdGlvbjxNPj5hY3Rpb24pLnBheWxvYWQuaXRlbS5pZCxcbiAgICAgICAgICAgIG9iamVjdDogKDxNb2RlbFVwZGF0ZUFjdGlvbjxNPj5hY3Rpb24pLnBheWxvYWQuaXRlbSxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5zdGF0ZS51cGRhdGUuc2xpY2UoMCwgc3RhdGVRdWV1ZUxpbWl0IC0gMSlcbiAgICAgICAgXVxuICAgICAgfTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuVVBEQVRFX1NVQ0NFU1M6XG4gICAgICBjb25zdCBzdWNjZXNzVXBkYXRlSWR4ID0gc3RhdGUudXBkYXRlLmZpbmRJbmRleChnID0+IGcudXVpZCA9PT0gYWN0aW9uLnV1aWQpO1xuICAgICAgaWYgKHN1Y2Nlc3NVcGRhdGVJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHVwZGF0ZTogW1xuICAgICAgICAgICAgLi4uc3RhdGUudXBkYXRlLnNsaWNlKDAsIHN1Y2Nlc3NVcGRhdGVJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnVwZGF0ZVtzdWNjZXNzVXBkYXRlSWR4XSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgIG9iamVjdDogKDxNb2RlbFVwZGF0ZVN1Y2Nlc3NBY3Rpb248TT4+YWN0aW9uKS5wYXlsb2FkLml0ZW0sXG4gICAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uc3RhdGUudXBkYXRlLnNsaWNlKHN1Y2Nlc3NVcGRhdGVJZHggKyAxKVxuICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLlVQREFURV9GQUlMVVJFOlxuICAgICAgY29uc3QgZmFpbHVyZVVwZGF0ZUlkeCA9IHN0YXRlLnVwZGF0ZS5maW5kSW5kZXgoZyA9PiBnLnV1aWQgPT09IGFjdGlvbi51dWlkKTtcbiAgICAgIGlmIChmYWlsdXJlVXBkYXRlSWR4ID49IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICB1cGRhdGU6IFtcbiAgICAgICAgICAgIC4uLnN0YXRlLnVwZGF0ZS5zbGljZSgwLCBmYWlsdXJlVXBkYXRlSWR4KSwge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS51cGRhdGVbZmFpbHVyZVVwZGF0ZUlkeF0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBvYmplY3Q6IG51bGwsXG4gICAgICAgICAgICAgIGVycm9yOiAoPE1vZGVsVXBkYXRlRmFpbHVyZUFjdGlvbj5hY3Rpb24pLnBheWxvYWQuZXJyb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5zdGF0ZS51cGRhdGUuc2xpY2UoZmFpbHVyZVVwZGF0ZUlkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuUEFUQ0g6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGF0Y2g6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiBhY3Rpb24udXVpZCxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBpZDogKDxNb2RlbFBhdGNoQWN0aW9uPE0+PmFjdGlvbikucGF5bG9hZC5pdGVtLmlkLFxuICAgICAgICAgICAgb2JqZWN0OiAoPE1vZGVsUGF0Y2hBY3Rpb248TT4+YWN0aW9uKS5wYXlsb2FkLml0ZW0sXG4gICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uc3RhdGUucGF0Y2guc2xpY2UoMCwgc3RhdGVRdWV1ZUxpbWl0IC0gMSlcbiAgICAgICAgXVxuICAgICAgfTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuUEFUQ0hfU1VDQ0VTUzpcbiAgICAgIGNvbnN0IHN1Y2Nlc3NQYXRjaElkeCA9IHN0YXRlLnBhdGNoLmZpbmRJbmRleChnID0+IGcudXVpZCA9PT0gYWN0aW9uLnV1aWQpO1xuICAgICAgaWYgKHN1Y2Nlc3NQYXRjaElkeCA+PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcGF0Y2g6IFtcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhdGNoLnNsaWNlKDAsIHN1Y2Nlc3NQYXRjaElkeCksIHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUucGF0Y2hbc3VjY2Vzc1BhdGNoSWR4XSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgIG9iamVjdDogKDxNb2RlbFBhdGNoU3VjY2Vzc0FjdGlvbjxNPj5hY3Rpb24pLnBheWxvYWQuaXRlbSxcbiAgICAgICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5zdGF0ZS5wYXRjaC5zbGljZShzdWNjZXNzUGF0Y2hJZHggKyAxKVxuICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLlBBVENIX0ZBSUxVUkU6XG4gICAgICBjb25zdCBmYWlsdXJlUGF0Y2hJZHggPSBzdGF0ZS5wYXRjaC5maW5kSW5kZXgoZyA9PiBnLnV1aWQgPT09IGFjdGlvbi51dWlkKTtcbiAgICAgIGlmIChmYWlsdXJlUGF0Y2hJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHBhdGNoOiBbXG4gICAgICAgICAgICAuLi5zdGF0ZS5wYXRjaC5zbGljZSgwLCBmYWlsdXJlUGF0Y2hJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnBhdGNoW2ZhaWx1cmVQYXRjaElkeF0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBvYmplY3Q6IG51bGwsXG4gICAgICAgICAgICAgIGVycm9yOiAoPE1vZGVsUGF0Y2hGYWlsdXJlQWN0aW9uPmFjdGlvbikucGF5bG9hZC5lcnJvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLnN0YXRlLnBhdGNoLnNsaWNlKGZhaWx1cmVQYXRjaElkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRlbGV0ZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHV1aWQ6IGFjdGlvbi51dWlkLFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGlkOiAoPE1vZGVsRGVsZXRlQWN0aW9uPE0+PmFjdGlvbikucGF5bG9hZC5pdGVtLmlkLFxuICAgICAgICAgICAgb2JqZWN0OiBudWxsLFxuICAgICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLnN0YXRlLmRlbGV0ZS5zbGljZSgwLCBzdGF0ZVF1ZXVlTGltaXQgLSAxKVxuICAgICAgICBdLFxuICAgICAgfTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFX1NVQ0NFU1M6XG4gICAgICBjb25zdCBzdWNjZXNzRGVsZXRlSWR4ID0gc3RhdGUuZGVsZXRlLmZpbmRJbmRleChnID0+IGcudXVpZCA9PT0gYWN0aW9uLnV1aWQpO1xuICAgICAgaWYgKHN1Y2Nlc3NEZWxldGVJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGRlbGV0ZTogW1xuICAgICAgICAgICAgLi4uc3RhdGUuZGVsZXRlLnNsaWNlKDAsIHN1Y2Nlc3NEZWxldGVJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLmRlbGV0ZVtzdWNjZXNzRGVsZXRlSWR4XSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgIG9iamVjdDogKDxNb2RlbERlbGV0ZVN1Y2Nlc3NBY3Rpb248TT4+YWN0aW9uKS5wYXlsb2FkLml0ZW0sXG4gICAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uc3RhdGUuZGVsZXRlLnNsaWNlKHN1Y2Nlc3NEZWxldGVJZHggKyAxKVxuICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLkRFTEVURV9GQUlMVVJFOlxuICAgICAgY29uc3QgZmFpbHVyZURlbGV0ZUlkeCA9IHN0YXRlLmRlbGV0ZS5maW5kSW5kZXgoZyA9PiBnLnV1aWQgPT09IGFjdGlvbi51dWlkKTtcbiAgICAgIGlmIChmYWlsdXJlRGVsZXRlSWR4ID49IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBkZWxldGU6IFtcbiAgICAgICAgICAgIC4uLnN0YXRlLmRlbGV0ZS5zbGljZSgwLCBmYWlsdXJlRGVsZXRlSWR4KSwge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5kZWxldGVbZmFpbHVyZURlbGV0ZUlkeF0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBvYmplY3Q6IG51bGwsXG4gICAgICAgICAgICAgIGVycm9yOiAoPE1vZGVsRGVsZXRlRmFpbHVyZUFjdGlvbj5hY3Rpb24pLnBheWxvYWQuZXJyb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5zdGF0ZS5kZWxldGUuc2xpY2UoZmFpbHVyZURlbGV0ZUlkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuREVMRVRFX0FMTDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkZWxldGVBbGw6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiBhY3Rpb24udXVpZCxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBpZHM6ICg8TW9kZWxEZWxldGVBbGxBY3Rpb248TT4+YWN0aW9uKS5wYXlsb2FkLml0ZW1zLm1hcChpID0+IGkuaWQpLFxuICAgICAgICAgICAgb2JqZWN0czogbnVsbCxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5zdGF0ZS5kZWxldGVBbGwuc2xpY2UoMCwgc3RhdGVRdWV1ZUxpbWl0IC0gMSlcbiAgICAgICAgXSxcbiAgICAgIH07XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLkRFTEVURV9BTExfU1VDQ0VTUzpcbiAgICAgIGNvbnN0IHN1Y2Nlc3NEZWxldGVBbGxJZHggPSBzdGF0ZS5kZWxldGVBbGwuZmluZEluZGV4KGcgPT4gZy51dWlkID09PSBhY3Rpb24udXVpZCk7XG4gICAgICBpZiAoc3VjY2Vzc0RlbGV0ZUFsbElkeCA+PSAwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgZGVsZXRlQWxsOiBbXG4gICAgICAgICAgICAuLi5zdGF0ZS5kZWxldGVBbGwuc2xpY2UoMCwgc3VjY2Vzc0RlbGV0ZUFsbElkeCksIHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUuZGVsZXRlQWxsW3N1Y2Nlc3NEZWxldGVBbGxJZHhdLFxuICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgb2JqZWN0czogKDxNb2RlbERlbGV0ZUFsbFN1Y2Nlc3NBY3Rpb248TT4+YWN0aW9uKS5wYXlsb2FkLml0ZW1zLFxuICAgICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLnN0YXRlLmRlbGV0ZUFsbC5zbGljZShzdWNjZXNzRGVsZXRlQWxsSWR4ICsgMSlcbiAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuXG4gICAgY2FzZSBhY3Rpb25UeXBlcy5ERUxFVEVfQUxMX0ZBSUxVUkU6XG4gICAgICBjb25zdCBmYWlsdXJlRGVsZXRlQWxsSWR4ID0gc3RhdGUuZGVsZXRlQWxsLmZpbmRJbmRleChnID0+IGcudXVpZCA9PT0gYWN0aW9uLnV1aWQpO1xuICAgICAgaWYgKGZhaWx1cmVEZWxldGVBbGxJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGRlbGV0ZUFsbDogW1xuICAgICAgICAgICAgLi4uc3RhdGUuZGVsZXRlQWxsLnNsaWNlKDAsIGZhaWx1cmVEZWxldGVBbGxJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLmRlbGV0ZUFsbFtmYWlsdXJlRGVsZXRlQWxsSWR4XSxcbiAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgIG9iamVjdHM6IG51bGwsXG4gICAgICAgICAgICAgIGVycm9yOiAoPE1vZGVsRGVsZXRlQWxsRmFpbHVyZUFjdGlvbj5hY3Rpb24pLnBheWxvYWQuZXJyb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5zdGF0ZS5kZWxldGVBbGwuc2xpY2UoZmFpbHVyZURlbGV0ZUFsbElkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGNhc2UgYWN0aW9uVHlwZXMuUVVFUlk6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcXVlcnk6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1dWlkOiBhY3Rpb24udXVpZCxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICBvcHRpb25zOiAoPE1vZGVsUXVlcnlBY3Rpb24+YWN0aW9uKS5wYXlsb2FkLnBhcmFtcyxcbiAgICAgICAgICAgIG9iamVjdHM6IG51bGwsXG4gICAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uc3RhdGUucXVlcnkuc2xpY2UoMCwgc3RhdGVRdWV1ZUxpbWl0IC0gMSlcbiAgICAgICAgXSxcbiAgICAgIH07XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLlFVRVJZX1NVQ0NFU1M6XG4gICAgICBjb25zdCBzdWNjZXNzUXVlcnlJZHggPSBzdGF0ZS5xdWVyeS5maW5kSW5kZXgoZyA9PiBnLnV1aWQgPT09IGFjdGlvbi51dWlkKTtcbiAgICAgIGlmIChzdWNjZXNzUXVlcnlJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHF1ZXJ5OiBbXG4gICAgICAgICAgICAuLi5zdGF0ZS5xdWVyeS5zbGljZSgwLCBzdWNjZXNzUXVlcnlJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnF1ZXJ5W3N1Y2Nlc3NRdWVyeUlkeF0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7Li4uc3RhdGUucXVlcnlbc3VjY2Vzc1F1ZXJ5SWR4XS5vcHRpb25zIX0sXG4gICAgICAgICAgICAgIG9iamVjdHM6ICg8TW9kZWxRdWVyeVN1Y2Nlc3NBY3Rpb248TT4+YWN0aW9uKS5wYXlsb2FkLnJlc3VsdCxcbiAgICAgICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5zdGF0ZS5xdWVyeS5zbGljZShzdWNjZXNzUXVlcnlJZHggKyAxKVxuICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLlFVRVJZX0ZBSUxVUkU6XG4gICAgICBjb25zdCBmYWlsdXJlUXVlcnlJZHggPSBzdGF0ZS5xdWVyeS5maW5kSW5kZXgoZyA9PiBnLnV1aWQgPT09IGFjdGlvbi51dWlkKTtcbiAgICAgIGlmIChmYWlsdXJlUXVlcnlJZHggPj0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHF1ZXJ5OiBbXG4gICAgICAgICAgICAuLi5zdGF0ZS5xdWVyeS5zbGljZSgwLCBmYWlsdXJlUXVlcnlJZHgpLCB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLnF1ZXJ5W2ZhaWx1cmVRdWVyeUlkeF0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7Li4uc3RhdGUucXVlcnlbZmFpbHVyZVF1ZXJ5SWR4XS5vcHRpb25zIX0sXG4gICAgICAgICAgICAgIG9iamVjdHM6IG51bGwsXG4gICAgICAgICAgICAgIGVycm9yOiAoPE1vZGVsUXVlcnlGYWlsdXJlQWN0aW9uPmFjdGlvbikucGF5bG9hZC5lcnJvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLnN0YXRlLnF1ZXJ5LnNsaWNlKGZhaWx1cmVRdWVyeUlkeCArIDEpXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==