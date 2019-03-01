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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@gngt/core/translations', ['exports', '@angular/core', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.dewco = global.dewco || {}, global.dewco.core = global.dewco.core || {}, global.dewco.core.translations = {}), global.ng.core, global.ngxt.core));
}(this, function (exports, core, core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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
    }(core$1.MissingTranslationHandler));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TranslationsModule = /** @class */ (function () {
        function TranslationsModule() {
        }
        TranslationsModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [
                            { provide: core$1.MissingTranslationHandler, useClass: MissingTranslationHandler }
                        ]
                    },] },
        ];
        return TranslationsModule;
    }());

    exports.TranslationsModule = TranslationsModule;
    exports.MissingTranslationHandler = MissingTranslationHandler;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-translations.umd.js.map
