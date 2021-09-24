import { forwardRef, EventEmitter, Directive, ChangeDetectorRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, startOfMonth, startOfYear, endOfMonth, endOfYear, subMonths, subYears, addMonths, addYears, startOfISOWeek, startOfWeek, endOfISOWeek, endOfWeek, parseISO, addWeeks, subWeeks, isBefore, isAfter, addDays, setISODay, startOfDay, endOfDay, isSameDay } from 'date-fns';
import 'rxjs';

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
const CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
const weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
class CalendarPeriod {
}
class CalendarChange {
}
class CalendarEntry {
    constructor(params) {
        this.disabled = false;
        this.highlight = false;
        let keys = Object.keys(params);
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
    toString() {
        if (this.type === 'day') {
            return `${this.date.getDate()}`;
        }
        if (this.type === 'month') {
            return format(this.date, 'MMM');
        }
        return `${this.date.getFullYear()}`;
    }
    getRange() {
        if (this.type === 'day') {
            return { start: new Date(this.date), end: new Date(this.date) };
        }
        else {
            let curDate = new Date(this.date);
            return {
                start: this.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                end: this.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
            };
        }
    }
}
class Calendar {
    constructor(_cdr) {
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
        this._onChangeCallback = (_) => { };
        // tslint:disable-next-line
        this._onTouchedCallback = (_) => { };
    }
    get viewDate() {
        return this._viewDate;
    }
    set viewDate(viewDate) {
        this._setViewDate(viewDate);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        const newDisabled = disabled != null && `${disabled}` !== 'false';
        if (newDisabled !== this._disabled) {
            this._disabled = newDisabled;
            this._cdr.markForCheck();
        }
    }
    get dateOnlyForDay() {
        return this._disabled;
    }
    set dateOnlyForDay(dateOnlyForDay) {
        this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
    }
    get viewMode() {
        return this._viewMode;
    }
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this._buildCalendar();
    }
    get selectionMode() {
        return this._selectionMode;
    }
    set selectionMode(selectionMode) {
        this._selectionMode = selectionMode;
    }
    get startOfWeekDay() {
        return weekDays[this._startOfWeekDay];
    }
    set startOfWeekDay(weekDay) {
        this._startOfWeekDay = weekDays.indexOf(weekDay);
        if (this._viewMode === 'month') {
            this._buildCalendar();
        }
    }
    get isoMode() {
        return this._isoMode;
    }
    set isoMode(isoMode) {
        this._isoMode = isoMode;
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(minDate) {
        this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(maxDate) {
        this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
    }
    get change() {
        return this._change;
    }
    set selectedPeriod(period) {
        this._selectedPeriod = period;
        this._change.emit({ source: this, period: period });
        this._refreshSelection();
    }
    get value() {
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
        }
        return this._selectedPeriod;
    }
    set value(period) {
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
    }
    get calendarRows() {
        return this._calendarRows;
    }
    get viewHeader() {
        return this._viewHeader;
    }
    get weekDays() {
        return this._weekDays;
    }
    prevPage() {
        if (this._viewMode == 'month') {
            this.viewDate = subMonths(this.viewDate, 1);
        }
        else if (this._viewMode == 'year') {
            this.viewDate = subYears(this.viewDate, 1);
        }
        this._buildCalendar();
    }
    nextPage() {
        if (this._viewMode == 'month') {
            this.viewDate = addMonths(this.viewDate, 1);
        }
        else if (this._viewMode == 'year') {
            this.viewDate = addYears(this.viewDate, 1);
        }
        this._buildCalendar();
    }
    previousViewMode() {
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
    }
    selectEntry(entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        let newPeriod = null;
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
                    startOfISOWeek(entry.date) :
                    startOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay }),
                endDate: this._isoMode ? endOfISOWeek(entry.date) :
                    endOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay })
            };
        }
        else if (this._selectionMode == 'month') {
            const monthBounds = this._getMonthStartEnd(entry.date);
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
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    writeValue(value) {
        if (typeof value === 'string') {
            value = parseISO(value);
        }
        this.value = value;
    }
    ngOnInit() {
        this._buildCalendar();
    }
    ngAfterContentInit() {
        this._refreshSelection();
    }
    _setViewDate(date) {
        this._viewDate = date;
    }
    _getMonthStartEnd(date) {
        let startDate = startOfMonth(date);
        let endDate = endOfMonth(date);
        if (this._isoMode) {
            const startWeekDay = startDate.getDay();
            const endWeekDay = endDate.getDay();
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
    }
    _buildCalendar() {
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
    }
    _buildDecadeView() {
        let curYear = this._viewDate.getFullYear();
        let firstYear = curYear - (curYear % 10) + 1;
        let lastYear = firstYear + 11;
        this._viewHeader = `${firstYear} - ${lastYear}`;
        let curDate = startOfYear(this._viewDate);
        curDate.setFullYear(firstYear);
        let rows = [];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                let date = new Date(curDate);
                let newEntry = new CalendarEntry({ type: 'year', date: date, selected: 'none' });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addYears(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }
    _buildYearView() {
        this._viewHeader = `${this._viewDate.getFullYear()}`;
        let curDate = startOfYear(this._viewDate);
        let rows = [];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                let date = new Date(curDate);
                let newEntry = new CalendarEntry({ type: 'month', date: date, selected: 'none' });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addMonths(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }
    _buildMonthView() {
        this._viewHeader = format(this._viewDate, 'MMM yyyy');
        this._buildMonthViewWeekDays();
        const monthBounds = this._getMonthStartEnd(this._viewDate);
        let viewStartDate = new Date(monthBounds.start);
        let viewEndDate = new Date(monthBounds.end);
        if (!this._isoMode) {
            viewStartDate = startOfWeek(viewStartDate);
            viewEndDate = endOfWeek(viewEndDate);
        }
        let rows = [];
        let todayDate = new Date();
        let curDate = new Date(viewStartDate);
        let minDate = this.minDate == null ? null : new Date(this.minDate);
        let maxDate = this.maxDate == null ? null : new Date(this.maxDate);
        while (curDate < viewEndDate) {
            let row = [];
            for (let i = 0; i < 7; i++) {
                let disabled = (minDate != null && isBefore(curDate, minDate)) ||
                    (maxDate != null && isAfter(curDate, maxDate));
                let date = new Date(curDate);
                let newEntry = new CalendarEntry({
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight: format(todayDate, 'yyyy-MM-dd') === format(curDate, 'yyyy-MM-dd'),
                    disabled: disabled
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addDays(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }
    _buildMonthViewWeekDays() {
        let curDate;
        if (this._isoMode) {
            curDate = setISODay(startOfWeek(this._viewDate), 1);
        }
        else {
            curDate = startOfWeek(this._viewDate);
        }
        let weekDayNames = [];
        for (let i = 0; i < 7; i++) {
            weekDayNames.push(format(curDate, 'EEE'));
            curDate = addDays(curDate, 1);
        }
        this._weekDays = weekDayNames;
        this._cdr.markForCheck();
    }
    _periodOrder(entryType) {
        return ['day', 'week', 'month', 'year'].indexOf(entryType);
    }
    _isEntrySelected(entry) {
        if (this._selectedPeriod != null && this._selectedPeriod.startDate != null &&
            this._selectedPeriod.endDate != null) {
            let selectionStart = startOfDay(this._selectedPeriod.startDate);
            let selectionEnd = endOfDay(this._selectedPeriod.endDate);
            let selectionPeriodOrder = this._periodOrder(this._selectedPeriod.type);
            let entryPeriodOrder = this._periodOrder(entry.type);
            let entryRange = entry.getRange();
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
    }
    _isBetween(date, rangeLeft, rangeRight) {
        return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft)) &&
            (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
    }
    _refreshSelection() {
        for (let row of this._calendarRows) {
            for (let entry of row) {
                entry.selected = this._isEntrySelected(entry);
            }
        }
    }
    _canSelectEntry(entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
            return false;
        }
        if (this._selectionMode == 'month' && entry.type == 'year') {
            return false;
        }
        return true;
    }
    _nextViewMode(entry) {
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
    }
}
Calendar.decorators = [
    { type: Directive }
];
Calendar.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
Calendar.propDecorators = {
    viewDate: [{ type: Input }],
    disabled: [{ type: Input }],
    dateOnlyForDay: [{ type: Input }],
    viewMode: [{ type: Input }],
    selectionMode: [{ type: Input }],
    startOfWeekDay: [{ type: Input }],
    isoMode: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    change: [{ type: Output }],
    selectedPeriod: [{ type: Input }]
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

export { CALENDAR_CONTROL_VALUE_ACCESSOR, Calendar, CalendarChange, CalendarEntry, CalendarPeriod };
//# sourceMappingURL=calendar.js.map
