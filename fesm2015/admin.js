import { Pipe, ChangeDetectorRef, NgModule, EventEmitter, Directive, Input, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import '@gngt/core/model';
import { BehaviorSubject, Subscription, combineLatest, of, Observable } from 'rxjs';
import { filter, map, switchMap, tap, mapTo, shareReplay, withLatestFrom, take } from 'rxjs/operators';

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
class ChoicesPipe {
    constructor(cdr) {
        this._asyncPipe = new AsyncPipe(cdr);
    }
    transform(value) {
        if (value == null) {
            return [];
        }
        if (Array.isArray(value)) {
            return value;
        }
        return this._asyncPipe.transform(value) || [];
    }
}
ChoicesPipe.decorators = [
    { type: Pipe, args: [{ name: 'gngtChoices', pure: false },] }
];
ChoicesPipe.ctorParameters = () => [
    { type: ChangeDetectorRef }
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
class GngtAdminModule {
}
GngtAdminModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ChoicesPipe,
                ],
                exports: [
                    ChoicesPipe,
                ],
            },] }
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
class AdminUserInteractionsService {
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
class AdminEditComponent {
    constructor(_cdr, _fb, _router) {
        this._cdr = _cdr;
        this._fb = _fb;
        this._router = _router;
        this._title = '';
        this._cancelLabel = 'Cancel';
        this._saveLabel = 'Save';
        this._service = new BehaviorSubject(null);
        this._fields = [];
        this._id = new BehaviorSubject(null);
        this._loading = new BehaviorSubject(false);
        this.loading = this._loading;
        this._updateFormEvt = new EventEmitter();
        this._saveEvt = new EventEmitter();
        this._saveSub = Subscription.EMPTY;
        this._processFormData = this._defaultProcessData;
        const objObs = combineLatest(this._service, this._id)
            .pipe(filter(([s, i]) => s != null && i != null), map(([s, i]) => [s, i]), switchMap(([s, i]) => {
            if (i === 'new') {
                return of({});
            }
            return s.get(i);
        }), filter(o => o != null), switchMap(o => {
            if (this._processObject) {
                if (this._processObject instanceof Observable) {
                    return this._processObject.pipe(tap(po => po(o)), mapTo(o));
                }
                else {
                    this._processObject(o);
                }
            }
            return of(o);
        }), shareReplay(1));
        this.form = combineLatest(objObs, this._updateFormEvt)
            .pipe(map(r => {
            const model = r[0];
            return this._fb.group((this._fields || []).reduce((prev, cur) => {
                const val = model ? model[cur.name] : null;
                prev[cur.name] = [val, cur.validators];
                return prev;
            }, {}));
        }), shareReplay(1));
        this._valueChanges$ = this.form.pipe(switchMap((form) => form.valueChanges));
        const serviceObs = this._service.pipe(filter(s => s != null));
        this._saveSub =
            this._saveEvt
                .pipe(withLatestFrom(this.form, serviceObs, this._id), map(r => r.slice(1)), filter(([form, service, _id]) => form != null && service != null && form.valid), switchMap(([form, service, id]) => {
                const formValue = Object.assign({}, form.value);
                this._defaultProcessData(formValue);
                if (this._processFormData) {
                    if (this._processFormData instanceof Observable) {
                        return this._processFormData.pipe(tap(pd => pd(formValue)), mapTo([
                            formValue, service, id
                        ]));
                    }
                    else {
                        this._processFormData(formValue);
                    }
                }
                return of([formValue, service, id]);
            }), tap(r => this._loading.next(true)), switchMap(r => {
                const [formValue, service, id] = r;
                if (id === 'new') {
                    delete formValue['id'];
                    return service.create(formValue);
                }
                return service.patch(formValue);
            }), map(obj => obj), take(1), switchMap(r => {
                if (this._postSaveHook == null) {
                    return of(r);
                }
                return this._postSaveHook(r);
            }))
                .subscribe(() => {
                this._loading.next(false);
                this.goBack();
            }, () => this._loading.next(false));
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
        this._cdr.markForCheck();
    }
    set listUrl(listUrl) {
        this._listUrl = listUrl;
    }
    get cancelLabel() {
        return this._cancelLabel;
    }
    set cancelLabel(cancelLabel) {
        this._cancelLabel = cancelLabel;
        this._cdr.markForCheck();
    }
    get saveLabel() {
        return this._saveLabel;
    }
    set saveLabel(saveLabel) {
        this._saveLabel = saveLabel;
        this._cdr.markForCheck();
    }
    set service(service) {
        this._service.next(service);
    }
    get fields() {
        return this._fields;
    }
    set fields(fields) {
        this._fields = fields;
        this._updateForm();
    }
    set id(id) {
        this._id.next(id);
    }
    set processObject(processObject) {
        this._processObject = processObject;
    }
    set processFormData(processFormData) {
        this._processFormData = processFormData;
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(readonly) {
        readonly = coerceBooleanProperty(readonly);
        if (readonly !== this._readonly) {
            this._readonly = readonly;
            this._cdr.markForCheck();
        }
    }
    get hideSaveButton() {
        return this._hideSaveButton;
    }
    set hideSaveButton(hideSaveButton) {
        hideSaveButton = coerceBooleanProperty(hideSaveButton);
        if (hideSaveButton !== this._hideSaveButton) {
            this._hideSaveButton = hideSaveButton;
            this._cdr.markForCheck();
        }
    }
    get canSave() {
        return this._canSave;
    }
    set canSave(canSave) {
        canSave = coerceBooleanProperty(canSave);
        if (canSave !== this._canSave) {
            this._canSave = canSave;
            this._cdr.markForCheck();
        }
    }
    set postSaveHook(postSaveHook) {
        this._postSaveHook = postSaveHook;
    }
    get valueChanges$() {
        return this._valueChanges$;
    }
    goBack() {
        this._router.navigate([this._listUrl]);
    }
    save() {
        this._saveEvt.emit();
    }
    ngOnDestroy() {
        this._updateFormEvt.complete();
        this._saveEvt.complete();
        this._saveSub.unsubscribe();
    }
    _defaultProcessData(value) {
        this._fields.forEach((field) => {
            if (field.subtype) {
                switch (field.subtype) {
                    case 'number':
                        if (value[field.name] != null && typeof value[field.name] === 'string') {
                            if (value[field.name].includes('.')) {
                                value[field.name] = parseFloat(value[field.name]);
                            }
                            else {
                                value[field.name] = parseInt(value[field.name]);
                            }
                        }
                        break;
                }
            }
        });
    }
    _updateForm() {
        this._updateFormEvt.emit();
    }
}
AdminEditComponent.decorators = [
    { type: Directive }
];
AdminEditComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FormBuilder },
    { type: Router }
];
AdminEditComponent.propDecorators = {
    title: [{ type: Input }],
    listUrl: [{ type: Input }],
    cancelLabel: [{ type: Input }],
    saveLabel: [{ type: Input }],
    service: [{ type: Input }],
    fields: [{ type: Input }],
    id: [{ type: Input }],
    processObject: [{ type: Input }],
    processFormData: [{ type: Input }],
    readonly: [{ type: Input }],
    hideSaveButton: [{ type: Input }],
    canSave: [{ type: Input }],
    postSaveHook: [{ type: Input }],
    valueChanges$: [{ type: Output }]
};

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
class AdminListComponent {
    constructor(_cdr, _aui) {
        this._cdr = _cdr;
        this._aui = _aui;
        this._headers = [];
        this._displayedColumns = [];
        this._baseEditUrl = '';
        this._newItemPath = 'new';
        this._actionProcessed = new EventEmitter();
        this.actionProcessed = this._actionProcessed;
        this._deletionEvt = new EventEmitter();
        this._deletionSub = Subscription.EMPTY;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
        this._cdr.markForCheck();
    }
    get headers() {
        return this._headers;
    }
    set headers(headers) {
        this._headers = headers;
        this._cdr.markForCheck();
    }
    get displayedColumns() {
        return this._displayedColumns;
    }
    set displayedColumns(displayedColumns) {
        this._displayedColumns = ['select', ...displayedColumns];
        this._cdr.markForCheck();
    }
    get baseEditUrl() {
        return this._baseEditUrl;
    }
    set baseEditUrl(baseEditUrl) {
        this._baseEditUrl = baseEditUrl;
        this._cdr.markForCheck();
    }
    get newItemPath() {
        return this._newItemPath;
    }
    set newItemPath(newItemPath) {
        this._newItemPath = newItemPath;
        this._cdr.markForCheck();
    }
    set service(service) {
        this._service = service;
        this._initService();
    }
    isAllSelected() {
        const numSelected = this.getSelection().length;
        const numRows = this.getItems().length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected() ? this.clearSelection() : this.selectAll();
    }
    ngOnDestroy() {
        this._deletionSub.unsubscribe();
        this._deletionEvt.complete();
    }
    processAction(action) {
        const selected = this.getSelection();
        if (!selected || selected.length === 0) {
            return;
        }
        const handlerName = this._getActionHandler(action);
        const handler = this[handlerName];
        if (handler != null) {
            handler.call(this, selected);
        }
    }
    processDeleteAction(selected) {
        if (this._service == null) {
            return;
        }
        const s = this._aui.askDeleteConfirm().subscribe(res => {
            if (s) {
                s.unsubscribe();
            }
            if (res) {
                if (selected.length === 1) {
                    this._service.delete(selected[0]);
                }
                else {
                    this._service.deleteAll(selected);
                }
                this._actionProcessed.emit('delete');
                this.clearSelection();
            }
        });
    }
    _getService() {
        return this._service;
    }
    _getActionHandler(action) {
        action = action.charAt(0).toUpperCase() + action.substring(1);
        return `process${action}Action`;
    }
    _initService() {
        this._deletionSub.unsubscribe();
        this._deletionSub = this._deletionEvt
            .pipe(switchMap(selected => this._aui.askDeleteConfirm().pipe(map(res => ({ res, selected })))), switchMap(r => {
            const { res, selected } = r;
            if (res) {
                if (selected.length === 1) {
                    return this._service.delete(selected[0]);
                }
                return this._service.deleteAll(selected);
            }
            return of(null);
        }), filter(r => r != null), take(1))
            .subscribe(() => {
            this._actionProcessed.emit('delete');
            this.clearSelection();
            this.refreshList();
        });
    }
}
AdminListComponent.decorators = [
    { type: Directive }
];
AdminListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AdminUserInteractionsService }
];
AdminListComponent.propDecorators = {
    title: [{ type: Input }],
    headers: [{ type: Input }],
    displayedColumns: [{ type: Input }],
    baseEditUrl: [{ type: Input }],
    newItemPath: [{ type: Input }],
    service: [{ type: Input }]
};

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

/**
 * Generated bundle index. Do not edit.
 */

export { AdminEditComponent, AdminListComponent, AdminUserInteractionsService, ChoicesPipe, GngtAdminModule };
//# sourceMappingURL=admin.js.map
