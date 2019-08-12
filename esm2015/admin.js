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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, of, Observable } from 'rxjs';
import { filter, switchMap, tap, mapTo, shareReplay, map, withLatestFrom, take } from 'rxjs/operators';
import '@gngt/core/model';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @abstract
 */
class AdminUserInteractionsService {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, S, A
 */
class AdminEditComponent {
    /**
     * @param {?} _cdr
     * @param {?} _fb
     * @param {?} _router
     */
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
        this.loading = this._loading.asObservable();
        this._updateFormEvt = new EventEmitter();
        this._saveEvt = new EventEmitter();
        this._saveSub = Subscription.EMPTY;
        this._processFormData = this._defaultProcessData;
        /** @type {?} */
        const objObs = combineLatest(this._service, this._id).pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([s, i]) => s != null && i != null)), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([s, i]) => {
            if (i === 'new') {
                return of({});
            }
            (/** @type {?} */ (s)).get((/** @type {?} */ (i)));
            return (/** @type {?} */ (s)).getGetObject();
        })), filter((/**
         * @param {?} o
         * @return {?}
         */
        o => o != null)), switchMap((/**
         * @param {?} o
         * @return {?}
         */
        o => {
            if (this._processObject) {
                if (this._processObject instanceof Observable) {
                    return this._processObject.pipe(tap((/**
                     * @param {?} po
                     * @return {?}
                     */
                    po => po(o))), mapTo(o));
                }
                else {
                    this._processObject(o);
                }
            }
            return of(o);
        })), shareReplay(1));
        this.form = combineLatest(objObs, this._updateFormEvt).pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        r => {
            /** @type {?} */
            const model = r[0];
            return this._fb.group((this._fields || []).reduce((/**
             * @param {?} prev
             * @param {?} cur
             * @return {?}
             */
            (prev, cur) => {
                /** @type {?} */
                const val = model ? ((/** @type {?} */ (model)))[cur.name] : null;
                ((/** @type {?} */ (prev)))[cur.name] = [val, cur.validators];
                return prev;
            }), {}));
        })), shareReplay(1));
        this._valueChanges$ = this.form.pipe(switchMap((/**
         * @param {?} form
         * @return {?}
         */
        (form) => form.valueChanges)));
        /** @type {?} */
        const serviceObs = this._service.pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s != null)));
        this._saveSub = this._saveEvt.pipe(withLatestFrom(this.form, serviceObs, this._id), filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([_, form, service, __]) => form != null && service != null && form.valid)), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([_, form, service, id]) => {
            /** @type {?} */
            const formValue = Object.assign({}, form.value);
            this._defaultProcessData(formValue);
            if (this._processFormData) {
                if (this._processFormData instanceof Observable) {
                    return this._processFormData.pipe(tap((/**
                     * @param {?} pd
                     * @return {?}
                     */
                    pd => pd(formValue))), mapTo([formValue, service, id]));
                }
                else {
                    this._processFormData(formValue);
                }
            }
            return of([formValue, service, id]);
        })), tap((/**
         * @return {?}
         */
        () => this._loading.next(true))), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([formValue, service, id]) => {
            if (id === 'new') {
                delete formValue['id'];
                return (/** @type {?} */ (service)).create(formValue);
            }
            return (/** @type {?} */ (service)).patch(formValue);
        })), take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            this._loading.next(false);
            this.goBack();
        }), (/**
         * @return {?}
         */
        () => this._loading.next(false)));
    }
    /**
     * @return {?}
     */
    get title() { return this._title; }
    /**
     * @param {?} title
     * @return {?}
     */
    set title(title) {
        this._title = title;
        this._cdr.markForCheck();
    }
    /**
     * @param {?} listUrl
     * @return {?}
     */
    set listUrl(listUrl) { this._listUrl = listUrl; }
    /**
     * @return {?}
     */
    get cancelLabel() { return this._cancelLabel; }
    /**
     * @param {?} cancelLabel
     * @return {?}
     */
    set cancelLabel(cancelLabel) {
        this._cancelLabel = cancelLabel;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get saveLabel() { return this._saveLabel; }
    /**
     * @param {?} saveLabel
     * @return {?}
     */
    set saveLabel(saveLabel) {
        this._saveLabel = saveLabel;
        this._cdr.markForCheck();
    }
    /**
     * @param {?} service
     * @return {?}
     */
    set service(service) {
        this._service.next(service);
    }
    /**
     * @return {?}
     */
    get fields() { return this._fields; }
    /**
     * @param {?} fields
     * @return {?}
     */
    set fields(fields) {
        this._fields = fields;
        this._updateForm();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set id(id) {
        this._id.next(id);
    }
    /**
     * @param {?} processObject
     * @return {?}
     */
    set processObject(processObject) {
        this._processObject = processObject;
    }
    /**
     * @param {?} processFormData
     * @return {?}
     */
    set processFormData(processFormData) {
        this._processFormData = processFormData;
    }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        readonly = coerceBooleanProperty(readonly);
        if (readonly !== this._readonly) {
            this._readonly = readonly;
            this._cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get hideSaveButton() { return this._hideSaveButton; }
    /**
     * @param {?} hideSaveButton
     * @return {?}
     */
    set hideSaveButton(hideSaveButton) {
        hideSaveButton = coerceBooleanProperty(hideSaveButton);
        if (hideSaveButton !== this._hideSaveButton) {
            this._hideSaveButton = hideSaveButton;
            this._cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get canSave() { return this._canSave; }
    /**
     * @param {?} canSave
     * @return {?}
     */
    set canSave(canSave) {
        canSave = coerceBooleanProperty(canSave);
        if (canSave !== this._canSave) {
            this._canSave = canSave;
            this._cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get valueChanges$() {
        return this._valueChanges$;
    }
    /**
     * @return {?}
     */
    goBack() {
        this._router.navigate([this._listUrl]);
    }
    /**
     * @return {?}
     */
    save() {
        this._saveEvt.emit();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._updateFormEvt.complete();
        this._saveEvt.complete();
        this._saveSub.unsubscribe();
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _defaultProcessData(value) {
        this._fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
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
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateForm() {
        this._updateFormEvt.emit();
    }
}
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
    valueChanges$: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {string} */
const AdminEditFieldSubtype = {
    Color: 'color',
    Date: 'date',
    DateTimeLocal: 'datetime-local',
    Email: 'email',
    Month: 'month',
    Number: 'number',
    Password: 'password',
    Search: 'search',
    Tel: 'tel',
    Text: 'text',
    Time: 'time',
    Url: 'url',
    Week: 'week',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {string} */
const AdminEditFieldType = {
    Input: 'input',
    TextArea: 'textarea',
    CheckBox: 'checkbox',
    Radio: 'radio',
    Select: 'select',
    MultipleSelect: 'multipleselect',
    Autocomplete: 'autocomplete',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, S, A, MS
 */
class AdminListComponent {
    /**
     * @param {?} _cdr
     * @param {?} _aui
     */
    constructor(_cdr, _aui) {
        this._cdr = _cdr;
        this._aui = _aui;
        this._headers = [];
        this._displayedColumns = [];
        this._baseEditUrl = '';
        this._newItemPath = 'new';
        this._actionProcessed = new EventEmitter();
        this.actionProcessed = this._actionProcessed.asObservable();
        this._deletionEvt = new EventEmitter();
        this._deletionSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get title() { return this._title; }
    /**
     * @param {?} title
     * @return {?}
     */
    set title(title) {
        this._title = title;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get headers() { return this._headers; }
    /**
     * @param {?} headers
     * @return {?}
     */
    set headers(headers) {
        this._headers = headers;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get displayedColumns() { return this._displayedColumns; }
    /**
     * @param {?} displayedColumns
     * @return {?}
     */
    set displayedColumns(displayedColumns) {
        this._displayedColumns = ['select', ...displayedColumns];
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get baseEditUrl() { return this._baseEditUrl; }
    /**
     * @param {?} baseEditUrl
     * @return {?}
     */
    set baseEditUrl(baseEditUrl) {
        this._baseEditUrl = baseEditUrl;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get newItemPath() { return this._newItemPath; }
    /**
     * @param {?} newItemPath
     * @return {?}
     */
    set newItemPath(newItemPath) {
        this._newItemPath = newItemPath;
        this._cdr.markForCheck();
    }
    /**
     * @param {?} service
     * @return {?}
     */
    set service(service) {
        this._service = service;
        this._initService();
    }
    /**
     * @return {?}
     */
    isAllSelected() {
        /** @type {?} */
        const numSelected = this.getSelection().length;
        /** @type {?} */
        const numRows = this.getItems().length;
        return numSelected === numRows;
    }
    /**
     * @return {?}
     */
    masterToggle() {
        this.isAllSelected() ? this.clearSelection() : this.selectAll();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._deletionSub.unsubscribe();
        this._deletionEvt.complete();
    }
    /**
     * @param {?} action
     * @return {?}
     */
    processAction(action) {
        /** @type {?} */
        const selected = this.getSelection();
        if (!selected || selected.length === 0) {
            return;
        }
        /** @type {?} */
        const handlerName = this._getActionHandler(action);
        /** @type {?} */
        const handler = ((/** @type {?} */ (this)))[handlerName];
        if (handler != null) {
            handler.call(this, selected);
        }
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    processDeleteAction(selected) {
        if (this._service == null) {
            return;
        }
        /** @type {?} */
        const s = this._aui.askDeleteConfirm().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
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
        }));
    }
    /**
     * @protected
     * @return {?}
     */
    _getService() { return this._service; }
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    _getActionHandler(action) {
        action = action.charAt(0).toUpperCase() + action.substring(1);
        return `process${action}Action`;
    }
    /**
     * @private
     * @return {?}
     */
    _initService() {
        this._deletionSub.unsubscribe();
        this._deletionSub = this._deletionEvt.pipe(switchMap((/**
         * @param {?} selected
         * @return {?}
         */
        selected => this._aui.askDeleteConfirm().pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => ({ res, selected })))))), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ({ res, selected }) => {
            if (res) {
                if (selected.length === 1) {
                    return this._service.delete(selected[0]);
                }
                return this._service.deleteAll(selected);
            }
            return of(null);
        })), filter((/**
         * @param {?} r
         * @return {?}
         */
        r => r != null)), take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            this._actionProcessed.emit('delete');
            this.clearSelection();
            this.refreshList();
        }));
    }
}

export { AdminEditComponent, AdminEditFieldSubtype, AdminEditFieldType, AdminListComponent, AdminUserInteractionsService };
//# sourceMappingURL=admin.js.map
