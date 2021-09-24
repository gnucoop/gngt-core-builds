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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OfflineInterceptor } from './offline-interceptor';
import { SYNC_OPTIONS } from './sync-options';
import { SyncService } from './sync-service';
export class SyncModule {
    static forRoot(opts) {
        return {
            ngModule: SyncModule,
            providers: [
                SyncService,
                { provide: HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true },
                { provide: SYNC_OPTIONS, useValue: opts },
            ]
        };
    }
}
SyncModule.decorators = [
    { type: NgModule, args: [{},] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zeW5jL3N5bmMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFNUQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxNQUFNLE9BQU8sVUFBVTtJQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQWlCO1FBQzlCLE9BQU87WUFDTCxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUU7Z0JBQ1QsV0FBVztnQkFDWCxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDdkUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7YUFDeEM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBWEYsUUFBUSxTQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SFRUUF9JTlRFUkNFUFRPUlN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge09mZmxpbmVJbnRlcmNlcHRvcn0gZnJvbSAnLi9vZmZsaW5lLWludGVyY2VwdG9yJztcbmltcG9ydCB7U1lOQ19PUFRJT05TLCBTeW5jT3B0aW9uc30gZnJvbSAnLi9zeW5jLW9wdGlvbnMnO1xuaW1wb3J0IHtTeW5jU2VydmljZX0gZnJvbSAnLi9zeW5jLXNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3luY01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG9wdHM6IFN5bmNPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTeW5jTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTeW5jTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFN5bmNTZXJ2aWNlLFxuICAgICAgICB7cHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBPZmZsaW5lSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlfSxcbiAgICAgICAge3Byb3ZpZGU6IFNZTkNfT1BUSU9OUywgdXNlVmFsdWU6IG9wdHN9LFxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==