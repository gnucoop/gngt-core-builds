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
import { Optional } from '@angular/core';
import { ModelManager as BaseModelManager } from '@gngt/core/common';
import { SyncService } from '@gngt/core/sync';
export class ModelManager extends BaseModelManager {
    constructor(config, endPoint, _http, syncService) {
        super();
        this._http = _http;
        this._useTrailingSlash = false;
        this._endPoint = endPoint;
        this._baseUrl = `${config.baseApiUrl}${this._endPoint}`;
        this._useTrailingSlash = config.addTrailingSlash != null ? config.addTrailingSlash : false;
        if (syncService != null && config.syncModel) {
            if (config.tableName == null) {
                throw new Error(`Table name must be set for model ${this._endPoint}`);
            }
            syncService.registerSyncModel(this._baseUrl, config.tableName);
        }
    }
    get baseUrl() {
        return this._baseUrl;
    }
    get(id) {
        return this._http.get(this._getObjectUrl(id));
    }
    list(options) {
        const params = this._listParamsToQueryParameters(options);
        return this._http.get(`${this._getListUrl()}${params}`);
    }
    create(data) {
        return this._http.post(this._getListUrl(), data);
    }
    update(id, data) {
        return this._http.put(this._getObjectUrl(id), data);
    }
    patch(id, data) {
        return this._http.patch(this._getObjectUrl(id), data);
    }
    delete(id) {
        return this._http.delete(this._getObjectUrl(id));
    }
    deleteAll(ids) {
        let url = `${this._baseUrl}/delete_all`;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return this._http.post(url, { ids });
    }
    query(params) {
        let url = `${this._baseUrl}/query`;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return this._http.post(url, params);
    }
    _getObjectUrl(id) {
        let url = `${this._baseUrl}/${id}`;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return url;
    }
    _getListUrl() {
        let url = this._baseUrl;
        if (this._useTrailingSlash) {
            url = `${url}/`;
        }
        return url;
    }
    _listParamsToQueryParameters(options) {
        let params = '';
        const paramsArray = [];
        if (options) {
            if (options.limit) {
                paramsArray.push(`limit=${options.limit}`);
            }
            if (options.start) {
                paramsArray.push(`start=${options.start}`);
            }
            if (options.sort) {
                const props = Object.keys(options.sort);
                paramsArray.push(`sort=${props.map(p => `${p}:${options.sort[p]}`).join(',')}`);
            }
            if (options.fields) {
                paramsArray.push(`fields=${options.fields.join(',')}`);
            }
            if (options.joins) {
                paramsArray.push(`joins=${options.joins
                    .map(j => {
                    const join = `${j.model}.${j.property}`;
                    if (j.fields) {
                        return `${join}.${j.fields.join(';')}`;
                    }
                    return join;
                })
                    .join(',')}`);
            }
            if (paramsArray.length > 0) {
                params = `?${paramsArray.join('&')}`;
            }
        }
        return params;
    }
}
ModelManager.ctorParameters = () => [
    { type: undefined },
    { type: String },
    { type: HttpClient },
    { type: SyncService, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVsL21vZGVsLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBSUwsWUFBWSxJQUFJLGdCQUFnQixFQUVqQyxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQU01QyxNQUFNLE9BQWdCLFlBQXNDLFNBQVEsZ0JBQWdCO0lBUWxGLFlBQ0ksTUFBb0IsRUFDcEIsUUFBZ0IsRUFDTixLQUFpQixFQUNmLFdBQXlCO1FBRXZDLEtBQUssRUFBRSxDQUFDO1FBSEksVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUx2QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFTaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMzRixJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUMzQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUN2RTtZ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QUFDO3FCQUN4QztvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDLENBQUM7cUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2QjtZQUNELElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUN0QztTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7WUFwSUssVUFBVTtZQVNWLFdBQVcsdUJBa0JaLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KS4gIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNb2RlbCxcbiAgTW9kZWxMaXN0UGFyYW1zLFxuICBNb2RlbExpc3RSZXN1bHQsXG4gIE1vZGVsTWFuYWdlciBhcyBCYXNlTW9kZWxNYW5hZ2VyLFxuICBNb2RlbFF1ZXJ5UGFyYW1zXG59IGZyb20gJ0Bnbmd0L2NvcmUvY29tbW9uJztcbmltcG9ydCB7U3luY1NlcnZpY2V9IGZyb20gJ0Bnbmd0L2NvcmUvc3luYyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge01vZGVsT3B0aW9uc30gZnJvbSAnLi9tb2RlbC1vcHRpb25zJztcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kZWxNYW5hZ2VyPE0gZXh0ZW5kcyBNb2RlbCA9IE1vZGVsPiBleHRlbmRzIEJhc2VNb2RlbE1hbmFnZXIge1xuICBwcml2YXRlIF9iYXNlVXJsOiBzdHJpbmc7XG4gIGdldCBiYXNlVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VVcmw7XG4gIH1cblxuICBwcml2YXRlIF91c2VUcmFpbGluZ1NsYXNoID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjb25maWc6IE1vZGVsT3B0aW9ucyxcbiAgICAgIGVuZFBvaW50OiBzdHJpbmcsXG4gICAgICBwcm90ZWN0ZWQgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgICBAT3B0aW9uYWwoKSBzeW5jU2VydmljZT86IFN5bmNTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2VuZFBvaW50ID0gZW5kUG9pbnQ7XG4gICAgdGhpcy5fYmFzZVVybCA9IGAke2NvbmZpZy5iYXNlQXBpVXJsfSR7dGhpcy5fZW5kUG9pbnR9YDtcbiAgICB0aGlzLl91c2VUcmFpbGluZ1NsYXNoID0gY29uZmlnLmFkZFRyYWlsaW5nU2xhc2ggIT0gbnVsbCA/IGNvbmZpZy5hZGRUcmFpbGluZ1NsYXNoIDogZmFsc2U7XG4gICAgaWYgKHN5bmNTZXJ2aWNlICE9IG51bGwgJiYgY29uZmlnLnN5bmNNb2RlbCkge1xuICAgICAgaWYgKGNvbmZpZy50YWJsZU5hbWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRhYmxlIG5hbWUgbXVzdCBiZSBzZXQgZm9yIG1vZGVsICR7dGhpcy5fZW5kUG9pbnR9YCk7XG4gICAgICB9XG4gICAgICBzeW5jU2VydmljZS5yZWdpc3RlclN5bmNNb2RlbCh0aGlzLl9iYXNlVXJsLCBjb25maWcudGFibGVOYW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8TT4ge1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldDxNPih0aGlzLl9nZXRPYmplY3RVcmwoaWQpKTtcbiAgfVxuXG4gIGxpc3Qob3B0aW9ucz86IE1vZGVsTGlzdFBhcmFtcyk6IE9ic2VydmFibGU8TW9kZWxMaXN0UmVzdWx0PE0+PiB7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5fbGlzdFBhcmFtc1RvUXVlcnlQYXJhbWV0ZXJzKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldDxNb2RlbExpc3RSZXN1bHQ8TT4+KGAke3RoaXMuX2dldExpc3RVcmwoKX0ke3BhcmFtc31gKTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBNKTogT2JzZXJ2YWJsZTxNPiB7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdDxNPih0aGlzLl9nZXRMaXN0VXJsKCksIGRhdGEpO1xuICB9XG5cbiAgdXBkYXRlKGlkOiBudW1iZXIsIGRhdGE6IE0pOiBPYnNlcnZhYmxlPE0+IHtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQ8TT4odGhpcy5fZ2V0T2JqZWN0VXJsKGlkKSwgZGF0YSk7XG4gIH1cblxuICBwYXRjaChpZDogbnVtYmVyLCBkYXRhOiBNKTogT2JzZXJ2YWJsZTxNPiB7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucGF0Y2g8TT4odGhpcy5fZ2V0T2JqZWN0VXJsKGlkKSwgZGF0YSk7XG4gIH1cblxuICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8TT4ge1xuICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZTxNPih0aGlzLl9nZXRPYmplY3RVcmwoaWQpKTtcbiAgfVxuXG4gIGRlbGV0ZUFsbChpZHM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxNPiB7XG4gICAgbGV0IHVybCA9IGAke3RoaXMuX2Jhc2VVcmx9L2RlbGV0ZV9hbGxgO1xuICAgIGlmICh0aGlzLl91c2VUcmFpbGluZ1NsYXNoKSB7XG4gICAgICB1cmwgPSBgJHt1cmx9L2A7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3Q8TT4odXJsLCB7aWRzfSk7XG4gIH1cblxuICBxdWVyeShwYXJhbXM6IE1vZGVsUXVlcnlQYXJhbXMpOiBPYnNlcnZhYmxlPE1vZGVsTGlzdFJlc3VsdDxNPj4ge1xuICAgIGxldCB1cmwgPSBgJHt0aGlzLl9iYXNlVXJsfS9xdWVyeWA7XG4gICAgaWYgKHRoaXMuX3VzZVRyYWlsaW5nU2xhc2gpIHtcbiAgICAgIHVybCA9IGAke3VybH0vYDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdDxNb2RlbExpc3RSZXN1bHQ8TT4+KHVybCwgcGFyYW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE9iamVjdFVybChpZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgdXJsID0gYCR7dGhpcy5fYmFzZVVybH0vJHtpZH1gO1xuICAgIGlmICh0aGlzLl91c2VUcmFpbGluZ1NsYXNoKSB7XG4gICAgICB1cmwgPSBgJHt1cmx9L2A7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMaXN0VXJsKCk6IHN0cmluZyB7XG4gICAgbGV0IHVybCA9IHRoaXMuX2Jhc2VVcmw7XG4gICAgaWYgKHRoaXMuX3VzZVRyYWlsaW5nU2xhc2gpIHtcbiAgICAgIHVybCA9IGAke3VybH0vYDtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RQYXJhbXNUb1F1ZXJ5UGFyYW1ldGVycyhvcHRpb25zPzogTW9kZWxMaXN0UGFyYW1zKTogc3RyaW5nIHtcbiAgICBsZXQgcGFyYW1zID0gJyc7XG4gICAgY29uc3QgcGFyYW1zQXJyYXk6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmxpbWl0KSB7XG4gICAgICAgIHBhcmFtc0FycmF5LnB1c2goYGxpbWl0PSR7b3B0aW9ucy5saW1pdH1gKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnN0YXJ0KSB7XG4gICAgICAgIHBhcmFtc0FycmF5LnB1c2goYHN0YXJ0PSR7b3B0aW9ucy5zdGFydH1gKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhvcHRpb25zLnNvcnQpO1xuICAgICAgICBwYXJhbXNBcnJheS5wdXNoKGBzb3J0PSR7cHJvcHMubWFwKHAgPT4gYCR7cH06JHtvcHRpb25zLnNvcnQhW3BdfWApLmpvaW4oJywnKX1gKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmZpZWxkcykge1xuICAgICAgICBwYXJhbXNBcnJheS5wdXNoKGBmaWVsZHM9JHtvcHRpb25zLmZpZWxkcy5qb2luKCcsJyl9YCk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5qb2lucykge1xuICAgICAgICBwYXJhbXNBcnJheS5wdXNoKGBqb2lucz0ke1xuICAgICAgICAgICAgb3B0aW9ucy5qb2luc1xuICAgICAgICAgICAgICAgIC5tYXAoaiA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBqb2luID0gYCR7ai5tb2RlbH0uJHtqLnByb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgICBpZiAoai5maWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2pvaW59LiR7ai5maWVsZHMuam9pbignOycpfWA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gam9pbjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKCcsJyl9YCk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXJhbXMgPSBgPyR7cGFyYW1zQXJyYXkuam9pbignJicpfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cbn1cbiJdfQ==