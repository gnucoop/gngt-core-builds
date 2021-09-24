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
export * from './model-actions';
export * from './reducers';
export * from './model-error';
export * from './model-effects';
export * from './model-generic-action';
export * from './model-manager';
export * from './model-options';
export * from './model-options-token';
export * from './model-reducer';
export * from './model-service';
export * from './utils';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVsL3B1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsWUFBWSxDQUFDO0FBQzNCLGNBQWMsZUFBZSxDQUFDO0FBQzlCLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyx3QkFBd0IsQ0FBQztBQUN2QyxjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtYWN0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL3JlZHVjZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtZXJyb3InO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC1lZmZlY3RzJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtZ2VuZXJpYy1hY3Rpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC1tYW5hZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtb3B0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsLW9wdGlvbnMtdG9rZW4nO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC1yZWR1Y2VyJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwtc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcbiJdfQ==