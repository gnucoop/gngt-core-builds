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
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AUTH_OPTIONS } from './auth-options-token';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./auth-options-token";
export class AuthService {
    constructor(_http, _config) {
        this._http = _http;
        this._config = _config;
    }
    login(credentials) {
        const url = this._config.loginUrl;
        return this._http.post(url, credentials);
    }
    logout() {
        const url = this._config.logoutUrl;
        return this._http.post(url, {});
    }
    refreshToken(refreshToken) {
        const url = this._config.refreshTokenUrl;
        return this._http.post(url, { refresh_token: refreshToken });
    }
    getCurrentUser() {
        const url = this._config.meUrl;
        return this._http.get(url);
    }
    getLoggedInUser() {
        return this._config.loggedInUserGetter ? this._config.loggedInUserGetter() : null;
    }
    getMe() {
        return this._config.meGetter ? this._config.meGetter() : null;
    }
}
AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AUTH_OPTIONS)); }, token: AuthService, providedIn: "root" });
AuthService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AuthService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_OPTIONS,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2F1dGgvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUlqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFRbEQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFBb0IsS0FBaUIsRUFBZ0MsT0FBb0I7UUFBckUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFnQyxZQUFPLEdBQVAsT0FBTyxDQUFhO0lBQUcsQ0FBQztJQUU3RixLQUFLLENBQUMsV0FBd0I7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBZ0IsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFlBQVksQ0FBQyxZQUFvQjtRQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUF1QixHQUFHLEVBQUUsRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsY0FBYztRQUNaLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQU8sR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BGLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hFLENBQUM7Ozs7WUE5QkYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7O1lBWnhCLFVBQVU7NENBY3dCLE1BQU0sU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QXV0aE9wdGlvbnN9IGZyb20gJy4vYXV0aC1vcHRpb25zJztcbmltcG9ydCB7QVVUSF9PUFRJT05TfSBmcm9tICcuL2F1dGgtb3B0aW9ucy10b2tlbic7XG5pbXBvcnQge0NyZWRlbnRpYWxzfSBmcm9tICcuL2NyZWRlbnRpYWxzJztcbmltcG9ydCB7TG9naW5SZXNwb25zZX0gZnJvbSAnLi9sb2dpbi1yZXNwb25zZSc7XG5pbXBvcnQge1JlZnJlc2hUb2tlblJlc3BvbnNlfSBmcm9tICcuL3JlZnJlc2gtdG9rZW4tcmVzcG9uc2UnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuL3VzZXInO1xuXG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCwgQEluamVjdChBVVRIX09QVElPTlMpIHByaXZhdGUgX2NvbmZpZzogQXV0aE9wdGlvbnMpIHt9XG5cbiAgbG9naW4oY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKTogT2JzZXJ2YWJsZTxMb2dpblJlc3BvbnNlPiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5fY29uZmlnLmxvZ2luVXJsO1xuICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3Q8TG9naW5SZXNwb25zZT4odXJsLCBjcmVkZW50aWFscyk7XG4gIH1cblxuICBsb2dvdXQoKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5fY29uZmlnLmxvZ291dFVybDtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0PG51bGw+KHVybCwge30pO1xuICB9XG5cbiAgcmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZWZyZXNoVG9rZW5SZXNwb25zZT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuX2NvbmZpZy5yZWZyZXNoVG9rZW5Vcmw7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdDxSZWZyZXNoVG9rZW5SZXNwb25zZT4odXJsLCB7cmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VufSk7XG4gIH1cblxuICBnZXRDdXJyZW50VXNlcigpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLl9jb25maWcubWVVcmw7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0PFVzZXI+KHVybCk7XG4gIH1cblxuICBnZXRMb2dnZWRJblVzZXIoKTogbnVtYmVyfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcubG9nZ2VkSW5Vc2VyR2V0dGVyID8gdGhpcy5fY29uZmlnLmxvZ2dlZEluVXNlckdldHRlcigpIDogbnVsbDtcbiAgfVxuXG4gIGdldE1lKCk6IFVzZXJ8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5tZUdldHRlciA/IHRoaXMuX2NvbmZpZy5tZUdldHRlcigpIDogbnVsbDtcbiAgfVxufVxuIl19