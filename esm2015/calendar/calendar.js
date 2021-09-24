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
import { ChangeDetectorRef, Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { addDays, addMonths, addWeeks, addYears, endOfDay, endOfISOWeek, endOfMonth, endOfWeek, endOfYear, format, isAfter, isBefore, isSameDay, parseISO, setISODay, startOfDay, startOfISOWeek, startOfMonth, startOfWeek, startOfYear, subMonths, subWeeks, subYears } from 'date-fns';
import { Observable } from 'rxjs';
export const CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
const weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export class CalendarPeriod {
}
export class CalendarChange {
}
export class CalendarEntry {
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
export class Calendar {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUNMLE9BQU8sRUFDUCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsU0FBUyxFQUNULFVBQVUsRUFDVixjQUFjLEVBQ2QsWUFBWSxFQUNaLFdBQVcsRUFDWCxXQUFXLEVBQ1gsU0FBUyxFQUNULFFBQVEsRUFDUixRQUFRLEVBQ1QsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdoQyxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUNWLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBU3ZGLE1BQU0sT0FBTyxjQUFjO0NBSTFCO0FBRUQsTUFBTSxPQUFPLGNBQWM7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Q0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQW9CO1FBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDNUUsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDMUQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLGFBQWEsQ0FBQyxLQUFvQjtRQUN4QyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUMxQjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7WUFqYkYsU0FBUzs7O1lBbEhSLGlCQUFpQjs7O3VCQXVIaEIsS0FBSzt1QkFTTCxLQUFLOzZCQWFMLEtBQUs7dUJBU0wsS0FBSzs0QkFVTCxLQUFLOzZCQVNMLEtBQUs7c0JBY0wsS0FBSztzQkFTTCxLQUFLO3NCQVNMLEtBQUs7cUJBTUwsTUFBTTs2QkFNTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBhZGREYXlzLFxuICBhZGRNb250aHMsXG4gIGFkZFdlZWtzLFxuICBhZGRZZWFycyxcbiAgZW5kT2ZEYXksXG4gIGVuZE9mSVNPV2VlayxcbiAgZW5kT2ZNb250aCxcbiAgZW5kT2ZXZWVrLFxuICBlbmRPZlllYXIsXG4gIGZvcm1hdCxcbiAgaXNBZnRlcixcbiAgaXNCZWZvcmUsXG4gIGlzU2FtZURheSxcbiAgcGFyc2VJU08sXG4gIHNldElTT0RheSxcbiAgc3RhcnRPZkRheSxcbiAgc3RhcnRPZklTT1dlZWssXG4gIHN0YXJ0T2ZNb250aCxcbiAgc3RhcnRPZldlZWssXG4gIHN0YXJ0T2ZZZWFyLFxuICBzdWJNb250aHMsXG4gIHN1YldlZWtzLFxuICBzdWJZZWFyc1xufSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5cbmV4cG9ydCBjb25zdCBDQUxFTkRBUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDYWxlbmRhciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5jb25zdCB3ZWVrRGF5czogc3RyaW5nW10gPVxuICAgIFsnJywgJ21vbmRheScsICd0dWVzZGF5JywgJ3dlZG5lc2RheScsICd0aHVyc2RheScsICdmcmlkYXknLCAnc2F0dXJkYXknLCAnc3VuZGF5J107XG5cbmV4cG9ydCB0eXBlIENhbGVuZGFyVmlld01vZGUgPSAoJ21vbnRoJ3wneWVhcid8J2RlY2FkZScpO1xuZXhwb3J0IHR5cGUgQ2FsZW5kYXJQZXJpb2RUeXBlID0gKCdkYXknfCd3ZWVrJ3wnbW9udGgnfCd5ZWFyJyk7XG5leHBvcnQgdHlwZSBDYWxlbmRhckVudHJ5VHlwZSA9ICgnZGF5J3wnbW9udGgnfCd5ZWFyJyk7XG5leHBvcnQgdHlwZSBDYWxlbmRhcldlZWtEYXkgPVxuICAgICgnbW9uZGF5J3wndHVlc2RheSd8J3dlZG5lc2RheSd8J3RodXJzZGF5J3wnZnJpZGF5J3wnc2F0dXJkYXknfCdzdW5kYXknKTtcbmV4cG9ydCB0eXBlIENhbGVuZGFyRW50cnlTZWxlY3RlZFN0YXRlID0gKCdub25lJ3wncGFydGlhbCd8J2Z1bGwnKTtcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUGVyaW9kIHtcbiAgdHlwZTogQ2FsZW5kYXJQZXJpb2RUeXBlO1xuICBzdGFydERhdGU6IERhdGU7XG4gIGVuZERhdGU6IERhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNoYW5nZSB7XG4gIHNvdXJjZTogQ2FsZW5kYXI7XG4gIHBlcmlvZDogQ2FsZW5kYXJQZXJpb2R8bnVsbDtcbn1cblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRW50cnkge1xuICB0eXBlOiBDYWxlbmRhckVudHJ5VHlwZTtcbiAgZGF0ZTogRGF0ZTtcbiAgc2VsZWN0ZWQ6IENhbGVuZGFyRW50cnlTZWxlY3RlZFN0YXRlO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICBoaWdobGlnaHQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICB0eXBlOiBDYWxlbmRhckVudHJ5VHlwZSxcbiAgICBkYXRlOiBEYXRlLFxuICAgIHNlbGVjdGVkOiBDYWxlbmRhckVudHJ5U2VsZWN0ZWRTdGF0ZSxcbiAgICBoaWdobGlnaHQ/OiBib29sZWFuLFxuICAgIGRpc2FibGVkPzogYm9vbGVhblxuICB9KSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuXG4gICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGU7XG4gICAgdGhpcy5kYXRlID0gcGFyYW1zLmRhdGU7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHBhcmFtcy5zZWxlY3RlZDtcbiAgICBpZiAoa2V5cy5pbmRleE9mKCdkaXNhYmxlZCcpID4gLTEpIHtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBwYXJhbXMuZGlzYWJsZWQhO1xuICAgIH1cbiAgICBpZiAoa2V5cy5pbmRleE9mKCdoaWdobGlnaHQnKSA+IC0xKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodCA9IHBhcmFtcy5oaWdobGlnaHQhO1xuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmRhdGUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiBmb3JtYXQodGhpcy5kYXRlLCAnTU1NJyk7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKX1gO1xuICB9XG5cbiAgZ2V0UmFuZ2UoKToge3N0YXJ0OiBEYXRlLCBlbmQ6IERhdGV9IHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnZGF5Jykge1xuICAgICAgcmV0dXJuIHtzdGFydDogbmV3IERhdGUodGhpcy5kYXRlKSwgZW5kOiBuZXcgRGF0ZSh0aGlzLmRhdGUpfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1ckRhdGU6IERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IHRoaXMudHlwZSA9PT0gJ21vbnRoJyA/IHN0YXJ0T2ZNb250aChjdXJEYXRlKSA6IHN0YXJ0T2ZZZWFyKGN1ckRhdGUpLFxuICAgICAgICBlbmQ6IHRoaXMudHlwZSA9PT0gJ21vbnRoJyA/IGVuZE9mTW9udGgoY3VyRGF0ZSkgOiBlbmRPZlllYXIoY3VyRGF0ZSlcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhbGVuZGFyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIGdldCB2aWV3RGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0RhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5fc2V0Vmlld0RhdGUodmlld0RhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBuZXdEaXNhYmxlZCA9IGRpc2FibGVkICE9IG51bGwgJiYgYCR7ZGlzYWJsZWR9YCAhPT0gJ2ZhbHNlJztcbiAgICBpZiAobmV3RGlzYWJsZWQgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld0Rpc2FibGVkO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RhdGVPbmx5Rm9yRGF5ID0gZmFsc2U7XG4gIGdldCBkYXRlT25seUZvckRheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRhdGVPbmx5Rm9yRGF5KGRhdGVPbmx5Rm9yRGF5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGF0ZU9ubHlGb3JEYXkgPSBkYXRlT25seUZvckRheSAhPSBudWxsICYmIGAke2RhdGVPbmx5Rm9yRGF5fWAgIT09ICdmYWxzZSc7XG4gIH1cblxuICBwcml2YXRlIF92aWV3TW9kZTogQ2FsZW5kYXJWaWV3TW9kZSA9ICdtb250aCc7XG4gIGdldCB2aWV3TW9kZSgpOiBDYWxlbmRhclZpZXdNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZpZXdNb2RlKHZpZXdNb2RlOiBDYWxlbmRhclZpZXdNb2RlKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlOiBDYWxlbmRhclBlcmlvZFR5cGUgPSAnZGF5JztcbiAgZ2V0IHNlbGVjdGlvbk1vZGUoKTogQ2FsZW5kYXJQZXJpb2RUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlOiBDYWxlbmRhclBlcmlvZFR5cGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0YXJ0T2ZXZWVrRGF5ID0gMTtcbiAgZ2V0IHN0YXJ0T2ZXZWVrRGF5KCk6IENhbGVuZGFyV2Vla0RheSB7XG4gICAgcmV0dXJuIDxDYWxlbmRhcldlZWtEYXk+d2Vla0RheXNbdGhpcy5fc3RhcnRPZldlZWtEYXldO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBzdGFydE9mV2Vla0RheSh3ZWVrRGF5OiBDYWxlbmRhcldlZWtEYXkpIHtcbiAgICB0aGlzLl9zdGFydE9mV2Vla0RheSA9IHdlZWtEYXlzLmluZGV4T2Yod2Vla0RheSk7XG5cbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT09ICdtb250aCcpIHtcbiAgICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc29Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGlzb01vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzb01vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGlzb01vZGUoaXNvTW9kZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzb01vZGUgPSBpc29Nb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZTogRGF0ZXxudWxsO1xuICBnZXQgbWluRGF0ZSgpOiBEYXRlfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBtaW5EYXRlKG1pbkRhdGU6IERhdGV8bnVsbCkge1xuICAgIHRoaXMuX21pbkRhdGUgPSBtaW5EYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtaW5EYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRGF0ZXxudWxsO1xuICBnZXQgbWF4RGF0ZSgpOiBEYXRlfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBtYXhEYXRlKG1heERhdGU6IERhdGV8bnVsbCkge1xuICAgIHRoaXMuX21heERhdGUgPSBtYXhEYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtYXhEYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckNoYW5nZT4oKTtcbiAgQE91dHB1dCgpXG4gIGdldCBjaGFuZ2UoKTogT2JzZXJ2YWJsZTxDYWxlbmRhckNoYW5nZT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UgYXMgT2JzZXJ2YWJsZTxDYWxlbmRhckNoYW5nZT47XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogQ2FsZW5kYXJQZXJpb2R8bnVsbDtcbiAgQElucHV0KClcbiAgc2V0IHNlbGVjdGVkUGVyaW9kKHBlcmlvZDogQ2FsZW5kYXJQZXJpb2R8bnVsbCkge1xuICAgIHRoaXMuX3NlbGVjdGVkUGVyaW9kID0gcGVyaW9kO1xuICAgIHRoaXMuX2NoYW5nZS5lbWl0KHtzb3VyY2U6IHRoaXMsIHBlcmlvZDogcGVyaW9kfSk7XG4gICAgdGhpcy5fcmVmcmVzaFNlbGVjdGlvbigpO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IENhbGVuZGFyUGVyaW9kfERhdGV8bnVsbCB7XG4gICAgaWYgKHRoaXMuX2RhdGVPbmx5Rm9yRGF5ICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZCAhPSBudWxsID8gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUGVyaW9kO1xuICB9XG4gIHNldCB2YWx1ZShwZXJpb2Q6IENhbGVuZGFyUGVyaW9kfERhdGV8bnVsbCkge1xuICAgIGlmICh0aGlzLl9kYXRlT25seUZvckRheSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdkYXknKSB7XG4gICAgICBpZiAocGVyaW9kIGluc3RhbmNlb2YgRGF0ZSAmJlxuICAgICAgICAgICh0aGlzLl9zZWxlY3RlZFBlcmlvZCA9PSBudWxsIHx8IHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGVyaW9kID0ge3R5cGU6ICdkYXknLCBzdGFydERhdGU6IHBlcmlvZCwgZW5kRGF0ZTogcGVyaW9kfTtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayhwZXJpb2QpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGVyaW9kIGluc3RhbmNlb2YgT2JqZWN0ICYmIHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSA8Q2FsZW5kYXJQZXJpb2Q+cGVyaW9kO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayhwZXJpb2QpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjYWxlbmRhclJvd3MoKTogQ2FsZW5kYXJFbnRyeVtdW10ge1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhclJvd3M7XG4gIH1cbiAgZ2V0IHZpZXdIZWFkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0hlYWRlcjtcbiAgfVxuICBnZXQgd2Vla0RheXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl93ZWVrRGF5cztcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgcHJpdmF0ZSBfdmlld0hlYWRlciA9ICcnO1xuXG4gIHByaXZhdGUgX2NhbGVuZGFyUm93czogQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgcHJpdmF0ZSBfd2Vla0RheXM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBwcmV2UGFnZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy52aWV3RGF0ZSA9IHN1Yk1vbnRocyh0aGlzLnZpZXdEYXRlLCAxKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgdGhpcy52aWV3RGF0ZSA9IHN1YlllYXJzKHRoaXMudmlld0RhdGUsIDEpO1xuICAgIH1cbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZXh0UGFnZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy52aWV3RGF0ZSA9IGFkZE1vbnRocyh0aGlzLnZpZXdEYXRlLCAxKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgdGhpcy52aWV3RGF0ZSA9IGFkZFllYXJzKHRoaXMudmlld0RhdGUsIDEpO1xuICAgIH1cbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcmV2aW91c1ZpZXdNb2RlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdkZWNhZGUnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfVxuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHNlbGVjdEVudHJ5KGVudHJ5OiBDYWxlbmRhckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jYW5TZWxlY3RFbnRyeShlbnRyeSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uZXh0Vmlld01vZGUoZW50cnkpO1xuICAgIH1cblxuICAgIGxldCBuZXdQZXJpb2Q6IENhbGVuZGFyUGVyaW9kfG51bGwgPSBudWxsO1xuICAgIGlmICh0aGlzLl9pc0VudHJ5U2VsZWN0ZWQoZW50cnkpID09ICdmdWxsJykge1xuICAgICAgbmV3UGVyaW9kID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ2RheScpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHt0eXBlOiAnZGF5Jywgc3RhcnREYXRlOiBlbnRyeS5kYXRlLCBlbmREYXRlOiBlbnRyeS5kYXRlfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ3dlZWsnKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICd3ZWVrJyxcbiAgICAgICAgc3RhcnREYXRlOiB0aGlzLl9pc29Nb2RlID9cbiAgICAgICAgICAgIHN0YXJ0T2ZJU09XZWVrKGVudHJ5LmRhdGUpIDpcbiAgICAgICAgICAgIHN0YXJ0T2ZXZWVrKGVudHJ5LmRhdGUsIHt3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5fSBhcyBhbnkpLFxuICAgICAgICBlbmREYXRlOiB0aGlzLl9pc29Nb2RlID8gZW5kT2ZJU09XZWVrKGVudHJ5LmRhdGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZE9mV2VlayhlbnRyeS5kYXRlLCB7d2Vla1N0YXJ0c09uOiB0aGlzLl9zdGFydE9mV2Vla0RheX0gYXMgYW55KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJykge1xuICAgICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9nZXRNb250aFN0YXJ0RW5kKGVudHJ5LmRhdGUpO1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ3llYXInKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICd5ZWFyJyxcbiAgICAgICAgc3RhcnREYXRlOiBzdGFydE9mWWVhcihlbnRyeS5kYXRlKSxcbiAgICAgICAgZW5kRGF0ZTogZW5kT2ZZZWFyKGVudHJ5LmRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbmV3UGVyaW9kO1xuXG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHBhcnNlSVNPKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlZnJlc2hTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoXzogYW55KSA9PiB7fTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4ge307XG5cbiAgcHJpdmF0ZSBfc2V0Vmlld0RhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE1vbnRoU3RhcnRFbmQoZGF0ZTogRGF0ZSk6IHtzdGFydDogRGF0ZSwgZW5kOiBEYXRlfSB7XG4gICAgbGV0IHN0YXJ0RGF0ZSA9IHN0YXJ0T2ZNb250aChkYXRlKTtcbiAgICBsZXQgZW5kRGF0ZSA9IGVuZE9mTW9udGgoZGF0ZSk7XG4gICAgaWYgKHRoaXMuX2lzb01vZGUpIHtcbiAgICAgIGNvbnN0IHN0YXJ0V2Vla0RheSA9IHN0YXJ0RGF0ZS5nZXREYXkoKTtcbiAgICAgIGNvbnN0IGVuZFdlZWtEYXkgPSBlbmREYXRlLmdldERheSgpO1xuICAgICAgaWYgKHN0YXJ0V2Vla0RheSA9PSAwIHx8IHN0YXJ0V2Vla0RheSA+IDQpIHtcbiAgICAgICAgc3RhcnREYXRlID0gYWRkV2Vla3Moc3RhcnREYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmRXZWVrRGF5ID4gMCAmJiBlbmRXZWVrRGF5IDwgNCkge1xuICAgICAgICBlbmREYXRlID0gc3ViV2Vla3MoZW5kRGF0ZSwgMSk7XG4gICAgICB9XG4gICAgICBzdGFydERhdGUgPSBzdGFydE9mSVNPV2VlayhzdGFydERhdGUpO1xuICAgICAgZW5kRGF0ZSA9IGVuZE9mSVNPV2VlayhlbmREYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHtzdGFydDogc3RhcnREYXRlLCBlbmQ6IGVuZERhdGV9O1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRDYWxlbmRhcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fYnVpbGRNb250aFZpZXcoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgdGhpcy5fYnVpbGRZZWFyVmlldygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHRoaXMuX2J1aWxkRGVjYWRlVmlldygpO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZERlY2FkZVZpZXcoKTogdm9pZCB7XG4gICAgbGV0IGN1clllYXI6IG51bWJlciA9IHRoaXMuX3ZpZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgbGV0IGZpcnN0WWVhciA9IGN1clllYXIgLSAoY3VyWWVhciAlIDEwKSArIDE7XG4gICAgbGV0IGxhc3RZZWFyID0gZmlyc3RZZWFyICsgMTE7XG5cbiAgICB0aGlzLl92aWV3SGVhZGVyID0gYCR7Zmlyc3RZZWFyfSAtICR7bGFzdFllYXJ9YDtcblxuICAgIGxldCBjdXJEYXRlOiBEYXRlID0gc3RhcnRPZlllYXIodGhpcy5fdmlld0RhdGUpO1xuICAgIGN1ckRhdGUuc2V0RnVsbFllYXIoZmlyc3RZZWFyKTtcblxuICAgIGxldCByb3dzOiBDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBsZXQgcm93OiBDYWxlbmRhckVudHJ5W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyRGF0ZSk7XG4gICAgICAgIGxldCBuZXdFbnRyeSA9IG5ldyBDYWxlbmRhckVudHJ5KHt0eXBlOiAneWVhcicsIGRhdGU6IGRhdGUsIHNlbGVjdGVkOiAnbm9uZSd9KTtcbiAgICAgICAgbmV3RW50cnkuc2VsZWN0ZWQgPSB0aGlzLl9pc0VudHJ5U2VsZWN0ZWQobmV3RW50cnkpO1xuICAgICAgICByb3cucHVzaChuZXdFbnRyeSk7XG4gICAgICAgIGN1ckRhdGUgPSBhZGRZZWFycyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgICB0aGlzLl9jYWxlbmRhclJvd3MgPSByb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRZZWFyVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3SGVhZGVyID0gYCR7dGhpcy5fdmlld0RhdGUuZ2V0RnVsbFllYXIoKX1gO1xuXG4gICAgbGV0IGN1ckRhdGU6IERhdGUgPSBzdGFydE9mWWVhcih0aGlzLl92aWV3RGF0ZSk7XG5cbiAgICBsZXQgcm93czogQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgbGV0IHJvdzogQ2FsZW5kYXJFbnRyeVtdID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1ckRhdGUpO1xuICAgICAgICBsZXQgbmV3RW50cnkgPSBuZXcgQ2FsZW5kYXJFbnRyeSh7dHlwZTogJ21vbnRoJywgZGF0ZTogZGF0ZSwgc2VsZWN0ZWQ6ICdub25lJ30pO1xuICAgICAgICBuZXdFbnRyeS5zZWxlY3RlZCA9IHRoaXMuX2lzRW50cnlTZWxlY3RlZChuZXdFbnRyeSk7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZE1vbnRocyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgICB0aGlzLl9jYWxlbmRhclJvd3MgPSByb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRNb250aFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0hlYWRlciA9IGZvcm1hdCh0aGlzLl92aWV3RGF0ZSwgJ01NTSB5eXl5Jyk7XG5cbiAgICB0aGlzLl9idWlsZE1vbnRoVmlld1dlZWtEYXlzKCk7XG4gICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9nZXRNb250aFN0YXJ0RW5kKHRoaXMuX3ZpZXdEYXRlKTtcbiAgICBsZXQgdmlld1N0YXJ0RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KTtcbiAgICBsZXQgdmlld0VuZERhdGU6IERhdGUgPSBuZXcgRGF0ZShtb250aEJvdW5kcy5lbmQpO1xuICAgIGlmICghdGhpcy5faXNvTW9kZSkge1xuICAgICAgdmlld1N0YXJ0RGF0ZSA9IHN0YXJ0T2ZXZWVrKHZpZXdTdGFydERhdGUpO1xuICAgICAgdmlld0VuZERhdGUgPSBlbmRPZldlZWsodmlld0VuZERhdGUpO1xuICAgIH1cblxuICAgIGxldCByb3dzOiBDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGxldCB0b2RheURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUodmlld1N0YXJ0RGF0ZSk7XG4gICAgbGV0IG1pbkRhdGUgPSB0aGlzLm1pbkRhdGUgPT0gbnVsbCA/IG51bGwgOiBuZXcgRGF0ZSh0aGlzLm1pbkRhdGUpO1xuICAgIGxldCBtYXhEYXRlID0gdGhpcy5tYXhEYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5tYXhEYXRlKTtcbiAgICB3aGlsZSAoY3VyRGF0ZSA8IHZpZXdFbmREYXRlKSB7XG4gICAgICBsZXQgcm93OiBDYWxlbmRhckVudHJ5W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIGxldCBkaXNhYmxlZCA9IChtaW5EYXRlICE9IG51bGwgJiYgaXNCZWZvcmUoY3VyRGF0ZSwgbWluRGF0ZSkpIHx8XG4gICAgICAgICAgICAobWF4RGF0ZSAhPSBudWxsICYmIGlzQWZ0ZXIoY3VyRGF0ZSwgbWF4RGF0ZSkpO1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1ckRhdGUpO1xuICAgICAgICBsZXQgbmV3RW50cnk6IENhbGVuZGFyRW50cnkgPSBuZXcgQ2FsZW5kYXJFbnRyeSh7XG4gICAgICAgICAgdHlwZTogJ2RheScsXG4gICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZDogJ25vbmUnLFxuICAgICAgICAgIGhpZ2hsaWdodDogZm9ybWF0KHRvZGF5RGF0ZSwgJ3l5eXktTU0tZGQnKSA9PT0gZm9ybWF0KGN1ckRhdGUsICd5eXl5LU1NLWRkJyksXG4gICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gICAgICAgIH0pO1xuICAgICAgICBuZXdFbnRyeS5zZWxlY3RlZCA9IHRoaXMuX2lzRW50cnlTZWxlY3RlZChuZXdFbnRyeSk7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZERheXMoY3VyRGF0ZSwgMSk7XG4gICAgICB9XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYWxlbmRhclJvd3MgPSByb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRNb250aFZpZXdXZWVrRGF5cygpOiB2b2lkIHtcbiAgICBsZXQgY3VyRGF0ZTogRGF0ZTtcbiAgICBpZiAodGhpcy5faXNvTW9kZSkge1xuICAgICAgY3VyRGF0ZSA9IHNldElTT0RheShzdGFydE9mV2Vlayh0aGlzLl92aWV3RGF0ZSksIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJEYXRlID0gc3RhcnRPZldlZWsodGhpcy5fdmlld0RhdGUpO1xuICAgIH1cbiAgICBsZXQgd2Vla0RheU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICB3ZWVrRGF5TmFtZXMucHVzaChmb3JtYXQoY3VyRGF0ZSwgJ0VFRScpKTtcbiAgICAgIGN1ckRhdGUgPSBhZGREYXlzKGN1ckRhdGUsIDEpO1xuICAgIH1cbiAgICB0aGlzLl93ZWVrRGF5cyA9IHdlZWtEYXlOYW1lcztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9wZXJpb2RPcmRlcihlbnRyeVR5cGU6IENhbGVuZGFyUGVyaW9kVHlwZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIFsnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCAneWVhciddLmluZGV4T2YoZW50cnlUeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzRW50cnlTZWxlY3RlZChlbnRyeTogQ2FsZW5kYXJFbnRyeSk6IENhbGVuZGFyRW50cnlTZWxlY3RlZFN0YXRlIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRQZXJpb2QgIT0gbnVsbCAmJiB0aGlzLl9zZWxlY3RlZFBlcmlvZC5zdGFydERhdGUgIT0gbnVsbCAmJlxuICAgICAgICB0aGlzLl9zZWxlY3RlZFBlcmlvZC5lbmREYXRlICE9IG51bGwpIHtcbiAgICAgIGxldCBzZWxlY3Rpb25TdGFydDogRGF0ZSA9IHN0YXJ0T2ZEYXkodGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlKTtcbiAgICAgIGxldCBzZWxlY3Rpb25FbmQ6IERhdGUgPSBlbmRPZkRheSh0aGlzLl9zZWxlY3RlZFBlcmlvZC5lbmREYXRlKTtcbiAgICAgIGxldCBzZWxlY3Rpb25QZXJpb2RPcmRlcjogbnVtYmVyID0gdGhpcy5fcGVyaW9kT3JkZXIodGhpcy5fc2VsZWN0ZWRQZXJpb2QudHlwZSk7XG5cbiAgICAgIGxldCBlbnRyeVBlcmlvZE9yZGVyOiBudW1iZXIgPSB0aGlzLl9wZXJpb2RPcmRlcihlbnRyeS50eXBlKTtcbiAgICAgIGxldCBlbnRyeVJhbmdlOiB7c3RhcnQ6IERhdGUsIGVuZDogRGF0ZX0gPSBlbnRyeS5nZXRSYW5nZSgpO1xuXG4gICAgICBpZiAoZW50cnlQZXJpb2RPcmRlciA8PSBzZWxlY3Rpb25QZXJpb2RPcmRlciAmJlxuICAgICAgICAgIHRoaXMuX2lzQmV0d2VlbihlbnRyeVJhbmdlLnN0YXJ0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKSAmJlxuICAgICAgICAgIHRoaXMuX2lzQmV0d2VlbihlbnRyeVJhbmdlLmVuZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkpIHtcbiAgICAgICAgcmV0dXJuICdmdWxsJztcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgZW50cnlQZXJpb2RPcmRlciA+IHNlbGVjdGlvblBlcmlvZE9yZGVyICYmXG4gICAgICAgICAgdGhpcy5faXNCZXR3ZWVuKHNlbGVjdGlvblN0YXJ0LCBlbnRyeVJhbmdlLnN0YXJ0LCBlbnRyeVJhbmdlLmVuZCkgJiZcbiAgICAgICAgICB0aGlzLl9pc0JldHdlZW4oc2VsZWN0aW9uRW5kLCBlbnRyeVJhbmdlLnN0YXJ0LCBlbnRyeVJhbmdlLmVuZCkpIHtcbiAgICAgICAgcmV0dXJuICdwYXJ0aWFsJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJ25vbmUnO1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNCZXR3ZWVuKGRhdGU6IERhdGUsIHJhbmdlTGVmdDogRGF0ZSwgcmFuZ2VSaWdodDogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoaXNBZnRlcihkYXRlLCByYW5nZUxlZnQpIHx8IGlzU2FtZURheShkYXRlLCByYW5nZUxlZnQpKSAmJlxuICAgICAgICAoaXNCZWZvcmUoZGF0ZSwgcmFuZ2VSaWdodCkgfHwgaXNTYW1lRGF5KGRhdGUsIHJhbmdlUmlnaHQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZnJlc2hTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgcm93IG9mIHRoaXMuX2NhbGVuZGFyUm93cykge1xuICAgICAgZm9yIChsZXQgZW50cnkgb2Ygcm93KSB7XG4gICAgICAgIGVudHJ5LnNlbGVjdGVkID0gdGhpcy5faXNFbnRyeVNlbGVjdGVkKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jYW5TZWxlY3RFbnRyeShlbnRyeTogQ2FsZW5kYXJFbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmIChbJ2RheScsICd3ZWVrJ10uaW5kZXhPZih0aGlzLl9zZWxlY3Rpb25Nb2RlKSA+PSAwICYmIGVudHJ5LnR5cGUgIT0gJ2RheScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJyAmJiBlbnRyeS50eXBlID09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRWaWV3TW9kZShlbnRyeTogQ2FsZW5kYXJFbnRyeSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ21vbnRoJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdmlld0RhdGUgPSBlbnRyeS5kYXRlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxufVxuIl19