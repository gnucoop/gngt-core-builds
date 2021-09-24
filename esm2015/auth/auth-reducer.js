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
export const initialState = {
    init: false,
    user: null,
    token: null
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case "[Auth/API] Login Success" /* LoginSuccess */: {
            return Object.assign(Object.assign({}, state), { user: action.payload.user });
        }
        case "[Auth] Logout" /* Logout */: {
            return Object.assign(Object.assign({}, state), { user: null });
        }
        case "[Auth] Init user complete" /* InitUserComplete */: {
            return Object.assign(Object.assign({}, state), { init: true, user: action.payload.user });
        }
        case "[Auth] Init complete" /* InitComplete */: {
            return Object.assign(Object.assign({}, state), { init: true });
        }
        default: {
            return state;
        }
    }
}
export const getInit = (state) => state.init;
export const getUser = (state) => state.user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXV0aC9hdXRoLXJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFlSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQVU7SUFDakMsSUFBSSxFQUFFLEtBQUs7SUFDWCxJQUFJLEVBQUUsSUFBSTtJQUNWLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksRUFBRSxNQUE0QztJQUN4RixRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsa0RBQW9DLENBQUMsQ0FBQztZQUNwQyx1Q0FDSyxLQUFLLEtBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUN6QjtTQUNIO1FBRUQsaUNBQTJCLENBQUMsQ0FBQztZQUMzQix1Q0FDSyxLQUFLLEtBQ1IsSUFBSSxFQUFFLElBQUksSUFDVjtTQUNIO1FBRUQsdURBQXFDLENBQUMsQ0FBQztZQUNyQyx1Q0FBVyxLQUFLLEtBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUU7U0FDMUQ7UUFFRCw4Q0FBaUMsQ0FBQyxDQUFDO1lBQ2pDLHVDQUFXLEtBQUssS0FBRSxJQUFJLEVBQUUsSUFBSSxJQUFFO1NBQy9CO1FBRUQsT0FBTyxDQUFDLENBQUM7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3BELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLiAgSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQXV0aEFjdGlvbnNVbmlvbixcbiAgQXV0aEFjdGlvblR5cGVzLFxufSBmcm9tICcuL2F1dGgtYWN0aW9ucyc7XG5pbXBvcnQge0F1dGhBcGlBY3Rpb25zVW5pb24sIEF1dGhBcGlBY3Rpb25UeXBlc30gZnJvbSAnLi9hdXRoLWFwaS1hY3Rpb25zJztcbmltcG9ydCB7VXNlcn0gZnJvbSAnLi91c2VyJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XG4gIGluaXQ6IGJvb2xlYW47XG4gIHVzZXI6IFVzZXJ8bnVsbDtcbiAgdG9rZW46IHN0cmluZ3xudWxsO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgaW5pdDogZmFsc2UsXG4gIHVzZXI6IG51bGwsXG4gIHRva2VuOiBudWxsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBdXRoQXBpQWN0aW9uc1VuaW9ufEF1dGhBY3Rpb25zVW5pb24pOiBTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEF1dGhBcGlBY3Rpb25UeXBlcy5Mb2dpblN1Y2Nlc3M6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1c2VyOiBhY3Rpb24ucGF5bG9hZC51c2VyLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjYXNlIEF1dGhBY3Rpb25UeXBlcy5Mb2dvdXQ6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB1c2VyOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjYXNlIEF1dGhBY3Rpb25UeXBlcy5Jbml0VXNlckNvbXBsZXRlOiB7XG4gICAgICByZXR1cm4gey4uLnN0YXRlLCBpbml0OiB0cnVlLCB1c2VyOiBhY3Rpb24ucGF5bG9hZC51c2VyfTtcbiAgICB9XG5cbiAgICBjYXNlIEF1dGhBY3Rpb25UeXBlcy5Jbml0Q29tcGxldGU6IHtcbiAgICAgIHJldHVybiB7Li4uc3RhdGUsIGluaXQ6IHRydWV9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldEluaXQgPSAoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5pbml0O1xuZXhwb3J0IGNvbnN0IGdldFVzZXIgPSAoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS51c2VyO1xuIl19