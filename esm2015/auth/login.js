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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Directive, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forceBooleanProp } from '@gngt/core/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as LoginPageActions from './login-page-actions';
export class LoginUsernameDirective {
}
LoginUsernameDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtLoginUsername]' },] }
];
export class LoginPasswordDirective {
}
LoginPasswordDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtLoginPassword]' },] }
];
export class LoginActionDirective {
}
LoginActionDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtLoginAction]' },] }
];
export class LoginComponent {
    constructor(fb, store, _cdr) {
        this._cdr = _cdr;
        this._showLabels = true;
        this._loginEvt = new EventEmitter();
        this._loginSub = Subscription.EMPTY;
        this.loginForm = fb.group({ username: [null, [Validators.required]], password: [null, [Validators.required]] });
        this.valid = this.loginForm.valueChanges.pipe(map(() => this.loginForm.valid));
        this._loginSub = this._loginEvt.subscribe(() => {
            store.dispatch(new LoginPageActions.Login({ credentials: this.loginForm.value }));
        });
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = forceBooleanProp(disabled);
        this._cdr.markForCheck();
    }
    get usernamePlaceholder() {
        return this._usernamePlaceholder;
    }
    set usernamePlaceholder(usernamePlaceholder) {
        this._usernamePlaceholder = usernamePlaceholder;
        this._cdr.markForCheck();
    }
    get passwordPlaceholder() {
        return this._passwordPlaceholder;
    }
    set passwordPlaceholder(passwordPlaceholder) {
        this._passwordPlaceholder = passwordPlaceholder;
        this._cdr.markForCheck();
    }
    get showLabels() {
        return this._showLabels;
    }
    set showLabels(showLabels) {
        this._showLabels = coerceBooleanProperty(showLabels);
        this._cdr.markForCheck();
    }
    login() {
        this._loginEvt.next();
    }
    ngOnDestroy() {
        this._loginSub.unsubscribe();
        this._loginEvt.complete();
    }
}
LoginComponent.decorators = [
    { type: Directive }
];
LoginComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: Store },
    { type: ChangeDetectorRef }
];
LoginComponent.propDecorators = {
    disabled: [{ type: Input }],
    usernamePlaceholder: [{ type: Input }],
    passwordPlaceholder: [{ type: Input }],
    showLabels: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9hdXRoL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBQyxXQUFXLEVBQWEsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNsQyxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQyxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFJekQsTUFBTSxPQUFPLHNCQUFzQjs7O1lBRGxDLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBQzs7QUFLNUMsTUFBTSxPQUFPLHNCQUFzQjs7O1lBRGxDLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBQzs7QUFLNUMsTUFBTSxPQUFPLG9CQUFvQjs7O1lBRGhDLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBQzs7QUFLMUMsTUFBTSxPQUFnQixjQUFjO0lBK0NsQyxZQUFZLEVBQWUsRUFBRSxLQUE0QixFQUFZLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBYnBGLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBVW5CLGNBQVMsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6RCxjQUFTLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUNyQixFQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUV4RixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzdDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBbkRELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFDSSxRQUFRLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFHRCxJQUNJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBSSxtQkFBbUIsQ0FBQyxtQkFBMkI7UUFDakQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUdELElBQ0ksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFDRCxJQUFJLG1CQUFtQixDQUFDLG1CQUEyQjtRQUNqRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQW1CLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUNJLFVBQVUsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQWdCRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUFsRUYsU0FBUzs7O1lBckJGLFdBQVc7WUFFWCxLQUFLO1lBSEwsaUJBQWlCOzs7dUJBK0J0QixLQUFLO2tDQU9MLEtBQUs7a0NBVUwsS0FBSzt5QkFhTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpLlxuICpcbiAqIEdudWNvb3AgQW5ndWxhciBUb29sa2l0IChnbmd0KSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogR251Y29vcCBBbmd1bGFyIFRvb2xraXQgKGduZ3QpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBHbnVjb29wIEFuZ3VsYXIgVG9vbGtpdCAoZ25ndCkuICBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtmb3JjZUJvb2xlYW5Qcm9wfSBmcm9tICdAZ25ndC9jb3JlL2NvbW1vbic7XG5pbXBvcnQge1N0b3JlfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgKiBhcyBMb2dpblBhZ2VBY3Rpb25zIGZyb20gJy4vbG9naW4tcGFnZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIGZyb21BdXRoIGZyb20gJy4vcmVkdWNlcnMnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tnbmd0TG9naW5Vc2VybmFtZV0nfSlcbmV4cG9ydCBjbGFzcyBMb2dpblVzZXJuYW1lRGlyZWN0aXZlIHtcbn1cblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbZ25ndExvZ2luUGFzc3dvcmRdJ30pXG5leHBvcnQgY2xhc3MgTG9naW5QYXNzd29yZERpcmVjdGl2ZSB7XG59XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2duZ3RMb2dpbkFjdGlvbl0nfSlcbmV4cG9ydCBjbGFzcyBMb2dpbkFjdGlvbkRpcmVjdGl2ZSB7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgbG9naW5Gb3JtOiBGb3JtR3JvdXA7XG4gIHJlYWRvbmx5IHZhbGlkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gZm9yY2VCb29sZWFuUHJvcChkaXNhYmxlZCk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXNlcm5hbWVQbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBnZXQgdXNlcm5hbWVQbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91c2VybmFtZVBsYWNlaG9sZGVyO1xuICB9XG4gIHNldCB1c2VybmFtZVBsYWNlaG9sZGVyKHVzZXJuYW1lUGxhY2Vob2xkZXI6IHN0cmluZykge1xuICAgIHRoaXMuX3VzZXJuYW1lUGxhY2Vob2xkZXIgPSB1c2VybmFtZVBsYWNlaG9sZGVyO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Bhc3N3b3JkUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgZ2V0IHBhc3N3b3JkUGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcGFzc3dvcmRQbGFjZWhvbGRlcjtcbiAgfVxuICBzZXQgcGFzc3dvcmRQbGFjZWhvbGRlcihwYXNzd29yZFBsYWNlaG9sZGVyOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wYXNzd29yZFBsYWNlaG9sZGVyID0gcGFzc3dvcmRQbGFjZWhvbGRlcjtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zaG93TGFiZWxzID0gdHJ1ZTtcbiAgZ2V0IHNob3dMYWJlbHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dMYWJlbHM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHNob3dMYWJlbHMoc2hvd0xhYmVsczogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dMYWJlbHMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2hvd0xhYmVscyk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9naW5FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfbG9naW5TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihmYjogRm9ybUJ1aWxkZXIsIHN0b3JlOiBTdG9yZTxmcm9tQXV0aC5TdGF0ZT4sIHByb3RlY3RlZCBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMubG9naW5Gb3JtID0gZmIuZ3JvdXAoXG4gICAgICAgIHt1c2VybmFtZTogW251bGwsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV0sIHBhc3N3b3JkOiBbbnVsbCwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdXX0pO1xuXG4gICAgdGhpcy52YWxpZCA9IHRoaXMubG9naW5Gb3JtLnZhbHVlQ2hhbmdlcy5waXBlKG1hcCgoKSA9PiB0aGlzLmxvZ2luRm9ybS52YWxpZCkpO1xuXG4gICAgdGhpcy5fbG9naW5TdWIgPSB0aGlzLl9sb2dpbkV2dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgc3RvcmUuZGlzcGF0Y2gobmV3IExvZ2luUGFnZUFjdGlvbnMuTG9naW4oe2NyZWRlbnRpYWxzOiB0aGlzLmxvZ2luRm9ybS52YWx1ZX0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2xvZ2luRXZ0Lm5leHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2xvZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbG9naW5FdnQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19