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
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import * as PouchDBFind from 'pouchdb-find';
import { BehaviorSubject, from, of as obsOf, Subscription, throwError, timer, zip } from 'rxjs';
import { catchError, concatMap, delayWhen, exhaustMap, filter, map, mapTo, switchMap, take, tap, toArray } from 'rxjs/operators';
import { SYNC_OPTIONS } from './sync-options';
import { registerSyncModel } from './sync-utils';
const pouchDBStatic = PouchDB.default || PouchDB;
const pouchDBFindPlugin = PouchDBFind.default || PouchDBFind;
export class SyncService {
    constructor(_opts, _httpClient) {
        this._opts = _opts;
        this._httpClient = _httpClient;
        this._status = new BehaviorSubject({ status: 'initializing' });
        this.status = this._status;
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
        this._syncUrl = `${this._opts.baseUrl}${this._opts.changesPath || 'changes'}`;
        this._changesUrl = `${this._opts.baseUrl}${this._opts.docsPath || 'docs'}`;
        this._initLocalDatabase();
        this._databaseIsInit = this._databaseInit.pipe(filter(i => i));
    }
    registerSyncModel(endPoint, tableName) {
        registerSyncModel(endPoint, tableName);
    }
    start(immediate = true) {
        if (this._syncing) {
            return;
        }
        this._syncing = true;
        this._timerSub = timer(immediate ? 0 : this._opts.syncInterval, this._opts.syncInterval)
            .pipe(delayWhen(_ => this._databaseIsInit))
            .subscribe(_ => this._checkSync());
    }
    stop() {
        if (!this._syncing) {
            return;
        }
        this._timerSub.unsubscribe();
        this._syncing = false;
    }
    get(tableName, params) {
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(exhaustMap(_ => this._relationalModelIdxObs()), exhaustMap(rmi => {
            const findPromise = db.find(this._modelGetFindRequest(tableName, params, rmi));
            return from(findPromise)
                .pipe(take(1), map(res => ({ res, rmi })));
        }), switchMap(r => {
            const { res, rmi } = r;
            if (res.docs.length === 1) {
                let obj = this._subObject(res.docs[0].object, params.fields);
                if (params.joins != null) {
                    const observables = params.joins.map(join => {
                        const findPromise = db.find(this._modelGetFindRequest(join.model, { id: obj[join.property], fields: join.fields }, rmi));
                        return from(findPromise)
                            .pipe(take(1), map(relRes => {
                            const related = relRes;
                            return related.docs.length === 1 ? related.docs[0].object : null;
                        }), map(related => ({ join, related })));
                    });
                    return zip(...observables)
                        .pipe(map(joins => {
                        joins.forEach(joinEntry => {
                            obj[joinEntry.join.property] = joinEntry.related;
                        });
                        return obj;
                    }));
                }
                return obsOf(obj);
            }
            return throwError('not_found');
        }), take(1));
    }
    list(tableName, params) {
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(exhaustMap(_ => this._relationalModelIdxObs({ tableName, sort: params.sort })), exhaustMap(idx => {
            let findReq = this._modelListFindRequest(tableName, params, idx);
            return from(db.find(findReq))
                .pipe(take(1), catchError(err => {
                if (err.error === 'no_usable_index') {
                    delete findReq.use_index;
                    delete findReq.sort;
                    return from(db.find(findReq)).pipe(take(1));
                }
                return throwError(err);
            }));
        }), switchMap(res => this._relationalModelIdxObs().pipe(map(idx => ({ res, idx })))), switchMap(curRes => {
            const { res, idx } = curRes;
            if (params.joins != null) {
                const joinTables = params.joins.reduce((prev, cur) => {
                    const fk = cur.foreignKey || cur.property;
                    prev[cur.model] = res.docs.map(d => d.object[fk]);
                    return prev;
                }, {});
                return zip(...params.joins.map(join => {
                    const joinModel = join.offlineModel || join.model;
                    const req = this._modelListFindRequest(joinModel, { fields: join.fields }, idx);
                    req.selector['object_id'] = { '$in': joinTables[join.model] };
                    return from(db.find(req))
                        .pipe(take(1), map(related => ({
                        join,
                        related: related.docs
                    })));
                }))
                    .pipe(map(joins => {
                    return res.docs.map(doc => {
                        const obj = doc.object;
                        const joinsObj = joins.reduce((jo, joinEntry) => {
                            const prop = joinEntry.join.property;
                            const fk = joinEntry.join.foreignKey || joinEntry.join.property;
                            const rel = joinEntry.related.find(r => r.object_id === obj[fk]);
                            jo[prop] = rel != null ? rel.object : null;
                            return jo;
                        }, {});
                        return Object.assign(Object.assign({}, this._subObject(obj, params.fields)), joinsObj);
                    });
                }));
            }
            return obsOf(res.docs.map(d => this._subObject(d.object, params.fields)));
        }), map(r => {
            const results = r;
            return {
                count: results.length,
                results,
                previous: null,
                next: null,
            };
        }), take(1));
    }
    create(tableName, object) {
        return this._databaseIsInit.pipe(exhaustMap(_ => this._nextObjectId(tableName).pipe(take(1))), exhaustMap(id => {
            object = Object.assign({ id }, object);
            const localDoc = { table_name: tableName, object_id: id };
            return from(this._database.post(Object.assign(Object.assign({}, localDoc), { object })))
                .pipe(exhaustMap(d => {
                const doc = d;
                return this
                    ._createLocalSyncEntry(Object.assign({ doc_id: doc.id, entry_type: 'insert' }, localDoc))
                    .pipe(map(() => object));
            }));
        }), take(1));
    }
    update(tableName, id, object) {
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(switchMap(_ => this._relationalModelIdxObs()), exhaustMap(idx => from(db.find(this._modelGetFindRequest(tableName, { id }, idx)))
            .pipe(take(1))), exhaustMap(curRes => {
            const res = curRes;
            if (res.docs.length !== 1) {
                return throwError('not_found');
            }
            const localDoc = Object.assign(Object.assign({}, res.docs[0]), { object });
            return from(db.post(localDoc))
                .pipe(map(r => ({ res: r, localDoc })), take(1));
        }), exhaustMap(r => {
            const { res, localDoc } = r;
            const syncEntry = {
                doc_id: res.id,
                table_name: tableName,
                object_id: localDoc.object_id,
                entry_type: 'update'
            };
            return this._createLocalSyncEntry(syncEntry).pipe(map(() => localDoc.object), take(1));
        }), take(1));
    }
    delete(tableName, id) {
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(switchMap(_ => this._relationalModelIdxObs()), exhaustMap(idx => from(db.find(this._modelGetFindRequest(tableName, { id }, idx)))
            .pipe(take(1))), exhaustMap(curRes => {
            const res = curRes;
            if (res.docs.length !== 1) {
                return throwError('not_found');
            }
            const localDoc = res.docs[0];
            return from(db.remove(localDoc))
                .pipe(map(r => ({ res: r, localDoc })), take(1));
        }), exhaustMap(r => {
            const { res, localDoc } = r;
            const syncEntry = {
                doc_id: res.id,
                table_name: tableName,
                object_id: localDoc.object_id,
                entry_type: 'delete'
            };
            return this._createLocalSyncEntry(syncEntry).pipe(map(() => localDoc.object), take(1));
        }), take(1));
    }
    deleteAll(tableName, ids) {
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(switchMap(_ => this._relationalModelIdxObs()), exhaustMap(idx => from(db.find(this._modelBulkIdsFindRequest(tableName, ids, idx)))
            .pipe(take(1))), concatMap(r => {
            const res = r;
            if (res.docs.length !== 1) {
                return throwError('not_found');
            }
            return from(res.docs);
        }), concatMap(ld => {
            const localDoc = ld;
            return from(db.remove(localDoc))
                .pipe(map(res => ({ res, localDoc })));
        }), concatMap(r => {
            const { res, localDoc } = r;
            const syncEntry = {
                doc_id: res.id,
                table_name: tableName,
                object_id: localDoc.object_id,
                entry_type: 'delete'
            };
            return this._createLocalSyncEntry(syncEntry).pipe(map(() => localDoc.object));
        }), take(ids.length), toArray());
    }
    query(tableName, params) {
        const db = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(exhaustMap(_ => this._relationalModelIdxObs({ tableName, selector: params.selector, sort: params.sort })
            .pipe(take(1))), exhaustMap(idx => {
            let findReq = this._modelQueryFindRequest(tableName, params, idx);
            return from(db.find(findReq))
                .pipe(take(1), catchError(err => {
                if (err.error === 'no_usable_index') {
                    delete findReq.use_index;
                    delete findReq.sort;
                    return from(db.find(findReq)).pipe(take(1));
                }
                return throwError(err);
            }));
        }), switchMap(r => {
            const res = r;
            return this._relationalModelIdxObs()
                .pipe(map(idx => ({ res, idx })));
        }), switchMap(curRes => {
            const { res, idx } = curRes;
            if (params.joins != null) {
                const joinTables = params.joins.reduce((prev, cur) => {
                    const fk = cur.foreignKey || cur.property;
                    prev[cur.model] = res.docs.map(d => d.object[fk]);
                    return prev;
                }, {});
                return zip(...params.joins.map(join => {
                    const joinModel = join.offlineModel || join.model;
                    const req = this._modelListFindRequest(joinModel, { fields: join.fields }, idx);
                    req.selector['object_id'] = { '$in': joinTables[join.model] };
                    return from(db.find(req))
                        .pipe(map(related => ({
                        join,
                        related: related
                            .docs
                    })), take(1));
                }))
                    .pipe(map(joins => {
                    return res.docs.map(doc => {
                        const obj = doc.object;
                        const joinsObj = joins.reduce((jo, joinEntry) => {
                            const prop = joinEntry.join.property;
                            const fk = joinEntry.join.foreignKey || joinEntry.join.property;
                            const rel = joinEntry.related.find(r => r.object_id === obj[fk]);
                            jo[prop] = rel != null ? rel.object : null;
                            return jo;
                        }, {});
                        return Object.assign(Object.assign({}, this._subObject(obj, params.fields)), joinsObj);
                    });
                }));
            }
            return obsOf(res.docs.map(d => this._subObject(d.object, params.fields)));
        }), map(results => ({
            count: results.length,
            results,
            previous: null,
            next: null,
        })), take(1));
    }
    _getLocalDocsDb() {
        return this._database;
    }
    _getLocalSyncDb() {
        return this._database;
    }
    _getLocalSyncNumberDb() {
        return this._database;
    }
    _getSyncCheckpointDb() {
        return this._database;
    }
    _createLocalSyncEntry(syncEntry) {
        return this._getNextLocalSyncNumber().pipe(exhaustMap(syncNumber => {
            syncEntry._id = `_local/${this._localSyncEntryPrefix}${syncNumber}`;
            syncEntry.sequence = syncNumber;
            return from(this._database.put(syncEntry))
                .pipe(take(1), exhaustMap(_ => this._setLocalSyncNumber(syncNumber).pipe(take(1))));
        }));
    }
    _setLocalSyncNumber(syncNumber) {
        const db = this._getLocalSyncNumberDb();
        const id = `_local/${this._localSyncNumber}`;
        return from(db.get(id))
            .pipe(take(1), catchError(_ => obsOf({ _id: id, number: 0 })), exhaustMap(doc => from(db.post(Object.assign(Object.assign({}, doc), { number: syncNumber })))
            .pipe(take(1))), map(_ => syncNumber));
    }
    _getNextLocalSyncNumber() {
        const db = this._getLocalSyncNumberDb();
        return from(db.get(`_local/${this._localSyncNumber}`))
            .pipe(take(1), map(doc => doc.number + 1), catchError(_ => obsOf(1)));
    }
    _nextObjectId(tableName) {
        const sort = { object_id: 'desc' };
        const db = this._getLocalDocsDb();
        return this._relationalModelIdxObs({ tableName, sort })
            .pipe(exhaustMap(idx => from(db.find(this._modelListFindRequest(tableName, { sort }, idx)))
            .pipe(take(1))), map(r => {
            const res = r;
            return res.docs.length > 0 ? res.docs[0].object_id + 1 : 1;
        }));
    }
    _relationalModelIdxObs(idxDef) {
        if (idxDef != null && (idxDef.sort != null || idxDef.selector != null)) {
            let sortFields = [];
            let selectorFields = [];
            let dir = 'asc';
            if (idxDef.sort != null) {
                const normSort = this._normalizeSortParam(idxDef.sort);
                sortFields = normSort.fields;
                dir = normSort.dir;
            }
            if (idxDef.selector != null) {
                const normSel = this._normalizeSelector(idxDef.selector);
                selectorFields = Object.keys(normSel).map(k => {
                    const obj = {};
                    obj[k] = dir;
                    return obj;
                });
            }
            if (sortFields.length > 0 || selectorFields.length > 0) {
                const fields = [...selectorFields, { table_name: dir }, ...sortFields];
                return from(this._database.createIndex({
                    index: {
                        name: this._generateIndexName(idxDef.tableName, fields),
                        fields: fields
                    }
                }))
                    .pipe(take(1));
            }
        }
        return from(this._database.createIndex(this._relationalModelIdx))
            .pipe(take(1));
    }
    _generateIndexName(tableName, fields) {
        return `idx___${tableName}___${fields
            .map(f => {
            const key = Object.keys(f)[0];
            return `${key.replace('.', '_')}__${f[key]}`;
        })
            .join('___')}`;
    }
    _subObject(obj, fields) {
        if (obj == null || fields == null) {
            return obj;
        }
        obj = obj || {};
        const subObj = {};
        (fields || []).forEach(f => subObj[f] = obj[f]);
        return subObj;
    }
    _checkSync() {
        this._checkUpwardSync();
    }
    _checkUpwardSync() {
        zip(this._getLastLocalCheckpoint(), this._getNextLocalSyncNumber())
            .pipe(exhaustMap(r => {
            const [checkpoint, syncNumber] = r;
            const localSyncDb = this._getLocalSyncDb();
            const gets = [];
            const firstId = checkpoint + 1;
            const lastId = Math.min(firstId + this._opts.changesBatchSize - 1, syncNumber - 1);
            if (lastId <= checkpoint) {
                return obsOf(false);
            }
            const hasNext = lastId < syncNumber - 1;
            this.stop();
            for (let i = firstId; i <= lastId; i++) {
                gets.push(from(localSyncDb.get(`_local/${this._localSyncEntryPrefix}${i}`)));
            }
            return zip(...gets).pipe(exhaustMap(getsRes => {
                const entries = getsRes;
                const localDocsDb = this._getLocalDocsDb();
                const opts = { keys: entries.map(e => e.doc_id), include_docs: true };
                return from(localDocsDb.allDocs(opts))
                    .pipe(map(ld => {
                    const localDocs = ld;
                    const docs = entries.map((syncEntry, i) => ({ syncEntry, localDoc: localDocs.rows[i].doc }));
                    return { hasNext, docs };
                }), take(1));
            }), exhaustMap(res => this._processUpwardChanges(res)), take(1));
        }))
            .subscribe(hasNext => {
            if (hasNext) {
                this._checkUpwardSync();
            }
            else {
                this._checkDownwardSync();
            }
        }, err => {
            this._emitSyncError(err);
            this.start(false);
        });
    }
    _checkDownwardSync() {
        this._getLastRemoteCheckpoint()
            .pipe(exhaustMap(since => {
            const params = `since=${since}&batchSize=${this._opts.changesBatchSize}`;
            return this._httpClient.get(`${this._syncUrl}?${params}`);
        }))
            .subscribe(changes => {
            this.stop();
            this._processDownwardChanges(changes);
        });
    }
    _getLastLocalCheckpoint() {
        return this._getLastCheckpoint(this._localCheckpointKey);
    }
    _getLastRemoteCheckpoint() {
        return this._getLastCheckpoint(this._remoteCheckpointKey);
    }
    _getLastCheckpoint(checkpointKey) {
        const db = this._getSyncCheckpointDb();
        return from(db.get(`_local/${checkpointKey}`))
            .pipe(map(d => d.checkpoint), catchError(_ => obsOf(0)));
    }
    _setLastLocalCheckpoint(checkpoint) {
        return this._setLastCheckpoint(this._localCheckpointKey, checkpoint);
    }
    _setLastRemoteCheckpoint(checkpoint) {
        return this._setLastCheckpoint(this._remoteCheckpointKey, checkpoint);
    }
    _setLastCheckpoint(checkpointKey, checkpoint) {
        const db = this._getSyncCheckpointDb();
        const docKey = `_local/${checkpointKey}`;
        const doc = { _id: docKey, checkpoint };
        return from(db.get(docKey))
            .pipe(catchError(_ => obsOf({})), take(1), exhaustMap(d => from(db.put(Object.assign(Object.assign({}, d), doc))).pipe(take(1))), catchError(_ => throwError('checkpoint_set_failed')), mapTo(checkpoint));
    }
    _processUpwardChanges(p) {
        const payload = p.docs.map(doc => {
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
            .pipe(map(res => ({ res, seq: null })), catchError((err) => {
            if (err.status !== 409) {
                return throwError(err);
            }
            p.hasNext = true;
            return this._resolveUpwardConflict(p.docs, err.error)
                .pipe(map(seq => ({ res: err.error, seq })));
        }), exhaustMap(r => {
            const { res, seq } = r;
            const conflictError = res.findIndex(e => e.error === 'conflict');
            const lastValidIdx = conflictError - 1;
            const localDocsDb = this._getLocalDocsDb();
            const docsToDel = p.docs.filter((d, idx) => d.syncEntry.entry_type === 'insert' && idx <= lastValidIdx);
            const sequence = seq != null ? seq : res[res.length - 1].sequence;
            if (docsToDel.length === 0) {
                return obsOf(sequence);
            }
            return from(localDocsDb.allDocs({
                keys: docsToDel.map(d => d.syncEntry.doc_id),
                include_docs: true,
            }))
                .pipe(take(1), exhaustMap(result => from(localDocsDb.bulkDocs(result
                .rows.map(row => (Object.assign(Object.assign({}, row.doc), { _deleted: true })))))
                .pipe(take(1))), map(_ => sequence));
        }), exhaustMap(sequence => sequence >= 0 ?
            this._setLastLocalCheckpoint(sequence) :
            obsOf(null)), map(_ => p.hasNext));
    }
    _resolveUpwardConflict(docs, result) {
        const conflictIdx = result.findIndex(r => r.ok === false && r.error === 'conflict');
        const conflict = result[conflictIdx];
        const conflictDoc = docs.find(d => d.syncEntry.sequence === conflict.sequence);
        const checkpoint = conflictIdx >= 0 ? result[conflictIdx].sequence - 1 : -1;
        const localDocsDb = this._getLocalDocsDb();
        return this._databaseIsInit.pipe(switchMap(_ => this._relationalModelIdxObs()), exhaustMap(idx => {
            const findReq = this._modelListFindRequest(conflictDoc.syncEntry.table_name, {}, idx);
            findReq.selector['object_id'] = { $gte: conflictDoc.syncEntry.object_id };
            return from(localDocsDb.find(findReq)).pipe(take(1));
        }), exhaustMap(res => {
            const updDocs = res.docs.map((doc, idx) => {
                doc.object_id = doc.object.id = conflict.extra.next_id + idx;
                return doc;
            });
            return from(localDocsDb.bulkDocs(updDocs)).pipe(take(1));
        }), map(_ => checkpoint));
    }
    _processDownwardChanges(syncEntries) {
        if (syncEntries == null || syncEntries.length === 0) {
            this._emitSyncPaused();
            this.start(false);
            return;
        }
        const changes = syncEntries.map(s => s.id);
        const url = this._changesUrl;
        this._httpClient.post(url, { changes })
            .pipe(catchError(() => {
            this._emitSyncError('network_error');
            return obsOf([]);
        }), map(r => r), switchMap(docs => {
            return from(changes.map(change => ({ change, doc: (docs || []).find(d => d.id === change) })));
        }), tap(() => this._emitSyncSyncing()), map(r => r), concatMap(({ change, doc }) => {
            const syncEntry = syncEntries.find(s => s.id === change);
            if (syncEntry == null) {
                return throwError(`missing_change_${change}`);
            }
            if (syncEntry.entry_type === 'delete' && doc == null) {
                return this._processDownwardChange(syncEntry);
            }
            return (doc == null ? throwError(`missing_change_${change}`) :
                this._processDownwardChange(doc));
        }), map(change => change), concatMap((change) => this._setLastRemoteCheckpoint(change.id)))
            .subscribe(_ => { }, error => {
            this._emitSyncError(error);
            this.start(false);
        }, () => {
            const hasMore = changes.length > 0;
            if (!hasMore) {
                this._emitSyncPaused();
            }
            this.start(hasMore);
        });
    }
    _emitSyncError(error) {
        this._status.next({ status: 'error', error });
    }
    _emitSyncPaused() {
        this._status.next({ status: 'paused' });
    }
    _emitSyncSyncing() {
        this._status.next({ status: 'syncing' });
    }
    _processDownwardChange(change) {
        if (change.entry_type !== 'insert' && change.entry_type !== 'update' &&
            change.entry_type !== 'delete') {
            return throwError('invalid_entry_type');
        }
        const baseReq = this._relationalModelIdxObs().pipe(exhaustMap(idx => from(this._database.find(this._syncEntryFindRequest(change, idx)))
            .pipe(take(1))));
        if (change.entry_type === 'insert') {
            return baseReq.pipe(exhaustMap(localDocs => {
                if (localDocs.docs.length !== 0) {
                    return throwError('existing_doc');
                }
                return from(this._database.post(this._syncEntryToLocalDoc(change))).pipe(take(1));
            }), mapTo(change));
        }
        return baseReq.pipe(exhaustMap(localDocs => {
            if (localDocs.docs.length !== 1) {
                return throwError('unexisting_doc');
            }
            const localDoc = localDocs.docs[0];
            const op = from(change.entry_type === 'update' ?
                this._database.put(Object.assign(Object.assign({}, localDoc), { object: change.object })) :
                this._database.remove(localDoc));
            return op.pipe(take(1), mapTo(change));
        }));
    }
    _modelGetFindRequest(tableName, params, index) {
        const req = {
            selector: { table_name: tableName, object_id: params.id }
        };
        if (index != null) {
            const idxParts = (index.id || '').split('/');
            if (idxParts.length === 2) {
                req.use_index = idxParts[1];
            }
        }
        return req;
    }
    _modelBulkIdsFindRequest(tableName, ids, index) {
        const req = { selector: { table_name: tableName, object_id: { $in: ids } } };
        if (index != null) {
            const idxParts = (index.id || '').split('/');
            if (idxParts.length === 2) {
                req.use_index = idxParts[1];
            }
        }
        return req;
    }
    _modelQueryFindRequest(tableName, params, index) {
        const req = this._modelListFindRequest(tableName, params);
        if (index != null) {
            const idxParts = (index.id || '').split('/');
            if (idxParts.length === 2) {
                req.use_index = idxParts[1];
            }
        }
        return Object.assign(Object.assign({}, req), { selector: Object.assign(Object.assign({}, req.selector), this._normalizeSelector(params.selector)) });
    }
    _modelListFindRequest(tableName, params, index) {
        const req = { selector: { table_name: tableName } };
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
        if (params.limit != null && params.limit >= 0) {
            req.limit = params.limit;
        }
        if (index != null) {
            const idxParts = (index.id || '').split('/');
            if (idxParts.length === 2) {
                req.use_index = idxParts[1];
            }
        }
        return req;
    }
    _normalizeSelector(selector) {
        const normSelector = {};
        Object.keys(selector).forEach(key => {
            normSelector[`object.${key}`] = selector[key];
        });
        return normSelector;
    }
    _normalizeSortParam(sortParam) {
        let dir = 'asc';
        const fields = Object.keys(sortParam).map((key, i) => {
            const sort = {};
            if (i == 0) {
                dir = sortParam[key];
            }
            sort[key !== 'object_id' ? `object.${key}` : key] = dir;
            return sort;
        });
        return { dir, fields };
    }
    _syncEntryFindRequest(entry, index) {
        const req = { selector: this._syncEntryFindSelector(entry) };
        if (index != null) {
            const idxParts = (index.id || '').split('/');
            if (idxParts.length === 2) {
                req.use_index = idxParts[1];
            }
        }
        return req;
    }
    _syncEntryFindSelector(entry) {
        return {
            table_name: entry.table_name,
            object_id: entry.object_id,
        };
    }
    _initLocalDatabase() {
        pouchDBStatic.plugin(pouchDBFindPlugin);
        const plugins = this._opts.plugins || [];
        plugins.forEach(plugin => pouchDBStatic.plugin(plugin));
        this._database = new pouchDBStatic(this._opts.localDatabaseName, {
            revs_limit: 1,
            adapter: this._opts.adapter,
        });
        this._database.createIndex(this._relationalModelIdx)
            .then(_ => {
            this._emitSyncPaused();
            this._databaseInit.next(true);
        })
            .catch(_ => this._emitSyncError('indexing_failed'));
    }
    _syncEntryToLocalDoc(entry) {
        return { object_id: entry.object_id, table_name: entry.table_name, object: entry.object };
    }
}
SyncService.decorators = [
    { type: Injectable }
];
SyncService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [SYNC_OPTIONS,] }] },
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvc3luYy9zeW5jLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBVWpELE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sS0FBSyxXQUFXLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsSUFBSSxFQUVKLEVBQUUsSUFBSSxLQUFLLEVBQ1gsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsR0FBRyxFQUNKLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sR0FBRyxFQUNILEtBQUssRUFDTCxTQUFTLEVBQ1QsSUFBSSxFQUNKLEdBQUcsRUFDSCxPQUFPLEVBQ1IsTUFBTSxnQkFBZ0IsQ0FBQztBQU94QixPQUFPLEVBQUMsWUFBWSxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBTS9DLE1BQU0sYUFBYSxHQUF5QixPQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztBQUN4RSxNQUFNLGlCQUFpQixHQUF5QixXQUFZLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQztBQUdwRixNQUFNLE9BQU8sV0FBVztJQW9CdEIsWUFBMEMsS0FBa0IsRUFBVSxXQUF1QjtRQUFuRCxVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFuQnJGLFlBQU8sR0FDWCxJ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QUFLLENBQUMsT0FBTztTQUM1QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7YUFDL0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxLQUFnQjtRQUMzQyxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQztJQUMxRixDQUFDOzs7WUE1L0JGLFVBQVU7Ozs0Q0FxQkksTUFBTSxTQUFDLFlBQVk7WUExRTFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1vZGVsR2V0UGFyYW1zLFxuICBNb2RlbEpvaW4sXG4gIE1vZGVsTGlzdFBhcmFtcyxcbiAgTW9kZWxMaXN0UmVzdWx0LFxuICBNb2RlbFF1ZXJ5UGFyYW1zLFxuICBNb2RlbFF1ZXJ5U2VsZWN0b3IsXG4gIE1vZGVsU29ydFxufSBmcm9tICdAZ25ndC9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBQb3VjaERCIGZyb20gJ3BvdWNoZGInO1xuaW1wb3J0ICogYXMgUG91Y2hEQkZpbmQgZnJvbSAncG91Y2hkYi1maW5kJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZnJvbSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzT2YsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGhyb3dFcnJvcixcbiAgdGltZXIsXG4gIHppcFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGNvbmNhdE1hcCxcbiAgZGVsYXlXaGVuLFxuICBleGhhdXN0TWFwLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgbWFwVG8sXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFwLFxuICB0b0FycmF5XG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtMb2NhbERvY30gZnJvbSAnLi9sb2NhbC1kb2MnO1xuaW1wb3J0IHtMb2NhbFN5bmNFbnRyeX0gZnJvbSAnLi9sb2NhbC1zeW5jLWVudHJ5JztcbmltcG9ydCB7TG9jYWxTeW5jTnVtYmVyfSBmcm9tICcuL2xvY2FsLXN5bmMtbnVtYmVyJztcbmltcG9ydCB7U3luY0NoZWNrcG9pbnR9IGZyb20gJy4vc3luYy1jaGVja3BvaW50JztcbmltcG9ydCB7U3luY0VudHJ5fSBmcm9tICcuL3N5bmMtZW50cnknO1xuaW1wb3J0IHtTWU5DX09QVElPTlMsIFN5bmNPcHRpb25zfSBmcm9tICcuL3N5bmMtb3B0aW9ucyc7XG5pbXBvcnQge1N5bmNTdGF0dXN9IGZyb20gJy4vc3luYy1zdGF0dXMnO1xuaW1wb3J0IHtyZWdpc3RlclN5bmNNb2RlbH0gZnJvbSAnLi9zeW5jLXV0aWxzJztcbmltcG9ydCB7VXB3YXJkQ2hhbmdlfSBmcm9tICcuL3Vwd2FyZC1jaGFuZ2UnO1xuaW1wb3J0IHtVcHdhcmRDaGFuZ2VSZXN1bHR9IGZyb20gJy4vdXB3YXJkLWNoYW5nZS1yZXN1bHQnO1xuXG50eXBlIERhdGFiYXNlQ29udGVudCA9IExvY2FsRG9jPGFueT58TG9jYWxTeW5jRW50cnl8TG9jYWxTeW5jTnVtYmVyfFN5bmNDaGVja3BvaW50O1xuXG5jb25zdCBwb3VjaERCU3RhdGljOiBQb3VjaERCLlN0YXRpYyA9ICg8YW55PlBvdWNoREIpLmRlZmF1bHQgfHwgUG91Y2hEQjtcbmNvbnN0IHBvdWNoREJGaW5kUGx1Z2luOiBQb3VjaERCLlBsdWdpbiA9ICg8YW55PlBvdWNoREJGaW5kKS5kZWZhdWx0IHx8IFBvdWNoREJGaW5kO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3luY1NlcnZpY2Uge1xuICBwcml2YXRlIF9zdGF0dXM6IEJlaGF2aW9yU3ViamVjdDxTeW5jU3RhdHVzPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFN5bmNTdGF0dXM+KHtzdGF0dXM6ICdpbml0aWFsaXppbmcnfSk7XG4gIHJlYWRvbmx5IHN0YXR1czogT2JzZXJ2YWJsZTxTeW5jU3RhdHVzPiA9IHRoaXMuX3N0YXR1cyBhcyBPYnNlcnZhYmxlPFN5bmNTdGF0dXM+O1xuXG4gIHByaXZhdGUgX3RpbWVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3N5bmNpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGF0YWJhc2U6IFBvdWNoREIuRGF0YWJhc2U8RGF0YWJhc2VDb250ZW50PjtcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVtb3RlQ2hlY2twb2ludEtleSA9ICdnbmd0X3JlbW90ZV9zeW5jX2NoZWNrcG9pbnQnO1xuICBwcml2YXRlIHJlYWRvbmx5IF9sb2NhbENoZWNrcG9pbnRLZXkgPSAnZ25ndF9sb2NhbF9zeW5jX2NoZWNrcG9pbnQnO1xuICBwcml2YXRlIHJlYWRvbmx5IF9sb2NhbFN5bmNOdW1iZXIgPSAnZ25ndF9sb2NhbF9zeW5jX251bWJlcic7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xvY2FsU3luY0VudHJ5UHJlZml4ID0gJ2duZ3RfbG9jYWxfc3luY19lbnRyeV8nO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zeW5jVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NoYW5nZXNVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVsYXRpb25hbE1vZGVsSWR4OiBQb3VjaERCLkZpbmQuQ3JlYXRlSW5kZXhPcHRpb25zID0ge1xuICAgIGluZGV4OiB7bmFtZTogJ3JlbGF0aW9uYWxfbW9kZWxfaWR4JywgZmllbGRzOiBbJ3RhYmxlX25hbWUnLCAnb2JqZWN0X2lkJ119XG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgX2RhdGFiYXNlSW5pdDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2RhdGFiYXNlSXNJbml0OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoU1lOQ19PUFRJT05TKSBwcml2YXRlIF9vcHRzOiBTeW5jT3B0aW9ucywgcHJpdmF0ZSBfaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIGlmICh0aGlzLl9vcHRzLnN5bmNJbnRlcnZhbCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9vcHRzLnN5bmNJbnRlcnZhbCA9IDMwMDAwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX29wdHMuY2hhbmdlc0JhdGNoU2l6ZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9vcHRzLmNoYW5nZXNCYXRjaFNpemUgPSA1MDtcbiAgICB9XG5cbiAgICB0aGlzLl9zeW5jVXJsID0gYCR7dGhpcy5fb3B0cy5iYXNlVXJsfSR7dGhpcy5fb3B0cy5jaGFuZ2VzUGF0aCB8fCAnY2hhbmdlcyd9YDtcbiAgICB0aGlzLl9jaGFuZ2VzVXJsID0gYCR7dGhpcy5fb3B0cy5iYXNlVXJsfSR7dGhpcy5fb3B0cy5kb2NzUGF0aCB8fCAnZG9jcyd9YDtcbiAgICB0aGlzLl9pbml0TG9jYWxEYXRhYmFzZSgpO1xuICAgIHRoaXMuX2RhdGFiYXNlSXNJbml0ID0gdGhpcy5fZGF0YWJhc2VJbml0LnBpcGUoZmlsdGVyKGkgPT4gaSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJTeW5jTW9kZWwoZW5kUG9pbnQ6IHN0cmluZywgdGFibGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZWdpc3RlclN5bmNNb2RlbChlbmRQb2ludCwgdGFibGVOYW1lKTtcbiAgfVxuXG4gIHN0YXJ0KGltbWVkaWF0ZSA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3luY2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zeW5jaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl90aW1lclN1YiA9IHRpbWVyKGltbWVkaWF0ZSA/IDAgOiB0aGlzLl9vcHRzLnN5bmNJbnRlcnZhbCwgdGhpcy5fb3B0cy5zeW5jSW50ZXJ2YWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5V2hlbihfID0+IHRoaXMuX2RhdGFiYXNlSXNJbml0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXyA9PiB0aGlzLl9jaGVja1N5bmMoKSk7XG4gIH1cblxuICBzdG9wKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fc3luY2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl90aW1lclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N5bmNpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCh0YWJsZU5hbWU6IHN0cmluZywgcGFyYW1zOiBNb2RlbEdldFBhcmFtcyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgZGIgPSB0aGlzLl9nZXRMb2NhbERvY3NEYigpO1xuICAgIHJldHVybiB0aGlzLl9kYXRhYmFzZUlzSW5pdC5waXBlKFxuICAgICAgICBleGhhdXN0TWFwKF8gPT4gdGhpcy5fcmVsYXRpb25hbE1vZGVsSWR4T2JzKCkpLFxuICAgICAgICBleGhhdXN0TWFwKHJtaSA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZFByb21pc2UgPSBkYi5maW5kKHRoaXMuX21vZGVsR2V0RmluZFJlcXVlc3QoXG4gICAgICAgICAgICAgIHRhYmxlTmFtZSwgcGFyYW1zLCBybWkgYXMgUG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4pKTtcbiAgICAgICAgICByZXR1cm4gZnJvbShmaW5kUHJvbWlzZSlcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgbWFwKHJlcyA9PiAoe3Jlcywgcm1pfSkpLFxuICAgICAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgc3dpdGNoTWFwKHIgPT4ge1xuICAgICAgICAgIGNvbnN0IHtyZXMsIHJtaX0gPSByIGFzIHtcbiAgICAgICAgICAgIHJlczogUG91Y2hEQi5GaW5kLkZpbmRSZXNwb25zZTxMb2NhbERvYzxhbnk+PixcbiAgICAgICAgICAgIHJtaTogUG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj5cbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChyZXMuZG9jcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLl9zdWJPYmplY3QocmVzLmRvY3NbMF0ub2JqZWN0LCBwYXJhbXMuZmllbGRzKTtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuam9pbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBvYnNlcnZhYmxlcyA9IHBhcmFtcy5qb2lucy5tYXAoam9pbiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmluZFByb21pc2UgPSBkYi5maW5kKHRoaXMuX21vZGVsR2V0RmluZFJlcXVlc3QoXG4gICAgICAgICAgICAgICAgICAgIGpvaW4ubW9kZWwsIHtpZDogb2JqW2pvaW4ucHJvcGVydHldLCBmaWVsZHM6IGpvaW4uZmllbGRzfSwgcm1pKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb20oZmluZFByb21pc2UpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyZWxSZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGVkID0gcmVsUmVzIGFzIFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj47XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWxhdGVkLmRvY3MubGVuZ3RoID09PSAxID8gcmVsYXRlZC5kb2NzWzBdLm9iamVjdCA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyZWxhdGVkID0+ICh7am9pbiwgcmVsYXRlZH0pKSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB6aXAoLi4ub2JzZXJ2YWJsZXMpXG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICBtYXAoam9pbnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgam9pbnMuZm9yRWFjaChqb2luRW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbam9pbkVudHJ5LmpvaW4ucHJvcGVydHldID0gam9pbkVudHJ5LnJlbGF0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9ic09mKG9iaik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdub3RfZm91bmQnKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2UoMSksXG4gICAgKTtcbiAgfVxuXG4gIGxpc3QodGFibGVOYW1lOiBzdHJpbmcsIHBhcmFtczogTW9kZWxMaXN0UGFyYW1zKTogT2JzZXJ2YWJsZTxNb2RlbExpc3RSZXN1bHQ8YW55Pj4ge1xuICAgIGNvbnN0IGRiID0gdGhpcy5fZ2V0TG9jYWxEb2NzRGIoKTtcbiAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2VJc0luaXQucGlwZShcbiAgICAgICAgZXhoYXVzdE1hcChfID0+IHRoaXMuX3JlbGF0aW9uYWxNb2RlbElkeE9icyh7dGFibGVOYW1lLCBzb3J0OiBwYXJhbXMuc29ydH0pKSxcbiAgICAgICAgZXhoYXVzdE1hcChpZHggPT4ge1xuICAgICAgICAgIGxldCBmaW5kUmVxID0gdGhpcy5fbW9kZWxMaXN0RmluZFJlcXVlc3QoXG4gICAgICAgICAgICAgIHRhYmxlTmFtZSwgcGFyYW1zLCBpZHggYXMgUG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4pO1xuICAgICAgICAgIHJldHVybiBmcm9tKGRiLmZpbmQoZmluZFJlcSkpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5lcnJvciA9PT0gJ25vX3VzYWJsZV9pbmRleCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZmluZFJlcS51c2VfaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZpbmRSZXEuc29ydDtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShkYi5maW5kKGZpbmRSZXEpKS5waXBlKHRha2UoMSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICAgIHJlcyA9PiB0aGlzLl9yZWxhdGlvbmFsTW9kZWxJZHhPYnMoKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChpZHggPT4gKHtyZXMsIGlkeH0pKSxcbiAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgc3dpdGNoTWFwKGN1clJlcyA9PiB7XG4gICAgICAgICAgY29uc3Qge3JlcywgaWR4fSA9IGN1clJlcyBhcyB7XG4gICAgICAgICAgICByZXM6IFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4sXG4gICAgICAgICAgICBpZHg6IFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAocGFyYW1zLmpvaW5zICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGpvaW5UYWJsZXM6IHtbdGFibGU6IHN0cmluZ106IG51bWJlcltdfSA9IHBhcmFtcy5qb2lucy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmayA9IGN1ci5mb3JlaWduS2V5IHx8IGN1ci5wcm9wZXJ0eTtcbiAgICAgICAgICAgICAgcHJldltjdXIubW9kZWxdID0gcmVzLmRvY3MubWFwKGQgPT4gZC5vYmplY3RbZmtdKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSBhcyB7W3RhYmxlOiBzdHJpbmddOiBudW1iZXJbXX0pO1xuICAgICAgICAgICAgcmV0dXJuIHppcCguLi5wYXJhbXMuam9pbnMubWFwKGpvaW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgY29uc3Qgam9pbk1vZGVsID0gam9pbi5vZmZsaW5lTW9kZWwgfHwgam9pbi5tb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcSA9IHRoaXMuX21vZGVsTGlzdEZpbmRSZXF1ZXN0KGpvaW5Nb2RlbCwge2ZpZWxkczogam9pbi5maWVsZHN9LCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgcmVxLnNlbGVjdG9yWydvYmplY3RfaWQnXSA9IHsnJGluJzogam9pblRhYmxlc1tqb2luLm1vZGVsXX07XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShkYi5maW5kKHJlcSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyZWxhdGVkID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpvaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVsYXRlZCBhcyBQb3VjaERCLkZpbmQuRmluZFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KS5kb2NzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKGpvaW5zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRvY3MubWFwKGRvYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSBkb2Mub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgam9pbnNPYmogPSAoam9pbnMgYXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpvaW46IE1vZGVsSm9pbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkOiBQb3VjaERCLkNvcmUuRXhpc3RpbmdEb2N1bWVudDxMb2NhbERvYzxhbnk+PltdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9W10pLnJlZHVjZSgoam8sIGpvaW5FbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gam9pbkVudHJ5LmpvaW4ucHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZrID0gam9pbkVudHJ5LmpvaW4uZm9yZWlnbktleSB8fCBqb2luRW50cnkuam9pbi5wcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsID0gam9pbkVudHJ5LnJlbGF0ZWQuZmluZChyID0+IHIub2JqZWN0X2lkID09PSBvYmpbZmtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgam9bcHJvcF0gPSByZWwgIT0gbnVsbCA/IHJlbC5vYmplY3QgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gam87XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSBhcyBhbnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsuLi50aGlzLl9zdWJPYmplY3Qob2JqLCBwYXJhbXMuZmllbGRzKSwgLi4uam9pbnNPYmp9O1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2JzT2YocmVzLmRvY3MubWFwKGQgPT4gdGhpcy5fc3ViT2JqZWN0KGQub2JqZWN0LCBwYXJhbXMuZmllbGRzKSkpO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKHIgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSByIGFzIGFueVtdO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb3VudDogcmVzdWx0cy5sZW5ndGgsXG4gICAgICAgICAgICByZXN1bHRzLFxuICAgICAgICAgICAgcHJldmlvdXM6IG51bGwsXG4gICAgICAgICAgICBuZXh0OiBudWxsLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlKDEpLFxuICAgICk7XG4gIH1cblxuICBjcmVhdGUodGFibGVOYW1lOiBzdHJpbmcsIG9iamVjdDogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2VJc0luaXQucGlwZShcbiAgICAgICAgZXhoYXVzdE1hcChfID0+IHRoaXMuX25leHRPYmplY3RJZCh0YWJsZU5hbWUpLnBpcGUodGFrZSgxKSkpLFxuICAgICAgICBleGhhdXN0TWFwKGlkID0+IHtcbiAgICAgICAgICBvYmplY3QgPSB7aWQsIC4uLm9iamVjdH07XG4gICAgICAgICAgY29uc3QgbG9jYWxEb2MgPSB7dGFibGVfbmFtZTogdGFibGVOYW1lLCBvYmplY3RfaWQ6IGlkfTtcbiAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLl9kYXRhYmFzZS5wb3N0KHsuLi5sb2NhbERvYywgb2JqZWN0fSBhcyBhbnkpKVxuICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgZXhoYXVzdE1hcChkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvYyA9IGQgYXMgUG91Y2hEQi5Db3JlLlJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuX2NyZWF0ZUxvY2FsU3luY0VudHJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZG9jX2lkOiBkb2MuaWQsIGVudHJ5X3R5cGU6ICdpbnNlcnQnLCAuLi5sb2NhbERvY30gYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFydGlhbDxMb2NhbFN5bmNFbnRyeT4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgoKSA9PiBvYmplY3QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPGFueT47XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlKDEpLFxuICAgICk7XG4gIH1cblxuICB1cGRhdGUodGFibGVOYW1lOiBzdHJpbmcsIGlkOiBudW1iZXIsIG9iamVjdDogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBkYiA9IHRoaXMuX2dldExvY2FsRG9jc0RiKCk7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFiYXNlSXNJbml0LnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChfID0+IHRoaXMuX3JlbGF0aW9uYWxNb2RlbElkeE9icygpKSxcbiAgICAgICAgZXhoYXVzdE1hcChcbiAgICAgICAgICAgIGlkeCA9PlxuICAgICAgICAgICAgICAgIGZyb20oZGIuZmluZCh0aGlzLl9tb2RlbEdldEZpbmRSZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlTmFtZSwge2lkfSwgaWR4IGFzIFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KSkpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICBleGhhdXN0TWFwKGN1clJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gY3VyUmVzIGFzIFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj47XG4gICAgICAgICAgaWYgKHJlcy5kb2NzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ25vdF9mb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsb2NhbERvYyA9IHsuLi5yZXMuZG9jc1swXSwgb2JqZWN0fTtcbiAgICAgICAgICByZXR1cm4gZnJvbShkYi5wb3N0KGxvY2FsRG9jKSlcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBtYXAociA9PiAoe3JlczogciwgbG9jYWxEb2N9KSksXG4gICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgZXhoYXVzdE1hcChyID0+IHtcbiAgICAgICAgICBjb25zdCB7cmVzLCBsb2NhbERvY30gPSByIGFzXG4gICAgICAgICAgICAgIHtyZXM6IFBvdWNoREIuQ29yZS5SZXNwb25zZSwgbG9jYWxEb2M6IFBvdWNoREIuQ29yZS5FeGlzdGluZ0RvY3VtZW50PExvY2FsRG9jPGFueT4+fTtcbiAgICAgICAgICBjb25zdCBzeW5jRW50cnk6IFBhcnRpYWw8TG9jYWxTeW5jRW50cnk+ID0ge1xuICAgICAgICAgICAgZG9jX2lkOiByZXMuaWQsXG4gICAgICAgICAgICB0YWJsZV9uYW1lOiB0YWJsZU5hbWUsXG4gICAgICAgICAgICBvYmplY3RfaWQ6IGxvY2FsRG9jLm9iamVjdF9pZCxcbiAgICAgICAgICAgIGVudHJ5X3R5cGU6ICd1cGRhdGUnXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlTG9jYWxTeW5jRW50cnkoc3luY0VudHJ5KS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKCkgPT4gbG9jYWxEb2Mub2JqZWN0KSxcbiAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICApO1xuICB9XG5cbiAgZGVsZXRlKHRhYmxlTmFtZTogc3RyaW5nLCBpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBkYiA9IHRoaXMuX2dldExvY2FsRG9jc0RiKCk7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFiYXNlSXNJbml0LnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChfID0+IHRoaXMuX3JlbGF0aW9uYWxNb2RlbElkeE9icygpKSxcbiAgICAgICAgZXhoYXVzdE1hcChcbiAgICAgICAgICAgIGlkeCA9PlxuICAgICAgICAgICAgICAgIGZyb20oZGIuZmluZCh0aGlzLl9tb2RlbEdldEZpbmRSZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlTmFtZSwge2lkfSwgaWR4IGFzIFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KSkpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICBleGhhdXN0TWFwKGN1clJlcyA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gY3VyUmVzIGFzIFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj47XG4gICAgICAgICAgaWYgKHJlcy5kb2NzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ25vdF9mb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsb2NhbERvYyA9IHJlcy5kb2NzWzBdO1xuICAgICAgICAgIHJldHVybiBmcm9tKGRiLnJlbW92ZShsb2NhbERvYykpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgbWFwKHIgPT4gKHtyZXM6IHIsIGxvY2FsRG9jfSkpLFxuICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIGV4aGF1c3RNYXAociA9PiB7XG4gICAgICAgICAgY29uc3Qge3JlcywgbG9jYWxEb2N9ID0gciBhc1xuICAgICAgICAgICAgICB7cmVzOiBQb3VjaERCLkNvcmUuUmVzcG9uc2UsIGxvY2FsRG9jOiBQb3VjaERCLkNvcmUuRXhpc3RpbmdEb2N1bWVudDxMb2NhbERvYzxhbnk+Pn07XG4gICAgICAgICAgY29uc3Qgc3luY0VudHJ5OiBQYXJ0aWFsPExvY2FsU3luY0VudHJ5PiA9IHtcbiAgICAgICAgICAgIGRvY19pZDogcmVzLmlkLFxuICAgICAgICAgICAgdGFibGVfbmFtZTogdGFibGVOYW1lLFxuICAgICAgICAgICAgb2JqZWN0X2lkOiBsb2NhbERvYy5vYmplY3RfaWQsXG4gICAgICAgICAgICBlbnRyeV90eXBlOiAnZGVsZXRlJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUxvY2FsU3luY0VudHJ5KHN5bmNFbnRyeSkucGlwZShcbiAgICAgICAgICAgICAgbWFwKCgpID0+IGxvY2FsRG9jLm9iamVjdCksXG4gICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2UoMSksXG4gICAgKTtcbiAgfVxuXG4gIGRlbGV0ZUFsbCh0YWJsZU5hbWU6IHN0cmluZywgaWRzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBjb25zdCBkYiA9IHRoaXMuX2dldExvY2FsRG9jc0RiKCk7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFiYXNlSXNJbml0LnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChfID0+IHRoaXMuX3JlbGF0aW9uYWxNb2RlbElkeE9icygpKSxcbiAgICAgICAgZXhoYXVzdE1hcChcbiAgICAgICAgICAgIGlkeCA9PlxuICAgICAgICAgICAgICAgIGZyb20oZGIuZmluZCh0aGlzLl9tb2RlbEJ1bGtJZHNGaW5kUmVxdWVzdChcbiAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZU5hbWUsIGlkcywgaWR4IGFzIFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KSkpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICBjb25jYXRNYXAociA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gciBhcyBQb3VjaERCLkZpbmQuRmluZFJlc3BvbnNlPExvY2FsRG9jPGFueT4+O1xuICAgICAgICAgIGlmIChyZXMuZG9jcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdub3RfZm91bmQnKSBhc1xuICAgICAgICAgICAgICAgIE9ic2VydmFibGU8UG91Y2hEQi5Db3JlLkV4aXN0aW5nRG9jdW1lbnQ8TG9jYWxEb2M8YW55Pj4+O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZnJvbShyZXMuZG9jcykgYXMgT2JzZXJ2YWJsZTxQb3VjaERCLkNvcmUuRXhpc3RpbmdEb2N1bWVudDxMb2NhbERvYzxhbnk+Pj47XG4gICAgICAgIH0pLFxuICAgICAgICBjb25jYXRNYXAobGQgPT4ge1xuICAgICAgICAgIGNvbnN0IGxvY2FsRG9jID0gbGQgYXMgUG91Y2hEQi5Db3JlLkV4aXN0aW5nRG9jdW1lbnQ8TG9jYWxEb2M8YW55Pj47XG4gICAgICAgICAgcmV0dXJuIGZyb20oZGIucmVtb3ZlKGxvY2FsRG9jKSlcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBtYXAocmVzID0+ICh7cmVzLCBsb2NhbERvY30pKSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIGNvbmNhdE1hcChyID0+IHtcbiAgICAgICAgICBjb25zdCB7cmVzLCBsb2NhbERvY30gPSByIGFzXG4gICAgICAgICAgICAgIHtyZXM6IFBvdWNoREIuQ29yZS5SZXNwb25zZSwgbG9jYWxEb2M6IFBvdWNoREIuQ29yZS5FeGlzdGluZ0RvY3VtZW50PExvY2FsRG9jPGFueT4+fTtcbiAgICAgICAgICBjb25zdCBzeW5jRW50cnk6IFBhcnRpYWw8TG9jYWxTeW5jRW50cnk+ID0ge1xuICAgICAgICAgICAgZG9jX2lkOiByZXMuaWQsXG4gICAgICAgICAgICB0YWJsZV9uYW1lOiB0YWJsZU5hbWUsXG4gICAgICAgICAgICBvYmplY3RfaWQ6IGxvY2FsRG9jLm9iamVjdF9pZCxcbiAgICAgICAgICAgIGVudHJ5X3R5cGU6ICdkZWxldGUnXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlTG9jYWxTeW5jRW50cnkoc3luY0VudHJ5KS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKCkgPT4gbG9jYWxEb2Mub2JqZWN0KSxcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZShpZHMubGVuZ3RoKSxcbiAgICAgICAgdG9BcnJheSgpLFxuICAgICk7XG4gIH1cblxuICBxdWVyeSh0YWJsZU5hbWU6IHN0cmluZywgcGFyYW1zOiBNb2RlbFF1ZXJ5UGFyYW1zKTogT2JzZXJ2YWJsZTxNb2RlbExpc3RSZXN1bHQ8YW55Pj4ge1xuICAgIGNvbnN0IGRiID0gdGhpcy5fZ2V0TG9jYWxEb2NzRGIoKTtcbiAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2VJc0luaXQucGlwZShcbiAgICAgICAgICAgICAgIGV4aGF1c3RNYXAoXG4gICAgICAgICAgICAgICAgICAgXyA9PiAodGhpcy5fcmVsYXRpb25hbE1vZGVsSWR4T2JzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFibGVOYW1lLCBzZWxlY3RvcjogcGFyYW1zLnNlbGVjdG9yLCBzb3J0OiBwYXJhbXMuc29ydH0pIGFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgT2JzZXJ2YWJsZTxQb3VjaERCLkZpbmQuQ3JlYXRlSW5kZXhSZXNwb25zZTxMb2NhbERvYzxhbnk+Pj4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgZXhoYXVzdE1hcChpZHggPT4ge1xuICAgICAgICAgICAgICAgICBsZXQgZmluZFJlcSA9IHRoaXMuX21vZGVsUXVlcnlGaW5kUmVxdWVzdChcbiAgICAgICAgICAgICAgICAgICAgIHRhYmxlTmFtZSwgcGFyYW1zLCBpZHggYXMgUG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4pO1xuICAgICAgICAgICAgICAgICByZXR1cm4gKGZyb20oZGIuZmluZChmaW5kUmVxKSkgYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICBPYnNlcnZhYmxlPFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4+KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5lcnJvciA9PT0gJ25vX3VzYWJsZV9pbmRleCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmaW5kUmVxLnVzZV9pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmaW5kUmVxLnNvcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShkYi5maW5kKGZpbmRSZXEpKS5waXBlKHRha2UoMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4+O1xuICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICBzd2l0Y2hNYXAociA9PiB7XG4gICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHIgYXMgUG91Y2hEQi5GaW5kLkZpbmRSZXNwb25zZTxMb2NhbERvYzxhbnk+PjtcbiAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9yZWxhdGlvbmFsTW9kZWxJZHhPYnMoKSBhc1xuICAgICAgICAgICAgICAgICAgICAgICAgIE9ic2VydmFibGU8UG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4+KVxuICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgbWFwKGlkeCA9PiAoe3JlcywgaWR4fSkpLFxuICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgc3dpdGNoTWFwKGN1clJlcyA9PiB7XG4gICAgICAgICAgICAgICAgIGNvbnN0IHtyZXMsIGlkeH0gPSBjdXJSZXMgYXMge1xuICAgICAgICAgICAgICAgICAgIHJlczogUG91Y2hEQi5GaW5kLkZpbmRSZXNwb25zZTxMb2NhbERvYzxhbnk+PixcbiAgICAgICAgICAgICAgICAgICBpZHg6IFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+XG4gICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuam9pbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgIGNvbnN0IGpvaW5UYWJsZXM6IHtbdGFibGU6IHN0cmluZ106IG51bWJlcltdfSA9XG4gICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5qb2lucy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZrID0gY3VyLmZvcmVpZ25LZXkgfHwgY3VyLnByb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZbY3VyLm1vZGVsXSA9IHJlcy5kb2NzLm1hcChkID0+IGQub2JqZWN0W2ZrXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgICAgICAgICAgIH0sIHt9IGFzIHtbdGFibGU6IHN0cmluZ106IG51bWJlcltdfSk7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHppcCguLi5wYXJhbXMuam9pbnMubWFwKGpvaW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGpvaW5Nb2RlbCA9IGpvaW4ub2ZmbGluZU1vZGVsIHx8IGpvaW4ubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kZWxMaXN0RmluZFJlcXVlc3Qoam9pbk1vZGVsLCB7ZmllbGRzOiBqb2luLmZpZWxkc30sIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnNlbGVjdG9yWydvYmplY3RfaWQnXSA9IHsnJGluJzogam9pblRhYmxlc1tqb2luLm1vZGVsXX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20oZGIuZmluZChyZXEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyZWxhdGVkID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqb2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVsYXRlZCBhcyBQb3VjaERCLkZpbmQuRmluZFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9jc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChqb2lucyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZG9jcy5tYXAoZG9jID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSBkb2Mub2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGpvaW5zT2JqID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGpvaW5zIGFzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqb2luOiBNb2RlbEpvaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZDogUG91Y2hEQi5Db3JlLkV4aXN0aW5nRG9jdW1lbnQ8TG9jYWxEb2M8YW55Pj5bXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVtdKS5yZWR1Y2UoKGpvLCBqb2luRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gam9pbkVudHJ5LmpvaW4ucHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmsgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqb2luRW50cnkuam9pbi5mb3JlaWduS2V5IHx8IGpvaW5FbnRyeS5qb2luLnByb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpvaW5FbnRyeS5yZWxhdGVkLmZpbmQociA9PiByLm9iamVjdF9pZCA9PT0gb2JqW2ZrXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgam9bcHJvcF0gPSByZWwgIT0gbnVsbCA/IHJlbC5vYmplY3QgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge30gYXMgYW55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gey4uLnRoaXMuX3N1Yk9iamVjdChvYmosIHBhcmFtcy5maWVsZHMpLCAuLi5qb2luc09ian07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic09mKHJlcy5kb2NzLm1hcChkID0+IHRoaXMuX3N1Yk9iamVjdChkLm9iamVjdCwgcGFyYW1zLmZpZWxkcykpKTtcbiAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgbWFwKHJlc3VsdHMgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgIGNvdW50OiAocmVzdWx0cyBhcyBhbnlbXSkubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPE1vZGVsTGlzdFJlc3VsdDxhbnk+PjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsRG9jc0RiKCk6IFBvdWNoREIuRGF0YWJhc2U8TG9jYWxEb2M8YW55Pj4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhYmFzZSBhcyBQb3VjaERCLkRhdGFiYXNlPExvY2FsRG9jPGFueT4+O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYWxTeW5jRGIoKTogUG91Y2hEQi5EYXRhYmFzZTxMb2NhbFN5bmNFbnRyeT4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhYmFzZSBhcyBQb3VjaERCLkRhdGFiYXNlPExvY2FsU3luY0VudHJ5PjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2FsU3luY051bWJlckRiKCk6IFBvdWNoREIuRGF0YWJhc2U8TG9jYWxTeW5jTnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFiYXNlIGFzIFBvdWNoREIuRGF0YWJhc2U8TG9jYWxTeW5jTnVtYmVyPjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFN5bmNDaGVja3BvaW50RGIoKTogUG91Y2hEQi5EYXRhYmFzZTxTeW5jQ2hlY2twb2ludD4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhYmFzZSBhcyBQb3VjaERCLkRhdGFiYXNlPFN5bmNDaGVja3BvaW50PjtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUxvY2FsU3luY0VudHJ5KHN5bmNFbnRyeTogUGFydGlhbDxMb2NhbFN5bmNFbnRyeT4pOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9nZXROZXh0TG9jYWxTeW5jTnVtYmVyKCkucGlwZShcbiAgICAgICAgICAgICAgIGV4aGF1c3RNYXAoc3luY051bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgIHN5bmNFbnRyeS5faWQgPSBgX2xvY2FsLyR7dGhpcy5fbG9jYWxTeW5jRW50cnlQcmVmaXh9JHtzeW5jTnVtYmVyfWA7XG4gICAgICAgICAgICAgICAgIHN5bmNFbnRyeS5zZXF1ZW5jZSA9IHN5bmNOdW1iZXI7XG4gICAgICAgICAgICAgICAgIHJldHVybiBmcm9tKHRoaXMuX2RhdGFiYXNlLnB1dDxMb2NhbFN5bmNFbnRyeT4oc3luY0VudHJ5IGFzIExvY2FsU3luY0VudHJ5KSlcbiAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgZXhoYXVzdE1hcChfID0+IHRoaXMuX3NldExvY2FsU3luY051bWJlcihzeW5jTnVtYmVyKS5waXBlKHRha2UoMSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICkgYXMgT2JzZXJ2YWJsZTxudW1iZXI+O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TG9jYWxTeW5jTnVtYmVyKHN5bmNOdW1iZXI6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgY29uc3QgZGIgPSB0aGlzLl9nZXRMb2NhbFN5bmNOdW1iZXJEYigpO1xuICAgIGNvbnN0IGlkID0gYF9sb2NhbC8ke3RoaXMuX2xvY2FsU3luY051bWJlcn1gO1xuICAgIHJldHVybiBmcm9tKGRiLmdldChpZCkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoXyA9PiBvYnNPZih7X2lkOiBpZCwgbnVtYmVyOiAwfSBhcyBMb2NhbFN5bmNOdW1iZXIpKSxcbiAgICAgICAgICAgIGV4aGF1c3RNYXAoXG4gICAgICAgICAgICAgICAgZG9jID0+IGZyb20oZGIucG9zdCh7Li4uKGRvYyBhcyBMb2NhbFN5bmNOdW1iZXIpLCBudW1iZXI6IHN5bmNOdW1iZXJ9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBtYXAoXyA9PiBzeW5jTnVtYmVyKSxcbiAgICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE5leHRMb2NhbFN5bmNOdW1iZXIoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBjb25zdCBkYiA9IHRoaXMuX2dldExvY2FsU3luY051bWJlckRiKCk7XG4gICAgcmV0dXJuIGZyb20oZGIuZ2V0KGBfbG9jYWwvJHt0aGlzLl9sb2NhbFN5bmNOdW1iZXJ9YCkpXG4gICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgIG1hcChkb2MgPT4gKGRvYyBhcyBMb2NhbFN5bmNOdW1iZXIpLm51bWJlciArIDEpLFxuICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoXyA9PiBvYnNPZigxKSksXG4gICAgICAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPG51bWJlcj47XG4gIH1cblxuICBwcml2YXRlIF9uZXh0T2JqZWN0SWQodGFibGVOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIGNvbnN0IHNvcnQgPSB7b2JqZWN0X2lkOiAnZGVzYyd9IGFzIE1vZGVsU29ydDtcbiAgICBjb25zdCBkYiA9IHRoaXMuX2dldExvY2FsRG9jc0RiKCk7XG4gICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9uYWxNb2RlbElkeE9icyh7dGFibGVOYW1lLCBzb3J0fSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBleGhhdXN0TWFwKFxuICAgICAgICAgICAgICAgIGlkeCA9PiAoZnJvbShkYi5maW5kKHRoaXMuX21vZGVsTGlzdEZpbmRSZXF1ZXN0KHRhYmxlTmFtZSwge3NvcnR9LCBpZHgpKSkgYXNcbiAgICAgICAgICAgICAgICAgICAgICAgIE9ic2VydmFibGU8UG91Y2hEQi5GaW5kLkZpbmRSZXNwb25zZTxMb2NhbERvYzxhbnk+Pj4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgbWFwKHIgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZXMgPSByIGFzIFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj47XG4gICAgICAgICAgICAgIHJldHVybiByZXMuZG9jcy5sZW5ndGggPiAwID8gcmVzLmRvY3NbMF0ub2JqZWN0X2lkICsgMSA6IDE7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbGF0aW9uYWxNb2RlbElkeE9icyhcbiAgICAgIGlkeERlZj86IHt0YWJsZU5hbWU6IHN0cmluZywgc2VsZWN0b3I/OiBNb2RlbFF1ZXJ5U2VsZWN0b3IsIHNvcnQ/OiBNb2RlbFNvcnR9KTpcbiAgICAgIE9ic2VydmFibGU8UG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4+IHtcbiAgICBpZiAoaWR4RGVmICE9IG51bGwgJiYgKGlkeERlZi5zb3J0ICE9IG51bGwgfHwgaWR4RGVmLnNlbGVjdG9yICE9IG51bGwpKSB7XG4gICAgICBsZXQgc29ydEZpZWxkcyA9IFtdIGFzIHtba2V5OiBzdHJpbmddOiAnYXNjJyB8ICdkZXNjJ31bXTtcbiAgICAgIGxldCBzZWxlY3RvckZpZWxkcyA9IFtdIGFzIHtba2V5OiBzdHJpbmddOiAnYXNjJyB8ICdkZXNjJ31bXTtcbiAgICAgIGxldCBkaXIgPSAnYXNjJyBhcyAnYXNjJyB8ICdkZXNjJztcbiAgICAgIGlmIChpZHhEZWYuc29ydCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG5vcm1Tb3J0ID0gdGhpcy5fbm9ybWFsaXplU29ydFBhcmFtKGlkeERlZi5zb3J0KTtcbiAgICAgICAgc29ydEZpZWxkcyA9IG5vcm1Tb3J0LmZpZWxkcztcbiAgICAgICAgZGlyID0gbm9ybVNvcnQuZGlyO1xuICAgICAgfVxuICAgICAgaWYgKGlkeERlZi5zZWxlY3RvciAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG5vcm1TZWwgPSB0aGlzLl9ub3JtYWxpemVTZWxlY3RvcihpZHhEZWYuc2VsZWN0b3IpO1xuICAgICAgICBzZWxlY3RvckZpZWxkcyA9IE9iamVjdC5rZXlzKG5vcm1TZWwpLm1hcChrID0+IHtcbiAgICAgICAgICBjb25zdCBvYmogPSB7fSBhcyBhbnk7XG4gICAgICAgICAgb2JqW2tdID0gZGlyO1xuICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRGaWVsZHMubGVuZ3RoID4gMCB8fCBzZWxlY3RvckZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IFsuLi5zZWxlY3RvckZpZWxkcywge3RhYmxlX25hbWU6IGRpcn0sIC4uLnNvcnRGaWVsZHNdO1xuICAgICAgICByZXR1cm4gKGZyb20odGhpcy5fZGF0YWJhc2UuY3JlYXRlSW5kZXgoe1xuICAgICAgICAgICAgICAgICAgaW5kZXg6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fZ2VuZXJhdGVJbmRleE5hbWUoaWR4RGVmLnRhYmxlTmFtZSwgZmllbGRzKSxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBmaWVsZHMgYXMgYW55XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpIGFzIE9ic2VydmFibGU8UG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4+KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoZnJvbSh0aGlzLl9kYXRhYmFzZS5jcmVhdGVJbmRleCh0aGlzLl9yZWxhdGlvbmFsTW9kZWxJZHgpKSBhc1xuICAgICAgICAgICAgT2JzZXJ2YWJsZTxQb3VjaERCLkZpbmQuQ3JlYXRlSW5kZXhSZXNwb25zZTxMb2NhbERvYzxhbnk+Pj4pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlSW5kZXhOYW1lKHRhYmxlTmFtZTogc3RyaW5nLCBmaWVsZHM6IE1vZGVsU29ydFtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGlkeF9fXyR7dGFibGVOYW1lfV9fXyR7XG4gICAgICAgIGZpZWxkc1xuICAgICAgICAgICAgLm1hcChmID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoZilbMF07XG4gICAgICAgICAgICAgIHJldHVybiBgJHtrZXkucmVwbGFjZSgnLicsICdfJyl9X18ke2Zba2V5XX1gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCdfX18nKX1gO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3ViT2JqZWN0KG9iajogYW55LCBmaWVsZHM/OiBzdHJpbmdbXSk6IGFueSB7XG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IGZpZWxkcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBvYmogPSBvYmogfHwge307XG4gICAgY29uc3Qgc3ViT2JqOiBhbnkgPSB7fTtcbiAgICAoZmllbGRzIHx8IFtdKS5mb3JFYWNoKGYgPT4gc3ViT2JqW2ZdID0gb2JqW2ZdKTtcbiAgICByZXR1cm4gc3ViT2JqO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tTeW5jKCk6IHZvaWQge1xuICAgIHRoaXMuX2NoZWNrVXB3YXJkU3luYygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tVcHdhcmRTeW5jKCk6IHZvaWQge1xuICAgIHppcCh0aGlzLl9nZXRMYXN0TG9jYWxDaGVja3BvaW50KCksIHRoaXMuX2dldE5leHRMb2NhbFN5bmNOdW1iZXIoKSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBleGhhdXN0TWFwKHIgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBbY2hlY2twb2ludCwgc3luY051bWJlcl0gPSByIGFzIFtudW1iZXIsIG51bWJlcl07XG4gICAgICAgICAgICAgIGNvbnN0IGxvY2FsU3luY0RiID0gdGhpcy5fZ2V0TG9jYWxTeW5jRGIoKTtcbiAgICAgICAgICAgICAgY29uc3QgZ2V0czogT2JzZXJ2YWJsZTxMb2NhbFN5bmNFbnRyeT5bXSA9IFtdO1xuICAgICAgICAgICAgICBjb25zdCBmaXJzdElkID0gY2hlY2twb2ludCArIDE7XG4gICAgICAgICAgICAgIGNvbnN0IGxhc3RJZCA9IE1hdGgubWluKGZpcnN0SWQgKyB0aGlzLl9vcHRzLmNoYW5nZXNCYXRjaFNpemUhIC0gMSwgc3luY051bWJlciAtIDEpO1xuICAgICAgICAgICAgICBpZiAobGFzdElkIDw9IGNoZWNrcG9pbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoZmFsc2UpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgaGFzTmV4dCA9IGxhc3RJZCA8IHN5bmNOdW1iZXIgLSAxO1xuXG4gICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSBmaXJzdElkOyBpIDw9IGxhc3RJZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZ2V0cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBmcm9tKGxvY2FsU3luY0RiLmdldChgX2xvY2FsLyR7dGhpcy5fbG9jYWxTeW5jRW50cnlQcmVmaXh9JHtpfWApKSBhc1xuICAgICAgICAgICAgICAgICAgICBPYnNlcnZhYmxlPExvY2FsU3luY0VudHJ5Pik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHppcCguLi5nZXRzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgZXhoYXVzdE1hcChnZXRzUmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IGdldHNSZXMgYXMgTG9jYWxTeW5jRW50cnlbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYWxEb2NzRGIgPSB0aGlzLl9nZXRMb2NhbERvY3NEYigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0ge2tleXM6IGVudHJpZXMubWFwKGUgPT4gZS5kb2NfaWQpLCBpbmNsdWRlX2RvY3M6IHRydWV9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShsb2NhbERvY3NEYi5hbGxEb2NzKG9wdHMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKGxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRG9jcyA9IGxkIGFzIFBvdWNoREIuQ29yZS5BbGxEb2NzUmVzcG9uc2U8TG9jYWxEb2M8YW55Pj47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkb2NzID0gZW50cmllcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN5bmNFbnRyeSwgaSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHtzeW5jRW50cnksIGxvY2FsRG9jOiBsb2NhbERvY3Mucm93c1tpXS5kb2MhfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtoYXNOZXh0LCBkb2NzfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgZXhoYXVzdE1hcChcbiAgICAgICAgICAgICAgICAgICAgICByZXMgPT4gdGhpcy5fcHJvY2Vzc1Vwd2FyZENoYW5nZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyBhcyB7aGFzTmV4dDogYm9vbGVhbiwgZG9jczogVXB3YXJkQ2hhbmdlW119KSksXG4gICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBoYXNOZXh0ID0+IHtcbiAgICAgICAgICAgICAgaWYgKGhhc05leHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1Vwd2FyZFN5bmMoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0Rvd253YXJkU3luYygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZW1pdFN5bmNFcnJvcihlcnIpO1xuICAgICAgICAgICAgICB0aGlzLnN0YXJ0KGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tEb3dud2FyZFN5bmMoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2V0TGFzdFJlbW90ZUNoZWNrcG9pbnQoKVxuICAgICAgICAucGlwZShleGhhdXN0TWFwKHNpbmNlID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSBgc2luY2U9JHtzaW5jZX0mYmF0Y2hTaXplPSR7dGhpcy5fb3B0cy5jaGFuZ2VzQmF0Y2hTaXplfWA7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHBDbGllbnQuZ2V0PFN5bmNFbnRyeVtdPihgJHt0aGlzLl9zeW5jVXJsfT8ke3BhcmFtc31gKTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUoY2hhbmdlcyA9PiB7XG4gICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgdGhpcy5fcHJvY2Vzc0Rvd253YXJkQ2hhbmdlcyhjaGFuZ2VzIGFzIFN5bmNFbnRyeVtdKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMYXN0TG9jYWxDaGVja3BvaW50KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2dldExhc3RDaGVja3BvaW50KHRoaXMuX2xvY2FsQ2hlY2twb2ludEtleSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMYXN0UmVtb3RlQ2hlY2twb2ludCgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9nZXRMYXN0Q2hlY2twb2ludCh0aGlzLl9yZW1vdGVDaGVja3BvaW50S2V5KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExhc3RDaGVja3BvaW50KGNoZWNrcG9pbnRLZXk6IHN0cmluZyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgY29uc3QgZGIgPSB0aGlzLl9nZXRTeW5jQ2hlY2twb2ludERiKCk7XG4gICAgcmV0dXJuIGZyb20oZGIuZ2V0KGBfbG9jYWwvJHtjaGVja3BvaW50S2V5fWApKVxuICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgbWFwKGQgPT4gKGQgYXMgU3luY0NoZWNrcG9pbnQpLmNoZWNrcG9pbnQpLFxuICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoXyA9PiBvYnNPZigwKSksXG4gICAgICAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPG51bWJlcj47XG4gIH1cblxuICBwcml2YXRlIF9zZXRMYXN0TG9jYWxDaGVja3BvaW50KGNoZWNrcG9pbnQ6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NldExhc3RDaGVja3BvaW50KHRoaXMuX2xvY2FsQ2hlY2twb2ludEtleSwgY2hlY2twb2ludCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRMYXN0UmVtb3RlQ2hlY2twb2ludChjaGVja3BvaW50OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9zZXRMYXN0Q2hlY2twb2ludCh0aGlzLl9yZW1vdGVDaGVja3BvaW50S2V5LCBjaGVja3BvaW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldExhc3RDaGVja3BvaW50KGNoZWNrcG9pbnRLZXk6IHN0cmluZywgY2hlY2twb2ludDogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBjb25zdCBkYiA9IHRoaXMuX2dldFN5bmNDaGVja3BvaW50RGIoKTtcbiAgICBjb25zdCBkb2NLZXkgPSBgX2xvY2FsLyR7Y2hlY2twb2ludEtleX1gO1xuICAgIGNvbnN0IGRvYyA9IHtfaWQ6IGRvY0tleSwgY2hlY2twb2ludH0gYXMgU3luY0NoZWNrcG9pbnQ7XG4gICAgcmV0dXJuIGZyb20oZGIuZ2V0KGRvY0tleSkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcihfID0+IG9ic09mKHt9IGFzIFN5bmNDaGVja3BvaW50KSksXG4gICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgZXhoYXVzdE1hcChkID0+IGZyb20oZGIucHV0KHsuLi4oZCBhcyBTeW5jQ2hlY2twb2ludCksIC4uLmRvY30pKS5waXBlKHRha2UoMSkpKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoXyA9PiB0aHJvd0Vycm9yKCdjaGVja3BvaW50X3NldF9mYWlsZWQnKSksXG4gICAgICAgICAgICBtYXBUbyhjaGVja3BvaW50KSxcbiAgICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2Nlc3NVcHdhcmRDaGFuZ2VzKHA6IHtoYXNOZXh0OiBib29sZWFuLCBkb2NzOiBVcHdhcmRDaGFuZ2VbXX0pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gcC5kb2NzLm1hcChkb2MgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2VxdWVuY2U6IGRvYy5zeW5jRW50cnkuc2VxdWVuY2UsXG4gICAgICAgIHRhYmxlX25hbWU6IGRvYy5zeW5jRW50cnkudGFibGVfbmFtZSxcbiAgICAgICAgb2JqZWN0X2lkOiBkb2MubG9jYWxEb2Mub2JqZWN0LmlkLFxuICAgICAgICBlbnRyeV90eXBlOiBkb2Muc3luY0VudHJ5LmVudHJ5X3R5cGUsXG4gICAgICAgIG9iamVjdDogZG9jLmxvY2FsRG9jLm9iamVjdFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLl9lbWl0U3luY1N5bmNpbmcoKTtcbiAgICByZXR1cm4gdGhpcy5faHR0cENsaWVudC5wb3N0PFVwd2FyZENoYW5nZVJlc3VsdFtdPih0aGlzLl9zeW5jVXJsLCBwYXlsb2FkKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChyZXMgPT4gKHtyZXMsIHNlcTogbnVsbH0pKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXMgIT09IDQwOSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcC5oYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc29sdmVVcHdhcmRDb25mbGljdChwLmRvY3MsIGVyci5lcnJvcilcbiAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgIG1hcChzZXEgPT4gKHtyZXM6IGVyci5lcnJvciBhcyBVcHdhcmRDaGFuZ2VSZXN1bHRbXSwgc2VxfSkpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZXhoYXVzdE1hcChyID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qge3Jlcywgc2VxfSA9IHIgYXMge3JlczogVXB3YXJkQ2hhbmdlUmVzdWx0W10sIHNlcTogbnVtYmVyfTtcbiAgICAgICAgICAgICAgY29uc3QgY29uZmxpY3RFcnJvciA9IHJlcy5maW5kSW5kZXgoZSA9PiBlLmVycm9yID09PSAnY29uZmxpY3QnKTtcbiAgICAgICAgICAgICAgY29uc3QgbGFzdFZhbGlkSWR4ID0gY29uZmxpY3RFcnJvciAtIDE7XG4gICAgICAgICAgICAgIGNvbnN0IGxvY2FsRG9jc0RiID0gdGhpcy5fZ2V0TG9jYWxEb2NzRGIoKTtcbiAgICAgICAgICAgICAgY29uc3QgZG9jc1RvRGVsID0gcC5kb2NzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgIChkLCBpZHgpID0+IGQuc3luY0VudHJ5LmVudHJ5X3R5cGUgPT09ICdpbnNlcnQnICYmIGlkeCA8PSBsYXN0VmFsaWRJZHgpO1xuICAgICAgICAgICAgICBjb25zdCBzZXF1ZW5jZSA9IHNlcSAhPSBudWxsID8gc2VxIDogcmVzW3Jlcy5sZW5ndGggLSAxXS5zZXF1ZW5jZTtcbiAgICAgICAgICAgICAgaWYgKGRvY3NUb0RlbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2Yoc2VxdWVuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmcm9tKGxvY2FsRG9jc0RiLmFsbERvY3Moe1xuICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBkb2NzVG9EZWwubWFwKGQgPT4gZC5zeW5jRW50cnkuZG9jX2lkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZV9kb2NzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgIGV4aGF1c3RNYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbShsb2NhbERvY3NEYi5idWxrRG9jcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgUG91Y2hEQi5Db3JlLkFsbERvY3NSZXNwb25zZTxMb2NhbERvYzxhbnk+PilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucm93cy5tYXAocm93ID0+ICh7Li4ucm93LmRvYywgX2RlbGV0ZWQ6IHRydWV9IGFzIGFueSkpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgICAgICAgbWFwKF8gPT4gc2VxdWVuY2UpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZXhoYXVzdE1hcChcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZSA9PiBzZXF1ZW5jZSBhcyBudW1iZXIgPj0gMCA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldExhc3RMb2NhbENoZWNrcG9pbnQoc2VxdWVuY2UgYXMgbnVtYmVyKSA6XG4gICAgICAgICAgICAgICAgICAgIG9ic09mKG51bGwpKSxcbiAgICAgICAgICAgIG1hcChfID0+IHAuaGFzTmV4dCksXG4gICAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNvbHZlVXB3YXJkQ29uZmxpY3QoZG9jczogVXB3YXJkQ2hhbmdlW10sIHJlc3VsdDogVXB3YXJkQ2hhbmdlUmVzdWx0W10pOlxuICAgICAgT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBjb25zdCBjb25mbGljdElkeCA9IHJlc3VsdC5maW5kSW5kZXgociA9PiByLm9rID09PSBmYWxzZSAmJiByLmVycm9yID09PSAnY29uZmxpY3QnKSE7XG4gICAgY29uc3QgY29uZmxpY3QgPSByZXN1bHRbY29uZmxpY3RJZHhdO1xuICAgIGNvbnN0IGNvbmZsaWN0RG9jID0gZG9jcy5maW5kKGQgPT4gZC5zeW5jRW50cnkuc2VxdWVuY2UgPT09IGNvbmZsaWN0LnNlcXVlbmNlKSE7XG4gICAgY29uc3QgY2hlY2twb2ludCA9IGNvbmZsaWN0SWR4ID49IDAgPyByZXN1bHRbY29uZmxpY3RJZHhdLnNlcXVlbmNlIC0gMSA6IC0xO1xuICAgIGNvbnN0IGxvY2FsRG9jc0RiID0gdGhpcy5fZ2V0TG9jYWxEb2NzRGIoKTtcbiAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2VJc0luaXQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKF8gPT4gdGhpcy5fcmVsYXRpb25hbE1vZGVsSWR4T2JzKCkpLFxuICAgICAgICBleGhhdXN0TWFwKGlkeCA9PiB7XG4gICAgICAgICAgY29uc3QgZmluZFJlcSA9IHRoaXMuX21vZGVsTGlzdEZpbmRSZXF1ZXN0KFxuICAgICAgICAgICAgICBjb25mbGljdERvYy5zeW5jRW50cnkudGFibGVfbmFtZSwge30sXG4gICAgICAgICAgICAgIGlkeCBhcyBQb3VjaERCLkZpbmQuQ3JlYXRlSW5kZXhSZXNwb25zZTxMb2NhbERvYzxhbnk+Pik7XG4gICAgICAgICAgZmluZFJlcS5zZWxlY3Rvclsnb2JqZWN0X2lkJ10gPSB7JGd0ZTogY29uZmxpY3REb2Muc3luY0VudHJ5Lm9iamVjdF9pZH07XG4gICAgICAgICAgcmV0dXJuIGZyb20obG9jYWxEb2NzRGIuZmluZChmaW5kUmVxKSkucGlwZSh0YWtlKDEpKTtcbiAgICAgICAgfSksXG4gICAgICAgIGV4aGF1c3RNYXAocmVzID0+IHtcbiAgICAgICAgICBjb25zdCB1cGREb2NzID0gKHJlcyBhcyBQb3VjaERCLkZpbmQuRmluZFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KS5kb2NzLm1hcCgoZG9jLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGRvYy5vYmplY3RfaWQgPSBkb2Mub2JqZWN0LmlkID0gY29uZmxpY3QuZXh0cmEubmV4dF9pZCArIGlkeDtcbiAgICAgICAgICAgIHJldHVybiBkb2M7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGZyb20obG9jYWxEb2NzRGIuYnVsa0RvY3ModXBkRG9jcykpLnBpcGUodGFrZSgxKSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoXyA9PiBjaGVja3BvaW50KSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvY2Vzc0Rvd253YXJkQ2hhbmdlcyhzeW5jRW50cmllczogU3luY0VudHJ5W10pOiB2b2lkIHtcbiAgICBpZiAoc3luY0VudHJpZXMgPT0gbnVsbCB8fCBzeW5jRW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2VtaXRTeW5jUGF1c2VkKCk7XG4gICAgICB0aGlzLnN0YXJ0KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY2hhbmdlcyA9IHN5bmNFbnRyaWVzLm1hcChzID0+IHMuaWQpO1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2NoYW5nZXNVcmw7XG4gICAgdGhpcy5faHR0cENsaWVudC5wb3N0PFN5bmNFbnRyeVtdPih1cmwsIHtjaGFuZ2VzfSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZW1pdFN5bmNFcnJvcignbmV0d29ya19lcnJvcicpO1xuICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoW10pIGFzIE9ic2VydmFibGU8U3luY0VudHJ5W10+O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAociA9PiByIGFzIFN5bmNFbnRyeVtdKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChkb2NzID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZyb20oY2hhbmdlcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlID0+ICh7Y2hhbmdlLCBkb2M6IChkb2NzIHx8IFtdKS5maW5kKGQgPT4gZC5pZCA9PT0gY2hhbmdlKX0pKSkgYXNcbiAgICAgICAgICAgICAgICAgIE9ic2VydmFibGU8e2NoYW5nZTogbnVtYmVyLCBkb2M6IFN5bmNFbnRyeX0+O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5fZW1pdFN5bmNTeW5jaW5nKCkpLFxuICAgICAgICAgICAgbWFwKHIgPT4gciBhcyB7Y2hhbmdlOiBudW1iZXIsIGRvYzogU3luY0VudHJ5fSksXG4gICAgICAgICAgICBjb25jYXRNYXAoKHtjaGFuZ2UsIGRvY30pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3luY0VudHJ5ID0gc3luY0VudHJpZXMuZmluZChzID0+IHMuaWQgPT09IGNoYW5nZSk7XG4gICAgICAgICAgICAgIGlmIChzeW5jRW50cnkgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGBtaXNzaW5nX2NoYW5nZV8ke2NoYW5nZX1gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoc3luY0VudHJ5LmVudHJ5X3R5cGUgPT09ICdkZWxldGUnICYmIGRvYyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NEb3dud2FyZENoYW5nZShzeW5jRW50cnkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICBkb2MgPT0gbnVsbCA/IHRocm93RXJyb3IoYG1pc3NpbmdfY2hhbmdlXyR7Y2hhbmdlfWApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0Rvd253YXJkQ2hhbmdlKGRvYykpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoY2hhbmdlID0+IGNoYW5nZSBhcyBTeW5jRW50cnkpLFxuICAgICAgICAgICAgY29uY2F0TWFwKChjaGFuZ2U6IFN5bmNFbnRyeSkgPT4gdGhpcy5fc2V0TGFzdFJlbW90ZUNoZWNrcG9pbnQoY2hhbmdlLmlkKSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBfID0+IHt9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9lbWl0U3luY0Vycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgdGhpcy5zdGFydChmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBoYXNNb3JlID0gY2hhbmdlcy5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICBpZiAoIWhhc01vcmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0U3luY1BhdXNlZCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuc3RhcnQoaGFzTW9yZSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2VtaXRTeW5jRXJyb3IoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXR1cy5uZXh0KHtzdGF0dXM6ICdlcnJvcicsIGVycm9yfSk7XG4gIH1cblxuICBwcml2YXRlIF9lbWl0U3luY1BhdXNlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0dXMubmV4dCh7c3RhdHVzOiAncGF1c2VkJ30pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZW1pdFN5bmNTeW5jaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXR1cy5uZXh0KHtzdGF0dXM6ICdzeW5jaW5nJ30pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvY2Vzc0Rvd253YXJkQ2hhbmdlKGNoYW5nZTogU3luY0VudHJ5KTogT2JzZXJ2YWJsZTxTeW5jRW50cnk+IHtcbiAgICBpZiAoY2hhbmdlLmVudHJ5X3R5cGUgIT09ICdpbnNlcnQnICYmIGNoYW5nZS5lbnRyeV90eXBlICE9PSAndXBkYXRlJyAmJlxuICAgICAgICBjaGFuZ2UuZW50cnlfdHlwZSAhPT0gJ2RlbGV0ZScpIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdpbnZhbGlkX2VudHJ5X3R5cGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBiYXNlUmVxID1cbiAgICAgICAgdGhpcy5fcmVsYXRpb25hbE1vZGVsSWR4T2JzKCkucGlwZShcbiAgICAgICAgICAgIGV4aGF1c3RNYXAoXG4gICAgICAgICAgICAgICAgaWR4ID0+IGZyb20odGhpcy5fZGF0YWJhc2UuZmluZCh0aGlzLl9zeW5jRW50cnlGaW5kUmVxdWVzdChjaGFuZ2UsIGlkeCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSkpLFxuICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPFBvdWNoREIuRmluZC5GaW5kUmVzcG9uc2U8RGF0YWJhc2VDb250ZW50Pj47XG5cbiAgICBpZiAoY2hhbmdlLmVudHJ5X3R5cGUgPT09ICdpbnNlcnQnKSB7XG4gICAgICByZXR1cm4gYmFzZVJlcS5waXBlKFxuICAgICAgICAgIGV4aGF1c3RNYXAobG9jYWxEb2NzID0+IHtcbiAgICAgICAgICAgIGlmIChsb2NhbERvY3MuZG9jcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoJ2V4aXN0aW5nX2RvYycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZyb20odGhpcy5fZGF0YWJhc2UucG9zdCh0aGlzLl9zeW5jRW50cnlUb0xvY2FsRG9jKGNoYW5nZSkpKS5waXBlKHRha2UoMSkpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1hcFRvKGNoYW5nZSksXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlUmVxLnBpcGUoXG4gICAgICAgICAgICAgICBleGhhdXN0TWFwKGxvY2FsRG9jcyA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChsb2NhbERvY3MuZG9jcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcigndW5leGlzdGluZ19kb2MnKTtcbiAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRG9jID0gbG9jYWxEb2NzLmRvY3NbMF07XG4gICAgICAgICAgICAgICAgIGNvbnN0IG9wID0gZnJvbShcbiAgICAgICAgICAgICAgICAgICAgIGNoYW5nZS5lbnRyeV90eXBlID09PSAndXBkYXRlJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YWJhc2UucHV0KHsuLi5sb2NhbERvYywgb2JqZWN0OiBjaGFuZ2Uub2JqZWN0fSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlLnJlbW92ZShsb2NhbERvYykpO1xuICAgICAgICAgICAgICAgICByZXR1cm4gb3AucGlwZShcbiAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICBtYXBUbyhjaGFuZ2UpLFxuICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICApIGFzIE9ic2VydmFibGU8U3luY0VudHJ5PjtcbiAgfVxuXG4gIHByaXZhdGUgX21vZGVsR2V0RmluZFJlcXVlc3QoXG4gICAgICB0YWJsZU5hbWU6IHN0cmluZywgcGFyYW1zOiBNb2RlbEdldFBhcmFtcyxcbiAgICAgIGluZGV4PzogUG91Y2hEQi5GaW5kLkNyZWF0ZUluZGV4UmVzcG9uc2U8TG9jYWxEb2M8YW55Pj4pOlxuICAgICAgUG91Y2hEQi5GaW5kLkZpbmRSZXF1ZXN0PExvY2FsRG9jPGFueT4+IHtcbiAgICBjb25zdCByZXE6IFBvdWNoREIuRmluZC5GaW5kUmVxdWVzdDxMb2NhbERvYzxhbnk+PiA9IHtcbiAgICAgIHNlbGVjdG9yOiB7dGFibGVfbmFtZTogdGFibGVOYW1lLCBvYmplY3RfaWQ6IHBhcmFtcy5pZH1cbiAgICB9O1xuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBpZHhQYXJ0cyA9ICgoaW5kZXggYXMgYW55KS5pZCB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIGlmIChpZHhQYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmVxLnVzZV9pbmRleCA9IGlkeFBhcnRzWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVxO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW9kZWxCdWxrSWRzRmluZFJlcXVlc3QoXG4gICAgICB0YWJsZU5hbWU6IHN0cmluZyxcbiAgICAgIGlkczogbnVtYmVyW10sXG4gICAgICBpbmRleD86IFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+LFxuICAgICAgKTogUG91Y2hEQi5GaW5kLkZpbmRSZXF1ZXN0PExvY2FsRG9jPGFueT4+IHtcbiAgICBjb25zdCByZXEgPSB7c2VsZWN0b3I6IHt0YWJsZV9uYW1lOiB0YWJsZU5hbWUsIG9iamVjdF9pZDogeyRpbjogaWRzfX19IGFzXG4gICAgICAgIFBvdWNoREIuRmluZC5GaW5kUmVxdWVzdDxMb2NhbERvYzxhbnk+PjtcbiAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgY29uc3QgaWR4UGFydHMgPSAoKGluZGV4IGFzIGFueSkuaWQgfHwgJycpLnNwbGl0KCcvJyk7XG4gICAgICBpZiAoaWR4UGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJlcS51c2VfaW5kZXggPSBpZHhQYXJ0c1sxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcTtcbiAgfVxuXG4gIHByaXZhdGUgX21vZGVsUXVlcnlGaW5kUmVxdWVzdChcbiAgICAgIHRhYmxlTmFtZTogc3RyaW5nLCBwYXJhbXM6IE1vZGVsUXVlcnlQYXJhbXMsXG4gICAgICBpbmRleD86IFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KTpcbiAgICAgIFBvdWNoREIuRmluZC5GaW5kUmVxdWVzdDxMb2NhbERvYzxhbnk+PiB7XG4gICAgY29uc3QgcmVxOiBQb3VjaERCLkZpbmQuRmluZFJlcXVlc3Q8TG9jYWxEb2M8YW55Pj4gPVxuICAgICAgICB0aGlzLl9tb2RlbExpc3RGaW5kUmVxdWVzdCh0YWJsZU5hbWUsIHBhcmFtcyk7XG4gICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGlkeFBhcnRzID0gKChpbmRleCBhcyBhbnkpLmlkIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgaWYgKGlkeFBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICByZXEudXNlX2luZGV4ID0gaWR4UGFydHNbMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7Li4ucmVxLCBzZWxlY3Rvcjogey4uLnJlcS5zZWxlY3RvciwgLi4udGhpcy5fbm9ybWFsaXplU2VsZWN0b3IocGFyYW1zLnNlbGVjdG9yKX19O1xuICB9XG5cbiAgcHJpdmF0ZSBfbW9kZWxMaXN0RmluZFJlcXVlc3QoXG4gICAgICB0YWJsZU5hbWU6IHN0cmluZywgcGFyYW1zOiBNb2RlbExpc3RQYXJhbXMsXG4gICAgICBpbmRleD86IFBvdWNoREIuRmluZC5DcmVhdGVJbmRleFJlc3BvbnNlPExvY2FsRG9jPGFueT4+KTpcbiAgICAgIFBvdWNoREIuRmluZC5GaW5kUmVxdWVzdDxMb2NhbERvYzxhbnk+PiB7XG4gICAgY29uc3QgcmVxOiBQb3VjaERCLkZpbmQuRmluZFJlcXVlc3Q8TG9jYWxEb2M8YW55Pj4gPSB7c2VsZWN0b3I6IHt0YWJsZV9uYW1lOiB0YWJsZU5hbWV9fTtcbiAgICBpZiAocGFyYW1zLnNvcnQgIT0gbnVsbCkge1xuICAgICAgY29uc3Qge2RpciwgZmllbGRzfSA9IHRoaXMuX25vcm1hbGl6ZVNvcnRQYXJhbShwYXJhbXMuc29ydCk7XG4gICAgICByZXEuc29ydCA9IFt7dGFibGVfbmFtZTogZGlyfSwgLi4uZmllbGRzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLnNvcnQgPSBbJ3RhYmxlX25hbWUnLCAnb2JqZWN0X2lkJ107XG4gICAgfVxuICAgIGlmIChwYXJhbXMuc3RhcnQgIT0gbnVsbCkge1xuICAgICAgcmVxLnNraXAgPSBwYXJhbXMuc3RhcnQ7XG4gICAgfVxuICAgIGlmIChwYXJhbXMubGltaXQgIT0gbnVsbCAmJiBwYXJhbXMubGltaXQgPj0gMCkge1xuICAgICAgcmVxLmxpbWl0ID0gcGFyYW1zLmxpbWl0O1xuICAgIH1cbiAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgY29uc3QgaWR4UGFydHMgPSAoKGluZGV4IGFzIGFueSkuaWQgfHwgJycpLnNwbGl0KCcvJyk7XG4gICAgICBpZiAoaWR4UGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJlcS51c2VfaW5kZXggPSBpZHhQYXJ0c1sxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcTtcbiAgfVxuXG4gIHByaXZhdGUgX25vcm1hbGl6ZVNlbGVjdG9yKHNlbGVjdG9yOiBQb3VjaERCLkZpbmQuU2VsZWN0b3IpOiBQb3VjaERCLkZpbmQuU2VsZWN0b3Ige1xuICAgIGNvbnN0IG5vcm1TZWxlY3RvcjogUG91Y2hEQi5GaW5kLlNlbGVjdG9yID0ge307XG4gICAgT2JqZWN0LmtleXMoc2VsZWN0b3IpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG5vcm1TZWxlY3Rvcltgb2JqZWN0LiR7a2V5fWBdID0gc2VsZWN0b3Jba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9ybVNlbGVjdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9ybWFsaXplU29ydFBhcmFtKHNvcnRQYXJhbToge1twcm9wOiBzdHJpbmddOiAnYXNjJ3wnZGVzYyd9KTpcbiAgICAgIHtkaXI6ICdhc2MnfCdkZXNjJywgZmllbGRzOiBNb2RlbFNvcnRbXX0ge1xuICAgIGxldCBkaXI6ICdhc2MnfCdkZXNjJyA9ICdhc2MnO1xuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5rZXlzKHNvcnRQYXJhbSkubWFwKChrZXksIGkpID0+IHtcbiAgICAgIGNvbnN0IHNvcnQ6IGFueSA9IHt9O1xuICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICBkaXIgPSBzb3J0UGFyYW1ba2V5XTtcbiAgICAgIH1cbiAgICAgIHNvcnRba2V5ICE9PSAnb2JqZWN0X2lkJyA/IGBvYmplY3QuJHtrZXl9YCA6IGtleV0gPSBkaXI7XG4gICAgICByZXR1cm4gc29ydDtcbiAgICB9KTtcbiAgICByZXR1cm4ge2RpciwgZmllbGRzfTtcbiAgfVxuXG4gIHByaXZhdGUgX3N5bmNFbnRyeUZpbmRSZXF1ZXN0KFxuICAgICAgZW50cnk6IFN5bmNFbnRyeSwgaW5kZXg/OiBQb3VjaERCLkZpbmQuQ3JlYXRlSW5kZXhSZXNwb25zZTxMb2NhbERvYzxhbnk+Pik6XG4gICAgICBQb3VjaERCLkZpbmQuRmluZFJlcXVlc3Q8TG9jYWxEb2M8YW55Pj4ge1xuICAgIGNvbnN0IHJlcSA9IHtzZWxlY3RvcjogdGhpcy5fc3luY0VudHJ5RmluZFNlbGVjdG9yKGVudHJ5KX0gYXNcbiAgICAgICAgUG91Y2hEQi5GaW5kLkZpbmRSZXF1ZXN0PExvY2FsRG9jPGFueT4+O1xuICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBpZHhQYXJ0cyA9ICgoaW5kZXggYXMgYW55KS5pZCB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIGlmIChpZHhQYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmVxLnVzZV9pbmRleCA9IGlkeFBhcnRzWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3luY0VudHJ5RmluZFNlbGVjdG9yKGVudHJ5OiBTeW5jRW50cnkpOiBQb3VjaERCLkZpbmQuU2VsZWN0b3Ige1xuICAgIHJldHVybiB7XG4gICAgICB0YWJsZV9uYW1lOiBlbnRyeS50YWJsZV9uYW1lLFxuICAgICAgb2JqZWN0X2lkOiBlbnRyeS5vYmplY3RfaWQsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRMb2NhbERhdGFiYXNlKCk6IHZvaWQge1xuICAgIHBvdWNoREJTdGF0aWMucGx1Z2luKHBvdWNoREJGaW5kUGx1Z2luKTtcbiAgICBjb25zdCBwbHVnaW5zID0gdGhpcy5fb3B0cy5wbHVnaW5zIHx8IFtdO1xuICAgIHBsdWdpbnMuZm9yRWFjaChwbHVnaW4gPT4gcG91Y2hEQlN0YXRpYy5wbHVnaW4ocGx1Z2luKSk7XG4gICAgdGhpcy5fZGF0YWJhc2UgPSBuZXcgcG91Y2hEQlN0YXRpYyh0aGlzLl9vcHRzLmxvY2FsRGF0YWJhc2VOYW1lLCB7XG4gICAgICByZXZzX2xpbWl0OiAxLFxuICAgICAgYWRhcHRlcjogdGhpcy5fb3B0cy5hZGFwdGVyLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fZGF0YWJhc2UuY3JlYXRlSW5kZXgodGhpcy5fcmVsYXRpb25hbE1vZGVsSWR4KVxuICAgICAgICAudGhlbihfID0+IHtcbiAgICAgICAgICB0aGlzLl9lbWl0U3luY1BhdXNlZCgpO1xuICAgICAgICAgIHRoaXMuX2RhdGFiYXNlSW5pdC5uZXh0KHRydWUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goXyA9PiB0aGlzLl9lbWl0U3luY0Vycm9yKCdpbmRleGluZ19mYWlsZWQnKSk7XG4gIH1cblxuICBwcml2YXRlIF9zeW5jRW50cnlUb0xvY2FsRG9jKGVudHJ5OiBTeW5jRW50cnkpOiBMb2NhbERvYzxhbnk+IHtcbiAgICByZXR1cm4ge29iamVjdF9pZDogZW50cnkub2JqZWN0X2lkLCB0YWJsZV9uYW1lOiBlbnRyeS50YWJsZV9uYW1lLCBvYmplY3Q6IGVudHJ5Lm9iamVjdH07XG4gIH1cbn1cbiJdfQ==