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
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelActions, ModelService, reducers as fromModel } from '@gngt/core/model';
import { AdminUserInteractionsService } from './admin-user-interactions';
import { AdminListHeader } from './list-header';
export declare abstract class AdminListComponent<T extends Model, S extends fromModel.State<T>, A1 extends ModelActions.ModelGetAction, A2 extends ModelActions.ModelListAction, A3 extends ModelActions.ModelCreateAction<T>, A4 extends ModelActions.ModelUpdateAction<T>, A5 extends ModelActions.ModelPatchAction<T>, A6 extends ModelActions.ModelDeleteAction<T>, A7 extends ModelActions.ModelDeleteAllAction<T>, A8 extends ModelActions.ModelQueryAction, MS extends ModelService<T, S, A1, A2, A3, A4, A5, A6, A7, A8>> implements OnDestroy {
    protected _cdr: ChangeDetectorRef;
    private _aui;
    title: string;
    private _title;
    headers: AdminListHeader[];
    private _headers;
    displayedColumns: string[];
    private _displayedColumns;
    baseEditUrl: string;
    private _baseEditUrl;
    newItemPath: string;
    private _newItemPath;
    private _service;
    service: MS;
    private _actionProcessed;
    readonly actionProcessed: Observable<string>;
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
