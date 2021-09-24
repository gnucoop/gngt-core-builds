(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/coercion'), require('@angular/forms'), require('@angular/router'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/admin', ['exports', '@angular/core', '@angular/common', '@angular/cdk/coercion', '@angular/forms', '@angular/router', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.admin = {}), global.ng.core, global.ng.common, global.ng.cdk.coercion, global.ng.forms, global.ng.router, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, common, coercion, forms, router, rxjs, operators) { 'use strict';

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
    var ChoicesPipe = /** @class */ (function () {
        function ChoicesPipe(cdr) {
            this._asyncPipe = new common.AsyncPipe(cdr);
        }
        ChoicesPipe.prototype.transform = function (value) {
            if (value == null) {
                return [];
            }
            if (Array.isArray(value)) {
                return value;
            }
            return this._asyncPipe.transform(value) || [];
        };
        return ChoicesPipe;
    }());
    ChoicesPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'gngtChoices', pure: false },] }
    ];
    ChoicesPipe.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };

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
    var GngtAdminModule = /** @class */ (function () {
        function GngtAdminModule() {
        }
        return GngtAdminModule;
    }());
    GngtAdminModule.decorators = [
        { type: core.NgModule, args: [{
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
    var AdminUserInteractionsService = /** @class */ (function () {
        function AdminUserInteractionsService() {
        }
        return AdminUserInteractionsService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

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
            this.loading = this._loading;
            this._updateFormEvt = new core.EventEmitter();
            this._saveEvt = new core.EventEmitter();
            this._saveSub = rxjs.Subscription.EMPTY;
            this._processFormData = this._defaultProcessData;
            var objObs = rxjs.combineLatest(this._service, this._id)
                .pipe(operators.filter(function (_a) {
                var _b = __read(_a, 2), s = _b[0], i = _b[1];
                return s != null && i != null;
            }), operators.map(function (_a) {
                var _b = __read(_a, 2), s = _b[0], i = _b[1];
                return [s, i];
            }), operators.switchMap(function (_a) {
                var _b = __read(_a, 2), s = _b[0], i = _b[1];
                if (i === 'new') {
                    return rxjs.of({});
                }
                return s.get(i);
            }), operators.filter(function (o) { return o != null; }), operators.switchMap(function (o) {
                if (_this._processObject) {
                    if (_this._processObject instanceof rxjs.Observable) {
                        return _this._processObject.pipe(operators.tap(function (po) { return po(o); }), operators.mapTo(o));
                    }
                    else {
                        _this._processObject(o);
                    }
                }
                return rxjs.of(o);
            }), operators.shareReplay(1));
            this.form = rxjs.combineLatest(objObs, this._updateFormEvt)
                .pipe(operators.map(function (r) {
                var model = r[0];
                return _this._fb.group((_this._fields || []).reduce(function (prev, cur) {
                    var val = model ? model[cur.name] : null;
                    prev[cur.name] = [val, cur.validators];
                    return prev;
                }, {}));
            }), operators.shareReplay(1));
            this._valueChanges$ = this.form.pipe(operators.switchMap(function (form) { return form.valueChanges; }));
            var serviceObs = this._service.pipe(operators.filter(function (s) { return s != null; }));
            this._saveSub =
                this._saveEvt
                    .pipe(operators.withLatestFrom(this.form, serviceObs, this._id), operators.map(function (r) { return r.slice(1); }), operators.filter(function (_a) {
                    var _b = __read(_a, 3), form = _b[0], service = _b[1], _id = _b[2];
                    return form != null && service != null && form.valid;
                }), operators.switchMap(function (_a) {
                    var _b = __read(_a, 3), form = _b[0], service = _b[1], id = _b[2];
                    var formValue = Object.assign({}, form.value);
                    _this._defaultProcessData(formValue);
                    if (_this._processFormData) {
                        if (_this._processFormData instanceof rxjs.Observable) {
                            return _this._processFormData.pipe(operators.tap(function (pd) { return pd(formValue); }), operators.mapTo([
                                formValue, service, id
                            ]));
                        }
                        else {
                            _this._processFormData(formValue);
                        }
                    }
                    return rxjs.of([formValue, service, id]);
                }), operators.tap(function (r) { return _this._loading.next(true); }), operators.switchMap(function (r) {
                    var _a = __read(r, 3), formValue = _a[0], service = _a[1], id = _a[2];
                    if (id === 'new') {
                        delete formValue['id'];
                        return service.create(formValue);
                    }
                    return service.patch(formValue);
                }), operators.map(function (obj) { return obj; }), operators.take(1), operators.switchMap(function (r) {
                    if (_this._postSaveHook == null) {
                        return rxjs.of(r);
                    }
                    return _this._postSaveHook(r);
                }))
                    .subscribe(function () {
                    _this._loading.next(false);
                    _this.goBack();
                }, function () { return _this._loading.next(false); });
        }
        Object.defineProperty(AdminEditComponent.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (title) {
                this._title = title;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "listUrl", {
            set: function (listUrl) {
                this._listUrl = listUrl;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "cancelLabel", {
            get: function () {
                return this._cancelLabel;
            },
            set: function (cancelLabel) {
                this._cancelLabel = cancelLabel;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "saveLabel", {
            get: function () {
                return this._saveLabel;
            },
            set: function (saveLabel) {
                this._saveLabel = saveLabel;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "service", {
            set: function (service) {
                this._service.next(service);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "fields", {
            get: function () {
                return this._fields;
            },
            set: function (fields) {
                this._fields = fields;
                this._updateForm();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "id", {
            set: function (id) {
                this._id.next(id);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "processObject", {
            set: function (processObject) {
                this._processObject = processObject;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "processFormData", {
            set: function (processFormData) {
                this._processFormData = processFormData;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "readonly", {
            get: function () {
                return this._readonly;
            },
            set: function (readonly) {
                readonly = coercion.coerceBooleanProperty(readonly);
                if (readonly !== this._readonly) {
                    this._readonly = readonly;
                    this._cdr.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "hideSaveButton", {
            get: function () {
                return this._hideSaveButton;
            },
            set: function (hideSaveButton) {
                hideSaveButton = coercion.coerceBooleanProperty(hideSaveButton);
                if (hideSaveButton !== this._hideSaveButton) {
                    this._hideSaveButton = hideSaveButton;
                    this._cdr.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "canSave", {
            get: function () {
                return this._canSave;
            },
            set: function (canSave) {
                canSave = coercion.coerceBooleanProperty(canSave);
                if (canSave !== this._canSave) {
                    this._canSave = canSave;
                    this._cdr.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "postSaveHook", {
            set: function (postSaveHook) {
                this._postSaveHook = postSaveHook;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminEditComponent.prototype, "valueChanges$", {
            get: function () {
                return this._valueChanges$;
            },
            enumerable: false,
            configurable: true
        });
        AdminEditComponent.prototype.goBack = function () {
            this._router.navigate([this._listUrl]);
        };
        AdminEditComponent.prototype.save = function () {
            this._saveEvt.emit();
        };
        AdminEditComponent.prototype.ngOnDestroy = function () {
            this._updateFormEvt.complete();
            this._saveEvt.complete();
            this._saveSub.unsubscribe();
        };
        AdminEditComponent.prototype._defaultProcessData = function (value) {
            this._fields.forEach(function (field) {
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
        };
        AdminEditComponent.prototype._updateForm = function () {
            this._updateFormEvt.emit();
        };
        return AdminEditComponent;
    }());
    AdminEditComponent.decorators = [
        { type: core.Directive }
    ];
    AdminEditComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: forms.FormBuilder },
        { type: router.Router }
    ]; };
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
        postSaveHook: [{ type: core.Input }],
        valueChanges$: [{ type: core.Output }]
    };

    var AdminListComponent = /** @class */ (function () {
        function AdminListComponent(_cdr, _aui) {
            this._cdr = _cdr;
            this._aui = _aui;
            this._headers = [];
            this._displayedColumns = [];
            this._baseEditUrl = '';
            this._newItemPath = 'new';
            this._actionProcessed = new core.EventEmitter();
            this.actionProcessed = this._actionProcessed;
            this._deletionEvt = new core.EventEmitter();
            this._deletionSub = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(AdminListComponent.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (title) {
                this._title = title;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminListComponent.prototype, "headers", {
            get: function () {
                return this._headers;
            },
            set: function (headers) {
                this._headers = headers;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminListComponent.prototype, "displayedColumns", {
            get: function () {
                return this._displayedColumns;
            },
            set: function (displayedColumns) {
                this._displayedColumns = __spreadArray(['select'], __read(displayedColumns));
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminListComponent.prototype, "baseEditUrl", {
            get: function () {
                return this._baseEditUrl;
            },
            set: function (baseEditUrl) {
                this._baseEditUrl = baseEditUrl;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminListComponent.prototype, "newItemPath", {
            get: function () {
                return this._newItemPath;
            },
            set: function (newItemPath) {
                this._newItemPath = newItemPath;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdminListComponent.prototype, "service", {
            set: function (service) {
                this._service = service;
                this._initService();
            },
            enumerable: false,
            configurable: true
        });
        AdminListComponent.prototype.isAllSelected = function () {
            var numSelected = this.getSelection().length;
            var numRows = this.getItems().length;
            return numSelected === numRows;
        };
        AdminListComponent.prototype.masterToggle = function () {
            this.isAllSelected() ? this.clearSelection() : this.selectAll();
        };
        AdminListComponent.prototype.ngOnDestroy = function () {
            this._deletionSub.unsubscribe();
            this._deletionEvt.complete();
        };
        AdminListComponent.prototype.processAction = function (action) {
            var selected = this.getSelection();
            if (!selected || selected.length === 0) {
                return;
            }
            var handlerName = this._getActionHandler(action);
            var handler = this[handlerName];
            if (handler != null) {
                handler.call(this, selected);
            }
        };
        AdminListComponent.prototype.processDeleteAction = function (selected) {
            var _this = this;
            if (this._service == null) {
                return;
            }
            var s = this._aui.askDeleteConfirm().subscribe(function (res) {
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
            });
        };
        AdminListComponent.prototype._getService = function () {
            return this._service;
        };
        AdminListComponent.prototype._getActionHandler = function (action) {
            action = action.charAt(0).toUpperCase() + action.substring(1);
            return "process" + action + "Action";
        };
        AdminListComponent.prototype._initService = function () {
            var _this = this;
            this._deletionSub.unsubscribe();
            this._deletionSub = this._deletionEvt
                .pipe(operators.switchMap(function (selected) { return _this._aui.askDeleteConfirm().pipe(operators.map(function (res) { return ({ res: res, selected: selected }); })); }), operators.switchMap(function (r) {
                var res = r.res, selected = r.selected;
                if (res) {
                    if (selected.length === 1) {
                        return _this._service.delete(selected[0]);
                    }
                    return _this._service.deleteAll(selected);
                }
                return rxjs.of(null);
            }), operators.filter(function (r) { return r != null; }), operators.take(1))
                .subscribe(function () {
                _this._actionProcessed.emit('delete');
                _this.clearSelection();
                _this.refreshList();
            });
        };
        return AdminListComponent;
    }());
    AdminListComponent.decorators = [
        { type: core.Directive }
    ];
    AdminListComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: AdminUserInteractionsService }
    ]; };
    AdminListComponent.propDecorators = {
        title: [{ type: core.Input }],
        headers: [{ type: core.Input }],
        displayedColumns: [{ type: core.Input }],
        baseEditUrl: [{ type: core.Input }],
        newItemPath: [{ type: core.Input }],
        service: [{ type: core.Input }]
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
     * Generated bundle index. Do not edit.
     */

    exports.AdminEditComponent = AdminEditComponent;
    exports.AdminListComponent = AdminListComponent;
    exports.AdminUserInteractionsService = AdminUserInteractionsService;
    exports.ChoicesPipe = ChoicesPipe;
    exports.GngtAdminModule = GngtAdminModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-admin.umd.js.map
