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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('pouchdb'), require('pouchdb-debug'), require('pouchdb-find')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/sync', ['exports', '@angular/common/http', '@angular/core', 'rxjs', 'rxjs/operators', 'pouchdb', 'pouchdb-debug', 'pouchdb-find'], factory) :
    (global = global || self, factory((global.dewco = global.dewco || {}, global.dewco.core = global.dewco.core || {}, global.dewco.core.sync = {}), global.ng.common.http, global.ng.core, global.rxjs, global.rxjs.operators, global.pouchdb, global.pouchdb.debug, global.pouchdb.find));
}(this, function (exports, http, core, rxjs, operators, PouchDB, PouchDBDebug, PouchDBFind) { 'use strict';

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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var SYNC_OPTIONS = new core.InjectionToken('SYNC_OPTIONS');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SyncService = /** @class */ (function () {
        function SyncService(_opts, _httpClient) {
            this._opts = _opts;
            this._httpClient = _httpClient;
            this._status = new rxjs.BehaviorSubject({ status: 'initializing' });
            this.status = this._status.asObservable();
            this.registeredModels = [];
            this._modelRegister = new core.EventEmitter();
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
            this.modelRegister = this._modelRegister.asObservable();
            if (this._opts.syncInterval == null) {
                this._opts.syncInterval = 300000;
            }
            if (this._opts.changesBatchSize == null) {
                this._opts.changesBatchSize = 50;
            }
            this._syncUrl = this._opts.baseUrl + "/" + (this._opts.changesPath || 'changes');
            this._changesUrl = this._opts.baseUrl + "/" + (this._opts.docsPath || 'docs');
            this._initLocalDatabase();
            this._databaseIsInit = this._databaseInit.pipe(operators.filter((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i; })));
        }
        /**
         * @param {?} endpoint
         * @param {?} tableName
         * @return {?}
         */
        SyncService.prototype.registerModel = /**
         * @param {?} endpoint
         * @param {?} tableName
         * @return {?}
         */
        function (endpoint, tableName) {
            if (this.registeredModels.find((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return r.tableName === tableName; })) == null) {
                /** @type {?} */
                var registeredModel = { tableName: tableName, endpoint: endpoint };
                this.registeredModels.push(registeredModel);
                this._modelRegister.emit(registeredModel);
            }
        };
        /**
         * @param {?=} immediate
         * @return {?}
         */
        SyncService.prototype.start = /**
         * @param {?=} immediate
         * @return {?}
         */
        function (immediate) {
            var _this = this;
            if (immediate === void 0) { immediate = true; }
            if (this._syncing) {
                return;
            }
            this._syncing = true;
            this._timerSub = rxjs.timer(immediate ? 0 : this._opts.syncInterval, this._opts.syncInterval).pipe(operators.delayWhen((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return _this._databaseIsInit; }))).subscribe((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return _this._checkSync(); }));
        };
        /**
         * @return {?}
         */
        SyncService.prototype.stop = /**
         * @return {?}
         */
        function () {
            if (!this._syncing) {
                return;
            }
            this._timerSub.unsubscribe();
            this._syncing = false;
        };
        /**
         * @param {?} tableName
         * @param {?} params
         * @return {?}
         */
        SyncService.prototype.get = /**
         * @param {?} tableName
         * @param {?} params
         * @return {?}
         */
        function (tableName, params) {
            var _this = this;
            /** @type {?} */
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return _this._relationalModelIdxObs(); })), operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.from(db.find(_this._modelGetFindRequest(tableName, params))).pipe(operators.take(1)); })), operators.switchMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (res.docs.length === 1) {
                    /** @type {?} */
                    var obj_1 = _this._subObject(res.docs[0].object, params.fields);
                    if (params.joins != null) {
                        return rxjs.zip.apply(void 0, params.joins.map((/**
                         * @param {?} join
                         * @return {?}
                         */
                        function (join) {
                            return rxjs.from(db.find(_this._modelGetFindRequest(join.model, { id: obj_1[join.property], fields: join.fields }))).pipe(operators.take(1), operators.map((/**
                             * @param {?} related
                             * @return {?}
                             */
                            function (related) { return related.docs.length === 1 ? related.docs[0].object : null; })), operators.map((/**
                             * @param {?} related
                             * @return {?}
                             */
                            function (related) { return ({ join: join, related: related }); })));
                        }))).pipe(operators.map((/**
                         * @param {?} joins
                         * @return {?}
                         */
                        function (joins) {
                            joins.forEach((/**
                             * @param {?} joinEntry
                             * @return {?}
                             */
                            function (joinEntry) {
                                obj_1[joinEntry.join.property] = joinEntry.related;
                            }));
                            return obj_1;
                        })));
                    }
                    return rxjs.of(obj_1);
                }
                return rxjs.throwError('not_found');
            })));
        };
        /**
         * @param {?} tableName
         * @param {?} params
         * @return {?}
         */
        SyncService.prototype.list = /**
         * @param {?} tableName
         * @param {?} params
         * @return {?}
         */
        function (tableName, params) {
            var _this = this;
            /** @type {?} */
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return _this._relationalModelIdxObs({ tableName: tableName, sort: params.sort }); })), operators.exhaustMap((/**
             * @param {?} idx
             * @return {?}
             */
            function (idx) { return rxjs.from(db.find(_this._modelListFindRequest(tableName, params, idx))).pipe(operators.take(1)); })), operators.switchMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (params.joins != null) {
                    /** @type {?} */
                    var joinTables_1 = params.joins.reduce((/**
                     * @param {?} prev
                     * @param {?} cur
                     * @return {?}
                     */
                    function (prev, cur) {
                        prev[cur.model] = res.docs.map((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return d.object[cur.property]; }));
                        return prev;
                    }), (/** @type {?} */ ({})));
                    return rxjs.zip.apply(void 0, params.joins.map((/**
                     * @param {?} join
                     * @return {?}
                     */
                    function (join) {
                        /** @type {?} */
                        var req = _this._modelListFindRequest(join.model, { fields: join.fields });
                        req.selector['object_id'] = { '$in': joinTables_1[join.model] };
                        return rxjs.from(db.find(req)).pipe(operators.take(1), operators.map((/**
                         * @param {?} related
                         * @return {?}
                         */
                        function (related) { return ({ join: join, related: related.docs }); })));
                    }))).pipe(operators.map((/**
                     * @param {?} joins
                     * @return {?}
                     */
                    function (joins) {
                        return res.docs.map((/**
                         * @param {?} doc
                         * @return {?}
                         */
                        function (doc) {
                            /** @type {?} */
                            var obj = doc.object;
                            joins.forEach((/**
                             * @param {?} joinEntry
                             * @return {?}
                             */
                            function (joinEntry) {
                                /** @type {?} */
                                var prop = joinEntry.join.property;
                                /** @type {?} */
                                var rel = joinEntry.related.find((/**
                                 * @param {?} r
                                 * @return {?}
                                 */
                                function (r) { return r.object_id === obj[prop]; }));
                                obj[prop] = rel != null ? rel.object : null;
                            }));
                            return _this._subObject(obj, params.fields);
                        }));
                    })));
                }
                return rxjs.of(res.docs.map((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this._subObject(d.object, params.fields); })));
            })));
        };
        /**
         * @param {?} tableName
         * @param {?} object
         * @return {?}
         */
        SyncService.prototype.create = /**
         * @param {?} tableName
         * @param {?} object
         * @return {?}
         */
        function (tableName, object) {
            var _this = this;
            return this._databaseIsInit.pipe(operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return _this._nextObjectId(tableName); })), operators.exhaustMap((/**
             * @param {?} id
             * @return {?}
             */
            function (id) {
                object = __assign({ id: id }, object);
                /** @type {?} */
                var localDoc = { table_name: tableName, object_id: id };
                return rxjs.from(_this._database.post(__assign({}, localDoc, { object: object }))).pipe(operators.exhaustMap((/**
                 * @param {?} doc
                 * @return {?}
                 */
                function (doc) { return _this._createLocalSyncEntry(__assign({ doc_id: doc.id, entry_type: 'insert' }, localDoc)); })), operators.map((/**
                 * @param {?} _
                 * @return {?}
                 */
                function (_) { return id; })));
            })), operators.take(1));
        };
        /**
         * @param {?} tableName
         * @param {?} id
         * @param {?} object
         * @return {?}
         */
        SyncService.prototype.update = /**
         * @param {?} tableName
         * @param {?} id
         * @param {?} object
         * @return {?}
         */
        function (tableName, id, object) {
            var _this = this;
            /** @type {?} */
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.from(db.find(_this._modelGetFindRequest(tableName, { id: id }))).pipe(operators.take(1)); })), operators.exhaustMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (res.docs.length !== 1) {
                    return rxjs.throwError('not_found');
                }
                /** @type {?} */
                var localDoc = __assign({}, res.docs[0], { object: object });
                return rxjs.from(db.post(localDoc)).pipe(operators.take(1));
            })), operators.exhaustMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                /** @type {?} */
                var syncEntry = {
                    doc_id: res.id,
                    table_name: tableName,
                    object_id: id,
                    entry_type: 'update'
                };
                return _this._createLocalSyncEntry(syncEntry);
            })), operators.take(1), operators.map((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return id; })));
        };
        /**
         * @param {?} tableName
         * @param {?} id
         * @return {?}
         */
        SyncService.prototype.delete = /**
         * @param {?} tableName
         * @param {?} id
         * @return {?}
         */
        function (tableName, id) {
            var _this = this;
            /** @type {?} */
            var db = this._getLocalDocsDb();
            return this._databaseIsInit.pipe(operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.from(db.find(_this._modelGetFindRequest(tableName, { id: id }))).pipe(operators.take(1)); })), operators.exhaustMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (res.docs.length !== 1) {
                    return rxjs.throwError('not_found');
                }
                /** @type {?} */
                var localDoc = res.docs[0];
                return rxjs.from(db.remove(localDoc)).pipe(operators.take(1));
            })), operators.exhaustMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                /** @type {?} */
                var syncEntry = {
                    doc_id: res.id,
                    table_name: tableName,
                    object_id: id,
                    entry_type: 'delete'
                };
                return _this._createLocalSyncEntry(syncEntry);
            })), operators.take(1), operators.map((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return id; })));
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._getLocalDocsDb = /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._database));
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._getLocalSyncDb = /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._database));
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._getLocalSyncNumberDb = /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._database));
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._getSyncCheckpointDb = /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._database));
        };
        /**
         * @private
         * @param {?} syncEntry
         * @return {?}
         */
        SyncService.prototype._createLocalSyncEntry = /**
         * @private
         * @param {?} syncEntry
         * @return {?}
         */
        function (syncEntry) {
            var _this = this;
            return this._getNextLocalSyncNumber().pipe(operators.exhaustMap((/**
             * @param {?} syncNumber
             * @return {?}
             */
            function (syncNumber) {
                syncEntry._id = "_local/" + _this._localSyncEntryPrefix + syncNumber;
                syncEntry.sequence = syncNumber;
                return rxjs.from(_this._database.put((/** @type {?} */ (syncEntry)))).pipe(operators.take(1), operators.exhaustMap((/**
                 * @param {?} _
                 * @return {?}
                 */
                function (_) { return _this._setLocalSyncNumber(syncNumber); })), operators.take(1));
            })));
        };
        /**
         * @private
         * @param {?} syncNumber
         * @return {?}
         */
        SyncService.prototype._setLocalSyncNumber = /**
         * @private
         * @param {?} syncNumber
         * @return {?}
         */
        function (syncNumber) {
            /** @type {?} */
            var db = this._getLocalSyncNumberDb();
            /** @type {?} */
            var id = "_local/" + this._localSyncNumber;
            return rxjs.from(db.get(id)).pipe(operators.take(1), operators.catchError((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.of((/** @type {?} */ ({ _id: id, number: 0 }))); })), operators.exhaustMap((/**
             * @param {?} doc
             * @return {?}
             */
            function (doc) { return rxjs.from(db.post(__assign({}, doc, { number: syncNumber }))).pipe(operators.take(1)); })), operators.map((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return syncNumber; })));
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._getNextLocalSyncNumber = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var db = this._getLocalSyncNumberDb();
            return rxjs.from(db.get("_local/" + this._localSyncNumber)).pipe(operators.take(1), operators.map((/**
             * @param {?} doc
             * @return {?}
             */
            function (doc) { return doc.number + 1; })), operators.catchError((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.of(1); })));
        };
        /**
         * @private
         * @param {?} tableName
         * @return {?}
         */
        SyncService.prototype._nextObjectId = /**
         * @private
         * @param {?} tableName
         * @return {?}
         */
        function (tableName) {
            var _this = this;
            /** @type {?} */
            var sort = (/** @type {?} */ ({ object_id: 'desc' }));
            /** @type {?} */
            var db = this._getLocalDocsDb();
            return this._relationalModelIdxObs({ tableName: tableName, sort: sort }).pipe(operators.exhaustMap((/**
             * @param {?} idx
             * @return {?}
             */
            function (idx) { return rxjs.from(db.find(_this._modelListFindRequest(tableName, { sort: sort }, idx))).pipe(operators.take(1)); })), operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return res.docs.length > 0 ? res.docs[0].object_id + 1 : 1; })));
        };
        /**
         * @private
         * @param {?=} idxDef
         * @return {?}
         */
        SyncService.prototype._relationalModelIdxObs = /**
         * @private
         * @param {?=} idxDef
         * @return {?}
         */
        function (idxDef) {
            if (idxDef != null && idxDef.sort != null) {
                var _a = this._normalizeSortParam(idxDef.sort), dir = _a.dir, fields = _a.fields;
                fields = [{ table_name: dir }].concat(fields);
                if (fields.length > 0) {
                    return rxjs.from(this._database.createIndex({
                        index: {
                            name: this._generateIndexName(idxDef.tableName, fields),
                            fields: (/** @type {?} */ (fields))
                        }
                    }));
                }
            }
            return rxjs.from(this._database.createIndex(this._relationalModelIdx)).pipe(operators.take(1));
        };
        /**
         * @private
         * @param {?} tableName
         * @param {?} fields
         * @return {?}
         */
        SyncService.prototype._generateIndexName = /**
         * @private
         * @param {?} tableName
         * @param {?} fields
         * @return {?}
         */
        function (tableName, fields) {
            return "idx___" + tableName + "___" + fields.map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                /** @type {?} */
                var key = Object.keys(f)[0];
                return key + "__" + f[key];
            })).join('___');
        };
        /**
         * @private
         * @param {?} obj
         * @param {?=} fields
         * @return {?}
         */
        SyncService.prototype._subObject = /**
         * @private
         * @param {?} obj
         * @param {?=} fields
         * @return {?}
         */
        function (obj, fields) {
            if (obj == null || fields == null) {
                return obj;
            }
            obj = obj || {};
            /** @type {?} */
            var subObj = {};
            (fields || []).forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return subObj[f] = obj[f]; }));
            return subObj;
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._checkSync = /**
         * @private
         * @return {?}
         */
        function () {
            this._checkUpwardSync();
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._checkUpwardSync = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            rxjs.zip(this._getLastLocalCheckpoint(), this._getNextLocalSyncNumber()).pipe(operators.exhaustMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var checkpoint = _a[0], syncNumber = _a[1];
                /** @type {?} */
                var localSyncDb = _this._getLocalSyncDb();
                /** @type {?} */
                var gets = [];
                /** @type {?} */
                var firstId = checkpoint + 1;
                /** @type {?} */
                var lastId = Math.min(firstId + (/** @type {?} */ (_this._opts.changesBatchSize)) - 1, syncNumber - 1);
                if (lastId <= checkpoint) {
                    return rxjs.of(false);
                }
                /** @type {?} */
                var hasNext = lastId < syncNumber - 1;
                _this.stop();
                for (var i = firstId; i <= lastId; i++) {
                    gets.push(rxjs.from(localSyncDb.get("_local/" + _this._localSyncEntryPrefix + i)));
                }
                return rxjs.zip.apply(void 0, gets).pipe(operators.exhaustMap((/**
                 * @param {?} entries
                 * @return {?}
                 */
                function (entries) {
                    /** @type {?} */
                    var localDocsDb = _this._getLocalDocsDb();
                    /** @type {?} */
                    var opts = { keys: entries.map((/**
                         * @param {?} e
                         * @return {?}
                         */
                        function (e) { return e.doc_id; })), include_docs: true };
                    return rxjs.from(localDocsDb.allDocs(opts)).pipe(operators.map((/**
                     * @param {?} localDocs
                     * @return {?}
                     */
                    function (localDocs) {
                        /** @type {?} */
                        var docs = entries.map((/**
                         * @param {?} syncEntry
                         * @param {?} i
                         * @return {?}
                         */
                        function (syncEntry, i) { return ({ syncEntry: syncEntry, localDoc: (/** @type {?} */ (localDocs.rows[i].doc)) }); }));
                        return { hasNext: hasNext, docs: docs };
                    })), operators.take(1));
                })), operators.exhaustMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return _this._processUpwardChanges(res); })), operators.take(1));
            }))).subscribe((/**
             * @param {?} hasNext
             * @return {?}
             */
            function (hasNext) {
                if (hasNext) {
                    _this._checkUpwardSync();
                }
                else {
                    _this._checkDownwardSync();
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this._emitSyncError(err);
                _this.start(false);
            }));
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._checkDownwardSync = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._getLastRemoteCheckpoint().pipe(operators.exhaustMap((/**
             * @param {?} since
             * @return {?}
             */
            function (since) {
                /** @type {?} */
                var params = "since=" + since + "&batchSize=" + _this._opts.changesBatchSize;
                return _this._httpClient.get(_this._syncUrl + "?" + params);
            }))).subscribe((/**
             * @param {?} changes
             * @return {?}
             */
            function (changes) {
                _this.stop();
                _this._processDownwardChanges(changes);
            }));
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._getLastLocalCheckpoint = /**
         * @private
         * @return {?}
         */
        function () {
            return this._getLastCheckpoint(this._localCheckpointKey);
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._getLastRemoteCheckpoint = /**
         * @private
         * @return {?}
         */
        function () {
            return this._getLastCheckpoint(this._remoteCheckpointKey);
        };
        /**
         * @private
         * @param {?} checkpointKey
         * @return {?}
         */
        SyncService.prototype._getLastCheckpoint = /**
         * @private
         * @param {?} checkpointKey
         * @return {?}
         */
        function (checkpointKey) {
            /** @type {?} */
            var db = this._getSyncCheckpointDb();
            return rxjs.from(db.get("_local/" + checkpointKey)).pipe(operators.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.checkpoint; })), operators.catchError((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.of(0); })));
        };
        /**
         * @private
         * @param {?} checkpoint
         * @return {?}
         */
        SyncService.prototype._setLastLocalCheckpoint = /**
         * @private
         * @param {?} checkpoint
         * @return {?}
         */
        function (checkpoint) {
            return this._setLastCheckpoint(this._localCheckpointKey, checkpoint);
        };
        /**
         * @private
         * @param {?} checkpoint
         * @return {?}
         */
        SyncService.prototype._setLastRemoteCheckpoint = /**
         * @private
         * @param {?} checkpoint
         * @return {?}
         */
        function (checkpoint) {
            return this._setLastCheckpoint(this._remoteCheckpointKey, checkpoint);
        };
        /**
         * @private
         * @param {?} checkpointKey
         * @param {?} checkpoint
         * @return {?}
         */
        SyncService.prototype._setLastCheckpoint = /**
         * @private
         * @param {?} checkpointKey
         * @param {?} checkpoint
         * @return {?}
         */
        function (checkpointKey, checkpoint) {
            /** @type {?} */
            var db = this._getSyncCheckpointDb();
            /** @type {?} */
            var docKey = "_local/" + checkpointKey;
            /** @type {?} */
            var doc = (/** @type {?} */ ({ _id: docKey, checkpoint: checkpoint }));
            return rxjs.from(db.get(docKey)).pipe(operators.catchError((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.of((/** @type {?} */ ({}))); })), operators.take(1), operators.exhaustMap((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return rxjs.from(db.put(__assign({}, d, doc))).pipe(operators.take(1)); })), operators.catchError((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.throwError('checkpoint_set_failed'); })), operators.mapTo(checkpoint));
        };
        /**
         * @private
         * @param {?} p
         * @return {?}
         */
        SyncService.prototype._processUpwardChanges = /**
         * @private
         * @param {?} p
         * @return {?}
         */
        function (p) {
            var _this = this;
            /** @type {?} */
            var payload = p.docs.map((/**
             * @param {?} doc
             * @return {?}
             */
            function (doc) {
                return {
                    sequence: doc.syncEntry.sequence,
                    table_name: doc.syncEntry.table_name,
                    object_id: doc.syncEntry.object_id,
                    entry_type: doc.syncEntry.entry_type,
                    object: doc.localDoc.object
                };
            }));
            return this._httpClient.post(this._syncUrl, payload).pipe(operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return res[res.length - 1].sequence; })), operators.catchError((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                if (err.status !== 417) {
                    return rxjs.throwError(err);
                }
                p.hasNext = true;
                return _this._resolveUpwardConflict(p.docs, err.error);
            })), operators.exhaustMap((/**
             * @param {?} sequence
             * @return {?}
             */
            function (sequence) { return sequence >= 0 ? _this._setLastLocalCheckpoint(sequence) : rxjs.of(null); })), operators.map((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return p.hasNext; })));
        };
        /**
         * @private
         * @param {?} docs
         * @param {?} result
         * @return {?}
         */
        SyncService.prototype._resolveUpwardConflict = /**
         * @private
         * @param {?} docs
         * @param {?} result
         * @return {?}
         */
        function (docs, result) {
            /** @type {?} */
            var conflictIdx = (/** @type {?} */ (result.findIndex((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return r.ok === false && r.error === 'conflict'; }))));
            /** @type {?} */
            var conflict = result[conflictIdx];
            /** @type {?} */
            var conflictDoc = (/** @type {?} */ (docs.find((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.syncEntry.sequence === conflict.sequence; }))));
            /** @type {?} */
            var checkpoint = conflictIdx > 0 ? result[conflictIdx - 1].sequence : -1;
            /** @type {?} */
            var localDocsDb = this._getLocalDocsDb();
            /** @type {?} */
            var findReq = this._modelListFindRequest(conflictDoc.syncEntry.table_name, {});
            findReq.selector['object_id'] = { $gte: conflictDoc.syncEntry.object_id };
            return this._databaseIsInit.pipe(operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.from(localDocsDb.find(findReq)).pipe(operators.take(1)); })), operators.exhaustMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                /** @type {?} */
                var updDocs = res.docs.map((/**
                 * @param {?} doc
                 * @param {?} idx
                 * @return {?}
                 */
                function (doc, idx) {
                    doc.object_id = doc.object.id = conflict.extra.next_id + idx;
                    return doc;
                }));
                return rxjs.from(localDocsDb.bulkDocs(updDocs)).pipe(operators.take(1));
            })), operators.map((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return checkpoint; })));
        };
        /**
         * @private
         * @param {?} syncEntries
         * @return {?}
         */
        SyncService.prototype._processDownwardChanges = /**
         * @private
         * @param {?} syncEntries
         * @return {?}
         */
        function (syncEntries) {
            var _this = this;
            if (syncEntries == null || syncEntries.length === 0) {
                this._emitSyncPaused();
                this.start(false);
                return;
            }
            /** @type {?} */
            var changes = syncEntries.map((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.id; }));
            /** @type {?} */
            var url = this._changesUrl;
            this._httpClient.post(url, { changes: changes }).pipe(operators.catchError((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                _this._emitSyncError('network_error');
                return rxjs.of((/** @type {?} */ ([])));
            })), operators.switchMap((/**
             * @param {?} docs
             * @return {?}
             */
            function (docs) { return rxjs.from(changes.map((/**
             * @param {?} change
             * @return {?}
             */
            function (change) { return ({ change: change, doc: (docs || []).find((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.id === change; })) }); }))); })), operators.tap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return _this._emitSyncSyncing(); })), operators.concatMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var change = _a.change, doc = _a.doc;
                return doc == null
                    ? rxjs.throwError("missing_change_" + change)
                    : _this._processDownwardChange(doc);
            })), operators.concatMap((/**
             * @param {?} change
             * @return {?}
             */
            function (change) { return _this._setLastRemoteCheckpoint(change.id); }))).subscribe((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this._emitSyncError(error);
                _this.start(false);
            }), (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var hasMore = changes.length > 0;
                if (!hasMore) {
                    _this._emitSyncPaused();
                }
                _this.start(hasMore);
            }));
        };
        /**
         * @private
         * @param {?} error
         * @return {?}
         */
        SyncService.prototype._emitSyncError = /**
         * @private
         * @param {?} error
         * @return {?}
         */
        function (error) {
            this._status.next({ status: 'error', error: error });
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._emitSyncPaused = /**
         * @private
         * @return {?}
         */
        function () {
            this._status.next({ status: 'paused' });
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._emitSyncSyncing = /**
         * @private
         * @return {?}
         */
        function () {
            this._status.next({ status: 'syncing' });
        };
        /**
         * @private
         * @param {?} change
         * @return {?}
         */
        SyncService.prototype._processDownwardChange = /**
         * @private
         * @param {?} change
         * @return {?}
         */
        function (change) {
            var _this = this;
            if (change.entry_type !== 'insert'
                && change.entry_type !== 'update'
                && change.entry_type !== 'delete') {
                return rxjs.throwError('invalid_entry_type');
            }
            /** @type {?} */
            var baseReq = this._relationalModelIdxObs().pipe(operators.exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return rxjs.from(_this._database.find(_this._syncEntryFindRequest(change))).pipe(operators.take(1)); })));
            if (change.entry_type === 'insert') {
                return baseReq.pipe(operators.exhaustMap((/**
                 * @param {?} localDocs
                 * @return {?}
                 */
                function (localDocs) {
                    if (localDocs.docs.length !== 0) {
                        return rxjs.throwError('existing_doc');
                    }
                    return rxjs.from(_this._database.post(_this._syncEntryToLocalDoc(change))).pipe(operators.take(1));
                })), operators.mapTo(change));
            }
            return baseReq.pipe(operators.exhaustMap((/**
             * @param {?} localDocs
             * @return {?}
             */
            function (localDocs) {
                if (localDocs.docs.length !== 1) {
                    return rxjs.throwError('unexisting_doc');
                }
                /** @type {?} */
                var localDoc = localDocs.docs[0];
                /** @type {?} */
                var op = rxjs.from(change.entry_type === 'update'
                    ? _this._database.put(__assign({}, localDoc, { object: change.object }))
                    : _this._database.remove(localDoc));
                return op.pipe(operators.take(1), operators.mapTo(change));
            })));
        };
        /**
         * @private
         * @param {?} tableName
         * @param {?} params
         * @return {?}
         */
        SyncService.prototype._modelGetFindRequest = /**
         * @private
         * @param {?} tableName
         * @param {?} params
         * @return {?}
         */
        function (tableName, params) {
            return {
                selector: { table_name: tableName, object_id: params.id }
            };
        };
        /**
         * @private
         * @param {?} tableName
         * @param {?} params
         * @param {?=} index
         * @return {?}
         */
        SyncService.prototype._modelListFindRequest = /**
         * @private
         * @param {?} tableName
         * @param {?} params
         * @param {?=} index
         * @return {?}
         */
        function (tableName, params, index) {
            /** @type {?} */
            var req = {
                selector: { table_name: tableName }
            };
            if (params.sort != null) {
                var _a = this._normalizeSortParam(params.sort), dir = _a.dir, fields = _a.fields;
                req.sort = [{ table_name: dir }].concat(fields);
            }
            else {
                req.sort = ['table_name', 'object_id'];
            }
            if (params.start != null) {
                req.skip = params.start;
            }
            if (params.limit != null) {
                req.limit = params.limit;
            }
            if (index != null) {
                /** @type {?} */
                var idxParts = (((/** @type {?} */ (index))).id || '').split('/');
                if (idxParts.length === 2) {
                    req.use_index = idxParts[1];
                }
            }
            return req;
        };
        /**
         * @private
         * @param {?} sortParam
         * @return {?}
         */
        SyncService.prototype._normalizeSortParam = /**
         * @private
         * @param {?} sortParam
         * @return {?}
         */
        function (sortParam) {
            /** @type {?} */
            var dir = 'asc';
            /** @type {?} */
            var fields = Object.keys(sortParam).map((/**
             * @param {?} key
             * @param {?} i
             * @return {?}
             */
            function (key, i) {
                /** @type {?} */
                var sort = {};
                if (i == 0) {
                    dir = sortParam[key];
                }
                sort[key !== 'object_id' ? "object." + key : key] = dir;
                return sort;
            }));
            return { dir: dir, fields: fields };
        };
        /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        SyncService.prototype._syncEntryFindRequest = /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        function (entry) {
            return { selector: this._syncEntryFindSelector(entry) };
        };
        /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        SyncService.prototype._syncEntryFindSelector = /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        function (entry) {
            return {
                table_name: entry.table_name,
                object_id: entry.object_id,
            };
        };
        /**
         * @private
         * @return {?}
         */
        SyncService.prototype._initLocalDatabase = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            PouchDB.plugin(PouchDBFind);
            PouchDB.plugin(PouchDBDebug);
            this._database = new PouchDB(this._opts.localDatabaseName, { revs_limit: 1 });
            this._database.createIndex(this._relationalModelIdx)
                .then((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                _this._emitSyncPaused();
                _this._databaseInit.next(true);
            }))
                .catch((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return _this._emitSyncError('indexing_failed'); }));
        };
        /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        SyncService.prototype._syncEntryToLocalDoc = /**
         * @private
         * @param {?} entry
         * @return {?}
         */
        function (entry) {
            return {
                object_id: entry.object_id,
                table_name: entry.table_name,
                object: entry.object
            };
        };
        SyncService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        SyncService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [SYNC_OPTIONS,] }] },
            { type: http.HttpClient }
        ]; };
        return SyncService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OfflineInterceptor = /** @class */ (function () {
        function OfflineInterceptor(_syncService) {
            var _this = this;
            this._syncService = _syncService;
            this._models = [];
            this._models = _syncService.registeredModels.slice();
            _syncService.modelRegister.subscribe((/**
             * @param {?} _
             * @return {?}
             */
            function (_) {
                return _this._models = _syncService.registeredModels.slice();
            }));
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        OfflineInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        function (req, next) {
            var _this = this;
            return next.handle(req).pipe(operators.catchError((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e.status === 0) {
                    /** @type {?} */
                    var models = _this._checkOfflineRequest(req);
                    if (models.length > 0) {
                        return _this._doOfflineRequest(req, models[0], e);
                    }
                }
                return rxjs.throwError(e);
            })));
        };
        /**
         * @private
         * @param {?} req
         * @param {?} model
         * @param {?} reqError
         * @return {?}
         */
        OfflineInterceptor.prototype._doOfflineRequest = /**
         * @private
         * @param {?} req
         * @param {?} model
         * @param {?} reqError
         * @return {?}
         */
        function (req, model, reqError) {
            /** @type {?} */
            var method = req.method.toLowerCase();
            var _a = this._analyzeRequestUrl(req, model), exactMatch = _a.exactMatch, relativeUrl = _a.relativeUrl;
            if (method === 'get') {
                if (exactMatch) {
                    /** @type {?} */
                    var limit = (/** @type {?} */ (req.params.get('limit')));
                    /** @type {?} */
                    var start = (/** @type {?} */ (req.params.get('start')));
                    /** @type {?} */
                    var sort = (/** @type {?} */ (req.params.get('sort')));
                    /** @type {?} */
                    var fields = (/** @type {?} */ (req.params.get('fields')));
                    /** @type {?} */
                    var joins = (/** @type {?} */ (req.params.get('joins')));
                    return this._syncService.list(model.tableName, { limit: limit, start: start, sort: sort, fields: fields, joins: joins }).pipe(operators.catchError((/**
                     * @param {?} _
                     * @return {?}
                     */
                    function (_) { return rxjs.throwError(reqError); })), operators.map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) { return new http.HttpResponse({
                        status: 200,
                        statusText: 'OK',
                        url: req.url,
                        body: res
                    }); })));
                }
                else {
                    if (relativeUrl.length === 1) {
                        /** @type {?} */
                        var id = parseInt(relativeUrl[0], 10);
                        if (!isNaN(id) && id > 0) {
                            return this._syncService.get(model.tableName, { id: id }).pipe(operators.catchError((/**
                             * @param {?} _
                             * @return {?}
                             */
                            function (_) { return rxjs.throwError(reqError); })), operators.map((/**
                             * @param {?} res
                             * @return {?}
                             */
                            function (res) { return new http.HttpResponse({
                                status: 200,
                                statusText: 'OK',
                                url: req.url,
                                body: res
                            }); })));
                        }
                    }
                }
            }
            return rxjs.throwError(reqError);
        };
        /**
         * @private
         * @param {?} req
         * @param {?} model
         * @return {?}
         */
        OfflineInterceptor.prototype._analyzeRequestUrl = /**
         * @private
         * @param {?} req
         * @param {?} model
         * @return {?}
         */
        function (req, model) {
            /** @type {?} */
            var exactMatch = new RegExp('^' + model.endpoint + '$').test(req.url);
            if (exactMatch) {
                return { exactMatch: exactMatch, relativeUrl: [] };
            }
            /** @type {?} */
            var baseUrlParts = model.endpoint.split(/\/+/);
            /** @type {?} */
            var reqUrlParts = req.url.split(/\/+/);
            return { exactMatch: exactMatch, relativeUrl: reqUrlParts.slice(baseUrlParts.length) };
        };
        /**
         * @private
         * @param {?} req
         * @return {?}
         */
        OfflineInterceptor.prototype._checkOfflineRequest = /**
         * @private
         * @param {?} req
         * @return {?}
         */
        function (req) {
            return this._models.filter((/**
             * @param {?} m
             * @return {?}
             */
            function (m) { return new RegExp("^" + m.endpoint).test(req.url); }));
        };
        OfflineInterceptor.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        OfflineInterceptor.ctorParameters = function () { return [
            { type: SyncService }
        ]; };
        return OfflineInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SyncModule = /** @class */ (function () {
        function SyncModule() {
        }
        /**
         * @param {?} opts
         * @return {?}
         */
        SyncModule.forRoot = /**
         * @param {?} opts
         * @return {?}
         */
        function (opts) {
            return {
                ngModule: SyncModule,
                providers: [
                    SyncService,
                    { provide: http.HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true },
                    { provide: SYNC_OPTIONS, useValue: opts },
                ]
            };
        };
        SyncModule.decorators = [
            { type: core.NgModule, args: [{},] },
        ];
        return SyncModule;
    }());

    exports.OfflineInterceptor = OfflineInterceptor;
    exports.SyncModule = SyncModule;
    exports.SYNC_OPTIONS = SYNC_OPTIONS;
    exports.SyncService = SyncService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-sync.umd.js.map
