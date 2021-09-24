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
import { ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { Model } from '@gngt/core/common';
import { ModelActionTypes, ModelService, State as ModelState } from '@gngt/core/model';
import { Observable } from 'rxjs';
import { AdminUserInteractionsService } from './admin-user-interactions';
import { AdminListHeader } from './list-header';
export declare abstract class AdminListComponent<T extends Model = Model, S extends ModelState<T> = ModelState<T>, A extends ModelActionTypes = ModelActionTypes, MS extends ModelService<T, S, A> = ModelService<T, S, A>> implements OnDestroy {
    protected _cdr: ChangeDetectorRef;
    private _aui;
    get title(): string;
    set title(title: string);
    private _title;
    get headers(): AdminListHeader[];
    set headers(headers: AdminListHeader[]);
    private _headers;
    get displayedColumns(): string[];
    set displayedColumns(displayedColumns: string[]);
    private _displayedColumns;
    get baseEditUrl(): string;
    set baseEditUrl(baseEditUrl: string);
    private _baseEditUrl;
    get newItemPath(): string;
    set newItemPath(newItemPath: string);
    private _newItemPath;
    protected _service: MS;
    set service(service: MS);
    protected _actionProcessed: EventEmitter<string>;
    readonly actionProcessed: Observable<string>;
    private _deletionEvt;
    private _deletionSub;
    constructor(_cdr: ChangeDetectorRef, _aui: AdminUserInteractionsService);
    abstract getSelection(): T[];
    abstract getItems(): T[];
    abstract clearSelection(): void;
    abstract selectAll(): void;
    abstract refreshList(): void;
    isAllSelected(): boolean;
    masterToggle(): void;
    ngOnDestroy(): void;
    processAction(action: string): void;
    processDeleteAction(selected: T[]): void;
    protected _getService(): MS;
    private _getActionHandler;
    private _initService;
}
