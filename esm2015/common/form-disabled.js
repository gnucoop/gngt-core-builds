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
import { Directive, Host, Input, Self } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
export class FormDisabledDirective {
    constructor(fgd) {
        this.fgd = fgd;
    }
    set disabled(disabled) {
        if (disabled) {
            this.fgd.form.disable();
        }
        else {
            this.fgd.form.enable();
        }
    }
}
FormDisabledDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtFormDisabled]' },] }
];
FormDisabledDirective.ctorParameters = () => [
    { type: FormGroupDirective, decorators: [{ type: Host }, { type: Self }] }
];
FormDisabledDirective.propDecorators = {
    disabled: [{ type: Input, args: ['gngtFormDisabled',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1kaXNhYmxlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9mb3JtLWRpc2FibGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdsRCxNQUFNLE9BQU8scUJBQXFCO0lBVWhDLFlBQXFDLEdBQXVCO1FBQXZCLFFBQUcsR0FBSCxHQUFHLENBQW9CO0lBQUcsQ0FBQztJQVRoRSxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7OztZQVRGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBQzs7O1lBRm5DLGtCQUFrQix1QkFhWCxJQUFJLFlBQUksSUFBSTs7O3VCQVR4QixLQUFLLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXBEaXJlY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbZ25ndEZvcm1EaXNhYmxlZF0nfSlcbmV4cG9ydCBjbGFzcyBGb3JtRGlzYWJsZWREaXJlY3RpdmUge1xuICBASW5wdXQoJ2duZ3RGb3JtRGlzYWJsZWQnKVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZmdkLmZvcm0uZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZnZC5mb3JtLmVuYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBIb3N0KCkgQFNlbGYoKSByZWFkb25seSBmZ2Q6IEZvcm1Hcm91cERpcmVjdGl2ZSkge31cbn1cbiJdfQ==