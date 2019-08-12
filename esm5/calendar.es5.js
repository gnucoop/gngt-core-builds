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
import { forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, startOfMonth, startOfYear, endOfMonth, endOfYear, subMonths, subYears, addMonths, addYears, startOfISOWeek, startOfWeek, endOfISOWeek, endOfWeek, parse, addWeeks, subWeeks, isBefore, isAfter, addDays, setISODay, startOfDay, endOfDay, isSameDay } from 'date-fns';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return Calendar; })),
    multi: true
};
/** @type {?} */
var weekDays = [
    '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
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
        /** @type {?} */
        var keys = Object.keys(params);
        this.type = params.type;
        this.date = params.date;
        this.selected = params.selected;
        if (keys.indexOf('disabled') > -1) {
            this.disabled = (/** @type {?} */ (params.disabled));
        }
        if (keys.indexOf('highlight') > -1) {
            this.highlight = (/** @type {?} */ (params.highlight));
        }
    }
    /**
     * @return {?}
     */
    CalendarEntry.prototype.toString = /**
     * @return {?}
     */
    function () {
        if (this.type === 'day') {
            return "" + this.date.getDate();
        }
        if (this.type === 'month') {
            return format(this.date, 'MMM');
        }
        return "" + this.date.getFullYear();
    };
    /**
     * @return {?}
     */
    CalendarEntry.prototype.getRange = /**
     * @return {?}
     */
    function () {
        if (this.type === 'day') {
            return { start: new Date(this.date), end: new Date(this.date) };
        }
        else {
            /** @type {?} */
            var curDate = new Date(this.date);
            return {
                start: this.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                end: this.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
            };
        }
    };
    return CalendarEntry;
}());
/**
 * @abstract
 */
var  /**
 * @abstract
 */
Calendar = /** @class */ (function () {
    function Calendar(_cdr) {
        this._cdr = _cdr;
        this._disabled = false;
        this._dateOnlyForDay = false;
        this._viewMode = 'month';
        this._selectionMode = 'day';
        this._startOfWeekDay = 1;
        this._isoMode = false;
        this._change = new EventEmitter();
        this._viewDate = new Date();
        this._viewHeader = '';
        this._calendarRows = [];
        this._weekDays = [];
        this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        // tslint:disable-next-line
        this._onTouchedCallback = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
    }
    Object.defineProperty(Calendar.prototype, "viewDate", {
        get: /**
         * @return {?}
         */
        function () { return this._viewDate; },
        set: /**
         * @param {?} viewDate
         * @return {?}
         */
        function (viewDate) { this._setViewDate(viewDate); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            /** @type {?} */
            var newDisabled = disabled != null && "" + disabled !== 'false';
            if (newDisabled !== this._disabled) {
                this._disabled = newDisabled;
                this._cdr.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "dateOnlyForDay", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} dateOnlyForDay
         * @return {?}
         */
        function (dateOnlyForDay) {
            this._dateOnlyForDay = dateOnlyForDay != null && "" + dateOnlyForDay !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "viewMode", {
        get: /**
         * @return {?}
         */
        function () { return this._viewMode; },
        set: /**
         * @param {?} viewMode
         * @return {?}
         */
        function (viewMode) {
            this._viewMode = viewMode;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "selectionMode", {
        get: /**
         * @return {?}
         */
        function () { return this._selectionMode; },
        set: /**
         * @param {?} selectionMode
         * @return {?}
         */
        function (selectionMode) {
            this._selectionMode = selectionMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "startOfWeekDay", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (weekDays[this._startOfWeekDay]));
        },
        set: /**
         * @param {?} weekDay
         * @return {?}
         */
        function (weekDay) {
            this._startOfWeekDay = weekDays.indexOf(weekDay);
            if (this._viewMode === 'month') {
                this._buildCalendar();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "isoMode", {
        get: /**
         * @return {?}
         */
        function () { return this._isoMode; },
        set: /**
         * @param {?} isoMode
         * @return {?}
         */
        function (isoMode) { this._isoMode = isoMode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "minDate", {
        get: /**
         * @return {?}
         */
        function () { return this._minDate; },
        set: /**
         * @param {?} minDate
         * @return {?}
         */
        function (minDate) {
            this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "maxDate", {
        get: /**
         * @return {?}
         */
        function () { return this._maxDate; },
        set: /**
         * @param {?} maxDate
         * @return {?}
         */
        function (maxDate) {
            this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "change", {
        get: /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "selectedPeriod", {
        set: /**
         * @private
         * @param {?} period
         * @return {?}
         */
        function (period) {
            this._selectedPeriod = period;
            this._change.emit({
                source: this,
                period: period
            });
            this._refreshSelection();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
            }
            return this._selectedPeriod;
        },
        set: /**
         * @param {?} period
         * @return {?}
         */
        function (period) {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                if (period instanceof Date &&
                    (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
                    this.selectedPeriod = {
                        type: 'day',
                        startDate: period,
                        endDate: period
                    };
                    this._onChangeCallback(period);
                }
            }
            else if (period instanceof Object && period !== this._selectedPeriod) {
                this.selectedPeriod = (/** @type {?} */ (period));
                this._onChangeCallback(period);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "calendarRows", {
        get: /**
         * @return {?}
         */
        function () { return this._calendarRows; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "viewHeader", {
        get: /**
         * @return {?}
         */
        function () { return this._viewHeader; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "weekDays", {
        get: /**
         * @return {?}
         */
        function () { return this._weekDays; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Calendar.prototype.prevPage = /**
     * @return {?}
     */
    function () {
        if (this._viewMode == 'month') {
            this.viewDate = subMonths(this.viewDate, 1);
        }
        else if (this._viewMode == 'year') {
            this.viewDate = subYears(this.viewDate, 1);
        }
        this._buildCalendar();
    };
    /**
     * @return {?}
     */
    Calendar.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        if (this._viewMode == 'month') {
            this.viewDate = addMonths(this.viewDate, 1);
        }
        else if (this._viewMode == 'year') {
            this.viewDate = addYears(this.viewDate, 1);
        }
        this._buildCalendar();
    };
    /**
     * @return {?}
     */
    Calendar.prototype.previousViewMode = /**
     * @return {?}
     */
    function () {
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
    /**
     * @param {?} entry
     * @return {?}
     */
    Calendar.prototype.selectEntry = /**
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        /** @type {?} */
        var newPeriod = null;
        if (this._isEntrySelected(entry) == 'full') {
            newPeriod = null;
        }
        else if (this._selectionMode == 'day') {
            newPeriod = {
                type: 'day',
                startDate: entry.date,
                endDate: entry.date
            };
        }
        else if (this._selectionMode == 'week') {
            newPeriod = {
                type: 'week',
                startDate: this._isoMode ?
                    startOfISOWeek(entry.date) :
                    startOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay }),
                endDate: this._isoMode ?
                    endOfISOWeek(entry.date) :
                    endOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay })
            };
        }
        else if (this._selectionMode == 'month') {
            /** @type {?} */
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
                startDate: startOfYear(entry.date),
                endDate: endOfYear(entry.date)
            };
        }
        this.value = newPeriod;
        this._cdr.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Calendar.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Calendar.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedCallback = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Calendar.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            value = parse(value);
        }
        this.value = value;
    };
    /**
     * @return {?}
     */
    Calendar.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._buildCalendar();
    };
    /**
     * @return {?}
     */
    Calendar.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._refreshSelection();
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    Calendar.prototype._setViewDate = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this._viewDate = date;
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    Calendar.prototype._getMonthStartEnd = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var startDate = startOfMonth(date);
        /** @type {?} */
        var endDate = endOfMonth(date);
        if (this._isoMode) {
            /** @type {?} */
            var startWeekDay = startDate.getDay();
            /** @type {?} */
            var endWeekDay = endDate.getDay();
            if (startWeekDay == 0 || startWeekDay > 4) {
                startDate = addWeeks(startDate, 1);
            }
            if (endWeekDay > 0 && endWeekDay < 4) {
                endDate = subWeeks(endDate, 1);
            }
            startDate = startOfISOWeek(startDate);
            endDate = endOfISOWeek(endDate);
        }
        return { start: startDate, end: endDate };
    };
    /**
     * @private
     * @return {?}
     */
    Calendar.prototype._buildCalendar = /**
     * @private
     * @return {?}
     */
    function () {
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
    /**
     * @private
     * @return {?}
     */
    Calendar.prototype._buildDecadeView = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var curYear = this._viewDate.getFullYear();
        /** @type {?} */
        var firstYear = curYear - (curYear % 10) + 1;
        /** @type {?} */
        var lastYear = firstYear + 11;
        this._viewHeader = firstYear + " - " + lastYear;
        /** @type {?} */
        var curDate = startOfYear(this._viewDate);
        curDate.setFullYear(firstYear);
        /** @type {?} */
        var rows = [];
        for (var i = 0; i < 4; i++) {
            /** @type {?} */
            var row = [];
            for (var j = 0; j < 3; j++) {
                /** @type {?} */
                var date = new Date(curDate);
                /** @type {?} */
                var newEntry = new CalendarEntry({
                    type: 'year',
                    date: date,
                    selected: 'none'
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addYears(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    };
    /**
     * @private
     * @return {?}
     */
    Calendar.prototype._buildYearView = /**
     * @private
     * @return {?}
     */
    function () {
        this._viewHeader = "" + this._viewDate.getFullYear();
        /** @type {?} */
        var curDate = startOfYear(this._viewDate);
        /** @type {?} */
        var rows = [];
        for (var i = 0; i < 4; i++) {
            /** @type {?} */
            var row = [];
            for (var j = 0; j < 3; j++) {
                /** @type {?} */
                var date = new Date(curDate);
                /** @type {?} */
                var newEntry = new CalendarEntry({
                    type: 'month',
                    date: date,
                    selected: 'none'
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addMonths(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    };
    /**
     * @private
     * @return {?}
     */
    Calendar.prototype._buildMonthView = /**
     * @private
     * @return {?}
     */
    function () {
        this._viewHeader = format(this._viewDate, 'MMM YYYY');
        this._buildMonthViewWeekDays();
        /** @type {?} */
        var monthBounds = this._getMonthStartEnd(this._viewDate);
        /** @type {?} */
        var viewStartDate = new Date(monthBounds.start);
        /** @type {?} */
        var viewEndDate = new Date(monthBounds.end);
        if (!this._isoMode) {
            viewStartDate = startOfWeek(viewStartDate);
            viewEndDate = endOfWeek(viewEndDate);
        }
        /** @type {?} */
        var rows = [];
        /** @type {?} */
        var todayDate = new Date();
        /** @type {?} */
        var curDate = new Date(viewStartDate);
        /** @type {?} */
        var minDate = this.minDate == null ? null : new Date(this.minDate);
        /** @type {?} */
        var maxDate = this.maxDate == null ? null : new Date(this.maxDate);
        while (curDate < viewEndDate) {
            /** @type {?} */
            var row = [];
            for (var i = 0; i < 7; i++) {
                /** @type {?} */
                var disabled = (minDate != null && isBefore(curDate, minDate)) ||
                    (maxDate != null && isAfter(curDate, maxDate));
                /** @type {?} */
                var date = new Date(curDate);
                /** @type {?} */
                var newEntry = new CalendarEntry({
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight: format(todayDate, 'YYYY-MM-DD') === format(curDate, 'YYYY-MM-DD'),
                    disabled: disabled
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addDays(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    };
    /**
     * @private
     * @return {?}
     */
    Calendar.prototype._buildMonthViewWeekDays = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var curDate;
        if (this._isoMode) {
            curDate = setISODay(startOfWeek(this._viewDate), 1);
        }
        else {
            curDate = startOfWeek(this._viewDate);
        }
        /** @type {?} */
        var weekDayNames = [];
        for (var i = 0; i < 7; i++) {
            weekDayNames.push(format(curDate, 'dddd'));
            curDate = addDays(curDate, 1);
        }
        this._weekDays = weekDayNames;
        this._cdr.markForCheck();
    };
    /**
     * @private
     * @param {?} entryType
     * @return {?}
     */
    Calendar.prototype._periodOrder = /**
     * @private
     * @param {?} entryType
     * @return {?}
     */
    function (entryType) {
        return ['day', 'week', 'month', 'year'].indexOf(entryType);
    };
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    Calendar.prototype._isEntrySelected = /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (this._selectedPeriod != null && this._selectedPeriod.startDate != null &&
            this._selectedPeriod.endDate != null) {
            /** @type {?} */
            var selectionStart = startOfDay(this._selectedPeriod.startDate);
            /** @type {?} */
            var selectionEnd = endOfDay(this._selectedPeriod.endDate);
            /** @type {?} */
            var selectionPeriodOrder = this._periodOrder(this._selectedPeriod.type);
            /** @type {?} */
            var entryPeriodOrder = this._periodOrder(entry.type);
            /** @type {?} */
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
    /**
     * @private
     * @param {?} date
     * @param {?} rangeLeft
     * @param {?} rangeRight
     * @return {?}
     */
    Calendar.prototype._isBetween = /**
     * @private
     * @param {?} date
     * @param {?} rangeLeft
     * @param {?} rangeRight
     * @return {?}
     */
    function (date, rangeLeft, rangeRight) {
        return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft))
            && (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
    };
    /**
     * @private
     * @return {?}
     */
    Calendar.prototype._refreshSelection = /**
     * @private
     * @return {?}
     */
    function () {
        for (var _i = 0, _a = this._calendarRows; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var entry = row_1[_b];
                entry.selected = this._isEntrySelected(entry);
            }
        }
    };
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    Calendar.prototype._canSelectEntry = /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
            return false;
        }
        if (this._selectionMode == 'month' && entry.type == 'year') {
            return false;
        }
        return true;
    };
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    Calendar.prototype._nextViewMode = /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
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

export { CALENDAR_CONTROL_VALUE_ACCESSOR, Calendar, CalendarChange, CalendarEntry, CalendarPeriod };
//# sourceMappingURL=calendar.es5.js.map
