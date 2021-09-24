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
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of as obsOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logout, LogoutConfirmation, } from './auth-actions';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class AuthHelper {
    constructor(_store, _actions) {
        this._store = _store;
        this._actions = _actions;
    }
    logout(requestConfirmation = true) {
        if (!requestConfirmation) {
            this._store.dispatch(new Logout());
            return obsOf(true);
        }
        this._store.dispatch(new LogoutConfirmation());
        return this._actions.pipe(ofType("[Auth] Logout" /* Logout */, "[Auth] Logout Confirmation Dismiss" /* LogoutConfirmationDismiss */), map(action => action.type === "[Auth] Logout" /* Logout */));
    }
}
AuthHelper.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthHelper_Factory() { return new AuthHelper(i0.ɵɵinject(i1.Store), i0.ɵɵinject(i2.Actions)); }, token: AuthHelper, providedIn: "root" });
AuthHelper.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AuthHelper.ctorParameters = () => [
    { type: Store },
    { type: Actions }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9hdXRoL2F1dGgtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBYSxFQUFFLElBQUksS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQyxPQUFPLEVBR0wsTUFBTSxFQUNOLGtCQUFrQixHQUNuQixNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXhCLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFlBQ1ksTUFBb0IsRUFDcEIsUUFBaUI7UUFEakIsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQzFCLENBQUM7SUFFSixNQUFNLENBQUMsbUJBQW1CLEdBQUcsSUFBSTtRQUMvQixJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDckIsTUFBTSxvR0FHRCxFQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUEyQixDQUFDLENBQ3hELENBQUM7SUFDSixDQUFDOzs7O1lBcEJGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OztZQVp4QixLQUFLO1lBREwsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWN0aW9ucywgb2ZUeXBlfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7U3RvcmV9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2YgYXMgb2JzT2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgQXV0aEFjdGlvbnNVbmlvbixcbiAgQXV0aEFjdGlvblR5cGVzLFxuICBMb2dvdXQsXG4gIExvZ291dENvbmZpcm1hdGlvbixcbn0gZnJvbSAnLi9hdXRoLWFjdGlvbnMnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi9hdXRoLXJlZHVjZXInO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBdXRoSGVscGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9zdG9yZTogU3RvcmU8U3RhdGU+LFxuICAgICAgcHJpdmF0ZSBfYWN0aW9uczogQWN0aW9ucyxcbiAgKSB7fVxuXG4gIGxvZ291dChyZXF1ZXN0Q29uZmlybWF0aW9uID0gdHJ1ZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmICghcmVxdWVzdENvbmZpcm1hdGlvbikge1xuICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IExvZ291dCgpKTtcbiAgICAgIHJldHVybiBvYnNPZih0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IExvZ291dENvbmZpcm1hdGlvbigpKTtcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9ucy5waXBlKFxuICAgICAgICBvZlR5cGU8QXV0aEFjdGlvbnNVbmlvbj4oXG4gICAgICAgICAgICBBdXRoQWN0aW9uVHlwZXMuTG9nb3V0LFxuICAgICAgICAgICAgQXV0aEFjdGlvblR5cGVzLkxvZ291dENvbmZpcm1hdGlvbkRpc21pc3MsXG4gICAgICAgICAgICApLFxuICAgICAgICBtYXAoYWN0aW9uID0+IGFjdGlvbi50eXBlID09PSBBdXRoQWN0aW9uVHlwZXMuTG9nb3V0KSxcbiAgICApO1xuICB9XG59XG4iXX0=