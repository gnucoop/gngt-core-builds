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
const path_1 = require("path");
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
// import {FileSystemSchematicContext} from '@angular-devkit/schematics/tools';
const schematics_2 = require("@angular/cdk/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const config_1 = require("@schematics/angular/utility/config");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const project_1 = require("@schematics/angular/utility/project");
const validation_1 = require("@schematics/angular/utility/validation");
const ast_utils_2 = require("./ast-utils");
/**
 * Indents the text content with the amount of specified spaces. The spaces will be added after
 * every line-break. This utility function can be used inside of EJS templates to properly
 * include the additional files.
 */
function indentTextContent(text, numSpaces) {
    // In the Gngt project there should be only LF line-endings, but the schematic files
    // are not being linted and therefore there can be also CRLF or just CR line-endings.
    return text.replace(/(\r\n|\r|\n)/g, `$1${' '.repeat(numSpaces)}`);
}
function addIndexExports(options, packagePath) {
    return (host) => {
        const dasherizedModel = core_1.strings.dasherize(options.model);
        const path = path_1.join(packagePath, 'index.ts');
        const content = ast_utils_2.getSourceFile(host, path);
        const newExports = [`./${dasherizedModel}`, `./${dasherizedModel}.service`];
        const recorder = host.beginUpdate(path);
        newExports.forEach(exp => {
            const change = ast_utils_2.insertExport(content, path, '*', exp, true);
            if (change && change.pos != null && change.toAdd) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        });
        host.commitUpdate(recorder);
        return host;
    };
}
function addModelReducers(options, packagePath) {
    return (host) => {
        const path = path_1.join(packagePath, 'reducers.ts');
        let content = ast_utils_2.getSourceFile(host, path);
        const recorder = host.beginUpdate(path);
        const classifiedPackage = core_1.strings.classify(options.package);
        const classifiedModel = core_1.strings.classify(options.model);
        const camelizedModel = core_1.strings.camelize(options.model);
        const dasherizedModel = core_1.strings.dasherize(options.model);
        const importStr = `* as from${classifiedModel}`;
        const fromStr = `./${dasherizedModel}.reducers`;
        // @TODO (trik) Cast as any due to incompatible typescript versions
        let change = ast_utils_2.insertImport(content, path, importStr, fromStr, true);
        if (change && change.pos != null && change.toAdd) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
        change = ast_utils_2.addPropertyToInterface(content, path, `${classifiedPackage}State`, camelizedModel, `from${classifiedModel}.State`);
        if (change && change.pos != null && change.toAdd) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
        const reducerType = `from${classifiedModel}.${camelizedModel}Reducer`;
        change = ast_utils_2.addPropertyToObject(content, path, 'reducers', camelizedModel, reducerType);
        if (change && change.pos != null && change.toAdd) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function addModelProviders(options, packagePath) {
    return (host) => {
        const dasherizedPackage = core_1.strings.dasherize(options.package);
        const uppercasePackage = core_1.strings.underscore(options.package).toUpperCase();
        const path = path_1.join(packagePath, `${dasherizedPackage}.module.ts`);
        let content = ast_utils_2.getSourceFile(host, path);
        const classifiedModel = core_1.strings.classify(options.model);
        const dasherizedModel = core_1.strings.dasherize(options.model);
        const services = ['manager', 'service', 'effects'];
        services.forEach(service => {
            const cfService = core_1.strings.capitalize(service);
            const serviceName = `${classifiedModel}${cfService}`;
            const servicePath = `./${dasherizedModel}.${service}`;
            // @TODO (trik) Cast as any due to incompatible typescript versions
            let change = ast_utils_2.insertImport(content, path, `{${serviceName}}`, servicePath, true);
            if (change && change instanceof change_1.InsertChange) {
                const recorder = host.beginUpdate(path);
                recorder.insertLeft(change.pos, change.toAdd);
                host.commitUpdate(recorder);
                content = ast_utils_2.getSourceFile(host, path);
            }
            // @TODO (trik) Cast as any due to incompatible typescript versions
            let changes = ast_utils_1.addProviderToModule(content, path, serviceName, servicePath);
            if (changes) {
                const recorder = host.beginUpdate(path);
                changes.forEach((c) => {
                    if (c instanceof change_1.InsertChange) {
                        recorder.insertLeft(c.pos, c.toAdd);
                    }
                });
                host.commitUpdate(recorder);
                content = ast_utils_2.getSourceFile(host, path);
            }
            if (service === 'effects') {
                const effectsArray = `${uppercasePackage}_EFFECTS`;
                change = ast_utils_2.addElementToArray(content, path, effectsArray, serviceName);
                if (change && change instanceof change_1.InsertChange) {
                    const recorder = host.beginUpdate(path);
                    recorder.insertLeft(change.pos, change.toAdd);
                    host.commitUpdate(recorder);
                }
            }
        });
    };
}
function buildModel(options) {
    // @TODO (trik) Cast as any due to incompatible typescript versions
    // return (host: Tree, context: FileSystemSchematicContext) => {
    return (host, context) => {
        const workspace = config_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const schematicFilesUrl = './files';
        const packagePath = path_1.join(project_1.buildDefaultPath(project), options.package);
        const parsedPath = parse_name_1.parseName(packagePath, options.model);
        options.path = parsedPath.path;
        validation_1.validateName(options.model);
        const indexPath = path_1.join(packagePath, 'index.ts');
        const reducersPath = path_1.join(packagePath, 'reducers.ts');
        const modulePath = path_1.join(packagePath, `${core_1.strings.dasherize(options.package)}.module.ts`);
        const generateModule = !(host.exists(indexPath)
            && host.exists(reducersPath)
            && host.exists(modulePath));
        const baseTemplateContext = Object.assign({}, core_1.strings, options);
        const templateSource = schematics_1.apply(schematics_1.url(schematicFilesUrl), [
            generateModule ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.module.ts') && !path.endsWith('/reducers.ts') &&
                !path.endsWith('index.ts')),
            // Treat the template options as any, because the type definition for the template options
            // is made unnecessarily explicit. Every type of object can be used in the EJS template.
            schematics_1.template(Object.assign({ indentTextContent }, baseTemplateContext)),
            // TODO(devversion): figure out why we cannot just remove the first parameter
            // See for example: angular-cli#schematics/angular/component/index.ts#L160
            schematics_1.move(null, parsedPath.path),
        ]);
        return schematics_1.chain([
            schematics_1.mergeWith(templateSource),
            generateModule ? schematics_1.noop() : addIndexExports(options, packagePath),
            generateModule ? schematics_1.noop() : addModelReducers(options, packagePath),
            generateModule ? schematics_1.noop() : addModelProviders(options, packagePath)
        ])(host, context);
    };
}
exports.buildModel = buildModel;
//# sourceMappingURL=build-model.js.map