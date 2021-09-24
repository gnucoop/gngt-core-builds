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
import { Inject, Injectable } from '@angular/core';
import { JWT_OPTIONS } from './jwt-options-token';
import * as i0 from "@angular/core";
import * as i1 from "./jwt-options-token";
export class JwtHelperService {
    constructor(config) {
        this.tokenGetter = config && config.tokenGetter ? config.tokenGetter : () => null;
        this.tokenSetter = config && config.tokenSetter ? config.tokenSetter : () => null;
        this.refreshTokenGetter =
            config && config.refreshTokenGetter ? config.refreshTokenGetter : () => null;
        this.refreshTokenSetter =
            config && config.refreshTokenSetter ? config.refreshTokenSetter : () => null;
    }
    urlBase64Decode(str) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw new Error('Illegal base64url string!');
            }
        }
        return this._b64DecodeUnicode(output);
    }
    // credits for decoder goes to https://github.com/atk
    _b64decode(str) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
        }
        for (
        // tslint:disable
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0; 
        // get next character
        (buffer = str.charAt(idx++)); 
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4) ?
            (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)))) :
            0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
            // tslint:enable
        }
        return output;
    }
    _b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(this._b64decode(str), (c) => {
            return '%' +
                ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    }
    decodeToken(token = this.tokenGetter()) {
        if (token === null) {
            return null;
        }
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('The inspected token doesn\'t appear to be a JWT. ' +
                'Check to make sure it has three parts and see https://jwt.io for more.');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }
        return JSON.parse(decoded);
    }
    getTokenExpirationDate(token = this.tokenGetter()) {
        let decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    isTokenExpired(token = this.tokenGetter(), offsetSeconds) {
        if (token === null || token === '') {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return true;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
}
JwtHelperService.ɵprov = i0.ɵɵdefineInjectable({ factory: function JwtHelperService_Factory() { return new JwtHelperService(i0.ɵɵinject(i1.JWT_OPTIONS)); }, token: JwtHelperService, providedIn: "root" });
JwtHelperService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
JwtHelperService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [JWT_OPTIONS,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2F1dGgvand0LWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBS2hELE1BQU0sT0FBTyxnQkFBZ0I7SUFNM0IsWUFBaUMsTUFBa0I7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztRQUNsRixJQUFJLENBQUMsa0JBQWtCO1lBQ25CLE1BQU0sSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ2pGLElBQUksQ0FBQyxrQkFBa0I7WUFDbkIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDbkYsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFXO1FBQ3pCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkQsUUFBUSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU07YUFDUDtZQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTSxJQUFJLElBQUksQ0FBQztnQkFDZixNQUFNO2FBQ1A7WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFBSSxHQUFHLENBQUM7Z0JBQ2QsTUFBTTthQUNQO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2FBQzlDO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQscURBQXFEO0lBQzdDLFVBQVUsQ0FBQyxHQUFXO1FBQzVCLE1BQU0sS0FBSyxHQUFHLG1FQUFtRSxDQUFDO1FBQ2xGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1NBQ3hGO1FBRUQ7UUFDSSxpQkFBaUI7UUFDakIsaUNBQWlDO1FBQ2pDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFPLEVBQUUsTUFBVyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLHFCQUFxQjtRQUNyQixDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDNUIsNEVBQTRFO1FBQzVFLENBQUMsTUFBTTtZQUNDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDekMseUNBQXlDO2dCQUN6QyxrREFBa0Q7Z0JBQ2xELEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxFQUFFO1lBQ1QseURBQXlEO1lBQ3pELE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLGdCQUFnQjtTQUNqQjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxHQUFRO1FBQ2hDLE9BQU8sa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHO2FBQ2QsSUFBSSxDQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQ3BCLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDVCxPQUFPLEdBQUc7Z0JBQ04sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUM7YUFDTCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQXFCLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDakQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxtREFBbUQ7Z0JBQ25ELHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFhLENBQUM7SUFDekMsQ0FBQztJQUVELHNCQUFzQixDQUFDLFFBQXFCLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDNUQsSUFBSSxPQUFZLENBQUM7UUFDakIsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWhDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGNBQWMsQ0FBQyxRQUFxQixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsYUFBc0I7UUFDNUUsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxhQUFhLEdBQUcsYUFBYSxJQUFJLENBQUMsQ0FBQztRQUVuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7O1lBL0hGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs0Q0FPakIsTUFBTSxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtKd3RPcHRpb25zfSBmcm9tICcuL2p3dC1vcHRpb25zJztcbmltcG9ydCB7SldUX09QVElPTlN9IGZyb20gJy4vand0LW9wdGlvbnMtdG9rZW4nO1xuaW1wb3J0IHtKd3RUb2tlbn0gZnJvbSAnLi9qd3QtdG9rZW4nO1xuXG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEp3dEhlbHBlclNlcnZpY2Uge1xuICB0b2tlbkdldHRlcjogKCkgPT4gc3RyaW5nIHwgbnVsbDtcbiAgdG9rZW5TZXR0ZXI6ICh0b2tlbjogc3RyaW5nfG51bGwpID0+IHZvaWQ7XG4gIHJlZnJlc2hUb2tlbkdldHRlcjogKCkgPT4gc3RyaW5nIHwgbnVsbDtcbiAgcmVmcmVzaFRva2VuU2V0dGVyOiAocmVmcmVzaFRva2VuOiBzdHJpbmd8bnVsbCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEpXVF9PUFRJT05TKSBjb25maWc6IEp3dE9wdGlvbnMpIHtcbiAgICB0aGlzLnRva2VuR2V0dGVyID0gY29uZmlnICYmIGNvbmZpZy50b2tlbkdldHRlciA/IGNvbmZpZy50b2tlbkdldHRlciA6ICgpID0+IG51bGw7XG4gICAgdGhpcy50b2tlblNldHRlciA9IGNvbmZpZyAmJiBjb25maWcudG9rZW5TZXR0ZXIgPyBjb25maWcudG9rZW5TZXR0ZXIgOiAoKSA9PiBudWxsO1xuICAgIHRoaXMucmVmcmVzaFRva2VuR2V0dGVyID1cbiAgICAgICAgY29uZmlnICYmIGNvbmZpZy5yZWZyZXNoVG9rZW5HZXR0ZXIgPyBjb25maWcucmVmcmVzaFRva2VuR2V0dGVyIDogKCkgPT4gbnVsbDtcbiAgICB0aGlzLnJlZnJlc2hUb2tlblNldHRlciA9XG4gICAgICAgIGNvbmZpZyAmJiBjb25maWcucmVmcmVzaFRva2VuU2V0dGVyID8gY29uZmlnLnJlZnJlc2hUb2tlblNldHRlciA6ICgpID0+IG51bGw7XG4gIH1cblxuICB1cmxCYXNlNjREZWNvZGUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBvdXRwdXQgPSBzdHIucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICBzd2l0Y2ggKG91dHB1dC5sZW5ndGggJSA0KSB7XG4gICAgICBjYXNlIDA6IHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDI6IHtcbiAgICAgICAgb3V0cHV0ICs9ICc9PSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAzOiB7XG4gICAgICAgIG91dHB1dCArPSAnPSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYmFzZTY0dXJsIHN0cmluZyEnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2I2NERlY29kZVVuaWNvZGUob3V0cHV0KTtcbiAgfVxuXG4gIC8vIGNyZWRpdHMgZm9yIGRlY29kZXIgZ29lcyB0byBodHRwczovL2dpdGh1Yi5jb20vYXRrXG4gIHByaXZhdGUgX2I2NGRlY29kZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuICAgIGxldCBvdXRwdXQgPSAnJztcblxuICAgIHN0ciA9IFN0cmluZyhzdHIpLnJlcGxhY2UoLz0rJC8sICcnKTtcblxuICAgIGlmIChzdHIubGVuZ3RoICUgNCA9PT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcXCdhdG9iXFwnIGZhaWxlZDogVGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nKTtcbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZVxuICAgICAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlcnNcbiAgICAgICAgbGV0IGJjID0gMCwgYnM6IGFueSwgYnVmZmVyOiBhbnksIGlkeCA9IDA7XG4gICAgICAgIC8vIGdldCBuZXh0IGNoYXJhY3RlclxuICAgICAgICAoYnVmZmVyID0gc3RyLmNoYXJBdChpZHgrKykpO1xuICAgICAgICAvLyBjaGFyYWN0ZXIgZm91bmQgaW4gdGFibGU/IGluaXRpYWxpemUgYml0IHN0b3JhZ2UgYW5kIGFkZCBpdHMgYXNjaWkgdmFsdWU7XG4gICAgICAgIH5idWZmZXIgJiZcbiAgICAgICAgICAgICAgICAoKGJzID0gYmMgJSA0ID8gYnMgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlciksXG4gICAgICAgICAgICAgICAgIC8vIGFuZCBpZiBub3QgZmlyc3Qgb2YgZWFjaCA0IGNoYXJhY3RlcnMsXG4gICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBvbmUgYXNjaWkgY2hhcmFjdGVyXG4gICAgICAgICAgICAgICAgIGJjKysgJSA0KSA/XG4gICAgICAgICAgICAob3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMjU1ICYgKGJzID4+ICgoLTIgKiBiYykgJiA2KSkpKSA6XG4gICAgICAgICAgICAwKSB7XG4gICAgICAvLyB0cnkgdG8gZmluZCBjaGFyYWN0ZXIgaW4gdGFibGUgKDAtNjMsIG5vdCBmb3VuZCA9PiAtMSlcbiAgICAgIGJ1ZmZlciA9IGNoYXJzLmluZGV4T2YoYnVmZmVyKTtcbiAgICAgIC8vIHRzbGludDplbmFibGVcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHByaXZhdGUgX2I2NERlY29kZVVuaWNvZGUoc3RyOiBhbnkpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KEFycmF5LnByb3RvdHlwZS5tYXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjY0ZGVjb2RlKHN0ciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyUnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJycpKTtcbiAgfVxuXG4gIGRlY29kZVRva2VuKHRva2VuOiBzdHJpbmd8bnVsbCA9IHRoaXMudG9rZW5HZXR0ZXIoKSk6IEp3dFRva2VufG51bGwge1xuICAgIGlmICh0b2tlbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdCgnLicpO1xuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdUaGUgaW5zcGVjdGVkIHRva2VuIGRvZXNuXFwndCBhcHBlYXIgdG8gYmUgYSBKV1QuICcgK1xuICAgICAgICAgICdDaGVjayB0byBtYWtlIHN1cmUgaXQgaGFzIHRocmVlIHBhcnRzIGFuZCBzZWUgaHR0cHM6Ly9qd3QuaW8gZm9yIG1vcmUuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVjb2RlZCA9IHRoaXMudXJsQmFzZTY0RGVjb2RlKHBhcnRzWzFdKTtcbiAgICBpZiAoIWRlY29kZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGRlY29kZSB0aGUgdG9rZW4uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlZCkgYXMgSnd0VG9rZW47XG4gIH1cblxuICBnZXRUb2tlbkV4cGlyYXRpb25EYXRlKHRva2VuOiBzdHJpbmd8bnVsbCA9IHRoaXMudG9rZW5HZXR0ZXIoKSk6IERhdGV8bnVsbCB7XG4gICAgbGV0IGRlY29kZWQ6IGFueTtcbiAgICBkZWNvZGVkID0gdGhpcy5kZWNvZGVUb2tlbih0b2tlbik7XG5cbiAgICBpZiAoIWRlY29kZWQuaGFzT3duUHJvcGVydHkoJ2V4cCcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKGRlY29kZWQuZXhwKTtcblxuICAgIHJldHVybiBkYXRlO1xuICB9XG5cbiAgaXNUb2tlbkV4cGlyZWQodG9rZW46IHN0cmluZ3xudWxsID0gdGhpcy50b2tlbkdldHRlcigpLCBvZmZzZXRTZWNvbmRzPzogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRva2VuID09PSBudWxsIHx8IHRva2VuID09PSAnJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW4pO1xuICAgIG9mZnNldFNlY29uZHMgPSBvZmZzZXRTZWNvbmRzIHx8IDA7XG5cbiAgICBpZiAoZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuICEoZGF0ZS52YWx1ZU9mKCkgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSArIG9mZnNldFNlY29uZHMgKiAxMDAwKTtcbiAgfVxufVxuIl19