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
    error: null,
    pending: false,
};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case "[Login Page] Login" /* Login */: {
            return Object.assign(Object.assign({}, state), { error: null, pending: true });
        }
        case "[Auth/API] Login Success" /* LoginSuccess */: {
            return Object.assign(Object.assign({}, state), { error: null, pending: false });
        }
        case "[Auth/API] Login Failure" /* LoginFailure */: {
            return Object.assign(Object.assign({}, state), { error: action.payload.error, pending: false });
        }
        default: {
            return state;
        }
    }
}
export const getError = (state) => state.error;
export const getPending = (state) => state.pending;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tcGFnZS1yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXV0aC9sb2dpbi1wYWdlLXJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFVSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQVU7SUFDakMsS0FBSyxFQUFFLElBQUk7SUFDWCxPQUFPLEVBQUUsS0FBSztDQUNmLENBQUM7QUFFRixNQUFNLFVBQVUsT0FBTyxDQUNuQixLQUFLLEdBQUcsWUFBWSxFQUFFLE1BQWlEO0lBQ3pFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixxQ0FBK0IsQ0FBQyxDQUFDO1lBQy9CLHVDQUNLLEtBQUssS0FDUixLQUFLLEVBQUUsSUFBSSxFQUNYLE9BQU8sRUFBRSxJQUFJLElBQ2I7U0FDSDtRQUVELGtEQUFvQyxDQUFDLENBQUM7WUFDcEMsdUNBQ0ssS0FBSyxLQUNSLEtBQUssRUFBRSxJQUFJLEVBQ1gsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBRUQsa0RBQW9DLENBQUMsQ0FBQztZQUNwQyx1Q0FDSyxLQUFLLEtBQ1IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUMzQixPQUFPLEVBQUUsS0FBSyxJQUNkO1NBQ0g7UUFFRCxPQUFPLENBQUMsQ0FBQztZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtBQUNILENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDdEQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0F1dGhBcGlBY3Rpb25zVW5pb24sIEF1dGhBcGlBY3Rpb25UeXBlc30gZnJvbSAnLi9hdXRoLWFwaS1hY3Rpb25zJztcbmltcG9ydCB7TG9naW5QYWdlQWN0aW9uc1VuaW9uLCBMb2dpblBhZ2VBY3Rpb25UeXBlc30gZnJvbSAnLi9sb2dpbi1wYWdlLWFjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcbiAgZXJyb3I6IHN0cmluZ3xudWxsO1xuICBwZW5kaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcbiAgZXJyb3I6IG51bGwsXG4gIHBlbmRpbmc6IGZhbHNlLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoXG4gICAgc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQXV0aEFwaUFjdGlvbnNVbmlvbnxMb2dpblBhZ2VBY3Rpb25zVW5pb24pOiBTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIExvZ2luUGFnZUFjdGlvblR5cGVzLkxvZ2luOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIHBlbmRpbmc6IHRydWUsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgQXV0aEFwaUFjdGlvblR5cGVzLkxvZ2luU3VjY2Vzczoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY2FzZSBBdXRoQXBpQWN0aW9uVHlwZXMuTG9naW5GYWlsdXJlOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZXJyb3I6IGFjdGlvbi5wYXlsb2FkLmVycm9yLFxuICAgICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0RXJyb3IgPSAoc3RhdGU6IFN0YXRlKSA9PiBzdGF0ZS5lcnJvcjtcbmV4cG9ydCBjb25zdCBnZXRQZW5kaW5nID0gKHN0YXRlOiBTdGF0ZSkgPT4gc3RhdGUucGVuZGluZztcbiJdfQ==