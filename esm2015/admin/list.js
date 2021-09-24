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
import { ChangeDetectorRef, Directive, EventEmitter, Input } from '@angular/core';
import { of as obsOf, Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AdminUserInteractionsService } from './admin-user-interactions';
export class AdminListComponent {
    constructor(_cdr, _aui) {
        this._cdr = _cdr;
        this._aui = _aui;
        this._headers = [];
        this._displayedColumns = [];
        this._baseEditUrl = '';
        this._newItemPath = 'new';
        this._actionProcessed = new EventEmitter();
        this.actionProcessed = this._actionProcessed;
        this._deletionEvt = new EventEmitter();
        this._deletionSub = Subscription.EMPTY;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
        this._cdr.markForCheck();
    }
    get headers() {
        return this._headers;
    }
    set headers(headers) {
        this._headers = headers;
        this._cdr.markForCheck();
    }
    get displayedColumns() {
        return this._displayedColumns;
    }
    set displayedColumns(displayedColumns) {
        this._displayedColumns = ['select', ...displayedColumns];
        this._cdr.markForCheck();
    }
    get baseEditUrl() {
        return this._baseEditUrl;
    }
    set baseEditUrl(baseEditUrl) {
        this._baseEditUrl = baseEditUrl;
        this._cdr.markForCheck();
    }
    get newItemPath() {
        return this._newItemPath;
    }
    set newItemPath(newItemPath) {
        this._newItemPath = newItemPath;
        this._cdr.markForCheck();
    }
    set service(service) {
        this._service = service;
        this._initService();
    }
    isAllSelected() {
        const numSelected = this.getSelection().length;
        const numRows = this.getItems().length;
        return numSelected === numRows;
    }
    masterToggle() {
        this.isAllSelected() ? this.clearSelection() : this.selectAll();
    }
    ngOnDestroy() {
        this._deletionSub.unsubscribe();
        this._deletionEvt.complete();
    }
    processAction(action) {
        const selected = this.getSelection();
        if (!selected || selected.length === 0) {
            return;
        }
        const handlerName = this._getActionHandler(action);
        const handler = this[handlerName];
        if (handler != null) {
            handler.call(this, selected);
        }
    }
    processDeleteAction(selected) {
        if (this._service == null) {
            return;
        }
        const s = this._aui.askDeleteConfirm().subscribe(res => {
            if (s) {
                s.unsubscribe();
            }
            if (res) {
                if (selected.length === 1) {
                    this._service.delete(selected[0]);
                }
                else {
                    this._service.deleteAll(selected);
                }
                this._actionProcessed.emit('delete');
                this.clearSelection();
            }
        });
    }
    _getService() {
        return this._service;
    }
    _getActionHandler(action) {
        action = action.charAt(0).toUpperCase() + action.substring(1);
        return `process${action}Action`;
    }
    _initService() {
        this._deletionSub.unsubscribe();
        this._deletionSub = this._deletionEvt
            .pipe(switchMap(selected => this._aui.askDeleteConfirm().pipe(map(res => ({ res, selected })))), switchMap(r => {
            const { res, selected } = r;
            if (res) {
                if (selected.length === 1) {
                    return this._service.delete(selected[0]);
                }
                return this._service.deleteAll(selected);
            }
            return obsOf(null);
        }), filter(r => r != null), take(1))
            .subscribe(() => {
            this._actionProcessed.emit('delete');
            this.clearSelection();
            this.refreshList();
        });
    }
}
AdminListComponent.decorators = [
    { type: Directive }
];
AdminListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AdminUserInteractionsService }
];
AdminListComponent.propDecorators = {
    title: [{ type: Input }],
    headers: [{ type: Input }],
    displayedColumns: [{ type: Input }],
    baseEditUrl: [{ type: Input }],
    newItemPath: [{ type: Input }],
    service: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2FkbWluL2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVksTUFBTSxlQUFlLENBQUM7QUFHM0YsT0FBTyxFQUFhLEVBQUUsSUFBSSxLQUFLLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUl2RSxNQUFNLE9BQWdCLGtCQUFrQjtJQW1FdEMsWUFBc0IsSUFBdUIsRUFBVSxJQUFrQztRQUFuRSxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQThCO1FBN0NqRixhQUFRLEdBQXNCLEVBQUUsQ0FBQztRQVVqQyxzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUFVakMsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFVbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFTbkIscUJBQWdCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckUsb0JBQWUsR0FBdUIsSUFBSSxDQUFDLGdCQUFzQyxDQUFDO1FBRW5GLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUQsaUJBQVksR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUVvQyxDQUFDO0lBL0Q3RixJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFL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a0MsQ0FBQztZQUMzRCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQztnQkFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ047YUFDSixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQS9KRixTQUFTOzs7WUFURixpQkFBaUI7WUFNakIsNEJBQTRCOzs7b0JBV2pDLEtBQUs7c0JBVUwsS0FBSzsrQkFVTCxLQUFLOzBCQVVMLEtBQUs7MEJBVUwsS0FBSztzQkFRTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01vZGVsfSBmcm9tICdAZ25ndC9jb3JlL2NvbW1vbic7XG5pbXBvcnQge01vZGVsQWN0aW9uVHlwZXMsIE1vZGVsU2VydmljZSwgU3RhdGUgYXMgTW9kZWxTdGF0ZX0gZnJvbSAnQGduZ3QvY29yZS9tb2RlbCc7XG5pbXBvcnQge09ic2VydmFibGUsIG9mIGFzIG9ic09mLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWRtaW5Vc2VySW50ZXJhY3Rpb25zU2VydmljZX0gZnJvbSAnLi9hZG1pbi11c2VyLWludGVyYWN0aW9ucyc7XG5pbXBvcnQge0FkbWluTGlzdEhlYWRlcn0gZnJvbSAnLi9saXN0LWhlYWRlcic7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFkbWluTGlzdENvbXBvbmVudDxcbiAgICBUIGV4dGVuZHMgTW9kZWwgPSBNb2RlbCwgUyBleHRlbmRzIE1vZGVsU3RhdGU8VD4gPSBNb2RlbFN0YXRlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQSBleHRlbmRzIE1vZGVsQWN0aW9uVHlwZXMgPSBNb2RlbEFjdGlvblR5cGVzLCBNUyBleHRlbmRzXG4gICAgICAgIE1vZGVsU2VydmljZTxULCBTLCBBPiA9IE1vZGVsU2VydmljZTxULCBTLCBBPj4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGl0bGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHRpdGxlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF90aXRsZTogc3RyaW5nO1xuXG4gIGdldCBoZWFkZXJzKCk6IEFkbWluTGlzdEhlYWRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVycztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGVhZGVycyhoZWFkZXJzOiBBZG1pbkxpc3RIZWFkZXJbXSkge1xuICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF9oZWFkZXJzOiBBZG1pbkxpc3RIZWFkZXJbXSA9IFtdO1xuXG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheWVkQ29sdW1ucztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheWVkQ29sdW1ucyhkaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2Rpc3BsYXllZENvbHVtbnMgPSBbJ3NlbGVjdCcsIC4uLmRpc3BsYXllZENvbHVtbnNdO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIF9kaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGdldCBiYXNlRWRpdFVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYXNlRWRpdFVybDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgYmFzZUVkaXRVcmwoYmFzZUVkaXRVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX2Jhc2VFZGl0VXJsID0gYmFzZUVkaXRVcmw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG4gIHByaXZhdGUgX2Jhc2VFZGl0VXJsID0gJyc7XG5cbiAgZ2V0IG5ld0l0ZW1QYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25ld0l0ZW1QYXRoO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBuZXdJdGVtUGF0aChuZXdJdGVtUGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmV3SXRlbVBhdGggPSBuZXdJdGVtUGF0aDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbiAgcHJpdmF0ZSBfbmV3SXRlbVBhdGggPSAnbmV3JztcblxuICBwcm90ZWN0ZWQgX3NlcnZpY2U6IE1TO1xuICBASW5wdXQoKVxuICBzZXQgc2VydmljZShzZXJ2aWNlOiBNUykge1xuICAgIHRoaXMuX3NlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIHRoaXMuX2luaXRTZXJ2aWNlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2FjdGlvblByb2Nlc3NlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgcmVhZG9ubHkgYWN0aW9uUHJvY2Vzc2VkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9hY3Rpb25Qcm9jZXNzZWQgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIHByaXZhdGUgX2RlbGV0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8VFtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdPigpO1xuICBwcml2YXRlIF9kZWxldGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfYXVpOiBBZG1pblVzZXJJbnRlcmFjdGlvbnNTZXJ2aWNlKSB7fVxuXG4gIGFic3RyYWN0IGdldFNlbGVjdGlvbigpOiBUW107XG4gIGFic3RyYWN0IGdldEl0ZW1zKCk6IFRbXTtcbiAgYWJzdHJhY3QgY2xlYXJTZWxlY3Rpb24oKTogdm9pZDtcbiAgYWJzdHJhY3Qgc2VsZWN0QWxsKCk6IHZvaWQ7XG4gIGFic3RyYWN0IHJlZnJlc2hMaXN0KCk6IHZvaWQ7XG5cbiAgaXNBbGxTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBudW1TZWxlY3RlZCA9IHRoaXMuZ2V0U2VsZWN0aW9uKCkubGVuZ3RoO1xuICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLmdldEl0ZW1zKCkubGVuZ3RoO1xuICAgIHJldHVybiBudW1TZWxlY3RlZCA9PT0gbnVtUm93cztcbiAgfVxuXG4gIG1hc3RlclRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/IHRoaXMuY2xlYXJTZWxlY3Rpb24oKSA6IHRoaXMuc2VsZWN0QWxsKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2RlbGV0aW9uRXZ0LmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcm9jZXNzQWN0aW9uKGFjdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmdldFNlbGVjdGlvbigpO1xuICAgIGlmICghc2VsZWN0ZWQgfHwgc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhhbmRsZXJOYW1lID0gdGhpcy5fZ2V0QWN0aW9uSGFuZGxlcihhY3Rpb24pO1xuICAgIGNvbnN0IGhhbmRsZXI6IChzOiBUW10pID0+IHZvaWQgPSAodGhpcyBhcyBhbnkpW2hhbmRsZXJOYW1lXTtcbiAgICBpZiAoaGFuZGxlciAhPSBudWxsKSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGhpcywgc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NEZWxldGVBY3Rpb24oc2VsZWN0ZWQ6IFRbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcyA9IHRoaXMuX2F1aS5hc2tEZWxldGVDb25maXJtKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAocykge1xuICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmRlbGV0ZShzZWxlY3RlZFswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5kZWxldGVBbGwoc2VsZWN0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWN0aW9uUHJvY2Vzc2VkLmVtaXQoJ2RlbGV0ZScpO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldFNlcnZpY2UoKTogTVMge1xuICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0QWN0aW9uSGFuZGxlcihhY3Rpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgYWN0aW9uID0gYWN0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYWN0aW9uLnN1YnN0cmluZygxKTtcbiAgICByZXR1cm4gYHByb2Nlc3Mke2FjdGlvbn1BY3Rpb25gO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNlcnZpY2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZGVsZXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9kZWxldGlvblN1YiA9IHRoaXMuX2RlbGV0aW9uRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0+IHRoaXMuX2F1aS5hc2tEZWxldGVDb25maXJtKCkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAocmVzID0+ICh7cmVzLCBzZWxlY3RlZH0pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtyZXMsIHNlbGVjdGVkfSA9IHIgYXMge3JlczogYm9vbGVhbiwgc2VsZWN0ZWQ6IFRbXX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZS5kZWxldGUoc2VsZWN0ZWRbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UuZGVsZXRlQWxsKHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic09mKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHIgPT4gciAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uUHJvY2Vzc2VkLmVtaXQoJ2RlbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG59XG4iXX0=