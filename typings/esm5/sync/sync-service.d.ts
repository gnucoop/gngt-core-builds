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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelGetParams, ModelListParams } from '@gngt/core/common';
import { RegisteredModel } from './registered-model';
import { SyncOptions } from './sync-options';
import { SyncStatus } from './sync-status';
export declare class SyncService {
    private _opts;
    private _httpClient;
    private _status;
    readonly status: Observable<SyncStatus>;
    readonly registeredModels: RegisteredModel[];
    private _modelRegister;
    readonly modelRegister: Observable<RegisteredModel>;
    private _timerSub;
    private _syncing;
    private _database;
    private readonly _remoteCheckpointKey;
    private readonly _localCheckpointKey;
    private readonly _localSyncNumber;
    private readonly _localSyncEntryPrefix;
    private readonly _syncUrl;
    private readonly _changesUrl;
    private readonly _relationalModelIdx;
    private readonly _databaseInit;
    private readonly _databaseIsInit;
    constructor(_opts: SyncOptions, _httpClient: HttpClient);
    registerModel(endpoint: string, tableName: string): void;
    start(immediate?: boolean): void;
    stop(): void;
    get(tableName: string, params: ModelGetParams): Observable<any>;
    list(tableName: string, params: ModelListParams): Observable<any[]>;
    create(tableName: string, object: any): Observable<number>;
    update(tableName: string, id: number, object: any): Observable<number>;
    delete(tableName: string, id: number): Observable<number>;
    private _getLocalDocsDb;
    private _getLocalSyncDb;
    private _getLocalSyncNumberDb;
    private _getSyncCheckpointDb;
    private _createLocalSyncEntry;
    private _setLocalSyncNumber;
    private _getNextLocalSyncNumber;
    private _nextObjectId;
    private _relationalModelIdxObs;
    private _generateIndexName;
    private _subObject;
    private _checkSync;
    private _checkUpwardSync;
    private _checkDownwardSync;
    private _getLastLocalCheckpoint;
    private _getLastRemoteCheckpoint;
    private _getLastCheckpoint;
    private _setLastLocalCheckpoint;
    private _setLastRemoteCheckpoint;
    private _setLastCheckpoint;
    private _processUpwardChanges;
    private _resolveUpwardConflict;
    private _processDownwardChanges;
    private _emitSyncError;
    private _emitSyncPaused;
    private _emitSyncSyncing;
    private _processDownwardChange;
    private _modelGetFindRequest;
    private _modelListFindRequest;
    private _normalizeSortParam;
    private _syncEntryFindRequest;
    private _syncEntryFindSelector;
    private _initLocalDatabase;
    private _syncEntryToLocalDoc;
}
