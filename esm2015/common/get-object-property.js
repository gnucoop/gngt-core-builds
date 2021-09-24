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
import { Pipe } from '@angular/core';
export function getObjectProperty(value, prop) {
    if (prop == null) {
        return null;
    }
    if (!/\./.test(prop)) {
        return value[prop];
    }
    const props = prop.split('.');
    const propsNum = props.length;
    let curValue = value;
    for (let i = 0; i < propsNum; i++) {
        curValue = curValue[props[i]];
        if (curValue == null) {
            return null;
        }
    }
    return curValue;
}
export class GetObjectProperty {
    transform(value, prop) {
        return getObjectProperty(value, prop);
    }
}
GetObjectProperty.decorators = [
    { type: Pipe, args: [{ name: 'gngtGetObjectProperty' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW9iamVjdC1wcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9nZXQtb2JqZWN0LXByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbEQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEtBQVUsRUFBRSxJQUFZO0lBQ3hELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtRQUNoQixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7SUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDOUIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUdELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsU0FBUyxDQUFDLEtBQVUsRUFBRSxJQUFZO1FBQ2hDLE9BQU8saUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OztZQUpGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9iamVjdFByb3BlcnR5KHZhbHVlOiBhbnksIHByb3A6IHN0cmluZyk6IGFueSB7XG4gIGlmIChwcm9wID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoIS9cXC4vLnRlc3QocHJvcCkpIHtcbiAgICByZXR1cm4gdmFsdWVbcHJvcF07XG4gIH1cbiAgY29uc3QgcHJvcHMgPSBwcm9wLnNwbGl0KCcuJyk7XG4gIGNvbnN0IHByb3BzTnVtID0gcHJvcHMubGVuZ3RoO1xuICBsZXQgY3VyVmFsdWUgPSB2YWx1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc051bTsgaSsrKSB7XG4gICAgY3VyVmFsdWUgPSBjdXJWYWx1ZVtwcm9wc1tpXV07XG4gICAgaWYgKGN1clZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY3VyVmFsdWU7XG59XG5cbkBQaXBlKHtuYW1lOiAnZ25ndEdldE9iamVjdFByb3BlcnR5J30pXG5leHBvcnQgY2xhc3MgR2V0T2JqZWN0UHJvcGVydHkgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIHByb3A6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIGdldE9iamVjdFByb3BlcnR5KHZhbHVlLCBwcm9wKTtcbiAgfVxufVxuIl19