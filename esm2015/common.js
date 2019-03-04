/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { Pipe, Directive, Host, Self, Input, NgModule } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GetObjectProperty {
    /**
     * @param {?} value
     * @param {?} prop
     * @return {?}
     */
    transform(value, prop) {
        if (prop == null) {
            return null;
        }
        if (!/\./.test(prop)) {
            return value[prop];
        }
        /** @type {?} */
        const props = prop.split('.');
        /** @type {?} */
        const propsNum = props.length;
        /** @type {?} */
        let curValue = value;
        for (let i = 0; i < propsNum; i++) {
            curValue = curValue[props[i]];
            if (curValue == null) {
                return null;
            }
        }
        return curValue;
    }
}
GetObjectProperty.decorators = [
    { type: Pipe, args: [{ name: 'gngtGetObjectProperty' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormDisabledDirective {
    /**
     * @param {?} fgd
     */
    constructor(fgd) {
        this.fgd = fgd;
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        if (disabled) {
            this.fgd.form.disable();
        }
        else {
            this.fgd.form.enable();
        }
    }
}
FormDisabledDirective.decorators = [
    { type: Directive, args: [{ selector: '[gngtFormDisabled]' },] },
];
/** @nocollapse */
FormDisabledDirective.ctorParameters = () => [
    { type: FormGroupDirective, decorators: [{ type: Host }, { type: Self }] }
];
FormDisabledDirective.propDecorators = {
    disabled: [{ type: Input, args: ['gngtFormDisabled',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CommonModule {
}
CommonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FormDisabledDirective,
                    GetObjectProperty,
                ],
                exports: [
                    FormDisabledDirective,
                    GetObjectProperty,
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} value
 * @return {?}
 */
function forceBooleanProp(value) {
    return value != null && `${value}` !== 'false';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CommonModule, FormDisabledDirective, forceBooleanProp, GetObjectProperty as ɵa };
//# sourceMappingURL=common.js.map
