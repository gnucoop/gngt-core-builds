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
import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Pipe } from '@angular/core';
export class ChoicesPipe {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvYWRtaW4vY2hvaWNlcy1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBTXJFLE1BQU0sT0FBTyxXQUFXO0lBR3RCLFlBQVksR0FBc0I7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQzhDO1FBQ3RELElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUF5QixLQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0UsQ0FBQzs7O1lBakJGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQzs7O1lBTGhDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBc3luY1BpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWRtaW5FZGl0RmllbGRDaG9pY2V9IGZyb20gJy4vZWRpdC1maWVsZC1jaG9pY2UnO1xuXG5AUGlwZSh7bmFtZTogJ2duZ3RDaG9pY2VzJywgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIENob2ljZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHByaXZhdGUgX2FzeW5jUGlwZTogQXN5bmNQaXBlO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLl9hc3luY1BpcGUgPSBuZXcgQXN5bmNQaXBlKGNkcik7XG4gIH1cblxuICB0cmFuc2Zvcm0odmFsdWU6IEFkbWluRWRpdEZpZWxkQ2hvaWNlW118T2JzZXJ2YWJsZTxBZG1pbkVkaXRGaWVsZENob2ljZVtdPnxcbiAgICAgICAgICAgIFByb21pc2U8QWRtaW5FZGl0RmllbGRDaG9pY2VbXT58bnVsbHx1bmRlZmluZWQpOiBBZG1pbkVkaXRGaWVsZENob2ljZVtdIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FzeW5jUGlwZS50cmFuc2Zvcm08QWRtaW5FZGl0RmllbGRDaG9pY2VbXT4odmFsdWUgYXMgYW55KSB8fCBbXTtcbiAgfVxufVxuIl19