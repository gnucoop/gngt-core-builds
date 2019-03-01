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
import { AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
export declare const CALENDAR_CONTROL_VALUE_ACCESSOR: any;
export declare type CalendarViewMode = ('month' | 'year' | 'decade');
export declare type CalendarPeriodType = ('day' | 'week' | 'month' | 'year');
export declare type CalendarEntryType = ('day' | 'month' | 'year');
export declare type CalendarWeekDay = ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');
export declare type CalendarEntrySelectedState = ('none' | 'partial' | 'full');
export declare class CalendarPeriod {
    type: CalendarPeriodType;
    startDate: Date;
    endDate: Date;
}
export declare class CalendarChange {
    source: Calendar;
    period: CalendarPeriod | null;
}
export declare class CalendarEntry {
    type: CalendarEntryType;
    date: Date;
    selected: CalendarEntrySelectedState;
    disabled: boolean;
    highlight: boolean;
    constructor(params: {
        type: CalendarEntryType;
        date: Date;
        selected: CalendarEntrySelectedState;
        highlight?: boolean;
        disabled?: boolean;
    });
    toString(): string;
    getRange(): {
        start: Date;
        end: Date;
    };
}
export declare abstract class Calendar implements AfterContentInit, ControlValueAccessor, OnInit {
    private _cdr;
    viewDate: Date;
    private _disabled;
    disabled: boolean;
    private _dateOnlyForDay;
    dateOnlyForDay: boolean;
    private _viewMode;
    viewMode: CalendarViewMode;
    private _selectionMode;
    selectionMode: CalendarPeriodType;
    private _startOfWeekDay;
    startOfWeekDay: CalendarWeekDay;
    private _isoMode;
    isoMode: boolean;
    private _minDate;
    minDate: Date | null;
    private _maxDate;
    maxDate: Date | null;
    private _change;
    readonly change: Observable<CalendarChange>;
    private _selectedPeriod;
    private selectedPeriod;
    value: CalendarPeriod | Date | null;
    readonly calendarRows: CalendarEntry[][];
    readonly viewHeader: string;
    readonly weekDays: string[];
    private _viewDate;
    private _viewHeader;
    private _calendarRows;
    private _weekDays;
    constructor(_cdr: ChangeDetectorRef);
    prevPage(): void;
    nextPage(): void;
    previousViewMode(): void;
    selectEntry(entry: CalendarEntry): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    writeValue(value: any): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    private _onChangeCallback;
    private _onTouchedCallback;
    private _setViewDate;
    private _getMonthStartEnd;
    private _buildCalendar;
    private _buildDecadeView;
    private _buildYearView;
    private _buildMonthView;
    private _buildMonthViewWeekDays;
    private _periodOrder;
    private _isEntrySelected;
    private _isBetween;
    private _refreshSelection;
    private _canSelectEntry;
    private _nextViewMode;
}
