import { Inject, Injectable } from '@angular/core';
import * as URLParse from 'url-parse';
import { JwtHelperService } from './jwt-helper';
import { JWT_OPTIONS } from './jwt-options-token';
import * as i0 from "@angular/core";
import * as i1 from "./jwt-options-token";
import * as i2 from "./jwt-helper";
export class JwtInterceptor {
    constructor(config, jwtHelper) {
        this.jwtHelper = jwtHelper;
        this.tokenGetter = config.tokenGetter;
        this.headerName = config.headerName || 'Authorization';
        this.authScheme = config.authScheme || config.authScheme === '' ? config.authScheme : 'Bearer ';
        this.whitelistedDomains = config.whitelistedDomains || [];
        this.blacklistedRoutes = config.blacklistedRoutes || [];
        this.throwNoTokenError = config.throwNoTokenError || false;
        this.skipWhenExpired = config.skipWhenExpired || false;
    }
    isWhitelistedDomain(request) {
        const requestUrl = new URLParse(request.url);
        return (requestUrl.host === null || this.whitelistedDomains.findIndex(domain => {
            if (typeof domain === 'string') {
                return domain === requestUrl.host;
            }
            return domain instanceof RegExp ? domain.test(requestUrl.host) : false;
        }) > -1);
    }
    isBlacklistedRoute(request) {
        const url = request.url;
        return (this.blacklistedRoutes.findIndex(route => {
            if (typeof route === 'string') {
                return route === url;
            }
            return route instanceof RegExp ? route.test(url) : false;
        }) > -1);
    }
    handleInterception(token, request, next) {
        let tokenIsExpired = false;
        if (!token && this.throwNoTokenError) {
            throw new Error('Could not get token from tokenGetter function.');
        }
        if (this.skipWhenExpired) {
            tokenIsExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
        }
        if (token && tokenIsExpired && this.skipWhenExpired) {
            request = request.clone();
        }
        else if (token && this.isWhitelistedDomain(request) && !this.isBlacklistedRoute(request)) {
            request = request.clone({ setHeaders: { [this.headerName]: `${this.authScheme}${token}` } });
        }
        return next.handle(request);
    }
    intercept(request, next) {
        const token = this.tokenGetter ? this.tokenGetter() : null;
        return this.handleInterception(token, request, next);
    }
}
JwtInterceptor.ɵprov = i0.ɵɵdefineInjectable({ factory: function JwtInterceptor_Factory() { return new JwtInterceptor(i0.ɵɵinject(i1.JWT_OPTIONS), i0.ɵɵinject(i2.JwtHelperService)); }, token: JwtInterceptor, providedIn: "root" });
JwtInterceptor.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
JwtInterceptor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] },
    { type: JwtHelperService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvYXV0aC9qd3QtaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBRXRDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUU5QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFJaEQsTUFBTSxPQUFPLGNBQWM7SUFTekIsWUFBaUMsTUFBa0IsRUFBUyxTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUNyRixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLGVBQWUsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQztRQUMzRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDO0lBQ3pELENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxPQUF5QjtRQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0UsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDbkM7WUFDRCxPQUFPLE1BQU0sWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDekUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxPQUF5QjtRQUMxQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBRXhCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixPQUFPLEtBQUssS0FBSyxHQUFHLENBQUM7YUFDdEI7WUFDRCxPQUFPLEtBQUssWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMzRCxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFrQixDQUFDLEtBQWtCLEVBQUUsT0FBeUIsRUFBRSxJQUFpQjtRQUNqRixJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDdEU7UUFFRCxJQUFJLEtBQUssSUFBSSxjQUFjLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNuRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFGLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssRUFBRSxFQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQzFGO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBeUIsRUFBRSxJQUFpQjtRQUNwRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUzRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7WUFqRUYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OzRDQVVqQixNQUFNLFNBQUMsV0FBVztZQWZ6QixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIFVSTFBhcnNlIGZyb20gJ3VybC1wYXJzZSc7XG5cbmltcG9ydCB7Snd0SGVscGVyU2VydmljZX0gZnJvbSAnLi9qd3QtaGVscGVyJztcbmltcG9ydCB7Snd0T3B0aW9uc30gZnJvbSAnLi9qd3Qtb3B0aW9ucyc7XG5pbXBvcnQge0pXVF9PUFRJT05TfSBmcm9tICcuL2p3dC1vcHRpb25zLXRva2VuJztcblxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBKd3RJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIHRva2VuR2V0dGVyOiAoKCkgPT4gc3RyaW5nIHwgbnVsbCl8dW5kZWZpbmVkO1xuICBoZWFkZXJOYW1lOiBzdHJpbmc7XG4gIGF1dGhTY2hlbWU6IHN0cmluZztcbiAgd2hpdGVsaXN0ZWREb21haW5zOiAoc3RyaW5nfFJlZ0V4cClbXTtcbiAgYmxhY2tsaXN0ZWRSb3V0ZXM6IChzdHJpbmd8UmVnRXhwKVtdO1xuICB0aHJvd05vVG9rZW5FcnJvcjogYm9vbGVhbjtcbiAgc2tpcFdoZW5FeHBpcmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSldUX09QVElPTlMpIGNvbmZpZzogSnd0T3B0aW9ucywgcHVibGljIGp3dEhlbHBlcjogSnd0SGVscGVyU2VydmljZSkge1xuICAgIHRoaXMudG9rZW5HZXR0ZXIgPSBjb25maWcudG9rZW5HZXR0ZXI7XG4gICAgdGhpcy5oZWFkZXJOYW1lID0gY29uZmlnLmhlYWRlck5hbWUgfHwgJ0F1dGhvcml6YXRpb24nO1xuICAgIHRoaXMuYXV0aFNjaGVtZSA9IGNvbmZpZy5hdXRoU2NoZW1lIHx8IGNvbmZpZy5hdXRoU2NoZW1lID09PSAnJyA/IGNvbmZpZy5hdXRoU2NoZW1lIDogJ0JlYXJlciAnO1xuICAgIHRoaXMud2hpdGVsaXN0ZWREb21haW5zID0gY29uZmlnLndoaXRlbGlzdGVkRG9tYWlucyB8fCBbXTtcbiAgICB0aGlzLmJsYWNrbGlzdGVkUm91dGVzID0gY29uZmlnLmJsYWNrbGlzdGVkUm91dGVzIHx8IFtdO1xuICAgIHRoaXMudGhyb3dOb1Rva2VuRXJyb3IgPSBjb25maWcudGhyb3dOb1Rva2VuRXJyb3IgfHwgZmFsc2U7XG4gICAgdGhpcy5za2lwV2hlbkV4cGlyZWQgPSBjb25maWcuc2tpcFdoZW5FeHBpcmVkIHx8IGZhbHNlO1xuICB9XG5cbiAgaXNXaGl0ZWxpc3RlZERvbWFpbihyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IG5ldyBVUkxQYXJzZShyZXF1ZXN0LnVybCk7XG5cbiAgICByZXR1cm4gKHJlcXVlc3RVcmwuaG9zdCA9PT0gbnVsbCB8fCB0aGlzLndoaXRlbGlzdGVkRG9tYWlucy5maW5kSW5kZXgoZG9tYWluID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZG9tYWluID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9tYWluID09PSByZXF1ZXN0VXJsLmhvc3Q7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tYWluIGluc3RhbmNlb2YgUmVnRXhwID8gZG9tYWluLnRlc3QocmVxdWVzdFVybC5ob3N0KSA6IGZhbHNlO1xuICAgIH0pID4gLTEpO1xuICB9XG5cbiAgaXNCbGFja2xpc3RlZFJvdXRlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuIHtcbiAgICBjb25zdCB1cmwgPSByZXF1ZXN0LnVybDtcblxuICAgIHJldHVybiAodGhpcy5ibGFja2xpc3RlZFJvdXRlcy5maW5kSW5kZXgocm91dGUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByb3V0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHJvdXRlID09PSB1cmw7XG4gICAgICB9XG4gICAgICByZXR1cm4gcm91dGUgaW5zdGFuY2VvZiBSZWdFeHAgPyByb3V0ZS50ZXN0KHVybCkgOiBmYWxzZTtcbiAgICB9KSA+IC0xKTtcbiAgfVxuXG4gIGhhbmRsZUludGVyY2VwdGlvbih0b2tlbjogc3RyaW5nfG51bGwsIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKSB7XG4gICAgbGV0IHRva2VuSXNFeHBpcmVkID0gZmFsc2U7XG5cbiAgICBpZiAoIXRva2VuICYmIHRoaXMudGhyb3dOb1Rva2VuRXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGdldCB0b2tlbiBmcm9tIHRva2VuR2V0dGVyIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNraXBXaGVuRXhwaXJlZCkge1xuICAgICAgdG9rZW5Jc0V4cGlyZWQgPSB0b2tlbiA/IHRoaXMuand0SGVscGVyLmlzVG9rZW5FeHBpcmVkKHRva2VuKSA6IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRva2VuICYmIHRva2VuSXNFeHBpcmVkICYmIHRoaXMuc2tpcFdoZW5FeHBpcmVkKSB7XG4gICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSgpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4gJiYgdGhpcy5pc1doaXRlbGlzdGVkRG9tYWluKHJlcXVlc3QpICYmICF0aGlzLmlzQmxhY2tsaXN0ZWRSb3V0ZShyZXF1ZXN0KSkge1xuICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe3NldEhlYWRlcnM6IHtbdGhpcy5oZWFkZXJOYW1lXTogYCR7dGhpcy5hdXRoU2NoZW1lfSR7dG9rZW59YH19KTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICB9XG5cbiAgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlbkdldHRlciA/IHRoaXMudG9rZW5HZXR0ZXIoKSA6IG51bGw7XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVJbnRlcmNlcHRpb24odG9rZW4sIHJlcXVlc3QsIG5leHQpO1xuICB9XG59XG4iXX0=