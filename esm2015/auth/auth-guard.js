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
import { select, Store } from '@ngrx/store';
import { concatMap, filter, map, take } from 'rxjs/operators';
import * as AuthApiActions from './auth-api-actions';
import * as fromAuth from './reducers';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
export class AuthGuard {
    constructor(_store) {
        this._store = _store;
    }
    canActivate() {
        return this._guard();
    }
    canActivateChild(_cr, _state) {
        return this._guard();
    }
    _guard() {
        return this._store.pipe(select(fromAuth.getInit), filter(init => init), concatMap(() => this._store.pipe(select(fromAuth.getLoggedIn))), map(authed => {
            if (!authed) {
                this._store.dispatch(new AuthApiActions.LoginRedirect());
                return false;
            }
            return true;
        }), take(1));
    }
}
AuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.ɵɵinject(i1.Store)); }, token: AuthGuard, providedIn: "root" });
AuthGuard.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AuthGuard.ctorParameters = () => [
    { type: Store }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2F1dGgvYXV0aC1ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFPekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFMUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVELE9BQU8sS0FBSyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxLQUFLLFFBQVEsTUFBTSxZQUFZLENBQUM7OztBQUd2QyxNQUFNLE9BQU8sU0FBUztJQUNwQixZQUFvQixNQUE2QjtRQUE3QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtJQUFHLENBQUM7SUFFckQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxHQUEyQixFQUFFLE1BQTJCO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxNQUFNO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFDOUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1RSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7Z0JBQ3pELE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQzs7OztZQXhCRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7WUFQaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBDYW5BY3RpdmF0ZUNoaWxkLFxuICBSb3V0ZXJTdGF0ZVNuYXBzaG90XG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge3NlbGVjdCwgU3RvcmV9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NvbmNhdE1hcCwgZmlsdGVyLCBtYXAsIHRha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0ICogYXMgQXV0aEFwaUFjdGlvbnMgZnJvbSAnLi9hdXRoLWFwaS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIGZyb21BdXRoIGZyb20gJy4vcmVkdWNlcnMnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSwgQ2FuQWN0aXZhdGVDaGlsZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3N0b3JlOiBTdG9yZTxmcm9tQXV0aC5TdGF0ZT4pIHt9XG5cbiAgY2FuQWN0aXZhdGUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2d1YXJkKCk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZUNoaWxkKF9jcjogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgX3N0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2d1YXJkKCk7XG4gIH1cblxuICBwcml2YXRlIF9ndWFyZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmUucGlwZShcbiAgICAgICAgc2VsZWN0KGZyb21BdXRoLmdldEluaXQpLCBmaWx0ZXIoaW5pdCA9PiBpbml0KSxcbiAgICAgICAgY29uY2F0TWFwKCgpID0+IHRoaXMuX3N0b3JlLnBpcGUoc2VsZWN0KGZyb21BdXRoLmdldExvZ2dlZEluKSkpLCBtYXAoYXV0aGVkID0+IHtcbiAgICAgICAgICBpZiAoIWF1dGhlZCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IEF1dGhBcGlBY3Rpb25zLkxvZ2luUmVkaXJlY3QoKSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlKDEpKTtcbiAgfVxufVxuIl19