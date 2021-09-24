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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './auth';
import { AuthEffects } from './auth-effects';
import { AuthGuard } from './auth-guard';
import { AuthHelper } from './auth-helper';
import { JwtHelperService } from './jwt-helper';
import { JwtInterceptor } from './jwt-interceptor';
import { LoginActionDirective, LoginPasswordDirective, LoginUsernameDirective } from './login';
import { reducers } from './reducers';
export class AuthModule {
}
AuthModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    EffectsModule.forFeature([AuthEffects]),
                    StoreModule.forFeature('auth', reducers),
                ],
                declarations: [
                    LoginActionDirective,
                    LoginPasswordDirective,
                    LoginUsernameDirective,
                ],
                exports: [
                    LoginActionDirective,
                    LoginPasswordDirective,
                    LoginUsernameDirective,
                ],
                providers: [AuthEffects, AuthGuard, AuthHelper, AuthService, JwtHelperService, JwtInterceptor]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9hdXRoL2F1dGgtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFtQnBDLE1BQU0sT0FBTyxVQUFVOzs7WUFqQnRCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2QyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7aUJBQ3pDO2dCQUNELFlBQVksRUFBRTtvQkFDWixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsc0JBQXNCO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQzthQUMvRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VmZmVjdHNNb2R1bGV9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHtTdG9yZU1vZHVsZX0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IHtBdXRoRWZmZWN0c30gZnJvbSAnLi9hdXRoLWVmZmVjdHMnO1xuaW1wb3J0IHtBdXRoR3VhcmR9IGZyb20gJy4vYXV0aC1ndWFyZCc7XG5pbXBvcnQge0F1dGhIZWxwZXJ9IGZyb20gJy4vYXV0aC1oZWxwZXInO1xuaW1wb3J0IHtKd3RIZWxwZXJTZXJ2aWNlfSBmcm9tICcuL2p3dC1oZWxwZXInO1xuaW1wb3J0IHtKd3RJbnRlcmNlcHRvcn0gZnJvbSAnLi9qd3QtaW50ZXJjZXB0b3InO1xuaW1wb3J0IHtMb2dpbkFjdGlvbkRpcmVjdGl2ZSwgTG9naW5QYXNzd29yZERpcmVjdGl2ZSwgTG9naW5Vc2VybmFtZURpcmVjdGl2ZX0gZnJvbSAnLi9sb2dpbic7XG5pbXBvcnQge3JlZHVjZXJzfSBmcm9tICcuL3JlZHVjZXJzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEVmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZShbQXV0aEVmZmVjdHNdKSxcbiAgICBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCdhdXRoJywgcmVkdWNlcnMpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBMb2dpbkFjdGlvbkRpcmVjdGl2ZSxcbiAgICBMb2dpblBhc3N3b3JkRGlyZWN0aXZlLFxuICAgIExvZ2luVXNlcm5hbWVEaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBMb2dpbkFjdGlvbkRpcmVjdGl2ZSxcbiAgICBMb2dpblBhc3N3b3JkRGlyZWN0aXZlLFxuICAgIExvZ2luVXNlcm5hbWVEaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogW0F1dGhFZmZlY3RzLCBBdXRoR3VhcmQsIEF1dGhIZWxwZXIsIEF1dGhTZXJ2aWNlLCBKd3RIZWxwZXJTZXJ2aWNlLCBKd3RJbnRlcmNlcHRvcl1cbn0pXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7XG59XG4iXX0=