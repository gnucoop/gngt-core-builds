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
import { HttpClient, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, EventEmitter, Injectable, Inject, NgModule } from '@angular/core';
import { BehaviorSubject, Subscription, timer, from, zip, of, throwError } from 'rxjs';
import { filter, delayWhen, exhaustMap, take, switchMap, map, catchError, mapTo, tap, concatMap } from 'rxjs/operators';
import * as PouchDB from 'pouchdb';
import { plugin } from 'pouchdb';
import * as PouchDBDebug from 'pouchdb-debug';
import * as PouchDBFind from 'pouchdb-find';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SYNC_OPTIONS = new InjectionToken('SYNC_OPTIONS');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SyncService {
    /**
     * @param {?} _opts
     * @param {?} _httpClient
     */
    constructor(_opts, _httpClient) {
        this._opts = _opts;
        this._httpClient = _httpClient;
        this._status = new BehaviorSubject({ status: 'initializing' });
        this.status = this._status.asObservable();
        this.registeredModels = [];
        this._modelRegister = new EventEmitter();
        this._timerSub = Subscription.EMPTY;
        this._syncing = false;
        this._remoteCheckpointKey = 'gngt_remote_sync_checkpoint';
        // private readonly _localCheckpointKey = 'gngt_local_sync_checkpoint';
        this._localSyncNumber = 'gngt_local_sync_number';
        this._localSyncEntryPrefix = 'gngt_local_sync_entry_';
        this._relationalModelIdx = {
            index: { name: 'relational_model_idx', fields: ['table_name', 'object_id'] }
        };
        this._databaseInit = new BehaviorSubject(false);
        this.modelRegister = this._modelRegister.asObservable();
        if (this._opts.syncInterval == null) {
            this._opts.syncInterval = 300000;
        }
        if (this._opts.changesBatchSize == null) {
            this._opts.changesBatchSize = 50;
        }
        this._syncUrl = `${this._opts.baseUrl}/${this._opts.changesPath || 'changes'}`;
        this._changesUrl = `${this._opts.baseUrl}/${this._opts.docsPath || 'docs'}`;
        this._initLocalDatabase();
        this._databaseIsInit = this._databaseInit.pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        i => i)));
    }
    /**
     * @param {?} endpoint
     * @param {?} tableName
     * @return {?}
     */
    registerModel(endpoint, tableName) {
        if (this.registeredModels.find((/**
         * @param {?} r
         * @return {?}
         */
        r => r.tableName === tableName)) == null) {
            /** @type {?} */
            const registeredModel = { tableName, endpoint };
            this.registeredModels.push(registeredModel);
            this._modelRegister.emit(registeredModel);
        }
    }
    /**
     * @param {?=} immediate
     * @return {?}
     */
    start(immediate = true) {
        if (this._syncing) {
            return;
        }
        this._syncing = true;
        this._timerSub = timer(immediate ? 0 : this._opts.syncInterval, this._opts.syncInterval).pipe(delayWhen((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._databaseIsInit))).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._checkSync()));
    }
    /**
     * @return {?}
     */
    stop() {
        if (!this._syncing) {
            return;
        }
        this._timerSub.unsubscribe();
        this._syncing = false;
    }
    /**
     * @param {?} tableName
     * @param {?} params
     * @return {?}
     */
    get(tableName, params) {
        /** @type {?} */
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(exhaustMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._relationalModelIdxObs())), exhaustMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => from(db.find(this._modelGetFindRequest(tableName, params))).pipe(take(1)))), switchMap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.docs.length === 1) {
                /** @type {?} */
                let obj = this._subObject(res.docs[0].object, params.fields);
                if (params.joins != null) {
                    return zip(...params.joins.map((/**
                     * @param {?} join
                     * @return {?}
                     */
                    join => from(db.find(this._modelGetFindRequest(join.model, { id: obj[join.property], fields: join.fields }))).pipe(take(1), map((/**
                     * @param {?} related
                     * @return {?}
                     */
                    related => related.docs.length === 1 ? related.docs[0].object : null)), map((/**
                     * @param {?} related
                     * @return {?}
                     */
                    related => ({ join, related }))))))).pipe(map((/**
                     * @param {?} joins
                     * @return {?}
                     */
                    joins => {
                        joins.forEach((/**
                         * @param {?} joinEntry
                         * @return {?}
                         */
                        joinEntry => {
                            obj[joinEntry.join.property] = joinEntry.related;
                        }));
                        return obj;
                    })));
                }
                return of(obj);
            }
            return throwError('not_found');
        })));
    }
    /**
     * @param {?} tableName
     * @param {?} params
     * @return {?}
     */
    list(tableName, params) {
        /** @type {?} */
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(exhaustMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._relationalModelIdxObs({ tableName, sort: params.sort }))), exhaustMap((/**
         * @param {?} idx
         * @return {?}
         */
        idx => from(db.find(this._modelListFindRequest(tableName, params, idx))).pipe(take(1)))), switchMap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (params.joins != null) {
                /** @type {?} */
                const joinTables = params.joins.reduce((/**
                 * @param {?} prev
                 * @param {?} cur
                 * @return {?}
                 */
                (prev, cur) => {
                    prev[cur.model] = res.docs.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => d.object[cur.property]));
                    return prev;
                }), (/** @type {?} */ ({})));
                return zip(...params.joins.map((/**
                 * @param {?} join
                 * @return {?}
                 */
                join => {
                    /** @type {?} */
                    const req = this._modelListFindRequest(join.model, { fields: join.fields });
                    req.selector['object_id'] = { '$in': joinTables[join.model] };
                    return from(db.find(req)).pipe(take(1), map((/**
                     * @param {?} related
                     * @return {?}
                     */
                    related => ({ join, related: related.docs }))));
                }))).pipe(map((/**
                 * @param {?} joins
                 * @return {?}
                 */
                joins => {
                    return res.docs.map((/**
                     * @param {?} doc
                     * @return {?}
                     */
                    doc => {
                        /** @type {?} */
                        const obj = doc.object;
                        joins.forEach((/**
                         * @param {?} joinEntry
                         * @return {?}
                         */
                        joinEntry => {
                            /** @type {?} */
                            const prop = joinEntry.join.property;
                            /** @type {?} */
                            const rel = joinEntry.related.find((/**
                             * @param {?} r
                             * @return {?}
                             */
                            r => r.object_id === obj[prop]));
                            obj[prop] = rel != null ? rel.object : null;
                        }));
                        return this._subObject(obj, params.fields);
                    }));
                })));
            }
            return of(res.docs.map((/**
             * @param {?} d
             * @return {?}
             */
            d => this._subObject(d.object, params.fields))));
        })));
    }
    /**
     * @param {?} tableName
     * @param {?} object
     * @return {?}
     */
    create(tableName, object) {
        return this._databaseIsInit.pipe(exhaustMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._nextObjectId(tableName))), exhaustMap((/**
         * @param {?} id
         * @return {?}
         */
        id => {
            object = Object.assign({ id }, object);
            /** @type {?} */
            const localDoc = { table_name: tableName, object_id: id, object };
            return from(this._database.post(localDoc)).pipe(take(1), exhaustMap((/**
             * @param {?} doc
             * @return {?}
             */
            doc => this._createLocalSyncEntry(Object.assign({ doc_id: doc.id }, localDoc)))), map((/**
             * @param {?} _
             * @return {?}
             */
            _ => id)));
        })));
    }
    /**
     * @param {?} tableName
     * @param {?} id
     * @param {?} object
     * @return {?}
     */
    update(tableName, id, object) {
        /** @type {?} */
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(exhaustMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => from(db.find(this._modelGetFindRequest(tableName, { id }))).pipe(take(1)))), exhaustMap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.docs.length !== 1) {
                return throwError('not_found');
            }
            /** @type {?} */
            const localDoc = Object.assign({}, res.docs[0], { object });
            return from(db.post(localDoc)).pipe(take(1));
        })), exhaustMap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            const syncEntry = {
                doc_id: res.id,
                table_name: tableName,
                object_id: id,
                entry_type: 'update'
            };
            return this._createLocalSyncEntry(syncEntry);
        })), map((/**
         * @param {?} _
         * @return {?}
         */
        _ => id)));
    }
    /**
     * @private
     * @return {?}
     */
    _getLocalDocsDb() {
        return (/** @type {?} */ (this._database));
    }
    /**
     * @private
     * @return {?}
     */
    _getLocalSyncNumberDb() {
        return (/** @type {?} */ (this._database));
    }
    /**
     * @private
     * @return {?}
     */
    _getSyncCheckpointDb() {
        return (/** @type {?} */ (this._database));
    }
    /**
     * @private
     * @param {?} syncEntry
     * @return {?}
     */
    _createLocalSyncEntry(syncEntry) {
        return this._getNextLocalSyncNumber().pipe(exhaustMap((/**
         * @param {?} syncNumber
         * @return {?}
         */
        syncNumber => {
            syncEntry._id = `_local/${this._localSyncEntryPrefix}${syncNumber}`;
            return from(this._database.put((/** @type {?} */ (syncEntry)))).pipe(take(1), exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            _ => this._setLocalSyncNumber(syncNumber))));
        })));
    }
    /**
     * @private
     * @param {?} syncNumber
     * @return {?}
     */
    _setLocalSyncNumber(syncNumber) {
        /** @type {?} */
        const db = this._getLocalSyncNumberDb();
        /** @type {?} */
        const id = `_local/${this._localSyncNumber}`;
        return from(db.get(id)).pipe(take(1), catchError((/**
         * @param {?} _
         * @return {?}
         */
        _ => of((/** @type {?} */ ({ _id: id, number: 0 }))))), exhaustMap((/**
         * @param {?} doc
         * @return {?}
         */
        doc => from(db.post(Object.assign({}, doc, { number: syncNumber }))).pipe(take(1)))), map((/**
         * @param {?} _
         * @return {?}
         */
        _ => syncNumber)));
    }
    /**
     * @private
     * @return {?}
     */
    _getNextLocalSyncNumber() {
        /** @type {?} */
        const db = this._getLocalSyncNumberDb();
        return from(db.get(`_local/${this._localSyncNumber}`)).pipe(take(1), map((/**
         * @param {?} doc
         * @return {?}
         */
        doc => doc.number + 1)), catchError((/**
         * @param {?} _
         * @return {?}
         */
        _ => of(1))));
    }
    /**
     * @private
     * @param {?} tableName
     * @return {?}
     */
    _nextObjectId(tableName) {
        /** @type {?} */
        const sort = (/** @type {?} */ ({ object_id: 'desc' }));
        /** @type {?} */
        const db = this._getLocalDocsDb();
        return this._relationalModelIdxObs({ tableName, sort }).pipe(exhaustMap((/**
         * @param {?} idx
         * @return {?}
         */
        idx => from(db.find(this._modelListFindRequest(tableName, { sort }, idx))).pipe(take(1)))), map((/**
         * @param {?} res
         * @return {?}
         */
        res => res.docs.length > 0 ? res.docs[0].object_id + 1 : 1)));
    }
    /**
     * @private
     * @param {?=} idxDef
     * @return {?}
     */
    _relationalModelIdxObs(idxDef) {
        if (idxDef != null && idxDef.sort != null) {
            let { dir, fields } = this._normalizeSortParam(idxDef.sort);
            fields = [{ table_name: dir }, ...fields];
            if (fields.length > 0) {
                return from(this._database.createIndex({
                    index: {
                        name: this._generateIndexName(idxDef.tableName, fields),
                        fields: (/** @type {?} */ (fields))
                    }
                }));
            }
        }
        return from(this._database.createIndex(this._relationalModelIdx)).pipe(take(1));
    }
    /**
     * @private
     * @param {?} tableName
     * @param {?} fields
     * @return {?}
     */
    _generateIndexName(tableName, fields) {
        return `idx___${tableName}___${fields.map((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            /** @type {?} */
            const key = Object.keys(f)[0];
            return `${key}__${f[key]}`;
        })).join('___')}`;
    }
    /**
     * @private
     * @param {?} obj
     * @param {?=} fields
     * @return {?}
     */
    _subObject(obj, fields) {
        if (obj == null || fields == null) {
            return obj;
        }
        obj = obj || {};
        /** @type {?} */
        const subObj = {};
        (fields || []).forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => subObj[f] = obj[f]));
        return subObj;
    }
    /**
     * @private
     * @return {?}
     */
    _checkSync() {
        this._getLastRemoteCheckpoint().pipe(exhaustMap((/**
         * @param {?} since
         * @return {?}
         */
        since => {
            /** @type {?} */
            const params = `since=${since}&batchSize=${this._opts.changesBatchSize}`;
            return this._httpClient.get(`${this._syncUrl}?${params}`);
        }))).subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        changes => {
            this.stop();
            this._processChanges(changes);
        }));
    }
    // private _getLastLocalCheckpoint(): Observable<number> {
    //   return this._getLastCheckpoint(this._localCheckpointKey);
    // }
    /**
     * @private
     * @return {?}
     */
    _getLastRemoteCheckpoint() {
        return this._getLastCheckpoint(this._remoteCheckpointKey);
    }
    /**
     * @private
     * @param {?} checkpointKey
     * @return {?}
     */
    _getLastCheckpoint(checkpointKey) {
        /** @type {?} */
        const db = this._getSyncCheckpointDb();
        return from(db.get(`_local/${checkpointKey}`)).pipe(map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.checkpoint)), catchError((/**
         * @param {?} _
         * @return {?}
         */
        _ => of(0))));
    }
    // private _setLastLocalCheckpoint(checkpoint: number): Observable<number> {
    //   return this._setLastCheckpoint(this._localCheckpointKey, checkpoint);
    // }
    /**
     * @private
     * @param {?} checkpoint
     * @return {?}
     */
    _setLastRemoteCheckpoint(checkpoint) {
        return this._setLastCheckpoint(this._remoteCheckpointKey, checkpoint);
    }
    /**
     * @private
     * @param {?} checkpointKey
     * @param {?} checkpoint
     * @return {?}
     */
    _setLastCheckpoint(checkpointKey, checkpoint) {
        /** @type {?} */
        const db = this._getSyncCheckpointDb();
        /** @type {?} */
        const docKey = `_local/${checkpointKey}`;
        /** @type {?} */
        const doc = (/** @type {?} */ ({ _id: docKey, checkpoint }));
        return from(db.get(docKey)).pipe(catchError((/**
         * @param {?} _
         * @return {?}
         */
        _ => of((/** @type {?} */ ({}))))), take(1), exhaustMap((/**
         * @param {?} d
         * @return {?}
         */
        d => from(db.put(Object.assign({}, d, doc))).pipe(take(1)))), catchError((/**
         * @param {?} _
         * @return {?}
         */
        _ => throwError('checkpoint_set_failed'))), mapTo(checkpoint));
    }
    /**
     * @private
     * @param {?} syncEntries
     * @return {?}
     */
    _processChanges(syncEntries) {
        if (syncEntries == null) {
            return;
        }
        /** @type {?} */
        const changes = syncEntries.map((/**
         * @param {?} s
         * @return {?}
         */
        s => s.id));
        /** @type {?} */
        const url = this._changesUrl;
        this._httpClient.post(url, { changes }).pipe(catchError((/**
         * @param {?} _
         * @return {?}
         */
        _ => {
            this._emitSyncError('network_error');
            return of((/** @type {?} */ ([])));
        })), switchMap((/**
         * @param {?} docs
         * @return {?}
         */
        docs => from(changes.map((/**
         * @param {?} change
         * @return {?}
         */
        change => ({ change, doc: (docs || []).find((/**
             * @param {?} d
             * @return {?}
             */
            d => d.id === change)) })))))), tap((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._emitSyncSyncing())), concatMap((/**
         * @param {?} __0
         * @return {?}
         */
        ({ change, doc }) => doc == null
            ? throwError(`missing_change_${change}`)
            : this._processChange(doc))), concatMap((/**
         * @param {?} change
         * @return {?}
         */
        change => this._setLastRemoteCheckpoint(change.id)))).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => { }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this._emitSyncError(error);
            this.start(false);
        }), (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const hasMore = changes.length > 0;
            if (!hasMore) {
                this._emitSyncPaused();
            }
            this.start(hasMore);
        }));
    }
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    _emitSyncError(error) {
        this._status.next({ status: 'error', error });
    }
    /**
     * @private
     * @return {?}
     */
    _emitSyncPaused() {
        this._status.next({ status: 'paused' });
    }
    /**
     * @private
     * @return {?}
     */
    _emitSyncSyncing() {
        this._status.next({ status: 'syncing' });
    }
    /**
     * @private
     * @param {?} change
     * @return {?}
     */
    _processChange(change) {
        if (change.entry_type !== 'insert'
            && change.entry_type !== 'update'
            && change.entry_type !== 'delete') {
            return throwError('invalid_entry_type');
        }
        /** @type {?} */
        const baseReq = this._relationalModelIdxObs().pipe(exhaustMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => from(this._database.find(this._syncEntryFindRequest(change))).pipe(take(1)))));
        if (change.entry_type === 'insert') {
            return baseReq.pipe(exhaustMap((/**
             * @param {?} localDocs
             * @return {?}
             */
            localDocs => {
                if (localDocs.docs.length !== 0) {
                    return throwError('existing_doc');
                }
                return from(this._database.post(this._syncEntryToLocalDoc(change))).pipe(take(1));
            })), mapTo(change));
        }
        return baseReq.pipe(exhaustMap((/**
         * @param {?} localDocs
         * @return {?}
         */
        localDocs => {
            if (localDocs.docs.length !== 1) {
                return throwError('unexisting_doc');
            }
            /** @type {?} */
            const localDoc = localDocs.docs[0];
            /** @type {?} */
            const op = from(change.entry_type === 'update'
                ? this._database.put(Object.assign({}, localDoc, { object: change.object }))
                : this._database.remove(localDoc));
            return op.pipe(take(1), mapTo(change));
        })));
    }
    /**
     * @private
     * @param {?} tableName
     * @param {?} params
     * @return {?}
     */
    _modelGetFindRequest(tableName, params) {
        return {
            selector: { table_name: tableName, object_id: params.id }
        };
    }
    /**
     * @private
     * @param {?} tableName
     * @param {?} params
     * @param {?=} index
     * @return {?}
     */
    _modelListFindRequest(tableName, params, index) {
        /** @type {?} */
        const req = {
            selector: { table_name: tableName }
        };
        if (params.sort != null) {
            const { dir, fields } = this._normalizeSortParam(params.sort);
            req.sort = [{ table_name: dir }, ...fields];
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
            const idxParts = (((/** @type {?} */ (index))).id || '').split('/');
            if (idxParts.length === 2) {
                req.use_index = idxParts[1];
            }
        }
        return req;
    }
    /**
     * @private
     * @param {?} sortParam
     * @return {?}
     */
    _normalizeSortParam(sortParam) {
        /** @type {?} */
        let dir = 'asc';
        /** @type {?} */
        const fields = Object.keys(sortParam).map((/**
         * @param {?} key
         * @param {?} i
         * @return {?}
         */
        (key, i) => {
            /** @type {?} */
            const sort = {};
            if (i == 0) {
                dir = sortParam[key];
            }
            sort[key !== 'object_id' ? `object.${key}` : key] = dir;
            return sort;
        }));
        return { dir, fields };
    }
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    _syncEntryFindRequest(entry) {
        return { selector: this._syncEntryFindSelector(entry) };
    }
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    _syncEntryFindSelector(entry) {
        return {
            table_name: entry.table_name,
            object_id: entry.object_id,
        };
    }
    /**
     * @private
     * @return {?}
     */
    _initLocalDatabase() {
        plugin(PouchDBFind);
        plugin(PouchDBDebug);
        this._database = new PouchDB(this._opts.localDatabaseName, { revs_limit: 1 });
        this._database.createIndex(this._relationalModelIdx)
            .then((/**
         * @param {?} _
         * @return {?}
         */
        _ => {
            this._emitSyncPaused();
            this._databaseInit.next(true);
        }))
            .catch((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._emitSyncError('indexing_failed')));
    }
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    _syncEntryToLocalDoc(entry) {
        return {
            object_id: entry.object_id,
            table_name: entry.table_name,
            object: entry.object
        };
    }
}
SyncService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SyncService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [SYNC_OPTIONS,] }] },
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OfflineInterceptor {
    /**
     * @param {?} _syncService
     */
    constructor(_syncService) {
        this._syncService = _syncService;
        this._models = [];
        this._models = [..._syncService.registeredModels];
        _syncService.modelRegister.subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => this._models = [..._syncService.registeredModels]));
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e.status === 0) {
                /** @type {?} */
                const models = this._checkOfflineRequest(req);
                if (models.length > 0) {
                    return this._doOfflineRequest(req, models[0], e);
                }
            }
            return throwError(e);
        })));
    }
    /**
     * @private
     * @param {?} req
     * @param {?} model
     * @param {?} reqError
     * @return {?}
     */
    _doOfflineRequest(req, model, reqError) {
        /** @type {?} */
        const method = req.method.toLowerCase();
        const { exactMatch, relativeUrl } = this._analyzeRequestUrl(req, model);
        if (method === 'get') {
            if (exactMatch) {
                /** @type {?} */
                const limit = (/** @type {?} */ (req.params.get('limit')));
                /** @type {?} */
                const start = (/** @type {?} */ (req.params.get('start')));
                /** @type {?} */
                const sort = (/** @type {?} */ (req.params.get('sort')));
                /** @type {?} */
                const fields = (/** @type {?} */ (req.params.get('fields')));
                /** @type {?} */
                const joins = (/** @type {?} */ (req.params.get('joins')));
                return this._syncService.list(model.tableName, { limit, start, sort, fields, joins }).pipe(catchError((/**
                 * @param {?} _
                 * @return {?}
                 */
                _ => throwError(reqError))), map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => new HttpResponse({
                    status: 200,
                    statusText: 'OK',
                    url: req.url,
                    body: res
                }))));
            }
            else {
                if (relativeUrl.length === 1) {
                    /** @type {?} */
                    const id = parseInt(relativeUrl[0], 10);
                    if (!isNaN(id) && id > 0) {
                        return this._syncService.get(model.tableName, { id }).pipe(catchError((/**
                         * @param {?} _
                         * @return {?}
                         */
                        _ => throwError(reqError))), map((/**
                         * @param {?} res
                         * @return {?}
                         */
                        res => new HttpResponse({
                            status: 200,
                            statusText: 'OK',
                            url: req.url,
                            body: res
                        }))));
                    }
                }
            }
        }
        return throwError(reqError);
    }
    /**
     * @private
     * @param {?} req
     * @param {?} model
     * @return {?}
     */
    _analyzeRequestUrl(req, model) {
        /** @type {?} */
        const exactMatch = new RegExp('^' + model.endpoint + '$').test(req.url);
        if (exactMatch) {
            return { exactMatch, relativeUrl: [] };
        }
        /** @type {?} */
        const baseUrlParts = model.endpoint.split(/\/+/);
        /** @type {?} */
        const reqUrlParts = req.url.split(/\/+/);
        return { exactMatch, relativeUrl: reqUrlParts.slice(baseUrlParts.length) };
    }
    /**
     * @private
     * @param {?} req
     * @return {?}
     */
    _checkOfflineRequest(req) {
        return this._models.filter((/**
         * @param {?} m
         * @return {?}
         */
        m => new RegExp(`^${m.endpoint}`).test(req.url)));
    }
}
OfflineInterceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OfflineInterceptor.ctorParameters = () => [
    { type: SyncService }
];

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
class SyncModule {
    /**
     * @param {?} opts
     * @return {?}
     */
    static forRoot(opts) {
        return {
            ngModule: SyncModule,
            providers: [
                SyncService,
                { provide: HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true },
                { provide: SYNC_OPTIONS, useValue: opts },
            ]
        };
    }
}
SyncModule.decorators = [
    { type: NgModule, args: [{},] },
];

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

export { OfflineInterceptor, SyncModule, SYNC_OPTIONS, SyncService };
//# sourceMappingURL=sync.js.map
