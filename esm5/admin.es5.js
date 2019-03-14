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
import { __assign } from 'tslib';
import { Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, of, merge } from 'rxjs';
import { filter, switchMap, tap, shareReplay, map, withLatestFrom } from 'rxjs/operators';
import '@gngt/core/model';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @abstract
 */
var  /**
 * @abstract
 */
AdminUserInteractionsService = /** @class */ (function () {
    function AdminUserInteractionsService() {
    }
    return AdminUserInteractionsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, S, A1, A2, A3, A4, A5, A6, A7
 */
var AdminEditComponent = /** @class */ (function () {
    function AdminEditComponent(_cdr, _fb, _router) {
        var _this = this;
        this._cdr = _cdr;
        this._fb = _fb;
        this._router = _router;
        this._title = '';
        this._cancelLabel = 'Cancel';
        this._saveLabel = 'Save';
        this._service = new BehaviorSubject(null);
        this._fields = [];
        this._id = new BehaviorSubject(null);
        this._processObject = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this._processFormData = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this._updateFormEvt = new EventEmitter();
        this._saveEvt = new EventEmitter();
        this._saveSub = Subscription.EMPTY;
        this._savedSub = Subscription.EMPTY;
        this._processFormData = this._defaultProcessData;
        /** @type {?} */
        var objObs = combineLatest(this._service, this._id).pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var s = _a[0], i = _a[1];
            return s != null && i != null;
        })), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var s = _a[0], i = _a[1];
            if (i === 'new') {
                return of({});
            }
            (/** @type {?} */ (s)).get((/** @type {?} */ (i)));
            return (/** @type {?} */ (s)).getGetObject();
        })), filter((/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return o != null; })), tap((/**
         * @param {?} o
         * @return {?}
         */
        function (o) {
            if (_this._processObject) {
                _this._processObject(o);
            }
        })), shareReplay(1));
        this.form = combineLatest(objObs, this._updateFormEvt).pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var model = r[0];
            return _this._fb.group((_this._fields || []).reduce((/**
             * @param {?} prev
             * @param {?} cur
             * @return {?}
             */
            function (prev, cur) {
                /** @type {?} */
                var val = model ? ((/** @type {?} */ (model)))[cur.name] : null;
                ((/** @type {?} */ (prev)))[cur.name] = [val, cur.validators];
                return prev;
            }), {}));
        })), shareReplay(1));
        this._valueChanges$ = this.form.pipe(switchMap((/**
         * @param {?} form
         * @return {?}
         */
        function (form) { return form.valueChanges; })));
        this._saveSub = this._saveEvt.pipe(withLatestFrom(this.form, this._service, this._id), filter((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r[2] != null; }))).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _ = _a[0], form = _a[1], service = _a[2], id = _a[3];
            if (form == null || service == null && !form.valid) {
                return;
            }
            /** @type {?} */
            var formValue = __assign({}, form.value);
            _this._applyProcessFormData(formValue);
            if (id === 'new') {
                delete formValue['id'];
                (/** @type {?} */ (service)).create(formValue);
            }
            else {
                (/** @type {?} */ (service)).patch(formValue);
            }
        }));
        /** @type {?} */
        var serviceObs = this._service.pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s != null; })));
        this.loading = serviceObs.pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s != null; })), switchMap((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return merge((/** @type {?} */ (s)).getGetLoading(), (/** @type {?} */ (s)).getCreateLoading(), (/** @type {?} */ (s)).getPatchLoading()); })));
        this._savedSub = serviceObs.pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s != null; })), switchMap((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return merge((/** @type {?} */ (s)).getCreateSuccess(), (/** @type {?} */ (s)).getPatchSuccess()); }))).subscribe((/**
         * @return {?}
         */
        function () { return _this.goBack(); }));
    }
    Object.defineProperty(AdminEditComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () { return this._title; },
        set: /**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            this._title = title;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "listUrl", {
        set: /**
         * @param {?} listUrl
         * @return {?}
         */
        function (listUrl) { this._listUrl = listUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "cancelLabel", {
        get: /**
         * @return {?}
         */
        function () { return this._cancelLabel; },
        set: /**
         * @param {?} cancelLabel
         * @return {?}
         */
        function (cancelLabel) {
            this._cancelLabel = cancelLabel;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "saveLabel", {
        get: /**
         * @return {?}
         */
        function () { return this._saveLabel; },
        set: /**
         * @param {?} saveLabel
         * @return {?}
         */
        function (saveLabel) {
            this._saveLabel = saveLabel;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "service", {
        set: /**
         * @param {?} service
         * @return {?}
         */
        function (service) {
            this._service.next(service);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () { return this._fields; },
        set: /**
         * @param {?} fields
         * @return {?}
         */
        function (fields) {
            this._fields = fields;
            this._updateForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "id", {
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            this._id.next(id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "processObject", {
        set: /**
         * @param {?} processObject
         * @return {?}
         */
        function (processObject) {
            this._processObject = processObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "processFormData", {
        set: /**
         * @param {?} processFormData
         * @return {?}
         */
        function (processFormData) {
            this._processFormData = processFormData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminEditComponent.prototype, "valueChanges$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._valueChanges$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AdminEditComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        this._router.navigate([this._listUrl]);
    };
    /**
     * @return {?}
     */
    AdminEditComponent.prototype.save = /**
     * @return {?}
     */
    function () {
        this._saveEvt.emit();
    };
    /**
     * @return {?}
     */
    AdminEditComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._updateFormEvt.complete();
        this._saveEvt.complete();
        this._saveSub.unsubscribe();
        this._savedSub.unsubscribe();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    AdminEditComponent.prototype._applyProcessFormData = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._defaultProcessData(value);
        this._processFormData(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    AdminEditComponent.prototype._defaultProcessData = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
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
    };
    /**
     * @private
     * @return {?}
     */
    AdminEditComponent.prototype._updateForm = /**
     * @private
     * @return {?}
     */
    function () {
        this._updateFormEvt.emit();
    };
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
        valueChanges$: [{ type: Output }]
    };
    return AdminEditComponent;
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

/** @enum {string} */
var AdminEditFieldSubtype = {
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
var AdminEditFieldType = {
    Input: 'input',
    TextArea: 'textarea',
    CheckBox: 'checkbox',
    Radio: 'radio',
    Select: 'select',
    MultipleSelect: 'multipleselect',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T, S, A1, A2, A3, A4, A5, A6, A7, MS
 */
var  /**
 * @abstract
 * @template T, S, A1, A2, A3, A4, A5, A6, A7, MS
 */
AdminListComponent = /** @class */ (function () {
    function AdminListComponent(_cdr, _aui) {
        this._cdr = _cdr;
        this._aui = _aui;
        this._headers = [];
        this._displayedColumns = [];
        this._baseEditUrl = '';
        this._newItemPath = 'new';
        this._actionProcessed = new EventEmitter();
        this.actionProcessed = this._actionProcessed.asObservable();
        this._deletionSub = Subscription.EMPTY;
    }
    Object.defineProperty(AdminListComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () { return this._title; },
        set: /**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            this._title = title;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminListComponent.prototype, "headers", {
        get: /**
         * @return {?}
         */
        function () { return this._headers; },
        set: /**
         * @param {?} headers
         * @return {?}
         */
        function (headers) {
            this._headers = headers;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminListComponent.prototype, "displayedColumns", {
        get: /**
         * @return {?}
         */
        function () { return this._displayedColumns; },
        set: /**
         * @param {?} displayedColumns
         * @return {?}
         */
        function (displayedColumns) {
            this._displayedColumns = ['select'].concat(displayedColumns);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminListComponent.prototype, "baseEditUrl", {
        get: /**
         * @return {?}
         */
        function () { return this._baseEditUrl; },
        set: /**
         * @param {?} baseEditUrl
         * @return {?}
         */
        function (baseEditUrl) {
            this._baseEditUrl = baseEditUrl;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminListComponent.prototype, "newItemPath", {
        get: /**
         * @return {?}
         */
        function () { return this._newItemPath; },
        set: /**
         * @param {?} newItemPath
         * @return {?}
         */
        function (newItemPath) {
            this._newItemPath = newItemPath;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminListComponent.prototype, "service", {
        set: /**
         * @param {?} service
         * @return {?}
         */
        function (service) {
            this._service = service;
            this._initService();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AdminListComponent.prototype.isAllSelected = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var numSelected = this.getSelection().length;
        /** @type {?} */
        var numRows = this.getItems().length;
        return numSelected === numRows;
    };
    /**
     * @return {?}
     */
    AdminListComponent.prototype.masterToggle = /**
     * @return {?}
     */
    function () {
        this.isAllSelected() ? this.clearSelection() : this.selectAll();
    };
    /**
     * @return {?}
     */
    AdminListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._deletionSub.unsubscribe();
    };
    /**
     * @param {?} action
     * @return {?}
     */
    AdminListComponent.prototype.processAction = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var selected = this.getSelection();
        if (!selected || selected.length === 0) {
            return;
        }
        /** @type {?} */
        var handlerName = this._getActionHandler(action);
        /** @type {?} */
        var handler = ((/** @type {?} */ (this)))[handlerName];
        if (handler != null) {
            handler.call(this, selected);
        }
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    AdminListComponent.prototype.processDeleteAction = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        var _this = this;
        if (this._service == null) {
            return;
        }
        /** @type {?} */
        var s = this._aui.askDeleteConfirm().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (s) {
                s.unsubscribe();
            }
            if (res) {
                if (selected.length === 1) {
                    _this._service.delete(selected[0]);
                }
                else {
                    _this._service.deleteAll(selected);
                }
                _this._actionProcessed.emit('delete');
                _this.clearSelection();
            }
        }));
    };
    /**
     * @protected
     * @return {?}
     */
    AdminListComponent.prototype._getService = /**
     * @protected
     * @return {?}
     */
    function () { return this._service; };
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    AdminListComponent.prototype._getActionHandler = /**
     * @private
     * @param {?} action
     * @return {?}
     */
    function (action) {
        action = action.charAt(0).toUpperCase() + action.substring(1);
        return "process" + action + "Action";
    };
    /**
     * @private
     * @return {?}
     */
    AdminListComponent.prototype._initService = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._deletionSub = merge(this._service.getDeleteSuccess(), this._service.getDeleteAllSuccess()).subscribe((/**
         * @return {?}
         */
        function () { return _this.refreshList(); }));
    };
    return AdminListComponent;
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

export { AdminUserInteractionsService, AdminEditComponent, AdminEditFieldSubtype, AdminEditFieldType, AdminListComponent };
//# sourceMappingURL=admin.es5.js.map
