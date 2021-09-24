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
export class Init {
    constructor() {
        this.type = "[Auth] Init" /* Init */;
    }
}
export class InitUser {
    constructor() {
        this.type = "[Auth] Init user" /* InitUser */;
    }
}
export class InitUserComplete {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth] Init user complete" /* InitUserComplete */;
    }
}
export class InitComplete {
    constructor() {
        this.type = "[Auth] Init complete" /* InitComplete */;
    }
}
export class Logout {
    constructor() {
        this.type = "[Auth] Logout" /* Logout */;
    }
}
export class LogoutConfirmation {
    constructor() {
        this.type = "[Auth] Logout Confirmation" /* LogoutConfirmation */;
    }
}
export class LogoutConfirmationDismiss {
    constructor() {
        this.type = "[Auth] Logout Confirmation Dismiss" /* LogoutConfirmationDismiss */;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXV0aC9hdXRoLWFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFpQkgsTUFBTSxPQUFPLElBQUk7SUFBakI7UUFDVyxTQUFJLDRCQUF3QjtJQUN2QyxDQUFDO0NBQUE7QUFFRCxNQUFNLE9BQU8sUUFBUTtJQUFyQjtRQUNXLFNBQUkscUNBQTRCO0lBQzNDLENBQUM7Q0FBQTtBQUVELE1BQU0sT0FBTyxnQkFBZ0I7SUFHM0IsWUFBbUIsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFGcEMsU0FBSSxzREFBb0M7SUFFRCxDQUFDO0NBQ2xEO0FBRUQsTUFBTSxPQUFPLFlBQVk7SUFBekI7UUFDVyxTQUFJLDZDQUFnQztJQUMvQyxDQUFDO0NBQUE7QUFFRCxNQUFNLE9BQU8sTUFBTTtJQUFuQjtRQUNXLFNBQUksZ0NBQTBCO0lBQ3pDLENBQUM7Q0FBQTtBQUVELE1BQU0sT0FBTyxrQkFBa0I7SUFBL0I7UUFDVyxTQUFJLHlEQUFzQztJQUNyRCxDQUFDO0NBQUE7QUFFRCxNQUFNLE9BQU8seUJBQXlCO0lBQXRDO1FBQ1csU0FBSSx3RUFBNkM7SUFDNUQsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FjdGlvbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vdXNlcic7XG5cblxuZXhwb3J0IGNvbnN0IGVudW0gQXV0aEFjdGlvblR5cGVzIHtcbiAgSW5pdCA9ICdbQXV0aF0gSW5pdCcsXG4gIEluaXRVc2VyID0gJ1tBdXRoXSBJbml0IHVzZXInLFxuICBJbml0VXNlckNvbXBsZXRlID0gJ1tBdXRoXSBJbml0IHVzZXIgY29tcGxldGUnLFxuICBJbml0Q29tcGxldGUgPSAnW0F1dGhdIEluaXQgY29tcGxldGUnLFxuICBMb2dvdXQgPSAnW0F1dGhdIExvZ291dCcsXG4gIExvZ291dENvbmZpcm1hdGlvbiA9ICdbQXV0aF0gTG9nb3V0IENvbmZpcm1hdGlvbicsXG4gIExvZ291dENvbmZpcm1hdGlvbkRpc21pc3MgPSAnW0F1dGhdIExvZ291dCBDb25maXJtYXRpb24gRGlzbWlzcycsXG59XG5cbmV4cG9ydCBjbGFzcyBJbml0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEF1dGhBY3Rpb25UeXBlcy5Jbml0O1xufVxuXG5leHBvcnQgY2xhc3MgSW5pdFVzZXIgaW1wbGVtZW50cyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQXV0aEFjdGlvblR5cGVzLkluaXRVc2VyO1xufVxuXG5leHBvcnQgY2xhc3MgSW5pdFVzZXJDb21wbGV0ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGUgPSBBdXRoQWN0aW9uVHlwZXMuSW5pdFVzZXJDb21wbGV0ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDoge3VzZXI6IFVzZXJ8bnVsbH0pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBJbml0Q29tcGxldGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQXV0aEFjdGlvblR5cGVzLkluaXRDb21wbGV0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIExvZ291dCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGUgPSBBdXRoQWN0aW9uVHlwZXMuTG9nb3V0O1xufVxuXG5leHBvcnQgY2xhc3MgTG9nb3V0Q29uZmlybWF0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEF1dGhBY3Rpb25UeXBlcy5Mb2dvdXRDb25maXJtYXRpb247XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dvdXRDb25maXJtYXRpb25EaXNtaXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEF1dGhBY3Rpb25UeXBlcy5Mb2dvdXRDb25maXJtYXRpb25EaXNtaXNzO1xufVxuXG5leHBvcnQgdHlwZSBBdXRoQWN0aW9uc1VuaW9uID1cbiAgICBJbml0fEluaXRVc2VyfEluaXRVc2VyQ29tcGxldGV8SW5pdENvbXBsZXRlfExvZ291dHxMb2dvdXRDb25maXJtYXRpb258TG9nb3V0Q29uZmlybWF0aW9uRGlzbWlzcztcbiJdfQ==