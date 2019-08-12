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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@gngt/core/reducers', ['exports'], factory) :
    (global = global || self, factory((global.gngt = global.gngt || {}, global.gngt.core = global.gngt.core || {}, global.gngt.core.reducers = {})));
}(this, function (exports) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * This function coerces a string into a string literal type.
     * Using tagged union types in TypeScript 2.0, this enables
     * powerful typechecking of our reducers.
     *
     * Since every action label passes through this function it
     * is a good place to ensure all of our action labels
     * are unique.
     * @type {?}
     */
    var typeCache = {};
    /**
     * @template T
     * @param {?} label
     * @return {?}
     */
    function type(label) {
        if (typeCache[(/** @type {?} */ (label))]) {
            throw new Error("Action type \"" + label + "\" is not unqiue\"");
        }
        typeCache[(/** @type {?} */ (label))] = true;
        return (/** @type {?} */ (label));
    }

    exports.type = type;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-reducers.umd.js.map
