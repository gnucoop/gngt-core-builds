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
import { NgModule } from '@angular/core';
import { MissingTranslationHandler as BaseMissingTranslationHandler } from '@ngx-translate/core';
import { MissingTranslationHandler } from './missing-translation-handler';
export class TranslationsModule {
}
TranslationsModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    { provide: BaseMissingTranslationHandler, useClass: MissingTranslationHandler },
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25zLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RyYW5zbGF0aW9ucy90cmFuc2xhdGlvbnMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMseUJBQXlCLElBQUksNkJBQTZCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUvRixPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQU94RSxNQUFNLE9BQU8sa0JBQWtCOzs7WUFMOUIsUUFBUSxTQUFDO2dCQUNSLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUM7aUJBQzlFO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyIGFzIEJhc2VNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtNaXNzaW5nVHJhbnNsYXRpb25IYW5kbGVyfSBmcm9tICcuL21pc3NpbmctdHJhbnNsYXRpb24taGFuZGxlcic7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBCYXNlTWlzc2luZ1RyYW5zbGF0aW9uSGFuZGxlciwgdXNlQ2xhc3M6IE1pc3NpbmdUcmFuc2xhdGlvbkhhbmRsZXJ9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0aW9uc01vZHVsZSB7XG59XG4iXX0=