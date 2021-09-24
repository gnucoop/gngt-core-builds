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
export * from './local-doc';
export * from './offline-interceptor';
export * from './sync-entry';
export * from './sync-entry-type';
export * from './sync-module';
export * from './sync-options';
export * from './sync-service';
export * from './sync-status';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3N5bmMvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILGNBQWMsYUFBYSxDQUFDO0FBQzVCLGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyxtQkFBbUIsQ0FBQztBQUNsQyxjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbG9jYWwtZG9jJztcbmV4cG9ydCAqIGZyb20gJy4vb2ZmbGluZS1pbnRlcmNlcHRvcic7XG5leHBvcnQgKiBmcm9tICcuL3N5bmMtZW50cnknO1xuZXhwb3J0ICogZnJvbSAnLi9zeW5jLWVudHJ5LXR5cGUnO1xuZXhwb3J0ICogZnJvbSAnLi9zeW5jLW1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3N5bmMtb3B0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL3N5bmMtc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3N5bmMtc3RhdHVzJztcbiJdfQ==