(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@gngt/core/reducers'), require('@ngrx/effects'), require('rxjs'), require('rxjs/operators'), require('uuid'), require('@angular/common/http'), require('@angular/core'), require('@gngt/core/common'), require('@gngt/core/sync'), require('@ngrx/store')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/model', ['exports', '@gngt/core/reducers', '@ngrx/effects', 'rxjs', 'rxjs/operators', 'uuid', '@angular/common/http', '@angular/core', '@gngt/core/common', '@gngt/core/sync', '@ngrx/store'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.model = {}), global.ng.core.reducers, global.ngrx.effects, global.rxjs, global.rxjs.operators, global.uuid, global.ng.common.http, global.ng.core, global.ng.core.common, global.ng.core.sync, global.ngrx.store));
}(this, (function (exports, reducers, effects, rxjs, operators, uuid, http, core, common, sync, store) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    function generateModelActionTypes(typeName) {
        return {
            LIST: reducers.type("[" + typeName + "] List"),
            LIST_FAILURE: reducers.type("[" + typeName + "] List failure"),
            LIST_SUCCESS: reducers.type("[" + typeName + "] List success"),
            GET: reducers.type("[" + typeName + "] Get"),
            GET_FAILURE: reducers.type("[" + typeName + "] Get failure"),
            GET_SUCCESS: reducers.type("[" + typeName + "] Get success"),
            CREATE: reducers.type("[" + typeName + "] Create"),
            CREATE_FAILURE: reducers.type("[" + typeName + "] Create failure"),
            CREATE_SUCCESS: reducers.type("[" + typeName + "] Create success"),
            UPDATE: reducers.type("[" + typeName + "] Update"),
            UPDATE_FAILURE: reducers.type("[" + typeName + "] Update failure"),
            UPDATE_SUCCESS: reducers.type("[" + typeName + "] Update success"),
            PATCH: reducers.type("[" + typeName + "] Patch"),
            PATCH_FAILURE: reducers.type("[" + typeName + "] Patch failure"),
            PATCH_SUCCESS: reducers.type("[" + typeName + "] Patch success"),
            DELETE: reducers.type("[" + typeName + "] Delete"),
            DELETE_FAILURE: reducers.type("[" + typeName + "] Delete failure"),
            DELETE_SUCCESS: reducers.type("[" + typeName + "] Delete success"),
            DELETE_ALL: reducers.type("[" + typeName + "] Delete all"),
            DELETE_ALL_FAILURE: reducers.type("[" + typeName + "] Delete all failure"),
            DELETE_ALL_SUCCESS: reducers.type("[" + typeName + "] Delete all success"),
            QUERY: reducers.type("[" + typeName + "] Query"),
            QUERY_FAILURE: reducers.type("[" + typeName + "] Query failure"),
            QUERY_SUCCESS: reducers.type("[" + typeName + "] Query success"),
        };
    }
    var ModelBaseAction = /** @class */ (function () {
        function ModelBaseAction(payload) {
            this.payload = payload;
        }
        return ModelBaseAction;
    }());
    var ModelGetAction = /** @class */ (function (_super) {
        __extends(ModelGetAction, _super);
        function ModelGetAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelGetAction;
    }(ModelBaseAction));
    var ModelGetSuccessAction = /** @class */ (function (_super) {
        __extends(ModelGetSuccessAction, _super);
        function ModelGetSuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelGetSuccessAction;
    }(ModelBaseAction));
    var ModelGetFailureAction = /** @class */ (function (_super) {
        __extends(ModelGetFailureAction, _super);
        function ModelGetFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelGetFailureAction;
    }(ModelBaseAction));
    var ModelListAction = /** @class */ (function (_super) {
        __extends(ModelListAction, _super);
        function ModelListAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelListAction;
    }(ModelBaseAction));
    var ModelListSuccessAction = /** @class */ (function (_super) {
        __extends(ModelListSuccessAction, _super);
        function ModelListSuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelListSuccessAction;
    }(ModelBaseAction));
    var ModelListFailureAction = /** @class */ (function (_super) {
        __extends(ModelListFailureAction, _super);
        function ModelListFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelListFailureAction;
    }(ModelBaseAction));
    var ModelCreateAction = /** @class */ (function (_super) {
        __extends(ModelCreateAction, _super);
        function ModelCreateAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelCreateAction;
    }(ModelBaseAction));
    var ModelCreateSuccessAction = /** @class */ (function (_super) {
        __extends(ModelCreateSuccessAction, _super);
        function ModelCreateSuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelCreateSuccessAction;
    }(ModelBaseAction));
    var ModelCreateFailureAction = /** @class */ (function (_super) {
        __extends(ModelCreateFailureAction, _super);
        function ModelCreateFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelCreateFailureAction;
    }(ModelBaseAction));
    var ModelUpdateAction = /** @class */ (function (_super) {
        __extends(ModelUpdateAction, _super);
        function ModelUpdateAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelUpdateAction;
    }(ModelBaseAction));
    var ModelUpdateSuccessAction = /** @class */ (function (_super) {
        __extends(ModelUpdateSuccessAction, _super);
        function ModelUpdateSuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelUpdateSuccessAction;
    }(ModelBaseAction));
    var ModelUpdateFailureAction = /** @class */ (function (_super) {
        __extends(ModelUpdateFailureAction, _super);
        function ModelUpdateFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelUpdateFailureAction;
    }(ModelBaseAction));
    var ModelPatchAction = /** @class */ (function (_super) {
        __extends(ModelPatchAction, _super);
        function ModelPatchAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelPatchAction;
    }(ModelBaseAction));
    var ModelPatchSuccessAction = /** @class */ (function (_super) {
        __extends(ModelPatchSuccessAction, _super);
        function ModelPatchSuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelPatchSuccessAction;
    }(ModelBaseAction));
    var ModelPatchFailureAction = /** @class */ (function (_super) {
        __extends(ModelPatchFailureAction, _super);
        function ModelPatchFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelPatchFailureAction;
    }(ModelBaseAction));
    var ModelDeleteAction = /** @class */ (function (_super) {
        __extends(ModelDeleteAction, _super);
        function ModelDeleteAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelDeleteAction;
    }(ModelBaseAction));
    var ModelDeleteSuccessAction = /** @class */ (function (_super) {
        __extends(ModelDeleteSuccessAction, _super);
        function ModelDeleteSuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelDeleteSuccessAction;
    }(ModelBaseAction));
    var ModelDeleteFailureAction = /** @class */ (function (_super) {
        __extends(ModelDeleteFailureAction, _super);
        function ModelDeleteFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelDeleteFailureAction;
    }(ModelBaseAction));
    var ModelDeleteAllAction = /** @class */ (function (_super) {
        __extends(ModelDeleteAllAction, _super);
        function ModelDeleteAllAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelDeleteAllAction;
    }(ModelBaseAction));
    var ModelDeleteAllSuccessAction = /** @class */ (function (_super) {
        __extends(ModelDeleteAllSuccessAction, _super);
        function ModelDeleteAllSuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelDeleteAllSuccessAction;
    }(ModelBaseAction));
    var ModelDeleteAllFailureAction = /** @class */ (function (_super) {
        __extends(ModelDeleteAllFailureAction, _super);
        function ModelDeleteAllFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelDeleteAllFailureAction;
    }(ModelBaseAction));
    var ModelQueryAction = /** @class */ (function (_super) {
        __extends(ModelQueryAction, _super);
        function ModelQueryAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelQueryAction;
    }(ModelBaseAction));
    var ModelQuerySuccessAction = /** @class */ (function (_super) {
        __extends(ModelQuerySuccessAction, _super);
        function ModelQuerySuccessAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelQuerySuccessAction;
    }(ModelBaseAction));
    var ModelQueryFailureAction = /** @class */ (function (_super) {
        __extends(ModelQueryFailureAction, _super);
        function ModelQueryFailureAction(payload) {
            var _this = _super.call(this, payload) || this;
            _this.payload = payload;
            return _this;
        }
        return ModelQueryFailureAction;
    }(ModelBaseAction));

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
    var stateQueueLimit = 20;
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
                return Object.assign(Object.assign({}, state), { get: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            options: { id: null },
                            id: action.payload.id,
                            object: null,
                            error: null
                        }
                    ], __read(state.get.slice(0, stateQueueLimit - 1))) });
            case actionTypes.GET_SUCCESS:
                var successGetIdx = state.get.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successGetIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { get: __spreadArray(__spreadArray(__spreadArray([], __read(state.get.slice(0, successGetIdx))), [
                            Object.assign(Object.assign({}, state.get[successGetIdx]), { loading: false, object: action.payload.item, error: null })
                        ]), __read(state.get.slice(successGetIdx + 1))) });
                }
                return state;
            case actionTypes.GET_FAILURE:
                var failureGetIdx = state.get.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failureGetIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { get: __spreadArray(__spreadArray(__spreadArray([], __read(state.get.slice(0, failureGetIdx))), [
                            Object.assign(Object.assign({}, state.get[failureGetIdx]), { loading: false, object: null, error: action.payload.error })
                        ]), __read(state.get.slice(failureGetIdx + 1))) });
                }
                return state;
            case actionTypes.LIST:
                return Object.assign(Object.assign({}, state), { list: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            options: action.payload.params,
                            objects: null,
                            error: null
                        }
                    ], __read(state.list.slice(0, stateQueueLimit - 1))) });
            case actionTypes.LIST_SUCCESS:
                var successListIdx = state.list.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successListIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { list: __spreadArray(__spreadArray(__spreadArray([], __read(state.list.slice(0, successListIdx))), [
                            Object.assign(Object.assign({}, state.list[successListIdx]), { loading: false, objects: action.payload.result, error: null })
                        ]), __read(state.list.slice(successListIdx + 1))) });
                }
                return state;
            case actionTypes.LIST_FAILURE:
                var failureListIdx = state.list.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failureListIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { list: __spreadArray(__spreadArray(__spreadArray([], __read(state.list.slice(0, failureListIdx))), [
                            Object.assign(Object.assign({}, state.list[failureListIdx]), { loading: false, objects: null, error: action.payload.error })
                        ]), __read(state.list.slice(failureListIdx + 1))) });
                }
                return state;
            case actionTypes.CREATE:
                return Object.assign(Object.assign({}, state), { create: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            object: action.payload.item,
                            error: null
                        }
                    ], __read(state.create.slice(0, stateQueueLimit - 1))) });
            case actionTypes.CREATE_SUCCESS:
                var successCreateIdx = state.create.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successCreateIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { create: __spreadArray(__spreadArray(__spreadArray([], __read(state.create.slice(0, successCreateIdx))), [
                            Object.assign(Object.assign({}, state.create[successCreateIdx]), { loading: false, object: action.payload.item, error: null })
                        ]), __read(state.create.slice(successCreateIdx + 1))) });
                }
                return state;
            case actionTypes.CREATE_FAILURE:
                var failureCreateIdx = state.create.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failureCreateIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { create: __spreadArray(__spreadArray(__spreadArray([], __read(state.create.slice(0, failureCreateIdx))), [
                            Object.assign(Object.assign({}, state.create[failureCreateIdx]), { loading: false, object: null, error: action.payload.error })
                        ]), __read(state.create.slice(failureCreateIdx + 1))) });
                }
                return state;
            case actionTypes.UPDATE:
                return Object.assign(Object.assign({}, state), { update: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            id: action.payload.item.id,
                            object: action.payload.item,
                            error: null
                        }
                    ], __read(state.update.slice(0, stateQueueLimit - 1))) });
            case actionTypes.UPDATE_SUCCESS:
                var successUpdateIdx = state.update.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successUpdateIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { update: __spreadArray(__spreadArray(__spreadArray([], __read(state.update.slice(0, successUpdateIdx))), [
                            Object.assign(Object.assign({}, state.update[successUpdateIdx]), { loading: false, object: action.payload.item, error: null })
                        ]), __read(state.update.slice(successUpdateIdx + 1))) });
                }
                return state;
            case actionTypes.UPDATE_FAILURE:
                var failureUpdateIdx = state.update.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failureUpdateIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { update: __spreadArray(__spreadArray(__spreadArray([], __read(state.update.slice(0, failureUpdateIdx))), [
                            Object.assign(Object.assign({}, state.update[failureUpdateIdx]), { loading: false, object: null, error: action.payload.error })
                        ]), __read(state.update.slice(failureUpdateIdx + 1))) });
                }
                return state;
            case actionTypes.PATCH:
                return Object.assign(Object.assign({}, state), { patch: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            id: action.payload.item.id,
                            object: action.payload.item,
                            error: null
                        }
                    ], __read(state.patch.slice(0, stateQueueLimit - 1))) });
            case actionTypes.PATCH_SUCCESS:
                var successPatchIdx = state.patch.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successPatchIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { patch: __spreadArray(__spreadArray(__spreadArray([], __read(state.patch.slice(0, successPatchIdx))), [
                            Object.assign(Object.assign({}, state.patch[successPatchIdx]), { loading: false, object: action.payload.item, error: null })
                        ]), __read(state.patch.slice(successPatchIdx + 1))) });
                }
                return state;
            case actionTypes.PATCH_FAILURE:
                var failurePatchIdx = state.patch.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failurePatchIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { patch: __spreadArray(__spreadArray(__spreadArray([], __read(state.patch.slice(0, failurePatchIdx))), [
                            Object.assign(Object.assign({}, state.patch[failurePatchIdx]), { loading: false, object: null, error: action.payload.error })
                        ]), __read(state.patch.slice(failurePatchIdx + 1))) });
                }
                return state;
            case actionTypes.DELETE:
                return Object.assign(Object.assign({}, state), { delete: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            id: action.payload.item.id,
                            object: null,
                            error: null
                        }
                    ], __read(state.delete.slice(0, stateQueueLimit - 1))) });
            case actionTypes.DELETE_SUCCESS:
                var successDeleteIdx = state.delete.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successDeleteIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { delete: __spreadArray(__spreadArray(__spreadArray([], __read(state.delete.slice(0, successDeleteIdx))), [
                            Object.assign(Object.assign({}, state.delete[successDeleteIdx]), { loading: false, object: action.payload.item, error: null })
                        ]), __read(state.delete.slice(successDeleteIdx + 1))) });
                }
                return state;
            case actionTypes.DELETE_FAILURE:
                var failureDeleteIdx = state.delete.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failureDeleteIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { delete: __spreadArray(__spreadArray(__spreadArray([], __read(state.delete.slice(0, failureDeleteIdx))), [
                            Object.assign(Object.assign({}, state.delete[failureDeleteIdx]), { loading: false, object: null, error: action.payload.error })
                        ]), __read(state.delete.slice(failureDeleteIdx + 1))) });
                }
                return state;
            case actionTypes.DELETE_ALL:
                return Object.assign(Object.assign({}, state), { deleteAll: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            ids: action.payload.items.map(function (i) { return i.id; }),
                            objects: null,
                            error: null
                        }
                    ], __read(state.deleteAll.slice(0, stateQueueLimit - 1))) });
            case actionTypes.DELETE_ALL_SUCCESS:
                var successDeleteAllIdx = state.deleteAll.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successDeleteAllIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { deleteAll: __spreadArray(__spreadArray(__spreadArray([], __read(state.deleteAll.slice(0, successDeleteAllIdx))), [
                            Object.assign(Object.assign({}, state.deleteAll[successDeleteAllIdx]), { loading: false, objects: action.payload.items, error: null })
                        ]), __read(state.deleteAll.slice(successDeleteAllIdx + 1))) });
                }
                return state;
            case actionTypes.DELETE_ALL_FAILURE:
                var failureDeleteAllIdx = state.deleteAll.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failureDeleteAllIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { deleteAll: __spreadArray(__spreadArray(__spreadArray([], __read(state.deleteAll.slice(0, failureDeleteAllIdx))), [
                            Object.assign(Object.assign({}, state.deleteAll[failureDeleteAllIdx]), { loading: false, objects: null, error: action.payload.error })
                        ]), __read(state.deleteAll.slice(failureDeleteAllIdx + 1))) });
                }
                return state;
            case actionTypes.QUERY:
                return Object.assign(Object.assign({}, state), { query: __spreadArray([
                        {
                            uuid: action.uuid,
                            loading: true,
                            options: action.payload.params,
                            objects: null,
                            error: null
                        }
                    ], __read(state.query.slice(0, stateQueueLimit - 1))) });
            case actionTypes.QUERY_SUCCESS:
                var successQueryIdx = state.query.findIndex(function (g) { return g.uuid === action.uuid; });
                if (successQueryIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { query: __spreadArray(__spreadArray(__spreadArray([], __read(state.query.slice(0, successQueryIdx))), [
                            Object.assign(Object.assign({}, state.query[successQueryIdx]), { loading: false, options: Object.assign({}, state.query[successQueryIdx].options), objects: action.payload.result, error: null })
                        ]), __read(state.query.slice(successQueryIdx + 1))) });
                }
                return state;
            case actionTypes.QUERY_FAILURE:
                var failureQueryIdx = state.query.findIndex(function (g) { return g.uuid === action.uuid; });
                if (failureQueryIdx >= 0) {
                    return Object.assign(Object.assign({}, state), { query: __spreadArray(__spreadArray(__spreadArray([], __read(state.query.slice(0, failureQueryIdx))), [
                            Object.assign(Object.assign({}, state.query[failureQueryIdx]), { loading: false, options: Object.assign({}, state.query[failureQueryIdx].options), objects: null, error: action.payload.error })
                        ]), __read(state.query.slice(failureQueryIdx + 1))) });
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
    function createAction(params) {
        return {
            type: params.type,
            uuid: params.uuid || uuid.v4(),
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
    var ModelEffects = /** @class */ (function () {
        function ModelEffects(_actions, _service, _manager, _actionTypes) {
            var _this = this;
            this._actions = _actions;
            this._service = _service;
            this._manager = _manager;
            this._actionTypes = _actionTypes;
            this.modelGet$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.GET), operators.mergeMap(function (action) { return _this._manager.get(action.payload.id)
                .pipe(operators.map(function (item) { return createAction({
                type: _this._actionTypes.GET_SUCCESS,
                payload: { item: item },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.GET_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
            this.modelList$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.LIST), operators.mergeMap(function (action) { return _this._manager.list(action.payload.params)
                .pipe(operators.map(function (result) { return createAction({
                type: _this._actionTypes.LIST_SUCCESS,
                payload: { result: result },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.LIST_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
            this.modelCreate$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.CREATE), operators.mergeMap(function (action) { return _this._manager.create(action.payload.item)
                .pipe(operators.map(function (item) { return createAction({
                type: _this._actionTypes.CREATE_SUCCESS,
                payload: { item: item },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.CREATE_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
            this.modelUpdate$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.UPDATE), operators.mergeMap(function (action) { return _this._manager.update(action.payload.item.id, action.payload.item)
                .pipe(operators.map(function (item) { return createAction({
                type: _this._actionTypes.UPDATE_SUCCESS,
                payload: { item: item },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.CREATE_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
            this.modelPatch$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.PATCH), operators.mergeMap(function (action) { return _this._manager.patch(action.payload.item.id, action.payload.item)
                .pipe(operators.map(function (item) { return createAction({
                type: _this._actionTypes.PATCH_SUCCESS,
                payload: { item: item },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.PATCH_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
            this.modelDelete$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.DELETE), operators.mergeMap(function (action) { return _this._manager.delete(action.payload.item.id)
                .pipe(operators.map(function () { return createAction({
                type: _this._actionTypes.DELETE_SUCCESS,
                payload: { item: action.payload.item },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.DELETE_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
            this.modelDeleteAll$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.DELETE_ALL), operators.mergeMap(function (action) { return _this._manager.deleteAll(action.payload.items.map(function (i) { return i.id; }))
                .pipe(operators.map(function () { return createAction({
                type: _this._actionTypes.DELETE_ALL_SUCCESS,
                payload: { items: action.payload.items },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.DELETE_ALL_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
            this.modelQuery$ = effects.createEffect(function () { return _this._actions.pipe(effects.ofType(_this._actionTypes.QUERY), operators.mergeMap(function (action) { return _this._manager.query(action.payload.params)
                .pipe(operators.map(function (result) { return createAction({
                type: _this._actionTypes.QUERY_SUCCESS,
                payload: { result: result },
                uuid: action.uuid
            }); }), operators.catchError(function (error) { return rxjs.of(createAction({
                type: _this._actionTypes.QUERY_FAILURE,
                payload: { message: error.message, stack: error.stack },
                uuid: action.uuid
            })); })); })); });
        }
        return ModelEffects;
    }());

    var ModelManager = /** @class */ (function (_super) {
        __extends(ModelManager, _super);
        function ModelManager(config, endPoint, _http, syncService) {
            var _this = _super.call(this) || this;
            _this._http = _http;
            _this._useTrailingSlash = false;
            _this._endPoint = endPoint;
            _this._baseUrl = "" + config.baseApiUrl + _this._endPoint;
            _this._useTrailingSlash = config.addTrailingSlash != null ? config.addTrailingSlash : false;
            if (syncService != null && config.syncModel) {
                if (config.tableName == null) {
                    throw new Error("Table name must be set for model " + _this._endPoint);
                }
                syncService.registerSyncModel(_this._baseUrl, config.tableName);
            }
            return _this;
        }
        Object.defineProperty(ModelManager.prototype, "baseUrl", {
            get: function () {
                return this._baseUrl;
            },
            enumerable: false,
            configurable: true
        });
        ModelManager.prototype.get = function (id) {
            return this._http.get(this._getObjectUrl(id));
        };
        ModelManager.prototype.list = function (options) {
            var params = this._listParamsToQueryParameters(options);
            return this._http.get("" + this._getListUrl() + params);
        };
        ModelManager.prototype.create = function (data) {
            return this._http.post(this._getListUrl(), data);
        };
        ModelManager.prototype.update = function (id, data) {
            return this._http.put(this._getObjectUrl(id), data);
        };
        ModelManager.prototype.patch = function (id, data) {
            return this._http.patch(this._getObjectUrl(id), data);
        };
        ModelManager.prototype.delete = function (id) {
            return this._http.delete(this._getObjectUrl(id));
        };
        ModelManager.prototype.deleteAll = function (ids) {
            var url = this._baseUrl + "/delete_all";
            if (this._useTrailingSlash) {
                url = url + "/";
            }
            return this._http.post(url, { ids: ids });
        };
        ModelManager.prototype.query = function (params) {
            var url = this._baseUrl + "/query";
            if (this._useTrailingSlash) {
                url = url + "/";
            }
            return this._http.post(url, params);
        };
        ModelManager.prototype._getObjectUrl = function (id) {
            var url = this._baseUrl + "/" + id;
            if (this._useTrailingSlash) {
                url = url + "/";
            }
            return url;
        };
        ModelManager.prototype._getListUrl = function () {
            var url = this._baseUrl;
            if (this._useTrailingSlash) {
                url = url + "/";
            }
            return url;
        };
        ModelManager.prototype._listParamsToQueryParameters = function (options) {
            var params = '';
            var paramsArray = [];
            if (options) {
                if (options.limit) {
                    paramsArray.push("limit=" + options.limit);
                }
                if (options.start) {
                    paramsArray.push("start=" + options.start);
                }
                if (options.sort) {
                    var props = Object.keys(options.sort);
                    paramsArray.push("sort=" + props.map(function (p) { return p + ":" + options.sort[p]; }).join(','));
                }
                if (options.fields) {
                    paramsArray.push("fields=" + options.fields.join(','));
                }
                if (options.joins) {
                    paramsArray.push("joins=" + options.joins
                        .map(function (j) {
                        var join = j.model + "." + j.property;
                        if (j.fields) {
                            return join + "." + j.fields.join(';');
                        }
                        return join;
                    })
                        .join(','));
                }
                if (paramsArray.length > 0) {
                    params = "?" + paramsArray.join('&');
                }
            }
            return params;
        };
        return ModelManager;
    }(common.ModelManager));
    ModelManager.ctorParameters = function () { return [
        { type: undefined },
        { type: String },
        { type: http.HttpClient },
        { type: sync.SyncService, decorators: [{ type: core.Optional }] }
    ]; };

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
    var MODEL_OPTIONS = new core.InjectionToken('MODEL_OPTIONS', { providedIn: 'root', factory: function () { return ({ baseApiUrl: '/' }); } });

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
    var ModelService = /** @class */ (function () {
        function ModelService(_store, _actions, _actionTypes, statePrefixes) {
            this._store = _store;
            this._actions = _actions;
            this._actionTypes = _actionTypes;
            var packageState = store.createFeatureSelector(statePrefixes[0]);
            this._modelState = store.createSelector(packageState, function (s) { return s[statePrefixes[1]]; });
            this._lastGetEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.get; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
            this._lastListEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.list; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
            this._lastCreateEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.create; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
            this._lastPatchEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.patch; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
            this._lastUpdateEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.update; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
            this._lastDeleteEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.delete; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
            this._lastDeleteAllEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.deleteAll; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
            this._lastQueryEntry = rxjs.pipe(store.select(store.createSelector(this._modelState, function (state) { return state.query; })), operators.filter(function (g) { return g.length > 0; }), operators.map(function (g) { return g[0]; }));
        }
        ModelService.prototype.getGetLoading = function () {
            return this._store.pipe(this._lastGetEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getGetOptions = function () {
            return this._store.pipe(this._lastGetEntry, operators.map(function (g) { return g.options; }));
        };
        ModelService.prototype.getGetId = function () {
            return this._store.pipe(this._lastGetEntry, operators.map(function (g) { return g.id; }));
        };
        ModelService.prototype.getGetObject = function () {
            return this._store.pipe(this._lastGetEntry, operators.map(function (g) { return g.object; }));
        };
        ModelService.prototype.getGetError = function () {
            return this._store.pipe(this._lastGetEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getListLoading = function () {
            return this._store.pipe(this._lastListEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getListOptions = function () {
            return this._store.pipe(this._lastListEntry, operators.map(function (g) { return g.options; }));
        };
        ModelService.prototype.getListObjects = function () {
            return this._store.pipe(this._lastListEntry, operators.map(function (g) { return g.objects; }));
        };
        ModelService.prototype.getListError = function () {
            return this._store.pipe(this._lastListEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getListHasNext = function () {
            return this._store.pipe(this._lastListEntry, operators.map(function (g) { return g.objects != null && g.objects.next != null; }));
        };
        ModelService.prototype.getListCurrentStart = function () {
            return this._store.pipe(this._lastListEntry, operators.filter(function (g) { return g.options != null; }), operators.map(function (g) { return g.options.start != null ? g.options.start : 1; }));
        };
        ModelService.prototype.getCreateLoading = function () {
            return this._store.pipe(this._lastCreateEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getCreateObject = function () {
            return this._store.pipe(this._lastCreateEntry, operators.map(function (g) { return g.object; }));
        };
        ModelService.prototype.getCreateError = function () {
            return this._store.pipe(this._lastCreateEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getUpdateLoading = function () {
            return this._store.pipe(this._lastUpdateEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getUpdateId = function () {
            return this._store.pipe(this._lastUpdateEntry, operators.map(function (g) { return g.id; }));
        };
        ModelService.prototype.getUpdateObject = function () {
            return this._store.pipe(this._lastUpdateEntry, operators.map(function (g) { return g.object; }));
        };
        ModelService.prototype.getUpdateError = function () {
            return this._store.pipe(this._lastUpdateEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getPatchLoading = function () {
            return this._store.pipe(this._lastPatchEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getPatchId = function () {
            return this._store.pipe(this._lastPatchEntry, operators.map(function (g) { return g.id; }));
        };
        ModelService.prototype.getPatchObject = function () {
            return this._store.pipe(this._lastPatchEntry, operators.map(function (g) { return g.object; }));
        };
        ModelService.prototype.getPatchError = function () {
            return this._store.pipe(this._lastPatchEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getDeleteLoading = function () {
            return this._store.pipe(this._lastDeleteEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getDeleteId = function () {
            return this._store.pipe(this._lastDeleteEntry, operators.map(function (g) { return g.id; }));
        };
        ModelService.prototype.getDeleteObject = function () {
            return this._store.pipe(this._lastDeleteEntry, operators.map(function (g) { return g.object; }));
        };
        ModelService.prototype.getDeleteError = function () {
            return this._store.pipe(this._lastDeleteEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getDeleteAllLoading = function () {
            return this._store.pipe(this._lastDeleteAllEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getDeleteAllIds = function () {
            return this._store.pipe(this._lastDeleteAllEntry, operators.map(function (g) { return g.ids; }));
        };
        ModelService.prototype.getDeleteAllObjects = function () {
            return this._store.pipe(this._lastDeleteAllEntry, operators.map(function (g) { return g.objects; }));
        };
        ModelService.prototype.getDeleteAllError = function () {
            return this._store.pipe(this._lastDeleteAllEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getQueryLoading = function () {
            return this._store.pipe(this._lastQueryEntry, operators.map(function (g) { return g.loading; }));
        };
        ModelService.prototype.getQueryOptions = function () {
            return this._store.pipe(this._lastQueryEntry, operators.map(function (g) { return g.options; }));
        };
        ModelService.prototype.getQueryObjects = function () {
            return this._store.pipe(this._lastQueryEntry, operators.map(function (g) { return g.objects; }));
        };
        ModelService.prototype.getQueryError = function () {
            return this._store.pipe(this._lastQueryEntry, operators.map(function (g) { return g.error; }));
        };
        ModelService.prototype.getQueryHasNext = function () {
            return this._store.pipe(this._lastQueryEntry, operators.map(function (g) { return g.objects != null && g.objects.next != null; }));
        };
        ModelService.prototype.getQueryCurrentStart = function () {
            return this._store.pipe(this._lastQueryEntry, operators.filter(function (g) { return g.options != null; }), operators.map(function (g) { return g.options.start != null ? g.options.start : 1; }));
        };
        ModelService.prototype.getCreateSuccess = function () {
            return this._actions.pipe(effects.ofType(this._actionTypes.CREATE_SUCCESS));
        };
        ModelService.prototype.getUpdateSuccess = function () {
            return this._actions.pipe(effects.ofType(this._actionTypes.UPDATE_SUCCESS));
        };
        ModelService.prototype.getPatchSuccess = function () {
            return this._actions.pipe(effects.ofType(this._actionTypes.PATCH_SUCCESS));
        };
        ModelService.prototype.getDeleteSuccess = function () {
            return this._actions.pipe(effects.ofType(this._actionTypes.DELETE_SUCCESS));
        };
        ModelService.prototype.getDeleteAllSuccess = function () {
            return this._actions.pipe(effects.ofType(this._actionTypes.DELETE_ALL_SUCCESS));
        };
        ModelService.prototype.get = function (id) {
            var _this = this;
            var action = createAction({ type: this._actionTypes.GET, payload: { id: id } });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.GET_SUCCESS, this._actionTypes.GET_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.get; })(s); }), operators.map(function (gets) { return gets.find(function (g) { return g.uuid === action.uuid; }); }), operators.filter(function (get) { return get != null; }), operators.tap(function (get) {
                if (get.error != null) {
                    rxjs.throwError(get.error);
                }
            }), operators.filter(function (get) { return get.object != null; }), operators.map(function (get) { return get.object; }), operators.take(1));
        };
        ModelService.prototype.list = function (options) {
            var _this = this;
            var action = createAction({ type: this._actionTypes.LIST, payload: { params: options || {} } });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.LIST_SUCCESS, this._actionTypes.LIST_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.list; })(s); }), operators.map(function (lists) { return lists.find(function (l) { return l.uuid === action.uuid; }); }), operators.filter(function (list) { return list != null; }), operators.tap(function (list) {
                if (list.error != null) {
                    rxjs.throwError(list.error);
                }
            }), operators.filter(function (list) { return list.objects != null; }), operators.map(function (list) { return list.objects; }), operators.take(1));
        };
        ModelService.prototype.create = function (data) {
            var _this = this;
            var action = createAction({
                type: this._actionTypes.CREATE,
                payload: { item: data },
            });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.CREATE_SUCCESS, this._actionTypes.CREATE_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.create; })(s); }), operators.map(function (creates) { return creates.find(function (c) { return c.uuid === action.uuid; }); }), operators.filter(function (creates) { return creates != null; }), operators.tap(function (create) {
                if (create.error != null) {
                    rxjs.throwError(create.error);
                }
            }), operators.filter(function (create) { return create.object != null; }), operators.map(function (create) { return create.object; }), operators.take(1));
        };
        ModelService.prototype.update = function (data) {
            var _this = this;
            var action = createAction({
                type: this._actionTypes.UPDATE,
                payload: { item: data },
            });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.UPDATE_SUCCESS, this._actionTypes.UPDATE_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.update; })(s); }), operators.map(function (updates) { return updates.find(function (u) { return u.uuid === action.uuid; }); }), operators.filter(function (updates) { return updates != null; }), operators.tap(function (update) {
                if (update.error != null) {
                    rxjs.throwError(update.error);
                }
            }), operators.filter(function (update) { return update.object != null; }), operators.map(function (update) { return update.object; }), operators.take(1));
        };
        ModelService.prototype.patch = function (data) {
            var _this = this;
            var action = createAction({ type: this._actionTypes.PATCH, payload: { item: data } });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.PATCH_SUCCESS, this._actionTypes.PATCH_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.patch; })(s); }), operators.map(function (patches) { return patches.find(function (p) { return p.uuid === action.uuid; }); }), operators.filter(function (patches) { return patches != null; }), operators.tap(function (patch) {
                if (patch.error != null) {
                    rxjs.throwError(patch.error);
                }
            }), operators.filter(function (patch) { return patch.object != null; }), operators.map(function (patch) { return patch.object; }), operators.take(1));
        };
        ModelService.prototype.delete = function (data) {
            var _this = this;
            var action = createAction({ type: this._actionTypes.DELETE, payload: { item: data } });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.DELETE_SUCCESS, this._actionTypes.DELETE_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.delete; })(s); }), operators.map(function (dels) { return dels.find(function (d) { return d.uuid === action.uuid; }); }), operators.filter(function (dels) { return dels != null; }), operators.tap(function (del) {
                if (del.error != null) {
                    rxjs.throwError(del.error);
                }
            }), operators.filter(function (del) { return del.object != null; }), operators.map(function (del) { return del.object; }), operators.take(1));
        };
        ModelService.prototype.deleteAll = function (data) {
            var _this = this;
            var action = createAction({ type: this._actionTypes.DELETE_ALL, payload: { items: data } });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.DELETE_ALL_SUCCESS, this._actionTypes.DELETE_ALL_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.deleteAll; })(s); }), operators.map(function (deleteAlls) { return deleteAlls.find(function (d) { return d.uuid === action.uuid; }); }), operators.filter(function (deleteAlls) { return deleteAlls != null; }), operators.tap(function (deleteAll) {
                if (deleteAll.error != null) {
                    rxjs.throwError(deleteAll.error);
                }
            }), operators.filter(function (deleteAll) { return deleteAll.objects != null; }), operators.map(function (deleteAll) { return deleteAll.objects; }), operators.take(1));
        };
        ModelService.prototype.query = function (options) {
            var _this = this;
            var action = createAction({ type: this._actionTypes.QUERY, payload: { params: options || {} } });
            this._store.dispatch(action);
            var actResult = this._actions.pipe(effects.ofType(this._actionTypes.QUERY_SUCCESS, this._actionTypes.QUERY_FAILURE), operators.filter(function (a) { return a.uuid === action.uuid; }));
            return actResult.pipe(operators.switchMap(function () { return _this._store; }), store.select(function (s) { return store.createSelector(_this._modelState, function (state) { return state.query; })(s); }), operators.map(function (queries) { return queries.find(function (q) { return q.uuid === action.uuid; }); }), operators.filter(function (queries) { return queries != null; }), operators.tap(function (query) {
                if (query.error != null) {
                    rxjs.throwError(query.error);
                }
            }), operators.filter(function (query) { return query.objects != null; }), operators.map(function (query) { return query.objects; }), operators.take(1));
        };
        return ModelService;
    }());

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

    exports.MODEL_OPTIONS = MODEL_OPTIONS;
    exports.ModelBaseAction = ModelBaseAction;
    exports.ModelCreateAction = ModelCreateAction;
    exports.ModelCreateFailureAction = ModelCreateFailureAction;
    exports.ModelCreateSuccessAction = ModelCreateSuccessAction;
    exports.ModelDeleteAction = ModelDeleteAction;
    exports.ModelDeleteAllAction = ModelDeleteAllAction;
    exports.ModelDeleteAllFailureAction = ModelDeleteAllFailureAction;
    exports.ModelDeleteAllSuccessAction = ModelDeleteAllSuccessAction;
    exports.ModelDeleteFailureAction = ModelDeleteFailureAction;
    exports.ModelDeleteSuccessAction = ModelDeleteSuccessAction;
    exports.ModelEffects = ModelEffects;
    exports.ModelGetAction = ModelGetAction;
    exports.ModelGetFailureAction = ModelGetFailureAction;
    exports.ModelGetSuccessAction = ModelGetSuccessAction;
    exports.ModelListAction = ModelListAction;
    exports.ModelListFailureAction = ModelListFailureAction;
    exports.ModelListSuccessAction = ModelListSuccessAction;
    exports.ModelManager = ModelManager;
    exports.ModelPatchAction = ModelPatchAction;
    exports.ModelPatchFailureAction = ModelPatchFailureAction;
    exports.ModelPatchSuccessAction = ModelPatchSuccessAction;
    exports.ModelQueryAction = ModelQueryAction;
    exports.ModelQueryFailureAction = ModelQueryFailureAction;
    exports.ModelQuerySuccessAction = ModelQuerySuccessAction;
    exports.ModelService = ModelService;
    exports.ModelUpdateAction = ModelUpdateAction;
    exports.ModelUpdateFailureAction = ModelUpdateFailureAction;
    exports.ModelUpdateSuccessAction = ModelUpdateSuccessAction;
    exports.createAction = createAction;
    exports.generateInitialModelState = generateInitialModelState;
    exports.generateModelActionTypes = generateModelActionTypes;
    exports.modelReducer = modelReducer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-model.umd.js.map
