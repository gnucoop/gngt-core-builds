(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('date-fns')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/calendar', ['exports', '@angular/core', '@angular/forms', 'date-fns'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.calendar = {}), global.ng.core, global.ng.forms, global.dateFns));
}(this, (function (exports, core, forms, dateFns) { 'use strict';

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

    var CALENDAR_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Calendar; }),
        multi: true
    };
    var weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    var CalendarPeriod = /** @class */ (function () {
        function CalendarPeriod() {
        }
        return CalendarPeriod;
    }());
    var CalendarChange = /** @class */ (function () {
        function CalendarChange() {
        }
        return CalendarChange;
    }());
    var CalendarEntry = /** @class */ (function () {
        function CalendarEntry(params) {
            this.disabled = false;
            this.highlight = false;
            var keys = Object.keys(params);
            this.type = params.type;
            this.date = params.date;
            this.selected = params.selected;
            if (keys.indexOf('disabled') > -1) {
                this.disabled = params.disabled;
            }
            if (keys.indexOf('highlight') > -1) {
                this.highlight = params.highlight;
            }
        }
        CalendarEntry.prototype.toString = function () {
            if (this.type === 'day') {
                return "" + this.date.getDate();
            }
            if (this.type === 'month') {
                return dateFns.format(this.date, 'MMM');
            }
            return "" + this.date.getFullYear();
        };
        CalendarEntry.prototype.getRange = function () {
            if (this.type === 'day') {
                return { start: new Date(this.date), end: new Date(this.date) };
            }
            else {
                var curDate = new Date(this.date);
                return {
                    start: this.type === 'month' ? dateFns.startOfMonth(curDate) : dateFns.startOfYear(curDate),
                    end: this.type === 'month' ? dateFns.endOfMonth(curDate) : dateFns.endOfYear(curDate)
                };
            }
        };
        return CalendarEntry;
    }());
    var Calendar = /** @class */ (function () {
        function Calendar(_cdr) {
            this._cdr = _cdr;
            this._disabled = false;
            this._dateOnlyForDay = false;
            this._viewMode = 'month';
            this._selectionMode = 'day';
            this._startOfWeekDay = 1;
            this._isoMode = false;
            this._change = new core.EventEmitter();
            this._viewDate = new Date();
            this._viewHeader = '';
            this._calendarRows = [];
            this._weekDays = [];
            this._onChangeCallback = function (_) { };
            // tslint:disable-next-line
            this._onTouchedCallback = function (_) { };
        }
        Object.defineProperty(Calendar.prototype, "viewDate", {
            get: function () {
                return this._viewDate;
            },
            set: function (viewDate) {
                this._setViewDate(viewDate);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                var newDisabled = disabled != null && "" + disabled !== 'false';
                if (newDisabled !== this._disabled) {
                    this._disabled = newDisabled;
                    this._cdr.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "dateOnlyForDay", {
            get: function () {
                return this._disabled;
            },
            set: function (dateOnlyForDay) {
                this._dateOnlyForDay = dateOnlyForDay != null && "" + dateOnlyForDay !== 'false';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "viewMode", {
            get: function () {
                return this._viewMode;
            },
            set: function (viewMode) {
                this._viewMode = viewMode;
                this._buildCalendar();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "selectionMode", {
            get: function () {
                return this._selectionMode;
            },
            set: function (selectionMode) {
                this._selectionMode = selectionMode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "startOfWeekDay", {
            get: function () {
                return weekDays[this._startOfWeekDay];
            },
            set: function (weekDay) {
                this._startOfWeekDay = weekDays.indexOf(weekDay);
                if (this._viewMode === 'month') {
                    this._buildCalendar();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "isoMode", {
            get: function () {
                return this._isoMode;
            },
            set: function (isoMode) {
                this._isoMode = isoMode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "minDate", {
            get: function () {
                return this._minDate;
            },
            set: function (minDate) {
                this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "maxDate", {
            get: function () {
                return this._maxDate;
            },
            set: function (maxDate) {
                this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "change", {
            get: function () {
                return this._change;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "selectedPeriod", {
            set: function (period) {
                this._selectedPeriod = period;
                this._change.emit({ source: this, period: period });
                this._refreshSelection();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "value", {
            get: function () {
                if (this._dateOnlyForDay && this.selectionMode === 'day') {
                    return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
                }
                return this._selectedPeriod;
            },
            set: function (period) {
                if (this._dateOnlyForDay && this.selectionMode === 'day') {
                    if (period instanceof Date &&
                        (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
                        this.selectedPeriod = { type: 'day', startDate: period, endDate: period };
                        this._onChangeCallback(period);
                    }
                }
                else if (period instanceof Object && period !== this._selectedPeriod) {
                    this.selectedPeriod = period;
                    this._onChangeCallback(period);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "calendarRows", {
            get: function () {
                return this._calendarRows;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "viewHeader", {
            get: function () {
                return this._viewHeader;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "weekDays", {
            get: function () {
                return this._weekDays;
            },
            enumerable: false,
            configurable: true
        });
        Calendar.prototype.prevPage = function () {
            if (this._viewMode == 'month') {
                this.viewDate = dateFns.subMonths(this.viewDate, 1);
            }
            else if (this._viewMode == 'year') {
                this.viewDate = dateFns.subYears(this.viewDate, 1);
            }
            this._buildCalendar();
        };
        Calendar.prototype.nextPage = function () {
            if (this._viewMode == 'month') {
                this.viewDate = dateFns.addMonths(this.viewDate, 1);
            }
            else if (this._viewMode == 'year') {
                this.viewDate = dateFns.addYears(this.viewDate, 1);
            }
            this._buildCalendar();
        };
        Calendar.prototype.previousViewMode = function () {
            if (this._viewMode == 'decade') {
                return;
            }
            else if (this._viewMode == 'year') {
                this._viewMode = 'decade';
            }
            else if (this._viewMode == 'month') {
                this._viewMode = 'year';
            }
            this._buildCalendar();
        };
        Calendar.prototype.selectEntry = function (entry) {
            if (!this._canSelectEntry(entry)) {
                return this._nextViewMode(entry);
            }
            var newPeriod = null;
            if (this._isEntrySelected(entry) == 'full') {
                newPeriod = null;
            }
            else if (this._selectionMode == 'day') {
                newPeriod = { type: 'day', startDate: entry.date, endDate: entry.date };
            }
            else if (this._selectionMode == 'week') {
                newPeriod = {
                    type: 'week',
                    startDate: this._isoMode ?
                        dateFns.startOfISOWeek(entry.date) :
                        dateFns.startOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay }),
                    endDate: this._isoMode ? dateFns.endOfISOWeek(entry.date) :
                        dateFns.endOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay })
                };
            }
            else if (this._selectionMode == 'month') {
                var monthBounds = this._getMonthStartEnd(entry.date);
                newPeriod = {
                    type: 'month',
                    startDate: new Date(monthBounds.start),
                    endDate: new Date(monthBounds.end)
                };
            }
            else if (this._selectionMode == 'year') {
                newPeriod = {
                    type: 'year',
                    startDate: dateFns.startOfYear(entry.date),
                    endDate: dateFns.endOfYear(entry.date)
                };
            }
            this.value = newPeriod;
            this._cdr.markForCheck();
        };
        Calendar.prototype.registerOnChange = function (fn) {
            this._onChangeCallback = fn;
        };
        Calendar.prototype.registerOnTouched = function (fn) {
            this._onTouchedCallback = fn;
        };
        Calendar.prototype.writeValue = function (value) {
            if (typeof value === 'string') {
                value = dateFns.parseISO(value);
            }
            this.value = value;
        };
        Calendar.prototype.ngOnInit = function () {
            this._buildCalendar();
        };
        Calendar.prototype.ngAfterContentInit = function () {
            this._refreshSelection();
        };
        Calendar.prototype._setViewDate = function (date) {
            this._viewDate = date;
        };
        Calendar.prototype._getMonthStartEnd = function (date) {
            var startDate = dateFns.startOfMonth(date);
            var endDate = dateFns.endOfMonth(date);
            if (this._isoMode) {
                var startWeekDay = startDate.getDay();
                var endWeekDay = endDate.getDay();
                if (startWeekDay == 0 || startWeekDay > 4) {
                    startDate = dateFns.addWeeks(startDate, 1);
                }
                if (endWeekDay > 0 && endWeekDay < 4) {
                    endDate = dateFns.subWeeks(endDate, 1);
                }
                startDate = dateFns.startOfISOWeek(startDate);
                endDate = dateFns.endOfISOWeek(endDate);
            }
            return { start: startDate, end: endDate };
        };
        Calendar.prototype._buildCalendar = function () {
            if (this._viewMode == 'month') {
                this._buildMonthView();
            }
            else if (this._viewMode == 'year') {
                this._buildYearView();
            }
            else if (this._viewMode == 'decade') {
                this._buildDecadeView();
            }
            this._cdr.markForCheck();
        };
        Calendar.prototype._buildDecadeView = function () {
            var curYear = this._viewDate.getFullYear();
            var firstYear = curYear - (curYear % 10) + 1;
            var lastYear = firstYear + 11;
            this._viewHeader = firstYear + " - " + lastYear;
            var curDate = dateFns.startOfYear(this._viewDate);
            curDate.setFullYear(firstYear);
            var rows = [];
            for (var i = 0; i < 4; i++) {
                var row = [];
                for (var j = 0; j < 3; j++) {
                    var date = new Date(curDate);
                    var newEntry = new CalendarEntry({ type: 'year', date: date, selected: 'none' });
                    newEntry.selected = this._isEntrySelected(newEntry);
                    row.push(newEntry);
                    curDate = dateFns.addYears(curDate, 1);
                }
                rows.push(row);
            }
            this._calendarRows = rows;
        };
        Calendar.prototype._buildYearView = function () {
            this._viewHeader = "" + this._viewDate.getFullYear();
            var curDate = dateFns.startOfYear(this._viewDate);
            var rows = [];
            for (var i = 0; i < 4; i++) {
                var row = [];
                for (var j = 0; j < 3; j++) {
                    var date = new Date(curDate);
                    var newEntry = new CalendarEntry({ type: 'month', date: date, selected: 'none' });
                    newEntry.selected = this._isEntrySelected(newEntry);
                    row.push(newEntry);
                    curDate = dateFns.addMonths(curDate, 1);
                }
                rows.push(row);
            }
            this._calendarRows = rows;
        };
        Calendar.prototype._buildMonthView = function () {
            this._viewHeader = dateFns.format(this._viewDate, 'MMM yyyy');
            this._buildMonthViewWeekDays();
            var monthBounds = this._getMonthStartEnd(this._viewDate);
            var viewStartDate = new Date(monthBounds.start);
            var viewEndDate = new Date(monthBounds.end);
            if (!this._isoMode) {
                viewStartDate = dateFns.startOfWeek(viewStartDate);
                viewEndDate = dateFns.endOfWeek(viewEndDate);
            }
            var rows = [];
            var todayDate = new Date();
            var curDate = new Date(viewStartDate);
            var minDate = this.minDate == null ? null : new Date(this.minDate);
            var maxDate = this.maxDate == null ? null : new Date(this.maxDate);
            while (curDate < viewEndDate) {
                var row = [];
                for (var i = 0; i < 7; i++) {
                    var disabled = (minDate != null && dateFns.isBefore(curDate, minDate)) ||
                        (maxDate != null && dateFns.isAfter(curDate, maxDate));
                    var date = new Date(curDate);
                    var newEntry = new CalendarEntry({
                        type: 'day',
                        date: date,
                        selected: 'none',
                        highlight: dateFns.format(todayDate, 'yyyy-MM-dd') === dateFns.format(curDate, 'yyyy-MM-dd'),
                        disabled: disabled
                    });
                    newEntry.selected = this._isEntrySelected(newEntry);
                    row.push(newEntry);
                    curDate = dateFns.addDays(curDate, 1);
                }
                rows.push(row);
            }
            this._calendarRows = rows;
        };
        Calendar.prototype._buildMonthViewWeekDays = function () {
            var curDate;
            if (this._isoMode) {
                curDate = dateFns.setISODay(dateFns.startOfWeek(this._viewDate), 1);
            }
            else {
                curDate = dateFns.startOfWeek(this._viewDate);
            }
            var weekDayNames = [];
            for (var i = 0; i < 7; i++) {
                weekDayNames.push(dateFns.format(curDate, 'EEE'));
                curDate = dateFns.addDays(curDate, 1);
            }
            this._weekDays = weekDayNames;
            this._cdr.markForCheck();
        };
        Calendar.prototype._periodOrder = function (entryType) {
            return ['day', 'week', 'month', 'year'].indexOf(entryType);
        };
        Calendar.prototype._isEntrySelected = function (entry) {
            if (this._selectedPeriod != null && this._selectedPeriod.startDate != null &&
                this._selectedPeriod.endDate != null) {
                var selectionStart = dateFns.startOfDay(this._selectedPeriod.startDate);
                var selectionEnd = dateFns.endOfDay(this._selectedPeriod.endDate);
                var selectionPeriodOrder = this._periodOrder(this._selectedPeriod.type);
                var entryPeriodOrder = this._periodOrder(entry.type);
                var entryRange = entry.getRange();
                if (entryPeriodOrder <= selectionPeriodOrder &&
                    this._isBetween(entryRange.start, selectionStart, selectionEnd) &&
                    this._isBetween(entryRange.end, selectionStart, selectionEnd)) {
                    return 'full';
                }
                else if (entryPeriodOrder > selectionPeriodOrder &&
                    this._isBetween(selectionStart, entryRange.start, entryRange.end) &&
                    this._isBetween(selectionEnd, entryRange.start, entryRange.end)) {
                    return 'partial';
                }
            }
            return 'none';
        };
        Calendar.prototype._isBetween = function (date, rangeLeft, rangeRight) {
            return (dateFns.isAfter(date, rangeLeft) || dateFns.isSameDay(date, rangeLeft)) &&
                (dateFns.isBefore(date, rangeRight) || dateFns.isSameDay(date, rangeRight));
        };
        Calendar.prototype._refreshSelection = function () {
            var e_1, _a, e_2, _b;
            try {
                for (var _c = __values(this._calendarRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var row = _d.value;
                    try {
                        for (var row_1 = (e_2 = void 0, __values(row)), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                            var entry = row_1_1.value;
                            entry.selected = this._isEntrySelected(entry);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (row_1_1 && !row_1_1.done && (_b = row_1.return)) _b.call(row_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        Calendar.prototype._canSelectEntry = function (entry) {
            if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
                return false;
            }
            if (this._selectionMode == 'month' && entry.type == 'year') {
                return false;
            }
            return true;
        };
        Calendar.prototype._nextViewMode = function (entry) {
            if (this._viewMode == 'decade') {
                this._viewMode = 'year';
            }
            else if (this._viewMode == 'year') {
                this._viewMode = 'month';
            }
            else if (this._viewMode == 'month') {
                return;
            }
            this._viewDate = entry.date;
            this._buildCalendar();
        };
        return Calendar;
    }());
    Calendar.decorators = [
        { type: core.Directive }
    ];
    Calendar.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    Calendar.propDecorators = {
        viewDate: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        dateOnlyForDay: [{ type: core.Input }],
        viewMode: [{ type: core.Input }],
        selectionMode: [{ type: core.Input }],
        startOfWeekDay: [{ type: core.Input }],
        isoMode: [{ type: core.Input }],
        minDate: [{ type: core.Input }],
        maxDate: [{ type: core.Input }],
        change: [{ type: core.Output }],
        selectedPeriod: [{ type: core.Input }]
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

    exports.CALENDAR_CONTROL_VALUE_ACCESSOR = CALENDAR_CONTROL_VALUE_ACCESSOR;
    exports.Calendar = Calendar;
    exports.CalendarChange = CalendarChange;
    exports.CalendarEntry = CalendarEntry;
    exports.CalendarPeriod = CalendarPeriod;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-calendar.umd.js.map
