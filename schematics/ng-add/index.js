"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks");
const package_config_1 = require("./package-config");
const versionNames = require("./version-names");
/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @gngt/core`.
 */
function default_1(options) {
    return (host, context) => {
        package_config_1.addPackageToPackageJson(host, '@angular/cdk', `~${versionNames.requiredAngularMaterialVersion}`);
        package_config_1.addPackageToPackageJson(host, '@gngt/core', `~${versionNames.gngtVersion}`);
        package_config_1.addPackageToPackageJson(host, '@ngrx/effects', `~${versionNames.requiredNgrxVersion}`);
        package_config_1.addPackageToPackageJson(host, '@ngrx/store', `~${versionNames.requiredNgrxVersion}`);
        package_config_1.addPackageToPackageJson(host, '@ngx-translate/core', `~${versionNames.requiredNgxtVersion}`);
        package_config_1.addPackageToPackageJson(host, 'url-parse', `${versionNames.requiredUrlParseVersion}`);
        const installTaskId = context.addTask(new tasks_1.NodePackageInstallTask());
        context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map