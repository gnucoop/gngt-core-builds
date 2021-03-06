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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@gngt/core/model')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/admin', ['exports', '@angular/cdk/coercion', '@angular/core', 'rxjs', 'rxjs/operators', '@gngt/core/model'], factory) :
    (global = global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.admin = {}), global.ng.cdk.coercion, global.ng.core, global.rxjs, global.rxjs.operators));
}(this, function (exports, coercion, core, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @abstract
     */
    var   /**
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
     * @template T, S, A
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
            this._service = new rxjs.BehaviorSubject(null);
            this._fields = [];
            this._id = new rxjs.BehaviorSubject(null);
            this._loading = new rxjs.BehaviorSubject(false);
            this.loading = this._loading.asObservable();
            this._updateFormEvt = new core.EventEmitter();
            this._saveEvt = new core.EventEmitter();
            this._saveSub = rxjs.Subscription.EMPTY;
            this._processFormData = this._defaultProcessData;
            /** @type {?} */
            var objObs = rxjs.combineLatest(this._service, this._id).pipe(operators.filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var s = _a[0], i = _a[1];
                return s != null && i != null;
            })), operators.switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var s = _a[0], i = _a[1];
                if (i === 'new') {
                    return rxjs.of({});
                }
                (/** @type {?} */ (s)).get((/** @type {?} */ (i)));
                return (/** @type {?} */ (s)).getGetObject();
            })), operators.filter((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return o != null; })), operators.switchMap((/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                if (_this._processObject) {
                    if (_this._processObject instanceof rxjs.Observable) {
                        return _this._processObject.pipe(operators.tap((/**
                         * @param {?} po
                         * @return {?}
                         */
                        function (po) { return po(o); })), operators.mapTo(o));
                    }
                    else {
                        _this._processObject(o);
                    }
                }
                return rxjs.of(o);
            })), operators.shareReplay(1));
            this.form = rxjs.combineLatest(objObs, this._updateFormEvt).pipe(operators.map((/**
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
            })), operators.shareReplay(1));
            this._valueChanges$ = this.form.pipe(operators.switchMap((/**
             * @param {?} form
             * @return {?}
             */
            function (form) { return form.valueChanges; })));
            /** @type {?} */
            var serviceObs = this._service.pipe(operators.filter((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s != null; })));
            this._saveSub = this._saveEvt.pipe(operators.withLatestFrom(this.form, serviceObs, this._id), operators.filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _ = _a[0], form = _a[1], service = _a[2], __ = _a[3];
                return form != null && service != null && form.valid;
            })), operators.switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _ = _a[0], form = _a[1], service = _a[2], id = _a[3];
                /** @type {?} */
                var formValue = __assign({}, form.value);
                _this._defaultProcessData(formValue);
                if (_this._processFormData) {
                    if (_this._processFormData instanceof rxjs.Observable) {
                        return _this._processFormData.pipe(operators.tap((/**
                         * @param {?} pd
                         * @return {?}
                         */
                        function (pd) { return pd(formValue); })), operators.mapTo([formValue, service, id]));
                    }
                    else {
                        _this._processFormData(formValue);
                    }
                }
                return rxjs.of([formValue, service, id]);
            })), operators.tap((/**
             * @return {?}
             */
            function () { return _this._loading.next(true); })), operators.switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var formValue = _a[0], service = _a[1], id = _a[2];
                if (id === 'new') {
                    delete formValue['id'];
                    return (/** @type {?} */ (service)).create(formValue);
                }
                return (/** @type {?} */ (service)).patch(formValue);
            })), operators.take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                _this._loading.next(false);
                _this.goBack();
            }), (/**
             * @return {?}
             */
            function () { return _this._loading.next(false); }));
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
        Object.defineProperty(AdminEditComponent.prototype, "readonly", {
            get: /**
             * @return {?}
             */
            function () { return this._readonly; },
            set: /**
             * @param {?} readonly
             * @return {?}
             */
            function (readonly) {
                readonly = coercion.coerceBooleanProperty(readonly);
                if (readonly !== this._readonly) {
                    this._readonly = readonly;
                    this._cdr.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "hideSaveButton", {
            get: /**
             * @return {?}
             */
            function () { return this._hideSaveButton; },
            set: /**
             * @param {?} hideSaveButton
             * @return {?}
             */
            function (hideSaveButton) {
                hideSaveButton = coercion.coerceBooleanProperty(hideSaveButton);
                if (hideSaveButton !== this._hideSaveButton) {
                    this._hideSaveButton = hideSaveButton;
                    this._cdr.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "canSave", {
            get: /**
             * @return {?}
             */
            function () { return this._canSave; },
            set: /**
             * @param {?} canSave
             * @return {?}
             */
            function (canSave) {
                canSave = coercion.coerceBooleanProperty(canSave);
                if (canSave !== this._canSave) {
                    this._canSave = canSave;
                    this._cdr.markForCheck();
                }
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
            title: [{ type: core.Input }],
            listUrl: [{ type: core.Input }],
            cancelLabel: [{ type: core.Input }],
            saveLabel: [{ type: core.Input }],
            service: [{ type: core.Input }],
            fields: [{ type: core.Input }],
            id: [{ type: core.Input }],
            processObject: [{ type: core.Input }],
            processFormData: [{ type: core.Input }],
            readonly: [{ type: core.Input }],
            hideSaveButton: [{ type: core.Input }],
            canSave: [{ type: core.Input }],
            valueChanges$: [{ type: core.Output }]
        };
        return AdminEditComponent;
    }());

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
    var   /**
     * @abstract
     * @template T, S, A, MS
     */
    AdminListComponent = /** @class */ (function () {
        function AdminListComponent(_cdr, _aui) {
            this._cdr = _cdr;
            this._aui = _aui;
            this._headers = [];
            this._displayedColumns = [];
            this._baseEditUrl = '';
            this._newItemPath = 'new';
            this._actionProcessed = new core.EventEmitter();
            this.actionProcessed = this._actionProcessed.asObservable();
            this._deletionEvt = new core.EventEmitter();
            this._deletionSub = rxjs.Subscription.EMPTY;
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
            this._deletionEvt.complete();
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
            this._deletionSub.unsubscribe();
            this._deletionSub = this._deletionEvt.pipe(operators.switchMap((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) { return _this._aui.askDeleteConfirm().pipe(operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return ({ res: res, selected: selected }); }))); })), operators.switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var res = _a.res, selected = _a.selected;
                if (res) {
                    if (selected.length === 1) {
                        return _this._service.delete(selected[0]);
                    }
                    return _this._service.deleteAll(selected);
                }
                return rxjs.of(null);
            })), operators.filter((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return r != null; })), operators.take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                _this._actionProcessed.emit('delete');
                _this.clearSelection();
                _this.refreshList();
            }));
        };
        return AdminListComponent;
    }());

    exports.AdminEditComponent = AdminEditComponent;
    exports.AdminEditFieldSubtype = AdminEditFieldSubtype;
    exports.AdminEditFieldType = AdminEditFieldType;
    exports.AdminListComponent = AdminListComponent;
    exports.AdminUserInteractionsService = AdminUserInteractionsService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-admin.umd.js.map
