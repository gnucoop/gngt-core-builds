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
export class LoginSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth/API] Login Success" /* LoginSuccess */;
    }
}
export class LoginFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth/API] Login Failure" /* LoginFailure */;
    }
}
export class LoginRedirect {
    constructor() {
        this.type = "[Auth/API] Login Redirect" /* LoginRedirect */;
    }
}
export class RefreshToken {
    constructor(payload) {
        this.payload = payload;
        this.type = "[Auth/API] Refresh token" /* RefreshToken */;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1hcGktYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2F1dGgvYXV0aC1hcGktYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQVlILE1BQU0sT0FBTyxZQUFZO0lBR3ZCLFlBQW1CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFGaEMsU0FBSSxpREFBbUM7SUFFSixDQUFDO0NBQzlDO0FBRUQsTUFBTSxPQUFPLFlBQVk7SUFHdkIsWUFBbUIsT0FBcUI7UUFBckIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUYvQixTQUFJLGlEQUFtQztJQUVMLENBQUM7Q0FDN0M7QUFFRCxNQUFNLE9BQU8sYUFBYTtJQUExQjtRQUNXLFNBQUksbURBQW9DO0lBQ25ELENBQUM7Q0FBQTtBQUVELE1BQU0sT0FBTyxZQUFZO0lBR3ZCLFlBQW1CLE9BQW1EO1FBQW5ELFlBQU8sR0FBUCxPQUFPLENBQTRDO1FBRjdELFNBQUksaURBQW1DO0lBRXlCLENBQUM7Q0FDM0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWN0aW9ufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge0xvZ2luUmVzcG9uc2V9IGZyb20gJy4vbG9naW4tcmVzcG9uc2UnO1xuXG5leHBvcnQgY29uc3QgZW51bSBBdXRoQXBpQWN0aW9uVHlwZXMge1xuICBMb2dpblN1Y2Nlc3MgPSAnW0F1dGgvQVBJXSBMb2dpbiBTdWNjZXNzJyxcbiAgTG9naW5GYWlsdXJlID0gJ1tBdXRoL0FQSV0gTG9naW4gRmFpbHVyZScsXG4gIExvZ2luUmVkaXJlY3QgPSAnW0F1dGgvQVBJXSBMb2dpbiBSZWRpcmVjdCcsXG4gIFJlZnJlc2hUb2tlbiA9ICdbQXV0aC9BUEldIFJlZnJlc2ggdG9rZW4nXG59XG5cbmV4cG9ydCBjbGFzcyBMb2dpblN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQXV0aEFwaUFjdGlvblR5cGVzLkxvZ2luU3VjY2VzcztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogTG9naW5SZXNwb25zZSkge31cbn1cblxuZXhwb3J0IGNsYXNzIExvZ2luRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGUgPSBBdXRoQXBpQWN0aW9uVHlwZXMuTG9naW5GYWlsdXJlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiB7ZXJyb3I6IGFueX0pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dpblJlZGlyZWN0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEF1dGhBcGlBY3Rpb25UeXBlcy5Mb2dpblJlZGlyZWN0O1xufVxuXG5leHBvcnQgY2xhc3MgUmVmcmVzaFRva2VuIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEF1dGhBcGlBY3Rpb25UeXBlcy5SZWZyZXNoVG9rZW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IHtyZWZyZXNoRGVsYXk6IG51bWJlciwgZnJvbUluaXQ/OiBib29sZWFufSkge31cbn1cblxuZXhwb3J0IHR5cGUgQXV0aEFwaUFjdGlvbnNVbmlvbiA9IExvZ2luU3VjY2Vzc3xMb2dpbkZhaWx1cmV8TG9naW5SZWRpcmVjdHxSZWZyZXNoVG9rZW47XG4iXX0=