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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/common', ['exports', '@angular/core', '@angular/forms'], factory) :
    (global = global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.common = {}), global.ng.core, global.ng.forms));
}(this, function (exports, core, forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GetObjectProperty = /** @class */ (function () {
        function GetObjectProperty() {
        }
        /**
         * @param {?} value
         * @param {?} prop
         * @return {?}
         */
        GetObjectProperty.prototype.transform = /**
         * @param {?} value
         * @param {?} prop
         * @return {?}
         */
        function (value, prop) {
            if (prop == null) {
                return null;
            }
            if (!/\./.test(prop)) {
                return value[prop];
            }
            /** @type {?} */
            var props = prop.split('.');
            /** @type {?} */
            var propsNum = props.length;
            /** @type {?} */
            var curValue = value;
            for (var i = 0; i < propsNum; i++) {
                curValue = curValue[props[i]];
                if (curValue == null) {
                    return null;
                }
            }
            return curValue;
        };
        GetObjectProperty.decorators = [
            { type: core.Pipe, args: [{ name: 'gngtGetObjectProperty' },] },
        ];
        return GetObjectProperty;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormDisabledDirective = /** @class */ (function () {
        function FormDisabledDirective(fgd) {
            this.fgd = fgd;
        }
        Object.defineProperty(FormDisabledDirective.prototype, "disabled", {
            set: /**
             * @param {?} disabled
             * @return {?}
             */
            function (disabled) {
                if (disabled) {
                    this.fgd.form.disable();
                }
                else {
                    this.fgd.form.enable();
                }
            },
            enumerable: true,
            configurable: true
        });
        FormDisabledDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[gngtFormDisabled]' },] },
        ];
        /** @nocollapse */
        FormDisabledDirective.ctorParameters = function () { return [
            { type: forms.FormGroupDirective, decorators: [{ type: core.Host }, { type: core.Self }] }
        ]; };
        FormDisabledDirective.propDecorators = {
            disabled: [{ type: core.Input, args: ['gngtFormDisabled',] }]
        };
        return FormDisabledDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CommonModule = /** @class */ (function () {
        function CommonModule() {
        }
        CommonModule.decorators = [
            { type: core.NgModule, args: [{
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
        return CommonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} value
     * @return {?}
     */
    function forceBooleanProp(value) {
        return value != null && "" + value !== 'false';
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    var ModelManager = /** @class */ (function () {
        function ModelManager() {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i] = arguments[_i];
            }
        }
        return ModelManager;
    }());

    exports.CommonModule = CommonModule;
    exports.FormDisabledDirective = FormDisabledDirective;
    exports.ModelManager = ModelManager;
    exports.forceBooleanProp = forceBooleanProp;
    exports.ɵa = GetObjectProperty;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-common.umd.js.map
