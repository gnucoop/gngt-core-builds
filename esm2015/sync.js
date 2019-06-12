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
import { InjectionToken, Injectable, Inject, NgModule } from '@angular/core';
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
const SYNC_REGISTERED_MODELS = [];

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
        this._timerSub = Subscription.EMPTY;
        this._syncing = false;
        this._remoteCheckpointKey = 'gngt_remote_sync_checkpoint';
        this._localCheckpointKey = 'gngt_local_sync_checkpoint';
        this._localSyncNumber = 'gngt_local_sync_number';
        this._localSyncEntryPrefix = 'gngt_local_sync_entry_';
        this._relationalModelIdx = {
            index: { name: 'relational_model_idx', fields: ['table_name', 'object_id'] }
        };
        this._databaseInit = new BehaviorSubject(false);
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
            const localDoc = { table_name: tableName, object_id: id };
            return from(this._database.post(Object.assign({}, localDoc, { object }))).pipe(exhaustMap((/**
             * @param {?} doc
             * @return {?}
             */
            doc => this._createLocalSyncEntry(Object.assign({ doc_id: doc.id, entry_type: 'insert' }, localDoc)))), map((/**
             * @param {?} _
             * @return {?}
             */
            _ => id)));
        })), take(1));
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
        })), take(1), map((/**
         * @param {?} _
         * @return {?}
         */
        _ => id)));
    }
    /**
     * @param {?} tableName
     * @param {?} id
     * @return {?}
     */
    delete(tableName, id) {
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
            const localDoc = res.docs[0];
            return from(db.remove(localDoc)).pipe(take(1));
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
                entry_type: 'delete'
            };
            return this._createLocalSyncEntry(syncEntry);
        })), take(1), map((/**
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
    _getLocalSyncDb() {
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
            syncEntry.sequence = syncNumber;
            return from(this._database.put((/** @type {?} */ (syncEntry)))).pipe(take(1), exhaustMap((/**
             * @param {?} _
             * @return {?}
             */
            _ => this._setLocalSyncNumber(syncNumber))), take(1));
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
        this._checkUpwardSync();
    }
    /**
     * @private
     * @return {?}
     */
    _checkUpwardSync() {
        zip(this._getLastLocalCheckpoint(), this._getNextLocalSyncNumber()).pipe(exhaustMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([checkpoint, syncNumber]) => {
            /** @type {?} */
            const localSyncDb = this._getLocalSyncDb();
            /** @type {?} */
            const gets = [];
            /** @type {?} */
            const firstId = checkpoint + 1;
            /** @type {?} */
            const lastId = Math.min(firstId + (/** @type {?} */ (this._opts.changesBatchSize)) - 1, syncNumber - 1);
            if (lastId <= checkpoint) {
                return of(false);
            }
            /** @type {?} */
            const hasNext = lastId < syncNumber - 1;
            this.stop();
            for (let i = firstId; i <= lastId; i++) {
                gets.push(from(localSyncDb.get(`_local/${this._localSyncEntryPrefix}${i}`)));
            }
            return zip(...gets).pipe(exhaustMap((/**
             * @param {?} entries
             * @return {?}
             */
            entries => {
                /** @type {?} */
                const localDocsDb = this._getLocalDocsDb();
                /** @type {?} */
                const opts = { keys: entries.map((/**
                     * @param {?} e
                     * @return {?}
                     */
                    e => e.doc_id)), include_docs: true };
                return from(localDocsDb.allDocs(opts)).pipe(map((/**
                 * @param {?} localDocs
                 * @return {?}
                 */
                localDocs => {
                    /** @type {?} */
                    const docs = entries.map((/**
                     * @param {?} syncEntry
                     * @param {?} i
                     * @return {?}
                     */
                    (syncEntry, i) => ({ syncEntry, localDoc: (/** @type {?} */ (localDocs.rows[i].doc)) })));
                    return { hasNext, docs };
                })), take(1));
            })), exhaustMap((/**
             * @param {?} res
             * @return {?}
             */
            res => this._processUpwardChanges(res))), take(1));
        }))).subscribe((/**
         * @param {?} hasNext
         * @return {?}
         */
        hasNext => {
            if (hasNext) {
                this._checkUpwardSync();
            }
            else {
                this._checkDownwardSync();
            }
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            this._emitSyncError(err);
            this.start(false);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _checkDownwardSync() {
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
            this._processDownwardChanges(changes);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _getLastLocalCheckpoint() {
        return this._getLastCheckpoint(this._localCheckpointKey);
    }
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
    /**
     * @private
     * @param {?} checkpoint
     * @return {?}
     */
    _setLastLocalCheckpoint(checkpoint) {
        return this._setLastCheckpoint(this._localCheckpointKey, checkpoint);
    }
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
     * @param {?} p
     * @return {?}
     */
    _processUpwardChanges(p) {
        /** @type {?} */
        const payload = p.docs.map((/**
         * @param {?} doc
         * @return {?}
         */
        doc => {
            return {
                sequence: doc.syncEntry.sequence,
                table_name: doc.syncEntry.table_name,
                object_id: doc.syncEntry.object_id,
                entry_type: doc.syncEntry.entry_type,
                object: doc.localDoc.object
            };
        }));
        return this._httpClient.post(this._syncUrl, payload).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => res[res.length - 1].sequence)), catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if (err.status !== 409) {
                return throwError(err);
            }
            p.hasNext = true;
            return this._resolveUpwardConflict(p.docs, err.error);
        })), exhaustMap((/**
         * @param {?} sequence
         * @return {?}
         */
        sequence => sequence >= 0 ? this._setLastLocalCheckpoint(sequence) : of(null))), map((/**
         * @param {?} _
         * @return {?}
         */
        _ => p.hasNext)));
    }
    /**
     * @private
     * @param {?} docs
     * @param {?} result
     * @return {?}
     */
    _resolveUpwardConflict(docs, result) {
        /** @type {?} */
        const conflictIdx = (/** @type {?} */ (result.findIndex((/**
         * @param {?} r
         * @return {?}
         */
        r => r.ok === false && r.error === 'conflict'))));
        /** @type {?} */
        const conflict = result[conflictIdx];
        /** @type {?} */
        const conflictDoc = (/** @type {?} */ (docs.find((/**
         * @param {?} d
         * @return {?}
         */
        d => d.syncEntry.sequence === conflict.sequence))));
        /** @type {?} */
        const checkpoint = conflictIdx > 0 ? result[conflictIdx - 1].sequence : -1;
        /** @type {?} */
        const localDocsDb = this._getLocalDocsDb();
        /** @type {?} */
        const findReq = this._modelListFindRequest(conflictDoc.syncEntry.table_name, {});
        findReq.selector['object_id'] = { $gte: conflictDoc.syncEntry.object_id };
        return this._databaseIsInit.pipe(exhaustMap((/**
         * @param {?} _
         * @return {?}
         */
        _ => from(localDocsDb.find(findReq)).pipe(take(1)))), exhaustMap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            const updDocs = res.docs.map((/**
             * @param {?} doc
             * @param {?} idx
             * @return {?}
             */
            (doc, idx) => {
                doc.object_id = doc.object.id = conflict.extra.next_id + idx;
                return doc;
            }));
            return from(localDocsDb.bulkDocs(updDocs)).pipe(take(1));
        })), map((/**
         * @param {?} _
         * @return {?}
         */
        _ => checkpoint)));
    }
    /**
     * @private
     * @param {?} syncEntries
     * @return {?}
     */
    _processDownwardChanges(syncEntries) {
        if (syncEntries == null || syncEntries.length === 0) {
            this._emitSyncPaused();
            this.start(false);
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
            : this._processDownwardChange(doc))), concatMap((/**
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
    _processDownwardChange(change) {
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
        return SYNC_REGISTERED_MODELS.filter((/**
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
/**
 * @param {?} endpoint
 * @param {?} tableName
 * @return {?}
 */
function registerSyncModel(endpoint, tableName) {
    if (SYNC_REGISTERED_MODELS.find((/**
     * @param {?} r
     * @return {?}
     */
    r => r.tableName === tableName)) == null) {
        /** @type {?} */
        const registeredModel = { tableName, endpoint };
        SYNC_REGISTERED_MODELS.push(registeredModel);
        console.log(`Registered sync model ${tableName} with endpoint ${endpoint}`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ANNOTATIONS = '__gngt_annotations__';
// WARNING: interface has both a type and a value, skipping emit
/**
 * @template T
 * @param {?} opts
 * @return {?}
 */
function SyncModel(opts) {
    return (/**
     * @param {?} cls
     * @return {?}
     */
    function SyncModelFactory(cls) {
        /** @type {?} */
        const annotations = cls.hasOwnProperty(ANNOTATIONS)
            ? ((/** @type {?} */ (cls)))[ANNOTATIONS]
            : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
        annotations.push({ sync_model: true });
        return (/** @type {?} */ (class extends cls {
            /**
             * @param {...?} args
             */
            constructor(...args) {
                super(...args);
                registerSyncModel(((/** @type {?} */ (this))).endPoint, opts.tableName);
            }
        }));
    });
}

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

export { OfflineInterceptor, SYNC_OPTIONS, SyncModel, SyncModule, SyncService };
//# sourceMappingURL=sync.js.map
