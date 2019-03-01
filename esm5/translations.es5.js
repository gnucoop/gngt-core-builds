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
import { NgModule } from '@angular/core';
import { MissingTranslationHandler as MissingTranslationHandler$1 } from '@ngx-translate/core';
import { __extends } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MissingTranslationHandler = /** @class */ (function (_super) {
    __extends(MissingTranslationHandler, _super);
    function MissingTranslationHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    MissingTranslationHandler.prototype.handle = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return params.key || '';
    };
    return MissingTranslationHandler;
}(MissingTranslationHandler$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TranslationsModule = /** @class */ (function () {
    function TranslationsModule() {
    }
    TranslationsModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        { provide: MissingTranslationHandler$1, useClass: MissingTranslationHandler }
                    ]
                },] },
    ];
    return TranslationsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TranslationsModule, MissingTranslationHandler };
//# sourceMappingURL=translations.es5.js.map
