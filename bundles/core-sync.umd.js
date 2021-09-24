(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('pouchdb'), require('pouchdb-find')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/sync', ['exports', '@angular/common/http', '@angular/core', 'rxjs', 'rxjs/operators', 'pouchdb', 'pouchdb-find'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.sync = {}), global.ng.common.http, global.ng.core, global.rxjs, global.rxjs.operators, global.pouchdb, global.pouchdb.find));
}(this, (function (exports, http, core, rxjs, operators, PouchDB, PouchDBFind) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var PouchDB__namespace = /*#__PURE__*/_interopNamespace(PouchDB);
    var PouchDBFind__namespace = /*#__PURE__*/_interopNamespace(PouchDBFind);

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
    var SYNC_REGISTERED_MODELS = [];

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
    var SYNC_OPTIONS = new core.InjectionToken('SYNC_OPTIONS');

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
    function registerSyncModel(endpoint, tableName) {
        if (SYNC_REGISTERED_MODELS.find(function (r) { return r.tableName === tableName; }) == null) {
            var registeredModel = { tableName: tableName, endpoint: endpoint };
            SYNC_REGISTERED_MODELS.push(registeredModel);
            console.log("Registered sync model " + tableName + " with endpoint " + endpoint);
        }
    }

    var pouchDBStatic = PouchDB__namespace.default || PouchDB__namespace;
    var pouchDBFindPlugin = PouchDBFind__namespace.default || PouchDBFind__namespace;
    var SyncService = /** @class */ (function () {
        function SyncService(_opts, _httpClient) {
            this._opts = _opts;
            this._httpClient = _httpClient;
            this._status = new rxjs.BehaviorSubject({ status: 'initializing' });
            this.status = this._status;
            this._timerSub = rxjs.Subscription.EMPTY;
            this._syncing = false;
            this._remoteCheckpointKey = 'gngt_remote_sync_checkpoint';
            this._localCheckpointKey = 'gngt_local_sync_checkpoint';
            this._localSyncNumber = 'gngt_local_sync_number';
            this._localSyncEntryPrefix = 'gngt_local_sync_entry_';
            this._relationalModelIdx = {
                index: { name: 'relational_model_idx', fields: ['table_name', 'object_id'] }
            };
            this._databaseInit = new rxjs.BehaviorSubject(false);
            if (this._opts.syncInterval == null) {
                this._opts.syncInterval = 300000;
            }
            if (this._opts.changesBatchSize == null) {
                this._opts.changesBatchSize = 50;
            }
            this._syncUrl = "" + this._opts.baseUrl + (this._opts.changesPath || 'changes');
            this._changesUrl = "" + this._opts.baseUrl + (this._opts.docsPath || 'docs');
            this._initLocalDatabase();
            this._databaseIsInit = this._databaseInit.pipe(operators.filter(function (i) { return i; }));
        }
        SyncService.prototype.registerSyncModel = function (endPoint, tableName) {
            registerSyncModel(endPoint, tableName);
        };
        SyncService.prototype.start = function (immediate) {
            var _this = this;
            if (immediate === void 0) { immediate = true; }
            if (this._syncing) {
                return;
            }
            this._syncing = true;
            this._timerSub = rxjs.timer(immediate ? 0 : this._opts.syncInterval, this._opts.syncInterval)
                .pipe(operators.delayWhen(function (_) { return _this._databaseIsInit; }))
                .subscribe(function (_) { return _this._checkSync(); });
        };
        SyncService.prototype.stop = function () {
            if (!this._syncing) {
                return;
            }
            this._timerSub.unsubscribe();
            this._syncing = false;
        };
        SyncService.prototype.get = function (tableName, params) {
            var _this = this;
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.exhaustMap(function (_) { return _this._relationalModelIdxObs(); }), operators.exhaustMap(function (rmi) {
                var findPromise = db.find(_this._modelGetFindRequest(tableName, params, rmi));
                return rxjs.from(findPromise)
                    .pipe(operators.take(1), operators.map(function (res) { return ({ res: res, rmi: rmi }); }));
            }), operators.switchMap(function (r) {
                var res = r.res, rmi = r.rmi;
                if (res.docs.length === 1) {
                    var obj_1 = _this._subObject(res.docs[0].object, params.fields);
                    if (params.joins != null) {
                        var observables = params.joins.map(function (join) {
                            var findPromise = db.find(_this._modelGetFindRequest(join.model, { id: obj_1[join.property], fields: join.fields }, rmi));
                            return rxjs.from(findPromise)
                                .pipe(operators.take(1), operators.map(function (relRes) {
                                var related = relRes;
                                return related.docs.length === 1 ? related.docs[0].object : null;
                            }), operators.map(function (related) { return ({ join: join, related: related }); }));
                        });
                        return rxjs.zip.apply(void 0, __spreadArray([], __read(observables))).pipe(operators.map(function (joins) {
                            joins.forEach(function (joinEntry) {
                                obj_1[joinEntry.join.property] = joinEntry.related;
                            });
                            return obj_1;
                        }));
                    }
                    return rxjs.of(obj_1);
                }
                return rxjs.throwError('not_found');
            }), operators.take(1));
        };
        SyncService.prototype.list = function (tableName, params) {
            var _this = this;
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.exhaustMap(function (_) { return _this._relationalModelIdxObs({ tableName: tableName, sort: params.sort }); }), operators.exhaustMap(function (idx) {
                var findReq = _this._modelListFindRequest(tableName, params, idx);
                return rxjs.from(db.find(findReq))
                    .pipe(operators.take(1), operators.catchError(function (err) {
                    if (err.error === 'no_usable_index') {
                        delete findReq.use_index;
                        delete findReq.sort;
                        return rxjs.from(db.find(findReq)).pipe(operators.take(1));
                    }
                    return rxjs.throwError(err);
                }));
            }), operators.switchMap(function (res) { return _this._relationalModelIdxObs().pipe(operators.map(function (idx) { return ({ res: res, idx: idx }); })); }), operators.switchMap(function (curRes) {
                var res = curRes.res, idx = curRes.idx;
                if (params.joins != null) {
                    var joinTables_1 = params.joins.reduce(function (prev, cur) {
                        var fk = cur.foreignKey || cur.property;
                        prev[cur.model] = res.docs.map(function (d) { return d.object[fk]; });
                        return prev;
                    }, {});
                    return rxjs.zip.apply(void 0, __spreadArray([], __read(params.joins.map(function (join) {
                        var joinModel = join.offlineModel || join.model;
                        var req = _this._modelListFindRequest(joinModel, { fields: join.fields }, idx);
                        req.selector['object_id'] = { '$in': joinTables_1[join.model] };
                        return rxjs.from(db.find(req))
                            .pipe(operators.take(1), operators.map(function (related) { return ({
                            join: join,
                            related: related.docs
                        }); }));
                    })))).pipe(operators.map(function (joins) {
                        return res.docs.map(function (doc) {
                            var obj = doc.object;
                            var joinsObj = joins.reduce(function (jo, joinEntry) {
                                var prop = joinEntry.join.property;
                                var fk = joinEntry.join.foreignKey || joinEntry.join.property;
                                var rel = joinEntry.related.find(function (r) { return r.object_id === obj[fk]; });
                                jo[prop] = rel != null ? rel.object : null;
                                return jo;
                            }, {});
                            return Object.assign(Object.assign({}, _this._subObject(obj, params.fields)), joinsObj);
                        });
                    }));
                }
                return rxjs.of(res.docs.map(function (d) { return _this._subObject(d.object, params.fields); }));
            }), operators.map(function (r) {
                var results = r;
                return {
                    count: results.length,
                    results: results,
                    previous: null,
                    next: null,
                };
            }), operators.take(1));
        };
        SyncService.prototype.create = function (tableName, object) {
            var _this = this;
            return this._databaseIsInit.pipe(operators.exhaustMap(function (_) { return _this._nextObjectId(tableName).pipe(operators.take(1)); }), operators.exhaustMap(function (id) {
                object = Object.assign({ id: id }, object);
                var localDoc = { table_name: tableName, object_id: id };
                return rxjs.from(_this._database.post(Object.assign(Object.assign({}, localDoc), { object: object })))
                    .pipe(operators.exhaustMap(function (d) {
                    var doc = d;
                    return _this
                        ._createLocalSyncEntry(Object.assign({ doc_id: doc.id, entry_type: 'insert' }, localDoc))
                        .pipe(operators.map(function () { return object; }));
                }));
            }), operators.take(1));
        };
        SyncService.prototype.update = function (tableName, id, object) {
            var _this = this;
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.switchMap(function (_) { return _this._relationalModelIdxObs(); }), operators.exhaustMap(function (idx) { return rxjs.from(db.find(_this._modelGetFindRequest(tableName, { id: id }, idx)))
                .pipe(operators.take(1)); }), operators.exhaustMap(function (curRes) {
                var res = curRes;
                if (res.docs.length !== 1) {
                    return rxjs.throwError('not_found');
                }
                var localDoc = Object.assign(Object.assign({}, res.docs[0]), { object: object });
                return rxjs.from(db.post(localDoc))
                    .pipe(operators.map(function (r) { return ({ res: r, localDoc: localDoc }); }), operators.take(1));
            }), operators.exhaustMap(function (r) {
                var res = r.res, localDoc = r.localDoc;
                var syncEntry = {
                    doc_id: res.id,
                    table_name: tableName,
                    object_id: localDoc.object_id,
                    entry_type: 'update'
                };
                return _this._createLocalSyncEntry(syncEntry).pipe(operators.map(function () { return localDoc.object; }), operators.take(1));
            }), operators.take(1));
        };
        SyncService.prototype.delete = function (tableName, id) {
            var _this = this;
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.switchMap(function (_) { return _this._relationalModelIdxObs(); }), operators.exhaustMap(function (idx) { return rxjs.from(db.find(_this._modelGetFindRequest(tableName, { id: id }, idx)))
                .pipe(operators.take(1)); }), operators.exhaustMap(function (curRes) {
                var res = curRes;
                if (res.docs.length !== 1) {
                    return rxjs.throwError('not_found');
                }
                var localDoc = res.docs[0];
                return rxjs.from(db.remove(localDoc))
                    .pipe(operators.map(function (r) { return ({ res: r, localDoc: localDoc }); }), operators.take(1));
            }), operators.exhaustMap(function (r) {
                var res = r.res, localDoc = r.localDoc;
                var syncEntry = {
                    doc_id: res.id,
                    table_name: tableName,
                    object_id: localDoc.object_id,
                    entry_type: 'delete'
                };
                return _this._createLocalSyncEntry(syncEntry).pipe(operators.map(function () { return localDoc.object; }), operators.take(1));
            }), operators.take(1));
        };
        SyncService.prototype.deleteAll = function (tableName, ids) {
            var _this = this;
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.switchMap(function (_) { return _this._relationalModelIdxObs(); }), operators.exhaustMap(function (idx) { return rxjs.from(db.find(_this._modelBulkIdsFindRequest(tableName, ids, idx)))
                .pipe(operators.take(1)); }), operators.concatMap(function (r) {
                var res = r;
                if (res.docs.length !== 1) {
                    return rxjs.throwError('not_found');
                }
                return rxjs.from(res.docs);
            }), operators.concatMap(function (ld) {
                var localDoc = ld;
                return rxjs.from(db.remove(localDoc))
                    .pipe(operators.map(function (res) { return ({ res: res, localDoc: localDoc }); }));
            }), operators.concatMap(function (r) {
                var res = r.res, localDoc = r.localDoc;
                var syncEntry = {
                    doc_id: res.id,
                    table_name: tableName,
                    object_id: localDoc.object_id,
                    entry_type: 'delete'
                };
                return _this._createLocalSyncEntry(syncEntry).pipe(operators.map(function () { return localDoc.object; }));
            }), operators.take(ids.length), operators.toArray());
        };
        SyncService.prototype.query = function (tableName, params) {
            var _this = this;
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.exhaustMap(function (_) { return _this._relationalModelIdxObs({ tableName: tableName, selector: params.selector, sort: params.sort })
                .pipe(operators.take(1)); }), operators.exhaustMap(function (idx) {
                var findReq = _this._modelQueryFindRequest(tableName, params, idx);
                return rxjs.from(db.find(findReq))
                    .pipe(operators.take(1), operators.catchError(function (err) {
                    if (err.error === 'no_usable_index') {
                        delete findReq.use_index;
                        delete findReq.sort;
                        return rxjs.from(db.find(findReq)).pipe(operators.take(1));
                    }
                    return rxjs.throwError(err);
                }));
            }), operators.switchMap(function (r) {
                var res = r;
                return _this._relationalModelIdxObs()
                    .pipe(operators.map(function (idx) { return ({ res: res, idx: idx }); }));
            }), operators.switchMap(function (curRes) {
                var res = curRes.res, idx = curRes.idx;
                if (params.joins != null) {
                    var joinTables_2 = params.joins.reduce(function (prev, cur) {
                        var fk = cur.foreignKey || cur.property;
                        prev[cur.model] = res.docs.map(function (d) { return d.object[fk]; });
                        return prev;
                    }, {});
                    return rxjs.zip.apply(void 0, __spreadArray([], __read(params.joins.map(function (join) {
                        var joinModel = join.offlineModel || join.model;
                        var req = _this._modelListFindRequest(joinModel, { fields: join.fields }, idx);
                        req.selector['object_id'] = { '$in': joinTables_2[join.model] };
                        return rxjs.from(db.find(req))
                            .pipe(operators.map(function (related) { return ({
                            join: join,
                            related: related
                                .docs
                        }); }), operators.take(1));
                    })))).pipe(operators.map(function (joins) {
                        return res.docs.map(function (doc) {
                            var obj = doc.object;
                            var joinsObj = joins.reduce(function (jo, joinEntry) {
                                var prop = joinEntry.join.property;
                                var fk = joinEntry.join.foreignKey || joinEntry.join.property;
                                var rel = joinEntry.related.find(function (r) { return r.object_id === obj[fk]; });
                                jo[prop] = rel != null ? rel.object : null;
                                return jo;
                            }, {});
                            return Object.assign(Object.assign({}, _this._subObject(obj, params.fields)), joinsObj);
                        });
                    }));
                }
                return rxjs.of(res.docs.map(function (d) { return _this._subObject(d.object, params.fields); }));
            }), operators.map(function (results) { return ({
                count: results.length,
                results: results,
                previous: null,
                next: null,
            }); }), operators.take(1));
        };
        SyncService.prototype._getLocalDocsDb = function () {
            return this._database;
        };
        SyncService.prototype._getLocalSyncDb = function () {
            return this._database;
        };
        SyncService.prototype._getLocalSyncNumberDb = function () {
            return this._database;
        };
        SyncService.prototype._getSyncCheckpointDb = function () {
            return this._database;
        };
        SyncService.prototype._createLocalSyncEntry = function (syncEntry) {
            var _this = this;
            return this._getNextLocalSyncNumber().pipe(operators.exhaustMap(function (syncNumber) {
                syncEntry._id = "_local/" + _this._localSyncEntryPrefix + syncNumber;
                syncEntry.sequence = syncNumber;
                return rxjs.from(_this._database.put(syncEntry))
                    .pipe(operators.take(1), operators.exhaustMap(function (_) { return _this._setLocalSyncNumber(syncNumber).pipe(operators.take(1)); }));
            }));
        };
        SyncService.prototype._setLocalSyncNumber = function (syncNumber) {
            var db = this._getLocalSyncNumberDb();
            var id = "_local/" + this._localSyncNumber;
            return rxjs.from(db.get(id))
                .pipe(operators.take(1), operators.catchError(function (_) { return rxjs.of({ _id: id, number: 0 }); }), operators.exhaustMap(function (doc) { return rxjs.from(db.post(Object.assign(Object.assign({}, doc), { number: syncNumber })))
                .pipe(operators.take(1)); }), operators.map(function (_) { return syncNumber; }));
        };
        SyncService.prototype._getNextLocalSyncNumber = function () {
            var db = this._getLocalSyncNumberDb();
            return rxjs.from(db.get("_local/" + this._localSyncNumber))
                .pipe(operators.take(1), operators.map(function (doc) { return doc.number + 1; }), operators.catchError(function (_) { return rxjs.of(1); }));
        };
        SyncService.prototype._nextObjectId = function (tableName) {
            var _this = this;
            var sort = { object_id: 'desc' };
            var db = this._getLocalDocsDb();
            return this._relationalModelIdxObs({ tableName: tableName, sort: sort })
                .pipe(operators.exhaustMap(function (idx) { return rxjs.from(db.find(_this._modelListFindRequest(tableName, { sort: sort }, idx)))
                .pipe(operators.take(1)); }), operators.map(function (r) {
                var res = r;
                return res.docs.length > 0 ? res.docs[0].object_id + 1 : 1;
            }));
        };
        SyncService.prototype._relationalModelIdxObs = function (idxDef) {
            if (idxDef != null && (idxDef.sort != null || idxDef.selector != null)) {
                var sortFields = [];
                var selectorFields = [];
                var dir_1 = 'asc';
                if (idxDef.sort != null) {
                    var normSort = this._normalizeSortParam(idxDef.sort);
                    sortFields = normSort.fields;
                    dir_1 = normSort.dir;
                }
                if (idxDef.selector != null) {
                    var normSel = this._normalizeSelector(idxDef.selector);
                    selectorFields = Object.keys(normSel).map(function (k) {
                        var obj = {};
                        obj[k] = dir_1;
                        return obj;
                    });
                }
                if (sortFields.length > 0 || selectorFields.length > 0) {
                    var fields = __spreadArray(__spreadArray(__spreadArray([], __read(selectorFields)), [{ table_name: dir_1 }]), __read(sortFields));
                    return rxjs.from(this._database.createIndex({
                        index: {
                            name: this._generateIndexName(idxDef.tableName, fields),
                            fields: fields
                        }
                    }))
                        .pipe(operators.take(1));
                }
            }
            return rxjs.from(this._database.createIndex(this._relationalModelIdx))
                .pipe(operators.take(1));
        };
        SyncService.prototype._generateIndexName = function (tableName, fields) {
            return "idx___" + tableName + "___" + fields
                .map(function (f) {
                var key = Object.keys(f)[0];
                return key.replace('.', '_') + "__" + f[key];
            })
                .join('___');
        };
        SyncService.prototype._subObject = function (obj, fields) {
            if (obj == null || fields == null) {
                return obj;
            }
            obj = obj || {};
            var subObj = {};
            (fields || []).forEach(function (f) { return subObj[f] = obj[f]; });
            return subObj;
        };
        SyncService.prototype._checkSync = function () {
            this._checkUpwardSync();
        };
        SyncService.prototype._checkUpwardSync = function () {
            var _this = this;
            rxjs.zip(this._getLastLocalCheckpoint(), this._getNextLocalSyncNumber())
                .pipe(operators.exhaustMap(function (r) {
                var _a = __read(r, 2), checkpoint = _a[0], syncNumber = _a[1];
                var localSyncDb = _this._getLocalSyncDb();
                var gets = [];
                var firstId = checkpoint + 1;
                var lastId = Math.min(firstId + _this._opts.changesBatchSize - 1, syncNumber - 1);
                if (lastId <= checkpoint) {
                    return rxjs.of(false);
                }
                var hasNext = lastId < syncNumber - 1;
                _this.stop();
                for (var i = firstId; i <= lastId; i++) {
                    gets.push(rxjs.from(localSyncDb.get("_local/" + _this._localSyncEntryPrefix + i)));
                }
                return rxjs.zip.apply(void 0, __spreadArray([], __read(gets))).pipe(operators.exhaustMap(function (getsRes) {
                    var entries = getsRes;
                    var localDocsDb = _this._getLocalDocsDb();
                    var opts = { keys: entries.map(function (e) { return e.doc_id; }), include_docs: true };
                    return rxjs.from(localDocsDb.allDocs(opts))
                        .pipe(operators.map(function (ld) {
                        var localDocs = ld;
                        var docs = entries.map(function (syncEntry, i) { return ({ syncEntry: syncEntry, localDoc: localDocs.rows[i].doc }); });
                        return { hasNext: hasNext, docs: docs };
                    }), operators.take(1));
                }), operators.exhaustMap(function (res) { return _this._processUpwardChanges(res); }), operators.take(1));
            }))
                .subscribe(function (hasNext) {
                if (hasNext) {
                    _this._checkUpwardSync();
                }
                else {
                    _this._checkDownwardSync();
                }
            }, function (err) {
                _this._emitSyncError(err);
                _this.start(false);
            });
        };
        SyncService.prototype._checkDownwardSync = function () {
            var _this = this;
            this._getLastRemoteCheckpoint()
                .pipe(operators.exhaustMap(function (since) {
                var params = "since=" + since + "&batchSize=" + _this._opts.changesBatchSize;
                return _this._httpClient.get(_this._syncUrl + "?" + params);
            }))
                .subscribe(function (changes) {
                _this.stop();
                _this._processDownwardChanges(changes);
            });
        };
        SyncService.prototype._getLastLocalCheckpoint = function () {
            return this._getLastCheckpoint(this._localCheckpointKey);
        };
        SyncService.prototype._getLastRemoteCheckpoint = function () {
            return this._getLastCheckpoint(this._remoteCheckpointKey);
        };
        SyncService.prototype._getLastCheckpoint = function (checkpointKey) {
            var db = this._getSyncCheckpointDb();
            return rxjs.from(db.get("_local/" + checkpointKey))
                .pipe(operators.map(function (d) { return d.checkpoint; }), operators.catchError(function (_) { return rxjs.of(0); }));
        };
        SyncService.prototype._setLastLocalCheckpoint = function (checkpoint) {
            return this._setLastCheckpoint(this._localCheckpointKey, checkpoint);
        };
        SyncService.prototype._setLastRemoteCheckpoint = function (checkpoint) {
            return this._setLastCheckpoint(this._remoteCheckpointKey, checkpoint);
        };
        SyncService.prototype._setLastCheckpoint = function (checkpointKey, checkpoint) {
            var db = this._getSyncCheckpointDb();
            var docKey = "_local/" + checkpointKey;
            var doc = { _id: docKey, checkpoint: checkpoint };
            return rxjs.from(db.get(docKey))
                .pipe(operators.catchError(function (_) { return rxjs.of({}); }), operators.take(1), operators.exhaustMap(function (d) { return rxjs.from(db.put(Object.assign(Object.assign({}, d), doc))).pipe(operators.take(1)); }), operators.catchError(function (_) { return rxjs.throwError('checkpoint_set_failed'); }), operators.mapTo(checkpoint));
        };
        SyncService.prototype._processUpwardChanges = function (p) {
            var _this = this;
            var payload = p.docs.map(function (doc) {
                return {
                    sequence: doc.syncEntry.sequence,
                    table_name: doc.syncEntry.table_name,
                    object_id: doc.localDoc.object.id,
                    entry_type: doc.syncEntry.entry_type,
                    object: doc.localDoc.object
                };
            });
            this._emitSyncSyncing();
            return this._httpClient.post(this._syncUrl, payload)
                .pipe(operators.map(function (res) { return ({ res: res, seq: null }); }), operators.catchError(function (err) {
                if (err.status !== 409) {
                    return rxjs.throwError(err);
                }
                p.hasNext = true;
                return _this._resolveUpwardConflict(p.docs, err.error)
                    .pipe(operators.map(function (seq) { return ({ res: err.error, seq: seq }); }));
            }), operators.exhaustMap(function (r) {
                var res = r.res, seq = r.seq;
                var conflictError = res.findIndex(function (e) { return e.error === 'conflict'; });
                var lastValidIdx = conflictError - 1;
                var localDocsDb = _this._getLocalDocsDb();
                var docsToDel = p.docs.filter(function (d, idx) { return d.syncEntry.entry_type === 'insert' && idx <= lastValidIdx; });
                var sequence = seq != null ? seq : res[res.length - 1].sequence;
                if (docsToDel.length === 0) {
                    return rxjs.of(sequence);
                }
                return rxjs.from(localDocsDb.allDocs({
                    keys: docsToDel.map(function (d) { return d.syncEntry.doc_id; }),
                    include_docs: true,
                }))
                    .pipe(operators.take(1), operators.exhaustMap(function (result) { return rxjs.from(localDocsDb.bulkDocs(result
                    .rows.map(function (row) { return (Object.assign(Object.assign({}, row.doc), { _deleted: true })); })))
                    .pipe(operators.take(1)); }), operators.map(function (_) { return sequence; }));
            }), operators.exhaustMap(function (sequence) { return sequence >= 0 ?
                _this._setLastLocalCheckpoint(sequence) :
                rxjs.of(null); }), operators.map(function (_) { return p.hasNext; }));
        };
        SyncService.prototype._resolveUpwardConflict = function (docs, result) {
            var _this = this;
            var conflictIdx = result.findIndex(function (r) { return r.ok === false && r.error === 'conflict'; });
            var conflict = result[conflictIdx];
            var conflictDoc = docs.find(function (d) { return d.syncEntry.sequence === conflict.sequence; });
            var checkpoint = conflictIdx >= 0 ? result[conflictIdx].sequence - 1 : -1;
            var localDocsDb = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.switchMap(function (_) { return _this._relationalModelIdxObs(); }), operators.exhaustMap(function (idx) {
                var findReq = _this._modelListFindRequest(conflictDoc.syncEntry.table_name, {}, idx);
                findReq.selector['object_id'] = { $gte: conflictDoc.syncEntry.object_id };
                return rxjs.from(localDocsDb.find(findReq)).pipe(operators.take(1));
            }), operators.exhaustMap(function (res) {
                var updDocs = res.docs.map(function (doc, idx) {
                    doc.object_id = doc.object.id = conflict.extra.next_id + idx;
                    return doc;
                });
                return rxjs.from(localDocsDb.bulkDocs(updDocs)).pipe(operators.take(1));
            }), operators.map(function (_) { return checkpoint; }));
        };
        SyncService.prototype._processDownwardChanges = function (syncEntries) {
            var _this = this;
            if (syncEntries == null || syncEntries.length === 0) {
                this._emitSyncPaused();
                this.start(false);
                return;
            }
            var changes = syncEntries.map(function (s) { return s.id; });
            var url = this._changesUrl;
            this._httpClient.post(url, { changes: changes })
                .pipe(operators.catchError(function () {
                _this._emitSyncError('network_error');
                return rxjs.of([]);
            }), operators.map(function (r) { return r; }), operators.switchMap(function (docs) {
                return rxjs.from(changes.map(function (change) { return ({ change: change, doc: (docs || []).find(function (d) { return d.id === change; }) }); }));
            }), operators.tap(function () { return _this._emitSyncSyncing(); }), operators.map(function (r) { return r; }), operators.concatMap(function (_a) {
                var change = _a.change, doc = _a.doc;
                var syncEntry = syncEntries.find(function (s) { return s.id === change; });
                if (syncEntry == null) {
                    return rxjs.throwError("missing_change_" + change);
                }
                if (syncEntry.entry_type === 'delete' && doc == null) {
                    return _this._processDownwardChange(syncEntry);
                }
                return (doc == null ? rxjs.throwError("missing_change_" + change) :
                    _this._processDownwardChange(doc));
            }), operators.map(function (change) { return change; }), operators.concatMap(function (change) { return _this._setLastRemoteCheckpoint(change.id); }))
                .subscribe(function (_) { }, function (error) {
                _this._emitSyncError(error);
                _this.start(false);
            }, function () {
                var hasMore = changes.length > 0;
                if (!hasMore) {
                    _this._emitSyncPaused();
                }
                _this.start(hasMore);
            });
        };
        SyncService.prototype._emitSyncError = function (error) {
            this._status.next({ status: 'error', error: error });
        };
        SyncService.prototype._emitSyncPaused = function () {
            this._status.next({ status: 'paused' });
        };
        SyncService.prototype._emitSyncSyncing = function () {
            this._status.next({ status: 'syncing' });
        };
        SyncService.prototype._processDownwardChange = function (change) {
            var _this = this;
            if (change.entry_type !== 'insert' && change.entry_type !== 'update' &&
                change.entry_type !== 'delete') {
                return rxjs.throwError('invalid_entry_type');
            }
            var baseReq = this._relationalModelIdxObs().pipe(operators.exhaustMap(function (idx) { return rxjs.from(_this._database.find(_this._syncEntryFindRequest(change, idx)))
                .pipe(operators.take(1)); }));
            if (change.entry_type === 'insert') {
                return baseReq.pipe(operators.exhaustMap(function (localDocs) {
                    if (localDocs.docs.length !== 0) {
                        return rxjs.throwError('existing_doc');
                    }
                    return rxjs.from(_this._database.post(_this._syncEntryToLocalDoc(change))).pipe(operators.take(1));
                }), operators.mapTo(change));
            }
            return baseReq.pipe(operators.exhaustMap(function (localDocs) {
                if (localDocs.docs.length !== 1) {
                    return rxjs.throwError('unexisting_doc');
                }
                var localDoc = localDocs.docs[0];
                var op = rxjs.from(change.entry_type === 'update' ?
                    _this._database.put(Object.assign(Object.assign({}, localDoc), { object: change.object })) :
                    _this._database.remove(localDoc));
                return op.pipe(operators.take(1), operators.mapTo(change));
            }));
        };
        SyncService.prototype._modelGetFindRequest = function (tableName, params, index) {
            var req = {
                selector: { table_name: tableName, object_id: params.id }
            };
            if (index != null) {
                var idxParts = (index.id || '').split('/');
                if (idxParts.length === 2) {
                    req.use_index = idxParts[1];
                }
            }
            return req;
        };
        SyncService.prototype._modelBulkIdsFindRequest = function (tableName, ids, index) {
            var req = { selector: { table_name: tableName, object_id: { $in: ids } } };
            if (index != null) {
                var idxParts = (index.id || '').split('/');
                if (idxParts.length === 2) {
                    req.use_index = idxParts[1];
                }
            }
            return req;
        };
        SyncService.prototype._modelQueryFindRequest = function (tableName, params, index) {
            var req = this._modelListFindRequest(tableName, params);
            if (index != null) {
                var idxParts = (index.id || '').split('/');
                if (idxParts.length === 2) {
                    req.use_index = idxParts[1];
                }
            }
            return Object.assign(Object.assign({}, req), { selector: Object.assign(Object.assign({}, req.selector), this._normalizeSelector(params.selector)) });
        };
        SyncService.prototype._modelListFindRequest = function (tableName, params, index) {
            var req = { selector: { table_name: tableName } };
            if (params.sort != null) {
                var _a = this._normalizeSortParam(params.sort), dir = _a.dir, fields = _a.fields;
                req.sort = __spreadArray([{ table_name: dir }], __read(fields));
            }
            else {
                req.sort = ['table_name', 'object_id'];
            }
            if (params.start != null) {
                req.skip = params.start;
            }
            if (params.limit != null && params.limit >= 0) {
                req.limit = params.limit;
            }
            if (index != null) {
                var idxParts = (index.id || '').split('/');
                if (idxParts.length === 2) {
                    req.use_index = idxParts[1];
                }
            }
            return req;
        };
        SyncService.prototype._normalizeSelector = function (selector) {
            var normSelector = {};
            Object.keys(selector).forEach(function (key) {
                normSelector["object." + key] = selector[key];
            });
            return normSelector;
        };
        SyncService.prototype._normalizeSortParam = function (sortParam) {
            var dir = 'asc';
            var fields = Object.keys(sortParam).map(function (key, i) {
                var sort = {};
                if (i == 0) {
                    dir = sortParam[key];
                }
                sort[key !== 'object_id' ? "object." + key : key] = dir;
                return sort;
            });
            return { dir: dir, fields: fields };
        };
        SyncService.prototype._syncEntryFindRequest = function (entry, index) {
            var req = { selector: this._syncEntryFindSelector(entry) };
            if (index != null) {
                var idxParts = (index.id || '').split('/');
                if (idxParts.length === 2) {
                    req.use_index = idxParts[1];
                }
            }
            return req;
        };
        SyncService.prototype._syncEntryFindSelector = function (entry) {
            return {
                table_name: entry.table_name,
                object_id: entry.object_id,
            };
        };
        SyncService.prototype._initLocalDatabase = function () {
            var _this = this;
            pouchDBStatic.plugin(pouchDBFindPlugin);
            var plugins = this._opts.plugins || [];
            plugins.forEach(function (plugin) { return pouchDBStatic.plugin(plugin); });
            this._database = new pouchDBStatic(this._opts.localDatabaseName, {
                revs_limit: 1,
                adapter: this._opts.adapter,
            });
            this._database.createIndex(this._relationalModelIdx)
                .then(function (_) {
                _this._emitSyncPaused();
                _this._databaseInit.next(true);
            })
                .catch(function (_) { return _this._emitSyncError('indexing_failed'); });
        };
        SyncService.prototype._syncEntryToLocalDoc = function (entry) {
            return { object_id: entry.object_id, table_name: entry.table_name, object: entry.object };
        };
        return SyncService;
    }());
    SyncService.decorators = [
        { type: core.Injectable }
    ];
    SyncService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [SYNC_OPTIONS,] }] },
        { type: http.HttpClient }
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
    var OfflineInterceptor = /** @class */ (function () {
        function OfflineInterceptor(_syncService) {
            this._syncService = _syncService;
        }
        OfflineInterceptor.prototype.intercept = function (req, next) {
            var _this = this;
            return next.handle(req).pipe(operators.catchError(function (e) {
                if (e.status === 0) {
                    var models = _this._checkOfflineRequest(req);
                    if (models.length > 0) {
                        return _this._doOfflineRequest(req, models[0], e);
                    }
                }
                return rxjs.throwError(e);
            }));
        };
        OfflineInterceptor.prototype._doOfflineRequest = function (req, model, reqError) {
            var method = req.method.toLowerCase();
            var _a = this._analyzeRequestUrl(req, model), exactMatch = _a.exactMatch, relativeUrl = _a.relativeUrl;
            if (exactMatch) {
                if (method === 'get') {
                    var limit = req.params.get('limit');
                    var start = req.params.get('start');
                    var sort = req.params.get('sort');
                    var fields = req.params.get('fields');
                    var joins = req.params.get('joins');
                    return this._syncService.list(model.tableName, { limit: limit, start: start, sort: sort, fields: fields, joins: joins })
                        .pipe(operators.catchError(function (_) { return rxjs.throwError(reqError); }), operators.map(function (res) { return new http.HttpResponse({ status: 200, statusText: 'OK', url: req.url, body: res }); }));
                }
                else if (method === 'post') {
                    var obj = req.body;
                    return this._syncService.create(model.tableName, obj)
                        .pipe(operators.catchError(function (_) { return rxjs.throwError(reqError); }), operators.map(function (res) { return new http.HttpResponse({ status: 201, statusText: 'OK', url: req.url, body: res }); }));
                }
            }
            else {
                if (relativeUrl.length === 1) {
                    var lastUrlPart = relativeUrl[0];
                    if (lastUrlPart === 'delete_all') {
                        var ids = req.body.ids;
                        if (ids != null && ids instanceof Array && ids.length > 0) {
                            return this._syncService.deleteAll(model.tableName, ids)
                                .pipe(operators.catchError(function (_) { return rxjs.throwError(reqError); }), operators.map(function (res) { return new http.HttpResponse({ status: 200, statusText: 'OK', url: req.url, body: res }); }));
                        }
                    }
                    else if (lastUrlPart === 'query') {
                        var params = req.body;
                        return this._syncService.query(model.tableName, params)
                            .pipe(operators.catchError(function (_) { return rxjs.throwError(reqError); }), operators.map(function (res) { return new http.HttpResponse({ status: 200, statusText: 'OK', url: req.url, body: res }); }));
                    }
                    else {
                        var id = parseInt(lastUrlPart, 10);
                        if (!isNaN(id) && id > 0) {
                            var op = null;
                            var successStatus_1 = 200;
                            var obj = req.body;
                            if (method === 'get') {
                                op = this._syncService.get(model.tableName, { id: id });
                                successStatus_1 = 201;
                            }
                            else if (method === 'patch' || method === 'put') {
                                op = this._syncService.update(model.tableName, id, obj);
                            }
                            else if (method === 'delete') {
                                op = this._syncService.delete(model.tableName, id);
                            }
                            if (op != null) {
                                return op.pipe(operators.catchError(function (_) { return rxjs.throwError(reqError); }), operators.map(function (res) { return new http.HttpResponse({ status: successStatus_1, statusText: 'OK', url: req.url, body: res }); }));
                            }
                        }
                    }
                }
            }
            return rxjs.throwError(reqError);
        };
        OfflineInterceptor.prototype._analyzeRequestUrl = function (req, model) {
            var exactMatch = new RegExp('^' + model.endpoint + '$').test(req.url);
            if (exactMatch) {
                return { exactMatch: exactMatch, relativeUrl: [] };
            }
            var baseUrlParts = model.endpoint.split(/\/+/);
            var reqUrlParts = req.url.split(/\/+/);
            return { exactMatch: exactMatch, relativeUrl: reqUrlParts.slice(baseUrlParts.length) };
        };
        OfflineInterceptor.prototype._checkOfflineRequest = function (req) {
            var urlParts = req.url.split('?');
            var urlPaths = urlParts[0].split('/');
            var urlPathsLen = urlPaths.length;
            var lastUrlPathIdx = urlPathsLen - 1;
            if (urlPaths[lastUrlPathIdx] === '') {
                lastUrlPathIdx -= 1;
            }
            var lastUrlPath = urlPaths[lastUrlPathIdx];
            var intVal = parseInt(lastUrlPath, 10);
            if (lastUrlPath === 'query' || (!isNaN(intVal) && "" + intVal === lastUrlPath)) {
                urlPaths.splice(lastUrlPathIdx, 1);
            }
            var url = urlPaths.join('/');
            return SYNC_REGISTERED_MODELS.filter(function (m) { return m.endpoint === url; });
        };
        return OfflineInterceptor;
    }());
    OfflineInterceptor.decorators = [
        { type: core.Injectable }
    ];
    OfflineInterceptor.ctorParameters = function () { return [
        { type: SyncService }
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
    var SyncModule = /** @class */ (function () {
        function SyncModule() {
        }
        SyncModule.forRoot = function (opts) {
            return {
                ngModule: SyncModule,
                providers: [
                    SyncService,
                    { provide: http.HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true },
                    { provide: SYNC_OPTIONS, useValue: opts },
                ]
            };
        };
        return SyncModule;
    }());
    SyncModule.decorators = [
        { type: core.NgModule, args: [{},] }
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
     * Generated bundle index. Do not edit.
     */

    exports.OfflineInterceptor = OfflineInterceptor;
    exports.SYNC_OPTIONS = SYNC_OPTIONS;
    exports.SyncModule = SyncModule;
    exports.SyncService = SyncService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-sync.umd.js.map
