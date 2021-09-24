import { HttpClient, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, Injectable, Inject, NgModule } from '@angular/core';
import { BehaviorSubject, Subscription, timer, from, zip, of, throwError } from 'rxjs';
import { filter, delayWhen, exhaustMap, take, map, switchMap, catchError, concatMap, toArray, mapTo, tap } from 'rxjs/operators';
import * as PouchDB from 'pouchdb';
import * as PouchDBFind from 'pouchdb-find';

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
const SYNC_REGISTERED_MODELS = [];

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
const SYNC_OPTIONS = new InjectionToken('SYNC_OPTIONS');

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
    if (SYNC_REGISTERED_MODELS.find(r => r.tableName === tableName) == null) {
        const registeredModel = { tableName, endpoint };
        SYNC_REGISTERED_MODELS.push(registeredModel);
        console.log(`Registered sync model ${tableName} with endpoint ${endpoint}`);
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
const pouchDBStatic = PouchDB.default || PouchDB;
const pouchDBFindPlugin = PouchDBFind.default || PouchDBFind;
class SyncService {
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
                return of(obj);
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
            return of(res.docs.map(d => this._subObject(d.object, params.fields)));
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
            return of(res.docs.map(d => this._subObject(d.object, params.fields)));
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
            .pipe(take(1), catchError(_ => of({ _id: id, number: 0 })), exhaustMap(doc => from(db.post(Object.assign(Object.assign({}, doc), { number: syncNumber })))
            .pipe(take(1))), map(_ => syncNumber));
    }
    _getNextLocalSyncNumber() {
        const db = this._getLocalSyncNumberDb();
        return from(db.get(`_local/${this._localSyncNumber}`))
            .pipe(take(1), map(doc => doc.number + 1), catchError(_ => of(1)));
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
                return of(false);
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
            .pipe(map(d => d.checkpoint), catchError(_ => of(0)));
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
            .pipe(catchError(_ => of({})), take(1), exhaustMap(d => from(db.put(Object.assign(Object.assign({}, d), doc))).pipe(take(1))), catchError(_ => throwError('checkpoint_set_failed')), mapTo(checkpoint));
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
                return of(sequence);
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
            of(null)), map(_ => p.hasNext));
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
            return of([]);
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
class OfflineInterceptor {
    constructor(_syncService) {
        this._syncService = _syncService;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((e) => {
            if (e.status === 0) {
                const models = this._checkOfflineRequest(req);
                if (models.length > 0) {
                    return this._doOfflineRequest(req, models[0], e);
                }
            }
            return throwError(e);
        }));
    }
    _doOfflineRequest(req, model, reqError) {
        const method = req.method.toLowerCase();
        const { exactMatch, relativeUrl } = this._analyzeRequestUrl(req, model);
        if (exactMatch) {
            if (method === 'get') {
                const limit = req.params.get('limit');
                const start = req.params.get('start');
                const sort = req.params.get('sort');
                const fields = req.params.get('fields');
                const joins = req.params.get('joins');
                return this._syncService.list(model.tableName, { limit, start, sort, fields, joins })
                    .pipe(catchError(_ => throwError(reqError)), map(res => new HttpResponse({ status: 200, statusText: 'OK', url: req.url, body: res })));
            }
            else if (method === 'post') {
                const obj = req.body;
                return this._syncService.create(model.tableName, obj)
                    .pipe(catchError(_ => throwError(reqError)), map(res => new HttpResponse({ status: 201, statusText: 'OK', url: req.url, body: res })));
            }
        }
        else {
            if (relativeUrl.length === 1) {
                const lastUrlPart = relativeUrl[0];
                if (lastUrlPart === 'delete_all') {
                    const ids = req.body.ids;
                    if (ids != null && ids instanceof Array && ids.length > 0) {
                        return this._syncService.deleteAll(model.tableName, ids)
                            .pipe(catchError(_ => throwError(reqError)), map(res => new HttpResponse({ status: 200, statusText: 'OK', url: req.url, body: res })));
                    }
                }
                else if (lastUrlPart === 'query') {
                    const params = req.body;
                    return this._syncService.query(model.tableName, params)
                        .pipe(catchError(_ => throwError(reqError)), map(res => new HttpResponse({ status: 200, statusText: 'OK', url: req.url, body: res })));
                }
                else {
                    const id = parseInt(lastUrlPart, 10);
                    if (!isNaN(id) && id > 0) {
                        let op = null;
                        let successStatus = 200;
                        const obj = req.body;
                        if (method === 'get') {
                            op = this._syncService.get(model.tableName, { id });
                            successStatus = 201;
                        }
                        else if (method === 'patch' || method === 'put') {
                            op = this._syncService.update(model.tableName, id, obj);
                        }
                        else if (method === 'delete') {
                            op = this._syncService.delete(model.tableName, id);
                        }
                        if (op != null) {
                            return op.pipe(catchError(_ => throwError(reqError)), map(res => new HttpResponse({ status: successStatus, statusText: 'OK', url: req.url, body: res })));
                        }
                    }
                }
            }
        }
        return throwError(reqError);
    }
    _analyzeRequestUrl(req, model) {
        const exactMatch = new RegExp('^' + model.endpoint + '$').test(req.url);
        if (exactMatch) {
            return { exactMatch, relativeUrl: [] };
        }
        const baseUrlParts = model.endpoint.split(/\/+/);
        const reqUrlParts = req.url.split(/\/+/);
        return { exactMatch, relativeUrl: reqUrlParts.slice(baseUrlParts.length) };
    }
    _checkOfflineRequest(req) {
        const urlParts = req.url.split('?');
        const urlPaths = urlParts[0].split('/');
        const urlPathsLen = urlPaths.length;
        let lastUrlPathIdx = urlPathsLen - 1;
        if (urlPaths[lastUrlPathIdx] === '') {
            lastUrlPathIdx -= 1;
        }
        const lastUrlPath = urlPaths[lastUrlPathIdx];
        const intVal = parseInt(lastUrlPath, 10);
        if (lastUrlPath === 'query' || (!isNaN(intVal) && `${intVal}` === lastUrlPath)) {
            urlPaths.splice(lastUrlPathIdx, 1);
        }
        const url = urlPaths.join('/');
        return SYNC_REGISTERED_MODELS.filter(m => m.endpoint === url);
    }
}
OfflineInterceptor.decorators = [
    { type: Injectable }
];
OfflineInterceptor.ctorParameters = () => [
    { type: SyncService }
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
class SyncModule {
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
    { type: NgModule, args: [{},] }
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

/**
 * Generated bundle index. Do not edit.
 */

export { OfflineInterceptor, SYNC_OPTIONS, SyncModule, SyncService };
//# sourceMappingURL=sync.js.map
